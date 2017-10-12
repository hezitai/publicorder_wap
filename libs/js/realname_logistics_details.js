(function($, _C, _W) {
	_W.realnameCustom = (function() {
		var _v = {
				id: '',
				personId: '',
			},
			_f = {
				init: function() {
					_v.id = _C.formatting.UrlValue().id;

					$('#addRealName').click(function() {
						$('.mark').css('display', 'block');
					});
					$('.mark').click(function() {
						$('.mark').css('display', 'none');
					});
					$('.fileBtn').click(function() {
						$('#fileUpDataElement').click();
					});
					var ajaxFormOptions = {
						success: function(data) {
							_C.loading.hide();
							_f.upData(data);
							_v.image = true;
							$('.fileBtn').text('重新上传');
						},
						error: function(a, b, c) {
							_C.loading.hide();
						}
					};
					$('#IdCardA').ajaxForm(ajaxFormOptions);
					$('#upData').click(function() {

						var name = $('#name').val();
						if (!_C.jude.isNull(name)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写物品名称'
							});
							return;
						};
						var fromName = $('#fromName').val();
						if (!_C.jude.isNull(fromName)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写寄件人姓名'
							});
							return;
						};
						var fromPhone = $('#fromPhone').val();
						if (!_C.jude.isNull(fromPhone)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写寄件人电话号'
							});
							return;
						};
						if (!_C.jude.isPhone(fromPhone)) {
							_C.alert({
								className: 'confirmPopup',
								text: '寄件人电话号输入错误'
							});
							return;
						};

						var toPhone = $('#toPhone').val();
						if (_C.jude.isNull(toPhone) && !_C.jude.isPhone(toPhone)) {
							_C.alert({
								className: 'confirmPopup',
								text: '收件人电话号输入错误'
							});
							return;
						};

						// var describe = $('#describe').val();
						// if (!_C.jude.isNull(describe)) {
						// 	_C.alert({
						// 		className: 'confirmPopup',
						// 		text: '请填写物品描述'
						// 	});
						// 	return;
						// };
						_C.confirm({
							className: 'confirmPopup',
							title: '提示',
							text: '是否更新信息?',
							confirm: {
								text: '确定',
								event: function() {

									if ($('#fileUpDataElement')[0].files.length != 0) {
										$('#Submit').click();
										_C.loading.show();
									} else {
										_f.upData(false);
									};
								},
							}
						})
					});
					$('#invalid').click(function() {
						_C.confirm({
							className: 'confirmPopup',
							title: '提示',
							text: '是否作废?',
							confirm: {
								text: '确定',
								event: function() {
									_a.invalid(_v.id, function() {
										var setting = { /*HZTchange*/
											className: 'confirmPopup',
											title: '提示',
											text: '已作废',
											confirm: {
												text: '确定',
												event: function() {
													location.reload();
												},
											}
										};
										common.confirm(setting);
									});
								},
							}
						})
					});
					_f.getDetail();
				},
				getDetail: function() {
					_a.get(_v.id, function(result) {
						_v.personId = result['ds_person-ds_personid'];
						if (_v.personId) {
							$('#fromId').val(result['ds_person-ds_id']);
						} else {
							$('#fromId').removeAttr("readonly");
						};

						$('#fromName').val(result['ds_person-ds_name']);
						$('#orderNum').val(result['ds_ordernum']);
						$('#fromPhone').val(result['ds_person-ds_phone']);
						$('#toName').val(result['ds_receivernic']);
						$('#toPhone').val(result['ds_receiverphone']);
						$('#name').val(result['ds_name']);
						$('#describe').val(result['ds_information']);

						var textType = result['ds_orderstatus'].split(":")[0];
						$('#status').attr('data-status', textType);
						$('#status').text((textType == '100000002' ? '已使用' : textType == '100000001' ? '未使用' : '已作废'))

						if (result['ds_image']) {
							_v.image = true;
							_a.getSub(result['ds_image'], function(result) {
								if (result.status == 0) {
									_v.image = true;
									$('#GetImage').attr("src", result.resultObj.fileTempPath).css('display', 'block');
								} else {
									_C.alert({
										className: 'confirmPopup',
										text: '未获取到图片'
									});
								};
							});
						} else {
							_v.image = false;
							$('.fileBtn').text('上传照片');
						}

					});
				},
				getImage: function() {
					_f.getBase64({
						fileType: 'image',
						elementId: '#fileUpDataElement',
						success: function(imageUrl) {
							$('#GetImage').attr('src', imageUrl).css('display', 'block');
						},
						error: function(message) {
							common.alert({
								className: 'confirmPopup',
								text: message
							});
						}
					});
				},
				getBase64: function(data) {
					var file = $(data.elementId)[0].files[0];
					if (!file) {
						data.error('上传文件信息未空');
						$(data.elementId).clearFields();
						return;
					};
					var fileType = ['.doc', '.docx', '.jpg', '.jpeg', '.png'];
					var index1 = file.name.lastIndexOf(".");
					var index2 = file.name.length;
					var postf = file.name.substring(index1, index2).toLowerCase();
					if ($.inArray(postf, fileType) == -1) {
						data.error('文件格式错误');
						$(data.elementId).clearFields();
						return;
					};
					if (data.fileType == 'image' && (postf != '.jpg' && postf != '.jpeg' && postf != '.png')) {
						data.error('预期格式错误');
						$(data.elementId).clearFields();
						return;
					} else if (data.fileType == 'doc' && (postf != '.doc' && postf != '.docx')) {
						data.error('预期格式错误');
						$(data.elementId).clearFields();
						return;
					};
					var oReader = new FileReader();
					oReader.onload = function(e) {
						if (data.fileType == 'image') {
							var _image = document.createElement('img');
							_image.src = e.target.result;
							_image.onload = function() {
								var that = _image;
								var w = that.width,
									h = that.height,
									scale = w / h;
								w = 640;
								h = w / scale;
								var canvas = document.createElement('canvas');
								var ctx = canvas.getContext('2d');
								$(canvas).attr({
									width: w,
									height: h
								});
								ctx.drawImage(that, 0, 0, w, h);
								var base64 = canvas.toDataURL('image/jpeg', 0.6);
								data.success(base64);
							};
						} else if (data.fileType == 'doc') {
							data.success(e.target.result);
						};
					};
					oReader.readAsDataURL(file);
				},
				upData: function(subId) {

					var toName = $('#toName').val();
					var toPhone = $('#toPhone').val();
					var name = $('#name').val();
					var describe = $('#describe').val();

					var textType = $('#status').attr('data-status');

					var fromName = $('#fromName').val();
					var fromPhone = $('#fromPhone').val();
					var fromId = $('#fromId').val();

					var data = {
						"attributes": [{
							"name": "ds_name",
							"value": name
						}]
					};
					if (_C.jude.isNull(toName)) {
						data.attributes.push({
							"name": "ds_receivernic",
							"value": toName
						});
					};
					if (_C.jude.isNull(toPhone)) {
						data.attributes.push({
							"name": "ds_receiverphone",
							"value": toPhone
						});
					};
					if (_C.jude.isNull(describe)) {
						data.attributes.push({
							"name": "ds_information",
							"value": describe
						});
					};
					if (subId) {
						data.attributes.push({
							"name": "ds_image",
							"value": subId
						});
					};

					function updataOrder() {
						_a.upData(_v.id, data, function() {
							_a.upDataPeoplePhone(fromName, fromPhone, _v.personId, function() {
								_C.alert({
									className: 'confirmPopup',
									text: '修改成功',
								})
							});
						});
					};

					if (textType == "100000001") {
						_a.checkPeople(fromName, fromId, function(id) {
							data.attributes.push({
								"name": "ds_person",
								"value": "@look/" + id
							}, {
								"name": "ds_orderstatus",
								"value": "@code/100000002"
							});
							_v.personId = id;
							$('#fromId').attr("readonly", "readonly");

							updataOrder();
						});
					} else {
						updataOrder();
					}
				}
			},
			_a = {
				// 获得订单详情接口
				get: function(id, success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_ordernum' " +
							"or name eq 'ds_person-ds_name'  " +
							"or name eq 'ds_person-ds_id'  " +
							"or name eq 'ds_person-ds_phone'  " +
							"or name eq 'ds_name' " +
							"or name eq 'ds_orderstatus' " +
							"or name eq 'ds_information' " +
							"or name eq 'ds_image' " +
							"or name eq 'ds_person-ds_personid' " +
							"or name eq 'ds_receivernic' " +
							"or name eq 'ds_receiverphone' " +
							"),lookups&$filter=name eq 'ds_shimingzhi' and  query eq 'ds_shimingzhiid eq " + id + "'",
						success: function(result) {
							success(_C.formatting.CRMValue(result.value));
						}
					});
				},
				// 获取附件接口
				getSub: function(id, success) {
					_C.POST({
						url: "/api/Place/GetStub",
						data: {
							"id": id
						},
						success: function(result) {
							if (result.status == 0) {
								success(result);
							} else {
								_C.alert({
									className: 'confirmPopup',
									text: result.message
								});
							};
						}
					});
				},
				// 更新订单接口
				upData: function(id, data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_shimingzhi" + id + "')",
						data: data,
						success: function(result) {
							success();
						}
					});
				},
				// 作废订单接口
				invalid: function(id, success) {
					_C.PUT({
						url: "/crm/Entities('ds_shimingzhi" + id + "')",
						data: {
							"attributes": [{
								"name": "ds_orderstatus",
								"value": "@code/100000000"
							}]
						},
						success: function(result) {
							success();
						}
					});
				},
				// 更新人员信息接口,姓名,电话
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
							success();
						}
					});
				},
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
				},
				upDataPeopleInfo: function(id, data) {
					_C.PUT({
						data: data,
						url: "/crm/Entities('ds_person" + id + "')",
						success: function() {

						},
					});
				},
			};
		return {
			init: _f.init,
			getImage: _f.getImage,

		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	realnameCustom.init();
});