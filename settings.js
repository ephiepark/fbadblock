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

