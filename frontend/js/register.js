const submit = document.getElementById("submit")


const base_url = "http://localhost/Assignments/google-classroom-clone/backend/"

const register = () => {
    const first_name = document.getElementById("first_name").value
    const last_name = document.getElementById("last_name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
        const user_info = new FormData();
        user_info.append("first_name", first_name)
        user_info.append("last_name", last_name)
        user_info.append("email",email)
        user_info.append("password", password)

        fetch(base_url + 'register.php' ,{
            method: "POST",
            body: user_info
        }).then((res) => res.json())
        .then((res) => {
            if(res.status === 'success') {
                const user_id = res.user_id
                localStorage.setItem("user_id", user_id);
                localStorage.setItem("email", email);

                window.location.replace("../views/classroom_view.html")
            }
        });

    } catch (error) {
        console.log(error)
    }
}


submit.addEventListener("click", function(e){
    e.preventDefault();
    register();
})
