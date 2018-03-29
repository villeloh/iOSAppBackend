"use strict";

/**
 * Server-side Image Model
 * @author Ville Lohkovuori
 */

 // TODO: figure out how to make CLASS-based imports/exports work !!
 var imageObjModule = (function() {

    var ImageObj = function (title, fileUrl) {

        this.title = title;
        this.fileUrl = fileUrl;
    };

    // example of adding a method:
    /*
    Animal.prototype.print = function () {
        console.log('Name is :'+ this.name);
    };
    */

    return { ImageObj: ImageObj }
}());

 module.exports = imageObjModule;
