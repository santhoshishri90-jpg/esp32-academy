
// ESP32 ACADEMY

// Mobile sidebar
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
});

// Search
const search = document.getElementById("search");

search.addEventListener("input", function () {
    const value = search.value.toLowerCase();

    document.querySelectorAll(".searchable article").forEach(function (card) {
        card.style.display = card.textContent.toLowerCase().includes(value)
            ? ""
            : "none";
    });
});

// Virtual LED
const virtualLed = document.getElementById("virtualLed");
const ledStatus = document.getElementById("ledStatus");

document.querySelectorAll("[data-color]").forEach(function (button) {
    button.addEventListener("click", function () {
        const color = button.dataset.color;

        virtualLed.style.background = color;
        virtualLed.style.boxShadow =
            color === "black" ? "none" : "0 0 35px " + color;

        ledStatus.textContent =
            color === "black" ? "LED is OFF" : "LED colour: " + color.toUpperCase();
    });
});

// Copy code
document.getElementById("copyCode").addEventListener("click", async function () {
    const code = document.getElementById("sampleCode").textContent;
    const status = document.getElementById("copyStatus");

    try {
        await navigator.clipboard.writeText(code);
        status.textContent = "Code copied!";
    } catch (error) {
        status.textContent = "Select and copy the code manually.";
    }
});

// Quiz
const questions = [
    {
        question: "Which chip is used in the classic ESP32-WROOM-32 module?",
        answers: ["ATmega328P", "ESP32", "Raspberry Pi"],
        correct: 1
    },
    {
        question: "Which language is commonly used with Arduino IDE for ESP32?",
        answers: ["C/C++", "HTML only", "CSS only"],
        correct: 0
    },
    {
        question: "Which feature allows ESP32 to connect to a wireless network?",
        answers: ["Wi-Fi", "VGA", "HDMI"],
        correct: 0
    },
    {
        question: "What does GPIO mean?",
        answers: ["General Purpose Input/Output", "Global Power Internet Output", "General Program Input Option"],
        correct: 0
    }
];

let questionIndex = 0;
let score = 0;
let answered = false;

function showQuestion() {
    const q = questions[questionIndex];

    document.getElementById("question").textContent = q.question;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.answers.forEach(function (answer, index) {
        const button = document.createElement("button");
        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", function () {
            if (answered) return;

            answered = true;

            if (index === q.correct) {
                score++;
                document.getElementById("quizResult").textContent = "Correct answer!";
            } else {
                document.getElementById("quizResult").textContent =
                    "Not quite! Correct answer: " + q.answers[q.correct];
            }

            document.getElementById("quizScore").textContent = "Score: " + score;
        });

        answers.appendChild(button);
    });

    answered = false;
    document.getElementById("quizResult").textContent = "Choose your answer!";
}

document.getElementById("nextQuestion").addEventListener("click", function () {
    questionIndex++;

    if (questionIndex >= questions.length) {
        questionIndex = 0;
        score = 0;
        document.getElementById("quizScore").textContent = "Score: 0";
        document.getElementById("quizResult").textContent = "Quiz restarted!";
    }

    showQuestion();
});

showQuestion();

// Resistance calculator
document.getElementById("calculate").addEventListener("click", function () {
    const voltage = Number(document.getElementById("voltage").value);
    const current = Number(document.getElementById("current").value);
    const result = document.getElementById("calculationResult");

    if (!Number.isFinite(voltage) || !Number.isFinite(current) ||
        voltage <= 0 || current <= 0) {
        result.textContent = "Enter positive voltage and current values.";
        return;
    }

    const resistance = voltage / current;
    result.textContent = "Resistance: " + resistance.toFixed(2) + " Ω";
});

// Back to top
document.getElementById("topButton").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

console.log("ESP32 Academy loaded successfully!");
// ESP32 Academy App Registration
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./service-worker.js")
            .then(function () {
                console.log("ESP32 Academy App Ready!");
            })
            .catch(function (error) {
                console.log("App registration failed:", error);
            });
    });
}
