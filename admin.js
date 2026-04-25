document.addEventListener('DOMContentLoaded', function() {
    // 1. Manter a foto e nome do Admin (Mery/Dalton)
    const nomeSalvo = localStorage.getItem('adminNome');
    const fotoSalva = localStorage.getItem('adminFoto');
    
    if (document.getElementById('nomeAdminLogado')) {
        document.getElementById('nomeAdminLogado').innerText = nomeSalvo || "Admin";
    }
    if (document.getElementById('fotoAdmin')) {
        document.getElementById('fotoAdmin').src = fotoSalva || "img/default.jpg";
    }

    // 2. Carregar Membros na Tabela
    carregarTabelaMembros();
});

function carregarTabelaMembros() {
    // Dentro da sua função carregarMembros
const linha = `
    <tr>
        <td><img src="${membro.foto}" class="img-admin-mini"></td>
        <td><strong>${membro.nome.split(' ')[0]}</strong></td> <td><small>${membro.unidade}</small></td>
        <td>
            <button onclick="aprovarMembro(${index})" class="btn-aprovar-small">OK</button>
        </td>
    </tr>
`;
    // Pegamos a lista de membros (ou um array vazio se não houver ninguém)
    let membros = JSON.parse(localStorage.getItem('listaMembros')) || [];

    // Se a lista estiver vazia, vamos criar um exemplo para você ver funcionando
    if (membros.length === 0) {
        membros = [{
            id: 1,
            nome: "Recruta Exemplo",
            classe: "Amigo",
            unidade: "Falcão",
            foto: "img/default-user.png",
            status: "Ativo"
        }];
    }

    corpoTabela.innerHTML = ""; // Limpa a tabela

    membros.forEach((membro, index) => {
        corpoTabela.innerHTML += `
            <tr>
                <td><img src="${membro.foto}" class="foto-membro-tabela"></td>
                <td>${membro.nome}</td>
                <td>${membro.classe}</td>
                <td>${membro.unidade}</td>
                <td><span class="status-badge">${membro.status}</span></td>
                <td>
                    <button class="btn-acao ver" onclick="verDetalhes(${index})"><i class="fas fa-eye"></i></button>
                    <button class="btn-acao excluir" onclick="excluirMembro(${index})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function excluirMembro(index) {
    if (confirm("Deseja realmente remover este membro do sistema?")) {
        let membros = JSON.parse(localStorage.getItem('listaMembros')) || [];
        membros.splice(index, 1);
        localStorage.setItem('listaMembros', JSON.stringify(membros));
        carregarTabelaMembros(); // Atualiza a tela
    }
}

function logout() {
    localStorage.removeItem('adminLogado');
    window.location.href = "login-admin.html";
}
document.addEventListener('DOMContentLoaded', function() {
    // 1. Carrega Nome e Foto do Admin (Mery ou Dalton)
    const nome = localStorage.getItem('adminNome');
    const foto = localStorage.getItem('adminFoto');
    // Altere as linhas 79 e 80 para isto:
const elNome = document.getElementById('nomeAdminLogado');
const elFoto = document.getElementById('fotoAdmin');
if (nome && elNome) elNome.innerText = nome;
if (foto && elFoto) elFoto.src = foto;

    // 2. Carrega a lista de membros
    const tabela = document.getElementById('corpoTabela');
    if (tabela) {
        // Pega os dados de quem se cadastrou no site
        const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

        if (usuario) {
            tabela.innerHTML = `
                <tr>
                    <td><img src="${usuario.foto || 'img/default-user.png'}" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid #003366;"></td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.classe}</td>
                    <td>${usuario.unidade || 'Sem Unidade'}</td>
                    <td>
                        <button onclick="imprimirFicha()" title="Imprimir Ficha" style="background:#003366; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer;">
                            <i class="fas fa-print"></i>
                        </button>
                        <button onclick="removerMembro()" title="Excluir" style="background:#cc0000; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer; margin-left:10px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        } else {
            tabela.innerHTML = "<tr><td colspan='5' style='text-align:center; padding:20px;'>Nenhum membro cadastrado no sistema.</td></tr>";
        }
    }
});

function removerMembro() {
    if(confirm("Deseja remover este membro permanentemente?")) {
        localStorage.removeItem('usuarioLogado');
        location.reload();
    }
}

