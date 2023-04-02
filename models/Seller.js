const mongoose = require("mongoose");
const SellerSchema = new mongoose.Schema({
  sellerName: {
    type: String,
  },
  sellerEmail: {
    type: String,
  },
  sellerPassword: {
    type: String,
  },
  shopName: {
    type: String,
  },
  shopLocation: {
    type: String,
  },

  sellerPhone: {
    type: String,
  },
});

const Seller = mongoose.model("seller", SellerSchema);
module.exports = Seller;
