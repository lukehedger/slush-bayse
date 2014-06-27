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
	livereload = require('gulp-livereload'),
	lr = require('tiny-lr'),
	server = lr();

<% if(coffee) { %>
gulp.task('coffee', function () {
	gulp.src('coffee/**/*.coffee')
		.pipe(sourcemaps.init())
		.pipe(coffee().on('error', gutil.log))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('js'))
		.pipe(livereload(server));
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
		.pipe(livereload(server));
});
<% } %>

gulp.task('default', function () {
	<%
		if(coffee && myth) {print("gulp.start('coffee', 'myth');");}
		else if(coffee && !myth) {print("gulp.start('coffee');");}
		else if(!coffee && myth) {print("gulp.start('myth');");}
	%>
});

gulp.task('watch', function() {
	<% if(coffee) {print("gulp.watch('coffee/**/*.coffee', ['coffee']);");} %>
	<% if(myth) {print("gulp.watch('myth/**/*.css', ['myth']);");} %>
});