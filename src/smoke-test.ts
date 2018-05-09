import {SmokeConfig, SmokeSelector, SmokeUrl} from "./smoke-config";
import $ = require("jquery");
export * from "./smoke-config";

export  class SmokeTest {
    config: SmokeConfig;
    now =0;
    index = 0;
    c=0;
    s=0;
    e=0;
    constructor() {
        this.config = new SmokeConfig();
    }
    get len() {
        return this.config.url.length;
    }
    start(){
        if (!this.config.url) return;
        this.index = 0;
        const max = this.config.max || 5;
        console.log('任务开始，一共'+this.len+'个地址');
        console.log('最大同时访问数量'+ max);
        const timer = setInterval(()=>{
            if(this.now<max){
                this.httpGet(this.config.url[this.index++]);
                this.now ++ ;
                if(this.index === this.len){
                    window.clearInterval(timer);
                }
            }
        }, this.config.timeSpan || 100)
    }
    init(config: SmokeConfig) {
        this.config = config;
    }
    private httpGet(url: SmokeUrl) {
        console.log('开始访问'+(url.name||url.url));
        const starTime = new Date().getTime();
        $.get(url.url).then((result)=>{
            const endTime = new Date().getTime();
            const span = (endTime - starTime) / 1000;
            this.test(url, result, span);
            this.now--;
            this.isEnd();
        }).fail((e)=>{
            this.e++;
            this.isEnd();
            this.notFind(url,e)
        })
    }
    private isEnd() {
        if (this.s+this.e === this.len) {
            console.log('执行完毕。');
            console.log('链接成功数量：'+this.c);
            console.log('页面正确数量：'+this.s);
            console.log('页面可能不正确数量：'+this.e);
            this.c=this.s=this.e =0;
        }
    }
    ok (url: SmokeUrl, span: number, query?: string) {
        let msg = new Date().toLocaleTimeString() + ':   "';
        msg += url.name|| url.url;
        msg += '"页面访问完毕，页面Ok。';
        if (span) {
            msg += '耗时:' + span + '秒。';
        }
        if (query) {
            msg += '关键字：' + query;
        }
        console.log(msg);
    }
    notFind (url: SmokeUrl,data: any) {
        let msg = new Date().toLocaleTimeString() + ':   ';
        msg += '"' + url.name || url.url;
        msg += '"没有找到关键元素，可能页面有错误！页面地址为：'+url.url;
        if(this.config.error){
            msg+= '页面信息为：';
            console.group(msg);
            console.error(msg);
            console.dirxml(data);
            console.groupEnd();
        }else {
            console.log(msg);
        }
    }
    test (url: SmokeUrl, data: any, span: number) {
        this.c++;
        const selector = url.selector;
        if(selector&&selector.query&&selector.attr)
        {
            const dom = selector.attr.toLocaleLowerCase()==='html'?$(data).find(selector.query).text():
                $(data).find(selector.query).attr(selector.attr);
            if(dom){
                this.s++;
               this.ok(url, span, $.trim(dom));
            }else {
                this.e++;
                this.notFind(url,data);
            }
        }else {
            this.ok(url,span);
        }
    }
}