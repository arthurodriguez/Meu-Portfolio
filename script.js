var brilho = document.getElementById("brilho");

document.addEventListener("mousemove", function (e) {
  brilho.style.left = e.clientX + "px";
  brilho.style.top = e.clientY + "px";
});

var palavras = ["Full Stack", "Front-end", "Back-end"];
var palavraAtual = 0;
var letraAtual = 0;
var apagando = false;
var digitando = document.getElementById("digitando");

function escrever() {
  var palavra = palavras[palavraAtual];

  if (apagando) {
    letraAtual--;
  } else {
    letraAtual++;
  }

  digitando.textContent = palavra.substring(0, letraAtual);

  var tempo = 110;

  if (apagando) {
    tempo = 60;
  }

  if (!apagando && letraAtual === palavra.length) {
    apagando = true;
    tempo = 1500;
  } else if (apagando && letraAtual === 0) {
    apagando = false;
    palavraAtual++;
    if (palavraAtual === palavras.length) {
      palavraAtual = 0;
    }
    tempo = 400;
  }

  setTimeout(escrever, tempo);
}

escrever();

var botaoTema = document.getElementById("tema");

if (localStorage.getItem("tema") === "escuro") {
  document.body.classList.add("escuro");
  botaoTema.textContent = "Claro";
}

botaoTema.addEventListener("click", function () {
  document.body.classList.toggle("escuro");

  if (document.body.classList.contains("escuro")) {
    localStorage.setItem("tema", "escuro");
    botaoTema.textContent = "Claro";
  } else {
    localStorage.setItem("tema", "claro");
    botaoTema.textContent = "Escuro";
  }
});

var menu = document.getElementById("menu");

document.getElementById("hamburguer").addEventListener("click", function () {
  menu.classList.toggle("aberto");
});

menu.addEventListener("click", function () {
  menu.classList.remove("aberto");
});

var nome = document.getElementById("nome");
var telefone = document.getElementById("telefone");
var email = document.getElementById("email");
var mensagem = document.getElementById("mensagem");
var contador = document.getElementById("contador");
var erro = document.getElementById("erro");

nome.addEventListener("input", function () {
  nome.value = nome.value.replace(/[0-9]/g, "");
});

telefone.addEventListener("input", function () {
  var numeros = telefone.value.replace(/\D/g, "").substring(0, 11);

  if (numeros.length > 10) {
    numeros = numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (numeros.length > 6) {
    numeros = numeros.replace(/^(\d{2})(\d{4})(\d*)$/, "($1) $2-$3");
  } else if (numeros.length > 2) {
    numeros = numeros.replace(/^(\d{2})(\d*)$/, "($1) $2");
  }

  telefone.value = numeros;
});

email.addEventListener("input", function () {
  email.value = email.value.replace(/\s/g, "").toLowerCase();
});

mensagem.addEventListener("input", function () {
  contador.textContent = mensagem.value.length + "/300";
});

var modal = document.getElementById("modal");

document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  erro.textContent = "";

  if (nome.value.trim().length < 3) {
    erro.textContent = "Digite seu nome completo.";
    return;
  }

  if (telefone.value.length < 14) {
    erro.textContent = "Digite um telefone válido com DDD.";
    return;
  }

  if (email.value.indexOf("@") === -1 || email.value.indexOf(".") === -1) {
    erro.textContent = "Digite um e-mail válido.";
    return;
  }

  if (mensagem.value.trim().length < 10) {
    erro.textContent = "Escreva uma mensagem com pelo menos 10 caracteres.";
    return;
  }

  document.getElementById("modal-texto").textContent =
    "Obrigado, " + nome.value.trim() + "! Retorno o seu contato em breve.";
  modal.classList.add("aberto");
  this.reset();
  contador.textContent = "0/300";
});

document.getElementById("fechar").addEventListener("click", function () {
  modal.classList.remove("aberto");
});

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.classList.remove("aberto");
  }
});
