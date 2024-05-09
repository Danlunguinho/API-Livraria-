//Classe que define um erro base, caso o erro não seja expecificado
class ErroBase extends Error {
    constructor(mensagem = "Erro interno do servidor", status = 500){
        super()
        this.message = mensagem
        this.status = status
    }

    //Retornar na mensagem de erro a mensagem e o status do erro
    enviarResposta(res){
        res.status(this.status).send({
            mensagem: this.message,
            status: this.status
        })
    }
}

export default ErroBase