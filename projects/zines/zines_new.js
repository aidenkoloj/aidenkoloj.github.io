// zines/js/zines.js

// Add new zines here — just give a title and list the page images in order.
const zines = [
    {
        title: 'Fossil Hunting',
        images: [
            './fossil_hunting1.jpg',
            './fossil_hunting2.jpg',
            './fossil_hunting3.jpg',
            './fossil_hunting4.jpg',
            './fossil_hunting5.jpg'
        ]
    },
    {
        title: 'Scuttling Across America',
        images: [
            './biketrip1.jpg',
            './biketrip2.jpg',
            './biketrip3.jpg',
            './biketrip4.jpg',
            './biketrip5.jpg'
        ]
    },
    {
        title: 'Bhāvanā',
        images: [
            './ap1.png',
            './ap2.png',
            './ap3.png',
            './ap4.png',
            './ap5.png'
        ]
    },
    {
        title: 'Fluttering through Appalachia',
        images: [
            './bfly1.png',
            './bfly2.png',
            './bfly3.png',
            './bfly4.png',
            './bfly5.png'
        ]
    },
    {
        title: 'Genes',
        images: [
            './gene1.png',
            './gene2.png',
            './gene3.png',
            './gene4.png',
            './gene5.png'
        ]
    }
    
];

let currentZine = null;
let currentIndex = 0;

const selectorView = document.getElementById('selectorView');
const viewerView = document.getElementById('viewerView');
const zineSelect = document.getElementById('zineSelect');
const backToSelect = document.getElementById('backToSelect');

const zineTitle = document.getElementById('zineTitle');
const zineImage = document.getElementById('zineImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');

// Build the selection grid
function init() {
    zines.forEach((zine) => {
        const card = document.createElement('div');
        card.className = 'zine-select-card';

        const cover = document.createElement('img');
        cover.className = 'zine-select-cover';
        cover.src = zine.images[0];
        cover.alt = zine.title;

        const title = document.createElement('div');
        title.className = 'zine-select-title';
        title.textContent = zine.title;

        card.appendChild(cover);
        card.appendChild(title);
        card.addEventListener('click', () => openZine(zine));

        zineSelect.appendChild(card);
    });
}

function openZine(zine) {
    currentZine = zine;
    zineTitle.textContent = zine.title;
    totalPagesSpan.textContent = zine.images.length;

    selectorView.hidden = true;
    viewerView.hidden = false;

    loadImage(0);
}

function closeZine() {
    currentZine = null;
    viewerView.hidden = true;
    selectorView.hidden = false;
}

function loadImage(index) {
    currentIndex = index;
    zineImage.src = currentZine.images[currentIndex];
    currentPageSpan.textContent = currentIndex + 1;

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === currentZine.images.length - 1;
}

function nextImage() {
    if (currentZine && currentIndex < currentZine.images.length - 1) {
        loadImage(currentIndex + 1);
    }
}

function prevImage() {
    if (currentZine && currentIndex > 0) {
        loadImage(currentIndex - 1);
    }
}

// Event listeners
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

backToSelect.addEventListener('click', (e) => {
    e.preventDefault();
    closeZine();
});

// Keyboard navigation (only while viewing a zine)
document.addEventListener('keydown', (e) => {
    if (!currentZine) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeZine();
});

// Click on image to advance
zineImage.addEventListener('click', nextImage);

init();
