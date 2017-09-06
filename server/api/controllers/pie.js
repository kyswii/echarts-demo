'use strict';

const wrap = require("co-express");
var fs = require('fs');
var path = require('path');

module.exports.fetchPieData = wrap(function* (req, res) {
    try {
        var file = path.resolve(__dirname, '../../file/') + '/file-1.txt';
        var str = fs.readFileSync(file, 'utf-8');
        
        var arr = str.split(',');
        var data = {};
        arr.forEach(function (d, i) {
            var item = d.split(':');
            data[item[0]] = item[1];
        });
        console.log('str..', data);
        res.json(JSON.stringify(data));
    } catch (err) {
        res.json(err);
    }
});