var path = require('path');
var fs = require('fs');


/**
 * 该文件用于将翻译结果写入到对应的i18n文件中，执行方式为，项目目录下：npm run gen
 * 
 * 通过chatGPT 或 文心一言（https://yiyan.baidu.com/）等AI聊天，输入以下prompt:
 * 【 请将 “你好” 进行翻译，包含语言 deDE、enUS、esES、frFR、itIT、jaJP、koKR、nlNL、ptBR、ruRU、zhCN、zhTW， 输出结果以key-value方式的json，如：{"deDE": "xxx","enUS":"xxx_w"} 】
 * 即可生成下面的 value_input。
 */

const value_input = {  
  "deDE": "Die heißesten Artikel",  
  "enUS": "Most popular articles",  
  "esES": "Los artículos más populares",  
  "frFR": "Les articles les plus populaires",  
  "itIT": "Gli articoli più popolari",  
  "jaJP": "最も人気のある記事",  
  "koKR": "가장 인기있는 글",  
  "nlNL": "De meest populaire artikels",  
  "ptBR": "Os artigos mais populares",  
  "ruRU": "Самые популярные статьи",  
  "zhCN": "最热门的文章",  
  "zhTW": "最熱門的文章"  
}

const key_input = "page.home.hot"  // reset it with the key you want to add

const projectDirectory = process.cwd();
const modulePath = path.join(projectDirectory, './locales');
const languages = ['deDE', 'enUS', 'esES', 'frFR', 'itIT', 'jaJP', 'koKR', 'nlNL', 'ptBR', 'ruRU', 'zhCN', 'zhTW'];

function checkKeyPathExists(json, keyPath) {
  const keys = keyPath.split('.');
  let currentObj = json;

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] in currentObj) {
      currentObj = currentObj[keys[i]];
    } else {
      return false;
    }
  }

  return true;
}

function setKeyPathValue(json, keyPath, value) {
  const keys = keyPath.split('.');
  let currentObj = json;

  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
      currentObj[keys[i]] = value;
    } else {
      if (!(keys[i] in currentObj)) {
        currentObj[keys[i]] = {};
      }
      currentObj = currentObj[keys[i]];
    }
  }
}

languages.forEach(language => {
  const filePath = path.join(modulePath, `${language}.json`);
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(data);

  if (checkKeyPathExists(jsonData, key_input)) {
    console.log(`key already exists in ${language}.json`);
  } else {
    setKeyPathValue(jsonData, key_input, value_input[language]);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  }
});
