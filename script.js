var usuario = document.querySelector("#input-iniciar").value;


function entrar() {
    let senha = parseInt(document.querySelector("#input-senha").value);

    if (senha == 3589) {
        window.open("banco.html");
    } else {
        alert("Senha inválida! a senha correta é 3589")
    }
}

