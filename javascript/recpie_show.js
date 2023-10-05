// card layout data showing using localstorage

function clickhide(ti) {
  localStorage.setItem("Recpies_item", ti.innerHTML.slice(9,));
  location.href = "Recpie_show.html";
}
