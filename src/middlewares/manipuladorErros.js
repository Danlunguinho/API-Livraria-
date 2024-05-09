import mongoose from "mongoose"
import ErroBase from "../erros/ErroBase.js"
import reqIncorreta from "../erros/ReqIncorreta.js"
import ErroValidacao from "../erros/ErroValidacao.js"

//Middleware responsavel por receber e instanciar as mensagens de erro
function manipuladorDeErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError){
       new reqIncorreta().enviarResposta(res)
    } else if (erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao().enviarResposta(res)
    } else if (erro instanceof ErroBase) {
        erro.enviarResposta(res)
    } else {
        new ErroBase().enviarResposta(res)
    }
}

export default manipuladorDeErros