const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mysql = require("mysql2"); // Use mysql2 diretamente aqui

const app = express();
const PORT = process.env.PORT || 3000;
const saltRounds = 10;

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL: ", err);
    return;
  }
  console.log("Conexão com MySQL estabelecida com sucesso!");
});

// Middleware para ler JSON no body das requisições
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! O servidor Express está rodando.");
});

app.post("/login", async (req, res) => {
  const { emailUser, senhaUser } = req.body;

  const query = "SELECT senha FROM usuarios WHERE email = ?";
  db.query(query, [emailUser], async (err, results) => {
    if (err) {
      console.error("Erro ao buscar dados: ", err);
      return res.status(500).send("Erro no servidor");
    }

    if (results.length === 0) {
      return res.status(400).send("Usuário não encontrado");
    }

    const hashedPassword = results[0].senha;

    try {
      const isMatch = await bcrypt.compare(senhaUser, hashedPassword);
      if (isMatch) {
        res.send("Login bem-sucedido!");
      } else {
        res.status(400).send("Senha incorreta");
      }
    } catch (err) {
      console.error("Erro ao comparar senhas: ", err);
      res.status(500).send("Erro ao processar a requisição");
    }
  });
});

app.post("/cadastro", async (req, res) => {
  const { username, emailUser, senhaUser } = req.body;

  console.log(req.body); // Verificar o corpo da requisição

  try {
    const userQuery = "SELECT * FROM usuarios WHERE user = ?";
    db.query(userQuery, [username], async (err, results) => {
      if (err) {
        console.error("Erro ao verificar o username: ", err);
        return res.status(500).send("Erro no servidor");
      }

      if (results.length > 0) {
        return res.status(400).send("Nome de usuário já existente");
      }

      const emailQuery = "SELECT * FROM usuarios WHERE email = ?";
      db.query(emailQuery, [emailUser], async (err, results) => {
        if (err) {
          console.error("Erro ao verificar o email: ", err);
          return res.status(500).send("Erro no servidor");
        }

        if (results.length > 0) {
          return res.status(400).send("Email já existente");
        }

        try {
          const hashedPassword = await bcrypt.hash(senhaUser, saltRounds);

          const insertQuery =
            "INSERT INTO usuarios (email, senha, user) VALUES (?, ?, ?)";
          db.query(
            insertQuery,
            [emailUser, hashedPassword, username],
            (err, result) => {
              if (err) {
                console.error("Erro ao inserir dados: ", err);
                return res.status(500).send("Erro no servidor");
              }

              res.send("Usuário inserido com sucesso!");
            }
          );
        } catch (err) {
          console.error("Erro ao criptografar a senha: ", err);
          res.status(500).send("Erro ao processar a requisição");
        }
      });
    });
  } catch (err) {
    console.error("Erro ao processar a requisição: ", err);
    res.status(500).send("Erro ao processar a requisição");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
