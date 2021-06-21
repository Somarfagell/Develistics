
var frontend= 0;
var backend= 0;
var ia= 0;
var videoGames= 0;
var dataScience= 0;
var gustosOrdenados = [];
var backendDB, frontendDB, iaDB, videoGamesDB,dataScienceDB;

const db = firebase.firestore();

const botonEnviar = document.getElementById("recuperar");


botonEnviar.addEventListener('click',()=>{
 
  let checados = document.querySelectorAll('.input');
  let valores = [];
  checados.forEach(elemento =>{
    if(elemento.checked == true){
      valores.push(elemento.name);
    }
  })

  console.log(valores);
  if(valores){
    calcularDatos(valores);
  }
  window.open('../graficas/graficas.html');
  
});

//posibles valores:
/*
  muyDeAcuerdo = 5
  deAcuerdo = 2
  niDeAcuerdo = 0 
  enDesacuerdo = -2
  totalDesacuerdo = -5 

  idea: ir sumando puntos, vemos cuando fue el total de puntos acumulados, y de ahi hacer porcentajes
  a cuanto equivale determinada cantidad de puntos con respecto al total acumulado

*/



async function calcularDatos(valores){
  /*
    let frontend,backend,videojuegos,datascience,entre otros
  */

  //Hacer esto por las 16 preguntas pero personalizar a que areas se le suma/resta segun 
  //el contexto de la pregunta
  if(valores[0] == 'muyDeAcuerdo'){
    frontend += 5;
    backend += 5;
    videoGames += 5;
  }else if(valores[0] == 'deAcuerdo'){
    frontend += 2;
    backend += 2;
    videoGames += 2;
  }

  if(valores[1] == 'muyDeAcuerdo'){
    ia += 5;
  }else if(valores[1] == 'deAcuerdo'){
    ia += 2;
  }

  if(valores[2] == 'muyDeAcuerdo'){
    dataScience += 5;
    backend += 5;
  }else if(valores[2] == 'deAcuerdo'){
    dataScience += 2;
    backend += 2;
  }

  if(valores[3] == 'muyDeAcuerdo'){
    backend+=5;
    frontend +=5;
  }else if(valores[3] == 'deAcuerdo'){
    backend+=2;
    frontend +=2;
  }


  if(valores[4] == 'muyDeAcuerdo'){
    videoGames += 5;
    dataScience += 5;
  }else if(valores[4] == 'deAcuerdo'){
    videoGames += 2;
    dataScience += 2;
  }

  if(valores[5] == 'muyDeAcuerdo'){
    frontend += 5;
    videoGames += 5;
  }else if(valores[5] == 'deAcuerdo'){
    frontend += 2;
    videoGames += 2;
  }

  if(valores[6] == 'muyDeAcuerdo'){
    backend += 5;
    ia += 5;
  }else if(valores[6] == 'deAcuerdo'){
    backend += 2;
    ia += 2;
  }

  if(valores[7] == 'muyDeAcuerdo'){
    backend += 5;
    videoGames += 5;
  }else if(valores[7] == 'deAcuerdo'){
    backend += 2;
    videoGames += 2;
  }

  if(valores[8] == 'muyDeAcuerdo'){
    videoGames+=5;
  }else if(valores[8] == 'deAcuerdo'){
    videoGames+=2;
  }

  if(valores[9] == 'muyDeAcuerdo'){
    backend+= 5;
    frontend +=5;
  }else if(valores[9] == 'deAcuerdo'){
    backend+= 2;
    frontend +=2;
  }

  if(valores[10] == 'muyDeAcuerdo'){
    frontend += 5;
    backend += 5;
    videoGames += 5;
  }else if(valores[10] == 'deAcuerdo'){
    frontend += 2;
    backend += 2;
    videoGames += 2;
  }

  if(valores[11] == 'muyDeAcuerdo'){
    frontend += 5;
    backend += 5;
    videoGames += 5;
  }else if(valores[11] == 'deAcuerdo'){
    frontend += 2;
    backend += 2;
    videoGames += 2;
  }

  if(valores[12] == 'muyDeAcuerdo'){
    frontend += 5;
  }else if(valores[12] == 'deAcuerdo'){
    frontend += 2;
  }

  if(valores[13] == 'muyDeAcuerdo'){
    frontend += 5;
    backend +=5;
    ia += 5;
    dataScience += 5;
    videoGames += 5;
  }else if(valores[13] == 'deAcuerdo'){
    frontend += 5;
    backend +=5;
    ia += 5;
    dataScience += 5;
    videoGames += 5;
  }

  if(valores[14] == 'muyDeAcuerdo'){
   frontend += 5;
   videoGames += 5;
  }else if(valores[14] == 'deAcuerdo'){
    frontend += 2;
    videoGames += 2;
  }

  if(valores[15] == 'muyDeAcuerdo'){
    frontend += 5;
    videoGames += 5;
  }else if(valores[15] == 'deAcuerdo'){
    frontend += 2;
    videoGames += 2;
  }
  //Una vez se suma/resta subir los resultados por medio de un update de firebase

  //Organzando los datos para obtener los primeros 3 más altos mas los porcentajes

  let objGustos = { 
        ia, 
        frontend, 
        backend,
        videoGames,
        dataScience
  };

  let puntosTotales = ia + frontend + backend + videoGames + dataScience;

  gustosOrdenados = Object.entries(objGustos).sort(([,a],[,b]) => b-a);

  let porcA = (gustosOrdenados[0][1] * 100) / puntosTotales;
  let porcB = (gustosOrdenados[1][1] * 100) / puntosTotales;
  let porcC = (gustosOrdenados[2][1] * 100) / puntosTotales;
  let porcD = (gustosOrdenados[3][1] * 100) / puntosTotales;
  let porcE = (gustosOrdenados[4][1] * 100) / puntosTotales;

  let porcentajes = [porcA,porcB,porcC,porcD,porcE];
  
  //Guardando en localStorage para ahorrar consultas en la db
  localStorage.setItem('myStatistics',JSON.stringify(gustosOrdenados));
  localStorage.setItem('my%',JSON.stringify(porcentajes));

  //Obtener valores actuales de la db
  let getAnalitics = () => db.collection('statistics').get();
  
  const querySnapshot = await getAnalitics();
  querySnapshot.forEach(element => {
      setearValores(element.data());
  });
  

  //Setear nuevos valores en la db

  if(gustosOrdenados[0][0] == 'backend'){
      await db.collection('statistics').doc('AhWGCwSLV1KoO2oFboqs').update({
        backend:backendDB+1,
      });
    }else if(gustosOrdenados[0][0] == 'frontend'){
      await db.collection('statistics').doc('AhWGCwSLV1KoO2oFboqs').update({
        frontend:frontendDB+1,
    });
    }else if(gustosOrdenados[0][0] == 'ia'){
      await db.collection('statistics').doc('AhWGCwSLV1KoO2oFboqs').update({
        ia:iaDB+1,
    })
    }else if(gustosOrdenados[0][0] == 'dataScience'){
      await db.collection('statistics').doc('AhWGCwSLV1KoO2oFboqs').update({
        dataScience:dataScienceDB+1,
    })
    }else if(gustosOrdenados[0][0] == 'videoGames'){
      await db.collection('statistics').doc('AhWGCwSLV1KoO2oFboqs').update({
        videogames:videoGamesDB+1,
    });
  }
  

  

  return;

}

function setearValores(valores){
  frontendDB = valores.frontend;
  backendDB = valores.backend;
  iaDB = valores.ia;
  dataScienceDB = valores.datascience;
  videoGamesDB = valores.videogames;
}