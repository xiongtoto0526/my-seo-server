const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const Markdown = require('markdown-it');
const hljs = require('highlight.js');
const app = express();
const mock_article_list = require('./mock/data.js');

app.set('view engine', 'ejs');
app.use(express.static('public'));

// 门户路由
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

// 文章详情路由
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});