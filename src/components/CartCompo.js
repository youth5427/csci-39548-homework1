import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./CartCompo.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

// save as cent
function priceToCent(price) {
  return Number(price.replace(/[^0-9.]/g, "")) * 100;
}

function CartCompo() {
  const [items, setItems] = useState([]); // items
  const [cart, setCart] = useState([]); // Cart
  const [username, setUsername] = useState(""); // Username
  const [cartLoaded, setCartLoaded] = useState(false); // Whether laoded

  // Load Cart
  async function loadUserCart() {
    if (!username.trim()) {
      alert("Please enter your name.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/cart/${username}`);

      if (res.status == 404) {
        alert("User does not exist!");
        setCart([]);
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();

      // 서버가 { username, items: [{id, qty}, ...] } 형태로 반환
      const serverItems = data.items || [];

      const nextCart = serverItems.map((it) => ({
        id: it.id,
        qty: it.qty,
      }));

      setCart(nextCart);
      setCartLoaded(true);
      alert(`Loaded cart for ${username}`);
    } catch (err) {
      console.error(err);
      alert("Failed to load cart");
    }
  }

  async function syncToServer(nextCart) {
    if (!username.trim()) {
      console.warn("username is empty");
      return;
    }

    try {
      const payloadItems = nextCart.map(({ id, qty }) => ({ id, qty }));

      const res = await fetch(`${API_BASE_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          items: payloadItems,
        }),
      });

      if (!res.ok) {
        console.error("Failed to save cart:", await res.text());
      }
    } catch (err) {
      console.error("Cart sync error:", err);
    }
  }

  // save cart to DB
  async function sync(nextCart) {
    const cleaned = nextCart.filter((it) => it.qty > 0);
    cleaned.sort((a, b) => (a.id ?? 1e9) - (b.id ?? 1e9));
    setCart(cleaned);
    await syncToServer(cleaned);
  }

  const getQty = (id) => {
    const found = cart.find((c) => c.id === id);
    return found ? found.qty : 0;
  };

  // Add +1 function
  async function addToCart(menuItem) {
    if (!username.trim()) {
      alert("Please enter your name first!");
      return;
    }
    if (!cartLoaded) {
      alert("Plead click the view button first");
      return;
    }

    const nextCart = [...cart];
    const idx = nextCart.findIndex((c) => c.id === menuItem.id);

    if (idx >= 0) {
      nextCart[idx].qty += 1;
    } else {
      nextCart.push({
        id: menuItem.id,
        qty: 1,
      });
    }
    await sync(nextCart);
  }

  // Sub -1 function
  async function subFromCart(menuItem) {
    if (!username.trim()) {
      alert("Please enter your name first!");
      return;
    }

    if (!cartLoaded) {
      alert("Plead click the view button first");
      return;
    }
    const nextCart = [...cart];
    const idx = nextCart.findIndex((c) => c.id === menuItem.id);

    if (idx >= 0) {
      nextCart[idx].qty -= 1;
      if (nextCart[idx].qty <= 0) nextCart.splice(idx, 1);
    }
    await sync(nextCart);
  }

  // ====== Load Menu list ======
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

  // culculate total
  const cartRows = items
    .map((item) => {
      const qty = getQty(item.id);
      if (qty <= 0) return null;

      const unitCents = priceToCent(item.price);
      const subtotalCents = unitCents * qty;

      return {
        id: item.id,
        name: item.name,
        priceLabel: item.price,
        qty,
        subtotalCents,
      };
    })
    .filter(Boolean);

  const totalQty = cartRows.reduce((sum, row) => sum + row.qty, 0);
  const totalCents = cartRows.reduce((sum, row) => sum + row.subtotalCents, 0);
  const totalDollar = (totalCents / 100).toFixed(2);

  return (
    <div className="cart-section">
      <input
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <button className="name-btn" type="button" onClick={loadUserCart}>
        View
      </button>
      {cartRows.length === 0 ? (
        <div className="cart-empty">
          <p>Enter your name and view your cart!</p>
          <NavLink to="/Menu" className="cart-order">
            Back to Menu
          </NavLink>
        </div>
      ) : (
        <div className="cart-valid">
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
              {cartRows.map((row) => (
                <tr key={row.id}>
                  <td className="item-name">{row.name}</td>
                  <td className="item-price">{row.priceLabel}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="add-btn"
                      type="button"
                      onClick={() => subFromCart({ id: row.id })}
                    >
                      -
                    </button>
                    <span className="item-count">{row.qty}</span>
                    <button
                      className="add-btn"
                      type="button"
                      onClick={() => addToCart({ id: row.id })}
                    >
                      +
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    ${(row.subtotalCents / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="cart-total">
                  <div>
                    <div>Total quantity: {totalQty} counts</div>
                    <div>Total: ${totalDollar}</div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
          <NavLink to="/OrderOnline" className="cart-order">
            Order Now
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default CartCompo;
