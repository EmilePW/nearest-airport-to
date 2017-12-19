const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "/")), router);
app.set("views", "views");
app.set("view engine", "ejs");

router.get("/", function(req, res) {
  res.render("index", {});
});

app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});
