import { livros, autores } from "../models/index.js"

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec()

      res.status(200).json(livrosResultado)
    } catch (erro) {
      next(erro)
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec()

        if (livroResultado !== null) {
          res.status(200).send(livroResultado)
        } else {
          next(new NaoEncontrado("Id do livro não localizado."))
        }
    } catch (erro) {
      next(erro)
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body)

      const livroResultado = await livro.save()

      res.status(201).send(livroResultado.toJSON())
    } catch (erro) {
      next(erro)
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body})
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado"})
      } else {
        next(new NaoEncontrado("Id do livro não localizado."))
      }

    } catch (erro) {
      next(erro)
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id

      const livroResultado = await livros.findByIdAndDelete(id)
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro excluido"})
      } else {
        next(new NaoEncontrado("Id do livro não localizado."))
      }

    } catch (erro) {
      next(erro)
    }
  };

  static buscarLivro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query)
        if(busca !== null){
          const livrosResultado = await livros
            .find(busca)
            .populate("autor")

          res.status(200).send(livrosResultado)
        } else {
        res.status(200).send([])
        } 
    } catch (erro) {
      next(erro)
    }
  }
}

//Função para realizar buscas
async function processaBusca(parametros) {
  //Busca por editora, titulo, e número de paginas
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros
    
    let busca = {}
      if(editora) busca.editora = editora
      //Regex simplifica a busca, sem precisar buscar pelo titulo completo do livro
      //A flad i faz com que a busca ignore se a letra é maiusculas ou minuscula
      if(titulo) busca.titulo = { $regex: titulo, $options: "i" }

      if (minPaginas || maxPaginas) busca.numeroPaginas = {}
      //gte = greater then or equal (maior ou igual)
      if(minPaginas) busca.numeroPaginas.$gte = minPaginas
      //lte = less then or equal (menos ou igual)
      if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas

      if(nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor})
      
          if (autor !== null) {
            busca.autor = autor._id
          } else {
            busca = null
          }

        
      }

  return busca    
}

export default LivroController