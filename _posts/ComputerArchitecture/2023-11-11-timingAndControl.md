---
title: "Basic Computer Organization and Design - Timing and Control (Instruction Cycle, Memory 참조 명령어, Register 참조 명령어)"
categories:
  - INU-ComputerArchitecture
tags:
  - INU-ComputerArchitecture
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/INU/ComputerArchitecture/timingAndControl1.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# Timing and Control

## Control Unit of Basic Computer
![path](/assets/images/INU/ComputerArchitecture/timingAndControl1.png)
> **최상위 Bit 는 I 라는 Register 에 연결**되어 있음.
> <br><br>
> **Opcode 는 3 x 8 Decoder 의 Input으로 입력되어 Decoder Output 을 반환.**
> - **Opcode 는 000 ~ 110  까지는 Memory 참조 명령어를 나타냄.**
> 	- **000 ~ 110** 이 Decoder 에 Input 으로 입력될 시, **D0 ~ D6 까지 1**이 반환됨.
> 		- 이 경우 **Memory 참조 명령어 임을 알 수 있음.**
> - **Opcode 가 111 인 경우 Register 참조 명령어 혹은 I/O 명령어를 나타냄.**
> 	- **111** 이 Decoder 에 Input 으로 입력 될 시, **D7 만 1**이 반환됨.
> 		- **I 의 값에 따라 Register 참조 명령어인지, I/O 명령어 인지 구분 가능**해짐.
> 		- **나머지 Bit (12 Bit) 에 의해 명령어의 종류가 결정**됨.
> <br><br>
> 	**따라서 Control Logic Gates 에서는 I 값과 3 x 8 Decoder Output, 그리고 나머지 12 Bit 를 입력으로 받아 어떤 명령어인지 판독 할 수 있게 된다.**

<br><br>
![path](/assets/images/INU/ComputerArchitecture/timingAndControl2.png)
> **하단의 회로는 순차적으로 증가하는 순차 회로 (SC) 이다.**
> - **CLR 의 Input 이 1인 경우**
> 	- 0000을 4 x 16 Decoder 에 전송.
> - **CLR 이 Input 이 0 이고, Increment 가 1인 경우**
> 	- Clock 이 1 이 될 때마다 D Input 이 1씩 증가. (0000 ~ 1111)
> 
> <br><br>
> 
> **결국 Timing Signal 을 생성하는 회로임.**<br>
> ![path](/assets/images/INU/ComputerArchitecture/timingAndControl3.png)
> - 해당 **Timing Signal 에 따라서 Control Logi Gates 에 존재하는 명령어들이 순차적으로 수행됨**.

<br><br>

## Instruction Cycle
> **하나의 명령어는 하나의 Cycle 로 이루어짐.**
> - **하나의 Cycle 을 지나면서 해당 명령어가 수행**됨.
> 
> <br><br>
> 
> **Instruction Cycle 의 구성**<br>
> **우리가 배운 모든 (대부분의) 명령어는 아래와 같은 구성을 가짐.**<br>
> 1. **Fetch**
> 	- 명령어를 가져오는 동작.
> 2. **Decode**
> 	- 어떤 명령어인지 해석하는 과정
> 3. **Read Effective Address**
> 	- 만약 Indirect Address 인 경우 수행.
> 	- 유효 주소를 다시 찾아 읽어오는 과정.
> 4. **Execute**
> 	- 명령어 수행과정

