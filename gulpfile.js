var gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
var typescript = require('gulp-typescript');
var tsProject = typescript.createProject(
  'tsconfig.json', {
    out: 'main.js',
    removeComments: true
  }
);

//Webサーバー
gulp.task('connect', function() {
  connect.server({
    root: 'app',//ルートディレクトリ
    livereload: true //ライブリロード
  });
});

//'html'に、htmlファイルをリロードする処理を登録
gulp.task('reload', function () {
gulp.src('./app/*.html')
  .pipe(connect.reload());
});

gulp.task('ts', function() {
  //出力オプション
  // var options =  {
  //   out: 'main.js',
  //   removeComments: true
  // };

  gulp.src(['./ts/*.ts'])
    // .pipe(typescript(options))
    .pipe(tsProject())
    .pipe(gulp.dest('./app/js'));
});


//監視：HTMLファイルが変更されたら'html'を実行
gulp.task('watch', function () {
  gulp.watch(['./app/*.html', './app/css/*.css', './app/js/*.js'], ['reload']);
  gulp.watch('css/**/*.scss', function(){
    gulp.src('css/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
  });
  gulp.watch('./ts/*.ts', ['ts']);
});

//デフォルトタスクに登録
gulp.task('default', ['connect', 'watch']);