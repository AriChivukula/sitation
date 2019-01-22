import {
  MemoizeAll,
} from "lodash-decorators";

import {
  editions,
  variations,
} from "./data";

export abstract class Data {         
  
  @MemoizeAll()
  public static reporterRE(): RegExp {
    const editionsAndVariations = Object.keys(Object.assign({}, editions(), variations()));
    editionsAndVariations.sort((a, b) => b.length - a.length);
    const escape = (s: string) => s.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
    return RegExp("\\s(" + editionsAndVariations.map(escape).join("|") + ")\\s", "i");
  }

  @MemoizeAll
  public static spacingRE(): RegExp {
    return /[\s,;:.()[\]{}]+/;
  }
}
