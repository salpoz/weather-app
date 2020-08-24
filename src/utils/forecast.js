const request = require("request");

const forecast = (coordinates, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=372f1d7da8bebd273761b42b867082b0&query=" +
    coordinates.longitude +
    "," +
    coordinates.latitude;
  request({ url: url, json: true }, (error, response) => {
    debugger;
    if (error) {
      callback("Unable to connect to service", undefined);
    } else if (response.body.current.length === 0) {
      callback("Bad Coordinates", undefined);
    } else {
      callback(undefined, response.body.current.temperature);
    }
  });
};

module.exports = forecast;
