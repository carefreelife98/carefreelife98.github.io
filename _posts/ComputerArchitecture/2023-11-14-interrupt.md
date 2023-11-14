---
title: "Basic Computer Organization and Design - Input / Output and Interrupt"
categories:
  - INU-ComputerArchitecture
tags:
  - INU-ComputerArchitecture
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/INU/ComputerArchitecture/interrupt1.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# Input - Output and Interrupt
> ![path](/assets/images/INU/ComputerArchitecture/interrupt1.png)<br>
> **전체적인 구성은 이전에 알아본 Instruction Cycle 과 Interrupt Cycle** 로 이루어져 있다.

<br><br>
## Interrupt Flip-Flop
> ![path](/assets/images/INU/ComputerArchitecture/interrupt2.png)<br>
> ![path](/assets/images/INU/ComputerArchitecture/interrupt3.png)<br>
> **Interrupt Flip-Flop (R, 1 bit)**
> - **0 인 경우 Instruction Cycle 동작**
> 	- **Interrupt 에 걸리지 않았기 때문에 명령을 그대로 수행.**
> 		- **수행하는 과정에서 IEN (Interrupt Enable, 1 bit) 을 확인하며 Interrupt 에 걸릴 수 있는지 확인**한다.
> 			- 만약 **IEN = 1 이 되어 Interrupt 에 걸리게 되면 FGI / FGO 를 확인**한다
> 				- Input Interrupt 인지 Output Interrupt 인지 확인.
> 				- 확인 후 **R <- 1 을 실행하여 R의 상태를 1로 바꾸어 Interrupt Cycle 로 넘어간다.**
> - **1 인 경우 Interrupt Cycle 동작**
> 	- **Interrupt Cycle : I/O Service 를 수행하도록 준비.**
> 		- 어떤 명령어를 수행하는 것이 아님. 그 전처리를 하는 과정.
> 	- **Return address 를 저장하고 해당 Interrupt 에 대한 Subroutine 으로 점프.**
> 	1. **M\[0] <- PC**
>     - Store return address in location 0
>     - **Return Address (PC) 를 메모리의 0번지에 저장.**
> 	2. **PC <- 1**
>     - 1 번지로 점프.
>     - **I/O 에 관련된 Interrupt 프로그램이 1 번지에 존재함.**
> 	3. **IEN <- 0**
>     - **1 번지로 점프 후 Interrupt Enable (IEN) 을 0 으로 Clear.**
> 	4. **R <- 0**
>     - **Interrupt Flip Flop (R) 도 0으로 Clear.**
>     - R = 0 이므로 **이제 Instuction Cycle 이 실행**됨.
>         - **1번지에 존재하는 I/O 명령어를 수행.**
>     - I/O 명령어를 수행하는 동안 Interrupt 가 걸리지 않도록 마지막에 IEN을 0 으로 Clear 해주는 것.

<br><br>

### Interrupt Cycle 예시
> ![path](/assets/images/INU/ComputerArchitecture/interrupt4.png)<br>
> 1. **[Interrupt Cycle] 255 번지의 명령어 수행 중 Interrupt 발생**
> 	- 256 번지의 명령어가 다음 명령어였으므로 Return address 로서 PC 에 저장됨.
> 	- 255 번지의 명령어는 마저 수행.
> 2. **[Interrupt Cycle] 메모리의 0 번지에 Return address 인 256 번지 저장 및 1번지로 점프.**
> 3. **[Instruction Cycle] 메모리의 1 번지에서 Sub-routine 실행.**
> 	- 1120 번지로 점프하여 명령어 수행.
> 	- 1120 번지에는 I/O Instruction 이 존재함.
> 4. **[Instruction Cycle] 1120 번지에 존재하는 I/O program 의 마지막은 간접 주소 메모리 참조 명령어인 BUN 이 존재.**
> 	- 0 번지에 존재하는 유효 주소는 Step 2 에서 저장한 Return address.
> 	- 따라서 I/O program 이 끝난 후 이전에 순차적으로 수행하던 작업을 이어나가게 됨.

