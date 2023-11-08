---
title: "Basic Computer Organization and Design - Instruction Codes, Computer Registers"
categories:
  - INU-ComputerArchitecture
tags:
  - INU-ComputerArchitecture
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/INU/ComputerArchitecture/instructionCode6.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# Instruction Codes
> **Instruction : 명령어.**
> - 일련의 명령어가 하나의 프로그램이 된다.
> - Microoperation 이 모여 명령어가 되고 명령어가 모여 하나의 프로그램이 됨.

## 명령어의 형식 (16-Bit Computer)
![path](/assets/images/INU/ComputerArchitecture/instructionCode1.png)
> **메모리 참조 명령어**
> - **각 명령어의 Word 는 16 Bit 로 이루어짐.**
> 	- **최상위 1 Bit : I-Bit**
> 		- **유효 주소 설정 방식**을 나타냄
> 			- **I = 0 : Direct** Address
> 			- **I = 1 : Indirect** Address
> 	- **상위 3 Bit : Opcode Field**
> 		- **명령어의 종류**를 나타냄
> 	- **하위 12 Bit : Address Field**
> 		- **피 연산자의 주소**를 나타냄
> - 피 연산자는 16 Bit로 구성됨.
> <br><br>
> **메모리의 크기**
> 	- 각 명령어의 **Address Field 크기가 12 Bit** 이므로, **2^12 개의 주소를 16 Bit 만큼** 가지게 됨.
> 		- **메모리의 크기는 4096 (2^12) * 16** 의 크기를 가짐
> 
> <br><br>
> 
> **Processor register - Accumulator (AC)**
> - **처리된 결과가 저장되는 Register.**
> - 산술연산, 논리연산 등이 계산되어 저장되어 있는 Register.
> - **누산기** 라고 함.

<br><br>

## Effective Address (유효 주소)
![path](/assets/images/INU/ComputerArchitecture/instructionCode2.png)
> **실제 Operand (피연산자) 의 주소를 의미.**
> - **주소를 지정하는 세 가지 방식**이 존재.
> 	1. **Direct Address (직접 주소)**
> 		- 해당 **Address Field 값이 실제 Operand 의 주소**가 되는 경우.
>       <br><br>
> 	2. **Indirect Address (간접 주소)**<br>
> 		![path](/assets/images/INU/ComputerArchitecture/instructionCode3.png)
> 		- 해당 **Address Field 위치에 (다른 위치에 존재하는) Operand 의 주소가 존재**하는 경우.
>       <br><br>
> 	3. **Immediate**
> 		- **Address Field 값 자체가 Operand** 가 되는 경우.

<br><br>

### 유효 주소 사용 예시
![path](/assets/images/INU/ComputerArchitecture/instructionCode4.png)
> **Direct address (직접 주소) 방식**
> - **I = 0 이므로 직접 주소 형식으로 ADD Operand 가 저장**되어 있음.
> - **실제 AC 에 있는 값을 유효 주소의 번지에 있는 Operand(ADD)를 AC 에 더해서 다시 AC에 저장**하는 과정.
> 	- **AC <- AC + M\[EA]**
> 
> <br><br>
> 
> **Indrect address (간접 주소) 방식**
> - **I = 1 이므로 간접 주소 형식으로 ADD Operand 가 저장**되어 있음.
> - **300 번지에 존재하는 값이 실제 유효 주소**가 됨.
> - **1350 번지에 존재하는 Operand 값을 기존 AC 값과 합한 후 AC 에 다시 저장.**

<br><br>

# Computer Registers
> **범용 Register 가 아닌 <br>각각의 특수한 기능을 수행하는 Register 를 가지고 있는 16-Bit Computer 에 대한 것.**

<br><br>

## List of Registers
![path](/assets/images/INU/ComputerArchitecture/instructionCode5.png)
> **PC (Program Counter)**
> - **명령어의 주소가 저장**되는 Register.
> - Address 가 저장되므로 12 Bit 로 이루어짐.
> 
> <br><br>
> 
> **AR (Address Register)**
> - 메모리가 참조하게 되는 유효 주소가 저장되는 Register.
> - 12 Bit
> 
> <br><br>
> 
> **Data 나 명령어를 다루는 나머지 Register 들은 전부 16 Bit 로 구성.**
> - **IR (Instruction Register)**
> 	- 명령어를 저장하는 Register.
> - **DR (Data Register)**
> 	- 피연산자가 주로 저장됨.
> - **TR (Temporary Register)**
> 	- 임시 저장을 위한 Register.
> - **AC (Accumulator)**
> 	- 기본적으로 산술, 논리 연산 처리가 저장되는 Register
> - **INPR, OUTR (Input, Output Register)**
> 	- Serial 통신을 가정하기 때문에 8 Bit Regiter 이다.
> 
> <br><br>
> 
> **메모리는 2^12 = 4096 개의 word 를 가지는 Memory.**

