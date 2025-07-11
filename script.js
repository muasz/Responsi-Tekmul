const soalData = [
  {
    pertanyaan: "Apa tujuan utama dari SDG 4?",
    pilihan: [
      "Memberantas kemiskinan",
      "Meningkatkan kualitas pendidikan",
      "Mengurangi emisi karbon"
    ],
    jawaban: 1
  },
  {
    pertanyaan: "Apa yang menjadi tantangan terbesar dalam akses pendidikan di daerah terpencil?",
    pilihan: [
      "Banyaknya restoran cepat saji",
      "Kurangnya transportasi dan fasilitas",
      "Terlalu banyak sekolah"
    ],
    jawaban: 1
  },
  {
    pertanyaan: "Siapa yang berhak mendapatkan pendidikan?",
    pilihan: [
      "Hanya orang kaya",
      "Hanya laki-laki",
      "Semua orang tanpa kecuali"
    ],
    jawaban: 2
  },
  {
    pertanyaan: "Apa dampak dari pendidikan yang buruk?",
    pilihan: [
      "Kesenjangan sosial meningkat",
      "Semua orang menjadi kaya",
      "Bumi menjadi lebih dingin"
    ],
    jawaban: 0
  },
  {
    pertanyaan: "Apa contoh tindakan mendukung SDG 4?",
    pilihan: [
      "Menjual buku bekas ke pemulung",
      "Memberi donasi untuk pendidikan",
      "Melarang anak sekolah"
    ],
    jawaban: 1
  }
];

let indeksSoal = 0;
let skor = 0;

function mulaiKuis() {
  document.querySelector(".start-btn").style.display = "none";
  document.getElementById("kuis").classList.remove("tersembunyi");
  tampilkanSoal();
}

function tampilkanSoal() {
  const container = document.getElementById("soal-container");
  const soal = soalData[indeksSoal];

  let html = `<div class="soal">
    <p><strong>Pertanyaan ${indeksSoal + 1}:</strong> ${soal.pertanyaan}</p>`;

  soal.pilihan.forEach((pilihan, i) => {
    html += `<button onclick="periksaJawaban(${i})">${String.fromCharCode(97 + i)}. ${pilihan}</button>`;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function periksaJawaban(pilihanUser) {
  const soal = soalData[indeksSoal];
  const hasil = document.getElementById("hasil");

  if (pilihanUser === soal.jawaban) {
    skor++;
    hasil.textContent = "✅ Jawaban benar!";
    hasil.style.color = "green";
    mainkanSuara("correct_chime.mp3");
  } else {
    hasil.textContent = "❌ Jawaban salah!";
    hasil.style.color = "red";
    mainkanSuara("wrong_buzzer.mp3");
  }

  // Tunda pindah soal 1 detik
  setTimeout(() => {
    hasil.textContent = "";
    indeksSoal++;
    if (indeksSoal < soalData.length) {
      tampilkanSoal();
    } else {
      tampilkanNilaiAkhir();
    }
  }, 1000);
}

function tampilkanNilaiAkhir() {
  const container = document.getElementById("soal-container");
  container.innerHTML = `
    <h2>🎉 Kuis Selesai!</h2>
    <p>Skor Anda: ${skor} dari ${soalData.length}</p>
    <p>${skor >= 4 ? "Hebat! Kamu memahami pentingnya pendidikan!" : "Tetap semangat belajar ya!"}</p>
    <button onclick="location.reload()">🔁 Ulangi Kuis</button>
  `;
  mainkanSuara("tamat.mp3");
}

function mainkanSuara(nama) {
  const audio = new Audio(`sounds/${nama}`);
  audio.play();
}

function mulaiKuis() {
  document.querySelector(".start-btn").style.display = "none";
  document.getElementById("kuis").classList.remove("tersembunyi");

  mainkanSuara("button_click.mp3");

  // Mainkan narasi pengantar kuis
  const narasi = document.getElementById("narasi");
  narasi.play();
}
