/*jslint browser this */
/*global main, calques */

(function (global) {
    "use strict";

    var tool = {
        element: null,
        actif: false,
        context: null,
        last: {},
        createElement: function () {
            var pencil = document.createElement("a");
            pencil.href = "#";
            pencil.className = "flaticon-edit";
            pencil.id = "pencil";
            main.doms.tools.appendChild(pencil);
            this.element = pencil;
        },
        elementHandleClick: function (e) {
            e.preventDefault();
            main.courentTool = "pencil";
            main.paintMode.globalCompositeOperation = "source-over";
        },
        handleMouseUp: function () {
            if (main.courentTool === "pencil") {
                this.actif = false;
                main.merge();
            }
        },
        handleMouseDown: function (e) {
            if (main.courentTool === "pencil") {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                this.actif = true;
                this.context.beginPath();
                this.context.moveTo((mouseX - 1), mouseY);
                this.context.lineTo(mouseX, mouseY);
                this.context.closePath();
                this.context.lineJoin = main.paintMode.lineJoin;
                this.context.lineWidth = main.paintMode.lineWidth;
                this.context.strokeStyle = main.paintMode.strokeStyle;
                this.context.globalCompositeOperation = main.paintMode.globalCompositeOperation;
                this.context.stroke();
                this.last.x = mouseX;
                this.last.y = mouseY;
            }
        },
        handleMouseMove: function (e) {
            if (main.courentTool === "pencil" && this.actif === true) {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                this.context.beginPath();
                this.context.moveTo(this.last.x, this.last.y);
                this.context.lineTo(mouseX, mouseY);
                this.context.closePath();
                this.context.stroke();
                this.last.x = mouseX;
                this.last.y = mouseY;
            }
        },
        addListeners: function () {
            this.element.addEventListener('click', this.elementHandleClick.bind(this));
            var element = calques.elements.default;
            element.addEventListener('mousemove', this.handleMouseMove.bind(this));
            element.addEventListener('mousedown', this.handleMouseDown.bind(this));
            element.addEventListener('mouseup', this.handleMouseUp.bind(this));
        },
        init: function () {
            this.createElement();
            this.addListeners();
            this.context = calques.elements.default.getContext("2d");
        }
    };
    global.pencil = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
