
var Phantom = require("phantom");

function capture(url, selector, output) {

  Phantom.create(function(phantom) {

    phantom.createPage(function(page) {

      page.open(url, function(status) {
        page.evaluate(function (_selector) {
          return document.getElementById(_selector).getBoundingClientRect()
          // ^^ needs error handling.
        }, function(section) {

          page.clipRect = {
              top:    section.top,
              left:   section.left,
              width:  section.width,
              height: section.height
          };

          page.render(output || 'captures/capture.png');

          phantom.exit();

        }, selector);

      });
    });
  });

}

capture("http://news.ycombinator.com", "hnmain", "captures/hn.png");
