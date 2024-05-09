import ErroBase from "./ErroBase.js";

//Classe para o erro 404 "not found"
class NaoEncontrado extends ErroBase {
    constructor(mensagem = "Pagina não encontrada"){
        super(mensagem, 404)
    }
}

export default NaoEncontrado