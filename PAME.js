const prompt = require("prompt-sync")({ sigint: true });

class Cliente {
  constructor(id, nome, pets, fidelizado) {
    this.id = id;
    this.nome = nome;
    this.pets = pets;
    this.fidelizado = fidelizado >= 4;
  }
}

class Funcionario {
  constructor(id, nome, senha) {
    this.id = id;
    this.nome = nome;
    this.senha = senha;
  }

  verDados() {
    prompt("Seus dados são: \nID: " + this.id + "\nUsuário: " + this.nome + "\nSenha: " + this.senha + "\nPressione enter para voltar ao menu de seleção");
  }
}

class Animal {
  constructor(id, nome_pet, nome_dono, consultas) {
    this.id = id;
    this.nome_pet = nome_pet;
    this.nome_dono = nome_dono;
    this.consultas = consultas;
  }
}

class Consulta {
  constructor(id, nome_cliente, nome_pet, nome_funcionario, stat, data) {
    this.id = id;
    this.nome_cliente = nome_cliente;
    this.nome_pet = nome_pet;
    this.nome_funcionario = nome_funcionario;
    this.stat = stat;
    this.data = data;
  }
}

class Sistema {
  constructor() {
    this.clientes = [];
    this.funcionarios = [];
    this.animais = [];
    this.consultas = [];
    this.usuarioLogado = null;
  }

  modificarDados(id, nome, senha){
    while(true){
      let opção = prompt("1) Usuário \n2) Senha \nSelecione o dado que deseja modificar: ")
      if(opção == "1"){
        for (let i = 0; i < sistema.funcionarios.length; i++) {
          if (sistema.funcionarios[i][0] === parseInt(id)){
            let novoNome = prompt("O seu usuário atual é " + nome + "\nDigite o seu novo usuário: ");
            sistema.funcionarios[i][1] = novoNome;
            console.log("O seu novo usuário é: " + sistema.funcionarios[i][1]);
          }
        }
      }
      if(opção == "2"){
        for (let i = 0; i < sistema.funcionarios.length; i++) {
          if (sistema.funcionarios[i][0] === parseInt(id)){
            let novaSenha = prompt("A sua senha atual é " + senha + "\nDigite a sua nova senha: ");
            sistema.funcionarios[i][2] = novaSenha;
            console.log("A sua nova senha é: " + sistema.funcionarios[i][2]);
          }
        }
      }
      let continuar = prompt("Deseja alterar outro dado? (s/n): ")
      if(continuar === "n"){
        console.log("Pressione enter para voltar ao Menu de seleção")
        break
      }
    }
  }

  listaClientes() {
    if (this.clientes.length === 0) {
      console.log("Não há clientes cadastrados");
    } 
    else {
      let dicionarioClientes = {};
      for (let i = 0; i < this.clientes.length; i++) {
        dicionarioClientes[this.clientes[i].nome] = this.clientes[i].id;
      }
      dicionarioClientes = Object.keys(dicionarioClientes).sort();
      for (let i in dicionarioClientes) {
        console.log("Cliente: " + dicionarioClientes[i]);
      }
      prompt("Pressione enter para voltar ao menu de seleção");
    }
  }
  listaPets(){
    if (this.animais.length == 0) {
      console.log("Não há pets cadastrados");
    } 
    else {
      let dicionarioPets = {};
      for (let i = 0; i < this.animais.length; i++) {
        dicionarioPets[this.animais[i][2]] = this.animais[i][1];
      }
      let dicionarioOrdenado = Object.keys(dicionarioPets).sort();
      const novoDicionario = {};
      dicionarioOrdenado.forEach(chave => {
        novoDicionario[chave] = dicionarioPets[chave];
      });
      const entradas = Object.entries(novoDicionario);
      for (const [chave, valor] of entradas) {
        console.log("Pet: " + chave + " Dono: " + valor);
      }
      prompt("Pressione enter para voltar ao menu de seleção");
    }
  }

