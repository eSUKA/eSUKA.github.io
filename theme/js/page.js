Application = {Window: $(window)};
refreshList = function(fadeTime) {
    fadeTime = (typeof fadeTime == "undefined")?200:fadeTime;
    $(".shown.last").find("hr").fadeIn(0);
    var showns = $("article.shown:not(.nomore)").length;
    if(showns > 0) {
        $("article.nomore.shown").removeClass("shown").stop().animate({height: "toggle", opacity: "toggle"}, fadeTime);
    } else if(showns == 0) {
        $("article.nomore:not(.shown)").addClass("shown").stop().animate({height: "toggle", opacity: "toggle"}, fadeTime);
    }
    $(".shown:last").addClass("last").find("hr").stop().fadeOut(fadeTime);
};
filterNews = function(el) {
    $("article.category_" + el.attr("data-class")).toggleClass("shown").animate({height: "toggle", opacity: "toggle"}, 200);
    refreshList();
};
searchNews = function() {
    var stext = $("#searchbar").val().toLowerCase();
    $("article:not(.nomore)").each(function(){
        var $this = $(this);
        if((!$this.hasClass("shown") && $this.text().toLowerCase().indexOf(stext) != -1) || ($this.hasClass("shown") && $this.text().toLowerCase().indexOf(stext) == -1)) {
            $this.toggleClass("shown").animate({height: "toggle", opacity: "toggle"}, 200);
        }
    });
    refreshList();
};
$(document).ready(function(){
    refreshList(0);
    Application.Navigation = $("nav");
    var Shine = function(){
        var self = this;
        var offset = 0;
        var offsetDir = -1;
        var footer = $("footer");
        var footer1 = $("#footshine1");
        var footer2 = $("#footshine2");
        var footerLeft1 = 140;
        var footerLeft2 = 860;
        var overfill = 0;
        var width = 0;
        var el = $("#shine");
        self.container = $("#shineContainer");
        var timeout = null;
        var move = function() {
            offset += offsetDir*parseInt(Math.random()*6-3)*2;
            overfill += parseInt(parseInt(Math.random()*2-2.8)*2.5);
            width += parseInt(parseInt(Math.random()*10-5)*1.5);
            if (Math.abs(offset) > 14) { offset = 13; offsetDir *= -1; }
            if (width < -24) width = -24;
            if (width > 24) width = 24;
            if (overfill < -6) overfill = -6;
            if (overfill > 22) overfill = 22;
            el.stop(true, false).animate({marginLeft: 124+offset, boxShadow: "0 0 "+(115+width)+"px "+(52+overfill)+"px #2ab0ec"}, 150);
            timeout = setTimeout(move, 150);
        };
        var moveFooter = function() {
            footerLeft1 += 30;
            footerLeft2 -= 26;
            if(footerLeft1 > footer.width() + 140){
                footerLeft1 = -140;
                footer1.stop(true, false).animate({left: footerLeft1}, 0);
            }
            if(footerLeft2 < -220){
                footerLeft2 = footer.width()+220;
                footer2.stop(true, false).animate({left: footerLeft2}, 0);
            }
            footer1.stop(true, false).animate({left: footerLeft1}, 120);
            footer2.stop(true, false).animate({left: footerLeft2}, 120);
            setTimeout(moveFooter, 120);
        };
        move();
        moveFooter();
        this.shineBright = function(){
            clearTimeout(timeout);
            el.stop(true, false).animate({boxShadow: "0 0 "+(150)+"px 120px #2ab0ec"}, 100);
            el.animate({boxShadow: "0 0 "+(115+width)+"px "+(50+overfill)+"px #2ab0ec"}, 300);
            timeout = setTimeout(move, 400);
        }
    };
    var ImageShow = function() {
        var $container = $("#imageShow");
        var $images = $container.find(".image");
        var $handlers = $container.find(".handler");
        var $prev = $handlers.filter(".prev");
        var $next = $handlers.filter(".next");
        var $count = $container.find(".imgcounter").find(".act");
        var $loader = $container.find(".loader").find("p");
        var act = 1;
        var all = $container.find(".imgcounter .all").text();
        var autoChange = setTimeout(function(){ $next.click(); }, 8000);
        var load = function(delay){
            $loader.stop().animate({width: 0}, (typeof delay == "undefined")?500:delay).animate({width: "100%"}, 8000, "linear");
        };
        load(0);
        var changeImg = function(i) {
            clearTimeout(autoChange);
            if (i == act) return;
            var $oldImage = $($images.get(act-1));
            var $newImage = $($images.get(i-1));
            $oldImage.stop().fadeOut(500);
            $newImage.stop().after($oldImage).show();
            $count.text(i);
            act = i;
            autoChange = setTimeout(function(){ $next.click(); }, 8500);
            load();
        };
        $next.click(function() {
            changeImg((act == all) ? 1 : (act + 1));
        });
        $prev.click(function() {
            changeImg((act == 1) ? all : (act - 1));
        });
        $container.on("mouseenter", function(){
            $handlers.stop().fadeIn(400);
        }).on("mouseleave", function(){
            $handlers.stop().fadeOut(400);
        });
    };
    ImageShow();

    Application.Shine = new Shine();
    var leave = function(){
        var ind = Application.Navigation.find("a.item").index($("nav a.active"));
        Application.Shine.container.stop(true, false).animate({left: 251*Math.max(ind, 0)+(ind>1?195:0)}, 300);
    };
    leave();
    Application.Navigation.find("a.item").mouseenter(function(){
        var ind = Application.Navigation.find("a.item").index(this);
        Application.Shine.container.stop(true, false).animate({left: 251*ind+(ind>1?195:0)}, 300);
    }).mouseleave(leave).click(function(){
        Application.Shine.shineBright();
    });

    Application.Window.scroll(function(){
        if($(this).scrollTop() != 0) {
            Application.Navigation.find("div.logo img").stop(true, false).animate({height: Math.max(100, 162-$(this).scrollTop()/3.8)}, 124-$(this).scrollTop()/1.9, "linear");
        } else {
            Application.Navigation.find("div.logo img").stop(true, false).animate({height: 162}, 124-$(this).scrollTop()/1.9, "linear");
        }
    });

    $(".checkbox").each(function(){
        var $this = $(this);
        $this.append($("<input/>").attr("type", "checkbox").prop("checked", $this.hasClass("checked")).hide());
    });
    $(".checkbox a").click(function(){
        var $this = $(this).parent();
        $this.toggleClass("checked");
        if($this.hasClass("all")) {
            if ($this.hasClass("checked")) $(".checkbox").not(".checked").find("a").click();
            else $(".checkbox.checked a", $this.parent()).click();
        } else {
            if (!$this.hasClass("checked"))
                $(".checkbox.all", $this.parent()).removeClass("checked");
            if($this.parent().find(".checkbox").not(".all").not(".checked").length == 0)
                $(".checkbox.all", $this.parent()).addClass("checked");
            $this.find("input").prop("checked", $this.hasClass("checked"));
            window[$this.attr("data-handler")]($this);
        }
    });
    $(".checkbox span").click(function(){
        var $this = $(this).parent();
        if($this.hasClass("all")) {
            $this.toggleClass("checked");
            if ($this.hasClass("checked")) $(".checkbox").not(".checked").find("a").click();
            else $(".checkbox.checked a", $this.parent()).click();
        } else {
            $(".checkbox.all", $this.parent()).removeClass("checked");
            $(".checkbox.checked a", $this.parent()).not($this.find("a")[0]).click();
            if (!$this.hasClass("checked")) $this.find("a").click();
        }
    });
});