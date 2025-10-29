import { useEffect, useRef } from "react";
import "./Menu.css";

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
function PriceToNumber(price) {
  return price.replace(/[^0-9.]/g, "");
}

function Menu() {
  const item = [
    { name: "Cheese Burger", price: "$8.99" },
    { name: "Bacon and Cheese Burger", price: "$9.99" },

    { name: "Medium Pepperoni Pizza", price: "$14.99" },
    { name: "Large Pepperoni Pizza", price: "$16.99" },

    { name: "8-piece chicken", price: "$24.99" },
    { name: "12-piece chicken", price: "$28.99" },

    { name: "French Fires", price: "$3.99" },
    { name: "Cola", price: "$1.99" },
    { name: "Milkshake", price: "$3.99" },
  ];

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

  // for cart
  useEffect(() => {});

  function addToCart(menuItem) {
    const cart = loadCart();
    const idx = cart.findIndex((c) => c.name === menuItem.name);

    if (idx >= 0) {
      cart[idx].qty += 1;
    } else {
      cart.push({
        name: menuItem.name,
        price: PriceToNumber(menuItem.price),
        stringPrice: menuItem.price,
        qty: 1,
      });
    }

    saveCart(cart);
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
            {item.map((item, index) => (
              <tr key={index}>
                <td className="item-name">{item.name}</td>
                <td className="item-price">{item.price}</td>
                <td>
                  <button
                    className="add-btn"
                    type="button"
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
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
