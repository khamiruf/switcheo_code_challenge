const address = document.getElementById("input-address");
const amount = document.getElementById("input-amount");
const OTP = document.getElementById("input-otp");
const errorElement = document.getElementById("error-message");
const successElement = document.getElementById("success-message");

const form = document.getElementById("form");



form.addEventListener('submit', (e) => {
    let messages = [];
    if (address.value === "" || address.value == null) {
        messages.push("Address is required");
    } else {
        // use web3 to validate ETH address
        let validAddress = Web3.utils.isAddress(address.value);
        console.log(validAddress);
        if (!validAddress) {
            messages.push("Invalid address, please verify that you've keyed in the right address");
        }
    }
    if (messages.length > 0) {
        e.preventDefault();
        errorElement.style.visibility = "visible";
        errorElement.innerText = messages.join(","); 
    } else {
        e.preventDefault();
        errorElement.style.visibility = "hidden";
        // successElement.style.visibility = "visible";
        successElement.innerText = "Transaction sent successfully";
        fadeMessage();
        form.reset();
    }
});

function fadeMessage() {
    successElement.className = "alert alert-success";
    setTimeout(() => {
        successElement.className = successElement.className.replace("alert alert-success", "");
    }, 2000);
}