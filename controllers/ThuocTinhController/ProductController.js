const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Product";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllProduct = async (req, res) => {
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
  const { productcode, productname, milktype, milkbrand, targetuser } =
    req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { productcode, productname, milktype, milkbrand, targetuser },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Product:", error);
    res.status(500).json({ error: "Failed to add Product" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productcode, productname, milktype, milkbrand, targetuser } =
    req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { productcode, productname, milktype, milkbrand, targetuser },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Product:", error);
    res.status(500).json({ error: "Failed to update Product" });
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  deleteProduct,
  addProduct,
  updateProduct,
};
