(function($, _C, _W) {
	_W.index = (function() {
		var _v = {
				message: {},
				address: '',
				floor: '',
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_v.floor = _C.formatting.UrlValue().floor;
					_a.get(function(result) {
						for (var i = 0; i < result.length; i++) {
							$('#list').append(_t.item(result[i]));
						}
					});
					$('#back').click(function() {
						history.go(-1);
					})
					$('#add').click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_dormitory_add.html?floor=' + _v.floor;
					});
				},
			},
			_t = {
				item: function(data) {
					var html = "";
					html += '<div class="item gray-border cl">';
					html += '<div class="key gray-color text-line-set">' + data.ds_floor + '楼' + data.ds_roomfigure + '寝</div>';
					html += '<div class="icon" id="name"></div>';
					html += '</div>';
					html = $(html);
					html.click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_list.html?floor=' + _v.floor + ' &dormitory=' + data.id;
					});
					return html;
				}



			},
			_a = {
				get: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_address' " +
							"or name eq 'ds_floor' " +
							"or name eq 'ds_roomfigure'" +
							"),lookups&$filter=name eq 'ds_realhouse' and query eq 'ds_address_tree eq " + _v.floor + "'",
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
	index.init();
});