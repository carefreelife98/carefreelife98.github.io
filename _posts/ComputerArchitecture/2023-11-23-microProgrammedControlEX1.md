---
title: "Micro-programmed Control - Example"
categories:
  - INU-ComputerArchitecture
tags:
  - INU-ComputerArchitecture
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/INU/ComputerArchitecture/microProgrammedEx1.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# Micro-programmed Control 예시
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx1.png)<br>
`좌측 하단 회로: 전체 하드웨어 구조 / 우측 하단 회로: Control Unit 의 상세 구조`<br>
`우측 상단 값: Memory 의 주소 - 저장된 값`<br>

## 1. Micro-program 분석
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx1.png)<br>
> **Memory 의 크기: 2048 x 16**
> - **명령어 : 1000 0000 1000 0000 (16-bit)**
> 	- I bit = 1 (1-bit)
> 	- Opcode = 0000 (4-bit)
> 	- **Address = 000 1000 0000(11-bit)**
> - **Memory 의 크기는 2^(address bit 크기) * 명령어의 bit 크기**
> 	- **2^11 * 16 = 2048 x 16 bit**
>
> <br><br>
> 
> **AR, PC 의 크기: 명령어의 주소를 저장하므로 11 bit**
> 
> <br><br>
> 
> **DR, AC 의 크기: Data / 명령어 값을 가지는 Register - 16bit**
> 
> <br><br>
> 
> **Control Memory 의 크기**
> - **Micro-instruction 의 크기를 20 bit 로 정의**
> 	- Microoperation(F1, F2, F3)
> 		- 3 x 3 = 9-bit
> 	- CD = 2-bit
> 	- BR = 2-bit
> 	- **AD = 7-bit**
> - **따라서, 2^(AD) * 명령어의 bit 크기**
> 	- **Control Memory 의 크기 : 2^7 * 20**

<br><br>

## 2. Micro-program 명령어 수행 과정
> 1. **PC 값 확인을 통한 현재 실행해야 하는 명령어 파악**
> 	- PC = 000 0001 0000
> 	- **실행해야 하는 명령어 : M\[PC] = 1000 0000 1000 0000**
> 	
>    <br><br>
> 2. **명령어 구조 파악: 1000 0000 1000 0000**<br>
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx2.png)<br>
> 	- I-bit = 1 (= Indirect)
> 	- Opcode = 0000 (= ADD)
> 	- AD = 000 1000 0000
> 		- **Indirect 주소(000 1000 0000)를 가진 ADD 명령어임.**
> 	- Indirect 주소인 000 1000 0000 에는 0000 0001 0000 0000 이 존재.
> 		- **해당 값에 의해 실제 유효 주소는 001 0000 0000 임을 알 수 있음.**
> 	- **유효 주소인 001 0000 0000 에는 0000 0000 0000 0101 이 저장되어 있으며, 이는 ADD 의 피연산자 값이 된다.**
> 	
>    <br><br>
> 3. **명령어 수행**
> 	- **ADD: AC <- AC + M\[EA]**
> 		- AC = 3
> 		- M\[EA] (유효 주소에 저장된 값) = 0000 0000 0000 0101 = 5
> 	- **따라서, AC 에는 3+5 연산 수행의 결과인 8이 저장됨.**
> 	
>    <br><br>
> 4. **명령어 수행 후: Always FETCH**<br>
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx3.png)<br>
> 	- **모든 명령어는 수행 및 종료 후 CAR 에 FETCH 주소를 저장. (FETCH 단계로 이동)**
> 		- **FETCH: 1000000 (64)**
> 		- 예: ADD 명령어의 마지막 Microoperation
> 			- CD(00) BR(00) AD(1000000) = Unconditionally Jump to FETCH
> 	- **따라서, 현재 CAR 에는 100 0000 이 저장되어 있음.**
> 	- **이후 FETCH 단계에서 다음 명령어를 가져오며 명령어 수행 반복.**
> 	

<br><br>

