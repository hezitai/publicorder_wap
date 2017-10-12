(function($, Api, _W) {
	_W.realnameMetal = (function() {
		var _v = {
				message: {},
				template: null,
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					$('#pageItems').css('top', '60px').addClass('message_list');
					_v.template = _t.search();
					$('#pageItems').prepend(_v.template);
					$('#addRealName').css('display', 'block').click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/realname_metal_add.html';
					});
					_f.initPage('');
				},
				initPage: function(str) {
					var option = {
						element: '#pages',
						data: {
							commonStr: str,
							type: 1,
							dateType: _v.template.find('select').val(),
							ds_publicorder: _v.message.id,
							index: '1',
							count: '6'
						},
						totalCountEvent: function(result) {
							var allpage = 1;
							if (result.resultObj.length != 0) {
								allpage = result.resultObj[0].totalCount;
							}
							return allpage;
						},
						ajaxEvent: _a.search,
						success: function(result, hasPaging) {
							var list = result.resultObj;
							$('#listBox').empty();
							if (!hasPaging && list.length == 0) {
								$('#listBox').append('<div class="noMore">未搜索到任何信息</div>');
							} else {
								for (var i = 0; i < list.length; i++) {
									$('#listBox').append(_t.searchResultsList(list[i]));
								};
							};
						}
					};
					Api.wapPaging(option);
				},
			},
			_t = {
				search: function() {
					var html = '';
					html += '<div class="search-box cl">';
					html += '	<input type="text" class="search-input" placeholder="请输入关键字">';
					html += '	<select>';
					html += '		<option value="0" selected="selected">最近3个月</option>';
					html += '		<option value="1">最近1年</option>';
					html += '		<option value="2">全部</option>';
					html += '	</select>';
					html += '	<div class="search-btn" id="searchBtn">搜索</div>';
					html += '</div>';
					html = $(html);
					html.find('#searchBtn').click(function() {
						var searchText = html.find('input').val();
						_f.initPage(searchText);
					});
					return html;
				},
				searchResultsList: function(data) {
					var html = '';
					html += '<div class="list cl logistics-list">';
					html += '	<div class="key gray-color">';
					html += '		<span>姓名 : ' + data.ds_person_name + '</span><br>';
					html += '		<span>物品名称 : </span><span class="com-color">' + data.ds_name + '</span>';
					html += '	</div>';
					html += '	<div class="icon"></div>';
					html += '</div>';
					html = $(html);
					html.click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/realname_metal_details.html?id=' + data.ds_shimingzhiid;
					});
					return html;
				},
			},
			_a = {
				search: function(data, success) {
					Api.POST({
						url: "/api/Crm/SearchForShiMingZhi",
						data: data,
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
			};
		return {
			init: _f.init,
			getDate: _f.getDate,
		};
	})();
})(jQuery, common, window);