<br><br>
## Instruction Cycle - Fetch & Decode
![path](/assets/images/INU/ComputerArchitecture/timingAndControl4.png)
### 1. Fetch 의 동작 과정 - 명령어를 가져온 후 PC 증가
![path](/assets/images/INU/ComputerArchitecture/timingAndControl5.png)
> 1. **\[FETCH] T_0 : AR <- PC**
> 	![path](/assets/images/INU/ComputerArchitecture/timingAndControl6.png)
> 	- **T_0 에서 PC 의 값을 AR 로 가져옴.**
> 		- PC 는 명령어의 주소가 존재하는 Register.
> 	- 명령어를 읽어오기 위해 해당 명령어의 주소를 AR 에 넣어야 함.
> 	<br><br>
> 2. **[FETCH] T_1 : IR <- M\[AR], PC <- PC + 1**
> 	![path](/assets/images/INU/ComputerArchitecture/timingAndControl7.png)
> 	- 이전에 저장한 **명령어의 주소를 가지고 있는 AR 값을 이용해 Memory에서 해당 위치에 존재하는 값을 Instruction Register 에 저장.**
> 	- 그와 동시에 Program Counter 의 값을 하나 증가시킴.
> 		- **프로그램에서 수행할 각 명령어들이 순차적으로 누적되어 있기 때문에 다음 수행할 명령어를 PC 값을 하나 증가시켜 알려주어야 함.**
> 
> <br><br>
> 
> \[Fetch 끝]


<br><br>
### 2. Decode 의 동작 과정
![path](/assets/images/INU/ComputerArchitecture/timingAndControl8.png)
> **[DECODE] T_2 : D_0, ... D_7 <- Decode IR(12~14), AR <- IR(0~11), I <- IR(15)**
> - **Opcode (3 Bit) 가 3 x 8 Decoder 에 삽입**됨.
> - **동시에, Opcode (4 bit) 를 제외한 나머지 Address Bit (12 bit) 를 AR 에 삽입.**
> 	- Instruction Register 의 하위 12 Bit 는 피연산자의 주소값이 되므로 해당 주소를 나타내는 하위 12 bit 를 AR 에 저장.
> - **그와 동시에, I Register 에 최상위 1 Bit 를 저장.**
> 
> <br><br>
> 
> \[Decode 끝]

<br><br>

### Fetch & Decode 정리
![path](/assets/images/INU/ComputerArchitecture/timingAndControl9.png)

<br><br>

## Instruction Cycle - Determine the type of instruction
![path](/assets/images/INU/ComputerArchitecture/timingAndControl10.png)
> 1. **순차 카운터 (SC) 를 0으로 함으로서 시작.**
> 2. **Fetch & Decode (T_0 ~ T_2) 수행**
> 3. **Execute (수행 단계)**
> 	![path](/assets/images/INU/ComputerArchitecture/timingAndControl11.png)
> 	- **D_7 값과 I 값을 사용해서 어떤 명령어인지 판독하는 단계.**
> 		- D_7 값과 I 값은 T_2 단계에서 이미 정해졌음
> 		- **D_7 값은 Opcode 가 000~110 범위이면 0, 111 이면 1로서 존재.**
> 	- **D_7 = 0, D_0 ~ D_6 != 111**
> 		- **Memory 참조 명령어** 임을 나타냄.
> 	- **D_7 = 1, I = 0**
> 		- **Register 참조 명령어** 임을  나타냄.
> 	- **D_7 = 1, I = 1**
> 		- **I/O 명령어** 임을 나타냄.

<br><br>
## Instruction Cycle - 전체 Flow Chart
![path](/assets/images/INU/ComputerArchitecture/timingAndControl12.png)
> **Memory 참조 명령어인 경우 (D_7 = 0)**
> - **D_7' I T3 : AR <- M[AR] (D_7 = 0, I = 1)**
> 	- **D_7 = 0, I = 1 이므로 간접 주소를 사용한 Memory 참조 명령어 임을 알 수 있음.**
> 	- 또한 T_3 = 1인 동안에 유효 주소를 읽어오게 됨.
> 		- **T_2 단계에서 한번 읽어온 주소를 다시 참조하여 AR이 유효 주소를 저장하도록 갱신.**
><br><br>
>- **D_7' I' T_3 : Nothing (D_7 = 0, I = 0)**
>	- **D_7 = 0, I = 0 이므로 직접 주소를 사용한 Memory 참조 명령어 임을 알 수 있음.**
>	- **따라서 T_3 = 1인 동안 아무 동작도 수행하지 않음.**
>
> <br><br>
> 
> **Register 참조 명령어인 경우 (D_7 = 1, I = 0)**
> - Register 참조 명령어를 수행.
> 
> <br><br>
> 
> **I/O 명령어인 경우 (D_7 = 1, I = 1)**
> - I/O 명령어 수행.

