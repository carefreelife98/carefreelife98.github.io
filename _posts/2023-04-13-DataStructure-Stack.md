---
title: "Data Structure : (5) 스택(Stack)"
categories:
  - INU-DataStructure
  - C
tags:
  - Data Structure
  - Array
  - Stack
  - C/C++
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
---
# Data Structure :: 스택 (Stack)

```
스택 (Stack) 이란?
```
> <img src="/assets/images/INU/danbistack.jpeg" alt="danbistack_Procdess" width="70%" min-width="200px" itemprop="image"><br>`사진출처:`[우리집]<br><br>
**<span style="color:red">`"스택이란, 쌓여있는 객체이다."`</span>**<br>
- 일상 생활에서 스택은 우리 주변에 항상 존재한다. 심지어 이삿짐 위에 버티고 앉아있는 우리 단비까지도 스택이라고 할 수 있다.
- 층층이 쌓여진 아파트, 헬스장에 쌓여있는 원판, 카페에 쌓여있는 일회용 용기까지 모두 스택이라고 할 수 있다.
- 이처럼 스택이란 **<span style="color:green">`어떠한 객체들이 쌓여있는 형태`</span>**를 말한다.
<br><br>

```
스택의 특징
```
> <img src="/assets/images/INU/stacklifo.png" alt="stacklifo_Procdess" width="100%" min-width="200px" itemprop="image">`후입선출(LIFO: Last-In First-Out)`<br>
- 위 사진처럼 스택에서의 입출력은 가장 윗단에서만 일어나고 그 외의 위치에서는 데이터의 삭제가 이루어지지 못한다.<br><br>
- **<span style="color:blue">후입선출</span>**<br>
  - 자료구조에서의 스택은 자료의 출력 순서가 입력 순서의 역순으로 이루어져야 할 경우에 매우 요긴하게 사용된다.<br>
  - ex. (a, b, c, d, e) 형태의 데이터를 (e, d, c, b, a) 와 같은 역순으로 정렬하고 싶을때<br>
  스택에 데이터를 전부 입력 후 출력을 하게되면 `후입선출: LIFO (가장 늦게 입력된 데이터가 가장 먼저 출력된다.)` 원리에 따라 데이터가 역순으로 정렬된다.
  <br><br>

```
스택의 구조
```
> <img src="/assets/images/INU/stackstructure.png" alt="stackstructure_Procdess" width="100%" min-width="200px" itemprop="image">`스택의 구조`
- 스택 상단(stack top): 스택에서 입출력이 이루어지는 부분
- 스택 하단(stack bottom): 스택의 바닥부분. 가장 먼저 입력된 요소가 있다.
- 요소(element): 스택에 저장되는 것
- 공백 스택(empty stack): 스택에 요소가 하나도 없는 비어있는 스택.
<br><br>

```
시스템 스택을 이용한 함수 호출
```

>
- 프로그래밍을 할 때 수많은 함수들이 호출되어 실행되는 것을 볼 수 있다.
- 함수는 호출이 되어 실행이 된 후 자신을 호출한 함수로 돌아가야 하는데 이때 스택이 사용된다.
- 함수는 들어온 길을 되돌아가야 하기 때문이다. 즉, 호출된 순서의 역순으로 빠져나가야 한다.
- 이처럼 스택은 함수가 복귀할 주소를 저장하는 데에 사용된다.

