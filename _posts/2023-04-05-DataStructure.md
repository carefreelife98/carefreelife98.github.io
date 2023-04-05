---
title: "Data Structure : Introduction"
categories:
  - INU/Data_Structure/자료구조
tags:
  - Data Structure
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
---
## 자료구조(Data Structure)란?
```
자료구조(Data Structure)의 정의 
```
<img src="/assets/images/INU/datastructure.png" alt="datastructure_Procdess" width="100%" min-width="200px" itemprop="image">`사진출처: 인프런` [Inflearn](https://www.inflearn.com/course/c%EB%A1%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EB%B0%8F-%EC%97%AC%EB%9F%AC%EA%B0%80%EC%A7%80-%EC%98%88%EC%A0%9C-%EC%8B%A4%EC%8A%B5)<br><br><br>
> "컴퓨터과학에서 <span style="color:red">`데이터를 구조적으로 표현하는 방식`</span> 과 <span style="color:red">`이를 구현하는 데 필요한 알고리즘`</span>"<br>
- 컴퓨터의 메모리는 1차원 구조<a href="https://carefreelife98.github.io/inu/data_structure/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0/DataStructure/#task-lists" class="btn">[1]</a> 이기 때문에 현실 세계의 다차원 데이터를 다루기 위해서는 이것을 1차원인 선 형태로 바꾸는 것이 필요하다.<br>
- 위와 같은 기초 알고리즘에는 2차원 배열 및 이진 트리, 그래프 등의 자료구조가 있다.<br>
- <span style="color:blue">`List, Stack, Queue, Circular Queues, Heap tree, Graph`</span> 정도의<br>대표적인 7가지 개념을 주축으로 포스팅 해보겠다.<br>

## 자료형(Data Type)이란?
```
자료형(Data Type)이란?
```
> 용어 그대로 <span style="color:green">`"자료(Data)의 종류"`</span> 이다. 한번쯤 코딩을 해보았다면 알 수 있을 것이다.<br>
바로 <span style="color:green">`int(정수), double(실수), char(문자), str(문자열)`</span> 등등 프로그래밍 언어별로 많은 종류가 있다.<br>
- 자료형을 사용할 때에는 실행 가능한 (executable) 연산인지 확인해야한다.
```
자료형(Data Type) 이 결정되면 그에 따라
해당 Data와 관련된 연산이 달라질 수 있기 때문이다.
```
<br>
- 복잡한 자료형을 구현할 때에는 <span style="color:blue">`데이터간의 연산이 함수(Function)로 작성된다.`</span><br>
(ex. Stack  자료형에서 새로운 값을 추가하는 연산은 add()라는 Function으로 정의된다.)<br>

## 추상적자료형(Abstract Data Type)이란?
```
추상적자료형(ADT: Abstract Data Type)이란?
```
> <span style="color:red">`자료 자체의 형태와 그 자료에 관계된 연산들을 추상적, 수학적으로만 정의한 것.`</span><br>
```
여기서 추상화(Abstraction)란?
```
>> 
- 어떤 시스템의 간략화 된 기술 또는 명세로서,
<br><span style="color:green">`System의 가장 핵심적인 구조나 동작에만 집중하는 것.`</span> <br> 
- 객체 지향 언어의 대표격인 Java를 학습해본 개발자라면 무슨 느낌인지 알 것이다.<br><span style="color:green">`Java의 class 개념과 일맥상통이라 볼 수 있다고 한다.`</span>
>
> - `추상적자료형(ADT)`은 데이터나 연산이 <span style="color:blue">`무엇(what)`</span>인지는 정의되지만,<br>
<span style="color:red">`어떻게(how)`</span>컴퓨터 상에서 구현할 것인지는 정의되지 않는다.<br>
- EX. 자연수를 나타내는 추상적 자료형 중 Nat_Number 이 있다. Nat_Number의 연산 중 하나인 add() 는 <span style="color:green">`Nat_Number add(x,y)`</span>의 형태로 사용할 수 있다.

```
Nat_Number add(x,y)
- 연산의 이름 : add
- 매개변수 : x, y
- 반환형 : Nat_Number

와 같이 연산이 무엇인지(what) 정의할 수 있다. 
하지만 어떻게(how) + 연산을 구현하는지에 대한 구체적인 코드는 주어지지 않는다.
이것이 추상적자료형(ADT)이다. 
```

## Data Structure Categories
>```
1. 혼합 자료구조 (Composite Data Structure) 
- 배열 (Array)
```
```
2. 선형 자료구조 (Linear Data Structure) -
- 배열 (Array)
---> 가변 길이 배열 (STL의 Vector)
- 리스트
---> 연결 리스트 (Linked List)
```
```
3. 추상적 자료구조 (Abstract Data Structure) -
- 리스트
---> 연결 리스트 (Linked List)
- 스택 (Stack)
- 큐 (Queue)
---> 환형 큐 (Circular Queues)
- 트리 (Tree)
---> 트라이 (Trie)
- 그래프 (Graph)
```
```
4. 딕셔너리 자료구조 (Dictionaries) -
- 연관 배열 - Map (Associative array)
- 연관 리스트
- 해시 테이블
```

<br><br><br>
[처음으로~](#){: .btn .btn--primary }



`참고: 나무위키` [Data_Structure](https://namu.wiki/w/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)<br>
<span style="color:grey">`참고: C언어로 쉽게 풀어쓴 자료구조 <개정 3판> 천인국, 공용해, 하상국 지음`</span><br><br><br>





### Task Lists
> 
`[1] 하드웨어의 구조는 2차원 이지만, CPU가 인지하는 것에 있어 논리적 메모리 공간은 1차원임.`
- [x] 자료구조(Data Structure)란?
- [x] 자료형(Data Type)이란?
- [x] 추상적자료형(Abstract Data Type)이란?
