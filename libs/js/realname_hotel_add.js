(function($, _C, _W) {
	_W.realnameHotelAdd = (function() {
		var _v = {
				message: {},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					$('#addPeople').click(function() {
						$('body').append(_t.appPeople());
					});

					$('#date').val(_C.formatting.ExDate('-'));
					_f.getDate('#dateShow', '#date');

					$('#addRealName').click(function() {

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
							"name": "ds_shimingzhi",
							"attributes": [{
								"name": "ds_date",
								"value": "@dt/" + date + ' 8:00:00'
							}, {
								"name": "ds_publicorder",
								"value": "@look/" + _v.message.id
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
						_a.add(data, function() {
							_C.alert({
								className: 'confirmPopup',
								text: '创建成功'
							}, function() {
								location.href = 'http://' + location.host + '/publicorder_wap/page/realname.html';
							}, function() {
								location.href = 'http://' + location.host + '/publicorder_wap/page/realname.html';
							})
						});
					});
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
			_a = {
				// 创建酒店实名人员
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
				}
			},
			_t = {
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