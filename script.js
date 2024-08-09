document.addEventListener("DOMContentLoaded", function () {
    const cardholderNameInput = document.getElementById('cardholder-name');
    const cardNumberInput = document.getElementById('card-number');
    const expMonthInput = document.getElementById('exp-month');
    const expYearInput = document.getElementById('exp-year');
    const cvcInput = document.getElementById('cvc');
    const form = document.getElementById('card-form');

    const cardNumberDisplay = document.querySelector('.card-number');
    const cardholderNameDisplay = document.querySelector('.cardholder-name');
    const cardExpiryDisplay = document.querySelector('.card-expiry');
    const cardCvcDisplay = document.querySelector('.card-cvc');

    const nameError = document.createElement('span');
    const numberError = document.createElement('span');
    const expiryError = document.createElement('span');
    const cvcError = document.createElement('span');

    nameError.className = "error";
    numberError.className = "error";
    expiryError.className = "error";
    cvcError.className = "error";

    cardholderNameInput.after(nameError);
    cardNumberInput.after(numberError);
    expYearInput.parentNode.after(expiryError);
    cvcInput.after(cvcError);

    // Update cardholder name
    cardholderNameInput.addEventListener('input', function () {
        const nameValue = cardholderNameInput.value;
        if (/^[A-Za-z\s]*$/.test(nameValue)) {
            cardholderNameDisplay.textContent = nameValue || 'JANE APPLESEED';
            nameError.textContent = "";
        } else {
            nameError.textContent = "Name can only contain letters and spaces";
        }
    });

    // Update card number
    cardNumberInput.addEventListener('input', function () {
        const numberValue = cardNumberInput.value.replace(/\s/g, '');
        if (/^\d*$/.test(numberValue)) {
            let formattedNumber = numberValue.match(/.{1,4}/g);
            cardNumberDisplay.textContent = formattedNumber ? formattedNumber.join(' ') : '0000 0000 0000 0000';
            numberError.textContent = "";
        } else {
            numberError.textContent = "Wrong format, numbers only";
        }
    });

    // Update expiry date
    function validateExpiry() {
        const month = expMonthInput.value;
        const year = expYearInput.value;
        if (/^\d{2}$/.test(month) && Number(month) >= 1 && Number(month) <= 12) {
            expiryError.textContent = "";
        } else {
            expiryError.textContent = "Invalid month";
        }
        if (/^\d{4}$/.test(year)) {
            expiryError.textContent = "";
        } else {
            expiryError.textContent = "Invalid year";
        }
        cardExpiryDisplay.textContent = `${month || '00'}/${year || '0000'}`;
    }

    expMonthInput.addEventListener('input', validateExpiry);
    expYearInput.addEventListener('input', validateExpiry);

    // Update CVC
    cvcInput.addEventListener('input', function () {
        const cvcValue = cvcInput.value;
        if (/^\d{3}$/.test(cvcValue)) {
            cardCvcDisplay.textContent = cvcValue;
            cvcError.textContent = "";
        } else {
            cvcError.textContent = "CVC must be 3 digits";
        }
    });

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let isValid = true;

        // Validate all fields
        if (cardholderNameInput.value === "" || !/^[A-Za-z\s]+$/.test(cardholderNameInput.value)) {
            nameError.textContent = "Please enter a valid name";
            isValid = false;
        }

        const numberValue = cardNumberInput.value.replace(/\s/g, '');
        if (numberValue.length !== 16 || !/^\d{16}$/.test(numberValue)) {
            numberError.textContent = "Please enter a valid card number";
            isValid = false;
        }

        const month = expMonthInput.value;
        const year = expYearInput.value;
        if (month === "" || year === "" || !/^\d{2}$/.test(month) || !/^\d{4}$/.test(year) || Number(month) < 1 || Number(month) > 12) {
            expiryError.textContent = "Please enter a valid expiry date";
            isValid = false;
        }

        const cvcValue = cvcInput.value;
        if (cvcValue.length !== 3 || !/^\d{3}$/.test(cvcValue)) {
            cvcError.textContent = "Please enter a valid CVC";
            isValid = false;
        }

        // If no errors, show thank you message
        if (isValid) {
            document.querySelector('.form-section').classList.add('hidden');
            document.querySelector('.thank-you').classList.remove('hidden');
        }
    });

    // Handle continue button
    document.getElementById('continue-button').addEventListener('click', function () {
        document.querySelector('.thank-you').classList.add('hidden');
        document.querySelector('.form-section').classList.remove('hidden');
        form.reset();
        cardholderNameDisplay.textContent = 'JANE APPLESEED';
        cardNumberDisplay.textContent = '0000 0000 0000 0000';
        cardExpiryDisplay.textContent = '00/00';
        cardCvcDisplay.textContent = '000';
    });
});
