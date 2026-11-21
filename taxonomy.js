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
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("taxonomy-tree");

    if (!container) {
        console.error("ERROR: Cannot find element #taxonomy-tree");
        return;
    }

    const jsonPath = "online-json-editor.json";

    try {
        console.log("Attempting to load:", jsonPath);
        console.log("Page location:", window.location.href);

        const response = await fetch(jsonPath);

        console.log("HTTP status:", response.status);
        console.log("Response URL:", response.url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Could not find JSON file.`);
        }

        const data = await response.json();

        console.log("JSON successfully loaded:", data);

        if (!data || !Array.isArray(data.children)) {
            throw new Error("JSON structure is missing its children array.");
        }

        const customClassOrder = [
            "EUTARDIGRADA",
            "HETEROTARDIGRADA",
            "MESOTARDIGRADA"
        ];

        data.children.sort((a, b) => {
            const indexA = customClassOrder.indexOf(a.name.toUpperCase());
            const indexB = customClassOrder.indexOf(b.name.toUpperCase());

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;

            return a.name.localeCompare(b.name);
        });

        data.children.forEach(node => {
            container.appendChild(createTaxonNode(node));
        });

        console.log("Taxonomy successfully rendered!");

    } catch (error) {
        console.error("TAXONOMY LOADING ERROR:", error);
        container.textContent = `Error: ${error.message}`;
    }
});
