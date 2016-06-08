var rules = [
    function(comment) {
        if ($(comment).find(".mvs").length != 0) {
            return true;
        }
        return false;
    }
];

var checkComment = function(comment) {
    for (var i=0; i<rules.length; i++) {
        if (rules[i](comment)) {
            return true;
        }
    }
    return false;
};

var hideComment = function() {
    $("body").bind("DOMSubtreeModified", function() {
        $(".UFIComment").each(function(index) {
            if (checkComment(this)) {
                if (!$(this).hasClass("removed")) {
                    $(this).children().css("display", "none");
                    _this = $(this).children();
                    $(this).addClass("removed");
                    btn.onclick=function() {
                      _this.toggle();
                    }
                    $(this).append(btn);
                }
            }
        });
    });
};

var btn = document.createElement("BUTTON");
var t = document.createTextNode("HIDDEN");
btn.appendChild(t);

hideComment();
