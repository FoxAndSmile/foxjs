/**
 * 자주 사용하는 Utils성 항목들 모아놓은 Javascript
 * @type {{}}
 */

var utils = utils || {};

utils.transform = function() {
    return {
        /**
         * 인자 v를 Number 레퍼 객체로 반환한다.
         * @param v
         */
        toNumber: function(v) {
            return Number(v);
        }
    }
};

utils.number = function() {
    return {
        /**
         * 하위의 모든 값들은 Zero(0)으로 만들어서 반환한다. 즉 123이면 100, 1423이면 1000을 반환한다.
         * admin.utils.cuttingChildNum -> utils.number().getCutChildZero
         * @param n
         * @returns {number}
         */
        getCutChildZero: function(n) {
            if(Object.prototype.toString.call(n) !== '[object Number]') {
                n = Number(n);
            }

            var nv = n.toFixed(0),
                cutWeight = Math.pow(10, nv.length -1);

            return parseInt((parseInt(nv) / cutWeight).toFixed(0)) * cutWeight;
        },

        /**
         * 인자 n의 값을 size size 지수값만큼 자르거나 더한다.
         * @param n
         * @param size (10진수)
         */
        getCutQuotientBySize: function(n, size) {
            if(Object.prototype.toString.call(n) !== '[object Number]') {
                n = Number(n);
            }

            var nv = Number(n.toFixed(0));
            return nv / Math.pow(10, size);
        },

        /**
         * 인자 n의 값을 3자리 ','를 갖는 통화 화폐값으로 반환한다.
         * 실수도 정수도 모두 정수로 반환한다.
         * utils.number().getCurrency > utils.number().getCurrency
         * @param n
         * @returns {string}
         */
        getCurrency: function (n) {
            if(Object.prototype.toString.call(n) !== '[object Number]') {
                n = Number(n);
            }

            return n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        /**
         * 인자 n의 값을 3자리 ','를 갖는 통화 화폐값으로 변환한다. 실수는 자릿수가 없을경우 2자리로 고정한다.
         * utils.number().getCurrencyDecimalPoint > utils.number().getCurrencyDecimalPoint
         * @param n
         */
        getCurrencyDecimalPoint: function(n, size) {
            if(!size) {
                size = 2;
            }

            if(Object.prototype.toString.call(n) !== '[object Number]') {
                n = Number(n);
            }

            return n.toFixed(size).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        /**
         * 인자 n의 값이 양수일경우 markers[0]을 음수 일경우 markers[1]을 반환한다.
         * 만약 markers 존재 하지 않거나 배열이 아니거나 사이즈가 2가 아니거나 n을 반환한다.
         * @param n
         * @param markers
         */
        getEssenceMarker: function(n, markers) {
            if(!markers || Object.prototype.toString.call(markers) !== '[object Array]' || markers.length > 2) {
                return n;
            }

            if(Object.prototype.toString.call(n) !== '[object Number]') {
                n = Number(n);
            }

            if(n > 0) {
                return markers[0] + n;
            } else {
                return markers[1] + n;
            }
        }
    }
}

/**
 * 날짜값의 변형이나 특수한 날자에 관련되 로직이 들어있는 서비스
 *
 */
utils.date = function() {
    var tempHourDatas = [11, 10, 9, 8, 7, 6, 5 ,4 ,3 , 2, 1, 0],
        tempDayToKorean = ['월', '화', '수', '목', '금', '토', '일'];

    return {
        /**
         * 0을 일요일로 시작하는 Number값을 반환한다.
         * admin.utils.getDayNum -> utils.date().getDay 변환
         * @param n
         */
        getDay: function(n) {
            if(Object.prototype.toString.call(n) !== '[object Number]') {
                n = Number(n);
            }
            return n === 0 ? 6 : n-1;
        },

        /**
         * 0~1 : 11, 2~3 : 10, 4~5 : 9 형태의 값을 반환한다 즉 0~1이 들어오면 11, 2~3데이터가 오면 10을 반환하는 함수
         * HeatMap에서 사용됨.
         * admin.utils.getTimeNumTow -> utils.date().getNumToBinaryType
         * @param n
         */
        getNumToBinaryType: function(n) {
            if(Object.prototype.toString.call(n) !== '[object Number]') {
                n = Number(n);
            }
            var idx = parseInt((n + 2) / 2 - 1);
            return tempHourDatas[idx];
        },

        /**
         * n숫자 값에 시를 붙여서 00시 ~ 01시 같은 Text를 반환해준다.
         * utils.date().getPlusHourBinaryTypeTxt -> utils.date().getPlusHourBinaryTypeTxt
         * @param n
         */
        getPlusHourBinaryTypeTxt: function(n, suffix) {
            if(Object.prototype.toString.call(n) !== '[object Number]') {
                n = Number(n);
            }
            return n + "시~" + (++n) + "시";
        }
    }
};

utils.collector = function() {
    return {
        /**
         * 인자 list안의 객체를 객체의 key로 type별로 정렬을 한다.
         * @param list
         * @param key
         * @param type
         * @returns {*}
         */
        sortByKey: function(list, key, type) {
            if(type !== 'asc' && type !== 'desc') {
                throw new Error('type is not asc, desc');
            }

            if(Object.prototype.toString.call(key) !== '[object String]') {
                throw new Error('key required string');
            }

            if(Object.prototype.toString.call(list) === '[object Array]') {
                list.sort(function(a, b) {
                    if(type === 'desc') {
                        return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
                    }

                    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
                });
            }

            return list;
        }
    }
};