const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const Markdown = require('markdown-it');
const hljs = require('highlight.js');
var i18n = require('i18n');
const mock_article_list = require('./mock/data.js');

// config
const app = express();
i18n.configure({
    locales:['en', 'zh'],
    directory: __dirname + '/locales',
    defaultLocale: 'zh',
    cookie: 'lang',
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(i18n.init); 


// index
app.get('/', (req, res) => {
    //   const response = await axios.get(`https://dev.webpiloteai.com/articles/${id}`);
    const articles = [
        { title: 'Article 111', url: '/article/id1' },
        { title: 'Article 2', url: '/article/id2' },
        { title: 'Article 3', url: '/article/id3' },
        // ...
    ];
    res.render('index', { articles });
});

// article
app.get('/article/:id', async (req, res) => {
    const { id } = req.params;
    //   const response = await axios.get(`https://dev.webpiloteai.com/articles/${id}`);
    let temp_article = JSON.parse(JSON.stringify(mock_article_list))
    const article = temp_article.find(article => article.id == id);
    article.content = Markdown({
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
    res.render('article', { article });
});

// lang
app.get('/lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000, httpOnly: true });
    res.redirect('back');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});