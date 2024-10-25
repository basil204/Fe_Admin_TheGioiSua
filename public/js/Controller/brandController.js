var app = angular.module("myApp1", ["ngRoute"]);

app.controller("MasterController", function ($scope, $http, $location) {
  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3000/api";

  // Initial state
  $scope.data = {
    brands: [],
    deletedBrands: [],
    tastes: [],
    deletedTastes: [],
    types: [],
    deletedTypes: [],
    packagingUnits: [],
    deletedPackagingUnits: [],
    targetUsers: [],
    deletedTargetUsers: [],
    usageCapacities: [],
    deletedUsageCapacities: [],
  };

  $scope.formData = {};
  $scope.notification = { message: "", type: "" };

  // Show notification
  $scope.showNotification = function (message, type) {
    $scope.notification.message = message;
    $scope.notification.type = type;
    setTimeout(() => {
      $scope.clearNotification();
      if (!$scope.$$phase) $scope.$apply();
    }, 3000);
  };

  $scope.clearNotification = function () {
    $scope.notification.message = "";
    $scope.notification.type = "";
  };

  // Error handling function
  function handleError(error) {
    console.error("Error:", error);
    if (error.status === 401) {
      $location.path("/login");
    }
  }

  // Fetch data for a specific endpoint and filter by status
  function fetchData(endpoint, status, targetProperty) {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/${endpoint}/lst`,
    }).then(
      function (response) {
        $scope.data[targetProperty] = response.data.filter(
          (item) => item.status === status
        );
      },
      function (error) {
        $scope.showNotification("Không thể tải dữ liệu", "error");
        handleError(error);
      }
    );
  }

  // Fetch all required data
  $scope.getAllData = function () {
    fetchData("Milkbrand", 1, "brands");
    fetchData("Milkbrand", 0, "deletedBrands");
    fetchData("Milktaste", 1, "tastes");
    fetchData("Milktaste", 0, "deletedTastes");
    fetchData("Milktype", 1, "types");
    fetchData("Milktype", 0, "deletedTypes");
    fetchData("Packagingunit", 1, "packagingUnits");
    fetchData("Packagingunit", 0, "deletedPackagingUnits");
    fetchData("Targetuser", 1, "targetUsers");
    fetchData("Targetuser", 0, "deletedTargetUsers");
    fetchData("Usagecapacity", 1, "usageCapacities");
    fetchData("Usagecapacity", 0, "deletedUsageCapacities");
  };

  // Fetch an item by ID
  $scope.getItemById = function (endpoint, id) {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/${endpoint}/${id}`,
    }).then(
      function (response) {
        $scope.formData = response.data;
      },
      function (error) {
        $scope.showNotification("Không thể tải dữ liệu", "error");
        handleError(error);
      }
    );
  };

  // Delete or rollback an item
  $scope.deleteOrRollbackItem = function (endpoint, id, rollback = false) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${endpoint}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        $scope.showNotification(
          rollback ? "Khôi phục thành công" : "Xóa thành công",
          "success"
        );
        $scope.getAllData();
      },
      function (error) {
        $scope.showNotification(
          rollback ? "Không thể khôi phục" : "Không thể xóa",
          "error"
        );
        handleError(error);
      }
    );
  };

  // Add or update an item
  $scope.addOrUpdateItem = function (endpoint) {
    const isUpdating = !!$scope.formData.id;
    const apiUrl = isUpdating
      ? `${API_BASE_URL}/${endpoint}/update/${$scope.formData.id}`
      : `${API_BASE_URL}/${endpoint}/add`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const request = isUpdating
      ? $http.put(apiUrl, $scope.formData, config)
      : $http.post(apiUrl, $scope.formData, config);

    request.then(
      function () {
        $scope.showNotification(
          isUpdating ? "Cập nhật thành công" : "Thêm mới thành công",
          "success"
        );
        $scope.getAllData();
        $scope.formData = {};
      },
      function (error) {
        $scope.showNotification("Không thể thêm/cập nhật", "error");
        handleError(error);
      }
    );
  };

  // Reset the form data
  $scope.resetForm = function () {
    $scope.formData = {};
  };

  // Initialize all data on load
  $scope.getAllData();
});
app.controller("MilkDetailController", function ($scope, $http, $location) {
  // Notification Setup
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

  // Pagination Setup
  $scope.currentPage = 1;
  $scope.itemsPerPage = 5;
  $scope.milkdetails = []; // Initialize as an empty array to avoid undefined errors
  $scope.formData = {};
  $scope.numberOfPages = () =>
    $scope.milkdetails
      ? Math.ceil($scope.milkdetails.length / $scope.itemsPerPage)
      : 0;

  $scope.previousPage = () => {
    if ($scope.currentPage > 1) $scope.currentPage--;
  };

  $scope.nextPage = () => {
    if ($scope.currentPage < $scope.numberOfPages()) $scope.currentPage++;
  };

  // API URLs
  const API_BASES = {
    MilkDetail: "http://localhost:3000/api/Milkdetail",
    MilkBrand: "http://localhost:3000/api/Milkbrand",
    MilkTaste: "http://localhost:3000/api/Milktaste",
    Product: "http://localhost:3000/api/Product",
    PackagingUnit: "http://localhost:3000/api/Packagingunit",
    UsageCapacity: "http://localhost:3000/api/Usagecapacity",
  };

  // Utility Function to Handle API Errors
  const handleApiError = (message, error) => {
    $scope.showNotification(message, "error");
    console.error(error);
  };

  // Image Upload Function
  $scope.uploadImage = function (files) {
    const imgbbApiKey = "588779c93c7187148b4fa9b7e9815da9";
    const file = files[0];

    if (!file) return $scope.showNotification("No file selected", "error");

    const formData = new FormData();
    formData.append("key", imgbbApiKey);
    formData.append("image", file);

    $http
      .post("https://api.imgbb.com/1/upload", formData, {
        headers: { "Content-Type": undefined },
        transformRequest: angular.identity,
      })
      .then((response) => {
        const imageUrl = response.data?.data?.url;
        if (imageUrl) {
          $scope.formData.imgUrl = imageUrl;
          $scope.showNotification("Image uploaded successfully", "success");
        } else {
          $scope.showNotification("Failed to upload image", "error");
        }
      })
      .catch((error) => handleApiError("Failed to upload image", error));
  };

  // Fetch Data from APIs
  const fetchData = (url, successHandler, errorMessage) => {
    $http
      .get(url)
      .then((response) => successHandler(response.data))
      .catch((error) => handleApiError(errorMessage, error));
  };

  // Fetching and Filtering Data Functions
  $scope.getMilkdetails = () => {
    fetchData(
      `${API_BASES.MilkDetail}/lst`,
      (data) => {
        $scope.milkdetails = data.filter((item) => item.status === 1);
        $scope.totalPages = Math.ceil(
          $scope.milkdetails.length / $scope.itemsPerPage
        );
      },
      "Không thể tải danh sách sản phẩm"
    );
  };

  $scope.getBrands = () =>
    fetchData(
      `${API_BASES.MilkBrand}/lst`,
      (data) => ($scope.brands = data),
      "Không thể tải danh sách thương hiệu"
    );
  $scope.getTastes = () =>
    fetchData(
      `${API_BASES.MilkTaste}/lst`,
      (data) => ($scope.tastes = data),
      "Không thể tải danh sách mùi vị"
    );
  $scope.getPackagingunits = () =>
    fetchData(
      `${API_BASES.PackagingUnit}/lst`,
      (data) => ($scope.packagingunits = data),
      "Không thể tải danh sách loại bao bì"
    );
  $scope.getUsagecapacitys = () =>
    fetchData(
      `${API_BASES.UsageCapacity}/lst`,
      (data) => ($scope.usagecapacitys = data),
      "Không thể tải danh sách công suất"
    );
  $scope.getProducts = () =>
    fetchData(
      `${API_BASES.Product}/lst`,
      (data) => ($scope.products = data),
      "Không thể tải danh sách sản phẩm"
    );

  // Fetch Milk Detail by ID
  $scope.getMilkdetailById = function (id) {
    fetchData(
      `${API_BASES.MilkDetail}/${id}`,
      (data) => {
        $scope.formData = data;
        $scope.formData.milkTasteId = data.milkTaste.id;
        $scope.formData.packagingunitId = data.packagingunit.id;
        $scope.formData.usageCapacityIds = data.usageCapacity.id;
        $scope.formData.productId = data.product.id;
      },
      "Không thể tải chi tiết sản phẩm"
    );
  };

  // Update Milk Detail
  $scope.updateMilkdetail = function () {
    const id = $scope.formData.id;
    const updatedMilkdetail = {
      product: { id: $scope.formData.productId },
      milkTaste: { id: $scope.formData.milkTasteId },
      packagingunit: { id: $scope.formData.packagingunitId },
      usageCapacity: { id: $scope.formData.usageCapacityIds },
      expirationdate: $scope.formData.expirationdate,
      imgUrl: $scope.formData.imgUrl,
      price: $scope.formData.price,
      description: $scope.formData.description,
      stockquantity: $scope.formData.stockquantity,
    };

    $http
      .put(`${API_BASES.MilkDetail}/update/${id}`, updatedMilkdetail, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        $scope.showNotification(response.data.message, "success");
        $scope.getMilkdetails();
        $scope.resetForm();
      })
      .catch((error) => handleApiError("Có lỗi xảy ra", error));
  };
  $scope.resetForm = function () {
    $scope.formData = {};
  };
  // Initialize Data
  $scope.getBrands();
  $scope.getTastes();
  $scope.getPackagingunits();
  $scope.getUsagecapacitys();
  $scope.getProducts();
  $scope.getMilkdetails();
});
