##### 放大缩小如心脏跳动

```
@keyframes gif {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    50% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
  }
  
  
  animation: gif 1s infinite linear;
  
```

##### 上下浮动

```
@keyframes heart{
  from{transform:translate(0,0)}
  to{transform:translate(0,6px)}
  }
  
   animation: heart 0.5s ease-in-out 0.8s infinite alternate;
  -webkit-animation: heart 0.5s ease-in-out 0.8s infinite alternate;
```



