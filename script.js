// SELETORES
const getElement = (id) => document.getElementById(id);
const btnShoot = document.querySelector(".btn");

// GERA UM NUMERO ALEATORIO
const randomInt = Math.floor(Math.random() * 101);
console.log("Valor:", randomInt); // TESTE PARA VALIDAR FUNÇÃO

//PEGA VALOR DO INPUT
const inputElement = getElement("value");
let getValue = () => Number(inputElement.value);

//TESTAR DE ESCOPO NÚMERO
const valid = (value) => value < 0 || value > 100;
let tries = 10;

// LÓGICA DICA PARA ADIVINHAR
let tipUp = Math.min(100, randomInt +10);
let tipDown = Math.max(0, randomInt - 10);

// TESTE DE CONDIÇÃO DE VITÓRIA
function endGame (message, victory){
    const result = getElement("result");
    result.textContent = message;
    result.style.color = victory ? "green" : "red";

    btnShoot.disabled = true;
    inputElement.disabled = true;
    btnShoot.style.cursor = "not-allowed";
    btnShoot.style.background = "gray";

    // CRIA UM BOTÃO DE REINÍCIO QUANDO O JOGO ACABA
    const btnRestart = document.createElement("button");
    btnRestart.textContent = "Jogar novamente";
    btnRestart.className = "btn";
    btnRestart.onclick = () => location.reload();
    btnShoot.parentElement.appendChild(btnRestart);
}

// LÓGICA PARA JOGAR
function shoot() {
    //PEGA O VALOR INDICADO NO INPUT
    const playerNumber = getValue();

    //VALIDAR ESCOPO
    if(inputElement.value === '' || valid(playerNumber)){
        alert("Valor nulo ou está fora do escopo de 0 à 100")
        return
    }

    // CONTAGEM DE TENTATIVAS RESTANTES
    tries--;
    const tryText = getElement("tries");
    tryText.textContent = `Tentativas restantes: ${tries}`
    console.log(tries); // TESTE PARA VALIDAR FUNÇÃO

    // CONDIÇÃO DE VITÓRIA
    if (playerNumber === randomInt){
        endGame(`Você acertou! O número era ${randomInt}`, true);
        return
    }

    // CONDIÇÃO DE DERROTA
    if(tries === 0){
        endGame(`Você perdeu! O número era ${randomInt}`, false);
        return;
    }
    
    //DICA DE MAIOR/MENOR
    const result = getElement("result");
    if (playerNumber > randomInt){
        result.textContent = `Errou! Seu número é maior!`
    } else {
        result.textContent = `Errou! Seu número é menor!`
    }
}