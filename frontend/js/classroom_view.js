
if(!localStorage.getItem("user_id")){
  window.location.replace("../views/signin.html")
}



// window.onload = async function () {


 

// }


function decrypt(encryptedData, secretKey) {
  const encryptedString = atob(encryptedData);
  const encryptedInt = parseInt(encryptedString, 10);
  return encryptedInt ^ secretKey;
}

function displayClasses(classses_array) {
  const classes_wrapper = document.getElementById("classes-wrapper")

  
  classses_array.forEach((classs)=> {
    let class_div = document.createElement("div");
    console.log(classs)
    class_div.innerHTML += `<a href="../views/stream.html?code=${classs.class_code}"><div class="class-card card column">
      <div class="class-credits flex column">
        <div class="class-title width100 color"> ${classs.name}</div>
        <div class="class-subject color">${classs.subject}</div>
      </div>
      <div class="b-circle class-icon"></div>
      <div class="class-assignments flex column">
        <div class="due-date"></div>
        <div class="assignment-title"></div>
      </div>
      <div class="student-work"></div>
    </div></a>
  `;
    classes_wrapper.appendChild(class_div)
    document.create
  })
}



////////////////////Encrypt and decrypt
// Function to encrypt an integer ID using XOR and convert to base64 string
function encrypt(id, secretKey) {
  const encryptedData = id ^ secretKey;
  const encryptedString = btoa(encryptedData.toString());
  return encryptedString;
}

// Function to decrypt a base64 string and get back the integer ID
function decrypt(encryptedData, secretKey) {
  const encryptedString = atob(encryptedData);
  const encryptedInt = parseInt(encryptedString, 10);
  return encryptedInt ^ secretKey;
}







//this code is for animating the input 
const inputs = document.querySelectorAll('.form-control input');
const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
  label.innerHTML = label.innerText
    .split('')
    .map((letter, idx) => `<span style="
        transition-delay: ${idx * 5}ms
      ">${letter}</span>`)
    .join('');
});



////////////////////////////////////////////////


var hamburger = document.querySelector(".hamburger");
var body = document.querySelector("body");
var sidebar = document.querySelector(".sidebar");

hamburger.addEventListener("click", function () {
  body.classList.toggle("active");
});

body.addEventListener("click", function (event) {
  if (hamburger.contains(event.target)) {
    body.classList.remove("active");
  } else if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
    body.classList.add("active");
  }
});


// const class_options = document.getElementById('class_options')
// const class_options_list = document.getElementById('class_options1')


const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

// class_options.addEventListener('click', function(){
//   if (class_options_list.style.display == "none") {
//     class_options_list.style.display = "block";
//   } else {
//     class_options_list.style.display = "none";
//   }
// })



const join_class = document.getElementById('join_class')
const join_class_requirements = document.getElementById('join_class_requirements')

const create_class = document.getElementById('create_class')
const create_class_requirements = document.getElementById('create_class_requirements')

const submit_class_info = document.getElementById('submit_class_info')



const createClass = () => {
  const name = document.getElementById('name').value
  const section = document.getElementById('section').value
  const subject = document.getElementById('subject').value
  const room = document.getElementById('room').value






  const decryptid = localStorage.getItem('user_id')

  const secretKey = 123; // Replace with your desired secret key


  const id = decrypt(decryptid, secretKey);


  const create_class_form = new FormData()

  create_class_form.append("name", name)
  create_class_form.append("section", section)
  create_class_form.append("subject", subject)
  create_class_form.append("room", room)
  create_class_form.append("user_id", id)


  fetch(base_url + "create_classroom.php", {
    method: "POST",
    body: create_class_form
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "success") {
        console.log('success')
        
        window.location.replace("../views/stream.html?code="+data.class_code)

      } else {
        console.log('error')
      }
    }).catch((err) => {
      console.log("Fetch error: " + err)
    });
}


submit_class_info.addEventListener('click', function(e){
  e.preventDefault()
  createClass()
})


