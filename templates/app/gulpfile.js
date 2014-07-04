var gulp = require('gulp'),
	<% if(coffee) { %>
	sourcemaps = require('gulp-sourcemaps'),
	coffee = require('gulp-coffee'),
	gutil = require('gulp-util'),
	<% } %>
	<% if(myth) { %>
    myth = require('gulp-myth'),
	minifycss = require('gulp-minify-css'),
	<% } %>
	browserSync = require('browser-sync');

<% if(coffee) { %>
gulp.task('coffee', function () {
	gulp.src('coffee/**/*.coffee')
		.pipe(sourcemaps.init())
		.pipe(coffee().on('error', gutil.log))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({stream:true, once: true}));
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

gulp.task('browser-sync', function() {
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
	<%
		if(coffee && myth) {print("gulp.start('coffee', 'myth');");}
		else if(coffee && !myth) {print("gulp.start('coffee');");}
		else if(!coffee && myth) {print("gulp.start('myth');");}
	%>
});

gulp.task('watch', function() {
	gulp.start('browser-sync');
	<% if(coffee) {print("gulp.watch('coffee/**/*.coffee', ['coffee']);");} %>
	<% if(myth) {print("gulp.watch('myth/**/*.css', ['myth']);");} %>
});