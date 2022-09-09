const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()
const filemulter = require('../middleware/multer')
const path = require('path')

class Books {
    constructor(id = uuid(), title="", description="", authors="", favorite="", fileCover="", fileName="", fileBook="") {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
    }
}

const store = {
    books: [],
}

router.post('/', filemulter.single('fileBook'), (req, res) => {
    const {books} = store
    const {id, title, description, authors, favorite, fileCover, fileName} = req.body
    let fileBook
    if(req.file){
        fileBook = req.file.path
        const newBooks = new Books(id, title, description, authors, favorite, fileCover, fileName, fileBook)
        books.push(newBooks)
        console.log(req.file);
        res.status(201)
        res.json(newBooks)
    }
    else {
        fileBook = null
        const newBooks = new Books(id, title, description, authors, favorite, fileCover, fileName, fileBook)
        books.push(newBooks)
        res.status(201)
        res.json(newBooks)
    }
})

router.get('/:id/download', (req, res) => {
    const {books} = store
    const {id} = req.params
    const index = books.findIndex(el => el.id === id)

    if(index !== -1) {
        let bookpath = books[index].fileBook
        if (bookpath) {
        let fname = path.basename(books[index].fileBook)
        res.download(`${bookpath}`, `${fname}`, err=>{
            if (err){
                res.status(404).json();
            }})
    }
else {
    res.json(err)
}}
    else {
        res.status(404)
        let err = {
            errcode: 404,
            errmsg: 'Книга с данным идентификатором не найдена'  
        }
        res.json(err)
    }   
})

router.get('/', (req, res) => {
    const {books} = store
    res.json(books)
})

router.get('/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const index = books.findIndex(el => el.id === id)

    if(index !== -1) {
        res.json(books[index])
    }
    else {
        res.status(404)
        let err = {
            errcode: 404,
            errmsg: 'Книга с данным идентификатором не найдена'  
        }
        res.json(err)
    }
})

router.put('/:id', filemulter.single('fileBook'), (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const {id} = req.params
    const index = books.findIndex(el => el.id === id)

    if(index !== -1) {
        let fileBook
        if(req.file){
            fileBook = req.file.path
            books[index] = {
                ...books[index],
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName,
                fileBook
        }
        res.json(books[index])
    }else {
        fileBook = null
            books[index] = {
                ...books[index],
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName,
                fileBook
            }
    res.json(books[index])
}
}else {
        res.status(404)
        let err = {
            errcode: 404,
            errmsg: 'Книга с данным идентификатором не найдена'  
        }
        res.json(err)
    }
})

router.delete('/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const index = books.findIndex(el => el.id === id)

    if(index !== -1) {
        books.splice(index, 1)
        res.json('Книга удалена.')
    }
    else {
        res.status(404)
        let err = {
            errcode: 404,
            errmsg: 'Книга с данным идентификатором не найдена'  
        }
        res.json(err)
    }
})

module.exports = router