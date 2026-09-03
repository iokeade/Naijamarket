// =========================================
// NAIJAMARKET AI - APP.JS
// =========================================


// =========================================
// STORAGE
// =========================================

let listings = JSON.parse(
    localStorage.getItem("naijaListings")
) || [];

let cart = JSON.parse(
    localStorage.getItem("naijaCart")
) || [];

let orders = JSON.parse(
    localStorage.getItem("naijaOrders")
) || [];

let savedListings = JSON.parse(
    localStorage.getItem("naijaSaved")
) || [];


// =========================================
// SAVE DATA
// =========================================

function saveData() {

    localStorage.setItem(
        "naijaListings",
        JSON.stringify(listings)
    );

    localStorage.setItem(
        "naijaCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "naijaOrders",
        JSON.stringify(orders)
    );

    localStorage.setItem(
        "naijaSaved",
        JSON.stringify(savedListings)
    );
}


// =========================================
// SAMPLE PRODUCTS
// =========================================

if (listings.length === 0) {

    listings = [

        {
            id: 1,
            name: "Rice - 50kg Bag",
            category: "Food",
            price: 72000,
            condition: "New",
            location: "Mile 12, Lagos",
            description:
                "Quality premium rice available for wholesale and retail purchase.",
            quantity: 20,
            seller: "John Market Store",
            rating: 4.8,
            icon: "🍚"
        },

        {
            id: 2,
            name: "Beans - 50kg Bag",
            category: "Food",
            price: 65000,
            condition: "New",
            location: "Onitsha",
            description:
                "Clean and quality beans suitable for wholesale and retail buyers.",
            quantity: 15,
            seller: "Onitsha Food Store",
            rating: 4.7,
            icon: "🫘"
        },

        {
            id: 3,
            name: "Smartphone",
            category: "Electronics",
            price: 350000,
            condition: "New",
            location: "Ikeja, Lagos",
            description:
                "Brand new smartphone with warranty.",
            quantity: 8,
            seller: "Mary Electronics",
            rating: 4.7,
            icon: "📱"
        },

        {
            id: 4,
            name: "Men's T-Shirt",
            category: "Fashion",
            price: 15000,
            condition: "New",
            location: "Aba, Abia",
            description:
                "Quality men's T-shirt available in different sizes.",
            quantity: 30,
            seller: "Aba Fashion Store",
            rating: 4.5,
            icon: "👕"
        },

        {
            id: 5,
            name: "Sneakers",
            category: "Fashion",
            price: 45000,
            condition: "New",
            location: "Lagos",
            description:
                "Comfortable sneakers suitable for everyday use.",
            quantity: 12,
            seller: "Lagos Footwear",
            rating: 4.6,
            icon: "👟"
        },

        {
            id: 6,
            name: "Fresh Tomatoes",
            category: "Farm Products",
            price: 18000,
            condition: "New",
            location: "Mile 12, Lagos",
            description:
                "Fresh tomatoes directly from farmers and wholesalers.",
            quantity: 50,
            seller: "Fresh Farm Produce",
            rating: 4.9,
            icon: "🍅"
        }

    ];

    saveData();
}


// =========================================
// FORMAT NAIRA
// =========================================

function formatNaira(amount) {

    return "₦" + Number(amount).toLocaleString("en-NG");

}


// =========================================
// CREATE PRODUCT CARD
// =========================================

function createProductCard(product) {

    return `

        <div class="product-card">

            <div class="product-image">
                ${product.icon || "📦"}
            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    ${formatNaira(product.price)}
                </p>

                <p>
                    📍 ${product.location}
                </p>

                <p>
                    ⭐ ${product.rating || "New Seller"}
                </p>

                <p>
                    ${product.category}
                </p>

                <button
                    class="product-button"
                    onclick="viewListing(${product.id})"
                >
                    View Listing
                </button>

            </div>

        </div>

    `;

}


// =========================================
// DISPLAY PRODUCTS
// =========================================

