var fs = require("fs");
var gulp = require("gulp");
var replace = require("gulp-string-replace");
var ts = require("gulp-typescript");

var project = ts.createProject("tsconfig.json");

gulp.task(
  "build:1",
  () => gulp.src("source/db.ts")
    .pipe(replace(
      "EMBED_REPORTERS_DB",
      fs.readFileSync("reporters-db/reporters_db/data/reporters.json", "ascii"),
      { logs: { enabled: false }, },
    ))
    .pipe(gulp.dest("source/")),
);

gulp.task(
  "build:2",
  () => gulp.src("source/cli.ts", "source/index.ts")
    .pipe(project())
    .js
    .pipe(gulp.dest("build/")),
);

gulp.task(
  "build",
  gulp.series(
    "build:1",
    "build:2",
  ),
);
