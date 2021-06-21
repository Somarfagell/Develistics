const db = firebase.firestore();

const line = document.getElementById('myLineChart').getContext('2d');
const radar = document.getElementById('myRadarChart').getContext('2d');
const dona = document.getElementById('miDoughnutChart').getContext('2d');
const barra = document.getElementById('myBarChart').getContext('2d');
var frontendDB = 0,backendDB = 0,iaDB = 0,datascienceDB = 0,videogamesDB = 0;

const getAnalitics = () => db.collection('statistics').get();
const onGetAnalitics = (callback) => db.collection('statistics').onSnapshot(callback);

window.addEventListener('DOMContentLoaded', async (e)=>{
  const querySnapshot = await getAnalitics();
  querySnapshot.forEach(element => {
    setearGraficas(element.data());
  });

})

function setearGraficas(valores){
  frontendDB = valores.frontend;
  backendDB = valores.backend;
  iaDB = valores.ia;
  datascienceDB = valores.datascience;
  videogamesDB = valores.videogames;

  let misPorc = JSON.parse(localStorage.getItem('my%'));
  let myStatistics = JSON.parse(localStorage.getItem('myStatistics'));

  //Datos recabados de todos los participantes
  const graficaDona = new Chart(dona,{
    type: 'doughnut',
    data:{
      labels: [
        'Web Frontend',
        'Web Backend',
        'Videogames Developer',
        'DataScience',
        'IA',
      ],
      datasets: [{
        label: 'Estadísticas alrededor del mundo (Numero de desarrolladores por área)',
        data: [frontendDB,backendDB,videogamesDB,datascienceDB,iaDB],
        backgroundColor: [
          'rgb(216, 58, 86)',
          'rgb(255, 97, 109)',
          'rgb(255, 234, 201)',
          'rgb(102, 222, 147)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 10
      }],
      options:{
        responsive: true
      }
    }
    }
    );

    //La misma de arriba pero en radar y con porcentajes
    let total_desarrolladores = frontendDB+backendDB+videogamesDB+datascienceDB+iaDB;
    let porcDesarrolladores = [];

    porcDesarrolladores.push((frontendDB*100)/total_desarrolladores);
    porcDesarrolladores.push((backendDB*100)/total_desarrolladores);
    porcDesarrolladores.push((videogamesDB*100)/total_desarrolladores);
    porcDesarrolladores.push((datascienceDB*100)/total_desarrolladores);
    porcDesarrolladores.push((iaDB*100)/total_desarrolladores);

    const myRadarChart = new Chart(radar,{
      type:'radar',
      data:{
        labels: [
          'Web Frontend',
          'Web Backend',
          'Videogames Developer',
          'DataScience',
          'IA',
        ],
        datasets: [{
          label: 'El resto del Mundo (%)',
          data: [porcDesarrolladores[0], porcDesarrolladores[1], porcDesarrolladores[2], porcDesarrolladores[3], porcDesarrolladores[4]],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }],
        options:{
          responsive: true
        }
      }
      }
    );

  //Mis datos
  const myLineChart = new Chart(line,{
    type: 'line',
      data:{ //objeto data
        labels: [ // Labels de la parte de abajo
          myStatistics[0][0].toLowerCase(),
          myStatistics[1][0].toLowerCase(),
          myStatistics[2][0].toLowerCase(),
          myStatistics[3][0].toLowerCase(),
          myStatistics[4][0].toLowerCase()
        ],
        datasets: [{
          label: 'Mis estadísticas (%)',
          backgroundColor: 'rgb(60, 141, 173)',
          borderColor: 'rgb(18, 93, 152)',
          data: [misPorc[0],misPorc[1],misPorc[2],misPorc[3],misPorc[4]],
        }]
      },
      options: {
        responsive: true
      }
    }
  );

  //mis mejores campos
  const graficaBar = new Chart(barra,{
    type: 'bar',
    data:{
        labels: [myStatistics[0][0], myStatistics[1][0], myStatistics[2][0] ],
        datasets: [{
          label: 'valor(%) ',
          data: [myStatistics[0][1],myStatistics[1][1],myStatistics[2][1]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
    }
    } 
    );
  
 
}





