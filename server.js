const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve file statis (html, json, gambar)

// --- API ENDPOINTS (LOGIC BISNIS) ---

// 1. GET: Ambil Semua Data Kanji
app.get('/api/kanji', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'datakanji.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Gagal membaca DB:", err);
            return res.status(500).json({ error: "Gagal mengambil data kanji" });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json({ success: true, data: jsonData });
        } catch (parseErr) {
            res.status(500).json({ error: "Format data rusak" });
        }
    });
});

app.get('/api/boss-quiz', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'boss-quiz.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error Boss Quiz:", err);
            return res.status(500).json({ error: "Gagal memanggil Quiz Boss" });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json({ success: true, data: jsonData });
        } catch (parseErr) {
            res.status(500).json({ error: "Data Quiz Rusak" });
        }
    });
});
// 2. GET: Statistik User (Simulasi Server Logic jika mau extend database nanti)
app.get('/api/status', (req, res) => {
    res.json({ status: "Server Online", timestamp: new Date() });
});

// Routing Halaman HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'info.html'));
});
app.get('/slash', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'audio', 'slash.mp3'));
});
app.get('/victory', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'audio', 'victory.mp3'));
});
app.get('/crack', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'audio', 'crack.mp3'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});
app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'statistik.html'));
});
app.get('/boss-battle', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'boss-battle.html')); // ROUTE BARU KHUSUS BOSS
});
app.get('/preparation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'preparation-battle.html'));
});
app.listen(PORT, () => {
    console.log(`Server Kanji RPG berjalan di http://localhost:${PORT}`);
});