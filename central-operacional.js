import { db } from "./firebase-config.js";
import { collection, addDoc, query, onSnapshot, orderBy, where, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- CONTROLO DO MODAL ---
window.abrirModal = (tipo) => {
    document.getElementById("modal-evento").style.display = "flex";
    document.getElementById("tipo-evento").value = tipo;
    document.getElementById("modal-titulo").innerText = tipo === 'ensaio' ? "AGENDAR ENSAIO" : "AGENDAR REUNIÃO";
};

window.fecharModal = () => {
    document.getElementById("modal-evento").style.display = "none";
};

// --- SALVAR EVENTO ---
window.salvarEvento = async () => {
    const tipo = document.getElementById("tipo-evento").value;
    const titulo = document.getElementById("titulo-evento").value;
    const data = document.getElementById("data-evento").value;
    const hora = document.getElementById("hora-evento").value;
    const pauta = document.getElementById("pauta-evento").value;

    if(!titulo || !data || !hora) return alert("Preencha os dados da missão!");

    await addDoc(collection(db, "operacional"), {
        tipo, titulo, data, hora, pauta,
        data_criacao: new Date()
    });
    
    alert("Evento agendado no sistema!");
    fecharModal();
};

// --- LISTAGEM EM TEMPO REAL ---
const monitorarEventos = (tipo, containerId) => {
    const q = query(collection(db, "operacional"), where("tipo", "==", tipo), orderBy("data", "asc"));
    onSnapshot(q, (snapshot) => {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        snapshot.forEach((docSnap) => {
            const ev = docSnap.data();
            container.innerHTML += `
                <div class="evento-card">
                    <button class="btn-delete-evento" onclick="cancelarEvento('${docSnap.id}')"><i class="fas fa-times"></i></button>
                    <small>${ev.data} às ${ev.hora}</small>
                    <h4>${ev.titulo}</h4>
                    <p style="font-size: 0.8rem; color: #888;">${ev.pauta}</p>
                </div>
            `;
        });
    });
};

window.cancelarEvento = async (id) => {
    if(confirm("Confirmar cancelamento deste evento operacional?")) {
        await deleteDoc(doc(db, "operacional", id));
    }
};

monitorarEventos('ensaio', 'lista-ensaios');
monitorarEventos('reuniao', 'lista-reunioes');
// Este é o motor da tua Central Operacional

// 1. Esta função salva os dados quando clicas no botão
window.salvarEvento = function() {
    
    // Capturamos o que escreveste nos campos do modal
    const titulo = document.getElementById('titulo-evento').value;
    const data = document.getElementById('data-evento').value;
    const hora = document.getElementById('hora-evento').value;
    const pauta = document.getElementById('pauta-evento').value;
    const tipo = document.getElementById('tipo-evento').value;

    // Verificamos se não esqueceste de preencher o título ou a data
    if (titulo === "" || data === "") {
        alert("Comandante, o título e a data são obrigatórios para a missão!");
        return;
    }

    // Criamos o "pacote" com as informações da reunião
    const novaReuniao = {
        id: Date.now(),
        titulo: titulo,
        data: data,
        hora: hora,
        pauta: pauta,
        tipo: tipo // Aqui o sistema sabe se é 'reuniao' ou 'ensaio'
    };

    // Guardamos no "banco de dados" do navegador (LocalStorage)
    let listaEventos = JSON.parse(localStorage.getItem('aguia_eventos')) || [];
    listaEventos.push(novaReuniao);
    localStorage.setItem('aguia_eventos', JSON.stringify(listaEventos));

    alert("Missão Agendada com Sucesso!");

    // Se for uma reunião, ele abre a página reunioes.html automaticamente
    if (tipo === 'reuniao') {
        window.location.href = 'reunioes.html';
    } else {
        // Se for ensaio, ele apenas fecha o modal recarregando a página
        location.reload();
    }
}
// Função para ler os dados e mostrar nos quadros da Central
function atualizarPainelCentral() {
    const listaEnsaios = document.getElementById('lista-ensaios');
    const listaReunioes = document.getElementById('lista-reunioes');
    const eventos = JSON.parse(localStorage.getItem('aguia_eventos')) || [];

    // Limpar os quadros antes de carregar
    listaEnsaios.innerHTML = "";
    listaReunioes.innerHTML = "";

    eventos.forEach(evento => {
        // Criar o HTML do pequeno cartão/item
        const itemHTML = `
            <div class="evento-item">
                <div class="evento-info-mini">
                    <span class="evento-data-mini">${evento.data}</span>
                    <strong class="evento-titulo-mini">${evento.titulo}</strong>
                </div>
                <i class="fas fa-chevron-right gold-text"></i>
            </div>
        `;

        // Colocar no lugar certo baseado no tipo
        if (evento.tipo === 'ensaio') {
            listaEnsaios.innerHTML += itemHTML;
        } else if (evento.tipo === 'reuniao') {
            listaReunioes.innerHTML += itemHTML;
        }
    });

    // Se estiver vazio, colocar um aviso discreto
    if (listaEnsaios.innerHTML === "") listaEnsaios.innerHTML = "<p class='silver-text'>Sem ensaios.</p>";
    if (listaReunioes.innerHTML === "") listaReunioes.innerHTML = "<p class='silver-text'>Sem reuniões.</p>";
}

// 2. ORDEM DE EXECUÇÃO: Correr assim que a página abrir
document.addEventListener('DOMContentLoaded', atualizarPainelCentral);