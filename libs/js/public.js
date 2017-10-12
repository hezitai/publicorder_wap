(function($, _C, _W) {
	_W.public = (function() {
		var _v = {
				message: {},
				detail: {},
				stubId: null,
				stubType: 'document',
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					_a.getDetail(_f.initPage);
					$('.mark').click(function() {
						$('.mark').css('display', 'none');
					});

					$('#publicDocument').click(function() {
						_v.stubId = _v.detail.ds_stub;
						$('.mark').css('display', 'block');
					});

					$('#fireDocument').click(function() {
						_v.stubId = _v.detail.ds_firestub;
						$('.mark').css('display', 'block');
					});

					$('#lookDocument').click(function() {
						if (_v.stubId) {
							_a.getDocumentViewStubUrl(_v.stubId, function(result) {
								$('.mark').css('display', 'none');
								location.href = result;
							});
						};
					});

					$('#download').click(function() {
						_C.alert({
							className: 'confirmPopup',
							text: '请在PC端进行操作',
						});
						$('.mark').css('display', 'none');
					});

					$('#download1').click(function() {
						_C.alert({
							className: 'confirmPopup',
							text: '请在PC端进行操作',
						});
						$('.mark').css('display', 'none');
					});

					$('#upData').click(function() {
						_C.alert({
							className: 'confirmPopup',
							text: '请在PC端进行操作',
						});
						$('.mark').css('display', 'none');
					});

				},
				initPage: function(value) {
					_v.detail = value;
					var type = value.ds_businesskind.split(":")[0];
					switch (type) {
						case "100000017": // 大学
							$('#documentName').text('党政机关、企业、事业单位安全保卫工作档案');
							$('#publicMessage').css('display', 'block');
							$('#student').css('display', 'block');
							$('#danger').css('display', 'block');
							break;
						case "100000012": // 企事业单位
							$('#documentName').text('党政机关、企业、事业单位安全保卫工作档案');
							$('#publicMessage').css('display', 'block');
							$('#danger').css('display', 'block');
							break;
						case "100000018": // 物流寄递业
							$('#documentName').text('物流寄递行业治安管理档案');
							$('#publicMessage').css('display', 'block');
							$('#danger').css('display', 'block');
							$('#people').css('display', 'block');
							$('#signin').css('display', 'block');
							$('#fireDocument').css('display', 'block');
							break;
						default:
							$('#documentName').text('行业场所治安管理档案');
							$('#publicMessage').css('display', 'block');
							$('#danger').css('display', 'block');
							$('#people').css('display', 'block');
							$('#signin').css('display', 'block');
							$('#fireDocument').css('display', 'block');
					}
				},
			},
			_a = {
				getDetail: function(success) {
					var id = _v.message.id;
					_C.GET({
						url: "/crm/Entities?$expand=attributes(" +
							"$filter = name eq 'ds_publicorderid'" +
							"or name eq 'ds_businesskind'" +
							"or name eq 'ds_stub'" +
							"or name eq 'ds_firestub'" +
							")&$filter=name eq 'ds_publicorder'" +
							"and query eq 'ds_publicorderid eq " + id + "'",
						success: function(result) {
							var value = _C.formatting.CRMValue(result.value);
							success(value);
						}
					});
				},
				getDocumentViewStubUrl: function(id, success) {
					_C.POST({
						url: "/api/Place/ViewStub",
						data: {
							"id": id
						},
						success: function(result) {
							if (result.status == 0) {
								success(result.resultObj.fileTempPath);
							} else {
								_C.alert({
									className: 'confirmPopup',
									text: '文档未上传',
								});
							}
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
	public.init();
});