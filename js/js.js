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

//movimento do helicóptero inimigo
const ENEMY1_TOP = 0;
const ENEMY1_BOTTOM = 334;
const ENEMY1_LEFT = 0;
const ENEMY1_RIGHT = 694;
const ENEMY1_SPEED = 5;

//movimento do caminhão inimigo
const ENEMY2_LEFT = 0;
const ENEMY2_RIGHT = 694;
const ENEMY2_SPEED = 3;

//movimento do amigo
const FRIEND_LEFT = 0;
const FRIEND_RIGHT = 906; 
const FRIEND_SPEED = 1;


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
    var velocidade = ENEMY1_SPEED;
    var posicaoY = parseInt(Math.random() * ENEMY1_BOTTOM + ENEMY1_TOP);

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
        moveinimigo2();
        moveamigo();
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

        if (topo <= HERO_TOP) {
            $("#jogador").css("top", topo + SHIFT);
        }

        if (topo >= HERO_BOTTOM) {
            $("#jogador").css("top", topo - SHIFT);
        }

    }

    //função que movimenta o helicóptero inimigo
    function moveinimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX - velocidade);
        $("#inimigo1").css("top",posicaoY);
            
        if (posicaoX <= ENEMY1_LEFT) {
            posicaoY = parseInt(Math.random() * ENEMY1_BOTTOM + ENEMY1_TOP);
            $("#inimigo1").css("left", ENEMY1_RIGHT);
            $("#inimigo1").css("top", posicaoY);
        }
    }
    

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	    $("#inimigo2").css("left", posicaoX - ENEMY2_SPEED);
				
		if (posicaoX <= ENEMY2_LEFT) {			
		    $("#inimigo2").css("left", ENEMY2_RIGHT);
		}
    }


    function moveamigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX + FRIEND_SPEED);
                    
        if (posicaoX > FRIEND_RIGHT) {
            $("#amigo").css("left", FRIEND_LEFT);
        }
    }

}
