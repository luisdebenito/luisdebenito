"use strict";
(self.webpackChunkostoo = self.webpackChunkostoo || []).push([
  [179],
  {
    93: () => {
      function ge(n) {
        return "function" == typeof n;
      }
      function Qr(n) {
        const t = n((i) => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const Yr = Qr(
        (n) =>
          function (t) {
            n(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          }
      );
      function zi(n, e) {
        if (n) {
          const t = n.indexOf(e);
          0 <= t && n.splice(t, 1);
        }
      }
      class Ht {
        constructor(e) {
          (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let e;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const o of t) o.remove(this);
              else t.remove(this);
            const { initialTeardown: i } = this;
            if (ge(i))
              try {
                i();
              } catch (o) {
                e = o instanceof Yr ? o.errors : [o];
              }
            const { _finalizers: r } = this;
            if (r) {
              this._finalizers = null;
              for (const o of r)
                try {
                  qu(o);
                } catch (s) {
                  (e = e ?? []),
                    s instanceof Yr ? (e = [...e, ...s.errors]) : e.push(s);
                }
            }
            if (e) throw new Yr(e);
          }
        }
        add(e) {
          var t;
          if (e && e !== this)
            if (this.closed) qu(e);
            else {
              if (e instanceof Ht) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : []).push(
                e
              );
            }
        }
        _hasParent(e) {
          const { _parentage: t } = this;
          return t === e || (Array.isArray(t) && t.includes(e));
        }
        _addParent(e) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
        }
        _removeParent(e) {
          const { _parentage: t } = this;
          t === e ? (this._parentage = null) : Array.isArray(t) && zi(t, e);
        }
        remove(e) {
          const { _finalizers: t } = this;
          t && zi(t, e), e instanceof Ht && e._removeParent(this);
        }
      }
      Ht.EMPTY = (() => {
        const n = new Ht();
        return (n.closed = !0), n;
      })();
      const Wu = Ht.EMPTY;
      function Gu(n) {
        return (
          n instanceof Ht ||
          (n && "closed" in n && ge(n.remove) && ge(n.add) && ge(n.unsubscribe))
        );
      }
      function qu(n) {
        ge(n) ? n() : n.unsubscribe();
      }
      const xn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Zr = {
          setTimeout(n, e, ...t) {
            const { delegate: i } = Zr;
            return i?.setTimeout
              ? i.setTimeout(n, e, ...t)
              : setTimeout(n, e, ...t);
          },
          clearTimeout(n) {
            const { delegate: e } = Zr;
            return (e?.clearTimeout || clearTimeout)(n);
          },
          delegate: void 0,
        };
      function Ku(n) {
        Zr.setTimeout(() => {
          const { onUnhandledError: e } = xn;
          if (!e) throw n;
          e(n);
        });
      }
      function Qu() {}
      const Qv = Js("C", void 0, void 0);
      function Js(n, e, t) {
        return { kind: n, value: e, error: t };
      }
      let Nn = null;
      function Xr(n) {
        if (xn.useDeprecatedSynchronousErrorHandling) {
          const e = !Nn;
          if ((e && (Nn = { errorThrown: !1, error: null }), n(), e)) {
            const { errorThrown: t, error: i } = Nn;
            if (((Nn = null), t)) throw i;
          }
        } else n();
      }
      class ea extends Ht {
        constructor(e) {
          super(),
            (this.isStopped = !1),
            e
              ? ((this.destination = e), Gu(e) && e.add(this))
              : (this.destination = n_);
        }
        static create(e, t, i) {
          return new Wi(e, t, i);
        }
        next(e) {
          this.isStopped
            ? na(
                (function Zv(n) {
                  return Js("N", n, void 0);
                })(e),
                this
              )
            : this._next(e);
        }
        error(e) {
          this.isStopped
            ? na(
                (function Yv(n) {
                  return Js("E", void 0, n);
                })(e),
                this
              )
            : ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped
            ? na(Qv, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          try {
            this.destination.error(e);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Jv = Function.prototype.bind;
      function ta(n, e) {
        return Jv.call(n, e);
      }
      class e_ {
        constructor(e) {
          this.partialObserver = e;
        }
        next(e) {
          const { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(e);
            } catch (i) {
              Jr(i);
            }
        }
        error(e) {
          const { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(e);
            } catch (i) {
              Jr(i);
            }
          else Jr(e);
        }
        complete() {
          const { partialObserver: e } = this;
          if (e.complete)
            try {
              e.complete();
            } catch (t) {
              Jr(t);
            }
        }
      }
      class Wi extends ea {
        constructor(e, t, i) {
          let r;
          if ((super(), ge(e) || !e))
            r = {
              next: e ?? void 0,
              error: t ?? void 0,
              complete: i ?? void 0,
            };
          else {
            let o;
            this && xn.useDeprecatedNextContext
              ? ((o = Object.create(e)),
                (o.unsubscribe = () => this.unsubscribe()),
                (r = {
                  next: e.next && ta(e.next, o),
                  error: e.error && ta(e.error, o),
                  complete: e.complete && ta(e.complete, o),
                }))
              : (r = e);
          }
          this.destination = new e_(r);
        }
      }
      function Jr(n) {
        xn.useDeprecatedSynchronousErrorHandling
          ? (function Xv(n) {
              xn.useDeprecatedSynchronousErrorHandling &&
                Nn &&
                ((Nn.errorThrown = !0), (Nn.error = n));
            })(n)
          : Ku(n);
      }
      function na(n, e) {
        const { onStoppedNotification: t } = xn;
        t && Zr.setTimeout(() => t(n, e));
      }
      const n_ = {
          closed: !0,
          next: Qu,
          error: function t_(n) {
            throw n;
          },
          complete: Qu,
        },
        ia =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Yu(n) {
        return n;
      }
      let Ge = (() => {
        class n {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const i = new n();
            return (i.source = this), (i.operator = t), i;
          }
          subscribe(t, i, r) {
            const o = (function r_(n) {
              return (
                (n && n instanceof ea) ||
                ((function i_(n) {
                  return n && ge(n.next) && ge(n.error) && ge(n.complete);
                })(n) &&
                  Gu(n))
              );
            })(t)
              ? t
              : new Wi(t, i, r);
            return (
              Xr(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (i) {
              t.error(i);
            }
          }
          forEach(t, i) {
            return new (i = Xu(i))((r, o) => {
              const s = new Wi({
                next: (a) => {
                  try {
                    t(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: r,
              });
              this.subscribe(s);
            });
          }
          _subscribe(t) {
            var i;
            return null === (i = this.source) || void 0 === i
              ? void 0
              : i.subscribe(t);
          }
          [ia]() {
            return this;
          }
          pipe(...t) {
            return (function Zu(n) {
              return 0 === n.length
                ? Yu
                : 1 === n.length
                ? n[0]
                : function (t) {
                    return n.reduce((i, r) => r(i), t);
                  };
            })(t)(this);
          }
          toPromise(t) {
            return new (t = Xu(t))((i, r) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => r(s),
                () => i(o)
              );
            });
          }
        }
        return (n.create = (e) => new n(e)), n;
      })();
      function Xu(n) {
        var e;
        return null !== (e = n ?? xn.Promise) && void 0 !== e ? e : Promise;
      }
      const o_ = Qr(
        (n) =>
          function () {
            n(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let eo = (() => {
        class n extends Ge {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const i = new Ju(this, this);
            return (i.operator = t), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new o_();
          }
          next(t) {
            Xr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const i of this.currentObservers) i.next(t);
              }
            });
          }
          error(t) {
            Xr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(t);
              }
            });
          }
          complete() {
            Xr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            );
          }
          _innerSubscribe(t) {
            const { hasError: i, isStopped: r, observers: o } = this;
            return i || r
              ? Wu
              : ((this.currentObservers = null),
                o.push(t),
                new Ht(() => {
                  (this.currentObservers = null), zi(o, t);
                }));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: i, thrownError: r, isStopped: o } = this;
            i ? t.error(r) : o && t.complete();
          }
          asObservable() {
            const t = new Ge();
            return (t.source = this), t;
          }
        }
        return (n.create = (e, t) => new Ju(e, t)), n;
      })();
      class Ju extends eo {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          var t, i;
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === i ||
            i.call(t, e);
        }
        error(e) {
          var t, i;
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === i ||
            i.call(t, e);
        }
        complete() {
          var e, t;
          null ===
            (t =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.complete) ||
            void 0 === t ||
            t.call(e);
        }
        _subscribe(e) {
          var t, i;
          return null !==
            (i =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(e)) && void 0 !== i
            ? i
            : Wu;
        }
      }
      function Gi(n) {
        return (e) => {
          if (
            (function s_(n) {
              return ge(n?.lift);
            })(e)
          )
            return e.lift(function (t) {
              try {
                return n(t, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function to(n, e, t, i, r) {
        return new a_(n, e, t, i, r);
      }
      class a_ extends ea {
        constructor(e, t, i, r, o, s) {
          super(e),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (a) {
                  try {
                    t(a);
                  } catch (l) {
                    e.error(l);
                  }
                }
              : super._next),
            (this._error = r
              ? function (a) {
                  try {
                    r(a);
                  } catch (l) {
                    e.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i();
                  } catch (a) {
                    e.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var e;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this;
            super.unsubscribe(),
              !t &&
                (null === (e = this.onFinalize) ||
                  void 0 === e ||
                  e.call(this));
          }
        }
      }
      function gn(n) {
        return this instanceof gn ? ((this.v = n), this) : new gn(n);
      }
      function nd(n, e, t) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          i = t.apply(n, e || []),
          o = [];
        return (
          (r = {}),
          s("next"),
          s("throw"),
          s("return"),
          (r[Symbol.asyncIterator] = function () {
            return this;
          }),
          r
        );
        function s(f) {
          i[f] &&
            (r[f] = function (p) {
              return new Promise(function (h, g) {
                o.push([f, p, h, g]) > 1 || a(f, p);
              });
            });
        }
        function a(f, p) {
          try {
            !(function l(f) {
              f.value instanceof gn
                ? Promise.resolve(f.value.v).then(c, u)
                : d(o[0][2], f);
            })(i[f](p));
          } catch (h) {
            d(o[0][3], h);
          }
        }
        function c(f) {
          a("next", f);
        }
        function u(f) {
          a("throw", f);
        }
        function d(f, p) {
          f(p), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function id(n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          e = n[Symbol.asyncIterator];
        return e
          ? e.call(n)
          : ((n = (function aa(n) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                t = e && n[e],
                i = 0;
              if (t) return t.call(n);
              if (n && "number" == typeof n.length)
                return {
                  next: function () {
                    return (
                      n && i >= n.length && (n = void 0),
                      { value: n && n[i++], done: !n }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(n)),
            (t = {}),
            i("next"),
            i("throw"),
            i("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function i(o) {
          t[o] =
            n[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function r(o, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    o({ value: c, done: a });
                  }, s);
                })(a, l, (s = n[o](s)).done, s.value);
              });
            };
        }
      }
      const rd = (n) =>
        n && "number" == typeof n.length && "function" != typeof n;
      function od(n) {
        return ge(n?.then);
      }
      function sd(n) {
        return ge(n[ia]);
      }
      function ad(n) {
        return Symbol.asyncIterator && ge(n?.[Symbol.asyncIterator]);
      }
      function ld(n) {
        return new TypeError(
          `You provided ${
            null !== n && "object" == typeof n ? "an invalid object" : `'${n}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const cd = (function T_() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function ud(n) {
        return ge(n?.[cd]);
      }
      function dd(n) {
        return nd(this, arguments, function* () {
          const t = n.getReader();
          try {
            for (;;) {
              const { value: i, done: r } = yield gn(t.read());
              if (r) return yield gn(void 0);
              yield yield gn(i);
            }
          } finally {
            t.releaseLock();
          }
        });
      }
      function fd(n) {
        return ge(n?.getReader);
      }
      function On(n) {
        if (n instanceof Ge) return n;
        if (null != n) {
          if (sd(n))
            return (function M_(n) {
              return new Ge((e) => {
                const t = n[ia]();
                if (ge(t.subscribe)) return t.subscribe(e);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(n);
          if (rd(n))
            return (function A_(n) {
              return new Ge((e) => {
                for (let t = 0; t < n.length && !e.closed; t++) e.next(n[t]);
                e.complete();
              });
            })(n);
          if (od(n))
            return (function P_(n) {
              return new Ge((e) => {
                n.then(
                  (t) => {
                    e.closed || (e.next(t), e.complete());
                  },
                  (t) => e.error(t)
                ).then(null, Ku);
              });
            })(n);
          if (ad(n)) return pd(n);
          if (ud(n))
            return (function x_(n) {
              return new Ge((e) => {
                for (const t of n) if ((e.next(t), e.closed)) return;
                e.complete();
              });
            })(n);
          if (fd(n))
            return (function N_(n) {
              return pd(dd(n));
            })(n);
        }
        throw ld(n);
      }
      function pd(n) {
        return new Ge((e) => {
          (function O_(n, e) {
            var t, i, r, o;
            return (function ed(n, e, t, i) {
              return new (t || (t = Promise))(function (o, s) {
                function a(u) {
                  try {
                    c(i.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  try {
                    c(i.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  u.done
                    ? o(u.value)
                    : (function r(o) {
                        return o instanceof t
                          ? o
                          : new t(function (s) {
                              s(o);
                            });
                      })(u.value).then(a, l);
                }
                c((i = i.apply(n, e || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = id(n); !(i = yield t.next()).done; )
                  if ((e.next(i.value), e.closed)) return;
              } catch (s) {
                r = { error: s };
              } finally {
                try {
                  i && !i.done && (o = t.return) && (yield o.call(t));
                } finally {
                  if (r) throw r.error;
                }
              }
              e.complete();
            });
          })(n, e).catch((t) => e.error(t));
        });
      }
      function mn(n, e, t, i = 0, r = !1) {
        const o = e.schedule(function () {
          t(), r ? n.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((n.add(o), !r)) return o;
      }
      function hd(n, e, t = 1 / 0) {
        return ge(e)
          ? hd(
              (i, r) =>
                (function l_(n, e) {
                  return Gi((t, i) => {
                    let r = 0;
                    t.subscribe(
                      to(i, (o) => {
                        i.next(n.call(e, o, r++));
                      })
                    );
                  });
                })((o, s) => e(i, o, r, s))(On(n(i, r))),
              t
            )
          : ("number" == typeof e && (t = e),
            Gi((i, r) =>
              (function F_(n, e, t, i, r, o, s, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !c && e.complete();
                  },
                  p = (g) => (c < i ? h(g) : l.push(g)),
                  h = (g) => {
                    o && e.next(g), c++;
                    let m = !1;
                    On(t(g, u++)).subscribe(
                      to(
                        e,
                        (v) => {
                          r?.(v), o ? p(v) : e.next(v);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (c--; l.length && c < i; ) {
                                const v = l.shift();
                                s ? mn(e, s, () => h(v)) : h(v);
                              }
                              f();
                            } catch (v) {
                              e.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  n.subscribe(
                    to(e, p, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(i, r, n, t)
            ));
      }
      const gd = new Ge((n) => n.complete());
      function la(n) {
        return n[n.length - 1];
      }
      function md(n, e = 0) {
        return Gi((t, i) => {
          t.subscribe(
            to(
              i,
              (r) => mn(i, n, () => i.next(r), e),
              () => mn(i, n, () => i.complete(), e),
              (r) => mn(i, n, () => i.error(r), e)
            )
          );
        });
      }
      function yd(n, e = 0) {
        return Gi((t, i) => {
          i.add(n.schedule(() => t.subscribe(i), e));
        });
      }
      function vd(n, e) {
        if (!n) throw new Error("Iterable cannot be null");
        return new Ge((t) => {
          mn(t, e, () => {
            const i = n[Symbol.asyncIterator]();
            mn(
              t,
              e,
              () => {
                i.next().then((r) => {
                  r.done ? t.complete() : t.next(r.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function q_(...n) {
        const e = (function V_(n) {
            return (function k_(n) {
              return n && ge(n.schedule);
            })(la(n))
              ? n.pop()
              : void 0;
          })(n),
          t = (function B_(n, e) {
            return "number" == typeof la(n) ? n.pop() : e;
          })(n, 1 / 0),
          i = n;
        return i.length
          ? 1 === i.length
            ? On(i[0])
            : (function L_(n = 1 / 0) {
                return hd(Yu, n);
              })(t)(
                (function G_(n, e) {
                  return e
                    ? (function W_(n, e) {
                        if (null != n) {
                          if (sd(n))
                            return (function H_(n, e) {
                              return On(n).pipe(yd(e), md(e));
                            })(n, e);
                          if (rd(n))
                            return (function $_(n, e) {
                              return new Ge((t) => {
                                let i = 0;
                                return e.schedule(function () {
                                  i === n.length
                                    ? t.complete()
                                    : (t.next(n[i++]),
                                      t.closed || this.schedule());
                                });
                              });
                            })(n, e);
                          if (od(n))
                            return (function j_(n, e) {
                              return On(n).pipe(yd(e), md(e));
                            })(n, e);
                          if (ad(n)) return vd(n, e);
                          if (ud(n))
                            return (function U_(n, e) {
                              return new Ge((t) => {
                                let i;
                                return (
                                  mn(t, e, () => {
                                    (i = n[cd]()),
                                      mn(
                                        t,
                                        e,
                                        () => {
                                          let r, o;
                                          try {
                                            ({ value: r, done: o } = i.next());
                                          } catch (s) {
                                            return void t.error(s);
                                          }
                                          o ? t.complete() : t.next(r);
                                        },
                                        0,
                                        !0
                                      );
                                  }),
                                  () => ge(i?.return) && i.return()
                                );
                              });
                            })(n, e);
                          if (fd(n))
                            return (function z_(n, e) {
                              return vd(dd(n), e);
                            })(n, e);
                        }
                        throw ld(n);
                      })(n, e)
                    : On(n);
                })(i, e)
              )
          : gd;
      }
      function ca(n, e, ...t) {
        if (!0 === e) return void n();
        if (!1 === e) return;
        const i = new Wi({
          next: () => {
            i.unsubscribe(), n();
          },
        });
        return e(...t).subscribe(i);
      }
      function ie(n) {
        for (let e in n) if (n[e] === ie) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function re(n) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) return "[" + n.map(re).join(", ") + "]";
        if (null == n) return "" + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const e = n.toString();
        if (null == e) return "" + e;
        const t = e.indexOf("\n");
        return -1 === t ? e : e.substring(0, t);
      }
      function da(n, e) {
        return null == n || "" === n
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? n
          : n + " " + e;
      }
      const Q_ = ie({ __forward_ref__: ie });
      function no(n) {
        return (
          (n.__forward_ref__ = no),
          (n.toString = function () {
            return re(this());
          }),
          n
        );
      }
      function F(n) {
        return (function fa(n) {
          return (
            "function" == typeof n &&
            n.hasOwnProperty(Q_) &&
            n.__forward_ref__ === no
          );
        })(n)
          ? n()
          : n;
      }
      class C extends Error {
        constructor(e, t) {
          super(
            (function io(n, e) {
              return `NG0${Math.abs(n)}${e ? ": " + e.trim() : ""}`;
            })(e, t)
          ),
            (this.code = e);
        }
      }
      function V(n) {
        return "string" == typeof n ? n : null == n ? "" : String(n);
      }
      function ro(n, e) {
        throw new C(-201, !1);
      }
      function Je(n, e) {
        null == n &&
          (function J(n, e, t, i) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == i ? "" : ` [Expected=> ${t} ${i} ${e} <=Actual]`)
            );
          })(e, n, null, "!=");
      }
      function te(n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0,
        };
      }
      function qe(n) {
        return { providers: n.providers || [], imports: n.imports || [] };
      }
      function oo(n) {
        return _d(n, so) || _d(n, Ed);
      }
      function _d(n, e) {
        return n.hasOwnProperty(e) ? n[e] : null;
      }
      function Dd(n) {
        return n && (n.hasOwnProperty(pa) || n.hasOwnProperty(iD))
          ? n[pa]
          : null;
      }
      const so = ie({ ɵprov: ie }),
        pa = ie({ ɵinj: ie }),
        Ed = ie({ ngInjectableDef: ie }),
        iD = ie({ ngInjectorDef: ie });
      var L = (() => (
        ((L = L || {})[(L.Default = 0)] = "Default"),
        (L[(L.Host = 1)] = "Host"),
        (L[(L.Self = 2)] = "Self"),
        (L[(L.SkipSelf = 4)] = "SkipSelf"),
        (L[(L.Optional = 8)] = "Optional"),
        L
      ))();
      let ha;
      function gt(n) {
        const e = ha;
        return (ha = n), e;
      }
      function wd(n, e, t) {
        const i = oo(n);
        return i && "root" == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : t & L.Optional
          ? null
          : void 0 !== e
          ? e
          : void ro(re(n));
      }
      function yn(n) {
        return { toString: n }.toString();
      }
      var It = (() => (
          ((It = It || {})[(It.OnPush = 0)] = "OnPush"),
          (It[(It.Default = 1)] = "Default"),
          It
        ))(),
        St = (() => {
          return (
            ((n = St || (St = {}))[(n.Emulated = 0)] = "Emulated"),
            (n[(n.None = 2)] = "None"),
            (n[(n.ShadowDom = 3)] = "ShadowDom"),
            St
          );
          var n;
        })();
      const oe = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Xn = {},
        X = [],
        ao = ie({ ɵcmp: ie }),
        ga = ie({ ɵdir: ie }),
        ma = ie({ ɵpipe: ie }),
        bd = ie({ ɵmod: ie }),
        Zt = ie({ ɵfac: ie }),
        qi = ie({ __NG_ELEMENT_ID__: ie });
      let oD = 0;
      function et(n) {
        return yn(() => {
          const t = !0 === n.standalone,
            i = {},
            r = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: i,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === It.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: t,
              dependencies: (t && n.dependencies) || null,
              getStandaloneInjector: null,
              selectors: n.selectors || X,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || St.Emulated,
              id: "c" + oD++,
              styles: n.styles || X,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null,
            },
            o = n.dependencies,
            s = n.features;
          return (
            (r.inputs = Sd(n.inputs, i)),
            (r.outputs = Sd(n.outputs)),
            s && s.forEach((a) => a(r)),
            (r.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Cd).filter(Id)
              : null),
            (r.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(He).filter(Id)
              : null),
            r
          );
        });
      }
      function Cd(n) {
        return ne(n) || Be(n);
      }
      function Id(n) {
        return null !== n;
      }
      function tt(n) {
        return yn(() => ({
          type: n.type,
          bootstrap: n.bootstrap || X,
          declarations: n.declarations || X,
          imports: n.imports || X,
          exports: n.exports || X,
          transitiveCompileScopes: null,
          schemas: n.schemas || null,
          id: n.id || null,
        }));
      }
      function Sd(n, e) {
        if (null == n) return Xn;
        const t = {};
        for (const i in n)
          if (n.hasOwnProperty(i)) {
            let r = n[i],
              o = r;
            Array.isArray(r) && ((o = r[1]), (r = r[0])),
              (t[r] = i),
              e && (e[r] = o);
          }
        return t;
      }
      const Ve = et;
      function ne(n) {
        return n[ao] || null;
      }
      function Be(n) {
        return n[ga] || null;
      }
      function He(n) {
        return n[ma] || null;
      }
      const $ = 11;
      function Qe(n) {
        return Array.isArray(n) && "object" == typeof n[1];
      }
      function Mt(n) {
        return Array.isArray(n) && !0 === n[1];
      }
      function _a(n) {
        return 0 != (8 & n.flags);
      }
      function fo(n) {
        return 2 == (2 & n.flags);
      }
      function po(n) {
        return 1 == (1 & n.flags);
      }
      function At(n) {
        return null !== n.template;
      }
      function dD(n) {
        return 0 != (256 & n[2]);
      }
      function Vn(n, e) {
        return n.hasOwnProperty(Zt) ? n[Zt] : null;
      }
      class hD {
        constructor(e, t, i) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ji() {
        return Ad;
      }
      function Ad(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = mD), gD;
      }
      function gD() {
        const n = xd(this),
          e = n?.current;
        if (e) {
          const t = n.previous;
          if (t === Xn) n.previous = e;
          else for (let i in e) t[i] = e[i];
          (n.current = null), this.ngOnChanges(e);
        }
      }
      function mD(n, e, t, i) {
        const r =
            xd(n) ||
            (function yD(n, e) {
              return (n[Pd] = e);
            })(n, { previous: Xn, current: null }),
          o = r.current || (r.current = {}),
          s = r.previous,
          a = this.declaredInputs[t],
          l = s[a];
        (o[a] = new hD(l && l.currentValue, e, s === Xn)), (n[i] = e);
      }
      Ji.ngInherit = !0;
      const Pd = "__ngSimpleChanges__";
      function xd(n) {
        return n[Pd] || null;
      }
      function De(n) {
        for (; Array.isArray(n); ) n = n[0];
        return n;
      }
      function ho(n, e) {
        return De(e[n]);
      }
      function rt(n, e) {
        return De(e[n.index]);
      }
      function Ca(n, e) {
        return n.data[e];
      }
      function ot(n, e) {
        const t = e[n];
        return Qe(t) ? t : t[0];
      }
      function go(n) {
        return 64 == (64 & n[2]);
      }
      function vn(n, e) {
        return null == e ? null : n[e];
      }
      function Nd(n) {
        n[18] = 0;
      }
      function Ia(n, e) {
        n[5] += e;
        let t = n,
          i = n[3];
        for (
          ;
          null !== i && ((1 === e && 1 === t[5]) || (-1 === e && 0 === t[5]));

        )
          (i[5] += e), (t = i), (i = i[3]);
      }
      const R = { lFrame: $d(null), bindingsEnabled: !0 };
      function Fd() {
        return R.bindingsEnabled;
      }
      function _() {
        return R.lFrame.lView;
      }
      function Q() {
        return R.lFrame.tView;
      }
      function ii(n) {
        return (R.lFrame.contextLView = n), n[8];
      }
      function ri(n) {
        return (R.lFrame.contextLView = null), n;
      }
      function Ie() {
        let n = Ld();
        for (; null !== n && 64 === n.type; ) n = n.parent;
        return n;
      }
      function Ld() {
        return R.lFrame.currentTNode;
      }
      function jt(n, e) {
        const t = R.lFrame;
        (t.currentTNode = n), (t.isParent = e);
      }
      function Sa() {
        return R.lFrame.isParent;
      }
      function Ta() {
        R.lFrame.isParent = !1;
      }
      function je() {
        const n = R.lFrame;
        let e = n.bindingRootIndex;
        return (
          -1 === e && (e = n.bindingRootIndex = n.tView.bindingStartIndex), e
        );
      }
      function oi() {
        return R.lFrame.bindingIndex++;
      }
      function ND(n, e) {
        const t = R.lFrame;
        (t.bindingIndex = t.bindingRootIndex = n), Ma(e);
      }
      function Ma(n) {
        R.lFrame.currentDirectiveIndex = n;
      }
      function Bd() {
        return R.lFrame.currentQueryIndex;
      }
      function Pa(n) {
        R.lFrame.currentQueryIndex = n;
      }
      function FD(n) {
        const e = n[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? n[6] : null;
      }
      function Hd(n, e, t) {
        if (t & L.SkipSelf) {
          let r = e,
            o = n;
          for (
            ;
            !((r = r.parent),
            null !== r ||
              t & L.Host ||
              ((r = FD(o)), null === r || ((o = o[15]), 10 & r.type)));

          );
          if (null === r) return !1;
          (e = r), (n = o);
        }
        const i = (R.lFrame = jd());
        return (i.currentTNode = e), (i.lView = n), !0;
      }
      function xa(n) {
        const e = jd(),
          t = n[1];
        (R.lFrame = e),
          (e.currentTNode = t.firstChild),
          (e.lView = n),
          (e.tView = t),
          (e.contextLView = n),
          (e.bindingIndex = t.bindingStartIndex),
          (e.inI18n = !1);
      }
      function jd() {
        const n = R.lFrame,
          e = null === n ? null : n.child;
        return null === e ? $d(n) : e;
      }
      function $d(n) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1,
        };
        return null !== n && (n.child = e), e;
      }
      function Ud() {
        const n = R.lFrame;
        return (
          (R.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        );
      }
      const zd = Ud;
      function Na() {
        const n = Ud();
        (n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0);
      }
      function $e() {
        return R.lFrame.selectedIndex;
      }
      function _n(n) {
        R.lFrame.selectedIndex = n;
      }
      function ue() {
        const n = R.lFrame;
        return Ca(n.tView, n.selectedIndex);
      }
      function mo(n, e) {
        for (let t = e.directiveStart, i = e.directiveEnd; t < i; t++) {
          const o = n.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = o;
          s && (n.contentHooks || (n.contentHooks = [])).push(-t, s),
            a &&
              ((n.contentHooks || (n.contentHooks = [])).push(t, a),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(t, a)),
            l && (n.viewHooks || (n.viewHooks = [])).push(-t, l),
            c &&
              ((n.viewHooks || (n.viewHooks = [])).push(t, c),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(t, c)),
            null != u && (n.destroyHooks || (n.destroyHooks = [])).push(t, u);
        }
      }
      function yo(n, e, t) {
        Wd(n, e, 3, t);
      }
      function vo(n, e, t, i) {
        (3 & n[2]) === t && Wd(n, e, t, i);
      }
      function Oa(n, e) {
        let t = n[2];
        (3 & t) === e && ((t &= 2047), (t += 1), (n[2] = t));
      }
      function Wd(n, e, t, i) {
        const o = i ?? -1,
          s = e.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & n[18] : 0; l < s; l++)
          if ("number" == typeof e[l + 1]) {
            if (((a = e[l]), null != i && a >= i)) break;
          } else
            e[l] < 0 && (n[18] += 65536),
              (a < o || -1 == o) &&
                (UD(n, t, e, l), (n[18] = (4294901760 & n[18]) + l + 2)),
              l++;
      }
      function UD(n, e, t, i) {
        const r = t[i] < 0,
          o = t[i + 1],
          a = n[r ? -t[i] : t[i]];
        if (r) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === e) {
            n[2] += 2048;
            try {
              o.call(a);
            } finally {
            }
          }
        } else
          try {
            o.call(a);
          } finally {
          }
      }
      class tr {
        constructor(e, t, i) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = i);
        }
      }
      function _o(n, e, t) {
        let i = 0;
        for (; i < t.length; ) {
          const r = t[i];
          if ("number" == typeof r) {
            if (0 !== r) break;
            i++;
            const o = t[i++],
              s = t[i++],
              a = t[i++];
            n.setAttribute(e, s, a, o);
          } else {
            const o = r,
              s = t[++i];
            qd(o) ? n.setProperty(e, o, s) : n.setAttribute(e, o, s), i++;
          }
        }
        return i;
      }
      function Gd(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function qd(n) {
        return 64 === n.charCodeAt(0);
      }
      function Do(n, e) {
        if (null !== e && 0 !== e.length)
          if (null === n || 0 === n.length) n = e.slice();
          else {
            let t = -1;
            for (let i = 0; i < e.length; i++) {
              const r = e[i];
              "number" == typeof r
                ? (t = r)
                : 0 === t ||
                  Kd(n, t, r, null, -1 === t || 2 === t ? e[++i] : null);
            }
          }
        return n;
      }
      function Kd(n, e, t, i, r) {
        let o = 0,
          s = n.length;
        if (-1 === e) s = -1;
        else
          for (; o < n.length; ) {
            const a = n[o++];
            if ("number" == typeof a) {
              if (a === e) {
                s = -1;
                break;
              }
              if (a > e) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < n.length; ) {
          const a = n[o];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === i) return void (null !== r && (n[o + 1] = r));
            if (i === n[o + 1]) return void (n[o + 2] = r);
          }
          o++, null !== i && o++, null !== r && o++;
        }
        -1 !== s && (n.splice(s, 0, e), (o = s + 1)),
          n.splice(o++, 0, t),
          null !== i && n.splice(o++, 0, i),
          null !== r && n.splice(o++, 0, r);
      }
      function Qd(n) {
        return -1 !== n;
      }
      function si(n) {
        return 32767 & n;
      }
      function ai(n, e) {
        let t = (function KD(n) {
            return n >> 16;
          })(n),
          i = e;
        for (; t > 0; ) (i = i[15]), t--;
        return i;
      }
      let La = !0;
      function Eo(n) {
        const e = La;
        return (La = n), e;
      }
      let QD = 0;
      const $t = {};
      function ir(n, e) {
        const t = ka(n, e);
        if (-1 !== t) return t;
        const i = e[1];
        i.firstCreatePass &&
          ((n.injectorIndex = e.length),
          Ra(i.data, n),
          Ra(e, null),
          Ra(i.blueprint, null));
        const r = wo(n, e),
          o = n.injectorIndex;
        if (Qd(r)) {
          const s = si(r),
            a = ai(r, e),
            l = a[1].data;
          for (let c = 0; c < 8; c++) e[o + c] = a[s + c] | l[s + c];
        }
        return (e[o + 8] = r), o;
      }
      function Ra(n, e) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function ka(n, e) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === e[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function wo(n, e) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex;
        let t = 0,
          i = null,
          r = e;
        for (; null !== r; ) {
          if (((i = of(r)), null === i)) return -1;
          if ((t++, (r = r[15]), -1 !== i.injectorIndex))
            return i.injectorIndex | (t << 16);
        }
        return -1;
      }
      function bo(n, e, t) {
        !(function YD(n, e, t) {
          let i;
          "string" == typeof t
            ? (i = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(qi) && (i = t[qi]),
            null == i && (i = t[qi] = QD++);
          const r = 255 & i;
          e.data[n + (r >> 5)] |= 1 << r;
        })(n, e, t);
      }
      function Xd(n, e, t) {
        if (t & L.Optional || void 0 !== n) return n;
        ro();
      }
      function Jd(n, e, t, i) {
        if (
          (t & L.Optional && void 0 === i && (i = null),
          0 == (t & (L.Self | L.Host)))
        ) {
          const r = n[9],
            o = gt(void 0);
          try {
            return r ? r.get(e, i, t & L.Optional) : wd(e, i, t & L.Optional);
          } finally {
            gt(o);
          }
        }
        return Xd(i, 0, t);
      }
      function ef(n, e, t, i = L.Default, r) {
        if (null !== n) {
          if (1024 & e[2]) {
            const s = (function nE(n, e, t, i, r) {
              let o = n,
                s = e;
              for (
                ;
                null !== o && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = tf(o, s, t, i | L.Self, $t);
                if (a !== $t) return a;
                let l = o.parent;
                if (!l) {
                  const c = s[21];
                  if (c) {
                    const u = c.get(t, $t, i);
                    if (u !== $t) return u;
                  }
                  (l = of(s)), (s = s[15]);
                }
                o = l;
              }
              return r;
            })(n, e, t, i, $t);
            if (s !== $t) return s;
          }
          const o = tf(n, e, t, i, $t);
          if (o !== $t) return o;
        }
        return Jd(e, t, i, r);
      }
      function tf(n, e, t, i, r) {
        const o = (function JD(n) {
          if ("string" == typeof n) return n.charCodeAt(0) || 0;
          const e = n.hasOwnProperty(qi) ? n[qi] : void 0;
          return "number" == typeof e ? (e >= 0 ? 255 & e : eE) : e;
        })(t);
        if ("function" == typeof o) {
          if (!Hd(e, n, i)) return i & L.Host ? Xd(r, 0, i) : Jd(e, t, i, r);
          try {
            const s = o(i);
            if (null != s || i & L.Optional) return s;
            ro();
          } finally {
            zd();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = ka(n, e),
            l = -1,
            c = i & L.Host ? e[16][6] : null;
          for (
            (-1 === a || i & L.SkipSelf) &&
            ((l = -1 === a ? wo(n, e) : e[a + 8]),
            -1 !== l && rf(i, !1)
              ? ((s = e[1]), (a = si(l)), (e = ai(l, e)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = e[1];
            if (nf(o, a, u.data)) {
              const d = XD(a, e, t, s, i, c);
              if (d !== $t) return d;
            }
            (l = e[a + 8]),
              -1 !== l && rf(i, e[1].data[a + 8] === c) && nf(o, a, e)
                ? ((s = u), (a = si(l)), (e = ai(l, e)))
                : (a = -1);
          }
        }
        return r;
      }
      function XD(n, e, t, i, r, o) {
        const s = e[1],
          a = s.data[n + 8],
          u = Co(
            a,
            s,
            t,
            null == i ? fo(a) && La : i != s && 0 != (3 & a.type),
            r & L.Host && o === a
          );
        return null !== u ? rr(e, s, u, a) : $t;
      }
      function Co(n, e, t, i, r) {
        const o = n.providerIndexes,
          s = e.data,
          a = 1048575 & o,
          l = n.directiveStart,
          u = o >> 20,
          f = r ? a + u : n.directiveEnd;
        for (let p = i ? a : a + u; p < f; p++) {
          const h = s[p];
          if ((p < l && t === h) || (p >= l && h.type === t)) return p;
        }
        if (r) {
          const p = s[l];
          if (p && At(p) && p.type === t) return l;
        }
        return null;
      }
      function rr(n, e, t, i) {
        let r = n[t];
        const o = e.data;
        if (
          (function zD(n) {
            return n instanceof tr;
          })(r)
        ) {
          const s = r;
          s.resolving &&
            (function Y_(n, e) {
              const t = e ? `. Dependency path: ${e.join(" > ")} > ${n}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${n}${t}`
              );
            })(
              (function Z(n) {
                return "function" == typeof n
                  ? n.name || n.toString()
                  : "object" == typeof n &&
                    null != n &&
                    "function" == typeof n.type
                  ? n.type.name || n.type.toString()
                  : V(n);
              })(o[t])
            );
          const a = Eo(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? gt(s.injectImpl) : null;
          Hd(n, i, L.Default);
          try {
            (r = n[t] = s.factory(void 0, o, n, i)),
              e.firstCreatePass &&
                t >= i.directiveStart &&
                (function $D(n, e, t) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: r,
                    ngDoCheck: o,
                  } = e.type.prototype;
                  if (i) {
                    const s = Ad(e);
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(n, s),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, s);
                  }
                  r &&
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - n, r),
                    o &&
                      ((t.preOrderHooks || (t.preOrderHooks = [])).push(n, o),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, o));
                })(t, o[t], e);
          } finally {
            null !== l && gt(l), Eo(a), (s.resolving = !1), zd();
          }
        }
        return r;
      }
      function nf(n, e, t) {
        return !!(t[e + (n >> 5)] & (1 << n));
      }
      function rf(n, e) {
        return !(n & L.Self || (n & L.Host && e));
      }
      class li {
        constructor(e, t) {
          (this._tNode = e), (this._lView = t);
        }
        get(e, t, i) {
          return ef(this._tNode, this._lView, e, i, t);
        }
      }
      function eE() {
        return new li(Ie(), _());
      }
      function of(n) {
        const e = n[1],
          t = e.type;
        return 2 === t ? e.declTNode : 1 === t ? n[6] : null;
      }
      const ui = "__parameters__";
      function fi(n, e, t) {
        return yn(() => {
          const i = (function Ha(n) {
            return function (...t) {
              if (n) {
                const i = n(...t);
                for (const r in i) this[r] = i[r];
              }
            };
          })(e);
          function r(...o) {
            if (this instanceof r) return i.apply(this, o), this;
            const s = new r(...o);
            return (a.annotation = s), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(ui)
                ? l[ui]
                : Object.defineProperty(l, ui, { value: [] })[ui];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), l;
            }
          }
          return (
            t && (r.prototype = Object.create(t.prototype)),
            (r.prototype.ngMetadataName = n),
            (r.annotationCls = r),
            r
          );
        });
      }
      class W {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = te({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function st(n, e) {
        void 0 === e && (e = n);
        for (let t = 0; t < n.length; t++) {
          let i = n[t];
          Array.isArray(i)
            ? (e === n && (e = n.slice(0, t)), st(i, e))
            : e !== n && e.push(i);
        }
        return e;
      }
      function en(n, e) {
        n.forEach((t) => (Array.isArray(t) ? en(t, e) : e(t)));
      }
      function af(n, e, t) {
        e >= n.length ? n.push(t) : n.splice(e, 0, t);
      }
      function Io(n, e) {
        return e >= n.length - 1 ? n.pop() : n.splice(e, 1)[0];
      }
      function ar(n, e) {
        const t = [];
        for (let i = 0; i < n; i++) t.push(e);
        return t;
      }
      function at(n, e, t) {
        let i = pi(n, e);
        return (
          i >= 0
            ? (n[1 | i] = t)
            : ((i = ~i),
              (function sE(n, e, t, i) {
                let r = n.length;
                if (r == e) n.push(t, i);
                else if (1 === r) n.push(i, n[0]), (n[0] = t);
                else {
                  for (r--, n.push(n[r - 1], n[r]); r > e; )
                    (n[r] = n[r - 2]), r--;
                  (n[e] = t), (n[e + 1] = i);
                }
              })(n, i, e, t)),
          i
        );
      }
      function $a(n, e) {
        const t = pi(n, e);
        if (t >= 0) return n[1 | t];
      }
      function pi(n, e) {
        return (function uf(n, e, t) {
          let i = 0,
            r = n.length >> t;
          for (; r !== i; ) {
            const o = i + ((r - i) >> 1),
              s = n[o << t];
            if (e === s) return o << t;
            s > e ? (r = o) : (i = o + 1);
          }
          return ~(r << t);
        })(n, e, 1);
      }
      const lr = {},
        za = "__NG_DI_FLAG__",
        To = "ngTempTokenPath",
        hE = /\n/gm,
        df = "__source";
      let cr;
      function hi(n) {
        const e = cr;
        return (cr = n), e;
      }
      function mE(n, e = L.Default) {
        if (void 0 === cr) throw new C(-203, !1);
        return null === cr
          ? wd(n, void 0, e)
          : cr.get(n, e & L.Optional ? null : void 0, e);
      }
      function G(n, e = L.Default) {
        return (
          (function rD() {
            return ha;
          })() || mE
        )(F(n), e);
      }
      function Wa(n) {
        const e = [];
        for (let t = 0; t < n.length; t++) {
          const i = F(n[t]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new C(900, !1);
            let r,
              o = L.Default;
            for (let s = 0; s < i.length; s++) {
              const a = i[s],
                l = vE(a);
              "number" == typeof l
                ? -1 === l
                  ? (r = a.token)
                  : (o |= l)
                : (r = a);
            }
            e.push(G(r, o));
          } else e.push(G(i));
        }
        return e;
      }
      function ur(n, e) {
        return (n[za] = e), (n.prototype[za] = e), n;
      }
      function vE(n) {
        return n[za];
      }
      const Mo = ur(fi("Optional"), 8),
        Ao = ur(fi("SkipSelf"), 4);
      var Ye = (() => (
        ((Ye = Ye || {})[(Ye.Important = 1)] = "Important"),
        (Ye[(Ye.DashCase = 2)] = "DashCase"),
        Ye
      ))();
      const Ya = new Map();
      let RE = 0;
      const Xa = "__ngContext__";
      function Oe(n, e) {
        Qe(e)
          ? ((n[Xa] = e[20]),
            (function VE(n) {
              Ya.set(n[20], n);
            })(e))
          : (n[Xa] = e);
      }
      function el(n, e) {
        return undefined(n, e);
      }
      function hr(n) {
        const e = n[3];
        return Mt(e) ? e[3] : e;
      }
      function tl(n) {
        return Nf(n[13]);
      }
      function nl(n) {
        return Nf(n[4]);
      }
      function Nf(n) {
        for (; null !== n && !Mt(n); ) n = n[4];
        return n;
      }
      function mi(n, e, t, i, r) {
        if (null != i) {
          let o,
            s = !1;
          Mt(i) ? (o = i) : Qe(i) && ((s = !0), (i = i[0]));
          const a = De(i);
          0 === n && null !== t
            ? null == r
              ? Vf(e, t, a)
              : Bn(e, t, a, r || null, !0)
            : 1 === n && null !== t
            ? Bn(e, t, a, r || null, !0)
            : 2 === n
            ? (function cl(n, e, t) {
                const i = No(n, e);
                i &&
                  (function sw(n, e, t, i) {
                    n.removeChild(e, t, i);
                  })(n, i, e, t);
              })(e, a, s)
            : 3 === n && e.destroyNode(a),
            null != o &&
              (function cw(n, e, t, i, r) {
                const o = t[7];
                o !== De(t) && mi(e, n, i, o, r);
                for (let a = 10; a < t.length; a++) {
                  const l = t[a];
                  gr(l[1], l, n, e, i, o);
                }
              })(e, n, o, t, r);
        }
      }
      function rl(n, e, t) {
        return n.createElement(e, t);
      }
      function Ff(n, e) {
        const t = n[9],
          i = t.indexOf(e),
          r = e[3];
        512 & e[2] && ((e[2] &= -513), Ia(r, -1)), t.splice(i, 1);
      }
      function ol(n, e) {
        if (n.length <= 10) return;
        const t = 10 + e,
          i = n[t];
        if (i) {
          const r = i[17];
          null !== r && r !== n && Ff(r, i), e > 0 && (n[t - 1][4] = i[4]);
          const o = Io(n, 10 + e);
          !(function XE(n, e) {
            gr(n, e, e[$], 2, null, null), (e[0] = null), (e[6] = null);
          })(i[1], i);
          const s = o[19];
          null !== s && s.detachView(o[1]),
            (i[3] = null),
            (i[4] = null),
            (i[2] &= -65);
        }
        return i;
      }
      function Lf(n, e) {
        if (!(128 & e[2])) {
          const t = e[$];
          t.destroyNode && gr(n, e, t, 3, null, null),
            (function tw(n) {
              let e = n[13];
              if (!e) return sl(n[1], n);
              for (; e; ) {
                let t = null;
                if (Qe(e)) t = e[13];
                else {
                  const i = e[10];
                  i && (t = i);
                }
                if (!t) {
                  for (; e && !e[4] && e !== n; )
                    Qe(e) && sl(e[1], e), (e = e[3]);
                  null === e && (e = n), Qe(e) && sl(e[1], e), (t = e && e[4]);
                }
                e = t;
              }
            })(e);
        }
      }
      function sl(n, e) {
        if (!(128 & e[2])) {
          (e[2] &= -65),
            (e[2] |= 128),
            (function ow(n, e) {
              let t;
              if (null != n && null != (t = n.destroyHooks))
                for (let i = 0; i < t.length; i += 2) {
                  const r = e[t[i]];
                  if (!(r instanceof tr)) {
                    const o = t[i + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = r[o[s]],
                          l = o[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        o.call(r);
                      } finally {
                      }
                  }
                }
            })(n, e),
            (function rw(n, e) {
              const t = n.cleanup,
                i = e[7];
              let r = -1;
              if (null !== t)
                for (let o = 0; o < t.length - 1; o += 2)
                  if ("string" == typeof t[o]) {
                    const s = t[o + 1],
                      a = "function" == typeof s ? s(e) : De(e[s]),
                      l = i[(r = t[o + 2])],
                      c = t[o + 3];
                    "boolean" == typeof c
                      ? a.removeEventListener(t[o], l, c)
                      : c >= 0
                      ? i[(r = c)]()
                      : i[(r = -c)].unsubscribe(),
                      (o += 2);
                  } else {
                    const s = i[(r = t[o + 1])];
                    t[o].call(s);
                  }
              if (null !== i) {
                for (let o = r + 1; o < i.length; o++) (0, i[o])();
                e[7] = null;
              }
            })(n, e),
            1 === e[1].type && e[$].destroy();
          const t = e[17];
          if (null !== t && Mt(e[3])) {
            t !== e[3] && Ff(t, e);
            const i = e[19];
            null !== i && i.detachView(n);
          }
          !(function BE(n) {
            Ya.delete(n[20]);
          })(e);
        }
      }
      function Rf(n, e, t) {
        return (function kf(n, e, t) {
          let i = e;
          for (; null !== i && 40 & i.type; ) i = (e = i).parent;
          if (null === i) return t[0];
          if (2 & i.flags) {
            const r = n.data[i.directiveStart].encapsulation;
            if (r === St.None || r === St.Emulated) return null;
          }
          return rt(i, t);
        })(n, e.parent, t);
      }
      function Bn(n, e, t, i, r) {
        n.insertBefore(e, t, i, r);
      }
      function Vf(n, e, t) {
        n.appendChild(e, t);
      }
      function Bf(n, e, t, i, r) {
        null !== i ? Bn(n, e, t, i, r) : Vf(n, e, t);
      }
      function No(n, e) {
        return n.parentNode(e);
      }
      function Hf(n, e, t) {
        return $f(n, e, t);
      }
      let pl,
        $f = function jf(n, e, t) {
          return 40 & n.type ? rt(n, t) : null;
        };
      function Oo(n, e, t, i) {
        const r = Rf(n, i, e),
          o = e[$],
          a = Hf(i.parent || e[6], i, e);
        if (null != r)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) Bf(o, r, t[l], a, !1);
          else Bf(o, r, t, a, !1);
      }
      function Fo(n, e) {
        if (null !== e) {
          const t = e.type;
          if (3 & t) return rt(e, n);
          if (4 & t) return ll(-1, n[e.index]);
          if (8 & t) {
            const i = e.child;
            if (null !== i) return Fo(n, i);
            {
              const r = n[e.index];
              return Mt(r) ? ll(-1, r) : De(r);
            }
          }
          if (32 & t) return el(e, n)() || De(n[e.index]);
          {
            const i = zf(n, e);
            return null !== i
              ? Array.isArray(i)
                ? i[0]
                : Fo(hr(n[16]), i)
              : Fo(n, e.next);
          }
        }
        return null;
      }
      function zf(n, e) {
        return null !== e ? n[16][6].projection[e.projection] : null;
      }
      function ll(n, e) {
        const t = 10 + n + 1;
        if (t < e.length) {
          const i = e[t],
            r = i[1].firstChild;
          if (null !== r) return Fo(i, r);
        }
        return e[7];
      }
      function ul(n, e, t, i, r, o, s) {
        for (; null != t; ) {
          const a = i[t.index],
            l = t.type;
          if (
            (s && 0 === e && (a && Oe(De(a), i), (t.flags |= 4)),
            64 != (64 & t.flags))
          )
            if (8 & l) ul(n, e, t.child, i, r, o, !1), mi(e, n, r, a, o);
            else if (32 & l) {
              const c = el(t, i);
              let u;
              for (; (u = c()); ) mi(e, n, r, u, o);
              mi(e, n, r, a, o);
            } else 16 & l ? Wf(n, e, i, t, r, o) : mi(e, n, r, a, o);
          t = s ? t.projectionNext : t.next;
        }
      }
      function gr(n, e, t, i, r, o) {
        ul(t, i, n.firstChild, e, r, o, !1);
      }
      function Wf(n, e, t, i, r, o) {
        const s = t[16],
          l = s[6].projection[i.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) mi(e, n, r, l[c], o);
        else ul(n, e, l, s[3], r, o, !0);
      }
      function Gf(n, e, t) {
        n.setAttribute(e, "style", t);
      }
      function dl(n, e, t) {
        "" === t
          ? n.removeAttribute(e, "class")
          : n.setAttribute(e, "class", t);
      }
      const sp = new W("ENVIRONMENT_INITIALIZER"),
        ap = new W("INJECTOR", -1),
        lp = new W("INJECTOR_DEF_TYPES");
      class cp {
        get(e, t = lr) {
          if (t === lr) {
            const i = new Error(`NullInjectorError: No provider for ${re(e)}!`);
            throw ((i.name = "NullInjectorError"), i);
          }
          return t;
        }
      }
      function Vw(...n) {
        return { ɵproviders: up(0, n) };
      }
      function up(n, ...e) {
        const t = [],
          i = new Set();
        let r;
        return (
          en(e, (o) => {
            const s = o;
            _l(s, t, [], i) && (r || (r = []), r.push(s));
          }),
          void 0 !== r && dp(r, t),
          t
        );
      }
      function dp(n, e) {
        for (let t = 0; t < n.length; t++) {
          const { providers: r } = n[t];
          en(r, (o) => {
            e.push(o);
          });
        }
      }
      function _l(n, e, t, i) {
        if (!(n = F(n))) return !1;
        let r = null,
          o = Dd(n);
        const s = !o && ne(n);
        if (o || s) {
          if (s && !s.standalone) return !1;
          r = n;
        } else {
          const l = n.ngModule;
          if (((o = Dd(l)), !o)) return !1;
          r = l;
        }
        const a = i.has(r);
        if (s) {
          if (a) return !1;
          if ((i.add(r), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of l) _l(c, e, t, i);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let c;
              i.add(r);
              try {
                en(o.imports, (u) => {
                  _l(u, e, t, i) && (c || (c = []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && dp(c, e);
            }
            if (!a) {
              const c = Vn(r) || (() => new r());
              e.push(
                { provide: r, useFactory: c, deps: X },
                { provide: lp, useValue: r, multi: !0 },
                { provide: sp, useValue: () => G(r), multi: !0 }
              );
            }
            const l = o.providers;
            null == l ||
              a ||
              en(l, (u) => {
                e.push(u);
              });
          }
        }
        return r !== n && void 0 !== n.providers;
      }
      const Bw = ie({ provide: String, useValue: ie });
      function Dl(n) {
        return null !== n && "object" == typeof n && Bw in n;
      }
      function jn(n) {
        return "function" == typeof n;
      }
      const El = new W("Set Injector scope."),
        Vo = {},
        jw = {};
      let wl;
      function Bo() {
        return void 0 === wl && (wl = new cp()), wl;
      }
      class yi {}
      class hp extends yi {
        constructor(e, t, i, r) {
          super(),
            (this.parent = t),
            (this.source = i),
            (this.scopes = r),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Cl(e, (s) => this.processProvider(s)),
            this.records.set(ap, vi(void 0, this)),
            r.has("environment") && this.records.set(yi, vi(void 0, this));
          const o = this.records.get(El);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(lp.multi, X, L.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const e of this._ngOnDestroyHooks) e.ngOnDestroy();
            for (const e of this._onDestroyHooks) e();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(e) {
          this._onDestroyHooks.push(e);
        }
        runInContext(e) {
          this.assertNotDestroyed();
          const t = hi(this),
            i = gt(void 0);
          try {
            return e();
          } finally {
            hi(t), gt(i);
          }
        }
        get(e, t = lr, i = L.Default) {
          this.assertNotDestroyed();
          const r = hi(this),
            o = gt(void 0);
          try {
            if (!(i & L.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l =
                  (function Gw(n) {
                    return (
                      "function" == typeof n ||
                      ("object" == typeof n && n instanceof W)
                    );
                  })(e) && oo(e);
                (a = l && this.injectableDefInScope(l) ? vi(bl(e), Vo) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (i & L.Self ? Bo() : this.parent).get(
              e,
              (t = i & L.Optional && t === lr ? null : t)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[To] = s[To] || []).unshift(re(e)), r)) throw s;
              return (function _E(n, e, t, i) {
                const r = n[To];
                throw (
                  (e[df] && r.unshift(e[df]),
                  (n.message = (function DE(n, e, t, i = null) {
                    n =
                      n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1)
                        ? n.slice(2)
                        : n;
                    let r = re(e);
                    if (Array.isArray(e)) r = e.map(re).join(" -> ");
                    else if ("object" == typeof e) {
                      let o = [];
                      for (let s in e)
                        if (e.hasOwnProperty(s)) {
                          let a = e[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : re(a))
                          );
                        }
                      r = `{${o.join(", ")}}`;
                    }
                    return `${t}${i ? "(" + i + ")" : ""}[${r}]: ${n.replace(
                      hE,
                      "\n  "
                    )}`;
                  })("\n" + n.message, r, t, i)),
                  (n.ngTokenPath = r),
                  (n[To] = null),
                  n)
                );
              })(s, e, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            gt(o), hi(r);
          }
        }
        resolveInjectorInitializers() {
          const e = hi(this),
            t = gt(void 0);
          try {
            const i = this.get(sp.multi, X, L.Self);
            for (const r of i) r();
          } finally {
            hi(e), gt(t);
          }
        }
        toString() {
          const e = [],
            t = this.records;
          for (const i of t.keys()) e.push(re(i));
          return `R3Injector[${e.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(e) {
          let t = jn((e = F(e))) ? e : F(e && e.provide);
          const i = (function Uw(n) {
            return Dl(n)
              ? vi(void 0, n.useValue)
              : vi(
                  (function gp(n, e, t) {
                    let i;
                    if (jn(n)) {
                      const r = F(n);
                      return Vn(r) || bl(r);
                    }
                    if (Dl(n)) i = () => F(n.useValue);
                    else if (
                      (function pp(n) {
                        return !(!n || !n.useFactory);
                      })(n)
                    )
                      i = () => n.useFactory(...Wa(n.deps || []));
                    else if (
                      (function fp(n) {
                        return !(!n || !n.useExisting);
                      })(n)
                    )
                      i = () => G(F(n.useExisting));
                    else {
                      const r = F(n && (n.useClass || n.provide));
                      if (
                        !(function zw(n) {
                          return !!n.deps;
                        })(n)
                      )
                        return Vn(r) || bl(r);
                      i = () => new r(...Wa(n.deps));
                    }
                    return i;
                  })(n),
                  Vo
                );
          })(e);
          if (jn(e) || !0 !== e.multi) this.records.get(t);
          else {
            let r = this.records.get(t);
            r ||
              ((r = vi(void 0, Vo, !0)),
              (r.factory = () => Wa(r.multi)),
              this.records.set(t, r)),
              (t = e),
              r.multi.push(e);
          }
          this.records.set(t, i);
        }
        hydrate(e, t) {
          return (
            t.value === Vo && ((t.value = jw), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              (function Ww(n) {
                return (
                  null !== n &&
                  "object" == typeof n &&
                  "function" == typeof n.ngOnDestroy
                );
              })(t.value) &&
              this._ngOnDestroyHooks.add(t.value),
            t.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const t = F(e.providedIn);
          return "string" == typeof t
            ? "any" === t || this.scopes.has(t)
            : this.injectorDefTypes.has(t);
        }
      }
      function bl(n) {
        const e = oo(n),
          t = null !== e ? e.factory : Vn(n);
        if (null !== t) return t;
        if (n instanceof W) throw new C(204, !1);
        if (n instanceof Function)
          return (function $w(n) {
            const e = n.length;
            if (e > 0) throw (ar(e, "?"), new C(204, !1));
            const t = (function tD(n) {
              const e = n && (n[so] || n[Ed]);
              if (e) {
                const t = (function nD(n) {
                  if (n.hasOwnProperty("name")) return n.name;
                  const e = ("" + n).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(n);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`
                  ),
                  e
                );
              }
              return null;
            })(n);
            return null !== t ? () => t.factory(n) : () => new n();
          })(n);
        throw new C(204, !1);
      }
      function vi(n, e, t = !1) {
        return { factory: n, value: e, multi: t ? [] : void 0 };
      }
      function qw(n) {
        return !!n.ɵproviders;
      }
      function Cl(n, e) {
        for (const t of n)
          Array.isArray(t) ? Cl(t, e) : qw(t) ? Cl(t.ɵproviders, e) : e(t);
      }
      class mp {}
      class Yw {
        resolveComponentFactory(e) {
          throw (function Qw(n) {
            const e = Error(
              `No component factory found for ${re(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = n), e;
          })(e);
        }
      }
      let Ho = (() => {
        class n {}
        return (n.NULL = new Yw()), n;
      })();
      function Zw() {
        return _i(Ie(), _());
      }
      function _i(n, e) {
        return new nn(rt(n, e));
      }
      let nn = (() => {
        class n {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (n.__NG_ELEMENT_ID__ = Zw), n;
      })();
      function Xw(n) {
        return n instanceof nn ? n.nativeElement : n;
      }
      class _r {}
      let vp = (() => {
          class n {}
          return (
            (n.__NG_ELEMENT_ID__ = () =>
              (function Jw() {
                const n = _(),
                  t = ot(Ie().index, n);
                return (Qe(t) ? t : n)[$];
              })()),
            n
          );
        })(),
        eb = (() => {
          class n {}
          return (
            (n.ɵprov = te({
              token: n,
              providedIn: "root",
              factory: () => null,
            })),
            n
          );
        })();
      class Il {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const tb = new Il("14.3.0"),
        Sl = {};
      function Ml(n) {
        return n.ngOriginalError;
      }
      class Di {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e);
          this._console.error("ERROR", e),
            t && this._console.error("ORIGINAL ERROR", t);
        }
        _findOriginalError(e) {
          let t = e && Ml(e);
          for (; t && Ml(t); ) t = Ml(t);
          return t || null;
        }
      }
      function Dp(n, e, t) {
        let i = n.length;
        for (;;) {
          const r = n.indexOf(e, t);
          if (-1 === r) return r;
          if (0 === r || n.charCodeAt(r - 1) <= 32) {
            const o = e.length;
            if (r + o === i || n.charCodeAt(r + o) <= 32) return r;
          }
          t = r + 1;
        }
      }
      const Ep = "ng-template";
      function fb(n, e, t) {
        let i = 0;
        for (; i < n.length; ) {
          let r = n[i++];
          if (t && "class" === r) {
            if (((r = n[i]), -1 !== Dp(r.toLowerCase(), e, 0))) return !0;
          } else if (1 === r) {
            for (; i < n.length && "string" == typeof (r = n[i++]); )
              if (r.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function wp(n) {
        return 4 === n.type && n.value !== Ep;
      }
      function pb(n, e, t) {
        return e === (4 !== n.type || t ? n.value : Ep);
      }
      function hb(n, e, t) {
        let i = 4;
        const r = n.attrs || [],
          o = (function yb(n) {
            for (let e = 0; e < n.length; e++) if (Gd(n[e])) return e;
            return n.length;
          })(r);
        let s = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !pb(n, l, t)) || ("" === l && 1 === e.length))
                ) {
                  if (Pt(i)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & i ? l : e[++a];
                if (8 & i && null !== n.attrs) {
                  if (!fb(n.attrs, c, t)) {
                    if (Pt(i)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = gb(8 & i ? "class" : l, r, wp(n), t);
                if (-1 === d) {
                  if (Pt(i)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > o ? "" : r[d + 1].toLowerCase();
                  const p = 8 & i ? f : null;
                  if ((p && -1 !== Dp(p, c, 0)) || (2 & i && c !== f)) {
                    if (Pt(i)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Pt(i) && !Pt(l)) return !1;
            if (s && Pt(l)) continue;
            (s = !1), (i = l | (1 & i));
          }
        }
        return Pt(i) || s;
      }
      function Pt(n) {
        return 0 == (1 & n);
      }
      function gb(n, e, t, i) {
        if (null === e) return -1;
        let r = 0;
        if (i || !t) {
          let o = !1;
          for (; r < e.length; ) {
            const s = e[r];
            if (s === n) return r;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = e[++r];
                for (; "string" == typeof a; ) a = e[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += o ? 1 : 2;
          }
          return -1;
        }
        return (function vb(n, e) {
          let t = n.indexOf(4);
          if (t > -1)
            for (t++; t < n.length; ) {
              const i = n[t];
              if ("number" == typeof i) return -1;
              if (i === e) return t;
              t++;
            }
          return -1;
        })(e, n);
      }
      function bp(n, e, t = !1) {
        for (let i = 0; i < e.length; i++) if (hb(n, e[i], t)) return !0;
        return !1;
      }
      function _b(n, e) {
        e: for (let t = 0; t < e.length; t++) {
          const i = e[t];
          if (n.length === i.length) {
            for (let r = 0; r < n.length; r++) if (n[r] !== i[r]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Cp(n, e) {
        return n ? ":not(" + e.trim() + ")" : e;
      }
      function Db(n) {
        let e = n[0],
          t = 1,
          i = 2,
          r = "",
          o = !1;
        for (; t < n.length; ) {
          let s = n[t];
          if ("string" == typeof s)
            if (2 & i) {
              const a = n[++t];
              r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & i ? (r += "." + s) : 4 & i && (r += " " + s);
          else
            "" !== r && !Pt(s) && ((e += Cp(o, r)), (r = "")),
              (i = s),
              (o = o || !Pt(i));
          t++;
        }
        return "" !== r && (e += Cp(o, r)), e;
      }
      const B = {};
      function ce(n) {
        Ip(Q(), _(), $e() + n, !1);
      }
      function Ip(n, e, t, i) {
        if (!i)
          if (3 == (3 & e[2])) {
            const o = n.preOrderCheckHooks;
            null !== o && yo(e, o, t);
          } else {
            const o = n.preOrderHooks;
            null !== o && vo(e, o, 0, t);
          }
        _n(t);
      }
      function Ap(n, e = null, t = null, i) {
        const r = Pp(n, e, t, i);
        return r.resolveInjectorInitializers(), r;
      }
      function Pp(n, e = null, t = null, i, r = new Set()) {
        const o = [t || X, Vw(n)];
        return (
          (i = i || ("object" == typeof n ? void 0 : re(n))),
          new hp(o, e || Bo(), i || null, r)
        );
      }
      let $n = (() => {
        class n {
          static create(t, i) {
            if (Array.isArray(t)) return Ap({ name: "" }, i, t, "");
            {
              const r = t.name ?? "";
              return Ap({ name: r }, t.parent, t.providers, r);
            }
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = lr),
          (n.NULL = new cp()),
          (n.ɵprov = te({ token: n, providedIn: "any", factory: () => G(ap) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function x(n, e = L.Default) {
        const t = _();
        return null === t ? G(n, e) : ef(Ie(), t, F(n), e);
      }
      function $o(n, e) {
        return (n << 17) | (e << 2);
      }
      function xt(n) {
        return (n >> 17) & 32767;
      }
      function Ol(n) {
        return 2 | n;
      }
      function on(n) {
        return (131068 & n) >> 2;
      }
      function Fl(n, e) {
        return (-131069 & n) | (e << 2);
      }
      function Ll(n) {
        return 1 | n;
      }
      function qp(n, e) {
        const t = n.contentQueries;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) {
            const r = t[i],
              o = t[i + 1];
            if (-1 !== o) {
              const s = n.data[o];
              Pa(r), s.contentQueries(2, e[o], o);
            }
          }
      }
      function Wo(n, e, t, i, r, o, s, a, l, c, u) {
        const d = e.blueprint.slice();
        return (
          (d[0] = r),
          (d[2] = 76 | i),
          (null !== u || (n && 1024 & n[2])) && (d[2] |= 1024),
          Nd(d),
          (d[3] = d[15] = n),
          (d[8] = t),
          (d[10] = s || (n && n[10])),
          (d[$] = a || (n && n[$])),
          (d[12] = l || (n && n[12]) || null),
          (d[9] = c || (n && n[9]) || null),
          (d[6] = o),
          (d[20] = (function kE() {
            return RE++;
          })()),
          (d[21] = u),
          (d[16] = 2 == e.type ? n[16] : d),
          d
        );
      }
      function bi(n, e, t, i, r) {
        let o = n.data[e];
        if (null === o)
          (o = (function Ul(n, e, t, i, r) {
            const o = Ld(),
              s = Sa(),
              l = (n.data[e] = (function iC(n, e, t, i, r, o) {
                return {
                  type: t,
                  index: i,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? o : o && o.parent, t, e, i, r));
            return (
              null === n.firstChild && (n.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && (o.next = l)),
              l
            );
          })(n, e, t, i, r)),
            (function xD() {
              return R.lFrame.inI18n;
            })() && (o.flags |= 64);
        else if (64 & o.type) {
          (o.type = t), (o.value = i), (o.attrs = r);
          const s = (function er() {
            const n = R.lFrame,
              e = n.currentTNode;
            return n.isParent ? e : e.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return jt(o, !0), o;
      }
      function Ci(n, e, t, i) {
        if (0 === t) return -1;
        const r = e.length;
        for (let o = 0; o < t; o++)
          e.push(i), n.blueprint.push(i), n.data.push(null);
        return r;
      }
      function zl(n, e, t) {
        xa(e);
        try {
          const i = n.viewQuery;
          null !== i && Xl(1, i, t);
          const r = n.template;
          null !== r && Kp(n, e, r, 1, t),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && qp(n, e),
            n.staticViewQueries && Xl(2, n.viewQuery, t);
          const o = n.components;
          null !== o &&
            (function eC(n, e) {
              for (let t = 0; t < e.length; t++) _C(n, e[t]);
            })(e, o);
        } catch (i) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            i)
          );
        } finally {
          (e[2] &= -5), Na();
        }
      }
      function Go(n, e, t, i) {
        const r = e[2];
        if (128 != (128 & r)) {
          xa(e);
          try {
            Nd(e),
              (function kd(n) {
                return (R.lFrame.bindingIndex = n);
              })(n.bindingStartIndex),
              null !== t && Kp(n, e, t, 2, i);
            const s = 3 == (3 & r);
            if (s) {
              const c = n.preOrderCheckHooks;
              null !== c && yo(e, c, null);
            } else {
              const c = n.preOrderHooks;
              null !== c && vo(e, c, 0, null), Oa(e, 0);
            }
            if (
              ((function yC(n) {
                for (let e = tl(n); null !== e; e = nl(e)) {
                  if (!e[2]) continue;
                  const t = e[9];
                  for (let i = 0; i < t.length; i++) {
                    const r = t[i],
                      o = r[3];
                    0 == (512 & r[2]) && Ia(o, 1), (r[2] |= 512);
                  }
                }
              })(e),
              (function mC(n) {
                for (let e = tl(n); null !== e; e = nl(e))
                  for (let t = 10; t < e.length; t++) {
                    const i = e[t],
                      r = i[1];
                    go(i) && Go(r, i, r.template, i[8]);
                  }
              })(e),
              null !== n.contentQueries && qp(n, e),
              s)
            ) {
              const c = n.contentCheckHooks;
              null !== c && yo(e, c);
            } else {
              const c = n.contentHooks;
              null !== c && vo(e, c, 1), Oa(e, 1);
            }
            !(function Xb(n, e) {
              const t = n.hostBindingOpCodes;
              if (null !== t)
                try {
                  for (let i = 0; i < t.length; i++) {
                    const r = t[i];
                    if (r < 0) _n(~r);
                    else {
                      const o = r,
                        s = t[++i],
                        a = t[++i];
                      ND(s, o), a(2, e[o]);
                    }
                  }
                } finally {
                  _n(-1);
                }
            })(n, e);
            const a = n.components;
            null !== a &&
              (function Jb(n, e) {
                for (let t = 0; t < e.length; t++) vC(n, e[t]);
              })(e, a);
            const l = n.viewQuery;
            if ((null !== l && Xl(2, l, i), s)) {
              const c = n.viewCheckHooks;
              null !== c && yo(e, c);
            } else {
              const c = n.viewHooks;
              null !== c && vo(e, c, 2), Oa(e, 2);
            }
            !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
              (e[2] &= -41),
              512 & e[2] && ((e[2] &= -513), Ia(e[3], -1));
          } finally {
            Na();
          }
        }
      }
      function Kp(n, e, t, i, r) {
        const o = $e(),
          s = 2 & i;
        try {
          _n(-1), s && e.length > 22 && Ip(n, e, 22, !1), t(i, r);
        } finally {
          _n(o);
        }
      }
      function Qp(n, e, t) {
        if (_a(e)) {
          const r = e.directiveEnd;
          for (let o = e.directiveStart; o < r; o++) {
            const s = n.data[o];
            s.contentQueries && s.contentQueries(1, t[o], o);
          }
        }
      }
      function Wl(n, e, t) {
        !Fd() ||
          ((function lC(n, e, t, i) {
            const r = t.directiveStart,
              o = t.directiveEnd;
            n.firstCreatePass || ir(t, e), Oe(i, e);
            const s = t.initialInputs;
            for (let a = r; a < o; a++) {
              const l = n.data[a],
                c = At(l);
              c && pC(e, t, l);
              const u = rr(e, n, a, t);
              Oe(u, e),
                null !== s && hC(0, a - r, u, l, 0, s),
                c && (ot(t.index, e)[8] = u);
            }
          })(n, e, t, rt(t, e)),
          128 == (128 & t.flags) &&
            (function cC(n, e, t) {
              const i = t.directiveStart,
                r = t.directiveEnd,
                o = t.index,
                s = (function OD() {
                  return R.lFrame.currentDirectiveIndex;
                })();
              try {
                _n(o);
                for (let a = i; a < r; a++) {
                  const l = n.data[a],
                    c = e[a];
                  Ma(a),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      nh(l, c);
                }
              } finally {
                _n(-1), Ma(s);
              }
            })(n, e, t));
      }
      function Gl(n, e, t = rt) {
        const i = e.localNames;
        if (null !== i) {
          let r = e.index + 1;
          for (let o = 0; o < i.length; o += 2) {
            const s = i[o + 1],
              a = -1 === s ? t(e, n) : n[s];
            n[r++] = a;
          }
        }
      }
      function Yp(n) {
        const e = n.tView;
        return null === e || e.incompleteFirstPass
          ? (n.tView = ql(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : e;
      }
      function ql(n, e, t, i, r, o, s, a, l, c) {
        const u = 22 + i,
          d = u + r,
          f = (function tC(n, e) {
            const t = [];
            for (let i = 0; i < e; i++) t.push(i < n ? null : B);
            return t;
          })(u, d),
          p = "function" == typeof c ? c() : c;
        return (f[1] = {
          type: n,
          blueprint: f,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: f.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
        });
      }
      function Zp(n, e, t, i) {
        const r = ah(e);
        null === t
          ? r.push(i)
          : (r.push(t), n.firstCreatePass && lh(n).push(i, r.length - 1));
      }
      function Xp(n, e, t) {
        for (let i in n)
          if (n.hasOwnProperty(i)) {
            const r = n[i];
            (t = null === t ? {} : t).hasOwnProperty(i)
              ? t[i].push(e, r)
              : (t[i] = [e, r]);
          }
        return t;
      }
      function Jp(n, e) {
        const i = e.directiveEnd,
          r = n.data,
          o = e.attrs,
          s = [];
        let a = null,
          l = null;
        for (let c = e.directiveStart; c < i; c++) {
          const u = r[c],
            d = u.inputs,
            f = null === o || wp(e) ? null : gC(d, o);
          s.push(f), (a = Xp(d, c, a)), (l = Xp(u.outputs, c, l));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (e.flags |= 16),
          a.hasOwnProperty("style") && (e.flags |= 32)),
          (e.initialInputs = s),
          (e.inputs = a),
          (e.outputs = l);
      }
      function eh(n, e) {
        const t = ot(e, n);
        16 & t[2] || (t[2] |= 32);
      }
      function Kl(n, e, t, i) {
        let r = !1;
        if (Fd()) {
          const o = (function uC(n, e, t) {
              const i = n.directiveRegistry;
              let r = null;
              if (i)
                for (let o = 0; o < i.length; o++) {
                  const s = i[o];
                  bp(t, s.selectors, !1) &&
                    (r || (r = []),
                    bo(ir(t, e), n, s.type),
                    At(s) ? (ih(n, t), r.unshift(s)) : r.push(s));
                }
              return r;
            })(n, e, t),
            s = null === i ? null : { "": -1 };
          if (null !== o) {
            (r = !0), rh(t, n.data.length, o.length);
            for (let u = 0; u < o.length; u++) {
              const d = o[u];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              c = Ci(n, e, o.length, null);
            for (let u = 0; u < o.length; u++) {
              const d = o[u];
              (t.mergedAttrs = Do(t.mergedAttrs, d.hostAttrs)),
                oh(n, t, e, c, d),
                fC(c, d, s),
                null !== d.contentQueries && (t.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (t.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((n.preOrderHooks || (n.preOrderHooks = [])).push(t.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                    t.index
                  ),
                  (l = !0)),
                c++;
            }
            Jp(n, t);
          }
          s &&
            (function dC(n, e, t) {
              if (e) {
                const i = (n.localNames = []);
                for (let r = 0; r < e.length; r += 2) {
                  const o = t[e[r + 1]];
                  if (null == o) throw new C(-301, !1);
                  i.push(e[r], o);
                }
              }
            })(t, i, s);
        }
        return (t.mergedAttrs = Do(t.mergedAttrs, t.attrs)), r;
      }
      function th(n, e, t, i, r, o) {
        const s = o.hostBindings;
        if (s) {
          let a = n.hostBindingOpCodes;
          null === a && (a = n.hostBindingOpCodes = []);
          const l = ~e.index;
          (function aC(n) {
            let e = n.length;
            for (; e > 0; ) {
              const t = n[--e];
              if ("number" == typeof t && t < 0) return t;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(i, r, s);
        }
      }
      function nh(n, e) {
        null !== n.hostBindings && n.hostBindings(1, e);
      }
      function ih(n, e) {
        (e.flags |= 2), (n.components || (n.components = [])).push(e.index);
      }
      function fC(n, e, t) {
        if (t) {
          if (e.exportAs)
            for (let i = 0; i < e.exportAs.length; i++) t[e.exportAs[i]] = n;
          At(e) && (t[""] = n);
        }
      }
      function rh(n, e, t) {
        (n.flags |= 1),
          (n.directiveStart = e),
          (n.directiveEnd = e + t),
          (n.providerIndexes = e);
      }
      function oh(n, e, t, i, r) {
        n.data[i] = r;
        const o = r.factory || (r.factory = Vn(r.type)),
          s = new tr(o, At(r), x);
        (n.blueprint[i] = s),
          (t[i] = s),
          th(n, e, 0, i, Ci(n, t, r.hostVars, B), r);
      }
      function pC(n, e, t) {
        const i = rt(e, n),
          r = Yp(t),
          o = n[10],
          s = qo(
            n,
            Wo(
              n,
              r,
              null,
              t.onPush ? 32 : 16,
              i,
              e,
              o,
              o.createRenderer(i, t),
              null,
              null,
              null
            )
          );
        n[e.index] = s;
      }
      function Ut(n, e, t, i, r, o) {
        const s = rt(n, e);
        !(function Ql(n, e, t, i, r, o, s) {
          if (null == o) n.removeAttribute(e, r, t);
          else {
            const a = null == s ? V(o) : s(o, i || "", r);
            n.setAttribute(e, r, a, t);
          }
        })(e[$], s, o, n.value, t, i, r);
      }
      function hC(n, e, t, i, r, o) {
        const s = o[e];
        if (null !== s) {
          const a = i.setInput;
          for (let l = 0; l < s.length; ) {
            const c = s[l++],
              u = s[l++],
              d = s[l++];
            null !== a ? i.setInput(t, d, c, u) : (t[u] = d);
          }
        }
      }
      function gC(n, e) {
        let t = null,
          i = 0;
        for (; i < e.length; ) {
          const r = e[i];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              n.hasOwnProperty(r) &&
                (null === t && (t = []), t.push(r, n[r], e[i + 1])),
                (i += 2);
            } else i += 2;
          else i += 4;
        }
        return t;
      }
      function sh(n, e, t, i) {
        return new Array(n, !0, !1, e, null, 0, i, t, null, null);
      }
      function vC(n, e) {
        const t = ot(e, n);
        if (go(t)) {
          const i = t[1];
          48 & t[2] ? Go(i, t, i.template, t[8]) : t[5] > 0 && Yl(t);
        }
      }
      function Yl(n) {
        for (let i = tl(n); null !== i; i = nl(i))
          for (let r = 10; r < i.length; r++) {
            const o = i[r];
            if (go(o))
              if (512 & o[2]) {
                const s = o[1];
                Go(s, o, s.template, o[8]);
              } else o[5] > 0 && Yl(o);
          }
        const t = n[1].components;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const r = ot(t[i], n);
            go(r) && r[5] > 0 && Yl(r);
          }
      }
      function _C(n, e) {
        const t = ot(e, n),
          i = t[1];
        (function DC(n, e) {
          for (let t = e.length; t < n.blueprint.length; t++)
            e.push(n.blueprint[t]);
        })(i, t),
          zl(i, t, t[8]);
      }
      function qo(n, e) {
        return n[13] ? (n[14][4] = e) : (n[13] = e), (n[14] = e), e;
      }
      function Zl(n) {
        for (; n; ) {
          n[2] |= 32;
          const e = hr(n);
          if (dD(n) && !e) return n;
          n = e;
        }
        return null;
      }
      function Ko(n, e, t, i = !0) {
        const r = e[10];
        r.begin && r.begin();
        try {
          Go(n, e, n.template, t);
        } catch (s) {
          throw (i && uh(e, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function Xl(n, e, t) {
        Pa(0), e(n, t);
      }
      function ah(n) {
        return n[7] || (n[7] = []);
      }
      function lh(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function uh(n, e) {
        const t = n[9],
          i = t ? t.get(Di, null) : null;
        i && i.handleError(e);
      }
      function Jl(n, e, t, i, r) {
        for (let o = 0; o < t.length; ) {
          const s = t[o++],
            a = t[o++],
            l = e[s],
            c = n.data[s];
          null !== c.setInput ? c.setInput(l, r, i, a) : (l[a] = r);
        }
      }
      function Qo(n, e, t) {
        let i = t ? n.styles : null,
          r = t ? n.classes : null,
          o = 0;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const a = e[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (r = da(r, a))
              : 2 == o && (i = da(i, a + ": " + e[++s] + ";"));
          }
        t ? (n.styles = i) : (n.stylesWithoutHost = i),
          t ? (n.classes = r) : (n.classesWithoutHost = r);
      }
      function Yo(n, e, t, i, r = !1) {
        for (; null !== t; ) {
          const o = e[t.index];
          if ((null !== o && i.push(De(o)), Mt(o)))
            for (let a = 10; a < o.length; a++) {
              const l = o[a],
                c = l[1].firstChild;
              null !== c && Yo(l[1], l, c, i);
            }
          const s = t.type;
          if (8 & s) Yo(n, e, t.child, i);
          else if (32 & s) {
            const a = el(t, e);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & s) {
            const a = zf(e, t);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = hr(e[16]);
              Yo(l[1], l, a, i, !0);
            }
          }
          t = r ? t.projectionNext : t.next;
        }
        return i;
      }
      class Dr {
        constructor(e, t) {
          (this._lView = e),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            t = e[1];
          return Yo(t, e, t.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (Mt(e)) {
              const t = e[8],
                i = t ? t.indexOf(this) : -1;
              i > -1 && (ol(e, i), Io(t, i));
            }
            this._attachedToViewContainer = !1;
          }
          Lf(this._lView[1], this._lView);
        }
        onDestroy(e) {
          Zp(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          Zl(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          Ko(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function ew(n, e) {
              gr(n, e, e[$], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = e;
        }
      }
      class EC extends Dr {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          const e = this._view;
          Ko(e[1], e, e[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class ec extends Ho {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const t = ne(e);
          return new Er(t, this.ngModule);
        }
      }
      function dh(n) {
        const e = [];
        for (let t in n)
          n.hasOwnProperty(t) && e.push({ propName: n[t], templateName: t });
        return e;
      }
      class bC {
        constructor(e, t) {
          (this.injector = e), (this.parentInjector = t);
        }
        get(e, t, i) {
          const r = this.injector.get(e, Sl, i);
          return r !== Sl || t === Sl ? r : this.parentInjector.get(e, t, i);
        }
      }
      class Er extends mp {
        constructor(e, t) {
          super(),
            (this.componentDef = e),
            (this.ngModule = t),
            (this.componentType = e.type),
            (this.selector = (function Eb(n) {
              return n.map(Db).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        get inputs() {
          return dh(this.componentDef.inputs);
        }
        get outputs() {
          return dh(this.componentDef.outputs);
        }
        create(e, t, i, r) {
          let o = (r = r || this.ngModule) instanceof yi ? r : r?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new bC(e, o) : e,
            a = s.get(_r, null);
          if (null === a) throw new C(407, !1);
          const l = s.get(eb, null),
            c = a.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            d = i
              ? (function nC(n, e, t) {
                  return n.selectRootElement(e, t === St.ShadowDom);
                })(c, i, this.componentDef.encapsulation)
              : rl(
                  c,
                  u,
                  (function wC(n) {
                    const e = n.toLowerCase();
                    return "svg" === e ? "svg" : "math" === e ? "math" : null;
                  })(u)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            p = ql(0, null, null, 1, 0, null, null, null, null, null),
            h = Wo(null, p, null, f, null, null, a, c, l, s, null);
          let g, m;
          xa(h);
          try {
            const v = (function SC(n, e, t, i, r, o) {
              const s = t[1];
              t[22] = n;
              const l = bi(s, 22, 2, "#host", null),
                c = (l.mergedAttrs = e.hostAttrs);
              null !== c &&
                (Qo(l, c, !0),
                null !== n &&
                  (_o(r, n, c),
                  null !== l.classes && dl(r, n, l.classes),
                  null !== l.styles && Gf(r, n, l.styles)));
              const u = i.createRenderer(n, e),
                d = Wo(
                  t,
                  Yp(e),
                  null,
                  e.onPush ? 32 : 16,
                  t[22],
                  l,
                  i,
                  u,
                  o || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (bo(ir(l, t), s, e.type), ih(s, l), rh(l, t.length, 1)),
                qo(t, d),
                (t[22] = d)
              );
            })(d, this.componentDef, h, a, c);
            if (d)
              if (i) _o(c, d, ["ng-version", tb.full]);
              else {
                const { attrs: w, classes: y } = (function wb(n) {
                  const e = [],
                    t = [];
                  let i = 1,
                    r = 2;
                  for (; i < n.length; ) {
                    let o = n[i];
                    if ("string" == typeof o)
                      2 === r
                        ? "" !== o && e.push(o, n[++i])
                        : 8 === r && t.push(o);
                    else {
                      if (!Pt(r)) break;
                      r = o;
                    }
                    i++;
                  }
                  return { attrs: e, classes: t };
                })(this.componentDef.selectors[0]);
                w && _o(c, d, w), y && y.length > 0 && dl(c, d, y.join(" "));
              }
            if (((m = Ca(p, 22)), void 0 !== t)) {
              const w = (m.projection = []);
              for (let y = 0; y < this.ngContentSelectors.length; y++) {
                const T = t[y];
                w.push(null != T ? Array.from(T) : null);
              }
            }
            (g = (function TC(n, e, t, i) {
              const r = t[1],
                o = (function sC(n, e, t) {
                  const i = Ie();
                  n.firstCreatePass &&
                    (t.providersResolver && t.providersResolver(t),
                    oh(n, i, e, Ci(n, e, 1, null), t),
                    Jp(n, i));
                  const r = rr(e, n, i.directiveStart, i);
                  Oe(r, e);
                  const o = rt(i, e);
                  return o && Oe(o, e), r;
                })(r, t, e);
              if (((n[8] = t[8] = o), null !== i)) for (const a of i) a(o, e);
              if (e.contentQueries) {
                const a = Ie();
                e.contentQueries(1, o, a.directiveStart);
              }
              const s = Ie();
              return (
                !r.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (_n(s.index),
                  th(t[1], s, 0, s.directiveStart, s.directiveEnd, e),
                  nh(e, o)),
                o
              );
            })(v, this.componentDef, h, [MC])),
              zl(p, h, null);
          } finally {
            Na();
          }
          return new IC(this.componentType, g, _i(m, h), h, m);
        }
      }
      class IC extends class Kw {} {
        constructor(e, t, i, r, o) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = o),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new EC(r)),
            (this.componentType = e);
        }
        setInput(e, t) {
          const i = this._tNode.inputs;
          let r;
          if (null !== i && (r = i[e])) {
            const o = this._rootLView;
            Jl(o[1], o, r, e, t), eh(o, this._tNode.index);
          }
        }
        get injector() {
          return new li(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      function MC() {
        const n = Ie();
        mo(_()[1], n);
      }
      let Zo = null;
      function Un() {
        if (!Zo) {
          const n = oe.Symbol;
          if (n && n.iterator) Zo = n.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const i = e[t];
              "entries" !== i &&
                "size" !== i &&
                Map.prototype[i] === Map.prototype.entries &&
                (Zo = i);
            }
          }
        }
        return Zo;
      }
      function wr(n) {
        return (
          !!nc(n) && (Array.isArray(n) || (!(n instanceof Map) && Un() in n))
        );
      }
      function nc(n) {
        return null !== n && ("function" == typeof n || "object" == typeof n);
      }
      function zt(n, e, t) {
        return (n[e] = t);
      }
      function Fe(n, e, t) {
        return !Object.is(n[e], t) && ((n[e] = t), !0);
      }
      function Jo(n, e, t, i) {
        const r = _();
        return Fe(r, oi(), e) && (Q(), Ut(ue(), r, n, e, t, i)), Jo;
      }
      function Si(n, e, t, i) {
        return Fe(n, oi(), t) ? e + V(t) + i : B;
      }
      function de(n, e, t, i, r, o, s, a) {
        const l = _(),
          c = Q(),
          u = n + 22,
          d = c.firstCreatePass
            ? (function HC(n, e, t, i, r, o, s, a, l) {
                const c = e.consts,
                  u = bi(e, n, 4, s || null, vn(c, a));
                Kl(e, t, u, vn(c, l)), mo(e, u);
                const d = (u.tViews = ql(
                  2,
                  u,
                  i,
                  r,
                  o,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  c
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (d.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, e, t, i, r, o, s)
            : c.data[u];
        jt(d, !1);
        const f = l[$].createComment("");
        Oo(c, l, f, d),
          Oe(f, l),
          qo(l, (l[u] = sh(f, l, f, d))),
          po(d) && Wl(c, l, d),
          null != s && Gl(l, d, a);
      }
      function ee(n, e, t) {
        const i = _();
        return (
          Fe(i, oi(), e) &&
            (function lt(n, e, t, i, r, o, s, a) {
              const l = rt(e, t);
              let u,
                c = e.inputs;
              !a && null != c && (u = c[i])
                ? (Jl(n, t, u, i, r), fo(e) && eh(t, e.index))
                : 3 & e.type &&
                  ((i = (function rC(n) {
                    return "class" === n
                      ? "className"
                      : "for" === n
                      ? "htmlFor"
                      : "formaction" === n
                      ? "formAction"
                      : "innerHtml" === n
                      ? "innerHTML"
                      : "readonly" === n
                      ? "readOnly"
                      : "tabindex" === n
                      ? "tabIndex"
                      : n;
                  })(i)),
                  (r = null != s ? s(r, e.value || "", i) : r),
                  o.setProperty(l, i, r));
            })(Q(), ue(), i, n, e, i[$], t, !1),
          ee
        );
      }
      function ic(n, e, t, i, r) {
        const s = r ? "class" : "style";
        Jl(n, t, e.inputs[s], s, i);
      }
      function D(n, e, t, i) {
        const r = _(),
          o = Q(),
          s = 22 + n,
          a = r[$],
          l = (r[s] = rl(
            a,
            e,
            (function jD() {
              return R.lFrame.currentNamespace;
            })()
          )),
          c = o.firstCreatePass
            ? (function UC(n, e, t, i, r, o, s) {
                const a = e.consts,
                  c = bi(e, n, 2, r, vn(a, o));
                return (
                  Kl(e, t, c, vn(a, s)),
                  null !== c.attrs && Qo(c, c.attrs, !1),
                  null !== c.mergedAttrs && Qo(c, c.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(s, o, r, 0, e, t, i)
            : o.data[s];
        jt(c, !0);
        const u = c.mergedAttrs;
        null !== u && _o(a, l, u);
        const d = c.classes;
        null !== d && dl(a, l, d);
        const f = c.styles;
        return (
          null !== f && Gf(a, l, f),
          64 != (64 & c.flags) && Oo(o, r, l, c),
          0 ===
            (function ID() {
              return R.lFrame.elementDepthCount;
            })() && Oe(l, r),
          (function SD() {
            R.lFrame.elementDepthCount++;
          })(),
          po(c) && (Wl(o, r, c), Qp(o, c, r)),
          null !== i && Gl(r, c),
          D
        );
      }
      function E() {
        let n = Ie();
        Sa() ? Ta() : ((n = n.parent), jt(n, !1));
        const e = n;
        !(function TD() {
          R.lFrame.elementDepthCount--;
        })();
        const t = Q();
        return (
          t.firstCreatePass && (mo(t, n), _a(n) && t.queries.elementEnd(n)),
          null != e.classesWithoutHost &&
            (function GD(n) {
              return 0 != (16 & n.flags);
            })(e) &&
            ic(t, e, _(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function qD(n) {
              return 0 != (32 & n.flags);
            })(e) &&
            ic(t, e, _(), e.stylesWithoutHost, !1),
          E
        );
      }
      function j(n, e, t, i) {
        return D(n, e, t, i), E(), j;
      }
      function Cr(n, e, t) {
        const i = _(),
          r = Q(),
          o = n + 22,
          s = r.firstCreatePass
            ? (function zC(n, e, t, i, r) {
                const o = e.consts,
                  s = vn(o, i),
                  a = bi(e, n, 8, "ng-container", s);
                return (
                  null !== s && Qo(a, s, !0),
                  Kl(e, t, a, vn(o, r)),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                );
              })(o, r, i, e, t)
            : r.data[o];
        jt(s, !0);
        const a = (i[o] = i[$].createComment(""));
        return (
          Oo(r, i, a, s),
          Oe(a, i),
          po(s) && (Wl(r, i, s), Qp(r, s, i)),
          null != t && Gl(i, s),
          Cr
        );
      }
      function Ir() {
        let n = Ie();
        const e = Q();
        return (
          Sa() ? Ta() : ((n = n.parent), jt(n, !1)),
          e.firstCreatePass && (mo(e, n), _a(n) && e.queries.elementEnd(n)),
          Ir
        );
      }
      function es(n, e, t) {
        return Cr(n, e, t), Ir(), es;
      }
      function Sr() {
        return _();
      }
      function rc(n) {
        return !!n && "function" == typeof n.then;
      }
      const WC = function bh(n) {
        return !!n && "function" == typeof n.subscribe;
      };
      function Cn(n, e, t, i) {
        const r = _(),
          o = Q(),
          s = Ie();
        return (
          (function Ih(n, e, t, i, r, o, s, a) {
            const l = po(i),
              u = n.firstCreatePass && lh(n),
              d = e[8],
              f = ah(e);
            let p = !0;
            if (3 & i.type || a) {
              const m = rt(i, e),
                v = a ? a(m) : m,
                w = f.length,
                y = a ? (z) => a(De(z[i.index])) : i.index;
              let T = null;
              if (
                (!a &&
                  l &&
                  (T = (function GC(n, e, t, i) {
                    const r = n.cleanup;
                    if (null != r)
                      for (let o = 0; o < r.length - 1; o += 2) {
                        const s = r[o];
                        if (s === t && r[o + 1] === i) {
                          const a = e[7],
                            l = r[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(n, e, r, i.index)),
                null !== T)
              )
                ((T.__ngLastListenerFn__ || T).__ngNextListenerFn__ = o),
                  (T.__ngLastListenerFn__ = o),
                  (p = !1);
              else {
                o = Th(i, e, d, o, !1);
                const z = t.listen(v, r, o);
                f.push(o, z), u && u.push(r, y, w, w + 1);
              }
            } else o = Th(i, e, d, o, !1);
            const h = i.outputs;
            let g;
            if (p && null !== h && (g = h[r])) {
              const m = g.length;
              if (m)
                for (let v = 0; v < m; v += 2) {
                  const K = e[g[v]][g[v + 1]].subscribe(o),
                    pe = f.length;
                  f.push(o, K), u && u.push(r, i.index, pe, -(pe + 1));
                }
            }
          })(o, r, r[$], s, n, e, 0, i),
          Cn
        );
      }
      function Sh(n, e, t, i) {
        try {
          return !1 !== t(i);
        } catch (r) {
          return uh(n, r), !1;
        }
      }
      function Th(n, e, t, i, r) {
        return function o(s) {
          if (s === Function) return i;
          Zl(2 & n.flags ? ot(n.index, e) : e);
          let l = Sh(e, 0, i, s),
            c = o.__ngNextListenerFn__;
          for (; c; ) (l = Sh(e, 0, c, s) && l), (c = c.__ngNextListenerFn__);
          return r && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function Le(n = 1) {
        return (function LD(n) {
          return (R.lFrame.contextLView = (function RD(n, e) {
            for (; n > 0; ) (e = e[15]), n--;
            return e;
          })(n, R.lFrame.contextLView))[8];
        })(n);
      }
      function qC(n, e) {
        let t = null;
        const i = (function mb(n) {
          const e = n.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(n);
        for (let r = 0; r < e.length; r++) {
          const o = e[r];
          if ("*" !== o) {
            if (null === i ? bp(n, o, !0) : _b(i, o)) return r;
          } else t = r;
        }
        return t;
      }
      function oc(n) {
        const e = _()[16][6];
        if (!e.projection) {
          const i = (e.projection = ar(n ? n.length : 1, null)),
            r = i.slice();
          let o = e.child;
          for (; null !== o; ) {
            const s = n ? qC(o, n) : 0;
            null !== s &&
              (r[s] ? (r[s].projectionNext = o) : (i[s] = o), (r[s] = o)),
              (o = o.next);
          }
        }
      }
      function sc(n, e = 0, t) {
        const i = _(),
          r = Q(),
          o = bi(r, 22 + n, 16, null, t || null);
        null === o.projection && (o.projection = e),
          Ta(),
          64 != (64 & o.flags) &&
            (function lw(n, e, t) {
              Wf(e[$], 0, e, t, Rf(n, t, e), Hf(t.parent || e[6], t, e));
            })(r, i, o);
      }
      function kh(n, e, t, i, r) {
        const o = n[t + 1],
          s = null === e;
        let a = i ? xt(o) : on(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const u = n[a + 1];
          YC(n[a], e) && ((l = !0), (n[a + 1] = i ? Ll(u) : Ol(u))),
            (a = i ? xt(u) : on(u));
        }
        l && (n[t + 1] = i ? Ol(o) : Ll(o));
      }
      function YC(n, e) {
        return (
          null === n ||
          null == e ||
          (Array.isArray(n) ? n[1] : n) === e ||
          (!(!Array.isArray(n) || "string" != typeof e) && pi(n, e) >= 0)
        );
      }
      const Te = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Vh(n) {
        return n.substring(Te.key, Te.keyEnd);
      }
      function Bh(n, e) {
        const t = Te.textEnd;
        return t === e
          ? -1
          : ((e = Te.keyEnd =
              (function eI(n, e, t) {
                for (; e < t && n.charCodeAt(e) > 32; ) e++;
                return e;
              })(n, (Te.key = e), t)),
            Fi(n, e, t));
      }
      function Fi(n, e, t) {
        for (; e < t && n.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function lc(n) {
        Ot(at, Gt, n, !0);
      }
      function Gt(n, e) {
        for (
          let t = (function XC(n) {
            return (
              (function jh(n) {
                (Te.key = 0),
                  (Te.keyEnd = 0),
                  (Te.value = 0),
                  (Te.valueEnd = 0),
                  (Te.textEnd = n.length);
              })(n),
              Bh(n, Fi(n, 0, Te.textEnd))
            );
          })(e);
          t >= 0;
          t = Bh(e, t)
        )
          at(n, Vh(e), !0);
      }
      function Ot(n, e, t, i) {
        const r = Q(),
          o = (function Jt(n) {
            const e = R.lFrame,
              t = e.bindingIndex;
            return (e.bindingIndex = e.bindingIndex + n), t;
          })(2);
        r.firstUpdatePass &&
          (function qh(n, e, t, i) {
            const r = n.data;
            if (null === r[t + 1]) {
              const o = r[$e()],
                s = Gh(n, t);
              Zh(o, i) && null === e && !s && (e = !1),
                (e = (function rI(n, e, t, i) {
                  const r = (function Aa(n) {
                    const e = R.lFrame.currentDirectiveIndex;
                    return -1 === e ? null : n[e];
                  })(n);
                  let o = i ? e.residualClasses : e.residualStyles;
                  if (null === r)
                    0 === (i ? e.classBindings : e.styleBindings) &&
                      ((t = Tr((t = cc(null, n, e, t, i)), e.attrs, i)),
                      (o = null));
                  else {
                    const s = e.directiveStylingLast;
                    if (-1 === s || n[s] !== r)
                      if (((t = cc(r, n, e, t, i)), null === o)) {
                        let l = (function oI(n, e, t) {
                          const i = t ? e.classBindings : e.styleBindings;
                          if (0 !== on(i)) return n[xt(i)];
                        })(n, e, i);
                        void 0 !== l &&
                          Array.isArray(l) &&
                          ((l = cc(null, n, e, l[1], i)),
                          (l = Tr(l, e.attrs, i)),
                          (function sI(n, e, t, i) {
                            n[xt(t ? e.classBindings : e.styleBindings)] = i;
                          })(n, e, i, l));
                      } else
                        o = (function aI(n, e, t) {
                          let i;
                          const r = e.directiveEnd;
                          for (let o = 1 + e.directiveStylingLast; o < r; o++)
                            i = Tr(i, n[o].hostAttrs, t);
                          return Tr(i, e.attrs, t);
                        })(n, e, i);
                  }
                  return (
                    void 0 !== o &&
                      (i ? (e.residualClasses = o) : (e.residualStyles = o)),
                    t
                  );
                })(r, o, e, i)),
                (function KC(n, e, t, i, r, o) {
                  let s = o ? e.classBindings : e.styleBindings,
                    a = xt(s),
                    l = on(s);
                  n[i] = t;
                  let u,
                    c = !1;
                  if (Array.isArray(t)) {
                    const d = t;
                    (u = d[1]), (null === u || pi(d, u) > 0) && (c = !0);
                  } else u = t;
                  if (r)
                    if (0 !== l) {
                      const f = xt(n[a + 1]);
                      (n[i + 1] = $o(f, a)),
                        0 !== f && (n[f + 1] = Fl(n[f + 1], i)),
                        (n[a + 1] = (function $b(n, e) {
                          return (131071 & n) | (e << 17);
                        })(n[a + 1], i));
                    } else
                      (n[i + 1] = $o(a, 0)),
                        0 !== a && (n[a + 1] = Fl(n[a + 1], i)),
                        (a = i);
                  else
                    (n[i + 1] = $o(l, 0)),
                      0 === a ? (a = i) : (n[l + 1] = Fl(n[l + 1], i)),
                      (l = i);
                  c && (n[i + 1] = Ol(n[i + 1])),
                    kh(n, u, i, !0),
                    kh(n, u, i, !1),
                    (function QC(n, e, t, i, r) {
                      const o = r ? n.residualClasses : n.residualStyles;
                      null != o &&
                        "string" == typeof e &&
                        pi(o, e) >= 0 &&
                        (t[i + 1] = Ll(t[i + 1]));
                    })(e, u, n, i, o),
                    (s = $o(a, l)),
                    o ? (e.classBindings = s) : (e.styleBindings = s);
                })(r, o, e, t, s, i);
            }
          })(r, null, o, i);
        const s = _();
        if (t !== B && Fe(s, o, t)) {
          const a = r.data[$e()];
          if (Zh(a, i) && !Gh(r, o)) {
            let l = i ? a.classesWithoutHost : a.stylesWithoutHost;
            null !== l && (t = da(l, t || "")), ic(r, a, s, t, i);
          } else
            !(function cI(n, e, t, i, r, o, s, a) {
              r === B && (r = X);
              let l = 0,
                c = 0,
                u = 0 < r.length ? r[0] : null,
                d = 0 < o.length ? o[0] : null;
              for (; null !== u || null !== d; ) {
                const f = l < r.length ? r[l + 1] : void 0,
                  p = c < o.length ? o[c + 1] : void 0;
                let g,
                  h = null;
                u === d
                  ? ((l += 2), (c += 2), f !== p && ((h = d), (g = p)))
                  : null === d || (null !== u && u < d)
                  ? ((l += 2), (h = u))
                  : ((c += 2), (h = d), (g = p)),
                  null !== h && Qh(n, e, t, i, h, g, s, a),
                  (u = l < r.length ? r[l] : null),
                  (d = c < o.length ? o[c] : null);
              }
            })(
              r,
              a,
              s,
              s[$],
              s[o + 1],
              (s[o + 1] = (function lI(n, e, t) {
                if (null == t || "" === t) return X;
                const i = [],
                  r = (function En(n) {
                    return n instanceof
                      class Zf {
                        constructor(e) {
                          this.changingThisBreaksApplicationSecurity = e;
                        }
                        toString() {
                          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
                        }
                      }
                      ? n.changingThisBreaksApplicationSecurity
                      : n;
                  })(t);
                if (Array.isArray(r))
                  for (let o = 0; o < r.length; o++) n(i, r[o], !0);
                else if ("object" == typeof r)
                  for (const o in r) r.hasOwnProperty(o) && n(i, o, r[o]);
                else "string" == typeof r && e(i, r);
                return i;
              })(n, e, t)),
              i,
              o
            );
        }
      }
      function Gh(n, e) {
        return e >= n.expandoStartIndex;
      }
      function cc(n, e, t, i, r) {
        let o = null;
        const s = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < s && ((o = e[a]), (i = Tr(i, o.hostAttrs, r)), o !== n);

        )
          a++;
        return null !== n && (t.directiveStylingLast = a), i;
      }
      function Tr(n, e, t) {
        const i = t ? 1 : 2;
        let r = -1;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const s = e[o];
            "number" == typeof s
              ? (r = s)
              : r === i &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]),
                at(n, s, !!t || e[++o]));
          }
        return void 0 === n ? null : n;
      }
      function Qh(n, e, t, i, r, o, s, a) {
        if (!(3 & e.type)) return;
        const l = n.data,
          c = l[a + 1];
        ts(
          (function Bp(n) {
            return 1 == (1 & n);
          })(c)
            ? Yh(l, e, t, r, on(c), s)
            : void 0
        ) ||
          (ts(o) ||
            ((function Vp(n) {
              return 2 == (2 & n);
            })(c) &&
              (o = Yh(l, null, t, r, a, s))),
          (function uw(n, e, t, i, r) {
            if (e) r ? n.addClass(t, i) : n.removeClass(t, i);
            else {
              let o = -1 === i.indexOf("-") ? void 0 : Ye.DashCase;
              null == r
                ? n.removeStyle(t, i, o)
                : ("string" == typeof r &&
                    r.endsWith("!important") &&
                    ((r = r.slice(0, -10)), (o |= Ye.Important)),
                  n.setStyle(t, i, r, o));
            }
          })(i, s, ho($e(), t), r, o));
      }
      function Yh(n, e, t, i, r, o) {
        const s = null === e;
        let a;
        for (; r > 0; ) {
          const l = n[r],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let f = t[r + 1];
          f === B && (f = d ? X : void 0);
          let p = d ? $a(f, i) : u === i ? f : void 0;
          if ((c && !ts(p) && (p = $a(l, i)), ts(p) && ((a = p), s))) return a;
          const h = n[r + 1];
          r = s ? xt(h) : on(h);
        }
        if (null !== e) {
          let l = o ? e.residualClasses : e.residualStyles;
          null != l && (a = $a(l, i));
        }
        return a;
      }
      function ts(n) {
        return void 0 !== n;
      }
      function Zh(n, e) {
        return 0 != (n.flags & (e ? 16 : 32));
      }
      function b(n, e = "") {
        const t = _(),
          i = Q(),
          r = n + 22,
          o = i.firstCreatePass ? bi(i, r, 1, e, null) : i.data[r],
          s = (t[r] = (function il(n, e) {
            return n.createText(e);
          })(t[$], e));
        Oo(i, t, s, o), jt(o, !1);
      }
      function ns(n) {
        return uc("", n, ""), ns;
      }
      function uc(n, e, t) {
        const i = _(),
          r = Si(i, n, e, t);
        return (
          r !== B &&
            (function sn(n, e, t) {
              const i = ho(e, n);
              !(function Of(n, e, t) {
                n.setValue(e, t);
              })(n[$], i, t);
            })(i, $e(), r),
          uc
        );
      }
      const Ri = "en-US";
      let Dg = Ri;
      class ki {}
      class Gg extends ki {
        constructor(e, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ec(this));
          const i = (function nt(n, e) {
            const t = n[bd] || null;
            if (!t && !0 === e)
              throw new Error(
                `Type ${re(n)} does not have '\u0275mod' property.`
              );
            return t;
          })(e);
          (this._bootstrapComponents = (function rn(n) {
            return n instanceof Function ? n() : n;
          })(i.bootstrap)),
            (this._r3Injector = Pp(
              e,
              t,
              [
                { provide: ki, useValue: this },
                { provide: Ho, useValue: this.componentFactoryResolver },
              ],
              re(e),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(e));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class yc extends class AS {} {
        constructor(e) {
          super(), (this.moduleType = e);
        }
        create(e) {
          return new Gg(this.moduleType, e);
        }
      }
      function em(n, e, t, i) {
        return (function nm(n, e, t, i, r, o) {
          const s = e + t;
          return Fe(n, s, r)
            ? zt(n, s + 1, o ? i.call(o, r) : i(r))
            : Or(n, s + 1);
        })(_(), je(), n, e, t, i);
      }
      function tm(n, e, t, i, r) {
        return (function im(n, e, t, i, r, o, s) {
          const a = e + t;
          return (function zn(n, e, t, i) {
            const r = Fe(n, e, t);
            return Fe(n, e + 1, i) || r;
          })(n, a, r, o)
            ? zt(n, a + 2, s ? i.call(s, r, o) : i(r, o))
            : Or(n, a + 2);
        })(_(), je(), n, e, t, i, r);
      }
      function Or(n, e) {
        const t = n[e];
        return t === B ? void 0 : t;
      }
      function _c(n) {
        return (e) => {
          setTimeout(n, void 0, e);
        };
      }
      const _t = class r0 extends eo {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, t, i) {
          let r = e,
            o = t || (() => null),
            s = i;
          if (e && "object" == typeof e) {
            const l = e;
            (r = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = _c(o)), r && (r = _c(r)), s && (s = _c(s)));
          const a = super.subscribe({ next: r, error: o, complete: s });
          return e instanceof Ht && e.add(a), a;
        }
      };
      function o0() {
        return this._results[Un()]();
      }
      class Dc {
        constructor(e = !1) {
          (this._emitDistinctChangesOnly = e),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = Un(),
            i = Dc.prototype;
          i[t] || (i[t] = o0);
        }
        get changes() {
          return this._changes || (this._changes = new _t());
        }
        get(e) {
          return this._results[e];
        }
        map(e) {
          return this._results.map(e);
        }
        filter(e) {
          return this._results.filter(e);
        }
        find(e) {
          return this._results.find(e);
        }
        reduce(e, t) {
          return this._results.reduce(e, t);
        }
        forEach(e) {
          this._results.forEach(e);
        }
        some(e) {
          return this._results.some(e);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(e, t) {
          const i = this;
          i.dirty = !1;
          const r = st(e);
          (this._changesDetected = !(function rE(n, e, t) {
            if (n.length !== e.length) return !1;
            for (let i = 0; i < n.length; i++) {
              let r = n[i],
                o = e[i];
              if ((t && ((r = t(r)), (o = t(o))), o !== r)) return !1;
            }
            return !0;
          })(i._results, r, t)) &&
            ((i._results = r),
            (i.length = r.length),
            (i.last = r[this.length - 1]),
            (i.first = r[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let qt = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = l0), n;
      })();
      const s0 = qt,
        a0 = class extends s0 {
          constructor(e, t, i) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = t),
              (this.elementRef = i);
          }
          createEmbeddedView(e, t) {
            const i = this._declarationTContainer.tViews,
              r = Wo(
                this._declarationLView,
                i,
                e,
                16,
                null,
                i.declTNode,
                null,
                null,
                null,
                null,
                t || null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (r[19] = s.createEmbeddedView(i)),
              zl(i, r, e),
              new Dr(r)
            );
          }
        };
      function l0() {
        return as(Ie(), _());
      }
      function as(n, e) {
        return 4 & n.type ? new a0(e, n, _i(n, e)) : null;
      }
      let Ft = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = c0), n;
      })();
      function c0() {
        return cm(Ie(), _());
      }
      const u0 = Ft,
        am = class extends u0 {
          constructor(e, t, i) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = t),
              (this._hostLView = i);
          }
          get element() {
            return _i(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new li(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = wo(this._hostTNode, this._hostLView);
            if (Qd(e)) {
              const t = ai(e, this._hostLView),
                i = si(e);
              return new li(t[1].data[i + 8], t);
            }
            return new li(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const t = lm(this._lContainer);
            return (null !== t && t[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, t, i) {
            let r, o;
            "number" == typeof i
              ? (r = i)
              : null != i && ((r = i.index), (o = i.injector));
            const s = e.createEmbeddedView(t || {}, o);
            return this.insert(s, r), s;
          }
          createComponent(e, t, i, r, o) {
            const s =
              e &&
              !(function sr(n) {
                return "function" == typeof n;
              })(e);
            let a;
            if (s) a = t;
            else {
              const d = t || {};
              (a = d.index),
                (i = d.injector),
                (r = d.projectableNodes),
                (o = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? e : new Er(ne(e)),
              c = i || this.parentInjector;
            if (!o && null == l.ngModule) {
              const f = (s ? c : this.parentInjector).get(yi, null);
              f && (o = f);
            }
            const u = l.create(c, r, void 0, o);
            return this.insert(u.hostView, a), u;
          }
          insert(e, t) {
            const i = e._lView,
              r = i[1];
            if (
              (function CD(n) {
                return Mt(n[3]);
              })(i)
            ) {
              const u = this.indexOf(e);
              if (-1 !== u) this.detach(u);
              else {
                const d = i[3],
                  f = new am(d, d[6], d[3]);
                f.detach(f.indexOf(e));
              }
            }
            const o = this._adjustIndex(t),
              s = this._lContainer;
            !(function nw(n, e, t, i) {
              const r = 10 + i,
                o = t.length;
              i > 0 && (t[r - 1][4] = e),
                i < o - 10
                  ? ((e[4] = t[r]), af(t, 10 + i, e))
                  : (t.push(e), (e[4] = null)),
                (e[3] = t);
              const s = e[17];
              null !== s &&
                t !== s &&
                (function iw(n, e) {
                  const t = n[9];
                  e[16] !== e[3][3][16] && (n[2] = !0),
                    null === t ? (n[9] = [e]) : t.push(e);
                })(s, e);
              const a = e[19];
              null !== a && a.insertView(n), (e[2] |= 64);
            })(r, i, s, o);
            const a = ll(o, s),
              l = i[$],
              c = No(l, s[7]);
            return (
              null !== c &&
                (function JE(n, e, t, i, r, o) {
                  (i[0] = r), (i[6] = e), gr(n, i, t, 1, r, o);
                })(r, s[6], l, i, c, a),
              e.attachToViewContainerRef(),
              af(Ec(s), o, e),
              e
            );
          }
          move(e, t) {
            return this.insert(e, t);
          }
          indexOf(e) {
            const t = lm(this._lContainer);
            return null !== t ? t.indexOf(e) : -1;
          }
          remove(e) {
            const t = this._adjustIndex(e, -1),
              i = ol(this._lContainer, t);
            i && (Io(Ec(this._lContainer), t), Lf(i[1], i));
          }
          detach(e) {
            const t = this._adjustIndex(e, -1),
              i = ol(this._lContainer, t);
            return i && null != Io(Ec(this._lContainer), t) ? new Dr(i) : null;
          }
          _adjustIndex(e, t = 0) {
            return e ?? this.length + t;
          }
        };
      function lm(n) {
        return n[8];
      }
      function Ec(n) {
        return n[8] || (n[8] = []);
      }
      function cm(n, e) {
        let t;
        const i = e[n.index];
        if (Mt(i)) t = i;
        else {
          let r;
          if (8 & n.type) r = De(i);
          else {
            const o = e[$];
            r = o.createComment("");
            const s = rt(n, e);
            Bn(
              o,
              No(o, s),
              r,
              (function aw(n, e) {
                return n.nextSibling(e);
              })(o, s),
              !1
            );
          }
          (e[n.index] = t = sh(i, e, r, n)), qo(e, t);
        }
        return new am(t, n, e);
      }
      class wc {
        constructor(e) {
          (this.queryList = e), (this.matches = null);
        }
        clone() {
          return new wc(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class bc {
        constructor(e = []) {
          this.queries = e;
        }
        createEmbeddedView(e) {
          const t = e.queries;
          if (null !== t) {
            const i =
                null !== e.contentQueries ? e.contentQueries[0] : t.length,
              r = [];
            for (let o = 0; o < i; o++) {
              const s = t.getByIndex(o);
              r.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new bc(r);
          }
          return null;
        }
        insertView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        detachView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        dirtyQueriesWithMatches(e) {
          for (let t = 0; t < this.queries.length; t++)
            null !== hm(e, t).matches && this.queries[t].setDirty();
        }
      }
      class um {
        constructor(e, t, i = null) {
          (this.predicate = e), (this.flags = t), (this.read = i);
        }
      }
      class Cc {
        constructor(e = []) {
          this.queries = e;
        }
        elementStart(e, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].elementStart(e, t);
        }
        elementEnd(e) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(e);
        }
        embeddedTView(e) {
          let t = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== t ? t.length : 0,
              o = this.getByIndex(i).embeddedTView(e, r);
            o &&
              ((o.indexInDeclarationView = i),
              null !== t ? t.push(o) : (t = [o]));
          }
          return null !== t ? new Cc(t) : null;
        }
        template(e, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].template(e, t);
        }
        getByIndex(e) {
          return this.queries[e];
        }
        get length() {
          return this.queries.length;
        }
        track(e) {
          this.queries.push(e);
        }
      }
      class Ic {
        constructor(e, t = -1) {
          (this.metadata = e),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(e, t) {
          this.isApplyingToNode(t) && this.matchTNode(e, t);
        }
        elementEnd(e) {
          this._declarationNodeIndex === e.index &&
            (this._appliesToNextNode = !1);
        }
        template(e, t) {
          this.elementStart(e, t);
        }
        embeddedTView(e, t) {
          return this.isApplyingToNode(e)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-e.index, t),
              new Ic(this.metadata))
            : null;
        }
        isApplyingToNode(e) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let i = e.parent;
            for (; null !== i && 8 & i.type && i.index !== t; ) i = i.parent;
            return t === (null !== i ? i.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(e, t) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const o = i[r];
              this.matchTNodeWithReadOption(e, t, p0(t, o)),
                this.matchTNodeWithReadOption(e, t, Co(t, e, o, !1, !1));
            }
          else
            i === qt
              ? 4 & t.type && this.matchTNodeWithReadOption(e, t, -1)
              : this.matchTNodeWithReadOption(e, t, Co(t, e, i, !1, !1));
        }
        matchTNodeWithReadOption(e, t, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === nn || r === Ft || (r === qt && 4 & t.type))
                this.addMatch(t.index, -2);
              else {
                const o = Co(t, e, r, !1, !1);
                null !== o && this.addMatch(t.index, o);
              }
            else this.addMatch(t.index, i);
          }
        }
        addMatch(e, t) {
          null === this.matches
            ? (this.matches = [e, t])
            : this.matches.push(e, t);
        }
      }
      function p0(n, e) {
        const t = n.localNames;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) if (t[i] === e) return t[i + 1];
        return null;
      }
      function g0(n, e, t, i) {
        return -1 === t
          ? (function h0(n, e) {
              return 11 & n.type ? _i(n, e) : 4 & n.type ? as(n, e) : null;
            })(e, n)
          : -2 === t
          ? (function m0(n, e, t) {
              return t === nn
                ? _i(e, n)
                : t === qt
                ? as(e, n)
                : t === Ft
                ? cm(e, n)
                : void 0;
            })(n, e, i)
          : rr(n, n[1], t, e);
      }
      function dm(n, e, t, i) {
        const r = e[19].queries[i];
        if (null === r.matches) {
          const o = n.data,
            s = t.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : g0(e, o[c], s[l + 1], t.metadata.read));
          }
          r.matches = a;
        }
        return r.matches;
      }
      function Sc(n, e, t, i) {
        const r = n.queries.getByIndex(t),
          o = r.matches;
        if (null !== o) {
          const s = dm(n, e, r, t);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) i.push(s[a / 2]);
            else {
              const c = o[a + 1],
                u = e[-l];
              for (let d = 10; d < u.length; d++) {
                const f = u[d];
                f[17] === f[3] && Sc(f[1], f, c, i);
              }
              if (null !== u[9]) {
                const d = u[9];
                for (let f = 0; f < d.length; f++) {
                  const p = d[f];
                  Sc(p[1], p, c, i);
                }
              }
            }
          }
        }
        return i;
      }
      function an(n) {
        const e = _(),
          t = Q(),
          i = Bd();
        Pa(i + 1);
        const r = hm(t, i);
        if (
          n.dirty &&
          (function bD(n) {
            return 4 == (4 & n[2]);
          })(e) ===
            (2 == (2 & r.metadata.flags))
        ) {
          if (null === r.matches) n.reset([]);
          else {
            const o = r.crossesNgTemplate ? Sc(t, e, i, []) : dm(t, e, r, i);
            n.reset(o, Xw), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Gn(n, e, t) {
        const i = Q();
        i.firstCreatePass &&
          (pm(i, new um(n, e, t), -1),
          2 == (2 & e) && (i.staticViewQueries = !0)),
          fm(i, _(), e);
      }
      function Tc(n, e, t, i) {
        const r = Q();
        if (r.firstCreatePass) {
          const o = Ie();
          pm(r, new um(e, t, i), o.index),
            (function v0(n, e) {
              const t = n.contentQueries || (n.contentQueries = []);
              e !== (t.length ? t[t.length - 1] : -1) &&
                t.push(n.queries.length - 1, e);
            })(r, n),
            2 == (2 & t) && (r.staticContentQueries = !0);
        }
        fm(r, _(), t);
      }
      function ln() {
        return (function y0(n, e) {
          return n[19].queries[e].queryList;
        })(_(), Bd());
      }
      function fm(n, e, t) {
        const i = new Dc(4 == (4 & t));
        Zp(n, e, i, i.destroy),
          null === e[19] && (e[19] = new bc()),
          e[19].queries.push(new wc(i));
      }
      function pm(n, e, t) {
        null === n.queries && (n.queries = new Cc()),
          n.queries.track(new Ic(e, t));
      }
      function hm(n, e) {
        return n.queries.getByIndex(e);
      }
      function cs(...n) {}
      const Om = new W("Application Initializer");
      let us = (() => {
        class n {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = cs),
              (this.reject = cs),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((i, r) => {
                (this.resolve = i), (this.reject = r);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              i = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const o = this.appInits[r]();
                if (rc(o)) t.push(o);
                else if (WC(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({ complete: a, error: l });
                  });
                  t.push(s);
                }
              }
            Promise.all(t)
              .then(() => {
                i();
              })
              .catch((r) => {
                this.reject(r);
              }),
              0 === t.length && i(),
              (this.initialized = !0);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G(Om, 8));
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const Rr = new W("AppId", {
        providedIn: "root",
        factory: function Fm() {
          return `${Nc()}${Nc()}${Nc()}`;
        },
      });
      function Nc() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Lm = new W("Platform Initializer"),
        Rm = new W("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        B0 = new W("appBootstrapListener"),
        km = new W("AnimationModuleType"),
        cn = new W("LocaleId", {
          providedIn: "root",
          factory: () =>
            (function yE(n, e = L.Default) {
              return (
                "number" != typeof e &&
                  (e =
                    0 |
                    (e.optional && 8) |
                    (e.host && 1) |
                    (e.self && 2) |
                    (e.skipSelf && 4)),
                G(n, e)
              );
            })(cn, L.Optional | L.SkipSelf) ||
            (function H0() {
              return (typeof $localize < "u" && $localize.locale) || Ri;
            })(),
        }),
        W0 = (() => Promise.resolve(0))();
      function Oc(n) {
        typeof Zone > "u"
          ? W0.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", n);
      }
      class we {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new _t(!1)),
            (this.onMicrotaskEmpty = new _t(!1)),
            (this.onStable = new _t(!1)),
            (this.onError = new _t(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const r = this;
          if (
            ((r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const o = Zone.AsyncStackTaggingZoneSpec;
            r._inner = r._inner.fork(new o("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && t),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function G0() {
              let n = oe.requestAnimationFrame,
                e = oe.cancelAnimationFrame;
              if (typeof Zone < "u" && n && e) {
                const t = n[Zone.__symbol__("OriginalDelegate")];
                t && (n = t);
                const i = e[Zone.__symbol__("OriginalDelegate")];
                i && (e = i);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function Q0(n) {
              const e = () => {
                !(function K0(n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(oe, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (n.lastRequestAnimationFrameId = -1),
                                Lc(n),
                                (n.isCheckStableRunning = !0),
                                Fc(n),
                                (n.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke();
                      })),
                    Lc(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, i, r, o, s, a) => {
                  try {
                    return Hm(n), t.invokeTask(r, o, s, a);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      e(),
                      jm(n);
                  }
                },
                onInvoke: (t, i, r, o, s, a, l) => {
                  try {
                    return Hm(n), t.invoke(r, o, s, a, l);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && e(), jm(n);
                  }
                },
                onHasTask: (t, i, r, o) => {
                  t.hasTask(r, o),
                    i === r &&
                      ("microTask" == o.change
                        ? ((n._hasPendingMicrotasks = o.microTask),
                          Lc(n),
                          Fc(n))
                        : "macroTask" == o.change &&
                          (n.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (t, i, r, o) => (
                  t.handleError(r, o),
                  n.runOutsideAngular(() => n.onError.emit(o)),
                  !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!we.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (we.isInAngularZone()) throw new C(909, !1);
        }
        run(e, t, i) {
          return this._inner.run(e, t, i);
        }
        runTask(e, t, i, r) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + r, e, q0, cs, cs);
          try {
            return o.runTask(s, t, i);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(e, t, i) {
          return this._inner.runGuarded(e, t, i);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const q0 = {};
      function Fc(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null);
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null));
              } finally {
                n.isStable = !0;
              }
          }
      }
      function Lc(n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection ||
            n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        );
      }
      function Hm(n) {
        n._nesting++,
          n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
      }
      function jm(n) {
        n._nesting--, Fc(n);
      }
      class Y0 {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new _t()),
            (this.onMicrotaskEmpty = new _t()),
            (this.onStable = new _t()),
            (this.onError = new _t());
        }
        run(e, t, i) {
          return e.apply(t, i);
        }
        runGuarded(e, t, i) {
          return e.apply(t, i);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, t, i, r) {
          return e.apply(t, i);
        }
      }
      const $m = new W(""),
        ds = new W("");
      let Vc,
        Rc = (() => {
          class n {
            constructor(t, i, r) {
              (this._ngZone = t),
                (this.registry = i),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Vc ||
                  ((function Z0(n) {
                    Vc = n;
                  })(r),
                  r.addToWindow(i)),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      we.assertNotInAngularZone(),
                        Oc(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Oc(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (i) =>
                    !i.updateCb ||
                    !i.updateCb(t) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, i, r) {
              let o = -1;
              i &&
                i > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: r });
            }
            whenStable(t, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, i, r), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(t) {
              this.registry.registerApplication(t, this);
            }
            unregisterApplication(t) {
              this.registry.unregisterApplication(t);
            }
            findProviders(t, i, r) {
              return [];
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(G(we), G(kc), G(ds));
            }),
            (n.ɵprov = te({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        kc = (() => {
          class n {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(t, i) {
              this._applications.set(t, i);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, i = !0) {
              return Vc?.findTestabilityInTree(this, t, i) ?? null;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = te({
              token: n,
              factory: n.ɵfac,
              providedIn: "platform",
            })),
            n
          );
        })(),
        In = null;
      const Um = new W("AllowMultipleToken"),
        Bc = new W("PlatformDestroyListeners");
      function Wm(n, e, t = []) {
        const i = `Platform: ${e}`,
          r = new W(i);
        return (o = []) => {
          let s = Hc();
          if (!s || s.injector.get(Um, !1)) {
            const a = [...t, ...o, { provide: r, useValue: !0 }];
            n
              ? n(a)
              : (function eT(n) {
                  if (In && !In.get(Um, !1)) throw new C(400, !1);
                  In = n;
                  const e = n.get(qm);
                  (function zm(n) {
                    const e = n.get(Lm, null);
                    e && e.forEach((t) => t());
                  })(n);
                })(
                  (function Gm(n = [], e) {
                    return $n.create({
                      name: e,
                      providers: [
                        { provide: El, useValue: "platform" },
                        { provide: Bc, useValue: new Set([() => (In = null)]) },
                        ...n,
                      ],
                    });
                  })(a, i)
                );
          }
          return (function nT(n) {
            const e = Hc();
            if (!e) throw new C(401, !1);
            return e;
          })();
        };
      }
      function Hc() {
        return In?.get(qm) ?? null;
      }
      let qm = (() => {
        class n {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, i) {
            const r = (function Qm(n, e) {
                let t;
                return (
                  (t =
                    "noop" === n
                      ? new Y0()
                      : ("zone.js" === n ? void 0 : n) || new we(e)),
                  t
                );
              })(
                i?.ngZone,
                (function Km(n) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!n || !n.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!n || !n.ngZoneRunCoalescing) || !1,
                  };
                })(i)
              ),
              o = [{ provide: we, useValue: r }];
            return r.run(() => {
              const s = $n.create({
                  providers: o,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                a = t.create(s),
                l = a.injector.get(Di, null);
              if (!l) throw new C(402, !1);
              return (
                r.runOutsideAngular(() => {
                  const c = r.onError.subscribe({
                    next: (u) => {
                      l.handleError(u);
                    },
                  });
                  a.onDestroy(() => {
                    ps(this._modules, a), c.unsubscribe();
                  });
                }),
                (function Ym(n, e, t) {
                  try {
                    const i = t();
                    return rc(i)
                      ? i.catch((r) => {
                          throw (
                            (e.runOutsideAngular(() => n.handleError(r)), r)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (e.runOutsideAngular(() => n.handleError(i)), i);
                  }
                })(l, r, () => {
                  const c = a.injector.get(us);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        (function Eg(n) {
                          Je(n, "Expected localeId to be defined"),
                            "string" == typeof n &&
                              (Dg = n.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(cn, Ri) || Ri),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, i = []) {
            const r = Zm({}, i);
            return (function X0(n, e, t) {
              const i = new yc(t);
              return Promise.resolve(i);
            })(0, 0, t).then((o) => this.bootstrapModuleFactory(o, r));
          }
          _moduleDoBootstrap(t) {
            const i = t.injector.get(fs);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((r) => i.bootstrap(r));
            else {
              if (!t.instance.ngDoBootstrap) throw new C(403, !1);
              t.instance.ngDoBootstrap(i);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((i) => i.destroy()),
              this._destroyListeners.forEach((i) => i());
            const t = this._injector.get(Bc, null);
            t && (t.forEach((i) => i()), t.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G($n));
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac, providedIn: "platform" })),
          n
        );
      })();
      function Zm(n, e) {
        return Array.isArray(e) ? e.reduce(Zm, n) : { ...n, ...e };
      }
      let fs = (() => {
        class n {
          constructor(t, i, r) {
            (this._zone = t),
              (this._injector = i),
              (this._exceptionHandler = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const o = new Ge((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Ge((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    we.assertNotInAngularZone(),
                      Oc(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  we.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = q_(
              o,
              s.pipe(
                (function K_(n = {}) {
                  const {
                    connector: e = () => new eo(),
                    resetOnError: t = !0,
                    resetOnComplete: i = !0,
                    resetOnRefCountZero: r = !0,
                  } = n;
                  return (o) => {
                    let s,
                      a,
                      l,
                      c = 0,
                      u = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      p = () => {
                        f(), (s = l = void 0), (u = d = !1);
                      },
                      h = () => {
                        const g = s;
                        p(), g?.unsubscribe();
                      };
                    return Gi((g, m) => {
                      c++, !d && !u && f();
                      const v = (l = l ?? e());
                      m.add(() => {
                        c--, 0 === c && !d && !u && (a = ca(h, r));
                      }),
                        v.subscribe(m),
                        !s &&
                          c > 0 &&
                          ((s = new Wi({
                            next: (w) => v.next(w),
                            error: (w) => {
                              (d = !0), f(), (a = ca(p, t, w)), v.error(w);
                            },
                            complete: () => {
                              (u = !0), f(), (a = ca(p, i)), v.complete();
                            },
                          })),
                          On(g).subscribe(s));
                    })(o);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(t, i) {
            const r = t instanceof mp;
            if (!this._injector.get(us).done)
              throw (
                (!r &&
                  (function Ki(n) {
                    const e = ne(n) || Be(n) || He(n);
                    return null !== e && e.standalone;
                  })(t),
                new C(405, false))
              );
            let s;
            (s = r ? t : this._injector.get(Ho).resolveComponentFactory(t)),
              this.componentTypes.push(s.componentType);
            const a = (function J0(n) {
                return n.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(ki),
              c = s.create($n.NULL, [], i || s.selector, a),
              u = c.location.nativeElement,
              d = c.injector.get($m, null);
            return (
              d?.registerApplication(u),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  ps(this.components, c),
                  d?.unregisterApplication(u);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const i = t;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(t) {
            const i = t;
            ps(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(B0, [])
                .concat(this._bootstrapListeners)
                .forEach((r) => r(t));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((t) => t()),
                  this._views.slice().forEach((t) => t.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(t) {
            return (
              this._destroyListeners.push(t),
              () => ps(this._destroyListeners, t)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const t = this._injector;
            t.destroy && !t.destroyed && t.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G(we), G(yi), G(Di));
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function ps(n, e) {
        const t = n.indexOf(e);
        t > -1 && n.splice(t, 1);
      }
      let Jm = !0,
        jc = (() => {
          class n {}
          return (n.__NG_ELEMENT_ID__ = oT), n;
        })();
      function oT(n) {
        return (function sT(n, e, t) {
          if (fo(n) && !t) {
            const i = ot(n.index, e);
            return new Dr(i, i);
          }
          return 47 & n.type ? new Dr(e[16], e) : null;
        })(Ie(), _(), 16 == (16 & n));
      }
      class ry {
        constructor() {}
        supports(e) {
          return wr(e);
        }
        create(e) {
          return new fT(e);
        }
      }
      const dT = (n, e) => e;
      class fT {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || dT);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            i = this._removalsHead,
            r = 0,
            o = null;
          for (; t || i; ) {
            const s = !i || (t && t.currentIndex < sy(i, r, o)) ? t : i,
              a = sy(s, r, o),
              l = s.currentIndex;
            if (s === i) r--, (i = i._nextRemoved);
            else if (((t = t._next), null == s.previousIndex)) r++;
            else {
              o || (o = []);
              const c = a - r,
                u = l - r;
              if (c != u) {
                for (let f = 0; f < c; f++) {
                  const p = f < o.length ? o[f] : (o[f] = 0),
                    h = p + f;
                  u <= h && h < c && (o[f] = p + 1);
                }
                o[s.previousIndex] = u - c;
              }
            }
            a !== l && e(s, a, l);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !wr(e))) throw new C(900, !1);
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let r,
            o,
            s,
            t = this._itHead,
            i = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++)
              (o = e[a]),
                (s = this._trackByFn(a, o)),
                null !== t && Object.is(t.trackById, s)
                  ? (i && (t = this._verifyReinsertion(t, o, s, a)),
                    Object.is(t.item, o) || this._addIdentityChange(t, o))
                  : ((t = this._mismatch(t, o, s, a)), (i = !0)),
                (t = t._next);
          } else
            (r = 0),
              (function kC(n, e) {
                if (Array.isArray(n))
                  for (let t = 0; t < n.length; t++) e(n[t]);
                else {
                  const t = n[Un()]();
                  let i;
                  for (; !(i = t.next()).done; ) e(i.value);
                }
              })(e, (a) => {
                (s = this._trackByFn(r, a)),
                  null !== t && Object.is(t.trackById, s)
                    ? (i && (t = this._verifyReinsertion(t, a, s, r)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, s, r)), (i = !0)),
                  (t = t._next),
                  r++;
              }),
              (this.length = r);
          return this._truncate(t), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, i, r) {
          let o;
          return (
            null === e ? (o = this._itTail) : ((o = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(i, null))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, o, r))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(i, r))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, o, r))
              : (e = this._addAfter(new pT(t, i), o, r)),
            e
          );
        }
        _verifyReinsertion(e, t, i, r) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(i, null);
          return (
            null !== o
              ? (e = this._reinsertAfter(o, e._prev, r))
              : e.currentIndex != r &&
                ((e.currentIndex = r), this._addToMoves(e, r)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, t, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const r = e._prevRemoved,
            o = e._nextRemoved;
          return (
            null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
            null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
            this._insertAfter(e, t, i),
            this._addToMoves(e, i),
            e
          );
        }
        _moveAfter(e, t, i) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, i),
            this._addToMoves(e, i),
            e
          );
        }
        _addAfter(e, t, i) {
          return (
            this._insertAfter(e, t, i),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, i) {
          const r = null === t ? this._itHead : t._next;
          return (
            (e._next = r),
            (e._prev = t),
            null === r ? (this._itTail = e) : (r._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new oy()),
            this._linkedRecords.put(e),
            (e.currentIndex = i),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            i = e._next;
          return (
            null === t ? (this._itHead = i) : (t._next = i),
            null === i ? (this._itTail = t) : (i._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return (
            e.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new oy()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class pT {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class hT {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if (
              (null === t || t <= i.currentIndex) &&
              Object.is(i.trackById, e)
            )
              return i;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            i = e._nextDup;
          return (
            null === t ? (this._head = i) : (t._nextDup = i),
            null === i ? (this._tail = t) : (i._prevDup = t),
            null === this._head
          );
        }
      }
      class oy {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let i = this.map.get(t);
          i || ((i = new hT()), this.map.set(t, i)), i.add(e);
        }
        get(e, t) {
          const r = this.map.get(e);
          return r ? r.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function sy(n, e, t) {
        const i = n.previousIndex;
        if (null === i) return i;
        let r = 0;
        return t && i < t.length && (r = t[i]), i + e + r;
      }
      class ay {
        constructor() {}
        supports(e) {
          return e instanceof Map || nc(e);
        }
        create() {
          return new gT();
        }
      }
      class gT {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || nc(e))) throw new C(900, !1);
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (i, r) => {
              if (t && t.key === r)
                this._maybeAddToChanges(t, i),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const o = this._getOrCreateRecordForKey(r, i);
                t = this._insertBeforeOrAppend(t, o);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let i = t; null !== i; i = i._nextRemoved)
              i === this._mapHead && (this._mapHead = null),
                this._records.delete(i.key),
                (i._nextRemoved = i._next),
                (i.previousValue = i.currentValue),
                (i.currentValue = null),
                (i._prev = null),
                (i._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const i = e._prev;
            return (
              (t._next = e),
              (t._prev = i),
              (e._prev = t),
              i && (i._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const r = this._records.get(e);
            this._maybeAddToChanges(r, t);
            const o = r._prev,
              s = r._next;
            return (
              o && (o._next = s),
              s && (s._prev = o),
              (r._next = null),
              (r._prev = null),
              r
            );
          }
          const i = new mT(e);
          return (
            this._records.set(e, i),
            (i.currentValue = t),
            this._addToAdditions(i),
            i
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Object.is(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach((i) => t(e[i], i));
        }
      }
      class mT {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function ly() {
        return new ms([new ry()]);
      }
      let ms = (() => {
        class n {
          constructor(t) {
            this.factories = t;
          }
          static create(t, i) {
            if (null != i) {
              const r = i.factories.slice();
              t = t.concat(r);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (i) => n.create(t, i || ly()),
              deps: [[n, new Ao(), new Mo()]],
            };
          }
          find(t) {
            const i = this.factories.find((r) => r.supports(t));
            if (null != i) return i;
            throw new C(901, !1);
          }
        }
        return (n.ɵprov = te({ token: n, providedIn: "root", factory: ly })), n;
      })();
      function cy() {
        return new kr([new ay()]);
      }
      let kr = (() => {
        class n {
          constructor(t) {
            this.factories = t;
          }
          static create(t, i) {
            if (i) {
              const r = i.factories.slice();
              t = t.concat(r);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (i) => n.create(t, i || cy()),
              deps: [[n, new Ao(), new Mo()]],
            };
          }
          find(t) {
            const i = this.factories.find((r) => r.supports(t));
            if (i) return i;
            throw new C(901, !1);
          }
        }
        return (n.ɵprov = te({ token: n, providedIn: "root", factory: cy })), n;
      })();
      const _T = Wm(null, "core", []);
      let DT = (() => {
          class n {
            constructor(t) {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(G(fs));
            }),
            (n.ɵmod = tt({ type: n })),
            (n.ɵinj = qe({})),
            n
          );
        })(),
        ys = null;
      function Vr() {
        return ys;
      }
      const Rt = new W("DocumentToken");
      let _y = (() => {
        class n {
          constructor(t, i, r, o) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = i),
              (this._ngEl = r),
              (this._renderer = o),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                "string" == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                (wr(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass);
              t && this._applyIterableChanges(t);
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass);
              t && this._applyKeyValueChanges(t);
            }
          }
          _applyKeyValueChanges(t) {
            t.forEachAddedItem((i) => this._toggleClass(i.key, i.currentValue)),
              t.forEachChangedItem((i) =>
                this._toggleClass(i.key, i.currentValue)
              ),
              t.forEachRemovedItem((i) => {
                i.previousValue && this._toggleClass(i.key, !1);
              });
          }
          _applyIterableChanges(t) {
            t.forEachAddedItem((i) => {
              if ("string" != typeof i.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${re(
                    i.item
                  )}`
                );
              this._toggleClass(i.item, !0);
            }),
              t.forEachRemovedItem((i) => this._toggleClass(i.item, !1));
          }
          _applyClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((i) => this._toggleClass(i, !0))
                : Object.keys(t).forEach((i) => this._toggleClass(i, !!t[i])));
          }
          _removeClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((i) => this._toggleClass(i, !1))
                : Object.keys(t).forEach((i) => this._toggleClass(i, !1)));
          }
          _toggleClass(t, i) {
            (t = t.trim()) &&
              t.split(/\s+/g).forEach((r) => {
                i
                  ? this._renderer.addClass(this._ngEl.nativeElement, r)
                  : this._renderer.removeClass(this._ngEl.nativeElement, r);
              });
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(x(ms), x(kr), x(nn), x(vp));
          }),
          (n.ɵdir = Ve({
            type: n,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          })),
          n
        );
      })();
      class uM {
        constructor(e, t, i, r) {
          (this.$implicit = e),
            (this.ngForOf = t),
            (this.index = i),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let tu = (() => {
        class n {
          constructor(t, i, r) {
            (this._viewContainer = t),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              !this._differ &&
                t &&
                (this._differ = this._differs
                  .find(t)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const i = this._viewContainer;
            t.forEachOperation((r, o, s) => {
              if (null == r.previousIndex)
                i.createEmbeddedView(
                  this._template,
                  new uM(r.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) i.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = i.get(o);
                i.move(a, s), wy(a, r);
              }
            });
            for (let r = 0, o = i.length; r < o; r++) {
              const a = i.get(r).context;
              (a.index = r), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((r) => {
              wy(i.get(r.currentIndex), r);
            });
          }
          static ngTemplateContextGuard(t, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(x(Ft), x(qt), x(ms));
          }),
          (n.ɵdir = Ve({
            type: n,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          n
        );
      })();
      function wy(n, e) {
        n.context.$implicit = e.item;
      }
      let Ts = (() => {
        class n {
          constructor(t, i) {
            (this._viewContainer = t),
              (this._context = new fM()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = i);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            by("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            by("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(x(Ft), x(qt));
          }),
          (n.ɵdir = Ve({
            type: n,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          n
        );
      })();
      class fM {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function by(n, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${n} must be a TemplateRef, but received '${re(e)}'.`
          );
      }
      let Iy = (() => {
          class n {
            constructor(t, i, r) {
              (this._ngEl = t),
                (this._differs = i),
                (this._renderer = r),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(t) {
              (this._ngStyle = t),
                !this._differ &&
                  t &&
                  (this._differ = this._differs.find(t).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const t = this._differ.diff(this._ngStyle);
                t && this._applyChanges(t);
              }
            }
            _setStyle(t, i) {
              const [r, o] = t.split("."),
                s = -1 === r.indexOf("-") ? void 0 : Ye.DashCase;
              null != i
                ? this._renderer.setStyle(
                    this._ngEl.nativeElement,
                    r,
                    o ? `${i}${o}` : i,
                    s
                  )
                : this._renderer.removeStyle(this._ngEl.nativeElement, r, s);
            }
            _applyChanges(t) {
              t.forEachRemovedItem((i) => this._setStyle(i.key, null)),
                t.forEachAddedItem((i) =>
                  this._setStyle(i.key, i.currentValue)
                ),
                t.forEachChangedItem((i) =>
                  this._setStyle(i.key, i.currentValue)
                );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(x(nn), x(kr), x(vp));
            }),
            (n.ɵdir = Ve({
              type: n,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
              standalone: !0,
            })),
            n
          );
        })(),
        ru = (() => {
          class n {
            constructor(t) {
              (this._viewContainerRef = t),
                (this._viewRef = null),
                (this.ngTemplateOutletContext = null),
                (this.ngTemplateOutlet = null),
                (this.ngTemplateOutletInjector = null);
            }
            ngOnChanges(t) {
              if (t.ngTemplateOutlet || t.ngTemplateOutletInjector) {
                const i = this._viewContainerRef;
                if (
                  (this._viewRef && i.remove(i.indexOf(this._viewRef)),
                  this.ngTemplateOutlet)
                ) {
                  const {
                    ngTemplateOutlet: r,
                    ngTemplateOutletContext: o,
                    ngTemplateOutletInjector: s,
                  } = this;
                  this._viewRef = i.createEmbeddedView(
                    r,
                    o,
                    s ? { injector: s } : void 0
                  );
                } else this._viewRef = null;
              } else
                this._viewRef &&
                  t.ngTemplateOutletContext &&
                  this.ngTemplateOutletContext &&
                  (this._viewRef.context = this.ngTemplateOutletContext);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(x(Ft));
            }),
            (n.ɵdir = Ve({
              type: n,
              selectors: [["", "ngTemplateOutlet", ""]],
              inputs: {
                ngTemplateOutletContext: "ngTemplateOutletContext",
                ngTemplateOutlet: "ngTemplateOutlet",
                ngTemplateOutletInjector: "ngTemplateOutletInjector",
              },
              standalone: !0,
              features: [Ji],
            })),
            n
          );
        })(),
        Sn = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = tt({ type: n })),
            (n.ɵinj = qe({})),
            n
          );
        })();
      class cu extends class hA extends class bT {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function wT(n) {
            ys || (ys = n);
          })(new cu());
        }
        onAndCancel(e, t, i) {
          return (
            e.addEventListener(t, i, !1),
            () => {
              e.removeEventListener(t, i, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const t = (function gA() {
            return (
              ($r = $r || document.querySelector("base")),
              $r ? $r.getAttribute("href") : null
            );
          })();
          return null == t
            ? null
            : (function mA(n) {
                (Ps = Ps || document.createElement("a")),
                  Ps.setAttribute("href", n);
                const e = Ps.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(t);
        }
        resetBaseElement() {
          $r = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return (function lM(n, e) {
            e = encodeURIComponent(e);
            for (const t of n.split(";")) {
              const i = t.indexOf("="),
                [r, o] = -1 == i ? [t, ""] : [t.slice(0, i), t.slice(i + 1)];
              if (r.trim() === e) return decodeURIComponent(o);
            }
            return null;
          })(document.cookie, e);
        }
      }
      let Ps,
        $r = null;
      const Oy = new W("TRANSITION_ID"),
        vA = [
          {
            provide: Om,
            useFactory: function yA(n, e, t) {
              return () => {
                t.get(us).donePromise.then(() => {
                  const i = Vr(),
                    r = e.querySelectorAll(`style[ng-transition="${n}"]`);
                  for (let o = 0; o < r.length; o++) i.remove(r[o]);
                });
              };
            },
            deps: [Oy, Rt, $n],
            multi: !0,
          },
        ];
      let DA = (() => {
        class n {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const xs = new W("EventManagerPlugins");
      let Ns = (() => {
        class n {
          constructor(t, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              t.forEach((r) => (r.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, i, r) {
            return this._findPluginFor(i).addEventListener(t, i, r);
          }
          addGlobalEventListener(t, i, r) {
            return this._findPluginFor(i).addGlobalEventListener(t, i, r);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const i = this._eventNameToPlugin.get(t);
            if (i) return i;
            const r = this._plugins;
            for (let o = 0; o < r.length; o++) {
              const s = r[o];
              if (s.supports(t)) return this._eventNameToPlugin.set(t, s), s;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G(xs), G(we));
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Fy {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, i) {
          const r = Vr().getGlobalEventTarget(this._doc, e);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${t}`);
          return this.addEventListener(r, t, i);
        }
      }
      let Ly = (() => {
          class n {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const i = new Set();
              t.forEach((r) => {
                this._stylesSet.has(r) || (this._stylesSet.add(r), i.add(r));
              }),
                this.onStylesAdded(i);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = te({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Ur = (() => {
          class n extends Ly {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Map()),
                this._hostNodes.set(t.head, []);
            }
            _addStylesToHost(t, i, r) {
              t.forEach((o) => {
                const s = this._doc.createElement("style");
                (s.textContent = o), r.push(i.appendChild(s));
              });
            }
            addHost(t) {
              const i = [];
              this._addStylesToHost(this._stylesSet, t, i),
                this._hostNodes.set(t, i);
            }
            removeHost(t) {
              const i = this._hostNodes.get(t);
              i && i.forEach(Ry), this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((i, r) => {
                this._addStylesToHost(t, r, i);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((t) => t.forEach(Ry));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(G(Rt));
            }),
            (n.ɵprov = te({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      function Ry(n) {
        Vr().remove(n);
      }
      const uu = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        du = /%COMP%/g;
      function Os(n, e, t) {
        for (let i = 0; i < e.length; i++) {
          let r = e[i];
          Array.isArray(r) ? Os(n, r, t) : ((r = r.replace(du, n)), t.push(r));
        }
        return t;
      }
      function By(n) {
        return (e) => {
          if ("__ngUnwrap__" === e) return n;
          !1 === n(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Fs = (() => {
        class n {
          constructor(t, i, r) {
            (this.eventManager = t),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new fu(t));
          }
          createRenderer(t, i) {
            if (!t || !i) return this.defaultRenderer;
            switch (i.encapsulation) {
              case St.Emulated: {
                let r = this.rendererByCompId.get(i.id);
                return (
                  r ||
                    ((r = new SA(
                      this.eventManager,
                      this.sharedStylesHost,
                      i,
                      this.appId
                    )),
                    this.rendererByCompId.set(i.id, r)),
                  r.applyToHost(t),
                  r
                );
              }
              case 1:
              case St.ShadowDom:
                return new TA(this.eventManager, this.sharedStylesHost, t, i);
              default:
                if (!this.rendererByCompId.has(i.id)) {
                  const r = Os(i.id, i.styles, []);
                  this.sharedStylesHost.addStyles(r),
                    this.rendererByCompId.set(i.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G(Ns), G(Ur), G(Rr));
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class fu {
        constructor(e) {
          (this.eventManager = e),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(uu[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          (jy(e) ? e.content : e).appendChild(t);
        }
        insertBefore(e, t, i) {
          e && (jy(e) ? e.content : e).insertBefore(t, i);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let i = "string" == typeof e ? document.querySelector(e) : e;
          if (!i)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (i.textContent = ""), i;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, i, r) {
          if (r) {
            t = r + ":" + t;
            const o = uu[r];
            o ? e.setAttributeNS(o, t, i) : e.setAttribute(t, i);
          } else e.setAttribute(t, i);
        }
        removeAttribute(e, t, i) {
          if (i) {
            const r = uu[i];
            r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${i}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, i, r) {
          r & (Ye.DashCase | Ye.Important)
            ? e.style.setProperty(t, i, r & Ye.Important ? "important" : "")
            : (e.style[t] = i);
        }
        removeStyle(e, t, i) {
          i & Ye.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, i) {
          e[t] = i;
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, i) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, t, By(i))
            : this.eventManager.addEventListener(e, t, By(i));
        }
      }
      function jy(n) {
        return "TEMPLATE" === n.tagName && void 0 !== n.content;
      }
      class SA extends fu {
        constructor(e, t, i, r) {
          super(e), (this.component = i);
          const o = Os(r + "-" + i.id, i.styles, []);
          t.addStyles(o),
            (this.contentAttr = (function bA(n) {
              return "_ngcontent-%COMP%".replace(du, n);
            })(r + "-" + i.id)),
            (this.hostAttr = (function CA(n) {
              return "_nghost-%COMP%".replace(du, n);
            })(r + "-" + i.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const i = super.createElement(e, t);
          return super.setAttribute(i, this.contentAttr, ""), i;
        }
      }
      class TA extends fu {
        constructor(e, t, i, r) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = Os(r.id, r.styles, []);
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement("style");
            (a.textContent = o[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, i) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, i);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let MA = (() => {
        class n extends Fy {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, i, r) {
            return (
              t.addEventListener(i, r, !1),
              () => this.removeEventListener(t, i, r)
            );
          }
          removeEventListener(t, i, r) {
            return t.removeEventListener(i, r);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G(Rt));
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const $y = ["alt", "control", "meta", "shift"],
        AA = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        PA = {
          alt: (n) => n.altKey,
          control: (n) => n.ctrlKey,
          meta: (n) => n.metaKey,
          shift: (n) => n.shiftKey,
        };
      let xA = (() => {
        class n extends Fy {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != n.parseEventName(t);
          }
          addEventListener(t, i, r) {
            const o = n.parseEventName(i),
              s = n.eventCallback(o.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Vr().onAndCancel(t, o.domEventName, s));
          }
          static parseEventName(t) {
            const i = t.toLowerCase().split("."),
              r = i.shift();
            if (0 === i.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const o = n._normalizeKey(i.pop());
            let s = "",
              a = i.indexOf("code");
            if (
              (a > -1 && (i.splice(a, 1), (s = "code.")),
              $y.forEach((c) => {
                const u = i.indexOf(c);
                u > -1 && (i.splice(u, 1), (s += c + "."));
              }),
              (s += o),
              0 != i.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = r), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(t, i) {
            let r = AA[t.key] || t.key,
              o = "";
            return (
              i.indexOf("code.") > -1 && ((r = t.code), (o = "code.")),
              !(null == r || !r) &&
                ((r = r.toLowerCase()),
                " " === r ? (r = "space") : "." === r && (r = "dot"),
                $y.forEach((s) => {
                  s !== r && (0, PA[s])(t) && (o += s + ".");
                }),
                (o += r),
                o === i)
            );
          }
          static eventCallback(t, i, r) {
            return (o) => {
              n.matchEventFullKeyCode(o, t) && r.runGuarded(() => i(o));
            };
          }
          static _normalizeKey(t) {
            return "esc" === t ? "escape" : t;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G(Rt));
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const LA = Wm(_T, "browser", [
          { provide: Rm, useValue: "browser" },
          {
            provide: Lm,
            useValue: function NA() {
              cu.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Rt,
            useFactory: function FA() {
              return (
                (function hw(n) {
                  pl = n;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Wy = new W(""),
        Gy = [
          {
            provide: ds,
            useClass: class _A {
              addToWindow(e) {
                (oe.getAngularTestability = (i, r = !0) => {
                  const o = e.findTestabilityInTree(i, r);
                  if (null == o)
                    throw new Error("Could not find testability for element.");
                  return o;
                }),
                  (oe.getAllAngularTestabilities = () =>
                    e.getAllTestabilities()),
                  (oe.getAllAngularRootElements = () => e.getAllRootElements()),
                  oe.frameworkStabilizers || (oe.frameworkStabilizers = []),
                  oe.frameworkStabilizers.push((i) => {
                    const r = oe.getAllAngularTestabilities();
                    let o = r.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && i(s);
                    };
                    r.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(e, t, i) {
                return null == t
                  ? null
                  : e.getTestability(t) ??
                      (i
                        ? Vr().isShadowRoot(t)
                          ? this.findTestabilityInTree(e, t.host, !0)
                          : this.findTestabilityInTree(e, t.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: $m, useClass: Rc, deps: [we, kc, ds] },
          { provide: Rc, useClass: Rc, deps: [we, kc, ds] },
        ],
        qy = [
          { provide: El, useValue: "root" },
          {
            provide: Di,
            useFactory: function OA() {
              return new Di();
            },
            deps: [],
          },
          { provide: xs, useClass: MA, multi: !0, deps: [Rt, we, Rm] },
          { provide: xs, useClass: xA, multi: !0, deps: [Rt] },
          { provide: Fs, useClass: Fs, deps: [Ns, Ur, Rr] },
          { provide: _r, useExisting: Fs },
          { provide: Ly, useExisting: Ur },
          { provide: Ur, useClass: Ur, deps: [Rt] },
          { provide: Ns, useClass: Ns, deps: [xs, we] },
          { provide: class jM {}, useClass: DA, deps: [] },
          [],
        ];
      let Ky = (() => {
        class n {
          constructor(t) {}
          static withServerTransition(t) {
            return {
              ngModule: n,
              providers: [
                { provide: Rr, useValue: t.appId },
                { provide: Oy, useExisting: Rr },
                vA,
              ],
            };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G(Wy, 12));
          }),
          (n.ɵmod = tt({ type: n })),
          (n.ɵinj = qe({ providers: [...qy, ...Gy], imports: [Sn, DT] })),
          n
        );
      })();
      typeof window < "u" && window;
      let Re = (() => {
          class n {}
          return (
            (n.STARTS_WITH = "startsWith"),
            (n.CONTAINS = "contains"),
            (n.NOT_CONTAINS = "notContains"),
            (n.ENDS_WITH = "endsWith"),
            (n.EQUALS = "equals"),
            (n.NOT_EQUALS = "notEquals"),
            (n.IN = "in"),
            (n.LESS_THAN = "lt"),
            (n.LESS_THAN_OR_EQUAL_TO = "lte"),
            (n.GREATER_THAN = "gt"),
            (n.GREATER_THAN_OR_EQUAL_TO = "gte"),
            (n.BETWEEN = "between"),
            (n.IS = "is"),
            (n.IS_NOT = "isNot"),
            (n.BEFORE = "before"),
            (n.AFTER = "after"),
            (n.DATE_IS = "dateIs"),
            (n.DATE_IS_NOT = "dateIsNot"),
            (n.DATE_BEFORE = "dateBefore"),
            (n.DATE_AFTER = "dateAfter"),
            n
          );
        })(),
        Zy = (() => {
          class n {
            constructor() {
              (this.ripple = !1),
                (this.overlayOptions = {}),
                (this.filterMatchModeOptions = {
                  text: [
                    Re.STARTS_WITH,
                    Re.CONTAINS,
                    Re.NOT_CONTAINS,
                    Re.ENDS_WITH,
                    Re.EQUALS,
                    Re.NOT_EQUALS,
                  ],
                  numeric: [
                    Re.EQUALS,
                    Re.NOT_EQUALS,
                    Re.LESS_THAN,
                    Re.LESS_THAN_OR_EQUAL_TO,
                    Re.GREATER_THAN,
                    Re.GREATER_THAN_OR_EQUAL_TO,
                  ],
                  date: [
                    Re.DATE_IS,
                    Re.DATE_IS_NOT,
                    Re.DATE_BEFORE,
                    Re.DATE_AFTER,
                  ],
                }),
                (this.translation = {
                  startsWith: "Starts with",
                  contains: "Contains",
                  notContains: "Not contains",
                  endsWith: "Ends with",
                  equals: "Equals",
                  notEquals: "Not equals",
                  noFilter: "No Filter",
                  lt: "Less than",
                  lte: "Less than or equal to",
                  gt: "Greater than",
                  gte: "Greater than or equal to",
                  is: "Is",
                  isNot: "Is not",
                  before: "Before",
                  after: "After",
                  dateIs: "Date is",
                  dateIsNot: "Date is not",
                  dateBefore: "Date is before",
                  dateAfter: "Date is after",
                  clear: "Clear",
                  apply: "Apply",
                  matchAll: "Match All",
                  matchAny: "Match Any",
                  addRule: "Add Rule",
                  removeRule: "Remove Rule",
                  accept: "Yes",
                  reject: "No",
                  choose: "Choose",
                  upload: "Upload",
                  cancel: "Cancel",
                  dayNames: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  dayNamesShort: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ],
                  dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                  monthNames: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  monthNamesShort: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  dateFormat: "mm/dd/yy",
                  firstDayOfWeek: 0,
                  today: "Today",
                  weekHeader: "Wk",
                  weak: "Weak",
                  medium: "Medium",
                  strong: "Strong",
                  passwordPrompt: "Enter a password",
                  emptyMessage: "No results found",
                  emptyFilterMessage: "No results found",
                }),
                (this.zIndex = {
                  modal: 1100,
                  overlay: 1e3,
                  menu: 1e3,
                  tooltip: 1100,
                }),
                (this.translationSource = new eo()),
                (this.translationObserver =
                  this.translationSource.asObservable());
            }
            getTranslation(t) {
              return this.translation[t];
            }
            setTranslation(t) {
              (this.translation = { ...this.translation, ...t }),
                this.translationSource.next(this.translation);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = te({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Xy = (() => {
          class n {
            constructor(t) {
              this.template = t;
            }
            getType() {
              return this.name;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(x(qt));
            }),
            (n.ɵdir = Ve({
              type: n,
              selectors: [["", "pTemplate", ""]],
              inputs: { type: "type", name: ["pTemplate", "name"] },
            })),
            n
          );
        })(),
        gu = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = tt({ type: n })),
            (n.ɵinj = qe({ imports: [Sn] })),
            n
          );
        })(),
        k = (() => {
          class n {
            static addClass(t, i) {
              t &&
                i &&
                (t.classList ? t.classList.add(i) : (t.className += " " + i));
            }
            static addMultipleClasses(t, i) {
              if (t && i)
                if (t.classList) {
                  let r = i.trim().split(" ");
                  for (let o = 0; o < r.length; o++) t.classList.add(r[o]);
                } else {
                  let r = i.split(" ");
                  for (let o = 0; o < r.length; o++) t.className += " " + r[o];
                }
            }
            static removeClass(t, i) {
              t &&
                i &&
                (t.classList
                  ? t.classList.remove(i)
                  : (t.className = t.className.replace(
                      new RegExp(
                        "(^|\\b)" + i.split(" ").join("|") + "(\\b|$)",
                        "gi"
                      ),
                      " "
                    )));
            }
            static hasClass(t, i) {
              return (
                !(!t || !i) &&
                (t.classList
                  ? t.classList.contains(i)
                  : new RegExp("(^| )" + i + "( |$)", "gi").test(t.className))
              );
            }
            static siblings(t) {
              return Array.prototype.filter.call(
                t.parentNode.children,
                function (i) {
                  return i !== t;
                }
              );
            }
            static find(t, i) {
              return Array.from(t.querySelectorAll(i));
            }
            static findSingle(t, i) {
              return t ? t.querySelector(i) : null;
            }
            static index(t) {
              let i = t.parentNode.childNodes,
                r = 0;
              for (var o = 0; o < i.length; o++) {
                if (i[o] == t) return r;
                1 == i[o].nodeType && r++;
              }
              return -1;
            }
            static indexWithinGroup(t, i) {
              let r = t.parentNode ? t.parentNode.childNodes : [],
                o = 0;
              for (var s = 0; s < r.length; s++) {
                if (r[s] == t) return o;
                r[s].attributes &&
                  r[s].attributes[i] &&
                  1 == r[s].nodeType &&
                  o++;
              }
              return -1;
            }
            static appendOverlay(t, i, r = "self") {
              "self" !== r && t && i && this.appendChild(t, i);
            }
            static alignOverlay(t, i, r = "self", o = !0) {
              t &&
                i &&
                (o &&
                  (t.style.minWidth ||
                    (t.style.minWidth = n.getOuterWidth(i) + "px")),
                "self" === r
                  ? this.relativePosition(t, i)
                  : this.absolutePosition(t, i));
            }
            static relativePosition(t, i) {
              const r = (g) => {
                  if (g)
                    return "relative" ===
                      getComputedStyle(g).getPropertyValue("position")
                      ? g
                      : r(g.parentElement);
                },
                o = t.offsetParent
                  ? { width: t.offsetWidth, height: t.offsetHeight }
                  : this.getHiddenElementDimensions(t),
                s = i.offsetHeight,
                a = i.getBoundingClientRect(),
                l = this.getWindowScrollTop(),
                c = this.getWindowScrollLeft(),
                u = this.getViewport(),
                f = r(t)?.getBoundingClientRect() || {
                  top: -1 * l,
                  left: -1 * c,
                };
              let p, h;
              a.top + s + o.height > u.height
                ? ((p = a.top - f.top - o.height),
                  (t.style.transformOrigin = "bottom"),
                  a.top + p < 0 && (p = -1 * a.top))
                : ((p = s + a.top - f.top), (t.style.transformOrigin = "top")),
                (h =
                  o.width > u.width
                    ? -1 * (a.left - f.left)
                    : a.left - f.left + o.width > u.width
                    ? -1 * (a.left - f.left + o.width - u.width)
                    : a.left - f.left),
                (t.style.top = p + "px"),
                (t.style.left = h + "px");
            }
            static absolutePosition(t, i) {
              const r = t.offsetParent
                  ? { width: t.offsetWidth, height: t.offsetHeight }
                  : this.getHiddenElementDimensions(t),
                o = r.height,
                s = r.width,
                a = i.offsetHeight,
                l = i.offsetWidth,
                c = i.getBoundingClientRect(),
                u = this.getWindowScrollTop(),
                d = this.getWindowScrollLeft(),
                f = this.getViewport();
              let p, h;
              c.top + a + o > f.height
                ? ((p = c.top + u - o),
                  (t.style.transformOrigin = "bottom"),
                  p < 0 && (p = u))
                : ((p = a + c.top + u), (t.style.transformOrigin = "top")),
                (h =
                  c.left + s > f.width
                    ? Math.max(0, c.left + d + l - s)
                    : c.left + d),
                (t.style.top = p + "px"),
                (t.style.left = h + "px");
            }
            static getParents(t, i = []) {
              return null === t.parentNode
                ? i
                : this.getParents(t.parentNode, i.concat([t.parentNode]));
            }
            static getScrollableParents(t) {
              let i = [];
              if (t) {
                let r = this.getParents(t);
                const o = /(auto|scroll)/,
                  s = (a) => {
                    let l = window.getComputedStyle(a, null);
                    return (
                      o.test(l.getPropertyValue("overflow")) ||
                      o.test(l.getPropertyValue("overflowX")) ||
                      o.test(l.getPropertyValue("overflowY"))
                    );
                  };
                for (let a of r) {
                  let l = 1 === a.nodeType && a.dataset.scrollselectors;
                  if (l) {
                    let c = l.split(",");
                    for (let u of c) {
                      let d = this.findSingle(a, u);
                      d && s(d) && i.push(d);
                    }
                  }
                  9 !== a.nodeType && s(a) && i.push(a);
                }
              }
              return i;
            }
            static getHiddenElementOuterHeight(t) {
              (t.style.visibility = "hidden"), (t.style.display = "block");
              let i = t.offsetHeight;
              return (
                (t.style.display = "none"), (t.style.visibility = "visible"), i
              );
            }
            static getHiddenElementOuterWidth(t) {
              (t.style.visibility = "hidden"), (t.style.display = "block");
              let i = t.offsetWidth;
              return (
                (t.style.display = "none"), (t.style.visibility = "visible"), i
              );
            }
            static getHiddenElementDimensions(t) {
              let i = {};
              return (
                (t.style.visibility = "hidden"),
                (t.style.display = "block"),
                (i.width = t.offsetWidth),
                (i.height = t.offsetHeight),
                (t.style.display = "none"),
                (t.style.visibility = "visible"),
                i
              );
            }
            static scrollInView(t, i) {
              let r = getComputedStyle(t).getPropertyValue("borderTopWidth"),
                o = r ? parseFloat(r) : 0,
                s = getComputedStyle(t).getPropertyValue("paddingTop"),
                a = s ? parseFloat(s) : 0,
                l = t.getBoundingClientRect(),
                u =
                  i.getBoundingClientRect().top +
                  document.body.scrollTop -
                  (l.top + document.body.scrollTop) -
                  o -
                  a,
                d = t.scrollTop,
                f = t.clientHeight,
                p = this.getOuterHeight(i);
              u < 0
                ? (t.scrollTop = d + u)
                : u + p > f && (t.scrollTop = d + u - f + p);
            }
            static fadeIn(t, i) {
              t.style.opacity = 0;
              let r = +new Date(),
                o = 0,
                s = function () {
                  (o =
                    +t.style.opacity.replace(",", ".") +
                    (new Date().getTime() - r) / i),
                    (t.style.opacity = o),
                    (r = +new Date()),
                    +o < 1 &&
                      ((window.requestAnimationFrame &&
                        requestAnimationFrame(s)) ||
                        setTimeout(s, 16));
                };
              s();
            }
            static fadeOut(t, i) {
              var r = 1,
                a = 50 / i;
              let l = setInterval(() => {
                (r -= a) <= 0 && ((r = 0), clearInterval(l)),
                  (t.style.opacity = r);
              }, 50);
            }
            static getWindowScrollTop() {
              let t = document.documentElement;
              return (window.pageYOffset || t.scrollTop) - (t.clientTop || 0);
            }
            static getWindowScrollLeft() {
              let t = document.documentElement;
              return (window.pageXOffset || t.scrollLeft) - (t.clientLeft || 0);
            }
            static matches(t, i) {
              var r = Element.prototype;
              return (
                r.matches ||
                r.webkitMatchesSelector ||
                r.mozMatchesSelector ||
                r.msMatchesSelector ||
                function (s) {
                  return (
                    -1 !== [].indexOf.call(document.querySelectorAll(s), this)
                  );
                }
              ).call(t, i);
            }
            static getOuterWidth(t, i) {
              let r = t.offsetWidth;
              if (i) {
                let o = getComputedStyle(t);
                r += parseFloat(o.marginLeft) + parseFloat(o.marginRight);
              }
              return r;
            }
            static getHorizontalPadding(t) {
              let i = getComputedStyle(t);
              return parseFloat(i.paddingLeft) + parseFloat(i.paddingRight);
            }
            static getHorizontalMargin(t) {
              let i = getComputedStyle(t);
              return parseFloat(i.marginLeft) + parseFloat(i.marginRight);
            }
            static innerWidth(t) {
              let i = t.offsetWidth,
                r = getComputedStyle(t);
              return (
                (i += parseFloat(r.paddingLeft) + parseFloat(r.paddingRight)), i
              );
            }
            static width(t) {
              let i = t.offsetWidth,
                r = getComputedStyle(t);
              return (
                (i -= parseFloat(r.paddingLeft) + parseFloat(r.paddingRight)), i
              );
            }
            static getInnerHeight(t) {
              let i = t.offsetHeight,
                r = getComputedStyle(t);
              return (
                (i += parseFloat(r.paddingTop) + parseFloat(r.paddingBottom)), i
              );
            }
            static getOuterHeight(t, i) {
              let r = t.offsetHeight;
              if (i) {
                let o = getComputedStyle(t);
                r += parseFloat(o.marginTop) + parseFloat(o.marginBottom);
              }
              return r;
            }
            static getHeight(t) {
              let i = t.offsetHeight,
                r = getComputedStyle(t);
              return (
                (i -=
                  parseFloat(r.paddingTop) +
                  parseFloat(r.paddingBottom) +
                  parseFloat(r.borderTopWidth) +
                  parseFloat(r.borderBottomWidth)),
                i
              );
            }
            static getWidth(t) {
              let i = t.offsetWidth,
                r = getComputedStyle(t);
              return (
                (i -=
                  parseFloat(r.paddingLeft) +
                  parseFloat(r.paddingRight) +
                  parseFloat(r.borderLeftWidth) +
                  parseFloat(r.borderRightWidth)),
                i
              );
            }
            static getViewport() {
              let t = window,
                i = document,
                r = i.documentElement,
                o = i.getElementsByTagName("body")[0];
              return {
                width: t.innerWidth || r.clientWidth || o.clientWidth,
                height: t.innerHeight || r.clientHeight || o.clientHeight,
              };
            }
            static getOffset(t) {
              var i = t.getBoundingClientRect();
              return {
                top:
                  i.top +
                  (window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop ||
                    0),
                left:
                  i.left +
                  (window.pageXOffset ||
                    document.documentElement.scrollLeft ||
                    document.body.scrollLeft ||
                    0),
              };
            }
            static replaceElementWith(t, i) {
              let r = t.parentNode;
              if (!r) throw "Can't replace element";
              return r.replaceChild(i, t);
            }
            static getUserAgent() {
              return navigator.userAgent;
            }
            static isIE() {
              var t = window.navigator.userAgent;
              return (
                t.indexOf("MSIE ") > 0 ||
                (t.indexOf("Trident/") > 0
                  ? (t.indexOf("rv:"), !0)
                  : t.indexOf("Edge/") > 0)
              );
            }
            static isIOS() {
              return (
                /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
              );
            }
            static isAndroid() {
              return /(android)/i.test(navigator.userAgent);
            }
            static isTouchDevice() {
              return "ontouchstart" in window || navigator.maxTouchPoints > 0;
            }
            static appendChild(t, i) {
              if (this.isElement(i)) i.appendChild(t);
              else {
                if (!i.el || !i.el.nativeElement)
                  throw "Cannot append " + i + " to " + t;
                i.el.nativeElement.appendChild(t);
              }
            }
            static removeChild(t, i) {
              if (this.isElement(i)) i.removeChild(t);
              else {
                if (!i.el || !i.el.nativeElement)
                  throw "Cannot remove " + t + " from " + i;
                i.el.nativeElement.removeChild(t);
              }
            }
            static removeElement(t) {
              "remove" in Element.prototype
                ? t.remove()
                : t.parentNode.removeChild(t);
            }
            static isElement(t) {
              return "object" == typeof HTMLElement
                ? t instanceof HTMLElement
                : t &&
                    "object" == typeof t &&
                    null !== t &&
                    1 === t.nodeType &&
                    "string" == typeof t.nodeName;
            }
            static calculateScrollbarWidth(t) {
              if (t) {
                let i = getComputedStyle(t);
                return (
                  t.offsetWidth -
                  t.clientWidth -
                  parseFloat(i.borderLeftWidth) -
                  parseFloat(i.borderRightWidth)
                );
              }
              {
                if (null !== this.calculatedScrollbarWidth)
                  return this.calculatedScrollbarWidth;
                let i = document.createElement("div");
                (i.className = "p-scrollbar-measure"),
                  document.body.appendChild(i);
                let r = i.offsetWidth - i.clientWidth;
                return (
                  document.body.removeChild(i),
                  (this.calculatedScrollbarWidth = r),
                  r
                );
              }
            }
            static calculateScrollbarHeight() {
              if (null !== this.calculatedScrollbarHeight)
                return this.calculatedScrollbarHeight;
              let t = document.createElement("div");
              (t.className = "p-scrollbar-measure"),
                document.body.appendChild(t);
              let i = t.offsetHeight - t.clientHeight;
              return (
                document.body.removeChild(t),
                (this.calculatedScrollbarWidth = i),
                i
              );
            }
            static invokeElementMethod(t, i, r) {
              t[i].apply(t, r);
            }
            static clearSelection() {
              if (window.getSelection)
                window.getSelection().empty
                  ? window.getSelection().empty()
                  : window.getSelection().removeAllRanges &&
                    window.getSelection().rangeCount > 0 &&
                    window.getSelection().getRangeAt(0).getClientRects()
                      .length > 0 &&
                    window.getSelection().removeAllRanges();
              else if (document.selection && document.selection.empty)
                try {
                  document.selection.empty();
                } catch {}
            }
            static getBrowser() {
              if (!this.browser) {
                let t = this.resolveUserAgent();
                (this.browser = {}),
                  t.browser &&
                    ((this.browser[t.browser] = !0),
                    (this.browser.version = t.version)),
                  this.browser.chrome
                    ? (this.browser.webkit = !0)
                    : this.browser.webkit && (this.browser.safari = !0);
              }
              return this.browser;
            }
            static resolveUserAgent() {
              let t = navigator.userAgent.toLowerCase(),
                i =
                  /(chrome)[ \/]([\w.]+)/.exec(t) ||
                  /(webkit)[ \/]([\w.]+)/.exec(t) ||
                  /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) ||
                  /(msie) ([\w.]+)/.exec(t) ||
                  (t.indexOf("compatible") < 0 &&
                    /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)) ||
                  [];
              return { browser: i[1] || "", version: i[2] || "0" };
            }
            static isInteger(t) {
              return Number.isInteger
                ? Number.isInteger(t)
                : "number" == typeof t && isFinite(t) && Math.floor(t) === t;
            }
            static isHidden(t) {
              return !t || null === t.offsetParent;
            }
            static isVisible(t) {
              return t && null != t.offsetParent;
            }
            static isExist(t) {
              return null !== t && typeof t < "u" && t.nodeName && t.parentNode;
            }
            static focus(t, i) {
              t && document.activeElement !== t && t.focus(i);
            }
            static getFocusableElements(t) {
              let i = n.find(
                  t,
                  'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]):not(.p-disabled)'
                ),
                r = [];
              for (let o of i)
                "none" != getComputedStyle(o).display &&
                  "hidden" != getComputedStyle(o).visibility &&
                  r.push(o);
              return r;
            }
            static generateZIndex() {
              return (this.zindex = this.zindex || 999), ++this.zindex;
            }
            static getSelection() {
              return window.getSelection
                ? window.getSelection().toString()
                : document.getSelection
                ? document.getSelection().toString()
                : document.selection
                ? document.selection.createRange().text
                : null;
            }
            static getTargetElement(t, i) {
              if (!t) return null;
              switch (t) {
                case "document":
                  return document;
                case "window":
                  return window;
                case "@next":
                  return i?.nextElementSibling;
                case "@prev":
                  return i?.previousElementSibling;
                case "@parent":
                  return i?.parentElement;
                case "@grandparent":
                  return i?.parentElement.parentElement;
                default:
                  const r = typeof t;
                  if ("string" === r) return document.querySelector(t);
                  if ("object" === r && t.hasOwnProperty("nativeElement"))
                    return this.isExist(t.nativeElement)
                      ? t.nativeElement
                      : void 0;
                  const s =
                    (a = t) && a.constructor && a.call && a.apply ? t() : t;
                  return (s && 9 === s.nodeType) || this.isExist(s) ? s : null;
              }
              var a;
            }
          }
          return (
            (n.zindex = 1e3),
            (n.calculatedScrollbarWidth = null),
            (n.calculatedScrollbarHeight = null),
            n
          );
        })();
      class WA {
        constructor(e, t = () => {}) {
          (this.element = e), (this.listener = t);
        }
        bindScrollListener() {
          this.scrollableParents = k.getScrollableParents(this.element);
          for (let e = 0; e < this.scrollableParents.length; e++)
            this.scrollableParents[e].addEventListener("scroll", this.listener);
        }
        unbindScrollListener() {
          if (this.scrollableParents)
            for (let e = 0; e < this.scrollableParents.length; e++)
              this.scrollableParents[e].removeEventListener(
                "scroll",
                this.listener
              );
        }
        destroy() {
          this.unbindScrollListener(),
            (this.element = null),
            (this.listener = null),
            (this.scrollableParents = null);
        }
      }
      var mu = (function GA() {
        let n = [];
        const r = (o) => (o && parseInt(o.style.zIndex, 10)) || 0;
        return {
          get: r,
          set: (o, s, a) => {
            s &&
              (s.style.zIndex = String(
                ((o, s) => {
                  let a = n.length > 0 ? n[n.length - 1] : { key: o, value: s },
                    l = a.value + (a.key === o ? 0 : s) + 1;
                  return n.push({ key: o, value: l }), l;
                })(o, a)
              ));
          },
          clear: (o) => {
            o &&
              (((o) => {
                n = n.filter((s) => s.value !== o);
              })(r(o)),
              (o.style.zIndex = ""));
          },
          getCurrent: () => (n.length > 0 ? n[n.length - 1].value : 0),
        };
      })();
      let qA = (() => {
          class n {
            constructor(t, i, r) {
              (this.el = t),
                (this.zone = i),
                (this.config = r),
                (this.escape = !0),
                (this.fitContent = !0),
                (this._tooltipOptions = {
                  tooltipPosition: "right",
                  tooltipEvent: "hover",
                  appendTo: "body",
                  tooltipZIndex: "auto",
                  escape: !0,
                  positionTop: 0,
                  positionLeft: 0,
                });
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = t), this.deactivate();
            }
            ngAfterViewInit() {
              this.zone.runOutsideAngular(() => {
                if ("hover" === this.getOption("tooltipEvent"))
                  (this.mouseEnterListener = this.onMouseEnter.bind(this)),
                    (this.mouseLeaveListener = this.onMouseLeave.bind(this)),
                    (this.clickListener = this.onClick.bind(this)),
                    this.el.nativeElement.addEventListener(
                      "mouseenter",
                      this.mouseEnterListener
                    ),
                    this.el.nativeElement.addEventListener(
                      "mouseleave",
                      this.mouseLeaveListener
                    ),
                    this.el.nativeElement.addEventListener(
                      "click",
                      this.clickListener
                    );
                else if ("focus" === this.getOption("tooltipEvent")) {
                  (this.focusListener = this.onFocus.bind(this)),
                    (this.blurListener = this.onBlur.bind(this));
                  let t = this.getTarget(this.el.nativeElement);
                  t.addEventListener("focus", this.focusListener),
                    t.addEventListener("blur", this.blurListener);
                }
              });
            }
            ngOnChanges(t) {
              t.tooltipPosition &&
                this.setOption({
                  tooltipPosition: t.tooltipPosition.currentValue,
                }),
                t.tooltipEvent &&
                  this.setOption({ tooltipEvent: t.tooltipEvent.currentValue }),
                t.appendTo &&
                  this.setOption({ appendTo: t.appendTo.currentValue }),
                t.positionStyle &&
                  this.setOption({
                    positionStyle: t.positionStyle.currentValue,
                  }),
                t.tooltipStyleClass &&
                  this.setOption({
                    tooltipStyleClass: t.tooltipStyleClass.currentValue,
                  }),
                t.tooltipZIndex &&
                  this.setOption({
                    tooltipZIndex: t.tooltipZIndex.currentValue,
                  }),
                t.escape && this.setOption({ escape: t.escape.currentValue }),
                t.showDelay &&
                  this.setOption({ showDelay: t.showDelay.currentValue }),
                t.hideDelay &&
                  this.setOption({ hideDelay: t.hideDelay.currentValue }),
                t.life && this.setOption({ life: t.life.currentValue }),
                t.positionTop &&
                  this.setOption({ positionTop: t.positionTop.currentValue }),
                t.positionLeft &&
                  this.setOption({ positionLeft: t.positionLeft.currentValue }),
                t.disabled &&
                  this.setOption({ disabled: t.disabled.currentValue }),
                t.text &&
                  (this.setOption({ tooltipLabel: t.text.currentValue }),
                  this.active &&
                    (t.text.currentValue
                      ? this.container && this.container.offsetParent
                        ? (this.updateText(), this.align())
                        : this.show()
                      : this.hide())),
                t.tooltipOptions &&
                  ((this._tooltipOptions = {
                    ...this._tooltipOptions,
                    ...t.tooltipOptions.currentValue,
                  }),
                  this.deactivate(),
                  this.active &&
                    (this.getOption("tooltipLabel")
                      ? this.container && this.container.offsetParent
                        ? (this.updateText(), this.align())
                        : this.show()
                      : this.hide()));
            }
            onMouseEnter(t) {
              !this.container && !this.showTimeout && this.activate();
            }
            onMouseLeave(t) {
              this.deactivate();
            }
            onFocus(t) {
              this.activate();
            }
            onBlur(t) {
              this.deactivate();
            }
            onClick(t) {
              this.deactivate();
            }
            activate() {
              if (
                ((this.active = !0),
                this.clearHideTimeout(),
                this.getOption("showDelay")
                  ? (this.showTimeout = setTimeout(() => {
                      this.show();
                    }, this.getOption("showDelay")))
                  : this.show(),
                this.getOption("life"))
              ) {
                let t = this.getOption("showDelay")
                  ? this.getOption("life") + this.getOption("showDelay")
                  : this.getOption("life");
                this.hideTimeout = setTimeout(() => {
                  this.hide();
                }, t);
              }
            }
            deactivate() {
              (this.active = !1),
                this.clearShowTimeout(),
                this.getOption("hideDelay")
                  ? (this.clearHideTimeout(),
                    (this.hideTimeout = setTimeout(() => {
                      this.hide();
                    }, this.getOption("hideDelay"))))
                  : this.hide();
            }
            create() {
              this.container && (this.clearHideTimeout(), this.remove()),
                (this.container = document.createElement("div"));
              let t = document.createElement("div");
              (t.className = "p-tooltip-arrow"),
                this.container.appendChild(t),
                (this.tooltipText = document.createElement("div")),
                (this.tooltipText.className = "p-tooltip-text"),
                this.updateText(),
                this.getOption("positionStyle") &&
                  (this.container.style.position =
                    this.getOption("positionStyle")),
                this.container.appendChild(this.tooltipText),
                "body" === this.getOption("appendTo")
                  ? document.body.appendChild(this.container)
                  : "target" === this.getOption("appendTo")
                  ? k.appendChild(this.container, this.el.nativeElement)
                  : k.appendChild(this.container, this.getOption("appendTo")),
                (this.container.style.display = "inline-block"),
                this.fitContent && (this.container.style.width = "fit-content");
            }
            show() {
              !this.getOption("tooltipLabel") ||
                this.getOption("disabled") ||
                (this.create(),
                this.align(),
                k.fadeIn(this.container, 250),
                "auto" === this.getOption("tooltipZIndex")
                  ? mu.set(
                      "tooltip",
                      this.container,
                      this.config.zIndex.tooltip
                    )
                  : (this.container.style.zIndex =
                      this.getOption("tooltipZIndex")),
                this.bindDocumentResizeListener(),
                this.bindScrollListener());
            }
            hide() {
              "auto" === this.getOption("tooltipZIndex") &&
                mu.clear(this.container),
                this.remove();
            }
            updateText() {
              this.getOption("escape")
                ? ((this.tooltipText.innerHTML = ""),
                  this.tooltipText.appendChild(
                    document.createTextNode(this.getOption("tooltipLabel"))
                  ))
                : (this.tooltipText.innerHTML = this.getOption("tooltipLabel"));
            }
            align() {
              switch (this.getOption("tooltipPosition")) {
                case "top":
                  this.alignTop(),
                    this.isOutOfBounds() &&
                      (this.alignBottom(),
                      this.isOutOfBounds() &&
                        (this.alignRight(),
                        this.isOutOfBounds() && this.alignLeft()));
                  break;
                case "bottom":
                  this.alignBottom(),
                    this.isOutOfBounds() &&
                      (this.alignTop(),
                      this.isOutOfBounds() &&
                        (this.alignRight(),
                        this.isOutOfBounds() && this.alignLeft()));
                  break;
                case "left":
                  this.alignLeft(),
                    this.isOutOfBounds() &&
                      (this.alignRight(),
                      this.isOutOfBounds() &&
                        (this.alignTop(),
                        this.isOutOfBounds() && this.alignBottom()));
                  break;
                case "right":
                  this.alignRight(),
                    this.isOutOfBounds() &&
                      (this.alignLeft(),
                      this.isOutOfBounds() &&
                        (this.alignTop(),
                        this.isOutOfBounds() && this.alignBottom()));
              }
            }
            getHostOffset() {
              if (
                "body" === this.getOption("appendTo") ||
                "target" === this.getOption("appendTo")
              ) {
                let t = this.el.nativeElement.getBoundingClientRect();
                return {
                  left: t.left + k.getWindowScrollLeft(),
                  top: t.top + k.getWindowScrollTop(),
                };
              }
              return { left: 0, top: 0 };
            }
            alignRight() {
              this.preAlign("right");
              let t = this.getHostOffset(),
                i = t.left + k.getOuterWidth(this.el.nativeElement),
                r =
                  t.top +
                  (k.getOuterHeight(this.el.nativeElement) -
                    k.getOuterHeight(this.container)) /
                    2;
              (this.container.style.left =
                i + this.getOption("positionLeft") + "px"),
                (this.container.style.top =
                  r + this.getOption("positionTop") + "px");
            }
            alignLeft() {
              this.preAlign("left");
              let t = this.getHostOffset(),
                i = t.left - k.getOuterWidth(this.container),
                r =
                  t.top +
                  (k.getOuterHeight(this.el.nativeElement) -
                    k.getOuterHeight(this.container)) /
                    2;
              (this.container.style.left =
                i + this.getOption("positionLeft") + "px"),
                (this.container.style.top =
                  r + this.getOption("positionTop") + "px");
            }
            alignTop() {
              this.preAlign("top");
              let t = this.getHostOffset(),
                i =
                  t.left +
                  (k.getOuterWidth(this.el.nativeElement) -
                    k.getOuterWidth(this.container)) /
                    2,
                r = t.top - k.getOuterHeight(this.container);
              (this.container.style.left =
                i + this.getOption("positionLeft") + "px"),
                (this.container.style.top =
                  r + this.getOption("positionTop") + "px");
            }
            alignBottom() {
              this.preAlign("bottom");
              let t = this.getHostOffset(),
                i =
                  t.left +
                  (k.getOuterWidth(this.el.nativeElement) -
                    k.getOuterWidth(this.container)) /
                    2,
                r = t.top + k.getOuterHeight(this.el.nativeElement);
              (this.container.style.left =
                i + this.getOption("positionLeft") + "px"),
                (this.container.style.top =
                  r + this.getOption("positionTop") + "px");
            }
            setOption(t) {
              this._tooltipOptions = { ...this._tooltipOptions, ...t };
            }
            getOption(t) {
              return this._tooltipOptions[t];
            }
            getTarget(t) {
              return k.hasClass(t, "p-inputwrapper")
                ? k.findSingle(t, "input")
                : t;
            }
            preAlign(t) {
              (this.container.style.left = "-999px"),
                (this.container.style.top = "-999px");
              let i = "p-tooltip p-component p-tooltip-" + t;
              this.container.className = this.getOption("tooltipStyleClass")
                ? i + " " + this.getOption("tooltipStyleClass")
                : i;
            }
            isOutOfBounds() {
              let t = this.container.getBoundingClientRect(),
                i = t.top,
                r = t.left,
                o = k.getOuterWidth(this.container),
                s = k.getOuterHeight(this.container),
                a = k.getViewport();
              return r + o > a.width || r < 0 || i < 0 || i + s > a.height;
            }
            onWindowResize(t) {
              this.hide();
            }
            bindDocumentResizeListener() {
              this.zone.runOutsideAngular(() => {
                (this.resizeListener = this.onWindowResize.bind(this)),
                  window.addEventListener("resize", this.resizeListener);
              });
            }
            unbindDocumentResizeListener() {
              this.resizeListener &&
                (window.removeEventListener("resize", this.resizeListener),
                (this.resizeListener = null));
            }
            bindScrollListener() {
              this.scrollHandler ||
                (this.scrollHandler = new WA(this.el.nativeElement, () => {
                  this.container && this.hide();
                })),
                this.scrollHandler.bindScrollListener();
            }
            unbindScrollListener() {
              this.scrollHandler && this.scrollHandler.unbindScrollListener();
            }
            unbindEvents() {
              if ("hover" === this.getOption("tooltipEvent"))
                this.el.nativeElement.removeEventListener(
                  "mouseenter",
                  this.mouseEnterListener
                ),
                  this.el.nativeElement.removeEventListener(
                    "mouseleave",
                    this.mouseLeaveListener
                  ),
                  this.el.nativeElement.removeEventListener(
                    "click",
                    this.clickListener
                  );
              else if ("focus" === this.getOption("tooltipEvent")) {
                let t = this.getTarget(this.el.nativeElement);
                t.removeEventListener("focus", this.focusListener),
                  t.removeEventListener("blur", this.blurListener);
              }
              this.unbindDocumentResizeListener();
            }
            remove() {
              this.container &&
                this.container.parentElement &&
                ("body" === this.getOption("appendTo")
                  ? document.body.removeChild(this.container)
                  : "target" === this.getOption("appendTo")
                  ? this.el.nativeElement.removeChild(this.container)
                  : k.removeChild(this.container, this.getOption("appendTo"))),
                this.unbindDocumentResizeListener(),
                this.unbindScrollListener(),
                this.clearTimeouts(),
                (this.container = null),
                (this.scrollHandler = null);
            }
            clearShowTimeout() {
              this.showTimeout &&
                (clearTimeout(this.showTimeout), (this.showTimeout = null));
            }
            clearHideTimeout() {
              this.hideTimeout &&
                (clearTimeout(this.hideTimeout), (this.hideTimeout = null));
            }
            clearTimeouts() {
              this.clearShowTimeout(), this.clearHideTimeout();
            }
            ngOnDestroy() {
              this.unbindEvents(),
                this.container && mu.clear(this.container),
                this.remove(),
                this.scrollHandler &&
                  (this.scrollHandler.destroy(), (this.scrollHandler = null));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(x(nn), x(we), x(Zy));
            }),
            (n.ɵdir = Ve({
              type: n,
              selectors: [["", "pTooltip", ""]],
              hostAttrs: [1, "p-element"],
              inputs: {
                tooltipPosition: "tooltipPosition",
                tooltipEvent: "tooltipEvent",
                appendTo: "appendTo",
                positionStyle: "positionStyle",
                tooltipStyleClass: "tooltipStyleClass",
                tooltipZIndex: "tooltipZIndex",
                escape: "escape",
                showDelay: "showDelay",
                hideDelay: "hideDelay",
                life: "life",
                positionTop: "positionTop",
                positionLeft: "positionLeft",
                fitContent: "fitContent",
                text: ["pTooltip", "text"],
                disabled: ["tooltipDisabled", "disabled"],
                tooltipOptions: "tooltipOptions",
              },
              features: [Ji],
            })),
            n
          );
        })(),
        tv = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = tt({ type: n })),
            (n.ɵinj = qe({ imports: [Sn] })),
            n
          );
        })(),
        KA = (() => {
          class n {
            constructor(t, i, r) {
              (this.el = t), (this.zone = i), (this.config = r);
            }
            ngAfterViewInit() {
              this.config &&
                this.config.ripple &&
                this.zone.runOutsideAngular(() => {
                  this.create(),
                    (this.mouseDownListener = this.onMouseDown.bind(this)),
                    this.el.nativeElement.addEventListener(
                      "mousedown",
                      this.mouseDownListener
                    );
                });
            }
            onMouseDown(t) {
              let i = this.getInk();
              if (!i || "none" === getComputedStyle(i, null).display) return;
              if (
                (k.removeClass(i, "p-ink-active"),
                !k.getHeight(i) && !k.getWidth(i))
              ) {
                let a = Math.max(
                  k.getOuterWidth(this.el.nativeElement),
                  k.getOuterHeight(this.el.nativeElement)
                );
                (i.style.height = a + "px"), (i.style.width = a + "px");
              }
              let r = k.getOffset(this.el.nativeElement),
                o =
                  t.pageX -
                  r.left +
                  document.body.scrollTop -
                  k.getWidth(i) / 2,
                s =
                  t.pageY -
                  r.top +
                  document.body.scrollLeft -
                  k.getHeight(i) / 2;
              (i.style.top = s + "px"),
                (i.style.left = o + "px"),
                k.addClass(i, "p-ink-active"),
                (this.timeout = setTimeout(() => {
                  let a = this.getInk();
                  a && k.removeClass(a, "p-ink-active");
                }, 401));
            }
            getInk() {
              for (let t = 0; t < this.el.nativeElement.children.length; t++)
                if (
                  -1 !==
                  this.el.nativeElement.children[t].className.indexOf("p-ink")
                )
                  return this.el.nativeElement.children[t];
              return null;
            }
            resetInk() {
              let t = this.getInk();
              t && k.removeClass(t, "p-ink-active");
            }
            onAnimationEnd(t) {
              this.timeout && clearTimeout(this.timeout),
                k.removeClass(t.currentTarget, "p-ink-active");
            }
            create() {
              let t = document.createElement("span");
              (t.className = "p-ink"),
                this.el.nativeElement.appendChild(t),
                (this.animationListener = this.onAnimationEnd.bind(this)),
                t.addEventListener("animationend", this.animationListener);
            }
            remove() {
              let t = this.getInk();
              t &&
                (this.el.nativeElement.removeEventListener(
                  "mousedown",
                  this.mouseDownListener
                ),
                t.removeEventListener("animationend", this.animationListener),
                k.removeElement(t));
            }
            ngOnDestroy() {
              this.config && this.config.ripple && this.remove();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(x(nn), x(we), x(Zy, 8));
            }),
            (n.ɵdir = Ve({
              type: n,
              selectors: [["", "pRipple", ""]],
              hostAttrs: [1, "p-ripple", "p-element"],
            })),
            n
          );
        })(),
        yu = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = tt({ type: n })),
            (n.ɵinj = qe({ imports: [Sn] })),
            n
          );
        })();
      function QA(n, e) {
        1 & n && es(0);
      }
      function YA(n, e) {
        if (
          (1 & n && (Cr(0), de(1, QA, 1, 0, "ng-container", 3), Ir()), 2 & n)
        ) {
          const t = Le(2);
          ce(1), ee("ngTemplateOutlet", t.contentTemplate);
        }
      }
      function ZA(n, e) {
        if (
          (1 & n &&
            (D(0, "div", 1), sc(1), de(2, YA, 2, 1, "ng-container", 2), E()),
          2 & n)
        ) {
          const t = Le();
          ee("hidden", !t.selected),
            Jo("id", t.id)("aria-hidden", !t.selected)(
              "aria-labelledby",
              t.id + "-label"
            ),
            ce(2),
            ee("ngIf", t.contentTemplate && (t.cache ? t.loaded : t.selected));
        }
      }
      const nv = ["*"],
        XA = ["content"],
        JA = ["navbar"],
        eP = ["prevBtn"],
        tP = ["nextBtn"],
        nP = ["inkbar"];
      function iP(n, e) {
        if (1 & n) {
          const t = Sr();
          D(0, "button", 12, 13),
            Cn("click", function () {
              return ii(t), ri(Le().navBackward());
            }),
            j(2, "span", 14),
            E();
        }
      }
      function rP(n, e) {
        1 & n && j(0, "span", 24),
          2 & n && ee("ngClass", Le(3).$implicit.leftIcon);
      }
      function oP(n, e) {
        1 & n && j(0, "span", 25),
          2 & n && ee("ngClass", Le(3).$implicit.rightIcon);
      }
      function sP(n, e) {
        if (
          (1 & n &&
            (Cr(0),
            de(1, rP, 1, 1, "span", 21),
            D(2, "span", 22),
            b(3),
            E(),
            de(4, oP, 1, 1, "span", 23),
            Ir()),
          2 & n)
        ) {
          const t = Le(2).$implicit;
          ce(1),
            ee("ngIf", t.leftIcon),
            ce(2),
            ns(t.header),
            ce(1),
            ee("ngIf", t.rightIcon);
        }
      }
      function aP(n, e) {
        1 & n && es(0);
      }
      function lP(n, e) {
        if (1 & n) {
          const t = Sr();
          D(0, "span", 26),
            Cn("click", function (r) {
              ii(t);
              const o = Le(2).$implicit;
              return ri(Le().close(r, o));
            }),
            E();
        }
      }
      const cP = function (n, e) {
        return { "p-highlight": n, "p-disabled": e };
      };
      function uP(n, e) {
        if (1 & n) {
          const t = Sr();
          D(0, "li", 16)(1, "a", 17),
            Cn("click", function (r) {
              ii(t);
              const o = Le().$implicit;
              return ri(Le().open(r, o));
            })("keydown.enter", function (r) {
              ii(t);
              const o = Le().$implicit;
              return ri(Le().open(r, o));
            }),
            de(2, sP, 5, 3, "ng-container", 18),
            de(3, aP, 1, 0, "ng-container", 19),
            de(4, lP, 1, 0, "span", 20),
            E()();
        }
        if (2 & n) {
          const t = Le().$implicit;
          lc(t.headerStyleClass),
            ee("ngClass", tm(16, cP, t.selected, t.disabled))(
              "ngStyle",
              t.headerStyle
            ),
            ce(1),
            ee("pTooltip", t.tooltip)("tooltipPosition", t.tooltipPosition)(
              "positionStyle",
              t.tooltipPositionStyle
            )("tooltipStyleClass", t.tooltipStyleClass),
            Jo("id", t.id + "-label")("aria-selected", t.selected)(
              "aria-controls",
              t.id
            )("aria-selected", t.selected)("tabindex", t.disabled ? null : "0"),
            ce(1),
            ee("ngIf", !t.headerTemplate),
            ce(1),
            ee("ngTemplateOutlet", t.headerTemplate),
            ce(1),
            ee("ngIf", t.closable);
        }
      }
      function dP(n, e) {
        1 & n && de(0, uP, 5, 19, "li", 15),
          2 & n && ee("ngIf", !e.$implicit.closed);
      }
      function fP(n, e) {
        if (1 & n) {
          const t = Sr();
          D(0, "button", 27, 28),
            Cn("click", function () {
              return ii(t), ri(Le().navForward());
            }),
            j(2, "span", 29),
            E();
        }
      }
      const pP = function (n) {
        return { "p-tabview p-component": !0, "p-tabview-scrollable": n };
      };
      let hP = 0,
        iv = (() => {
          class n {
            constructor(t, i, r) {
              (this.viewContainer = i),
                (this.cd = r),
                (this.cache = !0),
                (this.tooltipPosition = "top"),
                (this.tooltipPositionStyle = "absolute"),
                (this.id = "p-tabpanel-" + hP++),
                (this.tabView = t);
            }
            ngAfterContentInit() {
              this.templates.forEach((t) => {
                "header" === t.getType()
                  ? (this.headerTemplate = t.template)
                  : (this.contentTemplate = t.template);
              });
            }
            get selected() {
              return this._selected;
            }
            set selected(t) {
              (this._selected = t),
                this.loaded || this.cd.detectChanges(),
                t && (this.loaded = !0);
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = t), this.tabView.cd.markForCheck();
            }
            get header() {
              return this._header;
            }
            set header(t) {
              (this._header = t),
                Promise.resolve().then(() => {
                  this.tabView.updateInkBar(), this.tabView.cd.markForCheck();
                });
            }
            get leftIcon() {
              return this._leftIcon;
            }
            set leftIcon(t) {
              (this._leftIcon = t), this.tabView.cd.markForCheck();
            }
            get rightIcon() {
              return this._rightIcon;
            }
            set rightIcon(t) {
              (this._rightIcon = t), this.tabView.cd.markForCheck();
            }
            ngOnDestroy() {
              this.view = null;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(x(no(() => rv)), x(Ft), x(jc));
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["p-tabPanel"]],
              contentQueries: function (t, i, r) {
                if ((1 & t && Tc(r, Xy, 4), 2 & t)) {
                  let o;
                  an((o = ln())) && (i.templates = o);
                }
              },
              hostAttrs: [1, "p-element"],
              inputs: {
                closable: "closable",
                headerStyle: "headerStyle",
                headerStyleClass: "headerStyleClass",
                cache: "cache",
                tooltip: "tooltip",
                tooltipPosition: "tooltipPosition",
                tooltipPositionStyle: "tooltipPositionStyle",
                tooltipStyleClass: "tooltipStyleClass",
                selected: "selected",
                disabled: "disabled",
                header: "header",
                leftIcon: "leftIcon",
                rightIcon: "rightIcon",
              },
              ngContentSelectors: nv,
              decls: 1,
              vars: 1,
              consts: [
                [
                  "class",
                  "p-tabview-panel",
                  "role",
                  "tabpanel",
                  3,
                  "hidden",
                  4,
                  "ngIf",
                ],
                ["role", "tabpanel", 1, "p-tabview-panel", 3, "hidden"],
                [4, "ngIf"],
                [4, "ngTemplateOutlet"],
              ],
              template: function (t, i) {
                1 & t && (oc(), de(0, ZA, 3, 5, "div", 0)),
                  2 & t && ee("ngIf", !i.closed);
              },
              dependencies: [Ts, ru],
              encapsulation: 2,
            })),
            n
          );
        })(),
        rv = (() => {
          class n {
            constructor(t, i) {
              (this.el = t),
                (this.cd = i),
                (this.orientation = "top"),
                (this.onChange = new _t()),
                (this.onClose = new _t()),
                (this.activeIndexChange = new _t()),
                (this.backwardIsDisabled = !0),
                (this.forwardIsDisabled = !1);
            }
            ngAfterContentInit() {
              this.initTabs(),
                (this.tabChangesSubscription = this.tabPanels.changes.subscribe(
                  (t) => {
                    this.initTabs();
                  }
                ));
            }
            ngAfterViewChecked() {
              this.tabChanged && (this.updateInkBar(), (this.tabChanged = !1));
            }
            ngOnDestroy() {
              this.tabChangesSubscription &&
                this.tabChangesSubscription.unsubscribe();
            }
            initTabs() {
              (this.tabs = this.tabPanels.toArray()),
                !this.findSelectedTab() &&
                  this.tabs.length &&
                  (null != this.activeIndex &&
                  this.tabs.length > this.activeIndex
                    ? (this.tabs[this.activeIndex].selected = !0)
                    : (this.tabs[0].selected = !0),
                  (this.tabChanged = !0)),
                this.cd.markForCheck();
            }
            open(t, i) {
              if (i.disabled) t && t.preventDefault();
              else {
                if (!i.selected) {
                  let r = this.findSelectedTab();
                  r && (r.selected = !1),
                    (this.tabChanged = !0),
                    (i.selected = !0);
                  let o = this.findTabIndex(i);
                  (this.preventActiveIndexPropagation = !0),
                    this.activeIndexChange.emit(o),
                    this.onChange.emit({ originalEvent: t, index: o }),
                    this.updateScrollBar(o);
                }
                t && t.preventDefault();
              }
            }
            close(t, i) {
              this.controlClose
                ? this.onClose.emit({
                    originalEvent: t,
                    index: this.findTabIndex(i),
                    close: () => {
                      this.closeTab(i);
                    },
                  })
                : (this.closeTab(i),
                  this.onClose.emit({
                    originalEvent: t,
                    index: this.findTabIndex(i),
                  })),
                t.stopPropagation();
            }
            closeTab(t) {
              if (!t.disabled) {
                if (t.selected) {
                  (this.tabChanged = !0), (t.selected = !1);
                  for (let i = 0; i < this.tabs.length; i++) {
                    let r = this.tabs[i];
                    if (!r.closed && !t.disabled) {
                      r.selected = !0;
                      break;
                    }
                  }
                }
                t.closed = !0;
              }
            }
            findSelectedTab() {
              for (let t = 0; t < this.tabs.length; t++)
                if (this.tabs[t].selected) return this.tabs[t];
              return null;
            }
            findTabIndex(t) {
              let i = -1;
              for (let r = 0; r < this.tabs.length; r++)
                if (this.tabs[r] == t) {
                  i = r;
                  break;
                }
              return i;
            }
            getBlockableElement() {
              return this.el.nativeElement.children[0];
            }
            get activeIndex() {
              return this._activeIndex;
            }
            set activeIndex(t) {
              (this._activeIndex = t),
                this.preventActiveIndexPropagation
                  ? (this.preventActiveIndexPropagation = !1)
                  : this.tabs &&
                    this.tabs.length &&
                    null != this._activeIndex &&
                    this.tabs.length > this._activeIndex &&
                    ((this.findSelectedTab().selected = !1),
                    (this.tabs[this._activeIndex].selected = !0),
                    (this.tabChanged = !0),
                    this.updateScrollBar(t));
            }
            updateInkBar() {
              if (this.navbar) {
                const t = k.findSingle(
                  this.navbar.nativeElement,
                  "li.p-highlight"
                );
                if (!t) return;
                (this.inkbar.nativeElement.style.width = k.getWidth(t) + "px"),
                  (this.inkbar.nativeElement.style.left =
                    k.getOffset(t).left -
                    k.getOffset(this.navbar.nativeElement).left +
                    "px");
              }
            }
            updateScrollBar(t) {
              this.navbar.nativeElement.children[t].scrollIntoView({
                block: "nearest",
              });
            }
            updateButtonState() {
              const t = this.content.nativeElement,
                { scrollLeft: i, scrollWidth: r } = t,
                o = k.getWidth(t);
              (this.backwardIsDisabled = 0 === i),
                (this.forwardIsDisabled = parseInt(i) === r - o);
            }
            onScroll(t) {
              this.scrollable && this.updateButtonState(), t.preventDefault();
            }
            getVisibleButtonWidths() {
              return [
                this.prevBtn?.nativeElement,
                this.nextBtn?.nativeElement,
              ].reduce((t, i) => (i ? t + k.getWidth(i) : t), 0);
            }
            navBackward() {
              const t = this.content.nativeElement,
                i = k.getWidth(t) - this.getVisibleButtonWidths(),
                r = t.scrollLeft - i;
              t.scrollLeft = r <= 0 ? 0 : r;
            }
            navForward() {
              const t = this.content.nativeElement,
                i = k.getWidth(t) - this.getVisibleButtonWidths(),
                r = t.scrollLeft + i,
                o = t.scrollWidth - i;
              t.scrollLeft = r >= o ? o : r;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(x(nn), x(jc));
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["p-tabView"]],
              contentQueries: function (t, i, r) {
                if ((1 & t && Tc(r, iv, 4), 2 & t)) {
                  let o;
                  an((o = ln())) && (i.tabPanels = o);
                }
              },
              viewQuery: function (t, i) {
                if (
                  (1 & t &&
                    (Gn(XA, 5), Gn(JA, 5), Gn(eP, 5), Gn(tP, 5), Gn(nP, 5)),
                  2 & t)
                ) {
                  let r;
                  an((r = ln())) && (i.content = r.first),
                    an((r = ln())) && (i.navbar = r.first),
                    an((r = ln())) && (i.prevBtn = r.first),
                    an((r = ln())) && (i.nextBtn = r.first),
                    an((r = ln())) && (i.inkbar = r.first);
                }
              },
              hostAttrs: [1, "p-element"],
              inputs: {
                orientation: "orientation",
                style: "style",
                styleClass: "styleClass",
                controlClose: "controlClose",
                scrollable: "scrollable",
                activeIndex: "activeIndex",
              },
              outputs: {
                onChange: "onChange",
                onClose: "onClose",
                activeIndexChange: "activeIndexChange",
              },
              ngContentSelectors: nv,
              decls: 13,
              vars: 9,
              consts: [
                [3, "ngClass", "ngStyle"],
                [1, "p-tabview-nav-container"],
                [
                  "class",
                  "p-tabview-nav-prev p-tabview-nav-btn p-link",
                  "type",
                  "button",
                  "pRipple",
                  "",
                  3,
                  "click",
                  4,
                  "ngIf",
                ],
                [1, "p-tabview-nav-content", 3, "scroll"],
                ["content", ""],
                ["role", "tablist", 1, "p-tabview-nav"],
                ["navbar", ""],
                ["ngFor", "", 3, "ngForOf"],
                [1, "p-tabview-ink-bar"],
                ["inkbar", ""],
                [
                  "class",
                  "p-tabview-nav-next p-tabview-nav-btn p-link",
                  "type",
                  "button",
                  "pRipple",
                  "",
                  3,
                  "click",
                  4,
                  "ngIf",
                ],
                [1, "p-tabview-panels"],
                [
                  "type",
                  "button",
                  "pRipple",
                  "",
                  1,
                  "p-tabview-nav-prev",
                  "p-tabview-nav-btn",
                  "p-link",
                  3,
                  "click",
                ],
                ["prevBtn", ""],
                [1, "pi", "pi-chevron-left"],
                [
                  "role",
                  "presentation",
                  3,
                  "ngClass",
                  "ngStyle",
                  "class",
                  4,
                  "ngIf",
                ],
                ["role", "presentation", 3, "ngClass", "ngStyle"],
                [
                  "role",
                  "tab",
                  "pRipple",
                  "",
                  1,
                  "p-tabview-nav-link",
                  3,
                  "pTooltip",
                  "tooltipPosition",
                  "positionStyle",
                  "tooltipStyleClass",
                  "click",
                  "keydown.enter",
                ],
                [4, "ngIf"],
                [4, "ngTemplateOutlet"],
                ["class", "p-tabview-close pi pi-times", 3, "click", 4, "ngIf"],
                ["class", "p-tabview-left-icon", 3, "ngClass", 4, "ngIf"],
                [1, "p-tabview-title"],
                ["class", "p-tabview-right-icon", 3, "ngClass", 4, "ngIf"],
                [1, "p-tabview-left-icon", 3, "ngClass"],
                [1, "p-tabview-right-icon", 3, "ngClass"],
                [1, "p-tabview-close", "pi", "pi-times", 3, "click"],
                [
                  "type",
                  "button",
                  "pRipple",
                  "",
                  1,
                  "p-tabview-nav-next",
                  "p-tabview-nav-btn",
                  "p-link",
                  3,
                  "click",
                ],
                ["nextBtn", ""],
                [1, "pi", "pi-chevron-right"],
              ],
              template: function (t, i) {
                1 & t &&
                  (oc(),
                  D(0, "div", 0)(1, "div", 1),
                  de(2, iP, 3, 0, "button", 2),
                  D(3, "div", 3, 4),
                  Cn("scroll", function (o) {
                    return i.onScroll(o);
                  }),
                  D(5, "ul", 5, 6),
                  de(7, dP, 1, 1, "ng-template", 7),
                  j(8, "li", 8, 9),
                  E()(),
                  de(10, fP, 3, 0, "button", 10),
                  E(),
                  D(11, "div", 11),
                  sc(12),
                  E()()),
                  2 & t &&
                    (lc(i.styleClass),
                    ee("ngClass", em(7, pP, i.scrollable))("ngStyle", i.style),
                    ce(2),
                    ee("ngIf", i.scrollable && !i.backwardIsDisabled),
                    ce(5),
                    ee("ngForOf", i.tabs),
                    ce(3),
                    ee("ngIf", i.scrollable && !i.forwardIsDisabled));
              },
              dependencies: [_y, tu, Ts, ru, Iy, qA, KA],
              styles: [
                ".p-tabview-nav-container{position:relative}.p-tabview-scrollable .p-tabview-nav-container{overflow:hidden}.p-tabview-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}.p-tabview-nav{display:flex;margin:0;padding:0;list-style-type:none;flex:1 1 auto}.p-tabview-nav-link{cursor:pointer;-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabview-ink-bar{display:none;z-index:1}.p-tabview-nav-link:focus{z-index:1}.p-tabview-title{line-height:1;white-space:nowrap}.p-tabview-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabview-nav-prev{left:0}.p-tabview-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabview-close{z-index:1}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        gP = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = tt({ type: n })),
            (n.ɵinj = qe({ imports: [Sn, gu, tv, yu, gu] })),
            n
          );
        })(),
        mP = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["app-intro"]],
              decls: 28,
              vars: 0,
              consts: [
                ["src", "../../luisdebenito/assets/fields.jpeg", 1, "img"],
                [1, "centered"],
                [1, "pi", "pi-linkedin"],
                [
                  "target",
                  "_blank",
                  "href",
                  "https://www.linkedin.com/in/luis-de-benito/",
                ],
                [1, "pi", "pi-envelope"],
                ["target", "_blank", "href", "mailTo:luisdebenito7@gmail.com"],
                [1, "pi", "pi-instagram"],
                [
                  "target",
                  "_blank",
                  "href",
                  "https://www.instagram.com/luis.bq_/",
                ],
                [1, "pi", "pi-twitter"],
                [
                  "target",
                  "_blank",
                  "href",
                  "https://www.twitter.com/luisbq_/",
                ],
                ["src", "../../luisdebenito/assets/segovia.jpg", 1, "img"],
              ],
              template: function (t, i) {
                1 & t &&
                  (D(0, "h1"),
                  b(1, "Luis de Benito"),
                  E(),
                  D(2, "p"),
                  b(3, " Hello there! Thanks for getting in here. My name is "),
                  D(4, "b"),
                  b(5, "Luis"),
                  E(),
                  b(6, ", and this is me!\n"),
                  E(),
                  j(7, "img", 0),
                  D(8, "div", 1)(9, "p"),
                  j(10, "i", 2),
                  D(11, "a", 3),
                  b(12, "Luis dB.P."),
                  E()(),
                  D(13, "p"),
                  j(14, "i", 4),
                  D(15, "a", 5),
                  b(16, "luisdebenito7@gmail.com"),
                  E()(),
                  D(17, "p"),
                  j(18, "i", 6),
                  D(19, "a", 7),
                  b(20, "@luis.bq_"),
                  E()(),
                  D(21, "p"),
                  j(22, "i", 8),
                  D(23, "a", 9),
                  b(24, "@luisbq_"),
                  E()()(),
                  D(25, "p"),
                  b(
                    26,
                    " Back in 1995, my parents decided to make my first commit in Segovia, and I spent there the first 17 years of my life. Such a lovely city.\n"
                  ),
                  E(),
                  j(27, "img", 10));
              },
              styles: [
                ".centered[_ngcontent-%COMP%]{margin:auto;padding-left:10px;color:#fff}.centered[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{margin:15px;font-size:25px}.centered[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px}",
              ],
            })),
            n
          );
        })(),
        yP = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["app-education"]],
              decls: 28,
              vars: 0,
              consts: [
                ["src", "../../luisdebenito/assets/uni1.jpg", 1, "img"],
                ["src", "../../luisdebenito/assets/unitenis.jpg", 1, "img"],
                ["src", "../../luisdebenito/assets/malt.jpg", 1, "img"],
                ["src", "../../luisdebenito/assets/iowa.jpg", 1, "img"],
              ],
              template: function (t, i) {
                1 & t &&
                  (D(0, "h1"),
                  b(1, "University in Madrid"),
                  E(),
                  D(2, "p"),
                  b(
                    3,
                    " After a good childhood in the fields, it was my time to move to the big city. I got into UPM (Universidad Polit\xe9cnica de Madrid) to study a "
                  ),
                  D(4, "b"),
                  b(
                    5,
                    "degree in Electronic and Automatic Industrial Engineering"
                  ),
                  E()(),
                  j(6, "img", 0),
                  D(7, "h1"),
                  b(8, "University of London"),
                  E(),
                  D(9, "p"),
                  b(10, " Lucky me, I got sponsored to do an online "),
                  D(11, "b"),
                  b(12, "MSC in Data Science and Artificial Intelligence"),
                  E(),
                  b(
                    13,
                    ". It was nice, but not what I expected, easily replaced by Youtube\n"
                  ),
                  E(),
                  j(14, "img", 1),
                  D(15, "p")(16, "i"),
                  b(
                    17,
                    "I was sick the day we got the trophies, don't judge my face"
                  ),
                  E()(),
                  D(18, "h1"),
                  b(19, "Volunteering"),
                  E(),
                  D(20, "p"),
                  b(
                    21,
                    " I have done a lot of volunteering, but Malta was the best one. I got the chance to develop a project to handcraft instruments made by trash, and spent a couple months enjoying the views\n"
                  ),
                  E(),
                  j(22, "img", 2),
                  D(23, "h1"),
                  b(24, "Others"),
                  E(),
                  D(25, "p"),
                  b(
                    26,
                    " I got the national tennis teacher license from RFET, did a quarterly exchange in Ames, Iowa, and some other titles that may be interesting for nobody.\n"
                  ),
                  E(),
                  j(27, "img", 3));
              },
              encapsulation: 2,
            })),
            n
          );
        })(),
        vP = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["app-experience"]],
              decls: 6,
              vars: 0,
              consts: [
                ["src", "../../luisdebenito/assets/job1.png", 1, "img"],
                ["src", "../../luisdebenito/assets/job2.png", 1, "img"],
              ],
              template: function (t, i) {
                1 & t &&
                  (D(0, "h1"),
                  b(1, "Job Experience"),
                  E(),
                  D(2, "p"),
                  b(3, "Linkedin already did the job of prettifying it"),
                  E(),
                  j(4, "img", 0)(5, "img", 1));
              },
              encapsulation: 2,
            })),
            n
          );
        })(),
        _P = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["app-music"]],
              decls: 16,
              vars: 0,
              consts: [
                [1, "centered"],
                [1, "pi", "pi-youtube"],
                [
                  "target",
                  "_blank",
                  "href",
                  "https://www.youtube.com/@luisbq8045",
                ],
                [
                  "target",
                  "_blank",
                  "href",
                  "https://www.youtube.com/@bq_tossing_beats",
                ],
                [
                  "width",
                  "560",
                  "height",
                  "315",
                  "src",
                  "https://www.youtube.com/embed/HiON7D8QrsA",
                  "title",
                  "Stenaten",
                  "frameborder",
                  "0",
                  "allow",
                  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                  "allowfullscreen",
                  "",
                ],
              ],
              template: function (t, i) {
                1 & t &&
                  (D(0, "h1"),
                  b(1, "Music"),
                  E(),
                  D(2, "p"),
                  b(
                    3,
                    " We can say it is my biggest home hobby, listening, producing and mixing music\n"
                  ),
                  E(),
                  D(4, "div", 0)(5, "p"),
                  j(6, "i", 1),
                  D(7, "a", 2),
                  b(8, "Luisbq, producing music channel"),
                  E()(),
                  D(9, "p"),
                  j(10, "i", 1),
                  D(11, "a", 3),
                  b(12, "Bq Tossing Beats, mixing music channel"),
                  E()()(),
                  D(13, "p"),
                  b(
                    14,
                    " I have played piano and guitar for 15 years, here is a song I made and played:\n"
                  ),
                  E(),
                  j(15, "iframe", 4));
              },
              styles: [
                ".centered[_ngcontent-%COMP%]{margin:auto;padding-left:10px;color:#fff}.centered[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{margin:15px;font-size:25px}.centered[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px}iframe[_ngcontent-%COMP%]{width:100%}",
              ],
            })),
            n
          );
        })(),
        DP = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["app-trip"]],
              decls: 70,
              vars: 0,
              consts: [
                ["src", "../../luisdebenito/assets/india.JPG", 1, "img"],
                ["src", "../../luisdebenito/assets/rusia.jpg", 1, "img"],
                ["src", "../../luisdebenito/assets/forli.jpg", 1, "img"],
                ["src", "../../luisdebenito/assets/italy.jpg", 1, "img"],
                ["src", "../../luisdebenito/assets/suecia.jpg", 1, "img"],
              ],
              template: function (t, i) {
                1 & t &&
                  (D(0, "h1"),
                  b(1, "Trips"),
                  E(),
                  D(2, "p"),
                  b(
                    3,
                    "As I already said before, travelling is an important part of my life."
                  ),
                  E(),
                  D(4, "p"),
                  b(5, "This is a list of the places I have been to"),
                  E(),
                  D(6, "ul")(7, "li"),
                  b(8, "Andorra \u{1f1e6}\u{1f1e9}"),
                  E(),
                  D(9, "li"),
                  b(10, "Austria \u{1f1e6}\u{1f1f9}"),
                  E(),
                  D(11, "li"),
                  b(12, "Belgium \u{1f1e7}\u{1f1ea}"),
                  E(),
                  D(13, "li"),
                  b(14, "Croatia \u{1f1ed}\u{1f1f7}"),
                  E(),
                  D(15, "li"),
                  b(16, "Denmark \u{1f1e9}\u{1f1f0}"),
                  E(),
                  D(17, "li"),
                  b(18, "England \u{1f1ec}\u{1f1e7}"),
                  E(),
                  D(19, "li"),
                  b(20, "France \u{1f1eb}\u{1f1f7}"),
                  E(),
                  D(21, "li"),
                  b(22, "Germany \u{1f1e9}\u{1f1ea}"),
                  E(),
                  D(23, "li"),
                  b(24, "Hungary \u{1f1ed}\u{1f1fa}"),
                  E(),
                  D(25, "li"),
                  b(26, "India \u{1f1ee}\u{1f1f3}"),
                  E(),
                  D(27, "li"),
                  b(28, "Ireland \u{1f1ee}\u{1f1ea}"),
                  E(),
                  D(29, "li"),
                  b(30, "Italy \u{1f1ee}\u{1f1f9}"),
                  E(),
                  D(31, "li"),
                  b(32, "Malta \u{1f1f2}\u{1f1f9}"),
                  E(),
                  D(33, "li"),
                  b(34, "Monaco \u{1f1f2}\u{1f1e8}"),
                  E(),
                  D(35, "li"),
                  b(36, "Morocco \u{1f1f2}\u{1f1e6}"),
                  E(),
                  D(37, "li"),
                  b(38, "Netherlands \u{1f1f3}\u{1f1f1}"),
                  E(),
                  D(39, "li"),
                  b(40, "Northern Ireland \u{1f1ec}\u{1f1e7}"),
                  E(),
                  D(41, "li"),
                  b(42, "Poland \u{1f1f5}\u{1f1f1}"),
                  E(),
                  D(43, "li"),
                  b(44, "Portugal \u{1f1f5}\u{1f1f9}"),
                  E(),
                  D(45, "li"),
                  b(46, "Russia \u{1f1f7}\u{1f1fa}"),
                  E(),
                  D(47, "li"),
                  b(48, "San Marino \u{1f1f8}\u{1f1f2}"),
                  E(),
                  D(49, "li"),
                  b(50, "Slovenia \u{1f1f8}\u{1f1ee}"),
                  E(),
                  D(51, "li"),
                  b(52, "Scotland \u{1f1ec}\u{1f1e7}"),
                  E(),
                  D(53, "li"),
                  b(54, "Spain \u{1f1ea}\u{1f1f8}"),
                  E(),
                  D(55, "li"),
                  b(56, "Sweden \u{1f1f8}\u{1f1ea}"),
                  E(),
                  D(57, "li"),
                  b(58, "Turkey \u{1f1f9}\u{1f1f7}"),
                  E(),
                  D(59, "li"),
                  b(60, "USA \u{1f1fa}\u{1f1f8}"),
                  E()(),
                  D(61, "p"),
                  b(62, "I went to a wedding in India!"),
                  E(),
                  j(63, "img", 0),
                  D(64, "p"),
                  b(65, "Here are some pics of my trips:"),
                  E(),
                  j(66, "img", 1)(67, "img", 2)(68, "img", 3)(69, "img", 4));
              },
              styles: [
                "ul[_ngcontent-%COMP%]{list-style-type:none;columns:2;-webkit-columns:2;-moz-columns:2}",
              ],
            })),
            n
          );
        })(),
        EP = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["app-code"]],
              decls: 24,
              vars: 0,
              consts: [
                [1, "centered"],
                [1, "pi", "pi-github"],
                [
                  "target",
                  "_blank",
                  "href",
                  "https://github.com/luisdebenito?tab=repositories",
                ],
                ["src", "../../luisdebenito/assets/puebleo.jpeg", 1, "img"],
                [1, "pi", "pi-play"],
                [
                  "target",
                  "_blank",
                  "href",
                  "https://luisdebenito.github.io/MDGE/",
                ],
                ["src", "../../luisdebenito/assets/santiuste1.jpg", 1, "img"],
              ],
              template: function (t, i) {
                1 & t &&
                  (D(0, "h1"),
                  b(1, "Code"),
                  E(),
                  D(2, "p"),
                  b(
                    3,
                    " Since I started programming in 2013, I have never stopped developing my own stuff just for fun. I have started this repo with a couple projects, the rest is private in bitbucket\n"
                  ),
                  E(),
                  D(4, "div", 0)(5, "p"),
                  j(6, "i", 1),
                  D(7, "a", 2),
                  b(8, "Github luisdebenito"),
                  E()()(),
                  D(9, "p"),
                  b(10, " I have created a social network ("),
                  D(11, "b"),
                  b(12, "puebleo"),
                  E(),
                  b(
                    13,
                    " that became puebloo), a trivia question game called askIt, a php framework to work with html as jQuery does, and a lot of videogames\n"
                  ),
                  E(),
                  j(14, "img", 3),
                  D(15, "div", 0)(16, "p"),
                  j(17, "i", 4),
                  D(18, "a", 5),
                  b(19, "Most Difficult Game Ever"),
                  E(),
                  b(20, " Only PC "),
                  E()(),
                  D(21, "p"),
                  b(
                    22,
                    "Picture of me happy so you can imagine my face while coding"
                  ),
                  E(),
                  j(23, "img", 6));
              },
              styles: [
                ".centered[_ngcontent-%COMP%]{margin:auto;padding-left:10px;color:#fff}.centered[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{margin:15px;font-size:25px}.centered[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px}",
              ],
            })),
            n
          );
        })(),
        wP = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["app-sport"]],
              decls: 10,
              vars: 0,
              consts: [
                ["src", "../../luisdebenito/assets/tenis.jpg", 1, "img"],
                ["src", "../../luisdebenito/assets/bike.jpg", 1, "img"],
              ],
              template: function (t, i) {
                1 & t &&
                  (D(0, "h1"),
                  b(1, "Sports"),
                  E(),
                  D(2, "p"),
                  b(
                    3,
                    " Sports have been a big part of my life, for the good and for the bad. I was a federated tennis player untill the age of 15, when I had to stop because of an injury\n"
                  ),
                  E(),
                  j(4, "img", 0),
                  D(5, "p"),
                  b(
                    6,
                    " I have been the captain of the university football team and the main responsible for the racket sports. We have won the inter-universities championships twice\n"
                  ),
                  E(),
                  D(7, "p"),
                  b(8, "I built a fixie bike!"),
                  E(),
                  j(9, "img", 1));
              },
            })),
            n
          );
        })(),
        bP = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["app-final"]],
              decls: 20,
              vars: 0,
              consts: [
                ["src", "../../luisdebenito/assets/radio.jpg", 1, "img"],
                ["src", "../../luisdebenito/assets/snow.jpg", 1, "img"],
                ["src", "../../luisdebenito/assets/camper.jpeg", 1, "img"],
                ["src", "../../luisdebenito/assets/forrest.jpg", 1, "img"],
                [1, "jumping"],
                [1, "colors"],
              ],
              template: function (t, i) {
                1 & t &&
                  (D(0, "h1"),
                  b(1, "Miscellanous"),
                  E(),
                  D(2, "p"),
                  b(
                    3,
                    "Last but not least, some random things I am quite proud of"
                  ),
                  E(),
                  D(4, "p"),
                  b(5, "I did an interview in the radio (no kidding)"),
                  E(),
                  j(6, "img", 0),
                  D(7, "p"),
                  b(8, "I created my own version of a snowboard (ski+skate)"),
                  E(),
                  j(9, "img", 1),
                  D(10, "p"),
                  b(11, "I am campering my van"),
                  E(),
                  j(12, "img", 2),
                  D(13, "p"),
                  b(14, "I am looking for Jenny"),
                  E(),
                  j(15, "img", 3),
                  D(16, "h1", 4),
                  b(17, "Thanks for arriving to the end"),
                  E(),
                  D(18, "h1", 5),
                  b(19, "I hope you enjoyed a bit of my world"),
                  E());
              },
              encapsulation: 2,
            })),
            n
          );
        })();
      const CP = ["cnt"];
      function IP(n, e) {
        1 & n && j(0, "app-intro");
      }
      function SP(n, e) {
        1 & n && j(0, "app-education");
      }
      function TP(n, e) {
        1 & n && j(0, "app-experience");
      }
      function MP(n, e) {
        1 & n && j(0, "app-music");
      }
      function AP(n, e) {
        1 & n && j(0, "app-trip");
      }
      function PP(n, e) {
        1 & n && j(0, "app-code");
      }
      function xP(n, e) {
        1 & n && j(0, "app-sport");
      }
      function NP(n, e) {
        1 & n && j(0, "app-final");
      }
      function OP(n, e) {
        if ((1 & n && (j(0, "i"), D(1, "span", 10), b(2), E()), 2 & n)) {
          const t = Le().$implicit;
          (function sg(n, e, t) {
            Ot(at, Gt, Si(_(), n, e, t), !0);
          })("pi pi-", t.icon, ""),
            ce(2),
            ns(t.name);
        }
      }
      function FP(n, e) {
        1 & n && (D(0, "p-tabPanel"), de(1, OP, 3, 4, "ng-template", 9), E());
      }
      let LP = (() => {
          class n {
            constructor() {
              (this.title = "Luis de Benito"),
                (this.indexSelected = 0),
                (this.headers = [
                  { name: "Info", icon: "id-card", top: 0, right: 0 },
                  { name: "Education", icon: "user-plus", top: 0, right: 0 },
                  { name: "Experience", icon: "star", top: 0, right: 0 },
                  { name: "Music", icon: "volume-up", top: 0, right: 0 },
                  { name: "Trips", icon: "map", top: 0, right: 0 },
                  { name: "Code", icon: "code", top: 0, right: 0 },
                  { name: "Sports", icon: "flag", top: 0, right: 0 },
                  { name: "Misc", icon: "globe", top: 0, right: 0 },
                ]),
                (this.moving = !1);
            }
            ngOnInit() {
              this.headers.forEach((t, i) => {
                const r = Math.floor((360 / this.headers.length) * i);
                let o = Math.round(150 * Math.cos(r)),
                  s = Math.round(150 * Math.sin(r));
                (t.right = o + 200), (t.top = s + 200);
              });
            }
            tabChanged(t) {
              t.index != this.indexSelected && (this.indexSelected = t.index);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = et({
              type: n,
              selectors: [["app-root"]],
              viewQuery: function (t, i) {
                if ((1 & t && Gn(CP, 5), 2 & t)) {
                  let r;
                  an((r = ln())) && (i.container = r.first);
                }
              },
              decls: 16,
              vars: 10,
              consts: [
                [1, "presentation"],
                ["id", "mdl", 1, "modal"],
                [1, "container"],
                ["cnt", ""],
                [1, "inContainer"],
                [4, "ngIf"],
                [1, "footer"],
                [3, "activeIndex", "onChange"],
                [4, "ngFor", "ngForOf"],
                ["pTemplate", "header"],
                [1, "spantitle"],
              ],
              template: function (t, i) {
                1 & t &&
                  (D(0, "div", 0)(1, "div", 1)(2, "div", 2, 3)(4, "div", 4),
                  de(5, IP, 1, 0, "app-intro", 5),
                  de(6, SP, 1, 0, "app-education", 5),
                  de(7, TP, 1, 0, "app-experience", 5),
                  de(8, MP, 1, 0, "app-music", 5),
                  de(9, AP, 1, 0, "app-trip", 5),
                  de(10, PP, 1, 0, "app-code", 5),
                  de(11, xP, 1, 0, "app-sport", 5),
                  de(12, NP, 1, 0, "app-final", 5),
                  E()(),
                  D(13, "div", 6)(14, "p-tabView", 7),
                  Cn("onChange", function (o) {
                    return i.tabChanged(o);
                  }),
                  de(15, FP, 2, 0, "p-tabPanel", 8),
                  E()()()()),
                  2 & t &&
                    (ce(5),
                    ee("ngIf", 0 == i.indexSelected),
                    ce(1),
                    ee("ngIf", 1 == i.indexSelected),
                    ce(1),
                    ee("ngIf", 2 == i.indexSelected),
                    ce(1),
                    ee("ngIf", 3 == i.indexSelected),
                    ce(1),
                    ee("ngIf", 4 == i.indexSelected),
                    ce(1),
                    ee("ngIf", 5 == i.indexSelected),
                    ce(1),
                    ee("ngIf", 6 == i.indexSelected),
                    ce(1),
                    ee("ngIf", 7 == i.indexSelected),
                    ce(2),
                    ee("activeIndex", i.indexSelected),
                    ce(1),
                    ee("ngForOf", i.headers));
              },
              dependencies: [
                tu,
                Ts,
                Xy,
                rv,
                iv,
                mP,
                yP,
                vP,
                _P,
                DP,
                EP,
                wP,
                bP,
              ],
              styles: [
                ".container[_ngcontent-%COMP%]{height:100%}.container[_ngcontent-%COMP%]     .customRoom:hover{cursor:pointer}  .p-tabview-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}  .p-tabview-nav{display:flex;margin:0;padding:0;list-style-type:none;flex:1 1 auto}  .p-tabview .p-tabview-nav li{border-top:1px solid white;background-color:#5a7302}  .p-tabview .p-tabview-nav li span.spantitle{margin:auto 10px}  .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link{background-color:#f2f2f2;color:#3d3b35}  .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link i.pi{color:#3d3b35}  .p-tabview .p-tabview-nav li .p-tabview-nav-link{transition:background-color .2s,box-shadow .2s}  .p-tabview .p-tabview-nav li .p-tabview-nav-link{color:#fff;padding:1.25rem;font-weight:700;border-bottom-right-radius:10px;border-bottom-left-radius:10px;transition:box-shadow .2s;margin:0 0 -2px}  .p-tabview-nav-link{cursor:pointer;-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.modal[_ngcontent-%COMP%]{background-color:#f2f2f2;color:#3d3b35;border-radius:20px;height:98%;position:fixed;z-index:800;top:1%}.modal[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]{width:100%;height:7%;position:absolute;bottom:0;margin:auto}.modal[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#f2f2f2}.modal[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:100%;height:90%;max-height:90%;overflow-y:auto;position:absolute;top:0}.modal[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .inContainer[_ngcontent-%COMP%]{text-align:center}@media (max-width: 800px){  .p-tabview .p-tabview-nav li{padding-right:5px;padding-left:5px}.inContainer[_ngcontent-%COMP%]{margin:20px 3%}.modal[_ngcontent-%COMP%]{width:95%;left:1.5%}}@media (min-width: 800px){  .p-tabview .p-tabview-nav li{padding-right:30px;padding-left:30px}.inContainer[_ngcontent-%COMP%]{margin:20px 20%}.modal[_ngcontent-%COMP%]{width:68%;right:16%}}",
              ],
            })),
            n
          );
        })(),
        kP = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = tt({ type: n })),
            (n.ɵinj = qe({ imports: [Sn, yu] })),
            n
          );
        })();
      class ov {}
      const fn = "*";
      function sv(n, e = null) {
        return { type: 4, styles: e, timings: n };
      }
      function av(n, e = null) {
        return { type: 2, steps: n, options: e };
      }
      function Ls(n) {
        return { type: 6, styles: n, offset: null };
      }
      function lv(n, e = null) {
        return { type: 8, animation: n, options: e };
      }
      function cv(n) {
        Promise.resolve().then(n);
      }
      class zr {
        constructor(e = 0, t = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + t);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
          this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          cv(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
      }
      class uv {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let t = 0,
            i = 0,
            r = 0;
          const o = this.players.length;
          0 == o
            ? cv(() => this._onFinish())
            : this.players.forEach((s) => {
                s.onDone(() => {
                  ++t == o && this._onFinish();
                }),
                  s.onDestroy(() => {
                    ++i == o && this._onDestroy();
                  }),
                  s.onStart(() => {
                    ++r == o && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (s, a) => Math.max(s, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const t = e * this.totalTime;
          this.players.forEach((i) => {
            const r = i.totalTime ? Math.min(1, t / i.totalTime) : 1;
            i.setPosition(r);
          });
        }
        getPosition() {
          const e = this.players.reduce(
            (t, i) => (null === t || i.totalTime > t.totalTime ? i : t),
            null
          );
          return null != e ? e.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
      }
      let BP = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = tt({ type: n })),
          (n.ɵinj = qe({ imports: [Sn] })),
          n
        );
      })();
      lv([
        Ls({ transform: "{{transform}}", opacity: 0 }),
        sv("{{transition}}"),
      ]),
        lv([
          sv("{{transition}}", Ls({ transform: "{{transform}}", opacity: 0 })),
        ]);
      let ix = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = tt({ type: n })),
          (n.ɵinj = qe({ imports: [Sn, BP, yu, gu] })),
          n
        );
      })();
      function dv(n) {
        return new C(3e3, !1);
      }
      function Vx() {
        return typeof window < "u" && typeof window.document < "u";
      }
      function _u() {
        return (
          typeof process < "u" &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function Mn(n) {
        switch (n.length) {
          case 0:
            return new zr();
          case 1:
            return n[0];
          default:
            return new uv(n);
        }
      }
      function fv(n, e, t, i, r = new Map(), o = new Map()) {
        const s = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (i.forEach((u) => {
            const d = u.get("offset"),
              f = d == l,
              p = (f && c) || new Map();
            u.forEach((h, g) => {
              let m = g,
                v = h;
              if ("offset" !== g)
                switch (((m = e.normalizePropertyName(m, s)), v)) {
                  case "!":
                    v = r.get(g);
                    break;
                  case fn:
                    v = o.get(g);
                    break;
                  default:
                    v = e.normalizeStyleValue(g, m, v, s);
                }
              p.set(m, v);
            }),
              f || a.push(p),
              (c = p),
              (l = d);
          }),
          s.length)
        )
          throw (function Sx(n) {
            return new C(3502, !1);
          })();
        return a;
      }
      function Du(n, e, t, i) {
        switch (e) {
          case "start":
            n.onStart(() => i(t && Eu(t, "start", n)));
            break;
          case "done":
            n.onDone(() => i(t && Eu(t, "done", n)));
            break;
          case "destroy":
            n.onDestroy(() => i(t && Eu(t, "destroy", n)));
        }
      }
      function Eu(n, e, t) {
        const o = wu(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            e || n.phaseName,
            t.totalTime ?? n.totalTime,
            !!t.disabled
          ),
          s = n._data;
        return null != s && (o._data = s), o;
      }
      function wu(n, e, t, i, r = "", o = 0, s) {
        return {
          element: n,
          triggerName: e,
          fromState: t,
          toState: i,
          phaseName: r,
          totalTime: o,
          disabled: !!s,
        };
      }
      function ct(n, e, t) {
        let i = n.get(e);
        return i || n.set(e, (i = t)), i;
      }
      function pv(n) {
        const e = n.indexOf(":");
        return [n.substring(1, e), n.slice(e + 1)];
      }
      let bu = (n, e) => !1,
        hv = (n, e, t) => [],
        gv = null;
      function Cu(n) {
        const e = n.parentNode || n.host;
        return e === gv ? null : e;
      }
      (_u() || typeof Element < "u") &&
        (Vx()
          ? ((gv = (() => document.documentElement)()),
            (bu = (n, e) => {
              for (; e; ) {
                if (e === n) return !0;
                e = Cu(e);
              }
              return !1;
            }))
          : (bu = (n, e) => n.contains(e)),
        (hv = (n, e, t) => {
          if (t) return Array.from(n.querySelectorAll(e));
          const i = n.querySelector(e);
          return i ? [i] : [];
        }));
      let Kn = null,
        mv = !1;
      const yv = bu,
        vv = hv;
      let _v = (() => {
          class n {
            validateStyleProperty(t) {
              return (function Hx(n) {
                Kn ||
                  ((Kn =
                    (function jx() {
                      return typeof document < "u" ? document.body : null;
                    })() || {}),
                  (mv = !!Kn.style && "WebkitAppearance" in Kn.style));
                let e = !0;
                return (
                  Kn.style &&
                    !(function Bx(n) {
                      return "ebkit" == n.substring(1, 6);
                    })(n) &&
                    ((e = n in Kn.style),
                    !e &&
                      mv &&
                      (e =
                        "Webkit" + n.charAt(0).toUpperCase() + n.slice(1) in
                        Kn.style)),
                  e
                );
              })(t);
            }
            matchesElement(t, i) {
              return !1;
            }
            containsElement(t, i) {
              return yv(t, i);
            }
            getParentElement(t) {
              return Cu(t);
            }
            query(t, i, r) {
              return vv(t, i, r);
            }
            computeStyle(t, i, r) {
              return r || "";
            }
            animate(t, i, r, o, s, a = [], l) {
              return new zr(r, o);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = te({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Iu = (() => {
          class n {}
          return (n.NOOP = new _v()), n;
        })();
      const Su = "ng-enter",
        Rs = "ng-leave",
        ks = "ng-trigger",
        Vs = ".ng-trigger",
        Ev = "ng-animating",
        Tu = ".ng-animating";
      function pn(n) {
        if ("number" == typeof n) return n;
        const e = n.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : Mu(parseFloat(e[1]), e[2]);
      }
      function Mu(n, e) {
        return "s" === e ? 1e3 * n : n;
      }
      function Bs(n, e, t) {
        return n.hasOwnProperty("duration")
          ? n
          : (function zx(n, e, t) {
              let r,
                o = 0,
                s = "";
              if ("string" == typeof n) {
                const a = n.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return e.push(dv()), { duration: 0, delay: 0, easing: "" };
                r = Mu(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (o = Mu(parseFloat(l), a[4]));
                const c = a[5];
                c && (s = c);
              } else r = n;
              if (!t) {
                let a = !1,
                  l = e.length;
                r < 0 &&
                  (e.push(
                    (function rx() {
                      return new C(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  o < 0 &&
                    (e.push(
                      (function ox() {
                        return new C(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && e.splice(l, 0, dv());
              }
              return { duration: r, delay: o, easing: s };
            })(n, e, t);
      }
      function Wr(n, e = {}) {
        return (
          Object.keys(n).forEach((t) => {
            e[t] = n[t];
          }),
          e
        );
      }
      function wv(n) {
        const e = new Map();
        return (
          Object.keys(n).forEach((t) => {
            e.set(t, n[t]);
          }),
          e
        );
      }
      function An(n, e = new Map(), t) {
        if (t) for (let [i, r] of t) e.set(i, r);
        for (let [i, r] of n) e.set(i, r);
        return e;
      }
      function Cv(n, e, t) {
        return t ? e + ":" + t + ";" : "";
      }
      function Iv(n) {
        let e = "";
        for (let t = 0; t < n.style.length; t++) {
          const i = n.style.item(t);
          e += Cv(0, i, n.style.getPropertyValue(i));
        }
        for (const t in n.style)
          n.style.hasOwnProperty(t) &&
            !t.startsWith("_") &&
            (e += Cv(0, Kx(t), n.style[t]));
        n.setAttribute("style", e);
      }
      function Kt(n, e, t) {
        n.style &&
          (e.forEach((i, r) => {
            const o = Pu(r);
            t && !t.has(r) && t.set(r, n.style[o]), (n.style[o] = i);
          }),
          _u() && Iv(n));
      }
      function Qn(n, e) {
        n.style &&
          (e.forEach((t, i) => {
            const r = Pu(i);
            n.style[r] = "";
          }),
          _u() && Iv(n));
      }
      function Gr(n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : av(n)) : n;
      }
      const Au = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function Sv(n) {
        let e = [];
        if ("string" == typeof n) {
          let t;
          for (; (t = Au.exec(n)); ) e.push(t[1]);
          Au.lastIndex = 0;
        }
        return e;
      }
      function qr(n, e, t) {
        const i = n.toString(),
          r = i.replace(Au, (o, s) => {
            let a = e[s];
            return (
              null == a &&
                (t.push(
                  (function ax(n) {
                    return new C(3003, !1);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return r == i ? n : r;
      }
      function Hs(n) {
        const e = [];
        let t = n.next();
        for (; !t.done; ) e.push(t.value), (t = n.next());
        return e;
      }
      const qx = /-+([a-z0-9])/g;
      function Pu(n) {
        return n.replace(qx, (...e) => e[1].toUpperCase());
      }
      function Kx(n) {
        return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function ut(n, e, t) {
        switch (e.type) {
          case 7:
            return n.visitTrigger(e, t);
          case 0:
            return n.visitState(e, t);
          case 1:
            return n.visitTransition(e, t);
          case 2:
            return n.visitSequence(e, t);
          case 3:
            return n.visitGroup(e, t);
          case 4:
            return n.visitAnimate(e, t);
          case 5:
            return n.visitKeyframes(e, t);
          case 6:
            return n.visitStyle(e, t);
          case 8:
            return n.visitReference(e, t);
          case 9:
            return n.visitAnimateChild(e, t);
          case 10:
            return n.visitAnimateRef(e, t);
          case 11:
            return n.visitQuery(e, t);
          case 12:
            return n.visitStagger(e, t);
          default:
            throw (function lx(n) {
              return new C(3004, !1);
            })();
        }
      }
      function Tv(n, e) {
        return window.getComputedStyle(n)[e];
      }
      function e1(n, e) {
        const t = [];
        return (
          "string" == typeof n
            ? n.split(/\s*,\s*/).forEach((i) =>
                (function t1(n, e, t) {
                  if (":" == n[0]) {
                    const l = (function n1(n, e) {
                      switch (n) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (t, i) => parseFloat(i) > parseFloat(t);
                        case ":decrement":
                          return (t, i) => parseFloat(i) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              (function wx(n) {
                                return new C(3016, !1);
                              })()
                            ),
                            "* => *"
                          );
                      }
                    })(n, t);
                    if ("function" == typeof l) return void e.push(l);
                    n = l;
                  }
                  const i = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      t.push(
                        (function Ex(n) {
                          return new C(3015, !1);
                        })()
                      ),
                      e
                    );
                  const r = i[1],
                    o = i[2],
                    s = i[3];
                  e.push(Mv(r, s));
                  "<" == o[0] && !("*" == r && "*" == s) && e.push(Mv(s, r));
                })(i, t, e)
              )
            : t.push(n),
          t
        );
      }
      const zs = new Set(["true", "1"]),
        Ws = new Set(["false", "0"]);
      function Mv(n, e) {
        const t = zs.has(n) || Ws.has(n),
          i = zs.has(e) || Ws.has(e);
        return (r, o) => {
          let s = "*" == n || n == r,
            a = "*" == e || e == o;
          return (
            !s && t && "boolean" == typeof r && (s = r ? zs.has(n) : Ws.has(n)),
            !a && i && "boolean" == typeof o && (a = o ? zs.has(e) : Ws.has(e)),
            s && a
          );
        };
      }
      const r1 = new RegExp("s*:selfs*,?", "g");
      function xu(n, e, t, i) {
        return new o1(n).build(e, t, i);
      }
      class o1 {
        constructor(e) {
          this._driver = e;
        }
        build(e, t, i) {
          const r = new l1(t);
          return this._resetContextStyleTimingState(r), ut(this, Gr(e), r);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = new Map()),
            e.collectedStyles.set("", new Map()),
            (e.currentTime = 0);
        }
        visitTrigger(e, t) {
          let i = (t.queryCount = 0),
            r = (t.depCount = 0);
          const o = [],
            s = [];
          return (
            "@" == e.name.charAt(0) &&
              t.errors.push(
                (function ux() {
                  return new C(3006, !1);
                })()
              ),
            e.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(t), 0 == a.type)) {
                const l = a,
                  c = l.name;
                c
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((u) => {
                    (l.name = u), o.push(this.visitState(l, t));
                  }),
                  (l.name = c);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, t);
                (i += l.queryCount), (r += l.depCount), s.push(l);
              } else
                t.errors.push(
                  (function dx() {
                    return new C(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: e.name,
              states: o,
              transitions: s,
              queryCount: i,
              depCount: r,
              options: null,
            }
          );
        }
        visitState(e, t) {
          const i = this.visitStyle(e.styles, t),
            r = (e.options && e.options.params) || null;
          if (i.containsDynamicStyles) {
            const o = new Set(),
              s = r || {};
            i.styles.forEach((a) => {
              a instanceof Map &&
                a.forEach((l) => {
                  Sv(l).forEach((c) => {
                    s.hasOwnProperty(c) || o.add(c);
                  });
                });
            }),
              o.size &&
                (Hs(o.values()),
                t.errors.push(
                  (function fx(n, e) {
                    return new C(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: e.name,
            style: i,
            options: r ? { params: r } : null,
          };
        }
        visitTransition(e, t) {
          (t.queryCount = 0), (t.depCount = 0);
          const i = ut(this, Gr(e.animation), t);
          return {
            type: 1,
            matchers: e1(e.expr, t.errors),
            animation: i,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: Yn(e.options),
          };
        }
        visitSequence(e, t) {
          return {
            type: 2,
            steps: e.steps.map((i) => ut(this, i, t)),
            options: Yn(e.options),
          };
        }
        visitGroup(e, t) {
          const i = t.currentTime;
          let r = 0;
          const o = e.steps.map((s) => {
            t.currentTime = i;
            const a = ut(this, s, t);
            return (r = Math.max(r, t.currentTime)), a;
          });
          return (
            (t.currentTime = r), { type: 3, steps: o, options: Yn(e.options) }
          );
        }
        visitAnimate(e, t) {
          const i = (function u1(n, e) {
            if (n.hasOwnProperty("duration")) return n;
            if ("number" == typeof n) return Nu(Bs(n, e).duration, 0, "");
            const t = n;
            if (
              t
                .split(/\s+/)
                .some((o) => "{" == o.charAt(0) && "{" == o.charAt(1))
            ) {
              const o = Nu(0, 0, "");
              return (o.dynamic = !0), (o.strValue = t), o;
            }
            const r = Bs(t, e);
            return Nu(r.duration, r.delay, r.easing);
          })(e.timings, t.errors);
          t.currentAnimateTimings = i;
          let r,
            o = e.styles ? e.styles : Ls({});
          if (5 == o.type) r = this.visitKeyframes(o, t);
          else {
            let s = e.styles,
              a = !1;
            if (!s) {
              a = !0;
              const c = {};
              i.easing && (c.easing = i.easing), (s = Ls(c));
            }
            t.currentTime += i.duration + i.delay;
            const l = this.visitStyle(s, t);
            (l.isEmptyStep = a), (r = l);
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: i, style: r, options: null }
          );
        }
        visitStyle(e, t) {
          const i = this._makeStyleAst(e, t);
          return this._validateStyleAst(i, t), i;
        }
        _makeStyleAst(e, t) {
          const i = [],
            r = Array.isArray(e.styles) ? e.styles : [e.styles];
          for (let a of r)
            "string" == typeof a
              ? a === fn
                ? i.push(a)
                : t.errors.push(new C(3002, !1))
              : i.push(wv(a));
          let o = !1,
            s = null;
          return (
            i.forEach((a) => {
              if (
                a instanceof Map &&
                (a.has("easing") && ((s = a.get("easing")), a.delete("easing")),
                !o)
              )
                for (let l of a.values())
                  if (l.toString().indexOf("{{") >= 0) {
                    o = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: i,
              easing: s,
              offset: e.offset,
              containsDynamicStyles: o,
              options: null,
            }
          );
        }
        _validateStyleAst(e, t) {
          const i = t.currentAnimateTimings;
          let r = t.currentTime,
            o = t.currentTime;
          i && o > 0 && (o -= i.duration + i.delay),
            e.styles.forEach((s) => {
              "string" != typeof s &&
                s.forEach((a, l) => {
                  const c = t.collectedStyles.get(t.currentQuerySelector),
                    u = c.get(l);
                  let d = !0;
                  u &&
                    (o != r &&
                      o >= u.startTime &&
                      r <= u.endTime &&
                      (t.errors.push(
                        (function hx(n, e, t, i, r) {
                          return new C(3010, !1);
                        })()
                      ),
                      (d = !1)),
                    (o = u.startTime)),
                    d && c.set(l, { startTime: o, endTime: r }),
                    t.options &&
                      (function Gx(n, e, t) {
                        const i = e.params || {},
                          r = Sv(n);
                        r.length &&
                          r.forEach((o) => {
                            i.hasOwnProperty(o) ||
                              t.push(
                                (function sx(n) {
                                  return new C(3001, !1);
                                })()
                              );
                          });
                      })(a, t.options, t.errors);
                });
            });
        }
        visitKeyframes(e, t) {
          const i = { type: 5, styles: [], options: null };
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                (function gx() {
                  return new C(3011, !1);
                })()
              ),
              i
            );
          let o = 0;
          const s = [];
          let a = !1,
            l = !1,
            c = 0;
          const u = e.steps.map((v) => {
            const w = this._makeStyleAst(v, t);
            let y =
                null != w.offset
                  ? w.offset
                  : (function c1(n) {
                      if ("string" == typeof n) return null;
                      let e = null;
                      if (Array.isArray(n))
                        n.forEach((t) => {
                          if (t instanceof Map && t.has("offset")) {
                            const i = t;
                            (e = parseFloat(i.get("offset"))),
                              i.delete("offset");
                          }
                        });
                      else if (n instanceof Map && n.has("offset")) {
                        const t = n;
                        (e = parseFloat(t.get("offset"))), t.delete("offset");
                      }
                      return e;
                    })(w.styles),
              T = 0;
            return (
              null != y && (o++, (T = w.offset = y)),
              (l = l || T < 0 || T > 1),
              (a = a || T < c),
              (c = T),
              s.push(T),
              w
            );
          });
          l &&
            t.errors.push(
              (function mx() {
                return new C(3012, !1);
              })()
            ),
            a &&
              t.errors.push(
                (function yx() {
                  return new C(3200, !1);
                })()
              );
          const d = e.steps.length;
          let f = 0;
          o > 0 && o < d
            ? t.errors.push(
                (function vx() {
                  return new C(3202, !1);
                })()
              )
            : 0 == o && (f = 1 / (d - 1));
          const p = d - 1,
            h = t.currentTime,
            g = t.currentAnimateTimings,
            m = g.duration;
          return (
            u.forEach((v, w) => {
              const y = f > 0 ? (w == p ? 1 : f * w) : s[w],
                T = y * m;
              (t.currentTime = h + g.delay + T),
                (g.duration = T),
                this._validateStyleAst(v, t),
                (v.offset = y),
                i.styles.push(v);
            }),
            i
          );
        }
        visitReference(e, t) {
          return {
            type: 8,
            animation: ut(this, Gr(e.animation), t),
            options: Yn(e.options),
          };
        }
        visitAnimateChild(e, t) {
          return t.depCount++, { type: 9, options: Yn(e.options) };
        }
        visitAnimateRef(e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: Yn(e.options),
          };
        }
        visitQuery(e, t) {
          const i = t.currentQuerySelector,
            r = e.options || {};
          t.queryCount++, (t.currentQuery = e);
          const [o, s] = (function s1(n) {
            const e = !!n.split(/\s*,\s*/).find((t) => ":self" == t);
            return (
              e && (n = n.replace(r1, "")),
              (n = n
                .replace(/@\*/g, Vs)
                .replace(/@\w+/g, (t) => Vs + "-" + t.slice(1))
                .replace(/:animating/g, Tu)),
              [n, e]
            );
          })(e.selector);
          (t.currentQuerySelector = i.length ? i + " " + o : o),
            ct(t.collectedStyles, t.currentQuerySelector, new Map());
          const a = ut(this, Gr(e.animation), t);
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = i),
            {
              type: 11,
              selector: o,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: s,
              animation: a,
              originalSelector: e.selector,
              options: Yn(e.options),
            }
          );
        }
        visitStagger(e, t) {
          t.currentQuery ||
            t.errors.push(
              (function _x() {
                return new C(3013, !1);
              })()
            );
          const i =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Bs(e.timings, t.errors, !0);
          return {
            type: 12,
            animation: ut(this, Gr(e.animation), t),
            timings: i,
            options: null,
          };
        }
      }
      class l1 {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function Yn(n) {
        return (
          n
            ? (n = Wr(n)).params &&
              (n.params = (function a1(n) {
                return n ? Wr(n) : null;
              })(n.params))
            : (n = {}),
          n
        );
      }
      function Nu(n, e, t) {
        return { duration: n, delay: e, easing: t };
      }
      function Ou(n, e, t, i, r, o, s = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: e,
          preStyleProps: t,
          postStyleProps: i,
          duration: r,
          delay: o,
          totalTime: r + o,
          easing: s,
          subTimeline: a,
        };
      }
      class Gs {
        constructor() {
          this._map = new Map();
        }
        get(e) {
          return this._map.get(e) || [];
        }
        append(e, t) {
          let i = this._map.get(e);
          i || this._map.set(e, (i = [])), i.push(...t);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const p1 = new RegExp(":enter", "g"),
        g1 = new RegExp(":leave", "g");
      function Fu(n, e, t, i, r, o = new Map(), s = new Map(), a, l, c = []) {
        return new m1().buildKeyframes(n, e, t, i, r, o, s, a, l, c);
      }
      class m1 {
        buildKeyframes(e, t, i, r, o, s, a, l, c, u = []) {
          c = c || new Gs();
          const d = new Lu(e, t, c, r, o, u, []);
          d.options = l;
          const f = l.delay ? pn(l.delay) : 0;
          d.currentTimeline.delayNextStep(f),
            d.currentTimeline.setStyles([s], null, d.errors, l),
            ut(this, i, d);
          const p = d.timelines.filter((h) => h.containsAnimation());
          if (p.length && a.size) {
            let h;
            for (let g = p.length - 1; g >= 0; g--) {
              const m = p[g];
              if (m.element === t) {
                h = m;
                break;
              }
            }
            h &&
              !h.allowOnlyTimelineStyles() &&
              h.setStyles([a], null, d.errors, l);
          }
          return p.length
            ? p.map((h) => h.buildKeyframes())
            : [Ou(t, [], [], [], 0, f, "", !1)];
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
          const i = t.subInstructions.get(t.element);
          if (i) {
            const r = t.createSubContext(e.options),
              o = t.currentTimeline.currentTime,
              s = this._visitSubInstructions(i, r, r.options);
            o != s && t.transformIntoNewTimeline(s);
          }
          t.previousNode = e;
        }
        visitAnimateRef(e, t) {
          const i = t.createSubContext(e.options);
          i.transformIntoNewTimeline(),
            this._applyAnimationRefDelays(
              [e.options, e.animation.options],
              t,
              i
            ),
            this.visitReference(e.animation, i),
            t.transformIntoNewTimeline(i.currentTimeline.currentTime),
            (t.previousNode = e);
        }
        _applyAnimationRefDelays(e, t, i) {
          for (const r of e) {
            const o = r?.delay;
            if (o) {
              const s =
                "number" == typeof o ? o : pn(qr(o, r?.params ?? {}, t.errors));
              i.delayNextStep(s);
            }
          }
        }
        _visitSubInstructions(e, t, i) {
          let o = t.currentTimeline.currentTime;
          const s = null != i.duration ? pn(i.duration) : null,
            a = null != i.delay ? pn(i.delay) : null;
          return (
            0 !== s &&
              e.forEach((l) => {
                const c = t.appendInstructionToTimeline(l, s, a);
                o = Math.max(o, c.duration + c.delay);
              }),
            o
          );
        }
        visitReference(e, t) {
          t.updateOptions(e.options, !0),
            ut(this, e.animation, t),
            (t.previousNode = e);
        }
        visitSequence(e, t) {
          const i = t.subContextCount;
          let r = t;
          const o = e.options;
          if (
            o &&
            (o.params || o.delay) &&
            ((r = t.createSubContext(o)),
            r.transformIntoNewTimeline(),
            null != o.delay)
          ) {
            6 == r.previousNode.type &&
              (r.currentTimeline.snapshotCurrentStyles(),
              (r.previousNode = qs));
            const s = pn(o.delay);
            r.delayNextStep(s);
          }
          e.steps.length &&
            (e.steps.forEach((s) => ut(this, s, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > i && r.transformIntoNewTimeline()),
            (t.previousNode = e);
        }
        visitGroup(e, t) {
          const i = [];
          let r = t.currentTimeline.currentTime;
          const o = e.options && e.options.delay ? pn(e.options.delay) : 0;
          e.steps.forEach((s) => {
            const a = t.createSubContext(e.options);
            o && a.delayNextStep(o),
              ut(this, s, a),
              (r = Math.max(r, a.currentTimeline.currentTime)),
              i.push(a.currentTimeline);
          }),
            i.forEach((s) => t.currentTimeline.mergeTimelineCollectedStyles(s)),
            t.transformIntoNewTimeline(r),
            (t.previousNode = e);
        }
        _visitTiming(e, t) {
          if (e.dynamic) {
            const i = e.strValue;
            return Bs(t.params ? qr(i, t.params, t.errors) : i, t.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, t) {
          const i = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
            r = t.currentTimeline;
          i.delay && (t.incrementTime(i.delay), r.snapshotCurrentStyles());
          const o = e.style;
          5 == o.type
            ? this.visitKeyframes(o, t)
            : (t.incrementTime(i.duration),
              this.visitStyle(o, t),
              r.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = e);
        }
        visitStyle(e, t) {
          const i = t.currentTimeline,
            r = t.currentAnimateTimings;
          !r && i.hasCurrentStyleProperties() && i.forwardFrame();
          const o = (r && r.easing) || e.easing;
          e.isEmptyStep
            ? i.applyEmptyStep(o)
            : i.setStyles(e.styles, o, t.errors, t.options),
            (t.previousNode = e);
        }
        visitKeyframes(e, t) {
          const i = t.currentAnimateTimings,
            r = t.currentTimeline.duration,
            o = i.duration,
            a = t.createSubContext().currentTimeline;
          (a.easing = i.easing),
            e.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * o),
                a.setStyles(l.styles, l.easing, t.errors, t.options),
                a.applyStylesToKeyframe();
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(a),
            t.transformIntoNewTimeline(r + o),
            (t.previousNode = e);
        }
        visitQuery(e, t) {
          const i = t.currentTimeline.currentTime,
            r = e.options || {},
            o = r.delay ? pn(r.delay) : 0;
          o &&
            (6 === t.previousNode.type ||
              (0 == i && t.currentTimeline.hasCurrentStyleProperties())) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = qs));
          let s = i;
          const a = t.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!r.optional,
            t.errors
          );
          t.currentQueryTotal = a.length;
          let l = null;
          a.forEach((c, u) => {
            t.currentQueryIndex = u;
            const d = t.createSubContext(e.options, c);
            o && d.delayNextStep(o),
              c === t.element && (l = d.currentTimeline),
              ut(this, e.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, d.currentTimeline.currentTime));
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(s),
            l &&
              (t.currentTimeline.mergeTimelineCollectedStyles(l),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = e);
        }
        visitStagger(e, t) {
          const i = t.parentContext,
            r = t.currentTimeline,
            o = e.timings,
            s = Math.abs(o.duration),
            a = s * (t.currentQueryTotal - 1);
          let l = s * t.currentQueryIndex;
          switch (o.duration < 0 ? "reverse" : o.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = i.currentStaggerTime;
          }
          const u = t.currentTimeline;
          l && u.delayNextStep(l);
          const d = u.currentTime;
          ut(this, e.animation, t),
            (t.previousNode = e),
            (i.currentStaggerTime =
              r.currentTime - d + (r.startTime - i.currentTimeline.startTime));
        }
      }
      const qs = {};
      class Lu {
        constructor(e, t, i, r, o, s, a, l) {
          (this._driver = e),
            (this.element = t),
            (this.subInstructions = i),
            (this._enterClassName = r),
            (this._leaveClassName = o),
            (this.errors = s),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = qs),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new Ks(this._driver, t, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, t) {
          if (!e) return;
          const i = e;
          let r = this.options;
          null != i.duration && (r.duration = pn(i.duration)),
            null != i.delay && (r.delay = pn(i.delay));
          const o = i.params;
          if (o) {
            let s = r.params;
            s || (s = this.options.params = {}),
              Object.keys(o).forEach((a) => {
                (!t || !s.hasOwnProperty(a)) &&
                  (s[a] = qr(o[a], s, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const i = (e.params = {});
              Object.keys(t).forEach((r) => {
                i[r] = t[r];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, t, i) {
          const r = t || this.element,
            o = new Lu(
              this._driver,
              r,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(r, i || 0)
            );
          return (
            (o.previousNode = this.previousNode),
            (o.currentAnimateTimings = this.currentAnimateTimings),
            (o.options = this._copyOptions()),
            o.updateOptions(e),
            (o.currentQueryIndex = this.currentQueryIndex),
            (o.currentQueryTotal = this.currentQueryTotal),
            (o.parentContext = this),
            this.subContextCount++,
            o
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = qs),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, t, i) {
          const r = {
              duration: t ?? e.duration,
              delay: this.currentTimeline.currentTime + (i ?? 0) + e.delay,
              easing: "",
            },
            o = new y1(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              r,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(o), r;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, t, i, r, o, s) {
          let a = [];
          if ((r && a.push(this.element), e.length > 0)) {
            e = (e = e.replace(p1, "." + this._enterClassName)).replace(
              g1,
              "." + this._leaveClassName
            );
            let c = this._driver.query(this.element, e, 1 != i);
            0 !== i &&
              (c = i < 0 ? c.slice(c.length + i, c.length) : c.slice(0, i)),
              a.push(...c);
          }
          return (
            !o &&
              0 == a.length &&
              s.push(
                (function Dx(n) {
                  return new C(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class Ks {
        constructor(e, t, i, r) {
          (this._driver = e),
            (this.element = t),
            (this.startTime = i),
            (this._elementTimelineStylesLookup = r),
            (this.duration = 0),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(t)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const t = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || t
            ? (this.forwardTime(this.currentTime + e),
              t && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, t) {
          return (
            this.applyStylesToKeyframe(),
            new Ks(
              this._driver,
              e,
              t || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, t) {
          this._localTimelineStyles.set(e, t),
            this._globalTimelineStyles.set(e, t),
            this._styleSummary.set(e, { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && this._previousKeyframe.set("easing", e);
          for (let [t, i] of this._globalTimelineStyles)
            this._backFill.set(t, i || fn), this._currentKeyframe.set(t, fn);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(e, t, i, r) {
          t && this._previousKeyframe.set("easing", t);
          const o = (r && r.params) || {},
            s = (function v1(n, e) {
              const t = new Map();
              let i;
              return (
                n.forEach((r) => {
                  if ("*" === r) {
                    i = i || e.keys();
                    for (let o of i) t.set(o, fn);
                  } else An(r, t);
                }),
                t
              );
            })(e, this._globalTimelineStyles);
          for (let [a, l] of s) {
            const c = qr(l, o, i);
            this._pendingStyles.set(a, c),
              this._localTimelineStyles.has(a) ||
                this._backFill.set(a, this._globalTimelineStyles.get(a) ?? fn),
              this._updateStyle(a, c);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((e, t) => {
              this._currentKeyframe.set(t, e);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((e, t) => {
              this._currentKeyframe.has(t) || this._currentKeyframe.set(t, e);
            }));
        }
        snapshotCurrentStyles() {
          for (let [e, t] of this._localTimelineStyles)
            this._pendingStyles.set(e, t), this._updateStyle(e, t);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let t in this._currentKeyframe) e.push(t);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          e._styleSummary.forEach((t, i) => {
            const r = this._styleSummary.get(i);
            (!r || t.time > r.time) && this._updateStyle(i, t.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            t = new Set(),
            i = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((a, l) => {
            const c = An(a, new Map(), this._backFill);
            c.forEach((u, d) => {
              "!" === u ? e.add(d) : u === fn && t.add(d);
            }),
              i || c.set("offset", l / this.duration),
              r.push(c);
          });
          const o = e.size ? Hs(e.values()) : [],
            s = t.size ? Hs(t.values()) : [];
          if (i) {
            const a = r[0],
              l = new Map(a);
            a.set("offset", 0), l.set("offset", 1), (r = [a, l]);
          }
          return Ou(
            this.element,
            r,
            o,
            s,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class y1 extends Ks {
        constructor(e, t, i, r, o, s, a = !1) {
          super(e, t, s.delay),
            (this.keyframes = i),
            (this.preStyleProps = r),
            (this.postStyleProps = o),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: s.duration,
              delay: s.delay,
              easing: s.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: t, duration: i, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const o = [],
              s = i + t,
              a = t / s,
              l = An(e[0]);
            l.set("offset", 0), o.push(l);
            const c = An(e[0]);
            c.set("offset", xv(a)), o.push(c);
            const u = e.length - 1;
            for (let d = 1; d <= u; d++) {
              let f = An(e[d]);
              const p = f.get("offset");
              f.set("offset", xv((t + p * i) / s)), o.push(f);
            }
            (i = s), (t = 0), (r = ""), (e = o);
          }
          return Ou(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            i,
            t,
            r,
            !0
          );
        }
      }
      function xv(n, e = 3) {
        const t = Math.pow(10, e - 1);
        return Math.round(n * t) / t;
      }
      class Ru {}
      const _1 = new Set([
        "width",
        "height",
        "minWidth",
        "minHeight",
        "maxWidth",
        "maxHeight",
        "left",
        "top",
        "bottom",
        "right",
        "fontSize",
        "outlineWidth",
        "outlineOffset",
        "paddingTop",
        "paddingLeft",
        "paddingBottom",
        "paddingRight",
        "marginTop",
        "marginLeft",
        "marginBottom",
        "marginRight",
        "borderRadius",
        "borderWidth",
        "borderTopWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "textIndent",
        "perspective",
      ]);
      class D1 extends Ru {
        normalizePropertyName(e, t) {
          return Pu(e);
        }
        normalizeStyleValue(e, t, i, r) {
          let o = "";
          const s = i.toString().trim();
          if (_1.has(t) && 0 !== i && "0" !== i)
            if ("number" == typeof i) o = "px";
            else {
              const a = i.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                r.push(
                  (function cx(n, e) {
                    return new C(3005, !1);
                  })()
                );
            }
          return s + o;
        }
      }
      function Nv(n, e, t, i, r, o, s, a, l, c, u, d, f) {
        return {
          type: 0,
          element: n,
          triggerName: e,
          isRemovalTransition: r,
          fromState: t,
          fromStyles: o,
          toState: i,
          toStyles: s,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: d,
          errors: f,
        };
      }
      const ku = {};
      class Ov {
        constructor(e, t, i) {
          (this._triggerName = e), (this.ast = t), (this._stateStyles = i);
        }
        match(e, t, i, r) {
          return (function E1(n, e, t, i, r) {
            return n.some((o) => o(e, t, i, r));
          })(this.ast.matchers, e, t, i, r);
        }
        buildStyles(e, t, i) {
          let r = this._stateStyles.get("*");
          return (
            void 0 !== e && (r = this._stateStyles.get(e?.toString()) || r),
            r ? r.buildStyles(t, i) : new Map()
          );
        }
        build(e, t, i, r, o, s, a, l, c, u) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || ku,
            h = this.buildStyles(i, (a && a.params) || ku, d),
            g = (l && l.params) || ku,
            m = this.buildStyles(r, g, d),
            v = new Set(),
            w = new Map(),
            y = new Map(),
            T = "void" === r,
            z = { params: w1(g, f), delay: this.ast.options?.delay },
            K = u ? [] : Fu(e, t, this.ast.animation, o, s, h, m, z, c, d);
          let pe = 0;
          if (
            (K.forEach((ft) => {
              pe = Math.max(ft.duration + ft.delay, pe);
            }),
            d.length)
          )
            return Nv(t, this._triggerName, i, r, T, h, m, [], [], w, y, pe, d);
          K.forEach((ft) => {
            const pt = ft.element,
              ji = ct(w, pt, new Set());
            ft.preStyleProps.forEach((Bt) => ji.add(Bt));
            const hn = ct(y, pt, new Set());
            ft.postStyleProps.forEach((Bt) => hn.add(Bt)),
              pt !== t && v.add(pt);
          });
          const dt = Hs(v.values());
          return Nv(t, this._triggerName, i, r, T, h, m, K, dt, w, y, pe);
        }
      }
      function w1(n, e) {
        const t = Wr(e);
        for (const i in n) n.hasOwnProperty(i) && null != n[i] && (t[i] = n[i]);
        return t;
      }
      class b1 {
        constructor(e, t, i) {
          (this.styles = e), (this.defaultParams = t), (this.normalizer = i);
        }
        buildStyles(e, t) {
          const i = new Map(),
            r = Wr(this.defaultParams);
          return (
            Object.keys(e).forEach((o) => {
              const s = e[o];
              null !== s && (r[o] = s);
            }),
            this.styles.styles.forEach((o) => {
              "string" != typeof o &&
                o.forEach((s, a) => {
                  s && (s = qr(s, r, t));
                  const l = this.normalizer.normalizePropertyName(a, t);
                  (s = this.normalizer.normalizeStyleValue(a, l, s, t)),
                    i.set(l, s);
                });
            }),
            i
          );
        }
      }
      class I1 {
        constructor(e, t, i) {
          (this.name = e),
            (this.ast = t),
            (this._normalizer = i),
            (this.transitionFactories = []),
            (this.states = new Map()),
            t.states.forEach((r) => {
              this.states.set(
                r.name,
                new b1(r.style, (r.options && r.options.params) || {}, i)
              );
            }),
            Fv(this.states, "true", "1"),
            Fv(this.states, "false", "0"),
            t.transitions.forEach((r) => {
              this.transitionFactories.push(new Ov(e, r, this.states));
            }),
            (this.fallbackTransition = (function S1(n, e, t) {
              return new Ov(
                n,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(s, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                e
              );
            })(e, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, t, i, r) {
          return (
            this.transitionFactories.find((s) => s.match(e, t, i, r)) || null
          );
        }
        matchStyles(e, t, i) {
          return this.fallbackTransition.buildStyles(e, t, i);
        }
      }
      function Fv(n, e, t) {
        n.has(e)
          ? n.has(t) || n.set(t, n.get(e))
          : n.has(t) && n.set(e, n.get(t));
      }
      const T1 = new Gs();
      class M1 {
        constructor(e, t, i) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = i),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(e, t) {
          const i = [],
            o = xu(this._driver, t, i, []);
          if (i.length)
            throw (function Tx(n) {
              return new C(3503, !1);
            })();
          this._animations.set(e, o);
        }
        _buildPlayer(e, t, i) {
          const r = e.element,
            o = fv(0, this._normalizer, 0, e.keyframes, t, i);
          return this._driver.animate(
            r,
            o,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, t, i = {}) {
          const r = [],
            o = this._animations.get(e);
          let s;
          const a = new Map();
          if (
            (o
              ? ((s = Fu(
                  this._driver,
                  t,
                  o,
                  Su,
                  Rs,
                  new Map(),
                  new Map(),
                  i,
                  T1,
                  r
                )),
                s.forEach((u) => {
                  const d = ct(a, u.element, new Map());
                  u.postStyleProps.forEach((f) => d.set(f, null));
                }))
              : (r.push(
                  (function Mx() {
                    return new C(3300, !1);
                  })()
                ),
                (s = [])),
            r.length)
          )
            throw (function Ax(n) {
              return new C(3504, !1);
            })();
          a.forEach((u, d) => {
            u.forEach((f, p) => {
              u.set(p, this._driver.computeStyle(d, p, fn));
            });
          });
          const c = Mn(
            s.map((u) => {
              const d = a.get(u.element);
              return this._buildPlayer(u, new Map(), d);
            })
          );
          return (
            this._playersById.set(e, c),
            c.onDestroy(() => this.destroy(e)),
            this.players.push(c),
            c
          );
        }
        destroy(e) {
          const t = this._getPlayer(e);
          t.destroy(), this._playersById.delete(e);
          const i = this.players.indexOf(t);
          i >= 0 && this.players.splice(i, 1);
        }
        _getPlayer(e) {
          const t = this._playersById.get(e);
          if (!t)
            throw (function Px(n) {
              return new C(3301, !1);
            })();
          return t;
        }
        listen(e, t, i, r) {
          const o = wu(t, "", "", "");
          return Du(this._getPlayer(e), i, o, r), () => {};
        }
        command(e, t, i, r) {
          if ("register" == i) return void this.register(e, r[0]);
          if ("create" == i) return void this.create(e, t, r[0] || {});
          const o = this._getPlayer(e);
          switch (i) {
            case "play":
              o.play();
              break;
            case "pause":
              o.pause();
              break;
            case "reset":
              o.reset();
              break;
            case "restart":
              o.restart();
              break;
            case "finish":
              o.finish();
              break;
            case "init":
              o.init();
              break;
            case "setPosition":
              o.setPosition(parseFloat(r[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const Lv = "ng-animate-queued",
        Vu = "ng-animate-disabled",
        O1 = [],
        Rv = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        F1 = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        wt = "__ng_removed";
      class Bu {
        constructor(e, t = "") {
          this.namespaceId = t;
          const i = e && e.hasOwnProperty("value");
          if (
            ((this.value = (function V1(n) {
              return n ?? null;
            })(i ? e.value : e)),
            i)
          ) {
            const o = Wr(e);
            delete o.value, (this.options = o);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const t = e.params;
          if (t) {
            const i = this.options.params;
            Object.keys(t).forEach((r) => {
              null == i[r] && (i[r] = t[r]);
            });
          }
        }
      }
      const Kr = "void",
        Hu = new Bu(Kr);
      class L1 {
        constructor(e, t, i) {
          (this.id = e),
            (this.hostElement = t),
            (this._engine = i),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            bt(t, this._hostClassName);
        }
        listen(e, t, i, r) {
          if (!this._triggers.has(t))
            throw (function xx(n, e) {
              return new C(3302, !1);
            })();
          if (null == i || 0 == i.length)
            throw (function Nx(n) {
              return new C(3303, !1);
            })();
          if (
            !(function B1(n) {
              return "start" == n || "done" == n;
            })(i)
          )
            throw (function Ox(n, e) {
              return new C(3400, !1);
            })();
          const o = ct(this._elementListeners, e, []),
            s = { name: t, phase: i, callback: r };
          o.push(s);
          const a = ct(this._engine.statesByElement, e, new Map());
          return (
            a.has(t) || (bt(e, ks), bt(e, ks + "-" + t), a.set(t, Hu)),
            () => {
              this._engine.afterFlush(() => {
                const l = o.indexOf(s);
                l >= 0 && o.splice(l, 1), this._triggers.has(t) || a.delete(t);
              });
            }
          );
        }
        register(e, t) {
          return !this._triggers.has(e) && (this._triggers.set(e, t), !0);
        }
        _getTrigger(e) {
          const t = this._triggers.get(e);
          if (!t)
            throw (function Fx(n) {
              return new C(3401, !1);
            })();
          return t;
        }
        trigger(e, t, i, r = !0) {
          const o = this._getTrigger(t),
            s = new ju(this.id, t, e);
          let a = this._engine.statesByElement.get(e);
          a ||
            (bt(e, ks),
            bt(e, ks + "-" + t),
            this._engine.statesByElement.set(e, (a = new Map())));
          let l = a.get(t);
          const c = new Bu(i, this.id);
          if (
            (!(i && i.hasOwnProperty("value")) &&
              l &&
              c.absorbOptions(l.options),
            a.set(t, c),
            l || (l = Hu),
            c.value !== Kr && l.value === c.value)
          ) {
            if (
              !(function $1(n, e) {
                const t = Object.keys(n),
                  i = Object.keys(e);
                if (t.length != i.length) return !1;
                for (let r = 0; r < t.length; r++) {
                  const o = t[r];
                  if (!e.hasOwnProperty(o) || n[o] !== e[o]) return !1;
                }
                return !0;
              })(l.params, c.params)
            ) {
              const g = [],
                m = o.matchStyles(l.value, l.params, g),
                v = o.matchStyles(c.value, c.params, g);
              g.length
                ? this._engine.reportError(g)
                : this._engine.afterFlush(() => {
                    Qn(e, m), Kt(e, v);
                  });
            }
            return;
          }
          const f = ct(this._engine.playersByElement, e, []);
          f.forEach((g) => {
            g.namespaceId == this.id &&
              g.triggerName == t &&
              g.queued &&
              g.destroy();
          });
          let p = o.matchTransition(l.value, c.value, e, c.params),
            h = !1;
          if (!p) {
            if (!r) return;
            (p = o.fallbackTransition), (h = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: t,
              transition: p,
              fromState: l,
              toState: c,
              player: s,
              isFallbackTransition: h,
            }),
            h ||
              (bt(e, Lv),
              s.onStart(() => {
                Hi(e, Lv);
              })),
            s.onDone(() => {
              let g = this.players.indexOf(s);
              g >= 0 && this.players.splice(g, 1);
              const m = this._engine.playersByElement.get(e);
              if (m) {
                let v = m.indexOf(s);
                v >= 0 && m.splice(v, 1);
              }
            }),
            this.players.push(s),
            f.push(s),
            s
          );
        }
        deregister(e) {
          this._triggers.delete(e),
            this._engine.statesByElement.forEach((t) => t.delete(e)),
            this._elementListeners.forEach((t, i) => {
              this._elementListeners.set(
                i,
                t.filter((r) => r.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const t = this._engine.playersByElement.get(e);
          t &&
            (t.forEach((i) => i.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, t) {
          const i = this._engine.driver.query(e, Vs, !0);
          i.forEach((r) => {
            if (r[wt]) return;
            const o = this._engine.fetchNamespacesByElement(r);
            o.size
              ? o.forEach((s) => s.triggerLeaveAnimation(r, t, !1, !0))
              : this.clearElementCache(r);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              i.forEach((r) => this.clearElementCache(r))
            );
        }
        triggerLeaveAnimation(e, t, i, r) {
          const o = this._engine.statesByElement.get(e),
            s = new Map();
          if (o) {
            const a = [];
            if (
              (o.forEach((l, c) => {
                if ((s.set(c, l.value), this._triggers.has(c))) {
                  const u = this.trigger(e, c, Kr, r);
                  u && a.push(u);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, t, s),
                i && Mn(a).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const t = this._elementListeners.get(e),
            i = this._engine.statesByElement.get(e);
          if (t && i) {
            const r = new Set();
            t.forEach((o) => {
              const s = o.name;
              if (r.has(s)) return;
              r.add(s);
              const l = this._triggers.get(s).fallbackTransition,
                c = i.get(s) || Hu,
                u = new Bu(Kr),
                d = new ju(this.id, s, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: s,
                  transition: l,
                  fromState: c,
                  toState: u,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(e, t) {
          const i = this._engine;
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
            this.triggerLeaveAnimation(e, t, !0))
          )
            return;
          let r = !1;
          if (i.totalAnimations) {
            const o = i.players.length ? i.playersByQueriedElement.get(e) : [];
            if (o && o.length) r = !0;
            else {
              let s = e;
              for (; (s = s.parentNode); )
                if (i.statesByElement.get(s)) {
                  r = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), r))
            i.markElementAsRemoved(this.id, e, !1, t);
          else {
            const o = e[wt];
            (!o || o === Rv) &&
              (i.afterFlush(() => this.clearElementCache(e)),
              i.destroyInnerAnimations(e),
              i._onRemovalComplete(e, t));
          }
        }
        insertNode(e, t) {
          bt(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const t = [];
          return (
            this._queue.forEach((i) => {
              const r = i.player;
              if (r.destroyed) return;
              const o = i.element,
                s = this._elementListeners.get(o);
              s &&
                s.forEach((a) => {
                  if (a.name == i.triggerName) {
                    const l = wu(
                      o,
                      i.triggerName,
                      i.fromState.value,
                      i.toState.value
                    );
                    (l._data = e), Du(i.player, a.phase, l, a.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : t.push(i);
            }),
            (this._queue = []),
            t.sort((i, r) => {
              const o = i.transition.ast.depCount,
                s = r.transition.ast.depCount;
              return 0 == o || 0 == s
                ? o - s
                : this._engine.driver.containsElement(i.element, r.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let t = !1;
          return (
            this._elementListeners.has(e) && (t = !0),
            (t = !!this._queue.find((i) => i.element === e) || t),
            t
          );
        }
      }
      class R1 {
        constructor(e, t, i) {
          (this.bodyNode = e),
            (this.driver = t),
            (this._normalizer = i),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (r, o) => {});
        }
        _onRemovalComplete(e, t) {
          this.onRemovalComplete(e, t);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((t) => {
              t.players.forEach((i) => {
                i.queued && e.push(i);
              });
            }),
            e
          );
        }
        createNamespace(e, t) {
          const i = new L1(e, t, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, t)
              ? this._balanceNamespaceList(i, t)
              : (this.newHostElements.set(t, i), this.collectEnterElement(t)),
            (this._namespaceLookup[e] = i)
          );
        }
        _balanceNamespaceList(e, t) {
          const i = this._namespaceList,
            r = this.namespacesByHostElement;
          if (i.length - 1 >= 0) {
            let s = !1,
              a = this.driver.getParentElement(t);
            for (; a; ) {
              const l = r.get(a);
              if (l) {
                const c = i.indexOf(l);
                i.splice(c + 1, 0, e), (s = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            s || i.unshift(e);
          } else i.push(e);
          return r.set(t, e), e;
        }
        register(e, t) {
          let i = this._namespaceLookup[e];
          return i || (i = this.createNamespace(e, t)), i;
        }
        registerTrigger(e, t, i) {
          let r = this._namespaceLookup[e];
          r && r.register(t, i) && this.totalAnimations++;
        }
        destroy(e, t) {
          if (!e) return;
          const i = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(i.hostElement),
              delete this._namespaceLookup[e];
            const r = this._namespaceList.indexOf(i);
            r >= 0 && this._namespaceList.splice(r, 1);
          }),
            this.afterFlushAnimationsDone(() => i.destroy(t));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const t = new Set(),
            i = this.statesByElement.get(e);
          if (i)
            for (let r of i.values())
              if (r.namespaceId) {
                const o = this._fetchNamespace(r.namespaceId);
                o && t.add(o);
              }
          return t;
        }
        trigger(e, t, i, r) {
          if (Qs(t)) {
            const o = this._fetchNamespace(e);
            if (o) return o.trigger(t, i, r), !0;
          }
          return !1;
        }
        insertNode(e, t, i, r) {
          if (!Qs(t)) return;
          const o = t[wt];
          if (o && o.setForRemoval) {
            (o.setForRemoval = !1), (o.setForMove = !0);
            const s = this.collectedLeaveElements.indexOf(t);
            s >= 0 && this.collectedLeaveElements.splice(s, 1);
          }
          if (e) {
            const s = this._fetchNamespace(e);
            s && s.insertNode(t, i);
          }
          r && this.collectEnterElement(t);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, t) {
          t
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), bt(e, Vu))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), Hi(e, Vu));
        }
        removeNode(e, t, i, r) {
          if (Qs(t)) {
            const o = e ? this._fetchNamespace(e) : null;
            if (
              (o ? o.removeNode(t, r) : this.markElementAsRemoved(e, t, !1, r),
              i)
            ) {
              const s = this.namespacesByHostElement.get(t);
              s && s.id !== e && s.removeNode(t, r);
            }
          } else this._onRemovalComplete(t, r);
        }
        markElementAsRemoved(e, t, i, r, o) {
          this.collectedLeaveElements.push(t),
            (t[wt] = {
              namespaceId: e,
              setForRemoval: r,
              hasAnimation: i,
              removedBeforeQueried: !1,
              previousTriggersValues: o,
            });
        }
        listen(e, t, i, r, o) {
          return Qs(t) ? this._fetchNamespace(e).listen(t, i, r, o) : () => {};
        }
        _buildInstruction(e, t, i, r, o) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            i,
            r,
            e.fromState.options,
            e.toState.options,
            t,
            o
          );
        }
        destroyInnerAnimations(e) {
          let t = this.driver.query(e, Vs, !0);
          t.forEach((i) => this.destroyActiveAnimationsForElement(i)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(e, Tu, !0)),
              t.forEach((i) => this.finishActiveQueriedAnimationOnElement(i)));
        }
        destroyActiveAnimationsForElement(e) {
          const t = this.playersByElement.get(e);
          t &&
            t.forEach((i) => {
              i.queued ? (i.markedForDestroy = !0) : i.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const t = this.playersByQueriedElement.get(e);
          t && t.forEach((i) => i.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return Mn(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          const t = e[wt];
          if (t && t.setForRemoval) {
            if (((e[wt] = Rv), t.namespaceId)) {
              this.destroyInnerAnimations(e);
              const i = this._fetchNamespace(t.namespaceId);
              i && i.clearElementCache(e);
            }
            this._onRemovalComplete(e, t.setForRemoval);
          }
          e.classList?.contains(Vu) && this.markElementAsDisabled(e, !1),
            this.driver.query(e, ".ng-animate-disabled", !0).forEach((i) => {
              this.markElementAsDisabled(i, !1);
            });
        }
        flush(e = -1) {
          let t = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((i, r) =>
                this._balanceNamespaceList(i, r)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let i = 0; i < this.collectedEnterElements.length; i++)
              bt(this.collectedEnterElements[i], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const i = [];
            try {
              t = this._flushAnimations(i, e);
            } finally {
              for (let r = 0; r < i.length; r++) i[r]();
            }
          } else
            for (let i = 0; i < this.collectedLeaveElements.length; i++)
              this.processLeaveNode(this.collectedLeaveElements[i]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((i) => i()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const i = this._whenQuietFns;
            (this._whenQuietFns = []),
              t.length
                ? Mn(t).onDone(() => {
                    i.forEach((r) => r());
                  })
                : i.forEach((r) => r());
          }
        }
        reportError(e) {
          throw (function Lx(n) {
            return new C(3402, !1);
          })();
        }
        _flushAnimations(e, t) {
          const i = new Gs(),
            r = [],
            o = new Map(),
            s = [],
            a = new Map(),
            l = new Map(),
            c = new Map(),
            u = new Set();
          this.disabledNodes.forEach((M) => {
            u.add(M);
            const A = this.driver.query(M, ".ng-animate-queued", !0);
            for (let O = 0; O < A.length; O++) u.add(A[O]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            p = Bv(f, this.collectedEnterElements),
            h = new Map();
          let g = 0;
          p.forEach((M, A) => {
            const O = Su + g++;
            h.set(A, O), M.forEach((Y) => bt(Y, O));
          });
          const m = [],
            v = new Set(),
            w = new Set();
          for (let M = 0; M < this.collectedLeaveElements.length; M++) {
            const A = this.collectedLeaveElements[M],
              O = A[wt];
            O &&
              O.setForRemoval &&
              (m.push(A),
              v.add(A),
              O.hasAnimation
                ? this.driver
                    .query(A, ".ng-star-inserted", !0)
                    .forEach((Y) => v.add(Y))
                : w.add(A));
          }
          const y = new Map(),
            T = Bv(f, Array.from(v));
          T.forEach((M, A) => {
            const O = Rs + g++;
            y.set(A, O), M.forEach((Y) => bt(Y, O));
          }),
            e.push(() => {
              p.forEach((M, A) => {
                const O = h.get(A);
                M.forEach((Y) => Hi(Y, O));
              }),
                T.forEach((M, A) => {
                  const O = y.get(A);
                  M.forEach((Y) => Hi(Y, O));
                }),
                m.forEach((M) => {
                  this.processLeaveNode(M);
                });
            });
          const z = [],
            K = [];
          for (let M = this._namespaceList.length - 1; M >= 0; M--)
            this._namespaceList[M].drainQueuedTransitions(t).forEach((O) => {
              const Y = O.player,
                Pe = O.element;
              if ((z.push(Y), this.collectedEnterElements.length)) {
                const ke = Pe[wt];
                if (ke && ke.setForMove) {
                  if (
                    ke.previousTriggersValues &&
                    ke.previousTriggersValues.has(O.triggerName)
                  ) {
                    const Zn = ke.previousTriggersValues.get(O.triggerName),
                      Ct = this.statesByElement.get(O.element);
                    if (Ct && Ct.has(O.triggerName)) {
                      const Xs = Ct.get(O.triggerName);
                      (Xs.value = Zn), Ct.set(O.triggerName, Xs);
                    }
                  }
                  return void Y.destroy();
                }
              }
              const Qt = !d || !this.driver.containsElement(d, Pe),
                ht = y.get(Pe),
                Pn = h.get(Pe),
                he = this._buildInstruction(O, i, Pn, ht, Qt);
              if (he.errors && he.errors.length) return void K.push(he);
              if (Qt)
                return (
                  Y.onStart(() => Qn(Pe, he.fromStyles)),
                  Y.onDestroy(() => Kt(Pe, he.toStyles)),
                  void r.push(Y)
                );
              if (O.isFallbackTransition)
                return (
                  Y.onStart(() => Qn(Pe, he.fromStyles)),
                  Y.onDestroy(() => Kt(Pe, he.toStyles)),
                  void r.push(Y)
                );
              const Kv = [];
              he.timelines.forEach((ke) => {
                (ke.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(ke.element) || Kv.push(ke);
              }),
                (he.timelines = Kv),
                i.append(Pe, he.timelines),
                s.push({ instruction: he, player: Y, element: Pe }),
                he.queriedElements.forEach((ke) => ct(a, ke, []).push(Y)),
                he.preStyleProps.forEach((ke, Zn) => {
                  if (ke.size) {
                    let Ct = l.get(Zn);
                    Ct || l.set(Zn, (Ct = new Set())),
                      ke.forEach((Xs, zu) => Ct.add(zu));
                  }
                }),
                he.postStyleProps.forEach((ke, Zn) => {
                  let Ct = c.get(Zn);
                  Ct || c.set(Zn, (Ct = new Set())),
                    ke.forEach((Xs, zu) => Ct.add(zu));
                });
            });
          if (K.length) {
            const M = [];
            K.forEach((A) => {
              M.push(
                (function Rx(n, e) {
                  return new C(3505, !1);
                })()
              );
            }),
              z.forEach((A) => A.destroy()),
              this.reportError(M);
          }
          const pe = new Map(),
            dt = new Map();
          s.forEach((M) => {
            const A = M.element;
            i.has(A) &&
              (dt.set(A, A),
              this._beforeAnimationBuild(
                M.player.namespaceId,
                M.instruction,
                pe
              ));
          }),
            r.forEach((M) => {
              const A = M.element;
              this._getPreviousPlayers(
                A,
                !1,
                M.namespaceId,
                M.triggerName,
                null
              ).forEach((Y) => {
                ct(pe, A, []).push(Y), Y.destroy();
              });
            });
          const ft = m.filter((M) => jv(M, l, c)),
            pt = new Map();
          Vv(pt, this.driver, w, c, fn).forEach((M) => {
            jv(M, l, c) && ft.push(M);
          });
          const hn = new Map();
          p.forEach((M, A) => {
            Vv(hn, this.driver, new Set(M), l, "!");
          }),
            ft.forEach((M) => {
              const A = pt.get(M),
                O = hn.get(M);
              pt.set(
                M,
                new Map([
                  ...Array.from(A?.entries() ?? []),
                  ...Array.from(O?.entries() ?? []),
                ])
              );
            });
          const Bt = [],
            $i = [],
            Ui = {};
          s.forEach((M) => {
            const { element: A, player: O, instruction: Y } = M;
            if (i.has(A)) {
              if (u.has(A))
                return (
                  O.onDestroy(() => Kt(A, Y.toStyles)),
                  (O.disabled = !0),
                  O.overrideTotalTime(Y.totalTime),
                  void r.push(O)
                );
              let Pe = Ui;
              if (dt.size > 1) {
                let ht = A;
                const Pn = [];
                for (; (ht = ht.parentNode); ) {
                  const he = dt.get(ht);
                  if (he) {
                    Pe = he;
                    break;
                  }
                  Pn.push(ht);
                }
                Pn.forEach((he) => dt.set(he, Pe));
              }
              const Qt = this._buildAnimation(O.namespaceId, Y, pe, o, hn, pt);
              if ((O.setRealPlayer(Qt), Pe === Ui)) Bt.push(O);
              else {
                const ht = this.playersByElement.get(Pe);
                ht && ht.length && (O.parentPlayer = Mn(ht)), r.push(O);
              }
            } else
              Qn(A, Y.fromStyles),
                O.onDestroy(() => Kt(A, Y.toStyles)),
                $i.push(O),
                u.has(A) && r.push(O);
          }),
            $i.forEach((M) => {
              const A = o.get(M.element);
              if (A && A.length) {
                const O = Mn(A);
                M.setRealPlayer(O);
              }
            }),
            r.forEach((M) => {
              M.parentPlayer ? M.syncPlayerEvents(M.parentPlayer) : M.destroy();
            });
          for (let M = 0; M < m.length; M++) {
            const A = m[M],
              O = A[wt];
            if ((Hi(A, Rs), O && O.hasAnimation)) continue;
            let Y = [];
            if (a.size) {
              let Qt = a.get(A);
              Qt && Qt.length && Y.push(...Qt);
              let ht = this.driver.query(A, Tu, !0);
              for (let Pn = 0; Pn < ht.length; Pn++) {
                let he = a.get(ht[Pn]);
                he && he.length && Y.push(...he);
              }
            }
            const Pe = Y.filter((Qt) => !Qt.destroyed);
            Pe.length ? H1(this, A, Pe) : this.processLeaveNode(A);
          }
          return (
            (m.length = 0),
            Bt.forEach((M) => {
              this.players.push(M),
                M.onDone(() => {
                  M.destroy();
                  const A = this.players.indexOf(M);
                  this.players.splice(A, 1);
                }),
                M.play();
            }),
            Bt
          );
        }
        elementContainsData(e, t) {
          let i = !1;
          const r = t[wt];
          return (
            r && r.setForRemoval && (i = !0),
            this.playersByElement.has(t) && (i = !0),
            this.playersByQueriedElement.has(t) && (i = !0),
            this.statesByElement.has(t) && (i = !0),
            this._fetchNamespace(e).elementContainsData(t) || i
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, t, i, r, o) {
          let s = [];
          if (t) {
            const a = this.playersByQueriedElement.get(e);
            a && (s = a);
          } else {
            const a = this.playersByElement.get(e);
            if (a) {
              const l = !o || o == Kr;
              a.forEach((c) => {
                c.queued || (!l && c.triggerName != r) || s.push(c);
              });
            }
          }
          return (
            (i || r) &&
              (s = s.filter(
                (a) => !((i && i != a.namespaceId) || (r && r != a.triggerName))
              )),
            s
          );
        }
        _beforeAnimationBuild(e, t, i) {
          const o = t.element,
            s = t.isRemovalTransition ? void 0 : e,
            a = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const l of t.timelines) {
            const c = l.element,
              u = c !== o,
              d = ct(i, c, []);
            this._getPreviousPlayers(c, u, s, a, t.toState).forEach((p) => {
              const h = p.getRealPlayer();
              h.beforeDestroy && h.beforeDestroy(), p.destroy(), d.push(p);
            });
          }
          Qn(o, t.fromStyles);
        }
        _buildAnimation(e, t, i, r, o, s) {
          const a = t.triggerName,
            l = t.element,
            c = [],
            u = new Set(),
            d = new Set(),
            f = t.timelines.map((h) => {
              const g = h.element;
              u.add(g);
              const m = g[wt];
              if (m && m.removedBeforeQueried)
                return new zr(h.duration, h.delay);
              const v = g !== l,
                w = (function j1(n) {
                  const e = [];
                  return Hv(n, e), e;
                })((i.get(g) || O1).map((pe) => pe.getRealPlayer())).filter(
                  (pe) => !!pe.element && pe.element === g
                ),
                y = o.get(g),
                T = s.get(g),
                z = fv(0, this._normalizer, 0, h.keyframes, y, T),
                K = this._buildPlayer(h, z, w);
              if ((h.subTimeline && r && d.add(g), v)) {
                const pe = new ju(e, a, g);
                pe.setRealPlayer(K), c.push(pe);
              }
              return K;
            });
          c.forEach((h) => {
            ct(this.playersByQueriedElement, h.element, []).push(h),
              h.onDone(() =>
                (function k1(n, e, t) {
                  let i = n.get(e);
                  if (i) {
                    if (i.length) {
                      const r = i.indexOf(t);
                      i.splice(r, 1);
                    }
                    0 == i.length && n.delete(e);
                  }
                  return i;
                })(this.playersByQueriedElement, h.element, h)
              );
          }),
            u.forEach((h) => bt(h, Ev));
          const p = Mn(f);
          return (
            p.onDestroy(() => {
              u.forEach((h) => Hi(h, Ev)), Kt(l, t.toStyles);
            }),
            d.forEach((h) => {
              ct(r, h, []).push(p);
            }),
            p
          );
        }
        _buildPlayer(e, t, i) {
          return t.length > 0
            ? this.driver.animate(
                e.element,
                t,
                e.duration,
                e.delay,
                e.easing,
                i
              )
            : new zr(e.duration, e.delay);
        }
      }
      class ju {
        constructor(e, t, i) {
          (this.namespaceId = e),
            (this.triggerName = t),
            (this.element = i),
            (this._player = new zr()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            this._queuedCallbacks.forEach((t, i) => {
              t.forEach((r) => Du(e, i, void 0, r));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const t = this._player;
          t.triggerCallback && e.onStart(() => t.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, t) {
          ct(this._queuedCallbacks, e, []).push(t);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(e);
        }
      }
      function Qs(n) {
        return n && 1 === n.nodeType;
      }
      function kv(n, e) {
        const t = n.style.display;
        return (n.style.display = e ?? "none"), t;
      }
      function Vv(n, e, t, i, r) {
        const o = [];
        t.forEach((l) => o.push(kv(l)));
        const s = [];
        i.forEach((l, c) => {
          const u = new Map();
          l.forEach((d) => {
            const f = e.computeStyle(c, d, r);
            u.set(d, f), (!f || 0 == f.length) && ((c[wt] = F1), s.push(c));
          }),
            n.set(c, u);
        });
        let a = 0;
        return t.forEach((l) => kv(l, o[a++])), s;
      }
      function Bv(n, e) {
        const t = new Map();
        if ((n.forEach((a) => t.set(a, [])), 0 == e.length)) return t;
        const r = new Set(e),
          o = new Map();
        function s(a) {
          if (!a) return 1;
          let l = o.get(a);
          if (l) return l;
          const c = a.parentNode;
          return (l = t.has(c) ? c : r.has(c) ? 1 : s(c)), o.set(a, l), l;
        }
        return (
          e.forEach((a) => {
            const l = s(a);
            1 !== l && t.get(l).push(a);
          }),
          t
        );
      }
      function bt(n, e) {
        n.classList?.add(e);
      }
      function Hi(n, e) {
        n.classList?.remove(e);
      }
      function H1(n, e, t) {
        Mn(t).onDone(() => n.processLeaveNode(e));
      }
      function Hv(n, e) {
        for (let t = 0; t < n.length; t++) {
          const i = n[t];
          i instanceof uv ? Hv(i.players, e) : e.push(i);
        }
      }
      function jv(n, e, t) {
        const i = t.get(n);
        if (!i) return !1;
        let r = e.get(n);
        return r ? i.forEach((o) => r.add(o)) : e.set(n, i), t.delete(n), !0;
      }
      class Ys {
        constructor(e, t, i) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = i),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (r, o) => {}),
            (this._transitionEngine = new R1(e, t, i)),
            (this._timelineEngine = new M1(e, t, i)),
            (this._transitionEngine.onRemovalComplete = (r, o) =>
              this.onRemovalComplete(r, o));
        }
        registerTrigger(e, t, i, r, o) {
          const s = e + "-" + r;
          let a = this._triggerCache[s];
          if (!a) {
            const l = [],
              u = xu(this._driver, o, l, []);
            if (l.length)
              throw (function Ix(n, e) {
                return new C(3404, !1);
              })();
            (a = (function C1(n, e, t) {
              return new I1(n, e, t);
            })(r, u, this._normalizer)),
              (this._triggerCache[s] = a);
          }
          this._transitionEngine.registerTrigger(t, r, a);
        }
        register(e, t) {
          this._transitionEngine.register(e, t);
        }
        destroy(e, t) {
          this._transitionEngine.destroy(e, t);
        }
        onInsert(e, t, i, r) {
          this._transitionEngine.insertNode(e, t, i, r);
        }
        onRemove(e, t, i, r) {
          this._transitionEngine.removeNode(e, t, r || !1, i);
        }
        disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t);
        }
        process(e, t, i, r) {
          if ("@" == i.charAt(0)) {
            const [o, s] = pv(i);
            this._timelineEngine.command(o, t, s, r);
          } else this._transitionEngine.trigger(e, t, i, r);
        }
        listen(e, t, i, r, o) {
          if ("@" == i.charAt(0)) {
            const [s, a] = pv(i);
            return this._timelineEngine.listen(s, t, a, o);
          }
          return this._transitionEngine.listen(e, t, i, r, o);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let z1 = (() => {
        class n {
          constructor(t, i, r) {
            (this._element = t),
              (this._startStyles = i),
              (this._endStyles = r),
              (this._state = 0);
            let o = n.initialStylesByElement.get(t);
            o || n.initialStylesByElement.set(t, (o = new Map())),
              (this._initialStyles = o);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Kt(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Kt(this._element, this._initialStyles),
                this._endStyles &&
                  (Kt(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (n.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Qn(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Qn(this._element, this._endStyles),
                  (this._endStyles = null)),
                Kt(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n;
      })();
      function $u(n) {
        let e = null;
        return (
          n.forEach((t, i) => {
            (function W1(n) {
              return "display" === n || "position" === n;
            })(i) && ((e = e || new Map()), e.set(i, t));
          }),
          e
        );
      }
      class $v {
        constructor(e, t, i, r) {
          (this.element = e),
            (this.keyframes = t),
            (this.options = i),
            (this._specialStyles = r),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = i.duration),
            (this._delay = i.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : new Map()),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(e) {
          const t = [];
          return (
            e.forEach((i) => {
              t.push(Object.fromEntries(i));
            }),
            t
          );
        }
        _triggerWebAnimation(e, t, i) {
          return e.animate(this._convertKeyframesToObject(t), i);
        }
        onStart(e) {
          this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
          this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((i, r) => {
              "offset" !== r &&
                e.set(r, this._finished ? i : Tv(this.element, r));
            }),
            (this.currentSnapshot = e);
        }
        triggerCallback(e) {
          const t = "start" === e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
      }
      class G1 {
        validateStyleProperty(e) {
          return !0;
        }
        validateAnimatableStyleProperty(e) {
          return !0;
        }
        matchesElement(e, t) {
          return !1;
        }
        containsElement(e, t) {
          return yv(e, t);
        }
        getParentElement(e) {
          return Cu(e);
        }
        query(e, t, i) {
          return vv(e, t, i);
        }
        computeStyle(e, t, i) {
          return window.getComputedStyle(e)[t];
        }
        animate(e, t, i, r, o, s = []) {
          const l = {
            duration: i,
            delay: r,
            fill: 0 == r ? "both" : "forwards",
          };
          o && (l.easing = o);
          const c = new Map(),
            u = s.filter((p) => p instanceof $v);
          (function Qx(n, e) {
            return 0 === n || 0 === e;
          })(i, r) &&
            u.forEach((p) => {
              p.currentSnapshot.forEach((h, g) => c.set(g, h));
            });
          let d = (function Wx(n) {
            return n.length
              ? n[0] instanceof Map
                ? n
                : n.map((e) => wv(e))
              : [];
          })(t).map((p) => An(p));
          d = (function Yx(n, e, t) {
            if (t.size && e.length) {
              let i = e[0],
                r = [];
              if (
                (t.forEach((o, s) => {
                  i.has(s) || r.push(s), i.set(s, o);
                }),
                r.length)
              )
                for (let o = 1; o < e.length; o++) {
                  let s = e[o];
                  r.forEach((a) => s.set(a, Tv(n, a)));
                }
            }
            return e;
          })(e, d, c);
          const f = (function U1(n, e) {
            let t = null,
              i = null;
            return (
              Array.isArray(e) && e.length
                ? ((t = $u(e[0])), e.length > 1 && (i = $u(e[e.length - 1])))
                : e instanceof Map && (t = $u(e)),
              t || i ? new z1(n, t, i) : null
            );
          })(e, d);
          return new $v(e, d, l, f);
        }
      }
      let q1 = (() => {
        class n extends ov {
          constructor(t, i) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(i.body, {
                id: "0",
                encapsulation: St.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const i = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const r = Array.isArray(t) ? av(t) : t;
            return (
              Uv(this._renderer, null, i, "register", [r]),
              new K1(i, this._renderer)
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G(_r), G(Rt));
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class K1 extends class VP {} {
        constructor(e, t) {
          super(), (this._id = e), (this._renderer = t);
        }
        create(e, t) {
          return new Q1(this._id, e, t || {}, this._renderer);
        }
      }
      class Q1 {
        constructor(e, t, i, r) {
          (this.id = e),
            (this.element = t),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", i);
        }
        _listen(e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t);
        }
        _command(e, ...t) {
          return Uv(this._renderer, this.element, this.id, e, t);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function Uv(n, e, t, i, r) {
        return n.setProperty(e, `@@${t}:${i}`, r);
      }
      const zv = "@.disabled";
      let Y1 = (() => {
        class n {
          constructor(t, i, r) {
            (this.delegate = t),
              (this.engine = i),
              (this._zone = r),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (i.onRemovalComplete = (o, s) => {
                const a = s?.parentNode(o);
                a && s.removeChild(a, o);
              });
          }
          createRenderer(t, i) {
            const o = this.delegate.createRenderer(t, i);
            if (!(t && i && i.data && i.data.animation)) {
              let u = this._rendererCache.get(o);
              return (
                u ||
                  ((u = new Wv("", o, this.engine, () =>
                    this._rendererCache.delete(o)
                  )),
                  this._rendererCache.set(o, u)),
                u
              );
            }
            const s = i.id,
              a = i.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, t);
            const l = (u) => {
              Array.isArray(u)
                ? u.forEach(l)
                : this.engine.registerTrigger(s, a, t, u.name, u);
            };
            return i.data.animation.forEach(l), new Z1(this, a, o, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, i, r) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => i(r))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((o) => {
                        const [s, a] = o;
                        s(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([i, r]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(G(_r), G(Ys), G(we));
          }),
          (n.ɵprov = te({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Wv {
        constructor(e, t, i, r) {
          (this.namespaceId = e),
            (this.delegate = t),
            (this.engine = i),
            (this._onDestroy = r),
            (this.destroyNode = this.delegate.destroyNode
              ? (o) => t.destroyNode(o)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy(),
            this._onDestroy?.();
        }
        createElement(e, t) {
          return this.delegate.createElement(e, t);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, t) {
          this.delegate.appendChild(e, t),
            this.engine.onInsert(this.namespaceId, t, e, !1);
        }
        insertBefore(e, t, i, r = !0) {
          this.delegate.insertBefore(e, t, i),
            this.engine.onInsert(this.namespaceId, t, e, r);
        }
        removeChild(e, t, i) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, i);
        }
        selectRootElement(e, t) {
          return this.delegate.selectRootElement(e, t);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, t, i, r) {
          this.delegate.setAttribute(e, t, i, r);
        }
        removeAttribute(e, t, i) {
          this.delegate.removeAttribute(e, t, i);
        }
        addClass(e, t) {
          this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          this.delegate.removeClass(e, t);
        }
        setStyle(e, t, i, r) {
          this.delegate.setStyle(e, t, i, r);
        }
        removeStyle(e, t, i) {
          this.delegate.removeStyle(e, t, i);
        }
        setProperty(e, t, i) {
          "@" == t.charAt(0) && t == zv
            ? this.disableAnimations(e, !!i)
            : this.delegate.setProperty(e, t, i);
        }
        setValue(e, t) {
          this.delegate.setValue(e, t);
        }
        listen(e, t, i) {
          return this.delegate.listen(e, t, i);
        }
        disableAnimations(e, t) {
          this.engine.disableAnimations(e, t);
        }
      }
      class Z1 extends Wv {
        constructor(e, t, i, r, o) {
          super(t, i, r, o), (this.factory = e), (this.namespaceId = t);
        }
        setProperty(e, t, i) {
          "@" == t.charAt(0)
            ? "." == t.charAt(1) && t == zv
              ? this.disableAnimations(e, (i = void 0 === i || !!i))
              : this.engine.process(this.namespaceId, e, t.slice(1), i)
            : this.delegate.setProperty(e, t, i);
        }
        listen(e, t, i) {
          if ("@" == t.charAt(0)) {
            const r = (function X1(n) {
              switch (n) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return n;
              }
            })(e);
            let o = t.slice(1),
              s = "";
            return (
              "@" != o.charAt(0) &&
                ([o, s] = (function J1(n) {
                  const e = n.indexOf(".");
                  return [n.substring(0, e), n.slice(e + 1)];
                })(o)),
              this.engine.listen(this.namespaceId, r, o, s, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, i, a);
              })
            );
          }
          return this.delegate.listen(e, t, i);
        }
      }
      const Gv = [
          { provide: ov, useClass: q1 },
          {
            provide: Ru,
            useFactory: function tN() {
              return new D1();
            },
          },
          {
            provide: Ys,
            useClass: (() => {
              class n extends Ys {
                constructor(t, i, r, o) {
                  super(t.body, i, r);
                }
                ngOnDestroy() {
                  this.flush();
                }
              }
              return (
                (n.ɵfac = function (t) {
                  return new (t || n)(G(Rt), G(Iu), G(Ru), G(fs));
                }),
                (n.ɵprov = te({ token: n, factory: n.ɵfac })),
                n
              );
            })(),
          },
          {
            provide: _r,
            useFactory: function nN(n, e, t) {
              return new Y1(n, e, t);
            },
            deps: [Fs, Ys, we],
          },
        ],
        Uu = [
          { provide: Iu, useFactory: () => new G1() },
          { provide: km, useValue: "BrowserAnimations" },
          ...Gv,
        ],
        qv = [
          { provide: Iu, useClass: _v },
          { provide: km, useValue: "NoopAnimations" },
          ...Gv,
        ];
      let iN = (() => {
          class n {
            static withConfig(t) {
              return { ngModule: n, providers: t.disableAnimations ? qv : Uu };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = tt({ type: n })),
            (n.ɵinj = qe({ providers: Uu, imports: [Ky] })),
            n
          );
        })(),
        rN = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = tt({ type: n, bootstrap: [LP] })),
            (n.ɵinj = qe({ imports: [Ky, iN, kP, ix, tv, gP] })),
            n
          );
        })();
      (function rT() {
        Jm = !1;
      })(),
        LA()
          .bootstrapModule(rN)
          .catch((n) => console.error(n));
    },
  },
  (ge) => {
    ge((ge.s = 93));
  },
]);
