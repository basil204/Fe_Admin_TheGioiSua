var app = angular.module("myApp1", ["ngRoute"]);

app.controller("MasterController", function ($scope, $http, $location) {
  const token = localStorage.getItem("token");
  const API_BASE_URL = "http://160.30.21.47:3001/api";

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
    products: [],
    deletedProducts: [],
    invoices: [],
    deletedInvoices: [],
  };

  $scope.formData = {};
  $scope.notification = { message: "", type: "" };

  // Show notification
  $scope.showNotification = function (message, type) {
    // console.log(`Showing notification: ${message}, type: ${type}`); // Log notification details
    $scope.notification.message = message;
    $scope.notification.type = type;
    setTimeout(() => {
      $scope.clearNotification();
      if (!$scope.$$phase) $scope.$apply();
    }, 3001);
  };

  $scope.clearNotification = function () {
    $scope.notification.message = "";
    $scope.notification.type = "";
  };

  // Error handling function
  function handleError(error) {
    console.error("Error:", error);
    if (error.status === 401) {
      // console.log("Redirecting to login due to unauthorized access"); // Log redirection
      $location.path("/login");
    }
  }
  $scope.uploadImage = function (files) {
    const imgbbApiKey = "588779c93c7187148b4fa9b7e9815da9";
    const file = files[0];

    if (!file) {
      // console.log("No file selected for upload"); // Log no file selection
      return $scope.showNotification("No file selected", "error");
    }

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
          // console.log("Image uploaded successfully:", imageUrl); // Log successful upload
        } else {
          $scope.showNotification("Failed to upload image", "error");
        }
      })
      .catch((error) => handleApiError("Failed to upload image", error));
  };
  // Fetch data for a specific endpoint and filter by status
  function fetchData(endpoint, status, targetProperty) {
    // console.log(
    //   `Fetching data from ${API_BASE_URL}/${endpoint}/lst with status ${status}`
    // ); // Log fetch attempt
    $http({
      method: "GET",
      url: `${API_BASE_URL}/${endpoint}/lst`,
    }).then(
      function (response) {
        // console.log(`Fetched data:`, response.data); // Log fetched data
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
    // console.log("Fetching all data..."); // Log data fetching start
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
    fetchData("Product", 1, "products");
    fetchData("Product", 0, "deletedProducts");
    // fetchData("Invoice", 1, "invoices");
    // fetchData("Invoice", 0, "deletedInvoices");
  };

  // Fetch an item by ID
  $scope.getItemById = function (endpoint, id) {
    // console.log(`Fetching item by ID: ${id} from ${endpoint}`); // Log ID fetch attempt
    $http({
      method: "GET",
      url: `${API_BASE_URL}/${endpoint}/${id}`,
    }).then(
      function (response) {
        // console.log(`Fetched item data:`, response.data); // Log fetched item data
        $scope.formData = response.data;
        $scope.formData.selectedBrand = response.data.milkBrand.id;
        $scope.formData.selectedType = response.data.milkType.id;
        $scope.formData.selectedTargetuser = response.data.targetUser.id;
      },
      function (error) {
        $scope.showNotification("Không thể tải dữ liệu", "error");
        handleError(error);
      }
    );
  };

  // Delete or rollback an item
  $scope.deleteOrRollbackItem = function (endpoint, id, rollback = false) {
    // console.log(
    //   `Attempting to ${rollback ? "rollback" : "delete"} item with ID: ${id}`
    // ); // Log delete/rollback attempt
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
    // console.log($scope.formData);
    const isUpdating = !!$scope.formData.id; // Check if updating
    const apiUrl = isUpdating
      ? `${API_BASE_URL}/${endpoint}/update/${$scope.formData.id}`
      : `${API_BASE_URL}/${endpoint}/add`; // Define URL based on action

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const request = isUpdating
      ? $http.put(apiUrl, $scope.formData, config)
      : $http.post(apiUrl, $scope.formData, config); // Choose the method based on action

    request.then(
      function () {
        $scope.showNotification(
          isUpdating ? "Cập nhật thành công" : "Thêm mới thành công",
          "success"
        );
        $scope.getAllData(); // Refresh data
        $scope.resetForm(); // Reset form after submission
      },
      function (error) {
        $scope.showNotification("Không thể thêm/cập nhật", "error");
        handleError(error);
      }
    );
  };

  // Reset the form data
  $scope.resetForm = function () {
    // console.log("Resetting form data"); // Log form reset
    $scope.formData = {};
  };

  // Initialize all data on load
  $scope.getAllData();
});

