(function($, Api, _W) {
	_W.regist = (function() {
		var _v = {
			template: {
				body: '',
				pre: '',
				next: '',
				main: '',
				publicManage: false,
				publicMessage: false,
				owner: false,
				security: false,
				map: false,

			},
			address: {
				list: [
					[],
					[],
					[],
					[]
				],
				result: [{
					name: ' - 请选择 - ',
					id: '0',
					index: '0',
				}, {
					name: ' - 请选择 - ',
					id: '0',
					index: '0',
				}, {
					name: ' - 请选择 - ',
					id: '0',
					index: '0',
				}, {
					name: ' - 请选择 - ',
					id: '0',
					index: '0',
				}],
				data: [],
				template: false,
			},
			police: '',
			businesskind: [{
				id: "100000000",
				name: "旅馆业",
				index: 0,
			}, {
				id: "100000010",
				name: "网吧",
				index: 1,
			}, {
				id: "100000013",
				name: "酒吧",
				index: 2,
			}, {
				id: "100000001",
				name: "KTV",
				index: 3,
			}, {
				id: "100000003",
				name: "影剧院",
				index: 4,
			}, {
				id: "100000002",
				name: "废旧物品回收",
				index: 5,
			}, {
				id: "100000011",
				name: "餐饮业",
				index: 6,
			}, {
				id: "100000006",
				name: "金银首饰加工",
				index: 7,
			}, {
				id: "100000004",
				name: "商（市）场",
				index: 8,
			}, {
				id: "100000005",
				name: "汽车修理业",
				index: 9,
			}, {
				id: "100000008",
				name: "典当业",
				index: 10,
			}, {
				id: "100000014",
				name: "养老机构",
				index: 11,
			}, {
				id: "100000015",
				name: "幼儿园",
				index: 12,
			}, {
				id: "100000016",
				name: "中小学",
				index: 13,
			}, {
				id: "100000009",
				name: "手机回收修理",
				index: 14,
			}, {
				id: "100000007",
				name: "开锁",
				index: 15,
			}, {
				id: "100000020",
				name: "刻字刻章",
				index: 16,
			}, {
				id: "100000021",
				name: "其他",
				index: 17,
			}, {
				id: "100000018",
				name: "物流寄递业",
				index: 18,
			}, {
				id: "100000012",
				name: "企事业单位",
				index: 19,
			}, {
				id: "100000017",
				name: "大学",
				index: 20,
			}],
			position: {},
			addressStr: '',
		};
		var _f = {
			init: function() {
				_v.template.body = _t.body();
				_v.template.pre = _v.template.body.find('.left-button');
				_v.template.next = _v.template.body.find('.right-button');
				_v.template.main = _v.template.body.find('.main');
				$('body').append(_v.template.body);
				_a.getPolice(function() {
					_f.initPublicManage();
				});
			},
			initPublicManage: function() {
				if (!_v.template.publicManage) {
					_v.template.publicManage = _t.publicManageChoose();
					_v.template.main.append(_v.template.publicManage);
				} else {
					_v.template.publicManage.css('display', 'block');
				};

				_v.template.pre.unbind().bind('click', function() {
					location.href = 'http://' + location.host + '/publicorder_wap/index.html';
				}).text('返回');

				_v.template.next.unbind().bind('click', function() {
					var addressId = _v.template.publicManage.find('#chooseAddress').val();
					if (addressId == 0) {
						Api.alert({
							className: 'confirmPopup',
							text: '请选择地址树',
						});
						return;
					};
					_v.template.publicManage.css('display', 'none');
					_f.initPublicMessage();
				}).text('下一步');
			},
			initPublicMessage: function() {
				if (!_v.template.publicMessage) {
					_v.template.publicMessage = _t.publicMessage();
					_v.template.main.append(_v.template.publicMessage);
				} else {
					_v.template.publicMessage.css('display', 'block');
				};

				_v.template.pre.unbind().bind('click', function() {
					_f.initPublicManage();
					_v.template.publicMessage.css('display', 'none');
				}).text('上一步');

				_v.template.next.unbind().bind('click', function() {
					_f.checkPublicMessage(function() {
						_v.template.publicMessage.css('display', 'none');
						_f.initOwnerMessage();
					});
				}).text('下一步');
			},
			checkPublicMessage: function(success) {
				var $this = _v.template.publicMessage;
				if (!Api.jude.isNull($this.find('.name').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写场所名称',
					});
					return;
				};
				if (!Api.jude.isNull($this.find('.address').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写场所地址',
					});
					return;
				};
				if (!Api.jude.isNull($this.find('.phone').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写治安防卫负责人联系电话',
					});
					return;
				};
				if (!Api.jude.isPhone($this.find('.phone').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '治安防卫负责人联系电话错误',
					});
					return;
				};
				if (!Api.jude.isNull($this.find('.usedname').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '登录名称不能为空',
					});
					return;
				};
				success();
			},
			initOwnerMessage: function() {
				if (!_v.template.owner) {
					_v.template.owner = _t.owner();
					_v.template.main.append(_v.template.owner);
				} else {
					_v.template.owner.css('display', 'block');
				};

				_v.template.pre.unbind().bind('click', function() {
					_f.initPublicMessage();
					_v.template.owner.css('display', 'none');
				}).text('上一步');

				_v.template.next.unbind().bind('click', function() {
					_f.checkOwner(function() {
						_v.template.owner.css('display', 'none');
						_f.initSecurityMessage();
					});
				}).text('下一步');
			},
			checkOwner: function(success) {
				var $this = _v.template.owner;
				if (!Api.jude.isNull($this.find('.name').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写法人名称',
					});
					return;
				};
				if (!Api.jude.isNull($this.find('.id').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写法人身份证号',
					});
					return;
				};
				if (!Api.jude.isIdCard($this.find('.id').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '法人身份证号错误',
					});
					return;
				};
				if (!Api.jude.isNull($this.find('.phone').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写法人联系电话',
					});
					return;
				};
				if (!Api.jude.isPhone($this.find('.phone').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '法人联系电话错误',
					});
					return;
				};
				if (!Api.jude.isNull($this.find('.address').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写法人地址',
					});
					return;
				};
				success();
			},
			initSecurityMessage: function() {
				if (!_v.template.security) {
					_v.template.security = _t.security();
					_v.template.main.append(_v.template.security);
				} else {
					_v.template.security.css('display', 'block');
				};

				_v.template.pre.unbind().bind('click', function() {
					_f.initOwnerMessage();
					_v.template.security.css('display', 'none');
				}).text('上一步');

				_v.template.next.unbind().bind('click', function() {
					_f.checkSecurity(function() {
						_v.template.security.css('display', 'none');
						_f.initMapMessage();
					});
				}).text('下一步');
			},
			checkSecurity: function(success) {
				var $this = _v.template.security;
				if (!Api.jude.isNull($this.find('.name').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写治安防卫负责人名称',
					});
					return;
				};
				if (!Api.jude.isNull($this.find('.id').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写治安防卫负责人身份证号',
					});
					return;
				};
				if (!Api.jude.isIdCard($this.find('.id').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写治安防卫负责人身份证号',
					});
					return;
				};
				if (!Api.jude.isNull($this.find('.phone').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写治安防卫负责人联系电话',
					});
					return;
				};
				if (!Api.jude.isPhone($this.find('.phone').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '治安防卫负责人联系电话错误',
					});
					return;
				};
				if (!Api.jude.isNull($this.find('.address').val())) {
					Api.alert({
						className: 'confirmPopup',
						text: '请填写治安防卫负责人地址',
					});
					return;
				};
				success();
			},
			initMapMessage: function() {
				if (!_v.template.map) {
					_v.template.map = _t.map();
					_v.template.main.append(_v.template.map);
					_f.initMap();
				} else {
					_v.template.map.css('display', 'block');
				};
				_v.template.pre.unbind().bind('click', function() {
					_f.initSecurityMessage();
					_v.template.map.css('display', 'none');
				}).text('上一步');

				_v.template.next.unbind().text('');
			},
			initMap: function() {
				var marker, map = new AMap.Map("MapContainer", {
					resizeEnable: false,
					center: [125.664676, 43.525465],
					zoom: 14,
				});
				AMap.plugin('AMap.Geocoder', function() {
					var geocoder = new AMap.Geocoder({
						city: "010"
					});
					map.on('click', function(e) {
						if (marker) {
							marker.setMap(null);
							marker = null;
						};
						marker = new AMap.Marker({
							icon: "/publicorder_web/libs/img/mark.png",
							position: [e.lnglat.getLng(), e.lnglat.getLat()]
						});
						marker.setMap(map);
						_v.position.latitude = e.lnglat.getLat().toString();
						_v.position.longitude = e.lnglat.getLng().toString();
						_f.judeAddress();

						/*						
						geocoder.getAddress(e.lnglat, function(status, result) {
							if (status == 'complete') {
								_v.addressStr = result.regeocode.formattedAddress;
								
							}
						});
						*/
					});
				});
			},
			judeAddress: function() {
				var html = _t.judeAddress();
				html = $(html);
				$('body').append(html);
				html.css('display', 'block');
				html.find('.judeAddress-title-close').bind('click', function() {
					html.remove();
				});
				html.find('.bg').bind('click', function() {
					html.remove();
				});

				html.find('.textarea').html('纬度 : ' + _v.position.latitude + ' <br> ' + ' 经度 : ' + _v.position.longitude);

				var slider = new SliderUnlock("#slider", {
					successLabelTip: "验证通过"
				}, function() {
					var sli_width = $("#slider_bg").width();
					endTime = $.now();
					numTime = endTime - startTime;
					endTime = 0;
					startTime = 0;

					function errorPart() {
						$('#labelTip').text('验证失败,请重试').css('color', '#f00');
						setTimeout(function() {
							slider.reset();
							slider.init();
							$('#labelTip').text('拖动滑块验证').css('color', '#787878');
						}, 2000);
					}
					if (numTime < 200) {
						errorPart();
					} else if (numTime > 10000) {
						errorPart();
					} else if (sli_width > 233) {
						errorPart();
					} else if (sli_width < 222) {
						errorPart();
					} else {
						setTimeout(function() {
							_a.CreatPublic(_f.registSuccess);
							html.remove();
						}, 500);
					}
				});
				slider.init();
			},
			registSuccess: function() {
				_v.template.map.css('display', 'none');
				_v.template.main.append(_t.registSuccess());
				_v.template.pre.unbind().bind('click', function() {
					location.href = 'http://' + location.host + '/publicorder_wap/index.html';
				}).text('登录');
				_v.template.next.unbind().text('');
			},
			address: {
				template: function() {
					var html = "";
					html += '<div class="mapBg" id="addPublicAddress" style="background:#fff;">';
					html += '	<div id="header" class="com-bg">';
					html += '		<div class="left-button white-color">';
					html += '			<a>';
					html += '				<img src="/publicorder_wap/libs/img/icon-left.png" alt="" style="width: 77%; margin: 9px 10px;">';
					html += '			</a>';
					html += '		</div>';
					html += '		<div class="title white-color fs-big">选择行政区域</div>';
					html += '		<div class="right-button white-color">搜索</div>';
					html += '	</div>';
					html += '	<div class="searchAddressTree">';
					html += '		<input type="text" placeholder="请输入关键字" />';
					html += '		<div class="searchlist" id="searchlist"></div>';
					html += '		<div id="searchAddressTreeFooter" class="paging forwap" style="padding:0px;"></div>';
					html += '	</div>';
					html += '</div>';
					html = $(html);
					html.find('.left-button').click(function() {
						html.css('display', 'none')
					});
					html.find('.right-button').click(function() {
						var text = html.find('.searchAddressTree input').val();
						if (text.length < 2) {
							Api.alert({
								text: '关键字太短'
							});
							return;
						};
						var option = {
							element: '#searchAddressTreeFooter',
							data: {
								commonStr: text,
								index: '1',
								count: '10'
							},
							totalCountEvent: function(result) {
								var allpage = 1;
								if (!result.resultObj) {
									return allpage;
								};
								if (result.resultObj.length != 0) {
									allpage = result.resultObj[0].totalCount;
								}
								return allpage;
							},
							ajaxEvent: _a.searchAddressTree,
							success: function(result, hasPaging) {

								html.find('.searchAddressTree .searchlist').empty();
								if (result.status == 1) {
									Api.alert({
										className: 'confirmPopup',
										text: '搜索失败,请重试'
									});
								} else if (result.status == 2) {
									Api.alert({
										className: 'confirmPopup',
										text: '搜索失败,请重试'
									});
								} else if (result.status == 0) {
									var list = result.resultObj;
									for (var i = 0; i < list.length; i++) {
										html.find('.searchAddressTree .searchlist').append(_t.chooseAddressItem(list[i]));
									};
								};
							}
						};
						Api.wapPaging(option);

						/*						_v.searchValue.str = text;
												_v.searchValue.index = 1;
												_a.searchAddressTree(_v.searchValue, _e.searchButtonEvent);*/
					});
					return html;
				},
				init: function() {
					_f.address.set();
				},
				format: function(data, toData) {
					for (var i = 0; i < data.length; i++) {
						var _data = {};
						_data.name = data[i].name;
						_data.id = data[i].id;
						_data.index = i;
						toData.push(_data);
					};
				},
				get: function(data) {
					Api.confirm({
						className: 'confirmPopup',
						title: '提示',
						text: '是否选择' + data.ds_name + '?',
						confirm: {
							text: '确定',
							event: function() {
								$('#chooseAddress').empty().append(_t.optionTemplate({
									name: data.ds_name,
									id: data.ds_address_l4id,
									isSelect: true,
								}));
								_v.address.template.css('display', 'none');
							},
						},
						cancel: {
							text: '取消',
						}
					});
				},
				refresh: function() {
					$('.tree4').empty();
					var Tree4 = jQuery.extend(true, [], _v.address.list[3]);
					$('.tree4').append(_t.optionTemplate({
						name: ' - 请选择 - ',
						id: 0,
					}));
					for (var i = 0; i < Tree4.length; i++) {
						var options = Tree4[i];
						$('.tree4').append(_t.optionTemplate(options));
					};
				},
				set: function() {
					/*					var addressData = _v.address.data;
										_f.address.format(addressData, _v.address.list[0]);*/
					if (!_v.address.template) {
						_v.address.template = _f.address.template();
						$('body').append(_v.address.template);
					} else {
						_v.address.template.css('display', 'block');
					};

				},
			},
		};
		var _t = {
			body: function() {
				var html = '';
				html += '<div>';
				html += '	<div id="header" class="com-bg">';
				html += '		<div class="left-button white-color">';
				html += '			<a style="font-size: 14px;"></a>';
				html += '		</div>';
				html += '		<div class="title white-color fs-big">注册</div>';
				html += '		<div class="right-button white-color">';
				html += '			<a id="add" style="font-size: 14px;"></a>';
				html += '		</div>';
				html += '	</div>';
				html += '	<div class="main">';
				html += '	</div>';
				html += '</div>';
				html = $(html);
				return html;
			},
			publicManageChoose: function() {
				var html = '';
				html += '<div>';
				html += '	<h3>请选择您注册场所的类别</h3>';
				html += '	<div class="list white-bg gray-border cl">';
				html += '		<div class="leftBox">';
				html += '			<img src="/publicorder_wap/libs/img/police.png"/>';
				html += '		</div>';
				html += '		<div class="rightBox">';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				html = $(html);

				html.find('.rightBox').append(_t.address());
				html.find('.rightBox').append(_t.police());
				html.find('.rightBox').append(_t.businesskind());

				return html;
			},
			optionTemplate: function(data) {
				var html = "";
				html += '<option value="' + data.id + '" data-index="' + data.index + '" ' + (data.isSelect ? 'select="select"' : '') + '>' + data.name + '</option>';
				return html;
			},
			address: function() {
				var html = '';
				html += '<div class="item gray-border cl" style="width:178px; position:relative;">';
				html += '	<div style="position:absolute; width:100%; height:100%;z-index99; top:0px; left: 0px;"></div>';
				html += '	<div class="icon"></div>';
				html += '	<select name="" class="com-color" id="chooseAddress"></select>';
				html += '</div>';
				html = $(html);
				html.find('select').append(_t.optionTemplate({
					name: ' - 请选择 - ',
					id: '0',
					isSelect: true,
				}));
				html.unbind().bind('click', function() {
					_f.address.init();
				});
				return html;
			},
			police: function() {
				var html = '';
				html += '<div class="item gray-border cl" style="margin-top: 15px; width:178px;">';
				html += '	<div class="icon"></div>';
				html += '	<select name="" class="com-color" id="team"></select>';
				html += '</div>';
				html += '<div class="item gray-border cl" style="margin-top: 15px; width:178px;">';
				html += '	<div class="icon"></div>';
				html += '	<select name="" class="com-color" id="systemuser"></select>';
				html += '</div>';
				html = $(html);
				for (var i = 0; i < _v.police.length; i++) {
					if (i == 0) {
						var isSelect = true;
					} else {
						var isSelect = false;
					};
					html.find('#team').append(_t.optionTemplate({
						id: _v.police[i].id,
						name: _v.police[i].name,
						index: _v.police[i].index,
						isSelect: isSelect
					}));
				};
				for (var i = 0; i < _v.police[0].list.length; i++) {
					if (i == 0) {
						var isSelect = true;
					} else {
						var isSelect = false;
					};
					html.find('#systemuser').append(_t.optionTemplate({
						id: _v.police[0].list[i].id,
						name: _v.police[0].list[i].name,
						index: _v.police[0].list[i].index,
						isSelect: isSelect
					}));
				};
				html.find('#team').unbind().bind('change', function() {
					var $this = $(this);
					var index = $this.find('option:selected').attr('data-index');
					html.find('#systemuser').empty();

					for (var i = 0; i < _v.police[index].list.length; i++) {
						if (i == 0) {
							var isSelect = true;
						} else {
							var isSelect = false;
						};
						html.find('#systemuser').append(_t.optionTemplate({
							id: _v.police[index].list[i].id,
							name: _v.police[index].list[i].name,
							index: _v.police[index].list[i].index,
							isSelect: isSelect
						}));
					};
				});
				return html;
			},
			chooseAddressItem: function(data) {
				var html = '<div class="listItem">' + data.ds_name + '</div>';
				html = $(html);
				html.click(function() {
					_f.address.get(data);
				});
				return html;
			},
			businesskind: function() {
				var html = '';
				html += '<div class="item gray-border cl" style="margin-top: 15px; width:178px;">';
				html += '	<div class="icon"></div>';
				html += '	<select name="" class="com-color" id="businesskind"></select>';
				html += '</div>';
				html = $(html);
				for (var i = 0; i < _v.businesskind.length; i++) {
					if (i == 0) {
						var isSelect = true;
					} else {
						var isSelect = false;
					};
					html.find('#businesskind').append(_t.optionTemplate({
						id: _v.businesskind[i].id,
						name: _v.businesskind[i].name,
						isSelect: isSelect
					}));
				};
				return html;
			},
			publicMessage: function() {
				var html = '';
				html += '<div>';
				html += '	<h3>请填写注册场所的详细信息</h3>';
				html += '	<div class="list white-bg gray-border">';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">单位名称：</div>';
				html += '			<input class="value com-color name" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">单位地址：</div>';
				html += '			<input class="value com-color address" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color" style="line-height: 21px; font-size:14px;">治安防卫负责<br/>人联系电话：</div>';
				html += '			<input class="value com-color phone" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">登录名称</div>';
				html += '			<input class="value com-color usedname" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color" style="width : 90%; margin: 0 auto;line-height: 21px; font-size:13px; color:#FF4040; float:none">注 : 尽量使用单位名称作为登录名称</div>';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				html = $(html);
				/*				setInterval(function() {
									var text = html.find('.name').val();
									text = text.replace(/双阳区/, '').replace(/双阳/g, '').replace(/长春市/g, '').replace(/长春/g, '').replace(/吉林省/g, '').replace(/吉林/g, '');
									html.find('.usedname').val(text);
								}, 500);*/
				return html;
			},
			owner: function() {
				var html = '';
				html += '<div>';
				html += '	<h3>请填写您注册场所的法人信息</h3>';
				html += '	<div class="list white-bg gray-border">';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">姓名：</div>';
				html += '			<input class="value com-color name" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">身份证号：</div>';
				html += '			<input class="value com-color id" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">联系电话：</div>';
				html += '			<input class="value com-color phone" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">家庭住址：</div>';
				html += '			<input class="value com-color address" type="text" />';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				html = $(html);
				return html;
			},
			security: function() {
				var html = '';
				html += '<div>';
				html += '	<h3>请填写您注册场所的治安保卫负责人信息</h3>';
				html += '	<div class="list white-bg gray-border">';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">姓名</div>';
				html += '			<input class="value com-color name" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">身份证号</div>';
				html += '			<input class="value com-color id" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">联系电话</div>';
				html += '			<input class="value com-color phone" type="text" />';
				html += '		</div>';
				html += '		<div class="item gray-border cl" style="border-bottom: 1px solid #DDDDDD;padding: 5px 0;">';
				html += '			<div class="key gray-color">家庭住址</div>';
				html += '			<input class="value com-color address" type="text" />';
				html += '		</div>';
				html += '	</div>';
				html += '</div>';
				html = $(html);
				return html;
			},
			map: function() {
				var html = '';
				html += '<div>';
				html += '	<h3>请在地图中选取场所的详细地址</h3>';
				html += '	<div class="map" id="MapContainer" style="width: 100%; height: 350px"></div>';
				html += '</div>';
				html = $(html);
				return html;
			},
			judeAddress: function() {
				var html = '';
				html += '<div id="judeAddress">';
				html += '<div class="bg"></div>';
				html += '<div class="judeAddress-main">';
				html += '<div class="judeAddress-title cl">';
				html += '<div class="judeAddress-title-text">确认地址</div>';
				html += '<div class="judeAddress-title-close">X</div>';
				html += '</div>';
				html += '<div class="judeAddress-body">';
				html += '<div class="textarea"></div>';
				html += '<div id="slider" style="width: 280px;">';
				html += '<div id="slider_bg"></div>';
				html += '<span id="label">>></span> <span id="labelTip">拖动滑块验证</span>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				return html;
			},
			registSuccess: function() {
				html = '';
				html += '<div id="step5">';
				html += '	<div class="list white-bg gray-border">';
				html += '		<img src="/publicorder_wap/libs/img/police.png"/>';
				html += '		<div class="item gray-border cl" style="margin-top: 30px;">';
				html += '			<span>注册成功 ! </span>';
				html += '		</div>';
				html += '		<div class="item gray-border cl item1" >';
				html += '			<div class="userName">';
				html += '				<span class="key gray-color">用户名：</span><span class="value com-color" id="userNamePut">' + _v.template.publicMessage.find('.usedname').val() + '</span>';
				html += '			</div>';
				html += '			<div class="PassWord">';
				html += '				<span class="key gray-color">密&nbsp;&nbsp;&nbsp;&nbsp;码：</span><span class="value com-color" id="PassWordPut">888888</span>';
				html += '			</div>	';
				html += '		</div>';
				html += '	</div>';
				html += '</div> ';
				html = $(html);
				return html;
			},
		};
		_a = {
			getAddressTree: function(success) {
				Api.POST({
					url: '/api/Crm/GetAddressInfoAndVersion',
					success: function(result) {
						if (result.status == 0) {
							_v.address.data = result.resultObj.address1Models;
							success();
						} else {
							Api.alert({
								className: 'confirmPopup',
								text: '获取地址树信息失败\n请检查网络',
							});
						}
					},
				});
			},
			getLastAddressTree: function(id, success) {
				Api.GET({
					url: "/crm/Entities?$expand=attributes($filter=name eq 'ds_name' or name eq 'ds_address_l4id'),lookups&$filter=name eq 'ds_address_l4' and query eq 'ds_l3_ref eq " + id + "'",
					success: function(result) {
						var resultValue = Api.formatting.CRMList(result.value);
						var value = [];
						for (var i = 0; i < resultValue.length; i++) {
							var data = {};
							data.name = resultValue[i]['ds_name'];
							data.id = resultValue[i]['ds_address_l4id'];
							value.push(data);
						};
						success(value);
					}
				});
			},
			getPolice: function(success) {
				Api.POST({
					url: "/api/Crm/GetAllPolice",
					success: function(result) {
						if (result.status != 0) {
							Api.alert({
								className: 'confirmPopup',
								text: result.message
							});
							return;
						};
						// 格式化警员列表
						var data = result.resultObj;
						var police = [];
						for (var i = 0; i < data.length; i++) {
							if (police.length == 0) {
								police.push({
									name: data[i].teamName,
									id: data[i].teamId,
									list: [],
								})
							} else {
								var isChecked = false;
								for (var d = 0; d < police.length; d++) {
									if (police[d].name == data[i].teamName) {
										isChecked = true;
									};
								};
								if (!isChecked) {
									police.push({
										name: data[i].teamName,
										id: data[i].teamId,
										list: [],
									})
								}
							}
						};
						for (var i = 0; i < data.length; i++) {
							for (var d = 0; d < police.length; d++) {
								if (data[i].teamName == police[d].name) {
									police[d].list.push({
										name: data[i].name,
										id: data[i].policeCrmId
									});
								}
							}
						};

						for (var i = 0; i < police.length; i++) {
							police[i].index = i;
							for (var d = 0; d < police[i].list.length; d++) {
								police[i].list[d].index = i;
							}
						};


						_v.police = police;
						success();
					}
				});
			},
			CreatPublic: function(success) {
				var message = _v.template.publicMessage;
				var manage = _v.template.publicManage;
				var owner = _v.template.owner;
				var security = _v.template.security;
				var data = {
					"userName": message.find('.usedname').val(),
					"ds_latitude": _v.position.latitude,
					"ds_longitude": _v.position.longitude,
					"ds_address_tree": manage.find('#chooseAddress').val(),
					"ds_collectperson": manage.find('#systemuser').val(),
					"ds_charger": manage.find('#systemuser').val(),
					"teamId": manage.find('#team').val(),
					"ds_businesskind": manage.find('#businesskind').val(),
					"ds_districtpolicestation_name": manage.find('#team option:selected').text(),
					"ds_name": message.find('.name').val(),
					"ds_address": message.find('.address').val(),
					"ds_owner_ref_ds_name": owner.find('.name').val(),
					"ds_owner_ref_ds_id": owner.find('.id').val(),
					"ds_owner_ref_ds_phone": owner.find('.phone').val(),
					"ds_owner_ref_ds_address": owner.find('.address').val(),
					"ds_securityowner_ref_ds_name": security.find('.name').val(),
					"ds_securityowner_ref_ds_id": security.find('.id').val(),
					"ds_securityowner_ref_ds_phone": security.find('.phone').val(),
					"ds_owner_ref_ds_phone2": message.find('.phone').val(),
					"ds_securityowner_ref_ds_address": security.find('.address').val(),
				};
				Api.POST({
					url: "/api/Crm/PlaceRegist",
					data: data,
					success: function(result) {
						if (result.status == 0) {
							success(result.resultObj)
						} else {
							Api.alert({
								className: 'confirmPopup',
								text: result.message,
							});
						}
					}
				});
			},
			searchAddressTree: function(data, success) {
				Api.POST({
					url: '/api/Crm/SearchAddress',
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
			}
		};
		return {
			init: _f.init,
			v: _v
		};
	})();
})(jQuery, common, window);
$(document).ready(function() {
	regist.init();
});