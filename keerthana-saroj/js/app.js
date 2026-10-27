(() => {
  const SITE = window.SITE;
  const $ = (id) => document.getElementById(id);

  const formatLong = (iso) => {
    if (!iso) return "Date to be announced";
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const formatTime = (t) => {
    if (!t) return "";
    const m = String(t).match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return t;
    let h = Number(m[1]);
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m[2]} ${ap}`;
  };

  const featuredEvent = () => {
    const withDate = SITE.events.filter((e) => e.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcoming = withDate.find((e) => new Date(`${e.date}T00:00:00`) >= today);
    return upcoming || withDate[withDate.length - 1] || SITE.events[0];
  };

  const openEnvelope = () => {
    $("envelope").classList.add("is-open");
    document.documentElement.classList.remove("no-scroll");
    sessionStorage.setItem("ks-opened", "1");
  };

  if (!sessionStorage.getItem("ks-opened")) {
    document.documentElement.classList.add("no-scroll");
  } else {
    $("envelope").classList.add("is-open");
  }

  $("open-invite").addEventListener("click", openEnvelope);

  const featured = featuredEvent();
  $("hero-date").textContent = featured.date
    ? `${formatLong(featured.date)}${featured.time ? " · " + formatTime(featured.time) : ""}`
    : `${featured.title} · details soon`;
  $("invite-kicker").textContent = SITE.invitation.kickerEn;
  $("invite-te").textContent = SITE.invitation.kickerTe;
  $("invite-letter").textContent = SITE.invitation.letter;
  $("invite-when").textContent = featured.date ? formatLong(featured.date) : "Date to be announced";
  $("invite-close").textContent = SITE.invitation.closing;

  const tick = () => {
    const el = $("countdown");
    if (!featured.date) {
      el.innerHTML = `<div class="count"><b>—</b><span>soon</span></div>`;
      return;
    }
    const end = new Date(`${featured.date}T${featured.time || "00:00"}:00`);
    const now = new Date();
    let diff = end - now;
    if (diff <= 0) {
      el.innerHTML = `<div class="count" style="min-width:auto;padding:12px 22px"><b>Today</b><span>${featured.title}</span></div>`;
      return;
    }
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff - mins * 60000) / 1000);
    el.innerHTML = [
      [days, "days"],
      [hours, "hours"],
      [mins, "mins"],
      [secs, "secs"]
    ]
      .map(([n, l]) => `<div class="count"><b>${String(n).padStart(2, "0")}</b><span>${l}</span></div>`)
      .join("");
  };
  tick();
  setInterval(tick, 1000);

  const { bride, groom } = SITE.couple;
  $("couple-grid").innerHTML = [bride, groom]
    .map(
      (p) => `
      <article class="person">
        <img src="${p.image}" alt="${p.full}" />
        <div class="person-body">
          <p class="kicker">${p === bride ? "The bride" : "The groom"}</p>
          <h3>${p.full}</h3>
          <p class="telugu" lang="te">${p.telugu}</p>
          <p>${p.note}</p>
        </div>
      </article>`
    )
    .join("");

  $("event-grid").innerHTML = SITE.events
    .map((e) => {
      const soon = !e.date;
      const rows = [
        ["Date", e.date ? formatLong(e.date) : "To be announced"],
        ["Time", e.time ? formatTime(e.time) : "To be announced"],
        ["Venue", e.venue || "To be announced"],
        e.address ? ["Address", e.address] : null,
        e.dress ? ["Dress", e.dress] : null
      ].filter(Boolean);
      return `
        <article class="event-card ${soon ? "soon" : ""}">
          <span class="badge">${soon ? "Coming soon" : e.status === "completed" ? "Completed" : "Upcoming"}</span>
          <p class="kicker">${e.kicker}</p>
          <p class="telugu" lang="te">${e.kickerTe}</p>
          <h3>${e.title}</h3>
          <div class="event-meta">
            ${rows.map(([k, v]) => `<div><span class="dot">✦</span><span><strong>${k}:</strong> ${v}</span></div>`).join("")}
          </div>
          <p>${e.notes || ""}</p>
          ${e.mapUrl ? `<p style="margin-top:14px"><a class="btn btn-ghost" href="${e.mapUrl}" target="_blank" rel="noopener">Open map</a></p>` : ""}
        </article>`;
    })
    .join("");

  $("timeline").innerHTML = SITE.plans
    .map((p) => {
      const when = [p.date ? formatLong(p.date) : "Date soon", p.time].filter(Boolean).join(" · ");
      return `
        <article class="plan">
          <p class="when">${when}</p>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
        </article>`;
    })
    .join("");

  $("loc-grid").innerHTML = SITE.locations
    .map(
      (l) => `
      <article class="loc-card">
        <p class="kicker">${l.role}</p>
        <h3>${l.name}</h3>
        <p>${l.address}</p>
        <p style="margin-top:8px;color:var(--muted)">${l.note || ""}</p>
        ${l.mapUrl ? `<p style="margin-top:14px"><a class="btn btn-ghost" href="${l.mapUrl}" target="_blank" rel="noopener">Open in maps</a></p>` : ""}
      </article>`
    )
    .join("");

  $("gallery-grid").innerHTML = SITE.gallery
    .map(
      (g) => `
      <button type="button" data-src="${g.src}" data-alt="${g.alt}">
        <img src="${g.src}" alt="${g.alt}" />
        <p class="caption">${g.caption}</p>
      </button>`
    )
    .join("");

  const renderVideos = () => {
    if (!SITE.videos.length) {
      $("video-grid").innerHTML = `
        <div class="empty">
          <h3>Films will premiere here</h3>
          <p>Live ceremony links, highlight reels and any video from the wedding day will be posted in this section.</p>
        </div>`;
      return;
    }
    $("video-grid").innerHTML = SITE.videos
      .map((v) => {
        const yt = String(v.url || "").match(/(?:youtu\.be\/|v=)([\w-]{6,})/);
        const embed = yt ? `https://www.youtube.com/embed/${yt[1]}` : v.url;
        return `
          <article class="video-card">
            <h3>${v.title}</h3>
            <p>${v.caption || ""}</p>
            ${
              yt
                ? `<div style="margin-top:12px;aspect-ratio:16/9"><iframe src="${embed}" title="${v.title}" style="width:100%;height:100%;border:0" allowfullscreen></iframe></div>`
                : `<p style="margin-top:12px"><a class="btn btn-ghost" href="${v.url}" target="_blank" rel="noopener">Open video</a></p>`
            }
          </article>`;
      })
      .join("");
  };
  renderVideos();

  $("update-grid").innerHTML = SITE.updates
    .map(
      (u) => `
      <article class="update-card">
        <time datetime="${u.date}">${formatLong(u.date)}</time>
        <h3>${u.title}</h3>
        <p>${u.body}</p>
      </article>`
    )
    .join("");

  const blessKey = "ks-blessings";
  const savedBlessings = JSON.parse(localStorage.getItem(blessKey) || "[]");
  const allBlessings = [...SITE.blessings, ...savedBlessings];
  const renderBless = () => {
    $("bless-list").innerHTML = allBlessings
      .map(
        (b) => `
        <article class="blessing">
          <p>“${b.message}”</p>
          <cite>— ${b.from}</cite>
        </article>`
      )
      .join("");
  };
  renderBless();
  $("bless-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const from = $("bless-name").value.trim();
    const message = $("bless-msg").value.trim();
    if (!from || !message) return;
    const entry = { from, message };
    savedBlessings.unshift(entry);
    allBlessings.unshift(entry);
    localStorage.setItem(blessKey, JSON.stringify(savedBlessings));
    $("bless-form").reset();
    renderBless();
  });

  const header = $("header");
  const onScroll = () => header.classList.toggle("solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const menu = $("menu");
  $("menu-toggle").addEventListener("click", () => menu.classList.add("open"));
  $("menu-close").addEventListener("click", () => menu.classList.remove("open"));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("open")));

  const share = async () => {
    const url = SITE.siteUrl || location.href.split("#")[0];
    const text = `You're invited to the Nischitartham of Keerthana Ippili & Saroj Narayana — Thursday, 29 October 2026, 7:50 AM, Anandamayi Function Hall, Srikakulam.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Keerthana & Saroj Narayana", text, url });
        return;
      }
    } catch (_) {}
    const wa = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
    window.open(wa, "_blank", "noopener");
  };
  $("share-btn").addEventListener("click", share);
  $("share-footer").addEventListener("click", share);

  $("add-cal").addEventListener("click", () => {
    const ev = featured.date ? featured : SITE.events[0];
    if (!ev.date) return;
    const dateStamp = ev.date.replace(/-/g, "");
    const hasTime = /^\d{2}:\d{2}$/.test(ev.time || "");
    const start = hasTime ? `${dateStamp}T${ev.time.replace(":", "")}00` : dateStamp;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Keerthana Saroj Narayana//Invitation//EN",
      "BEGIN:VEVENT",
      hasTime ? `DTSTART;TZID=Asia/Kolkata:${start}` : `DTSTART;VALUE=DATE:${start}`,
      hasTime ? `DTEND;TZID=Asia/Kolkata:${dateStamp}T140000` : "",
      `SUMMARY:${ev.title} of Keerthana Ippili & Saroj Narayana`,
      `DESCRIPTION:${ev.notes || "Details at the invitation website."}`,
      ev.venue ? `LOCATION:${[ev.venue, ev.address].filter(Boolean).join(", ")}` : "",
      "END:VEVENT",
      "END:VCALENDAR"
    ]
      .filter(Boolean)
      .join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "keerthana-saroj-narayana.ics";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  const lightbox = $("lightbox");
  $("gallery-grid").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    $("lightbox-img").src = btn.dataset.src;
    $("lightbox-img").alt = btn.dataset.alt || "";
    lightbox.classList.add("open");
  });
  const closeLb = () => lightbox.classList.remove("open");
  $("lightbox-close").addEventListener("click", closeLb);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLb();
      menu.classList.remove("open");
    }
  });
})();
