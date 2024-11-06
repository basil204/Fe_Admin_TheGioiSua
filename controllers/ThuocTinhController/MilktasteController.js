const axios = require("axios");

const API_BASE_URL = "http://160.30.21.47:1234/api/Milktaste";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllMilktastes = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Milktastes:", error);
    res.status(500).json({ error: "Failed to fetch Milktastes" });
  }
};

const getMilktasteById = async (req, res) => {
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
    console.error("Error fetching Milktaste by ID:", error);
    res.status(500).json({ error: "Failed to fetch Milktaste by ID" });
  }
};
const deleteMilktaste = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Milktaste deleted successfully" });
  } catch (error) {
    console.error("Error deleting Milktaste:", error);
    res.status(500).json({ error: "Failed to delete Milktaste" });
  }
};

const addMilktaste = async (req, res) => {
  const { milktastename } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { milktastename },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Milktaste:", error);
    res.status(500).json({ error: "Failed to add Milktaste" });
  }
};

const updateMilktaste = async (req, res) => {
  const { id } = req.params;
  const { milktastename } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { milktastename },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Milktaste:", error);
    res.status(500).json({ error: "Failed to update Milktaste" });
  }
};

module.exports = {
  getAllMilktastes,
  getMilktasteById,
  deleteMilktaste,
  addMilktaste,
  updateMilktaste,
};
