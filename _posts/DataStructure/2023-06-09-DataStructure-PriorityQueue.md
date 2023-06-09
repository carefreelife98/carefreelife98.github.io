---
title: "[Data Structure]<br>우선순위 큐(Priority Queue)
categories:
  - INU-DataStructure
  - C
tags:
  - DataStructure
  - Tree
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 

# 우선순위 큐(Priority Queue) 의 소개

```
우선 순위 큐(Priority Queue) : 우선 순위를 가진 항목들을 저장하는 큐

FIFO(First-In-First-Out) : 선입선출 순서가 아닌 
우선 순위(Priority)가 높은 데이터가 먼저 나가게 된다.
```

> <img src="/assets/images/INU/datastructure/PriorityQueue_etc.png" alt="PriorityQueue_etc_Procdess" width="100%" min-width="200px" itemprop="image"><br>`스택, 큐, 우선순위 큐`<br><br>
>
> 사실 **가장 일반적인 큐는 우선순위 큐**이다.<br>
> - 스택이나 큐도 우선순위 큐를 사용하여 구현이 가능하기 때문.
> - 배열, 연결리스트 등 여러 형태로 구현이 가능하나 가장 효율적인 구조는 히프(heap)이다.

<br><br>

# 우선순위 큐 ADT

```c
// 객체 : element 형의 우선 순위를 n개 가진 요소들의 모임

// 연산
create() // 우선 순위 큐를 생성

init(q) // 우선 순위 큐 q를 초기화

is_empty(q) // 우선 순위 큐 q가 비어있는지를 검사

is_full(q) // 우선 순위 큐 q가 포화 상태인지 검사

insert(q, x) // 우선 순위 큐 q에 요소 x를 추가

delete(q) // 우선 순위 큐로부터 가장 우선 순위가 높은 요소를 삭제하고 해당 요소를 반환

find(q) // 우선 순위가 가장 높은 요소를 반환
```

> 우선 순위 큐는 0개 이상의 요소 모임이며 각 요소들은 우선 순위 값을 가지고 있다.<br>
> 가장 중요한 연산
> 1. insert() : 요소의 삽입
> 2. delete() : 요소의 삭제<br>
>   - 최소 우선 순위 큐: 가장 우선순위가 낮은 요소를 삭제.
>   - 최대 우선 순위 큐: 가장 우선순위가 높은 요소를 삭제.

<br><br>

# 우선 순위 큐의 구현







> <img src="/assets/images/INU/datastructure/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>`쉘`<br><br>

<!-- > <img src="/assets/images/Spring/SpringMVC/springmvcstruct.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>
`참고:`[Inflearn - 김영한님_강의](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)<br><br>


`사진출처:`[]()
<span style="color:green">``</span>

```

```
> 
{: .notice--danger}
{: style="text-align: center;"}


<details>
<summary><span style="color:blue">(클릭)</span></summary>
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

<span style="color:grey">`참고: C언어로 쉽게 풀어쓴 자료구조 <개정 3판> 천인국, 공용해, 하상국 지음`</span><br><br><br>

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