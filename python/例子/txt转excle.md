#### txt转excle

xlwt :  pip install xlwt

```python
# -*-coding:utf-8 -*-
# txt转excle

from collections import OrderedDict

import xlwt, json

# 设置读取格式，写入中文时就不会乱码
with open('C:\\Users\\lazcy\\Desktop\\student.txt', 'r', encoding='utf-8') as f:
  data = json.load(f, object_pairs_hook=OrderedDict)
  workbook = xlwt.Workbook()
  sheet1 = workbook.add_sheet('student', cell_overwrite_ok=True)
  for index,(key, values) in enumerate(data.items()):
    sheet1.write(index, 0, key)
    for i, value in enumerate(values):
      print(value)
      sheet1.write(index, i+1, value)
  
  workbook.save('student.xls')
```