function imprimirFicha() {
    alert("Preparando documento para impressão...");
    window.print(); // Por enquanto abre a janela de impressão da página
}
document.addEventListener('DOMContentLoaded', function() {
    // 1. Carrega dados do Admin
    const nome = localStorage.getItem('adminNome');
    const foto = localStorage.getItem('adminFoto');
    
    // O 'if' evita que o código "quebre" se o elemento não existir na página atual
    if (document.getElementById('nomeAdminLogado')) {
        document.getElementById('nomeAdminLogado').innerText = nome || "Comandante";
    }
    if (document.getElementById('fotoAdmin')) {
        document.getElementById('fotoAdmin').src = foto || "img/default.jpg";
    }

    // 2. Carrega a Tabela apenas se ela existir na página
    const tabela = document.getElementById('corpoTabela');
    if (tabela) {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (usuario) {
            tabela.innerHTML = `
                <tr>
                    <td><img src="${usuario.foto}" style="width:40px; border-radius:50%"></td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.classe}</td>
                    <td><button onclick="alert('Gerando Ficha...')">Imprimir</button></td>
                </tr>`;
        } else {
            tabela.innerHTML = "<tr><td colspan='4'>Nenhum membro encontrado.</td></tr>";
        }
    }
});
tabela.innerHTML = `
    <tr>
        <td><img src="${usuario.foto}" style="width:45px; height:45px; border-radius:50%; object-fit:cover;"></td>
        <td><strong>${usuario.nome}</strong></td>
        <td><span style="background:#eee; padding:3px 8px; border-radius:10px;">${usuario.classe}</span></td>
        <td>${usuario.unidade || 'Águia Real'}</td>
        <td>
            <button class="btn-imprimir" onclick="window.print()">
                <i class="fas fa-print"></i> Ficha
            </button>
            <button class="btn-excluir-membro" onclick="removerMembro()">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    </tr>`;
    // Função para Postar Notícia
function postarNoticia() {
    const titulo = document.getElementById('tituloNoticia').value;
    const conteudo = document.getElementById('conteudoNoticia').value;
    const data = new Date().toLocaleDateString();

    if (titulo === "" || conteudo === "") {
        alert("Por favor, preencha o título e o aviso!");
        return;
    }

    // Criar o objeto da notícia
    const novaNoticia = {
        titulo: titulo,
        conteudo: conteudo,
        data: data,
        autor: localStorage.getItem('adminNome') || "Comando"
    };

    // Pegar notícias antigas ou criar lista nova
    let listaNoticias = JSON.parse(localStorage.getItem('noticiasSite')) || [];
    
    // Adicionar a nova no início da lista
    listaNoticias.unshift(novaNoticia);

    // Salvar no LocalStorage
    localStorage.setItem('noticiasSite', JSON.stringify(listaNoticias));

    alert("Notícia publicada com sucesso! 🦅");
    
    // Limpar os campos
    document.getElementById('tituloNoticia').value = "";
    document.getElementById('conteudoNoticia').value = "";
}
// Adicione isto ao final do seu admin.js existente
function atualizarListaDeMembros() {
    const corpoTabela = document.getElementById('listaMembrosAdmin');
    const membrosSalvos = JSON.parse(localStorage.getItem('membros_clube')) || [];

    corpoTabela.innerHTML = ""; // Limpa apenas a tabela, não a página

    membrosSalvos.forEach((membro, index) => {
        const linha = `
            <tr>
                <td><img src="${membro.foto}" style="width:40px; border-radius:50%;"></td>
                <td>${membro.nome}</td>
                <td>${membro.unidade}</td>
                <td><span class="badge-${membro.status.toLowerCase()}">${membro.status}</span></td>
                <td>
                    <button onclick="aprovarRecruta(${index})" style="background:green; color:white;">Aprovar</button>
                    <button onclick="eliminarRecruta(${index})" style="background:red; color:white;">X</button>
                </td>
            </tr>
        `;
        corpoTabela.innerHTML += linha;
    });
}

// Chamar a função assim que a página carregar
window.onload = function() {
    atualizarListaDeMembros();
    // Aqui você pode manter as suas outras funções de carregamento do admin
};
function atualizarPainelEstatisticas() {
    const membros = JSON.parse(localStorage.getItem('membros_clube')) || [];
    
    // 1. Conta novos cadastros (Status Pendente)
    const novosCadastros = membros.filter(m => m.status === 'Pendente').length;
    
    // 2. Simulação de Especialidades (Podemos ligar a um sistema de pedidos depois)
    const especialidadesPendentes = 0; // Por enquanto mantemos em 0 ou ligamos a outra lista

    // Atualiza os números nos cards centrais
    const elementoCadastros = document.querySelector('.card-estatistica span, #countPendentesCard');
    if (elementoCadastros) {
        elementoCadastros.innerText = novosCadastros;
    }

    // Se tiver um ID específico no HTML do card de especialidades, use-o aqui
    const elementoEspecialidades = document.getElementById('countEspecialidades');
    if (elementoEspecialidades) {
        elementoEspecialidades.innerText = especialidadesPendentes;
    }
}

