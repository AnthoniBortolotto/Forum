import { v5 as uuidv5 } from "uuid";
export default class Conta {
  constructor(nome, senha, email) {
    this.id = uuidv5(email, "1f15c145-7d1b-43c7-8eb0-bd8bef276353");
    this.username = nome;
    this.password = senha;
    this.email = email;
  }
}
