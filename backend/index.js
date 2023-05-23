const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const default_route = require("./routes/default_route");
const connectDB = require('./config/db');
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors')


// Middleware global pour parser les données JSON envoyées dans les requêtes HTTP
app.use(express.json());

app.use(cors());

// Midleware global pour gérer les erreurs
//app.use(errorHandler);

app.use(express.urlencoded({ extended: true }));

const db = require("./model/student");


// default route
app.use("/", default_route);

// student routes
app.use(require('./routes/student'));


app.listen("3000", () => {
    console.log(`Server listenning on port: http://localhost:${3000}`)
});
