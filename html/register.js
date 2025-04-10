document.querySelector("button").addEventListener("click", async () => {
    const nome = document.querySelector("input[placeholder='Nome']").value;
    const email = document.querySelector("input[placeholder='Email']").value;
    const senha = document.querySelector("input[placeholder='Senha']").value;
    const pergunta = document.querySelector("input[placeholder*='recuperação']").value;
  
    try {
      const resposta = await fetch("https://suaapi.com/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, pergunta })
      });
  
      const dados = await resposta.json();
      if (resposta.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
      } else {
        alert(dados.mensagem || "Erro ao cadastrar.");
      }
    } catch (erro) {
      alert("Erro na conexão com a API.");
    }
  });
  
  