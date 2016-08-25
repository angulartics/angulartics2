"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angulartics2_1 = require('./src/core/angulartics2');
__export(require('./src/core/angulartics2'));
__export(require('./src/core/angulartics2On'));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    providers: [angulartics2_1.Angulartics2]
};
