# [简单易用的Layout弹出框][homepage]

## [BUG反馈及宝贵建议][issues]
Github Issues: <https://github.com/chengf28/DBlite/issues>

## 开始 Start
1. 在html中引入 js 文件
```html
...
<script src="./src/layout.js"></script>
...
```
2. 开始使用

```js
button.onclick = function()
{
    // 即可使用
    layout.alert('这是消息');
}
```
## 更多设置
事实上 alert方法接收3个参数,除了默认信息外,还有配置以及按钮触发的回调函数

e.g.
```js
layout.alert('这是一个消息',{btn:['确认','取消']},function(){
    // 执行回调函数
});
```
或者不添加任何配置
```js
layout.alert('这是一个消息',function(){

});

```
## 相关配置

key|value
--|--|
background|与css设置相同
color|与css设置相同
btn|为数组形式,内容为对应按钮的字体,与按钮所触发的回调函数顺序一直['确认','取消]
title|标题名字

## 开始你的coding吧


[homepage]: https://github.com/chengf28/dblite
[issues]: https://github.com/chengf28/layout/issues