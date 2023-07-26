const user_id = localStorage.getItem("user_id")
const class_code = localStorage.getItem("class_code")

// Helper function to create a FileList from an array of File objects
function createFileList(files) {
  const dataTransfer = new DataTransfer();
  for (const file of files) {
    dataTransfer.items.add(file);
  }
  return dataTransfer.files;
}

// Create a hidden file input element
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.multiple = true;
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

// Get the file button and the file list element
const fileButton = document.getElementById('fileButton');
const fileList = document.getElementById('fileList');

// Add an event listener to the file button
fileButton.addEventListener('click', function () {
  // Trigger the file input element when the button is clicked
  fileInput.click();
});

// Add an event listener to the file input element
fileInput.addEventListener('change', function (event) {
  // Get the selected files
  const selectedFiles = event.target.files;

  // Display the selected files in the list
  for (const file of selectedFiles) {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');

    // Create an icon element based on the file type
    const fileIcon = document.createElement('i');
    fileIcon.classList.add('file-icon', 'far');
    if (file.type.includes('image')) {
      fileIcon.classList.add('fa-file-image');
    } else if (file.type.includes('audio')) {
      fileIcon.classList.add('fa-file-audio');
    } else if (file.type.includes('video')) {
      fileIcon.classList.add('fa-file-video');
    } else {
      fileIcon.classList.add('fa-file');
    }

    // Create a span element for the file name
    const fileNameSpan = document.createElement('span');
    fileNameSpan.classList.add('file-name');
    fileNameSpan.textContent = file.name;

    // Append an input element to hold the actual file
    const fileInputClone = fileInput.cloneNode();
    fileInputClone.multiple = false;
    fileInputClone.style.display = 'none';
    fileInputClone.files = createFileList([file]);
    fileItem.appendChild(fileInputClone);

    // Append the icon and file name to the file item
    fileItem.appendChild(fileIcon);
    fileItem.appendChild(fileNameSpan);

    // Append the file item to the file list
    fileList.appendChild(fileItem);
  }

  // Clear the file input element to allow selecting the same file again
  fileInput.value = '';
});

// Add an event listener to the send button
// const sendButton = document.getElementById('sendButton');
// sendButton.addEventListener('click', function () {
//   // Create a FormData object and append the selected files to it
//   const formData = new FormData();
//   const fileItems = fileList.getElementsByClassName('file-item');
//   for (const fileItem of fileItems) {
//     const fileInputClone = fileItem.querySelector('input[type=file]');
//     if (fileInputClone && fileInputClone.files.length > 0) {
//       const file = fileInputClone.files[0];
//       formData.append('uploadedFiles[]', file, file.name);
//     }
//   }
//   formData.append('class_code',class_code)
//   formData.append('user_id',user_id)
//   // Send the FormData to PHP using Fetch API
//   fetch('http://localhost/Assignments/google-classroom-clone/backend/create_assignment.php', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => response.text())
//   .then(responseText => {
//     console.log(responseText); // Response from PHP (you can handle it as needed)
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// });