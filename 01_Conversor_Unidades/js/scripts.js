// Selecionar os elementos ou incapsular todos os elementos
const inputElement = document.querySelector("#input");
const fromElement = document.querySelector("#from");
const toElement = document.querySelector("#to");
const outputElement = document.querySelector("#output"); // Corrigido para um ID
const convertButton = document.querySelector("#convert-btn");
const messageElement = document.querySelector("#message");

// Função para converter as unidades
function convert() {
    const fromValue = fromElement.value;
    const toValue = toElement.value;

    // validação e Verificação se as unidades são iguais
    if (fromValue === toValue) {
        outputElement.textContent = inputElement.value; // Corrigido o uso de .textContent
        messageElement.textContent = "";
        return;
    }
    // converter a entrada para metros
    let meters;
    switch(fromValue) {
        case "m":
            meters = inputElement.value;
            break;
        case "Km":
            meters = inputElement.value * 1000;
            break;
        case "cm":
            meters = inputElement.value / 100;
            break;
        case "mm":
            meters = inputElement.value / 1000;
            break;
    }

    // Converter metros para unidade de saída
    let result;
    switch(toValue) {
        case "m":
            result = meters;
            break;
        case "Km":
            result = meters / 1000;
            break;
        case "cm":
            result = meters * 100;
            break;
        case "mm":
            result = meters * 1000;
            break;
}
// Exibir resultado no input
outputElement.value = result;

// Exibir resultado na mensagem
const formLabel = fromElement.options[fromElement.selectedIndex].text
const toLabel = toElement.options[toElement.selectedIndex].text

const message = `${inputElement.value} ${formLabel} É IGUAL A: ${result} ${toLabel}`;
messageElement.textContent = message;
return;

}

// Adiciona o evento de clique ao botão
convertButton.addEventListener("click", convert);
