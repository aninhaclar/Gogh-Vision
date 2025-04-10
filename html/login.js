document.querySelector("button").addEventListener("click", async () => {
    const email = document.querySelector("input[type='email']").value;
    const senha = document.querySelector("input[type='password']").value;
  
    try {
      const resposta = await fetch("https://suaapi.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });
  
      const dados = await resposta.json();
      if (resposta.ok) {
        localStorage.setItem("token", dados.token);
        window.location.href = "home.html";
      } else {
        alert(dados.mensagem || "Erro ao fazer login.");
      }
    } catch (erro) {
      alert("Erro na conexão com a API.");
    }
  });
  
  
  
  
  
  