var tdna = new TypingDNA();
var quote1 = 'I think I\'ve become a much better singer and a much better player. Years and years of playing a couple of hours every day will do that.';
var quote2 = 'When you discover your mission, you will feel its demand. It will fill you with enthusiasm and a burning desire to get to work on it.';

/** basic highlighting function for the text to be typed */
function highlight(highlightedParagraph, toTypeParagraph, quoteId, sender) {
    var currentQuote = quoteId === 1 ? quote1 : quote2;
    var len = sender ? sender.value.length : 0;
    var highlighted = document.getElementById(highlightedParagraph);
    var toType = document.getElementById(toTypeParagraph);
    if (highlighted) {
        highlighted.innerHTML = currentQuote.slice(0, len);
    }
    if (toType) {
        toType.innerHTML = currentQuote.slice(len);
    }
    var stackLength = getStackLen();
    if (len > currentQuote.length * 0.9 &&
        stackLength &&
        stackLength > currentQuote.length * 0.9) {
        tdna.patternValid = true;
    } else {
        tdna.patternValid = false;
    }
}

function getStackLen() {
    if (!TypingDNA ||
        !TypingDNA.history ||
        !TypingDNA.history.stack) {
        return null;
    }
    return TypingDNA.history.stack.length
}


/** adds a class to the DOM element */
function addClass(element, className) {
    if (element && element.className.search(new RegExp('\\b' + className + '\\b')) === -1) {
        element.className += ' ' + className + ' ';
    }
}

/** removes a class from the DOM element */
function removeClass(element, className) {
    if (element) {
        element.className = element.className.replace(new RegExp('\\b' + className + '\\b'), '');
    }
}

function startRecording(sender) {
    var len = sender ? sender.value.length : 0;
    if (len === 0) {
        tdna.reset();
        tdna.start();
    }
}

function saveRecording(sender, patternId) {
    tdna['pattern' + patternId] = tdna.getTypingPattern({type: 0, length: 150});
}
