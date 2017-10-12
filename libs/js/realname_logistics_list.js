(function($, _C, _W) {
	_W.realnameList = (function() {
		var _v = {},
			_f = {
				init: function() {
					_v = _C.formatting.UrlValue();
					_a.getlist(function(result) {
						for (var i = 0; i < result.length; i++) {
							var className = '';
							if (result[i].ds_orderstatus.split(":")[0] == '100000000') {
								className = 'red';
							};
							if (result[i].ds_orderstatus.split(":")[0] == '100000002') {
								className = 'opacity';
							};
							$('.main_list').append(_t.item(className, result[i].ds_ordernum, result[i].id));
						}
					});
				},
			},
			_t = {
				item: function(className, num, id) {
					var html = '<div class="item ' + className + '">' + num + '</div>';
					html = $(html);
					html.click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/realname_logistics_details.html?id=' + id;
					});
					return html;
				},
			},
			_a = {
				// 获取单号区间单号列表
				getlist: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_ordernum'  " +
							"or name eq 'ds_orderstatus'  " +
							"or name eq 'ds_unusednum'   " +
							"or name eq 'ds_shimingzhiid' " +
							"),lookups&$filter=name eq 'ds_shimingzhi' " +
							"and query eq '{{ds_orderarea eq " + _v.id + "} and {ds_orderstatus eq 100000001}}'",
						success: function(result) {
							var value = _C.formatting.CRMList(result.value);
							success(value);
						}
					});
				}
			};
		return {
			init: _f.init,
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	realnameList.init();
});