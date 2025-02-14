// <!DOCTYPE html>
// <html lang="pt-br">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Barra de Progresso</title>
//     <link
//       rel="stylesheet"
//       href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.4/font/bootstrap-icons.css"
//     />
//     <link rel="stylesheet" href="style.css" />
//     <script src="script.js" defer></script>
// </head>
// <body>
//     <h1>Barra de Progresso</h1>
//     <div class="container">
//         <div class="progress-bar">
//             <div class="progress"></div>  (ok)
//         </div>
//         <div class="controls">
//             <button id="previous-btn">
//                 <i class="bi bi-arrow-left"></i>Voltar</button>
//             <button id="next-btn">Avançar<i class="bi bi-arrow-right"></i>
//             </button>
//         </div>
//     </div>
// </body>
// </html>
const progressBar = document.querySelector(".progress");
const previousBtn = document.querySelector("#previous-btn");
const nextBtn = document.querySelector("#next-btn");

let progress = 0;

function updateProgressBar(){
    progressBar.style.width = progress + "%";
}
// para avançar
function nextStep() {
    progress += 10; // progresso de 10 e 10 na barra de progresso
    if (progress > 100) progress = 100; // não tem como passar de 100%
    updateProgressBar();
}
    // para voltar
function previousStep() {
    progress -= 10; // progresso de 10 e 10 na barra de progresso
    if (progress < 0) progress = 0; // não tem como passar de 100%
    updateProgressBar();
}

// colocar evento no BOTÃO
nextBtn.addEventListener("click", nextStep);
previousBtn.addEventListener("click", previousStep);


