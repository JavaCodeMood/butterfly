/**
 *  ģ������gallery/form/1.3/butterfly/field�������ݲ�ģ�飬�����ݷ����仯ʱ���Զ����±���ͼ
 *
 * @module butterfly
 * @submodule butterfly-model
 */

KISSY.add('gallery/form/1.3/butterfly/field/base',function (S, Base, Node) {
    var EMPTY = '';
    /**
     * ��field������ģ��
     * @class Field
     * @constructor
     */
    function Field(config){
        Field.superclass.constructor.call(this, config);
        this._init();
    }
    S.extend(Field, Base,{
        /**
         * ��ʼ��
         * @private
         */
        _init:function(){
            var self = this;
            self._syncValue();
        },
        /**
         * �ı���ֶε�ֵ
         * @param value
         * @return value
         */
        val:function(value){
            var self = this;
            if(!S.isUndefined(value)) self.set('value',value);
            return self.get('value');
        },
        /**
         * ��֤���ֶ�
         * @return {Boolean}
         */
        test:function(){
            var self = this;
            var authField = self.get('authField');
            var isPass = true;
            if(authField) isPass = authField.validate();
            return isPass;
        },
        /**
         * �����¼���ͬ���ֶε�ֵ
         * @private
         */
        _syncValue:function(){
            var self = this;
            var $target = self.get('target');
            if(!$target || !$target.length) return false;
            var syncValueEvents = self.get('syncEvents');
            //������Ҫͬ�����¼�
            $target.on(syncValueEvents,function(){
                var val =$target.val();
                self.val(val);
                self.test();
            })
        }
    },{ATTRS:{
        /**
         * Ŀ����ֶ�
         */
        target:{
            value:EMPTY,
            getter:function(v){
                return S.Node.all(v);
            }
        },
        /**
         * ͬ�����ֶ�ֵ���¼�
         */
        syncEvents:{
            value:'blur'
        },
        /**
         * �ֶ�����
         */
        type:{value:EMPTY},
        /**
         * �ֶ���
         */
        name:{value:EMPTY},
        /**
         * ֵ
         */
        value:{
            value:EMPTY,
            setter:function(v){
                var self = this;
                var target = self.get('target');
                if(target && target.length > 0) target.val(v);
                return v;
            }
        },
        //auth����֤�ֶ�
        authField:{ value:EMPTY }
    }});
    return Field;
},{requires:['base', 'node']});