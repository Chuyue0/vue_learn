/* 闭包写法 */
var xtag = (function (factory) {
    //闭包内
    return factory.call(); // call调用，返回给xtag
})(function () {
    //传入闭包的一个函数
    const _DEPS_ = {
        lifecycle: {
            created: function () {

            },
            attributeChanged: function (attr, oldVal, newVal) {
                //属性改变值
            }
        },
        methods: {}
    };
    const _CORE_ = {
        register: function (el, obj) {
            let element = Object.create(HTMLElement.prototype);
            let template = document.currentScript.ownerDocument.querySelector('template').content;
            element.createdCallback = function () { //创建时的回调函数
                let shadowRoot = this.createShadowRoot(); //创建shadow root节点，关键
                let clone = document.importNode(template, true);
                shadowRoot.appendChild(clone); // 添加模板追加到克隆对象

                if (!obj.methods) {
                    obj.methods = _DEPS_.methods;
                }
                for (let method in obj.methods) {
                    this[method] = obj.methods[method];
                }

                if (obj && obj.lifecycle && obj.lifecycle.created) {
                    obj.lifecycle.created.call(this); //call调用时要传作用域
                } else {
                    _DEPS_.lifecycle.created.call(this);
                }
            };
            element.attributeChangedCallback = function (attr, oldVal, newVal) { //属性改变时触发的回调
                console.log(arguments); // 参数值  ，如果没有设置属性，oldVal则是null
                if (obj && obj.lifecycle && obj.lifecycle.attributeChanged) {
                    //判断是否存在方法
                    obj.lifecycle.created.call(this, attr, oldVal, newVal); //call调用时要传作用域
                } else {
                    _DEPS_.lifecycle.created.call(this, attr, oldVal, newVal);
                }
            };
            document.registerElement(el, {
                prototype: element
            })
        }
    };

    return _CORE_;

    /*
    * null 是空引用，特定的空值
    * undefined 是未定义，数据类型
    *
    * typeof
    * instanceOf func
    *
    * func.call(this, arg1,arg2,...) 方法调用一个函数，其具有一个指定的this值和若干参数列表
    * func.apply(this, [argsArray] ) 和call调用一样，但参数为数组
    * */
});