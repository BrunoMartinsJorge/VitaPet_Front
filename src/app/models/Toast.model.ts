export interface ToastModel{
    tipo: 'success' | 'error' | 'info' | 'warning'
    mensagem: string
    duracao: number
    icone?: string
}