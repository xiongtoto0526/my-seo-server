const express = require('express');
const router = express.Router();
const { getDomain, isLocal, isDev } = require('../constants/domain.js');
const axios = require('axios');
const generateLangLinks = require('../utils/i18nUtil');


// router: index
router.get('/', async (req, res, next) => {
    try {
        let html = generateLangLinks();
        const page = req.query.page;
        const host = getDomain(req);
        const page_size = 10;
        const response = await axios.get(`${host}/long/picks`, { params: { page_num: page, page_size } });
        const articles = response.data;

        const hide_more_script = `
        <script>
            const moreLink = document.getElementById('more-link');
            if (moreLink) {
                moreLink.style.display = 'none';
            }
        </script>
    `;
        const hideMoreScript = articles.length < page_size ? hide_more_script : '';
        res.render('index', { articles, html, hideMoreScript: hideMoreScript });
    } catch (error) {
        next(error);
    }
});

module.exports = router;