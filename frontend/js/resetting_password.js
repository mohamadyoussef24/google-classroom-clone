const submit = document.getElementById('submit')

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";


const password_matching = () => {
    const reset_password = document.getElementById("reset_password").value
    const confirm_reset_password = document.getElementById("confirm_reset_password").value
    const email_localstorage = localStorage.getItem("email")
    try {
        if (reset_password == confirm_reset_password){
            const updated_password = new FormData()
            updated_password.append("email", email_localstorage)
            updated_password.append("new_password" , reset_password)  

        fetch(base_url + 'resetting_password.php' ,{
            method: "POST",
            body: updated_password
        }).then((res) => res.json())
        .then((res) => {
            if(res.status === 'success') {
                window.location.replace("../views/signin.html")
            }
        });

    }else {
        console.log('passwords do not match')
    }

    } catch (error) {
        console.log(error)
    }

}



submit.addEventListener("click", password_matching)