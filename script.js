document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil elemen DOM yang akan kita manipulasi
    const monthYearDisplay = document.getElementById('monthYear');
    const calendarDaysGrid = document.querySelector('.calendar-days');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    // 2. Inisialisasi tanggal saat ini
    // Objek Date ini akan menyimpan bulan dan tahun yang sedang ditampilkan
    let currentDate = new Date();

    // 3. Fungsi untuk menampilkan kalender
    function renderCalendar() {
        // Clear semua hari yang sudah ada sebelumnya
        calendarDaysGrid.innerHTML = '';

        // Dapatkan bulan dan tahun dari tanggal saat ini yang sedang ditampilkan
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); // 0 = Januari, 11 = Desember

        // Update tampilan header (misal: "Juni 2024")
        monthYearDisplay.textContent = new Date(year, month).toLocaleString('id-ID', {
            month: 'long',
            year: 'numeric'
        });

        // Tanggal hari ini (untuk menandai "today")
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

        // --- Perhitungan Hari dalam Sebulan ---

        // Dapatkan hari pertama dari bulan ini (misal: 1 Juni 2024)
        // new Date(year, month, 1) -> hari pertama bulan ini
        const firstDayOfMonth = new Date(year, month, 1);
        // Dapatkan hari dalam seminggu untuk hari pertama bulan ini (0 = Minggu, 1 = Senin, dst.)
        const firstDayOfWeek = firstDayOfMonth.getDay();

        // Dapatkan jumlah hari dalam bulan ini
        // new Date(year, month + 1, 0) -> hari terakhir bulan ini (karena 0 hari dari bulan berikutnya)
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Dapatkan jumlah hari dalam bulan sebelumnya (untuk mengisi awal kalender)
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        // --- Tambahkan Hari-hari dari Bulan Sebelumnya (yang terlihat di awal minggu) ---
        // Kita perlu mengisi slot kosong di awal kalender jika hari pertama bukan hari Minggu
        for (let i = firstDayOfWeek; i > 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'inactive');
            dayElement.textContent = daysInPrevMonth - i + 1;
            calendarDaysGrid.appendChild(dayElement);
        }

        // --- Tambahkan Hari-hari dari Bulan Saat Ini ---
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i;

            // Tandai hari ini jika ini adalah bulan dan tahun yang sama
            if (isCurrentMonth && i === today.getDate()) {
                dayElement.classList.add('today');
            }
            calendarDaysGrid.appendChild(dayElement);
        }

        // --- Tambahkan Hari-hari dari Bulan Berikutnya (untuk mengisi sisa grid) ---
        // Kalender biasanya menampilkan 6 baris x 7 hari = 42 sel
        // Kita perlu mengisi sisa sel setelah hari-hari bulan ini
        const totalDaysDisplayed = firstDayOfWeek + daysInMonth;
        const remainingCells = 42 - totalDaysDisplayed; // Targetkan 6 baris penuh
        const nextMonthDaysToShow = remainingCells > 0 ? remainingCells : 0; // Pastikan tidak negatif

        for (let i = 1; i <= nextMonthDaysToShow; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'inactive');
            dayElement.textContent = i;
            calendarDaysGrid.appendChild(dayElement);
        }
    }

    // 4. Fungsi untuk navigasi ke bulan sebelumnya
    function goToPrevMonth() {
        // Kurangi bulan dari tanggal saat ini
        currentDate.setMonth(currentDate.getMonth() - 1);
        // Render ulang kalender dengan bulan yang baru
        renderCalendar();
    }

    // 5. Fungsi untuk navigasi ke bulan berikutnya
    function goToNextMonth() {
        // Tambah bulan ke tanggal saat ini
        currentDate.setMonth(currentDate.getMonth() + 1);
        // Render ulang kalender dengan bulan yang baru
        renderCalendar();
    }

    // 6. Tambahkan Event Listeners ke tombol navigasi
    prevMonthBtn.addEventListener('click', goToPrevMonth);
    nextMonthBtn.addEventListener('click', goToNextMonth);

    // 7. Render kalender saat pertama kali halaman dimuat
    renderCalendar();
});
