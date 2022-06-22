const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));
const port = 8080;
app.post("/pedido", (req, res) => {
  const body = req.body;
  console.log(body);
  return res.json(body);
});

app.listen(port, () => {
  console.log(`Server ligado e escutando na porta ${port}.`);
});

const nodemailer = require("nodemailer");
const auth = require("./auth_mail.json");

console.log(auth);
// Configuração da conexão com o servidor de email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: auth.login,
    // Para servidor STMP, no google é necessário criar uma senha de aplicativo
    // Veja como em https://support.google.com/accounts/answer/185833?hl=pt-BR
    pass: auth.app_pwd,
  },
  tls: { rejectUnauthorized: false },
});

// Define o conteúdo do e-mail
const mailOptions = {
  from: "luiizgustavo@gmail.com",
  to: "gustavo_veras@ifsp.edu.br",
  subject: "E-mail enviado usando Node!",
  text: "Bem fácil, não? ;)",
};

// enviar o email de acordo com as configurações
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email enviado: " + info.response);
  }
});
