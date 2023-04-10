---
title: "Data Structure (2) : 순환(Recursion)"
categories:
  - INU-DataStructure
tags:
  - Data Structure
  - Recursion
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
---
# Data Structure --- 순환 (Recursion)

```
Data Structure : 순환(Recursion) 이란?
```
<img src="/assets/images/INU/recursion.png" alt="recursion_Procdess" width="100%" min-width="200px" itemprop="image">`사진출처:`[datatrained](https://www.datatrained.com/post/recursion-in-data-structure/)<br>

> **<span style="color:red">"순환이란, 어떤 알고리즘이나 함수가 자기 자신을 호출하여 문제를 해결하는 프로그래밍 기법이다."</span>**<br>
📣 순환은 본질적으로 순환적인 문제나, 그러한 자료구조를 다루는 프로그램에 적합하다. 📣
{: .notice--warning}
{: style="text-align: center;"}

## 순환의 예
```
순환(Recursion)의 예
```
> <img src="/assets/images/INU/recursionex.png" alt="recursionex_Procdess" width="100%" min-width="200px" itemprop="image">`순환적인 문제의 예`<br>

## **팩토리얼 프로그래밍(Factorial Programming)**<br>
>
```
팩토리얼 프로그래밍을 해보자.
```
<img src="/assets/images/INU/factorial.png" alt="factorial_Procdess" width="100%" min-width="200px" itemprop="image">`factorial의 정의`<br><br>
- 위 사진을 보면 <span style="color:green">`Factorial n! 을 정의하는 과정에서 다시 Factorial (n-1)! 이 사용되었다.`</span><br>
이것에 유의하여 아래 코드를 보도록 하자.<br>
- 우선 팩토리얼 프로그램의 알고리즘은 아래와 같다.<br><br>
```
팩토리얼 프로그래밍 #1: 
(n-1)! 팩토리얼을 구하는 서브 함수 factorial_n_1를 따로 제작
(n-2)! 팩토리얼을 구하는 서브 함수 factorial_n_2를 따로 제작
.
.
.
(반복)
```
```c
int factorial(int n) // 우리는 매개변수로 n을 받아 n!을 출력하는 프로그램을 만들었다.
{
  if( n<= 1 ) return(1);
  else return (n * factorial_n_1(n-1) ); // 팩토리얼의 정의.
}
// 그렇다면 매개변수인 n 만 n-1 로 바꾸어 주면 (n-1)! 을 구할 수 있을 것이다!
```
<br><br>
```
팩토리얼 프로그래밍 #2: 
(n-1)! 팩토리얼을 현재 #1 에서 작성중인 함수를 다시 호출하여 계산 (순환 호출)
```
```c
int factorial(int n) 
{
    if( n <= 1 ) return(1);
    else return (n * factorial(n-1) ); //#1 에서 작성한 
                                      //factorial(int n) 함수를 재사용 했다.
}
```

## **Factorial 함수의 호출 순서**
> <img src="/assets/images/INU/factorialfunc.png" alt="factorialfunc_Procdess" width="100%" min-width="200px" itemprop="image">`factorial 함수의 호출 순서`<br><br>







[처음으로~](#){: .btn .btn--primary }



`참고: 나무위키` [Data_Structure](https://namu.wiki/w/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)<br>
<span style="color:grey">`참고: C언어로 쉽게 풀어쓴 자료구조 <개정 3판> 천인국, 공용해, 하상국 지음`</span><br><br><br>


### Task Lists
> 
`[1] 하드웨어의 구조는 2차원 이지만, CPU가 인지하는 것에 있어 논리적 메모리 공간은 1차원임.`
- [x] 자료구조(Data Structure)란?
- [x] 자료형(Data Type)이란?
- [x] 추상적자료형(Abstract Data Type)이란?