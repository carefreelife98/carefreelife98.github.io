---
title: "[Data Structure]<br>정렬(Sort)(2) - 쉘 정렬(Shell Sort) / 합병 정렬(Merge Sort) / 퀵 정렬(Quick Sort)"
categories:
  - INU-DataStructure
  - C
tags:
  - DataStructure
  - Tree
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 

# 쉘 정렬(Shell Sort)의 원리

```
쉘 정렬은 삽입 정렬이 어느 정도 정렬된 배열에 대해서는 대단히 빠른 것에 착안한 방법.
쉘 정렬은 삽입 정렬의 O(n^2) 보다 빠르다.
```

> - 삽입 정렬은 요소들이 이웃한 위치로만 이동 - 이동 횟수가 많음<br>
> - 쉘 정렬 - 리스트를 일정 간격의 부분리스트로 분류 후 삽입 정렬을 이용하여 정렬.
>   - 요소들이 멀리 떨어진 위치로 이동할 수 있음.
> 1. 전체 리스트를 일정 간격(gap)의 부분 리스트로 나눈다.
> 2. 나뉘어진 각각의 부분 리스트를 삽입정렬.
> 3. 모든 부분 리스트가 정렬된 후 전체 리스트를 더 작은 gap을 가진 부분 리스트로 나눠 삽입정렬.
> 4. 위 과정을 부분 리스트의 개수가 1이 될 때까지 반복.<br><br>
> 
> - 부분 리스트는 주어진 리스트의 각 k번째 요소를 추출하여 생성. k = 간격(gap)
>   - 각 단계마다 k가 작아짐, 각 단계마다 부분리스트에 속하는 레코드들의 개수는 그에 상응하여 증가.
>   - 마지막 단계에서는 간격 k의 값이 1이 된다.<br><br>
> 
> <img src="/assets/images/INU/datastructure/ShellSort.png" alt="ShellSort_Procdess" width="100%" min-width="200px" itemprop="image"><br>`쉘 정렬의 모습`<br><br>
> 
> k(gap) = 5
> - 첫번째 부분 리스트 : {10, 3, 16}
> - 두번째 부분 리스트 : {8, 22}
> - 세번째 부분 리스트 : {6, 1}
> - 네번째 부분 리스트 : {20, 0}
> - 다섯번째 부분 리스트 : {4, 15}<br><br>
>
> 각각의 부분 리스트에 대하여 삽입 정렬.
>   - 각각의 부분 리스트들이 정렬되면 전체 리스트도 약간씩 정렬됨.<br><br>
> 
> 부분 리스트 들은 실제로 생성되는 것이 아니고 일정한 간격으로 삽입 정렬을 수행하는 것 뿐.
> - 추가적인 공간의 생성 X
> 
> 한번의 단계가 끝나면 k(gap)의 크기를 1/2 줄여 반복.
> <img src="/assets/images/INU/datastructure/Shell_Sort_process.png" alt="Shell_Sort_process_Procdess" width="100%" min-width="200px" itemprop="image"><br>`쉘 정렬의 과정`<br><br>
> 
> - 부분 리스트의 개수는 k(gap)이 된다.
> - 간격 k는 홀수인 것이 좋기 때문에 짝수이면 +1을 해준다.

<br><br>

# 쉘 정렬의 구현

```c
// 쉘 정렬
// gap 만큼 떨어진 요소들을 삽입 정렬
// 정렬의 범위는 first에서 last

void inc_insertion_sort(int list[], int first, int last, int gap){
    int i, j, key;
    // i : 각 부분리스트 요소의 index
    // 시작점 first 에서 gap만큼 떨어진 위치부터 gap 간격마다의 요소를 부분리스트로 설정
    for(i = first + gap; i <= last; i = i + gap){
        key = list[i];
        for(j = i - gap; j >= first && key < list[j]; j = j - gap){
            list[j + gap] = list[j];
        }
        list[j + gap] = key;
    }
}

void shell_sort(int list[], int n){ // n = size
    int i, gap;
    printf("Shell Sort:\n");
    // gap이 1이 될 때까지 gap / 2해가며 진행
    for (gap = n / 2; gap > 0; gap = gap / 2){
        if(gap % 2 == 0)  // gap은 홀수인것이 좋으므로 짝수이면 + 1
            gap++;
        for (i = 0; i < gap; i++){  // 부분 리스트의 개수는 gap과 같음.
            inc_insertion_sort(list, i, n - 1, gap);
        }

    }
}
```

