/* Ez a kód felel a chat itemek megjelenéséért, majd eltünéséért. */

const chatItemek = document.querySelectorAll(".chat-item");
let index = 0;

function mutat() {
  if (index < chatItemek.length) {
    chatItemek[index].style.visibility = "visible";
    chatItemek[index].style.opacity = 1;

    index++;
  } else {
    chatItemek.forEach((item) => {
      item.style.visibility = "hidden";
      item.style.opacity = 0;
      item.style.transition = "visibility 0.3s linear, opacity 0.3s linear";
    });
    index = 0;
  }
}

function indít() {
  setInterval(mutat, 2000);
}

indít();

/* Ez a kód felel a hamburger menüért. */

const mainMenu = document.getElementById("main-menu");
const closeMenu = document.getElementById("close-menu");
const openMenu = document.getElementById("open-menu");
const menu_items = document.querySelectorAll("nav #main-menu li a");

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close);

menu_items.forEach((item) => {
  item.addEventListener("click", function () {
    close();
  });
});

function show() {
  mainMenu.style.top = "0";
}
function close() {
  mainMenu.style.top = "-100%";
}

/* Ez a kód felel az index oldalon található statisztikai mutatók számlálójáért */

window.addEventListener("scroll", () => {
  const szamolok = document.querySelectorAll(".fact-item h1");

  szamolok.forEach((szamolo) => {
    const rect = szamolo.getBoundingClientRect();
    const teljesenLathato = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (teljesenLathato && szamolo.getAttribute("data-animated") !== "true") {
      szamolo.setAttribute("data-animated", "true");
      szamolo.innerText = 0;

      const cel = parseInt(szamolo.dataset.count);
      const idotartam = 2000;
      const lepes = Math.ceil(cel / (idotartam / 10));

      let szam = 0;

      function update() {
        szam += lepes;

        if (szam < cel) {
          szamolo.innerText = szam;
          setTimeout(update, 10);
        } else {
          szamolo.innerText = cel;
        }
      }

      update();
    }
  });
});

/* Ez a kód felel a helpdesk chatért */

const chatBox = document.querySelector(".chat-box");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

let valaszok = [
  "Szia miben segíthetek ?",
  "Sajnos jelenleg minden munkatársunk foglalt.",
  "Remélem max pontos lesz a beadandó.",
  "Máskor is szívesen segítek. Viszlát!",
  "Sajnos az autód teljesen meghibásodott!",
  "Vidd el kérlek egy szerelőhöz az autót!",
  "Próbálj meg szétnézni a motortérben!",
];

function randomValasz(lista) {
  let randomIndex = Math.floor(Math.random() * lista.length);
  return lista[randomIndex];
}

function üzenet(üzenet, küldő) {
  const üzenetDiv = document.createElement("div");
  üzenetDiv.innerText = üzenet;
  üzenetDiv.classList.add(küldő === "user" ? "user-message" : "bot-message");
  chatBox.appendChild(üzenetDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function küldés() {
  const userÜzenet = chatInput.value;
  if (userÜzenet) {
    üzenet(userÜzenet, "user");
    chatInput.value = "";

    setTimeout(() => {
      üzenet(randomValasz(valaszok), "bot");
    }, 500);
  }
}

sendButton.addEventListener("click", küldés);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    küldés();
  }
});
