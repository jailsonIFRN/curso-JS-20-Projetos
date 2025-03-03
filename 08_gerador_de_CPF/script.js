/* <body>
    <div class="container">
        <h1>Gerador de CPF</h1>
        <div class="cpf-container">
            <p id="cpf"></p>
            <button id="gerar-cpf">Gerar CPF</button>
            <button id="copiar-cpf">Copiar CPF</button>
        </div>
    </div>
</body> */

// Seleciona o elemento HTML com o ID "cpf" e o armazena na constante cpfEl
// Esse elemento provavelmente exibirá o CPF gerado na página
const cpfEl = document.querySelector("#cpf");

// Seleciona o botão com o ID "gerar-cpf" e o armazena na constante gerarCpfBtn
// Esse botão será usado para gerar um novo CPF quando clicado
const gerarCpfBtn = document.querySelector("#gerar-cpf");

// Seleciona o botão com o ID "copiar-cpf" e o armazena na constante copiarCpfBtn
// Esse botão será usado para copiar o CPF gerado para a área de transferência
const copiarCpfBtn = document.querySelector("#copiar-cpf");


// Função para gerar CPF aleatório
// 999.999.999-99

// Função para gerar um CPF válido
function gerarCPF() {
    // Gera um número aleatório de 9 dígitos (de 1 até 999999999)
    let n = Math.floor(Math.random() * 999999999) + 1;

    // Converte o número para string e preenche com zeros à esquerda caso necessário, garantindo 9 dígitos
    let nStr = n.toString().padStart(9, "0");

    // Calcula o primeiro dígito verificador (DV1), usando peso 10
    let dv1 = calcularDV(nStr, 10);

    // Calcula o segundo dígito verificador (DV2), agora incluindo DV1 e usando peso 11
    let dv2 = calcularDV(nStr + dv1, 11);

    // Atualiza o elemento na página com o CPF formatado (XXX.XXX.XXX-XX)
    cpfEl.innerText = formatarCPF(nStr + dv1 + dv2);
}

// Função para calcular os dígitos verificadores (DV)
function calcularDV(numero, peso) {
    let total = 0; // Variável para armazenar a soma ponderada dos dígitos

    // Percorre cada caractere da string 'numero'
    for (let i = 0; i < numero.length; i++) {
        // Multiplica cada dígito pelo peso correspondente e soma ao total
        total += parseInt(numero.charAt(i)) * peso--;
    }

    // Calcula o resto da divisão da soma por 11
    let resto = total % 11;

    // Se o resto for menor que 2, o dígito verificador será 0; caso contrário, será 11 menos o resto
    return resto < 2 ? 0 : 11 - resto;
}

function formatarCPF(cpf) {
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cpf.replace(cpfRegex, "$1.$2.$3-$4");
  }

  function copiarCPF() {
    const cpf = cpfEl.innerText
    navigator.clipboard.writeText(cpf).then(
        () => {
            alert(`CPF ${cpf} copiado par a área de transferência.`);

        },
        (err) => {
            console.log("Erro ao copiar CPF.");
        }
    );
  };
  gerarCpfBtn.addEventListener("click", gerarCPF);
  copiarCpfBtn.addEventListener("click", copiarCPF);

