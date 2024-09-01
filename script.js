function entrar() {
  let senha = parseInt(document.querySelector("#input-senha").value);

  if (senha == 3589) {
    window.open("banco.html", "_self");
  } else {
    alert("Senha inválida! a senha correta é 3589")``
  }
}

