/**
 * @fileoverview ��ʼ���༭��
 * @author  ��ƽ�����ӣ�<minghe36@gmail.com>
 */
KISSY.add(function (S, Event,Node,RenderUi,RenderLimiter) {
    var EMPTY = '';
    /**
     *  ��ʼ���༭��
     *  @param {Object} config
     * @constructor
     */
    function RenderEditor(config) {
        var self = this;
        RenderEditor.superclass.constructor.call(self, config);
    }

    S.extend(RenderEditor, RenderUi, /** @lends RenderEditor.prototype*/{
        /**
         * ��ʼ��
         * @private
         */
         _init:function(){
            var self = this;
            var $target = self.get('target');
            if (!$target || !$target.length) return false;

            var useMods = self.get('use');
            var editorConfig = self.getConfig('editor');

            //����css
            self._loadCss();

            S.use('editor', function (S, Editor) {
                var editor = new Editor($target.getDOMNode(), editorConfig).use(useMods);
                editor.ready(function () {
                    self._editorReady();
                });
                self.set('ui',editor);
            });
            return self;
         },
        /**
         * ����css
         * @private
         */
        _loadCss:function(){
            var self = this;
            var editorConfig = self.getConfig('editor');
            var cssUrl = editorConfig.cssUrl;
            if(!cssUrl) return false;
            cssUrl = S.UA.ie < 8 && cssUrl + 'editor-pkg-sprite.css' || cssUrl + 'editor-pkg-datauri.css';
            S.use(cssUrl);
        },
        /**
         * �༭����ʼ����Ϻ�ִ�еķ���
         * @private
         */
        _editorReady:function(){
            var self = this;
            var editor = self.get('ui');
            if(!editor) return false;
            var $target = self.get('target');
            //����ͳ�����
            var limiter = self._renderLimiter();
            self._setWidth();
            Event.on(editor.document, "keyup", function (ev) {
                var val = editor.getData();
                $target.val(val);
                limiter.count();
            });
        },
        /**
         * ��ʼ������ͳ��
         * @private
         * @return {Limiter}
         */
        _renderLimiter:function(){
            var self = this;
            var $target = self.get('target');
            //��������ͳ��
            var renderLimiter = new RenderLimiter({target:$target,uiConfig:self.get('uiConfig')});
            var limiter = renderLimiter.get('ui');
            if(!limiter) return false;
            self.set('limiter',limiter);
            return limiter;
        },
        /**
         * ���ñ༭�����
         * @private
         * @return {Boolean}
         */
        _setWidth:function(){
            var self = this;
            var editor = self.get('ui');
            if(!editor) return false;

            var $target = self.get('target');
            //�༭������
            var $wrapper = editor.editorWrap;
            var width = $target.attr('width');
            // var height = $target.attr('height');
            //��ȡwidth��height���������������
            width && $wrapper.width(Number(width));
            return self;
        }
    },{
        ATTRS:/** @lends RenderEditor.prototype*/{
            /**
             * ���صı༭��ģ��
             * @type String
             * @default undo,separator,removeformat,format,font,color,separator,list,indent,justify,separator,link,separator,table,resize,draft
             */
            use:{value:"undo,separator,removeformat,format,font,color,separator,list,indent,justify,separator,link,separator,table,resize,draft"},
            /**
            * ����ͳ�����
            * @type Limiter
            * @default '' 
            */
            limiter:{value:EMPTY}
        }
    });

    return RenderEditor;
}, {
    requires:[
        'event',
        'node',
        './base',
        './limiter'
    ]
});