export class SmokeConfig{
    url: SmokeUrl[];
    max: number;
    timeSpan: number;
    ok?: any;
    test?: any;
    error: boolean;
    constructor() {
        this.error =false;
        this.max =5;
        this.timeSpan =500;
        this.url = [];
    }
}

export class SmokeUrl {
    name?: string;
    url: string;
    selector?: SmokeSelector;
    constructor() {
        this.url = "";
    }
}

export  class SmokeSelector {
    name?: string;
    query: string;
    attr: string;
    value?: string;
    constructor() {
        this.query = "";
        this.attr ="";
    }
}

