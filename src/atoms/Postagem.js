export default class Postagem{
    constructor(autor, titulo, texto){
        this.autorNome = autor
        this.titulo = titulo
        this.texto = texto
        this.dataPost = new Date(Date.now())
    }
}