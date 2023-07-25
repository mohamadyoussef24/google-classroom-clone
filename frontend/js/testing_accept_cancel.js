///////////////////////// testing accept email

const confirm1 = document.getElementById('confirm1')

confirm1.addEventListener("click", function(event){
    event.preventDefault()
    var url = 'http://127.0.0.1:5500/frontend/views/stream.html';
    var get_code = url.substring(url.lastIndexOf('?') + 1);
    
    window.location.replace(url + "?code=" + get_code)
});