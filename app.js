const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const Markdown = require('markdown-it');
const hljs = require('highlight.js');
var i18n = require('i18n');
const _ = require('lodash');
var cookieParser = require('cookie-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());


// i18n config
let html = '';
const {mock_index_list,mock_article_list} = require('./mock/data.js');
const ALL_LANG = require('./constants/i18n.js');
ALL_LANG.forEach(ele => {
    html += `<a href="/lang/${ele.key}">${ele.value}</a>`
})
i18n.configure({
    locales: ALL_LANG.map(ele => ele.key),
    directory: __dirname + '/locales',
    defaultLocale: 'enUS',
    cookie: 'lang',
});
app.use(i18n.init);

function i18nMiddleware(req, res, next) {
    res.locals.__ = function (key) {
        const i18n_data = i18n.getCatalog(req.getLocale());
        return _.get(i18n_data, key);
    };
    var lang = req.cookies.lang || 'en-US';
    i18n.setLocale(req, lang);
    next();
}
app.use(i18nMiddleware);


// router: index
app.get('/', (req, res) => {
    //   const response = await axios.get(`https://dev.webpiloteai.com/articles/${id}`);
    articles = mock_index_list
    res.render('index', { articles, html });
});

// router: article
app.get('/article/:id', async (req, res) => {
    // 获取文章
    const { id } = req.params;
    //   const response = await axios.get(`https://dev.webpiloteai.com/articles/${id}`);
    let temp_article = JSON.parse(JSON.stringify(mock_article_list))
    const article = temp_article.find(article => article.id == id);

    // 转换为html
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
    res.render('article', { article, html });
});

// router: lang
app.get('/lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000, httpOnly: true });
    res.redirect('back');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});