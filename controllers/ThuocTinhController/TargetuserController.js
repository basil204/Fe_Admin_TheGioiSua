const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Targetuser";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllTargetusers = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Targetusers:", error);
    res.status(500).json({ error: "Failed to fetch Targetusers" });
  }
};

const getTargetuserById = async (req, res) => {
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
    console.error("Error fetching Targetuser by ID:", error);
    res.status(500).json({ error: "Failed to fetch Targetuser by ID" });
  }
};
const deleteTargetuser = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Targetuser deleted successfully" });
  } catch (error) {
    console.error("Error deleting Targetuser:", error);
    res.status(500).json({ error: "Failed to delete Targetuser" });
  }
};

const addTargetuser = async (req, res) => {
  const { targetuser, description } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { targetuser, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Targetuser:", error);
    res.status(500).json({ error: "Failed to add Targetuser" });
  }
};

const updateTargetuser = async (req, res) => {
  const { id } = req.params;
  const { targetuser, description } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { targetuser, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Targetuser:", error);
    res.status(500).json({ error: "Failed to update Targetuser" });
  }
};

module.exports = {
  getAllTargetusers,
  getTargetuserById,
  deleteTargetuser,
  addTargetuser,
  updateTargetuser,
};
