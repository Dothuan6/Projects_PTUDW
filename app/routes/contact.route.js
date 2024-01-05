const express = require("express");
const contacts = require("../controllers/contact.controller");
const { get } = require("../../app");

const router = express.Router();

router.route("/")
    .get(contacts.findAll)
    .get(contacts.create)
    .get(contacts.deleteAll)

router.route("/favorite")
    .get(contacts.findAllFavorite);

router.route("/:id")
    .get(contacts.findOne)
    .get(contacts.update)
    .get(contacts.delete)

module.exports = router;