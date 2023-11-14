---
title: "Basic Computer Organization and Design - Design of Basic Computer"
categories:
  - INU-ComputerArchitecture
tags:
  - INU-ComputerArchitecture
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/INU/ComputerArchitecture/designOfBasicComputer1.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

```
실제 하드웨어 구성을 다룬다.
```

<br><br>

# Basic Computer 구성 요소
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer1.png)<br>
> 1. **Memory**
> 	- **Memory 는 16 Bit * 2^12 (=4096) 만큼을 필요**로 한다.
> 2. **Address Register (AR)**
> 	- 12 Bit
> 3. **Program Counter (PC)**
> 	- 12 Bit
> 4. **Data Register (DR)**
> 	- 16 Bit
> 5. **Accumulator (AC)**
> 	- 16 Bit
> 6. **Instruction Register (IR)**
> 	- 16 Bit
> 7. **Temporary Register (TR)**
> 	- 16 Bit
> 8. **Input / Output Register (INPR, OUTR)**
> 	- 8 Bit
> 9. **1 Bit Register (Flip Flop)**
> 	- Extended Accumulator
> 	- I bit (Instruction Register)
> 	- R (Interrupt Flip-Flop)
> 	- IEN (Interrupt Enable Flip-Flop)
> 	- FGI / FGO (Input / Output Flag)
> 	- S (Sign bit)
> 10. **3 x 8 Decoder**
> 	- IR (12, 13, 14) -> (D_0 ~ D_7)
> 	- 어떤 명령인지 Decode
> 11. **4 x 16 Decoder, 4 Bit Sequence Counter (= SC, Register)**
> 	- 4 Bit SC -> 4 x 16 Decoder -> (T_0 ~ T_15)
> 	- **T_0 ~ T_15 까지의 Timing Signal 을 Generate.**
> 12. **공통 버스 시스템 구축 (Common Bus System)**
> 13. **Control Logic Gates 구현**
> 	- **Input**
>       - Address Field
>       - 명령어 종류를 구분하는 D_0 ~ D_7
> 		- Timing Signal (T_0 ~ T_16)
>       - Other Inputs
> 	- **Output**
> 		- Control Outputs
> 	- **Logic**
> 		- Input 이 들어왔을 때 해당 명령어를 수행하여 그 결과를 반환하도록 구성이 되어야 함.
> 		- **결국 Computer 는 각 Register 간의 데이터 전송**으로 이루어짐.
> 			- 따라서 **Control Logic Gates 에서는 Input 이 들어왔을 때 각 Register 에 어떤 Control Signal 을 주어 조작 할 것인지에 대한 전략을 구성**해야함.
> 				- **Control Signal 을 통한 각 Register 의 조작**
> 			- **공통 버스 시스템의 선택 전략 구성 (Selection Signal S_0 ~ S_2)**
> 14. **Adder and Logic 구현**
> 	- 값을 읽어온 후의 연산 전략 구성

<br><br>
![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer2.png)<br>

<br><br>
# Basic Computer 설계
## Address Register 설계 (AR)
### 구상
> **Address Register 의 Load(LD) , Increment(INR) , Clear(CLR) 를 어떻게 설계 할 것인가?**
> - **AR <- \_**
> 	- 위와 같이 표현되는 것은 결국 Address Register 를 변경하는 것.
> - **Load**
> 	- AR <- x
> 	- 어떤 실제 값으로 변경하는 것.
> - **Increment**
> 	- AR <- AR + 1
> 	- AR 의 값을 하나 증가.
> - **Clear**
> 	- AR <- 0
> 	- AR 의 값을 0으로 초기화

<br><br>
### 구현
#### 1. Microoperation 찾기 (AR - LD, INR, CLR)
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer3.png)<br>
> **Address Register 를 변경하는 모든 Microoperation 을 찾아 가져온다.**
> - **다음과 같은 명령어를 표에서 찾아본다. AR <- \_**
> 	1. **R' T_0 : AR <- PC**
> 		- Load
> 	2. **R' T_2 : AR <- IR(0-11)**
> 		- Load
> 	3. **D_7' I T_3 : AR <- M\[AR]**
> 		- Load
> 	4. **R T_0 : AR <- 0**
> 		- Clear
> 	5. **D_5 T_4 : AR <- AR + 1**
> 		- Increment

<br><br>
#### 2. Microoperation 을 기반으로 Function 구성
> **Load Function 에 관한 Microoperation 은 세 가지 존재하므로 OR Gate 를 사용하여 구성.**

> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer4.png)<br>
- **LD(AR) = R’ T_0 + R’ T_2 + D_7’ I T_3**
- **CLR(AR) = R T_0**
- **INR(AR) = D_5 T_4**

<br><br>

#### 3. Function 을 기반으로 회로 구성
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer5.png)<br>
> 위와 같은 과정을 각 구성요소 별로 반복.

<br><br>
## Memory Read 설계
### 1. Microoperation 찾기 ( _ <- M\[AR])
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer6.png)<br>
> **_ <- M\[AR] 과 같은 Microoperation 을 전부 찾아본다.**
> 1. R' T_1 : IR <- M\[AR]
> 2. D_7' I T_3 : AR <- M\[AR]
> 3. D_0 T_4 : DR <- M\[AR]
> 4. D_1 T_4 : DR <- M\[AR]
> 5. D_2 T_4 : DR <- M\[AR]
> 6. D_6 T_4 : DR <- M\[AR]
- **Memory Read : (R' T_1) + (D_7' I T_3) + ((D_0 + D_1 + D_2 + D_6) T_4)**
- **위 Microoperation 을 Read 의 Control Input 에 넣어주면 된다.**

<br><br>

## Single Flip-Flop 설계 (예시 : IEN)
### 1. Microoperation 찾기
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer7.png)<br>
> **IEN <- _ 와 같은 Microoperation 을 전부 찾아본다.**
> 1. p B_7 : IEN ← 1
> 2. p B_6 : IEN ← 0
> 3. R T_2 : IEN ← 0
> 
> <br><br>
> **p : I/O 명령어가 실행되는 조건**
> - **p : D_7 I T_3**
> 
> <br><br>
> **Bi : Address Field 부분.**
> - **B_0 ~ B_11**

<br><br>
### 2. Microoperation 을 기반으로 JK Flip Flop 을 사용하여 IEN 의 Control Input 구현
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer8.png)<br>
> **JK Flip Flop 을 통해 구현할 수 있는 이유는?**
> 1. **Timing Signal 의 특성**
> 	-  각 Timing Signal 은 **서로 배타적임**
>     - 하나의 T 가 1 이면 나머지 T 는 전부 0.
> 2. **B_i 의 특성**
> 	- 각 B_i 도 마찬가지로 서로 배타적.
>     - 하나의 B 가 1 이면 나머지 B 는 전부 0.
> 		
> <br><br>
> 위 특성에 따라 위 회로는 다음과 같이 정의 될 수 있다.
> - **pB7 : IEN ← 1**
> 	- JK(1, 0) = **Set (1)**
> - **p B_6 : IEN ← 0**
> 	- JK(0, 1) = **Reset (0)**
> - **R T_2 : IEN ← 0**
> 	- JK(0, 1) = **Reset (0**)

<br><br>
## Common Bus System 설계 (S_2, S_1, S_0)

> **Common Bus System 구성 요소**
> - Bit 수 만큼의 Line
> - Multiplexer (MUX)
> - 3-State Buffer
> - Decoder

### 8 x 3 Encoder 를 통해 설계
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer9.png)<br>
> **8 x 3 Encoder 의 Input (x_1 ~ x_7) 를 Bus 의 Index 로서 구현.**
> - x_0 는 전부 0인 경우이므로 생략.
> 
> <br><br>
> **예시 - x_1 이 1 인 경우 : 001**
> - S_2 = 0 , S_1 = 0 , S_0 = 1
> - **AR 선택**
> - **AR 을 읽어오는 조건을 전부 x_1 에 연결.**
> 
> <br><br>
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer10.png)<br>
> **위처럼 Common Bus System 의 8 x 3 Encoder 의 각 Input x 에는 정해진 Register 를 읽어오는 모든 Microoperation 을 연결해준다.**
> <br><br>
> **예시 1 (x_7 <- M\[AR])**
> - **`_ <- M\[AR]`** 을 가지는 모든 Microoperation 을 찾아 x_7 에 연결.
> - 이전에 찾아본 Memory Read Microoperation
> 	- **Read = (R’ T_1) + (D_7’ I T_3) + (D0 + D1 + D2 + D6)T4**
> - 따라서 다음과 같이 연결하면 된다.
> 	- **x_7 = (R’ T_1) + (D_7’ I T_3) + (D0 + D1 + D2 + D6)T4**
> 
> <br><br>
> **예시 2 (x_1 <- AR)**
> - **`<- AR`** 을 가지는 모든 Microoperation 을 찾아 x_7 에 연결.
> 	- D_4 T_4 : PC <- AR
> 	- D_5 T_5 : PC <- AR
> - 따라서 다음과 같이 연결하면 된다.
> 	- **x_1 = (D_4 T_4) + (D_5 T_5)**

