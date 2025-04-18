import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const client = new OpenAI({ apiKey: process.env.OpenAI });
const prisma = new PrismaClient();

const runQuery = async () => {
  // Run inside `async` function
  const allTickets = await prisma.ticket.findMany();
  console.log(allTickets);
};
runQuery();

app.use(cors());
app.use(express.json());

app.post("/create", async (req: Request, res: Response) => {
  const msg = req.body.msg;

  const response = await client.responses.create({
    model: "gpt-4o",
    input: msg,
  });
  res.json({ output: response.output_text });
});

app.listen(PORT, () => {
  console.log("server listening on port - " + PORT);
});
