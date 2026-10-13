/* =========================================================
   TEMPLATE ADVOCACIA BLACK & GOLD — JavaScript
   ========================================================= */

/* ---- CONFIGURAÇÃO POR CLIENTE ---- */
const CONFIG = {
  genero: "f",                           // "f" = Dra./advogada  |  "m" = Dr./advogado
  whatsapp: "5511900000000",             // DDI + DDD + número (só dígitos)
  mensagem: "Olá! Gostaria de agendar uma reunião.",
  tempoCarrossel: 6000
};

/* Gênero automático: <span data-g="Dr.|Dra.">  -> escolhe o texto antes/depois do "|".
   Para um profissional fixo (ex.: sócio homem + sócia mulher) use data-gen="m" ou "f" no próprio elemento. */
document.querySelectorAll("[data-g]").forEach(el => {
  const fem = (el.dataset.gen || CONFIG.genero) === "f";
  el.textContent = el.dataset.g.split("|")[fem ? 1 : 0];
});

/* Links do WhatsApp em todo [data-wpp] */
document.querySelectorAll("[data-wpp]").forEach(el => {
  el.href = `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${encodeURIComponent(CONFIG.mensagem)}`;
  el.target = "_blank"; el.rel = "noopener";
});

/* Menu mobile */
const burger = document.getElementById("burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => { burger.classList.toggle("open"); menu.classList.toggle("open"); });
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); menu.classList.remove("open"); }));

/* Header ganha fundo ao rolar */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* Animação de entrada */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* Contadores animados: <b data-count="1200" data-prefix="+" data-suffix="%"> */
const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, pre = el.dataset.prefix || "", suf = el.dataset.suffix || "", step = Math.max(1, end / 60); let n = 0;
  const t = setInterval(() => { n = Math.min(end, n + step); el.textContent = pre + Math.floor(n) + suf; if (n >= end) clearInterval(t); }, 25);
  co.unobserve(el);
}));
document.querySelectorAll("[data-count]").forEach(el => co.observe(el));

/* Carrossel de depoimentos */
const slides = document.querySelectorAll(".slide"), dots = document.getElementById("dots"); let atual = 0, timer;
slides.forEach((_, i) => { const b = document.createElement("button"); b.setAttribute("aria-label", "Depoimento " + (i + 1)); b.onclick = () => { ir(i); reiniciar(); }; dots.appendChild(b); });
function ir(i) { atual = i; slides.forEach((s, k) => s.classList.toggle("active", k === i)); dots.querySelectorAll("button").forEach((b, k) => b.classList.toggle("active", k === i)); }
function reiniciar() { clearInterval(timer); timer = setInterval(() => ir((atual + 1) % slides.length), CONFIG.tempoCarrossel); }
ir(0); reiniciar();

document.getElementById("year").textContent = new Date().getFullYear();
