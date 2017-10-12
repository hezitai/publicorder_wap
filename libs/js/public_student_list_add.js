(function($, _C, _W) {
	_W.realnameHotelAdd = (function() {
		var _v = {
				message: {},
				floor: '',
				dormitory: '',
				id: '',
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;

					_v.floor = _C.formatting.UrlValue().floor;
					_v.dormitory = _C.formatting.UrlValue().dormitory;
					_v.id = _C.formatting.UrlValue().id;

					//返回
					$('#back').click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_list.html?floor=' + _v.floor + ' &dormitory=' + _v.dormitory;
					})

					$('#addRealName').click(function() {
						var name = $('#name').val();
						var idCard = $('#idCard').val();
						var phone = $('#phone').val();
						var nativeplace = $('#nativeplace').val();

						if (!_C.jude.isNull(name)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写学生姓名'
							});
							return;
						};


						if (!_C.jude.isNull(idCard)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写学生身份证号码'
							});
							return;
						};
						if (!_C.jude.isIdCard(idCard)) {
							_C.alert({
								className: 'confirmPopup',
								text: '学生身份证号输入错误'
							});
							return;
						};
						if (!_C.jude.isNull(phone)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写电话号码'
							});
							return;
						};
						if (!_C.jude.isPhone(phone)) {
							_C.alert({
								className: 'confirmPopup',
								text: '电话号输入错误'
							});
							return;
						};

						if (!_C.jude.isNull(nativeplace)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写学生籍贯'
							});
							return;
						};

						_a.checkPeople(name, idCard, function(result) {
							if (result) {
								var data = {
									"name": "ds_residentsassociation",
									"attributes": [{
										"name": "ds_person_ref",
										"value": "@look/" + result
									}, {
										"name": "ds_realhouse_ref",
										"value": "@look/" + _v.dormitory
									}]
								};

								_a.upDataPeoplePhone(name, phone, result);


								_a.add(data, function() {
									_C.alert({
										className: 'confirmPopup',
										text: '创建成功'
									})
								});
							}
						});


					});
				},

			},
			_a = {

				add: function(data, success) {
					_C.POST({
						url: "/crm/Entities",
						data: data,
						success: function(result) {
							success();
						}
					});
				},
				// 检查人员接口
				checkPeople: function(name, id, success) {
					_C.POST({
						url: "/api/Crm/GetPeopleExist",
						data: {
							"name": name,
							"idCard": id,
							"isCreate": "true",
							"publicorderId": permissions.getUserMessage().publicMessage.id,
							"publicorderName": permissions.getUserMessage().publicMessage.name,
							"policeId": permissions.getUserMessage().publicMessage.systemuserid,
						},
						success: function(result) {
							if (result.status == 0) {
								success(result.resultObj.personId);
							} else {
								success(false);
							}
						}
					});
				}, // 更新人员信息接口,姓名,电话
				upDataPeoplePhone: function(name, phone, id, success) {
					_C.PUT({
						url: "/crm/Entities('ds_person" + id + "')",
						data: {
							"attributes": [{
								"name": "ds_phone",
								"value": phone
							}, {
								"name": "ds_name",
								"value": name
							}]
						},
						success: function() {
							if (success) {
								success();
							}
						}
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