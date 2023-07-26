if (!localStorage.getItem("user_id")) {
    window.location.replace("../views/signin.html")
}


const title = document.getElementById('assignment_title')
    const teacher_name = document.getElementById('teacher_name')
    const due_date = document.getElementById('due_date')
    const instructions = document.getElementById('instructions')
    const file_input = document.getElementById('file_input')
    const submit_btn = document.getElementById('submit_btn')
const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

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

class_code= localStorage.getItem('class_code')


let site_url = window.location.href
let assignment_id = site_url.substring(site_url.lastIndexOf('=') + 1);
if (assignment_id == "" || assignment_id == " ") {
      
    window.location.replace("../views/classroom_view.html")
  }


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
  





















    
function renderAssignment(json) {
    title.innerText = `${json.title}`
    // teacher_name.innerText = `${json[0].first_name} ${json[0].last_name}`
    due_date.innerText = `${json.due}`
    instructions.innerText = `${json.instructions}`
}


window.onload = async() => {

    let site_url = window.location.href
    let assignment_id = site_url.substring(site_url.lastIndexOf('=') + 1);
    if (assignment_id == "" || assignment_id == " ") {
          
        window.location.replace("../views/classroom_view.html")
      }
      
        let formdata = new FormData();
        formdata.append("assignment_id", assignment_id);
      

        let requestOptions = {
            method: 'POST',
            body: formdata
        };

        try {
            const assignment = await fetch("http://localhost/Assignments/google-classroom-clone/backend/get_teacher_assignment.php", requestOptions)
            const json = await assignment.json()
            renderAssignment(json.zero)
            json.one.forEach((json) => {
                const filePath = json.file_path;

                // Get the last index of "/"
                const lastSlashIndex = filePath.lastIndexOf("/");
                
                // Get the substring starting after the last "/"
                const substringAfterLastSlash = filePath.substring(lastSlashIndex + 1);
                
                // Get the index of the first underscore ("_") after the last "/"
                const underscoreIndex = substringAfterLastSlash.indexOf("_");
                
                // Get the substring starting from the character after the first underscore
                const modifiedFilePath = substringAfterLastSlash.substring(underscoreIndex + 1);



                document.getElementById("files_div").innerHTML+=modifiedFilePath+"<br>";
            })
            console.log(json.one)
            json.two.forEach((json) => {
                const filePath = json.file_path;

                // Get the last index of "/"
                const lastSlashIndex = filePath.lastIndexOf("/");
                
                // Get the substring starting after the last "/"
                const substringAfterLastSlash = filePath.substring(lastSlashIndex + 1);
                
                // Get the index of the first underscore ("_") after the last "/"
                const underscoreIndex = substringAfterLastSlash.indexOf("_");
                
                // Get the substring starting from the character after the first underscore
                const modifiedFilePath = substringAfterLastSlash.substring(underscoreIndex + 1);
                

                document.getElementById("files_div_student").innerHTML+=modifiedFilePath+"<br>";
            })
            console.log(json.two)
        }
        catch (e) {
            console.log("failed to fetch", e)
        }

}