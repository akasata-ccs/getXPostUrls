setTimeout(() => {
    if (!list) var list = [];
    // c = document.cookie.match(/bookmark_list=(.*?);/)
    c = sessionStorage.getItem("bookmark_list");
    if (c) list.push(...c.split(","));
    $ce = (n) => document.createElement(n);
    $qs = (n) => document.querySelector(n);
    tb = () => `URLリストを収集：${list.length}件`
    d = $ce("div");
    b1 = $ce("button");
    b2 = $ce("button");
    b3 = $ce("button");
    b1.innerText = tb();
    b2.innerText = "コピー";
    b3.innerText = "クリア";
    d.style.display = 'grid';
    d.style.gridTemplateColumns = '6fr 2fr 1fr';
    d.style.columnGap = '5px';
    d.appendChild(b1)
    d.appendChild(b2)
    d.appendChild(b3)
    $qs('div[aria-label="ホームタイムライン"]>div').appendChild(d);
    a = c => Array.from(c);
    b1.addEventListener("click", async () => {
        el = $qs('div[aria-label="\u30bf\u30a4\u30e0\u30e9\u30a4\u30f3: \u30d6\u30c3\u30af\u30de\u30fc\u30af"]');
        if (el) {
            e = a(el.children[0].children);
            list.push(...e.map(c => c.querySelectorAll('a[href*="/status/"]')[0]).filter(c => c).map(c => c.href));
            l = a(new Set(list));
            b1.innerText = tb();
            e.map(c => c.querySelector('button[data-testid="removeBookmark"]')).filter(c => c).forEach(c => c.click());
            // document.cookie = "bookmark_list=" + l.join(",") + "; max-age=3600";
            sessionStorage.setItem("bookmark_list", l.join(","));
        }
    });
    b2.addEventListener("click", async () => {
        l = a(new Set(list));
        await navigator.clipboard.writeText(l.join("\n") + "\n").then(() => {
            b2.innerText = 'copied!';
            setTimeout(() => {
                b2.innerText = 'コピー';
            }, 1000);
        })
    })
    b3.addEventListener("click", async () => {
        // document.cookie = "bookmark_list=deleted; max-age=1";
        sessionStorage.removeItem("bookmark_list");
        list.length = 0;
        b1.innerText = tb()
    })

}, 2000);
