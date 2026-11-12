import React, { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  const foods = [
    { id: 1, name: "Chicken Biryani", price: 180, emoji: "🍛" },
    { id: 2, name: "Chicken Burger", price: 150, emoji: "🍔" },
    { id: 3, name: "Pizza", price: 250, emoji: "🍕" },
    { id: 4, name: "French Fries", price: 100, emoji: "🍟" },
    { id: 5, name: "Special Pancakes", price: 80, emoji: "🥞" },
    { id: 6, name: "Ice Cream", price: 90, emoji: "🍨" }
  ];

  // Add food to cart
  function addToCart(food) {
    const existingItem = cart.find((item) => item.id === food.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  }

  // Increase quantity
  function increaseQuantity(id) {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove item
  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // Calculate total
  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Open checkout modal
  function openCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setOrderConfirmed(false);
    setShowCheckoutModal(true);
  }

  // Confirm order inside modal
  function confirmOrder(e) {
    e.preventDefault();
    setConfirmedTotal(getTotal());
    setOrderConfirmed(true);
    setCart([]);
  }

  function closeModal() {
    setShowCheckoutModal(false);
    setOrderConfirmed(false);
    setCustomerName("");
    setDeliveryAddress("");
  }

  return (
    <div>
      {/* HEADER */}
      <header>
        <h1>🍴 FoodExpress</h1>
        <p>Delicious food delivery to your door</p>
      </header>

      {/* MAIN CONTENT */}
      <div className="container">
        {/* FOOD MENU */}
        <section className="menu">
          <h2>Popular Foods</h2>
          <div className="food-grid">
            {foods.map((food) => (
              <div className="food-card" key={food.id}>
                <div className="food-image">{food.emoji}</div>
                <h3>{food.name}</h3>
                <p className="price">₹{food.price}</p>
                <button type="button" onClick={() => addToCart(food)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CART */}
        <section className="cart">
          <h2>🛒 Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <b>{item.name}</b>
                    <p>
                      ₹{item.price} &times; {item.quantity}
                    </p>
                  </div>
                  <div className="quantity">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      &minus;
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              <div className="total">
                <h3>Total: ₹{getTotal()}</h3>
                <button
                  type="button"
                  className="order"
                  onClick={openCheckout}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {!orderConfirmed ? (
              <>
                <h2>Checkout Summary</h2>
                <ul className="modal-items">
                  {cart.map((item) => (
                    <li key={item.id}>
                      <span>
                        {item.name} &times; {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="modal-total">Total: ₹{getTotal()}</div>

                <form onSubmit={confirmOrder} className="checkout-form">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="Delivery Address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  />
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-confirm">
                      Confirm Order
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="order-success">
                <h2>Order Confirmed!</h2>
                <p>
                  Thank you, <strong>{customerName}</strong>! Your order of{" "}
                  <strong>₹{confirmedTotal}</strong> is on the way to{" "}
                  {deliveryAddress}.
                </p>
                <button
                  type="button"
                  className="btn-confirm"
                  onClick={closeModal}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

