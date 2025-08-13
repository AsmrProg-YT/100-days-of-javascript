document.addEventListener('DOMContentLoaded', () => {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    const languageSelect = document.getElementById('language');
    const resultContainer = document.querySelector('.result p.resultText');
    const startListeningButton = document.querySelector('.btn.record');
    const recordButtonText = document.querySelector('.btn.record p');
    const clearButton = document.querySelector('.btn.clear');
    const downloadButton = document.querySelector('.btn.download');

    let recognizing = false;

    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.code;
        option.text = language.name;
        languageSelect.add(option);
    });

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageSelect.value;

    languageSelect.addEventListener('change', () => {
        recognition.lang = languageSelect.value;
    });

    startListeningButton.addEventListener('click', toggleSpeechRecognition);

    clearButton.addEventListener('click', clearResults);

    downloadButton.disabled = true;

    recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        resultContainer.textContent = result;
        downloadButton.disabled = false;
    };

    recognition.onend = () => {
        recognizing = false;
        startListeningButton.classList.remove('recording');
        recordButtonText.textContent = 'Start Listening';
    };

    downloadButton.addEventListener('click', downloadResult);

    function toggleSpeechRecognition() {
        if (recognizing) {
            recognition.stop();
        } else {
            recognition.start();
        }

        recognizing = !recognizing;
        startListeningButton.classList.toggle('recording', recognizing);
        recordButtonText.textContent = 'Stop Listening';
    }

    function clearResults() {
        resultContainer.textContent = '';
        downloadButton.disabled = true;
    }

    function downloadResult() {
        const resultText = resultContainer.textContent;

        const blob = new Blob([resultText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Your-Text.txt';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

});