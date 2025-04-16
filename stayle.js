// document.getElementById('btn').onclick = function () {
//     console.log("rami");
    
// }

document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
});

let cart = [];
const cartCount = document.getElementById("cart-count");
const viewCartButton = document.getElementById("view-cart");
const cartModal = document.getElementById("cart-modal");
const closeCartButton = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceContainer = document.getElementById("total-price");

// دالة لإضافة منتج إلى السلة
function addToCart(productId, productName, productPrice) {
    const product = { id: productId, name: productName, price: productPrice };
    cart.push(product);
    cartCount.textContent = cart.length; // تحديث عدد العناصر في السلة
    updateCartModal();
}

// دالة لتحديث محتويات نافذة السلة
// function updateCartModal() {
//     if (cart.length === 0) {
//         cartItemsContainer.innerHTML = "<p>السلة فارغة</p>";
//         totalPriceContainer.textContent = "0 $ٍ";
//     } else {
//         cartItemsContainer.innerHTML = ""; // إفراغ السلة قبل إضافة المنتجات الجديدة
//         let total = 0;
//         cart.forEach(item => {
//             const productElement = document.createElement("p");
//             productElement.textContent = `${item.name} - ${item.price} $`;
//             cartItemsContainer.appendChild(productElement);
//             total += item.price;
//         });
//         totalPriceContainer.textContent = total + " $";
//     }
// }

function updateCartModal() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>السلة فارغة</p>";
        totalPriceContainer.textContent = "0 $";
    } else {
        cartItemsContainer.innerHTML = ""; // تفريغ المحتويات السابقة
        let total = 0;

        cart.forEach((item, index) => {
            const productElement = document.createElement("div");
            productElement.innerHTML = `
                <p>${item.name} - ${item.price} $ 
                <button class="remove-item" data-index="${index}">❌</button></p>
            `;
            cartItemsContainer.appendChild(productElement);
            total += item.price;
        });

        totalPriceContainer.textContent = total + " $";

        // إضافة أحداث الحذف لكل زر
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                cart.splice(index, 1); // حذف العنصر من السلة
                cartCount.textContent = cart.length;
                updateCartModal(); // تحديث العرض
            });
        });
    }
}

// فتح نافذة السلة عند الضغط على "عرض السلة"
viewCartButton.addEventListener("click", () => {
    cartModal.style.display = "block";
});

// إغلاق نافذة السلة عند الضغط على "×"
closeCartButton.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// إضافة حدث لكل زر "أضف إلى السلة"
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        const productElement = button.closest(".product");
        const productId = productElement.getAttribute("data-id");
        const productName = productElement.getAttribute("data-name");
        const productPrice = parseFloat(productElement.getAttribute("data-price"));
        addToCart(productId, productName, productPrice);
    });
});



const clearCartButton = document.getElementById("clear-cart");

clearCartButton.addEventListener("click", () => {
    if (confirm("هل أنت متأكد أنك تريد تفريغ السلة؟")) {
        cart = [];
        cartCount.textContent = "0";
        updateCartModal();
        saveCartToLocalStorage();
    }
});







// حفظ السلة في localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// تحميل السلة من localStorage عند تشغيل الصفحة
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        cartCount.textContent = cart.length;
        updateCartModal();
    }
}

// تعديل دوال add / remove لتحديث localStorage
function addToCart(productId, productName, productPrice) {
    const product = { id: productId, name: productName, price: productPrice };
    cart.push(product);
    cartCount.textContent = cart.length;
    updateCartModal();
    saveCartToLocalStorage();
}
