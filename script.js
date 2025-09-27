// Classe Produto
class Produto {
  constructor(nome, preco, quantidade = 1) {
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }

  subtotal() {
    return this.preco * this.quantidade;
  }
}

// Classe Carrinho
class Carrinho {
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(novoProduto) {
    const existente = this.produtos.find(p => p.nome === novoProduto.nome);
    if (existente) {
      existente.quantidade += novoProduto.quantidade;
    } else {
      this.produtos.push(novoProduto);
    }
    this.mostrarNoHTML();
  }

  removerProduto(nome) {
    const produto = this.produtos.find(p => p.nome === nome);
    if (produto) {
      produto.quantidade--;
      if (produto.quantidade <= 0) {
        this.produtos = this.produtos.filter(p => p.nome !== nome);
      }
    }
    this.mostrarNoHTML();
  }

  calcularTotal() {
    return this.produtos.reduce((soma, produto) => soma + produto.subtotal(), 0);
  }

  mostrarNoHTML() {
    const lista = document.getElementById("lista-produtos");
    const totalElem = document.getElementById("total");

    lista.innerHTML = "";

    this.produtos.forEach(produto => {
      const li = document.createElement("li");
      li.classList.add("food-list__item");

      li.innerHTML = `
        <div class="food-buy-amount">
          <button class="btn-menos botao-carr" data-nome="${produto.nome}">-</button>
          ${produto.quantidade}x
          <button class="btn-mais botao-carr" data-nome="${produto.nome}">+</button>
        </div>
        <div class="food-name">${produto.nome}</div>
        <div class="food-price">R$ ${produto.subtotal().toFixed(2)}</div>
      `;

      lista.appendChild(li);
    });

    totalElem.textContent = "TOTAL: R$ " + this.calcularTotal().toFixed(2);

    // Eventos dos botões + e -
    document.querySelectorAll(".btn-mais").forEach(botao => {
      botao.addEventListener("click", () => {
        const nome = botao.getAttribute("data-nome");
        this.adicionarProduto(new Produto(nome, this.getPreco(nome), 1));
      });
    });

    document.querySelectorAll(".btn-menos").forEach(botao => {
      botao.addEventListener("click", () => {
        const nome = botao.getAttribute("data-nome");
        this.removerProduto(nome);
      });
    });
  }

  getPreco(nome) {
    const produto = this.produtos.find(p => p.nome === nome);
    return produto ? produto.preco : 0;
  }
}

// Criar carrinho
const carrinho = new Carrinho();

// Capturar cliques nos botões "COMPRAR"
document.querySelectorAll(".btn-comprar").forEach(botao => {
  botao.addEventListener("click", () => {
    const nome = botao.getAttribute("data-nome");
    const preco = parseFloat(botao.getAttribute("data-preco"));
    const produto = new Produto(nome, preco, 1);
    carrinho.adicionarProduto(produto);
  });
});