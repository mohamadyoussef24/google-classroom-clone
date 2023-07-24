
  if(localStorage.getItem("user_id")){
      window.location.replace("../views/classroom_view.html")
  }


const nextButton = document.getElementById("next");
const infoDiv = document.querySelector(".info");

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const signin = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    infoDiv.textContent = "Please enter both email and password.";
    infoDiv.style= 'color: red;font-weight:bold;font-size:14px;';
    return;
  }

  if (!isEmailValid(email)) {
    infoDiv.textContent = "Please enter a valid email address or  a valid password.";
    infoDiv.style= 'color: red;font-weight:bold;font-size:14px;';
    return;
  }
  

  try {
    const user_info = new FormData();
    user_info.append("email", email);
    user_info.append("password", password);

    fetch(base_url + 'signin.php', {
      method: "POST",
      body: user_info,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server Response:", data);
        if (data.status === 'logged in') {
          const user_id = data.user_id;
          // Assuming you have an ID to encrypt (replace 'your_id_to_encrypt' with the actual ID)
          const idToEncrypt = user_id;

          // Encrypt the ID using a secret key (replace 'your_secret_key' with your own secret key)
           const secretKey = 'secretKey';
           const encryptedID = encrypt(idToEncrypt, secretKey);

          // Store the encrypted ID in LocalStorage

          localStorage.setItem("user_id", encryptedID);
         
          window.location.replace("../views/classroom_view.html");
        } else {
          infoDiv.textContent = "Login failed: " + data.status;
        }
      })
      .catch((err) => {
        infoDiv.textContent = "Fetch error: " + err; 
            });
  } catch (err) {
    infoDiv.textContent = "Error: " + err;  }
};

nextButton.addEventListener("click", function (e) {
  e.preventDefault();
  signin();
});


function toggleMenu() {
  var menuItemsDiv = document.querySelector('.menu-icon');
  menuItemsDiv.classList.toggle('show'); 
}

