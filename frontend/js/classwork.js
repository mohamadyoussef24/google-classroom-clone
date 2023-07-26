
if(!localStorage.getItem("user_id")){
    window.location.replace("../views/signin.html")
}
const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";
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



class_code=localStorage.getItem('class_code')

try {
  
  const decryptid = localStorage.getItem('user_id')

  const secretKey = 123
  const user_id = decrypt(decryptid,secretKey)
  const create_button = document.getElementById("create_button")
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
             localStorage.setItem("class_code",class_code)
          }
          else if (result == "student") {
              user_type="student"
              
              create_button.style.display="none";
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























// function to create and display assignment li
function displayAssignments(assignments_array) {
    const assignments_list = document.getElementById("assignments-ul");

    assignments_list.innerHTML += "";
    assignments_array.forEach((assignment) => {
        let anchor = document.createElement("a");
        anchor.setAttribute("href",`../views/assignments.html?assignment_id=${assignment.id}`)
        anchor.setAttribute("style","text-decoration: none; color: black;")
        let assignment_li = document.createElement("li");
        
        assignment_li.innerHTML = `
      <div class="li-title" id="li-title"><svg focusable="false" width="24" height="24"
                    viewBox="0 0 24 24" class=" NMm5M hhikbc svg-blue">
                    <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
                    <path
                        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z">
                    </path>
                </svg><span>${assignment.title}</span></div>
                <div class="due-date">Due ${assignment.due}</div>
    `;  
        anchor.appendChild(assignment_li)
        assignments_list.appendChild(anchor)
        assignment_li.classList.add("assignment-li")
    })
}

// get assigmnets

    window.onload = async function () {
        
        let formdata = new FormData();
        formdata.append("class_code", class_code);

        let requestOptions = {
            method: 'POST',
            body: formdata
        };

        try {
            const assignments = await fetch("http://localhost/Assignments/google-classroom-clone/backend/get_assignments.php", requestOptions)
            const json = await assignments.json()
            console.log(json)
            displayAssignments(json)
        }
        catch (e) {
            console.log("failed to fetch", e)
        }
        const classname = document.getElementById("classname")
        const class_topic = document.getElementById("class_topic")

        
      
        
      
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
            classname.innerHTML = `<b>${new_class_name}</b>`
            class_topic.innerHTML = `${new_class_topic}`

          }else{
              console.log('class does not exist')
          }
      })
      }catch (err) {
          console.log("Error:", err);
        }
      
    }



    let profile = ""
    let flag;

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