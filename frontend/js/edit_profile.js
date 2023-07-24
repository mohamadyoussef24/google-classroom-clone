
  // if(!localStorage.getItem("user_id")){
  //     window.location.replace("../views/signin.html")
  // }


const password =document.getElementById('password')
const modify_password =document.getElementById('modify_password')

modify_password.addEventListener("click" , function(){
    window.location.replace("../views/resetting_password.html")
})

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

const submit = document.getElementById('submit')


let flag ;
let profile_info = ""

const profile_pic = document.getElementById("imageInput").value




window.onload = function(){


    try {
        const email = window.localStorage.getItem("email")
        flag = "onload";
        const existing_info = new FormData()
        existing_info.append("email", email)
        existing_info.append("flag", flag)
    
        fetch(base_url + 'edit_profile.php', {
          method: "POST",
          body: existing_info
        })
          .then((res) => res.json()) 
          .then((data) => {
            if (data.status === 'info found') { 
              const first_name_info= data.first_name
              const last_name_info = data.last_name
              profile_info = data.profile_pic
            
              const first_name = document.getElementById('first_name')
              const last_name = document.getElementById("last_name")
              
              first_name.setAttribute('placeholder', first_name_info);
              first_name.setAttribute('value', first_name_info);
              last_name.setAttribute('placeholder', last_name_info);
              last_name.setAttribute('value', last_name_info);

              const imagePreview = document.getElementById('imagePreview');
              imagePreview.style.backgroundImage = `url('${base_url}/users/${profile_info}')`;
            //   window.location.replace("../views/classroom_view.html");
            } else {
              console.log("Login failed:", data.status);
            }
          })
          .catch((err) => {
            console.log("Fetch error:", err);
          });
      } catch (err) {
        console.log("Error:", err);
      }

};


const modifyInfo = () => {


    try {
        const email = window.localStorage.getItem("email")
        flag = "not onload";
        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById("last_name").value
        const modified_info = new FormData()
        modified_info.append("email", email)
        modified_info.append("flag", flag)
        modified_info.append("first_name", first_name)
        modified_info.append("last_name", last_name)

    
        fetch(base_url + 'edit_profile.php', {
          method: "POST",
          body:  modified_info
        })
          .then((res) => res.json()) 
          .then((data) => {
            if (data.status == 'update info') { 

                const first_name_new= data.first_name
                const last_name_new = data.last_name
                
                const first_name1 = document.getElementById("first_name")
                const last_name1 = document.getElementById("last_name")

              first_name1.setAttribute('placeholder', first_name_new);
              first_name1.setAttribute('value', first_name_new);
              last_name1.setAttribute('placeholder', last_name_new);
              last_name1.setAttribute('value', last_name_new);

            //   window.location.replace("../views/classroom_view.html");
            } else {
              console.log("Failed:", data.status);
            }
          })
          .catch((err) => {
            console.log("Fetch error:", err);
          });
      } catch (err) {
        console.log("Error:", err);
      }
}


submit.addEventListener("click", modifyInfo)


const save_picture = document.getElementById('save_picture')

const  handleFile = ()=> {
  const fileInput = document.getElementById("imageInput");
  
  // Retrieve the encrypted ID from LocalStorage
const encryptedID = localStorage.getItem('user_id')

// Decrypt the ID using the same secret key
const secretKey = 'secretKey';

// Now you can use the decrypted ID to interact with the database
// For example, send it to the server to retrieve user data

  const id = decrypt(encryptedID, secretKey);

  const flag = "Upload pic"
  
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0]; 

    console.log("File name:", file.name);
    console.log("File type:", file.type);
    console.log("File size (in bytes):", file.size);

    

      // Check if a file was selected
      if (fileInput.files.length === 0) {
        alert("Please select a file."); // change alert to document.getElementById  LABEL >>>>
        return;
      }
    
      // Create a new FormData object
      const formData = new FormData();
    
      // Append the file to the FormData object with a specified field name ("file" in this case)
      formData.append("file", fileInput.files[0]);
      formData.append("id",id);
      formData.append("flag",flag);
      // Send the FormData to PHP using fetch
      fetch(base_url + 'edit_profile.php', {
        method: "POST",
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        // Handle the response from PHP (if needed)
        console.log(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    



    }

  }


save_picture.addEventListener('click', handleFile)









///////////////////////// for image ///////////////////
document.getElementById('imageInput').addEventListener('change', function(event) {
  const fileInput = event.target;
  const imagePreview = document.getElementById('imagePreview');

  if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function(e) {
          imagePreview.style.backgroundImage = `url('${e.target.result}')`;
      };

      reader.readAsDataURL(fileInput.files[0]);
  }
});

const imagePreviewLabel = document.getElementById('imagePreviewLabel');
imagePreviewLabel.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default behavior of the label click
  document.getElementById('imageInput').click();
});
