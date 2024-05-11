const express = require("express");
const dbConnection = require("./config/dbConnection");
require("dotenv").config();
require("express-async-errors");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes/router");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}))
const PORT = process.env.PORT || 3000;
app.use("/api/v1", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at Port : ${PORT}`);
});

dbConnection();
