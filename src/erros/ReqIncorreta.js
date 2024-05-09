import ErroBase from "./ErroBase.js";

//Classe para caso os dados fornecidos pelo usuario estejam incorretos
class reqIncorreta extends ErroBase{
    constructor(mensagem = "Um ou mais dados fornecidos estão incorretos"){
        super(mensagem, 400)
    }
}

export default reqIncorreta