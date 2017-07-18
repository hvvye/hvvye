/**
 * Created by hvvye on 2017/7/1.
 */
$(function () {
    function carousel_img_change(){
        var windowinnderwidth = $(window).width();
        var isxs = windowinnderwidth < 768;
        //console.log(isxs);
        //console.log(windowinnderwidth);
        $("#main-carousel > #carousel-example-generic >.carousel-inner >.item").each(function(i,ele){
           var $ele=$(ele);
           if(isxs){
               $ele.html("<img src='"+ $ele.data('img-xs') +"'/>");
           }else{
               $ele.html("");
               $ele.css("backgroundImage","url("+ $ele.data('img-md') +")");
           }
        });
    }
    $(window).on('resize',carousel_img_change).trigger('resize');
    $('[data-toggle="tooltip"]').tooltip();

    //   tab栏自适应

    var $tabLis=$(".tab-wrapper:eq(0)").children().eq(0).children();
    //console.log($tabLis);
    var $tabLisLength=30;
    $tabLis.each(function(i,ele){
        $tabLisLength+=$(ele).width();
        //console.log($(ele).width());
    });
    //console.log($tabLisLength);
    if($tabLisLength>$(window).width()){
        $(".tab-wrapper:eq(0)").children().eq(0)
            .css("width",$tabLisLength)
            .parent().css("overflow-x","scroll");
    }
    //   /tab栏自适应\
    var $title=$("#main-news div:eq(0) h5");
    $("#main-news .nav-stacked a").on("click",function(){
        var $this=$(this);
        $titles=$this.data("title");
        $title.text($titles);
    });
    //'carousel' - touch-slider
    var $carousel=$("#carousel-example-generic");
    var leader = 0;
    var target = 0;
    $carousel.on("touchstart",function(e){
        //console.log(e.originalEvent.touches[0].clientX);
        leader=e.originalEvent.touches[0].clientX;
    });
    $carousel.on("touchmove",function(e){
        //console.log(e.originalEvent.touches[0].clientX);
        target=e.originalEvent.touches[0].clientX;
    });
    $carousel.on("touchend",function(e){
        if(target>leader){
            $carousel.carousel('prev');
        }else if(target<leader){
            $carousel.carousel('next');
        }else{

        }
    })
})