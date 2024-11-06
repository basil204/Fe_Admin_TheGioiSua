document.addEventListener("DOMContentLoaded", function () {
  // Show/hide password functionality
  $(".click-eye").click(function () {
    $(this).toggleClass("bx-show bx-hide");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo && userInfo.role) {
    document.querySelector(".app-sidebar__user-name").textContent =
      userInfo.role;
  }

  // Logout event handler
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      window.location.href = "/login";
    });
  }

  // Login form submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
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
        .then((response) => {
          if (response.status === 403) {
            throw new Error(
              "You do not have permission to access this resource."
            );
          }
          return response.json();
        })
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
            document.querySelector(".thoong-bao-loi").textContent =
              errorMessage;
          }
        })
        .catch((error) => {
          swal(
            "Lỗi!",
            error.message || "Đăng nhập không thành công. Vui lòng thử lại.",
            "error"
          );
          document.querySelector(".thoong-bao-loi").textContent =
            error.message ||
            "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.";
        });
    });
  }
});
