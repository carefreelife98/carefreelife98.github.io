---
title: "Java : 연산(1)"
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

## 식과 연산자

- 연산 : 주어진 식을 계산하여 결과를 얻어내는 과정
>
<img src="/assets/images/INU/java/calc.png" alt="calc_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Java의 연산`<br><br>

<br><br>

## 연산자 우선순위

- 같은 우선 순위의 연산자
  - 왼쪽에서 오른쪽으로 처리
  - 예외) 오른쪽에서 왼쪽으로
    - 대입 연산자 (=), --, ++, +, - (양수 음수 부호), ~, !, 형 변환은 오른쪽에서 왼쪽으로 처리한다.
- 괄호는 최우선순위 연산자.
  - 괄호가 다시 괄호를 포함한 경우는 가장 안쪽의 괄호부터 먼저 처리

<br><br>

## 산술 연산자

- 더하기(+), 빼기(-), 곱하기(*), 나누기(/), 나머지(%)
- /와 %의 응용
  - 10의 자리와 1의 자리 분리
    ```java
    69/10 // = 6 (몫)
    69%10 // = 9 (나머지 9)
    ```
  - n이 홀수인지 판단
    ```java
    int r = n % 2;  //  r이 1이면 n은 홀수, 0이면 짝수.
    ```

<br><br>

## / 와 % 산술 연산 예제

```java
import java.util.Scanner;

public class ArithmeticOperator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("정수를 입력하세요: "); 
        int time = scanner.nextInt(); // 정수 입력
        int second = time % 60; // 60으로 나눈 나머지는 초
        int minute = (time / 60) % 60; // 60으로 나눈 몫을 다시 60으로 나눈 나머지는 분
        int hour = (time / 60) / 60; // 60으로 나눈 몫을 다시 60으로 나눈 몫은 시간
        
        System.out.print(time + "초는 "); 
        System.out.print(hour + "시간, "); 
        System.out.print(minute + "분, "); 
        System.out.println(second + "초입니다.");
        
        scanner.close();
    } 
}
```

<br><br>

## 증감 연산

  - 1 증가 혹은 감소 시키는 연산
    - ++, --
    >
    <img src="/assets/images/INU/java/addcal.png" alt="addcal_Procdess" width="100%" min-width="200px" itemprop="image"><br>`++, -- 연산`

<br><br>

## 대입 연산

  - 연산의 오른쪽 결과는 왼쪽 변수에 대입
  ```java
  int a = 1, b = 3
  a = b; // b 값을 a 에 대입하여 a = 3
  a += b; // a = a + b 의 연산이 이루어져, a = 6, b는 3 그대로
  ```
  >
  <img src="/assets/images/INU/java/addcal2.png" alt="addcal2_Procdess" width="100%" min-width="200px" itemprop="image"><br>`주요 대입 연산자`

<br><br>

## 대입 연산자와 증감 연산자의 사용 예제

- 다음 코드의 실행 결과는 무엇인가?
```java
public class AssignmentIncDecOperator { 
    public static void main(String[] args) {
    
    int a=3, b=3, c=3; 
    
    // 대입 연산자 사례
    a += 3; // a=a+3 = 6 
    b *= 3; // b=b*3 = 9 
    c %= 2; // c=c%2 = 1
    System.out.println("a=" + a + ", b=" + b + ", c=" + c);
    
    int d=3;
    // 증감 연산자 사례
    a = d++; // a=3, d=4 
    System.out.println("a=" + a + ", d=" + d); 
    a = ++d; // d=5, a=5 
    System.out.println("a=" + a + ", d=" + d); 
    a = d--; // a=5, d=4 
    System.out.println("a=" + a + ", d=" + d); 
    a = --d; // d=3, a=3 
    System.out.println("a=" + a + ", d=" + d);
    } 
}
//실행 결과
//a=6, b=9, c=1 
//a=3, d=4
//a=5, d=5
//a=5, d=4
//a=3, d=3
```










    
<!-- > <img src="/assets/images/INU/java/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>`` `사진출처:`[]()<br><br>
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

최대한의 설명을 코드 블럭 내의 주석으로 달아 놓았습니다.<br><br>
혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>
긴 글 읽어주셔서 감사합니다. 포스팅을 마칩니다.<br>
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }



### Task Lists
> 
- [x] 식과 연산자
- [x] 연산자 우선순위
- [x] 산술 연산자
- [x] / 와 % 산술 연산 예제
- [x] 증감 연산
- [x] 대입 연산
- [x] 대입 연산자와 증감 연산자의 사용 예제
