import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { UrlRouter } from "./routes/url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("short"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/", UrlRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
