import { Transaction, User } from "./models";
import { connectToDB } from "./utils";
import { Product } from "./models";

export const fetchUsers = async (q,page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 6;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).countDocuments();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return {count,users};
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

// Fetching Single User to View in View page
export const fetchUser = async (id) => {
  try {
    await connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch the user!");
  }
};

export const fetchAdmins = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEMS_PER_PAGE = 6;

  try {
    await connectToDB();
    // Fetch only admin users
    const count = await User.find({ username: { $regex: regex }, isAdmin: true }).countDocuments();
    const admins = await User.find({ username: { $regex: regex }, isAdmin: true })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));
    return { count, admins };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch admins!");
  }
};



export const fetchProducts = async (q,page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 6;

  try {
    await connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).countDocuments();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return {count,products};
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

// Fetching Single Product to View in View page
export const fetchProduct = async (id) => {
  try {
    await connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch the product!");
  }
};

export const fetchTransactions = async (q,page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 6;

  try {
    await connectToDB();
    const count = await Transaction.find({ transaction_id : { $regex: regex } }).countDocuments();
    const transactions = await Transaction.find({ transaction_id : { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return {count,transactions};
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transactions!");
  }
};

// Fetching Single Transaction to View in View page
export const fetchTransaction = async (id) => {
  try {
    await connectToDB();
    const transaction = await Transaction.findById(id);
    return transaction;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch the transaction!");
  }
};

