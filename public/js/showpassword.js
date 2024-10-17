//show - hide mật khẩu
function myFunction() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
$(".click-eye").click(function () {
  $(this).toggleClass("bx-show bx-hide");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo) {
  document.querySelector(".app-sidebar__user-name").textContent = userInfo.role;
} else {
  window.location.href = "/login";
}
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
    const formData = new FormData(this);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
          window.location.href = "/"; // Chuyển hướng sau khi đăng nhập thành công
        } else {
          swal(
            "Lỗi!",
            "Đăng nhập không thành công. Vui lòng thử lại.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi trong quá trình đăng nhập:", error);
        swal("Lỗi!", "Đăng nhập không thành công. Vui lòng thử lại.", "error");
      });
  });
