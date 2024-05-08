import mongoose from "mongoose"

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "Por favor informar o titulo do livro"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'autores', 
      required: [true, "Por favor informar o nome do(a) autor(a)"]
    },
    editora: {
      type: String,
      required: [true, "Por favor informar a editora do livro"],
      /*enum pode ser utilizado para definir as possiveis opções para a requisição 
      enum: {value: ["editora1", "editora2"], message: "Mensagem de erro"}
      */
    },
    numeroPaginas: {
      type: Number,
      validate: { 
        validator: (valor) => { return valor >= 10 && valor <=5000 },
        message: "o numero de paginas deve estar entre 10 e 5000"
      }
    }
  }
)

const livros = mongoose.model("livros", livroSchema)

export default livros