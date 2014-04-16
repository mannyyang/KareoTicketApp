// Embeds the iframe for the webform into the referencing webpage and handles
// resizing on of the iframe on request of the document inside it
(function (window, undefined) {

  var forms = {};

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function indexOf(elt /*, from*/) {
      var len = this.length >>> 0;

      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0) {
        from += len;
      }

      for (; from < len; from++) {
        if (from in this && this[from] === elt) {
          return from;
        }
      }
      return -1;
    };
  }

  function applyContext(context, func) {
    return function() {
      func.apply(context, arguments);
    };
  }

  function receiveMessage(callback, origin) {
    var interval_id, last_hash, attached_callback;
    if (window['postMessage']) { // the browser supports window.postMessage
      if (callback) {
        attached_callback = function(e) {
          if ((typeof origin === 'string' && e.origin !== origin) || (Object.prototype.toString.call(origin) === "[object Function]" && origin(e.origin) === false)) {
            return !1;
          }
          callback(e);
        };
      }

      if (window['addEventListener']) {
        window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
      } else {
        window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
      }
    } else { // the browser does not support window.postMessage
      if(interval_id) {
        clearInterval(interval_id);
      }
      interval_id = null;

      if (callback) {
        interval_id = setInterval(function() {
          var hash = document.location.hash,
                  re = /^#?\d+&/;
          if (hash !== last_hash && re.test(hash)) {
            last_hash = hash;
            callback({data: hash.replace(re, '')});
          }
        }, 500);
      }
    }
  }

  function getForm(identifier) {
    if (!forms[identifier]) {
      forms[identifier] = new PodioWebForm(identifier);
      forms[identifier].initialize();
    }
    return forms[identifier];
  }

  function render(identifier) {
    getForm(identifier).render();
  }

  function configure(identifier, params) {
    var form = getForm(identifier);
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        form[key] = params[key];

        if(key == 'frameUrl') {
          form['domain'] = params[key].replace( /([^:]+:\/\/[^\/]+).*/, '$1');
        }
      }
    }
    form.setupMessaging();
  }

  // Form object instance
  function PodioWebForm(identifier) {
    this.identifier = identifier;
    this.key = '';
    this.height = '';
    this.frameUrl = '';
    this.domain = '';
    this.iframeId = '';
    this.disabledUrl = '';
    this.allowedDomains = '';
    this.isDisabled = false;
    this.theme = '';

    this.initialize = function() {
      this.key = this.identifier + '' + Math.floor(Math.random() * 1000000);
      this.iframeId = 'podioWebForm' + this.key;
    };

    this.setupMessaging = function() {
      window._podioWebForm.receiveMessage(applyContext(this, this.onFormResize), this.domain);
    };

    this.render = function() {
      this.isDisabled = this.allowedDomains.indexOf(location.host) === -1;

      document.getElementById("Podio-form").innerHTML = this.generateFrameMarkup();
    };


    this.onFormResize = function(message) {
      if(!message.data) {
        return;
      }

      var msg_components = message.data.split(':');
      if(msg_components.length < 2) {
        return;
      }

      var senderId = msg_components[0];

      if(senderId != this.identifier) {
        return;
      }

      var curHt = parseInt(msg_components[1], 10);
      if (!curHt) {
        return;
      }

      var scrollToTop = (msg_components[2] === 'true');

      var iframe = document.getElementById(this.iframeId);
      iframe.style.height = (curHt) + 50 + "px";

      // Scroll to iframe if there is an error message
      if(scrollToTop) {
        window.scrollTo(0, absOffsetTop(iframe));
      }
    };

    this.generateFrameMarkup = function() {
      return '<iframe class="podio-webform-frame" id="' + this.iframeId + '"' + ' height="' + this.height + '" style="width:100%;border:none;"' + 'allowTransparency="true" frameborder="0" scrolling="yes"' + 'src="' + ((this.isDisabled) ? this.disabledUrl + '?domain=' + location.host : this.frameUrl) + '#' + encodeURIComponent(document.location.href) + '"></iframe>';
    };

    this.addSnippetStyling = function () {
      if(document.createElement && document.getElementsByTagName && document.getElementById) {
        var existingStyle = document.getElementById('podio_webform_style');
        if(!existingStyle) {
          var head = document.getElementsByTagName('head')[0];
          if(head) {
            try {
              var style = document.createElement('style');
              style.id = 'podio_webform_style';
              style.type = 'text/css';
              /*jshint multistr:true */
              style.innerHTML = "\
                .podio-webform-container, .podio-webform-container a {\
                  font-style:normal !important;\
                  font-weight:normal !important;\
                  font-size:11px !important;\
                  font-family:arial,helvetica,sans-serif !important;\
                  color:#CCC !important;\
                  text-decoration:none !important;\
                }\
                .podio-webform-container {\
                  background: " + (this.theme == 'dark' ? '#333' : '#fff') + " !important;\
                  margin:0 0 5px 0 !important;\
                  padding:0  0 5px 15px !important;\
                  text-align:left !important;\
                }\
                .podio-webform-container a.podio-webform-inner {\
                  margin:0 !important;\
                  padding:0 !important;\
                }\
                .podio-webform-container a.podio-webform-inner:hover {\
                  text-decoration:underline !important;\
                }\
              ";
              head.appendChild(style);
            } catch(err) {
              // This can fail in IE. It's just styling, so just ignore it.
            }
          }
        }
      }
    };
  }

  function absOffsetTop(domObject){
    var selectedPosY = 0;

    while(domObject !== null){
      selectedPosY += domObject.offsetTop;
      domObject = domObject.offsetParent;
    }

   return selectedPosY;
  }

  // Expose methods
  window._podioWebForm = {
    configure: configure,
    render: render,
    receiveMessage: receiveMessage
  };


})(window);


_podioWebForm.configure(430233, {"height":760,"frameUrl":"https://podio.com/webforms/5483249/430233?e=true","disabledUrl":"https://podio.com/webforms/5483249/430233/disabled","allowedDomains":["localhost:9000"],"theme":"clean"});