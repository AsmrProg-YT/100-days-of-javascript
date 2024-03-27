const slides = [
    {
        name: "John Doe",
        job: "Frontend Coder",
        image: "assets/profile-1.png",
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque veritatis officiis distinctio, cupiditate dolores vitae accusantium ex asperiores natus, deleniti aliquam. Error, vitae a eum assumenda minima dicta necessitatibus odit?"
    },
    {
        name: "Sarah H",
        job: "Backend Coder",
        image: "assets/profile-2.png",
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque veritatis officiis distinctio, cupiditate dolores vitae accusantium ex asperiores natus, deleniti aliquam. Error, vitae a eum assumenda minima dicta necessitatibus odit?"
    },
];

const sliderContainer = document.querySelector(".slider");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentSlideIndex = 0;
const totalSlides = slides.length;

const displaySlides = () => {
    if (sliderContainer && nextBtn && prevBtn) {
        sliderContainer.style.opacity = 0;
        setTimeout(() => {
            const { name, job, image, info } = slides[currentSlideIndex];
            sliderContainer.innerHTML = `
            <div class="profile">
                <img src="${image}">
                <h3>${name}</h3>
                <h6>${job}</h6>
            </div>
            <p>${info}</p>
            `;
            sliderContainer.style.opacity = 1;
        }, 300);
    }
};

nextBtn.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    displaySlides();
});

prevBtn.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    displaySlides();
});

window.onload = displaySlides;