import NaoEncontrado from "../erros/NaoEcontrado.js"
import { autores } from "../models/index.js"

class AutorController {

  //Metodo para listar autores
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find()

      //Armazenando a query na variavel de paginação
      req.resultado = autoresResultado

      //next é responsavel para chamar o middleware
      next()
    } catch (erro) {
      next(erro)
    }
  }

  //Metodo para listar autores pelo seu id
  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id

      const autorResultado = await autores.findById(id)
        //validação para saber se algo está sendo retornado
        if (autorResultado !== null){
          res.status(200).send(autorResultado)
        } else {
          next(new NaoEncontrado("Id do Autor não localizado."))
        }
      
    } catch (erro) {
      next(erro)
    }
  }
  
  //Metodo post para cadastrar novos autores no banco de dados
  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body)

      const autorResultado = await autor.save()

      res.status(201).send(autorResultado.toJSON())
    } catch (erro) {
      next(erro)
    }
  }
  
  //Metodo para atualizar um autor pelo seu id
  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id

      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body})
      if (autorResultado !== null){
        res.status(200).send({message: "Autor atualizado!"})
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."))
      }

    } catch (erro) {
      next(erro)
    }
  }
  
  //Metodo para realizar a exclusão de um autor do banco de dados
  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id

      const autorResultado = await autores.findByIdAndDelete(id)
      if (autorResultado !== null){
        res.status(200).send({message: "Autor exluido!"})
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."))
      }

    } catch (erro) {
      next(erro)
    }
  }
  

}

export default AutorController