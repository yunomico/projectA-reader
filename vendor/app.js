$(document).ready(function(){
    var displaySlides = function(data) {
        
        var slide = $('#' + data.id);
        var carousel = $('<div>', {'id': data.id + '-carousel', 'class': 'owl-carousel owl-theme'});
        
        slide.append(carousel);

        $(data.manga).each(function(index, manga) {
            var img = $('<img>', {'class': 'tile', 'src': manga.src, 'alt': manga.title , 'data-id' : index});
            carousel.append(img);
        })
        .promise()
        .done(function() {
            var owl = $('#' + data.id + '-carousel');
            owl.owlCarousel({
            margin:10,
            loop: true,   //breaks title on hover sometimes
            autoWidth: true,
            nav: true,
            navText: ['<span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>','<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>'], // need to replace with actual nav buttons
            // slideBy: 'page', //doesn't work?
            dots: false ,
            lazyLoad:true
        });

                // autoplay on hover over buttons doesn't work well
                // $('#' + data.id + '-carousel .owl-nav .owl-prev').hover (function(){
                //     owl.trigger('play.owl.autoplay', [0, 100]);
                // }, function() {
                //     owl.trigger('stop.owl.autoplay');
                // });
                //
                // $('#' + data.id + '-carousel .owl-nav .owl-next').hover (function(){
                //     owl.trigger('play.owl.autoplay', [0, 100]);
                // }, function() {
                //     owl.trigger('stop.owl.autoplay');
                // });

                //fixes carousel autoWidth bug for incorrect width on initial load
            //$('#' + data.id + '-carousel .owl-stage-outer .owl-stage').css('width', data.manga.length * 204 + "px", 'important')
        });
    };

    //populate fake data
    var array = [];
    for (var i = 0; i < 15; i++) {
        array.push({'title': 'super duper awesome long title here ' + i, 'src': 'https://placehold.it/650x250&text=' + i, 'id': 'some id'});
    }
    var newData = {"id": "new" , "manga": array};
    var trendingData = {"id": "trending" , "manga": array};
    var readAgainData = {"id": "read-again" , "manga": array};

    var display = function() {
        displaySlides(newData);
        displaySlides(trendingData);
        displaySlides(readAgainData);
    };
    display();

    $(document).on('click' , '.tile-close' , function(){
       $(this).closest('.drop-container').fadeOut().remove();
       $('.owl-item').removeClass('overview-active').find('.remove-this').remove();
    });

});

$(document).on('mouseover' , ".owl-item" , function(){
    var title = $(this).find('img').attr('alt');

    if(!$(this).hasClass('overview-active')){
        $('.owl-item').removeClass('overview-active');
        $(this).addClass('overview-active');

        $(".owl-item").find('.remove-this').remove();
    }


    if(!$(this).find('.title').length){
        var small = $('<small>').text(title);
        var a = $('<a>', {'class': 'title remove-this' , 'href' : "javascript:void(0);"}).text(small.text());
        var arrow = $('<span>', {'class': 'arrow remove-this'});

        var img = $(this).find('img');
        img.after(arrow).after(a);

        var mlen = img.width() / 2;
 
        arrow.css("margin-left" , (mlen - 10)+"px");

        append_overview( $(this) , img.data('id') );
    }
    
});

