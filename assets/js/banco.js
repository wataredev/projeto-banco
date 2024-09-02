
let dinheiroTotal = 5000;

let nomeUsuario = localStorage.getItem("usuario")

let textoBoasVindas = document.querySelector("h1").innerText = `Olá ${nomeUsuario}`;

responsiveVoice.speak(textoBoasVindas, 'Brazilian Portuguese Female', { rate: 1.1 });

function atualizarSaldo(valor) {
  let textarea = document.querySelector("#valorDisponivel");
  textarea.placeholder = `Saldo: ${valor}`;
}

function verSaldo() {
  esconder()
  document.querySelector(".container-verSaldo").style.display = "flex";
}

function sacar() {
  esconder()
  document.querySelector(".container-sacar").style.display = "flex";
}

function verExtrato() {
  esconder()
  document.querySelector(".container-extrato").style.display = "flex";
}

function addExtrato(info) {
  let data = new Date();
  
  let strData = `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()} ${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`;
  const p = document.createElement("li");
  p.textContent = info + " em " + strData;
  const lista = document.querySelector(".lista-extrato");
  lista.appendChild(p);
}

function depositar() {
  esconder()
  document.querySelector(".container-depositar").style.display = "flex";
}

function transferir() {
  esconder()
  document.querySelector(".container-transferir").style.display = "flex";
}

function formatarTexto(bancos, conta, valor) {
    bancos.value = "";
    conta.value = "";
    valor.value = "";
}

function narradora(variavel) {
  responsiveVoice.speak(variavel.placeholder, 'Brazilian Portuguese Female', { rate: 1.1 });
}

function transferirDinheiro() {
  let bancos = document.querySelector("#banco-destino");
  let conta = document.querySelector("#conta-destino");
  let valor = document.querySelector("#valor-transferencia");
  let valorRecebido = parseFloat(valor.value);
  let bancosRecebidos = bancos.value;
  let contaRecebida = conta.value;
  if (!bancosRecebidos || !contaRecebida || !valorRecebido || valorRecebido <= 0 || isNaN(valorRecebido) || valorRecebido > dinheiroTotal) {
    formatarTexto(bancos, conta, valor);
    conta.placeholder = "Digite novamente";
    bancos.placeholder = "Digite novamente";
    valor.placeholder = "Transferência não realizada";
    narradora(valor);
  }  else {
    dinheiroTotal -= valorRecebido;
    atualizarSaldo(dinheiroTotal);
    formatarTexto(bancos, conta, valor);
    conta.placeholder = "";
    bancos.placeholder = "";
    valor.placeholder = "Transferência Realizada";
    let info = `Transferência para conta ${contaRecebida} no banco ${bancosRecebidos} no valor de ${valorRecebido}`
    narradora(valor);
    addExtrato(info)
  }
}

function sacarDinheiro() {
  let textarea = document.querySelector(".textSacar");
  let valorDisponivel = parseFloat(textarea.value);

  if (isNaN(valorDisponivel) || !valorDisponivel || valorDisponivel <= 0) {
    textarea.value = "";
    textarea.placeholder = "Valor inválido ou Vazio"
    narradora(textarea);
  } else if (valorDisponivel <= dinheiroTotal) {
    dinheiroTotal -= valorDisponivel;
    atualizarSaldo(dinheiroTotal)
    textarea.value = "";
    textarea.placeholder = "Saque realizado"
    narradora(textarea);
    const info = `Saque de R$${valorDisponivel} realizado`;
    addExtrato(info);
  } else {
    textarea.value = "";
    textarea.placeholder = "Saldo insuficiente";
    narradora(textarea);
  }
}

function depositarDinheiro() {
  let textDepositar = document.querySelector(".textDepositar");
  let valorDepositar = parseFloat(textDepositar.value);
  console.log(valorDepositar);

  if (isNaN(valorDepositar) || !valorDepositar || valorDepositar < 0) {
    textDepositar.placeholder = "Valor inválido ou Vazio"
    responsiveVoice.speak(textDepositar.placeholder, 'Brazilian Portuguese Female', { rate: 1.1 });
  } else {
    dinheiroTotal += valorDepositar;
    atualizarSaldo(dinheiroTotal);
    textDepositar.value = "";
    textDepositar.placeholder = "Depósito realizado"
    responsiveVoice.speak(textDepositar.placeholder, 'Brazilian Portuguese Female', { rate: 1.1 });
    const info = `Depósito de R$${valorDepositar} realizado`;
    addExtrato(info);
  }
}


function esconder() {
  document.querySelector(".container-verSaldo").style.display = "none";
  document.querySelector(".container-sacar").style.display = "none";
  document.querySelector(".container-extrato").style.display = "none";
  document.querySelector(".container-depositar").style.display = "none";
  document.querySelector(".container-transferir").style.display = "none";
  document.querySelector(".container-inicial").style.display = "none";
}

function botaoVoltar() {
  esconder()
  document.querySelector(".container-inicial").style.display = "flex";
}

