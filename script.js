const API_URL = "http://127.0.0.1:8000/predict";

function predict() {
    const data = {
        Pclass: parseInt(document.getElementById("pclass").value),
        Sex: parseInt(document.getElementById("sex").value),
        Age: parseFloat(document.getElementById("age").value),
        SibSp: parseInt(document.getElementById("sibsp").value),
        Parch: parseInt(document.getElementById("parch").value),
        Fare: parseFloat(document.getElementById("fare").value)
    };

    console.log("Sending:", data);

    document.getElementById("result").innerText = "Predicting...";

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        const label = result.survived === 1 ? "Survived" : "Did not survive";
        const percent = (result.survival_probability * 100).toFixed(1);
        document.getElementById("result").innerText =
            label + " (probability: " + percent + "%)";
    })
    .catch(error => {
        document.getElementById("result").innerText = "Error: " + error;
    });
}