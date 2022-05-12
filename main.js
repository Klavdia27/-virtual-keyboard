const state = {
    lang: "en",
    isShiftPressed: false,
  }
  //console.log('1=',langEn)
  let langEn = true;
  console.log('2=',langEn)
  localStorage.setItem('languageEnglish', langEn);
  console.log('3=',langEn)
  langEn = localStorage.getItem('languageEnglish');
  console.log('4=',langEn)
  console.log(langEn === "true")
  class Template {
    constructor() {
      this.stack = [];
    }
  
    createElement = (tagName, args) => {
      let props = {};
  
      let lastIdx = args.length - 1;
      const isLastProps = this.isProps(args[lastIdx]);
  
      if (isLastProps) {
        props = { ...args[lastIdx] };
        args = args.slice(0, lastIdx);
        lastIdx--;
      }
  
      if (typeof args[lastIdx] === "string") {
        this.stack.push(this.h(tagName, props, ...args));
      } else {
        let childs = [...this.stack];
        for (let x of args) {
          childs = [...childs, ...x.stack];
        }
        const temp = this.h(tagName, props, ...childs);
  
        this.stack = [];
        this.stack.push(temp);
      }
    }
  
    div = (content, props) => {
      const copyArgs = Array.from([content, props]).slice(0);
      this.createElement("div", copyArgs);
      return this;
    }
  
    toString = () => {
      const html = this.stack.reduce((acc, x) => {
        return acc + this.render(x);
      }, "");
  
      this.stack = [];
  
      return html;
    }
  
    h = (tagName, props, ...children) => {
      return {
        tagName,
        props,
        children,
      };
    }
  
    isProps = (obj) => {
      return typeof obj === "object" &&
        !obj.hasOwnProperty("children") &&
        !obj.hasOwnProperty("stack");
    }
  
    render = (element) => {
      let attrs = [];
      if (Object.keys(element.props).length) {
        const sortedKeys = Object.keys(element.props).sort();
        sortedKeys.forEach(keyName => {
          attrs.push(" " + keyName + "=\"" + element.props[keyName] + "\"");
        });
      }
  
      let result = "<" + element.tagName + attrs.join("") + ">";
  
      element.children.forEach(x => {
        if (typeof x === "string") {
          result += x;
        } else {
          result += this.render(x);
        }
      });
  
      if (element.tagName !== "br") {
        result += "</" + element.tagName + ">";
      }
  
      return result;
    }
  }
  
  const lang = {
    en: [
      ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
      ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight","Backslash", "Delete"],
      ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
      ["ShiftLeft", "IntlBackslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
      ["fn", "ControlLeft", "AltLeft", "MetaLeft", "Space", "MetaRight", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight"],
    ],
  };
  
  const renderConfigEn = new Proxy({
    "Backquote":"§",
    "Digit1":"1",
    "Digit2":"2",
    "Digit3":"3",
    "Digit4":"4",
    "Digit5":"5",
    "Digit6":"6",
    "Digit7":"7",
    "Digit8":"8",
    "Digit9":"9",
    "Digit0":"0",
    "Minus":"-",
    "Equal":"=",
    "KeyQ":"q",
    "KeyW":"w",
    "KeyE":"e",
    "KeyR":"r",
    "KeyT":"t",
    "KeyY":"y",
    "KeyU":"u",
    "KeyI":"i",
    "KeyO":"o",
    "KeyP":"p",
    "KeyA":"a",
    "KeyS":"s",
    "KeyD":"d",
    "KeyF":"f",
    "KeyG":"g",
    "KeyH":"h",
    "KeyJ":"j",
    "KeyK":"k",
    "KeyL":"l",
    "KeyZ":"z",
    "KeyX":"x",
    "KeyC":"c",
    "KeyV":"v",
    "KeyB":"b",
    "KeyN":"n",
    "KeyM":"m",
    "Backspace": "Backspace",
    "Semicolon": ";", 
    "Quote" : "'",
    "BracketLeft" : "[", 
    "BracketRight": "]",
    "Backslash": "&#92", 
    "Tab" : "Tab",
    "CapsLock" : "Caps Lock",
    "ShiftLeft" : "Shift", 
    "IntlBackslash" : "`",
    "Comma" : ",", 
    "Period" : ".", 
    "Slash" :  "/", 
    "ArrowUp" :  "&#8593", 
    "ShiftRight"  : "Shift", 
    "fn" : "fn",
    "ControlLeft" :  "ctrl", 
    "AltLeft" :  "alt", 
    "MetaLeft" : "cmd" , 
    "Space" : "Space"  , 
    "MetaRight" : "cmd" , 
    "AltRight" : "alt" , 
    "ArrowLeft" : "&#8592" , 
    "ArrowDown" :  "&#8595", 
    "ArrowRight" :  "&#8594",  
  }, {
    get: (obj, name) => obj[name.toString()] || name,
  });
  
  const renderConfigRu = new Proxy({
    "Backquote":">",
    "Digit1":"1",
    "Digit2":"2",
    "Digit3":"3",
    "Digit4":"4",
    "Digit5":"5",
    "Digit6":"6",
    "Digit7":"7",
    "Digit8":"8",
    "Digit9":"9",
    "Digit0":"0",
    "Minus":"-",
    "Equal":"=",
    "KeyQ":"й",
    "KeyW":"ц",
    "KeyE":"у",
    "KeyR":"к",
    "KeyT":"е",
    "KeyY":"н",
    "KeyU":"г",
    "KeyI":"ш",
    "KeyO":"щ",
    "KeyP":"з",
    "KeyA":"ф",
    "KeyS":"ы",
    "KeyD":"в",
    "KeyF":"а",
    "KeyG":"п",
    "KeyH":"р",
    "KeyJ":"о",
    "KeyK":"л",
    "KeyL":"д",
    "KeyZ":"я",
    "KeyX":"ч",
    "KeyC":"с",
    "KeyV":"м",
    "KeyB":"и",
    "KeyN":"т",
    "KeyM":"ь",
    "Backspace": "Backspace",
    "Semicolon": "ж", 
    "Quote" : "э",
    "BracketLeft" : "[", 
    "BracketRight": "]",
    "Backslash": "ё", 
    "Tab" : "Tab",
    "CapsLock" : "Caps Lock",
    "ShiftLeft" : "Shift", 
    "IntlBackslash" : "]",
    "Comma" : "б", 
    "Period" : "ю", 
    "Slash" :  "/", 
    "ArrowUp" :  "&#8593", 
    "ShiftRight"  : "Shift", 
    "fn" : "fn",
    "ControlLeft" :  "ctrl", 
    "AltLeft" :  "alt", 
    "MetaLeft" : "cmd" , 
    "Space" : "Space"  , 
    "MetaRight" : "cmd" , 
    "AltRight" : "alt" , 
    "ArrowLeft" : "&#8592" , 
    "ArrowDown" :  "&#8595", 
    "ArrowRight" :  "&#8594",  
  }, {
    get: (obj, name) => obj[name.toString()] || name,
  });
  
  const alternativeRenderConfigEn = new Proxy({
    "Backquote":"±",
    "Digit1":"!",
    "Digit2":"@",
    "Digit3":"#",
    "Digit4":"$",
    "Digit5":"%",
    "Digit6":"^",
    "Digit7":"&",
    "Digit8":"*",
    "Digit9":"(",
    "Digit0":")",
    "Minus":"_",
    "Equal":"+",
    "KeyQ":"Q",
    "KeyW":"W",
    "KeyE":"E",
    "KeyR":"R",
    "KeyT":"T",
    "KeyY":"Y",
    "KeyU":"U",
    "KeyI":"I",
    "KeyO":"O",
    "KeyP":"P",
    "KeyA":"A",
    "KeyS":"S",
    "KeyD":"D",
    "KeyF":"F",
    "KeyG":"G",
    "KeyH":"H",
    "KeyJ":"J",
    "KeyK":"K",
    "KeyL":"L",
    "KeyZ":"Z",
    "KeyX":"X",
    "KeyC":"C",
    "KeyV":"V",
    "KeyB":"B",
    "KeyN":"N",
    "KeyM":"M",
    "Backspace": "Backspace",
    "Semicolon": ":", 
    "Quote" : "&#34",
    "BracketLeft" : "{", 
    "BracketRight": "}",
    "Backslash": "&#92", 
    "Tab" : "Tab",
    "CapsLock" : "Caps Lock",
    "ShiftLeft" : "Shift", 
    "IntlBackslash" : "~",
    "Comma" : "<", 
    "Period" : ">", 
    "Slash" :  "?", 
    "ArrowUp" :  "&#8593", 
    "ShiftRight"  : "Shift", 
    "fn" : "fn",
    "ControlLeft" :  "ctrl", 
    "AltLeft" :  "alt", 
    "MetaLeft" : "cmd" , 
    "Space" : "Space"  , 
    "MetaRight" : "cmd" , 
    "AltRight" : "alt" , 
    "ArrowLeft" : "&#8592" , 
    "ArrowDown" :  "&#8595", 
    "ArrowRight" :  "&#8594", 
  }, {
    get: (obj, name) => obj[name.toString()] || name,
  })
  const alternativeRenderConfigRu = new Proxy({
    "Backquote":"<",
    "Digit1":"!",
    "Digit2":"&#34",
    "Digit3":"№",
    "Digit4":"%",
    "Digit5":":",
    "Digit6":",",
    "Digit7":".",
    "Digit8":";",
    "Digit9":"(",
    "Digit0":")",
    "Minus":"_",
    "Equal":"+",
    "KeyQ":"Й",
    "KeyW":"Ц",
    "KeyE":"У",
    "KeyR":"К",
    "KeyT":"Е",
    "KeyY":"Н",
    "KeyU":"Г",
    "KeyI":"Ш",
    "KeyO":"Щ",
    "KeyP":"З",
    "KeyA":"Ф",
    "KeyS":"Ы",
    "KeyD":"В",
    "KeyF":"А",
    "KeyG":"П",
    "KeyH":"Р",
    "KeyJ":"О",
    "KeyK":"Л",
    "KeyL":"Д",
    "KeyZ":"Я",
    "KeyX":"Ч",
    "KeyC":"С",
    "KeyV":"М",
    "KeyB":"И",
    "KeyN":"Т",
    "KeyM":"Ь",
    "Backspace": "Backspace",
    "Semicolon": ":", 
    "Quote" : "&#34",
    "BracketLeft" : "{", 
    "BracketRight": "}",
    "Backslash": "&#92", 
    "Tab" : "Tab",
    "CapsLock" : "Caps Lock",
    "ShiftLeft" : "Shift", 
    "IntlBackslash" : "[",
    "Comma" : "<", 
    "Period" : ">", 
    "Slash" :  "?", 
    "ArrowUp" :  "&#8593", 
    "ShiftRight"  : "Shift", 
    "fn" : "fn",
    "ControlLeft" :  "ctrl", 
    "AltLeft" :  "alt", 
    "MetaLeft" : "cmd" , 
    "Space" : "Space"  , 
    "MetaRight" : "cmd" , 
    "AltRight" : "alt" , 
    "ArrowLeft" : "&#8592" , 
    "ArrowDown" :  "&#8595", 
    "ArrowRight" :  "&#8594", 
  }, {
    get: (obj, name) => obj[name.toString()] || name,
  })
  
  class Keyboad {
    constructor(template) {
      this._template = template;
    }
  
    init = () => {
      this.render("en");
    };
  
    render = (l, isShiftPressed = false) => {
      //console.log(localStorage.getItem('languageEnglish'))
      langEn = localStorage.getItem('languageEnglish');
      console.log('0', langEn)
      const keys = lang[l].reduce((acc, row) => {
        const ks = row.map((k) => {
          let content = "";
        
  
          if (isShiftPressed === true && langEn === "true" ) {
            content = alternativeRenderConfigEn[k];
          } 
          if (isShiftPressed === false && langEn === "true" ){
            content = renderConfigEn[k];
          }
  
          if (isShiftPressed === true && langEn === "false" ) {
            content = alternativeRenderConfigRu[k];
          } 
          if (isShiftPressed === false && langEn === "false" ){
            content = renderConfigRu[k];
          }
  
          return new Template().div(content, { class: "key", id: k.toString().toLowerCase() }).toString();
        }).join("");
        return acc + ks;
      }, "");
      const keyboard = new Template().div(keys, { class: "keyboard" });
      document.body.innerHTML = keyboard.toString();
  
      let textarea = document.createElement('textarea');
      textarea.id = "text";
      textarea.innerHTML = "";
      document.body.appendChild(textarea);
  
      let namePc = document.createElement('div');
      namePc.id = "namepc";
      namePc.innerHTML = "Virtual keyboard (Mac)";
      document.body.appendChild(namePc);
  
      let changelang = document.createElement('div');
      changelang.id = "changelang";
      changelang.innerHTML = "change language &ltctrl + cmd&gt <br><br> https://github.com/Klavdia27/-virtual-keyboard/pull/2 ";
      document.body.appendChild(changelang);
    }
  }
  
  const keyboard = new Keyboad();
  
  window.onload = function () {
    keyboard.init(); 
  };
  
  document.addEventListener("keydown", ({ code }) => {
    switch (code) {
      case "ShiftLeft": {
        state.isShiftPressed = true;
        keyboard.render(state.lang, state.isShiftPressed);
        document.getElementById('shiftleft').classList.add('active');
        break;
      }
      case "ShiftRight": {
        state.isShiftPressed = true;
        keyboard.render(state.lang, state.isShiftPressed);
        document.getElementById('shiftright').classList.add('active');
        break;
      }
      default: {
        break;
      }
    }
  });
  
  document.addEventListener("keyup", ({ code }) => {
    switch (code) {
      case "ShiftLeft": {
        state.isShiftPressed = false;
        keyboard.render(state.lang, state.isShiftPressed);
        document.getElementById('shiftleft').classList.remove('active');
        break;
      }
      case "ShiftRight": {
        state.isShiftPressed = false;
        keyboard.render(state.lang, state.isShiftPressed);
        document.getElementById('shiftright').classList.remove('active');
        break;
      }
      default: {
        break;
      }
    }
  });
  
  
  document.addEventListener("keydown", (event) => {
    let id = event.code.toString().toLowerCase();
    document.querySelectorAll(".key").forEach(function(element) {
      element.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
    setTimeout(() => {
      document.getElementById(id).classList.remove('active');
    },200)
  }, true)
  
  document.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains('key') ) { 
    let id = event.target.id.toString().toLowerCase();
    document.querySelectorAll(".key").forEach(function(element) {
      element.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
    setTimeout(() => {
      document.getElementById(id).classList.remove('active');
    },200)
  }

  }, true)
  
  // смена языка клавиатуры  cmd и ctrl
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.metaKey) {
      document.querySelectorAll(".key").forEach(function(element) {
        element.classList.remove('active');
      });
      document.getElementById('metaleft').classList.add('active');
      document.getElementById('controlleft').classList.add('active'); 
      console.log('смена языка клавиатуры ');
      langEn === "true" ? langEn = "false" : langEn = "true";
      setLocalStorage();
      keyboard.init();
    }
  }); 
  
  document.querySelectorAll(".use-keyboard-input").forEach(element => {
    element.addEventListener("focus", () => {
      console.log(element.value)
    })
  });
  function setLocalStorage() {
    localStorage.setItem('languageEnglish', langEn);
  }
  window.addEventListener('beforeunload', setLocalStorage);