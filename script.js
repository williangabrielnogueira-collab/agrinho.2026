// === SCRIPT DO PROJETO SUSTENTÁVEL - CONCURSO AGRINHO 2026 ===

// 1. FUNCIONALIDADES DE ACESSIBILIDADE
// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ---- Botão de acessibilidade (abrir/fechar menu) ----
    const btnAcessibilidade = document.getElementById('btnAcessibilidade');
    const menuAcessibilidade = document.getElementById('menuAcessibilidade');
    
    btnAcessibilidade.addEventListener('click', function() {
        menuAcessibilidade.classList.toggle('mostrar');
    });
    
    // Fechar o menu se clicar fora (opcional, melhora usabilidade)
    document.addEventListener('click', function(event) {
        if (!botaoAcessibilidade.contains(event.target)) {
            menuAcessibilidade.classList.remove('mostrar');
        }
    });
    
    const botaoAcessibilidade = document.querySelector('.botao-acessibilidade');
    
    // ---- Aumentar Fonte ----
    const aumentarFonte = document.getElementById('aumentarFonte');
    let tamanhoFonte = 16; // tamanho padrão em px (referência)
    
    aumentarFonte.addEventListener('click', function() {
        let body = document.body;
        let estiloAtual = window.getComputedStyle(body, null).getPropertyValue('font-size');
        let tamanhoAtual = parseFloat(estiloAtual);
        let novoTamanho = tamanhoAtual + 2;
        if (novoTamanho <= 28) { // limite máximo para não quebrar layout
            body.style.fontSize = novoTamanho + 'px';
        }
    });
    
    // ---- Diminuir Fonte ----
    const diminuirFonte = document.getElementById('diminuirFonte');
    
    diminuirFonte.addEventListener('click', function() {
        let body = document.body;
        let estiloAtual = window.getComputedStyle(body, null).getPropertyValue('font-size');
        let tamanhoAtual = parseFloat(estiloAtual);
        let novoTamanho = tamanhoAtual - 2;
        if (novoTamanho >= 12) { // limite mínimo para legibilidade
            body.style.fontSize = novoTamanho + 'px';
        }
    });
    
    // ---- Alto Contraste ----
    const altoContraste = document.getElementById('altoContraste');
    
    altoContraste.addEventListener('click', function() {
        document.body.classList.toggle('alto-contraste');
    });
    
    // 2. FUNCIONALIDADE PRINCIPAL: SIMULADOR DE PEGADA ECOLÓGICA
    const calcularBtn = document.getElementById('calcularImpacto');
    const mensagemResultado = document.getElementById('mensagemResultado');
    const nivelImpactoBarra = document.getElementById('nivelImpacto');
    
    calcularBtn.addEventListener('click', function() {
        // Obtém os valores selecionados
        let carne = parseInt(document.getElementById('carne').value);
        let madeira = parseInt(document.getElementById('madeira').value);
        let lixo = parseInt(document.getElementById('lixo').value);
        let plantio = parseInt(document.getElementById('plantio').value);
        
        // Cálculo do impacto (quanto menor a pontuação, melhor para o ambiente)
        // Pontuação máxima de impacto = 12 (pior) | mínima = 0 (melhor)
        let pontuacao = 0;
        
        // Carne: 0=todos dias (pior) até 3=raramente (melhor)
        if(carne === 0) pontuacao += 3;
        else if(carne === 1) pontuacao += 2;
        else if(carne === 2) pontuacao += 1;
        else pontuacao += 0;
        
        // Madeira: 0=não verifica (pior) até 2=sempre (melhor)
        if(madeira === 0) pontuacao += 3;
        else if(madeira === 1) pontuacao += 1.5;
        else pontuacao += 0;
        
        // Lixo: 0=tudo junto (pior) até 2=coleta seletiva (melhor)
        if(lixo === 0) pontuacao += 3;
        else if(lixo === 1) pontuacao += 1.5;
        else pontuacao += 0;
        
        // Plantio: 0=nunca (pior) até 2=regularmente (melhor)
        if(plantio === 0) pontuacao += 3;
        else if(plantio === 1) pontuacao += 1.5;
        else pontuacao += 0;
        
        // Define o nível de impacto com base na pontuação (máx 12)
        let percentual = (pontuacao / 12) * 100;
        let nivel = '';
        let classe = '';
        
        if(percentual <= 33) {
            nivel = '🌱 Baixo impacto ambiental! Parabéns! Você ajuda a combater o desmatamento. Continue assim!';
            classe = 'impacto-baixo';
        } else if(percentual <= 66) {
            nivel = '⚠️ Médio impacto ambiental. Você pode melhorar! Pequenas mudanças nos seus hábitos fazem diferença.';
            classe = 'impacto-medio';
        } else {
            nivel = '🔥 Alto impacto ambiental! Seus hábitos contribuem para o desmatamento. Que tal repensar suas escolhas?';
            classe = 'impacto-alto';
        }
        
        // Exibe a mensagem personalizada
        mensagemResultado.innerHTML = `<strong>Sua pontuação: ${pontuacao.toFixed(1)} de 12</strong><br>${nivel}`;
        
        // Atualiza a barra de progresso
        nivelImpactoBarra.style.width = percentual + '%';
        nivelImpactoBarra.className = 'barra-nivel ' + classe;
        
        // Efeito extra: mensagem adicional se tiver pontuação muito alta
        if(percentual > 80) {
            alert('⚠️ Atenção! Seus hábitos estão causando alto impacto no desmatamento. Consulte a seção "Soluções sustentáveis" para saber como mudar!');
        } else if(percentual < 20) {
            alert('🌿 Parabéns! Você é um amigo da floresta. Compartilhe este site com outras pessoas!');
        }
    });
});
