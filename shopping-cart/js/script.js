function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const totalCount = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = totalCount;
  }
}

function displayProducts(productList) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  if (productList.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "empty-message";
    emptyMsg.textContent = "No products match your search.";
    container.appendChild(emptyMsg);
    return;
  }

  productList.forEach(function (product) {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = "₹" + product.price;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Add to Cart";
    btn.addEventListener("click", function () {
      addToCart(product.id);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(btn);
    container.appendChild(card);
  });
}

function searchProducts() {
  const query = document.getElementById("search").value.trim().toLowerCase();
  const filtered = products.filter(function (product) {
    return product.name.toLowerCase().includes(query);
  });
  displayProducts(filtered);
}

function addToCart(productId) {
  const product = products.find(function (p) {
    return p.id === productId;
  });
  if (!product) {
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(function (item) {
    return item.id === productId;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
}

displayProducts(products);
updateCartCount();

