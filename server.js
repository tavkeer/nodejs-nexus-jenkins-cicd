const express = require("express");

const app = express();
const PORT = 3000;
simple - node - app
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<title>DevOps Demo</title>

<style>
body{
    margin:0;
    font-family:Arial,sans-serif;
    background:#0f172a;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
}

.card{
    text-align:center;
    padding:40px;
    border-radius:16px;
    background:#1e293b;
    box-shadow:0 0 20px rgba(0,0,0,0.4);
}

h1{
    color:#38bdf8;
}
</style>
</head>

<body>
<div class="card">
    <h1>Jenkins CI/CD</h1>
    <p>Deployment Successful V4 🚀</p>
    <p>Node.js running on server</p>
</div>
</body>
</html>
`);
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    server: "NodeJS",
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
