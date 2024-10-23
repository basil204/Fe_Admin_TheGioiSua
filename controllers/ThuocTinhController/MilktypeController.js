const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Milktype";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllMilktypes = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Milktypes:", error);
    res.status(500).json({ error: "Failed to fetch Milktypes" });
  }
};

const getMilktypeById = async (req, res) => {
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
    console.error("Error fetching Milktype by ID:", error);
    res.status(500).json({ error: "Failed to fetch Milktype by ID" });
  }
};
const deleteMilktype = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Milktype deleted successfully" });
  } catch (error) {
    console.error("Error deleting Milktype:", error);
    res.status(500).json({ error: "Failed to delete Milktype" });
  }
};

const addMilktype = async (req, res) => {
  const { milkTypename, description } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { milkTypename, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Milktype:", error);
    res.status(500).json({ error: "Failed to add Milktype" });
  }
};

const updateMilktype = async (req, res) => {
  const { id } = req.params;
  const { milkTypename, description } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { milkTypename, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Milktype:", error);
    res.status(500).json({ error: "Failed to update Milktype" });
  }
};

module.exports = {
  getAllMilktypes,
  getMilktypeById,
  deleteMilktype,
  addMilktype,
  updateMilktype,
};
