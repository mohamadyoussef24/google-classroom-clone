///////////////////////// testing accept email

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

  

window.onload = function() {
    
    
    const base_url = "http://localhost/Assignments/google-classroom-clone/backend/";


    var url = window.location.href
    let get_code, email_sent, arraypair=[];
    
 
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    i=0
    for(let pair of queryString.entries()) {
        arraypair[i]=pair[1]
        i++
    }
    
    get_code=arraypair[0]
    email_sent=arraypair[1]
    console.log(get_code)
    console.log(email_sent)

    if (get_code.trim() == "" || email_sent.trim()==""){
        window.location.replace('/index.html')
    }else{

    }
    //// join class as student////
    

    try {
    const checkclass_form = new FormData()
    checkclass_form.append("email", email_sent)
    checkclass_form.append("class_code", get_code)

        fetch(base_url + 'join_email_class.php', {
            method: "POST",
            body: checkclass_form
        })
        .then((res) => res.json())
        .then((data) => {
            result = data.status
    
            console.log(result)
            secretKey=123
            id = encrypt(data.user_id, secretKey)
            
            localStorage.setItem("user_id", id)
            
            const url2 = "./stream.html"
            localStorage.setItem('email', email_sent)
            
            window.location.replace(url2 + "?code=" + get_code);
        })
        

    .catch((err) => {
        console.log("Fetch error:", err);
        // window.location.replace("/index.html");

    });
 } catch (err) {
    console.log("Error:", err);
    // window.location.replace("/index.html");

  }
  

}