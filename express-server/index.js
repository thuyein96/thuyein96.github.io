const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check
app.get('/', (req, res) => {
	res.json({ status: 'ok', message: 'Express CRUD API running' });
});

// CREATE
app.post("/api/add", (req, res) => {

  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res.status(400).send("Both num1 and num1 must be numbers");
  }

  const result = num1 + num2;

  res.send({
    opt: "add",
    num1,
    num2,
    result,
  });
});

app.post("/api/subtract", (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res.status(400).send("Both num1 and num2 must be numbers");
  }

  const result = num1 - num2;

  res.send({
    opt: "subtract",
    num1,
    num2,
    result,
  });
});

app.post("/api/multiply", (req, res) => {
    const {num1, num2} = req.body;
    
    if(typeof num1 !== "number" || typeof num2 !== "number") {
        return res.status(400).send("Both num1 and num2 must be numbers");
    }

    const result = num1 * num2;

    res.send({
        opt: "multiply",
        num1,
        num2,
        result,
    });
});

app.post("/api/divide", (req, res) => {
    const {num1, num2} = req.body;

    if(typeof num1 !== "number" || typeof num2 !== "number") {
        return res.status(400).send("Both num1 and num2 must be numbers");
    }

    if(num2 === 0) {
        return res.status(400).send("Cannot divide by zero");
    }

    const result = num1 / num2;

    res.send({
        opt: "divide",
        num1,
        num2,
        result,
    });
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
