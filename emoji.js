$(document).on("click", "#emoji-picker", function(e) {
    e.stopPropagation();
    $('.intercom-composer-emoji-popover').toggleClass("active");
});

$(document).click(function(e) {
    if ($(e.target).attr('class') != '.intercom-composer-emoji-popover' && $(e.target).parents(".intercom-composer-emoji-popover").length == 0) {
        $(".intercom-composer-emoji-popover").removeClass("active");
    }
});

$(document).on("click", ".intercom-emoji-picker-emoji", function(e) {
    var text = $("#test-emoji").text();
    var textLength = text.length;
    var newText = "";
    for (var i = 0; i <= textLength; i++) {
        if (mousecursor === i) {
            newText += $(this).html();
            newText += text.substring(i, i + 1);
        } else if (i === 0) {
            newText += text.substring(i, i + 1);
        } else {
            newText += text.substring(i, i + 1);
        }
    }
    $("#test-emoji").text(newText);
});

$('.intercom-composer-popover-input').on('input', function() {
    var query = this.value;
    if (query != "") {
        $(".intercom-emoji-picker-emoji:not([title*='" + query + "'])").hide();
    } else {
        $(".intercom-emoji-picker-emoji").show();
    }
});
var mousecursor = 0;

$(document).ready(function() {

    $("#test-emoji").keypress(function() {
        mousecursor = getCaretPosition(this) + 1;
    });

    $("#test-emoji").mouseup(function() {
        mousecursor = getCaretPosition(this);
    });

});

function getCaretPosition(editableDiv) {
    var caretPos = 0,
        sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}