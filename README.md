# gulp-snippet-prettify

Gulp plugin to rename code snippet function variables to make them look pretty.

NOTE: This probably only works with uglifyjs - untested with anything else.

If you are creating snippets or widgets for websites, and you have some code like this:

```
!function(u,g,l,y,w,t,f) {
```

Use *gulp-snippet-prettify* to make it look like this:

```
!function(very,p,r,e,t,t,y) {
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
            replacements: ['p', 'r', 'e', 'tt', 'y']
        }))
        .pipe(gulp.dest('dist'));
});
```

## License

MIT - See LICENSE file
