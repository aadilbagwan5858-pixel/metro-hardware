const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const contact = {
  name: "METRO HARDWARE",
  phone: "9823071886",
  phone2: "7385585833",
  address: "Opp. Ashok Talkies, Polan Peth, Jalgaon, Maharashtra"
};

function saveVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${contact.name}`,
    `ORG:${contact.name}`,
    `TEL;TYPE=CELL:${contact.phone}`,
    `TEL;TYPE=WORK:${contact.phone2}`,
    `ADR;TYPE=WORK:;;${contact.address};;;;`,
    "NOTE:Plumbing • Sanitary • Hardware",
    "END:VCARD"
  ].join("\\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Metro-Hardware.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function shareCard() {
  const shareData = {
    title: "METRO HARDWARE",
    text: "METRO HARDWARE - Plumbing, Sanitary & Hardware | Jalgaon"
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (_) {}
  } else {
    await navigator.clipboard.writeText(window.location.href);
    alert("Digital card link copied!");
  }
}

document.getElementById("saveContact").addEventListener("click", saveVCard);
document.getElementById("saveContact2").addEventListener("click", saveVCard);
document.getElementById("shareCard").addEventListener("click", shareCard);
document.getElementById("shareTop").addEventListener("click", shareCard);

document.getElementById("enquiryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  const text =
    `Hello METRO HARDWARE,%0A%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Mobile: ${encodeURIComponent(phone)}%0A` +
    `Requirement: ${encodeURIComponent(message)}`;

  window.open(`https://wa.me/919823071886?text=${text}`, "_blank");
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.img;
    lightbox.classList.add("open");
  });
});

document.getElementById("closeLightbox").addEventListener("click", () => {
  lightbox.classList.remove("open");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("open");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("open");
});
