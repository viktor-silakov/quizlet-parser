function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

function fetchQuizletCards() {
    const url = window.location.href;

    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const document = parser.parseFromString(html, "text/html");

            const cards = [];
            const cardElements = document.querySelectorAll(".SetPageTerm-content");

            cardElements.forEach(element => {
                const termElement = element.querySelector(".SetPageTerm-wordText");
                const definitionElement = element.querySelector(".SetPageTerm-definitionText");
                const term = termElement ? termElement.textContent.trim() : "";
                const definition = definitionElement ? definitionElement.textContent.trim() : "";

                cards.push({ term, definition });
            });

            return cards;
        })
        .then(cards => {
            const output = cards.map(card => `${card.term}##${card.definition}`).join("####");
            return output;
        })
        .catch(error => {
            console.error("Error fetching Quizlet cards:", error);
            return "";
        });
}

fetchQuizletCards()
    .then(output => {
        console.log(output);
        copyToClipboard(output);
    })
    .catch(error => {
        console.error("Error:", error);
    });
