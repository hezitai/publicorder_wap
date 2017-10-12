(function($, _C, _W) {
	_W.realnameAddinterval = (function() {
		var _v = {
				message: {},
			},
			_f = {
				init: function() {
					_v.message = permissions.getUserMessage().publicMessage;
					$('#addRealName').click(function() {
						var number = $('#number').val().toString();
						var startnum = $('#startNum').val().toString();

						var data = {
							"ds_ordercount": number,
							"ds_orderstart": startnum,
							"ds_publicorder_ref": _v.message.id
						};
						if (!_C.jude.isLogistics(startnum)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请输入正确的单号',
							});
							return;
						};

						if (!_C.jude.isInteger(number)) {
							_C.alert({
								className: 'confirmPopup',
								text: '请输入正确的单号数量',
							});
							return;
						};
						if (number > 200) {
							_C.alert({
								className: 'confirmPopup',
								text: '单号数量不能超过200',
							});
							return;
						};
						_a.createLogisticsSectionInfo(data, function(result) {
							var setting = null;
							if (result.status == 2) {
								setting = {
									className: 'confirmPopup',
									title: '提示',
									text: '创建的单号区间包含已有订单，请勿重复创建',
								};
							} else if (result.status == 1) {
								setting = {
									className: 'confirmPopup',
									title: '提示',
									text: '创建失败，请重试',
								};
							} else if (result.status == 3) {
								setting = {
									className: 'confirmPopup',
									title: '提示',
									text: result.message,
								};
							} else {
								setting = {
									className: 'confirmPopup',
									title: '提示',
									text: '创建成功',
								};
							}
							_C.alert(setting);
						});
					});
				},
			},
			_a = {
				/*添加物流实名制单号区间*/
				createLogisticsSectionInfo: function(data, success) {
					common.POST({
						data: data,
						url: "/api/Crm/CreateOrderArea",
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
$(document).ready(function() {
	realnameAddinterval.init();
});