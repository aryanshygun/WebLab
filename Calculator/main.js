document.addEventListener("DOMContentLoaded", () => {
    const screen = document.getElementById("screen");
    let currentInput = "";
    let operator = "";
    let previousInput = "";

    // Update the screen display
    function updateScreen(value) {
        screen.textContent = value;
    }

    // Handle button clicks
    function handleButtonClick(value) {
        if (!isNaN(value)) {
            currentInput += value;
            updateScreen(currentInput);
        } else if (value === "AC") {
            currentInput = "";
            previousInput = "";
            operator = "";
            updateScreen("0");
        } else if (value === "=") {
            if (previousInput && operator && currentInput) {
                currentInput = calculate(previousInput, currentInput, operator);
                updateScreen(currentInput);
                operator = "";
                previousInput = "";
            }
        } else {
            if (currentInput !== "") {
                previousInput = currentInput;
                operator = value;
                currentInput = "";
            }
        }
    }

    // Perform the calculation
    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case "+": return (num1 + num2).toString();
            case "-": return (num1 - num2).toString();
            case "X": return (num1 * num2).toString();
            case "÷": return num2 !== 0 ? (num1 / num2).toString() : "Error";
            default: return "Error";
        }
    }

    // Add event listeners to buttons
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => handleButtonClick(button.textContent));
    });
});