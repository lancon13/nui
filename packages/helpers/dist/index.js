import { useAsyncState as G, useRefHistory as X } from "@vueuse/core";
import { toMerged as Q, isEqual as L, cloneDeep as M } from "es-toolkit";
import { debounce as ee, throttle as te, isNumber as F, isObject as q, isEmpty as $ } from "es-toolkit/compat";
import { toRef as K, ref as p, watch as R, computed as f, defineAsyncComponent as re, isReactive as _, toRaw as O, nextTick as ae, inject as ne } from "vue";
import * as I from "zod";
import * as z from "dayjs";
function me(t, e) {
  e ??= {}, e.useCache ??= !0, e.onBefore ??= () => {
  }, e.onAfter ??= () => {
  }, e.onData ??= () => {
  }, e.cacheDuration ??= 5e3;
  const r = /* @__PURE__ */ new Map(), a = K(e.initialParams ?? []), n = K(e.initialResult ?? void 0), l = p(!1), u = p(!1), m = p(!1), h = p(!1), b = {
    isExecuting: l,
    isLoading: p(!1),
    isReady: p(!1),
    result: n,
    error: p(null),
    call: (...o) => P(1, ...o),
    cache: (o = !1) => (m.value = o, b),
    immediate: (o = !1) => (u.value = o, b),
    shallow: (o = !1) => (h.value = o, b),
    refresh: () => P(1, ...a.value)
  }, { execute: P, state: A, isLoading: D, isReady: x, error: v } = G(
    async (...o) => {
      const y = Array.isArray(o) && o.length ? h.value ? { ...a.value, ...o } : Q(a.value, o) : a.value;
      let w;
      if (m.value)
        w = (u.value ? t : S)(...y);
      else {
        const s = JSON.stringify(y);
        if (!r.has(s)) {
          const j = S(...y);
          r.set(s, j), setTimeout(() => r.delete(s), e?.cacheDuration || 1);
        }
        w = r.get(s);
      }
      l.value = !0;
      try {
        const s = await w;
        if (e?.onData?.(y, s), s && typeof s == "object") {
          if ("error" in s && s.error)
            throw s.error;
          if ("data" in s)
            return s.data;
        }
        return s;
      } finally {
        l.value = !1;
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
  b.isLoading = D, b.isReady = x;
  const T = F(e.throttle) && e.throttle > 0 ? te(t, e.throttle) : t, S = F(e.debounce) && e.debounce > 0 ? ee(T, e.debounce) : T;
  R(
    a,
    (o, y) => {
      e.paramsChangedRefresh === !0 && !L(o, y) && P(1, ...a.value);
    },
    { deep: !0 }
  ), R(A, (o) => n.value = o, { deep: !0 });
  const Y = f({
    get: () => {
      if (v.value) {
        if (!(v.value instanceof Error) || typeof v.value == "object")
          return new Error(v.value.toString());
      } else return null;
      return v.value;
    },
    set: (o) => {
      v.value = o;
    }
  });
  return b.error = Y, b;
}
function he(t, e) {
  return t.reduce(
    (r, a) => (r[a] = (...n) => {
      const l = e.value?.[a];
      typeof l == "function" && l.apply(e.value, n);
    }, r),
    {}
  );
}
function be(t) {
  const {
    component: e,
    delay: r = 200,
    timeout: a = 3e3,
    loadingComponent: n,
    errorComponent: l
  } = typeof t == "string" || typeof t == "function" ? { component: t } : t;
  return re({
    loader: typeof e == "string" ? () => import(
      /* @vite-ignore */
      e
    ) : e,
    delay: r,
    timeout: a,
    loadingComponent: n,
    errorComponent: l,
    onError: (u) => {
      throw console.error(u), new Error("Request component not found.");
    }
  });
}
const ve = [
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
], ye = [
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
], ge = [
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
], we = [
  { label: "English", value: "ENGENG" },
  { label: "Mathematics", value: "MATMAT" },
  { label: "Science", value: "SCISCI" },
  { label: "Digital Technologies", value: "TECTDI" }
], Ce = [
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
function W(t) {
  const e = _(t) ? O(t) : t;
  if (q(e) || Array.isArray(e)) {
    for (const r in e)
      if (Object.prototype.hasOwnProperty.call(e, r)) {
        const a = e[r];
        (_(a) || q(a) && Object.keys(a).length > 0 || Array.isArray(a)) && (e[r] = W(a));
      }
  }
  return e;
}
function E(t) {
  return Object.keys(t).filter((e) => isNaN(Number(e)));
}
function Pe(t) {
  return E(t).map((e, r) => r);
}
function Se(t) {
  return E(t).map((r) => t[r]);
}
function Ee(t) {
  return E(t).reduce((r, a) => (r[a] = t[a], r), {});
}
function Ae(t, e) {
  return E(t).findIndex((r) => r === e);
}
function De(t, e) {
  return E(t).reduce(
    (r, a, n) => n === e ? a : r,
    null
  );
}
async function Te(t) {
  return new Promise((e, r) => {
    const a = new FileReader();
    a.onload = function(n) {
      e(n.target?.result);
    }, a.onerror = function(n) {
      r(n);
    }, a.readAsDataURL(t);
  });
}
async function Re(t, e) {
  const [r, a] = t.split(","), n = atob(a ?? ""), l = (((r ?? "").split(":") ?? [])?.[1] ?? "").split(";")[0], u = new ArrayBuffer(n.length), m = new Uint8Array(u);
  for (let h = 0; h < n.length; h++) m[h] = n.charCodeAt(h);
  return new File([u], e, { type: l || "application/octet-stream" });
}
async function xe(t, e = "") {
  try {
    const r = t.startsWith("http") ? t : `${window.location.origin}${t.startsWith("/") ? "" : "/"}${t}`;
    e = e || (r.split("/").pop() ?? ""), e = e.includes("___") ? e.split("___")[1] ?? e : e;
    const a = await fetch(r);
    if (!a.ok)
      throw new Error(`HTTP error! status: ${a.status} - ${a.statusText}`);
    const n = await a.blob();
    return new File([n], e, {
      type: n.type || "application/octet-stream",
      lastModified: (/* @__PURE__ */ new Date()).getTime()
    });
  } catch (r) {
    throw console.error("Error creating File from URL:", r), r;
  }
}
function Ye(t) {
  if (t.type) return t.type;
  const e = t.name.toLowerCase();
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
function je(t, e) {
  const r = p(t), a = p(M(r.value));
  e ??= {
    initialSchemas: I.object({}),
    immediateValidate: !0
  }, e.immediateValidate ??= !0, e.initialSchemas = I.object(
    Object.entries(r.value).reduce(
      (i, [c]) => (i[c] ??= I.any(), i),
      e.initialSchemas?.shape ?? {}
    )
  );
  const n = p(e.initialSchemas), l = p({}), u = p({}), m = p({}), { history: h, undo: b, redo: P, clear: A } = X(r, {
    deep: !0,
    ...e
  }), D = f(() => $(l.value)), x = f(() => !D.value), v = f(() => $(m.value)), T = f(() => !v.value), S = f(() => $(u.value)), Y = f(() => !S.value), o = f(
    () => Object.entries(l.value).reduce(
      (i, [c, d]) => (d.length > 0 && typeof d?.[0]?.message == "string" && (i[c] = d?.[0]?.message), i),
      {}
    )
  ), y = f(() => Object.fromEntries(
    Object.entries(n.value.shape).map(([i, c]) => {
      const d = i in m.value, g = i in u.value, k = i in l.value, C = o.value[i] ?? null, B = {
        value: r.value[i],
        schema: c,
        errors: l.value[i] ?? [],
        errorMessage: C,
        dirtyErrorMessage: d ? C : null,
        changeErrorMessage: g ? C : null,
        isValid: !k,
        isInvalid: k,
        isClean: !d,
        isDirty: d,
        isUnchanged: !g,
        isChanged: g
      };
      return [i, B];
    })
  ));
  function w() {
    const c = O(n.value).safeParse(O(r.value));
    l.value = c.success ? {} : c.error.issues.reduce(
      (d, g) => {
        if (typeof g.path.at(0) == "string") {
          const C = g.path.join(".");
          d[C] ??= [], d[C].push(g);
        }
        return d;
      },
      {}
    );
  }
  async function s(i) {
    return r.value = i || M(a.value), a.value = M(r.value), new Promise((c) => {
      ae(() => {
        A(), l.value = {}, u.value = {}, m.value = {}, c();
      });
    });
  }
  function j() {
    l.value = {};
  }
  function V() {
    u.value = {};
  }
  function Z() {
    m.value = {};
  }
  function J() {
    return W(r.value);
  }
  return R([r, n], w, {
    deep: !0,
    flush: "post",
    immediate: !!e.immediateValidate
  }), R(h, () => {
    const i = h.value.at(0);
    i && (u.value = {}, Object.entries(a.value).forEach(([c, d]) => {
      L(i.snapshot[c], a.value[c]) || (u.value[c] = d, m.value[c] = d);
    }));
  }), {
    data: r,
    schemas: n,
    errors: f(() => l.value),
    changes: f(() => u.value),
    modifies: f(() => m.value),
    history: h,
    undo: b,
    redo: P,
    validate: w,
    reset: s,
    isValid: D,
    isInvalid: x,
    isClean: v,
    isDirty: T,
    isUnchanged: S,
    isChanged: Y,
    errorMessages: o,
    results: y,
    clearHistory: A,
    clearErrors: j,
    clearChanges: V,
    clearModifies: Z,
    getRawData: J
  };
}
function le(t) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t);
}
const U = z.default || z;
function oe(t) {
  return typeof t == "string" ? t : Array.isArray(t) ? t.filter((e) => e).map((e) => oe(e)).join(" ") : typeof t == "object" && t !== null ? Object.entries(t).filter(([, e]) => e).map(([e]) => e).join(" ") : "";
}
function ie(t) {
  return typeof t != "string" || le(t) ? t : t.replace(/([-_][a-z])/gi, (e) => e.toUpperCase().replace("-", "").replace("_", ""));
}
function se(t) {
  return t.replace(/[A-Z]/g, (e) => `_${e.toLowerCase()}`);
}
function ke(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Me(t, e = "DD MMM YYYY (ddd)") {
  return U(t).format(e);
}
function $e(t, e = "YYYY/MM/DD") {
  return U(t).format(e);
}
function Ie(t, e = "hh:mm A") {
  return U(t).format(e);
}
function Oe(t, e = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: e }).format(t);
}
function Ue(t) {
  return new Intl.NumberFormat("en-US").format(t);
}
function Fe(t, e = 2) {
  return t.split(" ").slice(0, e).map((r) => r[0]).join("").toUpperCase();
}
function N(t) {
  return typeof t != "object" || t === null ? t : Array.isArray(t) ? t.map((e) => N(e)) : Object.entries(t).reduce((e, [r, a]) => (e[se(r)] = N(a), e), {});
}
function H(t) {
  return typeof t != "object" || t === null ? t : Array.isArray(t) ? t.map((e) => H(e)) : Object.entries(t).reduce((e, [r, a]) => (e[ie(r)] = H(a), e), {});
}
function qe(t, e = "label", r = "value") {
  return t ? Array.isArray(t) ? t.map((a) => {
    const n = Array.isArray(e) ? e.find((l) => a[l]) : e;
    return {
      label: (n ? a[n] : "") ?? "",
      value: a[r] ?? "",
      data: a
    };
  }) : Object.entries(t).map(([a, n]) => ({
    label: n,
    value: a,
    data: a
  })) : [];
}
const ue = Symbol("system-provider");
function Ke() {
  return ne(ue);
}
function _e() {
  return Math.random().toString(36).substring(2, 15);
}
async function ze(t = 1) {
  return new Promise((e) => setTimeout(e, t));
}
function Ne(t, e) {
  let r;
  return function(...a) {
    clearTimeout(r), r = setTimeout(() => t.apply(this, a), e);
  };
}
function He(t, e) {
  let r;
  return function(...a) {
    r || (t.apply(this, a), r = !0, setTimeout(() => r = !1, e));
  };
}
async function Le(t, ...e) {
  let r = null, a;
  try {
    a = await t(...e);
  } catch (n) {
    r = n instanceof Error ? n : new Error(String(n));
  }
  return [r, a];
}
export {
  be as asyncLoadComponent,
  ve as currencyOptions,
  Ne as debounce,
  ze as delay,
  Ae as findEnumIndex,
  De as findEnumKey,
  N as fromData,
  Re as fromDataUrl,
  xe as fromFileUrl,
  _e as generatePseudoRandomKey,
  Pe as getEnumIndexes,
  E as getEnumKeys,
  Ee as getEnumObject,
  Se as getEnumValues,
  Ye as getMime,
  Ke as getSystemProvider,
  le as isUUID,
  ye as languageOptions,
  he as listChildComponentMethods,
  Ce as questionTypeOptions,
  we as subjectOptions,
  ue as systemProviderKey,
  He as throttle,
  ie as toCamelCase,
  ke as toCapitalCase,
  oe as toClassName,
  Oe as toCurrency,
  H as toData,
  Te as toDataURL,
  $e as toDateInput,
  Me as toDateString,
  Fe as toInitial,
  Ue as toNumber,
  qe as toOptions,
  W as toRawDeep,
  se as toSnakeCase,
  Ie as toTimeString,
  Le as tryCall,
  me as useCall,
  je as useForm,
  ge as yearLevelOptions
};
