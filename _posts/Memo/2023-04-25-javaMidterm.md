---
title: "자바 중간고사 대비"
categories:
  - Memo
tags:
  - Memo
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

중간고사 대비 개인 포스트입니다
{: .notice--danger}
{: style="text-align: center;"}

week2
1. 정수 literal 기본 10진수
2. 0으로 시작하면 8진수
3. 0x 로 시작하면 16진수
4. 0b 로 시작하면 2진수 (binary?)
5. 실수 literal - 소수점 형태나 지수형태. (.)만 붙혀도 실수 literal
6. float 사용하고 싶으면 숫자 뒤에 f 붙혀서 사용
7. 문자는 단일 인용부호 ('')로 표현. -> 유니코드 (₩u~)는 붙히지 않고 사용
8. 특수 문자 literal은 백슬래시(\)로 시작 = escape sequence(백슬래시(\) 뒤에 한 문자나 숫자 조합이 오는 문자 조합을 “이스케이프 시퀀스”라고 한다.)
9. 자바에서는 1,0 -> boolean 사용불가 (while(1) --> 오류)
10. null literal - 클래스에는 대입가능, 기본타입(int...) 에는 대입불가
11. 숫자 literal (_) 사용 가능. 예외: 맨 끝 / 소수점 앞뒤 / L,F 의 앞 / Ox 중간, 끝 사용불가
12. var 키워드 : 지역 변수의 선언에만 사용, 선언문에 반드시 초기값 설정.
13. 상수 선언: final 사용, 선언 시 초기값 지정, 실행 중 값 변경 불가, 이름은 보통 대문자로
14. 자동 타입 변환: 작은 타입은 큰 타입으로 자동 변환
15. 강제 타입 변환: 큰 타입에서 작은 타입으로 변환할 때. ()안에 변환할 타입 지정. 값의 손실 발생
16. System.in 키보드로부터 직접 읽는 자바의 표준 입력 스트림. 키 값을 (바이트)로 리턴
17. Scanner 의 주요 메소드에는 char 형이 없다.
18. 연산의 종류: 증감, 산술, 시프트, 비교, 비트, 논리, 조건, 대입
19. 삼항연산자: 조건문(X ? A(참) : B(거짓))
20. 비트 연산에서 ~ 사용시 0과 1이 바뀌므로 1의 보수를 취할때 사용한다.
21. 시프트 비트 연산: << n(왼쪽으로 n번 비트 이동, 0으로 빈자리), >> n(오른쪽으로 n번 비트이동, 이동 전 상태의 최상위 비트로 빈자리를 채운다), >>> n (오른쪽으로 n번 비트 이동, 최상위 비트의 빈자리를 0으로 채운다.)
22. 시프트 연산 시 (왼쪽: 이동한 비트 수(n)만큼 2를 제곱해준다 / 오른쪽: 이동한 비트 수(n)만큼 2로 나눠준다. / 음수: 같은 방식에 - 붙여주면 된다.)
23. psvm(public static void main(String[] args))
24. This 레퍼런스: 객체 자신에 대한 레퍼런스. 컴파일러에 의해 자동관리. this.멤버 형태
25. this.care(필드) = care(매개변수)
26. this() : 다른 생성자를 호출. 같은 class 내의 생성자 내에서만 사용 가능. 반드시 생성자 코드의 제일처음에 수행
27. Constructor(생성자) : class 의 이름과 같은 메소드를 그 class 내에 구현.
28. class 의 이름과 같은 이름을 가진 메소드는 그 class 가 호출되는 순간 바로 호출되도록 약속이 되어 있다. —> 제일 먼저 호출되어야 함. 해당 메소드안에 코드를 추가시켜 초기화의 목적을 달성할 수 있다.
29. New ~ 를 통해 호출된 class의 instance 안에 있는 변수를 가리키는 법 —> this.변수이름(instance의)
30. java.lang 은 기본적으로 import 되어 있음
31. IOException, InputMismatchException 은 각각 java.io / java.util 을 import 해줘야 사용가능.

<img src="/assets/images/INU/java/javaexception.png" alt="javaexception_Procdess" width="100%" min-width="200px" itemprop="image"><br>`java exception`<br><br>

34. Method Overloading : 이름이 같은 메소드 작성하는 것 / 매개 변수의 개수나 타입이 서로 다르나 이름이 동일한 메소드들.
    리턴 타입이 다르더라고 매개변수의 개수가 같다면 오버로딩 실패
34. 자바 응용 프로그램에서 임의로 객체를 소멸 시킬 수 없다.
35. Garbage : 가르키는 레퍼런스가 하나도 없는 객체 / 누구도 사용할 수 없게 된 메모리
36. Garbage Collection : 자바 가상 머신 (Java Virtual Machine) 의 Garbage Collector 가 자동으로 Garbage 수집 및 반환
    Garbage Collection Thread 에 의해 수행
37. 강제 Garbage Collection 수행 : System 또는 Runtime 객체의 gc() 메소드 호출.
38. 접근 지정자(public, private, protected, default..)
39. enum : 상수의 집합 enum alphabet {a,b,c, ... } 에서 원소들은 (a, b, c) 이름이 될수도 있고, 값이 될 수도 있다.
40. 배열 생성 시 배열의 크기를 지정하면 안된다.

<h1>자바 시작</h1>

1. 자바는 실행 파일을 class 로 생성.
2. 자바 - "선마이크로시스템즈" 의 "제임스 고슬링" 이 개발.(그린 프로젝트)
3. 자바의 목적 : 플랫폼 호환성 문제 해결 / 플랫폼 독립적인 언어 개발 / 메모리 사용량이 적고 다양한 플랫폼을 갖는 프로그래밍 언어의 필요.
4. WORA(Write Once Run Anywhere) : 모든 플랫폼에서 바로 실행 / 바이트 코드 / JVM
5. JDK 밑의 JRE 부터는 Library 이다.
6. 자바 api는 JDK 에 패키지로 저장된다.
7. **상속의 장점 : 클래스 재사용과 확장의 용이**
8. 추상 클래스 : 객체 생성 불가, 상속 받아 사용
9. 슈퍼 클래스에서는 개념의 정의.
10. 각 서브 클래스에서 구체적 행위를 구현.
11. LTS(Long-Term-Support)
12. 자바 초기 이름 : OAK
13. JDK : Java Development Kit
14. JRE : Java Runtime Environment















<!-- > <img src="/assets/images/INU/java/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br><br>
`사진출처:`[]()
<span style="color:green">``</span>

```

```
> 
{: .notice--danger}
{: style="text-align: center;"}


<details>
<summary><h1><span style="color:blue">(클릭)</span></h1></summary>
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