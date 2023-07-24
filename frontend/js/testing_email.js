const site_email = "noreply.classroom.noreply@gmail.com";
let code = "8jpxYq" ; 
let invite = `<html>
<a href="http://127.0.0.1:5500/frontend/views/testing_accept_cancel.html?code=${code}"> <button>See Details </button></a> </html> `

sendEmail = () => {
    const email = "najmchoueiry1@gmail.com"
    console.log(invite)
    emailjs.init("ua6aWzLhhQq3fLfQO");


var templateParams = {
to_name:  email,
from_name: site_email ,
message: invite
};

emailjs.send('service_nkade5d', 'template_j5e1zsh', templateParams)
.then(function(response) {
console.log('SUCCESS!', response.status, response.text);

}, function(error) {
console.log('FAILED...', error);
});

};

/////////////




let confirm = document.getElementById("joe");

confirm.addEventListener("click", function(){
    console.log('h')
         sendEmail()});


