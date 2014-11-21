var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	gutil = require('gulp-util'),
	<% if(coffee) { %>
	sourcemaps = require('gulp-sourcemaps'),
	<% } %>
	<% if(myth) { %>
    myth = require('gulp-myth'),
	minifycss = require('gulp-minify-css'),
	<% } %>
	browserSync = require('browser-sync');

<% if(coffee) { %>
gulp.task('browserify', function () {
	browserify({
		entries: ['./coffee/app.coffee'],
		extensions: ['.coffee'],
		debug: true
	})
	.bundle()
	.on('error', gutil.log)
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('js'))
	.pipe(browserSync.reload({stream:true, once: true}))
});
<% } %>

<% if(!coffee) { %>
gulp.task('script', function () {
	browserify({
		entries: ['./js/app.js'],
		debug: true
	})
	.bundle()
	.on('error', gutil.log)
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('js'))
	.pipe(browserSync.reload({stream:true, once: true}))
});
<% } %>

<% if(myth) { %>
gulp.task('myth', function () {
	gulp.src('myth/**/*.css')
		.pipe(myth())
		.pipe(gulp.dest('css'))
		.pipe(minifycss({
			keepBreaks: true,
			root: 'css',
			processImport: true
		}))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream:true}));
});
<% } %>

gulp.task('server', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        },
        ports: {
        	min: 5000,
        	max: 5000
        },
        open: false, // disable automatic browser launch on server start
        notify: false // disable browser notifications
    });
});

gulp.task('default', function () {
	gulp.start('server', 'watch');
	<%
		if(coffee && myth) {print("gulp.start('browserify', 'myth');");}
		else if(coffee && !myth) {print("gulp.start('browserify');");}
		else if(!coffee && myth) {print("gulp.start('script', 'myth');");}
		else if(!coffee && !myth) {print("gulp.start('script');");}
	%>
});

gulp.task('watch', function() {
	<% if(coffee) {print("gulp.watch(['coffee/app.coffee', 'template/**/*.html'], ['browserify']);");} %>
	<% if(!coffee) {print("gulp.watch(['js/app.js', 'template/**/*.html'], ['script']);");} %>
	<% if(myth) {print("gulp.watch('myth/**/*.css', ['myth']);");} %>
});