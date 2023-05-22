---
title: "DataStructure - Tree(자료구조 - 트리란?)"
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
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 


# 1. 트리의 개념 (Tree)

```
1-1. 트리의 개념
```

<img src="/assets/images/INU/datastructure/tree-in-data-structure.png" alt="tree-in-data-structure_Procdess" width="40%" min-width="200px" itemprop="image">
<img src="/assets/images/INU/datastructure/treeandelse.png" alt="treeandelse_Procdess" width="50%" min-width="200px" itemprop="image"><br>[이미지 출처](https://www.scaler.com/topics/data-structures/tree-data-structure/)`자료 구조의 트리(Tree). 나무를 거꾸로 엎어놓은 것 같은 모습을 하고 있다.`<br><br>

> 이전에 배운 선형 자료 구조와 달리 데이터 간의 계층이 존재한다면<br> 
> **우리는 트리(Tree)라는 자료구조를 사용해야 한다.**
>  - 부모 - 자식 관계를 가진 노드들로 이루어져 있다.
>  - 계층적인 자료구조(hierarchical structure):
>    - 트리(Tree) 
>    - 가계도, 컴퓨터의 디렉토리 구조 등
>  - 선형 자료 구조 (linear data structure): 
>    - 리스트, 스택, 큐 등

**요즘 가장 큰 이슈가 되고 있는 인공지능(AI)도 트리를 사용한다.**<br> 
**대표적인 것이 결정 트리(decision tree)이다.**<br>
**결정 트리는 인간의 의사 결정 구조를 표현하는 한 가지 방법이다.**<br>
{: .notice--info}
{: style="text-align: center;"}

<br><br>

```
1-2. 트리의 용어
```

> <img src="/assets/images/INU/datastructure/treeWords.png" alt="treeWords_Procdess" width="80%" min-width="200px" itemprop="image"><br>`트리(Tree)의 모습.`<br><br>
> - 트리는 한 개 이상의 노드로 이루어진 유한 집합.
> - 트리의 최상단에 위치하는 하나의 노드는 루트노드(Root Node)라고 불리며,<br>
> - 그 하위의 나머지 노드들은 서브트리(Sub Tree) 라고 불린다.
>   - **노드 (node)** : A, B, C, D, E, F, G, H, I, J
>     - 루트 노드 : A
>     - A의 서브 트리 : {B, E, F, G}, {C, H}, {D, I, J} 와 같은 3개의 집합.
>     - B의 서브 트리 : {E}, {F}, {G}
>       - 위 처럼 루트 노드와 서브 트리는 자식 노드가 존재 하는 한 하위로 내려가며 계속 분류된다.
>   - **간선 (Edge)** : 루트와 서브 트리를 잇는 선.
>     - 노드들 간에는 부모 관계, 형제 관계, 조상 관계가 존재.
>       - A는 B의 부모 노드(Parent node)가 된다.
>       - 마찬가지로 B는 A의 자식 노드(Children node)가 된다.
>       - B, C, D는 형제 관계(Sibling)이다.
>       - 조상 노드(Ancestor node) : 루트 노드에서 임의의 노드 까지의 경로를 이루고 있는 노드들.
>       - 후손 노드(Descendent node) : 임의의 노드 하위에 연결된 모든 노드들. (어떤 노드의 서브 트리에 속하는 모든 노드들)
>       - 단말 노드(Terminal node / Leaf node) : 자식 노드가 없는 트리의 최하위 노드. (<--> 비단말 노드)
>   - **노드의 차수(degree)** : 어떤 노드가 가지고 있는 자식 노드의 개수.
>     - (A의 경우 B, C, D의 세 자식을 가지고 있으므로 deg(A) = 3 이 된다.)
>     - 단말 노드의 경우 자식이 없으므로 차수는 0이 된다.
>     - 트리에서의 레벨(level)은 트리의 각 층에 번호를 나타낸다.
>       - 루트의 레벨은 1이고, 한 층씩 내려갈수록 레벨은 1씩 증가한다.
>         - (루트의 레벨은 책 및 사람마다 0부터 시작하는 경우도 있다.)
>       - A의 레벨은 1, B의 레벨은 2이다.
>   - **트리의 높이(height)** : 트리가 가지고 있는 최대 레벨
>     - 위 트리의 레벨은 3. 
>     - 트리들의 집합 : Forest

<br><br>

```
1-3. 트리의 종류
```

> 트리의 종류에는 크게 이진 트리(binary tree)와 일반 트리가 있다.

<br><br>

# 이진 트리의 소개 (Binary Tree)

> ```java
> -----------------------------------------------------
> 이진 트리는 다음과 같이 정의된다.
> -----------------------------------------------------
> 1. 공집합이거나, 
> 2. 루트와 왼쪽 서브 트리, 오른쪽 서브 트리로 구성된 노드들의 유한 집합.
> 3. 이진 트리의 서브 트리들은 모두 이진 트리여야 함. 
> -----------------------------------------------------
> ```

<img src="/assets/images/INU/datastructure/Btreevalidation.png" alt="Btreevalidation_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 트리의 검증` <br><br>

- 이진 트리 :
  - 모든 노드가 2개의 서브 트리를 가지고 있는 트리.
    - 서브 트리는 공집합일수 있다.
    - 일반 트리와는 다르게 이진트리는 노드를 하나도 갖지 않을 수도 있다.
  - 이진트리의 노드에는 최대 2개 까지의 자식 노드가 존재한다.
  - 모든 노드의 차수가 2 이하. -> 구현하기가 편리한 장점
  - 이진 트리에는 서브 트리간의 순서가 존재한다.
    - 왼쪽 서브트리와 오른쪽 서브트리를 구분한다.

<br><br>

```
2-1. 이진 트리의 성질
```

> <img src="/assets/images/INU/datastructure/btreelogic.png" alt="btreelogic_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 트리의 성질 1`<br>

- 노드의 개수가 n개 이면 간선(edge)의 개수는 n-1 개.
  - [why ?]
  - 이진트리에서의 노드는 루트를 제외하면 정확하게 하나의 부모 노드를 가진다.
  - 부모와 자식 간에는 정확하게 하나의 간선만이 존재 하므로 간선의 개수는 항상 n-1 개가 된다.

<br><br>

> <img src="/assets/images/INU/datastructure/btreelogic2.png" alt="btreelogic2_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 트리의 성질 2`<br>

- **높이가 최대 h인 이진트리**의 경우, **최소 h개의 노드**를 가지며 **최대 2^h-1개의 노드**를 가진다.
  - [why ?]
  - 한 레벨에는 적어도 하나의 노드가 존재.
  - 높이가 h인 이진트리는 적어도(최소) h개의 노드를 가진다. = 경사 이진트리
  - 하나의 노드는 최대 2개의 자식 노드를 가질 수 있다.
    - 따라서, **레벨 i에서의 최대 노드 개수는 2^(i-1)** 이 된다.
    - 그러므로, 아래와 같이 전체 노드의 최대 개수를 구할 수 있는 식이 완성된다.
      <img src="/assets/images/INU/datastructure/maxnodecal.png" alt="maxnodecal_Procdess" width="30%" min-width="200px" itemprop="image"><br>`이진 트리의 최대 노드 개수 (전체)`<br>

<br><br>

> <img src="/assets/images/INU/datastructure/btreelogic3.png" alt="btreelogic3_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 트리의 성질 3` <br>

- n개의 노드를 가지는 이진 트리의 높이
  [why ?]
  - 최대 n
    - 레벨 당 최소 하나의 노드가 존재 해야 하므로 n개의 노드 존재 시 가능한 최대 높이는 n이다.
  - 최소 ⌈log(n+1)⌉
    - 높이 h의 이진 트리가 가질 수 있는 노드의 최대값은 2^h - 1
    - n <= 2^h - 1 의 부등식이 성립 할 수 있다.
    - 양 변에 log를 취하여 정리 : h >= log(n+1)
    - h는 정수이어야 하므로 h >= ⌈log(n+1)⌉ 와 같이 올림 연산을 취해준다.

<br><br>

```
2-2. 이진 트리의 분류
```

> <img src="/assets/images/INU/datastructure/kindofbtree.png" alt="kindofbtree_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 트리의 분류` <br>

<h3>1. 포화 이진 트리 (full binary tree)</h3>

> <img src="/assets/images/INU/datastructure/maxbtree.png" alt="maxbtree_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 트리의 분류` <br>

- 말 그대로 이진 트리의 각 레벨 마다의 최대 노드 만큼 꽉 채워져 있는 이진트리이다.
  - 높이가 k인 포화 이진트리는 정확히 2^k - 1 개의 노드를 가진다.
  - 일반적으로 포화이진트리의 노드 개수는 아래와 같이 계산된다.
    - <img src="/assets/images/INU/datastructure/maxbtreecal.png" alt="maxbtreecal_Procdess" width="70%" min-width="200px" itemprop="image"><br>`포화 이진 트리에서의`<br>`전체 노드 개수 = 2^(1-1) + 2^(2-1) + 2^(3-1) + 2^(4-1) = 2^4 - 1 = 15` <br>
  - 포화 이진 트리는 위 사진과 같이 번호를 붙일 수 있으며, 레벨 단위로 왼쪽에서 오른쪽으로 부여한다.
    - 포화 이진 트리에서의 번호는 항상 일정하다. - 루트 노드의 오른쪽 자식 번호는 항상 '3'이다.  






    
<!-- > <img src="/assets/images/INU/datastructure/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>`DeleteSameNodes 실행 결과` <br><br>
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