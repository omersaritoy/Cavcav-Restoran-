document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reservationForm");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const reservationsList = document.getElementById("reservationsList");

    // Sayfa yüklendiğinde mevcut rezervasyonları göster
    loadReservations();

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Sayfanın yenilenmesini önle

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const guests = document.getElementById("guests").value;

        if (!name || !phone || !date || !time || !guests) {
            alert("Lütfen tüm alanları eksiksiz doldurun.");
            return;
        }

        const reservation = { name, phone, date, time, guests };
        saveReservation(reservation);

        confirmationMessage.classList.remove("hidden"); // Onay mesajını göster
        form.reset(); // Formu sıfırla
    });

    function saveReservation(reservation) {
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        reservations.push(reservation);
        localStorage.setItem("reservations", JSON.stringify(reservations));
        loadReservations();
    }

    function loadReservations() {
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        reservationsList.innerHTML = "";

        if (reservations.length === 0) {
            reservationsList.innerHTML = "<p>Henüz bir rezervasyon yok.</p>";
        } else {
            reservations.forEach((res, index) => {
                const resItem = document.createElement("div");
                resItem.classList.add("reservation-item");
                resItem.innerHTML = `
                    <p><strong>${res.name}</strong> - ${res.date} ${res.time} (${res.guests} kişi)</p>
                    <button class="delete-btn" data-index="${index}">Sil</button>
                `;
                reservationsList.appendChild(resItem);
            });

            // Silme butonlarını ekleyelim
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function () {
                    let index = this.getAttribute("data-index");
                    deleteReservation(index);
                });
            });
        }
    }

    function deleteReservation(index) {
        let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
        reservations.splice(index, 1);
        localStorage.setItem("reservations", JSON.stringify(reservations));
        loadReservations();
    }
});