// Chamar sempre que a página carregar
document.addEventListener('DOMContentLoaded', () => {
    atualizarPainelEstatisticas();
    carregarMembros(); // A sua função de listar membros
}); 
function publicarAviso() {
    const titulo = document.querySelector('input[placeholder="Título do Aviso"]').value;
    const mensagem = document.querySelector('textarea').value;

    if (titulo && mensagem) {
        const novoAviso = { titulo, mensagem, data: new Date().toLocaleDateString() };
        let mural = JSON.parse(localStorage.getItem('mural_avisos')) || [];
        mural.unshift(novoAviso); // Coloca o mais recente primeiro
        localStorage.setItem('mural_avisos', JSON.stringify(mural));
        
        alert("📢 Aviso publicado para todos os membros!");
        // Limpa os campos
        document.querySelector('input[placeholder="Título do Aviso"]').value = "";
        document.querySelector('textarea').value = "";
    } else {
        alert("Preencha o título e a mensagem!");
    }
}
// --- FUNÇÃO DE ESTATÍSTICAS (OS CARDS DO TOPO) ---
function atualizarPainelEstatisticas() {
    const membros = JSON.parse(localStorage.getItem('membros_clube')) || [];
    
    // Conta quantos membros têm o status "Pendente"
    const novosCadastros = membros.filter(m => m.status === 'Pendente').length;
    
    // Atualiza o número no card "Novos Cadastros"
    const displayCadastros = document.getElementById('countPendentesCard');
    if (displayCadastros) displayCadastros.innerText = novosCadastros;

    // Atualiza o número de especialidades (exemplo fixo por enquanto)
    const displayEspec = document.getElementById('countEspecialidades');
    if (displayEspec) displayEspec.innerText = "0"; 
}

// --- FUNÇÃO PARA PUBLICAR NOTÍCIAS NO MURAL ---
function publicarAviso() {
    const titulo = document.querySelector('input[placeholder="Título do Aviso"]').value;
    const mensagem = document.querySelector('textarea').value;

    if (titulo && mensagem) {
        let mural = JSON.parse(localStorage.getItem('mural_avisos')) || [];
        mural.unshift({ titulo, mensagem, data: new Date().toLocaleDateString() });
        localStorage.setItem('mural_avisos', JSON.stringify(mural));
        
        alert("📢 Notícia publicada com sucesso!");
        location.reload(); // Recarrega para limpar os campos
    } else {
        alert("Comandante, preencha todos os campos do aviso!");
    }
}

