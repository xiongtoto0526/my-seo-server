# basic
- run: <code>node app.js</code>
- deploy:  todo


# core tech
express + ejs

# folder intro
| 目录       |   含义           |
|-----------|------------------|
| public    | 对外资源 |
| mock       | 模拟数据|
| views    | 路由模版|
| constants | 常量定义|
| styles    | 公共样式|
| types     | 公共类型|
| utils     | 公共方法||


# ide
- for vscode : recommend [CSS Modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)

# mobile support
- for jsx:utils/screen.ts, useResponsive is the best choice, eg: layout.tsx
- for css: @media, .eg: styles/index.less , eg: login.module.less


# i18n
- gen:
<code>npm run gen</code> (This will helps you generate new word to update all xxx.json quickly. For more usage, go to scripts/gen.js )
- usage:
    - for js: i18n.t() eg: request.ts
    - for jsx: useTranslation eg: layout.tsx
    - for backend: // content = "$i18n{key1} 1234 $i18n{key2}blabla$i18n{key3}"  ,use it(content). eg: i18n.ts
- svg:
    - https://purecatamphetamine.github.io/country-flag-icons/3x2/index.html    (eg:https://purecatamphetamine.github.io/country-flag-icons/3x2/AT.svg)
- code:
    - https://github.com/michaelwittig/node-i18n-iso-countries/tree/master/langs