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
                src: ['test/*.js']
            }
        }//,
        //jshint: {
            //all: ['Gruntfile.js', 'app.js', 'test/**/*.js', 'routes/**/*.js'],
            //options: {
                //node: true, //specific node rules
                //expr: true, //chai do weird things, function looks like parameter
                //predef: ["describe", "it", "before", "after", "beforeEach", "afterEach"] //Mocha methods
            //}
        //}
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['mochaTest']);
    grunt.registerTask('test', ['mochaTest']);
};
