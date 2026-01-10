import { useAsyncState as De, useRefHistory as we } from "@vueuse/core";
import { toMerged as Me, isEqual as ce, cloneDeep as J } from "es-toolkit";
import { debounce as Ce, throttle as Ae, isNumber as re, isObject as ae, isEmpty as V } from "es-toolkit/compat";
import { toRef as ne, ref as M, watch as q, computed as C, defineAsyncComponent as Ee, isReactive as ie, toRaw as X, nextTick as Oe, inject as _e } from "vue";
import * as G from "zod";
function et(r, e) {
  e ??= {}, e.useCache ??= !0, e.onBefore ??= () => {
  }, e.onAfter ??= () => {
  }, e.onData ??= () => {
  }, e.cacheDuration ??= 5e3;
  const t = /* @__PURE__ */ new Map(), a = ne(e.initialParams ?? []), n = ne(e.initialResult ?? void 0), i = M(!1), s = M(!1), o = M(!1), u = M(!1), d = {
    isExecuting: i,
    isLoading: M(!1),
    isReady: M(!1),
    result: n,
    error: M(null),
    call: (...l) => c(1, ...l),
    cache: (l = !1) => (o.value = l, d),
    immediate: (l = !1) => (s.value = l, d),
    shallow: (l = !1) => (u.value = l, d),
    refresh: () => c(1, ...a.value)
  }, { execute: c, state: b, isLoading: h, isReady: S, error: g } = De(
    async (...l) => {
      const v = Array.isArray(l) && l.length ? u.value ? { ...a.value, ...l } : Me(a.value, l) : a.value;
      let w;
      if (o.value)
        w = (s.value ? r : O)(...v);
      else {
        const p = JSON.stringify(v);
        if (!t.has(p)) {
          const F = O(...v);
          t.set(p, F), setTimeout(() => t.delete(p), e?.cacheDuration || 1);
        }
        w = t.get(p);
      }
      i.value = !0;
      try {
        const p = await w;
        if (e?.onData?.(v, p), p && typeof p == "object") {
          if ("error" in p && p.error)
            throw p.error;
          if ("data" in p)
            return p.data;
        }
        return p;
      } finally {
        i.value = !1;
      }
    },
    e?.initialResult,
    {
      immediate: !1,
      resetOnExecute: !0,
      throwError: !0,
      ...e
      // Spread options last to allow overrides if necessary
    }
  );
  d.isLoading = h, d.isReady = S;
  const E = re(e.throttle) && e.throttle > 0 ? Ae(r, e.throttle) : r, O = re(e.debounce) && e.debounce > 0 ? Ce(E, e.debounce) : E;
  q(
    a,
    (l, v) => {
      e.paramsChangedRefresh === !0 && !ce(l, v) && c(1, ...a.value);
    },
    { deep: !0 }
  ), q(b, (l) => n.value = l, { deep: !0 });
  const _ = C({
    get: () => {
      if (g.value) {
        if (!(g.value instanceof Error) || typeof g.value == "object")
          return new Error(g.value.toString());
      } else return null;
      return g.value;
    },
    set: (l) => {
      g.value = l;
    }
  });
  return d.error = _, d;
}
function tt(r, e) {
  return r.reduce(
    (t, a) => (t[a] = (...n) => {
      const i = e.value?.[a];
      typeof i == "function" && i.apply(e.value, n);
    }, t),
    {}
  );
}
function rt(r) {
  const {
    component: e,
    delay: t = 200,
    timeout: a = 3e3,
    loadingComponent: n,
    errorComponent: i
  } = typeof r == "string" || typeof r == "function" ? { component: r } : r;
  return Ee({
    loader: typeof e == "string" ? () => import(
      /* @vite-ignore */
      e
    ) : e,
    delay: t,
    timeout: a,
    loadingComponent: n,
    errorComponent: i,
    onError: (s) => {
      throw console.error(s), new Error("Request component not found.");
    }
  });
}
const at = [
  {
    label: "AUD $ - Australian dollar",
    value: "aud",
    description: "Australian dollar",
    symbol: "$"
  },
  {
    label: "USD $ - United States dollar",
    value: "usd",
    description: "United States dollar",
    symbol: "$"
  },
  { label: "EUR € - Euro", value: "eur", description: "Euro", symbol: "€" },
  {
    label: "GBP £ - British pound sterling",
    value: "gbp",
    description: "British pound sterling",
    symbol: "£"
  },
  { label: "JPY ¥ - Japanese yen", value: "jpy", description: "Japanese yen", symbol: "¥" },
  { label: "CAD $ - Canadian dollar", value: "cad", description: "Canadian dollar", symbol: "$" },
  { label: "CHF ₣ - Swiss franc", value: "chf", description: "Swiss franc", symbol: "₣" },
  { label: "CNY ¥ - Chinese yuan", value: "cny", description: "Chinese yuan", symbol: "¥" },
  { label: "INR ₹ - Indian rupee", value: "inr", description: "Indian rupee", symbol: "₹" },
  { label: "BRL R - Brazilian real", value: "brl", description: "Brazilian real", symbol: "R$" },
  { label: "RUB ₽ - Russian ruble", value: "rub", description: "Russian ruble", symbol: "₽" },
  {
    label: "KRW ₩ - South Korean won",
    value: "krw",
    description: "South Korean won",
    symbol: "₩"
  },
  { label: "SEK kr - Swedish krona", value: "sek", description: "Swedish krona", symbol: "kr" },
  {
    label: "NZD $ - New Zealand dollar",
    value: "nzd",
    description: "New Zealand dollar",
    symbol: "$"
  },
  { label: "MXN $ - Mexican peso", value: "mxn", description: "Mexican peso", symbol: "$" },
  {
    label: "SGD $ - Singapore dollar",
    value: "sgd",
    description: "Singapore dollar",
    symbol: "$"
  },
  {
    label: "HKD $ - Hong Kong dollar",
    value: "hkd",
    description: "Hong Kong dollar",
    symbol: "$"
  },
  {
    label: "NOK kr - Norwegian krone",
    value: "nok",
    description: "Norwegian krone",
    symbol: "kr"
  },
  {
    label: "ZAR R - South African rand",
    value: "zar",
    description: "South African rand",
    symbol: "R"
  },
  { label: "THB ฿ - Thai baht", value: "thb", description: "Thai baht", symbol: "฿" },
  {
    label: "AED د.إ - United Arab Emirates dirham",
    value: "aed",
    description: "United Arab Emirates dirham",
    symbol: "د.إ"
  },
  { label: "DKK kr - Danish krone", value: "dkk", description: "Danish krone", symbol: "kr" },
  { label: "PLN zł - Polish złoty", value: "pln", description: "Polish złoty", symbol: "zł" },
  { label: "TRY ₺ - Turkish lira", value: "try", description: "Turkish lira", symbol: "₺" },
  { label: "SAR ﷼ - Saudi riyal", value: "sar", description: "Saudi riyal", symbol: "﷼" },
  {
    label: "ILS ₪ - Israeli new shekel",
    value: "ils",
    description: "Israeli new shekel",
    symbol: "₪"
  },
  { label: "PHP ₱ - Philippine peso", value: "php", description: "Philippine peso", symbol: "₱" },
  {
    label: "MYR RM - Malaysian ringgit",
    value: "myr",
    description: "Malaysian ringgit",
    symbol: "RM"
  },
  {
    label: "TWD NT - New Taiwan dollar",
    value: "twd",
    description: "New Taiwan dollar",
    symbol: "NT$"
  },
  { label: "CZK Kč - Czech koruna", value: "czk", description: "Czech koruna", symbol: "Kč" }
], nt = [
  { label: "English (Australia)", value: "en-au" },
  // { label: 'English (Canada)', value: 'en-ca' },
  // { label: 'English (United Kingdom)', value: 'en-gb' },
  { label: "English (United States)", value: "en-us" },
  // { label: 'Spanish', value: 'es' },
  // { label: 'French', value: 'fr' },
  // { label: 'German', value: 'de' },
  // { label: 'Italian', value: 'it' },
  // { label: 'Portuguese', value: 'pt' },
  // { label: 'Russian', value: 'ru' },
  { label: "Chinese / 繁體中文 (Traditional)", value: "zh-tw" },
  { label: "Chinese / 简体字 (Simplified)", value: "zh-cn" },
  { label: "Japanese / 日本語", value: "jp" }
], it = [
  { label: "Foundation Year", value: "FY" },
  { label: "Year 1", value: "Y1" },
  { label: "Year 2", value: "Y2" },
  { label: "Year 3", value: "Y3" },
  { label: "Year 4", value: "Y4" },
  { label: "Year 5", value: "Y5" },
  { label: "Year 6", value: "Y6" },
  { label: "Year 7", value: "Y7" },
  { label: "Year 8", value: "Y8" },
  { label: "Year 9", value: "Y9" },
  { label: "Year 10", value: "Y10" }
], st = [
  { label: "English", value: "ENGENG" },
  { label: "Mathematics", value: "MATMAT" },
  { label: "Science", value: "SCISCI" },
  { label: "Digital Technologies", value: "TECTDI" }
], ot = [
  {
    label: "Short text",
    value: "short-text",
    questionPlaceholder: "e.g. What is the capital of France?",
    questionCorrectAnswerPlaceholder: "e.g. Paris",
    questionHintsPlaceholder: "e.g. Think about the geography of Europe.",
    questionExplanationsPlaceholder: "e.g. Paris is the capital of France according to its geography."
  },
  {
    label: "Multiple choice",
    value: "multiple-choice",
    questionPlaceholder: "e.g. Which of the following is a capital of France?",
    questionCorrectAnswerPlaceholder: "e.g. Paris",
    questionHintsPlaceholder: "e.g. Think about the geography of Europe.",
    questionExplanationsPlaceholder: "e.g. Paris is the capital of France according to its geography"
  },
  {
    label: "Draw canvas",
    value: "draw-canvas",
    questionPlaceholder: "e.g. Draw the Eiffel Tower.",
    questionCorrectAnswerPlaceholder: "e.g. It should be a picture of a tower with two legs and a flat top.",
    questionHintsPlaceholder: "e.g. Remember the famous tower in Paris",
    questionExplanationsPlaceholder: "e.g. The Eiffel Tower is a famous tower in Paris"
  },
  {
    label: "Fill in the blank",
    value: "fill-in-the-blank",
    questionPlaceholder: "e.g. The capital of France is _______.",
    questionCorrectAnswerPlaceholder: "e.g. Paris",
    questionHintsPlaceholder: "e.g. Think about the geography of Europe.",
    questionExplanationsPlaceholder: "e.g. Paris is the capital of France according to its geography"
  }
];
function fe(r) {
  const e = ie(r) ? X(r) : r;
  if (ae(e) || Array.isArray(e)) {
    for (const t in e)
      if (Object.prototype.hasOwnProperty.call(e, t)) {
        const a = e[t];
        (ie(a) || ae(a) && Object.keys(a).length > 0 || Array.isArray(a)) && (e[t] = fe(a));
      }
  }
  return e;
}
function H(r) {
  return Object.keys(r).filter((e) => isNaN(Number(e)));
}
function ut(r) {
  return H(r).map((e, t) => t);
}
function lt(r) {
  return H(r).map((t) => r[t]);
}
function ct(r) {
  return H(r).reduce((t, a) => (t[a] = r[a], t), {});
}
function ft(r, e) {
  return H(r).findIndex((t) => t === e);
}
function dt(r, e) {
  return H(r).reduce(
    (t, a, n) => n === e ? a : t,
    null
  );
}
async function ht(r) {
  return new Promise((e, t) => {
    const a = new FileReader();
    a.onload = function(n) {
      e(n.target?.result);
    }, a.onerror = function(n) {
      t(n);
    }, a.readAsDataURL(r);
  });
}
async function vt(r, e) {
  const [t, a] = r.split(","), n = atob(a ?? ""), i = (((t ?? "").split(":") ?? [])?.[1] ?? "").split(";")[0], s = new ArrayBuffer(n.length), o = new Uint8Array(s);
  for (let u = 0; u < n.length; u++) o[u] = n.charCodeAt(u);
  return new File([s], e, { type: i || "application/octet-stream" });
}
async function pt(r, e = "") {
  try {
    const t = r.startsWith("http") ? r : `${window.location.origin}${r.startsWith("/") ? "" : "/"}${r}`;
    e = e || (t.split("/").pop() ?? ""), e = e.includes("___") ? e.split("___")[1] ?? e : e;
    const a = await fetch(t);
    if (!a.ok)
      throw new Error(`HTTP error! status: ${a.status} - ${a.statusText}`);
    const n = await a.blob();
    return new File([n], e, {
      type: n.type || "application/octet-stream",
      lastModified: (/* @__PURE__ */ new Date()).getTime()
    });
  } catch (t) {
    throw console.error("Error creating File from URL:", t), t;
  }
}
function mt(r) {
  if (r.type) return r.type;
  const e = r.name.toLowerCase();
  switch (e.substring(e.lastIndexOf(".") + 1)) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "bmp":
      return "image/bmp";
    case "svg":
      return "image/svg+xml";
    case "pdf":
      return "application/pdf";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "ppt":
      return "application/vnd.ms-powerpoint";
    case "pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    case "txt":
      return "text/plain";
    case "zip":
      return "application/zip";
    case "rar":
      return "application/rar";
    case "csv":
      return "text/csv";
    case "mp3":
      return "audio/mpeg";
    case "wav":
      return "audio/wav";
    case "mp4":
      return "video/mp4";
    case "mov":
      return "video/quicktime";
    case "avi":
      return "video/avi";
    default:
      return "application/octet-stream";
  }
}
function yt(r, e) {
  const t = M(r), a = M(J(t.value));
  e ??= {
    initialSchemas: G.object({}),
    immediateValidate: !0
  }, e.immediateValidate ??= !0, e.initialSchemas = G.object(
    Object.entries(t.value).reduce(
      (y, [$]) => (y[$] ??= G.any(), y),
      e.initialSchemas?.shape ?? {}
    )
  );
  const n = M(e.initialSchemas), i = M({}), s = M({}), o = M({}), { history: u, undo: d, redo: c, clear: b } = we(t, {
    deep: !0,
    ...e
  }), h = C(() => V(i.value)), S = C(() => !h.value), g = C(() => V(o.value)), E = C(() => !g.value), O = C(() => V(s.value)), _ = C(() => !O.value), l = C(
    () => Object.entries(i.value).reduce(
      (y, [$, D]) => (D.length > 0 && typeof D?.[0]?.message == "string" && (y[$] = D?.[0]?.message), y),
      {}
    )
  ), v = C(() => Object.fromEntries(
    Object.entries(n.value.shape).map(([y, $]) => {
      const D = y in o.value, Y = y in s.value, Z = y in i.value, k = l.value[y] ?? null, Se = {
        value: t.value[y],
        schema: $,
        errors: i.value[y] ?? [],
        errorMessage: k,
        dirtyErrorMessage: D ? k : null,
        changeErrorMessage: Y ? k : null,
        isValid: !Z,
        isInvalid: Z,
        isClean: !D,
        isDirty: D,
        isUnchanged: !Y,
        isChanged: Y
      };
      return [y, Se];
    })
  ));
  function w() {
    const $ = X(n.value).safeParse(X(t.value));
    i.value = $.success ? {} : $.error.issues.reduce(
      (D, Y) => {
        if (typeof Y.path.at(0) == "string") {
          const k = Y.path.join(".");
          D[k] ??= [], D[k].push(Y);
        }
        return D;
      },
      {}
    );
  }
  async function p(y) {
    return t.value = y || J(a.value), a.value = J(t.value), new Promise(($) => {
      Oe(() => {
        b(), i.value = {}, s.value = {}, o.value = {}, $();
      });
    });
  }
  function F() {
    i.value = {};
  }
  function be() {
    s.value = {};
  }
  function ge() {
    o.value = {};
  }
  function $e() {
    return fe(t.value);
  }
  return q([t, n], w, {
    deep: !0,
    flush: "post",
    immediate: !!e.immediateValidate
  }), q(u, () => {
    const y = u.value.at(0);
    y && (s.value = {}, Object.entries(a.value).forEach(([$, D]) => {
      ce(y.snapshot[$], a.value[$]) || (s.value[$] = D, o.value[$] = D);
    }));
  }), {
    data: t,
    schemas: n,
    errors: C(() => i.value),
    changes: C(() => s.value),
    modifies: C(() => o.value),
    history: u,
    undo: d,
    redo: c,
    validate: w,
    reset: p,
    isValid: h,
    isInvalid: S,
    isClean: g,
    isDirty: E,
    isUnchanged: O,
    isChanged: _,
    errorMessages: l,
    results: v,
    clearHistory: b,
    clearErrors: F,
    clearChanges: be,
    clearModifies: ge,
    getRawData: $e
  };
}
var de = 60, he = de * 60, ve = he * 24, Te = ve * 7, U = 1e3, B = de * U, se = he * U, Pe = ve * U, Ye = Te * U, ee = "millisecond", x = "second", R = "minute", j = "hour", T = "day", z = "week", A = "month", pe = "quarter", P = "year", N = "date", Ie = "YYYY-MM-DDTHH:mm:ssZ", oe = "Invalid Date", ke = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, xe = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const Re = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  ordinal: function(e) {
    var t = ["th", "st", "nd", "rd"], a = e % 100;
    return "[" + e + (t[(a - 20) % 10] || t[a] || t[0]) + "]";
  }
};
var Q = function(e, t, a) {
  var n = String(e);
  return !n || n.length >= t ? e : "" + Array(t + 1 - n.length).join(a) + e;
}, je = function(e) {
  var t = -e.utcOffset(), a = Math.abs(t), n = Math.floor(a / 60), i = a % 60;
  return (t <= 0 ? "+" : "-") + Q(n, 2, "0") + ":" + Q(i, 2, "0");
}, Ne = function r(e, t) {
  if (e.date() < t.date()) return -r(t, e);
  var a = (t.year() - e.year()) * 12 + (t.month() - e.month()), n = e.clone().add(a, A), i = t - n < 0, s = e.clone().add(a + (i ? -1 : 1), A);
  return +(-(a + (t - n) / (i ? n - s : s - n)) || 0);
}, Ue = function(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}, Fe = function(e) {
  var t = {
    M: A,
    y: P,
    w: z,
    d: T,
    D: N,
    h: j,
    m: R,
    s: x,
    ms: ee,
    Q: pe
  };
  return t[e] || String(e || "").toLowerCase().replace(/s$/, "");
}, Le = function(e) {
  return e === void 0;
};
const He = {
  s: Q,
  z: je,
  m: Ne,
  a: Ue,
  p: Fe,
  u: Le
};
var L = "en", I = {};
I[L] = Re;
var me = "$isDayjsObject", te = function(e) {
  return e instanceof W || !!(e && e[me]);
}, K = function r(e, t, a) {
  var n;
  if (!e) return L;
  if (typeof e == "string") {
    var i = e.toLowerCase();
    I[i] && (n = i), t && (I[i] = t, n = i);
    var s = e.split("-");
    if (!n && s.length > 1)
      return r(s[0]);
  } else {
    var o = e.name;
    I[o] = e, n = o;
  }
  return !a && n && (L = n), n || !a && L;
}, m = function(e, t) {
  if (te(e))
    return e.clone();
  var a = typeof t == "object" ? t : {};
  return a.date = e, a.args = arguments, new W(a);
}, ze = function(e, t) {
  return m(e, {
    locale: t.$L,
    utc: t.$u,
    x: t.$x,
    $offset: t.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, f = He;
f.l = K;
f.i = te;
f.w = ze;
var qe = function(e) {
  var t = e.date, a = e.utc;
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  if (f.u(t)) return /* @__PURE__ */ new Date();
  if (t instanceof Date) return new Date(t);
  if (typeof t == "string" && !/Z$/i.test(t)) {
    var n = t.match(ke);
    if (n) {
      var i = n[2] - 1 || 0, s = (n[7] || "0").substring(0, 3);
      return a ? new Date(Date.UTC(n[1], i, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, s)) : new Date(n[1], i, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, s);
    }
  }
  return new Date(t);
}, W = /* @__PURE__ */ (function() {
  function r(t) {
    this.$L = K(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[me] = !0;
  }
  var e = r.prototype;
  return e.parse = function(a) {
    this.$d = qe(a), this.init();
  }, e.init = function() {
    var a = this.$d;
    this.$y = a.getFullYear(), this.$M = a.getMonth(), this.$D = a.getDate(), this.$W = a.getDay(), this.$H = a.getHours(), this.$m = a.getMinutes(), this.$s = a.getSeconds(), this.$ms = a.getMilliseconds();
  }, e.$utils = function() {
    return f;
  }, e.isValid = function() {
    return this.$d.toString() !== oe;
  }, e.isSame = function(a, n) {
    var i = m(a);
    return this.startOf(n) <= i && i <= this.endOf(n);
  }, e.isAfter = function(a, n) {
    return m(a) < this.startOf(n);
  }, e.isBefore = function(a, n) {
    return this.endOf(n) < m(a);
  }, e.$g = function(a, n, i) {
    return f.u(a) ? this[n] : this.set(i, a);
  }, e.unix = function() {
    return Math.floor(this.valueOf() / 1e3);
  }, e.valueOf = function() {
    return this.$d.getTime();
  }, e.startOf = function(a, n) {
    var i = this, s = f.u(n) ? !0 : n, o = f.p(a), u = function(_, l) {
      var v = f.w(i.$u ? Date.UTC(i.$y, l, _) : new Date(i.$y, l, _), i);
      return s ? v : v.endOf(T);
    }, d = function(_, l) {
      var v = [0, 0, 0, 0], w = [23, 59, 59, 999];
      return f.w(i.toDate()[_].apply(
        // eslint-disable-line prefer-spread
        i.toDate("s"),
        (s ? v : w).slice(l)
      ), i);
    }, c = this.$W, b = this.$M, h = this.$D, S = "set" + (this.$u ? "UTC" : "");
    switch (o) {
      case P:
        return s ? u(1, 0) : u(31, 11);
      case A:
        return s ? u(1, b) : u(0, b + 1);
      case z: {
        var g = this.$locale().weekStart || 0, E = (c < g ? c + 7 : c) - g;
        return u(s ? h - E : h + (6 - E), b);
      }
      case T:
      case N:
        return d(S + "Hours", 0);
      case j:
        return d(S + "Minutes", 1);
      case R:
        return d(S + "Seconds", 2);
      case x:
        return d(S + "Milliseconds", 3);
      default:
        return this.clone();
    }
  }, e.endOf = function(a) {
    return this.startOf(a, !1);
  }, e.$set = function(a, n) {
    var i, s = f.p(a), o = "set" + (this.$u ? "UTC" : ""), u = (i = {}, i[T] = o + "Date", i[N] = o + "Date", i[A] = o + "Month", i[P] = o + "FullYear", i[j] = o + "Hours", i[R] = o + "Minutes", i[x] = o + "Seconds", i[ee] = o + "Milliseconds", i)[s], d = s === T ? this.$D + (n - this.$W) : n;
    if (s === A || s === P) {
      var c = this.clone().set(N, 1);
      c.$d[u](d), c.init(), this.$d = c.set(N, Math.min(this.$D, c.daysInMonth())).$d;
    } else u && this.$d[u](d);
    return this.init(), this;
  }, e.set = function(a, n) {
    return this.clone().$set(a, n);
  }, e.get = function(a) {
    return this[f.p(a)]();
  }, e.add = function(a, n) {
    var i = this, s;
    a = Number(a);
    var o = f.p(n), u = function(h) {
      var S = m(i);
      return f.w(S.date(S.date() + Math.round(h * a)), i);
    };
    if (o === A)
      return this.set(A, this.$M + a);
    if (o === P)
      return this.set(P, this.$y + a);
    if (o === T)
      return u(1);
    if (o === z)
      return u(7);
    var d = (s = {}, s[R] = B, s[j] = se, s[x] = U, s)[o] || 1, c = this.$d.getTime() + a * d;
    return f.w(c, this);
  }, e.subtract = function(a, n) {
    return this.add(a * -1, n);
  }, e.format = function(a) {
    var n = this, i = this.$locale();
    if (!this.isValid()) return i.invalidDate || oe;
    var s = a || Ie, o = f.z(this), u = this.$H, d = this.$m, c = this.$M, b = i.weekdays, h = i.months, S = i.meridiem, g = function(v, w, p, F) {
      return v && (v[w] || v(n, s)) || p[w].slice(0, F);
    }, E = function(v) {
      return f.s(u % 12 || 12, v, "0");
    }, O = S || function(l, v, w) {
      var p = l < 12 ? "AM" : "PM";
      return w ? p.toLowerCase() : p;
    }, _ = function(v) {
      switch (v) {
        case "YY":
          return String(n.$y).slice(-2);
        case "YYYY":
          return f.s(n.$y, 4, "0");
        case "M":
          return c + 1;
        case "MM":
          return f.s(c + 1, 2, "0");
        case "MMM":
          return g(i.monthsShort, c, h, 3);
        case "MMMM":
          return g(h, c);
        case "D":
          return n.$D;
        case "DD":
          return f.s(n.$D, 2, "0");
        case "d":
          return String(n.$W);
        case "dd":
          return g(i.weekdaysMin, n.$W, b, 2);
        case "ddd":
          return g(i.weekdaysShort, n.$W, b, 3);
        case "dddd":
          return b[n.$W];
        case "H":
          return String(u);
        case "HH":
          return f.s(u, 2, "0");
        case "h":
          return E(1);
        case "hh":
          return E(2);
        case "a":
          return O(u, d, !0);
        case "A":
          return O(u, d, !1);
        case "m":
          return String(d);
        case "mm":
          return f.s(d, 2, "0");
        case "s":
          return String(n.$s);
        case "ss":
          return f.s(n.$s, 2, "0");
        case "SSS":
          return f.s(n.$ms, 3, "0");
        case "Z":
          return o;
      }
      return null;
    };
    return s.replace(xe, function(l, v) {
      return v || _(l) || o.replace(":", "");
    });
  }, e.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, e.diff = function(a, n, i) {
    var s = this, o = f.p(n), u = m(a), d = (u.utcOffset() - this.utcOffset()) * B, c = this - u, b = function() {
      return f.m(s, u);
    }, h;
    switch (o) {
      case P:
        h = b() / 12;
        break;
      case A:
        h = b();
        break;
      case pe:
        h = b() / 3;
        break;
      case z:
        h = (c - d) / Ye;
        break;
      case T:
        h = (c - d) / Pe;
        break;
      case j:
        h = c / se;
        break;
      case R:
        h = c / B;
        break;
      case x:
        h = c / U;
        break;
      default:
        h = c;
        break;
    }
    return i ? h : f.a(h);
  }, e.daysInMonth = function() {
    return this.endOf(A).$D;
  }, e.$locale = function() {
    return I[this.$L];
  }, e.locale = function(a, n) {
    if (!a) return this.$L;
    var i = this.clone(), s = K(a, n, !0);
    return s && (i.$L = s), i;
  }, e.clone = function() {
    return f.w(this.$d, this);
  }, e.toDate = function() {
    return new Date(this.valueOf());
  }, e.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  }, e.toISOString = function() {
    return this.$d.toISOString();
  }, e.toString = function() {
    return this.$d.toUTCString();
  }, r;
})(), ye = W.prototype;
m.prototype = ye;
[["$ms", ee], ["$s", x], ["$m", R], ["$H", j], ["$W", T], ["$M", A], ["$y", P], ["$D", N]].forEach(function(r) {
  ye[r[1]] = function(e) {
    return this.$g(e, r[0], r[1]);
  };
});
m.extend = function(r, e) {
  return r.$i || (r(e, W, m), r.$i = !0), m;
};
m.locale = K;
m.isDayjs = te;
m.unix = function(r) {
  return m(r * 1e3);
};
m.en = I[L];
m.Ls = I;
m.p = {};
function Ke(r) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(r);
}
function We(r) {
  return typeof r == "string" ? r : Array.isArray(r) ? r.filter((e) => e).map((e) => We(e)).join(" ") : typeof r == "object" && r !== null ? Object.entries(r).filter(([, e]) => e).map(([e]) => e).join(" ") : "";
}
function Ze(r) {
  return typeof r != "string" || Ke(r) ? r : r.replace(/([-_][a-z])/gi, (e) => e.toUpperCase().replace("-", "").replace("_", ""));
}
function Je(r) {
  return r.replace(/[A-Z]/g, (e) => `_${e.toLowerCase()}`);
}
function bt(r) {
  return r.charAt(0).toUpperCase() + r.slice(1);
}
function gt(r, e = "DD MMM YYYY (ddd)") {
  return m(r).format(e);
}
function $t(r, e = "YYYY/MM/DD") {
  return m(r).format(e);
}
function St(r, e = "hh:mm A") {
  return m(r).format(e);
}
function Dt(r, e = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: e }).format(r);
}
function wt(r) {
  return new Intl.NumberFormat("en-US").format(r);
}
function Mt(r, e = 2) {
  return r.split(" ").slice(0, e).map((t) => t[0]).join("").toUpperCase();
}
function ue(r) {
  return typeof r != "object" || r === null ? r : Array.isArray(r) ? r.map((e) => ue(e)) : Object.entries(r).reduce((e, [t, a]) => (e[Je(t)] = ue(a), e), {});
}
function le(r) {
  return typeof r != "object" || r === null ? r : Array.isArray(r) ? r.map((e) => le(e)) : Object.entries(r).reduce((e, [t, a]) => (e[Ze(t)] = le(a), e), {});
}
function Ct(r, e = "label", t = "value") {
  return r ? Array.isArray(r) ? r.map((a) => {
    const n = Array.isArray(e) ? e.find((i) => a[i]) : e;
    return {
      label: (n ? a[n] : "") ?? "",
      value: a[t] ?? "",
      data: a
    };
  }) : Object.entries(r).map(([a, n]) => ({
    label: n,
    value: a,
    data: a
  })) : [];
}
const Ve = Symbol("system-provider");
function At() {
  return _e(Ve);
}
function Et() {
  return Math.random().toString(36).substring(2, 15);
}
async function Ot(r = 1) {
  return new Promise((e) => setTimeout(e, r));
}
function _t(r, e) {
  let t;
  return function(...a) {
    clearTimeout(t), t = setTimeout(() => r.apply(this, a), e);
  };
}
function Tt(r, e) {
  let t;
  return function(...a) {
    t || (r.apply(this, a), t = !0, setTimeout(() => t = !1, e));
  };
}
async function Pt(r, ...e) {
  let t = null, a;
  try {
    a = await r(...e);
  } catch (n) {
    t = n instanceof Error ? n : new Error(String(n));
  }
  return [t, a];
}
export {
  rt as asyncLoadComponent,
  at as currencyOptions,
  _t as debounce,
  Ot as delay,
  ft as findEnumIndex,
  dt as findEnumKey,
  ue as fromData,
  vt as fromDataUrl,
  pt as fromFileUrl,
  Et as generatePseudoRandomKey,
  ut as getEnumIndexes,
  H as getEnumKeys,
  ct as getEnumObject,
  lt as getEnumValues,
  mt as getMime,
  At as getSystemProvider,
  Ke as isUUID,
  nt as languageOptions,
  tt as listChildComponentMethods,
  ot as questionTypeOptions,
  st as subjectOptions,
  Ve as systemProviderKey,
  Tt as throttle,
  Ze as toCamelCase,
  bt as toCapitalCase,
  We as toClassName,
  Dt as toCurrency,
  le as toData,
  ht as toDataURL,
  $t as toDateInput,
  gt as toDateString,
  Mt as toInitial,
  wt as toNumber,
  Ct as toOptions,
  fe as toRawDeep,
  Je as toSnakeCase,
  St as toTimeString,
  Pt as tryCall,
  et as useCall,
  yt as useForm,
  it as yearLevelOptions
};
