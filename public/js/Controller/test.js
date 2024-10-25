var app = angular.module("myApp", ["ngRoute"]);
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

  // Pagination Setup
  $scope.currentPage = 1;
  $scope.itemsPerPage = 5;
  $scope.milkdetails = []; // Initialize as an empty array to avoid undefined errors

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
      milkdetailcode: $scope.formData.milkdetailcode,
      product: { id: $scope.formData.productId },
      milkTaste: { id: $scope.formData.milkTasteId },
      packagingUnit: { id: $scope.formData.packagingunitId },
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
      })
      .catch((error) => handleApiError("Có lỗi xảy ra", error));
  };

  // Initialize Data
  $scope.getBrands();
  $scope.getTastes();
  $scope.getPackagingunits();
  $scope.getUsagecapacitys();
  $scope.getProducts();
  $scope.getMilkdetails();
});
