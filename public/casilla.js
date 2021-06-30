class Casilla{

    constructor(x, y){
        this.x = x;
        this.y = y;
        this.visitada = false;
        this.movimientosNoProbados = movimientos.slice();
    }

    draw(){
        circle(this.x*res,this.y*res,res/2);
    }
    
    movimientosValidos(){
        let movimientosValidos = []
        for(let i = 0; i < this.movimientosNoProbados.length; i++){
            let m = this.movimientosNoProbados[i];
            if(this.x+m.dx >= 0 && this.y+m.dy >= 0 && this.x+m.dx < sizeX/res && this.y+m.dy < sizeY/res){
                if(!mapa[this.x+m.dx][this.y+m.dy].visitada){
                    movimientosValidos.push(m);                    
                }
            }
        }
        return movimientosValidos;
    }

    resetMovimientosProbados(){
        this.movimientosNoProbados = movimientos.slice();
    }

    removeMovimiento(m){
        for(let i = 0; i < this.movimientosNoProbados.length; i++){
            if(this.movimientosNoProbados[i].dx == m.dx && this.movimientosNoProbados[i].dy == m.dy){
                this.movimientosNoProbados.splice(i, 1);
            }
        }
    }
}