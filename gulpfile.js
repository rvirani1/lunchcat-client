var gulp = require('gulp');
var s3 = require("gulp-s3");
var fs = require('fs');

// Helper method
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

gulp.task("deploy", function() {
  var aws_path = "./aws.json";
  if (!fileExists(aws_path)) {
    console.log("File does not exist at " + aws_path);
    process.exit(1);
  }
  var aws = JSON.parse(fs.readFileSync(aws_path));
  gulp.src('./dist/**')
    .pipe(s3(aws));
});
