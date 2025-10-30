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

  const sync = (cart) => {
    cart.sort((a, b) => (a.id ?? 1e9) - (b.id ?? 1e9));
    saveCart(cart);
    setCart([...cart]);
  };

  function addToCart(menuItem) {
    const cart = loadCart();
    const idx = cart.findIndex((c) => c.name === menuItem.name);

    if (idx >= 0) {
      cart[idx].qty += 1;
    }
    sync(cart);
  }
  function subFromCart(menuItem) {
    const cart = loadCart();
    const idx = cart.findIndex((c) => c.name === menuItem.name);

    if (idx >= 0) {
      cart[idx].qty -= 1;
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
    }
    sync(cart);
  }

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
              const subtotal = (it.price * it.qty) / 100;
              return (
                <tr>
                  <th>{it.name}</th>
                  <th>{it.price / 100}</th>
                  <th>
                    <button className="add-btn" onClick={() => subFromCart(it)}>
                      -
                    </button>
                    <span>{it.qty}</span>
                    <button className="add-btn" onClick={() => addToCart(it)}>
                      +
                    </button>
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
