let router = require('express').Router();
const providers = require("../controllers/provider.controller.js");

router.get('/api/file', providers.downloadFile);

module.exports = router;
