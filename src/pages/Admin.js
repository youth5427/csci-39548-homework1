import { useEffect, useRef, useState } from "react";
import { FiCircle, FiX } from "react-icons/fi";

import "./Menu.css";
//import menuData from "../data/menuData";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const KEY = "cart";

function Admin() {
  // load menu Data
  // const item = menuData;
  const [items, setItems] = useState([]);

  const [cart, setCart] = useState([]);

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
      </div>
    </div>
  );
}

export default Admin;
