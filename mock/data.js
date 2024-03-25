const markdownConst = `# 标题1

这是一个段落。你可以在这里写一些文本。

## 标题2

这是一个链接：[点击这里](https://www.example.com)

### 标题3

这是一个表格：

| 列1 | 列2 | 列3 |
| --- | --- | --- |
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

以下是一个Python代码块：

\`\`\`python
def add_numbers(a, b):
  return a + b

result = add_numbers(3, 5)
print(result)
\`\`\``

const mock_article_list = [
  { id: "id1", title: "Article 1", content: "This is the content of article 1", keywords: "keyword1", description: "Description1" },
  { id: "id2", title: "Article 2", content: "This is the content of article 2", keywords: "keyword2", description: "Description1" },
  { id: "id3", title: "Article 3", content: markdownConst, keywords: "keyword3", description: "Description1" },
];

module.exports = mock_article_list;