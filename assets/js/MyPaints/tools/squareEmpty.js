/*jslint browser this */
/*global main, calques */

(function (global) {
    "use strict";

    var tool = {
        element: null,
        actif: false,
        context: null,
        started: {},
        createElement: function () {
            var squareEmptyTool = document.createElement("a");
            squareEmptyTool.href = "#";
            squareEmptyTool.className = "flaticon-square-1";
            squareEmptyTool.id = "squareEmpty";
            main.doms.tools.appendChild(squareEmptyTool);
            this.element = squareEmptyTool;
        },
        elementHandleClick: function (e) {
            e.preventDefault();
            main.paintMode.globalCompositeOperation = "source-over";
            main.courentTool = "squareEmpty";
        },
        handleMouseUp: function () {
            if (main.courentTool === "squareEmpty") {
                this.actif = false;
                main.merge();
            }
        },
        handleMouseDown: function (e) {
            if (main.courentTool === "squareEmpty") {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                this.actif = true;
                this.started.x = mouseX;
                this.started.y = mouseY;
            }
        },
        handleMouseMove: function (e) {
            if (main.courentTool === "squareEmpty" && this.actif === true) {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                var calculX = mouseX - this.started.x;
                var calculY = mouseY - this.started.y;

                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                this.context.beginPath();
                this.context.rect(this.started.x, this.started.y, calculX, calculY);
                this.context.closePath();
                this.context.lineJoin = main.paintMode.lineJoin;
                this.context.lineWidth = main.paintMode.lineWidth;
                this.context.strokeStyle = main.paintMode.strokeStyle;
                this.context.globalCompositeOperation = main.paintMode.globalCompositeOperation;
                this.context.stroke();
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
    global.squareEmpty = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
