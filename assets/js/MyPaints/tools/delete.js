/*jslint browser this */
/*global main, calques */

(function (global) {
    "use strict";

    var tool = {
        element: null,
        createElement: function () {
            var deleteTool = document.createElement("a");
            deleteTool.href = "#";
            deleteTool.className = "flaticon-delete";
            deleteTool.id = "delete";
            main.doms.tools.appendChild(deleteTool);
            this.element = deleteTool;
        },
        elementHandleClick: function (e) {
            e.preventDefault();
            var calque = calques.courent.calque.getContext("2d");
            var prevew = calques.courent.prevew.getContext("2d");
            calque.clearRect(0, 0, calque.canvas.width, calque.canvas.height);
            prevew.clearRect(0, 0, prevew.canvas.width, prevew.canvas.height);
        },
        addListeners: function () {
            this.element.addEventListener('click', this.elementHandleClick.bind(this));
        },
        init: function () {
            this.createElement();
            this.addListeners();
        }
    };
    global.delete = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
