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
                document.getElementById("submit_btn").style.display= "none";
                document.getElementById("fileButton").style.display= "none";
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
  









// Helper function to create a FileList from an array of File objects
function createFileList(files) {
    const dataTransfer = new DataTransfer();
    for (const file of files) {
      dataTransfer.items.add(file);
    }
    return dataTransfer.files;
  }
  
  // Create a hidden file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.multiple = true;
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);
  
  // Get the file button and the file list element
  const fileButton = document.getElementById('fileButton');
  const fileList = document.getElementById('fileList');
  
  // Add an event listener to the file button
  fileButton.addEventListener('click', function () {
    // Trigger the file input element when the button is clicked
    fileInput.click();
  });
  
  // Add an event listener to the file input element
  fileInput.addEventListener('change', function (event) {
    // Get the selected files
    const selectedFiles = event.target.files;
  
    // Display the selected files in the list
    for (const file of selectedFiles) {
      const fileItem = document.createElement('div');
      fileItem.classList.add('file-item');
  
      // Create an icon element based on the file type
      const fileIcon = document.createElement('i');
      fileIcon.classList.add('file-icon', 'far');
      if (file.type.includes('image')) {
        fileIcon.classList.add('fa-file-image');
      } else if (file.type.includes('audio')) {
        fileIcon.classList.add('fa-file-audio');
      } else if (file.type.includes('video')) {
        fileIcon.classList.add('fa-file-video');
      } else {
        fileIcon.classList.add('fa-file');
      }
  
      // Create a span element for the file name
      const fileNameSpan = document.createElement('span');
      fileNameSpan.classList.add('file-name');
      fileNameSpan.textContent = file.name;
  
      // Append an input element to hold the actual file
      const fileInputClone = fileInput.cloneNode();
      fileInputClone.multiple = false;
      fileInputClone.style.display = 'none';
      fileInputClone.files = createFileList([file]);
      fileItem.appendChild(fileInputClone);
  
      // Append the icon and file name to the file item
      fileItem.appendChild(fileIcon);
      fileItem.appendChild(fileNameSpan);
  
      // Append the file item to the file list
      fileList.appendChild(fileItem);
    }
  
    // Clear the file input element to allow selecting the same file again
    fileInput.value = '';
  });













  submit_btn.addEventListener('click', function () {
    // Create a FormData object and append the selected files to it
    const formData = new FormData();
    const fileItems = fileList.getElementsByClassName('file-item');
    for (const fileItem of fileItems) {
      const fileInputClone = fileItem.querySelector('input[type=file]');
      if (fileInputClone && fileInputClone.files.length > 0) {
        const file = fileInputClone.files[0];
        formData.append('uploadedFiles[]', file, file.name);
      }
    }
  
 
  
    formData.append('class_code', class_code);
    formData.append('assignment_id',assignment_id)

    // Send the FormData to PHP using Fetch API
    fetch('http://localhost/Assignments/google-classroom-clone/backend/student_upload.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(responseText => {
      console.log(responseText); // Response from PHP (you can handle it as needed)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });





    
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
                const string = json.file_path;
             
                const substringToRemove = ".";

                // Find the index of the first occurrence of the substring
                const indexToRemove = string.indexOf(substringToRemove);

                // Remove the first occurrence of the substring
                const filePath = base_url+string.replace(substringToRemove, "");
                // Get the last index of "/"
                const lastSlashIndex = filePath.lastIndexOf("/");
                
                // Get the substring starting after the last "/"
                const substringAfterLastSlash = filePath.substring(lastSlashIndex + 1);
                
                // Get the index of the first underscore ("_") after the last "/"
                const underscoreIndex = substringAfterLastSlash.indexOf("_");
                
                // Get the substring starting from the character after the first underscore
                const modifiedFilePath = substringAfterLastSlash.substring(underscoreIndex + 1);



                document.getElementById("files_div").innerHTML+=`<a href="${filePath}" download><button class="btn" style="background-color: RoyalBlue;color: white; cursor: pointer; width:100%"><i class="fa fa-download" >${modifiedFilePath}</i> Download</button></a><br>`;
            })
            console.log(json.one)
            json.two.forEach((json) => {
                const string = json.file_path;
             
                const substringToRemove = ".";

                // Find the index of the first occurrence of the substring
                const indexToRemove = string.indexOf(substringToRemove);

                // Remove the first occurrence of the substring
                const filePath = base_url+string.replace(substringToRemove, "");

                // Get the last index of "/"
                const lastSlashIndex = filePath.lastIndexOf("/");
                
                // Get the substring starting after the last "/"
                const substringAfterLastSlash = filePath.substring(lastSlashIndex + 1);
                
                // Get the index of the first underscore ("_") after the last "/"
                const underscoreIndex = substringAfterLastSlash.indexOf("_");
                
                // Get the substring starting from the character after the first underscore
                const modifiedFilePath = substringAfterLastSlash.substring(underscoreIndex + 1);
                

                document.getElementById("files_div_student").innerHTML+=`<a href="${filePath}" download><button class="btn" style="background-color: RoyalBlue;color: white; cursor: pointer; width:100%"><i class="fa fa-download" >${modifiedFilePath}</i> Download</button></a><br>`;
            })
            console.log(json.two)
        }
        catch (e) {
            console.log("failed to fetch", e)
        }

}