const ctx = document.getElementById('kpspChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Sesuai', 'Meragukan', 'Penyimpangan'],
    datasets: [{
      label: 'Jumlah Anak',
      data: [35, 8, 4], // NANTI DIAMBIL DARI SPREADSHEET
      backgroundColor: ['#198754','#ffc107','#dc3545']
    }]
  },
  options: {
    responsive: true,
    plugins:{
      legend:{display:false}
    }
  }
});
