/*
*
* @author by wenziyang
* @email: wenziyangday@gmail.com / 1483319587@qq.com
* @createTime: 2018/04/09
* @updateTime: 2018/05/29
* @state: collecting....
*
* */

import moment from 'moment';

const util = {

    /*
	  *
	  * dom操作处理
	  *
	  * */

    calculateHeight: function () {
        const clientHeight = document.body.offsetHeight || window.innerHeight;
        return clientHeight - 64 - 32 - 64; // 64(breadcrumbs)、32(margin)、64(padding)
    },

    /*
	  *
	  * 字符串处理
	  *
	  * */

    numStrDivide: function (str) {
        return parseFloat(str).toLocaleString();  // 123456789 => 123,456,789
    },

    /*
		*
		* 数据处理
		*
		* */

    data: function () {

    },

    /*idPid(data) {
        let pos = {}, i = 0, tree = [];
        while (data.length !== 0) {
            if (data[i].parentId === '') {
                tree.push({
                    id: data[i]._id,
                    columnName: data[i].columnName,
                    children: []
                });
                pos[data[i]._id] = [tree.length - 1];
                data.splice(i, 1);
                i--;
            } else {
                let posArr = pos[data[i].parentId];

                if (posArr !== undefined) {

                    let obj = tree[posArr[0]];
                    for (let j = 1; j < posArr.length; j++) {
                        obj = obj.children[posArr[j]];
                    }

                    obj.children.push({
                        id: data[i].id,
                        columnName: data[i].columnName,
                        children: []
                    });
                    pos[data[i].id] = posArr.concat([obj.children.length - 1]);
                    data.splice(i, 1);
                    i--;
                }
            }
            i++;
            if (i > data.length - 1) {
                i = 0;
            }
        }
        return tree;
    },*/

    arrToObj: function (arr = []) {
        /*
		  *
		  * 描述：
		  * 将数组转成以其下标为val的对象
		  *
		  * */
        const obj = {};

        /*for (let i in arr) {
            let key = arr[i];
            obj[key] = i;
        }*/

        arr.map((x, index) => {
            obj[x] = index;
        });

        return obj;   //  ['a', 'b', 'c', 'd'] => {a: 0, b: 1, c: 2}
    },

    /*
    *
    * 时间日期类
    * todo
    *
    * */
    countDown: function (val) {
        const type = typeof val;
        let back = 0;
        switch (type) {
            case 'string':
                back = 10;
                break;
            case 'number':
                back = 0;
                break;
            default:
                back = 'zhanshjhjshjhj'
        }
    },

    //  格式转化
    formatTime: function (date, pattern = 'YYYY-MM-DD') {
        return date ? moment(date).format(pattern) : '暂无时间';
    },

    /*
    *
    * 数组
    *
    *
    * */

    //  交集
    intersectArr: function (targetArr = [], baseArr = []) {
        let a = new Set(targetArr), b = new Set(baseArr);
        let intersect = new Set([...a]).filter(x => b.has(x));
        return [...intersect];
    },

    //  并集
    unionArr: function (targetArr = [], baseArr = []) {
        let a = new Set(targetArr), b = new Set(baseArr);
        let union = new Set([...a, ...b]);
        return [...union]
    },

    //  差集
    differenceArr: function (targetArr = [], baseArr = []) {
        let a = new Set(targetArr), b = new Set(baseArr);
        let difference = new Set([...a]).filter(x => !b.has(x));
        return [...difference];
    },

    // 数组去重(对象数组的去重方式)
    duplicateRemovalArr: function (arr = []) {
        let newArr = [], dra, backArr = [];
        arr.map(x => {
            let str = JSON.stringify(x);
            newArr.push(str);
        });
        dra = new Set([...newArr]);
        [...dra].map(x => {
            let obj = JSON.parse(x);
            backArr.push(obj);
        });
        return backArr;
    },

    //  多为数组转一维
    newArr: [],     //  用于存储结果
    recursion: function (arr = []) {
        /*for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                util.recursion(arr[i]);
            } else {
                util.newArr.push(arr[i]);
            }
        }*/
        arr.map(x => {
            if (Array.isArray(x)) {
                util.recursion(x);
            } else {
                util.newArr.push(x);
            }
        });
        return util.newArr;
    },

    //  对象转数组[{name: key, value: value}]
    objToArr: function (obj = {}) {
        let arr = [];
        for (let key in obj) {
            let newObj = {};
            newObj.name = key;
            newObj.value = obj[key] + '';
            arr.push(newObj);
        }

        return arr;
    },

    //  数组枚举的字典
    enumToCN: function (arr = []) {
        let obj = {};
        arr.map(x => {
            obj[x.value] = x.name;
        });
        return obj;
    }

};

export default util;

