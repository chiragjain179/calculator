let string = "";
const display = document.querySelector('input');
const buttons = document.querySelectorAll('.button');
const operators = ['+', '-', 'x', '/'];

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonText = e.target.innerHTML.trim();

        if (buttonText === '=') {
            if (string === "") return;
            try {
                string = String(eval(string));
                display.value = string;
            } catch (error) {
                display.value = "Error";
                string = "";
            }
        }
        else if (buttonText === 'C') {
            string = "";
            display.value = "";
        }
        else {
            // Prevent starting expression with an operator (except '-' for negatives)
            if (string === "" && operators.includes(buttonText) && buttonText !== '-') return;

            // Prevent consecutive operators
            const lastChar = string.slice(-1);
            if (operators.includes(lastChar) && operators.includes(buttonText)) {
                string = string.slice(0, -1) + buttonText;
                display.value = string;
                return;
            }

            // Prevent multiple decimals in the same number
            if (buttonText === '.') {
                const parts = string.split(/[\+\-\x\/]/);
                const lastPart = parts[parts.length - 1];
                if (lastPart.includes('.')) return;
            }

            string += buttonText;
            display.value = string;
        }
    });
});