> <img src="/assets/images/INU/datastructure/ShellSort_rs.png" alt="ShellSort_rs_Procdess" width="50%" min-width="200px" itemprop="image"><br>`쉘 정렬 알고리즘 - 실행 결과`<br><br>
> 
> **쉘 정렬의 분석**
> - 연속적이지 않은 부분 리스트에서 자료의 교환이 일어나면 한번에 더 큰 거리를 이동한다.
> - 부분 리스트의 개수가 1개가 될 때까지 반복한 결과는 대부분의 정렬이 끝난 상태가 된다.
>   - 쉘 정렬은 기본적으로 삽입 정렬을 하며 이때 더욱 빠르게 수행 할 수 있다.
>   - 삽입 정렬은 어느정도 정렬이 된 리스트에 대해 빠르게 정렬할 수 있기 때문이다.
> - 쉘 정렬의 시간 복잡도:
>   - 최악: O(n^2)
>   - 평균: O(n^1.5)

<br><br>

# 합병 정렬(Merge Sort)의 개념

```
합병 정렬(Merge Sort) :

1. 하나의 리스트를 두 개의 균등한 크기로 분할 후 분할된 부분 리스트를 정렬
2. 정렬된 두 개의 부분리스트를 합병하여 전체 리스트를 정렬
```

> 합병 정렬은 Divide and Conquer(분할 정복) 개념에 바탕을 두고 있다.
> - Divide and Conquer(분할 정복) :
>   - 문제를 더 작게 분할해 해결 후 합하여 기존 문제를 해결하는 방식.
> 1. 분할(Divide) : 입력 배열을 같은 크기의 2개 배열로 분할.
> 2. 정복(Conquer) : 부분 배열을 정렬.
>    - 만약 부분 배열의 크기가 충분히 작지 않다면 순환 호출을 이용하여 다시 분할.
> 3. 결합(Combine) : 정렬된 부분 배열들을 하나의 배열에 통합.<br>
>
> <img src="/assets/images/INU/datastructure/MergeSort.png" alt="MergeSort_Procdess" width="100%" min-width="200px" itemprop="image"><br>`합병 정렬 알고리즘의 모습`

<br><br>

# 합병 정렬 예시

```
입력 파일: (27 10 12 20 25 13 15 22)

1. 분할(Divide) : 전체 배열을 (27 10 12 20) 과 (25 13 15 22) 의 2개 부분 배열로 분할
2. 정복(Conquer) : 각 부분 배열 정렬 (10 12 20 27) (13 15 22 25)
3. 결합(Combine) : 2개의 정렬된 부분 배열 통합 (10 12 13 15 20 22 25 27)
```

> <img src="/assets/images/INU/datastructure/MergeSortEx.png" alt="MergeSortEx_Procdess" width="100%" min-width="200px" itemprop="image"><br>`합병 정렬 예시`<br>
> <img src="/assets/images/INU/datastructure/MergeSortProcess.png" alt="MergeSortProcess_Procdess" width="100%" min-width="200px" itemprop="image"><br>`합병 정렬의 전체 과정`

<br><br>

# 합병 정렬(Merge Sort) 알고리즘

```c
// 합병 정렬 알고리즘 - pseudo code

merge_sort(list, left, right)
    // 만약 나누어진 구간의 크기가 1 이상이면
    if left < right 
        mid = (left + right) / 2;         // 중간 위치를 계산한다.
        merge_sort(list, left, mid);      // 앞 부분(left ~ mid) 배열을 정렬
        merge_sort(list, mid + 1, right); // 뒷 부분(mid+1 ~ right) 배열을 정렬 
        merge(list, left, mid, right);    // 정렬된 앞, 뒤 부분 배열을 통합하여 하나의 정렬된 배열 생성
```

