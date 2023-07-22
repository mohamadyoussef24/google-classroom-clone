const password =document.getElementById('password')
const modify_password =document.getElementById('modify_password')

modify_password.addEventListener("click" , function(){
    window.location.replace("../views/resetting_password.html")
})

const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";

const submit = document.getElementById('submit')


let flag ;


const profile_pic = document.getElementById("profile_pic").value



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
            
              const first_name = document.getElementById('first_name')
              const last_name = document.getElementById("last_name")
              
              first_name.setAttribute('placeholder', first_name_info);
              first_name.setAttribute('value', first_name_info);
              last_name.setAttribute('placeholder', last_name_info);
              last_name.setAttribute('value', last_name_info);

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