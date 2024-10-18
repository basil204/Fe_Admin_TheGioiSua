const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Voucher";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllVouchers = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Vouchers:", error);
    res.status(500).json({ error: "Failed to fetch Vouchers" });
  }
};

const getVoucherById = async (req, res) => {
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
    console.error("Error fetching Voucher by ID:", error);
    res.status(500).json({ error: "Failed to fetch Voucher by ID" });
  }
};
const deleteVoucher = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Voucher deleted successfully" });
  } catch (error) {
    console.error("Error deleting Voucher:", error);
    res.status(500).json({ error: "Failed to delete Voucher" });
  }
};

const addVoucher = async (req, res) => {
  const {
    vouchercode,
    startdate,
    enddate,
    discountpercentage,
    maxamount,
    usagecount,
  } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      {
        vouchercode,
        startdate,
        enddate,
        discountpercentage,
        maxamount,
        usagecount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Voucher:", error);
    res.status(500).json({ error: "Failed to add Voucher" });
  }
};

const updateVoucher = async (req, res) => {
  const { id } = req.params;
  const {
    vouchercode,
    startdate,
    enddate,
    discountpercentage,
    maxamount,
    usagecount,
  } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      {
        vouchercode,
        startdate,
        enddate,
        discountpercentage,
        maxamount,
        usagecount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Voucher:", error);
    res.status(500).json({ error: "Failed to update Voucher" });
  }
};

module.exports = {
  getAllVouchers,
  getVoucherById,
  deleteVoucher,
  addVoucher,
  updateVoucher,
};
