import { useEffect, useRef, useState } from "react";
import { FiCircle, FiX } from "react-icons/fi";

import "./Admin.css";
//import menuData from "../data/menuData";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const KEY = "cart";

function Admin() {
  // load menu Data
  // const item = menuData;
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // load menu list
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/menu`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Load fail:", err);
      }
    };

    fetchMenu();
  }, []);

  // Add item to DB
  const addItem = async () => {
    if (!newName || !newPrice) {
      alert("Name and price are required.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          price: newPrice,
        }),
      });

      if (!res.ok) {
        const msg = await res.json();
        alert(msg.message);
        return;
      }

      const added = await res.json();

      setItems((prev) => [...prev, added]);

      // Initialisation input bot
      setNewName("");
      setNewPrice("");
    } catch (err) {
      console.error("Add Error:", err);
      alert("Server error occureed.");
    }
  };

  const getQty = (id) => {
    const found = cart.find((c) => c.id === id);
    return found ? found.qty : 0;
  };

  return (
    <div className="menu-page">
      <div className="menu-section">
        <h1>MENU</h1>
        <table className="menu-table">
          <thead>
            <tr>
              <th>ID </th>

              <th>Items</th>
              <th>Price</th>
              <th>On sale</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const qty = getQty(item.id);
              return (
                <tr key={item.id}>
                  <td className="item-id">{item.id}</td>
                  <td className="item-name">{item.name}</td>
                  <td className="item-price">{item.price}</td>
                  <td className="item-sale">
                    {item.sale === true ? <FiCircle /> : <FiX />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="edit-section">
          <div className="add-section">
            <h3>-- Add Menu --</h3>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <input
              id="price"
              name="price"
              type="text"
              placeholder="price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              required
            />
            <button type="submit" onClick={addItem}>
              Add item
            </button>
          </div>

          <div className="remove-section">
            <h3>-- Remove Menu --</h3>
            <input
              id="id"
              name="id"
              type="number"
              placeholder="id"
              step="1"
              required
            />

            <button type="submit">Remove item</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
