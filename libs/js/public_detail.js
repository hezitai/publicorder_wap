(function($, _C, _W) {
	_W.detail = (function() {
		var _v = {
				message: {},
				name: '',
				address: '',
				ownerId: '',
				ownerName: '',
				ownerPhone: '',
				ownerIdcard: '',
				ownerAddress: '',
				securId: '',
				securName: '',
				securPhone: '',
				securIdcard: '',
				securAddress: '',
				details: {},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_a.getDetail(_f.initPage);
					$('#upDatePublicOrderAddress').click(_f.upDatePublicOrderAddressEvent);
				},
				initPage: function(value) {
					_v.details = value;
					$('#name').text(value.ds_name);
					$('#address').text(value.ds_address);
					$('#businesskind').text(value.ds_businesskind.split(':')[1]);
					$('#ownerName').text(value['ds_owner_ref-ds_name']);
					$('#ownerPhone').text(value['ds_owner_ref-ds_phone']);
					$('#ownerIdcard').text(value['ds_owner_ref-ds_id']);
					$('#ownerAddress').text(value['ds_owner_ref-ds_address']);
					$('#securName').text(value['ds_securityowner_ref-ds_name']);
					$('#securPhone').text(value['ds_securityowner_ref-ds_phone']);
					$('#securIdcard').text(value['ds_securityowner_ref-ds_id']);
					$('#securAddress').text(value['ds_securityowner_ref-ds_address']);

					_v.name = value.ds_name;
					_v.address = value.ds_address;
					_v.ownerId = value['ds_owner_ref-ds_personid'];
					_v.ownerName = value['ds_owner_ref-ds_name'];
					_v.ownerPhone = value['ds_owner_ref-ds_phone'];
					_v.ownerIdcard = value['ds_owner_ref-ds_id'];
					_v.ownerAddress = value['ds_owner_ref-ds_address'];
					_v.securId = value['ds_securityowner_ref-ds_personid'];
					_v.securName = value['ds_securityowner_ref-ds_name'];
					_v.securPhone = value['ds_securityowner_ref-ds_phone'];
					_v.securIdcard = value['ds_securityowner_ref-ds_id'];
					_v.securAddress = value['ds_securityowner_ref-ds_address'];

				},
				upDatePublicOrderAddressEvent: function() {
					$('body').append(_t.upDatePublicOrderAddressTemplate(_v.details));
				},
			},
			_t = {
				upDatePublicOrderAddressTemplate: function(value) {
					var html = '';
					html += '<div class="mapBg" id="addPublicAddress" style="background:#fff;">';
					html += '	<div id="header" class="com-bg">';
					html += '		<div class="left-button white-color">';
					html += '			<a>';
					html += '				<img src="/publicorder_wap/libs/img/icon-left.png" style="width: 77%; margin: 9px 10px;">';
					html += '			</a>';
					html += '		</div>';
					html += '		<div class="title white-color fs-big">修改场所信息</div>';
					html += '		<div class="right-button white-color">提交</div>';
					html += '	</div>';
					html += '	<div class="main logistics">';
					html += '		<div class="item gray-border cl">';
					html += '			<div class="key gray-color text-line-set">场所名称</div>';
					html += '			<input type="text" id="publicOrderNameChange" class="value com-color" value="' + (value.ds_name ? value.ds_name : '') + '"/>';
					html += '		</div>';
					html += '		<div class="item gray-border cl">';
					html += '			<div class="key gray-color text-line-set">场所地址</div>';
					html += '			<input type="text" id="publicOrderAddressChange" class="value com-color" value="'+ (value.ds_address ? value.ds_address : '') +'"/>';
					html += '		</div>';
					html += '		<div class="item gray-border cl">';
					html += '			<div class="key gray-color text-line-set">法人代表信息</div>';
					html += '		</div>';
					html += '		<div class="item gray-border cl small">';
					html += '			<div class="key gray-color text-line-set">姓名</div>';
					html += '			<input type="text" id="publiclegalNameChange" class="value com-color"  value="'+ (value['ds_owner_ref-ds_name'] ? value['ds_owner_ref-ds_name'] : '') +'"/>';
					html += '		</div>';
					html += '		<div class="item gray-border cl small">';
					html += '			<div class="key gray-color text-line-set">电话</div>';
					html += '			<input type="text" id="publiclegalPhoneChange" class="value com-color"  value="'+ (value['ds_owner_ref-ds_phone'] ? value['ds_owner_ref-ds_phone'] : '') +'"/>';
					html += '		</div>';
					html += '		<div class="item gray-border cl small">';
					html += '			<div class="key gray-color text-line-set">身份证</div>';
					html += '			<input type="text" id="publiclegalIdcardChange" class="value com-color"  value="'+ (value['ds_owner_ref-ds_id'] ? value['ds_owner_ref-ds_id'] : '') +'"/>';
					html += '		</div>';
					html += '		<div class="item gray-border cl small">';
					html += '			<div class="key gray-color text-line-set">住址</div>';
					html += '			<input type="text" id="publiclegalAddressChange" class="value com-color"  value="'+ (value['ds_owner_ref-ds_address'] ? value['ds_owner_ref-ds_address'] : '') +'"/>';
					html += '		</div>';
					html += '		<div class="item gray-border cl">';
					html += '			<div class="key gray-color text-line-set">治安防卫负责人信息</div>';
					html += '		</div>';
					html += '		<div class="item gray-border cl small">';
					html += '			<div class="key gray-color text-line-set">姓名</div>';
					html += '			<input type="text" id="publicSecurityNameChange" class="value com-color"  value="'+ (value['ds_securityowner_ref-ds_name'] ? value['ds_securityowner_ref-ds_name'] : '') +'"/>';
					html += '		</div>';
					html += '		<div class="item gray-border cl small">';
					html += '			<div class="key gray-color text-line-set">电话</div>';
					html += '			<input type="text" id="publicSecurityPhoneChange" class="value com-color"  value="'+ (value['ds_securityowner_ref-ds_phone'] ? value['ds_securityowner_ref-ds_phone'] : '') +'"/>';
					html += '		</div>';
					html += '		<div class="item gray-border cl small">';
					html += '			<div class="key gray-color text-line-set">身份证</div>';
					html += '			<input type="text" id="publicSecurityIdcardChange" class="value com-color"  value="'+ (value['ds_securityowner_ref-ds_id'] ? value['ds_securityowner_ref-ds_id'] : '') +'"/>';
					html += '		</div>';
					html += '		<div class="item gray-border cl small">';
					html += '			<div class="key gray-color text-line-set">住址</div>';
					html += '			<input type="text" id="publicSecurityAddressChange" class="value com-color"  value="'+ (value['ds_securityowner_ref-ds_address'] ? value['ds_securityowner_ref-ds_address'] : '') +'"/>';
					html += '		</div>';
					html += '	</div>';
					html += '</div>';
					html = $(html);
					html.find('.left-button').click(function() {
						html.remove();
					});
					html.find('.right-button').click(function() {
						var publicName = $('#publicOrderNameChange').val();
						var publicAddress = $('#publicOrderAddressChange').val();
						var legalName = $('#publiclegalNameChange').val();
						var legalPhone = $('#publiclegalPhoneChange').val();
						var legalIdcard = $('#publiclegalIdcardChange').val();
						var legalAddress = $('#publiclegalAddressChange').val();
						var SecurityName = $('#publicSecurityNameChange').val();
						var SecurityPhone = $('#publicSecurityPhoneChange').val();
						var SecurityIdcard = $('#publicSecurityIdcardChange').val();
						var SecurityAddress = $('#publicSecurityAddressChange').val();

						if (!_C.jude.isNull(legalName) && _C.jude.isNull(legalIdcard)) {
							_C.alert({
								className: 'confirmPopup',
								text: '身份证不能修改'
							});
							return;
						};
						if (!_C.jude.isNull(SecurityName) && _C.jude.isNull(SecurityIdcard)) {
							_C.alert({
								className: 'confirmPopup',
								text: '身份证不能修改'
							});
							return;
						};
						var data = {
							attributes: []
						};
						var _Ldata = {
							attributes: []
						};
						var _Sdata = {
							attributes: []
						};
						//行业场所的名字和地址
						if (_C.jude.isNull(publicName)) {
							data.attributes.push({
								"name": "ds_name",
								"value": publicName,
							})
						} else {
							data.attributes.push({
								"name": "ds_name",
								"value": _v.name
							})
						};

						if (_C.jude.isNull(publicAddress)) {
							data.attributes.push({
								"name": "ds_address",
								"value": publicAddress,
							})
						} else {
							data.attributes.push({
								"name": "ds_address",
								"value": _v.address
							})
						};
						//法人信息
						if (_C.jude.isNull(legalName) && _C.jude.isNull(legalIdcard)) {
							if (!_C.jude.isIdCard(legalIdcard)) {
								_C.alert({
									className: 'confirmPopup',
									text: '请填写正确的身份证'
								});
								return;
							};
							_a.checkPeople(legalName, legalIdcard, function(id) {
								if (_v.ownerId == id) {
									data.attributes.push({
										"name": "ds_owner_ref",
										"value": "@look/" + _v.ownerId
									});
									if (_C.jude.isNull(legalName)) {
										_Ldata.attributes.push({
											"name": "ds_name",
											"value": legalName
										})
									} else {
										_Ldata.attributes.push({
											"name": "ds_name",
											"value": _v.ownerName
										})
									};
									if (_C.jude.isNull(legalPhone)) {
										_Ldata.attributes.push({
											"name": "ds_phone",
											"value": legalPhone
										})
									} else {
										_Ldata.attributes.push({
											"name": "ds_phone",
											"value": _v.ownerPhone
										})
									};
									if (_C.jude.isNull(legalAddress)) {
										_Ldata.attributes.push({
											"name": "ds_address",
											"value": legalAddress
										})
									} else {
										_Ldata.attributes.push({
											"name": "ds_address",
											"value": _v.ownerAddress
										})
									};
									updata();
								} else {
									_v.ownerId = id;
									data.attributes.push({
										"name": "ds_owner_ref",
										"value": "@look/" + _v.ownerId
									});
									if (_C.jude.isNull(legalName)) {
										_Ldata.attributes.push({
											"name": "ds_name",
											"value": legalName
										})
									};
									if (_C.jude.isNull(legalPhone)) {
										_Ldata.attributes.push({
											"name": "ds_phone",
											"value": legalPhone
										})
									};
									if (_C.jude.isNull(legalAddress)) {
										_Ldata.attributes.push({
											"name": "ds_address",
											"value": legalAddress
										})
									};
									updata();
								}

							})
						} else if (!_C.jude.isNull(_v.ownerId) && !_C.jude.isNull(legalIdcard)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写姓名和身份证'
							});
							return;
						} else if (!_C.jude.isNull(_v.ownerId) && !_C.jude.isNull(legalName)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写姓名和身份证'
							});
							return;
						} else {
							data.attributes.push({
								"name": "ds_owner_ref",
								"value": "@look/" + _v.ownerId
							});
							if (_C.jude.isNull(legalName)) {
								_Ldata.attributes.push({
									"name": "ds_name",
									"value": legalName
								})
							} else {
								_Ldata.attributes.push({
									"name": "ds_name",
									"value": _v.ownerName
								})
							};
							if (_C.jude.isNull(legalPhone)) {
								_Ldata.attributes.push({
									"name": "ds_phone",
									"value": legalPhone
								})
							} else {
								_Ldata.attributes.push({
									"name": "ds_phone",
									"value": _v.ownerPhone
								})
							};
							if (_C.jude.isNull(legalAddress)) {
								_Ldata.attributes.push({
									"name": "ds_address",
									"value": legalAddress
								})
							} else {
								_Ldata.attributes.push({
									"name": "ds_address",
									"value": _v.ownerAddress
								})
							};
							updata();
						};
						//治安保卫负责人信息
						if (_C.jude.isNull(SecurityName) && _C.jude.isNull(SecurityIdcard)) {
							if (!_C.jude.isIdCard(SecurityIdcard)) {
								_C.alert({
									className: 'confirmPopup',
									text: '请填写正确的身份证'
								});
								return;
							};
							_a.checkPeople(SecurityName, SecurityIdcard, function(id) {
								if (_v.securId == id) {
									data.attributes.push({
										"name": "ds_securityowner_ref",
										"value": "@look/" + _v.securId
									});
									if (_C.jude.isNull(SecurityName)) {
										_Sdata.attributes.push({
											"name": "ds_name",
											"value": SecurityName
										})
									} else {
										_Sdata.attributes.push({
											"name": "ds_name",
											"value": _v.securName
										})
									};
									if (_C.jude.isNull(SecurityPhone)) {
										_Sdata.attributes.push({
											"name": "ds_phone",
											"value": SecurityPhone
										})
									} else {
										_Sdata.attributes.push({
											"name": "ds_phone",
											"value": _v.securPhone
										})
									};
									if (_C.jude.isNull(SecurityAddress)) {
										_Sdata.attributes.push({
											"name": "ds_address",
											"value": SecurityAddress
										})
									} else {
										_Sdata.attributes.push({
											"name": "ds_address",
											"value": _v.securAddress
										})
									};
									updata();
								} else {
									_v.securId = id;
									data.attributes.push({
										"name": "ds_securityowner_ref",
										"value": "@look/" + _v.securId
									});
									if (_C.jude.isNull(SecurityName)) {
										_Sdata.attributes.push({
											"name": "ds_name",
											"value": SecurityName
										})
									};
									if (_C.jude.isNull(SecurityPhone)) {
										_Sdata.attributes.push({
											"name": "ds_phone",
											"value": SecurityPhone
										})
									};
									if (_C.jude.isNull(SecurityAddress)) {
										_Sdata.attributes.push({
											"name": "ds_address",
											"value": SecurityAddress
										})
									};
									updata();
								}
							})
						} else if (!_C.jude.isNull(_v.securId) && !_C.jude.isNull(SecurityIdcard)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写姓名和身份证'
							});
							return;
						} else if (!_C.jude.isNull(_v.securId) && !_C.jude.isNull(securityName)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请填写姓名和身份证'
							});
							return;
						} else {
							data.attributes.push({
								"name": "ds_securityowner_ref",
								"value": "@look/" + _v.securId
							});
							if (_C.jude.isNull(SecurityName)) {
								_Sdata.attributes.push({
									"name": "ds_name",
									"value": SecurityName
								})
							} else {
								_Sdata.attributes.push({
									"name": "ds_name",
									"value": _v.securName
								})
							};
							if (_C.jude.isNull(SecurityPhone)) {
								_Sdata.attributes.push({
									"name": "ds_phone",
									"value": SecurityPhone
								})
							} else {
								_Sdata.attributes.push({
									"name": "ds_phone",
									"value": _v.securPhone
								})
							};
							if (_C.jude.isNull(SecurityAddress)) {
								_Sdata.attributes.push({
									"name": "ds_address",
									"value": SecurityAddress
								})
							} else {
								_Sdata.attributes.push({
									"name": "ds_address",
									"value": _v.securAddress
								})
							};
							updata();
						};

						//调接口
						function updata() {
							_a.upDatePublicOrderAddressAjax(data, function() {

								if (_v.legalid != '') {
									_a.upDataPeopleInfo(_v.ownerId, _Ldata, function() {

									});
								};
								if (_v.securityid != '') {
									_a.upDataPeopleInfo(_v.securId, _Sdata, function() {

									});
								};
								var public = {};
								public.publicMessage = _v.message;
								if (_C.jude.isNull(publicAddress)) {
									public.publicMessage.ds_address = publicAddress;
								};
								_C.storage.set('publicorder_wap', public);
								_C.alert({
									className: 'confirmPopup',
									text: '修改成功',
								}, function() {
									//html.remove();
									location.href = 'http://' + location.host + '/publicorder_wap/page/public_message.html';
								}, function() {
									//html.remove();
									location.href = 'http://' + location.host + '/publicorder_wap/page/public_message.html';
								});
							});
						};

					});
					return html;
				},
			},
			_a = {
				getDetail: function(success) {
					var id = _v.message.id;
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter= name eq 'ds_publicorderid'" +
							"or name eq 'ds_businesskind'" +
							"or name eq 'ds_districtpolicestation_name'" +
							"or name eq 'ds_name'" +
							"or name eq 'ds_address'" +
							"or name eq 'ds_owner_ref-ds_personid'" +
							"or name eq 'ds_owner_ref-ds_name'" +
							"or name eq 'ds_owner_ref-ds_id'" +
							"or name eq 'ds_owner_ref-ds_phone'" +
							"or name eq 'ds_owner_ref-ds_address'" +
							"or name eq 'ds_securityowner_ref-ds_personid'" +
							"or name eq 'ds_securityowner_ref-ds_name'" +
							"or name eq 'ds_securityowner_ref-ds_id'" +
							"or name eq 'ds_securityowner_ref-ds_phone'" +
							"or name eq 'ds_securityowner_ref-ds_phone2'" +
							"or name eq 'ds_securityowner_ref-ds_address'" +
							"or name eq 'ds_latitude'" +
							"or name eq 'ds_longitude'" +
							"or name eq 'ds_address_tree'" +
							"or name eq 'ds_collectperson'" +
							"or name eq 'ds_stub'" +
							"or name eq 'ds_issmall'" +
							"or name eq 'ds_firelevel'" +
							"),lookups&$filter=name eq 'ds_publicorder' and query eq 'ds_publicorderid eq " + id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					});
				},
				upDatePublicOrderAddressAjax: function(data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_publicorder" + _v.message.id + "')",
						data: data,
						success: function(result) {
							success();
						}
					})
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
				upDataPeopleInfo: function(id, data, success) {
					_C.PUT({
						data: data,
						url: "/crm/Entities('ds_person" + id + "')",
						success: function() {
							success();
						},
					});
				},
			};
		return {
			init: _f.init,
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	detail.init();
});