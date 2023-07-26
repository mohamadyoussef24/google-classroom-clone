

// function 
if (!localStorage.getItem("user_id")) {
    window.location.replace("../views/signin.html")
}
const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";
let user_type;
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





window.onload =  async() =>{

    let arrow2 = document.getElementById("arrow2")
    let class_ul = document.getElementById("class-ul")
    let arrow5 = document.getElementById("arrow5")
    let date = document.getElementById("due")
    let close_btn = document.getElementById("close")

    const decryptid = localStorage.getItem('user_id')

    const secretKey = 123; // Replace with your desired secret key


    const id = decrypt(decryptid, secretKey);

    // let formdata = new FormData();
    // formdata.append("user_id", id)

    // let requestOptions = {
    //     method: 'POST',
    //     body: formdata,
    //     // redirect: 'follow'
    // };

    // try {
    //     const response = await fetch('http://localhost/Assignments/google-classroom-clone/backend/get_teacher_classes.php', requestOptions)
    //     let json = await response.json()
    //     console.log(json)
    //     // populating class list with class names
    //     json.forEach((json) => {
    //         let listItem = document.createElement("li")
    //         listItem.innerHTML += `
    //         <input type="checkbox" name="class_name" value="${json.name}">
    //         <span>${json.name}</span>`;
    //         class_ul.appendChild(listItem)
    //     })
    // } catch (e) {
    //     console.log("failed to fetch", e)
    // }

    // add event listeners
    arrow2.addEventListener('click', async function () {
        class_ul.classList.toggle("hidden")
    })

    arrow5.addEventListener('click', function () {
        date.classList.toggle("hidden")
    })

    close_btn.addEventListener('click', function () {
        window.location.replace('./classwork.html')
    })
}

//function to get checked checkbox
function getChecked() {
    let checkboxes = document.getElementsByName("class_name");
    let checkedValue = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedValue.append(checkboxes[i].value);
        }
    } return checkedValue;
}

// function to create assignment
    let assign_btn = document.getElementById("create_assignment");
    
    assign_btn.addEventListener('click', async function (e) {
        e.preventDefault()

      

        try {
            let title = document.getElementById("title").value;
            let instructions = document.getElementById("instructions").value;
            // let class_name = getChecked();
            let due = document.getElementById("due").value;
           
            const decryptid = localStorage.getItem('user_id')
            const secretKey = 123; // Replace with your desired secret key
            let idd = decrypt(decryptid, secretKey);
            
            
            let Formdata = new FormData();
            Formdata.append("title", title);
            Formdata.append("instructions", instructions);
            // formdata.append("class", class_name);
            Formdata.append("due", due);
            Formdata.append("id", idd)
            Formdata.append("class_code",class_code)
           
            let requestOptions = {
                method: 'POST',
                body: Formdata
                // redirect: 'follow'
            };
            const response = await fetch('http://localhost/Assignments/google-classroom-clone/backend/create_assignment.php', requestOptions)
            const json = await response.json()
            console.log(json)
        } catch (e) {
            console.log("failed to fetch", e)
        }
        window.location.replace('./classwork.html')
   
    })


