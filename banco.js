
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
  
  let strData = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`;
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



function sacarDinheiro() {
  let textarea = document.querySelector(".textSacar");
  let valorDisponivel = parseFloat(textarea.value);

  if (isNaN(valorDisponivel) || !valorDisponivel) {
    textarea.placeholder = "Valor inválido ou Vazio"
    responsiveVoice.speak(textarea.placeholder, 'Brazilian Portuguese Female', { rate: 1.1 });
  } else if (valorDisponivel <= dinheiroTotal) {
    dinheiroTotal -= valorDisponivel;
    atualizarSaldo(dinheiroTotal)
    textarea.value = "";
    textarea.placeholder = "Saque realizado"
    responsiveVoice.speak(textarea.placeholder, 'Brazilian Portuguese Female', { rate: 1.1 });
    const info = `Saque de R$${valorDisponivel} realizado`;
    addExtrato(info);
  } else {
    textarea.value = "";
    textarea.placeholder = "Saldo insuficiente";
    responsiveVoice.speak(textarea.placeholder, 'Brazilian Portuguese Female', { rate: 1.1 });
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
    textDepositar.placeholder = "Deposito realizado"
    responsiveVoice.speak(textDepositar.placeholder, 'Brazilian Portuguese Female', { rate: 1.1 });
    const info = `Deposito de R$${valorDepositar} realizado`;
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
