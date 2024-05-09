import NaoEncontrado from "../erros/NaoEcontrado.js"

//Middleware que trata o erro 404 "not found"
function manipulador404(req, res, next){
    const erro404 = new NaoEncontrado()
    next(erro404) 
}

export default manipulador404