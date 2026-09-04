// ==========================================
// NAIJAMARKET AI - MAIN JAVASCRIPT
// ==========================================

// ---------- STORAGE ----------
const LISTINGS_KEY = "naijaListings";
const CART_KEY = "naijaCart";
const ORDERS_KEY = "naijaOrders";
const SAVED_KEY = "naijaSaved";
const SELECTED_KEY = "selectedListing";

// ---------- SAMPLE PRODUCTS ----------
const sampleProducts = [
    {
        id: 1,
        name: "Rice - 50kg Bag",
        category: "Food",
        price: 72000,
        quantity: 20,
        location: "Mile 12, Lagos",
        seller: "John Market Store",
        rating: 4.8,
        icon: "🍚",
        description: "Premium quality Nigerian rice. Perfect for homes, restaurants and businesses."
    },
    {
        id: 2,
        name: "Beans - 50kg Bag",
        category: "Food",
        price: 65000,
        quantity: 15,
        location: "Onitsha",
        seller: "Onitsha Food Store",
        rating: 4.7,
        icon: "🫘",
        description: "Fresh quality beans suitable for household and commercial use."
    },
    {
        id: 3,
        name: "Smartphone",
        category: "Electronics",
        price: 350000,
        quantity: 8,
        location: "Ikeja, Lagos",
        seller: "Mary Electronics",
        rating: 4.7,
        icon: "📱",
        description: "Modern smartphone with excellent performance, camera and battery life."
    },
    {
        id: 4,
        name: "Men's T-Shirt",
        category: "Fashion",
        price: 15000,
        quantity: 30,
        location: "Aba, Abia",
        seller: "Aba Fashion Store",
        rating: 4.5,
        icon: "👕",
        description: "Quality men's T-shirt available in different sizes and colors."
    },
    {
        id: 5,
        name: "Sneakers",
        category: "Fashion",
        price: 45000,
        quantity: 12,
        location: "Lagos",
        seller: "Lagos Footwear",
        rating: 4.6,
        icon: "👟",
        description: "Comfortable and stylish sneakers for everyday use."
    },
    {
        id: 6,
        name: "Fresh Tomatoes",
        category: "Farm Products",
        price: 18000,
        quantity: 50,
        location: "Mile 12, Lagos",
        seller: "Fresh Farm Produce",
        rating: 4.9,
        icon: "🍅",
        description: "Fresh Nigerian tomatoes suitable for homes, restaurants and food businesses."
    }
];

// ---------- LOAD DATA ----------
let listings =
    JSON.parse(localStorage.getItem(LISTINGS_KEY)) || [];

let cart =
    JSON.parse(localStorage.getItem(CART_KEY)) || [];

let orders =
    JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];

let saved =
    JSON.parse(localStorage.getItem(SAVED_KEY)) || [];


// ---------- INITIAL DATA ----------
if (listings.length === 0) {
    listings = sampleProducts;
    saveData();
}


// ---------- SAVE DATA ----------
function saveData() {
    localStorage.setItem(
        LISTINGS_KEY,
        JSON.stringify(listings)
    );

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
    );

    localStorage.setItem(
        SAVED_KEY,
        JSON.stringify(saved)
    );
}


// ---------- FORMAT NAIRA ----------
function formatNaira(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
}


// ==========================================
// PRODUCT CARDS
// ==========================================

function createProductCard(product) {
    return `
        <div class="product-card">

            <div
                class="product-image"
                onclick="viewListing(${product.id})"
            >
                ${
                    product.image
                        ? `<img src="${product.image}" alt="${product.name}">`
                        : `<span>${product.icon || "📦"}</span>`
                }
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <h2>
                    ${formatNaira(product.price)}
                </h2>

                <p>
                    📍 ${product.location}
                </p>

                <p>
                    ⭐ ${product.rating || "New"}
                </p>

                <p>
                    Stock: ${product.quantity}
                </p>

                <button
                    onclick="viewListing(${product.id})"
                    class="view-listing"
                >
                    View Listing
                </button>

            </div>

        </div>
    `;
}


// ---------- DISPLAY PRODUCTS ----------
function displayProducts(products = listings) {

    const container =
        document.querySelector(".products-grid") ||
        document.querySelector("#products");

    if (!container) {
        return;
    }

    if (products.length === 0) {
        container.innerHTML =
            "<p>No products found.</p>";
        return;
    }

    container.innerHTML =
        products.map(createProductCard).join("");
}


