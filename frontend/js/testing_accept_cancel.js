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

    if (get_code.trim() == ""||email_sent.trim()==""){
        window.location.replace('/index.html')
    }else{

    }
    //// join class as student////
    
    // window.location.replace(url + "?code=" + get_code);



}