function displayProducts(productsToShow = listings) {

    const productContainers =
        document.querySelectorAll(".products");

    productContainers.forEach(container => {

        // Don't replace products on profile page
        // unless it has our dynamic container.

        if (
            container.closest(".marketplace-products")
        ) {

            container.innerHTML = "";

            productsToShow.forEach(product => {

                container.innerHTML +=
                    createProductCard(product);

            });

        }

    });

}


// =========================================
// VIEW LISTING
// =========================================

function viewListing(id) {

    localStorage.setItem(
        "selectedListing",
        id
    );

    window.location.href =
        "listing.html";

}


// =========================================
// LOAD LISTING PAGE
// =========================================

function loadListingPage() {

    const selectedId =
        Number(
            localStorage.getItem(
                "selectedListing"
            )
        );

    if (!selectedId) {
        return;
    }

    const product =
        listings.find(
            item => item.id === selectedId
        );

    if (!product) {
        return;
    }

    const title =
        document.querySelector(".listing-details h1");

    const price =
        document.querySelector(".listing-price");

    const location =
        document.querySelector(
            ".listing-details > p:nth-of-type(2)"
        );

    const image =
        document.querySelector(".listing-image");

    if (title) {
        title.textContent =
            product.name;
    }

    if (price) {
        price.textContent =
            formatNaira(product.price);
    }

    if (image) {
        image.textContent =
            product.icon || "📦";
    }

    // Update seller information
    const sellerHeading =
        document.querySelector(
            ".seller-box h3"
        );

    if (sellerHeading) {

        sellerHeading.textContent =
            "👤 " + product.seller;

    }

}


// =========================================
// SEARCH
// =========================================

function searchProducts() {

    const searchInput =
        document.querySelector(
            ".marketplace-search input"
        );

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const results =
        listings.filter(product => {

            return (
                product.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchText)

                ||

                product.location
                    .toLowerCase()
                    .includes(searchText)
            );

        });

    displayMarketplaceProducts(results);

}


// =========================================
// MARKETPLACE PRODUCTS
// =========================================

function displayMarketplaceProducts(
    productsToShow = listings
) {

    const container =
        document.querySelector(
            ".marketplace-products"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (productsToShow.length === 0) {

        container.innerHTML = `

            <p class="empty">
                No products found.
            </p>

        `;

        return;
    }

    productsToShow.forEach(product => {

        container.innerHTML +=
            createProductCard(product);

    });

}


// =========================================
// MARKETPLACE FILTERS
// =========================================

function filterMarketplace() {

    const selects =
        document.querySelectorAll(
            ".filters select"
        );

    if (selects.length < 3) {
        return;
    }

    const category =
        selects[0].value;

    const location =
        selects[1].value;

    const sort =
        selects[2].value;

    let results =
        [...listings];


    // CATEGORY

    if (
        category &&
        category !== "All Categories"
    ) {

        results =
            results.filter(
                product =>
                    product.category === category
            );

    }


    // LOCATION

    if (
        location &&
        location !== "All Locations"
    ) {

        results =
            results.filter(
                product =>
                    product.location
                        .toLowerCase()
                        .includes(
                            location.toLowerCase()
                        )
            );

    }


    // SORT

    if (sort === "Lowest Price") {

        results.sort(
            (a, b) =>
                a.price - b.price
        );

    }

    if (sort === "Highest Price") {

        results.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sort === "Newest") {

        results.sort(
            (a, b) =>
                b.id - a.id
        );

    }


    displayMarketplaceProducts(
        results
    );

}


// =========================================
// SELL PRODUCT
// =========================================

function setupSellForm() {

    const form =
        document.getElementById(
            "sellForm"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const inputs =
                form.querySelectorAll(
                    "input, select, textarea"
                );


            const productName =
                inputs[0].value;

            const category =
                inputs[1].value;

            const price =
                Number(inputs[2].value);

            const condition =
                inputs[3].value;

            const location =
                inputs[4].value;

            const description =
                inputs[5].value;

            const quantity =
                Number(inputs[6].value);


            if (
                !productName ||
                !category ||
                !price ||
                !condition ||
                !location ||
                !quantity
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;
            }


            const newProduct = {

                id:
                    Date.now(),

                name:
                    productName,

                category:
                    category,

                price:
                    price,

                condition:
                    condition,

                location:
                    location,

                description:
                    description,

                quantity:
                    quantity,

                seller:
                    "My Store",

                rating:
                    0,

                icon:
                    getCategoryIcon(category)

            };


            listings.unshift(
                newProduct
            );

            saveData();


            alert(
                "Your product has been published successfully!"
            );


            window.location.href =
                "marketplace.html";

        }
    );

}


