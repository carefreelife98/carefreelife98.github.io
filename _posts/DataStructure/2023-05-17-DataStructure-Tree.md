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
>         - (루트의 레벨은 책 및 사람마다 0부터 시작하는 경우도 있다고 한다.)
>       - A의 레벨은 1, B의 레벨은 2이다.
>   - **트리의 높이(height)** : 트리가 가지고 있는 최대 레벨
>     - 위 트리의 레벨은 3. 
>     - 트리들의 집합 : Forest









    
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