const Mock = require('mockjs');

const template = {
    'string|1-10': 'string',
    'strings|3': 'string',
    'number|1-100': 100,
    'numbers|+1': 100,
    'numberss|1-100.1-3': 100,
    'numbersss|100.1-2': 100,
    'boolean|1': true,
    'booleans|1-2': true,
    'object|1-2': {
        "310000": "上海市",
        "320000": "江苏省",
        "330000": "浙江省",
        "340000": "安徽省"
    },
    'objects|3': {
        "310000": "上海市",
        "320000": "江苏省",
        "330000": "浙江省",
        "340000": "安徽省"
    },
    'array|1-10': ["AMD",
        "CMD",
        "UMD"],
    'arrays|+1': ["AMD",
        "CMD",
        "UMD"],
    'arrayss|3': ["AMD",
        "CMD",
        "UMD"],
    'function': function () {
        return this.name;
    },
    'name': Mock.Random.name()
};


const data = Mock.mock('https://wen.cn', template);

export default data;
