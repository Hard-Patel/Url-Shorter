import express, { Request, Response } from "express";
import morgan from "morgan";
import { UrlRouter } from "./routes/url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/", UrlRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
