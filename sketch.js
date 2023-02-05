//VARIÁVEIS BOLINHA
let xB = 300;//LOCAL
let xvelocidadeB = 6;//MOVIMENTAR
let yB = 200;//LOCAL
let yvelocidadeB = 6;//MOVIMENTAR
let diametroB = 13;//DIÁMETRO
let raioB = diametroB / 2;//RAIO
//VARIÁVEIS BOLINHA

//VARIÁVEIS RAQUETE ALIADA
let xR = 5;//LOCAL
let yR = 150;//LOCAL
let comprimentoR = 10;//COMPRIMENTO
let alturaR = 90;//ALTURA
let colidiuR = false;
//VARIÁVEIS RAQUETE ALIADA

//VARIÁVEIS RAQUETE INIMIGA
let xR2 = 585;//LOCAL
let yR2 = 150;//LOCAL
let erraR2 = 0;//CHANCE DE ERRAR
//VARIÁVEIS RAQUETE INIMIGA

//PLACAR
let pontosA = 0;//PONTOS ALIADOS
let pontosI = 0;//PONTOS INIMIGOS
//PLACAR

//SONS
let raquetada;
let ponto;
let trilha;
//SONS

function preload(){
  raquetada = loadSound("sounds/raquetada.mp3");
  ponto = loadSound("sounds/ponto.mp3");
  trilha = loadSound("sounds/trilha.mp3");
}

function setup() {
  createCanvas(600, 400);//TAMANHO
  trilha.loop();
}

function draw() {
  background(0);//COR

  //BOLINHA
  mostraB();
  movimentarB();
  colisaobordasB();
  //BOLINHA

  //RAQUETE ALIADA
  mostraR(xR, yR);
  movimentarR();
  colisaoR(xR, yR, comprimentoR, alturaR);
  //RAQUETE ALIADA

  //RAQUETE INIMIGA
  mostraR(xR2, yR2);
  movimentarR2();
  colisaoR(xR2, yR2, comprimentoR, alturaR);
  //multiplayer();
  //RAQUETE INIMIGA

  //PLACAR
  mostraP();
  marcaP();
  //PLACAR

  bug1();
}

function mostraB(){
  circle(xB, yB, diametroB);//MOSTRAR BOLINHA
}

function movimentarB(){
  xB += xvelocidadeB;//MOVIMENTAR BOLINHA
  yB += yvelocidadeB;//MOVIMENTAR BOLINHA
}

function colisaobordasB(){
  if (xB + raioB > width || xB - raioB < 0){//RECONHEÇER BORDA X
     xvelocidadeB *= -1;//RECONHEÇER BORDA X
  }
  if (yB + raioB > height || yB - raioB < 0){//RECONHEÇER BORDA Y
     yvelocidadeB *= -1;//RECONHEÇER BORDA Y
  }
}

function mostraR(x, y){
  rect(x, y, comprimentoR, alturaR);//MOSTRAR RAQUETE
}

function movimentarR(){
  if (keyIsDown(UP_ARROW)){//RAQUETE ALIADA PARA CIMA
     yR -= 10;//RAQUETE ALIADA PARA CIMA
  }
  if (keyIsDown(DOWN_ARROW)){//RAQUETE ALIADA PARA BAIXO
     yR += 10;//RAQUETE ALIADA PARA BAIXO
  }
}

function colisaoR(x, y, comprimento, altura){
  colidiuR = collideRectCircle(x, y, comprimento, altura, xB, yB, raioB);
  if (colidiuR){
     xvelocidadeB *= -1
     raquetada.play();
  }
}

function movimentarR2(){
  yvelocidadeR2 = yB - yR2 - comprimentoR /2 - 30;//SEQUIR A      BOLINHA
  yR2 += yvelocidadeR2;//SEQUIR A BOLINHA
  erra();
}

function erra(){
  if (pontosI >= pontosA) {
     erraR2 += 1
  if (erraR2 >= 39){
     erraR2 = 40
    }
  } else {
    erraR2 -= 1
    if (erraR2 <= 35){
    erraR2 = 35
    }
  }
}

function mostraP(){
  stroke(255);//CONTORNO
  textAlign(CENTER);//CENTRO
  textSize(16);//TAMANHO
  fill(color(0, 0, 200));//AZUL
  rect(150, 10, 40, 20);//RETANGULO
  fill(255);//BRANCO
  text(pontosA, 170, 26);//PONTOS ALIADOS
  fill(color(0, 0, 200));//AZUL
  rect(450, 10, 40, 20);//RETANGULO
  fill(255);//BRANCO
  text(pontosI, 470, 26);//PONTOS INIMIGOS
  fill(color(0, 200, 0));//VERDE
}

function marcaP(){
  if (xB > 593){//VERIFICAR PASSAGEM INIMIGA
     pontosA += 1;//ADICIONAR UM PONTO ALIADO
     ponto.play();//SOM
  }
  if (xB < 7){//VERIFICAR PASSAGEM ALIADA
     pontosI += 1;//ADICIONAR UM PONTO INIMIGA
     ponto.play();//SOM
  }
}

function multiplayer(){
  if (keyIsDown(87)){//TECLA W PRESIONADA
     yR2 -= 10;//RAQUETE PRA CIMA
  }
  if (keyIsDown(83)){//TECLA S PRESSIONADA
     yR2 += 10;//RAQUETE PRA BAIXO
  }
}

function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}

function bug1(){
    if (xB - raioB < 0){
    xB = 23;
    }
}
