var hamburger = document.querySelector(".hamburger");
var body = document.querySelector("body");
var sidebar = document.querySelector(".sidebar");

hamburger.addEventListener("click", function() {
  body.classList.toggle("active");
});

body.addEventListener("click", function(event) {
  if  (hamburger.contains(event.target)){
    body.classList.remove("active");
  } else if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
    body.classList.add("active");
  }
});