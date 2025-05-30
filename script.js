document.addEventListener('DOMContentLoaded', function() {
    // Efeito de confete contínuo
    function fireConfetti() {
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
        });
        
        setTimeout(fireConfetti, 2000);
    }
    
    fireConfetti();
    
    // Verificar respostas
    const verificarBtn = document.getElementById('verificar');
    const feedback = document.getElementById('feedback');
    
    // Solução correta
    const solucaoCorreta = {
        lucas: { mochila: 'vermelha', item: 'livro' },
        ana: { mochila: 'verde', item: 'sanduiche' },
        tiago: { mochila: 'azul', item: 'caderno' },
        sofia: { mochila: 'amarela', item: 'brinquedo' }
    };
    
    // Habilitar botão quando todas as seleções estiverem feitas
    function verificarSelecoes() {
        const todasSelecionadas = Array.from(document.querySelectorAll('.crianca')).every(crianca => {
            const mochila = crianca.querySelector('.mochila').value;
            const item = crianca.querySelector('.item').value;
            return mochila && item;
        });
        
        verificarBtn.disabled = !todasSelecionadas;
    }
    
    // Adicionar event listeners para os selects
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', verificarSelecoes);
    });
    
    // Verificar respostas quando o botão for clicado
    verificarBtn.addEventListener('click', function() {
        let todasCorretas = true;
        
        for (const [criancaId, solucao] of Object.entries(solucaoCorreta)) {
            const divCrianca = document.getElementById(criancaId);
            const mochilaSelecionada = divCrianca.querySelector('.mochila').value;
            const itemSelecionado = divCrianca.querySelector('.item').value;
            
            if (mochilaSelecionada !== solucao.mochila || itemSelecionado !== solucao.item) {
                todasCorretas = false;
                break;
            }
        }
        
        if (todasCorretas) {
            feedback.textContent = 'Parabéns! Todas as respostas estão corretas! 🎉';
            feedback.style.color = '#2a9d8f';
            
            // Disparar mais confetes
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
            
            // Abrir dica.html em nova aba após 2 segundos
            setTimeout(() => {
                window.open('dica.html', '_blank');
            }, 2000);
        } else {
            feedback.textContent = 'Algumas respostas estão incorretas. Tente novamente!';
            feedback.style.color = '#e63946';
        }
    });
});
