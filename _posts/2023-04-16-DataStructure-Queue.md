---
title: "Data Structure : (6) 큐 (Queue)"
categories:
  - INU-DataStructure
  - C
tags:
  - Data Structure
  - Queue
  - Deque
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
- **삽입(enqueue):**
  - 큐에 요소를 추가하는 연산.
  - 큐의 제일 뒤에(rear) 새로운 요소를 추가한다.
<br>
- **삭제(dequeue):**
  - 큐의 요소를 삭제하는 연산.
  - 큐의 제일 앞의(front) 요소를 꺼내서 외부로 반환.

## 선형 큐 (Linear Queue)

```
선형 큐의 구현
```

>
- 정수형 1차원 배열을 정의한다.
- enqueue, dequeue ADT를 위한 변수 front, rear를 선언한다.
- **<span style="color:blue">`front는 큐에 삽입된 첫번째 요소, rear는 큐에 가장 마지막으로 삽입된 요소를 가리킨다.`</span>**
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
- 따라서 첫 데이터도 data[0] 이 아닌 data[1]부터 저장.
- **<span style="color:blue">front는 항상 첫번째 요소의 하나 앞을 가리키며 rear는 마지막 요소를 가리킨다.</span>**
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
- 원형 큐의 공백 상태 : front == rear
- 원형 큐의 포화 상태 : front == (rear + 1) % MAX_QUEUE_SIZE
<img src="/assets/images/INU/circularqfullemp.png" alt="circularqfullemp_Procdess" width="100%" min-width="200px" itemprop="image">`원형 큐 (Circular queue) 의 상태 검사`<br><br>
{: .notice--danger}
{: style="text-align: left;"}

```c
// 공백 상태 검출 함수
void is_empty(QueueType *q) {
  return (q->front == q->rear;)
}

// 포화 상태 검출 함수
int is_full(QueueType *q) {
  // front 가 rear 보다 한 칸 앞에 있으면 포화.
  return (q->front == (q->rear + 1) % MAX_QUEUE_SIZE)
}
```

## 원형 큐의 삽입, 삭제 알고리즘

```
원형 큐의 삽입, 삭제 알고리즘
```

> - 원형 큐에서의 삽입, 삭제 알고리즘에서 중요한 점은<br>
**<span style="color:blue">`삽입이나 삭제를 하기전에 front 와 rear 를 원형으로 회전시켜야 한다는 것이다.`</span>**
- 원형 회전은 나머지 연산자 %를 이용하여 쉽게 구현 가능하다.
```
front <- (front + 1) % MAX_QUEUE_SIZE;
rear <- (rear + 1) % MAX_QUEUE_SIZE;
```
- 위의 식에 의하여 front와 rear 값은 (MAX_QUEUE_SIZE - 1)에서 하나가 증가되면 0이 된다.
- 즉, MAX_QUEUE_SIZE 가 5이면 front 와 rear 값은 0,1,2,3,4,0 과 같이 변화한다.

```c
// 원형 큐에서의 삽입, 삭제 알고리즘
enqueue(Q, x):
  rear<-(rear + 1) % MAX_QUEUE_SIZE;
  Q[rear] <- x;

dequeue(Q):
  front<-(front + 1) % MAX_QUEUE_SIZE;
  return Q[front];
```

## 원형 큐의 구현

```
원형 큐를 C언어로 구현해보자.
```

```c
#include<stdio.h>
#include <stdlib.h>

#define MAX_QUEUE_SIZE 5

typedef int element;

typedef struct {
    int front;
    int rear;
    element data[MAX_QUEUE_SIZE];
}QueueType;

// 오류 함수
void error (char *message) {
    fprintf(stderr, "%s\n", message);
    exit(1);
}

// 큐 초기화
void init_queue(QueueType *q) {
    q->front = q->rear = 0;
}

// 공백 검출
int is_empty(QueueType *q) {
    return q->front == q->rear;
}

// 포화 검출
int is_full(QueueType *q) {
    return q->front == (q->rear + 1) % MAX_QUEUE_SIZE;
}

// 원형큐 출력 함수
void queue_print(QueueType *q)
{
	printf("QUEUE(front=%d rear=%d) = ", q->front, q->rear);
	if (!is_empty(q)) {
			int i = q->front;
			do {
				i = (i + 1) % (MAX_QUEUE_SIZE);
				printf("%d | ", q->data[i]);
				if (i == q->rear)
					break;
			} while (i != q->front);
		}
	printf("\n");
}

void enqueue(QueueType *q, element item) {
    if(is_full(q)){
        error("큐가 이미 포화 상태입니다.");
    }
    else {
        q-> rear = (q->rear + 1) % MAX_QUEUE_SIZE;
        q->data[q->rear] = item;
    }
}

element dequeue(QueueType *q) {
    if(is_empty(q)) {
        error("큐가 이미 공백 상태입니다.");
        return 0;
    }
    else {
        q->front = (q->front + 1) % MAX_QUEUE_SIZE;
        return q->data[q->front];
    }
}

element peek(QueueType *q) {
    if(is_empty(q)) {
        error("큐가 이미 공백 상태입니다.");
    }
    return q->data[(q->front + 1) % MAX_QUEUE_SIZE];
}

int main(void) {
    QueueType *q = (QueueType *)malloc(sizeof(QueueType));
    int element;

    init_queue(q);
    printf("----데이터 추가 단계----\n");
    while (!is_full(q)) {
        printf("정수를 입력하시오: ");
        scanf("%d", &element);
        enqueue(q, element);
        queue_print(q);
    }
    printf("-----큐는 포화 상태입니다.-----\n\n");

    printf("-----데이터 삭제 단계-----\n");
    while (!is_empty(q)) {
        element = dequeue(q);
        printf("꺼내진 정수 : %d \n", element);
        queue_print(q);
    }
    printf("----큐는 공백 상태입니다.----\n");
}
```

