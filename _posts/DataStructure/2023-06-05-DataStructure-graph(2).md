---
title: "Data Structure - 그래프 (Graph) (2)"
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

# 신장 트리 (Spanning Tree) 란?

> <img src="/assets/images/INU/datastructure/Spanning_Tree.png" alt="Spanning_Tree_Procdess" width="100%" min-width="200px" itemprop="image"><br>`신장 트리의 모습`<br>
> 
> **신장 트리(Spanning Tree)** : 그래프 내의 모든 정점을 포함하는 트리.
> - 트리(Tree)의 특수한 형태이다.
> - 모든 정점들이 연결되어 있어야 하며 동시에 사이클(Cycle)을 포함해서는 안된다.
> - 따라서 신장 트리는 그래프에 있는 n개의 정점을 정확히 n - 1 개의 간선으로 연결하게 된다.
> - 하나의 그래프에는 여러 개의 신장 트리가 존재 가능하다.
> - 깊이 우선 탐색(DFS)이나 너비 우선 탐색(BFS) 도중에 사용된 간선을 모아 표시하면 만들 수 있다.
> - 신장 트리는 그래프의 최소 연결 부분 그래프가 된다.

```c
// 신장 트리의 알고리즘 (pseudo code)
depth_first_search(v):
    v를 방문 되었다고 표시;
    for all u ⍷ (v에 인접한 정점) do
        if(u가 아직 방문되지 않았으면)
            then (v, u)를 신장 트리 간선이라고 표시;
                depth_first_search(u)
```

<br><br>

# 최소 비용 신장 트리 (MST : Minimum Spanning Tree) 란?

> **최소 비용 신장 트리** : 신장 트리 중에서 사용된 간선들의 가중치 합이 최소인 신장 트리.
> <img src="/assets/images/INU/datastructure/MST.png" alt="MST_Procdess" width="100%" min-width="200px" itemprop="image"><br>`최소 신장 트리의 모습`<br>
> - 네트워크에 있는 모든 정점들을 가장 적은 수의 간선과 비용으로 연결.
> - MST의 응용
>   - 도로 건설, 전기 회로, 통신, 배관
> <img src="/assets/images/INU/datastructure/MST_EX.png" alt="MST_EX_Procdess" width="100%" min-width="200px" itemprop="image"><br>`최소 신장 트리의 예`<br>

<br><br>

# Kruskal 의 MST 알고리즘

> Kruskal Algorithm은 탐욕적인 방법(Greedy method)을 사용한다.
> - Greedy Method(탐욕적인 방법)
>   - 주요 알고리즘 설계 기법
>   - 각 단계에서의 최선책을 선택하는 과정을 반복하여 최종적인 해답에 도달.
>   - 탐욕적인 방법은 항상 최적의 해답을 주는지 검증 필요.
>   - Kruskal MST Algorithm은 최적의 해답임이 증명되어 있다.<br>
```c
// Kruskal의 MST 알고리즘 (pseudo code)

// 입력: 가중치 그래프 G = (V, E), n은 노드의 개수.
// 출력: E_T, 최소 비용 신장 트리를 이루는 간선들의 집합.
kruskal(G)
    E를 w(e_1) <= ... <= w(e_e) 가 되도록 정렬.
    E_T ← ⏀; ecounter ← 0
    k ← 0
    while ecounter < (n-1) do
        k ← k + 1
        if(E_T U {e_k} 가 사이클을 포함하지 않으면
            then E_T ← E_T U {e_k}; ecounter ← ecounter + 1
    return E_T 
```

> - Kruskal 알고리즘
> - MST가 최소 비용의 간선(n-1)으로 구성됨과 동시에 사이클을 포함하하지 않는다는 조건에 근거
>   - 각 단계에서 사이클을 이루지 않는 최소 비용 간선을 선택.
> 1. 그래프의 간선들을 가중치의 오름차순으로 정렬.
> 2. 정렬된 간선의 리스트에서 사이클을 형성하지 않는 간선을 탐색.
> 3. 만약 해당 간선이 사이클을 형성한다면 PASS 한다.
>    - 해당 간선이 이미 다른 경로에 의해 연결되어 있는 정점들을 연결할 때 사이클이 형성된다.
> 4. 현재까지의 MST의 집합에 해당 간선을 추가.
> 5. 위 과정을 간선의 개수가 정점의 개수보다 하나 작을 때까지 반복한다. (간선의 개수 : n-1)




<!-- > <img src="/assets/images/INU/datastructure/graph_map.png" alt="graph_map_Procdess" width="100%" min-width="200px" itemprop="image"><br>`그래프의 예 : 서울 지하철 노선의 모습`<br>
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

`참고:`[Inflearn - 김영한님_강의](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)<br><br>

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