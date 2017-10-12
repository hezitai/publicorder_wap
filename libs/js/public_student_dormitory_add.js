(function($, _C, _W) {
	_W.realnameHotelAdd = (function() {
		var _v = {
				message: {},
				id: '',
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					//寝室楼的id
					_v.id = _C.formatting.UrlValue().floor;

					//返回
					$('#back').click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_dormitory.html?floor=' + _v.id;
					})

					$('#add').click(function() {
						var floor = $('#floor').val();
						var roomfigure = $('#roomfigure').val();
						// var site = $('#site').val();


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



						var data = {
							"name": "ds_realhouse",
							"attributes": [{
								"name": "ds_floor",
								"value": floor
							}, {
								"name": "ds_roomfigure",
								"value": roomfigure
							}, {
								"name": "ds_address_tree",
								"value": "@look/" + _v.id
							}, {
								"name": "ds_dutypolice",
								"value": "@look/" + _v.message.systemuserid
							}, {
								"name": "ds_dutyplace",
								"value": "@look/" + _v.message.teamid
							}, {
								"name": "ds_address",
								"value": floor + '楼' + roomfigure + '寝'
							}]
						};


						_a.add(data, function() {
							_C.alert({
								className: 'confirmPopup',
								text: '创建成功'
							})
						});

					});
				},
			},
			_a = {
				// 创建寝室
				add: function(data, success) {
					_C.POST({
						url: "/crm/Entities",
						data: data,
						success: function(result) {
							success();
						}
					});
				},


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