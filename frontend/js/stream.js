if(!localStorage.getItem("user_id")){
    window.location.replace("../views/signin.html")
  }

  const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";
  const post_btn = document.getElementById("post-btn")
  const announcement = document.getElementById("announcement")
  const post_div = document.getElementById("post-div")
  const post_input = document.getElementById("post-input")
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



let post_prefix;

// function to create and display assignment li
function displayPosts(posts_array,type) {
  const stream_container = document.getElementById("stream-container");

  posts_array.forEach((post) => {
      let announcement_div = document.createElement("div");
      if (type == "assignment") {
        post_prefix = "Posted a new assignment:"
        message = post.title
    } else {
        post_prefix = "Added new material:"
        message = post.message
        
    }
      announcement_div.innerHTML += `
      <div class="card post-div flex just-btw">
      <div class="flex center gap10">
                              <div class="b-circle bg-blue flex center" id="assignment-icon"><svg focusable="false"
                                      width="24" height="24" viewBox="0 0 24 24" class=" NMm5M hhikbc svg-white">
                                      <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
                                      <path
                                          d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z">
                                      </path>
                                  </svg></div>
                              <div class="flex column">
                                  <span class="stream-title"> ${post_prefix+" "+ message} </span>
                                  
                              </div>
                          </div>
                          <div><svg focusable="false" width="24" height="24" viewBox="0 0 24 24"
                                  class=" NMm5M svg-blue">
                                  <path
                                      d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                                  </path>
                              </svg></div>
                              </div>
                              </div>
  `;
      stream_container.appendChild(announcement_div)
  })
}


  let class_code;
 
  if(!localStorage.getItem('class_code')){
    let site_url = window.location.href
    console.log(site_url)
    class_code = site_url.substring(site_url.lastIndexOf('=') + 1);
    console.log(class_code)
    if (class_code == "" || class_code == " ") {
  
      window.location.replace("../views/classroom_view.html")
    }
    
  }else{
    
    class_code = localStorage.getItem('class_code')
    let site_url = window.location.href + "?code=" + class_code
    window.history.pushState({ path: site_url }, '', site_url);
  }



  try {
    
    const decryptid = localStorage.getItem('user_id')

    const secretKey = 123
    const user_id = decrypt(decryptid,secretKey)
    
    const checkclass_form = new FormData()
    checkclass_form.append("user_id", user_id)
    checkclass_form.append("class_code", class_code)
    
    fetch(base_url + 'Check_user_class.php', {
        method: "POST",
        body: checkclass_form
    })
        .then((res) => res.json())
        .then((data) => {
            result = data.status
            console.log(data)
            if (result == "teacher") {
                user_type="teacher"
               localStorage.setItem("class_code",class_code)
            }
            else if (result == "student") {
                user_type="student"
                
                post_div.style.display= "none";
                localStorage.setItem("class_code",class_code)
            }
            else if (result == "notallowed") {
              localStorage.removeItem("class_code")
                window.location.replace("../views/classroom_view.html")
               

            }
            else if (result == "classnotfound") {
              localStorage.removeItem("class_code")
                window.location.replace("../views/classroom_view.html")
                

            }


        })
        .catch((err) => {
            console.log("Fetch error:", err);
        });
} catch (err) {
    console.log("Error:", err);
}







