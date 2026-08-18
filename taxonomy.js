/**
 * Recursively counts the total number of species under a given node.
 */
function getSpeciesCount(node) {
    if (node.rank === "species") {
        return 1;
    }
    if (!node.children || node.children.length === 0) {
        return 0;
    }
    return node.children.reduce((total, child) => total + getSpeciesCount(child), 0);
}

/**
 * Builds HTML elements recursively for each taxonomy node.
 */
function createTaxonNode(node) {
    const taxonDiv = document.createElement("div");
    taxonDiv.className = "taxon";

    // 1. SPECIES NODE (Leaf node)
    if (node.rank === "species") {
        const rankSpan = document.createElement("span");
        rankSpan.className = "rank-label";
        rankSpan.textContent = "species: ";

        const link = document.createElement("a");
        link.className = "species-link";
        link.href = node.file || "#";
        link.innerHTML = `<i>${node.name}</i>`;

        taxonDiv.appendChild(rankSpan);
        taxonDiv.appendChild(link);

        if (node.authority) {
            const authoritySpan = document.createElement("span");
            authoritySpan.className = "authority";
            authoritySpan.textContent = ` ${node.authority}`;
            taxonDiv.appendChild(authoritySpan);
        }

        return taxonDiv;
    }

    // 2. HIGHER TAXA NODE (Class, Order, Family, Genus, etc.)
    const button = document.createElement("button");
    button.className = "taxon-button";
    button.onclick = function () {
        toggleTaxon(this);
    };

    const hasChildren = node.children && node.children.length > 0;
    const count = getSpeciesCount(node);

    // Arrow indicator
    const arrowSpan = document.createElement("span");
    arrowSpan.className = "arrow";
    arrowSpan.textContent = "▶";
    button.appendChild(arrowSpan);

    // Rank Label
    const rankSpan = document.createElement("span");
    rankSpan.className = "rank-label";
    rankSpan.textContent = `${node.rank}: `;
    button.appendChild(rankSpan);

    // Name (either linked or simple text inside <i>)
    if (node.file) {
        const link = document.createElement("a");
        link.className = "species-link";
        link.href = node.file;
        link.innerHTML = `<i>${node.name}</i>`;
        // Stop button click event when clicking directly on the link
        link.onclick = (e) => e.stopPropagation();
        button.appendChild(link);
    } else {
        const nameElement = document.createElement("i");
        nameElement.textContent = node.name;
        button.appendChild(nameElement);
    }

    // Authority
    if (node.authority) {
        const authoritySpan = document.createElement("span");
        authoritySpan.className = "authority";
        authoritySpan.textContent = ` ${node.authority}`;
        button.appendChild(authoritySpan);
    }

    // Dynamic Species Count
    if (count > 0) {
        const countSpan = document.createElement("span");
        countSpan.className = "species-count";
        countSpan.textContent = ` • ${count} spp.`;
        button.appendChild(countSpan);
    }

    taxonDiv.appendChild(button);

    // Append child nodes if present
    if (hasChildren) {
        const childrenDiv = document.createElement("div");
        childrenDiv.className = "children";

        node.children.forEach((childNode) => {
            childrenDiv.appendChild(createTaxonNode(childNode));
        });

        taxonDiv.appendChild(childrenDiv);
    }

    return taxonDiv;
}

/**
 * Toggles expanding/collapsing of taxonomy branches.
 */
function toggleTaxon(button) {
    const children = button.nextElementSibling;
    const arrow = button.querySelector(".arrow");

    if (!children) return;

    if (children.classList.contains("open")) {
        children.classList.remove("open");
        arrow.textContent = "▶";
    } else {
        children.classList.add("open");
        arrow.textContent = "▼";
    }
}

/**
 * Loads JSON data and renders tree on page load.
 */
document.addEventListener("DOMContentLoaded", () => {
    fetch("data/taxonomy.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const container = document.getElementById("taxonomy-tree");
            if (!container) return;

            // If root has children (e.g. Class nodes under Phylum), render each top-level child
            if (data.children && data.children.length > 0) {
                data.children.forEach((topLevelNode) => {
                    container.appendChild(createTaxonNode(topLevelNode));
                });
            } else {
                container.appendChild(createTaxonNode(data));
            }
        })
        .catch((error) => {
            console.error("Error loading taxonomy JSON:", error);
            const container = document.getElementById("taxonomy-tree");
            if (container) {
                container.textContent = "Failed to load taxonomy data.";
            }
        });
});
