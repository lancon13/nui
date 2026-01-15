import { defineComponent as re, useAttrs as le, getCurrentInstance as Ct, computed as p, createBlock as _, openBlock as m, resolveDynamicComponent as j, mergeProps as W, withKeys as lt, withModifiers as Ge, withCtx as Y, renderSlot as A, createElementBlock as O, createCommentVNode as M, normalizeClass as D, createTextVNode as Dt, toDisplayString as we, h as J, Text as Bn, Comment as Rn, isVNode as an, ref as ce, getCurrentScope as ba, onScopeDispose as ka, unref as ve, createVNode as ae, normalizeProps as qe, guardReactiveProps as st, useSlots as Oe, Transition as Re, Fragment as ue, renderList as ge, mergeModels as Ie, useModel as Se, watch as Me, createElementVNode as ee, normalizeStyle as Pt, toRefs as wa, nextTick as Te, withDirectives as ut, isRef as ln, vModelCheckbox as Nn, shallowRef as bn, toValue as Ee, useTemplateRef as Je, vModelDynamic as Fn, provide as Ca, onUnmounted as Ln, Teleport as Vt, render as at, onMounted as En, inject as $a, createSlots as Ft, vModelSelect as Ia, vModelRadio as xa } from "vue";
import { generatePseudoRandomKey as Ne, delay as kn, toClassName as Sa } from "@nui/helpers";
import { vOnClickOutside as Aa } from "@vueuse/components";
import { toArray as _a, unrefElement as Ma, tryOnScopeDispose as Ta, useEventListener as bt, useIntersectionObserver as Da, useTimeoutFn as wn, useElementSize as Oa, useDebounceFn as Pn } from "@vueuse/core";
import { createFocusTrap as Ba } from "focus-trap";
import { useFloating as Ra, autoUpdate as Na, offset as Cn, flip as Fa, shift as La } from "@floating-ui/vue";
function Vn(n) {
  var s, t, e = "";
  if (typeof n == "string" || typeof n == "number") e += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var a = n.length;
    for (s = 0; s < a; s++) n[s] && (t = Vn(n[s])) && (e && (e += " "), e += t);
  } else for (t in n) n[t] && (e && (e += " "), e += t);
  return e;
}
function Ea() {
  for (var n, s, t = 0, e = "", a = arguments.length; t < a; t++) (n = arguments[t]) && (s = Vn(n)) && (e && (e += " "), e += s);
  return e;
}
const Pa = (n, s) => {
  const t = new Array(n.length + s.length);
  for (let e = 0; e < n.length; e++)
    t[e] = n[e];
  for (let e = 0; e < s.length; e++)
    t[n.length + e] = s[e];
  return t;
}, Va = (n, s) => ({
  classGroupId: n,
  validator: s
}), Yn = (n = /* @__PURE__ */ new Map(), s = null, t) => ({
  nextPart: n,
  validators: s,
  classGroupId: t
}), Lt = "-", $n = [], Ya = "arbitrary..", Ha = (n) => {
  const s = Wa(n), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: e
  } = n;
  return {
    getClassGroupId: (r) => {
      if (r.startsWith("[") && r.endsWith("]"))
        return za(r);
      const c = r.split(Lt), l = c[0] === "" && c.length > 1 ? 1 : 0;
      return Hn(c, l, s);
    },
    getConflictingClassGroupIds: (r, c) => {
      if (c) {
        const l = e[r], i = t[r];
        return l ? i ? Pa(i, l) : l : i || $n;
      }
      return t[r] || $n;
    }
  };
}, Hn = (n, s, t) => {
  if (n.length - s === 0)
    return t.classGroupId;
  const a = n[s], o = t.nextPart.get(a);
  if (o) {
    const i = Hn(n, s + 1, o);
    if (i) return i;
  }
  const r = t.validators;
  if (r === null)
    return;
  const c = s === 0 ? n.join(Lt) : n.slice(s).join(Lt), l = r.length;
  for (let i = 0; i < l; i++) {
    const u = r[i];
    if (u.validator(c))
      return u.classGroupId;
  }
}, za = (n) => n.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const s = n.slice(1, -1), t = s.indexOf(":"), e = s.slice(0, t);
  return e ? Ya + e : void 0;
})(), Wa = (n) => {
  const {
    theme: s,
    classGroups: t
  } = n;
  return ja(t, s);
}, ja = (n, s) => {
  const t = Yn();
  for (const e in n) {
    const a = n[e];
    cn(a, t, e, s);
  }
  return t;
}, cn = (n, s, t, e) => {
  const a = n.length;
  for (let o = 0; o < a; o++) {
    const r = n[o];
    Ga(r, s, t, e);
  }
}, Ga = (n, s, t, e) => {
  if (typeof n == "string") {
    Ua(n, s, t);
    return;
  }
  if (typeof n == "function") {
    Ka(n, s, t, e);
    return;
  }
  Za(n, s, t, e);
}, Ua = (n, s, t) => {
  const e = n === "" ? s : zn(s, n);
  e.classGroupId = t;
}, Ka = (n, s, t, e) => {
  if (Xa(n)) {
    cn(n(e), s, t, e);
    return;
  }
  s.validators === null && (s.validators = []), s.validators.push(Va(t, n));
}, Za = (n, s, t, e) => {
  const a = Object.entries(n), o = a.length;
  for (let r = 0; r < o; r++) {
    const [c, l] = a[r];
    cn(l, zn(s, c), t, e);
  }
}, zn = (n, s) => {
  let t = n;
  const e = s.split(Lt), a = e.length;
  for (let o = 0; o < a; o++) {
    const r = e[o];
    let c = t.nextPart.get(r);
    c || (c = Yn(), t.nextPart.set(r, c)), t = c;
  }
  return t;
}, Xa = (n) => "isThemeGetter" in n && n.isThemeGetter === !0, qa = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let s = 0, t = /* @__PURE__ */ Object.create(null), e = /* @__PURE__ */ Object.create(null);
  const a = (o, r) => {
    t[o] = r, s++, s > n && (s = 0, e = t, t = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(o) {
      let r = t[o];
      if (r !== void 0)
        return r;
      if ((r = e[o]) !== void 0)
        return a(o, r), r;
    },
    set(o, r) {
      o in t ? t[o] = r : a(o, r);
    }
  };
}, sn = "!", In = ":", Ja = [], xn = (n, s, t, e, a) => ({
  modifiers: n,
  hasImportantModifier: s,
  baseClassName: t,
  maybePostfixModifierPosition: e,
  isExternal: a
}), Qa = (n) => {
  const {
    prefix: s,
    experimentalParseClassName: t
  } = n;
  let e = (a) => {
    const o = [];
    let r = 0, c = 0, l = 0, i;
    const u = a.length;
    for (let y = 0; y < u; y++) {
      const h = a[y];
      if (r === 0 && c === 0) {
        if (h === In) {
          o.push(a.slice(l, y)), l = y + 1;
          continue;
        }
        if (h === "/") {
          i = y;
          continue;
        }
      }
      h === "[" ? r++ : h === "]" ? r-- : h === "(" ? c++ : h === ")" && c--;
    }
    const d = o.length === 0 ? a : a.slice(l);
    let f = d, k = !1;
    d.endsWith(sn) ? (f = d.slice(0, -1), k = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      d.startsWith(sn) && (f = d.slice(1), k = !0)
    );
    const $ = i && i > l ? i - l : void 0;
    return xn(o, k, f, $);
  };
  if (s) {
    const a = s + In, o = e;
    e = (r) => r.startsWith(a) ? o(r.slice(a.length)) : xn(Ja, !1, r, void 0, !0);
  }
  if (t) {
    const a = e;
    e = (o) => t({
      className: o,
      parseClassName: a
    });
  }
  return e;
}, es = (n) => {
  const s = /* @__PURE__ */ new Map();
  return n.orderSensitiveModifiers.forEach((t, e) => {
    s.set(t, 1e6 + e);
  }), (t) => {
    const e = [];
    let a = [];
    for (let o = 0; o < t.length; o++) {
      const r = t[o], c = r[0] === "[", l = s.has(r);
      c || l ? (a.length > 0 && (a.sort(), e.push(...a), a = []), e.push(r)) : a.push(r);
    }
    return a.length > 0 && (a.sort(), e.push(...a)), e;
  };
}, ts = (n) => ({
  cache: qa(n.cacheSize),
  parseClassName: Qa(n),
  sortModifiers: es(n),
  ...Ha(n)
}), ns = /\s+/, as = (n, s) => {
  const {
    parseClassName: t,
    getClassGroupId: e,
    getConflictingClassGroupIds: a,
    sortModifiers: o
  } = s, r = [], c = n.trim().split(ns);
  let l = "";
  for (let i = c.length - 1; i >= 0; i -= 1) {
    const u = c[i], {
      isExternal: d,
      modifiers: f,
      hasImportantModifier: k,
      baseClassName: $,
      maybePostfixModifierPosition: y
    } = t(u);
    if (d) {
      l = u + (l.length > 0 ? " " + l : l);
      continue;
    }
    let h = !!y, g = e(h ? $.substring(0, y) : $);
    if (!g) {
      if (!h) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (g = e($), !g) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      h = !1;
    }
    const b = f.length === 0 ? "" : f.length === 1 ? f[0] : o(f).join(":"), v = k ? b + sn : b, S = v + g;
    if (r.indexOf(S) > -1)
      continue;
    r.push(S);
    const B = a(g, h);
    for (let R = 0; R < B.length; ++R) {
      const E = B[R];
      r.push(v + E);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
}, ss = (...n) => {
  let s = 0, t, e, a = "";
  for (; s < n.length; )
    (t = n[s++]) && (e = Wn(t)) && (a && (a += " "), a += e);
  return a;
}, Wn = (n) => {
  if (typeof n == "string")
    return n;
  let s, t = "";
  for (let e = 0; e < n.length; e++)
    n[e] && (s = Wn(n[e])) && (t && (t += " "), t += s);
  return t;
}, os = (n, ...s) => {
  let t, e, a, o;
  const r = (l) => {
    const i = s.reduce((u, d) => d(u), n());
    return t = ts(i), e = t.cache.get, a = t.cache.set, o = c, c(l);
  }, c = (l) => {
    const i = e(l);
    if (i)
      return i;
    const u = as(l, t);
    return a(l, u), u;
  };
  return o = r, (...l) => o(ss(...l));
}, rs = [], $e = (n) => {
  const s = (t) => t[n] || rs;
  return s.isThemeGetter = !0, s;
}, jn = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Gn = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ls = /^\d+\/\d+$/, is = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, cs = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, us = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ds = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, fs = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ft = (n) => ls.test(n), K = (n) => !!n && !Number.isNaN(Number(n)), et = (n) => !!n && Number.isInteger(Number(n)), en = (n) => n.endsWith("%") && K(n.slice(0, -1)), Ze = (n) => is.test(n), ps = () => !0, ms = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  cs.test(n) && !us.test(n)
), Un = () => !1, vs = (n) => ds.test(n), hs = (n) => fs.test(n), gs = (n) => !F(n) && !L(n), ys = (n) => $t(n, Xn, Un), F = (n) => jn.test(n), ot = (n) => $t(n, qn, ms), tn = (n) => $t(n, $s, K), Sn = (n) => $t(n, Kn, Un), bs = (n) => $t(n, Zn, hs), Ot = (n) => $t(n, Jn, vs), L = (n) => Gn.test(n), At = (n) => It(n, qn), ks = (n) => It(n, Is), An = (n) => It(n, Kn), ws = (n) => It(n, Xn), Cs = (n) => It(n, Zn), Bt = (n) => It(n, Jn, !0), $t = (n, s, t) => {
  const e = jn.exec(n);
  return e ? e[1] ? s(e[1]) : t(e[2]) : !1;
}, It = (n, s, t = !1) => {
  const e = Gn.exec(n);
  return e ? e[1] ? s(e[1]) : t : !1;
}, Kn = (n) => n === "position" || n === "percentage", Zn = (n) => n === "image" || n === "url", Xn = (n) => n === "length" || n === "size" || n === "bg-size", qn = (n) => n === "length", $s = (n) => n === "number", Is = (n) => n === "family-name", Jn = (n) => n === "shadow", xs = () => {
  const n = $e("color"), s = $e("font"), t = $e("text"), e = $e("font-weight"), a = $e("tracking"), o = $e("leading"), r = $e("breakpoint"), c = $e("container"), l = $e("spacing"), i = $e("radius"), u = $e("shadow"), d = $e("inset-shadow"), f = $e("text-shadow"), k = $e("drop-shadow"), $ = $e("blur"), y = $e("perspective"), h = $e("aspect"), g = $e("ease"), b = $e("animate"), v = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], B = () => [...S(), L, F], R = () => ["auto", "hidden", "clip", "visible", "scroll"], E = () => ["auto", "contain", "none"], I = () => [L, F, l], x = () => [ft, "full", "auto", ...I()], q = () => [et, "none", "subgrid", L, F], V = () => ["auto", {
    span: ["full", et, L, F]
  }, et, L, F], G = () => [et, "auto", L, F], he = () => ["auto", "min", "max", "fr", L, F], fe = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Z = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], se = () => ["auto", ...I()], U = () => [ft, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...I()], N = () => [n, L, F], ke = () => [...S(), An, Sn, {
    position: [L, F]
  }], Ae = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], _e = () => ["auto", "cover", "contain", ws, ys, {
    size: [L, F]
  }], Be = () => [en, At, ot], de = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    i,
    L,
    F
  ], pe = () => ["", K, At, ot], ye = () => ["solid", "dashed", "dotted", "double"], Ce = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], te = () => [K, en, An, Sn], Fe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    $,
    L,
    F
  ], xe = () => ["none", K, L, F], Le = () => ["none", K, L, F], ze = () => [K, L, F], Ke = () => [ft, "full", ...I()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ze],
      breakpoint: [Ze],
      color: [ps],
      container: [Ze],
      "drop-shadow": [Ze],
      ease: ["in", "out", "in-out"],
      font: [gs],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ze],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ze],
      shadow: [Ze],
      spacing: ["px", K],
      text: [Ze],
      "text-shadow": [Ze],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", ft, F, L, h]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [K, F, L, c]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": v()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": v()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: B()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: R()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": R()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": R()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: E()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": E()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": E()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: x()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": x()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": x()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: x()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: x()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: x()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: x()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: x()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: x()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [et, "auto", L, F]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ft, "full", "auto", c, ...I()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [K, ft, "auto", "initial", "none", F]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", K, L, F]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", K, L, F]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [et, "first", "last", "none", L, F]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": q()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: V()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": G()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": G()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": q()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: V()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": G()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": G()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": he()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": he()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: I()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": I()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": I()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...fe(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Z(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Z()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...fe()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": fe()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Z(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Z()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: I()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: I()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: I()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: I()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: I()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: I()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: I()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: I()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: I()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: se()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: se()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: se()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: se()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: se()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: se()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: se()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: se()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: se()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": I()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": I()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: U()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [c, "screen", ...U()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          c,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...U()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          c,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [r]
          },
          ...U()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...U()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...U()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...U()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", t, At, ot]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [e, L, tn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", en, F]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ks, F, s]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [a, L, F]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [K, "none", L, tn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          o,
          ...I()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", L, F]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", L, F]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: N()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: N()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...ye(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [K, "from-font", "auto", L, ot]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: N()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [K, "auto", L, F]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: I()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", L, F]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", L, F]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: ke()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Ae()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: _e()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, et, L, F],
          radial: ["", L, F],
          conic: [et, L, F]
        }, Cs, bs]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: N()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Be()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Be()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Be()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: N()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: N()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: N()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: de()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": de()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": de()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": de()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": de()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": de()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": de()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": de()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": de()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": de()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": de()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": de()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": de()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": de()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": de()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: pe()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": pe()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": pe()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": pe()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": pe()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": pe()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": pe()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": pe()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": pe()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": pe()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": pe()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...ye(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ye(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: N()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": N()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": N()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": N()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": N()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": N()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": N()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": N()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": N()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: N()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ye(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [K, L, F]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", K, At, ot]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: N()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          u,
          Bt,
          Ot
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: N()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, Bt, Ot]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": N()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: pe()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: N()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [K, ot]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": N()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": pe()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": N()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", f, Bt, Ot]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": N()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [K, L, F]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Ce(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ce()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [K]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": te()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": te()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": N()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": N()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": te()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": te()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": N()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": N()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": te()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": te()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": N()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": N()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": te()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": te()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": N()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": N()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": te()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": te()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": N()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": N()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": te()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": te()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": N()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": N()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": te()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": te()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": N()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": N()
      }],
      "mask-image-radial": [{
        "mask-radial": [L, F]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": te()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": te()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": N()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": N()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": S()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [K]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": te()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": te()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": N()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": N()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: ke()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Ae()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: _e()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", L, F]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          L,
          F
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Fe()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [K, L, F]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [K, L, F]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          k,
          Bt,
          Ot
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": N()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", K, L, F]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [K, L, F]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", K, L, F]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [K, L, F]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", K, L, F]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          L,
          F
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Fe()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [K, L, F]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [K, L, F]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", K, L, F]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [K, L, F]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", K, L, F]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [K, L, F]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [K, L, F]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", K, L, F]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": I()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": I()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": I()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", L, F]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [K, "initial", L, F]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", g, L, F]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [K, L, F]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", b, L, F]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [y, L, F]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": B()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: xe()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": xe()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": xe()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": xe()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Le()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Le()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Le()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Le()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: ze()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ze()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ze()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [L, F, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: B()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Ke()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Ke()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Ke()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Ke()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: N()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: N()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", L, F]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": I()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": I()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": I()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": I()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": I()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": I()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": I()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": I()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": I()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": I()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": I()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": I()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": I()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": I()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": I()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": I()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": I()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": I()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", L, F]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...N()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [K, At, ot, tn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...N()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Ss = /* @__PURE__ */ os(xs);
function Q(...n) {
  return Ss(Ea(n));
}
const X = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NIcon",
  props: {
    name: {},
    tag: { default: "i" },
    to: {},
    href: {},
    target: {},
    disabled: { type: Boolean }
  },
  setup(n) {
    const s = le(), t = Ct(), e = n, a = p(() => !e.disabled && (e.to || e.href || !!s.onClick)), o = p(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), r = p(() => {
      const u = e.name || "mdi-account";
      return u.startsWith("mdi-") ? ["mdi", u] : ["mdi", `mdi-${u}`];
    }), c = p(
      () => Q(
        "n-icon",
        a.value ? "n-icon--clickable" : "",
        e.disabled ? "n-icon--disabled" : "",
        ...r.value,
        s.class
      )
    ), l = p(() => {
      const { class: u, ...d } = s;
      return o.value === "RouterLink" ? (d.to = e.to, d.target = e.target) : o.value === "a" && (d.href = e.href, d.target = e.target), d;
    });
    function i(u) {
      if (e.disabled) {
        u.preventDefault(), u.stopPropagation();
        return;
      }
      a.value && t?.emit("click", u);
    }
    return (u, d) => (m(), _(j(o.value), W({
      class: c.value,
      role: a.value ? "button" : "img",
      tabindex: a.value ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, l.value, {
      onKeydown: lt(Ge(i, ["prevent"]), ["enter", "space"])
    }), {
      default: Y(() => [
        A(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
}), As = ["aria-hidden"], _s = {
  key: 2,
  class: "n-avatar-sizer",
  "aria-hidden": "true"
}, Ms = ["src", "alt"], wr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NAvatar",
  props: {
    src: {},
    alt: {},
    icon: {},
    label: {},
    tag: { default: "span" },
    to: {},
    href: {},
    target: {},
    disabled: { type: Boolean }
  },
  emits: ["click"],
  setup(n, { emit: s }) {
    const t = le(), e = n, a = s, o = p(() => !e.disabled && (e.to || e.href || !!t.onClick)), r = p(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), c = p(() => Q(
      "n-avatar",
      o.value ? "n-avatar--clickable" : "",
      e.disabled ? "n-avatar--disabled" : "",
      t.class
    )), l = p(() => {
      const { class: u, ...d } = t;
      return r.value === "RouterLink" ? (d.to = e.to, d.target = e.target) : r.value === "a" && (d.href = e.href, d.target = e.target), d;
    });
    function i(u) {
      if (e.disabled) {
        u.preventDefault(), u.stopPropagation();
        return;
      }
      o.value && a("click", u);
    }
    return (u, d) => (m(), _(j(r.value), W({
      class: c.value,
      role: o.value && r.value === "span" ? "button" : void 0,
      tabindex: o.value && r.value === "span" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, l.value, {
      onClick: i,
      onKeydown: lt(Ge(i, ["prevent"]), ["enter", "space"])
    }), {
      default: Y(() => [
        e.icon ? (m(), _(X, {
          key: 0,
          name: e.icon,
          class: D({ "opacity-0": e.src }),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : e.label || u.$slots.default ? (m(), O("span", {
          key: 1,
          class: D(["n-avatar-label", { "opacity-0": e.src }]),
          "aria-hidden": e.src ? "true" : void 0
        }, [
          A(u.$slots, "default", {}, () => [
            Dt(we(e.label), 1)
          ])
        ], 10, As)) : (m(), O("span", _s, " ")),
        e.src ? (m(), O("img", {
          key: 3,
          src: e.src,
          alt: e.alt || e.label || "",
          class: "n-avatar-image"
        }, null, 8, Ms)) : M("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
}), Yt = (n, s) => {
  if (typeof document > "u") return null;
  const t = s || document;
  return typeof n == "string" ? t.querySelector(n) : n;
}, Qn = (n = null) => {
  if (n)
    return Yt(n)?.parentElement || null;
  const s = Ct();
  return s ? s.proxy?.$el?.parentElement || null : (console.warn("getParentElement() without a selector can only be used inside setup() or lifecycle hooks."), null);
}, Ts = (n) => {
  if (an(n) && n.type) {
    if (typeof n.type == "string")
      return n.type;
    if (typeof n.type == "object" && n.type !== null) {
      const s = n.type;
      return s.name || s.__name || s.__name__ || "";
    }
  }
  return "";
}, Cr = (n, s) => typeof n.type != "string" ? !1 : (Array.isArray(s) ? s : [s]).includes(n.type), Rt = (n, s) => {
  const t = Ts(n);
  return t ? (Array.isArray(s) ? s : [s]).includes(t) : !1;
}, Ds = (n, s) => {
  if (!n.props || typeof n.props.class != "string")
    return !1;
  const t = n.props.class.split(/\s+/);
  return (Array.isArray(s) ? s : [s]).some((a) => t.includes(a));
};
function De(n, s = "span", t = {}) {
  return n ? (Array.isArray(n) ? n : [n]).map((a) => {
    if (typeof a == "string")
      return J(s, t, a);
    if ((a.type === Bn || a.type === Rn) && (a?.shapeFlag & 8) > 0) {
      const o = a.children;
      if (o?.trim())
        return J(s, t, o);
    }
    return a;
  }) : [];
}
function Xe(...n) {
  const s = [];
  return n.forEach((t) => {
    t && (typeof t == "string" ? s.push(t) : Array.isArray(t) ? s.push(...t) : typeof t == "object" && s.push(t));
  }), s;
}
function ea(n, s, t = {}) {
  const { immediate: e = !1 } = t, a = ce(!1), o = ce(!1);
  let r = null, c = 0, l = 0;
  const i = () => {
    a.value = !1, o.value = !1, l = 0, r && (clearTimeout(r), r = null);
  }, u = () => {
    i();
    const k = ve(s);
    k <= 0 || (a.value = !0, o.value = !1, l = k, c = Date.now(), r = setTimeout(() => {
      a.value = !1, n();
    }, l));
  }, d = () => {
    if (!a.value || o.value || !r) return;
    o.value = !0, clearTimeout(r), r = null;
    const k = Date.now() - c;
    l -= k;
  }, f = () => {
    !a.value || !o.value || (o.value = !1, c = Date.now(), r = setTimeout(() => {
      a.value = !1, n();
    }, l));
  };
  return ba() && ka(i), e && u(), {
    start: u,
    stop: i,
    pause: d,
    resume: f,
    isPending: a,
    isPaused: o
  };
}
const Os = {
  key: 0,
  class: "n-loading-overlay"
}, xt = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NLoading",
  props: {
    name: {},
    class: {},
    overlay: { type: Boolean }
  },
  setup(n) {
    const s = le(), t = n, e = p(() => ({
      name: t.name || "loading",
      class: Q("animate-spin", t.class),
      ...s
    }));
    return (a, o) => t.overlay ? (m(), O("span", Os, [
      ae(X, qe(st(e.value)), null, 16)
    ])) : (m(), _(X, qe(W({ key: 1 }, e.value)), null, 16));
  }
}), Bs = { key: 1 }, on = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NButton",
  props: {
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    label: {},
    tag: { default: "button" },
    type: { default: "button" },
    loading: { type: Boolean },
    loadingName: {},
    loadingClass: {},
    to: {},
    href: {},
    target: {}
  },
  setup(n) {
    const s = Oe(), t = le(), e = n, a = p(() => Q("n-button", e.loading ? "n-button--loading" : "", t.class)), o = p(() => e.to ? "RouterLink" : e.href ? "a" : e.tag), r = p(() => {
      const { class: l, ...i } = t;
      return o.value === "RouterLink" ? (i.to = e.to, i.target = e.target) : o.value === "a" && (i.href = e.href, i.target = e.target), i;
    }), c = p(() => De(s.default?.() ?? [], "span"));
    return (l, i) => (m(), _(j(o.value), W({
      class: a.value,
      type: e.type,
      disabled: ve(t).disabled || e.loading,
      "aria-disabled": ve(t).disabled || e.loading ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, r.value), {
      default: Y(() => [
        A(l.$slots, "loading", {}, () => [
          ae(Re, { name: "n-loading-overlay" }, {
            default: Y(() => [
              e.loading ? (m(), _(xt, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: D(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : M("", !0)
            ]),
            _: 1
          })
        ]),
        A(l.$slots, "prepend"),
        e.prependIcon || e.icon ? (m(), _(X, {
          key: 0,
          name: e.prependIcon || e.icon,
          class: D([
            ...e.iconClass ? ["string", "object"].includes(typeof e.iconClass) ? [e.iconClass] : e.iconClass : [],
            ...e.prependIconClass ? ["string", "object"].includes(typeof e.prependIconClass) ? [e.prependIconClass] : e.prependIconClass : []
          ]),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : M("", !0),
        e.label ? (m(), O("span", Bs, we(e.label), 1)) : M("", !0),
        (m(!0), O(ue, null, ge(c.value, (u, d) => (m(), _(j(u), { key: d }))), 128)),
        e.appendIcon ? (m(), _(X, {
          key: 2,
          name: e.appendIcon,
          class: D(e.appendIconClass),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : M("", !0),
        A(l.$slots, "append")
      ]),
      _: 3
    }, 16, ["class", "type", "disabled", "aria-disabled", "aria-busy"]));
  }
}), Rs = ["innerHTML"], Ns = {
  class: "n-banner-progress",
  "aria-hidden": "true"
}, ta = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NBanner",
  props: /* @__PURE__ */ Ie({
    tag: { default: "div" },
    label: {},
    icon: {},
    iconClass: {},
    labelClass: {},
    actionsClass: {},
    inlineActions: { type: Boolean, default: !0 },
    duration: { default: 0 },
    showProgress: { type: Boolean, default: !1 },
    actions: {}
  }, {
    modelValue: { type: Boolean, default: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Ie(["timer-begin", "timer-end", "timer-pause", "timer-resume"], ["update:modelValue"]),
  setup(n, { emit: s }) {
    const t = s, e = Oe(), a = le(), o = n, r = Se(n, "modelValue"), c = ea(
      () => {
        t("timer-end");
      },
      p(() => o.duration),
      { immediate: !1 }
    ), l = () => {
      o.duration > 0 && !c.isPaused.value && (c.pause(), t("timer-pause"));
    }, i = () => {
      o.duration > 0 && c.isPaused.value && (c.resume(), t("timer-resume"));
    };
    Me(
      r,
      ($) => {
        $ && o.duration > 0 ? (c.start(), t("timer-begin")) : c.stop();
      },
      { immediate: !0 }
    );
    const u = p(() => Q("n-banner", o.inlineActions ? "n-banner--inline" : "", a.class)), d = p(() => {
      const { class: $, ...y } = a;
      return y;
    }), f = p(() => ({
      "--n-banner-duration": `${o.duration}ms`
    })), k = p(() => De(e.default?.() ?? [], "div"));
    return ($, y) => r.value ? (m(), _(j(o.tag), W({
      key: 0,
      class: u.value,
      style: f.value
    }, d.value, {
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "true",
      onMouseenter: l,
      onMouseleave: i,
      onFocusin: l,
      onFocusout: i
    }), {
      default: Y(() => [
        ee("div", {
          class: D(["n-banner-label", o.labelClass])
        }, [
          A($.$slots, "icon", {}, () => [
            o.icon ? (m(), _(X, {
              key: 0,
              name: o.icon,
              class: D(o.iconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : M("", !0)
          ]),
          o.label ? (m(), O("span", {
            key: 0,
            innerHTML: o.label
          }, null, 8, Rs)) : M("", !0),
          (m(!0), O(ue, null, ge(k.value, (h, g) => (m(), _(j(h), { key: g }))), 128))
        ], 2),
        $.$slots.actions || o.actions ? (m(), O("div", {
          key: 0,
          class: D(["n-banner-actions", o.actionsClass])
        }, [
          A($.$slots, "actions", {}, () => [
            (m(!0), O(ue, null, ge(o.actions, (h, g) => (m(), _(on, W({
              key: g,
              ref_for: !0
            }, h), null, 16))), 128))
          ])
        ], 2)) : M("", !0),
        o.showProgress && o.duration > 0 ? A($.$slots, "progress", { key: 1 }, () => [
          ee("div", Ns, [
            ee("div", {
              class: "n-banner-progress-bar",
              style: Pt({ animationPlayState: ve(c).isPaused.value ? "paused" : "running" })
            }, null, 4)
          ])
        ]) : M("", !0)
      ]),
      _: 3
    }, 16, ["class", "style"])) : M("", !0);
  }
});
var na = 60, aa = na * 60, sa = aa * 24, Fs = sa * 7, wt = 1e3, nn = na * wt, _n = aa * wt, Ls = sa * wt, Es = Fs * wt, Ht = "millisecond", mt = "second", vt = "minute", ht = "hour", Pe = "day", nt = "week", He = "month", oa = "quarter", Ve = "year", gt = "date", ra = "YYYY-MM-DDTHH:mm:ssZ", Mn = "Invalid Date", Ps = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Vs = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const Ys = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  ordinal: function(s) {
    var t = ["th", "st", "nd", "rd"], e = s % 100;
    return "[" + s + (t[(e - 20) % 10] || t[e] || t[0]) + "]";
  }
};
var rn = function(s, t, e) {
  var a = String(s);
  return !a || a.length >= t ? s : "" + Array(t + 1 - a.length).join(e) + s;
}, Hs = function(s) {
  var t = -s.utcOffset(), e = Math.abs(t), a = Math.floor(e / 60), o = e % 60;
  return (t <= 0 ? "+" : "-") + rn(a, 2, "0") + ":" + rn(o, 2, "0");
}, zs = function n(s, t) {
  if (s.date() < t.date()) return -n(t, s);
  var e = (t.year() - s.year()) * 12 + (t.month() - s.month()), a = s.clone().add(e, He), o = t - a < 0, r = s.clone().add(e + (o ? -1 : 1), He);
  return +(-(e + (t - a) / (o ? a - r : r - a)) || 0);
}, Ws = function(s) {
  return s < 0 ? Math.ceil(s) || 0 : Math.floor(s);
}, js = function(s) {
  var t = {
    M: He,
    y: Ve,
    w: nt,
    d: Pe,
    D: gt,
    h: ht,
    m: vt,
    s: mt,
    ms: Ht,
    Q: oa
  };
  return t[s] || String(s || "").toLowerCase().replace(/s$/, "");
}, Gs = function(s) {
  return s === void 0;
};
const Us = {
  s: rn,
  z: Hs,
  m: zs,
  a: Ws,
  p: js,
  u: Gs
};
var Mt = "en", it = {};
it[Mt] = Ys;
var la = "$isDayjsObject", un = function(s) {
  return s instanceof zt || !!(s && s[la]);
}, Et = function n(s, t, e) {
  var a;
  if (!s) return Mt;
  if (typeof s == "string") {
    var o = s.toLowerCase();
    it[o] && (a = o), t && (it[o] = t, a = o);
    var r = s.split("-");
    if (!a && r.length > 1)
      return n(r[0]);
  } else {
    var c = s.name;
    it[c] = s, a = c;
  }
  return !e && a && (Mt = a), a || !e && Mt;
}, P = function(s, t) {
  if (un(s))
    return s.clone();
  var e = typeof t == "object" ? t : {};
  return e.date = s, e.args = arguments, new zt(e);
}, Ks = function(s, t) {
  return P(s, {
    locale: t.$L,
    utc: t.$u,
    x: t.$x,
    $offset: t.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, ie = Us;
ie.l = Et;
ie.i = un;
ie.w = Ks;
var Zs = function(s) {
  var t = s.date, e = s.utc;
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  if (ie.u(t)) return /* @__PURE__ */ new Date();
  if (t instanceof Date) return new Date(t);
  if (typeof t == "string" && !/Z$/i.test(t)) {
    var a = t.match(Ps);
    if (a) {
      var o = a[2] - 1 || 0, r = (a[7] || "0").substring(0, 3);
      return e ? new Date(Date.UTC(a[1], o, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, r)) : new Date(a[1], o, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, r);
    }
  }
  return new Date(t);
}, zt = /* @__PURE__ */ (function() {
  function n(t) {
    this.$L = Et(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[la] = !0;
  }
  var s = n.prototype;
  return s.parse = function(e) {
    this.$d = Zs(e), this.init();
  }, s.init = function() {
    var e = this.$d;
    this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
  }, s.$utils = function() {
    return ie;
  }, s.isValid = function() {
    return this.$d.toString() !== Mn;
  }, s.isSame = function(e, a) {
    var o = P(e);
    return this.startOf(a) <= o && o <= this.endOf(a);
  }, s.isAfter = function(e, a) {
    return P(e) < this.startOf(a);
  }, s.isBefore = function(e, a) {
    return this.endOf(a) < P(e);
  }, s.$g = function(e, a, o) {
    return ie.u(e) ? this[a] : this.set(o, e);
  }, s.unix = function() {
    return Math.floor(this.valueOf() / 1e3);
  }, s.valueOf = function() {
    return this.$d.getTime();
  }, s.startOf = function(e, a) {
    var o = this, r = ie.u(a) ? !0 : a, c = ie.p(e), l = function(g, b) {
      var v = ie.w(o.$u ? Date.UTC(o.$y, b, g) : new Date(o.$y, b, g), o);
      return r ? v : v.endOf(Pe);
    }, i = function(g, b) {
      var v = [0, 0, 0, 0], S = [23, 59, 59, 999];
      return ie.w(o.toDate()[g].apply(
        // eslint-disable-line prefer-spread
        o.toDate("s"),
        (r ? v : S).slice(b)
      ), o);
    }, u = this.$W, d = this.$M, f = this.$D, k = "set" + (this.$u ? "UTC" : "");
    switch (c) {
      case Ve:
        return r ? l(1, 0) : l(31, 11);
      case He:
        return r ? l(1, d) : l(0, d + 1);
      case nt: {
        var $ = this.$locale().weekStart || 0, y = (u < $ ? u + 7 : u) - $;
        return l(r ? f - y : f + (6 - y), d);
      }
      case Pe:
      case gt:
        return i(k + "Hours", 0);
      case ht:
        return i(k + "Minutes", 1);
      case vt:
        return i(k + "Seconds", 2);
      case mt:
        return i(k + "Milliseconds", 3);
      default:
        return this.clone();
    }
  }, s.endOf = function(e) {
    return this.startOf(e, !1);
  }, s.$set = function(e, a) {
    var o, r = ie.p(e), c = "set" + (this.$u ? "UTC" : ""), l = (o = {}, o[Pe] = c + "Date", o[gt] = c + "Date", o[He] = c + "Month", o[Ve] = c + "FullYear", o[ht] = c + "Hours", o[vt] = c + "Minutes", o[mt] = c + "Seconds", o[Ht] = c + "Milliseconds", o)[r], i = r === Pe ? this.$D + (a - this.$W) : a;
    if (r === He || r === Ve) {
      var u = this.clone().set(gt, 1);
      u.$d[l](i), u.init(), this.$d = u.set(gt, Math.min(this.$D, u.daysInMonth())).$d;
    } else l && this.$d[l](i);
    return this.init(), this;
  }, s.set = function(e, a) {
    return this.clone().$set(e, a);
  }, s.get = function(e) {
    return this[ie.p(e)]();
  }, s.add = function(e, a) {
    var o = this, r;
    e = Number(e);
    var c = ie.p(a), l = function(f) {
      var k = P(o);
      return ie.w(k.date(k.date() + Math.round(f * e)), o);
    };
    if (c === He)
      return this.set(He, this.$M + e);
    if (c === Ve)
      return this.set(Ve, this.$y + e);
    if (c === Pe)
      return l(1);
    if (c === nt)
      return l(7);
    var i = (r = {}, r[vt] = nn, r[ht] = _n, r[mt] = wt, r)[c] || 1, u = this.$d.getTime() + e * i;
    return ie.w(u, this);
  }, s.subtract = function(e, a) {
    return this.add(e * -1, a);
  }, s.format = function(e) {
    var a = this, o = this.$locale();
    if (!this.isValid()) return o.invalidDate || Mn;
    var r = e || ra, c = ie.z(this), l = this.$H, i = this.$m, u = this.$M, d = o.weekdays, f = o.months, k = o.meridiem, $ = function(v, S, B, R) {
      return v && (v[S] || v(a, r)) || B[S].slice(0, R);
    }, y = function(v) {
      return ie.s(l % 12 || 12, v, "0");
    }, h = k || function(b, v, S) {
      var B = b < 12 ? "AM" : "PM";
      return S ? B.toLowerCase() : B;
    }, g = function(v) {
      switch (v) {
        case "YY":
          return String(a.$y).slice(-2);
        case "YYYY":
          return ie.s(a.$y, 4, "0");
        case "M":
          return u + 1;
        case "MM":
          return ie.s(u + 1, 2, "0");
        case "MMM":
          return $(o.monthsShort, u, f, 3);
        case "MMMM":
          return $(f, u);
        case "D":
          return a.$D;
        case "DD":
          return ie.s(a.$D, 2, "0");
        case "d":
          return String(a.$W);
        case "dd":
          return $(o.weekdaysMin, a.$W, d, 2);
        case "ddd":
          return $(o.weekdaysShort, a.$W, d, 3);
        case "dddd":
          return d[a.$W];
        case "H":
          return String(l);
        case "HH":
          return ie.s(l, 2, "0");
        case "h":
          return y(1);
        case "hh":
          return y(2);
        case "a":
          return h(l, i, !0);
        case "A":
          return h(l, i, !1);
        case "m":
          return String(i);
        case "mm":
          return ie.s(i, 2, "0");
        case "s":
          return String(a.$s);
        case "ss":
          return ie.s(a.$s, 2, "0");
        case "SSS":
          return ie.s(a.$ms, 3, "0");
        case "Z":
          return c;
      }
      return null;
    };
    return r.replace(Vs, function(b, v) {
      return v || g(b) || c.replace(":", "");
    });
  }, s.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, s.diff = function(e, a, o) {
    var r = this, c = ie.p(a), l = P(e), i = (l.utcOffset() - this.utcOffset()) * nn, u = this - l, d = function() {
      return ie.m(r, l);
    }, f;
    switch (c) {
      case Ve:
        f = d() / 12;
        break;
      case He:
        f = d();
        break;
      case oa:
        f = d() / 3;
        break;
      case nt:
        f = (u - i) / Es;
        break;
      case Pe:
        f = (u - i) / Ls;
        break;
      case ht:
        f = u / _n;
        break;
      case vt:
        f = u / nn;
        break;
      case mt:
        f = u / wt;
        break;
      default:
        f = u;
        break;
    }
    return o ? f : ie.a(f);
  }, s.daysInMonth = function() {
    return this.endOf(He).$D;
  }, s.$locale = function() {
    return it[this.$L];
  }, s.locale = function(e, a) {
    if (!e) return this.$L;
    var o = this.clone(), r = Et(e, a, !0);
    return r && (o.$L = r), o;
  }, s.clone = function() {
    return ie.w(this.$d, this);
  }, s.toDate = function() {
    return new Date(this.valueOf());
  }, s.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  }, s.toISOString = function() {
    return this.$d.toISOString();
  }, s.toString = function() {
    return this.$d.toUTCString();
  }, n;
})(), ia = zt.prototype;
P.prototype = ia;
[["$ms", Ht], ["$s", mt], ["$m", vt], ["$H", ht], ["$W", Pe], ["$M", He], ["$y", Ve], ["$D", gt]].forEach(function(n) {
  ia[n[1]] = function(s) {
    return this.$g(s, n[0], n[1]);
  };
});
P.extend = function(n, s) {
  return n.$i || (n(s, zt, P), n.$i = !0), P;
};
P.locale = Et;
P.isDayjs = un;
P.unix = function(n) {
  return P(n * 1e3);
};
P.en = it[Mt];
P.Ls = it;
P.p = {};
const Xs = (function(n, s) {
  var t = s.prototype, e = t.format;
  t.format = function(a) {
    var o = this, r = this.$locale();
    if (!this.isValid())
      return e.bind(this)(a);
    var c = this.$utils(), l = a || ra, i = l.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(u) {
      switch (u) {
        case "Q":
          return Math.ceil((o.$M + 1) / 3);
        case "Do":
          return r.ordinal(o.$D);
        case "gggg":
          return o.weekYear();
        case "GGGG":
          return o.isoWeekYear();
        case "wo":
          return r.ordinal(o.week(), "W");
        // W for week
        case "w":
        case "ww":
          return c.s(o.week(), u === "w" ? 1 : 2, "0");
        case "W":
        case "WW":
          return c.s(o.isoWeek(), u === "W" ? 1 : 2, "0");
        case "k":
        case "kk":
          return c.s(String(o.$H === 0 ? 24 : o.$H), u === "k" ? 1 : 2, "0");
        case "X":
          return Math.floor(o.$d.getTime() / 1e3);
        case "x":
          return o.$d.getTime();
        case "z":
          return "[" + o.offsetName() + "]";
        case "zzz":
          return "[" + o.offsetName("long") + "]";
        default:
          return u;
      }
    });
    return e.bind(this)(i);
  };
});
var qs = "isoweek";
const Js = (function(n, s, t) {
  var e = function(l, i) {
    var u = (i ? t.utc : t)().year(l).startOf(Ve), d = 4 - u.isoWeekday();
    return u.isoWeekday() > 4 && (d += 7), u.add(d, Pe);
  }, a = function(l) {
    return l.add(4 - l.isoWeekday(), Pe);
  }, o = s.prototype;
  o.isoWeekYear = function() {
    var c = a(this);
    return c.year();
  }, o.isoWeek = function(c) {
    if (!this.$utils().u(c))
      return this.add((c - this.isoWeek()) * 7, Pe);
    var l = a(this), i = e(this.isoWeekYear(), this.$u);
    return l.diff(i, nt) + 1;
  }, o.isoWeekday = function(c) {
    return this.$utils().u(c) ? this.day() || 7 : this.day(this.day() % 7 ? c : c - 7);
  };
  var r = o.startOf;
  o.startOf = function(c, l) {
    var i = this.$utils(), u = i.u(l) ? !0 : l, d = i.p(c);
    return d === qs ? u ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : r.bind(this)(c, l);
  };
}), Qs = (function(n, s) {
  s.prototype.isSameOrAfter = function(t, e) {
    return this.isSame(t, e) || this.isAfter(t, e);
  };
}), eo = (function(n, s) {
  s.prototype.isSameOrBefore = function(t, e) {
    return this.isSame(t, e) || this.isBefore(t, e);
  };
});
var to = function(s) {
  return s.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(t, e, a) {
    return e || a.slice(1);
  });
};
const no = (function(n, s, t) {
  var e = s.prototype, a = function(u) {
    return u && (u.indexOf ? u : u.s);
  }, o = function(u, d, f, k, $) {
    var y = u.name ? u : u.$locale(), h = a(y[d]), g = a(y[f]), b = h || g.map(function(S) {
      return S.slice(0, k);
    });
    if (!$) return b;
    var v = y.weekStart;
    return b.map(function(S, B) {
      return b[(B + (v || 0)) % 7];
    });
  }, r = function() {
    return t.Ls[t.locale()];
  }, c = function(u, d) {
    return u.formats[d] || to(u.formats[d.toUpperCase()]);
  }, l = function() {
    var u = this;
    return {
      months: function(f) {
        return f ? f.format("MMMM") : o(u, "months");
      },
      monthsShort: function(f) {
        return f ? f.format("MMM") : o(u, "monthsShort", "months", 3);
      },
      firstDayOfWeek: function() {
        return u.$locale().weekStart || 0;
      },
      weekdays: function(f) {
        return f ? f.format("dddd") : o(u, "weekdays");
      },
      weekdaysMin: function(f) {
        return f ? f.format("dd") : o(u, "weekdaysMin", "weekdays", 2);
      },
      weekdaysShort: function(f) {
        return f ? f.format("ddd") : o(u, "weekdaysShort", "weekdays", 3);
      },
      longDateFormat: function(f) {
        return c(u.$locale(), f);
      },
      meridiem: this.$locale().meridiem,
      ordinal: this.$locale().ordinal
    };
  };
  e.localeData = function() {
    return l.bind(this)();
  }, t.localeData = function() {
    var i = r();
    return {
      firstDayOfWeek: function() {
        return i.weekStart || 0;
      },
      weekdays: function() {
        return t.weekdays();
      },
      weekdaysShort: function() {
        return t.weekdaysShort();
      },
      weekdaysMin: function() {
        return t.weekdaysMin();
      },
      months: function() {
        return t.months();
      },
      monthsShort: function() {
        return t.monthsShort();
      },
      longDateFormat: function(d) {
        return c(i, d);
      },
      meridiem: i.meridiem,
      ordinal: i.ordinal
    };
  }, t.months = function() {
    return o(r(), "months");
  }, t.monthsShort = function() {
    return o(r(), "monthsShort", "months", 3);
  }, t.weekdays = function(i) {
    return o(r(), "weekdays", null, null, i);
  }, t.weekdaysShort = function(i) {
    return o(r(), "weekdaysShort", "weekdays", 3, i);
  }, t.weekdaysMin = function(i) {
    return o(r(), "weekdaysMin", "weekdays", 2, i);
  };
}), ao = (function(n, s, t) {
  t.updateLocale = function(e, a) {
    var o = t.Ls, r = o[e];
    if (r) {
      var c = a ? Object.keys(a) : [];
      return c.forEach(function(l) {
        r[l] = a[l];
      }), r;
    }
  };
}), so = (function(n, s) {
  var t = s.prototype;
  t.weekday = function(e) {
    var a = this.$locale().weekStart || 0, o = this.$W, r = (o < a ? o + 7 : o) - a;
    return this.$utils().u(e) ? r : this.subtract(r, "day").add(e, "day");
  };
}), oo = (function(n, s, t) {
  var e = s.prototype;
  e.week = function(a) {
    if (a === void 0 && (a = null), a !== null)
      return this.add((a - this.week()) * 7, Pe);
    var o = this.$locale().yearStart || 1;
    if (this.month() === 11 && this.date() > 25) {
      var r = t(this).startOf(Ve).add(1, Ve).date(o), c = t(this).endOf(nt);
      if (r.isBefore(c))
        return 1;
    }
    var l = t(this).startOf(Ve).date(o), i = l.startOf(nt).subtract(1, Ht), u = this.diff(i, nt, !0);
    return u < 0 ? t(this).startOf("week").week() : Math.ceil(u);
  }, e.weeks = function(a) {
    return a === void 0 && (a = null), this.week(a);
  };
}), ro = (function(n, s) {
  var t = s.prototype;
  t.isLeapYear = function() {
    return this.$y % 4 === 0 && this.$y % 100 !== 0 || this.$y % 400 === 0;
  };
}), lo = (function(n, s) {
  var t = s.prototype;
  t.isoWeeksInYear = function() {
    var e = this.isLeapYear(), a = this.endOf("y"), o = a.day();
    return o === 4 || e && o === 5 ? 53 : 52;
  };
});
P.extend(Xs);
P.extend(Js);
P.extend(Qs);
P.extend(eo);
P.extend(no);
P.extend(ao);
P.extend(so);
P.extend(oo);
P.extend(ro);
P.extend(lo);
function tt(n) {
  if (!n || n.length === 0) return [];
  const s = [];
  for (const a of n) {
    if (!a) continue;
    let o, r;
    if (typeof a == "string" || a instanceof Date)
      o = P(a), r = o;
    else {
      const c = a;
      if (!c.begin && !c.end) continue;
      if (c.begin && !c.end)
        o = P(c.begin), r = o;
      else if (!c.begin && c.end)
        o = P(c.end), r = o;
      else {
        const l = P(c.begin), i = P(c.end);
        l.isBefore(i) ? (o = l, r = i) : (o = i, r = l);
      }
    }
    !o.isValid() || !r.isValid() || s.push({ start: o.startOf("day"), end: r.startOf("day") });
  }
  if (s.length === 0) return [];
  s.sort((a, o) => a.start.diff(o.start));
  const t = [];
  let e = s[0];
  for (let a = 1; a < s.length; a++) {
    const o = s[a], r = e.end.add(1, "day");
    r.isAfter(o.start) || r.isSame(o.start) ? o.end.isAfter(e.end) && (e.end = o.end) : (t.push(e), e = o);
  }
  return t.push(e), t.map((a) => a.start.isSame(a.end, "day") ? a.start.format("YYYY-MM-DD") : {
    begin: a.start.format("YYYY-MM-DD"),
    end: a.end.format("YYYY-MM-DD")
  });
}
function kt(n, s) {
  if (!s || s.length === 0) return !1;
  const t = n.format("YYYY-MM-DD");
  for (const e of s)
    if (e)
      if (typeof e == "string" || e instanceof Date) {
        if (P(e).format("YYYY-MM-DD") === t) return !0;
      } else {
        const a = e;
        if (!a.begin && !a.end) continue;
        const o = n;
        let r = !0, c = !0;
        if (a.begin) {
          const l = P(a.begin);
          r = o.isAfter(l, "day") || o.isSame(l, "day");
        }
        if (a.end) {
          const l = P(a.end);
          c = o.isBefore(l, "day") || o.isSame(l, "day");
        }
        if (r && c) return !0;
      }
  return !1;
}
function io(n, s, t = 0) {
  let e = P(`${n}-${String(s + 1).padStart(2, "0")}-01`);
  return t !== 0 && (e = e.add(t, "week")), {
    year: e.isoWeekYear(),
    week: e.isoWeek()
  };
}
function $r(n, s) {
  const t = P(`${n}-01-04`).isoWeek(s).startOf("isoWeek").add(3, "day");
  return {
    year: t.year(),
    month: t.month()
  };
}
function co(n, s, t) {
  if (!t || t.length === 0)
    return [
      {
        begin: n.format("YYYY-MM-DD"),
        end: s.format("YYYY-MM-DD")
      }
    ];
  const e = [];
  let a = null, o = n.clone();
  const r = s.clone();
  if (o.isAfter(r))
    return [];
  for (; o.isSameOrBefore(r, "day"); )
    kt(o, t) ? a || (a = o.clone()) : a && (e.push({
      begin: a.format("YYYY-MM-DD"),
      end: o.subtract(1, "day").format("YYYY-MM-DD")
    }), a = null), o = o.add(1, "day");
  return a && e.push({
    begin: a.format("YYYY-MM-DD"),
    end: r.format("YYYY-MM-DD")
  }), e;
}
function Tn(n, s, t) {
  const e = Math.abs(s.diff(n, "day")) + 1;
  if (t.minRange !== void 0 && e < t.minRange || t.maxRange !== void 0 && e > t.maxRange) return !1;
  const [a, o] = n.isBefore(s) ? [n, s] : [s, n];
  let r = a.clone();
  for (; r.isSameOrBefore(o, "day"); ) {
    if (t.disabled && kt(r, t.disabled)) return !1;
    r = r.add(1, "day");
  }
  return !0;
}
function uo(n) {
  const {
    start: s,
    daysCount: t,
    activeMonth: e,
    selected: a,
    disabled: o,
    visible: r,
    isRange: c,
    pendingStart: l,
    pendingEnd: i,
    pendingInvalid: u
  } = n, d = [];
  let f = s.clone();
  const k = P(), $ = (v) => kt(v, o), y = (v) => !r || kt(v, r), h = (v) => !l || !i ? !1 : v.isSameOrAfter(l, "day") && v.isSameOrBefore(i, "day"), g = (v) => kt(v, a) ? !0 : c && l && !i ? v.isSame(l, "day") : !1, b = (v) => g(v) || h(v);
  for (let v = 0; v < t; v++) {
    const S = $(f), B = y(f), R = h(f), E = f.subtract(1, "day"), I = f.add(1, "day"), x = b(f), q = b(E), V = b(I);
    let G = !0;
    e !== void 0 && (e === null ? G = !1 : Array.isArray(e) ? G = e.includes(f.month()) : G = f.month() === e), d.push({
      date: f,
      dateString: f.format("YYYY-MM-DD"),
      dayOfMonth: f.date(),
      ariaLabel: f.format("dddd, MMMM D, YYYY"),
      isCurrentMonth: G,
      isToday: f.isSame(k, "day"),
      isSelected: x,
      isDisabled: S,
      isVisible: B,
      isInvalid: R && !!u,
      isSelecting: R,
      isRangeStart: x && !q && V,
      isRangeEnd: x && !V && q,
      isInRange: x && (q || V)
    }), f = f.add(1, "day");
  }
  return d;
}
function fo(n, s) {
  if (!n || n.length === 0) return n;
  const t = n.findIndex((a) => {
    if (typeof a == "object" && a !== null && "begin" in a) {
      const o = a;
      return P(o.begin).isSame(s.begin, "day") && P(o.end).isSame(s.end, "day");
    }
    return !1;
  });
  if (t === -1) return n;
  const e = [...n];
  return e.splice(t, 1), e;
}
const po = ["aria-label"], mo = ["aria-multiselectable"], vo = ["aria-label", "aria-selected", "aria-disabled", "tabindex", "onClick", "onMouseenter", "onFocus", "onKeydown"], ho = { class: "n-calendar-view-day-number" }, Ir = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NCalendar",
  props: {
    modelValue: { default: () => [] },
    multiple: { type: Boolean, default: !1 },
    selectable: { type: Boolean, default: !0 },
    unselectable: { type: Boolean, default: !0 },
    range: { type: Boolean, default: !1 },
    numViews: { default: 1 },
    maxRange: { default: 30 },
    minRange: { default: 1 },
    views: { default: void 0 },
    containerClass: { default: void 0 },
    viewingYear: { default: () => P().year() },
    viewingWeek: { default: () => P().week() },
    firstDayOfWeek: { default: 1 },
    rows: { default: 6 },
    weekLabelNames: { default: void 0 },
    weekLabelClass: { default: () => [] },
    activeMonth: { default: void 0 },
    disabled: { default: () => [] },
    visible: { default: void 0 },
    viewClass: { default: void 0 },
    weekLabelContainerClass: { default: void 0 },
    gridClass: { default: void 0 },
    gridCellClass: { default: void 0 }
  },
  emits: ["update:modelValue", "update:viewingWeek", "update:viewingYear"],
  setup(n, { expose: s, emit: t }) {
    const e = le(), a = n, o = t, {
      modelValue: r,
      viewingYear: c,
      viewingWeek: l,
      firstDayOfWeek: i,
      rows: u,
      weekLabelNames: d,
      weekLabelClass: f,
      multiple: k,
      selectable: $,
      unselectable: y,
      range: h,
      numViews: g,
      maxRange: b,
      minRange: v,
      activeMonth: S,
      disabled: B,
      visible: R,
      viewClass: E,
      containerClass: I,
      weekLabelContainerClass: x,
      gridClass: q,
      gridCellClass: V,
      views: G
    } = wa(a), he = ce(null), fe = ce(null), Z = ce(P().format("YYYY-MM-DD")), se = /* @__PURE__ */ new Map(), U = p(() => Q("n-calendar-container", I.value)), N = (z, w) => {
      z ? se.set(w, z) : se.delete(w);
    }, ke = async () => {
      await Te();
      const z = se.get(Z.value);
      z && z.focus();
    };
    Me(Z, ke);
    const Ae = (z, w) => (w + z) % 7, _e = p(() => {
      if (!r.value) return [];
      const z = Array.isArray(r.value) ? r.value : [r.value];
      return tt(z);
    }), Be = p(() => tt(B.value)), de = p(() => R.value ? tt(R.value) : null), pe = p(() => !h.value || !he.value?.begin || !fe.value ? !1 : !Tn(P(he.value.begin), fe.value, {
      minRange: v.value,
      maxRange: b.value,
      disabled: Be.value
    })), ye = p(() => {
      const z = [], w = G.value && G.value.length > 0 ? G.value.length : Math.max(1, g.value), C = (() => {
        const me = c.value ?? P().year(), ne = l.value ?? P().week(), be = i.value ?? 1, Qe = P().year(me).isoWeek(ne).startOf("isoWeek");
        let We = 1 - be;
        return We < 0 && (We += 7), Qe.subtract(We, "day");
      })(), H = pe.value;
      let T = null, oe = null;
      if (h.value && he.value?.begin && fe.value) {
        const me = P(he.value.begin), ne = fe.value;
        T = me.isBefore(ne) ? me : ne, oe = me.isBefore(ne) ? ne : me;
      }
      for (let me = 0; me < w; me++) {
        const ne = G.value?.[me] || {}, be = ne.viewingYear ?? c.value ?? P().year(), Qe = ne.viewingWeek ?? l.value ?? P().week(), We = ne.firstDayOfWeek ?? i.value ?? 1, fn = ne.rows ?? u.value ?? 6, pn = ne.activeMonth !== void 0 ? ne.activeMonth : S.value, mn = ne.disabled ?? B.value ?? [], Gt = tt(mn), Ut = ne.visible ?? R.value, Kt = Ut ? tt(Ut) : null, vn = Q("n-calendar-view", ne.viewClass ?? E.value), Zt = Q(
          "n-calendar-view-week-label-container",
          ne.weekLabelContainerClass ?? x.value
        ), Xt = Q("n-calendar-view-grid", ne.gridClass ?? q.value), qt = Q(ne.gridCellClass ?? V.value), hn = ne.weekLabelNames ?? d.value;
        let Jt;
        if (hn?.length === 7) {
          const je = [...hn];
          let Ye = We - 1;
          Ye < 0 && (Ye += 7), Jt = Array.from({ length: 7 }, (yn, ya) => je[(Ye + ya) % 7]);
        } else {
          let je = P().day(We);
          Jt = Array.from({ length: 7 }, () => {
            const Ye = je.format("ddd");
            return je = je.add(1, "day"), Ye;
          });
        }
        const gn = ne.weekLabelClass ?? f.value ?? [], ha = Array.from({ length: 7 }, (je, Ye) => {
          const yn = (We + Ye) % 7;
          return Array.isArray(gn) && gn[yn] || "";
        });
        let Qt;
        if (G.value && (ne.viewingYear !== void 0 || ne.viewingWeek !== void 0)) {
          const je = P().year(be).isoWeek(Qe).startOf("isoWeek");
          let Ye = 1 - We;
          Ye < 0 && (Ye += 7), Qt = je.subtract(Ye, "day");
        } else {
          const je = (u.value ?? 6) * 7;
          Qt = C.add(me * je, "day");
        }
        const ga = uo({
          start: Qt,
          daysCount: fn * 7,
          activeMonth: pn,
          selected: _e.value,
          disabled: Gt,
          visible: Kt,
          isRange: h.value,
          pendingStart: T,
          pendingEnd: oe,
          pendingInvalid: H,
          minRange: v.value,
          maxRange: b.value,
          hoveredDate: fe.value
        });
        z.push({
          days: ga,
          viewClasses: vn,
          weekLabelContainerClasses: Zt,
          gridClasses: Xt,
          extraGridCellClasses: qt,
          weekLabelNames: Jt,
          weekLabelClasses: ha,
          firstDayOfWeek: We,
          disabledList: Gt,
          visibleList: Kt
        });
      }
      return z;
    });
    Me(() => ye.value, ke);
    function Ce(z, w) {
      const C = w !== void 0 ? Number(w) : c.value, { year: H, week: T } = io(C, z);
      o("update:viewingYear", H), o("update:viewingWeek", T);
    }
    s({
      setMonth: Ce
    });
    function te(z) {
      fe.value = z;
    }
    function Fe(z) {
      z.isVisible && (te(z.date), Z.value = z.dateString);
    }
    function xe() {
      he.value = null, fe.value = null;
    }
    function Le(z) {
      z.key === "Escape" && xe();
    }
    function ze(z) {
      h.value && he.value?.begin && (z.preventDefault(), xe());
    }
    function Ke(z, w) {
      if (!w.isVisible) return;
      const C = z.key;
      if (C === "Enter" || C === " ") {
        z.preventDefault(), dt(w);
        return;
      }
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(C)) return;
      z.preventDefault();
      let T = P(w.date).clone();
      C === "ArrowUp" ? T = T.subtract(7, "day") : C === "ArrowDown" ? T = T.add(7, "day") : C === "ArrowLeft" ? T = T.subtract(1, "day") : T = T.add(1, "day"), Z.value = T.format("YYYY-MM-DD");
      const oe = ye.value[0].days[0].date, me = ye.value[ye.value.length - 1], ne = me.days[me.days.length - 1].date;
      if (T.isBefore(oe) || T.isSame(oe) || T.isAfter(ne) || T.isSame(ne)) {
        let be = P(`${c.value}-01-01`).isoWeek(l.value);
        T.isBefore(oe) ? be = be.subtract(1, "week") : T.isAfter(ne.subtract(1, "day")) && (be = be.add(1, "week")), o("update:viewingYear", be.isoWeekYear()), o("update:viewingWeek", be.isoWeek());
      }
    }
    function dt(z, w) {
      if (!$.value || z.isDisabled || !z.isVisible) return;
      const C = z.dateString, H = [..._e.value];
      h.value ? St(z, H, C) : jt(H, C);
    }
    function St(z, w, C) {
      if (he.value?.begin) {
        const H = P(he.value.begin), T = z.date, [oe, me] = T.isBefore(H) ? [T, H] : [H, T], ne = {
          begin: oe.format("YYYY-MM-DD"),
          end: me.format("YYYY-MM-DD")
        };
        if (y.value) {
          const be = fo(w, ne);
          if (be.length < w.length) {
            k.value ? o("update:modelValue", tt(be)) : o("update:modelValue", null), xe();
            return;
          }
        }
        if (Tn(oe, me, {
          minRange: v.value,
          maxRange: b.value,
          disabled: Be.value
        })) {
          const be = co(oe, me, de.value);
          if (be.length > 0) {
            k.value ? w.push(...be) : w = be;
            const Qe = tt(w);
            !k.value && Qe.length === 1 ? o("update:modelValue", Qe[0]) : o("update:modelValue", Qe);
          }
          xe();
        } else
          xe();
      } else
        he.value = { begin: C };
    }
    function jt(z, w) {
      if (k.value) {
        const C = z.findIndex((H) => kt(P(w), [H]));
        C > -1 ? y.value && z.splice(C, 1) : z.push(w), o("update:modelValue", tt(z));
      } else
        (z.length > 0 ? P(z[0].begin || z[0]).format("YYYY-MM-DD") : null) === w ? y.value && o("update:modelValue", null) : o("update:modelValue", w);
    }
    return (z, w) => (m(), O("div", W({
      class: ve(Q)("n-calendar", ve(e).class),
      tabindex: "-1"
    }, ve(e), { onKeydown: Le }), [
      ee("div", {
        class: D(U.value)
      }, [
        (m(!0), O(ue, null, ge(ye.value, (C, H) => (m(), O("div", {
          key: H,
          class: D(C.viewClasses)
        }, [
          A(z.$slots, `calendar-header-${H}`, {
            index: H,
            startDate: C.days[0]?.date,
            endDate: C.days[C.days.length - 1]?.date
          }, () => [
            A(z.$slots, "calendar-header", {
              index: H,
              startDate: C.days[0]?.date,
              endDate: C.days[C.days.length - 1]?.date
            })
          ]),
          A(z.$slots, "week-label-container", { calendarIndex: H }, () => [
            ee("div", {
              class: D(C.weekLabelContainerClasses),
              role: "row"
            }, [
              (m(!0), O(ue, null, ge(C.weekLabelNames, (T, oe) => (m(), O("div", {
                key: T,
                class: D(["n-calendar-view-week-label", C.weekLabelClasses[oe]]),
                role: "columnheader",
                "aria-label": T
              }, [
                A(z.$slots, `week-label-${Ae(oe, C.firstDayOfWeek)}`, {
                  day: T,
                  index: oe,
                  calendarIndex: H
                }, () => [
                  Dt(we(T), 1)
                ])
              ], 10, po))), 128))
            ], 2)
          ]),
          ee("div", {
            class: D(C.gridClasses),
            role: "grid",
            "aria-multiselectable": ve(k),
            onMouseleave: w[0] || (w[0] = (T) => te(null))
          }, [
            (m(!0), O(ue, null, ge(C.days, (T) => (m(), O("div", {
              key: T.dateString,
              ref_for: !0,
              ref: (oe) => N(oe, T.dateString),
              class: D([
                "n-calendar-view-grid-cell",
                C.extraGridCellClasses,
                {
                  "n-calendar-view-grid-cell--outside": !T.isCurrentMonth,
                  "n-calendar-view-grid-cell--today": T.isToday,
                  "n-calendar-view-grid-cell--selected": T.isSelected,
                  "n-calendar-view-grid-cell--disabled": T.isDisabled,
                  "n-calendar-view-grid-cell--invalid": T.isInvalid,
                  "n-calendar-view-grid-cell--selecting": T.isSelecting,
                  "n-calendar-view-grid-cell--range-start": T.isRangeStart,
                  "n-calendar-view-grid-cell--range-end": T.isRangeEnd,
                  "n-calendar-view-grid-cell--in-range": T.isInRange,
                  "invisible pointer-events-none": !T.isVisible
                }
              ]),
              role: "gridcell",
              "aria-label": T.ariaLabel,
              "aria-selected": T.isSelected,
              "aria-disabled": T.isDisabled,
              tabindex: T.dateString === Z.value && T.isVisible ? 0 : -1,
              onClick: (oe) => dt(T),
              onMouseenter: (oe) => te(T.date),
              onFocus: (oe) => Fe(T),
              onContextmenu: ze,
              onKeydown: (oe) => Ke(oe, T)
            }, [
              T.isVisible ? A(z.$slots, "cell", {
                key: 0,
                day: T,
                calendarIndex: H
              }, () => [
                ee("span", ho, we(T.dayOfMonth), 1)
              ]) : M("", !0)
            ], 42, vo))), 128))
          ], 42, mo),
          A(z.$slots, "calendar-footer", {
            index: H,
            startDate: C.days[0]?.date,
            endDate: C.days[C.days.length - 1]?.date
          })
        ], 2))), 128))
      ], 2)
    ], 16));
  }
}), go = {
  key: 1,
  class: "n-card-body"
}, yo = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NCard",
  props: {
    tag: { default: "div" },
    loading: { type: Boolean },
    loadingName: {},
    loadingClass: {},
    to: {},
    href: {},
    target: {},
    disabled: { type: Boolean },
    onClick: {}
  },
  setup(n) {
    const s = Oe(), t = le(), e = n, a = p(() => !e.disabled && (e.to || e.href || !!e.onClick || !!t.onClick)), o = p(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), r = p(() => Q(
      "n-card",
      e.loading ? "n-card--loading" : "",
      e.disabled ? "n-card--disabled" : "",
      a.value ? "n-card--clickable" : "",
      t.class
    )), c = p(() => {
      const { class: d, ...f } = t;
      return o.value === "RouterLink" ? (f.to = e.to, f.target = e.target) : o.value === "a" && (f.href = e.href, f.target = e.target), f;
    }), l = p(() => {
      const d = s.default?.() ?? [];
      return d.length === 0 ? !1 : d.length > 0 && Ds(d[0], ["n-card-body"]) ? !0 : d.length > 1;
    });
    function i(d) {
      if (e.disabled) {
        d.preventDefault(), d.stopPropagation();
        return;
      }
      a.value && (e.onClick?.(d), t.onClick && typeof t.onClick == "function" && t.onClick !== e.onClick && t.onClick(d));
    }
    function u(d) {
      if (a.value && ["Enter", " "].includes(d.key)) {
        const f = d.target;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(f.tagName) || f.isContentEditable)
          return;
        d.preventDefault(), i(d);
      }
    }
    return (d, f) => (m(), _(j(o.value), W({
      class: r.value,
      role: a.value && o.value === "div" ? "button" : void 0,
      tabindex: a.value && o.value === "div" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, c.value, {
      onClick: i,
      onKeydown: u
    }), {
      default: Y(() => [
        l.value ? A(d.$slots, "default", { key: 0 }) : (m(), O("div", go, [
          A(d.$slots, "default")
        ])),
        A(d.$slots, "loading", {}, () => [
          ae(Re, { name: "n-loading-overlay" }, {
            default: Y(() => [
              e.loading ? (m(), _(xt, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: D(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : M("", !0)
            ]),
            _: 1
          })
        ])
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "aria-busy"]));
  }
}), bo = ["name", ".indeterminate"], ko = { class: "n-checkbox-display" }, wo = {
  key: 3,
  class: "n-checkbox-overlay"
}, Co = {
  key: 1,
  class: "n-checkbox-message"
}, xr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NCheckbox",
  props: /* @__PURE__ */ Ie({
    tag: { default: "label" },
    name: { default: "" },
    label: { default: "" },
    inlineLabel: { type: Boolean, default: !1 },
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    inputClass: {},
    message: {},
    helperText: {},
    uncheckedIcon: { default: "" },
    uncheckedIconClass: {},
    checkedIcon: { default: "mdi-check-bold" },
    checkedIconClass: {},
    indeterminateIcon: { default: "mdi-minus" },
    indeterminateIconClass: {},
    size: { default: "medium" }
  }, {
    modelValue: { type: [Boolean, null], default: null },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const s = Oe(), t = le(), e = n, [a, o] = Se(n, "modelValue"), r = `input-id-${Ne()}`, c = p(() => Q("n-checkbox", t.class)), l = p(() => ["n-checkbox-container"]), i = p(() => ["n-checkbox-wrapper", e.size ? `n-checkbox--${e.size}` : ""]), u = p(() => ["n-checkbox-label"]), d = p(() => Xe(e.iconClass, e.prependIconClass)), f = p(() => {
      const { class: g, style: b } = t;
      return { style: b };
    }), k = p(() => {
      const { class: g, style: b, ...v } = t;
      return v;
    }), $ = p(() => ({
      ...e,
      modifiers: o,
      inputId: r,
      modelValue: a.value
    })), y = p(() => De(s.before?.($.value) ?? [], "span")), h = p(() => De(s.after?.($.value) ?? [], "span"));
    return (g, b) => (m(), O("div", {
      class: D(i.value)
    }, [
      (m(!0), O(ue, null, ge(y.value, (v, S) => (m(), _(j(v), { key: S }))), 128)),
      ee("div", {
        class: D(l.value)
      }, [
        !e.inlineLabel && (e.label || g.$slots.label) ? A(g.$slots, "label", { key: 0 }, () => [
          ee("label", {
            class: D(u.value),
            for: r
          }, we(e.label), 3)
        ]) : M("", !0),
        A(g.$slots, "top"),
        (m(), _(j(e.tag), W({ class: c.value }, f.value), {
          default: Y(() => [
            A(g.$slots, "prepend"),
            e.prependIcon || e.icon ? (m(), _(X, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: D(d.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : M("", !0),
            ut(ee("input", W({
              id: r,
              "onUpdate:modelValue": b[0] || (b[0] = (v) => ln(a) ? a.value = v : null),
              name: e.name,
              type: "checkbox",
              class: ["peer", e.inputClass],
              ".indeterminate": ve(a) === null
            }, k.value), null, 48, bo), [
              [Nn, ve(a)]
            ]),
            ee("div", ko, [
              e.uncheckedIcon ? (m(), _(X, {
                key: 0,
                name: e.uncheckedIcon,
                class: D(["n-checkbox-display-unchecked", e.uncheckedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : M("", !0),
              e.checkedIcon ? (m(), _(X, {
                key: 1,
                name: e.checkedIcon,
                class: D(["n-checkbox-display-checked", e.checkedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : M("", !0),
              e.indeterminateIcon ? (m(), _(X, {
                key: 2,
                name: e.indeterminateIcon,
                class: D(["n-checkbox-display-indeterminate", e.indeterminateIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : M("", !0)
            ]),
            A(g.$slots, "default", qe(st($.value))),
            e.inlineLabel && (e.label || g.$slots.label) ? A(g.$slots, "inlineLabel", { key: 1 }, () => [
              ee("label", {
                class: D(u.value),
                for: r
              }, we(e.label), 3)
            ]) : M("", !0),
            e.appendIcon ? (m(), _(X, {
              key: 2,
              name: e.appendIcon,
              class: D(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : M("", !0),
            A(g.$slots, "append"),
            g.$slots.overlay ? (m(), O("div", wo, [
              A(g.$slots, "overlay")
            ])) : M("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        A(g.$slots, "dropdown"),
        A(g.$slots, "bottom"),
        e.message || e.helperText ? (m(), O("div", Co, we(e.message || e.helperText), 1)) : M("", !0)
      ], 2),
      (m(!0), O(ue, null, ge(h.value, (v, S) => (m(), _(j(v), { key: S }))), 128))
    ], 2));
  }
}), $o = { key: 1 }, Io = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NChip",
  props: {
    icon: {},
    prependIcon: {},
    appendIcon: {},
    tag: { default: "span" },
    label: {},
    removable: { type: Boolean },
    removableClass: {},
    clickable: { type: Boolean },
    to: {},
    href: {},
    target: {},
    disabled: { type: Boolean }
  },
  emits: ["click", "remove"],
  setup(n, { emit: s }) {
    const t = le(), e = n, a = s, o = p(() => !e.disabled && (e.to || e.href || !!t.onClick)), r = p(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), c = p(() => Q(
      "n-chip",
      o.value ? "n-chip--clickable" : "",
      e.disabled ? "n-chip--disabled" : "",
      t.class
    )), l = p(() => {
      const { class: d, ...f } = t;
      return r.value === "RouterLink" ? (f.to = e.to, f.target = e.target) : r.value === "a" && (f.href = e.href, f.target = e.target), f;
    });
    function i() {
      a("remove");
    }
    function u(d) {
      if (e.disabled) {
        d.preventDefault(), d.stopPropagation();
        return;
      }
      o.value && a("click", d);
    }
    return (d, f) => (m(), _(j(r.value), W({
      class: c.value,
      role: o.value && r.value === "span" ? "button" : void 0,
      tabindex: o.value && r.value === "span" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, l.value, {
      onClick: u,
      onKeydown: lt(Ge(u, ["prevent"]), ["enter", "space"])
    }), {
      default: Y(() => [
        A(d.$slots, "prepend"),
        e.prependIcon || e.icon ? (m(), _(X, {
          key: 0,
          name: e.prependIcon || e.icon,
          "aria-hidden": "true"
        }, null, 8, ["name"])) : M("", !0),
        e.label || d.$slots.default ? (m(), O("span", $o, [
          A(d.$slots, "default", {}, () => [
            Dt(we(e.label), 1)
          ])
        ])) : M("", !0),
        e.appendIcon ? (m(), _(X, {
          key: 2,
          name: e.appendIcon,
          "aria-hidden": "true"
        }, null, 8, ["name"])) : M("", !0),
        A(d.$slots, "append"),
        e.removable ? A(d.$slots, "removable", { key: 3 }, () => [
          ae(X, {
            name: "mdi-close",
            class: D(e.removableClass),
            clickable: "",
            onClick: Ge(i, ["stop"])
          }, null, 8, ["class"])
        ]) : M("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
});
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const xo = (n) => n != null;
function So(n, s = {}) {
  let t;
  const { immediate: e, ...a } = s, o = bn(!1), r = bn(!1), c = (d) => t && t.activate(d), l = (d) => t && t.deactivate(d), i = () => {
    t && (t.pause(), r.value = !0);
  }, u = () => {
    t && (t.unpause(), r.value = !1);
  };
  return Me(p(() => _a(Ee(n)).map((d) => {
    const f = Ee(d);
    return typeof f == "string" ? f : Ma(f);
  }).filter(xo)), (d) => {
    if (d.length)
      if (!t)
        t = Ba(d, {
          ...a,
          onActivate() {
            o.value = !0, s.onActivate && s.onActivate();
          },
          onDeactivate() {
            o.value = !1, s.onDeactivate && s.onDeactivate();
          }
        }), e && c();
      else {
        const f = t?.active;
        t?.updateContainerElements(d), !f && e && c();
      }
  }, { flush: "post" }), Ta(() => l()), {
    hasFocus: o,
    isPaused: r,
    activate: c,
    deactivate: l,
    pause: i,
    unpause: u
  };
}
function ca(n, s, t, e, a) {
  const {
    activate: o,
    deactivate: r,
    hasFocus: c,
    pause: l,
    unpause: i
  } = So(s, {
    immediate: !1,
    allowOutsideClick: (y) => {
      const h = y.target;
      return !!(h.closest(".n-popover") || h.closest(".n-modal-overlay") || h.closest(".n-drawer-overlay"));
    }
  }), u = ce(0), d = () => {
    u.value++, u.value === 1 && l();
  }, f = () => {
    u.value > 0 && u.value--, u.value === 0 && i();
  };
  function k(y) {
    if (!y)
      return null;
    const h = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "textarea:not([disabled])",
      "select:not([disabled])",
      "details",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    return y.querySelector(h);
  }
  return Me(n, async (y) => {
    if (await Te(), !y) {
      t.value && (typeof a?.hide == "number" && await kn(a.hide), r());
      return;
    }
    const h = k(s.value);
    e.value && h && (typeof a?.show == "number" && await kn(a.show), t.value ? o() : h.focus());
  }), { isFocusTrapped: c, pause: d, unpause: f, focusContent: () => {
    s.value && s.value.focus();
  } };
}
const Ao = ["innerHTML"], Sr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NDrawer",
  props: /* @__PURE__ */ Ie({
    tag: { default: "div" },
    content: { default: "" },
    overlay: { type: Boolean, default: !0 },
    noOverlayHide: { type: Boolean, default: !1 },
    noClickOutsideHide: { type: Boolean, default: !1 },
    noEscHide: { type: Boolean, default: !1 },
    direction: { default: "left" },
    persist: { type: Boolean, default: !1 },
    focusOnShow: { type: Boolean, default: !0 }
  }, {
    modelValue: { type: Boolean, default: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n, { expose: s }) {
    const t = le(), e = n, a = Se(n, "modelValue"), o = Je("contentRef"), { pause: r, unpause: c } = ca(
      a,
      o,
      p(() => e.overlay),
      p(() => e.focusOnShow),
      e.overlay ? {
        show: 300,
        hide: 300
      } : void 0
    ), l = p(() => ["n-drawer-overlay"]), i = p(
      () => Q(
        "n-drawer",
        `n-drawer--direction-${e.direction}`,
        a.value ? "n-drawer--active" : void 0,
        t.class
      )
    ), u = p(() => {
      const { class: g, ...b } = t;
      return b;
    });
    bt("keydown", (g) => {
      a.value && g.key === "Escape" && !e.persist && !e.noEscHide && (g.preventDefault(), g.stopPropagation(), h());
    });
    function d(g) {
      if (e.persist || e.noOverlayHide) return;
      const b = g.target;
      b.clientWidth < g.clientX || b.clientHeight < g.clientY || h();
    }
    function f() {
      e.persist || e.noClickOutsideHide || h();
    }
    function k() {
      e.persist || r();
    }
    function $() {
      e.persist || c();
    }
    const y = () => {
      a.value = !0;
    }, h = () => {
      a.value = !1;
    };
    return s({ show: y, hide: h }), (g, b) => (m(), O(ue, null, [
      ae(Re, { name: "n-drawer-overlay" }, {
        default: Y(() => [
          e.overlay && a.value ? (m(), O("div", {
            key: 0,
            class: D(l.value),
            "aria-hidden": "true",
            onMousedown: Ge(d, ["self"])
          }, null, 34)) : M("", !0)
        ]),
        _: 1
      }),
      ut((m(), _(j(e.tag), W({
        ref_key: "contentRef",
        ref: o,
        role: "dialog",
        "aria-modal": e.overlay ? "true" : void 0,
        class: i.value
      }, u.value, {
        onMousedown: k,
        onMouseup: $
      }), {
        default: Y(() => [
          A(g.$slots, "default", {}, () => [
            e.content ? (m(), O("span", {
              key: 0,
              innerHTML: e.content
            }, null, 8, Ao)) : M("", !0)
          ])
        ]),
        _: 3
      }, 16, ["aria-modal", "class"])), [
        [ve(Aa), f]
      ])
    ], 64));
  }
}), Ar = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NForm",
  props: {
    tag: { default: "form" },
    title: {},
    titleTag: { default: "h1" },
    titleClass: {},
    message: {},
    status: { default: "info" }
  },
  setup(n) {
    const s = {
      success: "mdi-check-circle",
      error: "mdi-close-circle",
      info: "mdi-information",
      warning: "mdi-alert-circle"
    }, t = le(), e = n, a = `n-form-title-${Ne()}`, o = p(() => s[e.status] || ""), r = p(() => {
      const { class: c, ...l } = t;
      return e.title && !l["aria-labelledby"] && (l["aria-labelledby"] = a), l;
    });
    return (c, l) => (m(), _(j(e.tag), W({
      class: ve(Q)("n-form", ve(t).class)
    }, r.value, {
      role: e.tag !== "form" ? "form" : void 0
    }), {
      default: Y(() => [
        A(c.$slots, "title", {}, () => [
          e.title ? (m(), _(j(e.titleTag), {
            key: 0,
            id: a,
            class: D(["n-form-title", e.titleClass])
          }, {
            default: Y(() => [
              Dt(we(e.title), 1)
            ]),
            _: 1
          }, 8, ["class"])) : M("", !0)
        ]),
        A(c.$slots, "message", {}, () => [
          e.message ? (m(), _(ta, {
            key: 0,
            icon: o.value,
            class: D(e.status)
          }, {
            default: Y(() => [
              Dt(we(e.message), 1)
            ]),
            _: 1
          }, 8, ["icon", "class"])) : M("", !0)
        ]),
        A(c.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "role"]));
  }
}), _o = ["aria-label"], Mo = { class: "w-full h-full bg-surface flex items-center justify-center text-error p-4" }, To = ["src", "srcset", "sizes", "alt", "loading"], _r = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NImage",
  props: {
    src: {},
    alt: { default: "" },
    srcset: {},
    sizes: {},
    lazy: { type: Boolean, default: !1 },
    aspectRatio: {},
    fit: { default: "cover" },
    width: {},
    height: {},
    containerClass: {},
    placeholderClass: {},
    errorClass: {},
    threshold: { default: 0.1 },
    loading: { type: Boolean },
    loadingName: {},
    loadingClass: {}
  },
  emits: ["load", "error"],
  setup(n, { emit: s }) {
    const t = le(), e = n, a = s, o = Je("containerRef"), r = ce(!e.lazy), c = ce(!0), l = ce(!1);
    if (e.lazy) {
      const { stop: y } = Da(
        o,
        ([{ isIntersecting: h }]) => {
          h && (r.value = !0, y());
        },
        {
          threshold: e.threshold
        }
      );
    }
    function i(y) {
      c.value = !1, a("load", y);
    }
    function u(y) {
      c.value = !1, l.value = !0, a("error", y);
    }
    const d = p(() => {
      const y = {
        ...e.aspectRatio ? { aspectRatio: e.aspectRatio } : {},
        ...e.width ? { width: typeof e.width == "number" ? `${e.width}px` : e.width } : {},
        ...e.height ? { height: typeof e.height == "number" ? `${e.height}px` : e.height } : {}
      };
      return e.aspectRatio && !e.width && !e.height && (y.width = "100%"), y;
    }), f = p(
      () => Q(
        "n-image-img",
        `n-image-img--fit-${e.fit}`,
        e.aspectRatio || e.width && e.height ? "absolute inset-0 w-full h-full" : "block max-w-full h-auto",
        c.value || e.loading ? "opacity-0" : "opacity-100",
        t.class
      )
    ), k = p(() => {
      const { class: y, ...h } = t;
      return h;
    }), $ = p(() => ({}));
    return (y, h) => (m(), O("div", {
      ref_key: "containerRef",
      ref: o,
      class: D([
        "n-image",
        e.containerClass,
        { "n-image--block": e.width === "100%" || e.height === "100%" }
      ]),
      style: Pt(d.value),
      role: "img",
      "aria-label": e.alt
    }, [
      ae(Re, { name: "n-image-fade" }, {
        default: Y(() => [
          (c.value || e.loading) && !l.value ? (m(), O("div", {
            key: 0,
            class: D(["n-image-placeholder", e.placeholderClass])
          }, [
            A(y.$slots, "placeholder", {}, () => [
              ae(xt, {
                overlay: "",
                name: e.loadingName,
                class: D(e.loadingClass)
              }, null, 8, ["name", "class"])
            ])
          ], 2)) : M("", !0)
        ]),
        _: 3
      }),
      l.value ? (m(), O("div", {
        key: 0,
        class: D(["n-image-error", e.errorClass])
      }, [
        A(y.$slots, "error", {}, () => [
          ee("div", Mo, [
            ae(X, {
              name: "alert-circle",
              class: "mr-2"
            }),
            h[0] || (h[0] = ee("span", { class: "text-sm" }, "Failed to load image", -1))
          ])
        ])
      ], 2)) : M("", !0),
      r.value ? (m(), O("img", W({
        key: 1,
        ref: "imageRef",
        src: e.src,
        srcset: e.srcset,
        sizes: e.sizes,
        alt: e.alt,
        class: f.value,
        style: $.value,
        loading: e.lazy ? "lazy" : void 0
      }, k.value, {
        onLoad: i,
        onError: u
      }), null, 16, To)) : M("", !0)
    ], 14, _o));
  }
});
function Dn(n) {
  if (!n || typeof n != "object")
    return !1;
  const s = Object.getPrototypeOf(n);
  return s === null || s === Object.prototype || Object.getPrototypeOf(s) === null ? Object.prototype.toString.call(n) === "[object Object]" : !1;
}
function Do(n) {
  return n === "__proto__";
}
function yt(n, s) {
  const t = Object.keys(s);
  for (let e = 0; e < t.length; e++) {
    const a = t[e];
    if (Do(a))
      continue;
    const o = s[a], r = n[a];
    Array.isArray(o) ? Array.isArray(r) ? n[a] = yt(r, o) : n[a] = yt([], o) : Dn(o) ? Dn(r) ? n[a] = yt(r, o) : n[a] = yt({}, o) : (r === void 0 || o !== void 0) && (n[a] = o);
  }
  return n;
}
function Ue(n, s) {
  const t = { ...n };
  for (let e = 0; e < s.length; e++) {
    const a = s[e];
    delete t[a];
  }
  return t;
}
const Oo = ["type", "aria-busy", "disabled", "readonly"], Bo = {
  key: 2,
  class: "n-input-field-overlay"
}, Ro = {
  key: 1,
  class: "n-input-field-message"
}, dn = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NInputField",
  props: /* @__PURE__ */ Ie({
    tag: { default: "div" },
    name: { default: "" },
    label: { default: "" },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    message: {},
    helperText: {},
    size: { default: "medium" },
    loading: { type: Boolean },
    loadingName: { default: "loading" },
    loadingClass: {},
    format: {},
    parse: {},
    wrapperClass: {},
    containerClass: {},
    type: { default: "text" }
  }, {
    modelValue: { default: void 0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const s = Oe(), t = le(), e = n, [a, o] = Se(n, "modelValue"), r = `input-id-${Ne()}`, c = p(() => typeof e.format == "function" ? e.format(a.value) : a.value), l = p(() => !!e.disabled), i = p(() => Q("n-input-field", t.class)), u = p(() => ["n-input-field-container", ...Xe(e.containerClass)]), d = p(() => [
      "n-input-field-wrapper",
      e.loading ? "n-input-field--loading" : "",
      l.value ? "n-input-field--disabled" : "",
      `n-input-field--size-${e.size}`,
      ...Xe(e.wrapperClass)
    ]), f = p(() => ["n-input-field-label"]), k = p(() => Xe(e.iconClass, e.prependIconClass)), $ = p(() => Ue(t, ["class"])), y = p(() => Ue(t, ["class"])), h = p(() => ({
      ...e,
      modifiers: o,
      inputId: r,
      modelValue: a.value,
      formattedModelValue: c.value
    })), g = p(() => De(s.before?.(h.value) ?? [], "span")), b = p(() => De(s.after?.(h.value) ?? [], "span"));
    return (v, S) => (m(), O("div", {
      class: D(d.value)
    }, [
      (m(!0), O(ue, null, ge(g.value, (B, R) => (m(), _(j(B), { key: R }))), 128)),
      ee("div", {
        class: D(u.value)
      }, [
        e.label || v.$slots.label ? A(v.$slots, "label", { key: 0 }, () => [
          ee("label", {
            class: D(f.value),
            for: r
          }, we(e.label), 3)
        ]) : M("", !0),
        A(v.$slots, "top"),
        (m(), _(j(e.tag), W({ class: i.value }, $.value), {
          default: Y(() => [
            A(v.$slots, "loading", {}, () => [
              ae(Re, { name: "n-loading-overlay" }, {
                default: Y(() => [
                  e.loading ? (m(), _(xt, {
                    key: 0,
                    overlay: !0,
                    name: e.loadingName,
                    class: D(e.loadingClass),
                    "aria-hidden": "true"
                  }, null, 8, ["name", "class"])) : M("", !0)
                ]),
                _: 1
              })
            ]),
            A(v.$slots, "prepend"),
            e.prependIcon || e.icon ? (m(), _(X, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: D(k.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : M("", !0),
            A(v.$slots, "default", qe(st(h.value)), () => [
              ut(ee("input", W({
                id: r,
                "onUpdate:modelValue": S[0] || (S[0] = (B) => ln(a) ? a.value = B : null),
                type: e.type,
                "aria-busy": e.loading || void 0,
                disabled: e.disabled,
                readonly: e.readonly
              }, y.value), null, 16, Oo), [
                [Fn, ve(a)]
              ])
            ]),
            e.appendIcon ? (m(), _(X, {
              key: 1,
              name: e.appendIcon,
              class: D(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : M("", !0),
            A(v.$slots, "append"),
            v.$slots.overlay ? (m(), O("div", Bo, [
              A(v.$slots, "overlay")
            ])) : M("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        A(v.$slots, "dropdown"),
        A(v.$slots, "bottom"),
        e.message || e.helperText ? (m(), O("div", Ro, we(e.message || e.helperText), 1)) : M("", !0)
      ], 2),
      (m(!0), O(ue, null, ge(b.value, (B, R) => (m(), _(j(B), { key: R }))), 128))
    ], 2));
  }
}), On = 1e3, No = 10, rt = ce(/* @__PURE__ */ new Map());
function ua(n) {
  const s = Symbol(`stack-id-${Ne()}`);
  Me(
    () => Ee(n),
    (l, i) => {
      const u = i && rt.value.get(i) || [], d = rt.value.get(l) ?? [];
      u.filter(({ stackId: f }) => f === s).forEach((f, k) => {
        d.push(f), u.splice(k, 1);
      });
    },
    { immediate: !0 }
  );
  function t() {
    return rt.value.has(Ee(n)) || rt.value.set(Ee(n), []), rt.value.get(Ee(n));
  }
  return {
    register: (l) => {
      const i = t();
      i.find(({ itemId: u }) => u === l) || rt.value.set(Ee(n), [...i, { stackId: s, itemId: l }]);
    },
    unregister: (l) => {
      rt.value.set(
        Ee(n),
        t().filter(({ itemId: i }) => i === l)
      );
    },
    getZIndex: (l) => {
      const u = t().findIndex(({ itemId: d }) => d === l);
      return u === -1 ? On : On + u * No;
    },
    getOrderIndex: (l) => t().findIndex(({ itemId: u }) => u === l),
    isTop: (l) => {
      const i = t();
      return i[i.length - 1]?.itemId === l;
    }
  };
}
function Wt(n, s = "") {
  const t = ce(!1);
  return Me(
    () => [Ee(n), Ee(s)],
    async (e, a) => {
      if (!(typeof document > "u")) {
        if (t.value = !1, Array.isArray(a)) {
          const o = document.getElementById(a[0]);
          o && o.childElementCount === 0 && document.body.removeChild(o);
        }
        if (await Te(), !document.getElementById(e[0])) {
          const o = document.createElement("div");
          o.id = e[0], e[1] && (o.className = Sa(e[1])), document.body.appendChild(o);
        }
        t.value = !0;
      }
    },
    { immediate: !0 }
  ), { isReady: t };
}
const Fo = ["innerHTML"], da = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NModal",
  props: /* @__PURE__ */ Ie({
    tag: { default: "div" },
    content: { default: "" },
    overlay: { type: Boolean, default: !0 },
    noOverlayHide: { type: Boolean, default: !1 },
    noEscHide: { type: Boolean, default: !1 },
    direction: { default: "center" },
    persist: { type: Boolean, default: !1 },
    focusOnShow: { type: Boolean, default: !0 },
    role: { default: "dialog" }
  }, {
    modelValue: { type: Boolean, default: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n, { expose: s }) {
    const t = le(), e = n, a = Se(n, "modelValue"), { isReady: o } = Wt("n-modals-container"), r = Symbol(`modal-id-${Ne()}`), { register: c, unregister: l, getZIndex: i, isTop: u } = ua("n-modal"), d = Je("contentRef"), { pause: f, unpause: k, focusContent: $ } = ca(
      a,
      d,
      p(() => e.overlay),
      p(() => e.focusOnShow),
      e.overlay ? {
        show: 300,
        hide: 300
      } : void 0
    );
    Ca("n-modal-focusable", { pause: f, unpause: k, focusContent: $ });
    const y = p(() => i(r)), h = p(() => ["n-modal-overlay"]), g = p(() => ({ zIndex: y.value })), b = p(
      () => Q("n-modal", `n-modal--direction-${e.direction}`, "outline-none", t.class)
    ), v = p(() => ({ zIndex: y.value })), S = p(() => {
      const { tag: V, content: G, overlay: he, noOverlayHide: fe, noEscHide: Z, direction: se, persist: U, focusOnShow: N, role: ke, ...Ae } = e, { "aria-modal": _e, role: Be, tabindex: de, class: pe, ...ye } = t, { "aria-modal": Ce, ...te } = Ae;
      return { tabindex: de ?? "-1", ...te, ...ye };
    });
    bt("keydown", (V) => {
      a.value && V.key === "Escape" && !e.persist && !e.noEscHide && u(r) && (V.preventDefault(), V.stopPropagation(), q());
    }), Me(
      a,
      (V) => {
        V ? c(r) : setTimeout(() => l(r), 300);
      },
      { immediate: !0 }
    ), Ln(() => {
      l(r);
    });
    function B(V) {
      if (e.persist || e.noOverlayHide) return;
      const G = V.target;
      G.clientWidth < V.clientX || G.clientHeight < V.clientY || q();
    }
    function R(V) {
      if (!V || V === document.body) return !1;
      const G = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "textarea:not([disabled])",
        "select:not([disabled])",
        "details",
        '[tabindex]:not([tabindex="-1"])',
        "[contenteditable]",
        "label"
      ].join(", ");
      return !!(V.matches(G) || V.getAttribute("tabindex") && V.getAttribute("tabindex") !== "-1" || V.closest(G));
    }
    function E(V) {
      if (e.persist) return;
      const G = V.target;
      R(G) || d.value && (V.preventDefault(), d.value.focus()), f();
    }
    function I() {
      e.persist || k();
    }
    const x = () => {
      a.value = !0;
    }, q = () => {
      a.value = !1;
    };
    return s({ show: x, hide: q }), (V, G) => ve(o) ? (m(), _(Vt, {
      key: 0,
      to: "#n-modals-container"
    }, [
      ae(Re, { name: "n-modal-overlay" }, {
        default: Y(() => [
          e.overlay && a.value ? (m(), O("div", {
            key: 0,
            class: D(h.value),
            style: Pt(g.value),
            "aria-hidden": "true",
            onMousedown: B
          }, null, 38)) : M("", !0)
        ]),
        _: 1
      }),
      ae(Re, { name: "n-modal" }, {
        default: Y(() => [
          a.value ? (m(), _(j(e.tag), W({
            key: 0,
            ref_key: "contentRef",
            ref: d,
            role: e.role,
            "aria-modal": e.overlay ? "true" : void 0,
            class: b.value,
            style: v.value
          }, S.value, {
            onMousedown: E,
            onMouseup: I
          }), {
            default: Y(() => [
              A(V.$slots, "default", {}, () => [
                e.content ? (m(), O("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, Fo)) : M("", !0)
              ])
            ]),
            _: 3
          }, 16, ["role", "aria-modal", "class", "style"])) : M("", !0)
        ]),
        _: 3
      })
    ])) : M("", !0);
  }
});
function Mr() {
  const n = Ct();
  if (!n)
    throw new Error("useDialog must be called within setup() or a lifecycle hook.");
  const s = n.appContext;
  async function t(c = {}) {
    const l = document.createElement("div");
    l.id = `dialog-app-${Ne()}`, document.body.appendChild(l);
    const i = c ?? {};
    i.hideOnAction ??= !0;
    const u = {
      tag: i.modalTag,
      overlay: i.overlay,
      noOverlayHide: i.noOverlayHide,
      noEscHide: i.noEscHide,
      focusOnShow: i.focusOnShow,
      role: i.role,
      class: i.class
    }, d = {
      tag: i.cardTag,
      class: i.cardClass,
      loading: i.loading,
      loadingName: i.loadingName,
      loadingClass: i.loadingClass
    }, f = /* @__PURE__ */ new Map();
    async function k() {
      const x = h.component;
      x?.exposed?.hide && x.exposed.hide();
    }
    async function $() {
      setTimeout(() => {
        at(null, l), l.remove();
      }, 300);
    }
    let y = [];
    Array.isArray(i.actions) && (y = i.actions.map((x) => {
      const q = x.onClick;
      return J(on, { ...x, onClick: () => {
        typeof q == "function" ? q({ hide: k, executeCallbacks: b }) : (x.label?.toLocaleLowerCase() === "ok" ? b("ok") : x.label?.toLocaleLowerCase() === "cancel" && b("cancel"), b("dismiss"), i.hideOnAction && k());
      } });
    }));
    const h = ae(
      da,
      {
        ...u,
        "onUpdate:modelValue": (x) => {
          x || (b("hide"), $());
        }
      },
      {
        default: () => J(
          yo,
          {
            ...d
          },
          {
            default: () => [
              i.title ? J("div", { class: ["n-card-header", i.cardHeaderClass] }, [
                J("h1", { class: "title-text text-xl" }, i.title),
                i.closeButton ? J(on, {
                  icon: "close",
                  class: "icon pilled text-xs",
                  onClick: () => k()
                }) : null
              ]) : null,
              J("div", { class: "n-card-body" }, i.content || ""),
              y.length > 0 ? J(
                "div",
                { class: ["n-card-footer justify-end gap-2", i.cardFooterClass] },
                y
              ) : null
            ].filter(Boolean)
          }
        )
      }
    );
    s && (h.appContext = s), at(h, l), await Te();
    function g(x, q) {
      const V = f.get(x) || [];
      V.push(q), f.set(x, V);
    }
    function b(x, ...q) {
      const V = f.get(x) || [];
      for (const G of V)
        G(q);
    }
    function v(x) {
      g("hide", x);
    }
    function S(x) {
      g("dismiss", x);
    }
    function B(x) {
      g("cancel", x);
    }
    function R(x) {
      g("ok", x);
    }
    function E(x) {
      g("show", x);
    }
    async function I() {
      return h.component?.exposed?.show(), await Te(), b("show"), {
        hide: k,
        onHide: v,
        onDismiss: S,
        onCancel: B,
        onOk: R
      };
    }
    return {
      show: I,
      onShow: E
    };
  }
  const e = async (c) => await (await t(c)).show();
  return {
    create: t,
    dialog: e,
    alert: async (c, l, i) => {
      const u = await e({
        title: c,
        content: l,
        actions: [
          {
            label: "OK",
            onClick: ({ hide: d }) => {
              d();
            }
          }
        ],
        cardClass: "shadowed",
        noOverlayHide: !0,
        role: "alertdialog",
        ...i || {}
      });
      return new Promise((d) => {
        u.onHide(d);
      });
    },
    confirm: async (c, l, i) => {
      const u = await e({
        ...i || {},
        title: c,
        content: l,
        actions: i?.actions ? i.actions : [
          {
            label: "Cancel",
            class: "flat",
            onClick: ({ hide: d, executeCallbacks: f }) => {
              f("cancel"), d();
            }
          },
          {
            label: "OK",
            onClick: ({ hide: d, executeCallbacks: f }) => {
              f("ok"), d();
            }
          }
        ],
        hideOnAction: !1,
        noOverlayHide: !0,
        noEscHide: !0,
        role: "alertdialog"
      });
      return new Promise((d) => {
        let f = null;
        u.onOk(() => f = "ok"), u.onCancel(() => f = "cancel"), u.onHide(() => d(f));
      });
    },
    prompt: (c, l, i = "") => new Promise(async (u) => {
      const d = window.prompt(`${c}
${l}`, i);
      u(d);
    })
  };
}
function fa(n, s) {
  const { model: t, contentRef: e, attachParentEl: a, placement: o } = s, r = ce(!1), c = ce(!1), l = ce(!1), i = p(() => ({
    triggerByHover: !0,
    triggerByFocus: !0,
    triggerByInteraction: !0,
    ...Ee(n)
  }));
  bt(() => typeof document < "u" ? document : null, "mouseup", () => {
    c.value = !1;
  }), bt(() => typeof document < "u" ? document : null, "keyup", () => {
    c.value = !1;
  });
  const u = wn(
    () => {
      Z();
    },
    p(() => i.value.showDelay ?? 0),
    {
      immediate: !1
    }
  ), d = wn(
    () => {
      document.activeElement !== Ee(k) && !r.value && se();
    },
    p(() => i.value.hideDelay ?? 0),
    {
      immediate: !1
    }
  ), f = ce(null), k = ce(null), $ = ce(null), { width: y, height: h } = Oa(a), {
    x: g,
    y: b,
    strategy: v,
    placement: S
  } = Ra(a, e, {
    placement: o,
    whileElementsMounted: Na,
    middleware: p(() => {
      const [U, N] = i.value.offset ?? [0, 0], ke = [Cn(i.value.margin), Cn({ crossAxis: U, mainAxis: N })];
      return i.value.autoReposition && (ke.push(Fa()), ke.push(La({ padding: 8 }))), ke;
    })
  }), B = p(() => ({
    position: v.value,
    top: b.value != null ? `${b.value}px` : "",
    left: g.value != null ? `${g.value}px` : ""
  })), R = () => {
    u.isPending.value && u.stop(), d.isPending.value && d.stop();
  }, E = (U, N, ke) => {
    U && Object.entries(N).forEach(([Ae, _e]) => {
      ke === "add" ? U.addEventListener(Ae, _e) : U.removeEventListener(Ae, _e);
    });
  };
  Me(
    () => [
      i.value.hoverTriggerAnchor,
      i.value.focusTriggerAnchor,
      i.value.clickTriggerAnchor,
      a.value
    ],
    () => {
      Te(() => {
        const U = i.value, N = (Ce) => Ce ? Yt(Ce) : typeof Ce > "u" ? a.value : null, ke = N(U.hoverTriggerAnchor), Ae = N(U.focusTriggerAnchor), _e = N(U.clickTriggerAnchor), Be = {
          mouseenter: V,
          mouseleave: G
        }, de = {
          focus: V,
          blur: G,
          mousedown: I,
          keydown: x
        }, pe = {
          click: q
        }, ye = (Ce, te, Fe) => {
          Ce.value !== te && (E(Ce.value, Fe, "remove"), Ce.value = te, E(Ce.value, Fe, "add"));
        };
        ye(f, ke, Be), ye(k, Ae, de), ye($, _e, pe);
      });
    },
    { deep: !0, immediate: !0, flush: "post" }
  );
  function I() {
    c.value = !0;
  }
  function x(U) {
    (U.key === "Enter" || U.key === " ") && (c.value = !0);
  }
  function q(U) {
    if (t.value) {
      if (i.value.allowClickToHide) {
        if (i.value.persistent) return;
        R(), se();
      }
    } else
      d.isPending.value && d.stop(), u.start();
  }
  function V() {
    c.value || l.value || (d.isPending.value && d.stop(), u.isPending.value || u.start());
  }
  function G(U) {
    i.value.persistent || U.type === "mouseleave" && !i.value.triggerByHover || (u.isPending.value && u.stop(), d.isPending.value || d.start());
  }
  function he() {
    r.value = !0, d.isPending.value && d.stop();
  }
  function fe() {
    i.value.persistent || (r.value = !1, i.value.triggerByHover && (d.isPending.value || d.start()));
  }
  bt("keydown", (U) => {
    t.value && U.key === "Escape" && !i.value.persistent && (U.preventDefault(), U.stopPropagation(), se());
  });
  const Z = () => {
    t.value = !0;
  }, se = (U = !1) => {
    const N = e.value?.contains(document.activeElement);
    t.value = !1, !U && N && Te(() => {
      l.value = !0, k.value ? k.value.focus() : a.value && a.value?.focus(), setTimeout(() => {
        l.value = !1;
      }, 0);
    });
  };
  return {
    show: Z,
    hide: se,
    handleContentHoverFocusIn: he,
    handleContentHoverFocusOut: fe,
    compStyles: B,
    placement: S,
    parentWidth: y,
    parentHeight: h
  };
}
function Tr() {
  const n = Ct();
  if (!n)
    throw new Error("useModal must be called within setup() or a lifecycle hook.");
  const s = n.appContext;
  async function t(o) {
    const r = document.createElement("div");
    r.id = `modal-app-${Ne()}`, document.body.appendChild(r), o = o ?? {};
    const { content: c, ...l } = o, i = /* @__PURE__ */ new Map();
    async function u() {
      f.component?.exposed?.hide(), await Te(), $("hide"), d();
    }
    async function d() {
      at(null, r), r.remove();
    }
    const f = ae(
      da,
      {
        ...l
      },
      {
        default: () => typeof c == "string" ? J("span", { innerHTML: c }) : c || ""
      }
    );
    s && (f.appContext = s), at(f, r), await Te();
    function k(b, v) {
      const S = i.get(b) || [];
      S.push(v), i.set(b, S);
    }
    function $(b, ...v) {
      const S = i.get(b) || [];
      for (const B of S)
        B(v);
    }
    function y(b) {
      k("hide", b);
    }
    function h(b) {
      k("show", b);
    }
    async function g() {
      return f.component?.exposed?.show(), await Te(), $("show"), {
        hide: u,
        onHide: y
      };
    }
    return {
      show: g,
      onShow: h
    };
  }
  const e = async (o) => await (await t(o)).show();
  return {
    create: t,
    loading: async (o, r, c) => {
      const l = {
        ...c,
        class: "flex flex-col items-center gap-4 text-text-invert",
        persist: !0,
        content: [
          J("div", { class: c?.titleClass }, r),
          J(xt, { name: o, class: c?.loadingClass })
        ]
      };
      return await e(l);
    }
  };
}
const Lo = ["innerHTML"], Eo = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', Po = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NToast",
  props: /* @__PURE__ */ Ie({
    tag: { default: "div" },
    content: { default: "" },
    overlay: { type: Boolean, default: !1 },
    noOverlayHide: { type: Boolean, default: !1 },
    noEscHide: { type: Boolean, default: !1 },
    position: { default: "top-center" },
    focusOnShow: { type: Boolean, default: !0 },
    duration: { default: 0 },
    role: { default: "status" }
  }, {
    modelValue: { type: Boolean, default: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n, { expose: s }) {
    const t = le(), e = n, a = Se(n, "modelValue"), { isReady: o } = Wt(p(() => `n-toasts-container--position-${e.position}`)), r = Je("contentRef"), c = ce(null), l = Symbol(`toast-id-${Ne()}`), { register: i, unregister: u, getZIndex: d, getOrderIndex: f, isTop: k } = ua(
      p(() => `n-toast--position-${e.position}`)
    ), {
      start: $,
      stop: y,
      pause: h,
      resume: g
    } = ea(
      () => fe(),
      p(() => e.duration),
      { immediate: !1 }
    ), b = p(() => d(l)), v = p(() => f(l)), S = p(() => ["n-toast-overlay", `n-toast-overlay--position-${e.position}`]), B = p(() => ({ zIndex: b.value, order: v.value })), R = p(() => Q("n-toast", `n-toast--position-${e.position}`, t.class)), E = p(() => ({ zIndex: b.value, order: v.value })), I = p(() => {
      const { tag: Z, content: se, overlay: U, noOverlayHide: N, noEscHide: ke, position: Ae, focusOnShow: _e, duration: Be, role: de, ...pe } = e, { "aria-live": ye, "aria-atomic": Ce, role: te, class: Fe, ...xe } = t, { "aria-live": Le, "aria-atomic": ze, role: Ke, ...dt } = pe;
      return { ...dt, ...xe };
    }), x = () => {
      if (!r.value) return;
      const Z = r.value.querySelector(Eo);
      Z ? Z.focus() : r.value.focus();
    };
    bt("keydown", (Z) => {
      a.value && Z.key === "Escape" && !e.noEscHide && k(l) && (Z.preventDefault(), Z.stopPropagation(), fe());
    }), Me(a, async (Z) => {
      Z ? (i(l), c.value = document.activeElement, e.duration > 0 && $(), await Te(), e.focusOnShow && x()) : (y(), c.value && (c.value.focus(), c.value = null), u(l));
    }), Ln(() => {
      u(l);
    });
    function q(Z) {
      if (e.noOverlayHide) return;
      const se = Z.target;
      se.clientWidth < Z.clientX || se.clientHeight < Z.clientY || fe();
    }
    function V() {
      e.duration > 0 && h();
    }
    function G() {
      e.duration > 0 && g();
    }
    const he = () => {
      a.value = !0;
    }, fe = () => {
      a.value = !1;
    };
    return s({ show: he, hide: fe }), (Z, se) => ve(o) ? (m(), _(Vt, {
      key: 0,
      to: `#n-toasts-container--position-${e.position}`
    }, [
      ae(Re, { name: "n-toast-overlay" }, {
        default: Y(() => [
          e.overlay && a.value ? (m(), O("div", {
            key: 0,
            class: D(S.value),
            style: Pt(B.value),
            "aria-hidden": "true",
            onMousedown: q
          }, null, 38)) : M("", !0)
        ]),
        _: 1
      }),
      ae(Re, {
        mode: "out-in",
        name: "n-toast"
      }, {
        default: Y(() => [
          a.value ? (m(), _(j(e.tag), W({
            key: 0,
            ref_key: "contentRef",
            ref: r,
            role: e.role,
            "aria-live": ve(t)["aria-live"] || "polite",
            "aria-atomic": ve(t)["aria-atomic"] || "true",
            class: R.value,
            style: E.value
          }, I.value, {
            onMouseenter: V,
            onMouseleave: G,
            onFocusin: V,
            onFocusout: G
          }), {
            default: Y(() => [
              A(Z.$slots, "default", {}, () => [
                e.content ? (m(), O("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, Lo)) : M("", !0)
              ])
            ]),
            _: 3
          }, 16, ["role", "aria-live", "aria-atomic", "class", "style"])) : M("", !0)
        ]),
        _: 3
      })
    ], 8, ["to"])) : M("", !0);
  }
});
function Dr() {
  const n = Ct();
  if (!n)
    throw new Error("useNotify must be called within setup() or a lifecycle hook.");
  const s = n.appContext;
  async function t(l) {
    const i = document.createElement("div");
    i.id = `toast-app-${Ne()}`, document.body.appendChild(i), l = l ?? {}, l.hideOnAction ??= !0;
    const u = {
      tag: l.toastTag,
      overlay: l.overlay,
      noOverlayHide: l.noOverlayHide,
      noEscHide: l.noEscHide,
      position: l.position,
      focusOnShow: l.focusOnShow,
      duration: l.duration,
      role: l.role
    }, d = {
      tag: l.bannerTag,
      class: l.bannerClass,
      icon: l.icon,
      iconClass: l.iconClass,
      labelClass: l.labelClass,
      actionsClass: l.actionsClass,
      inlineActions: l.inlineActions,
      duration: l.duration,
      showProgress: l.showProgress,
      actions: l.actions
    }, f = /* @__PURE__ */ new Map();
    async function k() {
      b("hide"), setTimeout(() => h(), 300);
    }
    Array.isArray(d.actions) && (d.actions = d.actions.map((x) => {
      const q = x.onClick;
      return { ...x, onClick: () => {
        typeof q == "function" ? q({ hide: y, executeCallbacks: b }) : (x.label?.toLocaleLowerCase() === "ok" ? b("ok") : x.label?.toLocaleLowerCase() === "cancel" && b("cancel"), b("dismiss"), l.hideOnAction && y());
      } };
    }));
    const $ = ae(
      Po,
      {
        ...u,
        "onUpdate:modelValue": (x) => {
          x || k();
        }
      },
      {
        default: () => J(
          ta,
          {
            ...d,
            onTimerBegin: l.onTimerBegin,
            onTimerPause: l.onTimerPause,
            onTimerResume: l.onTimerResume
          },
          () => l.content || ""
        )
      }
    );
    s && ($.appContext = s), at($, i), await Te();
    async function y() {
      const x = $.component;
      x?.exposed?.hide && x.exposed.hide();
    }
    async function h() {
      at(null, i), i.remove();
    }
    function g(x, q) {
      const V = f.get(x) || [];
      V.push(q), f.set(x, V);
    }
    function b(x, ...q) {
      const V = f.get(x) || [];
      for (const G of V)
        G(q);
    }
    function v(x) {
      g("hide", x);
    }
    function S(x) {
      g("dismiss", x);
    }
    function B(x) {
      g("cancel", x);
    }
    function R(x) {
      g("ok", x);
    }
    function E(x) {
      g("show", x);
    }
    async function I() {
      return $.component?.exposed?.show(), await Te(), b("show"), {
        hide: y,
        onHide: v,
        onDismiss: S,
        onCancel: B,
        onOk: R
      };
    }
    return {
      show: I,
      onShow: E
    };
  }
  const e = async (l, i) => (await t({
    hideOnAction: !0,
    content: l,
    actions: [
      {
        label: "OK",
        class: "flat"
      }
    ],
    duration: 3e3,
    showProgress: !0,
    focusOnShow: !1,
    ...i
  })).show();
  return {
    create: t,
    notify: e,
    success: (l, i) => e(l, { bannerClass: "success", ...i }),
    error: (l, i) => e(l, { bannerClass: "error", ...i }),
    warning: (l, i) => e(l, { bannerClass: "warning", ...i }),
    info: (l, i) => e(l, { bannerClass: "info", ...i })
  };
}
const Vo = { class: "overflow-hidden" }, Yo = { class: "px-4 pb-2" }, ct = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NListItem",
  props: /* @__PURE__ */ Ie({
    tag: { default: "li" },
    to: {},
    href: {},
    target: {},
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    disabled: { type: Boolean },
    expandable: { type: Boolean },
    heading: { type: Boolean },
    contentField: { default: "content" }
  }, {
    modelValue: { type: Boolean, default: !1 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Ie(["click"], ["update:modelValue"]),
  setup(n, { expose: s, emit: t }) {
    const e = Ct(), a = Oe(), o = le(), r = n, c = Se(n, "modelValue"), l = t, i = p(() => !r.heading && (r.to || r.href || e?.vnode.props?.onClick)), u = p(() => r.to && !r.disabled ? "RouterLink" : r.href && !r.disabled ? "a" : r.tag), d = p(() => r.heading ? "presentation" : u.value === "RouterLink" || u.value === "a" ? "link" : i.value ? "button" : "listitem"), f = p(() => i.value || r.expandable ? 0 : void 0), k = p(
      () => Q(
        "n-list-item",
        i.value && !r.expandable ? "n-list-item--clickable" : "",
        r.disabled ? "n-list-item--disabled" : "",
        r.expandable ? "n-list-item--expandable" : "",
        r.heading ? "n-list-item--heading" : "",
        o.class
      )
    ), $ = p(() => {
      const { class: I, ...x } = o;
      return u.value === "RouterLink" ? (x.to = r.to, x.target = r.target) : u.value === "a" && (x.href = r.href, x.target = r.target), x;
    }), y = p(() => Xe(r.iconClass, r.prependIconClass)), h = p(() => {
      const I = a.default?.();
      return I && I.length > 0 ? De(I, "span") : r.contentField && o[r.contentField] ? De(o[r.contentField], "span") : [];
    }), g = p(() => {
      const I = a.content?.();
      return I && I.length > 0 ? De(I, "span") : [];
    }), b = (I) => I.nodes;
    function v(I) {
      if (r.disabled || r.heading) {
        I.preventDefault(), I.stopPropagation();
        return;
      }
      i.value && l("click", I);
    }
    function S(I) {
      if (i.value && ["Enter", " "].includes(I.key)) {
        const x = I.target;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(x.tagName) || x.isContentEditable)
          return;
        I.preventDefault(), v(I);
      }
    }
    function B() {
      c.value = !c.value;
    }
    return s({ expand: () => {
      c.value = !0;
    }, collapse: () => {
      c.value = !1;
    } }), (I, x) => (m(), _(j(u.value), W({
      class: k.value,
      role: d.value,
      tabindex: f.value,
      "aria-disabled": r.disabled ? "true" : void 0,
      "aria-expanded": r.expandable ? c.value : void 0
    }, $.value, {
      onClick: v,
      onKeydown: S
    }), {
      default: Y(() => [
        r.expandable ? (m(), O("div", {
          key: 0,
          class: "n-list-item-header",
          onClick: Ge(B, ["stop"])
        }, [
          A(I.$slots, "prepend"),
          r.prependIcon || r.icon ? (m(), _(X, {
            key: 0,
            name: r.prependIcon || r.icon,
            class: D(y.value),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : M("", !0),
          ae(b, { nodes: h.value }, null, 8, ["nodes"]),
          r.appendIcon ? (m(), _(X, {
            key: 1,
            name: r.appendIcon,
            class: D(r.appendIconClass),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : M("", !0),
          A(I.$slots, "append")
        ])) : (m(), O(ue, { key: 1 }, [
          A(I.$slots, "prepend"),
          r.prependIcon || r.icon ? (m(), _(X, {
            key: 0,
            name: r.prependIcon || r.icon,
            class: D(y.value),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : M("", !0),
          ae(b, { nodes: h.value }, null, 8, ["nodes"]),
          r.appendIcon ? (m(), _(X, {
            key: 1,
            name: r.appendIcon,
            class: D(r.appendIconClass),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : M("", !0),
          A(I.$slots, "append")
        ], 64)),
        r.expandable ? (m(), O("div", {
          key: 2,
          class: D(["n-list-item-content", [c.value ? "n-list-item-content--expanded" : ""]])
        }, [
          ee("div", Vo, [
            ee("div", Yo, [
              ae(b, { nodes: g.value }, null, 8, ["nodes"])
            ])
          ])
        ], 2)) : M("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "aria-expanded"]));
  }
}), Nt = {
  direction: "right",
  position: "start",
  stacked: !0
};
function _t(n) {
  const { children: s } = n;
  return typeof s == "string" || typeof s == "number" ? [String(s)] : Array.isArray(s) ? s : s && typeof s == "object" && "default" in s && typeof s.default == "function" ? s.default() : [];
}
function pt(n, s = Nt) {
  return n.map((t) => {
    if (!an(t) || t.type === Bn || t.type === Rn)
      return t;
    const e = {
      ...t.props,
      ref: t.ref ?? void 0,
      key: t.key ?? void 0
    };
    if (t.type === Tt || Rt(t, "NMenu"))
      return J(Tt, yt(Nt, { ...e, ...s }), {
        default: () => pt(_t(t), s)
      });
    if (t.type === ue)
      return J(ue, e, pt(_t(t), s));
    if (t.type === ct || Rt(t, "NListItem") || t.type === "li") {
      const a = _t(t), o = a.findIndex(
        (u) => an(u) && (u.type === "ul" || Rt(u, ["NMenu", "NList"]))
      ), r = o !== -1, c = r ? a.filter((u, d) => d !== o) : a, l = pt(c, s), i = t.children && typeof t.children == "object" && !Array.isArray(t.children) ? { ...t.children } : {};
      if (r) {
        const u = a[o];
        return J(ct, e, {
          ...i,
          default: () => [
            ...l,
            J(Tt, yt(Nt, { ...u.props, ...s }), {
              default: () => pt(_t(u), s)
            }),
            J(X, { name: "chevron-right", class: "ml-8 -mr-2" })
          ]
        });
      }
      return J(ct, e, { ...i, default: () => l });
    }
    if (t.children) {
      const a = _t(t);
      if (a.length)
        return J(t.type, e, {
          default: () => pt(a, s)
        });
    }
    return t;
  });
}
function pa(n, s = Nt) {
  return {
    transformedNodes: p(() => pt(n.default?.() ?? [], s))
  };
}
const Ho = ["innerHTML"], zo = {
  key: 0,
  class: "n-popover-overlay"
}, Wo = ["innerHTML"], jo = ["innerHTML"], Go = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NPopover",
  props: /* @__PURE__ */ Ie({
    tag: { default: "span" },
    content: { default: "" },
    showDelay: { default: 75 },
    hideDelay: { default: 250 },
    persistent: { type: Boolean, default: !1 },
    hoverTriggerAnchor: {},
    focusTriggerAnchor: {},
    clickTriggerAnchor: {},
    attachParent: {},
    triggerByHover: { type: Boolean, default: !0 },
    triggerByFocus: { type: Boolean, default: !0 },
    triggerByInteraction: { type: Boolean, default: !0 },
    allowClickToHide: { type: Boolean, default: !1 },
    direction: { default: "bottom" },
    position: { default: "" },
    margin: { default: 4 },
    offset: { default: () => [0, 0] },
    autoReposition: { type: Boolean, default: !0 },
    stacked: { type: Boolean, default: !1 },
    overlay: { type: Boolean, default: !1 },
    fit: { type: Boolean, default: !1 },
    role: { default: "presentation" }
  }, {
    modelValue: { type: Boolean, default: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n, { expose: s }) {
    const t = le(), e = n, a = Se(n, "modelValue"), o = Je("contentRef"), { isReady: r } = Wt("n-popovers-container"), c = ce(null), l = ce(null), i = p(() => l.value || c.value), u = () => {
      e.attachParent ? l.value = Yt(e.attachParent) : l.value = null;
    }, d = p(() => `${e.direction}${e.position !== "" ? `-${e.position}` : ""}`), f = p(() => ({
      ...e,
      hoverTriggerAnchor: e.triggerByHover ? e.hoverTriggerAnchor : null,
      focusTriggerAnchor: e.triggerByFocus ? e.focusTriggerAnchor : null,
      clickTriggerAnchor: e.triggerByInteraction ? e.clickTriggerAnchor : null
    })), {
      show: k,
      hide: $,
      handleContentHoverFocusIn: y,
      handleContentHoverFocusOut: h,
      compStyles: g,
      placement: b,
      parentWidth: v
    } = fa(f, {
      model: p({
        get: () => a.value,
        set: (E) => {
          a.value = E;
        }
      }),
      contentRef: o,
      attachParentEl: i,
      placement: d
    }), S = p(() => {
      const E = { ...g.value };
      return e.fit && (E.width = `${v.value}px`), E;
    }), B = p(() => Q("n-popover", `n-popover--direction-${b.value}`, t.class)), R = p(() => {
      const {
        tag: E,
        content: I,
        showDelay: x,
        hideDelay: q,
        persistent: V,
        hoverTriggerAnchor: G,
        focusTriggerAnchor: he,
        clickTriggerAnchor: fe,
        attachParent: Z,
        triggerByHover: se,
        triggerByFocus: U,
        triggerByInteraction: N,
        direction: ke,
        position: Ae,
        margin: _e,
        offset: Be,
        autoReposition: de,
        stacked: pe,
        overlay: ye,
        fit: Ce,
        role: te,
        ...Fe
      } = e, { class: xe, ...Le } = t;
      return {
        style: S.value,
        onMouseenter: y,
        onMouseleave: h,
        onFocusin: y,
        onFocusout: h,
        ...Fe,
        ...Le
      };
    });
    return En(() => {
      c.value = Qn(), u();
    }), Me(() => e.attachParent, u), s({ show: k, hide: $, contentRef: o }), (E, I) => e.stacked ? (m(), _(Re, {
      key: 0,
      name: "n-popover"
    }, {
      default: Y(() => [
        a.value ? (m(), _(j(e.tag), W({
          key: 0,
          ref_key: "contentRef",
          ref: o,
          class: B.value,
          role: e.role
        }, R.value), {
          default: Y(() => [
            A(E.$slots, "default", {}, () => [
              e.content ? (m(), O("span", {
                key: 0,
                innerHTML: e.content
              }, null, 8, Ho)) : M("", !0)
            ])
          ]),
          _: 3
        }, 16, ["class", "role"])) : M("", !0)
      ]),
      _: 3
    })) : ve(r) ? (m(), _(Vt, {
      key: 1,
      to: "#n-popovers-container"
    }, [
      ae(Re, {
        name: e.overlay ? "n-popover-overlay" : "n-popover"
      }, {
        default: Y(() => [
          a.value && e.overlay ? (m(), O("div", zo, [
            (m(), _(j(e.tag), W({
              ref_key: "contentRef",
              ref: o,
              class: B.value,
              role: e.role
            }, R.value), {
              default: Y(() => [
                A(E.$slots, "default", {}, () => [
                  e.content ? (m(), O("span", {
                    key: 0,
                    innerHTML: e.content
                  }, null, 8, Wo)) : M("", !0)
                ])
              ]),
              _: 3
            }, 16, ["class", "role"]))
          ])) : a.value ? (m(), _(j(e.tag), W({
            key: 1,
            ref_key: "contentRef",
            ref: o,
            class: B.value,
            role: e.role
          }, R.value), {
            default: Y(() => [
              A(E.$slots, "default", {}, () => [
                e.content ? (m(), O("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, jo)) : M("", !0)
              ])
            ]),
            _: 3
          }, 16, ["class", "role"])) : M("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ])) : M("", !0);
  }
}), Tt = /* @__PURE__ */ re({
  __name: "NMenu",
  props: {
    tag: { default: "div" },
    content: {},
    showDelay: {},
    hideDelay: {},
    persistent: { type: Boolean },
    hoverTriggerAnchor: {},
    focusTriggerAnchor: {},
    clickTriggerAnchor: {},
    attachParent: {},
    triggerByHover: { type: Boolean, default: !0 },
    triggerByFocus: { type: Boolean, default: !0 },
    triggerByInteraction: { type: Boolean, default: !0 },
    allowClickToHide: { type: Boolean, default: !1 },
    direction: {},
    position: {},
    margin: {},
    offset: {},
    autoReposition: { type: Boolean },
    stacked: { type: Boolean },
    overlay: { type: Boolean },
    fit: { type: Boolean },
    role: {},
    listTag: { default: "ul" },
    listClass: { default: "bg-surface shadowed" },
    items: {},
    valueField: { default: "value" },
    childrenField: { default: "items" },
    contentField: { default: "content" },
    recursiveTriggers: { type: Boolean, default: !1 }
  },
  emits: ["select"],
  setup(n, { expose: s, emit: t }) {
    const e = {
      direction: "right",
      position: "start",
      stacked: !0
    }, a = Oe(), o = le(), r = n, c = t, l = Je("popoverRef"), { transformedNodes: i } = pa(a, e), u = p(() => Q("n-menu", o.class)), d = p(() => {
      const {
        items: $,
        listTag: y,
        listClass: h,
        valueField: g,
        childrenField: b,
        contentField: v,
        triggerByHover: S,
        triggerByFocus: B,
        triggerByInteraction: R,
        allowClickToHide: E,
        recursiveTriggers: I,
        ...x
      } = r, { class: q, ...V } = o;
      return {
        ...x,
        hoverTriggerAnchor: S ? r.hoverTriggerAnchor : null,
        focusTriggerAnchor: B ? r.focusTriggerAnchor : null,
        clickTriggerAnchor: R ? r.clickTriggerAnchor : null,
        attachParent: R ? r.attachParent : null,
        allowClickToHide: E,
        ...V
      };
    }), f = ($, y = e) => $.map((h) => {
      const {
        [r.contentField]: g,
        [r.childrenField]: b,
        onClick: v,
        ...S
      } = h, B = !!(b && b.length), R = {
        key: h.key ?? h.id ?? h[r.valueField],
        ...S,
        role: "menuitem",
        "aria-haspopup": B ? "menu" : void 0,
        onClick: (E) => {
          v && typeof v == "function" && v(E), c("select", h);
        }
      };
      if (B && !a.item) {
        const {
          hoverTriggerAnchor: E,
          focusTriggerAnchor: I,
          clickTriggerAnchor: x,
          fit: q,
          items: V,
          triggerByHover: G,
          triggerByFocus: he,
          triggerByInteraction: fe,
          allowClickToHide: Z,
          recursiveTriggers: se,
          ...U
        } = r, N = {
          ...U,
          ...r.recursiveTriggers ? {
            triggerByHover: G,
            triggerByFocus: he,
            triggerByInteraction: fe,
            allowClickToHide: Z,
            recursiveTriggers: se
          } : {}
        };
        return J(
          ct,
          R,
          a.submenu ? J(ue, null, a.submenu(h) ?? []) : {
            default: () => [
              J("span", { class: "grow" }, g),
              J(Tt, {
                ...N,
                ...e,
                items: b,
                ...y,
                onSelect: (ke) => c("select", ke)
              }),
              J(X, {
                name: "mdi-chevron-right",
                class: "ml-8 -mr-2",
                "aria-hidden": "true"
              })
            ]
          }
        );
      }
      return a.item ? J(ue, null, a.item(h) ?? []) : J(ct, R, () => a["item-content"]?.(h) ?? g);
    }), k = p(() => r.items && r.items.length ? f(r.items, e) : i.value);
    return s({ popoverRef: l }), ($, y) => (m(), _(Go, W({
      ref_key: "popoverRef",
      ref: l,
      class: u.value
    }, d.value), {
      default: Y(() => [
        (m(), _(j(r.listTag), {
          class: D(["n-list", r.listClass]),
          role: "menu"
        }, {
          default: Y(() => [
            (m(!0), O(ue, null, ge(k.value, (h, g) => (m(), _(j(h), {
              key: h.key ?? g
            }))), 128))
          ]),
          _: 1
        }, 8, ["class"]))
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), Uo = {
  key: 0,
  class: "n-input-combo-chips-container"
}, Ko = ["id", "name", "disabled", "readonly", "value", "placeholder", "aria-expanded", "onKeydown"], Or = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NInputCombo",
  props: /* @__PURE__ */ Ie({
    tag: {},
    name: {},
    label: {},
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean },
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    message: {},
    helperText: {},
    size: {},
    loading: { type: Boolean },
    loadingName: { default: "loading" },
    loadingClass: {},
    format: {},
    parse: {},
    wrapperClass: {},
    containerClass: {},
    type: {},
    multiple: { type: Boolean, default: !1 },
    closeDropdownOnSelected: { type: Boolean, default: void 0 },
    items: { default: () => [] },
    dropdownIcon: { default: "mdi-menu-down" },
    dropdownIconClass: { default: "text-xl animate-dropdown" },
    inputClass: {},
    popoverClass: {},
    listClass: { default: "bg-surface shadowed overflow-auto" },
    labelField: { default: "label" },
    childrenField: { default: "children" },
    valueField: { default: "value" },
    useInput: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    fillInput: { type: [Boolean, String], default: !1 },
    blurOnSelected: { type: Boolean, default: !0 },
    chipProps: { default: () => ({ class: "text-xs" }) },
    menuProps: {},
    valueClass: { default: "" },
    debounce: { default: 0 }
  }, {
    modelValue: {},
    modelModifiers: {},
    inputValue: { default: "" },
    inputValueModifiers: {},
    dropdown: { default: !1 },
    dropdownModifiers: {}
  }),
  emits: /* @__PURE__ */ Ie(["filter", "clear"], ["update:modelValue", "update:inputValue", "update:dropdown"]),
  setup(n, { emit: s }) {
    const t = n, e = s, a = Oe(), o = le(), r = Se(n, "modelValue"), c = Se(n, "inputValue"), l = Se(n, "dropdown"), i = Je("inputRef"), u = Je("menuRef"), d = ce(!1), f = ce(!1), k = `menu-${Ne()}`, $ = ce(/* @__PURE__ */ new Map()), y = $a("n-modal-focusable", null);
    function h(w) {
      for (const C of w) {
        const H = C[t.valueField];
        H != null && $.value.set(H, C), C[t.childrenField] && Array.isArray(C[t.childrenField]) && h(C[t.childrenField]);
      }
    }
    const g = (w, C) => {
      for (const H of w) {
        if (H[t.valueField] === C)
          return H;
        if (H[t.childrenField] && Array.isArray(H[t.childrenField])) {
          const T = g(H[t.childrenField], C);
          if (T) return T;
        }
      }
      return $.value.get(C) || null;
    }, b = (w) => w ? w[t.labelField] : "", v = (w) => w ? w[t.valueField] : "", S = p(() => {
      if (t.multiple)
        return Array.isArray(r.value) ? r.value.map(
          (C) => g(t.items, C) || {
            [t.valueField]: C,
            [t.labelField]: C
          }
        ) : [];
      const w = r.value;
      return g(t.items, w) || null;
    }), B = p(() => t.multiple && Array.isArray(S.value) && S.value.length > 0), R = p(() => {
      if (!t.useInput || !c.value) return t.items;
      const w = c.value.toLowerCase();
      return t.items.filter((C) => (C[t.labelField] || "").toLowerCase().includes(w));
    }), E = p(() => {
      if (R.value.length === 0) {
        const w = !!a.empty;
        return [
          {
            [t.labelField]: a.empty?.() || "No results found",
            heading: !w,
            disabled: !0,
            value: "empty-state",
            class: w ? "" : "text-muted italic px-4 py-2"
          }
        ];
      }
      return de(R.value);
    }), I = p(() => typeof t.closeDropdownOnSelected == "boolean" ? t.closeDropdownOnSelected : !t.multiple), x = p(() => !(!t.clearable || !r.value || Array.isArray(r.value) && r.value.length === 0)), q = p(() => t.multiple ? !1 : S.value && !c.value && !d.value || !t.useInput), V = p(() => t.multiple && !t.useInput && B.value), G = p(
      () => Ue(a, ["default", "item", "item-content", "chip", "append", "no-option"])
    ), he = p(() => Q("n-input-combo", o.class)), fe = p(() => {
      const {
        inputClass: w,
        popoverClass: C,
        listClass: H,
        valueClass: T,
        dropdownIcon: oe,
        dropdownIconClass: me,
        items: ne,
        chipProps: be,
        menuProps: Qe,
        clearable: We,
        labelField: fn,
        childrenField: pn,
        valueField: mn,
        multiple: Gt,
        closeDropdownOnSelected: Ut,
        blurOnSelected: Kt,
        useInput: vn,
        ...Zt
      } = t, Xt = Object.fromEntries(Object.entries(o).filter(([qt]) => !qt.startsWith("on")));
      return {
        ...Ue(Xt, ["class", "modelValue"]),
        ...Ue(Zt, ["modelValue", "modelModifiers"])
      };
    }), Z = p(() => Ue(o, ["class", "style", "modelValue", "placeholder"])), se = p(() => b(S.value) ? "" : o.placeholder || ""), U = p(() => Q("n-input-combo-value", t.valueClass)), N = p(() => f.value ? null : i.value);
    Me(l, (w, C, H) => {
      w && (y?.pause(), H(() => {
        document.activeElement === document.body && y?.focusContent(), y?.unpause();
      }));
    }), Me(
      () => t.items,
      (w) => {
        h(w);
      },
      { immediate: !0, deep: !0 }
    ), Me(
      () => r.value,
      (w) => {
        if (!t.multiple && t.fillInput) {
          const C = g(t.items, w);
          C ? c.value = t.fillInput === "value" ? v(C) : b(C) : c.value = "";
        }
      },
      { immediate: !0 }
    );
    const ke = Pn((w) => {
      e("filter", w);
    }, t.debounce);
    function Ae(w) {
      w.key === "ArrowDown" ? (w.preventDefault(), _e(w.target)) : w.key === "ArrowUp" ? (w.preventDefault(), Be(w.target)) : w.key === "Escape" ? (w.preventDefault(), w.stopPropagation(), St()) : w.key === "ArrowLeft" && (w.preventDefault(), i.value?.focus());
    }
    function _e(w) {
      let C = w.nextElementSibling;
      for (; C; ) {
        if (C.getAttribute("tabindex") === "0") {
          C.focus();
          return;
        }
        C = C.nextElementSibling;
      }
    }
    function Be(w) {
      let C = w.previousElementSibling;
      for (; C; ) {
        if (C.getAttribute("tabindex") === "0") {
          C.focus();
          return;
        }
        C = C.previousElementSibling;
      }
      i.value?.focus();
    }
    function de(w) {
      return w.map((C) => {
        const H = !!C.heading, T = !!C.disabled, oe = pe(C), me = C[t.childrenField], ne = me && Array.isArray(me) ? de(me) : void 0;
        return {
          ...C,
          [t.childrenField]: ne,
          class: Xe(C.class, oe ? "n-list-item--active" : ""),
          tabindex: H || T ? void 0 : "0",
          onKeydown: (be) => {
            H || T || Ae(be);
          },
          onMousedown: (be) => {
            (H || T) && be.preventDefault();
          }
        };
      });
    }
    function pe(w) {
      const C = w[t.valueField];
      return t.multiple && Array.isArray(r.value) ? r.value.includes(C) : r.value === C;
    }
    function ye(w) {
      const C = r.value;
      if (t.multiple && Array.isArray(C)) {
        const H = [...C];
        H.splice(Number(w), 1), r.value = H;
      }
    }
    function Ce() {
      i.value?.focus(), l.value || (l.value = !0);
    }
    function te(w) {
      const C = w.target;
      c.value = C.value, l.value || (l.value = !0), t.debounce > 0 ? ke(c.value) : e("filter", c.value);
    }
    function Fe() {
      d.value = !0;
    }
    function xe() {
      d.value = !1;
    }
    function Le(w) {
      if (w.heading || w.disabled) return;
      const C = w[t.valueField];
      if (t.multiple) {
        const H = Array.isArray(r.value) ? [...r.value] : [], T = H.indexOf(C);
        T > -1 ? H.splice(T, 1) : H.push(C), r.value = H, c.value = "";
      } else
        r.value = C, c.value = t.fillInput === "value" ? v(w) : b(w), t.fillInput && Te(() => {
          i.value?.dispatchEvent(new Event("change", { bubbles: !0 }));
        });
      I.value && St(), t.blurOnSelected && i.value?.blur();
    }
    function ze() {
      r.value = t.multiple ? [] : void 0, c.value = "", e("clear");
    }
    function Ke() {
      if (t.multiple && c.value === "" && Array.isArray(r.value) && r.value.length > 0) {
        const w = [...r.value];
        w.pop(), r.value = w;
      }
    }
    function dt() {
      l.value && R.value.length > 0 ? Le(R.value[0]) : l.value || (l.value = !0);
    }
    async function St() {
      f.value = !0, l.value = !1, await Te(), f.value = !1;
    }
    function jt(w) {
      l.value && (w.stopPropagation(), St());
    }
    function z() {
      l.value || (l.value = !0), Te(() => {
        if (!u.value) return;
        const C = document.getElementById(k);
        if (!C) return;
        const H = C.querySelector('[tabindex="0"]');
        H && H.focus();
      });
    }
    return (w, C) => (m(), _(dn, W(fe.value, { class: he.value }), Ft({
      default: Y(({ inputId: H }) => [
        ee("div", {
          class: "n-input-combo-display-container",
          onClick: Ce
        }, [
          B.value ? (m(), O("div", Uo, [
            (m(!0), O(ue, null, ge(S.value, (T, oe) => A(w.$slots, "chip", {
              key: v(T),
              item: T,
              index: oe,
              remove: () => ye(oe)
            }, () => [
              ae(Io, W({
                label: b(T),
                removable: ""
              }, { ref_for: !0 }, t.chipProps, {
                onRemove: (me) => ye(oe),
                onClick: C[0] || (C[0] = Ge(() => {
                }, ["stop"]))
              }), null, 16, ["label", "onRemove"])
            ])), 128))
          ])) : M("", !0),
          q.value ? (m(), O("span", {
            key: 1,
            class: D(U.value)
          }, we(b(S.value)), 3)) : M("", !0),
          ee("input", W({
            id: H,
            ref_key: "inputRef",
            ref: i,
            name: t.name,
            disabled: t.disabled,
            readonly: !t.useInput || t.readonly,
            type: "text",
            class: ["n-input-combo-input", t.inputClass, V.value ? "sr-only" : ""],
            value: c.value,
            autocomplete: "off",
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-haspopup": "menu",
            placeholder: se.value,
            "aria-expanded": l.value,
            "aria-controls": k
          }, Z.value, {
            onInput: te,
            onFocus: Fe,
            onBlur: xe,
            onKeydown: [
              lt(Ge(z, ["prevent"]), ["down"]),
              lt(Ge(dt, ["prevent"]), ["enter"]),
              lt(Ke, ["backspace"]),
              lt(jt, ["esc"])
            ]
          }), null, 16, Ko)
        ]),
        !t.disabled && !t.loading ? (m(), _(Tt, W({
          key: 0,
          id: k,
          ref_key: "menuRef",
          ref: u,
          modelValue: l.value,
          "onUpdate:modelValue": C[1] || (C[1] = (T) => l.value = T),
          class: ["n-input-combo-menu", t.popoverClass],
          fit: "",
          items: E.value,
          "content-field": t.labelField,
          "children-field": t.childrenField,
          "value-field": t.valueField,
          "hover-trigger-anchor": i.value,
          "focus-trigger-anchor": N.value
        }, t.menuProps, { onSelect: Le }), Ft({ _: 2 }, [
          w.$slots.item ? {
            name: "item",
            fn: Y((T) => [
              A(w.$slots, "item", { item: T })
            ]),
            key: "0"
          } : void 0,
          w.$slots["item-content"] ? {
            name: "item-content",
            fn: Y((T) => [
              A(w.$slots, "item-content", { item: T })
            ]),
            key: "1"
          } : void 0
        ]), 1040, ["modelValue", "class", "items", "content-field", "children-field", "value-field", "hover-trigger-anchor", "focus-trigger-anchor"])) : M("", !0)
      ]),
      append: Y(() => [
        x.value ? (m(), _(X, {
          key: 0,
          name: "mdi-close",
          class: "cursor-pointer hover:text-error transition-colors",
          onClick: Ge(ze, ["stop"])
        })) : M("", !0),
        ae(X, {
          name: t.dropdownIcon,
          class: D([t.dropdownIconClass, l.value ? "rotate-180" : ""])
        }, null, 8, ["name", "class"]),
        A(w.$slots, "append")
      ]),
      _: 2
    }, [
      ge(G.value, (H, T) => ({
        name: T,
        fn: Y((oe) => [
          A(w.$slots, T, qe(st(oe)))
        ])
      }))
    ]), 1040, ["class"]));
  }
}), Zo = ["id", "name", "multiple", "disabled"], Br = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NInputSelect",
  props: /* @__PURE__ */ Ie({
    tag: {},
    name: {},
    label: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    message: {},
    helperText: {},
    size: {},
    loading: { type: Boolean },
    loadingName: {},
    loadingClass: {},
    format: {},
    parse: {},
    wrapperClass: {},
    containerClass: {},
    type: {},
    inputClass: {},
    multiple: { type: Boolean, default: !1 },
    dropdownIcon: { default: "mdi-menu-down" },
    dropdownIconClass: { default: "text-xl" },
    options: {},
    formatOption: {},
    formatOptGroup: {},
    showCheckmark: { type: Boolean, default: !0 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const s = Oe(), t = le(), e = n, a = Se(n, "modelValue"), o = p({
      get: () => {
        if (e.multiple) {
          if (!a.value) return [];
          if (Array.isArray(a.value)) return a.value;
          try {
            const f = JSON.parse(a.value);
            return Array.isArray(f) ? f : [];
          } catch {
            return [];
          }
        }
        return a.value;
      },
      set: (f) => {
        a.value = f;
      }
    }), r = p(() => Ue(s, ["default", "append"])), c = p(
      () => Q("n-input-select", e.showCheckmark ? "" : "n-input-select--no-checkmark", t.class)
    ), l = p(() => {
      const {
        inputClass: f,
        dropdownIcon: k,
        dropdownIconClass: $,
        formatOption: y,
        formatOptGroup: h,
        multiple: g,
        options: b,
        modelValue: v,
        modelModifiers: S,
        showCheckmark: B,
        ...R
      } = e;
      return { ...R, style: t.style };
    }), i = p(() => Ue(t, ["class", "style"])), u = (f) => f.map((k) => {
      if ("options" in k) {
        const $ = k, { label: y, options: h, ...g } = $, b = h?.map((v) => {
          const { label: S, value: B, ...R } = v;
          return J(
            "option",
            {
              value: B,
              label: typeof e.formatOption == "function" ? e.formatOption(S) : S,
              ...R
            },
            S
          );
        }) ?? [];
        return J(
          "optgroup",
          {
            label: typeof e.formatOptGroup == "function" ? e.formatOptGroup(y) : y,
            ...g
          },
          b
        );
      } else {
        const $ = k, { label: y, value: h, ...g } = $;
        return J(
          "option",
          {
            value: h,
            label: typeof e.formatOption == "function" ? e.formatOption(y) : y,
            ...g
          },
          y
        );
      }
    }), d = p(() => e.options && e.options.length ? u(e.options) : De(s.default?.() ?? [], "option"));
    return (f, k) => (m(), _(dn, W({
      modelValue: a.value,
      "onUpdate:modelValue": k[1] || (k[1] = ($) => a.value = $),
      class: c.value
    }, l.value), Ft({
      default: Y(({ inputId: $ }) => [
        ut(ee("select", W({
          id: $,
          "onUpdate:modelValue": k[0] || (k[0] = (y) => o.value = y),
          name: e.name,
          multiple: e.multiple,
          disabled: e.disabled,
          size: 1,
          class: ["peer", e.inputClass]
        }, i.value), [
          (m(!0), O(ue, null, ge(d.value, (y, h) => (m(), _(j(y), { key: h }))), 128))
        ], 16, Zo), [
          [Ia, o.value]
        ])
      ]),
      append: Y(() => [
        ae(X, {
          name: e.dropdownIcon,
          class: D([e.dropdownIconClass, "n-input-select-dropdown-icon"]),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"]),
        A(f.$slots, "append")
      ]),
      _: 2
    }, [
      ge(r.value, ($, y) => ({
        name: y,
        fn: Y((h) => [
          A(f.$slots, y, qe(st(h)))
        ])
      }))
    ]), 1040, ["modelValue", "class"]));
  }
}), Xo = ["id", "name", "type", "disabled", "readonly"], Rr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NInputText",
  props: /* @__PURE__ */ Ie({
    tag: {},
    name: {},
    label: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    message: {},
    helperText: {},
    size: { default: "medium" },
    loading: { type: Boolean },
    loadingName: {},
    loadingClass: {},
    format: {},
    parse: {},
    wrapperClass: {},
    containerClass: {},
    type: { default: "text" },
    inputClass: {},
    debounce: { default: 0 }
  }, {
    modelValue: { default: "" },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const s = Oe(), t = le(), e = n, a = Se(n, "modelValue"), o = ce(a.value), r = p(() => Ue(s, ["default"])), c = p(() => Q("n-input-text", t.class)), l = p(() => {
      const { type: f, inputClass: k, modelValue: $, modelModifiers: y, debounce: h, ...g } = e;
      return { ...g, style: t.style };
    }), i = p(() => Ue(t, ["class", "style"])), u = Pn((f) => {
      a.value = f;
    }, e.debounce);
    Me(
      () => a.value,
      (f) => {
        f !== o.value && (o.value = f);
      }
    );
    function d() {
      e.debounce > 0 ? u(o.value) : a.value = o.value;
    }
    return (f, k) => (m(), _(dn, W({
      modelValue: o.value,
      "onUpdate:modelValue": k[1] || (k[1] = ($) => o.value = $),
      class: c.value
    }, l.value), Ft({
      default: Y(({ inputId: $ }) => [
        ut(ee("input", W({
          id: $,
          "onUpdate:modelValue": k[0] || (k[0] = (y) => o.value = y),
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          readonly: e.readonly,
          class: ["peer", e.inputClass]
        }, i.value, { onInput: d }), null, 16, Xo), [
          [Fn, o.value]
        ])
      ]),
      _: 2
    }, [
      ge(r.value, ($, y) => ({
        name: y,
        fn: Y((h) => [
          A(f.$slots, y, qe(st(h)))
        ])
      }))
    ]), 1040, ["modelValue", "class"]));
  }
}), qo = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NList",
  props: {
    tag: { default: "ul" },
    items: {},
    valueField: { default: "value" },
    childrenField: { default: "children" },
    contentField: { default: "content" }
  },
  setup(n) {
    const s = Oe(), t = le(), e = n, { transformedNodes: a } = pa(s), o = p(() => Q("n-list", t.class)), r = p(() => {
      const { class: i, ...u } = t;
      return u;
    }), c = p(() => e.items ? l(e.items) : a.value);
    function l(i) {
      return i.length === 0 ? [
        s.empty ? J(ue, null, s.empty({ items: i }) ?? []) : J(ct, { key: "empty" }, () => s["empty-content"]?.() ?? "No item found.")
      ] : i.map((u) => {
        const d = u[e.contentField], f = u[e.childrenField], k = { ...u };
        delete k[e.contentField], delete k[e.childrenField];
        const $ = u?.[e.valueField] || Ne(), y = f && Array.isArray(f) && f.length > 0 ? J(qo, {
          items: f,
          tag: e.tag,
          valueField: e.valueField,
          childrenField: e.childrenField,
          contentField: e.contentField,
          class: "w-full pl-4"
        }) : null;
        if (s.item)
          return J(ue, { key: $ }, s.item({ ...u, childrenNodes: y }) ?? []);
        const h = { key: $, ...k }, g = {
          default: () => s["item-content"]?.(u) ?? d
        };
        if (y)
          if (h.expandable)
            g.content = () => y;
          else {
            const b = g.default;
            g.default = () => [b(), y];
          }
        return J(ct, h, g);
      });
    }
    return (i, u) => (m(), _(j(e.tag), W({ class: o.value }, r.value, { role: "list" }), {
      default: Y(() => [
        (m(!0), O(ue, null, ge(c.value, (d, f) => (m(), _(j(d), {
          key: d?.key || f
        }))), 128))
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), Jo = ["value", "name"], Qo = { class: "n-radio-display" }, er = {
  key: 3,
  class: "n-radio-overlay"
}, tr = {
  key: 1,
  class: "n-radio-message"
}, Nr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NRadio",
  props: /* @__PURE__ */ Ie({
    tag: { default: "label" },
    name: { default: "" },
    label: { default: "" },
    inlineLabel: { type: Boolean, default: !1 },
    value: {},
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    inputClass: {},
    message: {},
    helperText: {},
    uncheckedIcon: { default: "undefined" },
    uncheckedIconClass: {},
    checkedIcon: { default: "mdi-circle" },
    checkedIconClass: {},
    color: {},
    size: { default: "medium" }
  }, {
    modelValue: { default: null },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const s = Oe(), t = le(), e = n, a = Se(n, "modelValue"), o = `input-id-${Ne()}`, r = p(() => Q("n-radio", t.class)), c = p(() => ["n-radio-container"]), l = p(() => ["n-radio-wrapper", e.size ? `n-radio--${e.size}` : ""]), i = p(() => ["n-radio-label"]), u = p(() => Xe(e.iconClass, e.prependIconClass)), d = p(() => {
      const { class: h, style: g } = t;
      return { style: g };
    }), f = p(() => {
      const { class: h, style: g, ...b } = t;
      return b;
    }), k = p(() => ({
      ...e,
      inputId: o,
      modelValue: a.value
    })), $ = p(() => De(s.before?.(k.value) ?? [], "span")), y = p(() => De(s.after?.(k.value) ?? [], "span"));
    return (h, g) => (m(), O("div", {
      class: D(l.value)
    }, [
      (m(!0), O(ue, null, ge($.value, (b, v) => (m(), _(j(b), { key: v }))), 128)),
      ee("div", {
        class: D(c.value)
      }, [
        !e.inlineLabel && (e.label || h.$slots.label) ? A(h.$slots, "label", { key: 0 }, () => [
          ee("label", {
            class: D(i.value),
            for: o
          }, we(e.label), 3)
        ]) : M("", !0),
        A(h.$slots, "top"),
        (m(), _(j(e.tag), W({ class: r.value }, d.value), {
          default: Y(() => [
            A(h.$slots, "prepend"),
            e.prependIcon || e.icon ? (m(), _(X, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: D(u.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : M("", !0),
            ut(ee("input", W({
              id: o,
              "onUpdate:modelValue": g[0] || (g[0] = (b) => a.value = b),
              value: e.value,
              name: e.name,
              type: "radio",
              class: ["peer", e.inputClass]
            }, f.value), null, 16, Jo), [
              [xa, a.value]
            ]),
            ee("div", Qo, [
              ae(X, {
                name: e.uncheckedIcon,
                class: D(["n-radio-display-unchecked", e.uncheckedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"]),
              ae(X, {
                name: e.checkedIcon,
                class: D(["n-radio-display-checked", e.checkedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])
            ]),
            A(h.$slots, "default", qe(st(k.value))),
            e.inlineLabel && (e.label || h.$slots.label) ? A(h.$slots, "inlineLabel", { key: 1 }, () => [
              ee("label", {
                class: D(i.value),
                for: o
              }, we(e.label), 3)
            ]) : M("", !0),
            e.appendIcon ? (m(), _(X, {
              key: 2,
              name: e.appendIcon,
              class: D(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : M("", !0),
            A(h.$slots, "append"),
            h.$slots.overlay ? (m(), O("div", er, [
              A(h.$slots, "overlay")
            ])) : M("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        A(h.$slots, "dropdown"),
        A(h.$slots, "bottom"),
        e.message || e.helperText ? (m(), O("div", tr, we(e.message || e.helperText), 1)) : M("", !0)
      ], 2),
      (m(!0), O(ue, null, ge(y.value, (b, v) => (m(), _(j(b), { key: v }))), 128))
    ], 2));
  }
}), nr = { key: 1 }, Fr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NTab",
  props: {
    name: {},
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    label: {},
    tag: { default: "button" },
    type: { default: "button" },
    loading: { type: Boolean },
    loadingName: { default: "loading" },
    loadingClass: {},
    to: {},
    href: {},
    target: {}
  },
  setup(n) {
    const s = Oe(), t = le(), e = n, a = p(() => Q("n-tab", e.loading ? "n-tab--loading" : "", t.class)), o = p(() => e.to ? "RouterLink" : e.href ? "a" : e.tag), r = p(() => Xe(e.iconClass, e.prependIconClass)), c = p(() => {
      const { class: i, ...u } = t;
      return o.value === "RouterLink" ? (u.to = e.to, u.target = e.target) : o.value === "a" && (u.href = e.href, u.target = e.target), u;
    }), l = p(() => De(s.default?.() ?? [], "span"));
    return (i, u) => (m(), _(j(o.value), W({
      class: a.value,
      type: e.type,
      disabled: ve(t).disabled || e.loading,
      "aria-disabled": ve(t).disabled || e.loading ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, c.value), {
      default: Y(() => [
        A(i.$slots, "loading", {}, () => [
          ae(Re, { name: "n-loading-overlay" }, {
            default: Y(() => [
              e.loading ? (m(), _(xt, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: D(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : M("", !0)
            ]),
            _: 1
          })
        ]),
        A(i.$slots, "prepend"),
        e.prependIcon || e.icon ? (m(), _(X, {
          key: 0,
          name: e.prependIcon || e.icon,
          class: D(r.value),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : M("", !0),
        e.label ? (m(), O("span", nr, we(e.label), 1)) : M("", !0),
        (m(!0), O(ue, null, ge(l.value, (d, f) => (m(), _(j(d), { key: f }))), 128)),
        e.appendIcon ? (m(), _(X, {
          key: 2,
          name: e.appendIcon,
          class: D(e.appendIconClass),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : M("", !0),
        A(i.$slots, "append")
      ]),
      _: 3
    }, 16, ["class", "type", "disabled", "aria-disabled", "aria-busy"]));
  }
}), Lr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NTabs",
  props: /* @__PURE__ */ Ie({
    tag: { default: "div" },
    multiple: { type: Boolean, default: !1 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const s = Oe(), t = le(), e = Se(n, "modelValue"), a = n, o = Ne(), r = ce([]), c = ce(null), l = p(() => e.value !== void 0 && e.value !== null), i = p(() => f.value.some((v) => k(v))), u = p(() => Q("n-tabs", t.class)), d = p(() => {
      const { class: v, ...S } = t;
      return S;
    }), f = p(() => {
      const v = s.default?.() ?? [];
      return !v || v.length === 0 ? [] : (Array.isArray(v) ? v : [v]).map((R) => Rt(R, "NTab") ? R : null).filter((R) => !!R);
    });
    function k(v) {
      return !l.value || !v.props?.name ? !1 : a.multiple && Array.isArray(e.value) ? e.value.includes(v.props?.name) : v.props?.name === e.value;
    }
    function $(v, S) {
      return !l.value || k(v) || !i.value && S === 0 ? 0 : -1;
    }
    function y(v, S) {
      return v.props?.id || `n-tab-${o}-${S}`;
    }
    function h(v, S) {
      v && (r.value[S] = v.$el || v);
    }
    function g(v) {
      if (!(!l.value || !v.props?.name))
        if (a.multiple && Array.isArray(e.value)) {
          const S = e.value.indexOf(v.props?.name);
          S >= 0 ? e.value = e.value.toSpliced(S, 1) : e.value = [...e.value, v.props?.name];
        } else
          e.value = v.props?.name ?? "";
    }
    function b(v) {
      const S = r.value.filter(
        (I) => !I.hasAttribute("disabled") && I.getAttribute("aria-disabled") !== "true"
      );
      if (S.length === 0) return;
      const B = document.activeElement, R = S.indexOf(B);
      let E = -1;
      switch (v.key) {
        case "ArrowRight":
        case "ArrowDown":
          E = (R + 1) % S.length, v.preventDefault();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          E = (R - 1 + S.length) % S.length, v.preventDefault();
          break;
        case "Home":
          E = 0, v.preventDefault();
          break;
        case "End":
          E = S.length - 1, v.preventDefault();
          break;
      }
      E !== -1 && (S[E].focus(), l.value && !a.multiple && S[E].click());
    }
    return (v, S) => (m(), _(j(a.tag), W({
      ref_key: "tabListRef",
      ref: c,
      class: u.value
    }, d.value, {
      role: l.value ? "tablist" : "group",
      onKeydown: b
    }), {
      default: Y(() => [
        (m(!0), O(ue, null, ge(f.value, (B, R) => (m(), _(j(B), {
          key: R,
          id: y(B, R),
          ref_for: !0,
          ref: (E) => h(E, R),
          class: D([k(B) ? "n-tab--active" : ""]),
          role: l.value ? "tab" : void 0,
          "aria-selected": l.value ? k(B) ? "true" : "false" : void 0,
          tabindex: $(B, R),
          onClick: () => g(B)
        }, null, 8, ["id", "class", "role", "aria-selected", "tabindex", "onClick"]))), 128))
      ]),
      _: 1
    }, 16, ["class", "role"]));
  }
}), ar = ["name", ".indeterminate"], sr = { class: "n-toggle-track" }, or = { class: "n-toggle-thumb" }, rr = {
  key: 3,
  class: "n-toggle-overlay"
}, lr = {
  key: 1,
  class: "n-toggle-message"
}, Er = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NToggle",
  props: /* @__PURE__ */ Ie({
    tag: { default: "label" },
    name: { default: "" },
    label: { default: "" },
    inlineLabel: { type: Boolean, default: !1 },
    icon: {},
    iconClass: {},
    prependIcon: {},
    prependIconClass: {},
    appendIcon: {},
    appendIconClass: {},
    inputClass: {},
    message: {},
    helperText: {},
    uncheckedIcon: { default: "mdi-close" },
    uncheckedIconClass: {},
    checkedIcon: { default: "mdi-check" },
    checkedIconClass: {},
    indeterminateIcon: { default: "mdi-minus" },
    indeterminateIconClass: {},
    size: { default: "medium" }
  }, {
    modelValue: { type: [Boolean, null], default: null },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const s = Oe(), t = le(), e = n, [a, o] = Se(n, "modelValue"), r = `input-id-${Ne()}`, c = p(() => Xe(e.iconClass, e.prependIconClass)), l = p(() => Q("n-toggle", t.class)), i = p(() => ["n-toggle-container"]), u = p(() => ["n-toggle-wrapper", e.size ? `n-toggle--${e.size}` : ""]), d = p(() => ["n-toggle-label"]), f = p(() => {
      const { class: g, style: b } = t;
      return { style: b };
    }), k = p(() => {
      const { class: g, style: b, ...v } = t;
      return v;
    }), $ = p(() => ({
      ...e,
      modifiers: o,
      inputId: r,
      modelValue: a.value
    })), y = p(() => De(s.before?.($.value) ?? [], "span")), h = p(() => De(s.after?.($.value) ?? [], "span"));
    return (g, b) => (m(), O("div", {
      class: D(u.value)
    }, [
      (m(!0), O(ue, null, ge(y.value, (v, S) => (m(), _(j(v), { key: S }))), 128)),
      ee("div", {
        class: D(i.value)
      }, [
        !e.inlineLabel && (e.label || g.$slots.label) ? A(g.$slots, "label", { key: 0 }, () => [
          ee("label", {
            class: D(d.value),
            for: r
          }, we(e.label), 3)
        ]) : M("", !0),
        A(g.$slots, "top"),
        (m(), _(j(e.tag), W({ class: l.value }, f.value), {
          default: Y(() => [
            A(g.$slots, "prepend"),
            e.prependIcon || e.icon ? (m(), _(X, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: D(c.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : M("", !0),
            ut(ee("input", W({
              id: r,
              "onUpdate:modelValue": b[0] || (b[0] = (v) => ln(a) ? a.value = v : null),
              name: e.name,
              type: "checkbox",
              ".indeterminate": ve(a) === null,
              class: ["peer", e.inputClass]
            }, k.value), null, 48, ar), [
              [Nn, ve(a)]
            ]),
            ee("div", sr, [
              ee("div", or, [
                ae(X, {
                  name: e.uncheckedIcon,
                  class: D(["n-toggle-display-unchecked", e.uncheckedIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"]),
                ae(X, {
                  name: e.checkedIcon,
                  class: D(["n-toggle-display-checked", e.checkedIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"]),
                ae(X, {
                  name: e.indeterminateIcon,
                  class: D(["n-toggle-display-indeterminate", e.indeterminateIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"])
              ])
            ]),
            A(g.$slots, "default", qe(st($.value))),
            e.inlineLabel && (e.label || g.$slots.label) ? A(g.$slots, "inlineLabel", { key: 1 }, () => [
              ee("label", {
                class: D(d.value),
                for: r
              }, we(e.label), 3)
            ]) : M("", !0),
            e.appendIcon ? (m(), _(X, {
              key: 2,
              name: e.appendIcon,
              class: D(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : M("", !0),
            A(g.$slots, "append"),
            g.$slots.overlay ? (m(), O("div", rr, [
              A(g.$slots, "overlay")
            ])) : M("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        A(g.$slots, "dropdown"),
        A(g.$slots, "bottom"),
        e.message || e.helperText ? (m(), O("div", lr, we(e.message || e.helperText), 1)) : M("", !0)
      ], 2),
      (m(!0), O(ue, null, ge(h.value, (v, S) => (m(), _(j(v), { key: S }))), 128))
    ], 2));
  }
}), ir = ["innerHTML"], cr = {
  key: 0,
  class: "n-tooltip-overlay",
  "aria-hidden": "true"
}, ur = ["innerHTML"], dr = ["innerHTML"], fr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NTooltip",
  props: /* @__PURE__ */ Ie({
    tag: { default: "span" },
    content: { default: "" },
    showDelay: { default: 75 },
    hideDelay: { default: 250 },
    persistent: { type: Boolean, default: !1 },
    hoverTriggerAnchor: {},
    focusTriggerAnchor: {},
    clickTriggerAnchor: {},
    attachParent: {},
    triggerByHover: { type: Boolean, default: !0 },
    triggerByFocus: { type: Boolean, default: !0 },
    triggerByInteraction: { type: Boolean, default: !1 },
    allowClickToHide: { type: Boolean, default: !1 },
    direction: { default: "bottom" },
    position: { default: "" },
    margin: { default: 8 },
    offset: { default: () => [0, 0] },
    autoReposition: { type: Boolean, default: !0 },
    stacked: { type: Boolean, default: !1 },
    overlay: { type: Boolean, default: !1 },
    fit: { type: Boolean, default: !1 },
    role: { default: "tooltip" }
  }, {
    modelValue: { type: Boolean, default: !1 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n, { expose: s }) {
    const t = le(), e = n, a = Se(n, "modelValue"), o = Je("contentRef"), { isReady: r } = Wt("n-tooltips-container"), c = ce(null), l = ce(null), i = p(() => l.value || c.value), u = () => {
      e.attachParent ? l.value = Yt(e.attachParent) : l.value = null;
    }, d = p(() => `${e.direction}${e.position !== "" ? `-${e.position}` : ""}`), f = p(() => ({
      ...e,
      hoverTriggerAnchor: e.triggerByHover ? e.hoverTriggerAnchor : null,
      focusTriggerAnchor: e.triggerByFocus ? e.focusTriggerAnchor : null,
      clickTriggerAnchor: e.triggerByInteraction ? e.clickTriggerAnchor : null
    })), {
      show: k,
      hide: $,
      handleContentHoverFocusIn: y,
      handleContentHoverFocusOut: h,
      compStyles: g,
      placement: b,
      parentWidth: v
    } = fa(f, {
      model: p({
        get: () => a.value,
        set: (E) => {
          a.value = E;
        }
      }),
      contentRef: o,
      attachParentEl: i,
      placement: d
    }), S = p(() => {
      const E = { ...g.value };
      return e.fit && (E.width = `${v.value}px`), E;
    }), B = p(
      () => Q("n-tooltip", `n-tooltip--direction-${b.value}`, t.class)
    ), R = p(() => {
      const {
        tag: E,
        content: I,
        showDelay: x,
        hideDelay: q,
        persistent: V,
        hoverTriggerAnchor: G,
        focusTriggerAnchor: he,
        clickTriggerAnchor: fe,
        attachParent: Z,
        triggerByHover: se,
        triggerByFocus: U,
        triggerByInteraction: N,
        allowClickToHide: ke,
        direction: Ae,
        position: _e,
        margin: Be,
        offset: de,
        autoReposition: pe,
        stacked: ye,
        overlay: Ce,
        fit: te,
        role: Fe,
        ...xe
      } = e, { class: Le, ...ze } = t;
      return {
        style: S.value,
        onMouseenter: y,
        onMouseleave: h,
        onFocusin: y,
        onFocusout: h,
        ...xe,
        ...ze
      };
    });
    return En(() => {
      c.value = Qn(), u();
    }), Me(() => e.attachParent, u), s({ show: k, hide: $, contentRef: o }), (E, I) => e.stacked ? (m(), _(Re, {
      key: 0,
      name: "n-tooltip"
    }, {
      default: Y(() => [
        a.value ? (m(), _(j(e.tag), W({
          key: 0,
          ref_key: "contentRef",
          ref: o,
          class: B.value,
          role: e.role
        }, R.value), {
          default: Y(() => [
            A(E.$slots, "default", {}, () => [
              e.content ? (m(), O("span", {
                key: 0,
                innerHTML: e.content
              }, null, 8, ir)) : M("", !0)
            ])
          ]),
          _: 3
        }, 16, ["class", "role"])) : M("", !0)
      ]),
      _: 3
    })) : ve(r) ? (m(), _(Vt, {
      key: 1,
      to: "#n-tooltips-container"
    }, [
      ae(Re, {
        name: e.overlay ? "n-tooltip-overlay" : "n-tooltip"
      }, {
        default: Y(() => [
          a.value && e.overlay ? (m(), O("div", cr, [
            (m(), _(j(e.tag), W({
              ref_key: "contentRef",
              ref: o,
              class: B.value,
              role: e.role
            }, R.value), {
              default: Y(() => [
                A(E.$slots, "default", {}, () => [
                  e.content ? (m(), O("span", {
                    key: 0,
                    innerHTML: e.content
                  }, null, 8, ur)) : M("", !0)
                ])
              ]),
              _: 3
            }, 16, ["class", "role"]))
          ])) : a.value ? (m(), _(j(e.tag), W({
            key: 1,
            ref_key: "contentRef",
            ref: o,
            class: B.value,
            role: e.role
          }, R.value), {
            default: Y(() => [
              A(E.$slots, "default", {}, () => [
                e.content ? (m(), O("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, dr)) : M("", !0)
              ])
            ]),
            _: 3
          }, 16, ["class", "role"])) : M("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ])) : M("", !0);
  }
}), Pr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NHeader",
  props: {
    tag: { default: "header" }
  },
  setup(n) {
    const s = le(), t = n, e = p(() => Q("n-header", s.class)), a = p(() => {
      const { class: o, ...r } = s;
      return r;
    });
    return (o, r) => (m(), _(j(t.tag), W({ class: e.value }, a.value), {
      default: Y(() => [
        A(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Vr = /* @__PURE__ */ re({
  inheritAttrs: !1,
  __name: "NFooter",
  props: {
    tag: { default: "footer" }
  },
  setup(n) {
    const s = le(), t = n, e = p(() => Q("n-footer", s.class)), a = p(() => {
      const { class: o, ...r } = s;
      return r;
    });
    return (o, r) => (m(), _(j(t.tag), W({ class: e.value }, a.value), {
      default: Y(() => [
        A(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), pr = () => {
  const n = "n-tooltips-container";
  if (!document.getElementById(n)) {
    const s = document.createElement("div");
    s.id = n, document.body.appendChild(s);
  }
}, ma = (n, s) => {
  const t = s.value;
  if (!t)
    return;
  pr();
  const a = Object.keys(s.modifiers).find((l) => ["top", "bottom", "left", "right"].includes(l)) || "bottom", r = ae(fr, {
    content: t,
    direction: a,
    attachParent: n,
    hoverTriggerAnchor: n,
    focusTriggerAnchor: n
  }), c = document.createElement("div");
  document.body.appendChild(c), at(r, c), n._tooltip = {
    vnode: r,
    container: c
  };
}, va = (n) => {
  n._tooltip && (at(null, n._tooltip.container), n._tooltip.container.remove(), delete n._tooltip);
}, mr = (n, s) => {
  if (n._tooltip && n._tooltip.vnode.component) {
    const { props: t } = n._tooltip.vnode.component;
    t.content = s.value;
    const e = Object.keys(s.modifiers);
    t.direction = e.find((a) => ["top", "bottom", "left", "right"].includes(a)) || "bottom";
  } else
    va(n), ma(n, s);
}, Yr = {
  mounted(n, s) {
    ma(n, s);
  },
  updated(n, s) {
    mr(n, s);
  },
  unmounted(n) {
    va(n);
  }
};
export {
  wr as NAvatar,
  ta as NBanner,
  on as NButton,
  Ir as NCalendar,
  yo as NCard,
  xr as NCheckbox,
  Io as NChip,
  Sr as NDrawer,
  Vr as NFooter,
  Ar as NForm,
  Pr as NHeader,
  X as NIcon,
  _r as NImage,
  Or as NInputCombo,
  dn as NInputField,
  Br as NInputSelect,
  Rr as NInputText,
  qo as NList,
  ct as NListItem,
  xt as NLoading,
  Tt as NMenu,
  da as NModal,
  Go as NPopover,
  Nr as NRadio,
  Fr as NTab,
  Lr as NTabs,
  Po as NToast,
  Er as NToggle,
  fr as NTooltip,
  kt as checkDateInList,
  Q as cn,
  uo as generateCalendarDays,
  Yt as getElement,
  $r as getMonthFromYearWeek,
  Qn as getParentElement,
  Ts as getVNodeName,
  co as getVisibleSegments,
  io as getYearWeekFromMonth,
  Ds as isVNodeClassContain,
  Rt as isVNodeNameContain,
  Cr as isVNodeTagContain,
  tt as normalizeDateRanges,
  fo as removeMatchingRange,
  Xe as resolveClassProp,
  ua as useComponentStack,
  Mr as useDialog,
  fa as useFloating,
  ca as useFocusable,
  pa as useMenuTransform,
  Tr as useModal,
  Dr as useNotify,
  ea as usePausableTimer,
  Wt as useTeleportContainer,
  Yr as vTooltip,
  Tn as validateRange,
  De as wrapTextNode
};
