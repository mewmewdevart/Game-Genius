/* 
                    ╔═╦═╗
                    ║║║║╠═╦╦╦╦══╦═╦╦╦╗
                    ║║║║║╩╣║║║║║║╩╣║║║
Developed By:       ╚╩═╩╩═╩══╩╩╩╩═╩══╝
*/

let order = [];
let clickedOrder = []; //Ordem dos clicks
let score = 0; //Contagem 
var somGameover=document.getElementById("somGameover"); //Som de GameOver
var somDoGreen=document.getElementById("somDoGreen");
var somDoRed=document.getElementById("somDoRed");
var somDoYellow=document.getElementById("somDoYellow");
var somDoBlue=document.getElementById("somDoBlue");
somGameover.volume = 0.2;
//somNextLevel.volume = 0.2;
somDoGreen.volume = 0.2;
somDoRed.volume = 0.2;
somDoYellow.volume = 0.2;
somDoBlue.volume = 0.2;

// 0 = Verde/Green
// 1 = Vermelho/Red
// 2 = Amarelo/Yellow
// 3 = Azul/Blue

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');


//Cria ordem aleatoria de cores
let shuffleOrder = () => {
    // Cria uma cor randomica  a cada rodada
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        //Salva a cor sorteada
        let elementColor = createColorElement(order[i]);
        //Acende a cor sorteada
        lightColor(elementColor, Number(i) + 1);
    }

}

//Acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;

    // Ativa a cor pelo CSS
    setTimeout(() => {
        element.classList.add('selected');

    }, number - 250);

    // Desativa a cor
    setTimeout(() => {
        element.classList.remove('selected');

    });
}

//Checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {

    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

//Função para o click do usuario
let click = (color) => {

    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {

        createColorElement(color).classList.remove('selected');
        checkOrder();

    },250);
}

//Função que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        somDoGreen.play(0);
        return green;

    } else if(color == 1) {
        somDoRed.play(0);
        return red;

    } else if (color == 2) {
        somDoYellow.play(0);
        return yellow;

    } else if (color == 3) {
        somDoBlue.play(0);
        return blue;
    }
}

//Função para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//Função derrota
let gameOver = () => {
    somGameover.play();
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Função que inicia o jogo

let playGame = () => {
    alert('Bem vindo ao Genius! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

//Eventos de clique
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();