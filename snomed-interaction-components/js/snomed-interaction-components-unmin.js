/*! snomed-interaction-components 2018-06-21 */
function conceptDetails(a, b, c) {
    "undefined" == typeof componentsRegistry && (componentsRegistry = []);
    var d = {
        20581000087109: "fr-CA",
        19491000087109: "en-CA",
        "900000000000508004": "en-GB",
        "900000000000509007": "en-US",
        450828004: "es-ES",
        554461000005103: "DA",
        46011000052107: "SV",
        "32570271000036106": "AU",
        "999001251000000103": "UK",
        11000146104: "NL"
    };
    c.languageNameOfLangRefset && (d = c.languageNameOfLangRefset);
    var e = this;
    this.type = "concept-details",
    this.conceptId = b,
    this.divElement = a,
    this.options = jQuery.extend(!0, {}, c),
    this.attributesPId = "",
    this.descsPId = "",
    this.relsPId = "",
    this.history = [],
    this.color = "white",
    e.preferred = !1,
    e.acceptable = !1,
    e.included = !1,
    e.refset = {},
    e.refset.simple = !1,
    e.refset.simplemap = !1,
    e.refset.attr = !1,
    e.refset.assoc = !1,
    this.lastGroup = null,
    this.subscription = null;
    var f = null
      , g = null
      , h = null
      , i = null
      , j = null
      , k = 0;
    e.subscriptionsColor = [],
    e.subscriptions = [],
    e.subscribers = [],
    componentLoaded = !1,
    $.each(componentsRegistry, function(a, b) {
        b.divElement.id == e.divElement.id && (componentLoaded = !0)
    }),
    0 == componentLoaded && componentsRegistry.push(e),
    this.getConceptId = function() {
        return this.conceptId
    }
    ,
    this.getDivId = function() {
        return this.divId
    }
    ,
    this.getNextMarkerColor = function(a) {
        var b = "black";
        return "black" == a ? b = "green" : "green" == a ? b = "purple" : "purple" == a ? b = "red" : "red" == a ? b = "blue" : "blue" == a && (b = "green"),
        globalMarkerColor = b,
        b
    }
    ,
    e.markerColor = e.getNextMarkerColor(globalMarkerColor),
    this.setupCanvas = function() {
        e.attributesPId = e.divElement.id + "-attributes-panel",
        e.descsPId = e.divElement.id + "-descriptions-panel",
        e.relsPId = e.divElement.id + "-rels-panel",
        e.childrenPId = e.divElement.id + "-children-panel",
        e.defaultTerm = "",
        $(a).html();
        var b = {
            divElementId: e.divElement.id
        };
        $(a).html(JST["views/conceptDetailsPlugin/main.hbs"](b)),
        $("#" + e.divElement.id + "-subscribersMarker").disableTextSelect(),
        $("#" + e.divElement.id + "-configButton").disableTextSelect(),
        $("#" + e.divElement.id + "-historyButton").disableTextSelect(),
        $("#" + e.divElement.id + "-collapseButton").disableTextSelect(),
        $("#" + e.divElement.id + "-expandButton").disableTextSelect(),
        $("#" + e.divElement.id + "-closeButton").disableTextSelect(),
        $("#" + e.divElement.id + "-expandButton").hide(),
        $("#" + e.divElement.id + "-subscribersMarker").hide(),
        $("#" + e.divElement.id + "-closeButton").click(function(b) {
            $(a).remove()
        }),
        $("#" + e.divElement.id + "-configButton").click(function(a) {
            e.setupOptionsPanel()
        }),
        void 0 !== e.options.closeButton && 0 == e.options.closeButton && $("#" + e.divElement.id + "-closeButton").hide(),
        void 0 !== e.options.subscribersMarker && 0 == e.options.subscribersMarker && $("#" + e.divElement.id + "-subscribersMarker").remove(),
        void 0 !== e.options.collapseButton && 0 == e.options.collapseButton && ($("#" + e.divElement.id + "-expandButton").hide(),
        $("#" + e.divElement.id + "-collapseButton").hide()),
        $("#" + e.divElement.id + "-expandButton").click(function(a) {
            $("#" + e.divElement.id + "-panelBody").slideDown("fast"),
            $("#" + e.divElement.id + "-expandButton").hide(),
            $("#" + e.divElement.id + "-collapseButton").show(),
            $("#" + e.divElement.id + "-panelTitle").html("&nbsp&nbsp&nbsp<strong>Concept Details</strong>")
        }),
        $("#" + e.divElement.id + "-collapseButton").click(function(a) {
            $("#" + e.divElement.id + "-panelBody").slideUp("fast"),
            $("#" + e.divElement.id + "-expandButton").show(),
            $("#" + e.divElement.id + "-collapseButton").hide(),
            $("#" + e.divElement.id + "-panelTitle").html("&nbsp&nbsp&nbsp<strong>Concept Details: " + e.defaultTerm + "</strong>")
        }),
        $("#" + e.divElement.id).click(function(a) {
            $(a.target).hasClass("glyphicon") || $("#" + e.divElement.id).find(".more-fields-button").popover("hide")
        }),
        $("#" + e.divElement.id + "-historyButton").click(function(a) {
            $("#" + e.divElement.id + "-historyButton").popover({
                trigger: "manual",
                placement: "bottomRight",
                html: !0,
                content: function() {
                    var a = '<div style="height:100px;overflow:auto;">';
                    a += "<table>";
                    var b = e.history.slice(0);
                    return b.reverse(),
                    $.each(b, function(b, c) {
                        var d = new Date
                          , f = d.getTime()
                          , g = f - c.time
                          , h = "";
                        g < 6e4 ? h = 1 == Math.round(g / 1e3) ? Math.round(g / 1e3) + " second ago" : Math.round(g / 1e3) + " seconds ago" : g < 36e5 ? h = 1 == Math.round(g / 1e3 / 60) ? Math.round(g / 1e3 / 60) + " minute ago" : Math.round(g / 1e3 / 60) + " minutes ago" : g < 216e6 && (h = 1 == Math.round(g / 1e3 / 60 / 60) ? Math.round(g / 1e3 / 60 / 60) + " hour ago" : Math.round(g / 1e3 / 60 / 60) + " hours ago"),
                        a = a + '<tr><td><a href="javascript:void(0);" onclick="updateCD(\'' + e.divElement.id + "'," + c.conceptId + ');">' + c.defaultTerm + "</a>",
                        a = a + ' <span class="text-muted" style="font-size: 80%"><em>' + h + "<em></span>",
                        a += "</td></tr>"
                    }),
                    a += "</table>",
                    a += "</div>"
                }
            }),
            $("#" + e.divElement.id + "-historyButton").popover("toggle")
        }),
        "undefined" == typeof i18n_panel_options && (i18n_panel_options = "Panel options"),
        $("#" + e.divElement.id + "-configButton").tooltip({
            placement: "left",
            trigger: "hover",
            title: i18n_panel_options,
            animation: !0,
            delay: 1e3
        }),
        "undefined" == typeof i18n_history && (i18n_history = "History"),
        $("#" + e.divElement.id + "-historyButton").tooltip({
            placement: "left",
            trigger: "hover",
            title: i18n_history,
            animation: !0,
            delay: 1e3
        }),
        "undefined" == typeof i18n_panel_links && (i18n_panel_links = "Panel links"),
        $("#" + e.divElement.id + "-apply-button").click(function() {
            e.readOptionsPanel()
        }),
        e.updateCanvas(),
        channel.publish(e.divElement.id, {
            term: e.term,
            module: e.module,
            conceptId: e.conceptId,
            source: e.divElement.id
        }),
        e.setupOptionsPanel(),
        (e.subscriptions.length > 0 || e.subscribers.length > 0) && $("#" + e.divElement.id + "-subscribersMarker").show(),
        $("#" + e.divElement.id + "-ownMarker").css("color", e.markerColor)
    }
    ,
    this.updateCanvas = function() {
        if ($("#home-children-cant-" + e.divElement.id).html(""),
        $(".more-fields-button").popover("hide"),
        k != e.conceptId) {
            if (k = e.conceptId,
            $("#home-children-" + e.divElement.id + "-body").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#" + e.attributesPId).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#home-attributes-" + e.divElement.id).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#" + e.descsPId).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#" + e.relsPId).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#home-parents-" + e.divElement.id).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#home-roles-" + e.divElement.id).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#" + e.childrenPId).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#diagram-canvas-" + e.divElement.id).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#refsets-" + e.divElement.id).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            $("#product-details-" + e.divElement.id).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            null != f && f.abort(),
            f = $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + e.conceptId, function(a) {}).done(function(b) {
                function g(a) {
                    window.getSelection().isCollapsed && (a.srcElement && a.srcElement.value || (a.clipboardData.setData("text/plain", h.conceptId + " | " + h.defaultTerm + " |"),
                    a.preventDefault(),
                    alertEvent("Copied!", "info")))
                }
                var h = b;
                f = null,
                e.attributesPId = a.id + "-attributes-panel",
                e.defaultTerm = h.defaultTerm;
                var i = new Date
                  , j = i.getTime();
                e.history.push({
                    defaultTerm: h.defaultTerm,
                    conceptId: h.conceptId,
                    time: j
                }),
                Handlebars.registerHelper("if_eq", function(a, b, c) {
                    if ("undefined" != c)
                        return a == b ? c.fn(this) : c.inverse(this)
                }),
                h.statedDescendants && (h.statedDescendantsString = h.statedDescendants.toLocaleString()),
                h.inferredDescendants && (h.inferredDescendantsString = h.inferredDescendants.toLocaleString());
                var l = {
                    options: e.options,
                    firstMatch: h,
                    divElementId: e.divElement.id,
                    edition: c.edition,
                    release: c.release,
                    server: c.serverUrl.substr(0, c.serverUrl.length - 10),
                    langRefset: e.options.langRefset,
                    link: document.URL.split("?")[0].split("#")[0] + "?perspective=full&conceptId1=" + h.conceptId + "&edition=" + e.options.edition + "&release=" + e.options.release + "&server=" + e.options.serverUrl + "&langRefset=" + e.options.langRefset,
                    dataContentValue: document.URL.split("?")[0].split("#")[0]
                };
                $("#" + e.attributesPId).html(JST["views/conceptDetailsPlugin/tabs/details/attributes-panel.hbs"](l)),
                $("#share-link-" + e.divElement.id).disableTextSelect(),
                $("#share-link-" + e.divElement.id).click(function(a) {
                    setTimeout(function() {
                        $("#share-field-" + e.divElement.id).select()
                    }, 300)
                }),
                Handlebars.registerHelper("if_eq", function(a, b, c) {
                    if ("undefined" != c)
                        return a == b ? c.fn(this) : c.inverse(this)
                }),
                Handlebars.registerHelper("if_fav", function(a, b) {
                    var c = stringToArray(localStorage.getItem("favs"))
                      , d = !1;
                    return c ? ($.each(c, function(b, c) {
                        c == a && (d = !0)
                    }),
                    d ? b.fn(this) : b.inverse(this)) : b.inverse(this)
                });
                var l = {
                    panel: e,
                    firstMatch: h,
                    divElementId: e.divElement.id,
                    link: document.URL.split("?")[0].split("#")[0] + "?perspective=full&conceptId1=" + h.conceptId + "&edition=" + e.options.edition + "&release=" + e.options.release + "&server=" + e.options.serverUrl + "&langRefset=" + e.options.langRefset
                };
                $("#home-attributes-" + e.divElement.id).html(JST["views/conceptDetailsPlugin/tabs/home/attributes.hbs"](l));
                var m = "?perspective=full&conceptId1=" + h.conceptId + "&edition=" + c.edition + "&release=" + c.release + "&server=" + c.serverUrl + "&langRefset=" + c.langRefset;
                manualStateChange = !1;
                var n = {
                    name: h.defaultTerm,
                    conceptId: h.conceptId,
                    url: m
                };
                History.pushState(n, "SNOMED CT - " + h.defaultTerm, m),
                $(".glyphicon-star-empty").click(function(a) {
                    var b = {
                        module: h.module,
                        conceptId: h.conceptId,
                        defaultTerm: h.defaultTerm
                    };
                    if ($(a.target).hasClass("glyphicon-star")) {
                        var c = stringToArray(localStorage.getItem("favs"))
                          , d = [];
                        $.each(c, function(b, c) {
                            c != $(a.target).attr("data-conceptId") && d.push(c)
                        }),
                        localStorage.setItem("favs", d),
                        localStorage.removeItem("conceptId:" + $(a.target).attr("data-conceptId")),
                        $(a.target).addClass("glyphicon-star-empty"),
                        $(a.target).removeClass("glyphicon-star")
                    } else {
                        var c = stringToArray(localStorage.getItem("favs"))
                          , d = [];
                        c ? ($.each(c, function(b, c) {
                            c != $(a.target).attr("data-conceptId") && d.push(c)
                        }),
                        d.push($(a.target).attr("data-conceptId")),
                        localStorage.setItem("favs", d),
                        localStorage.setItem("conceptId:" + $(a.target).attr("data-conceptId"), JSON.stringify(b))) : (c = [],
                        c.push($(a.target).attr("data-conceptId")),
                        localStorage.setItem("favs", c),
                        localStorage.setItem("conceptId:" + $(a.target).attr("data-conceptId"), JSON.stringify(b))),
                        $(a.target).addClass("glyphicon-star"),
                        $(a.target).removeClass("glyphicon-star-empty")
                    }
                    channel.publish("favsAction")
                }),
                e.clipboard && e.clipboard.destroy(),
                e.clipboard = new Clipboard(".clip-btn"),
                e.clipboard.on("success", function(a) {
                    alertEvent("Copied!", "info"),
                    a.clearSelection()
                }),
                e.clipboard.on("error", function(a) {
                    console.log("Error!"),
                    alertEvent("Error", "error")
                }),
                document.addEventListener("copy", g, !1),
                $.getScript("https://jira.ihtsdotools.org/s/9152b378d577114d19d6cfdcdfdeb45e-T/en_US-i9n6p8/70120/a1623a9e469981bb7c457209f1507980/2.0.8/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=41bec258"),
                window.ATL_JQ_PAGE_PROPS = {
                    triggerFunction: function(a) {
                        jQuery("#fh-cd1_canvas-addsyn-sctid-details").click(function(b) {
                            b.preventDefault(),
                            a()
                        })
                    },
                    fieldValues: {
                        summary: "Förslag på synonymer för begreppet: " + n.conceptId,
                        customfield_10602: n.conceptId,
                        customfield_10601: n.name
                    }
                },
                $(".glyphicon-star").click(function(a) {
                    var b = {
                        module: h.module,
                        conceptId: h.conceptId,
                        defaultTerm: h.defaultTerm
                    };
                    if ($(a.target).hasClass("glyphicon-star")) {
                        var c = stringToArray(localStorage.getItem("favs"))
                          , d = [];
                        $.each(c, function(b, c) {
                            c != $(a.target).attr("data-conceptId") && d.push(c)
                        }),
                        localStorage.setItem("favs", d),
                        localStorage.removeItem("conceptId:" + $(a.target).attr("data-conceptId")),
                        $(a.target).addClass("glyphicon-star-empty"),
                        $(a.target).removeClass("glyphicon-star")
                    } else {
                        var c = stringToArray(localStorage.getItem("favs"))
                          , d = [];
                        c ? ($.each(c, function(b, c) {
                            c != $(a.target).attr("data-conceptId") && d.push(c)
                        }),
                        d.push($(a.target).attr("data-conceptId")),
                        localStorage.setItem("favs", d),
                        localStorage.setItem("conceptId:" + $(a.target).attr("data-conceptId"), JSON.stringify(b))) : (c = [],
                        c.push($(a.target).attr("data-conceptId")),
                        localStorage.setItem("favs", c),
                        localStorage.setItem("conceptId:" + $(a.target).attr("data-conceptId"), JSON.stringify(b))),
                        $(a.target).addClass("glyphicon-star"),
                        $(a.target).removeClass("glyphicon-star-empty")
                    }
                    channel.publish("favsAction")
                }),
                h.active ? $("#home-attributes-" + e.divElement.id).css("background-color", "#428bca") : $("#home-attributes-" + e.divElement.id).css("background-color", "LightPink"),
                $("#" + e.divElement.id + "-expandButton").is(":visible") && $("#" + e.divElement.id + "-panelTitle").html("&nbsp;&nbsp;&nbsp;<strong>Concept Details: " + e.defaultTerm + "</strong>"),
                "undefined" == typeof i18n_drag_this && (i18n_drag_this = "Drag this"),
                $("[draggable='true']").tooltip({
                    placement: "left auto",
                    trigger: "hover",
                    title: i18n_drag_this,
                    animation: !0,
                    delay: 500
                }),
                $("[draggable='true']").mouseover(function(a) {
                    var b = $(a.target).attr("data-term");
                    void 0 === b && (b = $($(a.target).parent()).attr("data-term")),
                    icon = iconToDrag(b)
                }),
                e.descsPId = a.id + "-descriptions-panel";
                "900000000000508004" == e.options.langRefset || ("900000000000509007" == e.options.langRefset || ("450828004" == e.options.langRefset || ("554461000005103" == e.options.langRefset || ("46011000052107" == e.options.langRefset || ("32570271000036106" == e.options.langRefset || ("999001251000000103" == e.options.langRefset || e.options.langRefset))))));
                var o = "";
                $.each(e.options.langRefset, function(a, b) {
                    var f = h.descriptions.slice(0)
                      , g = "";
                    $.each(f, function(a, b) {
                        b.included = !1,
                        b.preferred = !1,
                        b.acceptable = !1,
                        (e.options.displayInactiveDescriptions || 1 == b.active) && 1 == b.active && ("" != g && (g += "<br>"),
                        g = g + "&nbsp;&nbsp;<i>" + b.lang + "</i>&nbsp;&nbsp;&nbsp;" + b.term)
                    }),
                    Handlebars.registerHelper("removeSemtag", function(a) {
                        return e.removeSemtag(a)
                    }),
                    Handlebars.registerHelper("if_eq", function(a, b, c) {
                        if ("undefined" != c)
                            return a == b ? c.fn(this) : c.inverse(this)
                    });
                    var i = [];
                    $.each(f, function(a, d) {
                        var f = !1;
                        d.langMemberships && $.each(d.langMemberships, function(a, c) {
                            c.refset.conceptId == b && (f = !0,
                            "900000000000548007" == c.acceptability.conceptId ? d.preferred = !0 : "900000000000549004" == c.acceptability.conceptId && (d.acceptable = !0))
                        }),
                        f ? i.push(d) : (d.acceptable = !1,
                        e.options.hideNotAcceptable ? e.options.displayInactiveDescriptions && i.push(d) : c.displayInactiveDescriptions ? i.push(d) : d.active && i.push(d))
                    }),
                    f = i.slice(0),
                    f.sort(function(a, b) {
                        if (a.active && !b.active)
                            return -1;
                        if (!a.active && b.active)
                            return 1;
                        if (a.active == b.active) {
                            if ((a.acceptable || a.preferred) && !b.preferred && !b.acceptable)
                                return -1;
                            if (!a.preferred && !a.acceptable && (b.acceptable || b.preferred))
                                return 1;
                            if (a.type.conceptId < b.type.conceptId)
                                return -1;
                            if (a.type.conceptId > b.type.conceptId)
                                return 1;
                            if (a.type.conceptId == b.type.conceptId) {
                                if (a.preferred && !b.preferred)
                                    return -1;
                                if (!a.preferred && b.preferred)
                                    return 1;
                                if (a.preferred == b.preferred) {
                                    if (a.term < b.term)
                                        return -1;
                                    if (a.term > b.term)
                                        return 1
                                }
                            }
                        }
                        return 0
                    });
                    var j = {
                        options: e.options,
                        languageName: "(" + d[b] + ")",
                        longLangName: b,
                        divElementId: e.divElement.id,
                        allDescriptions: f
                    };
                    $.each(e.options.manifest.languageRefsets, function(a, c) {
                        c.conceptId == b && (j.longLangName = c.defaultTerm)
                    }),
                    o += JST["views/conceptDetailsPlugin/tabs/details/descriptions-panel.hbs"](j),
                    $("#home-descriptions-" + e.divElement.id).html(g)
                }),
                $("#" + e.descsPId).html(o),
                1 != e.options.displaySynonyms && ($("#" + e.descsPId).find(".synonym-row").each(function(a, b) {
                    $(b).toggle()
                }),
                $(this).toggleClass("glyphicon-plus"),
                $(this).toggleClass("glyphicon-minus")),
                $("#" + e.descsPId + "-descButton").disableTextSelect(),
                $("#" + e.descsPId + "-descButton").click(function() {
                    table = $(this).closest("table").first(),
                    $(this).toggleClass("glyphicon-plus"),
                    $(this).toggleClass("glyphicon-minus"),
                    table.find(".synonym-row").each(function(a, b) {
                        $(b).toggle()
                    })
                }),
                $("#" + e.descsPId).find("[rel=tooltip-right]").tooltip({
                    placement: "right"
                }),
                "stated" == e.options.selectedView ? ($("#home-" + e.divElement.id + "-stated-button").unbind(),
                $("#home-" + e.divElement.id + "-inferred-button").unbind(),
                $("#home-" + e.divElement.id + "-stated-button").addClass("btn-primary"),
                $("#home-" + e.divElement.id + "-stated-button").removeClass("btn-default"),
                $("#home-" + e.divElement.id + "-inferred-button").addClass("btn-default"),
                $("#home-" + e.divElement.id + "-inferred-button").removeClass("btn-primary"),
                $("#home-" + e.divElement.id + "-inferred-button").click(function(a) {
                    e.options.selectedView = "inferred",
                    e.updateCanvas()
                })) : ($("#home-" + e.divElement.id + "-stated-button").unbind(),
                $("#home-" + e.divElement.id + "-inferred-button").unbind(),
                $("#home-" + e.divElement.id + "-inferred-button").addClass("btn-primary"),
                $("#home-" + e.divElement.id + "-inferred-button").removeClass("btn-default"),
                $("#home-" + e.divElement.id + "-stated-button").addClass("btn-default"),
                $("#home-" + e.divElement.id + "-stated-button").removeClass("btn-primary"),
                $("#home-" + e.divElement.id + "-stated-button").click(function(a) {
                    e.options.selectedView = "stated",
                    e.updateCanvas()
                })),
                e.relsPId = a.id + "-rels-panel",
                e.statedParents = [],
                e.inferredParents = [],
                e.statedRoles = [],
                e.inferredRoles = [],
                h.relationships && h.relationships.sort(function(a, b) {
                    return a.groupId < b.groupId ? -1 : a.groupId > b.groupId ? 1 : 116680003 == a.type.conceptId ? -1 : 116680003 == b.type.conceptId ? 1 : a.target.defaultTerm < b.target.defaultTerm ? -1 : a.target.defaultTerm > b.target.defaultTerm ? 1 : 0
                }),
                h.statedRelationships && h.statedRelationships.sort(function(a, b) {
                    return a.groupId < b.groupId ? -1 : a.groupId > b.groupId ? 1 : 116680003 == a.type.conceptId ? -1 : 116680003 == b.type.conceptId ? 1 : a.target.defaultTerm < b.target.defaultTerm ? -1 : a.target.defaultTerm > b.target.defaultTerm ? 1 : 0
                }),
                Handlebars.registerHelper("push", function(a, b) {
                    b.push(a)
                }),
                Handlebars.registerHelper("if_eq", function(a, b, c) {
                    if ("undefined" != c)
                        return a == b ? c.fn(this) : c.inverse(this)
                });
                var p;
                h.additionalRelationships && $.each(h.additionalRelationships, function(a, b) {
                    b.active && (void 0 === p && (p = []),
                    p.push(b))
                });
                var l = {
                    options: e.options,
                    firstMatch: h,
                    inferredParents: e.inferredParents,
                    inferredRoles: e.inferredRoles,
                    statedParents: e.statedParents,
                    statedRoles: e.statedRoles,
                    additionalRels: p
                };
                $("#" + e.relsPId).html(JST["views/conceptDetailsPlugin/tabs/details/rels-panel.hbs"](l)),
                e.inferredParents.sort(function(a, b) {
                    return a.target.defaultTerm < b.target.defaultTerm ? -1 : a.target.defaultTerm > b.target.defaultTerm ? 1 : 0
                }),
                e.statedParents.sort(function(a, b) {
                    return a.target.defaultTerm < b.target.defaultTerm ? -1 : a.target.defaultTerm > b.target.defaultTerm ? 1 : 0
                }),
                e.inferredRoles.sort(function(a, b) {
                    return a.groupId < b.groupId ? -1 : a.groupId > b.groupId ? 1 : a.target.defaultTerm < b.target.defaultTerm ? -1 : a.target.defaultTerm > b.target.defaultTerm ? 1 : 0
                }),
                e.statedRoles.sort(function(a, b) {
                    return a.groupId < b.groupId ? -1 : a.groupId > b.groupId ? 1 : a.target.defaultTerm < b.target.defaultTerm ? -1 : a.target.defaultTerm > b.target.defaultTerm ? 1 : 0
                }),
                Handlebars.registerHelper("substr", function(a, b) {
                    var c = a.lastIndexOf("(") - 1;
                    return a.substr(b, c)
                }),
                Handlebars.registerHelper("if_eq", function(a, b, c) {
                    if ("undefined" != c)
                        return a == b ? c.fn(this) : c.inverse(this)
                }),
                Handlebars.registerHelper("if_gr", function(a, b, c) {
                    if (a) {
                        return a.lastIndexOf("(") > b ? c.fn(this) : c.inverse(this)
                    }
                }),
                Handlebars.registerHelper("hasCountryIcon", function(a, b) {
                    return countryIcons[a] ? b.fn(this) : b.inverse(this)
                });
                var l = {
                    divElementId: e.divElement.id,
                    statedParents: e.statedParents,
                    inferredParents: e.inferredParents,
                    options: e.options
                };
                $("#home-parents-" + e.divElement.id).html(JST["views/conceptDetailsPlugin/tabs/home/parents.hbs"](l)),
                e.options.diagrammingMarkupEnabled || $("#home-parents-" + e.divElement.id).html(e.stripDiagrammingMarkup($("#home-parents-" + e.divElement.id).html())),
                $(".treeButton").disableTextSelect(),
                $("[draggable='true']").tooltip({
                    placement: "left auto",
                    trigger: "hover",
                    title: i18n_drag_this,
                    animation: !0,
                    delay: 500
                }),
                $("[draggable='true']").mouseover(function(a) {
                    var b = $(a.target).attr("data-term");
                    void 0 === b && (b = $($(a.target).parent()).attr("data-term")),
                    icon = iconToDrag(b)
                }),
                $("#home-parents-" + e.divElement.id).unbind(),
                $("#home-parents-" + e.divElement.id).click(function(a) {
                    if ($(a.target).hasClass("treeButton")) {
                        var b = a.target;
                        navigator.userAgent.indexOf("Firefox") > -1 && (b = $(b).context.children);
                        var c = $(b).closest("li").attr("data-concept-id");
                        a.preventDefault(),
                        $(b).hasClass("glyphicon-chevron-up") ? ($(b).closest("li").find("ul").remove(),
                        $(b).removeClass("glyphicon-chevron-up"),
                        $(b).addClass("glyphicon-chevron-right")) : $(b).hasClass("glyphicon-chevron-right") ? ($(b).removeClass("glyphicon-chevron-right"),
                        $(b).addClass("glyphicon-refresh"),
                        $(b).addClass("icon-spin"),
                        e.getParent(c, b)) : $(b).hasClass("glyphicon-minus")
                    } else if ($(a.target).hasClass("treeLabel")) {
                        var d = $(a.target).attr("data-concept-id");
                        void 0 !== d && channel.publish(e.divElement.id, {
                            term: $(a.target).attr("data-term"),
                            module: $(a.target).attr("data-module"),
                            conceptId: d,
                            source: e.divElement.id
                        })
                    }
                }),
                $("#home-parents-" + e.divElement.id).dblclick(function(a) {
                    var b = $(a.target).closest("li").attr("data-concept-id");
                    e.conceptId = b,
                    e.updateCanvas(),
                    channel.publish(e.divElement.id, {
                        term: $(a.target).attr("data-term"),
                        module: $(a.target).attr("data-module"),
                        conceptId: b,
                        source: e.divElement.id
                    })
                }),
                Handlebars.registerHelper("eqLastGroup", function(a, b) {
                    return null == e.lastGroup ? (e.lastGroup = a,
                    b.fn(this)) : a != e.lastGroup ? b.fn(this) : b.inverse(this)
                }),
                Handlebars.registerHelper("if_eq", function(a, b, c) {
                    if ("undefined" != c)
                        return a == b ? c.fn(this) : c.inverse(this)
                }),
                Handlebars.registerHelper("removeSemtag", function(a) {
                    return e.removeSemtag(a)
                }),
                Handlebars.registerHelper("setLastGroup", function(a) {
                    e.lastGroup = a
                }),
                Handlebars.registerHelper("lastColor", function(a) {
                    if ("get" == a)
                        return "";
                    e.color = "random" == a ? getRandomColor() : a
                }),
                Handlebars.registerHelper("getRandomColor", function() {
                    return ""
                });
                var l = {
                    options: e.options,
                    statedRoles: e.statedRoles,
                    inferredRoles: e.inferredRoles
                };
                $("#home-roles-" + e.divElement.id).html(JST["views/conceptDetailsPlugin/tabs/home/roles.hbs"](l)),
                e.options.diagrammingMarkupEnabled || $("#home-roles-" + e.divElement.id).html(e.stripDiagrammingMarkup($("#home-roles-" + e.divElement.id).html())),
                Handlebars.registerHelper("if_eq", function(a, b, c) {
                    if ("undefined" != c)
                        return a == b ? c.fn(this) : c.inverse(this)
                }),
                Handlebars.registerHelper("refset", function(a, b, c) {
                    if ("get" == b)
                        return e.refset[a] ? c.fn(this) : c.inverse(this);
                    e.refset[a] = b
                });
                var l = {
                    firstMatch: h
                };
                if ($("#refsets-" + e.divElement.id).html(JST["views/conceptDetailsPlugin/tabs/refset.hbs"](l)),
                $.each($("#refsets-" + e.divElement.id).find(".refset-simplemap"), function(a, b) {
                    "467614008" == $(b).attr("data-refsetId") && channel.publish("refsetSubscription-467614008", {
                        conceptId: $(b).attr("data-conceptId")
                    })
                }),
                "references-tab" == $("ul#details-tabs-" + e.divElement.id + " li.active").attr("id") && ($("#references-" + e.divElement.id + "-resultsTable").html(""),
                e.getReferences(h.conceptId)),
                "diagram-tab" == $("ul#details-tabs-" + e.divElement.id + " li.active").attr("id") && drawConceptDiagram(h, $("#diagram-canvas-" + e.divElement.id), e.options, e),
                "expression-tab" == $("ul#details-tabs-" + e.divElement.id + " li.active").attr("id") && ($("#expression-canvas-" + e.divElement.id).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
                setTimeout(function() {
                    renderExpression(h, h, $("#expression-canvas-" + e.divElement.id), c)
                }, 300)),
                $("#references-tab-link-" + e.divElement.id).unbind(),
                $("#references-tab-link-" + e.divElement.id).click(function(a) {
                    $("#references-" + e.divElement.id + "-resultsTable").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
                    e.getReferences(h.conceptId)
                }),
                $("#diagram-tab-link-" + e.divElement.id).unbind(),
                $("#diagram-tab-link-" + e.divElement.id).click(function(a) {
                    $("#diagram-canvas-" + e.divElement.id).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
                    setTimeout(function() {
                        $("#diagram-canvas-" + e.divElement.id).html(""),
                        drawConceptDiagram(h, $("#diagram-canvas-" + e.divElement.id), e.options, e)
                    }, 1e3)
                }),
                $("#expression-tab-link-" + e.divElement.id).unbind(),
                $("#expression-tab-link-" + e.divElement.id).click(function(a) {
                    $("#expression-canvas-" + e.divElement.id).html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
                    setTimeout(function() {
                        $("#expression-canvas-" + e.divElement.id).html(""),
                        renderExpression(h, h, $("#expression-canvas-" + e.divElement.id), c)
                    }, 1e3)
                }),
                h.defaultTerm.endsWith("(clinical drug)")) {
                    $("#product-details-tab").show();
                    var q = {
                        defaultTerm: h.defaultTerm,
                        forms: [],
                        groups: {},
                        ingredients: []
                    };
                    h.relationships.forEach(function(a) {
                        "411116001" == a.type.conceptId && a.active ? q.forms.push(a) : a.active && 0 != a.groupId && (void 0 === q.groups[a.groupId] && (q.groups[a.groupId] = []),
                        q.groups[a.groupId].push(a))
                    }),
                    Object.keys(q.groups).forEach(function(a) {
                        var b = q.groups[a]
                          , c = {};
                        b.forEach(function(a) {
                            "127489000" == a.type.conceptId ? c.ingredient = a.target : "732946004" == a.type.conceptId ? c.denominatorValue = a.target : "732944001" == a.type.conceptId ? c.numeratorValue = a.target : "732943007" == a.type.conceptId ? c.boss = a.target : "732947008" == a.type.conceptId ? c.denominatorUnit = a.target : "732945000" == a.type.conceptId && (c.numeratorUnit = a.target)
                        }),
                        q.ingredients.push(c)
                    }),
                    console.log(q);
                    var l = {
                        productData: q
                    };
                    $("#product-details-" + e.divElement.id).html(JST["views/conceptDetailsPlugin/tabs/product.hbs"](l))
                } else
                    $("#product-details-tab").hide(),
                    $("#details-tabs-" + e.divElement.id + " a:first").tab("show");
                $(".more-fields-button").disableTextSelect(),
                $(".more-fields-button").popover(),
                navigator.userAgent.indexOf("Firefox") > -1 && ($(".more-fields-button").optionsPopover({
                    contents: "",
                    disableBackButton: !0
                }),
                $(".more-fields-button").click(function(a) {
                    var b = $(a.target).attr("data-content");
                    $("#popoverContent").html(b)
                })),
                "stated" == e.options.selectedView ? $("#" + e.relsPId).find(".inferred-rel").each(function(a, b) {
                    $(b).toggle()
                }) : "inferred" == e.options.selectedView ? $("#" + e.relsPId).find(".stated-rel").each(function(a, b) {
                    $(b).toggle()
                }) : e.options.selectedView,
                $("[draggable='true']").tooltip({
                    placement: "left auto",
                    trigger: "hover",
                    title: i18n_drag_this,
                    animation: !0,
                    delay: 500
                }),
                $("[draggable='true']").mouseover(function(a) {
                    var b = $(a.target).attr("data-term");
                    void 0 === b && (b = $($(a.target).parent()).attr("data-term")),
                    icon = iconToDrag(b)
                }),
                "function" == typeof switchLanguage && switchLanguage(selectedLanguage, selectedFlag, !1),
                k = 0
            }).fail(function() {
                e.relsPId = a.id + "-rels-panel",
                e.attributesPId = a.id + "-attributes-panel",
                e.descsPId = a.id + "-descriptions-panel",
                $("#home-" + e.divElement.id).html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>"),
                $("#diagram-" + e.divElement.id).html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>"),
                $("#members-" + e.divElement.id).html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>"),
                $("#references-" + e.divElement.id).html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>"),
                $("#refsets-" + e.divElement.id).html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>"),
                $("#" + e.attributesPId).html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>"),
                $("#" + e.descsPId).html(""),
                $("#" + e.relsPId).html("")
            }),
            e.options.displayChildren)
                ;null != g && g.abort(),
            g = $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + e.conceptId + "/children?form=" + e.options.selectedView, function(a) {}).done(function(b) {
                b.sort(function(a, b) {
                    return a.defaultTerm.toLowerCase() < b.defaultTerm.toLowerCase() ? -1 : a.defaultTerm.toLowerCase() > b.defaultTerm.toLowerCase() ? 1 : 0
                }),
                Handlebars.registerHelper("if_gr", function(a, b, c) {
                    if (a)
                        return a > b ? c.fn(this) : c.inverse(this)
                }),
                g = null,
                e.childrenPId = a.id + "-children-panel";
                var c = {
                    displayChildren: e.options.displayChildren,
                    divElementId: e.divElement.id,
                    childrenResult: b,
                    selectedView: e.options.selectedView
                };
                $("#home-children-cant-" + e.divElement.id).html("(" + b.length + ")"),
                $("#" + e.childrenPId).html(JST["views/conceptDetailsPlugin/tabs/details/children-panel.hbs"](c)),
                $("#home-children-" + e.divElement.id + "-body").html(JST["views/conceptDetailsPlugin/tabs/home/children.hbs"](c)),
                $(".treeButton").disableTextSelect(),
                "undefined" == typeof i18n_drag_this && (i18n_drag_this = "Drag this"),
                $("[draggable='true']").tooltip({
                    placement: "left auto",
                    trigger: "hover",
                    title: i18n_drag_this,
                    animation: !0,
                    delay: 500
                }),
                $("[draggable='true']").mouseover(function(a) {
                    var b = $(a.target).attr("data-term");
                    void 0 === b && (b = $($(a.target).parent()).attr("data-term")),
                    icon = iconToDrag(b)
                }),
                $("#home-children-" + e.divElement.id + "-body").unbind(),
                $("#home-children-" + e.divElement.id + "-body").click(function(a) {
                    if ($(a.target).hasClass("treeButton")) {
                        var b = $(a.target).closest("li").attr("data-concept-id")
                          , c = e.divElement.id + "-treeicon-" + b;
                        a.preventDefault(),
                        $("#" + c).hasClass("glyphicon-chevron-down") ? ($(a.target).closest("li").find("ul").remove(),
                        $("#" + c).removeClass("glyphicon-chevron-down"),
                        $("#" + c).addClass("glyphicon-chevron-right")) : $("#" + c).hasClass("glyphicon-chevron-right") ? ($("#" + c).removeClass("glyphicon-chevron-right"),
                        $("#" + c).addClass("glyphicon-refresh"),
                        $("#" + c).addClass("icon-spin"),
                        e.getChildren($(a.target).closest("li").attr("data-concept-id"), !0)) : $("#" + c).hasClass("glyphicon-minus")
                    } else if ($(a.target).hasClass("treeLabel")) {
                        var d = $(a.target).attr("data-concept-id");
                        void 0 !== d && channel.publish(e.divElement.id, {
                            term: $(a.target).attr("data-term"),
                            module: $(a.target).attr("data-module"),
                            conceptId: d,
                            source: e.divElement.id
                        })
                    }
                }),
                $("#home-children-" + e.divElement.id + "-body").dblclick(function(a) {
                    var b = $(a.target).closest("li").attr("data-concept-id");
                    e.conceptId = b,
                    e.updateCanvas(),
                    channel.publish(e.divElement.id, {
                        term: $(a.target).attr("data-term"),
                        module: $(a.target).attr("data-module"),
                        conceptId: b,
                        source: e.divElement.id
                    })
                }),
                "undefined" == typeof i18n_display_children && (i18n_display_children = "Display Children"),
                $("#" + e.divElement.id + "-showChildren").tooltip({
                    placement: "right",
                    trigger: "hover",
                    title: i18n_display_children,
                    animation: !0,
                    delay: 500
                }),
                $("#" + e.divElement.id + "-showChildren").click(function() {
                    e.options.displayChildren = !0,
                    e.updateCanvas()
                })
            }).fail(function() {
                $("#" + e.childrenPId).html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>")
            }),
            e.loadMembers(100, 0)
        }
    }
    ,
    this.getReferences = function(a) {
        $("#references-" + e.divElement.id + "-accordion").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
        null != h && h.abort(),
        h = $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + a + "/references?form=" + e.options.selectedView, function(a) {}).done(function(a) {
            Handlebars.registerHelper("if_gr", function(a, b, c) {
                if (a)
                    return a > b ? c.fn(this) : c.inverse(this)
            }),
            $.each(a, function(a, b) {
                b.statedRelationships ? b.relationship = b.statedRelationships[0].type.defaultTerm : b.relationship = b.relationships[0].type.defaultTerm
            }),
            a.sort(function(a, b) {
                if (a.relationship < b.relationship)
                    return -1;
                if (a.relationship > b.relationship)
                    return 1;
                if (a.relationship == b.relationship) {
                    if (a.defaultTerm < b.defaultTerm)
                        return -1;
                    if (a.defaultTerm > b.defaultTerm)
                        return 1
                }
                return 0
            }),
            a.groups = [];
            var b = ""
              , c = [];
            $.each(a, function(d, e) {
                "" == b ? (c.push(e),
                b = e.relationship) : b == e.relationship ? c.push(e) : (a.groups.push(c),
                c = [],
                c.push(e),
                b = e.relationship)
            }),
            a.groups.push(c);
            var d = {
                divElementId: e.divElement.id,
                result: a,
                groups: a.groups
            };
            $("#references-" + e.divElement.id + "-accordion").html(JST["views/conceptDetailsPlugin/tabs/references.hbs"](d)),
            $("#references-" + e.divElement.id + "-accordion").click(function(a) {
                if ($($(a.target).closest("a").attr("href")).hasClass("collapse")) {
                    var b = $($(a.target).closest("a").attr("href") + "-span");
                    b.hasClass("glyphicon-chevron-right") ? (b.removeClass("glyphicon-chevron-right"),
                    b.addClass("glyphicon-chevron-down")) : (b.addClass("glyphicon-chevron-right"),
                    b.removeClass("glyphicon-chevron-down"))
                }
            })
        }).fail(function() {
            $("#references-" + e.divElement.id + "-accordion").html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>")
        })
    }
    ,
    this.getChildren = function(a, b) {
        void 0 === e.options.selectedView && (e.options.selectedView = "inferred"),
        "inferred" == e.options.selectedView ? $("#" + e.divElement.id + "-txViewLabel").html("<span class='i18n' data-i18n-id='i18n_inferred_view'>Inferred view</span>") : $("#" + e.divElement.id + "-txViewLabel").html("<span class='i18n' data-i18n-id='i18n_stated_view'>Stated view</span>"),
        null != g && g.abort(),
        g = $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + a + "/children?form=" + e.options.selectedView, function(a) {}).done(function(c) {
            c.sort(function(a, b) {
                return a.defaultTerm.toLowerCase() < b.defaultTerm.toLowerCase() ? -1 : a.defaultTerm.toLowerCase() > b.defaultTerm.toLowerCase() ? 1 : 0
            });
            var d = []
              , f = {
                displayChildren: e.options.displayChildren,
                childrenResult: c,
                divElementId: e.divElement.id,
                selectedView: e.options.selectedView
            };
            void 0 !== b && b && (f.displayChildren = b),
            Handlebars.registerHelper("hasCountryIcon", function(a, b) {
                return countryIcons[a] ? b.fn(this) : b.inverse(this)
            }),
            Handlebars.registerHelper("if_eq", function(a, b, c) {
                if ("undefined" != c)
                    return a == b ? c.fn(this) : c.inverse(this)
            }),
            Handlebars.registerHelper("push", function(a) {
                d.push(a)
            }),
            $("#" + e.divElement.id + "-treeicon-" + a).removeClass("glyphicon-refresh"),
            $("#" + e.divElement.id + "-treeicon-" + a).removeClass("icon-spin"),
            c.length > 0 ? $("#" + e.divElement.id + "-treeicon-" + a).addClass("glyphicon-chevron-down") : $("#" + e.divElement.id + "-treeicon-" + a).addClass("glyphicon-minus"),
            $("#" + e.divElement.id + "-treenode-" + a).closest("li").append(JST["views/conceptDetailsPlugin/tabs/home/children.hbs"](f)),
            $(".treeButton").disableTextSelect(),
            $("[draggable='true']").tooltip({
                placement: "left auto",
                trigger: "hover",
                title: i18n_drag_this,
                animation: !0,
                delay: 500
            }),
            $("[draggable='true']").mouseover(function(a) {
                var b = $(a.target).attr("data-term");
                void 0 === b && (b = $($(a.target).parent()).attr("data-term")),
                icon = iconToDrag(b)
            })
        }).fail(function() {
            $("#" + e.divElement.id + "-treeicon-" + a).removeClass("icon-spin"),
            $("#" + e.divElement.id + "-treeicon-" + a).removeClass("glyphicon-refresh"),
            $("#" + e.divElement.id + "-treeicon-" + a).addClass("glyphicon-minus")
        })
    }
    ,
    this.getParent = function(a, b) {
        null != i && i.abort(),
        i = $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + a + "/parents?form=" + e.options.selectedView, function(a) {}).done(function(a) {
            a.sort(function(a, b) {
                return a.defaultTerm.toLowerCase() < b.defaultTerm.toLowerCase() ? -1 : a.defaultTerm.toLowerCase() > b.defaultTerm.toLowerCase() ? 1 : 0
            });
            var c = ""
              , d = $(b).attr("data-ind");
            a.length > 0 && (c = $(b).attr("data-firstt") ? "<ul style='margin-left: 95px; list-style-type: none; padding-left: 15px'>" : "<ul style='list-style-type: none; padding-left: 15px'>",
            $.each(a, function(a, b) {
                c = c + "<li class='treeLabel' data-module='" + b.module + "' data-concept-id='" + b.conceptId + "' data-term='" + b.defaultTerm + "'><button class='btn btn-link btn-xs treeButton' style='padding:2px'>",
                c = "138875005" == b.conceptId || "9999999999" == b.conceptId ? c + "<i class='glyphicon glyphicon-minus treeButton' data-ind='" + d + "'></i></button>" : c + "<i class='glyphicon glyphicon-chevron-right treeButton' data-ind='" + d + "'></i></button>",
                c = "Primitive" == b.definitionStatus ? c + "<span class='badge alert-warning' draggable='true' ondragstart='drag(event)' data-module='" + b.module + "' data-concept-id='" + b.conceptId + "' data-term='" + b.defaultTerm + "'>&nbsp;&nbsp;</span>&nbsp;&nbsp" : c + "<span class='badge alert-warning' draggable='true' ondragstart='drag(event)' data-module='" + b.module + "' data-concept-id='" + b.conceptId + "' data-term='" + b.defaultTerm + "'>&equiv;</span>&nbsp;&nbsp",
                countryIcons[b.module] && (c = c + "<div class='phoca-flagbox' style='width:26px;height:26px'><span class='phoca-flag " + countryIcons[b.module] + "'></span></div>&nbsp"),
                c = c + "<a id='" + d + e.divElement.id + "-treeicon-" + b.conceptId + "' href='javascript:void(0);' style='color: inherit;text-decoration: inherit;'>",
                c = c + "<span class='treeLabel selectable-row' data-module='" + b.module + "' data-concept-id='" + b.conceptId + "' data-term='" + b.defaultTerm + "'>" + b.defaultTerm + "</span></a></li>"
            }),
            c += "</ul>"),
            $(b).removeClass("glyphicon-refresh"),
            $(b).removeClass("icon-spin"),
            a.length > 0 ? $(b).addClass("glyphicon-chevron-up") : $(b).addClass("glyphicon-minus"),
            $(b).closest("li").prepend(c),
            $(".treeButton").disableTextSelect(),
            $("[draggable='true']").tooltip({
                placement: "left auto",
                trigger: "hover",
                title: i18n_drag_this,
                animation: !0,
                delay: 500
            }),
            $("[draggable='true']").mouseover(function(a) {
                var b = $(a.target).attr("data-term");
                void 0 === b && (b = $($(a.target).parent()).attr("data-term")),
                icon = iconToDrag(b)
            })
        }).fail(function() {})
    }
    ,
    this.loadMembers = function(a, b, d) {
        var f = c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + e.conceptId + "/members?limit=" + a;
        b > 0 ? f = f + "&skip=" + b : $("#members-" + e.divElement.id + "-resultsTable").html("<tr><td class='text-muted' colspan='2'><i class='glyphicon glyphicon-refresh icon-spin'></i></td></tr>");
        var g;
        e.options.manifest && $.each(e.options.manifest.refsets, function(a, b) {
            b.conceptId == e.conceptId && b.count && (g = b.count)
        }),
        void 0 !== g && (d = 1,
        f += "&paginate=1"),
        null != j && j.abort(),
        j = $.getJSON(f, function(a) {}).done(function(c) {
            var f = "asd";
            if (void 0 === g && (g = c.details.total),
            (f = g == b ? 0 : g > b + a ? g - (b + a) : 0) < a)
                var h = f;
            else if (0 != f)
                var h = a;
            else
                var h = 0;
            var i = {
                result: c,
                returnLimit: h,
                remaining: f,
                divElementId: e.divElement.id,
                skipTo: b,
                panel: e
            };
            Handlebars.registerHelper("if_eq", function(a, b, c) {
                if ("undefined" != c)
                    return a == b ? c.fn(this) : c.inverse(this)
            }),
            Handlebars.registerHelper("if_gr", function(a, b, c) {
                if (a)
                    return a > b ? c.fn(this) : c.inverse(this)
            }),
            Handlebars.registerHelper("hasCountryIcon", function(a, b) {
                return countryIcons[a] ? b.fn(this) : b.inverse(this)
            }),
            0 != c.members.length ? ($("#" + e.divElement.id + "-moreMembers").remove(),
            $("#members-" + e.divElement.id + "-resultsTable").find(".more-row").remove(),
            0 == b ? $("#members-" + e.divElement.id + "-resultsTable").html(JST["views/conceptDetailsPlugin/tabs/members.hbs"](i)) : $("#members-" + e.divElement.id + "-resultsTable").append(JST["views/conceptDetailsPlugin/tabs/members.hbs"](i)),
            $("#" + e.divElement.id + "-moreMembers").click(function() {
                $("#" + e.divElement.id + "-moreMembers").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
                e.loadMembers(h, b + a, d)
            }),
            $("#members-" + e.divElement.id + "-sort").unbind(),
            $("#members-" + e.divElement.id + "-sort").click(function() {
                $("#members-" + e.divElement.id + "-sort").blur(),
                e.loadMembers(a, 0, 1)
            })) : 0 != b ? ($("#" + e.divElement.id + "-moreMembers").remove(),
            $("#members-" + e.divElement.id + "-resultsTable").find(".more-row").remove(),
            0 == b ? $("#members-" + e.divElement.id + "-resultsTable").html(JST["views/conceptDetailsPlugin/tabs/members.hbs"](i)) : $("#members-" + e.divElement.id + "-resultsTable").append(JST["views/conceptDetailsPlugin/tabs/members.hbs"](i)),
            $("#" + e.divElement.id + "-moreMembers").click(function() {
                $("#" + e.divElement.id + "-moreMembers").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
                e.loadMembers(h, b + a, d)
            }),
            $("#members-" + e.divElement.id + "-sort").unbind(),
            $("#members-" + e.divElement.id + "-sort").click(function() {
                $("#members-" + e.divElement.id + "-sort").blur(),
                e.loadMembers(a, 0, 1)
            })) : $("#members-" + e.divElement.id + "-resultsTable").html("<tr><td class='text-muted' colspan='2'><span data-i18n-id='i18n_no_members' class='i18n'>This concept has no members</span></td></tr>"),
            $("#members-" + e.divElement.id).find(".member-row").unbind(),
            $("#members-" + e.divElement.id).find(".member-row").click(function(a) {
                var b = $(a.target).data("concept-id");
                e.conceptId = b,
                $("#details-tabs-" + e.divElement.id + " a:first").tab("show"),
                e.updateCanvas()
            })
        }).fail(function() {
            $("#members-" + e.divElement.id + "-resultsTable").html("<tr><td class='text-muted' colspan='2'><span data-i18n-id='i18n_no_members' class='i18n'>This concept has no members</span></td></tr>")
        })
    }
    ,
    this.stripDiagrammingMarkup = function(a) {
        return a || (a = ""),
        a = a.replace(new RegExp(e.escapeRegExp("sct-primitive-concept-compact"),"g"), ""),
        a = a.replace(new RegExp(e.escapeRegExp("sct-defined-concept-compact"),"g"), ""),
        a = a.replace(new RegExp(e.escapeRegExp("sct-attribute-compact"),"g"), "")
    }
    ,
    this.escapeRegExp = function(a) {
        return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
    }
    ,
    this.removeSemtag = function(a) {
        return a.lastIndexOf("(") > 0 ? a.substr(0, a.lastIndexOf("(") - 1) : a
    }
    ,
    this.loadMarkers = function() {
        var a = ""
          , b = 0
          , c = 0
          , d = !1
          , f = !1;
        $.each(componentsRegistry, function(a, b) {
            var c = b.divElement.id;
            $("#" + c + "-subscribersMarker").is(":visible") && (f = !0)
        }),
        0 == e.subscribers.length ? (b = 14,
        $("#" + e.divElement.id + "-ownMarker").hide()) : (f || $("#" + e.divElement.id + "-ownMarker").hide(),
        d = !0),
        $("#" + e.divElement.id + "-subscribersMarker").is(":visible") && ($("#" + e.divElement.id + "-panelTitle").html($("#" + e.divElement.id + "-panelTitle").html().replace(/&nbsp;/g, "")),
        d && $("#" + e.divElement.id + "-panelTitle").html("&nbsp&nbsp&nbsp&nbsp" + $("#" + e.divElement.id + "-panelTitle").html()),
        $.each(e.subscriptionsColor, function(d, f) {
            a = a + "<i class='glyphicon glyphicon-bookmark' style='color: " + f + "; top:" + c + "px; right: " + b + "px;'></i>",
            $("#" + e.divElement.id + "-panelTitle").html("&nbsp&nbsp" + $("#" + e.divElement.id + "-panelTitle").html()),
            c += 5,
            b += 10
        }),
        $("#" + e.divElement.id + "-subscribersMarker").html(a))
    }
    ,
    this.subscribe = function(a) {
        var b = a.divElement.id
          , c = !1;
        if ($.each(e.subscriptionsColor, function(b, d) {
            d == a.markerColor && (c = !0)
        }),
        !c) {
            var d = channel.subscribe(b, function(a, b) {
                e.conceptId = a.conceptId,
                a.showConcept && $('a[href="#fh-cd1_canvas-pane"]').click(),
                $("#home-children-" + e.divElement.id + "-body").length > 0 || (e.setupCanvas(),
                e.loadMarkers && e.loadMarkers()),
                e.updateCanvas()
            });
            e.subscriptions.push(d),
            a.subscribers.push(e.divElement.id),
            e.subscriptionsColor.push(a.markerColor)
        }
        $("#" + b + "-ownMarker").show(),
        $("#" + e.divElement.id + "-subscribersMarker").show(),
        $("#" + b + "-ownMarker").show()
    }
    ,
    this.unsubscribe = function(a) {
        var b = []
          , c = []
          , d = !0;
        $.each(e.subscriptionsColor, function(b, e) {
            e != a.markerColor ? c.push(e) : d = !1
        }),
        d || (e.subscriptionsColor = c,
        c = [],
        $.each(a.subscribers, function(a, c) {
            c != e.divElement.id && b.push(c)
        }),
        a.subscribers = b,
        $.each(a.subscriptionsColor, function(a, b) {
            c.push(b)
        }),
        0 == a.subscribers.length && 0 == a.subscriptions.length && $("#" + a.divElement.id + "-subscribersMarker").hide(),
        a.subscriptionsColor = c,
        b = [],
        $.each(e.subscriptions, function(c, d) {
            a.divElement.id == d.topic ? d.unsubscribe() : b.push(d)
        }),
        e.subscriptions = b,
        0 == e.subscriptions.length && 0 == e.subscribers.length && $("#" + e.divElement.id + "-subscribersMarker").hide())
    }
    ,
    this.setupOptionsPanel = function() {
        if (e.options.manifest) {
            var a = {
                options: e.options,
                divElementId: e.divElement.id
            };
            Handlebars.registerHelper("if_eq", function(a, b, c) {
                if ("undefined" != c)
                    return a == b ? c.fn(this) : c.inverse(this)
            }),
            Handlebars.registerHelper("ifIn", function(a, b, c) {
                return b.indexOf(a) > -1 ? c.fn(this) : c.inverse(this)
            }),
            $("#" + e.divElement.id + "-modal-body").html(JST["views/conceptDetailsPlugin/options.hbs"](a))
        } else
            $("#" + e.divElement.id + "-modal-body").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
            f = $.getJSON(c.serverUrl.replace("snomed", "") + "server/releases", function(a) {}).done(function(a) {
                $.each(a, function(a, b) {
                    manifests.push(b),
                    b.databaseName == c.edition && (e.options.manifest = b)
                });
                var b = {
                    options: e.options,
                    divElementId: e.divElement.id
                };
                Handlebars.registerHelper("if_eq", function(a, b, c) {
                    if ("undefined" != c)
                        return a == b ? c.fn(this) : c.inverse(this)
                }),
                Handlebars.registerHelper("ifIn", function(a, b, c) {
                    return b.indexOf(a) > -1 ? c.fn(this) : c.inverse(this)
                }),
                $("#" + e.divElement.id + "-modal-body").html(JST["views/conceptDetailsPlugin/options.hbs"](b))
            })
    }
    ,
    this.readOptionsPanel = function() {
        e.options.displaySynonyms = $("#" + e.divElement.id + "-displaySynonymsOption").is(":checked"),
        e.options.showIds = $("#" + e.divElement.id + "-displayIdsOption").is(":checked"),
        e.options.displayChildren = $("#" + e.divElement.id + "-childrenOption").is(":checked"),
        e.options.hideNotAcceptable = $("#" + e.divElement.id + "-hideNotAcceptableOption").is(":checked"),
        e.options.displayInactiveDescriptions = $("#" + e.divElement.id + "-displayInactiveDescriptionsOption").is(":checked"),
        e.options.diagrammingMarkupEnabled = $("#" + e.divElement.id + "-diagrammingMarkupEnabledOption").is(":checked"),
        e.options.selectedView = $("#" + e.divElement.id + "-relsViewOption").val(),
        e.options.langRefset = [],
        $.each($("#" + e.divElement.id).find(".langOption"), function(a, b) {
            $(b).is(":checked") && e.options.langRefset.push($(b).val())
        }),
        e.options.displayChildren = $("#" + e.divElement.id + "-displayChildren").is(":checked"),
        $.each(componentsRegistry, function(a, b) {
            b.loadMarkers && b.loadMarkers()
        }),
        e.updateCanvas()
    }
}
function updateCD(a, b) {
    $.each(componentsRegistry, function(c, d) {
        d.divElement.id == a && (d.conceptId = b,
        d.updateCanvas(),
        channel.publish(d.divElement.id, {
            term: d.term,
            conceptId: d.conceptId,
            module: d.module,
            source: d.divElement.id
        }))
    }),
    $(".history-button").popover("hide")
}
function getRandomColor() {
    for (var a = "0123456789ABCDEF".split(""), b = "#", c = 0; c < 6; c++)
        b += a[Math.round(15 * Math.random())];
    return b
}
function drawConceptDiagram(a, b, c, d) {
    var e = []
      , f = [];
    "stated" == c.selectedView ? $.each(a.statedRelationships, function(a, b) {
        1 == b.active && (116680003 == b.type.conceptId ? e.push(b) : f.push(b))
    }) : a.relationships && $.each(a.relationships, function(a, b) {
        1 == b.active && (116680003 == b.type.conceptId ? e.push(b) : f.push(b))
    });
    var g = {
        divElementId: b.attr("id")
    };
    b.html(JST["views/conceptDetailsPlugin/tabs/details/diagram.hbs"](g));
    var h = $("#" + b.attr("id") + "-diagram-body");
    h.svg("destroy"),
    h.svg({
        settings: {
            width: "1000px",
            height: "2000px"
        }
    });
    var i = h.svg("get");
    loadDefs(i);
    var j = 10
      , k = 10
      , l = 10
      , m = "";
    m = "Primitive" == a.definitionStatus ? "sct-primitive-concept" : "sct-defined-concept";
    var n = drawSctBox(i, j, k, a.defaultTerm, a.conceptId, m);
    j += 90,
    k = k + n.getBBox().height + 40;
    var o;
    o = "Primitive" == a.definitionStatus ? drawSubsumedByNode(i, j, k) : drawEquivalentNode(i, j, k),
    connectElements(i, n, o, "bottom-50", "left"),
    j += 55;
    var p = drawConjunctionNode(i, j, k);
    connectElements(i, o, p, "right", "left", "LineMarker"),
    j += 40,
    k -= 18,
    l = l < j ? j : l,
    m = "sct-defined-concept",
    $.each(e, function(a, b) {
        m = "Primitive" == b.target.definitionStatus ? "sct-primitive-concept" : "sct-defined-concept";
        var c = drawSctBox(i, j, k, b.target.defaultTerm, b.target.conceptId, m);
        connectElements(i, p, c, "center", "left", "ClearTriangle"),
        k = k + c.getBBox().height + 25,
        l = l < j + c.getBBox().width + 50 ? j + c.getBBox().width + 50 : l
    });
    var q = 0;
    $.each(f, function(a, b) {
        if (m = "Primitive" == b.target.definitionStatus ? "sct-primitive-concept" : "sct-defined-concept",
        0 == b.groupId) {
            var c = drawSctBox(i, j, k, b.type.defaultTerm, b.type.conceptId, "sct-attribute");
            connectElements(i, p, c, "center", "left");
            var d = drawSctBox(i, j + c.getBBox().width + 50, k, b.target.defaultTerm, b.target.conceptId, m);
            connectElements(i, c, d, "right", "left"),
            k = k + d.getBBox().height + 25,
            l = l < j + c.getBBox().width + 50 + d.getBBox().width + 50 ? j + c.getBBox().width + 50 + d.getBBox().width + 50 : l
        } else
            b.groupId > q && (q = b.groupId)
    }),
    k += 15;
    for (var r = 1; r <= q; r++) {
        var s = drawAttributeGroupNode(i, j, k);
        connectElements(i, p, s, "center", "left");
        var t = drawConjunctionNode(i, j + 55, k);
        connectElements(i, s, t, "right", "left"),
        $.each(f, function(a, b) {
            if (b.groupId == r) {
                m = "Primitive" == b.target.definitionStatus ? "sct-primitive-concept" : "sct-defined-concept";
                var c = drawSctBox(i, j + 85, k - 18, b.type.defaultTerm, b.type.conceptId, "sct-attribute");
                connectElements(i, t, c, "center", "left");
                var d = drawSctBox(i, j + 85 + c.getBBox().width + 30, k - 18, b.target.defaultTerm, b.target.conceptId, m);
                connectElements(i, c, d, "right", "left"),
                k = k + d.getBBox().height + 25,
                l = l < j + 85 + c.getBBox().width + 30 + d.getBBox().width + 50 ? j + 85 + c.getBBox().width + 30 + d.getBBox().width + 50 : l
            }
        })
    }
    var u = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + h.html();
    u = u.substr(0, u.indexOf("svg") + 4) + ' xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://web.resource.org/cc/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" ' + u.substr(u.indexOf("svg") + 4),
    u = u.replace('width="1000px" height="2000px"', 'width="' + l + '" height="' + k + '"');
    Base64.encode(u);
    $("#" + b.attr("id") + "-download-button").disableTextSelect(),
    $("#" + b.attr("id") + "-progress-button").disableTextSelect(),
    $("#" + b.attr("id") + "-png-button").disableTextSelect(),
    $("#" + b.attr("id") + "-svg-button").disableTextSelect(),
    $("#" + b.attr("id") + "-download-button").removeClass("disabled"),
    $("#" + b.attr("id") + "-download-button").unbind().click(function(a) {
        $("#" + b.attr("id") + "-download-button").hide(),
        $("#" + b.attr("id") + "-progress-button").show(),
        $.post(c.serverUrl.replace("snomed", "") + "util/svg2png", {
            svgContent: u
        }).done(function(a) {
            $("#" + b.attr("id") + "-progress-button").hide(),
            $("#" + b.attr("id") + "-png-button").show(),
            $("#" + b.attr("id") + "-svg-button").show(),
            $("#" + b.attr("id") + "-png-button").unbind().click(function(b) {
                window.open(c.serverUrl.replace("snomed", "") + a)
            }),
            $("#" + b.attr("id") + "-svg-button").unbind().click(function(b) {
                window.open(c.serverUrl.replace("snomed", "") + a.replace(".png", ".svg"))
            })
        }).fail(function() {})
    }),
    "stated" == d.options.selectedView ? ($("#" + b.attr("id") + "-stated-button-d").unbind(),
    $("#" + b.attr("id") + "-inferred-button-d").unbind(),
    $("#" + b.attr("id") + "-stated-button-d").addClass("btn-primary"),
    $("#" + b.attr("id") + "-stated-button-d").removeClass("btn-default"),
    $("#" + b.attr("id") + "-inferred-button-d").addClass("btn-default"),
    $("#" + b.attr("id") + "-inferred-button-d").removeClass("btn-primary"),
    $("#" + b.attr("id") + "-inferred-button-d").click(function(a) {
        d.options.selectedView = "inferred",
        d.updateCanvas()
    })) : ($("#" + b.attr("id") + "-stated-button-d").unbind(),
    $("#" + b.attr("id") + "-inferred-button-d").unbind(),
    $("#" + b.attr("id") + "-inferred-button-d").addClass("btn-primary"),
    $("#" + b.attr("id") + "-inferred-button-d").removeClass("btn-default"),
    $("#" + b.attr("id") + "-stated-button-d").addClass("btn-default"),
    $("#" + b.attr("id") + "-stated-button-d").removeClass("btn-primary"),
    $("#" + b.attr("id") + "-stated-button-d").click(function(a) {
        d.options.selectedView = "stated",
        d.updateCanvas()
    }))
}
function saveAsPng(a) {
    var b = document.createElement("canvas");
    b.id = "canvas",
    document.body.appendChild(b),
    canvg(document.getElementById("canvas"), a),
    Canvas2Image.saveAsPNG(b),
    b.width = b.width
}
function searchPanel(a, b) {
    var c = null
      , d = this
      , e = ""
      , f = null;
    "undefined" == typeof componentsRegistry && (componentsRegistry = []),
    this.markerColor = "black",
    "undefined" == typeof globalMarkerColor && (globalMarkerColor = "black"),
    this.type = "search",
    this.divElement = a,
    this.options = jQuery.extend(!0, {}, b);
    var g = !1;
    d.shown0 = !1,
    $.each(componentsRegistry, function(a, b) {
        b.divElement.id == d.divElement.id && (g = !0)
    }),
    0 == g && componentsRegistry.push(d),
    d.subscribers = [],
    d.subscriptions = [],
    d.subscriptionsColor = [],
    this.history = [],
    this.setupCanvas = function() {
        var f = {
            divElementId: d.divElement.id
        };
        $(a).html(JST["views/searchPlugin/aux.hbs"](f)),
        $("#" + d.divElement.id + "-searchBox").keyup(function() {
            clearTimeout(c);
            var a = $(this);
            c = setTimeout(function() {
                d.search(a.val(), 0, 100, !1)
            }, 500)
        }),
        $("#" + d.divElement.id + "-subscribersMarker").disableTextSelect(),
        $("#" + d.divElement.id + "-configButton").disableTextSelect(),
        $("#" + d.divElement.id + "-historyButton").disableTextSelect(),
        $("#" + d.divElement.id + "-collapseButton").disableTextSelect(),
        $("#" + d.divElement.id + "-expandButton").disableTextSelect(),
        $("#" + d.divElement.id + "-closeButton").disableTextSelect(),
        $("#" + d.divElement.id + "-clearButton").disableTextSelect(),
        $("#" + d.divElement.id + "-expandButton").hide(),
        $("#" + d.divElement.id + "-subscribersMarker").hide(),
        $("#" + d.divElement.id).find(".semtag-button").click(function(a) {}),
        "fullText" != b.searchMode && $("#" + d.divElement.id + "-navLanguageLabel").closest("a").hide(),
        $("#" + d.divElement.id + "-configButton").click(function(a) {
            d.setupOptionsPanel()
        }),
        void 0 !== d.options.closeButton && 0 == d.options.closeButton && $("#" + d.divElement.id + "-closeButton").hide(),
        void 0 !== d.options.subscribersMarker && 0 == d.options.subscribersMarker && $("#" + d.divElement.id + "-subscribersMarker").remove(),
        void 0 !== d.options.collapseButton && 0 == d.options.collapseButton && ($("#" + d.divElement.id + "-expandButton").hide(),
        $("#" + d.divElement.id + "-collapseButton").hide()),
        $("#" + d.divElement.id + "-expandButton").click(function(a) {
            $("#" + d.divElement.id + "-panelBody").slideDown("fast"),
            $("#" + d.divElement.id + "-expandButton").hide(),
            $("#" + d.divElement.id + "-collapseButton").show()
        }),
        $("#" + d.divElement.id + "-collapseButton").click(function(a) {
            $("#" + d.divElement.id + "-panelBody").slideUp("fast"),
            $("#" + d.divElement.id + "-expandButton").show(),
            $("#" + d.divElement.id + "-collapseButton").hide()
        }),
        "undefined" == typeof i18n_panel_options && (i18n_panel_options = "Panel options"),
        $("#" + d.divElement.id + "-configButton").tooltip({
            placement: "left",
            trigger: "hover",
            title: i18n_panel_options,
            animation: !0,
            delay: 1e3
        }),
        "undefined" == typeof i18n_history && (i18n_history = "History"),
        $("#" + d.divElement.id + "-historyButton").tooltip({
            placement: "left",
            trigger: "hover",
            title: i18n_history,
            animation: !0,
            delay: 1e3
        }),
        "undefined" == typeof i18n_panel_links && (i18n_panel_links = "Panel links"),
        $("#" + d.divElement.id + "-apply-button").click(function() {
            d.readOptionsPanel()
        }),
        $("#" + d.divElement.id + "-clearButton").click(function() {
            d.options.semTagFilter = "none",
            d.options.langFilter = "none",
            d.options.moduleFilter = "none",
            d.options.refsetFilter = "none",
            $("#" + d.divElement.id + "-searchBox").val(""),
            $("#" + d.divElement.id + "-searchFilters").html(""),
            $("#" + d.divElement.id + "-resultsTable").html(""),
            $("#" + d.divElement.id + "-searchBar").html(""),
            $("#" + d.divElement.id + "-searchBar2").html(""),
            $("#" + d.divElement.id + "-typeIcon").removeClass("glyphicon-ok"),
            $("#" + d.divElement.id + "-typeIcon").removeClass("text-success"),
            $("#" + d.divElement.id + "-typeIcon").addClass("glyphicon-remove"),
            $("#" + d.divElement.id + "-typeIcon").addClass("text-danger"),
            e = ""
        }),
        $("#" + d.divElement.id + "-historyButton").click(function(a) {
            $("#" + d.divElement.id + "-historyButton").popover({
                trigger: "manual",
                placement: "bottomRight",
                html: !0,
                content: function() {
                    historyHtml = '<div style="height:100px;overflow:auto;">',
                    "undefined" == typeof i18n_no_search_terms && (i18n_no_search_terms = "No search terms"),
                    0 == d.history.length && (historyHtml = historyHtml + '<div class="text-center text-muted" style="width:100%"><em>' + i18n_no_search_terms + "</span>...</em></div>"),
                    historyHtml += "<table>";
                    var a = d.history.slice(0);
                    return a.reverse(),
                    $.each(a, function(a, b) {
                        var c = new Date
                          , e = c.getTime()
                          , f = e - b.time
                          , g = "";
                        f < 6e4 ? g = 1 == Math.round(f / 1e3) ? Math.round(f / 1e3) + " second ago" : Math.round(f / 1e3) + " seconds ago" : f < 36e5 ? g = 1 == Math.round(f / 1e3 / 60) ? Math.round(f / 1e3 / 60) + " minute ago" : Math.round(f / 1e3 / 60) + " minutes ago" : f < 216e6 && (g = 1 == Math.round(f / 1e3 / 60 / 60) ? Math.round(f / 1e3 / 60 / 60) + " hour ago" : Math.round(f / 1e3 / 60 / 60) + " hours ago"),
                        historyHtml = historyHtml + '<tr><td><a href="javascript:void(0);" onclick="searchInPanel(\'' + d.divElement.id + "','" + b.searchTerm + "');\">" + b.searchTerm + "</a>",
                        historyHtml = historyHtml + ' <span class="text-muted" style="font-size: 80%"><em>' + g + "<em></span>",
                        historyHtml += "</td></tr>"
                    }),
                    historyHtml += "</table>",
                    historyHtml += "</div>",
                    historyHtml
                }
            }),
            $("#" + d.divElement.id + "-historyButton").popover("toggle")
        }),
        $("#" + d.divElement.id + "-fullTextButton").click(function(a) {
            d.options.searchMode = "fullText",
            d.updateSearchLabel();
            var b = $("#" + d.divElement.id + "-searchBox").val();
            $("#" + d.divElement.id + "-navLanguageLabel").closest("a").show(),
            "^" == b.charAt(0) && $("#" + d.divElement.id + "-searchBox").val(b.slice(1)),
            b.length > 0 && d.search(b, 0, 100, !0)
        }),
        $("#" + d.divElement.id + "-partialMatchingButton").click(function(a) {
            d.options.searchMode = "partialMatching",
            d.updateSearchLabel();
            var b = $("#" + d.divElement.id + "-searchBox").val();
            $("#" + d.divElement.id + "-navLanguageLabel").closest("a").hide(),
            "^" == b.charAt(0) && $("#" + d.divElement.id + "-searchBox").val(b.slice(1)),
            b.length > 0 && d.search(b, 0, 100, !0)
        }),
        $("#" + d.divElement.id + "-regexButton").click(function(a) {
            d.options.searchMode = "regex",
            d.updateSearchLabel();
            var b = $("#" + d.divElement.id + "-searchBox").val();
            $("#" + d.divElement.id + "-navLanguageLabel").closest("a").hide(),
            "^" != b.charAt(0) && $("#" + d.divElement.id + "-searchBox").val("^" + b),
            b.length > 0 && d.search(b, 0, 100, !0)
        }),
        $("#" + d.divElement.id + "-danishLangButton").click(function(a) {
            d.options.searchLang = "danish",
            $("#" + d.divElement.id + "-navLanguageLabel").html(i18n_danish_stemmer);
            var b = $("#" + d.divElement.id + "-searchBox").val();
            b.length > 0 && d.search(b, 0, 100, !0)
        }),
        $("#" + d.divElement.id + "-englishLangButton").click(function(a) {
            d.options.searchLang = "english",
            $("#" + d.divElement.id + "-navLanguageLabel").html(i18n_english_stemmer);
            var b = $("#" + d.divElement.id + "-searchBox").val();
            b.length > 0 && d.search(b, 0, 100, !0)
        }),
        $("#" + d.divElement.id + "-spanishLangButton").click(function(a) {
            d.options.searchLang = "spanish",
            $("#" + d.divElement.id + "-navLanguageLabel").html(i18n_spanish_stemmer);
            var b = $("#" + d.divElement.id + "-searchBox").val();
            b.length > 0 && d.search(b, 0, 100, !0)
        }),
        $("#" + d.divElement.id + "-swedishLangButton").click(function(a) {
            d.options.searchLang = "swedish",
            $("#" + d.divElement.id + "-navLanguageLabel").html(i18n_swedish_stemmer);
            var b = $("#" + d.divElement.id + "-searchBox").val();
            b.length > 0 && d.search(b, 0, 100, !0)
        }),
        d.updateStatusFilterLabel(),
        $("#" + d.divElement.id + "-activeOnlyButton").click(function(a) {
            d.options.statusSearchFilter = "activeOnly",
            d.updateStatusFilterLabel()
        }),
        $("#" + d.divElement.id + "-activeInactiveButton").click(function(a) {
            d.options.statusSearchFilter = "activeAndInactive",
            d.updateStatusFilterLabel()
        }),
        $("#" + d.divElement.id + "-inactiveOnlyButton").click(function(a) {
            d.options.statusSearchFilter = "inactiveOnly",
            d.updateStatusFilterLabel()
        }),
        $("#" + d.divElement.id + "-partialMatchingButton").click(),
        $("#" + d.divElement.id + "-ownMarker").css("color", d.markerColor)
    }
    ,
    this.setupOptionsPanel = function() {
        var a = [];
        $.each(componentsRegistry, function(b, c) {
            if (c.divElement.id != d.divElement.id) {
                var e = {};
                e.subscriptions = c.subscriptions,
                e.id = c.divElement.id,
                a.push(e)
            }
        });
        var b = !1;
        $.each(a, function(a, c) {
            b = !1,
            $.each(d.subscriptions, function(a, d) {
                c.id == d.topic && (b = !0)
            }),
            c.subscribed = b,
            b = !1,
            $.each(c.subscriptions, function(a, c) {
                c.topic == d.divElement.id && (b = !0)
            }),
            c.subscriptor = b
        }),
        d.options.possibleSubscribers = a;
        var c = {
            options: d.options,
            divElementId: d.divElement.id
        };
        $("#" + d.divElement.id + "-modal-body").html(JST["views/taxonomyPlugin/options.hbs"](c))
    }
    ,
    this.readOptionsPanel = function() {
        $.each(d.options.possibleSubscribers, function(a, b) {
            b.subscribed = $("#" + d.divElement.id + "-subscribeTo-" + b.id).is(":checked"),
            b.subscriptor = $("#" + d.divElement.id + "-subscriptor-" + b.id).is(":checked");
            var c = {};
            $.each(componentsRegistry, function(a, d) {
                d.divElement.id == b.id && (c = d)
            }),
            b.subscribed ? d.subscribe(c) : d.unsubscribe(c),
            b.subscriptor ? c.subscribe(d) : c.unsubscribe(d)
        }),
        $.each(componentsRegistry, function(a, b) {
            b.loadMarkers && b.loadMarkers()
        })
    }
    ,
    this.updateStatusFilterLabel = function() {
        "undefined" == typeof i18n_active_and_inactive && (i18n_active_and_inactive = "Active and Inactive"),
        "undefined" == typeof i18n_inactive_only && (i18n_inactive_only = "Inactive Only"),
        "undefined" == typeof i18n_active_only && (i18n_active_only = "Active Only"),
        "activeAndInactive" == d.options.statusSearchFilter ? ($("#" + d.divElement.id + "-searchStatus").html(i18n_active_and_inactive),
        $("#" + d.divElement.id + "-navStatusFilterLabel").html(i18n_active_and_inactive)) : "inactiveOnly" == d.options.statusSearchFilter ? ($("#" + d.divElement.id + "-searchStatus").html(i18n_inactive_only),
        $("#" + d.divElement.id + "-navStatusFilterLabel").html(i18n_inactive_only)) : (d.options.statusSearchFilter = "activeOnly",
        $("#" + d.divElement.id + "-searchStatus").html(i18n_active_only),
        $("#" + d.divElement.id + "-navStatusFilterLabel").html(i18n_active_only));
        var a = $("#" + d.divElement.id + "-searchBox").val();
        a.length > 0 && d.search(a, 0, 100, !0)
    }
    ,
    this.search = function(a, c, g, h) {
        if (void 0 === d.options.searchMode && (d.options.searchMode = "partialMatching"),
        void 0 === d.options.semTagFilter && (d.options.semTagFilter = "none"),
        void 0 === d.options.langFilter && (d.options.langFilter = "none"),
        void 0 === d.options.moduleFilter && (d.options.moduleFilter = "none"),
        void 0 === d.options.textIndexNormalized && (d.options.textIndexNormalized = "none"),
        void 0 === d.options.refsetFilter && (d.options.refsetFilter = "none"),
        void 0 === h && (h = !1),
        "" != a && (a != e || h))
            if (a.length < 3)
                $("#" + d.divElement.id + "-typeIcon").removeClass("glyphicon-ok"),
                $("#" + d.divElement.id + "-typeIcon").removeClass("text-success"),
                $("#" + d.divElement.id + "-typeIcon").addClass("glyphicon-remove"),
                $("#" + d.divElement.id + "-typeIcon").addClass("text-danger");
            else {
                $("#" + d.divElement.id + "-typeIcon").removeClass("glyphicon-remove"),
                $("#" + d.divElement.id + "-typeIcon").removeClass("text-danger"),
                $("#" + d.divElement.id + "-typeIcon").addClass("glyphicon-ok"),
                $("#" + d.divElement.id + "-typeIcon").addClass("text-success"),
                e = a;
                var i = new Date
                  , j = i.getTime();
                d.history.push({
                    searchTerm: a,
                    time: j
                }),
                $("#" + d.divElement.id + "-searchFilters").html(""),
                0 == c ? $("#" + d.divElement.id + "-resultsTable").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>") : $("#" + d.divElement.id + "-resultsTable").find(".more-row").html("<td colspan='2' class='text-center'><i class='glyphicon glyphicon-refresh icon-spin'></i>&nbsp;&nbsp;</td>");
                var k = "";
                if (null != f && f.abort(),
                $("#" + d.divElement.id + "-searchBar").html("<span class='text-muted'>Searching..</span>"),
                a = a.trim(),
                isNumber(a))
                    "0" == a.substr(-2, 1) ? f = $.getJSON(b.serverUrl + "/" + b.edition + "/" + b.release + "/concepts/" + a, function(a) {}).done(function(a) {
                        Handlebars.registerHelper("if_eq", function(a, b, c) {
                            if ("undefined" != c)
                                return a == b ? c.fn(this) : c.inverse(this)
                        }),
                        Handlebars.registerHelper("hasCountryIcon", function(a, b) {
                            return countryIcons[a] ? b.fn(this) : b.inverse(this)
                        });
                        var b = [];
                        $.each(a.descriptions, function(c, e) {
                            var f = e;
                            f.definitionStatus = a.definitionStatus,
                            f.conceptActive = a.active,
                            f.active && f.conceptActive || (f.danger = !0),
                            e.active ? ("activeOnly" == d.options.statusSearchFilter && b.push(f),
                            "activeAndInactive" == d.options.statusSearchFilter && b.push(f)) : (f.danger = !0,
                            "inactiveOnly" == d.options.statusSearchFilter && b.push(f),
                            "activeAndInactive" == d.options.statusSearchFilter && b.push(f))
                        }),
                        a.descriptions = b;
                        var c = {
                            result: a
                        };
                        $("#" + d.divElement.id + "-resultsTable").html(JST["views/searchPlugin/body/0.hbs"](c)),
                        $("#" + d.divElement.id + "-searchBar").html("<span class='text-muted'></span>"),
                        $("#" + d.divElement.id + "-resultsTable").find(".result-item").click(function(a) {
                            channel.publish(d.divElement.id, {
                                term: $(a.target).attr("data-term"),
                                module: $(a.target).attr("data-module"),
                                conceptId: $(a.target).attr("data-concept-id"),
                                source: d.divElement.id
                            })
                        })
                    }).fail(function() {
                        k += "<tr><td class='text-muted'>No results</td></tr>",
                        $("#" + d.divElement.id + "-resultsTable").html(k),
                        $("#" + d.divElement.id + "-searchBar2").html("")
                    }) : "1" == a.substr(-2, 1) ? f = $.getJSON(b.serverUrl + "/" + b.edition + "/" + b.release + "/descriptions/" + a, function(a) {}).done(function(a) {
                        Handlebars.registerHelper("if_eq", function(a, b, c) {
                            if ("undefined" != c)
                                return a == b ? c.fn(this) : c.inverse(this)
                        }),
                        Handlebars.registerHelper("hasCountryIcon", function(a, b) {
                            return countryIcons[a] ? b.fn(this) : b.inverse(this)
                        });
                        var b = {
                            result: a
                        };
                        $("#" + d.divElement.id + "-resultsTable").html(JST["views/searchPlugin/body/1.hbs"](b)),
                        $("#" + d.divElement.id + "-searchBar").html("<span class='text-muted'></span>"),
                        $("#" + d.divElement.id + "-resultsTable").find(".result-item").click(function(a) {
                            channel.publish(d.divElement.id, {
                                term: $(a.target).attr("data-term"),
                                module: $(a.target).attr("data-module"),
                                conceptId: $(a.target).attr("data-concept-id"),
                                source: d.divElement.id
                            })
                        })
                    }).fail(function() {
                        k += "<tr><td class='text-muted'>No results</td></tr>",
                        $("#" + d.divElement.id + "-resultsTable").html(k),
                        $("#" + d.divElement.id + "-searchBar2").html("")
                    }) : (k += "<tr><td class='text-muted'>No results</td></tr>",
                    $("#" + d.divElement.id + "-resultsTable").html(k),
                    $("#" + d.divElement.id + "-searchBar").html("<span class='text-muted'></span>"),
                    $("#" + d.divElement.id + "-searchBar2").html(""));
                else {
                    "partialMatching" == d.options.searchMode && (a = a.toLowerCase(),
                    a = a.replace("(", ""),
                    a = a.replace(")", ""));
                    var l = Date.now()
                      , m = b.serverUrl + "/" + b.edition + "/" + b.release + "/descriptions?query=" + encodeURIComponent(a) + "&limit=50&searchMode=" + d.options.searchMode + "&lang=" + d.options.searchLang + "&statusFilter=" + d.options.statusSearchFilter + "&skipTo=" + c + "&returnLimit=" + g;
                    "none" != d.options.semTagFilter && (m = m + "&semanticFilter=" + d.options.semTagFilter),
                    "none" != d.options.langFilter && (m = m + "&langFilter=" + d.options.langFilter),
                    "none" != d.options.moduleFilter && (m = m + "&moduleFilter=" + d.options.moduleFilter),
                    "none" != d.options.refsetFilter && (m = m + "&refsetFilter=" + d.options.refsetFilter),
                    "none" != d.options.textIndexNormalized && (m = m + "&normalize=" + d.options.textIndexNormalized),
                    $("#" + d.divElement.id + "-groupConcept").is(":checked") && (m += "&groupByConcept=1"),
                    f = $.getJSON(m, function(a) {}).done(function(b) {
                        function e(a) {
                            var b = []
                              , c = {};
                            for (var d in a)
                                b.push([d, a[d]]);
                            return b.sort(function(a, b) {
                                return b[1] - a[1]
                            }),
                            $.each(b, function(a, b) {
                                c[b[0]] = b[1]
                            }),
                            c
                        }
                        $("#" + d.divElement.id + "-resultsTable").find(".more-row").remove();
                        var h = Date.now()
                          , i = (h - l) / 1e3;
                        Handlebars.registerHelper("if_eq", function(a, b, c) {
                            if ("undefined" != c)
                                return a == b ? c.fn(this) : c.inverse(this)
                        }),
                        Handlebars.registerHelper("hasCountryIcon", function(a, b) {
                            return countryIcons[a] ? b.fn(this) : b.inverse(this)
                        }),
                        Handlebars.registerHelper("first20chars", function(a) {
                            return a.substr(0, 18) + "..."
                        });
                        var j = [];
                        b.filters && d.options.manifest && (b.filters.refsetId ? ($.each(b.filters.refsetId, function(a, b) {
                            var c = !1
                              , e = {};
                            $.each(d.options.manifest.refsets, function(d, f) {
                                a == f.conceptId && (e.term = f.defaultTerm,
                                e.value = a,
                                e.cant = b,
                                c = !0)
                            }),
                            c || (e.term = null,
                            e.value = a,
                            e.cant = b),
                            j.push(e)
                        }),
                        b.filters.refsetId = [],
                        b.filters.refsetId = j,
                        b.filters.refsetId.sort(function(a, b) {
                            return a.cant > b.cant ? -1 : a.cant < b.cant ? 1 : 0
                        })) : b.filters.refsetId = [],
                        j = [],
                        $.each(b.filters.module, function(a, b) {
                            var c = !1
                              , e = {};
                            $.each(d.options.manifest.modules, function(d, f) {
                                a == f.conceptId && (e.term = f.defaultTerm,
                                e.value = a,
                                e.cant = b,
                                c = !0)
                            }),
                            c || (e.term = null,
                            e.value = a,
                            e.cant = b),
                            j.push(e)
                        }),
                        b.filters.module = [],
                        b.filters.module = j,
                        b.filters.module.sort(function(a, b) {
                            return a.cant > b.cant ? -1 : a.cant < b.cant ? 1 : 0
                        }),
                        b.filters.lang && b.filters.semTag && (b.filters.lang = e(b.filters.lang),
                        b.filters.semTag = e(b.filters.semTag)));
                        var k = {
                            result: b,
                            elapsed: i,
                            divElementId: d.divElement.id,
                            options: d.options
                        };
                        if ($("#" + d.divElement.id + "-searchBar").html(JST["views/searchPlugin/body/bar.hbs"](k)),
                        $("#" + d.divElement.id + "-searchBar2").html(JST["views/searchPlugin/body/bar2.hbs"](k)),
                        $("#" + d.divElement.id + "-moduleResumed").tooltip({
                            placement: "left auto",
                            trigger: "hover",
                            title: $("#" + d.divElement.id + "-moduleResumed").attr("data-name"),
                            animation: !0,
                            delay: 500
                        }),
                        $("#" + d.divElement.id + "-refsetResumed").tooltip({
                            placement: "left auto",
                            trigger: "hover",
                            title: $("#" + d.divElement.id + "-refsetResumed").attr("data-name"),
                            animation: !0,
                            delay: 500
                        }),
                        $("#" + d.divElement.id + "-searchBar2").find(".semtag-link").click(function(b) {
                            d.options.semTagFilter = $(b.target).attr("data-semtag"),
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar2").find(".module-link").click(function(b) {
                            d.options.moduleFilter = $(b.target).attr("data-module"),
                            d.options.moduleFilterName = $(b.target).attr("data-term"),
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar2").find(".lang-link").click(function(b) {
                            d.options.langFilter = $(b.target).attr("data-lang"),
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar2").find(".refset-link").click(function(b) {
                            d.options.refsetFilter = $(b.target).attr("data-refset"),
                            d.options.refsetFilterName = $(b.target).attr("data-term"),
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar2").find(".remove-semtag").click(function(b) {
                            d.options.semTagFilter = "none",
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar2").find(".remove-lang").click(function(b) {
                            d.options.langFilter = "none",
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar2").find(".remove-module").click(function(b) {
                            d.options.moduleFilter = "none",
                            d.options.moduleFilterName = null,
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar2").find(".remove-refset").click(function(b) {
                            d.options.refsetFilter = "none",
                            d.options.refsetFilterName = null,
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar").find(".semtag-link").click(function(b) {
                            d.options.semTagFilter = $(b.target).attr("data-semtag"),
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar").find(".module-link").click(function(b) {
                            d.options.moduleFilter = $(b.target).attr("data-module"),
                            d.options.moduleFilterName = $(b.target).attr("data-term"),
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar").find(".lang-link").click(function(b) {
                            d.options.langFilter = $(b.target).attr("data-lang"),
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar").find(".remove-semtag").click(function(b) {
                            d.options.semTagFilter = "none",
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar").find(".remove-lang").click(function(b) {
                            d.options.langFilter = "none",
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-searchBar").find(".remove-module").click(function(b) {
                            d.options.moduleFilter = "none",
                            d.options.moduleFilterName = null,
                            d.search(a, 0, g, !0)
                        }),
                        b.details) {
                            b.details.total
                        }
                        f = null;
                        var m = (b.matches,
                        b.details.total - (c + g));
                        "regex" == d.options.searchMode && b.matches.sort(function(a, b) {
                            return a.term.length < b.term.length ? -1 : a.term.length > b.term.length ? 1 : 0
                        }),
                        Handlebars.registerHelper("if_eq", function(a, b, c) {
                            if ("undefined" != c)
                                return a == b ? c.fn(this) : c.inverse(this)
                        }),
                        Handlebars.registerHelper("if_gr", function(a, b, c) {
                            if (a)
                                return a > parseInt(b) ? c.fn(this) : c.inverse(this)
                        }),
                        Handlebars.registerHelper("if_gre", function(a, b, c) {
                            if (a)
                                return parseInt(a) >= b ? c.fn(this) : c.inverse(this)
                        }),
                        Handlebars.registerHelper("hasCountryIcon", function(a, b) {
                            return countryIcons[a] ? b.fn(this) : b.inverse(this)
                        }),
                        Handlebars.registerHelper("hasFilters", function(a, b) {
                            return "none" != a.semTagFilter || "none" != a.langFilter || "none" != a.moduleFilter || "none" != a.refsetFilter ? b.fn(this) : b.inverse(this)
                        });
                        var k = {
                            options: d.options,
                            result: b,
                            divElementId: d.divElement.id,
                            remaining: m,
                            returnLimit: g
                        };
                        0 == c ? $("#" + d.divElement.id + "-resultsTable").html(JST["views/searchPlugin/body/default.hbs"](k)) : $("#" + d.divElement.id + "-resultsTable").append(JST["views/searchPlugin/body/default.hbs"](k)),
                        $("#" + d.divElement.id + "-groupConcept").click(function() {
                            d.search(a, parseInt(c), g, !0)
                        }),
                        $("#" + d.divElement.id + "-remove-all-filters").unbind(),
                        $("#" + d.divElement.id + "-remove-all-filters").click(function(b) {
                            d.options.semTagFilter = "none",
                            d.options.langFilter = "none",
                            d.options.moduleFilter = "none",
                            d.options.refsetFilter = "none",
                            d.search(a, 0, g, !0)
                        }),
                        $("#" + d.divElement.id + "-more").unbind(),
                        $("#" + d.divElement.id + "-more").click(function(b) {
                            d.search(a, parseInt(c) + parseInt(g), g, !0)
                        }),
                        $("#" + d.divElement.id + "-resultsTable").find(".result-item").click(function(a) {
                            channel.publish(d.divElement.id, {
                                term: $(a.target).attr("data-term"),
                                module: $(a.target).attr("data-module"),
                                conceptId: $(a.target).attr("data-concept-id"),
                                source: d.divElement.id
                            })
                        }),
                        $("[draggable='true']").tooltip({
                            placement: "left auto",
                            trigger: "hover",
                            title: i18n_drag_this,
                            animation: !0,
                            delay: 500
                        }),
                        $("[draggable='true']").mouseover(function(a) {
                            var b = $(a.target).attr("data-term");
                            void 0 === b && (b = $($(a.target).parent()).attr("data-term")),
                            icon = iconToDrag(b)
                        })
                    }).fail(function() {
                        k += "<tr><td class='text-muted'>No results</td></tr>",
                        $("#" + d.divElement.id + "-resultsTable").html(k),
                        $("#" + d.divElement.id + "-searchBar2").html("")
                    })
                }
            }
    }
    ,
    this.getNextMarkerColor = function(a) {
        var b = "black";
        return "black" == a ? b = "green" : "green" == a ? b = "purple" : "purple" == a ? b = "red" : "red" == a ? b = "blue" : "blue" == a && (b = "green"),
        globalMarkerColor = b,
        b
    }
    ,
    d.markerColor = d.getNextMarkerColor(globalMarkerColor),
    this.subscribe = function(a) {
        var b = a.divElement.id
          , c = !1;
        if ($.each(d.subscriptionsColor, function(b, d) {
            d == a.markerColor && (c = !0)
        }),
        !c) {
            var e = channel.subscribe(b, function(a, b) {
                d.options.searchMode = "fullText",
                d.search(a.conceptId, 0, 100, !1),
                $("#" + d.divElement.id + "-searchBox").val(a.term)
            });
            d.subscriptions.push(e),
            a.subscribers.push(d.divElement.id),
            d.subscriptionsColor.push(a.markerColor)
        }
        $("#" + b + "-ownMarker").show(),
        $("#" + d.divElement.id + "-subscribersMarker").show(),
        $("#" + b + "-subscribersMarker").show()
    }
    ,
    this.unsubscribe = function(a) {
        var b = []
          , c = []
          , e = !0;
        $.each(d.subscriptionsColor, function(b, d) {
            d != a.markerColor ? c.push(d) : e = !1
        }),
        e || (d.subscriptionsColor = c,
        c = [],
        $.each(a.subscribers, function(a, c) {
            c != d.divElement.id && b.push(c)
        }),
        a.subscribers = b,
        $.each(a.subscriptionsColor, function(a, b) {
            c.push(b)
        }),
        0 == a.subscribers.length && 0 == a.subscriptions.length && $("#" + a.divElement.id + "-subscribersMarker").hide(),
        a.subscriptionsColor = c,
        b = [],
        $.each(d.subscriptions, function(c, d) {
            a.divElement.id == d.topic ? d.unsubscribe() : b.push(d)
        }),
        d.subscriptions = b,
        0 == d.subscriptions.length && 0 == d.subscribers.length && $("#" + d.divElement.id + "-subscribersMarker").hide())
    }
    ,
    this.loadMarkers = function() {
        var a = ""
          , b = 0
          , c = 0
          , e = !1
          , f = !1;
        $.each(componentsRegistry, function(a, b) {
            var c = b.divElement.id;
            $("#" + c + "-subscribersMarker").is(":visible") && (f = !0)
        }),
        0 == d.subscribers.length ? (b = 14,
        $("#" + d.divElement.id + "-ownMarker").hide()) : (f || $("#" + d.divElement.id + "-ownMarker").hide(),
        e = !0),
        $("#" + d.divElement.id + "-subscribersMarker").is(":visible") && ($("#" + d.divElement.id + "-panelTitle").html($("#" + d.divElement.id + "-panelTitle").html().replace(/&nbsp;/g, "")),
        e && $("#" + d.divElement.id + "-panelTitle").html("&nbsp&nbsp&nbsp&nbsp" + $("#" + d.divElement.id + "-panelTitle").html()),
        $.each(d.subscriptionsColor, function(e, f) {
            a = a + "<i class='glyphicon glyphicon-bookmark' style='color: " + f + "; top:" + c + "px; right: " + b + "px;'></i>",
            $("#" + d.divElement.id + "-panelTitle").html("&nbsp&nbsp" + $("#" + d.divElement.id + "-panelTitle").html()),
            c += 5,
            b += 10
        }),
        $("#" + d.divElement.id + "-subscribersMarker").html(a))
    }
    ,
    this.updateSearchLabel = function() {
        void 0 === d.options.searchMode && (d.options.searchMode = "partialMatching"),
        "undefined" == typeof i18n_search_examp_1 && (i18n_search_examp_1 = "Example 1"),
        "undefined" == typeof i18n_search_examp_2 && (i18n_search_examp_2 = "Example 2"),
        "undefined" == typeof i18n_search_examp_3 && (i18n_search_examp_3 = "Example 3"),
        "undefined" == typeof i18n_regex_search_mode && (i18n_regex_search_mode = "Regex"),
        "undefined" == typeof i18n_partial_match_search_mode && (i18n_partial_match_search_mode = "Partial"),
        "undefined" == typeof i18n_full_text_search_mode && (i18n_full_text_search_mode = "Full"),
        "regex" == d.options.searchMode ? ($("#" + d.divElement.id + "-searchMode").html("<span class='i18n' data-i18n-id='i18n_regex_search_mode'>" + i18n_regex_search_mode + "</span>"),
        $("#" + d.divElement.id + "-searchExample").html("<span class='i18n text-muted' data-i18n-id='i18n_search_examp_1'>" + i18n_search_examp_1 + "</span> "),
        $("#" + d.divElement.id + "-navSearchModeLabel").html("<span class='i18n' data-i18n-id='i18n_regex_search_mode'>" + i18n_regex_search_mode + "</span>")) : "fullText" == d.options.searchMode ? ($("#" + d.divElement.id + "-searchMode").html("<span class='i18n' data-i18n-id='i18n_full_text_search_mode'>" + i18n_full_text_search_mode + "</span>"),
        $("#" + d.divElement.id + "-searchExample").html("<span class='i18n text-muted' data-i18n-id='i18n_search_examp_2'>" + i18n_search_examp_2 + "</em></span> "),
        $("#" + d.divElement.id + "-navSearchModeLabel").html("<span class='i18n' data-i18n-id='i18n_full_text_search_mode'>" + i18n_full_text_search_mode + "</span>")) : "partialMatching" == d.options.searchMode && ($("#" + d.divElement.id + "-searchMode").html("<span class='i18n' data-i18n-id='i18n_partial_match_search_mode'>" + i18n_partial_match_search_mode + "</span>"),
        $("#" + d.divElement.id + "-searchExample").html("<span class='i18n text-muted' data-i18n-id='i18n_search_examp_3'>" + i18n_search_examp_3 + "</span> "),
        $("#" + d.divElement.id + "-navSearchModeLabel").html("<span class='i18n' data-i18n-id='i18n_partial_match_search_mode'>" + i18n_partial_match_search_mode + "</span>")),
        void 0 === d.options.searchLang && (d.options.searchLang = "english"),
        "undefined" == typeof i18n_danish_stemmer && (i18n_danish_stemmer = "Danish Stemmer"),
        "undefined" == typeof i18n_english_stemmer && (i18n_english_stemmer = "English Stemmer"),
        "undefined" == typeof i18n_spanish_stemmer && (i18n_spanish_stemmer = "Spanish Stemmer"),
        "danish" == d.options.searchLang ? $("#" + d.divElement.id + "-navLanguageLabel").html("<span class='i18n' data-i18n-id='i18n_danish_stemmer'>" + i18n_danish_stemmer + "</span>") : "english" == d.options.searchLang ? $("#" + d.divElement.id + "-navLanguageLabel").html("<span class='i18n' data-i18n-id='i18n_english_stemmer'>" + i18n_english_stemmer + "</span>") : "spanish" == d.options.searchLang && $("#" + d.divElement.id + "-navLanguageLabel").html("<span class='i18n' data-i18n-id='i18n_spanish_stemmer'>" + i18n_spanish_stemmer + "</span>")
    }
    ,
    this.setupCanvas(),
    this.updateSearchLabel()
}
function isNumber(a) {
    return !isNaN(parseFloat(a)) && isFinite(a)
}
function clearSearchPanelSubscriptions(a) {
    var b;
    $.each(componentsRegistry, function(c, d) {
        d.divElement.id == a && (b = d)
    }),
    b.unsubscribeAll(),
    $("#" + a).find(".linker-button").popover("toggle")
}
function searchInPanel(a, b) {
    $.each(componentsRegistry, function(c, d) {
        d.divElement.id == a && ($("#" + a + "-searchBox").val(b),
        d.search(b, 0, 100, !1))
    }),
    $(".history-button").popover("hide")
}
function drawSctBox(a, b, c, d, e, f) {
    var g = "Test";
    d && e ? g = d.length > e.toString().length ? d : e.toString() : d ? g = d : e && (g = e.toString());
    var h = '"Helvetica Neue",Helvetica,Arial,sans-serif'
      , i = a.text(b, c, g, {
        fontFamily: h,
        fontSize: "12",
        fill: "black"
    })
      , j = i.getBBox().height
      , k = i.getBBox().width;
    k = Math.round(1.2 * k),
    a.remove(i);
    var l = null
      , m = 20
      , n = 25;
    if (e && d || (n = 15),
    "sct-primitive-concept" == f)
        l = a.rect(b, c, k + m, j + n, {
            id: "rect" + idSequence,
            fill: "#99ccff",
            stroke: "#333",
            strokeWidth: 2
        });
    else if ("sct-defined-concept" == f) {
        l = a.rect(b - 2, c - 2, k + m + 4, j + n + 4, {
            fill: "white",
            stroke: "#333",
            strokeWidth: 1
        });
        a.rect(b, c, k + m, j + n, {
            id: "rect" + idSequence,
            fill: "#ccccff",
            stroke: "#333",
            strokeWidth: 1
        })
    } else if ("sct-attribute" == f) {
        l = a.rect(b - 2, c - 2, k + m + 4, j + n + 4, 18, 18, {
            fill: "white",
            stroke: "#333",
            strokeWidth: 1
        });
        a.rect(b, c, k + m, j + n, 18, 18, {
            id: "rect" + idSequence,
            fill: "#ffffcc",
            stroke: "#333",
            strokeWidth: 1
        })
    } else
        l = "sct-slot" == f ? a.rect(b, c, k + m, j + n, {
            id: "rect" + idSequence,
            fill: "#99ccff",
            stroke: "#333",
            strokeWidth: 2
        }) : a.rect(b, c, k + m, j + n, {
            id: "rect" + idSequence,
            fill: "white",
            stroke: "black",
            strokeWidth: 1
        });
    return e && d ? (a.text(b + 10, c + 16, e.toString(), {
        fontFamily: h,
        fontSize: "10",
        fill: "black"
    }),
    a.text(b + 10, c + 31, d, {
        fontFamily: h,
        fontSize: "12",
        fill: "black"
    })) : d ? a.text(b + 10, c + 18, d, {
        fontFamily: h,
        fontSize: "12",
        fill: "black"
    }) : e && a.text(b + 10, c + 18, e.toString(), {
        fontFamily: h,
        fontSize: "12",
        fill: "black"
    }),
    idSequence++,
    $("rect").click(function(a) {}),
    l
}
function connectElements(a, b, c, d, e, f) {
    var g = b.getBBox().x
      , h = b.getBBox().y
      , i = b.getBBox().width
      , j = b.getBBox().height
      , k = c.getBBox().x
      , l = c.getBBox().y
      , m = c.getBBox().width
      , n = c.getBBox().height
      , o = 15;
    switch (d) {
    case "top":
        originY = h,
        originX = g + i / 2;
        break;
    case "bottom":
        originY = h + j,
        originX = g + i / 2;
        break;
    case "left":
        originX = g - 15,
        originY = h + j / 2;
        break;
    case "right":
        originX = g + i,
        originY = h + j / 2;
        break;
    case "bottom-50":
        originY = h + j,
        originX = g + 40;
        break;
    default:
        originX = g + i / 2,
        originY = h + j / 2
    }
    switch (e) {
    case "top":
        destinationY = l,
        destinationX = k + m / 2;
        break;
    case "bottom":
        destinationY = l + n,
        destinationX = k + m / 2;
        break;
    case "left":
        destinationX = k - o,
        destinationY = l + n / 2;
        break;
    case "right":
        destinationX = k + m,
        destinationY = l + n / 2;
        break;
    case "bottom-50":
        destinationY = l + n,
        destinationX = k + 50;
        break;
    default:
        destinationX = k + m / 2,
        destinationY = l + n / 2
    }
    null == f && (f = "BlackTriangle"),
    polyline1 = a.polyline([[originX, originY], [originX, destinationY], [destinationX, destinationY]], {
        id: "poly1",
        fill: "none",
        stroke: "black",
        strokeWidth: 2,
        "marker-end": "url(#" + f + ")"
    })
}
function loadDefs(a) {
    var b = a.defs("SctDiagramsDefs");
    blackTriangle = a.marker(b, "BlackTriangle", 0, 0, 20, 20, {
        viewBox: "0 0 22 20",
        refX: "0",
        refY: "10",
        markerUnits: "strokeWidth",
        markerWidth: "8",
        markerHeight: "6",
        fill: "black",
        stroke: "black",
        strokeWidth: 2
    }),
    a.path(blackTriangle, "M 0 0 L 20 10 L 0 20 z"),
    clearTriangle = a.marker(b, "ClearTriangle", 0, 0, 20, 20, {
        viewBox: "0 0 22 20",
        refX: "0",
        refY: "10",
        markerUnits: "strokeWidth",
        markerWidth: "8",
        markerHeight: "8",
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    }),
    a.path(clearTriangle, "M 0 0 L 20 10 L 0 20 z"),
    lineMarker = a.marker(b, "LineMarker", 0, 0, 20, 20, {
        viewBox: "0 0 22 20",
        refX: "0",
        refY: "10",
        markerUnits: "strokeWidth",
        markerWidth: "8",
        markerHeight: "8",
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    }),
    a.path(lineMarker, "M 0 10 L 20 10")
}
function drawAttributeGroupNode(a, b, c) {
    return circle = a.circle(b, c, 20, {
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    }),
    circle
}
function drawConjunctionNode(a, b, c) {
    return circle = a.circle(b, c, 10, {
        fill: "black",
        stroke: "black",
        strokeWidth: 2
    }),
    circle
}
function drawEquivalentNode(a, b, c) {
    return g = a.group(),
    a.circle(g, b, c, 20, {
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 7, c - 5, b + 7, c - 5, {
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 7, c, b + 7, c, {
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 7, c + 5, b + 7, c + 5, {
        stroke: "black",
        strokeWidth: 2
    }),
    g
}
function drawSubsumedByNode(a, b, c) {
    return g = a.group(),
    a.circle(g, b, c, 20, {
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 7, c - 8, b + 7, c - 8, {
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 7, c + 3, b + 7, c + 3, {
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 6, c - 8, b - 6, c + 3, {
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 7, c + 7, b + 7, c + 7, {
        stroke: "black",
        strokeWidth: 2
    }),
    g
}
function drawSubsumesNode(a, b, c) {
    return g = a.group(),
    a.circle(g, b, c, 20, {
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 7, c - 8, b + 7, c - 8, {
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 7, c + 3, b + 7, c + 3, {
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b + 6, c - 8, b + 6, c + 3, {
        stroke: "black",
        strokeWidth: 2
    }),
    a.line(g, b - 7, c + 7, b + 7, c + 7, {
        stroke: "black",
        strokeWidth: 2
    }),
    g
}
function taxonomyPanel(a, b, c) {
    var d = this
      , e = null;
    "undefined" == typeof componentsRegistry && (componentsRegistry = []),
    this.markerColor = "black",
    "undefined" == typeof globalMarkerColor && (globalMarkerColor = "black"),
    this.type = "taxonomy",
    this.divElement = a,
    this.options = jQuery.extend(!0, {}, c);
    var f = !1;
    $.each(componentsRegistry, function(a, b) {
        b.divElement.id == d.divElement.id && (f = !0)
    }),
    0 == f && componentsRegistry.push(d),
    d.default = {},
    d.default.conceptId = b,
    d.subscribers = [],
    d.subscriptions = [],
    d.subscriptionsColor = [],
    this.history = [],
    c.rootConceptDescendants || $.ajax({
        type: "POST",
        url: c.serverUrl.replace("snomed", "expressions/") + c.edition + "/" + c.release + "/execute/brief",
        data: {
            expression: "< 138875005|SNOMED CT Concept|",
            limit: 1,
            skip: 0,
            form: d.options.selectedView
        },
        dataType: "json",
        success: function(a) {
            a.computeResponse && (c.rootConceptDescendants = a.computeResponse.total)
        }
    }).done(function(a) {}),
    this.setupCanvas = function() {
        var b = {
            divElementId: d.divElement.id
        };
        $(a).html(JST["views/taxonomyPlugin/main.hbs"](b)),
        $("#" + d.divElement.id + "-resetButton").disableTextSelect(),
        $("#" + d.divElement.id + "-subscribersMarker").disableTextSelect(),
        $("#" + d.divElement.id + "-historyButton").disableTextSelect(),
        $("#" + d.divElement.id + "-configButton").disableTextSelect(),
        $("#" + d.divElement.id + "-collapseButton").disableTextSelect(),
        $("#" + d.divElement.id + "-expandButton").disableTextSelect(),
        $("#" + d.divElement.id + "-closeButton").disableTextSelect(),
        $("#" + d.divElement.id + "-expandButton").hide(),
        $("#" + d.divElement.id + "-subscribersMarker").hide(),
        $("#" + d.divElement.id + "-closeButton").click(function(b) {
            $(a).remove()
        }),
        $("#" + d.divElement.id + "-configButton").click(function(a) {
            d.setupOptionsPanel()
        }),
        void 0 !== d.options.closeButton && 0 == d.options.closeButton && $("#" + d.divElement.id + "-closeButton").hide(),
        void 0 !== d.options.subscribersMarker && 0 == d.options.subscribersMarker && $("#" + d.divElement.id + "-subscribersMarker").remove(),
        void 0 !== d.options.collapseButton && 0 == d.options.collapseButton && ($("#" + d.divElement.id + "-expandButton").hide(),
        $("#" + d.divElement.id + "-collapseButton").hide()),
        $("#" + d.divElement.id + "-expandButton").click(function(a) {
            $("#" + d.divElement.id + "-panelBody").slideDown("fast"),
            $("#" + d.divElement.id + "-expandButton").hide(),
            $("#" + d.divElement.id + "-collapseButton").show()
        }),
        $("#" + d.divElement.id + "-collapseButton").click(function(a) {
            $("#" + d.divElement.id + "-panelBody").slideUp("fast"),
            $("#" + d.divElement.id + "-expandButton").show(),
            $("#" + d.divElement.id + "-collapseButton").hide()
        }),
        "undefined" == typeof i18n_panel_options && (i18n_panel_options = "Options"),
        $("#" + d.divElement.id + "-configButton").tooltip({
            placement: "left",
            trigger: "hover",
            title: i18n_panel_options,
            animation: !0,
            delay: 1e3
        }),
        "undefined" == typeof i18n_history && (i18n_history = "History"),
        $("#" + d.divElement.id + "-historyButton").tooltip({
            placement: "left",
            trigger: "hover",
            title: i18n_history,
            animation: !0,
            delay: 1e3
        }),
        "undefined" == typeof i18n_reset && (i18n_reset = "Reset"),
        $("#" + d.divElement.id + "-resetButton").tooltip({
            placement: "left",
            trigger: "hover",
            title: i18n_reset,
            animation: !0,
            delay: 1e3
        }),
        "undefined" == typeof i18n_panel_links && (i18n_panel_links = "Panel links"),
        $("#" + d.divElement.id + "-resetButton").click(function() {
            d.setToConcept(d.default.conceptId)
        }),
        $("#" + d.divElement.id + "-apply-button").click(function() {
            d.readOptionsPanel()
        }),
        $("#" + d.divElement.id + "-historyButton").click(function(a) {
            $("#" + d.divElement.id + "-historyButton").popover({
                trigger: "manual",
                placement: "bottomRight",
                html: !0,
                content: function() {
                    historyHtml = '<div style="height:100px;overflow:auto;">',
                    "undefined" == typeof i18n_no_terms && (i18n_no_terms = "No terms"),
                    0 == d.history.length && (historyHtml = historyHtml + '<div class="text-center text-muted" style="width:100%"><em>' + i18n_no_terms + "</span>...</em></div>"),
                    historyHtml += "<table>";
                    var a = d.history.slice(0);
                    return a.reverse(),
                    $.each(a, function(a, b) {
                        var c = new Date
                          , e = c.getTime()
                          , f = e - b.time
                          , g = "";
                        f < 6e4 ? g = 1 == Math.round(f / 1e3) ? Math.round(f / 1e3) + " second ago" : Math.round(f / 1e3) + " seconds ago" : f < 36e5 ? g = 1 == Math.round(f / 1e3 / 60) ? Math.round(f / 1e3 / 60) + " minute ago" : Math.round(f / 1e3 / 60) + " minutes ago" : f < 216e6 && (g = 1 == Math.round(f / 1e3 / 60 / 60) ? Math.round(f / 1e3 / 60 / 60) + " hour ago" : Math.round(f / 1e3 / 60 / 60) + " hours ago"),
                        historyHtml = historyHtml + '<tr><td><a href="javascript:void(0);" onclick="historyInTaxPanel(\'' + d.divElement.id + "','" + b.conceptId + "');\">" + b.term + "</a>",
                        historyHtml = historyHtml + ' <span class="text-muted" style="font-size: 80%"><em>' + g + "<em></span>",
                        historyHtml += "</td></tr>"
                    }),
                    historyHtml += "</table>",
                    historyHtml += "</div>",
                    historyHtml
                }
            }),
            $("#" + d.divElement.id + "-historyButton").popover("toggle")
        }),
        $("#" + d.divElement.id + "-descendantsCountTrue").click(function(a) {
            d.options.descendantsCount = !0,
            $("#" + d.divElement.id + "-txViewLabel2").html("Descendants Count: On"),
            d.setupParents([], {
                conceptId: 138875005,
                defaultTerm: "SNOMED CT Concept",
                definitionStatus: "Primitive",
                inferredDescendants: c.rootConceptDescendants
            })
        }),
        $("#" + d.divElement.id + "-descendantsCountFalse").click(function(a) {
            d.options.descendantsCount = !1,
            $("#" + d.divElement.id + "-txViewLabel2").html("Descendants Count: Off"),
            d.setupParents([], {
                conceptId: 138875005,
                defaultTerm: "SNOMED CT Concept",
                definitionStatus: "Primitive",
                inferredDescendants: c.rootConceptDescendants
            })
        }),
        $("#" + d.divElement.id + "-inferredViewButton").click(function(a) {
            d.options.selectedView = "inferred",
            $("#" + d.divElement.id + "-txViewLabel").html("<span class='i18n' data-i18n-id='i18n_inferred_view'>Inferred view</span>"),
            d.setupParents([], {
                conceptId: 138875005,
                defaultTerm: "SNOMED CT Concept",
                definitionStatus: "Primitive",
                inferredDescendants: c.rootConceptDescendants
            })
        }),
        $("#" + d.divElement.id + "-statedViewButton").click(function(a) {
            d.options.selectedView = "stated",
            $("#" + d.divElement.id + "-txViewLabel").html("<span class='i18n' data-i18n-id='i18n_stated_view'>Stated view</span>"),
            d.setupParents([], {
                conceptId: 138875005,
                defaultTerm: "SNOMED CT Concept",
                definitionStatus: "Primitive",
                statedDescendants: c.rootConceptDescendants
            })
        }),
        $("#" + d.divElement.id + "-ownMarker").css("color", d.markerColor)
    }
    ,
    this.setupOptionsPanel = function() {
        var a = [];
        $.each(componentsRegistry, function(b, c) {
            if (c.divElement.id != d.divElement.id) {
                var e = {};
                e.subscriptions = c.subscriptions,
                e.id = c.divElement.id,
                a.push(e)
            }
        });
        var b = !1;
        $.each(a, function(a, c) {
            b = !1,
            $.each(d.subscriptions, function(a, d) {
                c.id == d.topic && (b = !0)
            }),
            c.subscribed = b,
            b = !1,
            $.each(c.subscriptions, function(a, c) {
                c.topic == d.divElement.id && (b = !0)
            }),
            c.subscriptor = b
        }),
        d.options.possibleSubscribers = a;
        var c = {
            options: d.options,
            divElementId: d.divElement.id
        };
        $("#" + d.divElement.id + "-modal-body").html(JST["views/taxonomyPlugin/options.hbs"](c))
    }
    ,
    this.readOptionsPanel = function() {
        $.each(d.options.possibleSubscribers, function(a, b) {
            b.subscribed = $("#" + d.divElement.id + "-subscribeTo-" + b.id).is(":checked"),
            b.subscriptor = $("#" + d.divElement.id + "-subscriptor-" + b.id).is(":checked");
            var c = {};
            $.each(componentsRegistry, function(a, d) {
                d.divElement.id == b.id && (c = d)
            }),
            b.subscribed ? d.subscribe(c) : d.unsubscribe(c),
            b.subscriptor ? c.subscribe(d) : c.unsubscribe(d)
        }),
        $.each(componentsRegistry, function(a, b) {
            b.loadMarkers && b.loadMarkers()
        })
    }
    ,
    this.setupParents = function(a, b) {
        var e;
        $.each(a, function(a, b) {
            e = b
        }),
        Handlebars.registerHelper("hasCountryIcon", function(a, b) {
            return countryIcons[a] ? b.fn(this) : b.inverse(this)
        }),
        Handlebars.registerHelper("if_eq", function(a, b, c) {
            if ("undefined" != c)
                return a == b ? c.fn(this) : c.inverse(this)
        }),
        Handlebars.registerHelper("if_gr", function(a, b, c) {
            return a > b ? c.fn(this) : c.inverse(this)
        }),
        Handlebars.registerHelper("if_def", function(a, b) {
            return a == d.default.conceptId ? b.fn(this) : b.inverse(this)
        });
        var f = {
            parents: a,
            focusConcept: b,
            divElementId: d.divElement.id
        };
        if (Handlebars.registerHelper("slice", function(a, b) {
            $("#" + d.divElement.id + "-panelBody").html($("#" + d.divElement.id + "-panelBody").html().slice(a, b))
        }),
        $("#" + d.divElement.id + "-panelBody").html(JST["views/taxonomyPlugin/body/parents.hbs"](f)),
        1 == d.options.descendantsCount) {
            var g = a;
            g.push(b),
            g.forEach(function(a) {
                var b = a.inferredDescendants;
                "stated" == d.options.selectedView && (b = a.statedDescendants),
                $("#" + d.divElement.id + "-panelBody").find('.selectable-row[data-concept-id="' + a.conceptId + '"]').append("&nbsp;&nbsp;&nbsp;&nbsp;<span class='text-muted'>" + b + "</span>")
            })
        }
        $(".treeButton").disableTextSelect(),
        $("#" + d.divElement.id + "-panelBody").unbind("dblclick"),
        $("#" + d.divElement.id + "-panelBody").dblclick(function(a) {
            if ($(a.target).hasClass("treeLabel")) {
                var b = new Date
                  , e = b.getTime()
                  , f = $(a.target).attr("data-module")
                  , g = $(a.target).attr("data-concept-id")
                  , h = $(a.target).attr("data-term")
                  , i = $(a.target).attr("data-statedDescendants")
                  , j = $(a.target).attr("data-inferredDescendants");
                d.history.push({
                    term: h,
                    conceptId: g,
                    time: e
                }),
                void 0 !== g && $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + g + "/parents?form=" + d.options.selectedView, function(a) {}).done(function(a) {
                    d.setupParents(a, {
                        conceptId: g,
                        defaultTerm: h,
                        definitionStatus: "Primitive",
                        module: f,
                        statedDescendants: i,
                        inferredDescendants: j
                    })
                }).fail(function() {})
            }
        }),
        $("#" + d.divElement.id + "-panelBody").unbind("click"),
        $("#" + d.divElement.id + "-panelBody").click(function(a) {
            if ($(a.target).hasClass("treeButton")) {
                var b = $(a.target).closest("li").attr("data-concept-id")
                  , c = d.divElement.id + "-treeicon-" + b;
                a.preventDefault(),
                $("#" + c).hasClass("glyphicon-chevron-down") ? ($(a.target).closest("li").find("ul").remove(),
                $("#" + c).removeClass("glyphicon-chevron-down"),
                $("#" + c).addClass("glyphicon-chevron-right")) : $("#" + c).hasClass("glyphicon-chevron-right") ? ($("#" + c).removeClass("glyphicon-chevron-right"),
                $("#" + c).addClass("glyphicon-refresh"),
                $("#" + c).addClass("icon-spin"),
                d.getChildren($(a.target).closest("li").attr("data-concept-id"))) : $("#" + c).hasClass("glyphicon-chevron-up") ? ($("#" + c).removeClass("glyphicon-chevron-up"),
                $("#" + c).addClass("glyphicon-refresh"),
                $("#" + c).addClass("icon-spin"),
                d.wrapInParents($(a.target).closest("li").attr("data-concept-id"), $(a.target).closest("li"))) : $("#" + c).hasClass("glyphicon-minus")
            } else if ($(a.target).hasClass("treeLabel")) {
                var e = $(a.target).attr("data-concept-id");
                void 0 !== e && channel.publish(d.divElement.id, {
                    term: $(a.target).attr("data-term"),
                    module: $(a.target).attr("data-module"),
                    conceptId: e,
                    source: d.divElement.id
                })
            }
        });
        var h = d.divElement.id + "-treeicon-" + b.conceptId;
        $("#" + h).removeClass("glyphicon-chevron-right"),
        $("#" + h).addClass("glyphicon-refresh"),
        $("#" + h).addClass("icon-spin"),
        d.getChildren(b.conceptId)
    }
    ,
    this.getChildren = function(a) {
        void 0 === d.options.selectedView && (d.options.selectedView = "inferred"),
        "inferred" == d.options.selectedView ? $("#" + d.divElement.id + "-txViewLabel").html("<span class='i18n' data-i18n-id='i18n_inferred_view'>Inferred view</span>") : $("#" + d.divElement.id + "-txViewLabel").html("<span class='i18n' data-i18n-id='i18n_stated_view'>Stated view</span>"),
        1 == d.options.descendantsCount ? $("#" + d.divElement.id + "-txViewLabel2").html("Descendants Count: On") : $("#" + d.divElement.id + "-txViewLabel2").html("Descendants Count: Off"),
        $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + a + "/children?form=" + d.options.selectedView, function(a) {}).done(function(b) {
            b && b[0] && void 0 === b[0].statedDescendants && $("#" + d.divElement.id + "-txViewLabel2").closest("li").hide(),
            b.sort(function(a, b) {
                return a.defaultTerm.toLowerCase() < b.defaultTerm.toLowerCase() ? -1 : a.defaultTerm.toLowerCase() > b.defaultTerm.toLowerCase() ? 1 : 0
            });
            var c = []
              , e = {
                result: b,
                divElementId: d.divElement.id,
                selectedView: d.options.selectedView
            };
            Handlebars.registerHelper("hasCountryIcon", function(a, b) {
                return countryIcons[a] ? b.fn(this) : b.inverse(this)
            }),
            Handlebars.registerHelper("if_eq", function(a, b, c) {
                if ("undefined" != c)
                    return a == b ? c.fn(this) : c.inverse(this)
            }),
            Handlebars.registerHelper("push", function(a) {
                c.push(a)
            }),
            $("#" + d.divElement.id + "-treeicon-" + a).removeClass("glyphicon-refresh"),
            $("#" + d.divElement.id + "-treeicon-" + a).removeClass("icon-spin"),
            b.length > 0 ? $("#" + d.divElement.id + "-treeicon-" + a).addClass("glyphicon-chevron-down") : $("#" + d.divElement.id + "-treeicon-" + a).addClass("glyphicon-minus"),
            $("#" + d.divElement.id + "-treenode-" + a).closest("li").append(JST["views/taxonomyPlugin/body/children.hbs"](e)),
            1 == d.options.descendantsCount && b.forEach(function(b) {
                if (b.active) {
                    var c = b.inferredDescendants;
                    "stated" == d.options.selectedView && (c = b.statedDescendants),
                    $("#" + d.divElement.id + "-treenode-" + a).closest("li").find('.selectable-row[data-concept-id="' + b.conceptId + '"]').append("&nbsp;&nbsp;&nbsp;&nbsp;<span class='text-muted'>" + c + "</span>")
                }
            }),
            $(".treeButton").disableTextSelect(),
            "undefined" == typeof i18n_drag_this && (i18n_drag_this = "Drag this"),
            $("[draggable='true']").tooltip({
                placement: "left auto",
                trigger: "hover",
                title: i18n_drag_this,
                animation: !0,
                delay: 500
            }),
            $("[draggable='true']").mouseover(function(a) {
                var b = $(a.target).attr("data-term");
                void 0 === b && (b = $($(a.target).parent()).attr("data-term")),
                icon = iconToDrag(b)
            })
        }).fail(function() {
            $("#" + d.divElement.id + "-treeicon-" + a).removeClass("icon-spin"),
            $("#" + d.divElement.id + "-treeicon-" + a).removeClass("glyphicon-refresh"),
            $("#" + d.divElement.id + "-treeicon-" + a).addClass("glyphicon-minus")
        })
    }
    ,
    this.wrapInParents = function(a, b) {
        var e = $("#" + d.divElement.id + "-panelBody").find("ul:first");
        $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + a + "/parents?form=" + d.options.selectedView, function(a) {}).done(function(b) {
            if (b.length > 0) {
                var c = "empty"
                  , f = [];
                $.each(b, function(a, b) {
                    var e = "<li data-concept-id='" + b.conceptId + "' data-term='" + b.defaultTerm + "' class='treeLabel'>";
                    e += "<button class='btn btn-link btn-xs treeButton' style='padding:2px'><i class='glyphicon glyphicon-chevron-",
                    "138875005" == b.conceptId || "9999999999" == b.conceptId ? e += "down" : e += "up",
                    e = e + " treeButton'  id='" + d.divElement.id + "-treeicon-" + b.conceptId + "'></i></button>",
                    e = "Primitive" == b.definitionStatus ? e + '<span class="badge alert-warning" data-concept-id="' + b.conceptId + '" data-term="' + b.defaultTerm + '" draggable="true" ondragstart="drag(event)" class="treeLabel selectable-row" id="' + d.divElement.id + "-treenode-" + b.conceptId + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;' : e + '<span class="badge alert-warning" data-concept-id="' + b.conceptId + '" data-term="' + b.defaultTerm + '" draggable="true" ondragstart="drag(event)" class="treeLabel selectable-row" id="' + d.divElement.id + "-treenode-" + b.conceptId + '">&equiv;</span>&nbsp;&nbsp;',
                    countryIcons[b.module] && (e = e + "<div class='phoca-flagbox' style='width:33px;height:33px'><span class='phoca-flag " + countryIcons[b.module] + "'></span></div> "),
                    e = e + '<a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;"><span class="treeLabel selectable-row" data-concept-id="' + b.conceptId + '" data-term="' + b.defaultTerm + '"> ' + b.defaultTerm + "</span></a>",
                    e += "</li>",
                    f.push(e),
                    "empty" == c && (c = b.conceptId)
                });
                var g = e.children().slice(0);
                e.append(f[0]),
                $("#" + d.divElement.id + "-treenode-" + c).closest("li").append("<ul id='parent-ul-id-" + c + "' style='list-style-type: none; padding-left: 15px;'></ul>"),
                1 == d.options.descendantsCount && b.forEach(function(a) {
                    var b = a.inferredDescendants;
                    "stated" == d.options.selectedView && (b = a.statedDescendants),
                    $(e).find('.selectable-row[data-concept-id="' + a.conceptId + '"]').append("&nbsp;&nbsp;&nbsp;&nbsp;<span class='text-muted'>" + b + "</span>")
                });
                var h;
                $.each(g, function(b, e) {
                    if ($(e).attr("data-concept-id") == a) {
                        h = $(e);
                        $("#" + d.divElement.id + "-treenode-" + c).closest("li").find("ul:first").append($(e)),
                        $(e).find("i:first").removeClass("glyphicon-chevron-up"),
                        $(e).find("i:first").addClass("glyphicon-chevron-down")
                    }
                }),
                $.each(g, function(b, c) {
                    $(c).attr("data-concept-id") != a && ($.each($(c).children(), function(a, b) {
                        $(b).is("ul") && h.append(b)
                    }),
                    $("#" + d.divElement.id + "-treenode-" + $(c).attr("data-concept-id")).closest("li").remove())
                }),
                $.each(f, function(a, b) {
                    b != f[0] && e.prepend(b)
                }),
                $("#" + d.divElement.id + "-treeicon-" + a).removeClass("glyphicon-refresh"),
                $("#" + d.divElement.id + "-treeicon-" + a).removeClass("icon-spin"),
                $("#" + d.divElement.id + "-treeicon-" + a).addClass("glyphicon-chevron-down")
            } else
                $("#" + d.divElement.id + "-treeicon-" + a).removeClass("glyphicon-refresh"),
                $("#" + d.divElement.id + "-treeicon-" + a).removeClass("icon-spin"),
                $("#" + d.divElement.id + "-treeicon-" + a).addClass("glyphicon-chevron-up");
            $("[draggable='true']").tooltip({
                placement: "left auto",
                trigger: "hover",
                title: i18n_drag_this,
                animation: !0,
                delay: 500
            }),
            $("[draggable='true']").mouseover(function(a) {
                var b = $(a.target).attr("data-term");
                void 0 === b && (b = $($(a.target).parent()).attr("data-term")),
                icon = iconToDrag(b)
            })
        }).fail(function() {})
    }
    ,
    this.setToConcept = function(a, b, e, f, g) {
        $("#" + d.divElement.id + "-panelBody").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
        $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + a + "/parents?form=" + d.options.selectedView, function(a) {}).done(function(h) {
            "Primitive" != e && "Fully defined" != e && (e = "Primitive"),
            138875005 == a && (g = c.rootConceptDescendants),
            void 0 === b || void 0 === g ? $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + a, function(c) {
                b = c.defaultTerm,
                void 0 === c.statedDescendants && $("#" + d.divElement.id + "-txViewLabel2").closest("li").hide(),
                g = c.statedDescendants,
                d.setupParents(h, {
                    conceptId: a,
                    defaultTerm: b,
                    definitionStatus: e,
                    module: f,
                    statedDescendants: g
                })
            }) : d.setupParents(h, {
                conceptId: a,
                defaultTerm: b,
                definitionStatus: e,
                module: f,
                statedDescendants: g
            })
        }).fail(function() {
            $("#" + d.divElement.id + "-panelBody").html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>")
        })
    }
    ,
    this.subscribe = function(a) {
        var b = a.divElement.id
          , c = !1;
        if ($.each(d.subscriptionsColor, function(b, d) {
            d == a.markerColor && (c = !0)
        }),
        !c) {
            var e = channel.subscribe(b, function(a, b) {
                d.setToConcept(a.conceptId, a.term, a.definitionStatus, a.module, a.statedDescendants)
            });
            d.subscriptions.push(e),
            a.subscribers.push(d.divElement.id),
            d.subscriptionsColor.push(a.markerColor)
        }
        $("#" + b + "-ownMarker").show(),
        $("#" + d.divElement.id + "-subscribersMarker").show(),
        $("#" + b + "-subscribersMarker").show()
    }
    ,
    this.refsetSubscribe = function(a) {
        channel.subscribe("refsetSubscription-" + a, function(a, b) {
            d.setToConcept(a.conceptId)
        })
    }
    ,
    this.unsubscribe = function(a) {
        var b = []
          , c = []
          , e = !0;
        $.each(d.subscriptionsColor, function(b, d) {
            d != a.markerColor ? c.push(d) : e = !1
        }),
        e || (d.subscriptionsColor = c,
        c = [],
        $.each(a.subscribers, function(a, c) {
            c != d.divElement.id && b.push(c)
        }),
        a.subscribers = b,
        $.each(a.subscriptionsColor, function(a, b) {
            c.push(b)
        }),
        0 == a.subscribers.length && 0 == a.subscriptions.length && $("#" + a.divElement.id + "-subscribersMarker").hide(),
        a.subscriptionsColor = c,
        b = [],
        $.each(d.subscriptions, function(c, d) {
            a.divElement.id == d.topic ? d.unsubscribe() : b.push(d)
        }),
        d.subscriptions = b,
        0 == d.subscriptions.length && 0 == d.subscribers.length && $("#" + d.divElement.id + "-subscribersMarker").hide())
    }
    ,
    this.loadMarkers = function() {
        var a = ""
          , b = 0
          , c = 0
          , e = !1
          , f = !1;
        $.each(componentsRegistry, function(a, b) {
            var c = b.divElement.id;
            $("#" + c + "-subscribersMarker").is(":visible") && (f = !0)
        }),
        0 == d.subscribers.length ? (b = 14,
        $("#" + d.divElement.id + "-ownMarker").hide()) : (f || $("#" + d.divElement.id + "-ownMarker").hide(),
        e = !0),
        $("#" + d.divElement.id + "-subscribersMarker").is(":visible") && ($("#" + d.divElement.id + "-panelTitle").html($("#" + d.divElement.id + "-panelTitle").html().replace(/&nbsp;/g, "")),
        e && $("#" + d.divElement.id + "-panelTitle").html("&nbsp&nbsp&nbsp&nbsp" + $("#" + d.divElement.id + "-panelTitle").html()),
        $.each(d.subscriptionsColor, function(e, f) {
            a = a + "<i class='glyphicon glyphicon-bookmark' style='color: " + f + "; top:" + c + "px; right: " + b + "px;'></i>",
            $("#" + d.divElement.id + "-panelTitle").html("&nbsp&nbsp" + $("#" + d.divElement.id + "-panelTitle").html()),
            c += 5,
            b += 10
        }),
        $("#" + d.divElement.id + "-subscribersMarker").html(a))
    }
    ,
    this.getNextMarkerColor = function(a) {
        var b = "black";
        return "black" == a ? b = "green" : "green" == a ? b = "purple" : "purple" == a ? b = "red" : "red" == a ? b = "blue" : "blue" == a && (b = "green"),
        globalMarkerColor = b,
        b
    }
    ,
    d.markerColor = d.getNextMarkerColor(globalMarkerColor),
    this.setupCanvas(),
    b && 138875005 != b ? (null != e && e.abort(),
    e = $.getJSON(c.serverUrl + "/" + c.edition + "/" + c.release + "/concepts/" + b, function(a) {
        void 0 === a.statedDescendants && $("#" + d.divElement.id + "-txViewLabel2").closest("li").hide()
    }).done(function(a) {
        "stated" == d.options.selectedView ? d.setToConcept(b, a.defaultTerm, a.definitionStatus, a.module, a.statedDescendants) : d.setToConcept(b, a.defaultTerm, a.definitionStatus, a.module, a.inferredDescendants)
    }).fail(function() {})) : this.setupParents([], {
        conceptId: 138875005,
        defaultTerm: "SNOMED CT Concept",
        definitionStatus: "Primitive",
        statedDescendants: c.rootConceptDescendants
    })
}
function clearTaxonomyPanelSubscriptions(a) {
    var b;
    $.each(componentsRegistry, function(c, d) {
        d.divElement.id == a && (b = d)
    }),
    b.unsubscribeAll(),
    $("#" + a).find(".linker-button").popover("toggle")
}
function historyInTaxPanel(a, b) {
    $.each(componentsRegistry, function(c, d) {
        d.divElement.id == a && d.setToConcept(b)
    }),
    $(".history-button").popover("hide")
}
function refsetPanel(a, b) {
    var c = this;
    this.divElement = a,
    this.options = jQuery.extend(!0, {}, b);
    this.type = "favorites",
    c.subscribers = [];
    var d = null;
    this.getConceptId = function() {
        return this.conceptId
    }
    ,
    this.getDivId = function() {
        return this.divId
    }
    ,
    this.getNextMarkerColor = function(a) {
        var b = "black";
        return "black" == a ? b = "green" : "green" == a ? b = "purple" : "purple" == a ? b = "red" : "red" == a ? b = "blue" : "blue" == a && (b = "green"),
        globalMarkerColor = b,
        b
    }
    ,
    c.markerColor = c.getNextMarkerColor(globalMarkerColor),
    this.setUpPanel = function() {
        var b = {
            divElementId: c.divElement.id
        };
        $(a).html(JST["views/refsetPlugin/main.hbs"](b))
    }
    ,
    c.setUpPanel(),
    this.loadRefsets = function() {
        if (c.options.manifest) {
            c.options.manifest.refsets.sort(function(a, b) {
                return "daily-build" == a.type && a.type != b.type ? -1 : a.type < b.type ? -1 : a.type > b.type ? 1 : a.defaultTerm < b.defaultTerm ? -1 : a.defaultTerm > b.defaultTerm ? 1 : 0
            });
            var a = {
                divElementId: c.divElement.id,
                refsets: c.options.manifest.refsets
            };
            $("#" + c.divElement.id + "-panelBody").html(JST["views/refsetPlugin/body.hbs"](a)),
            $("#" + c.divElement.id + "-panelBody").find(".refset-item").click(function(a) {
                c.loadMembers($(a.target).attr("data-concept-id"), $(a.target).attr("data-term"), 100, 0),
                channel.publish(c.divElement.id, {
                    term: $(a.target).attr("data-term"),
                    module: $(a.target).attr("data-module"),
                    conceptId: $(a.target).attr("data-concept-id"),
                    source: c.divElement.id
                })
            })
        } else
            $("#" + c.divElement.id + "-panelBody").html("<div class='alert alert-danger'><span class='i18n' data-i18n-id='i18n_ajax_failed'><strong>Error</strong> while retrieving data from server...</span></div>")
    }
    ,
    c.loadRefsets(),
    this.loadMembers = function(a, e, f, g, h) {
        var i = b.serverUrl + "/" + b.edition + "/" + b.release + "/concepts/" + a + "/members?limit=" + f;
        g > 0 ? i = i + "&skip=" + g : $("#" + c.divElement.id + "-resultsTable").html("<tr><td class='text-muted' colspan='2'><i class='glyphicon glyphicon-refresh icon-spin'></i></td></tr>");
        var j;
        c.options.manifest && $.each(c.options.manifest.refsets, function(a, b) {
            b.conceptId == c.conceptId && b.count && (j = b.count)
        }),
        void 0 !== j && (h = 1,
        i += "&paginate=1"),
        null != d && d.abort(),
        d = $.getJSON(i, function(a) {}).done(function(b) {
            var d = "asd";
            if (void 0 === j && (j = b.details.total),
            (d = j == g ? 0 : j > g + f ? j - (g + f) : 0) < f)
                var i = d;
            else if (0 != d)
                var i = f;
            else
                var i = 0;
            var k = {
                result: b,
                returnLimit: i,
                remaining: d,
                divElementId: c.divElement.id,
                skipTo: g,
                term: e,
                conceptId: a
            };
            Handlebars.registerHelper("if_eq", function(a, b, c) {
                if ("undefined" != c)
                    return a == b ? c.fn(this) : c.inverse(this)
            }),
            Handlebars.registerHelper("if_gr", function(a, b, c) {
                if (a)
                    return a > b ? c.fn(this) : c.inverse(this)
            }),
            Handlebars.registerHelper("hasCountryIcon", function(a, b) {
                return countryIcons[a] ? b.fn(this) : b.inverse(this)
            }),
            0 != b.members.length ? ($("#" + c.divElement.id + "-moreMembers").remove(),
            $("#" + c.divElement.id + "-resultsTable").find(".more-row").remove(),
            0 == g ? $("#" + c.divElement.id + "-resultsTable").html(JST["views/refsetPlugin/members.hbs"](k)) : $("#" + c.divElement.id + "-resultsTable").append(JST["views/refsetPlugin/members.hbs"](k)),
            $("#" + c.divElement.id + "-moreMembers").click(function() {
                $("#" + c.divElement.id + "-moreMembers").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
                g += f,
                c.loadMembers(a, e, i, g, h)
            }),
            $("#" + c.divElement.id + "-sort").unbind(),
            $("#" + c.divElement.id + "-sort").click(function() {
                $("#" + c.divElement.id + "-sort").blur(),
                c.loadMembers(a, e, i, 0, 1)
            })) : 0 != g ? ($("#" + c.divElement.id + "-moreMembers").remove(),
            $("#" + c.divElement.id + "-resultsTable").find(".more-row").remove(),
            0 == g ? $("#" + c.divElement.id + "-resultsTable").html(JST["views/refsetPlugin/members.hbs"](k)) : $("#" + c.divElement.id + "-resultsTable").append(JST["views/refsetPlugin/members.hbs"](k)),
            $("#" + c.divElement.id + "-moreMembers").click(function() {
                $("#" + c.divElement.id + "-moreMembers").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
                g += f,
                c.loadMembers(a, e, i, g, h)
            }),
            $("#" + c.divElement.id + "-sort").unbind(),
            $("#" + c.divElement.id + "-sort").click(function() {
                $("#" + c.divElement.id + "-sort").blur(),
                c.loadMembers(a, e, i, 0, 1)
            })) : $("#" + c.divElement.id + "-resultsTable").html("<tr><td class='text-muted' colspan='2'><span data-i18n-id='i18n_no_members' class='i18n'>This concept has no members</span></td></tr>"),
            $("#" + c.divElement.id + "-resultsTable").find(".member-concept-row").click(function(a) {
                var b = $(a.target).closest(".member-concept-row").find(".badge");
                channel.publish(c.divElement.id, {
                    term: b.attr("data-term"),
                    module: b.attr("data-module"),
                    conceptId: b.attr("data-concept-id"),
                    source: c.divElement.id
                })
            })
        }).fail(function(a) {
            0 === d.status ? "abort" === d.statusText || $("#" + c.divElement.id + "-resultsTable").html("<tr><td class='text-muted' colspan='2'><span data-i18n-id='i18n_no_members' class='i18n'>This concept has no members</span></td></tr>") : $("#" + c.divElement.id + "-resultsTable").html("<tr><td class='text-muted' colspan='2'><span data-i18n-id='i18n_no_members' class='i18n'>This concept has no members</span></td></tr>")
        })
    }
}
function favoritePanel(a, b) {
    var c = this;
    this.divElement = a,
    this.options = jQuery.extend(!0, {}, b);
    this.type = "favorites",
    c.subscribers = [],
    this.getConceptId = function() {
        return this.conceptId
    }
    ,
    this.getDivId = function() {
        return this.divId
    }
    ,
    this.getNextMarkerColor = function(a) {
        var b = "black";
        return "black" == a ? b = "green" : "green" == a ? b = "purple" : "purple" == a ? b = "red" : "red" == a ? b = "blue" : "blue" == a && (b = "green"),
        globalMarkerColor = b,
        b
    }
    ,
    c.markerColor = c.getNextMarkerColor(globalMarkerColor),
    this.setUpFavs = function() {
        var b = {
            divElementId: c.divElement.id
        };
        $(a).html(JST["views/favorites/main.hbs"](b))
    }
    ,
    c.setUpFavs(),
    this.loadFavs = function() {
        function a(a) {
            var b = {
                concepts: a
            };
            $("#" + c.divElement.id + "-panelBody").html(JST["views/favorites/body.hbs"](b)),
            $("#" + c.divElement.id + "-panelBody").find(".glyphicon-remove-circle").click(function(a) {
                var b = stringToArray(localStorage.getItem("favs"))
                  , d = [];
                $.each(b, function(b, c) {
                    c != $(a.target).attr("data-concept-id") && d.push(c)
                }),
                localStorage.setItem("favs", d),
                localStorage.removeItem("conceptId:" + $(a.target).attr("data-concept-id")),
                c.loadFavs()
            }),
            $("#exportFavsXls").click(function() {
                return ExcellentExport.excel(this, "tableFavs")
            }),
            $("#" + c.divElement.id + "-panelBody").find(".fav-item").click(function(a) {
                channel.publish(c.divElement.id, {
                    term: $(a.target).attr("data-term"),
                    module: $(a.target).attr("data-module"),
                    conceptId: $(a.target).attr("data-concept-id"),
                    source: c.divElement.id
                })
            })
        }
        $("#" + c.divElement.id + "-panelBody").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>");
        var b = stringToArray(localStorage.getItem("favs"))
          , d = [];
        b.length;
        $.each(b, function(a, b) {
            var c = localStorage.getItem("conceptId:" + b);
            c = JSON.parse(c),
            d.push(c)
        }),
        a(d)
    }
    ,
    channel.subscribe("favsAction", function() {
        c.loadFavs()
    }),
    $("#" + c.divElement.id + "-li").click(function() {
        c.loadFavs()
    })
}
function queryComputerPanel(a, b) {
    var c = this;
    c.showId = !1;
    var d = 100
      , e = 0
      , f = null
      , g = null;
    if (c.currentEx = 0,
    this.divElement = a,
    this.options = jQuery.extend(!0, {}, b),
    this.type = "query-computer",
    c.subscribers = [],
    c.totalResults = [],
    componentsRegistry) {
        var h = !1;
        $.each(componentsRegistry, function(a, b) {
            b.divElement && b.divElement.id == c.divElement.id && (h = !0)
        }),
        0 == h && componentsRegistry.push(c)
    } else
        componentsRegistry = [],
        componentsRegistry.push(c);
    this.getDivId = function() {
        return this.divId
    }
    ,
    this.getNextMarkerColor = function(a) {
        var b = "black";
        return "black" == a ? b = "green" : "green" == a ? b = "purple" : "purple" == a ? b = "red" : "red" == a ? b = "blue" : "blue" == a && (b = "green"),
        globalMarkerColor = b,
        b
    }
    ,
    c.markerColor = "asdasdasdas",
    this.subscribe = function(a) {
        var b = a.divElement.id;
        channel.subscribe(b, function(a, b) {
            a && c.updateCanvas(a)
        });
        $("#" + b + "-ownMarker").show(),
        $("#" + c.divElement.id + "-subscribersMarker").show(),
        $("#" + b + "-ownMarker").show()
    }
    ,
    this.setUpPanel = function() {
        var d = {
            divElementId: c.divElement.id,
            examples: [{
                title: "All excision procedures that are also procedures on the digestive system",
                context: [{
                    modifier: "Include",
                    criterias: [{
                        criteria: "descendantOf",
                        conceptId: "65801008",
                        term: "Excision (procedure)"
                    }, {
                        criteria: "descendantOf",
                        conceptId: "118673008",
                        term: "Procedure on digestive system (procedure)"
                    }]
                }]
            }, {
                title: "All pneumonias except intersticial pneumonias",
                context: [{
                    modifier: "Include",
                    criterias: [{
                        criteria: "descendantOf",
                        conceptId: "233604007",
                        term: "Pneumonia (disorder)"
                    }]
                }, {
                    modifier: "Exclude",
                    criterias: [{
                        criteria: "descendantOrSelfOf",
                        conceptId: "64667001",
                        term: "Interstitial pneumonia (disorder)"
                    }]
                }]
            }, {
                title: "Hypertension related concepts, disorders, personal history and family history",
                context: [{
                    modifier: "Include",
                    criterias: [{
                        criteria: "descendantOf",
                        conceptId: "38341003",
                        term: "Hypertensive disorder, systemic arterial (disorder)"
                    }]
                }, {
                    modifier: "Include",
                    criterias: [{
                        criteria: "self",
                        conceptId: "160273004",
                        term: "No family history: Hypertension (situation)"
                    }]
                }, {
                    modifier: "Include",
                    criterias: [{
                        criteria: "descendantOrSelfOf",
                        conceptId: "161501007",
                        term: "History of hypertension (situation)"
                    }]
                }, {
                    modifier: "Include",
                    criterias: [{
                        criteria: "descendantOrSelfOf",
                        conceptId: "160357008",
                        term: "Family history: Hypertension (situation)"
                    }]
                }]
            }]
        };
        $(a).html(JST["views/developmentQueryPlugin/main.hbs"](d)),
        $(a).find("textarea").unbind(),
        $(a).find("textarea").keypress(function(a) {
            if (13 == a.which) {
                a.preventDefault();
                var b = $(this).val();
                $(this).val(b + "\n")
            }
        }),
        $('[data-toggle="tooltip"]').tooltip(),
        $("#" + c.divElement.id + "-ExamplesModal").scrollspy({
            target: "#" + c.divElement.id + "-sidebar",
            offset: 80
        });
        var e = !1;
        $("#" + c.divElement.id + "-mynav li a").click(function() {
            $("#" + c.divElement.id + "-mycontent > div > h4").css("padding-top", 0),
            $($(this).attr("href") + " > h4").css("padding-top", "50px"),
            e = !0
        }),
        $("#" + c.divElement.id + "-ExamplesModal").on("activate.bs.scrollspy", function() {
            e || $("#" + c.divElement.id + "-mycontent > div > h4").css("padding-top", 0),
            e = !1
        }),
        $("#" + c.divElement.id + "-ExamplesModal").on("shown.bs.modal", function() {
            $("#" + c.divElement.id + "-mycontentExamples").html(JST["views/developmentQueryPlugin/examples.hbs"](d)),
            d.examples.forEach(function(a, b) {
                var d = "";
                a.context.forEach(function(a) {
                    d += JST["views/developmentQueryPlugin/criteria.hbs"](a)
                }),
                $("#" + c.divElement.id + "-" + b + "-modal-examples").find(".contentExamples").first().html(d),
                $("#" + c.divElement.id + "-ExpTab").hasClass("active") && (d = c.exportToConstraintGrammar(!0, !1, !1, $("#" + c.divElement.id + "-" + b + "-modal-examples").find(".contentExamples").first()),
                0 == d.indexOf("(") && (d = d.substr(1, d.length - 2)),
                $("#" + c.divElement.id + "-" + b + "-modal-examples").find(".contentExamples").first().html(d)),
                $("#" + c.divElement.id + "-" + b + "-modal-examples").find(".contentExamples").first().find(".btn").addClass("disabled"),
                $("#" + c.divElement.id + "-" + b + "-modal-examples").find(".query-condition").each(function(a) {
                    $(this).find(".line-number").html(a + 1)
                }),
                $("#" + c.divElement.id + "-" + b + "-modal-examples").find(".loadExample").first().attr("data-htmlValue", $("#" + c.divElement.id + "-" + b + "-modal-examples").find(".contentExamples").first().html())
            }),
            $("#" + c.divElement.id + "-mycontentExamples").find(".loadExample").unbind(),
            $("#" + c.divElement.id + "-mycontentExamples").find(".loadExample").click(function(b) {
                var d = $(b.target).attr("data-htmlValue");
                $("#" + c.divElement.id + "-ExpTab").hasClass("active") ? ($("#" + c.divElement.id + "-ExpText").html(d),
                $("#" + c.divElement.id + "-ExpText").val(d.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<")),
                $("#" + c.divElement.id + "-ExamplesModal").modal("hide")) : ($("#" + c.divElement.id + "-listGroup").html(d),
                $("#" + c.divElement.id + "-listGroup").find(".btn").removeClass("disabled"),
                $("#" + c.divElement.id + "-listGroup").find(".query-condition").each(function(b) {
                    var d = $(this);
                    $(d).find("small").remove(),
                    $(d).append('<small class="text-muted pull-right glyphicon glyphicon-refresh icon-spin" style="position: relative; top: 12px;"></small>'),
                    $("#" + c.divElement.id + "-ExamplesModal").modal("hide"),
                    c.execute("inferred", c.exportToConstraintGrammar(!1, !1, d), !0, function(a) {
                        $(d).find("small").remove(),
                        $(d).find(".glyphicon-refresh").first().remove();
                        var b = parseInt(a);
                        $(d).append('<small class="text-muted pull-right" style="position: relative; top: 10px;" title="This instruction involves the selection of ' + b + ' concepts">' + b + " cpts</small>")
                    }),
                    $("#" + c.divElement.id + "-listGroup").find(".criteriaDropdownOption").unbind(),
                    $("#" + c.divElement.id + "-listGroup").find(".criteriaDropdownOption").click(function(a) {
                        var b = $(a.target).closest(".constraint").attr("data-criteria")
                          , d = $(a.target).html();
                        if (b != d) {
                            $(a.target).closest(".constraint").attr("data-criteria", d),
                            $(a.target).closest("div").find("button").first().html(d + "&nbsp;");
                            var e = $(a.target).closest(".query-condition");
                            $(e).find("small").remove(),
                            $(e).append('<small class="text-muted pull-right glyphicon glyphicon-refresh icon-spin" style="position: relative; top: 12px;"></small>'),
                            c.execute("inferred", c.exportToConstraintGrammar(!1, !1, e), !0, function(a) {
                                $(e).find("small").remove(),
                                $(e).find(".glyphicon-refresh").first().remove();
                                var b = parseInt(a);
                                $(e).append('<small class="text-muted pull-right" style="position: relative; top: 10px;" title="This instruction involves the selection of ' + b + ' concepts">' + b + " cpts</small>")
                            })
                        }
                    }),
                    $(a).find(".removeLi").unbind(),
                    $(a).find(".removeLi").disableTextSelect(),
                    $(a).find(".removeLi").click(function(a) {
                        $(a.target).closest("li").remove(),
                        c.renumLines()
                    })
                }))
            })
        }),
        c.typeArray && c.typeArray.length || $.ajax({
            type: "POST",
            url: b.serverUrl.replace("snomed", "expressions/") + b.edition + "/" + b.release + "/execute/brief",
            data: {
                expression: "< 410662002|Concept model attribute (attribute)|",
                limit: 5e3,
                skip: 0,
                form: "inferred"
            },
            dataType: "json",
            success: function(a) {
                a.computeResponse.matches.push({
                    conceptId: "<< 47429007",
                    defaultTerm: "Associated with (attribute) [<<]"
                }),
                a.computeResponse.matches.push({
                    conceptId: "<< 405815000",
                    defaultTerm: "Procedure device (attribute) [<<]"
                }),
                a.computeResponse.matches.push({
                    conceptId: "<< 405816004",
                    defaultTerm: "Procedure morphology (attribute) [<<]"
                }),
                a.computeResponse.matches.push({
                    conceptId: "<< 363704007",
                    defaultTerm: "Procedure site (attribute) [<<]"
                }),
                c.typeArray = a.computeResponse.matches,
                c.typeArray.sort(function(a, b) {
                    return a.defaultTerm < b.defaultTerm ? -1 : a.defaultTerm > b.defaultTerm ? 1 : 0
                })
            }
        }).done(function(a) {});
        var f = function() {
            $(a).find(".addCriteria").unbind(),
            $(a).find(".addCriteria").disableTextSelect(),
            $(a).find(".addCriteria").click(function(b) {
                $(b.target).closest(".form-group").hide();
                var d = $("#" + c.divElement.id + "-selectedCriteria").html()
                  , e = $(b.target).attr("data-type");
                $(a).find(".addedCriteria").length && (e = $(a).find(".addedCriteria").first().attr("data-typeSelected")),
                $(b.target).closest(".form-inline").append(JST["views/developmentQueryPlugin/andCriteria.hbs"]({
                    criteria: d,
                    typeSelected: e,
                    types: c.typeArray
                })),
                $(a).find(".addedCriteria").find(".selectTypeOpt").unbind(),
                $(a).find(".addedCriteria").find(".selectTypeOpt").click(function(a) {
                    $(a.target).closest(".typeCritCombo").attr("data-type-term", $(a.target).attr("data-term")),
                    $(a.target).closest(".typeCritCombo").attr("data-type-concept-id", $(a.target).attr("data-id"));
                    var b = $(a.target).attr("data-term");
                    b.length > 15 && (b = b.substr(0, 14) + "..."),
                    $(a.target).closest("div").find("span").first().html(b)
                }),
                $(a).find(".addedCriteria").find(".removeCriteria").unbind(),
                $(a).find(".addedCriteria").find(".removeCriteria").click(function(b) {
                    $(b.target).closest(".addedCriteria").remove();
                    var d = $(a).find(".addedCriteria");
                    d.length ? ($(a).find(".addedCriteria").find(".dropFirstType").hide(),
                    $(a).find(".addedCriteria").first().find(".dropFirstType").first().show(),
                    $(d[d.length - 1]).find(".addCriteria").first().closest(".form-group").show()) : $("#" + c.divElement.id + "-addCriteriaAnd").show()
                }),
                $(a).find(".addedCriteria").find("a[data-role='criteria-selector']").unbind(),
                $(a).find(".addedCriteria").find("a[data-role='criteria-selector']").click(function(a) {
                    $(a.target).closest(".dropdown").find("span").first().html($(a.target).html())
                }),
                f()
            })
        };
        f(),
        $("#" + c.divElement.id + "-addCriteriaAnd").unbind(),
        $("#" + c.divElement.id + "-clearButton").unbind(),
        $("#" + c.divElement.id + "-clearButton").disableTextSelect(),
        $("#" + c.divElement.id + "-clearButton").click(function() {
            null != g && g.abort(),
            c.setUpPanel()
        }),
        $("#" + c.divElement.id + "-copyConstraint").unbind(),
        $("#" + c.divElement.id + "-copyConstraint").disableTextSelect();
        var h = new ZeroClipboard(document.getElementById(c.divElement.id + "-copyConstraint"));
        h.on("ready", function(a) {
            h.on("copy", function(a) {
                $("#" + c.divElement.id + "-copyConstraint").addClass("animated rubberBand"),
                window.setTimeout(function() {
                    $("#" + c.divElement.id + "-copyConstraint").removeClass("animated rubberBand")
                }, 1e3),
                alertEvent("Constraint Grammar copied to clipboard", "success"),
                a.clipboardData.setData("text/plain", c.grammarToCopy)
            })
        }),
        c.options.devQuery = !0,
        $("#" + c.divElement.id + "-exportXls").unbind(),
        $("#" + c.divElement.id + "-exportXls").click(function(a) {
            if (c.allResults)
                return ExcellentExport.excel(this, c.divElement.id + "-output2");
            a.preventDefault(),
            a.stopPropagation(),
            c.getTotalResults()
        }),
        $("#" + c.divElement.id + "-exportBriefcase").unbind(),
        $("#" + c.divElement.id + "-exportBriefcase").click(function(a) {
            function b() {
                var a = [];
                $.each(c.allResults, function(b, c) {
                    var d = {};
                    d.conceptId = c.conceptId,
                    d.defaultTerm = c.defaultTerm,
                    d.module = c.module,
                    a.push(d)
                }),
                briefcase.addConcepts(a)
            }
            c.allResults ? b() : (alertEvent("Exporting concepts, please wait", "info"),
            c.getTotalResults(function() {
                b()
            }))
        }),
        $("#" + c.divElement.id + "-open-grammar").unbind(),
        $("#" + c.divElement.id + "-open-grammar").disableTextSelect(),
        $("#" + c.divElement.id + "-open-grammar").click(function(a) {
            c.updateGrammarModal(!1)
        }),
        $("#home-" + c.divElement.id + "-full-syntax-button").unbind(),
        $("#home-" + c.divElement.id + "-full-syntax-button").disableTextSelect(),
        $("#home-" + c.divElement.id + "-full-syntax-button").addClass("btn-primary"),
        $("#home-" + c.divElement.id + "-full-syntax-button").removeClass("btn-default"),
        $("#home-" + c.divElement.id + "-full-syntax-button").click(function(a) {
            c.updateGrammarModal(!0)
        }),
        $("#home-" + c.divElement.id + "-brief-syntax-button").unbind(),
        $("#home-" + c.divElement.id + "-brief-syntax-button").disableTextSelect(),
        $("#home-" + c.divElement.id + "-brief-syntax-button").addClass("btn-default"),
        $("#home-" + c.divElement.id + "-brief-syntax-button").removeClass("btn-primary"),
        $("#home-" + c.divElement.id + "-brief-syntax-button").click(function(a) {
            c.updateGrammarModal(!1)
        }),
        $("#" + c.divElement.id + "-exportBriefcaseClean").unbind(),
        $("#" + c.divElement.id + "-exportBriefcaseClean").click(function(a) {
            function b() {
                var a = [];
                briefcase.emptyBriefcase(),
                $.each(c.allResults, function(b, c) {
                    var d = {};
                    d.conceptId = c.conceptId,
                    d.defaultTerm = c.defaultTerm,
                    d.module = c.module,
                    a.push(d)
                }),
                briefcase.addConcepts(a)
            }
            c.allResults ? b() : (alertEvent("Exporting concepts, please wait", "info"),
            c.getTotalResults(function() {
                b()
            }))
        }),
        $("#" + c.divElement.id + "-computeButton").unbind(),
        $("#" + c.divElement.id + "-computeButton").click(function(a) {
            var d = $("#" + c.divElement.id + "-input").val()
              , e = {
                query: JSON.parse(d),
                pathId: b.path.id
            };
            c.compute(e)
        }),
        $("#" + c.divElement.id).find("a[data-role='modifier-selector']").unbind(),
        $("#" + c.divElement.id).find("a[data-role='modifier-selector']").click(function(a) {
            $("#" + c.divElement.id + "-selectedModifier").html($(a.target).html())
        }),
        $("#" + c.divElement.id + "-selectedConcept").show(),
        $("#" + c.divElement.id + "-selectedType").hide(),
        $("#" + c.divElement.id + "-selectedTarget").hide(),
        $("#" + c.divElement.id + "-searchTerm").hide(),
        $("#" + c.divElement.id + "-searchTerm").unbind(),
        $("#" + c.divElement.id + "-searchTerm").keyup(function(a) {
            13 === a.keyCode && $("#" + c.divElement.id + "-addCriteriaButton").click()
        }),
        $("#" + c.divElement.id + "-formdropdown").hide(),
        $("#" + c.divElement.id).find("a[data-role='criteria-selector']").unbind(),
        $("#" + c.divElement.id).find("a[data-role='criteria-selector']").click(function(a) {
            $("#" + c.divElement.id + "-selectedCriteria").html($(a.target).html());
            var b = $(a.target).html();
            "hasDescription" == b ? ($("#" + c.divElement.id + "-selectedConcept").hide(),
            $("#" + c.divElement.id + "-selectedType").hide(),
            $("#" + c.divElement.id + "-selectedTarget").hide(),
            $("#" + c.divElement.id + "-searchTerm").show(),
            $("#" + c.divElement.id + "-formdropdown").hide()) : "hasRelationship" == b ? ($("#" + c.divElement.id + "-selectedConcept").hide(),
            $("#" + c.divElement.id + "-selectedType").show(),
            $("#" + c.divElement.id + "-selectedTarget").show(),
            $("#" + c.divElement.id + "-searchTerm").hide(),
            $("#" + c.divElement.id + "-formdropdown").show()) : ($("#" + c.divElement.id + "-selectedConcept").show(),
            $("#" + c.divElement.id + "-selectedType").hide(),
            $("#" + c.divElement.id + "-selectedTarget").hide(),
            $("#" + c.divElement.id + "-searchTerm").hide(),
            $("#" + c.divElement.id + "-formdropdown").hide())
        }),
        $("#" + c.divElement.id).find("a[data-role='form-selector']").unbind(),
        $("#" + c.divElement.id).find("a[data-role='form-selector']").click(function(a) {
            $("#" + c.divElement.id + "-selectedForm").html($(a.target).html())
        }),
        $("#" + c.divElement.id + "-addCriteriaButton").unbind(),
        $("#" + c.divElement.id + "-addCriteriaButton").click(function(b) {
            var d = $("#" + c.divElement.id + "-selectedModifier").html()
              , e = $("#" + c.divElement.id + "-selectedCriteria").html()
              , f = $("#" + c.divElement.id + "-selectedConcept").attr("data-conceptId");
            if ($("#" + c.divElement.id + "-listGroup").find('.constraint[data-criteria="' + e + '"][data-concept-id="' + f + '"]').length)
                $("#" + c.divElement.id + "-listGroup").find('.constraint[data-criteria="' + e + '"][data-concept-id="' + f + '"]').closest(".query-condition").attr("data-modifier") == d ? ($("#" + c.divElement.id + "-conceptField").addClass("has-error"),
                $("#" + c.divElement.id + "-addmsg").html("Criteria already added...")) : ($("#" + c.divElement.id + "-conceptField").addClass("has-error"),
                $("#" + c.divElement.id + "-addmsg").html("Contradictory criteria..."));
            else if ("hasDescription" == e) {
                var g = $("#" + c.divElement.id + "-searchTerm").val();
                if ("" == g)
                    $("#" + c.divElement.id + "-conceptField").addClass("has-error"),
                    $("#" + c.divElement.id + "-addmsg").html("Enter a search term...");
                else {
                    $("#" + c.divElement.id + "-addmsg").html(""),
                    $("#" + c.divElement.id + "-conceptField").removeClass("has-error");
                    var h = {
                        modifier: d,
                        criteria: e,
                        searchTerm: g
                    };
                    $("#" + c.divElement.id + "-listGroup").append(JST["views/developmentQueryPlugin/searchCriteria.hbs"](h)),
                    c.renumLines(),
                    $(a).find(".removeLi").unbind(),
                    $(a).find(".removeLi").disableTextSelect(),
                    $(a).find(".removeLi").click(function(a) {
                        $(a.target).closest("li").remove(),
                        c.renumLines()
                    }),
                    $("#" + c.divElement.id + "-selectedConcept").val(""),
                    $("#" + c.divElement.id + "-selectedConcept").attr("data-conceptId", ""),
                    $("#" + c.divElement.id + "-selectedType").val(""),
                    $("#" + c.divElement.id + "-selectedType").attr("data-conceptId", ""),
                    $("#" + c.divElement.id + "-selectedTarget").val(""),
                    $("#" + c.divElement.id + "-selectedTarget").attr("data-conceptId", ""),
                    $("#" + c.divElement.id + "-searchTerm").val("")
                }
            } else if ("hasRelationship" == e) {
                var i = $("#" + c.divElement.id + "-selectedType").attr("data-conceptId")
                  , j = $("#" + c.divElement.id + "-selectedType").val()
                  , k = $("#" + c.divElement.id + "-selectedTarget").attr("data-conceptId")
                  , l = $("#" + c.divElement.id + "-selectedTarget").val()
                  , m = $("#" + c.divElement.id + "-selectedForm").html();
                if (void 0 !== i && "" != i || "" != j || void 0 !== k && "" != k || "" != l) {
                    $("#" + c.divElement.id + "-addmsg").html(""),
                    $("#" + c.divElement.id + "-conceptField").removeClass("has-error");
                    var h = {
                        modifier: d,
                        criteria: e,
                        typeId: i,
                        typeTerm: j,
                        targetId: k,
                        targetTerm: l,
                        form: m
                    };
                    $("#" + c.divElement.id + "-listGroup").append(JST["views/developmentQueryPlugin/relsCriteria.hbs"](h)),
                    c.renumLines(),
                    $(a).find(".removeLi").unbind(),
                    $(a).find(".removeLi").disableTextSelect(),
                    $(a).find(".removeLi").click(function(a) {
                        $(a.target).closest("li").remove(),
                        c.renumLines()
                    }),
                    $("#" + c.divElement.id + "-selectedConcept").val(""),
                    $("#" + c.divElement.id + "-selectedConcept").attr("data-conceptId", ""),
                    $("#" + c.divElement.id + "-selectedType").val(""),
                    $("#" + c.divElement.id + "-selectedType").attr("data-conceptId", ""),
                    $("#" + c.divElement.id + "-selectedTarget").val(""),
                    $("#" + c.divElement.id + "-selectedTarget").attr("data-conceptId", ""),
                    $("#" + c.divElement.id + "-searchTerm").val("")
                } else
                    $("#" + c.divElement.id + "-conceptField").addClass("has-error"),
                    $("#" + c.divElement.id + "-addmsg").html("Drop a concept...")
            } else {
                var n = $("#" + c.divElement.id + "-selectedConcept").attr("data-conceptId")
                  , o = $("#" + c.divElement.id + "-selectedConcept").val();
                if (void 0 === n || "" == n || "" == o)
                    $("#" + c.divElement.id + "-conceptField").addClass("has-error"),
                    $("#" + c.divElement.id + "-addmsg").html("Drop a concept...");
                else {
                    $("#" + c.divElement.id + "-addmsg").html(""),
                    $("#" + c.divElement.id + "-conceptField").removeClass("has-error");
                    var p = [{
                        criteria: e,
                        conceptId: n,
                        term: o
                    }];
                    if ($(a).find(".addedCriteria").length) {
                        var q = $(a).find(".addedCriteria").first().attr("data-typeSelected");
                        $(a).find(".addedCriteria").each(function(a) {
                            var b = $(this).find(".andCriteriaConcept").first().attr("data-conceptId")
                              , d = $(this).find(".andCriteriaConcept").first().val()
                              , e = $(this).find(".addSelectCriteria").first().html();
                            if (!b || !d)
                                return $("#" + c.divElement.id + "-conceptField").addClass("has-error"),
                                $("#" + c.divElement.id + "-addmsg").html("Drop a concept..."),
                                !1;
                            p.forEach(function(a) {
                                if (a.criteria == e && a.conceptId == b)
                                    return $("#" + c.divElement.id + "-conceptField").addClass("has-error"),
                                    $("#" + c.divElement.id + "-addmsg").html("Criteria already added..."),
                                    !1
                            });
                            var f = {
                                criteria: e,
                                conceptId: b,
                                term: d
                            };
                            if ("Refinement" == q) {
                                if ("false" == $(this).find(".typeCritCombo").first().attr("data-type-concept-id"))
                                    return $("#" + c.divElement.id + "-addmsg").html("Select a type..."),
                                    !1;
                                f.type = {
                                    conceptId: $(this).find(".typeCritCombo").first().attr("data-type-concept-id"),
                                    term: $(this).find(".typeCritCombo").first().attr("data-type-term")
                                }
                            }
                            p.push(f)
                        })
                    }
                    if ("" == $("#" + c.divElement.id + "-addmsg").html()) {
                        $(a).find(".addedCriteria").remove(),
                        $("#" + c.divElement.id + "-addCriteriaAnd").show();
                        var h = {
                            modifier: d,
                            criterias: p
                        }
                          , r = !1;
                        if ($("#" + c.divElement.id + "-listGroup").find(".query-condition").each(function(a) {
                            if ("Exclude" == $(this).data("modifier")) {
                                $(this).before(JST["views/developmentQueryPlugin/criteria.hbs"](h));
                                var b = $("#" + c.divElement.id + "-listGroup").find(".query-condition")[a];
                                return $(b).append('<small class="text-muted pull-right glyphicon glyphicon-refresh icon-spin" style="position: relative; top: 12px;"></small>'),
                                c.execute("inferred", c.exportToConstraintGrammar(!1, !1, b), !0, function(a) {
                                    $(b).find(".glyphicon-refresh").first().remove();
                                    var c = parseInt(a);
                                    $(b).append('<small class="text-muted pull-right" style="position: relative; top: 10px;" title="This instruction involves the selection of ' + c + ' concepts">' + c + " cpts</small>")
                                }),
                                r = !0,
                                !1
                            }
                        }),
                        !r) {
                            $("#" + c.divElement.id + "-listGroup").append(JST["views/developmentQueryPlugin/criteria.hbs"](h));
                            var s = $("#" + c.divElement.id + "-listGroup").find(".query-condition")[$("#" + c.divElement.id + "-listGroup").find(".query-condition").length - 1];
                            $(s).append('<small class="text-muted pull-right glyphicon glyphicon-refresh icon-spin" style="position: relative; top: 12px;"></small>'),
                            c.execute("inferred", c.exportToConstraintGrammar(!1, !1, s), !0, function(a) {
                                $(s).find(".glyphicon-refresh").first().remove();
                                var b = parseInt(a);
                                $(s).append('<small class="text-muted pull-right" style="position: relative; top: 10px;" title="This instruction involves the selection of ' + b + ' concepts">' + b + " cpts</small>")
                            })
                        }
                        $("#" + c.divElement.id + "-listGroup").find(".criteriaDropdownOption").unbind(),
                        $("#" + c.divElement.id + "-listGroup").find(".criteriaDropdownOption").click(function(a) {
                            var b = $(a.target).closest(".constraint").attr("data-criteria")
                              , d = $(a.target).html();
                            if (b != d) {
                                $(a.target).closest(".constraint").attr("data-criteria", d),
                                $(a.target).closest("div").find("button").first().html(d + "&nbsp;");
                                var e = $(a.target).closest(".query-condition");
                                $(e).find("small").remove(),
                                $(e).append('<small class="text-muted pull-right glyphicon glyphicon-refresh icon-spin" style="position: relative; top: 12px;"></small>'),
                                c.execute("inferred", c.exportToConstraintGrammar(!1, !1, e), !0, function(a) {
                                    $(e).find("small").remove(),
                                    $(e).find(".glyphicon-refresh").first().remove();
                                    var b = parseInt(a);
                                    $(e).append('<small class="text-muted pull-right" style="position: relative; top: 10px;" title="This instruction involves the selection of ' + b + ' concepts">' + b + " cpts</small>")
                                })
                            }
                        }),
                        c.renumLines(),
                        $(a).find(".removeLi").unbind(),
                        $(a).find(".removeLi").disableTextSelect(),
                        $(a).find(".removeLi").click(function(a) {
                            $(a.target).closest("li").remove(),
                            c.renumLines()
                        }),
                        $("#" + c.divElement.id + "-selectedConcept").val(""),
                        $("#" + c.divElement.id + "-selectedConcept").attr("data-conceptId", ""),
                        $("#" + c.divElement.id + "-selectedType").val(""),
                        $("#" + c.divElement.id + "-selectedType").attr("data-conceptId", ""),
                        $("#" + c.divElement.id + "-selectedTarget").val(""),
                        $("#" + c.divElement.id + "-selectedTarget").attr("data-conceptId", ""),
                        $("#" + c.divElement.id + "-searchTerm").val("")
                    }
                }
            }
        }),
        $("#" + c.divElement.id + "-computeInferredButton2").unbind(),
        $("#" + c.divElement.id + "-computeInferredButton2").disableTextSelect(),
        $("#" + c.divElement.id + "-computeInferredButton2").click(function(a) {
            var b = $.trim($("#" + c.divElement.id + "-ExpText").val());
            $("#" + c.divElement.id + "-computeInferredButton2").addClass("disabled"),
            c.execute("inferred", b, !0),
            $("#" + c.divElement.id + "-computeInferredButton2").removeClass("disabled")
        }),
        $("#" + c.divElement.id + "-computeInferredButton").unbind(),
        $("#" + c.divElement.id + "-computeInferredButton").disableTextSelect(),
        $("#" + c.divElement.id + "-computeInferredButton").click(function(a) {
            var b = c.exportToConstraintGrammar(!1, !1);
            $("#" + c.divElement.id + "-listGroup").find('.query-condition[data-modifier="Include"]').length ? c.execute("inferred", b, !0) : ($("#" + c.divElement.id + "-outputBody").html(""),
            $("#" + c.divElement.id + "-outputBody2").html(""),
            $("#" + c.divElement.id + "-resultInfo").html("<span class='text-danger'>Add at least one include</span>"),
            $("#" + c.divElement.id + "-footer").html(""))
        }),
        $("#" + c.divElement.id + "-computeOntoserver").unbind(),
        $("#" + c.divElement.id + "-computeOntoserver").click(function(a) {
            var b = c.exportToConstraintGrammar(!1, !1);
            if ($("#" + c.divElement.id + "-listGroup").find('.query-condition[data-modifier="Include"]').length) {
                var d = "http://52.21.192.244:8080/ontoserver/resources/ontology/findConceptsByQuery?versionedId=http%3A%2F%2Fsnomed.info%2Fsct%2F32506021000036107%2Fversion%2F20151130&field=shortId&field=label&field=primitive&field=inferredAxioms&format=json&start=0&rows=100"
                  , e = "&query=Constraint("
                  , f = encodeURIComponent(b)
                  , g = d + e + f + ")";
                c.currentEx++,
                $("#" + c.divElement.id + "-resultInfo").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
                $("#" + c.divElement.id + "-outputBody").html(""),
                $("#" + c.divElement.id + "-outputBody2").html(""),
                $("#" + c.divElement.id + "-footer").html('<div class="progress progress-striped active"> <div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span>Searching</span></div></div><p id="' + c.divElement.id + '-waitingSearch-text" class="lead animated"></p>'),
                $("#" + c.divElement.id + "-waitingSearch-text").html(""),
                $("#" + c.divElement.id + "-waitingSearch-text").addClass("fadeInRight"),
                $("#" + c.divElement.id + "-waitingSearch-text").html("OntoServer is processing your instructions..."),
                $.getJSON(g, function(a) {}).done(function(a) {
                    $("#" + c.divElement.id + "-resultInfo").html("<span class='text-muted small'>Found " + a.totalResults + " concepts</span>"),
                    $("#" + c.divElement.id + "-waitingSearch-text").html(""),
                    a.totalResults > 100 ? $("#" + c.divElement.id + "-footer").html("Showing first 100 matches") : $("#" + c.divElement.id + "-footer").html("Showing all matches"),
                    $.each(a.data, function(a, b) {
                        $("#" + c.divElement.id + "-outputBody").append("<tr style='cursor: pointer;' class='conceptResult' data-module='' data-concept-id='" + b.shortId + "' data-term='" + b.label + "'><td>" + b.label + "</td><td>" + b.shortId + "</td></tr>"),
                        $("#" + c.divElement.id + "-outputBody2").append("<tr><td>" + b.label + "</td><td>" + b.shortId + "</td></tr>")
                    }),
                    $("#" + c.divElement.id + "-outputBody").find(".conceptResult").unbind(),
                    $("#" + c.divElement.id + "-outputBody").find(".conceptResult").click(function(a) {
                        channel.publish(c.divElement.id, {
                            term: $(a.target).closest("tr").attr("data-term"),
                            module: $(a.target).closest("tr").attr("data-module"),
                            conceptId: $(a.target).closest("tr").attr("data-concept-id"),
                            source: c.divElement.id
                        })
                    })
                }).fail(function(a) {})
            } else
                $("#" + c.divElement.id + "-outputBody").html(""),
                $("#" + c.divElement.id + "-outputBody2").html(""),
                $("#" + c.divElement.id + "-resultInfo").html("<span class='text-danger'>Add at least one include</span>"),
                $("#" + c.divElement.id + "-footer").html("")
        })
    }
    ,
    c.updateGrammarModal = function(a) {
        a ? ($("#home-" + c.divElement.id + "-full-syntax-button").addClass("btn-primary"),
        $("#home-" + c.divElement.id + "-full-syntax-button").removeClass("btn-default"),
        $("#home-" + c.divElement.id + "-brief-syntax-button").addClass("btn-default"),
        $("#home-" + c.divElement.id + "-brief-syntax-button").removeClass("btn-primary")) : ($("#home-" + c.divElement.id + "-full-syntax-button").removeClass("btn-primary"),
        $("#home-" + c.divElement.id + "-full-syntax-button").addClass("btn-default"),
        $("#home-" + c.divElement.id + "-brief-syntax-button").removeClass("btn-default"),
        $("#home-" + c.divElement.id + "-brief-syntax-button").addClass("btn-primary")),
        c.grammarToCopy = c.exportToConstraintGrammar(!1, a),
        $("#" + c.divElement.id + "-constraintGrammar").html(c.exportToConstraintGrammar(!0, a))
    }
    ,
    c.setUpPanel(),
    this.renumLines = function() {
        $("#" + c.divElement.id + "-listGroup").find(".query-condition").each(function(a) {
            $(this).find(".line-number").html(a + 1)
        })
    }
    ,
    this.getTotalResults = function(a) {
        null != f && f.abort(),
        c.lastRequest.skip = 0,
        c.lastRequest.limit = c.lastTotalValues + 1,
        $("#" + c.divElement.id + "-exportXls").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
        f = $.ajax({
            type: "POST",
            url: b.serverUrl.replace("snomed", "expressions/") + b.edition + "/" + b.release + "/execute/brief",
            data: c.lastRequest,
            dataType: "json",
            success: function(b) {
                f = null,
                c.allResults = b.computeResponse.matches;
                var d = "";
                c.allResults && c.allResults.length && $.each(c.allResults, function(a, b) {
                    d += "<tr><td>" + b.defaultTerm + "</td><td>" + b.conceptId + "</td></tr>"
                }),
                $("#" + c.divElement.id + "-outputBody2").html(d),
                $("#" + c.divElement.id + "-exportXls").html('Download XLS <img style="height: 23px;" src="img/excel.png">'),
                a && a()
            }
        }).always(function(a) {
            f = null
        }).fail(function() {
            alertEvent("Failed!", "error")
        })
    }
    ,
    this.getExpressionForCondition = function(a, b, c) {
        var d = ""
          , e = "";
        "self" == a.criteria ? e = c ? "self " : "" : "descendantOf" == a.criteria ? e = c ? "descendantOf " : "< " : "descendantOrSelfOf" == a.criteria ? e = c ? "descendantOrSelfOf " : "<< " : "childrenOf" == a.criteria ? e = c ? "childrenOf " : "<1 " : "ancestorOf" == a.criteria ? e = c ? "ancestorOf " : "> " : "ancestorOrSelfOf" == a.criteria ? e = c ? "ancestorOrSelfOf " : ">> " : "parentsOf" == a.criteria ? e = c ? "parentsOf " : ">1 " : "hasDescription" == a.criteria ? e = c ? "hasDescription " : "desc " : "hasRelationship" == a.criteria ? e = c ? "hasRelationship " : "rel " : "isMemberOf" == a.criteria && (e = c ? "isMemberOf " : "^ ");
        var f = "|" + a.term + "|";
        if (b && (e = "<span class='exp-operators'>" + e + "</span>",
        f = "<span class='exp-term'>" + f + "</span>"),
        a.typeId)
            if ("*" == a.typeId)
                d = " * = " + e + a.conceptId + f;
            else {
                var g = "|" + a.typeTerm + "|";
                b && (f = "<span class='exp-term'>" + g + "</span>"),
                d = a.typeId + g + " = " + e + a.conceptId + f
            }
        else
            d = e + a.conceptId + f;
        return d
    }
    ,
    this.exportToConstraintGrammar = function(a, b, d, e) {
        var f = "";
        if (0 != $("#" + c.divElement.id + "-listGroup").find(".query-condition").length || d || e) {
            var g = []
              , h = [];
            if (d) {
                var i = [];
                $(d).find(".constraint").each(function(a) {
                    var b = {
                        criteria: $(this).attr("data-criteria"),
                        typeId: $(this).attr("data-type-concept-id"),
                        typeTerm: $(this).attr("data-type-term"),
                        conceptId: $(this).attr("data-concept-id"),
                        term: $(this).attr("data-term")
                    };
                    i.push(b)
                }),
                g.push(i)
            } else {
                var j = "#" + c.divElement.id + "-listGroup";
                e && (j = e),
                $(j).find(".query-condition").each(function(a) {
                    var b = [];
                    $(this).find(".constraint").each(function(a) {
                        var c = {
                            criteria: $(this).attr("data-criteria"),
                            typeId: $(this).attr("data-type-concept-id"),
                            typeTerm: $(this).attr("data-type-term"),
                            conceptId: $(this).attr("data-concept-id"),
                            term: $(this).attr("data-term")
                        };
                        b.push(c)
                    }),
                    "Exclude" == $(this).data("modifier") ? h.push(b) : g.push(b)
                })
            }
            var k = function(a) {
                var b = !1;
                return a.length > 1 && a[1].typeId && (b = !0),
                b
            };
            $.each(g, function(d, e) {
                d > 0 && (f += " OR "),
                (e.length > 1 || k(e)) && (f += " ("),
                k(e) ? $.each(e, function(d, g) {
                    f += c.getExpressionForCondition(g, a, b),
                    0 == d ? f += " : " : d < e.length - 1 && (f += " , "),
                    a && d < e.length - 1 && (f += "<br>")
                }) : $.each(e, function(d, g) {
                    d > 0 && (f += " AND "),
                    f += c.getExpressionForCondition(g, a, b),
                    a && d < e.length - 1 && (f += "<br>")
                }),
                (e.length > 1 || k(e)) && (f += ") "),
                a && d < g.length - 1 && (f += "<br>")
            }),
            h.length > 0 && g.length > 1 ? (f = "(" + f,
            f += ") MINUS ",
            a && (f += "<br>")) : h.length > 0 && (f += " MINUS ",
            a && (f += "<br>")),
            h.length > 1 && (f += "("),
            $.each(h, function(d, e) {
                d > 0 && (f += " OR "),
                (e.length > 1 || k(e)) && (f += " ("),
                k(e) ? $.each(e, function(d, g) {
                    f += c.getExpressionForCondition(g, a, b),
                    0 == d ? f += " : " : d < e.length - 1 && (f += " , "),
                    a && d < e.length - 1 && (f += "<br>")
                }) : $.each(e, function(d, g) {
                    d > 0 && (f += " AND "),
                    f += c.getExpressionForCondition(g, a, b),
                    a && d < e.length - 1 && (f += "<br>")
                }),
                (e.length > 1 || k(e)) && (f += ") "),
                a && d < h.length - 1 && (f += "<br>")
            }),
            h.length > 1 && (f += ")")
        } else
            ;return f = f.trim()
    }
    ,
    this.execute = function(a, f, h, i) {
        c.currentEx++;
        var j = c.currentEx;
        i ? (d = 1,
        e = 0) : ($("#" + c.divElement.id + "-footer").html('<div class="progress progress-striped active"> <div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span>Searching</span></div></div><p id="' + c.divElement.id + '-waitingSearch-text" class="lead animated"></p>'),
        $("#" + c.divElement.id + "-waitingSearch-text").html(""),
        $("#" + c.divElement.id + "-waitingSearch-text").addClass("fadeInRight"),
        $("#" + c.divElement.id + "-waitingSearch-text").html("The server is processing your instructions..."),
        setTimeout(function() {
            $("#" + c.divElement.id + "-waitingSearch-text").removeClass("fadeInRight")
        }, 600),
        setTimeout(function() {
            null != g && j == c.currentEx && ($("#" + c.divElement.id + "-waitingSearch-text").addClass("fadeOutLeft"),
            setTimeout(function() {
                $("#" + c.divElement.id + "-waitingSearch-text").removeClass("fadeOutLeft"),
                $("#" + c.divElement.id + "-waitingSearch-text").html(""),
                $("#" + c.divElement.id + "-waitingSearch-text").addClass("fadeInRight"),
                $("#" + c.divElement.id + "-waitingSearch-text").html("The server is still processing your instructions..."),
                setTimeout(function() {
                    $("#" + c.divElement.id + "-waitingSearch-text").removeClass("fadeInRight")
                }, 600)
            }, 600))
        }, 15e3),
        setTimeout(function() {
            null != g && j == c.currentEx && ($("#" + c.divElement.id + "-waitingSearch-text").addClass("fadeOutLeft"),
            setTimeout(function() {
                $("#" + c.divElement.id + "-waitingSearch-text").removeClass("fadeOutLeft"),
                $("#" + c.divElement.id + "-waitingSearch-text").html(""),
                $("#" + c.divElement.id + "-waitingSearch-text").addClass("fadeInRight"),
                $("#" + c.divElement.id + "-waitingSearch-text").html("This seems to be a complex set of instructions, still processing..."),
                setTimeout(function() {
                    $("#" + c.divElement.id + "-waitingSearch-text").removeClass("fadeInRight")
                }, 600)
            }, 600))
        }, 3e4),
        setTimeout(function() {
            null != g && j == c.currentEx && ($("#" + c.divElement.id + "-waitingSearch-text").addClass("fadeOutLeft"),
            setTimeout(function() {
                $("#" + c.divElement.id + "-waitingSearch-text").removeClass("fadeOutLeft"),
                $("#" + c.divElement.id + "-waitingSearch-text").html(""),
                $("#" + c.divElement.id + "-waitingSearch-text").addClass("fadeInRight"),
                $("#" + c.divElement.id + "-waitingSearch-text").html("The server is processing a complex set of instructions. This action might not be supported in a public server. Some times instructions can be simplified by specifying conditions using concepts closer in the hierarchy to the intended results, avoiding unnecessary selections of large portions of the terminology."),
                setTimeout(function() {
                    $("#" + c.divElement.id + "-waitingSearch-text").removeClass("fadeInRight")
                }, 600)
            }, 600))
        }, 45e3),
        $("#" + c.divElement.id + "-resultInfo").html("<i class='glyphicon glyphicon-refresh icon-spin'></i>"),
        h && ($("#" + c.divElement.id + "-outputBody").html(""),
        $("#" + c.divElement.id + "-outputBody2").html(""),
        d = 100,
        e = 0));
        var k = {
            expression: f,
            limit: d,
            skip: e,
            form: a
        };
        console.log("normal " + f);
        var l = f.replace(/\|.*?\|/gimu, "")
          , m = l.replace(/\n/gimu, "");
        console.log("stripped " + m),
        c.lastRequest = k,
        page = e / d;
        var n;
        n = "MAIN" == b.queryBranch ? b.queryServerUrl + "/" + b.queryBranch + "/concepts?module=900000000000207008&ecl=" + m + "&offset=" + e + "&limit=" + d + "&expand=fsn()" : b.queryBranch.includes("SNOMEDCT-US") ? b.queryServerUrl + "/" + b.queryBranch + "/concepts?&ecl=" + m + "&offset=" + e + "&limit=" + d + "&expand=fsn()" : b.queryServerUrl + "/" + b.queryBranch + "/concepts?ecl=" + m + "&page=" + page + "&size=" + d,
        console.log("queryURL " + n),
        null == g || i || g.abort();
        var o = $.ajax({
            type: "GET",
            url: n,
            success: function(b) {
                k = b,
                i ? i(k.total) : ($("#" + c.divElement.id + "-exportResults").removeClass("disabled"),
                k.performanceCutOff ? k.totalElements ? $("#" + c.divElement.id + "-resultInfo").html("<span class='text-muted small'>Found " + k.totalElements + " concepts. <span class='text-danger'>This query cannot be completed in real-time, please schedule a Cloud executions. Results below are incomplete and some conditions were not tested. </span></span>") : $("#" + c.divElement.id + "-resultInfo").html("<span class='text-muted small'>Found " + k.total + " concepts. <span class='text-danger'>This query cannot be completed in real-time, please schedule a Cloud executions. Results below are incomplete and some conditions were not tested. </span></span>") : k.totalElements ? $("#" + c.divElement.id + "-resultInfo").html("<span class='text-muted small'>Found " + k.totalElements + " concepts</span>") : $("#" + c.divElement.id + "-resultInfo").html("<span class='text-muted small'>Found " + k.total + " concepts</span>"),
                $.each(k.items, function(a, b) {
                    $("#" + c.divElement.id + "-outputBody").append("<tr style='cursor: pointer;' class='conceptResult' data-module='" + b.moduleId + "' data-concept-id='" + b.id + "' data-term='" + b.fsn.term + "'><td>" + b.fsn.term + "</td><td>" + b.id + "</td></tr>"),
                    $("#" + c.divElement.id + "-outputBody2").append("<tr><td>" + b.fsn.term + "</td><td>" + b.id + "</td></tr>")
                }),
                $("#" + c.divElement.id + "-outputBody").find(".conceptResult").unbind(),
                $("#" + c.divElement.id + "-outputBody").find(".conceptResult").click(function(a) {
                    channel.publish(c.divElement.id, {
                        term: $(a.target).closest("tr").attr("data-term"),
                        module: $(a.target).closest("tr").attr("data-module"),
                        conceptId: $(a.target).closest("tr").attr("data-concept-id"),
                        source: c.divElement.id,
                        showConcept: !0
                    })
                }),
                k.totalElements ? (c.lastTotalValues = k.totalElements,
                d + e < k.totalElements ? $("#" + c.divElement.id + "-footer").html("<span id='" + c.divElement.id + "-more'>Show more (viewing " + (d + page * d) + " of " + k.totalElements + " total)</span>") : $("#" + c.divElement.id + "-footer").html("Showing all " + k.totalElements + " matches")) : (c.lastTotalValues = k.total,
                d + e < k.total ? $("#" + c.divElement.id + "-footer").html("<span id='" + c.divElement.id + "-more'>Show more (viewing " + (d + e) + " of " + k.total + " total)</span>") : $("#" + c.divElement.id + "-footer").html("Showing all " + k.total + " matches")),
                $("#" + c.divElement.id + "-more").unbind(),
                $("#" + c.divElement.id + "-more").click(function(b) {
                    e = page * d + 100,
                    c.execute(a, f, !1)
                }))
            }
        }).done(function(a) {
            o = null
        }).fail(function(a) {
            if (a && a.responseJSON && a.responseJSON.computeResponse && a.responseJSON.computeResponse.message)
                $("#" + c.divElement.id + "-outputBody").html(""),
                $("#" + c.divElement.id + "-outputBody2").html(""),
                $("#" + c.divElement.id + "-footer").html(""),
                $("#" + c.divElement.id + "-resultInfo").html("<span class='text-danger'>" + a.responseJSON.computeResponse.message + "</span>");
            else {
                var b = o.statusText;
                "abort" != b && (0 == o.status && (b = "timeout"),
                o = null,
                "timeout" === b ? i ? i("Error") : ($("#" + c.divElement.id + "-footer").html("<p class='lead'>Instruction set exceeds maximum allowed time for computation. Some times instructions can be simplified by specifying conditions using concepts closer in the hierarchy to the intended results, avoiding unnecessary selections of large portions of the terminology.</p>"),
                $("#" + c.divElement.id + "-resultInfo").html("This query cannot be completed in real-time.")) : i ? i("Error") : ($("#" + c.divElement.id + "-syntax-result").html('<span class="label label-danger">ERROR</span>'),
                $("#" + c.divElement.id + "-results").html("Error...")))
            }
        });
        i || (g = o)
    }
}
function removeHighlight() {
    $(document).find(".drop-highlighted").removeClass("drop-highlighted")
}
function allowDrop(a) {
    a.preventDefault();
    var b;
    b = "true" == $(a.target).attr("data-droppable") ? $(a.target) : $(a.target).closest("div"),
    $(b).addClass("drop-highlighted")
}
function dropField(a) {
    var b = a.dataTransfer.getData("Text");
    if ("javascript:void(0);" != b) {
        for (var c = 0; "|" != b.charAt(c) && c < b.length; )
            c++;
        var d = a.dataTransfer.getData("concept-id");
        void 0 === d && c < b.length && (d = b.substr(0, c));
        var e = a.dataTransfer.getData("term");
        void 0 === e && (e = b.substr(c)),
        $(a.target).val(e),
        $(a.target).attr("data-conceptId", d)
    }
}
function iconToDrag(a) {
    var b = document.createElement("canvas")
      , c = b.getContext("2d");
    b.width = 300,
    b.height = 300,
    c.font = "15px sans-serif",
    c.strokeText(a, 10, 20);
    var d = document.createElement("img");
    return d.src = b.toDataURL(),
    d
}
function drag(a, b) {
    var c = ""
      , d = ""
      , e = "";
    $.each(a.target.attributes, function() {
        "data" == this.name.substr(0, 4) && (a.dataTransfer.setData(this.name.substr(5), this.value),
        "concept-id" == this.name.substr(5) && (e = this.value),
        "term" == this.name.substr(5) && (d = this.value))
    }),
    icon = iconToDrag(d),
    navigator.userAgent.indexOf("Chrome") > -1 && (icon = iconToDrag(d),
    a.dataTransfer.setDragImage(icon, 0, 0)),
    a.dataTransfer.setDragImage(icon, 0, 0),
    c = e + "|" + d,
    a.dataTransfer.setData("Text", c),
    a.dataTransfer.setData("divElementId", b)
}
function dropS(a) {
    $(document).find(".drop-highlighted").removeClass("drop-highlighted"),
    a.preventDefault();
    var b = a.dataTransfer.getData("Text");
    if ("javascript:void(0);" != b) {
        for (var c = 0; "|" != b.charAt(c) && c < b.length; )
            c++;
        var d = a.dataTransfer.getData("concept-id");
        void 0 === d && c < b.length && (d = b.substr(0, c));
        var e = a.dataTransfer.getData("term");
        void 0 === e && (e = b.substr(c)),
        $(a.target).val(e);
        var f = $(a.target).attr("id").replace("-searchBox", "");
        $.each(componentsRegistry, function(a, b) {
            b.divElement.id == f && b.search(e, 0, 100, !1)
        })
    }
}
function dropC(a, b) {
    $(document).find(".drop-highlighted").removeClass("drop-highlighted"),
    a.preventDefault();
    var c = a.dataTransfer.getData("Text");
    if ("javascript:void(0);" != c) {
        for (var d = 0; "|" != c.charAt(d) && d < c.length; )
            d++;
        var e = a.dataTransfer.getData("concept-id");
        void 0 === e && d < c.length && (e = c.substr(0, d));
        var f = a.dataTransfer.getData("term");
        void 0 === f && (f = c.substr(d));
        var g, h = b;
        $.each(componentsRegistry, function(a, b) {
            b.divElement.id == h && (g = b)
        }),
        e && g.conceptId != e && (g.conceptId = e,
        g.updateCanvas(),
        channel.publish(g.divElement.id, {
            term: f,
            conceptId: g.conceptId,
            source: g.divElement.id
        }))
    }
}
function dropF(a, b) {
    var c = a.dataTransfer.getData("Text");
    if ("javascript:void(0);" != c) {
        for (var d = 0; "|" != c.charAt(d) && d < c.length; )
            d++;
        var e = a.dataTransfer.getData("concept-id");
        void 0 === e && d < c.length && (e = c.substr(0, d));
        var f = a.dataTransfer.getData("term")
          , g = a.dataTransfer.getData("module");
        void 0 === f && (f = c.substr(d));
        var h = stringToArray(localStorage.getItem("favs"))
          , i = !1;
        $.each(h, function(a, b) {
            b == e && (i = !0)
        });
        var j = {
            defaultTerm: f,
            conceptId: e,
            module: g
        };
        i || (h.push(e),
        localStorage.setItem("favs", h),
        localStorage.setItem("conceptId:" + e, JSON.stringify(j))),
        channel.publish("favsAction")
    }
}
function dropT(a, b) {
    $(document).find(".drop-highlighted").removeClass("drop-highlighted"),
    a.preventDefault();
    var c = a.dataTransfer.getData("Text");
    if ("javascript:void(0);" != c) {
        for (var d = 0; "|" != c.charAt(d) && d < c.length; )
            d++;
        var e, f = b, g = a.dataTransfer.getData("concept-id");
        void 0 === g && d < c.length && (g = c.substr(0, d));
        var h = a.dataTransfer.getData("term");
        void 0 === h && (h = c.substr(d));
        var i = a.dataTransfer.getData("def-status")
          , j = a.dataTransfer.getData("module");
        if ($.each(componentsRegistry, function(a, b) {
            b.divElement.id == f && (e = b)
        }),
        g && ("undefined" == e.options.selectedView && (e.options.selectedView = "inferred"),
        void 0 !== g)) {
            var k = new Date
              , l = k.getTime();
            e.history.push({
                term: h,
                conceptId: g,
                time: l
            }),
            e.setToConcept(g, h, i, j),
            channel.publish(e.divElement.id, {
                term: h,
                conceptId: g,
                source: e.divElement.id
            })
        }
    }
}
function stringToArray(a) {
    if ("string" == typeof a) {
        for (var b, c = 0, d = []; c < a.length; ) {
            for (b = ""; "," != a.substr(c, 1) && c < a.length; )
                b += a.substr(c, 1),
                c++;
            d.push(b),
            c++
        }
        return d
    }
    return !1
}
function alertEvent(a, b) {
    var c = (new Date).getTime();
    c - lastEventTime < 10 && a.toLowerCase().includes("copied") || $.notify(a, b),
    lastEventTime = c
}
this.JST = this.JST || {},
this.JST["views/conceptDetailsPlugin/main.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += "<div style='margin: 5px; height:98%; overflow:auto;' class='panel panel-default'>\n    <div class='panel-heading' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelHeading' ondrop=\"dropC(event, '",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '\')" ondragleave="removeHighlight();" ondragover="allowDrop(event)">\n        <button id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-ownMarker' class='btn btn-link btn-lg' style='padding: 2px; position: absolute;top: 1px;left: 0px;'><i class='glyphicon glyphicon-book'></i></button>\n        <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-subscribersMarker' class='btn btn-link btn-lg' style='padding:2px;position: absolute;top: 1px;'><i class='glyphicon glyphicon-bookmark'></i></button>\n        <div class='row'>\n            <div class='col-md-8' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelTitle'>&nbsp&nbsp&nbsp<strong><span class='i18n' data-i18n-id='i18n_concept_details'>Concept Details</span></strong></div>\n            <div class='col-md-4 text-right'>\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-linkerButton\' draggable = "true" ondragstart = "drag(event, \'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "')\" class='btn btn-link linker-button' data-panel='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "' style='padding:2px'><i class='glyphicon glyphicon-link'></i></button>--\x3e\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-historyButton' class='btn btn-link history-button' style='padding:2px'><i class='glyphicon glyphicon-time'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configButton' class='btn btn-link' data-toggle='modal' style='padding:2px' data-target='#",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configModal'><i class='glyphicon glyphicon-cog'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-collapseButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-small'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-expandButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-full'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-closeButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-remove'></i></button>\n            </div>\n        </div>\n    </div>\n    <div class='panel-body' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-panelBody\'>\n        \x3c!-- Nav tabs --\x3e\n        <ul class="nav nav-tabs" id="details-tabs-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n            <li class="active"><a href="#home-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-toggle="tab" style="padding-top: 3px; padding-bottom:3px;"><span class="i18n" data-i18n-id="i18n_summary">Summary</span></a></li>\n            <li><a href="#details-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-toggle="tab" style="padding-top: 3px; padding-bottom:3px;"><span class="i18n" data-i18n-id="i18n_details">Details</span></a></li>\n            <li id="diagram-tab"><a href="#diagram-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-toggle="tab" style="padding-top: 3px; padding-bottom:3px;" id="diagram-tab-link-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '"><span class="i18n" data-i18n-id="i18n_diagram">Diagram</span></a></li>\n            <li id="expression-tab"><a href="#expression-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-toggle="tab" style="padding-top: 3px; padding-bottom:3px;" id="expression-tab-link-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">Expression</a></li>\n            <li><a href="#refsets-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-toggle="tab" style="padding-top: 3px; padding-bottom:3px;"><span class="i18n" data-i18n-id="i18n_refsets">Refsets</span></a></li>\n            <li id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-members-tab"><a href="#members-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-toggle="tab" style="padding-top: 3px; padding-bottom:3px;"><span class="i18n" data-i18n-id="i18n_members">Members</span></a></li>\n            <li id="references-tab"><a id="references-tab-link-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" href="#references-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-toggle="tab" style="padding-top: 3px; padding-bottom:3px;"><span class="i18n" data-i18n-id="i18n_references">References</span></a></li>\n            <li id="product-details-tab" style="display: none;"><a id="product-details-tab-link-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" href="#product-details-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-toggle="tab" style="padding-top: 3px; padding-bottom:3px;"><span class="i18n" data-i18n-id="i18n_vcd">CD</span></a></li>\n        </ul>\n        \x3c!-- Tab panes --\x3e\n        <div class="tab-content" id="details-tab-content-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n            <div class="tab-pane fade in active" id="home-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" style="padding: 5px;">\n                <div class="pull-right">\n                    <div class="btn-group" role="group" aria-label="...">\n                        <button type="button" class="btn btn-default" id="home-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-stated-button">Stated</button>\n                        <button type="button" class="btn btn-default" id="home-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-inferred-button">Inferred</button>\n                    </div>\n                    <div><span class="text-muted text-center" id="home-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-wf-status-label"></span></div>\n                </div>\n                <div style="max-height: 300px; overflow: auto; margin-left: 0%; margin-bottom: 10px; margin-top: 10px; width: 80%;border: 2px solid #357ebd; border-radius: 4px; padding: 5px;">\n                    <div class="panel-heading">\n                        <h4><span data-i18n-id="i18n_parents" class="i18n">Parents</span></h4>\n                    </div>\n                    <div class="panel-body" id="home-parents-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n                        <span data-i18n-id="i18n_no_parents" class="i18n">No parents</span>\n                    </div>\n                </div>\n                <div class="row" style="overflow: auto; max-height: 30%;">\n                    <div class="col-md-offset-1 col-md-4" style="color: #ffffff;background-color: #1e90ff;display: inline-block; border: 2px solid #357ebd; border-radius: 4px; padding: 5px;" id="home-attributes-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">Attributes</div>\n                    <div class="col-md-4" style="background-color: rgba(30, 144, 255, 0.17); display: inline-block; min-height: 100%; margin-left: 10px; border: 2px solid #357ebd; border-radius: 4px; padding: 5px;" id="home-roles-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">Relationships</div>\n                </div>\n                <div style="max-height: 300px; overflow: auto; margin-left: 0%; margin-bottom: 10px; margin-top: 10px; width: 80%;border: 2px solid #357ebd; border-radius: 4px; padding: 5px;" id="home-children-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n                    <div class="panel-heading">\n                        <h4><span data-i18n-id="i18n_children" class="i18n">Children</span>&nbsp;<span id="home-children-cant-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '"></span></h4>\n                    </div>\n                    <div class="panel-body" id="home-children-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-body"></div>\n                </div>\n                <div><span class="text-muted pull-right" id="footer-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '"></span></div>\n            </div>\n            <div class="tab-pane fade" id="details-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "\">\n                <div id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-attributes-panel' class='panel panel-default'>\n                </div>\n                <div id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-descriptions-panel' class='panel panel-default'>\n                </div>\n                <div id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-rels-panel' class='panel panel-default'>\n                </div>\n                \x3c!--<div id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-children-panel' class='panel panel-default' style='height:100px;overflow:auto;margin-bottom: 15px;'>--\x3e\n                \x3c!--</div>--\x3e\n            </div>\n            <div class=\"tab-pane fade\" id=\"diagram-",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n                <div class="row" style="margin-right: 20px"><span class="pull-right text-muted" id="home-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-diagram-viewLabel"></span></div>\n                <div id="diagram-canvas-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '"></div>\n            </div>\n            <div class="tab-pane fade" id="expression-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n                <div class="row" style="margin-right: 20px"><span class="pull-right text-muted" id="home-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-expression-viewLabel"></span></div>\n                <div id="expression-canvas-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '"></div>\n            </div>\n            <div class="tab-pane fade" id="refsets-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n            </div>\n            <div class="tab-pane fade" id="members-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n                \x3c!--<div class="pull-right" style="padding: 5px">--\x3e\n                    \x3c!--<button id="members-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-sort" class="btn btn-default">Sort results</button>--\x3e\n                    \x3c!--<span class="text-muted">This operation may time-out for large refsets</span>--\x3e\n                \x3c!--</div>--\x3e\n                \x3c!--<br>--\x3e\n                <table id="members-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-resultsTable" class="table table-hover table-bordered">\n                </table>\n                \x3c!--<button id="members-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-normal" class="btn btn-default">100 first members</button>--\x3e\n            </div>\n            <div class="tab-pane fade" id="references-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '">\n                <div class="panel-group" id="references-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-accordion">\n\n                </div>\n                \x3c!--<br>--\x3e\n                \x3c!--<span class="text-muted" style="padding: 5px;" id="references-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-total"></span>--\x3e\n                \x3c!--<table id="references-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-resultsTable" class="table table-hover table-bordered">--\x3e\n                \x3c!--</table>--\x3e\n            </div>\n            <div class="tab-pane fade" id="product-details-',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "\">\n            </div>\n        </div>\n    </div>\n</div>\n<div class='modal fade' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configModal'>\n    <div class='modal-dialog'>\n        <div class='modal-content'>\n            <div class='modal-header'>\n                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>\n                <h4 class='modal-title'><span class='i18n' data-i18n-id='i18n_options'>Options</span> (",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + ")</h4>\n            </div>\n            <div class='modal-body' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-modal-body'>\n                <p></p>\n            </div>\n            <div class='modal-footer'>\n                <button type='button' class='btn btn-danger' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_cancel'>Cancel</span></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-apply-button' type='button' class='btn btn-success' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_apply_changes'>Apply changes</span></button>\n            </div>\n        </div>\n    </div>\n</div>\n        "
}),
this.JST["views/conceptDetailsPlugin/options.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-displaySynonymsOption" checked> <span class="i18n" data-i18n-id="i18n_display_synonyms2">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_display_synonyms2", "Display Synonyms along with FSN and preferred terms", f) : F.call(a, "i18n", "i18n_display_synonyms2", "Display Synonyms along with FSN and preferred terms", f))) + "</span>\n                "
    }
    function g(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-displaySynonymsOption"> <span class="i18n" data-i18n-id="i18n_display_synonyms2">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_display_synonyms2", "Display Synonyms along with FSN and preferred terms", f) : F.call(a, "i18n", "i18n_display_synonyms2", "Display Synonyms along with FSN and preferred terms", f))) + "</span>\n                "
    }
    function h(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-displayIdsOption" checked> <span class="i18n" data-i18n-id="i18n_display_ids">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_display_ids", "Display Description Ids", f) : F.call(a, "i18n", "i18n_display_ids", "Display Description Ids", f))) + "</span>\n                "
    }
    function i(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-displayIdsOption"> <span class="i18n" data-i18n-id="i18n_display_ids">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_display_ids", "Display Description Ids", f) : F.call(a, "i18n", "i18n_display_ids", "Display Description Ids", f))) + "</span>\n                "
    }
    function j(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-displayInactiveDescriptionsOption" checked> <span class="i18n" data-i18n-id="i18n_display_inactive_descriptions">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_display_inactive_descriptions", "Display inactive descriptions", f) : F.call(a, "i18n", "i18n_display_inactive_descriptions", "Display inactive descriptions", f))) + "</span>\n                "
    }
    function k(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-displayInactiveDescriptionsOption"> <span class="i18n" data-i18n-id="i18n_display_inactive_descriptions">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_display_inactive_descriptions", "Display inactive descriptions", f) : F.call(a, "i18n", "i18n_display_inactive_descriptions", "Display inactive descriptions", f))) + "</span>\n                "
    }
    function l(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-hideNotAcceptableOption" checked> <span class="i18n" data-i18n-id="i18n_hide_not_acceptable">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_hide_not_acceptable", "Hide descriptions with no acceptability", f) : F.call(a, "i18n", "i18n_hide_not_acceptable", "Hide descriptions with no acceptability", f))) + "</span>\n                "
    }
    function m(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-hideNotAcceptableOption"> <span class="i18n" data-i18n-id="i18n_hide_not_acceptable">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_hide_not_acceptable", "Hide descriptions with no acceptability", f) : F.call(a, "i18n", "i18n_hide_not_acceptable", "Hide descriptions with no acceptability", f))) + "</span>\n                "
    }
    function n(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-diagrammingMarkupEnabledOption" checked> <span class="i18n" data-i18n-id="i18n_diagramming_markup_enabled">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_diagramming_markup_enabled", "Diagramming Guideline colors enabled", f) : F.call(a, "i18n", "i18n_diagramming_markup_enabled", "Diagramming Guideline colors enabled", f))) + "</span>\n                "
    }
    function o(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <input type="checkbox" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === D ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-diagrammingMarkupEnabledOption"> <span class="i18n" data-i18n-id="i18n_diagramming_markup_enabled">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_diagramming_markup_enabled", "Diagramming Guideline colors enabled", f) : F.call(a, "i18n", "i18n_diagramming_markup_enabled", "Diagramming Guideline colors enabled", f))) + "</span>\n                "
    }
    function p(a, b) {
        return "checked"
    }
    function q(a, b) {
        return '\n                <option value="stated" selected>Stated</option>\n            '
    }
    function r(a, b) {
        return '\n                <option value="stated">Stated</option>\n            '
    }
    function s(a, b) {
        return '\n                <option value="inferred" selected>Inferred</option>\n            '
    }
    function t(a, b) {
        return '\n                <option value="inferred">Inferred</option>\n            '
    }
    function u(a, b) {
        return '\n                <option value="all" selected>All</option>\n            '
    }
    function v(a, b) {
        return '\n                <option value="all">All</option>\n            '
    }
    function w(a, b, d) {
        var e, f = "";
        return f += "\n            ",
        e = c.each.call(a, (e = a && a.options,
        e = null == e || !1 === e ? e : e.manifest,
        null == e || !1 === e ? e : e.languageRefsets), {
            hash: {},
            inverse: G.noop,
            fn: G.programWithDepth(36, x, b, d),
            data: b
        }),
        (e || 0 === e) && (f += e),
        f += "\n        "
    }
    function x(a, b, d) {
        var e, f, g, h = "";
        return h += '\n                <div class="checkbox">\n                    <label>\n                        <input class="langOption" type="checkbox" value="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === D ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += E(e) + '" ',
        f = c.ifIn || a && a.ifIn,
        g = {
            hash: {},
            inverse: G.noop,
            fn: G.program(21, p, b),
            data: b
        },
        e = f ? f.call(a, a && a.conceptId, (e = d && d.options,
        null == e || !1 === e ? e : e.langRefset), g) : F.call(a, "ifIn", a && a.conceptId, (e = d && d.options,
        null == e || !1 === e ? e : e.langRefset), g),
        (e || 0 === e) && (h += e),
        h += "> ",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === D ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += E(e) + "\n                    </label>\n                </div>\n            "
    }
    function y(a, b, d) {
        var e, f, g = "";
        return g += "--\x3e\n                    \x3c!--<tr>--\x3e\n                        \x3c!--<td>",
        (f = c.id) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.id,
        e = typeof f === D ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '</td>--\x3e\n                        \x3c!--<td>--\x3e\n                            \x3c!--<div class="checkbox">--\x3e\n                                \x3c!--<label>--\x3e\n                                    \x3c!--<input type="checkbox" id="' + E((e = d && d.divElementId,
        typeof e === D ? e.apply(a) : e)) + "-subscribeTo-",
        (f = c.id) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.id,
        e = typeof f === D ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" ',
        e = c.if.call(a, a && a.subscribed, {
            hash: {},
            inverse: G.noop,
            fn: G.program(21, p, b),
            data: b
        }),
        (e || 0 === e) && (g += e),
        g += '>--\x3e\n                                \x3c!--</label>--\x3e\n                            \x3c!--</div>--\x3e\n                        \x3c!--</td>--\x3e\n                        \x3c!--<td>--\x3e\n                            \x3c!--<div class="checkbox">--\x3e\n                                \x3c!--<label>--\x3e\n                                    \x3c!--<input type="checkbox" id="' + E((e = d && d.divElementId,
        typeof e === D ? e.apply(a) : e)) + "-subscriptor-",
        (f = c.id) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.id,
        e = typeof f === D ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" ',
        e = c.if.call(a, a && a.subscriptor, {
            hash: {},
            inverse: G.noop,
            fn: G.program(21, p, b),
            data: b
        }),
        (e || 0 === e) && (g += e),
        g += ">--\x3e\n                                \x3c!--</label>--\x3e\n                            \x3c!--</div>--\x3e\n                        \x3c!--</td>--\x3e\n                    \x3c!--</tr>--\x3e\n                \x3c!--"
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var z, A, B, C = "", D = "function", E = this.escapeExpression, F = c.helperMissing, G = this;
    return C += '<form role="form" id="',
    (A = c.divElementId) ? z = A.call(b, {
        hash: {},
        data: e
    }) : (A = b && b.divElementId,
    z = typeof A === D ? A.call(b, {
        hash: {},
        data: e
    }) : A),
    C += E(z) + '-options-form">\n    <div class="form-group">\n        <div class="checkbox">\n            <label>\n                ',
    z = c.if.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.displaySynonyms), {
        hash: {},
        inverse: G.program(3, g, e),
        fn: G.program(1, f, e),
        data: e
    }),
    (z || 0 === z) && (C += z),
    C += '\n            </label>\n        </div>\n        <div class="checkbox">\n            <label>\n                ',
    z = c.if.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.showIds), {
        hash: {},
        inverse: G.program(7, i, e),
        fn: G.program(5, h, e),
        data: e
    }),
    (z || 0 === z) && (C += z),
    C += '\n            </label>\n        </div>\n        <div class="checkbox">\n            <label>\n                ',
    z = c.if.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.displayInactiveDescriptions), {
        hash: {},
        inverse: G.program(11, k, e),
        fn: G.program(9, j, e),
        data: e
    }),
    (z || 0 === z) && (C += z),
    C += '\n            </label>\n        </div>\n        <div class="checkbox">\n            <label>\n                ',
    z = c.if.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.hideNotAcceptable), {
        hash: {},
        inverse: G.program(15, m, e),
        fn: G.program(13, l, e),
        data: e
    }),
    (z || 0 === z) && (C += z),
    C += '\n            </label>\n        </div>\n        <div class="checkbox">\n            <label>\n                ',
    z = c.if.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.diagrammingMarkupEnabled), {
        hash: {},
        inverse: G.program(19, o, e),
        fn: G.program(17, n, e),
        data: e
    }),
    (z || 0 === z) && (C += z),
    C += '\n            </label>\n        </div>\n        <div class="checkbox">\n            <label>\n                <input type="checkbox" id="',
    (A = c.divElementId) ? z = A.call(b, {
        hash: {},
        data: e
    }) : (A = b && b.divElementId,
    z = typeof A === D ? A.call(b, {
        hash: {},
        data: e
    }) : A),
    C += E(z) + '-displayChildren" ',
    z = c.if.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.displayChildren), {
        hash: {},
        inverse: G.noop,
        fn: G.program(21, p, e),
        data: e
    }),
    (z || 0 === z) && (C += z),
    C += '> <span class="i18n" data-i18n-id="i18n_display_children">' + E((A = c.i18n || b && b.i18n,
    B = {
        hash: {},
        data: e
    },
    A ? A.call(b, "i18n_display_children", "Display All Children", B) : F.call(b, "i18n", "i18n_display_children", "Display All Children", B))) + '</span>\n            </label>\n        </div>\n    </div>\n    <div class="form-group">\n        <label for="selectedRelsView"><span class="i18n" data-i18n-id="i18n_rels_view">' + E((A = c.i18n || b && b.i18n,
    B = {
        hash: {},
        data: e
    },
    A ? A.call(b, "i18n_rels_view", "Relationships View", B) : F.call(b, "i18n", "i18n_rels_view", "Relationships View", B))) + '</span></label>\n        <select class="form-control" id="',
    (A = c.divElementId) ? z = A.call(b, {
        hash: {},
        data: e
    }) : (A = b && b.divElementId,
    z = typeof A === D ? A.call(b, {
        hash: {},
        data: e
    }) : A),
    C += E(z) + '-relsViewOption">\n            ',
    A = c.if_eq || b && b.if_eq,
    B = {
        hash: {},
        inverse: G.program(25, r, e),
        fn: G.program(23, q, e),
        data: e
    },
    z = A ? A.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.selectedView), "stated", B) : F.call(b, "if_eq", (z = b && b.options,
    null == z || !1 === z ? z : z.selectedView), "stated", B),
    (z || 0 === z) && (C += z),
    C += "\n            ",
    A = c.if_eq || b && b.if_eq,
    B = {
        hash: {},
        inverse: G.program(29, t, e),
        fn: G.program(27, s, e),
        data: e
    },
    z = A ? A.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.selectedView), "inferred", B) : F.call(b, "if_eq", (z = b && b.options,
    null == z || !1 === z ? z : z.selectedView), "inferred", B),
    (z || 0 === z) && (C += z),
    C += "\n            ",
    A = c.if_eq || b && b.if_eq,
    B = {
        hash: {},
        inverse: G.program(33, v, e),
        fn: G.program(31, u, e),
        data: e
    },
    z = A ? A.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.selectedView), "all", B) : F.call(b, "if_eq", (z = b && b.options,
    null == z || !1 === z ? z : z.selectedView), "all", B),
    (z || 0 === z) && (C += z),
    C += '\n        </select>\n    </div>\n    <div class="form-group">\n        <label><span class="i18n" data-i18n-id="i18n_language_refset">' + E((A = c.i18n || b && b.i18n,
    B = {
        hash: {},
        data: e
    },
    A ? A.call(b, "i18n_language_refset", "Language Refset", B) : F.call(b, "i18n", "i18n_language_refset", "Language Refset", B))) + "</span></label>\n\n        ",
    z = c.if.call(b, (z = b && b.options,
    z = null == z || !1 === z ? z : z.manifest,
    null == z || !1 === z ? z : z.languageRefsets), {
        hash: {},
        inverse: G.noop,
        fn: G.programWithDepth(35, w, e, b),
        data: e
    }),
    (z || 0 === z) && (C += z),
    C += "\n    </div>\n    \x3c!--<div class=\"form-group\">--\x3e\n        \x3c!--<table class='table table-bordered table-hover'>--\x3e\n            \x3c!--<thead>--\x3e\n                \x3c!--<tr>--\x3e\n                    \x3c!--<th>Panel</th>--\x3e\n                    \x3c!--<th>Subscribed</th>--\x3e\n                    \x3c!--<th>Subscriptor</th>--\x3e\n                \x3c!--</tr>--\x3e\n            \x3c!--</thead>--\x3e\n            \x3c!--<tbody>--\x3e\n                \x3c!--",
    z = c.each.call(b, (z = b && b.options,
    null == z || !1 === z ? z : z.possibleSubscribers), {
        hash: {},
        inverse: G.noop,
        fn: G.programWithDepth(38, y, e, b),
        data: e
    }),
    (z || 0 === z) && (C += z),
    C += "--\x3e\n            \x3c!--</tbody>--\x3e\n        \x3c!--</table>--\x3e\n    \x3c!--</div>--\x3e\n</form>"
}),
this.JST["views/conceptDetailsPlugin/tabs/details/attributes-panel.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        return "\n        class = 'highlightEffectiveTime'\n        "
    }
    function g(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === t ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += u(d) + '\')" data-module="' + u((d = a && a.firstMatch,
        d = null == d || !1 === d ? d : d.module,
        typeof d === t ? d.apply(a) : d)) + '" data-concept-id="' + u((d = a && a.firstMatch,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === t ? d.apply(a) : d)) + '" data-term="' + u((d = a && a.firstMatch,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === t ? d.apply(a) : d)) + '" data-def-status="' + u((d = a && a.firstMatch,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === t ? d.apply(a) : d)) + '" style="color: inherit;text-decoration: inherit;"><span class="badge alert-warning">&nbsp;&nbsp;</span></a>&nbsp;&nbsp;\n                '
    }
    function h(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === t ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += u(d) + '\')" data-module="' + u((d = a && a.firstMatch,
        d = null == d || !1 === d ? d : d.module,
        typeof d === t ? d.apply(a) : d)) + '" data-concept-id="' + u((d = a && a.firstMatch,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === t ? d.apply(a) : d)) + '" data-term="' + u((d = a && a.firstMatch,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === t ? d.apply(a) : d)) + '" data-def-status="' + u((d = a && a.firstMatch,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === t ? d.apply(a) : d)) + '" style="color: inherit;text-decoration: inherit;"><span class="badge alert-warning" >&equiv;</span></a>&nbsp;&nbsp;\n                '
    }
    function i(a, b) {
        return "\n                , <span class='i18n' data-i18n-id='i18n_primitive'>Primitive</span>\n            "
    }
    function j(a, b) {
        return "\n                , <span class='i18n' data-i18n-id='i18n_fully_defined'>Fully defined</span>\n            "
    }
    function k(a, b) {
        return "\n                , <span class='i18n' data-i18n-id='i18n_active'>Active</span>\n            "
    }
    function l(a, b) {
        return "\n                , <span class='i18n' data-i18n-id='i18n_inactive'>Inactive</span>\n            "
    }
    function m(a, b) {
        return "\n            "
    }
    function n(a, b) {
        var c, d = "";
        return d += "\n                . Descendants count, Stated: " + u((c = a && a.firstMatch,
        c = null == c || !1 === c ? c : c.statedDescendantsString,
        typeof c === t ? c.apply(a) : c)) + " concepts, Inferred: " + u((c = a && a.firstMatch,
        c = null == c || !1 === c ? c : c.inferredDescendantsString,
        typeof c === t ? c.apply(a) : c)) + " concepts.\n            "
    }
    function o(a, b) {
        var d, e, f = "";
        return f += '\n            <span class="pull-right">\n                <div class="dropdown">\n                    <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1-details" data-toggle="dropdown" aria-expanded="true">\n                        <i class="glyphicon glyphicon-plus-sign pull-right" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === t ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += u(d) + '-addsyn-icon-details"></i>\n                    </button>\n                    <ul class="dropdown-menu small pull-right" role="menu" aria-labelledby="dropdownMenu2-details">\n                        <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === t ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += u(d) + '-addsyn-sctid-details">Skicka synonymförslag</a></li>\n                    </ul>\n                </div>\n            </span>\n            '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var p, q, r, s = "", t = "function", u = this.escapeExpression, v = this, w = c.helperMissing;
    return s += "<table class='table table-default' >\n    <tr\n        ",
    q = c.if_eq || b && b.if_eq,
    r = {
        hash: {},
        inverse: v.noop,
        fn: v.program(1, f, e),
        data: e
    },
    p = q ? q.call(b, (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.effectiveTime), (p = b && b.options,
    null == p || !1 === p ? p : p.highlightByEffectiveTime), r) : w.call(b, "if_eq", (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.effectiveTime), (p = b && b.options,
    null == p || !1 === p ? p : p.highlightByEffectiveTime), r),
    (p || 0 === p) && (s += p),
    s += "\n            >\n        <td>\n            <h4>\n                ",
    q = c.if_eq || b && b.if_eq,
    r = {
        hash: {},
        inverse: v.program(5, h, e),
        fn: v.program(3, g, e),
        data: e
    },
    p = q ? q.call(b, (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.definitionStatus), "Primitive", r) : w.call(b, "if_eq", (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.definitionStatus), "Primitive", r),
    (p || 0 === p) && (s += p),
    s += "\n\n                <span ondrop=\"dropC(event, '",
    (q = c.divElementId) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.divElementId,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + '\')" ondragleave="removeHighlight();" ondragover="allowDrop(event)">' + u((p = b && b.firstMatch,
    p = null == p || !1 === p ? p : p.defaultTerm,
    typeof p === t ? p.apply(b) : p)) + "</span>\n            </h4>\n            <br>SCTID: " + u((p = b && b.firstMatch,
    p = null == p || !1 === p ? p : p.conceptId,
    typeof p === t ? p.apply(b) : p)) + "\n\n            ",
    q = c.if_eq || b && b.if_eq,
    r = {
        hash: {},
        inverse: v.program(9, j, e),
        fn: v.program(7, i, e),
        data: e
    },
    p = q ? q.call(b, (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.definitionStatus), "Primitive", r) : w.call(b, "if_eq", (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.definitionStatus), "Primitive", r),
    (p || 0 === p) && (s += p),
    s += "\n\n            ",
    q = c.if_eq || b && b.if_eq,
    r = {
        hash: {},
        inverse: v.program(13, l, e),
        fn: v.program(11, k, e),
        data: e
    },
    p = q ? q.call(b, (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.active), !0, r) : w.call(b, "if_eq", (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.active), !0, r),
    (p || 0 === p) && (s += p),
    s += "\n            ",
    q = c.if_undefined || b && b.if_undefined,
    r = {
        hash: {},
        inverse: v.program(17, n, e),
        fn: v.program(15, m, e),
        data: e
    },
    p = q ? q.call(b, (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.statedDescendantsString), r) : w.call(b, "if_undefined", (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.statedDescendantsString), r),
    (p || 0 === p) && (s += p),
    s += '\n        </td>\n        <td>\n            <button type="button" class="btn btn-link unobtrusive-icon more-fields-button pull-right" data-container="body" data-toggle="popover" data-placement="left" data-content="\n                <table border=\'1\'><tr><th style=\'padding: 3px;\'>Effective Time</th><th style=\'padding: 3px;\'>ModuleId</th></tr><tr><td style=\'padding: 3px;\'>' + u((p = b && b.firstMatch,
    p = null == p || !1 === p ? p : p.effectiveTime,
    typeof p === t ? p.apply(b) : p)) + "</td><td style='padding: 3px;'>" + u((p = b && b.firstMatch,
    p = null == p || !1 === p ? p : p.module,
    typeof p === t ? p.apply(b) : p)) + '</td></tr></table>\n                " data-html="true"><i class="glyphicon glyphicon-info-sign"></i></button>\n            &nbsp;\n            <span class="pull-right">\n                <div class="dropdown">\n                    <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1-details" data-toggle="dropdown" aria-expanded="true">\n                        <i class="glyphicon glyphicon-export pull-right" id="',
    (q = c.divElementId) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.divElementId,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + '-copy-icon-details"></i>\n                    </button>\n                    <ul class="dropdown-menu small pull-right" role="menu" aria-labelledby="dropdownMenu1-details">\n                        <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" id="',
    (q = c.divElementId) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.divElementId,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + '-copy-sctid-details" class="clip-btn" data-clipboard-text="' + u((p = b && b.firstMatch,
    p = null == p || !1 === p ? p : p.conceptId,
    typeof p === t ? p.apply(b) : p)) + '">Copy ConceptId</a></li>\n                        <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" id="',
    (q = c.divElementId) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.divElementId,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + '-copy-term-details" class="clip-btn" data-clipboard-text="' + u((p = b && b.firstMatch,
    p = null == p || !1 === p ? p : p.defaultTerm,
    typeof p === t ? p.apply(b) : p)) + '">Copy term</a></li>\n                        <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" id="',
    (q = c.divElementId) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.divElementId,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + '-copy-sctid-term-details" class="clip-btn" data-clipboard-text="' + u((p = b && b.firstMatch,
    p = null == p || !1 === p ? p : p.conceptId,
    typeof p === t ? p.apply(b) : p)) + " |" + u((p = b && b.firstMatch,
    p = null == p || !1 === p ? p : p.defaultTerm,
    typeof p === t ? p.apply(b) : p)) + '|">Copy ConceptId + term</a></li>\n                        <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" id="',
    (q = c.divElementId) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.divElementId,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + '-copy-link-details" class="clip-btn" data-clipboard-text="',
    (q = c.link) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.link,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + '">Copy Link to share</a></li>\n                    </ul>\n                </div>\n            </span>\n            ',
    q = c.if_eq || b && b.if_eq,
    r = {
        hash: {},
        inverse: v.noop,
        fn: v.program(19, o, e),
        data: e
    },
    p = q ? q.call(b, b && b.edition, "se-edition", r) : w.call(b, "if_eq", b && b.edition, "se-edition", r),
    (p || 0 === p) && (s += p),
    s += '\n            \x3c!--<button type="button" id="share-link-',
    (q = c.divElementId) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.divElementId,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + '" class="btn btn-link more-fields-button pull-right" data-container="body" data-toggle="popover" data-placement="left" data-content="--\x3e\n                    \x3c!--<form><input class=\'form-control\' id=\'share-field-',
    (q = c.divElementId) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.divElementId,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + "' value='",
    (q = c.dataContentValue) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.dataContentValue,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + "?perspective=full&conceptId1=" + u((p = b && b.firstMatch,
    p = null == p || !1 === p ? p : p.conceptId,
    typeof p === t ? p.apply(b) : p)) + "&edition=",
    (q = c.edition) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.edition,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + "&release=",
    (q = c.release) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.release,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + "&server=",
    (q = c.server) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.server,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + "&langRefset=",
    (q = c.langRefset) ? p = q.call(b, {
        hash: {},
        data: e
    }) : (q = b && b.langRefset,
    p = typeof q === t ? q.call(b, {
        hash: {},
        data: e
    }) : q),
    s += u(p) + '\'></form><br>Copy the concept link (e.g. CTRL-C) to save and share a reference to this concept.--\x3e\n                    \x3c!--" data-html="true"><i class="glyphicon glyphicon-share-alt"></i></button>--\x3e\n            <span class="pull-right">\n               <div class="phoca-flagbox" style="width:40px;height:40px">\n                   <span class="phoca-flag ' + u((q = c.countryIcon || b && b.countryIcon,
    r = {
        hash: {},
        data: e
    },
    q ? q.call(b, (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.module), r) : w.call(b, "countryIcon", (p = b && b.firstMatch,
    null == p || !1 === p ? p : p.module), r))) + '"></span>\n               </div>\n            </span>\n        </td>\n\n    </tr>\n</table>\n'
}),
this.JST["views/conceptDetailsPlugin/tabs/details/children-panel.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e = "";
        return e += "\n    ",
        d = c.if.call(a, a && a.active, {
            hash: {},
            inverse: l.noop,
            fn: l.program(2, g, b),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n"
    }
    function g(a, b) {
        var d, e, f = "";
        return f += '\n        <tr><td draggable="true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === j ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += k(d) + '\')" data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === j ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += k(d) + "\" data-concept-id='",
        (e = c.conceptId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.conceptId,
        d = typeof e === j ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += k(d) + "' data-term='",
        (e = c.defaultTerm) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.defaultTerm,
        d = typeof e === j ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += k(d) + "'>",
        (e = c.defaultTerm) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.defaultTerm,
        d = typeof e === j ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += k(d) + "</td></tr>\n    "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var h, i = "", j = "function", k = this.escapeExpression, l = this;
    return i += "<div>\n    <table class='table table-bordered'>\n        <thead>\n        <tr>\n            <th>\n                <span class='i18n' data-i18n-id='i18n_children'>Children</span>\n            </th>\n        </tr>\n        </thead>\n        <tbody>\n</div>\n",
    h = c.each.call(b, b && b.childrenResult, {
        hash: {},
        inverse: l.noop,
        fn: l.program(1, f, e),
        data: e
    }),
    (h || 0 === h) && (i += h),
    i += "\n</tbody>\n</table>"
}),
this.JST["views/conceptDetailsPlugin/tabs/details/descriptions-panel.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        return "\n                <th>SCTID</th>\n            "
    }
    function g(a, b, d) {
        var e, f, g, o = "";
        return o += "\n            <tr class='",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: I.program(6, i, b),
            fn: I.program(4, h, b),
            data: b
        },
        e = f ? f.call(a, (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), "900000000000003001", g) : G.call(a, "if_eq", (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), "900000000000003001", g),
        (e || 0 === e) && (o += e),
        e = c.if.call(a, a && a.active, {
            hash: {},
            inverse: I.program(10, k, b),
            fn: I.program(8, j, b),
            data: b
        }),
        (e || 0 === e) && (o += e),
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: I.noop,
            fn: I.program(12, l, b),
            data: b
        },
        e = f ? f.call(a, a && a.effectiveTime, (e = d && d.options,
        null == e || !1 === e ? e : e.highlightByEffectiveTime), g) : G.call(a, "if_eq", a && a.effectiveTime, (e = d && d.options,
        null == e || !1 === e ? e : e.highlightByEffectiveTime), g),
        (e || 0 === e) && (o += e),
        o += "'>\n                    <td>\n                        ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: I.program(16, n, b),
            fn: I.program(14, m, b),
            data: b
        },
        e = f ? f.call(a, (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), "900000000000003001", g) : G.call(a, "if_eq", (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), "900000000000003001", g),
        (e || 0 === e) && (o += e),
        o += "\n\n                        ",
        e = c.if.call(a, a && a.preferred, {
            hash: {},
            inverse: I.program(27, u, b),
            fn: I.program(22, r, b),
            data: b
        }),
        (e || 0 === e) && (o += e),
        o += "\n                        &nbsp;&nbsp;&nbsp;",
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === J ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        o += H(e) + "</td>\n                    ",
        e = c.if.call(a, (e = d && d.options,
        null == e || !1 === e ? e : e.showIds), {
            hash: {},
            inverse: I.noop,
            fn: I.program(32, x, b),
            data: b
        }),
        (e || 0 === e) && (o += e),
        o += "\n\n                    <td>\n                        ",
        e = c.if.call(a, a && a.preferred, {
            hash: {},
            inverse: I.program(36, z, b),
            fn: I.program(34, y, b),
            data: b
        }),
        (e || 0 === e) && (o += e),
        o += "\n                        <button type=\"button\" class=\"btn btn-link unobtrusive-icon more-fields-button pull-right\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"left\" data-content=\"\n                        <table border='1'><tr><th style='padding: 3px;'>DescriptionId</th><th style='padding: 3px;'>Type</th><th style='padding: 3px;'>Language</th><th style='padding: 3px;'>Case Significance</th><th style='padding: 3px;'>Effective Time</th><th style='padding: 3px;'>ModuleId</th></tr>\n                                <tr><td style='padding: 3px;'>",
        (f = c.descriptionId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.descriptionId,
        e = typeof f === J ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        o += H(e) + "</td><td style='padding: 3px;'>" + H((f = c.removeSemtag || a && a.removeSemtag,
        g = {
            hash: {},
            data: b
        },
        f ? f.call(a, (e = a && a.type,
        null == e || !1 === e ? e : e.defaultTerm), g) : G.call(a, "removeSemtag", (e = a && a.type,
        null == e || !1 === e ? e : e.defaultTerm), g))) + "</td><td style='padding: 3px;'>",
        (f = c.lang) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.lang,
        e = typeof f === J ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        o += H(e) + "</td><td style='padding: 3px;'>" + H((f = c.removeSemtag || a && a.removeSemtag,
        g = {
            hash: {},
            data: b
        },
        f ? f.call(a, (e = a && a.ics,
        null == e || !1 === e ? e : e.defaultTerm), g) : G.call(a, "removeSemtag", (e = a && a.ics,
        null == e || !1 === e ? e : e.defaultTerm), g))) + "</td><td style='padding: 3px;'>",
        (f = c.effectiveTime) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.effectiveTime,
        e = typeof f === J ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        o += H(e) + "</td><td style='padding: 3px;'>",
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === J ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        o += H(e) + '</td></tr>\n                        </table>\n                        " data-html="true"><i class="glyphicon glyphicon-info-sign"></i></button>\n                    </td>\n                </tr>\n        '
    }
    function h(a, b) {
        return " fsn-row"
    }
    function i(a, b) {
        return " synonym-row"
    }
    function j(a, b) {
        return ""
    }
    function k(a, b) {
        return " danger"
    }
    function l(a, b) {
        return " highlightEffectiveTime"
    }
    function m(a, b) {
        var d, e, f = "";
        return f += '\n                            <span rel="tooltip-right" title="' + H((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_fsn", "FSN", e) : G.call(a, "i18n", "i18n_fsn", "FSN", e))) + '">F</span>\n                        '
    }
    function n(a, b) {
        var d, e, f, g = "";
        return g += "\n                            ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: I.program(19, p, b),
            fn: I.program(17, o, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.conceptId), "900000000000013009", f) : G.call(a, "if_eq", (d = a && a.type,
        null == d || !1 === d ? d : d.conceptId), "900000000000013009", f),
        (d || 0 === d) && (g += d),
        g += "\n                        "
    }
    function o(a, b) {
        var d, e, f = "";
        return f += '\n                                <span rel="tooltip-right" title="' + H((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_synonym", "Synonym", e) : G.call(a, "i18n", "i18n_synonym", "Synonym", e))) + '">S</span>\n                            '
    }
    function p(a, b) {
        var d, e, f, g = "";
        return g += "\n                                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: I.noop,
            fn: I.program(20, q, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.conceptId), "900000000000550004", f) : G.call(a, "if_eq", (d = a && a.type,
        null == d || !1 === d ? d : d.conceptId), "900000000000550004", f),
        (d || 0 === d) && (g += d),
        g += "\n                            "
    }
    function q(a, b) {
        var d, e, f = "";
        return f += '\n                                    <span rel="tooltip-right" title="' + H((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_definition", "Definition", e) : G.call(a, "i18n", "i18n_definition", "Definition", e))) + '">D</span>\n                                '
    }
    function r(a, b) {
        var d, e, f, g = "";
        return g += "\n                            ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: I.program(25, t, b),
            fn: I.program(23, s, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.conceptId), "900000000000003001", f) : G.call(a, "if_eq", (d = a && a.type,
        null == d || !1 === d ? d : d.conceptId), "900000000000003001", f),
        (d || 0 === d) && (g += d),
        g += "\n                        "
    }
    function s(a, b) {
        var d, e, f = "";
        return f += '\n                                &nbsp;<span class="glyphicon glyphicon-star-empty" rel="tooltip-right" title="' + H((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_preferred", "Preferred", e) : G.call(a, "i18n", "i18n_preferred", "Preferred", e))) + '"></span>\n                            '
    }
    function t(a, b) {
        var d, e, f = "";
        return f += '\n                                &nbsp;<span class="glyphicon glyphicon-star" rel="tooltip-right" title="' + H((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_preferred", "Preferred", e) : G.call(a, "i18n", "i18n_preferred", "Preferred", e))) + '"></span>\n                            '
    }
    function u(a, b) {
        var d, e = "";
        return e += "\n                            ",
        d = c.if.call(a, a && a.acceptable, {
            hash: {},
            inverse: I.program(30, w, b),
            fn: I.program(28, v, b),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n                        "
    }
    function v(a, b) {
        var d, e, f = "";
        return f += '\n                                &nbsp;<span rel="tooltip-right" title="' + H((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_acceptable", "Acceptable", e) : G.call(a, "i18n", "i18n_acceptable", "Acceptable", e))) + '">&#10004;</span></span>\n                            '
    }
    function w(a, b) {
        return "\n                                &nbsp;&nbsp;&nbsp;\n                            "
    }
    function x(a, b) {
        var d, e, f = "";
        return f += "\n                        <td>",
        (e = c.descriptionId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.descriptionId,
        d = typeof e === J ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += H(d) + "</td>\n                    "
    }
    function y(a, b) {
        var d, e, f = "";
        return f += "\n                            <span class='i18n' data-i18n-id='i18n_preferred'>" + H((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_preferred", "Preferred", e) : G.call(a, "i18n", "i18n_preferred", "Preferred", e))) + "</span>\n                        "
    }
    function z(a, b) {
        var d, e = "";
        return e += "\n                            ",
        d = c.if.call(a, a && a.acceptable, {
            hash: {},
            inverse: I.program(39, B, b),
            fn: I.program(37, A, b),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n                        "
    }
    function A(a, b) {
        var d, e, f = "";
        return f += "\n                                <span class='i18n' data-i18n-id='i18n_acceptable'>" + H((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_acceptable", "Acceptable", e) : G.call(a, "i18n", "i18n_acceptable", "Acceptable", e))) + "</span>\n                            "
    }
    function B(a, b) {
        var d, e, f = "";
        return f += "\n                                <span class='i18n' data-i18n-id='i18n_not_acceptable'>" + H((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_not_acceptable", "Not acceptable", e) : G.call(a, "i18n", "i18n_not_acceptable", "Not acceptable", e))) + "</span>\n                            "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var C, D, E, F = "", G = c.helperMissing, H = this.escapeExpression, I = this, J = "function";
    return F += "<table class='table table-bordered' id = '",
    (D = c.divElementId) ? C = D.call(b, {
        hash: {},
        data: e
    }) : (D = b && b.divElementId,
    C = typeof D === J ? D.call(b, {
        hash: {},
        data: e
    }) : D),
    F += H(C) + '-descriptions-panel-table\'>\n    <thead>\n        <tr>\n           <th colspan="2" class="text-center">' + H((D = c.removeSemtag || b && b.removeSemtag,
    E = {
        hash: {},
        data: e
    },
    D ? D.call(b, b && b.longLangName, E) : G.call(b, "removeSemtag", b && b.longLangName, E))) + "</th>\n        </tr>\n        <tr>\n            <th><span class='i18n' data-i18n-id='i18n_term'>Term</span></th>\n            ",
    C = c.if.call(b, (C = b && b.options,
    null == C || !1 === C ? C : C.showIds), {
        hash: {},
        inverse: I.noop,
        fn: I.program(1, f, e),
        data: e
    }),
    (C || 0 === C) && (F += C),
    F += "\n            <th><span class='i18n' data-i18n-id='i18n_acceptability'>Acceptability</span>&nbsp;&nbsp;",
    (D = c.languageName) ? C = D.call(b, {
        hash: {},
        data: e
    }) : (D = b && b.languageName,
    C = typeof D === J ? D.call(b, {
        hash: {},
        data: e
    }) : D),
    F += H(C) + "</th>\n        </tr>\n    </thead>\n    <tbody>\n        ",
    C = c.each.call(b, b && b.allDescriptions, {
        hash: {},
        inverse: I.noop,
        fn: I.programWithDepth(3, g, e, b),
        data: e
    }),
    (C || 0 === C) && (F += C),
    F += "\n    </tbody>\n</table>"
}),
this.JST["views/conceptDetailsPlugin/tabs/details/diagram.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<div class="container" style="max-width: 100%;">\n    <div id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-diagram-toolbar" class="row">\n        <div class="row" style="margin: 15px;">\n            <div class="btn-toolbar pull-right" role="toolbar">\n                <div class="btn-group" role="group" aria-label="..." style="margin-right: 5px;">\n                    <button type="button" class="btn btn-default btn-sm" id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-stated-button-d">Stated</button>\n                    <button type="button" class="btn btn-default btn-sm" id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-inferred-button-d">Inferred</button>\n                </div>\n                <button id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-download-button" type="button" class="btn btn-primary btn-sm disabled" style="display: block;">Download</button>\n                <button id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-progress-button" type="button" class="btn btn-warning btn-sm disabled" style="display: none;">Generating downloadable files <span class=\'glyphicon glyphicon-refresh icon-spin\'></span></button>\n                <button id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-png-button" type="button" class="btn btn-success btn-sm" style="display: none;"><span class="glyphicon glyphicon-picture"></span> PNG</button>\n                <button id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-svg-button" type="button" class="btn btn-success btn-sm" style="display: none;"><span class="glyphicon glyphicon-tint"></span> SVG</button>\n            </div>\n        </div>\n    </div>\n    <div id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-diagram-body" class="row" style="overflow: auto; width: 1000;">\n\n    </div>\n</div>'
}),
this.JST["views/conceptDetailsPlugin/tabs/details/rels-panel.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, h = "";
        return h += "\n        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: L.noop,
            fn: L.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.firstMatch,
        null == d || !1 === d ? d : d.statedRelationships), "undefined", f) : M.call(a, "if_eq", (d = a && a.firstMatch,
        null == d || !1 === d ? d : d.statedRelationships), "undefined", f),
        (d || 0 === d) && (h += d),
        h += "\n    "
    }
    function g(a, b) {
        return "\n            <tr><td colspan='4'><span class='text-muted'>No relationships</span></td></tr>\n        "
    }
    function h(a, b) {
        var d, e = "";
        return e += "\n\n        ",
        d = c.each.call(a, (d = a && a.firstMatch,
        null == d || !1 === d ? d : d.relationships), {
            hash: {},
            inverse: L.noop,
            fn: L.programWithDepth(5, i, b, a),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n    "
    }
    function i(a, b, d) {
        var e, f = "";
        return f += "\n            ",
        e = c.if.call(a, a && a.active, {
            hash: {},
            inverse: L.noop,
            fn: L.programWithDepth(6, j, b, d),
            data: b
        }),
        (e || 0 === e) && (f += e),
        f += "\n        "
    }
    function j(a, b, d) {
        var e, f, g, h = "";
        return h += "\n                ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.programWithDepth(9, l, b, d),
            fn: L.programWithDepth(7, k, b, d),
            data: b
        },
        e = f ? f.call(a, (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), 116680003, g) : M.call(a, "if_eq", (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), 116680003, g),
        (e || 0 === e) && (h += e),
        h += "\n                <tr class='inferred-rel\n                            ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.noop,
            fn: L.program(11, m, b),
            data: b
        },
        e = f ? f.call(a, a && a.effectiveTime, (e = d && d.options,
        null == e || !1 === e ? e : e.highlightByEffectiveTime), g) : M.call(a, "if_eq", a && a.effectiveTime, (e = d && d.options,
        null == e || !1 === e ? e : e.highlightByEffectiveTime), g),
        (e || 0 === e) && (h += e),
        h += "\n                            '>\n                    <td>\n                        ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.program(15, o, b),
            fn: L.program(13, n, b),
            data: b
        },
        e = f ? f.call(a, (e = a && a.type,
        null == e || !1 === e ? e : e.definitionStatus), "Primitive", g) : M.call(a, "if_eq", (e = a && a.type,
        null == e || !1 === e ? e : e.definitionStatus), "Primitive", g),
        (e || 0 === e) && (h += e),
        h += "\n                        " + N((e = a && a.type,
        e = null == e || !1 === e ? e : e.defaultTerm,
        typeof e === O ? e.apply(a) : e)) + "\n                    </td>\n                    <td>\n                        ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.program(19, q, b),
            fn: L.program(17, p, b),
            data: b
        },
        e = f ? f.call(a, (e = a && a.target,
        null == e || !1 === e ? e : e.definitionStatus), "Primitive", g) : M.call(a, "if_eq", (e = a && a.target,
        null == e || !1 === e ? e : e.definitionStatus), "Primitive", g),
        (e || 0 === e) && (h += e),
        h += "\n                        " + N((e = a && a.target,
        e = null == e || !1 === e ? e : e.defaultTerm,
        typeof e === O ? e.apply(a) : e)) + "</td>\n                    <td>",
        (f = c.groupId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.groupId,
        e = typeof f === O ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += N(e) + "</td>\n                    ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.program(23, s, b),
            fn: L.program(21, r, b),
            data: b
        },
        e = f ? f.call(a, (e = a && a.charType,
        null == e || !1 === e ? e : e.conceptId), "900000000000010007", g) : M.call(a, "if_eq", (e = a && a.charType,
        null == e || !1 === e ? e : e.conceptId), "900000000000010007", g),
        (e || 0 === e) && (h += e),
        h += "\n                    <button type=\"button\" class=\"btn btn-link unobtrusive-icon more-fields-button pull-right\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"left\" data-content=\"\n                                <table border='1'><tr><th style='padding: 3px;'>TypeId</th><th style='padding: 3px;'>TargetId</th><th style='padding: 3px;'>Modifier</th><th style='padding: 3px;'>Effective Time</th><th style='padding: 3px;'>ModuleId</th></tr>\n                                    <tr><td style='padding: 3px;'>" + N((e = a && a.type,
        e = null == e || !1 === e ? e : e.conceptId,
        typeof e === O ? e.apply(a) : e)) + "</td><td style='padding: 3px;'>" + N((e = a && a.target,
        e = null == e || !1 === e ? e : e.conceptId,
        typeof e === O ? e.apply(a) : e)) + "</td><td style='padding: 3px;'>",
        (f = c.modifier) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.modifier,
        e = typeof f === O ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += N(e) + "</td><td style='padding: 3px;'>",
        (f = c.effectiveTime) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.effectiveTime,
        e = typeof f === O ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += N(e) + "</td><td style='padding: 3px;'>",
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === O ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += N(e) + '</td></tr>\n                                </table>\n                                " data-html="true"><i class="glyphicon glyphicon-info-sign"></i></button>\n                </td>\n                </tr>\n            '
    }
    function k(a, b, d) {
        var e, f, g = "";
        return g += "\n                    " + N((e = c.push || a && a.push,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, a, d && d.inferredParents, f) : M.call(a, "push", a, d && d.inferredParents, f))) + "\n                "
    }
    function l(a, b, d) {
        var e, f, g = "";
        return g += "\n                    " + N((e = c.push || a && a.push,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, a, d && d.inferredRoles, f) : M.call(a, "push", a, d && d.inferredRoles, f))) + "\n                "
    }
    function m(a, b) {
        return "\n                                 highlightEffectiveTime\n                            "
    }
    function n(a, b) {
        var d, e, f = "";
        return f += '\n                            <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '\')"  data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '" data-concept-id="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === O ? d.apply(a) : d)) + '" data-term="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === O ? d.apply(a) : d)) + '" data-def-status="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === O ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                        '
    }
    function o(a, b) {
        var d, e, f = "";
        return f += '\n                            <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '\')"  data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '" data-concept-id="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === O ? d.apply(a) : d)) + '" data-term="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === O ? d.apply(a) : d)) + '" data-def-status="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === O ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                        '
    }
    function p(a, b) {
        var d, e, f = "";
        return f += '\n                            <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '\')"  data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '" data-concept-id="' + N((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === O ? d.apply(a) : d)) + '" data-term="' + N((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === O ? d.apply(a) : d)) + '" data-def-status="' + N((d = a && a.target,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === O ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                        '
    }
    function q(a, b) {
        var d, e, f = "";
        return f += '\n                            <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '\')"  data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '" data-concept-id="' + N((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === O ? d.apply(a) : d)) + '" data-term="' + N((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === O ? d.apply(a) : d)) + '" data-def-status="' + N((d = a && a.target,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === O ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                        '
    }
    function r(a, b) {
        var d, e, f = "";
        return f += "\n                    <td><span class='i18n' data-i18n-id='i18n_stated'>" + N((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_stated", "Stated", e) : M.call(a, "i18n", "i18n_stated", "Stated", e))) + "</span>\n                    "
    }
    function s(a, b) {
        var d, e, f, g = "";
        return g += "\n                        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: L.program(26, u, b),
            fn: L.program(24, t, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.charType,
        null == d || !1 === d ? d : d.conceptId), "900000000000011006", f) : M.call(a, "if_eq", (d = a && a.charType,
        null == d || !1 === d ? d : d.conceptId), "900000000000011006", f),
        (d || 0 === d) && (g += d),
        g += "\n                    "
    }
    function t(a, b) {
        var d, e, f = "";
        return f += "\n                        <td><span class='i18n' data-i18n-id='i18n_inferred'>" + N((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_inferred", "Inferred", e) : M.call(a, "i18n", "i18n_inferred", "Inferred", e))) + "</span>\n                        "
    }
    function u(a, b) {
        var d, e, f = "";
        return f += "\n                        <td><span class='i18n' data-i18n-id='i18n_other'>" + N((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_other", "Other", e) : M.call(a, "i18n", "i18n_other", "Other", e))) + "</span>\n                        "
    }
    function v(a, b) {
        return "\n    "
    }
    function w(a, b) {
        var d, e = "";
        return e += "\n\n        ",
        d = c.each.call(a, (d = a && a.firstMatch,
        null == d || !1 === d ? d : d.statedRelationships), {
            hash: {},
            inverse: L.noop,
            fn: L.programWithDepth(31, x, b, a),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n    "
    }
    function x(a, b, d) {
        var e, f = "";
        return f += "\n            ",
        e = c.if.call(a, a && a.active, {
            hash: {},
            inverse: L.noop,
            fn: L.programWithDepth(32, y, b, d),
            data: b
        }),
        (e || 0 === e) && (f += e),
        f += "\n        "
    }
    function y(a, b, d) {
        var e, f, g, h = "";
        return h += "\n                ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.programWithDepth(35, A, b, d),
            fn: L.programWithDepth(33, z, b, d),
            data: b
        },
        e = f ? f.call(a, (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), 116680003, g) : M.call(a, "if_eq", (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), 116680003, g),
        (e || 0 === e) && (h += e),
        h += "\n                <tr class='stated-rel\n                            ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.noop,
            fn: L.program(11, m, b),
            data: b
        },
        e = f ? f.call(a, a && a.effectiveTime, (e = a && a.options,
        null == e || !1 === e ? e : e.highlightByEffectiveTime), g) : M.call(a, "if_eq", a && a.effectiveTime, (e = a && a.options,
        null == e || !1 === e ? e : e.highlightByEffectiveTime), g),
        (e || 0 === e) && (h += e),
        h += "\n                            '>\n                    <td>\n                        ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.program(39, C, b),
            fn: L.program(37, B, b),
            data: b
        },
        e = f ? f.call(a, (e = a && a.type,
        null == e || !1 === e ? e : e.definitionStatus), "Primitive", g) : M.call(a, "if_eq", (e = a && a.type,
        null == e || !1 === e ? e : e.definitionStatus), "Primitive", g),
        (e || 0 === e) && (h += e),
        h += "\n                        " + N((e = a && a.type,
        e = null == e || !1 === e ? e : e.defaultTerm,
        typeof e === O ? e.apply(a) : e)) + "</td>\n                    <td>\n                        ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.program(19, q, b),
            fn: L.program(17, p, b),
            data: b
        },
        e = f ? f.call(a, (e = a && a.target,
        null == e || !1 === e ? e : e.definitionStatus), "Primitive", g) : M.call(a, "if_eq", (e = a && a.target,
        null == e || !1 === e ? e : e.definitionStatus), "Primitive", g),
        (e || 0 === e) && (h += e),
        h += "\n                        " + N((e = a && a.target,
        e = null == e || !1 === e ? e : e.defaultTerm,
        typeof e === O ? e.apply(a) : e)) + "</td>\n                    <td>",
        (f = c.groupId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.groupId,
        e = typeof f === O ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += N(e) + "</td>\n                    ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: L.program(23, s, b),
            fn: L.program(21, r, b),
            data: b
        },
        e = f ? f.call(a, (e = a && a.charType,
        null == e || !1 === e ? e : e.conceptId), "900000000000010007", g) : M.call(a, "if_eq", (e = a && a.charType,
        null == e || !1 === e ? e : e.conceptId), "900000000000010007", g),
        (e || 0 === e) && (h += e),
        h += '\n                    <button type="button" class="btn btn-link unobtrusive-icon more-fields-button pull-right" data-container="body" data-toggle="popover" data-placement="left" data-content="\n                        <table border=\'1\'><tr><th style=\'padding: 3px;\'>Modifier</th><th style=\'padding: 3px;\'>Effective Time</th><th style=\'padding: 3px;\'>ModuleId</th></tr>\n                            <tr><td style=\'padding: 3px;\'>',
        (f = c.modifier) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.modifier,
        e = typeof f === O ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += N(e) + "</td><td style='padding: 3px;'>",
        (f = c.effectiveTime) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.effectiveTime,
        e = typeof f === O ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += N(e) + "</td><td style='padding: 3px;'>",
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === O ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += N(e) + '</td></tr>\n                        </table>\n                        " data-html="true"><i class="glyphicon glyphicon-info-sign"></i></button>\n                </td>\n                </tr>\n            '
    }
    function z(a, b, d) {
        var e, f, g = "";
        return g += "\n                    " + N((e = c.push || a && a.push,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, a, d && d.statedParents, f) : M.call(a, "push", a, d && d.statedParents, f))) + "\n                "
    }
    function A(a, b, d) {
        var e, f, g = "";
        return g += "\n                    " + N((e = c.push || a && a.push,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, a, d && d.statedRoles, f) : M.call(a, "push", a, d && d.statedRoles, f))) + "\n                "
    }
    function B(a, b) {
        var d, e, f = "";
        return f += '\n                            <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '\')" data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '" data-concept-id="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === O ? d.apply(a) : d)) + '" data-term="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === O ? d.apply(a) : d)) + '" data-def-status="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === O ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                        '
    }
    function C(a, b) {
        var d, e, f = "";
        return f += '\n                            <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '\')" data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += N(d) + '" data-concept-id="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === O ? d.apply(a) : d)) + '" data-term="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === O ? d.apply(a) : d)) + '" data-def-status="' + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === O ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                        '
    }
    function D(a, b) {
        return "\n    <p>No additional relationships</p>\n"
    }
    function E(a, b) {
        var d, e, f, g = "";
        return g += "\n    <table class='table table-bordered'>\n        <thead>\n        <tr>\n            <th><span class='i18n' data-i18n-id='i18n_type'>" + N((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_type", "Type", f) : M.call(a, "i18n", "i18n_type", "Type", f))) + "</span></th>\n            <th><span class='i18n' data-i18n-id='i18n_destination'>" + N((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_destination", "Destination", f) : M.call(a, "i18n", "i18n_destination", "Destination", f))) + "</span></th>\n            <th><span class='i18n' data-i18n-id='i18n_char_type'>" + N((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_char_type", "CharType", f) : M.call(a, "i18n", "i18n_char_type", "CharType", f))) + "</span></th>\n        </tr>\n        </thead>\n        <tbody>\n        ",
        d = c.each.call(a, a && a.additionalRels, {
            hash: {},
            inverse: L.noop,
            fn: L.program(44, F, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n        </tbody>\n    </table>\n"
    }
    function F(a, b) {
        var d, e = "";
        return e += "\n            ",
        d = c.if.call(a, a && a.active, {
            hash: {},
            inverse: L.noop,
            fn: L.program(45, G, b),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n        "
    }
    function G(a, b) {
        var d, e, f, g = "";
        return g += "\n                <tr>\n                    <td>\n                        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: L.program(39, C, b),
            fn: L.program(37, B, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : M.call(a, "if_eq", (d = a && a.type,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                        " + N((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === O ? d.apply(a) : d)) + "</td>\n                    <td>\n                        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: L.program(19, q, b),
            fn: L.program(17, p, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.target,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : M.call(a, "if_eq", (d = a && a.target,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                        " + N((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === O ? d.apply(a) : d)) + "</td>\n                    <td><span class='i18n' data-i18n-id='i18n_additional'>" + N((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_additional", "Additional", f) : M.call(a, "i18n", "i18n_additional", "Additional", f))) + '</span>\n                        <button type="button" class="btn btn-link unobtrusive-icon more-fields-button pull-right" data-container="body" data-toggle="popover" data-placement="left" data-content="\n                        <table border=\'1\'><tr><th style=\'padding: 3px;\'>Modifier</th><th style=\'padding: 3px;\'>Effective Time</th><th style=\'padding: 3px;\'>ModuleId</th></tr>\n                            <tr><td style=\'padding: 3px;\'>',
        (e = c.modifier) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.modifier,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += N(d) + "</td><td style='padding: 3px;'>",
        (e = c.effectiveTime) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.effectiveTime,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += N(d) + "</td><td style='padding: 3px;'>",
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += N(d) + '</td></tr>\n                        </table>\n                        " data-html="true"><i class="glyphicon glyphicon-info-sign"></i></button>\n                    </td>\n                </tr>\n            '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var H, I, J, K = "", L = this, M = c.helperMissing, N = this.escapeExpression, O = "function";
    return K += "<table class='table table-bordered'>\n    <thead>\n    <tr>\n        <th><span class='i18n' data-i18n-id='i18n_type'>" + N((I = c.i18n || b && b.i18n,
    J = {
        hash: {},
        data: e
    },
    I ? I.call(b, "i18n_type", "Type", J) : M.call(b, "i18n", "i18n_type", "Type", J))) + "</span></th>\n        <th><span class='i18n' data-i18n-id='i18n_destination'>" + N((I = c.i18n || b && b.i18n,
    J = {
        hash: {},
        data: e
    },
    I ? I.call(b, "i18n_destination", "Destination", J) : M.call(b, "i18n", "i18n_destination", "Destination", J))) + "</span></th>\n        <th><span class='i18n' data-i18n-id='i18n_group'>" + N((I = c.i18n || b && b.i18n,
    J = {
        hash: {},
        data: e
    },
    I ? I.call(b, "i18n_group", "Group", J) : M.call(b, "i18n", "i18n_group", "Group", J))) + "</span></th>\n        <th><span class='i18n' data-i18n-id='i18n_char_type'>" + N((I = c.i18n || b && b.i18n,
    J = {
        hash: {},
        data: e
    },
    I ? I.call(b, "i18n_char_type", "CharType", J) : M.call(b, "i18n", "i18n_char_type", "CharType", J))) + "</span></th>\n    </tr>\n    </thead>\n    <tbody>\n    ",
    I = c.if_eq || b && b.if_eq,
    J = {
        hash: {},
        inverse: L.program(4, h, e),
        fn: L.program(1, f, e),
        data: e
    },
    H = I ? I.call(b, (H = b && b.firstMatch,
    null == H || !1 === H ? H : H.relationships), "undefined", J) : M.call(b, "if_eq", (H = b && b.firstMatch,
    null == H || !1 === H ? H : H.relationships), "undefined", J),
    (H || 0 === H) && (K += H),
    K += "\n    ",
    I = c.if_eq || b && b.if_eq,
    J = {
        hash: {},
        inverse: L.program(30, w, e),
        fn: L.program(28, v, e),
        data: e
    },
    H = I ? I.call(b, (H = b && b.firstMatch,
    null == H || !1 === H ? H : H.statedRelationships), "undefined", J) : M.call(b, "if_eq", (H = b && b.firstMatch,
    null == H || !1 === H ? H : H.statedRelationships), "undefined", J),
    (H || 0 === H) && (K += H),
    K += "\n\n    </tbody>\n</table>\n\n",
    I = c.if_undefined || b && b.if_undefined,
    J = {
        hash: {},
        inverse: L.program(43, E, e),
        fn: L.program(41, D, e),
        data: e
    },
    H = I ? I.call(b, b && b.additionalRels, J) : M.call(b, "if_undefined", b && b.additionalRels, J),
    (H || 0 === H) && (K += H),
    K
}),
this.JST["views/conceptDetailsPlugin/tabs/expression.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<p class="" style="margin-top: 20px;">Pre-coordinated Expression (*)&nbsp;&nbsp;&nbsp;&nbsp;<small><i class="glyphicon glyphicon-export clip-btn-exp" id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-copy-pre-coordinated-expression"  data-clipboard-text="',
    (g = c.plainPreCoordinatedExpression) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.plainPreCoordinatedExpression,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '"></i></small></p>\n<div class="expression-code" style="margin-top: 10px; padding: 10px;">',
    (g = c.preCoordinatedExpressionHtml) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.preCoordinatedExpressionHtml,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</div>\n<p class="" style="margin-top: 20px;">Expression from Stated Concept Definition (*)&nbsp;&nbsp;&nbsp;&nbsp;<small><i class="glyphicon glyphicon-export clip-btn-exp" id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-copy-stated-expression" data-clipboard-text="',
    (g = c.plainStatedExpression) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.plainStatedExpression,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '"></i></small></p>\n<div class="expression-code" style="margin-top: 10px; padding: 10px;">',
    (g = c.statedExpressionHtml) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.statedExpressionHtml,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</div>\n<p class="" style="margin-top: 20px;">Expression from Inferred Concept Definition (*)&nbsp;&nbsp;&nbsp;&nbsp;<small><i class="glyphicon glyphicon-export clip-btn-exp" id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-copy-inferred-expression" data-clipboard-text="',
    (g = c.plainInferredExpression) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.plainInferredExpression,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '"></i></small></p>\n<div class="expression-code" style="margin-top: 10px; padding: 10px;">',
    (g = c.inferredExpressionHtml) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.inferredExpressionHtml,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    (f || 0 === f) && (h += f),
    h += '</div>\n<br><br>\n<div class="well small">\n    <p>(*) The expressions are generated according to the ABNF syntax found in the "SNOMED CT Compositional Grammar Specification and Guide" (<a href="http://snomed.org/compgrammar" target="_blank">http://snomed.org/compgrammar</a>)</p>\n    <p>SNOMED CT Compositional Grammar is a lightweight syntax for the representation of SNOMED CT expressions. SNOMED CT expressions are used in Electronic Health Records (EHRs) to represent clinical meanings in a way that enables automatic interpretation. They are also carried in messages, used to define precoordinated concepts and used to represent links between SNOMED CT and other terminologies.</p>\n    <p>These expressions are generated as an example from the published concept definition, a Pre-coordinated Expression is direct reference to the concept, and Post-coordinated expressions are generated from the stated or inferred relationships. In a Sufficiently Defined concept, all three will be equivalent.</p>\n</div>'
}),
this.JST["views/conceptDetailsPlugin/tabs/home/attributes.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        return ""
    }
    function g(a, b) {
        return "-empty"
    }
    function h(a, b) {
        return "\n            &nbsp;&nbsp;\n        "
    }
    function i(a, b) {
        return "\n            &equiv;\n        "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var j, k, l, m = "", n = "function", o = this.escapeExpression, p = this, q = c.helperMissing;
    return m += '<h4 data-droppable="true" ondrop="dropC(event, \'',
    (k = c.divElementId) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.divElementId,
    j = typeof k === n ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '\')" ondragleave="removeHighlight();" ondragover="allowDrop(event)">\n    <span class="pull-right">\n        <div class="dropdown">\n            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true" style="padding: 0px;">\n                <i class="glyphicon glyphicon-export pull-right" style="color: white;" id="',
    (k = c.divElementId) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.divElementId,
    j = typeof k === n ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '-copy-icon"></i>\n            </button>\n            <ul class="dropdown-menu small" role="menu" aria-labelledby="dropdownMenu1">\n                <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" id="',
    (k = c.divElementId) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.divElementId,
    j = typeof k === n ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '-copy-sctid" class="clip-btn" data-clipboard-text="' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.conceptId,
    typeof j === n ? j.apply(b) : j)) + '">Copy ConceptId</a></li>\n                <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" id="',
    (k = c.divElementId) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.divElementId,
    j = typeof k === n ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '-copy-term" class="clip-btn" data-clipboard-text="' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.defaultTerm,
    typeof j === n ? j.apply(b) : j)) + '">Copy term</a></li>\n                <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" id="',
    (k = c.divElementId) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.divElementId,
    j = typeof k === n ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '-copy-sctid-term" class="clip-btn" data-clipboard-text="' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.conceptId,
    typeof j === n ? j.apply(b) : j)) + " |" + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.defaultTerm,
    typeof j === n ? j.apply(b) : j)) + '|">Copy ConceptId + term</a></li>\n                <li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" id="',
    (k = c.divElementId) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.divElementId,
    j = typeof k === n ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '-copy-link" class="clip-btn" data-clipboard-text="',
    (k = c.link) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.link,
    j = typeof k === n ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '">Copy Link to share</a></li>\n            </ul>\n        </div>\n    </span>\n    <span class="pull-right">\n        <a href="javascript:void(0);" style="font-size: 20px; color: white; padding: 5px;">\n            <span data-conceptId="' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.conceptId,
    typeof j === n ? j.apply(b) : j)) + '" class="glyphicon glyphicon-star',
    k = c.if_fav || b && b.if_fav,
    l = {
        hash: {},
        inverse: p.program(3, g, e),
        fn: p.program(1, f, e),
        data: e
    },
    j = k ? k.call(b, (j = b && b.firstMatch,
    null == j || !1 === j ? j : j.conceptId), l) : q.call(b, "if_fav", (j = b && b.firstMatch,
    null == j || !1 === j ? j : j.conceptId), l),
    (j || 0 === j) && (m += j),
    m += '"></span>\n        </a>\n    </span>\n    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;"  draggable = "true" ondragstart="drag(event, \'',
    (k = c.divElementId) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.divElementId,
    j = typeof k === n ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '\')" data-module="' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.module,
    typeof j === n ? j.apply(b) : j)) + '" data-concept-id="' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.conceptId,
    typeof j === n ? j.apply(b) : j)) + '" data-term="' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.defaultTerm,
    typeof j === n ? j.apply(b) : j)) + '" data-def-status="' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.definitionStatus,
    typeof j === n ? j.apply(b) : j)) + '">\n        <span class="badge alert-warning">\n        ',
    k = c.if_eq || b && b.if_eq,
    l = {
        hash: {},
        inverse: p.program(7, i, e),
        fn: p.program(5, h, e),
        data: e
    },
    j = k ? k.call(b, (j = b && b.firstMatch,
    null == j || !1 === j ? j : j.definitionStatus), "Primitive", l) : q.call(b, "if_eq", (j = b && b.firstMatch,
    null == j || !1 === j ? j : j.definitionStatus), "Primitive", l),
    (j || 0 === j) && (m += j),
    m += "\n        </span>\n    </a>\n    &nbsp;&nbsp;\n    " + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.defaultTerm,
    typeof j === n ? j.apply(b) : j)) + '\n    <span class="pull-right">\n       <div class="phoca-flagbox" style="width:40px;height:40px">\n           <span class="phoca-flag ' + o((k = c.countryIcon || b && b.countryIcon,
    l = {
        hash: {},
        data: e
    },
    k ? k.call(b, (j = b && b.firstMatch,
    null == j || !1 === j ? j : j.module), l) : q.call(b, "countryIcon", (j = b && b.firstMatch,
    null == j || !1 === j ? j : j.module), l))) + '"></span>\n       </div>\n    </span>\n</h4>\n\n<h5>SCTID: ' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.conceptId,
    typeof j === n ? j.apply(b) : j)) + '<br><br><div id="copy-content-custom">' + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.conceptId,
    typeof j === n ? j.apply(b) : j)) + " | " + o((j = b && b.firstMatch,
    j = null == j || !1 === j ? j : j.defaultTerm,
    typeof j === n ? j.apply(b) : j)) + ' |</div></h5>\n\n<div id="home-descriptions-',
    (k = c.divElementId) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.divElementId,
    j = typeof k === n ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '"></div>\n'
}),
this.JST["views/conceptDetailsPlugin/tabs/home/children.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, i = "";
        return i += "\n    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: F.program(4, h, b),
            fn: F.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.childrenResult,
        null == d || !1 === d ? d : d.length), 0, f) : D.call(a, "if_eq", (d = a && a.childrenResult,
        null == d || !1 === d ? d : d.length), 0, f),
        (d || 0 === d) && (i += d),
        i += "\n"
    }
    function g(a, b) {
        var d, e, f = "";
        return f += '\n        <span data-i18n-id="i18n_no_children" class="text-muted i18n">' + E((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_no_children", "No Children", e) : D.call(a, "i18n", "i18n_no_children", "No Children", e))) + "</span>\n    "
    }
    function h(a, b) {
        var d, e = "";
        return e += "\n        <ul style='list-style-type: none; padding-left: 15px;'>\n            ",
        d = c.each.call(a, a && a.childrenResult, {
            hash: {},
            inverse: F.noop,
            fn: F.programWithDepth(5, i, b, a),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n        </ul>\n    "
    }
    function i(a, b, d) {
        var e, f = "";
        return f += "\n                ",
        e = c.if.call(a, a && a.active, {
            hash: {},
            inverse: F.noop,
            fn: F.programWithDepth(6, j, b, a, d),
            data: b
        }),
        (e || 0 === e) && (f += e),
        f += "\n            "
    }
    function j(a, b, d, e) {
        var f, g, h, i = "";
        return i += '\n                    <li data-module="',
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "\" data-concept-id='",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "' data-term='",
        (g = c.defaultTerm) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.defaultTerm,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "' class='treeLabel'>\n                        <button class='btn btn-link btn-xs treeButton' style='padding:2px'><i class='glyphicon glyphicon-",
        g = c.if_eq || e && e.if_eq,
        h = {
            hash: {},
            inverse: F.program(12, n, b),
            fn: F.program(7, k, b),
            data: b
        },
        f = g ? g.call(a, e && e.selectedView, "inferred", h) : D.call(a, "if_eq", e && e.selectedView, "inferred", h),
        (f || 0 === f) && (i += f),
        i += " treeButton' id='" + E((f = e && e.divElementId,
        typeof f === G ? f.apply(a) : f)) + "-treeicon-",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "'></i></button>\n                        ",
        g = c.if_eq || a && a.if_eq,
        h = {
            hash: {},
            inverse: F.programWithDepth(16, p, b, d),
            fn: F.programWithDepth(14, o, b, d),
            data: b
        },
        f = g ? g.call(a, a && a.definitionStatus, "Primitive", h) : D.call(a, "if_eq", a && a.definitionStatus, "Primitive", h),
        (f || 0 === f) && (i += f),
        i += "\n                        ",
        g = c.hasCountryIcon || a && a.hasCountryIcon,
        h = {
            hash: {},
            inverse: F.noop,
            fn: F.program(18, q, b),
            data: b
        },
        f = g ? g.call(a, a && a.module, h) : D.call(a, "hasCountryIcon", a && a.module, h),
        (f || 0 === f) && (i += f),
        i += '\n                        <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;">\n                            <span class="treeLabel selectable-row" data-module="',
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + '" data-concept-id="',
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + '" data-term="',
        (g = c.defaultTerm) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.defaultTerm,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + '" id="' + E((f = e && e.divElementId,
        typeof f === G ? f.apply(a) : f)) + "-treenode-",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + '">',
        (g = c.defaultTerm) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.defaultTerm,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "</span>\n                        </a>\n                    </li>\n                "
    }
    function k(a, b) {
        var d, e, f;
        return e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: F.program(10, m, b),
            fn: F.program(8, l, b),
            data: b
        },
        d = e ? e.call(a, a && a.isLeafInferred, !0, f) : D.call(a, "if_eq", a && a.isLeafInferred, !0, f),
        d || 0 === d ? d : ""
    }
    function l(a, b) {
        return "minus"
    }
    function m(a, b) {
        return "chevron-right"
    }
    function n(a, b) {
        var d, e, f;
        return e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: F.program(10, m, b),
            fn: F.program(8, l, b),
            data: b
        },
        d = e ? e.call(a, a && a.isLeafStated, !0, f) : D.call(a, "if_eq", a && a.isLeafStated, !0, f),
        d || 0 === d ? d : ""
    }
    function o(a, b, d) {
        var e, f, g = "";
        return g += '\n                            <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + E((e = d && d.divElementId,
        typeof e === G ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" data-term="',
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                        '
    }
    function p(a, b, d) {
        var e, f, g = "";
        return g += '\n                            <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + E((e = d && d.divElementId,
        typeof e === G ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" data-term="',
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '">&equiv;</span>&nbsp;&nbsp;\n                        '
    }
    function q(a, b) {
        var d, e, f = "";
        return f += '\n                            <div class="phoca-flagbox" style="width:26px;height:26px">\n                                <span class="phoca-flag ' + E((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : D.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                            </div>\n                        '
    }
    function r(a, b) {
        var d, e, f, g = "";
        return g += "\n    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: F.program(23, t, b),
            fn: F.program(21, s, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.childrenResult,
        null == d || !1 === d ? d : d.length), 0, f) : D.call(a, "if_eq", (d = a && a.childrenResult,
        null == d || !1 === d ? d : d.length), 0, f),
        (d || 0 === d) && (g += d),
        g += "\n"
    }
    function s(a, b) {
        var d, e, f = "";
        return f += '\n        <span data-i18n-id="i18n_no_children" class="text-muted i18n">' + E((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_no_children", "No children", e) : D.call(a, "i18n", "i18n_no_children", "No children", e))) + "</span>\n    "
    }
    function t(a, b) {
        var d, e, f, g = "";
        return g += "\n        ",
        e = c.if_gr || a && a.if_gr,
        f = {
            hash: {},
            inverse: F.program(26, v, b),
            fn: F.program(24, u, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.childrenResult,
        null == d || !1 === d ? d : d.length), 30, f) : D.call(a, "if_gr", (d = a && a.childrenResult,
        null == d || !1 === d ? d : d.length), 30, f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function u(a, b) {
        var d, e, f, g = "";
        return g += '\n            <button id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === G ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += E(d) + '-showChildren" class="btn btn-link">' + E((d = a && a.childrenResult,
        d = null == d || !1 === d ? d : d.length,
        typeof d === G ? d.apply(a) : d)) + ' <span data-i18n-id="i18n_children" class="i18n">' + E((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_children", "children", f) : D.call(a, "i18n", "i18n_children", "children", f))) + "</span></button>\n        "
    }
    function v(a, b) {
        var d, e = "";
        return e += "\n            <ul style='list-style-type: none; padding-left: 15px;'>\n                ",
        d = c.each.call(a, a && a.childrenResult, {
            hash: {},
            inverse: F.noop,
            fn: F.programWithDepth(27, w, b, a),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n            </ul>\n        "
    }
    function w(a, b, d) {
        var e, f = "";
        return f += "\n                    ",
        e = c.if.call(a, a && a.active, {
            hash: {},
            inverse: F.noop,
            fn: F.programWithDepth(28, x, b, a, d),
            data: b
        }),
        (e || 0 === e) && (f += e),
        f += "\n                "
    }
    function x(a, b, d, e) {
        var f, g, h, i = "";
        return i += '\n                        <li data-module="',
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "\" data-concept-id='",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "' data-term='",
        (g = c.defaultTerm) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.defaultTerm,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "' class='treeLabel'>\n                            <button class='btn btn-link btn-xs treeButton' style='padding:2px'><i class='glyphicon glyphicon-",
        g = c.if_eq || e && e.if_eq,
        h = {
            hash: {},
            inverse: F.program(12, n, b),
            fn: F.program(7, k, b),
            data: b
        },
        f = g ? g.call(a, e && e.selectedView, "inferred", h) : D.call(a, "if_eq", e && e.selectedView, "inferred", h),
        (f || 0 === f) && (i += f),
        i += " treeButton' id='" + E((f = e && e.divElementId,
        typeof f === G ? f.apply(a) : f)) + "-treeicon-",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "'></i></button>\n                            ",
        g = c.if_eq || a && a.if_eq,
        h = {
            hash: {},
            inverse: F.programWithDepth(31, z, b, d),
            fn: F.programWithDepth(29, y, b, d),
            data: b
        },
        f = g ? g.call(a, a && a.definitionStatus, "Primitive", h) : D.call(a, "if_eq", a && a.definitionStatus, "Primitive", h),
        (f || 0 === f) && (i += f),
        i += "\n                            ",
        g = c.hasCountryIcon || a && a.hasCountryIcon,
        h = {
            hash: {},
            inverse: F.noop,
            fn: F.program(33, A, b),
            data: b
        },
        f = g ? g.call(a, a && a.module, h) : D.call(a, "hasCountryIcon", a && a.module, h),
        (f || 0 === f) && (i += f),
        i += '\n                            <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;">\n                                <span class="treeLabel selectable-row" data-module="',
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + '" data-concept-id="',
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + '" data-term="',
        (g = c.defaultTerm) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.defaultTerm,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + '" id="' + E((f = e && e.divElementId,
        typeof f === G ? f.apply(a) : f)) + "-treenode-",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + '">',
        (g = c.defaultTerm) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.defaultTerm,
        f = typeof g === G ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += E(f) + "</span>\n                            </a>\n                        </li>\n                    "
    }
    function y(a, b, d) {
        var e, f, g = "";
        return g += '\n                                <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + E((e = d && d.divElementId,
        typeof e === G ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" data-term="',
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                            '
    }
    function z(a, b, d) {
        var e, f, g = "";
        return g += '\n                                <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + E((e = d && d.divElementId,
        typeof e === G ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '" data-term="',
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === G ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += E(e) + '">&equiv;</span>&nbsp;&nbsp;\n                            '
    }
    function A(a, b) {
        var d, e, f = "";
        return f += '\n                                <div class="phoca-flagbox" style="width:26px;height:26px">\n                                    <span class="phoca-flag ' + E((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : D.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                                </div>\n                            '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var B, C = "", D = c.helperMissing, E = this.escapeExpression, F = this, G = "function";
    return B = c.if.call(b, b && b.displayChildren, {
        hash: {},
        inverse: F.program(20, r, e),
        fn: F.program(1, f, e),
        data: e
    }),
    (B || 0 === B) && (C += B),
    C += "\n\n\n"
}),
this.JST["views/conceptDetailsPlugin/tabs/home/parents.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, i = "";
        return i += "\n    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: C.programWithDepth(4, h, b, a),
            fn: C.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.statedParents,
        null == d || !1 === d ? d : d.length), 0, f) : z.call(a, "if_eq", (d = a && a.statedParents,
        null == d || !1 === d ? d : d.length), 0, f),
        (d || 0 === d) && (i += d),
        i += "\n"
    }
    function g(a, b) {
        return "\n        <span class='text-muted'>No parents</span>\n    "
    }
    function h(a, b, d) {
        var e, f = "";
        return f += "\n        <ul style='list-style-type: none; padding-left: 2px;'>\n            ",
        e = c.each.call(a, a && a.statedParents, {
            hash: {},
            inverse: C.noop,
            fn: C.programWithDepth(5, i, b, a, d),
            data: b
        }),
        (e || 0 === e) && (f += e),
        f += "\n        </ul>\n    "
    }
    function i(a, b, d, e) {
        var f, g, h, i = "";
        return i += '\n                <li class="treeLabel" data-concept-id=\'' + A((f = a && a.target,
        f = null == f || !1 === f ? f : f.conceptId,
        typeof f === B ? f.apply(a) : f)) + '\'>\n                \x3c!--<span draggable = "true" ondragstart="drag(event, \'',
        (g = c.divElementId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.divElementId,
        f = typeof g === B ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += A(f) + "')\" class='text-warning' data-module=\"" + A((f = a && a.target,
        f = null == f || !1 === f ? f : f.module,
        typeof f === B ? f.apply(a) : f)) + "\" data-concept-id='" + A((f = a && a.type,
        f = null == f || !1 === f ? f : f.conceptId,
        typeof f === B ? f.apply(a) : f)) + "' data-term='" + A((f = a && a.type,
        f = null == f || !1 === f ? f : f.defaultTerm,
        typeof f === B ? f.apply(a) : f)) + "'>--\x3e\n                    \x3c!--",
        g = c.if_gr || a && a.if_gr,
        h = {
            hash: {},
            inverse: C.program(8, k, b),
            fn: C.program(6, j, b),
            data: b
        },
        f = g ? g.call(a, (f = a && a.type,
        null == f || !1 === f ? f : f.defaultTerm), 0, h) : z.call(a, "if_gr", (f = a && a.type,
        null == f || !1 === f ? f : f.defaultTerm), 0, h),
        (f || 0 === f) && (i += f),
        i += "--\x3e\n                \x3c!--</span>&nbsp;&rArr;&nbsp;--\x3e\n                    <button class='btn btn-link btn-xs treeButton' style='padding:2px'><i class='glyphicon glyphicon-",
        g = c.if_eq || a && a.if_eq,
        h = {
            hash: {},
            inverse: C.program(12, m, b),
            fn: C.program(10, l, b),
            data: b
        },
        f = g ? g.call(a, (f = a && a.target,
        null == f || !1 === f ? f : f.conceptId), "138875005", h) : z.call(a, "if_eq", (f = a && a.target,
        null == f || !1 === f ? f : f.conceptId), "138875005", h),
        (f || 0 === f) && (i += f),
        i += ' treeButton\' data-first="true" data-ind="' + A((f = null == b || !1 === b ? b : b.index,
        typeof f === B ? f.apply(a) : f)) + '"></i></button>\n                    ',
        g = c.if_eq || a && a.if_eq,
        h = {
            hash: {},
            inverse: C.programWithDepth(17, p, b, d),
            fn: C.programWithDepth(15, o, b, d),
            data: b
        },
        f = g ? g.call(a, (f = a && a.target,
        null == f || !1 === f ? f : f.definitionStatus), "Primitive", h) : z.call(a, "if_eq", (f = a && a.target,
        null == f || !1 === f ? f : f.definitionStatus), "Primitive", h),
        (f || 0 === f) && (i += f),
        i += "\n                    ",
        g = c.hasCountryIcon || a && a.hasCountryIcon,
        h = {
            hash: {},
            inverse: C.noop,
            fn: C.program(19, q, b),
            data: b
        },
        f = g ? g.call(a, (f = a && a.target,
        null == f || !1 === f ? f : f.module), h) : z.call(a, "hasCountryIcon", (f = a && a.target,
        null == f || !1 === f ? f : f.module), h),
        (f || 0 === f) && (i += f),
        i += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;">\n                        ',
        g = c.if_eq || a && a.if_eq,
        h = {
            hash: {},
            inverse: C.programWithDepth(23, s, b, e),
            fn: C.programWithDepth(21, r, b, e),
            data: b
        },
        f = g ? g.call(a, (f = a && a.target,
        null == f || !1 === f ? f : f.definitionStatus), "Primitive", h) : z.call(a, "if_eq", (f = a && a.target,
        null == f || !1 === f ? f : f.definitionStatus), "Primitive", h),
        (f || 0 === f) && (i += f),
        i += "\n                        " + A((f = a && a.target,
        f = null == f || !1 === f ? f : f.defaultTerm,
        typeof f === B ? f.apply(a) : f)) + "\n                        </span>\n                    </a>\n                </li>\n            "
    }
    function j(a, b) {
        var d, e, f, g = "";
        return g += "--\x3e\n                        \x3c!--" + A((e = c.substr || a && a.substr,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.defaultTerm), 0, f) : z.call(a, "substr", (d = a && a.type,
        null == d || !1 === d ? d : d.defaultTerm), 0, f))) + "--\x3e\n                    \x3c!--"
    }
    function k(a, b) {
        var c, d = "";
        return d += "--\x3e\n                        \x3c!--" + A((c = a && a.type,
        c = null == c || !1 === c ? c : c.defaultTerm,
        typeof c === B ? c.apply(a) : c)) + "--\x3e\n                    \x3c!--"
    }
    function l(a, b) {
        return "minus"
    }
    function m(a, b) {
        var d, e, f;
        return e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: C.program(13, n, b),
            fn: C.program(10, l, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.target,
        null == d || !1 === d ? d : d.conceptId), "9999999999", f) : z.call(a, "if_eq", (d = a && a.target,
        null == d || !1 === d ? d : d.conceptId), "9999999999", f),
        d || 0 === d ? d : ""
    }
    function n(a, b) {
        return "chevron-right"
    }
    function o(a, b, c) {
        var d, e = "";
        return e += '\n                        <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + A((d = c && c.divElementId,
        typeof d === B ? d.apply(a) : d)) + '\')" data-module="' + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                    '
    }
    function p(a, b, c) {
        var d, e = "";
        return e += '\n                        <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + A((d = c && c.divElementId,
        typeof d === B ? d.apply(a) : d)) + '\')" data-module="' + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '">&equiv;</span>&nbsp;&nbsp;\n                    '
    }
    function q(a, b) {
        var d, e, f = "";
        return f += '\n                        <div class="phoca-flagbox" style="width:26px;height:26px">\n                            <span class="phoca-flag ' + A((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : z.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                        </div>\n                    '
    }
    function r(a, b, c) {
        var d, e = "";
        return e += "\n                            <span id='" + A((d = null == b || !1 === b ? b : b.index,
        typeof d === B ? d.apply(a) : d)) + A((d = c && c.divElementId,
        typeof d === B ? d.apply(a) : d)) + "-treeicon-" + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + "' class='sct-primitive-concept-compact' data-module=\"" + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + "\" data-concept-id='" + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + "' data-term='" + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "'>\n                        "
    }
    function s(a, b, c) {
        var d, e = "";
        return e += "\n                            <span id='" + A((d = null == b || !1 === b ? b : b.index,
        typeof d === B ? d.apply(a) : d)) + A((d = c && c.divElementId,
        typeof d === B ? d.apply(a) : d)) + "-treeicon-" + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + "' class='sct-defined-concept-compact' data-module=\"" + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + "\" data-concept-id='" + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + "' data-term='" + A((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "'>\n                        "
    }
    function t(a, b) {
        var d, e, f, h = "";
        return h += "\n    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: C.programWithDepth(26, u, b, a),
            fn: C.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.inferredParents,
        null == d || !1 === d ? d : d.length), 0, f) : z.call(a, "if_eq", (d = a && a.inferredParents,
        null == d || !1 === d ? d : d.length), 0, f),
        (d || 0 === d) && (h += d),
        h += "\n"
    }
    function u(a, b, d) {
        var e, f = "";
        return f += "\n        <ul style='list-style-type: none; padding-left: 2px; padding-top: 0px;'>\n            ",
        e = c.each.call(a, a && a.inferredParents, {
            hash: {},
            inverse: C.noop,
            fn: C.programWithDepth(27, v, b, a, d),
            data: b
        }),
        (e || 0 === e) && (f += e),
        f += "\n        </ul>\n    "
    }
    function v(a, b, d, e) {
        var f, g, h, i = "";
        return i += '\n                <li class="treeLabel" data-concept-id=\'' + A((f = a && a.target,
        f = null == f || !1 === f ? f : f.conceptId,
        typeof f === B ? f.apply(a) : f)) + '\'>\n                \x3c!--<span draggable = "true" ondragstart="drag(event, \'',
        (g = c.divElementId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.divElementId,
        f = typeof g === B ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        i += A(f) + "')\" class='text-warning' data-module=\"" + A((f = a && a.target,
        f = null == f || !1 === f ? f : f.module,
        typeof f === B ? f.apply(a) : f)) + "\" data-concept-id='" + A((f = a && a.type,
        f = null == f || !1 === f ? f : f.conceptId,
        typeof f === B ? f.apply(a) : f)) + "' data-term='" + A((f = a && a.type,
        f = null == f || !1 === f ? f : f.defaultTerm,
        typeof f === B ? f.apply(a) : f)) + "'>--\x3e\n                    \x3c!--" + A((f = a && a.type,
        f = null == f || !1 === f ? f : f.defaultTerm,
        typeof f === B ? f.apply(a) : f)) + "--\x3e\n                \x3c!--</span>&nbsp;&rArr;&nbsp;--\x3e\n                    <button class='btn btn-link btn-xs treeButton' style='padding:2px'><i class='glyphicon glyphicon-",
        g = c.if_eq || a && a.if_eq,
        h = {
            hash: {},
            inverse: C.program(12, m, b),
            fn: C.program(10, l, b),
            data: b
        },
        f = g ? g.call(a, (f = a && a.target,
        null == f || !1 === f ? f : f.conceptId), "138875005", h) : z.call(a, "if_eq", (f = a && a.target,
        null == f || !1 === f ? f : f.conceptId), "138875005", h),
        (f || 0 === f) && (i += f),
        i += ' treeButton\' data-first="true" data-ind="' + A((f = null == b || !1 === b ? b : b.index,
        typeof f === B ? f.apply(a) : f)) + '"></i></button>\n                    ',
        g = c.if_eq || a && a.if_eq,
        h = {
            hash: {},
            inverse: C.programWithDepth(17, p, b, d),
            fn: C.programWithDepth(15, o, b, d),
            data: b
        },
        f = g ? g.call(a, (f = a && a.target,
        null == f || !1 === f ? f : f.definitionStatus), "Primitive", h) : z.call(a, "if_eq", (f = a && a.target,
        null == f || !1 === f ? f : f.definitionStatus), "Primitive", h),
        (f || 0 === f) && (i += f),
        i += "\n                    ",
        g = c.hasCountryIcon || a && a.hasCountryIcon,
        h = {
            hash: {},
            inverse: C.noop,
            fn: C.program(19, q, b),
            data: b
        },
        f = g ? g.call(a, (f = a && a.target,
        null == f || !1 === f ? f : f.module), h) : z.call(a, "hasCountryIcon", (f = a && a.target,
        null == f || !1 === f ? f : f.module), h),
        (f || 0 === f) && (i += f),
        i += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;">\n                        ',
        g = c.if_eq || a && a.if_eq,
        h = {
            hash: {},
            inverse: C.programWithDepth(23, s, b, e),
            fn: C.programWithDepth(21, r, b, e),
            data: b
        },
        f = g ? g.call(a, (f = a && a.target,
        null == f || !1 === f ? f : f.definitionStatus), "Primitive", h) : z.call(a, "if_eq", (f = a && a.target,
        null == f || !1 === f ? f : f.definitionStatus), "Primitive", h),
        (f || 0 === f) && (i += f),
        i += "\n                        " + A((f = a && a.target,
        f = null == f || !1 === f ? f : f.defaultTerm,
        typeof f === B ? f.apply(a) : f)) + "\n                        </span>\n                    </a>\n                </li>\n            "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var w, x, y, z = c.helperMissing, A = this.escapeExpression, B = "function", C = this;
    return x = c.if_eq || b && b.if_eq,
    y = {
        hash: {},
        inverse: C.program(25, t, e),
        fn: C.program(1, f, e),
        data: e
    },
    w = x ? x.call(b, (w = b && b.options,
    null == w || !1 === w ? w : w.selectedView), "stated", y) : z.call(b, "if_eq", (w = b && b.options,
    null == w || !1 === w ? w : w.selectedView), "stated", y),
    w || 0 === w ? w : ""
}),
this.JST["views/conceptDetailsPlugin/tabs/home/roles.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, h = "";
        return h += "\n        ",
        d = c.each.call(a, a && a.statedRoles, {
            hash: {},
            inverse: A.noop,
            fn: A.program(2, g, b),
            data: b
        }),
        (d || 0 === d) && (h += d),
        h += "\n        </div>\n        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: A.noop,
            fn: A.program(14, n, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.statedRoles,
        null == d || !1 === d ? d : d.length), 0, f) : y.call(a, "if_eq", (d = a && a.statedRoles,
        null == d || !1 === d ? d : d.length), 0, f),
        (d || 0 === d) && (h += d),
        h += "\n    "
    }
    function g(a, b) {
        var d, e, f, g = "";
        return g += "\n            \x3c!--<br>--\x3e\n            ",
        e = c.eqLastGroup || a && a.eqLastGroup,
        f = {
            hash: {},
            inverse: A.program(8, k, b),
            fn: A.program(3, h, b),
            data: b
        },
        d = e ? e.call(a, a && a.groupId, f) : y.call(a, "eqLastGroup", a && a.groupId, f),
        (d || 0 === d) && (g += d),
        g += '\n            &nbsp;<span draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += z(d) + "')\" class='sct-attribute-compact' data-module=\"" + z((d = a && a.type,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + "\" data-concept-id='" + z((d = a && a.type,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + "' data-term='" + z((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "'>\n                " + z((e = c.removeSemtag || a && a.removeSemtag,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.defaultTerm), f) : y.call(a, "removeSemtag", (d = a && a.type,
        null == d || !1 === d ? d : d.defaultTerm), f))) + "</span>&nbsp;&rarr;&nbsp;\n\n            ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: A.program(12, m, b),
            fn: A.program(10, l, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.target,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : y.call(a, "if_eq", (d = a && a.target,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n            " + z((e = c.removeSemtag || a && a.removeSemtag,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.target,
        null == d || !1 === d ? d : d.defaultTerm), f) : y.call(a, "removeSemtag", (d = a && a.target,
        null == d || !1 === d ? d : d.defaultTerm), f))) + "\n            </span><br>\n        "
    }
    function h(a, b) {
        var d, e, f, g = "";
        return g += "\n                </div>\n                " + z((e = c.setLastGroup || a && a.setLastGroup,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, a && a.groupId, f) : y.call(a, "setLastGroup", a && a.groupId, f))) + "\n                " + z((e = c.lastColor || a && a.lastColor,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "random", f) : y.call(a, "lastColor", "random", f))) + "\n                <div ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: A.program(6, j, b),
            fn: A.program(4, i, b),
            data: b
        },
        d = e ? e.call(a, a && a.groupId, 0, f) : y.call(a, "if_eq", a && a.groupId, 0, f),
        (d || 0 === d) && (g += d),
        g += ">\n                <span style='background-color: " + z((e = c.lastColor || a && a.lastColor,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "get", f) : y.call(a, "lastColor", "get", f))) + "'></span>\n            "
    }
    function i(a, b) {
        return ""
    }
    function j(a, b) {
        return 'style="border: 1px solid darkgrey; border-radius: 4px; padding: 3px; background-color: white; margin: 5px;"'
    }
    function k(a, b) {
        var d, e, f = "";
        return f += "\n                <span style='background-color: " + z((d = c.lastColor || a && a.lastColor,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "get", e) : y.call(a, "lastColor", "get", e))) + "'></span>\n            "
    }
    function l(a, b) {
        var d, e, f = "";
        return f += '\n                <span draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += z(d) + "')\" class='sct-primitive-concept-compact' data-module=\"" + z((d = a && a.target,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + "\" data-concept-id='" + z((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + "' data-term='" + z((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "'>\n            "
    }
    function m(a, b) {
        var d, e, f = "";
        return f += '\n                <span draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += z(d) + "')\" class='sct-defined-concept-compact' data-module=\"" + z((d = a && a.target,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + "\" data-concept-id='" + z((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + "' data-term='" + z((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "'>\n            "
    }
    function n(a, b) {
        var d, e, f = "";
        return f += "\n            <span class='i18n text-muted' data-i18n-id='i18n_no_attributes'>" + z((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_no_attributes", "No relationships", e) : y.call(a, "i18n", "i18n_no_attributes", "No relationships", e))) + "</span>\n        "
    }
    function o(a, b) {
        var d, e, f, g = "";
        return g += "\n        ",
        d = c.each.call(a, a && a.inferredRoles, {
            hash: {},
            inverse: A.noop,
            fn: A.program(17, p, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n        </div>\n        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: A.noop,
            fn: A.program(14, n, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.inferredRoles,
        null == d || !1 === d ? d : d.length), 0, f) : y.call(a, "if_eq", (d = a && a.inferredRoles,
        null == d || !1 === d ? d : d.length), 0, f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function p(a, b) {
        var d, e, f, g = "";
        return g += "\n            \x3c!--<br>inferred--\x3e\n                    ",
        e = c.eqLastGroup || a && a.eqLastGroup,
        f = {
            hash: {},
            inverse: A.program(20, r, b),
            fn: A.program(18, q, b),
            data: b
        },
        d = e ? e.call(a, a && a.groupId, f) : y.call(a, "eqLastGroup", a && a.groupId, f),
        (d || 0 === d) && (g += d),
        g += "\n                    &nbsp;<span style='background-color: " + z((e = c.lastColor || a && a.lastColor,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "get", f) : y.call(a, "lastColor", "get", f))) + '\' draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += z(d) + "')\" class='sct-attribute-compact' data-module=\"" + z((d = a && a.type,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + "\" data-concept-id='" + z((d = a && a.type,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + "' data-term='" + z((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "'>\n                    " + z((e = c.removeSemtag || a && a.removeSemtag,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.defaultTerm), f) : y.call(a, "removeSemtag", (d = a && a.type,
        null == d || !1 === d ? d : d.defaultTerm), f))) + '</span>&nbsp;&rarr;&nbsp;\n            <span draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += z(d) + "')\" class='\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: A.program(24, t, b),
            fn: A.program(22, s, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.target,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : y.call(a, "if_eq", (d = a && a.target,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                ' data-module=\"" + z((d = a && a.target,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + "\" data-concept-id='" + z((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + "' data-term='" + z((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "'>\n                " + z((e = c.removeSemtag || a && a.removeSemtag,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.target,
        null == d || !1 === d ? d : d.defaultTerm), f) : y.call(a, "removeSemtag", (d = a && a.target,
        null == d || !1 === d ? d : d.defaultTerm), f))) + "</span><br>\n        "
    }
    function q(a, b) {
        var d, e, f, g = "";
        return g += "\n                        </div>\n                        " + z((e = c.setLastGroup || a && a.setLastGroup,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, a && a.groupId, f) : y.call(a, "setLastGroup", a && a.groupId, f))) + "\n                        " + z((e = c.lastColor || a && a.lastColor,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "random", f) : y.call(a, "lastColor", "random", f))) + "\n                        <div ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: A.program(6, j, b),
            fn: A.program(4, i, b),
            data: b
        },
        d = e ? e.call(a, a && a.groupId, 0, f) : y.call(a, "if_eq", a && a.groupId, 0, f),
        (d || 0 === d) && (g += d),
        g += ">\n                        <span style='background-color: " + z((e = c.lastColor || a && a.lastColor,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "get", f) : y.call(a, "lastColor", "get", f))) + "'></span>\n                    "
    }
    function r(a, b) {
        var d, e, f = "";
        return f += "\n                        <span style='background-color: " + z((d = c.lastColor || a && a.lastColor,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "get", e) : y.call(a, "lastColor", "get", e))) + "'></span>\n                    "
    }
    function s(a, b) {
        return "\n                     sct-primitive-concept-compact\n                "
    }
    function t(a, b) {
        return "\n                     sct-defined-concept-compact\n                "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var u, v, w, x = "", y = c.helperMissing, z = this.escapeExpression, A = this, B = "function";
    return x += "<div style='line-height: 100%;'>\n    " + z((v = c.setLastGroup || b && b.setLastGroup,
    w = {
        hash: {},
        data: e
    },
    v ? v.call(b, b && b.null, w) : y.call(b, "setLastGroup", b && b.null, w))) + "\n    ",
    v = c.if_eq || b && b.if_eq,
    w = {
        hash: {},
        inverse: A.program(16, o, e),
        fn: A.program(1, f, e),
        data: e
    },
    u = v ? v.call(b, (u = b && b.options,
    null == u || !1 === u ? u : u.selectedView), "stated", w) : y.call(b, "if_eq", (u = b && b.options,
    null == u || !1 === u ? u : u.selectedView), "stated", w),
    (u || 0 === u) && (x += u),
    x += "\n</div>\n"
}),
this.JST["views/conceptDetailsPlugin/tabs/members.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f = "";
        return f += '\n    <thead>\n        <tr>\n            <th><span data-i18n-id="i18n_term" class="i18n">' + t((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_term", "Term", e) : s.call(a, "i18n", "i18n_term", "Term", e))) + '</span></th>\n            <th><span data-i18n-id="i18n_conceptId" class="i18n">' + t((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_conceptId", "Concept Id", e) : s.call(a, "i18n", "i18n_conceptId", "Concept Id", e))) + "</span></th>\n        </tr>\n    </thead>\n"
    }
    function g(a, b, d) {
        var e, f, g, i = "";
        return i += '\n        <tr class="member-row">\n            <td data-concept-id=\'',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "'>\n                <span class=\"badge alert-warning\" draggable='true' ondragstart=\"drag(event, '" + t((e = d && d.divElementId,
        typeof e === u ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "'>&nbsp;&nbsp;</span>\n                ",
        f = c.hasCountryIcon || a && a.hasCountryIcon,
        g = {
            hash: {},
            inverse: v.noop,
            fn: v.program(4, h, b),
            data: b
        },
        e = f ? f.call(a, a && a.module, g) : s.call(a, "hasCountryIcon", a && a.module, g),
        (e || 0 === e) && (i += e),
        i += "\n                ",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "\n            </td>\n            <td>",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "</td>\n        </tr>\n    "
    }
    function h(a, b) {
        var d, e, f = "";
        return f += '\n                    <div class="phoca-flagbox" style="width:22px;height:22px">\n                        <span class="phoca-flag ' + t((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : s.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                    </div>\n                '
    }
    function i(a, b) {
        var d, e, f, g = "";
        return g += '\n            <td class="text-center" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + "-moreMembers\" colspan=\"2\">\n                <button class='btn btn-link' id='",
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + '-moreMembers\'><span data-i18n-id="i18n_load" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_load", "Load", f) : s.call(a, "i18n", "i18n_load", "Load", f))) + "</span> ",
        (e = c.returnLimit) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.returnLimit,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_more" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_more", "more", f) : s.call(a, "i18n", "i18n_more", "more", f))) + "</span></button>\n            </td>\n        "
    }
    function j(a, b) {
        var d, e, f, g = "";
        return g += "\n            ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: v.program(11, l, b),
            fn: v.program(9, k, b),
            data: b
        },
        d = e ? e.call(a, a && a.remaining, 0, f) : s.call(a, "if_eq", a && a.remaining, 0, f),
        (d || 0 === d) && (g += d),
        g += "\n        "
    }
    function k(a, b) {
        var c, d = "";
        return d += '\n                <td class="text-muted" class="text-center" colspan="2">' + t((c = a && a.result,
        c = null == c || !1 === c ? c : c.details,
        c = null == c || !1 === c ? c : c.total,
        typeof c === u ? c.apply(a) : c)) + ' <span data-i18n-id="i18n_members" class="i18n">members</span></td>\n            '
    }
    function l(a, b) {
        var d, e, f, g = "";
        return g += "\n                ",
        e = c.if_gr || a && a.if_gr,
        f = {
            hash: {},
            inverse: v.program(14, n, b),
            fn: v.program(12, m, b),
            data: b
        },
        d = e ? e.call(a, a && a.remaining, a && a.returnLimit, f) : s.call(a, "if_gr", a && a.remaining, a && a.returnLimit, f),
        (d || 0 === d) && (g += d),
        g += "\n            "
    }
    function m(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <td class="text-center" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + "-moreMembers\" colspan=\"2\">\n                        <button class='btn btn-link' id='",
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + '-moreMembers\'><span data-i18n-id="i18n_load" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_load", "Load", f) : s.call(a, "i18n", "i18n_load", "Load", f))) + "</span> ",
        (e = c.returnLimit) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.returnLimit,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_more" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_more", "more", f) : s.call(a, "i18n", "i18n_more", "more", f))) + "</span> (",
        (e = c.remaining) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.remaining,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_remaining" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_remaining", "remaining", f) : s.call(a, "i18n", "i18n_remaining", "remaining", f))) + "</span>)</button>\n                    </td>\n                "
    }
    function n(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <td class="text-center" colspan="2">\n                        <button class=\'btn btn-link\' id=\'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + '-moreMembers\'><span data-i18n-id="i18n_load" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_load", "Load", f) : s.call(a, "i18n", "i18n_load", "Load", f))) + "</span> ",
        (e = c.remaining) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.remaining,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_more" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_more", "more", f) : s.call(a, "i18n", "i18n_more", "more", f))) + "</span> (",
        (e = c.remaining) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.remaining,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_remaining" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_remaining", "remaining", f) : s.call(a, "i18n", "i18n_remaining", "remaining", f))) + "</span>)</button>\n                    </td>\n                "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var o, p, q, r = "", s = c.helperMissing, t = this.escapeExpression, u = "function", v = this;
    return p = c.if_eq || b && b.if_eq,
    q = {
        hash: {},
        inverse: v.noop,
        fn: v.program(1, f, e),
        data: e
    },
    o = p ? p.call(b, b && b.skipTo, 0, q) : s.call(b, "if_eq", b && b.skipTo, 0, q),
    (o || 0 === o) && (r += o),
    r += "\n<tbody>\n    ",
    o = c.each.call(b, (o = b && b.result,
    null == o || !1 === o ? o : o.members), {
        hash: {},
        inverse: v.noop,
        fn: v.programWithDepth(3, g, e, b),
        data: e
    }),
    (o || 0 === o) && (r += o),
    r += '\n\n    <tr class="more-row">\n        ',
    p = c.if_eq || b && b.if_eq,
    q = {
        hash: {},
        inverse: v.program(8, j, e),
        fn: v.program(6, i, e),
        data: e
    },
    o = p ? p.call(b, b && b.remaining, "asd", q) : s.call(b, "if_eq", b && b.remaining, "asd", q),
    (o || 0 === o) && (r += o),
    r += "\n    </tr>\n</tbody>"
}),
this.JST["views/conceptDetailsPlugin/tabs/product.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, k = "";
        return k += "\n        <tr>\n            <td>\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: D.program(4, h, b),
            fn: D.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : E.call(a, "if_eq", (d = a && a.type,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (k += d),
        k += "\n                " + C((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "\n            </td>\n            <td>\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: D.program(8, j, b),
            fn: D.program(6, i, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.target,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : E.call(a, "if_eq", (d = a && a.target,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (k += d),
        k += "\n                " + C((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "\n            </td>\n        </tr>\n    "
    }
    function g(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '" data-concept-id="' + C((d = a && a.type,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.type,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                '
    }
    function h(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '" data-concept-id="' + C((d = a && a.type,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.type,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.type,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                '
    }
    function i(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')"  data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '" data-concept-id="' + C((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.target,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                '
    }
    function j(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')"  data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '" data-concept-id="' + C((d = a && a.target,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.target,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.target,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                '
    }
    function k(a, b) {
        var d, e, f, g = "";
        return g += "\n        <tr>\n            <td>\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: D.program(13, m, b),
            fn: D.program(11, l, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.ingredient,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : E.call(a, "if_eq", (d = a && a.ingredient,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                " + C((d = a && a.ingredient,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '\n                <br>\n                &nbsp;&nbsp;&nbsp;<span class="text-muted"><em>' + C((d = a && a.boss,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + "</em></span>\n            </td>\n            <td>\n                ",
        d = c.if.call(a, a && a.numeratorValue, {
            hash: {},
            inverse: D.noop,
            fn: D.program(15, n, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n            </td>\n            <td>\n                ",
        d = c.if.call(a, a && a.numeratorUnit, {
            hash: {},
            inverse: D.noop,
            fn: D.program(20, q, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n            </td>\n            <td>\n                ",
        d = c.if.call(a, a && a.denominatorValue, {
            hash: {},
            inverse: D.noop,
            fn: D.program(25, t, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n            </td>\n            <td>\n                ",
        d = c.if.call(a, a && a.denominatorUnit, {
            hash: {},
            inverse: D.noop,
            fn: D.program(30, w, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n            </td>\n        </tr>\n    "
    }
    function l(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.ingredient,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.ingredient,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.ingredient,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.ingredient,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                '
    }
    function m(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.ingredient,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.ingredient,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.ingredient,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.ingredient,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                '
    }
    function n(a, b) {
        var d, e, f, g = "";
        return g += "\n                    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: D.program(18, p, b),
            fn: D.program(16, o, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.numeratorValue,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : E.call(a, "if_eq", (d = a && a.numeratorValue,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                    " + C((e = c.removeSemtag || a && a.removeSemtag,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.numeratorValue,
        null == d || !1 === d ? d : d.defaultTerm), f) : E.call(a, "removeSemtag", (d = a && a.numeratorValue,
        null == d || !1 === d ? d : d.defaultTerm), f))) + "\n                "
    }
    function o(a, b) {
        var d, e, f = "";
        return f += '\n                        <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.numeratorValue,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.numeratorValue,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.numeratorValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.numeratorValue,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                    '
    }
    function p(a, b) {
        var d, e, f = "";
        return f += '\n                        <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.numeratorValue,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.numeratorValue,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.numeratorValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.numeratorValue,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                    '
    }
    function q(a, b) {
        var d, e, f, g = "";
        return g += "\n                    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: D.program(23, s, b),
            fn: D.program(21, r, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.numeratorUnit,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : E.call(a, "if_eq", (d = a && a.numeratorUnit,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                    " + C((e = c.removeSemtag || a && a.removeSemtag,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.numeratorUnit,
        null == d || !1 === d ? d : d.defaultTerm), f) : E.call(a, "removeSemtag", (d = a && a.numeratorUnit,
        null == d || !1 === d ? d : d.defaultTerm), f))) + "\n                "
    }
    function r(a, b) {
        var d, e, f = "";
        return f += '\n                        <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.numeratorUnit,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.numeratorUnit,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.numeratorUnit,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.numeratorUnit,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                    '
    }
    function s(a, b) {
        var d, e, f = "";
        return f += '\n                        <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.numeratorUnit,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.numeratorUnit,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.numeratorUnit,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.numeratorUnit,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                    '
    }
    function t(a, b) {
        var d, e, f, g = "";
        return g += "\n                    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: D.program(28, v, b),
            fn: D.program(26, u, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.denominatorValue,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : E.call(a, "if_eq", (d = a && a.denominatorValue,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                    " + C((e = c.removeSemtag || a && a.removeSemtag,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.denominatorValue,
        null == d || !1 === d ? d : d.defaultTerm), f) : E.call(a, "removeSemtag", (d = a && a.denominatorValue,
        null == d || !1 === d ? d : d.defaultTerm), f))) + "\n                "
    }
    function u(a, b) {
        var d, e, f = "";
        return f += '\n                        <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.denominatorValue,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.denominatorValue,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.denominatorValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.denominatorValue,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                    '
    }
    function v(a, b) {
        var d, e, f = "";
        return f += '\n                        <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.denominatorValue,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.denominatorValue,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.denominatorValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.denominatorValue,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                    '
    }
    function w(a, b) {
        var d, e, f, g = "";
        return g += "\n                    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: D.program(33, y, b),
            fn: D.program(31, x, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.denominatorUnit,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : E.call(a, "if_eq", (d = a && a.denominatorUnit,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                    " + C((e = c.removeSemtag || a && a.removeSemtag,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.denominatorUnit,
        null == d || !1 === d ? d : d.defaultTerm), f) : E.call(a, "removeSemtag", (d = a && a.denominatorUnit,
        null == d || !1 === d ? d : d.defaultTerm), f))) + "\n                "
    }
    function x(a, b) {
        var d, e, f = "";
        return f += '\n                        <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.denominatorUnit,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.denominatorUnit,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.denominatorUnit,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.denominatorUnit,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                    '
    }
    function y(a, b) {
        var d, e, f = "";
        return f += '\n                        <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === B ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += C(d) + '\')" data-module="' + C((d = a && a.denominatorUnit,
        d = null == d || !1 === d ? d : d.module,
        typeof d === B ? d.apply(a) : d)) + '" data-concept-id="' + C((d = a && a.denominatorUnit,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === B ? d.apply(a) : d)) + '" data-term="' + C((d = a && a.denominatorUnit,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === B ? d.apply(a) : d)) + '" data-def-status="' + C((d = a && a.denominatorUnit,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === B ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                    '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var z, A = "", B = "function", C = this.escapeExpression, D = this, E = c.helperMissing;
    return A += "<br>\n<h4>&nbsp;&nbsp;&nbsp;" + C((z = b && b.productData,
    z = null == z || !1 === z ? z : z.defaultTerm,
    typeof z === B ? z.apply(b) : z)) + "</h4>\n<br>\n<table class='table table-bordered' id = ''>\n    <thead>\n        <tr><th colspan=\"2\">Dose form</th></tr>\n    </thead>\n    <tbody>\n    ",
    z = c.each.call(b, (z = b && b.productData,
    null == z || !1 === z ? z : z.forms), {
        hash: {},
        inverse: D.noop,
        fn: D.program(1, f, e),
        data: e
    }),
    (z || 0 === z) && (A += z),
    A += "\n    </tbody>\n</table>\n<br>\n<table class='table table-bordered' id = ''>\n    <thead>\n    <tr>\n        <th>Ingredient / BoSS</th>\n        <th colspan=\"2\">Strength Numerator</th>\n        <th colspan=\"2\">Strength Denominator</th>\n    </tr>\n    </thead>\n    <tbody>\n    ",
    z = c.each.call(b, (z = b && b.productData,
    null == z || !1 === z ? z : z.ingredients), {
        hash: {},
        inverse: D.noop,
        fn: D.program(10, k, e),
        data: e
    }),
    (z || 0 === z) && (A += z),
    A += "\n    </tbody>\n</table>"
}),
this.JST["views/conceptDetailsPlugin/tabs/references.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, l = "";
        return l += '\n    <div style="margin-top: 10px;" class="panel panel-default">\n        <div class="panel-heading">\n            <h3 style="font-size: 12px" class="panel-title">\n                <a style="text-decoration: inherit;" data-toggle="collapse" data-parent="#references-',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === t ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        l += s(d) + '-accordion" href="#references-' + s((d = null == b || !1 === b ? b : b.index,
        typeof d === t ? d.apply(a) : d)) + '">\n                    <span id="references-' + s((d = null == b || !1 === b ? b : b.index,
        typeof d === t ? d.apply(a) : d)) + '-span" class="references glyphicon glyphicon-',
        e = c.if_gr || a && a.if_gr,
        f = {
            hash: {},
            inverse: u.program(4, h, b),
            fn: u.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, a && a.length, 10, f) : r.call(a, "if_gr", a && a.length, 10, f),
        (d || 0 === d) && (l += d),
        l += '"></span>\n                </a>&nbsp;' + s((d = a && a[0],
        d = null == d || !1 === d ? d : d.relationship,
        typeof d === t ? d.apply(a) : d)) + " (",
        (e = c.length) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.length,
        d = typeof e === t ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        l += s(d) + ')\n            </h3>\n        </div>\n        <div id="references-' + s((d = null == b || !1 === b ? b : b.index,
        typeof d === t ? d.apply(a) : d)) + '" class="panel-collapse collapse ',
        e = c.if_gr || a && a.if_gr,
        f = {
            hash: {},
            inverse: u.program(8, j, b),
            fn: u.program(6, i, b),
            data: b
        },
        d = e ? e.call(a, a && a.length, 10, f) : r.call(a, "if_gr", a && a.length, 10, f),
        (d || 0 === d) && (l += d),
        l += '">\n            <div class="panel-body">\n                <table class="table table-hover table-bordered">\n                    <thead>\n                    <tr>\n                        <th>Term</th>\n                        <th>ConceptId</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    ',
        d = c.each.call(a, a, {
            hash: {},
            inverse: u.noop,
            fn: u.programWithDepth(10, k, b, a),
            data: b
        }),
        (d || 0 === d) && (l += d),
        l += "\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n"
    }
    function g(a, b) {
        return "chevron-right"
    }
    function h(a, b) {
        return "chevron-down"
    }
    function i(a, b) {
        return ""
    }
    function j(a, b) {
        return "in"
    }
    function k(a, b, d) {
        var e, f, g, h = "";
        return h += "\n                        <tr>\n                            <td>\n                                <span class=\"badge alert-warning\" draggable='true' ondragstart=\"drag(event, '" + s((e = d && d.divElementId,
        typeof e === t ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "'>&nbsp;&nbsp;</span>\n                                ",
        f = c.hasCountryIcon || a && a.hasCountryIcon,
        g = {
            hash: {},
            inverse: u.noop,
            fn: u.program(11, l, b),
            data: b
        },
        e = f ? f.call(a, a && a.module, g) : r.call(a, "hasCountryIcon", a && a.module, g),
        (e || 0 === e) && (h += e),
        h += "\n                                ",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "\n                            </td>\n                            <td>",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "</td>\n                        </tr>\n                    "
    }
    function l(a, b) {
        var d, e, f = "";
        return f += '\n                                    <div class="phoca-flagbox" style="width:22px;height:22px">\n                                        <span class="phoca-flag ' + s((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : r.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                                    </div>\n                                '
    }
    function m(a, b, d) {
        var e, f, g, h = "";
        return h += "--\x3e\n        \x3c!--<tr>--\x3e\n            \x3c!--<td>--\x3e\n                \x3c!--<span class=\"badge alert-warning\" draggable='true' ondragstart=\"drag(event, '" + s((e = d && d.divElementId,
        typeof e === t ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "'>&nbsp;&nbsp;</span>--\x3e\n                \x3c!--",
        f = c.hasCountryIcon || a && a.hasCountryIcon,
        g = {
            hash: {},
            inverse: u.noop,
            fn: u.program(14, n, b),
            data: b
        },
        e = f ? f.call(a, a && a.module, g) : r.call(a, "hasCountryIcon", a && a.module, g),
        (e || 0 === e) && (h += e),
        h += "--\x3e\n                \x3c!--",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "--\x3e\n            \x3c!--</td>--\x3e\n            \x3c!--<td>",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === t ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += s(e) + "</td>--\x3e\n            \x3c!--<td>--\x3e\n                \x3c!--",
        e = c.each.call(a, a && a.relationships, {
            hash: {},
            inverse: u.noop,
            fn: u.program(16, o, b),
            data: b
        }),
        (e || 0 === e) && (h += e),
        h += "--\x3e\n\n                \x3c!--",
        e = c.each.call(a, a && a.statedRelationships, {
            hash: {},
            inverse: u.noop,
            fn: u.program(16, o, b),
            data: b
        }),
        (e || 0 === e) && (h += e),
        h += "--\x3e\n            \x3c!--</td>--\x3e\n        \x3c!--</tr>--\x3e\n    \x3c!--"
    }
    function n(a, b) {
        var d, e, f = "";
        return f += '--\x3e\n                    \x3c!--<div class="phoca-flagbox" style="width:22px;height:22px">--\x3e\n                        \x3c!--<span class="phoca-flag ' + s((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : r.call(a, "countryIcon", a && a.module, e))) + '"></span>--\x3e\n                    \x3c!--</div>--\x3e\n                \x3c!--'
    }
    function o(a, b) {
        var c, d = "";
        return d += "--\x3e\n                    \x3c!--" + s((c = a && a.type,
        c = null == c || !1 === c ? c : c.defaultTerm,
        typeof c === t ? c.apply(a) : c)) + "--\x3e\n                \x3c!--"
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var p, q = "", r = c.helperMissing, s = this.escapeExpression, t = "function", u = this;
    return p = c.each.call(b, b && b.groups, {
        hash: {},
        inverse: u.noop,
        fn: u.program(1, f, e),
        data: e
    }),
    (p || 0 === p) && (q += p),
    q += "\n\n\x3c!--<thead>--\x3e\n    \x3c!--<tr>--\x3e\n        \x3c!--<th>Term</th>--\x3e\n        \x3c!--<th>ConceptId</th>--\x3e\n        \x3c!--<th>Relationships Type</th>--\x3e\n    \x3c!--</tr>--\x3e\n\x3c!--</thead>--\x3e\n\x3c!--<tbody>--\x3e\n    \x3c!--",
    p = c.each.call(b, b && b.result, {
        hash: {},
        inverse: u.noop,
        fn: u.programWithDepth(13, m, e, b),
        data: e
    }),
    (p || 0 === p) && (q += p),
    q += "--\x3e\n</tbody>"
}),
this.JST["views/conceptDetailsPlugin/tabs/refset.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, i = "";
        return i += "\n    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.program(4, h, b),
            fn: M.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, a && a.type, "SIMPLE_REFSET", f) : K.call(a, "if_eq", a && a.type, "SIMPLE_REFSET", f),
        (d || 0 === d) && (i += d),
        i += "\n"
    }
    function g(a, b) {
        var d, e, f = "";
        return f += "\n        " + L((d = c.refset || a && a.refset,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "simple", !0, e) : K.call(a, "refset", "simple", !0, e))) + "\n    "
    }
    function h(a, b) {
        var d, e, f, g = "";
        return g += "\n        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.program(7, j, b),
            fn: M.program(5, i, b),
            data: b
        },
        d = e ? e.call(a, a && a.type, "SIMPLEMAP", f) : K.call(a, "if_eq", a && a.type, "SIMPLEMAP", f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function i(a, b) {
        var d, e, f = "";
        return f += "\n            " + L((d = c.refset || a && a.refset,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "simplemap", !0, e) : K.call(a, "refset", "simplemap", !0, e))) + "\n        "
    }
    function j(a, b) {
        var d, e, f, g = "";
        return g += "\n            ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.program(10, l, b),
            fn: M.program(8, k, b),
            data: b
        },
        d = e ? e.call(a, a && a.type, "ATTRIBUTE_VALUE", f) : K.call(a, "if_eq", a && a.type, "ATTRIBUTE_VALUE", f),
        (d || 0 === d) && (g += d),
        g += "\n        "
    }
    function k(a, b) {
        var d, e, f = "";
        return f += "\n                " + L((d = c.refset || a && a.refset,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "attr", !0, e) : K.call(a, "refset", "attr", !0, e))) + "\n            "
    }
    function l(a, b) {
        var d, e, f = "";
        return f += "\n                " + L((d = c.refset || a && a.refset,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "assoc", !0, e) : K.call(a, "refset", "assoc", !0, e))) + "\n            "
    }
    function m(a, b) {
        var d, e, f, g = "";
        return g += "\n        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.noop,
            fn: M.program(13, n, b),
            data: b
        },
        d = e ? e.call(a, a && a.type, "SIMPLE_REFSET", f) : K.call(a, "if_eq", a && a.type, "SIMPLE_REFSET", f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function n(a, b) {
        var d, e, f, g = "";
        return g += "\n        <tr class='",
        d = c.if.call(a, a && a.active, {
            hash: {},
            inverse: M.program(16, p, b),
            fn: M.program(14, o, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "'>\n            <td>\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.program(20, r, b),
            fn: M.program(18, q, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.refset,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : K.call(a, "if_eq", (d = a && a.refset,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                " + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + "\n            </td>\n            <td>",
        (e = c.otherValue) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.otherValue,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + '</td>\n            <td>\n                <div class="phoca-flagbox" style="width:35px;height:35px">\n                    <span class="phoca-flag ' + L((e = c.countryIcon || a && a.countryIcon,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.refset,
        null == d || !1 === d ? d : d.module), f) : K.call(a, "countryIcon", (d = a && a.refset,
        null == d || !1 === d ? d : d.module), f))) + '"></span>\n                </div>\n                <button type="button" class="btn btn-link unobtrusive-icon more-fields-button pull-right" data-container="body" data-toggle="popover" data-placement="left" data-content="\n                    <table border=\'1\'>\n                        <tr><th style=\'padding: 3px;\'>RefsetId</th><th style=\'padding: 3px;\'>Effective Time</th><th style=\'padding: 3px;\'>ModuleId</th></tr>\n                        <tr><td style=\'padding: 3px;\'>' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + "</td><td style='padding: 3px;'>",
        (e = c.effectiveTime) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.effectiveTime,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + "</td><td style='padding: 3px;'>",
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + '</td></tr>\n                    </table>"data-html="true"><i class="glyphicon glyphicon-info-sign"></i>\n                </button>\n            </td>\n        </tr>\n        '
    }
    function o(a, b) {
        return ""
    }
    function p(a, b) {
        return "danger"
    }
    function q(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart = "drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += L(d) + '\')" data-module="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.module,
        typeof d === N ? d.apply(a) : d)) + '" data-concept-id="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + '" data-term="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '" data-def-status="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === N ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                '
    }
    function r(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart = "drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += L(d) + '\')" data-module="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.module,
        typeof d === N ? d.apply(a) : d)) + '" data-concept-id="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + '" data-term="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '" data-def-status="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === N ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                '
    }
    function s(a, b) {
        return "\n        </tbody>\n    "
    }
    function t(a, b) {
        return "\n        <tr><td><span class='i18n text-muted' data-i18n-id='i18n_no_memberships'>No memberships</span></td></tr>\n        </tbody>\n    "
    }
    function u(a, b) {
        var d, e, f, g = "";
        return g += "\n        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.noop,
            fn: M.program(27, v, b),
            data: b
        },
        d = e ? e.call(a, a && a.type, "SIMPLEMAP", f) : K.call(a, "if_eq", a && a.type, "SIMPLEMAP", f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function v(a, b) {
        var d, e, f, g = "";
        return g += "\n        <tr class='",
        d = c.if.call(a, a && a.active, {
            hash: {},
            inverse: M.program(16, p, b),
            fn: M.program(14, o, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "'>\n            <td>\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.program(30, x, b),
            fn: M.program(28, w, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.refset,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : K.call(a, "if_eq", (d = a && a.refset,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                " + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '\n            </td>\n            <td class="refset-simplemap" data-refsetId="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + '" data-conceptId="',
        (e = c.otherValue) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.otherValue,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + '">',
        (e = c.otherValue) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.otherValue,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + '</td>\n            <td>\n                <div class="phoca-flagbox" style="width:35px;height:35px">\n                    <span class="phoca-flag ' + L((e = c.countryIcon || a && a.countryIcon,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.refset,
        null == d || !1 === d ? d : d.module), f) : K.call(a, "countryIcon", (d = a && a.refset,
        null == d || !1 === d ? d : d.module), f))) + '"></span>\n                </div>\n                <button type="button" class="btn btn-link unobtrusive-icon more-fields-button pull-right" data-container="body" data-toggle="popover" data-placement="left" data-content="\n                    <table border=\'1\'><tr><th style=\'padding: 3px;\'>RefsetId</th><th style=\'padding: 3px;\'>Effective Time</th><th style=\'padding: 3px;\'>ModuleId</th></tr>\n                        <tr><td style=\'padding: 3px;\'>' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + "</td><td style='padding: 3px;'>",
        (e = c.effectiveTime) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.effectiveTime,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + "</td><td style='padding: 3px;'>",
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + '</td></tr>\n                    </table>\n                    " data-html="true"><i class="glyphicon glyphicon-info-sign"></i>\n                </button>\n            </td>\n        </tr>\n        '
    }
    function w(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart = "drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += L(d) + '\')" data-module="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.module,
        typeof d === N ? d.apply(a) : d)) + '"  data-concept-id="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + '" data-term="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '" data-def-status="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === N ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                '
    }
    function x(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart = "drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += L(d) + '\')" data-module="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.module,
        typeof d === N ? d.apply(a) : d)) + '"  data-concept-id="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + '" data-term="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '" data-def-status="' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === N ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                '
    }
    function y(a, b) {
        var d, e, f, g = "";
        return g += "\n        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.noop,
            fn: M.program(33, z, b),
            data: b
        },
        d = e ? e.call(a, a && a.type, "ATTRIBUTE_VALUE", f) : K.call(a, "if_eq", a && a.type, "ATTRIBUTE_VALUE", f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function z(a, b) {
        var d, e, f, g = "";
        return g += "\n        <tr class='",
        d = c.if.call(a, a && a.active, {
            hash: {},
            inverse: M.program(16, p, b),
            fn: M.program(14, o, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "'>\n            <td>\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.program(20, r, b),
            fn: M.program(18, q, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.refset,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : K.call(a, "if_eq", (d = a && a.refset,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                " + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + "\n            </td>\n            <td>\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.program(36, B, b),
            fn: M.program(34, A, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.cidValue,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : K.call(a, "if_eq", (d = a && a.cidValue,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                " + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '</td>\n            <td>\n                <div class="phoca-flagbox" style="width:35px;height:35px">\n                    <span class="phoca-flag ' + L((e = c.countryIcon || a && a.countryIcon,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.refset,
        null == d || !1 === d ? d : d.module), f) : K.call(a, "countryIcon", (d = a && a.refset,
        null == d || !1 === d ? d : d.module), f))) + '"></span>\n                </div>\n                <button type="button" class="btn btn-link unobtrusive-icon more-fields-button pull-right" data-container="body" data-toggle="popover" data-placement="left" data-content="\n                    <table border=\'1\'><tr><th style=\'padding: 3px;\'>RefsetId</th><th style=\'padding: 3px;\'>Effective Time</th><th style=\'padding: 3px;\'>ModuleId</th></tr>\n                        <tr><td style=\'padding: 3px;\'>' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + "</td><td style='padding: 3px;'>",
        (e = c.effectiveTime) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.effectiveTime,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + "</td><td style='padding: 3px;'>",
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + '</td></tr>\n                    </table>\n                    " data-html="true"><i class="glyphicon glyphicon-info-sign"></i>\n                </button>\n            </td>\n        </tr>\n        '
    }
    function A(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart = "drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += L(d) + '\')"  data-module="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.module,
        typeof d === N ? d.apply(a) : d)) + '" data-concept-id="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + '" data-term="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '" data-def-status="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === N ? d.apply(a) : d)) + '"><span  class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                '
    }
    function B(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart = "drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += L(d) + '\')"  data-module="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.module,
        typeof d === N ? d.apply(a) : d)) + '" data-concept-id="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + '" data-term="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '" data-def-status="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === N ? d.apply(a) : d)) + '"><span  class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                '
    }
    function C(a, b) {
        var d, e, f, g = "";
        return g += "\n        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.noop,
            fn: M.program(39, D, b),
            data: b
        },
        d = e ? e.call(a, a && a.type, "ASSOCIATION", f) : K.call(a, "if_eq", a && a.type, "ASSOCIATION", f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function D(a, b) {
        var d, e, f, g = "";
        return g += "\n        <tr class='",
        d = c.if.call(a, a && a.active, {
            hash: {},
            inverse: M.program(16, p, b),
            fn: M.program(14, o, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "'>\n            <td>\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.program(20, r, b),
            fn: M.program(18, q, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.refset,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : K.call(a, "if_eq", (d = a && a.refset,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                " + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + "\n            </td>\n            <td>\n                ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: M.program(42, F, b),
            fn: M.program(40, E, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.cidValue,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f) : K.call(a, "if_eq", (d = a && a.cidValue,
        null == d || !1 === d ? d : d.definitionStatus), "Primitive", f),
        (d || 0 === d) && (g += d),
        g += "\n                " + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '</td>\n            <td>\n                <div class="phoca-flagbox" style="width:35px;height:35px">\n                    <span class="phoca-flag ' + L((e = c.countryIcon || a && a.countryIcon,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.refset,
        null == d || !1 === d ? d : d.module), f) : K.call(a, "countryIcon", (d = a && a.refset,
        null == d || !1 === d ? d : d.module), f))) + '"></span>\n                </div>\n                <button type="button" class="btn btn-link unobtrusive-icon more-fields-button pull-right" data-container="body" data-toggle="popover" data-placement="left" data-content="\n                    <table border=\'1\'><tr><th style=\'padding: 3px;\'>RefsetId</th><th style=\'padding: 3px;\'>Effective Time</th><th style=\'padding: 3px;\'>ModuleId</th></tr>\n                        <tr>\n                            <td style=\'padding: 3px;\'>' + L((d = a && a.refset,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + "</td><td style='padding: 3px;'>",
        (e = c.effectiveTime) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.effectiveTime,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + "</td><td style='padding: 3px;'>",
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += L(d) + '\n                            </td>\n                        </tr>\n                    </table>\n                    " data-html="true"><i class="glyphicon glyphicon-info-sign"></i>\n                </button>\n            </td>\n        </tr>\n        '
    }
    function E(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart = "drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += L(d) + '\')" data-module="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.module,
        typeof d === N ? d.apply(a) : d)) + '" data-concept-id="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + '" data-term="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '" data-def-status="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === N ? d.apply(a) : d)) + '"><span class="badge alert-warning">&nbsp;</span></a>&nbsp;&nbsp;\n                '
    }
    function F(a, b) {
        var d, e, f = "";
        return f += '\n                    <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;" draggable = "true" ondragstart = "drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === N ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += L(d) + '\')" data-module="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.module,
        typeof d === N ? d.apply(a) : d)) + '" data-concept-id="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === N ? d.apply(a) : d)) + '" data-term="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === N ? d.apply(a) : d)) + '" data-def-status="' + L((d = a && a.cidValue,
        d = null == d || !1 === d ? d : d.definitionStatus,
        typeof d === N ? d.apply(a) : d)) + '"><span class="badge alert-warning">&equiv;</span></a>&nbsp;&nbsp;\n                '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var G, H, I, J = "", K = c.helperMissing, L = this.escapeExpression, M = this, N = "function";
    return J += L((H = c.refset || b && b.refset,
    I = {
        hash: {},
        data: e
    },
    H ? H.call(b, "simple", !1, I) : K.call(b, "refset", "simple", !1, I))) + "\n" + L((H = c.refset || b && b.refset,
    I = {
        hash: {},
        data: e
    },
    H ? H.call(b, "simplemap", !1, I) : K.call(b, "refset", "simplemap", !1, I))) + "\n" + L((H = c.refset || b && b.refset,
    I = {
        hash: {},
        data: e
    },
    H ? H.call(b, "attr", !1, I) : K.call(b, "refset", "attr", !1, I))) + "\n" + L((H = c.refset || b && b.refset,
    I = {
        hash: {},
        data: e
    },
    H ? H.call(b, "assoc", !1, I) : K.call(b, "refset", "assoc", !1, I))) + "\n\n",
    G = c.each.call(b, (G = b && b.firstMatch,
    null == G || !1 === G ? G : G.memberships), {
        hash: {},
        inverse: M.noop,
        fn: M.program(1, f, e),
        data: e
    }),
    (G || 0 === G) && (J += G),
    J += '\n\n<div style="margin: 10px;">\n    <a class="btn btn-primary btn-sm pull-right" href="https://mapping.ihtsdotools.org/#/record/conceptId/' + L((G = b && b.firstMatch,
    G = null == G || !1 === G ? G : G.conceptId,
    typeof G === N ? G.apply(b) : G)) + '/autologin?refSetId=P447562003" target="_blank" role="button">Open maps for this concept</a>\n</div>\n\n<table class=\'table table-hover\'>\n    <thead><tr>\n        <th colspan="3"><span class=\'i18n\' data-i18n-id=\'i18n_simple_refset_memberships\'>Simple Refsets Membership</span></th>\n    </tr></thead>\n<tbody>\n    ',
    G = c.each.call(b, (G = b && b.firstMatch,
    null == G || !1 === G ? G : G.memberships), {
        hash: {},
        inverse: M.noop,
        fn: M.program(12, m, e),
        data: e
    }),
    (G || 0 === G) && (J += G),
    J += "\n    ",
    H = c.refset || b && b.refset,
    I = {
        hash: {},
        inverse: M.program(24, t, e),
        fn: M.program(22, s, e),
        data: e
    },
    G = H ? H.call(b, "simple", "get", I) : K.call(b, "refset", "simple", "get", I),
    (G || 0 === G) && (J += G),
    J += "\n</table>\n\n<table class='table table-hover'>\n    <thead><tr>\n        <th colspan=\"3\"><span class='i18n' data-i18n-id='i18n_simple_map_refset_name'>Simple Map Refset name</span></th>\n    </tr></thead>\n<tbody>\n    ",
    G = c.each.call(b, (G = b && b.firstMatch,
    null == G || !1 === G ? G : G.memberships), {
        hash: {},
        inverse: M.noop,
        fn: M.program(26, u, e),
        data: e
    }),
    (G || 0 === G) && (J += G),
    J += "\n    ",
    H = c.refset || b && b.refset,
    I = {
        hash: {},
        inverse: M.program(24, t, e),
        fn: M.program(22, s, e),
        data: e
    },
    G = H ? H.call(b, "simplemap", "get", I) : K.call(b, "refset", "simplemap", "get", I),
    (G || 0 === G) && (J += G),
    J += "\n</table>\n\n<table class='table table-hover'>\n    <thead><tr>\n        <th colspan=\"3\"><span class='i18n' data-i18n-id='i18n_attribute_value_refset_name'>Attribute Value Refset name</span></th>\n    </tr></thead>\n<tbody>\n\n    ",
    G = c.each.call(b, (G = b && b.firstMatch,
    null == G || !1 === G ? G : G.memberships), {
        hash: {},
        inverse: M.noop,
        fn: M.program(32, y, e),
        data: e
    }),
    (G || 0 === G) && (J += G),
    J += "\n    ",
    H = c.refset || b && b.refset,
    I = {
        hash: {},
        inverse: M.program(24, t, e),
        fn: M.program(22, s, e),
        data: e
    },
    G = H ? H.call(b, "attr", "get", I) : K.call(b, "refset", "attr", "get", I),
    (G || 0 === G) && (J += G),
    J += "\n</table>\n\n<table class='table table-hover'>\n    <thead><tr>\n        <th colspan=\"3\"><span class='i18n' data-i18n-id='i18n_association_refset_name'>Association Refset name</span></th>\n    </tr></thead>\n<tbody>\n    ",
    G = c.each.call(b, (G = b && b.firstMatch,
    null == G || !1 === G ? G : G.memberships), {
        hash: {},
        inverse: M.noop,
        fn: M.program(38, C, e),
        data: e
    }),
    (G || 0 === G) && (J += G),
    J += "\n    ",
    H = c.refset || b && b.refset,
    I = {
        hash: {},
        inverse: M.program(24, t, e),
        fn: M.program(22, s, e),
        data: e
    },
    G = H ? H.call(b, "assoc", "get", I) : K.call(b, "refset", "assoc", "get", I),
    (G || 0 === G) && (J += G),
    J += "\n</table>\n"
}),
this.JST["views/developmentQueryPlugin/andCriteria.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        return "Conjunction"
    }
    function g(a, b) {
        var d, e;
        return (e = c.typeSelected) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.typeSelected,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        r(d)
    }
    function h(a, b) {
        return "\n            and\n        "
    }
    function i(a, b) {
        return "\n            attribute\n        "
    }
    function j(a, b) {
        return ""
    }
    function k(a, b) {
        return 'style="display: none;"'
    }
    function l(a, b) {
        var d, e, f = "";
        return f += '\n                    <li role="presentation"><a class="selectTypeOpt" data-id="',
        (e = c.conceptId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.conceptId,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += r(d) + '" data-term="',
        (e = c.defaultTerm) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.defaultTerm,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += r(d) + '" role="menuitem" tabindex="-1" href="javascript:void(0);">',
        (e = c.defaultTerm) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.defaultTerm,
        d = typeof e === q ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += r(d) + "</a></li>\n                "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var m, n, o, p = "", q = "function", r = this.escapeExpression, s = this, t = c.helperMissing;
    return p += '<div class="addedCriteria" data-typeSelected="',
    n = c.if_eq || b && b.if_eq,
    o = {
        hash: {},
        inverse: s.program(3, g, e),
        fn: s.program(1, f, e),
        data: e
    },
    m = n ? n.call(b, b && b.typeSelected, "false", o) : t.call(b, "if_eq", b && b.typeSelected, "false", o),
    (m || 0 === m) && (p += m),
    p += '">\n    <div class="form-group text-center" style="width: 75px;">\n        ',
    n = c.if_eq || b && b.if_eq,
    o = {
        hash: {},
        inverse: s.program(7, i, e),
        fn: s.program(5, h, e),
        data: e
    },
    m = n ? n.call(b, b && b.typeSelected, "Conjunction", o) : t.call(b, "if_eq", b && b.typeSelected, "Conjunction", o),
    (m || 0 === m) && (p += m),
    p += '\n    </div>\n    <div data-type-concept-id="false" class="form-group typeCritCombo" ',
    n = c.if_eq || b && b.if_eq,
    o = {
        hash: {},
        inverse: s.program(11, k, e),
        fn: s.program(9, j, e),
        data: e
    },
    m = n ? n.call(b, b && b.typeSelected, "Refinement", o) : t.call(b, "if_eq", b && b.typeSelected, "Refinement", o),
    (m || 0 === m) && (p += m),
    p += '>\n        <div class="dropdown">\n            <button style="width: 147px;" class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">\n                <span>Select type&nbsp;</span>\n                <span class="caret"></span>\n            </button>\n            <ul style="max-height: 400px; overflow: auto;" class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">\n                <li role="presentation"><a class="selectTypeOpt" data-id="*" data-term="Any" role="menuitem" tabindex="-1" href="javascript:void(0);">Any</a></li>\n                ',
    m = c.each.call(b, b && b.types, {
        hash: {},
        inverse: s.noop,
        fn: s.program(13, l, e),
        data: e
    }),
    (m || 0 === m) && (p += m),
    p += '\n            </ul>\n        </div>\n    </div>\n    <div class="form-group">\n        <div class="dropdown">\n            <button style="width: 147px;" class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">\n                <span class="addSelectCriteria">',
    (n = c.criteria) ? m = n.call(b, {
        hash: {},
        data: e
    }) : (n = b && b.criteria,
    m = typeof n === q ? n.call(b, {
        hash: {},
        data: e
    }) : n),
    p += r(m) + '</span>\n                <span class="caret"></span>\n            </button>\n            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">\n                <li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">descendantOf</a></li>\n                <li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">descendantOrSelfOf</a></li>\n                <li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">self</a></li>\n                <li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">isMemberOf</a></li>\n            </ul>\n        </div>\n    </div>\n    <div class="form-group">\n        <input type="text" data-droppable="true" ondrop="dropField(event)" ondragleave="removeHighlight();" ondragover="allowDrop(event)" class="form-control andCriteriaConcept" placeholder="Drag a concept here" readonly>\n    </div>\n    <div class="form-group"><button type="button" class="btn btn-link glyphicon glyphicon-remove removeCriteria" style="text-decoration: none;"></button></div>\n    <div class="form-group"><button type="button" class="btn btn-link glyphicon glyphicon-plus addCriteria" style="text-decoration: none;"></button></div>\n</div>'
}),
this.JST["views/developmentQueryPlugin/criteria.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b, d) {
        var e, f, i, j = "";
        return j += "\n            ",
        f = c.if_eq || a && a.if_eq,
        i = {
            hash: {},
            inverse: w.program(4, h, b),
            fn: w.program(2, g, b),
            data: b
        },
        e = f ? f.call(a, null == b || !1 === b ? b : b.index, 0, i) : z.call(a, "if_eq", null == b || !1 === b ? b : b.index, 0, i),
        (e || 0 === e) && (j += e),
        j += '\n            <span class="constraint" data-term="',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === x ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        j += y(e) + '" data-criteria="',
        (f = c.criteria) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.criteria,
        e = typeof f === x ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        j += y(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === x ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        j += y(e) + '" ',
        e = c.if.call(a, (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), {
            hash: {},
            inverse: w.noop,
            fn: w.program(13, m, b),
            data: b
        }),
        (e || 0 === e) && (j += e),
        j += ">\n                \x3c!--",
        (f = c.criteria) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.criteria,
        e = typeof f === x ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        j += y(e) + "&nbsp;--\x3e\n                ",
        e = c.if.call(a, (e = a && a.type,
        null == e || !1 === e ? e : e.conceptId), {
            hash: {},
            inverse: w.noop,
            fn: w.program(15, n, b),
            data: b
        }),
        (e || 0 === e) && (j += e),
        j += '\n                <div style="display: inline-block;" class="dropdown">\n                    <button style="text-decoration: inherit; color: inherit; display: inline-block; padding: 0px;" class="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">\n                        ',
        (f = c.criteria) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.criteria,
        e = typeof f === x ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        j += y(e) + '&nbsp;\n                    </button>\n                    <ul class="dropdown-menu" role="menu">\n                        <li role="presentation"><a class="criteriaDropdownOption" role="menuitem" tabindex="-1" href="javascript:void(0);">descendantOf</a></li>\n                        <li role="presentation"><a class="criteriaDropdownOption" role="menuitem" tabindex="-1" href="javascript:void(0);">descendantOrSelfOf</a></li>\n                        <li role="presentation"><a class="criteriaDropdownOption" role="menuitem" tabindex="-1" href="javascript:void(0);">self</a></li>\n                        <li role="presentation"><a class="criteriaDropdownOption" role="menuitem" tabindex="-1" href="javascript:void(0);">isMemberOf</a></li>\n                    </ul>\n                </div>\n                <span style="color: forestgreen;">',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === x ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        j += y(e) + '</span>&nbsp;\n                |\n                <span style="color: firebrick;">',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === x ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        j += y(e) + "</span>\n                |",
        e = c.if.call(a, (e = d && d.criterias,
        e = null == e || !1 === e ? e : e[1],
        e = null == e || !1 === e ? e : e.type,
        null == e || !1 === e ? e : e.conceptId), {
            hash: {},
            inverse: w.noop,
            fn: w.programWithDepth(17, o, b, d),
            data: b
        }),
        (e || 0 === e) && (j += e),
        j += "\n            </span>\n        "
    }
    function g(a, b) {
        return "\n            "
    }
    function h(a, b) {
        var d, e = "";
        return e += '\n                <br>\n                <div style="margin-left: ',
        d = c.if.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.conceptId), {
            hash: {},
            inverse: w.program(7, j, b),
            fn: w.program(5, i, b),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += 'px; display: inline-block">\n                    ',
        d = c.if.call(a, (d = a && a.type,
        null == d || !1 === d ? d : d.conceptId), {
            hash: {},
            inverse: w.program(11, l, b),
            fn: w.program(9, k, b),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n                </div>\n            "
    }
    function i(a, b) {
        return "68"
    }
    function j(a, b) {
        return "43"
    }
    function k(a, b) {
        return ""
    }
    function l(a, b) {
        return "AND"
    }
    function m(a, b) {
        var c, d = "";
        return d += 'data-type-concept-id="' + y((c = a && a.type,
        c = null == c || !1 === c ? c : c.conceptId,
        typeof c === x ? c.apply(a) : c)) + '" data-type-term="' + y((c = a && a.type,
        c = null == c || !1 === c ? c : c.term,
        typeof c === x ? c.apply(a) : c)) + '"'
    }
    function n(a, b) {
        var c, d = "";
        return d += '\n                    <span style="color: forestgreen;">' + y((c = a && a.type,
        c = null == c || !1 === c ? c : c.conceptId,
        typeof c === x ? c.apply(a) : c)) + '</span> |\n                    <span style="color: firebrick;">' + y((c = a && a.type,
        c = null == c || !1 === c ? c : c.term,
        typeof c === x ? c.apply(a) : c)) + "</span> | =\n                "
    }
    function o(a, b, d) {
        var e, f, g, h = "";
        return h += "\n                    ",
        f = c.if_eqInd || d && d.if_eqInd,
        g = {
            hash: {},
            inverse: w.program(20, q, b),
            fn: w.program(18, p, b),
            data: b
        },
        e = f ? f.call(a, null == b || !1 === b ? b : b.index, (e = d && d.criterias,
        null == e || !1 === e ? e : e.length), g) : z.call(a, "if_eqInd", null == b || !1 === b ? b : b.index, (e = d && d.criterias,
        null == e || !1 === e ? e : e.length), g),
        (e || 0 === e) && (h += e),
        h += "\n                "
    }
    function p(a, b) {
        return "\n                    "
    }
    function q(a, b) {
        var d, e = "";
        return e += "\n                        ",
        d = c.if.call(a, null == b || !1 === b ? b : b.index, {
            hash: {},
            inverse: w.program(23, s, b),
            fn: w.program(21, r, b),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n                    "
    }
    function r(a, b) {
        return "\n                            ,\n                        "
    }
    function s(a, b) {
        return "\n                            :\n                        "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var t, u, v = "", w = this, x = "function", y = this.escapeExpression, z = c.helperMissing;
    return v += '<li data-modifier="',
    (u = c.modifier) ? t = u.call(b, {
        hash: {},
        data: e
    }) : (u = b && b.modifier,
    t = typeof u === x ? u.call(b, {
        hash: {},
        data: e
    }) : u),
    v += y(t) + '" class="list-group-item clearfix query-condition">\n    <span class="text-muted line-number" style="font-size: 200%;"></span>&nbsp;&nbsp;\n    <span style="position: relative; top: -5px;">\n        <div style="width: 45px;display: inline-block;">',
    (u = c.modifier) ? t = u.call(b, {
        hash: {},
        data: e
    }) : (u = b && b.modifier,
    t = typeof u === x ? u.call(b, {
        hash: {},
        data: e
    }) : u),
    v += y(t) + ":</div>\n        ",
    t = c.each.call(b, b && b.criterias, {
        hash: {},
        inverse: w.noop,
        fn: w.programWithDepth(1, f, e, b),
        data: e
    }),
    (t || 0 === t) && (v += t),
    v += "\n    </span>\n    <button class='pull-right btn btn-link removeLi' style=\"position: relative; top: 3px;\">\n        <i class='glyphicon glyphicon-remove'></i>\n    </button>\n </li>"
}),
this.JST["views/developmentQueryPlugin/examples.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b, d) {
        var e, f, h, m = "";
        return m += '\n    <br>\n    <div id="' + j((e = d && d.divElementId,
        typeof e === i ? e.apply(a) : e)) + "-" + j((e = null == b || !1 === b ? b : b.index,
        typeof e === i ? e.apply(a) : e)) + '-modal-examples" ',
        f = c.if_eqInd || d && d.if_eqInd,
        h = {
            hash: {},
            inverse: k.noop,
            fn: k.program(2, g, b),
            data: b
        },
        e = f ? f.call(a, null == b || !1 === b ? b : b.index, (e = d && d.examples,
        null == e || !1 === e ? e : e.length), h) : l.call(a, "if_eqInd", null == b || !1 === b ? b : b.index, (e = d && d.examples,
        null == e || !1 === e ? e : e.length), h),
        (e || 0 === e) && (m += e),
        m += ">\n        <h4>",
        (f = c.title) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.title,
        e = typeof f === i ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += j(e) + '</h4>\n        <span data-htmlValue="',
        (f = c.htmlValue) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.htmlValue,
        e = typeof f === i ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += j(e) + '" class="pull-right btn btn-primary btn-xs loadExample" style="padding: 0px; display: inline-block;">Load instructions</span>\n        <br>\n        <div class="contentExamples" style="margin: 10px;">',
        (f = c.htmlValue) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.htmlValue,
        e = typeof f === i ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        (e || 0 === e) && (m += e),
        m += "</div>\n        <br>\n    </div>\n"
    }
    function g(a, b) {
        return 'style="min-height: 450px;"'
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var h, i = "function", j = this.escapeExpression, k = this, l = c.helperMissing;
    return h = c.each.call(b, b && b.examples, {
        hash: {},
        inverse: k.noop,
        fn: k.programWithDepth(1, f, e, b),
        data: e
    }),
    h || 0 === h ? h : ""
}),
this.JST["views/developmentQueryPlugin/main.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b, d) {
        var e, f, g = "";
        return g += '\n                    <li><a contenteditable="false" href="#' + l((e = d && d.divElementId,
        typeof e === k ? e.apply(a) : e)) + "-" + l((e = null == b || !1 === b ? b : b.index,
        typeof e === k ? e.apply(a) : e)) + '-modal-examples" class="list-group-item">',
        (f = c.title) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.title,
        e = typeof f === k ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += l(e) + "</a></li>\n                  "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var g, h, i, j = "", k = "function", l = this.escapeExpression, m = c.helperMissing, n = this;
    return j += "<div style='height:100%;margin: 5px; overflow:auto;' class='panel panel-default' id='",
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + "-mainPanel'>\n  <div class='panel-heading' id='",
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + "-panelHeading'>\n    <div class='row'>\n      <div class='col-md-6' id='",
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + "-panelTitle'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<strong>",
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_terminology_content_selection", "Terminology content selections", i) : m.call(b, "i18n", "i18n_terminology_content_selection", "Terminology content selections", i),
    (g || 0 === g) && (j += g),
    j += '</strong></div>\n      <div class=\'col-md-6 text-right\'>\n        \x3c!--<a class="btn btn-link" href="help/topics/creating-queries.html" target="_blank" title="Help" role="button"><i class=\'glyphicon glyphicon-question-sign\'></i></a>--\x3e\n      </div>\n    </div>\n  </div>\n  <div class=\'panel-body\' style=\'height:100%\' id=\'',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-panelBody\'>\n    \x3c!--<p style="margin: 10px;">Create a query, conditions are evaluated in order:</p>--\x3e\n    <div class="row container-fluid" style="margin: 10px;">\n      <p class="lead col-md-6">Enter an expression</p>\n      <button type="button" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-helpButton" class="btn btn-default pull-right" style="margin: 10px;" data-toggle="modal" data-target="#',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-queryHelpModal">',
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_help", "Help", i) : m.call(b, "i18n", "i18n_help", "Help", i),
    (g || 0 === g) && (j += g),
    j += '</button>\n      <button type="button" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-clearButton" class="btn btn-default pull-right" style="margin: 10px;">',
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_clear", "Clear", i) : m.call(b, "i18n", "i18n_clear", "Clear", i),
    (g || 0 === g) && (j += g),
    j += '</button>\n    </div>\n    <div>\n      <ul class="nav nav-tabs">\n        <li class="active"><a href="#',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-ExpTab" data-toggle="tab"><span class="i18n" data-i18n-id="i18n_expression">Enter an existing expression</span></a></li>\n        \x3c!--                <li><a href="#',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-BuilderTab" data-toggle="tab"><span class="i18n" data-i18n-id="i18n_builder">Build a simple expression</span></a></li>\n--\x3e\n      </ul>\n      <div class="tab-content">\n        <div class="tab-pane" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-BuilderTab" style="padding: 0px;margin: 0;">\n          <div class="row container-fluid" style="margin: 10px;">\n            <form class="form-inline" role="form">\n              <div class="form-group">\n                <div class="dropdown">\n                  <button style="width: 75px;" class="btn btn-default dropdown-toggle" type="button" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-modifierButton" data-toggle="dropdown" aria-expanded="true">\n                                        <span id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-selectedModifier">Include</span>\n                                        <span class="caret"></span>\n                                    </button>\n                  <ul class="dropdown-menu" role="menu" aria-labelledby="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-modifierButton">\n                    <li role="presentation"><a role="menuitem" data-role="modifier-selector" tabindex="-1" href="javascript:void(0);">Include</a></li>\n                    <li role="presentation"><a role="menuitem" data-role="modifier-selector" tabindex="-1" href="javascript:void(0);">Exclude</a></li>\n                  </ul>\n                </div>\n              </div>\n              <div class="form-group">\n                <div class="dropdown">\n                  <button style="width: 147px;" class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">\n                                        <span id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-selectedCriteria">descendantOf</span>\n                                        <span class="caret"></span>\n                                    </button>\n                  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">\n                    <li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">descendantOf</a></li>\n                    <li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">descendantOrSelfOf</a></li>\n                    \x3c!--<li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">ancestorOf</a></li>--\x3e\n                    \x3c!--<li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">ancestorOrSelfOf</a></li>--\x3e\n                    <li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">self</a></li>\n                    \x3c!--<li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">childrenOf</a></li>--\x3e\n                    \x3c!--<li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">parentsOf</a></li>--\x3e\n                    <li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">isMemberOf</a></li>\n                    \x3c!--<li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">hasDescription</a></li>--\x3e\n                    \x3c!--<li role="presentation"><a role="menuitem" data-role="criteria-selector" tabindex="-1" href="javascript:void(0);">hasRelationship</a></li>--\x3e\n                  </ul>\n                </div>\n              </div>\n              <div class="form-group" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-conceptField">\n                <input type="text" data-droppable="true" ondrop="dropField(event)" ondragleave="removeHighlight();" ondragover="allowDrop(event)" class="form-control" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-selectedConcept" placeholder="Drag a concept here" readonly>\n                <input type="text" data-droppable="true" ondrop="dropField(event)" ondragleave="removeHighlight();" ondragover="allowDrop(event)" class="form-control" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-selectedType" placeholder="Drag a type here" readonly>\n                <input type="text" data-droppable="true" ondrop="dropField(event)" ondragleave="removeHighlight();" ondragover="allowDrop(event)" class="form-control" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-selectedTarget" placeholder="Drag a destination here" readonly>\n                <input type="text" class="form-control" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-searchTerm" placeholder="Type search string">\n                <span class="dropdown">\n                        <button class="btn btn-default dropdown-toggle" type="button" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-formdropdown" data-toggle="dropdown" aria-expanded="true">\n                            <span id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-selectedForm">stated</span>\n                <span class="caret"></span>\n                </button>\n                <ul class="dropdown-menu" role="menu" aria-labelledby="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-formdropdown">\n                  <li role="presentation"><a role="menuitem" data-role="form-selector" tabindex="-1" href="javascript:void(0);">stated</a></li>\n                  <li role="presentation"><a role="menuitem" data-role="form-selector" tabindex="-1" href="javascript:void(0);">inferred</a></li>\n                </ul>\n                </span>\n              </div>\n              <div style="margin-left: 41px;" class="form-group" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-addCriteriaAnd">\n                <div class="dropdown">\n                  <button style="text-decoration: none;" class="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true"><span data-toggle="tooltip" data-placement="top" title="More" class="glyphicon glyphicon-plus"></span></button>\n                  <ul class="dropdown-menu pull-right" role="menu">\n                    <li role="presentation"><a class="addCriteria" data-type="Conjunction" role="menuitem" tabindex="-1" href="javascript:void(0);">Add AND</a></li>\n                    <li role="presentation"><a class="addCriteria" data-type="Refinement" role="menuitem" tabindex="-1" href="javascript:void(0);">Add Refinement</a></li>\n                  </ul>\n                </div>\n              </div>\n            </form>\n            <form class="form-inline" role="form">\n              <div class="form-group">\n                <button type="button" class="btn btn-primary" id=\'',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-addCriteriaButton\' style="margin: 10px;">',
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_add_condition", "Add instruction", i) : m.call(b, "i18n", "i18n_add_condition", "Add instruction", i),
    (g || 0 === g) && (j += g),
    j += '</button>\n                \x3c!--<button type="button" class="btn btn-primary"  id=\'',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-cloudResults\' style="margin: 10px; position: relative;" title="Open Cloud Queries Processor" data-toggle="modal" data-target="#',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-cloudModal"><i class=\'glyphicon glyphicon-cloud\' style="position: relative; top: 3px;"></i> <span id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-cloudCount"></span></button>--\x3e\n\n                <span id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-addmsg" for="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-addCriteriaButton" class="small text-danger"></span>\n              </div>\n            </form>\n            <ul class="list-group" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-listGroup">\n            </ul>\n            <div class="btn btn-success" style="margin: 10px;" id=\'',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + "-computeInferredButton'>",
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_run_query", "Execute", i) : m.call(b, "i18n", "i18n_run_query", "Execute", i),
    (g || 0 === g) && (j += g),
    j += '</div>\n            <button type="button" class="btn btn-primary pull-right" id=\'',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-open-grammar\' style="margin: 10px; position: relative;" data-toggle="modal" data-target="#',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-constraintGrammarModal">',
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_constraint_grammar", "Constraint Grammar", i) : m.call(b, "i18n", "i18n_constraint_grammar", "Constraint Grammar", i),
    (g || 0 === g) && (j += g),
    j += '</button>\n            <br>\n            <br>\n          </div>\n        </div>\n        <div class="tab-pane active" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-ExpTab" style="padding: 15px;margin: 0;">\n          <textarea rows="5" class="form-control" placeholder="Expression..." id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-ExpText"></textarea>\n          <div class="btn btn-success" style="margin: 10px;" id=\'',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + "-computeInferredButton2'>",
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_run_query", "Execute", i) : m.call(b, "i18n", "i18n_run_query", "Execute", i),
    (g || 0 === g) && (j += g),
    j += '</div>\n          <div class="btn btn-success" style="display: none; margin: 10px;" id=\'',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-computeOntoserver2\'>Run on Ontoserver</div>\n          <br>\n        </div>\n        </form>\n        \x3c!--            <ul class="list-group" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-listGroup">\n            </ul>\n            ',
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_results", "Results", i) : m.call(b, "i18n", "i18n_results", "Results", i),
    (g || 0 === g) && (j += g),
    j += ':  <span id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-resultInfo" class="text-muted small"></span>\n--\x3e\n        <div class="row container-fluid" style="margin: 10px;">\n          <p class="lead">',
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_results", "Results", i) : m.call(b, "i18n", "i18n_results", "Results", i),
    (g || 0 === g) && (j += g),
    j += ': <span id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-resultInfo"></p></span>\n        </div>\n\n        <div class="row container-fluid" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-output" style="margin: 10px;">\n          <table class="table table-bordered">\n            <thead>\n              <tr>\n                <th>Concept</th>\n                <th>Id</th>\n              </tr>\n            </thead>\n            <tbody id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-outputBody"></tbody>\n            <tfoot>\n              <tr>\n                <td colspan="2" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-footer" class="text-center text-muted small"></td>\n              </tr>\n            </tfoot>\n          </table>\n          <table id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-output2" style="display: none">\n            <thead>\n              <tr>\n                <th>Concept</th>\n                <th>Id</th>\n              </tr>\n            </thead>\n            <tbody id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-outputBody2">\n            </tbody>\n          </table>\n\n        </div>\n      </div>\n      <br><br><br><br><br><br><br><br><br><br><br><br><br><br>\n    </div>\n  </div>\n  \x3c!-- Modals --\x3e\n  <div class="modal fade" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-ExamplesModal" tabindex="-1" role="dialog" aria-labelledby="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-myCloudModalLabel" aria-hidden="true">\n    <div class="modal-dialog modal-lg" style="width: 80%;">\n      <div class="modal-content">\n        <div class="modal-header">\n          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n          <h4 class="modal-title">Terminology content selections examples</h4>\n        </div>\n        <div class="modal-body" style="max-height: 450px; overflow: auto;">\n          <div class="row">\n            <div class="col-md-4">\n              <div class="list-group navbar" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-sidebar">\n                <ul id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-mynav" data-spy="affix" data-offset-top="280" class="nav" style="position: fixed; width: 30%;">\n                  ',
    g = c.each.call(b, b && b.examples, {
        hash: {},
        inverse: n.noop,
        fn: n.programWithDepth(1, f, e, b),
        data: e
    }),
    (g || 0 === g) && (j += g),
    j += '\n                </ul>\n              </div>\n            </div>\n            <div class="col-md-8" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-mycontentExamples">\n\n            </div>\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-ExamplesModal-close" type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="modal fade" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-queryHelpModal" tabindex="-1" role="dialog" aria-labelledby="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-myCloudModalLabel" aria-hidden="true">\n    <div class="modal-dialog modal-lg">\n      <div class="modal-content">\n        <div class="modal-header">\n          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n          <h4 class="modal-title">Terminology content selections help</h4>\n        </div>\n        <div class="modal-body" style="max-height: 450px; overflow: auto;">\n          <h2>SNOMED CT Expression Constraint Language</h2>\n          <p>This tool implements the full set of ECL v1.3 functions from the "SNOMED CT Expression Constraint Language Specification and Guide" (<a href="http://snomed.org/expressionconstraint" target="_blank">http://snomed.org/expressionconstraint)</a>. </p>\n          <p>The goal of this tool is to enable the creation of a terminology constraint for the selection of content in SNOMED CT, with a user friendly UI designed to support the most common real world use cases for content selection, like the creation\n            of reference sets to support implementation.</p>\n          <p class="lead">Reference</p>\n          <table class="c0">\n            <tbody>\n              <tr class="c15">\n                <td class="c18 c24" colspan="2" rowspan="1">\n                  <p class="c3"><span class="c2">ECL Operator</span></p>\n                </td>\n                <td class="c13 c18" colspan="1" rowspan="2">\n                  <p class="c3"><span class="c2">Summary</span></p>\n                </td>\n                <td class="c6 c18" colspan="1" rowspan="2">\n                  <p class="c3"><span class="c2">Example</span></p>\n                </td>\n              </tr>\n              <tr class="c15">\n                <td class="c7" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">Symbol</span></p>\n                </td>\n                <td class="c10" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">Name</span></p>\n                </td>\n              </tr>\n              <tr class="c16">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">&lt; </span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Descendant of</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">The set of all subtypes of the given concept</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c9">&lt; 404684003 |Clinical finding|</span></p>\n                </td>\n              </tr>\n              <tr class="c1">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">&lt;&lt; </span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Descendant or self of</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">The set of all subtypes of the given concept plus the concept itself</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c23">&lt;&lt; </span><span class="c20">73211009 |Diabetes mellitus|</span></p>\n                </td>\n              </tr>\n              <tr class="c16">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">&gt; </span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Ancestor of</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">The set of all supertypes of the given concept</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c9">&gt; 40541001 |Acute pulmonary edema|</span></p>\n                </td>\n              </tr>\n              <tr class="c1">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">&gt;&gt; </span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Ancestor or self of</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">The set of all supertypes of the given concept plus the concept itself</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c9">&gt;&gt; 40541001 |Acute pulmonary edema|</span></p>\n                </td>\n              </tr>\n              <tr class="c1">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">&lt;!</span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Child of</span></p>  \n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">The set of all children of the given concept</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c9">! 195967001 |Asthma|</span></p>\n                </td>\n              </tr>\n              <tr class="c1">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">^</span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Member of</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">The set of referenced components in the given reference set</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c9">^ 733990004 |Nursing activities reference set|</span></p>\n                </td>\n              </tr>\n              <tr class="c16">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">*</span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Any</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Any concept in the given SNOMED CT edition</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">*</span></p>\n                </td>\n              </tr>\n              <tr class="c21">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">:</span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Refinement</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Only those concepts whose defining relationships match the given attribute value pairs</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c9">&lt; 404684003 |clinical finding|: 116676008 |associated morphology| = *</span></p>\n                </td>\n              </tr>\n              <tr class="c19">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">AND</span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Conjunction</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Only those concepts in both sets</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c9">&lt; 19829001 |disorder of lung| AND &lt; 301867009 |edema of trunk|</span></p>\n                </td>\n              </tr>\n              <tr class="c19">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">OR</span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Disjunction</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Any concept that belongs to either set</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c9">&lt; 19829001 |disorder of lung| OR &lt; 301867009 |edema of trunk|</span></p>\n                </td>\n              </tr>\n              <tr class="c19">\n                <td class="c8" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c2">MINUS</span></p>\n                </td>\n                <td class="c11" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Exclusion</span></p>\n                </td>\n                <td class="c13" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c5">Concepts in the first set that do not belong to the second set</span></p>\n                </td>\n                <td class="c6" colspan="1" rowspan="1">\n                  <p class="c3"><span class="c9">&lt; 19829001 |disorder of lung| MINUS &lt; 301867009 |edema of trunk|</span></p>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n\n\n        <div class="modal-footer">\n          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="modal fade" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-constraintGrammarModal" tabindex="-1" role="dialog" aria-labelledby="constraintGrammarModalLabel" aria-hidden="true">\n    <div class="modal-dialog modal-lg" style="max-height: 450px;">\n      <div class="modal-content">\n        <div class="modal-header">\n          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n          <h4 class="modal-title" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-constraintGrammarModalLabel">',
    h = c.i18n || b && b.i18n,
    i = {
        hash: {},
        data: e
    },
    g = h ? h.call(b, "i18n_constraint_grammar", "Constraint Grammar", i) : m.call(b, "i18n", "i18n_constraint_grammar", "Constraint Grammar", i),
    (g || 0 === g) && (j += g),
    j += '</h4>\n        </div>\n        <div class="modal-body" style="max-height: 450px; overflow: auto;">\n          <div class="row">\n            <div class="expression-code col-md-11" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-constraintGrammar">\n\n            </div>\n            <div class="col-md-1">\n              <small><i class="glyphicon glyphicon-export pull-right" style="font-size: 14px;cursor: pointer;" id="',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-copyConstraint"></i></small>\n            </div>\n          </div>\n        </div>\n        <div class="modal-footer">\n          <div class="btn-group pull-left" role="group" aria-label="...">\n            <button type="button" class="btn btn-default" id="home-',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-full-syntax-button">Full</button>\n            <button type="button" class="btn btn-default" id="home-',
    (h = c.divElementId) ? g = h.call(b, {
        hash: {},
        data: e
    }) : (h = b && b.divElementId,
    g = typeof h === k ? h.call(b, {
        hash: {},
        data: e
    }) : h),
    j += l(g) + '-brief-syntax-button">Brief</button>\n          </div>\n          &nbsp;&nbsp;\n          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        </div>\n      </div>\n    </div>\n  </div>\n'
}),
this.JST["views/developmentQueryPlugin/relsCriteria.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h, i = "", j = "function", k = this.escapeExpression, l = c.helperMissing;
    return i += '<li data-modifier="',
    (g = c.modifier) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.modifier,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '" data-criteria="',
    (g = c.criteria) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.criteria,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '" data-type-id="',
    (g = c.typeId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.typeId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '" data-type-term="',
    (g = c.typeTerm) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.typeTerm,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '" data-target-term="',
    (g = c.targetTerm) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.targetTerm,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '" data-target-id="',
    (g = c.targetId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.targetId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '" data-form="',
    (g = c.form) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.form,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '" class="list-group-item clearfix query-condition">\n    <span class="text-muted line-number" style="font-size: 200%;"></span>&nbsp;&nbsp;\n    <span style="position: relative; top: -5px;">\n        ',
    (g = c.modifier) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.modifier,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + ", ",
    (g = c.criteria) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.criteria,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '&nbsp;\n        <span style="color: forestgreen;">',
    (g = c.typeId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.typeId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '</span>&nbsp;\n        |\n        <span style="color: firebrick;">' + k((g = c.isEmptyString || b && b.isEmptyString,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, b && b.typeTerm, "Any", h) : l.call(b, "isEmptyString", b && b.typeTerm, "Any", h))) + '</span>\n        |\n        &nbsp;->&nbsp;\n        <span style="color: forestgreen;">',
    (g = c.targetId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.targetId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '</span>&nbsp;\n        |\n        <span style="color: firebrick;">' + k((g = c.isEmptyString || b && b.isEmptyString,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, b && b.targetTerm, "Any", h) : l.call(b, "isEmptyString", b && b.targetTerm, "Any", h))) + "</span>\n        |&nbsp;&nbsp;",
    (g = c.form) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.form,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "\n    </span>\n    <button class='pull-right btn btn-link removeLi' style=\"position: relative; top: 3px;\">\n        <i class='glyphicon glyphicon-remove'></i>\n    </button>\n </li>"
}),
this.JST["views/developmentQueryPlugin/searchCriteria.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += '<li data-modifier="',
    (g = c.modifier) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.modifier,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-criteria="',
    (g = c.criteria) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.criteria,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" data-search-term="',
    (g = c.searchTerm) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.searchTerm,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '" class="list-group-item clearfix query-condition">\n    <span class="text-muted line-number" style="font-size: 200%;"></span>&nbsp;&nbsp;\n    <span style="position: relative; top: -5px;">\n        ',
    (g = c.modifier) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.modifier,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + ", ",
    (g = c.criteria) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.criteria,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '&nbsp;\n        <span style="color: firebrick;">',
    (g = c.searchTerm) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.searchTerm,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "</span>\n    </span>\n    <button class='pull-right btn btn-link removeLi' style=\"position: relative; top: 3px;\">\n        <i class='glyphicon glyphicon-remove'></i>\n    </button>\n</li>"
}),
this.JST["views/favorites/body.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f = "";
        return f += "\n                    <tr>\n                        <td>",
        (e = c.defaultTerm) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.defaultTerm,
        d = typeof e === o ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += p(d) + "</td>\n                        <td>",
        (e = c.conceptId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.conceptId,
        d = typeof e === o ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += p(d) + "</td>\n                    </tr>\n                "
    }
    function g(a, b) {
        return '\n                <tr>\n                    <td>\n                        <span class="text-muted"> No favorites</span>\n                    </td>\n                </tr>\n            '
    }
    function h(a, b) {
        var d, e = "";
        return e += "\n                ",
        d = c.each.call(a, a && a.concepts, {
            hash: {},
            inverse: r.noop,
            fn: r.programWithDepth(6, i, b, a),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n            "
    }
    function i(a, b, d) {
        var e, f, g, h = "";
        return h += '\n                    <tr>\n                        <td>\n                            <a class="fav-item" href="javascript:void(0);" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === o ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += p(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === o ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += p(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === o ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += p(e) + '\' style="color: inherit; text-decoration: inherit;">\n                                <span class="badge alert-warning" draggable=\'true\' ondragstart="drag(event, \'' + p((e = d && d.divElementId,
        typeof e === o ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === o ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += p(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === o ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += p(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === o ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += p(e) + "'>&nbsp;&nbsp;</span>\n                                ",
        f = c.hasCountryIcon || a && a.hasCountryIcon,
        g = {
            hash: {},
            inverse: r.noop,
            fn: r.program(7, j, b),
            data: b
        },
        e = f ? f.call(a, a && a.module, g) : q.call(a, "hasCountryIcon", a && a.module, g),
        (e || 0 === e) && (h += e),
        h += "\n                                ",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === o ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += p(e) + "\n                            </a>\n                        </td>\n                        <td>",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === o ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += p(e) + '\n                            <a href="javascript:void(0);" style="text-decoration: inherit;">\n                                <span data-concept-id=\'',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === o ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += p(e) + '\' class="pull-right glyphicon glyphicon-remove-circle"></span>\n                            </a>\n                        </td>\n                    </tr>\n                '
    }
    function j(a, b) {
        var d, e, f = "";
        return f += '\n                                    <div class="phoca-flagbox" style="width:22px;height:22px">\n                                        <span class="phoca-flag ' + p((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : q.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                                    </div>\n                                '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var k, l, m, n = "", o = "function", p = this.escapeExpression, q = c.helperMissing, r = this;
    return n += '<div style="margin-top: 10px" class="panel panel-default">\n    <div class="panel-body">\n        <table id="tableFavs" style="display: none;">\n            <thead>\n                <tr>\n                    <td>Term</td>\n                    <td>Concept ID</td>\n                </tr>\n            </thead>\n            <tbody>\n                ',
    k = c.each.call(b, b && b.concepts, {
        hash: {},
        inverse: r.noop,
        fn: r.program(1, f, e),
        data: e
    }),
    (k || 0 === k) && (n += k),
    n += '\n            </tbody>\n        </table>\n        <table id="" class="table table-hover table-bordered">\n            <tbody>\n            ',
    l = c.if_eq || b && b.if_eq,
    m = {
        hash: {},
        inverse: r.program(5, h, e),
        fn: r.program(3, g, e),
        data: e
    },
    k = l ? l.call(b, (k = b && b.concepts,
    null == k || !1 === k ? k : k.length), 0, m) : q.call(b, "if_eq", (k = b && b.concepts,
    null == k || !1 === k ? k : k.length), 0, m),
    (k || 0 === k) && (n += k),
    n += "\n            </tbody>\n        </table>\n    </div>\n</div>\n"
}),
this.JST["views/favorites/main.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += "<div style='height:100%;margin: 5px; overflow:auto;' class='panel panel-default' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-mainPanel'>\n    <div ondrop=\"dropF(event, '",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '\')" ondragleave="removeHighlight();" ondragover="allowDrop(event)" class=\'panel-heading\' id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelHeading'>\n        <div class='row'>\n            <div class='col-md-6' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelTitle'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<strong><span class='i18n' data-i18n-id='i18n_favorites'>Favorites</span></strong></div>\n            \x3c!--<div class='col-md-6 text-right'>--\x3e\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-historyButton' class='btn btn-link history-button' style='padding:2px'><i class='glyphicon glyphicon-time'></i></button>--\x3e\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-resetButton' class='btn btn-link' data-panel='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "' style='padding:2px'><i class='glyphicon glyphicon-repeat'></i></button>--\x3e\n                \x3c!--&lt;!&ndash;<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-linkerButton\' draggable="true" ondragstart="drag(event, \'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "')\" class='btn btn-link linker-button' data-panel='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "' style='padding:2px'><i class='glyphicon glyphicon-link'></i></button>&ndash;&gt;--\x3e\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configButton' class='btn btn-link' data-toggle='modal' style='padding:2px' data-target='#",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configModal'><i class='glyphicon glyphicon-cog'></i></button>--\x3e\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-collapseButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-small'></i></button>--\x3e\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-expandButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-full'></i></button>--\x3e\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-closeButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-remove'></i></button>--\x3e\n            \x3c!--</div>--\x3e\n        </div>\n    </div>\n    <div ondrop=\"dropF(event, '",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "')\" ondragleave=\"removeHighlight();\" ondragover=\"allowDrop(event)\" class='panel-body' style='height:100%' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelBody'>\n    </div>\n</div>\n\x3c!--<div class='modal fade' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configModal'>--\x3e\n    \x3c!--<div class='modal-dialog'>--\x3e\n        \x3c!--<div class='modal-content'>--\x3e\n            \x3c!--<div class='modal-header'>--\x3e\n                \x3c!--<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>--\x3e\n                \x3c!--<h4 class='modal-title'><span class='i18n' data-i18n-id='i18n_options'>Options</span> (",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + ")</h4>--\x3e\n            \x3c!--</div>--\x3e\n            \x3c!--<div class='modal-body' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-modal-body'>--\x3e\n                \x3c!--<p></p>--\x3e\n            \x3c!--</div>--\x3e\n            \x3c!--<div class='modal-footer'>--\x3e\n                \x3c!--<button type='button' class='btn btn-danger' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_cancel'>Cancel</span></button>--\x3e\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-apply-button' type='button' class='btn btn-success' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_apply_changes'>Apply changes</span></button>--\x3e\n            \x3c!--</div>--\x3e\n        \x3c!--</div>--\x3e\n    \x3c!--</div>--\x3e\n\x3c!--</div>--\x3e"
}),
this.JST["views/refsetPlugin/body.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        return '\n                    <tr>\n                        <td colspan="3">\n                            <span class="text-muted"> No refsets</span>\n                        </td>\n                    </tr>\n                '
    }
    function g(a, b) {
        var d, e = "";
        return e += "\n                    ",
        d = c.each.call(a, a && a.refsets, {
            hash: {},
            inverse: q.noop,
            fn: q.programWithDepth(4, h, b, a),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += "\n                "
    }
    function h(a, b, d) {
        var e, f, g, h = "";
        return h += "\n                        <tr>\n                            <td>",
        (f = c.type) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.type,
        e = typeof f === p ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += o(e) + '</td>\n                            <td>\n                                <a class="refset-item" href="javascript:void(0);" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === p ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += o(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === p ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += o(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === p ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += o(e) + '\' style="color: inherit; text-decoration: inherit;">\n                                    <span class="badge alert-warning" draggable=\'true\' ondragstart="drag(event, \'' + o((e = d && d.divElementId,
        typeof e === p ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === p ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += o(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === p ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += o(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === p ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += o(e) + "'>&nbsp;&nbsp;</span>\n                                    ",
        f = c.hasCountryIcon || a && a.hasCountryIcon,
        g = {
            hash: {},
            inverse: q.noop,
            fn: q.program(5, i, b),
            data: b
        },
        e = f ? f.call(a, a && a.module, g) : n.call(a, "hasCountryIcon", a && a.module, g),
        (e || 0 === e) && (h += e),
        h += "\n                                    ",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === p ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += o(e) + "\n                                </a>\n                            </td>\n                            <td>\n                                ",
        (f = c.count) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.count,
        e = typeof f === p ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += o(e) + "\n                            </td>\n                        </tr>\n                    "
    }
    function i(a, b) {
        var d, e, f = "";
        return f += '\n                                        <div class="phoca-flagbox" style="width:22px;height:22px">\n                                            <span class="phoca-flag ' + o((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : n.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                                        </div>\n                                    '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var j, k, l, m = "", n = c.helperMissing, o = this.escapeExpression, p = "function", q = this;
    return m += '<div style="margin-top: 10px" class="panel panel-default">\n    <div class="panel-body">\n        <div class="row container-fluid" style="max-height: 260px; overflow-y: scroll; margin: 10px;">\n            <table class="table table-hover table-bordered">\n                <thead>\n                    <tr>\n                        <th>Type</th>\n                        <th>Refset</th>\n                        <th>Members count</th>\n                    </tr>\n                </thead>\n                <tbody>\n                ',
    k = c.if_eq || b && b.if_eq,
    l = {
        hash: {},
        inverse: q.program(3, g, e),
        fn: q.program(1, f, e),
        data: e
    },
    j = k ? k.call(b, (j = b && b.refsets,
    null == j || !1 === j ? j : j.length), 0, l) : n.call(b, "if_eq", (j = b && b.refsets,
    null == j || !1 === j ? j : j.length), 0, l),
    (j || 0 === j) && (m += j),
    m += '\n                </tbody>\n            </table>\n        </div>\n        <div class="row container-fluid">\n            <table id="',
    (k = c.divElementId) ? j = k.call(b, {
        hash: {},
        data: e
    }) : (k = b && b.divElementId,
    j = typeof k === p ? k.call(b, {
        hash: {},
        data: e
    }) : k),
    m += o(j) + '-resultsTable" class="table table-hover table-bordered">\n\n            </table>\n        </div>\n    </div>\n</div>'
}),
this.JST["views/refsetPlugin/main.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += "<div style='height:100%;margin: 5px; overflow:auto;' class='panel panel-default' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-mainPanel'>\n    <div ondrop=\"dropF(event, '",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '\')" ondragleave="removeHighlight();" ondragover="allowDrop(event)" class=\'panel-heading\' id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelHeading'>\n        <div class='row'>\n            <div class='col-md-6' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelTitle'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<strong><span class='i18n' data-i18n-id='i18n_refsets'>Refsets</span></strong></div>\n        </div>\n    </div>\n    <div ondrop=\"dropF(event, '",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "')\" ondragleave=\"removeHighlight();\" ondragover=\"allowDrop(event)\" class='panel-body' style='height:100%' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelBody'>\n    </div>\n</div>"
}),
this.JST["views/refsetPlugin/members.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, g = "";
        return g += '\n    <thead>\n        <tr>\n            <th colspan="2">Members of ',
        (e = c.term) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.term,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + " (<span>" + t((d = a && a.result,
        d = null == d || !1 === d ? d : d.details,
        d = null == d || !1 === d ? d : d.total,
        typeof d === s ? d.apply(a) : d)) + '</span>)</th>\n        </tr>\n        <tr>\n            <th><span data-i18n-id="i18n_term" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_term", "Term", f) : u.call(a, "i18n", "i18n_term", "Term", f))) + '</span></th>\n            <th><span data-i18n-id="i18n_conceptId" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_conceptId", "Concept Id", f) : u.call(a, "i18n", "i18n_conceptId", "Concept Id", f))) + "</span></th>\n        </tr>\n    </thead>\n"
    }
    function g(a, b, d) {
        var e, f, g, i = "";
        return i += '\n        <tr class="member-concept-row">\n            <td>\n                <span class="badge alert-warning" draggable=\'true\' ondragstart="drag(event, \'' + t((e = d && d.divElementId,
        typeof e === s ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "'>&nbsp;&nbsp;</span>\n                ",
        f = c.hasCountryIcon || a && a.hasCountryIcon,
        g = {
            hash: {},
            inverse: v.noop,
            fn: v.program(4, h, b),
            data: b
        },
        e = f ? f.call(a, a && a.module, g) : u.call(a, "hasCountryIcon", a && a.module, g),
        (e || 0 === e) && (i += e),
        i += "\n                ",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "\n            </td>\n            <td>",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        i += t(e) + "</td>\n        </tr>\n    "
    }
    function h(a, b) {
        var d, e, f = "";
        return f += '\n                    <div class="phoca-flagbox" style="width:22px;height:22px">\n                        <span class="phoca-flag ' + t((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : u.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                    </div>\n                '
    }
    function i(a, b) {
        var d, e, f, g = "";
        return g += '\n            <td class="text-center" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + "-moreMembers\" colspan=\"2\">\n                <button class='btn btn-link' id='",
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + '-moreMembers\'><span data-i18n-id="i18n_load" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_load", "Load", f) : u.call(a, "i18n", "i18n_load", "Load", f))) + "</span> ",
        (e = c.returnLimit) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.returnLimit,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_more" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_more", "more", f) : u.call(a, "i18n", "i18n_more", "more", f))) + "</span></button>\n            </td>\n        "
    }
    function j(a, b) {
        var d, e, f, g = "";
        return g += "\n            ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: v.program(11, l, b),
            fn: v.program(9, k, b),
            data: b
        },
        d = e ? e.call(a, a && a.remaining, 0, f) : u.call(a, "if_eq", a && a.remaining, 0, f),
        (d || 0 === d) && (g += d),
        g += "\n        "
    }
    function k(a, b) {
        var c, d = "";
        return d += '\n                <td class="text-muted" class="text-center" colspan="2">' + t((c = a && a.result,
        c = null == c || !1 === c ? c : c.details,
        c = null == c || !1 === c ? c : c.total,
        typeof c === s ? c.apply(a) : c)) + ' <span data-i18n-id="i18n_members" class="i18n">members</span></td>\n            '
    }
    function l(a, b) {
        var d, e, f, g = "";
        return g += "\n                ",
        e = c.if_gr || a && a.if_gr,
        f = {
            hash: {},
            inverse: v.program(14, n, b),
            fn: v.program(12, m, b),
            data: b
        },
        d = e ? e.call(a, a && a.remaining, a && a.returnLimit, f) : u.call(a, "if_gr", a && a.remaining, a && a.returnLimit, f),
        (d || 0 === d) && (g += d),
        g += "\n            "
    }
    function m(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <td class="text-center" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + "-moreMembers\" colspan=\"2\">\n                        <button class='btn btn-link' id='",
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + '-moreMembers\'><span data-i18n-id="i18n_load" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_load", "Load", f) : u.call(a, "i18n", "i18n_load", "Load", f))) + "</span> ",
        (e = c.returnLimit) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.returnLimit,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_more" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_more", "more", f) : u.call(a, "i18n", "i18n_more", "more", f))) + "</span> (",
        (e = c.remaining) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.remaining,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_remaining" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_remaining", "remaining", f) : u.call(a, "i18n", "i18n_remaining", "remaining", f))) + "</span>)</button>\n                    </td>\n                "
    }
    function n(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <td class="text-center" colspan="2">\n                        <button class=\'btn btn-link\' id=\'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + '-moreMembers\'><span data-i18n-id="i18n_load" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_load", "Load", f) : u.call(a, "i18n", "i18n_load", "Load", f))) + "</span> ",
        (e = c.remaining) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.remaining,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_more" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_more", "more", f) : u.call(a, "i18n", "i18n_more", "more", f))) + "</span> (",
        (e = c.remaining) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.remaining,
        d = typeof e === s ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += t(d) + ' <span data-i18n-id="i18n_remaining" class="i18n">' + t((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_remaining", "remaining", f) : u.call(a, "i18n", "i18n_remaining", "remaining", f))) + "</span>)</button>\n                    </td>\n                "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var o, p, q, r = "", s = "function", t = this.escapeExpression, u = c.helperMissing, v = this;
    return p = c.if_eq || b && b.if_eq,
    q = {
        hash: {},
        inverse: v.noop,
        fn: v.program(1, f, e),
        data: e
    },
    o = p ? p.call(b, b && b.skipTo, 0, q) : u.call(b, "if_eq", b && b.skipTo, 0, q),
    (o || 0 === o) && (r += o),
    r += "\n<tbody>\n    ",
    o = c.each.call(b, (o = b && b.result,
    null == o || !1 === o ? o : o.members), {
        hash: {},
        inverse: v.noop,
        fn: v.programWithDepth(3, g, e, b),
        data: e
    }),
    (o || 0 === o) && (r += o),
    r += '\n\n    <tr class="more-row">\n        ',
    p = c.if_eq || b && b.if_eq,
    q = {
        hash: {},
        inverse: v.program(8, j, e),
        fn: v.program(6, i, e),
        data: e
    },
    o = p ? p.call(b, b && b.remaining, "asd", q) : u.call(b, "if_eq", b && b.remaining, "asd", q),
    (o || 0 === o) && (r += o),
    r += "\n    </tr>\n</tbody>"
}),
this.JST["views/searchPlugin/aux.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h, i = "", j = "function", k = this.escapeExpression, l = c.helperMissing;
    return i += "<div style='margin: 5px; height:95%;' class='panel panel-default'>\n    <div class='panel-heading'>\n        <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-ownMarker' class='btn btn-link btn-lg' style='padding: 2px; position: absolute;top: 1px;left: 0px;'><i class='glyphicon glyphicon-book'></i></button>\n        <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-subscribersMarker' class='btn btn-link btn-lg' style='padding: 2px; position: absolute;top: 1px;left: 15px;'><i class='glyphicon glyphicon-bookmark'></i></button>\n        <div class='row'>\n            <div class='col-md-8' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-panelTitle'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<strong><span class='i18n' data-i18n-id='i18n_search'>Search</span></span></strong></div>\n            <div class='col-md-4 text-right'>\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-linkerButton\' draggable="true" ondragstart="drag(event, \'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "')\" class='btn btn-link linker-button' data-panel='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "' style='padding:2px'><i class='glyphicon glyphicon-link'></i></button>--\x3e\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-historyButton' class='btn btn-link history-button' style='padding:2px'><i class='glyphicon glyphicon-time'></i></button>\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-configButton' class='btn btn-link' data-toggle='modal' style='padding:2px' data-target='#",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-configModal'><i class='glyphicon glyphicon-cog'></i></button>--\x3e\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-collapseButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-small'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-expandButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-full'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-closeButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-remove'></i></button>\n            </div>\n        </div>\n    </div>\n    <div class='panel-body' style='height:86%' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-panelBody'>\n        <div style=\"display: inline;width: 34%;height: 100%; float: left; border: 1px solid lightgray; border-radius: 4px; padding: 5px; \">\n            <h4><span>Options</span></h4>\n            <div id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-searchConfigBar' style='margin-bottom: 10px;'>\n                \x3c!--<nav class='navbar navbar-default' role='navigation' style='min-height: 28px;border-radius: 0px;border-bottom: 1px lightgray solid;'>--\x3e\n                \x3c!--<ul class=\"list-group\">--\x3e\n                \x3c!--&lt;!&ndash;<li class=\"list-group-item\">&ndash;&gt;--\x3e\n                \x3c!--<li class=\"list-group-item\"><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-fullTextButton'><span class='i18n' data-i18n-id='i18n_full_text_search_mode'>Full text search mode</span></button></li>--\x3e\n                \x3c!--<li class=\"list-group-item\"><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-partialMatchingButton'><span class='i18n' data-i18n-id='i18n_partial_match_search_mode'>Partial matching search mode</span></button></li>--\x3e\n                \x3c!--<li class=\"list-group-item\"><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-regexButton\'><span class=\'i18n\' data-i18n-id=\'i18n_regex_search_mode\'>Regular Expressions search mode</span></button></li>--\x3e\n                \x3c!--</ul>--\x3e\n                <div style="margin-top: 20px" class="btn-group">\n                    <button style="white-space: normal;" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">\n                        <span class=\'i18n\' data-i18n-id=\'i18n_search_mode\'>' + k((g = c.i18n || b && b.i18n,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, "i18n_search_mode", "Search Mode", h) : l.call(b, "i18n", "i18n_search_mode", "Search Mode", h))) + '</span>: <span id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-searchMode"></span>&nbsp;<span class="caret"></span>\n                    </button>\n                    <ul class="dropdown-menu" role="menu">\n                        <li>\n                            <a href="#" id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-fullTextButton'><span class='i18n' data-i18n-id='i18n_full_text_search_mode'>" + k((g = c.i18n || b && b.i18n,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, "i18n_full_text_search_mode", "Full text search mode", h) : l.call(b, "i18n", "i18n_full_text_search_mode", "Full text search mode", h))) + '</span></a>\n                        </li>\n                        <li>\n                            <a href="#" id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-partialMatchingButton'><span class='i18n' data-i18n-id='i18n_partial_match_search_mode'>" + k((g = c.i18n || b && b.i18n,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, "i18n_partial_match_search_mode", "Partial matching search mode", h) : l.call(b, "i18n", "i18n_partial_match_search_mode", "Partial matching search mode", h))) + '</span></a>\n                        </li>\n                        <li>\n                            <a href="#" id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-regexButton'><span class='i18n' data-i18n-id='i18n_regex_search_mode'>" + k((g = c.i18n || b && b.i18n,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, "i18n_regex_search_mode", "Regular Expressions search mode", h) : l.call(b, "i18n", "i18n_regex_search_mode", "Regular Expressions search mode", h))) + '</span></a>\n                        </li>\n                    </ul>\n                </div>\n                <div style="margin-top: 5px" class="btn-group">\n                    <button style="white-space: normal;" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">\n                        <span class=\'i18n\' data-i18n-id=\'i18n_status\'>' + k((g = c.i18n || b && b.i18n,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, "i18n_status", "Status", h) : l.call(b, "i18n", "i18n_status", "Status", h))) + '</span>: <span id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-searchStatus"></span>&nbsp;<span class="caret"></span>\n                    </button>\n                    <ul class="dropdown-menu" role="menu">\n                        <li>\n                            <a href="#" id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-activeOnlyButton' data-i18n-id='i18n_active_only'>" + k((g = c.i18n || b && b.i18n,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, "i18n_active_only", "Active components only", h) : l.call(b, "i18n", "i18n_active_only", "Active components only", h))) + '</a>\n                        </li>\n                        <li>\n                            <a href="#" id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-activeInactiveButton' data-i18n-id='i18n_active_and_inactive'>" + k((g = c.i18n || b && b.i18n,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, "i18n_active_and_inactive", "Active and inactive components", h) : l.call(b, "i18n", "i18n_active_and_inactive", "Active and inactive components", h))) + '</a>\n                        </li>\n                        <li>\n                            <a href="#"id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-inactiveOnlyButton' data-i18n-id='i18n_inactive_only'>" + k((g = c.i18n || b && b.i18n,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, "i18n_inactive_only", "Inactive components only", h) : l.call(b, "i18n", "i18n_inactive_only", "Inactive components only", h))) + '</a>\n                        </li>\n                    </ul>\n                </div>\n                <div style="margin-top: 5px; " class="checkbox">\n                    <label>\n                        <input id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-groupConcept\" type=\"checkbox\"><span class='i18n' data-i18n-id='i18n_group_by_concept'>" + k((g = c.i18n || b && b.i18n,
    h = {
        hash: {},
        data: e
    },
    g ? g.call(b, "i18n_group_by_concept", "Group by concept", h) : l.call(b, "i18n", "i18n_group_by_concept", "Group by concept", h))) + "</span>\n                    </label>\n                </div>\n                \x3c!--<ul class='nav navbar-nav navbar-left'>--\x3e\n                \x3c!--<li class='dropdown' style='margin-bottom: 2px; margin-top: 2px;'>--\x3e\n                \x3c!--<a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' style='padding-top: 2px; padding-bottom: 2px;'><span id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-navSearchModeLabel'></span> <b class='caret'></b></a>--\x3e\n                \x3c!--<ul class='dropdown-menu' role='menu' style='float: none;'>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-fullTextButton'><span class='i18n' data-i18n-id='i18n_full_text_search_mode'>Full text search mode</span></button></li>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-partialMatchingButton'><span class='i18n' data-i18n-id='i18n_partial_match_search_mode'>Partial matching search mode</span></button></li>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-regexButton'><span class='i18n' data-i18n-id='i18n_regex_search_mode'>Regular Expressions search mode</span></button></li>--\x3e\n                \x3c!--</ul>--\x3e\n                \x3c!--</li>--\x3e\n                \x3c!--<li class='dropdown' style='margin-bottom: 2px; margin-top: 2px;'>--\x3e\n                \x3c!--<a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' style='padding-top: 2px; padding-bottom: 2px;'><span id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-navLanguageLabel'></span> <b class='caret'></b></a>--\x3e\n                \x3c!--<ul class='dropdown-menu' role='menu' style='float: none;'>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-danishLangButton'><span class='i18n' data-i18n-id='i18n_danish_stemmer'>Danish language stemmer</span></button></li>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-englishLangButton'><span class='i18n' data-i18n-id='i18n_english_stemmer'>English language stemmer</span></button></li>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-spanishLangButton'><span class='i18n' data-i18n-id='i18n_spanish_stemmer'>Spanish language stemmer</span></button></li>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-swedishLangButton'><span class='i18n' data-i18n-id='i18n_swedish_stemmer'>Swedish language stemmer</span></button></li>--\x3e\n                \x3c!--</ul>--\x3e\n                \x3c!--</li>--\x3e\n                \x3c!--<li class='dropdown' style='margin-bottom: 2px; margin-top: 2px;'>--\x3e\n                \x3c!--<a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' style='padding-top: 2px; padding-bottom: 2px;'><span id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-navStatusFilterLabel'></span> <b class='caret'></b></a>--\x3e\n                \x3c!--<ul class='dropdown-menu' role='menu' style='float: none;'>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-activeOnlyButton'><span class='i18n' data-i18n-id='i18n_active_only'>Active components only</span></button></li>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-activeInactiveButton'><span class='i18n' data-i18n-id='i18n_active_and_inactive'>Active and inactive components</span></button></li>--\x3e\n                \x3c!--<li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-inactiveOnlyButton'><span class='i18n' data-i18n-id='i18n_inactive_only'>Inactive components only</span></button></li>--\x3e\n                \x3c!--</ul>--\x3e\n                \x3c!--</li>--\x3e\n                \x3c!--</ul>--\x3e\n                \x3c!--</nav>--\x3e\n            </div>\n            <div id=\"",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-searchBar2"></div>\n        </div>\n        <div style="display: inline; width: 66%; float: right; padding: 5px;">\n            <form>\n                <div class="form-group" style="margin-bottom: 2px;">\n                    <label for="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-searchBox">\n                        <span class="i18n" data-i18n-id="i18n_type_3_chars">Type at least 3 characters</span> <i class="glyphicon glyphicon-remove text-danger" id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-typeIcon"></i> <span id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-searchExample"></span></label>\n                    <br><div class="btn-group" style="width: 100%;"><input data-droppable="true" ondrop="dropS(event);" ondragover="removeHighlight();" ondragstart="allowDrop(event);" type="search" class="form-control" id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-searchBox" placeholder="Search..." autocomplete="off">\n                    <span id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-clearButton\" class=\"searchclear glyphicon glyphicon-remove-circle\"></span></div>\n                </div>\n            </form>\n            <div class='panel panel-default' style='height:70%;overflow:auto;margin-bottom: 15px;min-height: 300px;' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-resultsScrollPane'>\n                <div id=\"",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + '-searchBar"></div>\n                <div id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-searchFilters\"></div>\n                <table class='table table-bordered'>\n                    <tbody id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-resultsTable'>\n                    </tbody>\n                </table>\n            </div>\n            <div class='modal fade' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-configModal'>\n                <div class='modal-dialog'>\n                    <div class='modal-content'>\n                        <div class='modal-header'>\n                            <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>\n                            <h4 class='modal-title'><span class='i18n' data-i18n-id='i18n_options'>Options</span> (",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + ")</h4>\n                        </div>\n                        <div class='modal-body' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-modal-body'>\n                            <p></p>\n                        </div>\n                        <div class='modal-footer'>\n                            <button type='button' class='btn btn-danger' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_cancel'>Cancel</span></button>\n                            <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === j ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    i += k(f) + "-apply-button' type='button' class='btn btn-success' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_apply_changes'>Apply changes</span></button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"
}),
this.JST["views/searchPlugin/body/0.hbs"] = Handlebars.template(function(a, b, c, d, e, f) {
    function g(a, b, d, e) {
        var f, g, l, m = "";
        return m += "\n    <tr class='resultRow selectable-row ",
        f = c.if.call(a, a && a.danger, {
            hash: {},
            inverse: t.noop,
            fn: t.program(2, h, b),
            data: b
        }),
        (f || 0 === f) && (m += f),
        m += "'>\n        <td class='col-md-7'>\n            <div class='result-item' data-module=\"",
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "\" data-concept-id='",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "' data-term='",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "'>\n                ",
        g = c.if_eq || a && a.if_eq,
        l = {
            hash: {},
            inverse: t.programWithDepth(6, j, b, d),
            fn: t.programWithDepth(4, i, b, d),
            data: b
        },
        f = g ? g.call(a, a && a.definitionStatus, "Primitive", l) : s.call(a, "if_eq", a && a.definitionStatus, "Primitive", l),
        (f || 0 === f) && (m += f),
        m += "\n                ",
        g = c.hasCountryIcon || a && a.hasCountryIcon,
        l = {
            hash: {},
            inverse: t.noop,
            fn: t.program(8, k, b),
            data: b
        },
        f = g ? g.call(a, a && a.module, l) : s.call(a, "hasCountryIcon", a && a.module, l),
        (f || 0 === f) && (m += f),
        m += "\n                <a href='javascript:void(0);' style='color: inherit;text-decoration: inherit;' draggable=\"true\" ondragstart=\"drag(event, '" + r((f = e && e.divElementId,
        typeof f === q ? f.apply(a) : f)) + "')\" data-term='",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "' data-module=\"",
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "\" data-concept-id='",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "' data-term='",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "'>",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "</a>\n            </div>\n        </td>\n        <td class='text-muted small-text col-md-5 result-item' data-term='",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "' data-module=\"",
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "\" data-concept-id='",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "' data-term='",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === q ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += r(f) + "'>\n            " + r((f = d && d.result,
        f = null == f || !1 === f ? f : f.defaultTerm,
        typeof f === q ? f.apply(a) : f)) + "\n        </td>\n    </tr>\n"
    }
    function h(a, b) {
        return "danger"
    }
    function i(a, b, d) {
        var e, f, g = "";
        return g += '\n                    <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + r((e = d && d.divElementId,
        typeof e === q ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === q ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += r(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === q ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += r(e) + '" data-term="',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === q ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += r(e) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                '
    }
    function j(a, b, d) {
        var e, f, g = "";
        return g += '\n                    <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + r((e = d && d.divElementId,
        typeof e === q ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === q ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += r(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === q ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += r(e) + '" data-term="',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === q ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += r(e) + '">&equiv;</span>&nbsp;&nbsp;\n                '
    }
    function k(a, b) {
        var d, e, f = "";
        return f += '\n                    <div class="phoca-flagbox" style="width:20px;height:20px">\n                        <span class="phoca-flag ' + r((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : s.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                    </div>\n                '
    }
    function l(a, b) {
        var d, e, f = "";
        return f += '\n    <tr><td class=\'text-muted\'><span data-i18n-id="i18n_no_results" class="i18n">' + r((d = c.i18n || a && a.i18n,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, "i18n_no_results", "No results", e) : s.call(a, "i18n", "i18n_no_results", "No results", e))) + "</span></td></tr>\n"
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var m, n, o, p = "", q = "function", r = this.escapeExpression, s = c.helperMissing, t = this;
    return m = c.each.call(b, (m = b && b.result,
    null == m || !1 === m ? m : m.descriptions), {
        hash: {},
        inverse: t.noop,
        fn: t.programWithDepth(1, g, e, b, f),
        data: e
    }),
    (m || 0 === m) && (p += m),
    p += "\n\n",
    n = c.if_eq || b && b.if_eq,
    o = {
        hash: {},
        inverse: t.noop,
        fn: t.program(10, l, e),
        data: e
    },
    m = n ? n.call(b, (m = b && b.result,
    m = null == m || !1 === m ? m : m.descriptions,
    null == m || !1 === m ? m : m.length), 0, o) : s.call(b, "if_eq", (m = b && b.result,
    m = null == m || !1 === m ? m : m.descriptions,
    null == m || !1 === m ? m : m.length), 0, o),
    (m || 0 === m) && (p += m),
    p += "\n"
}),
this.JST["views/searchPlugin/body/1.hbs"] = Handlebars.template(function(a, b, c, d, e, f) {
    function g(a, b, d, e) {
        var f, g, l, m = "";
        return m += "\n    <tr class='resultRow selectable-row",
        g = c.if_eq || a && a.if_eq,
        l = {
            hash: {},
            inverse: q.program(4, i, b),
            fn: q.program(2, h, b),
            data: b
        },
        f = g ? g.call(a, a && a.active, !1, l) : r.call(a, "if_eq", a && a.active, !1, l),
        (f || 0 === f) && (m += f),
        m += "'>\n        <td class='col-md-7'>\n            <div class='result-item' data-module=\"",
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "\" data-concept-id='",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "' data-term='",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "'>\n                ",
        g = c.if_eq || a && a.if_eq,
        l = {
            hash: {},
            inverse: q.programWithDepth(8, k, b, a),
            fn: q.programWithDepth(6, j, b, d),
            data: b
        },
        f = g ? g.call(a, a && a.definitionStatus, "Primitive", l) : r.call(a, "if_eq", a && a.definitionStatus, "Primitive", l),
        (f || 0 === f) && (m += f),
        m += "\n                ",
        g = c.hasCountryIcon || a && a.hasCountryIcon,
        l = {
            hash: {},
            inverse: q.noop,
            fn: q.program(13, n, b),
            data: b
        },
        f = g ? g.call(a, a && a.module, l) : r.call(a, "hasCountryIcon", a && a.module, l),
        (f || 0 === f) && (m += f),
        m += "\n                <a href='javascript:void(0);' style='color: inherit;text-decoration: inherit;' draggable=\"true\" ondragstart=\"drag(event, '" + t((f = e && e.divElementId,
        typeof f === s ? f.apply(a) : f)) + '\')" data-module="',
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "\" data-concept-id='",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "' data-term='",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "'>",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "</a>\n            </div>\n        </td>\n        <td class='text-muted small-text col-md-5 result-item' data-module=\"",
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "\" data-concept-id='",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "' data-term='",
        (g = c.term) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.term,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "'>\n            ",
        (g = c.fsn) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.fsn,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        m += t(f) + "\n        </td>\n    </tr>\n"
    }
    function h(a, b) {
        return "danger"
    }
    function i(a, b) {
        var d, e, f;
        return e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: q.noop,
            fn: q.program(2, h, b),
            data: b
        },
        d = e ? e.call(a, a && a.conceptActive, !1, f) : r.call(a, "if_eq", a && a.conceptActive, !1, f),
        d || 0 === d ? d : ""
    }
    function j(a, b, d) {
        var e, f, g = "";
        return g += '\n                    <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + t((e = d && d.divElementId,
        typeof e === s ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-term="',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                '
    }
    function k(a, b, d) {
        var e, f, g, h = "";
        return h += "\n                  ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: q.programWithDepth(11, m, b, d),
            fn: q.programWithDepth(9, l, b, d),
            data: b
        },
        e = f ? f.call(a, a && a.definitionStatus, "900000000000074008", g) : r.call(a, "if_eq", a && a.definitionStatus, "900000000000074008", g),
        (e || 0 === e) && (h += e),
        h += "\n                "
    }
    function l(a, b, d) {
        var e, f, g = "";
        return g += '\n                      <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + t((e = d && d.divElementId,
        typeof e === s ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-term="',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                    '
    }
    function m(a, b, d) {
        var e, f, g = "";
        return g += '\n                      <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + t((e = d && d.divElementId,
        typeof e === s ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-term="',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '">&equiv;</span>&nbsp;&nbsp;\n                    '
    }
    function n(a, b) {
        var d, e, f = "";
        return f += '\n                    <div class="phoca-flagbox" style="width:20px;height:20px">\n                        <span class="phoca-flag ' + t((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : r.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                    </div>\n                '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var o, p = "", q = this, r = c.helperMissing, s = "function", t = this.escapeExpression;
    return o = c.each.call(b, (o = b && b.result,
    null == o || !1 === o ? o : o.matches), {
        hash: {},
        inverse: q.noop,
        fn: q.programWithDepth(1, g, e, b, f),
        data: e
    }),
    (o || 0 === o) && (p += o),
    p += "\n"
}),
this.JST["views/searchPlugin/body/bar.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f = "";
        return f += "\n    <span class='text-muted'>" + x((d = a && a.result,
        d = null == d || !1 === d ? d : d.details,
        d = null == d || !1 === d ? d : d.total,
        typeof d === w ? d.apply(a) : d)) + " matches found in ",
        (e = c.elapsed) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.elapsed,
        d = typeof e === w ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += x(d) + " seconds.</span>\n"
    }
    function g(a, b) {
        return "--\x3e\n\x3c!--"
    }
    function h(a, b) {
        var c, d = "";
        return d += "--\x3e\n    \x3c!--&nbsp;&nbsp;<span class='label label-danger'>" + x((c = a && a.options,
        c = null == c || !1 === c ? c : c.semTagFilter,
        typeof c === w ? c.apply(a) : c)) + "&nbsp;<a href='javascript:void(0);' style='color: white;text-decoration: none;' class='remove-semtag'>&times;</a></span>&nbsp;&nbsp;--\x3e\n\x3c!--"
    }
    function i(a, b) {
        var c, d = "";
        return d += "--\x3e\n    \x3c!--&nbsp;&nbsp;<span class='label label-danger'>" + x((c = a && a.options,
        c = null == c || !1 === c ? c : c.langFilter,
        typeof c === w ? c.apply(a) : c)) + "&nbsp;<a href='javascript:void(0);' style='color: white;text-decoration: none;' class='remove-lang'>&times;</a></span>&nbsp;&nbsp;--\x3e\n\x3c!--"
    }
    function j(a, b) {
        var d, e = "";
        return e += "--\x3e\n    \x3c!--&nbsp;&nbsp;<span class='label label-danger'>",
        d = c.if.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.moduleFilterName), {
            hash: {},
            inverse: y.program(12, l, b),
            fn: y.program(10, k, b),
            data: b
        }),
        (d || 0 === d) && (e += d),
        e += " &nbsp;<a href='javascript:void(0);' style='color: white;text-decoration: none;' class='remove-module'>&times;</a></span>&nbsp;&nbsp;--\x3e\n\x3c!--"
    }
    function k(a, b) {
        var c;
        return x((c = a && a.options,
        c = null == c || !1 === c ? c : c.moduleFilterName,
        typeof c === w ? c.apply(a) : c))
    }
    function l(a, b) {
        var c;
        return x((c = a && a.options,
        c = null == c || !1 === c ? c : c.moduleFilter,
        typeof c === w ? c.apply(a) : c))
    }
    function m(a, b) {
        var c, d = "";
        return d += "--\x3e\n                        \x3c!--<li><a class='lang-link' href='javascript:void(0);' data-lang='" + x((c = null == b || !1 === b ? b : b.key,
        typeof c === w ? c.apply(a) : c)) + "'>" + x((c = null == b || !1 === b ? b : b.key,
        typeof c === w ? c.apply(a) : c)) + " (" + x(typeof a === w ? a.apply(a) : a) + ")</a></li>--\x3e\n                    \x3c!--"
    }
    function n(a, b) {
        var c, d = "";
        return d += "--\x3e\n                        \x3c!--<li><a class='semtag-link' href='javascript:void(0);' data-semtag='" + x((c = null == b || !1 === b ? b : b.key,
        typeof c === w ? c.apply(a) : c)) + "'>" + x((c = null == b || !1 === b ? b : b.key,
        typeof c === w ? c.apply(a) : c)) + " (" + x(typeof a === w ? a.apply(a) : a) + ")</a></li>--\x3e\n                    \x3c!--"
    }
    function o(a, b) {
        var d, e, f, g = "";
        return g += "--\x3e\n                        \x3c!--<li><a class='module-link' href='javascript:void(0);' data-term=\"",
        (e = c.term) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.term,
        d = typeof e === w ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += x(d) + "\" data-module='",
        (e = c.value) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.value,
        d = typeof e === w ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += x(d) + "'>",
        d = c.if.call(a, a && a.term, {
            hash: {},
            inverse: y.program(21, q, b),
            fn: y.program(19, p, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += " (",
        (e = c.cant) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.cant,
        d = typeof e === w ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += x(d) + ")--\x3e\n                        \x3c!--",
        e = c.hasCountryIcon || a && a.hasCountryIcon,
        f = {
            hash: {},
            inverse: y.noop,
            fn: y.program(23, r, b),
            data: b
        },
        d = e ? e.call(a, a && a.value, f) : z.call(a, "hasCountryIcon", a && a.value, f),
        (d || 0 === d) && (g += d),
        g += "--\x3e\n                        \x3c!--</a></li>--\x3e\n                    \x3c!--"
    }
    function p(a, b) {
        var d, e;
        return (e = c.term) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.term,
        d = typeof e === w ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        x(d)
    }
    function q(a, b) {
        var d, e;
        return (e = c.value) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.value,
        d = typeof e === w ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        x(d)
    }
    function r(a, b) {
        var d, e, f = "";
        return f += '--\x3e\n                            \x3c!--<div class="phoca-flagbox" style="width:26px;height:26px">--\x3e\n                                \x3c!--<span class="phoca-flag ' + x((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.value, e) : z.call(a, "countryIcon", a && a.value, e))) + '"></span>--\x3e\n                            \x3c!--</div>--\x3e\n                        \x3c!--'
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var s, t, u, v = "", w = "function", x = this.escapeExpression, y = this, z = c.helperMissing;
    return s = c.if.call(b, (s = b && b.result,
    null == s || !1 === s ? s : s.details), {
        hash: {},
        inverse: y.noop,
        fn: y.program(1, f, e),
        data: e
    }),
    (s || 0 === s) && (v += s),
    v += "\n\x3c!--<span class='pull right'>--\x3e\n\x3c!--<a class='btm btn-xs' style='margin: 3px; color: #777; background-color: #fff; border: 1px #ccc solid; margin-left: 25px;' data-toggle='collapse' href='#",
    (t = c.divElementId) ? s = t.call(b, {
        hash: {},
        data: e
    }) : (t = b && b.divElementId,
    s = typeof t === w ? t.call(b, {
        hash: {},
        data: e
    }) : t),
    v += x(s) + "-searchFiltersPanel'>--\x3e\n    \x3c!--<span class='i18n' data-i18n-id='i18n_filters'>" + x((t = c.i18n || b && b.i18n,
    u = {
        hash: {},
        data: e
    },
    t ? t.call(b, "i18n_filters", "Filters", u) : z.call(b, "i18n", "i18n_filters", "Filters", u))) + "</span>--\x3e\n\x3c!--</a>--\x3e\n\x3c!--",
    t = c.if_eq || b && b.if_eq,
    u = {
        hash: {},
        inverse: y.program(5, h, e),
        fn: y.program(3, g, e),
        data: e
    },
    s = t ? t.call(b, (s = b && b.options,
    null == s || !1 === s ? s : s.semTagFilter), "none", u) : z.call(b, "if_eq", (s = b && b.options,
    null == s || !1 === s ? s : s.semTagFilter), "none", u),
    (s || 0 === s) && (v += s),
    v += "--\x3e\n\x3c!--",
    t = c.if_eq || b && b.if_eq,
    u = {
        hash: {},
        inverse: y.program(7, i, e),
        fn: y.program(3, g, e),
        data: e
    },
    s = t ? t.call(b, (s = b && b.options,
    null == s || !1 === s ? s : s.langFilter), "none", u) : z.call(b, "if_eq", (s = b && b.options,
    null == s || !1 === s ? s : s.langFilter), "none", u),
    (s || 0 === s) && (v += s),
    v += "--\x3e\n\x3c!--",
    t = c.if_eq || b && b.if_eq,
    u = {
        hash: {},
        inverse: y.program(9, j, e),
        fn: y.program(3, g, e),
        data: e
    },
    s = t ? t.call(b, (s = b && b.options,
    null == s || !1 === s ? s : s.moduleFilter), "none", u) : z.call(b, "if_eq", (s = b && b.options,
    null == s || !1 === s ? s : s.moduleFilter), "none", u),
    (s || 0 === s) && (v += s),
    v += "--\x3e\n\x3c!--</span>--\x3e\n\x3c!--<div id='",
    (t = c.divElementId) ? s = t.call(b, {
        hash: {},
        data: e
    }) : (t = b && b.divElementId,
    s = typeof t === w ? t.call(b, {
        hash: {},
        data: e
    }) : t),
    v += x(s) + "-searchFiltersPanel' class='panel-collapse collapse'>--\x3e\n    \x3c!--<div class='tree'>--\x3e\n        \x3c!--<ul>--\x3e\n            \x3c!--<li><a><span data-i18n-id=\"i18n_filters_language\" class=\"i18n\">" + x((t = c.i18n || b && b.i18n,
    u = {
        hash: {},
        data: e
    },
    t ? t.call(b, "i18n_filters_language", "Filter results by Language", u) : z.call(b, "i18n", "i18n_filters_language", "Filter results by Language", u))) + "</span></a>--\x3e\n                \x3c!--<ul>--\x3e\n                    \x3c!--",
    s = c.each.call(b, (s = b && b.result,
    s = null == s || !1 === s ? s : s.filters,
    null == s || !1 === s ? s : s.lang), {
        hash: {},
        inverse: y.noop,
        fn: y.program(14, m, e),
        data: e
    }),
    (s || 0 === s) && (v += s),
    v += '--\x3e\n                \x3c!--</ul>--\x3e\n            \x3c!--</li>--\x3e\n        \x3c!--</ul>--\x3e\n        \x3c!--<ul>--\x3e\n            \x3c!--<li><a><span data-i18n-id="i18n_filters_semtag" class="i18n">' + x((t = c.i18n || b && b.i18n,
    u = {
        hash: {},
        data: e
    },
    t ? t.call(b, "i18n_filters_semtag", "Filter results by Semantic Tag", u) : z.call(b, "i18n", "i18n_filters_semtag", "Filter results by Semantic Tag", u))) + "</span></a>--\x3e\n                \x3c!--<ul>--\x3e\n                    \x3c!--",
    s = c.each.call(b, (s = b && b.result,
    s = null == s || !1 === s ? s : s.filters,
    null == s || !1 === s ? s : s.semTag), {
        hash: {},
        inverse: y.noop,
        fn: y.program(16, n, e),
        data: e
    }),
    (s || 0 === s) && (v += s),
    v += '--\x3e\n                \x3c!--</ul>--\x3e\n            \x3c!--</li>--\x3e\n        \x3c!--</ul>--\x3e\n        \x3c!--<ul>--\x3e\n            \x3c!--<li><a><span data-i18n-id="i18n_filters_module" class="i18n">' + x((t = c.i18n || b && b.i18n,
    u = {
        hash: {},
        data: e
    },
    t ? t.call(b, "i18n_filters_module", "Filter results by Module", u) : z.call(b, "i18n", "i18n_filters_module", "Filter results by Module", u))) + "</span></a>--\x3e\n                \x3c!--<ul>--\x3e\n                    \x3c!--",
    s = c.each.call(b, (s = b && b.result,
    s = null == s || !1 === s ? s : s.filters,
    null == s || !1 === s ? s : s.module), {
        hash: {},
        inverse: y.noop,
        fn: y.program(18, o, e),
        data: e
    }),
    (s || 0 === s) && (v += s),
    v += "--\x3e\n                \x3c!--</ul>--\x3e\n            \x3c!--</li>--\x3e\n        \x3c!--</ul>--\x3e\n    \x3c!--</div>--\x3e\n\x3c!--</div>--\x3e"
}),
this.JST["views/searchPlugin/body/bar2.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        return "\n"
    }
    function g(a, b) {
        var d, e, f = "";
        return f += '\n    <h3 style="margin-top: 5px;">\n        <span id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += P(d) + '-moduleResumed" style="font-size: 12px;white-space: normal" class=\'label label-danger\' data-name="',
        d = c.if.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.moduleFilterName), {
            hash: {},
            inverse: R.program(6, i, b),
            fn: R.program(4, h, b),
            data: b
        }),
        (d || 0 === d) && (f += d),
        f += '">',
        d = c.if.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.moduleFilterName), {
            hash: {},
            inverse: R.program(10, k, b),
            fn: R.program(8, j, b),
            data: b
        }),
        (d || 0 === d) && (f += d),
        f += " &nbsp;<a href='javascript:void(0);' style='color: white;text-decoration: none;' class='remove-module'>&times;</a></span>\n    </h3>\n"
    }
    function h(a, b) {
        var c;
        return P((c = a && a.options,
        c = null == c || !1 === c ? c : c.moduleFilterName,
        typeof c === O ? c.apply(a) : c))
    }
    function i(a, b) {
        var c;
        return P((c = a && a.options,
        c = null == c || !1 === c ? c : c.moduleFilter,
        typeof c === O ? c.apply(a) : c))
    }
    function j(a, b) {
        var d, e, f;
        return P((e = c.first20chars || a && a.first20chars,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.moduleFilterName), f) : Q.call(a, "first20chars", (d = a && a.options,
        null == d || !1 === d ? d : d.moduleFilterName), f)))
    }
    function k(a, b) {
        var d, e, f;
        return P((e = c.first20chars || a && a.first20chars,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.moduleFilter), f) : Q.call(a, "first20chars", (d = a && a.options,
        null == d || !1 === d ? d : d.moduleFilter), f)))
    }
    function l(a, b) {
        var c, d = "";
        return d += '\n    <h3 style="margin-top: 5px;">\n        <span style="font-size: 12px; margin-top: 5px;" class=\'label label-danger\'>' + P((c = a && a.options,
        c = null == c || !1 === c ? c : c.langFilter,
        typeof c === O ? c.apply(a) : c)) + "&nbsp;<a href='javascript:void(0);' style='color: white;text-decoration: none;' class='remove-lang'>&times;</a></span>\n    </h3>\n"
    }
    function m(a, b) {
        var c, d = "";
        return d += '\n    <h3 style="margin-top: 5px;">\n        <span style="font-size: 12px; margin-top: 5px;" class=\'label label-danger\'>' + P((c = a && a.options,
        c = null == c || !1 === c ? c : c.semTagFilter,
        typeof c === O ? c.apply(a) : c)) + "&nbsp;<a href='javascript:void(0);' style='color: white;text-decoration: none;' class='remove-semtag'>&times;</a></span>\n    </h3>\n"
    }
    function n(a, b) {
        var d, e, f = "";
        return f += '\n    <h3 style="margin-top: 5px;">\n        <span id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += P(d) + '-refsetResumed" style="font-size: 12px; margin-top: 5px;" class=\'label label-danger\' data-name="',
        d = c.if.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.refsetFilterName), {
            hash: {},
            inverse: R.program(19, p, b),
            fn: R.program(17, o, b),
            data: b
        }),
        (d || 0 === d) && (f += d),
        f += '">',
        d = c.if.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.refsetFilterName), {
            hash: {},
            inverse: R.program(23, r, b),
            fn: R.program(21, q, b),
            data: b
        }),
        (d || 0 === d) && (f += d),
        f += " &nbsp;<a href='javascript:void(0);' style='color: white;text-decoration: none;' class='remove-refset'>&times;</a></span>\n    </h3>\n"
    }
    function o(a, b) {
        var c;
        return P((c = a && a.options,
        c = null == c || !1 === c ? c : c.refsetFilterName,
        typeof c === O ? c.apply(a) : c))
    }
    function p(a, b) {
        var c;
        return P((c = a && a.options,
        c = null == c || !1 === c ? c : c.refsetFilter,
        typeof c === O ? c.apply(a) : c))
    }
    function q(a, b) {
        var d, e, f;
        return P((e = c.first20chars || a && a.first20chars,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.refsetFilterName), f) : Q.call(a, "first20chars", (d = a && a.options,
        null == d || !1 === d ? d : d.refsetFilterName), f)))
    }
    function r(a, b) {
        var d, e, f;
        return P((e = c.first20chars || a && a.first20chars,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.refsetFilter), f) : Q.call(a, "first20chars", (d = a && a.options,
        null == d || !1 === d ? d : d.refsetFilter), f)))
    }
    function s(a, b) {
        var d, e, f, g = "";
        return g += "\n    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: R.noop,
            fn: R.program(26, t, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.langFilter), "none", f) : Q.call(a, "if_eq", (d = a && a.options,
        null == d || !1 === d ? d : d.langFilter), "none", f),
        (d || 0 === d) && (g += d),
        g += "\n    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: R.noop,
            fn: R.program(29, v, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.semTagFilter), "none", f) : Q.call(a, "if_eq", (d = a && a.options,
        null == d || !1 === d ? d : d.semTagFilter), "none", f),
        (d || 0 === d) && (g += d),
        g += "\n    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: R.noop,
            fn: R.program(32, x, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.moduleFilter), "none", f) : Q.call(a, "if_eq", (d = a && a.options,
        null == d || !1 === d ? d : d.moduleFilter), "none", f),
        (d || 0 === d) && (g += d),
        g += "\n    ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: R.noop,
            fn: R.program(40, C, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.options,
        null == d || !1 === d ? d : d.refsetFilter), "none", f) : Q.call(a, "if_eq", (d = a && a.options,
        null == d || !1 === d ? d : d.refsetFilter), "none", f),
        (d || 0 === d) && (g += d),
        g += "\n    \x3c!--<div id='",
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += P(d) + "-searchFiltersPanel2' class=''>--\x3e\n    \x3c!--<div class='tree'>--\x3e\n    \x3c!--<ul>--\x3e\n    \x3c!--<li><a><span data-i18n-id=\"i18n_filters_language\" class=\"i18n\">" + P((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_filters_language", "Filter results by Language", f) : Q.call(a, "i18n", "i18n_filters_language", "Filter results by Language", f))) + "</span></a>--\x3e\n    \x3c!--<ul>--\x3e\n            \x3c!--",
        d = c.each.call(a, (d = a && a.result,
        d = null == d || !1 === d ? d : d.filters,
        null == d || !1 === d ? d : d.lang), {
            hash: {},
            inverse: R.noop,
            fn: R.program(46, G, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += '--\x3e\n    \x3c!--</ul>--\x3e\n    \x3c!--</li>--\x3e\n    \x3c!--</ul>--\x3e\n    \x3c!--<ul>--\x3e\n    \x3c!--<li><a><span data-i18n-id="i18n_filters_semtag" class="i18n">' + P((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_filters_semtag", "Filter results by Semantic Tag", f) : Q.call(a, "i18n", "i18n_filters_semtag", "Filter results by Semantic Tag", f))) + "</span></a>--\x3e\n    \x3c!--<ul>--\x3e\n            \x3c!--",
        d = c.each.call(a, (d = a && a.result,
        d = null == d || !1 === d ? d : d.filters,
        null == d || !1 === d ? d : d.semTag), {
            hash: {},
            inverse: R.noop,
            fn: R.program(48, H, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += '--\x3e\n    \x3c!--</ul>--\x3e\n    \x3c!--</li>--\x3e\n    \x3c!--</ul>--\x3e\n    \x3c!--<ul>--\x3e\n    \x3c!--<li><a><span data-i18n-id="i18n_filters_module" class="i18n">' + P((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_filters_module", "Filter results by Module", f) : Q.call(a, "i18n", "i18n_filters_module", "Filter results by Module", f))) + "</span></a>--\x3e\n    \x3c!--<ul>--\x3e\n            \x3c!--",
        d = c.each.call(a, (d = a && a.result,
        d = null == d || !1 === d ? d : d.filters,
        null == d || !1 === d ? d : d.module), {
            hash: {},
            inverse: R.noop,
            fn: R.program(50, I, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "--\x3e\n    \x3c!--</ul>--\x3e\n    \x3c!--</li>--\x3e\n    \x3c!--</ul>--\x3e\n    \x3c!--</div>--\x3e\n    \x3c!--</div>--\x3e\n"
    }
    function t(a, b) {
        var d, e, f, g = "";
        return g += '\n        <div style="margin-top: 10px" class="panel panel-default">\n            <div class="panel-heading">\n                <h3 class="panel-title">' + P((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_filters_language", "Filter results by Language", f) : Q.call(a, "i18n", "i18n_filters_language", "Filter results by Language", f))) + '</h3>\n            </div>\n            <div class="panel-body">\n                <ul class="list-group">\n                    ',
        d = c.each.call(a, (d = a && a.result,
        d = null == d || !1 === d ? d : d.filters,
        null == d || !1 === d ? d : d.lang), {
            hash: {},
            inverse: R.noop,
            fn: R.program(27, u, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n                </ul>\n            </div>\n        </div>\n    "
    }
    function u(a, b) {
        var c, d = "";
        return d += '\n                        <li class="list-group-item">\n                            <span class="badge">' + P(typeof a === O ? a.apply(a) : a) + "</span>\n                            <a class='lang-link' href='javascript:void(0);' data-lang='" + P((c = null == b || !1 === b ? b : b.key,
        typeof c === O ? c.apply(a) : c)) + "'>" + P((c = null == b || !1 === b ? b : b.key,
        typeof c === O ? c.apply(a) : c)) + "</a>\n                        </li>\n                    "
    }
    function v(a, b) {
        var d, e, f, g = "";
        return g += '\n        <div class="panel panel-default">\n            <div class="panel-heading">\n                <h3 class="panel-title">' + P((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_filters_semtag", "Filter results by Semantic Tag", f) : Q.call(a, "i18n", "i18n_filters_semtag", "Filter results by Semantic Tag", f))) + '</h3>\n            </div>\n            <div class="panel-body">\n                <ul class="list-group">\n                    ',
        d = c.each.call(a, (d = a && a.result,
        d = null == d || !1 === d ? d : d.filters,
        null == d || !1 === d ? d : d.semTag), {
            hash: {},
            inverse: R.noop,
            fn: R.program(30, w, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n                </ul>\n            </div>\n        </div>\n    "
    }
    function w(a, b) {
        var c, d = "";
        return d += '\n                        <li class="list-group-item">\n                            <span class="badge">' + P(typeof a === O ? a.apply(a) : a) + "</span>\n                            <a class='semtag-link' href='javascript:void(0);' data-semtag='" + P((c = null == b || !1 === b ? b : b.key,
        typeof c === O ? c.apply(a) : c)) + "'>" + P((c = null == b || !1 === b ? b : b.key,
        typeof c === O ? c.apply(a) : c)) + "</a>\n                        </li>\n                    "
    }
    function x(a, b) {
        var d, e, f, g = "";
        return g += '\n        <div class="panel panel-default">\n            <div class="panel-heading">\n                <h3 class="panel-title">' + P((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_filters_module", "Filter results by Module", f) : Q.call(a, "i18n", "i18n_filters_module", "Filter results by Module", f))) + '</h3>\n            </div>\n            <div class="panel-body">\n                <ul class="list-group">\n                    ',
        d = c.each.call(a, (d = a && a.result,
        d = null == d || !1 === d ? d : d.filters,
        null == d || !1 === d ? d : d.module), {
            hash: {},
            inverse: R.noop,
            fn: R.program(33, y, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n                </ul>\n            </div>\n        </div>\n    "
    }
    function y(a, b) {
        var d, e, f, g = "";
        return g += '\n                        <li class="list-group-item">\n                            <span class="badge">',
        (e = c.cant) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.cant,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += P(d) + "</span>\n                            <a class='module-link' href='javascript:void(0);' data-term=\"",
        (e = c.term) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.term,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += P(d) + "\" data-module='",
        (e = c.value) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.value,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += P(d) + "'>",
        d = c.if.call(a, a && a.term, {
            hash: {},
            inverse: R.program(36, A, b),
            fn: R.program(34, z, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n                                ",
        e = c.hasCountryIcon || a && a.hasCountryIcon,
        f = {
            hash: {},
            inverse: R.noop,
            fn: R.program(38, B, b),
            data: b
        },
        d = e ? e.call(a, a && a.value, f) : Q.call(a, "hasCountryIcon", a && a.value, f),
        (d || 0 === d) && (g += d),
        g += "\n                            </a>\n                        </li>\n                    "
    }
    function z(a, b) {
        var d, e;
        return (e = c.term) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.term,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        P(d)
    }
    function A(a, b) {
        var d, e;
        return (e = c.value) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.value,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        P(d)
    }
    function B(a, b) {
        var d, e, f = "";
        return f += '\n                                    <div class="phoca-flagbox" style="width:26px;height:26px">\n                                        <span class="phoca-flag ' + P((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.value, e) : Q.call(a, "countryIcon", a && a.value, e))) + '"></span>\n                                    </div>\n                                '
    }
    function C(a, b) {
        var d, e, f, g = "";
        return g += "\n        ",
        e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: R.program(43, E, b),
            fn: R.program(41, D, b),
            data: b
        },
        d = e ? e.call(a, (d = a && a.result,
        d = null == d || !1 === d ? d : d.filters,
        d = null == d || !1 === d ? d : d.refsetId,
        null == d || !1 === d ? d : d.length), 0, f) : Q.call(a, "if_eq", (d = a && a.result,
        d = null == d || !1 === d ? d : d.filters,
        d = null == d || !1 === d ? d : d.refsetId,
        null == d || !1 === d ? d : d.length), 0, f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function D(a, b) {
        return "\n        "
    }
    function E(a, b) {
        var d, e, f, g = "";
        return g += '\n            <div style="margin-top: 10px" class="panel panel-default">\n                <div class="panel-heading">\n                    <h3 class="panel-title">' + P((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_filters_refset", "Filter results by Refset", f) : Q.call(a, "i18n", "i18n_filters_refset", "Filter results by Refset", f))) + '</h3>\n                </div>\n                <div class="panel-body">\n                    <ul class="list-group">\n                        ',
        d = c.each.call(a, (d = a && a.result,
        d = null == d || !1 === d ? d : d.filters,
        null == d || !1 === d ? d : d.refsetId), {
            hash: {},
            inverse: R.noop,
            fn: R.program(44, F, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n                    </ul>\n                </div>\n            </div>\n        "
    }
    function F(a, b) {
        var d, e, f = "";
        return f += '\n                            <li class="list-group-item">\n                                <span class="badge">',
        (e = c.cant) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.cant,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += P(d) + "</span>\n                                <a class='refset-link' href='javascript:void(0);' data-term=\"",
        (e = c.term) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.term,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += P(d) + "\" data-refset='",
        (e = c.value) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.value,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += P(d) + "'>",
        d = c.if.call(a, a && a.term, {
            hash: {},
            inverse: R.program(36, A, b),
            fn: R.program(34, z, b),
            data: b
        }),
        (d || 0 === d) && (f += d),
        f += "</a>\n                            </li>\n                        "
    }
    function G(a, b) {
        var c, d = "";
        return d += "--\x3e\n    \x3c!--<li><a class='lang-link' href='javascript:void(0);' data-lang='" + P((c = null == b || !1 === b ? b : b.key,
        typeof c === O ? c.apply(a) : c)) + "'>" + P((c = null == b || !1 === b ? b : b.key,
        typeof c === O ? c.apply(a) : c)) + " (" + P(typeof a === O ? a.apply(a) : a) + ")</a></li>--\x3e\n            \x3c!--"
    }
    function H(a, b) {
        var c, d = "";
        return d += "--\x3e\n    \x3c!--<li><a class='semtag-link' href='javascript:void(0);' data-semtag='" + P((c = null == b || !1 === b ? b : b.key,
        typeof c === O ? c.apply(a) : c)) + "'>" + P((c = null == b || !1 === b ? b : b.key,
        typeof c === O ? c.apply(a) : c)) + " (" + P(typeof a === O ? a.apply(a) : a) + ")</a></li>--\x3e\n            \x3c!--"
    }
    function I(a, b) {
        var d, e, f, g = "";
        return g += "--\x3e\n    \x3c!--<li><a class='module-link' href='javascript:void(0);' data-term=\"",
        (e = c.term) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.term,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += P(d) + "\" data-module='",
        (e = c.value) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.value,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += P(d) + "'>",
        d = c.if.call(a, a && a.term, {
            hash: {},
            inverse: R.program(36, A, b),
            fn: R.program(34, z, b),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += " (",
        (e = c.cant) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.cant,
        d = typeof e === O ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += P(d) + ")--\x3e\n            \x3c!--",
        e = c.hasCountryIcon || a && a.hasCountryIcon,
        f = {
            hash: {},
            inverse: R.noop,
            fn: R.program(51, J, b),
            data: b
        },
        d = e ? e.call(a, a && a.value, f) : Q.call(a, "hasCountryIcon", a && a.value, f),
        (d || 0 === d) && (g += d),
        g += "--\x3e\n    \x3c!--</a></li>--\x3e\n            \x3c!--"
    }
    function J(a, b) {
        var d, e, f = "";
        return f += '--\x3e\n    \x3c!--<div class="phoca-flagbox" style="width:26px;height:26px">--\x3e\n    \x3c!--<span class="phoca-flag ' + P((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.value, e) : Q.call(a, "countryIcon", a && a.value, e))) + '"></span>--\x3e\n    \x3c!--</div>--\x3e\n            \x3c!--'
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var K, L, M, N = "", O = "function", P = this.escapeExpression, Q = c.helperMissing, R = this;
    return L = c.if_eq || b && b.if_eq,
    M = {
        hash: {},
        inverse: R.program(3, g, e),
        fn: R.program(1, f, e),
        data: e
    },
    K = L ? L.call(b, (K = b && b.options,
    null == K || !1 === K ? K : K.moduleFilter), "none", M) : Q.call(b, "if_eq", (K = b && b.options,
    null == K || !1 === K ? K : K.moduleFilter), "none", M),
    (K || 0 === K) && (N += K),
    N += "\n",
    L = c.if_eq || b && b.if_eq,
    M = {
        hash: {},
        inverse: R.program(12, l, e),
        fn: R.program(1, f, e),
        data: e
    },
    K = L ? L.call(b, (K = b && b.options,
    null == K || !1 === K ? K : K.langFilter), "none", M) : Q.call(b, "if_eq", (K = b && b.options,
    null == K || !1 === K ? K : K.langFilter), "none", M),
    (K || 0 === K) && (N += K),
    N += "\n",
    L = c.if_eq || b && b.if_eq,
    M = {
        hash: {},
        inverse: R.program(14, m, e),
        fn: R.program(1, f, e),
        data: e
    },
    K = L ? L.call(b, (K = b && b.options,
    null == K || !1 === K ? K : K.semTagFilter), "none", M) : Q.call(b, "if_eq", (K = b && b.options,
    null == K || !1 === K ? K : K.semTagFilter), "none", M),
    (K || 0 === K) && (N += K),
    N += "\n",
    L = c.if_eq || b && b.if_eq,
    M = {
        hash: {},
        inverse: R.program(16, n, e),
        fn: R.program(1, f, e),
        data: e
    },
    K = L ? L.call(b, (K = b && b.options,
    null == K || !1 === K ? K : K.refsetFilter), "none", M) : Q.call(b, "if_eq", (K = b && b.options,
    null == K || !1 === K ? K : K.refsetFilter), "none", M),
    (K || 0 === K) && (N += K),
    N += "\n",
    L = c.if_eq || b && b.if_eq,
    M = {
        hash: {},
        inverse: R.program(25, s, e),
        fn: R.program(1, f, e),
        data: e
    },
    K = L ? L.call(b, (K = b && b.result,
    K = null == K || !1 === K ? K : K.details,
    null == K || !1 === K ? K : K.total), 0, M) : Q.call(b, "if_eq", (K = b && b.result,
    K = null == K || !1 === K ? K : K.details,
    null == K || !1 === K ? K : K.total), 0, M),
    (K || 0 === K) && (N += K),
    N += "\n"
}),
this.JST["views/searchPlugin/body/default.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b) {
        var d, e, f, h = "";
        return h += "\n    ",
        e = c.if_gre || a && a.if_gre,
        f = {
            hash: {},
            inverse: A.program(5, i, b),
            fn: A.program(2, g, b),
            data: b
        },
        d = e ? e.call(a, "0", (d = a && a.result,
        d = null == d || !1 === d ? d : d.matches,
        null == d || !1 === d ? d : d.length), f) : x.call(a, "if_gre", "0", (d = a && a.result,
        d = null == d || !1 === d ? d : d.matches,
        null == d || !1 === d ? d : d.length), f),
        (d || 0 === d) && (h += d),
        h += "\n"
    }
    function g(a, b) {
        var d, e, f, g = "";
        return g += '\n        <tr><td class=\'text-muted\'><span data-i18n-id="i18n_no_results" class="i18n">' + y((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_no_results", "No results", f) : x.call(a, "i18n", "i18n_no_results", "No results", f))) + "</span></td></tr>\n        ",
        e = c.hasFilters || a && a.hasFilters,
        f = {
            hash: {},
            inverse: A.noop,
            fn: A.program(3, h, b),
            data: b
        },
        d = e ? e.call(a, a && a.options, f) : x.call(a, "hasFilters", a && a.options, f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function h(a, b) {
        var d, e, f, g = "";
        return g += '\n            <tr><td class=\'text-center\'><span data-i18n-id="i18n_remove_filters" class="i18n">\n            ' + y((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_remove_filters", "There are filters active, remove them to search again with a broader criteria.", f) : x.call(a, "i18n", "i18n_remove_filters", "There are filters active, remove them to search again with a broader criteria.", f))) + '</span><br>\n            <button class="btn btn-danger btn-sm" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === z ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += y(d) + '-remove-all-filters"><span data-i18n-id="i18n_remove_filters_button" class="i18n">Remove all filters</span></button>\n        </td></tr>        '
    }
    function i(a, b) {
        var d, e, f, g = "";
        return g += "\n        ",
        d = c.each.call(a, (d = a && a.result,
        null == d || !1 === d ? d : d.matches), {
            hash: {},
            inverse: A.noop,
            fn: A.programWithDepth(6, j, b, a),
            data: b
        }),
        (d || 0 === d) && (g += d),
        g += "\n        ",
        e = c.if_gr || a && a.if_gr,
        f = {
            hash: {},
            inverse: A.program(22, s, b),
            fn: A.program(20, r, b),
            data: b
        },
        d = e ? e.call(a, a && a.remaining, 0, f) : x.call(a, "if_gr", a && a.remaining, 0, f),
        (d || 0 === d) && (g += d),
        g += "\n    "
    }
    function j(a, b, d) {
        var e, f, g, h = "";
        return h += "\n            <tr class='resultRow selectable-row",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: A.program(9, l, b),
            fn: A.program(7, k, b),
            data: b
        },
        e = f ? f.call(a, a && a.active, !1, g) : x.call(a, "if_eq", a && a.active, !1, g),
        (e || 0 === e) && (h += e),
        h += "'>\n                <td class='col-md-6'>\n                    <div class='result-item' data-module=\"",
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "' data-term='",
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "'>\n                        ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: A.programWithDepth(13, n, b, a),
            fn: A.programWithDepth(11, m, b, d),
            data: b
        },
        e = f ? f.call(a, a && a.definitionStatus, "Primitive", g) : x.call(a, "if_eq", a && a.definitionStatus, "Primitive", g),
        (e || 0 === e) && (h += e),
        h += "\n                        ",
        f = c.hasCountryIcon || a && a.hasCountryIcon,
        g = {
            hash: {},
            inverse: A.noop,
            fn: A.program(18, q, b),
            data: b
        },
        e = f ? f.call(a, a && a.module, g) : x.call(a, "hasCountryIcon", a && a.module, g),
        (e || 0 === e) && (h += e),
        h += "\n                        <a href='javascript:void(0);' style='color: inherit;text-decoration: inherit;' data-module=\"",
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "' data-term='",
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "'>",
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "</a>\n                    </div>\n                </td>\n                <td class='text-muted small-text col-md-6 result-item' data-module=\"",
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "' data-term='",
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "'>",
        (f = c.fsn) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.fsn,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += y(e) + "\n                </td>\n            </tr>\n        "
    }
    function k(a, b) {
        return " danger"
    }
    function l(a, b) {
        var d, e, f;
        return e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: A.noop,
            fn: A.program(7, k, b),
            data: b
        },
        d = e ? e.call(a, a && a.conceptActive, !1, f) : x.call(a, "if_eq", a && a.conceptActive, !1, f),
        d || 0 === d ? d : ""
    }
    function m(a, b, d) {
        var e, f, g = "";
        return g += '\n                            <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + y((e = d && d.divElementId,
        typeof e === z ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += y(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += y(e) + '" data-term="',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += y(e) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                            '
    }
    function n(a, b, d) {
        var e, f, g, h = "";
        return h += "\n                              ",
        f = c.if_eq || a && a.if_eq,
        g = {
            hash: {},
            inverse: A.programWithDepth(16, p, b, d),
            fn: A.programWithDepth(14, o, b, d),
            data: b
        },
        e = f ? f.call(a, a && a.definitionStatus, "900000000000074008", g) : x.call(a, "if_eq", a && a.definitionStatus, "900000000000074008", g),
        (e || 0 === e) && (h += e),
        h += "\n                            "
    }
    function o(a, b, d) {
        var e, f, g = "";
        return g += '\n                                  <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + y((e = d && d.divElementId,
        typeof e === z ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += y(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += y(e) + '" data-term="',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += y(e) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                                '
    }
    function p(a, b, d) {
        var e, f, g = "";
        return g += '\n                                  <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + y((e = d && d.divElementId,
        typeof e === z ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += y(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += y(e) + '" data-term="',
        (f = c.term) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.term,
        e = typeof f === z ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += y(e) + '">&equiv;</span>&nbsp;&nbsp;\n                                '
    }
    function q(a, b) {
        var d, e, f = "";
        return f += '\n                            <div class="phoca-flagbox" style="width:20px;height:20px">\n                                <span class="phoca-flag ' + y((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : x.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                            </div>\n                        '
    }
    function r(a, b) {
        var d, e, f, g = "";
        return g += "\n            <tr class='more-row'><td colspan='2' class='text-center'><button class='btn btn-link' id='",
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === z ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += y(d) + '-more\'><span data-i18n-id="i18n_load" class="i18n">' + y((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_load", "Load", f) : x.call(a, "i18n", "i18n_load", "Load", f))) + "</span> ",
        (e = c.returnLimit) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.returnLimit,
        d = typeof e === z ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += y(d) + ' <span data-i18n-id="i18n_more" class="i18n">' + y((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_more", "more", f) : x.call(a, "i18n", "i18n_more", "more", f))) + "</span> (",
        (e = c.remaining) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.remaining,
        d = typeof e === z ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += y(d) + ' <span data-i18n-id="i18n_remaining_server" class="i18n">' + y((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_remaining_server", "remaining on server", f) : x.call(a, "i18n", "i18n_remaining_server", "remaining on server", f))) + "</span>)</button></td></tr>\n        "
    }
    function s(a, b) {
        var d, e, f, g = "";
        return g += "\n            <tr class='more-row'><td colspan='2' class='text-center text-muted'><span data-i18n-id=\"i18n_all_res\" class=\"i18n\">" + y((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_all_res", "All", f) : x.call(a, "i18n", "i18n_all_res", "All", f))) + "</span> " + y((d = a && a.result,
        d = null == d || !1 === d ? d : d.details,
        d = null == d || !1 === d ? d : d.total,
        typeof d === z ? d.apply(a) : d)) + ' <span data-i18n-id="i18n_results_displayed" class="i18n">' + y((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_results_displayed", "results are displayed", f) : x.call(a, "i18n", "i18n_results_displayed", "results are displayed", f))) + "</span></td></tr>\n        "
    }
    function t(a, b) {
        var d, e, f, g = "";
        return g += '\n    <tr><td class=\'text-muted\'><span data-i18n-id="i18n_no_results" class="i18n">' + y((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_no_results", "No results", f) : x.call(a, "i18n", "i18n_no_results", "No results", f))) + "</span></td></tr>\n    ",
        e = c.hasFilters || a && a.hasFilters,
        f = {
            hash: {},
            inverse: A.noop,
            fn: A.program(25, u, b),
            data: b
        },
        d = e ? e.call(a, a && a.options, f) : x.call(a, "hasFilters", a && a.options, f),
        (d || 0 === d) && (g += d),
        g += "\n"
    }
    function u(a, b) {
        var d, e, f, g = "";
        return g += '\n        <tr><td class=\'text-center\'><span data-i18n-id="i18n_remove_filters" class="i18n">\n            ' + y((e = c.i18n || a && a.i18n,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, "i18n_remove_filters", "There are filters active, remove them to search again with a broader criteria.", f) : x.call(a, "i18n", "i18n_remove_filters", "There are filters active, remove them to search again with a broader criteria.", f))) + '</span><br>\n            <button class="btn btn-danger btn-sm" id="',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === z ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        g += y(d) + '-remove-all-filters"><span data-i18n-id="i18n_remove_filters_button" class="i18n">Remove all filters</span></button>\n        </td></tr>\n    '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var v, w = "", x = c.helperMissing, y = this.escapeExpression, z = "function", A = this;
    return v = c.if.call(b, (v = b && b.result,
    null == v || !1 === v ? v : v.matches), {
        hash: {},
        inverse: A.program(24, t, e),
        fn: A.program(1, f, e),
        data: e
    }),
    (v || 0 === v) && (w += v),
    w += "\n"
}),
this.JST["views/searchPlugin/main.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += "<div style='margin: 5px; height:95%;' class='panel panel-default'>\n    <div class='panel-heading'>\n        <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-ownMarker' class='btn btn-link btn-lg' style='padding: 2px; position: absolute;top: 1px;left: 0px;'><i class='glyphicon glyphicon-book'></i></button>\n        <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-subscribersMarker' class='btn btn-link btn-lg' style='padding: 2px; position: absolute;top: 1px;left: 15px;'><i class='glyphicon glyphicon-bookmark'></i></button>\n        <div class='row'>\n            <div class='col-md-8' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelTitle'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<strong><span class='i18n' data-i18n-id='i18n_search'>Search</span></span></strong></div>\n            <div class='col-md-4 text-right'>\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-linkerButton\' draggable="true" ondragstart="drag(event, \'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "')\" class='btn btn-link linker-button' data-panel='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "' style='padding:2px'><i class='glyphicon glyphicon-link'></i></button>--\x3e\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-historyButton' class='btn btn-link history-button' style='padding:2px'><i class='glyphicon glyphicon-time'></i></button>\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configButton' class='btn btn-link' data-toggle='modal' style='padding:2px' data-target='#",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configModal'><i class='glyphicon glyphicon-cog'></i></button>--\x3e\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-collapseButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-small'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-expandButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-full'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-closeButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-remove'></i></button>\n            </div>\n        </div>\n    </div>\n    <div class='panel-body' style='height:86%' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-panelBody\'>\n        <form>\n            <div class="form-group" style="margin-bottom: 2px;">\n                <label for="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-searchBox">\n                    <span class="i18n" data-i18n-id="i18n_type_3_chars">Type at least 3 characters</span> <i class="glyphicon glyphicon-remove text-danger" id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-typeIcon"></i> <span id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-searchExample"></span></label>\n                <br><div class="btn-group" style="width: 100%;"><input data-droppable="true" ondrop="dropS(event);" ondragover="removeHighlight();" ondragstart="allowDrop(event);" type="search" class="form-control" id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-searchBox" placeholder="Search..." autocomplete="off">\n                <span id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-clearButton" class="searchclear glyphicon glyphicon-remove-circle"></span></div>\n            </div>\n        </form>\n        <div id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-searchConfigBar' style='margin-bottom: 10px;'><nav class='navbar navbar-default' role='navigation' style='min-height: 28px;border-radius: 0px;border-bottom: 1px lightgray solid;'>\n            <ul class='nav navbar-nav navbar-left'>\n                <li class='dropdown' style='margin-bottom: 2px; margin-top: 2px;'>\n                    <a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' style='padding-top: 2px; padding-bottom: 2px;'><span id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-navSearchModeLabel'></span> <b class='caret'></b></a>\n                    <ul class='dropdown-menu' role='menu' style='float: none;'>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-fullTextButton'><span class='i18n' data-i18n-id='i18n_full_text_search_mode'>Full text search mode</span></button></li>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-partialMatchingButton'><span class='i18n' data-i18n-id='i18n_partial_match_search_mode'>Partial matching search mode</span></button></li>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-regexButton'><span class='i18n' data-i18n-id='i18n_regex_search_mode'>Regular Expressions search mode</span></button></li>\n                    </ul>\n                </li>\n                <li class='dropdown' style='margin-bottom: 2px; margin-top: 2px;'>\n                    <a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' style='padding-top: 2px; padding-bottom: 2px;'><span id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-navLanguageLabel'></span> <b class='caret'></b></a>\n                    <ul class='dropdown-menu' role='menu' style='float: none;'>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-danishLangButton'><span class='i18n' data-i18n-id='i18n_danish_stemmer'>Danish language stemmer</span></button></li>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-englishLangButton'><span class='i18n' data-i18n-id='i18n_english_stemmer'>English language stemmer</span></button></li>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-spanishLangButton'><span class='i18n' data-i18n-id='i18n_spanish_stemmer'>Spanish language stemmer</span></button></li>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-swedishLangButton'><span class='i18n' data-i18n-id='i18n_swedish_stemmer'>Swedish language stemmer</span></button></li>\n                    </ul>\n                </li>\n                <li class='dropdown' style='margin-bottom: 2px; margin-top: 2px;'>\n                    <a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' style='padding-top: 2px; padding-bottom: 2px;'><span id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-navStatusFilterLabel'></span> <b class='caret'></b></a>\n                    <ul class='dropdown-menu' role='menu' style='float: none;'>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-activeOnlyButton'><span class='i18n' data-i18n-id='i18n_active_only'>Active components only</span></button></li>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-activeInactiveButton'><span class='i18n' data-i18n-id='i18n_active_and_inactive'>Active and inactive components</span></button></li>\n                        <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-inactiveOnlyButton'><span class='i18n' data-i18n-id='i18n_inactive_only'>Inactive components only</span></button></li>\n                    </ul>\n                </li>\n            </ul>\n        </nav></div>\n        <div class='panel panel-default' style='height:70%;overflow:auto;margin-bottom: 15px;min-height: 300px;' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-resultsScrollPane'>\n            <div id=\"",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-searchBar"></div>\n            <div id="',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-searchFilters\"></div>\n            <table class='table table-bordered'>\n                <tbody  id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-resultsTable'>\n                </tbody>\n            </table>\n        </div>\n        <div class='modal fade' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configModal'>\n            <div class='modal-dialog'>\n                <div class='modal-content'>\n                    <div class='modal-header'>\n                        <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>\n                        <h4 class='modal-title'><span class='i18n' data-i18n-id='i18n_options'>Options</span> (",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + ")</h4>\n                    </div>\n                    <div class='modal-body' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-modal-body'>\n                        <p></p>\n                    </div>\n                    <div class='modal-footer'>\n                        <button type='button' class='btn btn-danger' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_cancel'>Cancel</span></button>\n                        <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-apply-button' type='button' class='btn btn-success' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_apply_changes'>Apply changes</span></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n        "
}),
this.JST["views/taxonomyPlugin/body/children.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b, d) {
        var e, f = "";
        return f += "\n        ",
        e = c.if.call(a, a && a.active, {
            hash: {},
            inverse: q.noop,
            fn: q.programWithDepth(2, g, b, a, d),
            data: b
        }),
        (e || 0 === e) && (f += e),
        f += "\n    "
    }
    function g(a, b, d, e) {
        var f, g, i, j = "";
        return j += '\n            <li data-module="',
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + "\" data-concept-id='",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + "' data-term='",
        (g = c.defaultTerm) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.defaultTerm,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + " data-statedDescendants='",
        (g = c.statedDescendants) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.statedDescendants,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + "' class='treeLabel'>\n                <button class='btn btn-link btn-xs treeButton' style='padding:2px'>\n                    <i class='glyphicon glyphicon-",
        g = c.if_eq || e && e.if_eq,
        i = {
            hash: {},
            inverse: q.program(8, k, b),
            fn: q.program(3, h, b),
            data: b
        },
        f = g ? g.call(a, e && e.selectedView, "inferred", i) : r.call(a, "if_eq", e && e.selectedView, "inferred", i),
        (f || 0 === f) && (j += f),
        j += " treeButton' id='" + t((f = e && e.divElementId,
        typeof f === s ? f.apply(a) : f)) + "-treeicon-",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + "'></i>\n                </button>\n                ",
        g = c.if_eq || a && a.if_eq,
        i = {
            hash: {},
            inverse: q.programWithDepth(12, m, b, d),
            fn: q.programWithDepth(10, l, b, d),
            data: b
        },
        f = g ? g.call(a, a && a.definitionStatus, "Primitive", i) : r.call(a, "if_eq", a && a.definitionStatus, "Primitive", i),
        (f || 0 === f) && (j += f),
        j += "\n                ",
        g = c.hasCountryIcon || a && a.hasCountryIcon,
        i = {
            hash: {},
            inverse: q.noop,
            fn: q.program(14, n, b),
            data: b
        },
        f = g ? g.call(a, a && a.module, i) : r.call(a, "hasCountryIcon", a && a.module, i),
        (f || 0 === f) && (j += f),
        j += '\n                <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;">\n                    <span class="treeLabel selectable-row" data-module="',
        (g = c.module) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.module,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + '" data-concept-id="',
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + '" data-term="',
        (g = c.defaultTerm) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.defaultTerm,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + '" data-statedDescendants="',
        (g = c.statedDescendants) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.statedDescendants,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + '" id="' + t((f = e && e.divElementId,
        typeof f === s ? f.apply(a) : f)) + "-treenode-",
        (g = c.conceptId) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.conceptId,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + '">',
        (g = c.defaultTerm) ? f = g.call(a, {
            hash: {},
            data: b
        }) : (g = a && a.defaultTerm,
        f = typeof g === s ? g.call(a, {
            hash: {},
            data: b
        }) : g),
        j += t(f) + "</span>\n                </a>\n                " + t((g = c.push || a && a.push,
        i = {
            hash: {},
            data: b
        },
        g ? g.call(a, a && a.conceptId, i) : r.call(a, "push", a && a.conceptId, i))) + "\n            </li>\n        "
    }
    function h(a, b) {
        var d, e, f;
        return e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: q.program(6, j, b),
            fn: q.program(4, i, b),
            data: b
        },
        d = e ? e.call(a, a && a.isLeafInferred, !0, f) : r.call(a, "if_eq", a && a.isLeafInferred, !0, f),
        d || 0 === d ? d : ""
    }
    function i(a, b) {
        return "minus"
    }
    function j(a, b) {
        return "chevron-right"
    }
    function k(a, b) {
        var d, e, f;
        return e = c.if_eq || a && a.if_eq,
        f = {
            hash: {},
            inverse: q.program(6, j, b),
            fn: q.program(4, i, b),
            data: b
        },
        d = e ? e.call(a, a && a.isLeafStated, !0, f) : r.call(a, "if_eq", a && a.isLeafStated, !0, f),
        d || 0 === d ? d : ""
    }
    function l(a, b, d) {
        var e, f, g = "";
        return g += '\n                    <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + t((e = d && d.divElementId,
        typeof e === s ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-term="',
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                '
    }
    function m(a, b, d) {
        var e, f, g = "";
        return g += '\n                    <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'' + t((e = d && d.divElementId,
        typeof e === s ? e.apply(a) : e)) + '\')" data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '" data-term="',
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === s ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        g += t(e) + '">&equiv;</span>&nbsp;&nbsp;\n                '
    }
    function n(a, b) {
        var d, e, f = "";
        return f += '\n                    <div class="phoca-flagbox" style="width:26px;height:26px">\n                        <span class="phoca-flag ' + t((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : r.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                    </div>\n                '
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var o, p = "", q = this, r = c.helperMissing, s = "function", t = this.escapeExpression;
    return p += "<ul style='list-style-type: none; padding-left: 15px;'>\n    ",
    o = c.each.call(b, b && b.result, {
        hash: {},
        inverse: q.noop,
        fn: q.programWithDepth(1, f, e, b),
        data: e
    }),
    (o || 0 === o) && (p += o),
    p += "\n</ul>\n"
}),
this.JST["views/taxonomyPlugin/body/parents.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b, d) {
        var e, f, l, m = "";
        return m += '\n            <li data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + "\" data-concept-id='",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + "' data-term='",
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + "' data-statedDescendants='",
        (f = c.statedDescendants) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.statedDescendants,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + "' class='treeLabel'>\n                <button class='btn btn-link btn-xs treeButton' style='padding:2px'>\n                    <i class='glyphicon glyphicon-chevron-",
        f = c.if_def || a && a.if_def,
        l = {
            hash: {},
            inverse: x.program(4, h, b),
            fn: x.program(2, g, b),
            data: b
        },
        e = f ? f.call(a, a && a.conceptId, l) : w.call(a, "if_def", a && a.conceptId, l),
        (e || 0 === e) && (m += e),
        m += " treeButton' id='" + v((e = d && d.divElementId,
        typeof e === u ? e.apply(a) : e)) + "-treeicon-",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + "'></i>\n                </button>\n                ",
        f = c.if_eq || a && a.if_eq,
        l = {
            hash: {},
            inverse: x.program(8, j, b),
            fn: x.program(6, i, b),
            data: b
        },
        e = f ? f.call(a, a && a.definitionStatus, "Primitive", l) : w.call(a, "if_eq", a && a.definitionStatus, "Primitive", l),
        (e || 0 === e) && (m += e),
        m += "\n                ",
        f = c.hasCountryIcon || a && a.hasCountryIcon,
        l = {
            hash: {},
            inverse: x.noop,
            fn: x.program(10, k, b),
            data: b
        },
        e = f ? f.call(a, a && a.module, l) : w.call(a, "hasCountryIcon", a && a.module, l),
        (e || 0 === e) && (m += e),
        m += '\n                <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;">\n                    <span data-module="',
        (f = c.module) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.module,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + '" data-concept-id="',
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + '" data-term="',
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + '" data-statedDescendants="',
        (f = c.statedDescendants) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.statedDescendants,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + '" class="treeLabel selectable-row" id="' + v((e = d && d.divElementId,
        typeof e === u ? e.apply(a) : e)) + "-treenode-",
        (f = c.conceptId) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.conceptId,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + '">',
        (f = c.defaultTerm) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.defaultTerm,
        e = typeof f === u ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        m += v(e) + "</span>\n                </a>\n        "
    }
    function g(a, b) {
        return "down"
    }
    function h(a, b) {
        return "up"
    }
    function i(a, b) {
        var d, e, f = "";
        return f += '\n                    <span class="badge alert-warning" data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + '" data-concept-id="',
        (e = c.conceptId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.conceptId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + '" data-term="',
        (e = c.defaultTerm) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.defaultTerm,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + '" draggable="true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + "')\">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                "
    }
    function j(a, b) {
        var d, e, f = "";
        return f += '\n                    <span class="badge alert-warning" data-module="',
        (e = c.module) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.module,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + '" data-concept-id="',
        (e = c.conceptId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.conceptId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + '" data-term="',
        (e = c.defaultTerm) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.defaultTerm,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + '" draggable="true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + "')\">&equiv;</span>&nbsp;&nbsp;\n                "
    }
    function k(a, b) {
        var d, e, f = "";
        return f += '\n                    <div class="phoca-flagbox" style="width:33px;height:33px">\n                        <span class="phoca-flag ' + v((d = c.countryIcon || a && a.countryIcon,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, a && a.module, e) : w.call(a, "countryIcon", a && a.module, e))) + '"></span>\n                    </div>\n                '
    }
    function l(a, b) {
        var d, e, f = "";
        return f += "\n            " + v((d = c.slice || a && a.slice,
        e = {
            hash: {},
            data: b
        },
        d ? d.call(a, 0, -5, e) : w.call(a, "slice", 0, -5, e))) + "\n        "
    }
    function m(a, b) {
        var d, e, f = "";
        return f += '\n                    <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + '\')" data-module="' + v((d = a && a.focusConcept,
        d = null == d || !1 === d ? d : d.module,
        typeof d === u ? d.apply(a) : d)) + '" data-concept-id="' + v((d = a && a.focusConcept,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === u ? d.apply(a) : d)) + '" data-term="' + v((d = a && a.focusConcept,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === u ? d.apply(a) : d)) + '">&nbsp;&nbsp;</span>&nbsp;&nbsp;\n                '
    }
    function n(a, b) {
        var d, e, f = "";
        return f += '\n                    <span class="badge alert-warning" draggable="true" ondragstart="drag(event, \'',
        (e = c.divElementId) ? d = e.call(a, {
            hash: {},
            data: b
        }) : (e = a && a.divElementId,
        d = typeof e === u ? e.call(a, {
            hash: {},
            data: b
        }) : e),
        f += v(d) + '\')" data-module="' + v((d = a && a.focusConcept,
        d = null == d || !1 === d ? d : d.module,
        typeof d === u ? d.apply(a) : d)) + '" data-concept-id="' + v((d = a && a.focusConcept,
        d = null == d || !1 === d ? d : d.conceptId,
        typeof d === u ? d.apply(a) : d)) + '" data-term="' + v((d = a && a.focusConcept,
        d = null == d || !1 === d ? d : d.defaultTerm,
        typeof d === u ? d.apply(a) : d)) + '">&equiv;</span>&nbsp;&nbsp;\n                '
    }
    function o(a, b) {
        var d, e, f, g = "";
        return g += '\n                    <div class="phoca-flagbox" style="width:33px;height:33px">\n                        <span class="phoca-flag ' + v((e = c.countryIcon || a && a.countryIcon,
        f = {
            hash: {},
            data: b
        },
        e ? e.call(a, (d = a && a.focusConcept,
        null == d || !1 === d ? d : d.module), f) : w.call(a, "countryIcon", (d = a && a.focusConcept,
        null == d || !1 === d ? d : d.module), f))) + '"></span>\n                    </div>\n                '
    }
    function p(a, b) {
        return "\n            </li>\n        "
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var q, r, s, t = "", u = "function", v = this.escapeExpression, w = c.helperMissing, x = this;
    return t += "<div style='height:100%;margin-bottom: 15px;'>\n    <ul style='list-style-type: none; padding-left: 5px;'>\n        ",
    q = c.each.call(b, b && b.parents, {
        hash: {},
        inverse: x.noop,
        fn: x.programWithDepth(1, f, e, b),
        data: e
    }),
    (q || 0 === q) && (t += q),
    t += "\n        ",
    r = c.if_gr || b && b.if_gr,
    s = {
        hash: {},
        inverse: x.noop,
        fn: x.program(12, l, e),
        data: e
    },
    q = r ? r.call(b, (q = b && b.parents,
    null == q || !1 === q ? q : q.length), 0, s) : w.call(b, "if_gr", (q = b && b.parents,
    null == q || !1 === q ? q : q.length), 0, s),
    (q || 0 === q) && (t += q),
    t += "\n        <ul style='list-style-type: none; padding-left: 15px;'>\n            <li data-module=\"" + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.module,
    typeof q === u ? q.apply(b) : q)) + "\" data-concept-id='" + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.conceptId,
    typeof q === u ? q.apply(b) : q)) + "' data-term='" + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.defaultTerm,
    typeof q === u ? q.apply(b) : q)) + "' data-statedDescendants='" + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.statedDescendants,
    typeof q === u ? q.apply(b) : q)) + "' class='treeLabel'>\n                <button class='btn btn-link btn-xs treeButton' style='padding:2px'><i class='glyphicon glyphicon-chevron-right treeButton'  id='",
    (r = c.divElementId) ? q = r.call(b, {
        hash: {},
        data: e
    }) : (r = b && b.divElementId,
    q = typeof r === u ? r.call(b, {
        hash: {},
        data: e
    }) : r),
    t += v(q) + "-treeicon-" + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.conceptId,
    typeof q === u ? q.apply(b) : q)) + "'></i></button>\n                ",
    r = c.if_eq || b && b.if_eq,
    s = {
        hash: {},
        inverse: x.program(16, n, e),
        fn: x.program(14, m, e),
        data: e
    },
    q = r ? r.call(b, (q = b && b.focusConcept,
    null == q || !1 === q ? q : q.definitionStatus), "Primitive", s) : w.call(b, "if_eq", (q = b && b.focusConcept,
    null == q || !1 === q ? q : q.definitionStatus), "Primitive", s),
    (q || 0 === q) && (t += q),
    t += "\n                ",
    r = c.hasCountryIcon || b && b.hasCountryIcon,
    s = {
        hash: {},
        inverse: x.noop,
        fn: x.program(18, o, e),
        data: e
    },
    q = r ? r.call(b, (q = b && b.focusConcept,
    null == q || !1 === q ? q : q.module), s) : w.call(b, "hasCountryIcon", (q = b && b.focusConcept,
    null == q || !1 === q ? q : q.module), s),
    (q || 0 === q) && (t += q),
    t += '\n                <a href="javascript:void(0);" style="color: inherit;text-decoration: inherit;">\n                    <span data-module="' + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.module,
    typeof q === u ? q.apply(b) : q)) + '" data-concept-id="' + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.conceptId,
    typeof q === u ? q.apply(b) : q)) + '" data-term="' + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.defaultTerm,
    typeof q === u ? q.apply(b) : q)) + '" data-statedDescendants="' + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.statedDescendants,
    typeof q === u ? q.apply(b) : q)) + '" class="treeLabel selectable-row" id="',
    (r = c.divElementId) ? q = r.call(b, {
        hash: {},
        data: e
    }) : (r = b && b.divElementId,
    q = typeof r === u ? r.call(b, {
        hash: {},
        data: e
    }) : r),
    t += v(q) + "-treenode-" + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.conceptId,
    typeof q === u ? q.apply(b) : q)) + '">' + v((q = b && b.focusConcept,
    q = null == q || !1 === q ? q : q.defaultTerm,
    typeof q === u ? q.apply(b) : q)) + "</span>\n                </a>\n            </li>\n        </ul>\n        ",
    r = c.if_gr || b && b.if_gr,
    s = {
        hash: {},
        inverse: x.noop,
        fn: x.program(20, p, e),
        data: e
    },
    q = r ? r.call(b, (q = b && b.parents,
    null == q || !1 === q ? q : q.length), 0, s) : w.call(b, "if_gr", (q = b && b.parents,
    null == q || !1 === q ? q : q.length), 0, s),
    (q || 0 === q) && (t += q),
    t += "\n    </ul>\n</div>"
}),
this.JST["views/taxonomyPlugin/main.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var f, g, h = "", i = "function", j = this.escapeExpression;
    return h += "<div style='height:100%;margin: 5px; overflow:auto;' class='panel panel-default' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-mainPanel'>\n    <div ondrop=\"dropT(event, '",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '\')" ondragleave="removeHighlight();" ondragover="allowDrop(event)" class=\'panel-heading\' id=\'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelHeading'>\n        <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-ownMarker' class='btn btn-link btn-lg' style='padding: 2px; position: absolute;top: 1px;left: 0px;'><i class='glyphicon glyphicon-book'></i></button>\n        <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-subscribersMarker' class='btn btn-link btn-lg' style='padding: 2px; position: absolute;top: 1px;left: 15px;'><i class='glyphicon glyphicon-bookmark'></i></button>\n        <div class='row'>\n            <div class='col-md-6' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelTitle'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<strong><span class='i18n' data-i18n-id='i18n_taxonomy'>Taxonomy</span></strong></div>\n            <div class='col-md-6 text-right'>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-historyButton' class='btn btn-link history-button' style='padding:2px'><i class='glyphicon glyphicon-time'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-resetButton' class='btn btn-link' data-panel='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "' style='padding:2px'><i class='glyphicon glyphicon-repeat'></i></button>\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + '-linkerButton\' draggable="true" ondragstart="drag(event, \'',
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "')\" class='btn btn-link linker-button' data-panel='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "' style='padding:2px'><i class='glyphicon glyphicon-link'></i></button>--\x3e\n                \x3c!--<button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configButton' class='btn btn-link' data-toggle='modal' style='padding:2px' data-target='#",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configModal'><i class='glyphicon glyphicon-cog'></i></button>--\x3e\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-collapseButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-small'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-expandButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-resize-full'></i></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-closeButton' class='btn btn-link' style='padding:2px'><i class='glyphicon glyphicon-remove'></i></button>\n            </div>\n        </div>\n    </div>\n    <div id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-taxonomyConfigBar' style='margin-bottom: 10px;'><nav class='navbar navbar-default' role='navigation' style='min-height: 28px;border-radius: 0px;border-bottom: 1px lightgray solid;'>\n        <ul class='nav navbar-nav navbar-left'>\n            <li class='dropdown' style='margin-bottom: 2px; margin-top: 2px;'>\n                <a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' style='padding-top: 2px; padding-bottom: 2px;'><span id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-txViewLabel'></span> <b class='caret'></b></a>\n                <ul class='dropdown-menu' role='menu' style='float: none;'>\n                    <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-inferredViewButton'><span class='i18n' data-i18n-id='i18n_inferred_view'>Inferred view</span></button></li>\n                    <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-statedViewButton'><span class='i18n' data-i18n-id='i18n_stated_view'>Stated view</span></button></li>\n                </ul>\n            </li>\n            <li class='dropdown' style='margin-bottom: 2px; margin-top: 2px;'>\n                <a href='javascript:void(0);' class='dropdown-toggle' data-toggle='dropdown' style='padding-top: 2px; padding-bottom: 2px;'><span id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-txViewLabel2'></span> <b class='caret'></b></a>\n                <ul class='dropdown-menu' role='menu' style='float: none;'>\n                    <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-descendantsCountTrue'><span class='i18n' data-i18n-id='i18n_on'>On</span></button></li>\n                    <li><button class='btn btn-link' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-descendantsCountFalse'><span class='i18n' data-i18n-id='i18n_off'>Off</span></button></li>\n                </ul>\n            </li>\n        </ul>\n    </nav></div>\n    <div ondrop=\"dropT(event, '",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "')\" ondragleave=\"removeHighlight();\" ondragover=\"allowDrop(event)\" class='panel-body' style='height:100%' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-panelBody'>\n    </div>\n</div>\n<div class='modal fade' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-configModal'>\n    <div class='modal-dialog'>\n        <div class='modal-content'>\n            <div class='modal-header'>\n                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>\n                <h4 class='modal-title'><span class='i18n' data-i18n-id='i18n_options'>Options</span> (",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + ")</h4>\n            </div>\n            <div class='modal-body' id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-modal-body'>\n                <p></p>\n            </div>\n            <div class='modal-footer'>\n                <button type='button' class='btn btn-danger' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_cancel'>Cancel</span></button>\n                <button id='",
    (g = c.divElementId) ? f = g.call(b, {
        hash: {},
        data: e
    }) : (g = b && b.divElementId,
    f = typeof g === i ? g.call(b, {
        hash: {},
        data: e
    }) : g),
    h += j(f) + "-apply-button' type='button' class='btn btn-success' data-dismiss='modal'><span class='i18n' data-i18n-id='i18n_apply_changes'>Apply changes</span></button>\n            </div>\n        </div>\n    </div>\n</div>"
}),
this.JST["views/taxonomyPlugin/options.hbs"] = Handlebars.template(function(a, b, c, d, e) {
    function f(a, b, d) {
        var e, f, h = "";
        return h += "\n                <tr>\n                    <td>",
        (f = c.id) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.id,
        e = typeof f === l ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += m(e) + '</td>\n                    <td>\n                        <div class="checkbox">\n                            <label>\n                                <input type="checkbox" id="' + m((e = d && d.divElementId,
        typeof e === l ? e.apply(a) : e)) + "-subscribeTo-",
        (f = c.id) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.id,
        e = typeof f === l ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += m(e) + '" ',
        e = c.if.call(a, a && a.subscribed, {
            hash: {},
            inverse: n.noop,
            fn: n.program(2, g, b),
            data: b
        }),
        (e || 0 === e) && (h += e),
        h += '> <span class="i18n"></span>\n                            </label>\n                        </div>\n                    </td>\n                    <td>\n                        <div class="checkbox">\n                            <label>\n                                <input type="checkbox" id="' + m((e = d && d.divElementId,
        typeof e === l ? e.apply(a) : e)) + "-subscriptor-",
        (f = c.id) ? e = f.call(a, {
            hash: {},
            data: b
        }) : (f = a && a.id,
        e = typeof f === l ? f.call(a, {
            hash: {},
            data: b
        }) : f),
        h += m(e) + '" ',
        e = c.if.call(a, a && a.subscriptor, {
            hash: {},
            inverse: n.noop,
            fn: n.program(2, g, b),
            data: b
        }),
        (e || 0 === e) && (h += e),
        h += '> <span class="i18n"></span>\n                            </label>\n                        </div>\n                    </td>\n                </tr>\n            '
    }
    function g(a, b) {
        return "checked"
    }
    this.compilerInfo = [4, ">= 1.0.0"],
    c = this.merge(c, a.helpers),
    e = e || {};
    var h, i, j, k = "", l = "function", m = this.escapeExpression, n = this, o = c.helperMissing;
    return k += '<form role="form" id="',
    (i = c.divElementId) ? h = i.call(b, {
        hash: {},
        data: e
    }) : (i = b && b.divElementId,
    h = typeof i === l ? i.call(b, {
        hash: {},
        data: e
    }) : i),
    k += m(h) + '-options-form">\n    <div class="form-group">\n        <table class=\'table table-bordered table-hover\'>\n            <thead>\n            <tr>\n                <th>Panel</th>\n                <th><span class="i18n" data-i18n-id="i18n_subscribed">' + m((i = c.i18n || b && b.i18n,
    j = {
        hash: {},
        data: e
    },
    i ? i.call(b, "i18n_subscribe", "Subscribed", j) : o.call(b, "i18n", "i18n_subscribe", "Subscribed", j))) + '</span></th>\n                <th><span class="i18n" data-i18n-id="i18n_subscriptor">' + m((i = c.i18n || b && b.i18n,
    j = {
        hash: {},
        data: e
    },
    i ? i.call(b, "i18n_subscriptor", "Subscriptor", j) : o.call(b, "i18n", "i18n_subscriptor", "Subscriptor", j))) + "</span></th>\n            </tr>\n            </thead>\n            <tbody>\n            ",
    h = c.each.call(b, (h = b && b.options,
    null == h || !1 === h ? h : h.possibleSubscribers), {
        hash: {},
        inverse: n.noop,
        fn: n.programWithDepth(1, f, e, b),
        data: e
    }),
    (h || 0 === h) && (k += h),
    k += "\n            </tbody>\n        </table>\n    </div>\n</form>"
});
var e_openCurlyBraces = '<span class="exp-brackets">{</span>'
  , e_closeCurlyBraces = '<span class="exp-brackets">}</span>'
  , e_colon = '<span class="exp-operators">:</span>'
  , e_plus = '<span class="exp-operators">+</span>'
  , e_equals = '<span class="exp-operators">=</span>'
  , e_pipe = '<span class="exp-pipes">|</span>'
  , panel = {}
  , referenceToExpression = function(a) {
    return a.conceptId + " " + e_pipe + "<span class='exp-term'>" + a.defaultTerm + "</span>" + e_pipe
}
  , conceptToPostCoordinatedExpression = function(a, b, c, d) {
    var e = ""
      , f = "&nbsp;&nbsp;&nbsp;&nbsp;";
    if ("Fully defined" == a.definitionStatus || "Sufficiently defined" == a.definitionStatus ? e += "<span class='exp-operators'>===</span> " : e += "<span class='exp-operators'>&lt;&lt;&lt;</span> ",
    a[b] && a[b].length > 0) {
        var g = !0
          , h = {};
        $.each(a[b], function(a, b) {
            1 == b.active && "116680003" == b.type.conceptId ? (g ? e += referenceToExpression(b.target) : (e += " " + e_plus + " <br>",
            e += f + referenceToExpression(b.target)),
            g = !1) : 1 == b.active && "116680003" != b.type.conceptId && (h[b.groupId] || (h[b.groupId] = []),
            h[b.groupId].push(b))
        });
        var i = Object.keys(h);
        i.length > 0 && (e += " " + e_colon),
        $.each(i, function(a, b) {
            e += "<br>";
            var c = !0;
            $.each(h[b], function(a, d) {
                c || (e += ", <br>"),
                e += b > 0 ? f + f + f : f + f,
                c && b > 0 ? e += e_openCurlyBraces + " " : b > 0 && (e += "&nbsp;&nbsp;"),
                c = !1,
                e += referenceToExpression(d.type) + " " + e_equals + " " + referenceToExpression(d.target)
            }),
            0 != b && (e += " " + e_closeCurlyBraces)
        })
    }
    return e
}
  , renderExpression = function(a, b, c, d) {
    var e = referenceToExpression(a)
      , f = document.createElement("DIV");
    f.innerHTML = e;
    var g = f.textContent || f.innerText || "";
    g = g.replace(/\s\s+/g, " ");
    var h = conceptToPostCoordinatedExpression(a, "statedRelationships", c, d)
      , f = document.createElement("DIV");
    f.innerHTML = h;
    var i = f.textContent || f.innerText || "";
    i = i.replace(/\s\s+/g, " ");
    var j = conceptToPostCoordinatedExpression(a, "relationships", c, d)
      , f = document.createElement("DIV");
    f.innerHTML = j;
    var k = f.textContent || f.innerText || "";
    k = k.replace(/\s\s+/g, " ");
    var l = {
        divElementId: c.attr("id"),
        preCoordinatedExpressionHtml: e,
        statedExpressionHtml: h,
        inferredExpressionHtml: j,
        plainPreCoordinatedExpression: g,
        plainStatedExpression: i,
        plainInferredExpression: k
    };
    c.html(JST["views/conceptDetailsPlugin/tabs/expression.hbs"](l).trim()),
    panel.clipboard && panel.clipboard.destroy(),
    panel.clipboard = new Clipboard(".clip-btn-exp"),
    panel.clipboard.on("success", function(a) {
        alertEvent("Copied!", "info"),
        a.clearSelection()
    }),
    panel.clipboard.on("error", function(a) {
        console.log("Error!"),
        alertEvent("Error", "error")
    })
};
$(function() {
    $.extend($.fn.disableTextSelect = function() {
        return this.each(function() {
            $(this).mousedown(function() {
                return !1
            })
        })
    }
    ),
    $(".noSelect").disableTextSelect()
}),
function(a) {
    a.fn.addConceptDetails = function(a, b) {
        this.filter("div").each(function() {
            new conceptDetails(this,a,b).setupCanvas()
        })
    }
}(jQuery),
$(document).keypress(function(a) {
    "13" == a.which && a.preventDefault()
}),
countryIcons = {
    "999000041000000102": "gb",
    "999000011000000103": "gb",
    "999000021000000109": "gb",
    "999000031000000106": "gb",
    450829007: "es",
    731000124108: "us",
    5991000124107: "us",
    161771000036108: "au",
    "32570231000036109": "au",
    "32506021000036107": "au",
    "32570491000036106": "au",
    45991000052106: "se",
    554471000005108: "dk",
    9999999998: "gmdn",
    466707005: "mdp",
    11000146104: "nl",
    20621000087109: "ca",
    19481000087107: "ca",
    20611000087101: "ca",
    22091000087100: "ca",
    5641000179103: "uy",
    5631000179106: "uy",
    11000172109: "be",
    21000210109: "nz",
    51000202101: "no"
},
Handlebars.registerHelper("countryIcon", function(a) {
    return countryIcons[a]
}),
function(a) {
    function b(c) {
        this.constructor = b,
        this.popoverNumber = ++b.popoverNum,
        this.popoverListenerID = "popoverListener" + this.popoverNumber,
        this.isHeaderDisabled = !0,
        this.isDataKept = !1,
        this.hasBeenOpened = !1;
        var d = this
          , e = a(c);
        e.addClass(this.popoverListenerID),
        e.css("cursor", "pointer"),
        e.click(function(b) {
            d.toggleVisible(b, a(this)),
            a(document).trigger("popover.listenerClicked")
        })
    }
    function c(a) {
        b.apply(this, [a]),
        this.constructor = c,
        this.superConstructor = b,
        this.isHeaderDisabled = !1,
        this.isBackEnabled = !0,
        c.hasRun || (this.init(),
        c.hasRun = !0)
    }
    var d = {
        _init: function(a, c) {
            void 0 !== a.backgroundColor && b.setBackgroundColor(a.backgroundColor),
            void 0 !== a.fontColor && b.setFontColor(a.fontColor),
            void 0 !== a.borderColor && b.setBorderColor(a.borderColor),
            void 0 !== a.disableBackButton && (!0 === a.disableBackButton ? c.disableBackButton() : !1 === a.disableBackButton && c.enableBackButton()),
            void 0 !== a.enableBackButton && (!0 === a.enableBackButton ? c.enableBackButton() : !1 === a.enableBackButton && c.disableBackButton()),
            void 0 !== a.disableHeader && (!0 === a.disableHeader ? c.disableHeader() : !1 === a.disableHeader && c.enableHeader()),
            void 0 !== a.keepData && c.keepData(a.keepData),
            void 0 !== a.childToAppend && (c.childToAppend = a.childToAppend),
            void 0 !== a.onCreate && (c._onCreate = a.onCreate),
            void 0 !== a.onVisible && (c._onVisible = a.onVisible),
            b.addMenu(a.id, a.title, a.contents)
        },
        _popoverInit: function(a) {
            var c = new b(this.selector);
            return d._init(a, c),
            c
        },
        _optionsPopoverInit: function(a) {
            var b = new c(this.selector);
            return d._init(a, b),
            b
        },
        disableHeader: function(a) {
            a.disableHeader()
        },
        enableHeader: function(a) {
            a.enableHeader()
        },
        lockPopover: function() {
            b.lockPopover()
        },
        unlockPopover: function() {
            b.unlockPopover()
        },
        addMenu: function(a) {
            b.addMenu(a.id, a.title, a.contents)
        },
        closePopover: function() {
            b.closePopover()
        },
        _getPopoverClass: function() {
            return b
        }
    };
    a.fn.optionsPopover = function(b) {
        return d[b] ? d[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? (a.error("Method " + b + " does not exist on jQuery.optionsPopover"),
        this.each(function() {})) : d._optionsPopoverInit.apply(this, arguments)
    }
    ,
    a.fn.ppopover = function(b) {
        return d[b] ? d[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? (a.error("Method " + b + " does not exist on jQuery.popover"),
        this.each(function() {})) : d._popoverInit.apply(this, arguments)
    }
    ,
    b.prototype.disableHeader = function() {
        this.isHeaderDisabled = !0
    }
    ,
    b.prototype.enableHeader = function() {
        this.isHeaderDisabled = !1
    }
    ,
    b.prototype.disablePopover = function() {
        this.isDisabled = !0
    }
    ,
    b.prototype.enablePopover = function() {
        this.isDisabled = !1
    }
    ,
    b.prototype.keepData = function(a) {
        this.isDataKept = a
    }
    ,
    b.prototype.appendChild = function() {
        var b = this.childToAppend;
        b && a("#popoverContent")[0].appendChild(b)
    }
    ,
    b.prototype.toggleVisible = function(c, d) {
        b.lastPopoverClicked = this;
        var e = a(d);
        if (e) {
            var f = a("#popoverWrapper");
            if (0 !== f.length || (f = this.createPopover(),
            0 !== f.length)) {
                var g = e.attr("id")
                  , h = e.attr("class").split(/\s+/);
                if (h.push(g),
                a("#popover").is(":visible") && b.lastElementClick) {
                    if (e.is("#" + b.lastElementClick))
                        return void b.closePopover();
                    b.closePopover()
                }
                if (a("#popover").promise().done(function() {}),
                !b.isLocked && !this.isDisabled) {
                    if (this.populate(h),
                    e.trigger("popover.action", e),
                    b.backgroundColor && (a("#popoverHeader").css("backgroundColor", b.backgroundColor),
                    a("#popoverContent").css("backgroundColor", b.backgroundColor)),
                    b.fontColor && (a("#popover").css("color", b.fontColor),
                    a("#popover a").css("color", b.fontColor)),
                    b.borderColor && (a("#popoverHeader").css("border-color", b.borderColor),
                    a("#popoverContent").css("border-color", b.borderColor),
                    a(".popoverContentRow").css("border-color", b.borderColor)),
                    a("#popover").stop(!1, !0).fadeIn("fast"),
                    a("#popoverWrapper").css("visibility", "visible"),
                    a("#popover").promise().done(function() {}),
                    f.trigger("popover.visible"),
                    this._onVisible && this._onVisible(),
                    this.isDataKept && !this.hasBeenOpened || !this.isDataKept) {
                        var i = this.childToAppend;
                        i && this.appendChild(i)
                    }
                    this.hasBeenOpened = !0,
                    b.updatePositions(e),
                    b.lastElementClick = e.attr("id")
                }
            }
        }
    }
    ,
    b.updatePositions = function(c) {
        b.updateTopPosition(c),
        b.updateLeftPosition(c),
        a(document).trigger("popover.updatePositions")
    }
    ,
    b.updateTopPosition = function(c) {
        var d = b.getTop(c);
        a("#popoverWrapper").css("padding-top", d + "px")
    }
    ,
    b.updateLeftPosition = function(c) {
        var d = b.getLeft(c);
        a("#popoverWrapper").css("left", d.popoverLeft),
        b.setCaretPosition(d.targetLeft - d.popoverLeft + b.padding)
    }
    ,
    b.getLeft = function(c) {
        var d = a("#popoverWrapper");
        b.currentTarget = c;
        var e = c.offset().left + c.outerWidth() / 2
          , f = e + d.outerWidth() / 2
          , g = e - d.outerWidth() / 2 + b.padding + 1
          , h = a(window).width();
        return b.offScreenX = !1,
        g < 0 ? (b.offScreenX = !0,
        g = b.padding) : f > h && (b.offScreenX = !0,
        g = h - d.outerWidth()),
        {
            targetLeft: e,
            popoverLeft: g
        }
    }
    ,
    b.getTop = function(c) {
        var d = a("#popoverArrow").height()
          , e = "absolute" === a("#popoverWrapper").css("position") ? 0 : a(window).scrollTop()
          , f = c.offset().top - e
          , g = f + c.outerHeight()
          , h = g + d
          , i = a(window).height()
          , j = a("#popoverContent").height()
          , k = j + a("#popoverHeader").outerHeight() + d;
        return b.above = !1,
        b.offScreenY = !1,
        i < g + k ? (b.offScreenY = !0,
        f >= k ? (h = f - k,
        b.above = !0) : h = i - k) : h < 0 && (b.offScreenY = !0,
        h = b.padding + d),
        h
    }
    ,
    b.setCaretPosition = function(c) {
        var d = "50%"
          , e = a("#popoverArrow");
        if (b.offScreenX && (d = c),
        e.css("left", d),
        b.above) {
            var f = a("#popoverContent").outerHeight() - 4;
            a("#popoverArrow").css("margin-top", f + "px").addClass("flipArrow").html("▼")
        } else
            a("#popoverArrow").css("margin-top", "").removeClass("flipArrow").html("▲");
        b.caretLeftOffset = d
    }
    ,
    b.prototype.createPopover = function() {
        var c = a(document.createElement("div"));
        c.attr("id", "popoverWrapper"),
        c.html("<div id='popover'><div id='popoverArrow'>▲</div><div id='currentPopoverAction' style='display: none;'></div><div id='popoverContentWrapper'><div id='popoverContent'></div></div></div>"),
        c.find("#popover").css("display", "none"),
        a("body").prepend(c),
        a(window).on("resize", function() {
            a("#popover").is(":visible") && b.updatePositions(b.currentTarget);
            var c = a("#popoverWrapper");
            "absolute" === c.css("position") ? c.css("height", a(document).height()) : c.css("height", "")
        }),
        a("html").on("click touchend", function(c) {
            var d = a(c.target)
              , e = d.parents("#popoverHeader").length + d.is("#popoverHeader") ? 1 : 0
              , f = d.parents("#popoverContentWrapper").length && !d.parent().is("#popoverContentWrapper") ? 1 : 0
              , g = d.parents("." + b.lastPopoverClicked.popoverListenerID).length + d.is("." + b.lastPopoverClicked.popoverListenerID) ? 1 : 0;
            0 === e && 0 === f && 0 === g && b.closePopover()
        });
        var d, e = a("#popoverContentWrapper");
        return a(window).bind("resize", function() {
            a.browser.msie ? d || (d = setTimeout(function() {
                e.trigger("popover.resize"),
                d = null
            }, 50)) : e.trigger("popover.resize")
        }),
        e.trigger("popover.created"),
        this._onCreate && this._onCreate(),
        c
    }
    ,
    b.closePopover = function() {
        b.isLocked || (b.lastElementClick = null,
        a(document).trigger("popover.closing"),
        b.history = [],
        a("#popover").stop(!1, !0).fadeOut("fast"),
        a("#popoverWrapper").css("visibility", "hidden"))
    }
    ,
    b.getAction = function() {
        return a("#currentPopoverAction").html()
    }
    ,
    b.setAction = function(b) {
        a("#currentPopoverAction").html(b)
    }
    ,
    b.prototype.disableBackButton = function() {
        this.isBackEnabled = !1
    }
    ,
    b.prototype.enableBackButton = function() {
        this.isBackEnabled = !0
    }
    ,
    b.prototype.previousPopover = function() {
        if (b.history.pop(),
        b.history.length <= 0)
            return void b.closePopover();
        var a = b.history[b.history.length - 1];
        this.populateByMenu(a)
    }
    ,
    b.setTitle = function(c) {
        b.title = c,
        a("#popoverTitle").html(c)
    }
    ,
    b.getMenu = function(a) {
        var c;
        for (c = 0; c < b.menus.length; c += 1)
            if (b.menus[c].id === a)
                return b.menus[c];
        return null
    }
    ,
    b.addMenu = function(a, c, d) {
        b.menus.push({
            id: a,
            title: c,
            contents: d
        })
    }
    ,
    b.prototype.populateByMenu = function(c) {
        a(document).trigger("popover.populating"),
        this.lastContentHeight = b.getPopoverContentHeight(),
        this.isDataKept || this.clearData(),
        this.isHeaderDisabled || this.isDataKept ? this.removeHeader() : this.insertHeader();
        var d = a("#popover").css("display");
        if (this.isDataKept && this.hasBeenOpened || this.setData(c),
        this.currentContentHeight = b.getPopoverContentHeight(),
        b.above && "none" !== d) {
            var e = parseInt(a("#popoverWrapper").css("padding-top"), 10)
              , f = this.currentContentHeight - this.lastContentHeight
              , g = e - f;
            a("#popoverWrapper").css("padding-top", g + "px"),
            b.setCaretPosition(b.caretLeftOffset)
        }
        return !0
    }
    ,
    b.prototype.populate = function(a) {
        var c = null
          , d = 0;
        for (d; d < a.length && !(c = b.getMenu(a[d])); d++)
            ;
        return !!c && (b.history.push(c),
        this.populateByMenu(c))
    }
    ,
    b.getPopoverContentHeight = function() {
        var b = a("#popover").css("display");
        a("#popover").show();
        var c = a("#popoverContent").height();
        return a("#popover").css("display", b),
        c
    }
    ,
    b.prototype.insertHeader = function() {
        if (a("#popoverContentWrapper").before("<div id='popoverHeader'><div id='popoverTitle'></div><a id='popoverClose'><span id='popoverCloseIcon'>✕</span></a></div>"),
        this.isBackEnabled) {
            var c = this;
            a("#popoverHeader").prepend("<a id='popoverBack'><span id='popoverBackIcon'>◄</span></a>"),
            a("#popoverBack").on("click", function() {
                c.previousPopover()
            })
        }
        a("#popoverClose").on("click", function() {
            b.closePopover()
        }),
        a("#popoverContent").css("paddingTop", "47px")
    }
    ,
    b.prototype.removeHeader = function() {
        a("#popoverBack").off("click"),
        a("#popoverClose").off("click"),
        a("#popoverHeader").remove(),
        a("#popoverContent").css("paddingTop", "")
    }
    ,
    b.prototype.clearData = function() {
        this.removeHeader(),
        a("#popoverTitle").html(""),
        a("#popoverContent").html("")
    }
    ,
    b.prototype.setData = function(a) {
        b.setAction(a.id),
        b.setTitle(a.title),
        b.setContent(a.contents)
    }
    ,
    b.prototype.replaceMenu = function(a, b) {
        var c;
        for (c in a)
            delete a[c];
        for (c in b)
            a[c] = b[c]
    }
    ,
    b.setContent = function(c) {
        b.content = c,
        a("#popoverContent").html(c),
        a("#popoverContentWrapper").trigger("popover.setContent")
    }
    ,
    b.popoverNum = 0,
    b.lastElementClick = null,
    b.currentTarget = null,
    b.title = "",
    b.content = "",
    b.menus = [],
    b.history = [],
    b.backgroundColor = null,
    b.fontColor = null,
    b.borderColor = null,
    b.padding = 3,
    b.offScreenX = !1,
    b.offScreenY = !1,
    b.isLocked = !1,
    b.above = !1,
    b.caretLeftOffset = "50%",
    b.lastPopoverClicked = null,
    b.setBackgroundColor = function(a) {
        b.backgroundColor = a
    }
    ,
    b.setFontColor = function(a) {
        b.fontColor = a
    }
    ,
    b.setBorderColor = function(a) {
        b.borderColor = a
    }
    ,
    b.lockPopover = function() {
        b.isLocked = !0
    }
    ,
    b.unlockPopover = function() {
        b.isLocked = !1
    }
    ,
    c.prototype = new b,
    c.constructor = c,
    c.hasRun = !1,
    c.prototype.init = function() {
        a(document).on("touchstart mousedown", "#popover a", function() {
            a(this).css({
                backgroundColor: "#488FCD"
            })
        }).on("touchend mouseup mouseout", "#popover a", function() {
            a(this).css({
                backgroundColor: ""
            })
        }).on("click", ".popoverContentRow", function() {
            var c = [];
            c.push(a(this).attr("id")),
            a(this).hasClass("popoverEvent") && a(this).trigger("popover.action", a(this)),
            b.lastPopoverClicked.populate(c) || b.closePopover()
        })
    }
    ,
    c.prototype.setData = function(a) {
        var c, d = a.contents, e = "";
        for (c = 0; c < d.length; c++) {
            var f = ""
              , g = ""
              , h = ""
              , i = "";
            c === d.length - 1 && (f = " last"),
            void 0 !== d[c].id && (h = " id='" + d[c].id + "'"),
            void 0 !== d[c].url ? i = " href='" + d[c].url + "'" : g = " popoverEvent",
            e += "<a" + i + h + " class='popoverContentRow" + g + f + "'>" + d[c].name + "</a>"
        }
        b.setAction(a.id),
        b.setTitle(a.title),
        b.setContent(e)
    }
}(window.jQuery),
$(document).keypress(function(a) {
    "13" == a.which && a.preventDefault()
}),
function(a) {
    a.fn.addSearch = function(a) {
        this.filter("div").each(function() {
            new conceptDetails(this,a)
        })
    }
}(jQuery);
var idSequence = 0;
!function(a) {
    a.fn.addTaxonomy = function(a) {
        this.filter("div").each(function() {
            new conceptDetails(this,a)
        })
    }
}(jQuery),
icon = document.createElement("img"),
channel = postal.channel("Selections"),
Handlebars.registerHelper("i18n", function(a, b) {
    return void 0 === window[a] ? b : window[a]
}),
Handlebars.registerHelper("if_undefined", function(a, b) {
    if ("undefined" != b)
        return void 0 === a ? b.fn(this) : b.inverse(this)
}),
Handlebars.registerHelper("if_eqInd", function(a, b, c) {
    return parseInt(a) + 1 == parseInt(b) ? c.fn(this) : c.inverse(this)
}),
Handlebars.registerHelper("console", function(a) {
    console.log(a)
}),
$(document).on("dragend", function() {
    removeHighlight()
});
var lastEventTime = (new Date).getTime();
String.prototype.endsWith || (String.prototype.endsWith = function(a, b) {
    var c = this.toString();
    ("number" != typeof b || !isFinite(b) || Math.floor(b) !== b || b > c.length) && (b = c.length),
    b -= a.length;
    var d = c.indexOf(a, b);
    return -1 !== d && d === b
}
);
