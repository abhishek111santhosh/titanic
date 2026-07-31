const API_URL = "https://titanic-euln.onrender.com/predict";

function predict() {
    const btn = document.getElementById("predict-btn");
    const btnText = document.getElementById("btn-text");
    const spinner = document.getElementById("spinner");
    const resultContainer = document.getElementById("result-container");
    const resultBadge = document.getElementById("result-badge");
    const resultText = document.getElementById("result-text");

    // Gather data from inputs
    const data = {
        Pclass: parseInt(document.getElementById("pclass").value),
        Sex: parseInt(document.getElementById("sex").value),
        Age: parseFloat(document.getElementById("age").value),
        SibSp: parseInt(document.getElementById("sibsp").value),
        Parch: parseInt(document.getElementById("parch").value),
        Fare: parseFloat(document.getElementById("fare").value)
    };

    // 1. Trigger Loading State
    btn.disabled = true;
    btnText.innerText = "Processing...";
    spinner.style.display = "block";
    resultContainer.classList.remove("show", "survived", "died");

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error("Network Error");
        return response.json();
    })
    .then(result => {
        // 2. Clear Loading State
        btn.disabled = false;
        btnText.innerText = "Predict Survival";
        spinner.style.display = "none";

        // 3. Process Result
        const isSurvivor = result.survived === 1;
        const percent = (result.survival_probability * 100).toFixed(1);

        resultBadge.innerText = isSurvivor ? "Survived" : "Did Not Survive";
        resultText.innerText = `Survival Probability: ${percent}%`;

        // 4. Trigger CSS Transition
        resultContainer.className = isSurvivor ? "survived show" : "died show";
    })
    .catch(error => {
        // Handle Error State Fluidly
        btn.disabled = false;
        btnText.innerText = "Predict Survival";
        spinner.style.display = "none";

        resultBadge.innerText = "Connection Error";
        resultText.innerText = "Unable to reach the prediction model.";
        resultContainer.className = "died show";
    });
}