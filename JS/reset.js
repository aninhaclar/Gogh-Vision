document.querySelector("button").addEventListener("click", async () => {
    const email = document.querySelector("input[type='email']").value;
    const pergunta = document.querySelector("input[type='text']").value;
    const novaSenha = document.querySelector("input[type='password']").value;
  
    try {
      const resposta = await fetch("https://back-spider.vercel.app/user/RememberPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pergunta, novaSenha })
      });
  
      const dados = await resposta.json();
      if (resposta.ok) {
        alert("Senha redefinida com sucesso!");
        window.location.href = "index.html";
      } else {
        alert(dados.mensagem || "Erro ao redefinir senha.");
      }
    } catch (erro) {
      alert("Erro na conexão com a API.");
    }
  });
  