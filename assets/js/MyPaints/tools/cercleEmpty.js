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
            var pencilTool = document.createElement("a");
            pencilTool.href = "#";
            pencilTool.className = "flaticon-circle";
            pencilTool.id = "cercleEmpty";
            main.doms.tools.appendChild(pencilTool);
            this.element = pencilTool;
        },
        elementHandleClick: function (e) {
            e.preventDefault();
            main.paintMode.globalCompositeOperation = "source-over";
            main.courentTool = "cercleEmpty";
        },
        handleMouseUp: function () {
            if (main.courentTool === "cercleEmpty") {
                this.actif = false;
                main.merge();
            }
        },
        handleMouseDown: function (e) {
            if (main.courentTool === "cercleEmpty") {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                this.actif = true;
                this.started.x = mouseX;
                this.started.y = mouseY;
            }
        },
        handleMouseMove: function (e) {
            if (main.courentTool === "cercleEmpty" && this.actif === true) {
                var mouseX = e.pageX - e.target.offsetLeft;
                var mouseY = e.pageY - e.target.offsetTop;
                var calcul = Math.sqrt(Math.pow((mouseX - this.started.x), 2) + Math.pow((mouseY - this.started.y), 2));
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                this.context.beginPath();
                this.context.arc(this.started.x, this.started.y, calcul, 0, Math.PI * 2);
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
    global.cercleEmpty = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
