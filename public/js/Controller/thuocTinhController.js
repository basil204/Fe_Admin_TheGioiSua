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
app.controller("TypeController", function ($scope, $http, $location) {
  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3000/api/Milktype";

  $scope.types = [];
  $scope.deletedTypes = [];
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

  $scope.getTypes = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/lst`,
    }).then(
      function (response) {
        $scope.types = response.data.filter((type) => type.status === 1);
      },
      function (error) {
        $scope.showNotification("Không thể tải danh sách loại sữa", "error");
        handleError(error);
      }
    );
  };

  $scope.getDeletedTypes = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/lst`,
    }).then(
      function (response) {
        $scope.deletedTypes = response.data.filter((type) => type.status === 0);
      },
      function (error) {
        $scope.showNotification(
          "Không thể tải danh sách loại sữa đã xóa",
          "error"
        );
        handleError(error);
      }
    );
  };

  $scope.getTypeById = function (id) {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/${id}`,
    }).then(
      function (response) {
        $scope.formData = response.data;
      },
      function (error) {
        $scope.showNotification("Không thể tải dữ liệu loại sữa", "error");
        handleError(error);
      }
    );
  };

  $scope.deleteType = function (id) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        $scope.showNotification("Xóa loại sữa thành công", "success");
        $scope.getTypes();
        $scope.getDeletedTypes();
      },
      function (error) {
        $scope.showNotification("Không thể xóa loại sữa", "error");
        handleError(error);
      }
    );
  };
  $scope.RollbackType = function (id) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        $scope.showNotification("khôi phục loại sữa thành công", "success");
        $scope.getTypes();
        $scope.getDeletedTypes();
      },
      function (error) {
        $scope.showNotification("Không thể khôi phục loại sữa", "error");
        handleError(error);
      }
    );
  };
  $scope.addType = function () {
    const isUpdating = !!$scope.formData.id;
    const apiUrl = isUpdating
      ? `${API_BASE_URL}/update/${$scope.formData.id}`
      : `${API_BASE_URL}/add`;

    const typeData = {
      milkTypename: $scope.formData.milkTypename,
      description: $scope.formData.description,
    };
    console.log(typeData);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const request = isUpdating
      ? $http.put(apiUrl, typeData, config)
      : $http.post(apiUrl, typeData, config);

    request.then(
      function (response) {
        $scope.showNotification(
          isUpdating
            ? "Cập nhật loại sữa thành công"
            : "Thêm loại sữa mới thành công",
          "success"
        );
        $scope.getTypes();
        $scope.formData = {};
      },
      function (error) {
        $scope.showNotification("Không thể thêm/cập nhật loại sữa", "error");
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

  $scope.getTypes();
  $scope.getDeletedTypes();
});
app.controller("PackagingunitController", function ($scope, $http, $location) {
  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3000/api/Packagingunit";

  $scope.packagingunits = [];
  $scope.deletedPackagingunits = [];
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

  $scope.getPackagingunits = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/lst`,
    }).then(
      function (response) {
        $scope.packagingunits = response.data.filter(
          (packagingunit) => packagingunit.status === 1
        );
      },
      function (error) {
        $scope.showNotification("Không thể tải danh sách loại sữa", "error");
        handleError(error);
      }
    );
  };

  $scope.getDeletedPackagingunits = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/lst`,
    }).then(
      function (response) {
        $scope.deletedPackagingunits = response.data.filter(
          (packagingunit) => packagingunit.status === 0
        );
      },
      function (error) {
        $scope.showNotification(
          "Không thể tải danh sách loại sữa đã xóa",
          "error"
        );
        handleError(error);
      }
    );
  };

  $scope.getPackagingunitById = function (id) {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/${id}`,
    }).then(
      function (response) {
        $scope.formData = response.data;
      },
      function (error) {
        $scope.showNotification("Không thể tải dữ liệu loại sữa", "error");
        handleError(error);
      }
    );
  };

  $scope.deletePackagingunit = function (id) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        $scope.showNotification("Xóa loại đóng gói thành công", "success");
        $scope.getPackagingunits();
        $scope.getDeletedPackagingunits();
      },
      function (error) {
        $scope.showNotification("Không thể xóa loại đóng gói", "error");
        handleError(error);
      }
    );
  };
  $scope.RollbackPackagingunit = function (id) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        $scope.showNotification(
          "khôi phục loại đóng gói thành công",
          "success"
        );
        $scope.getPackagingunits();
        $scope.getDeletedPackagingunits();
      },
      function (error) {
        $scope.showNotification("Không thể khôi phục loại đóng gói", "error");
        handleError(error);
      }
    );
  };
  $scope.addPackagingunit = function () {
    const isUpdating = !!$scope.formData.id;
    const apiUrl = isUpdating
      ? `${API_BASE_URL}/update/${$scope.formData.id}`
      : `${API_BASE_URL}/add`;

    const packagingunitData = {
      packagingunitname: $scope.formData.packagingunitname,
    };
    console.log(packagingunitData);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const request = isUpdating
      ? $http.put(apiUrl, packagingunitData, config)
      : $http.post(apiUrl, packagingunitData, config);

    request.then(
      function (response) {
        $scope.showNotification(
          isUpdating
            ? "Cập nhật loại đóng gói thành công"
            : "Thêm loại đóng gói mới thành công",
          "success"
        );
        $scope.getPackagingunits();
        $scope.formData = {};
      },
      function (error) {
        $scope.showNotification(
          "Không thể thêm/cập nhật loại đóng gói",
          "error"
        );
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

  $scope.getPackagingunits();
  $scope.getDeletedPackagingunits();
});
