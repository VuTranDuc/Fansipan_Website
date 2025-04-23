let index = 0;
    const slides = document.querySelector(".slides");

function showSlide(i) {
    index = (i + 3) % 3; /* index luon trong khoang 0-2 */
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

setInterval(nextSlide, 6000);