```
실행 결과
```

<img src="/assets/images/INU/rscirq.png" alt="rscirq_Procdess" width="100%" min-width="200px" itemprop="image">`원형 큐 (Circular queue) 의 실행 결과`<br><br>

## 덱 (deque) 이란?

```
덱 (deque)
```

> - **`덱(deque)`**은 double-ended queue의 줄임말 
- **<span style="color:green">`큐의 전단(front)과 후단(rear) 에서 모두 삽입과 삭제가 가능한 큐.`</span>**<br>
<img src="/assets/images/INU/deque.png" alt="deque_Procdess" width="100%" min-width="200px" itemprop="image">`덱의 구조`<br>

📣 하지만 여전히 큐의 중간에서 데이터의 삽입 및 삭제 등의 수정은 구현되지 않는다!! 📣
{: .notice--danger}
{: style="text-align: center;"}
<br>
## 덱의 ADT

```
덱 ADT
```

>
```c
∙객체: n개의 element형으로 구성된 요소들의 순서있는 모임
∙연산:  
 ▪ create() ::=		    // 덱을 생성한다.
 ▪ init(dq) ::=		    // 덱을 초기화한다.
 ▪ is_empty(dq) ::=  	// 덱이 공백상태인지를 검사한다. 
 ▪ is_full(dq) ::=	    // 덱이 포화상태인지를 검사한다.
 ▪ add_front(dq, e) ::= // 덱의 앞에 요소를 추가한다.
 ▪ add_rear(dq, e) ::= 	// 덱의 뒤에 요소를 추가한다.
 ▪ delete_front(dq) ::=	// 덱의 앞에 있는 요소를 반환한 다음 삭제한다 
 ▪ delete_rear(dq) ::=	// 덱의 뒤에 있는 요소를 반환한 다음 삭제한다.
 ▪ get_front(q) ::= 	// 덱의 앞에서 삭제하지 않고 앞에 있는 요소를 반환한다.
 ▪ get_rear(q) ::= 	    // 덱의 뒤에서 삭제하지 않고 뒤에 있는 요소를 반환한다.
```
- 덱은 스택과 큐의 연산들을 모두 가지고 있다.
    - add_front(D) == push(S)
    - delete_front(D) == pop(S) == dequeue(Q)
    - add_rear(D) == enqueue(Q)
<br>
- 덱이 추가적으로 가지고 있는 연산들
    - get_front(D)
    - get_rear(D)
    - delete_rear(D)

**<span style="color:green">사용 연산에 따른 덱의 구조 변화</span>**
<br><br>
덱의 front() 관련 연산만 사용 = Stack 처럼 사용가능
<br><br>
덱의 삽입은 rear()연산, 삭제는 front()연산 만을 사용 = Queue 처럼 사용가능
{: .notice--info}
{: style="text-align: center;"}

<br><br>

## 덱의 연산

```
덱의 연산
```

> <img src="/assets/images/INU/caldeque.png" alt="caldeque_Procdess" width="100%" min-width="200px" itemprop="image">`덱의 연산 과정`<br><br>


## 배열을 이용한 덱의 구현

```
배열을 이용하여 덱을 구현해보자.
```
> - 원형 큐와 덱은 공통점이 많다.
- 원형 큐에서 그대로 사용할 수 있는 연산들 🔽

```c
    - is_empty()
    - is_full()
    - size()
    - init_queue()
    - print_dequeue()
    - add_rear()        //enqueue()
    - delete_front()
    - get_front()
```
- 새롭게 추가된 연산들 🔽

