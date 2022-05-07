//movimento do cenário
const SCENARIO_TIME = 30; // in milisseconds
const SCENARIO_SHIFT = 1;

//movimento do herói
const UP = 87;
const DOWN = 83;
const FIRE = 68;
const HERO_TOP = 0;
const HERO_BOTTOM = 450;
const SHIFT = 10;

//movimento do inimigo
const ENEMY_TOP = 0;
const ENEMY_BOTTOM = 334;
const ENEMY_LEFT = 0;
const ENEMY_RIGHT = 694;
const ENEMY_SPEED = 5;


function start() {
    //some com as instruções iniciais
    $("#inicio").hide();

    //inclui elementos na tela
    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    //principais variáveis do jogo
    var jogo = {};
    var velocidade = ENEMY_SPEED;
    var posicaoY = parseInt(Math.random() * ENEMY_BOTTOM + ENEMY_TOP);

    var TECLA = { W: UP, S: DOWN, D: FIRE }
    jogo.pressionou = [];


    //game Loop
    jogo.timer = setInterval(loop, SCENARIO_TIME);


    //verifica se o usuário pressionou alguma tecla	
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });
    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });


    //loop
    function loop() {
        movefundo();
        moveinimigo1();
        movejogador();
    }


    //Função que movimenta o fundo do jogo
    function movefundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - SCENARIO_SHIFT);
    } // fim da função movefundo()


    //função que movimento o herói
    function movejogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - SHIFT);
        }

        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + SHIFT);
        }

        if (jogo.pressionou[TECLA.D]) {
            //Chama função Disparo	
        }

        if (topo <= TOPO) {
            $("#jogador").css("top", topo + SHIFT);
        }

        if (topo >= CHAO) {
            $("#jogador").css("top", topo - SHIFT);
        }

    }

    //função que movimenta o helicóptero inimigo
    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX - velocidade);
        $("#inimigo1").css("top",posicaoY);
            
        if (posicaoX <= ENEMY_LEFT) {
            posicaoY = parseInt(Math.random() * ENEMY_BOTTOM + ENEMY_TOP);
            $("#inimigo1").css("left", ENEMY_RIGHT);
            $("#inimigo1").css("top", posicaoY);
        }
    }
    
}
