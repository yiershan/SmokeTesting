# SmokeTesting
自动冒烟测试脚本。嵌入web站点使用.
## 前言
最近被测试搞疯了，每次发版后帮忙冒个烟都要手动的点页面无数次。机械的操作实是无法忍受。
于是打算写一个脚本，嵌入页面后更具配置自动冒烟。输出结果。
原先打算写一个爬虫来实现，由于等于验证等实在不好处理，后来想想写写脚本来完成。
结果不到百行代码轻松搞定。
剩下工作就是写配置文件了。

## 使用

```
   $(function () {
        var _config = {
            url:[{
                name: '首页',
                url:'index.html',
                selector:{
                    query:'a',
                    attr:'href'
                }
            },{
                url:'index.html',
                selector:{
                    query:'.footer span',
                    attr:'html'
                }
            }]
        };
        SmokeTest.Init(_config);
        SmokeTest.Start();
    })
```