// ==========================================
// VIEW LISTING
// ==========================================

function viewListing(id) {

    const product =
        listings.find(
            item => Number(item.id) === Number(id)
        );

    if (!product) {
        alert("Product not found.");
        return;
    }

    localStorage.setItem(
        SELECTED_KEY,
        JSON.stringify(product)
    );

    window.location.href = "listing.html";
}


// ==========================================
// LOAD LISTING PAGE
// ==========================================

function loadListingPage() {

    const selected =
        JSON.parse(
            localStorage.getItem(SELECTED_KEY)
        );

    if (!selected) {
        return;
    }

    const product =
        listings.find(
            item =>
                Number(item.id) ===
                Number(selected.id)
        ) || selected;


    // Product name
    const title =
        document.querySelector(".listing-title") ||
        document.querySelector("#listing-title");

    if (title) {
        title.textContent = product.name;
    }


    // Price
    const price =
        document.querySelector(".listing-price") ||
        document.querySelector("#listing-price");

    if (price) {
        price.textContent =
            formatNaira(product.price);
    }


    // Image
    const image =
        document.querySelector(".listing-image") ||
        document.querySelector("#listing-image");

    if (image) {

        if (product.image) {
            image.src = product.image;
            image.alt = product.name;
        } else {
            image.innerHTML =
                product.icon || "📦";
        }
    }


    // Description
    const description =
        document.querySelector(".listing-description") ||
        document.querySelector("#listing-description");

    if (description) {
        description.textContent =
            product.description ||
            "No description available.";
    }


    // Seller
    const seller =
        document.querySelector(".seller-name") ||
        document.querySelector("#seller-name");

    if (seller) {
        seller.textContent =
            product.seller || "Unknown Seller";
    }


    // Location
    const location =
        document.querySelector(".listing-location") ||
        document.querySelector("#listing-location");

    if (location) {
        location.textContent =
            product.location || "Nigeria";
    }


    // Quantity / Stock
    const stock =
        document.querySelector(".listing-stock") ||
        document.querySelector("#listing-stock");

    if (stock) {
        stock.textContent =
            `Available: ${product.quantity}`;
    }

// ======================================
// ADD TO CART BUTTON
// ======================================

const addCartButton =
    document.querySelector(".add-to-cart");

if (addCartButton) {
    addCartButton.onclick = function () {
        addToCart(product.id);
    };
}


// ======================================
// BUY NOW BUTTON
// ======================================

const buyNowButton =
    document.querySelector(".buy-now");

if (buyNowButton) {
    buyNowButton.onclick = function () {
        addToCart(product.id);
        window.location.href = "cart.html";
    };
}

    // ======================================
    // SAVE LISTING
    // ======================================

    const saveButton =
        document.querySelector(".save-listing");

    if (saveButton) {

        saveButton.onclick = function () {

            saveListing(product.id);

        };
    }


    // ======================================
    // CONTACT SELLER
    // ======================================

    const contactButton =
        document.querySelector(".contact-seller");

    if (contactButton) {

        contactButton.onclick =
            function () {

                contactSeller(product);

            };
    }
}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id) {
    id = Number(id);

    const product = listings.find(
        item => Number(item.id) === id
    );

    if (!product) {
        alert("Product could not be found.");
        return;
    }

    if (!product.quantity || Number(product.quantity) <= 0) {
        alert("This product is out of stock.");
        return;
    }

    const existing = cart.find(
        item => Number(item.id) === id
    );

    if (existing) {
        if (Number(existing.quantity) < Number(product.quantity)) {
            existing.quantity++;
        } else {
            alert("You cannot add more than the available stock.");
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            seller: product.seller,
            icon: product.icon || "📦",
            image: product.image || "",
            quantity: 1
        });
    }

    saveData();
    updateCartCount();
    alert(product.name + " has been added to your cart!");
}

let currentProduct = null;

function handleAddToCart() {
    if (!currentProduct) {
        try {
            currentProduct = JSON.parse(localStorage.getItem("selectedListing"));
        } catch (e) {}
        if (!currentProduct && listings.length > 0) {
            currentProduct = listings[0];
        }
    }
    if (!currentProduct) {
        alert("No product selected. Open a product from the Marketplace first.");
        return;
    }
    addToCart(currentProduct.id);
}

