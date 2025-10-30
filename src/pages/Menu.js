import { useEffect, useRef, useState } from "react";
import "./Menu.css";
import menuData from "../data/menuData";
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
// save as cent
function PriceToNumber(price) {
  return Number(price.replace(/[^0-9.]/g, "")) * 100;
}

function Menu() {
  // load menu Data
  const item = menuData;
  const [cart, setCart] = useState([]);

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

  // for loading cart
  useEffect(() => {
    setCart(loadCart());
  }, []);

  const getQty = (id) => {
    const found = cart.find((c) => c.id === id);
    return found ? found.qty : 0;
  };

  const sync = (cart) => {
    cart.sort((a, b) => (a.id ?? 1e9) - (b.id ?? 1e9));
    saveCart(cart);
    setCart([...cart]);
  };

  function addToCart(menuItem) {
    const cart = loadCart();
    const idx = cart.findIndex((c) => c.id === menuItem.id);

    if (idx >= 0) {
      cart[idx].qty += 1;
    } else {
      cart.push({
        id: menuItem.id,
        name: menuItem.name,
        price: PriceToNumber(menuItem.price),
        stringPrice: menuItem.price,
        qty: 1,
      });
    }
    sync(cart);
  }
  function subFromCart(menuItem) {
    const cart = loadCart();
    const idx = cart.findIndex((c) => c.id === menuItem.id);

    if (idx >= 0) {
      cart[idx].qty -= 1;
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
    }
    sync(cart);
  }

  // for mouse scroll
  useEffect(() => {
    const gallery = galleryRef.current;
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
        <table className="menu-table">
          <thead>
            <tr>
              <th>Items</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {item.map((item, index) => {
              const qty = getQty(item.id);
              return (
                <tr key={index}>
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