<br><br>

## Instruction Cycle - Register 참조 명령어
![path](/assets/images/INU/ComputerArchitecture/timingAndControl13.png)
> **Register 참조 명령어인 경우 = 0111 ~**
> - **최상위 Bit I = 0**
> - **Opcode = 111**
> 	- 나머지 12 bit 는 Register 참조 명령어의 종류를 나타냄.
> 
> <br><br>
> 
> **표기 예시 : r B_11 (= CLA)**
> - **r = D_7 I' T_3**
> 	- 위에서 본 것과 같다. D_7 이 1이고 I 가 0이면 Register 참조 명령어임.
> 	- **따라서 Register 참조 명령어이고 T_3 Clock 이 1 인 경우 AC <- 0 과 같은 Clear 동작을 수행하라는 것.**

<br><br>

## Instruction Cycle - Memory 참조 명령어 7가지
![path](/assets/images/INU/ComputerArchitecture/timingAndControl14.png)
> **Opcode 가 000 ~ 110 범위 인 경우.**<br>
> 앞서 진행했던 단계 (T_0, T_1 : FETCH, T_2 : DECODE, T_3 : EXECUTE) 이후에 Memory 참조 명령어가 실행됨.
> - **따라서 모든 Memory 참조 명령어는 T_4 단계부터 진행.**

<br><br>

### 1. AND : AND to AC
![path](/assets/images/INU/ComputerArchitecture/timingAndControl15.png)
> - **AND memory word to AC**
> 	- **memory word 란 유효 주소가 가리키고 있는 메모리의 값.**
> 		- 즉, Address Register 에 들어있는 번지 수가 가리키고 있는 메모리 공간의 값.
> 	- **memory word 와 AND 연산을 한 결과를 AC 에 저장하는 연산.**
> - **두 단계에 걸쳐 이루어짐 (T_4 -> T_5)**
> 	1. **D_0 T_4 : DR <- M\[AR]**
> 		- D_0 T_4 (D_0 는 Opcode 가 000 임을 나타냄.)
> 			- **Opcode 가 000이고 T_4 이면 실행**
> 		- **Address Register 에 저장되어 있는 유효 주소를 메모리에서 참조해 해당 주소에 존재하는 값을 DR 에 저장.**
> 		- 메모리에 존재하는 값을 직접 연산할 수 없기에 우선 해당 값을 DR 에 가져와야함.
>       <br><br>
> 	2. **D_0 D_5 : AC <- AC ^ DR, SC <- 0**
> 		- **AC 와 이전에 DR 로 가져온 값을 AND 연산 후 다시 AC 에 저장.**
> 		- **그와 동시에 SC (순차 카운터) 를 0으로 초기화**
> 			- SC 를 0으로 초기화 할 시 T_0 로 돌아가게 됨.

<br><br>

### 2. ADD : add to AC
![path](/assets/images/INU/ComputerArchitecture/timingAndControl16.png)
> - **가산 연산**
> - **두 단계에 걸쳐 이루어짐 (T_4 -> T_5)**
> 	1. **D_1 T_4 : DR <- M\[AR]**
> 		- D_1 T_4 (D_1 는 Opcode 가 001 임을 나타냄.)
> 			- **Opcode 가 001이고 T_4 이면 실행**
> 		- **Address Register 에 저장되어 있는 유효 주소를 메모리에서 참조해 해당 주소에 존재하는 값을 DR 에 저장.**
> 		- 메모리에 존재하는 값을 직접 연산할 수 없기에 우선 해당 값을 DR 에 가져와야함.
> 	2. **D_1 T_5 : AC <- AC + DR, E <- C_out, SC <- 0**
> 		- **가산 연산 (add) 실행과 동시에 E (Extended Accumulator) 에 end carry 저장.**
> 		- 그와 동시에 **SC 를 0으로 초기화 하여 T_0 로 상태 설정.**