> **<span style="color:blue">시스템 스택</span>**<br><br>
<img src="/assets/images/INU/systemstack.png" alt="systemstack_Procdess" width="100%" min-width="200px" itemprop="image">`함수 호출 과정에서의 스택 응용(시스템 스택)`
1. 시스템 스택에는 함수가 호출될 때마다 **활성 레코드(activation record)**가 만들어지고, 이곳에 복귀 주소가 저장된다.
2. 활성 레코드에는 프로그램 카운터 뿐만 아니라 함수 호출시의 매개변수와 함수 내부에서 선언된 지역변수들이 같이 생성된다.
3. 자기 자신을 호출하는 재귀 함수 (recursion) 도 동일한 방법으로 활성 레코드가 생성된 후 사라진다.<br>
   순환(recursion)에 대해 더 궁금하다면? [➡️ 순환 - Recursion](https://carefreelife98.github.io/inu-datastructure/c/DaraStructure-Resursion/)
{: .notice--info}
{: style="text-align: left;"}

<br><br>

```
스택의 추상 데이터 타입(ADT)
```

```c
∙객체: 0개 이상의 원소를 가지는 유한 선형 리스트

∙연산:  
  ▪ create(size) ::= 최대 크기가 size인 공백 스택을 생성한다.

    // 스택이 포화 상태인지 검사
  ▪ is_full(s) ::=
  	  if(스택의 원소수 == size) return TRUE;
  	  else return FALSE;

    // 스택이 공백 상태인지 검사
  ▪ is_empty(s) ::= 
  	  if(스택의 원소수 == 0) return TRUE;
  	  else return FALSE;
    
    // 스택의 top에 요소를 추가
  ▪ push(s, item) ::= 
  	  if( is_full(s) ) return ERROR_STACKFULL;
  	  else 스택의 맨 위에 item을 추가한다.
    
    // 스택의 top에 있는 요소를 삭제 후 반환
  ▪ pop(s) ::= 
  	  if( is_empty(s) ) return ERROR_STACKEMPTY;
  	  else 스택의 맨 위의 원소를 제거해서 반환한다. 

    // 스택의 top에 있는 요소를 탐색
  ▪ peek(s) ::= 
  	  if( is_empty(s) ) return ERROR_STACKEMPTY;
  	  else 스택의 맨 위의 원소를 제거하지 않고 반환한다. 
```
<br><br>
```
스택의 연산
```

> <img src="/assets/images/INU/calstack.png" alt="calstack_Procdess" width="100%" min-width="200px" itemprop="image">`스택의 push() & pop() 연산 과정`<br><br>
- push() : 스택에 데이터(요소)를 추가.
  - 생성된 스택의 가장 밑부분 부터 데이터를 쌓는다.
  - 만약 스택의 상태가 full한 상태에서 push()를 하게 되면 오류가 발생한다.
<br><br>
- pop() : 스택에서 데이터(요소)를 삭제.
  - 스택의 가장 윗부분(top)의 데이터를 꺼내 삭제한다.
  - 스택에 더 이상 남아있는 데이터가 없는 상태에서 pop()을 한다면 오류가 발생한다.
{: .notice--warning}
{: style="text-align: left;"}

## 스택의 구현

> **스택을 구현하는 방법 두 가지**
<br>
- Array를 이용해 구현
  - 간단하고 성능이 우수하다.
  - 스택의 크기가 고정됨(fixed).
<br>
- Linked List를 이용해 구현
  - 구현하는 과정이 복잡하다.
  - 스택의 크기를 동적으로 할당 가능.
{: .notice--info}
{: style="text-align: left;"}

## 스택의 구현 : 배열

```
배열을 이용해 스택을 구현해보자.
```

> <img src="/assets/images/INU/arrstack.png" alt="arrstack_Procdess" width="100%" min-width="200px" itemprop="image">`배열로 구현한 스택의 구조`<br><br>
- 배열에는 다양한 type의 요소들을 넣을 수 있다. 예제에서는 int형 정수가 저장되는 것으로 하겠다.
- int형 정수를 저장해야 하니 int형의 1차원 배열 stack[MAX_STACK_SIZE]을 생성하도록 하자.
- 스택에서 가장 최근에 입력된 데이터를 가리키는 변수 top도 생성해주자.
- 가장 먼저 입력된 순서대로 stack[0] 부터 stack[top] 까지 저장 될 것이다.
- top 변수는 스택이 비어있으면 -1의 값을 가진다.
  - 스택이 공백 상태일때 top이 0의 값을 가진다면,<br>
  stack[0]에 값이 있다는 것으로 해석이 되기 때문이다.

```
top 변수의 특성에 유의해 스택의 공백, 포화 상태 검사 함수를 의사코드로 알아보자.
```

> <img src="/assets/images/INU/arrstackempfull.png" alt="arrstackempfull_Procdess" width="100%" min-width="200px" itemprop="image">`is_empty , is_full 연산 함수의 구현`<br><br>

```c
// top 변수가 -1이면 true, 그 외 false 를 반환함
// top 변수가 -1이 될 결우 더 이상의 pop() 은 불가능하다.
is_empty(S):
  if top == -1  // top 변수가 -1이 되는 순간 비로소 스택이 공백 상태가 됨에 유의하자 !!!
    then return TRUE 
    else return FALSE
```

```c
// top 변수가 스택의 최대 크기보다 1이 작은 수 이면 true, 그 외 false 를 반환함.
// 배열은 0부터 index가 시작하므로 가장 마지막 요소의 index는 해당 배열의 크기보다 1이 작다.
// top 이 (MAX_STACK_SIZE-1) 이 되면 더 이상의 push() 는 불가능하다.
is_full(S): 
  if top == (MAX_STACK_SIZE-1)  // top 변수가 스택의 마지막 index를 가리키게 되면 stack이 포화상태가 된다.
    then return TRUE
    else return FALSE
```

```
스택 - 배열 : push() , pop() 연산
```

> <img src="/assets/images/INU/stackpushpop.png" alt="stackpushpop_Procdess" width="100%" min-width="200px" itemprop="image">`push() 연산 함수의 구현`<br><br>

```c
push(S, x): // 스택 배열 구조체와 입력될 요소를 매개 변수로 넘긴다.

  if is_full(S) // 스택이 포화 상태이면 에러 발생
    then error "overflow" 
  else 
    top←top+1 // 요소 입력 전에 top 변수를 먼저 증가시키는 것에 유의하자.
              // top 변수를 먼저 증가시키지 않으면 기존의 top 위치에 새 요소가 덮어 씌어지게 된다.
    stack[top]←x // top 변수의 증가 후 요소의 입력이 실행된다.
```

> <img src="/assets/images/INU/arrstackpop.png" alt="arrstackpop_Procdess" width="100%" min-width="200px" itemprop="image">`pop() 연산 함수의 구현`<br><br>

```c
pop(S, x): // 스택 배열 구조체와 삭제될 요소를 매개 변수로 넘긴다.

  if is_empty(S) // 스택이 공백 상태인 경우 에러 발생.
    then error "underflow" 
  else 
    e←stack[top] // 삭제될 공간(스택) 에 있던 요소를 보관 후
    top←top-1 // 배열의 크기를 줄여 스택을 삭제한다.
    return e  // 해당 공간에 있던 요소를 반환해준다.
```

```
이제 학습한 ADT와 함께 동적 배열 스택을 C언어로 구현해보자.
```

```c
#include <stdio.h>
#include <stdlib.h>


typedef int element;

typedef struct {
  element *data;  // data는 포인터로 정의된다. (해당 스택(배열) 주소에 있는 값이기 때문에)
  int capacity; // 현재 크기
  int top;
} StackType;

// 스택 생성 함수
void init_stack(StackType *s) {
  s->top = -1;
  s->capacity = 1; // 하나의 요소가 들어오기 위한 여유 공간 확보
  s->data = (element *)malloc(s->capacity * sizeof(element)); // 동적 스택
}

// 스택 삭제 함수(동적 메모리 사용 후 메모리 반환)
void delete(StackType *s){
  free(s);
}

// 공백 상태 검출 함수
int is_empty(StackType *s) {
  return s->top == -1 ? 1 : 0;
}

// 포화 상태 검출 함수
int is_full(StackType *s) {
  return (s->capacity - 1) == s->top;
}


void push(StackType *s, element item) {
  if (is_full(s)) {

    // 동적 메모리 할당 (공간이 부족하면 메모리를 2배로 더 확보한다.)
    s->capacity *= 2;

    // realloc() 함수는 동적 메모리의 크기를 변경하는 함수로서, 현재 내용은 유지하면서 주어진 크기로 동적 메모리를 재할당한다.
    s->data = (element *)realloc(s->data, s->capacity * sizeof(element));
  }
  s->data[++(s->top)] = item; // top을 먼저 증가시켜 다음 공간을 지정한 후 item(요소) 를 넣는다.
}

// 삭제 함수
element pop(StackType *s) {
  if(is_empty(s)) {
    fprintf(stderr, "이미 비어있는 스택입니다.\n");
    exit(1);
  }
  else {
    // element e = s->data;
    // s->top = s->top - 1;
    // return e;

    return s->data[(s->top)--];
  }
}

int main(void) {
  StackType *s;

  s = (StackType *)malloc(sizeof(StackType));
  init_stack(s);

  push(s, 1);
	push(s, 2);
	push(s, 3);
	printf("%d\n", pop(s));
	printf("%d\n", pop(s));

	printf("%d\n", pop(s));
	free(s);
}
```

> <img src="/assets/images/INU/arrstackrs.png" alt="arrstackrs_Procdess" width="100%" min-width="200px" itemprop="image">`동적 배열 스택 프로그램 실행 결과`
<br><br>

## 스택의 응용 : 괄호 검사

```
스택을 사용하여 괄호 검사 프로그램을 작성해보자.
```
>
- 스택을 사용하여 프로그램에 사용된 괄호의 쌍이 올바른지 검사하는 프로그램을 만들어보자.
<br>
**조건**<br>
<br>
    - (1) 왼쪽 괄호의 개수와 오른쪽 괄호의 개수가 같아야 한다.<br>
    - (2) 같은 괄호에서 왼쪽 괄호는 오른쪽 괄호보다 먼저 나와야 한다.<br>
    - (3) 괄호 사이에는 포함 관계만 존재한다.<br><br>
**괄호의 종류:**<br>
대괄호 (‘[’, ‘]’), 중괄호 (‘{’, ‘}’), 소괄호 (‘(’, ‘)’)<br>
<br>
**잘못된 괄호 사용의 예**<br>
		(a(b)<br>
		a(b)c)<br>
		a{b(c[d]e}f)<br>
{: .notice--info}
{: style="text-align: left;"}
> **<span style="color:blue">괄호 검사 프로그램의 알고리즘</span>**<br><br>
<img src="/assets/images/INU/stackmatching.png" alt="stackmatching_Procdess" width="100%" min-width="200px" itemprop="image">`괄호 검사 프로그램의 알고리즘`
<br><br>
- 알고리즘의 개요
  - 괄호들은 가장 가까운 거리에 있는 괄호들끼리 서로 쌍을 이루어야 한다.
  - 문자열에 저장되어 있는 괄호를 차례대로 조사하면서 왼쪽 괄호를 만나면 스택에 삽입(push)하고, 오른쪽 괄호를 만나면 스택에서 top괄호를 삭제(pop)한 후 오른쪽 괄호와 짝이 맞는지를 검사한다.
  - 이때, 스택이 비어있으면 조건 1 또는 조건 2 위배. 괄호의 짝이 맞지 않으면 조건 3 등에 위배된다.
  - 마지막 괄호까지 조사한 후에도 스택에 괄호가 남아 있으면 조건 1에 위배되므로 0(거짓)을 반환하고, 그렇지 않으면 1(참)을 반환한다.

```
괄호 검사 알고리즘을 pseudocode로 설계해보자.
```

```c
check_matching(expr) :

while (입력 expr의 끝이 아니면) 
  ch ← expr의 다음 글자 
  switch(ch) 
    case '(': case '[': case '{': // 왼쪽 괄호 이면 스택에 삽입.
       ch를 스택에 삽입 
       break 
    case ')': case ']': case ']': // 오른쪽 괄호를 만나면 스택에서 pop후 두 괄호를 비교.
       if ( 스택이 비어 있으면 ) 
         then 오류 
       else 스택에서 open_ch를 꺼낸다 
           if (ch 와 open_ch가 같은 짝이 아니면) 
               then 오류 보고 
       break 
if( 스택이 비어 있지 않으면 ) 
  then 오류
```
<br><br>

```
이제 괄호 검사 프로그램을 이전에 작성한 pseudo code 를 바탕으로 구현해보자.
```

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STACK_SIZE 100

typedef char element; // 괄호가 들어갈 것이기 때문에 char 선언 할 것!

typedef struct {
    int top;
    element data[MAX_STACK_SIZE];
} StackType;

// 스택 생성
void init_stack(StackType *s) {
    s->top = -1;
}

// 메모리 반환
void delete(StackType *s) {
    free(s);
}

// 포화 상태 검사
int is_full(StackType *s) {
    return s->top == MAX_STACK_SIZE - 1;
}

// 공백 상태 검사
int is_empty(StackType *s) {
    return s->top == -1;
}
// 스택 추가
void push(StackType *s, element item) {
    if(is_full(s)) {
        fprintf(stderr, "스택이 포화 상태입니다.");
        exit(1);
    }
    else {
        s->data[++(s->top)] = item;
    }
}

// 스택 삭제
element pop(StackType *s) {
    if(is_empty(s)) {
        fprintf(stderr, "스택이 이미 공백 상태입니다.");
        exit(1);
    }
    else {
        return s->data[(s->top)--];
    }
}

// peek함수
element peek(StackType *s) {
    if(is_empty(s)) {
        fprintf(stderr, "스택이 공백 상태 입니다.");
        exit(1);
    }
    else {
        return s->data[s->top];
    }
}

int check_matching(const char *in) {
    StackType s;
    char ch, open_ch;
    int i, n = strlen(in); // n = 문자열의 길이
    
    init_stack(&s); // 스택의 생성, 초기화

    for(i = 0; i < n; i++) {
        
        ch = in[i]; // ch = 확인 대상인 문자열의 문자가 하나씩 들어온다.
        
        // switch 문으로 ch를 하나씩 검사한다. 
        switch (ch) {
            case '(': case '[': case '{': // 왼쪽 괄호이면 스택에 push,
                push(&s, ch);
                break;
            case ')': case ']': case '}': // 오른쪽 괄호이면 기존 스택의 데이터를 
                if(is_empty(&s)) {
                    return 0;
                }
                else {
                    open_ch = pop(&s); // pop()하여 open_ch 변수에 저장하고,
                    
                    // 기존 스택의 괄호(왼쪽 괄호, open_ch)와 새로 만난 오른쪽 괄호(ch)가 다르다면 종료. 
                    if ((open_ch == '(' && ch != ')') ||
                        (open_ch == '[' && ch != ']') ||
                        (open_ch == '{' && ch != '}')) {
                            return 0;
                        }
                    else break;
                }
        }
    }
    // 스택에 데이터가 하나라도 남아 있으면 오류.
    if(!is_empty(&s)) {
        printf("오류: 스택에 괄호가 남아있습니다.");
        return 0;
    }
    else return 1;
}

int main(void) {
    char *p = "{ A[(i+1)]=0; }";
    if (check_matching(p) == 1){
        printf("%s 괄호 검사 성공!\n ", p);
    }
    else {
        printf("%s 괄호 검사 실패...\n ", p);
    }
    return 0;
}
```


<!-- 📣 순환은 본질적으로 순환적인 문제나, 그러한 자료구조를 다루는 프로그램에 적합하다. 📣
{: .notice--warning}
{: style="text-align: center;"}