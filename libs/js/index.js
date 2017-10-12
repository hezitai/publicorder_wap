(function($, _C, _W) {
    _W.index = (function() {
        var _v = {

            },
            _f = {
                init: function() {
                    $('#placeName').text(permissions.getUserMessage().publicMessage.name);
                }
            };
        return {
            init: _f.init,
        };
    })();
})(jQuery, common, window);
$(document).ready(function() {
    index.init();
});