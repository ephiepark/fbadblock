/* Check if image exists */
var hasImage = function(elem) {
  return $($(elem).find(".UFICommentContent")[0]).children("div").length == 2;
}

/* Set of filtering rules */
var rules = [
  function(comment) { // Recognize images
    if (hasImage(comment)) {
      return true;
    }
    return false;
  },
  function(comment) { // Recognize texts with special characters
    var comment_str = $(comment).text();
    if (comment_str.length > 100) {
      var special_characters = ['★', '※', '☞', '✓', '♫', '☂', '◁', '▶'];
      for (var i = 0; i < special_characters.length; i++) {
        if (comment_str.indexOf(special_characters[i]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
  /* TO ADD MORE */
];

/* Apply rules to each comment */
var checkComment = function(comment) {
  for (var i = 0; i < rules.length; i++) {
    if (rules[i](comment)) {
      return true;
    }
  }
  return false;
};

/* Executed upon automatic comment load */
var onCommentLoad = function(event) {
  $(event.target).find(".UFIComment").each(function(index) {
    if (!$(this).hasClass("co-checked") && checkComment(this)) {
      var filteredArea = $(this).find(".UFICommentBody");
      if (hasImage(this)) {
        filteredArea = filteredArea.add($($(this).find(".UFICommentContent")[0]).children("div"));
      }
      filteredArea.css("display", "none");
      var btn = $("<a></a>");
      var hide = $("<span>Hide</span>");
      var show = $("<span>Show</span>");
      btn.append(hide);
      hide.hide();
      btn.append(show);
      btn.click(function() {
        filteredArea.toggle();
        hide.toggle();
        show.toggle();
      });
      btn.css({
        "display"      : "inline-block",
        "padding-left" : "3px",
        "color"        : "#ee6e73"
      });
      $($($(this).find(".UFICommentContent")[0]).children("span")[0]).after(btn);
    }
    $(this).addClass("co-checked");
  });
};

/* Executed upon more comments requested */
var onViewMoreComments = function(event) {
  $(event.target).parents(".UFIList").bind("DOMSubtreeModified", onCommentLoad);
}

$("body").bind("DOMNodeInserted", onCommentLoad);
$("body").on("click", ".UFIPagerLink", onViewMoreComments);
