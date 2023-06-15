---
title: "Python : 정렬 (Sort)의 개념 및 종류: 선택 정렬 / 삽입 정렬 / 합병 정렬 / 버블 정렬 / 자연 합병 정렬"
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

# 정렬 문제의 정의

```
데이터를 특정 순서에 따라 나열하는 문제
- [3, 5, 2, 4] -> [2, 3, 4, 5]

전통적으로 컴퓨터 공학에서 많이 다루어지는 중요한 문제.
- 정렬되어 있다는 특성 자체로 효율적인 데이터의 처리를 할 수 있게 된다.
- 여러 정렬 방법 / 알고리즘이 존재하며, 각각의 해결 방법마다 시간 및 공간적 특성이 다르다.
  -> 알고리즘 분석을 연습하기에 용이하다.
```

<br><br>

# 정렬 알고리즘 1. 선택 정렬 (Selection Sort)

> - 리스트에서 가장 작은 원소를 선택하여 새로운 리스트에 추가하는 방식
>   - 리스트의 모든 원소가 선택 될 때까지 반복.
> 
> ```python
> // pseudo code
> 
> def selection_sort(s):
>   while s != [], // 반복 조건 : list 가 공백 상태가 될 때까지
>     smallest ← min(s), s에서 min(s)를 제거한다.
>     return [smallest]+selection_sort(s) //smallest와 s를 차례로 나란히 붙여 반환.
>   if s == [], // 종료 조건 : 리스트가 공백이 되면 정렬할 필요가 없으므로 [] 반환
> ```

```python
def selection_sort(l):
    while l != []:
        smallest = min(l)
        l.remove(smallest)
        return [smallest] + selection_sort(l)
    if l == []:
        return []

if __name__ == '__main__':
    print(selection_sort([1, 5, 6, 7, 3, 5, 6, 4]))
```

> <img src="/assets/images/INU/python/13_SelectionSort.png" alt="13_SelectionSort_Procdess" width="70%" min-width="200px" itemprop="image"><br>`선택 정렬(Selection Sort)의 실행 결과`<br><br>
>
> **선택 정렬의 구현 및 동작 과정**
> <img src="/assets/images/INU/python/13_SelectionSort_Process.png" alt="13_SelectionSort_Process_Procdess" width="100%" min-width="200px" itemprop="image"><br>`선택 정렬(Selection Sort)의 동작 과정`<br><br>
>
> **꼬리 재귀 함수로의 변형**
> 
<br><br>

# 정렬 알고리즘 2. 










[//]: # (<img src="/assets/images/INU/python/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br><br><img src="/assets/images/INU/python/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br><br>)
    
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