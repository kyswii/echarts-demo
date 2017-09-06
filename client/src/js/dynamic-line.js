(function () {

    function dynamicLine(element, socket) {
        
        var data_0 = [];
        var data_1 = [];
        var now = (new Date()).getTime();
        var oneDay = 24 * 3600 * 1000;

        for (var i = 0; i < 1000; i++) {            
            now = new Date(now + oneDay);
            data_0.push({
                name: now.toString(),
                value: [
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), 
                    '-'
                ],
            });
            data_1.push({
                name: now.toString(),
                value: [
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), 
                    '-'
                ],
            });            
        }
        
        var myChart = echarts.init(element);

        var option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(200,200,200,.3)',
                textStyle: {
                    color: '#fff',
                },
                formatter: function (params) {

                    var tar = { };
                    
                    params.forEach(function (d, i) {
                        if (d.value != '-') {
                            tar[d.seriesName] = d;
                        }
                    });

                    var date = new Date(params[0].name);
                    var html =  date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '<br/>';
                    for (var item in tar) {                        
                        html +=  tar[item].seriesName + ' : ' + tar[item].value[1] + '<br/>';                     
                    }

                    return html;

                },
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data:['A','B'],
                textStyle: {
                    color: '#fff',
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                }
            },
            series: [
                {
                    name: 'A',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: data_0
                },
                {
                    name: 'B',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: data_1
                }
            ]
        };

        myChart.setOption(option);
        
        var index = 0;     
        socket.on('updateLineData', function (d) {
            
            if (index >= 60) {
                data_0[index] = {};
                data_1[index] = {};
            }
    
            d = JSON.parse(d);
            var time = new Date(d.time);

            data_0[index].name = time.toString();
            data_0[index].value = [
                [time.getFullYear(), time.getMonth() + 1, time.getDate()].join('/'),
                d.A
            ];

            data_1[index].name = time.toString();
            data_1[index].value = [
                [time.getFullYear(), time.getMonth() + 1, time.getDate()].join('/'),
                d.B
            ];
    
            myChart.setOption({
                series: [
                    {
                        data: data_0
                    },
                    {
                        data: data_1
                    }
                ]
            });
    
            index++;
        });

        socket.emit('subLineData', 'line');   
    }

    
    window.dynamicLine = dynamicLine;
}());