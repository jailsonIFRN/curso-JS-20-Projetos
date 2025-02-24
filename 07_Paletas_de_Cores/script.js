const generateButton = document.querySelector("#generate-button");
const colorsDiv = document.querySelector(".colors");

function generateColors() {
    colorsDiv.innerHTML = "" // innerHTML é uma propriedade do JavaScript usada para manipular o conteúdo HTML de um elemento. Ela permite ler 
    // ou alterar o HTML interno de um elemento no DOM (Document Object Model).

    for(let i = 0; i < 5; i++) {
        const color = generateRandomColor();
        const colorDiv = document.createElement("div");
        colorDiv.style.backgroundColor = color;
        const colorName = document.createElement("p");
        colorName.textContent = color; // cor dos quadrados
        colorName.style.color = color; // cor das letras
        colorDiv.appendChild(colorName);
        colorsDiv.appendChild(colorDiv);
            

    }
}

// gerar uma nova função para gerar as cores aleatória
function generateRandomColor() {
    const letters = "0123456789ABCDEF" // PADRÃO CORES HEXADECIMAL: 16 DIGITOS
    let color = "#"

    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

generateButton.addEventListener("click", generateColors);