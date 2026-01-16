const ctx = document.getElementById('kpspChart');

let chartKPSP = null;

/* =========================
   VARIABEL AGREGAT
========================= */
let kategori = {
  sesuai: 0,
  meragukan: 0,
  penyimpangan: 0
};

let totalRespon = 0;
let totalTidak = 0;

/* =========================
   RESET DATA
========================= */
function resetAgregat(){
  kategori.sesuai = 0;
  kategori.meragukan = 0;
  kategori.penyimpangan = 0;
  totalRespon = 0;
  totalTidak = 0;
}

/* =========================
   KLASIFIKASI KPSP
   input: jumlah jawaban "Tidak"
========================= */
function klasifikasiKPSP(jumlahTidak){
  if(jumlahTidak <= 2) return 'sesuai';
  if(jumlahTidak <= 5) return 'meragukan';
  return 'penyimpangan';
}

/* =========================
   PROSES DATA FIREBASE
   data = snapshot.val()
========================= */
function prosesDataKPSP(data){
  resetAgregat();

  if(!data) return;

  Object.values(data).forEach(respon => {
    totalRespon++;

    let tidak = 0;

    if(respon.jawaban){
      Object.values(respon.jawaban).forEach(jwb => {
        if(jwb === 'Tidak') tidak++;
      });
    }

    totalTidak += tidak;

    const hasil = klasifikasiKPSP(tidak);
    kategori[hasil]++;
  });

  updateSummary();
  updateChartKPSP();
}

/* =========================
   UPDATE KARTU AGREGAT
========================= */
function updateSummary(){
  document.getElementById('totalAnak').innerText = totalRespon;
  document.getElementById('totalTidak').innerText = totalTidak;
  document.getElementById('totalMeragukan').innerText = kategori.meragukan;
  document.getElementById('totalPenyimpangan').innerText = kategori.penyimpangan;
}

/* =========================
   UPDATE CHART
========================= */
function updateChartKPSP(){

  if(chartKPSP){
    chartKPSP.destroy();
  }

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
            label:(c)=> ` ${c.raw} anak`
          }
        }
      },
      scales:{
        y:{
          beginAtZero:true,
          ticks:{
            precision:0,
            stepSize:1
          }
        }
      }
    }
  });
}

/* =========================
   CONTOH PEMANGGILAN
   (sementara sebelum Firebase)
========================= */
// HAPUS BAGIAN INI SAAT FIREBASE SUDAH AKTIF
const dummyData = {
  a1:{
    jawaban:{q1:'Tidak',q2:'Tidak',q3:'Ya'}
  },
  a2:{
    jawaban:{q1:'Tidak',q2:'Tidak',q3:'Tidak',q4:'Tidak'}
  },
  a3:{
    jawaban:{q1:'Tidak'}
  }
};

prosesDataKPSP(dummyData);
