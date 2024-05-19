import express, { Request, Response } from 'express';
import cors from 'cors';
import { users } from './database';
import { TTransaction, TUser } from './type';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Server running on port 3003.");
});

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});

// getAllUsers & findUserByName
app.get("/users", (req: Request, res: Response) => {
    try {
        const search: string = req.query.search as string

        if (search) {
            const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
            res.status(200).send(filteredUsers)
        } else {
            res.status(200).send(users)
        }

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error.")
        }
    }

})

// createUser
app.post("/users", (req: Request, res: Response) => {
    try {
        const { name, cpf, birthDate } = req.body

        if (!name || !cpf || !birthDate) {
            throw new Error("Não foi possível atualizar a conta, algum dado não preenchido.")
        }

        const findCpf = users.find(u => u.cpf === cpf)
        if (findCpf) {
            throw new Error("CPF já cadastrado.")
        }

        // Age calculation in timestamp (milliseconds)
        const [day, month, year] = birthDate.split("/")
        const birthDateTimestamp: number = new Date(`${year}-${month}-${day}T00:00:00.000Z`).getTime()
        const actualTimeTimestamp: number = new Date().getTime()
        const age: number = actualTimeTimestamp - birthDateTimestamp

        // One Year Timestamp
        // hours in one day: 24
        // minutes in one hour: 60
        // seconds in one minute: 60 
        // milliseconds in one second: 1000
        const millisecondsPerDay: number = 24 * 60 * 60 * 1000
        // days in one year: 365
        const oneYearTimestamp: number = 365 * millisecondsPerDay

        if (age > 18 * oneYearTimestamp) {
            const newUser: TUser = {
                id: users.length + 1,
                name,
                cpf,
                birthDate,
                balance: 0,
                statement: []
            }

            users.push(newUser)
            res.status(201).send(users)
        } else {
            throw new Error("É preciso acima de 18 anos para criar uma conta.")
        }


    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error.")
        }
    }

})

// getBalancebyCPF
app.get("/users/:cpf", (req: Request, res: Response) => {
    try {
        const cpf = req.params.cpf

        if (!cpf) {
            throw new Error("Não foi possível atualizar a conta, algum dado não preenchido.")
        }

        const findCpf = users.find(u => u.cpf === cpf)
        if (!findCpf) {
            throw new Error("CPF inexistente.")
        }

        const balance = users.filter(u => u.cpf === cpf).map(u => u.balance)

        res.status(200).send(`Saldo:${balance}`)


    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error.")
        }
    }

})

// deposit
app.put("/users/:name/:cpf/deposit", (req: Request, res: Response) => {
    try {
        const { name, cpf } = req.params
        const { value } = req.body

        if (!name || !cpf || !value) {
            throw new Error("Não foi possível atualizar a conta, algum dado não preenchido.")
        }

        // new Date() to date br format  
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0'); // day with 0 to the left, if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // month with 0 to the left, if needed
        const year = date.getFullYear(); // year with four digits

        const formattedDate = `${day}/${month}/${year}`;

        const userAccount = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.cpf === cpf)
        if (!userAccount) {
            throw new Error("CPF e/ou nome inexistente.")
        }

        userAccount.balance += value

        userAccount.statement.push({
            value,
            date: formattedDate,
            description: "Depósito de dinheiro"
        })


        res.status(200).send(userAccount)


    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error.")
        }
    }

})


// payment
app.post("/users/:name/:cpf/payment", (req: Request, res: Response) => {
    try {
        const { name, cpf } = req.params
        const { value } = req.body

        if (!name || !cpf || !value) {
            throw new Error("Não foi possível atualizar a conta, algum dado não preenchido.")
        }

        // new Date() to date br format  
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0'); // day with 0 to the left, if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // month with 0 to the left, if needed
        const year = date.getFullYear(); // year with four digits

        const formattedDate = `${day}/${month}/${year}`;

        const userAccount = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.cpf === cpf)
        if (!userAccount) {
            throw new Error("CPF e/ou nome inexistente.")
        }

        if (value < userAccount.balance) {
            userAccount.balance -= value

            userAccount.statement.push({
                value: value * -1,
                date: formattedDate,
                description: "Pagamento de conta"
            })


            res.status(200).send(userAccount)
        } else {
            throw new Error("Valor da conta maior que seu saldo. Pagamento cancelado.")
        }



    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error.")
        }
    }

})

// newBalance
app.put("/users/:name/:cpf/balance", (req: Request, res: Response) => {
    try {
        const { name, cpf } = req.params

        if (!name || !cpf) {
            throw new Error("Não foi possível atualizar a conta, algum dado não preenchido")
        }

        const userAccount = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.cpf === cpf)
        if (!userAccount) {
            throw new Error("CPF e/ou nome inexistente.")
        }

        userAccount.statement.forEach(u => {
            userAccount.balance += u.value
        })

        res.status(200).send(userAccount)

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error.")
        }
    }

})

app.post("/users/:name/:cpf/transfer", (req: Request, res: Response) => {
    try {
        const { name, cpf } = req.params
        const { nameAddressee, cpfAddresse, value } = req.body

        if (!name || !cpf || !value || !nameAddressee || !cpfAddresse) {
            throw new Error("Não foi possível atualizar a conta, algum dado não preenchido.")
        }

        // new Date() to date br format  
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0'); // day with 0 to the left, if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // month with 0 to the left, if needed
        const year = date.getFullYear(); // year with four digits

        const formattedDate = `${day}/${month}/${year}`;

        const userAccount = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.cpf === cpf)
        if (!userAccount) {
            throw new Error("CPF e/ou nome inexistente.")
        }

        const userDestination = users.find(u => u.cpf === cpfAddresse)
        if (!userDestination) {
            throw new Error("CPF do destinátario inexistente.")
        }

        if(value < userAccount.balance){
        userAccount.statement.push({
            value: - value,
            date: formattedDate,
            description: `Transferência de ${userAccount.name} para ${nameAddressee}`
        })
        userDestination.statement.push({
            value:  value,
            date: formattedDate,
            description: `Transferência de ${userAccount.name} para ${nameAddressee}`
        })
            
        res.status(200).send("Transferência realizada com sucesso. Atualize seu saldo.")
    } else {
        throw new Error("Saldo para transferência insuficiente.")
    } 

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error.")
        }
    }

})


