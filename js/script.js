// toggle class active
const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// toggle class active untuk seacrh form 
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};



// klik di luar sidebar untuk menghilangkan nav
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// modal box 
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');


itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
})

// klik tombol close 
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

// klik di luar modal 
window.onclick = (e) => {
  if(e.target === itemDetailModal){
    itemDetailModal.style.display = 'none';
  } 
}
// untuk shopping-cart
function addToCart(productName, productPrice, productImage) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Cari apakah produk sudah ada
  let existing = cart.find(item => item.name === productName);
  if (existing) {
existing.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));

  // Notifikasi singkat
  alert('Produk berhasil ditambahkan ke keranjang!');

  // Update tampilan shopping-cart
  updateCartUI();
}

function updateCartUI() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let container = document.querySelector('.shopping-cart');
  container.innerHTML = ''; 

  let total = 0;
  cart.forEach((item, index) => {
    // Konversi harga string (Rp 95K) menjadi angka, misalnya 95000
    let priceNumber = parseInt(item.price.replace(/\D/g, '')) * 1000;
    let itemTotal = priceNumber * item.quantity;
    total += itemTotal;

    let html = `
      <div class="cart-item" data-index="${index}">
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-detail">
          <h3>${item.name}</h3>
          <div class="item-price">${item.price} x ${item.quantity}</div>
          <div class="item-controls">
            <button class="decrease-qty">-</button>
            <span>${item.quantity}</span>
            <button class="increase-qty">+</button>
          </div>
        </div>
        <i data-feather="trash-2" class="remove-item"></i>
      </div>
    `;
    container.innerHTML += html;
  });

   // Tambahkan total & tombol checkout
  if (cart.length > 0) {
    container.innerHTML += `
      <div class="cart-footer">
        <div class="cart-total">Total: Rp ${formatRupiah(total)}</div>
        <button class="checkout-button">Checkout</button>
      </div>
    `;
  }
feather.replace(); 

    // Event listener tambah/kurangi jumlah
  let increaseButtons = container.querySelectorAll('.increase-qty');
  let decreaseButtons = container.querySelectorAll('.decrease-qty');
  let removeButtons = container.querySelectorAll('.remove-item');

  increaseButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => changeQuantity(idx, 1));
  });

  decreaseButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => changeQuantity(idx, -1));
  });

  removeButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => removeFromCart(idx));
  });

  // Event listener checkout
  let checkoutButton = container.querySelector('.checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', checkout);
  }
}

function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Keranjang kosong!');
    return;
  }

   let pesan = 'Halo, saya mau checkout produk berikut:%0A';
  let total = 0;
  cart.forEach(item => {
    pesan += `- ${item.name} x${item.quantity} (${item.price})%0A`;
    let priceNumber = parseInt(item.price.replace(/\D/g, '')) * 1000;
    total += priceNumber * item.quantity;
  });
  pesan += `%0ATotal: Rp ${formatRupiah(total)}`;
  pesan += `%0A%0ASaya akan transfer ke rekening: 1890924882 (BNI a.n. SISKA SUPARMI)`;

  window.open(`https://wa.me/6288218871566?text=${pesan}`, '_blank');
}

function formatRupiah(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Saat halaman dimuat, tampilkan cart
document.addEventListener('DOMContentLoaded', updateCartUI);

// Toggle buka/tutup keranjang saat tombol shopping cart diklik
document.querySelector('#shopping-cart-button').addEventListener('click', function(e){
  e.preventDefault();
  document.querySelector('.shopping-cart').classList.toggle('active');
});

  

