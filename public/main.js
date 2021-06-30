let res = 10;
let mapa =[];
let path = [];
let movimientos = [{dx:1,dy:0}, {dx:-1,dy:0}, {dx:0,dy:1}, {dx:0,dy:-1}];
let sizeX;
let sizeY;
let save;
let autoGuardado = 0;
let s1 = false;
let s2 = false;
let origen;

function httpPostAA(theUrl, map)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl); // false for synchronous request
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xmlHttp.send(JSON.stringify(map));
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4) {
        if(s1){
          s2 = true;
        }
        else{
          s1 = true;
        }
      }
    }
}

function httpPostCargar(theUrl)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl); // false for synchronous request
  xmlHttp.send(null);

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4) {
      mapa = JSON.parse(xmlHttp.response);
      s1 = true;
    }
  }
  return xmlHttp.response;
}

function httpPostCargar2(theUrl)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl); // false for synchronous request
  xmlHttp.send(null);

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4) {
      path = JSON.parse(xmlHttp.response);
      s2 = true;
    }
  }
  return xmlHttp.response;
}

function setup() {
  sizeX = 800;
  sizeY = 800;
  canvas = createCanvas(sizeX+300, sizeY);
  //2DArray
  for(let i = 0; i < sizeX/res; i++){
    mapa[i]=[];
    for(let j = 0; j < sizeY/res;j++){
        mapa[i].push(new Casilla(i, j));
    }
  }
  s1 = true;
  s2 = true;
  httpPostCargar("/cargar");
  httpPostCargar2("/cargar2");
  origen = new Date(Date.parse("30 Jun 2021 16:00:00 GMT+02"))
  //path.push(mapa[0][0]);
  //mapa[0][0].visitada = true;
}

function draw() {
  background(30);
  //frameRate(1);
  translate(res/2, res/2);
  if(s1 && s2){
    //Procesar
    let head = Object.assign(new Casilla(), path[path.length - 1]);
    let dir = random(head.movimientosValidos());
    if(path.length == sizeX/res * sizeY/res){
        noLoop();
    }
    else if(dir == null){
      let cas = Object.assign(new Casilla(), path.pop());
      cas.visitada = false;
      cas.resetMovimientosProbados();
      
    }else{
      path.push(mapa[head.x+dir.dx][head.y+dir.dy]);
      mapa[head.x+dir.dx][head.y+dir.dy].visitada = true;
      head.removeMovimiento(dir);
    }
    //Guardar
    if(autoGuardado > 500){
      autoGuardado = 0;
      s1 = false;
      s2 = false;
      httpPostAA("/guardar", mapa);
      httpPostAA("/guardar2", path);
    }
    autoGuardado++;
  }
  //Pintar
  strokeWeight(res/8);
  stroke(255);
  for(let i = 0; i < path.length; i++){
    if(i < path.length-1){
        beginShape()
        vertex(path[i].x*res, path[i].y*res);
    }
    noStroke();
    Object.assign(new Casilla(), path[i]).draw();
    strokeWeight(res/8);
    stroke(255);
    if(i < path.length-1){
        vertex(path[i+1].x*res, path[i+1].y*res);
        endShape();
    }
  }
  horaLateral()
}

function horaLateral(){
  fill(120);
  rect(800, 0, 290, 790);
  textSize(50);
  textFont("monospace");

  var hoy = new Date();
  var tiempoPasado= hoy - origen;
  var segs = 1000;
  var mins = segs * 60;
  var hours = mins * 60;
  var days = hours * 24;
  var months = days * 30.416666666666668;
  var years = months * 12;

  //calculo 
  var anos = Math.floor(tiempoPasado / years);

  tiempoPasado = tiempoPasado - (anos * years);
  var meses = Math.floor(tiempoPasado / months)

  tiempoPasado = tiempoPasado - (meses * months);
  var dias = Math.floor(tiempoPasado / days)

  tiempoPasado = tiempoPasado - (dias * days);
  var horas = Math.floor(tiempoPasado / hours)

  tiempoPasado = tiempoPasado - (horas * hours);
  var minutos = Math.floor(tiempoPasado / mins)

  tiempoPasado = tiempoPasado - (minutos * mins);
  var segundos = Math.floor(tiempoPasado / segs);

  text('Y: '+anos, 820, 100+50*1.2);
  text('M: '+meses, 820, 100+100*1.2);
  text('D: '+dias, 820, 100+150*1.2);
  text('H: '+horas, 820, 100+200*1.2);
  text('M: '+minutos, 820, 100+250*1.2);
  text('S: '+segundos, 820, 100+300*1.2);
  fill(255);
}

