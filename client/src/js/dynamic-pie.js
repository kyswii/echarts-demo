(function () {

    function dynamicPie(element, socket) {     
        var myChart = echarts.init(element);

        $.ajax('/v1beta1/piedata/load', {
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log('result...', typeof result);
                drawPie(JSON.parse(result));
            },
            error: function (err) {
                console.log('err...');
            }
        });

        //
        // var data = [];
        function drawPie(result) {

            var pData = [];
            var cData = [];
            for (var item in result) {
                if (item == 'NUM') {
                    cData.push({
                        name: item,
                        value: result[item]
                    });
                } else {
                    pData.push({
                        name: item,
                        value: result[item],
                    });
                }
            }

            console.log('data....', pData, cData);
       
            var option = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(200,200,200,.3)',
                    textStyle: {
                        color: '#fff',
                    },
                    formatter: "{a} <br/>{b}: {c}",
                },
                series: [
                    {
                        name:'NUM',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],
            
                        label: {
                            normal: {
                                position: 'center',
                                formatter: "{b}: {c}",
                                color: '#fff',
                                fontSize: 14,

                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: cData
                    },
                    {
                        name:'N',
                        type:'pie',
                        radius: ['40%', '55%'],
                        label: {
                            normal: {
                                formatter: '  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: 'rgba(100,100,100,.9)',
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },                                    
                                    b: {
                                        fontSize: 14,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        data: pData
                    }
                ]
            };

            myChart.setOption(option);

            socket.on('updatePieData', function (d) {
                var data = JSON.parse(d);
                console.log('dkdk..', data);
                var data_0 = [];
                var data_1 = [];
                for (var item in data) {
                    if (item == 'NUM') {
                        data_0.push({
                            name: item,
                            value: data[item],
                        })
                    } else {
                        data_1.push({
                            name: item,
                            value: data[item]
                        })
                    }
                }

                myChart.setOption({
                    series: [
                        {
                            data: data_0,
                        },
                        {
                            data: data_1,
                        }
                    ]
                });
            });
            socket.emit('subPieData', 'pie');
        }
        
    }

    window.dynamicPie = dynamicPie;

}());