class User {
  constructor(name, email, password, number) {
    this.name = name
    this.email = email
    this.password = password
    this.number = number
  }
}

$(document).ready(function () {
  localStorage.removeItem("idDetailProduct")

  const seePass = document.getElementById("see_password");
  const passWord = document.getElementById("password");
  seePass.addEventListener('click', function () {

    const typePass = passWord.getAttribute("type") === 'password' ? 'text' : 'password';
    passWord.setAttribute("type", typePass);
    passWord.getAttribute("type") === "password" ? seePass.setAttribute("name", "eye-off-outline") : seePass.setAttribute("name", "eye-outline");

  });
  function checkPass(pass) {

    let passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (passwordPattern.test(pass)) {
      $("#password").css({
        "background": "white"
      })
    } else {
      $("#password").css({
        "background": "red"
      })
    }
  }
  $('#password').on('input', function () {
    let val = $(this).val()
    // console.log(this)
    checkPass(val)
  });

  function checkNumberPhone(numberPhone) { 
    let phoneRegex = /^(0\d{9,10})$/;
    if (phoneRegex.test(numberPhone)) {

      $("#n_phone").css({
        "background": "white"
      })
    } else {
      $("#n_phone").css({
        "background": "red"
      })
    }
  }
  $('#n_phone').on('input', function () {
    let val = $(this).val()
    // console.log(this)
    checkNumberPhone(val)
  });

  function checkEmail(email) { 
    let emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;
    if (emailRegex.test(email)) {

      $("#email").css({
        "background": "white"
      })
    } else {
      $("#email").css({
        "background": "red"
      })
    }
  }
  $('#email').on('input', function () {
    let val = $(this).val()
    // console.log(this)
    checkEmail(val)
  });
  // Sự kiện click cho nút đăng ký
  $("#registerButton").click(function (e) {
    e.preventDefault()
    const name = $("#user_name").val()
    const email = $("#email").val()
    const pass = $("#password").val()
    const numberPhone = $("#n_phone").val()
    const confirm = $("#confirm-password").val()
    if (name === "" || email === "" || pass === "" || numberPhone === "" || confirm === "") {
      alert("Nhập thông tin đầy đủ")
    }
    else {
      // Kiểm tra sự trùng khớp
      if (pass === $("#confirm-password").val()) {
        const phone = "+84" + numberPhone
        e.preventDefault()
        let arrUser = JSON.parse(localStorage.getItem("users"))
        if (arrUser != undefined) {
          function getEmail(emailUser) {
            return arrUser.find(user => user.email === emailUser)
          }
          const findUser = getEmail(email)
          if (findUser == undefined) {
            arrUser.push(new User(name, email, pass, phone))
            localStorage.setItem("users", JSON.stringify(arrUser))

          } else {
            $(".emailLable").attr("style","color: red") // in màu đỏ phần email bị trùng
            return alert("Email đã tồn tại!")
          }
        } else {
          arrUser = new Array()
          arrUser.push(new User(name, email, pass, phone))
          localStorage.setItem("users", JSON.stringify(arrUser))

        }
        alert("Đăng ký thành công!");
        location.href = "login.html" // chuyển đếm giao diện đăng nhập
      } else {
        e.preventDefault()
        alert("Mật khẩu xác nhận không trùng khớp. Vui lòng thử lại.");
      }
    }


  });
});