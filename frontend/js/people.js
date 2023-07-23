

// function to create and display assignment li
function displayParticipants(people_array, person) {
    let people_list = document.getElementById(`${person}-ul`);

    people_list.innerHTML = "";
    people_array.forEach((participant) => {
        let participant_li = document.createElement("li");

        participant_li.innerHTML = `
        <li class="participant-li">
                <div class="flex gap10 center">
                <span><img class="icon b-circle" src="/assets/svgs/unnamed.png" alt=""></span>
                <span>${participant.first_name} ${participant.last_name}</span></div>
                <div class="flex center"><svg class="svg-grey" focusable="false" width="24" height="24" viewBox="0 0 24 24" class=" NMm5M"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></div>
            </li>
    `;
        people_list.appendChild(participant_li)
    })
}

window.onload = async function () {

    const class_id = "5";
    let formdata = new FormData();
    formdata.append("class_id", class_id);

    let requestOptions = {
        method: 'POST',
        body: formdata
    };

    try {
        const assignments = await fetch("http://localhost/google-classroom-backend/get_students.php", requestOptions)
        const json = await assignments.json()
        console.log(json)
        displayParticipants(json, "students")
    }
    catch (e) {
        console.log("failed to fetch", e)
    }

    try {
        const assignments = await fetch("http://localhost/google-classroom-backend/get_teachers.php", requestOptions)
        const json = await assignments.json()
        console.log(json)
        displayParticipants(json, "teachers")
    }
    catch (e) {
        console.log("failed to fetch", e)
    }
}

const invite_btn = document.getElementById("invite_icon")
const invite_btn2 = document.getElementById("invite_icon2")
const cancel_btn = document.getElementById("cancel_icon")

invite_btn.addEventListener('click', function(){
        let overlay = document.getElementById('overlay');
        overlay.style.display = "flex";
})

invite_btn2.addEventListener('click', function(){
        let overlay = document.getElementById('overlay');
        overlay.style.display = "flex";
})

cancel_btn.addEventListener('click', function(){
    overlay.style.display = "none";
    });
