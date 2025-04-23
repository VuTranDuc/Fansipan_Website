let currentIndex = 0;
const packageItems = document.querySelector('.package-items');
const totalItems = document.querySelectorAll('.package-item').length;
const visibleItems = 3; // Hiển thị 3 gói

document.querySelector('.carousel-btn.right').addEventListener('click', () => {
    if (currentIndex < totalItems - visibleItems) {
        currentIndex++;
        updateCarousel();
    }
});

document.querySelector('.carousel-btn.left').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

function updateCarousel() {
    const itemWidth = document.querySelector('.package-item').clientWidth + 20; // 20 = margin
    packageItems.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

//QOL for mobile
const carouselInner = document.querySelector('.package-carousel-inner');
let isDragging = false, startX, scrollLeft;

carouselInner.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carouselInner.offsetLeft;
    scrollLeft = carouselInner.scrollLeft;
});

carouselInner.addEventListener('mouseleave', () => {
    isDragging = false;
});

carouselInner.addEventListener('mouseup', () => {
    isDragging = false;
});

carouselInner.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselInner.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    carouselInner.scrollLeft = scrollLeft - walk;
});

// Touch support for mobile
carouselInner.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carouselInner.offsetLeft;
    scrollLeft = carouselInner.scrollLeft;
});

carouselInner.addEventListener('touchend', () => {
    isDragging = false;
});

carouselInner.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselInner.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    carouselInner.scrollLeft = scrollLeft - walk;
});
