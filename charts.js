const ctx = document.getElementById('kpspChart');

let chartKPSP;

// DATA AGREGAT
let kategori = {
  sesuai: 0,
  meragukan: 0,
  penyimpangan: 0
};

// PANGGIL SETELAH DATA FIREBASE TERBACA
function updateChartKPSP() {

  if(chartKPSP) chartKPSP.destroy();

  chartKPSP = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Sesuai', 'Meragukan', 'Penyimpangan'],
      datasets: [{
        label: 'Jumlah Anak',
        data: [
          kategori.sesuai,
          kategori.meragukan,
          kategori.penyimpangan
        ],
        backgroundColor: ['#198754','#ffc107','#dc3545'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins:{
        legend:{display:false},
        tooltip:{
          callbacks:{
            label:(ctx)=> ` ${ctx.raw} anak`
          }
        }
      },
      scales:{
        y:{
          beginAtZero:true,
          ticks:{precision:0}
        }
      }
    }
  });
}
