/**
 * @fileoverview ��ʼ������ͳ����
 * @author  ��ƽ�����ӣ�<minghe36@gmail.com>
 */
KISSY.add(function (S, Node,RenderUi,Limiter) {
    var EMPTY = '';
    var MAX_LENGTH = 'maxlength';
    var LIMITER_TARGET = 'limiter-target';
    /**
     *  ��ʼ������ͳ����
     *  @param {Object} config
     * @constructor
     */
    function RenderLimiter(config) {
        var self = this;
        RenderLimiter.superclass.constructor.call(self, config);
    }

    S.extend(RenderLimiter, RenderUi, /** @lends RenderLimiter.prototype*/{
        /**
         * ��ʼ��
         * @private
         */
         _init:function(){
            var self = this;
            var $target = self.get('target');
            if (!$target || !$target.length) return false;

            //��ȡ����
            var config = self._getConfig();

            self.fireBeforeRenderEvent();
            var textLimiter = new Limiter($target, config);
            textLimiter.render();
            self.fireRenderEvent();
            return self;
         },
        /**
         * �ϲ�html�е��������
         * @return {Object|Boolean}
         * @private
         */
        _getConfig:function(){
            var self = this;
            var $target = self.get('target');
            if (!$target || !$target.length) return false;

            //����������볤��
            var maxLen = self.get('maxLen');
            //ͳ���İ���Ŀ��Ԫ��
            var $limiterTarget = self.get('limiterTarget');
            //����������ͳ�ƻ�������
            if (!maxLen || !$limiterTarget.length) return false;

            //��ȡ����
            var config = self.getConfig('limiter');

            S.mix(config, {wrapper:$limiterTarget, max:maxLen});

            var type = $target.attr('type');
            //���༭������html��ǩ�ų���
            if (type == 'editor') S.mix(config, {isRejectTag:true});
            return config;
        }
    },{
        ATTRS:/** @lends RenderLimiter.prototype*/{
            /**
             * ����������볤��
             * @type Number
             * @default 0
             */
            maxLen:{
                value:0,
                getter:function(v){
                    var self = this;
                    var $target = self.get('target');
                    if($target.length){
                        v = Number($target.attr(MAX_LENGTH));
                    }
                    return v;
                }
            },
            /**
             * ͳ���İ���Ŀ��Ԫ��
             * @type NodeList
             * @default ''
             */
            limiterTarget:{
                value:EMPTY,
                getter:function(v){
                    var self = this;
                    var $target = self.get('target');
                    if($target.length){
                        v = $($target.attr(LIMITER_TARGET));
                    }
                    return v;
                }
            }
        }
    });

    return RenderLimiter;
}, {
    requires:[
        'node',
        './base',
        'gallery/form/1.3/limiter/index'
    ]
});