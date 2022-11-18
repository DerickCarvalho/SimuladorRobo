// Robo

let robo = document.getElementById('robo');
let passoY = 150;
let passoX = 0;
let rotacao = 0;

// Coloca sujeira em um local aleatório e faz o loop para verificar se o robô passou por ela e limpou

let opcoesX = [50,100,150,200,250]; let opcoesY = [50,100,150];

let dirt = document.getElementById('dirt');

let posicaoX = Math.floor(Math.random() * 5); let posicaoY = Math.floor(Math.random() * 2);
dirt.style.marginLeft = `${opcoesX[posicaoX]}px`; dirt.style.marginTop = `${opcoesY[posicaoY]}px`;

console.log(`${posicaoX}, ${posicaoY}`)

console.log(`${opcoesX[posicaoX]}, ${opcoesY[posicaoY]}`)

let verificaLimpeza = setInterval(() => {
    setTimeout(() => {
        if (passoX == opcoesX[posicaoX] && passoY == opcoesY[posicaoY]) {
            dirt.style.display = 'none';
        }
    }, 250);
}, 250);

// Comandos

let comandos = document.getElementById('commands'); let coordenadas = document.getElementById('coordenadas');

// Reiniciar simulação

document.getElementById('resetar').addEventListener('click', () => {
    location.reload();
});

// Informações Finais

let orientacao = ''; let coordenadaX = 0; let coordenadaY = 0;

// Botões

let up = document.getElementById('up'); let down = document.getElementById('down');
let rotateRight = document.getElementById('90deg_right'); let rotateLeft = document.getElementById('90deg_left');
let ok = document.getElementById('ok_button');

// Rotação Direita

rotateRight.addEventListener('click', () => {
    if (rotacao < 270) {
        rotacao += 90;
        robo.style.rotate = `${rotacao}deg`
        comandos.value += 'D';
    }
    else if (rotacao == 270) {
        rotacao = 0;
        robo.style.rotate = `${rotacao}deg`
        comandos.value += 'D';
    }
});

// Rotação esquerda

rotateLeft.addEventListener('click', () => {
    if (rotacao == 0) {
        rotacao = 270;
        robo.style.rotate = `${rotacao}deg`
        comandos.value += 'E';
    }
    else if (rotacao == 90) {
        rotacao = 0;
        robo.style.rotate = `${rotacao}deg`
        comandos.value += 'E';
    } 
    else if (rotacao == 180) {
        rotacao = 90;
        robo.style.rotate = `${rotacao}deg`
        comandos.value += 'E';
    }
    else if (rotacao == 270) {
        rotacao = 180;
        robo.style.rotate = `${rotacao}deg`
        comandos.value += 'E';
    }
});

// Botão para cima

up.addEventListener('click', () => {
    if (rotacao == 0) {
        if (passoY != 0) {
            passoY -= 50;
            robo.style.marginTop = `${passoY}px`;
            comandos.value += 'F';
            coordenadaY++;
        }
    }
    else if (rotacao == 90) {
        if (passoX != 250) {
            passoX += 50;
            robo.style.marginLeft = `${passoX}px`;
            comandos.value += 'F'
            coordenadaX++;
        }
    }
    else if (rotacao == 180) {
        if (passoY != 150) {
            passoY += 50;
            robo.style.marginTop = `${passoY}px`
            comandos.value += 'F';
            coordenadaY--;
        }  
    }
    else if (rotacao == 270) {
        if (passoX != 0) {
            passoX -= 50;
            robo.style.marginLeft = `${passoX}px`;
            comandos.value += 'F'
            coordenadaX--;
        }
    }
});

// Botão para baixo

down.addEventListener('click', () => {
    if (rotacao == 0) {
        if (passoY != 150) {
            passoY += 50;
            robo.style.marginTop = `${passoY}px`;
            comandos.value += 'T';
            coordenadaY--;
        }
    }
    else if (rotacao == 90) {
        if (passoX != 0) {
            passoX -= 50;
            robo.style.marginLeft = `${passoX}px`;
            comandos.value += 'T'
            coordenadaX--;
        }
    }
    else if (rotacao == 180) {
        if (passoY != 0) {
            passoY -= 50;
            robo.style.marginTop = `${passoY}px`
            comandos.value += 'T';
            coordenadaY++;
        }  
    }
    else if (rotacao == 270) {
        if (passoX != 250) {
            passoX += 50;
            robo.style.marginLeft = `${passoX}px`;
            comandos.value += 'T'
            coordenadaX++;
        }
    }
});

// Botão OK

ok.addEventListener('click', () => {
// Coletando a orientação do robô
    
    switch(rotacao) {
        case 0:
            orientacao = 'N'; // Norte
        break;

        case 90:
            orientacao = 'L'; // Leste
        break;

        case 180:
            orientacao = 'S'; // Sul
        break;

        case 270:
            orientacao = 'O'; // Oeste
        break;
    }

    coordenadas.value = `| Orientação = ${orientacao} | X = ${coordenadaX} | Y = ${coordenadaY} |`;

    let verificacao = setInterval(() => {
        setTimeout(() => {
            if (rotacao != 90) {
                rotacao = 90;
                robo.style.rotate = `${rotacao}deg`;
            }
            if (passoX == 0) {
                rotacao = 0;
                robo.style.rotate = `${rotacao}deg`;
            }
            if(passoX != 0) {               
                passoX -= 50;              
                robo.style.marginLeft = `${passoX}px`;
            }
            else if (passoY != 150) {                
                passoY += 50;
                robo.style.marginTop = `${passoY}px`;
            }
            console.log(`${rotacao}, ${passoX}, ${passoY}, Verificando...`)
        }, 500);
        if (rotacao == 0 && passoX == 0 && passoY == 150) {
            clearInterval(verificacao);
            location.reload();
        }
    }, 500);
});
