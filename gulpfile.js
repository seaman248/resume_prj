var gulp = require('gulp'),
	connect = require('gulp-connect'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	kouto = require('kouto-swiss'),
	source = require('vinyl-source-stream');

gulp.task('connect', function() {
	connect.server({
		root: 'dest',
		port: 3000,
		livereload: true
	})
});

gulp.task('img', function() {
	gulp.src('./src/img/*.jpg')
		.pipe(gulp.dest('./dest/img'))
});

gulp.task('jade', function() {
	gulp.src('./src/index.jade')
		.pipe(jade())
		.pipe(gulp.dest('./dest'))
		.pipe(connect.reload())
});

gulp.task('styl', function() {
	gulp.src('./src/main.styl')
		.pipe(stylus({
			use: [kouto()]
		}))
		.pipe(gulp.dest('./dest'))
		.pipe(connect.reload())
});

gulp.task('watch', ['img', 'jade', 'styl'], function() {
	gulp.watch('./src/*.jade', ['jade']);
	gulp.watch('./src/*.styl', ['styl']);
});

gulp.task('default', ['connect', 'watch']);