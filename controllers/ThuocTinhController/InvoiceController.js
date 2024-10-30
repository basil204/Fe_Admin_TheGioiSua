const axios = require("axios");

const API_BASE_URL = "http://160.30.21.47:1234/api/Invoice";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllInvoices = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Invoices:", error);
    res.status(500).json({ error: "Failed to fetch Invoices" });
  }
};

const getInvoiceById = async (req, res) => {
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
    console.error("Error fetching Invoice by ID:", error);
    res.status(500).json({ error: "Failed to fetch Invoice by ID" });
  }
};
const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting Invoice:", error);
    res.status(500).json({ error: "Failed to delete Invoice" });
  }
};

const addInvoice = async (req, res) => {
  const { invoicecode, discountamount, totalamount, voucher } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      { invoicecode, discountamount, totalamount, voucher },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Invoice:", error);
    res.status(500).json({ error: "Failed to add Invoice" });
  }
};

const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { invoicecode, discountamount, totalamount, voucher } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      { invoicecode, discountamount, totalamount, voucher },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Invoice:", error);
    res.status(500).json({ error: "Failed to update Invoice" });
  }
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  deleteInvoice,
  addInvoice,
  updateInvoice,
};
