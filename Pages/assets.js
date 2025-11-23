// ===============================
// ASSET SEARCH + FILTER SYSTEM
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchbar");
    const typeSelect = document.getElementById("assetType");
    const cards = document.querySelectorAll(".asset-card");

    function filterAssets() {
        const text = searchInput.value.toLowerCase();
        const type = typeSelect.value;

        cards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const category = card.dataset.type;

            const matchText = name.includes(text);
            const matchType = type === "all" || category === type;

            if (matchText && matchType) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    }

    searchInput.addEventListener("input", filterAssets);
    typeSelect.addEventListener("change", filterAssets);
});