> 합병 정렬 알고리즘에서 실질적인 정렬이 이루어지는 부분은 합병(merge) 단계이다.
> - 합병(merge) 알고리즘은 합병 결과를 저장할 추가적인 리스트 하나를 필요로 한다.
> 1. 분할된 리스트의 요소중 더 작은 요소를 새로 생성한 리스트에 추가해 나간다. (비교)
> 2. 두 리스트 중 하나가 끝날 때까지 반복.
> 3. 한 리스트의 요소가 전부 새로운 리스트에 추가되면 남아있는 리스트의 요소들을 그대로 새 리스트에 복사
> 
> <br><br>
> 
> <img src="/assets/images/INU/datastructure/Merge_sort_ process.png" alt="Merge_sort_ process_Procdess" width="100%" min-width="200px" itemprop="image"><br>`합병 정렬 알고리즘 - 과정`<br><br>

<br><br>

# 합병 (merge) 알고리즘

```c
// 합병 알고리즘 (merge) - pseudo code

// 두 개의 인접한 배열 list[left ~ mid] 와 list[mid+1 ~ right]을 합병
merge(list, left, mid, right)
    i ← left;
    j ← mid + 1;
    k ← left;
    sorted[] 배열 생성;
    while i <= mid and j <= right do
        if(list[i] < list[j]
            then
                sorted[k] ← list[i];
                k++;
                i++;
            else
                sorted[k] ← list[j];
                k++;
                j++;
    요소가 남아있는 부분 배열을 sorted로 복사;
    sorted를 list로 복사;
```

> 위의 합병 알고리즘에서 하나의 배열 안에 두 개의 부분 리스트가 있다 가정
> - 왼쪽 부분 리스트의 범위: left ~ mid
> - 오른쪽 부분 리스트의 범위: mid+1 ~ right
> - 합병된 부분 리스트를 임시 저장하기 위해 추가적인 배열 sorted[] 사용<br><br>
>
> <img src="/assets/images/INU/datastructure/MergeSort_mergeAl.png" alt="MergeSort_mergeAl_Procdess" width="100%" min-width="200px" itemprop="image"><br>`합병 정렬 알고리즘 - merge()`

<br><br>

# 합병 정렬의 구현

> 1. merge_sort() 함수에서 주어진 list 배열을 2등분 하여 각각의 부분 배열에 대해 재귀 호출.
> 2. 부분 배열에 요소가 하나 남을 때까지 재귀 호출.
> 3. 분할 과정이 끝나면 merge() 함수에서 비교 및 합병 과정을 실행. (실제 정렬이 실행되는 함수)
> 4. 비교 및 합병 후 정렬된 복사본 리스트를 기존 리스트에 복사.

```c
// 합병 정렬
int sorted[MAX_SIZE]; // 정렬 및 합병되어질 공간 생성

/* 
i 는 정렬된 왼쪽 리스트에 대한 인덱스
j 는 정렬된 오른쪽 리스트에 대한 인덱스
k 는 정렬될 리스트에 대한 인덱스
*/
void merge(int list[], int left, int mid, int right){
    int i, j, k, l;
    i = left; j = mid + 1; k = left;

    // 각 부분 리스트에 대하여 sorted 배열에 정렬
    // 두 부분 리스트 중 하나의 요소가 전부 사용될 때까지.
    while (i <= mid && j <= right){
        if(list[i] <= list[j])
            sorted[k++] = list[i++];
        else
            sorted[k++] = list[j++];
    }
    // 남아 있는 요소의 일괄 복사 to sorted[]
    if(i > mid) // 오른쪽 리스트가 남아있을 시
        for(l = j; l <= right; l++)
            sorted[k++] = list[l];
    else    // 왼쪽 리스트가 남아있을 시
        for(l = i; l <= mid; l++)
            sorted[k++] = list[l];
    // 배열 sorted[] 의 요소를 배열 list[] 로 재 복사.
    for(l = left; l <= right; l++){
        list[l] = sorted[l];
    }
}

void merge_sort(int list[], int left, int right){
    int mid;
    if(left < right){
        mid = (left + right) / 2;   // 리스트의 중간 인덱스 찾기

        // 왼 부분 리스트 생성 가장 왼쪽 인덱스(0) ~ 중간 인덱스(mid) 
        merge_sort(list, left, mid);

        // 오른 부분 리스트 생성 중간 바로 다음 인덱스 (mid+1) ~ 가장 오른쪽 인덱스(right)
        merge_sort(list, mid + 1, right);

        // 부분 리스트의 정렬 및 합병
        merge(list, left, mid, right);
    }
}
```

