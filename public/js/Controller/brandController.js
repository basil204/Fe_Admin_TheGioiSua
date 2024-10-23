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
