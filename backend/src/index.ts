import  express ,{ Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { app, server } from "./socket/socket";

dotenv.config();


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(5555, () => {
    console.log("Server is running on port 5555");
});