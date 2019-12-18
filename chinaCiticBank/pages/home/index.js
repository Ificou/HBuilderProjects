$(document).ready(function() {
	var option = {};
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
					fontStyle: 'bold',
					fontSize: '8'
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
		window.parent.location.href = "../operate/index.html";
	});
	
});
