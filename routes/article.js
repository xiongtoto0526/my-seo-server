const express = require('express');
const router = express.Router();
const { getDomain, isLocal, isDev } = require('../constants/domain.js');
const axios = require('axios');
const ejs = require('ejs');
const Markdown = require('markdown-it');
const hljs = require('highlight.js');
const generateLangLinks = require('../utils/i18nUtil');

// router: article
router.get('/:id', async (req, res, next) => {
    try {
        let html = generateLangLinks();
        const { id } = req.params;
        const host = getDomain(req)
        const response = await axios.get(`${host}/long/${id}/content`);
        const article = response.data;

        // 转换为html
        const md = Markdown({
            highlight: (str, lang) => {
                const code = lang && hljs.getLanguage(lang)
                    ? hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true,
                    }).value
                    : md.utils.escapeHtml(str);
                return `<pre class="hljs"><code>${code}</code></pre>`;
            },
        }).render(article.content);
        article.content = md
        res.render('article', { article, html });
    } catch (error) {
        console.log(error)
        next(error)
    }
});

module.exports = router;