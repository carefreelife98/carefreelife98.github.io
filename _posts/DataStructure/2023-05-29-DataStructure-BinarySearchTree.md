---
title: "Data Structure - 이진 탐색 트리 (Binary Search Tree) 란?"
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

# 이진 탐색 트리 (Binary Search Tree) 란?

```
이진 탐색 트리 (Binary Search Tree) 는 이진 트리 기반의 탐색을 효율적으로 하기 위한 자료 구조.
  - 모든 원소의 key는 유일한 key를 가진다.(Primary Key)
  - 왼쪽 서브 트리 key들은 루트 key보다 작다.
  - 오른쪽 서브 트리의 key들은 루트의 key보다 크다.
  - 왼쪽과 오른쪽 서브 트리도 이진 탐색 트리이다.
  - 위와 같은 성질은 이진 탐색 트리 내의 모든 노드에서 만족.

따라서, 찾고자 하는 key값이 루트 노드의 key값과 비교하여,
루트 노드의 key값보다 작으면 왼쪽 서브트리, 크면 오른쪽 서브트리를 탐색.
위 과정을 탐색이 성공할 때까지 반복하면 쉽게 원하는 key값을 가진 노드를 찾을 수 있다.
```

><img src="/assets/images/INU/datastructure/BSTree1.png" alt="BSTree1_Procdess" width="45%" min-width="200px" itemprop="image">
><img src="/assets/images/INU/datastructure/BSTree2.png" alt="BSTree2_Procdess" width="45%" min-width="200px" itemprop="image"><br>`이진 탐색 트리의 정의`<br>
>
> - 각 노드가 가진 key(Primary Key)를 이용하여 특정한 key를 가진 노드를 찾는다.
> - key(왼쪽 서브 트리) <= key(루트 노드) <= key(오른쪽 서브 트리)
>   - 이진 탐색 트리를 중위 순회하면 오름차 순으로 정렬된 key 값을 얻을 수 있다.
>     - 위와 같은 성질은 모든 이진 탐색 트리에서 만족

<br><br>

# 이진 탐색 트리에서의 탐색 연산 (순환 / 반복)

**1. 순환적인 탐색 연산**
><img src="/assets/images/INU/datastructure/BSTree_find.png" alt="BSTree_find_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 탐색 트리의 탐색 과정`<br>
> - 현재 노드의 key값과 원하는 노드의 key값을 비교한 결과가 같으면 탐색이 성공적으로 끝난다.
> - 비교한 결과가,
>   - 주어진 key값이 루트 노드의 key값보다 작으면 해당 루트 노드의 왼쪽 자식을 기준으로 다시 탐색 시작.
>   - 주어진 key값이 루트 노드의 key값보다 크면 해당 루트 노드의 오른쪽 자식을 기준으로 다시 탐색 시작.
>```java
>// 순환적인 탐색 함수
>TreeNode *search(TreeNode *root, int key){
>   if(root == NULL) return NULL; // 주어진 key와 같은 key를 가진 node가 없으면 탐색 실패. NULL 반환 
>   if(key == root->key) return root; // 주어진 key와 현재 node의 키가 같으면 탐색 성공. 현재 node를 반환.
>
>   // 주어진 key가 현재 node의 key보다 작으면 현재 노드의 왼쪽 서브 트리에 값이 있으므로
>   // 현재 노드의 왼쪽 자식을 기준으로 다시 탐색.
>   else if (key < root->key){
>       search(root->left, key);
>   }
>   // 주어진 key가 현재 node의 key보다 크면 현재 노드의 오른쪽 자식을 기준으로 다시 탐색.
>   else {
>       search(root->right, key);
>   }
>}
>```

<br><br>

**2. 반복적인 탐색 연산**
> - 이진 탐색 트리를 탐색하는 방법에는 반복적인 방법도 존재한다.
> - 효율성을 따지면 반복적인 함수가 훨씬 우수하다고 한다.
>```java
>// 반복적인 탐색 함수
>TreeNode *search(TreeNode *root, int key){
>   // 알맞은 범위(작으면 왼쪽 서브트리, 크면 오른쪽 서브 트리)에 맞게 단말 노드까지 내려가며 탐색.
>   while(root != NULL){
>       // 주어진 key와 현재 노드의 key값이 같으면 탐색 성공. 현재 노드를 반환.
>       if(key == root->key){
>           return root;
>       }
>       // 주어진 key가 현재 노드의 key보다 작으면 왼쪽 서브트리 탐색.
>       else if(key < root->key){
>           root = root->left; // 현재 노드를 가리키고 있는 포인터를 왼쪽 자식을 가리키도록 한다.
>       }
>       // 주어진 key가 현재 노드의 key보다 크면 오른쪽 서브트리 탐색.
>       else{
>           root = root->right; // 현재 노드를 가리키고 있는 포인터를 오른쪽 자식을 가리키도록 한다.
>       }
>   }
>   // while문 중간에 알맞은 노드를 찾아 return 되지 않고 NULL 값인 단말 노드까지 탐색 후
>   // 반복이 종료되면 탐색 실패. NULL 반환.
>   return NULL; 
>}
>```

<br><br>

