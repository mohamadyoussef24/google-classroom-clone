///////////////////////// testing accept email

const confirm1 = document.getElementById('confirm1')

confirm1.addEventListener("click", function(event){
    event.preventDefault()
    var url = "http://127.0.0.1:5500/frontend/views/stream.html?code=asdsad&email=aaa@gmail.com";
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
    // window.location.replace(url + "?code=" + get_code)
});