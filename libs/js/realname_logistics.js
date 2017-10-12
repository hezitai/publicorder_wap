(function($, Api, _W) {
	_W.realnameLogistics = (function() {
		var _v = {
				message: {},
			},
			_f = {
				init: function() {
					$('#addRealName').click(function() {
						$('.mark').css('display', 'block');
					});
					$('.mark').click(function() {
						$('.mark').css('display', 'none');
					});
					_v.message = permissions.getUserMessage().publicMessage;
					$('#pageItems').prepend(_t.search());
					var option = {
						element: '#pages',
						data: {
							count: '6',
							index: '1',
						},
						totalCountEvent: function(result) {
							var allpage = 1;
							if (result.value.length != 0) {
								allpage = result.value[0].totalCount;
							}
							return allpage;
						},
						ajaxEvent: _a.getlist,
						success: function(result, hasPaging) {
							var list = Api.formatting.CRMList(result.value);
							$('#listBox').empty();
							for (var i = 0; i < list.length; i++) {
								$('#listBox').append(_t.list(list[i]));
							};
							if (hasPaging) {
								_f.ListElementShowPaging();
							} else {
								_f.ListElementHidePaging();
							}
						}
					};
					Api.wapPaging(option);
				},
				ListElementShowPaging: function() {
					$('#listBox').css('bottom', '50px');
				},
				ListElementHidePaging: function() {
					$('#listBox').css('bottom', '0px');
				}
			},
			_t = {
				search: function() {
					var html = '';
					html += '<div class="search-box cl">';
					html += '	<input type="text" class="search-input" placeholder="请输入单号">';
					html += '	<select style="-webkit-appearance: none; padding-left: 5px;">';
					html += '		<option value="0" selected="selected">最近3个月</option>';
					html += '		<option value="1">最近1年</option>';
					html += '		<option value="2">全部</option>';
					html += '	</select>';
					html += '	<div class="search-btn" id="searchBtn">搜索</div>';
					html += '</div>';
					html = $(html);
					html.find('#searchBtn').click(function() {
						var searchText = html.find('input').val();
						// if (Api.jude.isNull(searchText)) {
							var template = _t.searchResults();
							$('body').append(template);
							var option = {
								element: '#searchPaging',
								data: {
									commonStr: searchText,
									type: 0,
									dateType: html.find('select').val(),
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
									template.find('.main').empty();
									if (!hasPaging && list.length == 0) {
										template.append('<div class="noMore">未搜索到任何信息</div>');
									} else {
										for (var i = 0; i < list.length; i++) {
											template.find('.main').append(_t.searchResultsList(list[i]));
										};
									};
								}
							};
							Api.wapPaging(option);
						// } else {
						// 	Api.alert({
						// 		className: 'confirmPopup',
						// 		text: '请输入搜索关键字'
						// 	})
						// };
					});
					return html;
				},
				searchResults: function() {
					var html = '';
					html += '<div id="searchResults">';
					html += '	<div id="header" class="com-bg">';
					html += '		<div class="left-button white-color">';
					html += '			<a id="closeSearchResults">';
					html += '				<img src="/publicorder_wap/libs/img/icon-left.png" alt="" style="width: 77%; margin: 9px 10px;">';
					html += '			</a>';
					html += '		</div>';
					html += '		<div class="title white-color fs-big">搜索结果</div>';
					html += '	</div>';
					html += '	<div class="main"></div>';
					html += '	<div id="searchPaging" class="paging forwap"></div>';
					html += '</div>';
					html = $(html);
					html.find('#closeSearchResults').click(function() {
						html.remove();
					});
					return html;
				},
				list: function(data) {
					var html = '';
					html += '<div class="list cl logistics-list">';
					html += '	<div class="key gray-color"><span>单号区间 : </span><span class="com-color">' + data.ds_orderstart + '</span> - <span class="com-color">' + data.ds_orderend + '</span></div>';
					html += '	<div class="key gray-color"><span>剩余单数 : </span><span class="com-color">' + data.ds_unusednum + '</span></div>';
					html += '	<div class="icon"></div>';
					html += '</div>';
					html = $(html);
					html.click(function() {
						if (data.ds_unusednum == 0) {
							Api.alert({
								className: 'confirmPopup',
								text: '全部单号已用完'
							})
						} else {
							location.href = 'http://' + location.host + '/publicorder_wap/page/realname_logistics_list.html?id=' + data.id;
						}
					});
					return html;
				},
				searchResultsList: function(data) {
					var html = '';
					html += '<div class="list cl logistics-list">';
					html += '	<div class="key gray-color">';
					html += '		<span>物品名称 : ' + data.ds_name + '</span><br>';
					html += '		<span>订单编号 : </span><span class="com-color">' + data.ds_ordernum + '</span>';
					html += '	</div>';
					html += '	<div class="icon"></div>';
					html += '</div>';
					html = $(html);
					html.click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/realname_logistics_details.html?id=' + data.ds_shimingzhiid;
					});
					return html;
				},
			},
			_a = {
				// 获取单号区间列表,带分页
				getlist: function(data, success) {
					Api.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_orderstart' " +
							"or name eq 'ds_orderend' " +
							"or name eq 'ds_logisticsorderareaId' " +
							"or name eq 'ds_ordercount' " +
							"or name eq 'ds_unusednum' " +
							"),lookups&$filter=name eq 'ds_logisticsorderarea' and  query eq 'ds_publicorder_ref eq " + _v.message.id + "'" +
							" and page eq " + data.index + " and count eq " + data.count + " and orderby eq 'createdon/desc'",
						success: function(result) {
							success(result);
						}
					});
				},
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
		};
	})();
})(jQuery, common, window);