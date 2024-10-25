const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Milkdetail";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllMilkdetails = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Milkdetails:", error);
    res.status(500).json({ error: "Failed to fetch Milkdetails" });
  }
};

const getMilkdetailById = async (req, res) => {
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
    console.error("Error fetching Milkdetail by ID:", error);
    res.status(500).json({ error: "Failed to fetch Milkdetail by ID" });
  }
};
const deleteMilkdetail = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Milkdetail deleted successfully" });
  } catch (error) {
    console.error("Error deleting Milkdetail:", error);
    res.status(500).json({ error: "Failed to delete Milkdetail" });
  }
};
const addMilkdetail = async (req, res) => {
  const {
    product,
    milkTaste,
    packagingunit,
    usageCapacity,
    expirationdate,
    imgUrl,
    price,
    description,
    stockquantity,
  } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      {
        product,
        milkTaste,
        packagingunit,
        usageCapacity,
        expirationdate,
        imgUrl,
        price,
        description,
        stockquantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Milkdetail:", error);
    res.status(500).json({ error: "Failed to add Milkdetail" });
  }
};

const updateMilkdetail = async (req, res) => {
  const { id } = req.params;
  const {
    product,
    milkTaste,
    packagingunit,
    usageCapacity,
    expirationdate,
    imgUrl,
    price,
    description,
    stockquantity,
  } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      {
        product,
        milkTaste,
        packagingunit,
        usageCapacity,
        expirationdate,
        imgUrl,
        price,
        description,
        stockquantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Milkdetail:", error);
    res.status(500).json({ error: "Failed to update Milkdetail" });
  }
};

module.exports = {
  getAllMilkdetails,
  getMilkdetailById,
  deleteMilkdetail,
  addMilkdetail,
  updateMilkdetail,
};
