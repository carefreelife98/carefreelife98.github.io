---
title: "Logic Gates, Boolean Algebra (Boolean Function)"
categories:
  - INU-ComputerArchitecture
tags:
  - INU-ComputerArchitecture
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/INU/ComputerArchitecture/logicgates8.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# Logic Gates
- **AND - 논리 곱**
    <br>
  ![path](/assets/images/INU/ComputerArchitecture/logicgates1.png)
    - **X = A * B (X = A ^ B 로 표현하는 경우도 있음)**
        - 두 Input 에 대하여 4개의 경우의 수 발생.
            - **두 Input 모두 1 인 경우 1을 반환.**
            - 두 Input 중 하나라도 0이면 0을 반환.
              <br><br>

- **OR - 논리 합**<br>
  **![path](/assets/images/INU/ComputerArchitecture/logicgates2.png)**
    - **X = A + B (X = A v B 로 표현하는 경우도 있음)**
        - **두 Input 모두 0 인 경우 0을 반환.**
        - 두 Input 중 하나라도 1이면 1을 반환.
          <br><br>
- **Inverter (변환기 0 → 1 , 1 → 0)**<br>
  ![path](/assets/images/INU/ComputerArchitecture/logicgates3-1.png)
    - **NOT 또는 Complement 라고도 표현.**
    - X = A'
    - **Input 의 반대 값을 반환.**
        - Input 이 1 인 경우 0 반환.
        - Input 이 0 인 경우 1 반환.
          <br><br>
- **Buffer (그대로 출력)**<br>
  ![path](/assets/images/INU/ComputerArchitecture/logicgates3.png)
    - **Input 을 그대로 반환**
        - Input 이 0 인 경우 0 반환.
        - Input 이 1 인 경우 1 반환.
          <br><br>
- **NAND (Not of AND)**<br>
  ![path](/assets/images/INU/ComputerArchitecture/logicgates4.png)
    - **X = (A * B)'**
        - **AND 의 반대이므로 두 Input 이 1 인 경우에는 0을 반환.**
        - 나머지 경우는 1을 반환.
            - **0 을 Detect 할 수 있는 연산. (0이 하나라도 존재하는 경우 1을 반환)**
              <br><br>
- **NOR (Not of OR)**<br>
  ![path](/assets/images/INU/ComputerArchitecture/logicgates5.png)
    - **X = (A + B)'**
        - **OR 의 반대이므로 두 Input이 0 인 경우에는 1을 반환.**
        - 나머지 경우는 1을 반환.
            - **1 을 Detect 할 수 있는 연산. (1이 하나라도 존재하는 경우 1을 반환)**
              <br><br>
- **XOR (Exclusive-OR) : A와 B가 다르면 1, 같으면 0**<br>
  ![path](/assets/images/INU/ComputerArchitecture/logicgates6.png)
    - **X = AB' + A'B**
        - 두 Input 의 값이 다르면 1을 반환.
        - 두 Input 의 값이 같으면 0을 반환.
          <br><br>
- **XNOR (Exclusive-NOR) - Not of XOR : A와 B 가 같아야만 1, 나머지는 0**<br>
  ![path](/assets/images/INU/ComputerArchitecture/logicgates7.png)
    -  **X = (AB' + A'B)' = (AB')' * (A'B)'**
        - = (A' + B)(A + B')
        - = A'A + A'B' + AB + BB'
        - **= AB + A'B' (A'A, BB' 는 항상 0 이므로)**

<br><br>
# Boolean Algebra (Boolean Function) - 수식
![path](/assets/images/INU/ComputerArchitecture/logicgates8.png)
- **F = x + y’z**
    - **Boolean Function 은 위 처럼 수식, 진리표, 회로도 로 표현 할 수 있다.**
      <br><br>
- **Boolean Algebra 특징**
    - **논리 합 (OR)**
        - x + 0 = x
        - x + 1 = 1
        - x + x = x
        - x + x’ = 1
        - 교환 법칙 성립 : x + y = y + x
        - 결합 법칙 성립 : x + (y + z) = (x + y) + z
        - 분배 법칙 성립 : x(y+z) = xy + xz
        - 드모르간 성립 : (x+y)’ = x’ * y’
        - (x’)’ = x<br><br>
    - **논리 곱 (AND)**
        - x * 1 = x
        - x * 0 = 0
        - x * x = x
        - x * x’ = 0
        - 교환 법칙 성립 : x * y = y * x
        - 결합 법칙 성립 : x * (y * z) = (x * y) * z
        - **x + y * z = x(1 + y + z) + yz (1 + y + z 는 y, z 에 상관없이 항상 1임)**<br>
          = x + xy + xz + yz<br>
          = x * x + xy + xz + yz<br>
          = x(x+y) + z(x+y)<br>
          = **(x+y)(x+z)**<br><br>

    - **Demorgan’s Theorem**
      ![path](/assets/images/INU/ComputerArchitecture/logicgates9.png)
        - **전체에 대한 NOT 연산 시 OR 과 AND 의 역전이 발생.**
            - (x+y+z)’ = x’y’z’
            - (xyz)’ = x’ + y’ + z’
              <br><br>
    - **Complement of Function**
        - **방법1 → Function 전체에 NOT 붙히기**
            - F = AB + C’D’ + B’D
            - Complement of Function (전체에 NOT 붙히면 됨)
                - F’ = (AB + C’D’ + B’D)’
                  = (AB)’ (C’D’)’ (B’D)’
                  = **(A’+B’)(C+D)(B+D’)**
                  <br>
        ![path](/assets/images/INU/ComputerArchitecture/logicgates10.png)
        - **방법2 → Dual (AND ↔ OR) 로 변환 후 전체에 NOT 붙히기**
            - Dual of F
                - F = (A+B)(C’+D’)(B’+D)
            - After NOT
                - **F’ = (A’+B’)(C+D)(B+D’)**
                  <br><br>
## Dual & Duality

![path](/assets/images/INU/ComputerArchitecture/logicgates11.png)<br>

![path](/assets/images/INU/ComputerArchitecture/logicgates12.png)<br>

- **dual : and ↔ or, 0 ↔ 1 변환 한 것.**
    - **duality : 한 쪽의 식이 성립하면 그 반대도 성립한다.**
- **드모르간**
- **Complement**
    - 어떤 함수에 대한 **dual 의 complement 는 함수에 대한 complement 와 같다.**

<br><br>

지식 공유 및 기록을 위한 컴퓨터 구조 개인 학습 포스트입니다.
피드백은 항상 환영합니다!
긴 글 읽어주셔서 감사합니다.
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] Logic Gates
- [x] AND - 논리 곱
- [x] OR - 논리 합
- [x] Inverter (변환기)
- [x] Buffer
- [x] NAND (Not of AND)
- [x] NOR (Not of OR)
- [x] XOR (Exclusive-OR)
- [x] XNOR (Exclusive-NOR)
- [x] Boolean Algebra (Boolean Function) - 수식
- [x] Dual & Duality
