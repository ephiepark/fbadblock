var rules = [
    function(comment) {
        var comment_str = $(comment).text();
        console.log("image check!");
        console.log(comment_str.length);
        console.log($(comment).find("img").length);
        console.log(comment_str);
        console.log($(comment));
        if ($(comment).find(".mvs").length != 0) {
            return true;
            console.log("ASFASDFADSFDSAFADSF");
        }
        return false;
    },
    function(comment) {
        var comment_str = $(comment).text();
        if (comment_str.length > 50) {
            var special_characters = ['★', '☞', '✓', '♫', '☂', '◁'];
            for (var i = 0; i < special_characters.length; i++) {
                if ($(comment).text().indexOf(special_characters[i]) >= 0) {
                    return true;
                }
            }
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

var onCommentLoad = function(event) {
    if ($(event.target).find(".UFIComment").length > 0) {
        console.log(event); 
    }
    $(event.target).find(".UFIComment").each(function(index) {
        console.log("I'm in!");
        if (checkComment(this)) {
            if (!$(this).hasClass("removed")) {
                // $(this).children().css("display", "none");
                $(this).children().css("background-color", "red");
                var _this = $(this).children();
                $(this).addClass("removed");
                var btn = $("<a></a>");
                var hide = $("<p>Hide</p>");
                var show = $("<p>Show</p>");
                btn.append(hide);
                btn.append(show);
                btn.click(function() {
                    _this.toggle();
                    hide.toggle();
                    show.toggle();
                });
                $(this).append(btn);
                hide.toggle();
            }
        }
    });
};

$("body").bind("DOMNodeInserted", onCommentLoad);
