const apiKey = "YOUR_API_KEY";

const maxImages = 4; // Number of images to generate for each prompt
let selectedImageNumber = null;

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to disable the generate button during processing
function disableGenerateButton() {
    document.getElementById("generate").disabled = true;
}

// Function to enable the generate button after process
function enableGenerateButton() {
    document.getElementById("generate").disabled = false;
}

// Function to clear image grid
function clearImageGrid() {
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
}

// Function to generate images
async function generateImages(input) {
    disableGenerateButton();
    clearImageGrid();

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const imageUrls = [];

    for (let i = 0; i < maxImages; i++) {
        // Generate a random number between 1 and 10000 and append it to the prompt
        const randomNumber = getRandomNumber(1, 10000);
        const prompt = `${input} ${randomNumber}`;
        // We added random number to prompt to create different results
        const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            alert("Failed to generate image!");
        }

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        imageUrls.push(imgUrl);

        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = `art-${i + 1}`;
        img.onclick = () => downloadImage(imgUrl, i);
        document.getElementById("image-grid").appendChild(img);
    }

    loading.style.display = "none";
    enableGenerateButton();

    selectedImageNumber = null; // Reset selected image number
}

document.getElementById("generate").addEventListener('click', () => {
    const input = document.getElementById("user-prompt").value;
    generateImages(input);
});

function downloadImage(imgUrl, imageNumber) {
    const link = document.createElement("a");
    link.href = imgUrl;
    // Set filename based on the selected image
    link.download = `image-${imageNumber + 1}.jpg`;
    link.click();
}