import express from "express";
import { Request, Response } from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/create", (req: Request, res: Response) => {
  const msg = req.body.msg;
  res.json({ msg: msg });
});

app.listen(PORT, () => {
  console.log("server listening on port - " + PORT);
});
