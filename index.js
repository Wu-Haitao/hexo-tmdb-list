/* global hexo */
'use strict';

var fs = require('hexo-fs');

var path = require('path');

var axios = require('axios');

var axios_item = require('axios');

var log = require('hexo-log')({
  debug: false,
  silent: false
});

if (typeof URL !== 'function') var _require2 = require('url'),
    URL = _require2.URL;
var options = {
  options: [{
    name: '-u, --update',
    desc: 'Update tmdb data'
  }, {
    name: '-d, --delete',
    desc: 'Delete tmdb data'
  }]
};
hexo.extend.generator.register('tmdbList', function (locals) {
  var _this$config, _this$config$tmdbList;

  if (!(this !== null && this !== void 0 && (_this$config = this.config) !== null && _this$config !== void 0 && (_this$config$tmdbList = _this$config.tmdbList) !== null && _this$config$tmdbList !== void 0 && _this$config$tmdbList.enable)) {
    return;
  }

  return require('./lib/tmdbList-generator').call(this, locals, 'tmdbList');
});
hexo.extend.console.register('tmdbList', 'Generate pages of tmdb list for Hexo', options, function (args) {
  if (args.d) {
    if (fs.existsSync(path.join(this.source_dir, '/_data/tmdbList.json'))) {
      fs.unlinkSync(path.join(this.source_dir, '/_data/tmdbList.json'));
      log.info('TMDB data has been deleted');
    }
  } else if (args.u) {
    var _this$config3, _this$config$tmdbList$;

    if (!(this !== null && this !== void 0 && (_this$config3 = this.config) !== null && _this$config3 !== void 0 && _this$config3.tmdbList)) {
      log.info('Please add config to _config.yml');
      return;
    }

    if (!this.config.tmdbList.enable) {
      return;
    }

    if (!this.config.tmdbList.listId) {
      log.info('Please add listId to _config.yml');
      return;
    }

    if (!this.config.tmdbList.api) {
      log.info('Please add api to _config.yml');
      return;
    }
    getTMDBData(this.config.tmdbList.listId, this.config.tmdbList.api, this.source_dir);
  } else {
    log.info('Unknown command, please use "hexo tmdbList -h" to see the available commands');
  }
});

function getTMDBData(listId, api, dir) {
  log.info("Getting list items, please wait...");
  axios.get(`https://api.themoviedb.org/3/list/${listId}?api_key=${api}&language=zh-CN`)
    .then(function (response) {
      let data = [];
      let counter = 0;
      for (let item of response.data.items) {
        axios_item.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${api}&language=zh-CN`)
          .then(function (response_item) {
            counter++;
            let item_data = {};
            item_data.id = response_item.data.id;
            item_data.title = response_item.data.title;
            item_data.date = response_item.data.release_date;
            item_data.poster = response_item.data.poster_path;
            item_data.bg = response_item.data.backdrop_path;
            item_data.origin_title = response_item.data.original_title;
            item_data.homepage = response_item.data.homepage;
            item_data.genres = response_item.data.genres;
            data.push(item_data);
            if (counter === response.data.items.length) {
              data.sort(function(a, b) {
                if (a.date < b.date) return 1;
                if (a.date > b.date) return -1;
                return 0; 
              });
              fs.writeFile(path.join(dir, "/_data/tmdbList.json"), JSON.stringify(data));
              log.info("tmdbList.json is saved.");
            }
          });
      }
    })
    .catch(err => {
      log.info("Failed to write data to tmdbList.json");
      console.log(err);
    });
}