var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var clean = require('gulp-clean');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');


gulp.task('minify', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('cssmin',function(){
	return gulp.src('app/**/*.css')
					.pipe(cssmin())
					.pipe(gulp.dest('dist'));
})

gulp.task('clean',function(){
	gulp.src('dist',{read:false})
		  .pipe(clean());
})

gulp.task('styl',function(){
	return gulp.src('app/**/*.styl')
	       .pipe(stylus({
	       	compress:true
	       }))
	       .pipe(concat('main.css'))
	       .pipe(gulp.dest('dist/styles'));
})

gulp.task('csss',function(){
	return gulp.src('app/**/*.css')
				 .pipe(cssmin())
				 .pipe(concat('all.css'))
				 .pipe(gulp.dest('dist/styles'));	
})


gulp.task('build',['clean','minify','styl','cssmin'],function(){
	return gulp.src('dist/**/*');
});