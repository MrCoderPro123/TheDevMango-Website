// ===============================
// ASSET SEARCH + FILTER SYSTEM
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchbar");
    const typeSelect = document.getElementById("assetType");
    const cards = document.querySelectorAll(".asset-card");
    const cardWrappers = document.querySelectorAll(".asset-card-wrapper");
    const assetsGrid = document.getElementById("assetsGrid");
    const noResults = document.getElementById("noResults");
    const visibleCount = document.getElementById("visibleCount");
    const totalCount = document.getElementById("totalCount");
    const backToTopBtn = document.getElementById("backToTop");

    // Set total count
    totalCount.textContent = cards.length;

    function filterAssets() {
        const text = searchInput.value.toLowerCase();
        const type = typeSelect.value;
        let visible = 0;

        cardWrappers.forEach(wrapper => {
            const card = wrapper.querySelector(".asset-card");
            const name = card.dataset.name.toLowerCase();
            const category = card.dataset.category || card.dataset.type;

            const matchText = name.includes(text);
            const matchType = type === "all" || category === type || card.dataset.type === type;

            if (matchText && matchType) {
                wrapper.classList.remove("hidden");
                visible++;
            } else {
                wrapper.classList.add("hidden");
            }
        });

        // Update results count
        visibleCount.textContent = visible;

        // Show/hide no results message
        if (visible === 0) {
            noResults.classList.remove("hidden");
            assetsGrid.classList.add("hidden");
        } else {
            noResults.classList.add("hidden");
            assetsGrid.classList.remove("hidden");
        }
    }

    // Enhanced search with debounce
    let searchTimeout;
    searchInput.addEventListener("input", () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterAssets, 300);
    });

    typeSelect.addEventListener("change", filterAssets);

    // Initial filter
    filterAssets();

    // Back to top button
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, observerOptions);

    cardWrappers.forEach(wrapper => {
        wrapper.classList.add("fade-on-scroll");
        observer.observe(wrapper);
    });

    // Download tracking (optional - can be enhanced with analytics)
    document.querySelectorAll(".download-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.add("downloaded");
            setTimeout(() => {
                btn.classList.remove("downloaded");
            }, 1000);
        });
    });
});