function handleBuyNow() {
    if (!currentProduct) {
        try {
            currentProduct = JSON.parse(localStorage.getItem("selectedListing"));
        } catch (e) {}
        if (!currentProduct && listings.length > 0) {
            currentProduct = listings[0];
        }
    }
    if (!currentProduct) {
        alert("No product selected. Open a product from the Marketplace first.");
        return;
    }
    addToCart(currentProduct.id);
    window.location.href = "cart.html";
}
// ==========================================
// CART TOTAL
// ==========================================

function calculateCartTotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                Number(item.price) *
                Number(item.quantity);

        },
        0
    );
}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    const container =
        document.querySelector(".cart-items");

    if (!container) {
        return;
    }


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 🛒</h2>

                <p>
                    Add some products to your cart.
                </p>

                <a href="marketplace.html">
                    Continue Shopping
                </a>
            </div>
        `;

        updateCartSummary();

        return;
    }


    container.innerHTML =
        cart.map(item => {

            return `
                <div class="cart-item">

                    <div class="cart-product">

                        <div class="cart-image">
                            ${
                                item.image
                                    ? `<img
                                        src="${item.image}"
                                        alt="${item.name}"
                                      >`
                                    : `<span>
                                        ${item.icon || "📦"}
                                      </span>`
                            }
                        </div>

                        <div>
                            <h3>
                                ${item.name}
                            </h3>

                            <p>
                                ${formatNaira(item.price)}
                            </p>
                        </div>

                    </div>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <div class="cart-item-total">

                        <strong>
                            ${formatNaira(
                                item.price *
                                item.quantity
                            )}
                        </strong>

                        <button
                            onclick="removeFromCart(${item.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;

        }).join("");


    updateCartSummary();
}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(id, amount) {

    id = Number(id);

    const item =
        cart.find(
            product =>
                Number(product.id) === id
        );

    if (!item) {
        return;
    }


    const product =
        listings.find(
            product =>
                Number(product.id) === id
        );


    item.quantity =
        Number(item.quantity) +
        Number(amount);


    // Don't allow less than 1
    if (item.quantity < 1) {

        item.quantity = 1;
    }


    // Don't exceed stock
    if (
        product &&
        item.quantity >
        Number(product.quantity)
    ) {

        item.quantity =
            Number(product.quantity);

        alert(
            "You cannot add more than the available stock."
        );
    }


    saveData();

    displayCart();

    updateCartCount();
}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(id) {

    id = Number(id);

    cart =
        cart.filter(
            item =>
                Number(item.id) !== id
        );

    saveData();

    displayCart();

    updateCartCount();
}


// ==========================================
// CART SUMMARY
// ==========================================

function updateCartSummary() {

    const total =
        calculateCartTotal();


    const summary =
        document.querySelector(".cart-summary");

    if (summary) {

        summary.innerHTML = `

            <h2>Cart Summary</h2>

            <p>
                Subtotal:
                <strong>
                    ${formatNaira(total)}
                </strong>
            </p>

            <p>
                Delivery:
                <strong>
                    Calculated at checkout
                </strong>
            </p>

            <hr>

            <h2>
                Total:
                ${formatNaira(total)}
            </h2>

            <button
                onclick="checkout()"
                class="checkout-button"
            >
                Proceed to Checkout
            </button>

        `;
    }


    const totalElement =
        document.querySelector("#cart-total");

    if (totalElement) {

        totalElement.textContent =
            formatNaira(total);
    }
}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const totalItems =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(item.quantity);

            },
            0
        );


    // Elements with #cart-count
    const cartCount =
        document.querySelector("#cart-count");

    if (cartCount) {

        cartCount.textContent =
            totalItems;
    }


    // Cart links
    const cartLinks =
        document.querySelectorAll(
            'a[href="cart.html"]'
        );


    cartLinks.forEach(link => {

        link.textContent =
            `🛒 Cart (${totalItems})`;

    });
}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const total = calculateCartTotal();

    const order = {
        id: "ORD-" + Date.now(),
        items: [...cart],
        total: total,
        date: new Date().toLocaleString(),
        status: "Pending"
    };

    orders.push(order);

    // Reduce stock
    cart.forEach(cartItem => {
        const product = listings.find(
            item => Number(item.id) === Number(cartItem.id)
        );
        if (product) {
            product.quantity = Math.max(
                0,
                Number(product.quantity) - Number(cartItem.quantity)
            );
        }
    });

    cart = [];
    saveData();
    updateCartCount();

    alert("Order placed successfully! 🎉");
    window.location.href = "orders.html";
}

// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts() {

    const input =
        document.querySelector("#search-input") ||
        document.querySelector(".search-input");

    if (!input) {
        return;
    }


    const search =
        input.value
            .toLowerCase()
            .trim();


    const results =
        listings.filter(product => {

            return (
                product.name
                    .toLowerCase()
                    .includes(search) ||

                product.category
                    .toLowerCase()
                    .includes(search) ||

                product.location
                    .toLowerCase()
                    .includes(search)
            );

        });


    displayProducts(results);
}


// ==========================================
// FILTER MARKETPLACE
// ==========================================

function filterMarketplace(category) {

    if (
        !category ||
        category === "all"
    ) {

        displayProducts(listings);

        return;
    }


    const filtered =
        listings.filter(
            product =>
                product.category ===
                category
        );


    displayProducts(filtered);
}


// ==========================================
// SELL PRODUCT
// ==========================================

function setupSellForm() {

    const form =
        document.querySelector("#sell-form") ||
        document.querySelector(".sell-form");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                form.querySelector(
                    '[name="name"]'
                )?.value;


            const category =
                form.querySelector(
                    '[name="category"]'
                )?.value;


            const price =
                form.querySelector(
                    '[name="price"]'
                )?.value;


            const quantity =
                form.querySelector(
                    '[name="quantity"]'
                )?.value;


            const location =
                form.querySelector(
                    '[name="location"]'
                )?.value;


            const seller =
                form.querySelector(
                    '[name="seller"]'
                )?.value ||
                "NaijaMarket Seller";


            if (
                !name ||
                !category ||
                !price ||
                !quantity ||
                !location
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;
            }


            const newProduct = {

                id:
                    Date.now(),

                name:
                    name,

                category:
                    category,

                price:
                    Number(price),

                quantity:
                    Number(quantity),

                location:
                    location,

                seller:
                    seller,

                rating:
                    5,

                icon:
                    getCategoryIcon(category),

                description:
                    "New product listed on NaijaMarket AI."

            };


            listings.push(newProduct);

            saveData();


            alert(
                "Your product has been listed successfully!"
            );


            form.reset();

            window.location.href =
                "marketplace.html";

        }
    );
}


// ==========================================
// CATEGORY ICON
// ==========================================

function getCategoryIcon(category) {

    const icons = {

        Food: "🍚",

        Electronics: "📱",

        Fashion: "👕",

        "Farm Products": "🌾",

        Beauty: "💄",

        Home: "🏠",

        Vehicles: "🚗",

        Other: "📦"

    };


    return icons[category] || "📦";
}


// ==========================================
// SAVE LISTING
// ==========================================

function saveListing(id) {

    id = Number(id);


    if (
        saved.some(
            item =>
                Number(item.id) === id
        )
    ) {

        alert(
            "This listing is already saved."
        );

        return;
    }


    const product =
        listings.find(
            item =>
                Number(item.id) === id
        );


    if (!product) {
        return;
    }


    saved.push(product);

    saveData();


    alert(
        "Listing saved successfully ❤️"
    );
}


// ==========================================
// CONTACT SELLER
// ==========================================

function contactSeller(product) {

    alert(
        `Contact ${product.seller} about ${product.name}.`
    );
}


// ==========================================
// MARKETPLACE PAGE
// ==========================================

function displayMarketplaceProducts() {

    displayProducts(listings);

}


// ==========================================
// PAGE STARTUP
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Marketplace
        displayMarketplaceProducts();


        // Listing page
        loadListingPage();


        // Cart page
        displayCart();


        // Sell page
        setupSellForm();


        // Cart number
        updateCartCount();


        // Search button
        const searchButton =
            document.querySelector(
                "#search-button"
            );

        if (searchButton) {

            searchButton.addEventListener(
                "click",
                searchProducts
            );
        }


        // Search input ENTER key
        const searchInput =
            document.querySelector(
                "#search-input"
            );

        if (searchInput) {

            searchInput.addEventListener(
                "keypress",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        searchProducts();

                    }

                }
            );
        }

    }
);