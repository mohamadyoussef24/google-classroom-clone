
    if(!localStorage.getItem("user_id")){
        window.location.replace("../views/signin.html")
    }
  
  
const pages = {}

// function to show dropdowns on assignment creation page
pages.showDropdowns = async () => {

    let arrow2 = document.getElementById("arrow2")
    let class_ul = document.getElementById("class-ul")
    let arrow5 = document.getElementById("arrow5")
    let date = document.getElementById("due")

    localStorage.setItem('user_id', 1)
        let id = localStorage.getItem('user_id')

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
            listItem.innerHTML = `
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


}

//function to get checked checkbox
function getChecked() {
    let checkboxes = document.getElementsByName("class_name");
    let checkedValue = "";
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedValue += checkboxes[i].value;
        }
    } return checkedValue;
}

// function to create assignment
pages.createAssignment = () => {
    let assign_btn = document.getElementById("create_assignment");
    assign_btn.addEventListener('click', async function (e) {
        e.preventDefault()

        let title = document.getElementById("title").value;
        let instructions = document.getElementById("instructions").value;
        let class_name = getChecked();
        let due = document.getElementById("due").value;
        
        localStorage.setItem('user_id', 3)
        let id = localStorage.getItem('user_id')

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
        // window.location.replace('/index.html')

    })
}

// function to create and display assignment li
function displayAssignments(assignments_array) {
    const assignments_list = document.getElementById("assignments-ul");

    assignments_list.innerHTML = "";
    assignments_array.forEach((assignment) => {
        let assignment_li = document.createElement("li");

        assignment_li.innerHTML = `
        <div class="li-title" id="li-title"><svg focusable="false" width="24" height="24"
                    viewBox="0 0 24 24" class=" NMm5M hhikbc svg-blue">
                    <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7z"></path>
                    <path
                        d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z">
                    </path>
                </svg><span>${assignment.title}</span></div>
                <div class="due-date">Due ${assignment.due}</div>
    `;
        assignments_list.appendChild(assignment_li)
        assignment_li.classList.add("assignment-li")
    })
}

// get assigmnets
pages.getAssignments = () => {

    window.onload = async function () {
        const class_id = "3";
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
            displayAssignments(json)
        }
        catch (e) {
            console.log("failed to fetch", e)
        }
    }
}

//this will load the scripts of the mentioned page
pages.loadFor = (func_name) => {
    eval("pages." + func_name + "();")
}



function toggleMenu() {
    var menuItems = document.getElementById("menuItems");
    menuItems.classList.toggle("show");
  }
  