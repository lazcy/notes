##### typescript

typescript只在编译阶段对类型进行静态检查。编译生成的js文件与普通的js文件是一样的，并不会进行类型校验。

##### 基础类型

| 类型             | 例子                                                         |
| ---------------- | ------------------------------------------------------------ |
| Boolean          | let isDone: boolean = false                                  |
| Number           | let count: number = 10                                       |
| String           | let s: string = 'bilibili'                                   |
| Symbol           | const sym = Symbol();<br />let obj = { [sym]: "bilibili"};   |
| Array            | let list: number[] = [1,2,3];<br />let list: Array<number> = [11,12]; //泛型语法 |
| Enum（枚举）     |                                                              |
| Any              | 类型系统的逃逸仓，可以对any类型的值执行任何操作              |
| Unknown          | unkown类型的值只能被赋值给同样unknown类型的和any类型的       |
| Tuple            | let tupleType: [string, boolean];<br />tupleType = ['bilibli', true] |
| Void             | 没有任何类型<br />function warnUser(): void{<br /> console.log("this is my warning message")<br />} |
| Null和Undefined  |                                                              |
| object,Oject和{} |                                                              |
| Never            |                                                              |

