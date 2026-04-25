// Configurações do seu projeto (Pegue no Console do Firebase)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "seu-clube.firebaseapp.com",
    projectId: "seu-clube",
    storageBucket: "seu-clube.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Esta é a base de dados
/* --- CENTRAL DE COMANDO: NÚCLEO OPERACIONAL --- */

// Configuração de Identidade do Projeto
const configuracaoClube = {
    nome: "Clube Águia",
    local: "Kuito, Bié", // Tua base operacional
    autor: "Mery Chacale" // Assinatura de autoridade
};

// FUNÇÃO 01: CRIAR PERFIL AUTOMÁTICO
// Esta função gera o perfil mal o membro se cadastra
function registrarNovoMembro(nome, unidade, cargo) {
    const novoMembro = {
        id: Date.now(), // Gera um ID único automático
        nome: nome,
        unidade: unidade,
        cargo: cargo,
        classe: "Amigo", // Classe inicial automática
        progresso: 0,
        saude: "OK",
        foto: "img/avatar-padrao.png"
    };

    // Salva no Banco de Dados (Simulado até conectares a chave do Firebase)
    let membros = JSON.parse(localStorage.getItem('membros_clube')) || [];
    membros.push(novoMembro);
    localStorage.setItem('membros_clube', JSON.stringify(membros));

    console.log("Perfil criado com sucesso para: " + nome);
    atualizarInterfacePerfil(novoMembro);
}

// FUNÇÃO 02: INJETAR DADOS NO DESIGN (UI/UX)
// Pega os dados e coloca nas IDs que criaste no teu esqueleto
function atualizarInterfacePerfil(m) {
    if(document.getElementById('exibir-nome')) {
        document.getElementById('exibir-nome').innerText = m.nome;
        document.getElementById('exibir-unidade').innerText = m.unidade;
        document.getElementById('exibir-cargo').innerText = m.cargo;
        // Atualiza a barra de progresso que vimos na tua imagem
        const barra = document.querySelector('.progresso-fill');
        if(barra) barra.style.width = m.progresso + "%";
    }
}

// FUNÇÃO 03: GESTÃO DE TEMA (MODO ESCURO/CLARO)
// O código que faz as tuas definições funcionarem de verdade
function aplicarTema(modo) {
    if (modo === 'escuro') {
        document.body.classList.add('dark-mode');
        localStorage.setItem('tema', 'escuro');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('tema', 'claro');
    }
}

