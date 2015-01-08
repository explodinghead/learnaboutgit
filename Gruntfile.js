module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		useminPrepare: {
			html: 'public/index.html',
			options: {
				dest: 'dist'
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['public/js/*.js', 'public/js/controllers/*.js'],
				// the location of the resulting JS file
				dest: 'dist/<%=pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'public/js/*.js', 'public/js/controllers/*.js'],
			options: {
					// more options here if you want to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		cssmin: {
			target: {
				files: {
					'dist/<%= pkg.name %>.min.css': ['public/css/styles.css']
				}
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'public/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: 'dist/images'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'dist/index.html'
				}
			}
		},
		usemin: {
			html: ['dist/index.html']
		},
		copy: {
			task0: {
				src: 'public/index.html', dest: 'dist/index.html'
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		},
		connect: {
			server: {
				options: {
					port: 9000,
					hostname: 'localhost',
					base: 'public',
					keepalive: true
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('scaffold', 'Create index.html file and directory structure', function() {
			grunt.file.mkdir('public/js/controllers');
			grunt.file.mkdir('public/views/articles');
			grunt.file.mkdir('public/views/includes');
			grunt.file.mkdir('public/views/aside');
			grunt.file.mkdir('public/css');
			grunt.file.mkdir('public/images');
			grunt.file.copy('index.html', 'public/index.html');
			grunt.file.delete('index.html');
	});

	// default task(s).
	grunt.registerTask('default', [
		'copy:task0',
		'useminPrepare',
		'jshint',
		'concat',
		'uglify',
		'cssmin',
		'imagemin',
		'usemin',
		'htmlmin'
	]);


};