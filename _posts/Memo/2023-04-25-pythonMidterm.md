---
title: "파이썬 중간고사 대비"
categories:
  - Memo
tags:
  - Memo
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
---
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 

중간고사 대비 개인 포스트입니다.
({: .notice--success})
{: style="text-align: center;"}

1. Python에서 제공하는 순서열 - 리스트(수정가능) / 튜플(수정불가) / 정수범위(range, 수정불가) / 문자열(수정불가)
2. 리스트에서 음수 인덱스는 (리스트의 총 길이 -(음수의 절대값)) 으로 접근가능. == 인덱스 번호
3. 리스트에서 슬라이싱은 범위내 모든 데이터에 접근이 가능하다. 형식: list[start:end:interval] , list[::-1] 은 리스트의 순서를 뒤집는다.
4. <img src="/assets/images/INU/python/midtermmemo.png" alt="midtermmemo_Procdess" width="100%" min-width="200px" itemprop="image"><br>`midtermMemo'<br><br>
5. a = list(range(1,11)) 하여 순차적 값을 가진 리스트로 초기화 가능 --> a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
6. len() = 리스트나 문자열의 길이를 반환
7. 에라토스 테네스의 체<br>

```python
    
def isPrime(v):
    i = 2

    while i*i <= v:
        if v%i == 0:
            return False
        i += 1
    return True


try:
    N = input('2 이상의 자연수 입력: ')
    N = int(N)
    if N >= 2:
        a = list(range(N+1))   #[0, 1, ....., N]
        a[1] = 0

        i = 2

        while i*i <= N:
            if a[i] != 0 and isPrime(i):
                for j in range(i*2, N+1, i):
                    a[j] = 0
            i += 1

        for e in a:
            if e > 0: # if valid
                print(e, end=' ')
    else:
        print(N, '은(는) 2 이상의 자연수가 아닙니다.')

except:
    print(N, '은(는) 2 이상의 자연수가 아닙니다.')
```

<br><br>

palin<br>

```python
def isPalindromWithoutSpace(s):
    s = s.lower()
    mid_index = int(len(s)/2)
    
    for i in range(mid_index):
        if s[i] != s[-i-1]:
            return False

    return True
```









    
<!-- > <img src="/assets/images/INU/python/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br><br>
`사진출처:`[]()
<span style="color:green">``</span>

```

```
> 
{: .notice--danger}
{: style="text-align: center;"}


<details>
<summary><h1><span style="color:blue">(클릭)</span></h1></summary>
<div markdown="1">       

</div>
</details> -->


<br><br>

[//]: # (최대한의 설명을 코드 블럭 내의 주석으로 달아 놓았습니다.<br><br>)

[//]: # (혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>)

[//]: # (긴 글 읽어주셔서 감사합니다. 포스팅을 마칩니다.<br>)

[//]: # ({: .notice--success})

[//]: # ({: style="text-align: center;"})

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