<br><br>

### 3. LDA : load to AC
![path](/assets/images/INU/ComputerArchitecture/timingAndControl17.png)
> - Read 동작이라고 보면 됨.
> - **DR 에 존재하는 값을 AC 에 값을 가져오는 기능.**
> - **두 단계에 걸쳐 이루어짐 (T_4 -> T_5)**
> 	1. **D_2 T_4 : DR <- M\[AR]**
> 		- D_2 T_4 (D_2 는 Opcode 가 010 임을 나타냄.)
> 			- **Opcode 가 010이고 T_4 이면 실행**
> 		- **Address Register 에 저장되어 있는 유효 주소를 메모리에서 참조해 해당 주소에 존재하는 값을 DR 에 저장.**
> 		- 메모리에 존재하는 값을 직접 연산할 수 없기에 우선 해당 값을 DR 에 가져와야함.
> 	2. **D_2 T_5 : AC <- DR , SC <- 0**
> 		- **DR 의 값을 그대로 AC 에 전송.**
> 		- 항상 마무리는 SC <- 0 을 통해 SC 를 초기화 하여 다음 명령어가 실행될 수 있도록 T_0 로 상태를 설정 해주어야 한다.

<br><br>

### 4. STA : store AC
![path](/assets/images/INU/ComputerArchitecture/timingAndControl18.png)
> - **AC 의 값을 유효주소에 저장.**
> - 한 단계로 진행 (T_4)
> 	- **D_3 T_4 : M\[AR] <- AC, SC <- 0**
> 		- D_2 T_4 (D_3 는 Opcode 가 011 임을 나타냄.)
> 			- **Opcode 가 011이고 T_4 이면 실행**
> 		- **이전 단계 (T_0 ~ T_3) 에서 읽어온 유효 주소에 AC 값을 Write**
> 		- 마찬가지로 SC <- 0 으로 초기화.

<br><br>
## Instruction Cycle - Memory 참조 명령어 (Branch)
> **Direct Address 인 경우 : 01xx**
> - BUN : 0100 (4xxx)
> - BSA : 0101 (5xxx)
> - ISZ : 0110 (6xxx)
> 
> <br><br>
> 
> **Indirect Address 인 경우 : 11xx (C, D, E)**
> - BUN : 1100 (Cxxx)
> - BSA : 1101 (Dxxx)
> - ISZ : 1110 (Exxx)
> 
> <br><br>
> 
> **Branch 란?**
> - **기존 방식 (순차적인 명령어 실행) 과 다르게 특정 주소의 명령어로 점프하여 바로 실행하는 것.**

<br><br>
### 1. BUN : Branch unconditionally (무조건 점프)
![path](/assets/images/INU/ComputerArchitecture/timingAndControl19.png)
![path](/assets/images/INU/ComputerArchitecture/timingAndControl20.png)
> - **D_4 T_4 : PC <- AR , SC <- 0**
> 	- **Address Register 의 값을 Program Counter 에 저장 후 종료.**
> - **Program counter 에 특정 명령어의 유효 주소가 저장되어 다음 실행 시 해당 명령어로 점프하여 바로 실행됨.**

