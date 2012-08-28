/**
 *  ģ������gallery/form/1.3/butterfly/field�������ݲ�ģ�飬�����ݷ����仯ʱ���Զ����±���ͼ
 *
 * @module butterfly
 * @submodule butterfly-model
 */

KISSY.add('gallery/form/1.3/butterfly/field',function (S, Base, Node) {
    var EMPTY = '';
    /**
     * ��field������ģ��
     * @class Field
     * @constructor
     * @extends mvc.Field
     */
    function Field(config){
        Field.superclass.constructor.apply(this, config);
    }
    S.extend(Field, Base,{ATTRS:{
        target:{
            value:EMPTY,
            getter:function(v){
                return S.Node.all(v);
            }
        },
        type:{value:EMPTY},
        name:{value:EMPTY},
        value:{
            value:EMPTY,
            setter:function(v){
                debugger;
                var self = this;
                var target = self.get('target');
                if(target && target.length > 0){
                    target.val(v);
                }
                return v;
            }
        },
        test:{value:false,
            setter:function(v){
                alert(2);
                return v;
            }
        },
        isGroup:{value:false},
        group:{value:[]}
    }});
    return Field;
},{requires:['base', 'node']});