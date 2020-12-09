(function () {
    var getParams = function (url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };
    var hrefs = document.getElementsByClassName('_99s5');
    var logos_object = {
        "sx_7c9968": "Facebook",
        "sx_79cdb4": "Instagram",
        "sx_7db118": "Audience Network",
        "sx_4be4f2": "Messenger"
    };
    var data = '';
    var length = hrefs.length;
    for (var i = 0; i < length; i++) {
        var parentEl = hrefs[i];
        var obj = {};
        obj.date = parentEl.querySelector('div ._9cd3').innerHTML.replace('Started running on ', '');
        obj.status = parentEl.querySelector('div ._9cd2').innerHTML;
        obj.logos = [];
        var logEl = parentEl.querySelectorAll('._2fyi span i');
        for (var j = 0; j < logEl.length; j++) {
            var _lcls = logEl[j].getAttribute('class').split(' ');
            for (var k = _lcls.length - 1; k >= 0; k--) {
                if (logos_object[_lcls[k]]) {
                    obj.logos[j] = logos_object[_lcls[k]];
                    break;
                }
            }
        }
        try {
            var aurl = parentEl.querySelector('._4yee').getAttribute('href');
        } catch (e) {
            continue;
        }
        if (typeof aurl == "undefined") {
            continue;
        }
        var urlParams = getParams(aurl);
        if (typeof urlParams.u == "undefined") {
            continue;
        }
        var url = new window.URL(urlParams['u']);
        url.searchParams.delete('fbclid');
        obj.url = url.toString();
        data += JSON.stringify(obj) + '\n';
    }
    console.log(data);
})();
