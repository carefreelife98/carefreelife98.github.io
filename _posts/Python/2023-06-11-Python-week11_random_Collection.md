---
title: "Python : 문자열 다루기 & 최장 연속 순차"
categories:
  - Python
tags:
  - Python
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 함수 파라미터 초기화 (Parameter Initialization)

```
함수 선언 시점에 매개 변수를 초기화 할 수 있다.

- def 함수명(변수명 1, 변수명 2, ..., 변수명 n=<default value>):
```

> **함수의 호출 (Call) 시 입력되지 않은 매개변수에 대한 자동 초기화를 설정 할 수 있다.**
> - Default Argument는 무조건 뒤에 위치해야 한다.<br><br>
> 
> <img src="/assets/images/INU/python/parameter_init.png" alt="parameter_init_Procdess" width="80%" min-width="200px" itemprop="image"><br>`함수 선언과 동시에 매개변수 초기화`<br><br>
> - 위와 같이 매개변수를 초기화 해두면 함수 호출시 프로그래머가 해당 매개변수를 "반드시 입력" 하지 않아도 된다.
>   - 함수의 가장 마지막 매개변수로서 초기화 된 변수가 입력이 되지 않으면 자동으로 초기화 값이 입력된다.
>   - 다양한 기능의 구현이 용이해진다.
>   - 사용자(프로그래머)에게 편의성 제공.

<br><br>

# 난수 발생 모듈

```python
# random 모듈 (import random): 난수 관련 메소드들이 모여져 있는 모듈

# 난수 관련 메소드
import random

random()  # 0에서 1 사이의 난수를 발생 (0.0 <= X < 1.0)

# 시작 범위(start)와 끝 범위(end) 사이(closed)에 있는 난수(정수)를 발생
# start <= X <= end
randint(start, end) 

# range() 함수에서 정의하는 범위의 난수(정수)를 발생
# x <= n < y
randrange(x, y)

# range() 함수에서 정의하는 범위의 난수(정수)를 발생
# 0 <= n < y
randrange(y)

# 리스트의 원소를 섞어 놓음
# 내부 인자가 변경가능한 list 데이터 타입만 사용가능. (문자열, 튜플, range(a, b) 불가)
shuffle()

# 리스트의 원소 중 하나를 고름 (리스트, 튜플, 문자열, range)
choice(seq)
```

<br><br>

```python
import random

print(f"random.random() = {random.random()}")
print(f"random.randint(1, 100) = {random.randint(1, 100)}")
print(f"random.randrange(1, 7) = {random.randrange(1, 7)}")
print(f"random.randrange(7) = {random.randrange(7)}")

arrEx = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
random.shuffle(arrEx)
print(f"random.shuffle(arrEx) = {arrEx}")

arrEx2 = ('care', 'free', 'life')
print(f"random.choice(arrEx2) = {random.choice(arrEx2)}")
```

> <img src="/assets/images/INU/python/randmodule_rs.png" alt="randmodule_rs_Procdess" width="60%" min-width="200px" itemprop="image"><br>`random 모듈 사용 결과`<br><br>

<br><br>

# 집합(set) 자료형

```
Collection 자료형에 속하는 자료형
- Collection: 데이터를 모아놓은 자료형
    - 집합(Set)
    - 사전(Dictionary)
    - etc..
    
"순서"가 없으므로 순서열 관련 자료형 (list, tuple 등)과는 다름.
```

> - 자료형 내에 순서가 존재하지 않으며, 중복을 허용하지 않음.
> - 집합 자료형의 생성 : set() / {요소1, 요소2, ...}
>   - index 를 사용하여 접근할 수 없음. (순서가 존재하지 않기 때문에)<br>
>   <img src="/assets/images/INU/python/set_err.png" alt="set_err_Procdess" width="50%" min-width="200px" itemprop="image"><br>`set() 자료형은 index 사용 불가`<br>
>   - {} 안에 요소를 넣지 않고 초기화 하게 되면 set() 이 아닌 dict() 자료형으로 생성됨.<br>
>   <img src="/assets/images/INU/python/Set_Type.png" alt="Set_Type_Procdess" width="50%" min-width="200px" itemprop="image"><br>`set() / dict()`<br><br>
    












> <img src="/assets/images/INU/python/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br><br>
<!-- > <img src="/assets/images/INU/python/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br><br>
`사진출처:`[]()
<span style="color:green">``</span>

```

```
> 
{: .notice--danger}
{: style="text-align: center;"}


<details>
  <summary>
    <span style="color:blue">(1) 소스 코드 보기 (클릭)</span>
  </summary>
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