//Data menu
const menuData = [
  //Makanan
  {
    id: 1,
    name: "Nasi Goreng",
    description: "Nasi goreng,bumbu special,dan aneka toping basic",
    price: 25000,
    category: "makanan",
    image: "image/nasi-goreng.jpg",
  },
  {
    id: 2,
    name: "Mie Ayam",
    description: "Mie+ayam dengan perpaduan sempurna",
    price: 12000,
    category: "makanan",
    image: "image/mie-ayam.jpg",
  },
  {
    id: 3,
    name: "Bakso",
    description: "Soo Baksooo",
    price: 15000,
    category: "makanan",
    image: "image/bakso.jpg",
  },
  {
    id: 4,
    name: "Pecel Lele",
    description: "Salad enak dengan lauk ikan",
    price: 30000,
    category: "makanan",
    image: "image/pecel-lele.jpg",
  },

  // Minuman
  {
    id: 5,
    name: "Es teh",
    description: "Minuman sejuta umat,dengan harga terjangkau!",
    price: 5000,
    category: "minuman",
    image: "image/es-teh.jpg",
  },
  {
    id: 6,
    name: "Es Jeruk Nipis",
    description: "Minuman asam manis segar",
    price: 8000,
    category: "minuman",
    image: "image/es-jeruk.jpg",
  },
  {
    id: 7,
    name: "Red Valvet",
    description: "Merah merona segarkan dahaga",
    price: 22000,
    category: "minuman",
    image: "image/red-valvet.jpg",
  },
  {
    id: 8,
    name: "Kopi Susu",
    description: "Perpaduan nikmat Kopi dan susu",
    price: 15000,
    category: "minuman",
    image: "image/kopi-susu.jpg",
  },

  // Pencuci mulut
  {
    id: 9,
    name: "Pudding Jelly",
    description: "Kenyal-kenyal dan lembut manis dimulut",
    price: 27000,
    category: "dessert",
    image: "image/pudding-jelly.jpg",
  },
  {
    id: 10,
    name: "Kentang Goreng",
    description: "Cemilan cocok sambil nungguin hidangan lainnya",
    price: 17000,
    category: "dessert",
    image: "image/kentang-goreng.jpg",
  },
  {
    id: 11,
    name: "Pisang Coklat",
    description: "Cemilan enak dan manis sambilan santay",
    price: 18000,
    category: "dessert",
    image: "image/pisang-coklat.jpg",
  },
  {
    id: 12,
    name: "Nugget Sosis",
    description: "Cemilan terhangat untuk hidangan santay",
    price: 25000,
    category: "dessert",
    image: "image/sosis-nugget.jpg",
  },
];

// State filter aktif
let activeFilter = "all";
let searchTerm = "";

// Fungsi penampilan menu
function displayMenu(menuArray) {
  const menuGrid = document.getElementById("menuGrid");

  if (menuArray.length === 0) {
    menuGrid.innerHTML =
      '<p class="no-menu"> Tidak ada menu yang akan ditampilkan</p>';
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

// Fungsi untuk filter menu tergantung kategorinya
function filterMenu(category) {
  activeFilter = category;

  // Update tombol aktifasi
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // FIlter daftar
  filterAndSearchMenu();
}

// fungsi searchmenu
function searchMenu() {
  searchTerm = document.getElementById("searchInput").value.toLowerCase();
  filterAndSearchMenu();
}

// fungsi untuk menggabungkannya
function filterAndSearchMenu() {
  let filteredMenu = menuData;

  // filter bdsarkan kategori
  if (activeFilter !== "all") {
    filteredMenu = filteredMenu.filter(
      (item) => item.category === activeFilter,
    );
  }

  // Filter Searchnya
  if (searchTerm !== "") {
    filteredMenu = filteredMenu.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm),
    );
  }

  displayMenu(filteredMenu);
}

// fungsi scrrol menu
function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// fungsi menu mobile
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.classList.toggle("active");
}

// Listener mobile menu
document
  .querySelector(".hamburger")
  .addEventListener("click", toggleMobileMenu);

// Tutup mobile menunya ketika diklik
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-menu").classList.remove("active");
  });
});

// smooth scroll untuk navigasi link
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

// NavBar untuk efek scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(243, 22, 22, 0.95)";
    navbar.style.boxShadow = "0 2px 10px rgba(13, 239, 247, 0.96)";
  } else {
    navbar.style.backgroundColor = "#855814";
    navbar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  }
});

// initialize menu ketika halaman baru dibuat
document.addEventListener("DOMContentLoaded", () => {
  displayMenu(menuData);

  // animasi memudar masuk untuk menu card
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
