import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import manipulador404 from "./middlewares/er404.js";
import manipuladorDeErros from "./middlewares/manipuladorErros.js";

//Mensagem de erro ou de sucesso na conexão com o BD
db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

//Comando para fazer a ligação do app com as rotas
const app = express();
app.use(express.json())
routes(app);

//Comando para o app usar o Middleware que lida com o erro 404
app.use(manipulador404)

//Comando para o app usar o Middleware de erros
app.use(manipuladorDeErros)

export default app