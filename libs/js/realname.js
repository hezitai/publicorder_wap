(function($, _C, _W) {
	_W.detail = (function() {
		var _v = {
				message: {},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_a.getDetail(_f.initPage);
				},
				initPage: function(value) {
					switch (value.ds_businesskind.split(":")[0]) {
						case "100000011": // 能住宿的饭店
							realnameHotel.init();
							// $('.main').append('<h2>能住宿的饭店</h2>')
							break;
						case "100000006": // 金银首饰加工
							realnameMetal.init();
							// $('.main').append('<h2>金银首饰加工</h2>')
							break;
						case "100000002": // 废品回收
							realnameWaste.init();
							// $('.main').append('<h2>废品回收</h2>')
							break;
						case "100000018": // 物流
							realnameLogistics.init();
							// $('.main').append('<h2>物流</h2>')
							break;
						case "100000009": // 手机回收
							realnamePhone.init();
							// $('.main').append('<h2>手机回收</h2>')
							break;
						default:
							$('.main').append('<h3>此功能暂未开放</h3>');
					}
				},
				shwoMark: function() {
					$('.mark').css('display', 'block');
					$('.mark').find('.cancel').click(function() {
						$('.mark').css('display', 'none');
					});
				}
			},
			_a = {
				getDetail: function(success) {
					var id = _v.message.id;
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter= name eq 'ds_businesskind'" +
							"),lookups&$filter=name eq 'ds_publicorder' and query eq 'ds_publicorderid eq " + id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
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
	detail.init();
});