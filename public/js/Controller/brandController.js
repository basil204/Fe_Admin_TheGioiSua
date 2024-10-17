var app = angular.module("myApp", ["ngRoute"]);

app.controller("BrandController", function ($scope, $http, $location) {
  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://localhost:3000/api/brand";

  $scope.brands = [];
  $scope.deletedBrands = [];
  $scope.formData = {};

  // Function to fetch all active brands
  $scope.getBrands = function () {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/lst`,
    }).then(
      function (response) {
        $scope.brands = response.data.filter((brand) => brand.status === 1);
      },
      function (error) {
        handleError(error);
      }
    );
  };

  // Function to fetch all deleted brands
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
        handleError(error);
      }
    );
  };

  // Function to fetch a single brand by ID
  $scope.getBrandById = function (id) {
    $http({
      method: "GET",
      url: `${API_BASE_URL}/${id}`,
    }).then(
      function (response) {
        $scope.formData = response.data;
      },
      function (error) {
        handleError(error);
      }
    );
  };

  // Function to delete a brand
  $scope.deleteBrand = function (id) {
    $http({
      method: "DELETE",
      url: `${API_BASE_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      function () {
        alert("Brand deleted successfully");
        $scope.getBrands();
        $scope.getDeletedBrands();
      },
      function (error) {
        handleError(error);
      }
    );
  };

  // Function to add or update a brand
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
        console.log(
          isUpdating
            ? "Updated brand successfully"
            : "Added brand successfully",
          response.data
        );
        $scope.getBrands();
        $scope.formData = {};
      },
      function (error) {
        handleError(error);
      }
    );
  };

  // Function to reset the form
  $scope.resetForm = function () {
    $scope.formData = {};
  };

  // General error handling function
  function handleError(error) {
    console.error("Error:", error);
    if (error.status === 401) {
      $location.path("/login");
    }
  }

  // Initialize brand list when the controller is loaded
  $scope.getBrands();
  $scope.getDeletedBrands();
});
