(function($, _C, _W) {
	_W.realnamePhoneDetail = (function() {
		var _v = {},
			_f = {
				init: function() {
					_v.id = _C.formatting.UrlValue().id;

					$('#add').click(function() {
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
							_v.image = true;
							$('.fileBtn').text('重新上传');
							_f.upData(data);
						},
						error: function(a, b, c) {
							_C.loading.hide();
						}
					};
					$('#IdCardA').ajaxForm(ajaxFormOptions);
					$('#delete').click(function() {
						_C.confirm({
							className: 'confirmPopup',
							title: '提示',
							text: '是否删除?',
							confirm: {
								text: '确定',
								event: function() {
									_a.deleteRealName(_v.id, function() {
										_C.alert({
											className: 'confirmPopup',
											text: '已删除'
										}, function() {
											location.href = 'http://' + location.host + '/publicorder_wap/page/realname.html';
										}, function() {
											location.href = 'http://' + location.host + '/publicorder_wap/page/realname.html';
										});
									});
								},
							}
						})
					});
					$('#upData').click(function() {
						_C.confirm({
							className: 'confirmPopup',
							title: '提示',
							text: '是否更新信息?',
							confirm: {
								text: '确定',
								event: function() {
									var fromName = $('#fromName').val();
									var fromId = $('#fromId').val();
									var fromPhone = $('#fromPhone').val();
									var date = $('#date').val();
									var brand = $('#brand').val();
									var describe = $('#describe').val();
									var name = $('#name').val();
									if (!_C.jude.isNull(fromName)) {
										_C.alert({
											className: 'confirmPopup',
											text: '请填写人员姓名'
										});
										return;
									};
									if (!_C.jude.isNull(fromId)) {
										_C.alert({
											className: 'confirmPopup',
											text: '请填写人员身份证号'
										});
										return;
									};
									if (!_C.jude.isIdCard(fromId)) {
										_C.alert({
											className: 'confirmPopup',
											text: '人员身份证号输入错误'
										});
										return;
									};
									if (!_C.jude.isNull(fromPhone)) {
										_C.alert({
											className: 'confirmPopup',
											text: '请填写人员电话号'
										});
										return;
									};
									if (!_C.jude.isPhone(fromPhone)) {
										_C.alert({
											className: 'confirmPopup',
											text: '人员电话号输入错误'
										});
										return;
									};
									if (!_C.jude.isNull(name)) {
										_C.alert({
											className: 'confirmPopup',
											text: '请填写物品名称'
										});
										return;
									};

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
					_f.getDetail();
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
				},
				upData: function(subId) {
					var fromName = $('#fromName').val();
					var fromId = $('#fromId').val();
					var fromPhone = $('#fromPhone').val();
					var date = $('#date').val();
					var describe = $('#describe').val();
					var brand = $('#brand').val();
					var name = $('#name').val();
					var data = {
						"attributes": [{
							"name": "ds_name",
							"value": name
						}]
					};

					if (subId) {
						data.attributes.push({
							"name": "ds_image",
							"value": subId
						});
					};

					if ($('#dateShow').val()) {
						data.attributes.push({
							"name": "ds_date",
							"value": "@dt/" + date + ' 8:00:00'
						});
					};

					if (describe) {
						data.attributes.push({
							"name": "ds_information",
							"value": describe
						});
					};

					if (brand) {
						data.attributes.push({
							"name": "ds_brand",
							"value": brand
						});
					};

					if (subId) {
						data.attributes.push({
							"name": "ds_image",
							"value": subId
						});
					}


					_a.upDataPeoplePhone(fromName, fromPhone, _v.personId);
					_a.upData(_v.id, data, function() {
						_C.alert({
							className: 'confirmPopup',
							text: '修改成功'
						})
					});
				},
				getDetail: function() {
					_a.get(function(result) {
						_v.personId = result['ds_person-ds_personid'];

						$('#fromName').val(result['ds_person-ds_name']);
						$('#fromId').val(result['ds_person-ds_id']);
						$('#fromPhone').val(result['ds_person-ds_phone']);
						$('#number').val(result['ds_roomnum']);
						$('#brand').val(result['ds_brand']);
						$('#describe').val(result['ds_information']);
						$('#name').val(result.ds_name);



						if (result.ds_date) {
							_f.setDate($('#date'), result.ds_date);
							_f.getDate('#dateShow', '#date');
						} else {
							_f.setDate($('#date'), false);
						};


						if (result['ds_image']) {
							_v.image = true;
							_a.getSub(result['ds_image'], function(result) {
								if (result.status == 0) {
									_v.image = true;
									$('#GetImage').attr("src", result.resultObj.fileTempPath).css('display', 'block');
									// expression
								} else {
									_C.alert({
										className: 'confirmPopup',
										text: '未获取到图片'
									});

								}
							});
						} else {
							_v.image = false;
							$('.fileBtn').text('上传照片');
						};
					});
				},
				setDate: function(elementId, str) {
					elementId.val(_C.formatting.ExDate('YYYY-MM-DD', str));
				},
				getDate: function(putEle, thisEle) {
					$(putEle).val(_C.formatting.ExDate('zh', $(thisEle).val()));
				},
			},
			_a = {
				// 获取酒店实名制详情
				get: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter = name eq 'ds_shimingzhiid'" +
							"or name eq 'ds_person-ds_name'" +
							"or name eq 'ds_person-ds_id'" +
							"or name eq 'ds_person-ds_phone'" +
							"or name eq 'ds_person-ds_personid' " +
							"or name eq 'ds_name'" +
							"or name eq 'ds_date'" +
							"or name eq 'ds_image'" +
							"or name eq 'ds_information'" +
							"or name eq 'ds_brand'" +
							"),lookups&$filter=name eq 'ds_shimingzhi' and  query eq 'ds_shimingzhiid eq " + _v.id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
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
				deleteRealName: function(id, success) {
					_C.DELETE({
						url: "/crm/Entities('ds_shimingzhi" + id + "')",
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
						}
					});
				},
			};
		return {
			init: _f.init,
			getDate: _f.getDate,
			getImage: _f.getImage,
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	realnamePhoneDetail.init();
});