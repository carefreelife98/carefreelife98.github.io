---
title: "Data Structure : (7-2) 연결 리스트 (Linked-List)"
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

## 연결리스트 (Linked List)
```
연결리스트(Linked List)?
```

> <img src="/assets/images/INU/linkedlist.png" alt="linkedlist_Procdess" width="100%" min-width="200px" itemprop="image">`Linked-List의 모습` `사진출처:`[isaaccomputerscience](https://isaaccomputerscience.org/concepts/dsa_datastruct_linked_list)<br><br>
- 추상적 자료형인 `리스트를 구현한 자료구조`.<br>
- Linked List라는 말 그대로 어떤 데이터 구조체(= 노드 Node)를 저장할 때 <br>
<span style="color:green">`다음 순서의 자료가 있는 위치를 데이터에 포함`</span>시키는 방식으로 자료를 저장한다.<br>
```
예를 들어 한 반에 있는 학생들의 자료를 저장한다면, 학생 하나하나의 신상명세 자료를 노드로 만들고,
1번 학생의 신상명세 자료에 2번 학생 신상명세가 어디있는지 표시를 해 놓는 방식이다. 
쉽게 생각하면 자료를 비엔나 소시지마냥 줄줄이 엮어놓은 것이다.
```
> ## **연결된 표현 - Linked Representation**
    - 리스트의 항목들을 노드(node)라고 하는 곳에 분산하여 저장한다.
    - 분산된 노드들을 포인터로 연결하여 하나로 묶는 방법이 바로 연결리스트(Linked List)이다.
    - 노드(node)는 데이터 필드와 링크 필드로 구성된다.
        - 데이터 필드 : 리스트의 원소(데이터) 값을 저장하는 곳.
        - 링크 필드 : 다른 노드의 주소값을 저장하는 장소. (포인터로 구현)<br><br>
<img src="/assets/images/INU/linkedliststruct.png" alt="linkedliststruct_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Linked Representation - 연결된 표현` 
<br><br>
>
**연결 리스트의 삽입 및 삭제 연산**<br>
- 연결리스트에서는 이전에 알아본 배열리스트와 다르게 리스트 곳곳에서의 데이터 저장 및 삭제가 용이하다.
- 연결리스트의 중간에 데이터를 삽입시 주변 데이터의 위치를 이동할 필요 없이 포인터로 연결된 노드 사이의 '줄(링크)'만 바꾸어 주면 된다.
- 데이터(노드) 삭제 시에도 마찬가지로 삭제할 노드에 연결되어 있는(줄 - 링크)만 수정해주면 된다.
- 여러 개의 연결리스트를 구분하려면 첫번째 데이터(노드)만 알 수 있으면 된다.<br>
첫번째 데이터를 따라 연결된 모든 데이터를 찾을 수 있기 때문이다.
<img src="/assets/images/INU/linkedinsert.png" alt="linkedinsert_Procdess" width="50%" min-width="200px" itemprop="image"><img src="/assets/images/INU/linkeddelete.png" alt="linkeddelete_Procdess" width="50%" min-width="200px" itemprop="image">
<br>`연결리스트의 삽입 및 삭제 연산의 모습` <br><br>

## 연결 리스트의 구조
>
노드(node)?
- 노드는 연결리스트를 구성하는 원소이고, 연결리스트는 노드들의 집합이다.
- 노드는 메모리의 어느 위치에서든 존재할 수 있고, 같은 연결리스트 내에서 연결되어 있는 다른 노드로 가기 위해서는 현재 노드가 가지고 있는 링크 필드(link)에 저장되어 있는 다음 노드의 주소를 사용해 이동할 수 있다.
- 노드의 데이터 필드에는 다양한 종류(int, struct...etc)의 데이터가 저장될 수 있다.
- 노드의 링크 필드에는 다음 노드를 가리키는 포인터가 저장되어 있다.
    - 현재 노드는 이 포인터를 사용하여 다음 노드로 이동할 수 있다.
    - 마지막 노드의 link필드는 NULL로 설정. (다음 노드가 없기 때문에)
- 연결리스트의 노드들은 필요할 때마다 malloc()을 이용하여 동적으로 생성된다.
헤드 포인터?
- 연결리스트에서는 첫번째 노드를 알아야 만이 전체 노드를 찾아갈 수 있다.
    - 따라서 연결리스트 마다 첫번째 노드를 가리키고 있는 헤드 포인터 변수가 존재한다.
<img src="/assets/images/INU/structnode.png" alt="structnode_Procdess" width="80%" min-width="200px" itemprop="image"><br>`연결리스트 노드의 구조`<br><br>

## 연결 리스트의 종류
>
<img src="/assets/images/INU/kindoflinkedL.png" alt="kindoflinkedL_Procdess" width="100%" min-width="200px" itemprop="image"><br>`연결리스트의 종류`<br><br>
- 단순 연결 리스트(Singly Linked List) : 한 방향으로만 연결되어 있는 리스트이다.
    - 마지막 노드의 link는 NULL을 가리킨다.
    - 체인(chain)이라고도 한다.
- 원형 연결 리스트(Circular Linked List) : 단순 연결 리스트와 같지만 마지막 노드의 link가 첫번째 노드를 가리킨다.
    - 처음과 끝노드의 접근성이 용이해져 데이터 간의 연산 속도가 빠르다.
- 이중 연결 리스트(Doubly Linked List) : 각 노드마다 link 필드가 두 개씩 존재한다.
    - llink는 노드 기준 좌측 노드의 주소를 가진다.
    - rlink는 노드 기준 우측 노드의 주소를 가진다.

## 단순 연결리스트









<br><br>

## 연결리스트의 구현 with C Delete_same_nodes
```
C 언어를 활용하여 연결리스트를 생성하고, 알고리즘에 따라 제거해보자.
```

> 군 제대 복학 후 4년만에 자료구조 전공 강의에서 마주친 C언어..<br>
있지도 않은 기억을 되짚어가며 구글링, TA님, 전공 책 등의 도움으로 간신히 구현에 성공했다..
<br>~~중간에 꺾일 뻔 했다 진심으로...;;~~ <br>
***<span style="color:blue">`지금부터 그 극악무도한 과정을 함께 살펴보자`</span>***

( 아는 것이 없어 처음엔 수업듣기도 벅차고 어려웠으나 1주 정도 오기로 구현해내고 난 후에 <br>
자료구조 수업듣는데에 많은 도움이 된 것 뿐만 아니라 큰 자극이 되었던 과제이다.<br>
막상 구현하고 나니 그렇게 많은 시간을 쏟을 문제가 아니었던것 같다.<br>
하지만 이 또한 내 자신이 그만큼 성장을 했고 보이는 것이 많아졌기 때문이라는 확신이 든다.<br>
본인이 자료구조 수업을 처음 접하거나 C언어, 특히 포인터를 잘 모른다면<br>
개인적으로 꼭 자신의 힘으로 혼자 구현해보길 추천한다. 😊)
{: .notice--success}
{: style="text-align: center;"}

<br><br>

```
delete_same_nodes 의 구현
```

> <h1>🔥 <span style="color:red">문제</span> 🔥</h1><br>
```
단순 연결 리스트에 0~99 사이의 임의의 정수 한 개를 가진 노드를 생성하여 
리스트의 끝에 집어넣는 일을 100번 반복해보자.
이렇게 생성된 단순 연결리스트를 처음부터 탐색하여
만약 숫자가 중복된다면 해당 노드를 삭제한다.
예를 들어 11 -> 7 -> 2 -> 11 -> 9 ... 라면
11이 중복되므로 11 -> 7 -> 2 -> 9... 가 된다.
이렇게 생성된 단순 연결 리스트의 숫자들을 처음부터 끝까지 출력해보시오.
```
{: .notice--info}
{: style="text-align: center;"}

<br><br>

```
여기서부터 코드를 토글리스트(접기 / 펼치기)로 구현 해두었습니다.
각 순서를 보고 자신의 힘으로 작성해보신 이후에 펼쳐 보시면 좋을 것 같습니다!!
아래 목차별로 클릭하시면 코드가 나옵니다.
```

<details>
<summary><h1><span style="color:blue">1. List 와 Node 형식 정의 (클릭)</span></h1></summary>
<div markdown="1">

<br>

```c
#include<stdio.h>
#include<stdlib.h>
#include<time.h>

typedef int element; //node에 담길 데이터 타입의 변수 정의

// 리스트의 node를 구조체 형식으로 정의. 
// 각 node는 int형 타입으로 정의 된 element 타입의 data와
// 다음 노드의 주소를 가지고 있는 link 변수를 가지고 있다.
// (ListNode 구조체의 link 변수는 다음 '노드'를 가리키므로 
// 자신과 같은 타입인 ListNode 구조체 타입을 가지고 있다.)
typedef struct {
    element data;
    struct ListNode* link;
} ListNode;

// List의 타입을 정의.
// ListType 이라는 구조체에 List의 정보를 담는다.
// List의 크기를 나타내는 int형 변수 size와
// List에 구현될 처음과 끝 노드를 가리키는 ListNode* head, ListNode* tail 변수를 가진다.
typedef struct {
    int size;
    ListNode* head;
    ListNode* tail;
} ListType;
```

</div>
</details>

<details>
<summary><h1><span style="color:blue">2. 단순 연결리스트의 ADT (클릭)</span></h1></summary>
<div markdown="1">       

```c
// header 노드를 사용하여 head 부터 tail까지의 data 값을 출력.
void print(ListType* plist)
{
	ListNode* p = plist->head;

	printf("Structure of Related List: ");
	for (; p; p = p->link) {
		printf("%d->", p->data);
	}
	printf("\n");
}

// 오류함수
void error(char *message){
    fprintf(stderr, "%s\n", message);
    exit(1);
}

// 헤더 노드 생성
ListType* create() {

    ListType *L = (ListType *)malloc(sizeof(ListType));
    if(L == NULL) {
        error("헤더 노드 메모리 할당 오류");
    }
    L->head = L->tail = NULL;
    L->size = 0;
    return L;
}

// 생성된 노드를 탐색하여 같은 data값을 가진 노드를 삭제한다.
int deleteSame(ListType *L, ListNode *n){
    // 임시 노드 세 개 생성.
    // x : 첫번째 루프에서 기준 노드로 잡고 x와 같은 데이터 값을 가진 노드를 찾는다.
    // y : 두번째 루프에서 기준 노드인 x와 같은 중복 노드가 있는지 x 이후의 노드 전체를 탐색한다.
    // temp : 중복 노드 y 발견 시, 노드 y 삭제 전 반환할 y의 data와 할당된 메모리를 위해 y의 주소를 가리키고 있는다.
    ListNode *x, *y, *temp;
    int sum = 0;

    // 파라미터로 받은 노드 n를 임시노드 x에 복사.
    x = n;

    // 첫번째 루프. 파라미터로 받은 노드가 없거나 
    // 해당 노드가 마지막 노드가 아닐때까지 루프.
    // 이 노드 x와 같은 값을 가진 노드를 리스트의 처음부터 끝까지 탐색하여 찾는다.
    while(x != NULL && x->link != NULL){

        // 두번째 임시노드 y도 파라미터로 들어온 노드를 가리킨다.
        // y 포인터를 이용해 x노드와 같은 값을 가진 노드를 다음 루프에서 탐색한다.
        y = x;

        // 노드 x부터 마지막 노드까지 턴마다 다음노드를 가리킨다.
        while(y->link != NULL){

            //처음 x가 가리키고 있는 노드와 다음 노드의 data 값이 같은지를 y를 다음 노드 역할을 수행시켜 비교.
            //만약 현재 노드와 다음노드의 data가 같다면,
            if(x->data == y->link->data){

                //세번째 임시 노드인 temp에 중복 노드인 y의 주소를 가리키도록 해놓는다.
                // 후에 노드 y가 삭제되면 반환할 y의 데이터와 할당된 메모리를 찾지 못하기 때문에 임시 저장용도. 
                temp = y->link;

                // 이후, 중복노드 y의 다음 노드 와의 연결(y->link)을 끊고 
                // 다다음노드와 연결한다.(y->link->link)
                y->link = y->link->link;
                printf("중복 노드 제거: %d \n", temp->data);
                sum += 1; // 중복노드의 총 개수 파악용

                L->size--; // 리스트 사이즈 -1 갱신

                // 그 후, 연결이 끊어진 중복노드 y에게 할당된 메모리 반환을 위해
                // y의 주소를 임시 저장해둔 temp를 사용하여 y의 메모리 반환을 해준다.
                free(temp);
            }
            //만약 중복노드가 아니라면, y는 그 다음 노드로 연결되어 중복 노드인지 확인할 준비를 한다.
            else{
                y = y->link;
            }
        }
        //한 노드 x의 중복 검사가 tail까지 완료되면 x를 다음 노드로 연결해 다음 비교 준비를 한다.
        x = x->link;
    }return sum; // 중복 노드의 총 개수를 반환한다.
}


// 노드 생성 및 리스트의 뒤로 추가
void insert_last(ListType *L, int data){

    // 동적 할당된 노드 생성
    ListNode *N = (ListNode *)malloc(sizeof(ListNode));
    
    if(N == NULL) {
        error("메모리 할당 에러");
    }
    // 파라미터로 받은 난수 n을 신규 생성된 노드의 data 필드에 넣어준다.
    N->data = data;

    // 가장 마지막에 삽입되는 노드는 다음 노드가 없기 때문에 link 필드가 null 이다.
    N->link = NULL;

    // 만약 헤더 노드의 tail이 NULL(아무것도 가리키고 있지 않음)이라면 
    // 가장 처음 추가된 노드이기 때문에 해당 노드는 리스트에서 처음이자 끝 노드가 된다.
    // 그러므로, 헤더노드 L의 head, tail 필드 둘 다 노드 N을 가리키고 있어야 한다.
    if(L->tail == NULL) {
        L->head = L->tail = N;
    }

    // 헤더 노드가 가리키고 있는 것이 있다면, 그 순간부터는 노드가 두 개 이상이므로
    // 헤더 노드의 head 필드와 tail 필드가 같지 않다.
    // 즉 마지막 노드를 가리키고 있는 tail의 link 필드가 새로 생성된 노드 N을 가리키도록 한다.
    // 이후 변경된 tail 필드를 갱신 해준다. (L->tail = N)
    else {
        L->tail->link = N;
        L->tail = N
    }
    // 노드가 하나 생성되었으므로 리스트의 size++
    L->size++;
}
```

</div>
</details>


<details>
<summary><h1><span style="color:blue">3. main 함수 (클릭)</span></h1></summary>
<div markdown="1">       

```c
int main() {
    //헤더노드 선언
    ListType *listHeader;

    //헤더노드 생성
    listHeader = create();

    //난수 초기화
    srand(time(NULL));

    //insert_last 함수를 100번 시행하여 100개의 (random data 값을 가진) 노드가 있는 연결리스트 구현.
    for(int i = 0; i<100; i++){
        insert_last(listHeader, rand() % 100);
    }

    // 구현된 연결리스트 확인용
    print(listHeader);
    printf("\n 리스트 사이즈: %d \n", listHeader->size);

    // 아래에 중복이 제거된 연결리스트 출력
    printf("\n----------- delete duplicate node  -----------\n");

    //중복 제거 함수 실행
    printf("\n 중복 노드의 총 개수는 : %d 개 입니다. \n", deleteSame(listHeader, listHeader->head));

    //최종 연결리스트 확인용
    printf("\n 현재 리스트 사이즈: %d \n", listHeader->size);
    print(listHeader);
    //종료
    return 0;
}
```

</div>
</details>

> <img src="/assets/images/INU/deletesamenodes.png" alt="deletesamenodes_Procdess" width="100%" min-width="200px" itemprop="image"><br>`DeleteSameNodes 실행 결과` <br><br>













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