"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = exports.getAllCollections = void 0;
var admin = __importStar(require("firebase-admin"));
/**
 * Get data from all collections
 * Suggestion from jcummings2 and leningsv
 * @param {Array<string>} collectionNameArray
 */
exports.getAllCollections = function (collectionNameArray, docsFromEachCollection, refKeys) { return __awaiter(void 0, void 0, void 0, function () {
    var db, snap, paths, promises, value, all;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = admin.firestore();
                return [4 /*yield*/, db.listCollections()];
            case 1:
                snap = _a.sent();
                paths = collectionNameArray;
                if (paths.length === 0) {
                    // get all collections
                    snap.forEach(function (collection) { return paths.push(collection.path); });
                }
                promises = [];
                paths.forEach(function (segment) {
                    var result = exports.backup(segment, docsFromEachCollection, refKeys);
                    promises.push(result);
                });
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                value = _a.sent();
                all = Object.assign.apply(Object, __spreadArrays([{}], value));
                return [2 /*return*/, all];
        }
    });
}); };
/**
 * Backup data from firestore
 *
 * @param {string} collectionName
 * @returns {Promise<any>}
 */
exports.backup = function (collectionName, docsFromEachCollection, refKeys) { return __awaiter(void 0, void 0, void 0, function () {
    function addElement(ElementList, element) {
        var newList = Object.assign(ElementList, element);
        return newList;
    }
    function getPath(obj) {
        if (obj && typeof obj.path === 'string') {
            return obj.path;
        }
        return obj;
    }
    var db, data, documents, docs, _i, docs_1, doc, subCollections, _a, refKeys_1, refKey, _b, _c, val, _d, subCollections_1, subCol, subColData, error_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 9, , 10]);
                db = admin.firestore();
                data = {};
                data[collectionName] = {};
                return [4 /*yield*/, db.collection(collectionName).get()];
            case 1:
                documents = _e.sent();
                docs = docsFromEachCollection > 0
                    ? documents.docs.slice(0, docsFromEachCollection)
                    : documents.docs;
                _i = 0, docs_1 = docs;
                _e.label = 2;
            case 2:
                if (!(_i < docs_1.length)) return [3 /*break*/, 8];
                doc = docs_1[_i];
                return [4 /*yield*/, doc.ref.listCollections()];
            case 3:
                subCollections = _e.sent();
                data[collectionName][doc.id] = doc.data();
                if (refKeys) {
                    for (_a = 0, refKeys_1 = refKeys; _a < refKeys_1.length; _a++) {
                        refKey = refKeys_1[_a];
                        if (data[collectionName][doc.id][refKey]) {
                            if (Array.isArray(data[collectionName][doc.id][refKey])) {
                                for (_b = 0, _c = data[collectionName][doc.id][refKey]; _b < _c.length; _b++) {
                                    val = _c[_b];
                                    data[collectionName][doc.id][refKey] = getPath(val);
                                }
                            }
                            else if (typeof data[collectionName][doc.id][refKey].path === 'string') {
                                data[collectionName][doc.id][refKey] =
                                    data[collectionName][doc.id][refKey].path;
                            }
                        }
                    }
                }
                data[collectionName][doc.id]['subCollection'] = {};
                _d = 0, subCollections_1 = subCollections;
                _e.label = 4;
            case 4:
                if (!(_d < subCollections_1.length)) return [3 /*break*/, 7];
                subCol = subCollections_1[_d];
                return [4 /*yield*/, exports.backup(collectionName + "/" + doc.id + "/" + subCol.id, docsFromEachCollection, refKeys)];
            case 5:
                subColData = _e.sent();
                data[collectionName][doc.id]['subCollection'] = addElement(data[collectionName][doc.id]['subCollection'], subColData);
                _e.label = 6;
            case 6:
                _d++;
                return [3 /*break*/, 4];
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/, data];
            case 9:
                error_1 = _e.sent();
                console.error(error_1);
                throw new Error(error_1);
            case 10: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=export.js.map