<br><br>
## (중요) Accumulator 설계하기
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer11.png)<br>
> **Adder and logic Circuit 및 Accumulator Register (AC) 설계**

<br><br>
### Accumulator 설계
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer12.png)<br>
> **`AC <- _` 와 같은 형태의 AC 를 변경하는 Microoperation 을 전부 찾는다.**
> <br>
> **Load**
> 1. D_0 T_5 : AC ← AC ^ DR
> 2. D_1 T_5 : AC ← AC + DR
> 3. D_2 T_5 : AC ← DR
> 4. p B_11 : AC(0 – 7) ← INPR
> 5. r B_9 : AC ← (AC)’
> 6. r B_7 : AC ← shr AC, AC(15) ← E
> 7. r B_6 : AC ← shl AC, AC(0) ← E
> <br>
> **Clear**
> - r B_11 : AC ← 0
> 
> <br>
>
> **Increment**
> - r B_5 : Ac ← AC + 1

<br><br>
### 각 Microoperation 을 AC (Load, Increment, Claer) 에 연결
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer13.png)<br>
> 여기까지는 **AC 에 대한 Control Signal 에 대한 설계**이다.<br>
> 그럼 실제 연산 수행 Logic 은 어떻게 설계해야 할까?
> - AND, ADD, DR, ...
> - **Adder and logic circuit 에서 수행.**

<br><br>
### Adder and logic 설계
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer14.png)<br>
> **Input**
> - **자기 자신 (AC)**
> 	- AC <- AC + (연산) 형태를 띄므로 특정 연산의 결과는 항상 자신이 되어 가지고 있다.
> - **Data Register (DR)**
> 	- Data Register 로부터 연산 값을 전송받는 경우.
> 	- AC <- DR 과 같은 형태
> - **Input Register (INPR)**
> 	- INPR 로부터 값의 입력이 있을 경우.
> 	- AC <- INPR
> 
> <br><br>
> **위 세개의 Input 을 받아 산술 / 로직 연산 및 전송 등을 수행하여 Accumulator (AC) 에 전송.**

<br><br>

**위 그림을 더 자세하게 살펴보면 다음과 같다.**
> ![path](/assets/images/INU/ComputerArchitecture/designOfBasicComputer15.png)<br>
> **각 JK Flip-Flop 은 16 Bit 로 이루어진 AC 내의 1 Bit 이다.**
> <br><br>
> **각 AND Gate 에 연결된 Function 은 Accumulator 설계 시 사용한 Function 을 끌어와 연결해준다.**
> - 예시
> 	- Function AND : D_0 T_5
> 	- Function ADD : D_1 T_5
> <br><br>
> **OR Gate 의 Output 에 따른 JK Flip-Flop 의 Ouput (D Flip-Flop 처럼 동작.)**
> - **Output(OR) 이 1 인 경우**
> 	- Output(JK) = **1 (Set)**
> - **Output(OR) 이 0 인 경우**
> 	- Output(JK) = **0 (Reset)**
> <br><br>
> **OR Gate 의 Output 이 JK Flip-Flop 에 전달되기 위한 조건 (Load)**
> - AC 의 Load 를 그대로 끌어와 연결.
> 	- **AC 의 Load 가 1 이어야만 OR Output (I_i) 과 AND 연산하여 JK FF 로 전송.**


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

- [x] Basic Computer 구성 요소
- [x] Basic Computer 설계
- [x] Address Register 설계 (AR)
- [x] 1. Microoperation 찾기 (AR - LD, INR, CLR)
- [x] 2. Microoperation 을 기반으로 Function 구성
- [x] 3. Function 을 기반으로 회로 구성
- [x] Memory Read 설계
- [x] 1. Microoperation 찾기 ( _ <- M\[AR])
- [x] Single Flip-Flop 설계 (예시 : IEN)
- [x] 1. Microoperation 찾기
- [x] 2. Microoperation 을 기반으로 JK Flip Flop 을 사용하여 IEN 의 Control Input 구현
- [x] Common Bus System 설계 (S_2, S_1, S_0)
- [x] 8 x 3 Encoder 를 통해 설계
- [x] (중요) Accumulator 설계하기
- [x] 각 Microoperation 을 AC (Load, Increment, Claer) 에 연결
- [x] Adder and logic 설계