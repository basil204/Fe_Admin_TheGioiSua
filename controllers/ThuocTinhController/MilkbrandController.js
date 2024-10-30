const axios = require("axios");

const API_BASE_URL = "http://160.30.21.47:1234/api/Milkbrand";

const getAuthToken = (req) => req.session.token;

// Fetch all Milkbrands
const getAllMilkbrands = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Milkbrands:", error);
    res.status(500).json({ error: "Failed to fetch Milkbrands" });
  }
};

// Fetch Milkbrand by ID
const getMilkbrandById = async (req, res) => {
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
    console.error(`Error fetching Milkbrand by ID: ${id}`, error);
    res.status(500).json({ error: "Failed to fetch Milkbrand by ID" });
  }
};

// Delete Milkbrand by ID
const deleteMilkbrand = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Milkbrand deleted successfully" });
  } catch (error) {
    console.error(`Error deleting Milkbrand: ${id}`, error);
    res.status(500).json({ error: "Failed to delete Milkbrand" });
  }
};

// Add new Milkbrand
const addMilkbrand = async (req, res) => {
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
    console.error("Error adding Milkbrand:", error);
    res.status(500).json({ error: "Failed to add Milkbrand" });
  }
};

// Update Milkbrand by ID
const updateMilkbrand = async (req, res) => {
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
    console.error(`Error updating Milkbrand: ${id}`, error);
    res.status(500).json({ error: "Failed to update Milkbrand" });
  }
};

module.exports = {
  getAllMilkbrands,
  getMilkbrandById,
  deleteMilkbrand,
  addMilkbrand,
  updateMilkbrand,
};
