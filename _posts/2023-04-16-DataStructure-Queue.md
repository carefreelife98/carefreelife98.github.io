---
title: "Data Structure : (6) 큐 (Queue)"
categories:
  - INU-DataStructure
  - C
tags:
  - Data Structure
  - Queue
  - Array
  - C/C++
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
---
# Data Structure :: 큐 (Queue)

```
큐 (Queue) 란?
```
> <img src="/assets/images/INU/queue.png" alt="queue_Procdess" width="100%" min-width="200px" itemprop="image">`사진출처:`[freepik](https://www.freepik.com/free-photos-vectors/people-queue)<br><br>
**<span style="color:red">`"먼저 들어온 데이터가 먼저 나가는 FIFO(First-In First-Out) 특성을 가진 자료구조이다."`</span>**<br>
- **<span style="color:green">큐 (Queue)는 새로운 데이터가 뒤에서 추가되고, 앞에서 데이터가 하나씩 삭제되는 구조를 가지고 있다.</span>**
- 스택(Stack)과의 구조상으로 다른 점
  - 스택: 데이터의 삽입과 삭제가 같은 위치(top)에서 일어난다.
  - 큐: 데이터의 삽입은 후단(rear)에서, 삭제는 전단(front) 에서 일어난다.
- 큐도 스택과 마찬가지로 배열과 연결 리스트를 이용하여 구현할 수 있다.
<img src="/assets/images/INU/queuestrc.png" alt="queuestrc_Procdess" width="100%" min-width="200px" itemprop="image">`사진출처:`[geeksforgeeks](https://www.geeksforgeeks.org/queue-data-structure/)
<br><br>

## 큐의 ADT

```
큐 ADT
```

```c#
// 큐의 ADT는 스택의 ADT 와 거의 유사하다.
// 객체: 0개 이상의 요소들로 구성된 선형 리스트

∙연산:  
 ▪ create(max_size) ::=	
		최대 크기가 max_size인 공백큐를 생성한다.

 ▪ init(q) ::=
		큐를 초기화한다.

 ▪ is_empty(q) ::=  	
		if(size == 0) return TRUE;
		else return FALSE;

 ▪ is_full(q) ::=	
		if(size == max_size) return TRUE;
		else return FALSE;

 ▪ enqueue(q, e) ::= 	
		if( is_full(q) ) queue_full 오류;
		else q의 끝에 e를 추가한다. 

 ▪ dequeue(q) ::=	
		if( is_empty(q) ) queue_empty 오류;
		else q의 맨 앞에 있는 e를 제거하여 반환한다. 

 ▪ peek(q) ::= 	
		if( is_empty(q) ) queue_empty 오류;
		else q의 맨 앞에 있는 e를 읽어서 반환한다. 
```

<br><br>

```
큐의 삽입(enqueue) , 삭제(dequeue) 연산
```

> <img src="/assets/images/INU/endequeue.png" alt="endequeue_Procdess" width="100%" min-width="200px" itemprop="image">`큐의 삽입(enqueue) , 삭제(dequeue) 연산 과정`<br><br>
- 삽입(enqueue):
  - 큐에 요소를 추가하는 연산.
  - 큐의 제일 뒤에(rear) 새로운 요소를 추가한다.
<br>
- 삭제(dequeue):
  - 큐의 요소를 삭제하는 연산.
  - 큐의 제일 앞의(front) 요소를 꺼내서 외부로 반환.

## 선형 큐 (Linear Queue)

```
선형 큐의 구현
```

>
- 정수형 1차원 배열을 정의한다.
- enqueue, dequeue ADT를 위한 변수 front, rear를 선언한다.
- front는 큐에 삽입된 첫번째 요소, rear는 큐에 가장 늦게 삽입된 마지막 요소를 가리킨다.
  - front와 rear의 초기값은 -1 이다.
  - 큐에 데이터가 enqueue 되면 rear를 하나 증가시킨후 해당 위치에 데이터를 저장한다.
  - 큐에 데이터가 dequeue 되면 front를 하나 증가시킨후 front가 가리키는 위치에 있는 데이터를 삭제한다.
<img src="/assets/images/INU/arrqueue.png" alt="arrqueue_Procdess" width="100%" min-width="200px" itemprop="image">`선형 큐의 Process 과정`<br><br>

```c
// 간단한 선형 큐의 구현

#include<stdio.h>
#include<stdlib.h>

#define MAX_QUEUE_SIZE 5

typedef int element;

typedef struct {    // 큐 타입
    int front;
    int rear;
    element data[MAX_QUEUE_SIZE];
} QueueType;

// 오류함수
void error(char *message) {
    fprintf(stderr, "%s\n", message);
    exit(1);
}

void init_queue(QueueType *q) {
    q->rear = -1;
    q->front = -1;
}

void queue_print(QueueType *q) {
    for(int i = 0; i < MAX_QUEUE_SIZE; i++) {
        if (i <= q->front || i> q->rear)
			printf(" | ");
		else
			printf("%d | ", q->data[i]);
    }
    printf("\n");
}

int is_full(QueueType *q) {
    return q->rear == MAX_QUEUE_SIZE - 1;
}

// queue의 front가 삭제되며 증가하다가 rear와 같아지는 순간 queue는 공백 상태가 된다.
int is_empty(QueueType *q) {
    return q->rear == q->front;
}

// 큐 구조체 내부에 배열 타입으로 선언된 data[]의
// 인덱스를 증가시킨후(rear 초기값 = -1) 해당 위치부터 요소 추가
void enqueue(QueueType *q, int item) {
    if(is_full(q)) {
        error("큐가 포화상태이므로 enqueue 할 수 없습니다.");
    }
    else {
        q->data[++(q->rear)] = item;
    }
}

// 큐 구조체 내부에 배열 타입으로 선언된 data[]의
// 인덱스를 증가시킨후(front 초기값 = -1) 해당 위치부터 요소 삭제 후 반환
int dequeue(QueueType *q) {
    if(is_empty(q)) {
        error("큐가 이미 공백상태이므로 dequeue 할 수 없습니다.");
        return 0;
    }
    else {
        int item = q->data[++(q->front)];
        return item;
    }
}

int main(void) {
  int item = 0;
	QueueType *q = (QueueType *)malloc(sizeof(QueueType));

	init_queue(q);

	enqueue(q, 10); queue_print(q);
	enqueue(q, 20); queue_print(q);
	enqueue(q, 30); queue_print(q);

	item = dequeue(q); queue_print(q);
	item = dequeue(q); queue_print(q);
	item = dequeue(q); queue_print(q);
	return 0;

}
```
<img src="/assets/images/INU/queue1.png" alt="queue1_Procdess" width="100%" min-width="200px" itemprop="image">`선형 큐 실행 결과`<br><br>

## 원형 큐 (Circular Queue)

```
원형 큐의 구현
```

>
- 선형 큐의 ADT를 보면 찝찝한 부분이 보인다.
- 큐의 삽입과 삭제 연산을 도와주는 front 와 rear 변수의 값이 연산이 이루어질수록 한없이 증가한다는 것이다.
- 이 경우 data[] 배열의 끝에 도달하게 되면 front 변수가 증가하며 지나온 비어있는 이전 배열 공간을 사용하지 못한다.
- 배열내의 요소들을 이동시켜 해결할 수 있지만 비효율적이기에 원형 큐가 개발되었다.
<img src="/assets/images/INU/circularq.png" alt="circularq_Procdess" width="100%" min-width="200px" itemprop="image">`원형 큐 (Circular queue)`<br><br>

☝🏻 위 그림처럼 배열을 선형이 아닌 원형으로 생각해보자. ☝🏻<br><br>
front와 rear의 값이 배열의 끝인(MAX_QUEUE_SIZE - 1)에 도달하게 되면<br>다음에 증가되는 값은 data[0] 에 저장되도록 구현하는 것이다.<br><br>
실제 배열이 원형으로 변화 되는 것은 아니지만 개념상으로 배열 data[]의 인덱스에 변화를 주는 것이다.<br>
{: .notice--danger}
{: style="text-align: left;"}

>
- 원형 큐에서는 front와 rear의 개념에 약간의 변화가 생긴다.
- front와 rear의 초기값은 -1 이 아닌 0 으로 설정.
- 따라서 첫 데이터도 data[0] 이 아닌 data[1]부터 저장. (2바퀴 부터는 전부 사용)
- front는 항상 큐의 첫번째 요소의 하나 앞을 가리키며 rear는 마지막 요소를 가리킨다.
<br><br>
- 삽입 시: rear의 값 1증가 후 해당 위치에 요소 저장.
- 삭제 시: front의 값 1증가 후 해당 위치의 요소 삭제 및 반환.
<br><br>
- 원형 큐의 공백 상태: front와 rear의 값이 같을 시.
- 원형 큐의 포화 상태: front가 rear보다 한칸 앞에 있을 시.
<br><br>
<img src="/assets/images/INU/cirqproc.png" alt="cirqproc_Procdess" width="100%" min-width="200px" itemprop="image">`원형 큐 (Circular queue)의 동작`<br><br>

> **<span style="color:red">원형 큐의 포화 상태 검사</span>**
<br><br>
- 원형 큐는 한 칸의 자리를 비워둔다.
  - 배열의 모든 칸을 사용하게 되면 포화 및 공백 상태일때 모두 front와 rear의 값이 같아져 구분 할 수 없게 된다.
<br><br>
- 후에 요소들의 개수를 저장하고 있는 count 변수를 사용하게 되면 비워두지 않아도 된다.<br><br>
<img src="/assets/images/INU/circularqfullemp.png" alt="circularqfullemp_Procdess" width="100%" min-width="200px" itemprop="image">`원형 큐 (Circular queue) 의 상태 검사`
{: .notice--danger}
{: style="text-align: left;"}

```c
// 공백 상태
is_empty() {
  front == rear;
}

// 포화 상태
is_full() {
  if (front == rear + 1) // front 가 rear 보다 한 칸 앞에 있으면 포화.
}
```







<br><br>

최대한의 설명을 코드 블럭 내의 주석으로 달아 놓았습니다.<br><br>
혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>
긴 글 읽어주셔서 감사합니다. 스택 (Stack) 포스팅을 마칩니다.<br>
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }



<span style="color:grey">`참고: C언어로 쉽게 풀어쓴 자료구조 <개정 3판> 천인국, 공용해, 하상국 지음`</span><br><br><br>


### Task Lists
> 
- [x] Data Structure : 스택 (Stack) 이란?
- [x] 스택의 특징, 스택의 구조, 스택의 추상 데이터 타입(ADT), 스택의 연산
- [x] 시스템 스택을 이용한 함수 호출
- [x] 배열을 이용해 스택을 구현
- [x] 동적 배열 스택 프로그램
- [x] 스택의 응용 1 : 괄호 검사
- [x] 스택의 응용 2-1 : 후위 표기 수식의 계산
- [x] 스택의 응용 2-2 : 중위 표기식을 후위 표기식으로 변환
- [x] 스택의 응용 3 : 미로 문제 (Maze Solving Problem)