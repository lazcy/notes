#### 过滤唯一值

`set`对象类型，配合展开操作`...`一起，我们可以用它来创建一个新的数组，改数组只有唯一的值

#### 与或运算

判断数组长度

```javascript
return (foo || []).length
```

#### 性能更好的运算

幂运算

```javascript
// 2的3次方  2*2*2
Math.pow(2,3);
2**n;
2 << (n-1);

```

#### 浮点数转整数

```javascript
console.log(23.9 | 0); // 23
console.log(-23.9 | 0); // 23
```

#### 类的自动绑定

```

this.myMethod = this.myMethod.bind(this)


```

