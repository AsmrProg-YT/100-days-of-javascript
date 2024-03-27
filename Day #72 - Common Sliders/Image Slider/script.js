const TOTAL_SLIDES = 4;
let currentIndex = 0;

const dots = document.querySelectorAll(".dots button");
const images = document.querySelectorAll(".images img");

function showSlide(index) {
    images.forEach(image => image.style.display = "none");
    dots.forEach(dot => dot.style.backgroundColor = "transparent");

    images[index].style.display = "block";
    dots[index].style.backgroundColor = "#000";
}

function gotoSlide(index) {
    currentIndex = (TOTAL_SLIDES + index) % TOTAL_SLIDES;
    showSlide(currentIndex);
}

function next() {
    gotoSlide(currentIndex + 1);
}

function prev() {
    gotoSlide(currentIndex - 1);
}

function dotClicked(index) {
    gotoSlide(index);
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => dotClicked(index));
});

showSlide(currentIndex);