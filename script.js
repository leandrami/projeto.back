// Classe Produto
class Produto {
  constructor(nome, preco, quantidade) {
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }

  // Método para calcular o subtotal de cada produto
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

  mostrarResumo() {
    console.log("Resumo da Compra:");
    this.produtos.forEach(produto => {
      console.log(
        `${produto.nome} - ${produto.quantidade}x R$${produto.preco.toFixed(2)} = R$${produto.subtotal().toFixed(2)}`
      );
    });
    console.log("TOTAL: R$" + this.calcularTotal().toFixed(2));
  }
}

// Criando 3 produtos
const prod1 = new Produto("Pizza", 30, 2);
const prod2 = new Produto("Suco", 8, 3);
const prod3 = new Produto("Sobremesa", 15, 1);

// Criando o carrinho e adicionando os produtos
const carrinho = new Carrinho();
carrinho.adicionarProduto(prod1);
carrinho.adicionarProduto(prod2);
carrinho.adicionarProduto(prod3);

// Exibindo resumo no console
carrinho.mostrarResumo();