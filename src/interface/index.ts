export interface PedidosRequest {
    id: number;
    dataHora: string;
    forma_de_pagamento?: string;
    observacao?: string;
    valorExtra: number;
    cliente?: number;
    funcionario?: number;
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

export interface FuncionarioResquest {
    id: number;
    user: string;
    senha: string;
    nome: string;
    email: string;
    tipo: boolean
}

export interface ClienteRequest {
    id: number;
    nome: string;
    endereco: string;
    telefone: number;
    pedidos: []
}