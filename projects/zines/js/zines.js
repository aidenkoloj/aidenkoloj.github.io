// zines/js/zines.js
const zineImages = [
    './fossil_hunting1.jpg',
    './fossil_hunting2.jpg',
    './fossil_hunting3.jpg',
    './fossil_hunting4.jpg',
    './fossil_hunting5.jpg'
];

let currentIndex = 0;

const zineImage = document.getElementById('zineImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const thumbnailsContainer = document.getElementById('thumbnails');

// Initialize
function init() {
    totalPagesSpan.textContent = zineImages.length;
    loadImage(0);
    //createThumbnails(); no thumbnails
}

function loadImage(index) {
    currentIndex = index;
    zineImage.src = zineImages[currentIndex];
    currentPageSpan.textContent = currentIndex + 1;
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === zineImages.length - 1;
    
    // Update thumbnail highlighting
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentIndex);
    });
}

function nextImage() {
    if (currentIndex < zineImages.length - 1) {
        loadImage(currentIndex + 1);
    }
}

function prevImage() {
    if (currentIndex > 0) {
        loadImage(currentIndex - 1);
    }
}

function createThumbnails() {
    zineImages.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail';
        if (index === 0) thumb.classList.add('active');
        
        const imgEl = document.createElement('img');
        imgEl.src = img;
        imgEl.alt = `Fossil Hunting Page ${index + 1}`;
        
        thumb.appendChild(imgEl);
        thumb.addEventListener('click', () => loadImage(index));
        
        thumbnailsContainer.appendChild(thumb);
    });
}

// Event listeners
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// Click on image to advance
zineImage.addEventListener('click', nextImage);

init();
