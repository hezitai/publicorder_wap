(function($, _C, _W) {
	_W.signin = (function() {
		var _v = {
				message: {},
				year: null,
				month: null,
				map: null,
				marker: null,
				mapTemplate: null,
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;

					_v.year = $('#year');
					_v.month = $('#month');
					_v.template = $('#list');

					$('#searchBtn').click(function() {
						_f.searchSignList();
					});

					_f.initMap();
					var year = parseInt(_C.formatting.ExDate('YYYY'));
					for (var i = year - 2; i < year + 3; i++) {
						_v.year.append('<option value="' + i + '" ' + (i == year ? 'selected="selected"' : '') + '>' + i + '年' + '</option>');
					};

					var month = parseInt(_C.formatting.ExDate('M'));
					for (var i = 1; i < 13; i++) {
						_v.month.append('<option value="' + i + '" ' + (i == month ? 'selected="selected"' : '') + '>' + i + '月' + '</option>');
					};

					_a.chekcInState(function(result) {
						var type = result.ds_ischekcin == 'True';
						$('#signinType').text((type ? '关闭' : '开启') + '签到').attr('data-type', !type).click(function() {
							_f.changeChekcInState($(this));
						});
						_f.searchSignList();
					});
				},
				changeChekcInState: function(element) {
					var type = element.attr('data-type') == 'true';
					_C.confirm({
						title: '标题',
						className: 'confirmPopup',
						text: '是否' + (type ? '开启' : '关闭') + '签到?',
						confirm: {
							event: function() {
								var data = {
									attributes: [{
										name: 'ds_ischekcin',
										value: '@b/' + type.toString(),
									}]
								};
								_a.changeChekcInState(data, function() {
									type = !type;
									element.attr('data-type', type).text((type ? '开启' : '关闭') + '签到');
									_C.alert({
										className: 'confirmPopup',
										text: '签到已' + (!type ? '开启' : '关闭'),
									});
								});
							},
							text: '确定',
						},
					});
				},
				searchSignList: function() {
					_a.getSignList({
						"commonStr": _v.message.id,
						"year": _v.year.val(),
						"month": _v.month.val(),
					}, function(result) {
						_v.template.empty();
						for (var i = 0; i < result.length; i++) {
							_v.template.append(_t.singinPeople(result[i]));
						};
					});
				},
				showPeopleSiginList: function(list) {
					$('body').append(_t.peopleSiginList(list));
				},
				initMap: function() {
					_v.mapTemplate = _t.mapTemplate();
					$('body').append(_v.mapTemplate);
					_v.map = new AMap.Map("amap", {
						resizeEnable: true,
						center: [125.658668, 43.524547],
						zoom: 18,
					});
				}
			},
			_t = {
				singinPeople: function(data) {
					var html = "";
					html += '<div class="item gray-border cl">';
					html += '<div class="key gray-color text-line-set">' + data.personName + '</div>';
					html += '<div class="icon " id="name"></div>';
					html += '</div>';
					html = $(html);
					html.click(function() {
						_f.showPeopleSiginList(data.checkInHistoryModels);
					});
					return html;
				},
				peopleSiginList: function(list) {
					var html = '';
					html += '<div class="mapBg" id="addPublicPosition">';
					html += '	<div id="header" class="com-bg">';
					html += '		<div class="left-button white-color">';
					html += '			<a>';
					html += '				<img src="/publicorder_wap/libs/img/icon-left.png" alt="" style="width: 77%; margin: 9px 10px;">';
					html += '			</a>';
					html += '		</div>';
					html += '		<div class="title white-color fs-big">签到记录</div>';
					html += '	</div>';
					html += '	<div class="main public-details">';
					html += '		<div class="list white-bg gray-border">';
					html += '         	<div class="emptySigin">暂无本月签到记录</div>';
					html += '		</div>';
					html += '	</div>';
					html += '</div>';
					html = $(html);
					html.find('.left-button').click(function() {
						html.remove();
					});
					if(list.length==0){
						html.find('.emptySigin').css('display','block');
					}else{
						html.find('.emptySigin').css('display','none');
						for (var i = 0; i < list.length; i++) {
							html.find('.list').append(_t.singinItem(list[i]));
						};
					};
					
					return html;
				},
				singinItem: function(data) {
					var html = "";
					html += '<div class="item gray-border cl">';
					html += '<div class="key gray-color text-line-set">' + _C.formatting.ExDate('D日 HH:mm', data.checkintime.replace('Z', '')) + '</div>';
					if (data.latitude && data.longitude) {
						html += '<div class="icon " id="name"></div>';
					};
					html += '</div>';
					html = $(html);
					html.click(function() {
						_v.mapTemplate.css('display', 'block');
						if (_v.marker) {
							_v.marker.setMap(null);
							_v.marker = null;
						};
						_v.marker = new AMap.Marker({
							map: _v.map,
							position: [data.longitude, data.latitude]
						});
						_v.map.setFitView();
					});
					return html;
				},
				mapTemplate: function() {
					var html = '';
					html += '<div class="mapBg" id="addPublicPosition" style="display:none; z-index:999999">';
					html += '	<div id="header" class="com-bg">';
					html += '		<div class="left-button white-color">';
					html += '			<a>';
					html += '				<img src="/publicorder_wap/libs/img/icon-left.png" alt="" style="width: 77%; margin: 9px 10px;">';
					html += '			</a>';
					html += '		</div>';
					html += '		<div class="title white-color fs-big">签到地点</div>';
					html += '	</div>';
					html += '	<div class="main public-details">';
					html += '		<div class="amap" id="amap" style="top:0px; bottom:0px;"></div>';
					html += '	</div>';
					html += '</div>';
					html = $(html);
					html.find('.left-button').click(function() {
						html.css('display', 'none');
					});
					return html;
				}
			},
			_a = {
				getSignList: function(data, success) {
					_C.POST({
						url: "/api/Crm/GetEmployeeCheckInHistory",
						data: data,
						success: function(result) {
							if (result.status == 0) {
								success(result.resultObj);
							} else {
								_C.alert({
									text: result.message,
								});
							}
						}
					});
				},
				chekcInState: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter= name eq 'ds_ischekcin' " +
							"),lookups&$filter=name eq 'ds_publicorder' and query eq 'ds_publicorderid eq " + _v.message.id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					});
				},
				changeChekcInState: function(data, success) {
					_C.PUT({
						url: "/crm/Entities('ds_publicorder" + _v.message.id + "')",
						data: data,
						success: function(result) {
							success();
						}
					});
				},
			};
		return {
			init: _f.init,
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	signin.init();
});