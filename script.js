// Data menu
const menuData = [
  // Makanan
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan telur, ayam suwir, dan sayuran segar",
    price: 35000,
    category: "makanan",
    image: "https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Nasi+Goreng",
  },
  {
    id: 2,
    name: "Mie Goreng Jawa",
    description: "Mie goreng dengan bumbu khas Jawa, telur, dan bakso",
    price: 30000,
    category: "makanan",
    image: "https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Mie+Goreng",
  },
  {
    id: 3,
    name: "Ayam Bakar",
    description:
      "Ayam bakar dengan bumbu rempah pilihan, disajikan dengan sambal",
    price: 45000,
    category: "makanan",
    image: "https://via.placeholder.com/300x200/45b7d1/ffffff?text=Ayam+Bakar",
  },
  {
    id: 4,
    name: "Sate Ayam",
    description: "Sate ayam dengan bumbu kacang spesial dan lontong",
    price: 40000,
    category: "makanan",
    image: "https://via.placeholder.com/300x200/96ceb4/ffffff?text=Sate+Ayam",
  },

  // Minuman
  {
    id: 5,
    name: "Es Teh Manis",
    description: "Teh manis dingin dengan es batu, kesegaran dalam gelas",
    price: 8000,
    category: "minuman",
    image: "https://via.placeholder.com/300x200/ffeead/ffffff?text=Es+Teh",
  },
  {
    id: 6,
    name: "Jus Alpukat",
    description: "Jus alpukat segar dengan susu coklat",
    price: 18000,
    category: "minuman",
    image: "https://via.placeholder.com/300x200/ffcc5c/ffffff?text=Jus+Alpukat",
  },
  {
    id: 7,
    name: "Kopi Susu",
    description: "Kopi susu dengan rasa yang kuat dan creamy",
    price: 15000,
    category: "minuman",
    image: "https://via.placeholder.com/300x200/ff6f69/ffffff?text=Kopi+Susu",
  },
  {
    id: 8,
    name: "Es Kelapa Muda",
    description: "Kelapa muda segar dengan daging kelapa",
    price: 20000,
    category: "minuman",
    image: "https://via.placeholder.com/300x200/88d8b0/ffffff?text=Es+Kelapa",
  },

  // Dessert
  {
    id: 9,
    name: "Pisang Goreng",
    description: "Pisang goreng crispy dengan topping keju dan coklat",
    price: 15000,
    category: "dessert",
    image:
      "https://via.placeholder.com/300x200/ffb347/ffffff?text=Pisang+Goreng",
  },
  {
    id: 10,
    name: "Es Campur",
    description: "Es campur dengan berbagai buah dan topping",
    price: 20000,
    category: "dessert",
    image: "https://via.placeholder.com/300x200/ffaaa5/ffffff?text=Es+Campur",
  },
  {
    id: 11,
    name: "Puding Coklat",
    description: "Puding coklat lembut dengan saus vanila",
    price: 12000,
    category: "dessert",
    image: "https://via.placeholder.com/300x200/a8e6cf/ffffff?text=Puding",
  },
  {
    id: 12,
    name: "Bubur Ketan Hitam",
    description: "Bubur ketan hitam dengan santan kental",
    price: 15000,
    category: "dessert",
    image: "https://via.placeholder.com/300x200/d4a5a5/ffffff?text=Ketan+Hitam",
  },
];

// State untuk filter aktif
let activeFilter = "all";
let searchTerm = "";

// Fungsi untuk menampilkan menu
function displayMenu(menuArray) {
  const menuGrid = document.getElementById("menuGrid");

  if (menuArray.length === 0) {
    menuGrid.innerHTML = '<p class="no-menu">Tidak ada menu yang ditemukan</p>';
    return;
  }

  menuGrid.innerHTML = menuArray
    .map(
      (item) => `
        <div class="menu-card">
            <div class="menu-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p class="menu-description">${item.description}</p>
                <div class="menu-footer">
                    <span class="menu-price">Rp ${item.price.toLocaleString("id-ID")}</span>
                    <span class="menu-category">${item.category}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

// Fungsi untuk filter menu berdasarkan kategori
function filterMenu(category) {
  activeFilter = category;

  // Update active button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // Filter menu
  filterAndSearchMenu();
}

// Fungsi untuk search menu
function searchMenu() {
  searchTerm = document.getElementById("searchInput").value.toLowerCase();
  filterAndSearchMenu();
}

// Fungsi untuk menggabungkan filter dan search
function filterAndSearchMenu() {
  let filteredMenu = menuData;

  // Filter berdasarkan kategori
  if (activeFilter !== "all") {
    filteredMenu = filteredMenu.filter(
      (item) => item.category === activeFilter,
    );
  }

  // Filter berdasarkan search
  if (searchTerm !== "") {
    filteredMenu = filteredMenu.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm),
    );
  }

  displayMenu(filteredMenu);
}

// Fungsi untuk scroll ke menu
function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// Fungsi untuk mobile menu
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}

// Event listeners untuk mobile menu
document
  .querySelector(".hamburger")
  .addEventListener("click", toggleMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-menu").classList.remove("active");
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    navbar.style.backgroundColor = "#fff";
    navbar.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  }
});

// Initialize menu saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  displayMenu(menuData);

  // Animasi fade in untuk menu cards
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".menu-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s, transform 0.5s";
    observer.observe(card);
  });
});
