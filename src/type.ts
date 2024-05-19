export type TTransaction = {
    value: number,
    date: string,
    description: string
}

export type TUser = {
    id: number, 
    name: string,
    cpf: string,
    birthDate: string,
    balance: number,
    statement: TTransaction[]
}