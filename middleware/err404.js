module.exports = (req, res) => {
    res.status(404)
        let err = {
            errcode: 404,
            errmsg: 'Книга с данным идентификатором не найдена'
        }
    res.json(err)}