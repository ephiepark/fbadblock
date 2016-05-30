var hideImage = function() {
    $("body").bind("DOMSubtreeModified", function() {
        $(".UFIComment").each( function(index) {
            if ($(this).find(".mvs").length != 0) {
                $(this).css("background-color", "red");
            }
        }); 
    });
};

hideImage();
