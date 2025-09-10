(function () {
  const DEFAULTS = {
    webhookUrl: "",
    title: "Assistant",
    greet: "👋 Hi! I’m Kodee, Hostinger AI sales expert 🤖. How can I help you today?",
    position: "right",
    zIndex: 999999,
    accent: "#6d28d9",
    headerBg: "#ffffff",
    headerText: "#111827",
    panelBg: "#ffffff",
    border: "#e5e7eb",
    text: "#111827",
    subtext: "#6b7280",
    userBubble: "linear-gradient(90deg,#9333ea,#6d28d9)",
    userText: "#ffffff",
    userBorder: "transparent",
    botBubble: "#f3f4f6",
    botText: "#111827",
    botBorder: "#e5e7eb",
    avatarBg: "#f3f4f6",
    avatarText: "#111827",
    corner: 16,
    width: 360,
    height: 520,
    storageKey: "cw_chat_messages_v1",
    headers: { "Content-Type": "application/json" },
    messageKey: "message",
    parse: null,
    sendHistory: false
  };

  function css(opts) {
    const c = (k) => opts[k];
    return `
    *{box-sizing:border-box;font-family:Inter,system-ui,Segoe UI,Roboto,sans-serif}
    .cw-wrap{position:fixed;bottom:16px;${opts.position === "left" ? "left" : "right"}:16px;z-index:${opts.zIndex}}
    .cw-btn{width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.18);background:${c("accent")};color:#fff;font-size:20px}
    .cw-panel{position:absolute;bottom:72px;${opts.position === "left" ? "left" : "right"}:0;width:${opts.width}px;height:${opts.height}px;border:1px solid ${c("border")};border-radius:${opts.corner}px;overflow:hidden;background:${c("panelBg")};box-shadow:0 22px 60px rgba(0,0,0,.18);display:none}
    .cw-open .cw-panel{display:flex;flex-direction:column}
    .cw-header{height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;background:${c("headerBg")};color:${c("headerText")};border-bottom:1px solid ${c("border")}}
    .cw-brand{display:flex;align-items:center;gap:10px}
    .cw-ava{width:28px;height:28px;border-radius:50%;background:${c("avatarBg")};color:${c("avatarText")};display:flex;align-items:center;justify-content:center;font-size:14px}
    .cw-title{margin:0;font-weight:700}
    .cw-close {
      border: 1px solid ${c("border")};
      background: #fff;
      border-radius: 8px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      color: #111827;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, color 0.2s;
    }
    .cw-body{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#fff}
    .cw-welcome{
      margin:auto;
      text-align:center;
      padding:24px;
      border:1px dashed ${c("border")};
      border-radius:${opts.corner}px;
      color:${c("subtext")};
      max-width:280px;
      font-size:14px;
      line-height:1.6;
    }
    .cw-row{display:flex}
    .cw-row.user{justify-content:flex-end}
    .cw-msgwrap{display:flex;gap:8px;align-items:flex-start;max-width:80%}
    .cw-row.user .cw-msgwrap{flex-direction:row-reverse}
    .cw-avatar{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;color:${c("avatarText")};background:${c("avatarBg")}}
    .cw-bubble {
      position: relative;
      padding: 8px 10px 18px 10px;
      border-radius: 14px;
      border: 1px solid;
      box-shadow: 0 2px 6px rgba(0,0,0,.06);
      font-size: 13px;
      line-height: 1.4;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
      min-width: 60px;
      max-width: 80%;
    }
    .cw-bubble h1, .cw-bubble h2, .cw-bubble h3, .cw-bubble h4, .cw-bubble h5, .cw-bubble h6 {
      margin: 12px 0 6px 0;
      font-weight: 600;
      line-height: 1.3;
    }
    .cw-bubble h1 { font-size: 18px; }
    .cw-bubble h2 { font-size: 16px; }
    .cw-bubble h3 { font-size: 15px; }
    .cw-bubble h4 { font-size: 14px; }
    .cw-bubble h5 { font-size: 13px; }
    .cw-bubble h6 { font-size: 12px; }
    .cw-bubble h1:first-child, .cw-bubble h2:first-child, .cw-bubble h3:first-child,
    .cw-bubble h4:first-child, .cw-bubble h5:first-child, .cw-bubble h6:first-child {
      margin-top: 0;
    }
    .cw-bubble ul, .cw-bubble ol {
      margin: 10px 0;
      padding-left: 20px;
    }
    .cw-bubble li {
      margin: 3px 0;
      line-height: 1.4;
    }
    .cw-bubble a {
      color: #2563eb;
      text-decoration: underline;
    }
    .cw-bubble a:hover {
      color: #1d4ed8;
    }
    .cw-user a {
      color: #bfdbfe;
    }
    .cw-bubble strong, .cw-bubble b {
      font-weight: 600;
    }
    .cw-bubble em, .cw-bubble i {
      font-style: italic;
    }
    .cw-bubble code {
      background: #f3f4f6;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      color: #e11d48;
    }
    .cw-user code {
      background: rgba(255, 255, 255, 0.2);
      color: #fecaca;
    }
    .cw-bubble pre {
      background: #f3f4f6;
      padding: 12px;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      margin: 10px 0;
      overflow-x: auto;
      border-left: 3px solid #e5e7eb;
    }
    .cw-user pre {
      background: rgba(255, 255, 255, 0.1);
      border-left-color: rgba(255, 255, 255, 0.3);
    }
    .cw-bubble pre code {
      background: none;
      padding: 0;
      color: inherit;
    }
    .cw-bubble p {
      margin: 8px 0;
      line-height: 1.5;
    }
    .cw-bubble p:first-child {
      margin-top: 0;
    }
    .cw-bubble p:last-child {
      margin-bottom: 0;
    }
    .cw-bubble blockquote {
      margin: 10px 0;
      padding: 8px 12px;
      border-left: 3px solid #d1d5db;
      background: #f9fafb;
      font-style: italic;
    }
    .cw-user blockquote {
      border-left-color: rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.1);
    }
    .cw-bubble hr {
      margin: 16px 0;
      border: none;
      border-top: 1px solid #e5e7eb;
    }
    .cw-user hr {
      border-top-color: rgba(255, 255, 255, 0.3);
    }
    .cw-bubble div {
      line-height: 1.5;
    }
    .cw-bot{background:${c("botBubble")};color:${c("botText")};border-color:${c("botBorder")};border-bottom-left-radius:6px}
    .cw-user{background:${c("userBubble")};color:${c("userText")};border-color:${c("userBorder")};border-bottom-right-radius:6px}
    .cw-time {position: absolute;bottom: 4px;right: 8px;font-size: 10px;opacity: 0.8;}
    .cw-row.bot .cw-time {color: ${c("subtext")};}
    .cw-row.user .cw-time{color:rgba(255,255,255,0.85)}
    .cw-input{border-top:1px solid ${c("border")};padding:10px;background:#fff}
    .cw-box{display:flex;gap:8px;align-items:flex-end;border:1px solid ${c("border")};border-radius:12px;padding:8px;background:#fff}
    textarea{flex:1;border:0;outline:none;background:transparent;resize:none;min-height:42px;max-height:120px;font-size:13px}
    .cw-send, .cw-mic {display:flex;align-items:center;justify-content:center;font-size:16px;border:0;border-radius:50%;padding:10px 12px;color:#fff;cursor:pointer}
    .cw-send{background:${c("accent")}}
    .cw-mic{background:#2563eb}
    .cw-mic.recording{background:#1e40af;animation:pulse 1.5s infinite}
    @keyframes pulse {
      0%{box-shadow:0 0 0 0 rgba(37,99,235,0.6);}
      70%{box-shadow:0 0 0 12px rgba(37,99,235,0);}
      100%{box-shadow:0 0 0 0 rgba(37,99,235,0);}
    }
    .cw-typing{display:flex;gap:6px;padding:8px 10px}
    .cw-dot{width:8px;height:8px;border-radius:50%;background:${c("subtext")};animation:cw-b 1.4s infinite both}
    .cw-dot:nth-child(2){animation-delay:.1s}.cw-dot:nth-child(3){animation-delay:.2s}
    @keyframes cw-b{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
    @media (max-width: 420px){
      .cw-panel{width:calc(100vw - 32px);height:70vh}
      .cw-msgwrap{max-width:90%}
      .cw-bubble{font-size:12px}
    }
    `;
  }

  function safeString(v) { try { if (v == null) return ""; if (typeof v === "string") return v; if (typeof v === "number" || typeof v === "boolean") return String(v); if (Array.isArray(v)) return safeString(v[0] ?? ""); if (typeof v === "object") { if (v.reply || v.message || v.text) return v.reply || v.message || v.text; try { return JSON.stringify(v) } catch { return String(v) } } return String(v) } catch { return "" } }
  function escapeHtml(s) { const str = safeString(s); return str.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }
  function extractText(payload, parseOpt) { try { if (typeof parseOpt === "function") { const out = parseOpt(payload); return safeString(out); } return safeString(payload); } catch { return "Sorry, I couldn’t read that response."; } }
  function time() { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
  function load(storageKey) { try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; } }
  function save(storageKey, data) { try { localStorage.setItem(storageKey, JSON.stringify(data.slice(-100))); } catch { } }
  function create(el, attrs, html) { const e = document.createElement(el); if (attrs) Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v)); if (html != null) e.innerHTML = html; return e; }

  function formatMessage(text) {
    if (!text) return '';
    
    // Convert escaped newlines to actual newlines
    let cleanText = text.replace(/\\n/g, '\n');
    
    // Fix malformed markdown by adding proper spacing and formatting
    cleanText = cleanText
      // Fix broken bold formatting (** at start of line)
      .replace(/\n\*\*\s*\n/g, '\n')
      .replace(/\*\*\s*\n([^\n]+:)/g, '**$1')
      // Add line breaks before headers if missing
      .replace(/(.)#/g, '$1\n#')
      // Add line breaks after headers
      .replace(/(#{1,6}[^\n]+)/g, '$1\n')
      // Add line breaks before list items if missing
      .replace(/([^\n])-\s/g, '$1\n- ')
      // Fix contact info formatting
      .replace(/(.)(Address:|Phone:|Email:|Website:)/g, '$1\n$2')
      // Clean up multiple consecutive newlines
      .replace(/\n{3,}/g, '\n\n')
      // Remove leading/trailing whitespace
      .trim();
    
    // Use marked.js to parse markdown
    if (typeof marked !== 'undefined') {
      try {
        return marked.parse(cleanText, {
          breaks: true,
          gfm: true,
          sanitize: false
        });
      } catch (e) {
        console.warn('Marked.js parsing failed:', e);
      }
    }
    
    // Fallback to simple text formatting if marked.js is not available
    return cleanText.replace(/\n/g, '<br>');
  }

  function mount(opts) {
    if (!opts.webhookUrl) { console.error("[ChatWidget] Missing webhookUrl"); return; }

    const host = create("div");
    const shadow = host.attachShadow({ mode: "open" });
    const wrap = create("div", { class: "cw-wrap" });
    const style = create("style"); style.textContent = css(opts);

    const faLink = document.createElement("link");
    faLink.rel = "stylesheet";
    faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";

    const btn = create("button", { class: "cw-btn", title: "Chat" }, "💬");

    const panel = create("div", { class: "cw-panel" });
    const header = create("div", { class: "cw-header" });
    header.innerHTML = `
      <div class="cw-brand">
        <div class="cw-ava"><i class="fas fa-robot"></i></div>
        <h4 class="cw-title">${opts.title}</h4>
      </div>
      <button class="cw-close" title="Close">×</button>
    `;

    const body = create("div", { class: "cw-body" });
    const inputWrap = create("div", { class: "cw-input" });
    inputWrap.innerHTML = `
      <div class="cw-box">
        <textarea placeholder="Write a message…" rows="1"></textarea>
        <button class="cw-mic" title="Speak"><i class="fas fa-microphone"></i></button>
        <button class="cw-send" title="Send"><i class="fas fa-paper-plane"></i></button>
      </div>
    `;

    panel.appendChild(header); panel.appendChild(body); panel.appendChild(inputWrap);
    wrap.appendChild(btn); wrap.appendChild(panel);
    shadow.appendChild(style); shadow.appendChild(faLink); shadow.appendChild(wrap);
    document.body.appendChild(host);

    let messages = opts.sendHistory ? load(opts.storageKey) : [];

    function render() {
      body.innerHTML = "";
      const hasUser = messages.some(m => m.from === "user");

      // Show welcome card if no user messages yet
      if (!hasUser && opts.greet) {
        const w = create("div", { class: "cw-welcome" }, escapeHtml(opts.greet));
        body.appendChild(w);
      }

      messages.forEach(m => {
        const row = create("div", { class: "cw-row " + (m.from === "user" ? "user" : "bot") });
        const group = create("div", { class: "cw-msgwrap" });
        const av = create("div", { class: "cw-avatar" }, m.from === "user" ? `<i class="fas fa-user"></i>` : `<i class="fas fa-robot"></i>`);
        const bubble = create("div", { class: "cw-bubble " + (m.from === "user" ? "cw-user" : "cw-bot") });
        if (m.typing) { bubble.innerHTML = `<div class="cw-typing"><div class="cw-dot"></div><div class="cw-dot"></div><div class="cw-dot"></div></div>`; }
        else {
          const formattedText = formatMessage(m.text);
          const timeEl = `<div class="cw-time">${m.time}</div>`;
          bubble.innerHTML = formattedText + timeEl;
        }
        group.appendChild(av); group.appendChild(bubble); row.appendChild(group); body.appendChild(row);
      });
      body.scrollTop = body.scrollHeight;
    }

    render();

    const closeBtn = header.querySelector(".cw-close");
    const textarea = inputWrap.querySelector("textarea");
    const sendBtn = inputWrap.querySelector(".cw-send");
    const micBtn = inputWrap.querySelector(".cw-mic");

    function toggle() { wrap.classList.toggle("cw-open"); if (wrap.classList.contains("cw-open")) setTimeout(() => textarea.focus(), 80); }
    btn.addEventListener("click", toggle); closeBtn.addEventListener("click", toggle);

    textarea.addEventListener("input", () => { textarea.style.height = "auto"; textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px"; });
    textarea.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } });
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
        if (micBtn.classList.contains("recording")) { recognition.stop(); micBtn.classList.remove("recording"); }
        else { textarea.value = ""; recognition.start(); micBtn.classList.add("recording"); }
      });

      recognition.onresult = (event) => {
        let finalTranscript = ""; let interimTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) { finalTranscript += result[0].transcript + " "; }
          else { interimTranscript += result[0].transcript; }
        }
        textarea.value = finalTranscript + interimTranscript;
      };

      recognition.onerror = () => { micBtn.classList.remove("recording"); };
      recognition.onend = () => { micBtn.classList.remove("recording"); };
    } else { micBtn.style.display = "none"; }

    
    // ---- Save Bot Message ----
    async function saveBotMessage(message, chatId) {
      try {
        const saveUrl = opts.webhookUrl.replace('/api/stream', '/api/chats/save-message');
        const payload = {
          message: message,
          chatId: chatId,
          type: 'widget',
          organization_id: '68bff8e6a443dd2db8aae466'
        };

        const response = await fetch(saveUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}` // Add auth token if available
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Message saved successfully:', result);
          return result; // Return the result for promise chain
        } else {
          console.error('Failed to save message:', response.status, response.statusText);
          return null;
        }
      } catch (error) {
        console.error('Error saving bot message:', error);
        return null;
      }
    }

    // ---- Send ----
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
        let history = [];
        if (opts.sendHistory) {
          history = messages.filter(m => !m.typing).map(({ from, text, time }) => ({
            from, text: safeString(text), time
          }));
        }

        // Prepare input for streaming API
        const input = { query: text, type: 'widget', organization_id: '68bff8e6a443dd2db8aae466', organization_name: 'lums' };
        // const input = { query: text, type: 'widget', organization_id: '68bfed9b64fcb4fc90386409', organization_name: 'lums' };
        
        const inputData = encodeURIComponent(JSON.stringify(input));
        const streamUrl = `${opts.webhookUrl}?input=${inputData}`;

        // Remove typing indicator and add placeholder message
        messages = messages.filter(m => m.id !== tid);
        const placeholderMessage = { id: Date.now() + 1, from: "bot", text: "", time: time() };
        messages.push(placeholderMessage);
        render();

        // Start streaming
        const eventSource = new EventSource(streamUrl);
        let botContent = '';
        let isMarkdownBlock = false;
        let currentChatId = null; // Will be set when saving message

        // Throttle rendering for better performance
        let renderTimeout = null;
        const throttledRender = () => {
          if (renderTimeout) clearTimeout(renderTimeout);
          renderTimeout = setTimeout(() => {
            render();
            renderTimeout = null;
          }, 50); // Render at most every 50ms
        };

        eventSource.addEventListener('chunk', (event) => {
          let chunk = event.data;

          // Check if this chunk starts a markdown block
          if (chunk.includes('```html')) {
            isMarkdownBlock = true;
            chunk = chunk.replace(/```html\s*/, '');
          }
          // Check if chunk starts with standalone 'html'
          else if (chunk.trim().startsWith('html')) {
            chunk = chunk.replace(/^\s*html\s*/, '');
          }

          // Check if this chunk ends a markdown block
          if (chunk.includes('```')) {
            isMarkdownBlock = false;
            chunk = chunk.replace(/```/, '');
          }

          // If we're not in a markdown block but the chunk starts with html tags,
          // it might be part of a split markdown block
          if (!isMarkdownBlock && botContent === '' && chunk.trim().startsWith('<')) {
            isMarkdownBlock = true;
          }

          botContent += chunk;
          placeholderMessage.text = botContent;
          throttledRender(); // Use throttled render instead of direct render
        });

        eventSource.addEventListener('end', () => {
          eventSource.close();
          
          // Clear any pending render timeout
          if (renderTimeout) {
            clearTimeout(renderTimeout);
            renderTimeout = null;
          }

          // Final cleanup of any markdown syntax
          let cleanContent = botContent;
          cleanContent = cleanContent.replace(/^```html\s*/g, '');
          cleanContent = cleanContent.replace(/```$/g, '');
          // Remove standalone 'html' at the beginning
          cleanContent = cleanContent.replace(/^\s*html\s*/, '');

          placeholderMessage.text = cleanContent || "(empty response)";

          // Save the bot message to the server
          saveBotMessage(cleanContent, currentChatId).then((result) => {
            if (result && result.chatId && !currentChatId) {
              currentChatId = result.chatId;
            }
          });

          if (opts.sendHistory) save(opts.storageKey, messages);
          render(); // Final render immediately
          sending = false;
        });

        eventSource.onerror = (err) => {
          console.error('Streaming error:', err);
          eventSource.close();
          
          // Clear any pending render timeout
          if (renderTimeout) {
            clearTimeout(renderTimeout);
            renderTimeout = null;
          }
          
          placeholderMessage.text = "Sorry, I couldn't reach the server.";
          if (opts.sendHistory) save(opts.storageKey, messages);
          render();
          sending = false;
        };
      } catch (error) {
        console.error('Error setting up stream:', error);
        messages = messages.filter(m => m.id !== tid);
        messages.push({ id: Date.now() + 2, from: "bot", text: "Sorry, I couldn't set up the connection.", time: time() });
        if (opts.sendHistory) save(opts.storageKey, messages);
        render();
        sending = false;
      }
    }
  }

  window.ChatWidget = { init: function (options) { const opts = Object.assign({}, DEFAULTS, options || {}); mount(opts); } };
})();
