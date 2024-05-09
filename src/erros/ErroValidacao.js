import reqIncorreta from "./ReqIncorreta.js";

//Classe para apresentar o erro ao ocorrer algum problema de validação dos dados
class ErroValidacao extends reqIncorreta{
    constructor(erro){
        const mensagensErro = Object.values(erro.errors)
            .map(erro => erro.message)
            .join("; ")

        super(`Os seguintes erros foram encontrados: ${mensagensErro}`)
    }
}

export default ErroValidacao