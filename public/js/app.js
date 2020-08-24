console.log("This is from the client side javascript");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.country) {
        messageOne.textContent = "Country: " + data.country;
        messageTwo.textContent = "Temperature: " + data.temperature;
        messageThree.textContent = "Weather: " + data.weather;
      } else if (data.Error) {
        messageOne.textContent = data.Error;
        messageTwo.textContent = "";
        messageThree.textContent = "";
      } else {
        messageOne.textContent = "Enter a name of a country";
        messageTwo.textContent = "";
        messageThree.textContent = "";
      }
    });
  });
});
