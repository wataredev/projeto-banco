
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
