(function () {
  // ===============================
  // CREATE WIDGET
  // ===============================
  if (document.getElementById('wa-cs-widget')) return;

  const wrapper = document.createElement('form');
  wrapper.id = 'wa-cs-widget';
  wrapper.classList.add('wa-cs-widget');
  wrapper.target = '_blank';

  wrapper.innerHTML = `
<!-- Floating Button Container -->
<div id="wa-support-container" class="wa-support-container noprint">
  <!-- Main Button -->
  <div id="wa-support-main-btn" class="wa-support-main-btn" title="Layanan Pelanggan">
    <img class="wa-support-logo"
      src="https://panel.erzap.com/assets/support-icon-09-a7d78a115d7bacbc191c2b01e13d609a25a0e3d6c2e1ef6a454351c0611281c9.png"
      alt="Support icon 09">
  </div>

  <!-- Hide/Show Toggle Badge -->


  <!-- Form Popup -->
  <div id="wa-support-popup" class="wa-support-popup" style="display: none;">
    <div class="wa-support-popup-header">
      <span><img style="width: 20px; height: 20px; border-radius: 50%; vertical-align: middle; margin-right: 8px;"
          src="https://bitshared.my.id/partdistro/icon.png" alt="Support icon 09"> Layanan Pelanggan</span>
      <span id="wa-support-close" class="wa-support-close">&times;</span>
    </div>

    <!-- Form View -->
    <div id="wa-support-form-view" class="wa-support-popup-body" style="display: block;">
      <div class="wa-support-field">
        <label for="wa_support_email">Email</label>
        <input type="text" id="wa_support_email" name="email" class="form-control" placeholder="Masukkan email Anda"
          required="" autocomplete="off">
      </div>
      <div class="wa-support-field">
        <label for="wa_support_hp">No.hp</label>
        <input type="text" id="wa_support_hp" nama="hp" class="form-control" placeholder="Nomer handphone yang Terdaftar"
          required="" autocomplete="off">
      </div>
      <div class="wa-support-field">
        <label for="wa_support_kendala">Kendala Yang Dialami</label>
        <textarea id="wa_support_kendala" name="kendala" class="form-control" rows="4"
          placeholder="Jelaskan kendala Anda..." required="" autocomplete="off"></textarea>
      </div>
      <button type="submit" class="wa-support-submit-btn">
        <i class="fa fa-paper-plane"></i> Kirim
      </button>
    </div>

    <!-- Success View -->
    <div id="wa-support-success-view" class="wa-support-popup-body" style="display: none;">
      <div class="wa-support-success-message">
        <i class="fa fa-check-circle"></i>
        <p>Pesan berhasil dikirim Padistro!</p>
        <p class="wa-support-success-note">Jika masih ada kendala. Silakan kirim pesan Lagi.</p>
      </div>
      <a href="https://panel.erzap.com/#" id="wa-support-back-btn" class="wa-support-back-link">
        <i class="fa fa-arrow-left"></i> Kirim Kendala Lain
      </a>
    </div>
  </div>
</div>`;

  document.body.appendChild(wrapper);

  // ===============================
  // ELEMENT REFERENCES
  // ===============================
  const container = document.getElementById('wa-support-container');
  const mainBtn = document.getElementById('wa-support-main-btn');
  const popup = document.getElementById('wa-support-popup');
  const closeBtn = document.getElementById('wa-support-close');
  const formView = document.getElementById('wa-support-form-view');
  const successView = document.getElementById('wa-support-success-view');
  const backBtn = document.getElementById('wa-support-back-btn');
  const namaField = document.getElementById('wa_support_email');
  const nohp = document.getElementById('wa_support_hp');
  const kendalaField = document.getElementById('wa_support_kendala');

  const STORAGE_KEY = 'wa_support_hidden';
  const NAMA_STORAGE_KEY = 'wa_support_email';

  // ===============================
  // FUNCTIONS
  // ===============================
  function showPopup() {
    popup.style.display = 'block';
    formView.style.display = 'block';
  

    successView.style.display = 'none';

    if (namaField.value.trim()) {
      nohp.focus();
    } else {
      namaField.focus();
    }

    if (nohp.value.trim()) {
      kendalaField.focus();
    } else {
      nohp.focus();
    }
  }

  function closePopup() {
    popup.style.display = 'none';
    
  }

  function showSuccess() {
    formView.style.display = 'none';
    successView.style.display = 'block';
  }

  function saveNama() {
    if (namaField.value.trim()) {
      sessionStorage.setItem(NAMA_STORAGE_KEY, namaField.value.trim());
    }
  }

  function loadSavedNama() {
    const saved = sessionStorage.getItem(NAMA_STORAGE_KEY);
    if (saved) namaField.value = saved;
  }

  // ===============================
  // EVENTS
  // ===============================

  // Toggle popup
  mainBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (popup.style.display === 'block') {
      closePopup();
    } else {
      showPopup();
    }
  });

  // Close button
  closeBtn.addEventListener('click', closePopup);

  // Close when click outside
  document.addEventListener('click', function (e) {
    if (!popup.contains(e.target) && !mainBtn.contains(e.target)) {
      closePopup();
    }
  });

  // Submit form
  wrapper.addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = namaField.value.trim();
    const tlp = nohp.value.trim();
    const kendala = kendalaField.value.trim();

    if (!nama || !tlp || !kendala) {
      alert("email,no hp dan Kendala wajib diisi");
      return;
    }

    saveNama();

    const nomorTujuan = "6285188188189";

    const pesan =
      `Halo Admin Partdistro,

email: ${nama}

Tlp: ${tlp}

Kendala:
${kendala}

Mohon bantuannya.`;

    const url = "https://wa.me/" + nomorTujuan +
      "?text=" + encodeURIComponent(pesan);

    window.open(url, "_blank");

    showSuccess();
  });

  // Back button
  backBtn.addEventListener('click', function (e) {
    e.preventDefault();
    kendalaField.value = '';
    formView.style.display = 'block';
    successView.style.display = 'none';
  });

  // ===============================
  // INIT
  // ===============================
  loadSavedNama();

})();
