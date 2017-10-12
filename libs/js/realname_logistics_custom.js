(function($, _C, _W) {
	_W.realnameCustom = (function() {
		var _v = {
				message: {},
				allCount: '0',
				focusCount: 1,
				count: '20',
			},
			_t = {
				pageOption: function(data) {
					var html = '';
					html += '<option value="' + data + '" ' + (data == _v.focusCount ? 'selected="selected"' : '') + '>' + data + '</option>';
					return html;
				},
				initCounts: function() {
					$('#PageButton').remove();
					if (_v.allCount == 1) {
						return;
					} else {
						$('.page').append(_f.paging());
					}
				},
				item: function(data) {
					var className = '';
					if (data.ds_orderstatus.split(":")[0] == '100000000') {
						className = 'red';
					};
					if (data.ds_orderstatus.split(":")[0] == '100000002') {
						className = 'opacity';
					};

					var html = '';
					html += '<div class="order_list ' + className + '">' + data.ds_ordernum + '</div>';
					html = $(html);
					html.click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/realname_logistics_details.html?id=' + data.ds_shimingzhiid;
					});
					return html;
				}
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_f.initPage();
				},
				initPage: function() {
					_a.getList(_v.focusCount, _v.count, _f.pageEnd);
				},
				paging: function() {
					var html = '';
					html += '<div id="PageButton" class="cl">';
					html += '	<div class="prev">上一页</div>';
					html += '	<div class="text">当前第<span><select></select></span>页</div>';
					html += '	<div class="next">下一页</div>';
					html += '</div>';
					html = $(html);

					for (var i = 0; i < parseInt(_v.allCount); i++) {
						html.find('select').append(_t.pageOption(i + 1));
					};
					html.find('select').change(function() {
						_v.focusCount = $(this).find('option:selected').val();
						_a.getList(_v.focusCount, _v.count, _f.pageEnd);
					});
					html.find('.prev').click(function() {
						if (_v.focusCount > 1) {
							_v.focusCount--;
							_a.getList(_v.focusCount, _v.count, _f.pageEnd);
						};
					});
					html.find('.next').click(function() {
						if (_v.focusCount < _v.allCount) {
							_v.focusCount++;
							_a.getList(_v.focusCount, _v.count, _f.pageEnd);
							common.loading.show();
						};
					});
					return html;
				},
				pageEnd: function(result) {
					$('#pageItems').empty();
					for (var i = 0; i < result.length; i++) {
						$('#pageItems').append(_t.item(result[i]));
					};
					_t.initCounts();
				}
			},
			_a = {
				// 获得自定义单号区间接口
				getList: function(index, count, success) {
					_C.POST({
						url: "/api/Crm/GetCustomOrderList",
						data: {
							"commonStr": _v.message.id,
							"index": index,
							"count": count
						},
						success: function(result) {
							var value = result.resultObj;
							if (index == 1 && value.length == 0) {
								_v.allCount = 1;
							} else if (index != 1 && value.length == 0) {
								_v.focusCount -= 1;
								_a.getList(_v.focusCount, count, success);
							} else {
								_v.allCount = Math.ceil(value[0].totalCount / count);
							};
							success(value);
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
	realnameCustom.init();
});