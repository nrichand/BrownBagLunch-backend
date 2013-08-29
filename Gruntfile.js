/*jshint globalstrict: true*/
"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/spec/**/*.js']
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app.js', 'test/**/*.js', 'routes/**/*.js'],
            options: {
                node: true,
                predef: ["describe", "it", "before"] //Mocha methods
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['mochaTest', 'jshint']);
    grunt.registerTask('test', ['mochaTest']);
};
