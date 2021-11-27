import Vue from 'vue';
import moment from 'moment';
import { getList } from '../pages/marketV2/utils/constant'

// 注册filter
Vue.filter('filter-empty', function (value) {
    return (value || value === 0) ? value : '-';
})
// 格式化时间
Vue.filter('date-format', function (value, format) {
    if (!value) {
        return '-';
    }
    return Number(value) ? moment(value, 'X').format(format ? format : 'YYYY-MM-DD HH:mm') : value;
})
Vue.filter('date-format-to-string', dateFormat)

// 格式化时间 date -> string
export function dateFormat(value, format) {
  if (
    !value || 
    (
      !(value instanceof moment) &&
      Object.prototype.toString.call(value) !== '[object Date]'
    )
  ) {
      return '';
  }
  return value ? moment(value).format(format ? format : 'YYYY-MM-DD HH:mm:ss') : value;
}

// 格式化星期
Vue.filter('week-format', function (value, format) {
    if (!value) {
        return '';
    }
    if (format === 'full') {
        const list = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        return list[value] ? list[value] : '';
    }
    const list = ['一', '二', '三', '四', '五', '六', '日'];
    return list[value] ? list[value] : '';
})

// 秒to时间,eg: 62 => '1m2s'
Vue.filter('sec-to-hour', function (value) {
    let h = parseInt(value / 60 / 60);
    let m = parseInt(value / 60 % 60);
    let s = parseInt(value % 60);
    return Number(value) ? [
        h > 0 ? h + 'h' : '',
        m > 0 ? m + 'm' : '',
        s + 's'
    ].join('') : value;
})
// 限制数组长度
Vue.filter('limit-len', function (value, len = 50) {
    return value.slice(0, len);
})

/**
 * 小数转百分比，eg: 0.31 => '31%'
 * 非常小数直接显示
 */
Vue.filter('num-to-percent', function (value, type) {
    if (type === 'percent') {
        return (value * 100).toFixed(2) + '%';
        // return (100 * (value * 1000) / 1000).toFixed(2) + '%';
    }
    // 先过滤掉数据不存在的
    if (value === undefined || value === null) {
        return '0%';
    }

    // 再处理含有"."的百分数
    // if (value.toString().indexOf('.') > -1) {
        return (value * 100).toFixed(2) + '%';
        // return (100 * (value * 1000) / 1000).toFixed(2) + '%';
    // }
    
    // 其它是代表数字
    return value;

})

// 千分位展示逗号展示
Vue.filter('moneyFormat', function(value, type) {
    if(typeof(value)=='string' && value == '-') return '-';
    if(typeof value !== 'number' && !value) return '-';
    if(value === 0) {
        return value = type === 'isMoney' ? value + '.00' : value;
    }
    
    var intPart =  Number(value)|0; //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

    var floatPart = ""; //预定义小数部分
    var value2Array = value.toString().split(".");
    
    //=2表示数据有小数位
    if(value2Array.length == 2) {
        floatPart = value2Array[1].toString(); //拿到小数部分
        if(floatPart.length == 1) { //补0
            return intPartFormat + "." + floatPart + '0';
        } else {
            return intPartFormat + "." + floatPart;
        }
    } else {
        // 整数
        if (type === 'isMoney') {
            return intPartFormat + floatPart + '.00';
        }
        return intPartFormat + floatPart;
    }
})

Vue.filter('accesspath-pick-text', function (value) {
   return value ? value.split('---').pop() : '';

})

Vue.filter('format-value-to-cn', formatValueToCn)