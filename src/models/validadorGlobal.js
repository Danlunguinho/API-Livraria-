import mongoose from "mongoose";

//Validador dos campos para as rotas POST
mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor !== "",
    message: ({ path }) => `O campo ${path} não foi fornecido`
})