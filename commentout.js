/* Check if image exists */
var hasImage = function(elem) {
  return $($(elem).find(".UFICommentContent")[0]).children("div").length == 2;
}

/* Set of filtering rules */
var filters = [
  /* Recognize images */
  function(comment) {
    return hasImage(comment);
  },
  /* Recognize texts with special characters */
  function(comment) {
    var comment_str = $($(comment).find(".UFICommentBody")).text();
    var special_characters = ['★', '☆', '※', '☞', '☜', '■', '●', '✓', '♫', '☂', '◀', '◁', '▶'];
    for (var i = 0; i < special_characters.length; i++) {
      if (comment_str.indexOf(special_characters[i]) >= 0) {
        return true;
      }
    }
    return false;
  }
  /* TODO: "SEE MORE" */
];

/* Set of filtering exceptions */
var exceptions = [
  function(comment) {
    var likes = $(comment).find(".UFICommentLikeButton").children("span").text();
    return likes > 20;
  },
  function(comment) {
    var comment_str = $($(comment).find(".UFICommentBody")).text();
    var english = /^[A-Za-z0-9]*$/;
    return comment_str.length > 2 && english.test(comment_str.substring(0, 2));
  }
];

/* Test exceptions and filters on each comment */
var checkComment = function(comment) {
  for (var i = 0; i < exceptions.length; i++) {
    if (exceptions[i](comment)) {
      return false;
    }
  }
  for (var i = 0; i < filters.length; i++) {
    if (filters[i](comment)) {
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
