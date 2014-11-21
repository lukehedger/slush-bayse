var gulp = require('gulp'),
	install = require('gulp-install'),
	conflict = require('gulp-conflict'),
	template = require('gulp-template'),
	inquirer = require('inquirer');

gulp.task('default', function (done) {
	inquirer.prompt([
    	{type: 'checkbox', name: 'features', message: 'What else would you like to include?', choices: [{name: 'CoffeeScript', value: 'coffee', checked: false}, {name: 'Myth', value: 'myth', checked: false}]},
    	{type: 'input', name: 'name', message: 'Cool. So what\'s the name of your project? (No spaces please)', validate: function(input) { return (input.length ? true : "This field is required."); }, default: gulp.args.join(' ')},
    	{type: 'input', name: 'description', message: 'And what will it do?'},
		{type: 'confirm', name: 'moveon', message: 'Continue?'}
	],
	function (answers) {

		features = answers.features;
		hasFeature = function (feat) {
			return features.indexOf(feat) !== -1;
		}
		answers.coffee = hasFeature('coffee');
		answers.myth = hasFeature('myth');

		var files = [__dirname + '/templates/app/**'];

		if (answers.coffee) {
			files.push('!' + __dirname + '/templates/app/{js,js/**}')
		}
		else {
			files.push('!' + __dirname + '/templates/app/{coffee,coffee/**}')
		}
		if (answers.myth) {
			files.push('!' + __dirname + '/templates/app/{css,css/**}')
		}
		else {
			files.push('!' + __dirname + '/templates/app/{myth,myth/**}')
		}

		if (!answers.moveon) {
			return done();
		}
	
		gulp.src(files)								// Note use of __dirname to be relative to generator
		.pipe(template(answers))					// Lodash template support
		.pipe(conflict('./'))						// Confirms overwrites on file conflicts
		.pipe(gulp.dest('./'))						// Without __dirname here = relative to cwd
		.pipe(install())							// Run `bower install` and/or `npm install` if necessary
		.on('finish', function () {
			done();									// Finished!
		});
	});
});