this.DocumentUp = {}, DocumentUp.document = function (a) {
    var b;
    "string" == typeof a ? (b = a, a = null) : (b = a.repo, delete a.repo), window.callback = function (b) {
        b.status === 200 && (document.open(), document.write(b.html), document.close(), a && a.afterRender && typeof a.afterRender == "function" && a.afterRender())
    };
    var c = document.createElement("script");
    c.src = "http://documentup.com/" + b, a ? c.src += "?config=" + encodeURIComponent(JSON.stringify(a)) + "&callback=callback" : c.src += "?callback=callback", document.getElementsByTagName("head")[0].appendChild(c)
}

