var app = angular.module("myApp", ["ngRoute"]);
app.controller("BrandController", function ($scope, $http, $location) {
  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3000/api/Milkbrand";

  $scope.brands = [];
  $scope.deletedBrands = [];
  $scope.formData = {};
  $scope.notification = { message: "", type: "" };

  $scope.showNotification = function (message, type) {
    $scope.notification.message = message;
    $scope.notification.type = type;
    setTimeout(() => {
      $scope.clearNotification();
      $scope.$apply();
    }, 3000);
  };

  $scope.clearNotification = function () {
    $scope.notification.message = "";
    $scope.notification.type = "";
  };

  $scope.getBrands = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/lst`,
    }).then(
      function (response) {
        $scope.brands = response.data.filter((brand) => brand.status === 1);
      },
      function (error) {
        $scope.showNotification("Không thể tải danh sách thương hiệu", "error");
        handleError(error);
      }
    );
  };

  $scope.getDeletedBrands = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/lst`,
    }).then(
      function (response) {
        $scope.deletedBrands = response.data.filter(
          (brand) => brand.status === 0
        );
      },
      function (error) {
        $scope.showNotification(
          "Không thể tải danh sách thương hiệu đã xóa",
          "error"
        );
        handleError(error);
      }
    );
  };

  $scope.getBrandById = function (id) {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/${id}`,
    }).then(
      function (response) {
        $scope.formData = response.data;
      },
      function (error) {
        $scope.showNotification("Không thể tải dữ liệu thương hiệu", "error");
        handleError(error);
      }
    );
  };

  $scope.deleteBrand = function (id) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        $scope.showNotification("Xóa thương hiệu thành công", "success");
        $scope.getBrands();
        $scope.getDeletedBrands();
      },
      function (error) {
        $scope.showNotification("Không thể xóa thương hiệu", "error");
        handleError(error);
      }
    );
  };
  $scope.RollbackBrand = function (id) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        $scope.showNotification("khôi phục thương hiệu thành công", "success");
        $scope.getBrands();
        $scope.getDeletedBrands();
      },
      function (error) {
        $scope.showNotification("Không thể khôi phục thương hiệu", "error");
        handleError(error);
      }
    );
  };
  $scope.addBrand = function () {
    const isUpdating = !!$scope.formData.id;
    const apiUrl = isUpdating
      ? `${API_BASE_URL}/update/${$scope.formData.id}`
      : `${API_BASE_URL}/add`;

    const brandData = {
      milkbrandname: $scope.formData.milkbrandname,
      description: $scope.formData.description,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const request = isUpdating
      ? $http.put(apiUrl, brandData, config)
      : $http.post(apiUrl, brandData, config);

    request.then(
      function (response) {
        $scope.showNotification(
          isUpdating
            ? "Cập nhật thương hiệu thành công"
            : "Thêm thương hiệu mới thành công",
          "success"
        );
        $scope.getBrands();
        $scope.formData = {};
      },
      function (error) {
        $scope.showNotification("Không thể thêm/cập nhật thương hiệu", "error");
        handleError(error);
      }
    );
  };

  $scope.resetForm = function () {
    $scope.formData = {};
  };

  function handleError(error) {
    console.error("Error:", error);
    if (error.status === 401) {
      $location.path("/login");
    }
  }

  $scope.getBrands();
  $scope.getDeletedBrands();
});
app.controller("MilktasteController", function ($scope, $http, $location) {
  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3000/api/Milktaste";

  $scope.Tastes = [];
  $scope.deletedTastes = [];
  $scope.formData = {};
  $scope.notification = { message: "", type: "" };

  $scope.showNotification = function (message, type) {
    $scope.notification.message = message;
    $scope.notification.type = type;
    setTimeout(() => {
      $scope.clearNotification();
      $scope.$apply();
    }, 3000);
  };

  $scope.clearNotification = function () {
    $scope.notification.message = "";
    $scope.notification.type = "";
  };

  $scope.getTastes = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/lst`,
    }).then(
      function (response) {
        $scope.tastes = response.data.filter((taste) => taste.status === 1);
      },
      function (error) {
        $scope.showNotification("Không thể tải danh sách thương hiệu", "error");
        handleError(error);
      }
    );
  };

  $scope.getDeletedTastes = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/lst`,
    }).then(
      function (response) {
        $scope.deletedTastes = response.data.filter(
          (Taste) => Taste.status === 0
        );
      },
      function (error) {
        $scope.showNotification(
          "Không thể tải danh sách thương hiệu đã xóa",
          "error"
        );
        handleError(error);
      }
    );
  };

  $scope.getTasteById = function (id) {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/${id}`,
    }).then(
      function (response) {
        $scope.formData = response.data;
      },
      function (error) {
        $scope.showNotification("Không thể tải dữ liệu thương hiệu", "error");
        handleError(error);
      }
    );
  };

  $scope.deleteTaste = function (id) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        $scope.showNotification("Xóa vị sữa thành công", "success");
        $scope.getTastes();
        $scope.getDeletedTastes();
      },
      function (error) {
        $scope.showNotification("Không thể xóa vị sữa", "error");
        handleError(error);
      }
    );
  };
  $scope.RollbackTaste = function (id) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        $scope.showNotification("khôi phục vị sữa thành công", "success");
        $scope.getTastes();
        $scope.getDeletedTastes();
      },
      function (error) {
        $scope.showNotification("Không thể khôi phục vị sữa", "error");
        handleError(error);
      }
    );
  };
  $scope.addTaste = function () {
    const isUpdating = !!$scope.formData.id;
    const apiUrl = isUpdating
      ? `${API_BASE_URL}/update/${$scope.formData.id}`
      : `${API_BASE_URL}/add`;

    const TasteData = {
      milktastename: $scope.formData.milktastename,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const request = isUpdating
      ? $http.put(apiUrl, TasteData, config)
      : $http.post(apiUrl, TasteData, config);

    request.then(
      function (response) {
        $scope.showNotification(
          isUpdating
            ? "Cập nhật vị sữa thành công"
            : "Thêm vị sữa mới thành công",
          "success"
        );
        $scope.getTastes();
        $scope.formData = {};
      },
      function (error) {
        $scope.showNotification("Không thể thêm/cập nhật vị sữa", "error");
        handleError(error);
      }
    );
  };

  $scope.resetForm = function () {
    $scope.formData = {};
  };

  function handleError(error) {
    console.error("Error:", error);
    if (error.status === 401) {
      $location.path("/login");
    }
  }

  $scope.getTastes();
  $scope.getDeletedTastes();
});
