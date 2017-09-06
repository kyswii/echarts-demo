(function () {

    function drawLine(arrA, arrB, element) {
        var myChart = echarts.init(element);

        var xData = [];
        var arr_0 = [];
        var arr_1 = [];
        var arr_2 = [];
        var label_max = 'A';
        var label_min = 'B';

        var minLen = arrA.length > arrB.length ? arrB.length : arrA.length;
        for (var i = 0; i < minLen; i ++) {
            arr_1.push('-');
        }

        var maxLen = arrA.length > arrB.length ? arrA.length : arrB.length;
        for (var i = 0; i < maxLen; i++) {
            xData.push('l-' + i);
        }

        if (arrA.length >= arrB.length) {
            arr_0 = arrA.slice(0, arrB.length);
            arr_1[minLen - 1] = arrA[minLen-1];
            arr_1 = arr_1.concat(arrA.slice(arrB.length));
            arr_2 = arrB;
        } else {
            arr_0 = arrB.slice(0, arrA.length);
            arr_1[minLen - 1] = arrB[minLen-1];
            arr_1 = arr_1.concat(arrB.slice(arrA.length));
            arr_2 = arrA;
            label_max = 'B';
            label_min = 'A';
        }

        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer : {
                    type : 'line'  
                },
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

                    var html = params[0].name + '<br/>';
                    for (var item in tar) {                        
                        html +=  tar[item].seriesName + ' : ' + tar[item].value + '<br/>';                     
                    }

                    return html;
                }
            },
            legend: {
                data:['A','B'],
                textStyle: {
                    color: '#fff',
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xData,
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                }
            },
            series: [
                {
                    name: label_max,
                    type: 'line',
                    stack: '0',
                    data: arr_0
                },
                {
                    name: label_max,
                    type: 'line',
                    stack: '1',
                    data: arr_1,
                    lineStyle: {
                        normal: {
                            type: 'dotted'
                        }
                    }
                },
                {
                    name: label_min,
                    type: 'line',
                    stack: '2',
                    data: arr_2
                },
                
            ]
        };

        myChart.setOption(option);
    }

    window.drawLine = drawLine;

}());