app.controller("MilkDetailController", function ($scope, $http, $location) {
  // Notification Setup
  $scope.notification = { message: "", type: "" };

  $scope.showNotification = function (message, type) {
    // console.log(`Showing notification: ${message}, type: ${type}`); // Log notification details
    $scope.notification.message = message;
    $scope.notification.type = type;
    setTimeout(() => {
      $scope.clearNotification();
      $scope.$apply();
    }, 3001);
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
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
      // console.log(`Moved to previous page: ${$scope.currentPage}`); // Log page change
    }
  };

  $scope.nextPage = () => {
    if ($scope.currentPage < $scope.numberOfPages()) {
      $scope.currentPage++;
      // console.log(`Moved to next page: ${$scope.currentPage}`); // Log page change
    }
  };

  // API URLs
  const API_BASES = {
    MilkDetail: "http://localhost:3001/api/Milkdetail",
    MilkBrand: "http://localhost:3001/api/Milkbrand",
    MilkTaste: "http://localhost:3001/api/Milktaste",
    Product: "http://localhost:3001/api/Product",
    PackagingUnit: "http://localhost:3001/api/Packagingunit",
    UsageCapacity: "http://localhost:3001/api/Usagecapacity",
    Product: "http://localhost:3001/api/Product",
    // Invoice: "http://localhost:3001/api/Invoice",
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

    if (!file) {
      // console.log("No file selected for upload"); // Log no file selection
      return $scope.showNotification("No file selected", "error");
    }

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
          // console.log("Image uploaded successfully:", imageUrl); // Log successful upload
        } else {
          $scope.showNotification("Failed to upload image", "error");
        }
      })
      .catch((error) => handleApiError("Failed to upload image", error));
  };

  const fetchData = (url, successHandler, errorMessage) => {
    $http
      .get(url)
      .then((response) => {
        successHandler(response.data);
      })
      .catch((error) => handleApiError(errorMessage, error));
  };

  $scope.getMilkdetails = () => {
    fetchData(
      `${API_BASES.MilkDetail}/lst`,
      (data) => {
        $scope.milkdetails = data.filter((item) => item.status === 1);
        $scope.totalPages = Math.ceil(
          $scope.milkdetails.length / $scope.itemsPerPage
        );
        // console.log(`Milk details fetched:`, $scope.milkdetails); // Log milk details
      },
      "Không thể tải danh sách sản phẩm"
    );
  };

  $scope.getBrands = () =>
    fetchData(
      `${API_BASES.MilkBrand}/lst`,
      (data) => {
        $scope.brands = data;
        // console.log("Brands fetched:", $scope.brands); // Log fetched brands
      },
      "Không thể tải danh sách thương hiệu"
    );
  $scope.getTastes = () =>
    fetchData(
      `${API_BASES.MilkTaste}/lst`,
      (data) => {
        $scope.tastes = data;
        // console.log("Tastes fetched:", $scope.tastes); // Log fetched tastes
      },
      "Không thể tải danh sách mùi vị"
    );
  $scope.getPackagingunits = () =>
    fetchData(
      `${API_BASES.PackagingUnit}/lst`,
      (data) => {
        $scope.packagingunits = data;
        // console.log("Packaging units fetched:", $scope.packagingunits); // Log fetched packaging units
      },
      "Không thể tải danh sách loại bao bì"
    );
  $scope.getUsagecapacitys = () =>
    fetchData(
      `${API_BASES.UsageCapacity}/lst`,
      (data) => {
        $scope.usagecapacitys = data;
        // console.log("Usage capacities fetched:", $scope.usagecapacitys); // Log fetched usage capacities
      },
      "Không thể tải danh sách công suất"
    );
  $scope.getProducts = () =>
    fetchData(
      `${API_BASES.Product}/lst`,
      (data) => {
        $scope.products = data;
        // console.log("Products fetched:", $scope.products); // Log fetched products
      },
      "Không thể tải danh sách sản phẩm"
    );
  // $scope.getInvoice = () =>
  //   fetchData(
  //     `${API_BASES.Invoice}/lst`,
  //     (data) => {
  //       $scope.invoices = data;
  //       // console.log("Invoices fetched:", $scope.invoices); // Log fetched invoices
  //     },
  //     "Không thể tải danh sách sản phẩm"
  //   );

  // Fetch Milk Detail by ID
  $scope.getMilkdetailById = function (id) {
    // console.log(`Fetching milk detail by ID: ${id}`); // Log ID fetch attempt
    fetchData(
      `${API_BASES.MilkDetail}/${id}`,
      (data) => {
        $scope.formData = data;
        $scope.formData.milkTasteId = data.milkTaste.id;
        $scope.formData.packagingunitId = data.packagingunit.id;
        $scope.formData.usageCapacityIds = data.usageCapacity.id;
        $scope.formData.productId = data.product.id;
        // console.log("Fetched milk detail data:", $scope.formData); // Log fetched milk detail
      },
      "Không thể tải chi tiết sản phẩm"
    );
  };

  // Update Milk Detail
  $scope.updateMilkdetail = function () {
    const id = $scope.formData.id;

    $http
      .put(`${API_BASES.MilkDetail}/update/${id}`, $scope.formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        $scope.showNotification(response.data.message, "success");
        $scope.getMilkdetails();
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
  // $scope.getInvoice();
});

app.controller("ChartController", [
  "$scope",
  function ($scope) {
    $scope.chartData = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    $scope.initPieChart = function () {
      const ctx = document.getElementById("pieChart");
      new Chart(ctx, {
        type: "pie",
        data: $scope.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Biểu Đồ Hình Cầu Số Phiếu",
            },
          },
        },
      });
    };

    $scope.initBarChart = function () {
      const ctx = document.getElementById("barChart");
      new Chart(ctx, {
        type: "bar",
        data: $scope.chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Biểu Đồ Cột Số Phiếu",
            },
          },
        },
      });
    };

    $scope.initDoughnutChart = function () {
      const ctx = document.getElementById("doughnutChart");
      new Chart(ctx, {
        type: "doughnut",
        data: $scope.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Biểu Đồ Doughnut Số Phiếu",
            },
          },
        },
      });
    };

    $scope.initPieChart();
    $scope.initBarChart();
    $scope.initDoughnutChart();
  },
]);