// =========================================
// CATEGORY ICON
// =========================================

function getCategoryIcon(category) {

    const icons = {

        "Food": "🍚",

        "Electronics": "📱",

        "Fashion": "👕",

        "Vehicles": "🚗",

        "Farm Products": "🌾",

        "Home": "🏠",

        "Other": "📦"

    };

    return icons[category] || "📦";

}


// =========================================
// ADD TO CART
// =========================================

function addToCart(id) {

    const product =
        listings.find(
            item => item.id === id
        );

    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        if (
            existing.quantity <
            product.quantity
        ) {

            existing.quantity++;

        } else {

            alert(
                "You cannot add more than the available quantity."
            );

            return;
        }

    } else {

        cart.push({

            id:
                product.id,

            name:
                product.name,

            price:
                product.price,

            seller:
                product.seller,

            icon:
                product.icon,

            quantity:
                1

        });

    }


    saveData();

    alert(
        "Product added to cart!"
    );

}


// =========================================
// CART TOTAL
// =========================================

function calculateCartTotal() {

    return cart.reduce(
        (total, item) =>
            total +
            item.price * item.quantity,
        0
    );

}


// =========================================
// DISPLAY CART
// =========================================

function displayCart() {

    const cartContainer =
        document.querySelector(
            ".cart-items"
        );

    if (!cartContainer) {
        return;
    }


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty">

                <h3>Your cart is empty.</h3>

                <p>
                    Find something you like in the marketplace.
                </p>

                <a
                    href="marketplace.html"
                    class="product-button"
                >
                    Browse Marketplace
                </a>

            </div>

        `;

        return;
    }


    cartContainer.innerHTML = "";


    cart.forEach(item => {

        cartContainer.innerHTML += `

            <div class="cart-item">

                <div class="cart-image">
                    ${item.icon || "📦"}
                </div>


                <div class="cart-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${item.seller}
                    </p>

                    <p class="product-price">
                        ${formatNaira(item.price)}
                    </p>


                    <div class="quantity">

                        <button
                            onclick="changeQuantity(
                                ${item.id},
                                -1
                            )"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(
                                ${item.id},
                                1
                            )"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove-button"
                    onclick="removeFromCart(
                        ${item.id}
                    )"
                >
                    Remove
                </button>

            </div>

            <hr>

        `;

    });


    updateCartSummary();

}


// =========================================
// CHANGE QUANTITY
// =========================================

function changeQuantity(
    id,
    amount
) {

    const item =
        cart.find(
            item => item.id === id
        );

    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    const product =
        listings.find(
            product => product.id === id
        );


    if (
        product &&
        item.quantity > product.quantity
    ) {

        item.quantity =
            product.quantity;

        alert(
            "You have reached the available quantity."
        );

    }


    saveData();

    displayCart();

}


// =========================================
// REMOVE FROM CART
// =========================================

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveData();

    displayCart();

}


// =========================================
// CART SUMMARY
// =========================================

function updateCartSummary() {

    const subtotal =
        calculateCartTotal();

    const delivery =
        cart.length > 0
            ? 3000
            : 0;

    const total =
        subtotal + delivery;


    const summary =
        document.querySelector(
            ".cart-summary"
        );

    if (!summary) {
        return;
    }


    summary.innerHTML = `

        <p>

            Subtotal:

            <strong>
                ${formatNaira(subtotal)}
            </strong>

        </p>


        <p>

            Delivery:

            <strong>
                ${formatNaira(delivery)}
            </strong>

        </p>


        <h2>

            Total:

            ${formatNaira(total)}

        </h2>


        <button
            onclick="checkout()"
        >
            Proceed to Checkout
        </button>

    `;

}


// =========================================
// CHECKOUT
// =========================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const subtotal =
        calculateCartTotal();

    const delivery =
        3000;

    const total =
        subtotal + delivery;


    const newOrder = {

        id:
            "NM" +
            Math.floor(
                10000 +
                Math.random() * 90000
            ),

        items:
            [...cart],

        subtotal:
            subtotal,

        delivery:
            delivery,

        total:
            total,

        status:
            "Order Confirmed",

        date:
            new Date()
                .toLocaleDateString()

    };


    orders.unshift(
        newOrder
    );


    cart = [];


    saveData();


    alert(
        "Order placed successfully!"
    );


    window.location.href =
        "orders.html";

}


// =========================================
// DISPLAY ORDERS
// =========================================

function displayOrders() {

    const orderContainer =
        document.querySelector(
            ".orders-list"
        );

    if (!orderContainer) {
        return;
    }


    if (orders.length === 0) {

        orderContainer.innerHTML = `

            <div class="empty">

                <h3>
                    You have no orders yet.
                </h3>

                <a
                    href="marketplace.html"
                    class="product-button"
                >
                    Start Shopping
                </a>

            </div>

        `;

        return;
    }


    orderContainer.innerHTML = "";


    orders.forEach(order => {

        const itemNames =
            order.items
                .map(item => item.name)
                .join(", ");


        orderContainer.innerHTML += `

            <div class="order">

                <div>

                    <p>
                        Order #${order.id}
                    </p>

                    <h3>
                        ${itemNames}
                    </h3>

                    <p>
                        Date: ${order.date}
                    </p>

                    <p class="product-price">
                        ${formatNaira(order.total)}
                    </p>

                </div>


                <div class="order-status">

                    🟢 ${order.status}

                </div>

            </div>

            <hr>

        `;

    });

}


// =========================================
// SAVE LISTING
// =========================================

function saveListing(id) {

    if (
        savedListings.includes(id)
    ) {

        savedListings =
            savedListings.filter(
                savedId =>
                    savedId !== id
            );

        alert(
            "Listing removed from saved items."
        );

    } else {

        savedListings.push(id);

        alert(
            "Listing saved!"
        );

    }


    saveData();

}


// =========================================
// CONTACT SELLER
// =========================================

function contactSeller() {

    window.location.href =
        "messages.html";

}


// =========================================
// UPDATE CART COUNT
// =========================================

function updateCartCount() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartLinks =
        document.querySelectorAll(
            'a[href="cart.html"]'
        );


    cartLinks.forEach(link => {

        link.textContent =
            `🛒 Cart (${totalItems})`;

    });

}


// =========================================
// INITIALIZE APP
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        // Marketplace

        displayMarketplaceProducts();

        const searchInput =
            document.querySelector(
                ".marketplace-search input"
            );

        const searchButton =
            document.querySelector(
                ".marketplace-search button"
            );


        if (searchButton) {

            searchButton.addEventListener(
                "click",
                searchProducts
            );

        }


        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        searchProducts();

                    }

                }
            );

        }


        // Filters

        const filters =
            document.querySelectorAll(
                ".filters select"
            );


        filters.forEach(
            select => {

                select.addEventListener(
                    "change",
                    filterMarketplace
                );

            }
        );


        // Sell page

        setupSellForm();


        // Listing page

        loadListingPage();


        // Cart page

        displayCart();


        // Orders page

        displayOrders();


        // Cart count

        updateCartCount();

    }
);