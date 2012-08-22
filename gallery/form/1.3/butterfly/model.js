/**
 * ���ٹ���������
 * @module butterfly
 */

/**
 *  ģ������gallery/form/1.3/butterfly/model�������ݲ�ģ�飬�����ݷ����仯ʱ���Զ����±���ͼ
 *
 * @module butterfly
 * @submodule butterfly-model
 */

KISSY.add('gallery/form/1.3/butterfly/model',function (S, Base, Node,mvc) {
    var EMPTY = '';
    /**
     * ��field������ģ��
     * @class Model
     * @constructor
     * @extends mvc.Model
     */
    function Model(){
        Model.superclass.constructor.apply(this, arguments);
    }
    S.extend(Model, mvc.Model,{ATTRS:{
        type:{value:EMPTY},
        name:{value:EMPTY},
        value:{value:EMPTY},
        isGroup:{value:false},
        group:{value:[]}
    }});
    return Model;
},{requires:['base', 'node','mvc']});