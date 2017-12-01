"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NG2
var core_1 = require("@angular/core");
var NovoLoadingElement = (function () {
    function NovoLoadingElement() {
    }
    return NovoLoadingElement;
}());
NovoLoadingElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-loading',
                host: {
                    '[class]': 'theme || ""'
                },
                template: "\n        <span class=\"dot\"></span>\n        <span class=\"dot\"></span>\n        <span class=\"dot\"></span>\n        <span class=\"dot\"></span>\n        <span class=\"dot\"></span>\n    "
            },] },
];
/** @nocollapse */
NovoLoadingElement.ctorParameters = function () { return []; };
NovoLoadingElement.propDecorators = {
    'theme': [{ type: core_1.Input },],
};
exports.NovoLoadingElement = NovoLoadingElement;
var NovoSpinnerElement = (function () {
    function NovoSpinnerElement() {
    }
    return NovoSpinnerElement;
}());
NovoSpinnerElement.decorators = [
    { type: core_1.Component, args: [{
                selector: 'novo-spinner',
                template: "\n        <svg class=\"bullhornSpinner\" [ngClass]=\"theme\" height=\"100\" width=\"100\" viewBox=\"0 0 100 100\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" [attr.inverse]=\"inverse\">\n            <title>Bullhorn Spinner Animation</title>\n            <desc>Spinner animation indicating loading</desc>\n            <defs>\n                <style>\n                    .bullhornSpinner g.circleGroup {\n                        -webkit-filter: url(\"{{baseHref || ''}}#gooEffect\");\n                        filter: url(\"{{baseHref || ''}}#gooEffect\");\n                    }\n                    _:-webkit-full-screen:not(:root:root), .bullhornSpinner g.circleGroup {\n                        -webkit-filter: none;\n                        filter: none;\n                    }\n                    @supports (-webkit-text-size-adjust:none) and (not (-ms-accelerator:true)) and (not (-moz-appearance:none)) {\n                        .bullhornSpinner g.circleGroup {\n                            -webkit-filter: none;\n                            filter: none;\n                        }\n                    }\n                    @supports (-webkit-text-size-adjust:none) and (not (-ms-accelerator:true)) and (not (-moz-appearance:none)) {\n                        .bullhornSpinner g.circleGroup {\n                            -webkit-filter: none;\n                            filter: none;\n                        }\n                    }\n                </style>\n                <filter id=\"gooEffect\">\n                    <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"5\" result=\"blur\" />\n                    <feColorMatrix in=\"blur\" mode=\"matrix\" values=\"\n                            1.3 0 0 0 0\n                            0 1.3 0 0 0\n                            0 0 1.3 0 0\n                            0 0 0 19 -7\" result=\"gooEffect\" />\n                    <feComposite in=\"SourceGraphic\" in2=\"gooEffect\" operator=\"atop\" />\n                </filter>\n            </defs>\n            <path d=\"M 43 43 L 54 45 L 80 40 L 43 43\" stroke=\"none\" fill=\"none\" id=\"firstLinePath\"/>\n            <path d=\"M 43 43 L 48 41 L 48 18 L 43 43\" stroke=\"none\" fill=\"none\" id=\"secondLinePath\"/>\n            <path d=\"M 43 43 L 42 45 L 15 40 L 43 43\" stroke=\"none\" fill=\"none\" id=\"thirdLinePath\"/>\n            <path d=\"M 43 43 L 44 52 L 29 78 L 43 43\" stroke=\"none\" fill=\"none\" id=\"fourthLinePath\"/>\n            <path d=\"M 43 43 L 52 52 L 68 78 L 43 43\" stroke=\"none\" fill=\"none\" id=\"fifthLinePath\"/>\n            <g class=\"circleGroup\" transform=\"translate(7, 7)\">\n                <circle r=\"6\" cx=\"0\" cy=\"0\">\n                    <!-- Define the motion path animation -->\n                    <animateMotion dur=\"3.4\" repeatCount=\"indefinite\">\n                        <mpath xlink:href=\"#firstLinePath\"/>\n                    </animateMotion>\n                </circle>\n                <circle r=\"6\" cx=\"0\" cy=\"0\">\n                    <!-- Define the motion path animation -->\n                    <animateMotion dur=\"3.4\" repeatCount=\"indefinite\">\n                        <mpath xlink:href=\"#secondLinePath\"/>\n                    </animateMotion>\n                </circle>\n                <circle r=\"6\" cx=\"0\" cy=\"0\">\n                    <!-- Define the motion path animation -->\n                    <animateMotion dur=\"3.4\" repeatCount=\"indefinite\">\n                        <mpath xlink:href=\"#thirdLinePath\"/>\n                    </animateMotion>\n                </circle>\n                <circle r=\"6\" cx=\"0\" cy=\"0\">\n                    <!-- Define the motion path animation -->\n                    <animateMotion dur=\"3.4\" repeatCount=\"indefinite\">\n                        <mpath xlink:href=\"#fourthLinePath\"/>\n                    </animateMotion>\n                </circle>\n                <circle r=\"6\" cx=\"0\" cy=\"0\">\n                    <!-- Define the motion path animation -->\n                    <animateMotion dur=\"3.4\" repeatCount=\"indefinite\">\n                        <mpath xlink:href=\"#fifthLinePath\"/>\n                    </animateMotion>\n                </circle>\n            </g>\n        </svg>\n    "
            },] },
];
/** @nocollapse */
NovoSpinnerElement.ctorParameters = function () { return []; };
NovoSpinnerElement.propDecorators = {
    'theme': [{ type: core_1.Input },],
    'inverse': [{ type: core_1.Input },],
    'baseHref': [{ type: core_1.Input },],
};
exports.NovoSpinnerElement = NovoSpinnerElement;
//# sourceMappingURL=Loading.js.map