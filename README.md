# gulp-snippet-prettify

Gulp plugin to rename code snippet function variables to make them look pretty.

NOTE: This probably only works with uglifyjs - untested with anything else.

If you are creating snippets or widgets for websites, and you have some code like this:

```
!function(u,g,l,y,w,t,f) {
```

Use gulp-snippet-prettify to make it look like this:

```
!function(p,r,e,tt,y,_) {
```

We use this at [Stackbin](https://stkbn.com) to make our snippets look pretty.

## Installation

```
> npm install gulp-snippet-prettify --save
```

## Usage

Example below of using uglify to mangle/compress some code, then rename the variables to produce:

gulpfile.js:

```

var gulp = require('gulp');
var uglify = require('gulp-uglify');

var snippet-options = {
    replacements: ['p', 'r', 'e', 'tt', 'y']
};

gulp.task('buildjs-snippet', function () {
    gulp.src('snippet.js')
        .pipe(uglify({
            mangle: true,
            output: {
                max_line_len: 80,
                indent_level: 0,
                ascii_only: true
            },
            compress: {
                unsafe: true
            }
        }))
        .pipe(snippetPrettify(snippet_options))
        .pipe(gulp.dest('dist'));
});
```

## License

MIT

See LICENSE file