  listaFuncionarios(){
    let dicionarioFuncionarios = {}
    for (let i = 0; i < sistema.funcionarios.length; i++) {
      dicionarioFuncionarios[sistema.funcionarios[i][1]] = sistema.funcionarios[i][0]
    }
    dicionarioFuncionarios = Object.keys(dicionarioFuncionarios).sort()
    console.log(dicionarioFuncionarios)
    for (let i in dicionarioFuncionarios) {
      console.log("Usuário: " + dicionarioFuncionarios[i])
    }
    prompt("Pressione enter para voltar ao menu de seleção")
  }

  mudarStatusConsulta(){
    const idConsulta = parseInt(prompt("Digite o ID da consulta: "));
    const novoStatus = prompt("Digite o novo status da consulta: ");
    const consultaEncontrada = this.consultas.find(consulta => consulta.id === idConsulta);
    if (consultaEncontrada) {
      consultaEncontrada.stat = novoStatus;
      console.log("Status da consulta alterado com sucesso!");
    } 
    else {
      console.log("Consulta não encontrada");
    }
    prompt("Pressione enter para voltar ao menu de seleção");
  }

  removerPet(){
    let petRemovido = prompt("Escreva o nome do pet que será removido: ")
    for(let i = 0; i < this.animais.length; i++){
      if(this.animais[i][2] === petRemovido){
        this.animais.splice(i, 1)
      }
    }
    prompt("Pet removido com sucesso \nPressione enter para voltar ao menu de seleção");
  }

  removerFuncionario(){

    //a função de removerFuncionario não rodou como esperado

    //console.log(sistema.funcionarios)
    //let idRemovido = prompt("Escreva o ID do funcionário que será removido: ")
    //for(let i = 0; i < sistema.funcionarios.length; i++){
      //console.log(sistema.funcionario[i][0])
      //if(sistema.funcionarios[i][0] === idRemovido){
        //sistema.funcionarios.splice(i, 1)
      //}
    //}
    //console.log(this.funcionarios)
    //prompt("Funcionário removido com sucesso \nPressione enter para voltar ao menu de seleção");
  }

  cadastrarPet(nomeCliente, nomePet){
    const petId = this.animais.length + 1;
    let petEncontrado = false
    if(this.animais.length === 0){
      this.animais.push([petId, nomeCliente, nomePet])
    }
    else{
      for (let i = 0; i < this.animais.length; i++){
        if(this.animais[i][2] === nomePet){
          petEncontrado = true
        }
      }
      if(petEncontrado === false){
        this.animais.push([petId, nomeCliente, nomePet])
      }
    }
  }

