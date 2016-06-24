/*
$(function() {
    $("#dddd").click(function() {
        chrome.storage.local.set({'value': 'ccccc'}, function() {
            // Notify that we saved.
            console.log('Settings saved');
        });
        chrome.storage.local.set({'another_value': 'dddd'}, function() {
            console.log('ddd');
        });
    });
    $("#cccc").click(function() {
        var _this = this;
        chrome.storage.local.get('value', function(object) {
            // Notify that we saved.
            $(_this).append("<div>" + object['value'] + "</div>");
            $(_this).append("<div>" + object['another_value'] + "</div>");
        });
    });
});
*/

var add_blacklist = function(phrase) {
    chrome.storage.local.get('blacklist', function(object) {
        var blacklist = object['blacklist'];
        if (object == null) {
            blacklist = "";    
        }
        blacklist = blacklist + "||" + phrase;
        chrome.storage.local.set({'blacklist': blacklist}, function() {
            console.log("success");
        });
    });
};

var remove_blacklist = function(phrase) {
    chrome.storage.local.get('blacklist', function(object) {
        var blacklist_str = object['blacklist'];
        var blacklist = blacklist_str.split("||");
        blacklist_str = "";
        for (var i = 0; i < blacklist.length; i++) {
            if (blacklist[i] != phrase) {
                blacklist_str = blacklist_str + "||";
            }
        }
        
        chrome.storage.local.set({'blacklist': blacklist}, function() {
            console.log("success");
        });
    });
};

var id = 0;
function Task(task) {
	this.id = id++;
	this.task = task;
	this.createLi = function() {
    //<li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
		var li = $( "<li class='collection-item' id='" + this.id + "'>" +
                  "<div>" + this.task +

                    /*
                    "<input type='checkbox' class='filled-in' id='filled-in-box' checked='checked' />" +
                    "<label for='filled-in-box'>" +
                    this.task +
                    "</label>" +
                    */
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
    });

    add_blacklist(task);

  /*
	li.find(".a-task").on("click", function() {
		$( this ).toggleClass("is-done");
	});
  */
};

$( document ).ready(function() {
	$( "#input-task" ).on("keypress", function(e) {
		var key = e.which || e.keyCode;
		if (key === 13) {
			var task = $( "#input-task" ).val();
    	if (task !== "") {
    		$( "#input-task" ).val("");
      	addNewTask(task);
    	}
    }
	});
});
