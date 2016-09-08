'use strict';

//basic configuration
module.exports = {
  port: 5000,
  tmp: 'build/tmp',
  dist: 'build/dist',
  base: 'app',
  html: 'app/**/*.html',
  mainScss: 'app/app.scss',
  scss: ['app/watch/*.scss', 'app/search/*.scss'],
  js: [
    'app/modules/**/*.js',
    '!app/vendor/**/*.js',
    'app/**/*-spec.js',   //unit
  ],
  index: 'app/index.html',
  assets: 'app/assets/**',
  images: 'app/assets/images/**/*'
};
