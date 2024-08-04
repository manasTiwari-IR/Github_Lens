import axios from "axios";

let cache = {};
export default function checkcache(username) {
  if (username in cache) {
    // console.log('Data from cache');
    console.log(cache[username]);
    document.querySelector('label[for="input"]').innerHTML = "Username found";
    display(cache[username]);
  } else {
    // console.log('Data from API');
    getdetails(username);
  }
}

function getdetails(username) {
  axios
    .get(`https://api.github.com/users/${username}`)
    .then((response) => {
      cache[username] = response.data;
      // console.log(response.data);
      document.querySelector('label[for="input"]').innerHTML = "Username found";
      document.getElementById("input").value = "";
      document.getElementById("input").blur();
      display(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        // console.log(error.response.status); //we can also return this status code to index.js and report it to the user
        document.querySelector('label[for="input"]').innerHTML =
          "Username not found";
      } else if (error.request) {
        // console.log(error.request);
        alert("Please check your internet connection");
      } else {
        // console.log("Error", error.message);
        alert("An error occured");
      }
      // console.log(error.config);
      document.querySelector(".dot-spinner").classList.add("hidden");
      document.querySelector(".img_des").classList.add("hidden");
      document.querySelector(".other_details").classList.add("hidden");
      document.getElementById("hr").classList.add("hidden");
      document.querySelector(".card_label").classList.remove("hidden");
    });
}
function display(data) {
  document.querySelector(".dot-spinner").classList.add("hidden");
  document.querySelector(".img_des").classList.remove("hidden");
  document.querySelector(".other_details").classList.remove("hidden");
  document.getElementById("hr").classList.remove("hidden");
  let imgdes = document.querySelector(".img_des");
  imgdes.querySelector("img").setAttribute("src", data["avatar_url"]);
  imgdes.querySelector("#name").textContent = data["name"];
  imgdes.querySelector("#bio").textContent = data["bio"];
  let det = document.querySelector(".other_details");
  det.querySelector("#followers").textContent = data["followers"];
  det.querySelector("#following").textContent = data["following"];
  det.querySelector("#repocount").textContent = data["public_repos"];
}