```c
    - delete_rear() // 원형 큐에서와 다르게 반대 방향으로의 회전이 필요하다.
    - add_front()   // 원형 큐에서와 다르게 반대 방향으로의 회전이 필요하다.
    - get_rear()    // 공백 상태가 아닌경우 rear가 가리키는 항목을 반환.
```


> <h1><span style="color:red">🔥 add_front() & delete_rear(): 🔥</span></h1>
- 원형 큐에서와 다르게 반대 방향으로의 회전이 필요하다.
- front 나 rear 를 감소시켜야 한다.
- 만약 음수가 된다면 MAX_DEQUE_SIZE 를 더해주어야 한다.
- 따라서 다음과 같이 변경된다.
<br><br>
```c
front ◀️ (front - 1 + MAX_DEQUE_SIZE) % MAX_DEQUE_SIZE;
rear ◀️ (rear - 1 + MAX_DEQUE_SIZE) % MAX_DEQUE_SIZE;
```
{: .notice--warning}
{: style="text-align: left;"}
> <img src="/assets/images/INU/caldeque.png" alt="caldeque_Procdess" width="100%" min-width="200px" itemprop="image">`배열을 이용한 덱의 구현`

<br><br>
```
배열을 이용하여 원형 덱을 구현해보자. - C언어
```

```c
#include<stdio.h>
#include<stdlib.h>

#define MAX_q_SIZE 5

typedef int element;

typedef struct {
    element data[MAX_q_SIZE];
    int front, rear;
}DequeType;

//오류 함수
void error(char *message) {
    fprintf(stderr,"%s\n", message);
    exit(1);
}

//초기화
void init_deque(DequeType *q){
    q->front = q->rear = 0;
}

//공백 상태 검출
int is_empty(DequeType *q) {
    return q->front == q->rear;
}

//포화 상태 검출
int is_full(DequeType *q) {
    return q->front == (q->rear + 1) % MAX_q_SIZE;
}

//원형 큐 출력
// 원형큐 출력 함수
void deque_print(DequeType *q)
{
	printf("DEQUE(front=%d rear=%d) = ", q->front, q->rear);
	if (!is_empty(q)) {
		int i = q->front;
		do {
			i = (i + 1) % (MAX_q_SIZE);
			printf("%d | ", q->data[i]);
			if (i == q->rear)
				break;
		} while (i != q->front);
	}
	printf("\n");
}

// front 삭제
element delete_front(DequeType *q) {
    if(is_empty(q)) {
        error("덱이 공백 상태입니다.");
    }
    // 추가 (front + 1 하여 삭제 후 한바퀴를 돌린다.)
    q->front = (q->front + 1) % MAX_q_SIZE;
    return q->data[q->front];
}

//get front
element get_front(DequeType *q) {
    if(is_empty(q)) {
        error("큐가 공백 상태입니다.");
    }
    return q->data[(q->front + 1) % MAX_q_SIZE];
}

void add_front(DequeType *q, element item) {
    if(is_full(q)) {
        error("큐가 공백 상태입니다.");
    }
    q->data[q->front] = item;
    q->front = (q->front - 1 + MAX_q_SIZE) % MAX_q_SIZE;
}

// rear 삽입
void add_rear(DequeType *q, element item) {
    if(is_full(q)){
        error("덱이 이미 포화 상태입니다.");
    }
    // 추가 (rear + 1하여 공간을 확보 후 원형 덱 한바퀴를 돌린다.)
    q->rear = (q->rear + 1) % MAX_q_SIZE;
    q->data[q->rear] = item;
}

element delete_rear(DequeType *q) {

    int prev = q->rear; // rear에 있던 데이터 삭제 전 반환해야하는 rear 데이터 임시 저장.
    if(is_empty(q)) {
        error("덱이 공백 상태입니다.");
    }
    q->rear = (q->rear - 1 + MAX_q_SIZE) % MAX_q_SIZE;
    return q->data[prev];
}

element get_rear(DequeType *q) {
    if(is_empty(q)) {
        error("덱이 공백 상태입니다.");
    }
    return q->data[q->rear];
}

int main(void)
{
	DequeType *q = (DequeType *)malloc(sizeof(DequeType));

	init_deque(q);
	for (int i = 0; i < 3; i++) {
		add_front(q, i);
		deque_print(q);
	}
	for (int i = 0; i < 3; i++) {
		delete_rear(q);
		deque_print(q);
	}
	return 0;
}
```

> <img src="/assets/images/INU/rsarrdeque.png" alt="rsarrdeque_Procdess" width="100%" min-width="200px" itemprop="image">`배열을 이용한 원형 덱 실행 결과`

## 큐의 응용: 시뮬레이션

