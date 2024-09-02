
let dinheiroTotal = 5000;

let nomeUsuario = localStorage.getItem("usuario")

let textoBoasVindas = document.querySelector("h1").innerText = `Olá ${nomeUsuario}`;

responsiveVoice.speak(textoBoasVindas, 'Brazilian Portuguese Female', { rate: 1.1 });

function atualizarSaldo(valor) {
  let textarea = document.querySelector("#valorDisponivel");
  textarea.placeholder = `Saldo: R$${valor}`;
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

function botaoLimpar() {
  document.querySelector("ul").innerHTML = "";
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
    narradora(valor); ``
  } else {
    dinheiroTotal -= valorRecebido;
    let saldoConvertido = dinheiroTotal.toFixed(2).replace('.', ',');
    atualizarSaldo(saldoConvertido);
    formatarTexto(bancos, conta, valor);
    conta.placeholder = "Digite uma conta destino";
    bancos.placeholder = "";
    valor.placeholder = "Transferência Realizada";
    let valorConvertido = valorRecebido.toFixed(2).replace('.', ',');
    let info = `Transferência para conta ${contaRecebida} no banco ${bancosRecebidos} no valor de R$${valorConvertido}`
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
    let saldoConvertido = dinheiroTotal.toFixed(2).replace('.', ',');
    atualizarSaldo(saldoConvertido)
    textarea.value = "";
    textarea.placeholder = "Saque realizado"
    narradora(textarea);
    let valorConvertido = valorDisponivel.toFixed(2).replace('.', ',');
    const info = `Saque de R$${valorConvertido} realizado`;
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
    let saldoConvertido = dinheiroTotal.toFixed(2).replace('.', ',');
    atualizarSaldo(saldoConvertido);
    textDepositar.value = "";
    textDepositar.placeholder = "Depósito realizado"
    responsiveVoice.speak(textDepositar.placeholder, 'Brazilian Portuguese Female', { rate: 1.1 });
    let valorConvertido = valorDepositar.toFixed(2).replace('.', ',');
    const info = `Depósito de R$${valorConvertido} realizado`;
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

document.getElementById("banco-destino").addEventListener("change", function () {
  let opcaoSelecionada = this.options[this.selectedIndex];
  const iconeUrl = opcaoSelecionada.getAttribute('data-icon');

  this.style.backgroundImage = `url('${iconeUrl}')`;
});

document.getElementById("botao-transferir").addEventListener("click", function () {
  let elemetoSelecionado = document.getElementById('banco-destino');
  elemetoSelecionado.style.backgroundImage = 'none';
});



