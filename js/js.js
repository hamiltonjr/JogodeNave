//movimento do cenário
const SCENARIO_TIME = 30; // in milisseconds
const SCENARIO_SHIFT = 1;

//movimento do herói
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
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    //sons
    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");

    //Música em loop
    musica.addEventListener("ended", function () { musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    //principais variáveis do jogo
    var jogo = {};
    var velocidade = ENEMY1_SPEED;
    var posicaoY = parseInt(Math.random() * ENEMY1_BOTTOM + ENEMY1_TOP);

    //teclas
    var TECLA = {
        FIRE: 32,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
    };

    jogo.pressionou = [];
    var energiaAtual = 3;
    var fimdejogo = false;
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;


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
        placar();
        energia();
    } //fim loop()


    //Função que movimenta o fundo do jogo
    function movefundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda - SCENARIO_SHIFT);
    } //fim movefundo()


    //função que movimento o herói
    function movejogador() {
        if (jogo.pressionou[TECLA.ARROW_UP]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - SHIFT);
        }

        if (jogo.pressionou[TECLA.ARROW_DOWN]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + SHIFT);
        }

        if (jogo.pressionou[TECLA.FIRE]) {
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
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

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
        $("#amigo").css("left", posicaoX + FRIEND_SPEED);

        if (posicaoX > FRIEND_RIGHT) {
            $("#amigo").css("left", FRIEND_LEFT);
        }
    } //fim moveamigo()


    function disparo() {
        if (podeAtirar == true) {
            podeAtirar = false;

            somDisparo.play();
            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;

            //cria div disparo
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30);
        }

        //executa disparo preparado por esta função disparoo()
        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);

            if (posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        } //fim executaDisparo()
    } //fim disparo()


    //colisões
    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));

        //jogador com o inimigo1    
        if (colisao1.length > 0) {
            //explosão
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            //reposição do inimigo
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

            energiaAtual--;
        }

        //jogador com o inimigo2 
        if (colisao2.length > 0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);

            $("#inimigo2").remove();
            reposicionaInimigo2();

            energiaAtual--;
        }

        //disparo com o inimigo1
        if (colisao3.length > 0) {
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

            pontos = pontos + 100;
            velocidade = velocidade + 0.1;
        }

        //disparo com o inimigo2	
        if (colisao4.length > 0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);

            reposicionaInimigo2();
            pontos = pontos + 50;
        }

        //jogador com o amigo	
        if (colisao5.length > 0) {
            somResgate.play();
            reposicionaAmigo();
            $("#amigo").remove();
            salvos++;
        }

        //inimigo2 com o amigo		
        if (colisao6.length > 0) {
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX, amigoY);
            $("#amigo").remove();

            reposicionaAmigo();
            perdidos++;
        }
    } //fim colisao()


    //explosão 1
    function explosao1(inimigo1X, inimigo1Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        $("#explosao1").css("top", inimigo1Y);
        $("#explosao1").css("left", inimigo1X);
        $("#explosao1").animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        //remove explosão preparada por esta funçãoexplosão1()
        function removeExplosao() {
            $("#explosao1").remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        } //fim removeExplosao()
    } //fim explosao1()


    //explosão 2
    function explosao2(inimigo2X, inimigo2Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);
        //remove explosão preparada por esta funçãoexplosão2()
        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }//fim removeExplosao2()
    } //fim explosao2()


    //explosão3
    function explosao3(amigoX, amigoY) {
        somPerdido.play();
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);
        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);

        // remove explosão prepadada por essa função explosao3()
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;
        } // fim resetaExplosao3()
    } //fim explosao3()

    //reposiciona inimigo2
    function reposicionaInimigo2() {
        var tempoColisao4 = window.setInterval(reposiciona4, 5000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id=inimigo2></div");
            }
        } //fim reposiciona4()
    } //fim reposicionaInimigo2()


    //reposiciona amigo
    function reposicionaAmigo() {
        var tempoAmigo = window.setInterval(reposiciona6, 6000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
        } //fim reposiciona6()
    } //fim reposicionaAmigo()


    //atualiza o placar
    function placar() {
        $("#placar").html("<h2>" + " Pontos: " + pontos +
            " Salvos: " + salvos +
            " Perdidos: " + perdidos +
            "</h2>"
        );
    } //fim da função placar()

    //Barra de energia

    function energia() {
        if (energiaAtual == 3) {
            $("#energia").css("background-image", "url(imgs/energia3.png)");
        } else if (energiaAtual == 2) {
            $("#energia").css("background-image", "url(imgs/energia2.png)");
        } else if (energiaAtual == 1) {
            $("#energia").css("background-image", "url(imgs/energia1.png)");
        } else if (energiaAtual == 0) {
            $("#energia").css("background-image", "url(imgs/energia0.png)");

            //Game Over
        }
    } // Fim da função energia()

} // fim start()
