/**
 * cocoon���ڱ����ݴ洢����butterfly��model�㣬�����ݷ����仯ʱ���Զ����±���ͼ
 * @module cocoon
 */

/**
 *  ģ������gallery/form/1.3/cocoon/index��cocoon�����ģ��
 *
 * @module cocoon
 * @submodule cocoon-index
 */

KISSY.add('gallery/form/1.3/cocoon/index',function (S, Base, Node) {
    /**
     * cocoon�������
     * @class Cocoon
     * @for Cocoon
     * @constructor
     * @extends Base
     */
    function Cocoon(){

    }
    S.extend(Cocoon, Base, {
        /**
         * ��ȡָ���ֶ�����
         * @method get
         * @public
         */
        get:function(fieldName){

        }
    });
    return Cocoon;
},{requires:['base', 'node']});