```
고객과 서비스를 제공하는 장소의 대기 행렬을 큐를 사용하여 시뮬레이션 해보자.
```

> 요구 사항
- 직원: 1명
- 대기행렬: 큐(Queue)
- 고객마다의 입장 간격: random
- 고객마다의 서비스 시간: random
- 고객들은 입장 순서대로 서비스를 받는다.
- 시뮬레이션이 끝나면 고객들의 평균 대기시간을 출력.

> <h1><span style="color:green">알고리즘</span></h1>
    - 시뮬레이션은 하나의 반복 루프.
    - 현재 시각을 나타내는 clock 변수 하나 증가.
    - is_customer_arrived() 함수 호출
        - 랜덤 난수를 생성 후 시뮬레이션 파라미터 변수인 arrival_prov() 와 비교하여 작으면 새로운 고객의 입장으로 판단.
    - 고객의 ID, 도착시간, 서비스 시간 등의 정보를 만들어 구조체에 복사
    - 고객 정보 구조체를 파라미터로 큐의 삽입함수 enqueue() 호출.
{: .notice--info}
{: style="text-align: left;"}

## 원형 큐를 이용한 시뮬레이션 구현

```
원형 큐를 사용해서 비즈니스 시뮬레이션을 구현해보자. - C언어
```

```c
#include<stdio.h>
#include<stdlib.h>
#include<time.h>

#define MAX_QUEUE_SIZE 5

typedef struct {
    int id;
    int arrival_time;
    int service_time;
} element;

typedef struct {
    int front;
    int rear;
    element data[MAX_QUEUE_SIZE];
}QueueType;

// 오류함수
void error(char *message) {
    fprintf(stderr, "%s\n", message);
    exit(1);
}

// 큐 초기화
void init_queue(QueueType *q) {
    q->front = q->rear = 0;
}

int is_empty(QueueType *q) {
    return (q->front == q->rear);
}

int is_full(QueueType *q) {
    return q->front == (q->rear + 1) % MAX_QUEUE_SIZE;
}

//삽입 함수
void enqueue(QueueType *q, element item) {
    if(is_full(q)) {
        error("큐가 이미 포화 상태입니다.");
    }
    q->data[(q->rear + 1) % MAX_QUEUE_SIZE] = item;
}

// 삭제 함수
element dequeue(QueueType *q) {
    if(is_empty(q)) {
        error("큐가 공백 상태입니다.");
    }
    q->front = (q->front + 1) % MAX_QUEUE_SIZE;
    return q->data[q->front];
}

// 탐색
element peek(QueueType *q) {
    if(is_empty(q)) {
        error("큐가 공백 상태입니다.");
    }
    return q->data[(q->front + 1) % MAX_QUEUE_SIZE];
}

//----------------원형 큐 코드-----------------

int main(void) {
    int minutes = 60; // 60분이 지나면 시뮬레이션 종료 및 대기시간 반환
    int total_wait = 0;
    int total_customers = 0;
    int service_time = 0;
    int service_customer;
    QueueType q; // 큐(대기열)은 한개.
    init_queue(&q);

    srand(time(NULL));
    for(int clock = 0; clock < minutes; clock++) {
        printf("현재 시각: %d\n", clock);

        // 0~9 사이의 난수가 3보다 작으면 새로운 고객의 입장으로 판단.
        if((rand()%10) < 3) {
            element customer;
            customer.id = total_customers++;
            customer.arrival_time = clock;
            
            // 고객의 서비스 시간은 1~3 사이의 난수
            customer.service_time = rand() % 3 + 1;
            enqueue(&q, customer); // 고객 입장
            printf("고객 %d 이 %d 분에 들어옵니다. 업무 처리시간: %d분\n", customer.id, customer.arrival_time, customer.service_time);
        // service time이 남아있으면 service time 감소
        }
        if(service_time > 0) {
            printf("고객 %d 업무 처리 중입니다. \n", service_customer);
            service_time--;
        }
        else { // service time이 끝나면 dequeue() 
            // 대기열에 고객이 남아 있으면 실행
            if(!is_empty(&q)) { 
                element customer = dequeue(&q);
                service_customer = customer.id;
                service_time = customer.service_time;
                printf("고객 %d이 %d분에 업무를 시작합니다. 대기 시간은 %d분 이었습니다.\n", customer.id, clock, clock - customer.arrival_time);
                total_wait += clock - customer.arrival_time;
            }
        }
    }
    printf("전체 대기시간은 %d분 입니다.", total_wait);
    return 0;
}
```

<br><br>

최대한의 설명을 코드 블럭 내의 주석으로 달아 놓았습니다.<br><br>
혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>
긴 글 읽어주셔서 감사합니다. 큐 (Queue) 포스팅을 마칩니다.<br>
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