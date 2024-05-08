import mongoose from "mongoose"
import ErroBase from "../erros/ErroBase.js"
import reqIncorreta from "../erros/ReqIncorreta.js"
import ErroValidacao from "../erros/ErroValidacao.js"
import NaoEncontrado from "../erros/NaoEcontrado.js"

//Middleware responsavel pelas mensagens de erros
function manipuladorDeErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError){
       new reqIncorreta().enviarResposta(res)
    } else if (erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao().enviarResposta(res)
    } else if (erro instanceof NaoEncontrado) {
        erro.enviarResposta(res)
    } else {
        new ErroBase().enviarResposta(res)
    }
}

export default manipuladorDeErros