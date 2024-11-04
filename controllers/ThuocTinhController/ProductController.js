const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Product";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllProducts = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Products:", error);
    res.status(500).json({ error: "Failed to fetch Products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Product by ID:", error);
    res.status(500).json({ error: "Failed to fetch Product by ID" });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting Product:", error);
    res.status(500).json({ error: "Failed to delete Product" });
  }
};

const addProduct = async (req, res) => {
  const { productname, selectedBrand, selectedType, selectedTargetuser } =
    req.body;
  console.log(
    "manhne " + productname,
    selectedBrand,
    selectedType,
    selectedTargetuser
  );
  const token = getAuthToken(req);
  const datas = {
    productname: productname,
    milkType: {
      id: selectedType,
    },
    milkBrand: {
      id: selectedBrand,
    },
    targetUser: {
      id: selectedTargetuser,
    },
  };
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, datas, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Product:", error);
    res.status(500).json({ error: "Failed to add Product" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productname, selectedBrand, selectedType, selectedTargetuser } =
    req.body;

  console.log(productname, selectedBrand, selectedType, selectedTargetuser);
  const token = getAuthToken(req);
  const datas = {
    productname: productname,
    milkType: {
      id: selectedType,
    },
    milkBrand: {
      id: selectedBrand,
    },
    targetUser: {
      id: selectedTargetuser,
    },
  };
  console.log(
    "data truong =>" + datas.productname,
    datas.milkType.id,
    datas.targetUser.id,
    datas.milkBrand.id
  );
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      {
        productname: productname,
        milkType: {
          id: selectedType,
        },
        milkBrand: {
          id: selectedBrand,
        },
        targetUser: {
          id: selectedTargetuser,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Product:", error);
    res.status(500).json({ error: "Failed to update Product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct,
  addProduct,
  updateProduct,
};
