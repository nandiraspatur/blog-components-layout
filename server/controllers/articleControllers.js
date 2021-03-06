const Article = require('../models/articleModel')

getOne = (req, res) => {
  Article.findById(req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

getAll = (req, res) => {
  Article.find()
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

post = (req, res) => {
  let newArticle = {
    title: req.body.title,
    content: req.body.content,
    author: req.userLogin.username,
    category: req.body.category
  }
  Article.create(newArticle)
  .then(response => {
    let status = {
      status: 'success',
      data: response
    }
    res.status(200).send(status)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
}

update = (req, res) => {
  Article.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true })
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

remove = (req, res) => {
  Article.findByIdAndRemove(req.params.id)
  .then(response => {
    let status = {
      status: 'deleted',
      data: response
    }
    res.status(200).send(status)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  getOne,
  getAll,
  post,
  update,
  remove
}
