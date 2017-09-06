(function () {

    var socket = io();

    var arrA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var arrB = [2, 3, 4, 3, 2, 1];

    drawLine(arrA, arrB, document.getElementById('line'));

    $(document).on('click', '#lineShow', function () {
        $('.main').css('margin-top', '0px');           
        drawLine(arrA, arrB, document.getElementById('line'));
        socket.emit('unSubLineData');
        socket.emit('unSubPieData');
    });

    $(document).on('click', '#dynamicLineShow', function () {
        socket.emit('unSubPieData');

        $('.main').css('margin-top', '-100vh');

        dynamicLine(document.getElementById('dynamicLine'), socket);

    });
    $(document).on('click', '#dynamicPieShow', function () {
        socket.emit('unSubLineData');
        $('.main').css('margin-top', '-200vh');
        
        dynamicPie(document.getElementById('dynamicPie'), socket);

    });

}());