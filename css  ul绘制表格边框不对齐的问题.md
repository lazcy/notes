html代码
```
<ul>
  <li>
    <div>时间</div>
    <div>开奖号码</div>
    <div>冠亚和</div>
    <div>1-5</div>
  </li>
  <li>
    <div>时间</div>
    <div>开奖号码</div>
    <div>冠亚和</div>
    <div>1-5</div>
  </li>
  <li>
    <div>时间</div>
    <div>开奖号码</div>
    <div>冠亚和</div>
    <div>1-5</div>
  </li>
 </ul>
```
 
 样式
 ```
 .my-table{
      border: 1px solid #e6e6e6;
      border-bottom: 0;
      box-sizing: content-box;
      & > li{
        display: flex;
        align-items: center;
        &:first-child{
          background: #f2f2f2;
        }
        & > div{
          flex: 1;
          text-align: center;
          line-height: 38px;
          height: 38px;
          border-right: 1px solid #e6e6e6;
          border-bottom: 1px solid #e6e6e6;
          box-sizing: content-box;
          padding-top: 5px;
          margin-left: -1px; // 抵消右边边框的宽度
          &:last-child{
            border-right: 0;
            margin-left: 0px; // 最后一个不绘制边框，不用抵消
          }
          & > span{
            vertical-align: middle;
          }
        }

      }
     }
 ```
