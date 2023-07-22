
async function showDropdowns() {

    // populating class list with class names
    let arrow2 = document.getElementById("arrow2")
    let class_ul = document.getElementById("class-ul")
    let arrow5 = document.getElementById("arrow5")
    let date = document.getElementById("due")

    let class_array = ['tech', 'softskilss', 'uix']
    class_array.forEach((post) => {
        let listItem = document.createElement("li")
        listItem.innerHTML = `
  <input type="checkbox" name="class_name" value="${post}">
  <span>${post}</span>
  `;
        class_ul.appendChild(listItem)
    })

    // show dropdowns
    arrow2.addEventListener('click', function () {
        class_ul.classList.toggle("hidden")
    })

    arrow5.addEventListener('click', function () {
        date.classList.toggle("hidden")
    })

}

function getChecked() {
    let checkboxes = document.getElementsByName("class_name");
    let checkedValue = "";
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedValue += checkboxes[i].value;
        }
    } return checkedValue;
}


function createAssignment() {
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
            const response = await fetch('http://localhost/google-classroom-backend/create_assignment.php', requestOptions)
            const json = await response.json()
            console.log(json)
        } catch (e) {
            console.log("failed to fetch", e)
        }
        // window.location.replace('/index.html')

    })
}

showDropdowns();
createAssignment();