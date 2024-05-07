import express from "express";
import db from "./config/dbConnect.js"
import manipuladorDeErros from "./middlewares/Erros.js";
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();
app.use(express.json())
routes(app);

//Comando para o app usar o Middleware de erros
app.use(manipuladorDeErros)

export default app