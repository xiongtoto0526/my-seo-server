const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const Markdown = require('markdown-it');
const hljs = require('highlight.js');
var i18n = require('i18n');
const _ = require('lodash');
const ALL_LANG = require('./constants/i18n.js');
const { getDomain, isLocal, isDev } = require('./constants/domain.js');
var cookieParser = require('cookie-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());

// i18n config
let html = '';
const { mock_index_list, mock_article_list } = require('./mock/data.js');
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
app.get('/', async (req, res, next) => {
    try {
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

// for test: http://localhost:3000/article/4604d009-94c1-4bce-bf3a-1f14487f0666
// router: article
app.get('/article/:id', async (req, res, next) => {
    try {
        // 获取文章
        const { id } = req.params;
        const host = getDomain(req)
        const response = await axios.get(`${host}/long/${id}/content`);
        const article = response.data;
        // let temp_article = JSON.parse(JSON.stringify(mock_article_list))
        // const article = temp_article.find(article => article.id == id);

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
    } catch (error) {
        console.log(error)
        next(error)
    }

});

// router: lang
app.get('/lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000, httpOnly: true });
    res.redirect('back');
});

// 404 处理中间件
app.use((req, res, next) => {
    res.status(404).render('404');
});
// 500 处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});