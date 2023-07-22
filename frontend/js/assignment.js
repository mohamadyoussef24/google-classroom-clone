
// populating class list with class names
let arrow2 = document.getElementById("arrow2");
let class_array = ['tech', 'softskilss', 'uix']
const class_ul = document.getElementById("class-ul");

class_array.forEach((post) => {
    let listItem = document.createElement("li")
    listItem.innerHTML = `
  <input type="checkbox">
  <span>${post}</span>
  `;
    class_ul.appendChild(listItem)
})

// function to show dropdown
function displayPosts() {
    const class_array = document.getElementById("class-ul");
    class_array.classList.toggle("hidden")
}

arrow2.addEventListener('click', displayPosts)