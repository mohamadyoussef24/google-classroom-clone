
if(!localStorage.getItem("user_id")){
  window.location.replace("../views/signin.html")
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

        participant_li.innerHTML = `
        <li class="participant-li">
                <div class="flex gap10 center">
                <span><img class="icon b-circle" src="/assets/svgs/unnamed.png" alt=""></span>
                <span>${participant.first_name} ${participant.last_name}</span></div>
                <div class="flex center"><svg class="svg-grey" focusable="false" width="24" height="24" viewBox="0 0 24 24" class=" NMm5M"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></div>
            </li>
    `;
        people_list.appendChild(participant_li)
    })
}

window.onload = async function () {

    const class_id = "5";
    let formdata = new FormData();
    formdata.append("class_id", class_id);

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

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

let profile = ""

window.onload = function () {

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
