"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NovoFile = (function () {
    function NovoFile(file) {
        var _this = this;
        this.name = '';
        this.contentType = '';
        this.lastModified = 0;
        this.size = 0;
        this.loaded = false;
        this.reader = new FileReader();
        this.name = "" + encodeURIComponent(file.name || '');
        this.contentType = file.type;
        this.lastModified = file.lastModified;
        this.size = file.size;
        this.file = file;
        this.reader.onload = function (event) {
            _this.fileContents = event.target.result.split(',')[1];
            _this.dataURL = event.target.result;
            _this.loaded = true;
        };
    }
    NovoFile.prototype.read = function () {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this);
            // when the file is read it triggers the onload event above.
            _this.reader.readAsDataURL(_this.file);
        });
    };
    NovoFile.prototype.toJSON = function () {
        return {
            name: this.name,
            contentType: this.type,
            lastModified: this.lastModified,
            size: this.size,
            fileContents: this.fileContents
        };
    };
    return NovoFile;
}());
exports.NovoFile = NovoFile;
//# sourceMappingURL=File.js.map