const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const request = require("request");

const app = express();
const port = process.env.PORT || 3000;

// Define paths to express engine
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views path
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Salaam",
    title: "Weather"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Salaam",
    address: "Manzil",
    boy: "Kail"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Salaam",
    message: "This is the help page!"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  const country = req.query.address;
  geocode(country, (error, location) => {
    if (!error) {
      forecast(location, (err, weatherdata) => {
        if (err) {
          return res.send({
            Error: err
          });
        }
        res.send({
          country: req.query.address,
          temperature: weatherdata
        });
      });
    } else {
      res.send({
        Error: error
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help page error",
    msg: "The requested help page is not found",
    name: "Salaam"
  });
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    return res.send({
      error: "No query string requested"
    });
  }

  res.send({
    products: []
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Error",
    msg: "Page not found",
    name: "Salaam"
  });
});

app.listen(port, () => {
  console.log("Server up and running on port " + port);
});
