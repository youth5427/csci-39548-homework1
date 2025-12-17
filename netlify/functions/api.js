const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();
//const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// connect to MongoDB
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  console.log("MONGODB_URI:", process.env.MONGODB_URI);

  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

app.use(async (req, res, next) => {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    return res.status(500).json({ message: "DB connection failed" });
  }
});

// === Schema ===
// Menu Schema
const menuSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  price: { type: String, required: true },
  sale: { type: Boolean, default: true },
});

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

// Cart Schema
const cartItemSchema = new mongoose.Schema({
  username: { type: String, required: true },
  items: [{ id: Number, qty: Number }],
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartItemSchema);

// === Router ===
// Call menu API
app.get("/menu", async (req, res) => {
  console.log("HIT /menu route");
  try {
    const items = await Menu.find().sort({ id: 1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// // (Optional) Initial menu list
// // Use this in terminal
// // curl -X POST http://localhost:4000/api/menu/seed
app.post("/menu/seed", async (req, res) => {
  try {
    const data = [
      { id: 0, name: "Cheese Burger", price: "$8.99", sale: 1 },
      { id: 1, name: "Bacon and Cheese Burger", price: "$9.99", sale: 1 },
      { id: 2, name: "Medium Pepperoni Pizza", price: "$14.99", sale: 1 },
      { id: 3, name: "Large Pepperoni Pizza", price: "$16.99", sale: 1 },
      { id: 4, name: "8-piece chicken", price: "$24.99", sale: 1 },
      { id: 5, name: "12-piece chicken", price: "$28.99", sale: 1 },
      { id: 6, name: "French Fires", price: "$3.99", sale: 1 },
      { id: 7, name: "Cola", price: "$1.99", sale: 1 },
      { id: 8, name: "Milkshake", price: "$3.99", sale: 1 },
    ];

    await Menu.deleteMany({});
    await Menu.insertMany(data);

    res.json({ message: "Menu seeded!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Seed error" });
  }
});

// add menu item
app.post("/menu", async (req, res) => {
  try {
    let { name, price } = req.body;

    // Essential elements
    if (!name || !price) {
      return res.status(400).json({ message: "NEED name AND price" });
    }

    // add $ in front of price
    price = String(price).trim();
    if (!price.startsWith("$")) {
      price = `$${price}`;
    }

    // Duplicate check
    const exits = await Menu.findOne({ name });
    if (exits) {
      return res.status(409).json({
        message: "The item already exits",
        duplicate: exits,
      });
    }

    // Find the largest id number
    const lastItem = await Menu.findOne().sort({ id: -1 });
    const nextId = lastItem ? lastItem.id + 1 : 0;

    const menu = new Menu({
      id: nextId,
      name,
      price,
      sale: true,
    });

    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create Error" });
  }
});

// Remove menu item
app.post("/menu/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const deleted = await Menu.findOneAndDelete({ id });
    if (!deleted) {
      return res.status(404).json({ message: "Menu not found" });
    }

    return res.json({
      message: "Menu deleted",
      item: deleted,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Delete Error" });
  }
});

// Save cart
app.post("/cart", async (req, res) => {
  try {
    const { username, items } = req.body;

    if (!username) {
      return res.status(400).json({ message: "username required" });
    }

    // find a user whether existed
    const updated = await Cart.findOneAndUpdate(
      { username },
      { items },
      { new: true, upsert: true }
    );
    res.json({ message: "Cart Saved", cart: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cart save error" });
  }
});

// load cart
app.get("/cart/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({ message: "User not found", username });
    }
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cart load error" });
  }
});

// create user
app.post("/users", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "username required" });
    }

    // 이미 존재하는지 체크
    const exists = await Cart.findOne({ username });
    if (exists) {
      return res
        .status(409)
        .json({ message: "User already exists", cart: exists });
    }

    const newCart = new Cart({
      username,
      items: [],
    });

    await newCart.save();
    res.status(201).json({ message: "User created", cart: newCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User create error" });
  }
});

// Example router
app.get("/", (req, res) => {
  res.send("Hello Grilld server!");
});

module.exports.handler = serverless(app);
