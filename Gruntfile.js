module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        path: {
            public: 'public',
            server: 'server'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= path.public %>/js/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= path.public %>/*.min.js',
                        '<%= path.public %>/*.min.css',
                    ]
                }]
            },
            flat: {
                files: [{
                    dot: true,
                    src: [
                        '<%= path.public %>/*.js',
                        '<%= path.public %>/*.css',
                        '!<%= path.public %>/*.min.js',
                        '!<%= path.public %>/*.min.css',
                    ]
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: {
                    '<%= path.public %>/js/bundle.js': [
                        '<%= path.public %>/vendor/jquery/dist/jquery.js',
                        '<%= path.public %>/vendor/angular/angular.js',
                        '<%= path.public %>/vendor/bootstrap/dist/js/bootstrap.js',
                        '<%= path.public %>/vendor/angular-resource/angular-resource.js',
                        '<%= path.public %>/vendor/angular-route/angular-route.js',
                        '<%= path.public %>/vendor/jplayer/dist/jplayer/jquery.jplayer.js',
                        '<%= path.public %>/vendor/angular-touch/angular-touch.js',
                        '<%= path.public %>/vendor/angular-sanitize/angular-sanitize.js',
                        '<%= path.public %>/vendor/angular-carousel/dist/angular-carousel.js',
                        '<%= path.public %>/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
                        '<%= path.public %>/vendor/angular-local-storage/dist/angular-local-storage.js',
                        '<%= path.public %>/vendor/angular-disqus/angular-disqus.js',
                        '<%= path.public %>/js/**/*.js'
                    ]
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
                separator: ';'
            },
            dist: {
                files: [{
                    src: '<%= path.public %>/js/bundle.js',
                    dest: '<%= path.public %>/js/bundle.js'
                }]
            }
        },
        uglify: {
            dist: {
                files: [{
                    src: '<%= path.public %>/js/bundle.js',
                    dest: '<%= path.public %>/js/bundle.min.js'
                }]
            }
        },
        less: {
            dist: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapFilename: '<%= path.public %>/css/style.css.map',
                    sourceMapURL: 'http://www.riplive.it/css/style.css.map'
                },
                files: [{
                    src: '<%= path.public %>/less/style.less',
                    dest: '<%= path.public %>/css/style.css'
                }]
            },
        },
        cssmin: {
            dist: {
                files: {
                    '<%= path.public %>/css/style.min.css': [
                        '<%= path.public %>/css/style.css'
                    ]
                }
            }
        },
        sshconfig: {
            'server': {
                host: process.env.SSH_HOST,
                username: process.env.SSH_USER,
                password: process.env.SSH_PASSWORD,
                port: process.env.SSH_PORT
            }
        },
        sshexec: {
            deploy: {
                command: [
                    'cd /var/www/riplive.it',
                    'git pull origin master',
                    'npm install',
                    'bower install',
                    'grunt build',
                    'NODE_ENV=production forever restartall',
                    'forever list'
                ].join(' && '),
                options: {
                    config: 'server'
                }
            }
        },
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concat:dist',
        'ngAnnotate:dist',
        'uglify:dist',
        'less:dist',
        'cssmin:dist',
        'clean:flat'
    ]);

    grunt.registerTask('deploy', [
        'sshexec:deploy'
    ]);
};
