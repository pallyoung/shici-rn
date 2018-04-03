const START_YEAR = 1900;
/**
 * 农历月份信息
 * 前12位依次表示是否是大月，后四位表示闰月月份的二进制
 * */

const LUNAR_INFO = [
    "00100101111011000", "00100101011100000", "01010010101110000", "00101010011010101", "01101001001100000", "01101100101010000", "10110010101010100", "00101011010100000", "01001101011010000", "00101010111010010",
    "00100101011100000", "01010010110110110", "01010010011010000", "01101001001010000", "11101001001010101", "01011010101000000", "01101011010100000", "01010110110100010", "01001010110110000", "10100100101110111",
    "00100100101110000", "01010010010110000", "01011010010110101", "00110101001010000", "00110110101000000", "11010101101010100", "0010101101100000", "01001010101110000", "00101001011110010", "00100100101110000",
    "00110010101100110", "01101010010100000", "01110101001010000", "00110111010010101", "00101101011010000", "0010101101100000", "11000011011100011", "01001001011100000", "11100100011010111", "01100100101010000",
    "01101010010100000", "11101100010100110", "01011010101010000", "00101011010100000", "11010010110110100", "0010010111010000", "01001001011010000", "01101001010110010", "01010100101010000", "01011010101010111",
    "00110110010100000", "01011010101010000", "10101001101010101", "00100110110100000", "01010010110110000", "10100010101110011", "00101001010110000", "01010100110101000", "01110100101010000", "00110101010100000",
    "01010111010100110", "01010101101010000", "00100101101100000", "01010101011100100", "01010010101110000", "00101001001100000", "01111001001100011", "01101100101010000", "00101101101010111", "00101011010100000",
    "01001011011010000", "00100110111010101", "00100101011010000", "01010010011010000", "01101010011010100", "01101001001010000", "01101010101011000", "01011010101000000", "01011011010100000", "11001010110100110",
    "01001010110110000", "00100100110110000", "01010100101110100", "01010010010110000", "01011001001111010", "00110101001010000", "00110110101000000", "01010111101000110", "01010101101100000", "01001010101110000",
    "00100101011110101", "00100100101110000", "00110010010110000", "00111010010100011", "01110101001010000", "00110101101011000", "00101010111000000", "01010101101100000", "01001011011010101", "01001001011100000",
    "01100100101100000", "01101100101010100", "01101010010100000", "01101101001010000", "00111010101010010", "00101011010100000", "01010101110110111", "0010010111010000", "01001001011010000", "01100101010110101",
    "01010100101010000", "01011010010100000", "01011101010100100", "01010110101010000", "00101010111011001", "00100101110100000", "01010010110110000", "10101000101110110", "00101001010110000", "01010100100110000",
    "00111100101010100", "00110101010100000", "01010110101010000", "00101101101010010", "00100101101100000", "01010011011100110", "01010010011100000", "01101001001100000", "01110101001100101", "01101010100110000",
    "00101101010100000", "00111011010100011", "01001011011010000", "00100101011111011", "00100101011010000", "01010010011010000", "11101000010110110", "01101001001010000", "01101010100100000", "01101110101000101",
    "01011010110100000", "00101011011010000", "00101010110110010", "00100100110110000", "01010010101110111", "01010010010110000", "01010101001010000", "11011001001010101", "00110110100100000", "01010110110100000",
    "10100101101100011", "01001001101110000", "00100100111111000", "00100100101110000", "00110010010110000", "10110100010100110", "01110101001010000", "00110101100100000", "11010011011000100", "01010101011100000",
    "01010001011100000", "01101001011100011", "01100100101100000", "01101010101010111", "01101010010100000", "01101101001010000", "00101110101010101", "00101011010100000", "01010011011010000", "00101010111010100",
    "00101001011010000", "01010100110111000", "01010100101010000", "01011010010100000", "01011011010100110", "01010110101010000", "00101010110100000", "01010101110100100", "01010010110110000", "00101001010110000",
    "01011001001110011", "00110100100110000", "00111001100110111", "00110101010100000", "01010110101010000", "10100101101010101", "00100101101100000", "01010010101110000", "00101010011100100", "01101000101100000",
    "01110100101101000", "01101010100100000", "01101101010100000", "10110101010100110", "00101011011010000", "00100101011100000", "01010100111010100", "01010001011010000", "01101000101010000", "01111001001010010",
    "01101010100100000"
];
//节气信息
const TERM_INFO = [
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
    '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
    'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
    '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
    '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
    '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
    '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
    '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
    '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
    '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'
];

