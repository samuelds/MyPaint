/*jslint browser this for */
/*global main, calques */

(function (global) {
    "use strict";

    var tool = {
        element: null,
        context: null,
        createElement: function () {
            var saveTool = document.createElement("a");
            saveTool.href = "#";
            saveTool.className = "flaticon-diskette";
            saveTool.id = "save";
            main.doms.tools.appendChild(saveTool);
            this.element = saveTool;
        },
        saveToImage: function () {
            var elements = calques.elements;
            var element;
            Object.keys(elements).forEach(function (key) {
                if (key !== 'default' && key !== "save") {
                    element = elements[key];
                    if (element.style.display !== "none") {
                        this.context.drawImage(element, 0, 0);
                    }
                }
            }, this);
            return calques.elements.save.toDataURL("image/png;base64;");
        },
        elementHandleClick: function () {
            var data = this.saveToImage();
            this.element.href = data;
            this.element.setAttribute("download", "MyPaint.png");
        },
        addListeners: function () {
            this.element.addEventListener('click', this.elementHandleClick.bind(this));
        },
        init: function () {
            this.createElement();
            this.addListeners();
            this.context = calques.elements.save.getContext("2d");
        }
    };
    global.save = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
