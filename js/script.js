document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const contactConfirmation = document.getElementById("contactConfirmation");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Sayfanın yenilenmesini önle

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Lütfen tüm alanları eksiksiz doldurun.");
            return;
        }

        console.log("Mesaj Gönderildi:", { name, email, message });

        contactConfirmation.classList.remove("hidden"); // Onay mesajını göster
        contactForm.reset(); // Formu sıfırla
    });
});
