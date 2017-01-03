
// Takea base file and copy it.

var baseDir="audio"
var basefile="C-H-p5"  // audio.C-H-p5.mp3
var sourceMp3File = baseDir + "\\" + basefile + ".mp3";

var fs=require('fs');
var _ = require('underscore');
_(500).times(function(n){
  var clonedFilename = baseDir + "\\TT" + basefile + "-" + n + ".mp3";
  console.log("creating: " + clonedFilename);
 fs.createReadStream(sourceMp3File).pipe(fs.createWriteStream(clonedFilename));
})
