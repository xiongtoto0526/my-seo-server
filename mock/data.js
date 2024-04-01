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

const mock_index_list =
  [
    {
      "id": "222cbf9f-7363-4bb8-aa74-c6c918f36ed9",
      "title": "Understanding the significance of '2'",
      "snippet": "I'm sorry, but I still don't u",
      "create_time": "3 months ago",
      "character_num": 513
    },
    {
      "id": "29353f4d-b73e-4826-b312-07bbd606a200",
      "title": "i am a title",
      "snippet": "Sure, I'm here to help! What c",
      "create_time": "3 months ago",
      "character_num": 439
    },
    {
      "id": "8faebc4b-e0fc-4463-b680-a45aab158a15",
      "title": "The Number 23: A Natural, Odd, and Prime Number",
      "snippet": "If you are referring to the nu",
      "create_time": "3 months ago",
      "character_num": 536
    },
    {
      "id": "0e7875b6-501d-4af2-be7c-c86b4798cbd0",
      "title": "The Importance of Exercise",
      "snippet": "Hello! How can I assist you to",
      "create_time": "5 months ago",
      "character_num": 422
    }
  ]

const mock_article_list = [
  { id: "id1", title: "Article 1", task: "", snippet: "", create_time: "", content: "This is the content of article 1", keywords: "keyword1", description: "Description1" },
  { id: "id2", title: "Article 2", content: "This is the content of article 2", keywords: "keyword2", description: "Description1" },
  { id: "id3", title: "Article 3", content: markdownConst, keywords: "keyword3", description: "Description1" },
];

module.exports = { mock_index_list, markdownConst, mock_article_list };