const TERM = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"]
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const NUMBER_CN = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊', '正', '初', '廿', '卅'];

class Lunar {
    constructor(year, month, date, isLeap) {
        this._year = year;
        this._month = month;
        this._date = date;
        this._isLeap = isLeap;
    }
    getMonth() {
        return this._month;
    }
    getMonthCN() {
        //获取立春
        if (this._month === 0) {
            return '正月';
        } else {
            return NUMBER_CN[this._month] + '月';
        }
        return tiangan + dizhi;

    }
    getYear() {
        return this._year;
    }
    getYearCN() {
        let tiangan = this._year % 10 - 3;
        let dizhi = this._year % 12 - 3;
        if (tiangan <= 0) {
            tiangan = tiangan + 10;
        }
        if (dizhi <= 0) {
            dizhi = dizhi + 12;
        }
        return TIAN_GAN[tiangan - 1] + DI_ZHI[dizhi - 1] + '年';
    }
    getDate() {
        return this._date;
    }
    getDateCN() {
        if (this._date <= 10) {
            return '初' + NUMBER_CN[this._date];
        } else if (this._date < 20) {
            return '十' + NUMBER_CN[this._date.toString()[1]];
        } else if (this._deta < 30) {
            return '廿' + NUMBER_CN[this._date.toString()[1]];
        } else {
            return '卅十';
        }
    }
    getGZYear() {
        return this.getYearCN();
    }
    getGZMonth() {
        var solar = this.toSolarDate();
        var y = solar.getFullYear();
        var m = solar.getMonth();
        var d = solar.getDate();
        var termIndex = m * 2;
        var terms = Lunar.getTerm(solar.getFullYear());
        var term1 = terms[termIndex];
        var monthCount = (y-1900)*12+m+11+1;  
        if(term1<=d){
            monthCount++;
        }
        monthCount = monthCount%60;
        return TIAN_GAN[monthCount % 10] + DI_ZHI[monthCount % 12] + '月'
        

    }
    getGZDate() {
        var offset = 0;
        for (let i = 1900; i < this._year; i++) {
            offset += Lunar.getDayOfYear(i);
        }
        for (let i = 0; i < this._month; i++) {
            offset += Lunar.getDayOfMonth(this._year, i);
        }
        offset += this._date;
        if (this._isLeap) {
            let leap = Lunar.getLeapMonth(this._year);
            if (leap && leap.month === this._month) {
                offset += Lunar.getDayOfMonth(this._year, this._month);
            }
        }
        offset = (offset - 1) % 60;
        return TIAN_GAN[offset % 10] + DI_ZHI[(offset + 4) % 12] + '日'
    }
    getNextTerm() {
        var solar = this.toSolarDate();
        var y = solar.getFullYear();
        var m = solar.getMonth();
        var d = solar.getDate();
        var monthDay = (Date.UTC(y, m + 1, 1) - Date.UTC(y, m, 1)) / 86400000;
        var termIndex = m * 2;
        var terms = Lunar.getTerm(solar.getFullYear());
        var term1 = terms[termIndex];
        var term2 = terms[termIndex + 1];
        var term3 = terms[termIndex + 2];
        var offset = 0, term, month;
        if (term1 >= d) {
            offset = term1 - d;
            term = term1;
            month = m;
        } else if (term2 >= d) {
            offset = term2 - d;
            term = term2;
            month = m;
        } else {
            offset = term3 - d + monthDay;
            term = term3
            month = m+1;
        }
        return {
            term: TERM[term],
            offset,
            day: term,
            month,
        }
    }
    toString() {
        return `${this._year}/${this._month}/${this._date}`;
    }
    toLocalString() {
        return `${this.getYearCN()} ${this.getMonthCN()} ${this.getDateCN()}`;
    }
    toSolarDate() {
        var offset = 0;
        for (let i = 1900; i < this._year; i++) {
            offset += Lunar.getDayOfYear(i);
        }
        for (let i = 0; i < this._month; i++) {
            offset += Lunar.getDayOfMonth(this._year, i);
        }
        offset += this._date;
        if (this._isLeap) {
            let leap = Lunar.getLeapMonth(this._year);
            if (leap && leap.month === this._month) {
                offset += Lunar.getDayOfMonth(this._year, this._month);
            }
        }
        return new Date(Date.UTC(1900, 0, 30, 0, 0, 0) + offset * 86400000);
    }

