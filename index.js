import checkcache from "./API.js";

let username = "";
let f = false;
document.querySelector(".input").addEventListener("focus", function () {
  document.querySelector('label[for="input"]').textContent = "";
});

document.getElementById("input").addEventListener("focus", function () {
  document.getElementById("input").value = "";
});
document.querySelector(".input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("input").blur();
    document.getElementById("searchbtn").click();
  }
});

document.querySelector("#searchbtn").addEventListener("click", function () {
  username = document.querySelector(".input").value;
  if (username !== "") {
    if (!f) {
      f = true;
      document.querySelector(".container").classList.remove("hidden");
    }
    document.querySelector(".dot-spinner").classList.remove("hidden");
    document.querySelector('.card_label').classList.add('hidden');
    document.querySelector(".img_des").classList.add("hidden");
    document.querySelector(".other_details").classList.add("hidden");
    document.getElementById("hr").classList.add("hidden");
    checkcache(username);
    username = "";
  } else {
    alert("Please enter a username");
  }
});