function append_overview(a , id){
    var html = build_overview_window();
 
    if( !a.closest('.app-wrap').next().hasClass('drop-container') ){
        $('.drop-container').remove();
        a.closest('.app-wrap').after(html);
        $('.drop-container').hide().fadeIn();
    }

    var arr = [];

    for (var i = 0; i < 6; i++) {
       arr.push({
            image : "images/manga-chapter-preview.jpg" ,
            title : "Death Marching to the Parallel World Rhapsody" ,
            genre : "Action , Cooking , Fantasy" ,
            sypnosis : "Suzuki, an adult programmer, suddenly noticed that he's thrown into another world wearing a casual clothes at level 1. He gained high levels and treasures after using the 3-time-use disposable magic, Meteor Shower, once. After that he intends to do another world sightseeing tours? Meeting three beast girls, beautiful purple and black-haired sisters, and an eccentric blond-haired elf girl, along with various people during his trip. Although occasionally fighting demons and demon lord, this is a heartwarming fantasy story at heart",
            status : "On-Going" ,
            latestChapterLink : "javascript:void(0);",
            latestChapterText : "Chapter 20",
            chapterLink : "javascript:void(0);"
        });
        arr.push({
            image : "images/manga-chapter-preview2.png" ,
            title : "Shokugeki no Soma" ,
            genre : "Action , Cooking , Fantasy , Drama" ,
            sypnosis : "From Dan of Population GO: Yukihira Souma's dream is to become a full-time chef in his father's restaurant and surpass his father's culinary skill. But just as Yukihira graduates from middle schools his father, Yukihira Jouichirou, closes down the restaurant to cook in Europe. Although downtrodden, Souma's fighting spirit is rekindled by a challenge from Jouichirou which is to survive in an elite culinary school where only 10% of the students graduate. Can Souma survive?",
            status : "On-Going" ,
            latestChapterLink : "javascript:void(0);",
            latestChapterText : "Chapter 200",
            chapterLink : "javascript:void(0);"
        });
        arr.push({
            image : "images/slider1.jpg" ,
            title : "Akame ga Kiru!" ,
            genre : "Action , Cooking , Fantasy , Drama , Tragedy , Romance" ,
            sypnosis : "From Yen Press: Teenage country bumpkin Tatsumi dreams of earning enough money for his impoverished village by working in the Capital - but his short-lived plans go awry when he’s robbed by a buxom beauty upon arrival! Penniless, Tatsumi is taken in by the lovely Lady Aria, but just when his Capital dreams seem in reach yet again, Lady Aria's mansion is besieged by Night Raid - a team of ruthless assassins who targets high-ranking members of the upper class! As Tatsumi is quick to learn, appearances can be deceiving in the Capital, and this team of assassins just might be… the good guys?!",
            status : "Completed" ,
            latestChapterLink : "javascript:void(0);",
            latestChapterText : "Chapter 87",
            chapterLink : "javascript:void(0);"
        });
    }

    


    var overviewData = arr[id];
    var dropContainer = $('.drop-container');

    dropContainer.find('#image').attr('src' , overviewData.image);
    dropContainer.find('#title').html(overviewData.title);
    dropContainer.find('#genre').html(overviewData.genre);
    dropContainer.find('#sypnosis').html(overviewData.sypnosis);
    dropContainer.find('#status').html(overviewData.status);
    dropContainer.find('#latestChapterLink').attr('href' , overviewData.latestChapterLink);
    dropContainer.find('#latestChapterText').html(overviewData.latestChapterText);
    dropContainer.find('#chapterLink').attr('href' , overviewData.chapterLink);
}


function build_overview_window(){
    var html = '<div class="drop-container">';
            html += '<div class="drop-list">';
                html += '<div class="container-fluid">';
                    html += '<div class="col-lg-6">';
                        html += '<h2 id="title"></h2>';
                    html += '</div>';
                    html += '<div class="col-lg-6 text-right">';
                        html += '<a href="JavaScript:void(0);" class="tile-close"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>';
                    html += '</div>';
                html += '</div>';
                html += '<div class="container-fluid">';
                    html += '<div class="col-lg-6 col-xs-12">';
                        html += '<dl class="dl-horizontal">';
                            html += '<dt>Genre</dt>';
                            html += '<dd id="genre"></dd>';
                            html += '<dt>Sypnosis</dt>';
                            html += '<dd><p class="text-justify" id="sypnosis"></p></dd>';
                            html += '<dt>Status</dt>';
                            html += '<dd id="status"></dd>';
                            html += '<dt></dt>';
                            html += '<dd>';
                                html += '<div class="overview-btn-group">'
                                    html += '<a href="JavaScript:void(0);" class="btn btn-danger" id="latestChapterLink"><span><span class="glyphicon glyphicon-book" aria-hidden="true"></span>  &nbsp; <span id="latestChapterText"></span></span></a>';
                                    html += ' <a href="JavaScript:void(0);" class="btn btn-default" id="chapterLink"><span><span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span> &nbsp; Chapter List</span></a>';
                                html += '</div>';
                            html += '</dd>';
                        html += '</dl>';
                    html += '</div>';
                html += '</div>';
            html += '</div>';
            html += '<img src="#" class="drop-background" id="image">';
        html += "</div>";

    return html;
};