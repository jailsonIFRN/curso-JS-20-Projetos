// Selecionar os elementos
const form = document.querySelector("form");
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const assunto = document.querySelector("#assunto");
const mensagem = document.querySelector("#mensagem"); // Corrigido
const errorMessages = document.querySelectorAll(".error-message"); // Corrigido

// Impedir envio tradicional do formulário
form.addEventListener("submit", (event) => {
    event.preventDefault();
    resetErrors();
    validateInput();
});

// Função para definir erro
function setError(input, errorMessage) {
    const errorMessageElement = input.nextElementSibling;
    errorMessageElement.textContent = errorMessage;
    input.parentElement.classList.add("error");
}

// Função para resetar os erros
function resetErrors() {
    errorMessages.forEach((msg) => { // Corrigido
        msg.textContent = "";
    });

    nome.parentElement.classList.remove("error");
    email.parentElement.classList.remove("error");
    assunto.parentElement.classList.remove("error");
    mensagem.parentElement.classList.remove("error");
}

// Função para validar os inputs
function validateInput() {
    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const assuntoValue = assunto.value.trim();
    const mensagemValue = mensagem.value.trim();

    if (nomeValue === "") {
        setError(nome, "Nome não pode ficar em branco");
    }

    if (emailValue === "") {
        setError(email, "E-mail não pode ficar em branco");
    } else if (!isValidEmail(emailValue)) { // Corrigido
        setError(email, "E-mail inválido");
    }

    if (assuntoValue === "") {
        setError(assunto, "Assunto não pode ficar em branco");
    }

    if (mensagemValue === "") {
        setError(mensagem, "Mensagem não pode ficar em branco");
    }
}

// Função para validar e-mail
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
