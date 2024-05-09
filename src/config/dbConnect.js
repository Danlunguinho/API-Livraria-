import mongoose from "mongoose"

//Conexão com o banco de dados
mongoose.connect(process.env.DB_CONNECTION)

let db = mongoose.connection

export default db