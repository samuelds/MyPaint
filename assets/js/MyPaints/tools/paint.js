/*jslint browser this for */
/*global main, calques */

(function (global) {
    "use strict";

    var tool = {
        elements: {},
        enabled: false,
        dom: false,
        colors: [
            '#000000', '#ffffff', '#d50000', '#C51162', '#6200EA', '#AA00FF',
            '#304FFE', '#2962FF', '#0091EA', '#00B8D4', '#00BFA5', '#00C853',
            '#64DD17', '#AEEA00', '#FFD600', '#FFAB00', '#FF6D00', '#DD2C00',
            '#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
            '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
            '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E',
            '#607D8B', '#b71c1c', '#880E4F', '#4A148C', '#311B92', '#1A237E',
            '#0D47A1', '#01579B', '#006064', '#004D40', '#1B5E20', '#33691E',
            '#827717', '#F57F17', '#FF6F00', '#E65100', '#BF360C', '#3E2723',
            '#212121', '#263238', '#ecf0f1', '#7f8c8d', '#bdc3c7', '#2c3e50',
            '#45fe71', '#fe4a5e', '#54a5d1', '#5f4d2a'
        ],
        loadColors: function () {
            var element = document.getElementById('colors');
            var i;
            var html;
            for (i = 0; i < this.colors.length; i += 1) {
                html = document.createElement('div');
                html.className = "color";
                html.style.backgroundColor = this.colors[i];
                element.appendChild(html);
            }
        },
        courentColor: function () {
            this.elements.color.style.backgroundColor = main.paintMode.strokeStyle;
        },
        createElements: function () {
            var paint = document.createElement("a");
            paint.href = "#";
            paint.className = "flaticon-paint";
            paint.id = "paint";
            main.doms.tools.appendChild(paint);
            this.elements.tool = paint;

            var color = document.createElement("div");
            color.id = "courentColor";
            main.doms.tools.appendChild(color);
            this.elements.color = color;
        },
        handleColorClick: function (e) {
            var element = e.toElement;
            var getClass = element.className;
            var color = element.style.backgroundColor;
            if (getClass && color) {
                main.paintMode.strokeStyle = color;
            }
            this.courentColor();
        },
        handleFormColorSubmit: function (e) {
            e.preventDefault();
            var value = document.getElementById('colorPicker').value;
            var element = document.getElementById('custum');

            var html = document.createElement('div');
            html.className = "color";
            html.style.backgroundColor = value;

            element.appendChild(html);
        },
        elementHandleClick: function (e) {
            e.preventDefault();
            if (this.enabled === false) {
                this.enabled = true;
                this.dom.className = 'display';
            } else {
                this.enabled = false;
                this.dom.className = 'hiden';
            }
        },
        HandleClick: function (e) {
            e.preventDefault();
        },
        addListeners: function () {
            this.elements.tool.addEventListener('click', this.elementHandleClick.bind(this));
            this.elements.tool.addEventListener('click', this.HandleClick.bind(this));

            var color = document.getElementById('colors');
            color.addEventListener('click', this.handleColorClick.bind(this));

            var custum = document.getElementById('custum');
            custum.addEventListener('click', this.handleColorClick.bind(this));

            var formColor = document.getElementById('form-color');
            formColor.addEventListener('submit', this.handleFormColorSubmit.bind(this));
        },
        init: function () {
            this.createElements();
            this.addListeners();
            this.dom = document.getElementById('panel');
            this.courentColor();
            this.loadColors();
        }
    };
    global.paint = tool;

    document.addEventListener('MyPaintsLoad', function () {
        tool.init();
    });
}(this));