// Executa ao carregar para o site não iniciar "morto"
window.onload = () => {
    const temaSalvo = localStorage.getItem('tema');
    if(temaSalvo) aplicarTema(temaSalvo);
    console.log("Sistema Clube Águia Operacional. Comandante: " + configuracaoClube.autor);
};
async function registrarNoBanco(nome, unidade, cargo) {
    try {
        // Cria o documento na coleção "membros"
        await db.collection("membros").add({
            nome: nome,
            unidade: unidade,
            cargo: cargo,
            classe: "Amigo",
            progresso: 10, // Inicia com 10% de perfil completo
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log("Comandante Mery, o perfil de " + nome + " foi salvo na nuvem!");
        alert("Perfil criado com sucesso!");
        
        // Recarrega a lista para mostrar a "vida" no site
        location.reload(); 
    } catch (error) {
        console.error("Erro ao salvar: ", error);
        alert("Falha na missão: o sinal com o banco de dados caiu.");
    }
}
// Função Mestre para voltar à página anterior no histórico
function voltarPagina() {
    if (window.history.length > 1) {
        window.history.back(); // Volta exatamente para a página anterior
    } else {
        window.location.href = "index.html"; // Se não houver histórico, vai para a Home por segurança
    }
}
// componentes.js - O MOTOR DE AUTOMAÇÃO DA CHACALE PRODUÇÕES
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INJETAR O BOTÃO VOLTAR (No topo do corpo da página)
    const btnVoltarHTML = `
        <button class="btn-voltar-universal" onclick="window.history.back()" style="margin: 20px; padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
            <i class="fas fa-arrow-left"></i> VOLTAR
        </button>
    `;
    document.body.insertAdjacentHTML('afterbegin', btnVoltarHTML);

    // 2. INJETAR O RODAPÉ (No final do corpo da página)
    const rodapeHTML = `
        <footer class="rodape-global">
            <div class="rodape-container">
                <div class="rodape-info">
                    <img src="https://logodownload.org/wp-content/uploads/2021/04/desbravadores-logo-1.png" alt="Logo IASD" class="logo-rodape">
                    <p>"Visionar o Campo Para Colheita com Garra, Lealdade, Fé e Victória."</p>
                </div>
                <div class="rodape-links">
                    <h4>Navegação</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="noticias.html">Notícias</a></li>
                        <li><a href="cadastro.html">Quero ser Desbravador</a></li>
                    </ul>
                </div>
                <div class="rodape-social">
                    <h4>Siga-nos</h4>
                    <div class="icones-sociais">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>
            <div class="rodape-bottom">
                <p>&copy; 2026 Clube Águia - IASD. Todos os direitos reservados.</p>
                <p class="creditos">Desenvolvido por <span>Chacale Produções</span></p>
            </div>
        </footer>
    `;
    
    // Só adiciona o rodapé se a página já não tiver um
    if (!document.querySelector('.rodape-global')) {
        document.body.insertAdjacentHTML('beforeend', rodapeHTML);
    }
});
// INJEÇÃO DE CAIXAS FLUTUANTES DINÂMICAS - CHACALE PRODUÇÕES
document.addEventListener("DOMContentLoaded", () => {
    const containerFlutuante = document.createElement('div');
    containerFlutuante.id = 'area-flutuante';
    document.body.appendChild(containerFlutuante);

    const conteúdos = [
        { título: "Acampamentos", sub: "Aventuras inesquecíveis", ícone: "fa-tent" },
        { título: "Ordens Unidas", sub: "Disciplina e Civismo", ícone: "fa-marching-boot" },
        { título: "Especialidades", sub: "Aprendizado constante", ícone: "fa-medal" }
    ];

    conteúdos.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `card-flutuante animacao-loop-${index + 1}`;
        card.innerHTML = `
            <div class="card-content">
                <i class="fas ${item.ícone} card-icon"></i>
                <div class="card-text">
                    <strong>${item.título}</strong>
                    <span>${item.sub}</span>
                </div>
            </div>
        `;
        containerFlutuante.appendChild(card);
    });
});
// INJEÇÃO DE CARDS FLUTUANTES - VERSÃO FINAL BLINDADA
document.addEventListener("DOMContentLoaded", () => {
    // 1. Verificar se é a página inicial
    const eHome = window.location.pathname.includes('index.html') || 
                 window.location.pathname.endsWith('/') || 
                 window.location.pathname === '';

    if (eHome) {
        // 2. Criar um container fixo para os cards não fugirem
        const containerCards = document.createElement('div');
        containerCards.id = 'container-cards-chacale';
        document.body.appendChild(containerCards);

        const cardsData = [
            { titulo: "Civismo", sub: "Honra e Pátria", icon: "fa-flag", classe: "pos-1" },
            { titulo: "Aventura", sub: "Explorar o Criador", icon: "fa-compass", classe: "pos-2" },
            { titulo: "Serviço", sub: "Mãos que Ajudam", icon: "fa-hands-helping", classe: "pos-3" }
        ];

        cardsData.forEach(data => {
            const card = document.createElement('div');
            card.className = `card-premium-float ${data.classe}`;
            card.innerHTML = `
                <i class="fas ${data.icon} card-float-icon"></i>
                <div class="card-float-text">
                    <strong>${data.titulo}</strong>
                    <span>${data.sub}</span>
                </div>
            `;
            containerCards.appendChild(card);
        });
        console.log("Cards flutuantes injetados com sucesso pela Chacale Produções!");
    }
});
// FUNÇÃO DE FINALIZAÇÃO DE CADASTRO - CLUBE ÁGUIA
function finalizarCadastro(event) {
    event.preventDefault(); // Impede o recarregamento imediato da página

    // 1. Aqui viria a sua lógica de salvar no Firebase...

    // 2. Notificação de Sucesso (Estilo Simples e Eficaz)
    alert("🦅 VICTÓRIA! Foste cadastrado com sucesso no Clube Águia. Bem-vindo à aventura!");

    // 3. Redirecionamento Automático para a HOME
    window.location.href = "index.html";
}
function notificacaoChacale() {
    const banner = document.createElement('div');
    banner.innerHTML = `
        <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); 
                    background: #003366; color: white; padding: 20px 40px; 
                    border-radius: 15px; border-bottom: 5px solid #fbc02d; 
                    z-index: 9999; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    font-family: sans-serif; text-align: center;">
            <i class="fas fa-check-circle" style="color: #fbc02d; font-size: 24px;"></i><br>
            <strong>CADASTRADO COM SUCESSO!</strong><br>
            <span>A redirecionar para a Home...</span>
        </div>
    `;
    document.body.appendChild(banner);

    // Espera 3 segundos para o usuário ler e depois volta para a Home
    setTimeout(() => {
        window.location.href = "index.html";
    }, 3000);
}