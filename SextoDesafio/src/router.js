const { Router } = require('express')

const router = new Router()

router.get("/", (req, res) => {
    res.render("pages/formu")
})

module.exports = {
    router
}