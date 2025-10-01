const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  ProductId: { type: String, required: true }, // or use mongoose.Schema.Types.ObjectId if referencing Product collection
  Quantity: { type: Number, default: 1 },
});
const UserSchema = mongoose.Schema({
  UserId: {
    type: String,
    required: true,
    unique: true,
  },

  UserName: {
    type: String,
    required: true,
  },
  UserEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  UserPassword: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
  },
  UserAddress: {
    type: String,
  },
  UserVerified: {
    type: Boolean,
    default:false,
  },
  UserOrderes: {
    type: [OrderItemSchema],
  },
  UserWishList: {
    type: [String],
  },
  OrderPlaced: {
    type: [String],
  },
  UserRole:{
    type:String,
    default:'User',
  }
});

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;
