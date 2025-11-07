// Product data
const products = [
    {
        id: 1,
        title: "Zytra Infinity Sapphire Clover Bracelet",
        price: "Rs. 1899.00",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "bracelets",
        color: "silver",
        priceValue: 1899
    },
    {
        id: 2,
        title: "Betrieb Sapphire Clustered Bracelet",
        price: "Rs. 699.00",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "bracelets",
        color: "gold",
        priceValue: 699
    },
    {
        id: 3,
        title: "Zytra Gemstone Chain",
        price: "Rs. 1,999.00",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "necklaces",
        color: "gold",
        priceValue: 1999
    },
    {
        id: 4,
        title: "Mikhail Diamond Cuban Chain - 10mm",
        price: "Rs. 1,999.00",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "necklaces",
        color: "silver",
        priceValue: 1999
    },
    {
        id: 5,
        title: "Emerald Clover Earring",
        price: "Rs. 999.00",
        image: "https://images.unsplash.com/photo-1677913808716-2ad6065e69ee?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "earrings",
        color: "gold",
        priceValue: 999
    },
    {
        id: 6,
        title: "Peter Earring",
        price: "Rs. 999.00",
        image: "https://www.blingmafia.in/cdn/shop/files/IMG_8242.jpg?v=1751210858",
        category: "earrings",
        color: "silver",
        priceValue: 999
    }
];

// Function to render products
function renderProducts(productsToRender) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Initial render
renderProducts(products);

// Filter functionality
function applyFilters() {
    // Get selected filters
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.id.replace('category-', ''));
    
    const selectedPrice = document.querySelector('input[name="price"]:checked').id;
    const selectedSort = document.querySelector('input[name="sort"]:checked').id;
    
    // Filter products
    let filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategories.includes(product.category);
        let priceMatch = true;
        
        if (selectedPrice === 'price-under-1000') {
            priceMatch = product.priceValue < 1000;
        } else if (selectedPrice === 'price-1000-3000') {
            priceMatch = product.priceValue >= 2000 && product.priceValue <= 3000;
        } else if (selectedPrice === 'price-over-3000') {
            priceMatch = product.priceValue > 3000;
        }
        
        return categoryMatch && priceMatch;
    });
    
    // Sort products
    if (selectedSort === 'sort-price-low') {
        filteredProducts.sort((a, b) => a.priceValue - b.priceValue);
    } else if (selectedSort === 'sort-price-high') {
        filteredProducts.sort((a, b) => b.priceValue - a.priceValue);
    } else if (selectedSort === 'sort-newest') {
        filteredProducts.reverse(); // Simple example - would use actual dates in real app
    }
    
    renderProducts(filteredProducts);
}

// Event listeners for filters
document.querySelectorAll('.sidebar input').forEach(input => {
    input.addEventListener('change', applyFilters);
});

// Mobile filter toggle
const openFiltersBtn = document.getElementById('open-filters');
const closeFiltersBtn = document.getElementById('close-filters');
const sidebar = document.getElementById('sidebar');

if (openFiltersBtn && closeFiltersBtn && sidebar) {
    openFiltersBtn.addEventListener('click', () => {
        sidebar.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    closeFiltersBtn.addEventListener('click', () => {
        sidebar.style.display = 'none';
        document.body.style.overflow = '';
    });
}

// Sync select dropdown with radio buttons
const sortSelect = document.querySelector('.sort-options select');
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value.toLowerCase();
        let sortId = 'sort-default';
        
        if (selectedValue.includes('low to high')) sortId = 'sort-price-low';
        else if (selectedValue.includes('high to low')) sortId = 'sort-price-high';
        else if (selectedValue.includes('best selling')) sortId = 'sort-best-selling';
        else if (selectedValue.includes('newest')) sortId = 'sort-newest';
        
        const sortRadio = document.getElementById(sortId);
        if (sortRadio) sortRadio.checked = true;
        applyFilters();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
});