<br><br>
### 2. BSA : Branch and Save return Address (돌아올 주소를 저장하고 Branch)
![path](/assets/images/INU/ComputerArchitecture/timingAndControl21.png)
> - **서브 루틴의 가장 첫 주소에 Return Address 를 저장하고 그 다음 주소에 존재하는 명령어를 수행한다.**
>   1. **D_5 T_4 : M\[AR] <- PC , AR <- AR + 1**
>       - M\[AR] <- PC : 현재 PC 가 돌아가야할 주소가 되므로 Memory 에 저장.
>     <br><br>
>   2. **D_5 T_5 : PC < - AR, SC <- 0**
>       - **Program Counter 의 값을 강제로 바꾸는 Branch 수행**
>       - 이는 곧 **해당 AR (유효주소) 에 존재하는 명령어를 바로 수행할 수 있도록 점프**하는 것.

<br><br>

#### BSA 예시
![path](/assets/images/INU/ComputerArchitecture/timingAndControl22.png)
`좌측 메모리/PC 상태는 BSA 수행하기 직전 상태, 우측 메모리/PC 상태는 BSA 수행 후 메모리 상태.`<br>
> 1. **Memory 의 20 번지에 BSA 명령어가 존재.**
> 2. **T_1 단계에서 이미 PC 값이 1이 증가함.**
> 	- 현재 PC = 21
> 	- 만약 20번지에 BSA 명령어가 있지 않았다면, **다음 수행할 명령어는 21 번지에 존재하는 명령어 였을 것.**
> 3. **BSA 명령어에 의해 Return Address 를 Memory 에 저장.**
> 	- Return Address = 21 (현재 PC 가 21 이므로 = 다음 수행할 명령어는 21 이었으므로.)
> 4. **현재 BSA 명령어의 I bit 는 0 (직접 주소임을 나타냄), 유효주소는 135.**
> 	- 따라서 135 번지에 PC 값 (=21) 을 저장함과 동시에 AR 값을 1 증가. (AR=136) (M\[AR] <- PC, AR <- AR + 1)
> 5. **증가된 AR 값 (=136) 에는 다른 루틴 (Sub routine) 을 수행하도록 되어 있음.**

- **따라서, BSA 명령어의 결과는**
    - **Memory 의 135 번지에 돌아갈 곳의 주소인 21 을 저장 및 AR 값을 1 증가.**
    - **증가된 AR 값 (136) 을 PC 에 전송하여 136 번지에 존재하는 Subroutine 을 수행.**
- **돌아올 곳을 저장해 두었는데 Subroutine 실행 이후 어떻게 돌아오는가?**
    - Subroutine 어딘가에 **Indirect Address (=1) 를 사용하여 돌아갈 곳을 저장해둔 Memory (=135) 를 BUN 명령어와 함께 사용**한다.
    - 해당 **BUN 명령어는 135 번지를 Indirect Address 로서 받아들이고 T_3 EXECUTE 단계에서 실제 유효 주소인 21 번지를 찾아 그곳으로 점프**하여 돌아갈 수 있다.

<br><br>

### 3. ISZ : Increment and Skip if Zero
![path](/assets/images/INU/ComputerArchitecture/timingAndControl23.png)
> - **해당 유효 주소에 존재하는 값을 하나 증가시키고 만약 그 주소 값이 0인 경우, PC 값을 증가 시켜 현재 명령어를 Skip.**
>   1. **D_6 T_4 : DR <- M\[AR]**
>       - Memory 의 유효 주소에 존재하는 값을 하나 증가시키기 위해 DR 로 가져온다. (Memory 값 직접 연산 불가)
>   2. **D_6 T_5 : DR <- DR + 1**
>       - 가져온 Memory 값이 존재하는 DR 값을 1 증가.
>       - DR 에서 Memory 값을 하나 증가시킨 것.
>   3. **D_6 T_6 : M\[AR] <- DR , if (DR = 0) then (PC <- PC + 1), SC <- 0**
>       - 1이 증가된 Memory 값을 다시 현재 Memory 에 가져온다.
>       - 동시에 만약 증가된 DR 이 0이 되었다면 PC 를 증가시켜 현재 명령어를 Skip 한다.

<br><br>