> <img src="/assets/images/INU/datastructure/Merge_sort_rs.png" alt="Merge_sort_rs_Procdess" width="50%" min-width="200px" itemprop="image"><br>`합병 정렬 알고리즘 - 실행 결과`

<br><br>

# 합병 정렬의 복잡도 분석

> 합병 정렬은 순환 호출로 구성된다.<br>
> - **비교 횟수: O(n) X h(트리의 높이 == 순환 호출의 깊이)**
>   - 완전 이진 트리의 leaf 노드 개수 세는 것과 비슷하다.
>   - n : leaf 노드의 개수.
>   - h : log_2 n == 합병의 횟수(순환 호출의 깊이)
> - 배열이 부분 배열로 나누어지는 단계에서는 비교 / 이동 연산이 수행되지 않는다.
>   - **부분 배열이 합쳐지는 merge() 함수에서 비교 및 이동 연산이 실행됨**.
>   - 순환 호출의 깊이 만큼의 합병 단계가 필요하다.
>     - 따라서, 순환 호출의 깊이(h = log_2 n) X 비교 연산(n)
>       == **O(n * log_2 n)**
> - 이동 횟수:
>   - 총 부분 배열에 들어있는 요소가 n개 라고 한다면, 레코드의 이동이 2n 번 발생.
>   - 비교와 마찬가지로 합병 단계 만큼의 이동이 필요하므로 O(2n * log_2 n)
> - **결국 합병 정렬의 시간복잡도는 O(n * log_2 n)으로 나타낼 수 있다.**
> - 합병 정렬의 장점 :
>   - **합병 정렬은 정렬간에 같은 값은 기존 위치를 유지하는 안정적인 알고리즘 이다.**
>   - **입력되는 데이터의 성질에 상관없이 최악, 평균, 최선 모두 O(n * log_2 n)의 시간 복잡도를 가진다.**
> - 합병 정렬의 단점:
>   - 추가적인 임시 배열의 공간을 필요로 함.
>   - 레코드의 크기가 큰 경우, 이동 횟수가 많으므로 큰 시간적 낭비.
>     - 레코드를 연결 리스트로 구성한다면, 데이터의 이동은 무시할 수 있을 정도로 작아짐.
>     - 이 경우, 합병 정렬은 그 어떤 정렬 알고리즘보다 효율적임.

<br><br>

# 퀵 정렬의 개념 (Quick Sort)









> <img src="/assets/images/INU/datastructure/ShellSort_rs.png" alt="ShellSort_rs_Procdess" width="50%" min-width="200px" itemprop="image"><br>`쉘 정렬 알고리즘 - 실행 결과`<br><br>



<!-- > > 
`참고:`[Inflearn - 김영한님_강의](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)<br><br>


`사진출처:`[]()
<span style="color:green">``</span>

```

```
> 
{: .notice--danger}
{: style="text-align: center;"}


<details>
<summary><span style="color:blue">(클릭)</span></summary>
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

<span style="color:grey">`참고: C언어로 쉽게 풀어쓴 자료구조 <개정 3판> 천인국, 공용해, 하상국 지음`</span><br><br><br>

### Task Lists

>

- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 