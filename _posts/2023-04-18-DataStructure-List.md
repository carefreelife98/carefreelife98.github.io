---
title: "Data Structure : (7-1) 리스트 (List)"
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
<img src="/assets/images/INU/listdef.png" alt="listdef_Procdess" width="100%" min-width="200px" itemprop="image">`수식으로 표현된 리스트`<br>
- 지금까지 소개한 리스트로는 어떤 연산을 할 수 있을까?
  - 삽입연산(insert): 리스트에 새로운 항목을 추가한다.
  - 삭제연산(delete): 리스트에서 항목을 삭제한다.
  - 탐색연산(seek): 리스트에서 특정한 항목을 찾는다.
<br><br>

## 리스트 ADT

```
리스트 ADT(Abstract Data Type) - 추상 데이터 타입
```
> 다음은 리스트를 추상데이터 타입으로 정의한 것이다.<br><br>
<img src="/assets/images/INU/ADT.png" alt="ADT_Procdess" width="100%" min-width="200px" itemprop="image">`ADT로 정의된 리스트.`<br><br>

## 리스트의 구현

```
리스트의 구현
```

> **리스트ADT는 배열과 연결리스트를 이용하여 구현이 가능하다.**<br>
- **<span style="color:red">배열</span>**을 이용할 시 구현 과정이 매우 간단해지지만, 크기가 고정(static)된다.<br><br>
- 포인터(~~으윽..~~)를 이용하여 **<span style="color:blue">연결리스트</span>**를 만들어 구현하는 방법은 상대적으로 더 복잡하지만,<br>
malloc 과 포인터의 조합으로 **동적으로 크기를 조정**할 수 있을 뿐 아니라<br>
***<span style="color:green">"책장처럼 원하는 위치에서 자료를 삽입, 삭제, 탐색 할 수 있다."</span>***<br><br>
<img src="/assets/images/INU/ARRvsList.png" alt="ARRvsList_Procdess" width="100%" min-width="200px" itemprop="image">`배열과 리스트의 모습.` `사진출처:`[open4tech](https://open4tech.com/array-vs-linked-list-vs-hash-table/)<br><br>

## 배열로 구현된 리스트 (Array List)

```
배열로 연결리스트를 구현해보자.
```
> - 배열로 리스트를 구현하면 순차적인 메모리 공간이 할당된다.
- 이것을 **<span style="color:green">`리스트의 순차적 표현(Sequential Representation)`</span>**이라고 한다.
<img src="/assets/images/INU/seqrepresentation.png" alt="seqrepresentation_Procdess" width="60%" min-width="200px" itemprop="image">`Sequential Representation`

<br><br>

```
리스트의 정의
```

> - 배열 리스트를 구현하기 위해 배열과 항목의 개수를 구조체로 정의해보자.

```c
#define MAX_LIST_SIZE 100 // 리스트의 최대 크기

typedef int element; // 항목의 정의

typedef struct {
  element array[MAX_LIST_SIZE]; // 배열 정의
  int size; // 현재 리스트에 저장된 항목들의 개수
} ArrayListType;  // 새로운 타입 ArrayListType 정의
```

<br><br>

```
기초 연산 with ArrayList
```

> 
- 모든 연산은 구조체 포인터를 받는다. (함수 내부에서 구조체를 변경할 필요도 있기 때문에)
- 포인터를 사용하지 않으면 복사본이 전달되어 원본 구조체에 영향을 미칠 수 없다.

```c
#include<stdio.h>
#include<stdlib.h>

#define MAX_LIST_SIZE 100 // 리스트의 최대 크기

typedef int element; // 항목의 정의

typedef struct {
  element array[MAX_LIST_SIZE]; // 배열 정의
  int size; // 현재 리스트에 저장된 항목들의 개수
} ArrayListType;  // 새로운 타입 ArrayListType 정의

// 오류 처리 함수
void error(char *message) {
    fprintf(stderr,"%s",message);
    exit(1);
}

// 리스트 초기화 함수
void init_list(ArrayListType *L) {
    L->size = 0;
}

// 리스트가 비어있으면 1, 아니면 0 반환
int is_empty(ArrayListType *L) {
    return L->size == 0;
}

// 리스트가 꽉 차있으면 1, 아니면 0 반환
int is_full(ArrayListType *L) {
    return L->size == MAX_LIST_SIZE;
}

element get_entry(ArrayListType *L, int pos) {
    if(pos < 0 || pos >= L->size) {
        error("pos 위치 오류");
    }
    return L->array[pos];
}

// 리스트 출력
void print_list(ArrayListType *L)
{
	int i;
	for (i = 0; i<L->size; i++)
		printf("%d->", L->array[i]);
	printf("\n");
}

// 리스트에 데이터 추가
void insert_last(ArrayListType *L, element item) {
    if(is_full(L)) {
        error("리스트 오버플로우");
    }
    L->array[L->size++] = item;
}
```

<br><br>

```
배열 리스트의 항목 삽입 연산
```

> - 여기까지는 스택, 큐 ADT와 큰 차이가 없을 것이다.
- 이제 List의 가장 큰 특징인 **<span style="color:blue">자료구조 중간에서의 삽입과 삭제</span>**를 알아보자.
- ArrayList에서 pos위치에 데이터를 추가하려면 어떻게 해야 할까?
  - pos번째부터 마지막 항목까지 한 칸씩 오른쪽으로 이동하여 빈자리를 만든다.
  - 새로운 항목을 pos 위치에 저장한다.
    - (ex.) arr[1] 에 데이터를 추가하려면<br>
    1. arr[4] 데이터 이동-> arr[5],<br>
    2. arr[3] 데이터 이동-> arr[4] ...<br>
    이런 식으로 가장 마지막 항목부터 이동해야 한다.<br>
<img src="/assets/images/INU/arrlistinsert.png" alt="arrlistinsert_Procdess" width="80%" min-width="200px" itemprop="image"><br>`ArrayList의 삽입 과정`<br><br>

```c
//항목 삽입 연산

void insert(ArrayListType *L, int pos, element item) {
    if(!is_full(L) && (pos >= 0) && (pos <= L->size)) {
        // 리스트의 제일 끝 항목부터 항목 이동.
        for(int i = (L->size - 1); i >= pos; i--) {
            L->array[i+1] = L->array[i];
        }
        // pos 위치에 새로운 항목 저장후 현재 List의 크기를 나타내는 size의 크기를 하나 늘려준다.
        L->array[pos] = item;
        L->size++;
    }
}
```

<br><br>

```
배열 리스트의 항목 삭제 연산
```

> - pos 위치의 항목을 삭제하는 delete(list, pos) 를 구현해보자.
- 삽입 함수와 마찬가지로 삭제한 후에 array[pos + 1] 부터 array[size - 1] 까지를 한 칸씩 앞으로 이동하여야 한다.
<img src="/assets/images/INU/arrlistdelete.png" alt="arrlistdelete_Procdess" width="100%" min-width="200px" itemprop="image">`ArrayList의 삭제 연산`<br><br>

```c
//항목 삭제 연산

element delete(ArrayListType *L, int pos) {
    if(pos < 0 && pos >= (L->size)) {
        error("pos 위치 오류");
    }
    // 반환을 위해 pos 위치 항목 임시저장.
    element item = L->array[pos];
    for(int i = pos; i < (L->size-1); i++) {
        L->array[i] = L->array[i+1];
    }
    L->size--;
    return item;
}
```

<br><br>

## 배열 리스트 테스트 프로그램

```
앞서 알아본 배열 리스트를 프로그램을 통해 테스트 해보자.
```

```c
#include<stdio.h>
#include<stdlib.h>

#define MAX_LIST_SIZE 100 // 리스트의 최대 크기

typedef int element; // 항목의 정의

typedef struct {
  element array[MAX_LIST_SIZE]; // 배열 정의
  int size; // 현재 리스트에 저장된 항목들의 개수
} ArrayListType;  // 새로운 타입 ArrayListType 정의

// 오류 처리 함수
void error(char *message) {
    fprintf(stderr,"%s",message);
    exit(1);
}

// 리스트 초기화 함수
void init_list(ArrayListType *L) {
    L->size = 0;
}

// 리스트가 비어있으면 1, 아니면 0 반환
int is_empty(ArrayListType *L) {
    return L->size == 0;
}

// 리스트가 꽉 차있으면 1, 아니면 0 반환
int is_full(ArrayListType *L) {
    return L->size == MAX_LIST_SIZE;
}

element get_entry(ArrayListType *L, int pos) {
    if(pos < 0 || pos >= L->size) {
        error("pos 위치 오류");
    }
    return L->array[pos];
}

// 리스트 출력
void print_list(ArrayListType *L)
{
	int i;
	for (i = 0; i<L->size; i++)
		printf("%d->", L->array[i]);
	printf("\n");
}

// 리스트에 데이터 추가
void insert_last(ArrayListType *L, element item) {
    if(is_full(L)) {
        error("리스트 오버플로우");
    }
    L->array[L->size++] = item;
}

void insert(ArrayListType *L, int pos, element item) {
    if(!is_full(L) && (pos >= 0) && (pos <= L->size)) {
        // 리스트의 제일 끝 항목부터 항목 이동.
        for(int i = (L->size - 1); i >= pos; i--) {
            L->array[i+1] = L->array[i];
        }
        // pos 위치에 새로운 항목 저장후 현재 List의 크기를 나타내는 size의 크기를 하나 늘려준다.
        L->array[pos] = item;
        L->size++;
    }
}

element delete(ArrayListType *L, int pos) {
    if(pos < 0 && pos >= (L->size)) {
        error("pos 위치 오류");
    }
    // 반환을 위해 pos 위치 항목 임시저장.
    element item = L->array[pos];
    for(int i = pos; i < (L->size-1); i++) {
        L->array[i] = L->array[i+1];
    }
    L->size--;
    return item;
}

int main(void)
{
	// ArrayListType를 정적으로 생성하고 ArrayListType를 	
	// 가리키는 포인터를 함수의 매개변수로 전달한다.
	ArrayListType list;

	init_list(&list);		
	insert(&list, 0, 10);	print_list(&list);	// 0번째 위치에 10 추가
	insert(&list, 0, 20);	print_list(&list);	// 0번째 위치에 20 추가
	insert(&list, 0, 30);	print_list(&list);	// 0번째 위치에 30 추가
	insert_last(&list, 40);	print_list(&list);	// 맨 끝에 40 추가
	delete(&list, 0);		print_list(&list);	// 0번째 항목 삭제
	return 0;
}
```


> <img src="/assets/images/INU/arrlisttest.png" alt="arrlisttest_Procdess" width="80%" min-width="200px" itemprop="image"><br>`ArrayList 테스트 결과`<br><br>**😊 해설 😊**<br>
1. 10이 리스트의 0번째 위치에 추가됨.
2. 20이 리스트의 0번째 위치에 추가됨. ▶️ 기존 0번에 있던 10이 한 칸 옆으로 밀린다.
3. insert_last를 사용해 40을 마지막 인덱스에 추가.
4. 30 -> 20 -> 10 -> 40
5. delete 를 호출, 0번째 항목 삭제
6. 20 -> 10 -> 40
{: .notice--success}
{: style="text-align: left;"}







[처음으로~](#){: .btn .btn--primary }



`참고: 나무위키` [Data_Structure](https://namu.wiki/w/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)<br>
<span style="color:grey">`참고: C언어로 쉽게 풀어쓴 자료구조 <개정 3판> 천인국, 공용해, 하상국 지음`</span><br><br><br>


### Task Lists
> 
`[1] 하드웨어의 구조는 2차원 이지만, CPU가 인지하는 것에 있어 논리적 메모리 공간은 1차원임.`
- [x] 자료구조(Data Structure)란?
- [x] 자료형(Data Type)이란?
- [x] 추상적자료형(Abstract Data Type)이란?