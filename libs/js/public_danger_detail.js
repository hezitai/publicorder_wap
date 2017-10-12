(function($, _C, _W) {
	_W.publicDangerAdd = (function() {
		var _v = {
				message: {},
				image: false,
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_v.id = _C.formatting.UrlValue().id;

					$('.fileBtn').click(function() {
						$('#fileUpDataElement').click();
					});
					var ajaxFormOptions = {
						success: function(data) {
							_C.loading.hide();
							_f.upData(data);

						},
						error: function(a, b, c) {
							_C.loading.hide();
						}
					}
					$('#IdCardA').ajaxForm(ajaxFormOptions);
					$('#add').click(function() {
						$('.mark').css('display', 'block');
						$('.mark').click(function() {
							$('.mark').css('display', 'none');
						});
					});
					$('#delete').click(function() {
						_C.confirm({
							className: 'confirmPopup',
							title: '提示',
							text: '是否删除?',
							confirm: {
								text: '确定',
								event: function() {
									_a.delinfo(_v.id, function() {
										_C.alert({
											className: 'confirmPopup',
											text: '已删除'
										}, function() {
											/*window.history.back();
											location.reload();*/
											location.href = 'public_danger.html'; /*HZTchange*/
										}, function() {
											/*window.history.back();
											location.reload();*/
											location.href = 'public_danger.html'; /*HZTchange*/
										});
									});
								},
							}
						})
					});
					$('#upData').click(function() {
						var name = $('#name').val();
						var peopleName = $('#peopleName').val();
						var peopleId = $('#peopleId').val();
						var peoplePhone = $('#peoplePhone').val();
						var type = $('#type').val();
						var description = $('#description').val();
						var condition = $('#condition').val();
						var measure = $('#measure').val();
						var disposeplan = $('#disposeplan').val();
						if (!_C.jude.isNull(name)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写危爆物品名称'
							});
							return;
						};
						if (!_C.jude.isNull(peopleName)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写负责人姓名'
							});
							return;
						};
						if (!_C.jude.isNull(peopleId)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写负责人身份证号'
							});
							return;
						};
						if (!_C.jude.isIdCard(peopleId)) {
							_C.alert({
								className: 'confirmPopup',
								text: '负责人身份证号输入错误'
							});
							return;
						};
						if (!_C.jude.isNull(peoplePhone)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写负责人电话号'
							});
							return;
						};
						if (!_C.jude.isPhone(peoplePhone)) {
							_C.alert({
								className: 'confirmPopup',
								text: '负责人电话号输入错误'
							});
							return;
						};
						if (!_C.jude.isNull(type)) {
							_C.alert({
								className: 'confirmPopup',
								text: '危爆物品类型不能为空'
							});
							return;
						};
						// if (!_C.jude.isNull(description)) {
						// 	_C.alert({
						// 		className: 'confirmPopup',
						// 		text: '危爆物品重要性论述不能为空'
						// 	});
						// 	return;
						// };
						// if (!_C.jude.isNull(condition)) {
						// 	_C.alert({
						// 		className: 'confirmPopup',
						// 		text: '危爆物品危险品情况不能为空'
						// 	});
						// 	return;
						// };
						// if (!_C.jude.isNull(measure)) {
						// 	_C.alert({
						// 		className: 'confirmPopup',
						// 		text: '危爆物品安保措施不能为空'
						// 	});
						// 	return;
						// };
						// if (!_C.jude.isNull(disposeplan)) {
						// 	_C.alert({
						// 		className: 'confirmPopup',
						// 		text: '危爆物品应急处理方案不能为空'
						// 	});
						// 	return;
						// };

						if ($('#fileUpDataElement')[0].files.length == 0 && !_v.image) {
							_C.alert({
								className: 'confirmPopup',
								text: '请上传物品照片'
							});
							return;
						} else if ($('#fileUpDataElement')[0].files.length != 0) {
							_C.loading.show();
							$('#Submit').click();
						} else if ($('#fileUpDataElement')[0].files.length == 0 && _v.image) {
							_f.upData(false);
						};
					});
					_f.getDetails();
				},
				getDetails: function() {
					_a.getDetails(function(result) {
						_v.personId = result['ds_charge-ds_personid'];
						$('#name').val(result['ds_name']);
						$('#peopleName').val(result['ds_charge-ds_name']);
						$('#peopleId').val(result['ds_charge-ds_id']);
						$('#peoplePhone').val(result['ds_charge-ds_phone']);
						$('#type').val(result['ds_type']);
						$('#description').val(result['ds_description']);
						$('#condition').val(result['ds_condition']);
						$('#measure').val(result['ds_measure']);
						$('#disposeplan').val(result['ds_disposeplan']);

						if (result['ds_picstub']) {
							_v.image = true;
						} else {
							_v.image = false;
						}
						if (result['ds_picstub']) {
							_a.getSub(result['ds_picstub'], function(result) {
								if (result.status == 0) {
									// expression
									_v.image = true;
									$('#GetImage').attr("src", result.resultObj.fileTempPath).css('display', 'block');
								} else {
									_C.alert({
										className: 'confirmPopup',
										text: '未获取到图片'
									});
								}
							});
						};
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
					var disposeplan = $('#disposeplan').val();
					var data = {
						"name": "ds_dangerousgoods",
						"attributes": [{
							"name": "ds_name",
							"value": name
						}, {
							"name": "ds_type",
							"value": type
						}]
					};

					if (subId) {
						data.attributes.push({
							"name": "ds_picstub",
							"value": subId
						});
					};
					if (_C.jude.isNull(measure)) {
						data.attributes.push({
							"name": "ds_measure",
							"value": measure
						});
					} else {
						data.attributes.push({
							"name": "ds_measure",
							"value": 'null'
						});
					};
					if (_C.jude.isNull(description)) {
						data.attributes.push({
							"name": "ds_description",
							"value": description
						});
					} else {
						data.attributes.push({
							"name": "ds_description",
							"value": 'null'
						});
					};
					if (_C.jude.isNull(disposeplan)) {
						data.attributes.push({
							"name": "ds_disposeplan",
							"value": disposeplan
						});
					} else {
						data.attributes.push({
							"name": "ds_disposeplan",
							"value": 'null'
						});
					};
					if (_C.jude.isNull(condition)) {
						data.attributes.push({
							"name": "ds_condition",
							"value": condition
						});
					} else {
						data.attributes.push({
							"name": "ds_condition",
							"value": 'null'
						});
					};

					_a.upDataPeoplePhone(peopleName, peoplePhone, _v.personId);
					_a.upData(data, function(result) {
						_C.alert({
							className: 'confirmPopup',
							text: '修改成功'
						}, function() {
							location.href = "public_danger.html";
						}, function() {
							location.href = "public_danger.html";
						});
					});

				},



				getImage: function() {
					_f.getBase64({
						fileType: 'image',
						elementId: '#fileUpDataElement',
						success: function(imageUrl) {
							$("#GetImage").attr('src', imageUrl).css('display', 'block');
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
					var postf = file.name.substring(index1, index2).toLowerCase(); //后缀名  
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
				}
			},
			_a = {
				// 更新危爆物品
				upData: function(data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_dangerousgoods" + _v.id + "')",
						data: data,
						success: function(result) {
							success();
						}
					});
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
							}]
						},
						success: function() {
						},
						unLoading: true,
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
				getDetails: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_charge-ds_personid' " +
							"or name eq 'ds_charge-ds_name' " +
							"or name eq 'ds_charge-ds_phone' " +
							"or name eq 'ds_charge-ds_id' " +
							"or name eq 'ds_condition' " +
							"or name eq 'ds_description' " +
							"or name eq 'ds_disposeplan' " +
							"or name eq 'ds_location' " +
							"or name eq 'ds_measure' " +
							"or name eq 'ds_name' " +
							"or name eq 'ds_picstub' " +
							"or name eq 'ds_publicorder' " +
							"or name eq 'ds_type' " +
							"),lookups&$filter=name eq 'ds_dangerousgoods' and query eq 'ds_dangerousgoodsid eq " + _v.id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						},
					});
				},
				delinfo: function(id, success) {
					_C.DELETE({
						url: "/crm/Entities('ds_dangerousgoods" + id + "')",
						success: function(result) {
							success();
						}
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
	publicDangerAdd.init();
});