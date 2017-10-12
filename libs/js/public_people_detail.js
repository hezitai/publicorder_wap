(function($, _C, _W) {
	_W.detail = (function() {
		var _v = {
				message: {},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_v.id = _C.formatting.UrlValue().id;
					_a.getOptions(function() {
						_a.getDetail(_f.initPage);
					});
					$('#deletePeople').click(function() {
						_C.confirm({
							className: 'confirmPopup',
							title: '提示',
							text: '是否删除从业人员?',
							confirm: {
								text: '确定',
								event: function() {
									_a.deleteCrm(function() {
										_C.alert({
											className: 'confirmPopup',
											text: '删除成功',
										}, function() {
											location.href = 'http://' + location.host + '/publicorder_wap/page/public_people.html';
										}, function() {
											location.href = 'http://' + location.host + '/publicorder_wap/page/public_people.html';
										});
									});
								}
							}
						});
					});
				},
				initPage: function(value) {
					$('#name').text(value['ds_employee-ds_name']);
					$('#idCard').text(value['ds_employee-ds_id']);
					$('#birth').text(_C.formatting.ExDate('zh', _f.idCardNumberToBirth(value['ds_employee-ds_id'])));
					$('#position').text(value.ds_position);
					$('#gender').text(_f.idCardNumberToSex(value['ds_employee-ds_id']) == '1' ? '男' : '女');

					if (value['ds_employee-ds_education']) {
						$('#education').text(value['ds_employee-ds_education'].split(':')[1]);
					}
					if (value['ds_employee-ds_nation']) {
						$('#nation').text(value['ds_employee-ds_nation'].split(':')[1]);
					}
					if (value['ds_employee-ds_marriage']) {
						$('#marriage').text(value['ds_employee-ds_marriage'].split(':')[1]);
					}
					if (value['ds_employee-ds_bloodtype']) {
						$('#bloodtype').text(value['ds_employee-ds_bloodtype'].split(':')[1]);
					}

					$('#account').text(_f.getValueByOptions(value['ds_employee-ds_account'], _v.account));


					$('#phone1').text(value['ds_employee-ds_phone']);
					$('#phone2').text(value['ds_employee-ds_phone2']);
					$('#qq').text(value['ds_employee-ds_qq']);
					$('#wechat').text(value['ds_employee-ds_wechat']);
					$('#telephone').text(value['ds_employee-ds_telephone']);
					$('#height').text(value['ds_employee-ds_height']);
					$('#address').text(value['ds_employee-ds_address']);

					var subId = value['ds_employee-ds_idaheadpic'];
					if (subId) {
						_a.getSub(subId, function(result) {
							$('#picture').attr('src', result);
						});
					}
				},
				getValueByOptions: function(name, options) {
					var text = '';
					for (var i = 0; i < options.length; i++) {
						if (name == options[i].value) {
							text = options[i].name;
						}
					}
					return text;
				},
				idCardNumberToBirth: function(psidno) {
					var birthdayno, birthdaytemp
					if (psidno.length == 18) {
						birthdayno = psidno.substring(6, 14)
					} else if (psidno.length == 15) {
						birthdaytemp = psidno.substring(6, 12)
						birthdayno = "19" + birthdaytemp
					};
					var birthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8)
					return birthday
				},
				idCardNumberToSex: function(idCard) {
					var sex = '';
					if (idCard.length == 18) {
						sex = idCard.substring(16, 17) % 2 ? "1" : "2";
					};
					if (idCard.length == 15) {
						sex = idCard.substring(14, 15) % 2 ? "1" : "2";
					};
					return sex;
				},
			},
			_a = {
				getDetail: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_employee-ds_name' " +
							"or name eq 'ds_employee-ds_id' " +
							"or name eq 'ds_position' " +
							"or name eq 'ds_employee-ds_account' " +
							"or name eq 'ds_employee-ds_address' " +
							"or name eq 'ds_employee-ds_birth' " +
							"or name eq 'ds_employee-ds_bloodtype' " +
							"or name eq 'ds_employee-ds_education' " +
							"or name eq 'ds_employee-ds_gender' " +
							"or name eq 'ds_employee-ds_height' " +
							"or name eq 'ds_employee-ds_idaheadpic' " +
							"or name eq 'ds_employee-ds_idbackpic' " +
							"or name eq 'ds_employee-ds_livestatus' " +
							"or name eq 'ds_employee-ds_marriage' " +
							"or name eq 'ds_employee-ds_nation' " +
							"or name eq 'ds_employee-ds_nativeplace' " +
							"or name eq 'ds_employee-ds_oldname' " +
							"or name eq 'ds_employee-ds_personid' " +
							"or name eq 'ds_employee-ds_phone' " +
							"or name eq 'ds_employee-ds_phone2' " +
							"or name eq 'ds_employee-ds_politics' " +
							"or name eq 'ds_employee-ds_qq' " +
							"or name eq 'ds_employee-ds_telephone' " +
							"or name eq 'ds_employee-ds_wechat' " +
							"),lookups&$filter=name eq 'ds_publicorder_employee' and query eq 'ds_publicorder_employeeid eq " + _v.id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					});
				},
				getOptions: function(success) {
					_C.GET({
						url: "/crm/OptionSets('ds_familyregister')",
						success: function(result) {
							var value = _C.formatting.CRMOptions(result);
							_v.account = value;
							success();
						}
					});
				},
				getSub: function(id, success) {
					_C.POST({
						url: "/api/Place/GetStub",
						data: {
							"id": id
						},
						success: function(result) {
							if (result.status == '0') {
								success(result.resultObj.fileTempPath);
							} else {
								_C.alert({
									className: 'confirmPopup',
									text: result.message,
								});
							}

						}
					});
				},
				deleteCrm: function(success) {
					_C.DELETE({
						url: "/crm/Entities('ds_publicorder_employee" + _v.id + "')",
						success: function() {
							success();
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