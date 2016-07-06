# gulp-tinify-img
A gulp plug-in dependency that tinify to compress your jpeg or png

# Install
Install with npm
	
	npm install --save-dev gulp-tinify-img

#API

	gulpTinifyImg({tinify_key: 'xxx', log: true})
	
	1) tinify_key: A useable tinify key 
	2) log: true || false (default is false)  //option whether need log

#How to get a useable tinify key
[go here](https://tinypng.com/developers)

#Useage

	var gulp = require('gulp'),
    	gulpTinifyImg = require('gulp-tinify-img'),
    	gulp.task('tinify-img', function () {
    		gulp.src([path.join(config.src, '*.{png, jpeg}')], {})
        		.pipe(gulpTinifyImg({tinify_key: 'xxxx', log: true}))
        		.pipe(gulp.dest(config.dest))
        )};
         
#Last
If you have any problem when using, you can open an issue with me!!!
