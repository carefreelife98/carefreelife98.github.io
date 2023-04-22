---
title: "Data Structure : (3) 배열, 구조체 (Array & Structure)"
categories:
  - INU-DataStructure
  - C
tags:
  - Data Structure
  - Array
  - Structure
  - C/C++
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
---
# Data Structure :: 배열 (Array)

```
배열(Array) 이란?
```
> <img src="/assets/images/INU/arraydef.png" alt="recursion_Procdess" width="100%" min-width="200px" itemprop="image">`사진출처:`[laboputer](https://laboputer.github.io/ps/2017/09/05/array-and-list/)<br><br>
**<span style="color:red">`"배열이란, 동일한 타입의 데이터를 연속으로 저장할 수 있는 자료구조이다."`</span>**<br>
- 배열은 기본이 되는 중요한 자료형이며 많은 자료 구조들이 배열을 사용하여 구현된다.
- 배열은 데이터마다 다른 이름을 부여하지 않고 쉽게 사용하기 위해<br>
  각 데이터마다 인덱스(Index)를 대응시킨다.
- 인덱스(Index)는 순차적인 숫자로 표현되며, 첫번째로부터 상대적인 위치를 나타낸다.<br><br>
📣 검색 연산은 빠르지만, 추가 및 삭제 연산이 느리다. 📣
{: .notice--warning}

## 배열 ADT

```
배열 ADT 란?
```
> - ADT(Abstract Data type)
- 배열은 <인덱스, 요소> 쌍의 집합이다.
- 인덱스가 주어지면 해당되는 요소(data)가 대응되는 구조이다.

***배열 ADT의 연산:***<br>
**create(n)** ::= n개의 요소를 가진 배열의 생성.<br>
**retrieve(A, i)** ::= 배열 A의 i번째 요소 반환.<br>
**store(A, i, item)** ::= 배열 A의 i번째 위치에 item 저장.<br>
{: .notice--info}
{: style="text-align: center;"}

## 배열의 응용 : 다항식 (1)

```
C 의 배열을 사용하여 다항식을 풀어보자.
```
> <img src="/assets/images/INU/poly.png" alt="poly_Procdess" width="50%" min-width="200px" itemprop="image">`다항식의 일반적인 형태`<br>
- 위의 다항식에서, a: 계수, x:변수, n: 차수라 부른다.
- 가장 큰 차수를 **다항식의 차수**라 부른다.
- 다항식을 계산할 때, <span style="color:green">`어떤 자료구조가 가장 편리하고, 메모리를 적게 사용할 것인가?`</span>
- 이것이 우리가 자료구조를 배우는 이유이자 목적이다.
> **다항식의 계산 방법1.**<br>
<img src="/assets/images/INU/poly1.png" alt="poly1_Procdess" width="70%" min-width="200px" itemprop="image">`다항식 계산 알고리즘 1`
- 첫번째 방법은 <span style="color:blue">`모든 차수의 계수값을 배열에 저장`</span>하는 것이다.
- 위와 같이 다항식을 다시 풀어 해석해보자.
- 모든 차수에 대한 계수값의 리스트인 (10, 0, 0, 0, 6, 3) 을 배열 coef 에 저장한다.
- 여기서 다항식의 차수는 degree에 저장된다.<br>
<span style="color:green"><u>가장 높은 차수만 알면 index로 이루어져 순서를 가진 배열내에서 나머지 항들의 차수도 알 수 있다.</u></span><br>
- 아래 코드를 같이 보도록 하자.

```
다항식의 구조체 정의
```

```c
#define MAX_DEGREE 101    // 다항식의 최대차수 + 1

typedef struct {          // 구조체의 정의
	int degree;             // int형 degree
	float coef[MAX_DEGREE]; // float형 리스트 coef[]
} polynomial;             // 구조체의 이름

polynomial a = { 5, {10, 0, 0, 0, 6, 3} };
```
<br>

## 다항식 덧셈 프로그램 #1
```
polynomial : 다항식 덧셈 프로그램 #1
```

```c
#include <stdio.h>
#define MAX(a,b) (((a) > (b)) ? (a) : (b))
#define MAX_DEGREE 101    // 다항식의 최대차수 + 1

typedef struct {          // 구조체의 정의
	int degree;             // int형 degree
	float coef[MAX_DEGREE]; // float형 리스트 coef[]
} polynomial;             // 구조체의 이름

polynomial a = { 5, {10, 0, 0, 0, 6, 3} };

// C = A+B 여기서 A와 B는 다항식이다.
polynomial poly_add1(polynomial A, polynomial B) {	
	polynomial C;			
	int Apos=0, Bpos=0, Cpos=0;		// 배열 인덱스 변수

	int degree_a=A.degree; // 다항식 A의 차수

	int degree_b=B.degree; // 다항식 B의 차수

	C.degree = MAX(A.degree, B.degree);		// 결과 다항식 차수. 코드 상단에 define 되어있다. 둘중에 큰 차수가 반환 된다.

  // 다항식의 최대 차수항은 순서열로 이루어진 다항식 배열에서 가장 마지막 인덱스이기 때문에 배열 인덱스 변수가 각 다항식의 최고차항에 도달 할 때까지 while 문을 돌린다.
	while( Apos<=A.degree && Bpos<=B.degree ) {
		if( degree_a > degree_b ) {		// A항 > B항
		  C.coef[Cpos++]= A.coef[Apos++];
		  degree_a--;
		} 
    else if( degree_a == degree_b ){		// A항 == B항
		  C.coef[Cpos++]=A.coef[Apos++]+B.coef[Bpos++];
		  degree_a--; degree_b--;
		} 
    else {				// B항 > A항
		  C.coef[Cpos++]= B.coef[Bpos++];
		  degree_b--;
		}
	}
	return C;
}

// 결과를 출력하기 위한 함수
void print_poly(polynomial p){
    for (int i = p.degree; i > 0; i--){
        printf("%3.1fx^%d + ", p.coef[p.degree - i], i);
    }
    printf("%3.1f \n", p.coef[p.degree]);
}

//메인 함수
int main(void) {
	polynomial a = { 5, {3, 6, 0, 0, 0, 10} };
	polynomial b = { 4, {7, 0, 5, 0, 1} };
	polynomial c;

    print_poly(a);
    print_poly(b);
	c = poly_add1(a,b);
    printf("--------------------다항식 A + B 결과----------------------\n");
    print_poly(c);
    return 0;
}
```

```
방법 1
장점: 다항식의 각종 연산이 간단해진다.
단점: 대부분의 항의 개수가 0이면 공간의 낭비가 심해진다.
```

```
결과..!
```

<img src="/assets/images/INU/Cpoly.png" alt="Cpoly_Procdess" width="100%" min-width="200px" itemprop="image">`C 언어로 구현한 Polynomial 다항식의 덧셈 결과`

위의 방법 1은 간단하고 쉽지만, 만약 대부분의 항의 계수가 0인 다항식의 계산에서는 메모리 낭비가 심하다는 단점이 있다.<br>
(10x^100 + 6 과 같은 다항식에선 101개의 공간 중에서 오직 2개만 사용한다.)
{: .notice--warning}
{: style="text-align: center;"}


## 배열의 응용 2 : 다항식 (2)

```
메모리의 절약
```
> <img src="/assets/images/INU/poly2.png" alt="poly2_Procdess" width="80%" min-width="200px" itemprop="image"><br>**(A = 8x^3 + 7x + 1) , (B = 10x^3 + 3x^2 + 1)**<br>`하나의 배열로 여러 개의 다항식 저장`<br><br>
**<span style="color:blue">"다항식의 0이 아닌 항들을 (계수, 차수) 형태로 구조체 배열에 저징"</span>**<br>
<img src="/assets/images/INU/expoly2.png" alt="expoly2_Procdess" width="50%" min-width="200px" itemprop="image">
- 다항식의 0이 아닌 항들은 (계수, 차수) 형식으로 구조체 배열에 저장된다.
- 이 방식으로 하나의 배열에 여러 개의 다항식을 저장 할 수 있다.
- 먼저 (계수, 차수) 형식의 순서쌍을 구조체로 선언하고 이 구조체의 배열을 생성하여 저장한다.

```c
// (계수, 차수) 형식의 순서쌍을 구조체로 선언.
#define MAX_TERMS 101
struct {
  float coef;
  int expon;
} terms[MAX_TERMS];
int avail; // 현재 비어있는 요소의 인덱스를 가리킨다.
```
>
<img src="/assets/images/INU/algopoly2.png" alt="algopoly2_Procdess" width="100%" min-width="200px" itemprop="image"><br>`다항식의 덧셈 전 과 후`

🔥 알고리즘 🔥<br><br>
두 개의 다항식 A, B를 더하여 다항식 C를 구하려고 한다.<br>
A와 B의 각 항의 차수를 비교 후 같으면 계수를 더해 C의 첫번째 칸으로 보내고, 다르다면 더 큰 차수의 항을 C로 보낸다.<br>
(각 배열의 첫번째 칸이 최고차 항)<br>
이 과정을 어느 한 쪽의 다항식이 끝날 때까지 계속한다.
{: .notice--info}
{: style="text-align: center;"}


## 다항식 덧셈 프로그램 #2

```
polynomial : 다항식 덧셈 프로그램 #2
```
```c
#include <stdio.h>
#include <stdlib.h>


#define MAX_TERMS 101
struct {
	float coef;
	int expon;
} terms[MAX_TERMS]={ {8,3}, {7,1}, {1,0}, {10,3}, {3,2},{1,0} };
int avail=6;

// 두개의 정수를 비교
char compare(int a, int b) {
	if( a>b ) return '>';
	else if( a==b ) return '=';
	else return '<';
}

// 새로운 항을 다항식에 추가한다.
void attach(float coef, int expon) {
	if( avail>MAX_TERMS ){
		fprintf(stderr, "항의 개수가 너무 많음\n");
		exit(1);
	}
	terms[avail].coef=coef;
	terms[avail++].expon=expon; //빈 공간을 가르키는 avail 변수의 증가
}

// C = A + B
// int형 파라미터들은 각 다항식의 처음과 끝을 가리킨다.
poly_add2(int Astart, int Aend, int Bstart, int Bend, int *Cstart, int *Cend) {
	float tempcoef;
	*Cstart = avail;

	while( Astart <= Aend && Bstart <= Bend )
	  switch(compare(terms[Astart].expon,terms[Bstart].expon)){ 
	    
      case '>': 	// A의 차수 > B의 차수
	        attach(terms[Astart].coef, terms[Astart].expon);
	        Astart++; break;
	    case '=': 	// A의 차수 == B의 차수
		      tempcoef = terms[Astart].coef + terms[Bstart].coef;
		      if( tempcoef )
              attach(tempcoef,terms[Astart].expon);
		      Astart++; Bstart++; break;
	    case '<': 	// A의 차수 < B의 차수
		      attach(terms[Bstart].coef, terms[Bstart].expon);
		      Bstart++; break;
	}
	// A의 나머지 항들을 이동함
	for(;Astart<=Aend;Astart++)
      attach(terms[Astart].coef, terms[Astart].expon);
	// B의 나머지 항들을 이동함
	for(;Bstart<=Bend;Bstart++)
      attach(terms[Bstart].coef, terms[Bstart].expon);
	*Cend = avail -1;
}

void main() {
	int Cstart, Cend;
	poly_add2(0,2,3,5,&Cstart,&Cend);
}
```

```
실행 결과..!
```
<img src="/assets/images/INU/rspoly2.png" alt="rspoly2_Procdess" width="100%" min-width="200px" itemprop="image">`잘 작동하는 것을 볼 수 있다.`<br><br><br>



## Data Structure :: 구조체 (Structure)

```
구조체(Structure) 란?
```
> <img src="/assets/images/INU/structure.png" alt="structure_Procdess" width="100%" min-width="200px" itemprop="image">`구조체와 배열의 모습`<br>
**<span style="color:red">"타입이 다른 데이터를 하나로 묶는 방법."</span>**<br>
구조체의 형식은 다음과 같이 정의한다.<br>

```c
// 구조체의 형식
struct 구조체이름{
  항목 1;
  항목 2;
  ...
}

// 구조체의 생성
struct 구조체이름 구조체변수;

// 예
struct studentTag {
  char name[10];  // 문자열로 된 이름
  int age;        // 정수로 된 나이
  double gpa;     // 평균 평점을 나타내는 실수값
}; // 한 구조체 내부 데이터들의 타입이 전부 다르다. 구조체의 형식 정의가 끝났다면 이후에 생성을 해야한다.

//다음과 같이 구조체를 생성할 수 있다.
struct studentTag s;

// C언어에서는 typedef 를 이용, 구조체를 새로운 타입으로 선언할 수 있다.
typedef studentTag {
  char name[10];  // 문자열로 된 이름
  int age;        // 정수로 된 나이
  double gpa;     // 평균 평점을 나타내는 실수값
}student;

//typedef를 이용하여 만든 새로운 타입인 student만을 사용해서 변수 선언이 가능해진다.
student s;

//중괄호를 사용하여 선언시에 초기화도 가능하다.
student s = {"kim", 20, 4.3};
```
## 자체 참조 구조체 ?
```
자체 참조 구조체 (Self-referential Structure):
```
- 필드 중에 <span style="color:blue">`자기 자신을 가리키는 포인터`</span>가 한 개 이상 존재 하는 구조체.
- 연결리스트(Linked List) 나 트리(Tree)에 많이 등장.

```c
typedef struct ListNode {
    char data[10];
    struct ListNode *link; // 필드에 자기 자신을 가리키는 데이터가 있다.
} ListNode;
```

- 후에 List 에 관해 포스팅 할 때 예제와 함께 더욱 자세하게 다뤄 보겠다.<br>


📣 배열(Array)는 타입이 같은 데이터들을 하나로 묶는 방법이므로 구조체(Structure)과는 다르다 📣
{: .notice--warning}
{: style="text-align: center;"}

이상으로 배열, 구조체 (Array & Structure) 포스팅을 마치겠다.
{: .notice--success}
{: style="text-align: center;"}


[처음으로~](#){: .btn .btn--primary }



<span style="color:grey">`참고: C언어로 쉽게 풀어쓴 자료구조 <개정 3판> 천인국, 공용해, 하상국 지음`</span><br><br><br>


### Task Lists
> 
- [x] Data Structure : 배열(Array) 이란?
- [x] 배열 ADT 란?
- [x] polynomial : 다항식 덧셈 프로그램 #1
- [x] polynomial : 다항식 덧셈 프로그램 #2
- [x] 구조체(Structure) 란?
- [x] 자체 참조 구조체 (Self-referential Structure)