'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var ejs = require('ejs');

var path = require('path');

var i18n = require('./util').i18n;

var fs = require('hexo-fs');

var log = require('hexo-log')({
  debug: false,
  silent: false
});

module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(locals) {
    var _config$type;

    var type,
        config,
        root,
        tmdbList,
        _JSON$parse,
        __,
        contents,
        customPath,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'tmdbList';
            config = this.config;

            if (config !== null && config !== void 0 && (_config$type = config[type]) !== null && _config$type !== void 0 && _config$type.enable) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            root = config.root;

            if (root.endsWith('/')) {
              root = root.slice(0, root.length - 1);
            }

            tmdbList = [];

            if (!fs.existsSync(path.join(this.source_dir, '/_data/' + type + '.json'))) {
              log.info('Can\'t find tmdb ' + type + ' data, please use \'hexo ' + type + ' -u\' command to get data');
            } else {
              _JSON$parse = JSON.parse(fs.readFileSync(path.join(this.source_dir, '/_data/' + type + '.json')));
              tmdbList = _JSON$parse;
              log.info(tmdbList.length + ' ' + 'items have been loaded');
            }

            __ = i18n.__(config.language);
            _context.next = 13;
            return ejs.renderFile(path.join(__dirname, 'templates/tmdbList.ejs'), {
              quote: config[type].quote,
              tmdbList: tmdbList,
              __: __,
              root: root
            }, {
              async: false
            });

          case 13:
            contents = _context.sent;
            customPath = config[type].path;
            return _context.abrupt("return", {
              path: customPath || type + '/index.html',
              data: {
                title: config[type].title,
                content: contents
              },
              layout: ['page', 'post']
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
