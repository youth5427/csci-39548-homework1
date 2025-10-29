import { useEffect, useState } from "react";
import UnderConstruction from "../components/UnderConstruction";
import "./Mycart.css";

const KEY = "cart";
// Local storage
function loadCart() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

function Mycart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // initial load storage
    setCart(loadCart());

    // Real-time synchronization
  }, []);

  return (
    <div className="cart-page">
      <div className="cart-section">
        <h1 className="cart-header">My Cart</h1>

        <table className="cart-table">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Item</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((it) => {
              const subtotal = it.price * it.qty;
              return (
                <tr>
                  <th>{it.name}</th>
                  <th>{it.price}</th>
                  <th>
                    <button className="add-btn">-</button>
                    <span>{it.qty}</span>
                    <button className="add-btn">+</button>
                  </th>
                  <th>{subtotal}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mycart;
