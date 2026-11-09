/* eslint-disable */
/*
 * APP — tampilan pembelajaran, navigasi, progres, kode, dan pratinjau.
 * Bergantung pada data.js (COURSE_DATA) dan engine.js (ProjectEngine).
 */
(function () {
  "use strict";

  const DATA = window.COURSE_DATA;
  const Engine = window.ProjectEngine;
  const content = document.getElementById("lessonContent");

  if (!DATA || !Engine || !Array.isArray(DATA.lessons)) {
    if (content) {
      content.innerHTML = '<article class="locked-panel"><div class="locked-icon">!</div><h1>Data pembelajaran tidak ditemukan</h1><p>Periksa apakah file <code>js/data.js</code> dan <code>js/engine.js</code> sudah dimuat dengan benar.</p></article>';
    }
    return;
  }

  const LESSONS = DATA.lessons;
  const TOTAL = LESSONS.length;
  const STORAGE_KEY = (DATA.meta && DATA.meta.storageKey) || "creativeHubProgressV2";
  const OLD_KEY = (DATA.meta && DATA.meta.oldStorageKey) || "creativeHubDone";
  const esc = Engine.escapeHtml;

  const PREVIEW_TOKEN = "pv-" + Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);

  const PREVIEW_ASSETS = {
    "images/sekolah.svg": '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><rect width="1200" height="900" fill="#e6f3f1"/><rect x="180" y="230" width="840" height="470" rx="28" fill="#164e63"/><path d="M250 430h700v270H250z" fill="#0f766e"/><path d="M180 430l420-250 420 250" fill="#f59e0b"/><text x="600" y="555" font-family="Arial" font-size="64" fill="white" text-anchor="middle">GANTI FOTO SEKOLAH</text><text x="600" y="625" font-family="Arial" font-size="30" fill="white" text-anchor="middle">SMK Creative Hub</text></svg>'
  };

  const state = {
    current: 1,
    teacher: false,
    completed: new Set(),
    checklist: {},
    previewPage: null,
    compare: true,
    device: "desktop",
    codeTab: "full",
    codeFile: null
  };

  const els = {
    lessonList: document.getElementById("lessonList"),
    progressPercent: document.getElementById("progressPercent"),
    progressBar: document.getElementById("progressBar"),
    progressText: document.getElementById("progressText"),
    introStatus: document.getElementById("introStatus"),
    introBar: document.getElementById("introBar"),
    teacherToggle: document.getElementById("teacherToggle"),
    teacherBadge: document.getElementById("teacherBadge"),
    teacherNote: document.getElementById("teacherNote"),
    resultLink: document.getElementById("resultLink"),
    sidebarResult: document.getElementById("sidebarResult"),
    sidebarLockedNote: document.getElementById("sidebarLockedNote"),
    resetProgress: document.getElementById("resetProgress"),
    previewDialog: document.getElementById("previewDialog"),
    dialogFrame: document.getElementById("dialogFrame"),
    dialogPage: document.getElementById("dialogPage"),
    dialogTitle: document.getElementById("dialogTitle"),
    toast: document.getElementById("toast")
  };

  let toastTimer = null;

  /* ---------- Util ---------- */

  function validLessonNo(value) {
    return Number.isInteger(value) && value >= 1 && value <= TOTAL;
  }

  function clampLesson(value) {
    const number = Number(value);
    if (!validLessonNo(number)) return 1;
    return number;
  }

  function lessonAt(no) {
    return LESSONS[no - 1];
  }

  function currentLesson() {
    return lessonAt(state.current);
  }

  function inline(text) {
    return esc(text).replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function paragraphs(text) {
    return String(text || "")
      .split(/\n{2,}/)
      .map(function (part) {
        return "<p>" + inline(part).replace(/\n/g, "<br>") + "</p>";
      })
      .join("");
  }

  function showToast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add("show");
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      els.toast.classList.remove("show");
    }, 2800);
  }

  /* ---------- Progres ---------- */

  function readJSON(key) {
    try {
      return JSON.parse(window.localStorage.getItem(key) || "null");
    } catch (error) {
      return null;
    }
  }

  function ensureChecklist(no) {
    const lesson = lessonAt(no);
    const length = lesson && lesson.checklist ? lesson.checklist.length : 0;
    let list = state.checklist[no];
    if (!Array.isArray(list)) list = [];
    const normalized = [];
    for (let i = 0; i < length; i += 1) normalized.push(Boolean(list[i]));
    state.checklist[no] = normalized;
    return normalized;
  }

  function loadProgress() {
    const saved = readJSON(STORAGE_KEY);
    if (saved && typeof saved === "object") {
      state.teacher = Boolean(saved.teacher);
      state.current = clampLesson(saved.current || 1);
      state.completed = new Set(
        (Array.isArray(saved.completed) ? saved.completed : [])
          .map(Number)
          .filter(validLessonNo)
      );
      if (saved.checklist && typeof saved.checklist === "object") {
        Object.keys(saved.checklist).forEach(function (key) {
          const no = Number(key);
          if (!validLessonNo(no)) return;
          const source = saved.checklist[key];
          const lesson = lessonAt(no);
          state.checklist[no] = lesson.checklist.map(function (_, index) {
            return Boolean(source && source[index]);
          });
        });
      }
      LESSONS.forEach(function (lesson) {
        ensureChecklist(lesson.no);
      });
      return;
    }

    /* Migrasi dari format lama: creativeHubDone berisi array nomor pertemuan. */
    const old = readJSON(OLD_KEY);
    if (Array.isArray(old)) {
      state.completed = new Set(old.map(Number).filter(validLessonNo));
      LESSONS.forEach(function (lesson) {
        state.checklist[lesson.no] = lesson.checklist.map(function () {
          return state.completed.has(lesson.no);
        });
      });
      state.current = 1;
      state.teacher = false;
      return;
    }

    LESSONS.forEach(function (lesson) {
      ensureChecklist(lesson.no);
    });
  }

  function saveProgress() {
    const checklist = {};
    Object.keys(state.checklist).forEach(function (key) {
      const no = Number(key);
      if (!validLessonNo(no)) return;
      checklist[no] = ensureChecklist(no);
    });
    const payload = {
      version: 2,
      teacher: state.teacher,
      completed: Array.from(state.completed).sort(function (a, b) { return a - b; }),
      checklist: checklist,
      current: state.current,
      updatedAt: new Date().toISOString()
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      showToast("Progres tidak dapat disimpan di perangkat ini.");
    }
  }

  function isCompleted(no) {
    return state.completed.has(no);
  }

  function isUnlocked(no) {
    if (state.teacher) return true;
    if (no === 1) return true;
    return state.completed.has(no - 1);
  }

  function completedCount() {
    return LESSONS.filter(function (lesson) {
      return state.completed.has(lesson.no);
    }).length;
  }

  function allComplete() {
    return LESSONS.every(function (lesson) {
      return state.completed.has(lesson.no);
    });
  }

  function firstOpenLesson() {
    const found = LESSONS.find(function (lesson) {
      return !state.completed.has(lesson.no);
    });
    return found ? found.no : TOTAL;
  }

  /* ---------- Header, sidebar, URL ---------- */

  function updateTeacherUI() {
    if (els.teacherToggle) {
      els.teacherToggle.textContent = state.teacher ? "Mode guru: aktif" : "Mode guru";
      els.teacherToggle.setAttribute("aria-pressed", state.teacher ? "true" : "false");
    }
    if (els.teacherBadge) els.teacherBadge.hidden = !state.teacher;
    if (els.teacherNote) els.teacherNote.hidden = !state.teacher;
    document.body.classList.toggle("teacher-mode", state.teacher);
  }

  function updateResultLinks() {
    const open = allComplete();
    if (els.resultLink) els.resultLink.hidden = !open;
    if (els.sidebarResult) els.sidebarResult.hidden = !open;
    if (els.sidebarLockedNote) els.sidebarLockedNote.hidden = open;
  }

  function updateProgressUI() {
    const count = completedCount();
    const percent = Math.round((count / TOTAL) * 100);
    if (els.progressPercent) els.progressPercent.textContent = percent + "%";
    if (els.progressBar) els.progressBar.style.width = percent + "%";
    if (els.progressText) els.progressText.textContent = count + " dari " + TOTAL + " pertemuan selesai.";
    if (els.introStatus) els.introStatus.textContent = count + " dari " + TOTAL + " pertemuan selesai";
    if (els.introBar) els.introBar.style.width = percent + "%";
  }

  function updateURL() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("pertemuan", String(state.current));
      if (state.teacher) url.searchParams.set("guru", "1");
      else url.searchParams.delete("guru");
      window.history.replaceState(null, "", url.toString());
    } catch (error) {
      /* file:// di beberapa browser menolak replaceState; abaikan. */
    }
  }

  function renderSidebar() {
    updateProgressUI();
    if (!els.lessonList) return;

    els.lessonList.innerHTML = LESSONS.map(function (lesson) {
      const unlocked = isUnlocked(lesson.no);
      const done = isCompleted(lesson.no);
      const active = lesson.no === state.current;
      let status = "Terkunci";
      if (done) status = "Selesai";
      else if (active) status = unlocked ? "Sedang dibuka" : "Terkunci";
      else if (unlocked) status = "Siap dikerjakan";
      const icon = done ? "✓" : unlocked ? "›" : "🔒";
      const classes = ["lesson-item"];
      if (active) classes.push("active");
      if (done) classes.push("done");
      if (!unlocked) classes.push("locked");
      return (
        '<button type="button" class="' + classes.join(" ") + '" data-action="go-lesson" data-no="' + lesson.no + '"' +
        (unlocked ? "" : " disabled") +
        (active ? ' aria-current="step"' : "") +
        ">" +
        '<span class="lesson-no">' + String(lesson.no).padStart(2, "0") + "</span>" +
        '<span class="lesson-copy"><span class="lesson-title">' + esc(lesson.title) + "</span>" +
        '<span class="lesson-state">' + status + "</span></span>" +
        '<span class="lesson-icon" aria-hidden="true">' + icon + "</span>" +
        "</button>"
      );
    }).join("");
  }

  function renderAll() {
    updateTeacherUI();
    renderSidebar();
    renderContent();
    updateResultLinks();
  }

  function goToLesson(no, options) {
    const number = Number(no);
    if (!validLessonNo(number)) return;
    if (!isUnlocked(number)) {
      showToast("Pertemuan " + number + " masih terkunci. Selesaikan pertemuan sebelumnya dahulu.");
      return;
    }
    const opts = options || {};
    if (!opts.force && number === state.current) {
      if (content) content.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    state.current = number;
    state.previewPage = null;
    state.codeFile = null;
    state.codeTab = "full";
    saveProgress();
    updateURL();
    renderAll();
    if (content) {
      content.focus({ preventScroll: true });
      content.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---------- Panel terkunci ---------- */

  function lockedPanel(lesson) {
    const open = firstOpenLesson();
    return (
      '<article class="locked-panel">' +
      '<div class="locked-icon" aria-hidden="true">🔒</div>' +
      "<h1>Pertemuan " + lesson.no + " masih terkunci</h1>" +
      "<p>Selesaikan Pertemuan " + (lesson.no - 1) + " terlebih dahulu. Pertemuan berikutnya terbuka setelah checklist pertemuan sebelumnya lengkap dan tombol penyelesaian ditekan.</p>" +
      '<div class="locked-actions">' +
      '<button class="btn primary" type="button" data-action="go-lesson" data-no="' + open + '">Buka pertemuan yang tersedia</button>' +
      '<button class="btn" type="button" data-action="toggle-teacher">Buka mode guru</button>' +
      "</div></article>"
    );
  }

  /* ---------- Render materi ---------- */

  function pageLabel(page) {
    const labels = {
      "index.html": "Beranda",
      "profil.html": "Profil",
      "jurusan.html": "Jurusan",
      "kegiatan.html": "Kegiatan",
      "galeri.html": "Galeri",
      "portofolio.html": "Portofolio",
      "kontak.html": "Kontak"
    };
    return labels[page] || page.replace(/\.html$/i, "");
  }

  function sectionTitle(number, text) {
    return '<h2 class="section-title"><span class="num">' + number + "</span> " + esc(text) + "</h2>";
  }

  function renderContent() {
    if (!content) return;
    const lesson = currentLesson();

    if (!isUnlocked(lesson.no)) {
      content.innerHTML = lockedPanel(lesson);
      return;
    }

    let project;
    try {
      project = Engine.buildProject(lesson.no - 1);
    } catch (error) {
      content.innerHTML =
        '<article class="locked-panel"><div class="locked-icon">!</div><h1>Proyek tidak dapat dibangun</h1><p>' +
        esc(error.message) +
        "</p></article>";
      return;
    }

    ensureChecklist(lesson.no);
    const pages = Engine.getPageList(project);
    if (!state.previewPage || pages.indexOf(state.previewPage) === -1) {
      state.previewPage =
        lesson.preview && pages.indexOf(lesson.preview.page) !== -1
          ? lesson.preview.page
          : pages[0] || null;
    }

    const files = Engine.getFileList(project);
    if (!state.codeFile || files.indexOf(state.codeFile) === -1) {
      const changed = (lesson.edits || [])
        .map(function (edit) { return edit.file; })
        .filter(function (file) { return files.indexOf(file) !== -1; });
      if (changed.length) state.codeFile = changed[0];
      else if (lesson.preview && files.indexOf(lesson.preview.page) !== -1) state.codeFile = lesson.preview.page;
      else state.codeFile = files[0] || null;
    }

    content.innerHTML = lessonPanel(lesson, project, pages, files);
  }

  function lessonPanel(lesson, project, pages, files) {
    const done = isCompleted(lesson.no);
    const statusTag = done
      ? '<span class="tag teal">Selesai</span>'
      : '<span class="tag gray">Belum selesai</span>';

    const goals = lesson.goals.map(function (goal) {
      return "<li>" + inline(goal) + "</li>";
    }).join("");
    const skills = lesson.skills.map(function (skill) {
      return '<span class="tag gray">' + esc(skill) + "</span>";
    }).join("");

    const concepts = lesson.concepts.map(function (concept) {
      return (
        '<div class="concept-card"><h4>' + esc(concept.term) + "</h4><p>" + inline(concept.text) + "</p>" +
        (concept.analogy ? '<span class="analogy">Ibarat: ' + inline(concept.analogy) + "</span>" : "") +
        "</div>"
      );
    }).join("");

    const tags = lesson.tags.map(function (tag) {
      return (
        "<tr><td><code>" + esc(tag.name) + "</code></td><td>" + inline(tag.fn) + "</td><td>" + inline(tag.why) + "</td></tr>"
      );
    }).join("");

    const steps = lesson.steps.map(function (step) {
      return "<li><p>" + inline(step) + "</p></li>";
    }).join("");

    const targets = lesson.target.map(function (target) {
      return "<li>" + inline(target) + "</li>";
    }).join("");

    return (
      '<article class="lesson-panel">' +
      '<header class="lesson-head">' +
      '<div class="lesson-kicker"><span class="tag">Pertemuan ' + lesson.no + "</span>" +
      '<span class="tag teal">Semester 1</span>' +
      '<span class="tag gray">' + esc(lesson.duration) + "</span>" + statusTag + "</div>" +
      "<h1>" + esc(lesson.title) + "</h1>" +
      '<p class="lesson-goal">' + inline(lesson.goals[0]) + "</p>" +
      '<div class="meta-grid">' +
      '<div class="meta-box"><span>Prasyarat</span><strong>' + esc(lesson.prerequisite) + "</strong></div>" +
      '<div class="meta-box"><span>Durasi</span><strong>' + esc(lesson.duration) + "</strong></div>" +
      '<div class="meta-box"><span>Status</span><strong>' + (done ? "Sudah selesai" : "Sedang dipelajari") + "</strong></div>" +
      "</div></header>" +

      '<section class="lesson-section">' +
      sectionTitle(1, "Tujuan dan keterampilan") +
      "<ul>" + goals + "</ul>" +
      '<div class="tag-row">' + skills + "</div>" +
      "</section>" +

      '<section class="lesson-section">' +
      sectionTitle(2, "Materi singkat") +
      paragraphs(lesson.intro) +
      '<div class="concept-grid">' + concepts + "</div>" +
      '<div class="why-box"><strong>Mengapa penting?</strong> ' + inline(lesson.why) + "</div>" +
      "</section>" +

      '<section class="lesson-section">' +
      sectionTitle(3, "Tag dan atribut yang dipakai") +
      '<div style="overflow-x:auto;"><table class="tag-table"><thead><tr><th>Tag / atribut</th><th>Fungsi</th><th>Alasan</th></tr></thead><tbody>' +
      tags + "</tbody></table></div>" +
      "</section>" +

      '<section class="lesson-section">' +
      sectionTitle(4, "Langkah praktik (9 langkah)") +
      '<ol class="step-list">' + steps + "</ol>" +
      '<p class="location-box"><strong>Lokasi pengerjaan:</strong> ' + inline(lesson.location) + "</p>" +
      "</section>" +

      '<section class="lesson-section">' +
      sectionTitle(5, "Kode kumulatif") +
      "<p>Kode di bawah adalah hasil proyek sampai Pertemuan " + lesson.no + ". Tab <strong>Kode sebelum</strong> menampilkan kondisi file sebelum pertemuan ini, <strong>Tambahan</strong> memperlihatkan baris yang berubah, dan <strong>Kode lengkap</strong> menampilkan isi file saat ini.</p>" +
      codePanel(lesson, files) +
      "</section>" +

      '<section class="lesson-section">' +
      sectionTitle(6, "Pratinjau sebelum dan sesudah") +
      previewPanel(lesson, project, pages) +
      "</section>" +

      '<section class="lesson-section">' +
      sectionTitle(7, "Target hasil") +
      "<ul>" + targets + "</ul>" +
      "</section>" +

      '<section class="lesson-section">' +
      sectionTitle(8, "Checklist dan penyelesaian") +
      completionSection(lesson) +
      "</section>" +

      (lesson.nextTeaser ? '<p class="next-teaser"><strong>Persiapan berikutnya:</strong> ' + inline(lesson.nextTeaser) + "</p>" : "") +
      lessonNav(lesson) +
      "</article>"
    );
  }

  /* ---------- Kode ---------- */

  function codeLine(no, html, cls) {
    return (
      '<div class="code-line' + (cls ? " " + cls : "") + '">' +
      '<span class="line-no">' + no + "</span>" +
      '<span class="line-text">' + (html == null ? "" : html) + "</span>" +
      "</div>"
    );
  }

  function emptyCode(message) {
    return '<div class="code-empty">' + esc(message) + "</div>";
  }

  function buildCodeModel(lesson) {
    const before = Engine.buildBefore(lesson.no - 1);
    const after = Engine.buildProject(lesson.no - 1);
    const file = state.codeFile || "index.html";
    const existsBefore = Object.prototype.hasOwnProperty.call(before.files, file);
    const beforeText = existsBefore ? before.files[file] : "";
    const afterText = Object.prototype.hasOwnProperty.call(after.files, file) ? after.files[file] : "";
    const lang = Engine.languageOf(file);
    const diff = existsBefore ? Engine.diffLines(beforeText, afterText) : null;
    return {
      before: before,
      after: after,
      file: file,
      existsBefore: existsBefore,
      beforeText: beforeText,
      afterText: afterText,
      lang: lang,
      diff: diff,
      highlightBefore: Engine.highlightLines(beforeText, lang),
      highlightAfter: Engine.highlightLines(afterText, lang)
    };
  }

  function codePanel(lesson, files) {
    const model = buildCodeModel(lesson);
    const changed = {};
    (lesson.edits || []).forEach(function (edit) { changed[edit.file] = true; });
    const options = files.map(function (file) {
      return (
        '<option value="' + esc(file) + '"' + (file === model.file ? " selected" : "") + ">" +
        esc(file) + (changed[file] ? " •" : "") + "</option>"
      );
    }).join("");

    let rows = "";
    let note = "";
    let copyText = "";

    if (state.codeTab === "before") {
      copyText = model.beforeText;
      if (!model.existsBefore) {
        rows = emptyCode("File " + model.file + " belum ada sebelum Pertemuan " + lesson.no + ".");
      } else {
        rows = model.highlightBefore.map(function (html, index) {
          return codeLine(index + 1, html, "");
        }).join("");
      }
      note = "Ini adalah isi " + model.file + " sebelum pertemuan ini dimulai.";
    } else if (state.codeTab === "add") {
      if (!model.existsBefore) {
        rows = model.highlightAfter.map(function (html, index) {
          return codeLine(index + 1, html, "add");
        }).join("");
        copyText = model.afterText;
      } else if (model.beforeText === model.afterText) {
        rows = emptyCode("File " + model.file + " tidak berubah pada Pertemuan " + lesson.no + ".");
      } else {
        const changes = model.diff.filter(function (op) { return op.type !== "same"; });
        rows = changes.map(function (op) {
          if (op.type === "add") {
            return codeLine(op.afterLine, model.highlightAfter[op.afterLine - 1], "add");
          }
          return codeLine(op.beforeLine, model.highlightBefore[op.beforeLine - 1], "del");
        }).join("");
        copyText = changes
          .filter(function (op) { return op.type === "add"; })
          .map(function (op) { return op.text; })
          .join("\n");
      }
      note = "Baris hijau adalah tambahan. Baris merah adalah baris lama yang diganti atau dipindahkan. Salin hanya baris tambahan bila kamu memperbarui file secara manual.";
    } else {
      const added = {};
      if (!model.existsBefore) {
        model.highlightAfter.forEach(function (_, index) { added[index + 1] = true; });
      } else if (model.diff) {
        model.diff.forEach(function (op) {
          if (op.type === "add") added[op.afterLine] = true;
        });
      }
      rows = model.highlightAfter.map(function (html, index) {
        return codeLine(index + 1, html, added[index + 1] ? "add" : "");
      }).join("");
      copyText = model.afterText;
      note = "Ini adalah kode lengkap " + model.file + " sampai Pertemuan " + lesson.no + ". Baris hijau menandai tambahan pada pertemuan ini.";
    }

    if (!rows) rows = emptyCode("Belum ada kode untuk ditampilkan.");

    function tabButton(id, label) {
      const active = state.codeTab === id;
      return (
        '<button type="button" class="code-tab' + (active ? " active" : "") + '" role="tab" aria-selected="' +
        (active ? "true" : "false") + '" data-action="code-tab" data-tab="' + id + '">' + label + "</button>"
      );
    }

    return (
      '<div class="code-panel">' +
      '<div class="code-toolbar">' +
      '<div class="code-tabs" role="tablist" aria-label="Jenis kode">' +
      tabButton("before", "Kode sebelum") +
      tabButton("add", "Tambahan") +
      tabButton("full", "Kode lengkap") +
      "</div>" +
      '<div class="code-meta">' +
      '<select class="file-select" id="codeFileSelect" aria-label="Pilih file kode">' + options + "</select>" +
      '<button type="button" class="code-copy" data-action="copy-code">Salin</button>' +
      "</div></div>" +
      '<div class="code-body"><pre class="code-pre">' + rows + "</pre></div>" +
      '<p class="code-note">' + esc(note) + "</p>" +
      "</div>"
    );
  }

  /* ---------- Pratinjau ---------- */

  function frameCard(kind, label, html, title) {
    return (
      '<div class="preview-frame-card">' +
      '<div class="frame-label ' + kind + '"><span>' + esc(label) + "</span></div>" +
      '<div class="frame-shell device-' + state.device + '">' +
      '<iframe class="preview-frame" title="' + esc(title) + '" sandbox="allow-scripts" srcdoc="' + esc(html) + '"></iframe>' +
      "</div></div>"
    );
  }

  function previewPanel(lesson, project, pages) {
    if (!pages.length || !state.previewPage) {
      return '<p class="preview-note">Belum ada halaman HTML yang dapat dipratinjau pada pertemuan ini.</p>';
    }

    const page = state.previewPage;
    const highlight = (lesson.preview && lesson.preview.highlight) || [];
    const afterHtml = Engine.renderPreview(project, {
      page: page,
      highlight: highlight,
      assets: PREVIEW_ASSETS,
      token: PREVIEW_TOKEN
    });

    let before = null;
    try {
      before = Engine.buildBefore(lesson.no - 1);
    } catch (error) {
      before = null;
    }
    const hasBefore = before && Object.prototype.hasOwnProperty.call(before.files, page);
    const beforeHtml = hasBefore
      ? Engine.renderPreview(before, { page: page, assets: PREVIEW_ASSETS, token: PREVIEW_TOKEN })
      : Engine.emptyPreview("Halaman " + page + " belum ada pada pertemuan sebelumnya.");

    const tabs = pages.map(function (item) {
      const active = item === page;
      return (
        '<button type="button" class="preview-tab' + (active ? " active" : "") + '" role="tab" aria-selected="' +
        (active ? "true" : "false") + '" data-action="preview-page" data-page="' + esc(item) + '">' +
        esc(pageLabel(item)) + "</button>"
      );
    }).join("");

    function sizeButton(size, label) {
      return (
        '<button type="button" class="size-btn' + (state.device === size ? " active" : "") +
        '" data-action="device" data-size="' + size + '" aria-pressed="' + (state.device === size ? "true" : "false") + '">' +
        label + "</button>"
      );
    }

    const frames = state.compare
      ? frameCard("before", "Sebelum — " + (lesson.preview.beforeLabel || "hasil sebelumnya"), beforeHtml, "Pratinjau sebelum Pertemuan " + lesson.no) +
        frameCard("after", "Sesudah — " + (lesson.preview.afterLabel || "hasil pertemuan ini"), afterHtml, "Pratinjau sesudah Pertemuan " + lesson.no)
      : frameCard("after", "Hasil Pertemuan " + lesson.no + " — " + pageLabel(page), afterHtml, "Pratinjau hasil Pertemuan " + lesson.no);

    const changes =
      '<div class="change-list">' +
      '<div class="change-card"><h4>Sebelum</h4><ul>' +
      (lesson.preview.before || []).map(function (item) { return "<li>" + inline(item) + "</li>"; }).join("") +
      "</ul></div>" +
      '<div class="change-card"><h4>Sesudah</h4><ul>' +
      (lesson.preview.after || []).map(function (item) { return "<li>" + inline(item) + "</li>"; }).join("") +
      "</ul></div></div>";

    return (
      '<div class="preview-panel">' +
      '<div class="preview-toolbar">' +
      '<div class="preview-tabs" role="tablist" aria-label="Halaman pratinjau">' + tabs + "</div>" +
      '<div class="preview-tools">' +
      sizeButton("desktop", "Desktop") +
      sizeButton("tablet", "Tablet") +
      sizeButton("mobile", "HP") +
      '<button type="button" class="size-btn' + (state.compare ? " active" : "") + '" data-action="toggle-compare" aria-pressed="' +
      (state.compare ? "true" : "false") + '">Bandingkan: ' + (state.compare ? "aktif" : "nonaktif") + "</button>" +
      '<button type="button" class="size-btn" data-action="fullscreen">Layar penuh</button>' +
      "</div></div>" +
      '<div class="preview-grid' + (state.compare ? " compare" : "") + '">' + frames + "</div>" +
      '<p class="preview-note">Pratinjau dirender di dalam iframe terisolasi. Tautan antarhalaman di dalam pratinjau dapat diklik. Garis putus-putus oranye menandai elemen yang baru ditambahkan pada pertemuan ini.</p>' +
      changes +
      "</div>"
    );
  }

  /* ---------- Checklist, penyelesaian, navigasi ---------- */

  function completionSection(lesson) {
    const checked = ensureChecklist(lesson.no);
    const done = isCompleted(lesson.no);
    const allChecked = checked.every(Boolean);
    const total = checked.length;
    const count = checked.filter(Boolean).length;

    const items = lesson.checklist.map(function (item, index) {
      return (
        '<label class="check-item"><input type="checkbox" data-check="' + index + '"' +
        (checked[index] ? " checked" : "") + (done ? " disabled" : "") + ">" +
        "<span>" + inline(item) + "</span></label>"
      );
    }).join("");

    let bar = "";
    if (done) {
      bar =
        '<div class="done-banner" id="doneBanner"><span aria-hidden="true">✓</span> Pertemuan ' + lesson.no +
        " sudah ditandai selesai. Progres tersimpan di perangkat ini.</div>";
      if (lesson.no === TOTAL && allComplete()) {
        bar +=
          '<div class="complete-bar"><span><strong>Seluruh Semester 1 selesai.</strong> Kamu dapat membandingkan hasilmu dengan versi acuan.</span>' +
          '<a class="btn gold" href="../semester-1/index.html">Lihat hasil Semester 1</a></div>';
      }
    } else {
      bar =
        '<div class="complete-bar">' +
        '<span class="small" id="checkCount">' + count + " dari " + total + " checklist tercentang.</span>" +
        '<button class="btn primary" type="button" id="completeButton" data-action="complete"' +
        (allChecked ? "" : " disabled") + ">Tandai Pertemuan " + lesson.no + " selesai</button>" +
        "</div>" +
        '<p class="small" style="margin-top:8px;">Penyelesaian tidak terjadi otomatis. Centang seluruh checklist, lalu tekan tombol di atas.</p>';
    }

    return '<div class="checklist">' + items + "</div>" + bar;
  }

  function lessonNav(lesson) {
    const prev =
      lesson.no > 1
        ? '<button class="btn" type="button" data-action="go-lesson" data-no="' + (lesson.no - 1) + '">← Pertemuan ' + (lesson.no - 1) + "</button>"
        : '<button class="btn" type="button" disabled>← Pertemuan sebelumnya</button>';

    let next = "";
    if (lesson.no < TOTAL) {
      const openNext = isCompleted(lesson.no) || state.teacher;
      next =
        '<button class="btn ' + (openNext ? "primary" : "") + '" type="button" data-action="go-lesson" data-no="' +
        (lesson.no + 1) + '"' + (openNext ? "" : " disabled") + ">Pertemuan " + (lesson.no + 1) + " →</button>";
      if (!openNext) {
        next += '<p class="small" style="width:100%;text-align:right;">Selesaikan pertemuan ini untuk membuka pertemuan berikutnya.</p>';
      }
    } else if (allComplete()) {
      next = '<a class="btn gold" href="../semester-1/index.html">Lihat hasil Semester 1</a>';
    } else {
      next = '<button class="btn" type="button" disabled>Semua pertemuan selesai</button>';
    }

    return '<nav class="lesson-nav" aria-label="Navigasi pertemuan">' +
      '<div class="nav-group">' + prev + "</div>" +
      '<div class="nav-group">' + next + "</div></nav>";
  }

  /* ---------- Aksi ---------- */

  function updateCompletionBar() {
    const lesson = currentLesson();
    const checked = ensureChecklist(lesson.no);
    const count = checked.filter(Boolean).length;
    const countEl = document.getElementById("checkCount");
    const button = document.getElementById("completeButton");
    if (countEl) countEl.textContent = count + " dari " + checked.length + " checklist tercentang.";
    if (button) button.disabled = !checked.every(Boolean);
  }

  function markComplete() {
    const lesson = currentLesson();
    const checked = ensureChecklist(lesson.no);
    if (!checked.every(Boolean)) {
      showToast("Centang seluruh checklist sebelum menandai pertemuan selesai.");
      return;
    }
    checked.forEach(function (_, index) { checked[index] = true; });
    state.completed.add(lesson.no);
    saveProgress();
    renderAll();
    updateResultLinks();
    showToast("Pertemuan " + lesson.no + " ditandai selesai.");
    window.setTimeout(function () {
      const banner = document.getElementById("doneBanner");
      if (banner) banner.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  }

  function toggleTeacher() {
    state.teacher = !state.teacher;
    if (!state.teacher && !isUnlocked(state.current)) {
      state.current = firstOpenLesson();
    }
    saveProgress();
    updateURL();
    renderAll();
    showToast(state.teacher ? "Mode guru aktif: semua pertemuan terbuka." : "Mode guru nonaktif.");
  }

  function resetProgress() {
    if (!window.confirm("Reset seluruh progres Semester 1? Semua checklist dan status selesai akan dihapus.")) return;
    state.completed.clear();
    state.checklist = {};
    state.current = 1;
    state.previewPage = null;
    state.codeFile = null;
    state.codeTab = "full";
    LESSONS.forEach(function (lesson) { ensureChecklist(lesson.no); });
    saveProgress();
    updateURL();
    renderAll();
    showToast("Progres sudah direset. Mulai lagi dari Pertemuan 1.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function currentCodeText() {
    const lesson = currentLesson();
    const model = buildCodeModel(lesson);
    if (state.codeTab === "before") return model.existsBefore ? model.beforeText : "";
    if (state.codeTab === "add") {
      if (!model.existsBefore) return model.afterText;
      if (!model.diff) return "";
      return model.diff
        .filter(function (op) { return op.type === "add"; })
        .map(function (op) { return op.text; })
        .join("\n");
    }
    return model.afterText;
  }

  function fallbackCopy(text) {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function copyCode() {
    const text = currentCodeText();
    if (!text) {
      showToast("Tidak ada kode untuk disalin pada tab ini.");
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        showToast("Kode disalin ke clipboard.");
      }).catch(function () {
        showToast(fallbackCopy(text) ? "Kode disalin ke clipboard." : "Kode tidak dapat disalin otomatis.");
      });
      return;
    }
    showToast(fallbackCopy(text) ? "Kode disalin ke clipboard." : "Kode tidak dapat disalin otomatis.");
  }

  /* ---------- Layar penuh ---------- */

  function currentProject() {
    return Engine.buildProject(currentLesson().no - 1);
  }

  function syncDialogPage() {
    if (!els.previewDialog || !els.dialogFrame) return;
    const lesson = currentLesson();
    const project = currentProject();
    const pages = Engine.getPageList(project);
    if (!pages.length) return;
    if (pages.indexOf(state.previewPage) === -1) state.previewPage = pages[0];

    els.dialogPage.innerHTML = pages.map(function (page) {
      return '<option value="' + esc(page) + '"' + (page === state.previewPage ? " selected" : "") + ">" +
        esc(pageLabel(page)) + " — " + esc(page) + "</option>";
    }).join("");
    els.dialogPage.value = state.previewPage;
    els.dialogTitle.textContent = "Pratinjau — " + pageLabel(state.previewPage);
    els.dialogFrame.srcdoc = Engine.renderPreview(project, {
      page: state.previewPage,
      highlight: (lesson.preview && lesson.preview.highlight) || [],
      assets: PREVIEW_ASSETS,
      token: PREVIEW_TOKEN
    });
  }

  function openFullscreen() {
    if (!els.previewDialog) return;
    syncDialogPage();
    if (typeof els.previewDialog.showModal === "function") {
      els.previewDialog.showModal();
    } else {
      showToast("Browser ini belum mendukung pratinjau layar penuh.");
    }
  }

  /* ---------- Event ---------- */

  document.addEventListener("click", function (event) {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.getAttribute("data-action");

    if (action === "go-lesson") {
      event.preventDefault();
      goToLesson(target.getAttribute("data-no"));
      return;
    }
    if (action === "toggle-teacher") {
      event.preventDefault();
      toggleTeacher();
      return;
    }
    if (action === "code-tab") {
      event.preventDefault();
      state.codeTab = target.getAttribute("data-tab") || "full";
      renderContent();
      return;
    }
    if (action === "preview-page") {
      event.preventDefault();
      state.previewPage = target.getAttribute("data-page");
      renderContent();
      return;
    }
    if (action === "device") {
      event.preventDefault();
      state.device = target.getAttribute("data-size") || "desktop";
      document.querySelectorAll(".frame-shell").forEach(function (shell) {
        shell.classList.remove("device-desktop", "device-tablet", "device-mobile");
        shell.classList.add("device-" + state.device);
      });
      document.querySelectorAll('[data-action="device"]').forEach(function (button) {
        const active = button.getAttribute("data-size") === state.device;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      return;
    }
    if (action === "toggle-compare") {
      event.preventDefault();
      state.compare = !state.compare;
      renderContent();
      return;
    }
    if (action === "fullscreen") {
      event.preventDefault();
      openFullscreen();
      return;
    }
    if (action === "copy-code") {
      event.preventDefault();
      copyCode();
      return;
    }
    if (action === "complete") {
      event.preventDefault();
      markComplete();
    }
  });

  document.addEventListener("change", function (event) {
    const target = event.target;
    if (!target) return;

    if (target.id === "codeFileSelect") {
      state.codeFile = target.value;
      renderContent();
      return;
    }

    if (target.matches("[data-check]")) {
      const lesson = currentLesson();
      if (isCompleted(lesson.no)) return;
      const checked = ensureChecklist(lesson.no);
      const index = Number(target.getAttribute("data-check"));
      if (!Number.isInteger(index) || index < 0 || index >= checked.length) return;
      checked[index] = target.checked;
      saveProgress();
      updateCompletionBar();
    }
  });

  if (els.teacherToggle) {
    els.teacherToggle.addEventListener("click", toggleTeacher);
  }
  if (els.resetProgress) {
    els.resetProgress.addEventListener("click", resetProgress);
  }
  if (els.dialogPage) {
    els.dialogPage.addEventListener("change", function () {
      state.previewPage = els.dialogPage.value;
      renderContent();
      syncDialogPage();
    });
  }
  if (els.previewDialog) {
    els.previewDialog.addEventListener("close", function () {
      if (els.dialogFrame) els.dialogFrame.removeAttribute("srcdoc");
    });
  }

  window.addEventListener("message", function (event) {
    const data = event.data;
    if (!data || data.type !== "preview-nav" || typeof data.page !== "string") return;
    if (data.token !== PREVIEW_TOKEN) return;

    const lesson = currentLesson();
    if (!isUnlocked(lesson.no)) return;

    let project;
    try {
      project = currentProject();
    } catch (error) {
      return;
    }
    const pages = Engine.getPageList(project);
    if (pages.indexOf(data.page) === -1) {
      showToast("Halaman " + data.page + " belum dibuat pada pertemuan ini.");
      return;
    }
    state.previewPage = data.page;
    renderContent();
    if (els.previewDialog && els.previewDialog.open) syncDialogPage();
  });

  /* ---------- Mulai ---------- */

  function init() {
    loadProgress();

    let params;
    try {
      params = new URLSearchParams(window.location.search);
    } catch (error) {
      params = null;
    }

    if (params) {
      const guru = params.get("guru");
      if (guru === "1" || guru === "true") state.teacher = true;
      else if (guru === "0" || guru === "false") state.teacher = false;

      const requested = Number(params.get("pertemuan"));
      if (validLessonNo(requested)) state.current = requested;
      else if (!validLessonNo(state.current) || !isUnlocked(state.current)) {
        state.current = firstOpenLesson();
      }
    } else if (!validLessonNo(state.current) || !isUnlocked(state.current)) {
      state.current = firstOpenLesson();
    }

    LESSONS.forEach(function (lesson) { ensureChecklist(lesson.no); });
    saveProgress();
    renderAll();
    updateURL();
  }

  init();
})();
