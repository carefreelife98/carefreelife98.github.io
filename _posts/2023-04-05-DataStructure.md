---
title: "Data Structure : "
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
> "컴퓨터과학에서 <span style="color:red">`데이터를 구조적으로 표현하는 방식`</span> 과 <span style="color:red">`이를 구현하는 데 필요한 알고리즘`</span>"<br>
- 컴퓨터의 메모리는 1차원 구조(1) 이기 때문에 현실 세계의 다차원 데이터를 다루기 위해서는 이것을 1차원인 선 형태로 바꾸는 것이 필요하다.<br>
- 위와 같은 기초 알고리즘에는 2차원 배열 및 이진 트리, 그래프 등의 자료구조가 있다.<br>
- <span style="color:blue">`List, Stack, Queue, Circular Queues, Heap tree, Graph`</span> 정도의 대표적인 7가지 개념을 주축으로 포스팅 해보겠다.<br>

## 자료형(Data Type)이란?
```
자료형(Data Type)이란?
```
> 용어 그대로 "자료(Data)의 종류" 이다. 코딩을 한번쯤 해보았다면 알 수 있을 것이다. 바로 int(정수), double(실수), char(문자), str(문자열) 등등 프로그래밍 언어별로 많은 종류가 있다.<br>
- 자료형을 사용할 때에는 실행 가능한 (executable) 연산인지 확인해야한다.
```
자료형(Data Type) 이 결정되면 그에 따라
해당 Data와 관련된 연산이 달라질 수 있기 때문이다.
```
<br>
- 복잡한 자료형을 구현할 때에는 데이터간의 연산이 함수(Function)로 작성된다. (ex. Stack  자료형에서 새로운 값을 추가하는 연산은 add()라는 Function으로 정의된다.)<br>

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
- 객체 지향 언어의 대표격인 Java를 학습해본 개발자라면 무슨 느낌인지 알 것이다. <span style="color:green">`Java의 class 개념과 일맥상통이라 볼 수 있다고 한다.`</span>
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














### Task Lists
> 
`(1) 하드웨어의 구조는 2차원 이지만, CPU가 인지하는 것에 있어 논리적 메모리 공간은 1차원 이다.`
- [x] EDF Scheduling 예시
- [x] Rate Monotonic Scheduling / EDF Scheduling 비교 시뮬레이션
- [x] Rate Monotonic Scheduling / EDF Scheduling 비교 시뮬레이션 결과
