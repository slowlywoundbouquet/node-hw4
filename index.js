const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const { v4: uuid } = require('uuid')

class Users {
    constructor(id=uuid(), mail="test@mail.ru") {
        this.id = id
        this.mail = mail
    }
}

const userStore = {
    users: [],
}

app.post('/api/user/login', (req, res) => {
    const {users} = userStore
    const {id, mail} = req.body

    const newUsers = new Users(id, mail)
    users.push(newUsers)
    res.status(201)
    res.json(newUsers)
})

app.get('/api/user/', (req, res) => {
    const {users} = userStore
    res.json(users)
})


class Books {
    constructor(id = uuid(), title="", description="", authors="", favorite="", fileCover="", fileName="") {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
    }
}

const store = {
    books: [],
}

app.post('/api/books', (req, res) => {
    const {books} = store
    const {id, title, description, authors, favorite, fileCover, fileName} = req.body

    const newBooks = new Books(id, title, description, authors, favorite, fileCover, fileName)
    books.push(newBooks)
    res.status(201)
    res.json(newBooks)
})

app.get('/api/books', (req, res) => {
    const {books} = store
    res.json(books)
})

app.get('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const index = books.findIndex(el => el.id === id)

    if(index !== -1) {
        res.json(books[index])
    }
    else {
        res.status(404)
        res.json('Книга с данным идентификатором не найдена')
    }
})

app.put('/api/books/:id', (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    const index = books.findIndex(el => el.id === id)

    if(index !== -1) {
        books[index] = {
            ...books[index],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }
        res.json(books[index])
    }
    else {
        res.status(404)
        res.json('Книга с данным идентификатором не найдена')
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const index = books.findIndex(el => el.id === id)

    if(index !== -1) {
        books.splice(index, 1)
        res.json('Книга удалена.')
    }
    else {
        res.status(404)
        res.json('Книга с данным идентификатором не найдена')
    }
})

app.listen(3000)