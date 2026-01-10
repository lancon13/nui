import { defineComponent as Q, useAttrs as ae, getCurrentInstance as Qe, computed as i, createBlock as $, openBlock as c, resolveDynamicComponent as L, mergeProps as H, withKeys as ze, withModifiers as Re, withCtx as O, renderSlot as w, h as K, Text as Jt, Comment as Qt, isVNode as It, createElementBlock as S, createVNode as X, normalizeProps as Ee, guardReactiveProps as Ye, useSlots as we, unref as de, createCommentVNode as _, Transition as $e, normalizeClass as M, toDisplayString as re, Fragment as te, renderList as le, createTextVNode as st, ref as ee, toValue as De, watch as ge, nextTick as ye, mergeModels as me, useModel as ve, useTemplateRef as Pe, onMounted as en, Teleport as dt, toRefs as bn, createElementVNode as U, shallowRef as Rt, withDirectives as Ke, provide as kn, onUnmounted as tn, normalizeStyle as ft, render as He, getCurrentScope as Cn, onScopeDispose as wn, isRef as At, vModelDynamic as nn, createSlots as ct, vModelSelect as In, inject as $n, vModelCheckbox as an, vModelRadio as An } from "vue";
import { useFloating as _n, autoUpdate as Tn, offset as Ft, flip as Bn, shift as Dn } from "@floating-ui/vue";
import { useEventListener as qe, useTimeoutFn as Ot, useElementSize as Mn, toArray as Sn, unrefElement as xn, tryOnScopeDispose as Nn, useDebounceFn as ln, useIntersectionObserver as Rn } from "@vueuse/core";
import { toClassName as Fn, generatePseudoRandomKey as Ae, delay as Vt } from "@nui/helpers";
import * as Et from "dayjs";
import * as Pt from "dayjs/plugin/advancedFormat";
import * as Lt from "dayjs/plugin/isoWeek";
import * as Ht from "dayjs/plugin/isSameOrAfter";
import * as Yt from "dayjs/plugin/isSameOrBefore";
import * as Wt from "dayjs/plugin/localeData";
import * as zt from "dayjs/plugin/updateLocale";
import * as jt from "dayjs/plugin/weekday";
import * as Kt from "dayjs/plugin/weekOfYear";
import * as Ut from "dayjs/plugin/isLeapYear";
import * as Gt from "dayjs/plugin/isoWeeksInYear";
import { vOnClickOutside as On } from "@vueuse/components";
import { createFocusTrap as Vn } from "focus-trap";
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
  setup(s) {
    const o = ae(), t = Qe(), e = s, n = i(() => !e.disabled && (e.to || e.href || !!o.onClick)), a = i(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), l = i(() => {
      const p = e.name || "mdi-account";
      return p.startsWith("mdi-") ? ["mdi", p] : ["mdi", `mdi-${p}`];
    }), f = i(() => [
      "n-icon",
      n.value ? "n-icon--clickable" : "",
      e.disabled ? "n-icon--disabled" : "",
      ...l.value
    ]), r = i(() => {
      const p = { ...o };
      return a.value === "RouterLink" ? (p.to = e.to, p.target = e.target) : a.value === "a" && (p.href = e.href, p.target = e.target), p;
    });
    function u(p) {
      if (e.disabled) {
        p.preventDefault(), p.stopPropagation();
        return;
      }
      n.value && t?.emit("click", p);
    }
    return (p, d) => (c(), $(L(a.value), H({
      class: f.value,
      role: n.value ? "button" : "img",
      tabindex: n.value ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, r.value, {
      onKeydown: ze(Re(u, ["prevent"]), ["enter", "space"])
    }), {
      default: O(() => [
        w(p.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
}), pt = (s, o) => {
  if (typeof document > "u") return null;
  const t = document;
  return typeof s == "string" ? t.querySelector(s) : s;
}, sn = (s = null) => {
  if (s)
    return pt(s)?.parentElement || null;
  const o = Qe();
  return o ? o.proxy?.$el?.parentElement || null : (console.warn("getParentElement() without a selector can only be used inside setup() or lifecycle hooks."), null);
}, En = (s) => {
  if (It(s) && s.type) {
    if (typeof s.type == "string")
      return s.type;
    if (typeof s.type == "object" && s.type !== null) {
      const o = s.type;
      return o.name || o.__name || o.__name__ || "";
    }
  }
  return "";
}, it = (s, o) => {
  const t = En(s);
  return t ? (Array.isArray(o) ? o : [o]).includes(t) : !1;
}, Pn = (s, o) => {
  if (!s.props || typeof s.props.class != "string")
    return !1;
  const t = s.props.class.split(/\s+/);
  return (Array.isArray(o) ? o : [o]).some((n) => t.includes(n));
};
function Ce(s, o = "span", t = {}) {
  return s ? (Array.isArray(s) ? s : [s]).map((n) => {
    if (typeof n == "string")
      return K(o, t, n);
    if ((n.type === Jt || n.type === Qt) && (n?.shapeFlag & 8) > 0) {
      const a = n.children;
      if (a?.trim())
        return K(o, t, a);
    }
    return n;
  }) : [];
}
function ce(...s) {
  const o = [];
  return s.forEach((t) => {
    t && (typeof t == "string" ? o.push(t) : Array.isArray(t) ? o.push(...t) : typeof t == "object" && o.push(t));
  }), o;
}
const Ln = {
  key: 0,
  class: "n-loading-overlay"
}, et = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NLoading",
  props: {
    name: {},
    class: {},
    overlay: { type: Boolean }
  },
  setup(s) {
    const o = ae(), t = s, e = i(() => ({
      name: t.name || "loading",
      class: t.class || "animate-spin",
      ...o
    }));
    return (n, a) => t.overlay ? (c(), S("span", Ln, [
      X(z, Ee(Ye(e.value)), null, 16)
    ])) : (c(), $(z, Ee(H({ key: 1 }, e.value)), null, 16));
  }
}), Hn = { key: 1 }, $t = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = s, n = i(() => ["n-button", e.loading ? "n-button--loading" : ""]), a = i(() => e.to ? "RouterLink" : e.href ? "a" : e.tag), l = i(() => {
      const r = { ...t };
      return a.value === "RouterLink" ? (r.to = e.to, r.target = e.target) : a.value === "a" && (r.href = e.href, r.target = e.target), r;
    }), f = i(() => Ce(o.default?.() ?? [], "span"));
    return (r, u) => (c(), $(L(a.value), H({
      class: n.value,
      type: e.type,
      disabled: de(t).disabled || e.loading,
      "aria-disabled": de(t).disabled || e.loading ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, l.value), {
      default: O(() => [
        w(r.$slots, "loading", {}, () => [
          X($e, { name: "n-loading-overlay" }, {
            default: O(() => [
              e.loading ? (c(), $(et, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: M(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : _("", !0)
            ]),
            _: 1
          })
        ]),
        w(r.$slots, "prepend"),
        e.prependIcon || e.icon ? (c(), $(z, {
          key: 0,
          name: e.prependIcon || e.icon,
          class: M([
            ...e.iconClass ? ["string", "object"].includes(typeof e.iconClass) ? [e.iconClass] : e.iconClass : [],
            ...e.prependIconClass ? ["string", "object"].includes(typeof e.prependIconClass) ? [e.prependIconClass] : e.prependIconClass : []
          ]),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : _("", !0),
        e.label ? (c(), S("span", Hn, re(e.label), 1)) : _("", !0),
        (c(!0), S(te, null, le(f.value, (p, d) => (c(), $(L(p), { key: d }))), 128)),
        e.appendIcon ? (c(), $(z, {
          key: 2,
          name: e.appendIcon,
          class: M(e.appendIconClass),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : _("", !0),
        w(r.$slots, "append")
      ]),
      _: 3
    }, 16, ["class", "type", "disabled", "aria-disabled", "aria-busy"]));
  }
}), Yn = ["aria-hidden"], Wn = {
  key: 2,
  class: "n-avatar-sizer",
  "aria-hidden": "true"
}, zn = ["src", "alt"], vl = /* @__PURE__ */ Q({
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
  setup(s, { emit: o }) {
    const t = ae(), e = s, n = o, a = i(() => !e.disabled && (e.to || e.href || !!t.onClick)), l = i(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), f = i(() => ["n-avatar", a.value ? "n-avatar--clickable" : "", e.disabled ? "n-avatar--disabled" : ""]), r = i(() => {
      const p = { ...t };
      return l.value === "RouterLink" ? (p.to = e.to, p.target = e.target) : l.value === "a" && (p.href = e.href, p.target = e.target), p;
    });
    function u(p) {
      if (e.disabled) {
        p.preventDefault(), p.stopPropagation();
        return;
      }
      a.value && n("click", p);
    }
    return (p, d) => (c(), $(L(l.value), H({
      class: f.value,
      role: a.value && l.value === "span" ? "button" : void 0,
      tabindex: a.value && l.value === "span" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, r.value, {
      onClick: u,
      onKeydown: ze(Re(u, ["prevent"]), ["enter", "space"])
    }), {
      default: O(() => [
        e.icon ? (c(), $(z, {
          key: 0,
          name: e.icon,
          class: M({ "opacity-0": e.src }),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : e.label || p.$slots.default ? (c(), S("span", {
          key: 1,
          class: M(["n-avatar-label", { "opacity-0": e.src }]),
          "aria-hidden": e.src ? "true" : void 0
        }, [
          w(p.$slots, "default", {}, () => [
            st(re(e.label), 1)
          ])
        ], 10, Yn)) : (c(), S("span", Wn, " ")),
        e.src ? (c(), S("img", {
          key: 3,
          src: e.src,
          alt: e.alt || e.label || "",
          class: "n-avatar-image"
        }, null, 8, zn)) : _("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
}), jn = { key: 1 }, Kn = /* @__PURE__ */ Q({
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
  setup(s, { emit: o }) {
    const t = ae(), e = s, n = o, a = i(() => !e.disabled && (e.to || e.href || !!t.onClick)), l = i(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), f = i(() => ["n-chip", a.value ? "n-chip--clickable" : "", e.disabled ? "n-chip--disabled" : ""]), r = i(() => {
      const d = { ...t };
      return l.value === "RouterLink" ? (d.to = e.to, d.target = e.target) : l.value === "a" && (d.href = e.href, d.target = e.target), d;
    });
    function u() {
      n("remove");
    }
    function p(d) {
      if (e.disabled) {
        d.preventDefault(), d.stopPropagation();
        return;
      }
      a.value && n("click", d);
    }
    return (d, m) => (c(), $(L(l.value), H({
      class: f.value,
      role: a.value && l.value === "span" ? "button" : void 0,
      tabindex: a.value && l.value === "span" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, r.value, {
      onClick: p,
      onKeydown: ze(Re(p, ["prevent"]), ["enter", "space"])
    }), {
      default: O(() => [
        w(d.$slots, "prepend"),
        e.prependIcon || e.icon ? (c(), $(z, {
          key: 0,
          name: e.prependIcon || e.icon,
          "aria-hidden": "true"
        }, null, 8, ["name"])) : _("", !0),
        e.label || d.$slots.default ? (c(), S("span", jn, [
          w(d.$slots, "default", {}, () => [
            st(re(e.label), 1)
          ])
        ])) : _("", !0),
        e.appendIcon ? (c(), $(z, {
          key: 2,
          name: e.appendIcon,
          "aria-hidden": "true"
        }, null, 8, ["name"])) : _("", !0),
        w(d.$slots, "append"),
        e.removable ? w(d.$slots, "removable", { key: 3 }, () => [
          X(z, {
            name: "mdi-close",
            class: M(e.removableClass),
            clickable: "",
            onClick: Re(u, ["stop"])
          }, null, 8, ["class"])
        ]) : _("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
});
function on(s, o) {
  const { model: t, contentRef: e, attachParentEl: n, placement: a } = o, l = ee(!1), f = ee(!1), r = ee(!1), u = i(() => ({
    triggerByHover: !0,
    triggerByFocus: !0,
    triggerByInteraction: !0,
    ...De(s)
  }));
  qe(() => typeof document < "u" ? document : null, "mouseup", () => {
    f.value = !1;
  }), qe(() => typeof document < "u" ? document : null, "keyup", () => {
    f.value = !1;
  });
  const p = Ot(
    () => {
      J();
    },
    i(() => u.value.showDelay ?? 0),
    {
      immediate: !1
    }
  ), d = Ot(
    () => {
      document.activeElement !== De(h) && !l.value && pe();
    },
    i(() => u.value.hideDelay ?? 0),
    {
      immediate: !1
    }
  ), m = ee(null), h = ee(null), T = ee(null), { width: b, height: k } = Mn(n), {
    x: g,
    y: C,
    strategy: v,
    placement: B
  } = _n(n, e, {
    placement: a,
    whileElementsMounted: Tn,
    middleware: i(() => {
      const [Z, se] = u.value.offset ?? [0, 0], he = [Ft(u.value.margin), Ft({ crossAxis: Z, mainAxis: se })];
      return u.value.autoReposition && (he.push(Bn()), he.push(Dn({ padding: 8 }))), he;
    })
  }), N = i(() => ({
    position: v.value,
    top: C.value != null ? `${C.value}px` : "",
    left: g.value != null ? `${g.value}px` : ""
  })), F = () => {
    p.isPending.value && p.stop(), d.isPending.value && d.stop();
  }, E = (Z, se, he) => {
    Z && Object.entries(se).forEach(([Ie, _e]) => {
      he === "add" ? Z.addEventListener(Ie, _e) : Z.removeEventListener(Ie, _e);
    });
  };
  ge(
    () => [
      u.value.hoverTriggerAnchor,
      u.value.focusTriggerAnchor,
      u.value.clickTriggerAnchor,
      n.value
    ],
    () => {
      ye(() => {
        const Z = u.value, se = (ue) => ue ? pt(ue) : typeof ue > "u" ? n.value : null, he = se(Z.hoverTriggerAnchor), Ie = se(Z.focusTriggerAnchor), _e = se(Z.clickTriggerAnchor), Oe = {
          mouseenter: x,
          mouseleave: Y
        }, Me = {
          focus: x,
          blur: Y,
          mousedown: R,
          keydown: D
        }, be = {
          click: G
        }, Te = (ue, Ve, ke) => {
          ue.value !== Ve && (E(ue.value, ke, "remove"), ue.value = Ve, E(ue.value, ke, "add"));
        };
        Te(m, he, Oe), Te(h, Ie, Me), Te(T, _e, be);
      });
    },
    { deep: !0, immediate: !0, flush: "post" }
  );
  function R() {
    f.value = !0;
  }
  function D(Z) {
    (Z.key === "Enter" || Z.key === " ") && (f.value = !0);
  }
  function G(Z) {
    if (t.value) {
      if (u.value.allowClickToHide) {
        if (u.value.persistent) return;
        F(), pe();
      }
    } else
      d.isPending.value && d.stop(), p.start();
  }
  function x() {
    f.value || r.value || (d.isPending.value && d.stop(), p.isPending.value || p.start());
  }
  function Y(Z) {
    u.value.persistent || Z.type === "mouseleave" && !u.value.triggerByHover || (p.isPending.value && p.stop(), d.isPending.value || d.start());
  }
  function fe() {
    l.value = !0, d.isPending.value && d.stop();
  }
  function ie() {
    u.value.persistent || (l.value = !1, u.value.triggerByHover && (d.isPending.value || d.start()));
  }
  qe("keydown", (Z) => {
    t.value && Z.key === "Escape" && !u.value.persistent && (Z.preventDefault(), Z.stopPropagation(), pe());
  });
  const J = () => {
    t.value = !0;
  }, pe = (Z = !1) => {
    const se = e.value?.contains(document.activeElement);
    t.value = !1, !Z && se && ye(() => {
      r.value = !0, h.value ? h.value.focus() : n.value && n.value?.focus(), setTimeout(() => {
        r.value = !1;
      }, 0);
    });
  };
  return {
    show: J,
    hide: pe,
    handleContentHoverFocusIn: fe,
    handleContentHoverFocusOut: ie,
    compStyles: N,
    placement: B,
    parentWidth: b,
    parentHeight: k
  };
}
function mt(s, o = "") {
  const t = ee(!1);
  return ge(
    () => [De(s), De(o)],
    async (e, n) => {
      if (!(typeof document > "u")) {
        if (t.value = !1, Array.isArray(n)) {
          const a = document.getElementById(n[0]);
          a && a.childElementCount === 0 && document.body.removeChild(a);
        }
        if (await ye(), !document.getElementById(e[0])) {
          const a = document.createElement("div");
          a.id = e[0], e[1] && (a.className = Fn(e[1])), document.body.appendChild(a);
        }
        t.value = !0;
      }
    },
    { immediate: !0 }
  ), { isReady: t };
}
const Un = ["innerHTML"], Gn = {
  key: 0,
  class: "n-tooltip-overlay",
  "aria-hidden": "true"
}, Zn = ["innerHTML"], Xn = ["innerHTML"], qn = /* @__PURE__ */ Q({
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
  setup(s, { expose: o }) {
    const t = ae(), e = s, n = ve(s, "modelValue"), a = Pe("contentRef"), { isReady: l } = mt("n-tooltips-container"), f = ee(null), r = ee(null), u = i(() => r.value || f.value), p = () => {
      e.attachParent ? r.value = pt(e.attachParent) : r.value = null;
    }, d = i(() => `${e.direction}${e.position !== "" ? `-${e.position}` : ""}`), m = i(() => ({
      ...e,
      hoverTriggerAnchor: e.triggerByHover ? e.hoverTriggerAnchor : null,
      focusTriggerAnchor: e.triggerByFocus ? e.focusTriggerAnchor : null,
      clickTriggerAnchor: e.triggerByInteraction ? e.clickTriggerAnchor : null
    })), {
      show: h,
      hide: T,
      handleContentHoverFocusIn: b,
      handleContentHoverFocusOut: k,
      compStyles: g,
      placement: C,
      parentWidth: v
    } = on(m, {
      model: i({
        get: () => n.value,
        set: (E) => {
          n.value = E;
        }
      }),
      contentRef: a,
      attachParentEl: u,
      placement: d
    }), B = i(() => {
      const E = { ...g.value };
      return e.fit && (E.width = `${v.value}px`), E;
    }), N = i(() => ["n-tooltip", `n-tooltip--direction-${C.value}`]), F = i(() => {
      const {
        tag: E,
        content: R,
        showDelay: D,
        hideDelay: G,
        persistent: x,
        hoverTriggerAnchor: Y,
        focusTriggerAnchor: fe,
        clickTriggerAnchor: ie,
        attachParent: J,
        triggerByHover: pe,
        triggerByFocus: Z,
        triggerByInteraction: se,
        allowClickToHide: he,
        direction: Ie,
        position: _e,
        margin: Oe,
        offset: Me,
        autoReposition: be,
        stacked: Te,
        overlay: ue,
        fit: Ve,
        role: ke,
        ...Ue
      } = e;
      return {
        style: B.value,
        onMouseenter: b,
        onMouseleave: k,
        onFocusin: b,
        onFocusout: k,
        ...Ue,
        ...t
      };
    });
    return en(() => {
      f.value = sn(), p();
    }), ge(() => e.attachParent, p), o({ show: h, hide: T, contentRef: a }), (E, R) => e.stacked ? (c(), $($e, {
      key: 0,
      name: "n-tooltip"
    }, {
      default: O(() => [
        n.value ? (c(), $(L(e.tag), H({
          key: 0,
          ref_key: "contentRef",
          ref: a,
          class: N.value,
          role: e.role
        }, F.value), {
          default: O(() => [
            w(E.$slots, "default", {}, () => [
              e.content ? (c(), S("span", {
                key: 0,
                innerHTML: e.content
              }, null, 8, Un)) : _("", !0)
            ])
          ]),
          _: 3
        }, 16, ["class", "role"])) : _("", !0)
      ]),
      _: 3
    })) : de(l) ? (c(), $(dt, {
      key: 1,
      to: "#n-tooltips-container"
    }, [
      X($e, {
        name: e.overlay ? "n-tooltip-overlay" : "n-tooltip"
      }, {
        default: O(() => [
          n.value && e.overlay ? (c(), S("div", Gn, [
            (c(), $(L(e.tag), H({
              ref_key: "contentRef",
              ref: a,
              class: N.value,
              role: e.role
            }, F.value), {
              default: O(() => [
                w(E.$slots, "default", {}, () => [
                  e.content ? (c(), S("span", {
                    key: 0,
                    innerHTML: e.content
                  }, null, 8, Zn)) : _("", !0)
                ])
              ]),
              _: 3
            }, 16, ["class", "role"]))
          ])) : n.value ? (c(), $(L(e.tag), H({
            key: 1,
            ref_key: "contentRef",
            ref: a,
            class: N.value,
            role: e.role
          }, F.value), {
            default: O(() => [
              w(E.$slots, "default", {}, () => [
                e.content ? (c(), S("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, Xn)) : _("", !0)
              ])
            ]),
            _: 3
          }, 16, ["class", "role"])) : _("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ])) : _("", !0);
  }
}), W = Et.default || Et, Jn = Pt.default || Pt, Qn = Lt.default || Lt, ea = Ht.default || Ht, ta = Yt.default || Yt, na = Wt.default || Wt, aa = zt.default || zt, la = jt.default || jt, sa = Kt.default || Kt, oa = Ut.default || Ut, ra = Gt.default || Gt;
W.extend(Jn);
W.extend(Qn);
W.extend(ea);
W.extend(ta);
W.extend(na);
W.extend(aa);
W.extend(la);
W.extend(sa);
W.extend(oa);
W.extend(ra);
function Le(s) {
  if (!s || s.length === 0) return [];
  const o = [];
  for (const n of s) {
    if (!n) continue;
    let a, l;
    if (typeof n == "string" || n instanceof Date)
      a = W(n), l = a;
    else {
      const f = n;
      if (!f.begin && !f.end) continue;
      if (f.begin && !f.end)
        a = W(f.begin), l = a;
      else if (!f.begin && f.end)
        a = W(f.end), l = a;
      else {
        const r = W(f.begin), u = W(f.end);
        r.isBefore(u) ? (a = r, l = u) : (a = u, l = r);
      }
    }
    !a.isValid() || !l.isValid() || o.push({ start: a.startOf("day"), end: l.startOf("day") });
  }
  if (o.length === 0) return [];
  o.sort((n, a) => n.start.diff(a.start));
  const t = [];
  let e = o[0];
  for (let n = 1; n < o.length; n++) {
    const a = o[n], l = e.end.add(1, "day");
    l.isAfter(a.start) || l.isSame(a.start) ? a.end.isAfter(e.end) && (e.end = a.end) : (t.push(e), e = a);
  }
  return t.push(e), t.map((n) => n.start.isSame(n.end, "day") ? n.start.format("YYYY-MM-DD") : {
    begin: n.start.format("YYYY-MM-DD"),
    end: n.end.format("YYYY-MM-DD")
  });
}
function Je(s, o) {
  if (!o || o.length === 0) return !1;
  const t = s.format("YYYY-MM-DD");
  for (const e of o)
    if (e)
      if (typeof e == "string" || e instanceof Date) {
        if (W(e).format("YYYY-MM-DD") === t) return !0;
      } else {
        const n = e;
        if (!n.begin && !n.end) continue;
        const a = s;
        let l = !0, f = !0;
        if (n.begin) {
          const r = W(n.begin);
          l = a.isAfter(r, "day") || a.isSame(r, "day");
        }
        if (n.end) {
          const r = W(n.end);
          f = a.isBefore(r, "day") || a.isSame(r, "day");
        }
        if (l && f) return !0;
      }
  return !1;
}
function ia(s, o, t = 0) {
  let e = W(`${s}-${String(o + 1).padStart(2, "0")}-01`);
  return t !== 0 && (e = e.add(t, "week")), {
    year: e.isoWeekYear(),
    week: e.isoWeek()
  };
}
function ua(s, o, t) {
  if (!t || t.length === 0)
    return [
      {
        begin: s.format("YYYY-MM-DD"),
        end: o.format("YYYY-MM-DD")
      }
    ];
  const e = [];
  let n = null, a = s.clone();
  const l = o.clone();
  if (a.isAfter(l))
    return [];
  for (; a.isSameOrBefore(l, "day"); )
    Je(a, t) ? n || (n = a.clone()) : n && (e.push({
      begin: n.format("YYYY-MM-DD"),
      end: a.subtract(1, "day").format("YYYY-MM-DD")
    }), n = null), a = a.add(1, "day");
  return n && e.push({
    begin: n.format("YYYY-MM-DD"),
    end: l.format("YYYY-MM-DD")
  }), e;
}
function Zt(s, o, t) {
  const e = Math.abs(o.diff(s, "day")) + 1;
  if (t.minRange !== void 0 && e < t.minRange || t.maxRange !== void 0 && e > t.maxRange) return !1;
  const [n, a] = s.isBefore(o) ? [s, o] : [o, s];
  let l = n.clone();
  for (; l.isSameOrBefore(a, "day"); ) {
    if (t.disabled && Je(l, t.disabled)) return !1;
    l = l.add(1, "day");
  }
  return !0;
}
function ca(s) {
  const {
    start: o,
    daysCount: t,
    activeMonth: e,
    selected: n,
    disabled: a,
    visible: l,
    isRange: f,
    pendingStart: r,
    pendingEnd: u,
    pendingInvalid: p
  } = s, d = [];
  let m = o.clone();
  const h = W(), T = (v) => Je(v, a), b = (v) => !l || Je(v, l), k = (v) => !r || !u ? !1 : v.isSameOrAfter(r, "day") && v.isSameOrBefore(u, "day"), g = (v) => Je(v, n) ? !0 : f && r && !u ? v.isSame(r, "day") : !1, C = (v) => g(v) || k(v);
  for (let v = 0; v < t; v++) {
    const B = T(m), N = b(m), F = k(m), E = m.subtract(1, "day"), R = m.add(1, "day"), D = C(m), G = C(E), x = C(R);
    let Y = !0;
    e !== void 0 && (e === null ? Y = !1 : Array.isArray(e) ? Y = e.includes(m.month()) : Y = m.month() === e), d.push({
      date: m,
      dateString: m.format("YYYY-MM-DD"),
      dayOfMonth: m.date(),
      ariaLabel: m.format("dddd, MMMM D, YYYY"),
      isCurrentMonth: Y,
      isToday: m.isSame(h, "day"),
      isSelected: D,
      isDisabled: B,
      isVisible: N,
      isInvalid: F && !!p,
      isSelecting: F,
      isRangeStart: D && !G && x,
      isRangeEnd: D && !x && G,
      isInRange: D && (G || x)
    }), m = m.add(1, "day");
  }
  return d;
}
function da(s, o) {
  if (!s || s.length === 0) return s;
  const t = s.findIndex((n) => {
    if (typeof n == "object" && n !== null && "begin" in n) {
      const a = n;
      return W(a.begin).isSame(o.begin, "day") && W(a.end).isSame(o.end, "day");
    }
    return !1;
  });
  if (t === -1) return s;
  const e = [...s];
  return e.splice(t, 1), e;
}
const fa = ["aria-label"], pa = ["aria-multiselectable"], ma = ["aria-label", "aria-selected", "aria-disabled", "tabindex", "onClick", "onMouseenter", "onFocus", "onKeydown"], va = { class: "n-calendar-view-day-number" }, gl = /* @__PURE__ */ Q({
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
    viewingYear: { default: () => W().year() },
    viewingWeek: { default: () => W().week() },
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
  setup(s, { expose: o, emit: t }) {
    const e = s, n = t, {
      modelValue: a,
      viewingYear: l,
      viewingWeek: f,
      firstDayOfWeek: r,
      rows: u,
      weekLabelNames: p,
      weekLabelClass: d,
      multiple: m,
      selectable: h,
      unselectable: T,
      range: b,
      numViews: k,
      maxRange: g,
      minRange: C,
      activeMonth: v,
      disabled: B,
      visible: N,
      viewClass: F,
      containerClass: E,
      weekLabelContainerClass: R,
      gridClass: D,
      gridCellClass: G,
      views: x
    } = bn(e), Y = ee(null), fe = ee(null), ie = ee(W().format("YYYY-MM-DD")), J = /* @__PURE__ */ new Map(), pe = i(() => ce("n-calendar-container", E.value)), Z = (V, q) => {
      V ? J.set(q, V) : J.delete(q);
    }, se = async () => {
      await ye();
      const V = J.get(ie.value);
      V && V.focus();
    };
    ge(ie, se);
    const he = (V, q) => (q + V) % 7, Ie = i(() => {
      if (!a.value) return [];
      const V = Array.isArray(a.value) ? a.value : [a.value];
      return Le(V);
    }), _e = i(() => Le(B.value)), Oe = i(() => N.value ? Le(N.value) : null), Me = i(() => !b.value || !Y.value?.begin || !fe.value ? !1 : !Zt(W(Y.value.begin), fe.value, {
      minRange: C.value,
      maxRange: g.value,
      disabled: _e.value
    })), be = i(() => {
      const V = [], q = x.value && x.value.length > 0 ? x.value.length : Math.max(1, k.value), y = (() => {
        const ne = l.value ?? W().year(), j = f.value ?? W().week(), oe = r.value ?? 1, Be = W().year(ne).isoWeek(j).startOf("isoWeek");
        let xe = 1 - oe;
        return xe < 0 && (xe += 7), Be.subtract(xe, "day");
      })(), A = Me.value;
      let I = null, P = null;
      if (b.value && Y.value?.begin && fe.value) {
        const ne = W(Y.value.begin), j = fe.value;
        I = ne.isBefore(j) ? ne : j, P = ne.isBefore(j) ? j : ne;
      }
      for (let ne = 0; ne < q; ne++) {
        const j = x.value?.[ne] || {}, oe = j.viewingYear ?? l.value ?? W().year(), Be = j.viewingWeek ?? f.value ?? W().week(), xe = j.firstDayOfWeek ?? r.value ?? 1, Tt = j.rows ?? u.value ?? 6, Bt = j.activeMonth !== void 0 ? j.activeMonth : v.value, Dt = j.disabled ?? B.value ?? [], gt = Le(Dt), yt = j.visible ?? N.value, ht = yt ? Le(yt) : null, Mt = ce("n-calendar-view", j.viewClass ?? F.value), St = ce(
          "n-calendar-view-week-label-container",
          j.weekLabelContainerClass ?? R.value
        ), bt = ce("n-calendar-view-grid", j.gridClass ?? D.value), kt = ce(j.gridCellClass ?? G.value), rt = j.weekLabelNames ?? p.value;
        let Ct;
        if (rt?.length === 7) {
          const Ne = [...rt];
          let Se = xe - 1;
          Se < 0 && (Se += 7), Ct = Array.from({ length: 7 }, (Nt, hn) => Ne[(Se + hn) % 7]);
        } else {
          let Ne = W().day(xe);
          Ct = Array.from({ length: 7 }, () => {
            const Se = Ne.format("ddd");
            return Ne = Ne.add(1, "day"), Se;
          });
        }
        const xt = j.weekLabelClass ?? d.value ?? [], gn = Array.from({ length: 7 }, (Ne, Se) => {
          const Nt = (xe + Se) % 7;
          return Array.isArray(xt) && xt[Nt] || "";
        });
        let wt;
        if (x.value && (j.viewingYear !== void 0 || j.viewingWeek !== void 0)) {
          const Ne = W().year(oe).isoWeek(Be).startOf("isoWeek");
          let Se = 1 - xe;
          Se < 0 && (Se += 7), wt = Ne.subtract(Se, "day");
        } else {
          const Ne = (u.value ?? 6) * 7;
          wt = y.add(ne * Ne, "day");
        }
        const yn = ca({
          start: wt,
          daysCount: Tt * 7,
          activeMonth: Bt,
          selected: Ie.value,
          disabled: gt,
          visible: ht,
          isRange: b.value,
          pendingStart: I,
          pendingEnd: P,
          pendingInvalid: A,
          minRange: C.value,
          maxRange: g.value,
          hoveredDate: fe.value
        });
        V.push({
          days: yn,
          viewClasses: Mt,
          weekLabelContainerClasses: St,
          gridClasses: bt,
          extraGridCellClasses: kt,
          weekLabelNames: Ct,
          weekLabelClasses: gn,
          firstDayOfWeek: xe,
          disabledList: gt,
          visibleList: ht
        });
      }
      return V;
    });
    ge(() => be.value, se);
    function Te(V, q) {
      const y = q !== void 0 ? Number(q) : l.value, { year: A, week: I } = ia(y, V);
      n("update:viewingYear", A), n("update:viewingWeek", I);
    }
    o({
      setMonth: Te
    });
    function ue(V) {
      fe.value = V;
    }
    function Ve(V) {
      V.isVisible && (ue(V.date), ie.value = V.dateString);
    }
    function ke() {
      Y.value = null, fe.value = null;
    }
    function Ue(V) {
      V.key === "Escape" && ke();
    }
    function tt(V) {
      b.value && Y.value?.begin && (V.preventDefault(), ke());
    }
    function ot(V, q) {
      if (!q.isVisible) return;
      const y = V.key;
      if (y === "Enter" || y === " ") {
        V.preventDefault(), Ge(q);
        return;
      }
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(y)) return;
      V.preventDefault();
      let I = W(q.date).clone();
      y === "ArrowUp" ? I = I.subtract(7, "day") : y === "ArrowDown" ? I = I.add(7, "day") : y === "ArrowLeft" ? I = I.subtract(1, "day") : I = I.add(1, "day"), ie.value = I.format("YYYY-MM-DD");
      const P = be.value[0].days[0].date, ne = be.value[be.value.length - 1], j = ne.days[ne.days.length - 1].date;
      if (I.isBefore(P) || I.isSame(P) || I.isAfter(j) || I.isSame(j)) {
        let oe = W(`${l.value}-01-01`).isoWeek(f.value);
        I.isBefore(P) ? oe = oe.subtract(1, "week") : I.isAfter(j.subtract(1, "day")) && (oe = oe.add(1, "week")), n("update:viewingYear", oe.isoWeekYear()), n("update:viewingWeek", oe.isoWeek());
      }
    }
    function Ge(V, q) {
      if (!h.value || V.isDisabled || !V.isVisible) return;
      const y = V.dateString, A = [...Ie.value];
      b.value ? vt(V, A, y) : nt(A, y);
    }
    function vt(V, q, y) {
      if (Y.value?.begin) {
        const A = W(Y.value.begin), I = V.date, [P, ne] = I.isBefore(A) ? [I, A] : [A, I], j = {
          begin: P.format("YYYY-MM-DD"),
          end: ne.format("YYYY-MM-DD")
        };
        if (T.value) {
          const oe = da(q, j);
          if (oe.length < q.length) {
            m.value ? n("update:modelValue", Le(oe)) : n("update:modelValue", null), ke();
            return;
          }
        }
        if (Zt(P, ne, {
          minRange: C.value,
          maxRange: g.value,
          disabled: _e.value
        })) {
          const oe = ua(P, ne, Oe.value);
          if (oe.length > 0) {
            m.value ? q.push(...oe) : q = oe;
            const Be = Le(q);
            !m.value && Be.length === 1 ? n("update:modelValue", Be[0]) : n("update:modelValue", Be);
          }
          ke();
        } else
          ke();
      } else
        Y.value = { begin: y };
    }
    function nt(V, q) {
      if (m.value) {
        const y = V.findIndex((A) => Je(W(q), [A]));
        y > -1 ? T.value && V.splice(y, 1) : V.push(q), n("update:modelValue", Le(V));
      } else
        (V.length > 0 ? W(V[0].begin || V[0]).format("YYYY-MM-DD") : null) === q ? T.value && n("update:modelValue", null) : n("update:modelValue", q);
    }
    return (V, q) => (c(), S("div", {
      class: "n-calendar",
      tabindex: "-1",
      onKeydown: Ue
    }, [
      U("div", {
        class: M(pe.value)
      }, [
        (c(!0), S(te, null, le(be.value, (y, A) => (c(), S("div", {
          key: A,
          class: M(y.viewClasses)
        }, [
          w(V.$slots, `calendar-header-${A}`, {
            index: A,
            startDate: y.days[0]?.date,
            endDate: y.days[y.days.length - 1]?.date
          }, () => [
            w(V.$slots, "calendar-header", {
              index: A,
              startDate: y.days[0]?.date,
              endDate: y.days[y.days.length - 1]?.date
            })
          ]),
          w(V.$slots, "week-label-container", { calendarIndex: A }, () => [
            U("div", {
              class: M(y.weekLabelContainerClasses),
              role: "row"
            }, [
              (c(!0), S(te, null, le(y.weekLabelNames, (I, P) => (c(), S("div", {
                key: I,
                class: M(["n-calendar-view-week-label", y.weekLabelClasses[P]]),
                role: "columnheader",
                "aria-label": I
              }, [
                w(V.$slots, `week-label-${he(P, y.firstDayOfWeek)}`, {
                  day: I,
                  index: P,
                  calendarIndex: A
                }, () => [
                  st(re(I), 1)
                ])
              ], 10, fa))), 128))
            ], 2)
          ]),
          U("div", {
            class: M(y.gridClasses),
            role: "grid",
            "aria-multiselectable": de(m),
            onMouseleave: q[0] || (q[0] = (I) => ue(null))
          }, [
            (c(!0), S(te, null, le(y.days, (I) => (c(), S("div", {
              key: I.dateString,
              ref_for: !0,
              ref: (P) => Z(P, I.dateString),
              class: M([
                "n-calendar-view-grid-cell",
                ...y.extraGridCellClasses,
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
              tabindex: I.dateString === ie.value && I.isVisible ? 0 : -1,
              onClick: (P) => Ge(I),
              onMouseenter: (P) => ue(I.date),
              onFocus: (P) => Ve(I),
              onContextmenu: tt,
              onKeydown: (P) => ot(P, I)
            }, [
              I.isVisible ? w(V.$slots, "cell", {
                key: 0,
                day: I,
                calendarIndex: A
              }, () => [
                U("span", va, re(I.dayOfMonth), 1)
              ]) : _("", !0)
            ], 42, ma))), 128))
          ], 42, pa),
          w(V.$slots, "calendar-footer", {
            index: A,
            startDate: y.days[0]?.date,
            endDate: y.days[y.days.length - 1]?.date
          })
        ], 2))), 128))
      ], 2)
    ], 32));
  }
}), ga = {
  key: 1,
  class: "n-card-body"
}, ya = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = s, n = i(() => !e.disabled && (e.to || e.href || !!e.onClick || !!t.onClick)), a = i(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), l = i(() => [
      "n-card",
      e.loading ? "n-card--loading" : "",
      e.disabled ? "n-card--disabled" : "",
      n.value ? "n-card--clickable" : ""
    ]), f = i(() => {
      const d = { ...t };
      return a.value === "RouterLink" ? (d.to = e.to, d.target = e.target) : a.value === "a" && (d.href = e.href, d.target = e.target), d;
    }), r = i(() => {
      const d = o.default?.() ?? [];
      return d.length === 0 ? !1 : d.length > 0 && Pn(d[0], ["n-card-body"]) ? !0 : d.length > 1;
    });
    function u(d) {
      if (e.disabled) {
        d.preventDefault(), d.stopPropagation();
        return;
      }
      n.value && (e.onClick?.(d), t.onClick && typeof t.onClick == "function" && t.onClick !== e.onClick && t.onClick(d));
    }
    function p(d) {
      if (n.value && ["Enter", " "].includes(d.key)) {
        const m = d.target;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(m.tagName) || m.isContentEditable)
          return;
        d.preventDefault(), u(d);
      }
    }
    return (d, m) => (c(), $(L(a.value), H({
      class: l.value,
      role: n.value && a.value === "div" ? "button" : void 0,
      tabindex: n.value && a.value === "div" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, f.value, {
      onClick: u,
      onKeydown: p
    }), {
      default: O(() => [
        r.value ? w(d.$slots, "default", { key: 0 }) : (c(), S("div", ga, [
          w(d.$slots, "default")
        ])),
        w(d.$slots, "loading", {}, () => [
          X($e, { name: "n-loading-overlay" }, {
            default: O(() => [
              e.loading ? (c(), $(et, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: M(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : _("", !0)
            ]),
            _: 1
          })
        ])
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "aria-busy"]));
  }
}), yl = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = ve(s, "modelValue"), n = s, a = Ae(), l = ee([]), f = ee(null), r = i(() => e.value !== void 0 && e.value !== null), u = i(() => m.value.some((v) => h(v))), p = i(() => ["n-tabs"]), d = i(() => ({
      ...t
    })), m = i(() => {
      const v = o.default?.() ?? [];
      return !v || v.length === 0 ? [] : (Array.isArray(v) ? v : [v]).map((F) => it(F, "NTab") ? F : null).filter((F) => !!F);
    });
    function h(v) {
      return !r.value || !v.props?.name ? !1 : n.multiple && Array.isArray(e.value) ? e.value.includes(v.props?.name) : v.props?.name === e.value;
    }
    function T(v, B) {
      return !r.value || h(v) || !u.value && B === 0 ? 0 : -1;
    }
    function b(v, B) {
      return v.props?.id || `n-tab-${a}-${B}`;
    }
    function k(v, B) {
      v && (l.value[B] = v.$el || v);
    }
    function g(v) {
      if (!(!r.value || !v.props?.name))
        if (n.multiple && Array.isArray(e.value)) {
          const B = e.value.indexOf(v.props?.name);
          B >= 0 ? e.value = e.value.toSpliced(B, 1) : e.value = [...e.value, v.props?.name];
        } else
          e.value = v.props?.name ?? "";
    }
    function C(v) {
      const B = l.value.filter(
        (R) => !R.hasAttribute("disabled") && R.getAttribute("aria-disabled") !== "true"
      );
      if (B.length === 0) return;
      const N = document.activeElement, F = B.indexOf(N);
      let E = -1;
      switch (v.key) {
        case "ArrowRight":
        case "ArrowDown":
          E = (F + 1) % B.length, v.preventDefault();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          E = (F - 1 + B.length) % B.length, v.preventDefault();
          break;
        case "Home":
          E = 0, v.preventDefault();
          break;
        case "End":
          E = B.length - 1, v.preventDefault();
          break;
      }
      E !== -1 && (B[E].focus(), r.value && !n.multiple && B[E].click());
    }
    return (v, B) => (c(), $(L(n.tag), H({
      ref_key: "tabListRef",
      ref: f,
      class: p.value
    }, d.value, {
      role: r.value ? "tablist" : "group",
      onKeydown: C
    }), {
      default: O(() => [
        (c(!0), S(te, null, le(m.value, (N, F) => (c(), $(L(N), {
          key: F,
          id: b(N, F),
          ref_for: !0,
          ref: (E) => k(E, F),
          class: M([h(N) ? "n-tab--active" : ""]),
          role: r.value ? "tab" : void 0,
          "aria-selected": r.value ? h(N) ? "true" : "false" : void 0,
          tabindex: T(N, F),
          onClick: () => g(N)
        }, null, 8, ["id", "class", "role", "aria-selected", "tabindex", "onClick"]))), 128))
      ]),
      _: 1
    }, 16, ["class", "role"]));
  }
}), ha = { key: 1 }, hl = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = s, n = i(() => ["n-tab", e.loading ? "n-tab--loading" : ""]), a = i(() => e.to ? "RouterLink" : e.href ? "a" : e.tag), l = i(() => ce(e.iconClass, e.prependIconClass)), f = i(() => {
      const u = { ...t };
      return a.value === "RouterLink" ? (u.to = e.to, u.target = e.target) : a.value === "a" && (u.href = e.href, u.target = e.target), u;
    }), r = i(() => Ce(o.default?.() ?? [], "span"));
    return (u, p) => (c(), $(L(a.value), H({
      class: n.value,
      type: e.type,
      disabled: de(t).disabled || e.loading,
      "aria-disabled": de(t).disabled || e.loading ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, f.value), {
      default: O(() => [
        w(u.$slots, "loading", {}, () => [
          X($e, { name: "n-loading-overlay" }, {
            default: O(() => [
              e.loading ? (c(), $(et, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: M(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : _("", !0)
            ]),
            _: 1
          })
        ]),
        w(u.$slots, "prepend"),
        e.prependIcon || e.icon ? (c(), $(z, {
          key: 0,
          name: e.prependIcon || e.icon,
          class: M(l.value),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : _("", !0),
        e.label ? (c(), S("span", ha, re(e.label), 1)) : _("", !0),
        (c(!0), S(te, null, le(r.value, (d, m) => (c(), $(L(d), { key: m }))), 128)),
        e.appendIcon ? (c(), $(z, {
          key: 2,
          name: e.appendIcon,
          class: M(e.appendIconClass),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : _("", !0),
        w(u.$slots, "append")
      ]),
      _: 3
    }, 16, ["class", "type", "disabled", "aria-disabled", "aria-busy"]));
  }
});
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ba = (s) => s != null;
function ka(s, o = {}) {
  let t;
  const { immediate: e, ...n } = o, a = Rt(!1), l = Rt(!1), f = (d) => t && t.activate(d), r = (d) => t && t.deactivate(d), u = () => {
    t && (t.pause(), l.value = !0);
  }, p = () => {
    t && (t.unpause(), l.value = !1);
  };
  return ge(i(() => Sn(De(s)).map((d) => {
    const m = De(d);
    return typeof m == "string" ? m : xn(m);
  }).filter(ba)), (d) => {
    if (d.length)
      if (!t)
        t = Vn(d, {
          ...n,
          onActivate() {
            a.value = !0, o.onActivate && o.onActivate();
          },
          onDeactivate() {
            a.value = !1, o.onDeactivate && o.onDeactivate();
          }
        }), e && f();
      else {
        const m = t?.active;
        t?.updateContainerElements(d), !m && e && f();
      }
  }, { flush: "post" }), Nn(() => r()), {
    hasFocus: a,
    isPaused: l,
    activate: f,
    deactivate: r,
    pause: u,
    unpause: p
  };
}
function rn(s, o, t, e, n) {
  const {
    activate: a,
    deactivate: l,
    hasFocus: f,
    pause: r,
    unpause: u
  } = ka(o, {
    immediate: !1,
    allowOutsideClick: (b) => {
      const k = b.target;
      return !!(k.closest(".n-popover") || k.closest(".n-modal-overlay") || k.closest(".n-drawer-overlay"));
    }
  }), p = ee(0), d = () => {
    p.value++, p.value === 1 && r();
  }, m = () => {
    p.value > 0 && p.value--, p.value === 0 && u();
  };
  function h(b) {
    if (!b)
      return null;
    const k = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "textarea:not([disabled])",
      "select:not([disabled])",
      "details",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    return b.querySelector(k);
  }
  return ge(s, async (b) => {
    if (await ye(), !b) {
      t.value && (typeof n?.hide == "number" && await Vt(n.hide), l());
      return;
    }
    const k = h(o.value);
    e.value && k && (typeof n?.show == "number" && await Vt(n.show), t.value ? a() : k.focus());
  }), { isFocusTrapped: f, pause: d, unpause: m, focusContent: () => {
    o.value && o.value.focus();
  } };
}
const Ca = ["innerHTML"], bl = /* @__PURE__ */ Q({
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
  setup(s, { expose: o }) {
    const t = ae(), e = s, n = ve(s, "modelValue"), a = Pe("contentRef"), { pause: l, unpause: f } = rn(
      n,
      a,
      i(() => e.overlay),
      i(() => e.focusOnShow),
      e.overlay ? {
        show: 300,
        hide: 300
      } : void 0
    ), r = i(() => ["n-drawer-overlay"]), u = i(() => [
      "n-drawer",
      `n-drawer--direction-${e.direction}`,
      n.value ? "n-drawer--active" : void 0
    ]), p = i(() => ({ ...t }));
    qe("keydown", (g) => {
      n.value && g.key === "Escape" && !e.persist && !e.noEscHide && (g.preventDefault(), g.stopPropagation(), k());
    });
    function d(g) {
      if (e.persist || e.noOverlayHide) return;
      const C = g.target;
      C.clientWidth < g.clientX || C.clientHeight < g.clientY || k();
    }
    function m() {
      e.persist || e.noClickOutsideHide || k();
    }
    function h() {
      e.persist || l();
    }
    function T() {
      e.persist || f();
    }
    const b = () => {
      n.value = !0;
    }, k = () => {
      n.value = !1;
    };
    return o({ show: b, hide: k }), (g, C) => (c(), S(te, null, [
      X($e, { name: "n-drawer-overlay" }, {
        default: O(() => [
          e.overlay && n.value ? (c(), S("div", {
            key: 0,
            class: M(r.value),
            "aria-hidden": "true",
            onMousedown: Re(d, ["self"])
          }, null, 34)) : _("", !0)
        ]),
        _: 1
      }),
      Ke((c(), $(L(e.tag), H({
        ref_key: "contentRef",
        ref: a,
        role: "dialog",
        "aria-modal": e.overlay ? "true" : void 0,
        class: u.value
      }, p.value, {
        onMousedown: h,
        onMouseup: T
      }), {
        default: O(() => [
          w(g.$slots, "default", {}, () => [
            e.content ? (c(), S("span", {
              key: 0,
              innerHTML: e.content
            }, null, 8, Ca)) : _("", !0)
          ])
        ]),
        _: 3
      }, 16, ["aria-modal", "class"])), [
        [de(On), m]
      ])
    ], 64));
  }
});
function Xt(s) {
  if (!s || typeof s != "object")
    return !1;
  const o = Object.getPrototypeOf(s);
  return o === null || o === Object.prototype || Object.getPrototypeOf(o) === null ? Object.prototype.toString.call(s) === "[object Object]" : !1;
}
function wa(s) {
  return s === "__proto__";
}
function Xe(s, o) {
  const t = Object.keys(o);
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    if (wa(n))
      continue;
    const a = o[n], l = s[n];
    Array.isArray(a) ? Array.isArray(l) ? s[n] = Xe(l, a) : s[n] = Xe([], a) : Xt(a) ? Xt(l) ? s[n] = Xe(l, a) : s[n] = Xe({}, a) : (l === void 0 || a !== void 0) && (s[n] = a);
  }
  return s;
}
function Fe(s, o) {
  const t = { ...s };
  for (let e = 0; e < o.length; e++) {
    const n = o[e];
    delete t[n];
  }
  return t;
}
const Ia = { class: "overflow-hidden" }, $a = { class: "px-4 pb-2" }, je = /* @__PURE__ */ Q({
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
  setup(s, { expose: o, emit: t }) {
    const e = Qe(), n = we(), a = ae(), l = s, f = ve(s, "modelValue"), r = t, u = i(() => !l.heading && (l.to || l.href || e?.vnode.props?.onClick)), p = i(() => l.to && !l.disabled ? "RouterLink" : l.href && !l.disabled ? "a" : l.tag), d = i(() => l.heading ? "presentation" : p.value === "RouterLink" || p.value === "a" ? "link" : u.value ? "button" : "listitem"), m = i(() => u.value || l.expandable ? 0 : void 0), h = i(() => [
      "n-list-item",
      u.value && !l.expandable ? "n-list-item--clickable" : "",
      l.disabled ? "n-list-item--disabled" : "",
      l.expandable ? "n-list-item--expandable" : "",
      l.heading ? "n-list-item--heading" : ""
    ]), T = i(() => {
      const R = { ...a };
      return p.value === "RouterLink" ? (R.to = l.to, R.target = l.target) : p.value === "a" && (R.href = l.href, R.target = l.target), R;
    }), b = i(() => ce(l.iconClass, l.prependIconClass)), k = i(() => {
      const R = n.default?.();
      return R && R.length > 0 ? Ce(R, "span") : l.contentField && a[l.contentField] ? Ce(a[l.contentField], "span") : [];
    }), g = i(() => {
      const R = n.content?.();
      return R && R.length > 0 ? Ce(R, "span") : [];
    }), C = (R) => R.nodes;
    function v(R) {
      if (l.disabled || l.heading) {
        R.preventDefault(), R.stopPropagation();
        return;
      }
      u.value && r("click", R);
    }
    function B(R) {
      if (u.value && ["Enter", " "].includes(R.key)) {
        const D = R.target;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(D.tagName) || D.isContentEditable)
          return;
        R.preventDefault(), v(R);
      }
    }
    function N() {
      f.value = !f.value;
    }
    return o({ expand: () => {
      f.value = !0;
    }, collapse: () => {
      f.value = !1;
    } }), (R, D) => (c(), $(L(p.value), H({
      class: h.value,
      role: d.value,
      tabindex: m.value,
      "aria-disabled": l.disabled ? "true" : void 0,
      "aria-expanded": l.expandable ? f.value : void 0
    }, T.value, {
      onClick: v,
      onKeydown: B
    }), {
      default: O(() => [
        l.expandable ? (c(), S("div", {
          key: 0,
          class: "n-list-item-header",
          onClick: Re(N, ["stop"])
        }, [
          w(R.$slots, "prepend"),
          l.prependIcon || l.icon ? (c(), $(z, {
            key: 0,
            name: l.prependIcon || l.icon,
            class: M(b.value),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : _("", !0),
          X(C, { nodes: k.value }, null, 8, ["nodes"]),
          l.appendIcon ? (c(), $(z, {
            key: 1,
            name: l.appendIcon,
            class: M(l.appendIconClass),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : _("", !0),
          w(R.$slots, "append")
        ])) : (c(), S(te, { key: 1 }, [
          w(R.$slots, "prepend"),
          l.prependIcon || l.icon ? (c(), $(z, {
            key: 0,
            name: l.prependIcon || l.icon,
            class: M(b.value),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : _("", !0),
          X(C, { nodes: k.value }, null, 8, ["nodes"]),
          l.appendIcon ? (c(), $(z, {
            key: 1,
            name: l.appendIcon,
            class: M(l.appendIconClass),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : _("", !0),
          w(R.$slots, "append")
        ], 64)),
        l.expandable ? (c(), S("div", {
          key: 2,
          class: M(["n-list-item-content", [f.value ? "n-list-item-content--expanded" : ""]])
        }, [
          U("div", Ia, [
            U("div", $a, [
              X(C, { nodes: g.value }, null, 8, ["nodes"])
            ])
          ])
        ], 2)) : _("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "aria-expanded"]));
  }
}), qt = 1e3, Aa = 10, We = ee(/* @__PURE__ */ new Map());
function un(s) {
  const o = Symbol(`stack-id-${Ae()}`);
  ge(
    () => De(s),
    (r, u) => {
      const p = u && We.value.get(u) || [], d = We.value.get(r) ?? [];
      p.filter(({ stackId: m }) => m === o).forEach((m, h) => {
        d.push(m), p.splice(h, 1);
      });
    },
    { immediate: !0 }
  );
  function t() {
    return We.value.has(De(s)) || We.value.set(De(s), []), We.value.get(De(s));
  }
  return {
    register: (r) => {
      const u = t();
      u.find(({ itemId: p }) => p === r) || We.value.set(De(s), [...u, { stackId: o, itemId: r }]);
    },
    unregister: (r) => {
      We.value.set(
        De(s),
        t().filter(({ itemId: u }) => u === r)
      );
    },
    getZIndex: (r) => {
      const p = t().findIndex(({ itemId: d }) => d === r);
      return p === -1 ? qt : qt + p * Aa;
    },
    getOrderIndex: (r) => t().findIndex(({ itemId: p }) => p === r),
    isTop: (r) => {
      const u = t();
      return u[u.length - 1]?.itemId === r;
    }
  };
}
const _a = ["innerHTML"], cn = /* @__PURE__ */ Q({
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
  setup(s, { expose: o }) {
    const t = ae(), e = s, n = ve(s, "modelValue"), { isReady: a } = mt("n-modals-container"), l = Symbol(`modal-id-${Ae()}`), { register: f, unregister: r, getZIndex: u, isTop: p } = un("n-modal"), d = Pe("contentRef"), { pause: m, unpause: h, focusContent: T } = rn(
      n,
      d,
      i(() => e.overlay),
      i(() => e.focusOnShow),
      e.overlay ? {
        show: 300,
        hide: 300
      } : void 0
    );
    kn("n-modal-focusable", { pause: m, unpause: h, focusContent: T });
    const b = i(() => u(l)), k = i(() => ["n-modal-overlay"]), g = i(() => ({ zIndex: b.value })), C = i(() => ["n-modal", `n-modal--direction-${e.direction}`, "outline-none"]), v = i(() => ({ zIndex: b.value })), B = i(() => {
      const { tag: x, content: Y, overlay: fe, noOverlayHide: ie, noEscHide: J, direction: pe, persist: Z, focusOnShow: se, role: he, ...Ie } = e, { "aria-modal": _e, role: Oe, tabindex: Me, ...be } = t, { "aria-modal": Te, ...ue } = Ie;
      return { tabindex: Me ?? "-1", ...ue, ...be };
    });
    qe("keydown", (x) => {
      n.value && x.key === "Escape" && !e.persist && !e.noEscHide && p(l) && (x.preventDefault(), x.stopPropagation(), G());
    }), ge(
      n,
      (x) => {
        x ? f(l) : setTimeout(() => r(l), 300);
      },
      { immediate: !0 }
    ), tn(() => {
      r(l);
    });
    function N(x) {
      if (e.persist || e.noOverlayHide) return;
      const Y = x.target;
      Y.clientWidth < x.clientX || Y.clientHeight < x.clientY || G();
    }
    function F(x) {
      if (!x || x === document.body) return !1;
      const Y = [
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
      return !!(x.matches(Y) || x.getAttribute("tabindex") && x.getAttribute("tabindex") !== "-1" || x.closest(Y));
    }
    function E(x) {
      if (e.persist) return;
      const Y = x.target;
      F(Y) || d.value && (x.preventDefault(), d.value.focus()), m();
    }
    function R() {
      e.persist || h();
    }
    const D = () => {
      n.value = !0;
    }, G = () => {
      n.value = !1;
    };
    return o({ show: D, hide: G }), (x, Y) => de(a) ? (c(), $(dt, {
      key: 0,
      to: "#n-modals-container"
    }, [
      X($e, { name: "n-modal-overlay" }, {
        default: O(() => [
          e.overlay && n.value ? (c(), S("div", {
            key: 0,
            class: M(k.value),
            style: ft(g.value),
            "aria-hidden": "true",
            onMousedown: N
          }, null, 38)) : _("", !0)
        ]),
        _: 1
      }),
      X($e, { name: "n-modal" }, {
        default: O(() => [
          n.value ? (c(), $(L(e.tag), H({
            key: 0,
            ref_key: "contentRef",
            ref: d,
            role: e.role,
            "aria-modal": e.overlay ? "true" : void 0,
            class: C.value,
            style: v.value
          }, B.value, {
            onMousedown: E,
            onMouseup: R
          }), {
            default: O(() => [
              w(x.$slots, "default", {}, () => [
                e.content ? (c(), S("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, _a)) : _("", !0)
              ])
            ]),
            _: 3
          }, 16, ["role", "aria-modal", "class", "style"])) : _("", !0)
        ]),
        _: 3
      })
    ])) : _("", !0);
  }
});
function kl() {
  const s = Qe();
  if (!s)
    throw new Error("useDialog must be called within setup() or a lifecycle hook.");
  const o = s.appContext;
  async function t(f = {}) {
    const r = document.createElement("div");
    r.id = `dialog-app-${Ae()}`, document.body.appendChild(r);
    const u = f ?? {};
    u.hideOnAction ??= !0;
    const p = {
      tag: u.modalTag,
      overlay: u.overlay,
      noOverlayHide: u.noOverlayHide,
      noEscHide: u.noEscHide,
      focusOnShow: u.focusOnShow,
      role: u.role,
      class: u.class
    }, d = {
      tag: u.cardTag,
      class: u.cardClass,
      loading: u.loading,
      loadingName: u.loadingName,
      loadingClass: u.loadingClass
    }, m = /* @__PURE__ */ new Map();
    async function h() {
      const D = k.component;
      D?.exposed?.hide && D.exposed.hide();
    }
    async function T() {
      setTimeout(() => {
        He(null, r), r.remove();
      }, 300);
    }
    let b = [];
    Array.isArray(u.actions) && (b = u.actions.map((D) => {
      const G = D.onClick;
      return K($t, { ...D, onClick: () => {
        typeof G == "function" ? G({ hide: h, executeCallbacks: C }) : (D.label?.toLocaleLowerCase() === "ok" ? C("ok") : D.label?.toLocaleLowerCase() === "cancel" && C("cancel"), C("dismiss"), u.hideOnAction && h());
      } });
    }));
    const k = X(
      cn,
      {
        ...p,
        "onUpdate:modelValue": (D) => {
          D || (C("hide"), T());
        }
      },
      {
        default: () => K(
          ya,
          {
            ...d
          },
          {
            default: () => [
              u.title ? K("div", { class: ["n-card-header", u.cardHeaderClass] }, [
                K("h1", { class: "title-text text-xl" }, u.title),
                u.closeButton ? K($t, {
                  icon: "close",
                  class: "icon pilled text-xs",
                  onClick: () => h()
                }) : null
              ]) : null,
              K("div", { class: "n-card-body" }, u.content || ""),
              b.length > 0 ? K(
                "div",
                { class: ["n-card-footer justify-end gap-2", u.cardFooterClass] },
                b
              ) : null
            ].filter(Boolean)
          }
        )
      }
    );
    o && (k.appContext = o), He(k, r), await ye();
    function g(D, G) {
      const x = m.get(D) || [];
      x.push(G), m.set(D, x);
    }
    function C(D, ...G) {
      const x = m.get(D) || [];
      for (const Y of x)
        Y(G);
    }
    function v(D) {
      g("hide", D);
    }
    function B(D) {
      g("dismiss", D);
    }
    function N(D) {
      g("cancel", D);
    }
    function F(D) {
      g("ok", D);
    }
    function E(D) {
      g("show", D);
    }
    async function R() {
      return k.component?.exposed?.show(), await ye(), C("show"), {
        hide: h,
        onHide: v,
        onDismiss: B,
        onCancel: N,
        onOk: F
      };
    }
    return {
      show: R,
      onShow: E
    };
  }
  const e = async (f) => await (await t(f)).show();
  return {
    create: t,
    dialog: e,
    alert: async (f, r, u) => {
      const p = await e({
        title: f,
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
        ...u || {}
      });
      return new Promise((d) => {
        p.onHide(d);
      });
    },
    confirm: async (f, r, u) => {
      const p = await e({
        ...u || {},
        title: f,
        content: r,
        actions: u?.actions ? u.actions : [
          {
            label: "Cancel",
            class: "flat",
            onClick: ({ hide: d, executeCallbacks: m }) => {
              m("cancel"), d();
            }
          },
          {
            label: "OK",
            onClick: ({ hide: d, executeCallbacks: m }) => {
              m("ok"), d();
            }
          }
        ],
        hideOnAction: !1,
        noOverlayHide: !0,
        noEscHide: !0,
        role: "alertdialog"
      });
      return new Promise((d) => {
        let m = null;
        p.onOk(() => m = "ok"), p.onCancel(() => m = "cancel"), p.onHide(() => d(m));
      });
    },
    prompt: (f, r, u = "") => new Promise(async (p) => {
      const d = window.prompt(`${f}
${r}`, u);
      p(d);
    })
  };
}
function Cl() {
  const s = Qe();
  if (!s)
    throw new Error("useModal must be called within setup() or a lifecycle hook.");
  const o = s.appContext;
  async function t(a) {
    const l = document.createElement("div");
    l.id = `modal-app-${Ae()}`, document.body.appendChild(l), a = a ?? {};
    const { content: f, ...r } = a, u = /* @__PURE__ */ new Map();
    async function p() {
      m.component?.exposed?.hide(), await ye(), T("hide"), d();
    }
    async function d() {
      He(null, l), l.remove();
    }
    const m = X(
      cn,
      {
        ...r
      },
      {
        default: () => typeof f == "string" ? K("span", { innerHTML: f }) : f || ""
      }
    );
    o && (m.appContext = o), He(m, l), await ye();
    function h(C, v) {
      const B = u.get(C) || [];
      B.push(v), u.set(C, B);
    }
    function T(C, ...v) {
      const B = u.get(C) || [];
      for (const N of B)
        N(v);
    }
    function b(C) {
      h("hide", C);
    }
    function k(C) {
      h("show", C);
    }
    async function g() {
      return m.component?.exposed?.show(), await ye(), T("show"), {
        hide: p,
        onHide: b
      };
    }
    return {
      show: g,
      onShow: k
    };
  }
  const e = async (a) => await (await t(a)).show();
  return {
    create: t,
    loading: async (a, l, f) => {
      const r = {
        ...f,
        class: "flex flex-col items-center gap-4 text-text-invert",
        persist: !0,
        content: [
          K("div", { class: f?.titleClass }, l),
          K(et, { name: a, class: f?.loadingClass })
        ]
      };
      return await e(r);
    }
  };
}
function dn(s, o, t = {}) {
  const { immediate: e = !1 } = t, n = ee(!1), a = ee(!1);
  let l = null, f = 0, r = 0;
  const u = () => {
    n.value = !1, a.value = !1, r = 0, l && (clearTimeout(l), l = null);
  }, p = () => {
    u();
    const h = de(o);
    h <= 0 || (n.value = !0, a.value = !1, r = h, f = Date.now(), l = setTimeout(() => {
      n.value = !1, s();
    }, r));
  }, d = () => {
    if (!n.value || a.value || !l) return;
    a.value = !0, clearTimeout(l), l = null;
    const h = Date.now() - f;
    r -= h;
  }, m = () => {
    !n.value || !a.value || (a.value = !1, f = Date.now(), l = setTimeout(() => {
      n.value = !1, s();
    }, r));
  };
  return Cn() && wn(u), e && p(), {
    start: p,
    stop: u,
    pause: d,
    resume: m,
    isPending: n,
    isPaused: a
  };
}
const Ta = ["innerHTML"], Ba = {
  class: "n-banner-progress",
  "aria-hidden": "true"
}, fn = /* @__PURE__ */ Q({
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
  setup(s, { emit: o }) {
    const t = o, e = we(), n = ae(), a = s, l = ve(s, "modelValue"), f = dn(
      () => {
        t("timer-end");
      },
      i(() => a.duration),
      { immediate: !1 }
    ), r = () => {
      a.duration > 0 && !f.isPaused.value && (f.pause(), t("timer-pause"));
    }, u = () => {
      a.duration > 0 && f.isPaused.value && (f.resume(), t("timer-resume"));
    };
    ge(
      l,
      (T) => {
        T && a.duration > 0 ? (f.start(), t("timer-begin")) : f.stop();
      },
      { immediate: !0 }
    );
    const p = i(() => ["n-banner", a.inlineActions ? "n-banner--inline" : ""]), d = i(() => ({ ...n })), m = i(() => ({
      "--n-banner-duration": `${a.duration}ms`
    })), h = i(() => Ce(e.default?.() ?? [], "div"));
    return (T, b) => l.value ? (c(), $(L(a.tag), H({
      key: 0,
      class: p.value,
      style: m.value
    }, d.value, {
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "true",
      onMouseenter: r,
      onMouseleave: u,
      onFocusin: r,
      onFocusout: u
    }), {
      default: O(() => [
        U("div", {
          class: M(["n-banner-label", a.labelClass])
        }, [
          w(T.$slots, "icon", {}, () => [
            a.icon ? (c(), $(z, {
              key: 0,
              name: a.icon,
              class: M(a.iconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : _("", !0)
          ]),
          a.label ? (c(), S("span", {
            key: 0,
            innerHTML: a.label
          }, null, 8, Ta)) : _("", !0),
          (c(!0), S(te, null, le(h.value, (k, g) => (c(), $(L(k), { key: g }))), 128))
        ], 2),
        T.$slots.actions || a.actions ? (c(), S("div", {
          key: 0,
          class: M(["n-banner-actions", a.actionsClass])
        }, [
          w(T.$slots, "actions", {}, () => [
            (c(!0), S(te, null, le(a.actions, (k, g) => (c(), $($t, H({
              key: g,
              ref_for: !0
            }, k), null, 16))), 128))
          ])
        ], 2)) : _("", !0),
        a.showProgress && a.duration > 0 ? w(T.$slots, "progress", { key: 1 }, () => [
          U("div", Ba, [
            U("div", {
              class: "n-banner-progress-bar",
              style: ft({ animationPlayState: de(f).isPaused.value ? "paused" : "running" })
            }, null, 4)
          ])
        ]) : _("", !0)
      ]),
      _: 3
    }, 16, ["class", "style"])) : _("", !0);
  }
}), Da = ["innerHTML"], Ma = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', Sa = /* @__PURE__ */ Q({
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
  setup(s, { expose: o }) {
    const t = ae(), e = s, n = ve(s, "modelValue"), { isReady: a } = mt(i(() => `n-toasts-container--position-${e.position}`)), l = Pe("contentRef"), f = ee(null), r = Symbol(`toast-id-${Ae()}`), { register: u, unregister: p, getZIndex: d, getOrderIndex: m, isTop: h } = un(
      i(() => `n-toast--position-${e.position}`)
    ), {
      start: T,
      stop: b,
      pause: k,
      resume: g
    } = dn(
      () => ie(),
      i(() => e.duration),
      { immediate: !1 }
    ), C = i(() => d(r)), v = i(() => m(r)), B = i(() => ["n-toast-overlay", `n-toast-overlay--position-${e.position}`]), N = i(() => ({ zIndex: C.value, order: v.value })), F = i(() => ["n-toast", `n-toast--position-${e.position}`]), E = i(() => ({ zIndex: C.value, order: v.value })), R = i(() => {
      const { tag: J, content: pe, overlay: Z, noOverlayHide: se, noEscHide: he, position: Ie, focusOnShow: _e, duration: Oe, role: Me, ...be } = e, { "aria-live": Te, "aria-atomic": ue, role: Ve, ...ke } = t, { "aria-live": Ue, "aria-atomic": tt, role: ot, ...Ge } = be;
      return { ...Ge, ...ke };
    }), D = () => {
      if (!l.value) return;
      const J = l.value.querySelector(Ma);
      J ? J.focus() : l.value.focus();
    };
    qe("keydown", (J) => {
      n.value && J.key === "Escape" && !e.noEscHide && h(r) && (J.preventDefault(), J.stopPropagation(), ie());
    }), ge(n, async (J) => {
      J ? (u(r), f.value = document.activeElement, e.duration > 0 && T(), await ye(), e.focusOnShow && D()) : (b(), f.value && (f.value.focus(), f.value = null), p(r));
    }), tn(() => {
      p(r);
    });
    function G(J) {
      if (e.noOverlayHide) return;
      const pe = J.target;
      pe.clientWidth < J.clientX || pe.clientHeight < J.clientY || ie();
    }
    function x() {
      e.duration > 0 && k();
    }
    function Y() {
      e.duration > 0 && g();
    }
    const fe = () => {
      n.value = !0;
    }, ie = () => {
      n.value = !1;
    };
    return o({ show: fe, hide: ie }), (J, pe) => de(a) ? (c(), $(dt, {
      key: 0,
      to: `#n-toasts-container--position-${e.position}`
    }, [
      X($e, { name: "n-toast-overlay" }, {
        default: O(() => [
          e.overlay && n.value ? (c(), S("div", {
            key: 0,
            class: M(B.value),
            style: ft(N.value),
            "aria-hidden": "true",
            onMousedown: G
          }, null, 38)) : _("", !0)
        ]),
        _: 1
      }),
      X($e, {
        mode: "out-in",
        name: "n-toast"
      }, {
        default: O(() => [
          n.value ? (c(), $(L(e.tag), H({
            key: 0,
            ref_key: "contentRef",
            ref: l,
            role: e.role,
            "aria-live": de(t)["aria-live"] || "polite",
            "aria-atomic": de(t)["aria-atomic"] || "true",
            class: F.value,
            style: E.value
          }, R.value, {
            onMouseenter: x,
            onMouseleave: Y,
            onFocusin: x,
            onFocusout: Y
          }), {
            default: O(() => [
              w(J.$slots, "default", {}, () => [
                e.content ? (c(), S("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, Da)) : _("", !0)
              ])
            ]),
            _: 3
          }, 16, ["role", "aria-live", "aria-atomic", "class", "style"])) : _("", !0)
        ]),
        _: 3
      })
    ], 8, ["to"])) : _("", !0);
  }
});
function wl() {
  const s = Qe();
  if (!s)
    throw new Error("useNotify must be called within setup() or a lifecycle hook.");
  const o = s.appContext;
  async function t(r) {
    const u = document.createElement("div");
    u.id = `toast-app-${Ae()}`, document.body.appendChild(u), r = r ?? {}, r.hideOnAction ??= !0;
    const p = {
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
    }, m = /* @__PURE__ */ new Map();
    async function h() {
      C("hide"), setTimeout(() => k(), 300);
    }
    Array.isArray(d.actions) && (d.actions = d.actions.map((D) => {
      const G = D.onClick;
      return { ...D, onClick: () => {
        typeof G == "function" ? G({ hide: b, executeCallbacks: C }) : (D.label?.toLocaleLowerCase() === "ok" ? C("ok") : D.label?.toLocaleLowerCase() === "cancel" && C("cancel"), C("dismiss"), r.hideOnAction && b());
      } };
    }));
    const T = X(
      Sa,
      {
        ...p,
        "onUpdate:modelValue": (D) => {
          D || h();
        }
      },
      {
        default: () => K(
          fn,
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
    o && (T.appContext = o), He(T, u), await ye();
    async function b() {
      const D = T.component;
      D?.exposed?.hide && D.exposed.hide();
    }
    async function k() {
      He(null, u), u.remove();
    }
    function g(D, G) {
      const x = m.get(D) || [];
      x.push(G), m.set(D, x);
    }
    function C(D, ...G) {
      const x = m.get(D) || [];
      for (const Y of x)
        Y(G);
    }
    function v(D) {
      g("hide", D);
    }
    function B(D) {
      g("dismiss", D);
    }
    function N(D) {
      g("cancel", D);
    }
    function F(D) {
      g("ok", D);
    }
    function E(D) {
      g("show", D);
    }
    async function R() {
      return T.component?.exposed?.show(), await ye(), C("show"), {
        hide: b,
        onHide: v,
        onDismiss: B,
        onCancel: N,
        onOk: F
      };
    }
    return {
      show: R,
      onShow: E
    };
  }
  const e = async (r, u) => (await t({
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
    ...u
  })).show();
  return {
    create: t,
    notify: e,
    success: (r, u) => e(r, { bannerClass: "success", ...u }),
    error: (r, u) => e(r, { bannerClass: "error", ...u }),
    warning: (r, u) => e(r, { bannerClass: "warning", ...u }),
    info: (r, u) => e(r, { bannerClass: "info", ...u })
  };
}
const xa = ["innerHTML"], Na = {
  key: 0,
  class: "n-popover-overlay"
}, Ra = ["innerHTML"], Fa = ["innerHTML"], Oa = /* @__PURE__ */ Q({
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
  setup(s, { expose: o }) {
    const t = ae(), e = s, n = ve(s, "modelValue"), a = Pe("contentRef"), { isReady: l } = mt("n-popovers-container"), f = ee(null), r = ee(null), u = i(() => r.value || f.value), p = () => {
      e.attachParent ? r.value = pt(e.attachParent) : r.value = null;
    }, d = i(() => `${e.direction}${e.position !== "" ? `-${e.position}` : ""}`), m = i(() => ({
      ...e,
      hoverTriggerAnchor: e.triggerByHover ? e.hoverTriggerAnchor : null,
      focusTriggerAnchor: e.triggerByFocus ? e.focusTriggerAnchor : null,
      clickTriggerAnchor: e.triggerByInteraction ? e.clickTriggerAnchor : null
    })), {
      show: h,
      hide: T,
      handleContentHoverFocusIn: b,
      handleContentHoverFocusOut: k,
      compStyles: g,
      placement: C,
      parentWidth: v
    } = on(m, {
      model: i({
        get: () => n.value,
        set: (E) => {
          n.value = E;
        }
      }),
      contentRef: a,
      attachParentEl: u,
      placement: d
    }), B = i(() => {
      const E = { ...g.value };
      return e.fit && (E.width = `${v.value}px`), E;
    }), N = i(() => ["n-popover", `n-popover--direction-${C.value}`]), F = i(() => {
      const {
        tag: E,
        content: R,
        showDelay: D,
        hideDelay: G,
        persistent: x,
        hoverTriggerAnchor: Y,
        focusTriggerAnchor: fe,
        clickTriggerAnchor: ie,
        attachParent: J,
        triggerByHover: pe,
        triggerByFocus: Z,
        triggerByInteraction: se,
        direction: he,
        position: Ie,
        margin: _e,
        offset: Oe,
        autoReposition: Me,
        stacked: be,
        overlay: Te,
        fit: ue,
        role: Ve,
        ...ke
      } = e;
      return {
        style: B.value,
        onMouseenter: b,
        onMouseleave: k,
        onFocusin: b,
        onFocusout: k,
        ...ke,
        ...t
      };
    });
    return en(() => {
      f.value = sn(), p();
    }), ge(() => e.attachParent, p), o({ show: h, hide: T, contentRef: a }), (E, R) => e.stacked ? (c(), $($e, {
      key: 0,
      name: "n-popover"
    }, {
      default: O(() => [
        n.value ? (c(), $(L(e.tag), H({
          key: 0,
          ref_key: "contentRef",
          ref: a,
          class: N.value,
          role: e.role
        }, F.value), {
          default: O(() => [
            w(E.$slots, "default", {}, () => [
              e.content ? (c(), S("span", {
                key: 0,
                innerHTML: e.content
              }, null, 8, xa)) : _("", !0)
            ])
          ]),
          _: 3
        }, 16, ["class", "role"])) : _("", !0)
      ]),
      _: 3
    })) : de(l) ? (c(), $(dt, {
      key: 1,
      to: "#n-popovers-container"
    }, [
      X($e, {
        name: e.overlay ? "n-popover-overlay" : "n-popover"
      }, {
        default: O(() => [
          n.value && e.overlay ? (c(), S("div", Na, [
            (c(), $(L(e.tag), H({
              ref_key: "contentRef",
              ref: a,
              class: N.value,
              role: e.role
            }, F.value), {
              default: O(() => [
                w(E.$slots, "default", {}, () => [
                  e.content ? (c(), S("span", {
                    key: 0,
                    innerHTML: e.content
                  }, null, 8, Ra)) : _("", !0)
                ])
              ]),
              _: 3
            }, 16, ["class", "role"]))
          ])) : n.value ? (c(), $(L(e.tag), H({
            key: 1,
            ref_key: "contentRef",
            ref: a,
            class: N.value,
            role: e.role
          }, F.value), {
            default: O(() => [
              w(E.$slots, "default", {}, () => [
                e.content ? (c(), S("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, Fa)) : _("", !0)
              ])
            ]),
            _: 3
          }, 16, ["class", "role"])) : _("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ])) : _("", !0);
  }
}), lt = /* @__PURE__ */ Q({
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
  setup(s, { expose: o, emit: t }) {
    const e = {
      direction: "right",
      position: "start",
      stacked: !0
    }, n = we(), a = s, l = t, f = Pe("popoverRef"), { transformedNodes: r } = pn(n, e), u = i(() => ["n-menu"]), p = i(() => {
      const {
        items: h,
        listTag: T,
        listClass: b,
        valueField: k,
        childrenField: g,
        contentField: C,
        triggerByHover: v,
        triggerByFocus: B,
        triggerByInteraction: N,
        allowClickToHide: F,
        recursiveTriggers: E,
        ...R
      } = a;
      return {
        ...R,
        hoverTriggerAnchor: v ? a.hoverTriggerAnchor : null,
        focusTriggerAnchor: B ? a.focusTriggerAnchor : null,
        clickTriggerAnchor: N ? a.clickTriggerAnchor : null,
        attachParent: N ? a.attachParent : null,
        allowClickToHide: F
      };
    }), d = (h, T = e) => h.map((b) => {
      const {
        [a.contentField]: k,
        [a.childrenField]: g,
        onClick: C,
        ...v
      } = b, B = !!(g && g.length), N = {
        key: b.key ?? b.id ?? b[a.valueField],
        ...v,
        role: "menuitem",
        "aria-haspopup": B ? "menu" : void 0,
        onClick: (F) => {
          C && typeof C == "function" && C(F), l("select", b);
        }
      };
      if (B && !n.item) {
        const {
          hoverTriggerAnchor: F,
          focusTriggerAnchor: E,
          clickTriggerAnchor: R,
          fit: D,
          items: G,
          triggerByHover: x,
          triggerByFocus: Y,
          triggerByInteraction: fe,
          allowClickToHide: ie,
          recursiveTriggers: J,
          ...pe
        } = a, Z = {
          ...pe,
          ...a.recursiveTriggers ? {
            triggerByHover: x,
            triggerByFocus: Y,
            triggerByInteraction: fe,
            allowClickToHide: ie,
            recursiveTriggers: J
          } : {}
        };
        return K(
          je,
          N,
          n.submenu ? K(te, null, n.submenu(b) ?? []) : {
            default: () => [
              K("span", { class: "grow" }, k),
              K(lt, {
                ...Z,
                ...e,
                items: g,
                ...T,
                onSelect: (se) => l("select", se)
              }),
              K(z, {
                name: "mdi-chevron-right",
                class: "ml-8 -mr-2",
                "aria-hidden": "true"
              })
            ]
          }
        );
      }
      return n.item ? K(te, null, n.item(b) ?? []) : K(je, N, () => n["item-content"]?.(b) ?? k);
    }), m = i(() => a.items && a.items.length ? d(a.items, e) : r.value);
    return o({ popoverRef: f }), (h, T) => (c(), $(Oa, H({
      ref_key: "popoverRef",
      ref: f,
      class: u.value
    }, p.value), {
      default: O(() => [
        (c(), $(L(a.listTag), {
          class: M(["n-list", a.listClass]),
          role: "menu"
        }, {
          default: O(() => [
            (c(!0), S(te, null, le(m.value, (b, k) => (c(), $(L(b), {
              key: b.key ?? k
            }))), 128))
          ]),
          _: 1
        }, 8, ["class"]))
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), ut = {
  direction: "right",
  position: "start",
  stacked: !0
};
function at(s) {
  const { children: o } = s;
  return typeof o == "string" || typeof o == "number" ? [String(o)] : Array.isArray(o) ? o : o && typeof o == "object" && "default" in o && typeof o.default == "function" ? o.default() : [];
}
function Ze(s, o = ut) {
  return s.map((t) => {
    if (!It(t) || t.type === Jt || t.type === Qt)
      return t;
    const e = {
      ...t.props,
      ref: t.ref ?? void 0,
      key: t.key ?? void 0
    };
    if (t.type === lt || it(t, "NMenu"))
      return K(lt, Xe(ut, { ...e, ...o }), {
        default: () => Ze(at(t), o)
      });
    if (t.type === te)
      return K(te, e, Ze(at(t), o));
    if (t.type === je || it(t, "NListItem") || t.type === "li") {
      const n = at(t), a = n.findIndex(
        (p) => It(p) && (p.type === "ul" || it(p, ["NMenu", "NList"]))
      ), l = a !== -1, f = l ? n.filter((p, d) => d !== a) : n, r = Ze(f, o), u = t.children && typeof t.children == "object" && !Array.isArray(t.children) ? { ...t.children } : {};
      if (l) {
        const p = n[a];
        return K(je, e, {
          ...u,
          default: () => [
            ...r,
            K(lt, Xe(ut, { ...p.props, ...o }), {
              default: () => Ze(at(p), o)
            }),
            K(z, { name: "chevron-right", class: "ml-8 -mr-2" })
          ]
        });
      }
      return K(je, e, { ...u, default: () => r });
    }
    if (t.children) {
      const n = at(t);
      if (n.length)
        return K(t.type, e, {
          default: () => Ze(n, o)
        });
    }
    return t;
  });
}
function pn(s, o = ut) {
  return {
    transformedNodes: i(() => Ze(s.default?.() ?? [], o))
  };
}
const Va = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NList",
  props: {
    tag: { default: "ul" },
    items: {},
    valueField: { default: "value" },
    childrenField: { default: "children" },
    contentField: { default: "content" }
  },
  setup(s) {
    const o = we(), t = ae(), e = s, { transformedNodes: n } = pn(o), a = i(() => ["n-list"]), l = i(() => ({ ...t })), f = i(() => e.items ? r(e.items) : n.value);
    function r(u) {
      return u.length === 0 ? [
        o.empty ? K(te, null, o.empty({ items: u }) ?? []) : K(je, { key: "empty" }, () => o["empty-content"]?.() ?? "No item found.")
      ] : u.map((p) => {
        const d = p[e.contentField], m = p[e.childrenField], h = { ...p };
        delete h[e.contentField], delete h[e.childrenField];
        const T = p?.[e.valueField] || Ae(), b = m && Array.isArray(m) && m.length > 0 ? K(Va, {
          items: m,
          tag: e.tag,
          valueField: e.valueField,
          childrenField: e.childrenField,
          contentField: e.contentField,
          class: "w-full pl-4"
        }) : null;
        if (o.item)
          return K(te, { key: T }, o.item({ ...p, childrenNodes: b }) ?? []);
        const k = { key: T, ...h }, g = {
          default: () => o["item-content"]?.(p) ?? d
        };
        if (b)
          if (k.expandable)
            g.content = () => b;
          else {
            const C = g.default;
            g.default = () => [C(), b];
          }
        return K(je, k, g);
      });
    }
    return (u, p) => (c(), $(L(e.tag), H({ class: a.value }, l.value, { role: "list" }), {
      default: O(() => [
        (c(!0), S(te, null, le(f.value, (d, m) => (c(), $(L(d), {
          key: d?.key || m
        }))), 128))
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), Ea = ["type", "aria-busy", "disabled", "readonly"], Pa = {
  key: 2,
  class: "n-input-field-overlay"
}, La = {
  key: 1,
  class: "n-input-field-message"
}, _t = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = s, [n, a] = ve(s, "modelValue"), l = `input-id-${Ae()}`, f = i(() => typeof e.format == "function" ? e.format(n.value) : n.value), r = i(() => !!e.disabled), u = i(() => ["n-input-field", ...ce(t.class)]), p = i(() => ["n-input-field-container", ...ce(e.containerClass)]), d = i(() => [
      "n-input-field-wrapper",
      e.loading ? "n-input-field--loading" : "",
      r.value ? "n-input-field--disabled" : "",
      `n-input-field--size-${e.size}`,
      ...ce(e.wrapperClass)
    ]), m = i(() => ["n-input-field-label"]), h = i(() => ce(e.iconClass, e.prependIconClass)), T = i(() => Fe(t, ["class"])), b = i(() => Fe(t, ["class"])), k = i(() => ({
      ...e,
      modifiers: a,
      inputId: l,
      modelValue: n.value,
      formattedModelValue: f.value
    })), g = i(() => Ce(o.before?.(k.value) ?? [], "span")), C = i(() => Ce(o.after?.(k.value) ?? [], "span"));
    return (v, B) => (c(), S("div", {
      class: M(d.value)
    }, [
      (c(!0), S(te, null, le(g.value, (N, F) => (c(), $(L(N), { key: F }))), 128)),
      U("div", {
        class: M(p.value)
      }, [
        e.label || v.$slots.label ? w(v.$slots, "label", { key: 0 }, () => [
          U("label", {
            class: M(m.value),
            for: l
          }, re(e.label), 3)
        ]) : _("", !0),
        w(v.$slots, "top"),
        (c(), $(L(e.tag), H({ class: u.value }, T.value), {
          default: O(() => [
            w(v.$slots, "loading", {}, () => [
              X($e, { name: "n-loading-overlay" }, {
                default: O(() => [
                  e.loading ? (c(), $(et, {
                    key: 0,
                    overlay: !0,
                    name: e.loadingName,
                    class: M(e.loadingClass),
                    "aria-hidden": "true"
                  }, null, 8, ["name", "class"])) : _("", !0)
                ]),
                _: 1
              })
            ]),
            w(v.$slots, "prepend"),
            e.prependIcon || e.icon ? (c(), $(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: M(h.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : _("", !0),
            w(v.$slots, "default", Ee(Ye(k.value)), () => [
              Ke(U("input", H({
                id: l,
                "onUpdate:modelValue": B[0] || (B[0] = (N) => At(n) ? n.value = N : null),
                type: e.type,
                "aria-busy": e.loading || void 0,
                disabled: e.disabled,
                readonly: e.readonly
              }, b.value), null, 16, Ea), [
                [nn, de(n)]
              ])
            ]),
            e.appendIcon ? (c(), $(z, {
              key: 1,
              name: e.appendIcon,
              class: M(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : _("", !0),
            w(v.$slots, "append"),
            v.$slots.overlay ? (c(), S("div", Pa, [
              w(v.$slots, "overlay")
            ])) : _("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        w(v.$slots, "dropdown"),
        w(v.$slots, "bottom"),
        e.message || e.helperText ? (c(), S("div", La, re(e.message || e.helperText), 1)) : _("", !0)
      ], 2),
      (c(!0), S(te, null, le(C.value, (N, F) => (c(), $(L(N), { key: F }))), 128))
    ], 2));
  }
}), Ha = ["id", "name", "type", "disabled", "readonly"], Il = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = s, n = ve(s, "modelValue"), a = ee(n.value), l = i(() => Fe(o, ["default"])), f = i(() => ["n-input-text", ...ce(t.class)]), r = i(() => {
      const { type: m, inputClass: h, modelValue: T, modelModifiers: b, debounce: k, ...g } = e;
      return { ...g, style: t.style };
    }), u = i(() => Fe(t, ["class", "style"])), p = ln((m) => {
      n.value = m;
    }, e.debounce);
    ge(
      () => n.value,
      (m) => {
        m !== a.value && (a.value = m);
      }
    );
    function d() {
      e.debounce > 0 ? p(a.value) : n.value = a.value;
    }
    return (m, h) => (c(), $(_t, H({
      modelValue: a.value,
      "onUpdate:modelValue": h[1] || (h[1] = (T) => a.value = T),
      class: f.value
    }, r.value), ct({
      default: O(({ inputId: T }) => [
        Ke(U("input", H({
          id: T,
          "onUpdate:modelValue": h[0] || (h[0] = (b) => a.value = b),
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          readonly: e.readonly,
          class: ["peer", e.inputClass]
        }, u.value, { onInput: d }), null, 16, Ha), [
          [nn, a.value]
        ])
      ]),
      _: 2
    }, [
      le(l.value, (T, b) => ({
        name: b,
        fn: O((k) => [
          w(m.$slots, b, Ee(Ye(k)))
        ])
      }))
    ]), 1040, ["modelValue", "class"]));
  }
}), Ya = ["id", "name", "multiple", "disabled"], $l = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = s, n = ve(s, "modelValue"), a = i({
      get: () => {
        if (e.multiple) {
          if (!n.value) return [];
          if (Array.isArray(n.value)) return n.value;
          try {
            const m = JSON.parse(n.value);
            return Array.isArray(m) ? m : [];
          } catch {
            return [];
          }
        }
        return n.value;
      },
      set: (m) => {
        n.value = m;
      }
    }), l = i(() => Fe(o, ["default", "append"])), f = i(() => [
      "n-input-select",
      e.showCheckmark ? "" : "n-input-select--no-checkmark",
      ...ce(t.class)
    ]), r = i(() => {
      const {
        inputClass: m,
        dropdownIcon: h,
        dropdownIconClass: T,
        formatOption: b,
        formatOptGroup: k,
        multiple: g,
        options: C,
        modelValue: v,
        modelModifiers: B,
        showCheckmark: N,
        ...F
      } = e;
      return { ...F, style: t.style };
    }), u = i(() => Fe(t, ["class", "style"])), p = (m) => m.map((h) => {
      if ("options" in h) {
        const T = h, { label: b, options: k, ...g } = T, C = k?.map((v) => {
          const { label: B, value: N, ...F } = v;
          return K(
            "option",
            {
              value: N,
              label: typeof e.formatOption == "function" ? e.formatOption(B) : B,
              ...F
            },
            B
          );
        }) ?? [];
        return K(
          "optgroup",
          {
            label: typeof e.formatOptGroup == "function" ? e.formatOptGroup(b) : b,
            ...g
          },
          C
        );
      } else {
        const T = h, { label: b, value: k, ...g } = T;
        return K(
          "option",
          {
            value: k,
            label: typeof e.formatOption == "function" ? e.formatOption(b) : b,
            ...g
          },
          b
        );
      }
    }), d = i(() => e.options && e.options.length ? p(e.options) : Ce(o.default?.() ?? [], "option"));
    return (m, h) => (c(), $(_t, H({
      modelValue: n.value,
      "onUpdate:modelValue": h[1] || (h[1] = (T) => n.value = T),
      class: f.value
    }, r.value), ct({
      default: O(({ inputId: T }) => [
        Ke(U("select", H({
          id: T,
          "onUpdate:modelValue": h[0] || (h[0] = (b) => a.value = b),
          name: e.name,
          multiple: e.multiple,
          disabled: e.disabled,
          size: 1,
          class: ["peer", e.inputClass]
        }, u.value), [
          (c(!0), S(te, null, le(d.value, (b, k) => (c(), $(L(b), { key: k }))), 128))
        ], 16, Ya), [
          [In, a.value]
        ])
      ]),
      append: O(() => [
        X(z, {
          name: e.dropdownIcon,
          class: M([e.dropdownIconClass, "n-input-select-dropdown-icon"]),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"]),
        w(m.$slots, "append")
      ]),
      _: 2
    }, [
      le(l.value, (T, b) => ({
        name: b,
        fn: O((k) => [
          w(m.$slots, b, Ee(Ye(k)))
        ])
      }))
    ]), 1040, ["modelValue", "class"]));
  }
}), Wa = {
  key: 0,
  class: "n-input-combo-chips-container"
}, za = ["id", "name", "disabled", "readonly", "value", "placeholder", "aria-expanded", "onKeydown"], Al = /* @__PURE__ */ Q({
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
  setup(s, { emit: o }) {
    const t = s, e = o, n = we(), a = ae(), l = ve(s, "modelValue"), f = ve(s, "inputValue"), r = ve(s, "dropdown"), u = Pe("inputRef"), p = Pe("menuRef"), d = ee(!1), m = ee(!1), h = `menu-${Ae()}`, T = ee(/* @__PURE__ */ new Map()), b = $n("n-modal-focusable", null);
    function k(y) {
      for (const A of y) {
        const I = A[t.valueField];
        I != null && T.value.set(I, A), A[t.childrenField] && Array.isArray(A[t.childrenField]) && k(A[t.childrenField]);
      }
    }
    const g = (y, A) => {
      for (const I of y) {
        if (I[t.valueField] === A)
          return I;
        if (I[t.childrenField] && Array.isArray(I[t.childrenField])) {
          const P = g(I[t.childrenField], A);
          if (P) return P;
        }
      }
      return T.value.get(A) || null;
    }, C = (y) => y ? y[t.labelField] : "", v = (y) => y ? y[t.valueField] : "", B = i(() => {
      if (t.multiple)
        return Array.isArray(l.value) ? l.value.map(
          (A) => g(t.items, A) || {
            [t.valueField]: A,
            [t.labelField]: A
          }
        ) : [];
      const y = l.value;
      return g(t.items, y) || null;
    }), N = i(() => t.multiple && Array.isArray(B.value) && B.value.length > 0), F = i(() => {
      if (!t.useInput || !f.value) return t.items;
      const y = f.value.toLowerCase();
      return t.items.filter((A) => (A[t.labelField] || "").toLowerCase().includes(y));
    }), E = i(() => {
      if (F.value.length === 0) {
        const y = !!n.empty;
        return [
          {
            [t.labelField]: n.empty?.() || "No results found",
            heading: !y,
            disabled: !0,
            value: "empty-state",
            class: y ? "" : "text-muted italic px-4 py-2"
          }
        ];
      }
      return Me(F.value);
    }), R = i(() => typeof t.closeDropdownOnSelected == "boolean" ? t.closeDropdownOnSelected : !t.multiple), D = i(() => !(!t.clearable || !l.value || Array.isArray(l.value) && l.value.length === 0)), G = i(() => t.multiple ? !1 : B.value && !f.value && !d.value || !t.useInput), x = i(() => t.multiple && !t.useInput && N.value), Y = i(
      () => Fe(n, ["default", "item", "item-content", "chip", "append", "no-option"])
    ), fe = i(() => ["n-input-combo", ...ce(a.class)]), ie = i(() => {
      const {
        inputClass: y,
        popoverClass: A,
        listClass: I,
        valueClass: P,
        dropdownIcon: ne,
        dropdownIconClass: j,
        items: oe,
        chipProps: Be,
        menuProps: xe,
        clearable: Tt,
        labelField: Bt,
        childrenField: Dt,
        valueField: gt,
        multiple: yt,
        closeDropdownOnSelected: ht,
        blurOnSelected: Mt,
        useInput: St,
        ...bt
      } = t, kt = Object.fromEntries(Object.entries(a).filter(([rt]) => !rt.startsWith("on")));
      return {
        ...Fe(kt, ["class", "modelValue"]),
        ...Fe(bt, ["modelValue", "modelModifiers"])
      };
    }), J = i(() => Fe(a, ["class", "style", "modelValue", "placeholder"])), pe = i(() => C(B.value) ? "" : a.placeholder || ""), Z = i(() => ["n-input-combo-value", ...ce(t.valueClass)]), se = i(() => m.value ? null : u.value);
    ge(r, (y, A, I) => {
      y && (b?.pause(), I(() => {
        document.activeElement === document.body && b?.focusContent(), b?.unpause();
      }));
    }), ge(
      () => t.items,
      (y) => {
        k(y);
      },
      { immediate: !0, deep: !0 }
    ), ge(
      () => l.value,
      (y) => {
        if (!t.multiple && t.fillInput) {
          const A = g(t.items, y);
          A ? f.value = t.fillInput === "value" ? v(A) : C(A) : f.value = "";
        }
      },
      { immediate: !0 }
    );
    const he = ln((y) => {
      e("filter", y);
    }, t.debounce);
    function Ie(y) {
      y.key === "ArrowDown" ? (y.preventDefault(), _e(y.target)) : y.key === "ArrowUp" ? (y.preventDefault(), Oe(y.target)) : y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), nt()) : y.key === "ArrowLeft" && (y.preventDefault(), u.value?.focus());
    }
    function _e(y) {
      let A = y.nextElementSibling;
      for (; A; ) {
        if (A.getAttribute("tabindex") === "0") {
          A.focus();
          return;
        }
        A = A.nextElementSibling;
      }
    }
    function Oe(y) {
      let A = y.previousElementSibling;
      for (; A; ) {
        if (A.getAttribute("tabindex") === "0") {
          A.focus();
          return;
        }
        A = A.previousElementSibling;
      }
      u.value?.focus();
    }
    function Me(y) {
      return y.map((A) => {
        const I = !!A.heading, P = !!A.disabled, ne = be(A), j = A[t.childrenField], oe = j && Array.isArray(j) ? Me(j) : void 0;
        return {
          ...A,
          [t.childrenField]: oe,
          class: ce(A.class, ne ? "n-list-item--active" : ""),
          tabindex: I || P ? void 0 : "0",
          onKeydown: (Be) => {
            I || P || Ie(Be);
          },
          onMousedown: (Be) => {
            (I || P) && Be.preventDefault();
          }
        };
      });
    }
    function be(y) {
      const A = y[t.valueField];
      return t.multiple && Array.isArray(l.value) ? l.value.includes(A) : l.value === A;
    }
    function Te(y) {
      const A = l.value;
      if (t.multiple && Array.isArray(A)) {
        const I = [...A];
        I.splice(Number(y), 1), l.value = I;
      }
    }
    function ue() {
      u.value?.focus(), r.value || (r.value = !0);
    }
    function Ve(y) {
      const A = y.target;
      f.value = A.value, r.value || (r.value = !0), t.debounce > 0 ? he(f.value) : e("filter", f.value);
    }
    function ke() {
      d.value = !0;
    }
    function Ue() {
      d.value = !1;
    }
    function tt(y) {
      if (y.heading || y.disabled) return;
      const A = y[t.valueField];
      if (t.multiple) {
        const I = Array.isArray(l.value) ? [...l.value] : [], P = I.indexOf(A);
        P > -1 ? I.splice(P, 1) : I.push(A), l.value = I, f.value = "";
      } else
        l.value = A, f.value = t.fillInput === "value" ? v(y) : C(y), t.fillInput && ye(() => {
          u.value?.dispatchEvent(new Event("change", { bubbles: !0 }));
        });
      R.value && nt(), t.blurOnSelected && u.value?.blur();
    }
    function ot() {
      l.value = t.multiple ? [] : void 0, f.value = "", e("clear");
    }
    function Ge() {
      if (t.multiple && f.value === "" && Array.isArray(l.value) && l.value.length > 0) {
        const y = [...l.value];
        y.pop(), l.value = y;
      }
    }
    function vt() {
      r.value && F.value.length > 0 ? tt(F.value[0]) : r.value || (r.value = !0);
    }
    async function nt() {
      m.value = !0, r.value = !1, await ye(), m.value = !1;
    }
    function V(y) {
      r.value && (y.stopPropagation(), nt());
    }
    function q() {
      r.value || (r.value = !0), ye(() => {
        if (!p.value) return;
        const A = document.getElementById(h);
        if (!A) return;
        const I = A.querySelector('[tabindex="0"]');
        I && I.focus();
      });
    }
    return (y, A) => (c(), $(_t, H(ie.value, { class: fe.value }), ct({
      default: O(({ inputId: I }) => [
        U("div", {
          class: "n-input-combo-display-container",
          onClick: ue
        }, [
          N.value ? (c(), S("div", Wa, [
            (c(!0), S(te, null, le(B.value, (P, ne) => w(y.$slots, "chip", {
              key: v(P),
              item: P,
              index: ne,
              remove: () => Te(ne)
            }, () => [
              X(Kn, H({
                label: C(P),
                removable: ""
              }, { ref_for: !0 }, t.chipProps, {
                onRemove: (j) => Te(ne),
                onClick: A[0] || (A[0] = Re(() => {
                }, ["stop"]))
              }), null, 16, ["label", "onRemove"])
            ])), 128))
          ])) : _("", !0),
          G.value ? (c(), S("span", {
            key: 1,
            class: M(Z.value)
          }, re(C(B.value)), 3)) : _("", !0),
          U("input", H({
            id: I,
            ref_key: "inputRef",
            ref: u,
            name: t.name,
            disabled: t.disabled,
            readonly: !t.useInput || t.readonly,
            type: "text",
            class: ["n-input-combo-input", t.inputClass, x.value ? "sr-only" : ""],
            value: f.value,
            autocomplete: "off",
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-haspopup": "menu",
            placeholder: pe.value,
            "aria-expanded": r.value,
            "aria-controls": h
          }, J.value, {
            onInput: Ve,
            onFocus: ke,
            onBlur: Ue,
            onKeydown: [
              ze(Re(q, ["prevent"]), ["down"]),
              ze(Re(vt, ["prevent"]), ["enter"]),
              ze(Ge, ["backspace"]),
              ze(V, ["esc"])
            ]
          }), null, 16, za)
        ]),
        !t.disabled && !t.loading ? (c(), $(lt, H({
          key: 0,
          id: h,
          ref_key: "menuRef",
          ref: p,
          modelValue: r.value,
          "onUpdate:modelValue": A[1] || (A[1] = (P) => r.value = P),
          class: ["n-input-combo-menu", t.popoverClass],
          fit: "",
          items: E.value,
          "content-field": t.labelField,
          "children-field": t.childrenField,
          "value-field": t.valueField,
          "hover-trigger-anchor": u.value,
          "focus-trigger-anchor": se.value
        }, t.menuProps, { onSelect: tt }), ct({ _: 2 }, [
          y.$slots.item ? {
            name: "item",
            fn: O((P) => [
              w(y.$slots, "item", { item: P })
            ]),
            key: "0"
          } : void 0,
          y.$slots["item-content"] ? {
            name: "item-content",
            fn: O((P) => [
              w(y.$slots, "item-content", { item: P })
            ]),
            key: "1"
          } : void 0
        ]), 1040, ["modelValue", "class", "items", "content-field", "children-field", "value-field", "hover-trigger-anchor", "focus-trigger-anchor"])) : _("", !0)
      ]),
      append: O(() => [
        D.value ? (c(), $(z, {
          key: 0,
          name: "mdi-close",
          class: "cursor-pointer hover:text-error transition-colors",
          onClick: Re(ot, ["stop"])
        })) : _("", !0),
        X(z, {
          name: t.dropdownIcon,
          class: M([t.dropdownIconClass, r.value ? "rotate-180" : ""])
        }, null, 8, ["name", "class"]),
        w(y.$slots, "append")
      ]),
      _: 2
    }, [
      le(Y.value, (I, P) => ({
        name: P,
        fn: O((ne) => [
          w(y.$slots, P, Ee(Ye(ne)))
        ])
      }))
    ]), 1040, ["class"]));
  }
}), ja = ["name", ".indeterminate"], Ka = { class: "n-checkbox-display" }, Ua = {
  key: 3,
  class: "n-checkbox-overlay"
}, Ga = {
  key: 1,
  class: "n-checkbox-message"
}, _l = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = s, [n, a] = ve(s, "modelValue"), l = `input-id-${Ae()}`, f = i(() => ["n-checkbox"]), r = i(() => ["n-checkbox-container"]), u = i(() => [
      "n-checkbox-wrapper",
      e.size ? `n-checkbox--${e.size}` : ""
    ]), p = i(() => ["n-checkbox-label"]), d = i(() => ce(e.iconClass, e.prependIconClass)), m = i(() => {
      const { class: g, style: C } = t;
      return { class: g, style: C };
    }), h = i(() => {
      const { class: g, style: C, ...v } = t;
      return v;
    }), T = i(() => ({
      ...e,
      modifiers: a,
      inputId: l,
      modelValue: n.value
    })), b = i(() => Ce(o.before?.(T.value) ?? [], "span")), k = i(() => Ce(o.after?.(T.value) ?? [], "span"));
    return (g, C) => (c(), S("div", {
      class: M(u.value)
    }, [
      (c(!0), S(te, null, le(b.value, (v, B) => (c(), $(L(v), { key: B }))), 128)),
      U("div", {
        class: M(r.value)
      }, [
        !e.inlineLabel && (e.label || g.$slots.label) ? w(g.$slots, "label", { key: 0 }, () => [
          U("label", {
            class: M(p.value),
            for: l
          }, re(e.label), 3)
        ]) : _("", !0),
        w(g.$slots, "top"),
        (c(), $(L(e.tag), H({ class: f.value }, m.value), {
          default: O(() => [
            w(g.$slots, "prepend"),
            e.prependIcon || e.icon ? (c(), $(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: M(d.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : _("", !0),
            Ke(U("input", H({
              id: l,
              "onUpdate:modelValue": C[0] || (C[0] = (v) => At(n) ? n.value = v : null),
              name: e.name,
              type: "checkbox",
              class: ["peer", e.inputClass],
              ".indeterminate": de(n) === null
            }, h.value), null, 48, ja), [
              [an, de(n)]
            ]),
            U("div", Ka, [
              e.uncheckedIcon ? (c(), $(z, {
                key: 0,
                name: e.uncheckedIcon,
                class: M(["n-checkbox-display-unchecked", e.uncheckedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : _("", !0),
              e.checkedIcon ? (c(), $(z, {
                key: 1,
                name: e.checkedIcon,
                class: M(["n-checkbox-display-checked", e.checkedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : _("", !0),
              e.indeterminateIcon ? (c(), $(z, {
                key: 2,
                name: e.indeterminateIcon,
                class: M(["n-checkbox-display-indeterminate", e.indeterminateIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : _("", !0)
            ]),
            w(g.$slots, "default", Ee(Ye(T.value))),
            e.inlineLabel && (e.label || g.$slots.label) ? w(g.$slots, "inlineLabel", { key: 1 }, () => [
              U("label", {
                class: M(p.value),
                for: l
              }, re(e.label), 3)
            ]) : _("", !0),
            e.appendIcon ? (c(), $(z, {
              key: 2,
              name: e.appendIcon,
              class: M(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : _("", !0),
            w(g.$slots, "append"),
            g.$slots.overlay ? (c(), S("div", Ua, [
              w(g.$slots, "overlay")
            ])) : _("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        w(g.$slots, "dropdown"),
        w(g.$slots, "bottom"),
        e.message || e.helperText ? (c(), S("div", Ga, re(e.message || e.helperText), 1)) : _("", !0)
      ], 2),
      (c(!0), S(te, null, le(k.value, (v, B) => (c(), $(L(v), { key: B }))), 128))
    ], 2));
  }
}), Za = ["name", ".indeterminate"], Xa = { class: "n-toggle-track" }, qa = { class: "n-toggle-thumb" }, Ja = {
  key: 3,
  class: "n-toggle-overlay"
}, Qa = {
  key: 1,
  class: "n-toggle-message"
}, Tl = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = s, [n, a] = ve(s, "modelValue"), l = `input-id-${Ae()}`, f = i(() => ce(e.iconClass, e.prependIconClass)), r = i(() => ["n-toggle"]), u = i(() => ["n-toggle-container"]), p = i(() => [
      "n-toggle-wrapper",
      e.size ? `n-toggle--${e.size}` : ""
    ]), d = i(() => ["n-toggle-label"]), m = i(() => {
      const { class: g, style: C } = t;
      return { class: g, style: C };
    }), h = i(() => {
      const { class: g, style: C, ...v } = t;
      return v;
    }), T = i(() => ({
      ...e,
      modifiers: a,
      inputId: l,
      modelValue: n.value
    })), b = i(() => Ce(o.before?.(T.value) ?? [], "span")), k = i(() => Ce(o.after?.(T.value) ?? [], "span"));
    return (g, C) => (c(), S("div", {
      class: M(p.value)
    }, [
      (c(!0), S(te, null, le(b.value, (v, B) => (c(), $(L(v), { key: B }))), 128)),
      U("div", {
        class: M(u.value)
      }, [
        !e.inlineLabel && (e.label || g.$slots.label) ? w(g.$slots, "label", { key: 0 }, () => [
          U("label", {
            class: M(d.value),
            for: l
          }, re(e.label), 3)
        ]) : _("", !0),
        w(g.$slots, "top"),
        (c(), $(L(e.tag), H({ class: r.value }, m.value), {
          default: O(() => [
            w(g.$slots, "prepend"),
            e.prependIcon || e.icon ? (c(), $(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: M(f.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : _("", !0),
            Ke(U("input", H({
              id: l,
              "onUpdate:modelValue": C[0] || (C[0] = (v) => At(n) ? n.value = v : null),
              name: e.name,
              type: "checkbox",
              ".indeterminate": de(n) === null,
              class: ["peer", e.inputClass]
            }, h.value), null, 48, Za), [
              [an, de(n)]
            ]),
            U("div", Xa, [
              U("div", qa, [
                X(z, {
                  name: e.uncheckedIcon,
                  class: M(["n-toggle-display-unchecked", e.uncheckedIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"]),
                X(z, {
                  name: e.checkedIcon,
                  class: M(["n-toggle-display-checked", e.checkedIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"]),
                X(z, {
                  name: e.indeterminateIcon,
                  class: M(["n-toggle-display-indeterminate", e.indeterminateIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"])
              ])
            ]),
            w(g.$slots, "default", Ee(Ye(T.value))),
            e.inlineLabel && (e.label || g.$slots.label) ? w(g.$slots, "inlineLabel", { key: 1 }, () => [
              U("label", {
                class: M(d.value),
                for: l
              }, re(e.label), 3)
            ]) : _("", !0),
            e.appendIcon ? (c(), $(z, {
              key: 2,
              name: e.appendIcon,
              class: M(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : _("", !0),
            w(g.$slots, "append"),
            g.$slots.overlay ? (c(), S("div", Ja, [
              w(g.$slots, "overlay")
            ])) : _("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        w(g.$slots, "dropdown"),
        w(g.$slots, "bottom"),
        e.message || e.helperText ? (c(), S("div", Qa, re(e.message || e.helperText), 1)) : _("", !0)
      ], 2),
      (c(!0), S(te, null, le(k.value, (v, B) => (c(), $(L(v), { key: B }))), 128))
    ], 2));
  }
}), el = ["value", "name"], tl = { class: "n-radio-display" }, nl = {
  key: 3,
  class: "n-radio-overlay"
}, al = {
  key: 1,
  class: "n-radio-message"
}, Bl = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = we(), t = ae(), e = s, n = ve(s, "modelValue"), a = `input-id-${Ae()}`, l = i(() => ["n-radio"]), f = i(() => ["n-radio-container"]), r = i(() => [
      "n-radio-wrapper",
      e.size ? `n-radio--${e.size}` : ""
    ]), u = i(() => ["n-radio-label"]), p = i(() => ce(e.iconClass, e.prependIconClass)), d = i(() => {
      const { class: k, style: g } = t;
      return { class: k, style: g };
    }), m = i(() => {
      const { class: k, style: g, ...C } = t;
      return C;
    }), h = i(() => ({
      ...e,
      inputId: a,
      modelValue: n.value
    })), T = i(() => Ce(o.before?.(h.value) ?? [], "span")), b = i(() => Ce(o.after?.(h.value) ?? [], "span"));
    return (k, g) => (c(), S("div", {
      class: M(r.value)
    }, [
      (c(!0), S(te, null, le(T.value, (C, v) => (c(), $(L(C), { key: v }))), 128)),
      U("div", {
        class: M(f.value)
      }, [
        !e.inlineLabel && (e.label || k.$slots.label) ? w(k.$slots, "label", { key: 0 }, () => [
          U("label", {
            class: M(u.value),
            for: a
          }, re(e.label), 3)
        ]) : _("", !0),
        w(k.$slots, "top"),
        (c(), $(L(e.tag), H({ class: l.value }, d.value), {
          default: O(() => [
            w(k.$slots, "prepend"),
            e.prependIcon || e.icon ? (c(), $(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: M(p.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : _("", !0),
            Ke(U("input", H({
              id: a,
              "onUpdate:modelValue": g[0] || (g[0] = (C) => n.value = C),
              value: e.value,
              name: e.name,
              type: "radio",
              class: ["peer", e.inputClass]
            }, m.value), null, 16, el), [
              [An, n.value]
            ]),
            U("div", tl, [
              X(z, {
                name: e.uncheckedIcon,
                class: M(["n-radio-display-unchecked", e.uncheckedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"]),
              X(z, {
                name: e.checkedIcon,
                class: M(["n-radio-display-checked", e.checkedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])
            ]),
            w(k.$slots, "default", Ee(Ye(h.value))),
            e.inlineLabel && (e.label || k.$slots.label) ? w(k.$slots, "inlineLabel", { key: 1 }, () => [
              U("label", {
                class: M(u.value),
                for: a
              }, re(e.label), 3)
            ]) : _("", !0),
            e.appendIcon ? (c(), $(z, {
              key: 2,
              name: e.appendIcon,
              class: M(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : _("", !0),
            w(k.$slots, "append"),
            k.$slots.overlay ? (c(), S("div", nl, [
              w(k.$slots, "overlay")
            ])) : _("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        w(k.$slots, "dropdown"),
        w(k.$slots, "bottom"),
        e.message || e.helperText ? (c(), S("div", al, re(e.message || e.helperText), 1)) : _("", !0)
      ], 2),
      (c(!0), S(te, null, le(b.value, (C, v) => (c(), $(L(C), { key: v }))), 128))
    ], 2));
  }
}), Dl = /* @__PURE__ */ Q({
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
  setup(s) {
    const o = {
      success: "mdi-check-circle",
      error: "mdi-close-circle",
      info: "mdi-information",
      warning: "mdi-alert-circle"
    }, t = ae(), e = s, n = `n-form-title-${Ae()}`, a = i(() => o[e.status] || ""), l = i(() => {
      const f = { ...t };
      return e.title && !f["aria-labelledby"] && (f["aria-labelledby"] = n), f;
    });
    return (f, r) => (c(), $(L(e.tag), H({ class: ["n-form"] }, l.value, {
      role: e.tag !== "form" ? "form" : void 0
    }), {
      default: O(() => [
        w(f.$slots, "title", {}, () => [
          e.title ? (c(), $(L(e.titleTag), {
            key: 0,
            id: n,
            class: M(["n-form-title", e.titleClass])
          }, {
            default: O(() => [
              st(re(e.title), 1)
            ]),
            _: 1
          }, 8, ["class"])) : _("", !0)
        ]),
        w(f.$slots, "message", {}, () => [
          e.message ? (c(), $(fn, {
            key: 0,
            icon: a.value,
            class: M(e.status)
          }, {
            default: O(() => [
              st(re(e.message), 1)
            ]),
            _: 1
          }, 8, ["icon", "class"])) : _("", !0)
        ]),
        w(f.$slots, "default")
      ]),
      _: 3
    }, 16, ["role"]));
  }
}), ll = ["aria-label"], sl = { class: "w-full h-full bg-surface flex items-center justify-center text-error p-4" }, ol = ["src", "srcset", "sizes", "alt", "loading"], Ml = /* @__PURE__ */ Q({
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
  setup(s, { emit: o }) {
    const t = s, e = o, n = Pe("containerRef"), a = ee(!t.lazy), l = ee(!0), f = ee(!1);
    if (t.lazy) {
      const { stop: h } = Rn(
        n,
        ([{ isIntersecting: T }]) => {
          T && (a.value = !0, h());
        },
        {
          threshold: t.threshold
        }
      );
    }
    function r(h) {
      l.value = !1, e("load", h);
    }
    function u(h) {
      l.value = !1, f.value = !0, e("error", h);
    }
    const p = i(() => {
      const h = {
        ...t.aspectRatio ? { aspectRatio: t.aspectRatio } : {},
        ...t.width ? { width: typeof t.width == "number" ? `${t.width}px` : t.width } : {},
        ...t.height ? { height: typeof t.height == "number" ? `${t.height}px` : t.height } : {}
      };
      return t.aspectRatio && !t.width && !t.height && (h.width = "100%"), h;
    }), d = i(() => [
      "n-image-img",
      `n-image-img--fit-${t.fit}`,
      t.aspectRatio || t.width && t.height ? "absolute inset-0 w-full h-full" : "block max-w-full h-auto",
      l.value || t.loading ? "opacity-0" : "opacity-100"
    ]), m = i(() => ({}));
    return (h, T) => (c(), S("div", {
      ref_key: "containerRef",
      ref: n,
      class: M([
        "n-image",
        t.containerClass,
        { "n-image--block": t.width === "100%" || t.height === "100%" }
      ]),
      style: ft(p.value),
      role: "img",
      "aria-label": t.alt
    }, [
      X($e, { name: "n-image-fade" }, {
        default: O(() => [
          (l.value || t.loading) && !f.value ? (c(), S("div", {
            key: 0,
            class: M(["n-image-placeholder", t.placeholderClass])
          }, [
            w(h.$slots, "placeholder", {}, () => [
              X(et, {
                overlay: "",
                name: t.loadingName,
                class: M(t.loadingClass)
              }, null, 8, ["name", "class"])
            ])
          ], 2)) : _("", !0)
        ]),
        _: 3
      }),
      f.value ? (c(), S("div", {
        key: 0,
        class: M(["n-image-error", t.errorClass])
      }, [
        w(h.$slots, "error", {}, () => [
          U("div", sl, [
            X(z, {
              name: "alert-circle",
              class: "mr-2"
            }),
            T[0] || (T[0] = U("span", { class: "text-sm" }, "Failed to load image", -1))
          ])
        ])
      ], 2)) : _("", !0),
      a.value ? (c(), S("img", H({
        key: 1,
        ref: "imageRef",
        src: t.src,
        srcset: t.srcset,
        sizes: t.sizes,
        alt: t.alt,
        class: d.value,
        style: m.value,
        loading: t.lazy ? "lazy" : void 0
      }, h.$attrs, {
        onLoad: r,
        onError: u
      }), null, 16, ol)) : _("", !0)
    ], 14, ll));
  }
}), Sl = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NHeader",
  props: {
    tag: { default: "header" }
  },
  setup(s) {
    const o = ae(), t = s, e = i(() => ["n-header"]), n = i(() => ({
      ...o
    }));
    return (a, l) => (c(), $(L(t.tag), H({ class: e.value }, n.value), {
      default: O(() => [
        w(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), xl = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "NFooter",
  props: {
    tag: { default: "footer" }
  },
  setup(s) {
    const o = ae(), t = s, e = i(() => ["n-footer"]), n = i(() => ({
      ...o
    }));
    return (a, l) => (c(), $(L(t.tag), H({ class: e.value }, n.value), {
      default: O(() => [
        w(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), rl = () => {
  const s = "n-tooltips-container";
  if (!document.getElementById(s)) {
    const o = document.createElement("div");
    o.id = s, document.body.appendChild(o);
  }
}, mn = (s, o) => {
  const t = o.value;
  if (!t)
    return;
  rl();
  const n = Object.keys(o.modifiers).find((r) => ["top", "bottom", "left", "right"].includes(r)) || "bottom", l = X(qn, {
    content: t,
    direction: n,
    attachParent: s,
    hoverTriggerAnchor: s,
    focusTriggerAnchor: s
  }), f = document.createElement("div");
  document.body.appendChild(f), He(l, f), s._tooltip = {
    vnode: l,
    container: f
  };
}, vn = (s) => {
  s._tooltip && (He(null, s._tooltip.container), s._tooltip.container.remove(), delete s._tooltip);
}, il = (s, o) => {
  if (s._tooltip && s._tooltip.vnode.component) {
    const { props: t } = s._tooltip.vnode.component;
    t.content = o.value;
    const e = Object.keys(o.modifiers);
    t.direction = e.find((n) => ["top", "bottom", "left", "right"].includes(n)) || "bottom";
  } else
    vn(s), mn(s, o);
}, Nl = {
  mounted(s, o) {
    mn(s, o);
  },
  updated(s, o) {
    il(s, o);
  },
  unmounted(s) {
    vn(s);
  }
};
export {
  vl as NAvatar,
  fn as NBanner,
  $t as NButton,
  gl as NCalendar,
  ya as NCard,
  _l as NCheckbox,
  Kn as NChip,
  bl as NDrawer,
  xl as NFooter,
  Dl as NForm,
  Sl as NHeader,
  z as NIcon,
  Ml as NImage,
  Al as NInputCombo,
  _t as NInputField,
  $l as NInputSelect,
  Il as NInputText,
  Va as NList,
  je as NListItem,
  et as NLoading,
  lt as NMenu,
  cn as NModal,
  Oa as NPopover,
  Bl as NRadio,
  hl as NTab,
  yl as NTabs,
  Sa as NToast,
  Tl as NToggle,
  qn as NTooltip,
  un as useComponentStack,
  kl as useDialog,
  on as useFloating,
  rn as useFocusable,
  pn as useMenuTransform,
  Cl as useModal,
  wl as useNotify,
  dn as usePausableTimer,
  mt as useTeleportContainer,
  Nl as vTooltip
};