- **Interrupt Cycle 은 결국 Interrupt 에 대한 명령어, Sub-routine 을 수행하기 위한 준비.**

<br><br>
# Input / Output Instructions
> ![path](/assets/images/INU/ComputerArchitecture/interrupt5.png)<br>
> **I/O Instruction 인 경우**
> - **I bit : 1**
> - **Opcode : 111**<br>
> 	== **D_7 (111) = 1**
> 
> <br><br>
> **수행되는 조건**
> - **D_7 I T_3 = p**
> 	- D_7 , I , T_3 가 모두 1 이면 실행. = p 로서 표현.
> 
> <br><br>
> **I/O Instruction (IR_i) 의 구분 방법**
> - I, Opcode 를 제외한 **하위 12 Bit 로 구분 가능.**
> 
> <br><br>
> **I/O Instruction 의 종류 (6가지만)**
> - **INP (pB_11) : AC(0-7) <- INPR, FGI <- 0**
> 	- Input character
> - **OUT (pB_10) : OUTR <- AC(0-7), FGO <- 0**
> 	- Output character
> - **SKI (pB_9) : If (FGI = 1) then (PC <- PC + 1)**
> 	- Skip on Input flag
> - **SKO (pB_8) : If (FGO = 1) then (PC <- PC + 1)**
> 	- Skip on Output flag
> - **ION (pB_7) : IEN <- 1**
> 	- Interrupt enable On
> - **IOF (pB_6) : IEN <- 0**
> 	- Interrupt enable Off
> - **p : SC <- 0**
> 	- Clear SC

<br><br>

## T Clock 과 R <- 1 수행 조건
> ![path](/assets/images/INU/ComputerArchitecture/interrupt6.png)<br>
> **R <- 1 수행 조건 (R 이 Set 될 수 있는 조건)**
> - **T_0' T_1' T_2' (IEN) (FGI + FGO): R <- 1**
> - 즉, 명령어가 수행될 때에 **FETCH(T_0 ~ T_1), DECODE(T_2) 단계에서 Set 할 수 없음.**

<br><br>

## R 등장에 따른 변동 사항
> ![path](/assets/images/INU/ComputerArchitecture/interrupt7.png)<br>
> **변동 사항 1 - Interrupt Cycle 은 3 Clock 내에 이루어짐.**
> 1. **R T_0 : AR <- 0 , TR <- PC**
> 2. **R T_1 : M\[AR] <- TR , PC <- 0**
> 3. **R T_2 : PC <- PC +1 , IEN <- 0 , R <- 0, SC <- 0**
> 
> <br><br>
> **변동 사항 2 - FETCH & DECODE 단계 변화**
> - 기존 T_0, T_1, T_3 이던 FETCH & DECODE 의 실행 조건이 아래와 같이 변화
> - **R T_0, R T_1, R T_3**

<br><br>

# Interrupt 를 포함한 전체 Flow Chart 및 Function

## Interrupt 를 포함한 전체 Flow Chart
> ![path](/assets/images/INU/ComputerArchitecture/interrupt8.png)<br>

<br><br>

## Interrupt 를 포함한 전체 Function
### FETCH & DECODE, Memory Reference Instruction
> ![path](/assets/images/INU/ComputerArchitecture/interrupt9.png)<br>

<br><br>

### Register Reference Instruction , Input / Output Instruction
> ![path](/assets/images/INU/ComputerArchitecture/interrupt10.png)

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

- [x] Input - Output and Interrupt
- [x] Interrupt Flip-Flop
- [x] Interrupt Cycle 예시
- [x] Input / Output Instructions
- [x] T Clock 과 R <- 1 수행 조건
- [x] R 등장에 따른 변동 사항
- [x] Interrupt 를 포함한 전체 Flow Chart 및 Function
- [x] Interrupt 를 포함한 전체 Flow Chart
- [x] Interrupt 를 포함한 전체 Function
- [x] FETCH & DECODE, Memory Reference Instruction
- [x] Register Reference Instruction , Input / Output Instruction
