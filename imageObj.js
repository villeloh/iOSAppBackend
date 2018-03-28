"use strict";

/**
 * Image Model
 * @author Ville Lohkovuori
 */

 var imageObjModule = (function() {

    var ImageObj = function (title, fileUrl) {
        this.title = title
        this.fileUrl = fileUrl
    };

    /*
    Animal.prototype.print = function () {
        console.log('Name is :'+ this.name);
    };
    */

    return { ImageObj: ImageObj }
}());

 module.exports = imageObjModule;
