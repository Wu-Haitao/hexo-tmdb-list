# hexo-tmdb-list

> 修改自 https://github.com/HCLonely/hexo-bilibili-bangumi

为 Hexo 添加电影页，数据来源是 [TMDB](https://www.themoviedb.org/)。

首先要在 TMDB 注册并申请一个 api，然后创建片单并加入影片。

在 _config.yml 中加入如下配置：

```yaml
tmdbList:
  enable: true
  path:
  api: ''
  listId: ''
  title: '电影收藏夹'
  quote: '来一起看电影吧~'
```

api: https://www.themoviedb.org/settings/api 中的 API 密钥 (v3 auth)

listId: https://www.themoviedb.org/list/XXXXX 最后这串数字

在 `hexo g` 之前先执行 `hexo tmdbList -u` 更新数据，在 source/_data/ 中应该会生成 tmdbList.json 文件。

电影顺序是上映年份。

[DEMO](https://wu-haitao.github.io/tmdbList/)
