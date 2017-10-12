(function($, _C, _W) {
	_W.publicPeople = (function() {
		var _v = {
				message: {},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_a.get(function(result) {
						for (var i = 0; i < result.length; i++) {
							$('#list').append(_t.item(result[i]));
						}
					});
					$('#addPeople').click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_people_add.html';
					});
				},
			},
			_t = {
				item: function(data) {
					var html = "";
					html += '<div class="item gray-border cl">';
					html += '<div class="key gray-color text-line-set">' + data['ds_employee-ds_name'] + '</div>';
					html += '<div class="icon " id="name"></div>';
					html += '</div>';
					html = $(html);
					html.click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_people_detail.html?id=' + data.id;
					});
					return html;
				}
			},
			_a = {
				get: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_employee-ds_name' " +
							"or name eq 'ds_employee-ds_personid'  " +
							"or name eq 'ds_employee-ds_name'" +
							"or name eq 'ds_publicorder_employeeid'" +
							"or name eq 'ds_position'" +
							"),lookups&$filter=name eq 'ds_publicorder_employee' and query eq 'ds_publicorder_ref eq " + _v.message.id + "'",
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
	publicPeople.init();
});