join_class.addEventListener('click', function () {
  if (join_class_requirements.style.display == "flex") {
    if (create_class_requirements.style.display == "flex") {
      create_class_requirements.style.display = "none";
    }
    join_class_requirements.style.display = "none";
  } else {
    join_class_requirements.style.display = "flex";
    create_class_requirements.style.display = "none";
  }
})




////user presses the buttons at the same time....

create_class.addEventListener('click', function () {
  if (create_class_requirements.style.display == "flex") {
    create_class_requirements.style.display = "none";
    if (join_class_requirements.style.display == "flex") {
      join_class_requirements.style.display = "none";
    }
  } else {
    create_class_requirements.style.display = "flex";
    join_class_requirements.style.display = "none";
  }
})



////cancelling the form


let cancel_form1 = document.getElementById("cancel_form1")
cancel_form1.addEventListener('click', function (e) {
  create_class_requirements.style.display = "none";
  e.preventDefault();
})


let cancel_form2 = document.getElementById("cancel_form2")
cancel_form2.addEventListener('click', function (e) {
 
 

  join_class_requirements.style.display = "none";
  e.preventDefault();
})





const joinClass = () => {
  const join_class_code = document.getElementById("join_class_code").value


  const decryptid = localStorage.getItem('user_id')

  const secretKey = 123; // Replace with your desired secret key


  const id = decrypt(decryptid, secretKey);

  const join_code = new FormData();
  join_code.append('class_code', join_class_code)
  join_code.append('user_id', id)

  fetch(base_url + 'join_class.php', {
    method: "POST",
    body: join_code,
  })
    .then((res) => res.json())
    .then((data) => {

      if (data.status == 'success') {
        const class_id = data.class_id;
        console.log(class_id)
        window.location.replace("../views/classroom_stream.html");
      } else {
        console.log("Class failed: " + data.status);
      }
    })
    .catch((err) => {
      console.log("Fetch error: " + err)
    });
}

const submit_code = document.getElementById('submit_code')

submit_code.addEventListener('click', function (e) {
  e.preventDefault()
  joinClass()
})
/* When the user clicks on the + button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}




const logout = document.getElementById('logout')
logout.addEventListener('click', function () {
  localStorage.removeItem("user_id")
  localStorage.removeItem("email")
  window.location.replace('../views/signin.html')
})


function toggleMenu() {
  var menuItems = document.getElementById("menuItems");
  menuItems.classList.toggle("show");
}

// =============================

let profile = ""

window.onload = async function () {

  try {
  const decryptid =  localStorage.getItem('user_id')
  
  const secretKey = 123;
  let user_id = decrypt(decryptid, secretKey);

  
  let formdata = new FormData();
  formdata.append("user_id", user_id)

  fetch(base_url + 'select_class.php', {
    method: "POST",
    body: formdata
  })
    .then((res) => res.json())
    .then((data) => {
      const parsedData = data
      const classIDs = []
      for (const role in parsedData) {
        if (parsedData.hasOwnProperty(role)) {
          const classID = parsedData[role].class_id;
          classIDs.push(classID);
        }
      }
      for (let i = 0; i < classIDs.length; i++) {
        const classID = classIDs[i];

        let formdata_class_id = new FormData();
      formdata_class_id.append("class_id", classID)
      fetch(base_url + 'select_class_info.php', {
        method: "POST",
        body: formdata_class_id
      }).then((res) => res.json())
      .then((data) => {
        
        displayClasses(data)
      }).catch((err) => {
        console.log("Fetch error:", err);
      });
    }
    })
  }catch (e) {
    console.log("failed to fetch", e)
  }

  try {
    const email = window.localStorage.getItem("email")
    flag = "onload";
    const profile_pic_form = new FormData()
    profile_pic_form.append("email", email)
    profile_pic_form.append("flag", flag)

    fetch(base_url + 'edit_profile.php', {
      method: "POST",
      body: profile_pic_form
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'info found') {
          profile_info = data.profile_pic

          if (profile_info == "" || profile_info == " " || profile_info == null) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = `../../assets/images/usericon.png`;
          } else {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = `${base_url}/users/${profile_info}`;
          }

        } else {
          console.log("image failed:", data.status);
        }
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  } catch (err) {
    console.log("Error:", err);
  }

}