window.onload =  async function () {
  let copyText = document.getElementById("class-link");
  copyText.innerHTML=localStorage.getItem("class_code");
  let site_url = window.location.href
  console.log(site_url)
  let class_code = site_url.substring(site_url.lastIndexOf('=') + 1);
  console.log(class_code)
 
  try {
    const email = window.localStorage.getItem("email")
    flag = "onload";
    const profile_pic_form = new FormData()
    profile_pic_form.append("email", email)
    profile_pic_form.append("flag", flag)

    fetch(base_url + 'edit_profile.php', {
      method: "POST",
      body: profile_pic_form
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'info found') {
          profile_info = data.profile_pic

          if (profile_info == "" || profile_info == " " || profile_info == null) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = `../../assets/images/usericon.png`;
          } else {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = `${base_url}/users/${profile_info}`;
          }

        } else {
          console.log("image failed:", data.status);
        }
      })
      .catch((err) => {
        console.log("Fetch error:", err);
      });
  } catch (err) {
    console.log("Error:", err);
  }
  const classname = document.getElementById("classname")
  const class_topic = document.getElementById("class_topic")
  const class_name_cover = document.getElementById("class_name_cover");
  const class_topic_cover = document.getElementById("class_topic_cover");

  

  

  try{
    const class_name = new FormData()
    class_name.append("class_code", class_code)

    fetch(base_url + "displaying_classes.php",{
        method: "POST",
        body: class_name
    })
.then((res) => res.json())
.then((data) => {
    console.log(data.status)

    if (data.status  == "class found") {
      const new_class_name = data.name
      const new_class_topic = data.subject
      console.log(new_class_name)
      classname.innerHTML = `${new_class_name}`
      class_topic.innerHTML = `${new_class_topic}`
      class_name_cover.innerHTML = `${new_class_name}`
      class_topic_cover.innerHTML = `${new_class_topic}` 
    }else{
        console.log('class does not exist')
    }
})
}catch (err) {
    console.log("Error:", err);
  }








  


  try {
    let formdata = new FormData();
    formdata.append("class_code", class_code);
  
    let requestOptions = {
        method: 'POST',
        body: formdata
    };
      const assignments = await fetch("http://localhost/Assignments/google-classroom-clone/backend/get_assignments.php", requestOptions)
      const json = await assignments.json()
      console.log(json)
      displayPosts(json,"assignment")
  }
  catch (e) {
      console.log("failed to fetch", e)
  }






  try {
    let formdata = new FormData();
    formdata.append("class_code", class_code);
  
    let requestOptions = {
        method: 'POST',
        body: formdata
    };

    const posts = await fetch("http://localhost/Assignments/google-classroom-clone/backend/get_posts.php", requestOptions)
    const json2 = await posts.json()
    console.log(json2)
    displayPosts(json2, "announcement")
}
catch (e) {
    console.log("failed to fetch", e)
}

















  announcement.addEventListener('click', function () {
      post_div.style.display = "none";
      post_input.style.display = "flex";
      const textarea = document.getElementById("announcement-text");
      textarea.value = ""
  })

  const cancel_btn = document.getElementById("cancel-btn")


  cancel_btn.addEventListener('click', function () {
      post_div.style.display = "flex";
      post_input.style.display = "none";
  })

  try {
      const email = window.localStorage.getItem("email")
      flag = "onload";
      const profile_pic_form = new FormData()
      profile_pic_form.append("email", email)
      profile_pic_form.append("flag", flag)
  
      fetch(base_url + 'edit_profile.php', {
        method: "POST",
        body: profile_pic_form
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'info found') {
            profile_info = data.profile_pic
  
            if (profile_info == "" || profile_info == " " || profile_info == null) {
              const imagePreview = document.getElementById('imagePreview');
              imagePreview.src = `../../assets/images/usericon.png`;
            } else {
              const imagePreview = document.getElementById('imagePreview');
              imagePreview.src = `${base_url}/users/${profile_info}`;
            }
  
          } else {
            console.log("image failed:", data.status);
          }
        })
        .catch((err) => {
          console.log("Fetch error:", err);
        });
    } catch (err) {
      console.log("Error:", err);
    }
   
}


// class and topic names


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



 




post_btn.addEventListener('click', async function () {
    post_div.style.display = "flex";
    post_input.style.display = "none";

    // test
    const message = document.getElementById("announcement-text").value;

    const decryptid = localStorage.getItem('user_id')

    const secretKey = 123; // Replace with your desired secret key
    const user_id = decrypt(decryptid,secretKey)
    let formdata = new FormData();
    formdata.append("teacher_id", user_id);
    formdata.append("class_code", class_code);
    formdata.append("message", message);
  
    let requestOptions = {
        method: 'POST',
        body: formdata
    };

    try {
        const posts = await fetch("http://localhost/Assignments/google-classroom-clone/backend/create_post.php", requestOptions)
        const json = await posts.json()
        console.log(json)
    }
    catch (e) {
        console.log("failed to fetch", e)
    }
    window.location.reload()
})



// 
function myFunction() {
  // Get the text field
  let copyText = document.getElementById("class-link");


  navigator.clipboard.writeText(copyText.innerHTML);


}


const logout = document.getElementById('logout')
logout.addEventListener('click', function () {
  localStorage.removeItem("user_id")
  localStorage.removeItem("email")
  localStorage.removeItem("class_code")
  window.location.replace('../views/signin.html')
})



const burger_menu_clear = document.getElementById("burger_menu_clear")
burger_menu_clear.addEventListener('click', function(){
  localStorage.removeItem("class_code")

})