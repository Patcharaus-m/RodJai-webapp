import express from "express";
import config from "./config";
import { connectDB } from "./database";
import middleware from "./middleware";
import authRouter from "./routers/Auth";
import userRouter from "./routers/User";

const app = express();
const { HOST_API_PORT } = config;
app.use(middleware.cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();


app.get("/", (req, res) => res.send("ยินดีต้อนรับสู่ API"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(HOST_API_PORT, () => {
  console.log(`Server is running on port ${HOST_API_PORT}`);
});
