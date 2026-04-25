document.addEventListener('DOMContentLoaded', () => {
    const filtros = document.querySelectorAll('.menu-filtros button');
    const itens = document.querySelectorAll('.bento-item');

    filtros.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Update
            document.querySelector('.menu-filtros .active').classList.remove('active');
            btn.classList.add('active');

            // Lógica de Filtro
            const categoria = btn.getAttribute('data-filter');

            itens.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (categoria === 'todos' || item.classList.contains(categoria)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Abrir imagem no clique
    itens.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.querySelector('img').src;
            const viewer = document.getElementById('viewer');
            document.getElementById('viewer-img').src = src;
            viewer.style.display = 'flex';
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.menu-filtros button');
    const cards = document.querySelectorAll('.bento-item');

    botoes.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Atualizar classe ativa nos botões
            document.querySelector('.menu-filtros .active').classList.remove('active');
            btn.classList.add('active');

            // 2. Pegar o filtro selecionado
            const filtro = btn.getAttribute('data-filter');

            // 3. Filtrar os cards com animação
            cards.forEach(card => {
                // Primeiro, escondemos com fade
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    if (filtro === 'todos' || card.classList.contains(filtro)) {
                        card.style.display = 'block';
                        // Pequeno delay para o navegador processar o display antes do fade-in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300); // Tempo da transição de saída
            });
        });
    });
});