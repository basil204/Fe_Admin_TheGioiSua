const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Userinvoice";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllUserinvoice = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Userinvoices:", error);
    res.status(500).json({ error: "Failed to fetch Userinvoices" });
  }
};

const getUserinvoiceById = async (req, res) => {
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
    console.error("Error fetching Userinvoice by ID:", error);
    res.status(500).json({ error: "Failed to fetch Userinvoice by ID" });
  }
};
const deleteUserinvoice = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Userinvoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting Userinvoice:", error);
    res.status(500).json({ error: "Failed to delete Userinvoice" });
  }
};

const addUserinvoice = async (req, res) => {
  const { user, invoice } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { user, invoice },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Userinvoice:", error);
    res.status(500).json({ error: "Failed to add Userinvoice" });
  }
};

const updateUserinvoice = async (req, res) => {
  const { id } = req.params;
  const { user, invoice } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { user, invoice },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Userinvoice:", error);
    res.status(500).json({ error: "Failed to update Userinvoice" });
  }
};

module.exports = {
  getAllUserinvoice,
  getUserinvoiceById,
  deleteUserinvoice,
  addUserinvoice,
  updateUserinvoice,
};
