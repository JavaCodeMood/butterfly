/**
 * @fileoverview html 属性规则工厂
 * @author 张挺 <zhangting@taobao.com>
 *
 */
KISSY.add('gallery/form/1.3/auth/rule/ruleFactory', function (S, Node,Base, PropertyRule, Rule, undefined) {
    var $ = S.Node.all;
    var RuleFactory = function () {
        var self = this;

        RuleFactory.superclass.constructor.call(self);
    };

    RuleFactory.rules = {};

    //第一个参数一定是属性的value，后面的才是真正的参数
    S.mix(RuleFactory.rules, {
        required:function (pv, value) {
            if(S.isArray(value)) {
                return value.length>0;
            }

            return !!value;
        },
        pattern:function (pv, value) {
            return new RegExp(pv).test(value);
        },
        max:function (pv, value) {
            if (!S.isNumber(value)) {
                return false;
            }
            return value <= pv;
        },
        min:function (pv, value) {
            if (!S.isNumber(value)) {
                return false;
            }
            return value >= pv;
        },
        step:function (pv, value) {
            if (!S.isNumber(value)) {
                return false;
            }
            if(value == 0 || pv == 1) return true;

            return value % pv;
        },
        //添加1个特殊的属性
        equalTo:function(pv, value){
            //number same
            if (S.isNumber(value)) {
                return pv === value;
            }

            //selector same
            if(S.one(pv)) {
                return S.one(pv).val() === value;
            }

            //string same
            return pv === value;
        }
    });

    S.mix(RuleFactory, {
        HTML_PROPERTY:['required', 'pattern', 'max', 'min', 'step', 'equalTo'],
        register:function(name, rule) {
            RuleFactory.rules[name] = rule;
        },
        create:function (ruleName, cfg) {
            if(!cfg.msg) cfg.msg = {};
            S.mix(cfg.msg,this._setMsg(cfg.el,ruleName));
            if(S.inArray(ruleName, RuleFactory.HTML_PROPERTY)) {
                return new PropertyRule(ruleName, RuleFactory.rules[ruleName], cfg);
            } else if(RuleFactory.rules[ruleName]) {
                return new Rule(ruleName, RuleFactory.rules[ruleName], cfg);
            }
            return undefined;
        },
        /**
         * 从元素中的属性中拉取消息配置
          * @param el
         * @param ruleName
         * @return {*}
         * @private
         */
        _setMsg:function(el,ruleName){
            var $el = $(el);
            var msg = {};
            if(!el.length) return msg;
            var success = $el.attr(ruleName+'-success-msg');
            var error = $el.attr(ruleName + '-msg');
            if(success) msg.success = success;
            if(error) msg.error = error;
            return msg;
        }
    });

    return RuleFactory;

}, {
    requires:[
        'node',
        'base',
        './html/propertyRule',
        './rule'
    ]
});