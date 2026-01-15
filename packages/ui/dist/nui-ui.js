import { defineComponent as Q, useAttrs as se, getCurrentInstance as ct, computed as f, createBlock as S, openBlock as v, resolveDynamicComponent as H, mergeProps as Y, withKeys as Ze, withModifiers as Ee, withCtx as R, renderSlot as $, createElementBlock as B, createCommentVNode as A, normalizeClass as T, createTextVNode as gt, toDisplayString as ie, h as j, Text as rn, Comment as un, isVNode as Vt, ref as te, getCurrentScope as xn, onScopeDispose as Ln, unref as fe, createVNode as X, normalizeProps as Ye, guardReactiveProps as Ke, useSlots as $e, Transition as Se, Fragment as ne, renderList as le, mergeModels as me, useModel as he, watch as ge, createElementVNode as K, normalizeStyle as It, toRefs as Rn, nextTick as ye, withDirectives as qe, isRef as Yt, vModelCheckbox as cn, shallowRef as qt, toValue as Te, useTemplateRef as We, vModelDynamic as dn, provide as En, onUnmounted as fn, Teleport as St, render as je, onMounted as pn, inject as Vn, createSlots as wt, vModelSelect as Pn, vModelRadio as Hn } from "vue";
import { generatePseudoRandomKey as _e, delay as Qt, toClassName as Yn } from "@nui/helpers";
import { vOnClickOutside as Wn } from "@vueuse/components";
import { toArray as zn, unrefElement as Un, tryOnScopeDispose as jn, useEventListener as rt, useIntersectionObserver as Kn, useTimeoutFn as en, useElementSize as Gn, useDebounceFn as vn } from "@vueuse/core";
import { createFocusTrap as Zn } from "focus-trap";
import { useFloating as Xn, autoUpdate as Jn, offset as tn, flip as qn, shift as Qn } from "@floating-ui/vue";
const z = /* @__PURE__ */ Q({
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
  setup(o) {
    const s = se(), t = ct(), e = o, n = f(() => !e.disabled && (e.to || e.href || !!s.onClick)), a = f(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), l = f(() => {
      const u = e.name || "mdi-account";
      return u.startsWith("mdi-") ? ["mdi", u] : ["mdi", `mdi-${u}`];
    }), c = f(() => [
      "n-icon",
      n.value ? "n-icon--clickable" : "",
      e.disabled ? "n-icon--disabled" : "",
      ...l.value
    ]), r = f(() => {
      const u = { ...s };
      return a.value === "RouterLink" ? (u.to = e.to, u.target = e.target) : a.value === "a" && (u.href = e.href, u.target = e.target), u;
    });
    function i(u) {
      if (e.disabled) {
        u.preventDefault(), u.stopPropagation();
        return;
      }
      n.value && t?.emit("click", u);
    }
    return (u, d) => (v(), S(H(a.value), Y({
      class: c.value,
      role: n.value ? "button" : "img",
      tabindex: n.value ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, r.value, {
      onKeydown: Ze(Ee(i, ["prevent"]), ["enter", "space"])
    }), {
      default: R(() => [
        $(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
}), ea = ["aria-hidden"], ta = {
  key: 2,
  class: "n-avatar-sizer",
  "aria-hidden": "true"
}, na = ["src", "alt"], Ks = /* @__PURE__ */ Q({
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
  setup(o, { emit: s }) {
    const t = se(), e = o, n = s, a = f(() => !e.disabled && (e.to || e.href || !!t.onClick)), l = f(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), c = f(() => ["n-avatar", a.value ? "n-avatar--clickable" : "", e.disabled ? "n-avatar--disabled" : ""]), r = f(() => {
      const u = { ...t };
      return l.value === "RouterLink" ? (u.to = e.to, u.target = e.target) : l.value === "a" && (u.href = e.href, u.target = e.target), u;
    });
    function i(u) {
      if (e.disabled) {
        u.preventDefault(), u.stopPropagation();
        return;
      }
      a.value && n("click", u);
    }
    return (u, d) => (v(), S(H(l.value), Y({
      class: c.value,
      role: a.value && l.value === "span" ? "button" : void 0,
      tabindex: a.value && l.value === "span" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, r.value, {
      onClick: i,
      onKeydown: Ze(Ee(i, ["prevent"]), ["enter", "space"])
    }), {
      default: R(() => [
        e.icon ? (v(), S(z, {
          key: 0,
          name: e.icon,
          class: T({ "opacity-0": e.src }),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : e.label || u.$slots.default ? (v(), B("span", {
          key: 1,
          class: T(["n-avatar-label", { "opacity-0": e.src }]),
          "aria-hidden": e.src ? "true" : void 0
        }, [
          $(u.$slots, "default", {}, () => [
            gt(ie(e.label), 1)
          ])
        ], 10, ea)) : (v(), B("span", ta, " ")),
        e.src ? (v(), B("img", {
          key: 3,
          src: e.src,
          alt: e.alt || e.label || "",
          class: "n-avatar-image"
        }, null, 8, na)) : A("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
}), _t = (o, s) => {
  if (typeof document > "u") return null;
  const t = document;
  return typeof o == "string" ? t.querySelector(o) : o;
}, mn = (o = null) => {
  if (o)
    return _t(o)?.parentElement || null;
  const s = ct();
  return s ? s.proxy?.$el?.parentElement || null : (console.warn("getParentElement() without a selector can only be used inside setup() or lifecycle hooks."), null);
}, aa = (o) => {
  if (Vt(o) && o.type) {
    if (typeof o.type == "string")
      return o.type;
    if (typeof o.type == "object" && o.type !== null) {
      const s = o.type;
      return s.name || s.__name || s.__name__ || "";
    }
  }
  return "";
}, kt = (o, s) => {
  const t = aa(o);
  return t ? (Array.isArray(s) ? s : [s]).includes(t) : !1;
}, sa = (o, s) => {
  if (!o.props || typeof o.props.class != "string")
    return !1;
  const t = o.props.class.split(/\s+/);
  return (Array.isArray(s) ? s : [s]).some((n) => t.includes(n));
};
function we(o, s = "span", t = {}) {
  return o ? (Array.isArray(o) ? o : [o]).map((n) => {
    if (typeof n == "string")
      return j(s, t, n);
    if ((n.type === rn || n.type === un) && (n?.shapeFlag & 8) > 0) {
      const a = n.children;
      if (a?.trim())
        return j(s, t, a);
    }
    return n;
  }) : [];
}
function de(...o) {
  const s = [];
  return o.forEach((t) => {
    t && (typeof t == "string" ? s.push(t) : Array.isArray(t) ? s.push(...t) : typeof t == "object" && s.push(t));
  }), s;
}
function hn(o, s, t = {}) {
  const { immediate: e = !1 } = t, n = te(!1), a = te(!1);
  let l = null, c = 0, r = 0;
  const i = () => {
    n.value = !1, a.value = !1, r = 0, l && (clearTimeout(l), l = null);
  }, u = () => {
    i();
    const g = fe(s);
    g <= 0 || (n.value = !0, a.value = !1, r = g, c = Date.now(), l = setTimeout(() => {
      n.value = !1, o();
    }, r));
  }, d = () => {
    if (!n.value || a.value || !l) return;
    a.value = !0, clearTimeout(l), l = null;
    const g = Date.now() - c;
    r -= g;
  }, p = () => {
    !n.value || !a.value || (a.value = !1, c = Date.now(), l = setTimeout(() => {
      n.value = !1, o();
    }, r));
  };
  return xn() && Ln(i), e && u(), {
    start: u,
    stop: i,
    pause: d,
    resume: p,
    isPending: n,
    isPaused: a
  };
}
const la = {
  key: 0,
  class: "n-loading-overlay"
}, dt = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NLoading",
  props: {
    name: {},
    class: {},
    overlay: { type: Boolean }
  },
  setup(o) {
    const s = se(), t = o, e = f(() => ({
      name: t.name || "loading",
      class: t.class || "animate-spin",
      ...s
    }));
    return (n, a) => t.overlay ? (v(), B("span", la, [
      X(z, Ye(Ke(e.value)), null, 16)
    ])) : (v(), S(z, Ye(Y({ key: 1 }, e.value)), null, 16));
  }
}), oa = { key: 1 }, Pt = /* @__PURE__ */ Q({
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
  setup(o) {
    const s = $e(), t = se(), e = o, n = f(() => ["n-button", e.loading ? "n-button--loading" : ""]), a = f(() => e.to ? "RouterLink" : e.href ? "a" : e.tag), l = f(() => {
      const r = { ...t };
      return a.value === "RouterLink" ? (r.to = e.to, r.target = e.target) : a.value === "a" && (r.href = e.href, r.target = e.target), r;
    }), c = f(() => we(s.default?.() ?? [], "span"));
    return (r, i) => (v(), S(H(a.value), Y({
      class: n.value,
      type: e.type,
      disabled: fe(t).disabled || e.loading,
      "aria-disabled": fe(t).disabled || e.loading ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, l.value), {
      default: R(() => [
        $(r.$slots, "loading", {}, () => [
          X(Se, { name: "n-loading-overlay" }, {
            default: R(() => [
              e.loading ? (v(), S(dt, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: T(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : A("", !0)
            ]),
            _: 1
          })
        ]),
        $(r.$slots, "prepend"),
        e.prependIcon || e.icon ? (v(), S(z, {
          key: 0,
          name: e.prependIcon || e.icon,
          class: T([
            ...e.iconClass ? ["string", "object"].includes(typeof e.iconClass) ? [e.iconClass] : e.iconClass : [],
            ...e.prependIconClass ? ["string", "object"].includes(typeof e.prependIconClass) ? [e.prependIconClass] : e.prependIconClass : []
          ]),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : A("", !0),
        e.label ? (v(), B("span", oa, ie(e.label), 1)) : A("", !0),
        (v(!0), B(ne, null, le(c.value, (u, d) => (v(), S(H(u), { key: d }))), 128)),
        e.appendIcon ? (v(), S(z, {
          key: 2,
          name: e.appendIcon,
          class: T(e.appendIconClass),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : A("", !0),
        $(r.$slots, "append")
      ]),
      _: 3
    }, 16, ["class", "type", "disabled", "aria-disabled", "aria-busy"]));
  }
}), ra = ["innerHTML"], ia = {
  class: "n-banner-progress",
  "aria-hidden": "true"
}, gn = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NBanner",
  props: /* @__PURE__ */ me({
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
  emits: /* @__PURE__ */ me(["timer-begin", "timer-end", "timer-pause", "timer-resume"], ["update:modelValue"]),
  setup(o, { emit: s }) {
    const t = s, e = $e(), n = se(), a = o, l = he(o, "modelValue"), c = hn(
      () => {
        t("timer-end");
      },
      f(() => a.duration),
      { immediate: !1 }
    ), r = () => {
      a.duration > 0 && !c.isPaused.value && (c.pause(), t("timer-pause"));
    }, i = () => {
      a.duration > 0 && c.isPaused.value && (c.resume(), t("timer-resume"));
    };
    ge(
      l,
      (w) => {
        w && a.duration > 0 ? (c.start(), t("timer-begin")) : c.stop();
      },
      { immediate: !0 }
    );
    const u = f(() => ["n-banner", a.inlineActions ? "n-banner--inline" : ""]), d = f(() => ({ ...n })), p = f(() => ({
      "--n-banner-duration": `${a.duration}ms`
    })), g = f(() => we(e.default?.() ?? [], "div"));
    return (w, k) => l.value ? (v(), S(H(a.tag), Y({
      key: 0,
      class: u.value,
      style: p.value
    }, d.value, {
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "true",
      onMouseenter: r,
      onMouseleave: i,
      onFocusin: r,
      onFocusout: i
    }), {
      default: R(() => [
        K("div", {
          class: T(["n-banner-label", a.labelClass])
        }, [
          $(w.$slots, "icon", {}, () => [
            a.icon ? (v(), S(z, {
              key: 0,
              name: a.icon,
              class: T(a.iconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : A("", !0)
          ]),
          a.label ? (v(), B("span", {
            key: 0,
            innerHTML: a.label
          }, null, 8, ra)) : A("", !0),
          (v(!0), B(ne, null, le(g.value, (C, h) => (v(), S(H(C), { key: h }))), 128))
        ], 2),
        w.$slots.actions || a.actions ? (v(), B("div", {
          key: 0,
          class: T(["n-banner-actions", a.actionsClass])
        }, [
          $(w.$slots, "actions", {}, () => [
            (v(!0), B(ne, null, le(a.actions, (C, h) => (v(), S(Pt, Y({
              key: h,
              ref_for: !0
            }, C), null, 16))), 128))
          ])
        ], 2)) : A("", !0),
        a.showProgress && a.duration > 0 ? $(w.$slots, "progress", { key: 1 }, () => [
          K("div", ia, [
            K("div", {
              class: "n-banner-progress-bar",
              style: It({ animationPlayState: fe(c).isPaused.value ? "paused" : "running" })
            }, null, 4)
          ])
        ]) : A("", !0)
      ]),
      _: 3
    }, 16, ["class", "style"])) : A("", !0);
  }
});
var yn = 60, bn = yn * 60, kn = bn * 24, ua = kn * 7, ut = 1e3, Et = yn * ut, nn = bn * ut, ca = kn * ut, da = ua * ut, Dt = "millisecond", nt = "second", at = "minute", st = "hour", Be = "day", Ue = "week", xe = "month", Cn = "quarter", Oe = "year", lt = "date", wn = "YYYY-MM-DDTHH:mm:ssZ", an = "Invalid Date", fa = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, pa = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const va = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  ordinal: function(s) {
    var t = ["th", "st", "nd", "rd"], e = s % 100;
    return "[" + s + (t[(e - 20) % 10] || t[e] || t[0]) + "]";
  }
};
var Ht = function(s, t, e) {
  var n = String(s);
  return !n || n.length >= t ? s : "" + Array(t + 1 - n.length).join(e) + s;
}, ma = function(s) {
  var t = -s.utcOffset(), e = Math.abs(t), n = Math.floor(e / 60), a = e % 60;
  return (t <= 0 ? "+" : "-") + Ht(n, 2, "0") + ":" + Ht(a, 2, "0");
}, ha = function o(s, t) {
  if (s.date() < t.date()) return -o(t, s);
  var e = (t.year() - s.year()) * 12 + (t.month() - s.month()), n = s.clone().add(e, xe), a = t - n < 0, l = s.clone().add(e + (a ? -1 : 1), xe);
  return +(-(e + (t - n) / (a ? n - l : l - n)) || 0);
}, ga = function(s) {
  return s < 0 ? Math.ceil(s) || 0 : Math.floor(s);
}, ya = function(s) {
  var t = {
    M: xe,
    y: Oe,
    w: Ue,
    d: Be,
    D: lt,
    h: st,
    m: at,
    s: nt,
    ms: Dt,
    Q: Cn
  };
  return t[s] || String(s || "").toLowerCase().replace(/s$/, "");
}, ba = function(s) {
  return s === void 0;
};
const ka = {
  s: Ht,
  z: ma,
  m: ha,
  a: ga,
  p: ya,
  u: ba
};
var mt = "en", Xe = {};
Xe[mt] = va;
var $n = "$isDayjsObject", Wt = function(s) {
  return s instanceof At || !!(s && s[$n]);
}, $t = function o(s, t, e) {
  var n;
  if (!s) return mt;
  if (typeof s == "string") {
    var a = s.toLowerCase();
    Xe[a] && (n = a), t && (Xe[a] = t, n = a);
    var l = s.split("-");
    if (!n && l.length > 1)
      return o(l[0]);
  } else {
    var c = s.name;
    Xe[c] = s, n = c;
  }
  return !e && n && (mt = n), n || !e && mt;
}, x = function(s, t) {
  if (Wt(s))
    return s.clone();
  var e = typeof t == "object" ? t : {};
  return e.date = s, e.args = arguments, new At(e);
}, Ca = function(s, t) {
  return x(s, {
    locale: t.$L,
    utc: t.$u,
    x: t.$x,
    $offset: t.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, ee = ka;
ee.l = $t;
ee.i = Wt;
ee.w = Ca;
var wa = function(s) {
  var t = s.date, e = s.utc;
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  if (ee.u(t)) return /* @__PURE__ */ new Date();
  if (t instanceof Date) return new Date(t);
  if (typeof t == "string" && !/Z$/i.test(t)) {
    var n = t.match(fa);
    if (n) {
      var a = n[2] - 1 || 0, l = (n[7] || "0").substring(0, 3);
      return e ? new Date(Date.UTC(n[1], a, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, l)) : new Date(n[1], a, n[3] || 1, n[4] || 0, n[5] || 0, n[6] || 0, l);
    }
  }
  return new Date(t);
}, At = /* @__PURE__ */ (function() {
  function o(t) {
    this.$L = $t(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[$n] = !0;
  }
  var s = o.prototype;
  return s.parse = function(e) {
    this.$d = wa(e), this.init();
  }, s.init = function() {
    var e = this.$d;
    this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
  }, s.$utils = function() {
    return ee;
  }, s.isValid = function() {
    return this.$d.toString() !== an;
  }, s.isSame = function(e, n) {
    var a = x(e);
    return this.startOf(n) <= a && a <= this.endOf(n);
  }, s.isAfter = function(e, n) {
    return x(e) < this.startOf(n);
  }, s.isBefore = function(e, n) {
    return this.endOf(n) < x(e);
  }, s.$g = function(e, n, a) {
    return ee.u(e) ? this[n] : this.set(a, e);
  }, s.unix = function() {
    return Math.floor(this.valueOf() / 1e3);
  }, s.valueOf = function() {
    return this.$d.getTime();
  }, s.startOf = function(e, n) {
    var a = this, l = ee.u(n) ? !0 : n, c = ee.p(e), r = function(h, y) {
      var m = ee.w(a.$u ? Date.UTC(a.$y, y, h) : new Date(a.$y, y, h), a);
      return l ? m : m.endOf(Be);
    }, i = function(h, y) {
      var m = [0, 0, 0, 0], _ = [23, 59, 59, 999];
      return ee.w(a.toDate()[h].apply(
        // eslint-disable-line prefer-spread
        a.toDate("s"),
        (l ? m : _).slice(y)
      ), a);
    }, u = this.$W, d = this.$M, p = this.$D, g = "set" + (this.$u ? "UTC" : "");
    switch (c) {
      case Oe:
        return l ? r(1, 0) : r(31, 11);
      case xe:
        return l ? r(1, d) : r(0, d + 1);
      case Ue: {
        var w = this.$locale().weekStart || 0, k = (u < w ? u + 7 : u) - w;
        return r(l ? p - k : p + (6 - k), d);
      }
      case Be:
      case lt:
        return i(g + "Hours", 0);
      case st:
        return i(g + "Minutes", 1);
      case at:
        return i(g + "Seconds", 2);
      case nt:
        return i(g + "Milliseconds", 3);
      default:
        return this.clone();
    }
  }, s.endOf = function(e) {
    return this.startOf(e, !1);
  }, s.$set = function(e, n) {
    var a, l = ee.p(e), c = "set" + (this.$u ? "UTC" : ""), r = (a = {}, a[Be] = c + "Date", a[lt] = c + "Date", a[xe] = c + "Month", a[Oe] = c + "FullYear", a[st] = c + "Hours", a[at] = c + "Minutes", a[nt] = c + "Seconds", a[Dt] = c + "Milliseconds", a)[l], i = l === Be ? this.$D + (n - this.$W) : n;
    if (l === xe || l === Oe) {
      var u = this.clone().set(lt, 1);
      u.$d[r](i), u.init(), this.$d = u.set(lt, Math.min(this.$D, u.daysInMonth())).$d;
    } else r && this.$d[r](i);
    return this.init(), this;
  }, s.set = function(e, n) {
    return this.clone().$set(e, n);
  }, s.get = function(e) {
    return this[ee.p(e)]();
  }, s.add = function(e, n) {
    var a = this, l;
    e = Number(e);
    var c = ee.p(n), r = function(p) {
      var g = x(a);
      return ee.w(g.date(g.date() + Math.round(p * e)), a);
    };
    if (c === xe)
      return this.set(xe, this.$M + e);
    if (c === Oe)
      return this.set(Oe, this.$y + e);
    if (c === Be)
      return r(1);
    if (c === Ue)
      return r(7);
    var i = (l = {}, l[at] = Et, l[st] = nn, l[nt] = ut, l)[c] || 1, u = this.$d.getTime() + e * i;
    return ee.w(u, this);
  }, s.subtract = function(e, n) {
    return this.add(e * -1, n);
  }, s.format = function(e) {
    var n = this, a = this.$locale();
    if (!this.isValid()) return a.invalidDate || an;
    var l = e || wn, c = ee.z(this), r = this.$H, i = this.$m, u = this.$M, d = a.weekdays, p = a.months, g = a.meridiem, w = function(m, _, O, N) {
      return m && (m[_] || m(n, l)) || O[_].slice(0, N);
    }, k = function(m) {
      return ee.s(r % 12 || 12, m, "0");
    }, C = g || function(y, m, _) {
      var O = y < 12 ? "AM" : "PM";
      return _ ? O.toLowerCase() : O;
    }, h = function(m) {
      switch (m) {
        case "YY":
          return String(n.$y).slice(-2);
        case "YYYY":
          return ee.s(n.$y, 4, "0");
        case "M":
          return u + 1;
        case "MM":
          return ee.s(u + 1, 2, "0");
        case "MMM":
          return w(a.monthsShort, u, p, 3);
        case "MMMM":
          return w(p, u);
        case "D":
          return n.$D;
        case "DD":
          return ee.s(n.$D, 2, "0");
        case "d":
          return String(n.$W);
        case "dd":
          return w(a.weekdaysMin, n.$W, d, 2);
        case "ddd":
          return w(a.weekdaysShort, n.$W, d, 3);
        case "dddd":
          return d[n.$W];
        case "H":
          return String(r);
        case "HH":
          return ee.s(r, 2, "0");
        case "h":
          return k(1);
        case "hh":
          return k(2);
        case "a":
          return C(r, i, !0);
        case "A":
          return C(r, i, !1);
        case "m":
          return String(i);
        case "mm":
          return ee.s(i, 2, "0");
        case "s":
          return String(n.$s);
        case "ss":
          return ee.s(n.$s, 2, "0");
        case "SSS":
          return ee.s(n.$ms, 3, "0");
        case "Z":
          return c;
      }
      return null;
    };
    return l.replace(pa, function(y, m) {
      return m || h(y) || c.replace(":", "");
    });
  }, s.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, s.diff = function(e, n, a) {
    var l = this, c = ee.p(n), r = x(e), i = (r.utcOffset() - this.utcOffset()) * Et, u = this - r, d = function() {
      return ee.m(l, r);
    }, p;
    switch (c) {
      case Oe:
        p = d() / 12;
        break;
      case xe:
        p = d();
        break;
      case Cn:
        p = d() / 3;
        break;
      case Ue:
        p = (u - i) / da;
        break;
      case Be:
        p = (u - i) / ca;
        break;
      case st:
        p = u / nn;
        break;
      case at:
        p = u / Et;
        break;
      case nt:
        p = u / ut;
        break;
      default:
        p = u;
        break;
    }
    return a ? p : ee.a(p);
  }, s.daysInMonth = function() {
    return this.endOf(xe).$D;
  }, s.$locale = function() {
    return Xe[this.$L];
  }, s.locale = function(e, n) {
    if (!e) return this.$L;
    var a = this.clone(), l = $t(e, n, !0);
    return l && (a.$L = l), a;
  }, s.clone = function() {
    return ee.w(this.$d, this);
  }, s.toDate = function() {
    return new Date(this.valueOf());
  }, s.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  }, s.toISOString = function() {
    return this.$d.toISOString();
  }, s.toString = function() {
    return this.$d.toUTCString();
  }, o;
})(), In = At.prototype;
x.prototype = In;
[["$ms", Dt], ["$s", nt], ["$m", at], ["$H", st], ["$W", Be], ["$M", xe], ["$y", Oe], ["$D", lt]].forEach(function(o) {
  In[o[1]] = function(s) {
    return this.$g(s, o[0], o[1]);
  };
});
x.extend = function(o, s) {
  return o.$i || (o(s, At, x), o.$i = !0), x;
};
x.locale = $t;
x.isDayjs = Wt;
x.unix = function(o) {
  return x(o * 1e3);
};
x.en = Xe[mt];
x.Ls = Xe;
x.p = {};
const $a = (function(o, s) {
  var t = s.prototype, e = t.format;
  t.format = function(n) {
    var a = this, l = this.$locale();
    if (!this.isValid())
      return e.bind(this)(n);
    var c = this.$utils(), r = n || wn, i = r.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(u) {
      switch (u) {
        case "Q":
          return Math.ceil((a.$M + 1) / 3);
        case "Do":
          return l.ordinal(a.$D);
        case "gggg":
          return a.weekYear();
        case "GGGG":
          return a.isoWeekYear();
        case "wo":
          return l.ordinal(a.week(), "W");
        // W for week
        case "w":
        case "ww":
          return c.s(a.week(), u === "w" ? 1 : 2, "0");
        case "W":
        case "WW":
          return c.s(a.isoWeek(), u === "W" ? 1 : 2, "0");
        case "k":
        case "kk":
          return c.s(String(a.$H === 0 ? 24 : a.$H), u === "k" ? 1 : 2, "0");
        case "X":
          return Math.floor(a.$d.getTime() / 1e3);
        case "x":
          return a.$d.getTime();
        case "z":
          return "[" + a.offsetName() + "]";
        case "zzz":
          return "[" + a.offsetName("long") + "]";
        default:
          return u;
      }
    });
    return e.bind(this)(i);
  };
});
var Ia = "isoweek";
const Sa = (function(o, s, t) {
  var e = function(r, i) {
    var u = (i ? t.utc : t)().year(r).startOf(Oe), d = 4 - u.isoWeekday();
    return u.isoWeekday() > 4 && (d += 7), u.add(d, Be);
  }, n = function(r) {
    return r.add(4 - r.isoWeekday(), Be);
  }, a = s.prototype;
  a.isoWeekYear = function() {
    var c = n(this);
    return c.year();
  }, a.isoWeek = function(c) {
    if (!this.$utils().u(c))
      return this.add((c - this.isoWeek()) * 7, Be);
    var r = n(this), i = e(this.isoWeekYear(), this.$u);
    return r.diff(i, Ue) + 1;
  }, a.isoWeekday = function(c) {
    return this.$utils().u(c) ? this.day() || 7 : this.day(this.day() % 7 ? c : c - 7);
  };
  var l = a.startOf;
  a.startOf = function(c, r) {
    var i = this.$utils(), u = i.u(r) ? !0 : r, d = i.p(c);
    return d === Ia ? u ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : l.bind(this)(c, r);
  };
}), _a = (function(o, s) {
  s.prototype.isSameOrAfter = function(t, e) {
    return this.isSame(t, e) || this.isAfter(t, e);
  };
}), Da = (function(o, s) {
  s.prototype.isSameOrBefore = function(t, e) {
    return this.isSame(t, e) || this.isBefore(t, e);
  };
});
var Aa = function(s) {
  return s.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(t, e, n) {
    return e || n.slice(1);
  });
};
const Ma = (function(o, s, t) {
  var e = s.prototype, n = function(u) {
    return u && (u.indexOf ? u : u.s);
  }, a = function(u, d, p, g, w) {
    var k = u.name ? u : u.$locale(), C = n(k[d]), h = n(k[p]), y = C || h.map(function(_) {
      return _.slice(0, g);
    });
    if (!w) return y;
    var m = k.weekStart;
    return y.map(function(_, O) {
      return y[(O + (m || 0)) % 7];
    });
  }, l = function() {
    return t.Ls[t.locale()];
  }, c = function(u, d) {
    return u.formats[d] || Aa(u.formats[d.toUpperCase()]);
  }, r = function() {
    var u = this;
    return {
      months: function(p) {
        return p ? p.format("MMMM") : a(u, "months");
      },
      monthsShort: function(p) {
        return p ? p.format("MMM") : a(u, "monthsShort", "months", 3);
      },
      firstDayOfWeek: function() {
        return u.$locale().weekStart || 0;
      },
      weekdays: function(p) {
        return p ? p.format("dddd") : a(u, "weekdays");
      },
      weekdaysMin: function(p) {
        return p ? p.format("dd") : a(u, "weekdaysMin", "weekdays", 2);
      },
      weekdaysShort: function(p) {
        return p ? p.format("ddd") : a(u, "weekdaysShort", "weekdays", 3);
      },
      longDateFormat: function(p) {
        return c(u.$locale(), p);
      },
      meridiem: this.$locale().meridiem,
      ordinal: this.$locale().ordinal
    };
  };
  e.localeData = function() {
    return r.bind(this)();
  }, t.localeData = function() {
    var i = l();
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
    return a(l(), "months");
  }, t.monthsShort = function() {
    return a(l(), "monthsShort", "months", 3);
  }, t.weekdays = function(i) {
    return a(l(), "weekdays", null, null, i);
  }, t.weekdaysShort = function(i) {
    return a(l(), "weekdaysShort", "weekdays", 3, i);
  }, t.weekdaysMin = function(i) {
    return a(l(), "weekdaysMin", "weekdays", 2, i);
  };
}), Ta = (function(o, s, t) {
  t.updateLocale = function(e, n) {
    var a = t.Ls, l = a[e];
    if (l) {
      var c = n ? Object.keys(n) : [];
      return c.forEach(function(r) {
        l[r] = n[r];
      }), l;
    }
  };
}), Ba = (function(o, s) {
  var t = s.prototype;
  t.weekday = function(e) {
    var n = this.$locale().weekStart || 0, a = this.$W, l = (a < n ? a + 7 : a) - n;
    return this.$utils().u(e) ? l : this.subtract(l, "day").add(e, "day");
  };
}), Oa = (function(o, s, t) {
  var e = s.prototype;
  e.week = function(n) {
    if (n === void 0 && (n = null), n !== null)
      return this.add((n - this.week()) * 7, Be);
    var a = this.$locale().yearStart || 1;
    if (this.month() === 11 && this.date() > 25) {
      var l = t(this).startOf(Oe).add(1, Oe).date(a), c = t(this).endOf(Ue);
      if (l.isBefore(c))
        return 1;
    }
    var r = t(this).startOf(Oe).date(a), i = r.startOf(Ue).subtract(1, Dt), u = this.diff(i, Ue, !0);
    return u < 0 ? t(this).startOf("week").week() : Math.ceil(u);
  }, e.weeks = function(n) {
    return n === void 0 && (n = null), this.week(n);
  };
}), Na = (function(o, s) {
  var t = s.prototype;
  t.isLeapYear = function() {
    return this.$y % 4 === 0 && this.$y % 100 !== 0 || this.$y % 400 === 0;
  };
}), Fa = (function(o, s) {
  var t = s.prototype;
  t.isoWeeksInYear = function() {
    var e = this.isLeapYear(), n = this.endOf("y"), a = n.day();
    return a === 4 || e && a === 5 ? 53 : 52;
  };
});
x.extend($a);
x.extend(Sa);
x.extend(_a);
x.extend(Da);
x.extend(Ma);
x.extend(Ta);
x.extend(Ba);
x.extend(Oa);
x.extend(Na);
x.extend(Fa);
function ze(o) {
  if (!o || o.length === 0) return [];
  const s = [];
  for (const n of o) {
    if (!n) continue;
    let a, l;
    if (typeof n == "string" || n instanceof Date)
      a = x(n), l = a;
    else {
      const c = n;
      if (!c.begin && !c.end) continue;
      if (c.begin && !c.end)
        a = x(c.begin), l = a;
      else if (!c.begin && c.end)
        a = x(c.end), l = a;
      else {
        const r = x(c.begin), i = x(c.end);
        r.isBefore(i) ? (a = r, l = i) : (a = i, l = r);
      }
    }
    !a.isValid() || !l.isValid() || s.push({ start: a.startOf("day"), end: l.startOf("day") });
  }
  if (s.length === 0) return [];
  s.sort((n, a) => n.start.diff(a.start));
  const t = [];
  let e = s[0];
  for (let n = 1; n < s.length; n++) {
    const a = s[n], l = e.end.add(1, "day");
    l.isAfter(a.start) || l.isSame(a.start) ? a.end.isAfter(e.end) && (e.end = a.end) : (t.push(e), e = a);
  }
  return t.push(e), t.map((n) => n.start.isSame(n.end, "day") ? n.start.format("YYYY-MM-DD") : {
    begin: n.start.format("YYYY-MM-DD"),
    end: n.end.format("YYYY-MM-DD")
  });
}
function it(o, s) {
  if (!s || s.length === 0) return !1;
  const t = o.format("YYYY-MM-DD");
  for (const e of s)
    if (e)
      if (typeof e == "string" || e instanceof Date) {
        if (x(e).format("YYYY-MM-DD") === t) return !0;
      } else {
        const n = e;
        if (!n.begin && !n.end) continue;
        const a = o;
        let l = !0, c = !0;
        if (n.begin) {
          const r = x(n.begin);
          l = a.isAfter(r, "day") || a.isSame(r, "day");
        }
        if (n.end) {
          const r = x(n.end);
          c = a.isBefore(r, "day") || a.isSame(r, "day");
        }
        if (l && c) return !0;
      }
  return !1;
}
function xa(o, s, t = 0) {
  let e = x(`${o}-${String(s + 1).padStart(2, "0")}-01`);
  return t !== 0 && (e = e.add(t, "week")), {
    year: e.isoWeekYear(),
    week: e.isoWeek()
  };
}
function La(o, s, t) {
  if (!t || t.length === 0)
    return [
      {
        begin: o.format("YYYY-MM-DD"),
        end: s.format("YYYY-MM-DD")
      }
    ];
  const e = [];
  let n = null, a = o.clone();
  const l = s.clone();
  if (a.isAfter(l))
    return [];
  for (; a.isSameOrBefore(l, "day"); )
    it(a, t) ? n || (n = a.clone()) : n && (e.push({
      begin: n.format("YYYY-MM-DD"),
      end: a.subtract(1, "day").format("YYYY-MM-DD")
    }), n = null), a = a.add(1, "day");
  return n && e.push({
    begin: n.format("YYYY-MM-DD"),
    end: l.format("YYYY-MM-DD")
  }), e;
}
function sn(o, s, t) {
  const e = Math.abs(s.diff(o, "day")) + 1;
  if (t.minRange !== void 0 && e < t.minRange || t.maxRange !== void 0 && e > t.maxRange) return !1;
  const [n, a] = o.isBefore(s) ? [o, s] : [s, o];
  let l = n.clone();
  for (; l.isSameOrBefore(a, "day"); ) {
    if (t.disabled && it(l, t.disabled)) return !1;
    l = l.add(1, "day");
  }
  return !0;
}
function Ra(o) {
  const {
    start: s,
    daysCount: t,
    activeMonth: e,
    selected: n,
    disabled: a,
    visible: l,
    isRange: c,
    pendingStart: r,
    pendingEnd: i,
    pendingInvalid: u
  } = o, d = [];
  let p = s.clone();
  const g = x(), w = (m) => it(m, a), k = (m) => !l || it(m, l), C = (m) => !r || !i ? !1 : m.isSameOrAfter(r, "day") && m.isSameOrBefore(i, "day"), h = (m) => it(m, n) ? !0 : c && r && !i ? m.isSame(r, "day") : !1, y = (m) => h(m) || C(m);
  for (let m = 0; m < t; m++) {
    const _ = w(p), O = k(p), N = C(p), V = p.subtract(1, "day"), L = p.add(1, "day"), M = y(p), G = y(V), F = y(L);
    let W = !0;
    e !== void 0 && (e === null ? W = !1 : Array.isArray(e) ? W = e.includes(p.month()) : W = p.month() === e), d.push({
      date: p,
      dateString: p.format("YYYY-MM-DD"),
      dayOfMonth: p.date(),
      ariaLabel: p.format("dddd, MMMM D, YYYY"),
      isCurrentMonth: W,
      isToday: p.isSame(g, "day"),
      isSelected: M,
      isDisabled: _,
      isVisible: O,
      isInvalid: N && !!u,
      isSelecting: N,
      isRangeStart: M && !G && F,
      isRangeEnd: M && !F && G,
      isInRange: M && (G || F)
    }), p = p.add(1, "day");
  }
  return d;
}
function Ea(o, s) {
  if (!o || o.length === 0) return o;
  const t = o.findIndex((n) => {
    if (typeof n == "object" && n !== null && "begin" in n) {
      const a = n;
      return x(a.begin).isSame(s.begin, "day") && x(a.end).isSame(s.end, "day");
    }
    return !1;
  });
  if (t === -1) return o;
  const e = [...o];
  return e.splice(t, 1), e;
}
const Va = ["aria-label"], Pa = ["aria-multiselectable"], Ha = ["aria-label", "aria-selected", "aria-disabled", "tabindex", "onClick", "onMouseenter", "onFocus", "onKeydown"], Ya = { class: "n-calendar-view-day-number" }, Gs = /* @__PURE__ */ Q({
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
    viewingYear: { default: () => x().year() },
    viewingWeek: { default: () => x().week() },
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
  setup(o, { expose: s, emit: t }) {
    const e = o, n = t, {
      modelValue: a,
      viewingYear: l,
      viewingWeek: c,
      firstDayOfWeek: r,
      rows: i,
      weekLabelNames: u,
      weekLabelClass: d,
      multiple: p,
      selectable: g,
      unselectable: w,
      range: k,
      numViews: C,
      maxRange: h,
      minRange: y,
      activeMonth: m,
      disabled: _,
      visible: O,
      viewClass: N,
      containerClass: V,
      weekLabelContainerClass: L,
      gridClass: M,
      gridCellClass: G,
      views: F
    } = Rn(e), W = te(null), pe = te(null), ue = te(x().format("YYYY-MM-DD")), q = /* @__PURE__ */ new Map(), ve = f(() => de("n-calendar-container", V.value)), Z = (E, J) => {
      E ? q.set(J, E) : q.delete(J);
    }, oe = async () => {
      await ye();
      const E = q.get(ue.value);
      E && E.focus();
    };
    ge(ue, oe);
    const be = (E, J) => (J + E) % 7, Ie = f(() => {
      if (!a.value) return [];
      const E = Array.isArray(a.value) ? a.value : [a.value];
      return ze(E);
    }), De = f(() => ze(_.value)), Pe = f(() => O.value ? ze(O.value) : null), Ne = f(() => !k.value || !W.value?.begin || !pe.value ? !1 : !sn(x(W.value.begin), pe.value, {
      minRange: y.value,
      maxRange: h.value,
      disabled: De.value
    })), ke = f(() => {
      const E = [], J = F.value && F.value.length > 0 ? F.value.length : Math.max(1, C.value), b = (() => {
        const ae = l.value ?? x().year(), U = c.value ?? x().week(), re = r.value ?? 1, Me = x().year(ae).isoWeek(U).startOf("isoWeek");
        let Le = 1 - re;
        return Le < 0 && (Le += 7), Me.subtract(Le, "day");
      })(), D = Ne.value;
      let I = null, P = null;
      if (k.value && W.value?.begin && pe.value) {
        const ae = x(W.value.begin), U = pe.value;
        I = ae.isBefore(U) ? ae : U, P = ae.isBefore(U) ? U : ae;
      }
      for (let ae = 0; ae < J; ae++) {
        const U = F.value?.[ae] || {}, re = U.viewingYear ?? l.value ?? x().year(), Me = U.viewingWeek ?? c.value ?? x().week(), Le = U.firstDayOfWeek ?? r.value ?? 1, Ut = U.rows ?? i.value ?? 6, jt = U.activeMonth !== void 0 ? U.activeMonth : m.value, Kt = U.disabled ?? _.value ?? [], Bt = ze(Kt), Ot = U.visible ?? O.value, Nt = Ot ? ze(Ot) : null, Gt = de("n-calendar-view", U.viewClass ?? N.value), Zt = de(
          "n-calendar-view-week-label-container",
          U.weekLabelContainerClass ?? L.value
        ), Ft = de("n-calendar-view-grid", U.gridClass ?? M.value), xt = de(U.gridCellClass ?? G.value), bt = U.weekLabelNames ?? u.value;
        let Lt;
        if (bt?.length === 7) {
          const Re = [...bt];
          let Fe = Le - 1;
          Fe < 0 && (Fe += 7), Lt = Array.from({ length: 7 }, (Jt, Fn) => Re[(Fe + Fn) % 7]);
        } else {
          let Re = x().day(Le);
          Lt = Array.from({ length: 7 }, () => {
            const Fe = Re.format("ddd");
            return Re = Re.add(1, "day"), Fe;
          });
        }
        const Xt = U.weekLabelClass ?? d.value ?? [], On = Array.from({ length: 7 }, (Re, Fe) => {
          const Jt = (Le + Fe) % 7;
          return Array.isArray(Xt) && Xt[Jt] || "";
        });
        let Rt;
        if (F.value && (U.viewingYear !== void 0 || U.viewingWeek !== void 0)) {
          const Re = x().year(re).isoWeek(Me).startOf("isoWeek");
          let Fe = 1 - Le;
          Fe < 0 && (Fe += 7), Rt = Re.subtract(Fe, "day");
        } else {
          const Re = (i.value ?? 6) * 7;
          Rt = b.add(ae * Re, "day");
        }
        const Nn = Ra({
          start: Rt,
          daysCount: Ut * 7,
          activeMonth: jt,
          selected: Ie.value,
          disabled: Bt,
          visible: Nt,
          isRange: k.value,
          pendingStart: I,
          pendingEnd: P,
          pendingInvalid: D,
          minRange: y.value,
          maxRange: h.value,
          hoveredDate: pe.value
        });
        E.push({
          days: Nn,
          viewClasses: Gt,
          weekLabelContainerClasses: Zt,
          gridClasses: Ft,
          extraGridCellClasses: xt,
          weekLabelNames: Lt,
          weekLabelClasses: On,
          firstDayOfWeek: Le,
          disabledList: Bt,
          visibleList: Nt
        });
      }
      return E;
    });
    ge(() => ke.value, oe);
    function Ae(E, J) {
      const b = J !== void 0 ? Number(J) : l.value, { year: D, week: I } = xa(b, E);
      n("update:viewingYear", D), n("update:viewingWeek", I);
    }
    s({
      setMonth: Ae
    });
    function ce(E) {
      pe.value = E;
    }
    function He(E) {
      E.isVisible && (ce(E.date), ue.value = E.dateString);
    }
    function Ce() {
      W.value = null, pe.value = null;
    }
    function Qe(E) {
      E.key === "Escape" && Ce();
    }
    function ft(E) {
      k.value && W.value?.begin && (E.preventDefault(), Ce());
    }
    function yt(E, J) {
      if (!J.isVisible) return;
      const b = E.key;
      if (b === "Enter" || b === " ") {
        E.preventDefault(), et(J);
        return;
      }
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(b)) return;
      E.preventDefault();
      let I = x(J.date).clone();
      b === "ArrowUp" ? I = I.subtract(7, "day") : b === "ArrowDown" ? I = I.add(7, "day") : b === "ArrowLeft" ? I = I.subtract(1, "day") : I = I.add(1, "day"), ue.value = I.format("YYYY-MM-DD");
      const P = ke.value[0].days[0].date, ae = ke.value[ke.value.length - 1], U = ae.days[ae.days.length - 1].date;
      if (I.isBefore(P) || I.isSame(P) || I.isAfter(U) || I.isSame(U)) {
        let re = x(`${l.value}-01-01`).isoWeek(c.value);
        I.isBefore(P) ? re = re.subtract(1, "week") : I.isAfter(U.subtract(1, "day")) && (re = re.add(1, "week")), n("update:viewingYear", re.isoWeekYear()), n("update:viewingWeek", re.isoWeek());
      }
    }
    function et(E, J) {
      if (!g.value || E.isDisabled || !E.isVisible) return;
      const b = E.dateString, D = [...Ie.value];
      k.value ? Tt(E, D, b) : pt(D, b);
    }
    function Tt(E, J, b) {
      if (W.value?.begin) {
        const D = x(W.value.begin), I = E.date, [P, ae] = I.isBefore(D) ? [I, D] : [D, I], U = {
          begin: P.format("YYYY-MM-DD"),
          end: ae.format("YYYY-MM-DD")
        };
        if (w.value) {
          const re = Ea(J, U);
          if (re.length < J.length) {
            p.value ? n("update:modelValue", ze(re)) : n("update:modelValue", null), Ce();
            return;
          }
        }
        if (sn(P, ae, {
          minRange: y.value,
          maxRange: h.value,
          disabled: De.value
        })) {
          const re = La(P, ae, Pe.value);
          if (re.length > 0) {
            p.value ? J.push(...re) : J = re;
            const Me = ze(J);
            !p.value && Me.length === 1 ? n("update:modelValue", Me[0]) : n("update:modelValue", Me);
          }
          Ce();
        } else
          Ce();
      } else
        W.value = { begin: b };
    }
    function pt(E, J) {
      if (p.value) {
        const b = E.findIndex((D) => it(x(J), [D]));
        b > -1 ? w.value && E.splice(b, 1) : E.push(J), n("update:modelValue", ze(E));
      } else
        (E.length > 0 ? x(E[0].begin || E[0]).format("YYYY-MM-DD") : null) === J ? w.value && n("update:modelValue", null) : n("update:modelValue", J);
    }
    return (E, J) => (v(), B("div", {
      class: "n-calendar",
      tabindex: "-1",
      onKeydown: Qe
    }, [
      K("div", {
        class: T(ve.value)
      }, [
        (v(!0), B(ne, null, le(ke.value, (b, D) => (v(), B("div", {
          key: D,
          class: T(b.viewClasses)
        }, [
          $(E.$slots, `calendar-header-${D}`, {
            index: D,
            startDate: b.days[0]?.date,
            endDate: b.days[b.days.length - 1]?.date
          }, () => [
            $(E.$slots, "calendar-header", {
              index: D,
              startDate: b.days[0]?.date,
              endDate: b.days[b.days.length - 1]?.date
            })
          ]),
          $(E.$slots, "week-label-container", { calendarIndex: D }, () => [
            K("div", {
              class: T(b.weekLabelContainerClasses),
              role: "row"
            }, [
              (v(!0), B(ne, null, le(b.weekLabelNames, (I, P) => (v(), B("div", {
                key: I,
                class: T(["n-calendar-view-week-label", b.weekLabelClasses[P]]),
                role: "columnheader",
                "aria-label": I
              }, [
                $(E.$slots, `week-label-${be(P, b.firstDayOfWeek)}`, {
                  day: I,
                  index: P,
                  calendarIndex: D
                }, () => [
                  gt(ie(I), 1)
                ])
              ], 10, Va))), 128))
            ], 2)
          ]),
          K("div", {
            class: T(b.gridClasses),
            role: "grid",
            "aria-multiselectable": fe(p),
            onMouseleave: J[0] || (J[0] = (I) => ce(null))
          }, [
            (v(!0), B(ne, null, le(b.days, (I) => (v(), B("div", {
              key: I.dateString,
              ref_for: !0,
              ref: (P) => Z(P, I.dateString),
              class: T([
                "n-calendar-view-grid-cell",
                ...b.extraGridCellClasses,
                {
                  "n-calendar-view-grid-cell--outside": !I.isCurrentMonth,
                  "n-calendar-view-grid-cell--today": I.isToday,
                  "n-calendar-view-grid-cell--selected": I.isSelected,
                  "n-calendar-view-grid-cell--disabled": I.isDisabled,
                  "n-calendar-view-grid-cell--invalid": I.isInvalid,
                  "n-calendar-view-grid-cell--selecting": I.isSelecting,
                  "n-calendar-view-grid-cell--range-start": I.isRangeStart,
                  "n-calendar-view-grid-cell--range-end": I.isRangeEnd,
                  "n-calendar-view-grid-cell--in-range": I.isInRange,
                  "invisible pointer-events-none": !I.isVisible
                }
              ]),
              role: "gridcell",
              "aria-label": I.ariaLabel,
              "aria-selected": I.isSelected,
              "aria-disabled": I.isDisabled,
              tabindex: I.dateString === ue.value && I.isVisible ? 0 : -1,
              onClick: (P) => et(I),
              onMouseenter: (P) => ce(I.date),
              onFocus: (P) => He(I),
              onContextmenu: ft,
              onKeydown: (P) => yt(P, I)
            }, [
              I.isVisible ? $(E.$slots, "cell", {
                key: 0,
                day: I,
                calendarIndex: D
              }, () => [
                K("span", Ya, ie(I.dayOfMonth), 1)
              ]) : A("", !0)
            ], 42, Ha))), 128))
          ], 42, Pa),
          $(E.$slots, "calendar-footer", {
            index: D,
            startDate: b.days[0]?.date,
            endDate: b.days[b.days.length - 1]?.date
          })
        ], 2))), 128))
      ], 2)
    ], 32));
  }
}), Wa = {
  key: 1,
  class: "n-card-body"
}, za = /* @__PURE__ */ Q({
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
  setup(o) {
    const s = $e(), t = se(), e = o, n = f(() => !e.disabled && (e.to || e.href || !!e.onClick || !!t.onClick)), a = f(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), l = f(() => [
      "n-card",
      e.loading ? "n-card--loading" : "",
      e.disabled ? "n-card--disabled" : "",
      n.value ? "n-card--clickable" : ""
    ]), c = f(() => {
      const d = { ...t };
      return a.value === "RouterLink" ? (d.to = e.to, d.target = e.target) : a.value === "a" && (d.href = e.href, d.target = e.target), d;
    }), r = f(() => {
      const d = s.default?.() ?? [];
      return d.length === 0 ? !1 : d.length > 0 && sa(d[0], ["n-card-body"]) ? !0 : d.length > 1;
    });
    function i(d) {
      if (e.disabled) {
        d.preventDefault(), d.stopPropagation();
        return;
      }
      n.value && (e.onClick?.(d), t.onClick && typeof t.onClick == "function" && t.onClick !== e.onClick && t.onClick(d));
    }
    function u(d) {
      if (n.value && ["Enter", " "].includes(d.key)) {
        const p = d.target;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(p.tagName) || p.isContentEditable)
          return;
        d.preventDefault(), i(d);
      }
    }
    return (d, p) => (v(), S(H(a.value), Y({
      class: l.value,
      role: n.value && a.value === "div" ? "button" : void 0,
      tabindex: n.value && a.value === "div" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, c.value, {
      onClick: i,
      onKeydown: u
    }), {
      default: R(() => [
        r.value ? $(d.$slots, "default", { key: 0 }) : (v(), B("div", Wa, [
          $(d.$slots, "default")
        ])),
        $(d.$slots, "loading", {}, () => [
          X(Se, { name: "n-loading-overlay" }, {
            default: R(() => [
              e.loading ? (v(), S(dt, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: T(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : A("", !0)
            ]),
            _: 1
          })
        ])
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "aria-busy"]));
  }
}), Ua = ["name", ".indeterminate"], ja = { class: "n-checkbox-display" }, Ka = {
  key: 3,
  class: "n-checkbox-overlay"
}, Ga = {
  key: 1,
  class: "n-checkbox-message"
}, Zs = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NCheckbox",
  props: /* @__PURE__ */ me({
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
  setup(o) {
    const s = $e(), t = se(), e = o, [n, a] = he(o, "modelValue"), l = `input-id-${_e()}`, c = f(() => ["n-checkbox"]), r = f(() => ["n-checkbox-container"]), i = f(() => ["n-checkbox-wrapper", e.size ? `n-checkbox--${e.size}` : ""]), u = f(() => ["n-checkbox-label"]), d = f(() => de(e.iconClass, e.prependIconClass)), p = f(() => {
      const { class: h, style: y } = t;
      return { class: h, style: y };
    }), g = f(() => {
      const { class: h, style: y, ...m } = t;
      return m;
    }), w = f(() => ({
      ...e,
      modifiers: a,
      inputId: l,
      modelValue: n.value
    })), k = f(() => we(s.before?.(w.value) ?? [], "span")), C = f(() => we(s.after?.(w.value) ?? [], "span"));
    return (h, y) => (v(), B("div", {
      class: T(i.value)
    }, [
      (v(!0), B(ne, null, le(k.value, (m, _) => (v(), S(H(m), { key: _ }))), 128)),
      K("div", {
        class: T(r.value)
      }, [
        !e.inlineLabel && (e.label || h.$slots.label) ? $(h.$slots, "label", { key: 0 }, () => [
          K("label", {
            class: T(u.value),
            for: l
          }, ie(e.label), 3)
        ]) : A("", !0),
        $(h.$slots, "top"),
        (v(), S(H(e.tag), Y({ class: c.value }, p.value), {
          default: R(() => [
            $(h.$slots, "prepend"),
            e.prependIcon || e.icon ? (v(), S(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: T(d.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : A("", !0),
            qe(K("input", Y({
              id: l,
              "onUpdate:modelValue": y[0] || (y[0] = (m) => Yt(n) ? n.value = m : null),
              name: e.name,
              type: "checkbox",
              class: ["peer", e.inputClass],
              ".indeterminate": fe(n) === null
            }, g.value), null, 48, Ua), [
              [cn, fe(n)]
            ]),
            K("div", ja, [
              e.uncheckedIcon ? (v(), S(z, {
                key: 0,
                name: e.uncheckedIcon,
                class: T(["n-checkbox-display-unchecked", e.uncheckedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : A("", !0),
              e.checkedIcon ? (v(), S(z, {
                key: 1,
                name: e.checkedIcon,
                class: T(["n-checkbox-display-checked", e.checkedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : A("", !0),
              e.indeterminateIcon ? (v(), S(z, {
                key: 2,
                name: e.indeterminateIcon,
                class: T(["n-checkbox-display-indeterminate", e.indeterminateIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : A("", !0)
            ]),
            $(h.$slots, "default", Ye(Ke(w.value))),
            e.inlineLabel && (e.label || h.$slots.label) ? $(h.$slots, "inlineLabel", { key: 1 }, () => [
              K("label", {
                class: T(u.value),
                for: l
              }, ie(e.label), 3)
            ]) : A("", !0),
            e.appendIcon ? (v(), S(z, {
              key: 2,
              name: e.appendIcon,
              class: T(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : A("", !0),
            $(h.$slots, "append"),
            h.$slots.overlay ? (v(), B("div", Ka, [
              $(h.$slots, "overlay")
            ])) : A("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        $(h.$slots, "dropdown"),
        $(h.$slots, "bottom"),
        e.message || e.helperText ? (v(), B("div", Ga, ie(e.message || e.helperText), 1)) : A("", !0)
      ], 2),
      (v(!0), B(ne, null, le(C.value, (m, _) => (v(), S(H(m), { key: _ }))), 128))
    ], 2));
  }
}), Za = { key: 1 }, Xa = /* @__PURE__ */ Q({
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
  setup(o, { emit: s }) {
    const t = se(), e = o, n = s, a = f(() => !e.disabled && (e.to || e.href || !!t.onClick)), l = f(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), c = f(() => ["n-chip", a.value ? "n-chip--clickable" : "", e.disabled ? "n-chip--disabled" : ""]), r = f(() => {
      const d = { ...t };
      return l.value === "RouterLink" ? (d.to = e.to, d.target = e.target) : l.value === "a" && (d.href = e.href, d.target = e.target), d;
    });
    function i() {
      n("remove");
    }
    function u(d) {
      if (e.disabled) {
        d.preventDefault(), d.stopPropagation();
        return;
      }
      a.value && n("click", d);
    }
    return (d, p) => (v(), S(H(l.value), Y({
      class: c.value,
      role: a.value && l.value === "span" ? "button" : void 0,
      tabindex: a.value && l.value === "span" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, r.value, {
      onClick: u,
      onKeydown: Ze(Ee(u, ["prevent"]), ["enter", "space"])
    }), {
      default: R(() => [
        $(d.$slots, "prepend"),
        e.prependIcon || e.icon ? (v(), S(z, {
          key: 0,
          name: e.prependIcon || e.icon,
          "aria-hidden": "true"
        }, null, 8, ["name"])) : A("", !0),
        e.label || d.$slots.default ? (v(), B("span", Za, [
          $(d.$slots, "default", {}, () => [
            gt(ie(e.label), 1)
          ])
        ])) : A("", !0),
        e.appendIcon ? (v(), S(z, {
          key: 2,
          name: e.appendIcon,
          "aria-hidden": "true"
        }, null, 8, ["name"])) : A("", !0),
        $(d.$slots, "append"),
        e.removable ? $(d.$slots, "removable", { key: 3 }, () => [
          X(z, {
            name: "mdi-close",
            class: T(e.removableClass),
            clickable: "",
            onClick: Ee(i, ["stop"])
          }, null, 8, ["class"])
        ]) : A("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
});
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Ja = (o) => o != null;
function qa(o, s = {}) {
  let t;
  const { immediate: e, ...n } = s, a = qt(!1), l = qt(!1), c = (d) => t && t.activate(d), r = (d) => t && t.deactivate(d), i = () => {
    t && (t.pause(), l.value = !0);
  }, u = () => {
    t && (t.unpause(), l.value = !1);
  };
  return ge(f(() => zn(Te(o)).map((d) => {
    const p = Te(d);
    return typeof p == "string" ? p : Un(p);
  }).filter(Ja)), (d) => {
    if (d.length)
      if (!t)
        t = Zn(d, {
          ...n,
          onActivate() {
            a.value = !0, s.onActivate && s.onActivate();
          },
          onDeactivate() {
            a.value = !1, s.onDeactivate && s.onDeactivate();
          }
        }), e && c();
      else {
        const p = t?.active;
        t?.updateContainerElements(d), !p && e && c();
      }
  }, { flush: "post" }), jn(() => r()), {
    hasFocus: a,
    isPaused: l,
    activate: c,
    deactivate: r,
    pause: i,
    unpause: u
  };
}
function Sn(o, s, t, e, n) {
  const {
    activate: a,
    deactivate: l,
    hasFocus: c,
    pause: r,
    unpause: i
  } = qa(s, {
    immediate: !1,
    allowOutsideClick: (k) => {
      const C = k.target;
      return !!(C.closest(".n-popover") || C.closest(".n-modal-overlay") || C.closest(".n-drawer-overlay"));
    }
  }), u = te(0), d = () => {
    u.value++, u.value === 1 && r();
  }, p = () => {
    u.value > 0 && u.value--, u.value === 0 && i();
  };
  function g(k) {
    if (!k)
      return null;
    const C = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "textarea:not([disabled])",
      "select:not([disabled])",
      "details",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    return k.querySelector(C);
  }
  return ge(o, async (k) => {
    if (await ye(), !k) {
      t.value && (typeof n?.hide == "number" && await Qt(n.hide), l());
      return;
    }
    const C = g(s.value);
    e.value && C && (typeof n?.show == "number" && await Qt(n.show), t.value ? a() : C.focus());
  }), { isFocusTrapped: c, pause: d, unpause: p, focusContent: () => {
    s.value && s.value.focus();
  } };
}
const Qa = ["innerHTML"], Xs = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NDrawer",
  props: /* @__PURE__ */ me({
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
  setup(o, { expose: s }) {
    const t = se(), e = o, n = he(o, "modelValue"), a = We("contentRef"), { pause: l, unpause: c } = Sn(
      n,
      a,
      f(() => e.overlay),
      f(() => e.focusOnShow),
      e.overlay ? {
        show: 300,
        hide: 300
      } : void 0
    ), r = f(() => ["n-drawer-overlay"]), i = f(() => [
      "n-drawer",
      `n-drawer--direction-${e.direction}`,
      n.value ? "n-drawer--active" : void 0
    ]), u = f(() => ({ ...t }));
    rt("keydown", (h) => {
      n.value && h.key === "Escape" && !e.persist && !e.noEscHide && (h.preventDefault(), h.stopPropagation(), C());
    });
    function d(h) {
      if (e.persist || e.noOverlayHide) return;
      const y = h.target;
      y.clientWidth < h.clientX || y.clientHeight < h.clientY || C();
    }
    function p() {
      e.persist || e.noClickOutsideHide || C();
    }
    function g() {
      e.persist || l();
    }
    function w() {
      e.persist || c();
    }
    const k = () => {
      n.value = !0;
    }, C = () => {
      n.value = !1;
    };
    return s({ show: k, hide: C }), (h, y) => (v(), B(ne, null, [
      X(Se, { name: "n-drawer-overlay" }, {
        default: R(() => [
          e.overlay && n.value ? (v(), B("div", {
            key: 0,
            class: T(r.value),
            "aria-hidden": "true",
            onMousedown: Ee(d, ["self"])
          }, null, 34)) : A("", !0)
        ]),
        _: 1
      }),
      qe((v(), S(H(e.tag), Y({
        ref_key: "contentRef",
        ref: a,
        role: "dialog",
        "aria-modal": e.overlay ? "true" : void 0,
        class: i.value
      }, u.value, {
        onMousedown: g,
        onMouseup: w
      }), {
        default: R(() => [
          $(h.$slots, "default", {}, () => [
            e.content ? (v(), B("span", {
              key: 0,
              innerHTML: e.content
            }, null, 8, Qa)) : A("", !0)
          ])
        ]),
        _: 3
      }, 16, ["aria-modal", "class"])), [
        [fe(Wn), p]
      ])
    ], 64));
  }
}), Js = /* @__PURE__ */ Q({
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
  setup(o) {
    const s = {
      success: "mdi-check-circle",
      error: "mdi-close-circle",
      info: "mdi-information",
      warning: "mdi-alert-circle"
    }, t = se(), e = o, n = `n-form-title-${_e()}`, a = f(() => s[e.status] || ""), l = f(() => {
      const c = { ...t };
      return e.title && !c["aria-labelledby"] && (c["aria-labelledby"] = n), c;
    });
    return (c, r) => (v(), S(H(e.tag), Y({ class: ["n-form"] }, l.value, {
      role: e.tag !== "form" ? "form" : void 0
    }), {
      default: R(() => [
        $(c.$slots, "title", {}, () => [
          e.title ? (v(), S(H(e.titleTag), {
            key: 0,
            id: n,
            class: T(["n-form-title", e.titleClass])
          }, {
            default: R(() => [
              gt(ie(e.title), 1)
            ]),
            _: 1
          }, 8, ["class"])) : A("", !0)
        ]),
        $(c.$slots, "message", {}, () => [
          e.message ? (v(), S(gn, {
            key: 0,
            icon: a.value,
            class: T(e.status)
          }, {
            default: R(() => [
              gt(ie(e.message), 1)
            ]),
            _: 1
          }, 8, ["icon", "class"])) : A("", !0)
        ]),
        $(c.$slots, "default")
      ]),
      _: 3
    }, 16, ["role"]));
  }
}), es = ["aria-label"], ts = { class: "w-full h-full bg-surface flex items-center justify-center text-error p-4" }, ns = ["src", "srcset", "sizes", "alt", "loading"], qs = /* @__PURE__ */ Q({
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
  setup(o, { emit: s }) {
    const t = o, e = s, n = We("containerRef"), a = te(!t.lazy), l = te(!0), c = te(!1);
    if (t.lazy) {
      const { stop: g } = Kn(
        n,
        ([{ isIntersecting: w }]) => {
          w && (a.value = !0, g());
        },
        {
          threshold: t.threshold
        }
      );
    }
    function r(g) {
      l.value = !1, e("load", g);
    }
    function i(g) {
      l.value = !1, c.value = !0, e("error", g);
    }
    const u = f(() => {
      const g = {
        ...t.aspectRatio ? { aspectRatio: t.aspectRatio } : {},
        ...t.width ? { width: typeof t.width == "number" ? `${t.width}px` : t.width } : {},
        ...t.height ? { height: typeof t.height == "number" ? `${t.height}px` : t.height } : {}
      };
      return t.aspectRatio && !t.width && !t.height && (g.width = "100%"), g;
    }), d = f(() => [
      "n-image-img",
      `n-image-img--fit-${t.fit}`,
      t.aspectRatio || t.width && t.height ? "absolute inset-0 w-full h-full" : "block max-w-full h-auto",
      l.value || t.loading ? "opacity-0" : "opacity-100"
    ]), p = f(() => ({}));
    return (g, w) => (v(), B("div", {
      ref_key: "containerRef",
      ref: n,
      class: T([
        "n-image",
        t.containerClass,
        { "n-image--block": t.width === "100%" || t.height === "100%" }
      ]),
      style: It(u.value),
      role: "img",
      "aria-label": t.alt
    }, [
      X(Se, { name: "n-image-fade" }, {
        default: R(() => [
          (l.value || t.loading) && !c.value ? (v(), B("div", {
            key: 0,
            class: T(["n-image-placeholder", t.placeholderClass])
          }, [
            $(g.$slots, "placeholder", {}, () => [
              X(dt, {
                overlay: "",
                name: t.loadingName,
                class: T(t.loadingClass)
              }, null, 8, ["name", "class"])
            ])
          ], 2)) : A("", !0)
        ]),
        _: 3
      }),
      c.value ? (v(), B("div", {
        key: 0,
        class: T(["n-image-error", t.errorClass])
      }, [
        $(g.$slots, "error", {}, () => [
          K("div", ts, [
            X(z, {
              name: "alert-circle",
              class: "mr-2"
            }),
            w[0] || (w[0] = K("span", { class: "text-sm" }, "Failed to load image", -1))
          ])
        ])
      ], 2)) : A("", !0),
      a.value ? (v(), B("img", Y({
        key: 1,
        ref: "imageRef",
        src: t.src,
        srcset: t.srcset,
        sizes: t.sizes,
        alt: t.alt,
        class: d.value,
        style: p.value,
        loading: t.lazy ? "lazy" : void 0
      }, g.$attrs, {
        onLoad: r,
        onError: i
      }), null, 16, ns)) : A("", !0)
    ], 14, es));
  }
});
function ln(o) {
  if (!o || typeof o != "object")
    return !1;
  const s = Object.getPrototypeOf(o);
  return s === null || s === Object.prototype || Object.getPrototypeOf(s) === null ? Object.prototype.toString.call(o) === "[object Object]" : !1;
}
function as(o) {
  return o === "__proto__";
}
function ot(o, s) {
  const t = Object.keys(s);
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    if (as(n))
      continue;
    const a = s[n], l = o[n];
    Array.isArray(a) ? Array.isArray(l) ? o[n] = ot(l, a) : o[n] = ot([], a) : ln(a) ? ln(l) ? o[n] = ot(l, a) : o[n] = ot({}, a) : (l === void 0 || a !== void 0) && (o[n] = a);
  }
  return o;
}
function Ve(o, s) {
  const t = { ...o };
  for (let e = 0; e < s.length; e++) {
    const n = s[e];
    delete t[n];
  }
  return t;
}
const ss = ["type", "aria-busy", "disabled", "readonly"], ls = {
  key: 2,
  class: "n-input-field-overlay"
}, os = {
  key: 1,
  class: "n-input-field-message"
}, zt = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NInputField",
  props: /* @__PURE__ */ me({
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
  setup(o) {
    const s = $e(), t = se(), e = o, [n, a] = he(o, "modelValue"), l = `input-id-${_e()}`, c = f(() => typeof e.format == "function" ? e.format(n.value) : n.value), r = f(() => !!e.disabled), i = f(() => ["n-input-field", ...de(t.class)]), u = f(() => ["n-input-field-container", ...de(e.containerClass)]), d = f(() => [
      "n-input-field-wrapper",
      e.loading ? "n-input-field--loading" : "",
      r.value ? "n-input-field--disabled" : "",
      `n-input-field--size-${e.size}`,
      ...de(e.wrapperClass)
    ]), p = f(() => ["n-input-field-label"]), g = f(() => de(e.iconClass, e.prependIconClass)), w = f(() => Ve(t, ["class"])), k = f(() => Ve(t, ["class"])), C = f(() => ({
      ...e,
      modifiers: a,
      inputId: l,
      modelValue: n.value,
      formattedModelValue: c.value
    })), h = f(() => we(s.before?.(C.value) ?? [], "span")), y = f(() => we(s.after?.(C.value) ?? [], "span"));
    return (m, _) => (v(), B("div", {
      class: T(d.value)
    }, [
      (v(!0), B(ne, null, le(h.value, (O, N) => (v(), S(H(O), { key: N }))), 128)),
      K("div", {
        class: T(u.value)
      }, [
        e.label || m.$slots.label ? $(m.$slots, "label", { key: 0 }, () => [
          K("label", {
            class: T(p.value),
            for: l
          }, ie(e.label), 3)
        ]) : A("", !0),
        $(m.$slots, "top"),
        (v(), S(H(e.tag), Y({ class: i.value }, w.value), {
          default: R(() => [
            $(m.$slots, "loading", {}, () => [
              X(Se, { name: "n-loading-overlay" }, {
                default: R(() => [
                  e.loading ? (v(), S(dt, {
                    key: 0,
                    overlay: !0,
                    name: e.loadingName,
                    class: T(e.loadingClass),
                    "aria-hidden": "true"
                  }, null, 8, ["name", "class"])) : A("", !0)
                ]),
                _: 1
              })
            ]),
            $(m.$slots, "prepend"),
            e.prependIcon || e.icon ? (v(), S(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: T(g.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : A("", !0),
            $(m.$slots, "default", Ye(Ke(C.value)), () => [
              qe(K("input", Y({
                id: l,
                "onUpdate:modelValue": _[0] || (_[0] = (O) => Yt(n) ? n.value = O : null),
                type: e.type,
                "aria-busy": e.loading || void 0,
                disabled: e.disabled,
                readonly: e.readonly
              }, k.value), null, 16, ss), [
                [dn, fe(n)]
              ])
            ]),
            e.appendIcon ? (v(), S(z, {
              key: 1,
              name: e.appendIcon,
              class: T(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : A("", !0),
            $(m.$slots, "append"),
            m.$slots.overlay ? (v(), B("div", ls, [
              $(m.$slots, "overlay")
            ])) : A("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        $(m.$slots, "dropdown"),
        $(m.$slots, "bottom"),
        e.message || e.helperText ? (v(), B("div", os, ie(e.message || e.helperText), 1)) : A("", !0)
      ], 2),
      (v(!0), B(ne, null, le(y.value, (O, N) => (v(), S(H(O), { key: N }))), 128))
    ], 2));
  }
}), on = 1e3, rs = 10, Ge = te(/* @__PURE__ */ new Map());
function _n(o) {
  const s = Symbol(`stack-id-${_e()}`);
  ge(
    () => Te(o),
    (r, i) => {
      const u = i && Ge.value.get(i) || [], d = Ge.value.get(r) ?? [];
      u.filter(({ stackId: p }) => p === s).forEach((p, g) => {
        d.push(p), u.splice(g, 1);
      });
    },
    { immediate: !0 }
  );
  function t() {
    return Ge.value.has(Te(o)) || Ge.value.set(Te(o), []), Ge.value.get(Te(o));
  }
  return {
    register: (r) => {
      const i = t();
      i.find(({ itemId: u }) => u === r) || Ge.value.set(Te(o), [...i, { stackId: s, itemId: r }]);
    },
    unregister: (r) => {
      Ge.value.set(
        Te(o),
        t().filter(({ itemId: i }) => i === r)
      );
    },
    getZIndex: (r) => {
      const u = t().findIndex(({ itemId: d }) => d === r);
      return u === -1 ? on : on + u * rs;
    },
    getOrderIndex: (r) => t().findIndex(({ itemId: u }) => u === r),
    isTop: (r) => {
      const i = t();
      return i[i.length - 1]?.itemId === r;
    }
  };
}
function Mt(o, s = "") {
  const t = te(!1);
  return ge(
    () => [Te(o), Te(s)],
    async (e, n) => {
      if (!(typeof document > "u")) {
        if (t.value = !1, Array.isArray(n)) {
          const a = document.getElementById(n[0]);
          a && a.childElementCount === 0 && document.body.removeChild(a);
        }
        if (await ye(), !document.getElementById(e[0])) {
          const a = document.createElement("div");
          a.id = e[0], e[1] && (a.className = Yn(e[1])), document.body.appendChild(a);
        }
        t.value = !0;
      }
    },
    { immediate: !0 }
  ), { isReady: t };
}
const is = ["innerHTML"], Dn = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NModal",
  props: /* @__PURE__ */ me({
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
  setup(o, { expose: s }) {
    const t = se(), e = o, n = he(o, "modelValue"), { isReady: a } = Mt("n-modals-container"), l = Symbol(`modal-id-${_e()}`), { register: c, unregister: r, getZIndex: i, isTop: u } = _n("n-modal"), d = We("contentRef"), { pause: p, unpause: g, focusContent: w } = Sn(
      n,
      d,
      f(() => e.overlay),
      f(() => e.focusOnShow),
      e.overlay ? {
        show: 300,
        hide: 300
      } : void 0
    );
    En("n-modal-focusable", { pause: p, unpause: g, focusContent: w });
    const k = f(() => i(l)), C = f(() => ["n-modal-overlay"]), h = f(() => ({ zIndex: k.value })), y = f(() => ["n-modal", `n-modal--direction-${e.direction}`, "outline-none"]), m = f(() => ({ zIndex: k.value })), _ = f(() => {
      const { tag: F, content: W, overlay: pe, noOverlayHide: ue, noEscHide: q, direction: ve, persist: Z, focusOnShow: oe, role: be, ...Ie } = e, { "aria-modal": De, role: Pe, tabindex: Ne, ...ke } = t, { "aria-modal": Ae, ...ce } = Ie;
      return { tabindex: Ne ?? "-1", ...ce, ...ke };
    });
    rt("keydown", (F) => {
      n.value && F.key === "Escape" && !e.persist && !e.noEscHide && u(l) && (F.preventDefault(), F.stopPropagation(), G());
    }), ge(
      n,
      (F) => {
        F ? c(l) : setTimeout(() => r(l), 300);
      },
      { immediate: !0 }
    ), fn(() => {
      r(l);
    });
    function O(F) {
      if (e.persist || e.noOverlayHide) return;
      const W = F.target;
      W.clientWidth < F.clientX || W.clientHeight < F.clientY || G();
    }
    function N(F) {
      if (!F || F === document.body) return !1;
      const W = [
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
      return !!(F.matches(W) || F.getAttribute("tabindex") && F.getAttribute("tabindex") !== "-1" || F.closest(W));
    }
    function V(F) {
      if (e.persist) return;
      const W = F.target;
      N(W) || d.value && (F.preventDefault(), d.value.focus()), p();
    }
    function L() {
      e.persist || g();
    }
    const M = () => {
      n.value = !0;
    }, G = () => {
      n.value = !1;
    };
    return s({ show: M, hide: G }), (F, W) => fe(a) ? (v(), S(St, {
      key: 0,
      to: "#n-modals-container"
    }, [
      X(Se, { name: "n-modal-overlay" }, {
        default: R(() => [
          e.overlay && n.value ? (v(), B("div", {
            key: 0,
            class: T(C.value),
            style: It(h.value),
            "aria-hidden": "true",
            onMousedown: O
          }, null, 38)) : A("", !0)
        ]),
        _: 1
      }),
      X(Se, { name: "n-modal" }, {
        default: R(() => [
          n.value ? (v(), S(H(e.tag), Y({
            key: 0,
            ref_key: "contentRef",
            ref: d,
            role: e.role,
            "aria-modal": e.overlay ? "true" : void 0,
            class: y.value,
            style: m.value
          }, _.value, {
            onMousedown: V,
            onMouseup: L
          }), {
            default: R(() => [
              $(F.$slots, "default", {}, () => [
                e.content ? (v(), B("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, is)) : A("", !0)
              ])
            ]),
            _: 3
          }, 16, ["role", "aria-modal", "class", "style"])) : A("", !0)
        ]),
        _: 3
      })
    ])) : A("", !0);
  }
});
function Qs() {
  const o = ct();
  if (!o)
    throw new Error("useDialog must be called within setup() or a lifecycle hook.");
  const s = o.appContext;
  async function t(c = {}) {
    const r = document.createElement("div");
    r.id = `dialog-app-${_e()}`, document.body.appendChild(r);
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
    }, p = /* @__PURE__ */ new Map();
    async function g() {
      const M = C.component;
      M?.exposed?.hide && M.exposed.hide();
    }
    async function w() {
      setTimeout(() => {
        je(null, r), r.remove();
      }, 300);
    }
    let k = [];
    Array.isArray(i.actions) && (k = i.actions.map((M) => {
      const G = M.onClick;
      return j(Pt, { ...M, onClick: () => {
        typeof G == "function" ? G({ hide: g, executeCallbacks: y }) : (M.label?.toLocaleLowerCase() === "ok" ? y("ok") : M.label?.toLocaleLowerCase() === "cancel" && y("cancel"), y("dismiss"), i.hideOnAction && g());
      } });
    }));
    const C = X(
      Dn,
      {
        ...u,
        "onUpdate:modelValue": (M) => {
          M || (y("hide"), w());
        }
      },
      {
        default: () => j(
          za,
          {
            ...d
          },
          {
            default: () => [
              i.title ? j("div", { class: ["n-card-header", i.cardHeaderClass] }, [
                j("h1", { class: "title-text text-xl" }, i.title),
                i.closeButton ? j(Pt, {
                  icon: "close",
                  class: "icon pilled text-xs",
                  onClick: () => g()
                }) : null
              ]) : null,
              j("div", { class: "n-card-body" }, i.content || ""),
              k.length > 0 ? j(
                "div",
                { class: ["n-card-footer justify-end gap-2", i.cardFooterClass] },
                k
              ) : null
            ].filter(Boolean)
          }
        )
      }
    );
    s && (C.appContext = s), je(C, r), await ye();
    function h(M, G) {
      const F = p.get(M) || [];
      F.push(G), p.set(M, F);
    }
    function y(M, ...G) {
      const F = p.get(M) || [];
      for (const W of F)
        W(G);
    }
    function m(M) {
      h("hide", M);
    }
    function _(M) {
      h("dismiss", M);
    }
    function O(M) {
      h("cancel", M);
    }
    function N(M) {
      h("ok", M);
    }
    function V(M) {
      h("show", M);
    }
    async function L() {
      return C.component?.exposed?.show(), await ye(), y("show"), {
        hide: g,
        onHide: m,
        onDismiss: _,
        onCancel: O,
        onOk: N
      };
    }
    return {
      show: L,
      onShow: V
    };
  }
  const e = async (c) => await (await t(c)).show();
  return {
    create: t,
    dialog: e,
    alert: async (c, r, i) => {
      const u = await e({
        title: c,
        content: r,
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
    confirm: async (c, r, i) => {
      const u = await e({
        ...i || {},
        title: c,
        content: r,
        actions: i?.actions ? i.actions : [
          {
            label: "Cancel",
            class: "flat",
            onClick: ({ hide: d, executeCallbacks: p }) => {
              p("cancel"), d();
            }
          },
          {
            label: "OK",
            onClick: ({ hide: d, executeCallbacks: p }) => {
              p("ok"), d();
            }
          }
        ],
        hideOnAction: !1,
        noOverlayHide: !0,
        noEscHide: !0,
        role: "alertdialog"
      });
      return new Promise((d) => {
        let p = null;
        u.onOk(() => p = "ok"), u.onCancel(() => p = "cancel"), u.onHide(() => d(p));
      });
    },
    prompt: (c, r, i = "") => new Promise(async (u) => {
      const d = window.prompt(`${c}
${r}`, i);
      u(d);
    })
  };
}
function An(o, s) {
  const { model: t, contentRef: e, attachParentEl: n, placement: a } = s, l = te(!1), c = te(!1), r = te(!1), i = f(() => ({
    triggerByHover: !0,
    triggerByFocus: !0,
    triggerByInteraction: !0,
    ...Te(o)
  }));
  rt(() => typeof document < "u" ? document : null, "mouseup", () => {
    c.value = !1;
  }), rt(() => typeof document < "u" ? document : null, "keyup", () => {
    c.value = !1;
  });
  const u = en(
    () => {
      q();
    },
    f(() => i.value.showDelay ?? 0),
    {
      immediate: !1
    }
  ), d = en(
    () => {
      document.activeElement !== Te(g) && !l.value && ve();
    },
    f(() => i.value.hideDelay ?? 0),
    {
      immediate: !1
    }
  ), p = te(null), g = te(null), w = te(null), { width: k, height: C } = Gn(n), {
    x: h,
    y,
    strategy: m,
    placement: _
  } = Xn(n, e, {
    placement: a,
    whileElementsMounted: Jn,
    middleware: f(() => {
      const [Z, oe] = i.value.offset ?? [0, 0], be = [tn(i.value.margin), tn({ crossAxis: Z, mainAxis: oe })];
      return i.value.autoReposition && (be.push(qn()), be.push(Qn({ padding: 8 }))), be;
    })
  }), O = f(() => ({
    position: m.value,
    top: y.value != null ? `${y.value}px` : "",
    left: h.value != null ? `${h.value}px` : ""
  })), N = () => {
    u.isPending.value && u.stop(), d.isPending.value && d.stop();
  }, V = (Z, oe, be) => {
    Z && Object.entries(oe).forEach(([Ie, De]) => {
      be === "add" ? Z.addEventListener(Ie, De) : Z.removeEventListener(Ie, De);
    });
  };
  ge(
    () => [
      i.value.hoverTriggerAnchor,
      i.value.focusTriggerAnchor,
      i.value.clickTriggerAnchor,
      n.value
    ],
    () => {
      ye(() => {
        const Z = i.value, oe = (ce) => ce ? _t(ce) : typeof ce > "u" ? n.value : null, be = oe(Z.hoverTriggerAnchor), Ie = oe(Z.focusTriggerAnchor), De = oe(Z.clickTriggerAnchor), Pe = {
          mouseenter: F,
          mouseleave: W
        }, Ne = {
          focus: F,
          blur: W,
          mousedown: L,
          keydown: M
        }, ke = {
          click: G
        }, Ae = (ce, He, Ce) => {
          ce.value !== He && (V(ce.value, Ce, "remove"), ce.value = He, V(ce.value, Ce, "add"));
        };
        Ae(p, be, Pe), Ae(g, Ie, Ne), Ae(w, De, ke);
      });
    },
    { deep: !0, immediate: !0, flush: "post" }
  );
  function L() {
    c.value = !0;
  }
  function M(Z) {
    (Z.key === "Enter" || Z.key === " ") && (c.value = !0);
  }
  function G(Z) {
    if (t.value) {
      if (i.value.allowClickToHide) {
        if (i.value.persistent) return;
        N(), ve();
      }
    } else
      d.isPending.value && d.stop(), u.start();
  }
  function F() {
    c.value || r.value || (d.isPending.value && d.stop(), u.isPending.value || u.start());
  }
  function W(Z) {
    i.value.persistent || Z.type === "mouseleave" && !i.value.triggerByHover || (u.isPending.value && u.stop(), d.isPending.value || d.start());
  }
  function pe() {
    l.value = !0, d.isPending.value && d.stop();
  }
  function ue() {
    i.value.persistent || (l.value = !1, i.value.triggerByHover && (d.isPending.value || d.start()));
  }
  rt("keydown", (Z) => {
    t.value && Z.key === "Escape" && !i.value.persistent && (Z.preventDefault(), Z.stopPropagation(), ve());
  });
  const q = () => {
    t.value = !0;
  }, ve = (Z = !1) => {
    const oe = e.value?.contains(document.activeElement);
    t.value = !1, !Z && oe && ye(() => {
      r.value = !0, g.value ? g.value.focus() : n.value && n.value?.focus(), setTimeout(() => {
        r.value = !1;
      }, 0);
    });
  };
  return {
    show: q,
    hide: ve,
    handleContentHoverFocusIn: pe,
    handleContentHoverFocusOut: ue,
    compStyles: O,
    placement: _,
    parentWidth: k,
    parentHeight: C
  };
}
function el() {
  const o = ct();
  if (!o)
    throw new Error("useModal must be called within setup() or a lifecycle hook.");
  const s = o.appContext;
  async function t(a) {
    const l = document.createElement("div");
    l.id = `modal-app-${_e()}`, document.body.appendChild(l), a = a ?? {};
    const { content: c, ...r } = a, i = /* @__PURE__ */ new Map();
    async function u() {
      p.component?.exposed?.hide(), await ye(), w("hide"), d();
    }
    async function d() {
      je(null, l), l.remove();
    }
    const p = X(
      Dn,
      {
        ...r
      },
      {
        default: () => typeof c == "string" ? j("span", { innerHTML: c }) : c || ""
      }
    );
    s && (p.appContext = s), je(p, l), await ye();
    function g(y, m) {
      const _ = i.get(y) || [];
      _.push(m), i.set(y, _);
    }
    function w(y, ...m) {
      const _ = i.get(y) || [];
      for (const O of _)
        O(m);
    }
    function k(y) {
      g("hide", y);
    }
    function C(y) {
      g("show", y);
    }
    async function h() {
      return p.component?.exposed?.show(), await ye(), w("show"), {
        hide: u,
        onHide: k
      };
    }
    return {
      show: h,
      onShow: C
    };
  }
  const e = async (a) => await (await t(a)).show();
  return {
    create: t,
    loading: async (a, l, c) => {
      const r = {
        ...c,
        class: "flex flex-col items-center gap-4 text-text-invert",
        persist: !0,
        content: [
          j("div", { class: c?.titleClass }, l),
          j(dt, { name: a, class: c?.loadingClass })
        ]
      };
      return await e(r);
    }
  };
}
const us = ["innerHTML"], cs = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', ds = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NToast",
  props: /* @__PURE__ */ me({
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
  setup(o, { expose: s }) {
    const t = se(), e = o, n = he(o, "modelValue"), { isReady: a } = Mt(f(() => `n-toasts-container--position-${e.position}`)), l = We("contentRef"), c = te(null), r = Symbol(`toast-id-${_e()}`), { register: i, unregister: u, getZIndex: d, getOrderIndex: p, isTop: g } = _n(
      f(() => `n-toast--position-${e.position}`)
    ), {
      start: w,
      stop: k,
      pause: C,
      resume: h
    } = hn(
      () => ue(),
      f(() => e.duration),
      { immediate: !1 }
    ), y = f(() => d(r)), m = f(() => p(r)), _ = f(() => ["n-toast-overlay", `n-toast-overlay--position-${e.position}`]), O = f(() => ({ zIndex: y.value, order: m.value })), N = f(() => ["n-toast", `n-toast--position-${e.position}`]), V = f(() => ({ zIndex: y.value, order: m.value })), L = f(() => {
      const { tag: q, content: ve, overlay: Z, noOverlayHide: oe, noEscHide: be, position: Ie, focusOnShow: De, duration: Pe, role: Ne, ...ke } = e, { "aria-live": Ae, "aria-atomic": ce, role: He, ...Ce } = t, { "aria-live": Qe, "aria-atomic": ft, role: yt, ...et } = ke;
      return { ...et, ...Ce };
    }), M = () => {
      if (!l.value) return;
      const q = l.value.querySelector(cs);
      q ? q.focus() : l.value.focus();
    };
    rt("keydown", (q) => {
      n.value && q.key === "Escape" && !e.noEscHide && g(r) && (q.preventDefault(), q.stopPropagation(), ue());
    }), ge(n, async (q) => {
      q ? (i(r), c.value = document.activeElement, e.duration > 0 && w(), await ye(), e.focusOnShow && M()) : (k(), c.value && (c.value.focus(), c.value = null), u(r));
    }), fn(() => {
      u(r);
    });
    function G(q) {
      if (e.noOverlayHide) return;
      const ve = q.target;
      ve.clientWidth < q.clientX || ve.clientHeight < q.clientY || ue();
    }
    function F() {
      e.duration > 0 && C();
    }
    function W() {
      e.duration > 0 && h();
    }
    const pe = () => {
      n.value = !0;
    }, ue = () => {
      n.value = !1;
    };
    return s({ show: pe, hide: ue }), (q, ve) => fe(a) ? (v(), S(St, {
      key: 0,
      to: `#n-toasts-container--position-${e.position}`
    }, [
      X(Se, { name: "n-toast-overlay" }, {
        default: R(() => [
          e.overlay && n.value ? (v(), B("div", {
            key: 0,
            class: T(_.value),
            style: It(O.value),
            "aria-hidden": "true",
            onMousedown: G
          }, null, 38)) : A("", !0)
        ]),
        _: 1
      }),
      X(Se, {
        mode: "out-in",
        name: "n-toast"
      }, {
        default: R(() => [
          n.value ? (v(), S(H(e.tag), Y({
            key: 0,
            ref_key: "contentRef",
            ref: l,
            role: e.role,
            "aria-live": fe(t)["aria-live"] || "polite",
            "aria-atomic": fe(t)["aria-atomic"] || "true",
            class: N.value,
            style: V.value
          }, L.value, {
            onMouseenter: F,
            onMouseleave: W,
            onFocusin: F,
            onFocusout: W
          }), {
            default: R(() => [
              $(q.$slots, "default", {}, () => [
                e.content ? (v(), B("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, us)) : A("", !0)
              ])
            ]),
            _: 3
          }, 16, ["role", "aria-live", "aria-atomic", "class", "style"])) : A("", !0)
        ]),
        _: 3
      })
    ], 8, ["to"])) : A("", !0);
  }
});
function tl() {
  const o = ct();
  if (!o)
    throw new Error("useNotify must be called within setup() or a lifecycle hook.");
  const s = o.appContext;
  async function t(r) {
    const i = document.createElement("div");
    i.id = `toast-app-${_e()}`, document.body.appendChild(i), r = r ?? {}, r.hideOnAction ??= !0;
    const u = {
      tag: r.toastTag,
      overlay: r.overlay,
      noOverlayHide: r.noOverlayHide,
      noEscHide: r.noEscHide,
      position: r.position,
      focusOnShow: r.focusOnShow,
      duration: r.duration,
      role: r.role
    }, d = {
      tag: r.bannerTag,
      class: r.bannerClass,
      icon: r.icon,
      iconClass: r.iconClass,
      labelClass: r.labelClass,
      actionsClass: r.actionsClass,
      inlineActions: r.inlineActions,
      duration: r.duration,
      showProgress: r.showProgress,
      actions: r.actions
    }, p = /* @__PURE__ */ new Map();
    async function g() {
      y("hide"), setTimeout(() => C(), 300);
    }
    Array.isArray(d.actions) && (d.actions = d.actions.map((M) => {
      const G = M.onClick;
      return { ...M, onClick: () => {
        typeof G == "function" ? G({ hide: k, executeCallbacks: y }) : (M.label?.toLocaleLowerCase() === "ok" ? y("ok") : M.label?.toLocaleLowerCase() === "cancel" && y("cancel"), y("dismiss"), r.hideOnAction && k());
      } };
    }));
    const w = X(
      ds,
      {
        ...u,
        "onUpdate:modelValue": (M) => {
          M || g();
        }
      },
      {
        default: () => j(
          gn,
          {
            ...d,
            onTimerBegin: r.onTimerBegin,
            onTimerPause: r.onTimerPause,
            onTimerResume: r.onTimerResume
          },
          () => r.content || ""
        )
      }
    );
    s && (w.appContext = s), je(w, i), await ye();
    async function k() {
      const M = w.component;
      M?.exposed?.hide && M.exposed.hide();
    }
    async function C() {
      je(null, i), i.remove();
    }
    function h(M, G) {
      const F = p.get(M) || [];
      F.push(G), p.set(M, F);
    }
    function y(M, ...G) {
      const F = p.get(M) || [];
      for (const W of F)
        W(G);
    }
    function m(M) {
      h("hide", M);
    }
    function _(M) {
      h("dismiss", M);
    }
    function O(M) {
      h("cancel", M);
    }
    function N(M) {
      h("ok", M);
    }
    function V(M) {
      h("show", M);
    }
    async function L() {
      return w.component?.exposed?.show(), await ye(), y("show"), {
        hide: k,
        onHide: m,
        onDismiss: _,
        onCancel: O,
        onOk: N
      };
    }
    return {
      show: L,
      onShow: V
    };
  }
  const e = async (r, i) => (await t({
    hideOnAction: !0,
    content: r,
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
    success: (r, i) => e(r, { bannerClass: "success", ...i }),
    error: (r, i) => e(r, { bannerClass: "error", ...i }),
    warning: (r, i) => e(r, { bannerClass: "warning", ...i }),
    info: (r, i) => e(r, { bannerClass: "info", ...i })
  };
}
const fs = { class: "overflow-hidden" }, ps = { class: "px-4 pb-2" }, Je = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NListItem",
  props: /* @__PURE__ */ me({
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
  emits: /* @__PURE__ */ me(["click"], ["update:modelValue"]),
  setup(o, { expose: s, emit: t }) {
    const e = ct(), n = $e(), a = se(), l = o, c = he(o, "modelValue"), r = t, i = f(() => !l.heading && (l.to || l.href || e?.vnode.props?.onClick)), u = f(() => l.to && !l.disabled ? "RouterLink" : l.href && !l.disabled ? "a" : l.tag), d = f(() => l.heading ? "presentation" : u.value === "RouterLink" || u.value === "a" ? "link" : i.value ? "button" : "listitem"), p = f(() => i.value || l.expandable ? 0 : void 0), g = f(() => [
      "n-list-item",
      i.value && !l.expandable ? "n-list-item--clickable" : "",
      l.disabled ? "n-list-item--disabled" : "",
      l.expandable ? "n-list-item--expandable" : "",
      l.heading ? "n-list-item--heading" : ""
    ]), w = f(() => {
      const L = { ...a };
      return u.value === "RouterLink" ? (L.to = l.to, L.target = l.target) : u.value === "a" && (L.href = l.href, L.target = l.target), L;
    }), k = f(() => de(l.iconClass, l.prependIconClass)), C = f(() => {
      const L = n.default?.();
      return L && L.length > 0 ? we(L, "span") : l.contentField && a[l.contentField] ? we(a[l.contentField], "span") : [];
    }), h = f(() => {
      const L = n.content?.();
      return L && L.length > 0 ? we(L, "span") : [];
    }), y = (L) => L.nodes;
    function m(L) {
      if (l.disabled || l.heading) {
        L.preventDefault(), L.stopPropagation();
        return;
      }
      i.value && r("click", L);
    }
    function _(L) {
      if (i.value && ["Enter", " "].includes(L.key)) {
        const M = L.target;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(M.tagName) || M.isContentEditable)
          return;
        L.preventDefault(), m(L);
      }
    }
    function O() {
      c.value = !c.value;
    }
    return s({ expand: () => {
      c.value = !0;
    }, collapse: () => {
      c.value = !1;
    } }), (L, M) => (v(), S(H(u.value), Y({
      class: g.value,
      role: d.value,
      tabindex: p.value,
      "aria-disabled": l.disabled ? "true" : void 0,
      "aria-expanded": l.expandable ? c.value : void 0
    }, w.value, {
      onClick: m,
      onKeydown: _
    }), {
      default: R(() => [
        l.expandable ? (v(), B("div", {
          key: 0,
          class: "n-list-item-header",
          onClick: Ee(O, ["stop"])
        }, [
          $(L.$slots, "prepend"),
          l.prependIcon || l.icon ? (v(), S(z, {
            key: 0,
            name: l.prependIcon || l.icon,
            class: T(k.value),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : A("", !0),
          X(y, { nodes: C.value }, null, 8, ["nodes"]),
          l.appendIcon ? (v(), S(z, {
            key: 1,
            name: l.appendIcon,
            class: T(l.appendIconClass),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : A("", !0),
          $(L.$slots, "append")
        ])) : (v(), B(ne, { key: 1 }, [
          $(L.$slots, "prepend"),
          l.prependIcon || l.icon ? (v(), S(z, {
            key: 0,
            name: l.prependIcon || l.icon,
            class: T(k.value),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : A("", !0),
          X(y, { nodes: C.value }, null, 8, ["nodes"]),
          l.appendIcon ? (v(), S(z, {
            key: 1,
            name: l.appendIcon,
            class: T(l.appendIconClass),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : A("", !0),
          $(L.$slots, "append")
        ], 64)),
        l.expandable ? (v(), B("div", {
          key: 2,
          class: T(["n-list-item-content", [c.value ? "n-list-item-content--expanded" : ""]])
        }, [
          K("div", fs, [
            K("div", ps, [
              X(y, { nodes: h.value }, null, 8, ["nodes"])
            ])
          ])
        ], 2)) : A("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "aria-expanded"]));
  }
}), Ct = {
  direction: "right",
  position: "start",
  stacked: !0
};
function vt(o) {
  const { children: s } = o;
  return typeof s == "string" || typeof s == "number" ? [String(s)] : Array.isArray(s) ? s : s && typeof s == "object" && "default" in s && typeof s.default == "function" ? s.default() : [];
}
function tt(o, s = Ct) {
  return o.map((t) => {
    if (!Vt(t) || t.type === rn || t.type === un)
      return t;
    const e = {
      ...t.props,
      ref: t.ref ?? void 0,
      key: t.key ?? void 0
    };
    if (t.type === ht || kt(t, "NMenu"))
      return j(ht, ot(Ct, { ...e, ...s }), {
        default: () => tt(vt(t), s)
      });
    if (t.type === ne)
      return j(ne, e, tt(vt(t), s));
    if (t.type === Je || kt(t, "NListItem") || t.type === "li") {
      const n = vt(t), a = n.findIndex(
        (u) => Vt(u) && (u.type === "ul" || kt(u, ["NMenu", "NList"]))
      ), l = a !== -1, c = l ? n.filter((u, d) => d !== a) : n, r = tt(c, s), i = t.children && typeof t.children == "object" && !Array.isArray(t.children) ? { ...t.children } : {};
      if (l) {
        const u = n[a];
        return j(Je, e, {
          ...i,
          default: () => [
            ...r,
            j(ht, ot(Ct, { ...u.props, ...s }), {
              default: () => tt(vt(u), s)
            }),
            j(z, { name: "chevron-right", class: "ml-8 -mr-2" })
          ]
        });
      }
      return j(Je, e, { ...i, default: () => r });
    }
    if (t.children) {
      const n = vt(t);
      if (n.length)
        return j(t.type, e, {
          default: () => tt(n, s)
        });
    }
    return t;
  });
}
function Mn(o, s = Ct) {
  return {
    transformedNodes: f(() => tt(o.default?.() ?? [], s))
  };
}
const vs = ["innerHTML"], ms = {
  key: 0,
  class: "n-popover-overlay"
}, hs = ["innerHTML"], gs = ["innerHTML"], ys = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NPopover",
  props: /* @__PURE__ */ me({
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
  setup(o, { expose: s }) {
    const t = se(), e = o, n = he(o, "modelValue"), a = We("contentRef"), { isReady: l } = Mt("n-popovers-container"), c = te(null), r = te(null), i = f(() => r.value || c.value), u = () => {
      e.attachParent ? r.value = _t(e.attachParent) : r.value = null;
    }, d = f(() => `${e.direction}${e.position !== "" ? `-${e.position}` : ""}`), p = f(() => ({
      ...e,
      hoverTriggerAnchor: e.triggerByHover ? e.hoverTriggerAnchor : null,
      focusTriggerAnchor: e.triggerByFocus ? e.focusTriggerAnchor : null,
      clickTriggerAnchor: e.triggerByInteraction ? e.clickTriggerAnchor : null
    })), {
      show: g,
      hide: w,
      handleContentHoverFocusIn: k,
      handleContentHoverFocusOut: C,
      compStyles: h,
      placement: y,
      parentWidth: m
    } = An(p, {
      model: f({
        get: () => n.value,
        set: (V) => {
          n.value = V;
        }
      }),
      contentRef: a,
      attachParentEl: i,
      placement: d
    }), _ = f(() => {
      const V = { ...h.value };
      return e.fit && (V.width = `${m.value}px`), V;
    }), O = f(() => ["n-popover", `n-popover--direction-${y.value}`]), N = f(() => {
      const {
        tag: V,
        content: L,
        showDelay: M,
        hideDelay: G,
        persistent: F,
        hoverTriggerAnchor: W,
        focusTriggerAnchor: pe,
        clickTriggerAnchor: ue,
        attachParent: q,
        triggerByHover: ve,
        triggerByFocus: Z,
        triggerByInteraction: oe,
        direction: be,
        position: Ie,
        margin: De,
        offset: Pe,
        autoReposition: Ne,
        stacked: ke,
        overlay: Ae,
        fit: ce,
        role: He,
        ...Ce
      } = e;
      return {
        style: _.value,
        onMouseenter: k,
        onMouseleave: C,
        onFocusin: k,
        onFocusout: C,
        ...Ce,
        ...t
      };
    });
    return pn(() => {
      c.value = mn(), u();
    }), ge(() => e.attachParent, u), s({ show: g, hide: w, contentRef: a }), (V, L) => e.stacked ? (v(), S(Se, {
      key: 0,
      name: "n-popover"
    }, {
      default: R(() => [
        n.value ? (v(), S(H(e.tag), Y({
          key: 0,
          ref_key: "contentRef",
          ref: a,
          class: O.value,
          role: e.role
        }, N.value), {
          default: R(() => [
            $(V.$slots, "default", {}, () => [
              e.content ? (v(), B("span", {
                key: 0,
                innerHTML: e.content
              }, null, 8, vs)) : A("", !0)
            ])
          ]),
          _: 3
        }, 16, ["class", "role"])) : A("", !0)
      ]),
      _: 3
    })) : fe(l) ? (v(), S(St, {
      key: 1,
      to: "#n-popovers-container"
    }, [
      X(Se, {
        name: e.overlay ? "n-popover-overlay" : "n-popover"
      }, {
        default: R(() => [
          n.value && e.overlay ? (v(), B("div", ms, [
            (v(), S(H(e.tag), Y({
              ref_key: "contentRef",
              ref: a,
              class: O.value,
              role: e.role
            }, N.value), {
              default: R(() => [
                $(V.$slots, "default", {}, () => [
                  e.content ? (v(), B("span", {
                    key: 0,
                    innerHTML: e.content
                  }, null, 8, hs)) : A("", !0)
                ])
              ]),
              _: 3
            }, 16, ["class", "role"]))
          ])) : n.value ? (v(), S(H(e.tag), Y({
            key: 1,
            ref_key: "contentRef",
            ref: a,
            class: O.value,
            role: e.role
          }, N.value), {
            default: R(() => [
              $(V.$slots, "default", {}, () => [
                e.content ? (v(), B("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, gs)) : A("", !0)
              ])
            ]),
            _: 3
          }, 16, ["class", "role"])) : A("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ])) : A("", !0);
  }
}), ht = /* @__PURE__ */ Q({
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
  setup(o, { expose: s, emit: t }) {
    const e = {
      direction: "right",
      position: "start",
      stacked: !0
    }, n = $e(), a = o, l = t, c = We("popoverRef"), { transformedNodes: r } = Mn(n, e), i = f(() => ["n-menu"]), u = f(() => {
      const {
        items: g,
        listTag: w,
        listClass: k,
        valueField: C,
        childrenField: h,
        contentField: y,
        triggerByHover: m,
        triggerByFocus: _,
        triggerByInteraction: O,
        allowClickToHide: N,
        recursiveTriggers: V,
        ...L
      } = a;
      return {
        ...L,
        hoverTriggerAnchor: m ? a.hoverTriggerAnchor : null,
        focusTriggerAnchor: _ ? a.focusTriggerAnchor : null,
        clickTriggerAnchor: O ? a.clickTriggerAnchor : null,
        attachParent: O ? a.attachParent : null,
        allowClickToHide: N
      };
    }), d = (g, w = e) => g.map((k) => {
      const {
        [a.contentField]: C,
        [a.childrenField]: h,
        onClick: y,
        ...m
      } = k, _ = !!(h && h.length), O = {
        key: k.key ?? k.id ?? k[a.valueField],
        ...m,
        role: "menuitem",
        "aria-haspopup": _ ? "menu" : void 0,
        onClick: (N) => {
          y && typeof y == "function" && y(N), l("select", k);
        }
      };
      if (_ && !n.item) {
        const {
          hoverTriggerAnchor: N,
          focusTriggerAnchor: V,
          clickTriggerAnchor: L,
          fit: M,
          items: G,
          triggerByHover: F,
          triggerByFocus: W,
          triggerByInteraction: pe,
          allowClickToHide: ue,
          recursiveTriggers: q,
          ...ve
        } = a, Z = {
          ...ve,
          ...a.recursiveTriggers ? {
            triggerByHover: F,
            triggerByFocus: W,
            triggerByInteraction: pe,
            allowClickToHide: ue,
            recursiveTriggers: q
          } : {}
        };
        return j(
          Je,
          O,
          n.submenu ? j(ne, null, n.submenu(k) ?? []) : {
            default: () => [
              j("span", { class: "grow" }, C),
              j(ht, {
                ...Z,
                ...e,
                items: h,
                ...w,
                onSelect: (oe) => l("select", oe)
              }),
              j(z, {
                name: "mdi-chevron-right",
                class: "ml-8 -mr-2",
                "aria-hidden": "true"
              })
            ]
          }
        );
      }
      return n.item ? j(ne, null, n.item(k) ?? []) : j(Je, O, () => n["item-content"]?.(k) ?? C);
    }), p = f(() => a.items && a.items.length ? d(a.items, e) : r.value);
    return s({ popoverRef: c }), (g, w) => (v(), S(ys, Y({
      ref_key: "popoverRef",
      ref: c,
      class: i.value
    }, u.value), {
      default: R(() => [
        (v(), S(H(a.listTag), {
          class: T(["n-list", a.listClass]),
          role: "menu"
        }, {
          default: R(() => [
            (v(!0), B(ne, null, le(p.value, (k, C) => (v(), S(H(k), {
              key: k.key ?? C
            }))), 128))
          ]),
          _: 1
        }, 8, ["class"]))
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), bs = {
  key: 0,
  class: "n-input-combo-chips-container"
}, ks = ["id", "name", "disabled", "readonly", "value", "placeholder", "aria-expanded", "onKeydown"], nl = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NInputCombo",
  props: /* @__PURE__ */ me({
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
  emits: /* @__PURE__ */ me(["filter", "clear"], ["update:modelValue", "update:inputValue", "update:dropdown"]),
  setup(o, { emit: s }) {
    const t = o, e = s, n = $e(), a = se(), l = he(o, "modelValue"), c = he(o, "inputValue"), r = he(o, "dropdown"), i = We("inputRef"), u = We("menuRef"), d = te(!1), p = te(!1), g = `menu-${_e()}`, w = te(/* @__PURE__ */ new Map()), k = Vn("n-modal-focusable", null);
    function C(b) {
      for (const D of b) {
        const I = D[t.valueField];
        I != null && w.value.set(I, D), D[t.childrenField] && Array.isArray(D[t.childrenField]) && C(D[t.childrenField]);
      }
    }
    const h = (b, D) => {
      for (const I of b) {
        if (I[t.valueField] === D)
          return I;
        if (I[t.childrenField] && Array.isArray(I[t.childrenField])) {
          const P = h(I[t.childrenField], D);
          if (P) return P;
        }
      }
      return w.value.get(D) || null;
    }, y = (b) => b ? b[t.labelField] : "", m = (b) => b ? b[t.valueField] : "", _ = f(() => {
      if (t.multiple)
        return Array.isArray(l.value) ? l.value.map(
          (D) => h(t.items, D) || {
            [t.valueField]: D,
            [t.labelField]: D
          }
        ) : [];
      const b = l.value;
      return h(t.items, b) || null;
    }), O = f(() => t.multiple && Array.isArray(_.value) && _.value.length > 0), N = f(() => {
      if (!t.useInput || !c.value) return t.items;
      const b = c.value.toLowerCase();
      return t.items.filter((D) => (D[t.labelField] || "").toLowerCase().includes(b));
    }), V = f(() => {
      if (N.value.length === 0) {
        const b = !!n.empty;
        return [
          {
            [t.labelField]: n.empty?.() || "No results found",
            heading: !b,
            disabled: !0,
            value: "empty-state",
            class: b ? "" : "text-muted italic px-4 py-2"
          }
        ];
      }
      return Ne(N.value);
    }), L = f(() => typeof t.closeDropdownOnSelected == "boolean" ? t.closeDropdownOnSelected : !t.multiple), M = f(() => !(!t.clearable || !l.value || Array.isArray(l.value) && l.value.length === 0)), G = f(() => t.multiple ? !1 : _.value && !c.value && !d.value || !t.useInput), F = f(() => t.multiple && !t.useInput && O.value), W = f(
      () => Ve(n, ["default", "item", "item-content", "chip", "append", "no-option"])
    ), pe = f(() => ["n-input-combo", ...de(a.class)]), ue = f(() => {
      const {
        inputClass: b,
        popoverClass: D,
        listClass: I,
        valueClass: P,
        dropdownIcon: ae,
        dropdownIconClass: U,
        items: re,
        chipProps: Me,
        menuProps: Le,
        clearable: Ut,
        labelField: jt,
        childrenField: Kt,
        valueField: Bt,
        multiple: Ot,
        closeDropdownOnSelected: Nt,
        blurOnSelected: Gt,
        useInput: Zt,
        ...Ft
      } = t, xt = Object.fromEntries(Object.entries(a).filter(([bt]) => !bt.startsWith("on")));
      return {
        ...Ve(xt, ["class", "modelValue"]),
        ...Ve(Ft, ["modelValue", "modelModifiers"])
      };
    }), q = f(() => Ve(a, ["class", "style", "modelValue", "placeholder"])), ve = f(() => y(_.value) ? "" : a.placeholder || ""), Z = f(() => ["n-input-combo-value", ...de(t.valueClass)]), oe = f(() => p.value ? null : i.value);
    ge(r, (b, D, I) => {
      b && (k?.pause(), I(() => {
        document.activeElement === document.body && k?.focusContent(), k?.unpause();
      }));
    }), ge(
      () => t.items,
      (b) => {
        C(b);
      },
      { immediate: !0, deep: !0 }
    ), ge(
      () => l.value,
      (b) => {
        if (!t.multiple && t.fillInput) {
          const D = h(t.items, b);
          D ? c.value = t.fillInput === "value" ? m(D) : y(D) : c.value = "";
        }
      },
      { immediate: !0 }
    );
    const be = vn((b) => {
      e("filter", b);
    }, t.debounce);
    function Ie(b) {
      b.key === "ArrowDown" ? (b.preventDefault(), De(b.target)) : b.key === "ArrowUp" ? (b.preventDefault(), Pe(b.target)) : b.key === "Escape" ? (b.preventDefault(), b.stopPropagation(), pt()) : b.key === "ArrowLeft" && (b.preventDefault(), i.value?.focus());
    }
    function De(b) {
      let D = b.nextElementSibling;
      for (; D; ) {
        if (D.getAttribute("tabindex") === "0") {
          D.focus();
          return;
        }
        D = D.nextElementSibling;
      }
    }
    function Pe(b) {
      let D = b.previousElementSibling;
      for (; D; ) {
        if (D.getAttribute("tabindex") === "0") {
          D.focus();
          return;
        }
        D = D.previousElementSibling;
      }
      i.value?.focus();
    }
    function Ne(b) {
      return b.map((D) => {
        const I = !!D.heading, P = !!D.disabled, ae = ke(D), U = D[t.childrenField], re = U && Array.isArray(U) ? Ne(U) : void 0;
        return {
          ...D,
          [t.childrenField]: re,
          class: de(D.class, ae ? "n-list-item--active" : ""),
          tabindex: I || P ? void 0 : "0",
          onKeydown: (Me) => {
            I || P || Ie(Me);
          },
          onMousedown: (Me) => {
            (I || P) && Me.preventDefault();
          }
        };
      });
    }
    function ke(b) {
      const D = b[t.valueField];
      return t.multiple && Array.isArray(l.value) ? l.value.includes(D) : l.value === D;
    }
    function Ae(b) {
      const D = l.value;
      if (t.multiple && Array.isArray(D)) {
        const I = [...D];
        I.splice(Number(b), 1), l.value = I;
      }
    }
    function ce() {
      i.value?.focus(), r.value || (r.value = !0);
    }
    function He(b) {
      const D = b.target;
      c.value = D.value, r.value || (r.value = !0), t.debounce > 0 ? be(c.value) : e("filter", c.value);
    }
    function Ce() {
      d.value = !0;
    }
    function Qe() {
      d.value = !1;
    }
    function ft(b) {
      if (b.heading || b.disabled) return;
      const D = b[t.valueField];
      if (t.multiple) {
        const I = Array.isArray(l.value) ? [...l.value] : [], P = I.indexOf(D);
        P > -1 ? I.splice(P, 1) : I.push(D), l.value = I, c.value = "";
      } else
        l.value = D, c.value = t.fillInput === "value" ? m(b) : y(b), t.fillInput && ye(() => {
          i.value?.dispatchEvent(new Event("change", { bubbles: !0 }));
        });
      L.value && pt(), t.blurOnSelected && i.value?.blur();
    }
    function yt() {
      l.value = t.multiple ? [] : void 0, c.value = "", e("clear");
    }
    function et() {
      if (t.multiple && c.value === "" && Array.isArray(l.value) && l.value.length > 0) {
        const b = [...l.value];
        b.pop(), l.value = b;
      }
    }
    function Tt() {
      r.value && N.value.length > 0 ? ft(N.value[0]) : r.value || (r.value = !0);
    }
    async function pt() {
      p.value = !0, r.value = !1, await ye(), p.value = !1;
    }
    function E(b) {
      r.value && (b.stopPropagation(), pt());
    }
    function J() {
      r.value || (r.value = !0), ye(() => {
        if (!u.value) return;
        const D = document.getElementById(g);
        if (!D) return;
        const I = D.querySelector('[tabindex="0"]');
        I && I.focus();
      });
    }
    return (b, D) => (v(), S(zt, Y(ue.value, { class: pe.value }), wt({
      default: R(({ inputId: I }) => [
        K("div", {
          class: "n-input-combo-display-container",
          onClick: ce
        }, [
          O.value ? (v(), B("div", bs, [
            (v(!0), B(ne, null, le(_.value, (P, ae) => $(b.$slots, "chip", {
              key: m(P),
              item: P,
              index: ae,
              remove: () => Ae(ae)
            }, () => [
              X(Xa, Y({
                label: y(P),
                removable: ""
              }, { ref_for: !0 }, t.chipProps, {
                onRemove: (U) => Ae(ae),
                onClick: D[0] || (D[0] = Ee(() => {
                }, ["stop"]))
              }), null, 16, ["label", "onRemove"])
            ])), 128))
          ])) : A("", !0),
          G.value ? (v(), B("span", {
            key: 1,
            class: T(Z.value)
          }, ie(y(_.value)), 3)) : A("", !0),
          K("input", Y({
            id: I,
            ref_key: "inputRef",
            ref: i,
            name: t.name,
            disabled: t.disabled,
            readonly: !t.useInput || t.readonly,
            type: "text",
            class: ["n-input-combo-input", t.inputClass, F.value ? "sr-only" : ""],
            value: c.value,
            autocomplete: "off",
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-haspopup": "menu",
            placeholder: ve.value,
            "aria-expanded": r.value,
            "aria-controls": g
          }, q.value, {
            onInput: He,
            onFocus: Ce,
            onBlur: Qe,
            onKeydown: [
              Ze(Ee(J, ["prevent"]), ["down"]),
              Ze(Ee(Tt, ["prevent"]), ["enter"]),
              Ze(et, ["backspace"]),
              Ze(E, ["esc"])
            ]
          }), null, 16, ks)
        ]),
        !t.disabled && !t.loading ? (v(), S(ht, Y({
          key: 0,
          id: g,
          ref_key: "menuRef",
          ref: u,
          modelValue: r.value,
          "onUpdate:modelValue": D[1] || (D[1] = (P) => r.value = P),
          class: ["n-input-combo-menu", t.popoverClass],
          fit: "",
          items: V.value,
          "content-field": t.labelField,
          "children-field": t.childrenField,
          "value-field": t.valueField,
          "hover-trigger-anchor": i.value,
          "focus-trigger-anchor": oe.value
        }, t.menuProps, { onSelect: ft }), wt({ _: 2 }, [
          b.$slots.item ? {
            name: "item",
            fn: R((P) => [
              $(b.$slots, "item", { item: P })
            ]),
            key: "0"
          } : void 0,
          b.$slots["item-content"] ? {
            name: "item-content",
            fn: R((P) => [
              $(b.$slots, "item-content", { item: P })
            ]),
            key: "1"
          } : void 0
        ]), 1040, ["modelValue", "class", "items", "content-field", "children-field", "value-field", "hover-trigger-anchor", "focus-trigger-anchor"])) : A("", !0)
      ]),
      append: R(() => [
        M.value ? (v(), S(z, {
          key: 0,
          name: "mdi-close",
          class: "cursor-pointer hover:text-error transition-colors",
          onClick: Ee(yt, ["stop"])
        })) : A("", !0),
        X(z, {
          name: t.dropdownIcon,
          class: T([t.dropdownIconClass, r.value ? "rotate-180" : ""])
        }, null, 8, ["name", "class"]),
        $(b.$slots, "append")
      ]),
      _: 2
    }, [
      le(W.value, (I, P) => ({
        name: P,
        fn: R((ae) => [
          $(b.$slots, P, Ye(Ke(ae)))
        ])
      }))
    ]), 1040, ["class"]));
  }
}), Cs = ["id", "name", "multiple", "disabled"], al = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NInputSelect",
  props: /* @__PURE__ */ me({
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
  setup(o) {
    const s = $e(), t = se(), e = o, n = he(o, "modelValue"), a = f({
      get: () => {
        if (e.multiple) {
          if (!n.value) return [];
          if (Array.isArray(n.value)) return n.value;
          try {
            const p = JSON.parse(n.value);
            return Array.isArray(p) ? p : [];
          } catch {
            return [];
          }
        }
        return n.value;
      },
      set: (p) => {
        n.value = p;
      }
    }), l = f(() => Ve(s, ["default", "append"])), c = f(() => [
      "n-input-select",
      e.showCheckmark ? "" : "n-input-select--no-checkmark",
      ...de(t.class)
    ]), r = f(() => {
      const {
        inputClass: p,
        dropdownIcon: g,
        dropdownIconClass: w,
        formatOption: k,
        formatOptGroup: C,
        multiple: h,
        options: y,
        modelValue: m,
        modelModifiers: _,
        showCheckmark: O,
        ...N
      } = e;
      return { ...N, style: t.style };
    }), i = f(() => Ve(t, ["class", "style"])), u = (p) => p.map((g) => {
      if ("options" in g) {
        const w = g, { label: k, options: C, ...h } = w, y = C?.map((m) => {
          const { label: _, value: O, ...N } = m;
          return j(
            "option",
            {
              value: O,
              label: typeof e.formatOption == "function" ? e.formatOption(_) : _,
              ...N
            },
            _
          );
        }) ?? [];
        return j(
          "optgroup",
          {
            label: typeof e.formatOptGroup == "function" ? e.formatOptGroup(k) : k,
            ...h
          },
          y
        );
      } else {
        const w = g, { label: k, value: C, ...h } = w;
        return j(
          "option",
          {
            value: C,
            label: typeof e.formatOption == "function" ? e.formatOption(k) : k,
            ...h
          },
          k
        );
      }
    }), d = f(() => e.options && e.options.length ? u(e.options) : we(s.default?.() ?? [], "option"));
    return (p, g) => (v(), S(zt, Y({
      modelValue: n.value,
      "onUpdate:modelValue": g[1] || (g[1] = (w) => n.value = w),
      class: c.value
    }, r.value), wt({
      default: R(({ inputId: w }) => [
        qe(K("select", Y({
          id: w,
          "onUpdate:modelValue": g[0] || (g[0] = (k) => a.value = k),
          name: e.name,
          multiple: e.multiple,
          disabled: e.disabled,
          size: 1,
          class: ["peer", e.inputClass]
        }, i.value), [
          (v(!0), B(ne, null, le(d.value, (k, C) => (v(), S(H(k), { key: C }))), 128))
        ], 16, Cs), [
          [Pn, a.value]
        ])
      ]),
      append: R(() => [
        X(z, {
          name: e.dropdownIcon,
          class: T([e.dropdownIconClass, "n-input-select-dropdown-icon"]),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"]),
        $(p.$slots, "append")
      ]),
      _: 2
    }, [
      le(l.value, (w, k) => ({
        name: k,
        fn: R((C) => [
          $(p.$slots, k, Ye(Ke(C)))
        ])
      }))
    ]), 1040, ["modelValue", "class"]));
  }
}), ws = ["id", "name", "type", "disabled", "readonly"], sl = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NInputText",
  props: /* @__PURE__ */ me({
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
  setup(o) {
    const s = $e(), t = se(), e = o, n = he(o, "modelValue"), a = te(n.value), l = f(() => Ve(s, ["default"])), c = f(() => ["n-input-text", ...de(t.class)]), r = f(() => {
      const { type: p, inputClass: g, modelValue: w, modelModifiers: k, debounce: C, ...h } = e;
      return { ...h, style: t.style };
    }), i = f(() => Ve(t, ["class", "style"])), u = vn((p) => {
      n.value = p;
    }, e.debounce);
    ge(
      () => n.value,
      (p) => {
        p !== a.value && (a.value = p);
      }
    );
    function d() {
      e.debounce > 0 ? u(a.value) : n.value = a.value;
    }
    return (p, g) => (v(), S(zt, Y({
      modelValue: a.value,
      "onUpdate:modelValue": g[1] || (g[1] = (w) => a.value = w),
      class: c.value
    }, r.value), wt({
      default: R(({ inputId: w }) => [
        qe(K("input", Y({
          id: w,
          "onUpdate:modelValue": g[0] || (g[0] = (k) => a.value = k),
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          readonly: e.readonly,
          class: ["peer", e.inputClass]
        }, i.value, { onInput: d }), null, 16, ws), [
          [dn, a.value]
        ])
      ]),
      _: 2
    }, [
      le(l.value, (w, k) => ({
        name: k,
        fn: R((C) => [
          $(p.$slots, k, Ye(Ke(C)))
        ])
      }))
    ]), 1040, ["modelValue", "class"]));
  }
}), $s = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NList",
  props: {
    tag: { default: "ul" },
    items: {},
    valueField: { default: "value" },
    childrenField: { default: "children" },
    contentField: { default: "content" }
  },
  setup(o) {
    const s = $e(), t = se(), e = o, { transformedNodes: n } = Mn(s), a = f(() => ["n-list"]), l = f(() => ({ ...t })), c = f(() => e.items ? r(e.items) : n.value);
    function r(i) {
      return i.length === 0 ? [
        s.empty ? j(ne, null, s.empty({ items: i }) ?? []) : j(Je, { key: "empty" }, () => s["empty-content"]?.() ?? "No item found.")
      ] : i.map((u) => {
        const d = u[e.contentField], p = u[e.childrenField], g = { ...u };
        delete g[e.contentField], delete g[e.childrenField];
        const w = u?.[e.valueField] || _e(), k = p && Array.isArray(p) && p.length > 0 ? j($s, {
          items: p,
          tag: e.tag,
          valueField: e.valueField,
          childrenField: e.childrenField,
          contentField: e.contentField,
          class: "w-full pl-4"
        }) : null;
        if (s.item)
          return j(ne, { key: w }, s.item({ ...u, childrenNodes: k }) ?? []);
        const C = { key: w, ...g }, h = {
          default: () => s["item-content"]?.(u) ?? d
        };
        if (k)
          if (C.expandable)
            h.content = () => k;
          else {
            const y = h.default;
            h.default = () => [y(), k];
          }
        return j(Je, C, h);
      });
    }
    return (i, u) => (v(), S(H(e.tag), Y({ class: a.value }, l.value, { role: "list" }), {
      default: R(() => [
        (v(!0), B(ne, null, le(c.value, (d, p) => (v(), S(H(d), {
          key: d?.key || p
        }))), 128))
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), Is = ["value", "name"], Ss = { class: "n-radio-display" }, _s = {
  key: 3,
  class: "n-radio-overlay"
}, Ds = {
  key: 1,
  class: "n-radio-message"
}, ll = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NRadio",
  props: /* @__PURE__ */ me({
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
  setup(o) {
    const s = $e(), t = se(), e = o, n = he(o, "modelValue"), a = `input-id-${_e()}`, l = f(() => ["n-radio"]), c = f(() => ["n-radio-container"]), r = f(() => ["n-radio-wrapper", e.size ? `n-radio--${e.size}` : ""]), i = f(() => ["n-radio-label"]), u = f(() => de(e.iconClass, e.prependIconClass)), d = f(() => {
      const { class: C, style: h } = t;
      return { class: C, style: h };
    }), p = f(() => {
      const { class: C, style: h, ...y } = t;
      return y;
    }), g = f(() => ({
      ...e,
      inputId: a,
      modelValue: n.value
    })), w = f(() => we(s.before?.(g.value) ?? [], "span")), k = f(() => we(s.after?.(g.value) ?? [], "span"));
    return (C, h) => (v(), B("div", {
      class: T(r.value)
    }, [
      (v(!0), B(ne, null, le(w.value, (y, m) => (v(), S(H(y), { key: m }))), 128)),
      K("div", {
        class: T(c.value)
      }, [
        !e.inlineLabel && (e.label || C.$slots.label) ? $(C.$slots, "label", { key: 0 }, () => [
          K("label", {
            class: T(i.value),
            for: a
          }, ie(e.label), 3)
        ]) : A("", !0),
        $(C.$slots, "top"),
        (v(), S(H(e.tag), Y({ class: l.value }, d.value), {
          default: R(() => [
            $(C.$slots, "prepend"),
            e.prependIcon || e.icon ? (v(), S(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: T(u.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : A("", !0),
            qe(K("input", Y({
              id: a,
              "onUpdate:modelValue": h[0] || (h[0] = (y) => n.value = y),
              value: e.value,
              name: e.name,
              type: "radio",
              class: ["peer", e.inputClass]
            }, p.value), null, 16, Is), [
              [Hn, n.value]
            ]),
            K("div", Ss, [
              X(z, {
                name: e.uncheckedIcon,
                class: T(["n-radio-display-unchecked", e.uncheckedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"]),
              X(z, {
                name: e.checkedIcon,
                class: T(["n-radio-display-checked", e.checkedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])
            ]),
            $(C.$slots, "default", Ye(Ke(g.value))),
            e.inlineLabel && (e.label || C.$slots.label) ? $(C.$slots, "inlineLabel", { key: 1 }, () => [
              K("label", {
                class: T(i.value),
                for: a
              }, ie(e.label), 3)
            ]) : A("", !0),
            e.appendIcon ? (v(), S(z, {
              key: 2,
              name: e.appendIcon,
              class: T(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : A("", !0),
            $(C.$slots, "append"),
            C.$slots.overlay ? (v(), B("div", _s, [
              $(C.$slots, "overlay")
            ])) : A("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        $(C.$slots, "dropdown"),
        $(C.$slots, "bottom"),
        e.message || e.helperText ? (v(), B("div", Ds, ie(e.message || e.helperText), 1)) : A("", !0)
      ], 2),
      (v(!0), B(ne, null, le(k.value, (y, m) => (v(), S(H(y), { key: m }))), 128))
    ], 2));
  }
}), As = { key: 1 }, ol = /* @__PURE__ */ Q({
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
  setup(o) {
    const s = $e(), t = se(), e = o, n = f(() => ["n-tab", e.loading ? "n-tab--loading" : ""]), a = f(() => e.to ? "RouterLink" : e.href ? "a" : e.tag), l = f(() => de(e.iconClass, e.prependIconClass)), c = f(() => {
      const i = { ...t };
      return a.value === "RouterLink" ? (i.to = e.to, i.target = e.target) : a.value === "a" && (i.href = e.href, i.target = e.target), i;
    }), r = f(() => we(s.default?.() ?? [], "span"));
    return (i, u) => (v(), S(H(a.value), Y({
      class: n.value,
      type: e.type,
      disabled: fe(t).disabled || e.loading,
      "aria-disabled": fe(t).disabled || e.loading ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, c.value), {
      default: R(() => [
        $(i.$slots, "loading", {}, () => [
          X(Se, { name: "n-loading-overlay" }, {
            default: R(() => [
              e.loading ? (v(), S(dt, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: T(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : A("", !0)
            ]),
            _: 1
          })
        ]),
        $(i.$slots, "prepend"),
        e.prependIcon || e.icon ? (v(), S(z, {
          key: 0,
          name: e.prependIcon || e.icon,
          class: T(l.value),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : A("", !0),
        e.label ? (v(), B("span", As, ie(e.label), 1)) : A("", !0),
        (v(!0), B(ne, null, le(r.value, (d, p) => (v(), S(H(d), { key: p }))), 128)),
        e.appendIcon ? (v(), S(z, {
          key: 2,
          name: e.appendIcon,
          class: T(e.appendIconClass),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : A("", !0),
        $(i.$slots, "append")
      ]),
      _: 3
    }, 16, ["class", "type", "disabled", "aria-disabled", "aria-busy"]));
  }
}), rl = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NTabs",
  props: /* @__PURE__ */ me({
    tag: { default: "div" },
    multiple: { type: Boolean, default: !1 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const s = $e(), t = se(), e = he(o, "modelValue"), n = o, a = _e(), l = te([]), c = te(null), r = f(() => e.value !== void 0 && e.value !== null), i = f(() => p.value.some((m) => g(m))), u = f(() => ["n-tabs"]), d = f(() => ({
      ...t
    })), p = f(() => {
      const m = s.default?.() ?? [];
      return !m || m.length === 0 ? [] : (Array.isArray(m) ? m : [m]).map((N) => kt(N, "NTab") ? N : null).filter((N) => !!N);
    });
    function g(m) {
      return !r.value || !m.props?.name ? !1 : n.multiple && Array.isArray(e.value) ? e.value.includes(m.props?.name) : m.props?.name === e.value;
    }
    function w(m, _) {
      return !r.value || g(m) || !i.value && _ === 0 ? 0 : -1;
    }
    function k(m, _) {
      return m.props?.id || `n-tab-${a}-${_}`;
    }
    function C(m, _) {
      m && (l.value[_] = m.$el || m);
    }
    function h(m) {
      if (!(!r.value || !m.props?.name))
        if (n.multiple && Array.isArray(e.value)) {
          const _ = e.value.indexOf(m.props?.name);
          _ >= 0 ? e.value = e.value.toSpliced(_, 1) : e.value = [...e.value, m.props?.name];
        } else
          e.value = m.props?.name ?? "";
    }
    function y(m) {
      const _ = l.value.filter(
        (L) => !L.hasAttribute("disabled") && L.getAttribute("aria-disabled") !== "true"
      );
      if (_.length === 0) return;
      const O = document.activeElement, N = _.indexOf(O);
      let V = -1;
      switch (m.key) {
        case "ArrowRight":
        case "ArrowDown":
          V = (N + 1) % _.length, m.preventDefault();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          V = (N - 1 + _.length) % _.length, m.preventDefault();
          break;
        case "Home":
          V = 0, m.preventDefault();
          break;
        case "End":
          V = _.length - 1, m.preventDefault();
          break;
      }
      V !== -1 && (_[V].focus(), r.value && !n.multiple && _[V].click());
    }
    return (m, _) => (v(), S(H(n.tag), Y({
      ref_key: "tabListRef",
      ref: c,
      class: u.value
    }, d.value, {
      role: r.value ? "tablist" : "group",
      onKeydown: y
    }), {
      default: R(() => [
        (v(!0), B(ne, null, le(p.value, (O, N) => (v(), S(H(O), {
          key: N,
          id: k(O, N),
          ref_for: !0,
          ref: (V) => C(V, N),
          class: T([g(O) ? "n-tab--active" : ""]),
          role: r.value ? "tab" : void 0,
          "aria-selected": r.value ? g(O) ? "true" : "false" : void 0,
          tabindex: w(O, N),
          onClick: () => h(O)
        }, null, 8, ["id", "class", "role", "aria-selected", "tabindex", "onClick"]))), 128))
      ]),
      _: 1
    }, 16, ["class", "role"]));
  }
}), Ms = ["name", ".indeterminate"], Ts = { class: "n-toggle-track" }, Bs = { class: "n-toggle-thumb" }, Os = {
  key: 3,
  class: "n-toggle-overlay"
}, Ns = {
  key: 1,
  class: "n-toggle-message"
}, il = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NToggle",
  props: /* @__PURE__ */ me({
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
  setup(o) {
    const s = $e(), t = se(), e = o, [n, a] = he(o, "modelValue"), l = `input-id-${_e()}`, c = f(() => de(e.iconClass, e.prependIconClass)), r = f(() => ["n-toggle"]), i = f(() => ["n-toggle-container"]), u = f(() => ["n-toggle-wrapper", e.size ? `n-toggle--${e.size}` : ""]), d = f(() => ["n-toggle-label"]), p = f(() => {
      const { class: h, style: y } = t;
      return { class: h, style: y };
    }), g = f(() => {
      const { class: h, style: y, ...m } = t;
      return m;
    }), w = f(() => ({
      ...e,
      modifiers: a,
      inputId: l,
      modelValue: n.value
    })), k = f(() => we(s.before?.(w.value) ?? [], "span")), C = f(() => we(s.after?.(w.value) ?? [], "span"));
    return (h, y) => (v(), B("div", {
      class: T(u.value)
    }, [
      (v(!0), B(ne, null, le(k.value, (m, _) => (v(), S(H(m), { key: _ }))), 128)),
      K("div", {
        class: T(i.value)
      }, [
        !e.inlineLabel && (e.label || h.$slots.label) ? $(h.$slots, "label", { key: 0 }, () => [
          K("label", {
            class: T(d.value),
            for: l
          }, ie(e.label), 3)
        ]) : A("", !0),
        $(h.$slots, "top"),
        (v(), S(H(e.tag), Y({ class: r.value }, p.value), {
          default: R(() => [
            $(h.$slots, "prepend"),
            e.prependIcon || e.icon ? (v(), S(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: T(c.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : A("", !0),
            qe(K("input", Y({
              id: l,
              "onUpdate:modelValue": y[0] || (y[0] = (m) => Yt(n) ? n.value = m : null),
              name: e.name,
              type: "checkbox",
              ".indeterminate": fe(n) === null,
              class: ["peer", e.inputClass]
            }, g.value), null, 48, Ms), [
              [cn, fe(n)]
            ]),
            K("div", Ts, [
              K("div", Bs, [
                X(z, {
                  name: e.uncheckedIcon,
                  class: T(["n-toggle-display-unchecked", e.uncheckedIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"]),
                X(z, {
                  name: e.checkedIcon,
                  class: T(["n-toggle-display-checked", e.checkedIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"]),
                X(z, {
                  name: e.indeterminateIcon,
                  class: T(["n-toggle-display-indeterminate", e.indeterminateIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"])
              ])
            ]),
            $(h.$slots, "default", Ye(Ke(w.value))),
            e.inlineLabel && (e.label || h.$slots.label) ? $(h.$slots, "inlineLabel", { key: 1 }, () => [
              K("label", {
                class: T(d.value),
                for: l
              }, ie(e.label), 3)
            ]) : A("", !0),
            e.appendIcon ? (v(), S(z, {
              key: 2,
              name: e.appendIcon,
              class: T(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : A("", !0),
            $(h.$slots, "append"),
            h.$slots.overlay ? (v(), B("div", Os, [
              $(h.$slots, "overlay")
            ])) : A("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        $(h.$slots, "dropdown"),
        $(h.$slots, "bottom"),
        e.message || e.helperText ? (v(), B("div", Ns, ie(e.message || e.helperText), 1)) : A("", !0)
      ], 2),
      (v(!0), B(ne, null, le(C.value, (m, _) => (v(), S(H(m), { key: _ }))), 128))
    ], 2));
  }
}), Fs = ["innerHTML"], xs = {
  key: 0,
  class: "n-tooltip-overlay",
  "aria-hidden": "true"
}, Ls = ["innerHTML"], Rs = ["innerHTML"], Es = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NTooltip",
  props: /* @__PURE__ */ me({
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
  setup(o, { expose: s }) {
    const t = se(), e = o, n = he(o, "modelValue"), a = We("contentRef"), { isReady: l } = Mt("n-tooltips-container"), c = te(null), r = te(null), i = f(() => r.value || c.value), u = () => {
      e.attachParent ? r.value = _t(e.attachParent) : r.value = null;
    }, d = f(() => `${e.direction}${e.position !== "" ? `-${e.position}` : ""}`), p = f(() => ({
      ...e,
      hoverTriggerAnchor: e.triggerByHover ? e.hoverTriggerAnchor : null,
      focusTriggerAnchor: e.triggerByFocus ? e.focusTriggerAnchor : null,
      clickTriggerAnchor: e.triggerByInteraction ? e.clickTriggerAnchor : null
    })), {
      show: g,
      hide: w,
      handleContentHoverFocusIn: k,
      handleContentHoverFocusOut: C,
      compStyles: h,
      placement: y,
      parentWidth: m
    } = An(p, {
      model: f({
        get: () => n.value,
        set: (V) => {
          n.value = V;
        }
      }),
      contentRef: a,
      attachParentEl: i,
      placement: d
    }), _ = f(() => {
      const V = { ...h.value };
      return e.fit && (V.width = `${m.value}px`), V;
    }), O = f(() => ["n-tooltip", `n-tooltip--direction-${y.value}`]), N = f(() => {
      const {
        tag: V,
        content: L,
        showDelay: M,
        hideDelay: G,
        persistent: F,
        hoverTriggerAnchor: W,
        focusTriggerAnchor: pe,
        clickTriggerAnchor: ue,
        attachParent: q,
        triggerByHover: ve,
        triggerByFocus: Z,
        triggerByInteraction: oe,
        allowClickToHide: be,
        direction: Ie,
        position: De,
        margin: Pe,
        offset: Ne,
        autoReposition: ke,
        stacked: Ae,
        overlay: ce,
        fit: He,
        role: Ce,
        ...Qe
      } = e;
      return {
        style: _.value,
        onMouseenter: k,
        onMouseleave: C,
        onFocusin: k,
        onFocusout: C,
        ...Qe,
        ...t
      };
    });
    return pn(() => {
      c.value = mn(), u();
    }), ge(() => e.attachParent, u), s({ show: g, hide: w, contentRef: a }), (V, L) => e.stacked ? (v(), S(Se, {
      key: 0,
      name: "n-tooltip"
    }, {
      default: R(() => [
        n.value ? (v(), S(H(e.tag), Y({
          key: 0,
          ref_key: "contentRef",
          ref: a,
          class: O.value,
          role: e.role
        }, N.value), {
          default: R(() => [
            $(V.$slots, "default", {}, () => [
              e.content ? (v(), B("span", {
                key: 0,
                innerHTML: e.content
              }, null, 8, Fs)) : A("", !0)
            ])
          ]),
          _: 3
        }, 16, ["class", "role"])) : A("", !0)
      ]),
      _: 3
    })) : fe(l) ? (v(), S(St, {
      key: 1,
      to: "#n-tooltips-container"
    }, [
      X(Se, {
        name: e.overlay ? "n-tooltip-overlay" : "n-tooltip"
      }, {
        default: R(() => [
          n.value && e.overlay ? (v(), B("div", xs, [
            (v(), S(H(e.tag), Y({
              ref_key: "contentRef",
              ref: a,
              class: O.value,
              role: e.role
            }, N.value), {
              default: R(() => [
                $(V.$slots, "default", {}, () => [
                  e.content ? (v(), B("span", {
                    key: 0,
                    innerHTML: e.content
                  }, null, 8, Ls)) : A("", !0)
                ])
              ]),
              _: 3
            }, 16, ["class", "role"]))
          ])) : n.value ? (v(), S(H(e.tag), Y({
            key: 1,
            ref_key: "contentRef",
            ref: a,
            class: O.value,
            role: e.role
          }, N.value), {
            default: R(() => [
              $(V.$slots, "default", {}, () => [
                e.content ? (v(), B("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, Rs)) : A("", !0)
              ])
            ]),
            _: 3
          }, 16, ["class", "role"])) : A("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ])) : A("", !0);
  }
}), ul = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NHeader",
  props: {
    tag: { default: "header" }
  },
  setup(o) {
    const s = se(), t = o, e = f(() => ["n-header"]), n = f(() => ({
      ...s
    }));
    return (a, l) => (v(), S(H(t.tag), Y({ class: e.value }, n.value), {
      default: R(() => [
        $(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), cl = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NFooter",
  props: {
    tag: { default: "footer" }
  },
  setup(o) {
    const s = se(), t = o, e = f(() => ["n-footer"]), n = f(() => ({
      ...s
    }));
    return (a, l) => (v(), S(H(t.tag), Y({ class: e.value }, n.value), {
      default: R(() => [
        $(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Vs = () => {
  const o = "n-tooltips-container";
  if (!document.getElementById(o)) {
    const s = document.createElement("div");
    s.id = o, document.body.appendChild(s);
  }
}, Tn = (o, s) => {
  const t = s.value;
  if (!t)
    return;
  Vs();
  const n = Object.keys(s.modifiers).find((r) => ["top", "bottom", "left", "right"].includes(r)) || "bottom", l = X(Es, {
    content: t,
    direction: n,
    attachParent: o,
    hoverTriggerAnchor: o,
    focusTriggerAnchor: o
  }), c = document.createElement("div");
  document.body.appendChild(c), je(l, c), o._tooltip = {
    vnode: l,
    container: c
  };
}, Bn = (o) => {
  o._tooltip && (je(null, o._tooltip.container), o._tooltip.container.remove(), delete o._tooltip);
}, Ps = (o, s) => {
  if (o._tooltip && o._tooltip.vnode.component) {
    const { props: t } = o._tooltip.vnode.component;
    t.content = s.value;
    const e = Object.keys(s.modifiers);
    t.direction = e.find((n) => ["top", "bottom", "left", "right"].includes(n)) || "bottom";
  } else
    Bn(o), Tn(o, s);
}, dl = {
  mounted(o, s) {
    Tn(o, s);
  },
  updated(o, s) {
    Ps(o, s);
  },
  unmounted(o) {
    Bn(o);
  }
};
export {
  Ks as NAvatar,
  gn as NBanner,
  Pt as NButton,
  Gs as NCalendar,
  za as NCard,
  Zs as NCheckbox,
  Xa as NChip,
  Xs as NDrawer,
  cl as NFooter,
  Js as NForm,
  ul as NHeader,
  z as NIcon,
  qs as NImage,
  nl as NInputCombo,
  zt as NInputField,
  al as NInputSelect,
  sl as NInputText,
  $s as NList,
  Je as NListItem,
  dt as NLoading,
  ht as NMenu,
  Dn as NModal,
  ys as NPopover,
  ll as NRadio,
  ol as NTab,
  rl as NTabs,
  ds as NToast,
  il as NToggle,
  Es as NTooltip,
  _n as useComponentStack,
  Qs as useDialog,
  An as useFloating,
  Sn as useFocusable,
  Mn as useMenuTransform,
  el as useModal,
  tl as useNotify,
  hn as usePausableTimer,
  Mt as useTeleportContainer,
  dl as vTooltip
};