  cadastrarCliente(nomeCliente, nomePet) {
    const clienteId = this.clientes.length + 1;
    let clienteEncontrado = false;

    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].nome === nomeCliente && !this.clientes[i].pets.includes(nomePet)) {
        this.clientes[i].pets.push(nomePet);
        this.clientes[i].fidelizado += 1;
        clienteEncontrado = true;
        break;
      }
      if (this.clientes[i].nome !== nomeCliente) {
        clienteEncontrado = false;
      }
    }
    if (!clienteEncontrado) {
      this.clientes.push(new Cliente(clienteId, nomeCliente, [nomePet], 1));
    }
    for (let j = 0; j < this.clientes.length; j++) {
      if (this.clientes[j].id === clienteId) {
        var novoCliente = new Cliente(this.clientes[j].id, this.clientes[j].nome, this.clientes[j].pets, this.clientes[j].fidelizado);
      }
    }
  }

  cancelarConsulta(){
    const idConsulta = parseInt(prompt("Digite o ID da consulta: "));
    const consultaEncontrada = this.consultas.find(consulta => consulta.id === idConsulta);
    if (consultaEncontrada) {
      consultaEncontrada.stat = "Cancelada";
      console.log("Consulta cacelada com sucesso!");
    } 
    else {
      console.log("Consulta não encontrada");
    }
    prompt("Pressione enter para voltar ao menu de seleção");
  }

  marcarConsulta(){
    const nomeCliente = prompt("Digite o nome do cliente: ");
    const nomePet = prompt("Digite o nome do pet: ");
    const nomeFuncionario = prompt("Digite o nome do funcionário responsável: ");
    const stat = "Pendente";
    const data = prompt("Digite a data da consulta: ");
    const id = this.consultas.length + 1;
    const novaConsulta = new Consulta(id, nomeCliente, nomePet, nomeFuncionario, stat, data);
    this.consultas.push(novaConsulta);
    this.cadastrarCliente(nomeCliente, nomePet)
    this.cadastrarPet(nomeCliente, nomePet)
    console.log("O ID da sua consulta é: " + id +"\nConsulta marcada com sucesso!");
    prompt("Pressione enter para voltar ao menu de seleção");
  }

  menuLogado(id, nome, senha){
    let sair = true;
    while (sair) {
      for (let i = 0; i < sistema.funcionarios.length; i++) {
        if (sistema.funcionarios[i][0] === parseInt(id)){
          var novoFuncionario = new Funcionario(sistema.funcionarios[i][0], sistema.funcionarios[i][1], sistema.funcionarios[i][2]);
        }
      }
      const escolher = prompt("1) Ver meus dados \n2) Modificar meus dados \n3) Ver lista de Clientes \n4) Ver lista de Pets \n5) Ver lista de Consultas \n6) Ver lista de Funcionários \n7) Marcar Consulta \n8) Mudar Status de Consulta \n9) Remover Cliente \n10) Remover Pet \n11) Cancelar Consulta \n12) Remover Funcionário \n13) Fazer Logout \nSelecione uma opção: ");
      switch (escolher) {
        case "1":
          novoFuncionario.verDados();
          break;

        case "2":
          sistema.modificarDados(id, nome, senha);
          break;

        case "3":
          this.listaClientes();
          break;

        case "4":
          this.listaPets();
          break;

        case "5":

          //Não ficou pronto a tempo

          //Código listar consultas em ordem cronológica
          break;

        case "6":
          sistema.listaFuncionarios();
          break;

        case "7":
          sistema.marcarConsulta();
          break;

        case "8":
          sistema.mudarStatusConsulta()
          break;

        case "9":
          
          //Não ficou pronto a tempo

          // Código remover cliente
          break;

        case "10":
          this.removerPet();
          break;

        case "11":
          this.cancelarConsulta();
          break;

        case "12":
          this.removerFuncionario();
          break;

        case "13":
          sair = false;
          break;

        default:
          console.log("Opção inválida");
          break;
      }
    }
  }

  Cadastrar() {
    const id = sistema.funcionarios.length + 1;
    const nome = prompt("Digite o seu nome de usuário: ")
    const senha = prompt("Digite a sua senha: ")
    sistema.funcionarios.push([id, nome, senha]);
    console.log("Cadastro efetuado com sucesso \nSeu ID é: " + id)
  }

  Login() {
    const id = prompt("Digite o seu ID: ")
    const nome = prompt("Digite o seu nome de usuário: ")
    const senha = prompt("Digite a sua senha: ")
    for (let i = 0; i < sistema.funcionarios.length; i++) {
        if (sistema.funcionarios[i][0] === parseInt(id) && sistema.funcionarios[i][1] === nome && sistema.funcionarios[i][2] === senha) {
          var acesso = true
          break
        }
        else {
          acesso = false
        }
    }
    if (acesso === true) {
        sistema.menuLogado(id, nome, senha)
    }
    else {
        console.log("ID, usuário ou senha incorreto")
    }
  }
  menuInicial() {
    while (true) {
      console.log("=== MENU ===");
      console.log("1) Login");
      console.log("2) Cadastrar")
      console.log("3) Sair");

      const opcao = prompt("Selecione uma opção: ");

      switch (opcao) {
        case "1":
          this.Login();
          break;
        case "2":
          this.Cadastrar();
          break;
        case "3":
          return;
        default:
          console.log("Opção inválida.");
          break;
      }
    }
  }
}

const sistema = new Sistema();
sistema.menuInicial();