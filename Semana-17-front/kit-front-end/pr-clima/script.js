async function buscarClima() {
  const input = document.getElementById("cidade");
  let cidade = (input.value || "").trim();
  const resultadoEl = document.getElementById("resultado");

  if (!cidade) {
    resultadoEl.innerText = "Digite o nome da cidade antes de buscar.";
    return;
  }

  const chave = "f4cc20d00eac52ff11060c16b232acef"; // sua key
  const q = encodeURIComponent(cidade);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${chave}&units=metric&lang=pt_br`;

  resultadoEl.innerText = "Carregando... (verifique o console também)";

  try {
    const resposta = await fetch(url);
    console.log("URL requisitada:", url);
    console.log("Status:", resposta.status, resposta.statusText);

    // pega o texto da resposta para debug (pode ser JSON ou mensagem)
    const texto = await resposta.text();
    console.log("Resposta crua:", texto);

    // tenta parsear JSON
    let dados;
    try {
      dados = JSON.parse(texto);
    } catch (e) {
      throw new Error("Resposta não é JSON válido: " + texto);
    }

    if (!resposta.ok) {
      // mensagens específicas
      if (resposta.status === 401) throw new Error("401 - Chave de API inválida ou não ativada.");
      if (resposta.status === 404) throw new Error("404 - Cidade não encontrada. Tente 'Sao Paulo' ou 'Sao Paulo,BR'.");
      if (resposta.status === 429) throw new Error("429 - Limite de requisições atingido (rate limit).");
      throw new Error(dados.message || "Erro desconhecido da API");
    }

    // sucesso: exibe dados de forma amigável
    resultadoEl.innerHTML = `
      <strong>${dados.name}, ${dados.sys?.country ?? ''}</strong><br>
      🌡️ Temperatura: ${dados.main.temp} °C<br>
      💧 Umidade: ${dados.main.humidity}%<br>
      ☁️ Clima: ${dados.weather[0].description}<br>
      <hr>
      <details style="max-width:600px">
        <summary>JSON completo (depuração)</summary>
        <pre>${JSON.stringify(dados, null, 2)}</pre>
      </details>
    `;
  } catch (erro) {
    console.error("Erro ao buscar clima:", erro);
    resultadoEl.innerText = "Erro: " + erro.message;
  }
}