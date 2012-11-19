/**
 * @fileoverview ��ʼ��ui�Ļ���
 * @author  ��ƽ�����ӣ�<minghe36@gmail.com>
 */
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    /**
     *  ��ʼ��ui�Ļ���
     * @constructor
     */
    function RenderUi(config) {
        var self = this;
        RenderUi.superclass.constructor.call(self, config);
        self._init();
    }
    S.mix(RenderUi,/** @lends RenderUi*/{
        event:{
            BEFORE_RENDER:'beforeRender',
            RENDER:'render'
        }
    });
    S.extend(RenderUi, Base, /** @lends RenderUi.prototype*/{
        /**
         * ��ʼ��
         * @private
         */
         _init:function(){

         },
        /**
         * ���������ʼ��ǰ���¼�
         * @return this
         */
        fireBeforeRenderEvent:function(){
            this.fire(RenderUi.event.BEFORE_RENDER,this.eventObject());
            return this;
        },
        /**
         * ���������ʼ������¼�
         * @return this
         */
        fireRenderEvent:function(){
            this.fire(RenderUi.event.RENDER,this.eventObject());
            return this;
        },
        /**
         * �����¼�ʱ���ݵĶ���
         * @return {Object}
         */
        eventObject:function(){
            var self = this;
            var ui = self.get('ui');
            var isReady = self.get('isReady');
            var target = self.get('target');
            return {ui : ui,isReady:isReady,target:target};
        },
        /**
         * ��ȡָ��ui������
         * @param {String} uiName ui����
         * @return {Object}
         */
        getConfig:function(uiName){
            var self = this;
            var config = {};
            var uiConfig = self.get('uiConfig');
            if(!S.isString(uiName) || !uiConfig[uiName]) return config;
            return uiConfig[uiName];
        }
    },{
        ATTRS:/** @lends RenderUi.prototype*/{
            /**
             * �Ƿ��ʼ�����
             * @type {Boolean}
             * @default false
             */
            isReady:{value:false},
            /**
             * ui��Ŀ��Ԫ��
             * @type {NodeList}
             * @default ''
             */
            target:{value:EMPTY },
            /**
             * uiʵ��
             * @type {Object}
             * @default ''
             */
            ui:{value:EMPTY},
            /**
             * ui����
             * @type {Object}
             * @default {}
             */
            uiConfig:{value:{}}
        }
    });

    return RenderUi;
}, {
    requires:[
        'node',
        'base'
    ]
});