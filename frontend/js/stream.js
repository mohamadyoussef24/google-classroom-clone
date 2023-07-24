
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

// function to create and display assignment li
function displayPosts(posts) {
    const stream_container = document.getElementById("stream-container");

    stream_container.innerHTML = "";
    posts.forEach((post) => {
        let announcement_div = document.createElement("div");

        announcement_div.innerHTML = `
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
                                    <span class="stream-title">[Teacher name] posted a new assignment: ${post} </span>
                                    <span class="stream-date">date now</span>
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

window.onload = async function () {
    const class_id = "21";
    let formdata = new FormData();
    formdata.append("class_id", class_id);

    let requestOptions = {
        method: 'POST',
        body: formdata
    };

    try {
        const assignments = await fetch("http://localhost/Assignments/google-classroom-clone/backend/get_assignments.php", requestOptions)
        const json = await assignments.json()
        console.log(json)
        displayPosts(json)
    }
    catch (e) {
        console.log("failed to fetch", e)
    }


    try {
        const posts = await fetch("http://localhost/Assignments/google-classroom-clone/backend/get_posts.php", requestOptions)
        const json = await posts.json()
        console.log(json)
        displayPosts(json)
    }
    catch (e) {
        console.log("failed to fetch", e)
    }


    const announcement = document.getElementById("announcement")
    const post_div = document.getElementById("post-div")
    const post_input = document.getElementById("post-input")

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
}

const post_btn = document.getElementById("post-btn")
const post_div = document.getElementById("post-div")
const post_input = document.getElementById("post-input")

post_btn.addEventListener('click', async function () {
    post_div.style.display = "flex";
    post_input.style.display = "none";

    // test
    const message = document.getElementById("announcement-text").value;

    const class_id = "21";
    const teacher_id = "20";

    let formdata = new FormData();
    formdata.append("teacher_id", teacher_id);
    formdata.append("class_id", class_id);
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

})
