var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var gulp        = require("gulp");
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var sass        = require("gulp-sass");
var plumber     = require("gulp-plumber");
var watch       = require('gulp-watch');
var pleeease    = require('gulp-pleeease');
var ejs         = require("gulp-ejs");
var csscomb     = require('gulp-csscomb');
var iconfont    = require('gulp-iconfont');
var spritesmith = require('gulp.spritesmith');
var cmq         = require('gulp-combine-media-queries');

// スプライト画像作成
gulp.task('sprite', function () {
  var spriteData = gulp.src('src/img/sprite/*.png') //スプライトにする愉快な画像達
  .pipe(spritesmith({
    imgName: 'sprite.png', //スプライトの画像
    cssName: '_sprite.scss', //生成されるscss
    imgPath: '../img/common/sprite.png', //生成されるscssに記載されるパス
    cssFormat: 'scss', //フォーマット
    padding: 10,
    cssVarMap: function (sprite) {
      sprite.name = 'sprite_' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    }
  }));
  spriteData.img.pipe(gulp.dest('htdocs/img/common/')); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest('src/sass/')); //cssNameで指定したcssの保存先
});


// アイコンを作成(webフォント化する)
// gulp.task('iconfont', function () {
//   gulp.src(['src/icons/*.svg'])
//   .pipe(iconfont({
//     fontName: 'icon'
//   }))
//   .pipe(gulp.dest('app/assets/fonts/'));
// });


// テンプレート
gulp.task("ejs", function() {
  gulp.src(
    ["src/**/*.ejs",'!' + "src/**/_*.ejs"]
    )
  .pipe(ejs())
  .pipe(gulp.dest('htdocs/'))
});


// jsファイルを圧縮
gulp.task('js', function(){
	gulp.src('src/js/custom/*.js')
	.pipe(plumber())
	.pipe(concat('function.js'))
	.pipe(gulp.dest('htdocs/js'));
});


// sass
gulp.task('sass', function() {

  gulp.src('src/sass/**/*.scss')
  .pipe(plumber())
  .pipe(sass({
    style: 'expanded'
  }))
  .pipe(pleeease({
    autoprefixer: {
      browsers: ['last 2 versions', 'ie 8', 'ie 9']
    },
    minifier: false
  }))
  .pipe(gulp.dest('htdocs/css/'));
});


// CSSのプロパティの順番整理
gulp.task('csscomb', function () {
  gulp.src('htdocs/css/style.css')
  .pipe(csscomb())
  .pipe(gulp.dest('htdocs/css/'));
});


// ディレクトリーのコピー
gulp.task('copy', function() {

  gulp.src('src/img/**')
  .pipe(gulp.dest('htdocs/img'));

  gulp.src('src/js/**.js')
  .pipe(gulp.dest('htdocs/js'));
});


// メディアクエリの整理
gulp.task('cmq', function () {
  gulp.src('htdocs/css/style.css')
  .pipe(cmq({
    log: true
  }))
  .pipe(gulp.dest('htdocs/css/'));
});


gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'htdocs/',
      directory: true,
    },
  });
});


gulp.task( 'watch', function() {
  gulp.watch( [ 'src/**/*.ejs' ], [ 'ejs' ] );
  gulp.watch( [ 'src/js/custom/*.js' ], [ 'js' ] );
  gulp.watch( [ 'src/sass/**/*.scss' ], [ 'sass' ] );
  gulp.watch( [ 'htdocs/**/*.html','htdocs/css/*.css' ], reload );
} );

gulp.task('default', [ 'ejs', 'js', 'sass', 'watch', 'browser-sync']);


