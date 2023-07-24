

const submit = document.getElementById('submit');
const infoDiv = document.querySelector(".info");

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

document.getElementById("reset_password").addEventListener("input", function() {
  const reset_password = this.value; 
  const confirm_reset_password = document.getElementById("confirm_reset_password");

  try {
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(reset_password);

    if (!isPasswordValid) {
      infoDiv.innerText = "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.";
      infoDiv.style = 'color: red;font-weight:bold;font-size:14px;';
      confirm_reset_password.setAttribute('disabled', true);
      return;
    }
    
    infoDiv.innerText = ""; 
    confirm_reset_password.removeAttribute('disabled');

  } catch (error) {
    console.log(error);
  }
});

password_matching = () => {
  const reset_password = document.getElementById("reset_password").value;
  const confirm_reset_password = document.getElementById("confirm_reset_password").value;
  const email_localstorage = localStorage.getItem("email");

  try {
    if (reset_password !== confirm_reset_password) {
      infoDiv.innerText = "Passwords do not match.";
      infoDiv.style = 'color: red;font-weight:bold;font-size:14px;';
      return;
    }

    const updated_password = new FormData();
    updated_password.append("email", email_localstorage);
    updated_password.append("password", reset_password);

    fetch(base_url + 'resetting_password.php', {
      method: "POST",
      body: updated_password
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'password changed') {
          console.log("success");
          window.location.replace("../views/signin.html");
        }
      });

  } catch (error) {
    console.log(error);
  }
};

submit.addEventListener("click", function(e) {
  e.preventDefault();
  password_matching();
});