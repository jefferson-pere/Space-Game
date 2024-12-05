fly() {
    // Atualiza a posição vertical (y) com base na velocidade
    this.y += this.speed;

    // Atualiza a posição horizontal (x) com base em uma fórmula trigonométrica, considerando a pontuação e a categoria de voo
    this.x = ((Math.cos((this.y / 100) * this.flyCategory) * score) / 100) * this.flyCategory + this.baseX;

    // Aplica a transformação de estilo para mover o elemento na tela de forma suave
    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;

    // Condição para remover o elemento quando ele sair da tela ou quando a vida for 0
    if (this.y - this.offScreenTopElementDiscount > spaceContainerHeight || this.life <= 0) {
        this.element.remove();
    }

    // Se necessário, pode-se usar `requestAnimationFrame` para manter a animação suave, invocando a função novamente.
    if (this.y <= spaceContainerHeight) {
        requestAnimationFrame(() => this.fly());
    }
}