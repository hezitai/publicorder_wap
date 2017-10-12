(function($, _C, _W) {
	_W.message = (function() {
		var _v = {
				public: {},
				allCount: '0',
				focusCount: 1,
				count: '10',
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
					var html = '';
					html += '<div class="message gray-border cl ' + (data.ds_isread == 'True' ? 'old' : 'new') + '">';
					html += '	<div class="icon"></div>';
					html += '	<div class="content">';
					html += '		<div class="date">' + data.createdon + '</div>';
					html += '		<div class="text">' + data.ds_content + '</div>';
					html += '		<div class="delete"></div>';
					html += '</div>';
					html = $(html);

					html.bind('click', function() {
						_a.changeIsread(data.id,html);
						common.alert({
							className: 'qwe',
							text: data.ds_content,
							title: '详细信息'
						});
					});

					html.find('.delete').bind('click', function(e) {
						e.stopPropagation();
						_C.confirm({
							className: 'confirmPopup',
							text: '是否确定删除信息？',
							confirm: {
								text: '确定',
								event: function() {
									_a.deleteMessage(data.id, function() {
										_C.alert({
											className: 'confirmPopup',
											text: '删除成功'
										}, _f.initPage, _f.initPage);
									});
								},
							},
						});
					});

					return html;
				}
			},
			_f = {
				init: function() {
					_v.public = permissions.getUserMessage().publicMessage;
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
				getList: function(index, count, success) {
					var id = _v.public.id;
					_C.GET({
						url: "/crm/Entities?$expand=attributes($filter=name eq 'createdon' or name eq 'ds_content' or name eq 'ds_isread' or name eq 'ds_message_type' or name eq 'ds_messageid' or name eq 'ds_name'),lookups&$filter=name eq 'ds_message' and  query eq '{{{ds_message_type eq @code/100000001} or {ds_message_type eq @code/100000002}} and {ds_receiveid_publicorder eq " + id + "}}' and page eq " + index + " and count eq " + count + " and orderby eq 'createdon/desc'",
						success: function(result) {
							var value = _C.formatting.CRMList(result.value);
							if (index == 1 && value.length == 0) {
								_v.allCount = 1;
							} else if (index != 1 && value.length == 0) {
								_v.focusCount -= 1;
								_a.getList(_v.focusCount, count, success);
							} else {
								_v.allCount = Math.ceil(result.value[0].totalCount / count);
							};
							success(value);
						},
					})
				},
				deleteMessage: function(id, success) {
					_C.DELETE({
						url: "/crm/Entities('ds_message" + id + "')",
						success: function() {
							success();
						}
					});
				},
				changeIsread: function(id,element) {
					_C.PUT({
						url: "/crm/Entities('ds_message" + id + "')",
						data: {
							"attributes": [{
								"name": "ds_isread",
								"value": "@b/True"
							}]
						},
						success: function(data) {
							element.removeClass('new').addClass('old');
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
	message.init();
});