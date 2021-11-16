export interface PedidosRequest {
    id: string;
    dataHora: string;
    forma_de_pagamento?: string;
    observacao?: string;
    valorExtra?: string;
    cliente?: string;
    funcionario?: string;
    status: string;
}