const axios = require("axios");

const API_BASE_URL = "http://160.30.21.47:1234/api/Milkdetail";
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
    shelflifeofmilk,
    imgUrl,
    price,
    description,
    stockquantity,
  } = req.body;
  const token = getAuthToken(req);
  const datas = {
    product: {
      id: product,
    },
    milkTaste: {
      id: milkTaste,
    },
    packagingunit: {
      id: packagingunit,
    },
    usageCapacity: {
      id: usageCapacity,
    },
    shelflifeofmilk: shelflifeofmilk,
    price: price,
    imgUrl: imgUrl,
    description: description,
    stockquantity: stockquantity,
  };
  try {
    const response = await axios.post(
      `${API_BASE_URL}/add`,
      {
        product,
        milkTaste,
        packagingunit,
        usageCapacity,
        shelflifeofmilk,
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
    productId,
    milkTasteId,
    packagingunitId,
    usageCapacityIds,
    shelflifeofmilk,
    imgUrl,
    price,
    description,
    stockquantity,
  } = req.body;

  const datas = {
    product: {
      id: productId,
    },
    milkTaste: {
      id: milkTasteId,
    },
    packagingunit: {
      id: packagingunitId,
    },
    usageCapacity: {
      id: usageCapacityIds,
    },
    description: description,
    shelflifeofmilk: shelflifeofmilk,
    price: price,
    imgUrl: imgUrl,
    stockquantity: stockquantity,
  };
  console.log(datas);

  const token = getAuthToken(req);

  try {
    const response = await axios.put(`${API_BASE_URL}/update/${id}`, datas, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
