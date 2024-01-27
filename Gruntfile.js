module.exports = function(grunt) {
  var sass = require('sass');
    grunt.initConfig({
		sass: {
			options: {
        implementation: sass,
                includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
            },
            dist: {
				options: {
					outputStyle: 'compressed'
				},
                files: [{
                    'assets/css/style.min.css': 'assets/scss/style.scss',
				}]
            }
        },
    });
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask("buildcss", ["sass"]);	
    grunt.registerTask("buildjs", ["uglify"]);
};