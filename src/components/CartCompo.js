import { useEffect, useState } from "react";
import "./CartCompo.css";

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

function CartCompo() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // initial load storage
    setCart(loadCart());

    // Real-time synchronization
    const onStorage = (e) => {
      if (e.key === KEY) setCart(loadCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const sync = (nextCart) => {
    nextCart.sort((a, b) => (a.id ?? 1e9) - (b.id ?? 1e9));
    saveCart(nextCart);
    setCart([...nextCart]);
  };

  function addToCart(menuItem) {
    const nextCart = [...cart];
    const idx = nextCart.findIndex((c) => c.id === menuItem.id);

    if (idx >= 0) {
      nextCart[idx].qty += 1;
    }
    sync(nextCart);
  }
  function subFromCart(menuItem) {
    const nextCart = [...cart];
    const idx = nextCart.findIndex((c) => c.id === menuItem.id);

    if (idx >= 0) {
      nextCart[idx].qty -= 1;
      if (nextCart[idx].qty <= 0) nextCart.splice(idx, 1);
    }
    sync(nextCart);
  }

  const totalQty = cart.reduce((s, it) => s + it.qty, 0);
  const totalSum = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const Total = totalSum / 100;

  return (
    <div className="cart-section">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th style={{ textAlign: "center" }}>Qty</th>
            <th style={{ textAlign: "right" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((it) => {
            const subtotal = (it.price * it.qty) / 100;
            return (
              <tr>
                <td>{it.name}</td>
                <td>${(it.price / 100).toFixed(2)}</td>
                <td>
                  <button className="add-btn" onClick={() => subFromCart(it)}>
                    -
                  </button>
                  <span>{it.qty}</span>
                  <button className="add-btn" onClick={() => addToCart(it)}>
                    +
                  </button>
                </td>
                <td style={{ textAlign: "right" }}>${subtotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="cart-total">
              <div>
                <div>Total quantity: {totalQty} counts</div>
                <div>Total: ${Total}</div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CartCompo;
