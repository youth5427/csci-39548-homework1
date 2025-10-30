import "./Mycart.css";
import CartCompo from "../components/CartCompo";

function Mycart() {
  return (
    <div className="cart-page">
      <h1 className="cart-header">My Cart</h1>

      <div className="cart-content">
        <CartCompo />
      </div>
    </div>
  );
}

export default Mycart;
