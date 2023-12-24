!(function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery);
})(function (a) {
    var b = 0,
        c = Array.prototype.slice;
    (a.cleanData = (function (b) {
        return function (c) {
            var d, e, f;
            for (f = 0; null != (e = c[f]) ; f++)
                try {
                    (d = a._data(e, "events")), d && d.remove && a(e).triggerHandler("remove");
                } catch (g) { }
            b(c);
        };
    })(a.cleanData)),
        (a.widget = function (b, c, d) {
            var e,
                f,
                g,
                h,
                i = {},
                j = b.split(".")[0];
            return (
                (b = b.split(".")[1]),
                (e = j + "-" + b),
                d || ((d = c), (c = a.Widget)),
                (a.expr[":"][e.toLowerCase()] = function (b) {
                    return !!a.data(b, e);
                }),
                (a[j] = a[j] || {}),
                (f = a[j][b]),
                (g = a[j][b] = function (a, b) {
                    return this._createWidget ? void (arguments.length && this._createWidget(a, b)) : new g(a, b);
                }),
                a.extend(g, f, { version: d.version, _proto: a.extend({}, d), _childConstructors: [] }),
                (h = new c()),
                (h.options = a.widget.extend({}, h.options)),
                a.each(d, function (b, d) {
                    return a.isFunction(d)
                        ? void (i[b] = (function () {
                            var a = function () {
                                return c.prototype[b].apply(this, arguments);
                            },
                                e = function (a) {
                                    return c.prototype[b].apply(this, a);
                                };
                            return function () {
                                var b,
                                    c = this._super,
                                    f = this._superApply;
                                return (this._super = a), (this._superApply = e), (b = d.apply(this, arguments)), (this._super = c), (this._superApply = f), b;
                            };
                        })())
                        : void (i[b] = d);
                }),
                (g.prototype = a.widget.extend(h, { widgetEventPrefix: f ? h.widgetEventPrefix || b : b }, i, { constructor: g, namespace: j, widgetName: b, widgetFullName: e })),
                f
                    ? (a.each(f._childConstructors, function (b, c) {
                        var d = c.prototype;
                        a.widget(d.namespace + "." + d.widgetName, g, c._proto);
                    }),
                      delete f._childConstructors)
                    : c._childConstructors.push(g),
                a.widget.bridge(b, g),
                g
            );
        }),
        (a.widget.extend = function (b) {
            for (var d, e, f = c.call(arguments, 1), g = 0, h = f.length; g < h; g++)
                for (d in f[g]) (e = f[g][d]), f[g].hasOwnProperty(d) && void 0 !== e && (a.isPlainObject(e) ? (b[d] = a.isPlainObject(b[d]) ? a.widget.extend({}, b[d], e) : a.widget.extend({}, e)) : (b[d] = e));
            return b;
        }),
        (a.widget.bridge = function (b, d) {
            var e = d.prototype.widgetFullName || b;
            a.fn[b] = function (f) {
                var g = "string" == typeof f,
                    h = c.call(arguments, 1),
                    i = this;
                return (
                    g
                        ? this.each(function () {
                            var c,
                                d = a.data(this, e);
                            return "instance" === f
                                ? ((i = d), !1)
                                : d
                                ? a.isFunction(d[f]) && "_" !== f.charAt(0)
                                    ? ((c = d[f].apply(d, h)), c !== d && void 0 !== c ? ((i = c && c.jquery ? i.pushStack(c.get()) : c), !1) : void 0)
                                    : a.error("no such method '" + f + "' for " + b + " widget instance")
                                : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'");
                        })
                        : (h.length && (f = a.widget.extend.apply(null, [f].concat(h))),
                          this.each(function () {
                              var b = a.data(this, e);
                              b ? (b.option(f || {}), b._init && b._init()) : a.data(this, e, new d(f, this));
                          })),
                    i
                );
            };
        }),
        (a.Widget = function () { }),
        (a.Widget._childConstructors = []),
        (a.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: { disabled: !1, create: null },
            _createWidget: function (c, d) {
                (d = a(d || this.defaultElement || this)[0]),
                    (this.element = a(d)),
                    (this.uuid = b++),
                    (this.eventNamespace = "." + this.widgetName + this.uuid),
                    (this.bindings = a()),
                    (this.hoverable = a()),
                    (this.focusable = a()),
                    d !== this &&
                        (a.data(d, this.widgetFullName, this),
                        this._on(!0, this.element, {
                            remove: function (a) {
                                a.target === d && this.destroy();
                            },
                        }),
                        (this.document = a(d.style ? d.ownerDocument : d.document || d)),
                        (this.window = a(this.document[0].defaultView || this.document[0].parentWindow))),
                    (this.options = a.widget.extend({}, this.options, this._getCreateOptions(), c)),
                    this._create(),
                    this._trigger("create", null, this._getCreateEventData()),
                    this._init();
            },
            _getCreateOptions: a.noop,
            _getCreateEventData: a.noop,
            _create: a.noop,
            _init: a.noop,
            destroy: function () {
                this._destroy(),
                    this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),
                    this.widget()
                        .unbind(this.eventNamespace)
                        .removeAttr("aria-disabled")
                        .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
                    this.bindings.unbind(this.eventNamespace),
                    this.hoverable.removeClass("ui-state-hover"),
                    this.focusable.removeClass("ui-state-focus");
            },
            _destroy: a.noop,
            widget: function () {
                return this.element;
            },
            option: function (b, c) {
                var d,
                    e,
                    f,
                    g = b;
                if (0 === arguments.length) return a.widget.extend({}, this.options);
                if ("string" == typeof b)
                    if (((g = {}), (d = b.split(".")), (b = d.shift()), d.length)) {
                        for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; f < d.length - 1; f++) (e[d[f]] = e[d[f]] || {}), (e = e[d[f]]);
                        if (((b = d.pop()), 1 === arguments.length)) return void 0 === e[b] ? null : e[b];
                        e[b] = c;
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
                        g[b] = c;
                    }
                return this._setOptions(g), this;
            },
            _setOptions: function (a) {
                var b;
                for (b in a) this._setOption(b, a[b]);
                return this;
            },
            _setOption: function (a, b) {
                return (this.options[a] = b), "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this;
            },
            enable: function () {
                return this._setOptions({ disabled: !1 });
            },
            disable: function () {
                return this._setOptions({ disabled: !0 });
            },
            _on: function (b, c, d) {
                var e,
                    f = this;
                "boolean" != typeof b && ((d = c), (c = b), (b = !1)),
                    d ? ((c = e = a(c)), (this.bindings = this.bindings.add(c))) : ((d = c), (c = this.element), (e = this.widget())),
                    a.each(d, function (d, g) {
                        function h() {
                            if (b || (f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled"))) return ("string" == typeof g ? f[g] : g).apply(f, arguments);
                        }
                        "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
                        var i = d.match(/^([\w:-]*)\s*(.*)$/),
                            j = i[1] + f.eventNamespace,
                            k = i[2];
                        k ? e.delegate(k, j, h) : c.bind(j, h);
                    });
            },
            _off: function (b, c) {
                (c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace),
                    b.unbind(c).undelegate(c),
                    (this.bindings = a(this.bindings.not(b).get())),
                    (this.focusable = a(this.focusable.not(b).get())),
                    (this.hoverable = a(this.hoverable.not(b).get()));
            },
            _delay: function (a, b) {
                function c() {
                    return ("string" == typeof a ? d[a] : a).apply(d, arguments);
                }
                var d = this;
                return setTimeout(c, b || 0);
            },
            _hoverable: function (b) {
                (this.hoverable = this.hoverable.add(b)),
                    this._on(b, {
                        mouseenter: function (b) {
                            a(b.currentTarget).addClass("ui-state-hover");
                        },
                        mouseleave: function (b) {
                            a(b.currentTarget).removeClass("ui-state-hover");
                        },
                    });
            },
            _focusable: function (b) {
                (this.focusable = this.focusable.add(b)),
                    this._on(b, {
                        focusin: function (b) {
                            a(b.currentTarget).addClass("ui-state-focus");
                        },
                        focusout: function (b) {
                            a(b.currentTarget).removeClass("ui-state-focus");
                        },
                    });
            },
            _trigger: function (b, c, d) {
                var e,
                    f,
                    g = this.options[b];
                if (((d = d || {}), (c = a.Event(c)), (c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase()), (c.target = this.element[0]), (f = c.originalEvent))) for (e in f) e in c || (c[e] = f[e]);
                return this.element.trigger(c, d), !((a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1) || c.isDefaultPrevented());
            },
        }),
        a.each({ show: "fadeIn", hide: "fadeOut" }, function (b, c) {
            a.Widget.prototype["_" + b] = function (d, e, f) {
                "string" == typeof e && (e = { effect: e });
                var g,
                    h = e ? (e === !0 || "number" == typeof e ? c : e.effect || c) : b;
                (e = e || {}),
                    "number" == typeof e && (e = { duration: e }),
                    (g = !a.isEmptyObject(e)),
                    (e.complete = f),
                    e.delay && d.delay(e.delay),
                    g && a.effects && a.effects.effect[h]
                        ? d[b](e)
                        : h !== b && d[h]
                        ? d[h](e.duration, e.easing, f)
                        : d.queue(function (c) {
                            a(this)[b](), f && f.call(d[0]), c();
                        });
            };
        });
    a.widget;
}),
    !(function (a) {
        "use strict";
        var b = a.HTMLCanvasElement && a.HTMLCanvasElement.prototype,
            c =
                a.Blob &&
                (function () {
                    try {
                        return Boolean(new Blob());
                    } catch (a) {
                        return !1;
                    }
                })(),
            d =
                c &&
                a.Uint8Array &&
                (function () {
                    try {
                        return 100 === new Blob([new Uint8Array(100)]).size;
                    } catch (a) {
                        return !1;
                    }
                })(),
            e = a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder || a.MSBlobBuilder,
            f = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
            g =
                (c || e) &&
                a.atob &&
                a.ArrayBuffer &&
                a.Uint8Array &&
                function (a) {
                    var b, g, h, i, j, k, l, m, n;
                    if (((b = a.match(f)), !b)) throw new Error("invalid data URI");
                    for (
                        g = b[2] ? b[1] : "text/plain" + (b[3] || ";charset=US-ASCII"), h = !!b[4], i = a.slice(b[0].length), j = h ? atob(i) : decodeURIComponent(i), k = new ArrayBuffer(j.length), l = new Uint8Array(k), m = 0;
                        m < j.length;
                        m += 1
                    )
                        l[m] = j.charCodeAt(m);
                    return c ? new Blob([d ? l : k], { type: g }) : ((n = new e()), n.append(k), n.getBlob(g));
                };
        a.HTMLCanvasElement &&
            !b.toBlob &&
            (b.mozGetAsFile
                ? (b.toBlob = function (a, c, d) {
                    a(d && b.toDataURL && g ? g(this.toDataURL(c, d)) : this.mozGetAsFile("blob", c));
                })
                : b.toDataURL &&
                  g &&
                  (b.toBlob = function (a, b, c) {
                      a(g(this.toDataURL(b, c)));
                  })),
            "function" == typeof define && define.amd
                ? define(function () {
                    return g;
                })
                : "object" == typeof module && module.exports
                ? (module.exports = g)
                : (a.dataURLtoBlob = g);
    })(window),
    !(function (a) {
        "use strict";
        var b = function (a, c, d) {
            var e,
                f,
                g = document.createElement("img");
            if (
                ((g.onerror = c),
                (g.onload = function () {
                    !f || (d && d.noRevoke) || b.revokeObjectURL(f), c && c(b.scale(g, d));
            }),
                b.isInstanceOf("Blob", a) || b.isInstanceOf("File", a))
            )
                (e = f = b.createObjectURL(a)), (g._type = a.type);
            else {
                if ("string" != typeof a) return !1;
                (e = a), d && d.crossOrigin && (g.crossOrigin = d.crossOrigin);
            }
            return e
                ? ((g.src = e), g)
                : b.readFile(a, function (a) {
                    var b = a.target;
                    b && b.result ? (g.src = b.result) : c && c(a);
                });
        },
            c = (window.createObjectURL && window) || (window.URL && URL.revokeObjectURL && URL) || (window.webkitURL && webkitURL);
        (b.isInstanceOf = function (a, b) {
            return Object.prototype.toString.call(b) === "[object " + a + "]";
        }),
            (b.transformCoordinates = function () { }),
            (b.getTransformedOptions = function (a, b) {
                var c,
                    d,
                    e,
                    f,
                    g = b.aspectRatio;
                if (!g) return b;
                c = {};
                for (d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
                return (c.crop = !0), (e = a.naturalWidth || a.width), (f = a.naturalHeight || a.height), e / f > g ? ((c.maxWidth = f * g), (c.maxHeight = f)) : ((c.maxWidth = e), (c.maxHeight = e / g)), c;
            }),
            (b.renderImageToCanvas = function (a, b, c, d, e, f, g, h, i, j) {
                return a.getContext("2d").drawImage(b, c, d, e, f, g, h, i, j), a;
            }),
            (b.hasCanvasOption = function (a) {
                return a.canvas || a.crop || !!a.aspectRatio;
            }),
            (b.scale = function (a, c) {
                function d() {
                    var a = Math.max((h || u) / u, (i || v) / v);
                    a > 1 && ((u *= a), (v *= a));
                }
                function e() {
                    var a = Math.min((f || u) / u, (g || v) / v);
                    1 > a && ((u *= a), (v *= a));
                }
                c = c || {};
                var f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    q = document.createElement("canvas"),
                    r = a.getContext || (b.hasCanvasOption(c) && q.getContext),
                    s = a.naturalWidth || a.width,
                    t = a.naturalHeight || a.height,
                    u = s,
                    v = t;
                if (
                    (r &&
                        ((c = b.getTransformedOptions(a, c)),
                        (l = c.left || 0),
                        (m = c.top || 0),
                        c.sourceWidth ? ((j = c.sourceWidth), void 0 !== c.right && void 0 === c.left && (l = s - j - c.right)) : (j = s - l - (c.right || 0)),
                        c.sourceHeight ? ((k = c.sourceHeight), void 0 !== c.bottom && void 0 === c.top && (m = t - k - c.bottom)) : (k = t - m - (c.bottom || 0)),
                        (u = j),
                        (v = k)),
                    (f = c.maxWidth),
                    (g = c.maxHeight),
                    (h = c.minWidth),
                    (i = c.minHeight),
                    r && f && g && c.crop
                        ? ((u = f),
                          (v = g),
                          (p = j / k - f / g),
                          0 > p ? ((k = (g * j) / f), void 0 === c.top && void 0 === c.bottom && (m = (t - k) / 2)) : p > 0 && ((j = (f * k) / g), void 0 === c.left && void 0 === c.right && (l = (s - j) / 2)))
                        : ((c.contain || c.cover) && ((h = f = f || h), (i = g = g || i)), c.cover ? (e(), d()) : (d(), e())),
                    r)
                ) {
                    if (((n = c.pixelRatio), n > 1 && ((q.style.width = u + "px"), (q.style.height = v + "px"), (u *= n), (v *= n), q.getContext("2d").scale(n, n)), (o = c.downsamplingRatio), o > 0 && 1 > o && j > u && k > v))
                        for (; j * o > u;)
                            (q.width = j * o),
                                (q.height = k * o),
                                b.renderImageToCanvas(q, a, l, m, j, k, 0, 0, q.width, q.height),
                                (j = q.width),
                                (k = q.height),
                                (a = document.createElement("canvas")),
                                (a.width = j),
                                (a.height = k),
                                b.renderImageToCanvas(a, q, 0, 0, j, k, 0, 0, j, k);
                    return (q.width = u), (q.height = v), b.transformCoordinates(q, c), b.renderImageToCanvas(q, a, l, m, j, k, 0, 0, u, v);
                }
                return (a.width = u), (a.height = v), a;
            }),
            (b.createObjectURL = function (a) {
                return !!c && c.createObjectURL(a);
            }),
            (b.revokeObjectURL = function (a) {
                return !!c && c.revokeObjectURL(a);
            }),
            (b.readFile = function (a, b, c) {
                if (window.FileReader) {
                    var d = new FileReader();
                    if (((d.onload = d.onerror = b), (c = c || "readAsDataURL"), d[c])) return d[c](a), d;
                }
                return !1;
            }),
            "function" == typeof define && define.amd
                ? define(function () {
                    return b;
                })
                : "object" == typeof module && module.exports
                ? (module.exports = b)
                : (a.loadImage = b);
    })(window),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["./load-image"], a) : a("object" == typeof module && module.exports ? require("./load-image") : window.loadImage);
    })(function (a) {
        "use strict";
        var b = a.hasCanvasOption,
            c = a.transformCoordinates,
            d = a.getTransformedOptions;
        (a.hasCanvasOption = function (c) {
            return !!c.orientation || b.call(a, c);
        }),
            (a.transformCoordinates = function (b, d) {
                c.call(a, b, d);
                var e = b.getContext("2d"),
                    f = b.width,
                    g = b.height,
                    h = b.style.width,
                    i = b.style.height,
                    j = d.orientation;
                if (j && !(j > 8))
                    switch ((j > 4 && ((b.width = g), (b.height = f), (b.style.width = i), (b.style.height = h)), j)) {
                        case 2:
                            e.translate(f, 0), e.scale(-1, 1);
                            break;
                        case 3:
                            e.translate(f, g), e.rotate(Math.PI);
                            break;
                        case 4:
                            e.translate(0, g), e.scale(1, -1);
                            break;
                        case 5:
                            e.rotate(0.5 * Math.PI), e.scale(1, -1);
                            break;
                        case 6:
                            e.rotate(0.5 * Math.PI), e.translate(0, -g);
                            break;
                        case 7:
                            e.rotate(0.5 * Math.PI), e.translate(f, -g), e.scale(-1, 1);
                            break;
                        case 8:
                            e.rotate(-0.5 * Math.PI), e.translate(-f, 0);
                    }
            }),
            (a.getTransformedOptions = function (b, c) {
                var e,
                    f,
                    g = d.call(a, b, c),
                    h = g.orientation;
                if (!h || h > 8 || 1 === h) return g;
                e = {};
                for (f in g) g.hasOwnProperty(f) && (e[f] = g[f]);
                switch (g.orientation) {
                    case 2:
                        (e.left = g.right), (e.right = g.left);
                        break;
                    case 3:
                        (e.left = g.right), (e.top = g.bottom), (e.right = g.left), (e.bottom = g.top);
                        break;
                    case 4:
                        (e.top = g.bottom), (e.bottom = g.top);
                        break;
                    case 5:
                        (e.left = g.top), (e.top = g.left), (e.right = g.bottom), (e.bottom = g.right);
                        break;
                    case 6:
                        (e.left = g.top), (e.top = g.right), (e.right = g.bottom), (e.bottom = g.left);
                        break;
                    case 7:
                        (e.left = g.bottom), (e.top = g.right), (e.right = g.top), (e.bottom = g.left);
                        break;
                    case 8:
                        (e.left = g.bottom), (e.top = g.left), (e.right = g.top), (e.bottom = g.right);
                }
                return g.orientation > 4 && ((e.maxWidth = g.maxHeight), (e.maxHeight = g.maxWidth), (e.minWidth = g.minHeight), (e.minHeight = g.minWidth), (e.sourceWidth = g.sourceHeight), (e.sourceHeight = g.sourceWidth)), e;
            });
    }),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["./load-image"], a) : a("object" == typeof module && module.exports ? require("./load-image") : window.loadImage);
    })(function (a) {
        "use strict";
        var b = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
        (a.blobSlice =
            b &&
            function () {
                var a = this.slice || this.webkitSlice || this.mozSlice;
                return a.apply(this, arguments);
            }),
            (a.metaDataParsers = { jpeg: { 65505: [] } }),
            (a.parseMetaData = function (b, c, d) {
                d = d || {};
                var e = this,
                    f = d.maxMetaDataSize || 262144,
                    g = {},
                    h = !(window.DataView && b && b.size >= 12 && "image/jpeg" === b.type && a.blobSlice);
                (h ||
                    !a.readFile(
                        a.blobSlice.call(b, 0, f),
                        function (b) {
                            if (b.target.error) return void c(g);
                            var f,
                                h,
                                i,
                                j,
                                k = b.target.result,
                                l = new DataView(k),
                                m = 2,
                                n = l.byteLength - 4,
                                o = m;
                            if (65496 === l.getUint16(0)) {
                                for (; n > m && ((f = l.getUint16(m)), (f >= 65504 && 65519 >= f) || 65534 === f) && ((h = l.getUint16(m + 2) + 2), !(m + h > l.byteLength)) ;) {
                                    if ((i = a.metaDataParsers.jpeg[f])) for (j = 0; j < i.length; j += 1) i[j].call(e, l, m, h, g, d);
                                    (m += h), (o = m);
                                }
                                !d.disableImageHead && o > 6 && (k.slice ? (g.imageHead = k.slice(0, o)) : (g.imageHead = new Uint8Array(k).subarray(0, o)));
                            }
                            c(g);
                        },
                        "readAsArrayBuffer"
                    )) &&
                    c(g);
            });
    }),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], a) : "object" == typeof module && module.exports ? a(require("./load-image"), require("./load-image-meta")) : a(window.loadImage);
    })(function (a) {
        "use strict";
        (a.ExifMap = function () {
            return this;
        }),
            (a.ExifMap.prototype.map = { Orientation: 274 }),
            (a.ExifMap.prototype.get = function (a) {
                return this[a] || this[this.map[a]];
            }),
            (a.getExifThumbnail = function (a, b, c) {
                var d, e, f;
                if (c && !(b + c > a.byteLength)) {
                    for (d = [], e = 0; c > e; e += 1) (f = a.getUint8(b + e)), d.push((16 > f ? "0" : "") + f.toString(16));
                    return "data:image/jpeg,%" + d.join("%");
                }
            }),
            (a.exifTagTypes = {
                1: {
                    getValue: function (a, b) {
                        return a.getUint8(b);
                    },
                    size: 1,
                },
                2: {
                    getValue: function (a, b) {
                        return String.fromCharCode(a.getUint8(b));
                    },
                    size: 1,
                    ascii: !0,
                },
                3: {
                    getValue: function (a, b, c) {
                        return a.getUint16(b, c);
                    },
                    size: 2,
                },
                4: {
                    getValue: function (a, b, c) {
                        return a.getUint32(b, c);
                    },
                    size: 4,
                },
                5: {
                    getValue: function (a, b, c) {
                        return a.getUint32(b, c) / a.getUint32(b + 4, c);
                    },
                    size: 8,
                },
                9: {
                    getValue: function (a, b, c) {
                        return a.getInt32(b, c);
                    },
                    size: 4,
                },
                10: {
                    getValue: function (a, b, c) {
                        return a.getInt32(b, c) / a.getInt32(b + 4, c);
                    },
                    size: 8,
                },
            }),
            (a.exifTagTypes[7] = a.exifTagTypes[1]),
            (a.getExifValue = function (b, c, d, e, f, g) {
                var h,
                    i,
                    j,
                    k,
                    l,
                    m,
                    n = a.exifTagTypes[e];
                if (n && ((h = n.size * f), (i = h > 4 ? c + b.getUint32(d + 8, g) : d + 8), !(i + h > b.byteLength))) {
                    if (1 === f) return n.getValue(b, i, g);
                    for (j = [], k = 0; f > k; k += 1) j[k] = n.getValue(b, i + k * n.size, g);
                    if (n.ascii) {
                        for (l = "", k = 0; k < j.length && ((m = j[k]), "\0" !== m) ; k += 1) l += m;
                        return l;
                    }
                    return j;
                }
            }),
            (a.parseExifTag = function (b, c, d, e, f) {
                var g = b.getUint16(d, e);
                f.exif[g] = a.getExifValue(b, c, d, b.getUint16(d + 2, e), b.getUint32(d + 4, e), e);
            }),
            (a.parseExifTags = function (a, b, c, d, e) {
                var f, g, h;
                if (!(c + 6 > a.byteLength || ((f = a.getUint16(c, d)), (g = c + 2 + 12 * f), g + 4 > a.byteLength))) {
                    for (h = 0; f > h; h += 1) this.parseExifTag(a, b, c + 2 + 12 * h, d, e);
                    return a.getUint32(g, d);
                }
            }),
            (a.parseExifData = function (b, c, d, e, f) {
                if (!f.disableExif) {
                    var g,
                        h,
                        i,
                        j = c + 10;
                    if (1165519206 === b.getUint32(c + 4)) {
                        if (j + 8 > b.byteLength) return;
                        if (0 !== b.getUint16(c + 8)) return;
                        switch (b.getUint16(j)) {
                            case 18761:
                                g = !0;
                                break;
                            case 19789:
                                g = !1;
                                break;
                            default:
                                return;
                        }
                        if (42 !== b.getUint16(j + 2, g)) return;
                        (h = b.getUint32(j + 4, g)),
                            (e.exif = new a.ExifMap()),
                            (h = a.parseExifTags(b, j, j + h, g, e)),
                            h && !f.disableExifThumbnail && ((i = { exif: {} }), (h = a.parseExifTags(b, j, j + h, g, i)), i.exif[513] && (e.exif.Thumbnail = a.getExifThumbnail(b, j + i.exif[513], i.exif[514]))),
                            e.exif[34665] && !f.disableExifSub && a.parseExifTags(b, j, j + e.exif[34665], g, e),
                            e.exif[34853] && !f.disableExifGps && a.parseExifTags(b, j, j + e.exif[34853], g, e);
                    }
                }
            }),
            a.metaDataParsers.jpeg[65505].push(a.parseExifData);
    }),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["./load-image", "./load-image-exif"], a) : "object" == typeof module && module.exports ? a(require("./load-image"), require("./load-image-exif")) : a(window.loadImage);
    })(function (a) {
        "use strict";
        (a.ExifMap.prototype.tags = {
            256: "ImageWidth",
            257: "ImageHeight",
            34665: "ExifIFDPointer",
            34853: "GPSInfoIFDPointer",
            40965: "InteroperabilityIFDPointer",
            258: "BitsPerSample",
            259: "Compression",
            262: "PhotometricInterpretation",
            274: "Orientation",
            277: "SamplesPerPixel",
            284: "PlanarConfiguration",
            530: "YCbCrSubSampling",
            531: "YCbCrPositioning",
            282: "XResolution",
            283: "YResolution",
            296: "ResolutionUnit",
            273: "StripOffsets",
            278: "RowsPerStrip",
            279: "StripByteCounts",
            513: "JPEGInterchangeFormat",
            514: "JPEGInterchangeFormatLength",
            301: "TransferFunction",
            318: "WhitePoint",
            319: "PrimaryChromaticities",
            529: "YCbCrCoefficients",
            532: "ReferenceBlackWhite",
            306: "DateTime",
            270: "ImageDescription",
            271: "Make",
            272: "Model",
            305: "Software",
            315: "Artist",
            33432: "Copyright",
            36864: "ExifVersion",
            40960: "FlashpixVersion",
            40961: "ColorSpace",
            40962: "PixelXDimension",
            40963: "PixelYDimension",
            42240: "Gamma",
            37121: "ComponentsConfiguration",
            37122: "CompressedBitsPerPixel",
            37500: "MakerNote",
            37510: "UserComment",
            40964: "RelatedSoundFile",
            36867: "DateTimeOriginal",
            36868: "DateTimeDigitized",
            37520: "SubSecTime",
            37521: "SubSecTimeOriginal",
            37522: "SubSecTimeDigitized",
            33434: "ExposureTime",
            33437: "FNumber",
            34850: "ExposureProgram",
            34852: "SpectralSensitivity",
            34855: "PhotographicSensitivity",
            34856: "OECF",
            34864: "SensitivityType",
            34865: "StandardOutputSensitivity",
            34866: "RecommendedExposureIndex",
            34867: "ISOSpeed",
            34868: "ISOSpeedLatitudeyyy",
            34869: "ISOSpeedLatitudezzz",
            37377: "ShutterSpeedValue",
            37378: "ApertureValue",
            37379: "BrightnessValue",
            37380: "ExposureBias",
            37381: "MaxApertureValue",
            37382: "SubjectDistance",
            37383: "MeteringMode",
            37384: "LightSource",
            37385: "Flash",
            37396: "SubjectArea",
            37386: "FocalLength",
            41483: "FlashEnergy",
            41484: "SpatialFrequencyResponse",
            41486: "FocalPlaneXResolution",
            41487: "FocalPlaneYResolution",
            41488: "FocalPlaneResolutionUnit",
            41492: "SubjectLocation",
            41493: "ExposureIndex",
            41495: "SensingMethod",
            41728: "FileSource",
            41729: "SceneType",
            41730: "CFAPattern",
            41985: "CustomRendered",
            41986: "ExposureMode",
            41987: "WhiteBalance",
            41988: "DigitalZoomRatio",
            41989: "FocalLengthIn35mmFilm",
            41990: "SceneCaptureType",
            41991: "GainControl",
            41992: "Contrast",
            41993: "Saturation",
            41994: "Sharpness",
            41995: "DeviceSettingDescription",
            41996: "SubjectDistanceRange",
            42016: "ImageUniqueID",
            42032: "CameraOwnerName",
            42033: "BodySerialNumber",
            42034: "LensSpecification",
            42035: "LensMake",
            42036: "LensModel",
            42037: "LensSerialNumber",
            0: "GPSVersionID",
            1: "GPSLatitudeRef",
            2: "GPSLatitude",
            3: "GPSLongitudeRef",
            4: "GPSLongitude",
            5: "GPSAltitudeRef",
            6: "GPSAltitude",
            7: "GPSTimeStamp",
            8: "GPSSatellites",
            9: "GPSStatus",
            10: "GPSMeasureMode",
            11: "GPSDOP",
            12: "GPSSpeedRef",
            13: "GPSSpeed",
            14: "GPSTrackRef",
            15: "GPSTrack",
            16: "GPSImgDirectionRef",
            17: "GPSImgDirection",
            18: "GPSMapDatum",
            19: "GPSDestLatitudeRef",
            20: "GPSDestLatitude",
            21: "GPSDestLongitudeRef",
            22: "GPSDestLongitude",
            23: "GPSDestBearingRef",
            24: "GPSDestBearing",
            25: "GPSDestDistanceRef",
            26: "GPSDestDistance",
            27: "GPSProcessingMethod",
            28: "GPSAreaInformation",
            29: "GPSDateStamp",
            30: "GPSDifferential",
            31: "GPSHPositioningError",
        }),
            (a.ExifMap.prototype.stringValues = {
                ExposureProgram: { 0: "Undefined", 1: "Manual", 2: "Normal program", 3: "Aperture priority", 4: "Shutter priority", 5: "Creative program", 6: "Action program", 7: "Portrait mode", 8: "Landscape mode" },
                MeteringMode: { 0: "Unknown", 1: "Average", 2: "CenterWeightedAverage", 3: "Spot", 4: "MultiSpot", 5: "Pattern", 6: "Partial", 255: "Other" },
                LightSource: {
                    0: "Unknown",
                    1: "Daylight",
                    2: "Fluorescent",
                    3: "Tungsten (incandescent light)",
                    4: "Flash",
                    9: "Fine weather",
                    10: "Cloudy weather",
                    11: "Shade",
                    12: "Daylight fluorescent (D 5700 - 7100K)",
                    13: "Day white fluorescent (N 4600 - 5400K)",
                    14: "Cool white fluorescent (W 3900 - 4500K)",
                    15: "White fluorescent (WW 3200 - 3700K)",
                    17: "Standard light A",
                    18: "Standard light B",
                    19: "Standard light C",
                    20: "D55",
                    21: "D65",
                    22: "D75",
                    23: "D50",
                    24: "ISO studio tungsten",
                    255: "Other",
                },
                Flash: {
                    0: "Flash did not fire",
                    1: "Flash fired",
                    5: "Strobe return light not detected",
                    7: "Strobe return light detected",
                    9: "Flash fired, compulsory flash mode",
                    13: "Flash fired, compulsory flash mode, return light not detected",
                    15: "Flash fired, compulsory flash mode, return light detected",
                    16: "Flash did not fire, compulsory flash mode",
                    24: "Flash did not fire, auto mode",
                    25: "Flash fired, auto mode",
                    29: "Flash fired, auto mode, return light not detected",
                    31: "Flash fired, auto mode, return light detected",
                    32: "No flash function",
                    65: "Flash fired, red-eye reduction mode",
                    69: "Flash fired, red-eye reduction mode, return light not detected",
                    71: "Flash fired, red-eye reduction mode, return light detected",
                    73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                    77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                    79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                    89: "Flash fired, auto mode, red-eye reduction mode",
                    93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                    95: "Flash fired, auto mode, return light detected, red-eye reduction mode",
                },
                SensingMethod: {
                    1: "Undefined",
                    2: "One-chip color area sensor",
                    3: "Two-chip color area sensor",
                    4: "Three-chip color area sensor",
                    5: "Color sequential area sensor",
                    7: "Trilinear sensor",
                    8: "Color sequential linear sensor",
                },
                SceneCaptureType: { 0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene" },
                SceneType: { 1: "Directly photographed" },
                CustomRendered: { 0: "Normal process", 1: "Custom process" },
                WhiteBalance: { 0: "Auto white balance", 1: "Manual white balance" },
                GainControl: { 0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down" },
                Contrast: { 0: "Normal", 1: "Soft", 2: "Hard" },
                Saturation: { 0: "Normal", 1: "Low saturation", 2: "High saturation" },
                Sharpness: { 0: "Normal", 1: "Soft", 2: "Hard" },
                SubjectDistanceRange: { 0: "Unknown", 1: "Macro", 2: "Close view", 3: "Distant view" },
                FileSource: { 3: "DSC" },
                ComponentsConfiguration: { 0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B" },
                Orientation: { 1: "top-left", 2: "top-right", 3: "bottom-right", 4: "bottom-left", 5: "left-top", 6: "right-top", 7: "right-bottom", 8: "left-bottom" },
            }),
            (a.ExifMap.prototype.getText = function (a) {
                var b = this.get(a);
                switch (a) {
                    case "LightSource":
                    case "Flash":
                    case "MeteringMode":
                    case "ExposureProgram":
                    case "SensingMethod":
                    case "SceneCaptureType":
                    case "SceneType":
                    case "CustomRendered":
                    case "WhiteBalance":
                    case "GainControl":
                    case "Contrast":
                    case "Saturation":
                    case "Sharpness":
                    case "SubjectDistanceRange":
                    case "FileSource":
                    case "Orientation":
                        return this.stringValues[a][b];
                    case "ExifVersion":
                    case "FlashpixVersion":
                        return String.fromCharCode(b[0], b[1], b[2], b[3]);
                    case "ComponentsConfiguration":
                        return this.stringValues[a][b[0]] + this.stringValues[a][b[1]] + this.stringValues[a][b[2]] + this.stringValues[a][b[3]];
                    case "GPSVersionID":
                        return b[0] + "." + b[1] + "." + b[2] + "." + b[3];
                }
                return String(b);
            }),
            (function (a) {
                var b,
                    c = a.tags,
                    d = a.map;
                for (b in c) c.hasOwnProperty(b) && (d[c[b]] = b);
            })(a.ExifMap.prototype),
            (a.ExifMap.prototype.getAll = function () {
                var a,
                    b,
                    c = {};
                for (a in this) this.hasOwnProperty(a) && ((b = this.tags[a]), b && (c[b] = this.getText(b)));
                return c;
            });
    }),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery);
    })(function (a) {
        "use strict";
        var b = 0;
        a.ajaxTransport("iframe", function (c) {
            if (c.async) {
                var d,
                    e,
                    f,
                    g = c.initialIframeSrc || "javascript:false;";
                return {
                    send: function (h, i) {
                        (d = a('<form style="display:none;"></form>')),
                            d.attr("accept-charset", c.formAcceptCharset),
                            (f = /\?/.test(c.url) ? "&" : "?"),
                            "DELETE" === c.type
                                ? ((c.url = c.url + f + "_method=DELETE"), (c.type = "POST"))
                                : "PUT" === c.type
                                ? ((c.url = c.url + f + "_method=PUT"), (c.type = "POST"))
                                : "PATCH" === c.type && ((c.url = c.url + f + "_method=PATCH"), (c.type = "POST")),
                            (b += 1),
                            (e = a('<iframe src="' + g + '" name="iframe-transport-' + b + '"></iframe>').bind("load", function () {
                                var b,
                                    f = a.isArray(c.paramName) ? c.paramName : [c.paramName];
                                e.unbind("load").bind("load", function () {
                                    var b;
                                    try {
                                        if (((b = e.contents()), !b.length || !b[0].firstChild)) throw new Error();
                                    } catch (c) {
                                        b = void 0;
                                    }
                                    i(200, "success", { iframe: b }),
                                        a('<iframe src="' + g + '"></iframe>').appendTo(d),
                                        window.setTimeout(function () {
                                            d.remove();
                                        }, 0);
                                }),
                                    d.prop("target", e.prop("name")).prop("action", c.url).prop("method", c.type),
                                    c.formData &&
                                        a.each(c.formData, function (b, c) {
                                            a('<input type="hidden"/>').prop("name", c.name).val(c.value).appendTo(d);
                                        }),
                                    c.fileInput &&
                                        c.fileInput.length &&
                                        "POST" === c.type &&
                                        ((b = c.fileInput.clone()),
                                        c.fileInput.after(function (a) {
                                            return b[a];
                                        }),
                                        c.paramName &&
                                            c.fileInput.each(function (b) {
                                                a(this).prop("name", f[b] || c.paramName);
                                            }),
                                        d.append(c.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"),
                                        c.fileInput.removeAttr("form")),
                                    d.submit(),
                                    b &&
                                        b.length &&
                                        c.fileInput.each(function (c, d) {
                                            var e = a(b[c]);
                                            a(d).prop("name", e.prop("name")).attr("form", e.attr("form")), e.replaceWith(d);
                                        });
                            })),
                            d.append(e).appendTo(document.body);
                    },
                    abort: function () {
                        e && e.unbind("load").prop("src", g), d && d.remove();
                    },
                };
            }
        }),
            a.ajaxSetup({
                converters: {
                    "iframe text": function (b) {
                        return b && a(b[0].body).text();
                    },
                    "iframe json": function (b) {
                        return b && a.parseJSON(a(b[0].body).text());
                    },
                    "iframe html": function (b) {
                        return b && a(b[0].body).html();
                    },
                    "iframe xml": function (b) {
                        var c = b && b[0];
                        return c && a.isXMLDoc(c) ? c : a.parseXML((c.XMLDocument && c.XMLDocument.xml) || a(c.body).html());
                    },
                    "iframe script": function (b) {
                        return b && a.globalEval(a(b[0].body).text());
                    },
                },
            });
    }),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "jquery.ui.widget"], a) : "object" == typeof exports ? a(require("jquery"), require("./vendor/jquery.ui.widget")) : a(window.jQuery);
    })(function (a) {
        "use strict";
        function b(b) {
            var c = "dragover" === b;
            return function (d) {
                d.dataTransfer = d.originalEvent && d.originalEvent.dataTransfer;
                var e = d.dataTransfer;
                e && a.inArray("Files", e.types) !== -1 && this._trigger(b, a.Event(b, { delegatedEvent: d })) !== !1 && (d.preventDefault(), c && (e.dropEffect = "copy"));
            };
        }
        (a.support.fileInput = !(
            new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) ||
            a('<input type="file">').prop("disabled")
        )),
            (a.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader)),
            (a.support.xhrFormDataFileUpload = !!window.FormData),
            (a.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice)),
            a.widget("blueimp.fileupload", {
                options: {
                    dropZone: a(document),
                    pasteZone: void 0,
                    fileInput: void 0,
                    replaceFileInput: !0,
                    paramName: void 0,
                    singleFileUploads: !0,
                    limitMultiFileUploads: void 0,
                    limitMultiFileUploadSize: void 0,
                    limitMultiFileUploadSizeOverhead: 512,
                    sequentialUploads: !1,
                    limitConcurrentUploads: void 0,
                    forceIframeTransport: !1,
                    redirect: void 0,
                    redirectParamName: void 0,
                    postMessage: void 0,
                    multipart: !0,
                    maxChunkSize: void 0,
                    uploadedBytes: void 0,
                    recalculateProgress: !0,
                    progressInterval: 100,
                    bitrateInterval: 500,
                    autoUpload: !0,
                    messages: { uploadedBytes: "Uploaded bytes exceed file size" },
                    i18n: function (b, c) {
                        return (
                            (b = this.messages[b] || b.toString()),
                            c &&
                                a.each(c, function (a, c) {
                                    b = b.replace("{" + a + "}", c);
                                }),
                            b
                        );
                    },
                    formData: function (a) {
                        return a.serializeArray();
                    },
                    add: function (b, c) {
                        return (
                            !b.isDefaultPrevented() &&
                            void (
                                (c.autoUpload || (c.autoUpload !== !1 && a(this).fileupload("option", "autoUpload"))) &&
                                c.process().done(function () {
                                    c.submit();
                                })
                            )
                        );
                    },
                    processData: !1,
                    contentType: !1,
                    cache: !1,
                    timeout: 0,
                },
                _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
                _blobSlice:
                    a.support.blobSlice &&
                    function () {
                        var a = this.slice || this.webkitSlice || this.mozSlice;
                        return a.apply(this, arguments);
                    },
                _BitrateTimer: function () {
                    (this.timestamp = Date.now ? Date.now() : new Date().getTime()),
                        (this.loaded = 0),
                        (this.bitrate = 0),
                        (this.getBitrate = function (a, b, c) {
                            var d = a - this.timestamp;
                            return (!this.bitrate || !c || d > c) && ((this.bitrate = (b - this.loaded) * (1e3 / d) * 8), (this.loaded = b), (this.timestamp = a)), this.bitrate;
                        });
                },
                _isXHRUpload: function (b) {
                    return !b.forceIframeTransport && ((!b.multipart && a.support.xhrFileUpload) || a.support.xhrFormDataFileUpload);
                },
                _getFormData: function (b) {
                    var c;
                    return "function" === a.type(b.formData)
                        ? b.formData(b.form)
                        : a.isArray(b.formData)
                        ? b.formData
                        : "object" === a.type(b.formData)
                        ? ((c = []),
                          a.each(b.formData, function (a, b) {
                              c.push({ name: a, value: b });
                          }),
                          c)
                        : [];
                },
                _getTotal: function (b) {
                    var c = 0;
                    return (
                        a.each(b, function (a, b) {
                            c += b.size || 1;
                        }),
                        c
                    );
                },
                _initProgressObject: function (b) {
                    var c = { loaded: 0, total: 0, bitrate: 0 };
                    b._progress ? a.extend(b._progress, c) : (b._progress = c);
                },
                _initResponseObject: function (a) {
                    var b;
                    if (a._response) for (b in a._response) a._response.hasOwnProperty(b) && delete a._response[b];
                    else a._response = {};
                },
                _onProgress: function (b, c) {
                    if (b.lengthComputable) {
                        var d,
                            e = Date.now ? Date.now() : new Date().getTime();
                        if (c._time && c.progressInterval && e - c._time < c.progressInterval && b.loaded !== b.total) return;
                        (c._time = e),
                            (d = Math.floor((b.loaded / b.total) * (c.chunkSize || c._progress.total)) + (c.uploadedBytes || 0)),
                            (this._progress.loaded += d - c._progress.loaded),
                            (this._progress.bitrate = this._bitrateTimer.getBitrate(e, this._progress.loaded, c.bitrateInterval)),
                            (c._progress.loaded = c.loaded = d),
                            (c._progress.bitrate = c.bitrate = c._bitrateTimer.getBitrate(e, d, c.bitrateInterval)),
                            this._trigger("progress", a.Event("progress", { delegatedEvent: b }), c),
                            this._trigger("progressall", a.Event("progressall", { delegatedEvent: b }), this._progress);
                    }
                },
                _initProgressListener: function (b) {
                    var c = this,
                        d = b.xhr ? b.xhr() : a.ajaxSettings.xhr();
                    d.upload &&
                        (a(d.upload).bind("progress", function (a) {
                            var d = a.originalEvent;
                            (a.lengthComputable = d.lengthComputable), (a.loaded = d.loaded), (a.total = d.total), c._onProgress(a, b);
                        }),
                        (b.xhr = function () {
                            return d;
                        }));
                },
                _isInstanceOf: function (a, b) {
                    return Object.prototype.toString.call(b) === "[object " + a + "]";
                },
                _initXHRData: function (b) {
                    var c,
                        d = this,
                        e = b.files[0],
                        f = b.multipart || !a.support.xhrFileUpload,
                        g = "array" === a.type(b.paramName) ? b.paramName[0] : b.paramName;
                    (b.headers = a.extend({}, b.headers)),
                        b.contentRange && (b.headers["Content-Range"] = b.contentRange),
                        (f && !b.blob && this._isInstanceOf("File", e)) || (b.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(e.name) + '"'),
                        f
                            ? a.support.xhrFormDataFileUpload &&
                              (b.postMessage
                                  ? ((c = this._getFormData(b)),
                                    b.blob
                                        ? c.push({ name: g, value: b.blob })
                                        : a.each(b.files, function (d, e) {
                                            c.push({ name: ("array" === a.type(b.paramName) && b.paramName[d]) || g, value: e });
                                        }))
                                  : (d._isInstanceOf("FormData", b.formData)
                                        ? (c = b.formData)
                                        : ((c = new FormData()),
                                          a.each(this._getFormData(b), function (a, b) {
                                              c.append(b.name, b.value);
                                          })),
                                    b.blob
                                        ? c.append(g, b.blob, e.name)
                                        : a.each(b.files, function (e, f) {
                                            (d._isInstanceOf("File", f) || d._isInstanceOf("Blob", f)) && c.append(("array" === a.type(b.paramName) && b.paramName[e]) || g, f, f.uploadName || f.name);
                                        })),
                              (b.data = c))
                            : ((b.contentType = e.type || "application/octet-stream"), (b.data = b.blob || e)),
                        (b.blob = null);
                },
                _initIframeSettings: function (b) {
                    var c = a("<a></a>").prop("href", b.url).prop("host");
                    (b.dataType = "iframe " + (b.dataType || "")), (b.formData = this._getFormData(b)), b.redirect && c && c !== location.host && b.formData.push({ name: b.redirectParamName || "redirect", value: b.redirect });
                },
                _initDataSettings: function (a) {
                    this._isXHRUpload(a) ? (this._chunkedUpload(a, !0) || (a.data || this._initXHRData(a), this._initProgressListener(a)), a.postMessage && (a.dataType = "postmessage " + (a.dataType || ""))) : this._initIframeSettings(a);
                },
                _getParamName: function (b) {
                    var c = a(b.fileInput),
                        d = b.paramName;
                    return (
                        d
                            ? a.isArray(d) || (d = [d])
                            : ((d = []),
                              c.each(function () {
                                  for (var b = a(this), c = b.prop("name") || "files[]", e = (b.prop("files") || [1]).length; e;) d.push(c), (e -= 1);
                              }),
                              d.length || (d = [c.prop("name") || "files[]"])),
                        d
                    );
                },
                _initFormSettings: function (b) {
                    (b.form && b.form.length) || ((b.form = a(b.fileInput.prop("form"))), b.form.length || (b.form = a(this.options.fileInput.prop("form")))),
                        (b.paramName = this._getParamName(b)),
                        b.url || (b.url = b.form.prop("action") || location.href),
                        (b.type = (b.type || ("string" === a.type(b.form.prop("method")) && b.form.prop("method")) || "").toUpperCase()),
                        "POST" !== b.type && "PUT" !== b.type && "PATCH" !== b.type && (b.type = "POST"),
                        b.formAcceptCharset || (b.formAcceptCharset = b.form.attr("accept-charset"));
                },
                _getAJAXSettings: function (b) {
                    var c = a.extend({}, this.options, b);
                    return this._initFormSettings(c), this._initDataSettings(c), c;
                },
                _getDeferredState: function (a) {
                    return a.state ? a.state() : a.isResolved() ? "resolved" : a.isRejected() ? "rejected" : "pending";
                },
                _enhancePromise: function (a) {
                    return (a.success = a.done), (a.error = a.fail), (a.complete = a.always), a;
                },
                _getXHRPromise: function (b, c, d) {
                    var e = a.Deferred(),
                        f = e.promise();
                    return (c = c || this.options.context || f), b === !0 ? e.resolveWith(c, d) : b === !1 && e.rejectWith(c, d), (f.abort = e.promise), this._enhancePromise(f);
                },
                _addConvenienceMethods: function (b, c) {
                    var d = this,
                        e = function (b) {
                            return a.Deferred().resolveWith(d, b).promise();
                        };
                    (c.process = function (b, f) {
                        return (
                            (b || f) &&
                                (c._processQueue = this._processQueue = (this._processQueue || e([this]))
                                    .pipe(function () {
                                        return c.errorThrown ? a.Deferred().rejectWith(d, [c]).promise() : e(arguments);
                                    })
                                    .pipe(b, f)),
                            this._processQueue || e([this])
                        );
                    }),
                        (c.submit = function () {
                            return "pending" !== this.state() && (c.jqXHR = this.jqXHR = d._trigger("submit", a.Event("submit", { delegatedEvent: b }), this) !== !1 && d._onSend(b, this)), this.jqXHR || d._getXHRPromise();
                        }),
                        (c.abort = function () {
                            return this.jqXHR ? this.jqXHR.abort() : ((this.errorThrown = "abort"), d._trigger("fail", null, this), d._getXHRPromise(!1));
                        }),
                        (c.state = function () {
                            return this.jqXHR ? d._getDeferredState(this.jqXHR) : this._processQueue ? d._getDeferredState(this._processQueue) : void 0;
                        }),
                        (c.processing = function () {
                            return !this.jqXHR && this._processQueue && "pending" === d._getDeferredState(this._processQueue);
                        }),
                        (c.progress = function () {
                            return this._progress;
                        }),
                        (c.response = function () {
                            return this._response;
                        });
                },
                _getUploadedBytes: function (a) {
                    var b = a.getResponseHeader("Range"),
                        c = b && b.split("-"),
                        d = c && c.length > 1 && parseInt(c[1], 10);
                    return d && d + 1;
                },
                _chunkedUpload: function (b, c) {
                    b.uploadedBytes = b.uploadedBytes || 0;
                    var d,
                        e,
                        f = this,
                        g = b.files[0],
                        h = g.size,
                        i = b.uploadedBytes,
                        j = b.maxChunkSize || h,
                        k = this._blobSlice,
                        l = a.Deferred(),
                        m = l.promise();
                    return (
                        !(!(this._isXHRUpload(b) && k && (i || j < h)) || b.data) &&
                        (!!c ||
                            (i >= h
                                ? ((g.error = b.i18n("uploadedBytes")), this._getXHRPromise(!1, b.context, [null, "error", g.error]))
                                : ((e = function () {
                                    var c = a.extend({}, b),
                                        m = c._progress.loaded;
                                    (c.blob = k.call(g, i, i + j, g.type)),
                                        (c.chunkSize = c.blob.size),
                                        (c.contentRange = "bytes " + i + "-" + (i + c.chunkSize - 1) + "/" + h),
                                        f._initXHRData(c),
                                        f._initProgressListener(c),
                                        (d = ((f._trigger("chunksend", null, c) !== !1 && a.ajax(c)) || f._getXHRPromise(!1, c.context))
                                            .done(function (d, g, j) {
                                                (i = f._getUploadedBytes(j) || i + c.chunkSize),
                                                    m + c.chunkSize - c._progress.loaded && f._onProgress(a.Event("progress", { lengthComputable: !0, loaded: i - c.uploadedBytes, total: i - c.uploadedBytes }), c),
                                                    (b.uploadedBytes = c.uploadedBytes = i),
                                                    (c.result = d),
                                                    (c.textStatus = g),
                                                    (c.jqXHR = j),
                                                    f._trigger("chunkdone", null, c),
                                                    f._trigger("chunkalways", null, c),
                                                    i < h ? e() : l.resolveWith(c.context, [d, g, j]);
                                            })
                                            .fail(function (a, b, d) {
                                                (c.jqXHR = a), (c.textStatus = b), (c.errorThrown = d), f._trigger("chunkfail", null, c), f._trigger("chunkalways", null, c), l.rejectWith(c.context, [a, b, d]);
                                            }));
                                }),
                                  this._enhancePromise(m),
                                  (m.abort = function () {
                                      return d.abort();
                                  }),
                                  e(),
                                  m)))
                    );
                },
                _beforeSend: function (a, b) {
                    0 === this._active && (this._trigger("start"), (this._bitrateTimer = new this._BitrateTimer()), (this._progress.loaded = this._progress.total = 0), (this._progress.bitrate = 0)),
                        this._initResponseObject(b),
                        this._initProgressObject(b),
                        (b._progress.loaded = b.loaded = b.uploadedBytes || 0),
                        (b._progress.total = b.total = this._getTotal(b.files) || 1),
                        (b._progress.bitrate = b.bitrate = 0),
                        (this._active += 1),
                        (this._progress.loaded += b.loaded),
                        (this._progress.total += b.total);
                },
                _onDone: function (b, c, d, e) {
                    var f = e._progress.total,
                        g = e._response;
                    e._progress.loaded < f && this._onProgress(a.Event("progress", { lengthComputable: !0, loaded: f, total: f }), e),
                        (g.result = e.result = b),
                        (g.textStatus = e.textStatus = c),
                        (g.jqXHR = e.jqXHR = d),
                        this._trigger("done", null, e);
                },
                _onFail: function (a, b, c, d) {
                    var e = d._response;
                    d.recalculateProgress && ((this._progress.loaded -= d._progress.loaded), (this._progress.total -= d._progress.total)),
                        (e.jqXHR = d.jqXHR = a),
                        (e.textStatus = d.textStatus = b),
                        (e.errorThrown = d.errorThrown = c),
                        this._trigger("fail", null, d);
                },
                _onAlways: function (a, b, c, d) {
                    this._trigger("always", null, d);
                },
                _onSend: function (b, c) {
                    c.submit || this._addConvenienceMethods(b, c);
                    var d,
                        e,
                        f,
                        g,
                        h = this,
                        i = h._getAJAXSettings(c),
                        j = function () {
                            return (
                                (h._sending += 1),
                                (i._bitrateTimer = new h._BitrateTimer()),
                                (d =
                                    d ||
                                    (((e || h._trigger("send", a.Event("send", { delegatedEvent: b }), i) === !1) && h._getXHRPromise(!1, i.context, e)) || h._chunkedUpload(i) || a.ajax(i))
                                        .done(function (a, b, c) {
                                            h._onDone(a, b, c, i);
                                        })
                                        .fail(function (a, b, c) {
                                            h._onFail(a, b, c, i);
                                        })
                                        .always(function (a, b, c) {
                                            if ((h._onAlways(a, b, c, i), (h._sending -= 1), (h._active -= 1), i.limitConcurrentUploads && i.limitConcurrentUploads > h._sending))
                                                for (var d = h._slots.shift() ; d;) {
                                                    if ("pending" === h._getDeferredState(d)) {
                                                        d.resolve();
                                                        break;
                                                    }
                                                    d = h._slots.shift();
                                                }
                                            0 === h._active && h._trigger("stop");
                                        }))
                            );
                        };
                    return (
                        this._beforeSend(b, i),
                        this.options.sequentialUploads || (this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending)
                            ? (this.options.limitConcurrentUploads > 1 ? ((f = a.Deferred()), this._slots.push(f), (g = f.pipe(j))) : ((this._sequence = this._sequence.pipe(j, j)), (g = this._sequence)),
                              (g.abort = function () {
                                  return (e = [void 0, "abort", "abort"]), d ? d.abort() : (f && f.rejectWith(i.context, e), j());
                              }),
                              this._enhancePromise(g))
                            : j()
                    );
                },
                _onAdd: function (b, c) {
                    var d,
                        e,
                        f,
                        g,
                        h = this,
                        i = !0,
                        j = a.extend({}, this.options, c),
                        k = c.files,
                        l = k.length,
                        m = j.limitMultiFileUploads,
                        n = j.limitMultiFileUploadSize,
                        o = j.limitMultiFileUploadSizeOverhead,
                        p = 0,
                        q = this._getParamName(j),
                        r = 0;
                    if (!l) return !1;
                    if ((n && void 0 === k[0].size && (n = void 0), (j.singleFileUploads || m || n) && this._isXHRUpload(j)))
                        if (j.singleFileUploads || n || !m)
                            if (!j.singleFileUploads && n)
                                for (f = [], d = [], g = 0; g < l; g += 1)
                                    (p += k[g].size + o), (g + 1 === l || p + k[g + 1].size + o > n || (m && g + 1 - r >= m)) && (f.push(k.slice(r, g + 1)), (e = q.slice(r, g + 1)), e.length || (e = q), d.push(e), (r = g + 1), (p = 0));
                            else d = q;
                        else for (f = [], d = [], g = 0; g < l; g += m) f.push(k.slice(g, g + m)), (e = q.slice(g, g + m)), e.length || (e = q), d.push(e);
                    else (f = [k]), (d = [q]);
                    return (
                        (c.originalFiles = k),
                        a.each(f || k, function (e, g) {
                            var j = a.extend({}, c);
                            return (j.files = f ? g : [g]), (j.paramName = d[e]), h._initResponseObject(j), h._initProgressObject(j), h._addConvenienceMethods(b, j), (i = h._trigger("add", a.Event("add", { delegatedEvent: b }), j));
                        }),
                        i
                    );
                },
                _replaceFileInput: function (b) {
                    var c = b.fileInput,
                        d = c.clone(!0),
                        e = c.is(document.activeElement);
                    (b.fileInputClone = d),
                        a("<form></form>").append(d)[0].reset(),
                        c.after(d).detach(),
                        e && d.focus(),
                        a.cleanData(c.unbind("remove")),
                        (this.options.fileInput = this.options.fileInput.map(function (a, b) {
                            return b === c[0] ? d[0] : b;
                        })),
                        c[0] === this.element[0] && (this.element = d);
                },
                _handleFileTreeEntry: function (b, c) {
                    var d,
                        e = this,
                        f = a.Deferred(),
                        g = function (a) {
                            a && !a.entry && (a.entry = b), f.resolve([a]);
                        },
                        h = function (a) {
                            e._handleFileTreeEntries(a, c + b.name + "/")
                                .done(function (a) {
                                    f.resolve(a);
                                })
                                .fail(g);
                        },
                        i = function () {
                            d.readEntries(function (a) {
                                a.length ? ((j = j.concat(a)), i()) : h(j);
                            }, g);
                        },
                        j = [];
                    return (
                        (c = c || ""),
                        b.isFile
                            ? b._file
                                ? ((b._file.relativePath = c), f.resolve(b._file))
                                : b.file(function (a) {
                                    (a.relativePath = c), f.resolve(a);
                                }, g)
                            : b.isDirectory
                            ? ((d = b.createReader()), i())
                            : f.resolve([]),
                        f.promise()
                    );
                },
                _handleFileTreeEntries: function (b, c) {
                    var d = this;
                    return a.when
                        .apply(
                            a,
                            a.map(b, function (a) {
                                return d._handleFileTreeEntry(a, c);
                            })
                        )
                        .pipe(function () {
                            return Array.prototype.concat.apply([], arguments);
                        });
                },
                _getDroppedFiles: function (b) {
                    b = b || {};
                    var c = b.items;
                    return c && c.length && (c[0].webkitGetAsEntry || c[0].getAsEntry)
                        ? this._handleFileTreeEntries(
                              a.map(c, function (a) {
                                  var b;
                                  return a.webkitGetAsEntry ? ((b = a.webkitGetAsEntry()), b && (b._file = a.getAsFile()), b) : a.getAsEntry();
                              })
                          )
                        : a.Deferred().resolve(a.makeArray(b.files)).promise();
                },
                _getSingleFileInputFiles: function (b) {
                    b = a(b);
                    var c,
                        d,
                        e = b.prop("webkitEntries") || b.prop("entries");
                    if (e && e.length) return this._handleFileTreeEntries(e);
                    if (((c = a.makeArray(b.prop("files"))), c.length))
                        void 0 === c[0].name &&
                            c[0].fileName &&
                            a.each(c, function (a, b) {
                                (b.name = b.fileName), (b.size = b.fileSize);
                            });
                    else {
                        if (((d = b.prop("value")), !d)) return a.Deferred().resolve([]).promise();
                        c = [{ name: d.replace(/^.*\\/, "") }];
                    }
                    return a.Deferred().resolve(c).promise();
                },
                _getFileInputFiles: function (b) {
                    return b instanceof a && 1 !== b.length
                        ? a.when.apply(a, a.map(b, this._getSingleFileInputFiles)).pipe(function () {
                            return Array.prototype.concat.apply([], arguments);
                        })
                        : this._getSingleFileInputFiles(b);
                },
                _onChange: function (b) {
                    var c = this,
                        d = { fileInput: a(b.target), form: a(b.target.form) };
                    this._getFileInputFiles(d.fileInput).always(function (e) {
                        (d.files = e), c.options.replaceFileInput && c._replaceFileInput(d), c._trigger("change", a.Event("change", { delegatedEvent: b }), d) !== !1 && c._onAdd(b, d);
                    });
                },
                _onPaste: function (b) {
                    var c = b.originalEvent && b.originalEvent.clipboardData && b.originalEvent.clipboardData.items,
                        d = { files: [] };
                    c &&
                        c.length &&
                        (a.each(c, function (a, b) {
                            var c = b.getAsFile && b.getAsFile();
                            c && d.files.push(c);
                        }),
                        this._trigger("paste", a.Event("paste", { delegatedEvent: b }), d) !== !1 && this._onAdd(b, d));
                },
                _onDrop: function (b) {
                    b.dataTransfer = b.originalEvent && b.originalEvent.dataTransfer;
                    var c = this,
                        d = b.dataTransfer,
                        e = {};
                    d &&
                        d.files &&
                        d.files.length &&
                        (b.preventDefault(),
                        this._getDroppedFiles(d).always(function (d) {
                            (e.files = d), c._trigger("drop", a.Event("drop", { delegatedEvent: b }), e) !== !1 && c._onAdd(b, e);
                        }));
                },
                _onDragOver: b("dragover"),
                _onDragEnter: b("dragenter"),
                _onDragLeave: b("dragleave"),
                _initEventHandlers: function () {
                    this._isXHRUpload(this.options) &&
                        (this._on(this.options.dropZone, { dragover: this._onDragOver, drop: this._onDrop, dragenter: this._onDragEnter, dragleave: this._onDragLeave }), this._on(this.options.pasteZone, { paste: this._onPaste })),
                        a.support.fileInput && this._on(this.options.fileInput, { change: this._onChange });
                },
                _destroyEventHandlers: function () {
                    this._off(this.options.dropZone, "dragenter dragleave dragover drop"), this._off(this.options.pasteZone, "paste"), this._off(this.options.fileInput, "change");
                },
                _setOption: function (b, c) {
                    var d = a.inArray(b, this._specialOptions) !== -1;
                    d && this._destroyEventHandlers(), this._super(b, c), d && (this._initSpecialOptions(), this._initEventHandlers());
                },
                _initSpecialOptions: function () {
                    var b = this.options;
                    void 0 === b.fileInput ? (b.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]')) : b.fileInput instanceof a || (b.fileInput = a(b.fileInput)),
                        b.dropZone instanceof a || (b.dropZone = a(b.dropZone)),
                        b.pasteZone instanceof a || (b.pasteZone = a(b.pasteZone));
                },
                _getRegExp: function (a) {
                    var b = a.split("/"),
                        c = b.pop();
                    return b.shift(), new RegExp(b.join("/"), c);
                },
                _isRegExpOption: function (b, c) {
                    return "url" !== b && "string" === a.type(c) && /^\/.*\/[igm]{0,3}$/.test(c);
                },
                _initDataAttributes: function () {
                    var b = this,
                        c = this.options,
                        d = this.element.data();
                    a.each(this.element[0].attributes, function (a, e) {
                        var f,
                            g = e.name.toLowerCase();
                        /^data-/.test(g) &&
                            ((g = g.slice(5).replace(/-[a-z]/g, function (a) {
                                return a.charAt(1).toUpperCase();
                            })),
                            (f = d[g]),
                            b._isRegExpOption(g, f) && (f = b._getRegExp(f)),
                            (c[g] = f));
                    });
                },
                _create: function () {
                    this._initDataAttributes(), this._initSpecialOptions(), (this._slots = []), (this._sequence = this._getXHRPromise(!0)), (this._sending = this._active = 0), this._initProgressObject(this), this._initEventHandlers();
                },
                active: function () {
                    return this._active;
                },
                progress: function () {
                    return this._progress;
                },
                add: function (b) {
                    var c = this;
                    b &&
                        !this.options.disabled &&
                        (b.fileInput && !b.files
                            ? this._getFileInputFiles(b.fileInput).always(function (a) {
                                (b.files = a), c._onAdd(null, b);
                            })
                            : ((b.files = a.makeArray(b.files)), this._onAdd(null, b)));
                },
                send: function (b) {
                    if (b && !this.options.disabled) {
                        if (b.fileInput && !b.files) {
                            var c,
                                d,
                                e = this,
                                f = a.Deferred(),
                                g = f.promise();
                            return (
                                (g.abort = function () {
                                    return (d = !0), c ? c.abort() : (f.reject(null, "abort", "abort"), g);
                                }),
                                this._getFileInputFiles(b.fileInput).always(function (a) {
                                    if (!d) {
                                        if (!a.length) return void f.reject();
                                        (b.files = a),
                                            (c = e._onSend(null, b)),
                                            c.then(
                                                function (a, b, c) {
                                                    f.resolve(a, b, c);
                                                },
                                                function (a, b, c) {
                                                    f.reject(a, b, c);
                                                }
                                            );
                                    }
                                }),
                                this._enhancePromise(g)
                            );
                        }
                        if (((b.files = a.makeArray(b.files)), b.files.length)) return this._onSend(null, b);
                    }
                    return this._getXHRPromise(!1, b && b.context);
                },
            });
    }),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "./jquery.fileupload"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery);
    })(function (a) {
        "use strict";
        var b = a.blueimp.fileupload.prototype.options.add;
        a.widget("blueimp.fileupload", a.blueimp.fileupload, {
            options: {
                processQueue: [],
                add: function (c, d) {
                    var e = a(this);
                    d.process(function () {
                        return e.fileupload("process", d);
                    }),
                        b.call(this, c, d);
                },
            },
            processActions: {},
            _processFile: function (b, c) {
                var d = this,
                    e = a.Deferred().resolveWith(d, [b]),
                    f = e.promise();
                return (
                    this._trigger("process", null, b),
                    a.each(b.processQueue, function (b, e) {
                        var g = function (b) {
                            return c.errorThrown ? a.Deferred().rejectWith(d, [c]).promise() : d.processActions[e.action].call(d, b, e);
                        };
                        f = f.pipe(g, e.always && g);
                    }),
                    f
                        .done(function () {
                            d._trigger("processdone", null, b), d._trigger("processalways", null, b);
                        })
                        .fail(function () {
                            d._trigger("processfail", null, b), d._trigger("processalways", null, b);
                        }),
                    f
                );
            },
            _transformProcessQueue: function (b) {
                var c = [];
                a.each(b.processQueue, function () {
                    var d = {},
                        e = this.action,
                        f = this.prefix === !0 ? e : this.prefix;
                    a.each(this, function (c, e) {
                        "string" === a.type(e) && "@" === e.charAt(0) ? (d[c] = b[e.slice(1) || (f ? f + c.charAt(0).toUpperCase() + c.slice(1) : c)]) : (d[c] = e);
                    }),
                        c.push(d);
                }),
                    (b.processQueue = c);
            },
            processing: function () {
                return this._processing;
            },
            process: function (b) {
                var c = this,
                    d = a.extend({}, this.options, b);
                return (
                    d.processQueue &&
                        d.processQueue.length &&
                        (this._transformProcessQueue(d),
                        0 === this._processing && this._trigger("processstart"),
                        a.each(b.files, function (e) {
                            var f = e ? a.extend({}, d) : d,
                                g = function () {
                                    return b.errorThrown ? a.Deferred().rejectWith(c, [b]).promise() : c._processFile(f, b);
                                };
                            (f.index = e),
                                (c._processing += 1),
                                (c._processingQueue = c._processingQueue.pipe(g, g).always(function () {
                                    (c._processing -= 1), 0 === c._processing && c._trigger("processstop");
                                }));
                        })),
                    this._processingQueue
                );
            },
            _create: function () {
                this._super(), (this._processing = 0), (this._processingQueue = a.Deferred().resolveWith(this).promise());
            },
        });
    }),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd
            ? define(["jquery", "load-image", "load-image-meta", "load-image-exif", "canvas-to-blob", "./jquery.fileupload-process"], a)
            : "object" == typeof exports
            ? a(
                  require("jquery"),
                  require("blueimp-load-image/js/load-image"),
                  require("blueimp-load-image/js/load-image-meta"),
                  require("blueimp-load-image/js/load-image-exif"),
                  require("blueimp-canvas-to-blob"),
                  require("./jquery.fileupload-process")
              )
            : a(window.jQuery, window.loadImage);
    })(function (a, b) {
        "use strict";
        a.blueimp.fileupload.prototype.options.processQueue.unshift(
            { action: "loadImageMetaData", disableImageHead: "@", disableExif: "@", disableExifThumbnail: "@", disableExifSub: "@", disableExifGps: "@", disabled: "@disableImageMetaDataLoad" },
            { action: "loadImage", prefix: !0, fileTypes: "@", maxFileSize: "@", noRevoke: "@", disabled: "@disableImageLoad" },
            { action: "resizeImage", prefix: "image", maxWidth: "@", maxHeight: "@", minWidth: "@", minHeight: "@", crop: "@", orientation: "@", forceResize: "@", disabled: "@disableImageResize" },
            { action: "saveImage", quality: "@imageQuality", type: "@imageType", disabled: "@disableImageResize" },
            { action: "saveImageMetaData", disabled: "@disableImageMetaDataSave" },
            { action: "resizeImage", prefix: "preview", maxWidth: "@", maxHeight: "@", minWidth: "@", minHeight: "@", crop: "@", orientation: "@", thumbnail: "@", canvas: "@", disabled: "@disableImagePreview" },
            { action: "setImage", name: "@imagePreviewName", disabled: "@disableImagePreview" },
            { action: "deleteImageReferences", disabled: "@disableImageReferencesDeletion" }
        ),
            a.widget("blueimp.fileupload", a.blueimp.fileupload, {
                options: {
                    loadImageFileTypes: /^image\/(gif|jpeg|png|svg\+xml)$/,
                    loadImageMaxFileSize: 1e7,
                    imageMaxWidth: 1920,
                    imageMaxHeight: 1080,
                    imageOrientation: !1,
                    imageCrop: !1,
                    disableImageResize: !0,
                    previewMaxWidth: 80,
                    previewMaxHeight: 80,
                    previewOrientation: !0,
                    previewThumbnail: !0,
                    previewCrop: !1,
                    previewCanvas: !0,
                },
                processActions: {
                    loadImage: function (c, d) {
                        if (d.disabled) return c;
                        var e = this,
                            f = c.files[c.index],
                            g = a.Deferred();
                        return ("number" === a.type(d.maxFileSize) && f.size > d.maxFileSize) ||
                            (d.fileTypes && !d.fileTypes.test(f.type)) ||
                            !b(
                                f,
                                function (a) {
                                    a.src && (c.img = a), g.resolveWith(e, [c]);
                                },
                                d
                            )
                            ? c
                            : g.promise();
                    },
                    resizeImage: function (c, d) {
                        if (d.disabled || (!c.canvas && !c.img)) return c;
                        d = a.extend({ canvas: !0 }, d);
                        var e,
                            f = this,
                            g = a.Deferred(),
                            h = (d.canvas && c.canvas) || c.img,
                            i = function (a) {
                                a && (a.width !== h.width || a.height !== h.height || d.forceResize) && (c[a.getContext ? "canvas" : "img"] = a), (c.preview = a), g.resolveWith(f, [c]);
                            };
                        if (c.exif) {
                            if ((d.orientation === !0 && (d.orientation = c.exif.get("Orientation")), d.thumbnail && (e = c.exif.get("Thumbnail")))) return b(e, i, d), g.promise();
                            c.orientation ? delete d.orientation : (c.orientation = d.orientation);
                        }
                        return h ? (i(b.scale(h, d)), g.promise()) : c;
                    },
                    saveImage: function (b, c) {
                        if (!b.canvas || c.disabled) return b;
                        var d = this,
                            e = b.files[b.index],
                            f = a.Deferred();
                        return b.canvas.toBlob
                            ? (b.canvas.toBlob(
                                  function (a) {
                                      a.name || (e.type === a.type ? (a.name = e.name) : e.name && (a.name = e.name.replace(/\.\w+$/, "." + a.type.substr(6)))),
                                          e.type !== a.type && delete b.imageHead,
                                          (b.files[b.index] = a),
                                          f.resolveWith(d, [b]);
                                  },
                                  c.type || e.type,
                                  c.quality
                              ),
                              f.promise())
                            : b;
                    },
                    loadImageMetaData: function (c, d) {
                        if (d.disabled) return c;
                        var e = this,
                            f = a.Deferred();
                        return (
                            b.parseMetaData(
                                c.files[c.index],
                                function (b) {
                                    a.extend(c, b), f.resolveWith(e, [c]);
                                },
                                d
                            ),
                            f.promise()
                        );
                    },
                    saveImageMetaData: function (a, b) {
                        if (!(a.imageHead && a.canvas && a.canvas.toBlob) || b.disabled) return a;
                        var c = a.files[a.index],
                            d = new Blob([a.imageHead, this._blobSlice.call(c, 20)], { type: c.type });
                        return (d.name = c.name), (a.files[a.index] = d), a;
                    },
                    setImage: function (a, b) {
                        return a.preview && !b.disabled && (a.files[a.index][b.name || "preview"] = a.preview), a;
                    },
                    deleteImageReferences: function (a, b) {
                        return b.disabled || (delete a.img, delete a.canvas, delete a.preview, delete a.imageHead), a;
                    },
                },
            });
    }),
    (function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery", "./jquery.fileupload-process"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery);
    })(function (a) {
        "use strict";
        a.blueimp.fileupload.prototype.options.processQueue.push({ action: "validate", always: !0, acceptFileTypes: "@", maxFileSize: "@", minFileSize: "@", maxNumberOfFiles: "@", disabled: "@disableValidation" }),
            a.widget("blueimp.fileupload", a.blueimp.fileupload, {
                options: { getNumberOfFiles: a.noop, messages: { maxNumberOfFiles: "Maximum number of files exceeded", acceptFileTypes: "File type not allowed", maxFileSize: "File is too large", minFileSize: "File is too small" } },
                processActions: {
                    validate: function (b, c) {
                        if (c.disabled) return b;
                        var d,
                            e = a.Deferred(),
                            f = this.options,
                            g = b.files[b.index];
                        return (
                            (c.minFileSize || c.maxFileSize) && (d = g.size),
                            "number" === a.type(c.maxNumberOfFiles) && (f.getNumberOfFiles() || 0) + b.files.length > c.maxNumberOfFiles
                                ? (g.error = f.i18n("maxNumberOfFiles"))
                                : !c.acceptFileTypes || c.acceptFileTypes.test(g.type) || c.acceptFileTypes.test(g.name)
                                ? d > c.maxFileSize
                                    ? (g.error = f.i18n("maxFileSize"))
                                    : "number" === a.type(d) && d < c.minFileSize
                                    ? (g.error = f.i18n("minFileSize"))
                                    : delete g.error
                                : (g.error = f.i18n("acceptFileTypes")),
                            g.error || b.files.error ? ((b.files.error = !0), e.rejectWith(this, [b])) : e.resolveWith(this, [b]),
                            e.promise()
                        );
                    },
                },
            });
    });
