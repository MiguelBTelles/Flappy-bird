console.log('[DevSoutinho] Flappy Bird');


let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura,
        )
    }
};

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )
    }
}
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,

        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;
            chao.x = movimentacao % repeteEm;
        },

        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );

            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            )
        }

    };
    return chao;
}


function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    }

    return false;
}

function criaFlappyBird() {
    const FlappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
        pula() {
            FlappyBird.velocidade = -FlappyBird.pulo
        },

        atualiza() {
            if (fazColisao(FlappyBird, globais.chao)) {
                som_HIT.play();
                mudaParaTela(Telas.GAME_OVER);
                return;
            }

            FlappyBird.velocidade = FlappyBird.velocidade + FlappyBird.gravidade;
            FlappyBird.y = FlappyBird.y + FlappyBird.velocidade;
        },

        movimentos: [
            { spriteX: 0, spriteY: 0 },
            { spriteX: 0, spriteY: 26 },
            { spriteX: 0, spriteY: 52 },
        ],
        frameAtual: 0,
        atualizaOFrameAtual() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (passouOIntervalo) {
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + FlappyBird.frameAtual;
                const baseRepeticao = FlappyBird.movimentos.length;
                FlappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha() {
            FlappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = FlappyBird.movimentos[FlappyBird.frameAtual];

            contexto.drawImage(
                sprites,
                spriteX, spriteY,
                FlappyBird.largura, FlappyBird.altura,
                FlappyBird.x, FlappyBird.y,
                FlappyBird.largura, FlappyBird.altura,
            );
        }
    }
    return FlappyBird;
}
const gameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            gameOver.spriteX, gameOver.spriteY,
            gameOver.largura, gameOver.altura,
            gameOver.x, gameOver.y,
            gameOver.largura, gameOver.altura,
        )

        contexto.font = '25px VT323';
        contexto.fillStyle = 'white';
        contexto.fillText(`${globais.placar.pontuacao}`, 250, 145);

        contexto.font = '25px VT323';
        contexto.fillStyle = 'white';
        contexto.fillText(`${globais.placar.recorde}`, 250, 190);
    },
    atualiza() {

    }
}


function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach(function (par) {
                const espacamentoEntreCanos = 90;
                const yRandom = par.y;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }

            })
        },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappyBird = globais.flappyBird.y;
            const peDoFlappyBird = globais.flappyBird.y + globais.flappyBird.altura;

            if (globais.flappyBird.x + globais.flappyBird.largura >= par.x) {

                if (cabecaDoFlappyBird <= par.canoCeu.y) {
                    return true;
                }

                if (peDoFlappyBird >= par.canoChao.y) {
                    return true;
                };
            }


            return false;
        },

        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                })
            }
            canos.pares.forEach(function (par) {
                par.x = par.x - 2;
                

                if (canos.temColisaoComOFlappyBird(par)) {
                    som_HIT.play();
                    mudaParaTela(Telas.GAME_OVER);
                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift()
                }
            })
        }
    }
    return canos;
}

function criaPlacar() {
    const placar = {
        pontuacao: 0,
        vidas: 3,
        recorde: Number(localStorage.getItem('recorde')) || 0,
        desenha() {
            contexto.font = '25px VT323';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`Pontuação ${placar.pontuacao}`, canvas.width - 10, 35);

            contexto.font = '25px VT323';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`Vidas: ${placar.vidas}`, canvas.width - 10,65);
        },
        atualiza() {
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if (placar.pontuacao > placar.recorde) {
                placar.recorde = placar.pontuacao;
                localStorage.setItem('recorde', placar.recorde);
            }

            if (passouOIntervalo) {
                placar.pontuacao = placar.pontuacao + 1;
            }
        }
    }
    return placar;
}


const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
};

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },

        desenha() {
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    }
};

Telas.JOGO = {
    inicializa() {
        globais.placar = criaPlacar();
    },
    desenha() {
        planoDeFundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
        globais.canos.atualiza();
        globais.chao.atualiza();
        globais.placar.atualiza();
    }
};

Telas.GAME_OVER = {
    desenha() {
        gameOver.desenha();
    },
    atualiza() {

    },
    click() {
        mudaParaTela(Telas.INICIO);
    }
}

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;

    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
})


mudaParaTela(Telas.INICIO);
loop();