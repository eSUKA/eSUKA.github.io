Application = {Window: $(window)};
filterNews = function(el) {
    $(".article_wrapper.type_" + el.attr("data-class")).animate({height: "toggle", opacity: "toggle"}, 200);
};
$(document).ready(function(){
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

    Application.Shine = new Shine();
    Application.Navigation.find("div.item").mouseenter(function(){
        var ind = Application.Navigation.find("div.item").index(this);
        Application.Shine.container.stop(true, false).animate({left: 251*ind+(ind>1?195:0)}, 300);
    }).mouseleave(function(){
        var ind = Application.Navigation.find("div.item").index($("nav div.active"));
        Application.Shine.container.stop(true, false).animate({left: 251*ind+(ind>1?195:0)}, 300);
    }).click(function(){
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