/* SystemJS module definition */
declare var require: any;
declare var module: NodeModule;
// google code-prettify
declare const PR: any;

interface NodeModule {
    id: string;
}

type DEMOS = { [key: string]: { ts: string, html: string } };
