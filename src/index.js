import express from 'express';
import cors from 'cors';
import dotnev from "dotenv";
import pool from "./config/db.js";
import routerTODO from './routes/RoutesTODO.js';
import errorHandling from './middlewares/errorHandler.js';
import os from "os";

dotnev.config();

const app = express();
const port = process.env.port||3001;

//Middlewares

app.use(express.json());
app.use(cors());

//routes
app.use("/api",routerTODO)


//Error hadling middlewares
app.use(errorHandling)

//TESTING POSTGRES
app.get("/init", async (req, res) => {
  try {
    const [tasks,categories,priorities]=await Promise.all([
      pool.query("SELECT  * FROM tasks"),
      pool.query("SELECT id, name, color FROM categories"),
      pool.query("SELECT id, name, color FROM priorities")
    ]);
    res.json({
      todos     :tasks.rows,
      categories:categories.rows,
      priorities:priorities.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Hàm lấy IP LAN hiện tại (IPv4)
function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
}

const host = "0.0.0.0"; // cho phép mobile trong cùng mạng LAN truy cập
app.listen(port, host, () => {
  const ip = getLocalIp();
  console.log(`✅ Server is running at http://${ip}:${port}`);
});

