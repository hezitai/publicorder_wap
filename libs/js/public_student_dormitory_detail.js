(function($, _C, _W) {
	_W.realnameHotelAdd = (function() {
		var _v = {
				message: {},
				floor: '',
				dormitory: '',
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_v.floor = _C.formatting.UrlValue().floor;
					_v.dormitory = _C.formatting.UrlValue().dormitory;

					_v.realhouseId = '';

					//返回
					$('#back').click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_list.html?floor=' + _v.floor + ' &dormitory=' + _v.dormitory;
					});

					$('#addManage').click(function() {
						var floor = $('#floor').val();
						var roomfigure = $('#roomfigure').val();
						var site = $('#site').val();
						if (!_C.jude.isNull(floor)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写寝室楼层'
							});
							return;
						};
						if (!_C.jude.isNull(roomfigure)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写寝室号码'
							});
							return;
						};
						_a.upDataPeoplePhone(floor, roomfigure, function() {
							_C.alert({
								className: 'confirmPopup',
								text: "修改成功！"
							}, function() {
								$(".mark").hide();
							})
						});
					});
					_f.getDetails();
				},
				getDetails: function() {
					_a.get(function(result) {
						_v.realhouseId = result.id;
						$('#floor').val(result['ds_floor']);
						$('#roomfigure').val(result['ds_roomfigure']);
						$('#site').val(result['ds_address_tree'] ? result['ds_address_tree'] : '');
					});

				},
			},
			_a = {
				get: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_address' or name eq 'ds_floor'or name eq'ds_roomfigure'),lookups&$filter=name eq 'ds_realhouse' and query eq 'ds_address_tree eq " + _v.dormitory + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value); //返回列表CRMlist
							success(value);
						}
					});
				},
				upDataPeoplePhone: function(floor, roomfigure, success) {
					_C.PUT({
						url: "/crm/Entities('ds_realhouse" + _v.realhouseId + "')",
						data: {
							"attributes": [{
								"name": "ds_floor",
								"value": floor
							}, {
								"name": "ds_roomfigure",
								"value": roomfigure
							}, {
								"name:": "ds_address",
								"value": floor + '楼' + roomfigure + '寝'
							}]
						},
						success: function() {
							success();
						},
						unLoading: true,
					});
				}
			};
		return {
			init: _f.init,
			getDate: _f.getDate,
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	realnameHotelAdd.init();
});