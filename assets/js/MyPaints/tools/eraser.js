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
            var eraserTool = document.createElement("a");
            eraserTool.href = "#";
            eraserTool.className = "flaticon-remove";
            eraserTool.id = "eraser";
            main.doms.tools.appendChild(eraserTool);
            this.element = eraserTool;
        },
        elementHandleClick: function (e) {
            e.preventDefault();
            main.courentTool = "eraser";
            main.paintMode.globalCompositeOperation = "destination-out";
        },
        handleMouseUp: function () {
            if (main.courentTool === "eraser") {
                this.actif = false;
            }
        },
        handleMouseDown: function (e) {
            if (main.courentTool === "eraser") {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                this.actif = true;
                this.context = calques.courent.calque.getContext("2d");
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
            if (main.courentTool === "eraser" && this.actif === true) {
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
        }
    };
    global.eraser = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
