setTimeout(() => {
    if (!list) var list = [];
    // c = document.cookie.match(/media_list=(.*?);/)
    // c = sessionStorage.getItem("media_list");
    // if (c) list.push(...c.split(","));
    $ce = (n) => document.createElement(n);
    $qs = (n) => document.querySelector(n);
    tb = (n) => `URLリストを収集：${n}件`
    d = $ce("div");
    b1 = $ce("button");
    b2 = $ce("button");
    b3 = $ce("button");
    b1.innerText = tb(0);
    b2.innerText = "コピー";
    b3.innerText = "クリア";
    d.style.display = 'grid';
    d.style.gridTemplateColumns = '6fr 2fr 1fr';
    d.style.columnGap = '5px';
    d.appendChild(b1)
    d.appendChild(b2)
    d.appendChild(b3)
    $qs('div[aria-label$="タイムライン"]>div').appendChild(d);
    a = c => Array.from(c);
    b1.addEventListener("click", async () => {
        el = $qs('div[aria-label$="メディア"]');
        if (el) {
            e = a(el.querySelectorAll('li[role="listitem"]'));
            list.push(...e.map(i => i.querySelector('a[href*="/status/"')).filter(i => i).map(i => i.href.replace(/\/photo.*/, '')));
            l = a(new Set(list));
            window.scrollTo(0, list.length * 200);
            b1.innerText = tb(Array.from(new Set(list)).length);
            e.map(c => c.querySelector('button[data-testid="removeBookmark"]')).filter(c => c).forEach(c => c.click());
            // document.cookie = "media_list=" + l.join(",") + "; max-age=3600";
            // sessionStorage.setItem("media_list", l.join(","));
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
        // document.cookie = "media_list=deleted; max-age=1";
        // sessionStorage.removeItem("media_list");
        list.length = 0;
        b1.innerText = tb(0)
    })

}, 2000);
