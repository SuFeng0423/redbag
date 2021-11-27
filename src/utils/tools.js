/* 工具函数集 */
function deepClone(source) {
    if (source === null || !source) {
        return source;
    }
    let clone = {};
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (typeof source[key] === 'object') {
                clone[key] = deepClone(source[key]);
            } else {
                clone[key] = source[key1]
            }
        }
    }
    return clone;
}

// 扩展
function extend(target, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

/**
 * 继承
 * @param {Function} clazz 源类
 * @param {Function} baseClazz 基类
 */
function inherites(clazz, baseClazz) {
    const clazzPrototype = clazz.prototype;
    clazz.prototype = Object.create(baseClazz.prototype);
    for (let key in clazzPrototype) {
        clazz.prototype = clazzPrototype[key];
    }
    clazz.prototype.constructor = clazz;
    clazz.superClass = baseClazz;
}

// 缓存版本
const LOCAL_VER = '1.0.1';
(function localVerManage() {
    let localVer = window.localStorage.getItem('LOCAL_VER');
    if (localVer) {
        if (localVer !== LOCAL_VER) {
            window.localStorage.clear();
        }
    } else {
        window.localStorage.setItem('LOCAL_VER', LOCAL_VER);
    }
})();

// 自动清缓存
(function refreshLocal(){
    let storage = window.localStorage;
    for (let key in storage) {
        let data;
        try {
            data = JSON.parse(storage[key]);
        } catch(e) {
            data = storage[key];
        }
        if (typeof data === 'object' && data.clean === 'refresh') {
            window.localStorage.removeItem(key);
        }
    }
})();

/* 生成过期时间 */
function expiry( val ) {

    if ( ! val ) {
        return null;
    }

    let interval = parseInt( val );
    let unit = val.replace( interval, '' );

    if ( 'd' === unit ) {
        interval = interval * 24 * 60 * 60 * 1000;
    }

    if ( 'h' === unit ) {
        interval = interval * 60 * 60 * 1000;
    }

    if ( 'm' === unit ) {
        interval = interval * 60 * 1000;
    }

    if ( 's' === unit ) {
        interval = interval * 1000;
    }
    return Date.now() + interval;
}
/* 获取localStore值 */
function _getStore (name) {
    let obj = null;
    try {
        obj = window.localStorage.getItem(name) ? JSON.parse(window.localStorage.getItem(name)) : null;
    } catch (e) {
        window.localStorage.removeItem(name);
    }
    return obj;
}
/**
 * 存储localStorage
 */
export const setStore = ({name, key, content, options}) => {
    if (!name) return;
    let obj = {
        value: {},
        expiry: options ? expiry(options.expiry) : null,
        clean: options ? options.clean : null,
    };
    if (key) {
        let tmp_obj = _getStore(name);
        if (tmp_obj && tmp_obj.value) {
            tmp_obj.value[key] = content;
            obj.value = tmp_obj.value;
        }
    } else {
        obj.value = content;
    }
    window.localStorage.setItem(name, JSON.stringify(obj));
}

/**
 * 获取localStorage
 */
export const getStore = ({name, key}) => {
    if (!name) return;
    let obj = null;
    const tmp_obj = _getStore(name);
    // console.log(`${name}-${key}:`, tmp_obj);
    // 判断是否过期
    if ( tmp_obj && tmp_obj.expiry && Date.now() > tmp_obj.expiry ) {
        window.localStorage.removeItem(name);
        // console.log(`${name}-${key}:`, '过期了');
        return null;
    }
    if (key) {
        if (tmp_obj && tmp_obj.value) {
            obj = tmp_obj.value[key];
        }
    } else {
        obj = tmp_obj ? tmp_obj.value : null;
    }
    return obj;
}

/**
 * 删除localStorage
 */
export const removeStore = ({name}) => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/* istanbul ignore next */
export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/* istanbul ignore next */
export const getStyle = function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

/**
 * 参数序列化
 */
export const paramSerializer = (obj, ognl) => {
    var query = '',name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                if(subValue==0 || subValue){
                    fullSubName = name + "[]";
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += paramSerializer(innerObj) + '&';
                }
            }
        } else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                if(subValue==0 || subValue){
                    if(ognl){
                        fullSubName = name + '.' + subName;
                    } else {
                        fullSubName = name + '[' + subName + "]";
                    }
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += paramSerializer(innerObj) + '&';
                }
            }
        } else if (value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
};

export const getQueryString = (name, search) => {
  search = search ||  window.location.search.substr(1);
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  let r = search.match(reg);
  if (r != null) return  decodeURIComponent(r[2]); return null;
}

export const browser = {
    versions: function(){
        let u = navigator.userAgent,
        app = navigator.appVersion;
        return {
            chrome: u.indexOf('Chrome') > -1, //是否chrome浏览器
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

export function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export const cookie = {
    write: function (name, value, days, domain, path) {
      var date = new Date();
      days = days || 10950;
      path = path || '/';
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = '; expires=' + date.toGMTString();
      var cookieValue = name + '=' + value + expires + '; path=' + path;
      if (domain) {
        cookieValue += '; domain=' + domain;
      }
      document.cookie = cookieValue;
    },
    read: function (name) {
      var allCookie = '' + document.cookie;
      var index = allCookie.indexOf(name);
      if (name === undefined || name === '' || index === -1) return '';
      var ind1 = allCookie.indexOf(';', index);
      if (ind1 == -1) ind1 = allCookie.length;
      return unescape(allCookie.substring(index + name.length + 1, ind1));
    },
    remove: function (name) {
      if (this.read(name)) {
        // this.write(name, '', -1, '/');
        this.write(name, '', -1, '', '/');
      }
    },
  };