# IWFS: Sistema Bancário

## Descrição

IWFS (Internet Web Financial System) é um sistema bancário simulado que permite criar contas, consultar saldo, adicionar saldo, pagar contas e realizar transferências internas entre contas. Este projeto foi desenvolvido para fornecer um exemplo de como implementar funcionalidades básicas de um sistema bancário em uma aplicação web. Este é um sistema bancário básico implementado em Node.js usando Express. 

## Documentação
https://documenter.getpostman.com/view/21558010/2sA3QmCZpz

## Funcionalidades

### Criar Conta
Um cliente pode criar uma conta no banco se tiver idade acima de 18 anos. Ele deve informar:
- **Nome**
- **CPF**
- **Data de nascimento**

As contas devem guardar essas informações e uma propriedade para representar o **saldo** do usuário. Além disso, devem ser guardados todos os gastos do usuário num array de **extrato** (possuindo o **valor**, a **data** e uma **descrição**). Todas as contas, ao serem criadas, começam com o saldo zerado. Não podem existir dois usuários diferentes com o mesmo CPF.

### Pegar Saldo
O usuário deve conseguir verificar o saldo da sua conta, passando o seu **nome** e o seu **CPF**.

### Adicionar Saldo
O usuário deve conseguir adicionar saldo à sua conta, passando o seu **nome**, o **CPF** e o **valor** que desejar.

### Pagar Conta
Os clientes podem pagar uma conta passando:
- **Valor**
- **Descrição**

 Além disso, o cliente não pode tentar pagar uma conta cujo valor seja maior do que o seu saldo.

### Transferência Interna
Para realizar uma transferência interna, o usuário deve informar:
- Seu **nome**
- Seu **CPF**
- **Nome do destinatário**
- **CPF do destinatário**
- **Valor** a ser transferido

Transferências não podem ser agendadas e devem respeitar o saldo do usuário remetente.





