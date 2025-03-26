// Seleciona todos os elementos com a classe "number"
const numbers = document.querySelectorAll(".number");

// Seleciona o botão com o ID "generate"
const generateBtn = document.querySelector("#generate");

// Função para gerar números aleatórios
function generateNumbers() {
  const max = 60; // Define o número máximo (limite superior)
  const min = 1;  // Define o número mínimo (limite inferior)
  const result = []; // Array para armazenar os números gerados

  // Loop para gerar 6 números aleatórios únicos
  while (result.length < 6) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min; 
    // Gera um número aleatório entre min e max (inclusive)

    if (!result.includes(number)) { 
      // Verifica se o número já foi gerado para evitar repetições
      result.push(number); // Adiciona o número ao array caso seja único
    }
  }

  // Exibe os números gerados nos elementos da página
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].textContent = result[i]; // Atualiza o conteúdo dos elementos selecionados
  }
}

// Adiciona um evento de clique ao botão, chamando a função "generateNumbers" quando clicado
generateBtn.addEventListener("click", generateNumbers);
