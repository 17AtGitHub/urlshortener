const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./utils/connectToDB")
const { logReqRes } = require("./middlewares/logReqRes")
dotenv.config();
const { router: urlRouter } = require("./routes/url");
const { router: staticRouter } = require("./routes/staticRouter");
const PORT = process.env.PORT;
const MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI;

function startServer(){
  try {
    // connnect DB
    connectDB(MONGO_CONNECTION_URI).then(() => {
      console.log("MONGODB Connected Successfully!");
    });
    
    // MIDDLEWARES
    // express inbuilt middlewares
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    // log the req in logs file
    app.use(logReqRes("logs.txt"));
    
    // setting the view engine as ejs
    app.set("view engine", "ejs");
    app.set("views", path.resolve("./views"));

    // routers
    app.use("/", staticRouter);
    app.use("/url", urlRouter);

    // listen on PORT
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
    // The callback provided to app.listen is executed after the 
    // listening event of the underlying HTTP server is emitted
  } catch (error) {
    console.log("Error in Starting Server: ", error);
    throw error;
  }
}

startServer();
