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

//movimento do disparo
const SHOT_SPEED = 15;
const SHOT_LEFT = 0;
const SHOT_RIGHT = 900;
var podeAtirar = true;


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
        colisao();
    } //fim loop()


    //Função que movimenta o fundo do jogo
    function movefundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - SCENARIO_SHIFT);
    } //fim movefundo()


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
            disparo();
        }

        if (topo <= HERO_TOP) {
            $("#jogador").css("top", topo + SHIFT);
        }

        if (topo >= HERO_BOTTOM) {
            $("#jogador").css("top", topo - SHIFT);
        }

    } //fim movejogador()


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
    } //fim moveinimigo1()
    

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	    $("#inimigo2").css("left", posicaoX - ENEMY2_SPEED);
				
		if (posicaoX <= ENEMY2_LEFT) {			
		    $("#inimigo2").css("left", ENEMY2_RIGHT);
		}
    } //fim moveinimigo2()


    function moveamigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX + FRIEND_SPEED);
                    
        if (posicaoX > FRIEND_RIGHT) {
            $("#amigo").css("left", FRIEND_LEFT);
        }
    } //fim moveamigo()

} //fim start()


function disparo() {
	if (podeAtirar==true) {
        podeAtirar=false;
        
        topo = parseInt($("#jogador").css("top"))
        posicaoX= parseInt($("#jogador").css("left"))
        tiroX = posicaoX + 190;
        topoTiro = topo + 37;

        //cria div disparo
        $("#fundoGame").append("<div id='disparo'></div");
        $("#disparo").css("top", topoTiro);
        $("#disparo").css("left", tiroX);
        
        var tempoDisparo = window.setInterval(executaDisparo, 30);	
	}
 
    function executaDisparo() {
        posicaoX = parseInt($("#disparo").css("left"));
        $("#disparo").css("left",posicaoX+15); 

        if (posicaoX>900) {
            window.clearInterval(tempoDisparo);
            tempoDisparo=null;
            $("#disparo").remove();
            podeAtirar=true;
        }
    } //fim executaDisparo()

} //fim disparo()


function colisao() {
    var colisao1 = ($("#jogador").collision($("#inimigo1")));

    // jogador com o inimigo1    
    if (colisao1.length > 0) {
        inimigo1X = parseInt($("#inimigo1").css("left"));
        inimigo1Y = parseInt($("#inimigo1").css("top"));
        explosao1(inimigo1X, inimigo1Y);

        posicaoY = parseInt(Math.random() * 334);
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);
    }
    
} //fim colisao()

//explosão 1
function explosao1(inimigo1X, inimigo1Y) {
	$("#fundoGame").append("<div id='explosao1'></div");
	$("#explosao1").css("background-image", "url(imgs/explosao.png)");
	var div = $("#explosao1");
	div.css("top", inimigo1Y);
	div.css("left", inimigo1X);
	div.animate({width: 200, opacity: 0}, "slow");
	
	var tempoExplosao=window.setInterval(removeExplosao, 1200);
	
    function removeExplosao() {
        div.remove();
        window.clearInterval(tempoExplosao);
        tempoExplosao = null;
    }
		
} //fim explosao1()
    