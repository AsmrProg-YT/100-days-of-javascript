const blurInput = document.getElementById("blur");
const transparencyInput = document.getElementById("transparency");
const colorInput = document.getElementById("color");
const outlineInput = document.getElementById("outline");
const cssResult = document.getElementById("css-code");
const glassRec = document.querySelector(".glass-preview-rectangle");

// Set default values for the preview
blurInput.value = 1;
transparencyInput.value = 0.31;
colorInput.value = "#000";
outlineInput.value = 0;

// Initialize the glass preview with default values
updateGlassPreview();

// Add event listeners to the range sliders
blurInput.addEventListener('input', updateGlassPreview);
transparencyInput.addEventListener('input', updateGlassPreview);
outlineInput.addEventListener('input', updateGlassPreview);

// Add event listener to the color input (color picker)
colorInput.addEventListener('input', () => {
    updateGlassPreview();
    updateCSSCode();
});

function updateGlassPreview() {
    const blurValue = blurInput.value;
    const transparencyValue = transparencyInput.value;
    const colorValue = colorInput.value;
    const outlineValue = outlineInput.value;

    // Update the glass preview rectangle
    glassRec.style.backdropFilter = `blur(${blurValue}px)`;
    glassRec.style.backgroundColor = `rgba(${hexToRgb(colorValue)}, ${transparencyValue})`;
    glassRec.style.outline = `${outlineValue}px solid ${colorValue}`;

    updateCSSCode();
}

function updateCSSCode() {
    const blurValue = blurInput.value;
    const transparencyValue = transparencyInput.value;
    const colorValue = colorInput.value;
    const outlineValue = outlineInput.value;

    const cssCode = `background-color: rgba(${hexToRgb(colorValue)}, ${transparencyValue});\nbackdrop-filter: blur(${blurValue}px);\n-webkit-backdrop-filter: blur(${blurValue}px);\noutline: ${outlineValue}px solid ${colorValue};\nborder-radius: 10px;\nbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);`;

    // Display generated CSS code in the textarea
    cssResult.value = cssCode;
}

// Helper function to convert HEX to RGB
function hexToRgb(hex) {
    const shorthandRegax = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegax, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

// Add event listener to the "Copy To Clipboard" button
const copyButton = document.getElementById("copy-button");
copyButton.addEventListener('click', copyToClipboard);

function copyToClipboard() {
    const copyText = cssResult.value;
    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Change button text to indicate copying
    copyButton.textContent = "Copied!";

    // Reset button text after a short delay
    setTimeout(() => {
        copyButton.textContent = "Copy To Clipboard";
    }, 1000);
}