---
title: "Python : 파일 입출력 (File I/O)"
categories:
  - Python
tags:
  - Python
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 파일 입출력 (File I/O)

```
표준 입출력 :
  - 현재 사용자 화면으로부터 입력을 받고, 사용자 화면으로 결과를 출력하는 것

파일 입출력 : 파일 Open 후 반환된 File 객체 (핸들러) 의 내장 메소드를 활용해서 입출력을 수행.
  - 입력 : 파일로부터 값을 읽어 들인다.
  - 출력 : 파일에 값을 써서 반환한다.
```

> **Type 1 : fileObj.close() 를 사용하여 종료해야 한다**
```python
fileObj = open('파일명', '모드')
[작업 수행]
fileObj.close()
```

<br>

> **Type 2 : fileObj.close() 가 필요없다.**
```python
with open('파일명', '모드') as fileObj:
[작업 수행]
```

<br><br>

# 파일 입출력 모드 & 내장 메소드

> - 파일 입출력 모드<br>
> <img src="/assets/images/INU/python/12_FileMode.png" alt="12_FileMode_Procdess" width="100%" min-width="200px" itemprop="image"><br>`파일 입출력 모드`<br><br>
> - 내장 메소드 (입력)<br>
> ```python
> // 세가지 메소드는 줄바꿈 문자("\n")을 포함한다.
> // "\n"을 기준으로 split('\n')과 같이 나눠 제거할 수 있다. 
>
> read() : 데이터 전체를 읽어서 반환
> 
> readline() : 한 줄만 읽어서 반환
>   // 다음 호출 시에는 다음 줄을 읽음, 더 이상 읽을 것이 없으면 False 반환
> 
> readlines() : 모든 데이터를 읽어서 줄 단위로 끊어 리스트의 각 요소로 저장 후 리스트 반환
> ```

<br><br>

# 파일 데이터를 줄 (Line) 단위로 읽기

> 방법 1. readline(), readlines() 활용<br>
> ```python
> with open('input.txt', 'r') as fileObj:
>   // 첫번째 줄을 읽어들인다.
>   line = fileObj.readline()
>   
>   // line이 존재하면 루프
>   while line:
>       print(line.strip()) // 작업 수행.
>       line = fileObj.readline() // 다음 줄을 읽어들인다.
> ```
>
> 방법 2. for loop 활용<br>
> ```python
> with open('input.txt', 'r') as fileObj:
>   for line in fileObj:
>       print(line.strip())
> ```

<br><br>

# 파일 출력 관련 메소드

[‼️주의 ‼️] 반드시 "w" 모드로 파일 객체가 Open 되어 있어야 한다.
{: .notice--danger}
{: style="text-align: center;"}

> - **write(value) : value의 값을 파일에 출력**
> - **writelines(list) : list의 각 요소를 한 줄씩 파일에 출력**<br>
> ```python
> fout = open('outputFile.txt', 'w')
> for c in range(0, 51, 10):
>   f = int(c*9/5 + 32)
>   out = '섭씨 온도 : %d, 화씨 온도 : %d\n' % (c, f)
>   fout.write(out)
> fout.close()
> ```




<img src="/assets/images/INU/python/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br><br>







    
<!-- > <img src="/assets/images/INU/python/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br><br>
`사진출처:`[]()
<span style="color:green">``</span>

```

```
> 
{: .notice--danger}
{: style="text-align: center;"}


<details>
  <summary>
    <span style="color:blue">(1) 소스 코드 보기 (클릭)</span>
  </summary>
  <div markdown="1">       

  </div>
</details> -->


<br><br>

최대한의 설명을 코드 블럭 내의 주석으로 달아 놓았습니다.<br><br>
혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>
긴 글 읽어주셔서 감사합니다. 포스팅을 마칩니다.<br>
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }


### Task Lists
> 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 