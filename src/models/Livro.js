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
      required: [true, "Por favor informar a editora do livro"]
    },
    numeroPaginas: {type: Number}
  }
)

const livros = mongoose.model("livros", livroSchema)

export default livros