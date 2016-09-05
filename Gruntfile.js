module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: {
          "./css/style.css": "./sass/style.scss"
        }
      }
    },
	  postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        },
        dist: {
            src: 'css/style.css'
        }
    },
    watch: {
      styles: {
        files: ['sass/**.scss'], // which files to watch
        tasks: ['sass', 'postcss'],
        options: {
          nospawn: true
        }
      }
    }
  });
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');

  //grunt.registerTask('js-compile', ['jshint']);
  grunt.registerTask('css-compile', ['sass', 'csslint']);
  grunt.registerTask('livraison', ['sass']);
  grunt.registerTask('default', ['sass', 'watch', 'postcss']);
};
