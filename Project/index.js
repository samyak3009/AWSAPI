const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");

//---middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//---------------------------------

app.use(cors());
app.use(helmet());

app.use("/aws", require("./routers/route.js"));

app.listen(3001);
