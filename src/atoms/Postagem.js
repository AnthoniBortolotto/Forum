export default class Postagem {
  constructor(autorNome, autorId, titulo, texto) {
    this.autorNome = autorNome;
    this.autorId = autorId;
    this.titulo = titulo;
    this.texto = texto;
    this.dataPost = new Date(Date.now());
  }
}
