(function($, _C, _W) {
	_W.realnameHotalDetail = (function() {
		var _v = {},
			_f = {
				init: function() {
					_v.id = _C.formatting.UrlValue().id;

					$('#addRealName').click(function() {
						$('.mark').css('display', 'block');
					});
					$('.mark').click(function() {
						$('.mark').css('display', 'none');
					});

					$('#addPeople').click(function() {
						$('body').append(_t.appPeople());
					});

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
									var number = $('#number').val();
									var date = $('#date').val();
									var _staynum = $('#days').val();

									if (!_C.jude.isNull(number)) {
										_C.alert({
											className: 'confirmPopup',
											text: '请填写顾客房间号'
										});
										return;
									};
									if (!_C.jude.isNull(date)) {
										_C.alert({
											className: 'confirmPopup',
											text: '请填写顾客入住时间'
										});
										return;
									};

									if (!_C.jude.isNull(_staynum)) {
										common.alert({
											text: '入住天数不能为空'
										});
										return;
									};
									if (!_C.jude.isInteger(_staynum)) {
										common.alert({
											text: '请输入正确的天数'
										});
										return;
									};

									var personIdArr = [];

									$('#peopleList').find('.small').each(function() {
										personIdArr.push($(this).attr('data-value'));
									});

									if (personIdArr.length == 0) {
										_C.alert({
											className: 'confirmPopup',
											text: '请添加顾客'
										});
										return;
									};


									var data = {
										"attributes": [{
											"name": "ds_date",
											"value": "@dt/" + date + ' 8:00:00'
										}, {
											"name": "ds_roomnum",
											"value": number
										}, {
											"name": "ds_personlist",
											"value": personIdArr.join(';')
										}, {
											"name": "ds_stayday",
											"value": "@wn/" + _staynum
										}]
									};
									_a.updata(_v.id, data, function() {
										_C.alert({
											className: 'confirmPopup',
											text: '修改成功'
										})
									});
								},
							}
						})
					});
					_f.getDetail();
				},
				getDetail: function() {
					_a.get(function(result) {
						$('#number').val(result['ds_roomnum']);
						$('#days').val(result['ds_stayday']);
						$('#date').val(_C.formatting.ExDate('YYYY-MM-DD', result['ds_date']))
						_f.getDate('#dateShow', '#date');
						var personIdArr = result.ds_personlist.split(';');
						var personArr = [];

						function getPeopleDetail(_array, success) {
							var newArray = $.extend(true, [], _array);

							function getItem() {
								var id = newArray.shift();
								_a.getPeopleDetail(id, function(result) {
									personArr.push({
										name: result.ds_name,
										idCard: result.ds_id,
										id: result.id
									});
									if (newArray.length == 0) {
										success();
									} else {
										getItem();
									}
								});
							};
							getItem();
						};
						getPeopleDetail(personIdArr, function() {
							for (var i = 0; i < personArr.length; i++) {
								$('#peopleList').append(_t.peopleItem(personArr[i]));
							}
						});
					});
				},
				setDate: function(elementId, str) {
					elementId.val(_C.formatting.ExDate('YYYY-MM-DD', str));
				},
				getDate: function(putEle, thisEle) {
					$(putEle).val(_C.formatting.ExDate('zh', $(thisEle).val()));
				},
				addPeople: function(html) {
					var name = html.find('.peopleName').val();
					var idCard = html.find('.peopleIdCard').val();
					var phone = html.find('.peoplePhone').val();

					if (!_C.jude.isNull(name)) {
						_C.alert({
							className: 'confirmPopup',
							text: '请填写顾客姓名'
						});
						return;
					};
					if (!_C.jude.isNull(idCard)) {
						_C.alert({
							className: 'confirmPopup',
							text: '请填写顾客身份证号'
						});
						return;
					};
					if (!_C.jude.isIdCard(idCard)) {
						_C.alert({
							className: 'confirmPopup',
							text: '顾客身份证号输入错误'
						});
						return;
					};

					_a.checkPeople(name, idCard, function(result) {
						$('#peopleList').append(_t.peopleItem({
							id: result,
							name: name,
							idCard: idCard,
						}));
						html.remove();
					});
				},
			},
			_t = {
				peopleItem: function(data) {
					var html = '';
					html += '<div class="item gray-border cl small" data-value="' + data.id + '" style="height: auto;">';
					html += '	<div class="key gray-color text-line-set">姓名</div>';
					html += '	<div style="float: right" class="com-color">' + data.name + '</div>';
					html += '	<div style="height: 10px; clear: both;"></div>';
					html += '	<div class="key gray-color text-line-set">身份证号</div>';
					html += '	<div style="float: right" class="com-color">' + data.idCard + '</div>';
					html += '	<div style="height: 10px; clear: both;"></div>';
					html += '	<div class="deletePeople" style="float: right; text-align: center; border-radius: 30px; height: 25px; line-height: 25px; color: #fff; background: red; padding: 0 15px; font-size: 14px;">删除</div>';
					html += '</div>';
					html = $(html);
					html.find('.deletePeople').click(function() {
						var $this = $(this);
						_C.confirm({
							className: 'confirmPopup',
							title: '提示',
							text: '是否删除信息?',
							confirm: {
								text: '确定',
								event: function() {
									$this.parent().remove();
								},
							},
						});
					});
					return html;
				},
				appPeople: function() {
					var html = '';
					html += '<div style="width:100%; height:100%; position:fixed; top:0px; left:0px; z-index:99; background:#fff;" id="addPublicPosition">';
					html += '	<div id="header" class="com-bg">';
					html += '		<div class="left-button white-color">';
					html += '			<a>';
					html += '				<img src="/publicorder_wap/libs/img/icon-left.png" alt="" style="width: 77%; margin: 9px 10px;">';
					html += '			</a>';
					html += '		</div>';
					html += '		<div class="right-button white-color">确定</div>';
					html += '		<div class="title white-color fs-big">添加人员</div>';
					html += '	</div>';
					html += '	<div class="main logistics">';
					html += '		<div class="list white-bg gray-border">';
					html += '			<div class="item gray-border cl">';
					html += '				<div class="key gray-color">姓名 :</div>';
					html += '				<input class="value com-color peopleName"/>';
					html += '			</div>';
					html += '		</div>';
					html += '		<div class="list white-bg gray-border">';
					html += '			<div class="item gray-border cl">';
					html += '				<div class="key gray-color">身份证号 :</div>';
					html += '				<input class="value com-color peopleIdCard"/>';
					html += '			</div>';
					html += '		</div>';
					html += '	</div>';
					html += '	<div class="amap" id="amap"></div>';
					html += '</div>';
					html = $(html);
					html.find('.left-button').click(function() {
						html.remove();
					});
					html.find('.right-button').click(function() {
						_f.addPeople(html);
					});
					return html;
				},
			},
			_a = {
				// 获取酒店实名制详情
				get: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter = name eq 'ds_shimingzhiid'" +
							"or name eq 'ds_person'" +
							"or name eq 'ds_date'" +
							"or name eq 'ds_roomnum'" +
							"or name eq 'ds_stayday'" +
							"or name eq 'ds_personlist'" +
							"),lookups&$filter=name eq 'ds_shimingzhi' and  query eq 'ds_shimingzhiid eq " + _v.id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					});
				},
				// 更新人员信息接口,姓名,电话
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
				// 更新订单接口
				updata: function(id, data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_shimingzhi" + id + "')",
						data: data,
						success: function(result) {
							success();
						}
					});
				},
				getPeopleDetail: function(id, success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter= name eq 'ds_id'  " +
							"or name eq 'ds_name' " +
							")&$filter=name eq 'ds_person' and query eq 'ds_personid eq " + id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					});
				}, // 检查人员接口
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
	realnameHotalDetail.init();
});