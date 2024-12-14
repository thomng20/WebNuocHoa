
const login = JSON.parse(localStorage.getItem("login"))

if(login != undefined){
    const name = login.name
    const loginHtml = 
                        `<span style="color: white">${name}</span>
                        <ion-icon name="people-outline" id="user_header"></ion-icon>
                        <span><button class="" id="logout"><ion-icon name="log-out-outline"></ion-icon></button></span>
                        `
    $(".login_logout").html(loginHtml)
}else{
    const loginHtml = 
                        `<span><a href="./login.html">Đăng Nhập</a></span>
                        <ion-icon name="people-outline" id="user_header"></ion-icon>
                        `
    $(".login_logout").html(loginHtml)
}
const btn = $("#logout")
btn.off("click").on("click",(e)=>{
    localStorage.removeItem("login")
    location.href = "index.html"
})