<br><br>

## Data 의 이동 - Bus System
![path](/assets/images/INU/ComputerArchitecture/instructionCode6.png)
> - **Bus System 을 이용**해서 **`Register <-> Register`** , **`Register <-> Memory`** 간의 **Data 전송이 수행**된다.
> - **각각의 Register 는 일반적으로 Load(LD), Increment(INR), Clear(CLR) 을 갖는다.**
> - **Selection Signal (S2, S1, S0) 에 의해 BUS 에 Load 될 Register 종류 및 그 값이 정해진다.**
> - Selection Signal 이 111 인 경우, **Register 에는 항상 AR 이 연결**되어 있으므로 **Memory 가 AR 에 저장되어 있는 주소 값을 참조해서 적절한 값을 찾아 BUS 에 Load** 하는 것.
> 
> <br><br>
> 
> ![path](/assets/images/INU/ComputerArchitecture/instructionCode7.png)
> **AR 과 Program Ccounter 는 12 Bit** 이지만 **BUS 는 16 bit, 즉 16개의 Line** 으로 이루어짐.
> - 위처럼 AR 과 PC 가 Selection Signal 에 의해 선택되어 **BUS 에 Load 될 경우에는 상위 4개의 Bit 가 0으로 채워진 후 BUS 에 Load** 된다.
> - 마찬가지로 **BUS 에서 AR 과 PC 가 값을 읽어올 때에도 해당 값의 하위 12 Bit 만 읽어온다.**
> - 같은 원리로 **Output Register (OUTR) 도 BUS Line 으로부터 값을 읽어올 때 하위 8 Bit 만 읽어오게 된다.**

<br><br>

![path](/assets/images/INU/ComputerArchitecture/instructionCode8.png)
> **AC & DR 의 특수한 경우**
> - **DR 은 AC 에 연결**이 되어 있다.
> 	- **DR 의 Output 이 그대로 AC 에 전송**이 될 수 있음.
> - Selection Signal 이 100 인 경우 (index 4 선택)
> 	- AC 의 값이 BUS 에 그대로 올라온다.
> 	- 이때 **DR 과 AC 의 Load가 동시에 1**이 되면, **BUS 에 올라온 AC 값이 그대로 DR 의 Input 으로 전송.**
> 	- 또한 DR 은 Adder 의 AND logic 을 통해 AC 에 연결되어 있으므로 만약 **Adder 의 Selection Signal 이 No Change, 즉 그대로 전송하는 기능을 선택하고 있다면 AC 에 DR 의 Output 이 그대로 전송됨.**
> - 위와 같은 과정에 의해 **하나의 Clock 시간동안 DR 과 AC 의 값의 교환이 발생할 수 있다. (사진과 같은 설계를 가정한 특수한 경우)**

<br><br>

# Instruction Format
![path](/assets/images/INU/ComputerArchitecture/instructionCode9.png)
> **명령어는 다음과 같은 세 가지 종류가 존재하며 각 종류에 따라 정의하는 Field 의 내용이 달라짐.**
> - **Memory 참조 명령어**
> 	- I 의 값 (0 or 1) 에 따라 직접 주소인지, 간접 주소인지 판별.
> 	- Opcode (3 Bit - 000 ~ 110) 에 따라서 명령어의 종류가 달라짐.
> 	- 나머지 12 Bit (Address) 는 피연산자의 주소를 나타냄.
> - **Resgister 참조 명령어**
> 	- **I Bit 값이 0, Opcode 가 111 인 경우**
> 	- **나머지 Field (12 Bit) 가 각 명령어의 종류**가 됨.
> - **I/O 명령어**
> 	- **I Bit 값이 1, Opcode 가 111 인 경우**
> 	- **나머지 Field (12 Bit) 가 각 명령어의 종류**가 됨.



**실제 명령어의 구성을 보면 다음과 같다.**<br>
![path](/assets/images/INU/ComputerArchitecture/instructionCode10.png)

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

- [x] Instruction Codes
- [x] 명령어의 형식 (16-Bit Computer)
- [x] Effective Address (유효 주소)
- [x] 유효 주소 사용 예시
- [x] Computer Registers
- [x] List of Registers
- [x] Data 의 이동 - Bus System
- [x] Instruction Format
