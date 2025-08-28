document.addEventListener("DOMContentLoaded", () => {
  const quantidadeInputs = document.querySelectorAll(".quantidade");
  const totalCarrinho = document.getElementById("total-carrinho");

  quantidadeInputs.forEach((input) => {
    input.addEventListener("input", () => {
      let total = 0;

      document.querySelectorAll("tbody tr").forEach((tr) => {
        const preco = parseFloat(
          tr.cells[2].textContent.replace("R$ ", "").replace(",", ".")
        );
        const qtd = parseInt(tr.querySelector(".quantidade").value);
        const totalProduto = preco * qtd;

        tr.querySelector(".total-produto").textContent =
          "R$ " + totalProduto.toFixed(2).replace(".", ",");
        total += totalProduto;
      });

      totalCarrinho.textContent = "R$ " + total.toFixed(2).replace(".", ",");
    });
  });
});
