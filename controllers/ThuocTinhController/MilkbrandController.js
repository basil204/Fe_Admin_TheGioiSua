const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Milkbrand";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllMilkbrand = async (req, res) => {
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
    console.error("Error fetching Milkbrand by ID:", error);
    res.status(500).json({ error: "Failed to fetch Milkbrand by ID" });
  }
};
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
    console.error("Error deleting Milkbrand:", error);
    res.status(500).json({ error: "Failed to delete Milkbrand" });
  }
};

const addMilkbrand = async (req, res) => {
  const { invoicecode, discountamount, totalamount, voucher } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      {
        invoicecode,
        discountamount,
        totalamount,
        voucher, // Ensure nested structure for voucher
      },
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

const updateMilkbrand = async (req, res) => {
  const { id } = req.params;
  const { invoicecode, discountamount, totalamount, voucher } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      {
        invoicecode,
        discountamount,
        totalamount,
        voucher,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Milkbrand:", error);
    res.status(500).json({ error: "Failed to update Milkbrand" });
  }
};

module.exports = {
  getAllMilkbrand,
  getMilkbrandById,
  deleteMilkbrand,
  addMilkbrand,
  updateMilkbrand,
};
