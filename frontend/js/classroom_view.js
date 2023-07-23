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


const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

class_options.addEventListener('click', function(){
  if (class_options_list.style.display == "none") {
    class_options_list.style.display = "block";
  } else {
    class_options_list.style.display = "none";
  }
})

const join_class = document.getElementById('join_class')
const create_class = document.getElementById('create_class')
const create_class_requirements = document.getElementById('create_class_requirements')

// join_class.addEventListener('click', joinClass)
create_class.addEventListener('click', function(){
  if (create_class_requirements.style.display == "none") {
    create_class_requirements.style.display = "block";
  } else {
    create_class_requirements.style.display = "none";
  }
})



const submit_class_info = document.getElementById('submit_class_info')



const createClass = ()=> {
  const name = document.getElementById('name').value
  const section = document.getElementById('section').value
  const subject = document.getElementById('subject').value
  const room = document.getElementById('room').value
  const id = localStorage.getItem('user_id')


  const create_class_form = new FormData()

  create_class_form.append("name", name)
  create_class_form.append("section", section)
  create_class_form.append("subject", subject)
  create_class_form.append("room", room)
  create_class_form.append("user_id", id)


  fetch(base_url + "create_classroom.php",{
    method: "POST",
    body: create_class_form
})
.then((res) => res.json())
.then((data) => {

if (data.status  == "success") {
  window.location.replace("../views/classroom_stream.html")
    
}else{
    console.log('error')
}
})
}


submit_class_info.addEventListener('click', createClass)
