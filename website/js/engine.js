/* eslint-disable */
/*
 * ENGINE — membangun proyek kumulatif, membuat diff, dan merender preview.
 * Tidak memakai dependensi eksternal.
 */
(function (root) {
  "use strict";

  const PAGE_ORDER = [
    "index.html",
    "profil.html",
    "jurusan.html",
    "kegiatan.html",
    "galeri.html",
    "portofolio.html",
    "kontak.html"
  ];

  const projectCache = new WeakMap();

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function countOccurrences(text, needle) {
    if (needle === "") return 0;
    return text.split(needle).length - 1;
  }

  function cloneFiles(files) {
    const copy = {};
    Object.keys(files).forEach(function (key) { copy[key] = files[key]; });
    return copy;
  }

  function applyEdit(files, edit, lessonNo) {
    const where = "Pertemuan " + lessonNo + " (" + edit.op + " " + edit.file + ")";
    if (!edit || !edit.file) throw new Error(where + ": file belum ditentukan.");

    if (edit.op === "create") {
      if (Object.prototype.hasOwnProperty.call(files, edit.file)) {
        throw new Error(where + ": file sudah ada.");
      }
      files[edit.file] = edit.content;
      return;
    }

    if (edit.op === "setFile") {
      files[edit.file] = edit.content;
      return;
    }

    if (edit.op === "append") {
      if (!Object.prototype.hasOwnProperty.call(files, edit.file)) {
        throw new Error(where + ": file belum ada.");
      }
      files[edit.file] += edit.content;
      return;
    }

    if (edit.op === "insert") {
      if (!Object.prototype.hasOwnProperty.call(files, edit.file)) {
        throw new Error(where + ": file belum ada.");
      }
      const source = files[edit.file];
      if (edit.after != null) {
        const total = countOccurrences(source, edit.after);
        if (total !== 1) throw new Error(where + ": anchor 'after' ditemukan " + total + " kali.");
        files[edit.file] = source.replace(edit.after, edit.after + edit.content);
        return;
      }
      if (edit.before != null) {
        const total = countOccurrences(source, edit.before);
        if (total !== 1) throw new Error(where + ": anchor 'before' ditemukan " + total + " kali.");
        files[edit.file] = source.replace(edit.before, edit.content + edit.before);
        return;
      }
      throw new Error(where + ": anchor insert tidak diisi.");
    }

    if (edit.op === "replace") {
      if (!Object.prototype.hasOwnProperty.call(files, edit.file)) {
        throw new Error(where + ": file belum ada.");
      }
      const source = files[edit.file];
      const total = countOccurrences(source, edit.find);
      if (total !== 1) throw new Error(where + ": teks yang akan diganti ditemukan " + total + " kali.");
      files[edit.file] = source.replace(edit.find, edit.content);
      return;
    }

    throw new Error(where + ": operasi tidak dikenal.");
  }

  function buildProject(index, data) {
    const course = data || root.COURSE_DATA;
    if (!course || !Array.isArray(course.lessons)) throw new Error("Data lesson tidak tersedia.");
    const lessons = course.lessons;
    const safeIndex = Math.max(0, Math.min(index, lessons.length - 1));

    let cache = projectCache.get(course);
    if (!cache) {
      cache = [];
      projectCache.set(course, cache);
    }
    if (cache[safeIndex]) return cache[safeIndex];

    let files = {};
    for (let i = 0; i <= safeIndex; i += 1) {
      if (cache[i]) {
        files = cloneFiles(cache[i].files);
      } else {
        const lesson = lessons[i];
        (lesson.edits || []).forEach(function (edit) {
          applyEdit(files, edit, lesson.no);
        });
        cache[i] = { index: i, lesson: lesson, files: cloneFiles(files) };
      }
    }
    return cache[safeIndex];
  }

  function buildBefore(index, data) {
    if (index <= 0) return { index: -1, lesson: null, files: {} };
    return buildProject(index - 1, data);
  }

  function getPageList(project) {
    const files = project.files || {};
    const known = PAGE_ORDER.filter(function (page) { return Object.prototype.hasOwnProperty.call(files, page); });
    const extra = Object.keys(files).filter(function (file) {
      return /\.html$/i.test(file) && known.indexOf(file) === -1;
    }).sort();
    return known.concat(extra);
  }

  function getFileList(project) {
    const files = project.files || {};
    const pages = getPageList(project);
    const rest = Object.keys(files).filter(function (file) { return pages.indexOf(file) === -1; }).sort();
    return pages.concat(rest);
  }

  function diffLines(beforeText, afterText) {
    const before = String(beforeText || "").split("\n");
    const after = String(afterText || "").split("\n");
    const n = before.length;
    const m = after.length;
    const table = [];
    for (let i = 0; i <= n; i += 1) table.push(new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i -= 1) {
      for (let j = m - 1; j >= 0; j -= 1) {
        table[i][j] = before[i] === after[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
      }
    }
    const ops = [];
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (before[i] === after[j]) {
        ops.push({ type: "same", text: after[j], beforeLine: i + 1, afterLine: j + 1 });
        i += 1;
        j += 1;
      } else if (table[i + 1][j] >= table[i][j + 1]) {
        ops.push({ type: "del", text: before[i], beforeLine: i + 1, afterLine: null });
        i += 1;
      } else {
        ops.push({ type: "add", text: after[j], beforeLine: null, afterLine: j + 1 });
        j += 1;
      }
    }
    while (i < n) {
      ops.push({ type: "del", text: before[i], beforeLine: i + 1, afterLine: null });
      i += 1;
    }
    while (j < m) {
      ops.push({ type: "add", text: after[j], beforeLine: null, afterLine: j + 1 });
      j += 1;
    }
    return ops;
  }

  function addedLineSet(ops) {
    const set = {};
    ops.forEach(function (op) { if (op.type === "add") set[op.afterLine] = true; });
    return set;
  }

  function tagSpan(cls, text) {
    return '<span class="' + cls + '">' + text + "</span>";
  }

  function highlightHtmlLine(line) {
    let result = "";
    let last = 0;
    const pattern = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?[a-zA-Z][^>]*>/gi;
    let match;
    while ((match = pattern.exec(line)) !== null) {
      result += escapeHtml(line.slice(last, match.index));
      const token = match[0];
      if (token.indexOf("<!--") === 0) {
        result += tagSpan("tok-comment", escapeHtml(token));
      } else if (/^<!doctype/i.test(token)) {
        result += tagSpan("tok-doctype", escapeHtml(token));
      } else {
        let tag = escapeHtml(token);
        tag = tag.replace(/^(&lt;\/?)([a-zA-Z][\w-]*)/, function (m, p1, p2) {
          return tagSpan("tok-punc", p1) + tagSpan("tok-tag", p2);
        });
        tag = tag.replace(/([a-zA-Z-]+)=(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;)/g, function (m, attr, value) {
          return tagSpan("tok-attr", attr) + "=" + tagSpan("tok-str", value);
        });
        result += tag;
      }
      last = match.index + token.length;
    }
    result += escapeHtml(line.slice(last));
    return result;
  }

  function highlightCssLine(line, state) {
    const trimmed = line.trim();
    if (state.inComment) {
      if (trimmed.indexOf("*/") !== -1) state.inComment = false;
      return tagSpan("tok-comment", escapeHtml(line));
    }
    if (trimmed.indexOf("/*") === 0) {
      if (trimmed.indexOf("*/") === -1) state.inComment = true;
      return tagSpan("tok-comment", escapeHtml(line));
    }
    if (/^\s*[^{}]+\{\s*$/.test(line)) {
      const index = line.indexOf("{");
      return tagSpan("tok-selector", escapeHtml(line.slice(0, index))) + tagSpan("tok-punc", "{") + escapeHtml(line.slice(index + 1));
    }
    const prop = line.match(/^(\s*)(--?[a-zA-Z-]+|[a-zA-Z-]+)(\s*:\s*)(.*?)(;?)\s*$/);
    if (prop) {
      return escapeHtml(prop[1]) + tagSpan("tok-prop", escapeHtml(prop[2])) + escapeHtml(prop[3]) + tagSpan("tok-val", escapeHtml(prop[4])) + escapeHtml(prop[5]);
    }
    return escapeHtml(line);
  }

  function highlightLines(code, language) {
    const lines = String(code || "").split("\n");
    if (language === "css") {
      const state = { inComment: false };
      return lines.map(function (line) { return highlightCssLine(line, state); });
    }
    return lines.map(function (line) { return highlightHtmlLine(line); });
  }

  function languageOf(file) {
    if (/\.css$/i.test(file)) return "css";
    return "html";
  }

  function toDataUri(svg) {
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function emptyPreview(message) {
    return "<!doctype html><html lang=\"id\"><head><meta charset=\"utf-8\"><style>" +
      "body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f8fafc;color:#617383;font:15px/1.6 Arial,sans-serif;padding:24px;text-align:center}" +
      ".box{max-width:360px;background:#fff;border:1px dashed #cbd5e1;border-radius:16px;padding:24px}" +
      "</style></head><body><div class=\"box\">" + escapeHtml(message) + "</div></body></html>";
  }

  function renderPreview(project, options) {
    const opts = options || {};
    const page = opts.page || "index.html";
    const files = (project && project.files) || {};
    if (!Object.prototype.hasOwnProperty.call(files, page)) {
      return emptyPreview(opts.emptyMessage || "Halaman " + page + " belum dibuat pada pertemuan ini.");
    }

    let html = files[page];
    const css = files["css/style.css"] || "";

    html = html.replace(/<link[^>]*href="css\/style\.css"[^>]*>/i, "<style>\n" + css + "\n</style>");
    if (css && html.indexOf("<style>") === -1) {
      html = html.replace("</head>", "<style>\n" + css + "\n</style>\n</head>");
    }

    const assets = opts.assets || {};
    Object.keys(assets).forEach(function (path) {
      const uri = toDataUri(assets[path]);
      html = html.split('src="' + path + '"').join('src="' + uri + '"');
    });

    html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

    html = html.replace(/href="([^"]+\.html)"/g, function (m, href) {
      if (/^https?:/i.test(href) || href.indexOf("../") === 0) return m;
      return 'href="#" data-page="' + href + '"';
    });

    const highlightCss = (opts.highlight || []).map(function (selector) {
      return selector + "{outline:3px dashed #d97706;outline-offset:3px;background:#fff8e6;}";
    }).join("\n");

    const injection = "<style>\n" +
      "html{scroll-behavior:auto}\n" +
      "a[data-page]{cursor:pointer}\n" +
      highlightCss + "\n" +
      "</style>\n";

    if (html.indexOf("</head>") !== -1) {
      html = html.replace("</head>", injection + "</head>");
    } else {
      html = injection + html;
    }

    const navToken = opts.token ? String(opts.token) : "";
    const navScript = "<script>\n" +
      "document.addEventListener('click', function (event) {\n" +
      "  var link = event.target.closest('a[data-page]');\n" +
      "  if (link) {\n" +
      "    event.preventDefault();\n" +
      "    parent.postMessage({ type: 'preview-nav', page: link.getAttribute('data-page'), token: " + JSON.stringify(navToken) + " }, '*');\n" +
      "  }\n" +
      "});\n" +
      "<\/script>";

    if (html.indexOf("</body>") !== -1) {
      html = html.replace("</body>", navScript + "</body>");
    } else {
      html += navScript;
    }

    return html;
  }

  function validateCourse(data) {
    const course = data || root.COURSE_DATA;
    const errors = [];
    if (!course || !Array.isArray(course.lessons)) {
      return { ok: false, errors: ["Data lesson tidak tersedia."] };
    }
    if (course.lessons.length !== 18) {
      errors.push("Jumlah lesson Semester 1 harus 18, ditemukan " + course.lessons.length + ".");
    }
    const seen = {};
    course.lessons.forEach(function (lesson, index) {
      if (lesson.no !== index + 1) errors.push("Nomor lesson tidak berurutan pada indeks " + index + ".");
      if (seen[lesson.no]) errors.push("Nomor lesson duplikat: " + lesson.no + ".");
      seen[lesson.no] = true;
      ["title", "duration", "prerequisite", "intro", "why", "location", "nextTeaser"].forEach(function (field) {
        if (!lesson[field]) errors.push("Pertemuan " + lesson.no + ": field " + field + " kosong.");
      });
      ["goals", "skills", "concepts", "tags", "steps", "target", "checklist"].forEach(function (field) {
        if (!Array.isArray(lesson[field]) || lesson[field].length === 0) {
          errors.push("Pertemuan " + lesson.no + ": array " + field + " kosong.");
        }
      });
      if (Array.isArray(lesson.steps) && lesson.steps.length !== 9) {
        errors.push("Pertemuan " + lesson.no + ": langkah praktik harus 9, ditemukan " + lesson.steps.length + ".");
      }
      if (!lesson.preview || !lesson.preview.page) {
        errors.push("Pertemuan " + lesson.no + ": preview.page kosong.");
      }
      if (!Array.isArray(lesson.edits)) {
        errors.push("Pertemuan " + lesson.no + ": edits harus array.");
      }
    });
    try {
      course.lessons.forEach(function (lesson, index) {
        buildProject(index, course);
      });
    } catch (error) {
      errors.push(error.message);
    }
    return { ok: errors.length === 0, errors: errors };
  }

  const api = {
    PAGE_ORDER: PAGE_ORDER,
    escapeHtml: escapeHtml,
    buildProject: buildProject,
    buildBefore: buildBefore,
    getPageList: getPageList,
    getFileList: getFileList,
    diffLines: diffLines,
    addedLineSet: addedLineSet,
    highlightLines: highlightLines,
    languageOf: languageOf,
    renderPreview: renderPreview,
    emptyPreview: emptyPreview,
    toDataUri: toDataUri,
    validateCourse: validateCourse
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.ProjectEngine = api;
})(typeof window !== "undefined" ? window : globalThis);
