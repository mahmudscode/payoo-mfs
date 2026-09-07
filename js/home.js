const availableBalanceElement = document.getElementById("available-balance");

const bottomCards = document.querySelectorAll(".bottom-card");

let availableBalance = Number(
    availableBalanceElement.textContent.replace("$", "")
);

const correctAccountNumber = "12345678901";
const correctPin = "1234";
const correctPromoCode = "PAYOO500";

function updateBalance() {
    availableBalanceElement.textContent =
        `$${availableBalance.toFixed(2)}`;
}

function showCard(cardName) {
    bottomCards.forEach(function (card) {
        card.classList.add("hidden");
    });

    const selectedCard =
        document.getElementById(`${cardName}-card`);

    if (selectedCard) {
        selectedCard.classList.remove("hidden");
    }
}

document.querySelectorAll("[data-screen]").forEach(function (button) {
    button.addEventListener("click", function () {
        showCard(button.dataset.screen);
    });
});

document.getElementById("log-out").addEventListener("click", function () {
    window.location.href = "index.html";
});

// add money crrd

document
    .getElementById("add-money-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const accountNumber =
            document.getElementById("account-number").value;

        const pin =
            document.getElementById("pin-number").value;

        const amount =
            Number(document.getElementById("add-amount").value);

        if (
            accountNumber !== correctAccountNumber ||
            pin !== correctPin
        ) {
            alert("Account number or PIN is incorrect.");
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Enter a valid amount.");
            return;
        }

        availableBalance += amount;

        updateBalance();

        alert("Money added successfully.");

        this.reset();
    });

// cashout card
document.getElementById("cash-out-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const agentNumber = document.getElementById("agent-number").value;

        const pin = document.getElementById("cash-out-pin").value;

        const amount = Number(document.getElementById("cash-out-amount").value);

        if (agentNumber !== correctAccountNumber || pin !== correctPin) {
            alert("Agent number or PIN is incorrect.");
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Enter a valid amount.");
            return;
        }

        if (amount > availableBalance) {
            alert("Insufficient balance.");
            return;
        }

        availableBalance -= amount;

        updateBalance();

        alert("Cash out successful.");

        this.reset();
    });

// transfer money card

document.getElementById("transfer-money-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const accountNumber = document.getElementById("user-account-number").value;
    const pin = document.getElementById("transfer-pin").value;
    const amount = parseFloat(document.getElementById("transfer-amount").value);

    if (accountNumber === correctAccountNumber && pin === correctPin) {
        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Enter a valid amount.");
        } else if (amount <= availableBalance) {
            availableBalance -= amount;
            updateBalance();
            alert(`Successfully transferred $${amount.toFixed(2)}.`);
            document.getElementById("transfer-money-form").reset();
        } else {
            alert("Insufficient balance.");
        }
    } else {
        alert("Invalid account number or PIN.");
    }
});

// get bonus card
document.getElementById("get-bonus-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const promoCode = document.getElementById("bonus-coupon").value.trim();

        if (promoCode !== correctPromoCode) {
            alert("Invalid promo code.");
            return;
        }

        availableBalance += 500;

        updateBalance();

        alert("$500 bonus added successfully.");

        this.reset();
    });


// pay bill card
document.getElementById("pay-bill-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const accountNumber = document.getElementById("biller-account-number").value;

        const pin = document.getElementById("bill-pin").value;

        const amount = Number(document.getElementById("bill-amount").value);

        if (
            accountNumber !== correctAccountNumber ||
            pin !== correctPin
        ) {
            alert("Biller account number or PIN is incorrect.");
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Enter a valid amount.");
            return;
        }

        if (amount > availableBalance) {
            alert("Insufficient balance.");
            return;
        }

        availableBalance -= amount;

        updateBalance();

        alert("Bill paid successfully.");

        this.reset();
    });