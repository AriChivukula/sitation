import {
  MemoizeAll,
} from "lodash-decorators";

import {
  DB,
} from "./db";

export abstract class Expressions {

  @MemoizeAll
  public static escape(): RegExp {
    return /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g;
  }

  @MemoizeAll()
  public static reporter(): RegExp {
    const editionsAndVariations = Object.keys(DB.reporters());
    editionsAndVariations.sort((a, b) => b.length - a.length);
    const escape = (s: string) => s.replace(Expressions.escape(), "\\$&");
    return RegExp("\\s(" + editionsAndVariations.map(escape).join("|") + ")\\s", "i");
  }

  @MemoizeAll()
  public static signal(): RegExp {
    const signals = Object.keys(DB.signals());
    signals.sort((a, b) => b.length - a.length);
    const escape = (s: string) => s.replace(Expressions.escape(), "\\$&");
    return RegExp("\\s(" + signals.map(escape).join("|") + ")\\s", "i");
  }

  @MemoizeAll
  public static spacing(): RegExp {
    return /[\s,;:.()[\]{}]+/;
  }
}
