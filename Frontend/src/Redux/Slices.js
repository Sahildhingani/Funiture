import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
  name: "UserInfo",
  initialState: {
    UserName: "",
    UserEmail: "",
    UserWishList: [],
    UserOrderList: [],
    UserRole: "",
  },
  reducers: {
    // set the complete data first
    SetUserInfoComplete: (state, action) => {
      const { UserEmail, UserWishList, UserName, UserOrderes, UserRole } =
        action.payload;
      state.UserName = action.payload.UserName;
      state.UserEmail = action.payload.UserEmail;
      state.UserWishList = action.payload.UserWishList;
      state.UserOrderList = action.payload.UserOrderes;
      state.UserRole = action.payload.UserRole;
    },
    AddItemInWishList: (state, action) => {
      const { ProductId } = action.payload;

      const exists = state.UserWishList.includes(ProductId);

      if (!exists) {
        state.UserWishList.push(ProductId);
      }
    },
    RemoveItemWishList: (state, action) => {
      const { ProductId } = action.payload;
      const data = state.UserWishList;
      state.UserWishList = data.filter((i) => {
        return i != ProductId;
      });
    },
    AddToCardItem: (state, action) => {
      const { ProductId } = action.payload;

      // check if product already in cart
      const exists = state.UserOrderList.some(
        (item) => item.ProductId === ProductId
      );

      if (!exists) {
        state.UserOrderList.push({ ProductId, Quentity: 1 });
      }
    },
    RemoveItemFromTheCart: (state, action) => {
      const { ProductId } = action.payload;
      const data = state.UserOrderList;
      state.UserOrderList = data.filter((i) => i.ProductId != ProductId);
    },
    IncreaseTheCount: (state, action) => {
      const { ProductId } = action.payload;

      state.UserOrderList = state.UserOrderList.map((item) =>
        item.ProductId === ProductId
          ? { ...item, Quantity: (item.Quantity || 1) + 1 }
          : item
      );
    },
    DecreaseTheCount: (state, action) => {
      const { ProductId } = action.payload;

      state.UserOrderList = state.UserOrderList.map((item) =>
        item.ProductId === ProductId
          ? { ...item, Quantity: item.Quantity > 1 ? item.Quantity - 1 : 1 }
          : item
      );
    },
    ClearOrderList: (state, action) => {
      state.UserOrderList = [];
    },
  },
});

export default User.reducer;

export const {
  SetUserInfoComplete,
  AddItemInWishList,
  RemoveItemWishList,
  AddToCardItem,
  RemoveItemFromTheCart,
  IncreaseTheCount,
  DecreaseTheCount,
  ClearOrderList,
} = User.actions;
