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
            var squareFullTool = document.createElement("a");
            squareFullTool.href = "#";
            squareFullTool.className = "flaticon-square";
            squareFullTool.id = "squareFull";
            main.doms.tools.appendChild(squareFullTool);
            this.element = squareFullTool;
        },
        elementHandleClick: function (e) {
            e.preventDefault();
            main.paintMode.globalCompositeOperation = "source-over";
            main.courentTool = "squareFull";
        },
        handleMouseUp: function () {
            if (main.courentTool === "squareFull") {
                this.actif = false;
                main.merge();
            }
        },
        handleMouseDown: function (e) {
            if (main.courentTool === "squareFull") {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                this.actif = true;
                this.started.x = mouseX;
                this.started.y = mouseY;
            }
        },
        handleMouseMove: function (e) {
            if (main.courentTool === "squareFull" && this.actif === true) {
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
                this.context.fillStyle = main.paintMode.strokeStyle;
                this.context.globalCompositeOperation = main.paintMode.globalCompositeOperation;
                this.context.fill();
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
    global.squareFull = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
