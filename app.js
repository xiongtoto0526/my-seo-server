const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const mock_article_list = require('./mock/data.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
// 门户路由
app.get('/', (req, res) => {
    res.render('index');
});

// 文章详情路由
app.get('/article/:id', async (req, res) => {
    const { id } = req.params;
    //   const response = await axios.get(`https://api.example.com/articles/${id}`);
    const article = mock_article_list.find(article => article.id == id);
    res.render('article', { article });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});