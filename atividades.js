document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lista-atividades-cards');
    const eventos = JSON.parse(localStorage.getItem('aguia_eventos')) || [];

    // Filtramos apenas o que é 'ensaio' ou atividades de campo
    const atividades = eventos.filter(e => e.tipo === 'ensaio');

    if (atividades.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <i class="fas fa-ghost" style="font-size: 3rem; color: #333;"></i>
                <p class="silver-text">Nenhuma atividade de campo registada no radar.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = atividades.map(atv => `
        <div class="card-missao">
            <h3 class="gold-text">${atv.titulo}</h3>
            <p><i class="far fa-calendar-alt"></i> ${atv.data}</p>
            <p><i class="far fa-clock"></i> ${atv.hora}</p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 15px 0;">
            <p class="silver-text">${atv.pauta}</p>
        </div>
    `).join('');
});