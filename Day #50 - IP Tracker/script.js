// Select DOM elements and assign them to variables
const [ipInput, form, ipAddress, locationIP, timeZone, ISP] = ["#search", "form", "#ip-address", "#location", "#time-zone", "#isp"].map(selector => document.querySelector(selector));

// Initialize a Leaflet map with default settings
const map = L.map('map').setView([0, 0], 13).addLayer(L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}));

// Function to fetch IP information from API
const getIpInfo = async (ip) => {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) throw new Error("Filed to fetch IP Information.");
    return response.json();
};

// Function to render IP information on the page
const renderIpInfo = (data) => {
    [ipAddress, locationIP, timeZone, ISP].forEach((el, index) => {
        el.textContent = index === 0 ? data.ip : index === 1 ? `${data.city}, ${data.region} ${data.postal}` : index === 2 ? `UTC${data.utc_offset}` : data.org;
    });
    const { latitude, longitude } = data;
    map.setView([latitude, longitude], 13).addLayer(L.marker([latitude, longitude]));
};

// Function to show an error alert
const showError = () => alert("Oops, Something went wrong. Please try again later!");

// Event listener for page load
window.addEventListener('load', async () => {
    try {
        // Fetch the user's IP using ipify API
        const userInfo = await fetch('https://api.ipify.org?format=json');
        if (!userInfo.ok) throw new Error("Filed to fetch user's IP address.");
        const { ip } = await userInfo.json();

        // Fetch and render IP information
        const ipInfoData = await getIpInfo(ip);
        renderIpInfo(ipInfoData);
    } catch {
        showError();
    }
});

// Event listener for form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const ipValue = ipInput.value;
    try {
        // Fetch and render IP info based on user input
        const ipInfoData = await getIpInfo(ipValue);
        renderIpInfo(ipInfoData);
    } catch {
        showError();
    }
});

// Event listener for Enter key press
ipInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        form.dispatchEvent(new Event("submit"));
    }
});