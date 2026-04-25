document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lista-ensaios-cards');
    // Busca os dados globais que salvamos na central-operacional.js
    const eventos = JSON.parse(localStorage.getItem('aguia_eventos')) || [];

    // Filtra apenas o tipo 'ensaio'
    const soEnsaios = eventos.filter(e => e.tipo === 'ensaio');

    if (soEnsaios.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; opacity: 0.5;">
                <i class="fas fa-drum" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <p>Nenhum ensaio agendado no sistema.</p>
            </div>
        `;
        return;
    }

    // Gera o HTML dos cartões
    container.innerHTML = soEnsaios.map(ensaio => `
        <div class="card-ensaio">
            <div class="ensaio-info">
                <h3>${ensaio.titulo}</h3>
                <div class="ensaio-meta">
                    <span><i class="far fa-calendar"></i> ${ensaio.data}</span> | 
                    <span><i class="far fa-clock"></i> ${ensaio.hora}</span>
                </div>
                <p style="margin-top: 10px; font-size: 0.9rem;">${ensaio.pauta}</p>
            </div>
            <div class="badge-ensaio">CONFIRMADO</div>
        </div>
    `).join('');
});