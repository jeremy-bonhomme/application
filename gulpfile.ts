import * as gulp from 'gulp';
import * as plumber from 'gulp-plumber';
import * as pug from 'gulp-pug';
import * as ng from 'pug-plugin-ng';

export const process: () => void = () => gulp.src( 'src/**/*.pug' )
  .pipe( plumber() )
  .pipe( pug( { plugins: [ ng ], basedir: 'src', pretty: true } ) )
  .pipe( gulp.dest( 'src' ) );

export const watch: () => void = () => gulp.watch( 'src/**/*.pug', process );
export const serve: () => void = gulp.series( process, watch );
