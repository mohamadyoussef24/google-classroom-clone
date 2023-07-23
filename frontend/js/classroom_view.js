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


const class_options = document.getElementById('class_options')
const class_options_list = document.getElementById('class_options1')

class_options.addEventListener('click', function(){
  if (class_options_list.style.display == "none") {
    class_options_list.style.display = "block";
  } else {
    class_options_list.style.display = "none";
  }
})

const join_class = document.getElementById('join_class')
const create_class = document.getElementById('create_class')


join_class.addEventListener('click', joinClass)
create_class.addEventListener('click', createClass)


const joinClass = ()=> {
  
}


const createClass = ()=> {
  
}