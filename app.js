const express = require('express');
var i18n = require('i18n');
const _ = require('lodash');
var cookieParser = require('cookie-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
const ALL_LANG = require('./constants/i18n.js');

// i18n 配置
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

// 导入路由
const indexRouter = require('./routes/index');
const articleRouter = require('./routes/article');
app.use('/', indexRouter);
app.use('/article', articleRouter);
app.get('/lang/:lang', (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000, httpOnly: true });
    res.redirect('back');
});

// 404、500 处理
app.use((req, res, next) => {
    res.status(404).render('404');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

// 启动
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});