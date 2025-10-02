import { useState } from "react";
import "./Menu.css";

function Menu() {
  const item = [
    { name: "Cheese Burger", price: "$8.99" },
    { name: "Bacon and Cheese Burger", price: "$9.99" },
    { name: "=====================", price: "====" },
    { name: "Medium Pepperoni Pizza", price: "$14.99" },
    { name: "Large Pepperoni Pizza", price: "$16.99" },
    { name: "=====================", price: "====" },
    { name: "8-piece chicken", price: "$24.99" },
    { name: "12-piece chicken", price: "$28.99" },
    { name: "=====================", price: "====" },
    { name: "French Fires", price: "$3.99" },
    { name: "Cola", price: "$1.99" },
    { name: "Milkshake", price: "$3.99" },
  ];
  const slides = ["/hero-burger.png", "/hero-chicken.png", "hero-pizza.png"];
  const [current, setCurrent] = useState(0);
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="gallery-section">
        <h1>Gallery</h1>
        <div className="gallery-slide">
          <img
            className="photo"
            src={slides[current]}
            alt={`slides-${current}`}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Menu;
