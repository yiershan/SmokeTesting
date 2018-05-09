import {SmokeTest,SmokeConfig} from "./smoke-test";

const config = new SmokeConfig();
config.url = [{
    name: '首页',
    url:'index.html',
    selector:{
        query:'spa',
        attr:'href'
    }
},{
    url:'index.html',
    selector:{
        query:'.footer span',
        attr:'html'
    }
},{
    url:'index.html',
    selector:{
        query:'.footer span',
        attr:'html'
    }
},{
    url:'index.html',
    selector:{
        query:'.footer span',
        attr:'html'
    }
},{
    url:'index.html',
    selector:{
        query:'.footer span',
        attr:'html'
    }
},{
    url:'index.html',
    selector:{
        query:'.footer span',
        attr:'html'
    }
},{
    url:'index.html',
    selector:{
        query:'.footer span',
        attr:'html'
    }
}];
config.error = true;
const smoke = new SmokeTest();
smoke.init(config);
smoke.start();
