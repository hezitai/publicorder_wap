(function($, _C, _W) {
	_W.publicPeopleAdd = (function() {
		var _v = {
				message: {},
				option: {
					nation: false,
					bloodtype: false,
					education: false,
					familyregister: false,
					marriage: false,
				},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_options.get(['familyregister', 'marriage', 'education', 'bloodtype', 'nation'], function(result) {
						_f.initSelect('#nation', result.nation);
						_f.initSelect('#bloodtype', result.bloodtype);
						_f.initSelect('#marriage', result.marriage);
						_f.initSelect('#account', result.familyregister);
						_f.initSelect('#education', result.education);
					});
					$('#idCard').change(_f.changeIdCard);
					$('#addPeople').click(function() {

						var name = $('#name').val();
						var idCard = $('#idCard').val();
						var position = $('#position').val();

						if (!_C.jude.isNull(name)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请输入姓名',
							});
							return;
						};
						if (!_C.jude.isNull(idCard)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请输入身份证号',
							});
							return;
						};
						if (!_C.jude.isIdCard(idCard)) {
							_C.alert({
								className: 'confirmPopup',
								text: '正确的身份证号',
							});
							return;
						};
						if (!_C.jude.isNull(position)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请输入职位',
							});
							return;
						};

						if ($('#fileUpDataElement')[0].files.length == 0) {
							_f.creat(false);
						} else {
							_C.loading.show();
							$('#Submit').click();
						};
					});
					$('.fileBtn').click(function() {
						$('#fileUpDataElement').click();
					});
					var ajaxFormOptions = {
						success: function(data) {
							_C.loading.hide();
							_f.creat(data);
						},
						error: function(a, b, c) {
							_C.loading.hide();
						}
					};
					$('#IdCardA').ajaxForm(ajaxFormOptions);
				},
				initSelect: function(str, options) {
					options.unshift({
						name: ' - 请选择 - ',
						value: 1,
					});
					for (var i = 0; i < options.length; i++) {
						var isChecked = i == 0 ? true : false;
						$(str).append(_t.optionsTemplate(options[i], isChecked));
					};
				},
				creat: function(subId) {
					var name = $('#name').val();
					var idCard = $('#idCard').val();
					var position = $('#position').val();
					_a.checkPeople(name, idCard, function(result) {
						var personData = {
							"attributes": [{
								name: 'ds_name',
								value: name,
							}]
						};
						var nation = $('#nation').val();
						var bloodtype = $('#bloodtype').val();
						var marriage = $('#marriage').val();
						var account = $('#account').val();
						var education = $('#education').val();

						if (nation != 1) {
							personData.attributes.push({
								name: 'ds_nation',
								value: '@code/' + nation,
							});
						};
						if (bloodtype != 1) {
							personData.attributes.push({
								name: 'ds_bloodtype',
								value: '@code/' + bloodtype,
							});
						};
						if (marriage != 1) {
							personData.attributes.push({
								name: 'ds_marriage',
								value: '@code/' + marriage,
							});
						};
						if (account != 1) {
							personData.attributes.push({
								name: 'ds_account',
								value: '@code/' + account,
							});
						};
						if (education != 1) {
							personData.attributes.push({
								name: 'ds_education',
								value: '@code/' + education,
							});
						};

						if (subId) {
							personData.attributes.push({
								name: 'ds_idaheadpic',
								value: subId,
							});
						};

						var phone1 = $('#phone1').val();
						var phone2 = $('#phone2').val();
						var qq = $('#qq').val();
						var wechat = $('#wechat').val();
						var telephone = $('#telephone').val();
						var height = $('#height').val();
						var address = $('#address').val();


						if (_C.jude.isNull(phone1)) {
							personData.attributes.push({
								name: 'ds_phone',
								value: phone1,
							});
						};
						if (_C.jude.isNull(phone2)) {
							personData.attributes.push({
								name: 'ds_phone2',
								value: phone2,
							});
						};
						if (_C.jude.isNull(qq)) {
							personData.attributes.push({
								name: 'ds_qq',
								value: qq,
							});
						};
						if (_C.jude.isNull(wechat)) {
							personData.attributes.push({
								name: 'ds_wechat',
								value: wechat,
							});
						};

						if (_C.jude.isNull(telephone)) {
							personData.attributes.push({
								name: 'ds_telephone',
								value: telephone,
							});
						};
						if (_C.jude.isNull(height)) {
							personData.attributes.push({
								name: 'ds_height',
								value: height,
							});
						};
						if (_C.jude.isNull(address)) {
							personData.attributes.push({
								name: 'ds_address',
								value: address,
							});
						};
						_a.upData(result, personData, function() {
							var position = $('#position').val();
							var elementData = {
								"name": "ds_publicorder_employee",
								"attributes": [{
									"name": "ds_employee",
									"value": "@look/" + result,
								}, {
									"name": "ds_position",
									"value": position
								}, {
									"name": "ds_publicorder_ref",
									"value": "@look/" + _v.message.id
								}]
							};
							_a.creatCRM(elementData, function() {
								_C.alert({
									className: 'confirmPopup',
									text: '创建成功',
								}, function() {
									location.href = 'http://' + location.host + '/publicorder_wap/page/public_people.html';
								}, function() {
									location.href = 'http://' + location.host + '/publicorder_wap/page/public_people.html';
								});
							});
						});
					});
				},
				changeIdCard: function() {
					var id = $('#idCard').val();
					if (_C.jude.isIdCard(id)) {
						$('#birth').val(_f.filterIdCard(id, 'birth'));
						$('#gender').val(_f.filterIdCard(id, 'sex') == 1 ? '男' : '女');
					} else {
						$('#birth').val('');
						$('#gender').val('');
					}
				},
				filterIdCard: function(input, type) {
					if (type == 'age') {
						var age = '';
						if (input.length == 18) {
							age = year - parseInt(input.substring(6, 10)) - 1;
							if (input.substring(10, 12) < month || input.substring(10, 12) == month && input.substring(12, 14) <= day) {
								age++;
							};
						};
						if (input.length == 15) {
							age = year - parseInt(input.substring(6, 8)) + 1900 - 1;
							if (input.substring(8, 10) < month || input.substring(8, 10) == month && input.substring(10, 12) <= day) {
								age++;
							};
						}
						input = age;
					};
					if (type == 'sex') {
						var sex = '';
						if (input.length == 18) {
							sex = input.substring(16, 17) % 2 ? "1" : "2";
						};
						if (input.length == 15) {
							sex = input.substring(14, 15) % 2 ? "1" : "2";
						};
						input = sex;
					};
					if (type == 'birth') {
						var birth = '';
						if (input.length == 18) {
							birth = input.substring(6, 10) + "年" + input.substring(10, 12) + "月" + input.substring(12, 14) + '日';
						};
						if (input.length == 15) {
							birth = parseInt(input.substring(6, 8)) + 1900 + "年" + input.substring(8, 10) + "月" + input.substring(10, 12) + '日';
						}
						input = birth;
					};
					return input;
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
			_t = {
				optionsTemplate: function(data, isChecked) {
					var html = '';
					html += '<option value="' + data.value + '" ' + (isChecked ? 'selected="selected"' : '') + '>' + data.name + '</option>'
					return html;
				},
			},
			_a = {
				creatCRM: function(data, success) {
					_C.POST({
						url: "/crm/Entities",
						data: data,
						success: function(result) {
							if (success) {
								success(result.value);
							};
						}
					});
				},
				upData: function(id, data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_person" + id + "')",
						data: data,
						success: function(result) {
							success(result);
						},
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
			},
			_options = {
				getOptions: function(name, success) {
					if (_v.option[name]) {
						success(_v.option[name]);
					} else {
						_C.GET({
							url: "/crm/OptionSets('ds_" + name + "')",
							success: function(result) {
								_v.option[name] = _C.formatting.CRMOptions(result);
								success(_v.option[name]);
							}
						});
					};
				},
				get: function(arrayList, success) {
					var newArray = $.extend(true, [], arrayList);
					var resultArray = {};
					var recursiveOptionSites = function() {
						var item = newArray.pop();
						_options.getOptions(item, function(result) {
							resultArray[item] = result;
							// resultArray.unshift(result);
							if (newArray.length == 0) {
								success(resultArray);
							} else {
								recursiveOptionSites();
							}
						});
					};
					recursiveOptionSites();
				},
			}
		return {
			init: _f.init,
			getImage: _f.getImage,
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	publicPeopleAdd.init();
});