# 이진 탐색 트리에서의 삽입 연산

```c
"이진 탐색 트리에 원소를 삽입하기 위해서는 항상 탐색을 수행하는 것이 선행" 되어야 한다.

Why? 1. 이진 탐색 트리에서는 "같은 키 값을 갖는 노드" 가 없어야 하기 때문.
     2. 탐색을 수행하며 "탐색을 실패한 위치에 새로운 노드를 삽입" 하기 때문.
```

><img src="/assets/images/INU/datastructure/BSTreeSearch.png" alt="BSTreeSearch_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 탐색 트리에서의 삽입 연산`<br>
> - 루트 노드에서부터 단말 노드까지 9를 탐색하여 같은 key(9)값을 가진 노드가 있는지 확인한다.
>   - 같은 key 값을 가진 노드가 있으면 삽입불가.
>   - 없으면 단말 노드까지 탐색을 수행하다가 실패하는 지점에 key(9)를 가진 노드를 삽입.
>   - 새로운 노드는 항상 단말 노드로서 추가된다.
>
>```java
>// 이진탐색트리 삽입 프로그램
>
>TreeNode* insert_node(TreeNode* node, int key){
>   // 트리가 공백이거나 탐색에 실패하여 삽입 할 위치를 찾으면 새로운 노드를 반환한다.
>   if(node == NULL){
>       return new_node(key); 
>   }
>   // 트리에 노드가 존재한다면, 순환적으로 트리를 타고 내려간다.
>   if(key < node->key){
>       node->left = insert_node(node->left, key);
>   }
>   else if(key > node->key){
>       node->right = insert(node->right, key);
>   }
>   return node; // 변경된 루트 포인터를 반환한다.  
>}
>
>// 위에서 사용된 new_node(key) 함수는 동적으로 메모리를 할당하여 새로운 노드를 생성 및 반환하는 유틸리티 함수이다.
>TreeNode* new_node(int key){
>   TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
>   node->key = key;
>   node->left = node->right = NULL;
>   return node;
>}
>```

<br><br>

# 이진 탐색 트리에서의 삭제 연산

```c
이진 탐색 트리에서 "가장 복잡한 연산은 노드의 삭제 연산" 이다.

"탐색" 을 통해 삭제하려는 노드를 찾은 후, 다음과 같은 "3가지의 경우를 고려" 해야 한다.
1. 삭제하려는 노드가 "단말 노드" 일 경우.
2. 삭제하려는 노드가 "왼쪽이나 오른쪽 서브 트리 중 하나만 가지고" 있는 경우.
3. 삭제하려는 노드가 "두 개의 서브 트리 모두 가지고" 있는 경우.
```

>**Case 1: 삭제하려는 노드가 단말 노드일 경우**
>
><img src="/assets/images/INU/datastructure/BSTreeDeleteLeaf.png" alt="BSTreeDeleteLeaf_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 탐색 트리에서의 삭제 연산 - 단말 노드`<br>
>- 단말 노드는 자식 노드가 없기에 해당 단말 노드만 삭제하면 된다.<br><br>
>**단말노드의 삭제 과정**
>1. 해당 단말 노드의 부모를 찾는다.
>2. 단말노드와 연결된 부모노드의 링크 필드를 NULL로 설정하여 연결을 끊는다.
>3. 단말 노드에게 할당된 메모리를 반환한다. (노드 동적 생성시)

<br><br>

>**Case 2: 삭제하려는 노드가 하나의 서브 트리만 가지고 있는 경우**
>
><img src="/assets/images/INU/datastructure/BSTreeDelete1Subtree.png" alt="BSTreeDelete1Subtree_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 탐색 트리에서의 삭제 연산 - 하나의 서브트리를 가지고 있는 경우`<br>
>- 삭제될 노드가 하나의 서브 트리를 가지고 있는 경우,<br>
>  자기 자신(노드)을 삭제하고 자신의 서브 트리를 자신의 부모 노드에게 붙여주면 된다.<br>

<br><br>

>**Case 3: 삭제하려는 노드가 두 개의 서브 트리 모두 가지고 있는 경우**
>
><img src="/assets/images/INU/datastructure/BSTreeDeleteBothSubtree.png" alt="BSTreeDeleteBothSubtree_Procdess" width="100%" min-width="200px" itemprop="image"><br>`이진 탐색 트리에서의 삭제 연산 - 두 개의 서브트리 모두 가지고 있는 경우`<br>
>- 관건은 "두 개의 서브트리 중 어떤 노드를 삭제 노드 위치로 가져올 것인가" 이다.<br><br>
>**단말노드의 삭제 과정**
>1. 해당 단말 노드의 부모를 찾는다.
>2. 단말노드와 연결된 부모노드의 링크 필드를 NULL로 설정하여 연결을 끊는다.
>3. 단말 노드에게 할당된 메모리를 반환한다. (노드 동적 생성시)

















<!-- > <img src="/assets/images/INU/datastructure/tree-in-data-structure.png" alt="tree-in-data-structure_Procdess" width="40%" min-width="200px" itemprop="image">
`참고:`[Inflearn - 김영한님_강의](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)<br><br>


`사진출처:`[]()
<span style="color:green">``</span>

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