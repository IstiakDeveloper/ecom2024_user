const { default: axios } = require("axios");

const AxiosClient = axios.create({
  baseURL: "https://islamic.najiat.com/api/v1",
});

const getCategory = () => AxiosClient.get("/categories");
const getSliders = () =>
  AxiosClient.get("/sliders").then((resp) => {
    return resp.data;
  });
  
const getCategoryList = () =>
  AxiosClient.get("/categories").then((resp) => {
    return resp.data;
  });

const getAllProducts = () =>
  AxiosClient.get("/products").then((resp) => {
    return resp.data;
  });

const getProductsByCategory = (category) =>
  AxiosClient.get("/products/category/" + category).then((resp) => {
    return resp.data;
  });

const registerUser = (username, phone, email, password) =>
  AxiosClient.post("/register", {
    username: username,
    phone: phone,
    email: email,
    password: password,
  });

const SignIn = (phone, password) =>
  AxiosClient.post("/login", {
    phone: phone,
    password: password,
  });

const addToCart = (data, token) =>
  AxiosClient.post("/carts", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

const getCartItems = (userId, token) => {
  return AxiosClient.get("/carts/carts/" + userId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((resp) => {
      const customerData = resp.data.customer;
      const cartItems = customerData.cart.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        amount: item.amount,
        image: item.product.image,
        actualPrice: item.product.price,
        id: item.id,
      }));
      return cartItems;
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error);
      throw error; // Propagate the error to the caller
    });
};

const deleteCartItem = (id, token) =>
  AxiosClient.delete("/carts/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

const placeOrder = (orderData, token) =>
  AxiosClient.post("/carts/orders", orderData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });


const getOrderData = (userId, token) => {
  return AxiosClient.get("/orders/customer/" + userId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((resp) => {
      const customerOrder = resp.data.orders;
      const orderList = customerOrder.map((item) => ({
        id:item.order.id,
        totalAmount:item.order.total_amount,
        createdAt:item.order.created_at,
        orderItemList:item.order_items
      }));
      return orderList;
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error);
      throw error; // Propagate the error to the caller
    });
};

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem,
  placeOrder,
  getOrderData
};
