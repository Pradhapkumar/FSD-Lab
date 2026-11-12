function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById("cart-items");
  const totalItemsEl = document.getElementById("total-items");
  const totalPriceEl = document.getElementById("total-price");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "empty-cart";

    const msg = document.createElement("p");
    msg.textContent = "Your cart is empty";

    const continueLink = document.createElement("a");
    continueLink.href = "index.html";
    continueLink.className = "continue-btn";
    continueLink.textContent = "Continue Shopping";

    emptyDiv.appendChild(msg);
    emptyDiv.appendChild(continueLink);
    cartItemsContainer.appendChild(emptyDiv);

    totalItemsEl.textContent = "0";
    totalPriceEl.textContent = "0";
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(function (item) {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    const details = document.createElement("div");
    details.className = "cart-item-details";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;

    const textWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.name;
    const priceText = document.createElement("p");
    priceText.textContent = "₹" + item.price + " × " + item.quantity;

    textWrap.appendChild(title);
    textWrap.appendChild(priceText);
    details.appendChild(img);
    details.appendChild(textWrap);

    const controls = document.createElement("div");
    controls.className = "cart-controls";

    const decBtn = document.createElement("button");
    decBtn.type = "button";
    decBtn.textContent = "-";
    decBtn.addEventListener("click", function () {
      changeQuantity(item.id, -1);
    });

    const qtySpan = document.createElement("span");
    qtySpan.textContent = item.quantity;

    const incBtn = document.createElement("button");
    incBtn.type = "button";
    incBtn.textContent = "+";
    incBtn.addEventListener("click", function () {
      changeQuantity(item.id, 1);
    });

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      removeItem(item.id);
    });

    controls.appendChild(decBtn);
    controls.appendChild(qtySpan);
    controls.appendChild(incBtn);
    controls.appendChild(removeBtn);

    itemDiv.appendChild(details);
    itemDiv.appendChild(controls);
    cartItemsContainer.appendChild(itemDiv);
  });

  totalItemsEl.textContent = totalItems;
  totalPriceEl.textContent = totalPrice;
}

function changeQuantity(productId, delta) {
  let cart = getCart();
  cart = cart
    .map(function (item) {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + delta
        };
      }
      return item;
    })
    .filter(function (item) {
      return item.quantity > 0;
    });

  saveCart(cart);
  renderCart();
}

function removeItem(productId) {
  const cart = getCart().filter(function (item) {
    return item.id !== productId;
  });
  saveCart(cart);
  renderCart();
}

function goToCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty! Add items before checking out.");
    return;
  }
  window.location.href = "checkout.html";
}

renderCart();

