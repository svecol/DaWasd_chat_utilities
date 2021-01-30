// ==UserScript==
// @name         wasd observe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://wasd.tv/daria_kaplan
// @grant        none
// ==/UserScript==

//TODO already a link
//TODO RickRoll
function pollDOM () {
  const el = document.getElementsByClassName("block__messages")

  if (el.length) {

var block_messages = document.getElementsByClassName("block__messages")[0];

document.styleSheets[0].insertRule('a.dawg_wasd:active {background-color: blue;}');
document.styleSheets[0].insertRule('a.dawg_wasd:hover {background-color: red;}');
document.styleSheets[0].insertRule('a.dawg_wasd:visited {background-color: green;}');
document.styleSheets[0].insertRule('a.dawg_wasd {background-color: lime;}');

function norm_link_html(link) {
    link = link.replace(/https?:\/\//i, '');
    link = link.replace(/\bwww\./i, '');
    let label = link.slice(0, 20) + '...';
    return '<a href="https://' + link + '" class="dawg_wasd" target="_blank">' + label + '</a>';
}

var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var added_message = mutation.addedNodes[0];
        var message_spans = added_message.getElementsByTagName("span");
        if(message_spans.length > 0) {
            var text = message_spans[0].innerText;
            console.log(message_spans[0].innerText);
            // if there is aleready a link
            if(text.search(/https?:\/\//i) > -1){
                ;//https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*
                console.log('im in');
                let url_reg = /(https?:\/\/[-a-zA-Z0-9@:%_\+~#=]{0,256})\s+([-a-zA-Z0-9@:%._\+~#=]{0,256}\.[a-zA-Z]{1,6}[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/igm
                text = text.replaceAll(url_reg, function(match, p1, p2, offset, input_string) {
                    console.log(match, p1, p2, offset, input_string);
                    return norm_link_html(p1+p2);
                });
            } else {
                let url_reg = /[a-zA-Z]{2}[-a-zA-Z0-9@:%._\+~#=]{0,256}\.[a-zA-Z]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/igm
                text = text.replaceAll(url_reg, function(match, contents, offset, input_string) {
                    return norm_link_html(match);
                }); //"");

            }
            message_spans[0].innerHTML = text;
        }
        //console.log(mutation);
    });
});

mutationObserver.observe(block_messages, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: false,
    attributeOldValue: false,
    characterDataOldValue: false
});
  } else {
      setTimeout(pollDOM, 2000); // try again in 300 milliseconds
  }
}

pollDOM();
