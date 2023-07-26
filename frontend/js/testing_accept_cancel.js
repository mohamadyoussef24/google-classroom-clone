///////////////////////// testing accept email
window.onload = function() {


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

        fetch(base_url + 'Check_user_class.php', {
            method: "POST",
            body: checkclass_form
        })
        .then((res) => res.json())
        .then((data) => {
            result = data.status
            console.log(result)
        
            localStorage.setItem("user_id", data.user_id)
            
        
            window.location.replace(url + "?code=" + get_code);
        })
        

    .catch((err) => {
        console.log("Fetch error:", err);
    });
 } catch (err) {
    console.log("Error:", err);

  }
  

}