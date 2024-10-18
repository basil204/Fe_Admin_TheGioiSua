const axios = require("axios");

const API_BASE_URL = "http://localhost:1234/api/Invoicedetail";
const getAuthToken = (req) => {
  return req.session.token;
};
const getAllInvoicedetails = async (req, res) => {
  const token = getAuthToken(req);

  try {
    const response = await axios.get(`${API_BASE_URL}/lst`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Invoicedetails:", error);
    res.status(500).json({ error: "Failed to fetch Invoicedetails" });
  }
};

const getInvoicedetailById = async (req, res) => {
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
    console.error("Error fetching Invoicedetail by ID:", error);
    res.status(500).json({ error: "Failed to fetch Invoicedetail by ID" });
  }
};
const deleteInvoicedetail = async (req, res) => {
  const { id } = req.params;
  const token = getAuthToken(req);

  try {
    await axios.delete(`${API_BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.json({ message: "Invoicedetail deleted successfully" });
  } catch (error) {
    console.error("Error deleting Invoicedetail:", error);
    res.status(500).json({ error: "Failed to delete Invoicedetail" });
  }
};

const addInvoicedetail = async (req, res) => {
  const { quantity, price, totalprice, invoice, milkDetail } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      {
        quantity,
        price,
        totalprice,
        invoice,
        milkDetail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error adding Invoicedetail:", error);
    res.status(500).json({ error: "Failed to add Invoicedetail" });
  }
};

const updateInvoicedetail = async (req, res) => {
  const { id } = req.params;
  const { quantity, price, totalprice, invoice, milkDetail } = req.body;
  const token = getAuthToken(req);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/update/${id}`,
      {
        quantity,
        price,
        totalprice,
        invoice,
        milkDetail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating Invoicedetail:", error);
    res.status(500).json({ error: "Failed to update Invoicedetail" });
  }
};

module.exports = {
  getAllInvoicedetails,
  getInvoicedetailById,
  deleteInvoicedetail,
  addInvoicedetail,
  updateInvoicedetail,
};
