<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Perfil do Desbravador | Águia Control</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* --- NÚCLEO DARK/GOLD --- */
        :root { --bg: #0b0b0b; --panel: #1a1a1a; --gold: #b8860b; --text: #fff; --text-muted: #aaa; --danger: #e74c3c; --success: #2ecc71; }
        body { font-family: 'Poppins', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; overflow-x: hidden; }
        
        /* --- LAYOUT PRINCIPAL --- */
        .perfil-wrapper { max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: 320px 1fr; gap: 30px; }

        /* --- BARRA LATERAL (IDENTIDADE) --- */
        .sidebar { background: var(--panel); border-radius: 15px; padding: 30px 20px; text-align: center; position: relative; }
        .avatar { width: 130px; height: 130px; border: 4px solid var(--gold); border-radius: 50%; object-fit: cover; margin-bottom: 15px; }
        .nome { font-size: 22px; margin: 0; text-transform: uppercase; }
        .unidade-badge { background: #333; color: var(--gold); padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; margin-top: 10px; display: inline-block; }
        
        /* Barra de Progresso do Perfil */
        .progress-container { margin-top: 25px; text-align: left; }
        .progress-label { font-size: 12px; color: var(--text-muted); display: flex; justify-content: space-between; margin-bottom: 5px; }
        .progress-bar { width: 100%; height: 8px; background: #333; border-radius: 5px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--gold); width: 60%; /* 60% completo */ }

        /* Menu Lateral Interno */
        .side-menu { margin-top: 30px; display: flex; flex-direction: column; gap: 10px; }
        .side-btn { background: #222; border: none; color: var(--text-muted); padding: 12px; border-radius: 8px; cursor: pointer; text-align: left; font-weight: bold; transition: 0.3s; display: flex; align-items: center; gap: 10px; }
        .side-btn:hover, .side-btn.active { background: var(--gold); color: #000; }
        .btn-danger { background: rgba(231, 76, 60, 0.1); color: var(--danger); border: 1px solid var(--danger); }
        .btn-danger:hover { background: var(--danger); color: #fff; }

        /* --- ÁREA DE CONTEÚDO (CURRÍCULO VISUAL) --- */
        .content-area { background: var(--panel); border-radius: 15px; padding: 30px; }
        .tab-section { display: none; }
        .tab-section.active { display: block; }
        .section-title { color: var(--gold); border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }

        /* Cartões de Informação e Gamificação */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card { background: #222; padding: 20px; border-radius: 10px; border-left: 4px solid var(--gold); }
        .card.red { border-left-color: var(--danger); }
        .card.green { border-left-color: var(--success); }
        
        /* Galeria de Especialidades */
        .badges-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 15px; text-align: center; }
        .badge-item i { font-size: 30px; color: var(--gold); background: #333; padding: 20px; border-radius: 50%; }
        .badge-item p { font-size: 12px; margin-top: 8px; color: var(--text-muted); }

        /* --- PAINEL DESLIZANTE DE DEFINIÇÕES --- */
        .settings-panel { position: fixed; top: 0; right: -400px; width: 350px; height: 100vh; background: #111; border-left: 2px solid #333; transition: 0.4s ease-in-out; z-index: 1000; padding: 30px; overflow-y: auto; box-shadow: -5px 0 15px rgba(0,0,0,0.5); }
        .settings-panel.open { right: 0; }
        .close-settings { background: none; border: none; color: var(--text); font-size: 24px; cursor: pointer; position: absolute; top: 20px; right: 20px; }
        .setting-item { margin-bottom: 25px; }
        .setting-item label { display: block; color: var(--text-muted); font-size: 12px; margin-bottom: 8px; text-transform: uppercase; }
        .setting-item select, .setting-item input { width: 100%; padding: 10px; background: #222; border: 1px solid #444; color: #fff; border-radius: 5px; }
        
        /* --- FEEDBACK VISUAL (TOAST) --- */
        .toast { position: fixed; bottom: -100px; right: 20px; background: var(--success); color: #fff; padding: 15px 25px; border-radius: 5px; font-weight: bold; transition: 0.4s; z-index: 2000; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
        .toast.show { bottom: 20px; }

    </style>
</head>
<body>

<div class="perfil-wrapper">
    <aside class="sidebar">
        <img src="img/demo-user.jpg" alt="Foto Oficial" class="avatar" id="foto-perfil">
        <h2 class="nome" id="nome-perfil">Mery Chacale</h2>
        <div class="unidade-badge"><i class="fas fa-shield-alt"></i> Unidade Falcão</div>
        
        <div class="progress-container">
            <div class="progress-label"><span>Perfil Completo</span> <span>60%</span></div>
            <div class="progress-bar"><div class="progress-fill"></div></div>
        </div>

        <nav class="side-menu">
            <button class="side-btn active" onclick="abrirAba('clube')"><i class="fas fa-medal"></i> Vida no Clube</button>
            <button class="side-btn" onclick="abrirAba('saude')"><i class="fas fa-heartbeat"></i> Saúde e Salvaguarda</button>
            <button class="side-btn" onclick="abrirAba('docs')"><i class="fas fa-folder-open"></i> Documentos</button>
            <button class="side-btn" onclick="abrirAba('admin')"><i class="fas fa-exclamation-triangle"></i> Notificar Admin</button>
            
            <hr style="border-color: #333; width: 100%; margin: 10px 0;">
            
            <button class="side-btn" onclick="toggleSettings()"><i class="fas fa-cog"></i> Definições da Conta</button>
            <button class="side-btn btn-danger"><i class="fas fa-sign-out-alt"></i> Terminar Sessão</button>
        </nav>
    </aside>

    <main class="content-area">
        
        <section id="clube" class="tab-section active">
            <h3 class="section-title"><i class="fas fa-road"></i> Progresso Acadêmico e Classe</h3>
            <div class="grid-2">
                <div class="card">
                    <h4 style="margin: 0 0 10px 0; color: #aaa;">Classe Atual</h4>
                    <h2 style="margin: 0; color: var(--gold);">Pesquisador</h2>
                    <div class="progress-container">
                        <div class="progress-label"><span>Requisitos Cumpridos</span> <span>8/15</span></div>
                        <div class="progress-bar"><div class="progress-fill" style="width: 53%;"></div></div>
                    </div>
                </div>
                <div class="card">
                    <h4 style="margin: 0 0 10px 0; color: #aaa;">Quadro de Mérito</h4>
                    <p style="margin:0;"><i class="fas fa-star" style="color: gold;"></i> <strong>450 Pontos</strong> (Pontualidade e Uniforme)</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: var(--success);">Rank: Excelente</p>
                </div>
            </div>

            <h3 class="section-title" style="margin-top: 30px;"><i class="fas fa-award"></i> Galeria de Especialidades</h3>
            <div class="badges-grid">
                <div class="badge-item"><i class="fas fa-fire"></i><p>Fogueiras</p></div>
                <div class="badge-item"><i class="fas fa-compass"></i><p>Orientação</p></div>
                <div class="badge-item"><i class="fas fa-first-aid"></i><p>1º Socorros</p></div>
                <div class="badge-item" style="opacity: 0.3;"><i class="fas fa-swimmer"></i><p>Natação (Pendente)</p></div>
            </div>
        </section>

        <section id="saude" class="tab-section">
            <h3 class="section-title" style="color: var(--danger);"><i class="fas fa-ambulance"></i> Ficha Médica e Segurança</h3>
            <div class="grid-2">
                <div class="card red">
                    <h4>Alerta Médico</h4>
                    <p><strong>Tipo Sanguíneo:</strong> O+</p>
                    <p><strong>Alergias:</strong> Penicilina, Amendoim</p>
                    <p><strong>Medicação:</strong> Asma (Bomba SOS)</p>
                </div>
                <div class="card green">
                    <h4>Status de Autorização</h4>
                    <h2 style="color: var(--success); margin: 10px 0;"><i class="fas fa-check-circle"></i> ASSINADO</h2>
                    <p style="font-size: 12px;">Próximo Acampamento liberado pelo responsável.</p>
                </div>
            </div>
            <div class="card" style="margin-top: 20px;">
                <h4>Vínculo de Responsável</h4>
                <p><i class="fas fa-user-shield"></i> <strong>Nome:</strong> João Chacale (Pai)</p>
                <p><i class="fas fa-phone"></i> <strong>Contato:</strong> +244 9XX XXX XXX</p>
                <p style="font-size: 12px; color: #aaa; margin-top: 10px;"><i class="fas fa-history"></i> Último acesso do jovem: Hoje às 14:00 (Kuito)</p>
            </div>
        </section>

        <section id="docs" class="tab-section">
            <h3 class="section-title"><i class="fas fa-file-pdf"></i> Repositório de Documentos</h3>
            <div class="card">
                <h4>Enviar Prova de Requisito</h4>
                <p style="font-size: 13px; color: #aaa;">Faça upload de fotos ou documentos para o instrutor validar sua classe.</p>
                <input type="file" style="margin-top: 10px; color: white;">
                <button style="background: var(--gold); color: black; padding: 5px 15px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">Enviar Arquivo</button>
            </div>
        </section>

        <section id="admin" class="tab-section">
            <h3 class="section-title"><i class="fas fa-bullhorn"></i> Canal Direto com a Diretoria</h3>
            <div class="card" style="border-left-color: #3498db;">
                <p style="font-size: 12px; color: #3498db;"><i class="fas fa-info-circle"></i> Este é um botão de reporte silencioso. Esta mensagem é monitorada apenas pela diretoria de alto nível para a sua segurança.</p>
                
                <div class="setting-item" style="margin-top: 15px;">
                    <label>Categoria do Reporte:</label>
                    <select>
                        <option>Dúvida sobre requisito</option>
                        <option>Problema com a Unidade</option>
                        <option>Emergência de Saúde / Salvaguarda</option>
                    </select>
                </div>
                <div class="setting-item">
                    <label>Sua Mensagem:</label>
                    <textarea rows="4" style="width: 100%; background: #111; color: white; border: 1px solid #444; border-radius: 5px; padding: 10px;"></textarea>
                </div>
                <button onclick="mostrarToast('Mensagem enviada com sucesso para a Diretoria!')" style="background: var(--gold); color: black; padding: 10px 20px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; width: 100%;">Enviar Notificação</button>
            </div>
        </section>

    </main>
</div>

<div id="settings-panel" class="settings-panel">
    <button class="close-settings" onclick="toggleSettings()"><i class="fas fa-times"></i></button>
    <h2 style="color: var(--gold); border-bottom: 1px solid #333; padding-bottom: 10px;">Definições</h2>
    
    <div class="setting-item">
        <label>Preferências de Interface</label>
        <select>
            <option>Modo Escuro (Padrão)</option>
            <option>Modo Claro</option>
        </select>
    </div>

    <div class="setting-item">
        <label>Visibilidade do Perfil (Privacidade)</label>
        <select>
            <option>Apenas minha Unidade e Diretoria</option>
            <option>Todo o Clube Águia</option>
            <option>Privado (Apenas Diretoria)</option>
        </select>
    </div>

    <div class="setting-item">
        <label>Alertas de Login do Responsável</label>
        <select>
            <option>Notificar meus pais em novos acessos</option>
            <option>Não notificar</option>
        </select>
    </div>
    <input type="file" id="input-foto" style="display: none;" accept="image/*">
<button onclick="document.getElementById('input-foto').click()" class="side-btn">
    <i class="fas fa-camera"></i> Alterar Foto de Perfil
</button>

    <hr style="border-color: #333; margin: 30px 0;">

    <button onclick="mostrarToast('Iniciando download dos seus dados...')" class="side-btn" style="width: 100%; justify-content: center; margin-bottom: 15px;"><i class="fas fa-download"></i> Exportar Meus Dados</button>
    
    <div class="card red" style="padding: 15px;">
        <h4 style="margin: 0 0 10px 0; color: var(--danger);">Excluir Conta</h4>
        <p style="font-size: 11px; color: #aaa; margin-bottom: 10px;">Atenção: Ao excluir, perderá todo o histórico de classes e especialidades. Esta ação é irreversível.</p>
        <button onclick="confirmarExclusao()" class="side-btn btn-danger" style="width: 100%; justify-content: center; font-size: 12px;">Apagar Perfil Definitivamente</button>
    </div>
</div>

<div id="toast" class="toast">
    <i class="fas fa-check-circle"></i> <span id="toast-msg">Alterações salvas com sucesso!</span>
</div>

<script>
    // Sistema de Abas Central
    function abrirAba(abaId) {
        document.querySelectorAll('.tab-section').forEach(sec => sec.classList.remove('active'));
        document.querySelectorAll('.side-menu .side-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(abaId).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    // Painel de Definições Slide-out
    function toggleSettings() {
        document.getElementById('settings-panel').classList.toggle('open');
    }

    // Sistema de Notificação Visual (Feedback)
    function mostrarToast(mensagem) {
        const toast = document.getElementById('toast');
        document.getElementById('toast-msg').innerText = mensagem;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000); // Some após 3 segundos
    }

    // Lógica de Confirmação Dupla para Excluir Conta
    function confirmarExclusao() {
        if(confirm("ATENÇÃO: Tem certeza absoluta que deseja excluir sua conta do Clube Águia?")) {
            if(confirm("ÚLTIMO AVISO: Todos os seus dados serão perdidos. Confirmar?")) {
                mostrarToast("Solicitação de exclusão enviada à diretoria.");
                // Aqui entraria o código Firebase para deletar
            }
        }
    }
</script>

</body>
</html>