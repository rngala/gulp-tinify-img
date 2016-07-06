# gulp-tinify-img
A gulp plug-in dependency that tinify to compress your jpeg or png

# Install
Install with npm
	
	npm install --save-dev gulp-tinify-img

#API

	gulpTinifyImg({tinify_key: 'xxx', log: true})
	
	1) tinify_key: A useable tinify key 
	2) log: true || false (default is false)  //option whether need log

#Features 

- Same API for JPEG & PNG images
- The API compresses JPEG and PNG images. Simply upload your source image and download the result. 
  Everything else happens automatically.
- Upload directly or provide a URL to the image
- Preserve metadata
- Amazon S3 integration
- The API can resize your images as well as optimize them
- Resizing includes correct gamma-scaling, bicubic transparency edge-correction and natural image-sharpening.

You can also create your own integration with any HTTP(S) client. 
The server will compress your image and respond with a URL where you can grab the result.

	curl --user api:YOUR_API_KEY \
     --data-binary @unoptimized.png -i https://api.tinify.com/shrink

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
If you have any problem when using, you can open an issue!
