import * as yargs from "yargs";

import {
  sitation,
} from "./index";

yargs
  .usage(
    "$0",
    true,
    (y: yargs.Argv<any>): yargs.Argv<any> => y
      .option(
        "casebody",
        {
          demandOption: true,
          describe: "Case Body Text",
        },
      ),
    (argv: yargs.Arguments<any>): void => {
      console.log(argv.casebody);
      console.log(sitation(argv.casebody));
    },
  )
  .help()
  .argv;
