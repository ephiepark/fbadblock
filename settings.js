var add_blacklist = function(phrase) {
  chrome.storage.local.get('blacklist', function(object) {
    var blacklist = object['blacklist'];
    if (blacklist.length == 0) {
      blacklist = phrase;    
    }else{
      blacklist = blacklist + "||" + phrase;
    }
    chrome.storage.local.set({'blacklist': blacklist});
  });
};

var remove_blacklist = function(phrase) {
  chrome.storage.local.get('blacklist', function(object) {
    var blacklist_str = object['blacklist'];
    var blacklist = blacklist_str.split("||");
    if (blacklist_str.length == 0) {
      blacklist = [];
    }
    blacklist_str = "";
    for (var i = 0; i < blacklist.length; i++) {
      if (blacklist[i] != phrase) {
        if (blacklist_str.length == 0) {
          blacklist_str = blacklist[i];
        }else{
          blacklist_str = blacklist_str + "||" + blacklist[i];
        }
      }
    }
    chrome.storage.local.set({'blacklist': blacklist_str});
  });
};

var id = 0;
function Task(task) {
	this.id = id++;
	this.task = task;
	this.createLi = function() {
		var li = $( "<li class='collection-item' id='" + this.id + "'>" +
                  "<div>" + this.task +
                    "<a href='javascript:;' class='remove-btn secondary-content'>" +
                      "<i class='material-icons'>clear</i>" +
                    "</a>" +
                  "</div>" +
                "</li>");
		return li;
	};
}

var addNewTask = function(task) {
	var newTask = new Task(task);
	$( "#task-list" ).append(newTask.createLi());
	var li = $( "#" + newTask.id );
	li.find(".remove-btn").on("click", function() {
		li.remove();
	  remove_blacklist(task);
    chrome.tabs.query({url: "*://www.facebook.com/*"}, function(tab_list) {
      for (var i = 0; i < tab_list.length; i++) {
        chrome.tabs.sendRequest(tab_list[i].id, {blacklistEntered: true});
      }
    });
  }); 
};

$( document ).ready(function() {
  chrome.storage.local.get('blacklist', function(object) {
    var blacklist_str = object['blacklist'];
    var blacklist = blacklist_str.split("||");
    if (blacklist_str.length == 0) {
      blacklist = [];
    }
    for (var i = 0; i < blacklist.length; i++) {
      addNewTask(blacklist[i]);
    }
  });

	$( "#input-task" ).on("keypress", function(e) {	
    var key = e.which || e.keyCode;
		if (key === 13) {
			var task = $( "#input-task" ).val();
    	if (task !== "") {
    		$( "#input-task" ).val("");
      	addNewTask(task);
    	  add_blacklist(task);
        chrome.tabs.query({url: "*://www.facebook.com/*"}, function(tab_list) {
          for (var i = 0; i < tab_list.length; i++) {
            chrome.tabs.sendRequest(tab_list[i].id, {blacklistEntered: true});
          }
        });
      }
    }
	});
});
