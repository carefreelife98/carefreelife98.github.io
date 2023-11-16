---
title: "Basic Computer Organization and Design - (Example) Increment / Add"
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

# 동작 과정 예시 : INCREMENT
> ![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign1.png)<br>
> 1. **현재 PC 에는 0000 0001 0100 값이 저장**되어 있음. <br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign2.png)<br>
> 	- **PC 에 저장된 값은 실행할 명령어의 주소.**
> 	- 해당 주소에는 **0111 0000 0010 0000 이라는 명령어**가 존재.
> 		- **I bit 가 0 이고, Opcode 가 111 이므로 Register 참조 명령어**임을 알 수 있다.
> 		- **(현재 예시에서) B_5 가 1 인 명령어 = INCREMENT**
> 2. **T_0 ~ T_2** 는 모든 명령어에서 공통 부분인 **FETCH & DECODE**.
> 	- **T_0 ~ T_2 동작 과정**
> 		1. AR 에서 PC 를 가져와 저장.
> 		2. AR 에 저장된 주소를 메모리에서 참조 후 명령어를 찾아 IR 에 저장. 그와 동시에 PC 값 1 증가.
> 		3. DECODE 하면서 최상위 비트를 I 에 저장함과 동시에 AR 에 피연산자의 주소를 저장.
> 3. **INCREMENT 명령어는 T_3 에서 AC 값을 1 증가시킨 후 종료.**

<br><br>

## 회로의 동작 과정 1. INCREMENT

> 1. **T_0 에 1 이 들어가면서 시작.**<br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign3.png)<br>
> 	<br><br>
> 2. **T_0: AR <- PC**<br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign4.png)<br>
> 	- **PC 를 Common Bus System 에 Load.**
> 		- 공통 버스 시스템의 Selection Signal 을 010 으로 주어 PC 가 연결되어 있는 2번 Port 를 열어준다.
> 	- **동시에 AR 을 Load 해야함.**
> 		- AR 의 Load 신호에 1을 전달.
> 	- **위 과정의 결과로 PC 의 값이 AR 에 저장된다.**
>
> 	<br><br>
> 3. **T_1 IR <- M\[AR], PC <- PC + 1**<br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign5.png)<br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign6.png)<br>
> 	- **Memory\[AR] 를 읽어 IR 에 저장**
> 		- **동작 과정**
> 			- 공통 버스 시스템의 Selection Signal 을 111 으로 주어Memory 가 연결되어 있는 7번 Port 를 열어준다.
> 			- Memory Read 에 1을 전달하여 AR 값을 Read
> 			- IR 의 Load 에 1을 전달
> 		- **IR 에 명령어가 저장되면 곧바로 Control Unit 의 3 x 8 Decoder 에 의해 D_3 가 활성화 된다.**
> 	- **동시에 PC 의 Increment 에 1을 전달**
>
> 	<br><br>
> 4. **T_2: D_0, ... , D_7 <- Decode IR(12 - 14), AR <- IR(0 - 11), I <- IR(15)**<br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign7.png)<br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign8.png)<br>
> 	- **동작 과정**
> 		- **DECODE**
> 			- **T_1 단계에서 IR 에 명령어가 저장 될 시 이미 진행됨.**
> 		- **AR <- IR(0 - 11)**
> 			- IR 의 하위 12 bit 를 AR 에 저장
> 				- BUS Selection Signal = 101 (5)
> 				- AR 의 Load 활성화
> 		- **I <- IR(15)**
> 			- IR 의 최상위 비트를 I (1 bit Register) 에 저장.
> 				- I (1 bit Register) 의 Load 활성화
>
> 	<br><br>
> 5. **T_2 과정이 끝난 후**
> 	- **I (1 bit Register) 의 값과 D_7 을 참조해서 명령어의 종류를 구분.**
> 		- 현재 **I = 0, D_7 = 1 이므로 Register 참조 명령어** 임을 알 수 있음.
> 	- 명령어의 세부 사항(종류)를 나타내는 B_0 ~ B_11 은 AR 에 저장되어 있지만 Memory 참조 명령어가 아니기 때문에 의미가 없음.
> 	- 따라서 Control Logic Gate 의 Input 으로 들어가는 B_0 ~ B_11을 조사해서 명령어의 세부적인 구분을 수행함.
>
> 	<br><br>
> 6. **T_3: AC <- AC + 1**<br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign9.png)<br>
> 	- **순차 카운터 (SC) 에 의해 T_3 가 1이 되면서 AC 의 INR 이 활성화되어 AC 값이 1 증가.**

<br><br>

# 동작  과정 예시 : ADD
> ![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign10.png)<br>
> 1. **PC 의 값을 참조해보면 해당 주소에 0001 0001 0000 0000 이 존재.**
> 2. **0001 0001 0000 0000**
> 	- **직접 주소 형식의 Memory 참조 명령어인 ADD** 임을 알 수 있음.
> 	- **ADD 할 피연산자는 0001 0000 0000 에 존재하고, 그 값은 0000 0000 0000 0011 으로 3** 인 것을 알 수 있음.
> 3. **연산 결과**
> 	- ADD: AC <- AC + 피연산자값
> 		- **현재 AC 에는 1이 저장되어 있고 피연산자는 3 이므로 1+3 = 4 가 최종적으로 AC에 저장됨.**

<br><br>

## 회로의 동작 과정 2. ADD

> 1. **T_0 ~ T_2 까지는 FETCH & DECODE 로 공통적인 부분.**
> 2. **T_3 에서는 아무 동작을 하지 않음. (현재 직접 주소를 사용하고 있으므로)**
> 3. **D_1 T_4 : DR <- M\[AR]**<br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign11.png)<br>
> 	1. 순차 카운터 (SC) 1 증가하여 0100 이 4 x 16 Decoder 에 전달되어 Output 으로 **T_4 가 활성화.**
> 	2. **Memory 에서 AR 값을 가진 주소에 피연산자가 존재함.**
>     - 해당 피연산자 값을 DR 에 가져온다.
>        - BUS Selection Signal = 111
>        - Memory 의 Read 활성화 필요
>        - DR 의 Load 활성화 필요
>
> 	<br><br>
> 4. **D_1 T_5 : AC <- AC + DR, E <- C_out, SC <- 0**<br>
> 	![path](/assets/images/INU/ComputerArchitecture/basicComputerDesign12.png)<br>
> 	1. 순차 카운터 (SC) 1 증가하여 0101 이 4 x 16 Decoder 에 전달되어 Output 으로 **T_5 가 활성화.**
> 	2. **기존 AC 값과 DR 에 존재하는 피연산자의 값을 더한다.**
>     - AC 와 DR 은 Adder and logic 에 연결되어 있음.
>     - Adder and logic 에서 기존 AC 값와 DR 값의 가산 후 End Carry 는 E 에 저장하고 남은 결과를 다시 AC에 저장.
>         - AC 의 Load 활성화 필요

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

- [x] 동작 과정 예시 : INCREMENT
- [x] 회로의 동작 과정 1. INCREMENT
- [x] 동작  과정 예시 : ADD
- [x] 회로의 동작 과정 2. ADD
