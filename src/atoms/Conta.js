import { uuidv5 } from "uuid";
export default class Conta {
  constructor(nome, senha, email) {
    this.id = uuidv5();
    this.username = nome;
    this.password = senha;
    this.email = email;
  }
}
