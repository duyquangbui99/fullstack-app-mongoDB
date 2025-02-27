const API_URL = "http://localhost:5000";

// ✅ Extract token from URL and store it
function getTokenFromURL() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
        console.log("Extracted Token:", token);
        localStorage.setItem("token", token);
        window.history.replaceState({}, document.title, "/public/index.html");
    }
}

getTokenFromURL();

// ✅ Check login state and update UI
function checkLogin() {
    const storedToken = localStorage.getItem("token");
    document.getElementById("google-login").style.display = storedToken ? "none" : "block";
    document.getElementById("logout").style.display = storedToken ? "block" : "none";
    document.querySelector(".content").style.display = storedToken ? "block" : "none";
}

// ✅ Login function
function loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google`;
}

// ✅ Logout function
function logout() {
    localStorage.removeItem("token");
    alert("Logged out");
    checkLogin();
}

// ✅ Add new product
async function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ name, price })
    });

    if (res.ok) {
        alert("Product added!");
        getProducts(); // Refresh products list
    } else {
        alert("Error adding product");
    }
}

// ✅ Fetch all products
async function getProducts() {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();
    const productList = document.getElementById("product-list");
    productList.innerHTML = products.map(p => `<li>${p.name} - $${p.price}</li>`).join(" ");

    const productSelect = document.getElementById("product-select");
    productSelect.innerHTML = products.map(p => `<option value="${p._id}">${p.name}</option>`).join(" ");
}

// ✅ Add to cart
async function addToCart() {
    const productId = document.getElementById("product-select").value;
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ productId, quantity: 1 })
    });

    alert("Product added to cart!");
    viewCart(); // Refresh cart UI
}

// ✅ View cart and update UI
async function viewCart() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/cart`, { headers: { "Authorization": `Bearer ${token}` } });
    const cart = await res.json();
    const cartList = document.getElementById("cart-list");

    let totalAmount = 0;
    cartList.innerHTML = cart.products.map(item => {
        totalAmount += item.product.price * item.quantity;
        return `<li>${item.product.name} - $${item.product.price} x ${item.quantity}</li>`;
    }).join(" ");

    document.getElementById("total-price").innerText = `Total: $${totalAmount.toFixed(2)}`;
}

document.querySelectorAll(".nav-button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".section").forEach(section => {
            section.style.display = "none";
        });
        const sectionId = `${button.dataset.section}-section`;
        document.getElementById(sectionId).style.display = "block";

        if (button.dataset.section === "cart") {
            viewCart(); // ✅ Load cart data when Cart section is clicked
        }
    });
});


checkLogin();
getProducts();