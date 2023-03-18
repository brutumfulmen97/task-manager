const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect.js");
const app = express();
const tasks = require("./routes/tasks");

const port = 5000;

//middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log("Server is up on port " + port);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
