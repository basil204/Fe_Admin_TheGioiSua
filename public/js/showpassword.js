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
document.querySelector(".app-sidebar__user-name").textContent = userInfo.role;
document
  .getElementById("logoutButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    window.location.href = "/login";
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
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
          window.location.href = "/";
        } else {
          const errorMessage =
            data.errorMessage ||
            "Đăng nhập không thành công. Vui lòng thử lại.";
          swal("Lỗi!", errorMessage, "error");

          document.querySelector(".thoong-bao-loi").textContent = errorMessage;
        }
      })
      .catch((error) => {
        // console.error("Đã xảy ra lỗi trong quá trình đăng nhập:", error);
        swal("Lỗi!", "Đăng nhập không thành công. Vui lòng thử lại.", "error");

        // Optionally update the error span directly
        document.querySelector(".thoong-bao-loi").textContent =
          "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.";
      });
  });
