class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
      // cardápio com os códigos, descrições e valores
      const cardapio = {
        'cafe': { descricao: 'Café', valor: 3.00 },
        'chantily': { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        'suco': { descricao: 'Suco Natural', valor: 6.20 },
        'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
        'queijo': { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        'salgado': { descricao: 'Salgado', valor: 7.25 },
        'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        'combo2	': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
      };
  
      // formas de pagamento aceitas
      const formasDePagamento = ['debito', 'credito', 'dinheiro'];
  
      // Verifica se a forma de pagamento é válida
      if (!formasDePagamento.includes(formaDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      let valorTotal = 0;

      if (itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
      // Percorre os itens e calcula o valor total
      for (const itemQuantidade of itens) {
        const [itemCodigo, quantidade] = itemQuantidade.split(',');

        if (parseInt(quantidade) === 0) {
            return "Quantidade inválida!";
          }
        
        if (!cardapio[itemCodigo]) {
          return "Item inválido!";
        }
  
        const item = cardapio[itemCodigo];
  
        if ((itemCodigo === 'chantily' && (itens.find((j) => j.includes('cafe')) === undefined ||
                                            !itens.find((j) => j.includes('cafe')).length > 0)) || 
        (itemCodigo === 'queijo' && (itens.find((j) => j.includes('sanduiche')) === undefined ||
                                        !itens.find((j) => j.includes('sanduiche')).length > 0))
        ) {
          return "Item extra não pode ser pedido sem o principal";
        }
  
        valorTotal += item.valor * parseInt(quantidade);
      }
  
      // Aplica desconto ou acréscimo conforme a forma de pagamento
      if (formaDePagamento === 'dinheiro') {
        valorTotal *= 0.95; // Desconto de 5% para pagamento em dinheiro
      } else if (formaDePagamento === 'credito') {
        valorTotal *= 1.03; // Acréscimo de 3% para pagamento a crédito
      }
  
      // Formata o valor para o formato R$ X,XX
      const valorFormatado = "R$ " + valorTotal.toFixed(2).replace('.', ',');
  
      return valorFormatado;
    }
  }
  
  export { CaixaDaLanchonete };
  