const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PI_API = "https://api.minepi.com/v2/payments";

app.get("/", (req, res) => {
  res.send("BTB Backend Running ✅");
});

app.post("/approve-payment", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const result = await axios.post(
      `${PI_API}/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`
        }
      }
    );

    res.json(result.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

app.post("/complete-payment", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    const result = await axios.post(
      `${PI_API}/${paymentId}/complete`,
      { txid },
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`
        }
      }
    );

    res.json(result.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("BTB Backend running on port " + PORT);
});