## 3. FETCH 단계부터 명령어 수행 과정
> 1. **FETCH(1) 수행: CAR = 100 0000**<br>
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx4.png)<br>
> 	- **Micro-instruction: 110 000 000 00 00 1000001**
> 		- **Control memory 에 저장되어 수행됨.**
> 		- **동시에 CAR 에 연결된 Incrementer 가 CAR 값을 하나 증가.**
> 			- **다음 수행할 Micro-instruction 의 주소를 가지게 됨.**
> 			- Incrementer <- CAR + 1 = 100 0001 (65)
> 	- **F1, F2, F3 = 110, 000, 000**
> 		- **110 : AR <- PC**
> 		- 현재 PC 에 존재하던 **000 0001 0000 이 AR 에 저장**된다.
> 	- **CD = 00, BR = 00**
> 		- **Unconditionally Jump (무조건 점프)**
> 	- **AD = 1000001**
> 	- **따라서 1000001 번지로 점프하여 해당 Micro-instruction 을 수행한다.**
> 	
>     <br><br>
> 2. **FETCH(2) 1000001 번지의 Micro-instruction 수행**<br>
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx5.png)<br>
> 	- **Micro-instruction: 000 100 101 00 00 1000010**
> 		- **F1, F2, F3 = 000, 100, 101**
> 			- **F2 100 (Read) : DR <- M[AR]**
> 			- **F3 101 (PC + 1): PC <- PC + 1**
> 		- **CD = 00, BR = 00**
> 			- **Unconditionally Jump (무조건 점프)**
> 		- **AD = 1000010**
> 	- **따라서 1000010 번지로 점프하여 해당 Micro-instruction 을 수행한다.**
> 	
>     <br><br>
> 3. **FETCH (3) 1000010 번지의 Micro-instruction 수행**<br>
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx6.png)<br>
> 	- **Micro-instruction: 101 000 000 00 11 0000000**
> 		- **F1, F2, F3 = 101, 000, 000**
> 			- **F1 101 : AR <- DR(0-10)**
> 				- AR 에 DR 에 저장되어 있는 11-bit 의 명령어 Address field를 가져온다
> 		- **CD = 00, BR = 11**
> 			- **BR 의 11 은 Mapping.**
> 				- **Mapping: 명령어의 4-bit 로 구성된 Opcode 부분을 7-bit 로 변환하여 CAR 에 저장.**
> 					- Opcode = 0000
> 					- 앞에 0, 뒤에 00 삽입
> 				- **0 0000 00 = ADD 명령어**
> 		- **AD = 0000000**
> 	
>         <br><br>
> 4. **실제 명령어 (ADD) 수행**<br>
> ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx7.png)<br>
> 	- **Micro-instruction: 000 000 000 01 01 1000011**
> 		- **CD = 01**
> 			- **I bit 참조 (I = 1인지 0인지)**
> 				- 현재 I bit = 1
> 		- **BR = 01**
> 			- Call
> 				1. **Return Address 저장.**
> 					- **현재 0000000 에 존재하는 명령을 수행 중이므로 Return Address 는 다음 수행할 명령어가 있는 0000001 이 된다.**
> 					- 이는 CAR(0000000) 에 연결되어 있는 Incrementer 에 의해 CAR 값이 1 증가(0000001) 되어 SBR 에 저장됨으로서 수행.
> 				2. AD 로 JUMP.
> 					- AD = 1000011
> 	- **따라서 1000011(67) 번지로 점프하여 해당 Micro-instruction 을 수행한다.**
> 	
>     <br><br>
> 5. **INDRCT (1000011, 67)**
> 	- 현재 Indirect 주소를 참조하였으므로 실제 유효 주소로 Jump.
> 	- **Micro-instruction(INDRCT 1): 000 100 000 00 00 1000100**<br>
>     ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx8.png)<br>
> 		- **F2 100 (Read) : DR <- M[AR]**
> 			- 유효 주소를 DR 에 가져온다.
> 		- **CD = 00, BR = 00**
> 		- **AD = 1000100** 으로 Jump.
> 		
>         <br><br>
> 	- **Micro-instruction(INDRCT 2): 101 000 000 00 10 0000000**<br>
>     ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx9.png)<br>
> 		- **F1 101 : AR <- DR(0-10)**
> 		- CD = 00
> 		- **BR = 01 (Return)**
> 			- Unconditionally Return
> 			- **SBR 에 저장되어 있는 주소(0000001)를 CAR 에 가져와 해당 주소로 돌아간다.**
> 	
>             <br><br>
> 6. **ADD 연산 수행 (0000001)**
> 	- **Micro-instruction(ADD 1): 000 100 000 00 00 0000010**<br>
>     ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx10.png)<br>
> 		- **F2 100 (Read) : DR <- M[AR]**
> 			- **M[AR(001 0000 0000)] = 0000 0000 0000 0101 (=5)**
> 		- CD, BR = 00 , AD = 0000010
> 			- **Unconditionally Jump Next (0000010)**
> 	
>             <br><br>
> 	- **Micro-instruction(ADD 2): 001 000 000 00 00 1000000**<br>
>     ![path](/assets/images/INU/ComputerArchitecture/microProgrammedEx11.png)<br>
> 		- **F1 001 (ADD) : AC <- AC + DR**
> 		- CD, BR = 00, **AD = 1000000 (64 = FETCH)**
> 			- **Unconditionally Jump to FETCH**
> 		- **ADD 연산을 수행 후 다시 FETCH 로 돌아가 다음 명령 수행 준비를 한다.**

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

- [x] Micro-programmed Control 예시
- [x] 1. Micro-program 분석
- [x] 2. Micro-program 명령어 수행 과정
- [x] 3. FETCH 단계부터 명령어 수행 과정
