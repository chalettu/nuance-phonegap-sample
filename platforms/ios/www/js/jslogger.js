
/*

  JSLogger

  @version 1.6
  @author  Dumitru Glavan
  @link    http://jslogger.com
  @link    http://dumitruglavan.com
*/

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.JSLogger = (function() {

    JSLogger.prototype.url = false;

    JSLogger.prototype.proto = "http";

    JSLogger.prototype.host = "jslogger.com";

    JSLogger.prototype.port = 80;

    JSLogger.prototype.portSSL = 443;

    JSLogger.prototype.track = true;

    JSLogger.prototype.apiKey = "53694952f59f6a0f02000020";

    JSLogger.prototype.logWindowErrors = true;

    JSLogger.prototype.jsonParserPath = "//jslogger.com/json2.js";

    function JSLogger(options) {
      if (options == null) options = {};
      this.windowErrorHandler = __bind(this.windowErrorHandler, this);
      this.setOptions(options);
      if (typeof window.JSON !== "object") this.loadJSONParser();
      if (this.logWindowErrors) window.onerror = this.windowErrorHandler;
    }

    JSLogger.prototype.log = function(data, extraParams) {
      if (this.track) return this.logDataByType("log", data, extraParams);
    };

    JSLogger.prototype.event = function(data, extraParams) {
      if (this.track) return this.logDataByType("event", data, extraParams);
    };

    JSLogger.prototype.setOptions = function(options) {
      this.url = options.url || this.url;
      this.proto = options.proto || this.getCurrentProtocol();
      this.host = options.host || this.host;
      this.portSSL = options.portSSL || this.portSSL;
      this.port = options.port || this.getPortByProtocol();
      this.apiKey = options.apiKey || this.apiKey;
      this.track = typeof options.track !== "undefined" ? options.track : this.track;
      return this.logWindowErrors = typeof options.logWindowErrors !== "undefined" ? options.logWindowErrors : this.logWindowErrors;
    };

    JSLogger.prototype.getCurrentProtocol = function() {
      return window.location.protocol.replace(":", "");
    };

    JSLogger.prototype.getPortByProtocol = function() {
      if (this.proto === "https") {
        return this.portSSL;
      } else {
        return this.port;
      }
    };

    JSLogger.prototype.createCORSRequest = function(url) {
      var xhr;
     // xhr = typeof XMLHttpRequest !== "undefined" ? new XMLHttpRequest() : null;
     // if (this.proto !== "https" && xhr && "withCredentials" in xhr) {
     //   xhr.open("post", url, true);
    //  } else if (this.proto !== "https" && typeof XDomainRequest !== "undefined") {
    //    xhr = new XDomainRequest();
   //     xhr.open("post", url);
  //    } else {
        xhr = document.createElement("script");
        xhr.type = "text/javascript";
        xhr.src = url;
     //   console.log(url);
     // }
      return xhr;
    };

    JSLogger.prototype.logDataByType = function(type, data, extraParams) {
      var params, request, url;
      url = this.getUrl(type);
      request = this.createCORSRequest(url);
      if (request) {
        params = this.serialize(data, "dump");
        if (extraParams) {
          params = "" + params + "&" + (this.serialize(extraParams, "extra_params"));
        }
        if (this.apiKey) params = "" + params + "&key=" + this.apiKey;
        params = "" + params + "&_t=" + (new Date().getTime());
        return this.sendData(request, params);
      }
    };

    JSLogger.prototype.sendData = function(request, params) {
      var body;

        request.src = "" + request.src + "?" + params;
        body = document.getElementsByTagName("body")[0];
        body.appendChild(request);
        return body.removeChild(request);
      
    };

    JSLogger.prototype.serialize = function(obj, prefix) {
      if (prefix == null) prefix = "dump";
      if (typeof obj !== "string") obj = JSON ? JSON.stringify(obj) : obj;
      return "" + prefix + "=" + (encodeURIComponent(obj));
    };

    JSLogger.prototype.getUrl = function(action) {
      if (!this.url) {
        this.url = ":proto://:host::port".replace(/:proto/, "http").replace(/:host/, this.host).replace(/:port/, this.port);
      }
      return "" + this.url + "/" + action;
    };

    JSLogger.prototype.loadJSONParser = function() {
      var head, jsonScript;
      jsonScript = document.createElement("script");
      jsonScript.type = "text/javascript";
      jsonScript.src = this.jsonParserPath;
      head = document.getElementsByTagName("head")[0];
      return head.appendChild(jsonScript);
    };

    JSLogger.prototype.windowErrorHandler = function(msg, url, line) {
      return this.log({
        msg: msg,
        url: url,
        line: line
      });
    };

    return JSLogger;

  })();

}).call(this);
