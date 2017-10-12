(function($, _C, _W) {
	_W.send = (function() {
		var _v = {},
			_f = {
				init: function() {
					_v.data = {
						"name": "ds_message",
						"attributes": [{
							"name": "ds_isread",
							"value": "@b/false"
						}, {
							"name": "ds_receive_all",
							"value": "@b/false"
						}, {
							"name": "ds_sendid_publicorder",
							"value": "@look/" + permissions.getUserMessage().publicMessage.id
						}, {
							"name": "ds_receiveid_police",
							"value": "@look/" + permissions.getUserMessage().publicMessage.systemuserid
						}]
					};
					$('#btn1').click(function() {
						if (!_C.jude.isNull($("textarea").val())) {
							_C.alert({
								className: 'confirmPopup',
								text: '请输入消息内容',
							});
							return;
						};
						var postData = _v.data;
						var putData = {
							"name": "ds_content",
							"value": $("textarea").val()
						};
						postData.attributes.push(putData);
						var typeData = {
							"name": "ds_message_type",
							"value": "@code/100000004"
						};

						postData.attributes.push(typeData);
						_f.send(postData, function() {
							var setting = {/*HZTchange*/
								className: 'breakdialog',
								title: '提示',
								text: '发送成功',
								confirm: {
									text: '确定',
									event: function() {
										location.reload();
									},
								}
							};
							common.confirm(setting);
						});
					});
					$('#btn2').click(function() {
						var typeData = {
							"name": "ds_message_type",
							"value": "@code/100000005"
						};
						var postData = _v.data;
						postData.attributes.push(typeData);
						_f.send(postData, function() {
							var setting = {/*HZTchange*/
								className: 'breakdialog',
								title: '提示',
								text: '发送成功',
								confirm: {
									text: '确定',
									event: function() {
										location.reload();
									},
								}
							};
							common.confirm(setting);
						});
					});
				},
				send: function(data, success) {
					_C.POST({
						data: data,
						url: "/crm/Entities",
						success: function(result) {
							success(result);
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
	send.init();
});