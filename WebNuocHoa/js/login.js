const seePass = document.getElementById("see_password");
const passWord = document.getElementById("password");
localStorage.removeItem("idDetailProduct")

seePass.addEventListener('click', function () {

    const typePass = passWord.getAttribute("type") === 'password' ? 'text' : 'password';
    passWord.setAttribute("type", typePass);
    passWord.getAttribute("type") === "password" ? seePass.setAttribute("name", "eye-off-outline") : seePass.setAttribute("name", "eye-outline");

});
function checkEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;
    if (emailRegex.test(email)) {

        $("#user_name").css({
            "background": "white"
        })
    } else {
        $("#user_name").css({
            "background": "red"
        })
    }
}
$('#user_name').on('input', function () {
    let val = $(this).val()
    // console.log(this)
    checkEmail(val)
});

$(document).ready(function () {
    const users = JSON.parse(localStorage.getItem("users"))
    console.log(users)
    function getEmail(emailUser) {
        return users.find(user => user.email === emailUser)
    }
    // console.log(users.email)
    // Sự kiện click cho nút đăng nhập
    $("#loginButton").click(function (e) {
        e.preventDefault()
        const email = $("#user_name").val()
        const pass = $("#password").val()
        const emailLocal = getEmail(email)
        if (emailLocal == undefined) {
            alert("Vui lòng điền đầy đủ thông tin đăng nhập!")
        }
        else {
            if (pass !== emailLocal.password) {
                alert("Sai Email hoặc Mật khẩu! Vui lòng kiểm tra lại.")
            }
            else {
                const loginUser = {
                    name: emailLocal.name,
                    email: emailLocal.email,
                }
                localStorage.setItem("login",JSON.stringify(loginUser))
                alert("Đăng nhập thành công!")
                location.href = "index.html" // chuyển đến giao diện trang chủ nếu đăng nhập thành công
            }
        }

    });
});