    //获取节气信息 y是公历年
    static getTerm(y) {
        if (y < 1900 || y > 2100) { return -1; }
        var _table = TERM_INFO[y - 1900];
        var _info = [
            parseInt('0x' + _table.substr(0, 5)).toString(),
            parseInt('0x' + _table.substr(5, 5)).toString(),
            parseInt('0x' + _table.substr(10, 5)).toString(),
            parseInt('0x' + _table.substr(15, 5)).toString(),
            parseInt('0x' + _table.substr(20, 5)).toString(),
            parseInt('0x' + _table.substr(25, 5)).toString()
        ];
        var term = [
            parseInt(_info[0].substr(0, 1)),
            parseInt(_info[0].substr(3, 1)),
            parseInt(_info[0].substr(4, 2)),
            parseInt(_info[0].substr(1, 2)),

            parseInt(_info[1].substr(0, 1)),
            parseInt(_info[1].substr(1, 2)),
            parseInt(_info[1].substr(3, 1)),
            parseInt(_info[1].substr(4, 2)),

            parseInt(_info[2].substr(0, 1)),
            parseInt(_info[2].substr(1, 2)),
            parseInt(_info[2].substr(3, 1)),
            parseInt(_info[2].substr(4, 2)),

            parseInt(_info[3].substr(0, 1)),
            parseInt(_info[3].substr(1, 2)),
            parseInt(_info[3].substr(3, 1)),
            parseInt(_info[3].substr(4, 2)),

            parseInt(_info[4].substr(0, 1)),
            parseInt(_info[4].substr(1, 2)),
            parseInt(_info[4].substr(3, 1)),
            parseInt(_info[4].substr(4, 2)),

            parseInt(_info[5].substr(0, 1)),
            parseInt(_info[5].substr(1, 2)),
            parseInt(_info[5].substr(3, 1)),
            parseInt(_info[5].substr(4, 2)),
        ];
        return term;
    }
    /**
     * 获取闰月信息
    */
    static getLeapMonth(y) {
        let month = parseInt(LUNAR_INFO[y - START_YEAR].slice(-4), 2);
        if (month) {
            let day = LUNAR_INFO[y - START_YEAR][0] == '1' ? 30 : 29;
            return {
                month: month - 1,
                day
            }
        } else {
            return null;
        }
    }
    /**
     * 
     * @static
     * @param {any} y 
     * @returns 
     * @memberof Lunar
     * 获取一年中天数
     */
    static getDayOfYear(y) {
        var sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += Lunar.getDayOfMonth(y, i);
        }

        let leapInfo = Lunar.getLeapMonth(y);
        if (leapInfo) {
            sum += leapInfo.day;
        }
        return sum;
    }
    static getDayOfMonth(y, m) {
        return LUNAR_INFO[y - START_YEAR].slice(-5 - 11 + m, -5 - 11 + m + 1) == '1' ? 30 : 29;
    }
    static fromGMT(timestamps) {
        var date = new Date(timestamps);

        let i, temp = 0;

        /**
         * 1900年1月31日正好是正月初一
        */
        var offset = Math.floor((date.getTime() - new Date(1900, 0, 31).getTime()) / 86400000);
        for (i = 1900; i < 2101 && offset > 0; i++) {
            temp = Lunar.getDayOfYear(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }

        //农历年
        let y = i, m, d;
        let leap = Lunar.getLeapMonth(y);
        let isLeap = false;
        let mi;
        for (mi = 0; mi < 12 && offset > 0; mi++) {
            temp = Lunar.getDayOfMonth(y, mi);

            offset -= temp;
            if (leap && leap.month == mi) {
                offset -= leap.day;
                temp = leap.day;
                isLeap = offset <= 0 ? true : false;
            }
        }
        if (offset < 0) {
            m = mi - 1;
            offset += temp;
        }
        d = offset + 1;

        return new Lunar(y, m, d, isLeap);
    }
}

export default Lunar;