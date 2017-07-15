/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 84);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * The main AWS namespace
 */
var AWS = { util: __webpack_require__(1) };

/**
 * @api private
 * @!macro [new] nobrowser
 *   @note This feature is not supported in the browser environment of the SDK.
 */
var _hidden = {}; _hidden.toString(); // hack to parse macro

module.exports = AWS;

AWS.util.update(AWS, {

  /**
   * @constant
   */
  VERSION: '2.85.0',

  /**
   * @api private
   */
  Signers: {},

  /**
   * @api private
   */
  Protocol: {
    Json: __webpack_require__(26),
    Query: __webpack_require__(45),
    Rest: __webpack_require__(16),
    RestJson: __webpack_require__(47),
    RestXml: __webpack_require__(48)
  },

  /**
   * @api private
   */
  XML: {
    Builder: __webpack_require__(88),
    Parser: null // conditionally set based on environment
  },

  /**
   * @api private
   */
  JSON: {
    Builder: __webpack_require__(27),
    Parser: __webpack_require__(28)
  },

  /**
   * @api private
   */
  Model: {
    Api: __webpack_require__(71),
    Operation: __webpack_require__(72),
    Shape: __webpack_require__(8),
    Paginator: __webpack_require__(73),
    ResourceWaiter: __webpack_require__(74)
  },

  /**
   * @api private
   */
  apiLoader: __webpack_require__(195)
});

__webpack_require__(196);
__webpack_require__(198);

__webpack_require__(77);
__webpack_require__(78);
__webpack_require__(199);
__webpack_require__(203);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(214);

/**
 * @readonly
 * @return [AWS.SequentialExecutor] a collection of global event listeners that
 *   are attached to every sent request.
 * @see AWS.Request AWS.Request for a list of events to listen for
 * @example Logging the time taken to send a request
 *   AWS.events.on('send', function startSend(resp) {
 *     resp.startTime = new Date().getTime();
 *   }).on('complete', function calculateTime(resp) {
 *     var time = (new Date().getTime() - resp.startTime) / 1000;
 *     console.log('Request took ' + time + ' seconds');
 *   });
 *
 *   new AWS.S3().listBuckets(); // prints 'Request took 0.285 seconds'
 */
AWS.events = new AWS.SequentialExecutor();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* eslint guard-for-in:0 */
var AWS;

/**
 * A set of utility methods for use with the AWS SDK.
 *
 * @!attribute abort
 *   Return this value from an iterator function {each} or {arrayEach}
 *   to break out of the iteration.
 *   @example Breaking out of an iterator function
 *     AWS.util.each({a: 1, b: 2, c: 3}, function(key, value) {
 *       if (key == 'b') return AWS.util.abort;
 *     });
 *   @see each
 *   @see arrayEach
 * @api private
 */
var util = {
  environment: 'nodejs',
  engine: function engine() {
    if (util.isBrowser() && typeof navigator !== 'undefined') {
      return navigator.userAgent;
    } else {
      var engine = process.platform + '/' + process.version;
      if (process.env.AWS_EXECUTION_ENV) {
        engine += ' exec-env/' + process.env.AWS_EXECUTION_ENV;
      }
      return engine;
    }
  },

  userAgent: function userAgent() {
    var name = util.environment;
    var agent = 'aws-sdk-' + name + '/' + __webpack_require__(0).VERSION;
    if (name === 'nodejs') agent += ' ' + util.engine();
    return agent;
  },

  isBrowser: function isBrowser() { return process && process.browser; },
  isNode: function isNode() { return !util.isBrowser(); },
  uriEscape: function uriEscape(string) {
    var output = encodeURIComponent(string);
    output = output.replace(/[^A-Za-z0-9_.~\-%]+/g, escape);

    // AWS percent-encodes some extra non-standard characters in a URI
    output = output.replace(/[*]/g, function(ch) {
      return '%' + ch.charCodeAt(0).toString(16).toUpperCase();
    });

    return output;
  },

  uriEscapePath: function uriEscapePath(string) {
    var parts = [];
    util.arrayEach(string.split('/'), function (part) {
      parts.push(util.uriEscape(part));
    });
    return parts.join('/');
  },

  urlParse: function urlParse(url) {
    return util.url.parse(url);
  },

  urlFormat: function urlFormat(url) {
    return util.url.format(url);
  },

  queryStringParse: function queryStringParse(qs) {
    return util.querystring.parse(qs);
  },

  queryParamsToString: function queryParamsToString(params) {
    var items = [];
    var escape = util.uriEscape;
    var sortedKeys = Object.keys(params).sort();

    util.arrayEach(sortedKeys, function(name) {
      var value = params[name];
      var ename = escape(name);
      var result = ename + '=';
      if (Array.isArray(value)) {
        var vals = [];
        util.arrayEach(value, function(item) { vals.push(escape(item)); });
        result = ename + '=' + vals.sort().join('&' + ename + '=');
      } else if (value !== undefined && value !== null) {
        result = ename + '=' + escape(value);
      }
      items.push(result);
    });

    return items.join('&');
  },

  readFileSync: function readFileSync(path) {
    if (util.isBrowser()) return null;
    return __webpack_require__(42).readFileSync(path, 'utf-8');
  },

  base64: {
    encode: function encode64(string) {
      if (typeof string === 'number') {
        throw util.error(new Error('Cannot base64 encode number ' + string));
      }
      if (string === null || typeof string === 'undefined') {
        return string;
      }
      var buf = (typeof util.Buffer.from === 'function' && util.Buffer.from !== Uint8Array.from) ? util.Buffer.from(string) : new util.Buffer(string);
      return buf.toString('base64');
    },

    decode: function decode64(string) {
      if (typeof string === 'number') {
        throw util.error(new Error('Cannot base64 decode number ' + string));
      }
      if (string === null || typeof string === 'undefined') {
        return string;
      }
      return (typeof util.Buffer.from === 'function' && util.Buffer.from !== Uint8Array.from) ? util.Buffer.from(string, 'base64') : new util.Buffer(string, 'base64');
    }

  },

  buffer: {
    toStream: function toStream(buffer) {
      if (!util.Buffer.isBuffer(buffer)) buffer = new util.Buffer(buffer);

      var readable = new (util.stream.Readable)();
      var pos = 0;
      readable._read = function(size) {
        if (pos >= buffer.length) return readable.push(null);

        var end = pos + size;
        if (end > buffer.length) end = buffer.length;
        readable.push(buffer.slice(pos, end));
        pos = end;
      };

      return readable;
    },

    /**
     * Concatenates a list of Buffer objects.
     */
    concat: function(buffers) {
      var length = 0,
          offset = 0,
          buffer = null, i;

      for (i = 0; i < buffers.length; i++) {
        length += buffers[i].length;
      }

      buffer = new util.Buffer(length);

      for (i = 0; i < buffers.length; i++) {
        buffers[i].copy(buffer, offset);
        offset += buffers[i].length;
      }

      return buffer;
    }
  },

  string: {
    byteLength: function byteLength(string) {
      if (string === null || string === undefined) return 0;
      if (typeof string === 'string') string = new util.Buffer(string);

      if (typeof string.byteLength === 'number') {
        return string.byteLength;
      } else if (typeof string.length === 'number') {
        return string.length;
      } else if (typeof string.size === 'number') {
        return string.size;
      } else if (typeof string.path === 'string') {
        return __webpack_require__(42).lstatSync(string.path).size;
      } else {
        throw util.error(new Error('Cannot determine length of ' + string),
          { object: string });
      }
    },

    upperFirst: function upperFirst(string) {
      return string[0].toUpperCase() + string.substr(1);
    },

    lowerFirst: function lowerFirst(string) {
      return string[0].toLowerCase() + string.substr(1);
    }
  },

  ini: {
    parse: function string(ini) {
      var currentSection, map = {};
      util.arrayEach(ini.split(/\r?\n/), function(line) {
        line = line.split(/(^|\s)[;#]/)[0]; // remove comments
        var section = line.match(/^\s*\[([^\[\]]+)\]\s*$/);
        if (section) {
          currentSection = section[1];
        } else if (currentSection) {
          var item = line.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);
          if (item) {
            map[currentSection] = map[currentSection] || {};
            map[currentSection][item[1]] = item[2];
          }
        }
      });

      return map;
    }
  },

  fn: {
    noop: function() {},

    /**
     * Turn a synchronous function into as "async" function by making it call
     * a callback. The underlying function is called with all but the last argument,
     * which is treated as the callback. The callback is passed passed a first argument
     * of null on success to mimick standard node callbacks.
     */
    makeAsync: function makeAsync(fn, expectedArgs) {
      if (expectedArgs && expectedArgs <= fn.length) {
        return fn;
      }

      return function() {
        var args = Array.prototype.slice.call(arguments, 0);
        var callback = args.pop();
        var result = fn.apply(null, args);
        callback(result);
      };
    }
  },

  /**
   * Date and time utility functions.
   */
  date: {

    /**
     * @return [Date] the current JavaScript date object. Since all
     *   AWS services rely on this date object, you can override
     *   this function to provide a special time value to AWS service
     *   requests.
     */
    getDate: function getDate() {
      if (!AWS) AWS = __webpack_require__(0);
      if (AWS.config.systemClockOffset) { // use offset when non-zero
        return new Date(new Date().getTime() + AWS.config.systemClockOffset);
      } else {
        return new Date();
      }
    },

    /**
     * @return [String] the date in ISO-8601 format
     */
    iso8601: function iso8601(date) {
      if (date === undefined) { date = util.date.getDate(); }
      return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
    },

    /**
     * @return [String] the date in RFC 822 format
     */
    rfc822: function rfc822(date) {
      if (date === undefined) { date = util.date.getDate(); }
      return date.toUTCString();
    },

    /**
     * @return [Integer] the UNIX timestamp value for the current time
     */
    unixTimestamp: function unixTimestamp(date) {
      if (date === undefined) { date = util.date.getDate(); }
      return date.getTime() / 1000;
    },

    /**
     * @param [String,number,Date] date
     * @return [Date]
     */
    from: function format(date) {
      if (typeof date === 'number') {
        return new Date(date * 1000); // unix timestamp
      } else {
        return new Date(date);
      }
    },

    /**
     * Given a Date or date-like value, this function formats the
     * date into a string of the requested value.
     * @param [String,number,Date] date
     * @param [String] formatter Valid formats are:
     #   * 'iso8601'
     #   * 'rfc822'
     #   * 'unixTimestamp'
     * @return [String]
     */
    format: function format(date, formatter) {
      if (!formatter) formatter = 'iso8601';
      return util.date[formatter](util.date.from(date));
    },

    parseTimestamp: function parseTimestamp(value) {
      if (typeof value === 'number') { // unix timestamp (number)
        return new Date(value * 1000);
      } else if (value.match(/^\d+$/)) { // unix timestamp
        return new Date(value * 1000);
      } else if (value.match(/^\d{4}/)) { // iso8601
        return new Date(value);
      } else if (value.match(/^\w{3},/)) { // rfc822
        return new Date(value);
      } else {
        throw util.error(
          new Error('unhandled timestamp format: ' + value),
          {code: 'TimestampParserError'});
      }
    }

  },

  crypto: {
    crc32Table: [
     0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419,
     0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4,
     0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07,
     0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE,
     0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856,
     0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9,
     0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4,
     0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B,
     0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3,
     0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A,
     0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599,
     0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924,
     0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190,
     0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F,
     0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E,
     0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01,
     0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED,
     0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950,
     0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3,
     0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2,
     0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A,
     0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5,
     0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010,
     0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,
     0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17,
     0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6,
     0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615,
     0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8,
     0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344,
     0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB,
     0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A,
     0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5,
     0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1,
     0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C,
     0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF,
     0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236,
     0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE,
     0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31,
     0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C,
     0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713,
     0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B,
     0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242,
     0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1,
     0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C,
     0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278,
     0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7,
     0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66,
     0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,
     0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605,
     0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8,
     0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B,
     0x2D02EF8D],

    crc32: function crc32(data) {
      var tbl = util.crypto.crc32Table;
      var crc = 0 ^ -1;

      if (typeof data === 'string') {
        data = new util.Buffer(data);
      }

      for (var i = 0; i < data.length; i++) {
        var code = data.readUInt8(i);
        crc = (crc >>> 8) ^ tbl[(crc ^ code) & 0xFF];
      }
      return (crc ^ -1) >>> 0;
    },

    hmac: function hmac(key, string, digest, fn) {
      if (!digest) digest = 'binary';
      if (digest === 'buffer') { digest = undefined; }
      if (!fn) fn = 'sha256';
      if (typeof string === 'string') string = new util.Buffer(string);
      return util.crypto.lib.createHmac(fn, key).update(string).digest(digest);
    },

    md5: function md5(data, digest, callback) {
      return util.crypto.hash('md5', data, digest, callback);
    },

    sha256: function sha256(data, digest, callback) {
      return util.crypto.hash('sha256', data, digest, callback);
    },

    hash: function(algorithm, data, digest, callback) {
      var hash = util.crypto.createHash(algorithm);
      if (!digest) { digest = 'binary'; }
      if (digest === 'buffer') { digest = undefined; }
      if (typeof data === 'string') data = new util.Buffer(data);
      var sliceFn = util.arraySliceFn(data);
      var isBuffer = util.Buffer.isBuffer(data);
      //Identifying objects with an ArrayBuffer as buffers
      if (util.isBrowser() && typeof ArrayBuffer !== 'undefined' && data && data.buffer instanceof ArrayBuffer) isBuffer = true;

      if (callback && typeof data === 'object' &&
          typeof data.on === 'function' && !isBuffer) {
        data.on('data', function(chunk) { hash.update(chunk); });
        data.on('error', function(err) { callback(err); });
        data.on('end', function() { callback(null, hash.digest(digest)); });
      } else if (callback && sliceFn && !isBuffer &&
                 typeof FileReader !== 'undefined') {
        // this might be a File/Blob
        var index = 0, size = 1024 * 512;
        var reader = new FileReader();
        reader.onerror = function() {
          callback(new Error('Failed to read data.'));
        };
        reader.onload = function() {
          var buf = new util.Buffer(new Uint8Array(reader.result));
          hash.update(buf);
          index += buf.length;
          reader._continueReading();
        };
        reader._continueReading = function() {
          if (index >= data.size) {
            callback(null, hash.digest(digest));
            return;
          }

          var back = index + size;
          if (back > data.size) back = data.size;
          reader.readAsArrayBuffer(sliceFn.call(data, index, back));
        };

        reader._continueReading();
      } else {
        if (util.isBrowser() && typeof data === 'object' && !isBuffer) {
          data = new util.Buffer(new Uint8Array(data));
        }
        var out = hash.update(data).digest(digest);
        if (callback) callback(null, out);
        return out;
      }
    },

    toHex: function toHex(data) {
      var out = [];
      for (var i = 0; i < data.length; i++) {
        out.push(('0' + data.charCodeAt(i).toString(16)).substr(-2, 2));
      }
      return out.join('');
    },

    createHash: function createHash(algorithm) {
      return util.crypto.lib.createHash(algorithm);
    }

  },

  /** @!ignore */

  /* Abort constant */
  abort: {},

  each: function each(object, iterFunction) {
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        var ret = iterFunction.call(this, key, object[key]);
        if (ret === util.abort) break;
      }
    }
  },

  arrayEach: function arrayEach(array, iterFunction) {
    for (var idx in array) {
      if (Object.prototype.hasOwnProperty.call(array, idx)) {
        var ret = iterFunction.call(this, array[idx], parseInt(idx, 10));
        if (ret === util.abort) break;
      }
    }
  },

  update: function update(obj1, obj2) {
    util.each(obj2, function iterator(key, item) {
      obj1[key] = item;
    });
    return obj1;
  },

  merge: function merge(obj1, obj2) {
    return util.update(util.copy(obj1), obj2);
  },

  copy: function copy(object) {
    if (object === null || object === undefined) return object;
    var dupe = {};
    // jshint forin:false
    for (var key in object) {
      dupe[key] = object[key];
    }
    return dupe;
  },

  isEmpty: function isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  },

  arraySliceFn: function arraySliceFn(obj) {
    var fn = obj.slice || obj.webkitSlice || obj.mozSlice;
    return typeof fn === 'function' ? fn : null;
  },

  isType: function isType(obj, type) {
    // handle cross-"frame" objects
    if (typeof type === 'function') type = util.typeName(type);
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  },

  typeName: function typeName(type) {
    if (Object.prototype.hasOwnProperty.call(type, 'name')) return type.name;
    var str = type.toString();
    var match = str.match(/^\s*function (.+)\(/);
    return match ? match[1] : str;
  },

  error: function error(err, options) {
    var originalError = null;
    if (typeof err.message === 'string' && err.message !== '') {
      if (typeof options === 'string' || (options && options.message)) {
        originalError = util.copy(err);
        originalError.message = err.message;
      }
    }
    err.message = err.message || null;

    if (typeof options === 'string') {
      err.message = options;
    } else if (typeof options === 'object' && options !== null) {
      util.update(err, options);
      if (options.message)
        err.message = options.message;
      if (options.code || options.name)
        err.code = options.code || options.name;
      if (options.stack)
        err.stack = options.stack;
    }

    if (typeof Object.defineProperty === 'function') {
      Object.defineProperty(err, 'name', {writable: true, enumerable: false});
      Object.defineProperty(err, 'message', {enumerable: true});
    }

    err.name = options && options.name || err.name || err.code || 'Error';
    err.time = new Date();

    if (originalError) err.originalError = originalError;

    return err;
  },

  /**
   * @api private
   */
  inherit: function inherit(klass, features) {
    var newObject = null;
    if (features === undefined) {
      features = klass;
      klass = Object;
      newObject = {};
    } else {
      var ctor = function ConstructorWrapper() {};
      ctor.prototype = klass.prototype;
      newObject = new ctor();
    }

    // constructor not supplied, create pass-through ctor
    if (features.constructor === Object) {
      features.constructor = function() {
        if (klass !== Object) {
          return klass.apply(this, arguments);
        }
      };
    }

    features.constructor.prototype = newObject;
    util.update(features.constructor.prototype, features);
    features.constructor.__super__ = klass;
    return features.constructor;
  },

  /**
   * @api private
   */
  mixin: function mixin() {
    var klass = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      // jshint forin:false
      for (var prop in arguments[i].prototype) {
        var fn = arguments[i].prototype[prop];
        if (prop !== 'constructor') {
          klass.prototype[prop] = fn;
        }
      }
    }
    return klass;
  },

  /**
   * @api private
   */
  hideProperties: function hideProperties(obj, props) {
    if (typeof Object.defineProperty !== 'function') return;

    util.arrayEach(props, function (key) {
      Object.defineProperty(obj, key, {
        enumerable: false, writable: true, configurable: true });
    });
  },

  /**
   * @api private
   */
  property: function property(obj, name, value, enumerable, isValue) {
    var opts = {
      configurable: true,
      enumerable: enumerable !== undefined ? enumerable : true
    };
    if (typeof value === 'function' && !isValue) {
      opts.get = value;
    }
    else {
      opts.value = value; opts.writable = true;
    }

    Object.defineProperty(obj, name, opts);
  },

  /**
   * @api private
   */
  memoizedProperty: function memoizedProperty(obj, name, get, enumerable) {
    var cachedValue = null;

    // build enumerable attribute for each value with lazy accessor.
    util.property(obj, name, function() {
      if (cachedValue === null) {
        cachedValue = get();
      }
      return cachedValue;
    }, enumerable);
  },

  /**
   * TODO Remove in major version revision
   * This backfill populates response data without the
   * top-level payload name.
   *
   * @api private
   */
  hoistPayloadMember: function hoistPayloadMember(resp) {
    var req = resp.request;
    var operation = req.operation;
    var output = req.service.api.operations[operation].output;
    if (output.payload) {
      var payloadMember = output.members[output.payload];
      var responsePayload = resp.data[output.payload];
      if (payloadMember.type === 'structure') {
        util.each(responsePayload, function(key, value) {
          util.property(resp.data, key, value, false);
        });
      }
    }
  },

  /**
   * Compute SHA-256 checksums of streams
   *
   * @api private
   */
  computeSha256: function computeSha256(body, done) {
    if (util.isNode()) {
      var Stream = util.stream.Stream;
      var fs = __webpack_require__(42);
      if (body instanceof Stream) {
        if (typeof body.path === 'string') { // assume file object
          var settings = {};
          if (typeof body.start === 'number') {
            settings.start = body.start;
          }
          if (typeof body.end === 'number') {
            settings.end = body.end;
          }
          body = fs.createReadStream(body.path, settings);
        } else { // TODO support other stream types
          return done(new Error('Non-file stream objects are ' +
                                'not supported with SigV4'));
        }
      }
    }

    util.crypto.sha256(body, 'hex', function(err, sha) {
      if (err) done(err);
      else done(null, sha);
    });
  },

  /**
   * @api private
   */
  isClockSkewed: function isClockSkewed(serverTime) {
    if (serverTime) {
      util.property(AWS.config, 'isClockSkewed',
        Math.abs(new Date().getTime() - serverTime) >= 300000, false);
      return AWS.config.isClockSkewed;
    }
  },

  applyClockOffset: function applyClockOffset(serverTime) {
    if (serverTime)
      AWS.config.systemClockOffset = serverTime - new Date().getTime();
  },

  /**
   * @api private
   */
  extractRequestId: function extractRequestId(resp) {
    var requestId = resp.httpResponse.headers['x-amz-request-id'] ||
                     resp.httpResponse.headers['x-amzn-requestid'];

    if (!requestId && resp.data && resp.data.ResponseMetadata) {
      requestId = resp.data.ResponseMetadata.RequestId;
    }

    if (requestId) {
      resp.requestId = requestId;
    }

    if (resp.error) {
      resp.error.requestId = requestId;
    }
  },

  /**
   * @api private
   */
  addPromises: function addPromises(constructors, PromiseDependency) {
    if (PromiseDependency === undefined && AWS && AWS.config) {
      PromiseDependency = AWS.config.getPromisesDependency();
    }
    if (PromiseDependency === undefined && typeof Promise !== 'undefined') {
      PromiseDependency = Promise;
    }
    if (typeof PromiseDependency !== 'function') var deletePromises = true;
    if (!Array.isArray(constructors)) constructors = [constructors];

    for (var ind = 0; ind < constructors.length; ind++) {
      var constructor = constructors[ind];
      if (deletePromises) {
        if (constructor.deletePromisesFromClass) {
          constructor.deletePromisesFromClass();
        }
      } else if (constructor.addPromisesToClass) {
        constructor.addPromisesToClass(PromiseDependency);
      }
    }
  },

  /**
   * @api private
   */
  promisifyMethod: function promisifyMethod(methodName, PromiseDependency) {
    return function promise() {
      var self = this;
      return new PromiseDependency(function(resolve, reject) {
        self[methodName](function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    };
  },

  /**
   * @api private
   */
  isDualstackAvailable: function isDualstackAvailable(service) {
    if (!service) return false;
    var metadata = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../apis/metadata.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    if (typeof service !== 'string') service = service.serviceIdentifier;
    if (typeof service !== 'string' || !metadata.hasOwnProperty(service)) return false;
    return !!metadata[service].dualstackAvailable;
  },

  /**
   * @api private
   */
  calculateRetryDelay: function calculateRetryDelay(retryCount, retryDelayOptions) {
    if (!retryDelayOptions) retryDelayOptions = {};
    var customBackoff = retryDelayOptions.customBackoff || null;
    if (typeof customBackoff === 'function') {
      return customBackoff(retryCount);
    }
    var base = typeof retryDelayOptions.base === 'number' ? retryDelayOptions.base : 100;
    var delay = Math.random() * (Math.pow(2, retryCount) * base);
    return delay;
  },

  /**
   * @api private
   */
  handleRequestWithRetries: function handleRequestWithRetries(httpRequest, options, cb) {
    if (!options) options = {};
    var http = AWS.HttpClient.getInstance();
    var httpOptions = options.httpOptions || {};
    var retryCount = 0;

    var errCallback = function(err) {
      var maxRetries = options.maxRetries || 0;
      if (err && err.code === 'TimeoutError') err.retryable = true;
      if (err && err.retryable && retryCount < maxRetries) {
        retryCount++;
        var delay = util.calculateRetryDelay(retryCount, options.retryDelayOptions);
        setTimeout(sendRequest, delay + (err.retryAfter || 0));
      } else {
        cb(err);
      }
    };

    var sendRequest = function() {
      var data = '';
      http.handleRequest(httpRequest, httpOptions, function(httpResponse) {
        httpResponse.on('data', function(chunk) { data += chunk.toString(); });
        httpResponse.on('end', function() {
          var statusCode = httpResponse.statusCode;
          if (statusCode < 300) {
            cb(null, data);
          } else {
            var retryAfter = parseInt(httpResponse.headers['retry-after'], 10) * 1000 || 0;
            var err = util.error(new Error(),
              { retryable: statusCode >= 500 || statusCode === 429 }
            );
            if (retryAfter && err.retryable) err.retryAfter = retryAfter;
            errCallback(err);
          }
        });
      }, errCallback);
    };

    process.nextTick(sendRequest);
  },

  /**
   * @api private
   */
  uuid: {
    v4: function uuidV4() {
      return __webpack_require__(215).v4();
    }
  },

  /**
   * @api private
   */
  convertPayloadToString: function convertPayloadToString(resp) {
    var req = resp.request;
    var operation = req.operation;
    var rules = req.service.api.operations[operation].output || {};
    if (rules.payload && resp.data[rules.payload]) {
      resp.data[rules.payload] = resp.data[rules.payload].toString();
    }
  },

  /**
   * @api private
   */
  defaultProfile: 'default',

  /**
   * @api private
   */
  configOptInEnv: 'AWS_SDK_LOAD_CONFIG',

  /**
   * @api private
   */
  sharedCredentialsFileEnv: 'AWS_SHARED_CREDENTIALS_FILE',

  /**
   * @api private
   */
  sharedConfigFileEnv: 'AWS_CONFIG_FILE'
};

module.exports = util;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssign = __webpack_require__(116),
    baseCreate = __webpack_require__(117);

/**
 * Creates an object that inherits from the `prototype` object. If a
 * `properties` object is given, its own enumerable string keyed properties
 * are assigned to the created object.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Object
 * @param {Object} prototype The object to inherit from.
 * @param {Object} [properties] The properties to assign to the object.
 * @returns {Object} Returns the new object.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * function Circle() {
 *   Shape.call(this);
 * }
 *
 * Circle.prototype = _.create(Shape.prototype, {
 *   'constructor': Circle
 * });
 *
 * var circle = new Circle;
 * circle instanceof Circle;
 * // => true
 *
 * circle instanceof Shape;
 * // => true
 */
function create(prototype, properties) {
  var result = baseCreate(prototype);
  return properties == null ? result : baseAssign(result, properties);
}

module.exports = create;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(52);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(91),
    getValue = __webpack_require__(96);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLElement, XMLNode, XMLRaw, XMLText, isEmpty, isFunction, isObject,
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(3);

  isFunction = __webpack_require__(17);

  isEmpty = __webpack_require__(118);

  XMLElement = null;

  XMLCData = null;

  XMLComment = null;

  XMLDeclaration = null;

  XMLDocType = null;

  XMLRaw = null;

  XMLText = null;

  module.exports = XMLNode = (function() {
    function XMLNode(parent) {
      this.parent = parent;
      this.options = this.parent.options;
      this.stringify = this.parent.stringify;
      if (XMLElement === null) {
        XMLElement = __webpack_require__(59);
        XMLCData = __webpack_require__(68);
        XMLComment = __webpack_require__(69);
        XMLDeclaration = __webpack_require__(57);
        XMLDocType = __webpack_require__(70);
        XMLRaw = __webpack_require__(193);
        XMLText = __webpack_require__(194);
      }
    }

    XMLNode.prototype.element = function(name, attributes, text) {
      var childNode, item, j, k, key, lastChild, len, len1, ref, val;
      lastChild = null;
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref = [attributes, text], text = ref[0], attributes = ref[1];
      }
      if (name != null) {
        name = name.valueOf();
      }
      if (Array.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          item = name[j];
          lastChild = this.element(item);
        }
      } else if (isFunction(name)) {
        lastChild = this.element(name.apply());
      } else if (isObject(name)) {
        for (key in name) {
          if (!hasProp.call(name, key)) continue;
          val = name[key];
          if (isFunction(val)) {
            val = val.apply();
          }
          if ((isObject(val)) && (isEmpty(val))) {
            val = null;
          }
          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
          } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && key.indexOf(this.stringify.convertPIKey) === 0) {
            lastChild = this.instruction(key.substr(this.stringify.convertPIKey.length), val);
          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
            for (k = 0, len1 = val.length; k < len1; k++) {
              item = val[k];
              childNode = {};
              childNode[key] = item;
              lastChild = this.element(childNode);
            }
          } else if (isObject(val)) {
            lastChild = this.element(key);
            lastChild.element(val);
          } else {
            lastChild = this.element(key, val);
          }
        }
      } else {
        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
          lastChild = this.text(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
          lastChild = this.cdata(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
          lastChild = this.comment(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
          lastChild = this.raw(text);
        } else {
          lastChild = this.node(name, attributes, text);
        }
      }
      if (lastChild == null) {
        throw new Error("Could not create any elements with: " + name);
      }
      return lastChild;
    };

    XMLNode.prototype.insertBefore = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.insertAfter = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.remove = function() {
      var i, ref;
      if (this.isRoot) {
        throw new Error("Cannot remove the root element");
      }
      i = this.parent.children.indexOf(this);
      [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref = [])), ref;
      return this.parent;
    };

    XMLNode.prototype.node = function(name, attributes, text) {
      var child, ref;
      if (name != null) {
        name = name.valueOf();
      }
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref = [attributes, text], text = ref[0], attributes = ref[1];
      }
      child = new XMLElement(this, name, attributes);
      if (text != null) {
        child.text(text);
      }
      this.children.push(child);
      return child;
    };

    XMLNode.prototype.text = function(value) {
      var child;
      child = new XMLText(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.cdata = function(value) {
      var child;
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.comment = function(value) {
      var child;
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.raw = function(value) {
      var child;
      child = new XMLRaw(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.declaration = function(version, encoding, standalone) {
      var doc, xmldec;
      doc = this.document();
      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
      doc.xmldec = xmldec;
      return doc.root();
    };

    XMLNode.prototype.doctype = function(pubID, sysID) {
      var doc, doctype;
      doc = this.document();
      doctype = new XMLDocType(doc, pubID, sysID);
      doc.doctype = doctype;
      return doctype;
    };

    XMLNode.prototype.up = function() {
      if (this.isRoot) {
        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
      }
      return this.parent;
    };

    XMLNode.prototype.root = function() {
      var child;
      if (this.isRoot) {
        return this;
      }
      child = this.parent;
      while (!child.isRoot) {
        child = child.parent;
      }
      return child;
    };

    XMLNode.prototype.document = function() {
      return this.root().documentObject;
    };

    XMLNode.prototype.end = function(options) {
      return this.document().toString(options);
    };

    XMLNode.prototype.prev = function() {
      var i;
      if (this.isRoot) {
        throw new Error("Root node has no siblings");
      }
      i = this.parent.children.indexOf(this);
      if (i < 1) {
        throw new Error("Already at the first node");
      }
      return this.parent.children[i - 1];
    };

    XMLNode.prototype.next = function() {
      var i;
      if (this.isRoot) {
        throw new Error("Root node has no siblings");
      }
      i = this.parent.children.indexOf(this);
      if (i === -1 || i === this.parent.children.length - 1) {
        throw new Error("Already at the last node");
      }
      return this.parent.children[i + 1];
    };

    XMLNode.prototype.importXMLBuilder = function(xmlbuilder) {
      var clonedRoot;
      clonedRoot = xmlbuilder.root().clone();
      clonedRoot.parent = this;
      clonedRoot.isRoot = false;
      this.children.push(clonedRoot);
      return this;
    };

    XMLNode.prototype.ele = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.doc = function() {
      return this.document();
    };

    XMLNode.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLNode.prototype.dtd = function(pubID, sysID) {
      return this.doctype(pubID, sysID);
    };

    XMLNode.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.t = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLNode.prototype.u = function() {
      return this.up();
    };

    return XMLNode;

  })();

}).call(this);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Collection = __webpack_require__(46);

var util = __webpack_require__(1);

function property(obj, name, value) {
  if (value !== null && value !== undefined) {
    util.property.apply(this, arguments);
  }
}

function memoizedProperty(obj, name) {
  if (!obj.constructor.prototype[name]) {
    util.memoizedProperty.apply(this, arguments);
  }
}

function Shape(shape, options, memberName) {
  options = options || {};

  property(this, 'shape', shape.shape);
  property(this, 'api', options.api, false);
  property(this, 'type', shape.type);
  property(this, 'enum', shape.enum);
  property(this, 'min', shape.min);
  property(this, 'max', shape.max);
  property(this, 'pattern', shape.pattern);
  property(this, 'location', shape.location || this.location || 'body');
  property(this, 'name', this.name || shape.xmlName || shape.queryName ||
    shape.locationName || memberName);
  property(this, 'isStreaming', shape.streaming || this.isStreaming || false);
  property(this, 'isComposite', shape.isComposite || false);
  property(this, 'isShape', true, false);
  property(this, 'isQueryName', Boolean(shape.queryName), false);
  property(this, 'isLocationName', Boolean(shape.locationName), false);
  property(this, 'isIdempotent', shape.idempotencyToken === true);
  property(this, 'isJsonValue', shape.jsonvalue === true);

  if (options.documentation) {
    property(this, 'documentation', shape.documentation);
    property(this, 'documentationUrl', shape.documentationUrl);
  }

  if (shape.xmlAttribute) {
    property(this, 'isXmlAttribute', shape.xmlAttribute || false);
  }

  // type conversion and parsing
  property(this, 'defaultValue', null);
  this.toWireFormat = function(value) {
    if (value === null || value === undefined) return '';
    return value;
  };
  this.toType = function(value) { return value; };
}

/**
 * @api private
 */
Shape.normalizedTypes = {
  character: 'string',
  double: 'float',
  long: 'integer',
  short: 'integer',
  biginteger: 'integer',
  bigdecimal: 'float',
  blob: 'binary'
};

/**
 * @api private
 */
Shape.types = {
  'structure': StructureShape,
  'list': ListShape,
  'map': MapShape,
  'boolean': BooleanShape,
  'timestamp': TimestampShape,
  'float': FloatShape,
  'integer': IntegerShape,
  'string': StringShape,
  'base64': Base64Shape,
  'binary': BinaryShape
};

Shape.resolve = function resolve(shape, options) {
  if (shape.shape) {
    var refShape = options.api.shapes[shape.shape];
    if (!refShape) {
      throw new Error('Cannot find shape reference: ' + shape.shape);
    }

    return refShape;
  } else {
    return null;
  }
};

Shape.create = function create(shape, options, memberName) {
  if (shape.isShape) return shape;

  var refShape = Shape.resolve(shape, options);
  if (refShape) {
    var filteredKeys = Object.keys(shape);
    if (!options.documentation) {
      filteredKeys = filteredKeys.filter(function(name) {
        return !name.match(/documentation/);
      });
    }

    // create an inline shape with extra members
    var InlineShape = function() {
      refShape.constructor.call(this, shape, options, memberName);
    };
    InlineShape.prototype = refShape;
    return new InlineShape();
  } else {
    // set type if not set
    if (!shape.type) {
      if (shape.members) shape.type = 'structure';
      else if (shape.member) shape.type = 'list';
      else if (shape.key) shape.type = 'map';
      else shape.type = 'string';
    }

    // normalize types
    var origType = shape.type;
    if (Shape.normalizedTypes[shape.type]) {
      shape.type = Shape.normalizedTypes[shape.type];
    }

    if (Shape.types[shape.type]) {
      return new Shape.types[shape.type](shape, options, memberName);
    } else {
      throw new Error('Unrecognized shape type: ' + origType);
    }
  }
};

function CompositeShape(shape) {
  Shape.apply(this, arguments);
  property(this, 'isComposite', true);

  if (shape.flattened) {
    property(this, 'flattened', shape.flattened || false);
  }
}

function StructureShape(shape, options) {
  var requiredMap = null, firstInit = !this.isShape;

  CompositeShape.apply(this, arguments);

  if (firstInit) {
    property(this, 'defaultValue', function() { return {}; });
    property(this, 'members', {});
    property(this, 'memberNames', []);
    property(this, 'required', []);
    property(this, 'isRequired', function() { return false; });
  }

  if (shape.members) {
    property(this, 'members', new Collection(shape.members, options, function(name, member) {
      return Shape.create(member, options, name);
    }));
    memoizedProperty(this, 'memberNames', function() {
      return shape.xmlOrder || Object.keys(shape.members);
    });
  }

  if (shape.required) {
    property(this, 'required', shape.required);
    property(this, 'isRequired', function(name) {
      if (!requiredMap) {
        requiredMap = {};
        for (var i = 0; i < shape.required.length; i++) {
          requiredMap[shape.required[i]] = true;
        }
      }

      return requiredMap[name];
    }, false, true);
  }

  property(this, 'resultWrapper', shape.resultWrapper || null);

  if (shape.payload) {
    property(this, 'payload', shape.payload);
  }

  if (typeof shape.xmlNamespace === 'string') {
    property(this, 'xmlNamespaceUri', shape.xmlNamespace);
  } else if (typeof shape.xmlNamespace === 'object') {
    property(this, 'xmlNamespacePrefix', shape.xmlNamespace.prefix);
    property(this, 'xmlNamespaceUri', shape.xmlNamespace.uri);
  }
}

function ListShape(shape, options) {
  var self = this, firstInit = !this.isShape;
  CompositeShape.apply(this, arguments);

  if (firstInit) {
    property(this, 'defaultValue', function() { return []; });
  }

  if (shape.member) {
    memoizedProperty(this, 'member', function() {
      return Shape.create(shape.member, options);
    });
  }

  if (this.flattened) {
    var oldName = this.name;
    memoizedProperty(this, 'name', function() {
      return self.member.name || oldName;
    });
  }
}

function MapShape(shape, options) {
  var firstInit = !this.isShape;
  CompositeShape.apply(this, arguments);

  if (firstInit) {
    property(this, 'defaultValue', function() { return {}; });
    property(this, 'key', Shape.create({type: 'string'}, options));
    property(this, 'value', Shape.create({type: 'string'}, options));
  }

  if (shape.key) {
    memoizedProperty(this, 'key', function() {
      return Shape.create(shape.key, options);
    });
  }
  if (shape.value) {
    memoizedProperty(this, 'value', function() {
      return Shape.create(shape.value, options);
    });
  }
}

function TimestampShape(shape) {
  var self = this;
  Shape.apply(this, arguments);

  if (this.location === 'header') {
    property(this, 'timestampFormat', 'rfc822');
  } else if (shape.timestampFormat) {
    property(this, 'timestampFormat', shape.timestampFormat);
  } else if (!this.timestampFormat && this.api) {
    if (this.api.timestampFormat) {
      property(this, 'timestampFormat', this.api.timestampFormat);
    } else {
      switch (this.api.protocol) {
        case 'json':
        case 'rest-json':
          property(this, 'timestampFormat', 'unixTimestamp');
          break;
        case 'rest-xml':
        case 'query':
        case 'ec2':
          property(this, 'timestampFormat', 'iso8601');
          break;
      }
    }
  }

  this.toType = function(value) {
    if (value === null || value === undefined) return null;
    if (typeof value.toUTCString === 'function') return value;
    return typeof value === 'string' || typeof value === 'number' ?
           util.date.parseTimestamp(value) : null;
  };

  this.toWireFormat = function(value) {
    return util.date.format(value, self.timestampFormat);
  };
}

function StringShape() {
  Shape.apply(this, arguments);

  var nullLessProtocols = ['rest-xml', 'query', 'ec2'];
  this.toType = function(value) {
    value = this.api && nullLessProtocols.indexOf(this.api.protocol) > -1 ?
      value || '' : value;
    if (this.isJsonValue) {
      return JSON.parse(value);
    }

    return value && typeof value.toString === 'function' ?
      value.toString() : value;
  };

  this.toWireFormat = function(value) {
    return this.isJsonValue ? JSON.stringify(value) : value;
  };
}

function FloatShape() {
  Shape.apply(this, arguments);

  this.toType = function(value) {
    if (value === null || value === undefined) return null;
    return parseFloat(value);
  };
  this.toWireFormat = this.toType;
}

function IntegerShape() {
  Shape.apply(this, arguments);

  this.toType = function(value) {
    if (value === null || value === undefined) return null;
    return parseInt(value, 10);
  };
  this.toWireFormat = this.toType;
}

function BinaryShape() {
  Shape.apply(this, arguments);
  this.toType = util.base64.decode;
  this.toWireFormat = util.base64.encode;
}

function Base64Shape() {
  BinaryShape.apply(this, arguments);
}

function BooleanShape() {
  Shape.apply(this, arguments);

  this.toType = function(value) {
    if (typeof value === 'boolean') return value;
    if (value === null || value === undefined) return null;
    return value === 'true';
  };
}

/**
 * @api private
 */
Shape.shapes = {
  StructureShape: StructureShape,
  ListShape: ListShape,
  MapShape: MapShape,
  StringShape: StringShape,
  BooleanShape: BooleanShape,
  Base64Shape: Base64Shape
};

module.exports = Shape;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(18),
    getRawTag = __webpack_require__(92),
    objectToString = __webpack_require__(93);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(17),
    isLength = __webpack_require__(30);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(105),
    baseKeys = __webpack_require__(56),
    isArrayLike = __webpack_require__(11);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var util = __webpack_require__(1);

// browser specific modules
util.crypto.lib = __webpack_require__(218);
util.Buffer = __webpack_require__(43).Buffer;
util.url = __webpack_require__(226);
util.querystring = __webpack_require__(82);
util.environment = 'js';

var AWS = __webpack_require__(0);
module.exports = AWS;

__webpack_require__(75);
__webpack_require__(76);
__webpack_require__(231);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(237);

// Load the DOMParser XML parser
AWS.XML.Parser = __webpack_require__(238);

// Load the XHR HttpClient
__webpack_require__(239);

if (typeof process === 'undefined') {
  process = {
    browser: true
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);

function populateMethod(req) {
  req.httpRequest.method = req.service.api.operations[req.operation].httpMethod;
}

function generateURI(endpointPath, operationPath, input, params) {
  var uri = [endpointPath, operationPath].join('/');
  uri = uri.replace(/\/+/g, '/');

  var queryString = {}, queryStringSet = false;
  util.each(input.members, function (name, member) {
    var paramValue = params[name];
    if (paramValue === null || paramValue === undefined) return;
    if (member.location === 'uri') {
      var regex = new RegExp('\\{' + member.name + '(\\+)?\\}');
      uri = uri.replace(regex, function(_, plus) {
        var fn = plus ? util.uriEscapePath : util.uriEscape;
        return fn(String(paramValue));
      });
    } else if (member.location === 'querystring') {
      queryStringSet = true;

      if (member.type === 'list') {
        queryString[member.name] = paramValue.map(function(val) {
          return util.uriEscape(String(val));
        });
      } else if (member.type === 'map') {
        util.each(paramValue, function(key, value) {
          if (Array.isArray(value)) {
            queryString[key] = value.map(function(val) {
              return util.uriEscape(String(val));
            });
          } else {
            queryString[key] = util.uriEscape(String(value));
          }
        });
      } else {
        queryString[member.name] = util.uriEscape(String(paramValue));
      }
    }
  });

  if (queryStringSet) {
    uri += (uri.indexOf('?') >= 0 ? '&' : '?');
    var parts = [];
    util.arrayEach(Object.keys(queryString).sort(), function(key) {
      if (!Array.isArray(queryString[key])) {
        queryString[key] = [queryString[key]];
      }
      for (var i = 0; i < queryString[key].length; i++) {
        parts.push(util.uriEscape(String(key)) + '=' + queryString[key][i]);
      }
    });
    uri += parts.join('&');
  }

  return uri;
}

function populateURI(req) {
  var operation = req.service.api.operations[req.operation];
  var input = operation.input;

  var uri = generateURI(req.httpRequest.endpoint.path, operation.httpPath, input, req.params);
  req.httpRequest.path = uri;
}

function populateHeaders(req) {
  var operation = req.service.api.operations[req.operation];
  util.each(operation.input.members, function (name, member) {
    var value = req.params[name];
    if (value === null || value === undefined) return;

    if (member.location === 'headers' && member.type === 'map') {
      util.each(value, function(key, memberValue) {
        req.httpRequest.headers[member.name + key] = memberValue;
      });
    } else if (member.location === 'header') {
      value = member.toWireFormat(value).toString();
      if (member.isJsonValue) {
        value = util.base64.encode(value);
      }
      req.httpRequest.headers[member.name] = value;
    }
  });
}

function buildRequest(req) {
  populateMethod(req);
  populateURI(req);
  populateHeaders(req);
}

function extractError() {
}

function extractData(resp) {
  var req = resp.request;
  var data = {};
  var r = resp.httpResponse;
  var operation = req.service.api.operations[req.operation];
  var output = operation.output;

  // normalize headers names to lower-cased keys for matching
  var headers = {};
  util.each(r.headers, function (k, v) {
    headers[k.toLowerCase()] = v;
  });

  util.each(output.members, function(name, member) {
    var header = (member.name || name).toLowerCase();
    if (member.location === 'headers' && member.type === 'map') {
      data[name] = {};
      var location = member.isLocationName ? member.name : '';
      var pattern = new RegExp('^' + location + '(.+)', 'i');
      util.each(r.headers, function (k, v) {
        var result = k.match(pattern);
        if (result !== null) {
          data[name][result[1]] = v;
        }
      });
    } else if (member.location === 'header') {
      if (headers[header] !== undefined) {
        var value = member.isJsonValue ?
          util.base64.decode(headers[header]) :
          headers[header];
        data[name] = member.toType(value);
      }
    } else if (member.location === 'statusCode') {
      data[name] = parseInt(r.statusCode, 10);
    }
  });

  resp.data = data;
}

module.exports = {
  buildRequest: buildRequest,
  extractError: extractError,
  extractData: extractData,
  generateURI: generateURI
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isObject = __webpack_require__(3);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(5);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(134),
    listCacheDelete = __webpack_require__(135),
    listCacheGet = __webpack_require__(136),
    listCacheHas = __webpack_require__(137),
    listCacheSet = __webpack_require__(138);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(19);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(152);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(40);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
var AWS = __webpack_require__(0);
var Service = AWS.Service;
var apiLoader = AWS.apiLoader;

apiLoader.services['sts'] = {};
AWS.STS = Service.defineService('sts', ['2011-06-15']);
__webpack_require__(232);
Object.defineProperty(apiLoader.services['sts'], '2011-06-15', {
  get: function get() {
    var model = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../apis/sts-2011-06-15.min.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    model.paginators = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../apis/sts-2011-06-15.paginators.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).pagination;
    return model;
  },
  enumerable: true,
  configurable: true
});

module.exports = AWS.STS;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);
var JsonBuilder = __webpack_require__(27);
var JsonParser = __webpack_require__(28);

function buildRequest(req) {
  var httpRequest = req.httpRequest;
  var api = req.service.api;
  var target = api.targetPrefix + '.' + api.operations[req.operation].name;
  var version = api.jsonVersion || '1.0';
  var input = api.operations[req.operation].input;
  var builder = new JsonBuilder();

  if (version === 1) version = '1.0';
  httpRequest.body = builder.build(req.params || {}, input);
  httpRequest.headers['Content-Type'] = 'application/x-amz-json-' + version;
  httpRequest.headers['X-Amz-Target'] = target;
}

function extractError(resp) {
  var error = {};
  var httpResponse = resp.httpResponse;

  error.code = httpResponse.headers['x-amzn-errortype'] || 'UnknownError';
  if (typeof error.code === 'string') {
    error.code = error.code.split(':')[0];
  }

  if (httpResponse.body.length > 0) {
    try {
      var e = JSON.parse(httpResponse.body.toString());
      if (e.__type || e.code) {
        error.code = (e.__type || e.code).split('#').pop();
      }
      if (error.code === 'RequestEntityTooLarge') {
        error.message = 'Request body must be less than 1 MB';
      } else {
        error.message = (e.message || e.Message || null);
      }
    } catch (e) {
      error.statusCode = httpResponse.statusCode;
      error.message = httpResponse.statusMessage;
    }
  } else {
    error.statusCode = httpResponse.statusCode;
    error.message = httpResponse.statusCode.toString();
  }

  resp.error = util.error(new Error(), error);
}

function extractData(resp) {
  var body = resp.httpResponse.body.toString() || '{}';
  if (resp.request.service.config.convertResponseTypes === false) {
    resp.data = JSON.parse(body);
  } else {
    var operation = resp.request.service.api.operations[resp.request.operation];
    var shape = operation.output || {};
    var parser = new JsonParser();
    resp.data = parser.parse(body, shape);
  }
}

module.exports = {
  buildRequest: buildRequest,
  extractError: extractError,
  extractData: extractData
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);

function JsonBuilder() { }

JsonBuilder.prototype.build = function(value, shape) {
  return JSON.stringify(translate(value, shape));
};

function translate(value, shape) {
  if (!shape || value === undefined || value === null) return undefined;

  switch (shape.type) {
    case 'structure': return translateStructure(value, shape);
    case 'map': return translateMap(value, shape);
    case 'list': return translateList(value, shape);
    default: return translateScalar(value, shape);
  }
}

function translateStructure(structure, shape) {
  var struct = {};
  util.each(structure, function(name, value) {
    var memberShape = shape.members[name];
    if (memberShape) {
      if (memberShape.location !== 'body') return;
      var locationName = memberShape.isLocationName ? memberShape.name : name;
      var result = translate(value, memberShape);
      if (result !== undefined) struct[locationName] = result;
    }
  });
  return struct;
}

function translateList(list, shape) {
  var out = [];
  util.arrayEach(list, function(value) {
    var result = translate(value, shape.member);
    if (result !== undefined) out.push(result);
  });
  return out;
}

function translateMap(map, shape) {
  var out = {};
  util.each(map, function(key, value) {
    var result = translate(value, shape.value);
    if (result !== undefined) out[key] = result;
  });
  return out;
}

function translateScalar(value, shape) {
  return shape.toWireFormat(value);
}

module.exports = JsonBuilder;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);

function JsonParser() { }

JsonParser.prototype.parse = function(value, shape) {
  return translate(JSON.parse(value), shape);
};

function translate(value, shape) {
  if (!shape || value === undefined) return undefined;

  switch (shape.type) {
    case 'structure': return translateStructure(value, shape);
    case 'map': return translateMap(value, shape);
    case 'list': return translateList(value, shape);
    default: return translateScalar(value, shape);
  }
}

function translateStructure(structure, shape) {
  if (structure == null) return undefined;

  var struct = {};
  var shapeMembers = shape.members;
  util.each(shapeMembers, function(name, memberShape) {
    var locationName = memberShape.isLocationName ? memberShape.name : name;
    if (Object.prototype.hasOwnProperty.call(structure, locationName)) {
      var value = structure[locationName];
      var result = translate(value, memberShape);
      if (result !== undefined) struct[name] = result;
    }
  });
  return struct;
}

function translateList(list, shape) {
  if (list == null) return undefined;

  var out = [];
  util.arrayEach(list, function(value) {
    var result = translate(value, shape.member);
    if (result === undefined) out.push(null);
    else out.push(result);
  });
  return out;
}

function translateMap(map, shape) {
  if (map == null) return undefined;

  var out = {};
  util.each(map, function(key, value) {
    var result = translate(value, shape.value);
    if (result === undefined) out[key] = null;
    else out[key] = result;
  });
  return out;
}

function translateScalar(value, shape) {
  return shape.toType(value);
}

module.exports = JsonParser;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(107),
    isObjectLike = __webpack_require__(13);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(5),
    stubFalse = __webpack_require__(108);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module)))

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(109),
    baseUnary = __webpack_require__(110),
    nodeUtil = __webpack_require__(111);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(144),
    mapCacheDelete = __webpack_require__(151),
    mapCacheGet = __webpack_require__(153),
    mapCacheHas = __webpack_require__(154),
    mapCacheSet = __webpack_require__(155);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(4),
    isSymbol = __webpack_require__(40);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isObjectLike = __webpack_require__(13);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

(function(exports) {
  "use strict";

  function isArray(obj) {
    if (obj !== null) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    } else {
      return false;
    }
  }

  function isObject(obj) {
    if (obj !== null) {
      return Object.prototype.toString.call(obj) === "[object Object]";
    } else {
      return false;
    }
  }

  function strictDeepEqual(first, second) {
    // Check the scalar case first.
    if (first === second) {
      return true;
    }

    // Check if they are the same type.
    var firstType = Object.prototype.toString.call(first);
    if (firstType !== Object.prototype.toString.call(second)) {
      return false;
    }
    // We know that first and second have the same type so we can just check the
    // first type from now on.
    if (isArray(first) === true) {
      // Short circuit if they're not the same length;
      if (first.length !== second.length) {
        return false;
      }
      for (var i = 0; i < first.length; i++) {
        if (strictDeepEqual(first[i], second[i]) === false) {
          return false;
        }
      }
      return true;
    }
    if (isObject(first) === true) {
      // An object is equal if it has the same key/value pairs.
      var keysSeen = {};
      for (var key in first) {
        if (hasOwnProperty.call(first, key)) {
          if (strictDeepEqual(first[key], second[key]) === false) {
            return false;
          }
          keysSeen[key] = true;
        }
      }
      // Now check that there aren't any keys in second that weren't
      // in first.
      for (var key2 in second) {
        if (hasOwnProperty.call(second, key2)) {
          if (keysSeen[key2] !== true) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  function isFalse(obj) {
    // From the spec:
    // A false value corresponds to the following values:
    // Empty list
    // Empty object
    // Empty string
    // False boolean
    // null value

    // First check the scalar values.
    if (obj === "" || obj === false || obj === null) {
        return true;
    } else if (isArray(obj) && obj.length === 0) {
        // Check for an empty array.
        return true;
    } else if (isObject(obj)) {
        // Check for an empty object.
        for (var key in obj) {
            // If there are any keys, then
            // the object is not empty so the object
            // is not false.
            if (obj.hasOwnProperty(key)) {
              return false;
            }
        }
        return true;
    } else {
        return false;
    }
  }

  function objValues(obj) {
    var keys = Object.keys(obj);
    var values = [];
    for (var i = 0; i < keys.length; i++) {
      values.push(obj[keys[i]]);
    }
    return values;
  }

  function merge(a, b) {
      var merged = {};
      for (var key in a) {
          merged[key] = a[key];
      }
      for (var key2 in b) {
          merged[key2] = b[key2];
      }
      return merged;
  }

  var trimLeft;
  if (typeof String.prototype.trimLeft === "function") {
    trimLeft = function(str) {
      return str.trimLeft();
    };
  } else {
    trimLeft = function(str) {
      return str.match(/^\s*(.*)/)[1];
    };
  }

  // Type constants used to define functions.
  var TYPE_NUMBER = 0;
  var TYPE_ANY = 1;
  var TYPE_STRING = 2;
  var TYPE_ARRAY = 3;
  var TYPE_OBJECT = 4;
  var TYPE_BOOLEAN = 5;
  var TYPE_EXPREF = 6;
  var TYPE_NULL = 7;
  var TYPE_ARRAY_NUMBER = 8;
  var TYPE_ARRAY_STRING = 9;

  var TOK_EOF = "EOF";
  var TOK_UNQUOTEDIDENTIFIER = "UnquotedIdentifier";
  var TOK_QUOTEDIDENTIFIER = "QuotedIdentifier";
  var TOK_RBRACKET = "Rbracket";
  var TOK_RPAREN = "Rparen";
  var TOK_COMMA = "Comma";
  var TOK_COLON = "Colon";
  var TOK_RBRACE = "Rbrace";
  var TOK_NUMBER = "Number";
  var TOK_CURRENT = "Current";
  var TOK_EXPREF = "Expref";
  var TOK_PIPE = "Pipe";
  var TOK_OR = "Or";
  var TOK_AND = "And";
  var TOK_EQ = "EQ";
  var TOK_GT = "GT";
  var TOK_LT = "LT";
  var TOK_GTE = "GTE";
  var TOK_LTE = "LTE";
  var TOK_NE = "NE";
  var TOK_FLATTEN = "Flatten";
  var TOK_STAR = "Star";
  var TOK_FILTER = "Filter";
  var TOK_DOT = "Dot";
  var TOK_NOT = "Not";
  var TOK_LBRACE = "Lbrace";
  var TOK_LBRACKET = "Lbracket";
  var TOK_LPAREN= "Lparen";
  var TOK_LITERAL= "Literal";

  // The "&", "[", "<", ">" tokens
  // are not in basicToken because
  // there are two token variants
  // ("&&", "[?", "<=", ">=").  This is specially handled
  // below.

  var basicTokens = {
    ".": TOK_DOT,
    "*": TOK_STAR,
    ",": TOK_COMMA,
    ":": TOK_COLON,
    "{": TOK_LBRACE,
    "}": TOK_RBRACE,
    "]": TOK_RBRACKET,
    "(": TOK_LPAREN,
    ")": TOK_RPAREN,
    "@": TOK_CURRENT
  };

  var operatorStartToken = {
      "<": true,
      ">": true,
      "=": true,
      "!": true
  };

  var skipChars = {
      " ": true,
      "\t": true,
      "\n": true
  };


  function isAlpha(ch) {
      return (ch >= "a" && ch <= "z") ||
             (ch >= "A" && ch <= "Z") ||
             ch === "_";
  }

  function isNum(ch) {
      return (ch >= "0" && ch <= "9") ||
             ch === "-";
  }
  function isAlphaNum(ch) {
      return (ch >= "a" && ch <= "z") ||
             (ch >= "A" && ch <= "Z") ||
             (ch >= "0" && ch <= "9") ||
             ch === "_";
  }

  function Lexer() {
  }
  Lexer.prototype = {
      tokenize: function(stream) {
          var tokens = [];
          this._current = 0;
          var start;
          var identifier;
          var token;
          while (this._current < stream.length) {
              if (isAlpha(stream[this._current])) {
                  start = this._current;
                  identifier = this._consumeUnquotedIdentifier(stream);
                  tokens.push({type: TOK_UNQUOTEDIDENTIFIER,
                               value: identifier,
                               start: start});
              } else if (basicTokens[stream[this._current]] !== undefined) {
                  tokens.push({type: basicTokens[stream[this._current]],
                              value: stream[this._current],
                              start: this._current});
                  this._current++;
              } else if (isNum(stream[this._current])) {
                  token = this._consumeNumber(stream);
                  tokens.push(token);
              } else if (stream[this._current] === "[") {
                  // No need to increment this._current.  This happens
                  // in _consumeLBracket
                  token = this._consumeLBracket(stream);
                  tokens.push(token);
              } else if (stream[this._current] === "\"") {
                  start = this._current;
                  identifier = this._consumeQuotedIdentifier(stream);
                  tokens.push({type: TOK_QUOTEDIDENTIFIER,
                               value: identifier,
                               start: start});
              } else if (stream[this._current] === "'") {
                  start = this._current;
                  identifier = this._consumeRawStringLiteral(stream);
                  tokens.push({type: TOK_LITERAL,
                               value: identifier,
                               start: start});
              } else if (stream[this._current] === "`") {
                  start = this._current;
                  var literal = this._consumeLiteral(stream);
                  tokens.push({type: TOK_LITERAL,
                               value: literal,
                               start: start});
              } else if (operatorStartToken[stream[this._current]] !== undefined) {
                  tokens.push(this._consumeOperator(stream));
              } else if (skipChars[stream[this._current]] !== undefined) {
                  // Ignore whitespace.
                  this._current++;
              } else if (stream[this._current] === "&") {
                  start = this._current;
                  this._current++;
                  if (stream[this._current] === "&") {
                      this._current++;
                      tokens.push({type: TOK_AND, value: "&&", start: start});
                  } else {
                      tokens.push({type: TOK_EXPREF, value: "&", start: start});
                  }
              } else if (stream[this._current] === "|") {
                  start = this._current;
                  this._current++;
                  if (stream[this._current] === "|") {
                      this._current++;
                      tokens.push({type: TOK_OR, value: "||", start: start});
                  } else {
                      tokens.push({type: TOK_PIPE, value: "|", start: start});
                  }
              } else {
                  var error = new Error("Unknown character:" + stream[this._current]);
                  error.name = "LexerError";
                  throw error;
              }
          }
          return tokens;
      },

      _consumeUnquotedIdentifier: function(stream) {
          var start = this._current;
          this._current++;
          while (this._current < stream.length && isAlphaNum(stream[this._current])) {
              this._current++;
          }
          return stream.slice(start, this._current);
      },

      _consumeQuotedIdentifier: function(stream) {
          var start = this._current;
          this._current++;
          var maxLength = stream.length;
          while (stream[this._current] !== "\"" && this._current < maxLength) {
              // You can escape a double quote and you can escape an escape.
              var current = this._current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "\"")) {
                  current += 2;
              } else {
                  current++;
              }
              this._current = current;
          }
          this._current++;
          return JSON.parse(stream.slice(start, this._current));
      },

      _consumeRawStringLiteral: function(stream) {
          var start = this._current;
          this._current++;
          var maxLength = stream.length;
          while (stream[this._current] !== "'" && this._current < maxLength) {
              // You can escape a single quote and you can escape an escape.
              var current = this._current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "'")) {
                  current += 2;
              } else {
                  current++;
              }
              this._current = current;
          }
          this._current++;
          var literal = stream.slice(start + 1, this._current - 1);
          return literal.replace("\\'", "'");
      },

      _consumeNumber: function(stream) {
          var start = this._current;
          this._current++;
          var maxLength = stream.length;
          while (isNum(stream[this._current]) && this._current < maxLength) {
              this._current++;
          }
          var value = parseInt(stream.slice(start, this._current));
          return {type: TOK_NUMBER, value: value, start: start};
      },

      _consumeLBracket: function(stream) {
          var start = this._current;
          this._current++;
          if (stream[this._current] === "?") {
              this._current++;
              return {type: TOK_FILTER, value: "[?", start: start};
          } else if (stream[this._current] === "]") {
              this._current++;
              return {type: TOK_FLATTEN, value: "[]", start: start};
          } else {
              return {type: TOK_LBRACKET, value: "[", start: start};
          }
      },

      _consumeOperator: function(stream) {
          var start = this._current;
          var startingChar = stream[start];
          this._current++;
          if (startingChar === "!") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_NE, value: "!=", start: start};
              } else {
                return {type: TOK_NOT, value: "!", start: start};
              }
          } else if (startingChar === "<") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_LTE, value: "<=", start: start};
              } else {
                  return {type: TOK_LT, value: "<", start: start};
              }
          } else if (startingChar === ">") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_GTE, value: ">=", start: start};
              } else {
                  return {type: TOK_GT, value: ">", start: start};
              }
          } else if (startingChar === "=") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_EQ, value: "==", start: start};
              }
          }
      },

      _consumeLiteral: function(stream) {
          this._current++;
          var start = this._current;
          var maxLength = stream.length;
          var literal;
          while(stream[this._current] !== "`" && this._current < maxLength) {
              // You can escape a literal char or you can escape the escape.
              var current = this._current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "`")) {
                  current += 2;
              } else {
                  current++;
              }
              this._current = current;
          }
          var literalString = trimLeft(stream.slice(start, this._current));
          literalString = literalString.replace("\\`", "`");
          if (this._looksLikeJSON(literalString)) {
              literal = JSON.parse(literalString);
          } else {
              // Try to JSON parse it as "<literal>"
              literal = JSON.parse("\"" + literalString + "\"");
          }
          // +1 gets us to the ending "`", +1 to move on to the next char.
          this._current++;
          return literal;
      },

      _looksLikeJSON: function(literalString) {
          var startingChars = "[{\"";
          var jsonLiterals = ["true", "false", "null"];
          var numberLooking = "-0123456789";

          if (literalString === "") {
              return false;
          } else if (startingChars.indexOf(literalString[0]) >= 0) {
              return true;
          } else if (jsonLiterals.indexOf(literalString) >= 0) {
              return true;
          } else if (numberLooking.indexOf(literalString[0]) >= 0) {
              try {
                  JSON.parse(literalString);
                  return true;
              } catch (ex) {
                  return false;
              }
          } else {
              return false;
          }
      }
  };

      var bindingPower = {};
      bindingPower[TOK_EOF] = 0;
      bindingPower[TOK_UNQUOTEDIDENTIFIER] = 0;
      bindingPower[TOK_QUOTEDIDENTIFIER] = 0;
      bindingPower[TOK_RBRACKET] = 0;
      bindingPower[TOK_RPAREN] = 0;
      bindingPower[TOK_COMMA] = 0;
      bindingPower[TOK_RBRACE] = 0;
      bindingPower[TOK_NUMBER] = 0;
      bindingPower[TOK_CURRENT] = 0;
      bindingPower[TOK_EXPREF] = 0;
      bindingPower[TOK_PIPE] = 1;
      bindingPower[TOK_OR] = 2;
      bindingPower[TOK_AND] = 3;
      bindingPower[TOK_EQ] = 5;
      bindingPower[TOK_GT] = 5;
      bindingPower[TOK_LT] = 5;
      bindingPower[TOK_GTE] = 5;
      bindingPower[TOK_LTE] = 5;
      bindingPower[TOK_NE] = 5;
      bindingPower[TOK_FLATTEN] = 9;
      bindingPower[TOK_STAR] = 20;
      bindingPower[TOK_FILTER] = 21;
      bindingPower[TOK_DOT] = 40;
      bindingPower[TOK_NOT] = 45;
      bindingPower[TOK_LBRACE] = 50;
      bindingPower[TOK_LBRACKET] = 55;
      bindingPower[TOK_LPAREN] = 60;

  function Parser() {
  }

  Parser.prototype = {
      parse: function(expression) {
          this._loadTokens(expression);
          this.index = 0;
          var ast = this.expression(0);
          if (this._lookahead(0) !== TOK_EOF) {
              var t = this._lookaheadToken(0);
              var error = new Error(
                  "Unexpected token type: " + t.type + ", value: " + t.value);
              error.name = "ParserError";
              throw error;
          }
          return ast;
      },

      _loadTokens: function(expression) {
          var lexer = new Lexer();
          var tokens = lexer.tokenize(expression);
          tokens.push({type: TOK_EOF, value: "", start: expression.length});
          this.tokens = tokens;
      },

      expression: function(rbp) {
          var leftToken = this._lookaheadToken(0);
          this._advance();
          var left = this.nud(leftToken);
          var currentToken = this._lookahead(0);
          while (rbp < bindingPower[currentToken]) {
              this._advance();
              left = this.led(currentToken, left);
              currentToken = this._lookahead(0);
          }
          return left;
      },

      _lookahead: function(number) {
          return this.tokens[this.index + number].type;
      },

      _lookaheadToken: function(number) {
          return this.tokens[this.index + number];
      },

      _advance: function() {
          this.index++;
      },

      nud: function(token) {
        var left;
        var right;
        var expression;
        switch (token.type) {
          case TOK_LITERAL:
            return {type: "Literal", value: token.value};
          case TOK_UNQUOTEDIDENTIFIER:
            return {type: "Field", name: token.value};
          case TOK_QUOTEDIDENTIFIER:
            var node = {type: "Field", name: token.value};
            if (this._lookahead(0) === TOK_LPAREN) {
                throw new Error("Quoted identifier not allowed for function names.");
            } else {
                return node;
            }
            break;
          case TOK_NOT:
            right = this.expression(bindingPower.Not);
            return {type: "NotExpression", children: [right]};
          case TOK_STAR:
            left = {type: "Identity"};
            right = null;
            if (this._lookahead(0) === TOK_RBRACKET) {
                // This can happen in a multiselect,
                // [a, b, *]
                right = {type: "Identity"};
            } else {
                right = this._parseProjectionRHS(bindingPower.Star);
            }
            return {type: "ValueProjection", children: [left, right]};
          case TOK_FILTER:
            return this.led(token.type, {type: "Identity"});
          case TOK_LBRACE:
            return this._parseMultiselectHash();
          case TOK_FLATTEN:
            left = {type: TOK_FLATTEN, children: [{type: "Identity"}]};
            right = this._parseProjectionRHS(bindingPower.Flatten);
            return {type: "Projection", children: [left, right]};
          case TOK_LBRACKET:
            if (this._lookahead(0) === TOK_NUMBER || this._lookahead(0) === TOK_COLON) {
                right = this._parseIndexExpression();
                return this._projectIfSlice({type: "Identity"}, right);
            } else if (this._lookahead(0) === TOK_STAR &&
                       this._lookahead(1) === TOK_RBRACKET) {
                this._advance();
                this._advance();
                right = this._parseProjectionRHS(bindingPower.Star);
                return {type: "Projection",
                        children: [{type: "Identity"}, right]};
            } else {
                return this._parseMultiselectList();
            }
            break;
          case TOK_CURRENT:
            return {type: TOK_CURRENT};
          case TOK_EXPREF:
            expression = this.expression(bindingPower.Expref);
            return {type: "ExpressionReference", children: [expression]};
          case TOK_LPAREN:
            var args = [];
            while (this._lookahead(0) !== TOK_RPAREN) {
              if (this._lookahead(0) === TOK_CURRENT) {
                expression = {type: TOK_CURRENT};
                this._advance();
              } else {
                expression = this.expression(0);
              }
              args.push(expression);
            }
            this._match(TOK_RPAREN);
            return args[0];
          default:
            this._errorToken(token);
        }
      },

      led: function(tokenName, left) {
        var right;
        switch(tokenName) {
          case TOK_DOT:
            var rbp = bindingPower.Dot;
            if (this._lookahead(0) !== TOK_STAR) {
                right = this._parseDotRHS(rbp);
                return {type: "Subexpression", children: [left, right]};
            } else {
                // Creating a projection.
                this._advance();
                right = this._parseProjectionRHS(rbp);
                return {type: "ValueProjection", children: [left, right]};
            }
            break;
          case TOK_PIPE:
            right = this.expression(bindingPower.Pipe);
            return {type: TOK_PIPE, children: [left, right]};
          case TOK_OR:
            right = this.expression(bindingPower.Or);
            return {type: "OrExpression", children: [left, right]};
          case TOK_AND:
            right = this.expression(bindingPower.And);
            return {type: "AndExpression", children: [left, right]};
          case TOK_LPAREN:
            var name = left.name;
            var args = [];
            var expression, node;
            while (this._lookahead(0) !== TOK_RPAREN) {
              if (this._lookahead(0) === TOK_CURRENT) {
                expression = {type: TOK_CURRENT};
                this._advance();
              } else {
                expression = this.expression(0);
              }
              if (this._lookahead(0) === TOK_COMMA) {
                this._match(TOK_COMMA);
              }
              args.push(expression);
            }
            this._match(TOK_RPAREN);
            node = {type: "Function", name: name, children: args};
            return node;
          case TOK_FILTER:
            var condition = this.expression(0);
            this._match(TOK_RBRACKET);
            if (this._lookahead(0) === TOK_FLATTEN) {
              right = {type: "Identity"};
            } else {
              right = this._parseProjectionRHS(bindingPower.Filter);
            }
            return {type: "FilterProjection", children: [left, right, condition]};
          case TOK_FLATTEN:
            var leftNode = {type: TOK_FLATTEN, children: [left]};
            var rightNode = this._parseProjectionRHS(bindingPower.Flatten);
            return {type: "Projection", children: [leftNode, rightNode]};
          case TOK_EQ:
          case TOK_NE:
          case TOK_GT:
          case TOK_GTE:
          case TOK_LT:
          case TOK_LTE:
            return this._parseComparator(left, tokenName);
          case TOK_LBRACKET:
            var token = this._lookaheadToken(0);
            if (token.type === TOK_NUMBER || token.type === TOK_COLON) {
                right = this._parseIndexExpression();
                return this._projectIfSlice(left, right);
            } else {
                this._match(TOK_STAR);
                this._match(TOK_RBRACKET);
                right = this._parseProjectionRHS(bindingPower.Star);
                return {type: "Projection", children: [left, right]};
            }
            break;
          default:
            this._errorToken(this._lookaheadToken(0));
        }
      },

      _match: function(tokenType) {
          if (this._lookahead(0) === tokenType) {
              this._advance();
          } else {
              var t = this._lookaheadToken(0);
              var error = new Error("Expected " + tokenType + ", got: " + t.type);
              error.name = "ParserError";
              throw error;
          }
      },

      _errorToken: function(token) {
          var error = new Error("Invalid token (" +
                                token.type + "): \"" +
                                token.value + "\"");
          error.name = "ParserError";
          throw error;
      },


      _parseIndexExpression: function() {
          if (this._lookahead(0) === TOK_COLON || this._lookahead(1) === TOK_COLON) {
              return this._parseSliceExpression();
          } else {
              var node = {
                  type: "Index",
                  value: this._lookaheadToken(0).value};
              this._advance();
              this._match(TOK_RBRACKET);
              return node;
          }
      },

      _projectIfSlice: function(left, right) {
          var indexExpr = {type: "IndexExpression", children: [left, right]};
          if (right.type === "Slice") {
              return {
                  type: "Projection",
                  children: [indexExpr, this._parseProjectionRHS(bindingPower.Star)]
              };
          } else {
              return indexExpr;
          }
      },

      _parseSliceExpression: function() {
          // [start:end:step] where each part is optional, as well as the last
          // colon.
          var parts = [null, null, null];
          var index = 0;
          var currentToken = this._lookahead(0);
          while (currentToken !== TOK_RBRACKET && index < 3) {
              if (currentToken === TOK_COLON) {
                  index++;
                  this._advance();
              } else if (currentToken === TOK_NUMBER) {
                  parts[index] = this._lookaheadToken(0).value;
                  this._advance();
              } else {
                  var t = this._lookahead(0);
                  var error = new Error("Syntax error, unexpected token: " +
                                        t.value + "(" + t.type + ")");
                  error.name = "Parsererror";
                  throw error;
              }
              currentToken = this._lookahead(0);
          }
          this._match(TOK_RBRACKET);
          return {
              type: "Slice",
              children: parts
          };
      },

      _parseComparator: function(left, comparator) {
        var right = this.expression(bindingPower[comparator]);
        return {type: "Comparator", name: comparator, children: [left, right]};
      },

      _parseDotRHS: function(rbp) {
          var lookahead = this._lookahead(0);
          var exprTokens = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER, TOK_STAR];
          if (exprTokens.indexOf(lookahead) >= 0) {
              return this.expression(rbp);
          } else if (lookahead === TOK_LBRACKET) {
              this._match(TOK_LBRACKET);
              return this._parseMultiselectList();
          } else if (lookahead === TOK_LBRACE) {
              this._match(TOK_LBRACE);
              return this._parseMultiselectHash();
          }
      },

      _parseProjectionRHS: function(rbp) {
          var right;
          if (bindingPower[this._lookahead(0)] < 10) {
              right = {type: "Identity"};
          } else if (this._lookahead(0) === TOK_LBRACKET) {
              right = this.expression(rbp);
          } else if (this._lookahead(0) === TOK_FILTER) {
              right = this.expression(rbp);
          } else if (this._lookahead(0) === TOK_DOT) {
              this._match(TOK_DOT);
              right = this._parseDotRHS(rbp);
          } else {
              var t = this._lookaheadToken(0);
              var error = new Error("Sytanx error, unexpected token: " +
                                    t.value + "(" + t.type + ")");
              error.name = "ParserError";
              throw error;
          }
          return right;
      },

      _parseMultiselectList: function() {
          var expressions = [];
          while (this._lookahead(0) !== TOK_RBRACKET) {
              var expression = this.expression(0);
              expressions.push(expression);
              if (this._lookahead(0) === TOK_COMMA) {
                  this._match(TOK_COMMA);
                  if (this._lookahead(0) === TOK_RBRACKET) {
                    throw new Error("Unexpected token Rbracket");
                  }
              }
          }
          this._match(TOK_RBRACKET);
          return {type: "MultiSelectList", children: expressions};
      },

      _parseMultiselectHash: function() {
        var pairs = [];
        var identifierTypes = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER];
        var keyToken, keyName, value, node;
        for (;;) {
          keyToken = this._lookaheadToken(0);
          if (identifierTypes.indexOf(keyToken.type) < 0) {
            throw new Error("Expecting an identifier token, got: " +
                            keyToken.type);
          }
          keyName = keyToken.value;
          this._advance();
          this._match(TOK_COLON);
          value = this.expression(0);
          node = {type: "KeyValuePair", name: keyName, value: value};
          pairs.push(node);
          if (this._lookahead(0) === TOK_COMMA) {
            this._match(TOK_COMMA);
          } else if (this._lookahead(0) === TOK_RBRACE) {
            this._match(TOK_RBRACE);
            break;
          }
        }
        return {type: "MultiSelectHash", children: pairs};
      }
  };


  function TreeInterpreter(runtime) {
    this.runtime = runtime;
  }

  TreeInterpreter.prototype = {
      search: function(node, value) {
          return this.visit(node, value);
      },

      visit: function(node, value) {
          var matched, current, result, first, second, field, left, right, collected, i;
          switch (node.type) {
            case "Field":
              if (value === null ) {
                  return null;
              } else if (isObject(value)) {
                  field = value[node.name];
                  if (field === undefined) {
                      return null;
                  } else {
                      return field;
                  }
              } else {
                return null;
              }
              break;
            case "Subexpression":
              result = this.visit(node.children[0], value);
              for (i = 1; i < node.children.length; i++) {
                  result = this.visit(node.children[1], result);
                  if (result === null) {
                      return null;
                  }
              }
              return result;
            case "IndexExpression":
              left = this.visit(node.children[0], value);
              right = this.visit(node.children[1], left);
              return right;
            case "Index":
              if (!isArray(value)) {
                return null;
              }
              var index = node.value;
              if (index < 0) {
                index = value.length + index;
              }
              result = value[index];
              if (result === undefined) {
                result = null;
              }
              return result;
            case "Slice":
              if (!isArray(value)) {
                return null;
              }
              var sliceParams = node.children.slice(0);
              var computed = this.computeSliceParams(value.length, sliceParams);
              var start = computed[0];
              var stop = computed[1];
              var step = computed[2];
              result = [];
              if (step > 0) {
                  for (i = start; i < stop; i += step) {
                      result.push(value[i]);
                  }
              } else {
                  for (i = start; i > stop; i += step) {
                      result.push(value[i]);
                  }
              }
              return result;
            case "Projection":
              // Evaluate left child.
              var base = this.visit(node.children[0], value);
              if (!isArray(base)) {
                return null;
              }
              collected = [];
              for (i = 0; i < base.length; i++) {
                current = this.visit(node.children[1], base[i]);
                if (current !== null) {
                  collected.push(current);
                }
              }
              return collected;
            case "ValueProjection":
              // Evaluate left child.
              base = this.visit(node.children[0], value);
              if (!isObject(base)) {
                return null;
              }
              collected = [];
              var values = objValues(base);
              for (i = 0; i < values.length; i++) {
                current = this.visit(node.children[1], values[i]);
                if (current !== null) {
                  collected.push(current);
                }
              }
              return collected;
            case "FilterProjection":
              base = this.visit(node.children[0], value);
              if (!isArray(base)) {
                return null;
              }
              var filtered = [];
              var finalResults = [];
              for (i = 0; i < base.length; i++) {
                matched = this.visit(node.children[2], base[i]);
                if (!isFalse(matched)) {
                  filtered.push(base[i]);
                }
              }
              for (var j = 0; j < filtered.length; j++) {
                current = this.visit(node.children[1], filtered[j]);
                if (current !== null) {
                  finalResults.push(current);
                }
              }
              return finalResults;
            case "Comparator":
              first = this.visit(node.children[0], value);
              second = this.visit(node.children[1], value);
              switch(node.name) {
                case TOK_EQ:
                  result = strictDeepEqual(first, second);
                  break;
                case TOK_NE:
                  result = !strictDeepEqual(first, second);
                  break;
                case TOK_GT:
                  result = first > second;
                  break;
                case TOK_GTE:
                  result = first >= second;
                  break;
                case TOK_LT:
                  result = first < second;
                  break;
                case TOK_LTE:
                  result = first <= second;
                  break;
                default:
                  throw new Error("Unknown comparator: " + node.name);
              }
              return result;
            case TOK_FLATTEN:
              var original = this.visit(node.children[0], value);
              if (!isArray(original)) {
                return null;
              }
              var merged = [];
              for (i = 0; i < original.length; i++) {
                current = original[i];
                if (isArray(current)) {
                  merged.push.apply(merged, current);
                } else {
                  merged.push(current);
                }
              }
              return merged;
            case "Identity":
              return value;
            case "MultiSelectList":
              if (value === null) {
                return null;
              }
              collected = [];
              for (i = 0; i < node.children.length; i++) {
                  collected.push(this.visit(node.children[i], value));
              }
              return collected;
            case "MultiSelectHash":
              if (value === null) {
                return null;
              }
              collected = {};
              var child;
              for (i = 0; i < node.children.length; i++) {
                child = node.children[i];
                collected[child.name] = this.visit(child.value, value);
              }
              return collected;
            case "OrExpression":
              matched = this.visit(node.children[0], value);
              if (isFalse(matched)) {
                  matched = this.visit(node.children[1], value);
              }
              return matched;
            case "AndExpression":
              first = this.visit(node.children[0], value);

              if (isFalse(first) === true) {
                return first;
              }
              return this.visit(node.children[1], value);
            case "NotExpression":
              first = this.visit(node.children[0], value);
              return isFalse(first);
            case "Literal":
              return node.value;
            case TOK_PIPE:
              left = this.visit(node.children[0], value);
              return this.visit(node.children[1], left);
            case TOK_CURRENT:
              return value;
            case "Function":
              var resolvedArgs = [];
              for (i = 0; i < node.children.length; i++) {
                  resolvedArgs.push(this.visit(node.children[i], value));
              }
              return this.runtime.callFunction(node.name, resolvedArgs);
            case "ExpressionReference":
              var refNode = node.children[0];
              // Tag the node with a specific attribute so the type
              // checker verify the type.
              refNode.jmespathType = TOK_EXPREF;
              return refNode;
            default:
              throw new Error("Unknown node type: " + node.type);
          }
      },

      computeSliceParams: function(arrayLength, sliceParams) {
        var start = sliceParams[0];
        var stop = sliceParams[1];
        var step = sliceParams[2];
        var computed = [null, null, null];
        if (step === null) {
          step = 1;
        } else if (step === 0) {
          var error = new Error("Invalid slice, step cannot be 0");
          error.name = "RuntimeError";
          throw error;
        }
        var stepValueNegative = step < 0 ? true : false;

        if (start === null) {
            start = stepValueNegative ? arrayLength - 1 : 0;
        } else {
            start = this.capSliceRange(arrayLength, start, step);
        }

        if (stop === null) {
            stop = stepValueNegative ? -1 : arrayLength;
        } else {
            stop = this.capSliceRange(arrayLength, stop, step);
        }
        computed[0] = start;
        computed[1] = stop;
        computed[2] = step;
        return computed;
      },

      capSliceRange: function(arrayLength, actualValue, step) {
          if (actualValue < 0) {
              actualValue += arrayLength;
              if (actualValue < 0) {
                  actualValue = step < 0 ? -1 : 0;
              }
          } else if (actualValue >= arrayLength) {
              actualValue = step < 0 ? arrayLength - 1 : arrayLength;
          }
          return actualValue;
      }

  };

  function Runtime(interpreter) {
    this._interpreter = interpreter;
    this.functionTable = {
        // name: [function, <signature>]
        // The <signature> can be:
        //
        // {
        //   args: [[type1, type2], [type1, type2]],
        //   variadic: true|false
        // }
        //
        // Each arg in the arg list is a list of valid types
        // (if the function is overloaded and supports multiple
        // types.  If the type is "any" then no type checking
        // occurs on the argument.  Variadic is optional
        // and if not provided is assumed to be false.
        abs: {_func: this._functionAbs, _signature: [{types: [TYPE_NUMBER]}]},
        avg: {_func: this._functionAvg, _signature: [{types: [TYPE_ARRAY_NUMBER]}]},
        ceil: {_func: this._functionCeil, _signature: [{types: [TYPE_NUMBER]}]},
        contains: {
            _func: this._functionContains,
            _signature: [{types: [TYPE_STRING, TYPE_ARRAY]},
                        {types: [TYPE_ANY]}]},
        "ends_with": {
            _func: this._functionEndsWith,
            _signature: [{types: [TYPE_STRING]}, {types: [TYPE_STRING]}]},
        floor: {_func: this._functionFloor, _signature: [{types: [TYPE_NUMBER]}]},
        length: {
            _func: this._functionLength,
            _signature: [{types: [TYPE_STRING, TYPE_ARRAY, TYPE_OBJECT]}]},
        map: {
            _func: this._functionMap,
            _signature: [{types: [TYPE_EXPREF]}, {types: [TYPE_ARRAY]}]},
        max: {
            _func: this._functionMax,
            _signature: [{types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING]}]},
        "merge": {
            _func: this._functionMerge,
            _signature: [{types: [TYPE_OBJECT], variadic: true}]
        },
        "max_by": {
          _func: this._functionMaxBy,
          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
        },
        sum: {_func: this._functionSum, _signature: [{types: [TYPE_ARRAY_NUMBER]}]},
        "starts_with": {
            _func: this._functionStartsWith,
            _signature: [{types: [TYPE_STRING]}, {types: [TYPE_STRING]}]},
        min: {
            _func: this._functionMin,
            _signature: [{types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING]}]},
        "min_by": {
          _func: this._functionMinBy,
          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
        },
        type: {_func: this._functionType, _signature: [{types: [TYPE_ANY]}]},
        keys: {_func: this._functionKeys, _signature: [{types: [TYPE_OBJECT]}]},
        values: {_func: this._functionValues, _signature: [{types: [TYPE_OBJECT]}]},
        sort: {_func: this._functionSort, _signature: [{types: [TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER]}]},
        "sort_by": {
          _func: this._functionSortBy,
          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
        },
        join: {
            _func: this._functionJoin,
            _signature: [
                {types: [TYPE_STRING]},
                {types: [TYPE_ARRAY_STRING]}
            ]
        },
        reverse: {
            _func: this._functionReverse,
            _signature: [{types: [TYPE_STRING, TYPE_ARRAY]}]},
        "to_array": {_func: this._functionToArray, _signature: [{types: [TYPE_ANY]}]},
        "to_string": {_func: this._functionToString, _signature: [{types: [TYPE_ANY]}]},
        "to_number": {_func: this._functionToNumber, _signature: [{types: [TYPE_ANY]}]},
        "not_null": {
            _func: this._functionNotNull,
            _signature: [{types: [TYPE_ANY], variadic: true}]
        }
    };
  }

  Runtime.prototype = {
    callFunction: function(name, resolvedArgs) {
      var functionEntry = this.functionTable[name];
      if (functionEntry === undefined) {
          throw new Error("Unknown function: " + name + "()");
      }
      this._validateArgs(name, resolvedArgs, functionEntry._signature);
      return functionEntry._func.call(this, resolvedArgs);
    },

    _validateArgs: function(name, args, signature) {
        // Validating the args requires validating
        // the correct arity and the correct type of each arg.
        // If the last argument is declared as variadic, then we need
        // a minimum number of args to be required.  Otherwise it has to
        // be an exact amount.
        var pluralized;
        if (signature[signature.length - 1].variadic) {
            if (args.length < signature.length) {
                pluralized = signature.length === 1 ? " argument" : " arguments";
                throw new Error("ArgumentError: " + name + "() " +
                                "takes at least" + signature.length + pluralized +
                                " but received " + args.length);
            }
        } else if (args.length !== signature.length) {
            pluralized = signature.length === 1 ? " argument" : " arguments";
            throw new Error("ArgumentError: " + name + "() " +
                            "takes " + signature.length + pluralized +
                            " but received " + args.length);
        }
        var currentSpec;
        var actualType;
        var typeMatched;
        for (var i = 0; i < signature.length; i++) {
            typeMatched = false;
            currentSpec = signature[i].types;
            actualType = this._getTypeName(args[i]);
            for (var j = 0; j < currentSpec.length; j++) {
                if (this._typeMatches(actualType, currentSpec[j], args[i])) {
                    typeMatched = true;
                    break;
                }
            }
            if (!typeMatched) {
                throw new Error("TypeError: " + name + "() " +
                                "expected argument " + (i + 1) +
                                " to be type " + currentSpec +
                                " but received type " + actualType +
                                " instead.");
            }
        }
    },

    _typeMatches: function(actual, expected, argValue) {
        if (expected === TYPE_ANY) {
            return true;
        }
        if (expected === TYPE_ARRAY_STRING ||
            expected === TYPE_ARRAY_NUMBER ||
            expected === TYPE_ARRAY) {
            // The expected type can either just be array,
            // or it can require a specific subtype (array of numbers).
            //
            // The simplest case is if "array" with no subtype is specified.
            if (expected === TYPE_ARRAY) {
                return actual === TYPE_ARRAY;
            } else if (actual === TYPE_ARRAY) {
                // Otherwise we need to check subtypes.
                // I think this has potential to be improved.
                var subtype;
                if (expected === TYPE_ARRAY_NUMBER) {
                  subtype = TYPE_NUMBER;
                } else if (expected === TYPE_ARRAY_STRING) {
                  subtype = TYPE_STRING;
                }
                for (var i = 0; i < argValue.length; i++) {
                    if (!this._typeMatches(
                            this._getTypeName(argValue[i]), subtype,
                                             argValue[i])) {
                        return false;
                    }
                }
                return true;
            }
        } else {
            return actual === expected;
        }
    },
    _getTypeName: function(obj) {
        switch (Object.prototype.toString.call(obj)) {
            case "[object String]":
              return TYPE_STRING;
            case "[object Number]":
              return TYPE_NUMBER;
            case "[object Array]":
              return TYPE_ARRAY;
            case "[object Boolean]":
              return TYPE_BOOLEAN;
            case "[object Null]":
              return TYPE_NULL;
            case "[object Object]":
              // Check if it's an expref.  If it has, it's been
              // tagged with a jmespathType attr of 'Expref';
              if (obj.jmespathType === TOK_EXPREF) {
                return TYPE_EXPREF;
              } else {
                return TYPE_OBJECT;
              }
        }
    },

    _functionStartsWith: function(resolvedArgs) {
        return resolvedArgs[0].lastIndexOf(resolvedArgs[1]) === 0;
    },

    _functionEndsWith: function(resolvedArgs) {
        var searchStr = resolvedArgs[0];
        var suffix = resolvedArgs[1];
        return searchStr.indexOf(suffix, searchStr.length - suffix.length) !== -1;
    },

    _functionReverse: function(resolvedArgs) {
        var typeName = this._getTypeName(resolvedArgs[0]);
        if (typeName === TYPE_STRING) {
          var originalStr = resolvedArgs[0];
          var reversedStr = "";
          for (var i = originalStr.length - 1; i >= 0; i--) {
              reversedStr += originalStr[i];
          }
          return reversedStr;
        } else {
          var reversedArray = resolvedArgs[0].slice(0);
          reversedArray.reverse();
          return reversedArray;
        }
    },

    _functionAbs: function(resolvedArgs) {
      return Math.abs(resolvedArgs[0]);
    },

    _functionCeil: function(resolvedArgs) {
        return Math.ceil(resolvedArgs[0]);
    },

    _functionAvg: function(resolvedArgs) {
        var sum = 0;
        var inputArray = resolvedArgs[0];
        for (var i = 0; i < inputArray.length; i++) {
            sum += inputArray[i];
        }
        return sum / inputArray.length;
    },

    _functionContains: function(resolvedArgs) {
        return resolvedArgs[0].indexOf(resolvedArgs[1]) >= 0;
    },

    _functionFloor: function(resolvedArgs) {
        return Math.floor(resolvedArgs[0]);
    },

    _functionLength: function(resolvedArgs) {
       if (!isObject(resolvedArgs[0])) {
         return resolvedArgs[0].length;
       } else {
         // As far as I can tell, there's no way to get the length
         // of an object without O(n) iteration through the object.
         return Object.keys(resolvedArgs[0]).length;
       }
    },

    _functionMap: function(resolvedArgs) {
      var mapped = [];
      var interpreter = this._interpreter;
      var exprefNode = resolvedArgs[0];
      var elements = resolvedArgs[1];
      for (var i = 0; i < elements.length; i++) {
          mapped.push(interpreter.visit(exprefNode, elements[i]));
      }
      return mapped;
    },

    _functionMerge: function(resolvedArgs) {
      var merged = {};
      for (var i = 0; i < resolvedArgs.length; i++) {
        var current = resolvedArgs[i];
        for (var key in current) {
          merged[key] = current[key];
        }
      }
      return merged;
    },

    _functionMax: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this._getTypeName(resolvedArgs[0][0]);
        if (typeName === TYPE_NUMBER) {
          return Math.max.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var maxElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (maxElement.localeCompare(elements[i]) < 0) {
                  maxElement = elements[i];
              }
          }
          return maxElement;
        }
      } else {
          return null;
      }
    },

    _functionMin: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this._getTypeName(resolvedArgs[0][0]);
        if (typeName === TYPE_NUMBER) {
          return Math.min.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var minElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (elements[i].localeCompare(minElement) < 0) {
                  minElement = elements[i];
              }
          }
          return minElement;
        }
      } else {
        return null;
      }
    },

    _functionSum: function(resolvedArgs) {
      var sum = 0;
      var listToSum = resolvedArgs[0];
      for (var i = 0; i < listToSum.length; i++) {
        sum += listToSum[i];
      }
      return sum;
    },

    _functionType: function(resolvedArgs) {
        switch (this._getTypeName(resolvedArgs[0])) {
          case TYPE_NUMBER:
            return "number";
          case TYPE_STRING:
            return "string";
          case TYPE_ARRAY:
            return "array";
          case TYPE_OBJECT:
            return "object";
          case TYPE_BOOLEAN:
            return "boolean";
          case TYPE_EXPREF:
            return "expref";
          case TYPE_NULL:
            return "null";
        }
    },

    _functionKeys: function(resolvedArgs) {
        return Object.keys(resolvedArgs[0]);
    },

    _functionValues: function(resolvedArgs) {
        var obj = resolvedArgs[0];
        var keys = Object.keys(obj);
        var values = [];
        for (var i = 0; i < keys.length; i++) {
            values.push(obj[keys[i]]);
        }
        return values;
    },

    _functionJoin: function(resolvedArgs) {
        var joinChar = resolvedArgs[0];
        var listJoin = resolvedArgs[1];
        return listJoin.join(joinChar);
    },

    _functionToArray: function(resolvedArgs) {
        if (this._getTypeName(resolvedArgs[0]) === TYPE_ARRAY) {
            return resolvedArgs[0];
        } else {
            return [resolvedArgs[0]];
        }
    },

    _functionToString: function(resolvedArgs) {
        if (this._getTypeName(resolvedArgs[0]) === TYPE_STRING) {
            return resolvedArgs[0];
        } else {
            return JSON.stringify(resolvedArgs[0]);
        }
    },

    _functionToNumber: function(resolvedArgs) {
        var typeName = this._getTypeName(resolvedArgs[0]);
        var convertedValue;
        if (typeName === TYPE_NUMBER) {
            return resolvedArgs[0];
        } else if (typeName === TYPE_STRING) {
            convertedValue = +resolvedArgs[0];
            if (!isNaN(convertedValue)) {
                return convertedValue;
            }
        }
        return null;
    },

    _functionNotNull: function(resolvedArgs) {
        for (var i = 0; i < resolvedArgs.length; i++) {
            if (this._getTypeName(resolvedArgs[i]) !== TYPE_NULL) {
                return resolvedArgs[i];
            }
        }
        return null;
    },

    _functionSort: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        sortedArray.sort();
        return sortedArray;
    },

    _functionSortBy: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length === 0) {
            return sortedArray;
        }
        var interpreter = this._interpreter;
        var exprefNode = resolvedArgs[1];
        var requiredType = this._getTypeName(
            interpreter.visit(exprefNode, sortedArray[0]));
        if ([TYPE_NUMBER, TYPE_STRING].indexOf(requiredType) < 0) {
            throw new Error("TypeError");
        }
        var that = this;
        // In order to get a stable sort out of an unstable
        // sort algorithm, we decorate/sort/undecorate (DSU)
        // by creating a new list of [index, element] pairs.
        // In the cmp function, if the evaluated elements are
        // equal, then the index will be used as the tiebreaker.
        // After the decorated list has been sorted, it will be
        // undecorated to extract the original elements.
        var decorated = [];
        for (var i = 0; i < sortedArray.length; i++) {
          decorated.push([i, sortedArray[i]]);
        }
        decorated.sort(function(a, b) {
          var exprA = interpreter.visit(exprefNode, a[1]);
          var exprB = interpreter.visit(exprefNode, b[1]);
          if (that._getTypeName(exprA) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that._getTypeName(exprA));
          } else if (that._getTypeName(exprB) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that._getTypeName(exprB));
          }
          if (exprA > exprB) {
            return 1;
          } else if (exprA < exprB) {
            return -1;
          } else {
            // If they're equal compare the items by their
            // order to maintain relative order of equal keys
            // (i.e. to get a stable sort).
            return a[0] - b[0];
          }
        });
        // Undecorate: extract out the original list elements.
        for (var j = 0; j < decorated.length; j++) {
          sortedArray[j] = decorated[j][1];
        }
        return sortedArray;
    },

    _functionMaxBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
      var maxNumber = -Infinity;
      var maxRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current > maxNumber) {
          maxNumber = current;
          maxRecord = resolvedArray[i];
        }
      }
      return maxRecord;
    },

    _functionMinBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
      var minNumber = Infinity;
      var minRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current < minNumber) {
          minNumber = current;
          minRecord = resolvedArray[i];
        }
      }
      return minRecord;
    },

    createKeyFunction: function(exprefNode, allowedTypes) {
      var that = this;
      var interpreter = this._interpreter;
      var keyFunc = function(x) {
        var current = interpreter.visit(exprefNode, x);
        if (allowedTypes.indexOf(that._getTypeName(current)) < 0) {
          var msg = "TypeError: expected one of " + allowedTypes +
                    ", received " + that._getTypeName(current);
          throw new Error(msg);
        }
        return current;
      };
      return keyFunc;
    }

  };

  function compile(stream) {
    var parser = new Parser();
    var ast = parser.parse(stream);
    return ast;
  }

  function tokenize(stream) {
      var lexer = new Lexer();
      return lexer.tokenize(stream);
  }

  function search(data, expression) {
      var parser = new Parser();
      // This needs to be improved.  Both the interpreter and runtime depend on
      // each other.  The runtime needs the interpreter to support exprefs.
      // There's likely a clean way to avoid the cyclic dependency.
      var runtime = new Runtime();
      var interpreter = new TreeInterpreter(runtime);
      runtime._interpreter = interpreter;
      var node = parser.parse(expression);
      return interpreter.search(node, data);
  }

  exports.tokenize = tokenize;
  exports.compile = compile;
  exports.search = search;
  exports.strictDeepEqual = strictDeepEqual;
})( false ? this.jmespath = {} : exports);


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(219)
var ieee754 = __webpack_require__(220)
var isArray = __webpack_require__(221)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(43).Buffer;
var intSize = 4;
var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
var chrsz = 8;

function toArray(buf, bigEndian) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize));
    buf = Buffer.concat([buf, zeroBuffer], len);
  }

  var arr = [];
  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
  for (var i = 0; i < buf.length; i += intSize) {
    arr.push(fn.call(buf, i));
  }
  return arr;
}

function toBuffer(arr, size, bigEndian) {
  var buf = new Buffer(size);
  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
  for (var i = 0; i < arr.length; i++) {
    fn.call(buf, arr[i], i * 4, true);
  }
  return buf;
}

function hash(buf, fn, hashSize, bigEndian) {
  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
  return toBuffer(arr, hashSize, bigEndian);
}

module.exports = { hash: hash };


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var util = __webpack_require__(1);
var QueryParamSerializer = __webpack_require__(87);
var Shape = __webpack_require__(8);

function buildRequest(req) {
  var operation = req.service.api.operations[req.operation];
  var httpRequest = req.httpRequest;
  httpRequest.headers['Content-Type'] =
    'application/x-www-form-urlencoded; charset=utf-8';
  httpRequest.params = {
    Version: req.service.api.apiVersion,
    Action: operation.name
  };

  // convert the request parameters into a list of query params,
  // e.g. Deeply.NestedParam.0.Name=value
  var builder = new QueryParamSerializer();
  builder.serialize(req.params, operation.input, function(name, value) {
    httpRequest.params[name] = value;
  });
  httpRequest.body = util.queryParamsToString(httpRequest.params);
}

function extractError(resp) {
  var data, body = resp.httpResponse.body.toString();
  if (body.match('<UnknownOperationException')) {
    data = {
      Code: 'UnknownOperation',
      Message: 'Unknown operation ' + resp.request.operation
    };
  } else {
    try {
      data = new AWS.XML.Parser().parse(body);
    } catch (e) {
      data = {
        Code: resp.httpResponse.statusCode,
        Message: resp.httpResponse.statusMessage
      };
    }
  }

  if (data.requestId && !resp.requestId) resp.requestId = data.requestId;
  if (data.Errors) data = data.Errors;
  if (data.Error) data = data.Error;
  if (data.Code) {
    resp.error = util.error(new Error(), {
      code: data.Code,
      message: data.Message
    });
  } else {
    resp.error = util.error(new Error(), {
      code: resp.httpResponse.statusCode,
      message: null
    });
  }
}

function extractData(resp) {
  var req = resp.request;
  var operation = req.service.api.operations[req.operation];
  var shape = operation.output || {};
  var origRules = shape;

  if (origRules.resultWrapper) {
    var tmp = Shape.create({type: 'structure'});
    tmp.members[origRules.resultWrapper] = shape;
    tmp.memberNames = [origRules.resultWrapper];
    util.property(shape, 'name', shape.resultWrapper);
    shape = tmp;
  }

  var parser = new AWS.XML.Parser();

  // TODO: Refactor XML Parser to parse RequestId from response.
  if (shape && shape.members && !shape.members._XAMZRequestId) {
    var requestIdShape = Shape.create(
      { type: 'string' },
      { api: { protocol: 'query' } },
      'requestId'
    );
    shape.members._XAMZRequestId = requestIdShape;
  }

  var data = parser.parse(resp.httpResponse.body.toString(), shape);
  resp.requestId = data._XAMZRequestId || data.requestId;

  if (data._XAMZRequestId) delete data._XAMZRequestId;

  if (origRules.resultWrapper) {
    if (data[origRules.resultWrapper]) {
      util.update(data, data[origRules.resultWrapper]);
      delete data[origRules.resultWrapper];
    }
  }

  resp.data = data;
}

module.exports = {
  buildRequest: buildRequest,
  extractError: extractError,
  extractData: extractData
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var memoizedProperty = __webpack_require__(1).memoizedProperty;

function memoize(name, value, fn, nameTr) {
  memoizedProperty(this, nameTr(name), function() {
    return fn(name, value);
  });
}

function Collection(iterable, options, fn, nameTr) {
  nameTr = nameTr || String;
  var self = this;

  for (var id in iterable) {
    if (Object.prototype.hasOwnProperty.call(iterable, id)) {
      memoize.call(self, id, iterable[id], fn, nameTr);
    }
  }
}

module.exports = Collection;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);
var Rest = __webpack_require__(16);
var Json = __webpack_require__(26);
var JsonBuilder = __webpack_require__(27);
var JsonParser = __webpack_require__(28);

function populateBody(req) {
  var builder = new JsonBuilder();
  var input = req.service.api.operations[req.operation].input;

  if (input.payload) {
    var params = {};
    var payloadShape = input.members[input.payload];
    params = req.params[input.payload];
    if (params === undefined) return;

    if (payloadShape.type === 'structure') {
      req.httpRequest.body = builder.build(params, payloadShape);
    } else { // non-JSON payload
      req.httpRequest.body = params;
    }
  } else {
    req.httpRequest.body = builder.build(req.params, input);
  }
}

function buildRequest(req) {
  Rest.buildRequest(req);

  // never send body payload on GET/HEAD/DELETE
  if (['GET', 'HEAD', 'DELETE'].indexOf(req.httpRequest.method) < 0) {
    populateBody(req);
  }
}

function extractError(resp) {
  Json.extractError(resp);
}

function extractData(resp) {
  Rest.extractData(resp);

  var req = resp.request;
  var rules = req.service.api.operations[req.operation].output || {};
  if (rules.payload) {
    var payloadMember = rules.members[rules.payload];
    var body = resp.httpResponse.body;
    if (payloadMember.type === 'structure' || payloadMember.type === 'list') {
      var parser = new JsonParser();
      resp.data[rules.payload] = parser.parse(body, payloadMember);
    } else if (payloadMember.type === 'binary' || payloadMember.isStreaming) {
      resp.data[rules.payload] = body;
    } else {
      resp.data[rules.payload] = payloadMember.toType(body);
    }
  } else {
    var data = resp.data;
    Json.extractData(resp);
    resp.data = util.merge(data, resp.data);
  }
}

module.exports = {
  buildRequest: buildRequest,
  extractError: extractError,
  extractData: extractData
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var util = __webpack_require__(1);
var Rest = __webpack_require__(16);

function populateBody(req) {
  var input = req.service.api.operations[req.operation].input;
  var builder = new AWS.XML.Builder();
  var params = req.params;

  var payload = input.payload;
  if (payload) {
    var payloadMember = input.members[payload];
    params = params[payload];
    if (params === undefined) return;

    if (payloadMember.type === 'structure') {
      var rootElement = payloadMember.name;
      req.httpRequest.body = builder.toXML(params, payloadMember, rootElement, true);
    } else { // non-xml payload
      req.httpRequest.body = params;
    }
  } else {
    req.httpRequest.body = builder.toXML(params, input, input.name ||
      input.shape || util.string.upperFirst(req.operation) + 'Request');
  }
}

function buildRequest(req) {
  Rest.buildRequest(req);

  // never send body payload on GET/HEAD
  if (['GET', 'HEAD'].indexOf(req.httpRequest.method) < 0) {
    populateBody(req);
  }
}

function extractError(resp) {
  Rest.extractError(resp);

  var data;
  try {
    data = new AWS.XML.Parser().parse(resp.httpResponse.body.toString());
  } catch (e) {
    data = {
      Code: resp.httpResponse.statusCode,
      Message: resp.httpResponse.statusMessage
    };
  }

  if (data.Errors) data = data.Errors;
  if (data.Error) data = data.Error;
  if (data.Code) {
    resp.error = util.error(new Error(), {
      code: data.Code,
      message: data.Message
    });
  } else {
    resp.error = util.error(new Error(), {
      code: resp.httpResponse.statusCode,
      message: null
    });
  }
}

function extractData(resp) {
  Rest.extractData(resp);

  var parser;
  var req = resp.request;
  var body = resp.httpResponse.body;
  var operation = req.service.api.operations[req.operation];
  var output = operation.output;

  var payload = output.payload;
  if (payload) {
    var payloadMember = output.members[payload];
    if (payloadMember.type === 'structure') {
      parser = new AWS.XML.Parser();
      resp.data[payload] = parser.parse(body.toString(), payloadMember);
    } else if (payloadMember.type === 'binary' || payloadMember.isStreaming) {
      resp.data[payload] = body;
    } else {
      resp.data[payload] = payloadMember.toType(body);
    }
  } else if (body.length > 0) {
    parser = new AWS.XML.Parser();
    var data = parser.parse(body.toString(), output);
    util.update(resp.data, data);
  }
}

module.exports = {
  buildRequest: buildRequest,
  extractError: extractError,
  extractData: extractData
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(50),
    eq = __webpack_require__(19);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(51);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 53 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(49),
    baseAssignValue = __webpack_require__(50);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(19),
    isArrayLike = __webpack_require__(11),
    isIndex = __webpack_require__(31),
    isObject = __webpack_require__(3);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(32),
    nativeKeys = __webpack_require__(112);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLDeclaration, XMLNode, create, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  create = __webpack_require__(2);

  isObject = __webpack_require__(3);

  XMLNode = __webpack_require__(7);

  module.exports = XMLDeclaration = (function(superClass) {
    extend(XMLDeclaration, superClass);

    function XMLDeclaration(parent, version, encoding, standalone) {
      var ref;
      XMLDeclaration.__super__.constructor.call(this, parent);
      if (isObject(version)) {
        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
      }
      if (!version) {
        version = '1.0';
      }
      this.version = this.stringify.xmlVersion(version);
      if (encoding != null) {
        this.encoding = this.stringify.xmlEncoding(encoding);
      }
      if (standalone != null) {
        this.standalone = this.stringify.xmlStandalone(standalone);
      }
    }

    XMLDeclaration.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<?xml';
      r += ' version="' + this.version + '"';
      if (this.encoding != null) {
        r += ' encoding="' + this.encoding + '"';
      }
      if (this.standalone != null) {
        r += ' standalone="' + this.standalone + '"';
      }
      r += '?>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDeclaration;

  })(XMLNode);

}).call(this);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(119),
    Map = __webpack_require__(37),
    Promise = __webpack_require__(120),
    Set = __webpack_require__(121),
    WeakMap = __webpack_require__(122),
    baseGetTag = __webpack_require__(9),
    toSource = __webpack_require__(53);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLAttribute, XMLElement, XMLNode, XMLProcessingInstruction, create, every, isFunction, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  create = __webpack_require__(2);

  isObject = __webpack_require__(3);

  isFunction = __webpack_require__(17);

  every = __webpack_require__(123);

  XMLNode = __webpack_require__(7);

  XMLAttribute = __webpack_require__(188);

  XMLProcessingInstruction = __webpack_require__(67);

  module.exports = XMLElement = (function(superClass) {
    extend(XMLElement, superClass);

    function XMLElement(parent, name, attributes) {
      XMLElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing element name");
      }
      this.name = this.stringify.eleName(name);
      this.children = [];
      this.instructions = [];
      this.attributes = {};
      if (attributes != null) {
        this.attribute(attributes);
      }
    }

    XMLElement.prototype.clone = function() {
      var att, attName, clonedSelf, i, len, pi, ref, ref1;
      clonedSelf = create(XMLElement.prototype, this);
      if (clonedSelf.isRoot) {
        clonedSelf.documentObject = null;
      }
      clonedSelf.attributes = {};
      ref = this.attributes;
      for (attName in ref) {
        if (!hasProp.call(ref, attName)) continue;
        att = ref[attName];
        clonedSelf.attributes[attName] = att.clone();
      }
      clonedSelf.instructions = [];
      ref1 = this.instructions;
      for (i = 0, len = ref1.length; i < len; i++) {
        pi = ref1[i];
        clonedSelf.instructions.push(pi.clone());
      }
      clonedSelf.children = [];
      this.children.forEach(function(child) {
        var clonedChild;
        clonedChild = child.clone();
        clonedChild.parent = clonedSelf;
        return clonedSelf.children.push(clonedChild);
      });
      return clonedSelf;
    };

    XMLElement.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (name != null) {
        name = name.valueOf();
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || (value != null)) {
          this.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLElement.prototype.removeAttribute = function(name) {
      var attName, i, len;
      if (name == null) {
        throw new Error("Missing attribute name");
      }
      name = name.valueOf();
      if (Array.isArray(name)) {
        for (i = 0, len = name.length; i < len; i++) {
          attName = name[i];
          delete this.attributes[attName];
        }
      } else {
        delete this.attributes[name];
      }
      return this;
    };

    XMLElement.prototype.instruction = function(target, value) {
      var i, insTarget, insValue, instruction, len;
      if (target != null) {
        target = target.valueOf();
      }
      if (value != null) {
        value = value.valueOf();
      }
      if (Array.isArray(target)) {
        for (i = 0, len = target.length; i < len; i++) {
          insTarget = target[i];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        instruction = new XMLProcessingInstruction(this, target, value);
        this.instructions.push(instruction);
      }
      return this;
    };

    XMLElement.prototype.toString = function(options, level) {
      var att, child, i, indent, instruction, j, len, len1, name, newline, offset, pretty, r, ref, ref1, ref2, ref3, ref4, ref5, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      ref3 = this.instructions;
      for (i = 0, len = ref3.length; i < len; i++) {
        instruction = ref3[i];
        r += instruction.toString(options, level);
      }
      if (pretty) {
        r += space;
      }
      r += '<' + this.name;
      ref4 = this.attributes;
      for (name in ref4) {
        if (!hasProp.call(ref4, name)) continue;
        att = ref4[name];
        r += att.toString(options);
      }
      if (this.children.length === 0 || every(this.children, function(e) {
        return e.value === '';
      })) {
        r += '/>';
        if (pretty) {
          r += newline;
        }
      } else if (pretty && this.children.length === 1 && (this.children[0].value != null)) {
        r += '>';
        r += this.children[0].value;
        r += '</' + this.name + '>';
        r += newline;
      } else {
        r += '>';
        if (pretty) {
          r += newline;
        }
        ref5 = this.children;
        for (j = 0, len1 = ref5.length; j < len1; j++) {
          child = ref5[j];
          r += child.toString(options, level + 1);
        }
        if (pretty) {
          r += space;
        }
        r += '</' + this.name + '>';
        if (pretty) {
          r += newline;
        }
      }
      return r;
    };

    XMLElement.prototype.att = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLElement.prototype.a = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    return XMLElement;

  })(XMLNode);

}).call(this);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(20),
    stackClear = __webpack_require__(139),
    stackDelete = __webpack_require__(140),
    stackGet = __webpack_require__(141),
    stackHas = __webpack_require__(142),
    stackSet = __webpack_require__(143);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(156),
    isObjectLike = __webpack_require__(13);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(157),
    arraySome = __webpack_require__(160),
    cacheHas = __webpack_require__(161);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(66),
    toKey = __webpack_require__(24);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(4),
    isKey = __webpack_require__(39),
    stringToPath = __webpack_require__(176),
    toString = __webpack_require__(179);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLProcessingInstruction, create;

  create = __webpack_require__(2);

  module.exports = XMLProcessingInstruction = (function() {
    function XMLProcessingInstruction(parent, target, value) {
      this.stringify = parent.stringify;
      if (target == null) {
        throw new Error("Missing instruction target");
      }
      this.target = this.stringify.insTarget(target);
      if (value) {
        this.value = this.stringify.insValue(value);
      }
    }

    XMLProcessingInstruction.prototype.clone = function() {
      return create(XMLProcessingInstruction.prototype, this);
    };

    XMLProcessingInstruction.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<?';
      r += this.target;
      if (this.value) {
        r += ' ' + this.value;
      }
      r += '?>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLProcessingInstruction;

  })();

}).call(this);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLCData, XMLNode, create,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  create = __webpack_require__(2);

  XMLNode = __webpack_require__(7);

  module.exports = XMLCData = (function(superClass) {
    extend(XMLCData, superClass);

    function XMLCData(parent, text) {
      XMLCData.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing CDATA text");
      }
      this.text = this.stringify.cdata(text);
    }

    XMLCData.prototype.clone = function() {
      return create(XMLCData.prototype, this);
    };

    XMLCData.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<![CDATA[' + this.text + ']]>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLCData;

  })(XMLNode);

}).call(this);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLComment, XMLNode, create,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  create = __webpack_require__(2);

  XMLNode = __webpack_require__(7);

  module.exports = XMLComment = (function(superClass) {
    extend(XMLComment, superClass);

    function XMLComment(parent, text) {
      XMLComment.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing comment text");
      }
      this.text = this.stringify.comment(text);
    }

    XMLComment.prototype.clone = function() {
      return create(XMLComment.prototype, this);
    };

    XMLComment.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!-- ' + this.text + ' -->';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLComment;

  })(XMLNode);

}).call(this);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLProcessingInstruction, create, isObject;

  create = __webpack_require__(2);

  isObject = __webpack_require__(3);

  XMLCData = __webpack_require__(68);

  XMLComment = __webpack_require__(69);

  XMLDTDAttList = __webpack_require__(189);

  XMLDTDEntity = __webpack_require__(190);

  XMLDTDElement = __webpack_require__(191);

  XMLDTDNotation = __webpack_require__(192);

  XMLProcessingInstruction = __webpack_require__(67);

  module.exports = XMLDocType = (function() {
    function XMLDocType(parent, pubID, sysID) {
      var ref, ref1;
      this.documentObject = parent;
      this.stringify = this.documentObject.stringify;
      this.children = [];
      if (isObject(pubID)) {
        ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
      }
      if (sysID == null) {
        ref1 = [pubID, sysID], sysID = ref1[0], pubID = ref1[1];
      }
      if (pubID != null) {
        this.pubID = this.stringify.dtdPubID(pubID);
      }
      if (sysID != null) {
        this.sysID = this.stringify.dtdSysID(sysID);
      }
    }

    XMLDocType.prototype.element = function(name, value) {
      var child;
      child = new XMLDTDElement(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var child;
      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.entity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, false, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.pEntity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, true, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.notation = function(name, value) {
      var child;
      child = new XMLDTDNotation(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.cdata = function(value) {
      var child;
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.comment = function(value) {
      var child;
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.instruction = function(target, value) {
      var child;
      child = new XMLProcessingInstruction(this, target, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.root = function() {
      return this.documentObject.root();
    };

    XMLDocType.prototype.document = function() {
      return this.documentObject;
    };

    XMLDocType.prototype.toString = function(options, level) {
      var child, i, indent, len, newline, offset, pretty, r, ref, ref1, ref2, ref3, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!DOCTYPE ' + this.root().name;
      if (this.pubID && this.sysID) {
        r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
      } else if (this.sysID) {
        r += ' SYSTEM "' + this.sysID + '"';
      }
      if (this.children.length > 0) {
        r += ' [';
        if (pretty) {
          r += newline;
        }
        ref3 = this.children;
        for (i = 0, len = ref3.length; i < len; i++) {
          child = ref3[i];
          r += child.toString(options, level + 1);
        }
        r += ']';
      }
      r += '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    XMLDocType.prototype.ele = function(name, value) {
      return this.element(name, value);
    };

    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
    };

    XMLDocType.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocType.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocType.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    XMLDocType.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLDocType.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLDocType.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocType.prototype.up = function() {
      return this.root();
    };

    XMLDocType.prototype.doc = function() {
      return this.document();
    };

    return XMLDocType;

  })();

}).call(this);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var Collection = __webpack_require__(46);
var Operation = __webpack_require__(72);
var Shape = __webpack_require__(8);
var Paginator = __webpack_require__(73);
var ResourceWaiter = __webpack_require__(74);

var util = __webpack_require__(1);
var property = util.property;
var memoizedProperty = util.memoizedProperty;

function Api(api, options) {
  api = api || {};
  options = options || {};
  options.api = this;

  api.metadata = api.metadata || {};

  property(this, 'isApi', true, false);
  property(this, 'apiVersion', api.metadata.apiVersion);
  property(this, 'endpointPrefix', api.metadata.endpointPrefix);
  property(this, 'signingName', api.metadata.signingName);
  property(this, 'globalEndpoint', api.metadata.globalEndpoint);
  property(this, 'signatureVersion', api.metadata.signatureVersion);
  property(this, 'jsonVersion', api.metadata.jsonVersion);
  property(this, 'targetPrefix', api.metadata.targetPrefix);
  property(this, 'protocol', api.metadata.protocol);
  property(this, 'timestampFormat', api.metadata.timestampFormat);
  property(this, 'xmlNamespaceUri', api.metadata.xmlNamespace);
  property(this, 'abbreviation', api.metadata.serviceAbbreviation);
  property(this, 'fullName', api.metadata.serviceFullName);

  memoizedProperty(this, 'className', function() {
    var name = api.metadata.serviceAbbreviation || api.metadata.serviceFullName;
    if (!name) return null;

    name = name.replace(/^Amazon|AWS\s*|\(.*|\s+|\W+/g, '');
    if (name === 'ElasticLoadBalancing') name = 'ELB';
    return name;
  });

  property(this, 'operations', new Collection(api.operations, options, function(name, operation) {
    return new Operation(name, operation, options);
  }, util.string.lowerFirst));

  property(this, 'shapes', new Collection(api.shapes, options, function(name, shape) {
    return Shape.create(shape, options);
  }));

  property(this, 'paginators', new Collection(api.paginators, options, function(name, paginator) {
    return new Paginator(name, paginator, options);
  }));

  property(this, 'waiters', new Collection(api.waiters, options, function(name, waiter) {
    return new ResourceWaiter(name, waiter, options);
  }, util.string.lowerFirst));

  if (options.documentation) {
    property(this, 'documentation', api.documentation);
    property(this, 'documentationUrl', api.documentationUrl);
  }
}

module.exports = Api;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var Shape = __webpack_require__(8);

var util = __webpack_require__(1);
var property = util.property;
var memoizedProperty = util.memoizedProperty;

function Operation(name, operation, options) {
  var self = this;
  options = options || {};

  property(this, 'name', operation.name || name);
  property(this, 'api', options.api, false);

  operation.http = operation.http || {};
  property(this, 'httpMethod', operation.http.method || 'POST');
  property(this, 'httpPath', operation.http.requestUri || '/');
  property(this, 'authtype', operation.authtype || '');

  memoizedProperty(this, 'input', function() {
    if (!operation.input) {
      return new Shape.create({type: 'structure'}, options);
    }
    return Shape.create(operation.input, options);
  });

  memoizedProperty(this, 'output', function() {
    if (!operation.output) {
      return new Shape.create({type: 'structure'}, options);
    }
    return Shape.create(operation.output, options);
  });

  memoizedProperty(this, 'errors', function() {
    var list = [];
    if (!operation.errors) return null;

    for (var i = 0; i < operation.errors.length; i++) {
      list.push(Shape.create(operation.errors[i], options));
    }

    return list;
  });

  memoizedProperty(this, 'paginator', function() {
    return options.api.paginators[name];
  });

  if (options.documentation) {
    property(this, 'documentation', operation.documentation);
    property(this, 'documentationUrl', operation.documentationUrl);
  }

  // idempotentMembers only tracks top-level input shapes
  memoizedProperty(this, 'idempotentMembers', function() {
    var idempotentMembers = [];
    var input = self.input;
    var members = input.members;
    if (!input.members) {
      return idempotentMembers;
    }
    for (var name in members) {
      if (!members.hasOwnProperty(name)) {
        continue;
      }
      if (members[name].isIdempotent === true) {
        idempotentMembers.push(name);
      }
    }
    return idempotentMembers;
  });

}

module.exports = Operation;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var property = __webpack_require__(1).property;

function Paginator(name, paginator) {
  property(this, 'inputToken', paginator.input_token);
  property(this, 'limitKey', paginator.limit_key);
  property(this, 'moreResults', paginator.more_results);
  property(this, 'outputToken', paginator.output_token);
  property(this, 'resultKey', paginator.result_key);
}

module.exports = Paginator;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);
var property = util.property;

function ResourceWaiter(name, waiter, options) {
  options = options || {};
  property(this, 'name', name);
  property(this, 'api', options.api, false);

  if (waiter.operation) {
    property(this, 'operation', util.string.lowerFirst(waiter.operation));
  }

  var self = this;
  var keys = [
    'type',
    'description',
    'delay',
    'maxAttempts',
    'acceptors'
  ];

  keys.forEach(function(key) {
    var value = waiter[key];
    if (value) {
      property(self, key, value);
    }
  });
}

module.exports = ResourceWaiter;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);

/**
 * Represents your AWS security credentials, specifically the
 * {accessKeyId}, {secretAccessKey}, and optional {sessionToken}.
 * Creating a `Credentials` object allows you to pass around your
 * security information to configuration and service objects.
 *
 * Note that this class typically does not need to be constructed manually,
 * as the {AWS.Config} and {AWS.Service} classes both accept simple
 * options hashes with the three keys. These structures will be converted
 * into Credentials objects automatically.
 *
 * ## Expiring and Refreshing Credentials
 *
 * Occasionally credentials can expire in the middle of a long-running
 * application. In this case, the SDK will automatically attempt to
 * refresh the credentials from the storage location if the Credentials
 * class implements the {refresh} method.
 *
 * If you are implementing a credential storage location, you
 * will want to create a subclass of the `Credentials` class and
 * override the {refresh} method. This method allows credentials to be
 * retrieved from the backing store, be it a file system, database, or
 * some network storage. The method should reset the credential attributes
 * on the object.
 *
 * @!attribute expired
 *   @return [Boolean] whether the credentials have been expired and
 *     require a refresh. Used in conjunction with {expireTime}.
 * @!attribute expireTime
 *   @return [Date] a time when credentials should be considered expired. Used
 *     in conjunction with {expired}.
 * @!attribute accessKeyId
 *   @return [String] the AWS access key ID
 * @!attribute secretAccessKey
 *   @return [String] the AWS secret access key
 * @!attribute sessionToken
 *   @return [String] an optional AWS session token
 */
AWS.Credentials = AWS.util.inherit({
  /**
   * A credentials object can be created using positional arguments or an options
   * hash.
   *
   * @overload AWS.Credentials(accessKeyId, secretAccessKey, sessionToken=null)
   *   Creates a Credentials object with a given set of credential information
   *   as positional arguments.
   *   @param accessKeyId [String] the AWS access key ID
   *   @param secretAccessKey [String] the AWS secret access key
   *   @param sessionToken [String] the optional AWS session token
   *   @example Create a credentials object with AWS credentials
   *     var creds = new AWS.Credentials('akid', 'secret', 'session');
   * @overload AWS.Credentials(options)
   *   Creates a Credentials object with a given set of credential information
   *   as an options hash.
   *   @option options accessKeyId [String] the AWS access key ID
   *   @option options secretAccessKey [String] the AWS secret access key
   *   @option options sessionToken [String] the optional AWS session token
   *   @example Create a credentials object with AWS credentials
   *     var creds = new AWS.Credentials({
   *       accessKeyId: 'akid', secretAccessKey: 'secret', sessionToken: 'session'
   *     });
   */
  constructor: function Credentials() {
    // hide secretAccessKey from being displayed with util.inspect
    AWS.util.hideProperties(this, ['secretAccessKey']);

    this.expired = false;
    this.expireTime = null;
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      var creds = arguments[0].credentials || arguments[0];
      this.accessKeyId = creds.accessKeyId;
      this.secretAccessKey = creds.secretAccessKey;
      this.sessionToken = creds.sessionToken;
    } else {
      this.accessKeyId = arguments[0];
      this.secretAccessKey = arguments[1];
      this.sessionToken = arguments[2];
    }
  },

  /**
   * @return [Integer] the number of seconds before {expireTime} during which
   *   the credentials will be considered expired.
   */
  expiryWindow: 15,

  /**
   * @return [Boolean] whether the credentials object should call {refresh}
   * @note Subclasses should override this method to provide custom refresh
   *   logic.
   */
  needsRefresh: function needsRefresh() {
    var currentTime = AWS.util.date.getDate().getTime();
    var adjustedTime = new Date(currentTime + this.expiryWindow * 1000);

    if (this.expireTime && adjustedTime > this.expireTime) {
      return true;
    } else {
      return this.expired || !this.accessKeyId || !this.secretAccessKey;
    }
  },

  /**
   * Gets the existing credentials, refreshing them if they are not yet loaded
   * or have expired. Users should call this method before using {refresh},
   * as this will not attempt to reload credentials when they are already
   * loaded into the object.
   *
   * @callback callback function(err)
   *   When this callback is called with no error, it means either credentials
   *   do not need to be refreshed or refreshed credentials information has
   *   been loaded into the object (as the `accessKeyId`, `secretAccessKey`,
   *   and `sessionToken` properties).
   *   @param err [Error] if an error occurred, this value will be filled
   */
  get: function get(callback) {
    var self = this;
    if (this.needsRefresh()) {
      this.refresh(function(err) {
        if (!err) self.expired = false; // reset expired flag
        if (callback) callback(err);
      });
    } else if (callback) {
      callback();
    }
  },

  /**
   * @!method  getPromise()
   *   Returns a 'thenable' promise.
   *   Gets the existing credentials, refreshing them if they are not yet loaded
   *   or have expired. Users should call this method before using {refresh},
   *   as this will not attempt to reload credentials when they are already
   *   loaded into the object.
   *
   *   Two callbacks can be provided to the `then` method on the returned promise.
   *   The first callback will be called if the promise is fulfilled, and the second
   *   callback will be called if the promise is rejected.
   *   @callback fulfilledCallback function()
   *     Called if the promise is fulfilled. When this callback is called, it
   *     means either credentials do not need to be refreshed or refreshed
   *     credentials information has been loaded into the object (as the
   *     `accessKeyId`, `secretAccessKey`, and `sessionToken` properties).
   *   @callback rejectedCallback function(err)
   *     Called if the promise is rejected.
   *     @param err [Error] if an error occurred, this value will be filled
   *   @return [Promise] A promise that represents the state of the `get` call.
   *   @example Calling the `getPromise` method.
   *     var promise = credProvider.getPromise();
   *     promise.then(function() { ... }, function(err) { ... });
   */

  /**
   * @!method  refreshPromise()
   *   Returns a 'thenable' promise.
   *   Refreshes the credentials. Users should call {get} before attempting
   *   to forcibly refresh credentials.
   *
   *   Two callbacks can be provided to the `then` method on the returned promise.
   *   The first callback will be called if the promise is fulfilled, and the second
   *   callback will be called if the promise is rejected.
   *   @callback fulfilledCallback function()
   *     Called if the promise is fulfilled. When this callback is called, it
   *     means refreshed credentials information has been loaded into the object
   *     (as the `accessKeyId`, `secretAccessKey`, and `sessionToken` properties).
   *   @callback rejectedCallback function(err)
   *     Called if the promise is rejected.
   *     @param err [Error] if an error occurred, this value will be filled
   *   @return [Promise] A promise that represents the state of the `refresh` call.
   *   @example Calling the `refreshPromise` method.
   *     var promise = credProvider.refreshPromise();
   *     promise.then(function() { ... }, function(err) { ... });
   */

  /**
   * Refreshes the credentials. Users should call {get} before attempting
   * to forcibly refresh credentials.
   *
   * @callback callback function(err)
   *   When this callback is called with no error, it means refreshed
   *   credentials information has been loaded into the object (as the
   *   `accessKeyId`, `secretAccessKey`, and `sessionToken` properties).
   *   @param err [Error] if an error occurred, this value will be filled
   * @note Subclasses should override this class to reset the
   *   {accessKeyId}, {secretAccessKey} and optional {sessionToken}
   *   on the credentials object and then call the callback with
   *   any error information.
   * @see get
   */
  refresh: function refresh(callback) {
    this.expired = false;
    callback();
  }
});

/**
 * @api private
 */
AWS.Credentials.addPromisesToClass = function addPromisesToClass(PromiseDependency) {
  this.prototype.getPromise = AWS.util.promisifyMethod('get', PromiseDependency);
  this.prototype.refreshPromise = AWS.util.promisifyMethod('refresh', PromiseDependency);
};

/**
 * @api private
 */
AWS.Credentials.deletePromisesFromClass = function deletePromisesFromClass() {
  delete this.prototype.getPromise;
  delete this.prototype.refreshPromise;
};

AWS.util.addPromises(AWS.Credentials);


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);

/**
 * Creates a credential provider chain that searches for AWS credentials
 * in a list of credential providers specified by the {providers} property.
 *
 * By default, the chain will use the {defaultProviders} to resolve credentials.
 * These providers will look in the environment using the
 * {AWS.EnvironmentCredentials} class with the 'AWS' and 'AMAZON' prefixes.
 *
 * ## Setting Providers
 *
 * Each provider in the {providers} list should be a function that returns
 * a {AWS.Credentials} object, or a hardcoded credentials object. The function
 * form allows for delayed execution of the credential construction.
 *
 * ## Resolving Credentials from a Chain
 *
 * Call {resolve} to return the first valid credential object that can be
 * loaded by the provider chain.
 *
 * For example, to resolve a chain with a custom provider that checks a file
 * on disk after the set of {defaultProviders}:
 *
 * ```javascript
 * var diskProvider = new AWS.FileSystemCredentials('./creds.json');
 * var chain = new AWS.CredentialProviderChain();
 * chain.providers.push(diskProvider);
 * chain.resolve();
 * ```
 *
 * The above code will return the `diskProvider` object if the
 * file contains credentials and the `defaultProviders` do not contain
 * any credential settings.
 *
 * @!attribute providers
 *   @return [Array<AWS.Credentials, Function>]
 *     a list of credentials objects or functions that return credentials
 *     objects. If the provider is a function, the function will be
 *     executed lazily when the provider needs to be checked for valid
 *     credentials. By default, this object will be set to the
 *     {defaultProviders}.
 *   @see defaultProviders
 */
AWS.CredentialProviderChain = AWS.util.inherit(AWS.Credentials, {

  /**
   * Creates a new CredentialProviderChain with a default set of providers
   * specified by {defaultProviders}.
   */
  constructor: function CredentialProviderChain(providers) {
    if (providers) {
      this.providers = providers;
    } else {
      this.providers = AWS.CredentialProviderChain.defaultProviders.slice(0);
    }
  },

  /**
   * @!method  resolvePromise()
   *   Returns a 'thenable' promise.
   *   Resolves the provider chain by searching for the first set of
   *   credentials in {providers}.
   *
   *   Two callbacks can be provided to the `then` method on the returned promise.
   *   The first callback will be called if the promise is fulfilled, and the second
   *   callback will be called if the promise is rejected.
   *   @callback fulfilledCallback function(credentials)
   *     Called if the promise is fulfilled and the provider resolves the chain
   *     to a credentials object
   *     @param credentials [AWS.Credentials] the credentials object resolved
   *       by the provider chain.
   *   @callback rejectedCallback function(error)
   *     Called if the promise is rejected.
   *     @param err [Error] the error object returned if no credentials are found.
   *   @return [Promise] A promise that represents the state of the `resolve` method call.
   *   @example Calling the `resolvePromise` method.
   *     var promise = chain.resolvePromise();
   *     promise.then(function(credentials) { ... }, function(err) { ... });
   */

  /**
   * Resolves the provider chain by searching for the first set of
   * credentials in {providers}.
   *
   * @callback callback function(err, credentials)
   *   Called when the provider resolves the chain to a credentials object
   *   or null if no credentials can be found.
   *
   *   @param err [Error] the error object returned if no credentials are
   *     found.
   *   @param credentials [AWS.Credentials] the credentials object resolved
   *     by the provider chain.
   * @return [AWS.CredentialProviderChain] the provider, for chaining.
   */
  resolve: function resolve(callback) {
    if (this.providers.length === 0) {
      callback(new Error('No providers'));
      return this;
    }

    var index = 0;
    var providers = this.providers.slice(0);

    function resolveNext(err, creds) {
      if ((!err && creds) || index === providers.length) {
        callback(err, creds);
        return;
      }

      var provider = providers[index++];
      if (typeof provider === 'function') {
        creds = provider.call();
      } else {
        creds = provider;
      }

      if (creds.get) {
        creds.get(function(getErr) {
          resolveNext(getErr, getErr ? null : creds);
        });
      } else {
        resolveNext(null, creds);
      }
    }

    resolveNext();
    return this;
  }
});

/**
 * The default set of providers used by a vanilla CredentialProviderChain.
 *
 * In the browser:
 *
 * ```javascript
 * AWS.CredentialProviderChain.defaultProviders = []
 * ```
 *
 * In Node.js:
 *
 * ```javascript
 * AWS.CredentialProviderChain.defaultProviders = [
 *   function () { return new AWS.EnvironmentCredentials('AWS'); },
 *   function () { return new AWS.EnvironmentCredentials('AMAZON'); },
 *   function () { return new AWS.SharedIniFileCredentials(); },
 *   function () {
 *     // if AWS_CONTAINER_CREDENTIALS_RELATIVE_URI is set
 *       return new AWS.ECSCredentials();
 *     // else
 *       return new AWS.EC2MetadataCredentials();
 *   }
 * ]
 * ```
 */
AWS.CredentialProviderChain.defaultProviders = [];

/**
 * @api private
 */
AWS.CredentialProviderChain.addPromisesToClass = function addPromisesToClass(PromiseDependency) {
  this.prototype.resolvePromise = AWS.util.promisifyMethod('resolve', PromiseDependency);
};

/**
 * @api private
 */
AWS.CredentialProviderChain.deletePromisesFromClass = function deletePromisesFromClass() {
  delete this.prototype.resolvePromise;
};

AWS.util.addPromises(AWS.CredentialProviderChain);


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var inherit = AWS.util.inherit;

/**
 * The endpoint that a service will talk to, for example,
 * `'https://ec2.ap-southeast-1.amazonaws.com'`. If
 * you need to override an endpoint for a service, you can
 * set the endpoint on a service by passing the endpoint
 * object with the `endpoint` option key:
 *
 * ```javascript
 * var ep = new AWS.Endpoint('awsproxy.example.com');
 * var s3 = new AWS.S3({endpoint: ep});
 * s3.service.endpoint.hostname == 'awsproxy.example.com'
 * ```
 *
 * Note that if you do not specify a protocol, the protocol will
 * be selected based on your current {AWS.config} configuration.
 *
 * @!attribute protocol
 *   @return [String] the protocol (http or https) of the endpoint
 *     URL
 * @!attribute hostname
 *   @return [String] the host portion of the endpoint, e.g.,
 *     example.com
 * @!attribute host
 *   @return [String] the host portion of the endpoint including
 *     the port, e.g., example.com:80
 * @!attribute port
 *   @return [Integer] the port of the endpoint
 * @!attribute href
 *   @return [String] the full URL of the endpoint
 */
AWS.Endpoint = inherit({

  /**
   * @overload Endpoint(endpoint)
   *   Constructs a new endpoint given an endpoint URL. If the
   *   URL omits a protocol (http or https), the default protocol
   *   set in the global {AWS.config} will be used.
   *   @param endpoint [String] the URL to construct an endpoint from
   */
  constructor: function Endpoint(endpoint, config) {
    AWS.util.hideProperties(this, ['slashes', 'auth', 'hash', 'search', 'query']);

    if (typeof endpoint === 'undefined' || endpoint === null) {
      throw new Error('Invalid endpoint: ' + endpoint);
    } else if (typeof endpoint !== 'string') {
      return AWS.util.copy(endpoint);
    }

    if (!endpoint.match(/^http/)) {
      var useSSL = config && config.sslEnabled !== undefined ?
        config.sslEnabled : AWS.config.sslEnabled;
      endpoint = (useSSL ? 'https' : 'http') + '://' + endpoint;
    }

    AWS.util.update(this, AWS.util.urlParse(endpoint));

    // Ensure the port property is set as an integer
    if (this.port) {
      this.port = parseInt(this.port, 10);
    } else {
      this.port = this.protocol === 'https:' ? 443 : 80;
    }
  }

});

/**
 * The low level HTTP request object, encapsulating all HTTP header
 * and body data sent by a service request.
 *
 * @!attribute method
 *   @return [String] the HTTP method of the request
 * @!attribute path
 *   @return [String] the path portion of the URI, e.g.,
 *     "/list/?start=5&num=10"
 * @!attribute headers
 *   @return [map<String,String>]
 *     a map of header keys and their respective values
 * @!attribute body
 *   @return [String] the request body payload
 * @!attribute endpoint
 *   @return [AWS.Endpoint] the endpoint for the request
 * @!attribute region
 *   @api private
 *   @return [String] the region, for signing purposes only.
 */
AWS.HttpRequest = inherit({

  /**
   * @api private
   */
  constructor: function HttpRequest(endpoint, region) {
    endpoint = new AWS.Endpoint(endpoint);
    this.method = 'POST';
    this.path = endpoint.path || '/';
    this.headers = {};
    this.body = '';
    this.endpoint = endpoint;
    this.region = region;
    this._userAgent = '';
    this.setUserAgent();
  },

  /**
   * @api private
   */
  setUserAgent: function setUserAgent() {
    this._userAgent = this.headers[this.getUserAgentHeaderName()] = AWS.util.userAgent();
  },

  getUserAgentHeaderName: function getUserAgentHeaderName() {
    var prefix = AWS.util.isBrowser() ? 'X-Amz-' : '';
    return prefix + 'User-Agent';
  },

  /**
   * @api private
   */
  appendToUserAgent: function appendToUserAgent(agentPartial) {
    if (typeof agentPartial === 'string' && agentPartial) {
      this._userAgent += ' ' + agentPartial;
    }
    this.headers[this.getUserAgentHeaderName()] = this._userAgent;
  },

  /**
   * @api private
   */
  getUserAgent: function getUserAgent() {
    return this._userAgent;
  },

  /**
   * @return [String] the part of the {path} excluding the
   *   query string
   */
  pathname: function pathname() {
    return this.path.split('?', 1)[0];
  },

  /**
   * @return [String] the query string portion of the {path}
   */
  search: function search() {
    var query = this.path.split('?', 2)[1];
    if (query) {
      query = AWS.util.queryStringParse(query);
      return AWS.util.queryParamsToString(query);
    }
    return '';
  }

});

/**
 * The low level HTTP response object, encapsulating all HTTP header
 * and body data returned from the request.
 *
 * @!attribute statusCode
 *   @return [Integer] the HTTP status code of the response (e.g., 200, 404)
 * @!attribute headers
 *   @return [map<String,String>]
 *      a map of response header keys and their respective values
 * @!attribute body
 *   @return [String] the response body payload
 * @!attribute [r] streaming
 *   @return [Boolean] whether this response is being streamed at a low-level.
 *     Defaults to `false` (buffered reads). Do not modify this manually, use
 *     {createUnbufferedStream} to convert the stream to unbuffered mode
 *     instead.
 */
AWS.HttpResponse = inherit({

  /**
   * @api private
   */
  constructor: function HttpResponse() {
    this.statusCode = undefined;
    this.headers = {};
    this.body = undefined;
    this.streaming = false;
    this.stream = null;
  },

  /**
   * Disables buffering on the HTTP response and returns the stream for reading.
   * @return [Stream, XMLHttpRequest, null] the underlying stream object.
   *   Use this object to directly read data off of the stream.
   * @note This object is only available after the {AWS.Request~httpHeaders}
   *   event has fired. This method must be called prior to
   *   {AWS.Request~httpData}.
   * @example Taking control of a stream
   *   request.on('httpHeaders', function(statusCode, headers) {
   *     if (statusCode < 300) {
   *       if (headers.etag === 'xyz') {
   *         // pipe the stream, disabling buffering
   *         var stream = this.response.httpResponse.createUnbufferedStream();
   *         stream.pipe(process.stdout);
   *       } else { // abort this request and set a better error message
   *         this.abort();
   *         this.response.error = new Error('Invalid ETag');
   *       }
   *     }
   *   }).send(console.log);
   */
  createUnbufferedStream: function createUnbufferedStream() {
    this.streaming = true;
    return this.stream;
  }
});


AWS.HttpClient = inherit({});

/**
 * @api private
 */
AWS.HttpClient.getInstance = function getInstance() {
  if (this.singleton === undefined) {
    this.singleton = new this();
  }
  return this.singleton;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);

/**
 * @api private
 * @!method on(eventName, callback)
 *   Registers an event listener callback for the event given by `eventName`.
 *   Parameters passed to the callback function depend on the individual event
 *   being triggered. See the event documentation for those parameters.
 *
 *   @param eventName [String] the event name to register the listener for
 *   @param callback [Function] the listener callback function
 *   @return [AWS.SequentialExecutor] the same object for chaining
 */
AWS.SequentialExecutor = AWS.util.inherit({

  constructor: function SequentialExecutor() {
    this._events = {};
  },

  /**
   * @api private
   */
  listeners: function listeners(eventName) {
    return this._events[eventName] ? this._events[eventName].slice(0) : [];
  },

  on: function on(eventName, listener) {
    if (this._events[eventName]) {
      this._events[eventName].push(listener);
    } else {
      this._events[eventName] = [listener];
    }
    return this;
  },

  /**
   * @api private
   */
  onAsync: function onAsync(eventName, listener) {
    listener._isAsync = true;
    return this.on(eventName, listener);
  },

  removeListener: function removeListener(eventName, listener) {
    var listeners = this._events[eventName];
    if (listeners) {
      var length = listeners.length;
      var position = -1;
      for (var i = 0; i < length; ++i) {
        if (listeners[i] === listener) {
          position = i;
        }
      }
      if (position > -1) {
        listeners.splice(position, 1);
      }
    }
    return this;
  },

  removeAllListeners: function removeAllListeners(eventName) {
    if (eventName) {
      delete this._events[eventName];
    } else {
      this._events = {};
    }
    return this;
  },

  /**
   * @api private
   */
  emit: function emit(eventName, eventArgs, doneCallback) {
    if (!doneCallback) doneCallback = function() { };
    var listeners = this.listeners(eventName);
    var count = listeners.length;
    this.callListeners(listeners, eventArgs, doneCallback);
    return count > 0;
  },

  /**
   * @api private
   */
  callListeners: function callListeners(listeners, args, doneCallback, prevError) {
    var self = this;
    var error = prevError || null;

    function callNextListener(err) {
      if (err) {
        error = AWS.util.error(error || new Error(), err);
        if (self._haltHandlersOnError) {
          return doneCallback.call(self, error);
        }
      }
      self.callListeners(listeners, args, doneCallback, error);
    }

    while (listeners.length > 0) {
      var listener = listeners.shift();
      if (listener._isAsync) { // asynchronous listener
        listener.apply(self, args.concat([callNextListener]));
        return; // stop here, callNextListener will continue
      } else { // synchronous listener
        try {
          listener.apply(self, args);
        } catch (err) {
          error = AWS.util.error(error || new Error(), err);
        }
        if (error && self._haltHandlersOnError) {
          doneCallback.call(self, error);
          return;
        }
      }
    }
    doneCallback.call(self, error);
  },

  /**
   * Adds or copies a set of listeners from another list of
   * listeners or SequentialExecutor object.
   *
   * @param listeners [map<String,Array<Function>>, AWS.SequentialExecutor]
   *   a list of events and callbacks, or an event emitter object
   *   containing listeners to add to this emitter object.
   * @return [AWS.SequentialExecutor] the emitter object, for chaining.
   * @example Adding listeners from a map of listeners
   *   emitter.addListeners({
   *     event1: [function() { ... }, function() { ... }],
   *     event2: [function() { ... }]
   *   });
   *   emitter.emit('event1'); // emitter has event1
   *   emitter.emit('event2'); // emitter has event2
   * @example Adding listeners from another emitter object
   *   var emitter1 = new AWS.SequentialExecutor();
   *   emitter1.on('event1', function() { ... });
   *   emitter1.on('event2', function() { ... });
   *   var emitter2 = new AWS.SequentialExecutor();
   *   emitter2.addListeners(emitter1);
   *   emitter2.emit('event1'); // emitter2 has event1
   *   emitter2.emit('event2'); // emitter2 has event2
   */
  addListeners: function addListeners(listeners) {
    var self = this;

    // extract listeners if parameter is an SequentialExecutor object
    if (listeners._events) listeners = listeners._events;

    AWS.util.each(listeners, function(event, callbacks) {
      if (typeof callbacks === 'function') callbacks = [callbacks];
      AWS.util.arrayEach(callbacks, function(callback) {
        self.on(event, callback);
      });
    });

    return self;
  },

  /**
   * Registers an event with {on} and saves the callback handle function
   * as a property on the emitter object using a given `name`.
   *
   * @param name [String] the property name to set on this object containing
   *   the callback function handle so that the listener can be removed in
   *   the future.
   * @param (see on)
   * @return (see on)
   * @example Adding a named listener DATA_CALLBACK
   *   var listener = function() { doSomething(); };
   *   emitter.addNamedListener('DATA_CALLBACK', 'data', listener);
   *
   *   // the following prints: true
   *   console.log(emitter.DATA_CALLBACK == listener);
   */
  addNamedListener: function addNamedListener(name, eventName, callback) {
    this[name] = callback;
    this.addListener(eventName, callback);
    return this;
  },

  /**
   * @api private
   */
  addNamedAsyncListener: function addNamedAsyncListener(name, eventName, callback) {
    callback._isAsync = true;
    return this.addNamedListener(name, eventName, callback);
  },

  /**
   * Helper method to add a set of named listeners using
   * {addNamedListener}. The callback contains a parameter
   * with a handle to the `addNamedListener` method.
   *
   * @callback callback function(add)
   *   The callback function is called immediately in order to provide
   *   the `add` function to the block. This simplifies the addition of
   *   a large group of named listeners.
   *   @param add [Function] the {addNamedListener} function to call
   *     when registering listeners.
   * @example Adding a set of named listeners
   *   emitter.addNamedListeners(function(add) {
   *     add('DATA_CALLBACK', 'data', function() { ... });
   *     add('OTHER', 'otherEvent', function() { ... });
   *     add('LAST', 'lastEvent', function() { ... });
   *   });
   *
   *   // these properties are now set:
   *   emitter.DATA_CALLBACK;
   *   emitter.OTHER;
   *   emitter.LAST;
   */
  addNamedListeners: function addNamedListeners(callback) {
    var self = this;
    callback(
      function() {
        self.addNamedListener.apply(self, arguments);
      },
      function() {
        self.addNamedAsyncListener.apply(self, arguments);
      }
    );
    return this;
  }
});

/**
 * {on} is the prefered method.
 * @api private
 */
AWS.SequentialExecutor.prototype.addListener = AWS.SequentialExecutor.prototype.on;

module.exports = AWS.SequentialExecutor;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var inherit = AWS.util.inherit;

/**
 * @api private
 */
AWS.Signers.V3 = inherit(AWS.Signers.RequestSigner, {
  addAuthorization: function addAuthorization(credentials, date) {

    var datetime = AWS.util.date.rfc822(date);

    this.request.headers['X-Amz-Date'] = datetime;

    if (credentials.sessionToken) {
      this.request.headers['x-amz-security-token'] = credentials.sessionToken;
    }

    this.request.headers['X-Amzn-Authorization'] =
      this.authorization(credentials, datetime);

  },

  authorization: function authorization(credentials) {
    return 'AWS3 ' +
      'AWSAccessKeyId=' + credentials.accessKeyId + ',' +
      'Algorithm=HmacSHA256,' +
      'SignedHeaders=' + this.signedHeaders() + ',' +
      'Signature=' + this.signature(credentials);
  },

  signedHeaders: function signedHeaders() {
    var headers = [];
    AWS.util.arrayEach(this.headersToSign(), function iterator(h) {
      headers.push(h.toLowerCase());
    });
    return headers.sort().join(';');
  },

  canonicalHeaders: function canonicalHeaders() {
    var headers = this.request.headers;
    var parts = [];
    AWS.util.arrayEach(this.headersToSign(), function iterator(h) {
      parts.push(h.toLowerCase().trim() + ':' + String(headers[h]).trim());
    });
    return parts.sort().join('\n') + '\n';
  },

  headersToSign: function headersToSign() {
    var headers = [];
    AWS.util.each(this.request.headers, function iterator(k) {
      if (k === 'Host' || k === 'Content-Encoding' || k.match(/^X-Amz/i)) {
        headers.push(k);
      }
    });
    return headers;
  },

  signature: function signature(credentials) {
    return AWS.util.crypto.hmac(credentials.secretAccessKey, this.stringToSign(), 'base64');
  },

  stringToSign: function stringToSign() {
    var parts = [];
    parts.push(this.request.method);
    parts.push('/');
    parts.push('');
    parts.push(this.canonicalHeaders());
    parts.push(this.request.body);
    return AWS.util.crypto.sha256(parts.join('\n'));
  }

});

module.exports = AWS.Signers.V3;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 81 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(229);
exports.encode = exports.stringify = __webpack_require__(230);


/***/ }),
/* 83 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85)
__webpack_require__(242)
__webpack_require__(243)
__webpack_require__(244)
__webpack_require__(245)
__webpack_require__(246)



/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 * 
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 * 
 *     http://aws.amazon.com/asl/
 * 
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License. 
 */
!function(e,t){ true?module.exports=t(__webpack_require__(86),__webpack_require__(241)):"function"==typeof define&&define.amd?define(["aws-sdk/global","aws-sdk/clients/cognitoidentityserviceprovider"],t):"object"==typeof exports?exports.AmazonCognitoIdentity=t(require("aws-sdk/global"),require("aws-sdk/clients/cognitoidentityserviceprovider")):e.AmazonCognitoIdentity=t(e.AWSCognito,e.AWSCognito.CognitoIdentityServiceProvider)}(this,function(e,t){return function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return e[i].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function s(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var o=n(15);Object.keys(o).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})});var r=n(12),a=s(r),u=i(o);Object.keys(u).forEach(function(e){a.default[e]=u[e]}),"undefined"!=typeof window&&!window.crypto&&window.msCrypto&&(window.crypto=window.msCrypto)},function(t,n){t.exports=e},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=n(1),r=n(3),a=i(r),u="FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF",c="userAttributes.",l=function(){function e(t){s(this,e),this.N=new a.default(u,16),this.g=new a.default("2",16),this.k=new a.default(this.hexHash("00"+this.N.toString(16)+"0"+this.g.toString(16)),16),this.smallAValue=this.generateRandomSmallA(),this.largeAValue=this.calculateA(this.smallAValue),this.infoBits=new o.util.Buffer("Caldera Derived Key","utf8"),this.poolName=t}return e.prototype.getSmallAValue=function(){return this.smallAValue},e.prototype.getLargeAValue=function(){return this.largeAValue},e.prototype.generateRandomSmallA=function(){var e=o.util.crypto.lib.randomBytes(128).toString("hex"),t=new a.default(e,16),n=t.mod(this.N);return n},e.prototype.generateRandomString=function(){return o.util.crypto.lib.randomBytes(40).toString("base64")},e.prototype.getRandomPassword=function(){return this.randomPassword},e.prototype.getSaltDevices=function(){return this.SaltToHashDevices},e.prototype.getVerifierDevices=function(){return this.verifierDevices},e.prototype.generateHashDevice=function(e,t){this.randomPassword=this.generateRandomString();var n=""+e+t+":"+this.randomPassword,i=this.hash(n),s=o.util.crypto.lib.randomBytes(16).toString("hex");this.SaltToHashDevices=this.padHex(new a.default(s,16));var r=this.g.modPow(new a.default(this.hexHash(this.SaltToHashDevices+i),16),this.N);this.verifierDevices=this.padHex(r)},e.prototype.calculateA=function(e){var t=this.g.modPow(e,this.N);if(t.mod(this.N).equals(a.default.ZERO))throw new Error("Illegal paramater. A mod N cannot be 0.");return t},e.prototype.calculateU=function(e,t){this.UHexHash=this.hexHash(this.padHex(e)+this.padHex(t));var n=new a.default(this.UHexHash,16);return n},e.prototype.hash=function(e){var t=o.util.crypto.sha256(e,"hex");return new Array(64-t.length).join("0")+t},e.prototype.hexHash=function(e){return this.hash(new o.util.Buffer(e,"hex"))},e.prototype.computehkdf=function(e,t){var n=o.util.crypto.hmac(t,e,"buffer","sha256"),i=o.util.buffer.concat([this.infoBits,new o.util.Buffer(String.fromCharCode(1),"utf8")]),s=o.util.crypto.hmac(n,i,"buffer","sha256");return s.slice(0,16)},e.prototype.getPasswordAuthenticationKey=function(e,t,n,i){if(n.mod(this.N).equals(a.default.ZERO))throw new Error("B cannot be zero.");if(this.UValue=this.calculateU(this.largeAValue,n),this.UValue.equals(a.default.ZERO))throw new Error("U cannot be zero.");var s=""+this.poolName+e+":"+t,r=this.hash(s),u=new a.default(this.hexHash(this.padHex(i)+r),16),c=this.g.modPow(u,this.N),l=n.subtract(this.k.multiply(c)),h=l.modPow(this.smallAValue.add(this.UValue.multiply(u)),this.N).mod(this.N),f=this.computehkdf(new o.util.Buffer(this.padHex(h),"hex"),new o.util.Buffer(this.padHex(this.UValue.toString(16)),"hex"));return f},e.prototype.getNewPasswordRequiredChallengeUserAttributePrefix=function(){return c},e.prototype.padHex=function(e){var t=e.toString(16);return t.length%2===1?t="0"+t:"89ABCDEFabcdef".indexOf(t[0])!==-1&&(t="00"+t),t},e}();t.default=l},function(e,t){"use strict";function n(e,t){null!=e&&this.fromString(e,t)}function i(){return new n(null)}function s(e,t,n,i,s,o){for(;--o>=0;){var r=t*this[e++]+n[i]+s;s=Math.floor(r/67108864),n[i++]=67108863&r}return s}function o(e,t,n,i,s,o){for(var r=32767&t,a=t>>15;--o>=0;){var u=32767&this[e],c=this[e++]>>15,l=a*u+c*r;u=r*u+((32767&l)<<15)+n[i]+(1073741823&s),s=(u>>>30)+(l>>>15)+a*c+(s>>>30),n[i++]=1073741823&u}return s}function r(e,t,n,i,s,o){for(var r=16383&t,a=t>>14;--o>=0;){var u=16383&this[e],c=this[e++]>>14,l=a*u+c*r;u=r*u+((16383&l)<<14)+n[i]+s,s=(u>>28)+(l>>14)+a*c,n[i++]=268435455&u}return s}function a(e){return z.charAt(e)}function u(e,t){var n=Q[e.charCodeAt(t)];return null==n?-1:n}function c(e){for(var t=this.t-1;t>=0;--t)e[t]=this[t];e.t=this.t,e.s=this.s}function l(e){this.t=1,this.s=e<0?-1:0,e>0?this[0]=e:e<-1?this[0]=e+this.DV:this.t=0}function h(e){var t=i();return t.fromInt(e),t}function f(e,t){var i;if(16==t)i=4;else if(8==t)i=3;else if(2==t)i=1;else if(32==t)i=5;else{if(4!=t)throw new Error("Only radix 2, 4, 8, 16, 32 are supported");i=2}this.t=0,this.s=0;for(var s=e.length,o=!1,r=0;--s>=0;){var a=u(e,s);a<0?"-"==e.charAt(s)&&(o=!0):(o=!1,0==r?this[this.t++]=a:r+i>this.DB?(this[this.t-1]|=(a&(1<<this.DB-r)-1)<<r,this[this.t++]=a>>this.DB-r):this[this.t-1]|=a<<r,r+=i,r>=this.DB&&(r-=this.DB))}this.clamp(),o&&n.ZERO.subTo(this,this)}function d(){for(var e=this.s&this.DM;this.t>0&&this[this.t-1]==e;)--this.t}function p(e){if(this.s<0)return"-"+this.negate().toString();var t;if(16==e)t=4;else if(8==e)t=3;else if(2==e)t=1;else if(32==e)t=5;else{if(4!=e)throw new Error("Only radix 2, 4, 8, 16, 32 are supported");t=2}var n,i=(1<<t)-1,s=!1,o="",r=this.t,u=this.DB-r*this.DB%t;if(r-- >0)for(u<this.DB&&(n=this[r]>>u)>0&&(s=!0,o=a(n));r>=0;)u<t?(n=(this[r]&(1<<u)-1)<<t-u,n|=this[--r]>>(u+=this.DB-t)):(n=this[r]>>(u-=t)&i,u<=0&&(u+=this.DB,--r)),n>0&&(s=!0),s&&(o+=a(n));return s?o:"0"}function g(){var e=i();return n.ZERO.subTo(this,e),e}function v(){return this.s<0?this.negate():this}function m(e){var t=this.s-e.s;if(0!=t)return t;var n=this.t;if(t=n-e.t,0!=t)return this.s<0?-t:t;for(;--n>=0;)if(0!=(t=this[n]-e[n]))return t;return 0}function S(e){var t,n=1;return 0!=(t=e>>>16)&&(e=t,n+=16),0!=(t=e>>8)&&(e=t,n+=8),0!=(t=e>>4)&&(e=t,n+=4),0!=(t=e>>2)&&(e=t,n+=2),0!=(t=e>>1)&&(e=t,n+=1),n}function y(){return this.t<=0?0:this.DB*(this.t-1)+S(this[this.t-1]^this.s&this.DM)}function C(e,t){var n;for(n=this.t-1;n>=0;--n)t[n+e]=this[n];for(n=e-1;n>=0;--n)t[n]=0;t.t=this.t+e,t.s=this.s}function w(e,t){for(var n=e;n<this.t;++n)t[n-e]=this[n];t.t=Math.max(this.t-e,0),t.s=this.s}function A(e,t){var n,i=e%this.DB,s=this.DB-i,o=(1<<s)-1,r=Math.floor(e/this.DB),a=this.s<<i&this.DM;for(n=this.t-1;n>=0;--n)t[n+r+1]=this[n]>>s|a,a=(this[n]&o)<<i;for(n=r-1;n>=0;--n)t[n]=0;t[r]=a,t.t=this.t+r+1,t.s=this.s,t.clamp()}function T(e,t){t.s=this.s;var n=Math.floor(e/this.DB);if(n>=this.t)return void(t.t=0);var i=e%this.DB,s=this.DB-i,o=(1<<i)-1;t[0]=this[n]>>i;for(var r=n+1;r<this.t;++r)t[r-n-1]|=(this[r]&o)<<s,t[r-n]=this[r]>>i;i>0&&(t[this.t-n-1]|=(this.s&o)<<s),t.t=this.t-n,t.clamp()}function U(e,t){for(var n=0,i=0,s=Math.min(e.t,this.t);n<s;)i+=this[n]-e[n],t[n++]=i&this.DM,i>>=this.DB;if(e.t<this.t){for(i-=e.s;n<this.t;)i+=this[n],t[n++]=i&this.DM,i>>=this.DB;i+=this.s}else{for(i+=this.s;n<e.t;)i-=e[n],t[n++]=i&this.DM,i>>=this.DB;i-=e.s}t.s=i<0?-1:0,i<-1?t[n++]=this.DV+i:i>0&&(t[n++]=i),t.t=n,t.clamp()}function E(e,t){var i=this.abs(),s=e.abs(),o=i.t;for(t.t=o+s.t;--o>=0;)t[o]=0;for(o=0;o<s.t;++o)t[o+i.t]=i.am(0,s[o],t,o,0,i.t);t.s=0,t.clamp(),this.s!=e.s&&n.ZERO.subTo(t,t)}function I(e){for(var t=this.abs(),n=e.t=2*t.t;--n>=0;)e[n]=0;for(n=0;n<t.t-1;++n){var i=t.am(n,t[n],e,2*n,0,1);(e[n+t.t]+=t.am(n+1,2*t[n],e,2*n+1,i,t.t-n-1))>=t.DV&&(e[n+t.t]-=t.DV,e[n+t.t+1]=1)}e.t>0&&(e[e.t-1]+=t.am(n,t[n],e,2*n,0,1)),e.s=0,e.clamp()}function D(e,t,s){var o=e.abs();if(!(o.t<=0)){var r=this.abs();if(r.t<o.t)return null!=t&&t.fromInt(0),void(null!=s&&this.copyTo(s));null==s&&(s=i());var a=i(),u=this.s,c=e.s,l=this.DB-S(o[o.t-1]);l>0?(o.lShiftTo(l,a),r.lShiftTo(l,s)):(o.copyTo(a),r.copyTo(s));var h=a.t,f=a[h-1];if(0!=f){var d=f*(1<<this.F1)+(h>1?a[h-2]>>this.F2:0),p=this.FV/d,g=(1<<this.F1)/d,v=1<<this.F2,m=s.t,y=m-h,C=null==t?i():t;for(a.dlShiftTo(y,C),s.compareTo(C)>=0&&(s[s.t++]=1,s.subTo(C,s)),n.ONE.dlShiftTo(h,C),C.subTo(a,a);a.t<h;)a[a.t++]=0;for(;--y>=0;){var w=s[--m]==f?this.DM:Math.floor(s[m]*p+(s[m-1]+v)*g);if((s[m]+=a.am(0,w,s,y,0,h))<w)for(a.dlShiftTo(y,C),s.subTo(C,s);s[m]<--w;)s.subTo(C,s)}null!=t&&(s.drShiftTo(h,t),u!=c&&n.ZERO.subTo(t,t)),s.t=h,s.clamp(),l>0&&s.rShiftTo(l,s),u<0&&n.ZERO.subTo(s,s)}}}function k(e){var t=i();return this.abs().divRemTo(e,null,t),this.s<0&&t.compareTo(n.ZERO)>0&&e.subTo(t,t),t}function R(){if(this.t<1)return 0;var e=this[0];if(0==(1&e))return 0;var t=3&e;return t=t*(2-(15&e)*t)&15,t=t*(2-(255&e)*t)&255,t=t*(2-((65535&e)*t&65535))&65535,t=t*(2-e*t%this.DV)%this.DV,t>0?this.DV-t:-t}function F(e){return 0==this.compareTo(e)}function P(e,t){for(var n=0,i=0,s=Math.min(e.t,this.t);n<s;)i+=this[n]+e[n],t[n++]=i&this.DM,i>>=this.DB;if(e.t<this.t){for(i+=e.s;n<this.t;)i+=this[n],t[n++]=i&this.DM,i>>=this.DB;i+=this.s}else{for(i+=this.s;n<e.t;)i+=e[n],t[n++]=i&this.DM,i>>=this.DB;i+=e.s}t.s=i<0?-1:0,i>0?t[n++]=i:i<-1&&(t[n++]=this.DV+i),t.t=n,t.clamp()}function b(e){var t=i();return this.addTo(e,t),t}function _(e){var t=i();return this.subTo(e,t),t}function B(e){var t=i();return this.multiplyTo(e,t),t}function N(e){var t=i();return this.divRemTo(e,t,null),t}function M(e){this.m=e,this.mp=e.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<e.DB-15)-1,this.mt2=2*e.t}function V(e){var t=i();return e.abs().dlShiftTo(this.m.t,t),t.divRemTo(this.m,null,t),e.s<0&&t.compareTo(n.ZERO)>0&&this.m.subTo(t,t),t}function K(e){var t=i();return e.copyTo(t),this.reduce(t),t}function O(e){for(;e.t<=this.mt2;)e[e.t++]=0;for(var t=0;t<this.m.t;++t){var n=32767&e[t],i=n*this.mpl+((n*this.mph+(e[t]>>15)*this.mpl&this.um)<<15)&e.DM;for(n=t+this.m.t,e[n]+=this.m.am(0,i,e,t,0,this.m.t);e[n]>=e.DV;)e[n]-=e.DV,e[++n]++}e.clamp(),e.drShiftTo(this.m.t,e),e.compareTo(this.m)>=0&&e.subTo(this.m,e)}function q(e,t){e.squareTo(t),this.reduce(t)}function x(e,t,n){e.multiplyTo(t,n),this.reduce(n)}function H(e,t){var n,s=e.bitLength(),o=h(1),r=new M(t);if(s<=0)return o;n=s<18?1:s<48?3:s<144?4:s<768?5:6;var a=new Array,u=3,c=n-1,l=(1<<n)-1;if(a[1]=r.convert(this),n>1){var f=i();for(r.sqrTo(a[1],f);u<=l;)a[u]=i(),r.mulTo(f,a[u-2],a[u]),u+=2}var d,p,g=e.t-1,v=!0,m=i();for(s=S(e[g])-1;g>=0;){for(s>=c?d=e[g]>>s-c&l:(d=(e[g]&(1<<s+1)-1)<<c-s,g>0&&(d|=e[g-1]>>this.DB+s-c)),u=n;0==(1&d);)d>>=1,--u;if((s-=u)<0&&(s+=this.DB,--g),v)a[d].copyTo(o),v=!1;else{for(;u>1;)r.sqrTo(o,m),r.sqrTo(m,o),u-=2;u>0?r.sqrTo(o,m):(p=o,o=m,m=p),r.mulTo(m,a[d],o)}for(;g>=0&&0==(e[g]&1<<s);)r.sqrTo(o,m),p=o,o=m,m=p,--s<0&&(s=this.DB-1,--g)}return r.revert(o)}t.__esModule=!0,t.default=n;var L,J=0xdeadbeefcafe,j=15715070==(16777215&J),G="undefined"!=typeof navigator;G&&j&&"Microsoft Internet Explorer"==navigator.appName?(n.prototype.am=o,L=30):G&&j&&"Netscape"!=navigator.appName?(n.prototype.am=s,L=26):(n.prototype.am=r,L=28),n.prototype.DB=L,n.prototype.DM=(1<<L)-1,n.prototype.DV=1<<L;var W=52;n.prototype.FV=Math.pow(2,W),n.prototype.F1=W-L,n.prototype.F2=2*L-W;var Z,Y,z="0123456789abcdefghijklmnopqrstuvwxyz",Q=new Array;for(Z="0".charCodeAt(0),Y=0;Y<=9;++Y)Q[Z++]=Y;for(Z="a".charCodeAt(0),Y=10;Y<36;++Y)Q[Z++]=Y;for(Z="A".charCodeAt(0),Y=10;Y<36;++Y)Q[Z++]=Y;M.prototype.convert=V,M.prototype.revert=K,M.prototype.reduce=O,M.prototype.mulTo=x,M.prototype.sqrTo=q,n.prototype.copyTo=c,n.prototype.fromInt=l,n.prototype.fromString=f,n.prototype.clamp=d,n.prototype.dlShiftTo=C,n.prototype.drShiftTo=w,n.prototype.lShiftTo=A,n.prototype.rShiftTo=T,n.prototype.subTo=U,n.prototype.multiplyTo=E,n.prototype.squareTo=I,n.prototype.divRemTo=D,n.prototype.invDigit=R,n.prototype.addTo=P,n.prototype.toString=p,n.prototype.negate=g,n.prototype.abs=v,n.prototype.compareTo=m,n.prototype.bitLength=y,n.prototype.mod=k,n.prototype.equals=F,n.prototype.add=b,n.prototype.subtract=_,n.prototype.multiply=B,n.prototype.divide=N,n.prototype.modPow=H,n.ZERO=h(0),n.ONE=h(1)},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var s=n(1),o=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.AccessToken;i(this,e),this.jwtToken=n||""}return e.prototype.getJwtToken=function(){return this.jwtToken},e.prototype.getExpiration=function(){var e=this.jwtToken.split(".")[1],t=JSON.parse(s.util.base64.decode(e).toString("utf8"));return t.exp},e}();t.default=o},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var s=n(1),o=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.IdToken;i(this,e),this.jwtToken=n||""}return e.prototype.getJwtToken=function(){return this.jwtToken},e.prototype.getExpiration=function(){var e=this.jwtToken.split(".")[1],t=JSON.parse(s.util.base64.decode(e).toString("utf8"));return t.exp},e}();t.default=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;/*!
	 * Copyright 2016 Amazon.com,
	 * Inc. or its affiliates. All Rights Reserved.
	 *
	 * Licensed under the Amazon Software License (the "License").
	 * You may not use this file except in compliance with the
	 * License. A copy of the License is located at
	 *
	 *     http://aws.amazon.com/asl/
	 *
	 * or in the "license" file accompanying this file. This file is
	 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
	 * CONDITIONS OF ANY KIND, express or implied. See the License
	 * for the specific language governing permissions and
	 * limitations under the License.
	 */
var i=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.RefreshToken;n(this,e),this.token=i||""}return e.prototype.getToken=function(){return this.token},e}();t.default=i},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=n(1),r=n(3),a=i(r),u=n(2),c=i(u),l=n(4),h=i(l),f=n(5),d=i(f),p=n(6),g=i(p),v=n(9),m=i(v),S=n(10),y=i(S),C=n(8),w=i(C),A=n(11),T=i(A),U=function(){function e(t){if(s(this,e),null==t||null==t.Username||null==t.Pool)throw new Error("Username and pool information are required.");this.username=t.Username||"",this.pool=t.Pool,this.Session=null,this.client=t.Pool.client,this.signInUserSession=null,this.authenticationFlowType="USER_SRP_AUTH",this.storage=t.Storage||(new T.default).getStorage()}return e.prototype.getSignInUserSession=function(){return this.signInUserSession},e.prototype.getUsername=function(){return this.username},e.prototype.getAuthenticationFlowType=function(){return this.authenticationFlowType},e.prototype.setAuthenticationFlowType=function(e){this.authenticationFlowType=e},e.prototype.authenticateUser=function(e,t){var n=this,i=new c.default(this.pool.getUserPoolId().split("_")[1]),s=new y.default,r=void 0,u=void 0,l={};null!=this.deviceKey&&(l.DEVICE_KEY=this.deviceKey),l.USERNAME=this.username,l.SRP_A=i.getLargeAValue().toString(16),"CUSTOM_AUTH"===this.authenticationFlowType&&(l.CHALLENGE_NAME="SRP_A"),this.client.makeUnauthenticatedRequest("initiateAuth",{AuthFlow:this.authenticationFlowType,ClientId:this.pool.getClientId(),AuthParameters:l,ClientMetadata:e.getValidationData()},function(c,l){if(c)return t.onFailure(c);var h=l.ChallengeParameters;n.username=h.USER_ID_FOR_SRP,r=new a.default(h.SRP_B,16),u=new a.default(h.SALT,16),n.getCachedDeviceKeyAndPassword();var f=i.getPasswordAuthenticationKey(n.username,e.getPassword(),r,u),d=s.getNowString(),p=o.util.crypto.hmac(f,o.util.buffer.concat([new o.util.Buffer(n.pool.getUserPoolId().split("_")[1],"utf8"),new o.util.Buffer(n.username,"utf8"),new o.util.Buffer(h.SECRET_BLOCK,"base64"),new o.util.Buffer(d,"utf8")]),"base64","sha256"),g={};g.USERNAME=n.username,g.PASSWORD_CLAIM_SECRET_BLOCK=h.SECRET_BLOCK,g.TIMESTAMP=d,g.PASSWORD_CLAIM_SIGNATURE=p,null!=n.deviceKey&&(g.DEVICE_KEY=n.deviceKey);var v=function e(t,i){return n.client.makeUnauthenticatedRequest("respondToAuthChallenge",t,function(s,o){return s&&"ResourceNotFoundException"===s.code&&s.message.toLowerCase().indexOf("device")!==-1?(g.DEVICE_KEY=null,n.deviceKey=null,n.randomPassword=null,n.deviceGroupKey=null,n.clearCachedDeviceKeyAndPassword(),e(t,i)):i(s,o)})};v({ChallengeName:"PASSWORD_VERIFIER",ClientId:n.pool.getClientId(),ChallengeResponses:g,Session:l.Session},function(e,s){if(e)return t.onFailure(e);var o=s.ChallengeName;if("NEW_PASSWORD_REQUIRED"===o){n.Session=s.Session;var r=null,a=null,u=[],c=i.getNewPasswordRequiredChallengeUserAttributePrefix();if(s.ChallengeParameters&&(r=JSON.parse(s.ChallengeParameters.userAttributes),a=JSON.parse(s.ChallengeParameters.requiredAttributes)),a)for(var l=0;l<a.length;l++)u[l]=a[l].substr(c.length);return t.newPasswordRequired(r,u)}return n.authenticateUserInternal(s,i,t)})})},e.prototype.authenticateUserInternal=function(e,t,n){var i=this,s=e.ChallengeName,r=e.ChallengeParameters;if("SMS_MFA"===s)return this.Session=e.Session,n.mfaRequired(s,r);if("CUSTOM_CHALLENGE"===s)return this.Session=e.Session,n.customChallenge(r);if("DEVICE_SRP_AUTH"===s)return void this.getDeviceResponse(n);this.signInUserSession=this.getCognitoUserSession(e.AuthenticationResult),this.cacheTokens();var a=e.AuthenticationResult.NewDeviceMetadata;if(null==a)return n.onSuccess(this.signInUserSession);t.generateHashDevice(e.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,e.AuthenticationResult.NewDeviceMetadata.DeviceKey);var u={Salt:new o.util.Buffer(t.getSaltDevices(),"hex").toString("base64"),PasswordVerifier:new o.util.Buffer(t.getVerifierDevices(),"hex").toString("base64")};this.verifierDevices=u.PasswordVerifier,this.deviceGroupKey=a.DeviceGroupKey,this.randomPassword=t.getRandomPassword(),this.client.makeUnauthenticatedRequest("confirmDevice",{DeviceKey:a.DeviceKey,AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),DeviceSecretVerifierConfig:u,DeviceName:navigator.userAgent},function(t,s){return t?n.onFailure(t):(i.deviceKey=e.AuthenticationResult.NewDeviceMetadata.DeviceKey,i.cacheDeviceKeyAndPassword(),s.UserConfirmationNecessary===!0?n.onSuccess(i.signInUserSession,s.UserConfirmationNecessary):n.onSuccess(i.signInUserSession))})},e.prototype.completeNewPasswordChallenge=function(e,t,n){var i=this;if(!e)return n.onFailure(new Error("New password is required."));var s=new c.default(this.pool.getUserPoolId().split("_")[1]),o=s.getNewPasswordRequiredChallengeUserAttributePrefix(),r={};t&&Object.keys(t).forEach(function(e){r[o+e]=t[e]}),r.NEW_PASSWORD=e,r.USERNAME=this.username,this.client.makeUnauthenticatedRequest("respondToAuthChallenge",{ChallengeName:"NEW_PASSWORD_REQUIRED",ClientId:this.pool.getClientId(),ChallengeResponses:r,Session:this.Session},function(e,t){return e?n.onFailure(e):i.authenticateUserInternal(t,s,n)})},e.prototype.getDeviceResponse=function(e){var t=this,n=new c.default(this.deviceGroupKey),i=new y.default,s={};s.USERNAME=this.username,s.DEVICE_KEY=this.deviceKey,s.SRP_A=n.getLargeAValue().toString(16),this.client.makeUnauthenticatedRequest("respondToAuthChallenge",{ChallengeName:"DEVICE_SRP_AUTH",ClientId:this.pool.getClientId(),ChallengeResponses:s},function(s,r){if(s)return e.onFailure(s);var u=r.ChallengeParameters,c=new a.default(u.SRP_B,16),l=new a.default(u.SALT,16),h=n.getPasswordAuthenticationKey(t.deviceKey,t.randomPassword,c,l),f=i.getNowString(),d=o.util.crypto.hmac(h,o.util.buffer.concat([new o.util.Buffer(t.deviceGroupKey,"utf8"),new o.util.Buffer(t.deviceKey,"utf8"),new o.util.Buffer(u.SECRET_BLOCK,"base64"),new o.util.Buffer(f,"utf8")]),"base64","sha256"),p={};p.USERNAME=t.username,p.PASSWORD_CLAIM_SECRET_BLOCK=u.SECRET_BLOCK,p.TIMESTAMP=f,p.PASSWORD_CLAIM_SIGNATURE=d,p.DEVICE_KEY=t.deviceKey,t.client.makeUnauthenticatedRequest("respondToAuthChallenge",{ChallengeName:"DEVICE_PASSWORD_VERIFIER",ClientId:t.pool.getClientId(),ChallengeResponses:p,Session:r.Session},function(n,i){return n?e.onFailure(n):(t.signInUserSession=t.getCognitoUserSession(i.AuthenticationResult),t.cacheTokens(),e.onSuccess(t.signInUserSession))})})},e.prototype.confirmRegistration=function(e,t,n){this.client.makeUnauthenticatedRequest("confirmSignUp",{ClientId:this.pool.getClientId(),ConfirmationCode:e,Username:this.username,ForceAliasCreation:t},function(e){return e?n(e,null):n(null,"SUCCESS")})},e.prototype.sendCustomChallengeAnswer=function(e,t){var n=this,i={};i.USERNAME=this.username,i.ANSWER=e,this.client.makeUnauthenticatedRequest("respondToAuthChallenge",{ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:i,ClientId:this.pool.getClientId(),Session:this.Session},function(e,i){if(e)return t.onFailure(e);var s=i.ChallengeName;return"CUSTOM_CHALLENGE"===s?(n.Session=i.Session,t.customChallenge(i.ChallengeParameters)):(n.signInUserSession=n.getCognitoUserSession(i.AuthenticationResult),n.cacheTokens(),t.onSuccess(n.signInUserSession))})},e.prototype.sendMFACode=function(e,t){var n=this,i={};i.USERNAME=this.username,i.SMS_MFA_CODE=e,null!=this.deviceKey&&(i.DEVICE_KEY=this.deviceKey),this.client.makeUnauthenticatedRequest("respondToAuthChallenge",{ChallengeName:"SMS_MFA",ChallengeResponses:i,ClientId:this.pool.getClientId(),Session:this.Session},function(e,i){if(e)return t.onFailure(e);var s=i.ChallengeName;if("DEVICE_SRP_AUTH"===s)return void n.getDeviceResponse(t);if(n.signInUserSession=n.getCognitoUserSession(i.AuthenticationResult),n.cacheTokens(),null==i.AuthenticationResult.NewDeviceMetadata)return t.onSuccess(n.signInUserSession);var r=new c.default(n.pool.getUserPoolId().split("_")[1]);r.generateHashDevice(i.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,i.AuthenticationResult.NewDeviceMetadata.DeviceKey);var a={Salt:new o.util.Buffer(r.getSaltDevices(),"hex").toString("base64"),PasswordVerifier:new o.util.Buffer(r.getVerifierDevices(),"hex").toString("base64")};n.verifierDevices=a.PasswordVerifier,n.deviceGroupKey=i.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey,n.randomPassword=r.getRandomPassword(),n.client.makeUnauthenticatedRequest("confirmDevice",{DeviceKey:i.AuthenticationResult.NewDeviceMetadata.DeviceKey,AccessToken:n.signInUserSession.getAccessToken().getJwtToken(),DeviceSecretVerifierConfig:a,DeviceName:navigator.userAgent},function(e,s){return e?t.onFailure(e):(n.deviceKey=i.AuthenticationResult.NewDeviceMetadata.DeviceKey,n.cacheDeviceKeyAndPassword(),s.UserConfirmationNecessary===!0?t.onSuccess(n.signInUserSession,s.UserConfirmationNecessary):t.onSuccess(n.signInUserSession))})})},e.prototype.changePassword=function(e,t,n){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("changePassword",{PreviousPassword:e,ProposedPassword:t,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(e){return e?n(e,null):n(null,"SUCCESS")}):n(new Error("User is not authenticated"),null)},e.prototype.enableMFA=function(e){if(null==this.signInUserSession||!this.signInUserSession.isValid())return e(new Error("User is not authenticated"),null);var t=[],n={DeliveryMedium:"SMS",AttributeName:"phone_number"};t.push(n),this.client.makeUnauthenticatedRequest("setUserSettings",{MFAOptions:t,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(t){return t?e(t,null):e(null,"SUCCESS")})},e.prototype.disableMFA=function(e){if(null==this.signInUserSession||!this.signInUserSession.isValid())return e(new Error("User is not authenticated"),null);var t=[];this.client.makeUnauthenticatedRequest("setUserSettings",{MFAOptions:t,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(t){return t?e(t,null):e(null,"SUCCESS")})},e.prototype.deleteUser=function(e){var t=this;return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("deleteUser",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(n){return n?e(n,null):(t.clearCachedTokens(),e(null,"SUCCESS"))}):e(new Error("User is not authenticated"),null)},e.prototype.updateAttributes=function(e,t){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("updateUserAttributes",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),UserAttributes:e},function(e){return e?t(e,null):t(null,"SUCCESS")}):t(new Error("User is not authenticated"),null)},e.prototype.getUserAttributes=function(e){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("getUser",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(t,n){if(t)return e(t,null);for(var i=[],s=0;s<n.UserAttributes.length;s++){var o={Name:n.UserAttributes[s].Name,Value:n.UserAttributes[s].Value},r=new w.default(o);i.push(r)}return e(null,i)}):e(new Error("User is not authenticated"),null)},e.prototype.getMFAOptions=function(e){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("getUser",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(t,n){return t?e(t,null):e(null,n.MFAOptions)}):e(new Error("User is not authenticated"),null)},e.prototype.deleteAttributes=function(e,t){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("deleteUserAttributes",{UserAttributeNames:e,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(e){return e?t(e,null):t(null,"SUCCESS")}):t(new Error("User is not authenticated"),null)},e.prototype.resendConfirmationCode=function(e){this.client.makeUnauthenticatedRequest("resendConfirmationCode",{ClientId:this.pool.getClientId(),Username:this.username},function(t,n){return t?e(t,null):e(null,n)})},e.prototype.getSession=function(e){if(null==this.username)return e(new Error("Username is null. Cannot retrieve a new session"),null);if(null!=this.signInUserSession&&this.signInUserSession.isValid())return e(null,this.signInUserSession);var t="CognitoIdentityServiceProvider."+this.pool.getClientId()+"."+this.username,n=t+".idToken",i=t+".accessToken",s=t+".refreshToken";if(this.storage.getItem(n)){var o=new d.default({IdToken:this.storage.getItem(n)}),r=new h.default({AccessToken:this.storage.getItem(i)}),a=new g.default({RefreshToken:this.storage.getItem(s)}),u={IdToken:o,AccessToken:r,RefreshToken:a},c=new m.default(u);if(c.isValid())return this.signInUserSession=c,e(null,this.signInUserSession);if(null==a.getToken())return e(new Error("Cannot retrieve a new session. Please authenticate."),null);this.refreshSession(a,e)}else e(new Error("Local storage is missing an ID Token, Please authenticate"),null)},e.prototype.refreshSession=function(e,t){var n=this,i={};i.REFRESH_TOKEN=e.getToken();var s="CognitoIdentityServiceProvider."+this.pool.getClientId(),o=s+".LastAuthUser";if(this.storage.getItem(o)){this.username=this.storage.getItem(o);var r=s+"."+this.username+".deviceKey";this.deviceKey=this.storage.getItem(r),i.DEVICE_KEY=this.deviceKey}this.client.makeUnauthenticatedRequest("initiateAuth",{ClientId:this.pool.getClientId(),AuthFlow:"REFRESH_TOKEN_AUTH",AuthParameters:i},function(i,s){if(i)return"NotAuthorizedException"===i.code&&n.clearCachedTokens(),t(i,null);if(s){var o=s.AuthenticationResult;return Object.prototype.hasOwnProperty.call(o,"RefreshToken")||(o.RefreshToken=e.getToken()),n.signInUserSession=n.getCognitoUserSession(o),n.cacheTokens(),t(null,n.signInUserSession)}})},e.prototype.cacheTokens=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId(),t=e+"."+this.username+".idToken",n=e+"."+this.username+".accessToken",i=e+"."+this.username+".refreshToken",s=e+".LastAuthUser";this.storage.setItem(t,this.signInUserSession.getIdToken().getJwtToken()),this.storage.setItem(n,this.signInUserSession.getAccessToken().getJwtToken()),this.storage.setItem(i,this.signInUserSession.getRefreshToken().getToken()),this.storage.setItem(s,this.username)},e.prototype.cacheDeviceKeyAndPassword=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId()+"."+this.username,t=e+".deviceKey",n=e+".randomPasswordKey",i=e+".deviceGroupKey";this.storage.setItem(t,this.deviceKey),this.storage.setItem(n,this.randomPassword),this.storage.setItem(i,this.deviceGroupKey)},e.prototype.getCachedDeviceKeyAndPassword=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId()+"."+this.username,t=e+".deviceKey",n=e+".randomPasswordKey",i=e+".deviceGroupKey";this.storage.getItem(t)&&(this.deviceKey=this.storage.getItem(t),this.randomPassword=this.storage.getItem(n),this.deviceGroupKey=this.storage.getItem(i))},e.prototype.clearCachedDeviceKeyAndPassword=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId()+"."+this.username,t=e+".deviceKey",n=e+".randomPasswordKey",i=e+".deviceGroupKey";this.storage.removeItem(t),this.storage.removeItem(n),this.storage.removeItem(i)},e.prototype.clearCachedTokens=function(){var e="CognitoIdentityServiceProvider."+this.pool.getClientId(),t=e+"."+this.username+".idToken",n=e+"."+this.username+".accessToken",i=e+"."+this.username+".refreshToken",s=e+".LastAuthUser";this.storage.removeItem(t),this.storage.removeItem(n),this.storage.removeItem(i),this.storage.removeItem(s)},e.prototype.getCognitoUserSession=function(e){var t=new d.default(e),n=new h.default(e),i=new g.default(e),s={IdToken:t,AccessToken:n,RefreshToken:i};return new m.default(s)},e.prototype.forgotPassword=function(e){this.client.makeUnauthenticatedRequest("forgotPassword",{ClientId:this.pool.getClientId(),Username:this.username},function(t,n){return t?e.onFailure(t):"function"==typeof e.inputVerificationCode?e.inputVerificationCode(n):e.onSuccess()})},e.prototype.confirmPassword=function(e,t,n){this.client.makeUnauthenticatedRequest("confirmForgotPassword",{ClientId:this.pool.getClientId(),Username:this.username,ConfirmationCode:e,Password:t},function(e){return e?n.onFailure(e):n.onSuccess()})},e.prototype.getAttributeVerificationCode=function(e,t){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("getUserAttributeVerificationCode",{AttributeName:e,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(e,n){return e?t.onFailure(e):"function"==typeof t.inputVerificationCode?t.inputVerificationCode(n):t.onSuccess()}):t.onFailure(new Error("User is not authenticated"))},e.prototype.verifyAttribute=function(e,t,n){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("verifyUserAttribute",{AttributeName:e,Code:t,AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(e){return e?n.onFailure(e):n.onSuccess("SUCCESS")}):n.onFailure(new Error("User is not authenticated"))},e.prototype.getDevice=function(e){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("getDevice",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),DeviceKey:this.deviceKey},function(t,n){return t?e.onFailure(t):e.onSuccess(n)}):e.onFailure(new Error("User is not authenticated"))},e.prototype.forgetSpecificDevice=function(e,t){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("forgetDevice",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),DeviceKey:e},function(e){return e?t.onFailure(e):t.onSuccess("SUCCESS")}):t.onFailure(new Error("User is not authenticated"))},e.prototype.forgetDevice=function(e){var t=this;this.forgetSpecificDevice(this.deviceKey,{onFailure:e.onFailure,onSuccess:function(n){return t.deviceKey=null,t.deviceGroupKey=null,t.randomPassword=null,t.clearCachedDeviceKeyAndPassword(),e.onSuccess(n)}})},e.prototype.setDeviceStatusRemembered=function(e){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("updateDeviceStatus",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),DeviceKey:this.deviceKey,DeviceRememberedStatus:"remembered"},function(t){return t?e.onFailure(t):e.onSuccess("SUCCESS")}):e.onFailure(new Error("User is not authenticated"))},e.prototype.setDeviceStatusNotRemembered=function(e){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("updateDeviceStatus",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),DeviceKey:this.deviceKey,DeviceRememberedStatus:"not_remembered"},function(t){return t?e.onFailure(t):e.onSuccess("SUCCESS")}):e.onFailure(new Error("User is not authenticated"))},e.prototype.listDevices=function(e,t,n){return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("listDevices",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken(),Limit:e,PaginationToken:t},function(e,t){return e?n.onFailure(e):n.onSuccess(t)}):n.onFailure(new Error("User is not authenticated"))},e.prototype.globalSignOut=function(e){var t=this;return null!=this.signInUserSession&&this.signInUserSession.isValid()?void this.client.makeUnauthenticatedRequest("globalSignOut",{AccessToken:this.signInUserSession.getAccessToken().getJwtToken()},function(n){return n?e.onFailure(n):(t.clearCachedTokens(),e.onSuccess("SUCCESS"))}):e.onFailure(new Error("User is not authenticated"))},e.prototype.signOut=function(){this.signInUserSession=null,this.clearCachedTokens()},e}();t.default=U},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;/*!
	 * Copyright 2016 Amazon.com,
	 * Inc. or its affiliates. All Rights Reserved.
	 *
	 * Licensed under the Amazon Software License (the "License").
	 * You may not use this file except in compliance with the
	 * License. A copy of the License is located at
	 *
	 *     http://aws.amazon.com/asl/
	 *
	 * or in the "license" file accompanying this file. This file is
	 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
	 * CONDITIONS OF ANY KIND, express or implied. See the License
	 * for the specific language governing permissions and
	 * limitations under the License.
	 */
var i=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.Name,s=t.Value;n(this,e),this.Name=i||"",this.Value=s||""}return e.prototype.getValue=function(){return this.Value},e.prototype.setValue=function(e){return this.Value=e,this},e.prototype.getName=function(){return this.Name},e.prototype.setName=function(e){return this.Name=e,this},e.prototype.toString=function(){return JSON.stringify(this)},e.prototype.toJSON=function(){return{Name:this.Name,Value:this.Value}},e}();t.default=i},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;/*!
	 * Copyright 2016 Amazon.com,
	 * Inc. or its affiliates. All Rights Reserved.
	 *
	 * Licensed under the Amazon Software License (the "License").
	 * You may not use this file except in compliance with the
	 * License. A copy of the License is located at
	 *
	 *     http://aws.amazon.com/asl/
	 *
	 * or in the "license" file accompanying this file. This file is
	 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
	 * CONDITIONS OF ANY KIND, express or implied. See the License
	 * for the specific language governing permissions and
	 * limitations under the License.
	 */
var i=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.IdToken,s=t.RefreshToken,o=t.AccessToken;if(n(this,e),null==o||null==i)throw new Error("Id token and Access Token must be present.");this.idToken=i,this.refreshToken=s,this.accessToken=o}return e.prototype.getIdToken=function(){return this.idToken},e.prototype.getRefreshToken=function(){return this.refreshToken},e.prototype.getAccessToken=function(){return this.accessToken},e.prototype.isValid=function(){var e=Math.floor(new Date/1e3);return e<this.accessToken.getExpiration()&&e<this.idToken.getExpiration()},e}();t.default=i},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;/*!
	 * Copyright 2016 Amazon.com,
	 * Inc. or its affiliates. All Rights Reserved.
	 *
	 * Licensed under the Amazon Software License (the "License").
	 * You may not use this file except in compliance with the
	 * License. A copy of the License is located at
	 *
	 *     http://aws.amazon.com/asl/
	 *
	 * or in the "license" file accompanying this file. This file is
	 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
	 * CONDITIONS OF ANY KIND, express or implied. See the License
	 * for the specific language governing permissions and
	 * limitations under the License.
	 */
var i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o=function(){function e(){n(this,e)}return e.prototype.getNowString=function(){var e=new Date,t=s[e.getUTCDay()],n=i[e.getUTCMonth()],o=e.getUTCDate(),r=e.getUTCHours();r<10&&(r="0"+r);var a=e.getUTCMinutes();a<10&&(a="0"+a);var u=e.getUTCSeconds();u<10&&(u="0"+u);var c=e.getUTCFullYear(),l=t+" "+n+" "+o+" "+r+":"+a+":"+u+" UTC "+c;return l},e}();t.default=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;/*!
	 * Copyright 2016 Amazon.com,
	 * Inc. or its affiliates. All Rights Reserved.
	 *
	 * Licensed under the Amazon Software License (the "License").
	 * You may not use this file except in compliance with the
	 * License. A copy of the License is located at
	 *
	 *     http://aws.amazon.com/asl/
	 *
	 * or in the "license" file accompanying this file. This file is
	 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
	 * CONDITIONS OF ANY KIND, express or implied. See the License
	 * for the specific language governing permissions and
	 * limitations under the License.
	 */
var i={},s=function(){function e(){n(this,e)}return e.setItem=function(e,t){return i[e]=t,i[e]},e.getItem=function(e){return Object.prototype.hasOwnProperty.call(i,e)?i[e]:void 0},e.removeItem=function(e){return delete i[e]},e.clear=function(){return i={}},e}(),o=function(){function e(){n(this,e);try{this.storageWindow=window.localStorage,this.storageWindow.setItem("aws.cognito.test-ls",1),this.storageWindow.removeItem("aws.cognito.test-ls")}catch(e){this.storageWindow=s}}return e.prototype.getStorage=function(){return this.storageWindow},e}();t.default=o},function(e,n){e.exports=t},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;/*!
	 * Copyright 2016 Amazon.com,
	 * Inc. or its affiliates. All Rights Reserved.
	 *
	 * Licensed under the Amazon Software License (the "License").
	 * You may not use this file except in compliance with the
	 * License. A copy of the License is located at
	 *
	 *     http://aws.amazon.com/asl/
	 *
	 * or in the "license" file accompanying this file. This file is
	 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
	 * CONDITIONS OF ANY KIND, express or implied. See the License
	 * for the specific language governing permissions and
	 * limitations under the License.
	 */
var i=function(){function e(t){n(this,e);var i=t||{},s=i.ValidationData,o=i.Username,r=i.Password;this.validationData=s||[],this.username=o,this.password=r}return e.prototype.getUsername=function(){return this.username},e.prototype.getPassword=function(){return this.password},e.prototype.getValidationData=function(){return this.validationData},e}();t.default=i},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}t.__esModule=!0;var o=n(12),r=i(o),a=n(7),u=i(a),c=n(11),l=i(c),h=function(){function e(t){s(this,e);var n=t||{},i=n.UserPoolId,o=n.ClientId;if(!i||!o)throw new Error("Both UserPoolId and ClientId are required.");if(!/^[\w-]+_.+$/.test(i))throw new Error("Invalid UserPoolId format.");var a=i.split("_")[0];this.userPoolId=i,this.clientId=o,this.client=new r.default({apiVersion:"2016-04-19",region:a}),this.storage=t.Storage||(new l.default).getStorage()}return e.prototype.getUserPoolId=function(){return this.userPoolId},e.prototype.getClientId=function(){return this.clientId},e.prototype.signUp=function(e,t,n,i,s){var o=this;this.client.makeUnauthenticatedRequest("signUp",{ClientId:this.clientId,Username:e,Password:t,UserAttributes:n,ValidationData:i},function(t,n){if(t)return s(t,null);var i={Username:e,Pool:o,Storage:o.storage},r={user:new u.default(i),userConfirmed:n.UserConfirmed,userSub:n.UserSub};return s(null,r)})},e.prototype.getCurrentUser=function(){var e="CognitoIdentityServiceProvider."+this.clientId+".LastAuthUser",t=this.storage.getItem(e);if(t){var n={Username:t,Pool:this,Storage:this.storage};return new u.default(n)}return null},e}();t.default=h},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var s=n(13);Object.defineProperty(t,"AuthenticationDetails",{enumerable:!0,get:function(){return i(s).default}});var o=n(2);Object.defineProperty(t,"AuthenticationHelper",{enumerable:!0,get:function(){return i(o).default}});var r=n(4);Object.defineProperty(t,"CognitoAccessToken",{enumerable:!0,get:function(){return i(r).default}});var a=n(5);Object.defineProperty(t,"CognitoIdToken",{enumerable:!0,get:function(){return i(a).default}});var u=n(6);Object.defineProperty(t,"CognitoRefreshToken",{enumerable:!0,get:function(){return i(u).default}});var c=n(7);Object.defineProperty(t,"CognitoUser",{enumerable:!0,get:function(){return i(c).default}});var l=n(8);Object.defineProperty(t,"CognitoUserAttribute",{enumerable:!0,get:function(){return i(l).default}});var h=n(14);Object.defineProperty(t,"CognitoUserPool",{enumerable:!0,get:function(){return i(h).default}});var f=n(9);Object.defineProperty(t,"CognitoUserSession",{enumerable:!0,get:function(){return i(f).default}});var d=n(10);Object.defineProperty(t,"DateHelper",{enumerable:!0,get:function(){return i(d).default}})}])});
//# sourceMappingURL=amazon-cognito-identity.min.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);

var AWS = __webpack_require__(0);
if (typeof window !== 'undefined') window.AWS = AWS;
if (true) module.exports = AWS;
if (typeof self !== 'undefined') self.AWS = AWS;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);

function QueryParamSerializer() {
}

QueryParamSerializer.prototype.serialize = function(params, shape, fn) {
  serializeStructure('', params, shape, fn);
};

function ucfirst(shape) {
  if (shape.isQueryName || shape.api.protocol !== 'ec2') {
    return shape.name;
  } else {
    return shape.name[0].toUpperCase() + shape.name.substr(1);
  }
}

function serializeStructure(prefix, struct, rules, fn) {
  util.each(rules.members, function(name, member) {
    var value = struct[name];
    if (value === null || value === undefined) return;

    var memberName = ucfirst(member);
    memberName = prefix ? prefix + '.' + memberName : memberName;
    serializeMember(memberName, value, member, fn);
  });
}

function serializeMap(name, map, rules, fn) {
  var i = 1;
  util.each(map, function (key, value) {
    var prefix = rules.flattened ? '.' : '.entry.';
    var position = prefix + (i++) + '.';
    var keyName = position + (rules.key.name || 'key');
    var valueName = position + (rules.value.name || 'value');
    serializeMember(name + keyName, key, rules.key, fn);
    serializeMember(name + valueName, value, rules.value, fn);
  });
}

function serializeList(name, list, rules, fn) {
  var memberRules = rules.member || {};

  if (list.length === 0) {
    fn.call(this, name, null);
    return;
  }

  util.arrayEach(list, function (v, n) {
    var suffix = '.' + (n + 1);
    if (rules.api.protocol === 'ec2') {
      // Do nothing for EC2
      suffix = suffix + ''; // make linter happy
    } else if (rules.flattened) {
      if (memberRules.name) {
        var parts = name.split('.');
        parts.pop();
        parts.push(ucfirst(memberRules));
        name = parts.join('.');
      }
    } else {
      suffix = '.' + (memberRules.name ? memberRules.name : 'member') + suffix;
    }
    serializeMember(name + suffix, v, memberRules, fn);
  });
}

function serializeMember(name, value, rules, fn) {
  if (value === null || value === undefined) return;
  if (rules.type === 'structure') {
    serializeStructure(name, value, rules, fn);
  } else if (rules.type === 'list') {
    serializeList(name, value, rules, fn);
  } else if (rules.type === 'map') {
    serializeMap(name, value, rules, fn);
  } else {
    fn(name, rules.toWireFormat(value).toString());
  }
}

module.exports = QueryParamSerializer;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);
var builder = __webpack_require__(89);

function XmlBuilder() { }

XmlBuilder.prototype.toXML = function(params, shape, rootElement, noEmpty) {
  var xml = builder.create(rootElement);
  applyNamespaces(xml, shape);
  serialize(xml, params, shape);
  return xml.children.length > 0 || noEmpty ? xml.root().toString() : '';
};

function serialize(xml, value, shape) {
  switch (shape.type) {
    case 'structure': return serializeStructure(xml, value, shape);
    case 'map': return serializeMap(xml, value, shape);
    case 'list': return serializeList(xml, value, shape);
    default: return serializeScalar(xml, value, shape);
  }
}

function serializeStructure(xml, params, shape) {
  util.arrayEach(shape.memberNames, function(memberName) {
    var memberShape = shape.members[memberName];
    if (memberShape.location !== 'body') return;

    var value = params[memberName];
    var name = memberShape.name;
    if (value !== undefined && value !== null) {
      if (memberShape.isXmlAttribute) {
        xml.att(name, value);
      } else if (memberShape.flattened) {
        serialize(xml, value, memberShape);
      } else {
        var element = xml.ele(name);
        applyNamespaces(element, memberShape);
        serialize(element, value, memberShape);
      }
    }
  });
}

function serializeMap(xml, map, shape) {
  var xmlKey = shape.key.name || 'key';
  var xmlValue = shape.value.name || 'value';

  util.each(map, function(key, value) {
    var entry = xml.ele(shape.flattened ? shape.name : 'entry');
    serialize(entry.ele(xmlKey), key, shape.key);
    serialize(entry.ele(xmlValue), value, shape.value);
  });
}

function serializeList(xml, list, shape) {
  if (shape.flattened) {
    util.arrayEach(list, function(value) {
      var name = shape.member.name || shape.name;
      var element = xml.ele(name);
      serialize(element, value, shape.member);
    });
  } else {
    util.arrayEach(list, function(value) {
      var name = shape.member.name || 'member';
      var element = xml.ele(name);
      serialize(element, value, shape.member);
    });
  }
}

function serializeScalar(xml, value, shape) {
  xml.txt(shape.toWireFormat(value));
}

function applyNamespaces(xml, shape) {
  var uri, prefix = 'xmlns';
  if (shape.xmlNamespaceUri) {
    uri = shape.xmlNamespaceUri;
    if (shape.xmlNamespacePrefix) prefix += ':' + shape.xmlNamespacePrefix;
  } else if (xml.isRoot && shape.api.xmlNamespaceUri) {
    uri = shape.api.xmlNamespaceUri;
  }

  if (uri) xml.att(prefix, uri);
}

module.exports = XmlBuilder;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLBuilder, assign;

  assign = __webpack_require__(90);

  XMLBuilder = __webpack_require__(114);

  module.exports.create = function(name, xmldec, doctype, options) {
    options = assign({}, xmldec, doctype, options);
    return new XMLBuilder(name, options).root();
  };

}).call(this);


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(49),
    copyObject = __webpack_require__(54),
    createAssigner = __webpack_require__(97),
    isArrayLike = __webpack_require__(11),
    isPrototype = __webpack_require__(32),
    keys = __webpack_require__(12);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

module.exports = assign;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(17),
    isMasked = __webpack_require__(94),
    isObject = __webpack_require__(3),
    toSource = __webpack_require__(53);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(18);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 93 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(95);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(5);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 96 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(98),
    isIterateeCall = __webpack_require__(55);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(29),
    overRest = __webpack_require__(99),
    setToString = __webpack_require__(101);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(100);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(102),
    shortOut = __webpack_require__(104);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(103),
    defineProperty = __webpack_require__(51),
    identity = __webpack_require__(29);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 103 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 104 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(106),
    isArguments = __webpack_require__(33),
    isArray = __webpack_require__(4),
    isBuffer = __webpack_require__(34),
    isIndex = __webpack_require__(31),
    isTypedArray = __webpack_require__(36);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isObjectLike = __webpack_require__(13);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 108 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isLength = __webpack_require__(30),
    isObjectLike = __webpack_require__(13);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 110 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(52);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module)))

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(113);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 113 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLBuilder, XMLDeclaration, XMLDocType, XMLElement, XMLStringifier;

  XMLStringifier = __webpack_require__(115);

  XMLDeclaration = __webpack_require__(57);

  XMLDocType = __webpack_require__(70);

  XMLElement = __webpack_require__(59);

  module.exports = XMLBuilder = (function() {
    function XMLBuilder(name, options) {
      var root, temp;
      if (name == null) {
        throw new Error("Root element needs a name");
      }
      if (options == null) {
        options = {};
      }
      this.options = options;
      this.stringify = new XMLStringifier(options);
      temp = new XMLElement(this, 'doc');
      root = temp.element(name);
      root.isRoot = true;
      root.documentObject = this;
      this.rootObject = root;
      if (!options.headless) {
        root.declaration(options);
        if ((options.pubID != null) || (options.sysID != null)) {
          root.doctype(options);
        }
      }
    }

    XMLBuilder.prototype.root = function() {
      return this.rootObject;
    };

    XMLBuilder.prototype.end = function(options) {
      return this.toString(options);
    };

    XMLBuilder.prototype.toString = function(options) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      r = '';
      if (this.xmldec != null) {
        r += this.xmldec.toString(options);
      }
      if (this.doctype != null) {
        r += this.doctype.toString(options);
      }
      r += this.rootObject.toString(options);
      if (pretty && r.slice(-newline.length) === newline) {
        r = r.slice(0, -newline.length);
      }
      return r;
    };

    return XMLBuilder;

  })();

}).call(this);


/***/ }),
/* 115 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLStringifier,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    hasProp = {}.hasOwnProperty;

  module.exports = XMLStringifier = (function() {
    function XMLStringifier(options) {
      this.assertLegalChar = bind(this.assertLegalChar, this);
      var key, ref, value;
      this.allowSurrogateChars = options != null ? options.allowSurrogateChars : void 0;
      this.noDoubleEncoding = options != null ? options.noDoubleEncoding : void 0;
      ref = (options != null ? options.stringify : void 0) || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
    }

    XMLStringifier.prototype.eleName = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.eleText = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(this.elEscape(val));
    };

    XMLStringifier.prototype.cdata = function(val) {
      val = '' + val || '';
      if (val.match(/]]>/)) {
        throw new Error("Invalid CDATA text: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.comment = function(val) {
      val = '' + val || '';
      if (val.match(/--/)) {
        throw new Error("Comment text cannot contain double-hypen: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.raw = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.attName = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.attValue = function(val) {
      val = '' + val || '';
      return this.attEscape(val);
    };

    XMLStringifier.prototype.insTarget = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.insValue = function(val) {
      val = '' + val || '';
      if (val.match(/\?>/)) {
        throw new Error("Invalid processing instruction value: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlVersion = function(val) {
      val = '' + val || '';
      if (!val.match(/1\.[0-9]+/)) {
        throw new Error("Invalid version number: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlEncoding = function(val) {
      val = '' + val || '';
      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-]|-)*$/)) {
        throw new Error("Invalid encoding: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlStandalone = function(val) {
      if (val) {
        return "yes";
      } else {
        return "no";
      }
    };

    XMLStringifier.prototype.dtdPubID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdSysID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdElementValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttType = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttDefault = function(val) {
      if (val != null) {
        return '' + val || '';
      } else {
        return val;
      }
    };

    XMLStringifier.prototype.dtdEntityValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdNData = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.convertAttKey = '@';

    XMLStringifier.prototype.convertPIKey = '?';

    XMLStringifier.prototype.convertTextKey = '#text';

    XMLStringifier.prototype.convertCDataKey = '#cdata';

    XMLStringifier.prototype.convertCommentKey = '#comment';

    XMLStringifier.prototype.convertRawKey = '#raw';

    XMLStringifier.prototype.assertLegalChar = function(str) {
      var chars, chr;
      if (this.allowSurrogateChars) {
        chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uFFFE-\uFFFF]/;
      } else {
        chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/;
      }
      chr = str.match(chars);
      if (chr) {
        throw new Error("Invalid character (" + chr + ") in string: " + str + " at index " + chr.index);
      }
      return str;
    };

    XMLStringifier.prototype.elEscape = function(str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
    };

    XMLStringifier.prototype.attEscape = function(str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    };

    return XMLStringifier;

  })();

}).call(this);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(54),
    keys = __webpack_require__(12);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var baseKeys = __webpack_require__(56),
    getTag = __webpack_require__(58),
    isArguments = __webpack_require__(33),
    isArray = __webpack_require__(4),
    isArrayLike = __webpack_require__(11),
    isBuffer = __webpack_require__(34),
    isPrototype = __webpack_require__(32),
    isTypedArray = __webpack_require__(36);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(6),
    root = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var arrayEvery = __webpack_require__(124),
    baseEvery = __webpack_require__(125),
    baseIteratee = __webpack_require__(131),
    isArray = __webpack_require__(4),
    isIterateeCall = __webpack_require__(55);

/**
 * Checks if `predicate` returns truthy for **all** elements of `collection`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * **Note:** This method returns `true` for
 * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty collections.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 * @example
 *
 * _.every([true, 1, null, 'yes'], Boolean);
 * // => false
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.every(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.every(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.every(users, 'active');
 * // => false
 */
function every(collection, predicate, guard) {
  var func = isArray(collection) ? arrayEvery : baseEvery;
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = every;


/***/ }),
/* 124 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.every` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 */
function arrayEvery(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

module.exports = arrayEvery;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(126);

/**
 * The base implementation of `_.every` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */
function baseEvery(collection, predicate) {
  var result = true;
  baseEach(collection, function(value, index, collection) {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

module.exports = baseEvery;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(127),
    createBaseEach = __webpack_require__(130);

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(128),
    keys = __webpack_require__(12);

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(129);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),
/* 129 */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(11);

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(132),
    baseMatchesProperty = __webpack_require__(174),
    identity = __webpack_require__(29),
    isArray = __webpack_require__(4),
    property = __webpack_require__(185);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(133),
    getMatchData = __webpack_require__(173),
    matchesStrictComparable = __webpack_require__(64);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(60),
    baseIsEqual = __webpack_require__(61);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),
/* 134 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(21);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(21);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(21);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(21);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(20);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 140 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 141 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 142 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(20),
    Map = __webpack_require__(37),
    MapCache = __webpack_require__(38);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(145),
    ListCache = __webpack_require__(20),
    Map = __webpack_require__(37);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(146),
    hashDelete = __webpack_require__(147),
    hashGet = __webpack_require__(148),
    hashHas = __webpack_require__(149),
    hashSet = __webpack_require__(150);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(22);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 147 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(22);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(22);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(22);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(23);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 152 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(23);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(23);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(23);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(60),
    equalArrays = __webpack_require__(62),
    equalByTag = __webpack_require__(162),
    equalObjects = __webpack_require__(166),
    getTag = __webpack_require__(58),
    isArray = __webpack_require__(4),
    isBuffer = __webpack_require__(34),
    isTypedArray = __webpack_require__(36);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(38),
    setCacheAdd = __webpack_require__(158),
    setCacheHas = __webpack_require__(159);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),
/* 158 */
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),
/* 159 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),
/* 160 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),
/* 161 */
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(18),
    Uint8Array = __webpack_require__(163),
    eq = __webpack_require__(19),
    equalArrays = __webpack_require__(62),
    mapToArray = __webpack_require__(164),
    setToArray = __webpack_require__(165);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(5);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 164 */
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),
/* 165 */
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(167);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(168),
    getSymbols = __webpack_require__(170),
    keys = __webpack_require__(12);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(169),
    isArray = __webpack_require__(4);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 169 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(171),
    stubArray = __webpack_require__(172);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 171 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 172 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(63),
    keys = __webpack_require__(12);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(61),
    get = __webpack_require__(175),
    hasIn = __webpack_require__(182),
    isKey = __webpack_require__(39),
    isStrictComparable = __webpack_require__(63),
    matchesStrictComparable = __webpack_require__(64),
    toKey = __webpack_require__(24);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(65);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(177);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(178);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(38);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(180);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(18),
    arrayMap = __webpack_require__(181),
    isArray = __webpack_require__(4),
    isSymbol = __webpack_require__(40);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 181 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(183),
    hasPath = __webpack_require__(184);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),
/* 183 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(66),
    isArguments = __webpack_require__(33),
    isArray = __webpack_require__(4),
    isIndex = __webpack_require__(31),
    isLength = __webpack_require__(30),
    toKey = __webpack_require__(24);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(186),
    basePropertyDeep = __webpack_require__(187),
    isKey = __webpack_require__(39),
    toKey = __webpack_require__(24);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),
/* 186 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(65);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLAttribute, create;

  create = __webpack_require__(2);

  module.exports = XMLAttribute = (function() {
    function XMLAttribute(parent, name, value) {
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing attribute name of element " + parent.name);
      }
      if (value == null) {
        throw new Error("Missing attribute value for attribute " + name + " of element " + parent.name);
      }
      this.name = this.stringify.attName(name);
      this.value = this.stringify.attValue(value);
    }

    XMLAttribute.prototype.clone = function() {
      return create(XMLAttribute.prototype, this);
    };

    XMLAttribute.prototype.toString = function(options, level) {
      return ' ' + this.name + '="' + this.value + '"';
    };

    return XMLAttribute;

  })();

}).call(this);


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLDTDAttList, create;

  create = __webpack_require__(2);

  module.exports = XMLDTDAttList = (function() {
    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      this.stringify = parent.stringify;
      if (elementName == null) {
        throw new Error("Missing DTD element name");
      }
      if (attributeName == null) {
        throw new Error("Missing DTD attribute name");
      }
      if (!attributeType) {
        throw new Error("Missing DTD attribute type");
      }
      if (!defaultValueType) {
        throw new Error("Missing DTD attribute default");
      }
      if (defaultValueType.indexOf('#') !== 0) {
        defaultValueType = '#' + defaultValueType;
      }
      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");
      }
      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
        throw new Error("Default value only applies to #FIXED or #DEFAULT");
      }
      this.elementName = this.stringify.eleName(elementName);
      this.attributeName = this.stringify.attName(attributeName);
      this.attributeType = this.stringify.dtdAttType(attributeType);
      this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
      this.defaultValueType = defaultValueType;
    }

    XMLDTDAttList.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!ATTLIST ' + this.elementName + ' ' + this.attributeName + ' ' + this.attributeType;
      if (this.defaultValueType !== '#DEFAULT') {
        r += ' ' + this.defaultValueType;
      }
      if (this.defaultValue) {
        r += ' "' + this.defaultValue + '"';
      }
      r += '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDTDAttList;

  })();

}).call(this);


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLDTDEntity, create, isObject;

  create = __webpack_require__(2);

  isObject = __webpack_require__(3);

  module.exports = XMLDTDEntity = (function() {
    function XMLDTDEntity(parent, pe, name, value) {
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing entity name");
      }
      if (value == null) {
        throw new Error("Missing entity value");
      }
      this.pe = !!pe;
      this.name = this.stringify.eleName(name);
      if (!isObject(value)) {
        this.value = this.stringify.dtdEntityValue(value);
      } else {
        if (!value.pubID && !value.sysID) {
          throw new Error("Public and/or system identifiers are required for an external entity");
        }
        if (value.pubID && !value.sysID) {
          throw new Error("System identifier is required for a public external entity");
        }
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
        if (value.nData != null) {
          this.nData = this.stringify.dtdNData(value.nData);
        }
        if (this.pe && this.nData) {
          throw new Error("Notation declaration is not allowed in a parameter entity");
        }
      }
    }

    XMLDTDEntity.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!ENTITY';
      if (this.pe) {
        r += ' %';
      }
      r += ' ' + this.name;
      if (this.value) {
        r += ' "' + this.value + '"';
      } else {
        if (this.pubID && this.sysID) {
          r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
        } else if (this.sysID) {
          r += ' SYSTEM "' + this.sysID + '"';
        }
        if (this.nData) {
          r += ' NDATA ' + this.nData;
        }
      }
      r += '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDTDEntity;

  })();

}).call(this);


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLDTDElement, create;

  create = __webpack_require__(2);

  module.exports = XMLDTDElement = (function() {
    function XMLDTDElement(parent, name, value) {
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing DTD element name");
      }
      if (!value) {
        value = '(#PCDATA)';
      }
      if (Array.isArray(value)) {
        value = '(' + value.join(',') + ')';
      }
      this.name = this.stringify.eleName(name);
      this.value = this.stringify.dtdElementValue(value);
    }

    XMLDTDElement.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!ELEMENT ' + this.name + ' ' + this.value + '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDTDElement;

  })();

}).call(this);


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLDTDNotation, create;

  create = __webpack_require__(2);

  module.exports = XMLDTDNotation = (function() {
    function XMLDTDNotation(parent, name, value) {
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing notation name");
      }
      if (!value.pubID && !value.sysID) {
        throw new Error("Public or system identifiers are required for an external entity");
      }
      this.name = this.stringify.eleName(name);
      if (value.pubID != null) {
        this.pubID = this.stringify.dtdPubID(value.pubID);
      }
      if (value.sysID != null) {
        this.sysID = this.stringify.dtdSysID(value.sysID);
      }
    }

    XMLDTDNotation.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!NOTATION ' + this.name;
      if (this.pubID && this.sysID) {
        r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
      } else if (this.pubID) {
        r += ' PUBLIC "' + this.pubID + '"';
      } else if (this.sysID) {
        r += ' SYSTEM "' + this.sysID + '"';
      }
      r += '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDTDNotation;

  })();

}).call(this);


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLNode, XMLRaw, create,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  create = __webpack_require__(2);

  XMLNode = __webpack_require__(7);

  module.exports = XMLRaw = (function(superClass) {
    extend(XMLRaw, superClass);

    function XMLRaw(parent, text) {
      XMLRaw.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing raw text");
      }
      this.value = this.stringify.raw(text);
    }

    XMLRaw.prototype.clone = function() {
      return create(XMLRaw.prototype, this);
    };

    XMLRaw.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += this.value;
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLRaw;

  })(XMLNode);

}).call(this);


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.9.1
(function() {
  var XMLNode, XMLText, create,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  create = __webpack_require__(2);

  XMLNode = __webpack_require__(7);

  module.exports = XMLText = (function(superClass) {
    extend(XMLText, superClass);

    function XMLText(parent, text) {
      XMLText.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing element text");
      }
      this.value = this.stringify.eleText(text);
    }

    XMLText.prototype.clone = function() {
      return create(XMLText.prototype, this);
    };

    XMLText.prototype.toString = function(options, level) {
      var indent, newline, offset, pretty, r, ref, ref1, ref2, space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += this.value;
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLText;

  })(XMLNode);

}).call(this);


/***/ }),
/* 195 */
/***/ (function(module, exports) {

function apiLoader(svc, version) {
  if (!apiLoader.services.hasOwnProperty(svc)) {
    throw new Error('InvalidService: Failed to load api for ' + svc);
  }
  return apiLoader.services[svc][version];
}

/**
 * This member of AWS.apiLoader is private, but changing it will necessitate a
 * change to ../scripts/services-table-generator.ts
 */
apiLoader.services = {};
module.exports = apiLoader;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var Api = __webpack_require__(71);
var regionConfig = __webpack_require__(197);
var inherit = AWS.util.inherit;
var clientCount = 0;

/**
 * The service class representing an AWS service.
 *
 * @abstract
 *
 * @!attribute apiVersions
 *   @return [Array<String>] the list of API versions supported by this service.
 *   @readonly
 */
AWS.Service = inherit({
  /**
   * Create a new service object with a configuration object
   *
   * @param config [map] a map of configuration options
   */
  constructor: function Service(config) {
    if (!this.loadServiceClass) {
      throw AWS.util.error(new Error(),
        'Service must be constructed with `new\' operator');
    }
    var ServiceClass = this.loadServiceClass(config || {});
    if (ServiceClass) {
      var originalConfig = AWS.util.copy(config);
      var svc = new ServiceClass(config);
      Object.defineProperty(svc, '_originalConfig', {
        get: function() { return originalConfig; },
        enumerable: false,
        configurable: true
      });
      svc._clientId = ++clientCount;
      return svc;
    }
    this.initialize(config);
  },

  /**
   * @api private
   */
  initialize: function initialize(config) {
    var svcConfig = AWS.config[this.serviceIdentifier];

    this.config = new AWS.Config(AWS.config);
    if (svcConfig) this.config.update(svcConfig, true);
    if (config) this.config.update(config, true);

    this.validateService();
    if (!this.config.endpoint) regionConfig(this);

    this.config.endpoint = this.endpointFromTemplate(this.config.endpoint);
    this.setEndpoint(this.config.endpoint);
  },

  /**
   * @api private
   */
  validateService: function validateService() {
  },

  /**
   * @api private
   */
  loadServiceClass: function loadServiceClass(serviceConfig) {
    var config = serviceConfig;
    if (!AWS.util.isEmpty(this.api)) {
      return null;
    } else if (config.apiConfig) {
      return AWS.Service.defineServiceApi(this.constructor, config.apiConfig);
    } else if (!this.constructor.services) {
      return null;
    } else {
      config = new AWS.Config(AWS.config);
      config.update(serviceConfig, true);
      var version = config.apiVersions[this.constructor.serviceIdentifier];
      version = version || config.apiVersion;
      return this.getLatestServiceClass(version);
    }
  },

  /**
   * @api private
   */
  getLatestServiceClass: function getLatestServiceClass(version) {
    version = this.getLatestServiceVersion(version);
    if (this.constructor.services[version] === null) {
      AWS.Service.defineServiceApi(this.constructor, version);
    }

    return this.constructor.services[version];
  },

  /**
   * @api private
   */
  getLatestServiceVersion: function getLatestServiceVersion(version) {
    if (!this.constructor.services || this.constructor.services.length === 0) {
      throw new Error('No services defined on ' +
                      this.constructor.serviceIdentifier);
    }

    if (!version) {
      version = 'latest';
    } else if (AWS.util.isType(version, Date)) {
      version = AWS.util.date.iso8601(version).split('T')[0];
    }

    if (Object.hasOwnProperty(this.constructor.services, version)) {
      return version;
    }

    var keys = Object.keys(this.constructor.services).sort();
    var selectedVersion = null;
    for (var i = keys.length - 1; i >= 0; i--) {
      // versions that end in "*" are not available on disk and can be
      // skipped, so do not choose these as selectedVersions
      if (keys[i][keys[i].length - 1] !== '*') {
        selectedVersion = keys[i];
      }
      if (keys[i].substr(0, 10) <= version) {
        return selectedVersion;
      }
    }

    throw new Error('Could not find ' + this.constructor.serviceIdentifier +
                    ' API to satisfy version constraint `' + version + '\'');
  },

  /**
   * @api private
   */
  api: {},

  /**
   * @api private
   */
  defaultRetryCount: 3,

  /**
   * @api private
   */
  customizeRequests: function customizeRequests(callback) {
    if (!callback) {
      this.customRequestHandler = null;
    } else if (typeof callback === 'function') {
      this.customRequestHandler = callback;
    } else {
      throw new Error('Invalid callback type \'' + typeof callback + '\' provided in customizeRequests');
    }
  },

  /**
   * Calls an operation on a service with the given input parameters.
   *
   * @param operation [String] the name of the operation to call on the service.
   * @param params [map] a map of input options for the operation
   * @callback callback function(err, data)
   *   If a callback is supplied, it is called when a response is returned
   *   from the service.
   *   @param err [Error] the error object returned from the request.
   *     Set to `null` if the request is successful.
   *   @param data [Object] the de-serialized data returned from
   *     the request. Set to `null` if a request error occurs.
   */
  makeRequest: function makeRequest(operation, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = null;
    }

    params = params || {};
    if (this.config.params) { // copy only toplevel bound params
      var rules = this.api.operations[operation];
      if (rules) {
        params = AWS.util.copy(params);
        AWS.util.each(this.config.params, function(key, value) {
          if (rules.input.members[key]) {
            if (params[key] === undefined || params[key] === null) {
              params[key] = value;
            }
          }
        });
      }
    }

    var request = new AWS.Request(this, operation, params);
    this.addAllRequestListeners(request);

    if (callback) request.send(callback);
    return request;
  },

  /**
   * Calls an operation on a service with the given input parameters, without
   * any authentication data. This method is useful for "public" API operations.
   *
   * @param operation [String] the name of the operation to call on the service.
   * @param params [map] a map of input options for the operation
   * @callback callback function(err, data)
   *   If a callback is supplied, it is called when a response is returned
   *   from the service.
   *   @param err [Error] the error object returned from the request.
   *     Set to `null` if the request is successful.
   *   @param data [Object] the de-serialized data returned from
   *     the request. Set to `null` if a request error occurs.
   */
  makeUnauthenticatedRequest: function makeUnauthenticatedRequest(operation, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }

    var request = this.makeRequest(operation, params).toUnauthenticated();
    return callback ? request.send(callback) : request;
  },

  /**
   * Waits for a given state
   *
   * @param state [String] the state on the service to wait for
   * @param params [map] a map of parameters to pass with each request
   * @option params $waiter [map] a map of configuration options for the waiter
   * @option params $waiter.delay [Number] The number of seconds to wait between
   *                                       requests
   * @option params $waiter.maxAttempts [Number] The maximum number of requests
   *                                             to send while waiting
   * @callback callback function(err, data)
   *   If a callback is supplied, it is called when a response is returned
   *   from the service.
   *   @param err [Error] the error object returned from the request.
   *     Set to `null` if the request is successful.
   *   @param data [Object] the de-serialized data returned from
   *     the request. Set to `null` if a request error occurs.
   */
  waitFor: function waitFor(state, params, callback) {
    var waiter = new AWS.ResourceWaiter(this, state);
    return waiter.wait(params, callback);
  },

  /**
   * @api private
   */
  addAllRequestListeners: function addAllRequestListeners(request) {
    var list = [AWS.events, AWS.EventListeners.Core, this.serviceInterface(),
                AWS.EventListeners.CorePost];
    for (var i = 0; i < list.length; i++) {
      if (list[i]) request.addListeners(list[i]);
    }

    // disable parameter validation
    if (!this.config.paramValidation) {
      request.removeListener('validate',
        AWS.EventListeners.Core.VALIDATE_PARAMETERS);
    }

    if (this.config.logger) { // add logging events
      request.addListeners(AWS.EventListeners.Logger);
    }

    this.setupRequestListeners(request);
    // call prototype's customRequestHandler
    if (typeof this.constructor.prototype.customRequestHandler === 'function') {
      this.constructor.prototype.customRequestHandler(request);
    }
    // call instance's customRequestHandler
    if (Object.prototype.hasOwnProperty.call(this, 'customRequestHandler') && typeof this.customRequestHandler === 'function') {
      this.customRequestHandler(request);
    }
  },

  /**
   * Override this method to setup any custom request listeners for each
   * new request to the service.
   *
   * @abstract
   */
  setupRequestListeners: function setupRequestListeners() {
  },

  /**
   * Gets the signer class for a given request
   * @api private
   */
  getSignerClass: function getSignerClass(request) {
    var version;
    // get operation authtype if present
    var operation = null;
    var authtype = '';
    if (request) {
      var operations = request.service.api.operations || {};
      operation = operations[request.operation] || null;
      authtype = operation ? operation.authtype : '';
    }
    if (this.config.signatureVersion) {
      version = this.config.signatureVersion;
    } else if (authtype === 'v4' || authtype === 'v4-unsigned-body') {
      version = 'v4';
    } else {
      version = this.api.signatureVersion;
    }
    return AWS.Signers.RequestSigner.getVersion(version);
  },

  /**
   * @api private
   */
  serviceInterface: function serviceInterface() {
    switch (this.api.protocol) {
      case 'ec2': return AWS.EventListeners.Query;
      case 'query': return AWS.EventListeners.Query;
      case 'json': return AWS.EventListeners.Json;
      case 'rest-json': return AWS.EventListeners.RestJson;
      case 'rest-xml': return AWS.EventListeners.RestXml;
    }
    if (this.api.protocol) {
      throw new Error('Invalid service `protocol\' ' +
        this.api.protocol + ' in API config');
    }
  },

  /**
   * @api private
   */
  successfulResponse: function successfulResponse(resp) {
    return resp.httpResponse.statusCode < 300;
  },

  /**
   * How many times a failed request should be retried before giving up.
   * the defaultRetryCount can be overriden by service classes.
   *
   * @api private
   */
  numRetries: function numRetries() {
    if (this.config.maxRetries !== undefined) {
      return this.config.maxRetries;
    } else {
      return this.defaultRetryCount;
    }
  },

  /**
   * @api private
   */
  retryDelays: function retryDelays(retryCount) {
    return AWS.util.calculateRetryDelay(retryCount, this.config.retryDelayOptions);
  },

  /**
   * @api private
   */
  retryableError: function retryableError(error) {
    if (this.timeoutError(error)) return true;
    if (this.networkingError(error)) return true;
    if (this.expiredCredentialsError(error)) return true;
    if (this.throttledError(error)) return true;
    if (error.statusCode >= 500) return true;
    return false;
  },

  /**
   * @api private
   */
  networkingError: function networkingError(error) {
    return error.code === 'NetworkingError';
  },

  /**
   * @api private
   */
  timeoutError: function timeoutError(error) {
    return error.code === 'TimeoutError';
  },

  /**
   * @api private
   */
  expiredCredentialsError: function expiredCredentialsError(error) {
    // TODO : this only handles *one* of the expired credential codes
    return (error.code === 'ExpiredTokenException');
  },

  /**
   * @api private
   */
  clockSkewError: function clockSkewError(error) {
    switch (error.code) {
      case 'RequestTimeTooSkewed':
      case 'RequestExpired':
      case 'InvalidSignatureException':
      case 'SignatureDoesNotMatch':
      case 'AuthFailure':
      case 'RequestInTheFuture':
        return true;
      default: return false;
    }
  },

  /**
   * @api private
   */
  throttledError: function throttledError(error) {
    // this logic varies between services
    switch (error.code) {
      case 'ProvisionedThroughputExceededException':
      case 'Throttling':
      case 'ThrottlingException':
      case 'RequestLimitExceeded':
      case 'RequestThrottled':
        return true;
      default:
        return false;
    }
  },

  /**
   * @api private
   */
  endpointFromTemplate: function endpointFromTemplate(endpoint) {
    if (typeof endpoint !== 'string') return endpoint;

    var e = endpoint;
    e = e.replace(/\{service\}/g, this.api.endpointPrefix);
    e = e.replace(/\{region\}/g, this.config.region);
    e = e.replace(/\{scheme\}/g, this.config.sslEnabled ? 'https' : 'http');
    return e;
  },

  /**
   * @api private
   */
  setEndpoint: function setEndpoint(endpoint) {
    this.endpoint = new AWS.Endpoint(endpoint, this.config);
  },

  /**
   * @api private
   */
  paginationConfig: function paginationConfig(operation, throwException) {
    var paginator = this.api.operations[operation].paginator;
    if (!paginator) {
      if (throwException) {
        var e = new Error();
        throw AWS.util.error(e, 'No pagination configuration for ' + operation);
      }
      return null;
    }

    return paginator;
  }
});

AWS.util.update(AWS.Service, {

  /**
   * Adds one method for each operation described in the api configuration
   *
   * @api private
   */
  defineMethods: function defineMethods(svc) {
    AWS.util.each(svc.prototype.api.operations, function iterator(method) {
      if (svc.prototype[method]) return;
      var operation = svc.prototype.api.operations[method];
      if (operation.authtype === 'none') {
        svc.prototype[method] = function (params, callback) {
          return this.makeUnauthenticatedRequest(method, params, callback);
        };
      } else {
        svc.prototype[method] = function (params, callback) {
          return this.makeRequest(method, params, callback);
        };
      }
    });
  },

  /**
   * Defines a new Service class using a service identifier and list of versions
   * including an optional set of features (functions) to apply to the class
   * prototype.
   *
   * @param serviceIdentifier [String] the identifier for the service
   * @param versions [Array<String>] a list of versions that work with this
   *   service
   * @param features [Object] an object to attach to the prototype
   * @return [Class<Service>] the service class defined by this function.
   */
  defineService: function defineService(serviceIdentifier, versions, features) {
    AWS.Service._serviceMap[serviceIdentifier] = true;
    if (!Array.isArray(versions)) {
      features = versions;
      versions = [];
    }

    var svc = inherit(AWS.Service, features || {});

    if (typeof serviceIdentifier === 'string') {
      AWS.Service.addVersions(svc, versions);

      var identifier = svc.serviceIdentifier || serviceIdentifier;
      svc.serviceIdentifier = identifier;
    } else { // defineService called with an API
      svc.prototype.api = serviceIdentifier;
      AWS.Service.defineMethods(svc);
    }

    return svc;
  },

  /**
   * @api private
   */
  addVersions: function addVersions(svc, versions) {
    if (!Array.isArray(versions)) versions = [versions];

    svc.services = svc.services || {};
    for (var i = 0; i < versions.length; i++) {
      if (svc.services[versions[i]] === undefined) {
        svc.services[versions[i]] = null;
      }
    }

    svc.apiVersions = Object.keys(svc.services).sort();
  },

  /**
   * @api private
   */
  defineServiceApi: function defineServiceApi(superclass, version, apiConfig) {
    var svc = inherit(superclass, {
      serviceIdentifier: superclass.serviceIdentifier
    });

    function setApi(api) {
      if (api.isApi) {
        svc.prototype.api = api;
      } else {
        svc.prototype.api = new Api(api);
      }
    }

    if (typeof version === 'string') {
      if (apiConfig) {
        setApi(apiConfig);
      } else {
        try {
          setApi(AWS.apiLoader(superclass.serviceIdentifier, version));
        } catch (err) {
          throw AWS.util.error(err, {
            message: 'Could not find API configuration ' +
              superclass.serviceIdentifier + '-' + version
          });
        }
      }
      if (!Object.prototype.hasOwnProperty.call(superclass.services, version)) {
        superclass.apiVersions = superclass.apiVersions.concat(version).sort();
      }
      superclass.services[version] = svc;
    } else {
      setApi(version);
    }

    AWS.Service.defineMethods(svc);
    return svc;
  },

  /**
   * @api private
   */
  hasService: function(identifier) {
    return Object.prototype.hasOwnProperty.call(AWS.Service._serviceMap, identifier);
  },

  /**
   * @api private
   */
  _serviceMap: {}
});

module.exports = AWS.Service;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);
var regionConfig = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./region_config_data.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function generateRegionPrefix(region) {
  if (!region) return null;

  var parts = region.split('-');
  if (parts.length < 3) return null;
  return parts.slice(0, parts.length - 2).join('-') + '-*';
}

function derivedKeys(service) {
  var region = service.config.region;
  var regionPrefix = generateRegionPrefix(region);
  var endpointPrefix = service.api.endpointPrefix;

  return [
    [region, endpointPrefix],
    [regionPrefix, endpointPrefix],
    [region, '*'],
    [regionPrefix, '*'],
    ['*', endpointPrefix],
    ['*', '*']
  ].map(function(item) {
    return item[0] && item[1] ? item.join('/') : null;
  });
}

function applyConfig(service, config) {
  util.each(config, function(key, value) {
    if (key === 'globalEndpoint') return;
    if (service.config[key] === undefined || service.config[key] === null) {
      service.config[key] = value;
    }
  });
}

function configureEndpoint(service) {
  var keys = derivedKeys(service);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!key) continue;

    if (Object.prototype.hasOwnProperty.call(regionConfig.rules, key)) {
      var config = regionConfig.rules[key];
      if (typeof config === 'string') {
        config = regionConfig.patterns[config];
      }

      // set dualstack endpoint
      if (service.config.useDualstack && util.isDualstackAvailable(service)) {
        config = util.copy(config);
        config.endpoint = '{service}.dualstack.{region}.amazonaws.com';
      }

      // set global endpoint
      service.isGlobalEndpoint = !!config.globalEndpoint;

      // signature version
      if (!config.signatureVersion) config.signatureVersion = 'v4';

      // merge config
      applyConfig(service, config);
      return;
    }
  }
}

module.exports = configureEndpoint;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
__webpack_require__(75);
__webpack_require__(76);
var PromisesDependency;

/**
 * The main configuration class used by all service objects to set
 * the region, credentials, and other options for requests.
 *
 * By default, credentials and region settings are left unconfigured.
 * This should be configured by the application before using any
 * AWS service APIs.
 *
 * In order to set global configuration options, properties should
 * be assigned to the global {AWS.config} object.
 *
 * @see AWS.config
 *
 * @!group General Configuration Options
 *
 * @!attribute credentials
 *   @return [AWS.Credentials] the AWS credentials to sign requests with.
 *
 * @!attribute region
 *   @example Set the global region setting to us-west-2
 *     AWS.config.update({region: 'us-west-2'});
 *   @return [AWS.Credentials] The region to send service requests to.
 *   @see http://docs.amazonwebservices.com/general/latest/gr/rande.html
 *     A list of available endpoints for each AWS service
 *
 * @!attribute maxRetries
 *   @return [Integer] the maximum amount of retries to perform for a
 *     service request. By default this value is calculated by the specific
 *     service object that the request is being made to.
 *
 * @!attribute maxRedirects
 *   @return [Integer] the maximum amount of redirects to follow for a
 *     service request. Defaults to 10.
 *
 * @!attribute paramValidation
 *   @return [Boolean|map] whether input parameters should be validated against
 *     the operation description before sending the request. Defaults to true.
 *     Pass a map to enable any of the following specific validation features:
 *
 *     * **min** [Boolean] &mdash; Validates that a value meets the min
 *       constraint. This is enabled by default when paramValidation is set
 *       to `true`.
 *     * **max** [Boolean] &mdash; Validates that a value meets the max
 *       constraint.
 *     * **pattern** [Boolean] &mdash; Validates that a string value matches a
 *       regular expression.
 *     * **enum** [Boolean] &mdash; Validates that a string value matches one
 *       of the allowable enum values.
 *
 * @!attribute computeChecksums
 *   @return [Boolean] whether to compute checksums for payload bodies when
 *     the service accepts it (currently supported in S3 only).
 *
 * @!attribute convertResponseTypes
 *   @return [Boolean] whether types are converted when parsing response data.
 *     Currently only supported for JSON based services. Turning this off may
 *     improve performance on large response payloads. Defaults to `true`.
 *
 * @!attribute correctClockSkew
 *   @return [Boolean] whether to apply a clock skew correction and retry
 *     requests that fail because of an skewed client clock. Defaults to
 *     `false`.
 *
 * @!attribute sslEnabled
 *   @return [Boolean] whether SSL is enabled for requests
 *
 * @!attribute s3ForcePathStyle
 *   @return [Boolean] whether to force path style URLs for S3 objects
 *
 * @!attribute s3BucketEndpoint
 *   @note Setting this configuration option requires an `endpoint` to be
 *     provided explicitly to the service constructor.
 *   @return [Boolean] whether the provided endpoint addresses an individual
 *     bucket (false if it addresses the root API endpoint).
 *
 * @!attribute s3DisableBodySigning
 *   @return [Boolean] whether to disable S3 body signing when using signature version `v4`.
 *     Body signing can only be disabled when using https. Defaults to `true`.
 *
 * @!attribute useAccelerateEndpoint
 *   @note This configuration option is only compatible with S3 while accessing
 *     dns-compatible buckets.
 *   @return [Boolean] Whether to use the Accelerate endpoint with the S3 service.
 *     Defaults to `false`.
 *
 * @!attribute retryDelayOptions
 *   @example Set the base retry delay for all services to 300 ms
 *     AWS.config.update({retryDelayOptions: {base: 300}});
 *     // Delays with maxRetries = 3: 300, 600, 1200
 *   @example Set a custom backoff function to provide delay values on retries
 *     AWS.config.update({retryDelayOptions: {customBackoff: function(retryCount) {
 *       // returns delay in ms
 *     }}});
 *   @return [map] A set of options to configure the retry delay on retryable errors.
 *     Currently supported options are:
 *
 *     * **base** [Integer] &mdash; The base number of milliseconds to use in the
 *       exponential backoff for operation retries. Defaults to 100 ms for all services except
 *       DynamoDB, where it defaults to 50ms.
 *     * **customBackoff ** [function] &mdash; A custom function that accepts a retry count
 *       and returns the amount of time to delay in milliseconds. The `base` option will be
 *       ignored if this option is supplied.
 *
 * @!attribute httpOptions
 *   @return [map] A set of options to pass to the low-level HTTP request.
 *     Currently supported options are:
 *
 *     * **proxy** [String] &mdash; the URL to proxy requests through
 *     * **agent** [http.Agent, https.Agent] &mdash; the Agent object to perform
 *       HTTP requests with. Used for connection pooling. Defaults to the global
 *       agent (`http.globalAgent`) for non-SSL connections. Note that for
 *       SSL connections, a special Agent object is used in order to enable
 *       peer certificate verification. This feature is only supported in the
 *       Node.js environment.
 *     * **timeout** [Integer] &mdash; The number of milliseconds to wait before
 *       giving up on a connection attempt. Defaults to two minutes (120000).
 *     * **xhrAsync** [Boolean] &mdash; Whether the SDK will send asynchronous
 *       HTTP requests. Used in the browser environment only. Set to false to
 *       send requests synchronously. Defaults to true (async on).
 *     * **xhrWithCredentials** [Boolean] &mdash; Sets the "withCredentials"
 *       property of an XMLHttpRequest object. Used in the browser environment
 *       only. Defaults to false.
 * @!attribute logger
 *   @return [#write,#log] an object that responds to .write() (like a stream)
 *     or .log() (like the console object) in order to log information about
 *     requests
 *
 * @!attribute systemClockOffset
 *   @return [Number] an offset value in milliseconds to apply to all signing
 *     times. Use this to compensate for clock skew when your system may be
 *     out of sync with the service time. Note that this configuration option
 *     can only be applied to the global `AWS.config` object and cannot be
 *     overridden in service-specific configuration. Defaults to 0 milliseconds.
 *
 * @!attribute signatureVersion
 *   @return [String] the signature version to sign requests with (overriding
 *     the API configuration). Possible values are: 'v2', 'v3', 'v4'.
 *
 * @!attribute signatureCache
 *   @return [Boolean] whether the signature to sign requests with (overriding
 *     the API configuration) is cached. Only applies to the signature version 'v4'.
 *     Defaults to `true`.
 */
AWS.Config = AWS.util.inherit({
  /**
   * @!endgroup
   */

  /**
   * Creates a new configuration object. This is the object that passes
   * option data along to service requests, including credentials, security,
   * region information, and some service specific settings.
   *
   * @example Creating a new configuration object with credentials and region
   *   var config = new AWS.Config({
   *     accessKeyId: 'AKID', secretAccessKey: 'SECRET', region: 'us-west-2'
   *   });
   * @option options accessKeyId [String] your AWS access key ID.
   * @option options secretAccessKey [String] your AWS secret access key.
   * @option options sessionToken [AWS.Credentials] the optional AWS
   *   session token to sign requests with.
   * @option options credentials [AWS.Credentials] the AWS credentials
   *   to sign requests with. You can either specify this object, or
   *   specify the accessKeyId and secretAccessKey options directly.
   * @option options credentialProvider [AWS.CredentialProviderChain] the
   *   provider chain used to resolve credentials if no static `credentials`
   *   property is set.
   * @option options region [String] the region to send service requests to.
   *   See {region} for more information.
   * @option options maxRetries [Integer] the maximum amount of retries to
   *   attempt with a request. See {maxRetries} for more information.
   * @option options maxRedirects [Integer] the maximum amount of redirects to
   *   follow with a request. See {maxRedirects} for more information.
   * @option options sslEnabled [Boolean] whether to enable SSL for
   *   requests.
   * @option options paramValidation [Boolean|map] whether input parameters
   *   should be validated against the operation description before sending
   *   the request. Defaults to true. Pass a map to enable any of the
   *   following specific validation features:
   *
   *   * **min** [Boolean] &mdash; Validates that a value meets the min
   *     constraint. This is enabled by default when paramValidation is set
   *     to `true`.
   *   * **max** [Boolean] &mdash; Validates that a value meets the max
   *     constraint.
   *   * **pattern** [Boolean] &mdash; Validates that a string value matches a
   *     regular expression.
   *   * **enum** [Boolean] &mdash; Validates that a string value matches one
   *     of the allowable enum values.
   * @option options computeChecksums [Boolean] whether to compute checksums
   *   for payload bodies when the service accepts it (currently supported
   *   in S3 only)
   * @option options convertResponseTypes [Boolean] whether types are converted
   *     when parsing response data. Currently only supported for JSON based
   *     services. Turning this off may improve performance on large response
   *     payloads. Defaults to `true`.
   * @option options correctClockSkew [Boolean] whether to apply a clock skew
   *     correction and retry requests that fail because of an skewed client
   *     clock. Defaults to `false`.
   * @option options s3ForcePathStyle [Boolean] whether to force path
   *   style URLs for S3 objects.
   * @option options s3BucketEndpoint [Boolean] whether the provided endpoint
   *   addresses an individual bucket (false if it addresses the root API
   *   endpoint). Note that setting this configuration option requires an
   *   `endpoint` to be provided explicitly to the service constructor.
   * @option options s3DisableBodySigning [Boolean] whether S3 body signing
   *   should be disabled when using signature version `v4`. Body signing
   *   can only be disabled when using https. Defaults to `true`.
   *
   * @option options retryDelayOptions [map] A set of options to configure
   *   the retry delay on retryable errors. Currently supported options are:
   *
   *   * **base** [Integer] &mdash; The base number of milliseconds to use in the
   *     exponential backoff for operation retries. Defaults to 100 ms for all
   *     services except DynamoDB, where it defaults to 50ms.
   *   * **customBackoff ** [function] &mdash; A custom function that accepts a retry count
   *     and returns the amount of time to delay in milliseconds. The `base` option will be
   *     ignored if this option is supplied.
   * @option options httpOptions [map] A set of options to pass to the low-level
   *   HTTP request. Currently supported options are:
   *
   *   * **proxy** [String] &mdash; the URL to proxy requests through
   *   * **agent** [http.Agent, https.Agent] &mdash; the Agent object to perform
   *     HTTP requests with. Used for connection pooling. Defaults to the global
   *     agent (`http.globalAgent`) for non-SSL connections. Note that for
   *     SSL connections, a special Agent object is used in order to enable
   *     peer certificate verification. This feature is only available in the
   *     Node.js environment.
   *   * **connectTimeout** [Integer] &mdash; Sets the socket to timeout after
   *     failing to establish a connection with the server after
   *     `connectTimeout` milliseconds. This timeout has no effect once a socket
   *     connection has been established.
   *   * **timeout** [Integer] &mdash; Sets the socket to timeout after timeout
   *     milliseconds of inactivity on the socket. Defaults to two minutes
   *     (120000).
   *   * **xhrAsync** [Boolean] &mdash; Whether the SDK will send asynchronous
   *     HTTP requests. Used in the browser environment only. Set to false to
   *     send requests synchronously. Defaults to true (async on).
   *   * **xhrWithCredentials** [Boolean] &mdash; Sets the "withCredentials"
   *     property of an XMLHttpRequest object. Used in the browser environment
   *     only. Defaults to false.
   * @option options apiVersion [String, Date] a String in YYYY-MM-DD format
   *   (or a date) that represents the latest possible API version that can be
   *   used in all services (unless overridden by `apiVersions`). Specify
   *   'latest' to use the latest possible version.
   * @option options apiVersions [map<String, String|Date>] a map of service
   *   identifiers (the lowercase service class name) with the API version to
   *   use when instantiating a service. Specify 'latest' for each individual
   *   that can use the latest available version.
   * @option options logger [#write,#log] an object that responds to .write()
   *   (like a stream) or .log() (like the console object) in order to log
   *   information about requests
   * @option options systemClockOffset [Number] an offset value in milliseconds
   *   to apply to all signing times. Use this to compensate for clock skew
   *   when your system may be out of sync with the service time. Note that
   *   this configuration option can only be applied to the global `AWS.config`
   *   object and cannot be overridden in service-specific configuration.
   *   Defaults to 0 milliseconds.
   * @option options signatureVersion [String] the signature version to sign
   *   requests with (overriding the API configuration). Possible values are:
   *   'v2', 'v3', 'v4'.
   * @option options signatureCache [Boolean] whether the signature to sign
   *   requests with (overriding the API configuration) is cached. Only applies
   *   to the signature version 'v4'. Defaults to `true`.
   * @option options dynamoDbCrc32 [Boolean] whether to validate the CRC32
   *   checksum of HTTP response bodies returned by DynamoDB. Default: `true`.
   */
  constructor: function Config(options) {
    if (options === undefined) options = {};
    options = this.extractCredentials(options);

    AWS.util.each.call(this, this.keys, function (key, value) {
      this.set(key, options[key], value);
    });
  },

  /**
   * @!group Managing Credentials
   */

  /**
   * Loads credentials from the configuration object. This is used internally
   * by the SDK to ensure that refreshable {Credentials} objects are properly
   * refreshed and loaded when sending a request. If you want to ensure that
   * your credentials are loaded prior to a request, you can use this method
   * directly to provide accurate credential data stored in the object.
   *
   * @note If you configure the SDK with static or environment credentials,
   *   the credential data should already be present in {credentials} attribute.
   *   This method is primarily necessary to load credentials from asynchronous
   *   sources, or sources that can refresh credentials periodically.
   * @example Getting your access key
   *   AWS.config.getCredentials(function(err) {
   *     if (err) console.log(err.stack); // credentials not loaded
   *     else console.log("Access Key:", AWS.config.credentials.accessKeyId);
   *   })
   * @callback callback function(err)
   *   Called when the {credentials} have been properly set on the configuration
   *   object.
   *
   *   @param err [Error] if this is set, credentials were not successfully
   *     loaded and this error provides information why.
   * @see credentials
   * @see Credentials
   */
  getCredentials: function getCredentials(callback) {
    var self = this;

    function finish(err) {
      callback(err, err ? null : self.credentials);
    }

    function credError(msg, err) {
      return new AWS.util.error(err || new Error(), {
        code: 'CredentialsError',
        message: msg,
        name: 'CredentialsError'
      });
    }

    function getAsyncCredentials() {
      self.credentials.get(function(err) {
        if (err) {
          var msg = 'Could not load credentials from ' +
            self.credentials.constructor.name;
          err = credError(msg, err);
        }
        finish(err);
      });
    }

    function getStaticCredentials() {
      var err = null;
      if (!self.credentials.accessKeyId || !self.credentials.secretAccessKey) {
        err = credError('Missing credentials');
      }
      finish(err);
    }

    if (self.credentials) {
      if (typeof self.credentials.get === 'function') {
        getAsyncCredentials();
      } else { // static credentials
        getStaticCredentials();
      }
    } else if (self.credentialProvider) {
      self.credentialProvider.resolve(function(err, creds) {
        if (err) {
          err = credError('Could not load credentials from any providers', err);
        }
        self.credentials = creds;
        finish(err);
      });
    } else {
      finish(credError('No credentials to load'));
    }
  },

  /**
   * @!group Loading and Setting Configuration Options
   */

  /**
   * @overload update(options, allowUnknownKeys = false)
   *   Updates the current configuration object with new options.
   *
   *   @example Update maxRetries property of a configuration object
   *     config.update({maxRetries: 10});
   *   @param [Object] options a map of option keys and values.
   *   @param [Boolean] allowUnknownKeys whether unknown keys can be set on
   *     the configuration object. Defaults to `false`.
   *   @see constructor
   */
  update: function update(options, allowUnknownKeys) {
    allowUnknownKeys = allowUnknownKeys || false;
    options = this.extractCredentials(options);
    AWS.util.each.call(this, options, function (key, value) {
      if (allowUnknownKeys || Object.prototype.hasOwnProperty.call(this.keys, key) ||
          AWS.Service.hasService(key)) {
        this.set(key, value);
      }
    });
  },

  /**
   * Loads configuration data from a JSON file into this config object.
   * @note Loading configuration will reset all existing configuration
   *   on the object.
   * @!macro nobrowser
   * @param path [String] the path relative to your process's current
   *    working directory to load configuration from.
   * @return [AWS.Config] the same configuration object
   */
  loadFromPath: function loadFromPath(path) {
    this.clear();

    var options = JSON.parse(AWS.util.readFileSync(path));
    var fileSystemCreds = new AWS.FileSystemCredentials(path);
    var chain = new AWS.CredentialProviderChain();
    chain.providers.unshift(fileSystemCreds);
    chain.resolve(function (err, creds) {
      if (err) throw err;
      else options.credentials = creds;
    });

    this.constructor(options);

    return this;
  },

  /**
   * Clears configuration data on this object
   *
   * @api private
   */
  clear: function clear() {
    /*jshint forin:false */
    AWS.util.each.call(this, this.keys, function (key) {
      delete this[key];
    });

    // reset credential provider
    this.set('credentials', undefined);
    this.set('credentialProvider', undefined);
  },

  /**
   * Sets a property on the configuration object, allowing for a
   * default value
   * @api private
   */
  set: function set(property, value, defaultValue) {
    if (value === undefined) {
      if (defaultValue === undefined) {
        defaultValue = this.keys[property];
      }
      if (typeof defaultValue === 'function') {
        this[property] = defaultValue.call(this);
      } else {
        this[property] = defaultValue;
      }
    } else if (property === 'httpOptions' && this[property]) {
      // deep merge httpOptions
      this[property] = AWS.util.merge(this[property], value);
    } else {
      this[property] = value;
    }
  },

  /**
   * All of the keys with their default values.
   *
   * @constant
   * @api private
   */
  keys: {
    credentials: null,
    credentialProvider: null,
    region: null,
    logger: null,
    apiVersions: {},
    apiVersion: null,
    endpoint: undefined,
    httpOptions: {
      timeout: 120000
    },
    maxRetries: undefined,
    maxRedirects: 10,
    paramValidation: true,
    sslEnabled: true,
    s3ForcePathStyle: false,
    s3BucketEndpoint: false,
    s3DisableBodySigning: true,
    computeChecksums: true,
    convertResponseTypes: true,
    correctClockSkew: false,
    customUserAgent: null,
    dynamoDbCrc32: true,
    systemClockOffset: 0,
    signatureVersion: null,
    signatureCache: true,
    retryDelayOptions: {},
    useAccelerateEndpoint: false
  },

  /**
   * Extracts accessKeyId, secretAccessKey and sessionToken
   * from a configuration hash.
   *
   * @api private
   */
  extractCredentials: function extractCredentials(options) {
    if (options.accessKeyId && options.secretAccessKey) {
      options = AWS.util.copy(options);
      options.credentials = new AWS.Credentials(options);
    }
    return options;
  },

  /**
   * Sets the promise dependency the SDK will use wherever Promises are returned.
   * Passing `null` will force the SDK to use native Promises if they are available.
   * If native Promises are not available, passing `null` will have no effect.
   * @param [Constructor] dep A reference to a Promise constructor
   */
  setPromisesDependency: function setPromisesDependency(dep) {
    PromisesDependency = dep;
    // if null was passed in, we should try to use native promises
    if (dep === null && typeof Promise === 'function') {
      PromisesDependency = Promise;
    }
    var constructors = [AWS.Request, AWS.Credentials, AWS.CredentialProviderChain];
    if (AWS.S3 && AWS.S3.ManagedUpload) constructors.push(AWS.S3.ManagedUpload);
    AWS.util.addPromises(constructors, PromisesDependency);
  },

  /**
   * Gets the promise dependency set by `AWS.config.setPromisesDependency`.
   */
  getPromisesDependency: function getPromisesDependency() {
    return PromisesDependency;
  }
});

/**
 * @return [AWS.Config] The global configuration object singleton instance
 * @readonly
 * @see AWS.Config
 */
AWS.config = new AWS.Config();


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var SequentialExecutor = __webpack_require__(78);
/**
 * The namespace used to register global event listeners for request building
 * and sending.
 */
AWS.EventListeners = {
  /**
   * @!attribute VALIDATE_CREDENTIALS
   *   A request listener that validates whether the request is being
   *   sent with credentials.
   *   Handles the {AWS.Request~validate 'validate' Request event}
   *   @example Sending a request without validating credentials
   *     var listener = AWS.EventListeners.Core.VALIDATE_CREDENTIALS;
   *     request.removeListener('validate', listener);
   *   @readonly
   *   @return [Function]
   * @!attribute VALIDATE_REGION
   *   A request listener that validates whether the region is set
   *   for a request.
   *   Handles the {AWS.Request~validate 'validate' Request event}
   *   @example Sending a request without validating region configuration
   *     var listener = AWS.EventListeners.Core.VALIDATE_REGION;
   *     request.removeListener('validate', listener);
   *   @readonly
   *   @return [Function]
   * @!attribute VALIDATE_PARAMETERS
   *   A request listener that validates input parameters in a request.
   *   Handles the {AWS.Request~validate 'validate' Request event}
   *   @example Sending a request without validating parameters
   *     var listener = AWS.EventListeners.Core.VALIDATE_PARAMETERS;
   *     request.removeListener('validate', listener);
   *   @example Disable parameter validation globally
   *     AWS.EventListeners.Core.removeListener('validate',
   *       AWS.EventListeners.Core.VALIDATE_REGION);
   *   @readonly
   *   @return [Function]
   * @!attribute SEND
   *   A request listener that initiates the HTTP connection for a
   *   request being sent. Handles the {AWS.Request~send 'send' Request event}
   *   @example Replacing the HTTP handler
   *     var listener = AWS.EventListeners.Core.SEND;
   *     request.removeListener('send', listener);
   *     request.on('send', function(response) {
   *       customHandler.send(response);
   *     });
   *   @return [Function]
   *   @readonly
   * @!attribute HTTP_DATA
   *   A request listener that reads data from the HTTP connection in order
   *   to build the response data.
   *   Handles the {AWS.Request~httpData 'httpData' Request event}.
   *   Remove this handler if you are overriding the 'httpData' event and
   *   do not want extra data processing and buffering overhead.
   *   @example Disabling default data processing
   *     var listener = AWS.EventListeners.Core.HTTP_DATA;
   *     request.removeListener('httpData', listener);
   *   @return [Function]
   *   @readonly
   */
  Core: {} /* doc hack */
};

/**
 * @api private
 */
function getOperationAuthtype(req) {
  if (!req.service.api.operations) {
    return '';
  }
  var operation = req.service.api.operations[req.operation];
  return operation ? operation.authtype : '';
}

AWS.EventListeners = {
  Core: new SequentialExecutor().addNamedListeners(function(add, addAsync) {
    addAsync('VALIDATE_CREDENTIALS', 'validate',
        function VALIDATE_CREDENTIALS(req, done) {
      if (!req.service.api.signatureVersion) return done(); // none
      req.service.config.getCredentials(function(err) {
        if (err) {
          req.response.error = AWS.util.error(err,
            {code: 'CredentialsError', message: 'Missing credentials in config'});
        }
        done();
      });
    });

    add('VALIDATE_REGION', 'validate', function VALIDATE_REGION(req) {
      if (!req.service.config.region && !req.service.isGlobalEndpoint) {
        req.response.error = AWS.util.error(new Error(),
          {code: 'ConfigError', message: 'Missing region in config'});
      }
    });

    add('BUILD_IDEMPOTENCY_TOKENS', 'validate', function BUILD_IDEMPOTENCY_TOKENS(req) {
      if (!req.service.api.operations) {
        return;
      }
      var operation = req.service.api.operations[req.operation];
      if (!operation) {
        return;
      }
      var idempotentMembers = operation.idempotentMembers;
      if (!idempotentMembers.length) {
        return;
      }
      // creates a copy of params so user's param object isn't mutated
      var params = AWS.util.copy(req.params);
      for (var i = 0, iLen = idempotentMembers.length; i < iLen; i++) {
        if (!params[idempotentMembers[i]]) {
          // add the member
          params[idempotentMembers[i]] = AWS.util.uuid.v4();
        }
      }
      req.params = params;
    });

    add('VALIDATE_PARAMETERS', 'validate', function VALIDATE_PARAMETERS(req) {
      if (!req.service.api.operations) {
        return;
      }
      var rules = req.service.api.operations[req.operation].input;
      var validation = req.service.config.paramValidation;
      new AWS.ParamValidator(validation).validate(rules, req.params);
    });

    addAsync('COMPUTE_SHA256', 'afterBuild', function COMPUTE_SHA256(req, done) {
      req.haltHandlersOnError();
      if (!req.service.api.operations) {
        return;
      }
      var operation = req.service.api.operations[req.operation];
      var authtype = operation ? operation.authtype : '';
      if (!req.service.api.signatureVersion && !authtype) return done(); // none
      if (req.service.getSignerClass(req) === AWS.Signers.V4) {
        var body = req.httpRequest.body || '';
        if (authtype.indexOf('unsigned-body') >= 0) {
          req.httpRequest.headers['X-Amz-Content-Sha256'] = 'UNSIGNED-PAYLOAD';
          return done();
        }
        AWS.util.computeSha256(body, function(err, sha) {
          if (err) {
            done(err);
          }
          else {
            req.httpRequest.headers['X-Amz-Content-Sha256'] = sha;
            done();
          }
        });
      } else {
        done();
      }
    });

    add('SET_CONTENT_LENGTH', 'afterBuild', function SET_CONTENT_LENGTH(req) {
      var authtype = getOperationAuthtype(req);
      if (req.httpRequest.headers['Content-Length'] === undefined
          && authtype.indexOf('unsigned-body') === -1) {
        var length = AWS.util.string.byteLength(req.httpRequest.body);
        req.httpRequest.headers['Content-Length'] = length;
      }
    });

    add('SET_HTTP_HOST', 'afterBuild', function SET_HTTP_HOST(req) {
      req.httpRequest.headers['Host'] = req.httpRequest.endpoint.host;
    });

    add('RESTART', 'restart', function RESTART() {
      var err = this.response.error;
      if (!err || !err.retryable) return;

      this.httpRequest = new AWS.HttpRequest(
        this.service.endpoint,
        this.service.region
      );

      if (this.response.retryCount < this.service.config.maxRetries) {
        this.response.retryCount++;
      } else {
        this.response.error = null;
      }
    });

    addAsync('SIGN', 'sign', function SIGN(req, done) {
      var service = req.service;
      var operations = req.service.api.operations || {};
      var operation = operations[req.operation];
      var authtype = operation ? operation.authtype : '';
      if (!service.api.signatureVersion && !authtype) return done(); // none

      service.config.getCredentials(function (err, credentials) {
        if (err) {
          req.response.error = err;
          return done();
        }

        try {
          var date = AWS.util.date.getDate();
          var SignerClass = service.getSignerClass(req);
          var signer = new SignerClass(req.httpRequest,
            service.api.signingName || service.api.endpointPrefix,
            {
              signatureCache: service.config.signatureCache,
              operation: operation
            });
          signer.setServiceClientId(service._clientId);

          // clear old authorization headers
          delete req.httpRequest.headers['Authorization'];
          delete req.httpRequest.headers['Date'];
          delete req.httpRequest.headers['X-Amz-Date'];

          // add new authorization
          signer.addAuthorization(credentials, date);
          req.signedAt = date;
        } catch (e) {
          req.response.error = e;
        }
        done();
      });
    });

    add('VALIDATE_RESPONSE', 'validateResponse', function VALIDATE_RESPONSE(resp) {
      if (this.service.successfulResponse(resp, this)) {
        resp.data = {};
        resp.error = null;
      } else {
        resp.data = null;
        resp.error = AWS.util.error(new Error(),
          {code: 'UnknownError', message: 'An unknown error occurred.'});
      }
    });

    addAsync('SEND', 'send', function SEND(resp, done) {
      resp.httpResponse._abortCallback = done;
      resp.error = null;
      resp.data = null;

      function callback(httpResp) {
        resp.httpResponse.stream = httpResp;
        var stream = resp.request.httpRequest.stream;

        httpResp.on('headers', function onHeaders(statusCode, headers, statusMessage) {
          resp.request.emit(
            'httpHeaders',
            [statusCode, headers, resp, statusMessage]
          );

          if (!resp.httpResponse.streaming) {
            if (AWS.HttpClient.streamsApiVersion === 2) { // streams2 API check
              httpResp.on('readable', function onReadable() {
                var data = httpResp.read();
                if (data !== null) {
                  resp.request.emit('httpData', [data, resp]);
                }
              });
            } else { // legacy streams API
              httpResp.on('data', function onData(data) {
                resp.request.emit('httpData', [data, resp]);
              });
            }
          }
        });

        httpResp.on('end', function onEnd() {
          if (!stream || !stream.didCallback) {
            resp.request.emit('httpDone');
            done();
          }
        });
      }

      function progress(httpResp) {
        httpResp.on('sendProgress', function onSendProgress(value) {
          resp.request.emit('httpUploadProgress', [value, resp]);
        });

        httpResp.on('receiveProgress', function onReceiveProgress(value) {
          resp.request.emit('httpDownloadProgress', [value, resp]);
        });
      }

      function error(err) {
        if (err.code !== 'RequestAbortedError') {
          var errCode = err.code === 'TimeoutError' ? err.code : 'NetworkingError';
          err = AWS.util.error(err, {
            code: errCode,
            region: resp.request.httpRequest.region,
            hostname: resp.request.httpRequest.endpoint.hostname,
            retryable: true
          });
        }
        resp.error = err;
        resp.request.emit('httpError', [resp.error, resp], function() {
          done();
        });
      }

      function executeSend() {
        var http = AWS.HttpClient.getInstance();
        var httpOptions = resp.request.service.config.httpOptions || {};
        try {
          var stream = http.handleRequest(resp.request.httpRequest, httpOptions,
                                          callback, error);
          progress(stream);
        } catch (err) {
          error(err);
        }
      }

      var timeDiff = (AWS.util.date.getDate() - this.signedAt) / 1000;
      if (timeDiff >= 60 * 10) { // if we signed 10min ago, re-sign
        this.emit('sign', [this], function(err) {
          if (err) done(err);
          else executeSend();
        });
      } else {
        executeSend();
      }
    });

    add('HTTP_HEADERS', 'httpHeaders',
        function HTTP_HEADERS(statusCode, headers, resp, statusMessage) {
      resp.httpResponse.statusCode = statusCode;
      resp.httpResponse.statusMessage = statusMessage;
      resp.httpResponse.headers = headers;
      resp.httpResponse.body = new AWS.util.Buffer('');
      resp.httpResponse.buffers = [];
      resp.httpResponse.numBytes = 0;
      var dateHeader = headers.date || headers.Date;
      if (dateHeader) {
        var serverTime = Date.parse(dateHeader);
        if (resp.request.service.config.correctClockSkew
            && AWS.util.isClockSkewed(serverTime)) {
          AWS.util.applyClockOffset(serverTime);
        }
      }
    });

    add('HTTP_DATA', 'httpData', function HTTP_DATA(chunk, resp) {
      if (chunk) {
        if (AWS.util.isNode()) {
          resp.httpResponse.numBytes += chunk.length;

          var total = resp.httpResponse.headers['content-length'];
          var progress = { loaded: resp.httpResponse.numBytes, total: total };
          resp.request.emit('httpDownloadProgress', [progress, resp]);
        }

        resp.httpResponse.buffers.push(new AWS.util.Buffer(chunk));
      }
    });

    add('HTTP_DONE', 'httpDone', function HTTP_DONE(resp) {
      // convert buffers array into single buffer
      if (resp.httpResponse.buffers && resp.httpResponse.buffers.length > 0) {
        var body = AWS.util.buffer.concat(resp.httpResponse.buffers);
        resp.httpResponse.body = body;
      }
      delete resp.httpResponse.numBytes;
      delete resp.httpResponse.buffers;
    });

    add('FINALIZE_ERROR', 'retry', function FINALIZE_ERROR(resp) {
      if (resp.httpResponse.statusCode) {
        resp.error.statusCode = resp.httpResponse.statusCode;
        if (resp.error.retryable === undefined) {
          resp.error.retryable = this.service.retryableError(resp.error, this);
        }
      }
    });

    add('INVALIDATE_CREDENTIALS', 'retry', function INVALIDATE_CREDENTIALS(resp) {
      if (!resp.error) return;
      switch (resp.error.code) {
        case 'RequestExpired': // EC2 only
        case 'ExpiredTokenException':
        case 'ExpiredToken':
          resp.error.retryable = true;
          resp.request.service.config.credentials.expired = true;
      }
    });

    add('EXPIRED_SIGNATURE', 'retry', function EXPIRED_SIGNATURE(resp) {
      var err = resp.error;
      if (!err) return;
      if (typeof err.code === 'string' && typeof err.message === 'string') {
        if (err.code.match(/Signature/) && err.message.match(/expired/)) {
          resp.error.retryable = true;
        }
      }
    });

    add('CLOCK_SKEWED', 'retry', function CLOCK_SKEWED(resp) {
      if (!resp.error) return;
      if (this.service.clockSkewError(resp.error)
          && this.service.config.correctClockSkew
          && AWS.config.isClockSkewed) {
        resp.error.retryable = true;
      }
    });

    add('REDIRECT', 'retry', function REDIRECT(resp) {
      if (resp.error && resp.error.statusCode >= 300 &&
          resp.error.statusCode < 400 && resp.httpResponse.headers['location']) {
        this.httpRequest.endpoint =
          new AWS.Endpoint(resp.httpResponse.headers['location']);
        this.httpRequest.headers['Host'] = this.httpRequest.endpoint.host;
        resp.error.redirect = true;
        resp.error.retryable = true;
      }
    });

    add('RETRY_CHECK', 'retry', function RETRY_CHECK(resp) {
      if (resp.error) {
        if (resp.error.redirect && resp.redirectCount < resp.maxRedirects) {
          resp.error.retryDelay = 0;
        } else if (resp.retryCount < resp.maxRetries) {
          resp.error.retryDelay = this.service.retryDelays(resp.retryCount) || 0;
        }
      }
    });

    addAsync('RESET_RETRY_STATE', 'afterRetry', function RESET_RETRY_STATE(resp, done) {
      var delay, willRetry = false;

      if (resp.error) {
        delay = resp.error.retryDelay || 0;
        if (resp.error.retryable && resp.retryCount < resp.maxRetries) {
          resp.retryCount++;
          willRetry = true;
        } else if (resp.error.redirect && resp.redirectCount < resp.maxRedirects) {
          resp.redirectCount++;
          willRetry = true;
        }
      }

      if (willRetry) {
        resp.error = null;
        setTimeout(done, delay);
      } else {
        done();
      }
    });
  }),

  CorePost: new SequentialExecutor().addNamedListeners(function(add) {
    add('EXTRACT_REQUEST_ID', 'extractData', AWS.util.extractRequestId);
    add('EXTRACT_REQUEST_ID', 'extractError', AWS.util.extractRequestId);

    add('ENOTFOUND_ERROR', 'httpError', function ENOTFOUND_ERROR(err) {
      if (err.code === 'NetworkingError' && err.errno === 'ENOTFOUND') {
        var message = 'Inaccessible host: `' + err.hostname +
          '\'. This service may not be available in the `' + err.region +
          '\' region.';
        this.response.error = AWS.util.error(new Error(message), {
          code: 'UnknownEndpoint',
          region: err.region,
          hostname: err.hostname,
          retryable: true,
          originalError: err
        });
      }
    });
  }),

  Logger: new SequentialExecutor().addNamedListeners(function(add) {
    add('LOG_REQUEST', 'complete', function LOG_REQUEST(resp) {
      var req = resp.request;
      var logger = req.service.config.logger;
      if (!logger) return;

      function buildMessage() {
        var time = AWS.util.date.getDate().getTime();
        var delta = (time - req.startTime.getTime()) / 1000;
        var ansi = logger.isTTY ? true : false;
        var status = resp.httpResponse.statusCode;
        var params = __webpack_require__(200).inspect(req.params, true, null);

        var message = '';
        if (ansi) message += '\x1B[33m';
        message += '[AWS ' + req.service.serviceIdentifier + ' ' + status;
        message += ' ' + delta.toString() + 's ' + resp.retryCount + ' retries]';
        if (ansi) message += '\x1B[0;1m';
        message += ' ' + AWS.util.string.lowerFirst(req.operation);
        message += '(' + params + ')';
        if (ansi) message += '\x1B[0m';
        return message;
      }

      var line = buildMessage();
      if (typeof logger.log === 'function') {
        logger.log(line);
      } else if (typeof logger.write === 'function') {
        logger.write(line + '\n');
      }
    });
  }),

  Json: new SequentialExecutor().addNamedListeners(function(add) {
    var svc = __webpack_require__(26);
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  }),

  Rest: new SequentialExecutor().addNamedListeners(function(add) {
    var svc = __webpack_require__(16);
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  }),

  RestJson: new SequentialExecutor().addNamedListeners(function(add) {
    var svc = __webpack_require__(47);
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  }),

  RestXml: new SequentialExecutor().addNamedListeners(function(add) {
    var svc = __webpack_require__(48);
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  }),

  Query: new SequentialExecutor().addNamedListeners(function(add) {
    var svc = __webpack_require__(45);
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  })
};


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(201);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(202);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(15)))

/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 202 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var AWS = __webpack_require__(0);
var AcceptorStateMachine = __webpack_require__(204);
var inherit = AWS.util.inherit;
var domain = AWS.util.domain;
var jmespath = __webpack_require__(41);

/**
 * @api private
 */
var hardErrorStates = {success: 1, error: 1, complete: 1};

function isTerminalState(machine) {
  return Object.prototype.hasOwnProperty.call(hardErrorStates, machine._asm.currentState);
}

var fsm = new AcceptorStateMachine();
fsm.setupStates = function() {
  var transition = function(_, done) {
    var self = this;
    self._haltHandlersOnError = false;

    self.emit(self._asm.currentState, function(err) {
      if (err) {
        if (isTerminalState(self)) {
          if (domain && self.domain instanceof domain.Domain) {
            err.domainEmitter = self;
            err.domain = self.domain;
            err.domainThrown = false;
            self.domain.emit('error', err);
          } else {
            throw err;
          }
        } else {
          self.response.error = err;
          done(err);
        }
      } else {
        done(self.response.error);
      }
    });

  };

  this.addState('validate', 'build', 'error', transition);
  this.addState('build', 'afterBuild', 'restart', transition);
  this.addState('afterBuild', 'sign', 'restart', transition);
  this.addState('sign', 'send', 'retry', transition);
  this.addState('retry', 'afterRetry', 'afterRetry', transition);
  this.addState('afterRetry', 'sign', 'error', transition);
  this.addState('send', 'validateResponse', 'retry', transition);
  this.addState('validateResponse', 'extractData', 'extractError', transition);
  this.addState('extractError', 'extractData', 'retry', transition);
  this.addState('extractData', 'success', 'retry', transition);
  this.addState('restart', 'build', 'error', transition);
  this.addState('success', 'complete', 'complete', transition);
  this.addState('error', 'complete', 'complete', transition);
  this.addState('complete', null, null, transition);
};
fsm.setupStates();

/**
 * ## Asynchronous Requests
 *
 * All requests made through the SDK are asynchronous and use a
 * callback interface. Each service method that kicks off a request
 * returns an `AWS.Request` object that you can use to register
 * callbacks.
 *
 * For example, the following service method returns the request
 * object as "request", which can be used to register callbacks:
 *
 * ```javascript
 * // request is an AWS.Request object
 * var request = ec2.describeInstances();
 *
 * // register callbacks on request to retrieve response data
 * request.on('success', function(response) {
 *   console.log(response.data);
 * });
 * ```
 *
 * When a request is ready to be sent, the {send} method should
 * be called:
 *
 * ```javascript
 * request.send();
 * ```
 *
 * Since registered callbacks may or may not be idempotent, requests should only
 * be sent once. To perform the same operation multiple times, you will need to
 * create multiple request objects, each with its own registered callbacks.
 *
 * ## Removing Default Listeners for Events
 *
 * Request objects are built with default listeners for the various events,
 * depending on the service type. In some cases, you may want to remove
 * some built-in listeners to customize behaviour. Doing this requires
 * access to the built-in listener functions, which are exposed through
 * the {AWS.EventListeners.Core} namespace. For instance, you may
 * want to customize the HTTP handler used when sending a request. In this
 * case, you can remove the built-in listener associated with the 'send'
 * event, the {AWS.EventListeners.Core.SEND} listener and add your own.
 *
 * ## Multiple Callbacks and Chaining
 *
 * You can register multiple callbacks on any request object. The
 * callbacks can be registered for different events, or all for the
 * same event. In addition, you can chain callback registration, for
 * example:
 *
 * ```javascript
 * request.
 *   on('success', function(response) {
 *     console.log("Success!");
 *   }).
 *   on('error', function(response) {
 *     console.log("Error!");
 *   }).
 *   on('complete', function(response) {
 *     console.log("Always!");
 *   }).
 *   send();
 * ```
 *
 * The above example will print either "Success! Always!", or "Error! Always!",
 * depending on whether the request succeeded or not.
 *
 * @!attribute httpRequest
 *   @readonly
 *   @!group HTTP Properties
 *   @return [AWS.HttpRequest] the raw HTTP request object
 *     containing request headers and body information
 *     sent by the service.
 *
 * @!attribute startTime
 *   @readonly
 *   @!group Operation Properties
 *   @return [Date] the time that the request started
 *
 * @!group Request Building Events
 *
 * @!event validate(request)
 *   Triggered when a request is being validated. Listeners
 *   should throw an error if the request should not be sent.
 *   @param request [Request] the request object being sent
 *   @see AWS.EventListeners.Core.VALIDATE_CREDENTIALS
 *   @see AWS.EventListeners.Core.VALIDATE_REGION
 *   @example Ensuring that a certain parameter is set before sending a request
 *     var req = s3.putObject(params);
 *     req.on('validate', function() {
 *       if (!req.params.Body.match(/^Hello\s/)) {
 *         throw new Error('Body must start with "Hello "');
 *       }
 *     });
 *     req.send(function(err, data) { ... });
 *
 * @!event build(request)
 *   Triggered when the request payload is being built. Listeners
 *   should fill the necessary information to send the request
 *   over HTTP.
 *   @param (see AWS.Request~validate)
 *   @example Add a custom HTTP header to a request
 *     var req = s3.putObject(params);
 *     req.on('build', function() {
 *       req.httpRequest.headers['Custom-Header'] = 'value';
 *     });
 *     req.send(function(err, data) { ... });
 *
 * @!event sign(request)
 *   Triggered when the request is being signed. Listeners should
 *   add the correct authentication headers and/or adjust the body,
 *   depending on the authentication mechanism being used.
 *   @param (see AWS.Request~validate)
 *
 * @!group Request Sending Events
 *
 * @!event send(response)
 *   Triggered when the request is ready to be sent. Listeners
 *   should call the underlying transport layer to initiate
 *   the sending of the request.
 *   @param response [Response] the response object
 *   @context [Request] the request object that was sent
 *   @see AWS.EventListeners.Core.SEND
 *
 * @!event retry(response)
 *   Triggered when a request failed and might need to be retried or redirected.
 *   If the response is retryable, the listener should set the
 *   `response.error.retryable` property to `true`, and optionally set
 *   `response.error.retryDelay` to the millisecond delay for the next attempt.
 *   In the case of a redirect, `response.error.redirect` should be set to
 *   `true` with `retryDelay` set to an optional delay on the next request.
 *
 *   If a listener decides that a request should not be retried,
 *   it should set both `retryable` and `redirect` to false.
 *
 *   Note that a retryable error will be retried at most
 *   {AWS.Config.maxRetries} times (based on the service object's config).
 *   Similarly, a request that is redirected will only redirect at most
 *   {AWS.Config.maxRedirects} times.
 *
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *   @example Adding a custom retry for a 404 response
 *     request.on('retry', function(response) {
 *       // this resource is not yet available, wait 10 seconds to get it again
 *       if (response.httpResponse.statusCode === 404 && response.error) {
 *         response.error.retryable = true;   // retry this error
 *         response.error.retryDelay = 10000; // wait 10 seconds
 *       }
 *     });
 *
 * @!group Data Parsing Events
 *
 * @!event extractError(response)
 *   Triggered on all non-2xx requests so that listeners can extract
 *   error details from the response body. Listeners to this event
 *   should set the `response.error` property.
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *
 * @!event extractData(response)
 *   Triggered in successful requests to allow listeners to
 *   de-serialize the response body into `response.data`.
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *
 * @!group Completion Events
 *
 * @!event success(response)
 *   Triggered when the request completed successfully.
 *   `response.data` will contain the response data and
 *   `response.error` will be null.
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *
 * @!event error(error, response)
 *   Triggered when an error occurs at any point during the
 *   request. `response.error` will contain details about the error
 *   that occurred. `response.data` will be null.
 *   @param error [Error] the error object containing details about
 *     the error that occurred.
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *
 * @!event complete(response)
 *   Triggered whenever a request cycle completes. `response.error`
 *   should be checked, since the request may have failed.
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *
 * @!group HTTP Events
 *
 * @!event httpHeaders(statusCode, headers, response, statusMessage)
 *   Triggered when headers are sent by the remote server
 *   @param statusCode [Integer] the HTTP response code
 *   @param headers [map<String,String>] the response headers
 *   @param (see AWS.Request~send)
 *   @param statusMessage [String] A status message corresponding to the HTTP
 *                                 response code
 *   @context (see AWS.Request~send)
 *
 * @!event httpData(chunk, response)
 *   Triggered when data is sent by the remote server
 *   @param chunk [Buffer] the buffer data containing the next data chunk
 *     from the server
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *   @see AWS.EventListeners.Core.HTTP_DATA
 *
 * @!event httpUploadProgress(progress, response)
 *   Triggered when the HTTP request has uploaded more data
 *   @param progress [map] An object containing the `loaded` and `total` bytes
 *     of the request.
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *   @note This event will not be emitted in Node.js 0.8.x.
 *
 * @!event httpDownloadProgress(progress, response)
 *   Triggered when the HTTP request has downloaded more data
 *   @param progress [map] An object containing the `loaded` and `total` bytes
 *     of the request.
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *   @note This event will not be emitted in Node.js 0.8.x.
 *
 * @!event httpError(error, response)
 *   Triggered when the HTTP request failed
 *   @param error [Error] the error object that was thrown
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *
 * @!event httpDone(response)
 *   Triggered when the server is finished sending data
 *   @param (see AWS.Request~send)
 *   @context (see AWS.Request~send)
 *
 * @see AWS.Response
 */
AWS.Request = inherit({

  /**
   * Creates a request for an operation on a given service with
   * a set of input parameters.
   *
   * @param service [AWS.Service] the service to perform the operation on
   * @param operation [String] the operation to perform on the service
   * @param params [Object] parameters to send to the operation.
   *   See the operation's documentation for the format of the
   *   parameters.
   */
  constructor: function Request(service, operation, params) {
    var endpoint = service.endpoint;
    var region = service.config.region;
    var customUserAgent = service.config.customUserAgent;

    // global endpoints sign as us-east-1
    if (service.isGlobalEndpoint) region = 'us-east-1';

    this.domain = domain && domain.active;
    this.service = service;
    this.operation = operation;
    this.params = params || {};
    this.httpRequest = new AWS.HttpRequest(endpoint, region);
    this.httpRequest.appendToUserAgent(customUserAgent);
    this.startTime = AWS.util.date.getDate();

    this.response = new AWS.Response(this);
    this._asm = new AcceptorStateMachine(fsm.states, 'validate');
    this._haltHandlersOnError = false;

    AWS.SequentialExecutor.call(this);
    this.emit = this.emitEvent;
  },

  /**
   * @!group Sending a Request
   */

  /**
   * @overload send(callback = null)
   *   Sends the request object.
   *
   *   @callback callback function(err, data)
   *     If a callback is supplied, it is called when a response is returned
   *     from the service.
   *     @context [AWS.Request] the request object being sent.
   *     @param err [Error] the error object returned from the request.
   *       Set to `null` if the request is successful.
   *     @param data [Object] the de-serialized data returned from
   *       the request. Set to `null` if a request error occurs.
   *   @example Sending a request with a callback
   *     request = s3.putObject({Bucket: 'bucket', Key: 'key'});
   *     request.send(function(err, data) { console.log(err, data); });
   *   @example Sending a request with no callback (using event handlers)
   *     request = s3.putObject({Bucket: 'bucket', Key: 'key'});
   *     request.on('complete', function(response) { ... }); // register a callback
   *     request.send();
   */
  send: function send(callback) {
    if (callback) {
      // append to user agent
      this.httpRequest.appendToUserAgent('callback');
      this.on('complete', function (resp) {
        callback.call(resp, resp.error, resp.data);
      });
    }
    this.runTo();

    return this.response;
  },

  /**
   * @!method  promise()
   *   Sends the request and returns a 'thenable' promise.
   *
   *   Two callbacks can be provided to the `then` method on the returned promise.
   *   The first callback will be called if the promise is fulfilled, and the second
   *   callback will be called if the promise is rejected.
   *   @callback fulfilledCallback function(data)
   *     Called if the promise is fulfilled.
   *     @param data [Object] the de-serialized data returned from the request.
   *   @callback rejectedCallback function(error)
   *     Called if the promise is rejected.
   *     @param error [Error] the error object returned from the request.
   *   @return [Promise] A promise that represents the state of the request.
   *   @example Sending a request using promises.
   *     var request = s3.putObject({Bucket: 'bucket', Key: 'key'});
   *     var result = request.promise();
   *     result.then(function(data) { ... }, function(error) { ... });
   */

  /**
   * @api private
   */
  build: function build(callback) {
    return this.runTo('send', callback);
  },

  /**
   * @api private
   */
  runTo: function runTo(state, done) {
    this._asm.runTo(state, done, this);
    return this;
  },

  /**
   * Aborts a request, emitting the error and complete events.
   *
   * @!macro nobrowser
   * @example Aborting a request after sending
   *   var params = {
   *     Bucket: 'bucket', Key: 'key',
   *     Body: new Buffer(1024 * 1024 * 5) // 5MB payload
   *   };
   *   var request = s3.putObject(params);
   *   request.send(function (err, data) {
   *     if (err) console.log("Error:", err.code, err.message);
   *     else console.log(data);
   *   });
   *
   *   // abort request in 1 second
   *   setTimeout(request.abort.bind(request), 1000);
   *
   *   // prints "Error: RequestAbortedError Request aborted by user"
   * @return [AWS.Request] the same request object, for chaining.
   * @since v1.4.0
   */
  abort: function abort() {
    this.removeAllListeners('validateResponse');
    this.removeAllListeners('extractError');
    this.on('validateResponse', function addAbortedError(resp) {
      resp.error = AWS.util.error(new Error('Request aborted by user'), {
         code: 'RequestAbortedError', retryable: false
      });
    });

    if (this.httpRequest.stream && !this.httpRequest.stream.didCallback) { // abort HTTP stream
      this.httpRequest.stream.abort();
      if (this.httpRequest._abortCallback) {
         this.httpRequest._abortCallback();
      } else {
        this.removeAllListeners('send'); // haven't sent yet, so let's not
      }
    }

    return this;
  },

  /**
   * Iterates over each page of results given a pageable request, calling
   * the provided callback with each page of data. After all pages have been
   * retrieved, the callback is called with `null` data.
   *
   * @note This operation can generate multiple requests to a service.
   * @example Iterating over multiple pages of objects in an S3 bucket
   *   var pages = 1;
   *   s3.listObjects().eachPage(function(err, data) {
   *     if (err) return;
   *     console.log("Page", pages++);
   *     console.log(data);
   *   });
   * @example Iterating over multiple pages with an asynchronous callback
   *   s3.listObjects(params).eachPage(function(err, data, done) {
   *     doSomethingAsyncAndOrExpensive(function() {
   *       // The next page of results isn't fetched until done is called
   *       done();
   *     });
   *   });
   * @callback callback function(err, data, [doneCallback])
   *   Called with each page of resulting data from the request. If the
   *   optional `doneCallback` is provided in the function, it must be called
   *   when the callback is complete.
   *
   *   @param err [Error] an error object, if an error occurred.
   *   @param data [Object] a single page of response data. If there is no
   *     more data, this object will be `null`.
   *   @param doneCallback [Function] an optional done callback. If this
   *     argument is defined in the function declaration, it should be called
   *     when the next page is ready to be retrieved. This is useful for
   *     controlling serial pagination across asynchronous operations.
   *   @return [Boolean] if the callback returns `false`, pagination will
   *     stop.
   *
   * @see AWS.Request.eachItem
   * @see AWS.Response.nextPage
   * @since v1.4.0
   */
  eachPage: function eachPage(callback) {
    // Make all callbacks async-ish
    callback = AWS.util.fn.makeAsync(callback, 3);

    function wrappedCallback(response) {
      callback.call(response, response.error, response.data, function (result) {
        if (result === false) return;

        if (response.hasNextPage()) {
          response.nextPage().on('complete', wrappedCallback).send();
        } else {
          callback.call(response, null, null, AWS.util.fn.noop);
        }
      });
    }

    this.on('complete', wrappedCallback).send();
  },

  /**
   * Enumerates over individual items of a request, paging the responses if
   * necessary.
   *
   * @api experimental
   * @since v1.4.0
   */
  eachItem: function eachItem(callback) {
    var self = this;
    function wrappedCallback(err, data) {
      if (err) return callback(err, null);
      if (data === null) return callback(null, null);

      var config = self.service.paginationConfig(self.operation);
      var resultKey = config.resultKey;
      if (Array.isArray(resultKey)) resultKey = resultKey[0];
      var items = jmespath.search(data, resultKey);
      var continueIteration = true;
      AWS.util.arrayEach(items, function(item) {
        continueIteration = callback(null, item);
        if (continueIteration === false) {
          return AWS.util.abort;
        }
      });
      return continueIteration;
    }

    this.eachPage(wrappedCallback);
  },

  /**
   * @return [Boolean] whether the operation can return multiple pages of
   *   response data.
   * @see AWS.Response.eachPage
   * @since v1.4.0
   */
  isPageable: function isPageable() {
    return this.service.paginationConfig(this.operation) ? true : false;
  },

  /**
   * Sends the request and converts the request object into a readable stream
   * that can be read from or piped into a writable stream.
   *
   * @note The data read from a readable stream contains only
   *   the raw HTTP body contents.
   * @example Manually reading from a stream
   *   request.createReadStream().on('data', function(data) {
   *     console.log("Got data:", data.toString());
   *   });
   * @example Piping a request body into a file
   *   var out = fs.createWriteStream('/path/to/outfile.jpg');
   *   s3.service.getObject(params).createReadStream().pipe(out);
   * @return [Stream] the readable stream object that can be piped
   *   or read from (by registering 'data' event listeners).
   * @!macro nobrowser
   */
  createReadStream: function createReadStream() {
    var streams = AWS.util.stream;
    var req = this;
    var stream = null;

    if (AWS.HttpClient.streamsApiVersion === 2) {
      stream = new streams.PassThrough();
      process.nextTick(function() { req.send(); });
    } else {
      stream = new streams.Stream();
      stream.readable = true;

      stream.sent = false;
      stream.on('newListener', function(event) {
        if (!stream.sent && event === 'data') {
          stream.sent = true;
          process.nextTick(function() { req.send(); });
        }
      });
    }

    this.on('error', function(err) {
      stream.emit('error', err);
    });

    this.on('httpHeaders', function streamHeaders(statusCode, headers, resp) {
      if (statusCode < 300) {
        req.removeListener('httpData', AWS.EventListeners.Core.HTTP_DATA);
        req.removeListener('httpError', AWS.EventListeners.Core.HTTP_ERROR);
        req.on('httpError', function streamHttpError(error) {
          resp.error = error;
          resp.error.retryable = false;
        });

        var shouldCheckContentLength = false;
        var expectedLen;
        if (req.httpRequest.method !== 'HEAD') {
          expectedLen = parseInt(headers['content-length'], 10);
        }
        if (expectedLen !== undefined && !isNaN(expectedLen) && expectedLen >= 0) {
          shouldCheckContentLength = true;
          var receivedLen = 0;
        }

        var checkContentLengthAndEmit = function checkContentLengthAndEmit() {
          if (shouldCheckContentLength && receivedLen !== expectedLen) {
            stream.emit('error', AWS.util.error(
              new Error('Stream content length mismatch. Received ' +
                receivedLen + ' of ' + expectedLen + ' bytes.'),
              { code: 'StreamContentLengthMismatch' }
            ));
          } else if (AWS.HttpClient.streamsApiVersion === 2) {
            stream.end();
          } else {
            stream.emit('end');
          }
        };

        var httpStream = resp.httpResponse.createUnbufferedStream();

        if (AWS.HttpClient.streamsApiVersion === 2) {
          if (shouldCheckContentLength) {
            var lengthAccumulator = new streams.PassThrough();
            lengthAccumulator._write = function(chunk) {
              if (chunk && chunk.length) {
                receivedLen += chunk.length;
              }
              return streams.PassThrough.prototype._write.apply(this, arguments);
            };

            lengthAccumulator.on('end', checkContentLengthAndEmit);
            stream.on('error', function(err) {
              shouldCheckContentLength = false;
              httpStream.unpipe(lengthAccumulator);
              lengthAccumulator.emit('end');
              lengthAccumulator.end();
            });
            httpStream.pipe(lengthAccumulator).pipe(stream, { end: false });
          } else {
            httpStream.pipe(stream);
          }
        } else {

          if (shouldCheckContentLength) {
            httpStream.on('data', function(arg) {
              if (arg && arg.length) {
                receivedLen += arg.length;
              }
            });
          }

          httpStream.on('data', function(arg) {
            stream.emit('data', arg);
          });
          httpStream.on('end', checkContentLengthAndEmit);
        }

        httpStream.on('error', function(err) {
          shouldCheckContentLength = false;
          stream.emit('error', err);
        });
      }
    });

    return stream;
  },

  /**
   * @param [Array,Response] args This should be the response object,
   *   or an array of args to send to the event.
   * @api private
   */
  emitEvent: function emit(eventName, args, done) {
    if (typeof args === 'function') { done = args; args = null; }
    if (!done) done = function() { };
    if (!args) args = this.eventParameters(eventName, this.response);

    var origEmit = AWS.SequentialExecutor.prototype.emit;
    origEmit.call(this, eventName, args, function (err) {
      if (err) this.response.error = err;
      done.call(this, err);
    });
  },

  /**
   * @api private
   */
  eventParameters: function eventParameters(eventName) {
    switch (eventName) {
      case 'restart':
      case 'validate':
      case 'sign':
      case 'build':
      case 'afterValidate':
      case 'afterBuild':
        return [this];
      case 'error':
        return [this.response.error, this.response];
      default:
        return [this.response];
    }
  },

  /**
   * @api private
   */
  presign: function presign(expires, callback) {
    if (!callback && typeof expires === 'function') {
      callback = expires;
      expires = null;
    }
    return new AWS.Signers.Presign().sign(this.toGet(), expires, callback);
  },

  /**
   * @api private
   */
  isPresigned: function isPresigned() {
    return Object.prototype.hasOwnProperty.call(this.httpRequest.headers, 'presigned-expires');
  },

  /**
   * @api private
   */
  toUnauthenticated: function toUnauthenticated() {
    this.removeListener('validate', AWS.EventListeners.Core.VALIDATE_CREDENTIALS);
    this.removeListener('sign', AWS.EventListeners.Core.SIGN);
    return this;
  },

  /**
   * @api private
   */
  toGet: function toGet() {
    if (this.service.api.protocol === 'query' ||
        this.service.api.protocol === 'ec2') {
      this.removeListener('build', this.buildAsGet);
      this.addListener('build', this.buildAsGet);
    }
    return this;
  },

  /**
   * @api private
   */
  buildAsGet: function buildAsGet(request) {
    request.httpRequest.method = 'GET';
    request.httpRequest.path = request.service.endpoint.path +
                               '?' + request.httpRequest.body;
    request.httpRequest.body = '';

    // don't need these headers on a GET request
    delete request.httpRequest.headers['Content-Length'];
    delete request.httpRequest.headers['Content-Type'];
  },

  /**
   * @api private
   */
  haltHandlersOnError: function haltHandlersOnError() {
    this._haltHandlersOnError = true;
  }
});

/**
 * @api private
 */
AWS.Request.addPromisesToClass = function addPromisesToClass(PromiseDependency) {
  this.prototype.promise = function promise() {
    var self = this;
    // append to user agent
    this.httpRequest.appendToUserAgent('promise');
    return new PromiseDependency(function(resolve, reject) {
      self.on('complete', function(resp) {
        if (resp.error) {
          reject(resp.error);
        } else {
          // define $response property so that it is not enumberable
          // this prevents circular reference errors when stringifying the JSON object
          resolve(Object.defineProperty(
            resp.data || {},
            '$response',
            {value: resp}
          ));
        }
      });
      self.runTo();
    });
  };
};

/**
 * @api private
 */
AWS.Request.deletePromisesFromClass = function deletePromisesFromClass() {
  delete this.prototype.promise;
};

AWS.util.addPromises(AWS.Request);

AWS.util.mixin(AWS.Request, AWS.SequentialExecutor);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ }),
/* 204 */
/***/ (function(module, exports) {

function AcceptorStateMachine(states, state) {
  this.currentState = state || null;
  this.states = states || {};
}

AcceptorStateMachine.prototype.runTo = function runTo(finalState, done, bindObject, inputError) {
  if (typeof finalState === 'function') {
    inputError = bindObject; bindObject = done;
    done = finalState; finalState = null;
  }

  var self = this;
  var state = self.states[self.currentState];
  state.fn.call(bindObject || self, inputError, function(err) {
    if (err) {
      if (state.fail) self.currentState = state.fail;
      else return done ? done.call(bindObject, err) : null;
    } else {
      if (state.accept) self.currentState = state.accept;
      else return done ? done.call(bindObject) : null;
    }
    if (self.currentState === finalState) {
      return done ? done.call(bindObject, err) : null;
    }

    self.runTo(finalState, done, bindObject, err);
  });
};

AcceptorStateMachine.prototype.addState = function addState(name, acceptState, failState, fn) {
  if (typeof acceptState === 'function') {
    fn = acceptState; acceptState = null; failState = null;
  } else if (typeof failState === 'function') {
    fn = failState; failState = null;
  }

  if (!this.currentState) this.currentState = name;
  this.states[name] = { accept: acceptState, fail: failState, fn: fn };
  return this;
};

module.exports = AcceptorStateMachine;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var inherit = AWS.util.inherit;
var jmespath = __webpack_require__(41);

/**
 * This class encapsulates the response information
 * from a service request operation sent through {AWS.Request}.
 * The response object has two main properties for getting information
 * back from a request:
 *
 * ## The `data` property
 *
 * The `response.data` property contains the serialized object data
 * retrieved from the service request. For instance, for an
 * Amazon DynamoDB `listTables` method call, the response data might
 * look like:
 *
 * ```
 * > resp.data
 * { TableNames:
 *    [ 'table1', 'table2', ... ] }
 * ```
 *
 * The `data` property can be null if an error occurs (see below).
 *
 * ## The `error` property
 *
 * In the event of a service error (or transfer error), the
 * `response.error` property will be filled with the given
 * error data in the form:
 *
 * ```
 * { code: 'SHORT_UNIQUE_ERROR_CODE',
 *   message: 'Some human readable error message' }
 * ```
 *
 * In the case of an error, the `data` property will be `null`.
 * Note that if you handle events that can be in a failure state,
 * you should always check whether `response.error` is set
 * before attempting to access the `response.data` property.
 *
 * @!attribute data
 *   @readonly
 *   @!group Data Properties
 *   @note Inside of a {AWS.Request~httpData} event, this
 *     property contains a single raw packet instead of the
 *     full de-serialized service response.
 *   @return [Object] the de-serialized response data
 *     from the service.
 *
 * @!attribute error
 *   An structure containing information about a service
 *   or networking error.
 *   @readonly
 *   @!group Data Properties
 *   @note This attribute is only filled if a service or
 *     networking error occurs.
 *   @return [Error]
 *     * code [String] a unique short code representing the
 *       error that was emitted.
 *     * message [String] a longer human readable error message
 *     * retryable [Boolean] whether the error message is
 *       retryable.
 *     * statusCode [Numeric] in the case of a request that reached the service,
 *       this value contains the response status code.
 *     * time [Date] the date time object when the error occurred.
 *     * hostname [String] set when a networking error occurs to easily
 *       identify the endpoint of the request.
 *     * region [String] set when a networking error occurs to easily
 *       identify the region of the request.
 *
 * @!attribute requestId
 *   @readonly
 *   @!group Data Properties
 *   @return [String] the unique request ID associated with the response.
 *     Log this value when debugging requests for AWS support.
 *
 * @!attribute retryCount
 *   @readonly
 *   @!group Operation Properties
 *   @return [Integer] the number of retries that were
 *     attempted before the request was completed.
 *
 * @!attribute redirectCount
 *   @readonly
 *   @!group Operation Properties
 *   @return [Integer] the number of redirects that were
 *     followed before the request was completed.
 *
 * @!attribute httpResponse
 *   @readonly
 *   @!group HTTP Properties
 *   @return [AWS.HttpResponse] the raw HTTP response object
 *     containing the response headers and body information
 *     from the server.
 *
 * @see AWS.Request
 */
AWS.Response = inherit({

  /**
   * @api private
   */
  constructor: function Response(request) {
    this.request = request;
    this.data = null;
    this.error = null;
    this.retryCount = 0;
    this.redirectCount = 0;
    this.httpResponse = new AWS.HttpResponse();
    if (request) {
      this.maxRetries = request.service.numRetries();
      this.maxRedirects = request.service.config.maxRedirects;
    }
  },

  /**
   * Creates a new request for the next page of response data, calling the
   * callback with the page data if a callback is provided.
   *
   * @callback callback function(err, data)
   *   Called when a page of data is returned from the next request.
   *
   *   @param err [Error] an error object, if an error occurred in the request
   *   @param data [Object] the next page of data, or null, if there are no
   *     more pages left.
   * @return [AWS.Request] the request object for the next page of data
   * @return [null] if no callback is provided and there are no pages left
   *   to retrieve.
   * @since v1.4.0
   */
  nextPage: function nextPage(callback) {
    var config;
    var service = this.request.service;
    var operation = this.request.operation;
    try {
      config = service.paginationConfig(operation, true);
    } catch (e) { this.error = e; }

    if (!this.hasNextPage()) {
      if (callback) callback(this.error, null);
      else if (this.error) throw this.error;
      return null;
    }

    var params = AWS.util.copy(this.request.params);
    if (!this.nextPageTokens) {
      return callback ? callback(null, null) : null;
    } else {
      var inputTokens = config.inputToken;
      if (typeof inputTokens === 'string') inputTokens = [inputTokens];
      for (var i = 0; i < inputTokens.length; i++) {
        params[inputTokens[i]] = this.nextPageTokens[i];
      }
      return service.makeRequest(this.request.operation, params, callback);
    }
  },

  /**
   * @return [Boolean] whether more pages of data can be returned by further
   *   requests
   * @since v1.4.0
   */
  hasNextPage: function hasNextPage() {
    this.cacheNextPageTokens();
    if (this.nextPageTokens) return true;
    if (this.nextPageTokens === undefined) return undefined;
    else return false;
  },

  /**
   * @api private
   */
  cacheNextPageTokens: function cacheNextPageTokens() {
    if (Object.prototype.hasOwnProperty.call(this, 'nextPageTokens')) return this.nextPageTokens;
    this.nextPageTokens = undefined;

    var config = this.request.service.paginationConfig(this.request.operation);
    if (!config) return this.nextPageTokens;

    this.nextPageTokens = null;
    if (config.moreResults) {
      if (!jmespath.search(this.data, config.moreResults)) {
        return this.nextPageTokens;
      }
    }

    var exprs = config.outputToken;
    if (typeof exprs === 'string') exprs = [exprs];
    AWS.util.arrayEach.call(this, exprs, function (expr) {
      var output = jmespath.search(this.data, expr);
      if (output) {
        this.nextPageTokens = this.nextPageTokens || [];
        this.nextPageTokens.push(output);
      }
    });

    return this.nextPageTokens;
  }

});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2012-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You
 * may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */

var AWS = __webpack_require__(0);
var inherit = AWS.util.inherit;
var jmespath = __webpack_require__(41);

/**
 * @api private
 */
function CHECK_ACCEPTORS(resp) {
  var waiter = resp.request._waiter;
  var acceptors = waiter.config.acceptors;
  var acceptorMatched = false;
  var state = 'retry';

  acceptors.forEach(function(acceptor) {
    if (!acceptorMatched) {
      var matcher = waiter.matchers[acceptor.matcher];
      if (matcher && matcher(resp, acceptor.expected, acceptor.argument)) {
        acceptorMatched = true;
        state = acceptor.state;
      }
    }
  });

  if (!acceptorMatched && resp.error) state = 'failure';

  if (state === 'success') {
    waiter.setSuccess(resp);
  } else {
    waiter.setError(resp, state === 'retry');
  }
}

/**
 * @api private
 */
AWS.ResourceWaiter = inherit({
  /**
   * Waits for a given state on a service object
   * @param service [Service] the service object to wait on
   * @param state [String] the state (defined in waiter configuration) to wait
   *   for.
   * @example Create a waiter for running EC2 instances
   *   var ec2 = new AWS.EC2;
   *   var waiter = new AWS.ResourceWaiter(ec2, 'instanceRunning');
   */
  constructor: function constructor(service, state) {
    this.service = service;
    this.state = state;
    this.loadWaiterConfig(this.state);
  },

  service: null,

  state: null,

  config: null,

  matchers: {
    path: function(resp, expected, argument) {
      try {
        var result = jmespath.search(resp.data, argument);
      } catch (err) {
        return false;
      }

      return jmespath.strictDeepEqual(result,expected);
    },

    pathAll: function(resp, expected, argument) {
      try {
        var results = jmespath.search(resp.data, argument);
      } catch (err) {
        return false;
      }

      if (!Array.isArray(results)) results = [results];
      var numResults = results.length;
      if (!numResults) return false;
      for (var ind = 0 ; ind < numResults; ind++) {
        if (!jmespath.strictDeepEqual(results[ind], expected)) {
          return false;
        }
      }
      return true;
    },

    pathAny: function(resp, expected, argument) {
      try {
        var results = jmespath.search(resp.data, argument);
      } catch (err) {
        return false;
      }

      if (!Array.isArray(results)) results = [results];
      var numResults = results.length;
      for (var ind = 0 ; ind < numResults; ind++) {
        if (jmespath.strictDeepEqual(results[ind], expected)) {
          return true;
        }
      }
      return false;
    },

    status: function(resp, expected) {
      var statusCode = resp.httpResponse.statusCode;
      return (typeof statusCode === 'number') && (statusCode === expected);
    },

    error: function(resp, expected) {
      if (typeof expected === 'string' && resp.error) {
        return expected === resp.error.code;
      }
      // if expected is not string, can be boolean indicating presence of error
      return expected === !!resp.error;
    }
  },

  listeners: new AWS.SequentialExecutor().addNamedListeners(function(add) {
    add('RETRY_CHECK', 'retry', function(resp) {
      var waiter = resp.request._waiter;
      if (resp.error && resp.error.code === 'ResourceNotReady') {
        resp.error.retryDelay = (waiter.config.delay || 0) * 1000;
      }
    });

    add('CHECK_OUTPUT', 'extractData', CHECK_ACCEPTORS);

    add('CHECK_ERROR', 'extractError', CHECK_ACCEPTORS);
  }),

  /**
   * @return [AWS.Request]
   */
  wait: function wait(params, callback) {
    if (typeof params === 'function') {
      callback = params; params = undefined;
    }

    if (params && params.$waiter) {
      params = AWS.util.copy(params);
      if (typeof params.$waiter.delay === 'number') {
        this.config.delay = params.$waiter.delay;
      }
      if (typeof params.$waiter.maxAttempts === 'number') {
        this.config.maxAttempts = params.$waiter.maxAttempts;
      }
      delete params.$waiter;
    }

    var request = this.service.makeRequest(this.config.operation, params);
    request._waiter = this;
    request.response.maxRetries = this.config.maxAttempts;
    request.addListeners(this.listeners);

    if (callback) request.send(callback);
    return request;
  },

  setSuccess: function setSuccess(resp) {
    resp.error = null;
    resp.data = resp.data || {};
    resp.request.removeAllListeners('extractData');
  },

  setError: function setError(resp, retryable) {
    resp.data = null;
    resp.error = AWS.util.error(resp.error || new Error(), {
      code: 'ResourceNotReady',
      message: 'Resource is not in the state ' + this.state,
      retryable: retryable
    });
  },

  /**
   * Loads waiter configuration from API configuration
   *
   * @api private
   */
  loadWaiterConfig: function loadWaiterConfig(state) {
    if (!this.service.api.waiters[state]) {
      throw new AWS.util.error(new Error(), {
        code: 'StateNotFoundError',
        message: 'State ' + state + ' not found.'
      });
    }

    this.config = AWS.util.copy(this.service.api.waiters[state]);
  }
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);

var inherit = AWS.util.inherit;

/**
 * @api private
 */
AWS.Signers.RequestSigner = inherit({
  constructor: function RequestSigner(request) {
    this.request = request;
  },

  setServiceClientId: function setServiceClientId(id) {
    this.serviceClientId = id;
  },

  getServiceClientId: function getServiceClientId() {
    return this.serviceClientId;
  }
});

AWS.Signers.RequestSigner.getVersion = function getVersion(version) {
  switch (version) {
    case 'v2': return AWS.Signers.V2;
    case 'v3': return AWS.Signers.V3;
    case 'v4': return AWS.Signers.V4;
    case 's3': return AWS.Signers.S3;
    case 'v3https': return AWS.Signers.V3Https;
  }
  throw new Error('Unknown signing version ' + version);
};

__webpack_require__(208);
__webpack_require__(79);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(212);
__webpack_require__(213);


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var inherit = AWS.util.inherit;

/**
 * @api private
 */
AWS.Signers.V2 = inherit(AWS.Signers.RequestSigner, {
  addAuthorization: function addAuthorization(credentials, date) {

    if (!date) date = AWS.util.date.getDate();

    var r = this.request;

    r.params.Timestamp = AWS.util.date.iso8601(date);
    r.params.SignatureVersion = '2';
    r.params.SignatureMethod = 'HmacSHA256';
    r.params.AWSAccessKeyId = credentials.accessKeyId;

    if (credentials.sessionToken) {
      r.params.SecurityToken = credentials.sessionToken;
    }

    delete r.params.Signature; // delete old Signature for re-signing
    r.params.Signature = this.signature(credentials);

    r.body = AWS.util.queryParamsToString(r.params);
    r.headers['Content-Length'] = r.body.length;
  },

  signature: function signature(credentials) {
    return AWS.util.crypto.hmac(credentials.secretAccessKey, this.stringToSign(), 'base64');
  },

  stringToSign: function stringToSign() {
    var parts = [];
    parts.push(this.request.method);
    parts.push(this.request.endpoint.host.toLowerCase());
    parts.push(this.request.pathname());
    parts.push(AWS.util.queryParamsToString(this.request.params));
    return parts.join('\n');
  }

});

module.exports = AWS.Signers.V2;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var inherit = AWS.util.inherit;

__webpack_require__(79);

/**
 * @api private
 */
AWS.Signers.V3Https = inherit(AWS.Signers.V3, {
  authorization: function authorization(credentials) {
    return 'AWS3-HTTPS ' +
      'AWSAccessKeyId=' + credentials.accessKeyId + ',' +
      'Algorithm=HmacSHA256,' +
      'Signature=' + this.signature(credentials);
  },

  stringToSign: function stringToSign() {
    return this.request.headers['X-Amz-Date'];
  }
});

module.exports = AWS.Signers.V3Https;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var v4Credentials = __webpack_require__(211);
var inherit = AWS.util.inherit;

/**
 * @api private
 */
var expiresHeader = 'presigned-expires';

/**
 * @api private
 */
AWS.Signers.V4 = inherit(AWS.Signers.RequestSigner, {
  constructor: function V4(request, serviceName, options) {
    AWS.Signers.RequestSigner.call(this, request);
    this.serviceName = serviceName;
    options = options || {};
    this.signatureCache = typeof options.signatureCache === 'boolean' ? options.signatureCache : true;
    this.operation = options.operation;
  },

  algorithm: 'AWS4-HMAC-SHA256',

  addAuthorization: function addAuthorization(credentials, date) {
    var datetime = AWS.util.date.iso8601(date).replace(/[:\-]|\.\d{3}/g, '');

    if (this.isPresigned()) {
      this.updateForPresigned(credentials, datetime);
    } else {
      this.addHeaders(credentials, datetime);
    }

    this.request.headers['Authorization'] =
      this.authorization(credentials, datetime);
  },

  addHeaders: function addHeaders(credentials, datetime) {
    this.request.headers['X-Amz-Date'] = datetime;
    if (credentials.sessionToken) {
      this.request.headers['x-amz-security-token'] = credentials.sessionToken;
    }
  },

  updateForPresigned: function updateForPresigned(credentials, datetime) {
    var credString = this.credentialString(datetime);
    var qs = {
      'X-Amz-Date': datetime,
      'X-Amz-Algorithm': this.algorithm,
      'X-Amz-Credential': credentials.accessKeyId + '/' + credString,
      'X-Amz-Expires': this.request.headers[expiresHeader],
      'X-Amz-SignedHeaders': this.signedHeaders()
    };

    if (credentials.sessionToken) {
      qs['X-Amz-Security-Token'] = credentials.sessionToken;
    }

    if (this.request.headers['Content-Type']) {
      qs['Content-Type'] = this.request.headers['Content-Type'];
    }
    if (this.request.headers['Content-MD5']) {
      qs['Content-MD5'] = this.request.headers['Content-MD5'];
    }
    if (this.request.headers['Cache-Control']) {
      qs['Cache-Control'] = this.request.headers['Cache-Control'];
    }

    // need to pull in any other X-Amz-* headers
    AWS.util.each.call(this, this.request.headers, function(key, value) {
      if (key === expiresHeader) return;
      if (this.isSignableHeader(key)) {
        var lowerKey = key.toLowerCase();
        // Metadata should be normalized
        if (lowerKey.indexOf('x-amz-meta-') === 0) {
          qs[lowerKey] = value;
        } else if (lowerKey.indexOf('x-amz-') === 0) {
          qs[key] = value;
        }
      }
    });

    var sep = this.request.path.indexOf('?') >= 0 ? '&' : '?';
    this.request.path += sep + AWS.util.queryParamsToString(qs);
  },

  authorization: function authorization(credentials, datetime) {
    var parts = [];
    var credString = this.credentialString(datetime);
    parts.push(this.algorithm + ' Credential=' +
      credentials.accessKeyId + '/' + credString);
    parts.push('SignedHeaders=' + this.signedHeaders());
    parts.push('Signature=' + this.signature(credentials, datetime));
    return parts.join(', ');
  },

  signature: function signature(credentials, datetime) {
    var signingKey = v4Credentials.getSigningKey(
      credentials,
      datetime.substr(0, 8),
      this.request.region,
      this.serviceName,
      this.signatureCache
    );
    return AWS.util.crypto.hmac(signingKey, this.stringToSign(datetime), 'hex');
  },

  stringToSign: function stringToSign(datetime) {
    var parts = [];
    parts.push('AWS4-HMAC-SHA256');
    parts.push(datetime);
    parts.push(this.credentialString(datetime));
    parts.push(this.hexEncodedHash(this.canonicalString()));
    return parts.join('\n');
  },

  canonicalString: function canonicalString() {
    var parts = [], pathname = this.request.pathname();
    if (this.serviceName !== 's3') pathname = AWS.util.uriEscapePath(pathname);

    parts.push(this.request.method);
    parts.push(pathname);
    parts.push(this.request.search());
    parts.push(this.canonicalHeaders() + '\n');
    parts.push(this.signedHeaders());
    parts.push(this.hexEncodedBodyHash());
    return parts.join('\n');
  },

  canonicalHeaders: function canonicalHeaders() {
    var headers = [];
    AWS.util.each.call(this, this.request.headers, function (key, item) {
      headers.push([key, item]);
    });
    headers.sort(function (a, b) {
      return a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1;
    });
    var parts = [];
    AWS.util.arrayEach.call(this, headers, function (item) {
      var key = item[0].toLowerCase();
      if (this.isSignableHeader(key)) {
        var value = item[1];
        if (typeof value === 'undefined' || value === null || typeof value.toString !== 'function') {
          throw AWS.util.error(new Error('Header ' + key + ' contains invalid value'), {
            code: 'InvalidHeader'
          });
        }
        parts.push(key + ':' +
          this.canonicalHeaderValues(value.toString()));
      }
    });
    return parts.join('\n');
  },

  canonicalHeaderValues: function canonicalHeaderValues(values) {
    return values.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
  },

  signedHeaders: function signedHeaders() {
    var keys = [];
    AWS.util.each.call(this, this.request.headers, function (key) {
      key = key.toLowerCase();
      if (this.isSignableHeader(key)) keys.push(key);
    });
    return keys.sort().join(';');
  },

  credentialString: function credentialString(datetime) {
    return v4Credentials.createScope(
      datetime.substr(0, 8),
      this.request.region,
      this.serviceName
    );
  },

  hexEncodedHash: function hash(string) {
    return AWS.util.crypto.sha256(string, 'hex');
  },

  hexEncodedBodyHash: function hexEncodedBodyHash() {
    var request = this.request;
    if (this.isPresigned() && this.serviceName === 's3' && !request.body) {
      return 'UNSIGNED-PAYLOAD';
    } else if (request.headers['X-Amz-Content-Sha256']) {
      return request.headers['X-Amz-Content-Sha256'];
    } else {
      return this.hexEncodedHash(this.request.body || '');
    }
  },

  unsignableHeaders: [
    'authorization',
    'content-type',
    'content-length',
    'user-agent',
    expiresHeader,
    'expect',
    'x-amzn-trace-id'
  ],

  isSignableHeader: function isSignableHeader(key) {
    if (key.toLowerCase().indexOf('x-amz-') === 0) return true;
    return this.unsignableHeaders.indexOf(key) < 0;
  },

  isPresigned: function isPresigned() {
    return this.request.headers[expiresHeader] ? true : false;
  }

});

module.exports = AWS.Signers.V4;


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);

/**
 * @api private
 */
var cachedSecret = {};

/**
 * @api private
 */
var cacheQueue = [];

/**
 * @api private
 */
var maxCacheEntries = 50;

/**
 * @api private
 */
var v4Identifier = 'aws4_request';

module.exports = {
  /**
   * @api private
   *
   * @param date [String]
   * @param region [String]
   * @param serviceName [String]
   * @return [String]
   */
  createScope: function createScope(date, region, serviceName) {
    return [
      date.substr(0, 8),
      region,
      serviceName,
      v4Identifier
    ].join('/');
  },

  /**
   * @api private
   *
   * @param credentials [Credentials]
   * @param date [String]
   * @param region [String]
   * @param service [String]
   * @param shouldCache [Boolean]
   * @return [String]
   */
  getSigningKey: function getSigningKey(
    credentials,
    date,
    region,
    service,
    shouldCache
  ) {
    var credsIdentifier = AWS.util.crypto
      .hmac(credentials.secretAccessKey, credentials.accessKeyId, 'base64');
    var cacheKey = [credsIdentifier, date, region, service].join('_');
    shouldCache = shouldCache !== false;
    if (shouldCache && (cacheKey in cachedSecret)) {
      return cachedSecret[cacheKey];
    }

    var kDate = AWS.util.crypto.hmac(
      'AWS4' + credentials.secretAccessKey,
      date,
      'buffer'
    );
    var kRegion = AWS.util.crypto.hmac(kDate, region, 'buffer');
    var kService = AWS.util.crypto.hmac(kRegion, service, 'buffer');

    var signingKey = AWS.util.crypto.hmac(kService, v4Identifier, 'buffer');
    if (shouldCache) {
      cachedSecret[cacheKey] = signingKey;
      cacheQueue.push(cacheKey);
      if (cacheQueue.length > maxCacheEntries) {
        // remove the oldest entry (not the least recently used)
        delete cachedSecret[cacheQueue.shift()];
      }
    }

    return signingKey;
  },

  /**
   * @api private
   *
   * Empties the derived signing key cache. Made available for testing purposes
   * only.
   */
  emptyCache: function emptyCache() {
    cachedSecret = {};
    cacheQueue = [];
  }
};


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var inherit = AWS.util.inherit;

/**
 * @api private
 */
AWS.Signers.S3 = inherit(AWS.Signers.RequestSigner, {
  /**
   * When building the stringToSign, these sub resource params should be
   * part of the canonical resource string with their NON-decoded values
   */
  subResources: {
    'acl': 1,
    'accelerate': 1,
    'analytics': 1,
    'cors': 1,
    'lifecycle': 1,
    'delete': 1,
    'inventory': 1,
    'location': 1,
    'logging': 1,
    'metrics': 1,
    'notification': 1,
    'partNumber': 1,
    'policy': 1,
    'requestPayment': 1,
    'replication': 1,
    'restore': 1,
    'tagging': 1,
    'torrent': 1,
    'uploadId': 1,
    'uploads': 1,
    'versionId': 1,
    'versioning': 1,
    'versions': 1,
    'website': 1
  },

  // when building the stringToSign, these querystring params should be
  // part of the canonical resource string with their NON-encoded values
  responseHeaders: {
    'response-content-type': 1,
    'response-content-language': 1,
    'response-expires': 1,
    'response-cache-control': 1,
    'response-content-disposition': 1,
    'response-content-encoding': 1
  },

  addAuthorization: function addAuthorization(credentials, date) {
    if (!this.request.headers['presigned-expires']) {
      this.request.headers['X-Amz-Date'] = AWS.util.date.rfc822(date);
    }

    if (credentials.sessionToken) {
      // presigned URLs require this header to be lowercased
      this.request.headers['x-amz-security-token'] = credentials.sessionToken;
    }

    var signature = this.sign(credentials.secretAccessKey, this.stringToSign());
    var auth = 'AWS ' + credentials.accessKeyId + ':' + signature;

    this.request.headers['Authorization'] = auth;
  },

  stringToSign: function stringToSign() {
    var r = this.request;

    var parts = [];
    parts.push(r.method);
    parts.push(r.headers['Content-MD5'] || '');
    parts.push(r.headers['Content-Type'] || '');

    // This is the "Date" header, but we use X-Amz-Date.
    // The S3 signing mechanism requires us to pass an empty
    // string for this Date header regardless.
    parts.push(r.headers['presigned-expires'] || '');

    var headers = this.canonicalizedAmzHeaders();
    if (headers) parts.push(headers);
    parts.push(this.canonicalizedResource());

    return parts.join('\n');

  },

  canonicalizedAmzHeaders: function canonicalizedAmzHeaders() {

    var amzHeaders = [];

    AWS.util.each(this.request.headers, function (name) {
      if (name.match(/^x-amz-/i))
        amzHeaders.push(name);
    });

    amzHeaders.sort(function (a, b) {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });

    var parts = [];
    AWS.util.arrayEach.call(this, amzHeaders, function (name) {
      parts.push(name.toLowerCase() + ':' + String(this.request.headers[name]));
    });

    return parts.join('\n');

  },

  canonicalizedResource: function canonicalizedResource() {

    var r = this.request;

    var parts = r.path.split('?');
    var path = parts[0];
    var querystring = parts[1];

    var resource = '';

    if (r.virtualHostedBucket)
      resource += '/' + r.virtualHostedBucket;

    resource += path;

    if (querystring) {

      // collect a list of sub resources and query params that need to be signed
      var resources = [];

      AWS.util.arrayEach.call(this, querystring.split('&'), function (param) {
        var name = param.split('=')[0];
        var value = param.split('=')[1];
        if (this.subResources[name] || this.responseHeaders[name]) {
          var subresource = { name: name };
          if (value !== undefined) {
            if (this.subResources[name]) {
              subresource.value = value;
            } else {
              subresource.value = decodeURIComponent(value);
            }
          }
          resources.push(subresource);
        }
      });

      resources.sort(function (a, b) { return a.name < b.name ? -1 : 1; });

      if (resources.length) {

        querystring = [];
        AWS.util.arrayEach(resources, function (res) {
          if (res.value === undefined) {
            querystring.push(res.name);
          } else {
            querystring.push(res.name + '=' + res.value);
          }
        });

        resource += '?' + querystring.join('&');
      }

    }

    return resource;

  },

  sign: function sign(secret, string) {
    return AWS.util.crypto.hmac(secret, string, 'base64', 'sha1');
  }
});

module.exports = AWS.Signers.S3;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var inherit = AWS.util.inherit;

/**
 * @api private
 */
var expiresHeader = 'presigned-expires';

/**
 * @api private
 */
function signedUrlBuilder(request) {
  var expires = request.httpRequest.headers[expiresHeader];
  var signerClass = request.service.getSignerClass(request);

  delete request.httpRequest.headers['User-Agent'];
  delete request.httpRequest.headers['X-Amz-User-Agent'];

  if (signerClass === AWS.Signers.V4) {
    if (expires > 604800) { // one week expiry is invalid
      var message = 'Presigning does not support expiry time greater ' +
                    'than a week with SigV4 signing.';
      throw AWS.util.error(new Error(), {
        code: 'InvalidExpiryTime', message: message, retryable: false
      });
    }
    request.httpRequest.headers[expiresHeader] = expires;
  } else if (signerClass === AWS.Signers.S3) {
    request.httpRequest.headers[expiresHeader] = parseInt(
      AWS.util.date.unixTimestamp() + expires, 10).toString();
  } else {
    throw AWS.util.error(new Error(), {
      message: 'Presigning only supports S3 or SigV4 signing.',
      code: 'UnsupportedSigner', retryable: false
    });
  }
}

/**
 * @api private
 */
function signedUrlSigner(request) {
  var endpoint = request.httpRequest.endpoint;
  var parsedUrl = AWS.util.urlParse(request.httpRequest.path);
  var queryParams = {};

  if (parsedUrl.search) {
    queryParams = AWS.util.queryStringParse(parsedUrl.search.substr(1));
  }

  AWS.util.each(request.httpRequest.headers, function (key, value) {
    if (key === expiresHeader) key = 'Expires';
    if (key.indexOf('x-amz-meta-') === 0) {
      // Delete existing, potentially not normalized key
      delete queryParams[key];
      key = key.toLowerCase();
    }
    queryParams[key] = value;
  });
  delete request.httpRequest.headers[expiresHeader];

  var auth = queryParams['Authorization'].split(' ');
  if (auth[0] === 'AWS') {
    auth = auth[1].split(':');
    queryParams['AWSAccessKeyId'] = auth[0];
    queryParams['Signature'] = auth[1];
  } else if (auth[0] === 'AWS4-HMAC-SHA256') { // SigV4 signing
    auth.shift();
    var rest = auth.join(' ');
    var signature = rest.match(/Signature=(.*?)(?:,|\s|\r?\n|$)/)[1];
    queryParams['X-Amz-Signature'] = signature;
    delete queryParams['Expires'];
  }
  delete queryParams['Authorization'];
  delete queryParams['Host'];

  // build URL
  endpoint.pathname = parsedUrl.pathname;
  endpoint.search = AWS.util.queryParamsToString(queryParams);
}

/**
 * @api private
 */
AWS.Signers.Presign = inherit({
  /**
   * @api private
   */
  sign: function sign(request, expireTime, callback) {
    request.httpRequest.headers[expiresHeader] = expireTime || 3600;
    request.on('build', signedUrlBuilder);
    request.on('sign', signedUrlSigner);
    request.removeListener('afterBuild',
      AWS.EventListeners.Core.SET_CONTENT_LENGTH);
    request.removeListener('afterBuild',
      AWS.EventListeners.Core.COMPUTE_SHA256);

    request.emit('beforePresign', [request]);

    if (callback) {
      request.build(function() {
        if (this.response.error) callback(this.response.error);
        else {
          callback(null, AWS.util.urlFormat(request.httpRequest.endpoint));
        }
      });
    } else {
      request.build();
      if (request.response.error) throw request.response.error;
      return AWS.util.urlFormat(request.httpRequest.endpoint);
    }
  }
});

module.exports = AWS.Signers.Presign;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);

/**
 * @api private
 */
AWS.ParamValidator = AWS.util.inherit({
  /**
   * Create a new validator object.
   *
   * @param validation [Boolean|map] whether input parameters should be
   *     validated against the operation description before sending the
   *     request. Pass a map to enable any of the following specific
   *     validation features:
   *
   *     * **min** [Boolean] &mdash; Validates that a value meets the min
   *       constraint. This is enabled by default when paramValidation is set
   *       to `true`.
   *     * **max** [Boolean] &mdash; Validates that a value meets the max
   *       constraint.
   *     * **pattern** [Boolean] &mdash; Validates that a string value matches a
   *       regular expression.
   *     * **enum** [Boolean] &mdash; Validates that a string value matches one
   *       of the allowable enum values.
   */
  constructor: function ParamValidator(validation) {
    if (validation === true || validation === undefined) {
      validation = {'min': true};
    }
    this.validation = validation;
  },

  validate: function validate(shape, params, context) {
    this.errors = [];
    this.validateMember(shape, params || {}, context || 'params');

    if (this.errors.length > 1) {
      var msg = this.errors.join('\n* ');
      msg = 'There were ' + this.errors.length +
        ' validation errors:\n* ' + msg;
      throw AWS.util.error(new Error(msg),
        {code: 'MultipleValidationErrors', errors: this.errors});
    } else if (this.errors.length === 1) {
      throw this.errors[0];
    } else {
      return true;
    }
  },

  fail: function fail(code, message) {
    this.errors.push(AWS.util.error(new Error(message), {code: code}));
  },

  validateStructure: function validateStructure(shape, params, context) {
    this.validateType(params, context, ['object'], 'structure');

    var paramName;
    for (var i = 0; shape.required && i < shape.required.length; i++) {
      paramName = shape.required[i];
      var value = params[paramName];
      if (value === undefined || value === null) {
        this.fail('MissingRequiredParameter',
          'Missing required key \'' + paramName + '\' in ' + context);
      }
    }

    // validate hash members
    for (paramName in params) {
      if (!Object.prototype.hasOwnProperty.call(params, paramName)) continue;

      var paramValue = params[paramName],
          memberShape = shape.members[paramName];

      if (memberShape !== undefined) {
        var memberContext = [context, paramName].join('.');
        this.validateMember(memberShape, paramValue, memberContext);
      } else {
        this.fail('UnexpectedParameter',
          'Unexpected key \'' + paramName + '\' found in ' + context);
      }
    }

    return true;
  },

  validateMember: function validateMember(shape, param, context) {
    switch (shape.type) {
      case 'structure':
        return this.validateStructure(shape, param, context);
      case 'list':
        return this.validateList(shape, param, context);
      case 'map':
        return this.validateMap(shape, param, context);
      default:
        return this.validateScalar(shape, param, context);
    }
  },

  validateList: function validateList(shape, params, context) {
    if (this.validateType(params, context, [Array])) {
      this.validateRange(shape, params.length, context, 'list member count');
      // validate array members
      for (var i = 0; i < params.length; i++) {
        this.validateMember(shape.member, params[i], context + '[' + i + ']');
      }
    }
  },

  validateMap: function validateMap(shape, params, context) {
    if (this.validateType(params, context, ['object'], 'map')) {
      // Build up a count of map members to validate range traits.
      var mapCount = 0;
      for (var param in params) {
        if (!Object.prototype.hasOwnProperty.call(params, param)) continue;
        // Validate any map key trait constraints
        this.validateMember(shape.key, param,
                            context + '[key=\'' + param + '\']')
        this.validateMember(shape.value, params[param],
                            context + '[\'' + param + '\']');
        mapCount++;
      }
      this.validateRange(shape, mapCount, context, 'map member count');
    }
  },

  validateScalar: function validateScalar(shape, value, context) {
    switch (shape.type) {
      case null:
      case undefined:
      case 'string':
        return this.validateString(shape, value, context);
      case 'base64':
      case 'binary':
        return this.validatePayload(value, context);
      case 'integer':
      case 'float':
        return this.validateNumber(shape, value, context);
      case 'boolean':
        return this.validateType(value, context, ['boolean']);
      case 'timestamp':
        return this.validateType(value, context, [Date,
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/, 'number'],
          'Date object, ISO-8601 string, or a UNIX timestamp');
      default:
        return this.fail('UnkownType', 'Unhandled type ' +
                         shape.type + ' for ' + context);
    }
  },

  validateString: function validateString(shape, value, context) {
    var validTypes = ['string'];
    if (shape.isJsonValue) {
      validTypes = validTypes.concat(['number', 'object', 'boolean']);
    }
    if (value !== null && this.validateType(value, context, validTypes)) {
      this.validateEnum(shape, value, context);
      this.validateRange(shape, value.length, context, 'string length');
      this.validatePattern(shape, value, context);
    }
  },

  validatePattern: function validatePattern(shape, value, context) {
    if (this.validation['pattern'] && shape['pattern'] !== undefined) {
      if (!(new RegExp(shape['pattern'])).test(value)) {
        this.fail('PatternMatchError', 'Provided value "' + value + '" '
          + 'does not match regex pattern /' + shape['pattern'] + '/ for '
          + context);
      }
    }
  },

  validateRange: function validateRange(shape, value, context, descriptor) {
    if (this.validation['min']) {
      if (shape['min'] !== undefined && value < shape['min']) {
        this.fail('MinRangeError', 'Expected ' + descriptor + ' >= '
          + shape['min'] + ', but found ' + value + ' for ' + context);
      }
    }
    if (this.validation['max']) {
      if (shape['max'] !== undefined && value > shape['max']) {
        this.fail('MaxRangeError', 'Expected ' + descriptor + ' <= '
          + shape['max'] + ', but found ' + value + ' for ' + context);
      }
    }
  },

  validateEnum: function validateRange(shape, value, context) {
    if (this.validation['enum'] && shape['enum'] !== undefined) {
      // Fail if the string value is not present in the enum list
      if (shape['enum'].indexOf(value) === -1) {
        this.fail('EnumError', 'Found string value of ' + value + ', but '
          + 'expected ' + shape['enum'].join('|') + ' for ' + context);
      }
    }
  },

  validateType: function validateType(value, context, acceptedTypes, type) {
    // We will not log an error for null or undefined, but we will return
    // false so that callers know that the expected type was not strictly met.
    if (value === null || value === undefined) return false;

    var foundInvalidType = false;
    for (var i = 0; i < acceptedTypes.length; i++) {
      if (typeof acceptedTypes[i] === 'string') {
        if (typeof value === acceptedTypes[i]) return true;
      } else if (acceptedTypes[i] instanceof RegExp) {
        if ((value || '').toString().match(acceptedTypes[i])) return true;
      } else {
        if (value instanceof acceptedTypes[i]) return true;
        if (AWS.util.isType(value, acceptedTypes[i])) return true;
        if (!type && !foundInvalidType) acceptedTypes = acceptedTypes.slice();
        acceptedTypes[i] = AWS.util.typeName(acceptedTypes[i]);
      }
      foundInvalidType = true;
    }

    var acceptedType = type;
    if (!acceptedType) {
      acceptedType = acceptedTypes.join(', ').replace(/,([^,]+)$/, ', or$1');
    }

    var vowel = acceptedType.match(/^[aeiou]/i) ? 'n' : '';
    this.fail('InvalidParameterType', 'Expected ' + context + ' to be a' +
              vowel + ' ' + acceptedType);
    return false;
  },

  validateNumber: function validateNumber(shape, value, context) {
    if (value === null || value === undefined) return;
    if (typeof value === 'string') {
      var castedValue = parseFloat(value);
      if (castedValue.toString() === value) value = castedValue;
    }
    if (this.validateType(value, context, ['number'])) {
      this.validateRange(shape, value, context, 'numeric value');
    }
  },

  validatePayload: function validatePayload(value, context) {
    if (value === null || value === undefined) return;
    if (typeof value === 'string') return;
    if (value && typeof value.byteLength === 'number') return; // typed arrays
    if (AWS.util.isNode()) { // special check for buffer/stream in Node.js
      var Stream = AWS.util.stream.Stream;
      if (AWS.util.Buffer.isBuffer(value) || value instanceof Stream) return;
    }

    var types = ['Buffer', 'Stream', 'File', 'Blob', 'ArrayBuffer', 'DataView'];
    if (value) {
      for (var i = 0; i < types.length; i++) {
        if (AWS.util.isType(value, types[i])) return;
        if (AWS.util.typeName(value.constructor) === types[i]) return;
      }
    }

    this.fail('InvalidParameterType', 'Expected ' + context + ' to be a ' +
      'string, Buffer, Stream, Blob, or typed array object');
  }
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(216);
var v4 = __webpack_require__(217);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var rng = __webpack_require__(80);
var bytesToUuid = __webpack_require__(81);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(80);
var bytesToUuid = __webpack_require__(81);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(43).Buffer
var sha = __webpack_require__(222)
var sha256 = __webpack_require__(223)
var rng = __webpack_require__(224)
var md5 = __webpack_require__(225)

var algorithms = {
  sha1: sha,
  sha256: sha256,
  md5: md5
}

var blocksize = 64
var zeroBuffer = new Buffer(blocksize); zeroBuffer.fill(0)
function hmac(fn, key, data) {
  if(!Buffer.isBuffer(key)) key = new Buffer(key)
  if(!Buffer.isBuffer(data)) data = new Buffer(data)

  if(key.length > blocksize) {
    key = fn(key)
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = new Buffer(blocksize), opad = new Buffer(blocksize)
  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var hash = fn(Buffer.concat([ipad, data]))
  return fn(Buffer.concat([opad, hash]))
}

function hash(alg, key) {
  alg = alg || 'sha1'
  var fn = algorithms[alg]
  var bufs = []
  var length = 0
  if(!fn) error('algorithm:', alg, 'is not yet supported')
  return {
    update: function (data) {
      if(!Buffer.isBuffer(data)) data = new Buffer(data)
        
      bufs.push(data)
      length += data.length
      return this
    },
    digest: function (enc) {
      var buf = Buffer.concat(bufs)
      var r = key ? hmac(fn, key, buf) : fn(buf)
      bufs = null
      return enc ? r.toString(enc) : r
    }
  }
}

function error () {
  var m = [].slice.call(arguments).join(' ')
  throw new Error([
    m,
    'we accept pull requests',
    'http://github.com/dominictarr/crypto-browserify'
    ].join('\n'))
}

exports.createHash = function (alg) { return hash(alg) }
exports.createHmac = function (alg, key) { return hash(alg, key) }
exports.randomBytes = function(size, callback) {
  if (callback && callback.call) {
    try {
      callback.call(this, undefined, new Buffer(rng(size)))
    } catch (err) { callback(err) }
  } else {
    return new Buffer(rng(size))
  }
}

function each(a, f) {
  for(var i in a)
    f(a[i], i)
}

// the least I can do is make error messages for the rest of the node.js/crypto api.
each(['createCredentials'
, 'createCipher'
, 'createCipheriv'
, 'createDecipher'
, 'createDecipheriv'
, 'createSign'
, 'createVerify'
, 'createDiffieHellman'
, 'pbkdf2'], function (name) {
  exports[name] = function () {
    error('sorry,', name, 'is not implemented yet')
  }
})


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 220 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 221 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var helpers = __webpack_require__(44);

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function sha1(buf) {
  return helpers.hash(buf, core_sha1, 20, true);
};


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var helpers = __webpack_require__(44);

var safe_add = function(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

var S = function(X, n) {
  return (X >>> n) | (X << (32 - n));
};

var R = function(X, n) {
  return (X >>> n);
};

var Ch = function(x, y, z) {
  return ((x & y) ^ ((~x) & z));
};

var Maj = function(x, y, z) {
  return ((x & y) ^ (x & z) ^ (y & z));
};

var Sigma0256 = function(x) {
  return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
};

var Sigma1256 = function(x) {
  return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
};

var Gamma0256 = function(x) {
  return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
};

var Gamma1256 = function(x) {
  return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
};

var core_sha256 = function(m, l) {
  var K = new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);
  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
  /* append padding */
  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;
  for (var i = 0; i < m.length; i += 16) {
    a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7];
    for (var j = 0; j < 64; j++) {
      if (j < 16) {
        W[j] = m[j + i];
      } else {
        W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
      }
      T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
      T2 = safe_add(Sigma0256(a), Maj(a, b, c));
      h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2);
    }
    HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
};

module.exports = function sha256(buf) {
  return helpers.hash(buf, core_sha256, 32, true);
};


/***/ }),
/* 224 */
/***/ (function(module, exports) {

// Original code adapted from Robert Kieffer.
// details at https://github.com/broofa/node-uuid
(function() {
  var _global = this;

  var mathRNG, whatwgRNG;

  // NOTE: Math.random() does not guarantee "cryptographic quality"
  mathRNG = function(size) {
    var bytes = new Array(size);
    var r;

    for (var i = 0, r; i < size; i++) {
      if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
      bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return bytes;
  }

  if (_global.crypto && crypto.getRandomValues) {
    whatwgRNG = function(size) {
      var bytes = new Uint8Array(size);
      crypto.getRandomValues(bytes);
      return bytes;
    }
  }

  module.exports = whatwgRNG || mathRNG;

}())


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var helpers = __webpack_require__(44);

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function md5(buf) {
  return helpers.hash(buf, core_md5, 16);
};


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(227);
var util = __webpack_require__(228);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(82);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)(module), __webpack_require__(10)))

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var STS = __webpack_require__(25);

/**
 * Represents temporary credentials retrieved from {AWS.STS}. Without any
 * extra parameters, credentials will be fetched from the
 * {AWS.STS.getSessionToken} operation. If an IAM role is provided, the
 * {AWS.STS.assumeRole} operation will be used to fetch credentials for the
 * role instead.
 *
 * To setup temporary credentials, configure a set of master credentials
 * using the standard credentials providers (environment, EC2 instance metadata,
 * or from the filesystem), then set the global credentials to a new
 * temporary credentials object:
 *
 * ```javascript
 * // Note that environment credentials are loaded by default,
 * // the following line is shown for clarity:
 * AWS.config.credentials = new AWS.EnvironmentCredentials('AWS');
 *
 * // Now set temporary credentials seeded from the master credentials
 * AWS.config.credentials = new AWS.TemporaryCredentials();
 *
 * // subsequent requests will now use temporary credentials from AWS STS.
 * new AWS.S3().listBucket(function(err, data) { ... });
 * ```
 *
 * @!attribute masterCredentials
 *   @return [AWS.Credentials] the master (non-temporary) credentials used to
 *     get and refresh temporary credentials from AWS STS.
 * @note (see constructor)
 */
AWS.TemporaryCredentials = AWS.util.inherit(AWS.Credentials, {
  /**
   * Creates a new temporary credentials object.
   *
   * @note In order to create temporary credentials, you first need to have
   *   "master" credentials configured in {AWS.Config.credentials}. These
   *   master credentials are necessary to retrieve the temporary credentials,
   *   as well as refresh the credentials when they expire.
   * @param params [map] a map of options that are passed to the
   *   {AWS.STS.assumeRole} or {AWS.STS.getSessionToken} operations.
   *   If a `RoleArn` parameter is passed in, credentials will be based on the
   *   IAM role.
   * @param masterCredentials [AWS.Credentials] the master (non-temporary) credentials
   *  used to get and refresh temporary credentials from AWS STS.
   * @example Creating a new credentials object for generic temporary credentials
   *   AWS.config.credentials = new AWS.TemporaryCredentials();
   * @example Creating a new credentials object for an IAM role
   *   AWS.config.credentials = new AWS.TemporaryCredentials({
   *     RoleArn: 'arn:aws:iam::1234567890:role/TemporaryCredentials',
   *   });
   * @see AWS.STS.assumeRole
   * @see AWS.STS.getSessionToken
   */
  constructor: function TemporaryCredentials(params, masterCredentials) {
    AWS.Credentials.call(this);
    this.loadMasterCredentials(masterCredentials);
    this.expired = true;

    this.params = params || {};
    if (this.params.RoleArn) {
      this.params.RoleSessionName =
        this.params.RoleSessionName || 'temporary-credentials';
    }
  },

  /**
   * Refreshes credentials using {AWS.STS.assumeRole} or
   * {AWS.STS.getSessionToken}, depending on whether an IAM role ARN was passed
   * to the credentials {constructor}.
   *
   * @callback callback function(err)
   *   Called when the STS service responds (or fails). When
   *   this callback is called with no error, it means that the credentials
   *   information has been loaded into the object (as the `accessKeyId`,
   *   `secretAccessKey`, and `sessionToken` properties).
   *   @param err [Error] if an error occurred, this value will be filled
   * @see get
   */
  refresh: function refresh(callback) {
    var self = this;
    self.createClients();
    if (!callback) callback = function(err) { if (err) throw err; };

    self.masterCredentials.get(function() {
      self.service.config.credentials = self.masterCredentials;
      var operation = self.params.RoleArn ?
        self.service.assumeRole : self.service.getSessionToken;
      operation.call(self.service, function (err, data) {
        if (!err) {
          self.service.credentialsFrom(data, self);
        }
        callback(err);
      });
    });
  },

  /**
   * @api private
   */
  loadMasterCredentials: function loadMasterCredentials(masterCredentials) {
    this.masterCredentials = masterCredentials || AWS.config.credentials;
    while (this.masterCredentials.masterCredentials) {
      this.masterCredentials = this.masterCredentials.masterCredentials;
    }

    if (typeof this.masterCredentials.get !== 'function') {
      this.masterCredentials = new AWS.Credentials(this.masterCredentials);
    }
  },

  /**
   * @api private
   */
  createClients: function() {
    this.service = this.service || new STS({params: this.params});
  }

});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);

AWS.util.update(AWS.STS.prototype, {
  /**
   * @overload credentialsFrom(data, credentials = null)
   *   Creates a credentials object from STS response data containing
   *   credentials information. Useful for quickly setting AWS credentials.
   *
   *   @note This is a low-level utility function. If you want to load temporary
   *     credentials into your process for subsequent requests to AWS resources,
   *     you should use {AWS.TemporaryCredentials} instead.
   *   @param data [map] data retrieved from a call to {getFederatedToken},
   *     {getSessionToken}, {assumeRole}, or {assumeRoleWithWebIdentity}.
   *   @param credentials [AWS.Credentials] an optional credentials object to
   *     fill instead of creating a new object. Useful when modifying an
   *     existing credentials object from a refresh call.
   *   @return [AWS.TemporaryCredentials] the set of temporary credentials
   *     loaded from a raw STS operation response.
   *   @example Using credentialsFrom to load global AWS credentials
   *     var sts = new AWS.STS();
   *     sts.getSessionToken(function (err, data) {
   *       if (err) console.log("Error getting credentials");
   *       else {
   *         AWS.config.credentials = sts.credentialsFrom(data);
   *       }
   *     });
   *   @see AWS.TemporaryCredentials
   */
  credentialsFrom: function credentialsFrom(data, credentials) {
    if (!data) return null;
    if (!credentials) credentials = new AWS.TemporaryCredentials();
    credentials.expired = false;
    credentials.accessKeyId = data.Credentials.AccessKeyId;
    credentials.secretAccessKey = data.Credentials.SecretAccessKey;
    credentials.sessionToken = data.Credentials.SessionToken;
    credentials.expireTime = data.Credentials.Expiration;
    return credentials;
  },

  assumeRoleWithWebIdentity: function assumeRoleWithWebIdentity(params, callback) {
    return this.makeUnauthenticatedRequest('assumeRoleWithWebIdentity', params, callback);
  },

  assumeRoleWithSAML: function assumeRoleWithSAML(params, callback) {
    return this.makeUnauthenticatedRequest('assumeRoleWithSAML', params, callback);
  }
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var STS = __webpack_require__(25);

/**
 * Represents credentials retrieved from STS Web Identity Federation support.
 *
 * By default this provider gets credentials using the
 * {AWS.STS.assumeRoleWithWebIdentity} service operation. This operation
 * requires a `RoleArn` containing the ARN of the IAM trust policy for the
 * application for which credentials will be given. In addition, the
 * `WebIdentityToken` must be set to the token provided by the identity
 * provider. See {constructor} for an example on creating a credentials
 * object with proper `RoleArn` and `WebIdentityToken` values.
 *
 * ## Refreshing Credentials from Identity Service
 *
 * In addition to AWS credentials expiring after a given amount of time, the
 * login token from the identity provider will also expire. Once this token
 * expires, it will not be usable to refresh AWS credentials, and another
 * token will be needed. The SDK does not manage refreshing of the token value,
 * but this can be done through a "refresh token" supported by most identity
 * providers. Consult the documentation for the identity provider for refreshing
 * tokens. Once the refreshed token is acquired, you should make sure to update
 * this new token in the credentials object's {params} property. The following
 * code will update the WebIdentityToken, assuming you have retrieved an updated
 * token from the identity provider:
 *
 * ```javascript
 * AWS.config.credentials.params.WebIdentityToken = updatedToken;
 * ```
 *
 * Future calls to `credentials.refresh()` will now use the new token.
 *
 * @!attribute params
 *   @return [map] the map of params passed to
 *     {AWS.STS.assumeRoleWithWebIdentity}. To update the token, set the
 *     `params.WebIdentityToken` property.
 * @!attribute data
 *   @return [map] the raw data response from the call to
 *     {AWS.STS.assumeRoleWithWebIdentity}. Use this if you want to get
 *     access to other properties from the response.
 */
AWS.WebIdentityCredentials = AWS.util.inherit(AWS.Credentials, {
  /**
   * Creates a new credentials object.
   * @param (see AWS.STS.assumeRoleWithWebIdentity)
   * @example Creating a new credentials object
   *   AWS.config.credentials = new AWS.WebIdentityCredentials({
   *     RoleArn: 'arn:aws:iam::1234567890:role/WebIdentity',
   *     WebIdentityToken: 'ABCDEFGHIJKLMNOP', // token from identity service
   *     RoleSessionName: 'web' // optional name, defaults to web-identity
   *   }, {
   *     // optionally provide configuration to apply to the underlying AWS.STS service client
   *     // if configuration is not provided, then configuration will be pulled from AWS.config
   *
   *     // specify timeout options
   *     httpOptions: {
   *       timeout: 100
   *     }
   *   });
   * @see AWS.STS.assumeRoleWithWebIdentity
   * @see AWS.Config
   */
  constructor: function WebIdentityCredentials(params, clientConfig) {
    AWS.Credentials.call(this);
    this.expired = true;
    this.params = params;
    this.params.RoleSessionName = this.params.RoleSessionName || 'web-identity';
    this.data = null;
    this._clientConfig = AWS.util.copy(clientConfig || {});
  },

  /**
   * Refreshes credentials using {AWS.STS.assumeRoleWithWebIdentity}
   *
   * @callback callback function(err)
   *   Called when the STS service responds (or fails). When
   *   this callback is called with no error, it means that the credentials
   *   information has been loaded into the object (as the `accessKeyId`,
   *   `secretAccessKey`, and `sessionToken` properties).
   *   @param err [Error] if an error occurred, this value will be filled
   * @see get
   */
  refresh: function refresh(callback) {
    var self = this;
    self.createClients();
    if (!callback) callback = function(err) { if (err) throw err; };

    self.service.assumeRoleWithWebIdentity(function (err, data) {
      self.data = null;
      if (!err) {
        self.data = data;
        self.service.credentialsFrom(data, self);
      }
      callback(err);
    });
  },

  /**
   * @api private
   */
  createClients: function() {
    if (!this.service) {
      var stsConfig = AWS.util.merge({}, this._clientConfig);
      stsConfig.params = this.params;
      this.service = new STS(stsConfig);
    }
  }

});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var CognitoIdentity = __webpack_require__(235);
var STS = __webpack_require__(25);

/**
 * Represents credentials retrieved from STS Web Identity Federation using
 * the Amazon Cognito Identity service.
 *
 * By default this provider gets credentials using the
 * {AWS.CognitoIdentity.getCredentialsForIdentity} service operation, which
 * requires either an `IdentityId` or an `IdentityPoolId` (Amazon Cognito
 * Identity Pool ID), which is used to call {AWS.CognitoIdentity.getId} to
 * obtain an `IdentityId`. If the identity or identity pool is not configured in
 * the Amazon Cognito Console to use IAM roles with the appropriate permissions,
 * then additionally a `RoleArn` is required containing the ARN of the IAM trust
 * policy for the Amazon Cognito role that the user will log into. If a `RoleArn`
 * is provided, then this provider gets credentials using the
 * {AWS.STS.assumeRoleWithWebIdentity} service operation, after first getting an
 * Open ID token from {AWS.CognitoIdentity.getOpenIdToken}.
 *
 * In addition, if this credential provider is used to provide authenticated
 * login, the `Logins` map may be set to the tokens provided by the respective
 * identity providers. See {constructor} for an example on creating a credentials
 * object with proper property values.
 *
 * ## Refreshing Credentials from Identity Service
 *
 * In addition to AWS credentials expiring after a given amount of time, the
 * login token from the identity provider will also expire. Once this token
 * expires, it will not be usable to refresh AWS credentials, and another
 * token will be needed. The SDK does not manage refreshing of the token value,
 * but this can be done through a "refresh token" supported by most identity
 * providers. Consult the documentation for the identity provider for refreshing
 * tokens. Once the refreshed token is acquired, you should make sure to update
 * this new token in the credentials object's {params} property. The following
 * code will update the WebIdentityToken, assuming you have retrieved an updated
 * token from the identity provider:
 *
 * ```javascript
 * AWS.config.credentials.params.Logins['graph.facebook.com'] = updatedToken;
 * ```
 *
 * Future calls to `credentials.refresh()` will now use the new token.
 *
 * @!attribute params
 *   @return [map] the map of params passed to
 *     {AWS.CognitoIdentity.getId},
 *     {AWS.CognitoIdentity.getOpenIdToken}, and
 *     {AWS.STS.assumeRoleWithWebIdentity}. To update the token, set the
 *     `params.WebIdentityToken` property.
 * @!attribute data
 *   @return [map] the raw data response from the call to
 *     {AWS.CognitoIdentity.getCredentialsForIdentity}, or
 *     {AWS.STS.assumeRoleWithWebIdentity}. Use this if you want to get
 *     access to other properties from the response.
 * @!attribute identityId
 *   @return [String] the Cognito ID returned by the last call to
 *     {AWS.CognitoIdentity.getOpenIdToken}. This ID represents the actual
 *     final resolved identity ID from Amazon Cognito.
 */
AWS.CognitoIdentityCredentials = AWS.util.inherit(AWS.Credentials, {
  /**
   * @api private
   */
  localStorageKey: {
    id: 'aws.cognito.identity-id.',
    providers: 'aws.cognito.identity-providers.'
  },

  /**
   * Creates a new credentials object.
   * @example Creating a new credentials object
   *   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
   *
   *     // either IdentityPoolId or IdentityId is required
   *     // See the IdentityPoolId param for AWS.CognitoIdentity.getID (linked below)
   *     // See the IdentityId param for AWS.CognitoIdentity.getCredentialsForIdentity
   *     // or AWS.CognitoIdentity.getOpenIdToken (linked below)
   *     IdentityPoolId: 'us-east-1:1699ebc0-7900-4099-b910-2df94f52a030',
   *     IdentityId: 'us-east-1:128d0a74-c82f-4553-916d-90053e4a8b0f'
   *
   *     // optional, only necessary when the identity pool is not configured
   *     // to use IAM roles in the Amazon Cognito Console
   *     // See the RoleArn param for AWS.STS.assumeRoleWithWebIdentity (linked below)
   *     RoleArn: 'arn:aws:iam::1234567890:role/MYAPP-CognitoIdentity',
   *
   *     // optional tokens, used for authenticated login
   *     // See the Logins param for AWS.CognitoIdentity.getID (linked below)
   *     Logins: {
   *       'graph.facebook.com': 'FBTOKEN',
   *       'www.amazon.com': 'AMAZONTOKEN',
   *       'accounts.google.com': 'GOOGLETOKEN',
   *       'api.twitter.com': 'TWITTERTOKEN',
   *       'www.digits.com': 'DIGITSTOKEN'
   *     },
   *
   *     // optional name, defaults to web-identity
   *     // See the RoleSessionName param for AWS.STS.assumeRoleWithWebIdentity (linked below)
   *     RoleSessionName: 'web',
   *
   *     // optional, only necessary when application runs in a browser
   *     // and multiple users are signed in at once, used for caching
   *     LoginId: 'example@gmail.com'
   *
   *   }, {
   *      // optionally provide configuration to apply to the underlying service clients
   *      // if configuration is not provided, then configuration will be pulled from AWS.config
   *
   *      // region should match the region your identity pool is located in
   *      region: 'us-east-1',
   *
   *      // specify timeout options
   *      httpOptions: {
   *        timeout: 100
   *      }
   *   });
   * @see AWS.CognitoIdentity.getId
   * @see AWS.CognitoIdentity.getCredentialsForIdentity
   * @see AWS.STS.assumeRoleWithWebIdentity
   * @see AWS.CognitoIdentity.getOpenIdToken
   * @see AWS.Config
   * @note If a region is not provided in the global AWS.config, or
   *   specified in the `clientConfig` to the CognitoIdentityCredentials
   *   constructor, you may encounter a 'Missing credentials in config' error
   *   when calling making a service call.
   */
  constructor: function CognitoIdentityCredentials(params, clientConfig) {
    AWS.Credentials.call(this);
    this.expired = true;
    this.params = params;
    this.data = null;
    this._identityId = null;
    this._clientConfig = AWS.util.copy(clientConfig || {});
    this.loadCachedId();
    var self = this;
    Object.defineProperty(this, 'identityId', {
      get: function() {
        self.loadCachedId();
        return self._identityId || self.params.IdentityId;
      },
      set: function(identityId) {
        self._identityId = identityId;
      }
    });
  },

  /**
   * Refreshes credentials using {AWS.CognitoIdentity.getCredentialsForIdentity},
   * or {AWS.STS.assumeRoleWithWebIdentity}.
   *
   * @callback callback function(err)
   *   Called when the STS service responds (or fails). When
   *   this callback is called with no error, it means that the credentials
   *   information has been loaded into the object (as the `accessKeyId`,
   *   `secretAccessKey`, and `sessionToken` properties).
   *   @param err [Error] if an error occurred, this value will be filled
   * @see AWS.Credentials.get
   */
  refresh: function refresh(callback) {
    var self = this;
    self.createClients();
    self.data = null;
    self._identityId = null;
    self.getId(function(err) {
      if (!err) {
        if (!self.params.RoleArn) {
          self.getCredentialsForIdentity(callback);
        } else {
          self.getCredentialsFromSTS(callback);
        }
      } else {
        self.clearIdOnNotAuthorized(err);
        callback(err);
      }
    });
  },

  /**
   * Clears the cached Cognito ID associated with the currently configured
   * identity pool ID. Use this to manually invalidate your cache if
   * the identity pool ID was deleted.
   */
  clearCachedId: function clearCache() {
    this._identityId = null;
    delete this.params.IdentityId;

    var poolId = this.params.IdentityPoolId;
    var loginId = this.params.LoginId || '';
    delete this.storage[this.localStorageKey.id + poolId + loginId];
    delete this.storage[this.localStorageKey.providers + poolId + loginId];
  },

  /**
   * @api private
   */
  clearIdOnNotAuthorized: function clearIdOnNotAuthorized(err) {
    var self = this;
    if (err.code == 'NotAuthorizedException') {
      self.clearCachedId();
    }
  },

  /**
   * Retrieves a Cognito ID, loading from cache if it was already retrieved
   * on this device.
   *
   * @callback callback function(err, identityId)
   *   @param err [Error, null] an error object if the call failed or null if
   *     it succeeded.
   *   @param identityId [String, null] if successful, the callback will return
   *     the Cognito ID.
   * @note If not loaded explicitly, the Cognito ID is loaded and stored in
   *   localStorage in the browser environment of a device.
   * @api private
   */
  getId: function getId(callback) {
    var self = this;
    if (typeof self.params.IdentityId === 'string') {
      return callback(null, self.params.IdentityId);
    }

    self.cognito.getId(function(err, data) {
      if (!err && data.IdentityId) {
        self.params.IdentityId = data.IdentityId;
        callback(null, data.IdentityId);
      } else {
        callback(err);
      }
    });
  },


  /**
   * @api private
   */
  loadCredentials: function loadCredentials(data, credentials) {
    if (!data || !credentials) return;
    credentials.expired = false;
    credentials.accessKeyId = data.Credentials.AccessKeyId;
    credentials.secretAccessKey = data.Credentials.SecretKey;
    credentials.sessionToken = data.Credentials.SessionToken;
    credentials.expireTime = data.Credentials.Expiration;
  },

  /**
   * @api private
   */
  getCredentialsForIdentity: function getCredentialsForIdentity(callback) {
    var self = this;
    self.cognito.getCredentialsForIdentity(function(err, data) {
      if (!err) {
        self.cacheId(data);
        self.data = data;
        self.loadCredentials(self.data, self);
      } else {
        self.clearIdOnNotAuthorized(err);
      }
      callback(err);
    });
  },

  /**
   * @api private
   */
  getCredentialsFromSTS: function getCredentialsFromSTS(callback) {
    var self = this;
    self.cognito.getOpenIdToken(function(err, data) {
      if (!err) {
        self.cacheId(data);
        self.params.WebIdentityToken = data.Token;
        self.webIdentityCredentials.refresh(function(webErr) {
          if (!webErr) {
            self.data = self.webIdentityCredentials.data;
            self.sts.credentialsFrom(self.data, self);
          }
          callback(webErr);
        });
      } else {
        self.clearIdOnNotAuthorized(err);
        callback(err);
      }
    });
  },

  /**
   * @api private
   */
  loadCachedId: function loadCachedId() {
    var self = this;

    // in the browser we source default IdentityId from localStorage
    if (AWS.util.isBrowser() && !self.params.IdentityId) {
      var id = self.getStorage('id');
      if (id && self.params.Logins) {
        var actualProviders = Object.keys(self.params.Logins);
        var cachedProviders =
          (self.getStorage('providers') || '').split(',');

        // only load ID if at least one provider used this ID before
        var intersect = cachedProviders.filter(function(n) {
          return actualProviders.indexOf(n) !== -1;
        });
        if (intersect.length !== 0) {
          self.params.IdentityId = id;
        }
      } else if (id) {
        self.params.IdentityId = id;
      }
    }
  },

  /**
   * @api private
   */
  createClients: function() {
    var clientConfig = this._clientConfig;
    this.webIdentityCredentials = this.webIdentityCredentials ||
      new AWS.WebIdentityCredentials(this.params, clientConfig);
    if (!this.cognito) {
      var cognitoConfig = AWS.util.merge({}, clientConfig);
      cognitoConfig.params = this.params;
      this.cognito = new CognitoIdentity(cognitoConfig);
    }
    this.sts = this.sts || new STS(clientConfig);
  },

  /**
   * @api private
   */
  cacheId: function cacheId(data) {
    this._identityId = data.IdentityId;
    this.params.IdentityId = this._identityId;

    // cache this IdentityId in browser localStorage if possible
    if (AWS.util.isBrowser()) {
      this.setStorage('id', data.IdentityId);

      if (this.params.Logins) {
        this.setStorage('providers', Object.keys(this.params.Logins).join(','));
      }
    }
  },

  /**
   * @api private
   */
  getStorage: function getStorage(key) {
    return this.storage[this.localStorageKey[key] + this.params.IdentityPoolId + (this.params.LoginId || '')];
  },

  /**
   * @api private
   */
  setStorage: function setStorage(key, val) {
    try {
      this.storage[this.localStorageKey[key] + this.params.IdentityPoolId + (this.params.LoginId || '')] = val;
    } catch (_) {}
  },

  /**
   * @api private
   */
  storage: (function() {
    try {
      var storage = AWS.util.isBrowser() && window.localStorage !== null && typeof window.localStorage === 'object' ?
          window.localStorage : {};

      // Test set/remove which would throw an error in Safari's private browsing
      storage['aws.test-storage'] = 'foobar';
      delete storage['aws.test-storage'];

      return storage;
    } catch (_) {
      return {};
    }
  })()
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
var AWS = __webpack_require__(0);
var Service = AWS.Service;
var apiLoader = AWS.apiLoader;

apiLoader.services['cognitoidentity'] = {};
AWS.CognitoIdentity = Service.defineService('cognitoidentity', ['2014-06-30']);
__webpack_require__(236);
Object.defineProperty(apiLoader.services['cognitoidentity'], '2014-06-30', {
  get: function get() {
    var model = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../apis/cognito-identity-2014-06-30.min.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    model.paginators = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../apis/cognito-identity-2014-06-30.paginators.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).pagination;
    return model;
  },
  enumerable: true,
  configurable: true
});

module.exports = AWS.CognitoIdentity;


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);

AWS.util.update(AWS.CognitoIdentity.prototype, {
  getOpenIdToken: function getOpenIdToken(params, callback) {
    return this.makeUnauthenticatedRequest('getOpenIdToken', params, callback);
  },

  getId: function getId(params, callback) {
    return this.makeUnauthenticatedRequest('getId', params, callback);
  },

  getCredentialsForIdentity: function getCredentialsForIdentity(params, callback) {
    return this.makeUnauthenticatedRequest('getCredentialsForIdentity', params, callback);
  }
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var STS = __webpack_require__(25);

/**
 * Represents credentials retrieved from STS SAML support.
 *
 * By default this provider gets credentials using the
 * {AWS.STS.assumeRoleWithSAML} service operation. This operation
 * requires a `RoleArn` containing the ARN of the IAM trust policy for the
 * application for which credentials will be given, as well as a `PrincipalArn`
 * representing the ARN for the SAML identity provider. In addition, the
 * `SAMLAssertion` must be set to the token provided by the identity
 * provider. See {constructor} for an example on creating a credentials
 * object with proper `RoleArn`, `PrincipalArn`, and `SAMLAssertion` values.
 *
 * ## Refreshing Credentials from Identity Service
 *
 * In addition to AWS credentials expiring after a given amount of time, the
 * login token from the identity provider will also expire. Once this token
 * expires, it will not be usable to refresh AWS credentials, and another
 * token will be needed. The SDK does not manage refreshing of the token value,
 * but this can be done through a "refresh token" supported by most identity
 * providers. Consult the documentation for the identity provider for refreshing
 * tokens. Once the refreshed token is acquired, you should make sure to update
 * this new token in the credentials object's {params} property. The following
 * code will update the SAMLAssertion, assuming you have retrieved an updated
 * token from the identity provider:
 *
 * ```javascript
 * AWS.config.credentials.params.SAMLAssertion = updatedToken;
 * ```
 *
 * Future calls to `credentials.refresh()` will now use the new token.
 *
 * @!attribute params
 *   @return [map] the map of params passed to
 *     {AWS.STS.assumeRoleWithSAML}. To update the token, set the
 *     `params.SAMLAssertion` property.
 */
AWS.SAMLCredentials = AWS.util.inherit(AWS.Credentials, {
  /**
   * Creates a new credentials object.
   * @param (see AWS.STS.assumeRoleWithSAML)
   * @example Creating a new credentials object
   *   AWS.config.credentials = new AWS.SAMLCredentials({
   *     RoleArn: 'arn:aws:iam::1234567890:role/SAMLRole',
   *     PrincipalArn: 'arn:aws:iam::1234567890:role/SAMLPrincipal',
   *     SAMLAssertion: 'base64-token', // base64-encoded token from IdP
   *   });
   * @see AWS.STS.assumeRoleWithSAML
   */
  constructor: function SAMLCredentials(params) {
    AWS.Credentials.call(this);
    this.expired = true;
    this.params = params;
  },

  /**
   * Refreshes credentials using {AWS.STS.assumeRoleWithSAML}
   *
   * @callback callback function(err)
   *   Called when the STS service responds (or fails). When
   *   this callback is called with no error, it means that the credentials
   *   information has been loaded into the object (as the `accessKeyId`,
   *   `secretAccessKey`, and `sessionToken` properties).
   *   @param err [Error] if an error occurred, this value will be filled
   * @see get
   */
  refresh: function refresh(callback) {
    var self = this;
    self.createClients();
    if (!callback) callback = function(err) { if (err) throw err; };

    self.service.assumeRoleWithSAML(function (err, data) {
      if (!err) {
        self.service.credentialsFrom(data, self);
      }
      callback(err);
    });
  },

  /**
   * @api private
   */
  createClients: function() {
    this.service = this.service || new STS({params: this.params});
  }

});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(1);
var Shape = __webpack_require__(8);

function DomXmlParser() { }

DomXmlParser.prototype.parse = function(xml, shape) {
  if (xml.replace(/^\s+/, '') === '') return {};

  var result, error;
  try {
    if (window.DOMParser) {
      try {
        var parser = new DOMParser();
        result = parser.parseFromString(xml, 'text/xml');
      } catch (syntaxError) {
        throw util.error(new Error('Parse error in document'),
          {
            originalError: syntaxError,
            code: 'XMLParserError',
            retryable: true
          });
      }

      if (result.documentElement === null) {
        throw util.error(new Error('Cannot parse empty document.'),
          {
            code: 'XMLParserError',
            retryable: true
          });
      }

      var isError = result.getElementsByTagName('parsererror')[0];
      if (isError && (isError.parentNode === result ||
          isError.parentNode.nodeName === 'body' ||
          isError.parentNode.parentNode === result ||
          isError.parentNode.parentNode.nodeName === 'body')) {
        var errorElement = isError.getElementsByTagName('div')[0] || isError;
        throw util.error(new Error(errorElement.textContent || 'Parser error in document'),
          {
            code: 'XMLParserError',
            retryable: true
          });
      }
    } else if (window.ActiveXObject) {
      result = new window.ActiveXObject('Microsoft.XMLDOM');
      result.async = false;

      if (!result.loadXML(xml)) {
        throw util.error(new Error('Parse error in document'),
          {
            code: 'XMLParserError',
            retryable: true
          });
      }
    } else {
      throw new Error('Cannot load XML parser');
    }
  } catch (e) {
    error = e;
  }

  if (result && result.documentElement && !error) {
    var data = parseXml(result.documentElement, shape);
    var metadata = result.getElementsByTagName('ResponseMetadata')[0];
    if (metadata) {
      data.ResponseMetadata = parseXml(metadata, {});
    }
    return data;
  } else if (error) {
    throw util.error(error || new Error(), {code: 'XMLParserError', retryable: true});
  } else { // empty xml document
    return {};
  }
};

function parseXml(xml, shape) {
  if (!shape) shape = {};
  switch (shape.type) {
    case 'structure': return parseStructure(xml, shape);
    case 'map': return parseMap(xml, shape);
    case 'list': return parseList(xml, shape);
    case undefined: case null: return parseUnknown(xml);
    default: return parseScalar(xml, shape);
  }
}

function parseStructure(xml, shape) {
  var data = {};
  if (xml === null) return data;

  util.each(shape.members, function(memberName, memberShape) {
    if (memberShape.isXmlAttribute) {
      if (Object.prototype.hasOwnProperty.call(xml.attributes, memberShape.name)) {
        var value = xml.attributes[memberShape.name].value;
        data[memberName] = parseXml({textContent: value}, memberShape);
      }
    } else {
      var xmlChild = memberShape.flattened ? xml :
        xml.getElementsByTagName(memberShape.name)[0];
      if (xmlChild) {
        data[memberName] = parseXml(xmlChild, memberShape);
      } else if (!memberShape.flattened && memberShape.type === 'list') {
        data[memberName] = memberShape.defaultValue;
      }
    }
  });

  return data;
}

function parseMap(xml, shape) {
  var data = {};
  var xmlKey = shape.key.name || 'key';
  var xmlValue = shape.value.name || 'value';
  var tagName = shape.flattened ? shape.name : 'entry';

  var child = xml.firstElementChild;
  while (child) {
    if (child.nodeName === tagName) {
      var key = child.getElementsByTagName(xmlKey)[0].textContent;
      var value = child.getElementsByTagName(xmlValue)[0];
      data[key] = parseXml(value, shape.value);
    }
    child = child.nextElementSibling;
  }
  return data;
}

function parseList(xml, shape) {
  var data = [];
  var tagName = shape.flattened ? shape.name : (shape.member.name || 'member');

  var child = xml.firstElementChild;
  while (child) {
    if (child.nodeName === tagName) {
      data.push(parseXml(child, shape.member));
    }
    child = child.nextElementSibling;
  }
  return data;
}

function parseScalar(xml, shape) {
  if (xml.getAttribute) {
    var encoding = xml.getAttribute('encoding');
    if (encoding === 'base64') {
      shape = new Shape.create({type: encoding});
    }
  }

  var text = xml.textContent;
  if (text === '') text = null;
  if (typeof shape.toType === 'function') {
    return shape.toType(text);
  } else {
    return text;
  }
}

function parseUnknown(xml) {
  if (xml === undefined || xml === null) return '';

  // empty object
  if (!xml.firstElementChild) {
    if (xml.parentNode.parentNode === null) return {};
    if (xml.childNodes.length === 0) return '';
    else return xml.textContent;
  }

  // object, parse as structure
  var shape = {type: 'structure', members: {}};
  var child = xml.firstElementChild;
  while (child) {
    var tag = child.nodeName;
    if (Object.prototype.hasOwnProperty.call(shape.members, tag)) {
      // multiple tags of the same name makes it a list
      shape.members[tag].type = 'list';
    } else {
      shape.members[tag] = {name: tag};
    }
    child = child.nextElementSibling;
  }
  return parseStructure(xml, shape);
}

module.exports = DomXmlParser;


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var AWS = __webpack_require__(0);
var EventEmitter = __webpack_require__(240).EventEmitter;
__webpack_require__(77);

/**
 * @api private
 */
AWS.XHRClient = AWS.util.inherit({
  handleRequest: function handleRequest(httpRequest, httpOptions, callback, errCallback) {
    var self = this;
    var endpoint = httpRequest.endpoint;
    var emitter = new EventEmitter();
    var href = endpoint.protocol + '//' + endpoint.hostname;
    if (endpoint.port !== 80 && endpoint.port !== 443) {
      href += ':' + endpoint.port;
    }
    href += httpRequest.path;

    var xhr = new XMLHttpRequest(), headersEmitted = false;
    httpRequest.stream = xhr;

    xhr.addEventListener('readystatechange', function() {
      try {
        if (xhr.status === 0) return; // 0 code is invalid
      } catch (e) { return; }

      if (this.readyState >= this.HEADERS_RECEIVED && !headersEmitted) {
        emitter.statusCode = xhr.status;
        emitter.headers = self.parseHeaders(xhr.getAllResponseHeaders());
        emitter.emit(
          'headers',
          emitter.statusCode,
          emitter.headers,
          xhr.statusText
        );
        headersEmitted = true;
      }
      if (this.readyState === this.DONE) {
        self.finishRequest(xhr, emitter);
      }
    }, false);
    xhr.upload.addEventListener('progress', function (evt) {
      emitter.emit('sendProgress', evt);
    });
    xhr.addEventListener('progress', function (evt) {
      emitter.emit('receiveProgress', evt);
    }, false);
    xhr.addEventListener('timeout', function () {
      errCallback(AWS.util.error(new Error('Timeout'), {code: 'TimeoutError'}));
    }, false);
    xhr.addEventListener('error', function () {
      errCallback(AWS.util.error(new Error('Network Failure'), {
        code: 'NetworkingError'
      }));
    }, false);
    xhr.addEventListener('abort', function () {
      errCallback(AWS.util.error(new Error('Request aborted'), {
        code: 'RequestAbortedError'
      }));
    }, false);

    callback(emitter);
    xhr.open(httpRequest.method, href, httpOptions.xhrAsync !== false);
    AWS.util.each(httpRequest.headers, function (key, value) {
      if (key !== 'Content-Length' && key !== 'User-Agent' && key !== 'Host') {
        xhr.setRequestHeader(key, value);
      }
    });

    if (httpOptions.timeout && httpOptions.xhrAsync !== false) {
      xhr.timeout = httpOptions.timeout;
    }

    if (httpOptions.xhrWithCredentials) {
      xhr.withCredentials = true;
    }
    try { xhr.responseType = 'arraybuffer'; } catch (e) {}

    try {
      if (httpRequest.body) {
        xhr.send(httpRequest.body);
      } else {
        xhr.send();
      }
    } catch (err) {
      if (httpRequest.body && typeof httpRequest.body.buffer === 'object') {
        xhr.send(httpRequest.body.buffer); // send ArrayBuffer directly
      } else {
        throw err;
      }
    }

    return emitter;
  },

  parseHeaders: function parseHeaders(rawHeaders) {
    var headers = {};
    AWS.util.arrayEach(rawHeaders.split(/\r?\n/), function (line) {
      var key = line.split(':', 1)[0];
      var value = line.substring(key.length + 2);
      if (key.length > 0) headers[key.toLowerCase()] = value;
    });
    return headers;
  },

  finishRequest: function finishRequest(xhr, emitter) {
    var buffer;
    if (xhr.responseType === 'arraybuffer' && xhr.response) {
      var ab = xhr.response;
      buffer = new AWS.util.Buffer(ab.byteLength);
      var view = new Uint8Array(ab);
      for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
      }
    }

    try {
      if (!buffer && typeof xhr.responseText === 'string') {
        buffer = new AWS.util.Buffer(xhr.responseText);
      }
    } catch (e) {}

    if (buffer) emitter.emit('data', buffer);
    emitter.emit('end');
  }
});

/**
 * @api private
 */
AWS.HttpClient.prototype = AWS.XHRClient.prototype;

/**
 * @api private
 */
AWS.HttpClient.streamsApiVersion = 1;


/***/ }),
/* 240 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
var AWS = __webpack_require__(0);
var Service = AWS.Service;
var apiLoader = AWS.apiLoader;

apiLoader.services['cognitoidentityserviceprovider'] = {};
AWS.CognitoIdentityServiceProvider = Service.defineService('cognitoidentityserviceprovider', ['2016-04-18']);
Object.defineProperty(apiLoader.services['cognitoidentityserviceprovider'], '2016-04-18', {
  get: function get() {
    var model = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../apis/cognito-idp-2016-04-18.min.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    model.paginators = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../apis/cognito-idp-2016-04-18.paginators.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).pagination;
    return model;
  },
  enumerable: true,
  configurable: true
});

module.exports = AWS.CognitoIdentityServiceProvider;


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 * 
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 * 
 *     http://aws.amazon.com/asl/
 * 
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License. 
 */


!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return require(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){b.exports={version:"2.0",metadata:{apiVersion:"2014-06-30",endpointPrefix:"cognito-identity",jsonVersion:"1.1",protocol:"json",serviceFullName:"Amazon Cognito Identity",signatureVersion:"v4",targetPrefix:"AWSCognitoIdentityService"},operations:{CreateIdentityPool:{input:{type:"structure",required:["IdentityPoolName","AllowUnauthenticatedIdentities"],members:{IdentityPoolName:{},AllowUnauthenticatedIdentities:{type:"boolean"},SupportedLoginProviders:{shape:"S4"},DeveloperProviderName:{},OpenIdConnectProviderARNs:{shape:"S8"},CognitoIdentityProviders:{shape:"Sa"},SamlProviderARNs:{shape:"Se"}}},output:{shape:"Sf"}},DeleteIdentities:{input:{type:"structure",required:["IdentityIdsToDelete"],members:{IdentityIdsToDelete:{type:"list",member:{}}}},output:{type:"structure",members:{UnprocessedIdentityIds:{type:"list",member:{type:"structure",members:{IdentityId:{},ErrorCode:{}}}}}}},DeleteIdentityPool:{input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{}}}},DescribeIdentity:{input:{type:"structure",required:["IdentityId"],members:{IdentityId:{}}},output:{shape:"Sq"}},DescribeIdentityPool:{input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{}}},output:{shape:"Sf"}},GetCredentialsForIdentity:{input:{type:"structure",required:["IdentityId"],members:{IdentityId:{},Logins:{shape:"Sv"},CustomRoleArn:{}}},output:{type:"structure",members:{IdentityId:{},Credentials:{type:"structure",members:{AccessKeyId:{},SecretKey:{},SessionToken:{},Expiration:{type:"timestamp"}}}}}},GetId:{input:{type:"structure",required:["IdentityPoolId"],members:{AccountId:{},IdentityPoolId:{},Logins:{shape:"Sv"}}},output:{type:"structure",members:{IdentityId:{}}}},GetIdentityPoolRoles:{input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{}}},output:{type:"structure",members:{IdentityPoolId:{},Roles:{shape:"S17"}}}},GetOpenIdToken:{input:{type:"structure",required:["IdentityId"],members:{IdentityId:{},Logins:{shape:"Sv"}}},output:{type:"structure",members:{IdentityId:{},Token:{}}}},GetOpenIdTokenForDeveloperIdentity:{input:{type:"structure",required:["IdentityPoolId","Logins"],members:{IdentityPoolId:{},IdentityId:{},Logins:{shape:"Sv"},TokenDuration:{type:"long"}}},output:{type:"structure",members:{IdentityId:{},Token:{}}}},ListIdentities:{input:{type:"structure",required:["IdentityPoolId","MaxResults"],members:{IdentityPoolId:{},MaxResults:{type:"integer"},NextToken:{},HideDisabled:{type:"boolean"}}},output:{type:"structure",members:{IdentityPoolId:{},Identities:{type:"list",member:{shape:"Sq"}},NextToken:{}}}},ListIdentityPools:{input:{type:"structure",required:["MaxResults"],members:{MaxResults:{type:"integer"},NextToken:{}}},output:{type:"structure",members:{IdentityPools:{type:"list",member:{type:"structure",members:{IdentityPoolId:{},IdentityPoolName:{}}}},NextToken:{}}}},LookupDeveloperIdentity:{input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{},IdentityId:{},DeveloperUserIdentifier:{},MaxResults:{type:"integer"},NextToken:{}}},output:{type:"structure",members:{IdentityId:{},DeveloperUserIdentifierList:{type:"list",member:{}},NextToken:{}}}},MergeDeveloperIdentities:{input:{type:"structure",required:["SourceUserIdentifier","DestinationUserIdentifier","DeveloperProviderName","IdentityPoolId"],members:{SourceUserIdentifier:{},DestinationUserIdentifier:{},DeveloperProviderName:{},IdentityPoolId:{}}},output:{type:"structure",members:{IdentityId:{}}}},SetIdentityPoolRoles:{input:{type:"structure",required:["IdentityPoolId","Roles"],members:{IdentityPoolId:{},Roles:{shape:"S17"}}}},UnlinkDeveloperIdentity:{input:{type:"structure",required:["IdentityId","IdentityPoolId","DeveloperProviderName","DeveloperUserIdentifier"],members:{IdentityId:{},IdentityPoolId:{},DeveloperProviderName:{},DeveloperUserIdentifier:{}}}},UnlinkIdentity:{input:{type:"structure",required:["IdentityId","Logins","LoginsToRemove"],members:{IdentityId:{},Logins:{shape:"Sv"},LoginsToRemove:{shape:"Sr"}}}},UpdateIdentityPool:{input:{shape:"Sf"},output:{shape:"Sf"}}},shapes:{S4:{type:"map",key:{},value:{}},S8:{type:"list",member:{}},Sa:{type:"list",member:{type:"structure",members:{ProviderName:{},ClientId:{}}}},Se:{type:"list",member:{}},Sf:{type:"structure",required:["IdentityPoolId","IdentityPoolName","AllowUnauthenticatedIdentities"],members:{IdentityPoolId:{},IdentityPoolName:{},AllowUnauthenticatedIdentities:{type:"boolean"},SupportedLoginProviders:{shape:"S4"},DeveloperProviderName:{},OpenIdConnectProviderARNs:{shape:"S8"},CognitoIdentityProviders:{shape:"Sa"},SamlProviderARNs:{shape:"Se"}}},Sq:{type:"structure",members:{IdentityId:{},Logins:{shape:"Sr"},CreationDate:{type:"timestamp"},LastModifiedDate:{type:"timestamp"}}},Sr:{type:"list",member:{}},Sv:{type:"map",key:{},value:{}},S17:{type:"map",key:{},value:{}}}}},{}],2:[function(a,b,c){b.exports={version:"2.0",metadata:{apiVersion:"2016-04-18",endpointPrefix:"cognito-idp",jsonVersion:"1.1",protocol:"json",serviceFullName:"Amazon Cognito Identity Provider",signatureVersion:"v4",targetPrefix:"AWSCognitoIdentityProviderService"},operations:{AddCustomAttributes:{input:{type:"structure",required:["UserPoolId","CustomAttributes"],members:{UserPoolId:{},CustomAttributes:{type:"list",member:{shape:"S4"}}}},output:{type:"structure",members:{}}},AdminConfirmSignUp:{input:{type:"structure",required:["UserPoolId","Username"],members:{UserPoolId:{},Username:{shape:"Sd"}}},output:{type:"structure",members:{}}},AdminDeleteUser:{input:{type:"structure",required:["UserPoolId","Username"],members:{UserPoolId:{},Username:{shape:"Sd"}}}},AdminDeleteUserAttributes:{input:{type:"structure",required:["UserPoolId","Username","UserAttributeNames"],members:{UserPoolId:{},Username:{shape:"Sd"},UserAttributeNames:{shape:"Sh"}}},output:{type:"structure",members:{}}},AdminDisableUser:{input:{type:"structure",required:["UserPoolId","Username"],members:{UserPoolId:{},Username:{shape:"Sd"}}},output:{type:"structure",members:{}}},AdminEnableUser:{input:{type:"structure",required:["UserPoolId","Username"],members:{UserPoolId:{},Username:{shape:"Sd"}}},output:{type:"structure",members:{}}},AdminForgetDevice:{input:{type:"structure",required:["UserPoolId","Username","DeviceKey"],members:{UserPoolId:{},Username:{shape:"Sd"},DeviceKey:{}}}},AdminGetDevice:{input:{type:"structure",required:["DeviceKey","UserPoolId","Username"],members:{DeviceKey:{},UserPoolId:{},Username:{shape:"Sd"}}},output:{type:"structure",required:["Device"],members:{Device:{shape:"Ss"}}}},AdminGetUser:{input:{type:"structure",required:["UserPoolId","Username"],members:{UserPoolId:{},Username:{shape:"Sd"}}},output:{type:"structure",required:["Username"],members:{Username:{shape:"Sd"},UserAttributes:{shape:"St"},UserCreateDate:{type:"timestamp"},UserLastModifiedDate:{type:"timestamp"},Enabled:{type:"boolean"},UserStatus:{},MFAOptions:{shape:"S10"}}}},AdminInitiateAuth:{input:{type:"structure",required:["UserPoolId","ClientId","AuthFlow"],members:{UserPoolId:{},ClientId:{shape:"S14"},AuthFlow:{},AuthParameters:{shape:"S16"},ClientMetadata:{shape:"S17"}}},output:{type:"structure",members:{ChallengeName:{},Session:{},ChallengeParameters:{shape:"S1b"},AuthenticationResult:{shape:"S1c"}}}},AdminListDevices:{input:{type:"structure",required:["UserPoolId","Username"],members:{UserPoolId:{},Username:{shape:"Sd"},Limit:{type:"integer"},PaginationToken:{}}},output:{type:"structure",members:{Devices:{shape:"S1k"},PaginationToken:{}}}},AdminResetUserPassword:{input:{type:"structure",required:["UserPoolId","Username"],members:{UserPoolId:{},Username:{shape:"Sd"}}},output:{type:"structure",members:{}}},AdminRespondToAuthChallenge:{input:{type:"structure",required:["UserPoolId","ClientId","ChallengeName"],members:{UserPoolId:{},ClientId:{shape:"S14"},ChallengeName:{},ChallengeResponses:{shape:"S1o"},Session:{}}},output:{type:"structure",members:{ChallengeName:{},Session:{},ChallengeParameters:{shape:"S1b"},AuthenticationResult:{shape:"S1c"}}}},AdminSetUserSettings:{input:{type:"structure",required:["UserPoolId","Username","MFAOptions"],members:{UserPoolId:{},Username:{shape:"Sd"},MFAOptions:{shape:"S10"}}},output:{type:"structure",members:{}}},AdminUpdateDeviceStatus:{input:{type:"structure",required:["UserPoolId","Username","DeviceKey"],members:{UserPoolId:{},Username:{shape:"Sd"},DeviceKey:{},DeviceRememberedStatus:{}}},output:{type:"structure",members:{}}},AdminUpdateUserAttributes:{input:{type:"structure",required:["UserPoolId","Username","UserAttributes"],members:{UserPoolId:{},Username:{shape:"Sd"},UserAttributes:{shape:"St"}}},output:{type:"structure",members:{}}},AdminUserGlobalSignOut:{input:{type:"structure",required:["UserPoolId","Username"],members:{UserPoolId:{},Username:{shape:"Sd"}}},output:{type:"structure",members:{}}},ChangePassword:{input:{type:"structure",required:["PreviousPassword","ProposedPassword"],members:{PreviousPassword:{shape:"S20"},ProposedPassword:{shape:"S20"},AccessToken:{shape:"S1d"}}},output:{type:"structure",members:{}},authtype:"none"},ConfirmDevice:{input:{type:"structure",required:["AccessToken","DeviceKey"],members:{AccessToken:{shape:"S1d"},DeviceKey:{},DeviceSecretVerifierConfig:{type:"structure",members:{PasswordVerifier:{},Salt:{}}},DeviceName:{}}},output:{type:"structure",members:{UserConfirmationNecessary:{type:"boolean"}}}},ConfirmForgotPassword:{input:{type:"structure",required:["ClientId","Username","ConfirmationCode","Password"],members:{ClientId:{shape:"S14"},SecretHash:{shape:"S27"},Username:{shape:"Sd"},ConfirmationCode:{},Password:{shape:"S20"}}},output:{type:"structure",members:{}},authtype:"none"},ConfirmSignUp:{input:{type:"structure",required:["ClientId","Username","ConfirmationCode"],members:{ClientId:{shape:"S14"},SecretHash:{shape:"S27"},Username:{shape:"Sd"},ConfirmationCode:{},ForceAliasCreation:{type:"boolean"}}},output:{type:"structure",members:{}},authtype:"none"},CreateUserImportJob:{input:{type:"structure",required:["JobName","UserPoolId","CloudWatchLogsRoleArn"],members:{JobName:{},UserPoolId:{},CloudWatchLogsRoleArn:{}}},output:{type:"structure",members:{UserImportJob:{shape:"S2h"}}}},CreateUserPool:{input:{type:"structure",required:["PoolName"],members:{PoolName:{},Policies:{shape:"S2p"},LambdaConfig:{shape:"S2s"},AutoVerifiedAttributes:{shape:"S2t"},AliasAttributes:{shape:"S2v"},SmsVerificationMessage:{},EmailVerificationMessage:{},EmailVerificationSubject:{},SmsAuthenticationMessage:{},MfaConfiguration:{},DeviceConfiguration:{shape:"S31"},EmailConfiguration:{shape:"S32"},SmsConfiguration:{shape:"S34"}}},output:{type:"structure",members:{UserPool:{shape:"S36"}}}},CreateUserPoolClient:{input:{type:"structure",required:["UserPoolId","ClientName"],members:{UserPoolId:{},ClientName:{},GenerateSecret:{type:"boolean"},RefreshTokenValidity:{type:"integer"},ReadAttributes:{shape:"S3d"},WriteAttributes:{shape:"S3d"},ExplicitAuthFlows:{shape:"S3f"}}},output:{type:"structure",members:{UserPoolClient:{shape:"S3i"}}}},DeleteUser:{input:{type:"structure",members:{AccessToken:{shape:"S1d"}}},authtype:"none"},DeleteUserAttributes:{input:{type:"structure",required:["UserAttributeNames"],members:{UserAttributeNames:{shape:"Sh"},AccessToken:{shape:"S1d"}}},output:{type:"structure",members:{}},authtype:"none"},DeleteUserPool:{input:{type:"structure",required:["UserPoolId"],members:{UserPoolId:{}}}},DeleteUserPoolClient:{input:{type:"structure",required:["UserPoolId","ClientId"],members:{UserPoolId:{},ClientId:{shape:"S14"}}}},DescribeUserImportJob:{input:{type:"structure",required:["UserPoolId","JobId"],members:{UserPoolId:{},JobId:{}}},output:{type:"structure",members:{UserImportJob:{shape:"S2h"}}}},DescribeUserPool:{input:{type:"structure",required:["UserPoolId"],members:{UserPoolId:{}}},output:{type:"structure",members:{UserPool:{shape:"S36"}}}},DescribeUserPoolClient:{input:{type:"structure",required:["UserPoolId","ClientId"],members:{UserPoolId:{},ClientId:{shape:"S14"}}},output:{type:"structure",members:{UserPoolClient:{shape:"S3i"}}}},ForgetDevice:{input:{type:"structure",required:["DeviceKey"],members:{AccessToken:{shape:"S1d"},DeviceKey:{}}}},ForgotPassword:{input:{type:"structure",required:["ClientId","Username"],members:{ClientId:{shape:"S14"},SecretHash:{shape:"S27"},Username:{shape:"Sd"}}},output:{type:"structure",members:{CodeDeliveryDetails:{shape:"S3y"}}},authtype:"none"},GetCSVHeader:{input:{type:"structure",required:["UserPoolId"],members:{UserPoolId:{}}},output:{type:"structure",members:{UserPoolId:{},CSVHeader:{type:"list",member:{}}}}},GetDevice:{input:{type:"structure",required:["DeviceKey"],members:{DeviceKey:{},AccessToken:{shape:"S1d"}}},output:{type:"structure",required:["Device"],members:{Device:{shape:"Ss"}}}},GetUser:{input:{type:"structure",members:{AccessToken:{shape:"S1d"}}},output:{type:"structure",required:["Username","UserAttributes"],members:{Username:{shape:"Sd"},UserAttributes:{shape:"St"},MFAOptions:{shape:"S10"}}},authtype:"none"},GetUserAttributeVerificationCode:{input:{type:"structure",required:["AttributeName"],members:{AccessToken:{shape:"S1d"},AttributeName:{}}},output:{type:"structure",members:{CodeDeliveryDetails:{shape:"S3y"}}},authtype:"none"},GlobalSignOut:{input:{type:"structure",members:{AccessToken:{shape:"S1d"}}},output:{type:"structure",members:{}}},InitiateAuth:{input:{type:"structure",required:["AuthFlow","ClientId"],members:{AuthFlow:{},AuthParameters:{shape:"S16"},ClientMetadata:{shape:"S17"},ClientId:{shape:"S14"}}},output:{type:"structure",members:{ChallengeName:{},Session:{},ChallengeParameters:{shape:"S1b"},AuthenticationResult:{shape:"S1c"}}}},ListDevices:{input:{type:"structure",required:["AccessToken"],members:{AccessToken:{shape:"S1d"},Limit:{type:"integer"},PaginationToken:{}}},output:{type:"structure",members:{Devices:{shape:"S1k"},PaginationToken:{}}}},ListUserImportJobs:{input:{type:"structure",required:["UserPoolId","MaxResults"],members:{UserPoolId:{},MaxResults:{type:"integer"},PaginationToken:{}}},output:{type:"structure",members:{UserImportJobs:{type:"list",member:{shape:"S2h"}},PaginationToken:{}}}},ListUserPoolClients:{input:{type:"structure",required:["UserPoolId"],members:{UserPoolId:{},MaxResults:{type:"integer"},NextToken:{}}},output:{type:"structure",members:{UserPoolClients:{type:"list",member:{type:"structure",members:{ClientId:{shape:"S14"},UserPoolId:{},ClientName:{}}}},NextToken:{}}}},ListUserPools:{input:{type:"structure",required:["MaxResults"],members:{NextToken:{},MaxResults:{type:"integer"}}},output:{type:"structure",members:{UserPools:{type:"list",member:{type:"structure",members:{Id:{},Name:{},LambdaConfig:{shape:"S2s"},Status:{},LastModifiedDate:{type:"timestamp"},CreationDate:{type:"timestamp"}}}},NextToken:{}}}},ListUsers:{input:{type:"structure",required:["UserPoolId"],members:{UserPoolId:{},AttributesToGet:{type:"list",member:{}},Limit:{type:"integer"},PaginationToken:{},Filter:{}}},output:{type:"structure",members:{Users:{type:"list",member:{type:"structure",members:{Username:{shape:"Sd"},Attributes:{shape:"St"},UserCreateDate:{type:"timestamp"},UserLastModifiedDate:{type:"timestamp"},Enabled:{type:"boolean"},UserStatus:{}}}},PaginationToken:{}}}},ResendConfirmationCode:{input:{type:"structure",required:["ClientId","Username"],members:{ClientId:{shape:"S14"},SecretHash:{shape:"S27"},Username:{shape:"Sd"}}},output:{type:"structure",members:{CodeDeliveryDetails:{shape:"S3y"}}},authtype:"none"},RespondToAuthChallenge:{input:{type:"structure",required:["ClientId","ChallengeName"],members:{ClientId:{shape:"S14"},ChallengeName:{},Session:{},ChallengeResponses:{shape:"S1o"}}},output:{type:"structure",members:{ChallengeName:{},Session:{},ChallengeParameters:{shape:"S1b"},AuthenticationResult:{shape:"S1c"}}}},SetUserSettings:{input:{type:"structure",required:["AccessToken","MFAOptions"],members:{AccessToken:{shape:"S1d"},MFAOptions:{shape:"S10"}}},output:{type:"structure",members:{}},authtype:"none"},SignUp:{input:{type:"structure",required:["ClientId","Username","Password"],members:{ClientId:{shape:"S14"},SecretHash:{shape:"S27"},Username:{shape:"Sd"},Password:{shape:"S20"},UserAttributes:{shape:"St"},ValidationData:{shape:"St"}}},output:{type:"structure",members:{UserConfirmed:{type:"boolean"},CodeDeliveryDetails:{shape:"S3y"},UserSub:{}}},authtype:"none"},StartUserImportJob:{input:{type:"structure",required:["UserPoolId","JobId"],members:{UserPoolId:{},JobId:{}}},output:{type:"structure",members:{UserImportJob:{shape:"S2h"}}}},StopUserImportJob:{input:{type:"structure",required:["UserPoolId","JobId"],members:{UserPoolId:{},JobId:{}}},output:{type:"structure",members:{UserImportJob:{shape:"S2h"}}}},UpdateDeviceStatus:{input:{type:"structure",required:["AccessToken","DeviceKey"],members:{AccessToken:{shape:"S1d"},DeviceKey:{},DeviceRememberedStatus:{}}},output:{type:"structure",members:{}}},UpdateUserAttributes:{input:{type:"structure",required:["UserAttributes"],members:{UserAttributes:{shape:"St"},AccessToken:{shape:"S1d"}}},output:{type:"structure",members:{CodeDeliveryDetailsList:{type:"list",member:{shape:"S3y"}}}},authtype:"none"},UpdateUserPool:{input:{type:"structure",required:["UserPoolId"],members:{UserPoolId:{},Policies:{shape:"S2p"},LambdaConfig:{shape:"S2s"},AutoVerifiedAttributes:{shape:"S2t"},SmsVerificationMessage:{},EmailVerificationMessage:{},EmailVerificationSubject:{},SmsAuthenticationMessage:{},MfaConfiguration:{},DeviceConfiguration:{shape:"S31"},EmailConfiguration:{shape:"S32"},SmsConfiguration:{shape:"S34"}}},output:{type:"structure",members:{}}},UpdateUserPoolClient:{input:{type:"structure",required:["UserPoolId","ClientId"],members:{UserPoolId:{},ClientId:{shape:"S14"},ClientName:{},RefreshTokenValidity:{type:"integer"},ReadAttributes:{shape:"S3d"},WriteAttributes:{shape:"S3d"},ExplicitAuthFlows:{shape:"S3f"}}},output:{type:"structure",members:{UserPoolClient:{shape:"S3i"}}}},VerifyUserAttribute:{input:{type:"structure",required:["AttributeName","Code"],members:{AccessToken:{shape:"S1d"},AttributeName:{},Code:{}}},output:{type:"structure",members:{}},authtype:"none"}},shapes:{S4:{type:"structure",members:{Name:{},AttributeDataType:{},DeveloperOnlyAttribute:{type:"boolean"},Mutable:{type:"boolean"},Required:{type:"boolean"},NumberAttributeConstraints:{type:"structure",members:{MinValue:{},MaxValue:{}}},StringAttributeConstraints:{type:"structure",members:{MinLength:{},MaxLength:{}}}}},Sd:{type:"string",sensitive:!0},Sh:{type:"list",member:{}},Ss:{type:"structure",members:{DeviceKey:{},DeviceAttributes:{shape:"St"},DeviceCreateDate:{type:"timestamp"},DeviceLastModifiedDate:{type:"timestamp"},DeviceLastAuthenticatedDate:{type:"timestamp"}}},St:{type:"list",member:{type:"structure",required:["Name"],members:{Name:{},Value:{type:"string",sensitive:!0}}}},S10:{type:"list",member:{type:"structure",members:{DeliveryMedium:{},AttributeName:{}}}},S14:{type:"string",sensitive:!0},S16:{type:"map",key:{},value:{}},S17:{type:"map",key:{},value:{}},S1b:{type:"map",key:{},value:{}},S1c:{type:"structure",members:{AccessToken:{shape:"S1d"},ExpiresIn:{type:"integer"},TokenType:{},RefreshToken:{shape:"S1d"},IdToken:{shape:"S1d"},NewDeviceMetadata:{type:"structure",members:{DeviceKey:{},DeviceGroupKey:{}}}}},S1d:{type:"string",sensitive:!0},S1k:{type:"list",member:{shape:"Ss"}},S1o:{type:"map",key:{},value:{}},S20:{type:"string",sensitive:!0},S27:{type:"string",sensitive:!0},S2h:{type:"structure",members:{JobName:{},JobId:{},UserPoolId:{},PreSignedUrl:{},CreationDate:{type:"timestamp"},StartDate:{type:"timestamp"},CompletionDate:{type:"timestamp"},Status:{},CloudWatchLogsRoleArn:{},ImportedUsers:{type:"long"},SkippedUsers:{type:"long"},FailedUsers:{type:"long"},CompletionMessage:{}}},S2p:{type:"structure",members:{PasswordPolicy:{type:"structure",members:{MinimumLength:{type:"integer"},RequireUppercase:{type:"boolean"},RequireLowercase:{type:"boolean"},RequireNumbers:{type:"boolean"},RequireSymbols:{type:"boolean"}}}}},S2s:{type:"structure",members:{PreSignUp:{},CustomMessage:{},PostConfirmation:{},PreAuthentication:{},PostAuthentication:{},DefineAuthChallenge:{},CreateAuthChallenge:{},VerifyAuthChallengeResponse:{}}},S2t:{type:"list",member:{}},S2v:{type:"list",member:{}},S31:{type:"structure",members:{ChallengeRequiredOnNewDevice:{type:"boolean"},DeviceOnlyRememberedOnUserPrompt:{type:"boolean"}}},S32:{type:"structure",members:{SourceArn:{},ReplyToEmailAddress:{}}},S34:{type:"structure",members:{SnsCallerArn:{},ExternalId:{}}},S36:{type:"structure",members:{Id:{},Name:{},Policies:{shape:"S2p"},LambdaConfig:{shape:"S2s"},Status:{},LastModifiedDate:{type:"timestamp"},CreationDate:{type:"timestamp"},SchemaAttributes:{type:"list",member:{shape:"S4"}},AutoVerifiedAttributes:{shape:"S2t"},AliasAttributes:{shape:"S2v"},SmsVerificationMessage:{},EmailVerificationMessage:{},EmailVerificationSubject:{},SmsAuthenticationMessage:{},MfaConfiguration:{},DeviceConfiguration:{shape:"S31"},EstimatedNumberOfUsers:{type:"integer"},EmailConfiguration:{shape:"S32"},SmsConfiguration:{shape:"S34"},SmsConfigurationFailure:{},EmailConfigurationFailure:{}}},S3d:{type:"list",member:{}},S3f:{type:"list",member:{}},S3i:{type:"structure",members:{UserPoolId:{},ClientName:{},ClientId:{shape:"S14"},ClientSecret:{type:"string",sensitive:!0},LastModifiedDate:{type:"timestamp"},CreationDate:{type:"timestamp"},RefreshTokenValidity:{type:"integer"},ReadAttributes:{shape:"S3d"},WriteAttributes:{shape:"S3d"},ExplicitAuthFlows:{shape:"S3f"}}},S3y:{type:"structure",members:{Destination:{},DeliveryMedium:{},AttributeName:{}}}}}},{}],3:[function(a,b,c){b.exports={acm:{name:"ACM",cors:!0},apigateway:{name:"APIGateway",cors:!0},applicationautoscaling:{prefix:"application-autoscaling",name:"ApplicationAutoScaling",cors:!0},autoscaling:{name:"AutoScaling",cors:!0},cloudformation:{name:"CloudFormation",cors:!0},cloudfront:{name:"CloudFront",versions:["2013-05-12*","2013-11-11*","2014-05-31*","2014-10-21*","2014-11-06*","2015-04-17*","2015-07-27*","2015-09-17*","2016-01-13*","2016-01-28*","2016-08-01*","2016-08-20*"],cors:!0},cloudhsm:{name:"CloudHSM",cors:!0},cloudsearch:{name:"CloudSearch"},cloudsearchdomain:{name:"CloudSearchDomain"},cloudtrail:{name:"CloudTrail",cors:!0},cloudwatch:{prefix:"monitoring",name:"CloudWatch",cors:!0},cloudwatchevents:{prefix:"events",name:"CloudWatchEvents",versions:["2014-02-03*"],cors:!0},cloudwatchlogs:{prefix:"logs",name:"CloudWatchLogs",cors:!0},codecommit:{name:"CodeCommit",cors:!0},codedeploy:{name:"CodeDeploy",cors:!0},codepipeline:{name:"CodePipeline",cors:!0},cognitoidentity:{prefix:"cognito-identity",name:"CognitoIdentity",cors:!0},cognitoidentityserviceprovider:{prefix:"cognito-idp",name:"CognitoIdentityServiceProvider",cors:!0},cognitosync:{prefix:"cognito-sync",name:"CognitoSync",cors:!0},configservice:{prefix:"config",name:"ConfigService",cors:!0},datapipeline:{name:"DataPipeline"},devicefarm:{name:"DeviceFarm",cors:!0},directconnect:{name:"DirectConnect",cors:!0},directoryservice:{prefix:"ds",name:"DirectoryService"},discovery:{name:"Discovery"},dms:{name:"DMS"},dynamodb:{name:"DynamoDB",cors:!0},dynamodbstreams:{prefix:"streams.dynamodb",name:"DynamoDBStreams",cors:!0},ec2:{name:"EC2",versions:["2013-06-15*","2013-10-15*","2014-02-01*","2014-05-01*","2014-06-15*","2014-09-01*","2014-10-01*","2015-03-01*","2015-04-15*","2015-10-01*"],cors:!0},ecr:{name:"ECR",cors:!0},ecs:{name:"ECS",cors:!0},efs:{prefix:"elasticfilesystem",name:"EFS"},elasticache:{name:"ElastiCache",versions:["2012-11-15*","2014-03-24*","2014-07-15*","2014-09-30*"],cors:!0},elasticbeanstalk:{name:"ElasticBeanstalk",cors:!0},elb:{prefix:"elasticloadbalancing",name:"ELB",cors:!0},elbv2:{prefix:"elasticloadbalancingv2",name:"ELBv2",cors:!0},emr:{prefix:"elasticmapreduce",name:"EMR",cors:!0},es:{name:"ES"},elastictranscoder:{name:"ElasticTranscoder",cors:!0},firehose:{name:"Firehose",cors:!0},gamelift:{name:"GameLift",cors:!0},glacier:{name:"Glacier"},iam:{name:"IAM"},importexport:{name:"ImportExport"},inspector:{name:"Inspector",versions:["2015-08-18*"],cors:!0},iot:{name:"Iot",cors:!0},iotdata:{prefix:"iot-data",name:"IotData",cors:!0},kinesis:{name:"Kinesis",cors:!0},kinesisanalytics:{name:"KinesisAnalytics"},kms:{name:"KMS",cors:!0},lambda:{name:"Lambda",cors:!0},machinelearning:{name:"MachineLearning",cors:!0},marketplacecommerceanalytics:{name:"MarketplaceCommerceAnalytics",cors:!0},marketplacemetering:{prefix:"meteringmarketplace",name:"MarketplaceMetering"},mobileanalytics:{name:"MobileAnalytics",cors:!0},opsworks:{name:"OpsWorks",cors:!0},rds:{name:"RDS",versions:["2014-09-01*"],cors:!0},redshift:{name:"Redshift",cors:!0},route53:{name:"Route53",cors:!0},route53domains:{name:"Route53Domains",cors:!0},s3:{name:"S3",dualstackAvailable:!0,cors:!0},servicecatalog:{name:"ServiceCatalog",cors:!0},ses:{prefix:"email",name:"SES",cors:!0},simpledb:{prefix:"sdb",name:"SimpleDB"},snowball:{name:"Snowball"},sns:{name:"SNS",cors:!0},sqs:{name:"SQS",cors:!0},ssm:{name:"SSM",cors:!0},storagegateway:{name:"StorageGateway",cors:!0},sts:{name:"STS",cors:!0},support:{name:"Support"},swf:{name:"SWF"},waf:{name:"WAF",cors:!0},workspaces:{name:"WorkSpaces"}}},{}],4:[function(a,b,c){b.exports={version:"2.0",metadata:{apiVersion:"2011-06-15",endpointPrefix:"sts",globalEndpoint:"sts.amazonaws.com",protocol:"query",serviceAbbreviation:"AWS STS",serviceFullName:"AWS Security Token Service",signatureVersion:"v4",xmlNamespace:"https://sts.amazonaws.com/doc/2011-06-15/"},operations:{AssumeRole:{input:{type:"structure",required:["RoleArn","RoleSessionName"],members:{RoleArn:{},RoleSessionName:{},Policy:{},DurationSeconds:{type:"integer"},ExternalId:{},SerialNumber:{},TokenCode:{}}},output:{resultWrapper:"AssumeRoleResult",type:"structure",members:{Credentials:{shape:"Sa"},AssumedRoleUser:{shape:"Sf"},PackedPolicySize:{type:"integer"}}}},AssumeRoleWithSAML:{input:{type:"structure",required:["RoleArn","PrincipalArn","SAMLAssertion"],members:{RoleArn:{},PrincipalArn:{},SAMLAssertion:{},Policy:{},DurationSeconds:{type:"integer"}}},output:{resultWrapper:"AssumeRoleWithSAMLResult",type:"structure",members:{Credentials:{shape:"Sa"},AssumedRoleUser:{shape:"Sf"},PackedPolicySize:{type:"integer"},Subject:{},SubjectType:{},Issuer:{},Audience:{},NameQualifier:{}}}},AssumeRoleWithWebIdentity:{input:{type:"structure",required:["RoleArn","RoleSessionName","WebIdentityToken"],members:{RoleArn:{},RoleSessionName:{},WebIdentityToken:{},ProviderId:{},Policy:{},DurationSeconds:{type:"integer"}}},output:{resultWrapper:"AssumeRoleWithWebIdentityResult",type:"structure",members:{Credentials:{shape:"Sa"},SubjectFromWebIdentityToken:{},AssumedRoleUser:{shape:"Sf"},PackedPolicySize:{type:"integer"},Provider:{},Audience:{}}}},DecodeAuthorizationMessage:{input:{type:"structure",required:["EncodedMessage"],members:{EncodedMessage:{}}},output:{resultWrapper:"DecodeAuthorizationMessageResult",type:"structure",members:{DecodedMessage:{}}}},GetCallerIdentity:{input:{type:"structure",members:{}},output:{resultWrapper:"GetCallerIdentityResult",type:"structure",members:{UserId:{},Account:{},Arn:{}}}},GetFederationToken:{input:{type:"structure",required:["Name"],members:{Name:{},Policy:{},DurationSeconds:{type:"integer"}}},output:{resultWrapper:"GetFederationTokenResult",type:"structure",members:{Credentials:{shape:"Sa"},FederatedUser:{type:"structure",required:["FederatedUserId","Arn"],members:{FederatedUserId:{},Arn:{}}},PackedPolicySize:{type:"integer"}}}},GetSessionToken:{input:{type:"structure",members:{DurationSeconds:{type:"integer"},SerialNumber:{},TokenCode:{}}},output:{resultWrapper:"GetSessionTokenResult",type:"structure",members:{Credentials:{shape:"Sa"}}}}},shapes:{Sa:{type:"structure",required:["AccessKeyId","SecretAccessKey","SessionToken","Expiration"],members:{AccessKeyId:{},SecretAccessKey:{},SessionToken:{},Expiration:{type:"timestamp"}}},Sf:{type:"structure",required:["AssumedRoleId","Arn"],members:{AssumedRoleId:{},Arn:{}}}}}},{}],5:[function(a,b,c){a("../lib/node_loader");var d=a("../lib/core"),e=a("../lib/service"),f=a("../lib/api_loader");f.services.cognitoidentity={},d.CognitoIdentity=e.defineService("cognitoidentity",["2014-06-30"]),a("../lib/services/cognitoidentity"),Object.defineProperty(f.services.cognitoidentity,"2014-06-30",{get:function(){var b=a("../apis/cognito-identity-2014-06-30.min.json");return b},enumerable:!0,configurable:!0}),b.exports=d.CognitoIdentity},{"../apis/cognito-identity-2014-06-30.min.json":1,"../lib/api_loader":7,"../lib/core":11,"../lib/node_loader":9,"../lib/service":42,"../lib/services/cognitoidentity":43}],6:[function(a,b,c){a("../lib/node_loader");var d=a("../lib/core"),e=a("../lib/service"),f=a("../lib/api_loader");f.services.sts={},d.STS=e.defineService("sts",["2011-06-15"]),a("../lib/services/sts"),Object.defineProperty(f.services.sts,"2011-06-15",{get:function(){var b=a("../apis/sts-2011-06-15.min.json");return b},enumerable:!0,configurable:!0}),b.exports=d.STS},{"../apis/sts-2011-06-15.min.json":4,"../lib/api_loader":7,"../lib/core":11,"../lib/node_loader":9,"../lib/service":42,"../lib/services/sts":44}],7:[function(a,b,c){var d=a("./core");d.apiLoader=function(a,b){if(!d.apiLoader.services.hasOwnProperty(a))throw new Error("InvalidService: Failed to load api for "+a);return d.apiLoader.services[a][b]},d.apiLoader.services={},b.exports=d.apiLoader},{"./core":11}],8:[function(a,b,c){a("./browser_loader");var d=a("./core");"undefined"!=typeof window&&(window.AWSCognito=d),"undefined"!=typeof b&&(b.exports=d),"undefined"!=typeof self&&(self.AWSCognito=d),Object.prototype.hasOwnProperty.call(d,"CognitoIdentityServiceProvider")||(d.apiLoader.services.cognitoidentityserviceprovider={},d.CognitoIdentityServiceProvider=d.Service.defineService("cognitoidentityserviceprovider",["2016-04-18"])),d.apiLoader.services.cognitoidentityserviceprovider["2016-04-18"]=a("../apis/cognito-idp-2016-04-18.min"),Object.prototype.hasOwnProperty.call(d,"STS")||(d.apiLoader.services.sts={},d.STS=d.Service.defineService("sts",["2011-06-15"]),a("./services/sts")),d.apiLoader.services.sts["2011-06-15"]=a("../apis/sts-2011-06-15.min")},{"../apis/cognito-idp-2016-04-18.min":2,"../apis/sts-2011-06-15.min":4,"./browser_loader":9,"./core":11,"./services/sts":44}],9:[function(a,b,c){(function(b){var c=a("./util");c.crypto.lib=a("crypto-browserify"),c.Buffer=a("buffer/").Buffer,c.url=a("url/"),c.querystring=a("querystring/");var d=a("./core");a("./api_loader"),d.XML.Parser=a("./xml/browser_parser"),a("./http/xhr"),"undefined"==typeof b&&(b={browser:!0})}).call(this,a("FWaASH"))},{"./api_loader":7,"./core":11,"./http/xhr":20,"./util":53,"./xml/browser_parser":54,FWaASH:62,"buffer/":69,"crypto-browserify":74,"querystring/":82,"url/":83}],10:[function(a,b,c){var d=a("./core");a("./credentials"),a("./credentials/credential_provider_chain"),d.Config=d.util.inherit({constructor:function(a){void 0===a&&(a={}),a=this.extractCredentials(a),d.util.each.call(this,this.keys,function(b,c){this.set(b,a[b],c)})},getCredentials:function(a){function b(b){a(b,b?null:g.credentials)}function c(a,b){return new d.util.error(b||new Error,{code:"CredentialsError",message:a})}function e(){g.credentials.get(function(a){if(a){var d="Could not load credentials from "+g.credentials.constructor.name;a=c(d,a)}b(a)})}function f(){var a=null;g.credentials.accessKeyId&&g.credentials.secretAccessKey||(a=c("Missing credentials")),b(a)}var g=this;g.credentials?"function"==typeof g.credentials.get?e():f():g.credentialProvider?g.credentialProvider.resolve(function(a,d){a&&(a=c("Could not load credentials from any providers",a)),
g.credentials=d,b(a)}):b(c("No credentials to load"))},update:function(a,b){b=b||!1,a=this.extractCredentials(a),d.util.each.call(this,a,function(a,c){(b||Object.prototype.hasOwnProperty.call(this.keys,a)||d.Service.hasService(a))&&this.set(a,c)})},loadFromPath:function(a){this.clear();var b=JSON.parse(d.util.readFileSync(a)),c=new d.FileSystemCredentials(a),e=new d.CredentialProviderChain;return e.providers.unshift(c),e.resolve(function(a,c){if(a)throw a;b.credentials=c}),this.constructor(b),this},clear:function(){d.util.each.call(this,this.keys,function(a){delete this[a]}),this.set("credentials",void 0),this.set("credentialProvider",void 0)},set:function(a,b,c){void 0===b?(void 0===c&&(c=this.keys[a]),"function"==typeof c?this[a]=c.call(this):this[a]=c):"httpOptions"===a&&this[a]?this[a]=d.util.merge(this[a],b):this[a]=b},keys:{credentials:null,credentialProvider:null,region:null,logger:null,apiVersions:{},apiVersion:null,endpoint:void 0,httpOptions:{timeout:12e4},maxRetries:void 0,maxRedirects:10,paramValidation:!0,sslEnabled:!0,s3ForcePathStyle:!1,s3BucketEndpoint:!1,s3DisableBodySigning:!0,computeChecksums:!0,convertResponseTypes:!0,correctClockSkew:!1,customUserAgent:null,dynamoDbCrc32:!0,systemClockOffset:0,signatureVersion:null,signatureCache:!0,retryDelayOptions:{base:100},useAccelerateEndpoint:!1},extractCredentials:function(a){return a.accessKeyId&&a.secretAccessKey&&(a=d.util.copy(a),a.credentials=new d.Credentials(a)),a},setPromisesDependency:function(a){d.util.addPromisesToRequests(d.Request,a)}}),d.config=new d.Config},{"./core":11,"./credentials":12,"./credentials/credential_provider_chain":14}],11:[function(a,b,c){var d={util:a("./util")},e={};e.toString(),b.exports=d,d.util.update(d,{VERSION:"2.6.4",Signers:{},Protocol:{Json:a("./protocol/json"),Query:a("./protocol/query"),Rest:a("./protocol/rest"),RestJson:a("./protocol/rest_json"),RestXml:a("./protocol/rest_xml")},XML:{Builder:a("./xml/builder"),Parser:null},JSON:{Builder:a("./json/builder"),Parser:a("./json/parser")},Model:{Api:a("./model/api"),Operation:a("./model/operation"),Shape:a("./model/shape"),Paginator:a("./model/paginator"),ResourceWaiter:a("./model/resource_waiter")},util:a("./util"),apiLoader:function(){throw new Error("No API loader set")}}),a("./service"),a("./credentials"),a("./credentials/credential_provider_chain"),a("./credentials/temporary_credentials"),a("./credentials/web_identity_credentials"),a("./credentials/cognito_identity_credentials"),a("./credentials/saml_credentials"),a("./config"),a("./http"),a("./sequential_executor"),a("./event_listeners"),a("./request"),a("./response"),a("./resource_waiter"),a("./signers/request_signer"),a("./param_validator"),d.events=new d.SequentialExecutor},{"./config":10,"./credentials":12,"./credentials/cognito_identity_credentials":13,"./credentials/credential_provider_chain":14,"./credentials/saml_credentials":15,"./credentials/temporary_credentials":16,"./credentials/web_identity_credentials":17,"./event_listeners":18,"./http":19,"./json/builder":21,"./json/parser":22,"./model/api":23,"./model/operation":25,"./model/paginator":26,"./model/resource_waiter":27,"./model/shape":28,"./param_validator":29,"./protocol/json":30,"./protocol/query":31,"./protocol/rest":32,"./protocol/rest_json":33,"./protocol/rest_xml":34,"./request":38,"./resource_waiter":39,"./response":40,"./sequential_executor":41,"./service":42,"./signers/request_signer":46,"./util":53,"./xml/builder":55}],12:[function(a,b,c){var d=a("./core");d.Credentials=d.util.inherit({constructor:function(){if(d.util.hideProperties(this,["secretAccessKey"]),this.expired=!1,this.expireTime=null,1===arguments.length&&"object"==typeof arguments[0]){var a=arguments[0].credentials||arguments[0];this.accessKeyId=a.accessKeyId,this.secretAccessKey=a.secretAccessKey,this.sessionToken=a.sessionToken}else this.accessKeyId=arguments[0],this.secretAccessKey=arguments[1],this.sessionToken=arguments[2]},expiryWindow:15,needsRefresh:function(){var a=d.util.date.getDate().getTime(),b=new Date(a+1e3*this.expiryWindow);return this.expireTime&&b>this.expireTime?!0:this.expired||!this.accessKeyId||!this.secretAccessKey},get:function(a){var b=this;this.needsRefresh()?this.refresh(function(c){c||(b.expired=!1),a&&a(c)}):a&&a()},refresh:function(a){this.expired=!1,a()}})},{"./core":11}],13:[function(a,b,c){var d=a("../core"),e=a("../../clients/cognitoidentity"),f=a("../../clients/sts");d.CognitoIdentityCredentials=d.util.inherit(d.Credentials,{localStorageKey:{id:"aws.cognito.identity-id.",providers:"aws.cognito.identity-providers."},constructor:function(a){d.Credentials.call(this),this.expired=!0,this.params=a,this.data=null,this.identityId=null,this.loadCachedId()},refresh:function(a){var b=this;b.createClients(),b.data=null,b.identityId=null,b.getId(function(c){c?(b.clearIdOnNotAuthorized(c),a(c)):b.params.RoleArn?b.getCredentialsFromSTS(a):b.getCredentialsForIdentity(a)})},clearCachedId:function(){this.identityId=null,delete this.params.IdentityId;var a=this.params.IdentityPoolId,b=this.params.LoginId||"";delete this.storage[this.localStorageKey.id+a+b],delete this.storage[this.localStorageKey.providers+a+b]},clearIdOnNotAuthorized:function(a){var b=this;"NotAuthorizedException"==a.code&&b.clearCachedId()},getId:function(a){var b=this;return"string"==typeof b.params.IdentityId?a(null,b.params.IdentityId):void b.cognito.getId(function(c,d){!c&&d.IdentityId?(b.params.IdentityId=d.IdentityId,a(null,d.IdentityId)):a(c)})},loadCredentials:function(a,b){a&&b&&(b.expired=!1,b.accessKeyId=a.Credentials.AccessKeyId,b.secretAccessKey=a.Credentials.SecretKey,b.sessionToken=a.Credentials.SessionToken,b.expireTime=a.Credentials.Expiration)},getCredentialsForIdentity:function(a){var b=this;b.cognito.getCredentialsForIdentity(function(c,d){c?b.clearIdOnNotAuthorized(c):(b.cacheId(d),b.data=d,b.loadCredentials(b.data,b)),a(c)})},getCredentialsFromSTS:function(a){var b=this;b.cognito.getOpenIdToken(function(c,d){c?(b.clearIdOnNotAuthorized(c),a(c)):(b.cacheId(d),b.params.WebIdentityToken=d.Token,b.webIdentityCredentials.refresh(function(c){c||(b.data=b.webIdentityCredentials.data,b.sts.credentialsFrom(b.data,b)),a(c)}))})},loadCachedId:function(){var a=this;if(d.util.isBrowser()&&!a.params.IdentityId){var b=a.getStorage("id");if(b&&a.params.Logins){var c=Object.keys(a.params.Logins),e=(a.getStorage("providers")||"").split(","),f=e.filter(function(a){return-1!==c.indexOf(a)});0!==f.length&&(a.params.IdentityId=b)}else b&&(a.params.IdentityId=b)}},createClients:function(){this.webIdentityCredentials=this.webIdentityCredentials||new d.WebIdentityCredentials(this.params),this.cognito=this.cognito||new e({params:this.params}),this.sts=this.sts||new f},cacheId:function(a){this.identityId=a.IdentityId,this.params.IdentityId=this.identityId,d.util.isBrowser()&&(this.setStorage("id",a.IdentityId),this.params.Logins&&this.setStorage("providers",Object.keys(this.params.Logins).join(",")))},getStorage:function(a){return this.storage[this.localStorageKey[a]+this.params.IdentityPoolId+(this.params.LoginId||"")]},setStorage:function(a,b){try{this.storage[this.localStorageKey[a]+this.params.IdentityPoolId+(this.params.LoginId||"")]=b}catch(c){}},storage:function(){try{return window.localStorage.setItem("aws.test-storage","foobar"),window.localStorage.removeItem("aws.test-storage"),d.util.isBrowser()?window.localStorage:{}}catch(a){return{}}}()})},{"../../clients/cognitoidentity":5,"../../clients/sts":6,"../core":11}],14:[function(a,b,c){var d=a("../core");d.CredentialProviderChain=d.util.inherit(d.Credentials,{constructor:function(a){a?this.providers=a:this.providers=d.CredentialProviderChain.defaultProviders.slice(0)},resolve:function(a){function b(e,f){if(!e&&f||c===d.length)return void a(e,f);var g=d[c++];f="function"==typeof g?g.call():g,f.get?f.get(function(a){b(a,a?null:f)}):b(null,f)}if(0===this.providers.length)return a(new Error("No providers")),this;var c=0,d=this.providers.slice(0);return b(),this}}),d.CredentialProviderChain.defaultProviders=[]},{"../core":11}],15:[function(a,b,c){var d=a("../core"),e=a("../../clients/sts");d.SAMLCredentials=d.util.inherit(d.Credentials,{constructor:function(a){d.Credentials.call(this),this.expired=!0,this.params=a},refresh:function(a){var b=this;b.createClients(),a||(a=function(a){if(a)throw a}),b.service.assumeRoleWithSAML(function(c,d){c||b.service.credentialsFrom(d,b),a(c)})},createClients:function(){this.service=this.service||new e({params:this.params})}})},{"../../clients/sts":6,"../core":11}],16:[function(a,b,c){var d=a("../core"),e=a("../../clients/sts");d.TemporaryCredentials=d.util.inherit(d.Credentials,{constructor:function(a){d.Credentials.call(this),this.loadMasterCredentials(),this.expired=!0,this.params=a||{},this.params.RoleArn&&(this.params.RoleSessionName=this.params.RoleSessionName||"temporary-credentials")},refresh:function(a){var b=this;b.createClients(),a||(a=function(a){if(a)throw a}),b.service.config.credentials=b.masterCredentials;var c=b.params.RoleArn?b.service.assumeRole:b.service.getSessionToken;c.call(b.service,function(c,d){c||b.service.credentialsFrom(d,b),a(c)})},loadMasterCredentials:function(){for(this.masterCredentials=d.config.credentials;this.masterCredentials.masterCredentials;)this.masterCredentials=this.masterCredentials.masterCredentials},createClients:function(){this.service=this.service||new e({params:this.params})}})},{"../../clients/sts":6,"../core":11}],17:[function(a,b,c){var d=a("../core"),e=a("../../clients/sts");d.WebIdentityCredentials=d.util.inherit(d.Credentials,{constructor:function(a){d.Credentials.call(this),this.expired=!0,this.params=a,this.params.RoleSessionName=this.params.RoleSessionName||"web-identity",this.data=null},refresh:function(a){var b=this;b.createClients(),a||(a=function(a){if(a)throw a}),b.service.assumeRoleWithWebIdentity(function(c,d){b.data=null,c||(b.data=d,b.service.credentialsFrom(d,b)),a(c)})},createClients:function(){this.service=this.service||new e({params:this.params})}})},{"../../clients/sts":6,"../core":11}],18:[function(a,b,c){var d=a("./core"),e=a("./sequential_executor");d.EventListeners={Core:{}},d.EventListeners={Core:(new e).addNamedListeners(function(a,b){b("VALIDATE_CREDENTIALS","validate",function(a,b){return a.service.api.signatureVersion?void a.service.config.getCredentials(function(c){c&&(a.response.error=d.util.error(c,{code:"CredentialsError",message:"Missing credentials in config"})),b()}):b()}),a("VALIDATE_REGION","validate",function(a){a.service.config.region||a.service.isGlobalEndpoint||(a.response.error=d.util.error(new Error,{code:"ConfigError",message:"Missing region in config"}))}),a("VALIDATE_PARAMETERS","validate",function(a){var b=a.service.api.operations[a.operation].input,c=a.service.config.paramValidation;new d.ParamValidator(c).validate(b,a.params)}),b("COMPUTE_SHA256","afterBuild",function(a,b){if(a.haltHandlersOnError(),!a.service.api.signatureVersion)return b();if(a.service.getSignerClass(a)===d.Signers.V4){var c=a.httpRequest.body||"";d.util.computeSha256(c,function(c,d){c?b(c):(a.httpRequest.headers["X-Amz-Content-Sha256"]=d,b())})}else b()}),a("SET_CONTENT_LENGTH","afterBuild",function(a){if(void 0===a.httpRequest.headers["Content-Length"]){var b=d.util.string.byteLength(a.httpRequest.body);a.httpRequest.headers["Content-Length"]=b}}),a("SET_HTTP_HOST","afterBuild",function(a){a.httpRequest.headers.Host=a.httpRequest.endpoint.host}),a("RESTART","restart",function(){var a=this.response.error;a&&a.retryable&&(this.httpRequest=new d.HttpRequest(this.service.endpoint,this.service.region),this.response.retryCount<this.service.config.maxRetries?this.response.retryCount++:this.response.error=null)}),b("SIGN","sign",function(a,b){var c=a.service;return c.api.signatureVersion?void c.config.getCredentials(function(e,f){if(e)return a.response.error=e,b();try{var g=d.util.date.getDate(),h=c.getSignerClass(a),i=new h(a.httpRequest,c.api.signingName||c.api.endpointPrefix,c.config.signatureCache);i.setServiceClientId(c._clientId),delete a.httpRequest.headers.Authorization,delete a.httpRequest.headers.Date,delete a.httpRequest.headers["X-Amz-Date"],i.addAuthorization(f,g),a.signedAt=g}catch(j){a.response.error=j}b()}):b()}),a("VALIDATE_RESPONSE","validateResponse",function(a){this.service.successfulResponse(a,this)?(a.data={},a.error=null):(a.data=null,a.error=d.util.error(new Error,{code:"UnknownError",message:"An unknown error occurred."}))}),b("SEND","send",function(a,b){function c(c){a.httpResponse.stream=c,c.on("headers",function(b,e){a.request.emit("httpHeaders",[b,e,a]),a.httpResponse.streaming||(2===d.HttpClient.streamsApiVersion?c.on("readable",function(){var b=c.read();null!==b&&a.request.emit("httpData",[b,a])}):c.on("data",function(b){a.request.emit("httpData",[b,a])}))}),c.on("end",function(){a.request.emit("httpDone"),b()})}function e(b){b.on("sendProgress",function(b){a.request.emit("httpUploadProgress",[b,a])}),b.on("receiveProgress",function(b){a.request.emit("httpDownloadProgress",[b,a])})}function f(c){a.error=d.util.error(c,{code:"NetworkingError",region:a.request.httpRequest.region,hostname:a.request.httpRequest.endpoint.hostname,retryable:!0}),a.request.emit("httpError",[a.error,a],function(){b()})}function g(){var b=d.HttpClient.getInstance(),g=a.request.service.config.httpOptions||{};try{var h=b.handleRequest(a.request.httpRequest,g,c,f);e(h)}catch(i){f(i)}}a.httpResponse._abortCallback=b,a.error=null,a.data=null;var h=(d.util.date.getDate()-this.signedAt)/1e3;h>=600?this.emit("sign",[this],function(a){a?b(a):g()}):g()}),a("HTTP_HEADERS","httpHeaders",function(a,b,c){c.httpResponse.statusCode=a,c.httpResponse.headers=b,c.httpResponse.body=new d.util.Buffer(""),c.httpResponse.buffers=[],c.httpResponse.numBytes=0;var e=b.date||b.Date;if(e){var f=Date.parse(e);c.request.service.config.correctClockSkew&&d.util.isClockSkewed(f)&&d.util.applyClockOffset(f)}}),a("HTTP_DATA","httpData",function(a,b){if(a){if(d.util.isNode()){b.httpResponse.numBytes+=a.length;var c=b.httpResponse.headers["content-length"],e={loaded:b.httpResponse.numBytes,total:c};b.request.emit("httpDownloadProgress",[e,b])}b.httpResponse.buffers.push(new d.util.Buffer(a))}}),a("HTTP_DONE","httpDone",function(a){if(a.httpResponse.buffers&&a.httpResponse.buffers.length>0){var b=d.util.buffer.concat(a.httpResponse.buffers);a.httpResponse.body=b}delete a.httpResponse.numBytes,delete a.httpResponse.buffers}),a("FINALIZE_ERROR","retry",function(a){a.httpResponse.statusCode&&(a.error.statusCode=a.httpResponse.statusCode,void 0===a.error.retryable&&(a.error.retryable=this.service.retryableError(a.error,this)))}),a("INVALIDATE_CREDENTIALS","retry",function(a){if(a.error)switch(a.error.code){case"RequestExpired":case"ExpiredTokenException":case"ExpiredToken":a.error.retryable=!0,a.request.service.config.credentials.expired=!0}}),a("EXPIRED_SIGNATURE","retry",function(a){var b=a.error;b&&"string"==typeof b.code&&"string"==typeof b.message&&b.code.match(/Signature/)&&b.message.match(/expired/)&&(a.error.retryable=!0)}),a("CLOCK_SKEWED","retry",function(a){a.error&&this.service.clockSkewError(a.error)&&this.service.config.correctClockSkew&&d.config.isClockSkewed&&(a.error.retryable=!0)}),a("REDIRECT","retry",function(a){a.error&&a.error.statusCode>=300&&a.error.statusCode<400&&a.httpResponse.headers.location&&(this.httpRequest.endpoint=new d.Endpoint(a.httpResponse.headers.location),this.httpRequest.headers.Host=this.httpRequest.endpoint.host,a.error.redirect=!0,a.error.retryable=!0)}),a("RETRY_CHECK","retry",function(a){a.error&&(a.error.redirect&&a.redirectCount<a.maxRedirects?a.error.retryDelay=0:a.retryCount<a.maxRetries&&(a.error.retryDelay=this.service.retryDelays(a.retryCount)||0))}),b("RESET_RETRY_STATE","afterRetry",function(a,b){var c,d=!1;a.error&&(c=a.error.retryDelay||0,a.error.retryable&&a.retryCount<a.maxRetries?(a.retryCount++,d=!0):a.error.redirect&&a.redirectCount<a.maxRedirects&&(a.redirectCount++,d=!0)),d?(a.error=null,setTimeout(b,c)):b()})}),CorePost:(new e).addNamedListeners(function(a){a("EXTRACT_REQUEST_ID","extractData",d.util.extractRequestId),a("EXTRACT_REQUEST_ID","extractError",d.util.extractRequestId),a("ENOTFOUND_ERROR","httpError",function(a){if("NetworkingError"===a.code&&"ENOTFOUND"===a.errno){var b="Inaccessible host: `"+a.hostname+"'. This service may not be available in the `"+a.region+"' region.";this.response.error=d.util.error(new Error(b),{code:"UnknownEndpoint",region:a.region,hostname:a.hostname,retryable:!0,originalError:a})}})}),Logger:(new e).addNamedListeners(function(b){b("LOG_REQUEST","complete",function(b){function c(){var c=d.util.date.getDate().getTime(),g=(c-e.startTime.getTime())/1e3,h=!!f.isTTY,i=b.httpResponse.statusCode,j=a("util").inspect(e.params,!0,null),k="";return h&&(k+="[33m"),k+="[AWS "+e.service.serviceIdentifier+" "+i,k+=" "+g.toString()+"s "+b.retryCount+" retries]",h&&(k+="[0;1m"),k+=" "+d.util.string.lowerFirst(e.operation),k+="("+j+")",h&&(k+="[0m"),k}var e=b.request,f=e.service.config.logger;if(f){var g=c();"function"==typeof f.log?f.log(g):"function"==typeof f.write&&f.write(g+"\n")}})}),Json:(new e).addNamedListeners(function(b){var c=a("./protocol/json");b("BUILD","build",c.buildRequest),b("EXTRACT_DATA","extractData",c.extractData),b("EXTRACT_ERROR","extractError",c.extractError)}),Rest:(new e).addNamedListeners(function(b){var c=a("./protocol/rest");b("BUILD","build",c.buildRequest),b("EXTRACT_DATA","extractData",c.extractData),b("EXTRACT_ERROR","extractError",c.extractError)}),RestJson:(new e).addNamedListeners(function(b){var c=a("./protocol/rest_json");b("BUILD","build",c.buildRequest),b("EXTRACT_DATA","extractData",c.extractData),b("EXTRACT_ERROR","extractError",c.extractError)}),RestXml:(new e).addNamedListeners(function(b){var c=a("./protocol/rest_xml");b("BUILD","build",c.buildRequest),b("EXTRACT_DATA","extractData",c.extractData),b("EXTRACT_ERROR","extractError",c.extractError)}),Query:(new e).addNamedListeners(function(b){var c=a("./protocol/query");b("BUILD","build",c.buildRequest),b("EXTRACT_DATA","extractData",c.extractData),b("EXTRACT_ERROR","extractError",c.extractError)})}},{"./core":11,"./protocol/json":30,"./protocol/query":31,"./protocol/rest":32,"./protocol/rest_json":33,"./protocol/rest_xml":34,"./sequential_executor":41,util:68}],19:[function(a,b,c){var d=a("./core"),e=d.util.inherit;d.Endpoint=e({constructor:function(a,b){if(d.util.hideProperties(this,["slashes","auth","hash","search","query"]),"undefined"==typeof a||null===a)throw new Error("Invalid endpoint: "+a);if("string"!=typeof a)return d.util.copy(a);if(!a.match(/^http/)){var c=b&&void 0!==b.sslEnabled?b.sslEnabled:d.config.sslEnabled;a=(c?"https":"http")+"://"+a}d.util.update(this,d.util.urlParse(a)),this.port?this.port=parseInt(this.port,10):this.port="https:"===this.protocol?443:80}}),d.HttpRequest=e({constructor:function(a,b,c){a=new d.Endpoint(a),this.method="POST",this.path=a.path||"/",this.headers={},this.body="",this.endpoint=a,this.region=b,this.setUserAgent(c)},setUserAgent:function(a){var b=d.util.isBrowser()?"X-Amz-":"",c="";"string"==typeof a&&a&&(c+=" "+a),this.headers[b+"User-Agent"]=d.util.userAgent()+c},pathname:function(){return this.path.split("?",1)[0]},search:function(){var a=this.path.split("?",2)[1];return a?(a=d.util.queryStringParse(a),d.util.queryParamsToString(a)):""}}),d.HttpResponse=e({constructor:function(){this.statusCode=void 0,this.headers={},this.body=void 0,this.streaming=!1,this.stream=null},createUnbufferedStream:function(){return this.streaming=!0,this.stream}}),d.HttpClient=e({}),d.HttpClient.getInstance=function(){return void 0===this.singleton&&(this.singleton=new this),this.singleton}},{"./core":11}],20:[function(a,b,c){var d=a("../core"),e=a("events").EventEmitter;a("../http"),d.XHRClient=d.util.inherit({handleRequest:function(a,b,c,f){var g=this,h=a.endpoint,i=new e,j=h.protocol+"//"+h.hostname;80!==h.port&&443!==h.port&&(j+=":"+h.port),j+=a.path;var k=new XMLHttpRequest,l=!1;a.stream=k,k.addEventListener("readystatechange",function(){try{if(0===k.status)return}catch(a){return}if(this.readyState>=this.HEADERS_RECEIVED&&!l){try{k.responseType="arraybuffer"}catch(a){}i.statusCode=k.status,i.headers=g.parseHeaders(k.getAllResponseHeaders()),i.emit("headers",i.statusCode,i.headers),l=!0}this.readyState===this.DONE&&g.finishRequest(k,i)},!1),k.upload.addEventListener("progress",function(a){i.emit("sendProgress",a)}),k.addEventListener("progress",function(a){i.emit("receiveProgress",a)},!1),k.addEventListener("timeout",function(){f(d.util.error(new Error("Timeout"),{code:"TimeoutError"}))},!1),k.addEventListener("error",function(){f(d.util.error(new Error("Network Failure"),{code:"NetworkingError"}))},!1),c(i),k.open(a.method,j,b.xhrAsync!==!1),d.util.each(a.headers,function(a,b){"Content-Length"!==a&&"User-Agent"!==a&&"Host"!==a&&k.setRequestHeader(a,b)}),b.timeout&&b.xhrAsync!==!1&&(k.timeout=b.timeout),b.xhrWithCredentials&&(k.withCredentials=!0);try{k.send(a.body)}catch(m){if(!a.body||"object"!=typeof a.body.buffer)throw m;k.send(a.body.buffer)}return i},parseHeaders:function(a){var b={};return d.util.arrayEach(a.split(/\r?\n/),function(a){var c=a.split(":",1)[0],d=a.substring(c.length+2);c.length>0&&(b[c.toLowerCase()]=d)}),b},finishRequest:function(a,b){var c;if("arraybuffer"===a.responseType&&a.response){var e=a.response;c=new d.util.Buffer(e.byteLength);for(var f=new Uint8Array(e),g=0;g<c.length;++g)c[g]=f[g]}try{c||"string"!=typeof a.responseText||(c=new d.util.Buffer(a.responseText))}catch(h){}c&&b.emit("data",c),b.emit("end")}}),d.HttpClient.prototype=d.XHRClient.prototype,d.HttpClient.streamsApiVersion=1},{"../core":11,"../http":19,events:60}],21:[function(a,b,c){function d(){}function e(a,b){if(b&&void 0!==a&&null!==a)switch(b.type){case"structure":return f(a,b);case"map":return h(a,b);case"list":return g(a,b);default:return i(a,b)}}function f(a,b){var c={};return j.each(a,function(a,d){var f=b.members[a];if(f){if("body"!==f.location)return;var g=f.isLocationName?f.name:a,h=e(d,f);void 0!==h&&(c[g]=h)}}),c}function g(a,b){var c=[];return j.arrayEach(a,function(a){var d=e(a,b.member);void 0!==d&&c.push(d)}),c}function h(a,b){var c={};return j.each(a,function(a,d){var f=e(d,b.value);void 0!==f&&(c[a]=f)}),c}function i(a,b){return b.toWireFormat(a)}var j=a("../util");d.prototype.build=function(a,b){return JSON.stringify(e(a,b))},b.exports=d},{"../util":53}],22:[function(a,b,c){function d(){}function e(a,b){if(b&&void 0!==a)switch(b.type){case"structure":return f(a,b);case"map":return h(a,b);case"list":return g(a,b);default:return i(a,b)}}function f(a,b){if(null!=a){var c={},d=b.members;return j.each(d,function(b,d){var f=d.isLocationName?d.name:b;if(Object.prototype.hasOwnProperty.call(a,f)){var g=a[f],h=e(g,d);void 0!==h&&(c[b]=h)}}),c}}function g(a,b){if(null!=a){var c=[];return j.arrayEach(a,function(a){var d=e(a,b.member);void 0===d?c.push(null):c.push(d)}),c}}function h(a,b){if(null!=a){var c={};return j.each(a,function(a,d){var f=e(d,b.value);void 0===f?c[a]=null:c[a]=f}),c}}function i(a,b){return b.toType(a)}var j=a("../util");d.prototype.parse=function(a,b){return e(JSON.parse(a),b)},b.exports=d},{"../util":53}],23:[function(a,b,c){function d(a,b){a=a||{},b=b||{},b.api=this,a.metadata=a.metadata||{},k(this,"isApi",!0,!1),k(this,"apiVersion",a.metadata.apiVersion),k(this,"endpointPrefix",a.metadata.endpointPrefix),k(this,"signingName",a.metadata.signingName),k(this,"globalEndpoint",a.metadata.globalEndpoint),k(this,"signatureVersion",a.metadata.signatureVersion),k(this,"jsonVersion",a.metadata.jsonVersion),k(this,"targetPrefix",a.metadata.targetPrefix),k(this,"protocol",a.metadata.protocol),k(this,"timestampFormat",a.metadata.timestampFormat),k(this,"xmlNamespaceUri",a.metadata.xmlNamespace),k(this,"abbreviation",a.metadata.serviceAbbreviation),k(this,"fullName",a.metadata.serviceFullName),l(this,"className",function(){var b=a.metadata.serviceAbbreviation||a.metadata.serviceFullName;return b?(b=b.replace(/^Amazon|AWS\s*|\(.*|\s+|\W+/g,""),"ElasticLoadBalancing"===b&&(b="ELB"),b):null}),k(this,"operations",new e(a.operations,b,function(a,c){return new f(a,c,b)},j.string.lowerFirst)),k(this,"shapes",new e(a.shapes,b,function(a,c){return g.create(c,b)})),k(this,"paginators",new e(a.paginators,b,function(a,c){return new h(a,c,b)})),k(this,"waiters",new e(a.waiters,b,function(a,c){return new i(a,c,b)},j.string.lowerFirst)),b.documentation&&(k(this,"documentation",a.documentation),k(this,"documentationUrl",a.documentationUrl))}var e=a("./collection"),f=a("./operation"),g=a("./shape"),h=a("./paginator"),i=a("./resource_waiter"),j=a("../util"),k=j.property,l=j.memoizedProperty;b.exports=d},{"../util":53,"./collection":24,"./operation":25,"./paginator":26,"./resource_waiter":27,"./shape":28}],24:[function(a,b,c){function d(a,b,c,d){f(this,d(a),function(){return c(a,b)})}function e(a,b,c,e){e=e||String;var f=this;for(var g in a)Object.prototype.hasOwnProperty.call(a,g)&&d.call(f,g,a[g],c,e)}var f=a("../util").memoizedProperty;b.exports=e},{"../util":53}],25:[function(a,b,c){function d(a,b,c){c=c||{},g(this,"name",b.name||a),g(this,"api",c.api,!1),b.http=b.http||{},g(this,"httpMethod",b.http.method||"POST"),g(this,"httpPath",b.http.requestUri||"/"),g(this,"authtype",b.authtype||""),h(this,"input",function(){return b.input?e.create(b.input,c):new e.create({type:"structure"},c)}),h(this,"output",function(){return b.output?e.create(b.output,c):new e.create({type:"structure"},c)}),h(this,"errors",function(){var a=[];if(!b.errors)return null;for(var d=0;d<b.errors.length;d++)a.push(e.create(b.errors[d],c));return a}),h(this,"paginator",function(){return c.api.paginators[a]}),c.documentation&&(g(this,"documentation",b.documentation),g(this,"documentationUrl",b.documentationUrl))}var e=a("./shape"),f=a("../util"),g=f.property,h=f.memoizedProperty;b.exports=d},{"../util":53,"./shape":28}],26:[function(a,b,c){function d(a,b){e(this,"inputToken",b.input_token),e(this,"limitKey",b.limit_key),e(this,"moreResults",b.more_results),e(this,"outputToken",b.output_token),e(this,"resultKey",b.result_key)}var e=a("../util").property;b.exports=d},{"../util":53}],27:[function(a,b,c){function d(a,b,c){c=c||{},f(this,"name",a),f(this,"api",c.api,!1),b.operation&&f(this,"operation",e.string.lowerFirst(b.operation));var d=this,g=["type","description","delay","maxAttempts","acceptors"];g.forEach(function(a){var c=b[a];c&&f(d,a,c)})}var e=a("../util"),f=e.property;b.exports=d},{"../util":53}],28:[function(a,b,c){function d(a,b,c){null!==c&&void 0!==c&&s.property.apply(this,arguments)}function e(a,b){a.constructor.prototype[b]||s.memoizedProperty.apply(this,arguments)}function f(a,b,c){b=b||{},d(this,"shape",a.shape),d(this,"api",b.api,!1),d(this,"type",a.type),d(this,"enum",a["enum"]),d(this,"min",a.min),d(this,"max",a.max),d(this,"pattern",a.pattern),d(this,"location",a.location||this.location||"body"),d(this,"name",this.name||a.xmlName||a.queryName||a.locationName||c),d(this,"isStreaming",a.streaming||this.isStreaming||!1),d(this,"isComposite",a.isComposite||!1),d(this,"isShape",!0,!1),d(this,"isQueryName",!!a.queryName,!1),d(this,"isLocationName",!!a.locationName,!1),b.documentation&&(d(this,"documentation",a.documentation),d(this,"documentationUrl",a.documentationUrl)),a.xmlAttribute&&d(this,"isXmlAttribute",a.xmlAttribute||!1),d(this,"defaultValue",null),this.toWireFormat=function(a){return null===a||void 0===a?"":a},this.toType=function(a){return a}}function g(a){f.apply(this,arguments),d(this,"isComposite",!0),a.flattened&&d(this,"flattened",a.flattened||!1)}function h(a,b){var c=null,h=!this.isShape;g.apply(this,arguments),h&&(d(this,"defaultValue",function(){return{}}),d(this,"members",{}),d(this,"memberNames",[]),d(this,"required",[]),d(this,"isRequired",function(){return!1})),a.members&&(d(this,"members",new r(a.members,b,function(a,c){return f.create(c,b,a)})),e(this,"memberNames",function(){return a.xmlOrder||Object.keys(a.members)})),a.required&&(d(this,"required",a.required),d(this,"isRequired",function(b){if(!c){c={};for(var d=0;d<a.required.length;d++)c[a.required[d]]=!0}return c[b]},!1,!0)),d(this,"resultWrapper",a.resultWrapper||null),a.payload&&d(this,"payload",a.payload),"string"==typeof a.xmlNamespace?d(this,"xmlNamespaceUri",a.xmlNamespace):"object"==typeof a.xmlNamespace&&(d(this,"xmlNamespacePrefix",a.xmlNamespace.prefix),d(this,"xmlNamespaceUri",a.xmlNamespace.uri))}function i(a,b){var c=this,h=!this.isShape;if(g.apply(this,arguments),h&&d(this,"defaultValue",function(){return[]}),a.member&&e(this,"member",function(){return f.create(a.member,b)}),this.flattened){var i=this.name;e(this,"name",function(){return c.member.name||i})}}function j(a,b){var c=!this.isShape;g.apply(this,arguments),c&&(d(this,"defaultValue",function(){return{}}),d(this,"key",f.create({type:"string"},b)),d(this,"value",f.create({type:"string"},b))),a.key&&e(this,"key",function(){return f.create(a.key,b)}),a.value&&e(this,"value",function(){return f.create(a.value,b)})}function k(a){var b=this;if(f.apply(this,arguments),"header"===this.location)d(this,"timestampFormat","rfc822");else if(a.timestampFormat)d(this,"timestampFormat",a.timestampFormat);else if(this.api)if(this.api.timestampFormat)d(this,"timestampFormat",this.api.timestampFormat);else switch(this.api.protocol){case"json":case"rest-json":d(this,"timestampFormat","unixTimestamp");break;case"rest-xml":case"query":case"ec2":d(this,"timestampFormat","iso8601")}this.toType=function(a){return null===a||void 0===a?null:"function"==typeof a.toUTCString?a:"string"==typeof a||"number"==typeof a?s.date.parseTimestamp(a):null},this.toWireFormat=function(a){return s.date.format(a,b.timestampFormat)}}function l(){if(f.apply(this,arguments),this.api)switch(this.api.protocol){case"rest-xml":case"query":case"ec2":this.toType=function(a){return a||""}}}function m(){f.apply(this,arguments),this.toType=function(a){return null===a||void 0===a?null:parseFloat(a)},this.toWireFormat=this.toType}function n(){f.apply(this,arguments),this.toType=function(a){return null===a||void 0===a?null:parseInt(a,10)},this.toWireFormat=this.toType}function o(){f.apply(this,arguments),this.toType=s.base64.decode,this.toWireFormat=s.base64.encode}function p(){o.apply(this,arguments)}function q(){f.apply(this,arguments),this.toType=function(a){return"boolean"==typeof a?a:null===a||void 0===a?null:"true"===a}}var r=a("./collection"),s=a("../util");f.normalizedTypes={character:"string","double":"float","long":"integer","short":"integer",biginteger:"integer",bigdecimal:"float",blob:"binary"},f.types={structure:h,list:i,map:j,"boolean":q,timestamp:k,"float":m,integer:n,string:l,base64:p,binary:o},f.resolve=function(a,b){if(a.shape){var c=b.api.shapes[a.shape];if(!c)throw new Error("Cannot find shape reference: "+a.shape);return c}return null},f.create=function(a,b,c){if(a.isShape)return a;var d=f.resolve(a,b);if(d){var e=Object.keys(a);if(b.documentation||(e=e.filter(function(a){return!a.match(/documentation/)})),e===["shape"])return d;var g=function(){d.constructor.call(this,a,b,c)};return g.prototype=d,new g}a.type||(a.members?a.type="structure":a.member?a.type="list":a.key?a.type="map":a.type="string");var h=a.type;if(f.normalizedTypes[a.type]&&(a.type=f.normalizedTypes[a.type]),f.types[a.type])return new f.types[a.type](a,b,c);throw new Error("Unrecognized shape type: "+h)},f.shapes={StructureShape:h,ListShape:i,MapShape:j,StringShape:l,BooleanShape:q,Base64Shape:p},b.exports=f},{"../util":53,"./collection":24}],29:[function(a,b,c){var d=a("./core");d.ParamValidator=d.util.inherit({constructor:function(a){a!==!0&&void 0!==a||(a={min:!0}),this.validation=a},validate:function(a,b,c){if(this.errors=[],this.validateMember(a,b||{},c||"params"),this.errors.length>1){var e=this.errors.join("\n* ");throw e="There were "+this.errors.length+" validation errors:\n* "+e,d.util.error(new Error(e),{code:"MultipleValidationErrors",errors:this.errors})}if(1===this.errors.length)throw this.errors[0];
return!0},fail:function(a,b){this.errors.push(d.util.error(new Error(b),{code:a}))},validateStructure:function(a,b,c){this.validateType(b,c,["object"],"structure");for(var d,e=0;a.required&&e<a.required.length;e++){d=a.required[e];var f=b[d];void 0!==f&&null!==f||this.fail("MissingRequiredParameter","Missing required key '"+d+"' in "+c)}for(d in b)if(Object.prototype.hasOwnProperty.call(b,d)){var g=b[d],h=a.members[d];if(void 0!==h){var i=[c,d].join(".");this.validateMember(h,g,i)}else this.fail("UnexpectedParameter","Unexpected key '"+d+"' found in "+c)}return!0},validateMember:function(a,b,c){switch(a.type){case"structure":return this.validateStructure(a,b,c);case"list":return this.validateList(a,b,c);case"map":return this.validateMap(a,b,c);default:return this.validateScalar(a,b,c)}},validateList:function(a,b,c){if(this.validateType(b,c,[Array])){this.validateRange(a,b.length,c,"list member count");for(var d=0;d<b.length;d++)this.validateMember(a.member,b[d],c+"["+d+"]")}},validateMap:function(a,b,c){if(this.validateType(b,c,["object"],"map")){var d=0;for(var e in b)Object.prototype.hasOwnProperty.call(b,e)&&(this.validateMember(a.key,e,c+"[key='"+e+"']"),this.validateMember(a.value,b[e],c+"['"+e+"']"),d++);this.validateRange(a,d,c,"map member count")}},validateScalar:function(a,b,c){switch(a.type){case null:case void 0:case"string":return this.validateString(a,b,c);case"base64":case"binary":return this.validatePayload(b,c);case"integer":case"float":return this.validateNumber(a,b,c);case"boolean":return this.validateType(b,c,["boolean"]);case"timestamp":return this.validateType(b,c,[Date,/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/,"number"],"Date object, ISO-8601 string, or a UNIX timestamp");default:return this.fail("UnkownType","Unhandled type "+a.type+" for "+c)}},validateString:function(a,b,c){this.validateType(b,c,["string"])&&(this.validateEnum(a,b,c),this.validateRange(a,b.length,c,"string length"),this.validatePattern(a,b,c))},validatePattern:function(a,b,c){this.validation.pattern&&void 0!==a.pattern&&(new RegExp(a.pattern).test(b)||this.fail("PatternMatchError",'Provided value "'+b+'" does not match regex pattern /'+a.pattern+"/ for "+c))},validateRange:function(a,b,c,d){this.validation.min&&void 0!==a.min&&b<a.min&&this.fail("MinRangeError","Expected "+d+" >= "+a.min+", but found "+b+" for "+c),this.validation.max&&void 0!==a.max&&b>a.max&&this.fail("MaxRangeError","Expected "+d+" <= "+a.max+", but found "+b+" for "+c)},validateEnum:function(a,b,c){this.validation["enum"]&&void 0!==a["enum"]&&-1===a["enum"].indexOf(b)&&this.fail("EnumError","Found string value of "+b+", but expected "+a["enum"].join("|")+" for "+c)},validateType:function(a,b,c,e){if(null===a||void 0===a)return!1;for(var f=!1,g=0;g<c.length;g++){if("string"==typeof c[g]){if(typeof a===c[g])return!0}else if(c[g]instanceof RegExp){if((a||"").toString().match(c[g]))return!0}else{if(a instanceof c[g])return!0;if(d.util.isType(a,c[g]))return!0;e||f||(c=c.slice()),c[g]=d.util.typeName(c[g])}f=!0}var h=e;h||(h=c.join(", ").replace(/,([^,]+)$/,", or$1"));var i=h.match(/^[aeiou]/i)?"n":"";return this.fail("InvalidParameterType","Expected "+b+" to be a"+i+" "+h),!1},validateNumber:function(a,b,c){if(null!==b&&void 0!==b){if("string"==typeof b){var d=parseFloat(b);d.toString()===b&&(b=d)}this.validateType(b,c,["number"])&&this.validateRange(a,b,c,"numeric value")}},validatePayload:function(a,b){if(null!==a&&void 0!==a&&"string"!=typeof a&&(!a||"number"!=typeof a.byteLength)){if(d.util.isNode()){var c=d.util.stream.Stream;if(d.util.Buffer.isBuffer(a)||a instanceof c)return}var e=["Buffer","Stream","File","Blob","ArrayBuffer","DataView"];if(a)for(var f=0;f<e.length;f++){if(d.util.isType(a,e[f]))return;if(d.util.typeName(a.constructor)===e[f])return}this.fail("InvalidParameterType","Expected "+b+" to be a string, Buffer, Stream, Blob, or typed array object")}}})},{"./core":11}],30:[function(a,b,c){function d(a){var b=a.httpRequest,c=a.service.api,d=c.targetPrefix+"."+c.operations[a.operation].name,e=c.jsonVersion||"1.0",f=c.operations[a.operation].input,g=new h;1===e&&(e="1.0"),b.body=g.build(a.params||{},f),b.headers["Content-Type"]="application/x-amz-json-"+e,b.headers["X-Amz-Target"]=d}function e(a){var b={},c=a.httpResponse;if(b.code=c.headers["x-amzn-errortype"]||"UnknownError","string"==typeof b.code&&(b.code=b.code.split(":")[0]),c.body.length>0){var d=JSON.parse(c.body.toString());(d.__type||d.code)&&(b.code=(d.__type||d.code).split("#").pop()),"RequestEntityTooLarge"===b.code?b.message="Request body must be less than 1 MB":b.message=d.message||d.Message||null}else b.statusCode=c.statusCode,b.message=c.statusCode.toString();a.error=g.error(new Error,b)}function f(a){var b=a.httpResponse.body.toString()||"{}";if(a.request.service.config.convertResponseTypes===!1)a.data=JSON.parse(b);else{var c=a.request.service.api.operations[a.request.operation],d=c.output||{},e=new i;a.data=e.parse(b,d)}}var g=a("../util"),h=a("../json/builder"),i=a("../json/parser");b.exports={buildRequest:d,extractError:e,extractData:f}},{"../json/builder":21,"../json/parser":22,"../util":53}],31:[function(a,b,c){function d(a){var b=a.service.api.operations[a.operation],c=a.httpRequest;c.headers["Content-Type"]="application/x-www-form-urlencoded; charset=utf-8",c.params={Version:a.service.api.apiVersion,Action:b.name};var d=new i;d.serialize(a.params,b.input,function(a,b){c.params[a]=b}),c.body=h.queryParamsToString(c.params)}function e(a){var b,c=a.httpResponse.body.toString();b=c.match("<UnknownOperationException")?{Code:"UnknownOperation",Message:"Unknown operation "+a.request.operation}:(new g.XML.Parser).parse(c),b.requestId&&!a.requestId&&(a.requestId=b.requestId),b.Errors&&(b=b.Errors),b.Error&&(b=b.Error),b.Code?a.error=h.error(new Error,{code:b.Code,message:b.Message}):a.error=h.error(new Error,{code:a.httpResponse.statusCode,message:null})}function f(a){var b=a.request,c=b.service.api.operations[b.operation],d=c.output||{},e=d;if(e.resultWrapper){var f=j.create({type:"structure"});f.members[e.resultWrapper]=d,f.memberNames=[e.resultWrapper],h.property(d,"name",d.resultWrapper),d=f}var i=new g.XML.Parser;if(d&&d.members&&!d.members._XAMZRequestId){var k=j.create({type:"string"},{api:{protocol:"query"}},"requestId");d.members._XAMZRequestId=k}var l=i.parse(a.httpResponse.body.toString(),d);a.requestId=l._XAMZRequestId||l.requestId,l._XAMZRequestId&&delete l._XAMZRequestId,e.resultWrapper&&l[e.resultWrapper]&&(h.update(l,l[e.resultWrapper]),delete l[e.resultWrapper]),a.data=l}var g=a("../core"),h=a("../util"),i=a("../query/query_param_serializer"),j=a("../model/shape");b.exports={buildRequest:d,extractError:e,extractData:f}},{"../core":11,"../model/shape":28,"../query/query_param_serializer":35,"../util":53}],32:[function(a,b,c){function d(a){a.httpRequest.method=a.service.api.operations[a.operation].httpMethod}function e(a){var b=a.service.api.operations[a.operation],c=b.input,d=[a.httpRequest.endpoint.path,b.httpPath].join("/");d=d.replace(/\/+/g,"/");var e={},f=!1;if(j.each(c.members,function(b,c){var g=a.params[b];if(null!==g&&void 0!==g)if("uri"===c.location){var h=new RegExp("\\{"+c.name+"(\\+)?\\}");d=d.replace(h,function(a,b){var c=b?j.uriEscapePath:j.uriEscape;return c(String(g))})}else"querystring"===c.location&&(f=!0,"list"===c.type?e[c.name]=g.map(function(a){return j.uriEscape(String(a))}):"map"===c.type?j.each(g,function(a,b){Array.isArray(b)?e[a]=b.map(function(a){return j.uriEscape(String(a))}):e[a]=j.uriEscape(String(b))}):e[c.name]=j.uriEscape(String(g)))}),f){d+=d.indexOf("?")>=0?"&":"?";var g=[];j.arrayEach(Object.keys(e).sort(),function(a){Array.isArray(e[a])||(e[a]=[e[a]]);for(var b=0;b<e[a].length;b++)g.push(j.uriEscape(String(a))+"="+e[a][b])}),d+=g.join("&")}a.httpRequest.path=d}function f(a){var b=a.service.api.operations[a.operation];j.each(b.input.members,function(b,c){var d=a.params[b];null!==d&&void 0!==d&&("headers"===c.location&&"map"===c.type?j.each(d,function(b,d){a.httpRequest.headers[c.name+b]=d}):"header"===c.location&&(d=c.toWireFormat(d).toString(),a.httpRequest.headers[c.name]=d))})}function g(a){d(a),e(a),f(a)}function h(){}function i(a){var b=a.request,c={},d=a.httpResponse,e=b.service.api.operations[b.operation],f=e.output,g={};j.each(d.headers,function(a,b){g[a.toLowerCase()]=b}),j.each(f.members,function(a,b){var e=(b.name||a).toLowerCase();if("headers"===b.location&&"map"===b.type){c[a]={};var f=b.isLocationName?b.name:"",h=new RegExp("^"+f+"(.+)","i");j.each(d.headers,function(b,d){var e=b.match(h);null!==e&&(c[a][e[1]]=d)})}else"header"===b.location?void 0!==g[e]&&(c[a]=g[e]):"statusCode"===b.location&&(c[a]=parseInt(d.statusCode,10))}),a.data=c}var j=a("../util");b.exports={buildRequest:g,extractError:h,extractData:i}},{"../util":53}],33:[function(a,b,c){function d(a){var b=new k,c=a.service.api.operations[a.operation].input;if(c.payload){var d={},e=c.members[c.payload];if(d=a.params[c.payload],void 0===d)return;"structure"===e.type?a.httpRequest.body=b.build(d,e):a.httpRequest.body=d}else a.httpRequest.body=b.build(a.params,c)}function e(a){i.buildRequest(a),["GET","HEAD","DELETE"].indexOf(a.httpRequest.method)<0&&d(a)}function f(a){j.extractError(a)}function g(a){i.extractData(a);var b=a.request,c=b.service.api.operations[b.operation].output||{};if(c.payload){var d=c.members[c.payload],e=a.httpResponse.body;if(d.isStreaming)a.data[c.payload]=e;else if("structure"===d.type||"list"===d.type){var f=new l;a.data[c.payload]=f.parse(e,d)}else a.data[c.payload]=e.toString()}else{var g=a.data;j.extractData(a),a.data=h.merge(g,a.data)}}var h=a("../util"),i=a("./rest"),j=a("./json"),k=a("../json/builder"),l=a("../json/parser");b.exports={buildRequest:e,extractError:f,extractData:g}},{"../json/builder":21,"../json/parser":22,"../util":53,"./json":30,"./rest":32}],34:[function(a,b,c){function d(a){var b=a.service.api.operations[a.operation].input,c=new h.XML.Builder,d=a.params,e=b.payload;if(e){var f=b.members[e];if(d=d[e],void 0===d)return;if("structure"===f.type){var g=f.name;a.httpRequest.body=c.toXML(d,f,g,!0)}else a.httpRequest.body=d}else a.httpRequest.body=c.toXML(d,b,b.name||b.shape||i.string.upperFirst(a.operation)+"Request")}function e(a){j.buildRequest(a),["GET","HEAD"].indexOf(a.httpRequest.method)<0&&d(a)}function f(a){j.extractError(a);var b=(new h.XML.Parser).parse(a.httpResponse.body.toString());b.Errors&&(b=b.Errors),b.Error&&(b=b.Error),b.Code?a.error=i.error(new Error,{code:b.Code,message:b.Message}):a.error=i.error(new Error,{code:a.httpResponse.statusCode,message:null})}function g(a){j.extractData(a);var b,c=a.request,d=a.httpResponse.body,e=c.service.api.operations[c.operation],f=e.output,g=f.payload;if(g){var k=f.members[g];k.isStreaming?a.data[g]=d:"structure"===k.type?(b=new h.XML.Parser,a.data[g]=b.parse(d.toString(),k)):a.data[g]=d.toString()}else if(d.length>0){b=new h.XML.Parser;var l=b.parse(d.toString(),f);i.update(a.data,l)}}var h=a("../core"),i=a("../util"),j=a("./rest");b.exports={buildRequest:e,extractError:f,extractData:g}},{"../core":11,"../util":53,"./rest":32}],35:[function(a,b,c){function d(){}function e(a){return a.isQueryName||"ec2"!==a.api.protocol?a.name:a.name[0].toUpperCase()+a.name.substr(1)}function f(a,b,c,d){j.each(c.members,function(c,f){var g=b[c];if(null!==g&&void 0!==g){var h=e(f);h=a?a+"."+h:h,i(h,g,f,d)}})}function g(a,b,c,d){var e=1;j.each(b,function(b,f){var g=c.flattened?".":".entry.",h=g+e++ +".",j=h+(c.key.name||"key"),k=h+(c.value.name||"value");i(a+j,b,c.key,d),i(a+k,f,c.value,d)})}function h(a,b,c,d){var f=c.member||{};return 0===b.length?void d.call(this,a,null):void j.arrayEach(b,function(b,g){var h="."+(g+1);if("ec2"===c.api.protocol)h+="";else if(c.flattened){if(f.name){var j=a.split(".");j.pop(),j.push(e(f)),a=j.join(".")}}else h=".member"+h;i(a+h,b,f,d)})}function i(a,b,c,d){null!==b&&void 0!==b&&("structure"===c.type?f(a,b,c,d):"list"===c.type?h(a,b,c,d):"map"===c.type?g(a,b,c,d):d(a,c.toWireFormat(b).toString()))}var j=a("../util");d.prototype.serialize=function(a,b,c){f("",a,b,c)},b.exports=d},{"../util":53}],36:[function(a,b,c){function d(a){if(!a)return null;var b=a.split("-");return b.length<3?null:b.slice(0,b.length-2).join("-")+"-*"}function e(a){var b=a.config.region,c=d(b),e=a.api.endpointPrefix;return[[b,e],[c,e],[b,"*"],[c,"*"],["*",e],["*","*"]].map(function(a){return a[0]&&a[1]?a.join("/"):null})}function f(a,b){h.each(b,function(b,c){"globalEndpoint"!==b&&(void 0!==a.config[b]&&null!==a.config[b]||(a.config[b]=c))})}function g(a){for(var b=e(a),c=0;c<b.length;c++){var d=b[c];if(d&&Object.prototype.hasOwnProperty.call(i.rules,d)){var g=i.rules[d];return"string"==typeof g&&(g=i.patterns[g]),a.config.useDualstack&&h.isDualstackAvailable(a)&&(g=h.copy(g),g.endpoint="{service}.dualstack.{region}.amazonaws.com"),a.isGlobalEndpoint=!!g.globalEndpoint,g.signatureVersion||(g.signatureVersion="v4"),void f(a,g)}}}var h=a("./util"),i=a("./region_config.json");b.exports=g},{"./region_config.json":37,"./util":53}],37:[function(a,b,c){b.exports={rules:{"*/*":{endpoint:"{service}.{region}.amazonaws.com"},"cn-*/*":{endpoint:"{service}.{region}.amazonaws.com.cn"},"*/cloudfront":"globalSSL","*/iam":"globalSSL","*/sts":"globalSSL","*/importexport":{endpoint:"{service}.amazonaws.com",signatureVersion:"v2",globalEndpoint:!0},"*/route53":{endpoint:"https://{service}.amazonaws.com",signatureVersion:"v3https",globalEndpoint:!0},"*/waf":"globalSSL","us-gov-*/iam":"globalGovCloud","us-gov-*/sts":{endpoint:"{service}.{region}.amazonaws.com"},"us-gov-west-1/s3":"s3dash","us-west-1/s3":"s3dash","us-west-2/s3":"s3dash","eu-west-1/s3":"s3dash","ap-southeast-1/s3":"s3dash","ap-southeast-2/s3":"s3dash","ap-northeast-1/s3":"s3dash","sa-east-1/s3":"s3dash","us-east-1/s3":{endpoint:"{service}.amazonaws.com",signatureVersion:"s3"},"us-east-1/sdb":{endpoint:"{service}.amazonaws.com",signatureVersion:"v2"},"*/sdb":{endpoint:"{service}.{region}.amazonaws.com",signatureVersion:"v2"}},patterns:{globalSSL:{endpoint:"https://{service}.amazonaws.com",globalEndpoint:!0},globalGovCloud:{endpoint:"{service}.us-gov.amazonaws.com"},s3dash:{endpoint:"{service}-{region}.amazonaws.com",signatureVersion:"s3"}}}},{}],38:[function(a,b,c){(function(b){function c(a){return Object.prototype.hasOwnProperty.call(i,a._asm.currentState)}var d=a("./core"),e=a("./state_machine"),f=d.util.inherit,g=d.util.domain,h=a("jmespath"),i={success:1,error:1,complete:1},j=new e;j.setupStates=function(){var a=function(a,b){var d=this;d._haltHandlersOnError=!1,d.emit(d._asm.currentState,function(a){if(a)if(c(d)){if(!(g&&d.domain instanceof g.Domain))throw a;a.domainEmitter=d,a.domain=d.domain,a.domainThrown=!1,d.domain.emit("error",a)}else d.response.error=a,b(a);else b(d.response.error)})};this.addState("validate","build","error",a),this.addState("build","afterBuild","restart",a),this.addState("afterBuild","sign","restart",a),this.addState("sign","send","retry",a),this.addState("retry","afterRetry","afterRetry",a),this.addState("afterRetry","sign","error",a),this.addState("send","validateResponse","retry",a),this.addState("validateResponse","extractData","extractError",a),this.addState("extractError","extractData","retry",a),this.addState("extractData","success","retry",a),this.addState("restart","build","error",a),this.addState("success","complete","complete",a),this.addState("error","complete","complete",a),this.addState("complete",null,null,a)},j.setupStates(),d.Request=f({constructor:function(a,b,c){var f=a.endpoint,h=a.config.region,i=a.config.customUserAgent;a.isGlobalEndpoint&&(h="us-east-1"),this.domain=g&&g.active,this.service=a,this.operation=b,this.params=c||{},this.httpRequest=new d.HttpRequest(f,h,i),this.startTime=d.util.date.getDate(),this.response=new d.Response(this),this._asm=new e(j.states,"validate"),this._haltHandlersOnError=!1,d.SequentialExecutor.call(this),this.emit=this.emitEvent},send:function(a){return a&&this.on("complete",function(b){a.call(b,b.error,b.data)}),this.runTo(),this.response},build:function(a){return this.runTo("send",a)},runTo:function(a,b){return this._asm.runTo(a,b,this),this},abort:function(){return this.removeAllListeners("validateResponse"),this.removeAllListeners("extractError"),this.on("validateResponse",function(a){a.error=d.util.error(new Error("Request aborted by user"),{code:"RequestAbortedError",retryable:!1})}),this.httpRequest.stream&&(this.httpRequest.stream.abort(),this.httpRequest._abortCallback?this.httpRequest._abortCallback():this.removeAllListeners("send")),this},eachPage:function(a){function b(c){a.call(c,c.error,c.data,function(e){e!==!1&&(c.hasNextPage()?c.nextPage().on("complete",b).send():a.call(c,null,null,d.util.fn.noop))})}a=d.util.fn.makeAsync(a,3),this.on("complete",b).send()},eachItem:function(a){function b(b,e){if(b)return a(b,null);if(null===e)return a(null,null);var f=c.service.paginationConfig(c.operation),g=f.resultKey;Array.isArray(g)&&(g=g[0]);var i=h.search(e,g),j=!0;return d.util.arrayEach(i,function(b){return j=a(null,b),j===!1?d.util.abort:void 0}),j}var c=this;this.eachPage(b)},isPageable:function(){return!!this.service.paginationConfig(this.operation)},createReadStream:function(){var a=d.util.stream,c=this,e=null;return 2===d.HttpClient.streamsApiVersion?(e=new a.PassThrough,c.send()):(e=new a.Stream,e.readable=!0,e.sent=!1,e.on("newListener",function(a){e.sent||"data"!==a||(e.sent=!0,b.nextTick(function(){c.send()}))})),this.on("httpHeaders",function(b,f,g){if(300>b){c.removeListener("httpData",d.EventListeners.Core.HTTP_DATA),c.removeListener("httpError",d.EventListeners.Core.HTTP_ERROR),c.on("httpError",function(a){g.error=a,g.error.retryable=!1});var h,i=!1;if("HEAD"!==c.httpRequest.method&&(h=parseInt(f["content-length"],10)),void 0!==h&&!isNaN(h)&&h>=0){i=!0;var j=0}var k=function(){i&&j!==h?e.emit("error",d.util.error(new Error("Stream content length mismatch. Received "+j+" of "+h+" bytes."),{code:"StreamContentLengthMismatch"})):2===d.HttpClient.streamsApiVersion?e.end():e.emit("end")},l=g.httpResponse.createUnbufferedStream();if(2===d.HttpClient.streamsApiVersion)if(i){var m=new a.PassThrough;m._write=function(b){return b&&b.length&&(j+=b.length),a.PassThrough.prototype._write.apply(this,arguments)},m.on("end",k),l.pipe(m).pipe(e,{end:!1})}else l.pipe(e);else i&&l.on("data",function(a){a&&a.length&&(j+=a.length)}),l.on("data",function(a){e.emit("data",a)}),l.on("end",k);l.on("error",function(a){i=!1,e.emit("error",a)})}}),this.on("error",function(a){e.emit("error",a)}),e},emitEvent:function(a,b,c){"function"==typeof b&&(c=b,b=null),c||(c=function(){}),b||(b=this.eventParameters(a,this.response));var e=d.SequentialExecutor.prototype.emit;e.call(this,a,b,function(a){a&&(this.response.error=a),c.call(this,a)})},eventParameters:function(a){switch(a){case"restart":case"validate":case"sign":case"build":case"afterValidate":case"afterBuild":return[this];case"error":return[this.response.error,this.response];default:return[this.response]}},presign:function(a,b){return b||"function"!=typeof a||(b=a,a=null),(new d.Signers.Presign).sign(this.toGet(),a,b)},isPresigned:function(){return Object.prototype.hasOwnProperty.call(this.httpRequest.headers,"presigned-expires")},toUnauthenticated:function(){return this.removeListener("validate",d.EventListeners.Core.VALIDATE_CREDENTIALS),this.removeListener("sign",d.EventListeners.Core.SIGN),this},toGet:function(){return"query"!==this.service.api.protocol&&"ec2"!==this.service.api.protocol||(this.removeListener("build",this.buildAsGet),this.addListener("build",this.buildAsGet)),this},buildAsGet:function(a){a.httpRequest.method="GET",a.httpRequest.path=a.service.endpoint.path+"?"+a.httpRequest.body,a.httpRequest.body="",delete a.httpRequest.headers["Content-Length"],delete a.httpRequest.headers["Content-Type"]},haltHandlersOnError:function(){this._haltHandlersOnError=!0}}),d.util.addPromisesToRequests(d.Request),d.util.mixin(d.Request,d.SequentialExecutor)}).call(this,a("FWaASH"))},{"./core":11,"./state_machine":52,FWaASH:62,jmespath:79}],39:[function(a,b,c){function d(a){var b=a.request._waiter,c=b.config.acceptors,d=!1,e="retry";c.forEach(function(c){if(!d){var f=b.matchers[c.matcher];f&&f(a,c.expected,c.argument)&&(d=!0,e=c.state)}}),!d&&a.error&&(e="failure"),"success"===e?b.setSuccess(a):b.setError(a,"retry"===e)}var e=a("./core"),f=e.util.inherit,g=a("jmespath");e.ResourceWaiter=f({constructor:function(a,b){this.service=a,this.state=b,this.loadWaiterConfig(this.state)},service:null,state:null,config:null,matchers:{path:function(a,b,c){var d=g.search(a.data,c);return g.strictDeepEqual(d,b)},pathAll:function(a,b,c){var d=g.search(a.data,c);Array.isArray(d)||(d=[d]);var e=d.length;if(!e)return!1;for(var f=0;e>f;f++)if(!g.strictDeepEqual(d[f],b))return!1;return!0},pathAny:function(a,b,c){var d=g.search(a.data,c);Array.isArray(d)||(d=[d]);for(var e=d.length,f=0;e>f;f++)if(g.strictDeepEqual(d[f],b))return!0;return!1},status:function(a,b){var c=a.httpResponse.statusCode;return"number"==typeof c&&c===b},error:function(a,b){return"string"==typeof b&&a.error?b===a.error.code:b===!!a.error}},listeners:(new e.SequentialExecutor).addNamedListeners(function(a){a("RETRY_CHECK","retry",function(a){var b=a.request._waiter;a.error&&"ResourceNotReady"===a.error.code&&(a.error.retryDelay=1e3*(b.config.delay||0))}),a("CHECK_OUTPUT","extractData",d),a("CHECK_ERROR","extractError",d)}),wait:function(a,b){"function"==typeof a&&(b=a,a=void 0);var c=this.service.makeRequest(this.config.operation,a);return c._waiter=this,c.response.maxRetries=this.config.maxAttempts,c.addListeners(this.listeners),b&&c.send(b),c},setSuccess:function(a){a.error=null,a.data=a.data||{},a.request.removeAllListeners("extractData")},setError:function(a,b){a.data=null,a.error=e.util.error(a.error||new Error,{code:"ResourceNotReady",message:"Resource is not in the state "+this.state,retryable:b})},loadWaiterConfig:function(a){if(!this.service.api.waiters[a])throw new e.util.error(new Error,{code:"StateNotFoundError",message:"State "+a+" not found."});this.config=this.service.api.waiters[a]}})},{"./core":11,jmespath:79}],40:[function(a,b,c){var d=a("./core"),e=d.util.inherit,f=a("jmespath");d.Response=e({constructor:function(a){this.request=a,this.data=null,this.error=null,this.retryCount=0,this.redirectCount=0,this.httpResponse=new d.HttpResponse,a&&(this.maxRetries=a.service.numRetries(),this.maxRedirects=a.service.config.maxRedirects)},nextPage:function(a){var b,c=this.request.service,e=this.request.operation;try{b=c.paginationConfig(e,!0)}catch(f){this.error=f}if(!this.hasNextPage()){if(a)a(this.error,null);else if(this.error)throw this.error;return null}var g=d.util.copy(this.request.params);if(this.nextPageTokens){var h=b.inputToken;"string"==typeof h&&(h=[h]);for(var i=0;i<h.length;i++)g[h[i]]=this.nextPageTokens[i];return c.makeRequest(this.request.operation,g,a)}return a?a(null,null):null},hasNextPage:function(){return this.cacheNextPageTokens(),this.nextPageTokens?!0:void 0===this.nextPageTokens?void 0:!1},cacheNextPageTokens:function(){if(Object.prototype.hasOwnProperty.call(this,"nextPageTokens"))return this.nextPageTokens;this.nextPageTokens=void 0;var a=this.request.service.paginationConfig(this.request.operation);if(!a)return this.nextPageTokens;if(this.nextPageTokens=null,a.moreResults&&!f.search(this.data,a.moreResults))return this.nextPageTokens;var b=a.outputToken;return"string"==typeof b&&(b=[b]),d.util.arrayEach.call(this,b,function(a){var b=f.search(this.data,a);b&&(this.nextPageTokens=this.nextPageTokens||[],this.nextPageTokens.push(b))}),this.nextPageTokens}})},{"./core":11,jmespath:79}],41:[function(a,b,c){var d=a("./core");d.SequentialExecutor=d.util.inherit({constructor:function(){this._events={}},listeners:function(a){return this._events[a]?this._events[a].slice(0):[]},on:function(a,b){return this._events[a]?this._events[a].push(b):this._events[a]=[b],this},onAsync:function(a,b){return b._isAsync=!0,this.on(a,b)},removeListener:function(a,b){var c=this._events[a];if(c){for(var d=c.length,e=-1,f=0;d>f;++f)c[f]===b&&(e=f);e>-1&&c.splice(e,1)}return this},removeAllListeners:function(a){return a?delete this._events[a]:this._events={},this},emit:function(a,b,c){c||(c=function(){});var d=this.listeners(a),e=d.length;return this.callListeners(d,b,c),e>0},callListeners:function(a,b,c,e){function f(e){return e&&(h=d.util.error(h||new Error,e),g._haltHandlersOnError)?c.call(g,h):void g.callListeners(a,b,c,h)}for(var g=this,h=e||null;a.length>0;){var i=a.shift();if(i._isAsync)return void i.apply(g,b.concat([f]));try{i.apply(g,b)}catch(j){h=d.util.error(h||new Error,j)}if(h&&g._haltHandlersOnError)return void c.call(g,h)}c.call(g,h)},addListeners:function(a){var b=this;return a._events&&(a=a._events),d.util.each(a,function(a,c){"function"==typeof c&&(c=[c]),d.util.arrayEach(c,function(c){b.on(a,c)})}),b},addNamedListener:function(a,b,c){return this[a]=c,this.addListener(b,c),this},addNamedAsyncListener:function(a,b,c){return c._isAsync=!0,this.addNamedListener(a,b,c)},addNamedListeners:function(a){var b=this;return a(function(){b.addNamedListener.apply(b,arguments)},function(){b.addNamedAsyncListener.apply(b,arguments)}),this}}),d.SequentialExecutor.prototype.addListener=d.SequentialExecutor.prototype.on,b.exports=d.SequentialExecutor},{"./core":11}],42:[function(a,b,c){var d=a("./core"),e=a("./model/api"),f=a("./region_config"),g=d.util.inherit,h=0;d.Service=g({constructor:function(a){if(!this.loadServiceClass)throw d.util.error(new Error,"Service must be constructed with `new' operator");var b=this.loadServiceClass(a||{});if(b){var c=d.util.copy(a),e=new b(a);return Object.defineProperty(e,"_originalConfig",{get:function(){return c},enumerable:!1,configurable:!0}),e._clientId=++h,e}this.initialize(a)},initialize:function(a){var b=d.config[this.serviceIdentifier];this.config=new d.Config(d.config),b&&this.config.update(b,!0),a&&this.config.update(a,!0),this.validateService(),this.config.endpoint||f(this),this.config.endpoint=this.endpointFromTemplate(this.config.endpoint),this.setEndpoint(this.config.endpoint)},validateService:function(){},loadServiceClass:function(a){var b=a;if(d.util.isEmpty(this.api)){if(b.apiConfig)return d.Service.defineServiceApi(this.constructor,b.apiConfig);if(this.constructor.services){b=new d.Config(d.config),b.update(a,!0);var c=b.apiVersions[this.constructor.serviceIdentifier];return c=c||b.apiVersion,this.getLatestServiceClass(c)}return null}return null},getLatestServiceClass:function(a){return a=this.getLatestServiceVersion(a),null===this.constructor.services[a]&&d.Service.defineServiceApi(this.constructor,a),this.constructor.services[a]},getLatestServiceVersion:function(a){if(!this.constructor.services||0===this.constructor.services.length)throw new Error("No services defined on "+this.constructor.serviceIdentifier);if(a?d.util.isType(a,Date)&&(a=d.util.date.iso8601(a).split("T")[0]):a="latest",Object.hasOwnProperty(this.constructor.services,a))return a;for(var b=Object.keys(this.constructor.services).sort(),c=null,e=b.length-1;e>=0;e--)if("*"!==b[e][b[e].length-1]&&(c=b[e]),b[e].substr(0,10)<=a)return c;throw new Error("Could not find "+this.constructor.serviceIdentifier+" API to satisfy version constraint `"+a+"'")},api:{},defaultRetryCount:3,makeRequest:function(a,b,c){if("function"==typeof b&&(c=b,b=null),b=b||{},this.config.params){var e=this.api.operations[a];e&&(b=d.util.copy(b),d.util.each(this.config.params,function(a,c){e.input.members[a]&&(void 0!==b[a]&&null!==b[a]||(b[a]=c))}))}var f=new d.Request(this,a,b);return this.addAllRequestListeners(f),c&&f.send(c),f},makeUnauthenticatedRequest:function(a,b,c){"function"==typeof b&&(c=b,b={});var d=this.makeRequest(a,b).toUnauthenticated();return c?d.send(c):d},waitFor:function(a,b,c){var e=new d.ResourceWaiter(this,a);return e.wait(b,c)},addAllRequestListeners:function(a){for(var b=[d.events,d.EventListeners.Core,this.serviceInterface(),d.EventListeners.CorePost],c=0;c<b.length;c++)b[c]&&a.addListeners(b[c]);this.config.paramValidation||a.removeListener("validate",d.EventListeners.Core.VALIDATE_PARAMETERS),this.config.logger&&a.addListeners(d.EventListeners.Logger),this.setupRequestListeners(a)},setupRequestListeners:function(){},getSignerClass:function(){var a;return a=this.config.signatureVersion?this.config.signatureVersion:this.api.signatureVersion,d.Signers.RequestSigner.getVersion(a)},serviceInterface:function(){switch(this.api.protocol){case"ec2":return d.EventListeners.Query;case"query":return d.EventListeners.Query;case"json":return d.EventListeners.Json;case"rest-json":return d.EventListeners.RestJson;case"rest-xml":return d.EventListeners.RestXml}if(this.api.protocol)throw new Error("Invalid service `protocol' "+this.api.protocol+" in API config")},successfulResponse:function(a){return a.httpResponse.statusCode<300},numRetries:function(){return void 0!==this.config.maxRetries?this.config.maxRetries:this.defaultRetryCount},retryDelays:function(a){return d.util.calculateRetryDelay(a,this.config.retryDelayOptions)},retryableError:function(a){return this.networkingError(a)?!0:this.expiredCredentialsError(a)?!0:this.throttledError(a)?!0:a.statusCode>=500},networkingError:function(a){return"NetworkingError"===a.code},expiredCredentialsError:function(a){return"ExpiredTokenException"===a.code},clockSkewError:function(a){switch(a.code){case"RequestTimeTooSkewed":case"RequestExpired":case"InvalidSignatureException":case"SignatureDoesNotMatch":case"AuthFailure":case"RequestInTheFuture":return!0;default:return!1}},throttledError:function(a){switch(a.code){case"ProvisionedThroughputExceededException":case"Throttling":case"ThrottlingException":case"RequestLimitExceeded":case"RequestThrottled":return!0;default:return!1}},endpointFromTemplate:function(a){if("string"!=typeof a)return a;var b=a;return b=b.replace(/\{service\}/g,this.api.endpointPrefix),b=b.replace(/\{region\}/g,this.config.region),b=b.replace(/\{scheme\}/g,this.config.sslEnabled?"https":"http")},setEndpoint:function(a){this.endpoint=new d.Endpoint(a,this.config)},paginationConfig:function(a,b){var c=this.api.operations[a].paginator;if(!c){if(b){var e=new Error;throw d.util.error(e,"No pagination configuration for "+a)}return null}return c}}),d.util.update(d.Service,{defineMethods:function(a){d.util.each(a.prototype.api.operations,function(b){if(!a.prototype[b]){var c=a.prototype.api.operations[b];"none"===c.authtype?a.prototype[b]=function(a,c){return this.makeUnauthenticatedRequest(b,a,c)}:a.prototype[b]=function(a,c){return this.makeRequest(b,a,c)}}})},defineService:function(a,b,c){d.Service._serviceMap[a]=!0,Array.isArray(b)||(c=b,b=[]);var e=g(d.Service,c||{});if("string"==typeof a){d.Service.addVersions(e,b);var f=e.serviceIdentifier||a;e.serviceIdentifier=f}else e.prototype.api=a,d.Service.defineMethods(e);return e},addVersions:function(a,b){Array.isArray(b)||(b=[b]),a.services=a.services||{};for(var c=0;c<b.length;c++)void 0===a.services[b[c]]&&(a.services[b[c]]=null);a.apiVersions=Object.keys(a.services).sort()},defineServiceApi:function(a,b,c){function f(a){a.isApi?h.prototype.api=a:h.prototype.api=new e(a)}var h=g(a,{serviceIdentifier:a.serviceIdentifier});if("string"==typeof b){if(c)f(c);else try{f(d.apiLoader(a.serviceIdentifier,b))}catch(i){throw d.util.error(i,{message:"Could not find API configuration "+a.serviceIdentifier+"-"+b})}Object.prototype.hasOwnProperty.call(a.services,b)||(a.apiVersions=a.apiVersions.concat(b).sort()),a.services[b]=h}else f(b);return d.Service.defineMethods(h),h},hasService:function(a){return Object.prototype.hasOwnProperty.call(d.Service._serviceMap,a)},_serviceMap:{}}),b.exports=d.Service},{"./core":11,"./model/api":23,"./region_config":36}],43:[function(a,b,c){var d=a("../core");d.util.update(d.CognitoIdentity.prototype,{getOpenIdToken:function(a,b){return this.makeUnauthenticatedRequest("getOpenIdToken",a,b)},getId:function(a,b){return this.makeUnauthenticatedRequest("getId",a,b)},getCredentialsForIdentity:function(a,b){
return this.makeUnauthenticatedRequest("getCredentialsForIdentity",a,b)}})},{"../core":11}],44:[function(a,b,c){var d=a("../core");d.util.update(d.STS.prototype,{credentialsFrom:function(a,b){return a?(b||(b=new d.TemporaryCredentials),b.expired=!1,b.accessKeyId=a.Credentials.AccessKeyId,b.secretAccessKey=a.Credentials.SecretAccessKey,b.sessionToken=a.Credentials.SessionToken,b.expireTime=a.Credentials.Expiration,b):null},assumeRoleWithWebIdentity:function(a,b){return this.makeUnauthenticatedRequest("assumeRoleWithWebIdentity",a,b)},assumeRoleWithSAML:function(a,b){return this.makeUnauthenticatedRequest("assumeRoleWithSAML",a,b)}})},{"../core":11}],45:[function(a,b,c){function d(a){var b=a.httpRequest.headers[h],c=a.service.getSignerClass(a);if(delete a.httpRequest.headers["User-Agent"],delete a.httpRequest.headers["X-Amz-User-Agent"],c===f.Signers.V4){if(b>604800){var d="Presigning does not support expiry time greater than a week with SigV4 signing.";throw f.util.error(new Error,{code:"InvalidExpiryTime",message:d,retryable:!1})}a.httpRequest.headers[h]=b}else{if(c!==f.Signers.S3)throw f.util.error(new Error,{message:"Presigning only supports S3 or SigV4 signing.",code:"UnsupportedSigner",retryable:!1});a.httpRequest.headers[h]=parseInt(f.util.date.unixTimestamp()+b,10).toString()}}function e(a){var b=a.httpRequest.endpoint,c=f.util.urlParse(a.httpRequest.path),d={};c.search&&(d=f.util.queryStringParse(c.search.substr(1))),f.util.each(a.httpRequest.headers,function(a,b){a===h&&(a="Expires"),0===a.indexOf("x-amz-meta-")&&(delete d[a],a=a.toLowerCase()),d[a]=b}),delete a.httpRequest.headers[h];var e=d.Authorization.split(" ");if("AWS"===e[0])e=e[1].split(":"),d.AWSAccessKeyId=e[0],d.Signature=e[1];else if("AWS4-HMAC-SHA256"===e[0]){e.shift();var g=e.join(" "),i=g.match(/Signature=(.*?)(?:,|\s|\r?\n|$)/)[1];d["X-Amz-Signature"]=i,delete d.Expires}delete d.Authorization,delete d.Host,b.pathname=c.pathname,b.search=f.util.queryParamsToString(d)}var f=a("../core"),g=f.util.inherit,h="presigned-expires";f.Signers.Presign=g({sign:function(a,b,c){if(a.httpRequest.headers[h]=b||3600,a.on("build",d),a.on("sign",e),a.removeListener("afterBuild",f.EventListeners.Core.SET_CONTENT_LENGTH),a.removeListener("afterBuild",f.EventListeners.Core.COMPUTE_SHA256),a.emit("beforePresign",[a]),!c){if(a.build(),a.response.error)throw a.response.error;return f.util.urlFormat(a.httpRequest.endpoint)}a.build(function(){this.response.error?c(this.response.error):c(null,f.util.urlFormat(a.httpRequest.endpoint))})}}),b.exports=f.Signers.Presign},{"../core":11}],46:[function(a,b,c){var d=a("../core"),e=d.util.inherit;d.Signers.RequestSigner=e({constructor:function(a){this.request=a},setServiceClientId:function(a){this.serviceClientId=a},getServiceClientId:function(){return this.serviceClientId}}),d.Signers.RequestSigner.getVersion=function(a){switch(a){case"v2":return d.Signers.V2;case"v3":return d.Signers.V3;case"v4":return d.Signers.V4;case"s3":return d.Signers.S3;case"v3https":return d.Signers.V3Https}throw new Error("Unknown signing version "+a)},a("./v2"),a("./v3"),a("./v3https"),a("./v4"),a("./s3"),a("./presign")},{"../core":11,"./presign":45,"./s3":47,"./v2":48,"./v3":49,"./v3https":50,"./v4":51}],47:[function(a,b,c){var d=a("../core"),e=d.util.inherit;d.Signers.S3=e(d.Signers.RequestSigner,{subResources:{acl:1,accelerate:1,cors:1,lifecycle:1,"delete":1,location:1,logging:1,notification:1,partNumber:1,policy:1,requestPayment:1,replication:1,restore:1,tagging:1,torrent:1,uploadId:1,uploads:1,versionId:1,versioning:1,versions:1,website:1},responseHeaders:{"response-content-type":1,"response-content-language":1,"response-expires":1,"response-cache-control":1,"response-content-disposition":1,"response-content-encoding":1},addAuthorization:function(a,b){this.request.headers["presigned-expires"]||(this.request.headers["X-Amz-Date"]=d.util.date.rfc822(b)),a.sessionToken&&(this.request.headers["x-amz-security-token"]=a.sessionToken);var c=this.sign(a.secretAccessKey,this.stringToSign()),e="AWS "+a.accessKeyId+":"+c;this.request.headers.Authorization=e},stringToSign:function(){var a=this.request,b=[];b.push(a.method),b.push(a.headers["Content-MD5"]||""),b.push(a.headers["Content-Type"]||""),b.push(a.headers["presigned-expires"]||"");var c=this.canonicalizedAmzHeaders();return c&&b.push(c),b.push(this.canonicalizedResource()),b.join("\n")},canonicalizedAmzHeaders:function(){var a=[];d.util.each(this.request.headers,function(b){b.match(/^x-amz-/i)&&a.push(b)}),a.sort(function(a,b){return a.toLowerCase()<b.toLowerCase()?-1:1});var b=[];return d.util.arrayEach.call(this,a,function(a){b.push(a.toLowerCase()+":"+String(this.request.headers[a]))}),b.join("\n")},canonicalizedResource:function(){var a=this.request,b=a.path.split("?"),c=b[0],e=b[1],f="";if(a.virtualHostedBucket&&(f+="/"+a.virtualHostedBucket),f+=c,e){var g=[];d.util.arrayEach.call(this,e.split("&"),function(a){var b=a.split("=")[0],c=a.split("=")[1];if(this.subResources[b]||this.responseHeaders[b]){var d={name:b};void 0!==c&&(this.subResources[b]?d.value=c:d.value=decodeURIComponent(c)),g.push(d)}}),g.sort(function(a,b){return a.name<b.name?-1:1}),g.length&&(e=[],d.util.arrayEach(g,function(a){void 0===a.value?e.push(a.name):e.push(a.name+"="+a.value)}),f+="?"+e.join("&"))}return f},sign:function(a,b){return d.util.crypto.hmac(a,b,"base64","sha1")}}),b.exports=d.Signers.S3},{"../core":11}],48:[function(a,b,c){var d=a("../core"),e=d.util.inherit;d.Signers.V2=e(d.Signers.RequestSigner,{addAuthorization:function(a,b){b||(b=d.util.date.getDate());var c=this.request;c.params.Timestamp=d.util.date.iso8601(b),c.params.SignatureVersion="2",c.params.SignatureMethod="HmacSHA256",c.params.AWSAccessKeyId=a.accessKeyId,a.sessionToken&&(c.params.SecurityToken=a.sessionToken),delete c.params.Signature,c.params.Signature=this.signature(a),c.body=d.util.queryParamsToString(c.params),c.headers["Content-Length"]=c.body.length},signature:function(a){return d.util.crypto.hmac(a.secretAccessKey,this.stringToSign(),"base64")},stringToSign:function(){var a=[];return a.push(this.request.method),a.push(this.request.endpoint.host.toLowerCase()),a.push(this.request.pathname()),a.push(d.util.queryParamsToString(this.request.params)),a.join("\n")}}),b.exports=d.Signers.V2},{"../core":11}],49:[function(a,b,c){var d=a("../core"),e=d.util.inherit;d.Signers.V3=e(d.Signers.RequestSigner,{addAuthorization:function(a,b){var c=d.util.date.rfc822(b);this.request.headers["X-Amz-Date"]=c,a.sessionToken&&(this.request.headers["x-amz-security-token"]=a.sessionToken),this.request.headers["X-Amzn-Authorization"]=this.authorization(a,c)},authorization:function(a){return"AWS3 AWSAccessKeyId="+a.accessKeyId+",Algorithm=HmacSHA256,SignedHeaders="+this.signedHeaders()+",Signature="+this.signature(a)},signedHeaders:function(){var a=[];return d.util.arrayEach(this.headersToSign(),function(b){a.push(b.toLowerCase())}),a.sort().join(";")},canonicalHeaders:function(){var a=this.request.headers,b=[];return d.util.arrayEach(this.headersToSign(),function(c){b.push(c.toLowerCase().trim()+":"+String(a[c]).trim())}),b.sort().join("\n")+"\n"},headersToSign:function(){var a=[];return d.util.each(this.request.headers,function(b){("Host"===b||"Content-Encoding"===b||b.match(/^X-Amz/i))&&a.push(b)}),a},signature:function(a){return d.util.crypto.hmac(a.secretAccessKey,this.stringToSign(),"base64")},stringToSign:function(){var a=[];return a.push(this.request.method),a.push("/"),a.push(""),a.push(this.canonicalHeaders()),a.push(this.request.body),d.util.crypto.sha256(a.join("\n"))}}),b.exports=d.Signers.V3},{"../core":11}],50:[function(a,b,c){var d=a("../core"),e=d.util.inherit;a("./v3"),d.Signers.V3Https=e(d.Signers.V3,{authorization:function(a){return"AWS3-HTTPS AWSAccessKeyId="+a.accessKeyId+",Algorithm=HmacSHA256,Signature="+this.signature(a)},stringToSign:function(){return this.request.headers["X-Amz-Date"]}}),b.exports=d.Signers.V3Https},{"../core":11,"./v3":49}],51:[function(a,b,c){var d=a("../core"),e=d.util.inherit,f={},g=[],h=50,i="presigned-expires";d.Signers.V4=e(d.Signers.RequestSigner,{constructor:function(a,b,c){d.Signers.RequestSigner.call(this,a),this.serviceName=b,this.signatureCache=c},algorithm:"AWS4-HMAC-SHA256",addAuthorization:function(a,b){var c=d.util.date.iso8601(b).replace(/[:\-]|\.\d{3}/g,"");this.isPresigned()?this.updateForPresigned(a,c):this.addHeaders(a,c),this.request.headers.Authorization=this.authorization(a,c)},addHeaders:function(a,b){this.request.headers["X-Amz-Date"]=b,a.sessionToken&&(this.request.headers["x-amz-security-token"]=a.sessionToken)},updateForPresigned:function(a,b){var c=this.credentialString(b),e={"X-Amz-Date":b,"X-Amz-Algorithm":this.algorithm,"X-Amz-Credential":a.accessKeyId+"/"+c,"X-Amz-Expires":this.request.headers[i],"X-Amz-SignedHeaders":this.signedHeaders()};a.sessionToken&&(e["X-Amz-Security-Token"]=a.sessionToken),this.request.headers["Content-Type"]&&(e["Content-Type"]=this.request.headers["Content-Type"]),this.request.headers["Content-MD5"]&&(e["Content-MD5"]=this.request.headers["Content-MD5"]),this.request.headers["Cache-Control"]&&(e["Cache-Control"]=this.request.headers["Cache-Control"]),d.util.each.call(this,this.request.headers,function(a,b){if(a!==i&&this.isSignableHeader(a)){var c=a.toLowerCase();0===c.indexOf("x-amz-meta-")?e[c]=b:0===c.indexOf("x-amz-")&&(e[a]=b)}});var f=this.request.path.indexOf("?")>=0?"&":"?";this.request.path+=f+d.util.queryParamsToString(e)},authorization:function(a,b){var c=[],d=this.credentialString(b);return c.push(this.algorithm+" Credential="+a.accessKeyId+"/"+d),c.push("SignedHeaders="+this.signedHeaders()),c.push("Signature="+this.signature(a,b)),c.join(", ")},signature:function(a,b){var c=null,e=this.serviceName+(this.getServiceClientId()?"_"+this.getServiceClientId():"");if(this.signatureCache){var c=f[e];c||(g.push(e),g.length>h&&delete f[g.shift()])}var i=b.substr(0,8);if(!c||c.akid!==a.accessKeyId||c.region!==this.request.region||c.date!==i){var j=a.secretAccessKey,k=d.util.crypto.hmac("AWS4"+j,i,"buffer"),l=d.util.crypto.hmac(k,this.request.region,"buffer"),m=d.util.crypto.hmac(l,this.serviceName,"buffer"),n=d.util.crypto.hmac(m,"aws4_request","buffer");if(!this.signatureCache)return d.util.crypto.hmac(n,this.stringToSign(b),"hex");f[e]={region:this.request.region,date:i,key:n,akid:a.accessKeyId}}var o=f[e].key;return d.util.crypto.hmac(o,this.stringToSign(b),"hex")},stringToSign:function(a){var b=[];return b.push("AWS4-HMAC-SHA256"),b.push(a),b.push(this.credentialString(a)),b.push(this.hexEncodedHash(this.canonicalString())),b.join("\n")},canonicalString:function(){var a=[],b=this.request.pathname();return"s3"!==this.serviceName&&(b=d.util.uriEscapePath(b)),a.push(this.request.method),a.push(b),a.push(this.request.search()),a.push(this.canonicalHeaders()+"\n"),a.push(this.signedHeaders()),a.push(this.hexEncodedBodyHash()),a.join("\n")},canonicalHeaders:function(){var a=[];d.util.each.call(this,this.request.headers,function(b,c){a.push([b,c])}),a.sort(function(a,b){return a[0].toLowerCase()<b[0].toLowerCase()?-1:1});var b=[];return d.util.arrayEach.call(this,a,function(a){var c=a[0].toLowerCase();this.isSignableHeader(c)&&b.push(c+":"+this.canonicalHeaderValues(a[1].toString()))}),b.join("\n")},canonicalHeaderValues:function(a){return a.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")},signedHeaders:function(){var a=[];return d.util.each.call(this,this.request.headers,function(b){b=b.toLowerCase(),this.isSignableHeader(b)&&a.push(b)}),a.sort().join(";")},credentialString:function(a){var b=[];return b.push(a.substr(0,8)),b.push(this.request.region),b.push(this.serviceName),b.push("aws4_request"),b.join("/")},hexEncodedHash:function(a){return d.util.crypto.sha256(a,"hex")},hexEncodedBodyHash:function(){return this.isPresigned()&&"s3"===this.serviceName&&!this.request.body?"UNSIGNED-PAYLOAD":this.request.headers["X-Amz-Content-Sha256"]?this.request.headers["X-Amz-Content-Sha256"]:this.hexEncodedHash(this.request.body||"")},unsignableHeaders:["authorization","content-type","content-length","user-agent",i,"expect"],isSignableHeader:function(a){return 0===a.toLowerCase().indexOf("x-amz-")?!0:this.unsignableHeaders.indexOf(a)<0},isPresigned:function(){return!!this.request.headers[i]}}),b.exports=d.Signers.V4},{"../core":11}],52:[function(a,b,c){function d(a,b){this.currentState=b||null,this.states=a||{}}d.prototype.runTo=function(a,b,c,d){"function"==typeof a&&(d=c,c=b,b=a,a=null);var e=this,f=e.states[e.currentState];f.fn.call(c||e,d,function(d){if(d){if(!f.fail)return b?b.call(c,d):null;e.currentState=f.fail}else{if(!f.accept)return b?b.call(c):null;e.currentState=f.accept}return e.currentState===a?b?b.call(c,d):null:void e.runTo(a,b,c,d)})},d.prototype.addState=function(a,b,c,d){return"function"==typeof b?(d=b,b=null,c=null):"function"==typeof c&&(d=c,c=null),this.currentState||(this.currentState=a),this.states[a]={accept:b,fail:c,fn:d},this},b.exports=d},{}],53:[function(a,b,c){(function(c){var d,e={engine:function(){return e.isBrowser()&&"undefined"!=typeof navigator?navigator.userAgent:c.platform+"/"+c.version},userAgent:function(){var b=e.isBrowser()?"js":"nodejs",c="aws-sdk-"+b+"/"+a("./core").VERSION;return"nodejs"===b&&(c+=" "+e.engine()),c},isBrowser:function(){return c&&c.browser},isNode:function(){return!e.isBrowser()},uriEscape:function(a){var b=encodeURIComponent(a);return b=b.replace(/[^A-Za-z0-9_.~\-%]+/g,escape),b=b.replace(/[*]/g,function(a){return"%"+a.charCodeAt(0).toString(16).toUpperCase()})},uriEscapePath:function(a){var b=[];return e.arrayEach(a.split("/"),function(a){b.push(e.uriEscape(a))}),b.join("/")},urlParse:function(a){return e.url.parse(a)},urlFormat:function(a){return e.url.format(a)},queryStringParse:function(a){return e.querystring.parse(a)},queryParamsToString:function(a){var b=[],c=e.uriEscape,d=Object.keys(a).sort();return e.arrayEach(d,function(d){var f=a[d],g=c(d),h=g+"=";if(Array.isArray(f)){var i=[];e.arrayEach(f,function(a){i.push(c(a))}),h=g+"="+i.sort().join("&"+g+"=")}else void 0!==f&&null!==f&&(h=g+"="+c(f));b.push(h)}),b.join("&")},readFileSync:function(b){return e.isBrowser()?null:a("fs").readFileSync(b,"utf-8")},base64:{encode:function(a){return new e.Buffer(a).toString("base64")},decode:function(a){return new e.Buffer(a,"base64")}},buffer:{toStream:function(a){e.Buffer.isBuffer(a)||(a=new e.Buffer(a));var b=new e.stream.Readable,c=0;return b._read=function(d){if(c>=a.length)return b.push(null);var e=c+d;e>a.length&&(e=a.length),b.push(a.slice(c,e)),c=e},b},concat:function(a){var b,c=0,d=0,f=null;for(b=0;b<a.length;b++)c+=a[b].length;for(f=new e.Buffer(c),b=0;b<a.length;b++)a[b].copy(f,d),d+=a[b].length;return f}},string:{byteLength:function(b){if(null===b||void 0===b)return 0;if("string"==typeof b&&(b=new e.Buffer(b)),"number"==typeof b.byteLength)return b.byteLength;if("number"==typeof b.length)return b.length;if("number"==typeof b.size)return b.size;if("string"==typeof b.path)return a("fs").lstatSync(b.path).size;throw e.error(new Error("Cannot determine length of "+b),{object:b})},upperFirst:function(a){return a[0].toUpperCase()+a.substr(1)},lowerFirst:function(a){return a[0].toLowerCase()+a.substr(1)}},ini:{parse:function(a){var b,c={};return e.arrayEach(a.split(/\r?\n/),function(a){a=a.split(/(^|\s)[;#]/)[0];var d=a.match(/^\s*\[([^\[\]]+)\]\s*$/);if(d)b=d[1];else if(b){var e=a.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);e&&(c[b]=c[b]||{},c[b][e[1]]=e[2])}}),c}},fn:{noop:function(){},makeAsync:function(a,b){return b&&b<=a.length?a:function(){var b=Array.prototype.slice.call(arguments,0),c=b.pop(),d=a.apply(null,b);c(d)}}},date:{getDate:function(){return d||(d=a("./core")),d.config.systemClockOffset?new Date((new Date).getTime()+d.config.systemClockOffset):new Date},iso8601:function(a){return void 0===a&&(a=e.date.getDate()),a.toISOString().replace(/\.\d{3}Z$/,"Z")},rfc822:function(a){return void 0===a&&(a=e.date.getDate()),a.toUTCString()},unixTimestamp:function(a){return void 0===a&&(a=e.date.getDate()),a.getTime()/1e3},from:function(a){return"number"==typeof a?new Date(1e3*a):new Date(a)},format:function(a,b){return b||(b="iso8601"),e.date[b](e.date.from(a))},parseTimestamp:function(a){if("number"==typeof a)return new Date(1e3*a);if(a.match(/^\d+$/))return new Date(1e3*a);if(a.match(/^\d{4}/))return new Date(a);if(a.match(/^\w{3},/))return new Date(a);throw e.error(new Error("unhandled timestamp format: "+a),{code:"TimestampParserError"})}},crypto:{crc32Table:[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],crc32:function(a){var b=e.crypto.crc32Table,c=-1;"string"==typeof a&&(a=new e.Buffer(a));for(var d=0;d<a.length;d++){var f=a.readUInt8(d);c=c>>>8^b[255&(c^f)]}return(-1^c)>>>0},hmac:function(a,b,c,d){return c||(c="binary"),"buffer"===c&&(c=void 0),d||(d="sha256"),"string"==typeof b&&(b=new e.Buffer(b)),e.crypto.lib.createHmac(d,a).update(b).digest(c)},md5:function(a,b,c){return e.crypto.hash("md5",a,b,c)},sha256:function(a,b,c){return e.crypto.hash("sha256",a,b,c)},hash:function(a,b,c,d){var f=e.crypto.createHash(a);c||(c="binary"),"buffer"===c&&(c=void 0),"string"==typeof b&&(b=new e.Buffer(b));var g=e.arraySliceFn(b),h=e.Buffer.isBuffer(b);if(e.isBrowser()&&"undefined"!=typeof ArrayBuffer&&b&&b.buffer instanceof ArrayBuffer&&(h=!0),d&&"object"==typeof b&&"function"==typeof b.on&&!h)b.on("data",function(a){f.update(a)}),b.on("error",function(a){d(a)}),b.on("end",function(){d(null,f.digest(c))});else{if(!d||!g||h||"undefined"==typeof FileReader){e.isBrowser()&&"object"==typeof b&&!h&&(b=new e.Buffer(new Uint8Array(b)));var i=f.update(b).digest(c);return d&&d(null,i),i}var j=0,k=524288,l=new FileReader;l.onerror=function(){d(new Error("Failed to read data."))},l.onload=function(){var a=new e.Buffer(new Uint8Array(l.result));f.update(a),j+=a.length,l._continueReading()},l._continueReading=function(){if(j>=b.size)return void d(null,f.digest(c));var a=j+k;a>b.size&&(a=b.size),l.readAsArrayBuffer(g.call(b,j,a))},l._continueReading()}},toHex:function(a){for(var b=[],c=0;c<a.length;c++)b.push(("0"+a.charCodeAt(c).toString(16)).substr(-2,2));return b.join("")},createHash:function(a){return e.crypto.lib.createHash(a)}},abort:{},each:function(a,b){for(var c in a)if(Object.prototype.hasOwnProperty.call(a,c)){var d=b.call(this,c,a[c]);if(d===e.abort)break}},arrayEach:function(a,b){for(var c in a)if(Object.prototype.hasOwnProperty.call(a,c)){var d=b.call(this,a[c],parseInt(c,10));if(d===e.abort)break}},update:function(a,b){return e.each(b,function(b,c){a[b]=c}),a},merge:function(a,b){return e.update(e.copy(a),b)},copy:function(a){if(null===a||void 0===a)return a;var b={};for(var c in a)b[c]=a[c];return b},isEmpty:function(a){for(var b in a)if(Object.prototype.hasOwnProperty.call(a,b))return!1;return!0},arraySliceFn:function(a){var b=a.slice||a.webkitSlice||a.mozSlice;return"function"==typeof b?b:null},isType:function(a,b){return"function"==typeof b&&(b=e.typeName(b)),Object.prototype.toString.call(a)==="[object "+b+"]"},typeName:function(a){if(Object.prototype.hasOwnProperty.call(a,"name"))return a.name;var b=a.toString(),c=b.match(/^\s*function (.+)\(/);return c?c[1]:b},error:function(a,b){var c=null;return"string"==typeof a.message&&""!==a.message&&("string"==typeof b||b&&b.message)&&(c=e.copy(a),c.message=a.message),a.message=a.message||null,"string"==typeof b?a.message=b:"object"==typeof b&&null!==b&&(e.update(a,b),b.message&&(a.message=b.message),(b.code||b.name)&&(a.code=b.code||b.name),b.stack&&(a.stack=b.stack)),"function"==typeof Object.defineProperty&&(Object.defineProperty(a,"name",{writable:!0,enumerable:!1}),Object.defineProperty(a,"message",{enumerable:!0})),a.name=b&&b.name||a.name||a.code||"Error",a.time=new Date,c&&(a.originalError=c),a},inherit:function(a,b){var c=null;if(void 0===b)b=a,a=Object,c={};else{var d=function(){};d.prototype=a.prototype,c=new d}return b.constructor===Object&&(b.constructor=function(){return a!==Object?a.apply(this,arguments):void 0}),b.constructor.prototype=c,e.update(b.constructor.prototype,b),b.constructor.__super__=a,b.constructor},mixin:function(){for(var a=arguments[0],b=1;b<arguments.length;b++)for(var c in arguments[b].prototype){var d=arguments[b].prototype[c];"constructor"!==c&&(a.prototype[c]=d)}return a},hideProperties:function(a,b){"function"==typeof Object.defineProperty&&e.arrayEach(b,function(b){Object.defineProperty(a,b,{enumerable:!1,writable:!0,configurable:!0})})},property:function(a,b,c,d,e){var f={configurable:!0,enumerable:void 0!==d?d:!0};"function"!=typeof c||e?(f.value=c,f.writable=!0):f.get=c,Object.defineProperty(a,b,f)},memoizedProperty:function(a,b,c,d){var f=null;e.property(a,b,function(){return null===f&&(f=c()),f},d)},hoistPayloadMember:function(a){var b=a.request,c=b.operation,d=b.service.api.operations[c].output;if(d.payload){var f=d.members[d.payload],g=a.data[d.payload];"structure"===f.type&&e.each(g,function(b,c){e.property(a.data,b,c,!1)})}},computeSha256:function(b,c){if(e.isNode()){var d=e.stream.Stream,f=a("fs");if(b instanceof d){if("string"!=typeof b.path)return c(new Error("Non-file stream objects are not supported with SigV4"));var g={};"number"==typeof b.start&&(g.start=b.start),"number"==typeof b.end&&(g.end=b.end),b=f.createReadStream(b.path,g)}}e.crypto.sha256(b,"hex",function(a,b){a?c(a):c(null,b)})},isClockSkewed:function(a){return a?(e.property(d.config,"isClockSkewed",Math.abs((new Date).getTime()-a)>=3e5,!1),d.config.isClockSkewed):void 0},applyClockOffset:function(a){a&&(d.config.systemClockOffset=a-(new Date).getTime())},extractRequestId:function(a){var b=a.httpResponse.headers["x-amz-request-id"]||a.httpResponse.headers["x-amzn-requestid"];!b&&a.data&&a.data.ResponseMetadata&&(b=a.data.ResponseMetadata.RequestId),b&&(a.requestId=b),a.error&&(a.error.requestId=b)},addPromisesToRequests:function(a,b){return b=b||null,b||"undefined"==typeof Promise||(b=Promise),"function"!=typeof b?void delete a.prototype.promise:void(a.prototype.promise=function(){var a=this;return new b(function(b,c){a.on("complete",function(a){a.error?c(a.error):b(a.data)}),a.runTo()})})},isDualstackAvailable:function(b){if(!b)return!1;var c=a("../apis/metadata.json");return"string"!=typeof b&&(b=b.serviceIdentifier),"string"==typeof b&&c.hasOwnProperty(b)?!!c[b].dualstackAvailable:!1},calculateRetryDelay:function(a,b){b||(b={});var c=b.customBackoff||null;if("function"==typeof c)return c(a);var d=b.base||100,e=Math.random()*(Math.pow(2,a)*d);return e},handleRequestWithRetries:function(a,b,f){b||(b={});var g=d.HttpClient.getInstance(),h=b.httpOptions||{},i=0,j=function(a){var c=b.maxRetries||0;if(a&&"TimeoutError"===a.code&&(a.retryable=!0),a&&a.retryable&&c>i){i++;var d=e.calculateRetryDelay(i,b.retryDelayOptions);setTimeout(k,d+(a.retryAfter||0))}else f(a)},k=function(){var b="";g.handleRequest(a,h,function(a){a.on("data",function(a){b+=a.toString()}),a.on("end",function(){var c=a.statusCode;if(300>c)f(null,b);else{var d=1e3*parseInt(a.headers["retry-after"],10)||0,g=e.error(new Error,{retryable:c>=500||429===c});d&&g.retryable&&(g.retryAfter=d),j(g)}})},j)};c.nextTick(k)}};b.exports=e}).call(this,a("FWaASH"))},{"../apis/metadata.json":3,"./core":11,FWaASH:62,fs:56}],54:[function(a,b,c){function d(){}function e(a,b){switch(b||(b={}),b.type){case"structure":return f(a,b);case"map":return g(a,b);case"list":return h(a,b);case void 0:case null:return j(a);default:return i(a,b)}}function f(a,b){var c={};return null===a?c:(k.each(b.members,function(b,d){if(d.isXmlAttribute){if(Object.prototype.hasOwnProperty.call(a.attributes,d.name)){var f=a.attributes[d.name].value;c[b]=e({textContent:f},d)}}else{var g=d.flattened?a:a.getElementsByTagName(d.name)[0];g?c[b]=e(g,d):d.flattened||"list"!==d.type||(c[b]=d.defaultValue)}}),c)}function g(a,b){for(var c={},d=b.key.name||"key",f=b.value.name||"value",g=b.flattened?b.name:"entry",h=a.firstElementChild;h;){if(h.nodeName===g){var i=h.getElementsByTagName(d)[0].textContent,j=h.getElementsByTagName(f)[0];c[i]=e(j,b.value)}h=h.nextElementSibling}return c}function h(a,b){for(var c=[],d=b.flattened?b.name:b.member.name||"member",f=a.firstElementChild;f;)f.nodeName===d&&c.push(e(f,b.member)),f=f.nextElementSibling;return c}function i(a,b){if(a.getAttribute){var c=a.getAttribute("encoding");"base64"===c&&(b=new l.create({type:c}))}var d=a.textContent;return""===d&&(d=null),"function"==typeof b.toType?b.toType(d):d}function j(a){if(void 0===a||null===a)return"";if(!a.firstElementChild)return null===a.parentNode.parentNode?{}:0===a.childNodes.length?"":a.textContent;for(var b={type:"structure",members:{}},c=a.firstElementChild;c;){var d=c.nodeName;Object.prototype.hasOwnProperty.call(b.members,d)?b.members[d].type="list":b.members[d]={name:d},c=c.nextElementSibling}return f(a,b)}var k=a("../util"),l=a("../model/shape");d.prototype.parse=function(a,b){if(""===a.replace(/^\s+/,""))return{};var c,d;try{if(window.DOMParser){try{var f=new DOMParser;c=f.parseFromString(a,"text/xml")}catch(g){throw k.error(new Error("Parse error in document"),{originalError:g,code:"XMLParserError",retryable:!0})}if(null===c.documentElement)throw k.error(new Error("Cannot parse empty document."),{code:"XMLParserError",retryable:!0});var h=c.getElementsByTagName("parsererror")[0];if(h&&(h.parentNode===c||"body"===h.parentNode.nodeName||h.parentNode.parentNode===c||"body"===h.parentNode.parentNode.nodeName)){var i=h.getElementsByTagName("div")[0]||h;throw k.error(new Error(i.textContent||"Parser error in document"),{code:"XMLParserError",retryable:!0})}}else{if(!window.ActiveXObject)throw new Error("Cannot load XML parser");if(c=new window.ActiveXObject("Microsoft.XMLDOM"),c.async=!1,!c.loadXML(a))throw k.error(new Error("Parse error in document"),{code:"XMLParserError",retryable:!0})}}catch(j){d=j}if(c&&c.documentElement&&!d){var l=e(c.documentElement,b),m=c.getElementsByTagName("ResponseMetadata")[0];return m&&(l.ResponseMetadata=e(m,{})),l}if(d)throw k.error(d||new Error,{code:"XMLParserError",retryable:!0});return{}},b.exports=d},{"../model/shape":28,"../util":53}],55:[function(a,b,c){function d(){}function e(a,b,c){switch(c.type){case"structure":return f(a,b,c);case"map":return g(a,b,c);case"list":return h(a,b,c);default:return i(a,b,c)}}function f(a,b,c){k.arrayEach(c.memberNames,function(d){var f=c.members[d];if("body"===f.location){var g=b[d],h=f.name;if(void 0!==g&&null!==g)if(f.isXmlAttribute)a.att(h,g);else if(f.flattened)e(a,g,f);else{var i=a.ele(h);j(i,f),e(i,g,f)}}})}function g(a,b,c){var d=c.key.name||"key",f=c.value.name||"value";k.each(b,function(b,g){var h=a.ele(c.flattened?c.name:"entry");e(h.ele(d),b,c.key),e(h.ele(f),g,c.value)})}function h(a,b,c){c.flattened?k.arrayEach(b,function(b){var d=c.member.name||c.name,f=a.ele(d);e(f,b,c.member)}):k.arrayEach(b,function(b){var d=c.member.name||"member",f=a.ele(d);e(f,b,c.member)})}function i(a,b,c){a.txt(c.toWireFormat(b))}function j(a,b){var c,d="xmlns";b.xmlNamespaceUri?(c=b.xmlNamespaceUri,b.xmlNamespacePrefix&&(d+=":"+b.xmlNamespacePrefix)):a.isRoot&&b.api.xmlNamespaceUri&&(c=b.api.xmlNamespaceUri),c&&a.att(d,c)}var k=a("../util"),l=a("xmlbuilder");d.prototype.toXML=function(a,b,c,d){var f=l.create(c);return j(f,b),e(f,a,b),f.children.length>0||d?f.root().toString():""},b.exports=d},{"../util":53,xmlbuilder:100}],56:[function(a,b,c){},{}],57:[function(a,b,c){function d(a,b,c){if(!(this instanceof d))return new d(a,b,c);var e=typeof a;if("base64"===b&&"string"===e)for(a=C(a);a.length%4!==0;)a+="=";var f;if("number"===e)f=E(a);else if("string"===e)f=d.byteLength(a,b);else{if("object"!==e)throw new Error("First argument needs to be a number, array or string.");f=E(a.length)}var g;d._useTypedArrays?g=d._augment(new Uint8Array(f)):(g=this,g.length=f,g._isBuffer=!0);var h;if(d._useTypedArrays&&"number"==typeof a.byteLength)g._set(a);else if(G(a))for(h=0;f>h;h++)d.isBuffer(a)?g[h]=a.readUInt8(h):g[h]=a[h];else if("string"===e)g.write(a,0,b);else if("number"===e&&!d._useTypedArrays&&!c)for(h=0;f>h;h++)g[h]=0;return g}function e(a,b,c,e){c=Number(c)||0;var f=a.length-c;e?(e=Number(e),e>f&&(e=f)):e=f;var g=b.length;R(g%2===0,"Invalid hex string"),e>g/2&&(e=g/2);for(var h=0;e>h;h++){var i=parseInt(b.substr(2*h,2),16);R(!isNaN(i),"Invalid hex string"),a[c+h]=i}return d._charsWritten=2*h,h}function f(a,b,c,e){var f=d._charsWritten=M(I(b),a,c,e);return f}function g(a,b,c,e){var f=d._charsWritten=M(J(b),a,c,e);return f}function h(a,b,c,d){return g(a,b,c,d)}function i(a,b,c,e){var f=d._charsWritten=M(L(b),a,c,e);return f}function j(a,b,c,e){var f=d._charsWritten=M(K(b),a,c,e);return f}function k(a,b,c){return 0===b&&c===a.length?S.fromByteArray(a):S.fromByteArray(a.slice(b,c))}function l(a,b,c){var d="",e="";c=Math.min(a.length,c);for(var f=b;c>f;f++)a[f]<=127?(d+=N(e)+String.fromCharCode(a[f]),e=""):e+="%"+a[f].toString(16);return d+N(e)}function m(a,b,c){var d="";c=Math.min(a.length,c);for(var e=b;c>e;e++)d+=String.fromCharCode(a[e]);return d}function n(a,b,c){return m(a,b,c)}function o(a,b,c){var d=a.length;(!b||0>b)&&(b=0),(!c||0>c||c>d)&&(c=d);for(var e="",f=b;c>f;f++)e+=H(a[f]);return e}function p(a,b,c){for(var d=a.slice(b,c),e="",f=0;f<d.length;f+=2)e+=String.fromCharCode(d[f]+256*d[f+1]);return e}function q(a,b,c,d){d||(R("boolean"==typeof c,"missing or invalid endian"),R(void 0!==b&&null!==b,"missing offset"),R(b+1<a.length,"Trying to read beyond buffer length"));
var e=a.length;if(!(b>=e)){var f;return c?(f=a[b],e>b+1&&(f|=a[b+1]<<8)):(f=a[b]<<8,e>b+1&&(f|=a[b+1])),f}}function r(a,b,c,d){d||(R("boolean"==typeof c,"missing or invalid endian"),R(void 0!==b&&null!==b,"missing offset"),R(b+3<a.length,"Trying to read beyond buffer length"));var e=a.length;if(!(b>=e)){var f;return c?(e>b+2&&(f=a[b+2]<<16),e>b+1&&(f|=a[b+1]<<8),f|=a[b],e>b+3&&(f+=a[b+3]<<24>>>0)):(e>b+1&&(f=a[b+1]<<16),e>b+2&&(f|=a[b+2]<<8),e>b+3&&(f|=a[b+3]),f+=a[b]<<24>>>0),f}}function s(a,b,c,d){d||(R("boolean"==typeof c,"missing or invalid endian"),R(void 0!==b&&null!==b,"missing offset"),R(b+1<a.length,"Trying to read beyond buffer length"));var e=a.length;if(!(b>=e)){var f=q(a,b,c,!0),g=32768&f;return g?-1*(65535-f+1):f}}function t(a,b,c,d){d||(R("boolean"==typeof c,"missing or invalid endian"),R(void 0!==b&&null!==b,"missing offset"),R(b+3<a.length,"Trying to read beyond buffer length"));var e=a.length;if(!(b>=e)){var f=r(a,b,c,!0),g=2147483648&f;return g?-1*(4294967295-f+1):f}}function u(a,b,c,d){return d||(R("boolean"==typeof c,"missing or invalid endian"),R(b+3<a.length,"Trying to read beyond buffer length")),T.read(a,b,c,23,4)}function v(a,b,c,d){return d||(R("boolean"==typeof c,"missing or invalid endian"),R(b+7<a.length,"Trying to read beyond buffer length")),T.read(a,b,c,52,8)}function w(a,b,c,d,e){e||(R(void 0!==b&&null!==b,"missing value"),R("boolean"==typeof d,"missing or invalid endian"),R(void 0!==c&&null!==c,"missing offset"),R(c+1<a.length,"trying to write beyond buffer length"),O(b,65535));var f=a.length;if(!(c>=f))for(var g=0,h=Math.min(f-c,2);h>g;g++)a[c+g]=(b&255<<8*(d?g:1-g))>>>8*(d?g:1-g)}function x(a,b,c,d,e){e||(R(void 0!==b&&null!==b,"missing value"),R("boolean"==typeof d,"missing or invalid endian"),R(void 0!==c&&null!==c,"missing offset"),R(c+3<a.length,"trying to write beyond buffer length"),O(b,4294967295));var f=a.length;if(!(c>=f))for(var g=0,h=Math.min(f-c,4);h>g;g++)a[c+g]=b>>>8*(d?g:3-g)&255}function y(a,b,c,d,e){e||(R(void 0!==b&&null!==b,"missing value"),R("boolean"==typeof d,"missing or invalid endian"),R(void 0!==c&&null!==c,"missing offset"),R(c+1<a.length,"Trying to write beyond buffer length"),P(b,32767,-32768));var f=a.length;c>=f||(b>=0?w(a,b,c,d,e):w(a,65535+b+1,c,d,e))}function z(a,b,c,d,e){e||(R(void 0!==b&&null!==b,"missing value"),R("boolean"==typeof d,"missing or invalid endian"),R(void 0!==c&&null!==c,"missing offset"),R(c+3<a.length,"Trying to write beyond buffer length"),P(b,2147483647,-2147483648));var f=a.length;c>=f||(b>=0?x(a,b,c,d,e):x(a,4294967295+b+1,c,d,e))}function A(a,b,c,d,e){e||(R(void 0!==b&&null!==b,"missing value"),R("boolean"==typeof d,"missing or invalid endian"),R(void 0!==c&&null!==c,"missing offset"),R(c+3<a.length,"Trying to write beyond buffer length"),Q(b,3.4028234663852886e38,-3.4028234663852886e38));var f=a.length;c>=f||T.write(a,b,c,d,23,4)}function B(a,b,c,d,e){e||(R(void 0!==b&&null!==b,"missing value"),R("boolean"==typeof d,"missing or invalid endian"),R(void 0!==c&&null!==c,"missing offset"),R(c+7<a.length,"Trying to write beyond buffer length"),Q(b,1.7976931348623157e308,-1.7976931348623157e308));var f=a.length;c>=f||T.write(a,b,c,d,52,8)}function C(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")}function D(a,b,c){return"number"!=typeof a?c:(a=~~a,a>=b?b:a>=0?a:(a+=b,a>=0?a:0))}function E(a){return a=~~Math.ceil(+a),0>a?0:a}function F(a){return(Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)})(a)}function G(a){return F(a)||d.isBuffer(a)||a&&"object"==typeof a&&"number"==typeof a.length}function H(a){return 16>a?"0"+a.toString(16):a.toString(16)}function I(a){for(var b=[],c=0;c<a.length;c++){var d=a.charCodeAt(c);if(127>=d)b.push(a.charCodeAt(c));else{var e=c;d>=55296&&57343>=d&&c++;for(var f=encodeURIComponent(a.slice(e,c+1)).substr(1).split("%"),g=0;g<f.length;g++)b.push(parseInt(f[g],16))}}return b}function J(a){for(var b=[],c=0;c<a.length;c++)b.push(255&a.charCodeAt(c));return b}function K(a){for(var b,c,d,e=[],f=0;f<a.length;f++)b=a.charCodeAt(f),c=b>>8,d=b%256,e.push(d),e.push(c);return e}function L(a){return S.toByteArray(a)}function M(a,b,c,d){for(var e=0;d>e&&!(e+c>=b.length||e>=a.length);e++)b[e+c]=a[e];return e}function N(a){try{return decodeURIComponent(a)}catch(b){return String.fromCharCode(65533)}}function O(a,b){R("number"==typeof a,"cannot write a non-number as a number"),R(a>=0,"specified a negative value for writing an unsigned value"),R(b>=a,"value is larger than maximum value for type"),R(Math.floor(a)===a,"value has a fractional component")}function P(a,b,c){R("number"==typeof a,"cannot write a non-number as a number"),R(b>=a,"value larger than maximum allowed value"),R(a>=c,"value smaller than minimum allowed value"),R(Math.floor(a)===a,"value has a fractional component")}function Q(a,b,c){R("number"==typeof a,"cannot write a non-number as a number"),R(b>=a,"value larger than maximum allowed value"),R(a>=c,"value smaller than minimum allowed value")}function R(a,b){if(!a)throw new Error(b||"Failed assertion")}var S=a("base64-js"),T=a("ieee754");c.Buffer=d,c.SlowBuffer=d,c.INSPECT_MAX_BYTES=50,d.poolSize=8192,d._useTypedArrays=function(){try{var a=new ArrayBuffer(0),b=new Uint8Array(a);return b.foo=function(){return 42},42===b.foo()&&"function"==typeof b.subarray}catch(c){return!1}}(),d.isEncoding=function(a){switch(String(a).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},d.isBuffer=function(a){return!(null===a||void 0===a||!a._isBuffer)},d.byteLength=function(a,b){var c;switch(a+="",b||"utf8"){case"hex":c=a.length/2;break;case"utf8":case"utf-8":c=I(a).length;break;case"ascii":case"binary":case"raw":c=a.length;break;case"base64":c=L(a).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":c=2*a.length;break;default:throw new Error("Unknown encoding")}return c},d.concat=function(a,b){if(R(F(a),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===a.length)return new d(0);if(1===a.length)return a[0];var c;if("number"!=typeof b)for(b=0,c=0;c<a.length;c++)b+=a[c].length;var e=new d(b),f=0;for(c=0;c<a.length;c++){var g=a[c];g.copy(e,f),f+=g.length}return e},d.prototype.write=function(a,b,c,d){if(isFinite(b))isFinite(c)||(d=c,c=void 0);else{var k=d;d=b,b=c,c=k}b=Number(b)||0;var l=this.length-b;c?(c=Number(c),c>l&&(c=l)):c=l,d=String(d||"utf8").toLowerCase();var m;switch(d){case"hex":m=e(this,a,b,c);break;case"utf8":case"utf-8":m=f(this,a,b,c);break;case"ascii":m=g(this,a,b,c);break;case"binary":m=h(this,a,b,c);break;case"base64":m=i(this,a,b,c);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":m=j(this,a,b,c);break;default:throw new Error("Unknown encoding")}return m},d.prototype.toString=function(a,b,c){var d=this;if(a=String(a||"utf8").toLowerCase(),b=Number(b)||0,c=void 0!==c?Number(c):c=d.length,c===b)return"";var e;switch(a){case"hex":e=o(d,b,c);break;case"utf8":case"utf-8":e=l(d,b,c);break;case"ascii":e=m(d,b,c);break;case"binary":e=n(d,b,c);break;case"base64":e=k(d,b,c);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":e=p(d,b,c);break;default:throw new Error("Unknown encoding")}return e},d.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},d.prototype.copy=function(a,b,c,e){var f=this;if(c||(c=0),e||0===e||(e=this.length),b||(b=0),e!==c&&0!==a.length&&0!==f.length){R(e>=c,"sourceEnd < sourceStart"),R(b>=0&&b<a.length,"targetStart out of bounds"),R(c>=0&&c<f.length,"sourceStart out of bounds"),R(e>=0&&e<=f.length,"sourceEnd out of bounds"),e>this.length&&(e=this.length),a.length-b<e-c&&(e=a.length-b+c);var g=e-c;if(100>g||!d._useTypedArrays)for(var h=0;g>h;h++)a[h+b]=this[h+c];else a._set(this.subarray(c,c+g),b)}},d.prototype.slice=function(a,b){var c=this.length;if(a=D(a,c,0),b=D(b,c,c),d._useTypedArrays)return d._augment(this.subarray(a,b));for(var e=b-a,f=new d(e,void 0,!0),g=0;e>g;g++)f[g]=this[g+a];return f},d.prototype.get=function(a){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(a)},d.prototype.set=function(a,b){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(a,b)},d.prototype.readUInt8=function(a,b){return b||(R(void 0!==a&&null!==a,"missing offset"),R(a<this.length,"Trying to read beyond buffer length")),a>=this.length?void 0:this[a]},d.prototype.readUInt16LE=function(a,b){return q(this,a,!0,b)},d.prototype.readUInt16BE=function(a,b){return q(this,a,!1,b)},d.prototype.readUInt32LE=function(a,b){return r(this,a,!0,b)},d.prototype.readUInt32BE=function(a,b){return r(this,a,!1,b)},d.prototype.readInt8=function(a,b){if(b||(R(void 0!==a&&null!==a,"missing offset"),R(a<this.length,"Trying to read beyond buffer length")),!(a>=this.length)){var c=128&this[a];return c?-1*(255-this[a]+1):this[a]}},d.prototype.readInt16LE=function(a,b){return s(this,a,!0,b)},d.prototype.readInt16BE=function(a,b){return s(this,a,!1,b)},d.prototype.readInt32LE=function(a,b){return t(this,a,!0,b)},d.prototype.readInt32BE=function(a,b){return t(this,a,!1,b)},d.prototype.readFloatLE=function(a,b){return u(this,a,!0,b)},d.prototype.readFloatBE=function(a,b){return u(this,a,!1,b)},d.prototype.readDoubleLE=function(a,b){return v(this,a,!0,b)},d.prototype.readDoubleBE=function(a,b){return v(this,a,!1,b)},d.prototype.writeUInt8=function(a,b,c){c||(R(void 0!==a&&null!==a,"missing value"),R(void 0!==b&&null!==b,"missing offset"),R(b<this.length,"trying to write beyond buffer length"),O(a,255)),b>=this.length||(this[b]=a)},d.prototype.writeUInt16LE=function(a,b,c){w(this,a,b,!0,c)},d.prototype.writeUInt16BE=function(a,b,c){w(this,a,b,!1,c)},d.prototype.writeUInt32LE=function(a,b,c){x(this,a,b,!0,c)},d.prototype.writeUInt32BE=function(a,b,c){x(this,a,b,!1,c)},d.prototype.writeInt8=function(a,b,c){c||(R(void 0!==a&&null!==a,"missing value"),R(void 0!==b&&null!==b,"missing offset"),R(b<this.length,"Trying to write beyond buffer length"),P(a,127,-128)),b>=this.length||(a>=0?this.writeUInt8(a,b,c):this.writeUInt8(255+a+1,b,c))},d.prototype.writeInt16LE=function(a,b,c){y(this,a,b,!0,c)},d.prototype.writeInt16BE=function(a,b,c){y(this,a,b,!1,c)},d.prototype.writeInt32LE=function(a,b,c){z(this,a,b,!0,c)},d.prototype.writeInt32BE=function(a,b,c){z(this,a,b,!1,c)},d.prototype.writeFloatLE=function(a,b,c){A(this,a,b,!0,c)},d.prototype.writeFloatBE=function(a,b,c){A(this,a,b,!1,c)},d.prototype.writeDoubleLE=function(a,b,c){B(this,a,b,!0,c)},d.prototype.writeDoubleBE=function(a,b,c){B(this,a,b,!1,c)},d.prototype.fill=function(a,b,c){if(a||(a=0),b||(b=0),c||(c=this.length),"string"==typeof a&&(a=a.charCodeAt(0)),R("number"==typeof a&&!isNaN(a),"value is not a number"),R(c>=b,"end < start"),c!==b&&0!==this.length){R(b>=0&&b<this.length,"start out of bounds"),R(c>=0&&c<=this.length,"end out of bounds");for(var d=b;c>d;d++)this[d]=a}},d.prototype.inspect=function(){for(var a=[],b=this.length,d=0;b>d;d++)if(a[d]=H(this[d]),d===c.INSPECT_MAX_BYTES){a[d+1]="...";break}return"<Buffer "+a.join(" ")+">"},d.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(d._useTypedArrays)return new d(this).buffer;for(var a=new Uint8Array(this.length),b=0,c=a.length;c>b;b+=1)a[b]=this[b];return a.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var U=d.prototype;d._augment=function(a){return a._isBuffer=!0,a._get=a.get,a._set=a.set,a.get=U.get,a.set=U.set,a.write=U.write,a.toString=U.toString,a.toLocaleString=U.toString,a.toJSON=U.toJSON,a.copy=U.copy,a.slice=U.slice,a.readUInt8=U.readUInt8,a.readUInt16LE=U.readUInt16LE,a.readUInt16BE=U.readUInt16BE,a.readUInt32LE=U.readUInt32LE,a.readUInt32BE=U.readUInt32BE,a.readInt8=U.readInt8,a.readInt16LE=U.readInt16LE,a.readInt16BE=U.readInt16BE,a.readInt32LE=U.readInt32LE,a.readInt32BE=U.readInt32BE,a.readFloatLE=U.readFloatLE,a.readFloatBE=U.readFloatBE,a.readDoubleLE=U.readDoubleLE,a.readDoubleBE=U.readDoubleBE,a.writeUInt8=U.writeUInt8,a.writeUInt16LE=U.writeUInt16LE,a.writeUInt16BE=U.writeUInt16BE,a.writeUInt32LE=U.writeUInt32LE,a.writeUInt32BE=U.writeUInt32BE,a.writeInt8=U.writeInt8,a.writeInt16LE=U.writeInt16LE,a.writeInt16BE=U.writeInt16BE,a.writeInt32LE=U.writeInt32LE,a.writeInt32BE=U.writeInt32BE,a.writeFloatLE=U.writeFloatLE,a.writeFloatBE=U.writeFloatBE,a.writeDoubleLE=U.writeDoubleLE,a.writeDoubleBE=U.writeDoubleBE,a.fill=U.fill,a.inspect=U.inspect,a.toArrayBuffer=U.toArrayBuffer,a}},{"base64-js":58,ieee754:59}],58:[function(a,b,c){var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(a){"use strict";function b(a){var b=a.charCodeAt(0);return b===g||b===l?62:b===h||b===m?63:i>b?-1:i+10>b?b-i+26+26:k+26>b?b-k:j+26>b?b-j+26:void 0}function c(a){function c(a){j[l++]=a}var d,e,g,h,i,j;if(a.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var k=a.length;i="="===a.charAt(k-2)?2:"="===a.charAt(k-1)?1:0,j=new f(3*a.length/4-i),g=i>0?a.length-4:a.length;var l=0;for(d=0,e=0;g>d;d+=4,e+=3)h=b(a.charAt(d))<<18|b(a.charAt(d+1))<<12|b(a.charAt(d+2))<<6|b(a.charAt(d+3)),c((16711680&h)>>16),c((65280&h)>>8),c(255&h);return 2===i?(h=b(a.charAt(d))<<2|b(a.charAt(d+1))>>4,c(255&h)):1===i&&(h=b(a.charAt(d))<<10|b(a.charAt(d+1))<<4|b(a.charAt(d+2))>>2,c(h>>8&255),c(255&h)),j}function e(a){function b(a){return d.charAt(a)}function c(a){return b(a>>18&63)+b(a>>12&63)+b(a>>6&63)+b(63&a)}var e,f,g,h=a.length%3,i="";for(e=0,g=a.length-h;g>e;e+=3)f=(a[e]<<16)+(a[e+1]<<8)+a[e+2],i+=c(f);switch(h){case 1:f=a[a.length-1],i+=b(f>>2),i+=b(f<<4&63),i+="==";break;case 2:f=(a[a.length-2]<<8)+a[a.length-1],i+=b(f>>10),i+=b(f>>4&63),i+=b(f<<2&63),i+="="}return i}var f="undefined"!=typeof Uint8Array?Uint8Array:Array,g="+".charCodeAt(0),h="/".charCodeAt(0),i="0".charCodeAt(0),j="a".charCodeAt(0),k="A".charCodeAt(0),l="-".charCodeAt(0),m="_".charCodeAt(0);a.toByteArray=c,a.fromByteArray=e}("undefined"==typeof c?this.base64js={}:c)},{}],59:[function(a,b,c){c.read=function(a,b,c,d,e){var f,g,h=8*e-d-1,i=(1<<h)-1,j=i>>1,k=-7,l=c?e-1:0,m=c?-1:1,n=a[b+l];for(l+=m,f=n&(1<<-k)-1,n>>=-k,k+=h;k>0;f=256*f+a[b+l],l+=m,k-=8);for(g=f&(1<<-k)-1,f>>=-k,k+=d;k>0;g=256*g+a[b+l],l+=m,k-=8);if(0===f)f=1-j;else{if(f===i)return g?NaN:(n?-1:1)*(1/0);g+=Math.pow(2,d),f-=j}return(n?-1:1)*g*Math.pow(2,f-d)},c.write=function(a,b,c,d,e,f){var g,h,i,j=8*f-e-1,k=(1<<j)-1,l=k>>1,m=23===e?Math.pow(2,-24)-Math.pow(2,-77):0,n=d?0:f-1,o=d?1:-1,p=0>b||0===b&&0>1/b?1:0;for(b=Math.abs(b),isNaN(b)||b===1/0?(h=isNaN(b)?1:0,g=k):(g=Math.floor(Math.log(b)/Math.LN2),b*(i=Math.pow(2,-g))<1&&(g--,i*=2),b+=g+l>=1?m/i:m*Math.pow(2,1-l),b*i>=2&&(g++,i/=2),g+l>=k?(h=0,g=k):g+l>=1?(h=(b*i-1)*Math.pow(2,e),g+=l):(h=b*Math.pow(2,l-1)*Math.pow(2,e),g=0));e>=8;a[c+n]=255&h,n+=o,h/=256,e-=8);for(g=g<<e|h,j+=e;j>0;a[c+n]=255&g,n+=o,g/=256,j-=8);a[c+n-o]|=128*p}},{}],60:[function(a,b,c){function d(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function e(a){return"function"==typeof a}function f(a){return"number"==typeof a}function g(a){return"object"==typeof a&&null!==a}function h(a){return void 0===a}b.exports=d,d.EventEmitter=d,d.prototype._events=void 0,d.prototype._maxListeners=void 0,d.defaultMaxListeners=10,d.prototype.setMaxListeners=function(a){if(!f(a)||0>a||isNaN(a))throw TypeError("n must be a positive number");return this._maxListeners=a,this},d.prototype.emit=function(a){var b,c,d,f,i,j;if(this._events||(this._events={}),"error"===a&&(!this._events.error||g(this._events.error)&&!this._events.error.length)){if(b=arguments[1],b instanceof Error)throw b;throw TypeError('Uncaught, unspecified "error" event.')}if(c=this._events[a],h(c))return!1;if(e(c))switch(arguments.length){case 1:c.call(this);break;case 2:c.call(this,arguments[1]);break;case 3:c.call(this,arguments[1],arguments[2]);break;default:for(d=arguments.length,f=new Array(d-1),i=1;d>i;i++)f[i-1]=arguments[i];c.apply(this,f)}else if(g(c)){for(d=arguments.length,f=new Array(d-1),i=1;d>i;i++)f[i-1]=arguments[i];for(j=c.slice(),d=j.length,i=0;d>i;i++)j[i].apply(this,f)}return!0},d.prototype.addListener=function(a,b){var c;if(!e(b))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",a,e(b.listener)?b.listener:b),this._events[a]?g(this._events[a])?this._events[a].push(b):this._events[a]=[this._events[a],b]:this._events[a]=b,g(this._events[a])&&!this._events[a].warned){var c;c=h(this._maxListeners)?d.defaultMaxListeners:this._maxListeners,c&&c>0&&this._events[a].length>c&&(this._events[a].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[a].length),"function"==typeof console.trace&&console.trace())}return this},d.prototype.on=d.prototype.addListener,d.prototype.once=function(a,b){function c(){this.removeListener(a,c),d||(d=!0,b.apply(this,arguments))}if(!e(b))throw TypeError("listener must be a function");var d=!1;return c.listener=b,this.on(a,c),this},d.prototype.removeListener=function(a,b){var c,d,f,h;if(!e(b))throw TypeError("listener must be a function");if(!this._events||!this._events[a])return this;if(c=this._events[a],f=c.length,d=-1,c===b||e(c.listener)&&c.listener===b)delete this._events[a],this._events.removeListener&&this.emit("removeListener",a,b);else if(g(c)){for(h=f;h-- >0;)if(c[h]===b||c[h].listener&&c[h].listener===b){d=h;break}if(0>d)return this;1===c.length?(c.length=0,delete this._events[a]):c.splice(d,1),this._events.removeListener&&this.emit("removeListener",a,b)}return this},d.prototype.removeAllListeners=function(a){var b,c;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[a]&&delete this._events[a],this;if(0===arguments.length){for(b in this._events)"removeListener"!==b&&this.removeAllListeners(b);return this.removeAllListeners("removeListener"),this._events={},this}if(c=this._events[a],e(c))this.removeListener(a,c);else for(;c.length;)this.removeListener(a,c[c.length-1]);return delete this._events[a],this},d.prototype.listeners=function(a){var b;return b=this._events&&this._events[a]?e(this._events[a])?[this._events[a]]:this._events[a].slice():[]},d.listenerCount=function(a,b){var c;return c=a._events&&a._events[b]?e(a._events[b])?1:a._events[b].length:0}},{}],61:[function(a,b,c){"function"==typeof Object.create?b.exports=function(a,b){a.super_=b,a.prototype=Object.create(b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}})}:b.exports=function(a,b){a.super_=b;var c=function(){};c.prototype=b.prototype,a.prototype=new c,a.prototype.constructor=a}},{}],62:[function(a,b,c){function d(){}var e=b.exports={};e.nextTick=function(){var a="undefined"!=typeof window&&window.setImmediate,b="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(a)return function(a){return window.setImmediate(a)};if(b){var c=[];return window.addEventListener("message",function(a){var b=a.source;if((b===window||null===b)&&"process-tick"===a.data&&(a.stopPropagation(),c.length>0)){var d=c.shift();d()}},!0),function(a){c.push(a),window.postMessage("process-tick","*")}}return function(a){setTimeout(a,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=d,e.addListener=d,e.once=d,e.off=d,e.removeListener=d,e.removeAllListeners=d,e.emit=d,e.binding=function(a){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(a){throw new Error("process.chdir is not supported")}},{}],63:[function(a,b,c){(function(a){!function(d){function e(a){throw RangeError(H[a])}function f(a,b){for(var c=a.length;c--;)a[c]=b(a[c]);return a}function g(a,b){return f(a.split(G),b).join(".")}function h(a){for(var b,c,d=[],e=0,f=a.length;f>e;)b=a.charCodeAt(e++),b>=55296&&56319>=b&&f>e?(c=a.charCodeAt(e++),56320==(64512&c)?d.push(((1023&b)<<10)+(1023&c)+65536):(d.push(b),e--)):d.push(b);return d}function i(a){return f(a,function(a){var b="";return a>65535&&(a-=65536,b+=K(a>>>10&1023|55296),a=56320|1023&a),b+=K(a)}).join("")}function j(a){return 10>a-48?a-22:26>a-65?a-65:26>a-97?a-97:w}function k(a,b){return a+22+75*(26>a)-((0!=b)<<5)}function l(a,b,c){var d=0;for(a=c?J(a/A):a>>1,a+=J(a/b);a>I*y>>1;d+=w)a=J(a/I);return J(d+(I+1)*a/(a+z))}function m(a){var b,c,d,f,g,h,k,m,n,o,p=[],q=a.length,r=0,s=C,t=B;for(c=a.lastIndexOf(D),0>c&&(c=0),d=0;c>d;++d)a.charCodeAt(d)>=128&&e("not-basic"),p.push(a.charCodeAt(d));for(f=c>0?c+1:0;q>f;){for(g=r,h=1,k=w;f>=q&&e("invalid-input"),m=j(a.charCodeAt(f++)),(m>=w||m>J((v-r)/h))&&e("overflow"),r+=m*h,n=t>=k?x:k>=t+y?y:k-t,!(n>m);k+=w)o=w-n,h>J(v/o)&&e("overflow"),h*=o;b=p.length+1,t=l(r-g,b,0==g),J(r/b)>v-s&&e("overflow"),s+=J(r/b),r%=b,p.splice(r++,0,s)}return i(p)}function n(a){var b,c,d,f,g,i,j,m,n,o,p,q,r,s,t,u=[];for(a=h(a),q=a.length,b=C,c=0,g=B,i=0;q>i;++i)p=a[i],128>p&&u.push(K(p));for(d=f=u.length,f&&u.push(D);q>d;){for(j=v,i=0;q>i;++i)p=a[i],p>=b&&j>p&&(j=p);for(r=d+1,j-b>J((v-c)/r)&&e("overflow"),c+=(j-b)*r,b=j,i=0;q>i;++i)if(p=a[i],b>p&&++c>v&&e("overflow"),p==b){for(m=c,n=w;o=g>=n?x:n>=g+y?y:n-g,!(o>m);n+=w)t=m-o,s=w-o,u.push(K(k(o+t%s,0))),m=J(t/s);u.push(K(k(m,0))),g=l(c,r,d==f),c=0,++d}++c,++b}return u.join("")}function o(a){return g(a,function(a){return E.test(a)?m(a.slice(4).toLowerCase()):a})}function p(a){return g(a,function(a){return F.test(a)?"xn--"+n(a):a})}var q="object"==typeof c&&c,r="object"==typeof b&&b&&b.exports==q&&b,s="object"==typeof a&&a;s.global!==s&&s.window!==s||(d=s);var t,u,v=2147483647,w=36,x=1,y=26,z=38,A=700,B=72,C=128,D="-",E=/^xn--/,F=/[^ -~]/,G=/\x2E|\u3002|\uFF0E|\uFF61/g,H={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},I=w-x,J=Math.floor,K=String.fromCharCode;if(t={version:"1.2.4",ucs2:{decode:h,encode:i},decode:m,encode:n,toASCII:p,toUnicode:o},"function"=="function"&&"object"==typeof __webpack_require__(83)&&__webpack_require__(83))!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return t}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(q&&!q.nodeType)if(r)r.exports=t;else for(u in t)t.hasOwnProperty(u)&&(q[u]=t[u]);else d.punycode=t}(this)}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],64:[function(a,b,c){"use strict";function d(a,b){return Object.prototype.hasOwnProperty.call(a,b)}b.exports=function(a,b,c,f){b=b||"&",c=c||"=";var g={};if("string"!=typeof a||0===a.length)return g;var h=/\+/g;a=a.split(b);var i=1e3;f&&"number"==typeof f.maxKeys&&(i=f.maxKeys);var j=a.length;i>0&&j>i&&(j=i);for(var k=0;j>k;++k){var l,m,n,o,p=a[k].replace(h,"%20"),q=p.indexOf(c);q>=0?(l=p.substr(0,q),m=p.substr(q+1)):(l=p,m=""),n=decodeURIComponent(l),o=decodeURIComponent(m),d(g,n)?e(g[n])?g[n].push(o):g[n]=[g[n],o]:g[n]=o}return g};var e=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)}},{}],65:[function(a,b,c){"use strict";function d(a,b){if(a.map)return a.map(b);for(var c=[],d=0;d<a.length;d++)c.push(b(a[d],d));return c}var e=function(a){switch(typeof a){case"string":return a;case"boolean":return a?"true":"false";case"number":return isFinite(a)?a:"";default:return""}};b.exports=function(a,b,c,h){return b=b||"&",c=c||"=",null===a&&(a=void 0),"object"==typeof a?d(g(a),function(d){var g=encodeURIComponent(e(d))+c;return f(a[d])?a[d].map(function(a){return g+encodeURIComponent(e(a))}).join(b):g+encodeURIComponent(e(a[d]))}).join(b):h?encodeURIComponent(e(h))+c+encodeURIComponent(e(a)):""};var f=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},g=Object.keys||function(a){var b=[];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}},{}],66:[function(a,b,c){"use strict";c.decode=c.parse=a("./decode"),c.encode=c.stringify=a("./encode")},{"./decode":64,"./encode":65}],67:[function(a,b,c){b.exports=function(a){return a&&"object"==typeof a&&"function"==typeof a.copy&&"function"==typeof a.fill&&"function"==typeof a.readUInt8}},{}],68:[function(a,b,c){(function(b,d){function e(a,b){var d={seen:[],stylize:g};return arguments.length>=3&&(d.depth=arguments[2]),arguments.length>=4&&(d.colors=arguments[3]),p(b)?d.showHidden=b:b&&c._extend(d,b),v(d.showHidden)&&(d.showHidden=!1),v(d.depth)&&(d.depth=2),v(d.colors)&&(d.colors=!1),v(d.customInspect)&&(d.customInspect=!0),d.colors&&(d.stylize=f),i(d,a,d.depth)}function f(a,b){var c=e.styles[b];return c?"["+e.colors[c][0]+"m"+a+"["+e.colors[c][1]+"m":a}function g(a,b){return a}function h(a){var b={};return a.forEach(function(a,c){b[a]=!0}),b}function i(a,b,d){if(a.customInspect&&b&&A(b.inspect)&&b.inspect!==c.inspect&&(!b.constructor||b.constructor.prototype!==b)){var e=b.inspect(d,a);return t(e)||(e=i(a,e,d)),e}var f=j(a,b);if(f)return f;var g=Object.keys(b),p=h(g);if(a.showHidden&&(g=Object.getOwnPropertyNames(b)),z(b)&&(g.indexOf("message")>=0||g.indexOf("description")>=0))return k(b);if(0===g.length){if(A(b)){var q=b.name?": "+b.name:"";return a.stylize("[Function"+q+"]","special")}if(w(b))return a.stylize(RegExp.prototype.toString.call(b),"regexp");if(y(b))return a.stylize(Date.prototype.toString.call(b),"date");if(z(b))return k(b)}var r="",s=!1,u=["{","}"];if(o(b)&&(s=!0,u=["[","]"]),A(b)){var v=b.name?": "+b.name:"";r=" [Function"+v+"]"}if(w(b)&&(r=" "+RegExp.prototype.toString.call(b)),y(b)&&(r=" "+Date.prototype.toUTCString.call(b)),z(b)&&(r=" "+k(b)),0===g.length&&(!s||0==b.length))return u[0]+r+u[1];if(0>d)return w(b)?a.stylize(RegExp.prototype.toString.call(b),"regexp"):a.stylize("[Object]","special");a.seen.push(b);var x;return x=s?l(a,b,d,p,g):g.map(function(c){return m(a,b,d,p,c,s)}),a.seen.pop(),n(x,r,u)}function j(a,b){if(v(b))return a.stylize("undefined","undefined");if(t(b)){var c="'"+JSON.stringify(b).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return a.stylize(c,"string")}return s(b)?a.stylize(""+b,"number"):p(b)?a.stylize(""+b,"boolean"):q(b)?a.stylize("null","null"):void 0}function k(a){return"["+Error.prototype.toString.call(a)+"]"}function l(a,b,c,d,e){for(var f=[],g=0,h=b.length;h>g;++g)F(b,String(g))?f.push(m(a,b,c,d,String(g),!0)):f.push("");return e.forEach(function(e){e.match(/^\d+$/)||f.push(m(a,b,c,d,e,!0))}),f}function m(a,b,c,d,e,f){var g,h,j;if(j=Object.getOwnPropertyDescriptor(b,e)||{value:b[e]},j.get?h=j.set?a.stylize("[Getter/Setter]","special"):a.stylize("[Getter]","special"):j.set&&(h=a.stylize("[Setter]","special")),F(d,e)||(g="["+e+"]"),h||(a.seen.indexOf(j.value)<0?(h=q(c)?i(a,j.value,null):i(a,j.value,c-1),h.indexOf("\n")>-1&&(h=f?h.split("\n").map(function(a){return"  "+a}).join("\n").substr(2):"\n"+h.split("\n").map(function(a){return"   "+a}).join("\n"))):h=a.stylize("[Circular]","special")),v(g)){if(f&&e.match(/^\d+$/))return h;g=JSON.stringify(""+e),g.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(g=g.substr(1,g.length-2),g=a.stylize(g,"name")):(g=g.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),g=a.stylize(g,"string"))}return g+": "+h}function n(a,b,c){var d=0,e=a.reduce(function(a,b){return d++,b.indexOf("\n")>=0&&d++,a+b.replace(/\u001b\[\d\d?m/g,"").length+1},0);return e>60?c[0]+(""===b?"":b+"\n ")+" "+a.join(",\n  ")+" "+c[1]:c[0]+b+" "+a.join(", ")+" "+c[1]}function o(a){return Array.isArray(a)}function p(a){return"boolean"==typeof a}function q(a){return null===a}function r(a){return null==a}function s(a){return"number"==typeof a}function t(a){return"string"==typeof a}function u(a){return"symbol"==typeof a}function v(a){return void 0===a}function w(a){return x(a)&&"[object RegExp]"===C(a)}function x(a){return"object"==typeof a&&null!==a}function y(a){return x(a)&&"[object Date]"===C(a)}function z(a){return x(a)&&("[object Error]"===C(a)||a instanceof Error)}function A(a){return"function"==typeof a}function B(a){return null===a||"boolean"==typeof a||"number"==typeof a||"string"==typeof a||"symbol"==typeof a||"undefined"==typeof a}function C(a){return Object.prototype.toString.call(a)}function D(a){return 10>a?"0"+a.toString(10):a.toString(10)}function E(){var a=new Date,b=[D(a.getHours()),D(a.getMinutes()),D(a.getSeconds())].join(":");return[a.getDate(),J[a.getMonth()],b].join(" ")}function F(a,b){return Object.prototype.hasOwnProperty.call(a,b)}var G=/%[sdj%]/g;c.format=function(a){if(!t(a)){for(var b=[],c=0;c<arguments.length;c++)b.push(e(arguments[c]));return b.join(" ")}for(var c=1,d=arguments,f=d.length,g=String(a).replace(G,function(a){if("%"===a)return"%";if(c>=f)return a;switch(a){case"%s":return String(d[c++]);case"%d":return Number(d[c++]);case"%j":try{return JSON.stringify(d[c++])}catch(b){return"[Circular]"}default:return a}}),h=d[c];f>c;h=d[++c])g+=q(h)||!x(h)?" "+h:" "+e(h);return g},c.deprecate=function(a,e){function f(){if(!g){if(b.throwDeprecation)throw new Error(e);b.traceDeprecation?console.trace(e):console.error(e),g=!0}return a.apply(this,arguments)}if(v(d.process))return function(){return c.deprecate(a,e).apply(this,arguments)};if(b.noDeprecation===!0)return a;var g=!1;return f};var H,I={};c.debuglog=function(a){if(v(H)&&(H=b.env.NODE_DEBUG||""),a=a.toUpperCase(),!I[a])if(new RegExp("\\b"+a+"\\b","i").test(H)){var d=b.pid;I[a]=function(){var b=c.format.apply(c,arguments);console.error("%s %d: %s",a,d,b)}}else I[a]=function(){};return I[a]},c.inspect=e,e.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},e.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},c.isArray=o,c.isBoolean=p,c.isNull=q,c.isNullOrUndefined=r,c.isNumber=s,c.isString=t,c.isSymbol=u,c.isUndefined=v,c.isRegExp=w,c.isObject=x,c.isDate=y,c.isError=z,c.isFunction=A,c.isPrimitive=B,c.isBuffer=a("./support/isBuffer");var J=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];c.log=function(){console.log("%s - %s",E(),c.format.apply(c,arguments))},c.inherits=a("inherits"),c._extend=function(a,b){if(!b||!x(b))return a;for(var c=Object.keys(b),d=c.length;d--;)a[c[d]]=b[c[d]];return a}}).call(this,a("FWaASH"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./support/isBuffer":67,FWaASH:62,inherits:61}],69:[function(a,b,c){(function(b){"use strict";function d(){try{var a=new Uint8Array(1);return a.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===a.foo()&&"function"==typeof a.subarray&&0===a.subarray(1,1).byteLength}catch(b){return!1}}function e(){return g.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function f(a,b){if(e()<b)throw new RangeError("Invalid typed array length");return g.TYPED_ARRAY_SUPPORT?(a=new Uint8Array(b),a.__proto__=g.prototype):(null===a&&(a=new g(b)),a.length=b),a}function g(a,b,c){if(!(g.TYPED_ARRAY_SUPPORT||this instanceof g))return new g(a,b,c);if("number"==typeof a){if("string"==typeof b)throw new Error("If encoding is specified then the first argument must be a string");return k(this,a)}return h(this,a,b,c)}function h(a,b,c,d){if("number"==typeof b)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&b instanceof ArrayBuffer?n(a,b,c,d):"string"==typeof b?l(a,b,c):o(a,b)}function i(a){if("number"!=typeof a)throw new TypeError('"size" argument must be a number');if(0>a)throw new RangeError('"size" argument must not be negative')}function j(a,b,c,d){return i(b),0>=b?f(a,b):void 0!==c?"string"==typeof d?f(a,b).fill(c,d):f(a,b).fill(c):f(a,b)}function k(a,b){if(i(b),a=f(a,0>b?0:0|p(b)),!g.TYPED_ARRAY_SUPPORT)for(var c=0;b>c;++c)a[c]=0;return a}function l(a,b,c){if("string"==typeof c&&""!==c||(c="utf8"),!g.isEncoding(c))throw new TypeError('"encoding" must be a valid string encoding');var d=0|r(b,c);a=f(a,d);var e=a.write(b,c);return e!==d&&(a=a.slice(0,e)),a}function m(a,b){var c=b.length<0?0:0|p(b.length);a=f(a,c);for(var d=0;c>d;d+=1)a[d]=255&b[d];
return a}function n(a,b,c,d){if(b.byteLength,0>c||b.byteLength<c)throw new RangeError("'offset' is out of bounds");if(b.byteLength<c+(d||0))throw new RangeError("'length' is out of bounds");return b=void 0===c&&void 0===d?new Uint8Array(b):void 0===d?new Uint8Array(b,c):new Uint8Array(b,c,d),g.TYPED_ARRAY_SUPPORT?(a=b,a.__proto__=g.prototype):a=m(a,b),a}function o(a,b){if(g.isBuffer(b)){var c=0|p(b.length);return a=f(a,c),0===a.length?a:(b.copy(a,0,0,c),a)}if(b){if("undefined"!=typeof ArrayBuffer&&b.buffer instanceof ArrayBuffer||"length"in b)return"number"!=typeof b.length||Y(b.length)?f(a,0):m(a,b);if("Buffer"===b.type&&_(b.data))return m(a,b.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function p(a){if(a>=e())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+e().toString(16)+" bytes");return 0|a}function q(a){return+a!=a&&(a=0),g.alloc(+a)}function r(a,b){if(g.isBuffer(a))return a.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(a)||a instanceof ArrayBuffer))return a.byteLength;"string"!=typeof a&&(a=""+a);var c=a.length;if(0===c)return 0;for(var d=!1;;)switch(b){case"ascii":case"latin1":case"binary":return c;case"utf8":case"utf-8":case void 0:return T(a).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*c;case"hex":return c>>>1;case"base64":return W(a).length;default:if(d)return T(a).length;b=(""+b).toLowerCase(),d=!0}}function s(a,b,c){var d=!1;if((void 0===b||0>b)&&(b=0),b>this.length)return"";if((void 0===c||c>this.length)&&(c=this.length),0>=c)return"";if(c>>>=0,b>>>=0,b>=c)return"";for(a||(a="utf8");;)switch(a){case"hex":return H(this,b,c);case"utf8":case"utf-8":return D(this,b,c);case"ascii":return F(this,b,c);case"latin1":case"binary":return G(this,b,c);case"base64":return C(this,b,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,b,c);default:if(d)throw new TypeError("Unknown encoding: "+a);a=(a+"").toLowerCase(),d=!0}}function t(a,b,c){var d=a[b];a[b]=a[c],a[c]=d}function u(a,b,c,d,e){if(0===a.length)return-1;if("string"==typeof c?(d=c,c=0):c>2147483647?c=2147483647:-2147483648>c&&(c=-2147483648),c=+c,isNaN(c)&&(c=e?0:a.length-1),0>c&&(c=a.length+c),c>=a.length){if(e)return-1;c=a.length-1}else if(0>c){if(!e)return-1;c=0}if("string"==typeof b&&(b=g.from(b,d)),g.isBuffer(b))return 0===b.length?-1:v(a,b,c,d,e);if("number"==typeof b)return b=255&b,g.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?e?Uint8Array.prototype.indexOf.call(a,b,c):Uint8Array.prototype.lastIndexOf.call(a,b,c):v(a,[b],c,d,e);throw new TypeError("val must be string, number or Buffer")}function v(a,b,c,d,e){function f(a,b){return 1===g?a[b]:a.readUInt16BE(b*g)}var g=1,h=a.length,i=b.length;if(void 0!==d&&(d=String(d).toLowerCase(),"ucs2"===d||"ucs-2"===d||"utf16le"===d||"utf-16le"===d)){if(a.length<2||b.length<2)return-1;g=2,h/=2,i/=2,c/=2}var j;if(e){var k=-1;for(j=c;h>j;j++)if(f(a,j)===f(b,-1===k?0:j-k)){if(-1===k&&(k=j),j-k+1===i)return k*g}else-1!==k&&(j-=j-k),k=-1}else for(c+i>h&&(c=h-i),j=c;j>=0;j--){for(var l=!0,m=0;i>m;m++)if(f(a,j+m)!==f(b,m)){l=!1;break}if(l)return j}return-1}function w(a,b,c,d){c=Number(c)||0;var e=a.length-c;d?(d=Number(d),d>e&&(d=e)):d=e;var f=b.length;if(f%2!==0)throw new TypeError("Invalid hex string");d>f/2&&(d=f/2);for(var g=0;d>g;++g){var h=parseInt(b.substr(2*g,2),16);if(isNaN(h))return g;a[c+g]=h}return g}function x(a,b,c,d){return X(T(b,a.length-c),a,c,d)}function y(a,b,c,d){return X(U(b),a,c,d)}function z(a,b,c,d){return y(a,b,c,d)}function A(a,b,c,d){return X(W(b),a,c,d)}function B(a,b,c,d){return X(V(b,a.length-c),a,c,d)}function C(a,b,c){return 0===b&&c===a.length?Z.fromByteArray(a):Z.fromByteArray(a.slice(b,c))}function D(a,b,c){c=Math.min(a.length,c);for(var d=[],e=b;c>e;){var f=a[e],g=null,h=f>239?4:f>223?3:f>191?2:1;if(c>=e+h){var i,j,k,l;switch(h){case 1:128>f&&(g=f);break;case 2:i=a[e+1],128===(192&i)&&(l=(31&f)<<6|63&i,l>127&&(g=l));break;case 3:i=a[e+1],j=a[e+2],128===(192&i)&&128===(192&j)&&(l=(15&f)<<12|(63&i)<<6|63&j,l>2047&&(55296>l||l>57343)&&(g=l));break;case 4:i=a[e+1],j=a[e+2],k=a[e+3],128===(192&i)&&128===(192&j)&&128===(192&k)&&(l=(15&f)<<18|(63&i)<<12|(63&j)<<6|63&k,l>65535&&1114112>l&&(g=l))}}null===g?(g=65533,h=1):g>65535&&(g-=65536,d.push(g>>>10&1023|55296),g=56320|1023&g),d.push(g),e+=h}return E(d)}function E(a){var b=a.length;if(aa>=b)return String.fromCharCode.apply(String,a);for(var c="",d=0;b>d;)c+=String.fromCharCode.apply(String,a.slice(d,d+=aa));return c}function F(a,b,c){var d="";c=Math.min(a.length,c);for(var e=b;c>e;++e)d+=String.fromCharCode(127&a[e]);return d}function G(a,b,c){var d="";c=Math.min(a.length,c);for(var e=b;c>e;++e)d+=String.fromCharCode(a[e]);return d}function H(a,b,c){var d=a.length;(!b||0>b)&&(b=0),(!c||0>c||c>d)&&(c=d);for(var e="",f=b;c>f;++f)e+=S(a[f]);return e}function I(a,b,c){for(var d=a.slice(b,c),e="",f=0;f<d.length;f+=2)e+=String.fromCharCode(d[f]+256*d[f+1]);return e}function J(a,b,c){if(a%1!==0||0>a)throw new RangeError("offset is not uint");if(a+b>c)throw new RangeError("Trying to access beyond buffer length")}function K(a,b,c,d,e,f){if(!g.isBuffer(a))throw new TypeError('"buffer" argument must be a Buffer instance');if(b>e||f>b)throw new RangeError('"value" argument is out of bounds');if(c+d>a.length)throw new RangeError("Index out of range")}function L(a,b,c,d){0>b&&(b=65535+b+1);for(var e=0,f=Math.min(a.length-c,2);f>e;++e)a[c+e]=(b&255<<8*(d?e:1-e))>>>8*(d?e:1-e)}function M(a,b,c,d){0>b&&(b=4294967295+b+1);for(var e=0,f=Math.min(a.length-c,4);f>e;++e)a[c+e]=b>>>8*(d?e:3-e)&255}function N(a,b,c,d,e,f){if(c+d>a.length)throw new RangeError("Index out of range");if(0>c)throw new RangeError("Index out of range")}function O(a,b,c,d,e){return e||N(a,b,c,4,3.4028234663852886e38,-3.4028234663852886e38),$.write(a,b,c,d,23,4),c+4}function P(a,b,c,d,e){return e||N(a,b,c,8,1.7976931348623157e308,-1.7976931348623157e308),$.write(a,b,c,d,52,8),c+8}function Q(a){if(a=R(a).replace(ba,""),a.length<2)return"";for(;a.length%4!==0;)a+="=";return a}function R(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")}function S(a){return 16>a?"0"+a.toString(16):a.toString(16)}function T(a,b){b=b||1/0;for(var c,d=a.length,e=null,f=[],g=0;d>g;++g){if(c=a.charCodeAt(g),c>55295&&57344>c){if(!e){if(c>56319){(b-=3)>-1&&f.push(239,191,189);continue}if(g+1===d){(b-=3)>-1&&f.push(239,191,189);continue}e=c;continue}if(56320>c){(b-=3)>-1&&f.push(239,191,189),e=c;continue}c=(e-55296<<10|c-56320)+65536}else e&&(b-=3)>-1&&f.push(239,191,189);if(e=null,128>c){if((b-=1)<0)break;f.push(c)}else if(2048>c){if((b-=2)<0)break;f.push(c>>6|192,63&c|128)}else if(65536>c){if((b-=3)<0)break;f.push(c>>12|224,c>>6&63|128,63&c|128)}else{if(!(1114112>c))throw new Error("Invalid code point");if((b-=4)<0)break;f.push(c>>18|240,c>>12&63|128,c>>6&63|128,63&c|128)}}return f}function U(a){for(var b=[],c=0;c<a.length;++c)b.push(255&a.charCodeAt(c));return b}function V(a,b){for(var c,d,e,f=[],g=0;g<a.length&&!((b-=2)<0);++g)c=a.charCodeAt(g),d=c>>8,e=c%256,f.push(e),f.push(d);return f}function W(a){return Z.toByteArray(Q(a))}function X(a,b,c,d){for(var e=0;d>e&&!(e+c>=b.length||e>=a.length);++e)b[e+c]=a[e];return e}function Y(a){return a!==a}var Z=a("base64-js"),$=a("ieee754"),_=a("isarray");c.Buffer=g,c.SlowBuffer=q,c.INSPECT_MAX_BYTES=50,g.TYPED_ARRAY_SUPPORT=void 0!==b.TYPED_ARRAY_SUPPORT?b.TYPED_ARRAY_SUPPORT:d(),c.kMaxLength=e(),g.poolSize=8192,g._augment=function(a){return a.__proto__=g.prototype,a},g.from=function(a,b,c){return h(null,a,b,c)},g.TYPED_ARRAY_SUPPORT&&(g.prototype.__proto__=Uint8Array.prototype,g.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&g[Symbol.species]===g&&Object.defineProperty(g,Symbol.species,{value:null,configurable:!0})),g.alloc=function(a,b,c){return j(null,a,b,c)},g.allocUnsafe=function(a){return k(null,a)},g.allocUnsafeSlow=function(a){return k(null,a)},g.isBuffer=function(a){return!(null==a||!a._isBuffer)},g.compare=function(a,b){if(!g.isBuffer(a)||!g.isBuffer(b))throw new TypeError("Arguments must be Buffers");if(a===b)return 0;for(var c=a.length,d=b.length,e=0,f=Math.min(c,d);f>e;++e)if(a[e]!==b[e]){c=a[e],d=b[e];break}return d>c?-1:c>d?1:0},g.isEncoding=function(a){switch(String(a).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},g.concat=function(a,b){if(!_(a))throw new TypeError('"list" argument must be an Array of Buffers');if(0===a.length)return g.alloc(0);var c;if(void 0===b)for(b=0,c=0;c<a.length;++c)b+=a[c].length;var d=g.allocUnsafe(b),e=0;for(c=0;c<a.length;++c){var f=a[c];if(!g.isBuffer(f))throw new TypeError('"list" argument must be an Array of Buffers');f.copy(d,e),e+=f.length}return d},g.byteLength=r,g.prototype._isBuffer=!0,g.prototype.swap16=function(){var a=this.length;if(a%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var b=0;a>b;b+=2)t(this,b,b+1);return this},g.prototype.swap32=function(){var a=this.length;if(a%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var b=0;a>b;b+=4)t(this,b,b+3),t(this,b+1,b+2);return this},g.prototype.swap64=function(){var a=this.length;if(a%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var b=0;a>b;b+=8)t(this,b,b+7),t(this,b+1,b+6),t(this,b+2,b+5),t(this,b+3,b+4);return this},g.prototype.toString=function(){var a=0|this.length;return 0===a?"":0===arguments.length?D(this,0,a):s.apply(this,arguments)},g.prototype.equals=function(a){if(!g.isBuffer(a))throw new TypeError("Argument must be a Buffer");return this===a?!0:0===g.compare(this,a)},g.prototype.inspect=function(){var a="",b=c.INSPECT_MAX_BYTES;return this.length>0&&(a=this.toString("hex",0,b).match(/.{2}/g).join(" "),this.length>b&&(a+=" ... ")),"<Buffer "+a+">"},g.prototype.compare=function(a,b,c,d,e){if(!g.isBuffer(a))throw new TypeError("Argument must be a Buffer");if(void 0===b&&(b=0),void 0===c&&(c=a?a.length:0),void 0===d&&(d=0),void 0===e&&(e=this.length),0>b||c>a.length||0>d||e>this.length)throw new RangeError("out of range index");if(d>=e&&b>=c)return 0;if(d>=e)return-1;if(b>=c)return 1;if(b>>>=0,c>>>=0,d>>>=0,e>>>=0,this===a)return 0;for(var f=e-d,h=c-b,i=Math.min(f,h),j=this.slice(d,e),k=a.slice(b,c),l=0;i>l;++l)if(j[l]!==k[l]){f=j[l],h=k[l];break}return h>f?-1:f>h?1:0},g.prototype.includes=function(a,b,c){return-1!==this.indexOf(a,b,c)},g.prototype.indexOf=function(a,b,c){return u(this,a,b,c,!0)},g.prototype.lastIndexOf=function(a,b,c){return u(this,a,b,c,!1)},g.prototype.write=function(a,b,c,d){if(void 0===b)d="utf8",c=this.length,b=0;else if(void 0===c&&"string"==typeof b)d=b,c=this.length,b=0;else{if(!isFinite(b))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");b=0|b,isFinite(c)?(c=0|c,void 0===d&&(d="utf8")):(d=c,c=void 0)}var e=this.length-b;if((void 0===c||c>e)&&(c=e),a.length>0&&(0>c||0>b)||b>this.length)throw new RangeError("Attempt to write outside buffer bounds");d||(d="utf8");for(var f=!1;;)switch(d){case"hex":return w(this,a,b,c);case"utf8":case"utf-8":return x(this,a,b,c);case"ascii":return y(this,a,b,c);case"latin1":case"binary":return z(this,a,b,c);case"base64":return A(this,a,b,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return B(this,a,b,c);default:if(f)throw new TypeError("Unknown encoding: "+d);d=(""+d).toLowerCase(),f=!0}},g.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var aa=4096;g.prototype.slice=function(a,b){var c=this.length;a=~~a,b=void 0===b?c:~~b,0>a?(a+=c,0>a&&(a=0)):a>c&&(a=c),0>b?(b+=c,0>b&&(b=0)):b>c&&(b=c),a>b&&(b=a);var d;if(g.TYPED_ARRAY_SUPPORT)d=this.subarray(a,b),d.__proto__=g.prototype;else{var e=b-a;d=new g(e,void 0);for(var f=0;e>f;++f)d[f]=this[f+a]}return d},g.prototype.readUIntLE=function(a,b,c){a=0|a,b=0|b,c||J(a,b,this.length);for(var d=this[a],e=1,f=0;++f<b&&(e*=256);)d+=this[a+f]*e;return d},g.prototype.readUIntBE=function(a,b,c){a=0|a,b=0|b,c||J(a,b,this.length);for(var d=this[a+--b],e=1;b>0&&(e*=256);)d+=this[a+--b]*e;return d},g.prototype.readUInt8=function(a,b){return b||J(a,1,this.length),this[a]},g.prototype.readUInt16LE=function(a,b){return b||J(a,2,this.length),this[a]|this[a+1]<<8},g.prototype.readUInt16BE=function(a,b){return b||J(a,2,this.length),this[a]<<8|this[a+1]},g.prototype.readUInt32LE=function(a,b){return b||J(a,4,this.length),(this[a]|this[a+1]<<8|this[a+2]<<16)+16777216*this[a+3]},g.prototype.readUInt32BE=function(a,b){return b||J(a,4,this.length),16777216*this[a]+(this[a+1]<<16|this[a+2]<<8|this[a+3])},g.prototype.readIntLE=function(a,b,c){a=0|a,b=0|b,c||J(a,b,this.length);for(var d=this[a],e=1,f=0;++f<b&&(e*=256);)d+=this[a+f]*e;return e*=128,d>=e&&(d-=Math.pow(2,8*b)),d},g.prototype.readIntBE=function(a,b,c){a=0|a,b=0|b,c||J(a,b,this.length);for(var d=b,e=1,f=this[a+--d];d>0&&(e*=256);)f+=this[a+--d]*e;return e*=128,f>=e&&(f-=Math.pow(2,8*b)),f},g.prototype.readInt8=function(a,b){return b||J(a,1,this.length),128&this[a]?-1*(255-this[a]+1):this[a]},g.prototype.readInt16LE=function(a,b){b||J(a,2,this.length);var c=this[a]|this[a+1]<<8;return 32768&c?4294901760|c:c},g.prototype.readInt16BE=function(a,b){b||J(a,2,this.length);var c=this[a+1]|this[a]<<8;return 32768&c?4294901760|c:c},g.prototype.readInt32LE=function(a,b){return b||J(a,4,this.length),this[a]|this[a+1]<<8|this[a+2]<<16|this[a+3]<<24},g.prototype.readInt32BE=function(a,b){return b||J(a,4,this.length),this[a]<<24|this[a+1]<<16|this[a+2]<<8|this[a+3]},g.prototype.readFloatLE=function(a,b){return b||J(a,4,this.length),$.read(this,a,!0,23,4)},g.prototype.readFloatBE=function(a,b){return b||J(a,4,this.length),$.read(this,a,!1,23,4)},g.prototype.readDoubleLE=function(a,b){return b||J(a,8,this.length),$.read(this,a,!0,52,8)},g.prototype.readDoubleBE=function(a,b){return b||J(a,8,this.length),$.read(this,a,!1,52,8)},g.prototype.writeUIntLE=function(a,b,c,d){if(a=+a,b=0|b,c=0|c,!d){var e=Math.pow(2,8*c)-1;K(this,a,b,c,e,0)}var f=1,g=0;for(this[b]=255&a;++g<c&&(f*=256);)this[b+g]=a/f&255;return b+c},g.prototype.writeUIntBE=function(a,b,c,d){if(a=+a,b=0|b,c=0|c,!d){var e=Math.pow(2,8*c)-1;K(this,a,b,c,e,0)}var f=c-1,g=1;for(this[b+f]=255&a;--f>=0&&(g*=256);)this[b+f]=a/g&255;return b+c},g.prototype.writeUInt8=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,1,255,0),g.TYPED_ARRAY_SUPPORT||(a=Math.floor(a)),this[b]=255&a,b+1},g.prototype.writeUInt16LE=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,2,65535,0),g.TYPED_ARRAY_SUPPORT?(this[b]=255&a,this[b+1]=a>>>8):L(this,a,b,!0),b+2},g.prototype.writeUInt16BE=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,2,65535,0),g.TYPED_ARRAY_SUPPORT?(this[b]=a>>>8,this[b+1]=255&a):L(this,a,b,!1),b+2},g.prototype.writeUInt32LE=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,4,4294967295,0),g.TYPED_ARRAY_SUPPORT?(this[b+3]=a>>>24,this[b+2]=a>>>16,this[b+1]=a>>>8,this[b]=255&a):M(this,a,b,!0),b+4},g.prototype.writeUInt32BE=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,4,4294967295,0),g.TYPED_ARRAY_SUPPORT?(this[b]=a>>>24,this[b+1]=a>>>16,this[b+2]=a>>>8,this[b+3]=255&a):M(this,a,b,!1),b+4},g.prototype.writeIntLE=function(a,b,c,d){if(a=+a,b=0|b,!d){var e=Math.pow(2,8*c-1);K(this,a,b,c,e-1,-e)}var f=0,g=1,h=0;for(this[b]=255&a;++f<c&&(g*=256);)0>a&&0===h&&0!==this[b+f-1]&&(h=1),this[b+f]=(a/g>>0)-h&255;return b+c},g.prototype.writeIntBE=function(a,b,c,d){if(a=+a,b=0|b,!d){var e=Math.pow(2,8*c-1);K(this,a,b,c,e-1,-e)}var f=c-1,g=1,h=0;for(this[b+f]=255&a;--f>=0&&(g*=256);)0>a&&0===h&&0!==this[b+f+1]&&(h=1),this[b+f]=(a/g>>0)-h&255;return b+c},g.prototype.writeInt8=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,1,127,-128),g.TYPED_ARRAY_SUPPORT||(a=Math.floor(a)),0>a&&(a=255+a+1),this[b]=255&a,b+1},g.prototype.writeInt16LE=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,2,32767,-32768),g.TYPED_ARRAY_SUPPORT?(this[b]=255&a,this[b+1]=a>>>8):L(this,a,b,!0),b+2},g.prototype.writeInt16BE=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,2,32767,-32768),g.TYPED_ARRAY_SUPPORT?(this[b]=a>>>8,this[b+1]=255&a):L(this,a,b,!1),b+2},g.prototype.writeInt32LE=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,4,2147483647,-2147483648),g.TYPED_ARRAY_SUPPORT?(this[b]=255&a,this[b+1]=a>>>8,this[b+2]=a>>>16,this[b+3]=a>>>24):M(this,a,b,!0),b+4},g.prototype.writeInt32BE=function(a,b,c){return a=+a,b=0|b,c||K(this,a,b,4,2147483647,-2147483648),0>a&&(a=4294967295+a+1),g.TYPED_ARRAY_SUPPORT?(this[b]=a>>>24,this[b+1]=a>>>16,this[b+2]=a>>>8,this[b+3]=255&a):M(this,a,b,!1),b+4},g.prototype.writeFloatLE=function(a,b,c){return O(this,a,b,!0,c)},g.prototype.writeFloatBE=function(a,b,c){return O(this,a,b,!1,c)},g.prototype.writeDoubleLE=function(a,b,c){return P(this,a,b,!0,c)},g.prototype.writeDoubleBE=function(a,b,c){return P(this,a,b,!1,c)},g.prototype.copy=function(a,b,c,d){if(c||(c=0),d||0===d||(d=this.length),b>=a.length&&(b=a.length),b||(b=0),d>0&&c>d&&(d=c),d===c)return 0;if(0===a.length||0===this.length)return 0;if(0>b)throw new RangeError("targetStart out of bounds");if(0>c||c>=this.length)throw new RangeError("sourceStart out of bounds");if(0>d)throw new RangeError("sourceEnd out of bounds");d>this.length&&(d=this.length),a.length-b<d-c&&(d=a.length-b+c);var e,f=d-c;if(this===a&&b>c&&d>b)for(e=f-1;e>=0;--e)a[e+b]=this[e+c];else if(1e3>f||!g.TYPED_ARRAY_SUPPORT)for(e=0;f>e;++e)a[e+b]=this[e+c];else Uint8Array.prototype.set.call(a,this.subarray(c,c+f),b);return f},g.prototype.fill=function(a,b,c,d){if("string"==typeof a){if("string"==typeof b?(d=b,b=0,c=this.length):"string"==typeof c&&(d=c,c=this.length),1===a.length){var e=a.charCodeAt(0);256>e&&(a=e)}if(void 0!==d&&"string"!=typeof d)throw new TypeError("encoding must be a string");if("string"==typeof d&&!g.isEncoding(d))throw new TypeError("Unknown encoding: "+d)}else"number"==typeof a&&(a=255&a);if(0>b||this.length<b||this.length<c)throw new RangeError("Out of range index");if(b>=c)return this;b>>>=0,c=void 0===c?this.length:c>>>0,a||(a=0);var f;if("number"==typeof a)for(f=b;c>f;++f)this[f]=a;else{var h=g.isBuffer(a)?a:T(new g(a,d).toString()),i=h.length;for(f=0;c-b>f;++f)this[f+b]=h[f%i]}return this};var ba=/[^+\/0-9A-Za-z-_]/g}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"base64-js":70,ieee754:71,isarray:72}],70:[function(a,b,c){"use strict";function d(){for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b=0,c=a.length;c>b;++b)i[b]=a[b],j[a.charCodeAt(b)]=b;j["-".charCodeAt(0)]=62,j["_".charCodeAt(0)]=63}function e(a){var b,c,d,e,f,g,h=a.length;if(h%4>0)throw new Error("Invalid string. Length must be a multiple of 4");f="="===a[h-2]?2:"="===a[h-1]?1:0,g=new k(3*h/4-f),d=f>0?h-4:h;var i=0;for(b=0,c=0;d>b;b+=4,c+=3)e=j[a.charCodeAt(b)]<<18|j[a.charCodeAt(b+1)]<<12|j[a.charCodeAt(b+2)]<<6|j[a.charCodeAt(b+3)],g[i++]=e>>16&255,g[i++]=e>>8&255,g[i++]=255&e;return 2===f?(e=j[a.charCodeAt(b)]<<2|j[a.charCodeAt(b+1)]>>4,g[i++]=255&e):1===f&&(e=j[a.charCodeAt(b)]<<10|j[a.charCodeAt(b+1)]<<4|j[a.charCodeAt(b+2)]>>2,g[i++]=e>>8&255,g[i++]=255&e),g}function f(a){return i[a>>18&63]+i[a>>12&63]+i[a>>6&63]+i[63&a]}function g(a,b,c){for(var d,e=[],g=b;c>g;g+=3)d=(a[g]<<16)+(a[g+1]<<8)+a[g+2],e.push(f(d));return e.join("")}function h(a){for(var b,c=a.length,d=c%3,e="",f=[],h=16383,j=0,k=c-d;k>j;j+=h)f.push(g(a,j,j+h>k?k:j+h));return 1===d?(b=a[c-1],e+=i[b>>2],e+=i[b<<4&63],e+="=="):2===d&&(b=(a[c-2]<<8)+a[c-1],e+=i[b>>10],e+=i[b>>4&63],e+=i[b<<2&63],e+="="),f.push(e),f.join("")}c.toByteArray=e,c.fromByteArray=h;var i=[],j=[],k="undefined"!=typeof Uint8Array?Uint8Array:Array;d()},{}],71:[function(a,b,c){b.exports=a(59)},{}],72:[function(a,b,c){var d={}.toString;b.exports=Array.isArray||function(a){return"[object Array]"==d.call(a)}},{}],73:[function(a,b,c){function d(a,b){if(a.length%h!==0){var c=a.length+(h-a.length%h);a=g.concat([a,i],c)}for(var d=[],e=b?a.readInt32BE:a.readInt32LE,f=0;f<a.length;f+=h)d.push(e.call(a,f));return d}function e(a,b,c){for(var d=new g(b),e=c?d.writeInt32BE:d.writeInt32LE,f=0;f<a.length;f++)e.call(d,a[f],4*f,!0);return d}function f(a,b,c,f){g.isBuffer(a)||(a=new g(a));var h=b(d(a,f),a.length*j);return e(h,c,f)}var g=a("buffer").Buffer,h=4,i=new g(h);i.fill(0);var j=8;b.exports={hash:f}},{buffer:57}],74:[function(a,b,c){function d(a,b,c){h.isBuffer(b)||(b=new h(b)),h.isBuffer(c)||(c=new h(c)),b.length>n?b=a(b):b.length<n&&(b=h.concat([b,o],n));for(var d=new h(n),e=new h(n),f=0;n>f;f++)d[f]=54^b[f],e[f]=92^b[f];var g=a(h.concat([d,c]));return a(h.concat([e,g]))}function e(a,b){a=a||"sha1";var c=m[a],e=[],g=0;return c||f("algorithm:",a,"is not yet supported"),{update:function(a){return h.isBuffer(a)||(a=new h(a)),e.push(a),g+=a.length,this},digest:function(a){var f=h.concat(e),g=b?d(c,b,f):c(f);return e=null,a?g.toString(a):g}}}function f(){var a=[].slice.call(arguments).join(" ");throw new Error([a,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function g(a,b){for(var c in a)b(a[c],c)}var h=a("buffer").Buffer,i=a("./sha"),j=a("./sha256"),k=a("./rng"),l=a("./md5"),m={sha1:i,sha256:j,md5:l},n=64,o=new h(n);o.fill(0),c.createHash=function(a){return e(a)},c.createHmac=function(a,b){return e(a,b)},c.randomBytes=function(a,b){if(!b||!b.call)return new h(k(a));try{b.call(this,void 0,new h(k(a)))}catch(c){b(c)}},g(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(a){c[a]=function(){f("sorry,",a,"is not implemented yet")}})},{"./md5":75,"./rng":76,"./sha":77,"./sha256":78,buffer:57}],75:[function(a,b,c){function d(a,b){a[b>>5]|=128<<b%32,a[(b+64>>>9<<4)+14]=b;for(var c=1732584193,d=-271733879,e=-1732584194,k=271733878,l=0;l<a.length;l+=16){var m=c,n=d,o=e,p=k;c=f(c,d,e,k,a[l+0],7,-680876936),k=f(k,c,d,e,a[l+1],12,-389564586),e=f(e,k,c,d,a[l+2],17,606105819),d=f(d,e,k,c,a[l+3],22,-1044525330),c=f(c,d,e,k,a[l+4],7,-176418897),k=f(k,c,d,e,a[l+5],12,1200080426),e=f(e,k,c,d,a[l+6],17,-1473231341),d=f(d,e,k,c,a[l+7],22,-45705983),c=f(c,d,e,k,a[l+8],7,1770035416),k=f(k,c,d,e,a[l+9],12,-1958414417),e=f(e,k,c,d,a[l+10],17,-42063),d=f(d,e,k,c,a[l+11],22,-1990404162),c=f(c,d,e,k,a[l+12],7,1804603682),k=f(k,c,d,e,a[l+13],12,-40341101),e=f(e,k,c,d,a[l+14],17,-1502002290),d=f(d,e,k,c,a[l+15],22,1236535329),c=g(c,d,e,k,a[l+1],5,-165796510),k=g(k,c,d,e,a[l+6],9,-1069501632),e=g(e,k,c,d,a[l+11],14,643717713),d=g(d,e,k,c,a[l+0],20,-373897302),c=g(c,d,e,k,a[l+5],5,-701558691),k=g(k,c,d,e,a[l+10],9,38016083),e=g(e,k,c,d,a[l+15],14,-660478335),d=g(d,e,k,c,a[l+4],20,-405537848),c=g(c,d,e,k,a[l+9],5,568446438),k=g(k,c,d,e,a[l+14],9,-1019803690),e=g(e,k,c,d,a[l+3],14,-187363961),d=g(d,e,k,c,a[l+8],20,1163531501),c=g(c,d,e,k,a[l+13],5,-1444681467),k=g(k,c,d,e,a[l+2],9,-51403784),e=g(e,k,c,d,a[l+7],14,1735328473),d=g(d,e,k,c,a[l+12],20,-1926607734),c=h(c,d,e,k,a[l+5],4,-378558),k=h(k,c,d,e,a[l+8],11,-2022574463),e=h(e,k,c,d,a[l+11],16,1839030562),d=h(d,e,k,c,a[l+14],23,-35309556),c=h(c,d,e,k,a[l+1],4,-1530992060),k=h(k,c,d,e,a[l+4],11,1272893353),e=h(e,k,c,d,a[l+7],16,-155497632),d=h(d,e,k,c,a[l+10],23,-1094730640),c=h(c,d,e,k,a[l+13],4,681279174),k=h(k,c,d,e,a[l+0],11,-358537222),e=h(e,k,c,d,a[l+3],16,-722521979),d=h(d,e,k,c,a[l+6],23,76029189),c=h(c,d,e,k,a[l+9],4,-640364487),k=h(k,c,d,e,a[l+12],11,-421815835),e=h(e,k,c,d,a[l+15],16,530742520),d=h(d,e,k,c,a[l+2],23,-995338651),c=i(c,d,e,k,a[l+0],6,-198630844),k=i(k,c,d,e,a[l+7],10,1126891415),e=i(e,k,c,d,a[l+14],15,-1416354905),d=i(d,e,k,c,a[l+5],21,-57434055),c=i(c,d,e,k,a[l+12],6,1700485571),k=i(k,c,d,e,a[l+3],10,-1894986606),e=i(e,k,c,d,a[l+10],15,-1051523),d=i(d,e,k,c,a[l+1],21,-2054922799),c=i(c,d,e,k,a[l+8],6,1873313359),k=i(k,c,d,e,a[l+15],10,-30611744),e=i(e,k,c,d,a[l+6],15,-1560198380),d=i(d,e,k,c,a[l+13],21,1309151649),c=i(c,d,e,k,a[l+4],6,-145523070),k=i(k,c,d,e,a[l+11],10,-1120210379),e=i(e,k,c,d,a[l+2],15,718787259),d=i(d,e,k,c,a[l+9],21,-343485551),c=j(c,m),d=j(d,n),e=j(e,o),k=j(k,p)}return Array(c,d,e,k)}function e(a,b,c,d,e,f){return j(k(j(j(b,a),j(d,f)),e),c)}function f(a,b,c,d,f,g,h){return e(b&c|~b&d,a,b,f,g,h)}function g(a,b,c,d,f,g,h){return e(b&d|c&~d,a,b,f,g,h)}function h(a,b,c,d,f,g,h){return e(b^c^d,a,b,f,g,h)}function i(a,b,c,d,f,g,h){return e(c^(b|~d),a,b,f,g,h)}function j(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function k(a,b){return a<<b|a>>>32-b}var l=a("./helpers");b.exports=function(a){return l.hash(a,d,16)}},{"./helpers":73}],76:[function(a,b,c){!function(){var a,c,d=this;a=function(a){for(var b,b,c=new Array(a),d=0;a>d;d++)0==(3&d)&&(b=4294967296*Math.random()),c[d]=b>>>((3&d)<<3)&255;return c},d.crypto&&crypto.getRandomValues&&(c=function(a){var b=new Uint8Array(a);return crypto.getRandomValues(b),b}),b.exports=c||a}()},{}],77:[function(a,b,c){function d(a,b){a[b>>5]|=128<<24-b%32,a[(b+64>>9<<4)+15]=b;for(var c=Array(80),d=1732584193,i=-271733879,j=-1732584194,k=271733878,l=-1009589776,m=0;m<a.length;m+=16){for(var n=d,o=i,p=j,q=k,r=l,s=0;80>s;s++){16>s?c[s]=a[m+s]:c[s]=h(c[s-3]^c[s-8]^c[s-14]^c[s-16],1);var t=g(g(h(d,5),e(s,i,j,k)),g(g(l,c[s]),f(s)));l=k,k=j,j=h(i,30),i=d,d=t}d=g(d,n),i=g(i,o),j=g(j,p),k=g(k,q),l=g(l,r)}return Array(d,i,j,k,l)}function e(a,b,c,d){return 20>a?b&c|~b&d:40>a?b^c^d:60>a?b&c|b&d|c&d:b^c^d}function f(a){return 20>a?1518500249:40>a?1859775393:60>a?-1894007588:-899497514}function g(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function h(a,b){return a<<b|a>>>32-b}var i=a("./helpers");b.exports=function(a){return i.hash(a,d,20,!0)}},{"./helpers":73}],78:[function(a,b,c){var d=a("./helpers"),e=function(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c},f=function(a,b){return a>>>b|a<<32-b},g=function(a,b){return a>>>b},h=function(a,b,c){return a&b^~a&c},i=function(a,b,c){return a&b^a&c^b&c},j=function(a){return f(a,2)^f(a,13)^f(a,22)},k=function(a){return f(a,6)^f(a,11)^f(a,25)},l=function(a){return f(a,7)^f(a,18)^g(a,3)},m=function(a){return f(a,17)^f(a,19)^g(a,10)},n=function(a,b){var c,d,f,g,n,o,p,q,r,s,t,u,v=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),w=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),x=new Array(64);a[b>>5]|=128<<24-b%32,a[(b+64>>9<<4)+15]=b;for(var r=0;r<a.length;r+=16){c=w[0],d=w[1],f=w[2],g=w[3],n=w[4],o=w[5],p=w[6],q=w[7];for(var s=0;64>s;s++)16>s?x[s]=a[s+r]:x[s]=e(e(e(m(x[s-2]),x[s-7]),l(x[s-15])),x[s-16]),t=e(e(e(e(q,k(n)),h(n,o,p)),v[s]),x[s]),u=e(j(c),i(c,d,f)),q=p,p=o,o=n,n=e(g,t),g=f,f=d,d=c,c=e(t,u);w[0]=e(c,w[0]),w[1]=e(d,w[1]),w[2]=e(f,w[2]),w[3]=e(g,w[3]),w[4]=e(n,w[4]),w[5]=e(o,w[5]),w[6]=e(p,w[6]),w[7]=e(q,w[7])}return w};b.exports=function(a){return d.hash(a,n,32,!0)}},{"./helpers":73}],79:[function(a,b,c){!function(a){"use strict";function b(a){return null!==a?"[object Array]"===Object.prototype.toString.call(a):!1}function c(a){return null!==a?"[object Object]"===Object.prototype.toString.call(a):!1}function d(a,e){if(a===e)return!0;var f=Object.prototype.toString.call(a);if(f!==Object.prototype.toString.call(e))return!1;if(b(a)===!0){if(a.length!==e.length)return!1;for(var g=0;g<a.length;g++)if(d(a[g],e[g])===!1)return!1;return!0}if(c(a)===!0){var h={};for(var i in a)if(hasOwnProperty.call(a,i)){if(d(a[i],e[i])===!1)return!1;h[i]=!0}for(var j in e)if(hasOwnProperty.call(e,j)&&h[j]!==!0)return!1;return!0}return!1}function e(a){if(""===a||a===!1||null===a)return!0;if(b(a)&&0===a.length)return!0;if(c(a)){for(var d in a)if(a.hasOwnProperty(d))return!1;return!0}return!1}function f(a){for(var b=Object.keys(a),c=[],d=0;d<b.length;d++)c.push(a[b[d]]);return c}function g(a){return a>="a"&&"z">=a||a>="A"&&"Z">=a||"_"===a}function h(a){return a>="0"&&"9">=a||"-"===a}function i(a){return a>="a"&&"z">=a||a>="A"&&"Z">=a||a>="0"&&"9">=a||"_"===a}function j(){}function k(){}function l(a){this.runtime=a}function m(a){this._interpreter=a,this.functionTable={abs:{_func:this._functionAbs,_signature:[{types:[r]}]},avg:{_func:this._functionAvg,_signature:[{types:[z]}]},ceil:{_func:this._functionCeil,_signature:[{types:[r]}]},contains:{_func:this._functionContains,_signature:[{types:[t,u]},{types:[s]}]},ends_with:{_func:this._functionEndsWith,_signature:[{types:[t]},{types:[t]}]},floor:{_func:this._functionFloor,_signature:[{types:[r]}]},length:{_func:this._functionLength,_signature:[{types:[t,u,v]}]},map:{_func:this._functionMap,_signature:[{types:[x]},{types:[u]}]},max:{_func:this._functionMax,_signature:[{types:[z,A]}]},merge:{_func:this._functionMerge,_signature:[{types:[v],variadic:!0}]},max_by:{_func:this._functionMaxBy,_signature:[{types:[u]},{types:[x]}]},sum:{_func:this._functionSum,_signature:[{types:[z]}]},starts_with:{_func:this._functionStartsWith,_signature:[{types:[t]},{types:[t]}]},min:{_func:this._functionMin,_signature:[{types:[z,A]}]},min_by:{_func:this._functionMinBy,_signature:[{types:[u]},{types:[x]}]},type:{_func:this._functionType,_signature:[{types:[s]}]},keys:{_func:this._functionKeys,_signature:[{types:[v]}]},values:{_func:this._functionValues,_signature:[{types:[v]}]},sort:{_func:this._functionSort,_signature:[{types:[A,z]}]},sort_by:{_func:this._functionSortBy,_signature:[{types:[u]},{types:[x]}]},join:{_func:this._functionJoin,_signature:[{types:[t]},{types:[A]}]},reverse:{_func:this._functionReverse,_signature:[{types:[t,u]}]},to_array:{_func:this._functionToArray,_signature:[{types:[s]}]},to_string:{_func:this._functionToString,_signature:[{types:[s]}]},to_number:{_func:this._functionToNumber,_signature:[{types:[s]}]},not_null:{_func:this._functionNotNull,_signature:[{types:[s],variadic:!0}]}}}function n(a){var b=new k,c=b.parse(a);return c}function o(a){var b=new j;return b.tokenize(a)}function p(a,b){var c=new k,d=new m,e=new l(d);d._interpreter=e;var f=c.parse(b);return e.search(f,a)}var q;q="function"==typeof String.prototype.trimLeft?function(a){return a.trimLeft()}:function(a){return a.match(/^\s*(.*)/)[1]};var r=0,s=1,t=2,u=3,v=4,w=5,x=6,y=7,z=8,A=9,B="EOF",C="UnquotedIdentifier",D="QuotedIdentifier",E="Rbracket",F="Rparen",G="Comma",H="Colon",I="Rbrace",J="Number",K="Current",L="Expref",M="Pipe",N="Or",O="And",P="EQ",Q="GT",R="LT",S="GTE",T="LTE",U="NE",V="Flatten",W="Star",X="Filter",Y="Dot",Z="Not",$="Lbrace",_="Lbracket",aa="Lparen",ba="Literal",ca={".":Y,"*":W,",":G,":":H,"{":$,"}":I,"]":E,"(":aa,")":F,"@":K},da={"<":!0,">":!0,"=":!0,"!":!0},ea={" ":!0,"	":!0,"\n":!0};j.prototype={tokenize:function(a){var b=[];this._current=0;for(var c,d,e;this._current<a.length;)if(g(a[this._current]))c=this._current,d=this._consumeUnquotedIdentifier(a),b.push({type:C,value:d,start:c});else if(void 0!==ca[a[this._current]])b.push({type:ca[a[this._current]],value:a[this._current],start:this._current}),this._current++;else if(h(a[this._current]))e=this._consumeNumber(a),b.push(e);else if("["===a[this._current])e=this._consumeLBracket(a),b.push(e);else if('"'===a[this._current])c=this._current,d=this._consumeQuotedIdentifier(a),b.push({type:D,value:d,start:c});else if("'"===a[this._current])c=this._current,d=this._consumeRawStringLiteral(a),b.push({type:ba,value:d,start:c});else if("`"===a[this._current]){c=this._current;var f=this._consumeLiteral(a);b.push({
type:ba,value:f,start:c})}else if(void 0!==da[a[this._current]])b.push(this._consumeOperator(a));else if(void 0!==ea[a[this._current]])this._current++;else if("&"===a[this._current])c=this._current,this._current++,"&"===a[this._current]?(this._current++,b.push({type:O,value:"&&",start:c})):b.push({type:L,value:"&",start:c});else{if("|"!==a[this._current]){var i=new Error("Unknown character:"+a[this._current]);throw i.name="LexerError",i}c=this._current,this._current++,"|"===a[this._current]?(this._current++,b.push({type:N,value:"||",start:c})):b.push({type:M,value:"|",start:c})}return b},_consumeUnquotedIdentifier:function(a){var b=this._current;for(this._current++;this._current<a.length&&i(a[this._current]);)this._current++;return a.slice(b,this._current)},_consumeQuotedIdentifier:function(a){var b=this._current;this._current++;for(var c=a.length;'"'!==a[this._current]&&this._current<c;){var d=this._current;"\\"!==a[d]||"\\"!==a[d+1]&&'"'!==a[d+1]?d++:d+=2,this._current=d}return this._current++,JSON.parse(a.slice(b,this._current))},_consumeRawStringLiteral:function(a){var b=this._current;this._current++;for(var c=a.length;"'"!==a[this._current]&&this._current<c;){var d=this._current;"\\"!==a[d]||"\\"!==a[d+1]&&"'"!==a[d+1]?d++:d+=2,this._current=d}this._current++;var e=a.slice(b+1,this._current-1);return e.replace("\\'","'")},_consumeNumber:function(a){var b=this._current;this._current++;for(var c=a.length;h(a[this._current])&&this._current<c;)this._current++;var d=parseInt(a.slice(b,this._current));return{type:J,value:d,start:b}},_consumeLBracket:function(a){var b=this._current;return this._current++,"?"===a[this._current]?(this._current++,{type:X,value:"[?",start:b}):"]"===a[this._current]?(this._current++,{type:V,value:"[]",start:b}):{type:_,value:"[",start:b}},_consumeOperator:function(a){var b=this._current,c=a[b];return this._current++,"!"===c?"="===a[this._current]?(this._current++,{type:U,value:"!=",start:b}):{type:Z,value:"!",start:b}:"<"===c?"="===a[this._current]?(this._current++,{type:T,value:"<=",start:b}):{type:R,value:"<",start:b}:">"===c?"="===a[this._current]?(this._current++,{type:S,value:">=",start:b}):{type:Q,value:">",start:b}:"="===c&&"="===a[this._current]?(this._current++,{type:P,value:"==",start:b}):void 0},_consumeLiteral:function(a){this._current++;for(var b,c=this._current,d=a.length;"`"!==a[this._current]&&this._current<d;){var e=this._current;"\\"!==a[e]||"\\"!==a[e+1]&&"`"!==a[e+1]?e++:e+=2,this._current=e}var f=q(a.slice(c,this._current));return f=f.replace("\\`","`"),b=this._looksLikeJSON(f)?JSON.parse(f):JSON.parse('"'+f+'"'),this._current++,b},_looksLikeJSON:function(a){var b='[{"',c=["true","false","null"],d="-0123456789";if(""===a)return!1;if(b.indexOf(a[0])>=0)return!0;if(c.indexOf(a)>=0)return!0;if(!(d.indexOf(a[0])>=0))return!1;try{return JSON.parse(a),!0}catch(e){return!1}}};var fa={};fa[B]=0,fa[C]=0,fa[D]=0,fa[E]=0,fa[F]=0,fa[G]=0,fa[I]=0,fa[J]=0,fa[K]=0,fa[L]=0,fa[M]=1,fa[N]=2,fa[O]=3,fa[P]=5,fa[Q]=5,fa[R]=5,fa[S]=5,fa[T]=5,fa[U]=5,fa[V]=9,fa[W]=20,fa[X]=21,fa[Y]=40,fa[Z]=45,fa[$]=50,fa[_]=55,fa[aa]=60,k.prototype={parse:function(a){this._loadTokens(a),this.index=0;var b=this.expression(0);if(this._lookahead(0)!==B){var c=this._lookaheadToken(0),d=new Error("Unexpected token type: "+c.type+", value: "+c.value);throw d.name="ParserError",d}return b},_loadTokens:function(a){var b=new j,c=b.tokenize(a);c.push({type:B,value:"",start:a.length}),this.tokens=c},expression:function(a){var b=this._lookaheadToken(0);this._advance();for(var c=this.nud(b),d=this._lookahead(0);a<fa[d];)this._advance(),c=this.led(d,c),d=this._lookahead(0);return c},_lookahead:function(a){return this.tokens[this.index+a].type},_lookaheadToken:function(a){return this.tokens[this.index+a]},_advance:function(){this.index++},nud:function(a){var b,c,d;switch(a.type){case ba:return{type:"Literal",value:a.value};case C:return{type:"Field",name:a.value};case D:var e={type:"Field",name:a.value};if(this._lookahead(0)===aa)throw new Error("Quoted identifier not allowed for function names.");return e;case Z:return c=this.expression(fa.Not),{type:"NotExpression",children:[c]};case W:return b={type:"Identity"},c=null,c=this._lookahead(0)===E?{type:"Identity"}:this._parseProjectionRHS(fa.Star),{type:"ValueProjection",children:[b,c]};case X:return this.led(a.type,{type:"Identity"});case $:return this._parseMultiselectHash();case V:return b={type:V,children:[{type:"Identity"}]},c=this._parseProjectionRHS(fa.Flatten),{type:"Projection",children:[b,c]};case _:return this._lookahead(0)===J||this._lookahead(0)===H?(c=this._parseIndexExpression(),this._projectIfSlice({type:"Identity"},c)):this._lookahead(0)===W&&this._lookahead(1)===E?(this._advance(),this._advance(),c=this._parseProjectionRHS(fa.Star),{type:"Projection",children:[{type:"Identity"},c]}):this._parseMultiselectList();case K:return{type:K};case L:return d=this.expression(fa.Expref),{type:"ExpressionReference",children:[d]};case aa:for(var f=[];this._lookahead(0)!==F;)this._lookahead(0)===K?(d={type:K},this._advance()):d=this.expression(0),f.push(d);return this._match(F),f[0];default:this._errorToken(a)}},led:function(a,b){var c;switch(a){case Y:var d=fa.Dot;return this._lookahead(0)!==W?(c=this._parseDotRHS(d),{type:"Subexpression",children:[b,c]}):(this._advance(),c=this._parseProjectionRHS(d),{type:"ValueProjection",children:[b,c]});case M:return c=this.expression(fa.Pipe),{type:M,children:[b,c]};case N:return c=this.expression(fa.Or),{type:"OrExpression",children:[b,c]};case O:return c=this.expression(fa.And),{type:"AndExpression",children:[b,c]};case aa:for(var e,f,g=b.name,h=[];this._lookahead(0)!==F;)this._lookahead(0)===K?(e={type:K},this._advance()):e=this.expression(0),this._lookahead(0)===G&&this._match(G),h.push(e);return this._match(F),f={type:"Function",name:g,children:h};case X:var i=this.expression(0);return this._match(E),c=this._lookahead(0)===V?{type:"Identity"}:this._parseProjectionRHS(fa.Filter),{type:"FilterProjection",children:[b,c,i]};case V:var j={type:V,children:[b]},k=this._parseProjectionRHS(fa.Flatten);return{type:"Projection",children:[j,k]};case P:case U:case Q:case S:case R:case T:return this._parseComparator(b,a);case _:var l=this._lookaheadToken(0);return l.type===J||l.type===H?(c=this._parseIndexExpression(),this._projectIfSlice(b,c)):(this._match(W),this._match(E),c=this._parseProjectionRHS(fa.Star),{type:"Projection",children:[b,c]});default:this._errorToken(this._lookaheadToken(0))}},_match:function(a){if(this._lookahead(0)!==a){var b=this._lookaheadToken(0),c=new Error("Expected "+a+", got: "+b.type);throw c.name="ParserError",c}this._advance()},_errorToken:function(a){var b=new Error("Invalid token ("+a.type+'): "'+a.value+'"');throw b.name="ParserError",b},_parseIndexExpression:function(){if(this._lookahead(0)===H||this._lookahead(1)===H)return this._parseSliceExpression();var a={type:"Index",value:this._lookaheadToken(0).value};return this._advance(),this._match(E),a},_projectIfSlice:function(a,b){var c={type:"IndexExpression",children:[a,b]};return"Slice"===b.type?{type:"Projection",children:[c,this._parseProjectionRHS(fa.Star)]}:c},_parseSliceExpression:function(){for(var a=[null,null,null],b=0,c=this._lookahead(0);c!==E&&3>b;){if(c===H)b++,this._advance();else{if(c!==J){var d=this._lookahead(0),e=new Error("Syntax error, unexpected token: "+d.value+"("+d.type+")");throw e.name="Parsererror",e}a[b]=this._lookaheadToken(0).value,this._advance()}c=this._lookahead(0)}return this._match(E),{type:"Slice",children:a}},_parseComparator:function(a,b){var c=this.expression(fa[b]);return{type:"Comparator",name:b,children:[a,c]}},_parseDotRHS:function(a){var b=this._lookahead(0),c=[C,D,W];return c.indexOf(b)>=0?this.expression(a):b===_?(this._match(_),this._parseMultiselectList()):b===$?(this._match($),this._parseMultiselectHash()):void 0},_parseProjectionRHS:function(a){var b;if(fa[this._lookahead(0)]<10)b={type:"Identity"};else if(this._lookahead(0)===_)b=this.expression(a);else if(this._lookahead(0)===X)b=this.expression(a);else{if(this._lookahead(0)!==Y){var c=this._lookaheadToken(0),d=new Error("Sytanx error, unexpected token: "+c.value+"("+c.type+")");throw d.name="ParserError",d}this._match(Y),b=this._parseDotRHS(a)}return b},_parseMultiselectList:function(){for(var a=[];this._lookahead(0)!==E;){var b=this.expression(0);if(a.push(b),this._lookahead(0)===G&&(this._match(G),this._lookahead(0)===E))throw new Error("Unexpected token Rbracket")}return this._match(E),{type:"MultiSelectList",children:a}},_parseMultiselectHash:function(){for(var a,b,c,d,e=[],f=[C,D];;){if(a=this._lookaheadToken(0),f.indexOf(a.type)<0)throw new Error("Expecting an identifier token, got: "+a.type);if(b=a.value,this._advance(),this._match(H),c=this.expression(0),d={type:"KeyValuePair",name:b,value:c},e.push(d),this._lookahead(0)===G)this._match(G);else if(this._lookahead(0)===I){this._match(I);break}}return{type:"MultiSelectHash",children:e}}},l.prototype={search:function(a,b){return this.visit(a,b)},visit:function(a,g){var h,i,j,k,l,m,n,o,p,q;switch(a.type){case"Field":return null===g?null:c(g)?(m=g[a.name],void 0===m?null:m):null;case"Subexpression":for(j=this.visit(a.children[0],g),q=1;q<a.children.length;q++)if(j=this.visit(a.children[1],j),null===j)return null;return j;case"IndexExpression":return n=this.visit(a.children[0],g),o=this.visit(a.children[1],n);case"Index":if(!b(g))return null;var r=a.value;return 0>r&&(r=g.length+r),j=g[r],void 0===j&&(j=null),j;case"Slice":if(!b(g))return null;var s=a.children.slice(0),t=this.computeSliceParams(g.length,s),u=t[0],v=t[1],w=t[2];if(j=[],w>0)for(q=u;v>q;q+=w)j.push(g[q]);else for(q=u;q>v;q+=w)j.push(g[q]);return j;case"Projection":var x=this.visit(a.children[0],g);if(!b(x))return null;for(p=[],q=0;q<x.length;q++)i=this.visit(a.children[1],x[q]),null!==i&&p.push(i);return p;case"ValueProjection":if(x=this.visit(a.children[0],g),!c(x))return null;p=[];var y=f(x);for(q=0;q<y.length;q++)i=this.visit(a.children[1],y[q]),null!==i&&p.push(i);return p;case"FilterProjection":if(x=this.visit(a.children[0],g),!b(x))return null;var z=[],A=[];for(q=0;q<x.length;q++)h=this.visit(a.children[2],x[q]),e(h)||z.push(x[q]);for(var B=0;B<z.length;B++)i=this.visit(a.children[1],z[B]),null!==i&&A.push(i);return A;case"Comparator":switch(k=this.visit(a.children[0],g),l=this.visit(a.children[1],g),a.name){case P:j=d(k,l);break;case U:j=!d(k,l);break;case Q:j=k>l;break;case S:j=k>=l;break;case R:j=l>k;break;case T:j=l>=k;break;default:throw new Error("Unknown comparator: "+a.name)}return j;case V:var C=this.visit(a.children[0],g);if(!b(C))return null;var D=[];for(q=0;q<C.length;q++)i=C[q],b(i)?D.push.apply(D,i):D.push(i);return D;case"Identity":return g;case"MultiSelectList":if(null===g)return null;for(p=[],q=0;q<a.children.length;q++)p.push(this.visit(a.children[q],g));return p;case"MultiSelectHash":if(null===g)return null;p={};var E;for(q=0;q<a.children.length;q++)E=a.children[q],p[E.name]=this.visit(E.value,g);return p;case"OrExpression":return h=this.visit(a.children[0],g),e(h)&&(h=this.visit(a.children[1],g)),h;case"AndExpression":return k=this.visit(a.children[0],g),e(k)===!0?k:this.visit(a.children[1],g);case"NotExpression":return k=this.visit(a.children[0],g),e(k);case"Literal":return a.value;case M:return n=this.visit(a.children[0],g),this.visit(a.children[1],n);case K:return g;case"Function":var F=[];for(q=0;q<a.children.length;q++)F.push(this.visit(a.children[q],g));return this.runtime.callFunction(a.name,F);case"ExpressionReference":var G=a.children[0];return G.jmespathType=L,G;default:throw new Error("Unknown node type: "+a.type)}},computeSliceParams:function(a,b){var c=b[0],d=b[1],e=b[2],f=[null,null,null];if(null===e)e=1;else if(0===e){var g=new Error("Invalid slice, step cannot be 0");throw g.name="RuntimeError",g}var h=0>e;return c=null===c?h?a-1:0:this.capSliceRange(a,c,e),d=null===d?h?-1:a:this.capSliceRange(a,d,e),f[0]=c,f[1]=d,f[2]=e,f},capSliceRange:function(a,b,c){return 0>b?(b+=a,0>b&&(b=0>c?-1:0)):b>=a&&(b=0>c?a-1:a),b}},m.prototype={callFunction:function(a,b){var c=this.functionTable[a];if(void 0===c)throw new Error("Unknown function: "+a+"()");return this._validateArgs(a,b,c._signature),c._func.call(this,b)},_validateArgs:function(a,b,c){var d;if(c[c.length-1].variadic){if(b.length<c.length)throw d=1===c.length?" argument":" arguments",new Error("ArgumentError: "+a+"() takes at least"+c.length+d+" but received "+b.length)}else if(b.length!==c.length)throw d=1===c.length?" argument":" arguments",new Error("ArgumentError: "+a+"() takes "+c.length+d+" but received "+b.length);for(var e,f,g,h=0;h<c.length;h++){g=!1,e=c[h].types,f=this._getTypeName(b[h]);for(var i=0;i<e.length;i++)if(this._typeMatches(f,e[i],b[h])){g=!0;break}if(!g)throw new Error("TypeError: "+a+"() expected argument "+(h+1)+" to be type "+e+" but received type "+f+" instead.")}},_typeMatches:function(a,b,c){if(b===s)return!0;if(b!==A&&b!==z&&b!==u)return a===b;if(b===u)return a===u;if(a===u){var d;b===z?d=r:b===A&&(d=t);for(var e=0;e<c.length;e++)if(!this._typeMatches(this._getTypeName(c[e]),d,c[e]))return!1;return!0}},_getTypeName:function(a){switch(Object.prototype.toString.call(a)){case"[object String]":return t;case"[object Number]":return r;case"[object Array]":return u;case"[object Boolean]":return w;case"[object Null]":return y;case"[object Object]":return a.jmespathType===L?x:v}},_functionStartsWith:function(a){return 0===a[0].lastIndexOf(a[1])},_functionEndsWith:function(a){var b=a[0],c=a[1];return-1!==b.indexOf(c,b.length-c.length)},_functionReverse:function(a){var b=this._getTypeName(a[0]);if(b===t){for(var c=a[0],d="",e=c.length-1;e>=0;e--)d+=c[e];return d}var f=a[0].slice(0);return f.reverse(),f},_functionAbs:function(a){return Math.abs(a[0])},_functionCeil:function(a){return Math.ceil(a[0])},_functionAvg:function(a){for(var b=0,c=a[0],d=0;d<c.length;d++)b+=c[d];return b/c.length},_functionContains:function(a){return a[0].indexOf(a[1])>=0},_functionFloor:function(a){return Math.floor(a[0])},_functionLength:function(a){return c(a[0])?Object.keys(a[0]).length:a[0].length},_functionMap:function(a){for(var b=[],c=this._interpreter,d=a[0],e=a[1],f=0;f<e.length;f++)b.push(c.visit(d,e[f]));return b},_functionMerge:function(a){for(var b={},c=0;c<a.length;c++){var d=a[c];for(var e in d)b[e]=d[e]}return b},_functionMax:function(a){if(a[0].length>0){var b=this._getTypeName(a[0][0]);if(b===r)return Math.max.apply(Math,a[0]);for(var c=a[0],d=c[0],e=1;e<c.length;e++)d.localeCompare(c[e])<0&&(d=c[e]);return d}return null},_functionMin:function(a){if(a[0].length>0){var b=this._getTypeName(a[0][0]);if(b===r)return Math.min.apply(Math,a[0]);for(var c=a[0],d=c[0],e=1;e<c.length;e++)c[e].localeCompare(d)<0&&(d=c[e]);return d}return null},_functionSum:function(a){for(var b=0,c=a[0],d=0;d<c.length;d++)b+=c[d];return b},_functionType:function(a){switch(this._getTypeName(a[0])){case r:return"number";case t:return"string";case u:return"array";case v:return"object";case w:return"boolean";case x:return"expref";case y:return"null"}},_functionKeys:function(a){return Object.keys(a[0])},_functionValues:function(a){for(var b=a[0],c=Object.keys(b),d=[],e=0;e<c.length;e++)d.push(b[c[e]]);return d},_functionJoin:function(a){var b=a[0],c=a[1];return c.join(b)},_functionToArray:function(a){return this._getTypeName(a[0])===u?a[0]:[a[0]]},_functionToString:function(a){return this._getTypeName(a[0])===t?a[0]:JSON.stringify(a[0])},_functionToNumber:function(a){var b,c=this._getTypeName(a[0]);return c===r?a[0]:c!==t||(b=+a[0],isNaN(b))?null:b},_functionNotNull:function(a){for(var b=0;b<a.length;b++)if(this._getTypeName(a[b])!==y)return a[b];return null},_functionSort:function(a){var b=a[0].slice(0);return b.sort(),b},_functionSortBy:function(a){var b=a[0].slice(0);if(0===b.length)return b;var c=this._interpreter,d=a[1],e=this._getTypeName(c.visit(d,b[0]));if([r,t].indexOf(e)<0)throw new Error("TypeError");for(var f=this,g=[],h=0;h<b.length;h++)g.push([h,b[h]]);g.sort(function(a,b){var g=c.visit(d,a[1]),h=c.visit(d,b[1]);if(f._getTypeName(g)!==e)throw new Error("TypeError: expected "+e+", received "+f._getTypeName(g));if(f._getTypeName(h)!==e)throw new Error("TypeError: expected "+e+", received "+f._getTypeName(h));return g>h?1:h>g?-1:a[0]-b[0]});for(var i=0;i<g.length;i++)b[i]=g[i][1];return b},_functionMaxBy:function(a){for(var b,c,d=a[1],e=a[0],f=this.createKeyFunction(d,[r,t]),g=-(1/0),h=0;h<e.length;h++)c=f(e[h]),c>g&&(g=c,b=e[h]);return b},_functionMinBy:function(a){for(var b,c,d=a[1],e=a[0],f=this.createKeyFunction(d,[r,t]),g=1/0,h=0;h<e.length;h++)c=f(e[h]),g>c&&(g=c,b=e[h]);return b},createKeyFunction:function(a,b){var c=this,d=this._interpreter,e=function(e){var f=d.visit(a,e);if(b.indexOf(c._getTypeName(f))<0){var g="TypeError: expected one of "+b+", received "+c._getTypeName(f);throw new Error(g)}return f};return e}},a.tokenize=o,a.compile=n,a.search=p,a.strictDeepEqual=d}("undefined"==typeof c?this.jmespath={}:c)},{}],80:[function(a,b,c){"use strict";function d(a,b){return Object.prototype.hasOwnProperty.call(a,b)}b.exports=function(a,b,c,e){b=b||"&",c=c||"=";var f={};if("string"!=typeof a||0===a.length)return f;var g=/\+/g;a=a.split(b);var h=1e3;e&&"number"==typeof e.maxKeys&&(h=e.maxKeys);var i=a.length;h>0&&i>h&&(i=h);for(var j=0;i>j;++j){var k,l,m,n,o=a[j].replace(g,"%20"),p=o.indexOf(c);p>=0?(k=o.substr(0,p),l=o.substr(p+1)):(k=o,l=""),m=decodeURIComponent(k),n=decodeURIComponent(l),d(f,m)?Array.isArray(f[m])?f[m].push(n):f[m]=[f[m],n]:f[m]=n}return f}},{}],81:[function(a,b,c){"use strict";var d=function(a){switch(typeof a){case"string":return a;case"boolean":return a?"true":"false";case"number":return isFinite(a)?a:"";default:return""}};b.exports=function(a,b,c,e){return b=b||"&",c=c||"=",null===a&&(a=void 0),"object"==typeof a?Object.keys(a).map(function(e){var f=encodeURIComponent(d(e))+c;return Array.isArray(a[e])?a[e].map(function(a){return f+encodeURIComponent(d(a))}).join(b):f+encodeURIComponent(d(a[e]))}).join(b):e?encodeURIComponent(d(e))+c+encodeURIComponent(d(a)):""}},{}],82:[function(a,b,c){arguments[4][66][0].apply(c,arguments)},{"./decode":80,"./encode":81}],83:[function(a,b,c){function d(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function e(a,b,c){if(a&&j(a)&&a instanceof d)return a;var e=new d;return e.parse(a,b,c),e}function f(a){return i(a)&&(a=e(a)),a instanceof d?a.format():d.prototype.format.call(a)}function g(a,b){return e(a,!1,!0).resolve(b)}function h(a,b){return a?e(a,!1,!0).resolveObject(b):b}function i(a){return"string"==typeof a}function j(a){return"object"==typeof a&&null!==a}function k(a){return null===a}function l(a){return null==a}var m=a("punycode");c.parse=e,c.resolve=g,c.resolveObject=h,c.format=f,c.Url=d;var n=/^([a-z0-9.+-]+:)/i,o=/:[0-9]*$/,p=["<",">",'"',"`"," ","\r","\n","	"],q=["{","}","|","\\","^","`"].concat(p),r=["'"].concat(q),s=["%","/","?",";","#"].concat(r),t=["/","?","#"],u=255,v=/^[a-z0-9A-Z_-]{0,63}$/,w=/^([a-z0-9A-Z_-]{0,63})(.*)$/,x={javascript:!0,"javascript:":!0},y={javascript:!0,"javascript:":!0},z={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},A=a("querystring");d.prototype.parse=function(a,b,c){if(!i(a))throw new TypeError("Parameter 'url' must be a string, not "+typeof a);var d=a;d=d.trim();var e=n.exec(d);if(e){e=e[0];var f=e.toLowerCase();this.protocol=f,d=d.substr(e.length)}if(c||e||d.match(/^\/\/[^@\/]+@[^@\/]+/)){var g="//"===d.substr(0,2);!g||e&&y[e]||(d=d.substr(2),this.slashes=!0)}if(!y[e]&&(g||e&&!z[e])){for(var h=-1,j=0;j<t.length;j++){var k=d.indexOf(t[j]);-1!==k&&(-1===h||h>k)&&(h=k)}var l,o;o=-1===h?d.lastIndexOf("@"):d.lastIndexOf("@",h),-1!==o&&(l=d.slice(0,o),d=d.slice(o+1),this.auth=decodeURIComponent(l)),h=-1;for(var j=0;j<s.length;j++){var k=d.indexOf(s[j]);-1!==k&&(-1===h||h>k)&&(h=k)}-1===h&&(h=d.length),this.host=d.slice(0,h),d=d.slice(h),this.parseHost(),this.hostname=this.hostname||"";var p="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!p)for(var q=this.hostname.split(/\./),j=0,B=q.length;B>j;j++){var C=q[j];if(C&&!C.match(v)){for(var D="",E=0,F=C.length;F>E;E++)D+=C.charCodeAt(E)>127?"x":C[E];if(!D.match(v)){var G=q.slice(0,j),H=q.slice(j+1),I=C.match(w);I&&(G.push(I[1]),H.unshift(I[2])),H.length&&(d="/"+H.join(".")+d),this.hostname=G.join(".");break}}}if(this.hostname.length>u?this.hostname="":this.hostname=this.hostname.toLowerCase(),!p){for(var J=this.hostname.split("."),K=[],j=0;j<J.length;++j){var L=J[j];K.push(L.match(/[^A-Za-z0-9_-]/)?"xn--"+m.encode(L):L)}this.hostname=K.join(".")}var M=this.port?":"+this.port:"",N=this.hostname||"";this.host=N+M,this.href+=this.host,p&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==d[0]&&(d="/"+d))}if(!x[f])for(var j=0,B=r.length;B>j;j++){var O=r[j],P=encodeURIComponent(O);P===O&&(P=escape(O)),d=d.split(O).join(P)}var Q=d.indexOf("#");-1!==Q&&(this.hash=d.substr(Q),d=d.slice(0,Q));var R=d.indexOf("?");if(-1!==R?(this.search=d.substr(R),this.query=d.substr(R+1),b&&(this.query=A.parse(this.query)),d=d.slice(0,R)):b&&(this.search="",this.query={}),d&&(this.pathname=d),z[f]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var M=this.pathname||"",L=this.search||"";this.path=M+L}return this.href=this.format(),this},d.prototype.format=function(){var a=this.auth||"";a&&(a=encodeURIComponent(a),a=a.replace(/%3A/i,":"),a+="@");var b=this.protocol||"",c=this.pathname||"",d=this.hash||"",e=!1,f="";this.host?e=a+this.host:this.hostname&&(e=a+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(e+=":"+this.port)),this.query&&j(this.query)&&Object.keys(this.query).length&&(f=A.stringify(this.query));var g=this.search||f&&"?"+f||"";return b&&":"!==b.substr(-1)&&(b+=":"),this.slashes||(!b||z[b])&&e!==!1?(e="//"+(e||""),c&&"/"!==c.charAt(0)&&(c="/"+c)):e||(e=""),d&&"#"!==d.charAt(0)&&(d="#"+d),g&&"?"!==g.charAt(0)&&(g="?"+g),c=c.replace(/[?#]/g,function(a){return encodeURIComponent(a)}),g=g.replace("#","%23"),b+e+c+g+d},d.prototype.resolve=function(a){return this.resolveObject(e(a,!1,!0)).format()},d.prototype.resolveObject=function(a){if(i(a)){var b=new d;b.parse(a,!1,!0),a=b}var c=new d;if(Object.keys(this).forEach(function(a){c[a]=this[a]},this),c.hash=a.hash,""===a.href)return c.href=c.format(),c;if(a.slashes&&!a.protocol)return Object.keys(a).forEach(function(b){"protocol"!==b&&(c[b]=a[b])}),z[c.protocol]&&c.hostname&&!c.pathname&&(c.path=c.pathname="/"),c.href=c.format(),c;if(a.protocol&&a.protocol!==c.protocol){if(!z[a.protocol])return Object.keys(a).forEach(function(b){c[b]=a[b]}),c.href=c.format(),c;if(c.protocol=a.protocol,a.host||y[a.protocol])c.pathname=a.pathname;else{for(var e=(a.pathname||"").split("/");e.length&&!(a.host=e.shift()););a.host||(a.host=""),a.hostname||(a.hostname=""),""!==e[0]&&e.unshift(""),e.length<2&&e.unshift(""),c.pathname=e.join("/")}if(c.search=a.search,c.query=a.query,c.host=a.host||"",c.auth=a.auth,c.hostname=a.hostname||a.host,c.port=a.port,c.pathname||c.search){var f=c.pathname||"",g=c.search||"";c.path=f+g}return c.slashes=c.slashes||a.slashes,c.href=c.format(),c}var h=c.pathname&&"/"===c.pathname.charAt(0),j=a.host||a.pathname&&"/"===a.pathname.charAt(0),m=j||h||c.host&&a.pathname,n=m,o=c.pathname&&c.pathname.split("/")||[],e=a.pathname&&a.pathname.split("/")||[],p=c.protocol&&!z[c.protocol];if(p&&(c.hostname="",c.port=null,c.host&&(""===o[0]?o[0]=c.host:o.unshift(c.host)),c.host="",a.protocol&&(a.hostname=null,a.port=null,a.host&&(""===e[0]?e[0]=a.host:e.unshift(a.host)),a.host=null),m=m&&(""===e[0]||""===o[0])),j)c.host=a.host||""===a.host?a.host:c.host,c.hostname=a.hostname||""===a.hostname?a.hostname:c.hostname,c.search=a.search,c.query=a.query,o=e;else if(e.length)o||(o=[]),o.pop(),o=o.concat(e),c.search=a.search,c.query=a.query;else if(!l(a.search)){if(p){c.hostname=c.host=o.shift();var q=c.host&&c.host.indexOf("@")>0?c.host.split("@"):!1;q&&(c.auth=q.shift(),c.host=c.hostname=q.shift())}return c.search=a.search,c.query=a.query,k(c.pathname)&&k(c.search)||(c.path=(c.pathname?c.pathname:"")+(c.search?c.search:"")),c.href=c.format(),c}if(!o.length)return c.pathname=null,c.search?c.path="/"+c.search:c.path=null,c.href=c.format(),c;for(var r=o.slice(-1)[0],s=(c.host||a.host)&&("."===r||".."===r)||""===r,t=0,u=o.length;u>=0;u--)r=o[u],"."==r?o.splice(u,1):".."===r?(o.splice(u,1),t++):t&&(o.splice(u,1),t--);if(!m&&!n)for(;t--;t)o.unshift("..");!m||""===o[0]||o[0]&&"/"===o[0].charAt(0)||o.unshift(""),s&&"/"!==o.join("/").substr(-1)&&o.push("");var v=""===o[0]||o[0]&&"/"===o[0].charAt(0);if(p){c.hostname=c.host=v?"":o.length?o.shift():"";var q=c.host&&c.host.indexOf("@")>0?c.host.split("@"):!1;q&&(c.auth=q.shift(),c.host=c.hostname=q.shift())}return m=m||c.host&&o.length,m&&!v&&o.unshift(""),o.length?c.pathname=o.join("/"):(c.pathname=null,c.path=null),k(c.pathname)&&k(c.search)||(c.path=(c.pathname?c.pathname:"")+(c.search?c.search:"")),c.auth=a.auth||c.auth,c.slashes=c.slashes||a.slashes,c.href=c.format(),c},d.prototype.parseHost=function(){var a=this.host,b=o.exec(a);b&&(b=b[0],":"!==b&&(this.port=b.substr(1)),a=a.substr(0,a.length-b.length)),a&&(this.hostname=a)}},{punycode:63,querystring:66}],84:[function(a,b,c){(function(){var c,d;d=a("lodash/object/create"),b.exports=c=function(){function a(a,b,c){if(this.stringify=a.stringify,null==b)throw new Error("Missing attribute name of element "+a.name);if(null==c)throw new Error("Missing attribute value for attribute "+b+" of element "+a.name);this.name=this.stringify.attName(b),this.value=this.stringify.attValue(c)}return a.prototype.clone=function(){return d(a.prototype,this)},a.prototype.toString=function(a,b){return" "+this.name+'="'+this.value+'"'},a}()}).call(this)},{"lodash/object/create":143}],85:[function(a,b,c){(function(){var c,d,e,f,g;g=a("./XMLStringifier"),d=a("./XMLDeclaration"),e=a("./XMLDocType"),f=a("./XMLElement"),b.exports=c=function(){function a(a,b){var c,d;if(null==a)throw new Error("Root element needs a name");null==b&&(b={}),this.options=b,this.stringify=new g(b),d=new f(this,"doc"),c=d.element(a),c.isRoot=!0,c.documentObject=this,this.rootObject=c,b.headless||(c.declaration(b),null==b.pubID&&null==b.sysID||c.doctype(b))}return a.prototype.root=function(){return this.rootObject},a.prototype.end=function(a){return this.toString(a)},a.prototype.toString=function(a){var b,c,d,e,f,g,h,i;return e=(null!=a?a.pretty:void 0)||!1,b=null!=(g=null!=a?a.indent:void 0)?g:"  ",d=null!=(h=null!=a?a.offset:void 0)?h:0,c=null!=(i=null!=a?a.newline:void 0)?i:"\n",f="",null!=this.xmldec&&(f+=this.xmldec.toString(a)),null!=this.doctype&&(f+=this.doctype.toString(a)),f+=this.rootObject.toString(a),e&&f.slice(-c.length)===c&&(f=f.slice(0,-c.length)),f},a}()}).call(this)},{"./XMLDeclaration":92,"./XMLDocType":93,"./XMLElement":94,"./XMLStringifier":98}],86:[function(a,b,c){(function(){var c,d,e,f=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},g={}.hasOwnProperty;e=a("lodash/object/create"),d=a("./XMLNode"),b.exports=c=function(a){function b(a,c){if(b.__super__.constructor.call(this,a),null==c)throw new Error("Missing CDATA text");this.text=this.stringify.cdata(c)}return f(b,a),b.prototype.clone=function(){return e(b.prototype,this)},b.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+="<![CDATA["+this.text+"]]>",f&&(g+=d),g},b}(d)}).call(this)},{"./XMLNode":95,"lodash/object/create":143}],87:[function(a,b,c){(function(){var c,d,e,f=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},g={}.hasOwnProperty;e=a("lodash/object/create"),d=a("./XMLNode"),b.exports=c=function(a){function b(a,c){if(b.__super__.constructor.call(this,a),null==c)throw new Error("Missing comment text");this.text=this.stringify.comment(c)}return f(b,a),b.prototype.clone=function(){return e(b.prototype,this)},b.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+="<!-- "+this.text+" -->",f&&(g+=d),g},b}(d)}).call(this)},{"./XMLNode":95,"lodash/object/create":143}],88:[function(a,b,c){(function(){var c,d;d=a("lodash/object/create"),b.exports=c=function(){function a(a,b,c,d,e,f){if(this.stringify=a.stringify,null==b)throw new Error("Missing DTD element name");if(null==c)throw new Error("Missing DTD attribute name");if(!d)throw new Error("Missing DTD attribute type");if(!e)throw new Error("Missing DTD attribute default");if(0!==e.indexOf("#")&&(e="#"+e),!e.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/))throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");if(f&&!e.match(/^(#FIXED|#DEFAULT)$/))throw new Error("Default value only applies to #FIXED or #DEFAULT");this.elementName=this.stringify.eleName(b),this.attributeName=this.stringify.attName(c),this.attributeType=this.stringify.dtdAttType(d),this.defaultValue=this.stringify.dtdAttDefault(f),this.defaultValueType=e}return a.prototype.clone=function(){return d(a.prototype,this)},a.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+="<!ATTLIST "+this.elementName+" "+this.attributeName+" "+this.attributeType,"#DEFAULT"!==this.defaultValueType&&(g+=" "+this.defaultValueType),this.defaultValue&&(g+=' "'+this.defaultValue+'"'),g+=">",f&&(g+=d),g},a}()}).call(this)},{"lodash/object/create":143}],89:[function(a,b,c){(function(){var c,d,e;d=a("lodash/object/create"),e=a("lodash/lang/isArray"),b.exports=c=function(){function a(a,b,c){if(this.stringify=a.stringify,null==b)throw new Error("Missing DTD element name");c||(c="(#PCDATA)"),e(c)&&(c="("+c.join(",")+")"),this.name=this.stringify.eleName(b),this.value=this.stringify.dtdElementValue(c)}return a.prototype.clone=function(){return d(a.prototype,this)},a.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+="<!ELEMENT "+this.name+" "+this.value+">",f&&(g+=d),g},a}()}).call(this)},{"lodash/lang/isArray":135,"lodash/object/create":143}],90:[function(a,b,c){(function(){var c,d,e;d=a("lodash/object/create"),e=a("lodash/lang/isObject"),b.exports=c=function(){function a(a,b,c,d){if(this.stringify=a.stringify,null==c)throw new Error("Missing entity name");if(null==d)throw new Error("Missing entity value");if(this.pe=!!b,this.name=this.stringify.eleName(c),e(d)){if(!d.pubID&&!d.sysID)throw new Error("Public and/or system identifiers are required for an external entity");if(d.pubID&&!d.sysID)throw new Error("System identifier is required for a public external entity");if(null!=d.pubID&&(this.pubID=this.stringify.dtdPubID(d.pubID)),null!=d.sysID&&(this.sysID=this.stringify.dtdSysID(d.sysID)),null!=d.nData&&(this.nData=this.stringify.dtdNData(d.nData)),this.pe&&this.nData)throw new Error("Notation declaration is not allowed in a parameter entity")}else this.value=this.stringify.dtdEntityValue(d)}return a.prototype.clone=function(){
return d(a.prototype,this)},a.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+="<!ENTITY",this.pe&&(g+=" %"),g+=" "+this.name,this.value?g+=' "'+this.value+'"':(this.pubID&&this.sysID?g+=' PUBLIC "'+this.pubID+'" "'+this.sysID+'"':this.sysID&&(g+=' SYSTEM "'+this.sysID+'"'),this.nData&&(g+=" NDATA "+this.nData)),g+=">",f&&(g+=d),g},a}()}).call(this)},{"lodash/lang/isObject":139,"lodash/object/create":143}],91:[function(a,b,c){(function(){var c,d;d=a("lodash/object/create"),b.exports=c=function(){function a(a,b,c){if(this.stringify=a.stringify,null==b)throw new Error("Missing notation name");if(!c.pubID&&!c.sysID)throw new Error("Public or system identifiers are required for an external entity");this.name=this.stringify.eleName(b),null!=c.pubID&&(this.pubID=this.stringify.dtdPubID(c.pubID)),null!=c.sysID&&(this.sysID=this.stringify.dtdSysID(c.sysID))}return a.prototype.clone=function(){return d(a.prototype,this)},a.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+="<!NOTATION "+this.name,this.pubID&&this.sysID?g+=' PUBLIC "'+this.pubID+'" "'+this.sysID+'"':this.pubID?g+=' PUBLIC "'+this.pubID+'"':this.sysID&&(g+=' SYSTEM "'+this.sysID+'"'),g+=">",f&&(g+=d),g},a}()}).call(this)},{"lodash/object/create":143}],92:[function(a,b,c){(function(){var c,d,e,f,g=function(a,b){function c(){this.constructor=a}for(var d in b)h.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},h={}.hasOwnProperty;e=a("lodash/object/create"),f=a("lodash/lang/isObject"),d=a("./XMLNode"),b.exports=c=function(a){function b(a,c,d,e){var g;b.__super__.constructor.call(this,a),f(c)&&(g=c,c=g.version,d=g.encoding,e=g.standalone),c||(c="1.0"),null!=c&&(this.version=this.stringify.xmlVersion(c)),null!=d&&(this.encoding=this.stringify.xmlEncoding(d)),null!=e&&(this.standalone=this.stringify.xmlStandalone(e))}return g(b,a),b.prototype.clone=function(){return e(b.prototype,this)},b.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+="<?xml",null!=this.version&&(g+=' version="'+this.version+'"'),null!=this.encoding&&(g+=' encoding="'+this.encoding+'"'),null!=this.standalone&&(g+=' standalone="'+this.standalone+'"'),g+="?>",f&&(g+=d),g},b}(d)}).call(this)},{"./XMLNode":95,"lodash/lang/isObject":139,"lodash/object/create":143}],93:[function(a,b,c){(function(){var c,d,e,f,g,h,i,j,k,l;k=a("lodash/object/create"),l=a("lodash/lang/isObject"),c=a("./XMLCData"),d=a("./XMLComment"),e=a("./XMLDTDAttList"),g=a("./XMLDTDEntity"),f=a("./XMLDTDElement"),h=a("./XMLDTDNotation"),j=a("./XMLProcessingInstruction"),b.exports=i=function(){function a(a,b,c){var d,e;this.documentObject=a,this.stringify=this.documentObject.stringify,this.children=[],l(b)&&(d=b,b=d.pubID,c=d.sysID),null==c&&(e=[b,c],c=e[0],b=e[1]),null!=b&&(this.pubID=this.stringify.dtdPubID(b)),null!=c&&(this.sysID=this.stringify.dtdSysID(c))}return a.prototype.clone=function(){return k(a.prototype,this)},a.prototype.element=function(a,b){var c;return c=new f(this,a,b),this.children.push(c),this},a.prototype.attList=function(a,b,c,d,f){var g;return g=new e(this,a,b,c,d,f),this.children.push(g),this},a.prototype.entity=function(a,b){var c;return c=new g(this,!1,a,b),this.children.push(c),this},a.prototype.pEntity=function(a,b){var c;return c=new g(this,!0,a,b),this.children.push(c),this},a.prototype.notation=function(a,b){var c;return c=new h(this,a,b),this.children.push(c),this},a.prototype.cdata=function(a){var b;return b=new c(this,a),this.children.push(b),this},a.prototype.comment=function(a){var b;return b=new d(this,a),this.children.push(b),this},a.prototype.instruction=function(a,b){var c;return c=new j(this,a,b),this.children.push(c),this},a.prototype.root=function(){return this.documentObject.root()},a.prototype.document=function(){return this.documentObject},a.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;if(i=(null!=a?a.pretty:void 0)||!1,e=null!=(k=null!=a?a.indent:void 0)?k:"  ",h=null!=(l=null!=a?a.offset:void 0)?l:0,g=null!=(m=null!=a?a.newline:void 0)?m:"\n",b||(b=0),o=new Array(b+h+1).join(e),j="",i&&(j+=o),j+="<!DOCTYPE "+this.root().name,this.pubID&&this.sysID?j+=' PUBLIC "'+this.pubID+'" "'+this.sysID+'"':this.sysID&&(j+=' SYSTEM "'+this.sysID+'"'),this.children.length>0){for(j+=" [",i&&(j+=g),n=this.children,d=0,f=n.length;f>d;d++)c=n[d],j+=c.toString(a,b+1);j+="]"}return j+=">",i&&(j+=g),j},a.prototype.ele=function(a,b){return this.element(a,b)},a.prototype.att=function(a,b,c,d,e){return this.attList(a,b,c,d,e)},a.prototype.ent=function(a,b){return this.entity(a,b)},a.prototype.pent=function(a,b){return this.pEntity(a,b)},a.prototype.not=function(a,b){return this.notation(a,b)},a.prototype.dat=function(a){return this.cdata(a)},a.prototype.com=function(a){return this.comment(a)},a.prototype.ins=function(a,b){return this.instruction(a,b)},a.prototype.up=function(){return this.root()},a.prototype.doc=function(){return this.document()},a}()}).call(this)},{"./XMLCData":86,"./XMLComment":87,"./XMLDTDAttList":88,"./XMLDTDElement":89,"./XMLDTDEntity":90,"./XMLDTDNotation":91,"./XMLProcessingInstruction":96,"lodash/lang/isObject":139,"lodash/object/create":143}],94:[function(a,b,c){(function(){var c,d,e,f,g,h,i,j,k,l=function(a,b){function c(){this.constructor=a}for(var d in b)m.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},m={}.hasOwnProperty;g=a("lodash/object/create"),k=a("lodash/lang/isObject"),i=a("lodash/lang/isArray"),j=a("lodash/lang/isFunction"),h=a("lodash/collection/every"),e=a("./XMLNode"),c=a("./XMLAttribute"),f=a("./XMLProcessingInstruction"),b.exports=d=function(a){function b(a,c,d){if(b.__super__.constructor.call(this,a),null==c)throw new Error("Missing element name");this.name=this.stringify.eleName(c),this.children=[],this.instructions=[],this.attributes={},null!=d&&this.attribute(d)}return l(b,a),b.prototype.clone=function(){var a,c,d,e,f,h,i,j;d=g(b.prototype,this),d.isRoot&&(d.documentObject=null),d.attributes={},i=this.attributes;for(c in i)m.call(i,c)&&(a=i[c],d.attributes[c]=a.clone());for(d.instructions=[],j=this.instructions,e=0,f=j.length;f>e;e++)h=j[e],d.instructions.push(h.clone());return d.children=[],this.children.forEach(function(a){var b;return b=a.clone(),b.parent=d,d.children.push(b)}),d},b.prototype.attribute=function(a,b){var d,e;if(null!=a&&(a=a.valueOf()),k(a))for(d in a)m.call(a,d)&&(e=a[d],this.attribute(d,e));else j(b)&&(b=b.apply()),this.options.skipNullAttributes&&null==b||(this.attributes[a]=new c(this,a,b));return this},b.prototype.removeAttribute=function(a){var b,c,d;if(null==a)throw new Error("Missing attribute name");if(a=a.valueOf(),i(a))for(c=0,d=a.length;d>c;c++)b=a[c],delete this.attributes[b];else delete this.attributes[a];return this},b.prototype.instruction=function(a,b){var c,d,e,g,h;if(null!=a&&(a=a.valueOf()),null!=b&&(b=b.valueOf()),i(a))for(c=0,h=a.length;h>c;c++)d=a[c],this.instruction(d);else if(k(a))for(d in a)m.call(a,d)&&(e=a[d],this.instruction(d,e));else j(b)&&(b=b.apply()),g=new f(this,a,b),this.instructions.push(g);return this},b.prototype.toString=function(a,b){var c,d,e,f,g,i,j,k,l,n,o,p,q,r,s,t,u,v,w,x;for(p=(null!=a?a.pretty:void 0)||!1,f=null!=(r=null!=a?a.indent:void 0)?r:"  ",o=null!=(s=null!=a?a.offset:void 0)?s:0,n=null!=(t=null!=a?a.newline:void 0)?t:"\n",b||(b=0),x=new Array(b+o+1).join(f),q="",u=this.instructions,e=0,j=u.length;j>e;e++)g=u[e],q+=g.toString(a,b+1);p&&(q+=x),q+="<"+this.name,v=this.attributes;for(l in v)m.call(v,l)&&(c=v[l],q+=c.toString(a));if(0===this.children.length||h(this.children,function(a){return""===a.value}))q+="/>",p&&(q+=n);else if(p&&1===this.children.length&&null!=this.children[0].value)q+=">",q+=this.children[0].value,q+="</"+this.name+">",q+=n;else{for(q+=">",p&&(q+=n),w=this.children,i=0,k=w.length;k>i;i++)d=w[i],q+=d.toString(a,b+1);p&&(q+=x),q+="</"+this.name+">",p&&(q+=n)}return q},b.prototype.att=function(a,b){return this.attribute(a,b)},b.prototype.ins=function(a,b){return this.instruction(a,b)},b.prototype.a=function(a,b){return this.attribute(a,b)},b.prototype.i=function(a,b){return this.instruction(a,b)},b}(e)}).call(this)},{"./XMLAttribute":84,"./XMLNode":95,"./XMLProcessingInstruction":96,"lodash/collection/every":101,"lodash/lang/isArray":135,"lodash/lang/isFunction":137,"lodash/lang/isObject":139,"lodash/object/create":143}],95:[function(a,b,c){(function(){var c,d,e,f,g,h,i,j,k,l,m,n,o={}.hasOwnProperty;n=a("lodash/lang/isObject"),k=a("lodash/lang/isArray"),m=a("lodash/lang/isFunction"),l=a("lodash/lang/isEmpty"),g=null,c=null,d=null,e=null,f=null,i=null,j=null,b.exports=h=function(){function b(b){this.parent=b,this.options=this.parent.options,this.stringify=this.parent.stringify,null===g&&(g=a("./XMLElement"),c=a("./XMLCData"),d=a("./XMLComment"),e=a("./XMLDeclaration"),f=a("./XMLDocType"),i=a("./XMLRaw"),j=a("./XMLText"))}return b.prototype.clone=function(){throw new Error("Cannot clone generic XMLNode")},b.prototype.element=function(a,b,c){var d,e,f,g,h,i,j;if(g=null,null==b&&(b={}),b=b.valueOf(),n(b)||(i=[b,c],c=i[0],b=i[1]),null!=a&&(a=a.valueOf()),k(a))for(e=0,h=a.length;h>e;e++)d=a[e],g=this.element(d);else if(m(a))g=this.element(a.apply());else if(n(a))for(f in a)o.call(a,f)&&(j=a[f],m(j)&&(j=j.apply()),n(j)&&l(j)&&(j=null),!this.options.ignoreDecorators&&this.stringify.convertAttKey&&0===f.indexOf(this.stringify.convertAttKey)?g=this.attribute(f.substr(this.stringify.convertAttKey.length),j):!this.options.ignoreDecorators&&this.stringify.convertPIKey&&0===f.indexOf(this.stringify.convertPIKey)?g=this.instruction(f.substr(this.stringify.convertPIKey.length),j):n(j)?!this.options.ignoreDecorators&&this.stringify.convertListKey&&0===f.indexOf(this.stringify.convertListKey)&&k(j)?g=this.element(j):(g=this.element(f),g.element(j)):g=this.element(f,j));else g=!this.options.ignoreDecorators&&this.stringify.convertTextKey&&0===a.indexOf(this.stringify.convertTextKey)?this.text(c):!this.options.ignoreDecorators&&this.stringify.convertCDataKey&&0===a.indexOf(this.stringify.convertCDataKey)?this.cdata(c):!this.options.ignoreDecorators&&this.stringify.convertCommentKey&&0===a.indexOf(this.stringify.convertCommentKey)?this.comment(c):!this.options.ignoreDecorators&&this.stringify.convertRawKey&&0===a.indexOf(this.stringify.convertRawKey)?this.raw(c):this.node(a,b,c);if(null==g)throw new Error("Could not create any elements with: "+a);return g},b.prototype.insertBefore=function(a,b,c){var d,e,f;if(this.isRoot)throw new Error("Cannot insert elements at root level");return e=this.parent.children.indexOf(this),f=this.parent.children.splice(e),d=this.parent.element(a,b,c),Array.prototype.push.apply(this.parent.children,f),d},b.prototype.insertAfter=function(a,b,c){var d,e,f;if(this.isRoot)throw new Error("Cannot insert elements at root level");return e=this.parent.children.indexOf(this),f=this.parent.children.splice(e+1),d=this.parent.element(a,b,c),Array.prototype.push.apply(this.parent.children,f),d},b.prototype.remove=function(){var a,b;if(this.isRoot)throw new Error("Cannot remove the root element");return a=this.parent.children.indexOf(this),[].splice.apply(this.parent.children,[a,a-a+1].concat(b=[])),b,this.parent},b.prototype.node=function(a,b,c){var d,e;return null!=a&&(a=a.valueOf()),null==b&&(b={}),b=b.valueOf(),n(b)||(e=[b,c],c=e[0],b=e[1]),d=new g(this,a,b),null!=c&&d.text(c),this.children.push(d),d},b.prototype.text=function(a){var b;return b=new j(this,a),this.children.push(b),this},b.prototype.cdata=function(a){var b;return b=new c(this,a),this.children.push(b),this},b.prototype.comment=function(a){var b;return b=new d(this,a),this.children.push(b),this},b.prototype.raw=function(a){var b;return b=new i(this,a),this.children.push(b),this},b.prototype.declaration=function(a,b,c){var d,f;return d=this.document(),f=new e(d,a,b,c),d.xmldec=f,d.root()},b.prototype.doctype=function(a,b){var c,d;return c=this.document(),d=new f(c,a,b),c.doctype=d,d},b.prototype.up=function(){if(this.isRoot)throw new Error("The root node has no parent. Use doc() if you need to get the document object.");return this.parent},b.prototype.root=function(){var a;if(this.isRoot)return this;for(a=this.parent;!a.isRoot;)a=a.parent;return a},b.prototype.document=function(){return this.root().documentObject},b.prototype.end=function(a){return this.document().toString(a)},b.prototype.prev=function(){var a;if(this.isRoot)throw new Error("Root node has no siblings");if(a=this.parent.children.indexOf(this),1>a)throw new Error("Already at the first node");return this.parent.children[a-1]},b.prototype.next=function(){var a;if(this.isRoot)throw new Error("Root node has no siblings");if(a=this.parent.children.indexOf(this),-1===a||a===this.parent.children.length-1)throw new Error("Already at the last node");return this.parent.children[a+1]},b.prototype.importXMLBuilder=function(a){var b;return b=a.root().clone(),b.parent=this,b.isRoot=!1,this.children.push(b),this},b.prototype.ele=function(a,b,c){return this.element(a,b,c)},b.prototype.nod=function(a,b,c){return this.node(a,b,c)},b.prototype.txt=function(a){return this.text(a)},b.prototype.dat=function(a){return this.cdata(a)},b.prototype.com=function(a){return this.comment(a)},b.prototype.doc=function(){return this.document()},b.prototype.dec=function(a,b,c){return this.declaration(a,b,c)},b.prototype.dtd=function(a,b){return this.doctype(a,b)},b.prototype.e=function(a,b,c){return this.element(a,b,c)},b.prototype.n=function(a,b,c){return this.node(a,b,c)},b.prototype.t=function(a){return this.text(a)},b.prototype.d=function(a){return this.cdata(a)},b.prototype.c=function(a){return this.comment(a)},b.prototype.r=function(a){return this.raw(a)},b.prototype.u=function(){return this.up()},b}()}).call(this)},{"./XMLCData":86,"./XMLComment":87,"./XMLDeclaration":92,"./XMLDocType":93,"./XMLElement":94,"./XMLRaw":97,"./XMLText":99,"lodash/lang/isArray":135,"lodash/lang/isEmpty":136,"lodash/lang/isFunction":137,"lodash/lang/isObject":139}],96:[function(a,b,c){(function(){var c,d;d=a("lodash/object/create"),b.exports=c=function(){function a(a,b,c){if(this.stringify=a.stringify,null==b)throw new Error("Missing instruction target");this.target=this.stringify.insTarget(b),c&&(this.value=this.stringify.insValue(c))}return a.prototype.clone=function(){return d(a.prototype,this)},a.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+="<?",g+=this.target,this.value&&(g+=" "+this.value),g+="?>",f&&(g+=d),g},a}()}).call(this)},{"lodash/object/create":143}],97:[function(a,b,c){(function(){var c,d,e,f=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},g={}.hasOwnProperty;e=a("lodash/object/create"),c=a("./XMLNode"),b.exports=d=function(a){function b(a,c){if(b.__super__.constructor.call(this,a),null==c)throw new Error("Missing raw text");this.value=this.stringify.raw(c)}return f(b,a),b.prototype.clone=function(){return e(b.prototype,this)},b.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+=this.value,f&&(g+=d),g},b}(c)}).call(this)},{"./XMLNode":95,"lodash/object/create":143}],98:[function(a,b,c){(function(){var a,c=function(a,b){return function(){return a.apply(b,arguments)}},d={}.hasOwnProperty;b.exports=a=function(){function a(a){this.assertLegalChar=c(this.assertLegalChar,this);var b,e,f;this.allowSurrogateChars=null!=a?a.allowSurrogateChars:void 0,e=(null!=a?a.stringify:void 0)||{};for(b in e)d.call(e,b)&&(f=e[b],this[b]=f)}return a.prototype.eleName=function(a){return a=""+a||"",this.assertLegalChar(a)},a.prototype.eleText=function(a){return a=""+a||"",this.assertLegalChar(this.elEscape(a))},a.prototype.cdata=function(a){if(a=""+a||"",a.match(/]]>/))throw new Error("Invalid CDATA text: "+a);return this.assertLegalChar(a)},a.prototype.comment=function(a){if(a=""+a||"",a.match(/--/))throw new Error("Comment text cannot contain double-hypen: "+a);return this.assertLegalChar(a)},a.prototype.raw=function(a){return""+a||""},a.prototype.attName=function(a){return""+a||""},a.prototype.attValue=function(a){return a=""+a||"",this.attEscape(a)},a.prototype.insTarget=function(a){return""+a||""},a.prototype.insValue=function(a){if(a=""+a||"",a.match(/\?>/))throw new Error("Invalid processing instruction value: "+a);return a},a.prototype.xmlVersion=function(a){if(a=""+a||"",!a.match(/1\.[0-9]+/))throw new Error("Invalid version number: "+a);return a},a.prototype.xmlEncoding=function(a){if(a=""+a||"",!a.match(/[A-Za-z](?:[A-Za-z0-9._-]|-)*/))throw new Error("Invalid encoding: "+a);return a},a.prototype.xmlStandalone=function(a){return a?"yes":"no"},a.prototype.dtdPubID=function(a){return""+a||""},a.prototype.dtdSysID=function(a){return""+a||""},a.prototype.dtdElementValue=function(a){return""+a||""},a.prototype.dtdAttType=function(a){return""+a||""},a.prototype.dtdAttDefault=function(a){return null!=a?""+a||"":a},a.prototype.dtdEntityValue=function(a){return""+a||""},a.prototype.dtdNData=function(a){return""+a||""},a.prototype.convertAttKey="@",a.prototype.convertPIKey="?",a.prototype.convertTextKey="#text",a.prototype.convertCDataKey="#cdata",a.prototype.convertCommentKey="#comment",a.prototype.convertRawKey="#raw",a.prototype.convertListKey="#list",a.prototype.assertLegalChar=function(a){var b,c;if(b=this.allowSurrogateChars?/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uFFFE-\uFFFF]/:/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/,c=a.match(b))throw new Error("Invalid character ("+c+") in string: "+a+" at index "+c.index);return a},a.prototype.elEscape=function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\r/g,"&#xD;")},a.prototype.attEscape=function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/\t/g,"&#x9;").replace(/\n/g,"&#xA;").replace(/\r/g,"&#xD;")},a}()}).call(this)},{}],99:[function(a,b,c){(function(){var c,d,e,f=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},g={}.hasOwnProperty;e=a("lodash/object/create"),c=a("./XMLNode"),b.exports=d=function(a){function b(a,c){if(b.__super__.constructor.call(this,a),null==c)throw new Error("Missing element text");this.value=this.stringify.eleText(c)}return f(b,a),b.prototype.clone=function(){return e(b.prototype,this)},b.prototype.toString=function(a,b){var c,d,e,f,g,h,i,j,k;return f=(null!=a?a.pretty:void 0)||!1,c=null!=(h=null!=a?a.indent:void 0)?h:"  ",e=null!=(i=null!=a?a.offset:void 0)?i:0,d=null!=(j=null!=a?a.newline:void 0)?j:"\n",b||(b=0),k=new Array(b+e+1).join(c),g="",f&&(g+=k),g+=this.value,f&&(g+=d),g},b}(c)}).call(this)},{"./XMLNode":95,"lodash/object/create":143}],100:[function(a,b,c){(function(){var c,d;d=a("lodash/object/assign"),c=a("./XMLBuilder"),b.exports.create=function(a,b,e,f){return f=d({},b,e,f),new c(a,f).root()}}).call(this)},{"./XMLBuilder":85,"lodash/object/assign":142}],101:[function(a,b,c){function d(a,b,c){var d=h(a)?e:g;return"function"==typeof b&&"undefined"==typeof c||(b=f(b,c,3)),d(a,b)}var e=a("../internal/arrayEvery"),f=a("../internal/baseCallback"),g=a("../internal/baseEvery"),h=a("../lang/isArray");b.exports=d},{"../internal/arrayEvery":102,"../internal/baseCallback":104,"../internal/baseEvery":108,"../lang/isArray":135}],102:[function(a,b,c){function d(a,b){for(var c=-1,d=a.length;++c<d;)if(!b(a[c],c,a))return!1;return!0}b.exports=d},{}],103:[function(a,b,c){function d(a,b,c){var d=f(b);if(!c)return e(b,a,d);for(var g=-1,h=d.length;++g<h;){var i=d[g],j=a[i],k=c(j,b[i],i,a,b);(k===k?k===j:j!==j)&&("undefined"!=typeof j||i in a)||(a[i]=k)}return a}var e=a("./baseCopy"),f=a("../object/keys");b.exports=d},{"../object/keys":144,"./baseCopy":105}],104:[function(a,b,c){function d(a,b,c){var d=typeof a;return"function"==d?"undefined"!=typeof b&&j(a)?h(a,b,c):a:null==a?i:"object"==d?e(a):"undefined"==typeof b?g(a+""):f(a+"",b)}var e=a("./baseMatches"),f=a("./baseMatchesProperty"),g=a("./baseProperty"),h=a("./bindCallback"),i=a("../utility/identity"),j=a("./isBindable");b.exports=d},{"../utility/identity":148,"./baseMatches":115,"./baseMatchesProperty":116,"./baseProperty":117,"./bindCallback":120,"./isBindable":125}],105:[function(a,b,c){function d(a,b,c){c||(c=b,b={});for(var d=-1,e=c.length;++d<e;){var f=c[d];b[f]=a[f]}return b}b.exports=d},{}],106:[function(a,b,c){(function(c){var d=a("../lang/isObject"),e=function(){function a(){}return function(b){if(d(b)){a.prototype=b;var e=new a;a.prototype=null}return e||c.Object()}}();b.exports=e}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lang/isObject":139}],107:[function(a,b,c){function d(a,b){var c=a?a.length:0;if(!f(c))return e(a,b);for(var d=-1,h=g(a);++d<c&&b(h[d],d,h)!==!1;);return a}var e=a("./baseForOwn"),f=a("./isLength"),g=a("./toObject");b.exports=d},{"./baseForOwn":110,"./isLength":128,"./toObject":133}],108:[function(a,b,c){function d(a,b){var c=!0;return e(a,function(a,d,e){return c=!!b(a,d,e)}),c}var e=a("./baseEach");b.exports=d},{"./baseEach":107}],109:[function(a,b,c){function d(a,b,c){for(var d=-1,f=e(a),g=c(a),h=g.length;++d<h;){var i=g[d];if(b(f[i],i,f)===!1)break}return a}var e=a("./toObject");b.exports=d},{"./toObject":133}],110:[function(a,b,c){function d(a,b){return e(a,b,f)}var e=a("./baseFor"),f=a("../object/keys");b.exports=d},{"../object/keys":144,"./baseFor":109}],111:[function(a,b,c){function d(a,b,c,f,g,h){if(a===b)return 0!==a||1/a==1/b;var i=typeof a,j=typeof b;return"function"!=i&&"object"!=i&&"function"!=j&&"object"!=j||null==a||null==b?a!==a&&b!==b:e(a,b,d,c,f,g,h)}var e=a("./baseIsEqualDeep");b.exports=d},{"./baseIsEqualDeep":112}],112:[function(a,b,c){function d(a,b,c,d,m,p,q){var r=h(a),s=h(b),t=k,u=k;r||(t=o.call(a),t==j?t=l:t!=l&&(r=i(a))),s||(u=o.call(b),u==j?u=l:u!=l&&(s=i(b)));var v=t==l,w=u==l,x=t==u;if(x&&!r&&!v)return f(a,b,t);var y=v&&n.call(a,"__wrapped__"),z=w&&n.call(b,"__wrapped__");if(y||z)return c(y?a.value():a,z?b.value():b,d,m,p,q);if(!x)return!1;p||(p=[]),q||(q=[]);for(var A=p.length;A--;)if(p[A]==a)return q[A]==b;p.push(a),q.push(b);var B=(r?e:g)(a,b,c,d,m,p,q);return p.pop(),q.pop(),B}var e=a("./equalArrays"),f=a("./equalByTag"),g=a("./equalObjects"),h=a("../lang/isArray"),i=a("../lang/isTypedArray"),j="[object Arguments]",k="[object Array]",l="[object Object]",m=Object.prototype,n=m.hasOwnProperty,o=m.toString;b.exports=d},{"../lang/isArray":135,"../lang/isTypedArray":141,"./equalArrays":122,"./equalByTag":123,"./equalObjects":124}],113:[function(a,b,c){function d(a){return"function"==typeof a||!1}b.exports=d},{}],114:[function(a,b,c){function d(a,b,c,d,f){var h=b.length;if(null==a)return!h;for(var i=-1,j=!f;++i<h;)if(j&&d[i]?c[i]!==a[b[i]]:!g.call(a,b[i]))return!1;for(i=-1;++i<h;){var k=b[i];if(j&&d[i])var l=g.call(a,k);else{var m=a[k],n=c[i];l=f?f(m,n,k):void 0,"undefined"==typeof l&&(l=e(n,m,f,!0))}if(!l)return!1}return!0}var e=a("./baseIsEqual"),f=Object.prototype,g=f.hasOwnProperty;b.exports=d},{"./baseIsEqual":111}],115:[function(a,b,c){function d(a){var b=g(a),c=b.length;if(1==c){var d=b[0],h=a[d];if(f(h))return function(a){return null!=a&&a[d]===h&&i.call(a,d)}}for(var j=Array(c),k=Array(c);c--;)h=a[b[c]],j[c]=h,k[c]=f(h);return function(a){return e(a,b,j,k)}}var e=a("./baseIsMatch"),f=a("./isStrictComparable"),g=a("../object/keys"),h=Object.prototype,i=h.hasOwnProperty;b.exports=d},{"../object/keys":144,"./baseIsMatch":114,"./isStrictComparable":130}],116:[function(a,b,c){function d(a,b){return f(b)?function(c){return null!=c&&c[a]===b}:function(c){return null!=c&&e(b,c[a],null,!0)}}var e=a("./baseIsEqual"),f=a("./isStrictComparable");b.exports=d},{"./baseIsEqual":111,"./isStrictComparable":130}],117:[function(a,b,c){function d(a){return function(b){return null==b?void 0:b[a]}}b.exports=d},{}],118:[function(a,b,c){var d=a("../utility/identity"),e=a("./metaMap"),f=e?function(a,b){return e.set(a,b),a}:d;b.exports=f},{"../utility/identity":148,"./metaMap":131}],119:[function(a,b,c){function d(a){return"string"==typeof a?a:null==a?"":a+""}b.exports=d},{}],120:[function(a,b,c){function d(a,b,c){if("function"!=typeof a)return e;if("undefined"==typeof b)return a;switch(c){case 1:return function(c){return a.call(b,c)};case 3:return function(c,d,e){return a.call(b,c,d,e)};case 4:return function(c,d,e,f){return a.call(b,c,d,e,f)};case 5:return function(c,d,e,f,g){return a.call(b,c,d,e,f,g)}}return function(){return a.apply(b,arguments)}}var e=a("../utility/identity");b.exports=d},{"../utility/identity":148}],121:[function(a,b,c){function d(a){return function(){var b=arguments,c=b.length,d=b[0];if(2>c||null==d)return d;var g=b[c-2],h=b[c-1],i=b[3];c>3&&"function"==typeof g?(g=e(g,h,5),c-=2):(g=c>2&&"function"==typeof h?h:null,c-=g?1:0),i&&f(b[1],b[2],i)&&(g=3==c?null:g,c=2);for(var j=0;++j<c;){var k=b[j];k&&a(d,k,g)}return d}}var e=a("./bindCallback"),f=a("./isIterateeCall");b.exports=d},{"./bindCallback":120,"./isIterateeCall":127}],122:[function(a,b,c){function d(a,b,c,d,e,f,g){var h=-1,i=a.length,j=b.length,k=!0;if(i!=j&&!(e&&j>i))return!1;for(;k&&++h<i;){var l=a[h],m=b[h];if(k=void 0,d&&(k=e?d(m,l,h):d(l,m,h)),"undefined"==typeof k)if(e)for(var n=j;n--&&(m=b[n],!(k=l&&l===m||c(l,m,d,e,f,g))););else k=l&&l===m||c(l,m,d,e,f,g)}return!!k}b.exports=d},{}],123:[function(a,b,c){function d(a,b,c){switch(c){case e:case f:return+a==+b;case g:return a.name==b.name&&a.message==b.message;case h:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case i:case j:return a==b+""}return!1}var e="[object Boolean]",f="[object Date]",g="[object Error]",h="[object Number]",i="[object RegExp]",j="[object String]";b.exports=d},{}],124:[function(a,b,c){function d(a,b,c,d,f,h,i){var j=e(a),k=j.length,l=e(b),m=l.length;if(k!=m&&!f)return!1;for(var n,o=-1;++o<k;){var p=j[o],q=g.call(b,p);if(q){var r=a[p],s=b[p];q=void 0,d&&(q=f?d(s,r,p):d(r,s,p)),"undefined"==typeof q&&(q=r&&r===s||c(r,s,d,f,h,i))}if(!q)return!1;n||(n="constructor"==p)}if(!n){var t=a.constructor,u=b.constructor;if(t!=u&&"constructor"in a&&"constructor"in b&&!("function"==typeof t&&t instanceof t&&"function"==typeof u&&u instanceof u))return!1}return!0}var e=a("../object/keys"),f=Object.prototype,g=f.hasOwnProperty;b.exports=d},{"../object/keys":144}],125:[function(a,b,c){function d(a){var b=!(g.funcNames?a.name:g.funcDecomp);if(!b){var c=j.call(a);g.funcNames||(b=!h.test(c)),b||(b=i.test(c)||f(a),e(a,b))}return b}var e=a("./baseSetData"),f=a("../lang/isNative"),g=a("../support"),h=/^\s*function[ \n\r\t]+\w/,i=/\bthis\b/,j=Function.prototype.toString;b.exports=d},{"../lang/isNative":138,"../support":147,"./baseSetData":118}],126:[function(a,b,c){function d(a,b){return a=+a,b=null==b?e:b,a>-1&&a%1==0&&b>a}var e=Math.pow(2,53)-1;b.exports=d},{}],127:[function(a,b,c){function d(a,b,c){if(!g(c))return!1;var d=typeof b;if("number"==d)var h=c.length,i=f(h)&&e(b,h);else i="string"==d&&b in c;if(i){var j=c[b];return a===a?a===j:j!==j}return!1}var e=a("./isIndex"),f=a("./isLength"),g=a("../lang/isObject");b.exports=d},{"../lang/isObject":139,"./isIndex":126,"./isLength":128}],128:[function(a,b,c){function d(a){return"number"==typeof a&&a>-1&&a%1==0&&e>=a}var e=Math.pow(2,53)-1;b.exports=d},{}],129:[function(a,b,c){function d(a){return a&&"object"==typeof a||!1}b.exports=d},{}],130:[function(a,b,c){function d(a){return a===a&&(0===a?1/a>0:!e(a))}var e=a("../lang/isObject");b.exports=d},{"../lang/isObject":139}],131:[function(a,b,c){(function(c){var d=a("../lang/isNative"),e=d(e=c.WeakMap)&&e,f=e&&new e;b.exports=f}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../lang/isNative":138}],132:[function(a,b,c){function d(a){for(var b=i(a),c=b.length,d=c&&a.length,k=d&&h(d)&&(f(a)||j.nonEnumArgs&&e(a)),m=-1,n=[];++m<c;){var o=b[m];(k&&g(o,d)||l.call(a,o))&&n.push(o)}return n}var e=a("../lang/isArguments"),f=a("../lang/isArray"),g=a("./isIndex"),h=a("./isLength"),i=a("../object/keysIn"),j=a("../support"),k=Object.prototype,l=k.hasOwnProperty;b.exports=d},{"../lang/isArguments":134,"../lang/isArray":135,"../object/keysIn":145,"../support":147,"./isIndex":126,"./isLength":128}],133:[function(a,b,c){function d(a){return e(a)?a:Object(a)}var e=a("../lang/isObject");b.exports=d},{"../lang/isObject":139}],134:[function(a,b,c){function d(a){var b=f(a)?a.length:void 0;return e(b)&&i.call(a)==g||!1}var e=a("../internal/isLength"),f=a("../internal/isObjectLike"),g="[object Arguments]",h=Object.prototype,i=h.toString;b.exports=d},{"../internal/isLength":128,"../internal/isObjectLike":129}],135:[function(a,b,c){var d=a("../internal/isLength"),e=a("./isNative"),f=a("../internal/isObjectLike"),g="[object Array]",h=Object.prototype,i=h.toString,j=e(j=Array.isArray)&&j,k=j||function(a){return f(a)&&d(a.length)&&i.call(a)==g||!1};b.exports=k},{"../internal/isLength":128,"../internal/isObjectLike":129,"./isNative":138}],136:[function(a,b,c){function d(a){if(null==a)return!0;var b=a.length;return h(b)&&(f(a)||j(a)||e(a)||i(a)&&g(a.splice))?!b:!k(a).length}var e=a("./isArguments"),f=a("./isArray"),g=a("./isFunction"),h=a("../internal/isLength"),i=a("../internal/isObjectLike"),j=a("./isString"),k=a("../object/keys");b.exports=d},{"../internal/isLength":128,"../internal/isObjectLike":129,"../object/keys":144,"./isArguments":134,"./isArray":135,"./isFunction":137,"./isString":140}],137:[function(a,b,c){(function(c){var d=a("../internal/baseIsFunction"),e=a("./isNative"),f="[object Function]",g=Object.prototype,h=g.toString,i=e(i=c.Uint8Array)&&i,j=d(/x/)||i&&!d(i)?function(a){return h.call(a)==f}:d;b.exports=j}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../internal/baseIsFunction":113,"./isNative":138}],138:[function(a,b,c){function d(a){return null==a?!1:k.call(a)==g?l.test(j.call(a)):f(a)&&h.test(a)||!1}var e=a("../string/escapeRegExp"),f=a("../internal/isObjectLike"),g="[object Function]",h=/^\[object .+?Constructor\]$/,i=Object.prototype,j=Function.prototype.toString,k=i.toString,l=RegExp("^"+e(k).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");b.exports=d},{"../internal/isObjectLike":129,"../string/escapeRegExp":146}],139:[function(a,b,c){function d(a){var b=typeof a;return"function"==b||a&&"object"==b||!1}b.exports=d},{}],140:[function(a,b,c){function d(a){return"string"==typeof a||e(a)&&h.call(a)==f||!1}var e=a("../internal/isObjectLike"),f="[object String]",g=Object.prototype,h=g.toString;b.exports=d},{"../internal/isObjectLike":129}],141:[function(a,b,c){function d(a){return f(a)&&e(a.length)&&D[F.call(a)]||!1}var e=a("../internal/isLength"),f=a("../internal/isObjectLike"),g="[object Arguments]",h="[object Array]",i="[object Boolean]",j="[object Date]",k="[object Error]",l="[object Function]",m="[object Map]",n="[object Number]",o="[object Object]",p="[object RegExp]",q="[object Set]",r="[object String]",s="[object WeakMap]",t="[object ArrayBuffer]",u="[object Float32Array]",v="[object Float64Array]",w="[object Int8Array]",x="[object Int16Array]",y="[object Int32Array]",z="[object Uint8Array]",A="[object Uint8ClampedArray]",B="[object Uint16Array]",C="[object Uint32Array]",D={};
D[u]=D[v]=D[w]=D[x]=D[y]=D[z]=D[A]=D[B]=D[C]=!0,D[g]=D[h]=D[t]=D[i]=D[j]=D[k]=D[l]=D[m]=D[n]=D[o]=D[p]=D[q]=D[r]=D[s]=!1;var E=Object.prototype,F=E.toString;b.exports=d},{"../internal/isLength":128,"../internal/isObjectLike":129}],142:[function(a,b,c){var d=a("../internal/baseAssign"),e=a("../internal/createAssigner"),f=e(d);b.exports=f},{"../internal/baseAssign":103,"../internal/createAssigner":121}],143:[function(a,b,c){function d(a,b,c){var d=f(a);return c&&g(a,b,c)&&(b=null),b?e(b,d,h(b)):d}var e=a("../internal/baseCopy"),f=a("../internal/baseCreate"),g=a("../internal/isIterateeCall"),h=a("./keys");b.exports=d},{"../internal/baseCopy":105,"../internal/baseCreate":106,"../internal/isIterateeCall":127,"./keys":144}],144:[function(a,b,c){var d=a("../internal/isLength"),e=a("../lang/isNative"),f=a("../lang/isObject"),g=a("../internal/shimKeys"),h=e(h=Object.keys)&&h,i=h?function(a){if(a)var b=a.constructor,c=a.length;return"function"==typeof b&&b.prototype===a||"function"!=typeof a&&c&&d(c)?g(a):f(a)?h(a):[]}:g;b.exports=i},{"../internal/isLength":128,"../internal/shimKeys":132,"../lang/isNative":138,"../lang/isObject":139}],145:[function(a,b,c){function d(a){if(null==a)return[];i(a)||(a=Object(a));var b=a.length;b=b&&h(b)&&(f(a)||j.nonEnumArgs&&e(a))&&b||0;for(var c=a.constructor,d=-1,k="function"==typeof c&&c.prototype===a,m=Array(b),n=b>0;++d<b;)m[d]=d+"";for(var o in a)n&&g(o,b)||"constructor"==o&&(k||!l.call(a,o))||m.push(o);return m}var e=a("../lang/isArguments"),f=a("../lang/isArray"),g=a("../internal/isIndex"),h=a("../internal/isLength"),i=a("../lang/isObject"),j=a("../support"),k=Object.prototype,l=k.hasOwnProperty;b.exports=d},{"../internal/isIndex":126,"../internal/isLength":128,"../lang/isArguments":134,"../lang/isArray":135,"../lang/isObject":139,"../support":147}],146:[function(a,b,c){function d(a){return a=e(a),a&&g.test(a)?a.replace(f,"\\$&"):a}var e=a("../internal/baseToString"),f=/[.*+?^${}()|[\]\/\\]/g,g=RegExp(f.source);b.exports=d},{"../internal/baseToString":119}],147:[function(a,b,c){(function(c){var d=a("./lang/isNative"),e=/\bthis\b/,f=Object.prototype,g=(g=c.window)&&g.document,h=f.propertyIsEnumerable,i={};!function(a){i.funcDecomp=!d(c.WinRTError)&&e.test(function(){return this}),i.funcNames="string"==typeof Function.name;try{i.dom=11===g.createDocumentFragment().nodeType}catch(b){i.dom=!1}try{i.nonEnumArgs=!h.call(arguments,1)}catch(b){i.nonEnumArgs=!0}}(0,0),b.exports=i}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lang/isNative":138}],148:[function(a,b,c){function d(a){return a}b.exports=d},{}]},{},[8]);
//# sourceMappingURL=aws-cognito-sdk.min.js.map

/***/ }),
/* 243 */
/***/ (function(module, exports) {

	/**
	@class temp_hist
	@constructor
	*/

  temp_hist = function (pageCfg) {
		this.$graphCont = pageCfg.$graphCont;
		this.$rangeBtnsCont = pageCfg.$rangeBtnsCont;
	  this.graphDataProvider = new GraphDataProvider();
	  this.graphDataProvider.newGraphDataCallbacks.add($.proxy(this._onNewGraphData, this));
    		this.isRangeSelectorActive = false;
  };

  /**
   * Starts everything by requesting initial data load. For example's purposes, initial date extents are hardcoded.
   *
   * @method
   */
  temp_hist.prototype.init = function () {
    this.showSpinner(true);

			this.$rangeBtnsCont.children().removeClass('active');

    this._setupRangeButtons();

    // Default range dates
    var rangeEndMom = moment().utc();
    rangeEndMom.startOf('hour');
    rangeEndMom.add(1, 'hour');
    var rangeStartMom = moment.utc(rangeEndMom).add(-6, 'month');

    this.$rangeBtnsCont.find("button[name='range-btn-1w']").addClass('active');

    // Default detail dates
    var detailEndMom = moment(rangeEndMom);
    // detailEndMom.add(3, 'day');
    var detailStartMom = moment(detailEndMom);
    detailStartMom.add(-1, 'week');

    this.graphDataProvider.loadData("Series-A", rangeStartMom.toDate(), rangeEndMom.toDate(), detailStartMom.toDate(), detailEndMom.toDate(), this.$graphCont.width());

  };

  temp_hist.prototype._setupRangeButtons = function () {
    var self = this;

    this.$rangeBtnsCont.children().on('click', function (evt) {
      evt.preventDefault();
      var rangeType = evt.target.name.toString().replace("range-btn-", "");

      self.$rangeBtnsCont.children().removeClass('active');

      $(this).addClass('active');

      var rangeEndMom;
      rangeEndMom = moment().utc();
      rangeEndMom.minutes(0).seconds(0);
      rangeEndMom.add(1, 'hour');

      //console.log("rangeType", rangeType);

      var rangeStartMom;
      if (rangeType == "1d") {
        rangeStartMom = moment.utc(rangeEndMom).add(-1, 'day');
      } else if (rangeType == "1w") {
        rangeStartMom = moment.utc(rangeEndMom).add(-1, 'week');
      } else if (rangeType == "1m") {
        rangeStartMom = moment.utc(rangeEndMom).add(-1, 'month');
      } else if (rangeType == "6m") {
        rangeStartMom = moment.utc(rangeEndMom).add(-6, 'month');
      } else if (rangeType == "1y") {
        rangeStartMom = moment.utc(rangeEndMom).add(-1, 'year');
      } else if (rangeType == "5y") {
        rangeStartMom = moment.utc(rangeEndMom).add(-5, 'year');
      } else if (rangeType == "ytd") {
        rangeStartMom = moment().startOf('year').utc();
      }


      //For demo purposes, when range is reset, auto reset detail view to same extents as range
      var detailStartMom = rangeStartMom.clone();
      var detailEndMom = rangeEndMom.clone();

      self.showSpinner(true);
      self.graphDataProvider.loadData("Series-A",
                                      rangeStartMom.toDate(),
                                      rangeEndMom.toDate(),
                                      detailStartMom.toDate(),
                                      detailEndMom.toDate(),
                                      self.$graphCont.width());

    });

  };

  /**
   * Internal method to add mouse down listener to dygraphs range selector.  Coded so that it can be called
   * multiple times without concern. Although not necessary for simple example (like example1), this becomes necessary
   * for more advanced examples when the graph must be recreated, not just updated.
   *
   * @method _setupRangeMouseHandling
   * @private
   */
  temp_hist.prototype._setupRangeMouseHandling = function () {
    var self = this;

    // Element used for tracking mouse up events
    this.$mouseUpEventEl = $(window);
    if ($.support.cssFloat == false) { //IE<=8, doesn't support mouse events on window
      this.$mouseUpEventEl = $(document.body);
    }

    //Minor Hack...not sure how else to hook-in to dygraphs range selector events without modifying source. This is
    //where minor modification to dygraphs (range selector plugin) might make for a cleaner approach.
    //We only want to install a mouse up handler if mouse down interaction is started on the range control
    var $rangeEl = this.$graphCont.find('.dygraph-rangesel-fgcanvas, .dygraph-rangesel-zoomhandle');

    //Uninstall existing handler if already installed
    $rangeEl.off("mousedown.jgs touchstart.jgs");

    //Install new mouse down handler
    $rangeEl.on("mousedown.jgs touchstart.jgs", function (evt) {

      //Track that mouse is down on range selector
      self.isRangeSelectorActive = true;

      // Setup mouse up handler to initiate new data load
      self.$mouseUpEventEl.off("mouseup.jgs touchend.jgs"); //cancel any existing
      $(self.$mouseUpEventEl).on('mouseup.jgs touchend.jgs', function (evt) {
        self.$mouseUpEventEl.off("mouseup.jgs touchend.jgs");

        //Mouse no longer down on range selector
        self.isRangeSelectorActive = false;

        //Get the new detail window extents
        var graphAxisX = self.graph.xAxisRange();
        self.detailStartDateTm = new Date(graphAxisX[0]);
        self.detailEndDateTm = new Date(graphAxisX[1]);

        // Load new detail data
        self._loadNewDetailData();
      });

    });


  };

  /**
   * Internal method that provides a hook in to Dygraphs default pan interaction handling.  This is a bit of hack
   * and relies on Dygraphs' internals. Without this, pan interactions (holding SHIFT and dragging graph) do not result
   * in detail data being loaded.
   *
   * This method works by replacing the global Dygraph.Interaction.endPan method.  The replacement method
   * is global to all instances of this class, and so it can not rely on "self" scope.  To support muliple graphs
   * with their own pan interactions, we keep a circular reference to this object instance on the dygraphs instance
   * itself when creating it. This allows us to look up the correct page object instance when the endPan callback is
   * triggered. We use a global JGS.Demo3Page.isGlobalPanInteractionHandlerInstalled flag to make sure we only install
   * the global handler once.
   *
   * @method _setupPanInteractionHandling
   * @private
   */
  temp_hist.prototype._setupPanInteractionHandling = function () {

    if (temp_hist.isGlobalPanInteractionHandlerInstalled)
      return;
    else
      temp_hist.isGlobalPanInteractionHandlerInstalled = true;

    //Save original endPan function
    var origEndPan = Dygraph.Interaction.endPan;

    //Replace built-in handling with our own function
    Dygraph.Interaction.endPan = function(event, g, context) {

      var myInstance = g.demoPageInstance;

      //Call the original to let it do it's magic
      origEndPan(event,g,context);

      //Extract new start/end from the x-axis

      //Note that this _might_ not work as is in IE8. If not, might require a setTimeout hack that executes these
      //next few lines after a few ms delay. Have not tested with IE8 yet.
      var axisX = g.xAxisRange();
      myInstance.detailStartDateTm = new Date(axisX[0]);
      myInstance.detailEndDateTm = new Date(axisX[1]);

      //Trigger new detail load
      myInstance._loadNewDetailData();
    };
    Dygraph.endPan = Dygraph.Interaction.endPan; //see dygraph-interaction-model.js
  };



  /**
   * Initiates detail data load request using last known zoom extents
   *
   * @method _loadNewDetailData
   * @private
   */
  temp_hist.prototype._loadNewDetailData = function () {
    this.showSpinner(true);
    this.graphDataProvider.loadData("Series-A", null, null, this.detailStartDateTm, this.detailEndDateTm, this.$graphCont.width());
  };

  /**
   * Callback handler when new graph data is available to be drawn
   *
   * @param graphData
   * @method _onNewGraphData
   * @private
   */
  temp_hist.prototype._onNewGraphData = function (graphData) {
    this.drawDygraph(graphData);
	  // console.log(graphData.dyData);
    this.$rangeBtnsCont.css('visibility', 'visible');
    this.showSpinner(false);

  };

		// var x = 74.25;
		// var y = 65.96;
		// var z = 83.64;
		// var dyData = [];
		// dyData.push([new Date("2017/06/18 16:00:20"), (z)]);
		// dyData.push([new Date("2017/06/19 10:00:50"), (y)]);	
		// dyData.push([new Date("2017/06/20 12:00:40"), (x)]);
		// var graphData = {
			// dyData: dyData,
			// detailStartDateTm: new Date("2017/06/18 16:00:00"),
			// detailEndDateTm: new Date("2017/06/20 12:00:00")
		// };
		// console.log(graphData.dyData);

		temp_hist.prototype.drawDygraph = function (graphData) {
			var dyData = graphData.dyData;

		var detailStartDateTm = graphData.detailStartDateTm;
		var detailEndDateTm = graphData.detailEndDateTm;
		var recreateDygraph = false;
		var labels = ["time", "Series-A"];

		var useAutoRange = true;
		var expectMinMax = true;

		var axes = {};
		if (useAutoRange) {
			axes.y = {valueRange: null};
		} else {
			axes.y = {valueRange: [40, 100]};
		}
		

		if (!this.graph || recreateDygraph) {
			var graphCfg = {
				axes: axes,
				labels: labels,
				ylabel: 'Temperature (F)',
				showRangeSelector: false,
				// interactionModel: Dygraph.Interaction.defaultModel,
				connectSeparatedPoints: true,
				dateWindow: [detailStartDateTm.getTime(), detailEndDateTm.getTime()],
				// drawCallback: $.proxy(this._onDyDrawCallback, this),
				zoomCallback: $.proxy(this._onDyZoomCallback, this),
				digitsAfterDecimal: 2,
				// labelsDivWidth: "275"
				          underlayCallback: function(canvas, area, g) {

            canvas.fillStyle = "rgba(230, 230, 230, 1.0)";

            function highlight_period(x_start, x_end) {
              var canvas_left_x = g.toDomXCoord(x_start);
              var canvas_right_x = g.toDomXCoord(x_end);
              var canvas_width = canvas_right_x - canvas_left_x;
              canvas.fillRect(canvas_left_x, area.y, canvas_width, area.h);
            }
		if (g.dateWindow_ == null){
		var min_data_x = g.getValue(0,0);
            var max_data_x = g.getValue(g.numRows()-1,0);
		} else {
            var min_data_x = g.dateWindow_[0].valueOf();
            var max_data_x = g.dateWindow_[1].valueOf();
		}
		var minmom = moment(min_data_x);
		var maxmom = moment(max_data_x);
		var windowdiff = maxmom.diff(minmom, 'days');

		if (windowdiff > 14) return;

            var w = minmom;
	var wnext;					  
            // starting before sunrise is a special case
            var times = SunCalc.getTimes(w, 37.7, -122.1);
		if (w < times.sunrise) {
			highlight_period(w.valueOf(), times.sunrise.valueOf());
		}

            while (w < max_data_x) {
		    wnext = w.clone().add(1, 'day');
            times = SunCalc.getTimes(w, 37.7, -122.1);
            var times2 = SunCalc.getTimes(wnext, 37.7, -122.1);
              var start_x_highlight = times.sunset.valueOf();
              var end_x_highlight = times2.sunrise.valueOf();
              // make sure we don't try to plot outside the graph
              if (start_x_highlight < min_data_x) {
                start_x_highlight = min_data_x;
              }
              if (end_x_highlight > max_data_x) {
                end_x_highlight = max_data_x;
              }
              highlight_period(start_x_highlight,end_x_highlight);
		    // just in case the graph ends before next sunrise
		if (wnext >= max_data_x) {
			highlight_period(times2.sunset.valueOf(), max_data_x);
		}
              // calculate start of highlight for next Saturday
              w = wnext; 
            }
          }
			};

			this.graph = new Dygraph(this.$graphCont.get(0), dyData, graphCfg);
			this._setupRangeMouseHandling();
			this._setupPanInteractionHandling();

			this.graph.demoPageInstance = this;
		
		}

		else {
			var graphCfg = {
				axes: axes,
				labels: labels,
				file: dyData,

				dateWindow: [detailStartDateTm.getTime(), detailEndDateTm.getTime()],
			};
			this.graph.updateOptions(graphCfg);
		}
	};

  temp_hist.prototype._onDyZoomCallback = function (minDate, maxDate, yRanges) {
    //console.log("_onDyZoomCallback");

    if (this.graph == null)
      return;

    this.detailStartDateTm = new Date(minDate);
    this.detailEndDateTm = new Date(maxDate);

    //When zoom reset via double-click, there is no mouse-up event in chrome (maybe a bug?),
    //so we initiate data load directly
    if (this.graph.isZoomed('x') === false) {
      this.$mouseUpEventEl.off("mouseup.jgs touchend.jgs"); //Cancel current event handler if any
      this._loadNewDetailData();
      return;
    }

    //Check if need to do IE8 workaround
    if ($.support.cssFloat == false) { //IE<=8
      // ie8 calls drawCallback with new dates before zoom. This example currently does not implement the
      // drawCallback, so this example might not work in IE8 currently. This next line _might_ solve, but will
      // result in duplicate loading when drawCallback is added back in.
      this._loadNewDetailData();
      return;
    }

    //The zoom callback is called when zooming via mouse drag on graph area, as well as when
    //dragging the range selector bars. We only want to initiate dataload when mouse-drag zooming. The mouse
    //up handler takes care of loading data when dragging range selector bars.
    var doDataLoad = !this.isRangeSelectorActive;
    if (doDataLoad === true)
      this._loadNewDetailData();

  }; 
 		
   temp_hist.prototype.showSpinner = function (show) {
    if (show === true) {

      var target = this.$graphCont.get(0);

      if (this.spinner == null) {
        var opts = {
          lines: 13, // The number of lines to draw
          length: 7, // The length of each line
          width: 6, // The line thickness
          radius: 10, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          color: '#000', // #rgb or #rrggbb
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9 // The z-index (defaults to 2000000000)
        };

        this.spinner = new Spinner(opts);
        this.spinner.spin(target);
        this.spinnerIsSpinning = true;
      } else {
        if (this.spinnerIsSpinning === false) { //else already spinning
          this.spinner.spin(target);
          this.spinnerIsSpinning = true;
        }
      }
    } else if (this.spinner != null && show === false) {
      this.spinner.stop();
      this.spinnerIsSpinning = false;
    }

  };



/***/ }),
/* 244 */
/***/ (function(module, exports) {

GraphDataProvider = function () {
    this.serverDataSims = {};
    this.newGraphDataCallbacks = $.Callbacks();

    this.lastRangeReqNum = 0;
    this.lastDetailReqNum = 0;
  };

  /**
   Initiates data load request. The rangeStartDateTm and rangeEndDateTm parameters are optional. If null, then only
   new detail data will be loaded, and the result spliced with most recent existing range data.
   @method loadData
  */
  GraphDataProvider.prototype.loadData = function (seriesName, rangeStartDateTm, rangeEndDateTm, detailStartDateTm, detailEndDateTm, pixelWidth) {

    //Construct server data provider/simulator if needed for the requested series
    var serverDataSim = this.serverDataSims[seriesName];
    if (!serverDataSim) {
      serverDataSim = new ServerDataSimulator(seriesName);
      serverDataSim.onServerDataLoadCallbacks.add($.proxy(this._onServerDataLoad, this));
      this.serverDataSims[seriesName] = serverDataSim;
    }

    // loading range data is optional
    if (rangeStartDateTm && rangeEndDateTm) {
      this.rangeDataLoadComplete = false;

      //This determines how many points we load (and so how much downsampling is being asked for).
      //This might be specific to each project and require some knowledge of the underlying data purpose.
      var numRangeIntervals = pixelWidth / 2; // ...so at most, downsample to one point every two pixels in the range selector

      var rangeDataLoadReq = {
        reqType: "range",
        reqNum: ++this.lastRangeReqNum,
        startDateTm: rangeStartDateTm,
        endDateTm: rangeEndDateTm,
        numIntervals: numRangeIntervals,
        includeMinMax: true
      };
      this.lastRangeDataLoadReq = rangeDataLoadReq;
      serverDataSim.loadData(rangeDataLoadReq);
    }
    else {
      this.rangeDataLoadComplete = true;
    }

    // load detail data ...also coded optional, but never used as optional because we don't range extents without changing detail extents
    if (detailStartDateTm && detailEndDateTm) {
      this.detailDataLoadComplete = false;

      //This determines how many points we load (and so how much downsampling is being asked for).
      //This might be specific to each project and require some knowledge of the underlying data purpose.
      var numDetailsIntervals = pixelWidth / 2; // ...so at most, downsample to one point every two pixels in the graph

      var detailDataLoadReq = {
        reqType: "detail",
        reqNum: ++this.lastDetailReqNum,
        startDateTm: detailStartDateTm,
        endDateTm: detailEndDateTm,
        numIntervals: numDetailsIntervals,
        includeMinMax: true
      };
      this.lastDetailDataLoadReq = detailDataLoadReq;
      serverDataSim.loadData(detailDataLoadReq);
    }
    else {
      this.detailDataLoadComplete = true;
    }
  };

  /**
   Callback handler for server data load response. Will discard responses if newer requests were made in the meantime.
   Responsible for making sure all data received before continuing.
   @method _onServerDataLoad
   @private
   */
  GraphDataProvider.prototype._onServerDataLoad = function (dataLoadReq, dataLoadResp) {
    //console.log("_onServerDataLoad", dataLoadReq, dataLoadResp);

    if (dataLoadReq.reqType == 'detail') {
      if (this.lastDetailReqNum != dataLoadReq.reqNum) {
        return;  //discard because newer request was sent
      }
      else {
        this.lastDetailDataLoadResp = dataLoadResp;
        this.detailDataLoadComplete = true;
      }
    }
    else { //range
      if (this.lastRangeReqNum != dataLoadReq.reqNum) {
        return;  //discard because newer request was sent
      }
      else {
        this.lastRangeDataLoadResp = dataLoadResp;
        this.rangeDataLoadComplete = true;
      }
    }
    if (this.rangeDataLoadComplete && this.detailDataLoadComplete) {
      var splicedData = this._spliceRangeAndDetail(this.lastRangeDataLoadResp.dataPoints, this.lastDetailDataLoadResp.dataPoints);

      //Convert to dygraph native format
      var dyData = [];
	    var dyFullData = [];
      for (var i = 0; i < splicedData.length; i++) {
        // if (dataLoadReq.includeMinMax)
          dyFullData.push([new Date(splicedData[i].x), [splicedData[i].temp, splicedData[i].humidity, splicedData[i].heaterState, splicedData[i].pidOutput]]);
	      dyData.push([new Date(splicedData[i].x), splicedData[i].temp]);
        // else
          // dyData.push([new Date(splicedData[i].x), splicedData[i].y]);
      }

      var graphData = {
        dyData: dyData,
        detailStartDateTm: this.lastDetailDataLoadReq.startDateTm,
        detailEndDateTm: this.lastDetailDataLoadReq.endDateTm
      };

	    // if (graphData[0] != null) {
      this.newGraphDataCallbacks.fire(graphData);
	    // }
    }

  };

  /**
   Splices the range data set, with detail data set, to come-up with a single spliced dataset. See documentation
   for explanation.  There might be more efficient ways to code it.
   @method _spliceRangeAndDetail
   @private
   */
  GraphDataProvider.prototype._spliceRangeAndDetail = function (rangeDps, detailDps) {

    var splicedDps = [];

    if (rangeDps.length == 0 && detailDps.length == 0) {
      // do nothing, no data
    } else if (detailDps.length == 0) {
      for (var i = 0; i < rangeDps.length; i++) {
        splicedDps.push(rangeDps[i]);
      }
    } else if (rangeDps.length == 0) { //should never happen?
      for (var i = 0; i < detailDps.length; i++) {
        splicedDps.push(detailDps[i]);
      }
    } else {
      var detailStartX = detailDps[0].x;
      var detailEndX = detailDps[detailDps.length - 1].x;

      // Find last data point index in range where-after detail data will be inserted
      var lastRangeIdx = this._findLastRangeIdxBeforeDetailStart(rangeDps, detailStartX);

      //Insert 1st part of range
      if (lastRangeIdx >= 0) {
        splicedDps.push.apply(splicedDps, rangeDps.slice(0, lastRangeIdx + 1));
      }

      //Insert detail
      splicedDps.push.apply(splicedDps, detailDps.slice(0));

      //Insert last part of range
      var startEndRangeIdx = rangeDps.length;
      for (var i = startEndRangeIdx; i >= lastRangeIdx; i--) {
        if (i <= 1 || rangeDps[i - 1].x <= detailEndX) {
          break;
        } else {
          startEndRangeIdx--;
        }
      }

      if (startEndRangeIdx < rangeDps.length) {
        splicedDps.push.apply(splicedDps, rangeDps.slice(startEndRangeIdx, rangeDps.length));
      }

    }

    return splicedDps;
  };

  /**
   Finds last index in the range data set before the first detail data value.  Uses binary search per suggestion
   by Benoit Person (https://github.com/ddr2) in Dygraphs mailing list.
   @method _findLastRangeIdxBeforeDetailStart
   @private
   */
  GraphDataProvider.prototype._findLastRangeIdxBeforeDetailStart = function (rangeDps, firstDetailTime) {

    var minIndex = 0;
    var maxIndex = rangeDps.length - 1;
    var currentIndex;
    var currentElement;

    // Handle out of range cases
    if (rangeDps.length == 0 || firstDetailTime <= rangeDps[0].x)
      return -1;
    else if (rangeDps[rangeDps.length-1].x < firstDetailTime)
      return rangeDps.length-1;

    // Use binary search to find index of data point in range data that occurs immediately before firstDetailTime
    while (minIndex <= maxIndex) {
      currentIndex = Math.floor((minIndex + maxIndex) / 2);
      currentElement = rangeDps[currentIndex];

      if (currentElement.x < firstDetailTime) {
        minIndex = currentIndex + 1;

        //we want previous point, and will not often have an exact match due to different sampling intervals
        if (rangeDps[minIndex].x > firstDetailTime) {
          return currentIndex;
        }
      }
      else if (currentElement.x > firstDetailTime) {
        maxIndex = currentIndex - 1;

        //we want previous point, and will not often have an exact match due to different sampling intervals
        if (rangeDps[maxIndex].x < firstDetailTime) {
          return currentIndex-1;
        }

      }
      else {
        return currentIndex-1; //if exact match, we use previous range data point
      }

    }

    return -1;

  };


/***/ }),
/* 245 */
/***/ (function(module, exports) {

ServerDataSimulator = function (seriesName, minDelay, maxDelay) {
    this.seriesName = seriesName;
    // this.minDelay = minDelay === undefined ? 100 : minDelay;
    // this.maxDelay = maxDelay === undefined ? 1000 : maxDelay;

    this.onServerDataLoadCallbacks = $.Callbacks();
  };

  ServerDataSimulator.prototype.loadData = function (dataLoadReq) {
    //console.log("loadData", dataLoadReq);

    //Generate fake raw data set on first call

    //Do down sampling per the dataLoadReq
    var dataPoints = [];

    var intervalTime = (dataLoadReq.endDateTm.getTime() - dataLoadReq.startDateTm.getTime());
    var timePerInterval = intervalTime / dataLoadReq.numIntervals;
    var currTime = dataLoadReq.startDateTm.getTime();
	  if ((timePerInterval > 86400000) || (intervalTime / 5400000) > 2499) {
		  var tableUsed = 'Temperatures_1_day';
       	  } else if ((timePerInterval > 5400000 && timePerInterval < 86400000) || (intervalTime / 300000) > 2499) {
		  var tableUsed = 'Temperatures_90_min';
	  } else if ((timePerInterval > 300000 && timePerInterval < 5400000) || (intervalTime / 20000) > 2499) {
		  var tableUsed = 'Temperatures_5_min';
	  } else if (timePerInterval < 300000) {
		  var tableUsed = 'Temperatures_20_sec'
	  }

var startTimeUTC = dataLoadReq.startDateTm;	  
var startTimeStamp = startTimeUTC.getUTCSeconds() + startTimeUTC.getUTCMinutes() * 100 + startTimeUTC.getUTCHours() * 10000 + startTimeUTC.getUTCDate() * 1000000 + (startTimeUTC.getUTCMonth()+1) * 100000000 + startTimeUTC.getUTCFullYear() * 10000000000; 	  
var endTimeUTC = dataLoadReq.endDateTm;	  
var endTimeStamp = endTimeUTC.getUTCSeconds() + endTimeUTC.getUTCMinutes() * 100 + endTimeUTC.getUTCHours() * 10000 + endTimeUTC.getUTCDate() * 1000000 + (endTimeUTC.getUTCMonth()+1) * 100000000 + endTimeUTC.getUTCFullYear() * 10000000000; 	  

// AWS.config.region = 'us-west-1'; // Region

		// var dynamodb = new dynamo.DocumentClient();

var paramsdygraph = {
    TableName: tableUsed,
//     ProjectionExpression: "temp",
    Limit: 2500,
    ScanIndexForward: false,
	// ProjectionExpression: "Id, #dt",
    KeyConditionExpression: "Id = :therm and #dt between :dt1 and :dt2",
	ExpressionAttributeNames: {
		"#dt": "Date"
	},
    ExpressionAttributeValues: {
        ":therm": {
		S: "Thermostat_01"
	},
	":dt1": {
		N: startTimeStamp.toString()
	},
	":dt2": {
		N: endTimeStamp.toString()
	}
    }
};
var that = this;
var curtime3 = [];

if (dynamodb != null) {
dynamodb.query(paramsdygraph, function(err, data) {
     if (err)
       console.log(JSON.stringify(err, null, 3));
     else
//         console.log(JSON.stringify(data, null, 3));

       data.Items.forEach(function(item) {
         // curtime3 = moment.utc(item.Date.toString(), "YYYYMMDDHHmmss");
         curtime3 = moment.utc(item.Date.N, "YYYYMMDDHHmmss");
         curtime3.local();
	       // var b = parseFloat(item.temp.N);
         // dataPoints.push({x: new Date(curtime3.format("YYYY/MM/DD HH:mm:ss")), temp: parseFloat(item.temp.N), humidity: parseFloat(item.humidity.N), heaterState: parseFloat(item.heaterState.N), pidOutput: parseFloat(item.pidOutput.N)});
         dataPoints.push({x: curtime3, temp: parseFloat(item.temp.N), humidity: parseFloat(item.humidity.N), heaterState: parseFloat(item.heaterState.N), pidOutput: parseFloat(item.pidOutput.N)});
       });
	dataPoints = dataPoints.reverse();
	that._onDataLoad.call(that, dataLoadReq, dataPoints);

      // console.log(dataPoints);
});
} else {

    if (!this.serverData) {
      this._generateServerData();
    }

    var dataPoints = [];

var timePerInterval = (dataLoadReq.endDateTm.getTime() - dataLoadReq.startDateTm.getTime()) / dataLoadReq.numIntervals;
    var currTime = dataLoadReq.startDateTm.getTime();

    //Find start of load request in the raw dataset
    var currIdx = 0;
    for (var i = 0; i < this.serverData.length; i++) {

      if (this.serverData[currIdx].x < (currTime - timePerInterval))
        currIdx++;
      else
        break;
    }

    // Calculate average/min/max while downsampling
    while (currIdx < this.serverData.length && currTime < dataLoadReq.endDateTm.getTime()) {
      var numPoints = 0;
      var sum = 0;
      var min = 9007199254740992;
      var max = -9007199254740992;

      while (currIdx < this.serverData.length && this.serverData[currIdx].x < currTime) {
        sum += this.serverData[currIdx].y;
        min = Math.min(min, this.serverData[currIdx].y);
        max = Math.max(max, this.serverData[currIdx].y);
        currIdx++;
        numPoints++;
      }

      var temp = sum / numPoints

      if (numPoints == 0) {
        if (dataLoadReq.includeMinMax) {
          dataPoints.push({
            x: currTime,
            temp: null,
            min: null,
            max: null
          });
        }
        else {
          dataPoints.push({x: currTime, temp: null});
        }
      }
      else {
        if (dataLoadReq.includeMinMax) {
          dataPoints.push({
            x: currTime,
            temp: Math.round(temp),
            min: Math.round(min),
            max: Math.round(max)
          });
        }
        else {
          dataPoints.push({x: currTime, temp: temp});
        }
      }

      currTime += timePerInterval;
      currTime = Math.round(currTime);
    }
	// this._onDataLoad.call(this, dataLoadReq, dataPoints);
setTimeout($.proxy(this._onDataLoad, this, dataLoadReq, dataPoints), 400);
}

// this._onDataLoad(dataLoadReq, dataPoints);

// this._onDataLoad(dataLoadReq, dataPoints);

    // var delay = (Math.random() * (this.maxDelay - this.minDelay)) + this.minDelay;

    //console.log("dataPoints", dataLoadReq, dataPoints);

    //Random delay for "_onDataLoad" callback to simulate loading data from real server
    // setTimeout($.proxy(this._onDataLoad, this, dataLoadReq, dataPoints), 100);

  };

ServerDataSimulator.prototype._generateServerData = function () {

    var startMom = moment().utc();
	  startMom.add(-3, 'year');
	
    var endMom = moment().utc();
    endMom.add(30, 'day');

    var min = 50;
    var max = 80;
    var majorInterval = moment.duration(11, 'days');
    var minorInterval = moment.duration(1, 'minute');

    // if (this.seriesName == "Series-A") {
    //   majorInterval = moment.duration(11, 'days');
    //   minorInterval = moment.duration(1, 'minute');
    // }
    // else if (this.seriesName == "Series-B") {
    //   majorInterval = moment.duration(5, 'days');
    //   minorInterval = moment.duration(5, 'minute');
    // }
    // else {
    //   majorInterval = moment.duration(20, 'days');
    //   minorInterval = moment.duration(10, 'minute');
    // }

    var data = [];

    var totalDur = endMom.valueOf() - startMom.valueOf();

    var currTime = startMom.valueOf();
    var numPoints = (endMom.valueOf() - startMom.valueOf()) / minorInterval.valueOf();


    var period = majorInterval.valueOf();
    var periodNum = currTime / period;

    // just need a number that can change as we iterate, but stays
    // the same for each reload of data set given same start/end dates. This makes the overall trend look the same every time
    // for a given series, and might avoid some confusion in the demo.
    var periodIncr;
    var detailFactor;

    // if (this.seriesName == "Series-A") {
      periodIncr = startMom.date() / 31.0; //1-31
      detailFactor = 2 + (Math.random() * 5);
    // }
    // else if (this.seriesName == "Series-B") {
      // periodIncr = ((endMom.date() - 5) / 31.0) * 2; //1-31
      // detailFactor = 150 + (Math.random() * 650);
    // }
    // else {
      // periodIncr = Math.random();
      // detailFactor = 20 + (Math.random() * 250);
    // }

    var lastY = min;


    for (var i = 0; i < numPoints; i++) {
      if (Math.floor(currTime / period) != periodNum) {
        periodNum = Math.floor(currTime / period);
        periodIncr = moment(currTime).date() / 31.0;
        periodIncr = periodIncr * ((0.09) - (0.09 / 2));
      }
      else {

        if (lastY > (max + min) / 2)
          periodIncr = periodIncr - (lastY / (max + min)) * .000002;
        else
          periodIncr = periodIncr + ((max + min - lastY) / (max + min)) * .000002;
      }

      if (Math.floor(currTime / (period / 4) != periodNum)) {
        detailFactor = 2 + (Math.random() * 5);
      }


      lastY += periodIncr;
      if (lastY > max) {
        periodIncr = periodIncr * -1;
      }
      else if (lastY < min) {
        periodIncr = periodIncr * -1;
      }


      var detailY = lastY + (Math.random() - 0.5) * detailFactor;
//      if (detailY > max)
//        detailY = max;
//      if (detailY < min)
//        detailY = min;

      data.push({ x: currTime, y: detailY});
      currTime += minorInterval.valueOf();
    }

    this.serverData = data;

  };

  ServerDataSimulator.prototype._onDataLoad = function (dataLoadReq, dataPoints) {

    var dataLoadResp = {
      dataPoints: dataPoints
    };

    // ServerDataSimulator.prototype.onServerDataLoadCallbacks.fire(dataLoadReq, dataLoadResp);
    this.onServerDataLoadCallbacks.fire(dataLoadReq, dataLoadResp);
  };



/***/ }),
/* 246 */
/***/ (function(module, exports) {


  thermostat_button = function (pageCfg) {
		this.$rangeBtnsCont = pageCfg.$rangeBtnsCont;
  }

	  thermostat_button.prototype.init = function() {

		  var that = this;
			that.$rangeBtnsCont.children().removeClass('active');
		  
		  this._setupButtons();

		// AWS.config.region = 'us-west-1'; // Region
		// var dynamodb = new dynamo.DocumentClient();
		
		var paramsInitializeSlider = {
		    TableName: 'HeaterManualState',
		    KeyConditionExpression: "Id = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				S: "Website"
			}
		    }
		};

		var InitialSlider;	
if (dynamodb != null) {
		  dynamodb.query(paramsInitializeSlider, function(err, data) {
		      if (err)
			console.log(JSON.stringify(err, null, 3));
		      else
		      data.Items.forEach(function(item) {
			InitialSlider = item.WebsiteHeaterState.S;
		      });
		  if (InitialSlider == "1") {
			  
			  var $btnInput = that.$rangeBtnsCont.find("#off");
			  $btnInput.addClass('active');

		      // $("#off").prop("checked", true);
		    // that.$rangeBtnsCont.find(":radio[name='off']").checked = true;
		      //console.log(JSON.stringify("Turned Off", null, 3));
			 
		  } else if (InitialSlider == "2") {
			  
			  var $btnInput = that.$rangeBtnsCont.find("#auto");
			  $btnInput.addClass('active');
			  
		      // $("#automatic").prop("checked", true);
		    // that.$rangeBtnsCont.find("label[name='auto']").prop("checked", true);
		      //console.log(JSON.stringify("Turned Auto", null, 3));
			  
		  } else if (InitialSlider == "3") {
			  
			  var $btnInput = that.$rangeBtnsCont.find("#on");
			  $btnInput.addClass('active');

		      // $("#on").prop("checked", true);
		    // that.$rangeBtnsCont.find("label[name='on']").prop("checked", true);
		      //console.log(JSON.stringify("Turned On", null, 3));

		  }

		//       console.log(JSON.stringify(InitialSlider, null, 3));
		  });
} else {
			  var $btnInput = that.$rangeBtnsCont.find("#auto");
			  $btnInput.addClass('active');
}	

		}
	
	thermostat_button.prototype._setupButtons = function () {

	var that = this;

		// AWS.config.region = 'us-west-1'; // Region
		// var dynamodb = new dynamo.DocumentClient();

		var paramsOnUpdate = {
		    TableName: 'HeaterManualState',
		    Key: {
		      "Id": {
			      S: "Website"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				S: "3"
			}
		    },
		    ReturnValues: "ALL_NEW"
		};

		var paramsAutoUpdate = {
		    TableName: 'HeaterManualState',
		    Key: {
		      "Id": {
			      S: "Website"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				S: "2"
			}
		    },
		    ReturnValues: "ALL_NEW"
		};

		var paramsOffUpdate = {
		    TableName: 'HeaterManualState',
		    Key: {
		      "Id": {
			      S: "Website"
		      },
		      "Date": {
			      N: "1"
		      }
		    },
		    UpdateExpression: "SET WebsiteHeaterState = :resourceFromSite",
		    ExpressionAttributeValues: {
			":resourceFromSite": {
				S: "1"
			}
		    },
		    ReturnValues: "ALL_NEW"
		};

		this.$rangeBtnsCont.children().on('click', function (evt) {
			evt.preventDefault();
		      var rangeType = evt.target.id.toString();
			that.$rangeBtnsCont.children().removeClass('active');
			$(this).addClass('active');
			
if (dynamodb != null) {
			if (rangeType == "off") {

			 dynamodb.updateItem(paramsOffUpdate, function(err, data) {
			    if (err)
				console.log(JSON.stringify(err, null, 2));
			    else
				console.log(JSON.stringify(data, null, 2));
			});
					
			} else if (rangeType == "auto") {

			 dynamodb.updateItem(paramsAutoUpdate, function(err, data) {
			    if (err)
				console.log(JSON.stringify(err, null, 2));
			    else
				console.log(JSON.stringify(data, null, 2));
			});

			
			} else if (rangeType == "on") {

			 dynamodb.updateItem(paramsOnUpdate, function(err, data) {
			    if (err)
				console.log(JSON.stringify(err, null, 2));
			    else
				console.log(JSON.stringify(data, null, 2));
			});
			}
}
		});
	}





/***/ })
/******/ ]);