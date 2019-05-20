var fs = require("fs");
var gulp = require("gulp");
var replace = require("gulp-string-replace");

gulp.task(
  "build",
  () => gulp.src("source/db.ts")
    .pipe(replace(
      "EMBED_REPORTERS_DB",
      fs.readFileSync("reporters-db/reporters_db/data/reporters.json", "ascii"),
      { logs: { enabled: false }, },
    ))
    .pipe(gulp.dest("source/")),
);
