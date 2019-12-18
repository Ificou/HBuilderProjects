$(document).ready(function() {
	var option = {};
	$(".view").click(function(){
		$('#myModal').modal('show');
	});
	$("#dialog_tab div").click(function() {
		$(this).addClass("dialog_tab_selected");
		$(this).siblings().removeClass("dialog_tab_selected");
		// 		$(this).css("background", "#D5010D");
		// 		$(this).siblings().css("background", "none");
	});
	$("#bar_close").click(function(){
		$("#dialog_bar").hide();
	});
	$(".title").click(function(){
		window.location.href = "../../index.html";
	});
	var myChart = echarts.init(document.getElementById("map"));
	// 生成随机数
	function randomData(){
		return Math.round(Math.random()*1000);
	}
	var mydata = [  
                {name: '北京',value: '100' },{name: '天津',value: randomData() },  
                {name: '上海',value: randomData() },{name: '重庆',value: randomData() },  
                {name: '河北',value: randomData() },{name: '河南',value: randomData() },  
                {name: '云南',value: randomData() },{name: '辽宁',value: randomData() },  
                {name: '黑龙江',value: randomData() },{name: '湖南',value: randomData() },  
                {name: '安徽',value: randomData() },{name: '山东',value: randomData() },  
                {name: '新疆',value: randomData() },{name: '江苏',value: randomData() },  
                {name: '浙江',value: randomData() },{name: '江西',value: randomData() },  
                {name: '湖北',value: randomData() },{name: '广西',value: randomData() },  
                {name: '甘肃',value: randomData() },{name: '山西',value: randomData() },  
                {name: '内蒙古',value: randomData() },{name: '陕西',value: randomData() },  
                {name: '吉林',value: randomData() },{name: '福建',value: randomData() },  
                {name: '贵州',value: randomData() },{name: '广东',value: randomData() },  
                {name: '青海',value: randomData() },{name: '西藏',value: randomData() },  
                {name: '四川',value: randomData() },{name: '宁夏',value: randomData() },  
                {name: '海南',value: randomData() },{name: '台湾',value: randomData() },  
                {name: '香港',value: randomData() },{name: '澳门',value: randomData() }  
            ];
	// 配置option
	option = {
		title:{
			text:''
		},
		tooltip:{
			show: false,
			trigger:'item',
			formatter:'{b}<br>浏览量:{c}'
		},
		visualMap:{
			min:0,
			max:2500,
			left:20,
			bottom:10,
			text:['高','低'],
			color:['#FDEACA','#F5EBF3'],
			calculable:false
		},
		
		series:[
			{
				type:'map',
				mapType:'china',
				roam:false,
				label: {
					show: true,
					position: 'inside',
					color: '#D70101',
					fontStyle: 'bold'
				},
				markPoint:{
					
				},
				data:mydata
			}
		]
	}
	// 加载
	myChart.setOption(option);
	myChart.on('click', function(param){
		$("#dialog_bar").show();
		var myChart = echarts.init(document.getElementById("dialog_bar_chart"));
		option = {
			title: {
				x: 'center',
				text: param.name+'分行经营指标柱状图'
			},
			tooltip: {
				trigger: 'item'
			},
			toolbox: {
				show: true,
				feature: {
					dataView: {show: true, readOnly: false},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			calculable: true,
			grid: {
				borderWidth: 0,
				y: 80,
				y2: 60
			},
			xAxis: [
				{
					type: 'category',
					show: true,
					data: ['个人存款', '对公存款', '自营存款', '自营贷款']
				}
			],
			yAxis: [
				{
					type: 'value',
					show: true
				}
			],
			series: [
				{
					name: param.name+'分行经营指标柱状图',
					type: 'bar',
					itemStyle: {
						normal: {
							color: function(params) {
								// build a color map as your need.
								var colorList = [
								'#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
								'#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
								'#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
								];
								return colorList[params.dataIndex]
							},
							label: {
								show: false,
								position: 'top',
								formatter: '{b}\n{c}'
							}
						}
					},
					data: [12,21,10,4]
				}
			]
		};
		myChart.setOption(option);
	});
	$(".dialog_buttom").click(function() {
		if ($(this).find("td").text() == "近期趋势图") {
			$(".dialog_chart").find("td").text("中信银行自营余额趋势图");
			// 指定图表的配置项和数据
			option = {};
			option = {
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [820, 932, 901, 934, 1290, 1330, 1320],
					type: 'line',
					areaStyle: {}
				}]
			};
			$("#dialog_line").css("display", "block");
			$("#dialog_pie").css("display", "none");
			setTimeout(function() {
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('dialog_line'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			}, 500);
		} else {
			$(".dialog_chart").find("td").text("中信银行自营余额百分比占比图");
			option = {};
			// 指定图表的配置项和数据
			option = {
				title: {
					text: '日期：2018/03/05',
					subtext: '单位：亿元',
					x: 'left'
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					left: 'right',
					data: ['个人存款', '对公存款']
				},
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					label: {
						show: true,
						position: 'outside',
						formatter: '{d}%'
					},
					data: [{
							value: 40,
							name: '个人存款',
							itemStyle: {
								color: '#FC6A6A'
							}
						},
						{
							value: 60,
							name: '对公存款',
							itemStyle: {
								color: '#D70101'
							}
						}
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			};
			$("#dialog_line").css("display", "none");
			$("#dialog_pie").css("display", "block");
			setTimeout(function() {
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('dialog_pie'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			}, 500);
		}
	});
});
