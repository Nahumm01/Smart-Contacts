const inputNome = document.getElementById("nomeInput");
const inputTel = document.getElementById("telefoneInput");
const form = document.getElementById("form");
const btnEnvio = document.querySelector(".btnEnvio");
btnEnvio.disabled = false;
let numeroTelFormatado = "";
let nomeValido = "";
let nomes = [];
let telefones = [];
let linhas = "";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  addLinhas();
  attBody();
});

function addLinhas() {
  if (nomes.includes(inputNome.value)) {
    alert(`O nome: ${inputNome.value} já existe nos contatos!`);
    if (telefones.includes(inputTel.value)) {
      alert(`O número: ${inputTel.value} já existe na agenda!`);
    }
  } else {
    nomes.push(inputNome.value);
    telefones.push(inputTel.value);

    let linha = "<tr>";
    linha += `<td> ${inputNome.value} </td>`;
    linha += `<td> ${inputTel.value} </td>`;
    linha += "</tr>";

    linhas += linha;
  }
}

function attBody() {
  const bodyTable = document.getElementById("tableBody");
  bodyTable.innerHTML = linhas;

  inputNome.value = "";
  inputTel.value = "";
}

//ADICIONAR VALIDAÇÃO DE CAMPO COM DOIS NOMES
function validaNome(nomeCompleto) {
  const nomeSemEspaco = nomeCompleto.trim();
  const nomeArray = nomeSemEspaco.split(" ");
  return nomeArray.length >= 2 && !/\d/.test(nomeSemEspaco);
}

inputNome.addEventListener("input", function (e) {
  nomeValido = validaNome(e.target.value);
  const errorNome = document.querySelector(".nomeError");

  if (!nomeValido) {
    inputNome.style.outline = "1px solid red";
    errorNome.style.display = "block";
    btnEnvio.disabled = true;
    btnEnvio.style.cursor = "not-allowed";
  } else {
    inputNome.style.outline = "1px solid green";
    errorNome.style.display = "none";
    btnEnvio.disabled = false;
    btnEnvio.style.cursor = "pointer";
  }
});

//MANIPULAR CAMPO TELEFONE PARA JA VIR COM FORMATO BR: (XX)XXXXX-XXXX
function formatarNumeroTel(numeroTel) {
  const numeroLimpo = numeroTel.replace(/\D/g, "");

  if (numeroLimpo.length >= 11) {
    const ddd = numeroLimpo.slice(0, 2);
    const numberPt1 = numeroLimpo.slice(2, 7);
    const numberPt2 = numeroLimpo.slice(7);

    return `(${ddd}) ${numberPt1}-${numberPt2}`;
  } else {
    return null;
  }
}

inputTel.addEventListener("input", function (e) {
  const numeroTel = e.target.value;
  numeroTelFormatado = formatarNumeroTel(numeroTel);
  const telError = document.querySelector(".telError");

  if (numeroTelFormatado === null) {
    inputTel.style.outline = "1px solid red";
    telError.style.display = "block";
    btnEnvio.disabled = true;
    btnEnvio.style.cursor = "not-allowed";
  } else {
    inputTel.style.outline = "1px solid green";
    telError.style.display = "none";
    btnEnvio.disabled = false;
    btnEnvio.style.cursor = "pointer";
    e.target.value = numeroTelFormatado;
  }

  e.target.value = numeroTelFormatado !== null ? numeroTelFormatado : numeroTel;
});
