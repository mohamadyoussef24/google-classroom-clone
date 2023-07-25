
    if(localStorage.getItem("user_id")){
        window.location.replace("../views/classroom_view.html")
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


const submit = document.getElementById("submit");
const infoDiv = document.querySelector(".info");

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

const validateForm = () => {
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_confirm = document.getElementById("password_confirm").value;


    if (!first_name || !last_name || !email || !password) {
        infoDiv.textContent = "All fields are required.";
        infoDiv.style= 'color: red;font-weight:bold;font-size:14px;';
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegex)) {
        infoDiv.textContent = "Invalid email format.";
        infoDiv.style= 'color: red;font-weight:bold;font-size:14px;';
        return false;
    }

    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?_&])[A-Za-z\d@$!%_*#?&]{8,}$/;

    if (!password.match(passwordRegex)) {
        infoDiv.textContent = "Password must be at least 8 characters long and contain letters and numbers.";
        infoDiv.style= 'color: red;font-weight:bold;font-size:14px;';
        return false;
    }


    return true;

};

const register = () => {
    if (!validateForm()) {
        return;
    }

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        const user_info = new FormData();
        user_info.append("first_name", first_name);
        user_info.append("last_name", last_name);
        user_info.append("email", email);
        user_info.append("password", password);

        fetch(base_url + 'register.php', {
            method: "POST",
            body: user_info
        }).then((res) => res.json())
        .then((res) => {
            if (res.status == 'success') {




                const user_id = res.user_id;
                const secretKey = 123; // Replace with your desired secret key

                
                const encryptedID = encrypt(user_id, secretKey);
                
                localStorage.setItem("user_id", encryptedID);
                localStorage.setItem("email",email);
                
                window.location.replace("../views/classroom_view.html");
            } else {
                alert("Registration failed. " + res.status); //change alert
            }
        });

    } catch (error) {
        console.log(error);
    }
};

submit.addEventListener("click", function(e) {
    e.preventDefault();
    register();
});



function toggleMenu() {
    var menuItems = document.getElementById("menuItems");
    menuItems.classList.toggle("show");
  }
  