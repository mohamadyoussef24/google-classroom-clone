const nextButton = document.getElementById("next");

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";


const signin = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("email:", email);
  console.log("password:", password);

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
          localStorage.setItem("user_id", user_id);
          window.location.replace("../views/classroom_view.html");
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

nextButton.addEventListener("click", function (e) {
  e.preventDefault();
  signin();
});







// const nextButton = document.getElementById("next");

// const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

// const login = () => {
//   const email = document.getElementById("email").value;

//   try {
//     const user_info = new FormData();
//     user_info.append("email", email);

//     fetch(base_url + 'signin.php', {
//       method: "POST",
//       body: user_info,
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.status === 'success') {
//           const user_id = res.user_id;
//           localStorage.setItem("user_id", user_id);
//           window.location.replace("../views/classroom_view.html");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

// nextButton.addEventListener("click", function (e) {
//   e.preventDefault();
//   login();
// });










// var count=0;
// //removes the email tag cuz we dont need it in the main email input page
// $('.tag-wrapper').css({"display": "none", "visibility": "hidden"});

// // handles the input fields=============================
// document.getElementById("email").oninput = function() {
//     // alert(count++);
//     check_email();
// }
// document.getElementById("password").oninput = function() {
//     check_password();
// }


// function check_email() {   
//     var email = $('#email').val(); 
//     // alert("working!!");
//     //if theres somthing in the text field, then add class active else remove active
//     //active: the label gors upward...
//     //also handles enabling and disabling of the "next" button.
//     if (email == "" || email.length == 0)
//     {
//         // alert("no text");
//         $('.email-label').removeClass('active');
//         $("#next").attr("disabled", "disabled");
//     } else {
//         $('.email-label').addClass('active');
//         $("#next").removeAttr("disabled");
//     }
// }



//     //when the next button is clicked...
//     $('#next').click(function(e){
//       e.preventDefault();
//       $('.preloader').fadeIn(500).delay(4000).fadeOut(300);
//       $('.slide-content').addClass('pass-input');

//       //handles email text on the email tag...
//       var email= $('#email').val();        
//       if(email.includes('@gmail.com')) $('.email-text').html(email);
//       else $('.email-text').html(email+"@gmail.com");

//       //2.5s after the next button is clicked
//       setTimeout(function(){
//           $('.h_main').html('Welcome');
//           $('.h_sub').css({"display": "none", "visibility": "hidden"});
//           $('.tag-wrapper').css({"display": "", "visibility": "visible"});
//           // fixed a minor glitch
//           $('.field-label').removeClass('active');
//       }, 2500);

      
//   })