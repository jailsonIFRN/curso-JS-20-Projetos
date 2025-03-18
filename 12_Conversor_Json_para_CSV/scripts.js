// Seleciona o formulário de conversão pelo ID
const converterForm = document.querySelector("#converterForm");

// Seleciona o campo de entrada de dados pelo ID
const converterInput = document.querySelector("#converterInput");

// Seleciona o botão de conversão de JSON para CSV
const jsonToCsvButton = document.querySelector("#jsonToCsvButton");

// Seleciona o botão de conversão de CSV para JSON
const csvToJsonButton = document.querySelector("#csvToJsonButton");

/**
 * Converte um array de objetos JSON para CSV.
 * @param {Array} json - Array de objetos JSON.
 * @returns {string} - String formatada em CSV.
 */
function jsonToCsv(json) {
  // Obtém os nomes das colunas a partir das chaves do primeiro objeto
  const headers = Object.keys(json[0]);
  const csvRows = [];

  // Adiciona os cabeçalhos à primeira linha do CSV
  csvRows.push(headers.join(","));

  // Percorre cada objeto JSON e converte para formato CSV
  for (const row of json) {
    const values = headers.map((header) => {
      let value = row[header];

      // Substitui valores nulos ou indefinidos por string vazia
      if (value === null || value === undefined) {
        value = "";
      } 
      // Converte objetos para string JSON
      else if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      return value;
    });

    // Adiciona a linha formatada ao array de linhas CSV
    csvRows.push(values.join(","));
  }

  // Retorna o CSV final como uma string única separada por quebras de linha
  return csvRows.join("\n");
}

/**
 * Converte uma string CSV para um array de objetos JSON.
 * @param {string} csv - String formatada em CSV.
 * @returns {Array} - Array de objetos JSON.
 */
function csvToJson(csv) {
  // Divide o CSV em linhas
  const lines = csv.split("\n");

  // Obtém os cabeçalhos a partir da primeira linha do CSV
  const headers = lines[0].split(",");
  const json = [];

  // Remove qualquer JSON previamente exibido na tela
  const preTags = document.querySelectorAll("pre");
  preTags.forEach((tag) => {
    tag.remove();
  });

  // Percorre as linhas do CSV (ignorando o cabeçalho)
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const row = {};

    // Associa os valores das colunas às chaves do cabeçalho
    for (let j = 0; j < headers.length; j++) {
      let value = values[j];

      // Tenta converter strings JSON válidas em objetos/arrays
      if (value[0] === "{" || value[0] === "[") {
        value = JSON.parse(value);
      }

      row[headers[j]] = value;
    }

    // Adiciona o objeto JSON ao array final
    json.push(row);
  }

  return json;
}

// Adiciona um evento de clique ao botão de conversão de JSON para CSV
jsonToCsvButton.addEventListener("click", function () {
  // Converte a string JSON do input para um array de objetos
  const json = JSON.parse(converterInput.value.trim());

  // Converte o JSON para CSV
  const csv = jsonToCsv(json);

  // Faz o download do CSV gerado
  downloadCsv(csv);
});

// Adiciona um evento de clique ao botão de conversão de CSV para JSON
csvToJsonButton.addEventListener("click", function () {
  // Obtém a string CSV do input
  const csv = converterInput.value.trim();

  // Converte o CSV para JSON
  const json = csvToJson(csv);

  // Exibe o JSON convertido na tela
  displayJson(json);
});

/**
 * Cria um link de download para o arquivo CSV gerado.
 * @param {string} csv - String formatada em CSV.
 */
function downloadCsv(csv) {
  // Cria um elemento <a> para o download
  const downloadLink = document.createElement("a");

  // Define o conteúdo do arquivo com encoding UTF-8
  downloadLink.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
  );

  // Define o nome do arquivo para download
  downloadLink.setAttribute("download", "data.csv");

  // Oculta o link da interface
  downloadLink.style.display = "none";

  // Adiciona o link ao corpo da página, aciona o clique e remove
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

/**
 * Exibe o JSON convertido na tela dentro de uma tag <pre>.
 * @param {Array} json - Array de objetos JSON.
 */
function displayJson(json) {
  // Cria um elemento <pre> para exibição do JSON formatado
  const resultArea = document.createElement("pre");

  // Converte o JSON em string formatada e adiciona ao elemento
  resultArea.textContent = JSON.stringify(json, null, 2);

  // Adiciona o elemento ao corpo da página
  document.body.appendChild(resultArea);
}
