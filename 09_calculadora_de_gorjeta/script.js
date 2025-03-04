/* <body>
    <div class="calculator">
        <h2>Calculadora de gorjetas</h2>
        <label for="billAmount">Valor Total da conta:</label>
        <input type="number" id="billAmount" name="billAmount" placeholder="R$">
        <label for="serviceQuality">Qualidade de serviço: </label>
        <select name="serviceQuality" id="serviceQuality">
            <option value="0.1">Excelente - 10%</option>
            <option value="0.08">Ótimo - 8%</option>
            <option value="0.05">Bom - 5%</option>
            <option value="0.02">Ruim - 2%</option>

        </select>
        <button id="calculateBtn">Calcular Gorjeta</button>
        <div class="result">
            <label for="tipAmount">Valor da Gorjeta:</label>
            <input type="number" id="tipAmount" name="tipAmount" disabled/>
            <label for="totalAmount">Valor da Gorjeta:</label>
            <input type="number" id="totalAmount" name="totalAmount" disabled/>
        </div>
    </div>
</body> */

function calculateTip() {
    // Obter valor da conta e qualidade do serviço
    const billAmount = document.getElementById("billAmount").value;
    const serviceQuality = document.getElementById("serviceQuality").value;
  
    // Validar entrada
    if (billAmount === "" || serviceQuality == 0) {
      alert("Por favor, preencha os campos!");
      return;
    }
  
    // Calcular gorjeta e valor total
    const tipAmount = billAmount * serviceQuality;
    const totalAmount = parseFloat(billAmount) + parseFloat(tipAmount);
  
    // Exibir resultados
    document.getElementById("tipAmount").value = "R$" + tipAmount.toFixed(2);
    document.getElementById("totalAmount").value = "R$" + totalAmount.toFixed(2);
  }

