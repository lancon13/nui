import { defineComponent as J, useAttrs as ae, getCurrentInstance as et, computed as d, createBlock as A, openBlock as m, resolveDynamicComponent as P, mergeProps as H, withKeys as je, withModifiers as Re, withCtx as F, renderSlot as w, h as K, Text as sn, Comment as ln, isVNode as Dt, createElementBlock as M, createVNode as X, normalizeProps as Ve, guardReactiveProps as Ye, useSlots as we, unref as de, createCommentVNode as T, Transition as $e, normalizeClass as S, toDisplayString as re, Fragment as te, renderList as se, createTextVNode as ot, ref as ee, toValue as xe, watch as he, nextTick as ge, mergeModels as me, useModel as ve, useTemplateRef as Le, onMounted as on, Teleport as kt, toRefs as xn, createElementVNode as U, shallowRef as Wt, withDirectives as Ue, provide as Sn, onUnmounted as rn, normalizeStyle as Ct, render as He, getCurrentScope as Mn, onScopeDispose as Dn, isRef as Rt, vModelDynamic as un, createSlots as bt, vModelSelect as On, inject as Rn, vModelCheckbox as cn, vModelRadio as Nn } from "vue";
import { useFloating as Fn, autoUpdate as En, offset as zt, flip as Vn, shift as Ln } from "@floating-ui/vue";
import { useEventListener as Qe, useTimeoutFn as jt, useElementSize as Pn, toArray as Hn, unrefElement as Yn, tryOnScopeDispose as Wn, useDebounceFn as dn, useIntersectionObserver as zn } from "@vueuse/core";
import { toClassName as jn, generatePseudoRandomKey as Ae, delay as Kt } from "@nui/helpers";
import Y from "dayjs";
import { vOnClickOutside as Kn } from "@vueuse/components";
import { createFocusTrap as Un } from "focus-trap";
const z = /* @__PURE__ */ J({
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
  setup(l) {
    const r = ae(), t = et(), e = l, n = d(() => !e.disabled && (e.to || e.href || !!r.onClick)), a = d(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), s = d(() => {
      const p = e.name || "mdi-account";
      return p.startsWith("mdi-") ? ["mdi", p] : ["mdi", `mdi-${p}`];
    }), c = d(() => [
      "n-icon",
      n.value ? "n-icon--clickable" : "",
      e.disabled ? "n-icon--disabled" : "",
      ...s.value
    ]), o = d(() => {
      const p = { ...r };
      return a.value === "RouterLink" ? (p.to = e.to, p.target = e.target) : a.value === "a" && (p.href = e.href, p.target = e.target), p;
    });
    function i(p) {
      if (e.disabled) {
        p.preventDefault(), p.stopPropagation();
        return;
      }
      n.value && t?.emit("click", p);
    }
    return (p, u) => (m(), A(P(a.value), H({
      class: c.value,
      role: n.value ? "button" : "img",
      tabindex: n.value ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, o.value, {
      onKeydown: je(Re(i, ["prevent"]), ["enter", "space"])
    }), {
      default: F(() => [
        w(p.$slots, "default")
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
}), wt = (l, r) => {
  if (typeof document > "u") return null;
  const t = document;
  return typeof l == "string" ? t.querySelector(l) : l;
}, fn = (l = null) => {
  if (l)
    return wt(l)?.parentElement || null;
  const r = et();
  return r ? r.proxy?.$el?.parentElement || null : (console.warn("getParentElement() without a selector can only be used inside setup() or lifecycle hooks."), null);
}, qn = (l) => {
  if (Dt(l) && l.type) {
    if (typeof l.type == "string")
      return l.type;
    if (typeof l.type == "object" && l.type !== null) {
      const r = l.type;
      return r.name || r.__name || r.__name__ || "";
    }
  }
  return "";
}, ut = (l, r) => {
  const t = qn(l);
  return t ? (Array.isArray(r) ? r : [r]).includes(t) : !1;
}, Gn = (l, r) => {
  if (!l.props || typeof l.props.class != "string")
    return !1;
  const t = l.props.class.split(/\s+/);
  return (Array.isArray(r) ? r : [r]).some((n) => t.includes(n));
};
function Ce(l, r = "span", t = {}) {
  return l ? (Array.isArray(l) ? l : [l]).map((n) => {
    if (typeof n == "string")
      return K(r, t, n);
    if ((n.type === sn || n.type === ln) && (n?.shapeFlag & 8) > 0) {
      const a = n.children;
      if (a?.trim())
        return K(r, t, a);
    }
    return n;
  }) : [];
}
function ce(...l) {
  const r = [];
  return l.forEach((t) => {
    t && (typeof t == "string" ? r.push(t) : Array.isArray(t) ? r.push(...t) : typeof t == "object" && r.push(t));
  }), r;
}
const Xn = {
  key: 0,
  class: "n-loading-overlay"
}, tt = /* @__PURE__ */ J({
  inheritAttrs: !1,
  __name: "NLoading",
  props: {
    name: {},
    class: {},
    overlay: { type: Boolean }
  },
  setup(l) {
    const r = ae(), t = l, e = d(() => ({
      name: t.name || "loading",
      class: t.class || "animate-spin",
      ...r
    }));
    return (n, a) => t.overlay ? (m(), M("span", Xn, [
      X(z, Ve(Ye(e.value)), null, 16)
    ])) : (m(), A(z, Ve(H({ key: 1 }, e.value)), null, 16));
  }
}), Zn = { key: 1 }, Ot = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = l, n = d(() => ["n-button", e.loading ? "n-button--loading" : ""]), a = d(() => e.to ? "RouterLink" : e.href ? "a" : e.tag), s = d(() => {
      const o = { ...t };
      return a.value === "RouterLink" ? (o.to = e.to, o.target = e.target) : a.value === "a" && (o.href = e.href, o.target = e.target), o;
    }), c = d(() => Ce(r.default?.() ?? [], "span"));
    return (o, i) => (m(), A(P(a.value), H({
      class: n.value,
      type: e.type,
      disabled: de(t).disabled || e.loading,
      "aria-disabled": de(t).disabled || e.loading ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, s.value), {
      default: F(() => [
        w(o.$slots, "loading", {}, () => [
          X($e, { name: "n-loading-overlay" }, {
            default: F(() => [
              e.loading ? (m(), A(tt, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: S(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : T("", !0)
            ]),
            _: 1
          })
        ]),
        w(o.$slots, "prepend"),
        e.prependIcon || e.icon ? (m(), A(z, {
          key: 0,
          name: e.prependIcon || e.icon,
          class: S([
            ...e.iconClass ? ["string", "object"].includes(typeof e.iconClass) ? [e.iconClass] : e.iconClass : [],
            ...e.prependIconClass ? ["string", "object"].includes(typeof e.prependIconClass) ? [e.prependIconClass] : e.prependIconClass : []
          ]),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : T("", !0),
        e.label ? (m(), M("span", Zn, re(e.label), 1)) : T("", !0),
        (m(!0), M(te, null, se(c.value, (p, u) => (m(), A(P(p), { key: u }))), 128)),
        e.appendIcon ? (m(), A(z, {
          key: 2,
          name: e.appendIcon,
          class: S(e.appendIconClass),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : T("", !0),
        w(o.$slots, "append")
      ]),
      _: 3
    }, 16, ["class", "type", "disabled", "aria-disabled", "aria-busy"]));
  }
}), Qn = ["aria-hidden"], Jn = {
  key: 2,
  class: "n-avatar-sizer",
  "aria-hidden": "true"
}, ea = ["src", "alt"], zs = /* @__PURE__ */ J({
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
  setup(l, { emit: r }) {
    const t = ae(), e = l, n = r, a = d(() => !e.disabled && (e.to || e.href || !!t.onClick)), s = d(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), c = d(() => ["n-avatar", a.value ? "n-avatar--clickable" : "", e.disabled ? "n-avatar--disabled" : ""]), o = d(() => {
      const p = { ...t };
      return s.value === "RouterLink" ? (p.to = e.to, p.target = e.target) : s.value === "a" && (p.href = e.href, p.target = e.target), p;
    });
    function i(p) {
      if (e.disabled) {
        p.preventDefault(), p.stopPropagation();
        return;
      }
      a.value && n("click", p);
    }
    return (p, u) => (m(), A(P(s.value), H({
      class: c.value,
      role: a.value && s.value === "span" ? "button" : void 0,
      tabindex: a.value && s.value === "span" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, o.value, {
      onClick: i,
      onKeydown: je(Re(i, ["prevent"]), ["enter", "space"])
    }), {
      default: F(() => [
        e.icon ? (m(), A(z, {
          key: 0,
          name: e.icon,
          class: S({ "opacity-0": e.src }),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : e.label || p.$slots.default ? (m(), M("span", {
          key: 1,
          class: S(["n-avatar-label", { "opacity-0": e.src }]),
          "aria-hidden": e.src ? "true" : void 0
        }, [
          w(p.$slots, "default", {}, () => [
            ot(re(e.label), 1)
          ])
        ], 10, Qn)) : (m(), M("span", Jn, " ")),
        e.src ? (m(), M("img", {
          key: 3,
          src: e.src,
          alt: e.alt || e.label || "",
          class: "n-avatar-image"
        }, null, 8, ea)) : T("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
}), ta = { key: 1 }, na = /* @__PURE__ */ J({
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
  setup(l, { emit: r }) {
    const t = ae(), e = l, n = r, a = d(() => !e.disabled && (e.to || e.href || !!t.onClick)), s = d(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), c = d(() => ["n-chip", a.value ? "n-chip--clickable" : "", e.disabled ? "n-chip--disabled" : ""]), o = d(() => {
      const u = { ...t };
      return s.value === "RouterLink" ? (u.to = e.to, u.target = e.target) : s.value === "a" && (u.href = e.href, u.target = e.target), u;
    });
    function i() {
      n("remove");
    }
    function p(u) {
      if (e.disabled) {
        u.preventDefault(), u.stopPropagation();
        return;
      }
      a.value && n("click", u);
    }
    return (u, f) => (m(), A(P(s.value), H({
      class: c.value,
      role: a.value && s.value === "span" ? "button" : void 0,
      tabindex: a.value && s.value === "span" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0
    }, o.value, {
      onClick: p,
      onKeydown: je(Re(p, ["prevent"]), ["enter", "space"])
    }), {
      default: F(() => [
        w(u.$slots, "prepend"),
        e.prependIcon || e.icon ? (m(), A(z, {
          key: 0,
          name: e.prependIcon || e.icon,
          "aria-hidden": "true"
        }, null, 8, ["name"])) : T("", !0),
        e.label || u.$slots.default ? (m(), M("span", ta, [
          w(u.$slots, "default", {}, () => [
            ot(re(e.label), 1)
          ])
        ])) : T("", !0),
        e.appendIcon ? (m(), A(z, {
          key: 2,
          name: e.appendIcon,
          "aria-hidden": "true"
        }, null, 8, ["name"])) : T("", !0),
        w(u.$slots, "append"),
        e.removable ? w(u.$slots, "removable", { key: 3 }, () => [
          X(z, {
            name: "mdi-close",
            class: S(e.removableClass),
            clickable: "",
            onClick: Re(i, ["stop"])
          }, null, 8, ["class"])
        ]) : T("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "onKeydown"]));
  }
});
function pn(l, r) {
  const { model: t, contentRef: e, attachParentEl: n, placement: a } = r, s = ee(!1), c = ee(!1), o = ee(!1), i = d(() => ({
    triggerByHover: !0,
    triggerByFocus: !0,
    triggerByInteraction: !0,
    ...xe(l)
  }));
  Qe(() => typeof document < "u" ? document : null, "mouseup", () => {
    c.value = !1;
  }), Qe(() => typeof document < "u" ? document : null, "keyup", () => {
    c.value = !1;
  });
  const p = jt(
    () => {
      Q();
    },
    d(() => i.value.showDelay ?? 0),
    {
      immediate: !1
    }
  ), u = jt(
    () => {
      document.activeElement !== xe(g) && !s.value && pe();
    },
    d(() => i.value.hideDelay ?? 0),
    {
      immediate: !1
    }
  ), f = ee(null), g = ee(null), I = ee(null), { width: b, height: k } = Pn(n), {
    x: h,
    y: C,
    strategy: v,
    placement: B
  } = Fn(n, e, {
    placement: a,
    whileElementsMounted: En,
    middleware: d(() => {
      const [G, le] = i.value.offset ?? [0, 0], ye = [zt(i.value.margin), zt({ crossAxis: G, mainAxis: le })];
      return i.value.autoReposition && (ye.push(Vn()), ye.push(Ln({ padding: 8 }))), ye;
    })
  }), D = d(() => ({
    position: v.value,
    top: C.value != null ? `${C.value}px` : "",
    left: h.value != null ? `${h.value}px` : ""
  })), O = () => {
    p.isPending.value && p.stop(), u.isPending.value && u.stop();
  }, V = (G, le, ye) => {
    G && Object.entries(le).forEach(([Ie, _e]) => {
      ye === "add" ? G.addEventListener(Ie, _e) : G.removeEventListener(Ie, _e);
    });
  };
  he(
    () => [
      i.value.hoverTriggerAnchor,
      i.value.focusTriggerAnchor,
      i.value.clickTriggerAnchor,
      n.value
    ],
    () => {
      ge(() => {
        const G = i.value, le = (ue) => ue ? wt(ue) : typeof ue > "u" ? n.value : null, ye = le(G.hoverTriggerAnchor), Ie = le(G.focusTriggerAnchor), _e = le(G.clickTriggerAnchor), Fe = {
          mouseenter: R,
          mouseleave: W
        }, Se = {
          focus: R,
          blur: W,
          mousedown: N,
          keydown: x
        }, be = {
          click: q
        }, Te = (ue, Ee, ke) => {
          ue.value !== Ee && (V(ue.value, ke, "remove"), ue.value = Ee, V(ue.value, ke, "add"));
        };
        Te(f, ye, Fe), Te(g, Ie, Se), Te(I, _e, be);
      });
    },
    { deep: !0, immediate: !0, flush: "post" }
  );
  function N() {
    c.value = !0;
  }
  function x(G) {
    (G.key === "Enter" || G.key === " ") && (c.value = !0);
  }
  function q(G) {
    if (t.value) {
      if (i.value.allowClickToHide) {
        if (i.value.persistent) return;
        O(), pe();
      }
    } else
      u.isPending.value && u.stop(), p.start();
  }
  function R() {
    c.value || o.value || (u.isPending.value && u.stop(), p.isPending.value || p.start());
  }
  function W(G) {
    i.value.persistent || G.type === "mouseleave" && !i.value.triggerByHover || (p.isPending.value && p.stop(), u.isPending.value || u.start());
  }
  function fe() {
    s.value = !0, u.isPending.value && u.stop();
  }
  function ie() {
    i.value.persistent || (s.value = !1, i.value.triggerByHover && (u.isPending.value || u.start()));
  }
  Qe("keydown", (G) => {
    t.value && G.key === "Escape" && !i.value.persistent && (G.preventDefault(), G.stopPropagation(), pe());
  });
  const Q = () => {
    t.value = !0;
  }, pe = (G = !1) => {
    const le = e.value?.contains(document.activeElement);
    t.value = !1, !G && le && ge(() => {
      o.value = !0, g.value ? g.value.focus() : n.value && n.value?.focus(), setTimeout(() => {
        o.value = !1;
      }, 0);
    });
  };
  return {
    show: Q,
    hide: pe,
    handleContentHoverFocusIn: fe,
    handleContentHoverFocusOut: ie,
    compStyles: D,
    placement: B,
    parentWidth: b,
    parentHeight: k
  };
}
function It(l, r = "") {
  const t = ee(!1);
  return he(
    () => [xe(l), xe(r)],
    async (e, n) => {
      if (!(typeof document > "u")) {
        if (t.value = !1, Array.isArray(n)) {
          const a = document.getElementById(n[0]);
          a && a.childElementCount === 0 && document.body.removeChild(a);
        }
        if (await ge(), !document.getElementById(e[0])) {
          const a = document.createElement("div");
          a.id = e[0], e[1] && (a.className = jn(e[1])), document.body.appendChild(a);
        }
        t.value = !0;
      }
    },
    { immediate: !0 }
  ), { isReady: t };
}
const aa = ["innerHTML"], sa = {
  key: 0,
  class: "n-tooltip-overlay",
  "aria-hidden": "true"
}, la = ["innerHTML"], oa = ["innerHTML"], ra = /* @__PURE__ */ J({
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
  setup(l, { expose: r }) {
    const t = ae(), e = l, n = ve(l, "modelValue"), a = Le("contentRef"), { isReady: s } = It("n-tooltips-container"), c = ee(null), o = ee(null), i = d(() => o.value || c.value), p = () => {
      e.attachParent ? o.value = wt(e.attachParent) : o.value = null;
    }, u = d(() => `${e.direction}${e.position !== "" ? `-${e.position}` : ""}`), f = d(() => ({
      ...e,
      hoverTriggerAnchor: e.triggerByHover ? e.hoverTriggerAnchor : null,
      focusTriggerAnchor: e.triggerByFocus ? e.focusTriggerAnchor : null,
      clickTriggerAnchor: e.triggerByInteraction ? e.clickTriggerAnchor : null
    })), {
      show: g,
      hide: I,
      handleContentHoverFocusIn: b,
      handleContentHoverFocusOut: k,
      compStyles: h,
      placement: C,
      parentWidth: v
    } = pn(f, {
      model: d({
        get: () => n.value,
        set: (V) => {
          n.value = V;
        }
      }),
      contentRef: a,
      attachParentEl: i,
      placement: u
    }), B = d(() => {
      const V = { ...h.value };
      return e.fit && (V.width = `${v.value}px`), V;
    }), D = d(() => ["n-tooltip", `n-tooltip--direction-${C.value}`]), O = d(() => {
      const {
        tag: V,
        content: N,
        showDelay: x,
        hideDelay: q,
        persistent: R,
        hoverTriggerAnchor: W,
        focusTriggerAnchor: fe,
        clickTriggerAnchor: ie,
        attachParent: Q,
        triggerByHover: pe,
        triggerByFocus: G,
        triggerByInteraction: le,
        allowClickToHide: ye,
        direction: Ie,
        position: _e,
        margin: Fe,
        offset: Se,
        autoReposition: be,
        stacked: Te,
        overlay: ue,
        fit: Ee,
        role: ke,
        ...qe
      } = e;
      return {
        style: B.value,
        onMouseenter: b,
        onMouseleave: k,
        onFocusin: b,
        onFocusout: k,
        ...qe,
        ...t
      };
    });
    return on(() => {
      c.value = fn(), p();
    }), he(() => e.attachParent, p), r({ show: g, hide: I, contentRef: a }), (V, N) => e.stacked ? (m(), A($e, {
      key: 0,
      name: "n-tooltip"
    }, {
      default: F(() => [
        n.value ? (m(), A(P(e.tag), H({
          key: 0,
          ref_key: "contentRef",
          ref: a,
          class: D.value,
          role: e.role
        }, O.value), {
          default: F(() => [
            w(V.$slots, "default", {}, () => [
              e.content ? (m(), M("span", {
                key: 0,
                innerHTML: e.content
              }, null, 8, aa)) : T("", !0)
            ])
          ]),
          _: 3
        }, 16, ["class", "role"])) : T("", !0)
      ]),
      _: 3
    })) : de(s) ? (m(), A(kt, {
      key: 1,
      to: "#n-tooltips-container"
    }, [
      X($e, {
        name: e.overlay ? "n-tooltip-overlay" : "n-tooltip"
      }, {
        default: F(() => [
          n.value && e.overlay ? (m(), M("div", sa, [
            (m(), A(P(e.tag), H({
              ref_key: "contentRef",
              ref: a,
              class: D.value,
              role: e.role
            }, O.value), {
              default: F(() => [
                w(V.$slots, "default", {}, () => [
                  e.content ? (m(), M("span", {
                    key: 0,
                    innerHTML: e.content
                  }, null, 8, la)) : T("", !0)
                ])
              ]),
              _: 3
            }, 16, ["class", "role"]))
          ])) : n.value ? (m(), A(P(e.tag), H({
            key: 1,
            ref_key: "contentRef",
            ref: a,
            class: D.value,
            role: e.role
          }, O.value), {
            default: F(() => [
              w(V.$slots, "default", {}, () => [
                e.content ? (m(), M("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, oa)) : T("", !0)
              ])
            ]),
            _: 3
          }, 16, ["class", "role"])) : T("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ])) : T("", !0);
  }
});
function We(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var ct = { exports: {} }, ia = ct.exports, Ut;
function ua() {
  return Ut || (Ut = 1, (function(l, r) {
    (function(t, e) {
      l.exports = e();
    })(ia, (function() {
      var t = "day";
      return function(e, n, a) {
        var s = function(i) {
          return i.add(4 - i.isoWeekday(), t);
        }, c = n.prototype;
        c.isoWeekYear = function() {
          return s(this).year();
        }, c.isoWeek = function(i) {
          if (!this.$utils().u(i)) return this.add(7 * (i - this.isoWeek()), t);
          var p, u, f, g, I = s(this), b = (p = this.isoWeekYear(), u = this.$u, f = (u ? a.utc : a)().year(p).startOf("year"), g = 4 - f.isoWeekday(), f.isoWeekday() > 4 && (g += 7), f.add(g, t));
          return I.diff(b, "week") + 1;
        }, c.isoWeekday = function(i) {
          return this.$utils().u(i) ? this.day() || 7 : this.day(this.day() % 7 ? i : i - 7);
        };
        var o = c.startOf;
        c.startOf = function(i, p) {
          var u = this.$utils(), f = !!u.u(p) || p;
          return u.p(i) === "isoweek" ? f ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : o.bind(this)(i, p);
        };
      };
    }));
  })(ct)), ct.exports;
}
var ca = ua();
const mn = /* @__PURE__ */ We(ca);
var dt = { exports: {} }, da = dt.exports, qt;
function fa() {
  return qt || (qt = 1, (function(l, r) {
    (function(t, e) {
      l.exports = e();
    })(da, (function() {
      return function(t, e) {
        e.prototype.isSameOrAfter = function(n, a) {
          return this.isSame(n, a) || this.isAfter(n, a);
        };
      };
    }));
  })(dt)), dt.exports;
}
var pa = fa();
const vn = /* @__PURE__ */ We(pa);
var ft = { exports: {} }, ma = ft.exports, Gt;
function va() {
  return Gt || (Gt = 1, (function(l, r) {
    (function(t, e) {
      l.exports = e();
    })(ma, (function() {
      return function(t, e) {
        e.prototype.isSameOrBefore = function(n, a) {
          return this.isSame(n, a) || this.isBefore(n, a);
        };
      };
    }));
  })(ft)), ft.exports;
}
var ha = va();
const hn = /* @__PURE__ */ We(ha);
var pt = { exports: {} }, ga = pt.exports, Xt;
function ya() {
  return Xt || (Xt = 1, (function(l, r) {
    (function(t, e) {
      l.exports = e();
    })(ga, (function() {
      return function(t, e, n) {
        var a = e.prototype, s = function(u) {
          return u && (u.indexOf ? u : u.s);
        }, c = function(u, f, g, I, b) {
          var k = u.name ? u : u.$locale(), h = s(k[f]), C = s(k[g]), v = h || C.map((function(D) {
            return D.slice(0, I);
          }));
          if (!b) return v;
          var B = k.weekStart;
          return v.map((function(D, O) {
            return v[(O + (B || 0)) % 7];
          }));
        }, o = function() {
          return n.Ls[n.locale()];
        }, i = function(u, f) {
          return u.formats[f] || (function(g) {
            return g.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(I, b, k) {
              return b || k.slice(1);
            }));
          })(u.formats[f.toUpperCase()]);
        }, p = function() {
          var u = this;
          return { months: function(f) {
            return f ? f.format("MMMM") : c(u, "months");
          }, monthsShort: function(f) {
            return f ? f.format("MMM") : c(u, "monthsShort", "months", 3);
          }, firstDayOfWeek: function() {
            return u.$locale().weekStart || 0;
          }, weekdays: function(f) {
            return f ? f.format("dddd") : c(u, "weekdays");
          }, weekdaysMin: function(f) {
            return f ? f.format("dd") : c(u, "weekdaysMin", "weekdays", 2);
          }, weekdaysShort: function(f) {
            return f ? f.format("ddd") : c(u, "weekdaysShort", "weekdays", 3);
          }, longDateFormat: function(f) {
            return i(u.$locale(), f);
          }, meridiem: this.$locale().meridiem, ordinal: this.$locale().ordinal };
        };
        a.localeData = function() {
          return p.bind(this)();
        }, n.localeData = function() {
          var u = o();
          return { firstDayOfWeek: function() {
            return u.weekStart || 0;
          }, weekdays: function() {
            return n.weekdays();
          }, weekdaysShort: function() {
            return n.weekdaysShort();
          }, weekdaysMin: function() {
            return n.weekdaysMin();
          }, months: function() {
            return n.months();
          }, monthsShort: function() {
            return n.monthsShort();
          }, longDateFormat: function(f) {
            return i(u, f);
          }, meridiem: u.meridiem, ordinal: u.ordinal };
        }, n.months = function() {
          return c(o(), "months");
        }, n.monthsShort = function() {
          return c(o(), "monthsShort", "months", 3);
        }, n.weekdays = function(u) {
          return c(o(), "weekdays", null, null, u);
        }, n.weekdaysShort = function(u) {
          return c(o(), "weekdaysShort", "weekdays", 3, u);
        }, n.weekdaysMin = function(u) {
          return c(o(), "weekdaysMin", "weekdays", 2, u);
        };
      };
    }));
  })(pt)), pt.exports;
}
var ba = ya();
const ka = /* @__PURE__ */ We(ba);
var mt = { exports: {} }, Ca = mt.exports, Zt;
function wa() {
  return Zt || (Zt = 1, (function(l, r) {
    (function(t, e) {
      l.exports = e();
    })(Ca, (function() {
      return function(t, e, n) {
        n.updateLocale = function(a, s) {
          var c = n.Ls[a];
          if (c) return (s ? Object.keys(s) : []).forEach((function(o) {
            c[o] = s[o];
          })), c;
        };
      };
    }));
  })(mt)), mt.exports;
}
var Ia = wa();
const $a = /* @__PURE__ */ We(Ia);
var vt = { exports: {} }, Aa = vt.exports, Qt;
function _a() {
  return Qt || (Qt = 1, (function(l, r) {
    (function(t, e) {
      l.exports = e();
    })(Aa, (function() {
      return function(t, e) {
        e.prototype.weekday = function(n) {
          var a = this.$locale().weekStart || 0, s = this.$W, c = (s < a ? s + 7 : s) - a;
          return this.$utils().u(n) ? c : this.subtract(c, "day").add(n, "day");
        };
      };
    }));
  })(vt)), vt.exports;
}
var Ta = _a();
const Ba = /* @__PURE__ */ We(Ta);
var ht = { exports: {} }, xa = ht.exports, Jt;
function Sa() {
  return Jt || (Jt = 1, (function(l, r) {
    (function(t, e) {
      l.exports = e();
    })(xa, (function() {
      var t = "week", e = "year";
      return function(n, a, s) {
        var c = a.prototype;
        c.week = function(o) {
          if (o === void 0 && (o = null), o !== null) return this.add(7 * (o - this.week()), "day");
          var i = this.$locale().yearStart || 1;
          if (this.month() === 11 && this.date() > 25) {
            var p = s(this).startOf(e).add(1, e).date(i), u = s(this).endOf(t);
            if (p.isBefore(u)) return 1;
          }
          var f = s(this).startOf(e).date(i).startOf(t).subtract(1, "millisecond"), g = this.diff(f, t, !0);
          return g < 0 ? s(this).startOf("week").week() : Math.ceil(g);
        }, c.weeks = function(o) {
          return o === void 0 && (o = null), this.week(o);
        };
      };
    }));
  })(ht)), ht.exports;
}
var Ma = Sa();
const gn = /* @__PURE__ */ We(Ma);
var gt = { exports: {} }, Da = gt.exports, en;
function Oa() {
  return en || (en = 1, (function(l, r) {
    (function(t, e) {
      l.exports = e();
    })(Da, (function() {
      return function(t, e) {
        var n = e.prototype, a = n.format;
        n.format = function(s) {
          var c = this, o = this.$locale();
          if (!this.isValid()) return a.bind(this)(s);
          var i = this.$utils(), p = (s || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, (function(u) {
            switch (u) {
              case "Q":
                return Math.ceil((c.$M + 1) / 3);
              case "Do":
                return o.ordinal(c.$D);
              case "gggg":
                return c.weekYear();
              case "GGGG":
                return c.isoWeekYear();
              case "wo":
                return o.ordinal(c.week(), "W");
              case "w":
              case "ww":
                return i.s(c.week(), u === "w" ? 1 : 2, "0");
              case "W":
              case "WW":
                return i.s(c.isoWeek(), u === "W" ? 1 : 2, "0");
              case "k":
              case "kk":
                return i.s(String(c.$H === 0 ? 24 : c.$H), u === "k" ? 1 : 2, "0");
              case "X":
                return Math.floor(c.$d.getTime() / 1e3);
              case "x":
                return c.$d.getTime();
              case "z":
                return "[" + c.offsetName() + "]";
              case "zzz":
                return "[" + c.offsetName("long") + "]";
              default:
                return u;
            }
          }));
          return a.bind(this)(p);
        };
      };
    }));
  })(gt)), gt.exports;
}
var Ra = Oa();
const Na = /* @__PURE__ */ We(Ra);
Y.extend(mn);
Y.extend(gn);
Y.extend(Na);
Y.extend(vn);
Y.extend(hn);
function Pe(l) {
  if (!l || l.length === 0) return [];
  const r = [];
  for (const n of l) {
    if (!n) continue;
    let a, s;
    if (typeof n == "string" || n instanceof Date)
      a = Y(n), s = a;
    else {
      const c = n;
      if (!c.begin && !c.end) continue;
      if (c.begin && !c.end)
        a = Y(c.begin), s = a;
      else if (!c.begin && c.end)
        a = Y(c.end), s = a;
      else {
        const o = Y(c.begin), i = Y(c.end);
        o.isBefore(i) ? (a = o, s = i) : (a = i, s = o);
      }
    }
    !a.isValid() || !s.isValid() || r.push({ start: a.startOf("day"), end: s.startOf("day") });
  }
  if (r.length === 0) return [];
  r.sort((n, a) => n.start.diff(a.start));
  const t = [];
  let e = r[0];
  for (let n = 1; n < r.length; n++) {
    const a = r[n], s = e.end.add(1, "day");
    s.isAfter(a.start) || s.isSame(a.start) ? a.end.isAfter(e.end) && (e.end = a.end) : (t.push(e), e = a);
  }
  return t.push(e), t.map((n) => n.start.isSame(n.end, "day") ? n.start.format("YYYY-MM-DD") : {
    begin: n.start.format("YYYY-MM-DD"),
    end: n.end.format("YYYY-MM-DD")
  });
}
function Je(l, r) {
  if (!r || r.length === 0) return !1;
  const t = l.format("YYYY-MM-DD");
  for (const e of r)
    if (e)
      if (typeof e == "string" || e instanceof Date) {
        if (Y(e).format("YYYY-MM-DD") === t) return !0;
      } else {
        const n = e;
        if (!n.begin && !n.end) continue;
        const a = l;
        let s = !0, c = !0;
        if (n.begin) {
          const o = Y(n.begin);
          s = a.isAfter(o, "day") || a.isSame(o, "day");
        }
        if (n.end) {
          const o = Y(n.end);
          c = a.isBefore(o, "day") || a.isSame(o, "day");
        }
        if (s && c) return !0;
      }
  return !1;
}
function Fa(l, r, t = 0) {
  let e = Y(`${l}-${String(r + 1).padStart(2, "0")}-01`);
  return t !== 0 && (e = e.add(t, "week")), {
    year: e.isoWeekYear(),
    week: e.isoWeek()
  };
}
function Ea(l, r, t) {
  if (!t || t.length === 0)
    return [
      {
        begin: l.format("YYYY-MM-DD"),
        end: r.format("YYYY-MM-DD")
      }
    ];
  const e = [];
  let n = null, a = l.clone();
  const s = r.clone();
  if (a.isAfter(s))
    return [];
  for (; a.isSameOrBefore(s, "day"); )
    Je(a, t) ? n || (n = a.clone()) : n && (e.push({
      begin: n.format("YYYY-MM-DD"),
      end: a.subtract(1, "day").format("YYYY-MM-DD")
    }), n = null), a = a.add(1, "day");
  return n && e.push({
    begin: n.format("YYYY-MM-DD"),
    end: s.format("YYYY-MM-DD")
  }), e;
}
function tn(l, r, t) {
  const e = Math.abs(r.diff(l, "day")) + 1;
  if (t.minRange !== void 0 && e < t.minRange || t.maxRange !== void 0 && e > t.maxRange) return !1;
  const [n, a] = l.isBefore(r) ? [l, r] : [r, l];
  let s = n.clone();
  for (; s.isSameOrBefore(a, "day"); ) {
    if (t.disabled && Je(s, t.disabled)) return !1;
    s = s.add(1, "day");
  }
  return !0;
}
function Va(l) {
  const {
    start: r,
    daysCount: t,
    activeMonth: e,
    selected: n,
    disabled: a,
    visible: s,
    isRange: c,
    pendingStart: o,
    pendingEnd: i,
    pendingInvalid: p
  } = l, u = [];
  let f = r.clone();
  const g = Y(), I = (v) => Je(v, a), b = (v) => !s || Je(v, s), k = (v) => !o || !i ? !1 : v.isSameOrAfter(o, "day") && v.isSameOrBefore(i, "day"), h = (v) => Je(v, n) ? !0 : c && o && !i ? v.isSame(o, "day") : !1, C = (v) => h(v) || k(v);
  for (let v = 0; v < t; v++) {
    const B = I(f), D = b(f), O = k(f), V = f.subtract(1, "day"), N = f.add(1, "day"), x = C(f), q = C(V), R = C(N);
    let W = !0;
    e !== void 0 && (e === null ? W = !1 : Array.isArray(e) ? W = e.includes(f.month()) : W = f.month() === e), u.push({
      date: f,
      dateString: f.format("YYYY-MM-DD"),
      dayOfMonth: f.date(),
      ariaLabel: f.format("dddd, MMMM D, YYYY"),
      isCurrentMonth: W,
      isToday: f.isSame(g, "day"),
      isSelected: x,
      isDisabled: B,
      isVisible: D,
      isInvalid: O && !!p,
      isSelecting: O,
      isRangeStart: x && !q && R,
      isRangeEnd: x && !R && q,
      isInRange: x && (q || R)
    }), f = f.add(1, "day");
  }
  return u;
}
function La(l, r) {
  if (!l || l.length === 0) return l;
  const t = l.findIndex((n) => {
    if (typeof n == "object" && n !== null && "begin" in n) {
      const a = n;
      return Y(a.begin).isSame(r.begin, "day") && Y(a.end).isSame(r.end, "day");
    }
    return !1;
  });
  if (t === -1) return l;
  const e = [...l];
  return e.splice(t, 1), e;
}
const Pa = ["aria-label"], Ha = ["aria-multiselectable"], Ya = ["aria-label", "aria-selected", "aria-disabled", "tabindex", "onClick", "onMouseenter", "onFocus", "onKeydown"], Wa = { class: "n-calendar-view-day-number" }, js = /* @__PURE__ */ J({
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
    viewingYear: { default: () => Y().year() },
    viewingWeek: { default: () => Y().week() },
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
  setup(l, { expose: r, emit: t }) {
    Y.extend(gn), Y.extend(mn), Y.extend(Ba), Y.extend(ka), Y.extend($a), Y.extend(vn), Y.extend(hn);
    const e = l, n = t, {
      modelValue: a,
      viewingYear: s,
      viewingWeek: c,
      firstDayOfWeek: o,
      rows: i,
      weekLabelNames: p,
      weekLabelClass: u,
      multiple: f,
      selectable: g,
      unselectable: I,
      range: b,
      numViews: k,
      maxRange: h,
      minRange: C,
      activeMonth: v,
      disabled: B,
      visible: D,
      viewClass: O,
      containerClass: V,
      weekLabelContainerClass: N,
      gridClass: x,
      gridCellClass: q,
      views: R
    } = xn(e), W = ee(null), fe = ee(null), ie = ee(Y().format("YYYY-MM-DD")), Q = /* @__PURE__ */ new Map(), pe = d(() => ce("n-calendar-container", V.value)), G = (E, Z) => {
      E ? Q.set(Z, E) : Q.delete(Z);
    }, le = async () => {
      await ge();
      const E = Q.get(ie.value);
      E && E.focus();
    };
    he(ie, le);
    const ye = (E, Z) => (Z + E) % 7, Ie = d(() => {
      if (!a.value) return [];
      const E = Array.isArray(a.value) ? a.value : [a.value];
      return Pe(E);
    }), _e = d(() => Pe(B.value)), Fe = d(() => D.value ? Pe(D.value) : null), Se = d(() => !b.value || !W.value?.begin || !fe.value ? !1 : !tn(Y(W.value.begin), fe.value, {
      minRange: C.value,
      maxRange: h.value,
      disabled: _e.value
    })), be = d(() => {
      const E = [], Z = R.value && R.value.length > 0 ? R.value.length : Math.max(1, k.value), y = (() => {
        const ne = s.value ?? Y().year(), j = c.value ?? Y().week(), oe = o.value ?? 1, Be = Y().year(ne).isoWeek(j).startOf("isoWeek");
        let De = 1 - oe;
        return De < 0 && (De += 7), Be.subtract(De, "day");
      })(), _ = Se.value;
      let $ = null, L = null;
      if (b.value && W.value?.begin && fe.value) {
        const ne = Y(W.value.begin), j = fe.value;
        $ = ne.isBefore(j) ? ne : j, L = ne.isBefore(j) ? j : ne;
      }
      for (let ne = 0; ne < Z; ne++) {
        const j = R.value?.[ne] || {}, oe = j.viewingYear ?? s.value ?? Y().year(), Be = j.viewingWeek ?? c.value ?? Y().week(), De = j.firstDayOfWeek ?? o.value ?? 1, Ft = j.rows ?? i.value ?? 6, Et = j.activeMonth !== void 0 ? j.activeMonth : v.value, Vt = j.disabled ?? B.value ?? [], At = Pe(Vt), _t = j.visible ?? D.value, Tt = _t ? Pe(_t) : null, Lt = ce("n-calendar-view", j.viewClass ?? O.value), Pt = ce(
          "n-calendar-view-week-label-container",
          j.weekLabelContainerClass ?? N.value
        ), Bt = ce("n-calendar-view-grid", j.gridClass ?? x.value), xt = ce(j.gridCellClass ?? q.value), it = j.weekLabelNames ?? p.value;
        let St;
        if (it?.length === 7) {
          const Oe = [...it];
          let Me = De - 1;
          Me < 0 && (Me += 7), St = Array.from({ length: 7 }, (Yt, Bn) => Oe[(Me + Bn) % 7]);
        } else {
          let Oe = Y().day(De);
          St = Array.from({ length: 7 }, () => {
            const Me = Oe.format("ddd");
            return Oe = Oe.add(1, "day"), Me;
          });
        }
        const Ht = j.weekLabelClass ?? u.value ?? [], _n = Array.from({ length: 7 }, (Oe, Me) => {
          const Yt = (De + Me) % 7;
          return Array.isArray(Ht) && Ht[Yt] || "";
        });
        let Mt;
        if (R.value && (j.viewingYear !== void 0 || j.viewingWeek !== void 0)) {
          const Oe = Y().year(oe).isoWeek(Be).startOf("isoWeek");
          let Me = 1 - De;
          Me < 0 && (Me += 7), Mt = Oe.subtract(Me, "day");
        } else {
          const Oe = (i.value ?? 6) * 7;
          Mt = y.add(ne * Oe, "day");
        }
        const Tn = Va({
          start: Mt,
          daysCount: Ft * 7,
          activeMonth: Et,
          selected: Ie.value,
          disabled: At,
          visible: Tt,
          isRange: b.value,
          pendingStart: $,
          pendingEnd: L,
          pendingInvalid: _,
          minRange: C.value,
          maxRange: h.value,
          hoveredDate: fe.value
        });
        E.push({
          days: Tn,
          viewClasses: Lt,
          weekLabelContainerClasses: Pt,
          gridClasses: Bt,
          extraGridCellClasses: xt,
          weekLabelNames: St,
          weekLabelClasses: _n,
          firstDayOfWeek: De,
          disabledList: At,
          visibleList: Tt
        });
      }
      return E;
    });
    he(() => be.value, le);
    function Te(E, Z) {
      const y = Z !== void 0 ? Number(Z) : s.value, { year: _, week: $ } = Fa(y, E);
      n("update:viewingYear", _), n("update:viewingWeek", $);
    }
    r({
      setMonth: Te
    });
    function ue(E) {
      fe.value = E;
    }
    function Ee(E) {
      E.isVisible && (ue(E.date), ie.value = E.dateString);
    }
    function ke() {
      W.value = null, fe.value = null;
    }
    function qe(E) {
      E.key === "Escape" && ke();
    }
    function nt(E) {
      b.value && W.value?.begin && (E.preventDefault(), ke());
    }
    function rt(E, Z) {
      if (!Z.isVisible) return;
      const y = E.key;
      if (y === "Enter" || y === " ") {
        E.preventDefault(), Ge(Z);
        return;
      }
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(y)) return;
      E.preventDefault();
      let $ = Y(Z.date).clone();
      y === "ArrowUp" ? $ = $.subtract(7, "day") : y === "ArrowDown" ? $ = $.add(7, "day") : y === "ArrowLeft" ? $ = $.subtract(1, "day") : $ = $.add(1, "day"), ie.value = $.format("YYYY-MM-DD");
      const L = be.value[0].days[0].date, ne = be.value[be.value.length - 1], j = ne.days[ne.days.length - 1].date;
      if ($.isBefore(L) || $.isSame(L) || $.isAfter(j) || $.isSame(j)) {
        let oe = Y(`${s.value}-01-01`).isoWeek(c.value);
        $.isBefore(L) ? oe = oe.subtract(1, "week") : $.isAfter(j.subtract(1, "day")) && (oe = oe.add(1, "week")), n("update:viewingYear", oe.isoWeekYear()), n("update:viewingWeek", oe.isoWeek());
      }
    }
    function Ge(E, Z) {
      if (!g.value || E.isDisabled || !E.isVisible) return;
      const y = E.dateString, _ = [...Ie.value];
      b.value ? $t(E, _, y) : at(_, y);
    }
    function $t(E, Z, y) {
      if (W.value?.begin) {
        const _ = Y(W.value.begin), $ = E.date, [L, ne] = $.isBefore(_) ? [$, _] : [_, $], j = {
          begin: L.format("YYYY-MM-DD"),
          end: ne.format("YYYY-MM-DD")
        };
        if (I.value) {
          const oe = La(Z, j);
          if (oe.length < Z.length) {
            f.value ? n("update:modelValue", Pe(oe)) : n("update:modelValue", null), ke();
            return;
          }
        }
        if (tn(L, ne, {
          minRange: C.value,
          maxRange: h.value,
          disabled: _e.value
        })) {
          const oe = Ea(L, ne, Fe.value);
          if (oe.length > 0) {
            f.value ? Z.push(...oe) : Z = oe;
            const Be = Pe(Z);
            !f.value && Be.length === 1 ? n("update:modelValue", Be[0]) : n("update:modelValue", Be);
          }
          ke();
        } else
          ke();
      } else
        W.value = { begin: y };
    }
    function at(E, Z) {
      if (f.value) {
        const y = E.findIndex((_) => Je(Y(Z), [_]));
        y > -1 ? I.value && E.splice(y, 1) : E.push(Z), n("update:modelValue", Pe(E));
      } else
        (E.length > 0 ? Y(E[0].begin || E[0]).format("YYYY-MM-DD") : null) === Z ? I.value && n("update:modelValue", null) : n("update:modelValue", Z);
    }
    return (E, Z) => (m(), M("div", {
      class: "n-calendar",
      tabindex: "-1",
      onKeydown: qe
    }, [
      U("div", {
        class: S(pe.value)
      }, [
        (m(!0), M(te, null, se(be.value, (y, _) => (m(), M("div", {
          key: _,
          class: S(y.viewClasses)
        }, [
          w(E.$slots, `calendar-header-${_}`, {
            index: _,
            startDate: y.days[0]?.date,
            endDate: y.days[y.days.length - 1]?.date
          }, () => [
            w(E.$slots, "calendar-header", {
              index: _,
              startDate: y.days[0]?.date,
              endDate: y.days[y.days.length - 1]?.date
            })
          ]),
          w(E.$slots, "week-label-container", { calendarIndex: _ }, () => [
            U("div", {
              class: S(y.weekLabelContainerClasses),
              role: "row"
            }, [
              (m(!0), M(te, null, se(y.weekLabelNames, ($, L) => (m(), M("div", {
                key: $,
                class: S(["n-calendar-view-week-label", y.weekLabelClasses[L]]),
                role: "columnheader",
                "aria-label": $
              }, [
                w(E.$slots, `week-label-${ye(L, y.firstDayOfWeek)}`, {
                  day: $,
                  index: L,
                  calendarIndex: _
                }, () => [
                  ot(re($), 1)
                ])
              ], 10, Pa))), 128))
            ], 2)
          ]),
          U("div", {
            class: S(y.gridClasses),
            role: "grid",
            "aria-multiselectable": de(f),
            onMouseleave: Z[0] || (Z[0] = ($) => ue(null))
          }, [
            (m(!0), M(te, null, se(y.days, ($) => (m(), M("div", {
              key: $.dateString,
              ref_for: !0,
              ref: (L) => G(L, $.dateString),
              class: S([
                "n-calendar-view-grid-cell",
                ...y.extraGridCellClasses,
                {
                  "n-calendar-view-grid-cell--outside": !$.isCurrentMonth,
                  "n-calendar-view-grid-cell--today": $.isToday,
                  "n-calendar-view-grid-cell--selected": $.isSelected,
                  "n-calendar-view-grid-cell--disabled": $.isDisabled,
                  "n-calendar-view-grid-cell--invalid": $.isInvalid,
                  "n-calendar-view-grid-cell--selecting": $.isSelecting,
                  "n-calendar-view-grid-cell--range-start": $.isRangeStart,
                  "n-calendar-view-grid-cell--range-end": $.isRangeEnd,
                  "n-calendar-view-grid-cell--in-range": $.isInRange,
                  "invisible pointer-events-none": !$.isVisible
                }
              ]),
              role: "gridcell",
              "aria-label": $.ariaLabel,
              "aria-selected": $.isSelected,
              "aria-disabled": $.isDisabled,
              tabindex: $.dateString === ie.value && $.isVisible ? 0 : -1,
              onClick: (L) => Ge($),
              onMouseenter: (L) => ue($.date),
              onFocus: (L) => Ee($),
              onContextmenu: nt,
              onKeydown: (L) => rt(L, $)
            }, [
              $.isVisible ? w(E.$slots, "cell", {
                key: 0,
                day: $,
                calendarIndex: _
              }, () => [
                U("span", Wa, re($.dayOfMonth), 1)
              ]) : T("", !0)
            ], 42, Ya))), 128))
          ], 42, Ha),
          w(E.$slots, "calendar-footer", {
            index: _,
            startDate: y.days[0]?.date,
            endDate: y.days[y.days.length - 1]?.date
          })
        ], 2))), 128))
      ], 2)
    ], 32));
  }
}), za = {
  key: 1,
  class: "n-card-body"
}, ja = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = l, n = d(() => !e.disabled && (e.to || e.href || !!e.onClick || !!t.onClick)), a = d(() => e.to && !e.disabled ? "RouterLink" : e.href && !e.disabled ? "a" : e.tag), s = d(() => [
      "n-card",
      e.loading ? "n-card--loading" : "",
      e.disabled ? "n-card--disabled" : "",
      n.value ? "n-card--clickable" : ""
    ]), c = d(() => {
      const u = { ...t };
      return a.value === "RouterLink" ? (u.to = e.to, u.target = e.target) : a.value === "a" && (u.href = e.href, u.target = e.target), u;
    }), o = d(() => {
      const u = r.default?.() ?? [];
      return u.length === 0 ? !1 : u.length > 0 && Gn(u[0], ["n-card-body"]) ? !0 : u.length > 1;
    });
    function i(u) {
      if (e.disabled) {
        u.preventDefault(), u.stopPropagation();
        return;
      }
      n.value && (e.onClick?.(u), t.onClick && typeof t.onClick == "function" && t.onClick !== e.onClick && t.onClick(u));
    }
    function p(u) {
      if (n.value && ["Enter", " "].includes(u.key)) {
        const f = u.target;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(f.tagName) || f.isContentEditable)
          return;
        u.preventDefault(), i(u);
      }
    }
    return (u, f) => (m(), A(P(a.value), H({
      class: s.value,
      role: n.value && a.value === "div" ? "button" : void 0,
      tabindex: n.value && a.value === "div" ? 0 : void 0,
      "aria-disabled": e.disabled ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, c.value, {
      onClick: i,
      onKeydown: p
    }), {
      default: F(() => [
        o.value ? w(u.$slots, "default", { key: 0 }) : (m(), M("div", za, [
          w(u.$slots, "default")
        ])),
        w(u.$slots, "loading", {}, () => [
          X($e, { name: "n-loading-overlay" }, {
            default: F(() => [
              e.loading ? (m(), A(tt, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: S(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : T("", !0)
            ]),
            _: 1
          })
        ])
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "aria-busy"]));
  }
}), Ks = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = ve(l, "modelValue"), n = l, a = Ae(), s = ee([]), c = ee(null), o = d(() => e.value !== void 0 && e.value !== null), i = d(() => f.value.some((v) => g(v))), p = d(() => ["n-tabs"]), u = d(() => ({
      ...t
    })), f = d(() => {
      const v = r.default?.() ?? [];
      return !v || v.length === 0 ? [] : (Array.isArray(v) ? v : [v]).map((O) => ut(O, "NTab") ? O : null).filter((O) => !!O);
    });
    function g(v) {
      return !o.value || !v.props?.name ? !1 : n.multiple && Array.isArray(e.value) ? e.value.includes(v.props?.name) : v.props?.name === e.value;
    }
    function I(v, B) {
      return !o.value || g(v) || !i.value && B === 0 ? 0 : -1;
    }
    function b(v, B) {
      return v.props?.id || `n-tab-${a}-${B}`;
    }
    function k(v, B) {
      v && (s.value[B] = v.$el || v);
    }
    function h(v) {
      if (!(!o.value || !v.props?.name))
        if (n.multiple && Array.isArray(e.value)) {
          const B = e.value.indexOf(v.props?.name);
          B >= 0 ? e.value = e.value.toSpliced(B, 1) : e.value = [...e.value, v.props?.name];
        } else
          e.value = v.props?.name ?? "";
    }
    function C(v) {
      const B = s.value.filter(
        (N) => !N.hasAttribute("disabled") && N.getAttribute("aria-disabled") !== "true"
      );
      if (B.length === 0) return;
      const D = document.activeElement, O = B.indexOf(D);
      let V = -1;
      switch (v.key) {
        case "ArrowRight":
        case "ArrowDown":
          V = (O + 1) % B.length, v.preventDefault();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          V = (O - 1 + B.length) % B.length, v.preventDefault();
          break;
        case "Home":
          V = 0, v.preventDefault();
          break;
        case "End":
          V = B.length - 1, v.preventDefault();
          break;
      }
      V !== -1 && (B[V].focus(), o.value && !n.multiple && B[V].click());
    }
    return (v, B) => (m(), A(P(n.tag), H({
      ref_key: "tabListRef",
      ref: c,
      class: p.value
    }, u.value, {
      role: o.value ? "tablist" : "group",
      onKeydown: C
    }), {
      default: F(() => [
        (m(!0), M(te, null, se(f.value, (D, O) => (m(), A(P(D), {
          key: O,
          id: b(D, O),
          ref_for: !0,
          ref: (V) => k(V, O),
          class: S([g(D) ? "n-tab--active" : ""]),
          role: o.value ? "tab" : void 0,
          "aria-selected": o.value ? g(D) ? "true" : "false" : void 0,
          tabindex: I(D, O),
          onClick: () => h(D)
        }, null, 8, ["id", "class", "role", "aria-selected", "tabindex", "onClick"]))), 128))
      ]),
      _: 1
    }, 16, ["class", "role"]));
  }
}), Ka = { key: 1 }, Us = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = l, n = d(() => ["n-tab", e.loading ? "n-tab--loading" : ""]), a = d(() => e.to ? "RouterLink" : e.href ? "a" : e.tag), s = d(() => ce(e.iconClass, e.prependIconClass)), c = d(() => {
      const i = { ...t };
      return a.value === "RouterLink" ? (i.to = e.to, i.target = e.target) : a.value === "a" && (i.href = e.href, i.target = e.target), i;
    }), o = d(() => Ce(r.default?.() ?? [], "span"));
    return (i, p) => (m(), A(P(a.value), H({
      class: n.value,
      type: e.type,
      disabled: de(t).disabled || e.loading,
      "aria-disabled": de(t).disabled || e.loading ? "true" : void 0,
      "aria-busy": e.loading ? "true" : void 0
    }, c.value), {
      default: F(() => [
        w(i.$slots, "loading", {}, () => [
          X($e, { name: "n-loading-overlay" }, {
            default: F(() => [
              e.loading ? (m(), A(tt, {
                key: 0,
                overlay: !0,
                name: e.loadingName,
                class: S(e.loadingClass),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : T("", !0)
            ]),
            _: 1
          })
        ]),
        w(i.$slots, "prepend"),
        e.prependIcon || e.icon ? (m(), A(z, {
          key: 0,
          name: e.prependIcon || e.icon,
          class: S(s.value),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : T("", !0),
        e.label ? (m(), M("span", Ka, re(e.label), 1)) : T("", !0),
        (m(!0), M(te, null, se(o.value, (u, f) => (m(), A(P(u), { key: f }))), 128)),
        e.appendIcon ? (m(), A(z, {
          key: 2,
          name: e.appendIcon,
          class: S(e.appendIconClass),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : T("", !0),
        w(i.$slots, "append")
      ]),
      _: 3
    }, 16, ["class", "type", "disabled", "aria-disabled", "aria-busy"]));
  }
});
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Ua = (l) => l != null;
function qa(l, r = {}) {
  let t;
  const { immediate: e, ...n } = r, a = Wt(!1), s = Wt(!1), c = (u) => t && t.activate(u), o = (u) => t && t.deactivate(u), i = () => {
    t && (t.pause(), s.value = !0);
  }, p = () => {
    t && (t.unpause(), s.value = !1);
  };
  return he(d(() => Hn(xe(l)).map((u) => {
    const f = xe(u);
    return typeof f == "string" ? f : Yn(f);
  }).filter(Ua)), (u) => {
    if (u.length)
      if (!t)
        t = Un(u, {
          ...n,
          onActivate() {
            a.value = !0, r.onActivate && r.onActivate();
          },
          onDeactivate() {
            a.value = !1, r.onDeactivate && r.onDeactivate();
          }
        }), e && c();
      else {
        const f = t?.active;
        t?.updateContainerElements(u), !f && e && c();
      }
  }, { flush: "post" }), Wn(() => o()), {
    hasFocus: a,
    isPaused: s,
    activate: c,
    deactivate: o,
    pause: i,
    unpause: p
  };
}
function yn(l, r, t, e, n) {
  const {
    activate: a,
    deactivate: s,
    hasFocus: c,
    pause: o,
    unpause: i
  } = qa(r, {
    immediate: !1,
    allowOutsideClick: (b) => {
      const k = b.target;
      return !!(k.closest(".n-popover") || k.closest(".n-modal-overlay") || k.closest(".n-drawer-overlay"));
    }
  }), p = ee(0), u = () => {
    p.value++, p.value === 1 && o();
  }, f = () => {
    p.value > 0 && p.value--, p.value === 0 && i();
  };
  function g(b) {
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
  return he(l, async (b) => {
    if (await ge(), !b) {
      t.value && (typeof n?.hide == "number" && await Kt(n.hide), s());
      return;
    }
    const k = g(r.value);
    e.value && k && (typeof n?.show == "number" && await Kt(n.show), t.value ? a() : k.focus());
  }), { isFocusTrapped: c, pause: u, unpause: f, focusContent: () => {
    r.value && r.value.focus();
  } };
}
const Ga = ["innerHTML"], qs = /* @__PURE__ */ J({
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
  setup(l, { expose: r }) {
    const t = ae(), e = l, n = ve(l, "modelValue"), a = Le("contentRef"), { pause: s, unpause: c } = yn(
      n,
      a,
      d(() => e.overlay),
      d(() => e.focusOnShow),
      e.overlay ? {
        show: 300,
        hide: 300
      } : void 0
    ), o = d(() => ["n-drawer-overlay"]), i = d(() => [
      "n-drawer",
      `n-drawer--direction-${e.direction}`,
      n.value ? "n-drawer--active" : void 0
    ]), p = d(() => ({ ...t }));
    Qe("keydown", (h) => {
      n.value && h.key === "Escape" && !e.persist && !e.noEscHide && (h.preventDefault(), h.stopPropagation(), k());
    });
    function u(h) {
      if (e.persist || e.noOverlayHide) return;
      const C = h.target;
      C.clientWidth < h.clientX || C.clientHeight < h.clientY || k();
    }
    function f() {
      e.persist || e.noClickOutsideHide || k();
    }
    function g() {
      e.persist || s();
    }
    function I() {
      e.persist || c();
    }
    const b = () => {
      n.value = !0;
    }, k = () => {
      n.value = !1;
    };
    return r({ show: b, hide: k }), (h, C) => (m(), M(te, null, [
      X($e, { name: "n-drawer-overlay" }, {
        default: F(() => [
          e.overlay && n.value ? (m(), M("div", {
            key: 0,
            class: S(o.value),
            "aria-hidden": "true",
            onMousedown: Re(u, ["self"])
          }, null, 34)) : T("", !0)
        ]),
        _: 1
      }),
      Ue((m(), A(P(e.tag), H({
        ref_key: "contentRef",
        ref: a,
        role: "dialog",
        "aria-modal": e.overlay ? "true" : void 0,
        class: i.value
      }, p.value, {
        onMousedown: g,
        onMouseup: I
      }), {
        default: F(() => [
          w(h.$slots, "default", {}, () => [
            e.content ? (m(), M("span", {
              key: 0,
              innerHTML: e.content
            }, null, 8, Ga)) : T("", !0)
          ])
        ]),
        _: 3
      }, 16, ["aria-modal", "class"])), [
        [de(Kn), f]
      ])
    ], 64));
  }
});
function nn(l) {
  if (!l || typeof l != "object")
    return !1;
  const r = Object.getPrototypeOf(l);
  return r === null || r === Object.prototype || Object.getPrototypeOf(r) === null ? Object.prototype.toString.call(l) === "[object Object]" : !1;
}
function Xa(l) {
  return l === "__proto__";
}
function Ze(l, r) {
  const t = Object.keys(r);
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    if (Xa(n))
      continue;
    const a = r[n], s = l[n];
    Array.isArray(a) ? Array.isArray(s) ? l[n] = Ze(s, a) : l[n] = Ze([], a) : nn(a) ? nn(s) ? l[n] = Ze(s, a) : l[n] = Ze({}, a) : (s === void 0 || a !== void 0) && (l[n] = a);
  }
  return l;
}
function Ne(l, r) {
  const t = { ...l };
  for (let e = 0; e < r.length; e++) {
    const n = r[e];
    delete t[n];
  }
  return t;
}
const Za = { class: "overflow-hidden" }, Qa = { class: "px-4 pb-2" }, Ke = /* @__PURE__ */ J({
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
  setup(l, { expose: r, emit: t }) {
    const e = et(), n = we(), a = ae(), s = l, c = ve(l, "modelValue"), o = t, i = d(() => !s.heading && (s.to || s.href || e?.vnode.props?.onClick)), p = d(() => s.to && !s.disabled ? "RouterLink" : s.href && !s.disabled ? "a" : s.tag), u = d(() => s.heading ? "presentation" : p.value === "RouterLink" || p.value === "a" ? "link" : i.value ? "button" : "listitem"), f = d(() => i.value || s.expandable ? 0 : void 0), g = d(() => [
      "n-list-item",
      i.value && !s.expandable ? "n-list-item--clickable" : "",
      s.disabled ? "n-list-item--disabled" : "",
      s.expandable ? "n-list-item--expandable" : "",
      s.heading ? "n-list-item--heading" : ""
    ]), I = d(() => {
      const N = { ...a };
      return p.value === "RouterLink" ? (N.to = s.to, N.target = s.target) : p.value === "a" && (N.href = s.href, N.target = s.target), N;
    }), b = d(() => ce(s.iconClass, s.prependIconClass)), k = d(() => {
      const N = n.default?.();
      return N && N.length > 0 ? Ce(N, "span") : s.contentField && a[s.contentField] ? Ce(a[s.contentField], "span") : [];
    }), h = d(() => {
      const N = n.content?.();
      return N && N.length > 0 ? Ce(N, "span") : [];
    }), C = (N) => N.nodes;
    function v(N) {
      if (s.disabled || s.heading) {
        N.preventDefault(), N.stopPropagation();
        return;
      }
      i.value && o("click", N);
    }
    function B(N) {
      if (i.value && ["Enter", " "].includes(N.key)) {
        const x = N.target;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(x.tagName) || x.isContentEditable)
          return;
        N.preventDefault(), v(N);
      }
    }
    function D() {
      c.value = !c.value;
    }
    return r({ expand: () => {
      c.value = !0;
    }, collapse: () => {
      c.value = !1;
    } }), (N, x) => (m(), A(P(p.value), H({
      class: g.value,
      role: u.value,
      tabindex: f.value,
      "aria-disabled": s.disabled ? "true" : void 0,
      "aria-expanded": s.expandable ? c.value : void 0
    }, I.value, {
      onClick: v,
      onKeydown: B
    }), {
      default: F(() => [
        s.expandable ? (m(), M("div", {
          key: 0,
          class: "n-list-item-header",
          onClick: Re(D, ["stop"])
        }, [
          w(N.$slots, "prepend"),
          s.prependIcon || s.icon ? (m(), A(z, {
            key: 0,
            name: s.prependIcon || s.icon,
            class: S(b.value),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : T("", !0),
          X(C, { nodes: k.value }, null, 8, ["nodes"]),
          s.appendIcon ? (m(), A(z, {
            key: 1,
            name: s.appendIcon,
            class: S(s.appendIconClass),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : T("", !0),
          w(N.$slots, "append")
        ])) : (m(), M(te, { key: 1 }, [
          w(N.$slots, "prepend"),
          s.prependIcon || s.icon ? (m(), A(z, {
            key: 0,
            name: s.prependIcon || s.icon,
            class: S(b.value),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : T("", !0),
          X(C, { nodes: k.value }, null, 8, ["nodes"]),
          s.appendIcon ? (m(), A(z, {
            key: 1,
            name: s.appendIcon,
            class: S(s.appendIconClass),
            "aria-hidden": "true"
          }, null, 8, ["name", "class"])) : T("", !0),
          w(N.$slots, "append")
        ], 64)),
        s.expandable ? (m(), M("div", {
          key: 2,
          class: S(["n-list-item-content", [c.value ? "n-list-item-content--expanded" : ""]])
        }, [
          U("div", Za, [
            U("div", Qa, [
              X(C, { nodes: h.value }, null, 8, ["nodes"])
            ])
          ])
        ], 2)) : T("", !0)
      ]),
      _: 3
    }, 16, ["class", "role", "tabindex", "aria-disabled", "aria-expanded"]));
  }
}), an = 1e3, Ja = 10, ze = ee(/* @__PURE__ */ new Map());
function bn(l) {
  const r = Symbol(`stack-id-${Ae()}`);
  he(
    () => xe(l),
    (o, i) => {
      const p = i && ze.value.get(i) || [], u = ze.value.get(o) ?? [];
      p.filter(({ stackId: f }) => f === r).forEach((f, g) => {
        u.push(f), p.splice(g, 1);
      });
    },
    { immediate: !0 }
  );
  function t() {
    return ze.value.has(xe(l)) || ze.value.set(xe(l), []), ze.value.get(xe(l));
  }
  return {
    register: (o) => {
      const i = t();
      i.find(({ itemId: p }) => p === o) || ze.value.set(xe(l), [...i, { stackId: r, itemId: o }]);
    },
    unregister: (o) => {
      ze.value.set(
        xe(l),
        t().filter(({ itemId: i }) => i === o)
      );
    },
    getZIndex: (o) => {
      const p = t().findIndex(({ itemId: u }) => u === o);
      return p === -1 ? an : an + p * Ja;
    },
    getOrderIndex: (o) => t().findIndex(({ itemId: p }) => p === o),
    isTop: (o) => {
      const i = t();
      return i[i.length - 1]?.itemId === o;
    }
  };
}
const es = ["innerHTML"], kn = /* @__PURE__ */ J({
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
  setup(l, { expose: r }) {
    const t = ae(), e = l, n = ve(l, "modelValue"), { isReady: a } = It("n-modals-container"), s = Symbol(`modal-id-${Ae()}`), { register: c, unregister: o, getZIndex: i, isTop: p } = bn("n-modal"), u = Le("contentRef"), { pause: f, unpause: g, focusContent: I } = yn(
      n,
      u,
      d(() => e.overlay),
      d(() => e.focusOnShow),
      e.overlay ? {
        show: 300,
        hide: 300
      } : void 0
    );
    Sn("n-modal-focusable", { pause: f, unpause: g, focusContent: I });
    const b = d(() => i(s)), k = d(() => ["n-modal-overlay"]), h = d(() => ({ zIndex: b.value })), C = d(() => ["n-modal", `n-modal--direction-${e.direction}`, "outline-none"]), v = d(() => ({ zIndex: b.value })), B = d(() => {
      const { tag: R, content: W, overlay: fe, noOverlayHide: ie, noEscHide: Q, direction: pe, persist: G, focusOnShow: le, role: ye, ...Ie } = e, { "aria-modal": _e, role: Fe, tabindex: Se, ...be } = t, { "aria-modal": Te, ...ue } = Ie;
      return { tabindex: Se ?? "-1", ...ue, ...be };
    });
    Qe("keydown", (R) => {
      n.value && R.key === "Escape" && !e.persist && !e.noEscHide && p(s) && (R.preventDefault(), R.stopPropagation(), q());
    }), he(
      n,
      (R) => {
        R ? c(s) : setTimeout(() => o(s), 300);
      },
      { immediate: !0 }
    ), rn(() => {
      o(s);
    });
    function D(R) {
      if (e.persist || e.noOverlayHide) return;
      const W = R.target;
      W.clientWidth < R.clientX || W.clientHeight < R.clientY || q();
    }
    function O(R) {
      if (!R || R === document.body) return !1;
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
      return !!(R.matches(W) || R.getAttribute("tabindex") && R.getAttribute("tabindex") !== "-1" || R.closest(W));
    }
    function V(R) {
      if (e.persist) return;
      const W = R.target;
      O(W) || u.value && (R.preventDefault(), u.value.focus()), f();
    }
    function N() {
      e.persist || g();
    }
    const x = () => {
      n.value = !0;
    }, q = () => {
      n.value = !1;
    };
    return r({ show: x, hide: q }), (R, W) => de(a) ? (m(), A(kt, {
      key: 0,
      to: "#n-modals-container"
    }, [
      X($e, { name: "n-modal-overlay" }, {
        default: F(() => [
          e.overlay && n.value ? (m(), M("div", {
            key: 0,
            class: S(k.value),
            style: Ct(h.value),
            "aria-hidden": "true",
            onMousedown: D
          }, null, 38)) : T("", !0)
        ]),
        _: 1
      }),
      X($e, { name: "n-modal" }, {
        default: F(() => [
          n.value ? (m(), A(P(e.tag), H({
            key: 0,
            ref_key: "contentRef",
            ref: u,
            role: e.role,
            "aria-modal": e.overlay ? "true" : void 0,
            class: C.value,
            style: v.value
          }, B.value, {
            onMousedown: V,
            onMouseup: N
          }), {
            default: F(() => [
              w(R.$slots, "default", {}, () => [
                e.content ? (m(), M("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, es)) : T("", !0)
              ])
            ]),
            _: 3
          }, 16, ["role", "aria-modal", "class", "style"])) : T("", !0)
        ]),
        _: 3
      })
    ])) : T("", !0);
  }
});
function Gs() {
  const l = et();
  if (!l)
    throw new Error("useDialog must be called within setup() or a lifecycle hook.");
  const r = l.appContext;
  async function t(c = {}) {
    const o = document.createElement("div");
    o.id = `dialog-app-${Ae()}`, document.body.appendChild(o);
    const i = c ?? {};
    i.hideOnAction ??= !0;
    const p = {
      tag: i.modalTag,
      overlay: i.overlay,
      noOverlayHide: i.noOverlayHide,
      noEscHide: i.noEscHide,
      focusOnShow: i.focusOnShow,
      role: i.role,
      class: i.class
    }, u = {
      tag: i.cardTag,
      class: i.cardClass,
      loading: i.loading,
      loadingName: i.loadingName,
      loadingClass: i.loadingClass
    }, f = /* @__PURE__ */ new Map();
    async function g() {
      const x = k.component;
      x?.exposed?.hide && x.exposed.hide();
    }
    async function I() {
      setTimeout(() => {
        He(null, o), o.remove();
      }, 300);
    }
    let b = [];
    Array.isArray(i.actions) && (b = i.actions.map((x) => {
      const q = x.onClick;
      return K(Ot, { ...x, onClick: () => {
        typeof q == "function" ? q({ hide: g, executeCallbacks: C }) : (x.label?.toLocaleLowerCase() === "ok" ? C("ok") : x.label?.toLocaleLowerCase() === "cancel" && C("cancel"), C("dismiss"), i.hideOnAction && g());
      } });
    }));
    const k = X(
      kn,
      {
        ...p,
        "onUpdate:modelValue": (x) => {
          x || (C("hide"), I());
        }
      },
      {
        default: () => K(
          ja,
          {
            ...u
          },
          {
            default: () => [
              i.title ? K("div", { class: ["n-card-header", i.cardHeaderClass] }, [
                K("h1", { class: "title-text text-xl" }, i.title),
                i.closeButton ? K(Ot, {
                  icon: "close",
                  class: "icon pilled text-xs",
                  onClick: () => g()
                }) : null
              ]) : null,
              K("div", { class: "n-card-body" }, i.content || ""),
              b.length > 0 ? K(
                "div",
                { class: ["n-card-footer justify-end gap-2", i.cardFooterClass] },
                b
              ) : null
            ].filter(Boolean)
          }
        )
      }
    );
    r && (k.appContext = r), He(k, o), await ge();
    function h(x, q) {
      const R = f.get(x) || [];
      R.push(q), f.set(x, R);
    }
    function C(x, ...q) {
      const R = f.get(x) || [];
      for (const W of R)
        W(q);
    }
    function v(x) {
      h("hide", x);
    }
    function B(x) {
      h("dismiss", x);
    }
    function D(x) {
      h("cancel", x);
    }
    function O(x) {
      h("ok", x);
    }
    function V(x) {
      h("show", x);
    }
    async function N() {
      return k.component?.exposed?.show(), await ge(), C("show"), {
        hide: g,
        onHide: v,
        onDismiss: B,
        onCancel: D,
        onOk: O
      };
    }
    return {
      show: N,
      onShow: V
    };
  }
  const e = async (c) => await (await t(c)).show();
  return {
    create: t,
    dialog: e,
    alert: async (c, o, i) => {
      const p = await e({
        title: c,
        content: o,
        actions: [
          {
            label: "OK",
            onClick: ({ hide: u }) => {
              u();
            }
          }
        ],
        cardClass: "shadowed",
        noOverlayHide: !0,
        role: "alertdialog",
        ...i || {}
      });
      return new Promise((u) => {
        p.onHide(u);
      });
    },
    confirm: async (c, o, i) => {
      const p = await e({
        ...i || {},
        title: c,
        content: o,
        actions: i?.actions ? i.actions : [
          {
            label: "Cancel",
            class: "flat",
            onClick: ({ hide: u, executeCallbacks: f }) => {
              f("cancel"), u();
            }
          },
          {
            label: "OK",
            onClick: ({ hide: u, executeCallbacks: f }) => {
              f("ok"), u();
            }
          }
        ],
        hideOnAction: !1,
        noOverlayHide: !0,
        noEscHide: !0,
        role: "alertdialog"
      });
      return new Promise((u) => {
        let f = null;
        p.onOk(() => f = "ok"), p.onCancel(() => f = "cancel"), p.onHide(() => u(f));
      });
    },
    prompt: (c, o, i = "") => new Promise(async (p) => {
      const u = window.prompt(`${c}
${o}`, i);
      p(u);
    })
  };
}
function Xs() {
  const l = et();
  if (!l)
    throw new Error("useModal must be called within setup() or a lifecycle hook.");
  const r = l.appContext;
  async function t(a) {
    const s = document.createElement("div");
    s.id = `modal-app-${Ae()}`, document.body.appendChild(s), a = a ?? {};
    const { content: c, ...o } = a, i = /* @__PURE__ */ new Map();
    async function p() {
      f.component?.exposed?.hide(), await ge(), I("hide"), u();
    }
    async function u() {
      He(null, s), s.remove();
    }
    const f = X(
      kn,
      {
        ...o
      },
      {
        default: () => typeof c == "string" ? K("span", { innerHTML: c }) : c || ""
      }
    );
    r && (f.appContext = r), He(f, s), await ge();
    function g(C, v) {
      const B = i.get(C) || [];
      B.push(v), i.set(C, B);
    }
    function I(C, ...v) {
      const B = i.get(C) || [];
      for (const D of B)
        D(v);
    }
    function b(C) {
      g("hide", C);
    }
    function k(C) {
      g("show", C);
    }
    async function h() {
      return f.component?.exposed?.show(), await ge(), I("show"), {
        hide: p,
        onHide: b
      };
    }
    return {
      show: h,
      onShow: k
    };
  }
  const e = async (a) => await (await t(a)).show();
  return {
    create: t,
    loading: async (a, s, c) => {
      const o = {
        ...c,
        class: "flex flex-col items-center gap-4 text-text-invert",
        persist: !0,
        content: [
          K("div", { class: c?.titleClass }, s),
          K(tt, { name: a, class: c?.loadingClass })
        ]
      };
      return await e(o);
    }
  };
}
function Cn(l, r, t = {}) {
  const { immediate: e = !1 } = t, n = ee(!1), a = ee(!1);
  let s = null, c = 0, o = 0;
  const i = () => {
    n.value = !1, a.value = !1, o = 0, s && (clearTimeout(s), s = null);
  }, p = () => {
    i();
    const g = de(r);
    g <= 0 || (n.value = !0, a.value = !1, o = g, c = Date.now(), s = setTimeout(() => {
      n.value = !1, l();
    }, o));
  }, u = () => {
    if (!n.value || a.value || !s) return;
    a.value = !0, clearTimeout(s), s = null;
    const g = Date.now() - c;
    o -= g;
  }, f = () => {
    !n.value || !a.value || (a.value = !1, c = Date.now(), s = setTimeout(() => {
      n.value = !1, l();
    }, o));
  };
  return Mn() && Dn(i), e && p(), {
    start: p,
    stop: i,
    pause: u,
    resume: f,
    isPending: n,
    isPaused: a
  };
}
const ts = ["innerHTML"], ns = {
  class: "n-banner-progress",
  "aria-hidden": "true"
}, wn = /* @__PURE__ */ J({
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
  setup(l, { emit: r }) {
    const t = r, e = we(), n = ae(), a = l, s = ve(l, "modelValue"), c = Cn(
      () => {
        t("timer-end");
      },
      d(() => a.duration),
      { immediate: !1 }
    ), o = () => {
      a.duration > 0 && !c.isPaused.value && (c.pause(), t("timer-pause"));
    }, i = () => {
      a.duration > 0 && c.isPaused.value && (c.resume(), t("timer-resume"));
    };
    he(
      s,
      (I) => {
        I && a.duration > 0 ? (c.start(), t("timer-begin")) : c.stop();
      },
      { immediate: !0 }
    );
    const p = d(() => ["n-banner", a.inlineActions ? "n-banner--inline" : ""]), u = d(() => ({ ...n })), f = d(() => ({
      "--n-banner-duration": `${a.duration}ms`
    })), g = d(() => Ce(e.default?.() ?? [], "div"));
    return (I, b) => s.value ? (m(), A(P(a.tag), H({
      key: 0,
      class: p.value,
      style: f.value
    }, u.value, {
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "true",
      onMouseenter: o,
      onMouseleave: i,
      onFocusin: o,
      onFocusout: i
    }), {
      default: F(() => [
        U("div", {
          class: S(["n-banner-label", a.labelClass])
        }, [
          w(I.$slots, "icon", {}, () => [
            a.icon ? (m(), A(z, {
              key: 0,
              name: a.icon,
              class: S(a.iconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : T("", !0)
          ]),
          a.label ? (m(), M("span", {
            key: 0,
            innerHTML: a.label
          }, null, 8, ts)) : T("", !0),
          (m(!0), M(te, null, se(g.value, (k, h) => (m(), A(P(k), { key: h }))), 128))
        ], 2),
        I.$slots.actions || a.actions ? (m(), M("div", {
          key: 0,
          class: S(["n-banner-actions", a.actionsClass])
        }, [
          w(I.$slots, "actions", {}, () => [
            (m(!0), M(te, null, se(a.actions, (k, h) => (m(), A(Ot, H({
              key: h,
              ref_for: !0
            }, k), null, 16))), 128))
          ])
        ], 2)) : T("", !0),
        a.showProgress && a.duration > 0 ? w(I.$slots, "progress", { key: 1 }, () => [
          U("div", ns, [
            U("div", {
              class: "n-banner-progress-bar",
              style: Ct({ animationPlayState: de(c).isPaused.value ? "paused" : "running" })
            }, null, 4)
          ])
        ]) : T("", !0)
      ]),
      _: 3
    }, 16, ["class", "style"])) : T("", !0);
  }
}), as = ["innerHTML"], ss = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', ls = /* @__PURE__ */ J({
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
  setup(l, { expose: r }) {
    const t = ae(), e = l, n = ve(l, "modelValue"), { isReady: a } = It(d(() => `n-toasts-container--position-${e.position}`)), s = Le("contentRef"), c = ee(null), o = Symbol(`toast-id-${Ae()}`), { register: i, unregister: p, getZIndex: u, getOrderIndex: f, isTop: g } = bn(
      d(() => `n-toast--position-${e.position}`)
    ), {
      start: I,
      stop: b,
      pause: k,
      resume: h
    } = Cn(
      () => ie(),
      d(() => e.duration),
      { immediate: !1 }
    ), C = d(() => u(o)), v = d(() => f(o)), B = d(() => ["n-toast-overlay", `n-toast-overlay--position-${e.position}`]), D = d(() => ({ zIndex: C.value, order: v.value })), O = d(() => ["n-toast", `n-toast--position-${e.position}`]), V = d(() => ({ zIndex: C.value, order: v.value })), N = d(() => {
      const { tag: Q, content: pe, overlay: G, noOverlayHide: le, noEscHide: ye, position: Ie, focusOnShow: _e, duration: Fe, role: Se, ...be } = e, { "aria-live": Te, "aria-atomic": ue, role: Ee, ...ke } = t, { "aria-live": qe, "aria-atomic": nt, role: rt, ...Ge } = be;
      return { ...Ge, ...ke };
    }), x = () => {
      if (!s.value) return;
      const Q = s.value.querySelector(ss);
      Q ? Q.focus() : s.value.focus();
    };
    Qe("keydown", (Q) => {
      n.value && Q.key === "Escape" && !e.noEscHide && g(o) && (Q.preventDefault(), Q.stopPropagation(), ie());
    }), he(n, async (Q) => {
      Q ? (i(o), c.value = document.activeElement, e.duration > 0 && I(), await ge(), e.focusOnShow && x()) : (b(), c.value && (c.value.focus(), c.value = null), p(o));
    }), rn(() => {
      p(o);
    });
    function q(Q) {
      if (e.noOverlayHide) return;
      const pe = Q.target;
      pe.clientWidth < Q.clientX || pe.clientHeight < Q.clientY || ie();
    }
    function R() {
      e.duration > 0 && k();
    }
    function W() {
      e.duration > 0 && h();
    }
    const fe = () => {
      n.value = !0;
    }, ie = () => {
      n.value = !1;
    };
    return r({ show: fe, hide: ie }), (Q, pe) => de(a) ? (m(), A(kt, {
      key: 0,
      to: `#n-toasts-container--position-${e.position}`
    }, [
      X($e, { name: "n-toast-overlay" }, {
        default: F(() => [
          e.overlay && n.value ? (m(), M("div", {
            key: 0,
            class: S(B.value),
            style: Ct(D.value),
            "aria-hidden": "true",
            onMousedown: q
          }, null, 38)) : T("", !0)
        ]),
        _: 1
      }),
      X($e, {
        mode: "out-in",
        name: "n-toast"
      }, {
        default: F(() => [
          n.value ? (m(), A(P(e.tag), H({
            key: 0,
            ref_key: "contentRef",
            ref: s,
            role: e.role,
            "aria-live": de(t)["aria-live"] || "polite",
            "aria-atomic": de(t)["aria-atomic"] || "true",
            class: O.value,
            style: V.value
          }, N.value, {
            onMouseenter: R,
            onMouseleave: W,
            onFocusin: R,
            onFocusout: W
          }), {
            default: F(() => [
              w(Q.$slots, "default", {}, () => [
                e.content ? (m(), M("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, as)) : T("", !0)
              ])
            ]),
            _: 3
          }, 16, ["role", "aria-live", "aria-atomic", "class", "style"])) : T("", !0)
        ]),
        _: 3
      })
    ], 8, ["to"])) : T("", !0);
  }
});
function Zs() {
  const l = et();
  if (!l)
    throw new Error("useNotify must be called within setup() or a lifecycle hook.");
  const r = l.appContext;
  async function t(o) {
    const i = document.createElement("div");
    i.id = `toast-app-${Ae()}`, document.body.appendChild(i), o = o ?? {}, o.hideOnAction ??= !0;
    const p = {
      tag: o.toastTag,
      overlay: o.overlay,
      noOverlayHide: o.noOverlayHide,
      noEscHide: o.noEscHide,
      position: o.position,
      focusOnShow: o.focusOnShow,
      duration: o.duration,
      role: o.role
    }, u = {
      tag: o.bannerTag,
      class: o.bannerClass,
      icon: o.icon,
      iconClass: o.iconClass,
      labelClass: o.labelClass,
      actionsClass: o.actionsClass,
      inlineActions: o.inlineActions,
      duration: o.duration,
      showProgress: o.showProgress,
      actions: o.actions
    }, f = /* @__PURE__ */ new Map();
    async function g() {
      C("hide"), setTimeout(() => k(), 300);
    }
    Array.isArray(u.actions) && (u.actions = u.actions.map((x) => {
      const q = x.onClick;
      return { ...x, onClick: () => {
        typeof q == "function" ? q({ hide: b, executeCallbacks: C }) : (x.label?.toLocaleLowerCase() === "ok" ? C("ok") : x.label?.toLocaleLowerCase() === "cancel" && C("cancel"), C("dismiss"), o.hideOnAction && b());
      } };
    }));
    const I = X(
      ls,
      {
        ...p,
        "onUpdate:modelValue": (x) => {
          x || g();
        }
      },
      {
        default: () => K(
          wn,
          {
            ...u,
            onTimerBegin: o.onTimerBegin,
            onTimerPause: o.onTimerPause,
            onTimerResume: o.onTimerResume
          },
          () => o.content || ""
        )
      }
    );
    r && (I.appContext = r), He(I, i), await ge();
    async function b() {
      const x = I.component;
      x?.exposed?.hide && x.exposed.hide();
    }
    async function k() {
      He(null, i), i.remove();
    }
    function h(x, q) {
      const R = f.get(x) || [];
      R.push(q), f.set(x, R);
    }
    function C(x, ...q) {
      const R = f.get(x) || [];
      for (const W of R)
        W(q);
    }
    function v(x) {
      h("hide", x);
    }
    function B(x) {
      h("dismiss", x);
    }
    function D(x) {
      h("cancel", x);
    }
    function O(x) {
      h("ok", x);
    }
    function V(x) {
      h("show", x);
    }
    async function N() {
      return I.component?.exposed?.show(), await ge(), C("show"), {
        hide: b,
        onHide: v,
        onDismiss: B,
        onCancel: D,
        onOk: O
      };
    }
    return {
      show: N,
      onShow: V
    };
  }
  const e = async (o, i) => (await t({
    hideOnAction: !0,
    content: o,
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
    success: (o, i) => e(o, { bannerClass: "success", ...i }),
    error: (o, i) => e(o, { bannerClass: "error", ...i }),
    warning: (o, i) => e(o, { bannerClass: "warning", ...i }),
    info: (o, i) => e(o, { bannerClass: "info", ...i })
  };
}
const os = ["innerHTML"], rs = {
  key: 0,
  class: "n-popover-overlay"
}, is = ["innerHTML"], us = ["innerHTML"], cs = /* @__PURE__ */ J({
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
  setup(l, { expose: r }) {
    const t = ae(), e = l, n = ve(l, "modelValue"), a = Le("contentRef"), { isReady: s } = It("n-popovers-container"), c = ee(null), o = ee(null), i = d(() => o.value || c.value), p = () => {
      e.attachParent ? o.value = wt(e.attachParent) : o.value = null;
    }, u = d(() => `${e.direction}${e.position !== "" ? `-${e.position}` : ""}`), f = d(() => ({
      ...e,
      hoverTriggerAnchor: e.triggerByHover ? e.hoverTriggerAnchor : null,
      focusTriggerAnchor: e.triggerByFocus ? e.focusTriggerAnchor : null,
      clickTriggerAnchor: e.triggerByInteraction ? e.clickTriggerAnchor : null
    })), {
      show: g,
      hide: I,
      handleContentHoverFocusIn: b,
      handleContentHoverFocusOut: k,
      compStyles: h,
      placement: C,
      parentWidth: v
    } = pn(f, {
      model: d({
        get: () => n.value,
        set: (V) => {
          n.value = V;
        }
      }),
      contentRef: a,
      attachParentEl: i,
      placement: u
    }), B = d(() => {
      const V = { ...h.value };
      return e.fit && (V.width = `${v.value}px`), V;
    }), D = d(() => ["n-popover", `n-popover--direction-${C.value}`]), O = d(() => {
      const {
        tag: V,
        content: N,
        showDelay: x,
        hideDelay: q,
        persistent: R,
        hoverTriggerAnchor: W,
        focusTriggerAnchor: fe,
        clickTriggerAnchor: ie,
        attachParent: Q,
        triggerByHover: pe,
        triggerByFocus: G,
        triggerByInteraction: le,
        direction: ye,
        position: Ie,
        margin: _e,
        offset: Fe,
        autoReposition: Se,
        stacked: be,
        overlay: Te,
        fit: ue,
        role: Ee,
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
    return on(() => {
      c.value = fn(), p();
    }), he(() => e.attachParent, p), r({ show: g, hide: I, contentRef: a }), (V, N) => e.stacked ? (m(), A($e, {
      key: 0,
      name: "n-popover"
    }, {
      default: F(() => [
        n.value ? (m(), A(P(e.tag), H({
          key: 0,
          ref_key: "contentRef",
          ref: a,
          class: D.value,
          role: e.role
        }, O.value), {
          default: F(() => [
            w(V.$slots, "default", {}, () => [
              e.content ? (m(), M("span", {
                key: 0,
                innerHTML: e.content
              }, null, 8, os)) : T("", !0)
            ])
          ]),
          _: 3
        }, 16, ["class", "role"])) : T("", !0)
      ]),
      _: 3
    })) : de(s) ? (m(), A(kt, {
      key: 1,
      to: "#n-popovers-container"
    }, [
      X($e, {
        name: e.overlay ? "n-popover-overlay" : "n-popover"
      }, {
        default: F(() => [
          n.value && e.overlay ? (m(), M("div", rs, [
            (m(), A(P(e.tag), H({
              ref_key: "contentRef",
              ref: a,
              class: D.value,
              role: e.role
            }, O.value), {
              default: F(() => [
                w(V.$slots, "default", {}, () => [
                  e.content ? (m(), M("span", {
                    key: 0,
                    innerHTML: e.content
                  }, null, 8, is)) : T("", !0)
                ])
              ]),
              _: 3
            }, 16, ["class", "role"]))
          ])) : n.value ? (m(), A(P(e.tag), H({
            key: 1,
            ref_key: "contentRef",
            ref: a,
            class: D.value,
            role: e.role
          }, O.value), {
            default: F(() => [
              w(V.$slots, "default", {}, () => [
                e.content ? (m(), M("span", {
                  key: 0,
                  innerHTML: e.content
                }, null, 8, us)) : T("", !0)
              ])
            ]),
            _: 3
          }, 16, ["class", "role"])) : T("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ])) : T("", !0);
  }
}), lt = /* @__PURE__ */ J({
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
  setup(l, { expose: r, emit: t }) {
    const e = {
      direction: "right",
      position: "start",
      stacked: !0
    }, n = we(), a = l, s = t, c = Le("popoverRef"), { transformedNodes: o } = In(n, e), i = d(() => ["n-menu"]), p = d(() => {
      const {
        items: g,
        listTag: I,
        listClass: b,
        valueField: k,
        childrenField: h,
        contentField: C,
        triggerByHover: v,
        triggerByFocus: B,
        triggerByInteraction: D,
        allowClickToHide: O,
        recursiveTriggers: V,
        ...N
      } = a;
      return {
        ...N,
        hoverTriggerAnchor: v ? a.hoverTriggerAnchor : null,
        focusTriggerAnchor: B ? a.focusTriggerAnchor : null,
        clickTriggerAnchor: D ? a.clickTriggerAnchor : null,
        attachParent: D ? a.attachParent : null,
        allowClickToHide: O
      };
    }), u = (g, I = e) => g.map((b) => {
      const {
        [a.contentField]: k,
        [a.childrenField]: h,
        onClick: C,
        ...v
      } = b, B = !!(h && h.length), D = {
        key: b.key ?? b.id ?? b[a.valueField],
        ...v,
        role: "menuitem",
        "aria-haspopup": B ? "menu" : void 0,
        onClick: (O) => {
          C && typeof C == "function" && C(O), s("select", b);
        }
      };
      if (B && !n.item) {
        const {
          hoverTriggerAnchor: O,
          focusTriggerAnchor: V,
          clickTriggerAnchor: N,
          fit: x,
          items: q,
          triggerByHover: R,
          triggerByFocus: W,
          triggerByInteraction: fe,
          allowClickToHide: ie,
          recursiveTriggers: Q,
          ...pe
        } = a, G = {
          ...pe,
          ...a.recursiveTriggers ? {
            triggerByHover: R,
            triggerByFocus: W,
            triggerByInteraction: fe,
            allowClickToHide: ie,
            recursiveTriggers: Q
          } : {}
        };
        return K(
          Ke,
          D,
          n.submenu ? K(te, null, n.submenu(b) ?? []) : {
            default: () => [
              K("span", { class: "grow" }, k),
              K(lt, {
                ...G,
                ...e,
                items: h,
                ...I,
                onSelect: (le) => s("select", le)
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
      return n.item ? K(te, null, n.item(b) ?? []) : K(Ke, D, () => n["item-content"]?.(b) ?? k);
    }), f = d(() => a.items && a.items.length ? u(a.items, e) : o.value);
    return r({ popoverRef: c }), (g, I) => (m(), A(cs, H({
      ref_key: "popoverRef",
      ref: c,
      class: i.value
    }, p.value), {
      default: F(() => [
        (m(), A(P(a.listTag), {
          class: S(["n-list", a.listClass]),
          role: "menu"
        }, {
          default: F(() => [
            (m(!0), M(te, null, se(f.value, (b, k) => (m(), A(P(b), {
              key: b.key ?? k
            }))), 128))
          ]),
          _: 1
        }, 8, ["class"]))
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), yt = {
  direction: "right",
  position: "start",
  stacked: !0
};
function st(l) {
  const { children: r } = l;
  return typeof r == "string" || typeof r == "number" ? [String(r)] : Array.isArray(r) ? r : r && typeof r == "object" && "default" in r && typeof r.default == "function" ? r.default() : [];
}
function Xe(l, r = yt) {
  return l.map((t) => {
    if (!Dt(t) || t.type === sn || t.type === ln)
      return t;
    const e = {
      ...t.props,
      ref: t.ref ?? void 0,
      key: t.key ?? void 0
    };
    if (t.type === lt || ut(t, "NMenu"))
      return K(lt, Ze(yt, { ...e, ...r }), {
        default: () => Xe(st(t), r)
      });
    if (t.type === te)
      return K(te, e, Xe(st(t), r));
    if (t.type === Ke || ut(t, "NListItem") || t.type === "li") {
      const n = st(t), a = n.findIndex(
        (p) => Dt(p) && (p.type === "ul" || ut(p, ["NMenu", "NList"]))
      ), s = a !== -1, c = s ? n.filter((p, u) => u !== a) : n, o = Xe(c, r), i = t.children && typeof t.children == "object" && !Array.isArray(t.children) ? { ...t.children } : {};
      if (s) {
        const p = n[a];
        return K(Ke, e, {
          ...i,
          default: () => [
            ...o,
            K(lt, Ze(yt, { ...p.props, ...r }), {
              default: () => Xe(st(p), r)
            }),
            K(z, { name: "chevron-right", class: "ml-8 -mr-2" })
          ]
        });
      }
      return K(Ke, e, { ...i, default: () => o });
    }
    if (t.children) {
      const n = st(t);
      if (n.length)
        return K(t.type, e, {
          default: () => Xe(n, r)
        });
    }
    return t;
  });
}
function In(l, r = yt) {
  return {
    transformedNodes: d(() => Xe(l.default?.() ?? [], r))
  };
}
const ds = /* @__PURE__ */ J({
  inheritAttrs: !1,
  __name: "NList",
  props: {
    tag: { default: "ul" },
    items: {},
    valueField: { default: "value" },
    childrenField: { default: "children" },
    contentField: { default: "content" }
  },
  setup(l) {
    const r = we(), t = ae(), e = l, { transformedNodes: n } = In(r), a = d(() => ["n-list"]), s = d(() => ({ ...t })), c = d(() => e.items ? o(e.items) : n.value);
    function o(i) {
      return i.length === 0 ? [
        r.empty ? K(te, null, r.empty({ items: i }) ?? []) : K(Ke, { key: "empty" }, () => r["empty-content"]?.() ?? "No item found.")
      ] : i.map((p) => {
        const u = p[e.contentField], f = p[e.childrenField], g = { ...p };
        delete g[e.contentField], delete g[e.childrenField];
        const I = p?.[e.valueField] || Ae(), b = f && Array.isArray(f) && f.length > 0 ? K(ds, {
          items: f,
          tag: e.tag,
          valueField: e.valueField,
          childrenField: e.childrenField,
          contentField: e.contentField,
          class: "w-full pl-4"
        }) : null;
        if (r.item)
          return K(te, { key: I }, r.item({ ...p, childrenNodes: b }) ?? []);
        const k = { key: I, ...g }, h = {
          default: () => r["item-content"]?.(p) ?? u
        };
        if (b)
          if (k.expandable)
            h.content = () => b;
          else {
            const C = h.default;
            h.default = () => [C(), b];
          }
        return K(Ke, k, h);
      });
    }
    return (i, p) => (m(), A(P(e.tag), H({ class: a.value }, s.value, { role: "list" }), {
      default: F(() => [
        (m(!0), M(te, null, se(c.value, (u, f) => (m(), A(P(u), {
          key: u?.key || f
        }))), 128))
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), fs = ["type", "aria-busy", "disabled", "readonly"], ps = {
  key: 2,
  class: "n-input-field-overlay"
}, ms = {
  key: 1,
  class: "n-input-field-message"
}, Nt = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = l, [n, a] = ve(l, "modelValue"), s = `input-id-${Ae()}`, c = d(() => typeof e.format == "function" ? e.format(n.value) : n.value), o = d(() => !!e.disabled), i = d(() => ["n-input-field", ...ce(t.class)]), p = d(() => ["n-input-field-container", ...ce(e.containerClass)]), u = d(() => [
      "n-input-field-wrapper",
      e.loading ? "n-input-field--loading" : "",
      o.value ? "n-input-field--disabled" : "",
      `n-input-field--size-${e.size}`,
      ...ce(e.wrapperClass)
    ]), f = d(() => ["n-input-field-label"]), g = d(() => ce(e.iconClass, e.prependIconClass)), I = d(() => Ne(t, ["class"])), b = d(() => Ne(t, ["class"])), k = d(() => ({
      ...e,
      modifiers: a,
      inputId: s,
      modelValue: n.value,
      formattedModelValue: c.value
    })), h = d(() => Ce(r.before?.(k.value) ?? [], "span")), C = d(() => Ce(r.after?.(k.value) ?? [], "span"));
    return (v, B) => (m(), M("div", {
      class: S(u.value)
    }, [
      (m(!0), M(te, null, se(h.value, (D, O) => (m(), A(P(D), { key: O }))), 128)),
      U("div", {
        class: S(p.value)
      }, [
        e.label || v.$slots.label ? w(v.$slots, "label", { key: 0 }, () => [
          U("label", {
            class: S(f.value),
            for: s
          }, re(e.label), 3)
        ]) : T("", !0),
        w(v.$slots, "top"),
        (m(), A(P(e.tag), H({ class: i.value }, I.value), {
          default: F(() => [
            w(v.$slots, "loading", {}, () => [
              X($e, { name: "n-loading-overlay" }, {
                default: F(() => [
                  e.loading ? (m(), A(tt, {
                    key: 0,
                    overlay: !0,
                    name: e.loadingName,
                    class: S(e.loadingClass),
                    "aria-hidden": "true"
                  }, null, 8, ["name", "class"])) : T("", !0)
                ]),
                _: 1
              })
            ]),
            w(v.$slots, "prepend"),
            e.prependIcon || e.icon ? (m(), A(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: S(g.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : T("", !0),
            w(v.$slots, "default", Ve(Ye(k.value)), () => [
              Ue(U("input", H({
                id: s,
                "onUpdate:modelValue": B[0] || (B[0] = (D) => Rt(n) ? n.value = D : null),
                type: e.type,
                "aria-busy": e.loading || void 0,
                disabled: e.disabled,
                readonly: e.readonly
              }, b.value), null, 16, fs), [
                [un, de(n)]
              ])
            ]),
            e.appendIcon ? (m(), A(z, {
              key: 1,
              name: e.appendIcon,
              class: S(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : T("", !0),
            w(v.$slots, "append"),
            v.$slots.overlay ? (m(), M("div", ps, [
              w(v.$slots, "overlay")
            ])) : T("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        w(v.$slots, "dropdown"),
        w(v.$slots, "bottom"),
        e.message || e.helperText ? (m(), M("div", ms, re(e.message || e.helperText), 1)) : T("", !0)
      ], 2),
      (m(!0), M(te, null, se(C.value, (D, O) => (m(), A(P(D), { key: O }))), 128))
    ], 2));
  }
}), vs = ["id", "name", "type", "disabled", "readonly"], Qs = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = l, n = ve(l, "modelValue"), a = ee(n.value), s = d(() => Ne(r, ["default"])), c = d(() => ["n-input-text", ...ce(t.class)]), o = d(() => {
      const { type: f, inputClass: g, modelValue: I, modelModifiers: b, debounce: k, ...h } = e;
      return { ...h, style: t.style };
    }), i = d(() => Ne(t, ["class", "style"])), p = dn((f) => {
      n.value = f;
    }, e.debounce);
    he(
      () => n.value,
      (f) => {
        f !== a.value && (a.value = f);
      }
    );
    function u() {
      e.debounce > 0 ? p(a.value) : n.value = a.value;
    }
    return (f, g) => (m(), A(Nt, H({
      modelValue: a.value,
      "onUpdate:modelValue": g[1] || (g[1] = (I) => a.value = I),
      class: c.value
    }, o.value), bt({
      default: F(({ inputId: I }) => [
        Ue(U("input", H({
          id: I,
          "onUpdate:modelValue": g[0] || (g[0] = (b) => a.value = b),
          name: e.name,
          type: e.type,
          disabled: e.disabled,
          readonly: e.readonly,
          class: ["peer", e.inputClass]
        }, i.value, { onInput: u }), null, 16, vs), [
          [un, a.value]
        ])
      ]),
      _: 2
    }, [
      se(s.value, (I, b) => ({
        name: b,
        fn: F((k) => [
          w(f.$slots, b, Ve(Ye(k)))
        ])
      }))
    ]), 1040, ["modelValue", "class"]));
  }
}), hs = ["id", "name", "multiple", "disabled"], Js = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = l, n = ve(l, "modelValue"), a = d({
      get: () => {
        if (e.multiple) {
          if (!n.value) return [];
          if (Array.isArray(n.value)) return n.value;
          try {
            const f = JSON.parse(n.value);
            return Array.isArray(f) ? f : [];
          } catch {
            return [];
          }
        }
        return n.value;
      },
      set: (f) => {
        n.value = f;
      }
    }), s = d(() => Ne(r, ["default", "append"])), c = d(() => [
      "n-input-select",
      e.showCheckmark ? "" : "n-input-select--no-checkmark",
      ...ce(t.class)
    ]), o = d(() => {
      const {
        inputClass: f,
        dropdownIcon: g,
        dropdownIconClass: I,
        formatOption: b,
        formatOptGroup: k,
        multiple: h,
        options: C,
        modelValue: v,
        modelModifiers: B,
        showCheckmark: D,
        ...O
      } = e;
      return { ...O, style: t.style };
    }), i = d(() => Ne(t, ["class", "style"])), p = (f) => f.map((g) => {
      if ("options" in g) {
        const I = g, { label: b, options: k, ...h } = I, C = k?.map((v) => {
          const { label: B, value: D, ...O } = v;
          return K(
            "option",
            {
              value: D,
              label: typeof e.formatOption == "function" ? e.formatOption(B) : B,
              ...O
            },
            B
          );
        }) ?? [];
        return K(
          "optgroup",
          {
            label: typeof e.formatOptGroup == "function" ? e.formatOptGroup(b) : b,
            ...h
          },
          C
        );
      } else {
        const I = g, { label: b, value: k, ...h } = I;
        return K(
          "option",
          {
            value: k,
            label: typeof e.formatOption == "function" ? e.formatOption(b) : b,
            ...h
          },
          b
        );
      }
    }), u = d(() => e.options && e.options.length ? p(e.options) : Ce(r.default?.() ?? [], "option"));
    return (f, g) => (m(), A(Nt, H({
      modelValue: n.value,
      "onUpdate:modelValue": g[1] || (g[1] = (I) => n.value = I),
      class: c.value
    }, o.value), bt({
      default: F(({ inputId: I }) => [
        Ue(U("select", H({
          id: I,
          "onUpdate:modelValue": g[0] || (g[0] = (b) => a.value = b),
          name: e.name,
          multiple: e.multiple,
          disabled: e.disabled,
          size: 1,
          class: ["peer", e.inputClass]
        }, i.value), [
          (m(!0), M(te, null, se(u.value, (b, k) => (m(), A(P(b), { key: k }))), 128))
        ], 16, hs), [
          [On, a.value]
        ])
      ]),
      append: F(() => [
        X(z, {
          name: e.dropdownIcon,
          class: S([e.dropdownIconClass, "n-input-select-dropdown-icon"]),
          "aria-hidden": "true"
        }, null, 8, ["name", "class"]),
        w(f.$slots, "append")
      ]),
      _: 2
    }, [
      se(s.value, (I, b) => ({
        name: b,
        fn: F((k) => [
          w(f.$slots, b, Ve(Ye(k)))
        ])
      }))
    ]), 1040, ["modelValue", "class"]));
  }
}), gs = {
  key: 0,
  class: "n-input-combo-chips-container"
}, ys = ["id", "name", "disabled", "readonly", "value", "placeholder", "aria-expanded", "onKeydown"], el = /* @__PURE__ */ J({
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
  setup(l, { emit: r }) {
    const t = l, e = r, n = we(), a = ae(), s = ve(l, "modelValue"), c = ve(l, "inputValue"), o = ve(l, "dropdown"), i = Le("inputRef"), p = Le("menuRef"), u = ee(!1), f = ee(!1), g = `menu-${Ae()}`, I = ee(/* @__PURE__ */ new Map()), b = Rn("n-modal-focusable", null);
    function k(y) {
      for (const _ of y) {
        const $ = _[t.valueField];
        $ != null && I.value.set($, _), _[t.childrenField] && Array.isArray(_[t.childrenField]) && k(_[t.childrenField]);
      }
    }
    const h = (y, _) => {
      for (const $ of y) {
        if ($[t.valueField] === _)
          return $;
        if ($[t.childrenField] && Array.isArray($[t.childrenField])) {
          const L = h($[t.childrenField], _);
          if (L) return L;
        }
      }
      return I.value.get(_) || null;
    }, C = (y) => y ? y[t.labelField] : "", v = (y) => y ? y[t.valueField] : "", B = d(() => {
      if (t.multiple)
        return Array.isArray(s.value) ? s.value.map(
          (_) => h(t.items, _) || {
            [t.valueField]: _,
            [t.labelField]: _
          }
        ) : [];
      const y = s.value;
      return h(t.items, y) || null;
    }), D = d(() => t.multiple && Array.isArray(B.value) && B.value.length > 0), O = d(() => {
      if (!t.useInput || !c.value) return t.items;
      const y = c.value.toLowerCase();
      return t.items.filter((_) => (_[t.labelField] || "").toLowerCase().includes(y));
    }), V = d(() => {
      if (O.value.length === 0) {
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
      return Se(O.value);
    }), N = d(() => typeof t.closeDropdownOnSelected == "boolean" ? t.closeDropdownOnSelected : !t.multiple), x = d(() => !(!t.clearable || !s.value || Array.isArray(s.value) && s.value.length === 0)), q = d(() => t.multiple ? !1 : B.value && !c.value && !u.value || !t.useInput), R = d(() => t.multiple && !t.useInput && D.value), W = d(
      () => Ne(n, ["default", "item", "item-content", "chip", "append", "no-option"])
    ), fe = d(() => ["n-input-combo", ...ce(a.class)]), ie = d(() => {
      const {
        inputClass: y,
        popoverClass: _,
        listClass: $,
        valueClass: L,
        dropdownIcon: ne,
        dropdownIconClass: j,
        items: oe,
        chipProps: Be,
        menuProps: De,
        clearable: Ft,
        labelField: Et,
        childrenField: Vt,
        valueField: At,
        multiple: _t,
        closeDropdownOnSelected: Tt,
        blurOnSelected: Lt,
        useInput: Pt,
        ...Bt
      } = t, xt = Object.fromEntries(Object.entries(a).filter(([it]) => !it.startsWith("on")));
      return {
        ...Ne(xt, ["class", "modelValue"]),
        ...Ne(Bt, ["modelValue", "modelModifiers"])
      };
    }), Q = d(() => Ne(a, ["class", "style", "modelValue", "placeholder"])), pe = d(() => C(B.value) ? "" : a.placeholder || ""), G = d(() => ["n-input-combo-value", ...ce(t.valueClass)]), le = d(() => f.value ? null : i.value);
    he(o, (y, _, $) => {
      y && (b?.pause(), $(() => {
        document.activeElement === document.body && b?.focusContent(), b?.unpause();
      }));
    }), he(
      () => t.items,
      (y) => {
        k(y);
      },
      { immediate: !0, deep: !0 }
    ), he(
      () => s.value,
      (y) => {
        if (!t.multiple && t.fillInput) {
          const _ = h(t.items, y);
          _ ? c.value = t.fillInput === "value" ? v(_) : C(_) : c.value = "";
        }
      },
      { immediate: !0 }
    );
    const ye = dn((y) => {
      e("filter", y);
    }, t.debounce);
    function Ie(y) {
      y.key === "ArrowDown" ? (y.preventDefault(), _e(y.target)) : y.key === "ArrowUp" ? (y.preventDefault(), Fe(y.target)) : y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), at()) : y.key === "ArrowLeft" && (y.preventDefault(), i.value?.focus());
    }
    function _e(y) {
      let _ = y.nextElementSibling;
      for (; _; ) {
        if (_.getAttribute("tabindex") === "0") {
          _.focus();
          return;
        }
        _ = _.nextElementSibling;
      }
    }
    function Fe(y) {
      let _ = y.previousElementSibling;
      for (; _; ) {
        if (_.getAttribute("tabindex") === "0") {
          _.focus();
          return;
        }
        _ = _.previousElementSibling;
      }
      i.value?.focus();
    }
    function Se(y) {
      return y.map((_) => {
        const $ = !!_.heading, L = !!_.disabled, ne = be(_), j = _[t.childrenField], oe = j && Array.isArray(j) ? Se(j) : void 0;
        return {
          ..._,
          [t.childrenField]: oe,
          class: ce(_.class, ne ? "n-list-item--active" : ""),
          tabindex: $ || L ? void 0 : "0",
          onKeydown: (Be) => {
            $ || L || Ie(Be);
          },
          onMousedown: (Be) => {
            ($ || L) && Be.preventDefault();
          }
        };
      });
    }
    function be(y) {
      const _ = y[t.valueField];
      return t.multiple && Array.isArray(s.value) ? s.value.includes(_) : s.value === _;
    }
    function Te(y) {
      const _ = s.value;
      if (t.multiple && Array.isArray(_)) {
        const $ = [..._];
        $.splice(Number(y), 1), s.value = $;
      }
    }
    function ue() {
      i.value?.focus(), o.value || (o.value = !0);
    }
    function Ee(y) {
      const _ = y.target;
      c.value = _.value, o.value || (o.value = !0), t.debounce > 0 ? ye(c.value) : e("filter", c.value);
    }
    function ke() {
      u.value = !0;
    }
    function qe() {
      u.value = !1;
    }
    function nt(y) {
      if (y.heading || y.disabled) return;
      const _ = y[t.valueField];
      if (t.multiple) {
        const $ = Array.isArray(s.value) ? [...s.value] : [], L = $.indexOf(_);
        L > -1 ? $.splice(L, 1) : $.push(_), s.value = $, c.value = "";
      } else
        s.value = _, c.value = t.fillInput === "value" ? v(y) : C(y), t.fillInput && ge(() => {
          i.value?.dispatchEvent(new Event("change", { bubbles: !0 }));
        });
      N.value && at(), t.blurOnSelected && i.value?.blur();
    }
    function rt() {
      s.value = t.multiple ? [] : void 0, c.value = "", e("clear");
    }
    function Ge() {
      if (t.multiple && c.value === "" && Array.isArray(s.value) && s.value.length > 0) {
        const y = [...s.value];
        y.pop(), s.value = y;
      }
    }
    function $t() {
      o.value && O.value.length > 0 ? nt(O.value[0]) : o.value || (o.value = !0);
    }
    async function at() {
      f.value = !0, o.value = !1, await ge(), f.value = !1;
    }
    function E(y) {
      o.value && (y.stopPropagation(), at());
    }
    function Z() {
      o.value || (o.value = !0), ge(() => {
        if (!p.value) return;
        const _ = document.getElementById(g);
        if (!_) return;
        const $ = _.querySelector('[tabindex="0"]');
        $ && $.focus();
      });
    }
    return (y, _) => (m(), A(Nt, H(ie.value, { class: fe.value }), bt({
      default: F(({ inputId: $ }) => [
        U("div", {
          class: "n-input-combo-display-container",
          onClick: ue
        }, [
          D.value ? (m(), M("div", gs, [
            (m(!0), M(te, null, se(B.value, (L, ne) => w(y.$slots, "chip", {
              key: v(L),
              item: L,
              index: ne,
              remove: () => Te(ne)
            }, () => [
              X(na, H({
                label: C(L),
                removable: ""
              }, { ref_for: !0 }, t.chipProps, {
                onRemove: (j) => Te(ne),
                onClick: _[0] || (_[0] = Re(() => {
                }, ["stop"]))
              }), null, 16, ["label", "onRemove"])
            ])), 128))
          ])) : T("", !0),
          q.value ? (m(), M("span", {
            key: 1,
            class: S(G.value)
          }, re(C(B.value)), 3)) : T("", !0),
          U("input", H({
            id: $,
            ref_key: "inputRef",
            ref: i,
            name: t.name,
            disabled: t.disabled,
            readonly: !t.useInput || t.readonly,
            type: "text",
            class: ["n-input-combo-input", t.inputClass, R.value ? "sr-only" : ""],
            value: c.value,
            autocomplete: "off",
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-haspopup": "menu",
            placeholder: pe.value,
            "aria-expanded": o.value,
            "aria-controls": g
          }, Q.value, {
            onInput: Ee,
            onFocus: ke,
            onBlur: qe,
            onKeydown: [
              je(Re(Z, ["prevent"]), ["down"]),
              je(Re($t, ["prevent"]), ["enter"]),
              je(Ge, ["backspace"]),
              je(E, ["esc"])
            ]
          }), null, 16, ys)
        ]),
        !t.disabled && !t.loading ? (m(), A(lt, H({
          key: 0,
          id: g,
          ref_key: "menuRef",
          ref: p,
          modelValue: o.value,
          "onUpdate:modelValue": _[1] || (_[1] = (L) => o.value = L),
          class: ["n-input-combo-menu", t.popoverClass],
          fit: "",
          items: V.value,
          "content-field": t.labelField,
          "children-field": t.childrenField,
          "value-field": t.valueField,
          "hover-trigger-anchor": i.value,
          "focus-trigger-anchor": le.value
        }, t.menuProps, { onSelect: nt }), bt({ _: 2 }, [
          y.$slots.item ? {
            name: "item",
            fn: F((L) => [
              w(y.$slots, "item", { item: L })
            ]),
            key: "0"
          } : void 0,
          y.$slots["item-content"] ? {
            name: "item-content",
            fn: F((L) => [
              w(y.$slots, "item-content", { item: L })
            ]),
            key: "1"
          } : void 0
        ]), 1040, ["modelValue", "class", "items", "content-field", "children-field", "value-field", "hover-trigger-anchor", "focus-trigger-anchor"])) : T("", !0)
      ]),
      append: F(() => [
        x.value ? (m(), A(z, {
          key: 0,
          name: "mdi-close",
          class: "cursor-pointer hover:text-error transition-colors",
          onClick: Re(rt, ["stop"])
        })) : T("", !0),
        X(z, {
          name: t.dropdownIcon,
          class: S([t.dropdownIconClass, o.value ? "rotate-180" : ""])
        }, null, 8, ["name", "class"]),
        w(y.$slots, "append")
      ]),
      _: 2
    }, [
      se(W.value, ($, L) => ({
        name: L,
        fn: F((ne) => [
          w(y.$slots, L, Ve(Ye(ne)))
        ])
      }))
    ]), 1040, ["class"]));
  }
}), bs = ["name", ".indeterminate"], ks = { class: "n-checkbox-display" }, Cs = {
  key: 3,
  class: "n-checkbox-overlay"
}, ws = {
  key: 1,
  class: "n-checkbox-message"
}, tl = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = l, [n, a] = ve(l, "modelValue"), s = `input-id-${Ae()}`, c = d(() => ["n-checkbox"]), o = d(() => ["n-checkbox-container"]), i = d(() => [
      "n-checkbox-wrapper",
      e.size ? `n-checkbox--${e.size}` : ""
    ]), p = d(() => ["n-checkbox-label"]), u = d(() => ce(e.iconClass, e.prependIconClass)), f = d(() => {
      const { class: h, style: C } = t;
      return { class: h, style: C };
    }), g = d(() => {
      const { class: h, style: C, ...v } = t;
      return v;
    }), I = d(() => ({
      ...e,
      modifiers: a,
      inputId: s,
      modelValue: n.value
    })), b = d(() => Ce(r.before?.(I.value) ?? [], "span")), k = d(() => Ce(r.after?.(I.value) ?? [], "span"));
    return (h, C) => (m(), M("div", {
      class: S(i.value)
    }, [
      (m(!0), M(te, null, se(b.value, (v, B) => (m(), A(P(v), { key: B }))), 128)),
      U("div", {
        class: S(o.value)
      }, [
        !e.inlineLabel && (e.label || h.$slots.label) ? w(h.$slots, "label", { key: 0 }, () => [
          U("label", {
            class: S(p.value),
            for: s
          }, re(e.label), 3)
        ]) : T("", !0),
        w(h.$slots, "top"),
        (m(), A(P(e.tag), H({ class: c.value }, f.value), {
          default: F(() => [
            w(h.$slots, "prepend"),
            e.prependIcon || e.icon ? (m(), A(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: S(u.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : T("", !0),
            Ue(U("input", H({
              id: s,
              "onUpdate:modelValue": C[0] || (C[0] = (v) => Rt(n) ? n.value = v : null),
              name: e.name,
              type: "checkbox",
              class: ["peer", e.inputClass],
              ".indeterminate": de(n) === null
            }, g.value), null, 48, bs), [
              [cn, de(n)]
            ]),
            U("div", ks, [
              e.uncheckedIcon ? (m(), A(z, {
                key: 0,
                name: e.uncheckedIcon,
                class: S(["n-checkbox-display-unchecked", e.uncheckedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : T("", !0),
              e.checkedIcon ? (m(), A(z, {
                key: 1,
                name: e.checkedIcon,
                class: S(["n-checkbox-display-checked", e.checkedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : T("", !0),
              e.indeterminateIcon ? (m(), A(z, {
                key: 2,
                name: e.indeterminateIcon,
                class: S(["n-checkbox-display-indeterminate", e.indeterminateIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])) : T("", !0)
            ]),
            w(h.$slots, "default", Ve(Ye(I.value))),
            e.inlineLabel && (e.label || h.$slots.label) ? w(h.$slots, "inlineLabel", { key: 1 }, () => [
              U("label", {
                class: S(p.value),
                for: s
              }, re(e.label), 3)
            ]) : T("", !0),
            e.appendIcon ? (m(), A(z, {
              key: 2,
              name: e.appendIcon,
              class: S(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : T("", !0),
            w(h.$slots, "append"),
            h.$slots.overlay ? (m(), M("div", Cs, [
              w(h.$slots, "overlay")
            ])) : T("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        w(h.$slots, "dropdown"),
        w(h.$slots, "bottom"),
        e.message || e.helperText ? (m(), M("div", ws, re(e.message || e.helperText), 1)) : T("", !0)
      ], 2),
      (m(!0), M(te, null, se(k.value, (v, B) => (m(), A(P(v), { key: B }))), 128))
    ], 2));
  }
}), Is = ["name", ".indeterminate"], $s = { class: "n-toggle-track" }, As = { class: "n-toggle-thumb" }, _s = {
  key: 3,
  class: "n-toggle-overlay"
}, Ts = {
  key: 1,
  class: "n-toggle-message"
}, nl = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = l, [n, a] = ve(l, "modelValue"), s = `input-id-${Ae()}`, c = d(() => ce(e.iconClass, e.prependIconClass)), o = d(() => ["n-toggle"]), i = d(() => ["n-toggle-container"]), p = d(() => [
      "n-toggle-wrapper",
      e.size ? `n-toggle--${e.size}` : ""
    ]), u = d(() => ["n-toggle-label"]), f = d(() => {
      const { class: h, style: C } = t;
      return { class: h, style: C };
    }), g = d(() => {
      const { class: h, style: C, ...v } = t;
      return v;
    }), I = d(() => ({
      ...e,
      modifiers: a,
      inputId: s,
      modelValue: n.value
    })), b = d(() => Ce(r.before?.(I.value) ?? [], "span")), k = d(() => Ce(r.after?.(I.value) ?? [], "span"));
    return (h, C) => (m(), M("div", {
      class: S(p.value)
    }, [
      (m(!0), M(te, null, se(b.value, (v, B) => (m(), A(P(v), { key: B }))), 128)),
      U("div", {
        class: S(i.value)
      }, [
        !e.inlineLabel && (e.label || h.$slots.label) ? w(h.$slots, "label", { key: 0 }, () => [
          U("label", {
            class: S(u.value),
            for: s
          }, re(e.label), 3)
        ]) : T("", !0),
        w(h.$slots, "top"),
        (m(), A(P(e.tag), H({ class: o.value }, f.value), {
          default: F(() => [
            w(h.$slots, "prepend"),
            e.prependIcon || e.icon ? (m(), A(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: S(c.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : T("", !0),
            Ue(U("input", H({
              id: s,
              "onUpdate:modelValue": C[0] || (C[0] = (v) => Rt(n) ? n.value = v : null),
              name: e.name,
              type: "checkbox",
              ".indeterminate": de(n) === null,
              class: ["peer", e.inputClass]
            }, g.value), null, 48, Is), [
              [cn, de(n)]
            ]),
            U("div", $s, [
              U("div", As, [
                X(z, {
                  name: e.uncheckedIcon,
                  class: S(["n-toggle-display-unchecked", e.uncheckedIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"]),
                X(z, {
                  name: e.checkedIcon,
                  class: S(["n-toggle-display-checked", e.checkedIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"]),
                X(z, {
                  name: e.indeterminateIcon,
                  class: S(["n-toggle-display-indeterminate", e.indeterminateIconClass]),
                  "aria-hidden": "true"
                }, null, 8, ["name", "class"])
              ])
            ]),
            w(h.$slots, "default", Ve(Ye(I.value))),
            e.inlineLabel && (e.label || h.$slots.label) ? w(h.$slots, "inlineLabel", { key: 1 }, () => [
              U("label", {
                class: S(u.value),
                for: s
              }, re(e.label), 3)
            ]) : T("", !0),
            e.appendIcon ? (m(), A(z, {
              key: 2,
              name: e.appendIcon,
              class: S(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : T("", !0),
            w(h.$slots, "append"),
            h.$slots.overlay ? (m(), M("div", _s, [
              w(h.$slots, "overlay")
            ])) : T("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        w(h.$slots, "dropdown"),
        w(h.$slots, "bottom"),
        e.message || e.helperText ? (m(), M("div", Ts, re(e.message || e.helperText), 1)) : T("", !0)
      ], 2),
      (m(!0), M(te, null, se(k.value, (v, B) => (m(), A(P(v), { key: B }))), 128))
    ], 2));
  }
}), Bs = ["value", "name"], xs = { class: "n-radio-display" }, Ss = {
  key: 3,
  class: "n-radio-overlay"
}, Ms = {
  key: 1,
  class: "n-radio-message"
}, al = /* @__PURE__ */ J({
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
  setup(l) {
    const r = we(), t = ae(), e = l, n = ve(l, "modelValue"), a = `input-id-${Ae()}`, s = d(() => ["n-radio"]), c = d(() => ["n-radio-container"]), o = d(() => [
      "n-radio-wrapper",
      e.size ? `n-radio--${e.size}` : ""
    ]), i = d(() => ["n-radio-label"]), p = d(() => ce(e.iconClass, e.prependIconClass)), u = d(() => {
      const { class: k, style: h } = t;
      return { class: k, style: h };
    }), f = d(() => {
      const { class: k, style: h, ...C } = t;
      return C;
    }), g = d(() => ({
      ...e,
      inputId: a,
      modelValue: n.value
    })), I = d(() => Ce(r.before?.(g.value) ?? [], "span")), b = d(() => Ce(r.after?.(g.value) ?? [], "span"));
    return (k, h) => (m(), M("div", {
      class: S(o.value)
    }, [
      (m(!0), M(te, null, se(I.value, (C, v) => (m(), A(P(C), { key: v }))), 128)),
      U("div", {
        class: S(c.value)
      }, [
        !e.inlineLabel && (e.label || k.$slots.label) ? w(k.$slots, "label", { key: 0 }, () => [
          U("label", {
            class: S(i.value),
            for: a
          }, re(e.label), 3)
        ]) : T("", !0),
        w(k.$slots, "top"),
        (m(), A(P(e.tag), H({ class: s.value }, u.value), {
          default: F(() => [
            w(k.$slots, "prepend"),
            e.prependIcon || e.icon ? (m(), A(z, {
              key: 0,
              name: e.prependIcon || e.icon,
              class: S(p.value),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : T("", !0),
            Ue(U("input", H({
              id: a,
              "onUpdate:modelValue": h[0] || (h[0] = (C) => n.value = C),
              value: e.value,
              name: e.name,
              type: "radio",
              class: ["peer", e.inputClass]
            }, f.value), null, 16, Bs), [
              [Nn, n.value]
            ]),
            U("div", xs, [
              X(z, {
                name: e.uncheckedIcon,
                class: S(["n-radio-display-unchecked", e.uncheckedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"]),
              X(z, {
                name: e.checkedIcon,
                class: S(["n-radio-display-checked", e.checkedIconClass]),
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])
            ]),
            w(k.$slots, "default", Ve(Ye(g.value))),
            e.inlineLabel && (e.label || k.$slots.label) ? w(k.$slots, "inlineLabel", { key: 1 }, () => [
              U("label", {
                class: S(i.value),
                for: a
              }, re(e.label), 3)
            ]) : T("", !0),
            e.appendIcon ? (m(), A(z, {
              key: 2,
              name: e.appendIcon,
              class: S(e.appendIconClass),
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])) : T("", !0),
            w(k.$slots, "append"),
            k.$slots.overlay ? (m(), M("div", Ss, [
              w(k.$slots, "overlay")
            ])) : T("", !0)
          ]),
          _: 3
        }, 16, ["class"])),
        w(k.$slots, "dropdown"),
        w(k.$slots, "bottom"),
        e.message || e.helperText ? (m(), M("div", Ms, re(e.message || e.helperText), 1)) : T("", !0)
      ], 2),
      (m(!0), M(te, null, se(b.value, (C, v) => (m(), A(P(C), { key: v }))), 128))
    ], 2));
  }
}), sl = /* @__PURE__ */ J({
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
  setup(l) {
    const r = {
      success: "mdi-check-circle",
      error: "mdi-close-circle",
      info: "mdi-information",
      warning: "mdi-alert-circle"
    }, t = ae(), e = l, n = `n-form-title-${Ae()}`, a = d(() => r[e.status] || ""), s = d(() => {
      const c = { ...t };
      return e.title && !c["aria-labelledby"] && (c["aria-labelledby"] = n), c;
    });
    return (c, o) => (m(), A(P(e.tag), H({ class: ["n-form"] }, s.value, {
      role: e.tag !== "form" ? "form" : void 0
    }), {
      default: F(() => [
        w(c.$slots, "title", {}, () => [
          e.title ? (m(), A(P(e.titleTag), {
            key: 0,
            id: n,
            class: S(["n-form-title", e.titleClass])
          }, {
            default: F(() => [
              ot(re(e.title), 1)
            ]),
            _: 1
          }, 8, ["class"])) : T("", !0)
        ]),
        w(c.$slots, "message", {}, () => [
          e.message ? (m(), A(wn, {
            key: 0,
            icon: a.value,
            class: S(e.status)
          }, {
            default: F(() => [
              ot(re(e.message), 1)
            ]),
            _: 1
          }, 8, ["icon", "class"])) : T("", !0)
        ]),
        w(c.$slots, "default")
      ]),
      _: 3
    }, 16, ["role"]));
  }
}), Ds = ["aria-label"], Os = { class: "w-full h-full bg-surface flex items-center justify-center text-error p-4" }, Rs = ["src", "srcset", "sizes", "alt", "loading"], ll = /* @__PURE__ */ J({
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
  setup(l, { emit: r }) {
    const t = l, e = r, n = Le("containerRef"), a = ee(!t.lazy), s = ee(!0), c = ee(!1);
    if (t.lazy) {
      const { stop: g } = zn(
        n,
        ([{ isIntersecting: I }]) => {
          I && (a.value = !0, g());
        },
        {
          threshold: t.threshold
        }
      );
    }
    function o(g) {
      s.value = !1, e("load", g);
    }
    function i(g) {
      s.value = !1, c.value = !0, e("error", g);
    }
    const p = d(() => {
      const g = {
        ...t.aspectRatio ? { aspectRatio: t.aspectRatio } : {},
        ...t.width ? { width: typeof t.width == "number" ? `${t.width}px` : t.width } : {},
        ...t.height ? { height: typeof t.height == "number" ? `${t.height}px` : t.height } : {}
      };
      return t.aspectRatio && !t.width && !t.height && (g.width = "100%"), g;
    }), u = d(() => [
      "n-image-img",
      `n-image-img--fit-${t.fit}`,
      t.aspectRatio || t.width && t.height ? "absolute inset-0 w-full h-full" : "block max-w-full h-auto",
      s.value || t.loading ? "opacity-0" : "opacity-100"
    ]), f = d(() => ({}));
    return (g, I) => (m(), M("div", {
      ref_key: "containerRef",
      ref: n,
      class: S([
        "n-image",
        t.containerClass,
        { "n-image--block": t.width === "100%" || t.height === "100%" }
      ]),
      style: Ct(p.value),
      role: "img",
      "aria-label": t.alt
    }, [
      X($e, { name: "n-image-fade" }, {
        default: F(() => [
          (s.value || t.loading) && !c.value ? (m(), M("div", {
            key: 0,
            class: S(["n-image-placeholder", t.placeholderClass])
          }, [
            w(g.$slots, "placeholder", {}, () => [
              X(tt, {
                overlay: "",
                name: t.loadingName,
                class: S(t.loadingClass)
              }, null, 8, ["name", "class"])
            ])
          ], 2)) : T("", !0)
        ]),
        _: 3
      }),
      c.value ? (m(), M("div", {
        key: 0,
        class: S(["n-image-error", t.errorClass])
      }, [
        w(g.$slots, "error", {}, () => [
          U("div", Os, [
            X(z, {
              name: "alert-circle",
              class: "mr-2"
            }),
            I[0] || (I[0] = U("span", { class: "text-sm" }, "Failed to load image", -1))
          ])
        ])
      ], 2)) : T("", !0),
      a.value ? (m(), M("img", H({
        key: 1,
        ref: "imageRef",
        src: t.src,
        srcset: t.srcset,
        sizes: t.sizes,
        alt: t.alt,
        class: u.value,
        style: f.value,
        loading: t.lazy ? "lazy" : void 0
      }, g.$attrs, {
        onLoad: o,
        onError: i
      }), null, 16, Rs)) : T("", !0)
    ], 14, Ds));
  }
}), ol = /* @__PURE__ */ J({
  inheritAttrs: !1,
  __name: "NHeader",
  props: {
    tag: { default: "header" }
  },
  setup(l) {
    const r = ae(), t = l, e = d(() => ["n-header"]), n = d(() => ({
      ...r
    }));
    return (a, s) => (m(), A(P(t.tag), H({ class: e.value }, n.value), {
      default: F(() => [
        w(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), rl = /* @__PURE__ */ J({
  inheritAttrs: !1,
  __name: "NFooter",
  props: {
    tag: { default: "footer" }
  },
  setup(l) {
    const r = ae(), t = l, e = d(() => ["n-footer"]), n = d(() => ({
      ...r
    }));
    return (a, s) => (m(), A(P(t.tag), H({ class: e.value }, n.value), {
      default: F(() => [
        w(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Ns = () => {
  const l = "n-tooltips-container";
  if (!document.getElementById(l)) {
    const r = document.createElement("div");
    r.id = l, document.body.appendChild(r);
  }
}, $n = (l, r) => {
  const t = r.value;
  if (!t)
    return;
  Ns();
  const n = Object.keys(r.modifiers).find((o) => ["top", "bottom", "left", "right"].includes(o)) || "bottom", s = X(ra, {
    content: t,
    direction: n,
    attachParent: l,
    hoverTriggerAnchor: l,
    focusTriggerAnchor: l
  }), c = document.createElement("div");
  document.body.appendChild(c), He(s, c), l._tooltip = {
    vnode: s,
    container: c
  };
}, An = (l) => {
  l._tooltip && (He(null, l._tooltip.container), l._tooltip.container.remove(), delete l._tooltip);
}, Fs = (l, r) => {
  if (l._tooltip && l._tooltip.vnode.component) {
    const { props: t } = l._tooltip.vnode.component;
    t.content = r.value;
    const e = Object.keys(r.modifiers);
    t.direction = e.find((n) => ["top", "bottom", "left", "right"].includes(n)) || "bottom";
  } else
    An(l), $n(l, r);
}, il = {
  mounted(l, r) {
    $n(l, r);
  },
  updated(l, r) {
    Fs(l, r);
  },
  unmounted(l) {
    An(l);
  }
};
export {
  zs as NAvatar,
  wn as NBanner,
  Ot as NButton,
  js as NCalendar,
  ja as NCard,
  tl as NCheckbox,
  na as NChip,
  qs as NDrawer,
  rl as NFooter,
  sl as NForm,
  ol as NHeader,
  z as NIcon,
  ll as NImage,
  el as NInputCombo,
  Nt as NInputField,
  Js as NInputSelect,
  Qs as NInputText,
  ds as NList,
  Ke as NListItem,
  tt as NLoading,
  lt as NMenu,
  kn as NModal,
  cs as NPopover,
  al as NRadio,
  Us as NTab,
  Ks as NTabs,
  ls as NToast,
  nl as NToggle,
  ra as NTooltip,
  bn as useComponentStack,
  Gs as useDialog,
  pn as useFloating,
  yn as useFocusable,
  In as useMenuTransform,
  Xs as useModal,
  Zs as useNotify,
  Cn as usePausableTimer,
  It as useTeleportContainer,
  il as vTooltip
};
