const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Packagingunit";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllPackagingunit = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Packagingunits:", error);
    res.status(500).json({ error: "Failed to fetch Packagingunits" });
  }
};

const getPackagingunitById = async (req, res) => {
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
    console.error("Error fetching Packagingunit by ID:", error);
    res.status(500).json({ error: "Failed to fetch Packagingunit by ID" });
  }
};
const deletePackagingunit = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Packagingunit deleted successfully" });
  } catch (error) {
    console.error("Error deleting Packagingunit:", error);
    res.status(500).json({ error: "Failed to delete Packagingunit" });
  }
};

const addPackagingunit = async (req, res) => {
  const { packagingunitname } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { packagingunitname },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Packagingunit:", error);
    res.status(500).json({ error: "Failed to add Packagingunit" });
  }
};

const updatePackagingunit = async (req, res) => {
  const { id } = req.params;
  const { packagingunitname } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { packagingunitname },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Packagingunit:", error);
    res.status(500).json({ error: "Failed to update Packagingunit" });
  }
};

module.exports = {
  getAllPackagingunit,
  getPackagingunitById,
  deletePackagingunit,
  addPackagingunit,
  updatePackagingunit,
};
