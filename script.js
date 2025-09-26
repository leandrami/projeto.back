// Classe Produto
class Produto {
  constructor(nome, preco, quantidade) {
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

  adicionarProduto(produto) {
    this.produtos.push(produto);
  }

  calcularTotal() {
    return this.produtos.reduce((soma, produto) => soma + produto.subtotal(), 0);
  }

  mostrarNoHTML() {
    const lista = document.getElementById("lista-produtos");
    const totalElem = document.getElementById("total");

    lista.innerHTML = ""; // limpa antes de adicionar

    this.produtos.forEach(produto => {
      const li = document.createElement("li");
      li.textContent = `${produto.nome} - ${produto.quantidade}x R$${produto.preco.toFixed(2)} = R$${produto.subtotal().toFixed(2)}`;
      lista.appendChild(li);
    });

    totalElem.textContent = "TOTAL: R$ " + this.calcularTotal().toFixed(2);
  }
}

// Criando produtos
const prod1 = new Produto("Pizza", 30, 2);
const prod2 = new Produto("Suco", 8, 3);
const prod3 = new Produto("Sobremesa", 15, 1);

// Criando carrinho
const carrinho = new Carrinho();
carrinho.adicionarProduto(prod1);
carrinho.adicionarProduto(prod2);
carrinho.adicionarProduto(prod3);

// Mostra no HTML
carrinho.mostrarNoHTML();