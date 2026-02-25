const express = require("express");
const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Calculator Server is Running...");
});

// Calculator API (POST)
app.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;

    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: "Invalid numbers" });
    }

    let result;

    switch (operation) {
        case "add":
            result = a + b;
            break;

        case "subtract":
            result = a - b;
            break;

        case "multiply":
            result = a * b;
            break;

        case "divide":
            if (b === 0) {
                return res.status(400).json({ error: "Cannot divide by zero" });
            }
            result = a / b;
            break;

        default:
            return res.status(400).json({ error: "Invalid operation" });
    }

    res.json({ result });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});