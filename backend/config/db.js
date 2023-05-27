const mongoose = require("mongoose");
const URI = process.env.URI_DB_STUDENT;

// Connection on student database
const promise = mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
promise.then(() => {
        console.log("Database connected successfully");
});
mongoose.set("strictQuery", false);