// Inicializa tudo quando a página abrir
document.addEventListener('DOMContentLoaded', () => {
    atualizarPainelEstatisticas();
    // Se você tiver a função de carregar a tabela, chame-a aqui também:
    // carregarMembros(); 
});
function publicarAviso() {
    // Pega o título e a mensagem dos campos que já existem no seu painel
    const titulo = document.querySelector('input[placeholder="Título do Aviso"]').value;
    const mensagem = document.querySelector('textarea').value;

    if (titulo.trim() === "" || mensagem.trim() === "") {
        alert("Comandante, preencha o título e o aviso antes de publicar!");
        return;
    }

    // Cria o objeto do aviso com a data atual
    const novoAviso = {
        id: Date.now(),
        titulo: titulo,
        mensagem: mensagem,
        data: new Date().toLocaleDateString('pt-BR')
    };

    // Salva no banco de dados (localStorage)
    let mural = JSON.parse(localStorage.getItem('mural_avisos')) || [];
    mural.unshift(novoAviso); // O mais novo aparece primeiro
    localStorage.setItem('mural_avisos', JSON.stringify(mural));

    alert("📢 Aviso publicado no Mural do Clube!");
    
    // Limpa os campos para o próximo aviso
    document.querySelector('input[placeholder="Título do Aviso"]').value = "";
    document.querySelector('textarea').value = "";
}
function adicionarEvento() {
    // Pega os dados do card "Novo Evento na Agenda"
    const nomeEvento = document.querySelector('input[placeholder="Nome do Evento (ex: Acam"]').value;
    const dataEvento = document.querySelector('input[type="date"]').value;

    if (nomeEvento === "" || dataEvento === "") {
        alert("Comandante, informe o nome e a data do evento!");
        return;
    }

    const evento = {
        id: Date.now(),
        titulo: nomeEvento,
        data: dataEvento,
        tipo: "Geral"
    };

    // Salva na "base de dados" local
    let agenda = JSON.parse(localStorage.getItem('agenda_clube')) || [];
    agenda.push(evento);
    // Ordena por data (o mais próximo primeiro)
    agenda.sort((a, b) => new Date(a.data) - new Date(b.data));
    
    localStorage.setItem('agenda_clube', JSON.stringify(agenda));

    alert("📅 Evento adicionado à Agenda do Clube!");
    
    // Limpa os campos
    document.querySelector('input[placeholder="Nome do Evento (ex: Acam"]').value = "";
    document.querySelector('input[type="date"]').value = "";
}
function adicionarEvento() {
    console.log("Botão clicado!"); // Isso vai aparecer no console para provar que funciona

    // Usando seletores diretos para não falhar
    const campoNome = document.querySelector('input[placeholder*="Nome do Evento"]');
    const campoData = document.querySelector('input[type="date"]');

    if (!campoNome || !campoData) {
        alert("Erro técnico: Campos não encontrados!");
        return;
    }

    if (campoNome.value.trim() === "" || campoData.value === "") {
        alert("⚠️ Comandante, preencha o Nome e a Data!");
        return;
    }

    const evento = {
        titulo: campoNome.value,
        data: campoData.value,
        id: Date.now()
    };

    let agenda = JSON.parse(localStorage.getItem('agenda_clube')) || [];
    agenda.push(evento);
    localStorage.setItem('agenda_clube', JSON.stringify(agenda));

    alert("📅 Evento adicionado com sucesso!");
    
    // Limpa os campos
    campoNome.value = "";
    campoData.value = "";
}
// Cole isto no final do seu admin.js, depois de apagar o código velho
function adicionarEvento() {
    const nomeEvento = document.querySelector('input[placeholder*="Nome do Evento"]').value;
    const dataEvento = document.querySelector('input[type="date"]').value;

    if (!nomeEvento || !dataEvento) {
        alert("Preencha o nome e a data da missão!");
        return;
    }

    let agenda = JSON.parse(localStorage.getItem('agenda_clube')) || [];
    agenda.push({ titulo: nomeEvento, data: dataEvento });
    localStorage.setItem('agenda_clube', JSON.stringify(agenda));

    alert("📅 Agenda atualizada!");
    location.reload(); 
}
// Função para trocar o conteúdo central
function navegar(opcao) {
    const area = document.getElementById('conteudo-principal');
    
    if (opcao === 'dashboard') {
        location.reload(); // Recarrega a tela inicial com Joaquim Alberto
    } 
    
    else if (opcao === 'membros') {
        area.innerHTML = `
            <h3><i class="fas fa-users"></i> LISTA GERAL DE MEMBROS</h3>
            <table class="admin-table">
                <thead>
                    <tr><th>Perfil</th><th>Nome</th><th>Unidade</th><th>Ações</th></tr>
                </thead>
                <tbody>
                    <tr><td><img src="img/membro1.jpg" class="img-membro"></td><td>Marcos Paulo</td><td>Águia Real</td><td><button class="btn-edit">Ver</button></td></tr>
                    <tr><td><img src="img/membro2.jpg" class="img-membro"></td><td>Ana Kanjila</td><td>Águia Veloz</td><td><button class="btn-edit">Ver</button></td></tr>
                </tbody>
            </table>`;
    }

    else if (opcao === 'mensalidades') {
        area.innerHTML = `
            <h3><i class="fas fa-file-invoice-dollar"></i> GESTÃO FINANCEIRA</h3>
            <div style="display:flex; gap:20px; margin-top:20px;">
                <div class="stat-card" style="background:#d4edda; flex:1; padding:20px; border-radius:10px;"><h4>Total Pago</h4><p>45.000 Kz</p></div>
                <div class="stat-card" style="background:#f8d7da; flex:1; padding:20px; border-radius:10px;"><h4>Pendente</h4><p>12.000 Kz</p></div>
            </div>`;
    }
}
// admin.js
function navegar(pagina) {
    const areaPrincipal = document.querySelector('.data-section');
    
    if (pagina === 'membros') {
        areaPrincipal.innerHTML = `
            <h3><i class="fas fa-users"></i> LISTA DE MEMBROS ATIVOS</h3>
            <table class="admin-table">
                <thead>
                    <tr><th>Nome</th><th>Unidade</th><th>Status</th></tr>
                </thead>
                <tbody>
                    <tr><td>Marcos Paulo</td><td>Águia Real</td><td>Ativo</td></tr>
                    <tr><td>Ana Kanjila</td><td>Águia Veloz</td><td>Ativo</td></tr>
                </tbody>
            </table>`;
    } 
    else if (pagina === 'financeiro') {
        areaPrincipal.innerHTML = `
            <h3><i class="fas fa-file-invoice-dollar"></i> MENSALIDADES</h3>
            <p>Total em caixa: 150.000 Kz</p>
            <button class="btn-check">Gerar Relatório</button>`;
    }
    // Adicione outras páginas aqui conforme precisar
}
// FUNÇÃO PARA ACEITAR/APROVAR O CADASTRO
function aprovarMembro() {
    const status = document.getElementById('status-joaquim');
    
    // Muda o texto e a cor para Verde (Aprovado)
    status.innerText = "Aprovado";
    status.style.background = "#d4edda";
    status.style.color = "#155724";
    
    alert("Membro aprovado com sucesso! Ele já pode aceder à área de membros.");
}

