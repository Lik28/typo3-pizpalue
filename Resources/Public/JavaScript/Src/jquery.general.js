/**
 * Return value from a key (name) in the url
 *
 * @see davidwalsh.name/query-string-javascript
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


/**
 * jQuery section
 */
+function ($) {

    /**
     * Size content elements horizontal to obtain homogeneous look.
     */
    $(function () {

        /**
         * Size elements using the class pp-parent-height to have the same height
         * as its parent element
         */
        function sizeToParentHeight() {
            $('.pp-parentheight,.pp-parent-height').height(0);
            $('.pp-parentheight,.pp-parent-height').each(function () {
                $(this).height($(this).parent().height());
            });
        }
        if ($('.pp-parentheight,.pp-parent-height').length) {
            $(window).on('load,resize', sizeToParentHeight);
            $('img').on('load', sizeToParentHeight);
            sizeToParentHeight();
        }


        /**
         * Size the element height to the embedding row height (e.g. a content element in a column will be as high as
         * the row it belongs to). the class pp-row-height is used for that purpose.
         *
         * Currently just one nesting level is supported.
         */
        function sizeToRowHeight() {
            // get rows
            var $rows = $('.pp-row-height').closest('.row');
            $rows.each(function () {
                var maxHeight = 0;

                // reset heights
                var $elements = $('.pp-row-height', $(this)).css('height', 'auto');

                // get max height
                $elements.each(function () {
                    var $this = $(this);
                    if ($this.height() > maxHeight) maxHeight = $this.height();
                });

                // set max height
                $elements.height(maxHeight);
            });
        }
        if ($('.pp-row-height').length) {
            $(window).on('load,resize', sizeToRowHeight);
            $('img').on('load', sizeToRowHeight);
            sizeToRowHeight();
        }



        /**
         * Harmonize children heights for a column element in a row. the result is that all column elements have the same
         * appearance (each child element has the same height). An example are column elements consisting of a header,
         * an image and a text. Some elements might have the header spanning more than one line. With this function all
         * header elements in a row would have the same height.
         */
        function sizeChildrenToRowHeight() {
            // get rows
            var $rows = $('.pp-row-child-height').closest('.row');
            $rows.each(function () {
                var $elements = $('.pp-row-child-height', $(this));
                var childCount = $('.textpic-item',$elements.first()).length;
                var maxHeights = [];
                maxHeights.length = childCount;
                maxHeights.fill(0);

                // reset height
                $('.textpic-item',$elements).css('height', 'auto');

                // get max heights
                $elements.each(function () {
                    $('.textpic-item',this).each(function (iChild) {
                        var $this = $(this);
                        if ($this.height() > maxHeights[iChild]) maxHeights[iChild] = $this.height();
                    });
                });

                // set max heights
                $elements.each(function () {
                    $('.textpic-item',this).each(function (iChild) {
                        $(this).height(maxHeights[iChild]);
                    });
                });
            });
        }
        if ($('.pp-row-child-height .textpic-item').length) {
            $(window).on('load,resize', sizeChildrenToRowHeight);
            $('img').on('load', sizeChildrenToRowHeight);
            sizeChildrenToRowHeight();
        }

    });


    /**
     * Dataprotection label
     */
    $(function () {
        var multiCheckBox = $('#idGeneralContactForm-idDataprotectionMultiCheckbox > div,.pp-dataprotection > div');
        if (multiCheckBox.length > 0) {
            var html = $('.pp-label-dataprotection p').html();
            multiCheckBox.find('label > span').html(html);
        };
    });

}(jQuery);
