"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerfyPackage = void 0;
let typesPackages = [];
class VerfyPackage {
    getTypes(packages) {
        for (const item of packages) {
            switch (item) {
                case "express":
                    typesPackages.push("@types/express");
                    break;
                case "morgan":
                    typesPackages.push("@types/morgan");
                    break;
                case "cors":
                    typesPackages.push("@types/cors");
                    break;
            }
        }
        const formatString = typesPackages.join(" ");
        return formatString;
    }
}
exports.VerfyPackage = VerfyPackage;
