document.getElementById('formLoginAdmin').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpa qualquer rastro de login anterior
    localStorage.clear();

    const nomeInput = document.getElementById('nomeAdmin').value.trim().toLowerCase();
    const senhaInput = document.getElementById('senhaAdmin').value;

    // --- CONFIGURAÇÃO DOS PERFIS ---
    // Verifique se os nomes das fotos na sua pasta 'img' são exatamente esses
    const admins = {
        "mery": { 
            senha: "MERY", 
            foto: "img/mery.jpg", 
            nomeExibicao: "Mery Chacale" 
        },
        "dalton": { 
            senha: "DALTON", 
            foto: "img/dalton.jpg", 
            nomeExibicao: "Dalton Gabriel" 
        }
    };

    if (admins[nomeInput] && admins[nomeInput].senha === senhaInput) {
        localStorage.setItem('adminLogado', 'true');
        localStorage.setItem('adminNome', admins[nomeInput].nomeExibicao);
        localStorage.setItem('adminFoto', admins[nomeInput].foto);
        
        window.location.href = "painel-admin.html";
    } else {
        alert("Nome ou Senha incorretos!");
    }
});