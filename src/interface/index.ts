export interface PedidosRequest {
    id: string;
    dataHora: string;
    forma_de_pagamento?: string;
    observacao?: string;
    valorExtra: number;
    cliente?: string;
    funcionario?: string;
    status: string;
}

export interface CloseModal {
    closeModal: () => void;
}

export interface ProdutoRequest {
    id: string;
    nome: string;
    valor: number;
    descricao: string;
    imagem: string
}