## Memory 참조 명령어 - 전체 Flow Chart
![path](/assets/images/INU/ComputerArchitecture/timingAndControl24.png)
> **Memory 참조 명령어의 전체 Flow Chart 는 위와 같다.**
> - AND , ADD , LDA , ISZ 명령어는 메모리 연산을 위해 메모리 값을 DR 로 가져오는 동작을 한다.
> 	- 위 네 가지 명령어는 T_4 Clock 까지 같은 동작을 함.

<br><br>

![path](/assets/images/INU/ComputerArchitecture/timingAndControl25.png)
> **참고로, 이전 Instruction Cycle - Flow Chart 의 하단 부분에 위 Memory 참조 명령어 Flow Chart 가 속한다.**

<br><br>

## Input - Output and Interrupt
![path](/assets/images/INU/ComputerArchitecture/timingAndControl26.png)
> **Input / Output 명령어는 다음과 같이 구성된다.**
> - **INPR -> AC -> OUTR 간의 데이터 전송**
> - **1 bit 로 구성된 Input / Output 플래그 (FGI, FGO) 의 Set**
> - **Interrupt Enable Signal**
> 
> <br><br>
> 
> **I/O 명령어는 8 Bit , AC 는 12 Bit**
> - Input 명령어가 AC 로 전송될 시 **AC 의 하위 8Bit 로서 저장**됨.
> - AC 에서 OUTR 로 전송될 시 **AC 의 하위 8 Bit 가 OUTR 로 전송**됨.

<br><br>

### I/O 수행 과정
![path](/assets/images/INU/ComputerArchitecture/timingAndControl27.png)
> **Input 수행 과정**
> 1. **INPR 은 0으로 초기화 되어 있다.**
> 	- INPR 이 0 인 경우 입력을 받을 수 있다.
> 2. **INPR 에 값이 들어오면 FGI 가 1로 Set.**
> 3. **AC 에서 FGI 가 1로 Set 된 것을 보고 INPR 로부터 값의 전송을 받는다.**
> 	- **FGI 는 다시 0으로 Clear.**
> 
> <br><br>
> 
> **Ouput 수행 과정**
> 1. **FGO 는 1로 초기화 되어 있다.**
> 	- AC 가 OUTR 로 Output을 전송 할 수 있게 됨.
> 2. **AC 가 OUTR 로 값을 전송.**
> 	- FGO 를 0 으로 Set
> 3. **Output Device 에서 OUTR 의 값을 출력 한 후 FGO 를 1로 Clear.**
> 	- AC 가 다시 값을 OUTR 로 전송 할 수 있게 됨.

- 위 방식은 **매 Clock 마다 FGI / FGO 를 변경 및 Check 해가며 사용하기에 비효율적.**
    - 따라서 **Interrupt 방식을 사용**한다.

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

- [x] Timing and Control
- [x] Control Unit of Basic Computer
- [x] Instruction Cycle
- [x] Instruction Cycle - Fetch & Decode
- [x] \(1) Fetch 의 동작 과정 - 명령어를 가져온 후 PC 증가
- [x] \(2) Decode 의 동작 과정
- [x] Fetch & Decode 정리
- [x] Instruction Cycle - Determine the type of instruction
- [x] Instruction Cycle - 전체 Flow Chart
- [x] Instruction Cycle - Register 참조 명령어
- [x] Instruction Cycle - Memory 참조 명령어 7가지
- [x] 1. AND : AND to AC
- [x] 2. ADD : add to AC
- [x] 3. LDA : load to AC
- [x] 4. STA : store AC
- [x] Instruction Cycle - Memory 참조 명령어 (Branch)
- [x] 1. BUN : Branch unconditionally (무조건 점프)
- [x] 2. BSA : Branch and Save return Address (돌아올 주소를 저장하고 Branch)
- [x] BSA 예시
- [x] 3. ISZ : Increment and Skip if Zero
- [x] Memory 참조 명령어 - 전체 Flow Chart
- [x] Input - Output and Interrupt
- [x] I/O 수행 과정