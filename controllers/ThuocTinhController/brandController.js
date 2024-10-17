const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Milkbrand";

// Get token from localStorage in AngularJS, and attach it to requests in Node.js
const getAuthToken = (req) => {
  return req.session.token; // Use the session token stored during login
};

// Get all brands
const getAllBrands = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
};

// Get brand by ID
const getBrandById = async (req, res) => {
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
    console.error("Error fetching brand by ID:", error);
    res.status(500).json({ error: "Failed to fetch brand by ID" });
  }
};

// Delete brand by ID
const deleteBrand = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ error: "Failed to delete brand" });
  }
};

// Add new brand
const addBrand = async (req, res) => {
  const { milkbrandname, description } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { milkbrandname, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding brand:", error);
    res.status(500).json({ error: "Failed to add brand" });
  }
};

// Update brand
const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { milkbrandname, description } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { milkbrandname, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ error: "Failed to update brand" });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  deleteBrand,
  addBrand,
  updateBrand,
};
