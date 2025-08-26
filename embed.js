(function () {
  const DEFAULTS = {
    webhookUrl: "",                 // <-- REQUIRED: your n8n/Zapier webhook
    title: "Assistant",
    greet: "👋 Hi! Ask me anything.",
    position: "right",              // "right" | "left"
    zIndex: 999999,
    accent: "#16a34a",
    headerBg: "#ffffff",
    headerText: "#111827",
    panelBg: "#ffffff",
    border: "#e5e7eb",
    text: "#111827",
    subtext: "#6b7280",
    userBubble: "#16a34a",
    userText: "#ffffff",
    userBorder: "#15803d",
    botBubble: "#f3f4f6",
    botText: "#111827",
    botBorder: "#e5e7eb",
    avatarBg: "#374151",
    avatarText: "#ffffff",
    corner: 16,
    width: 360,
    height: 520,
    storageKey: "cw_chat_messages_v1",
    headers: { "Content-Type": "application/json" },
    messageKey: "message",
    parse: null
  };

  function css(opts) {
    const c = (k) => opts[k];
    return `
      *{box-sizing:border-box;font-family:Inter,system-ui,Segoe UI,Roboto,sans-serif}
      .cw-wrap{position:fixed;bottom:16px;${opts.position==="left"?"left":"right"}:16px;z-index:${opts.zIndex}}
      .cw-btn{width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.18);background:${c("accent")};color:#fff;font-weight:800}
      .cw-panel{position:absolute;bottom:72px;${opts.position==="left"?"left":"right"}:0;width:${opts.width}px;height:${opts.height}px;border:1px solid ${c("border")};border-radius:${opts.corner}px;overflow:hidden;background:${c("panelBg")};box-shadow:0 22px 60px rgba(0,0,0,.18);display:none}
      .cw-open .cw-panel{display:flex;flex-direction:column}
      .cw-header{height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 12px 0 10px;background:${c("headerBg")};color:${c("headerText")};border-bottom:1px solid ${c("border")}}
      .cw-brand{display:flex;align-items:center;gap:10px}
      .cw-ava{width:28px;height:28px;border-radius:10px;background:${c("avatarBg")};color:${c("avatarText")};display:flex;align-items:center;justify-content:center;font-size:14px}
      .cw-title{margin:0;font-weight:700}
      .cw-close{border:1px solid ${c("border")};background:#fff;border-radius:8px;width:32px;height:32px;cursor:pointer;color:${c("avatarBg")}}
      .cw-body{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#fff}
      .cw-welcome{margin:auto;text-align:center;padding:18px;border:1px dashed ${c("border")};border-radius:${opts.corner}px;color:${c("subtext")};max-width:260px}
      .cw-row{display:flex}
      .cw-row.user{justify-content:flex-end}
      .cw-msgwrap{display:flex;gap:8px;align-items:flex-start;max-width:76%}
      .cw-row.user .cw-msgwrap{flex-direction:row-reverse}
      .cw-avatar{width:28px;height:28px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;background:${c("avatarBg")}}
      .cw-bubble{padding:10px 12px;border-radius:14px;border:1px solid;box-shadow:0 8px 20px rgba(0,0,0,.06)}
      .cw-bot{background:${c("botBubble")};color:${c("botText")};border-color:${c("botBorder")};border-bottom-left-radius:8px}
      .cw-user{background:${c("userBubble")};color:${c("userText")};border-color:${c("userBorder")};border-bottom-right-radius:8px}
      .cw-time{margin-top:6px;font-size:11px;color:${c("subtext")}}
      .cw-input{border-top:1px solid ${c("border")};padding:10px;background:#fff}
      .cw-box{display:flex;gap:8px;align-items:flex-end;border:1px solid ${c("border")};border-radius:12px;padding:8px;background:#fff}
      textarea{flex:1;border:0;outline:none;background:transparent;resize:none;min-height:42px;max-height:120px}
      .cw-send{border:0;border-radius:10px;padding:10px 12px;background:${c("accent")};color:#fff;font-weight:700;cursor:pointer}
      .cw-mic {
        border: 0;
        border-radius: 10px;
        padding: 10px 12px;
        background: #16a34a;  /* stays green */
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        position: relative;
      }
      .cw-mic.recording {
        animation: pulse 1.5s infinite;
      }
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(22,163,74, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(22,163,74, 0); }
        100% { box-shadow: 0 0 0 0 rgba(22,163,74, 0); }
      }
      .cw-typing{display:flex;gap:6px;padding:8px 10px}
      .cw-dot{width:8px;height:8px;border-radius:50%;background:${c("subtext")};animation:cw-b 1.4s infinite both}
      .cw-dot:nth-child(2){animation-delay:.1s}.cw-dot:nth-child(3){animation-delay:.2s}
      @keyframes cw-b{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
      @media (max-width: 420px){ .cw-panel{width:calc(100vw - 32px);height:70vh} }
    `;
  }

  function safeString(v) {
    try {
      if (v == null) return "";
      if (typeof v === "string") return v;
      if (typeof v === "number" || typeof v === "boolean") return String(v);
      if (Array.isArray(v)) return safeString(v[0] ?? "");
      if (typeof v === "object") {
        if (v.reply || v.message || v.text) return v.reply || v.message || v.text;
        try { return JSON.stringify(v); } catch { return String(v); }
      }
      return String(v);
    } catch { return ""; }
  }

  function escapeHtml(s) {
    const str = safeString(s);
    return str.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  function extractText(payload, parseOpt) {
    try {
      if (typeof parseOpt === "function") {
        const out = parseOpt(payload);
        return safeString(out);
      }
      return safeString(payload);
    } catch {
      return "Sorry, I couldn’t read that response.";
    }
  }

  function time() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function load(storageKey) {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; }
  }
  function save(storageKey, data) {
    try { localStorage.setItem(storageKey, JSON.stringify(data.slice(-100))); } catch {}
  }

  function create(el, attrs, html) {
    const e = document.createElement(el);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
    if (html != null) e.innerHTML = html;
    return e;
  }

  function mount(opts) {
    if (!opts.webhookUrl) {
      console.error("[ChatWidget] Missing webhookUrl");
      return;
    }

    // Root & Shadow DOM
    const host = create("div");
    const shadow = host.attachShadow({ mode: "open" });
    const wrap = create("div", { class: "cw-wrap" });
    const style = create("style"); style.textContent = css(opts);

    const btn = create("button", { class: "cw-btn", title: "Chat" }, "💬");

    const panel = create("div", { class: "cw-panel" });
    const header = create("div", { class: "cw-header" });
    header.innerHTML = `
      <div class="cw-brand">
        <div class="cw-ava">🤖</div>
        <h4 class="cw-title">${opts.title}</h4>
      </div>
      <button class="cw-close" title="Close">×</button>
    `;

    const body = create("div", { class: "cw-body" });
    const inputWrap = create("div", { class: "cw-input" });
    inputWrap.innerHTML = `
      <div class="cw-box">
        <textarea placeholder="Write a message…" rows="1"></textarea>
        <button class="cw-mic" title="Speak">🎤</button>
        <button class="cw-send" title="Send">➤</button>
      </div>
    `;

    panel.appendChild(header); panel.appendChild(body); panel.appendChild(inputWrap);
    wrap.appendChild(btn); wrap.appendChild(panel);
    shadow.appendChild(style); shadow.appendChild(wrap);
    document.body.appendChild(host);

    let messages = load(opts.storageKey);
    if (messages.length === 0 && opts.greet) {
      messages.push({ id: Date.now(), from: "bot", text: opts.greet, time: time() });
      save(opts.storageKey, messages);
    }

    function render() {
      body.innerHTML = "";
      const hasUser = messages.some(m => m.from === "user");
      if (!hasUser && opts.greet) {
        const w = create("div", { class: "cw-welcome" }, escapeHtml(opts.greet || "Welcome 👋"));
        body.appendChild(w);
      }
      messages.forEach(m => {
        const row = create("div", { class: "cw-row " + (m.from === "user" ? "user" : "bot") });
        const group = create("div", { class: "cw-msgwrap" });
        const av = create("div", { class: "cw-avatar" }, m.from === "user" ? "👤" : "🤖");
        const bubble = create("div", { class: "cw-bubble " + (m.from === "user" ? "cw-user" : "cw-bot") });
        if (m.typing) {
          bubble.innerHTML = `<div class="cw-typing"><div class="cw-dot"></div><div class="cw-dot"></div><div class="cw-dot"></div></div>`;
        } else {
          const html = `<div>${escapeHtml(m.text)}</div><div class="cw-time">${m.time}</div>`;
          bubble.innerHTML = html;
        }
        group.appendChild(av); group.appendChild(bubble);
        row.appendChild(group); body.appendChild(row);
      });
      body.scrollTop = body.scrollHeight;
    }

    render();

    const closeBtn = header.querySelector(".cw-close");
    const textarea = inputWrap.querySelector("textarea");
    const sendBtn = inputWrap.querySelector(".cw-send");
    const micBtn = inputWrap.querySelector(".cw-mic");

    function toggle() {
      wrap.classList.toggle("cw-open");
      if (wrap.classList.contains("cw-open")) setTimeout(() => textarea.focus(), 80);
    }

    btn.addEventListener("click", toggle);
    closeBtn.addEventListener("click", toggle);

    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";
    });

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    });
    sendBtn.addEventListener("click", send);

    // ---- Speech-to-Text ----
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      micBtn.addEventListener("click", () => {
        if (micBtn.classList.contains("recording")) {
          recognition.stop();
          micBtn.classList.remove("recording");
        } else {
          textarea.value = "";
          recognition.start();
          micBtn.classList.add("recording");
        }
      });

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }
        textarea.value = finalTranscript + interimTranscript;
      };

      recognition.onerror = () => {
        micBtn.classList.remove("recording");
      };
      recognition.onend = () => {
        micBtn.classList.remove("recording");
      };
    } else {
      micBtn.style.display = "none";
    }

    // ---- Send Function ----
    let sending = false;
    async function send() {
      if (sending) return;
      const text = textarea.value.trim();
      if (!text) return;

      const now = time();
      messages.push({ id: Date.now(), from: "user", text, time: now });
      render(); textarea.value = ""; textarea.style.height = "42px";

      const tid = "t-" + Date.now();
      messages.push({ id: tid, from: "bot", text: "", time: now, typing: true });
      render();

      sending = true;
      try {
        const history = messages.filter(m => !m.typing).map(({ from, text, time }) => ({ from, text: safeString(text), time }));
        const payload = { [opts.messageKey]: text, history };
        const h = opts.headers || { "Content-Type": "application/json" };
        const ct = (h["Content-Type"] || h["content-type"] || "application/json").toLowerCase();
        let body;
        if (ct.includes("application/x-www-form-urlencoded")) {
          const p = new URLSearchParams();
          p.set(opts.messageKey, text);
          p.set("history", JSON.stringify(history));
          body = p.toString();
        } else {
          body = JSON.stringify(payload);
        }
        const res = await fetch(opts.webhookUrl, { method: "POST", headers: h, body });
        const rct = (res.headers.get("content-type") || "").toLowerCase();
        let data;
        try { data = rct.includes("application/json") ? await res.json() : await res.text(); }
        catch { data = await res.text(); }
        messages = messages.filter(m => m.id !== tid);
        const reply = extractText(data, opts.parse);
        messages.push({ id: Date.now() + 1, from: "bot", text: reply || "(empty response)", time: time() });
      } catch {
        messages = messages.filter(m => m.id !== tid);
        messages.push({ id: Date.now() + 2, from: "bot", text: "Sorry, I couldn't reach the server.", time: time() });
      } finally {
        save(opts.storageKey, messages);
        render();
        sending = false;
      }
    }
  }

  window.ChatWidget = {
    init: function (options) {
      const opts = Object.assign({}, DEFAULTS, options || {});
      mount(opts);
    }
  };
})();
