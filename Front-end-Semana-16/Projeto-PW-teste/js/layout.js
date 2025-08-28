function loadLayout(id, file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao carregar: " + file);
      return response.text();
    })
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((error) => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadLayout("header", "layout/header.html");
  loadLayout("footer", "layout/footer.html");
});
