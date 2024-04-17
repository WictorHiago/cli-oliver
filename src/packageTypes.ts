let typesPackages: string[] = [];

export class VerfyPackage {
  public getTypes(packages: string[]) {
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
