const express = require("express");
const path = require("path");
require("./db/mongoose");
const exampleRouter = require("./routers/example");
const cardNavRouter = require("./routers/page-navigation/cardNav");
const weeklyNavRouter = require("./routers/page-navigation/weeklySpreadNav");
const byTimeNavRouter = require("./routers/page-navigation/byTimeNav");
const finalNavRouter = require("./routers/page-navigation/finalNav");
const firstTableRouter = require("./routers/page-navigation/firstTableNav");
const cors = require("cors");

const publicDirectoryPath = path.join(__dirname, "../public");

const app = express();

// Put these statements before you define any routes.
// app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(cors());

app.use(express.static(publicDirectoryPath));
app.use(exampleRouter);
app.use(cardNavRouter);
app.use(weeklyNavRouter);
app.use(byTimeNavRouter);
app.use(finalNavRouter);
app.use(firstTableRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
