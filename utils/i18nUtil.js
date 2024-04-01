const ALL_LANG = require('../constants/i18n.js');

function generateLangLinks() {
    let html = '';
    ALL_LANG.forEach(ele => {
        html += `<a href="/lang/${ele.key}">${ele.value}</a>`
    });
    return html;
}

module.exports = generateLangLinks;