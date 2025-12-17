import { useEffect, useRef, useState } from "react";
import "./Menu.css";
//import menuData from "../data/menuData";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const KEY = "cart";

// save as cent
function PriceToNumber(price) {
  return Number(price.replace(/[^0-9.]/g, "")) * 100;
}

function Menu() {
  // Valuables
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
        alert("User does not exist! Create new account using create button");
        setCart([]);
        setCartLoaded(false);
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();

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

  // Create User
  async function createUser() {
    if (!username.trim()) {
      alert("Please enter your name.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (res.status == 409) {
        alert("User already exist! Choose another name.");
        setCart([]);
        setCartLoaded(false);
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      const serverItems = data.items || [];

      const nextCart = serverItems.map(({ id, qty }) => ({ id, qty }));

      setCart(nextCart);

      setCartLoaded(false);
      alert(`Create User for ${username}`);
    } catch (err) {
      console.error(err);
      alert("Failed to Create User");
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
    nextCart.sort((a, b) => (a.id ?? 1e9) - (b.id ?? 1e9));
    setCart([...nextCart]);
    await syncToServer(nextCart);
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

  // [Repeat Slides]
  const slides = [
    "/hero-burger.png",
    "/hero-chicken.png",
    "/hero-pizza.png",
    "/Fries.png",
    "/Milkshake.png",
    "/Dining1.png",
  ];
  const repeatCount = 10; // Number of repetitions
  const repeatedSlides = Array(repeatCount).fill(slides).flat();
  const galleryRef = useRef(null);

  // for mouse scroll
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        gallery.scrollLeft += e.deltaY;
      }
    };
    gallery.addEventListener("wheel", handleWheel, { passive: false });
    return () => gallery.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="menu-page">
      <div className="menu-section">
        <h1>MENU</h1>
        <input
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <button className="name-btn" type="button" onClick={loadUserCart}>
          View
        </button>
        <button className="name-btn" type="button" onClick={createUser}>
          Create
        </button>
        <table className="menu-table">
          <thead>
            <tr>
              <th>Items</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const qty = getQty(item.id);
              return (
                <tr key={item.id}>
                  <td className="item-name">{item.name}</td>
                  <td className="item-price">{item.price}</td>
                  <td>
                    <button
                      className="add-btn"
                      type="button"
                      onClick={() => subFromCart(item)}
                    >
                      -
                    </button>
                  </td>
                  <td className="item-count">{qty}</td>
                  <td>
                    <button
                      className="add-btn"
                      type="button"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="gallery-section">
        <h1>Gallery</h1>
        <div className="gallery-scroll" ref={galleryRef}>
          {repeatedSlides.map((src, i) => (
            <figure key={i} className="gallery-card">
              <a href={src} target="_blank" rel="noopener noreferrer">
                <img src={src} alt={`slide-${i + 1}`}></img>
              </a>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
