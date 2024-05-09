import mongoose from "mongoose"

//Definição das campos presentes em Autor
const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String, 
      //definição da mensagem de erro para quando o nome não for informado
      required: [true, "Por favor informar o nome do(a) autor(a)"]
    },
    nacionalidade: {type: String}
  },
  {
    versionKey: false
  }
)

const autores = mongoose.model("autores", autorSchema)

export default autores