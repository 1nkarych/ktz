document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const fromInput = document.getElementById('station-from-input');
    const toInput = document.getElementById('station-to-input');
    const departureDate = document.getElementById('departure-date');
    const trainTypeFilter = document.getElementById('train-type-filter');
    const carriageFilter = document.getElementById('carriage-filter');
    const productsContainer = document.getElementById('products-container');
    const noResults = document.getElementById('no-results');

    const fetchProducts = async () => {
        const from = fromInput.value.trim();
        const to = toInput.value.trim();
        const category = carriageFilter.value;
        const trainType = trainTypeFilter.value;
        const date = departureDate.value;

        let url = `/api/products/search?`;
        if (from) url += `from=${encodeURIComponent(from)}&`;
        if (to) url += `to=${encodeURIComponent(to)}&`;
        if (category) url += `category=${encodeURIComponent(category)}&`;
        if (trainType) url += `trainType=${encodeURIComponent(trainType)}&`;
        if (date) url += `date=${encodeURIComponent(date)}&`;
        url = url.replace(/&$/, '');

        try {
            const res = await fetch(url);
            const products = await res.json();
            renderProducts(products);
        } catch (err) {
            console.error('Search failed:', err);
            productsContainer.innerHTML = '<p>Error loading tickets. Please try again later.</p>';
        }
    };

    function renderProducts(products) {
        productsContainer.innerHTML = '';

        if (!products || products.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        products.forEach(item => {
            const card = document.createElement('div');
            card.className = 'train-card';
            card.innerHTML = `
                <div class="train-info">
                    <h3>${item.from || 'Unknown'} → ${item.to || 'Unknown'}</h3>
                    <p>Class: ${item.category || 'Standard'}</p>
                </div>
                <div class="train-duration">
                    <span>Price: ${item.price ? item.price.toLocaleString() : 'N/A'} KZT</span>
                </div>
                <div class="train-booking">
                    <button class="select-seats-btn">Book</button>
                </div>
            `;
            productsContainer.appendChild(card);
        });
    }

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fetchProducts();
    });

    fetchProducts();
});
