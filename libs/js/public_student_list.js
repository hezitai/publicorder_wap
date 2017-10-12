(function($, _C, _W) {
	_W.index = (function() {
		var _v = {
				message: {},
				floor : '',
				dormitory:'',
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_v.floor = _C.formatting.UrlValue().floor;
					_v.dormitory = _C.formatting.UrlValue().dormitory;
					
					_a.get(function(result) {
						for (var i = 0; i < result.length; i++) {
							$('#list').append(_t.item(result[i]));
						}
					});
					
					$("#addManage").click(function(){
						$(".mark").show();
					});
					$(".cancel").click(function(){
						$(".mark").hide();
					});
					
					//返回
					$('#back').click(function(){
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_dormitory.html?floor=' + _v.floor;
					}); 
					
					//把寝室的Id传给下一个页面
					$('#addpeople').click(function(){
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_list_add.html?floor=' + _v.floor + '&dormitory=' + _v.dormitory + '&id=' + _v.id;
					});
//					$('#editorDormitoryDetail').click(function(){
//						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_dormitory_detail.html?dormitory=' + _v.dormitory + '&floor=' + _v.floor ;
//					}); 
					$('#delete').click(function(){
						_a.deletePeople(_v.dormitory,function(){});
					})
					
				},
			},
			_t = {
				item: function(data) {
					var html = "";
					html += '<div class="item gray-border cl">';
					html += '<div class="key gray-color text-line-set">' + data['ds_person_ref-ds_name'] + '</div>';
					html += '<div class="icon" id="name"></div>';
					html += '</div>';
					html = $(html);
					html.click(function() {
						location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_list_detail.html?floor=' + _v.floor + '&dormitory=' + _v.dormitory + '&id=' +data['ds_person_ref-ds_personid'] + ' &student=' + data.id;
					});
					return html;
				}
				
				
				
			},
			_a = {
				get: function(success) {
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter=name eq 'ds_person_ref-ds_name'" +
							"or name eq 'ds_person_ref-ds_personid'" +
							"),lookups&$filter=name eq 'ds_residentsassociation' and query eq 'ds_realhouse_ref eq " + _v.dormitory + "'",
						success: function(result) {
							var value = _C.formatting.CRMList(result.value);
							
							success(value);
						}
					});
				},
				//删除
				deletePeople: function(data, success) {
					_C.DELETE({
						url: "/crm/Entities('ds_realhouse" + data + "')",
						success: function(result) {
							success();
							common.alert({
								className: 'confirmPopup',
								text: '删除成功！'
							},function(){
								location.href = 'http://' + location.host + '/publicorder_wap/page/public_student_dormitory.html?floor=' + _v.floor;
							});
							_f.init();
						}
					})
				},
				
				
			};
		return {
			init: _f.init,
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	index.init();
});

