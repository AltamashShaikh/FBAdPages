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
        "sx_0800b2": "Facebook",
        "sx_7ec8d4": "Instagram",
        "sx_8a5fa4": "Audience Network",
        "sx_79eef9": "Messenger"
    };
    var data = '';
    var length = hrefs.length;
    for (var i = 0; i < length; i++) {
        var parentEl = hrefs[i];
        var obj = {};
        obj.date = parentEl.querySelector('div ._9cd3 span').innerHTML.replace('Started running on ', '');
        obj.ad_id = parentEl.querySelector('div ._9cd3 ._4rhp').innerHTML.replace('ID: ', '');
        obj.status = parentEl.querySelector('div ._9cd2').innerHTML;
        obj.acn = '';
        if(parentEl.querySelector('div ._7jyr')){
            obj.acn = parentEl.querySelector('div ._7jyr').innerText; 
        }
        
        obj.logos = [];
        var logEl = parentEl.querySelectorAll('._2fyi span i');
        for (var j = 0; j < logEl.length; j++) {
            var _lcls = logEl[j].getAttribute('class').split(' ');
            for (var k = _lcls.length - 1; k >= 0; k--) {
                if (logos_object[_lcls[k]]) {
                    obj.logos[j] = logos_object[_lcls[k]];
                    break;
                } else{
                    obj.logos[j] = _lcls[k];
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
