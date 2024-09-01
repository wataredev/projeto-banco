function entrar() {
  let senha = parseInt(document.querySelector("#input-senha").value);
  let usuario = document.querySelector("#input-iniciar").value;


  if (senha == 3589 && usuario.length !== 0 && usuario.length <= 20 && /[A-Za-z\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(usuario)) {
    localStorage.setItem("usuario", usuario);
    window.open("banco.html", "_self");
  } else if (usuario.length === 0 || usuario.length > 20 || /[^A-Za-z\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(usuario)) {
    alert("Usuario inválido! Nome maior que 15 caracteres e/ou vazio e\ou com caracteres especiais");
  } else {
    alert("Senha inválida! a senha correta é 3589");
  }
}