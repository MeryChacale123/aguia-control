// reunioes.js - Gestão de Reuniões Águia Control

document.addEventListener('DOMContentLoaded', () => {
    // 1. Verifica se estamos na página de Listagem
    if (document.getElementById('corpo-tabela-reunioes')) {
        exibirReunioes();
    }

    // 2. Verifica se o botão de Agendar existe nesta página (Modal)
    const btnAgendar = document.getElementById('btn-finalizar-agendamento');
    if (btnAgendar) {
        btnAgendar.addEventListener('click', (e) => {
            e.preventDefault();
            salvarNovaReuniao();
        });
    }
});

// Função para capturar os dados do Modal e salvar
function salvarNovaReuniao() {
    const titulo = document.getElementById('modal_titulo').value;
    const data = document.getElementById('modal_data').value;
    const hora = document.getElementById('modal_hora').value;
    const desc = document.getElementById('modal_desc').value;

    if (!titulo || !data) {
        alert("Atenção, Comandante! Título e Data são obrigatórios.");
        return;
    }

    const reuniao = {
        id: Date.now(),
        titulo,
        data,
        hora,
        desc,
        status: "Pendente"
    };

    let lista = JSON.parse(localStorage.getItem('aguia_reunioes')) || [];
    lista.push(reuniao);
    localStorage.setItem('aguia_reunioes', JSON.stringify(lista));

    alert("Missão agendada! A redirecionar...");
    window.location.href = 'reunioes.html';
}

// Função para ler o localStorage e colocar na tabela
function exibirReunioes() {
    const tabela = document.getElementById('corpo-tabela-reunioes');
    const dados = JSON.parse(localStorage.getItem('aguia_reunioes')) || [];

    if (dados.length === 0) {
        tabela.innerHTML = '<tr><td colspan="4">Sem reuniões no radar.</td></tr>';
        return;
    }

    tabela.innerHTML = dados.map(r => `
        <tr>
            <td>${r.data} às ${r.hora}</td>
            <td><strong>${r.titulo}</strong></td>
            <td>${r.desc}</td>
            <td><span class="status-tag">${r.status}</span></td>
        </tr>
    `).join('');
}
document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.getElementById('corpo-tabela-reunioes'); // Garante que tens este ID na tua table
    const eventos = JSON.parse(localStorage.getItem('aguia_eventos')) || [];

    // Filtra apenas o que é reunião
    const soReunioes = eventos.filter(e => e.tipo === 'reuniao');

    if (tabela) {
        if (soReunioes.length === 0) {
            tabela.innerHTML = '<tr><td colspan="4">Nenhuma reunião no radar.</td></tr>';
        } else {
            tabela.innerHTML = soReunioes.map(r => `
                <tr>
                    <td>${r.data}</td>
                    <td>${r.hora}</td>
                    <td>${r.titulo}</td>
                    <td>${r.pauta}</td>
                </tr>
            `).join('');
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('corpo-tabela-reunioes');
    const eventos = JSON.parse(localStorage.getItem('aguia_eventos')) || [];

    const soReunioes = eventos.filter(e => e.tipo === 'reuniao');

    if (soReunioes.length === 0) {
        container.innerHTML = '<p class="silver-text">Nenhuma reunião agendada no momento.</p>';
    } else {
        container.innerHTML = soReunioes.map(r => `
            <div class="reuniao-card">
                <div class="reuniao-info">
                    <h3>${r.titulo}</h3>
                    <p class="silver-text">${r.pauta}</p>
                </div>
                <div class="reuniao-status">
                    <span class="reuniao-date">${r.data} | ${r.hora}</span>
                </div>
            </div>
        `).join('');
    }
});