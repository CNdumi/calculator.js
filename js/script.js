document.addEventListener("DOMContentLoaded", function() {
    const previousOperandTextElement = document.querySelector("[data-previous-operand]");
    const currentOperandTextElement = document.querySelector("[data-current-operand]");
    const numberButtons = document.querySelectorAll("[data-number]");
    const operationButtons = document.querySelectorAll("[data-operation]");
    const equalsButton = document.querySelector("[data-equals]");
    const deleteButton = document.querySelector("[data-delete]");
    const allClearButton = document.querySelector("[data-all-clear]");
  
    let currentOperand = "";
    let previousOperand = "";
    let operation = undefined;
  
    numberButtons.forEach(button => {
      button.addEventListener("click", () => {
        appendNumber(button.innerText);
        updateDisplay();
      });
    });
  
    operationButtons.forEach(button => {
      button.addEventListener("click", () => {
        selectOperation(button.innerText);
        updateDisplay();
      });
    });
  
    equalsButton.addEventListener("click", () => {
      compute();
      updateDisplay();
    });
  
    deleteButton.addEventListener("click", () => {
      deleteNumber();
      updateDisplay();
    });
  
    allClearButton.addEventListener("click", () => {
      clearCalculator();
      updateDisplay();
    });
  
    function appendNumber(number) {
      if (number === "." && currentOperand.includes(".")) return;
      currentOperand += number;
    }
  
    function selectOperation(op) {
      if (currentOperand === "") return;
      if (previousOperand !== "") {
        compute();
      }
      operation = op;
      previousOperand = currentOperand;
      currentOperand = "";
    }
  
    function compute() {
      let computation;
      const prev = parseFloat(previousOperand);
      const current = parseFloat(currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (operation) {
        case "+":
          computation = prev + current;
          break;
        case "-":
          computation = prev - current;
          break;
        case "*":
          computation = prev * current;
          break;
        case "/":
          computation = prev / current;
          break;
        default:
          return;
      }
      currentOperand = computation;
      operation = undefined;
      previousOperand = "";
    }
  
    function deleteNumber() {
      currentOperand = currentOperand.toString().slice(0, -1);
    }
  
    function clearCalculator() {
      currentOperand = "";
      previousOperand = "";
      operation = undefined;
    }
  
    function updateDisplay() {
      currentOperandTextElement.innerText = currentOperand;
      if (operation != null) {
        previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
      } else {
        previousOperandTextElement.innerText = "";
      }
    }
  });
  
