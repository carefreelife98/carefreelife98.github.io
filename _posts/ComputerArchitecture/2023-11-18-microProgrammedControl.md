---
title: "Micro-programmed Control - Control Memory, Control Address Register (CAR), Address Sequencing"
categories:
  - INU-ComputerArchitecture
tags:
  - INU-ComputerArchitecture
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/INU/ComputerArchitecture/microProgrammedControl1.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# Control Memory
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl1.png)<br>
`Micro-program 의 전반적인 모습 및 구성요소`

<br><br>

## Hard-wired Control vs Micro-programmed Control
> **Hard-wired Control : 회로로서 Control 이 설계되어 있음.**
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl2.png)<br>
> - ADD 라는 Control 을 위해서 각 Timing signal (T_0 ~ T_5) 에 적절한 Micro-operation 을 수행하도록 회로를 설계.
> - **모든 Control 이 Hardware 적으로 설계되어 있음.**
>
> 	<br><br>
> **Micro-programmed Control : Micro-program 에 의해 Control 이 설계됨.**
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl3.png)<br>
> - **Control 을 위한 Memory (Control Memory) 가 따로 존재.**
> 	- **Control Memory : Micro-program 들이 적재되는 Memory.**
> 		- **Micro-program 을 구성하는 각각의 명령어를 Micro-instruction** 이라고 한다.
> 	- Control Memory 내부에 존재하는 **Micro-program 에 의해 각각의 명령어가 수행**되도록 함.
> - **Control Memory 는 Control word 를 출력.**
> 	- **Control word** : 해당 Clock 에서 어떠한 Micro-operation 을 수행할지 선택하는 Control Signal 의 조합
> 		- **Control variable** : Micro-operation 을 구체화하여 분류.

<br><br>

## General Configuration of a Micro-programmed Control Unit

> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl4.png)<br>
> 1. **Control Memory**
> 	- Cotrol 을 위한 Micro-program 들이 적재되어 있는 Memory
> 2. **Control Address Register (CAR)**
> 	- **Control Memory 내부에 적재되어 있는 각 Micro-instruction 이 존재하는 주소를 가지고 있는 Register.**
> 	- 이전에 배운 **AR 과 비슷한 기능**을 함.
> 	- **동작 과정**
> 		1. **Address Sequencer 에 의해 다음 실행할 Micro-instruction 의 주소가 결정.**
> 		2. **해당 주소가 Control Address Register 에 저장됨.**
> 		3. **Control Memory 가 Control Address Register 에 저장되어 있는 주소를 참조하여 해당 주소에 저장되어 있는 Micro-instruction 을 Control Data Register 에 저장.**
> 		4. **Control Data Register 에 저장된 것이 곧 Control Word 로서 저장.**
> 			- 즉, Control word == Micro-operation

<br><br>

# Address Sequencing

> **Micro-instruction 이 모여 Micro-program 이 되고, Micro-program 이 모여 Control Memory 를 구성한다.**
> - **Address Sequencing** :
> 	- 이때 어떠한 **Micro-instruction 을 수행하기 위해 해당 주소를 어떻게 지정할 것인지**에 대한 전략.

<br><br>

## Micro-program Routine

> **각각의 Micro-instruction 은 Micro-program Routine 을 가지고 있다.**
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl5.png)<br>
> - ADD 의 경우에는 **NOP -> READ -> ADD 라는 Routine** 을 가짐.

<br><br>

## 각 Micro-instruction 수행 과정

> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl6.png)<br>
> 1. **FETCH**
> 2. **해당 명령어에 필요한 유효 주소 결정**
> 3. **명령어 실행 후 FETCH 로 돌아감**

<br><br>

## Address Sequencing : 4가지 방법
### 1. Increment of CAR
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl7.png)<br>
> Program Counter 를 하나 증가시키는 것과 비슷한 원리.
> - **Control Memory 에 있는 Micro-program 을 순차적으로 수행.**

<br><br>

### 2. Conditional Branching
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl8.png)<br>
> **특정 명령어 수행 중 조건 충족 시 지정된 특정 명령어로 점프하는 것.**
> - Control Memory 에서 Branch address Line 을 통해 해당 주소를 CAR 에 저장.

<br><br>

### 3. Mapping from Instruction
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl9.png)<br>
> **해당 명령어의 실행 첫 부분에 Control Memory 의 번지 수를 지정**
> - **Micro-instruction 의 Code 일부분을 토대로 해당 Instruction 의 Address 로 변환**하는 방법.

<br><br>

> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl10.png)<br>
> **Control Memory, CAR 의 범위는 7 Bit 로 설정.**
> - **Micro-instruction 의 Opcode (4 bit) 를 7 bit 로 변환**해야 한다.
> 	- **기존 Opcode 에 최상위 비트 0 1개, 하위 비트 0 2개를 추가.** <br>
>       ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl11.png)<br>
> 		- 이 경우 위 사진과 같이 하위 비트 경우의 수 만큼 해당 명령어의 주소 범위가 생성됨.
> 	- 이렇게 생성된 **Address 를 해당 명령어가 포함된 Routine 의 첫번째 주소로 지정.**

<br><br>

### 4. Subroutine Call and Return
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedControl12.png)<br>
> **Conditional Branching 등에 의해 특정 명령어로 점프했을 경우 돌아올 주소를 Subroutine Register 에 저장.**
> - **Subroutine Reguster 에 저장되어 있는 돌아올 주소를 꺼내 CAR 에 넣는 것.**

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

- [x] Control Memory
- [x] Hard-wired Control vs Micro-programmed Control
- [x] General Configuration of a Micro-programmed Control Unit
- [x] Address Sequencing
- [x] Micro-program Routine
- [x] 각 Micro-instruction 수행 과정
- [x] Address Sequencing : 4가지 방법
- [x] 1. Increment of CAR
- [x] 2. Conditional Branching
- [x] 3. Mapping from Instruction
- [x] 4. Subroutine Call and Return
