
if(!localStorage.getItem("user_id")){
    window.location.replace("../views/signin.html")
}

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


// function to show dropdowns on assignment creation page
window.onload =  async() =>{

    let arrow2 = document.getElementById("arrow2")
    let class_ul = document.getElementById("class-ul")
    let arrow5 = document.getElementById("arrow5")
    let date = document.getElementById("due")
    let close_btn = document.getElementById("close")

    const decryptid = localStorage.getItem('user_id')

    const secretKey = 123; // Replace with your desired secret key


    const id = decrypt(decryptid, secretKey);

    let formdata = new FormData();
    formdata.append("user_id", id)

    let requestOptions = {
        method: 'POST',
        body: formdata,
        // redirect: 'follow'
    };

    try {
        const response = await fetch('http://localhost/Assignments/google-classroom-clone/backend/get_teacher_classes.php', requestOptions)
        let json = await response.json()
        console.log(json)
        // populating class list with class names
        json.forEach((json) => {
            let listItem = document.createElement("li")
            listItem.innerHTML += `
            <input type="checkbox" name="class_name" value="${json.name}">
            <span>${json.name}</span>`;
            class_ul.appendChild(listItem)
        })
    } catch (e) {
        console.log("failed to fetch", e)
    }

    // add event listeners
    arrow2.addEventListener('click', async function () {
        class_ul.classList.toggle("hidden")
    })

    arrow5.addEventListener('click', function () {
        date.classList.toggle("hidden")
    })

    close_btn.addEventListener('click', function () {
        window.location.replace('classwork.html')
    })
}

//function to get checked checkbox
function getChecked() {
    let checkboxes = document.getElementsByName("class_name");
    let checkedValue = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedValue.append(checkboxes[i].value);
        }
    } return checkedValue;
}

// function to create assignment
    let assign_btn = document.getElementById("create_assignment");
    
    assign_btn.addEventListener('click', async function (e) {
        e.preventDefault()

        let title = document.getElementById("title").value;
        let instructions = document.getElementById("instructions").value;
        let class_name = getChecked();
        let due = document.getElementById("due").value;

        const decryptid = localStorage.getItem('user_id')
        const secretKey = 123; // Replace with your desired secret key
        const id = decrypt(decryptid, secretKey);

        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("instructions", instructions);
        formdata.append("class", class_name);
        formdata.append("due", due);
        formdata.append("id", id)

        let requestOptions = {
            method: 'POST',
            body: formdata,
            // redirect: 'follow'
        };

        try {
            const response = await fetch('http://localhost/Assignments/google-classroom-clone/backend/create_assignment.php', requestOptions)
            const json = await response.json()
            console.log(json)
        } catch (e) {
            console.log("failed to fetch", e)
        }
        window.location.replace('classwork.html')
    })