// FUNÇÃO PARA REMOVER O MEMBRO DA LISTA
function removerMembro(idLinha) {
    if (confirm("Tem certeza que deseja remover este cadastro?")) {
        const linha = document.getElementById(idLinha);
        
        // Efeito visual de sumir
        linha.style.opacity = '0';
        
        setTimeout(() => {
            linha.remove(); // Apaga a linha do ecrã
            alert("Cadastro removido do sistema.");
        }, 500);
    }
}
function carregarCandidatosReal() {
    const dadosSaldos = localStorage.getItem('novoCandidato');
    const areaTabela = document.querySelector('tbody');

    if (dadosSaldos) {
        const c = JSON.parse(dadosSaldos);
        // Substitui a linha fixa pelos dados REAIS do cadastro.html
        areaTabela.innerHTML = `
            <tr id="pessoa-1">
                <td><img src="img/demo-user.jpg" style="width:40px; border-radius:50%;"></td>
                <td><strong>${c.nome}</strong></td>
                <td>${c.localizacao}</td>
                <td><span id="status-1" class="status-pendente">${c.status}</span></td>
                <td>
                    <button class="btn-check" onclick="aceitarMembro(1)">ACEITAR</button>
                    <button class="btn-delete" onclick="eliminarMembro('pessoa-1')">REMOVER</button>
                    <a href="perfil-membro.html" class="btn-view">PERFIL</a>
                </td>
            </tr>`;
    }
}

// Executa assim que o painel abrir
window.onload = carregarCandidatosReal;

    const dados = JSON.parse(localStorage.getItem('novoCandidato'));
    if(dados) {
        document.querySelector('.nome-membro').innerText = dados.nome;
        // Atualize os outros campos (localização, etc) da mesma forma
    }
    // --- LIGAÇÃO DOS FIOS: CONTADOR DE MEMBROS EM TEMPO REAL ---
import { db } from './firebase-config.js'; // Garante que este ficheiro existe
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 1. Apontar para a coleção de membros
const membrosRef = collection(db, "solicitacoes_cadastro");

// 2. Escutar mudanças em tempo real
onSnapshot(membrosRef, (snapshot) => {
    // Conta quantos registros existem
    const total = snapshot.size;
    
    // Procura o elemento no HTML e atualiza o número
    const elementoContador = document.getElementById('total-membros');
    
    if (elementoContador) {
        elementoContador.innerText = total;
    }
    
    console.log("Fios ligados! Total de membros atualizado:", total);
});
// --- LIGAÇÃO DOS FIOS: CADASTRO -> ADMIN ---

