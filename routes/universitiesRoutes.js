const router = require('express').Router()
const Universities = require('../models/Universities')

//Método para Cadastro de Universidades

router.post('/', async (req, res) => {
  const { alpha_two_code, web_pages, name, country, domains, state_province } = req.body

  if (!alpha_two_code) {
    res.status(422).json({ error: 'Sigla do país é obrigatória' })
  }

  const universities = {
    alpha_two_code,
    web_pages,
    name,
    country,
    domains,
    state_province,
  }

  try {
    await Universities.create(universities)

    res.status(201).json({ message: 'Universidade inserida no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

//Método para listagem das Universidades

router.get('/', async (req, res) => {
  try {
    const universities = await Universities.find()

    res.status(200).json(universities)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

// Buscar Universidade pelo ID

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const universities = await Person.findOne({ _id: id })

    if (!universities) {
      res.status(422).json({ message: 'Universidade não encontrada!' })
      return
    }

    res.status(200).json(universities)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

// Método para atualização de Universidades

router.put('/:id', async (req, res) => {
  const id = req.params.id

  const { web_pages, name, domains } = req.body

  const universities = {
    web_pages,
    name,
    domains,
  }

  try {
    const updatedUniversities = await Universities.updateOne({ _id: id }, universities)

    if (updatedUniversities.matchedCount === 0) {
      res.status(422).json({ message: 'Universidade não encontrado!' })
      return
    }

    res.status(200).json(universities)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

// Método para remoção de Universidades:

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const universities = await Universities.findOne({ _id: id })

  if (!universities) {
    res.status(422).json({ message: 'Universidade não encontrado!' })
    return
  }

  try {
    await Universities.deleteOne({ _id: id })

    res.status(200).json({ message: 'Universidade removida com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

// Rota teste

router.get('/', (req, res) => {

  res.json({ message: 'Oi Express!' })

})

module.exports = router;