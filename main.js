//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;


function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");

  // Modificar/completar
  casillerosSinDescubrir=COLUMNAS * FILAS;
  
  ponerMinasTablero();
  
}


function draw() {
  if (hizoClick == true)
  {
    if (mouseButton==LEFT){

      if(tieneMinaCasillero(columnaPresionada,filaPresionada)==true)
      {
        perder();
      }
      else
      {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //pinta el casillero clickeado. Modificar/completar
        descubrirCasillero(columnaPresionada,filaPresionada);
        if (ganoElJuego()==true){
          ganar();
        }
      }
    }
    if(mouseButton==RIGHT){
      pintarCasillero(columnaPresionada,filaPresionada,COLOR_CASILLERO_MARCADO);

    }
    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }

}


function ganoElJuego()
{
  if (casillerosSinDescubrir==CANTIDAD_MINAS){
    return true;
  }
  else{
    return false;
  }   
}

function ponerMinasTablero()
{
  // Modificar/completar
  let minas=0;
  while (minas<CANTIDAD_MINAS){
    let numeroRandomCol=Math.floor(Math.random()*COLUMNAS);
    let numeroRandomFil=Math.floor(Math.random()*FILAS);
    if(!tieneMinaCasillero(numeroRandomCol,numeroRandomFil)){
      ponerMinaCasillero(numeroRandomCol,numeroRandomFil);
      minas++;
    }
 
  }
  
}
    
  


function mostrarMinas()
{
  // Modificar/completar
  for (let k=0;k<COLUMNAS;k++){
    for (let j=0;j<FILAS;j++){
      if(tieneMinaCasillero(k,j)){
        pintarCasillero(k,j,COLOR_CASILLERO_CON_MINA);
      }
      
    }

  }
}

function contarMinasAlrededor(columna, fila)
{
 let cont=0;
 let array_1=[0,1,1,1,0,-1,-1,-1]
 let array_2=[-1,-1,0,1,1,1,0,-1]
 for (let i=0;i<8;i++){
  if(tieneMinaCasillero(columna+array_1[i],fila+array_2[i])){
    cont++;
  }

 }
  return cont;   //Esto hace que SIEMPRE cuente 9 minas alrededor. Modificar/completar
}