// Função para verificar se há novas inscrições e atualizar o painel
function atualizarSistemaDeInscricoes() {
    const inscricoes = JSON.parse(localStorage.getItem('aguia_inscricoes')) || [];
    
    // 1. Procura o elemento da tabela no teu HTML (ajusta o ID se for diferente)
    const tabelaInscritos = document.getElementById('tabela-inscritos'); 
    
    if (tabelaInscritos) {
        if (inscricoes.length === 0) {
            tabelaInscritos.innerHTML = '<tr><td colspan="4">Nenhuma inscrição recebida.</td></tr>';
        } else {
            tabelaInscritos.innerHTML = inscricoes.map(membro => `
                <tr>
                    <td>${membro.nome}</td>
                    <td>${membro.unidade}</td>
                    <td>${membro.dataInscricao}</td>
                    <td><span class="badge ${membro.lida ? 'bg-success' : 'bg-warning'}">
                        ${membro.lida ? 'Confirmado' : 'Novo!'}
                    </span></td>
                </tr>
            `).join('');
        }
    }

    // 2. Lógica da Notificação (O "ponto" vermelho no menu)
    const novasInscricoes = inscricoes.filter(i => !i.lida).length;
    const badge = document.getElementById('notificacao-badge'); // Cria este ID no teu HTML do menu
    
    if (badge) {
        badge.innerText = novasInscricoes;
        badge.style.display = novasInscricoes > 0 ? 'block' : 'none';
    }
}

// Executa a função assim que o painel abrir
document.addEventListener('DOMContentLoaded', atualizarSistemaDeInscricoes);
function pesquisarMembro(nomeDigitado) {
    // Busca em tempo real no banco de dados
    db.collection("membros").where("nome", ">=", nomeDigitado)
      .onSnapshot((snapshot) => {
          // Aqui o código limpa a tabela e reconstrói com os dados reais do Firebase
          renderizarTabela(snapshot); 
      });
}
// No seu script do Admin
db.collection("membros").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    let tabela = document.getElementById("tabela-membros"); // O ID da sua tabela
    tabela.innerHTML = ""; // Limpa para carregar os novos

    snapshot.forEach((doc) => {
        const dados = doc.data();
        tabela.innerHTML += `
            <tr>
                <td>${dados.nome}</td>
                <td>${dados.tipo}</td>
                <td>${dados.acesso}</td>
                <td><span class="status-badge">${dados.data}</span></td>
            </tr>
        `;
    });
});
// Limpa a tabela e carrega dados REAIS do Firebase
db.collection("membros").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    const corpoTabela = document.querySelector(".usuarios-tabela tbody"); // Ajuste o seletor conforme o seu HTML
    if (corpoTabela) {
        corpoTabela.innerHTML = ""; // Apaga os nomes de teste como 'Marcos Paulo'

        snapshot.forEach((doc) => {
            const item = doc.data();
            corpoTabela.innerHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.tipo || 'Membro'}</td>
                    <td>${item.acesso || '--:--'}</td>
                </tr>
            `;
        });
    }
});
// 1. Contador de Membros Real
db.collection("membros").onSnapshot((snapshot) => {
    document.getElementById("total-membros").innerText = snapshot.size;
    
    const tabela = document.getElementById("tabela-usuarios-corpo");
    if (tabela) {
        tabela.innerHTML = ""; // GARANTE QUE O MARCOS PAULO SUMIU
        snapshot.forEach((doc) => {
            const d = doc.data();
            tabela.innerHTML += `
                <tr>
                    <td>${d.nome}</td>
                    <td><span class="tag-tipo">${d.status || 'Membro'}</span></td>
                    <td>${d.dados || '--/--'}</td> 
                </tr>`;
        });
    }
});

// 2. Correção do Erro 'null' (reunioes.js:98)
// No início do seu reunioes.js, adicione esta proteção:
const elReuniao = document.getElementById('tabela-reunioes');
if (elReuniao) { 
    // ... seu código de reuniões aqui dentro ...
}
// Rapidez Máxima: Sincronização em Tempo Real
db.collection("membros").onSnapshot((snapshot) => {
    // 1. Atualiza o contador de Membros Totais
    const totalMembros = document.getElementById("total-membros");
    if(totalMembros) totalMembros.innerText = snapshot.size;

    // 2. Limpa e reconstrói a tabela com nomes REAIS
    const tabela = document.getElementById("tabela-real");
    if (tabela) {
        tabela.innerHTML = ""; // Remove o lixo visual
        snapshot.forEach((doc) => {
            const user = doc.data();
            tabela.innerHTML += `
                <tr>
                    <td>${user.nome || "Sem Nome"}</td>
                    <td><span class="tag-tipo">${user.status || "Membro"}</span></td>
                    <td>${user.dados || "2026"}</td>
                </tr>
            `;
        });
    }
});