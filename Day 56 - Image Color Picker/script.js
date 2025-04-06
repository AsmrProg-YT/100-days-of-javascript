const pickBtn = document.getElementById("pick-btn");
const fileInput = document.getElementById("file");
const image = document.getElementById("image");
const hexInput = document.getElementById("hex-input");
const rgbInput = document.getElementById("rgb-input");
const pickedColor = document.getElementById("picked-color");

// Initialize Eyedropper if supported
const initEyeDropper = () => {
    if ("EyeDropper" in window) {
        pickBtn.classList.remove("hide");
        const eyeDropper = new EyeDropper();
        // Event listener for color selection
        pickBtn.addEventListener("click", async () => {
            try {
                const colorValue = await eyeDropper.open();
                // Convert colorValue.sRGBHex to lowercase to ensure propper parsing
                const hexValue = colorValue.sRGBHex.toLowerCase();
                const rgbValue = hexToRgb(hexValue);
                result.style.display = "grid";
                hexInput.value = hexValue;
                rgbInput.value = rgbValue;
                pickedColor.style.backgroundColor = hexValue;
            } catch {
                alert("Your browser doesn't support Eyedropper Api!");
            }
        });
    } else {
        alert("Your browser doesn't support Eyedropper Api!");
    }
};

// Event listener for file input
fileInput.addEventListener("change", () => {
    result.style.display = "none";
    const reader = new FileReader();
    reader.onload = () => image.setAttribute("src", reader.result);
    reader.readAsDataURL(fileInput.files[0]);
});

// Function to copy text to clipboard
const copyToClipboard = (textId) => {
    const textElement = document.getElementById(textId);
    textElement.select();
    document.execCommand("copy");
};

// RGB conversion function
const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
};

// Initialize Eyedropper
window.onload = initEyeDropper;