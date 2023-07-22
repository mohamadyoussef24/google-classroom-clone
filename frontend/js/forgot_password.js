const submit = document.getElementById("submit");
const proceed =document.getElementById("proceed");
const site_email = "noreply.classroom.noreply@gmail.com";
let code ;


submit.addEventListener("click", function(event){
    event.preventDefault()

    sendEmail()});

sendEmail = () => {
        const recovery_email = document.getElementById('recovery_email1').value
        code = Math.random() * 1000000 | 0
        
    console.log(recovery_email)
    emailjs.init("ua6aWzLhhQq3fLfQO");


    var templateParams = {
    to_name:  recovery_email,
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

