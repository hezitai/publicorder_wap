(function($, _C, _W) {
	_W.realNameAddMetal = (function() {
		var _v = {
				message: {},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;

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
					};

					$('#IdCardA').ajaxForm(ajaxFormOptions);
					$('#add').click(function() {
						var fromName = $('#fromName').val();
						if (!_C.jude.isNull(fromName)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写人员姓名'
							});
							return;
						};
						var fromId = $('#fromId').val();
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
						var fromPhone = $('#fromPhone').val();
						if (!_C.jude.isPhone(fromPhone) && _C.jude.isNull(fromPhone)) {
							_C.alert({
								className: 'confirmPopup',
								text: '人员电话号输入错误'
							});
							return;
						};

						var name = $('#name').val();
						if (!_C.jude.isNull(name)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写物品名称'
							});
							return;
						};

						if ($('#fileUpDataElement')[0].files.length == 0) {
							_f.upData(false);
						} else {
							_C.loading.show();
							$('#Submit').click();
						};

					});
				},
				upData: function(subId) {
					var fromName = $('#fromName').val();
					var fromId = $('#fromId').val();
					var orderNum = $('#orderNum').val();
					var fromPhone = $('#fromPhone').val();
					var date = $('#date').val();
					var name = $('#name').val();
					var describe = $('#describe').val();
					var weight = $('#weight').val();

					var data = {
						"name": "ds_shimingzhi",
						"attributes": [{
							"name": "ds_name",
							"value": name
						}, {
							"name": "ds_publicorder",
							"value": "@look/" + _v.message.id
						}]
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
					if (weight) {
						data.attributes.push({
							"name": "ds_weight",
							"value": weight
						});
					};

					if (subId) {
						data.attributes.push({
							"name": "ds_image",
							"value": subId
						});
					};

					_a.checkPeople(fromName, fromId, function(peopleId) {
						data.attributes.push({
							"name": "ds_person",
							"value": "@look/" + peopleId
						});
						_a.upDataPeoplePhone(fromName, fromPhone, peopleId);
						_a.creat(data, function(result) {
							_C.alert({
								className: 'confirmPopup',
								text: '创建成功'
							}, function() {
								location.href = 'http://' + location.host + '/publicorder_wap/page/realname.html';
							}, function() {
								location.href = 'http://' + location.host + '/publicorder_wap/page/realname.html';
							});
						});
					});
				},
				getDate: function(putEle, thisEle) {
					$(putEle).val(_C.formatting.ExDate('zh', $(thisEle).val()));
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
			},
			_a = {
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
				creat: function(data, success) {
					_C.POST({
						url: "/crm/Entities",
						data: data,
						success: function(result) {
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
			};
		return {
			init: _f.init,
			getDate: _f.getDate,
			getImage: _f.getImage,
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	realNameAddMetal.init();
});