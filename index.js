const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const { Q } = require("./db/");
const geocode = require("./lib/geocode");

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
  res.render("index", { GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY });
});

router.get("/nearestAirport", async function(req, res) {
  const { location } = req.query;
  const { lat, lng } = await geocode.getLatLng(location);
  // Find airports within 150 miles
  var nearestAirports = await Q.airports.findWithinRadius(lat, lng, 150);
  res.render("index", {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    nearestAirports: nearestAirports
  });
});

app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});
