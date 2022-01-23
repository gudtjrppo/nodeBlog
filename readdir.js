var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
    for(var i = 0; i < filelist.length; i++){
        console.log(filelist[i]);
    }
});