var gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    cheerio      = require('gulp-cheerio'), // удаляет в свг стандартные стили котоыре мешают его стилизовать
    replace      = require('gulp-replace'), // исправление косяков от cheerio
    svgSprite    = require('gulp-svg-sprite'), //собирает все свг в 1 спрайт ( у него очень большой функционал, почитать api)
    svgMin       = require('gulp-svgmin');  //минификация свг
    borwerSync   = require('browser-sync').create(); //браузер синк

gulp.task('sass', function() { // Создаем таск Sass
    return gulp.src('app/scss/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
});

gulp.task('borwerSync', function(){
    borwerSync.init({
        server:{
            baseDir: "./app"
        }
    })
})

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'libs/jquery/dist/jquery.min.js', // Берем jQuery
        'libs/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js', // Берем Magnific Popup
        'libs/swiper/package/js/swiper.js'
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js/redy')); // Выгружаем в папку app/js
});

gulp.task('scripts2', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('scripts.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js/redy')); // Выгружаем в папку app/js
});

gulp.task('css-libs', function() {
    return gulp.src([
        'libs/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
        'libs/swiper/package/css/swiper.css'
        ]) // Выбираем файл для минификации (только для библиотек, ручные стили нет смысла сжимать)
        .pipe(concat('libs.min.css')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(cssnano()) // Сжимаем
        .pipe(gulp.dest('app/css/libs')); // Выгружаем в папку app/css
});

gulp.task('clean', async function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src(['app/img/**/*', '!app/img/**/*.svg']) 
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); 
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src('app/css/**/*') // Переносим библиотеки в продакшен
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/redy/**/*')    // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js/redy'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

    var buildSvg = gulp.src('app/img/symbol/sprite.svg') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist/img/symbol'));
});

gulp.task('svg', function(){
    return gulp.src('app/img/svg/**/*') 
    .pipe(svgMin({
        js2svg: {
            pretty: true
        }
    }))

    .pipe(cheerio({
        run: function($) {
           $('[fill]').removeAttr('fill'); 
           $('[stroke]').removeAttr('stroke'); 
           $('[style]').removeAttr('style'); 
        },
        parserOptions: {xmlMode: true}
    }))

    .pipe(replace('&gt;', '>'))
    
    .pipe(svgSprite({
        mode:{
            symbol: {
                sprite: "sprite.svg"
            }
        }
    }))
    .pipe(gulp.dest('app/img')) 
})

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('app/js/**/*.js', gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
    gulp.watch('app/**/*.html').on('change', borwerSync.reload);
    gulp.watch('app/**/*.css').on('change', borwerSync.reload);
    gulp.watch('app/**/*.js').on('change', borwerSync.reload);
});
gulp.task('default', gulp.parallel( 'borwerSync', 'css-libs', 'sass', 'scripts', 'scripts2','svg', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts', 'scripts2', 'svg'));