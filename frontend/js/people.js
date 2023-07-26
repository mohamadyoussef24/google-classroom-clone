
if(!localStorage.getItem("user_id")){
  window.location.replace("../views/signin.html")
}

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

const classname = document.getElementById("classname")
const class_topic = document.getElementById("class_topic")

class_code=localStorage.getItem('class_code')
try {
  
  const decryptid = localStorage.getItem('user_id')

  const secretKey = 123
  const user_id = decrypt(decryptid,secretKey)
  
  const checkclass_form = new FormData()
  checkclass_form.append("user_id", user_id)
  checkclass_form.append("class_code", class_code)
  
  fetch(base_url + 'Check_user_class.php', {
      method: "POST",
      body: checkclass_form
  })
      .then((res) => res.json())
      .then((data) => {
          result = data.status
          console.log(data)
          if (result == "teacher") {
              user_type="teacher"
              document.getElementById("invite_icon").style.display= "none";
             
             localStorage.setItem("class_code",class_code)
          }
          else if (result == "student") {
              user_type="student"
              document.getElementById("invite_icon").style.display= "none";
              document.getElementById("invite_icon2").style.display= "none";
              post_div.style.display= "none";
              localStorage.setItem("class_code",class_code)
          }
          else if (result == "notallowed") {
              window.location.replace("../views/classroom_view.html")
              localStorage.removeItem("class_code")

          }
          else if (result == "classnotfound") {
              window.location.replace("../views/classroom_view.html")
              localStorage.removeItem("class_code")

          }


      })
      .catch((err) => {
          console.log("Fetch error:", err);
      });
} catch (err) {
  console.log("Error:", err);
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


// function to create and display assignment li
function displayParticipants(people_array, person) {
    let people_list = document.getElementById(`${person}-ul`);

    people_list.innerHTML = "";
    people_array.forEach((participant) => {
        let participant_li = document.createElement("li");

        participant_li.innerHTML += `
        <li class="participant-li">
                <div class="flex gap10 center">
                <span><img class="icon b-circle" src="/assets/svgs/unnamed.png" alt=""></span>
                <span>${participant.first_name} ${participant.last_name}</span></div>
                <div class="flex center"></div>
            </li>
    `;
        people_list.appendChild(participant_li)
    })
}
let profile = ""
window.onload = async function () {


    let formdata = new FormData();
    formdata.append("class_code", class_code);

    let requestOptions = {
        method: 'POST',
        body: formdata
    };

    try {
        const assignments = await fetch("http://localhost/Assignments/google-classroom-clone/backend/get_students.php", requestOptions)
        const json = await assignments.json()
        console.log(json)
        displayParticipants(json, "students")
    }
    catch (e) {
        console.log("failed to fetch", e)
    }

    try {
        const assignments = await fetch("http://localhost/Assignments/google-classroom-clone/backend/get_teachers.php", requestOptions)
        const json = await assignments.json()
        console.log(json)
        displayParticipants(json, "teachers")
    }
    catch (e) {
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

    
  
    
  
    try{
      const class_name = new FormData()
      class_name.append("class_code", class_code)
  
      fetch(base_url + "displaying_classes.php",{
          method: "POST",
          body: class_name
      })
  .then((res) => res.json())
  .then((data) => {
      console.log(data.status)
  
      if (data.status  == "class found") {
        const new_class_name = data.name
        const new_class_topic = data.subject
        console.log(new_class_name)
        classname.innerHTML = `${new_class_name}`
        class_topic.innerHTML = `${new_class_topic}`

      }else{
          console.log('class does not exist')
      }
  })
  }catch (err) {
      console.log("Error:", err);
    }
}

const invite_btn_teacher = document.getElementById("invite_icon")
const invite_btn_student = document.getElementById("invite_icon2")
const cancel_btn = document.getElementById("cancel_icon")
const email_input = document.getElementById("invite")

invite_btn_teacher.addEventListener('click', function(){
        let overlay = document.getElementById('overlay');
        overlay.style.display = "flex";
        email_input.setAttribute('name', "teacher-email")
})

invite_btn_student.addEventListener('click', function(){
        let overlay = document.getElementById('overlay');
        overlay.style.display = "flex";
        email_input.setAttribute('name', "student-email")
})

cancel_btn.addEventListener('click', function(){
    overlay.style.display = "none";
});

// 


const logout = document.getElementById('logout')
logout.addEventListener('click', function () {
  localStorage.removeItem("user_id")
  localStorage.removeItem("email")
  localStorage.removeItem("class_code")
  window.location.replace('../views/signin.html')
})



const burger_menu_clear = document.getElementById("burger_menu_clear")
burger_menu_clear.addEventListener('click', function(){
  localStorage.removeItem("class_code")

})





sendEmail = () => {
  const invite_email = document.getElementById("invite_email").value
  
  const site_email = "noreply.classroom.noreply@gmail.com";
  let invite = `<html>
  <a href="http://127.0.0.1:5500/frontend/views/testing_accept_cancel.html?code=${class_code}&email_sent=${invite_email}"> <button>See Details </button></a> </html> `
    
    console.log("invited")
    emailjs.init("ua6aWzLhhQq3fLfQO");


    var templateParams = {
    to_name:  invite_email,
    from_name: site_email ,
    message: invite
    };

emailjs.send('service_nkade5d', 'template_j5e1zsh', templateParams)
.then(function(response) {
console.log('SUCCESS!', response.status, response.text);

}, function(error) {
console.log('FAILED...', error);
});

};



const checkForUser = () => {
  const invite = document.getElementById("invite_email").value
  const class_code = window.localStorage.getItem("class_code")
  try{
    const check_user_exists = new FormData()
    check_user_exists.append("email", invite)
    check_user_exists.append("class_code", class_code)


    fetch(base_url + "checking_user_exists.php",{
        method: "POST",
        body: check_user_exists
    })
.then((res) => res.json())
.then((data) => {
    console.log(data.status)

    if (data.status  == "email sent") {
        sendEmail()
    }else{
        console.log('user does not exist')
    }
})
}catch (err) {
    console.log("Error:", err);
  }



  window.location.replace('/people.html')
}







invite_btn.addEventListener("click", checkForUser)

