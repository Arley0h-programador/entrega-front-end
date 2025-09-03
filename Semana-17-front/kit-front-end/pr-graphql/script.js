async function consultar() {
    const query = `
      {
        countries {
          code
          name
          capital
        }
      }
    `;
  
    try {
      const resposta = await fetch("https://countries.trevorblades.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
  
      const dados = await resposta.json();
      const lista = dados.data.countries.slice(0, 5);
      document.getElementById("resultado").innerHTML =
        lista.map(p => `<p>${p.name} - Capital: ${p.capital}</p>`).join("");
    } catch (erro) {
      document.getElementById("resultado").innerText = "Erro: " + erro.message;
    }
  }
  