# gulp-snippet-prettify

Gulp plugin to rename code snippet function variables to make them look pretty.

NOTE: This plugin will only rename variables in the first function definition it finds.

If you are creating snippets or widgets for websites, and you have some code like this:

```
!function(u,g,l,y,w,t,f) {
```

You can use *gulp-snippet-prettify* to make it look something like this (a la google analytics)

```
!function(i,s,o,g,r,a,m) {
```

We use this at [Stackbin](https://stkbn.com) to make our snippets look pretty :)

## Installation

```
npm install gulp-snippet-prettify --save
```

## Usage

Example below of using uglify to mangle/compress some code, then rename the variables.

gulpfile.js:

```javascript
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var snippetPrettify = require('gulp-snippet-prettify');

gulp.task('snippet', function () {
    gulp.src('snippet.js')
        .pipe(uglify())
        .pipe(snippetPrettify({
            replacements: ['i', 's', 'o', 'g', 'r', 'a', 'm']
        }))
        .pipe(gulp.dest('dist'));
});
```

## License

MIT - See LICENSE file
