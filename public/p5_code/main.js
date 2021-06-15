let res = 10;
let mapa =[];
let path = [];
let movimientos = [{dx:1,dy:0}, {dx:-1,dy:0}, {dx:0,dy:1}, {dx:0,dy:-1}];
let size = 500;
let save;

function setup() {
  canvas = createCanvas(size, size);
  //2DArray
  for(let i = 0; i < size/res; i++){
    mapa[i]=[];
    for(let j = 0; j < size/res;j++){
        mapa[i].push(new Casilla(i, j));
    }
  }
  path.push(mapa[0][0]);
  mapa[0][0].visitada = true;

  //save = new Save();
}

function draw() {
  background(30);
  //frameRate(1);
  translate(res/2, res/2);
  let head = path[path.length - 1];
  let dir = random(head.movimientosValidos());
  if(path.length == size/res * size/res){
      noLoop();
  }
  else if(dir == null){
    let cas = path.pop();
    cas.visitada = false;
    cas.resetMovimientosProbados();
    
  }else{
    path.push(mapa[head.x+dir.dx][head.y+dir.dy]);
    mapa[head.x+dir.dx][head.y+dir.dy].visitada = true;
    head.removeMovimiento(dir);
  }
  strokeWeight(res/8);
  stroke(255);
  for(let i = 0; i < path.length; i++){
    if(i < path.length-1){
        beginShape()
        vertex(path[i].x*res, path[i].y*res);
    }
    path[i].draw();
    if(i < path.length-1){
        vertex(path[i+1].x*res, path[i+1].y*res);
        endShape();
    }
  }
}

