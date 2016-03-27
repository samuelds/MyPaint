/*jslint browser this */
/*global main, calques */

(function (global) {
    "use strict";

    var tool = {
        elements: {},
        courentSize: function () {
            this.elements.value.innerHTML = main.paintMode.lineWidth;
        },
        createElement: function () {
            var less = document.createElement("a");
            less.href = "#";
            less.className = "flaticon-round";
            less.id = "less";
            main.doms.tools.appendChild(less);
            this.elements.less = less;

            var value = document.createElement("div");
            value.id = "size";
            main.doms.tools.appendChild(value);
            this.elements.value = value;

            var more = document.createElement("a");
            more.href = "#";
            more.className = "flaticon-circle-1";
            more.id = "more";
            main.doms.tools.appendChild(more);
            this.elements.more = more;
        },
        elementHandleClickLess: function (e) {
            e.preventDefault();
            if (main.paintMode.lineWidth >= 2) {
                main.paintMode.lineWidth -= 1;
                this.courentSize();
            }
        },
        elementHandleClickMore: function (e) {
            e.preventDefault();
            main.paintMode.lineWidth += 1;
            this.courentSize();
        },
        addListeners: function () {
            this.elements.less.addEventListener('click', this.elementHandleClickLess.bind(this));
            this.elements.more.addEventListener('click', this.elementHandleClickMore.bind(this));
        },
        init: function () {
            this.createElement();
            this.addListeners();
            this.context = calques.elements.default.getContext("2d");
            this.courentSize();
        }
    };
    global.default = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
