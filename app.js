require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect.js");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const tasks = require("./routes/tasks");

const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound)
app.use(errorHandlerMiddleware);

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
