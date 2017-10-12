(function($, _C, _W) {
	_W.realnameHotelAdd = (function() {
		var _v = {
				message: {},
				id: '',
				student: '',
				floor: '',
				dormitory: '',
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_v.floor = _C.formatting.UrlValue().floor;
					_v.dormitory = _C.formatting.UrlValue().dormitory;
					_v.id = _C.formatting.UrlValue().id;
					_v.student = _C.formatting.UrlValue().student;

					$("#addManage").click(function() {
						$(".mark").show();
					});
					$(".cancel").click(function() {
						$(".mark").hide();
					});

					//返回
					$('#back').click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_list.html?floor=' + _v.floor + ' &dormitory=' + _v.dormitory;
					});

					$('#submit').click(function() {
						var name = $('#name').val();
						var idCard = $('#idCard').val();
						var phone = $('#phone').val();
						var placeaddress = $('#placeaddress').val();
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

						if (!_C.jude.isNull(placeaddress)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写学生籍贯'
							});
							return;
						};

						var putdata = {
							"attributes": [{
								"name": "ds_name",
								"value": name
							}, {
								"name": "ds_nativeplace",
								"value": placeaddress
							}, {
								"name": "ds_phone",
								"value": phone
							}]
						}
						_a.upData(putdata, function(result) {
							_C.alert({
								className: 'confirmPopup',
								text: "修改成功！"
							}, function() {
								$(".mark").hide();
							})
						})
					});

					$('#delete').click(function() {
						_a.deletePeople(_v.student, function() {});
					})


					_f.getDetails();
				},
				getDetails: function() {
					_a.get(function(result) {
						_v.personId = result.id;
						$('#name').val(result['ds_name']);
						$('#idCard').val(result['ds_id']);
						$('#phone').val(result['ds_phone']);
						$('#placeaddress').val(result['ds_nativeplace'] ? result['ds_nativeplace'] : '');
					});
				},
				upData: function(subId) {
					var name = $('#name').val();
					var peopleName = $('#peopleName').val();
					var peopleIdCard = $('#peopleId').val();
					var peoplePhone = $('#peoplePhone').val();
					var type = $('#type').val();
					var description = $('#description').val();
					var condition = $('#condition').val();
					var measure = $('#measure').val();
					var placeaddress = $('#placeaddress').val();
					var data = {
						"name": "ds_dangerousgoods",
						"attributes": [{
							"name": "ds_name",
							"value": name
						}, {
							"name": "ds_picstub",
							"value": subId
						}, {
							"name": "ds_placeaddress",
							"value": description
						}, {
							"name": "ds_placeaddress",
							"value": placeaddress
						}, {
							"name": "ds_condition",
							"value": condition
						}, {
							"name": "ds_measure",
							"value": measure
						}, {
							"name": "ds_type",
							"value": type
						}]
					};
					_a.upDataPeoplePhone(peopleName, peoplePhone, _v.personId);

					_a.checkPeople(name, idCard, function(result) {
						if (result) {
							var data = {
								"name": "ds_residentsassociation",
								"attributes": [{
									"name": "ds_person_ref",
									"value": "@look/" + result
								}, {
									"name": "ds_realhouse_ref",
									"value": "@look/" + _v.id
								}]
							};

						}
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
				get: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_nativeplace' " +
							"or name eq 'ds_id' " +
							"or name eq 'ds_name' " +
							"or name eq 'ds_phone' " +
							")&$filter=name eq 'ds_person' and query eq 'ds_personid eq " + _v.id + "'",

						success: function(result) {
							var value = _C.formatting.CRMValue(result.value); //返回列表CRMlist
							success(value);
						}
					});
				},
				upData: function(data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_person" + _v.personId + "')",
						data: data,
						success: function(result) {
							success();
						}
					});
				},
				//删除
				deletePeople: function(data, success) {
					_C.DELETE({
						url: "/crm/Entities('ds_residentsassociation" + data + "')",
						success: function(result) {
							success();
							common.alert({
								className: 'confirmPopup',
								text: '删除成功！'
							}, function() {
								location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_list.html?floor=' + _v.floor + ' &dormitory=' + _v.dormitory;
							});
							_f.init();
						}
					})
				},
				// 更新人员姓名及电话号
				upDataPeoplePhone: function(name, phone, id) {
					_C.PUT({
						url: "/crm/Entities('ds_person" + id + "')",
						data: {
							"attributes": [{
								"name": "ds_phone",
								"value": phone
							}, {
								"name": "ds_name",
								"value": name
							}, {
								"name": "ds_nativeplace",
								"value": placeaddress
							}]
						},
						success: function() {
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