---
title: "Sequential Circuits (순차 회로)"
categories:
  - INU-ComputerArchitecture
tags:
  - INU-ComputerArchitecture
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
   teaser: "/assets/images/INU/ComputerArchitecture/SequentialCircuit3.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# Sequential Circuit's Excitation Table
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit1.png)

<br><br>

# Analysis
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit2.png)
- **Circuit 의 Output 이 Input 뿐만 아니라 이전 상태에 따라 결정된다.**
	- **순서의 개념 추가됨**
	- 동기화된. Clocked. Synchronized. 순차 회로라고도 함.
- **분석 순서**
	1. Boolean Function (Flip Flop 의 Input 과 Output) 찾기
	2. State Table 찾기
	3. State Diagram 그리기

## Analysis of Sequential Circuit 
### 1. Boolean Function 찾기
#### Flip-Flop 의 D input 에 대한 Boolean Function 찾기
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit3.png)
- input : x
- State : (A, A'), (B, B') 
- Output : y

- **D input(Flip-Flop) Equation**
	- `D_A = Ax + Bx`
	- `D_B = A'x`
- **Combinational Circuit Output Equation**
	- `y = Ax' + Bx'`

<br><br>

### 2. State Table (상태표) 찾기
#### State Table 구성 요소
**Input**
- Present State (A, B)
- Input (x)

**Output?**
- Next State (A, B)
- Output (y)

**Flip-Flop Inputs**
- D_A, D_B

#### State Table 찾기
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit4.png)
- **D F-F 는 현재 상태와 상관없이 다음 상태에 따라 Output 이 결정**된다.
	- 따라서 **D_A, D_B 를 그대로 Next States A, B 에 가져온다.**
	- D FF 에서는 FF-Inputs 를 찾을 필요 없이 Next States 까지만 찾아도 된다. (Next States == FF-Inputs 이므로)

<br><br>

### 3. State Diagram 그리기
> 각각의 상태가 Input에 의해 다음 상태가 어떻게 되는지 확인하는 것.
> State Table 을 기반으로 그릴 수 있다.

![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit5.png)

```
(입력)/(출력) : " / " 앞 부분은 입력, 뒷 부분은 출력을 나타냄.

(현재 상태) -> (다음 상태) : 화살표의 출발점은 현재 상태, 도착점은 다음 상태를 나타냄.
```

<br><br>

## 예시 1
### Boolean Function 찾기
#### Sequential Circuit
> Input: x
> State : A, B
> FF : JK
> JK Input: J_A, K_A, J_B, K_B

#### Boolean Function
> J_A = B, K_A = Bx'
> J_B = x', K_B = A XOR x

![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit6.png)

<br><br>

### State Table 찾기
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit7.png)


| Pr.St | Input | Nx.St | FF-Input        |
| ----- | ----- | ----- | --------------- |
| A, B  | x     | A, B  | J_A,K_A,J_B,K_B |
| ----- | ----- | ----- | --------------- |
| 0 0   | 0     | 0 1   | 0 0 1 0         |
| 0 0   | 1     | 0 0   | 0 0 0 1         |
| 0 1   | 0     | 1 1   | 1 1 1 0         |
| 0 1   | 1     | 1 0   | 1 0 0 1         |
| ----- | ----- | ----- | --------------- |
| 1 0   | 0     | 1 1   | 0 0 1 1         |
| 1 0   | 1     | 1 0   | 0 0 0 0         |
| 1 1   | 0     | 0 0   | 1 1 1 1         |
| 1 1   | 1     | 1 1   | 1 0 0 0         |

<br><br>

### State Diagram 그리기
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit8.png)

<br><br>

# Sequential Circuit Design (설계)
> 회로의 동작, 기능 등이 주어지면 해당 Circuit을 그리는 것.
> 	- Analysis 와는 반대의 과정.

## Binary Counter
> input 이 1 일 때, `00 -> 01 -> 10 -> 11` 순으로 상태가 변함. (Counter - 반복)
> input 이 0 일 때, 상태는 변하지 않음.

### 1. State Diagram 그리기
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit9.png)


### 2. State Table 찾기
> FF : JK Flip-Flop
> Input : x
> Excitation Table (기저 테이블, 여기표) 사용.

![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit10.png)

| Present States / Input | Next States (P.S와 Input에 의해 결정됨) | FF - Imputs |
| ---------------------- | --------------------------------------- | ----------- |
| A B             x      | A B                                     | JA,KA,JB,KB |
| 0 0 0                    | 0 0                                    | 0 x 0 x           |
| 0 0 1                    | 0 1                                     |    0 x 1 x        |
| 0 1 0                    | 0 1                                  |       0 x x 0     |
| 0 1 1                    | 1 0                                |1 x    x 1         |
| -----------------      | ---------------------------------------  | ----------- |
| 1 0 0                    | 1 0                                   |   x 0 0 x         |
| 1 0 1                    | 1 1                                  |      x 0  1 x     |
| 1 1 0                    | 1 1                                   |x 0    x 0         |
| 1 1 1                    | 0 0                           |   x 1       x 1   |


###  JK Flip-Flop 에 대한 Boolean Function 찾기 (K-map)
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit11.png)

### Sequential Circuit (순차 회로) 그리기
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit12.png)

<br><br>

## 3-Bit Binary Counter
> 각 비트의 개수 만큼 Flip-Flop 이 필요함. (본 예제에서는 T F-F 사용)
> 0 ~ 7 범위를 순환하는 Counter.

### 1. State Table 찾기
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit13.png)

### 2. T Flip-Flop Input 에 대한 Boolean Fumction 찾기
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit14.png)

### 3. 3-Bit Counter Circuit 그리기
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit15.png)

### 4. 3-Bit Counter Circuit 분석
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuit16.png)
- A0
	- Always Complement
- A1
	- A0 가 1일때 Complement
		- Clock pulse 가 상승하는 경우에만 Toggle.
		- Clock Pulse 가 상승 할 때 값이 1 or 0 으로 전환된다.
- A2
	- A0 와 A1 이 모두 1인 경우에만 1.
	- AND Gate 가 존재 하므로.

<br><br>

# In-class Ex

![path](/assets/images/INU/ComputerArchitecture/SequentialCircuitInClassEX1.png)

## Q1. Analysis

> **현재 상태 : 아래에서 올라온 Carry**

1. Full Adder Logic 찾기
2. Full Adder Logic 을 바탕으로 State Table 작성
3. State Diagram 작성

결과

![path](/assets/images/INU/ComputerArchitecture/SequentialCircuitInClassEX2.png)

<br><br>

## Q2. Design

1. State Diagram 작성
2. State Table 작성
3. JK Flip-Flop Excitation Table 을 바탕으로 Input Equation 찾기
4. Circuit 그리기

### 나의 풀이

![path](/assets/images/INU/ComputerArchitecture/SequentialCircuitInClassEX3.png)

### 실제 풀이 (3번 단계 부터)

![path](/assets/images/INU/ComputerArchitecture/SequentialCircuitInClassEX4.png)
![path](/assets/images/INU/ComputerArchitecture/SequentialCircuitInClassEX5.png)


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

- [x] Sequential Circuit's Excitation Table
- [x] Analysis
- [x] Analysis of Sequential Circuit
- [x] Sequential Circuit Design (설계)
- [x] Binary Counter
- [x] 3-Bit Binary Counter
- [x] In-class Ex
- [x] Q1. Analysis
- [x] Q2. Design
