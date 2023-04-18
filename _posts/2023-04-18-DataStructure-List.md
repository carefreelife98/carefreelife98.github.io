---
title: "Data Structure : (7) 리스트 (List)"
categories:
  - INU-DataStructure
  - C
tags:
  - Data Structure
  - List
  - Array List
  - Linked List
  - C/C++
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
---
# Data Structure: List 란?

```
Data Structure : 리스트의 소개
```
<img src="/assets/images/INU/list.png" alt="list_Procdess" width="100%" min-width="200px" itemprop="image">`사진출처:`[jimmyglenos](https://jimmyglenos.com/2021/01/19/make-your-to-do-list-a-ta-da-list/)<br>

> <span style="color:green">"리스트"라고 하면 어떤 것이 가장 먼저 떠오르는가? 버켓리스트? 회원 및 상품 리스트?</span><br><br>
어떤 것을 떠올리더라도 대부분은 리스트라 함에 틀렸다고 할 수 없을 것이다. 방금 당신이 떠올린 그것이 바로 리스트이다.<br>
```
리스트(List)란, 우리들이 자료(data)를 정리하는 방법중에 하나이다.
```
<br>
리스트에는 항목(자료)들이 "차례대로" 정리되어있다. 리스트를 구성하고 있는 항목들은 순서 or 위치 를 가진다.<br>
📣 <span style="color:red">각 항목간에 순서가 없는 집합은 리스트가 아니다!!</span> 📣 
{: .notice--primary}
{: style="text-align: center;"}
<br>
<img src="/assets/images/INU/listdef.png" alt="listdef_Procdess" width="100%" min-width="200px" itemprop="image">`기호로 표현된 리스트`<br>
- 지금까지 소개한 리스트로는 어떤 연산을 할 수 있을까?
  - 삽입연산(insert): 리스트에 새로운 항목을 추가한다.
  - 삭제연산(delete): 리스트에서 항목을 삭제한다.
  - 탐색연산(seek): 리스트에서 특정한 항목을 찾는다.
<br><br>

## 리스트 ADT

```
리스트 ADT(Abstract Data Type) - 추상 데이터 타입
```
<br>
> 다음은 리스트를 추상데이터 타입으로 정의한 것이다.<br><br>
<img src="/assets/images/INU/ADT.png" alt="ADT_Procdess" width="100%" min-width="200px" itemprop="image">`ADT로 정의된 리스트.`<br><br>

## 리스트의 구현

```
리스트의 구현
```

> 리스트ADT는 배열과 연결리스트를 이용하여 구현이 가능하다.<br>
- **<span style="color:red">배열</span>**을 이용할 시 구현 과정이 매우 간단해지지만, 크기가 고정(static)된다.<br><br>
- 포인터(~~으윽..~~)를 이용하여 **<span style="color:blue">연결리스트</span>**를 만들어 구현하는 방법은 상대적으로 더 복잡하지만,<br>
malloc 과 포인터의 조합으로 **동적으로 크기를 조정**할 수 있을 뿐 아니라<br>
***<span style="color:green">`책장처럼 원하는 위치에서 자료를 삽입, 삭제, 탐색 할 수 있다.`</span>***<br><br>
<img src="/assets/images/INU/ARRvsList.png" alt="ARRvsList_Procdess" width="100%" min-width="200px" itemprop="image">`배열과 리스트의 모습.` `사진출처:`[open4tech](https://open4tech.com/array-vs-linked-list-vs-hash-table/)<br><br>

🔥배열을 이용한 ArrayList는 일반 배열과 크게 다를 것이 없으니 패스하도록 하겠다.🔥
{: .notice--info}
{: style="text-align: center;"}

## 연결리스트 (Linked List)
```
연결리스트(Linked List)?
```

> <img src="/assets/images/INU/linkedlist.png" alt="linkedlist_Procdess" width="100%" min-width="200px" itemprop="image">`Linked-List의 모습` `사진출처:`[isaaccomputerscience](https://isaaccomputerscience.org/concepts/dsa_datastruct_linked_list)<br><br>
- 추상적 자료형인 `리스트를 구현한 자료구조`.<br>
- Linked List라는 말 그대로 어떤 데이터 덩어리(이하 노드Node)를 저장할 때 그 `다음 순서의 자료가 있는 위치를 데이터에 포함`시키는 방식으로 자료를 저장한다.<br>
```
예를 들어 한 반에 있는 학생들의 자료를 저장한다면, 학생 하나하나의 신상명세 자료를 노드로 만들고,
1번 학생의 신상명세 자료에 2번 학생 신상명세가 어디있는지 표시를 해 놓는 방식이다. 
쉽게 생각하면 자료를 비엔나 소시지마냥 줄줄이 엮어놓은 것이다.
```

## 연결리스트의 구현 with C
```
C 언어를 활용하여 연결리스트를 생성하고, 알고리즘에 따라 제거해보자.
```

> 군 제대 복학 후 4년만에 자료구조 전공 강의에서 마주친 C언어.. 있지도 않은 기억을 되짚어가며 구글링, TA님, 전공 책 등의 도움으로 간신히 구현에 성공했다.. ~~중간에 꺾일 뻔 했다 진심으로...;;~~ <br>
***<span style="color:blue">`지금부터 그 극악무도한 과정을 함께 살펴보자`</span>***


곧 공개 될 예정입니다~!
{: .notice--info}
{: style="text-align: center;"}







[처음으로~](#){: .btn .btn--primary }



`참고: 나무위키` [Data_Structure](https://namu.wiki/w/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)<br>
<span style="color:grey">`참고: C언어로 쉽게 풀어쓴 자료구조 <개정 3판> 천인국, 공용해, 하상국 지음`</span><br><br><br>


### Task Lists
> 
`[1] 하드웨어의 구조는 2차원 이지만, CPU가 인지하는 것에 있어 논리적 메모리 공간은 1차원임.`
- [x] 자료구조(Data Structure)란?
- [x] 자료형(Data Type)이란?
- [x] 추상적자료형(Abstract Data Type)이란?