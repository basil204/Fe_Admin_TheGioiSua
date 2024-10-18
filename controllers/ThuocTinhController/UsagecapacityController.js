const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Usagecapacity";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllUsagecapacitys = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Usagecapacitys:", error);
    res.status(500).json({ error: "Failed to fetch Usagecapacitys" });
  }
};

const getUsagecapacityById = async (req, res) => {
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
    console.error("Error fetching Usagecapacity by ID:", error);
    res.status(500).json({ error: "Failed to fetch Usagecapacity by ID" });
  }
};
const deleteUsagecapacity = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Usagecapacity deleted successfully" });
  } catch (error) {
    console.error("Error deleting Usagecapacity:", error);
    res.status(500).json({ error: "Failed to delete Usagecapacity" });
  }
};

const addUsagecapacity = async (req, res) => {
  const { capacity, unit } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { capacity, unit },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Usagecapacity:", error);
    res.status(500).json({ error: "Failed to add Usagecapacity" });
  }
};

const updateUsagecapacity = async (req, res) => {
  const { id } = req.params;
  const { capacity, unit } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { capacity, unit },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Usagecapacity:", error);
    res.status(500).json({ error: "Failed to update Usagecapacity" });
  }
};

module.exports = {
  getAllUsagecapacitys,
  getUsagecapacityById,
  deleteUsagecapacity,
  addUsagecapacity,
  updateUsagecapacity,
};
