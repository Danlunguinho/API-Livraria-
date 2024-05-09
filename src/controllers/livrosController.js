import NaoEncontrado from "../erros/NaoEcontrado.js"
import { livros, autores } from "../models/index.js"

class LivroController {

  //Metodo para listar os livros
  static listarLivros = async (req, res, next) => {
    try {
      const buscarLivros = livros.find()
      
      //Armazenando a query na variavel de paginação
      req.resultado = buscarLivros

      //next é responsavel para chamar o middleware
      next()
    } catch (erro) {
      next(erro)
    }
  }

  //Metodo para listar autores pelo seu id
  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id

      //Populate faz com que os dados do autor sejam mostrados no livro 
      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec()

         //validação para saber se algo está sendo retornado
        if (livroResultado !== null) {
          res.status(200).send(livroResultado)
        } else {
          next(new NaoEncontrado("Id do livro não localizado."))
        }
    } catch (erro) {
      next(erro)
    }
  }

  //Metodo post para cadastrar novos livros no banco de dados
  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body)

      const livroResultado = await livro.save()

      res.status(201).send(livroResultado.toJSON())
    } catch (erro) {
      next(erro)
    }
  }

  //Metodo para atualizar um livro pelo seu id
  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body})
      //validação para saber se algo está sendo retornado
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado"})
      } else {
        next(new NaoEncontrado("Id do livro não localizado."))
      }

    } catch (erro) {
      next(erro)
    }
  }

  //Metodo para realizar a exclusão de um autor do banco de dados
  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id

      const livroResultado = await livros.findByIdAndDelete(id)
      //validação para saber se algo está sendo retornado
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro excluido"})
      } else {
        next(new NaoEncontrado("Id do livro não localizado."))
      }

    } catch (erro) {
      next(erro)
    }
  };

  //Metodo responsavel pela busca de livros
  static buscarLivro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query)
      //validação para saber se algo está sendo retornado
        if(busca !== null){
          const livrosResultado = livros
            .find(busca)
            .populate("autor")

          req.resultado = livrosResultado

          next()
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