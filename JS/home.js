document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    try {
      const resposta = await fetch("https://back-spider.vercel.app/publicacoes/listarPublicacoes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const dados = await resposta.json();
  
      const feed = document.querySelector(".feed");
      feed.innerHTML = "<h2>Feed</h2>" + dados.map(post => `
        <div class="post">
          <p><strong>${post.usuario}:</strong> ${post.mensagem}</p>
        </div>
      `).join("");
    } catch {
      alert("Erro ao carregar o feed.");
    }
  });