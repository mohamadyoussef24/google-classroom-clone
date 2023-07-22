const submit = document.getElementById("submit");
const proceed =document.getElementById("proceed");
const site_email = "noreply.classroom.noreply@gmail.com";
let code ;

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

submit.addEventListener("click", function(event){
    event.preventDefault()
    checkEmail()
});

sendEmail = () => {
        const email = document.getElementById('email').value
        code = Math.random() * 1000000 | 0
        
    console.log(email)
    emailjs.init("ua6aWzLhhQq3fLfQO");


    var templateParams = {
    to_name:  email,
    from_name: site_email ,
    data: code
    };

    emailjs.send('service_nkade5d', 'template_o7g4izb', templateParams)
.then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
}, function(error) {
    console.log('FAILED...', error);
});

};


proceed.addEventListener('click', function(event){
    event.preventDefault()

    checkCode()});


checkCode = ()=>{
    const reset_code = document.getElementById('reset_code').value

    if (reset_code == code.toString()) {
        console.log('success')
        window.location.replace("../views/resetting_password.html")
    }else {
        console.log('wrong')
    }
}



checkEmail = () => {

    const email = document.getElementById('email').value

    try{
        const existing_user = new FormData()
        existing_user.append("email", email)

        fetch(base_url + "forgot_password,php",{
            method: "POST",
            body: existing_user
        })
    .then((res) => res.json())
    .then((data) => {
        console.log(data.status)

        if (data.status  == "user found") {
            sendEmail()
        }else{
            console.log('email does not exist')
        }
    })
    }catch (err) {
        console.log("Error:", err);
      }
}