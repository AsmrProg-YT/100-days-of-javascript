function parseAndDisplayJson() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonObj = JSON.parse(jsonInput);
        document.getElementById('jsonViewer').innerHTML = '';
        buildTree(jsonObj, document.getElementById('jsonViewer'), 'root');
    } catch (e) {
        document.getElementById('jsonViewer').innerHTML = '<p style="color: red;">Invalid JSON</p>';
    }
}

function buildTree(obj, parentElement, key) {
    const item = document.createElement('div');
    parentElement.appendChild(item);

    if (typeof obj === 'object' && obj !== null) {
        const keySpan = document.createElement('span');
        keySpan.className = 'key collapsible';
        keySpan.textContent = key + ': ';
        item.appendChild(keySpan);

        const childContainer = document.createElement('div');
        childContainer.className = 'hidden ' + (Array.isArray(obj) ? 'array' : 'object');
        item.appendChild(childContainer);

        for (const childKey in obj) {
            buildTree(obj[childKey], childContainer, childKey);
        }

        keySpan.onclick = function (event) {
            event.stopPropagation();
            const childDiv = this.parentElement.querySelector('.hidden');
            if (childDiv.style.display === 'block') {
                childDiv.style.display = 'none';
                this.classList.remove('collapsed');
            } else {
                childDiv.style.display = 'block';
                this.classList.add('collapsed');
            }
        };
    } else {
        item.innerHTML = '<span class="key">' + key + ': </span>' + '<span class="' + getType(obj) + '">' + obj + '</span>';
    }
}

function getType(value) {
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object' && value !== null) return 'object';
    return 'unknown';
}

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
        const fileContent = event.target.result;
        document.getElementById('jsonInput').value = fileContent;
        parseAndDisplayJson();
    };
    reader.readAsText(file);
});