# LabeBank - Integração IWSF Sistma Bancário 

## Escopo do Projeto

Um dos bancos mais famosos do brasil, o LabeBank, está passando por alguns problemas sérios de performance em suas aplicações. Isso significa que as movimentações financeiras que passam pelos seus sistemas estão muito lerdas: o que é muito preocupante já que impede a empresa de ter novos usuários e crescer. Tendo isto em mente, o LabeBank decidiu elaborar um concurso para uma POC de um sistema bancário usando Typescript.

POC é uma sigla que significa "Proof of Concept" ("Prova de Conceito" em tradução livre). É muito comum fazermos uma POC quando queremos apresentar uma nova tecnologia ou arquitetura para uma empresa, com o objetivo de convencê-la a utilizá-las. Uma POC, normalmente, não é muito complexa, mas deve possuir todas as funcionalidades básicas que permitam concluir se o conceito utilizado é válido para resolver o problema ou não. 

Com isso tudo em mente, você deve implementar uma POC com o objetivo de ganhar esta competição.


------------------

## ⚙️ Principais Ferramentas Utilizadas

▪ TypeScript
▪ Node JS
▪ Cors
▪ Express
▪ Git/GitHub

## ✔️ Funcionalidades 

* Criar Conta - Um cliente pode criar uma conta no banco se tiver idade igual ou maior do que 18 anos. Ele deve informar: **nome**, **CPF** e **data de nascimento**. As contas devem guardar essas informações e uma propriedade para representar o **saldo** do usuário. Além disso são guardados, também, todos os gastos do usuário num array de **extrato** (possuindo o **valor**, a **data** e uma **descrição**). As contas, ao serem criadas, começam com o saldo zerado. Não podem existir dois usuários diferentes com o mesmo CPF.

* Pegar Saldo - O usuário consegue verificar o saldo da sua conta, passando o seu nome e o seu CPF. 

* Adicionar Saldo - O usuário consegue adicionar saldo à sua conta, passando seu nome, o CPF e o valor que desejar. 

* Pagar Conta - Esta funcionalidade é muito importante para os clientes. Eles podem pagar uma conta, se quiserem, passando: um valor, uma descrição e uma data de pagamento. Caso ele não informe a date, deve-se considerar que o pagamento é para ser feito no mesmo dia. Além disso, ele não pode agendar um pagamento para um dia que já passou ou tentar pagar uma conta cujo valor seja maior do que o seu saldo.

* Tranferência Interna -A transferência entre contas é muito mais interessante ao banco do que aos clientes em si, porque, com esta funcionalidade, ela consegue influenciar seus clientes a convencerem conhecidos a migrarem para o banco. Para realizar esta transferência, o usuário deve informar o seu nome, o seu CPF, o nome do destinatário, o CPF do destinatário e o valor em si. Transferências não podem ser agendadas e devem respeitar o saldo do usuário remetente.

