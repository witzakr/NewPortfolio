const header = document.querySelector(".header-wrapped");

function toggleHeader() {
  if (window.scrollY > 10) header.classList.add("is-visible");
  else header.classList.remove("is-visible");
}

window.addEventListener("scroll", toggleHeader);
toggleHeader(); // run once on load
