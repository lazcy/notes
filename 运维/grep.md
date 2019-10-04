##### grep

1. 查找字符mooc

   ```
   grep 'mooc'
   ```

   

2. 单字符（特定字符，范围内字符，任意字符组合）

   ```
   # 特定字符
   grep '1' 文件名
   
   # 范围内字符
   grep [0-9] 
   grep [259] 
   grep [A-Z] 
   grep [a-z] 
   grep [A-Za-z] 
   grep [,/:] 
   
   # 取反
   grep [^0-9]
   
   # 任意字符
   grep '.'
   grep '[.]'  //小数点
   grep '\.'   // 取反后表示本身含义
   ```

   

3. 其他字符

   边界字符：头尾字符

   ^:^root    表示头字母

   $: false$  表示false结尾

   ^$  表示空行

   ```
   grep '^root'
   grep 'false$'
   grep '^$'
   ```

   元字符：代表普通字符或特殊字符

   \w : 匹配任何字类字符，包括[A-Za-z0-9_]

   \W : 匹配非任何子类字符。取反[A-Za-z0-9_]

   \b : 代表单词分隔  \bx\b

   ```
   grep '\w'
   grep '\W'
   grep '\bx\b'
   ```

   

4. 字符组合

   字符串 'm..c' 

   重复

   *：零次或多次   

   +：一次或多次    `'se\+'`

   ？：零次或一次   `'se\?'`

   ```bash
   # 匹配s se seee seese
   grep 'se*'
   # 匹配 se seee sesesee
   grep 'se\+'
   # 匹配s se
   grep 'se\?'
   # 匹配
   grep '\(se\)*'  
   ```

   重复特定次数：{n,m}

   *：{0,}

   +：{1,}

   ?：{0,1}

   ```
   grep '[0-9]\{2,3\}'
   ```

   任意字符表示：m.*c（m和c中间任意长度），m..c（两个.表示两个位置）

   ```
   grep '\bm.*c\b'
   grep '\bm[a-z]*c\b'
   ```

   逻辑表示

   ```bash
   # |: '/bin\(false\|true\)'
   ```

   

5. 案例

   ```bash
   # qq号
   grep '^[0-9]\{4,10\}$'
   # 匹配15位或18位身份证号（支持X）
   grep '^[1-9]\([0-9]\{13\}|[0-9]\{16\}\)[0-9xX]$'
   # 密码
   grep '^\w\+$'
   ```

   ![1570097787245](D:\markdown\notes\img\1570097787245.png)