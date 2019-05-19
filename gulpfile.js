var fs = require("fs");
var gulp = require("gulp");
var babel = require("gulp-babel");
var replace = require("gulp-string-replace");
var ts = require("gulp-typescript");

var project = ts.createProject("tsconfig.json");

gulp.task(
  "build",
  () => gulp.src("source/cli.ts", "source/index.ts")
    .pipe(replace("EMBED_REPORTERS_DB", fs.readFileSync("reporters-db/reporters_db/data/reporters.json", "ascii")))
    .pipe(project())
    .js
    .pipe(gulp.dest("build/")),
);
