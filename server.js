import express from 'express';
import db from './db.js';

const app = express();
app.use(express.json());

// Endpoint para la página de inicio
app.get("/", (req, res) => {
    res.send("Welcome to my API with Node.js and SQLite");
});

// Endpoint para obtener todos los estudiantes
app.get("/students", (req, res) => {
    db.all("SELECT * FROM students", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "students": rows });
    });
});

// Endpoint para obtener un estudiante por ID
app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM students WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "student": row });
    });
});

// Iniciar servidor
const PORT = 8002;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
