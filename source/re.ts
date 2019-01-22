import {
  MemoizeAll,
} from "lodash-decorators";

import {
  ReportersDB,
} from "./data";

export abstract class Expressions {         
  
  @MemoizeAll()
  public static reporter(): RegExp {
    const editionsAndVariations = Object.keys(Object.assign({}, editions(), variations()));
    editionsAndVariations.sort((a, b) => b.length - a.length);
    const escape = (s: string) => s.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
    return RegExp("\\s(" + editionsAndVariations.map(escape).join("|") + ")\\s", "i");
  }

  @MemoizeAll
  public static spacing(): RegExp {
    return /[\s,;:.()[\]{}]+/;
  }
}
