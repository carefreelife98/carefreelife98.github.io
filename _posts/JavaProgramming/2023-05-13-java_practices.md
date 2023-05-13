---
title: "Java 5 Practices"
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 1. 현재 날짜와 시간 출력 - Calendar

```
- 자바 애플리케이션이 실행될 때 시스템 날짜와 시간 정보를 다음과 같이 출력
- Calendar 클래스 활용
- 출력 결과 예)
    - 2023년 5월 1일
    - 13시 30분 20초
``` 

> - **Calendar 클래스의 특징**
>   - java.util 패키지
>   - 시간과 날짜 정보를 저장하고 관리
>     - 년, 월, 일, 요일, 시간, 분, 초, 밀리초, 오전 오후 등
>     - Calendar 클래스의 get()과 set()에서 사용하는 상수
> - 매우 간단한 예제이다. Calender 클래스를 활용하여 출력해보자.

|field|mean|field|mean|
|---|---|---|---|---|
|YEAR|년도|DAY_OF_MONTH|한 달의 날짜|
|MONTH|달(0~11 이므로 +1 해줘야 함)|DAY_OF_WEEK|한 주의 요일|
|HOUR|시간(0~11)|AM_PM|오전 / 오후 구분|
|HOUR_OF_DAY|24시간 기준 시간|MINUTE|분|
|SECOND|초|MILLISECOND|밀리 초|

<details>
<summary><span style="color:blue">Practice (1) 현재 날짜와 시간 출력 -  소스 코드 (클릭)</span></summary>
<div markdown="1">

```java
import java.util.Calendar;

public class _1_printDayAndTime {

    public static void main(String[] args) {
        
        // Calender 생성
        Calendar cal = Calendar.getInstance();
        
        // Month 는 default 가 0~11 로 정의 되어 있어 1월부터 12월을 표현하려면 +1을 해주어야 한다. 
        System.out.println(cal.get(Calendar.YEAR) + "년 " + (cal.get(Calendar.MONTH) + 1) + "월 " + cal.get(Calendar.DAY_OF_MONTH) + "일 ");
        System.out.println(cal.get(Calendar.HOUR) + "시 " + cal.get(Calendar.MINUTE) + "분 " + cal.get(Calendar.SECOND) + "초 ");
    }
}
```

<img src="/assets/images/INU/java/hw2/1_printDayAndTime.png" alt="1_printDayAndTime_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Practice 1 실행 결과`<br>

</div>
</details>

<br><br>

# 2. 문자열을 날짜로 변경 - Calendar

```
- 문자열을 다음과 같이 입력
  - “2023/05/01” 또는 “2020/5/1”, “21/05/01”
  - 년/월/일 을 추출하고 날짜 데이터로 변경하시오.
```

> 1번에서 해본 것 처럼 Calendar 클래스를 활용하여 작성해보자.

<details>
<summary><span style="color:blue">Practice (2) 문자열을 날짜로 변경 -  소스 코드 (클릭)</span></summary>
<div markdown="1">

```java
import java.util.Calendar;
import java.util.Scanner;

public class _2_StringToDay {
    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);
        Calendar cal = Calendar.getInstance();

        while(true) {
            System.out.println("날짜 입력 (ex. 2023/05/10 ) : ");
            String str = scan.next();

            if (str.equals("exit")) {
                System.out.println("exit");
                break;
            } else {
                String[] split = str.split("/");
                cal.set(Calendar.YEAR, Integer.parseInt(split[0]));
                cal.set(Calendar.MONTH, Integer.parseInt(split[1]));
                cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(split[2]));
            }
            System.out.println("[data] 년도 : " + cal.get(Calendar.YEAR));
            System.out.println("[data] 월 : " + cal.get(Calendar.MONTH));
            System.out.println("[data] 일 : " + cal.get(Calendar.DAY_OF_MONTH));
        }
    }
}
```

<img src="/assets/images/INU/java/hw2/2_StringToDay.png" alt="2_StringToDay_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Practice 2 실행 결과`<br>

</div>
</details>

<br><br>


# 3. 문자열 회전하기

```
문자열과 정수 입력하여, 정수(양수, 음수)만큼 회전하는 문자열 출력
0 입력 시 종료.
```

> - 출력 예시:
<img src="/assets/images/INU/java/hw2/3_outputEX.png" alt="3_outputEX_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Practice 3 출력 예시`<br>

<details>
<summary><span style="color:blue">Practice (1) Practice (1) 현재 날짜와 시간 출력 -  소스 코드 (클릭)</span></summary>
<div markdown="1">

```java
소스코드 - 23.5.16 공개!
```

<img src="/assets/images/INU/java/hw2/3_rollstrForBlog.png" alt="3_rollstrForBlog_Procdess" width="40%" min-width="200px" itemprop="image">
<img src="/assets/images/INU/java/hw2/3_rollstrForBlog3.png" alt="3_rollstrForBlog3_Procdess" width="50%" min-width="200px" itemprop="image">
<img src="/assets/images/INU/java/hw2/3_rollstrForBlog2.png" alt="3_rollstrForBlog2_Procdess" width="40%" min-width="200px" itemprop="image">`   `
<img src="/assets/images/INU/java/hw2/3_rollstrForBlog4.png" alt="3_rollstrForBlog4_Procdess" width="40%" min-width="200px" itemprop="image">

<br><br><img src="/assets/images/INU/java/hw2/3_zero.png" alt="3_zero_Procdess" width="40%" min-width="200px" itemprop="image">`Practice 3 0 입력 시 종료`<br>

</div>
</details>

<br><br>


# 4. 문자열 입력으로 계산 후 결과 출력 - Vector<E> , StringTokenizer, Scanner


문자열 입력 예: “35+40-543-42+42-23” <br>
    • 입력되는 문자열은 매번 변경 가능<br>
    • 길이 제한 없음<br>
• Vector<E>, StringTokenizer, Scanner 등 클래스 사용 <br>
• 연산은 덧셈과 뺄셈만 가능<br>
• 앞에 있는 연산부터 순차적으로 진행<br>
• 35++40과 같이 입력되면 프로그램 종료<br>
{: .notice--info}
{: style="text-align: left;"}

> - 출력 예시
> - <img src="/assets/images/INU/java/hw2/4_inputStringCalculate.png" alt="4_inputStringCalculate_Procdess" width="60%" min-width="200px" itemprop="image"><br>`Practice 4 출력 예시 / 결과`<br>

<details>
<summary><span style="color:blue">Practice (1) Practice (1) 현재 날짜와 시간 출력 -  소스 코드 (클릭)</span></summary>
<div markdown="1">

<img src="/assets/images/INU/java/hw2/1_printDayAndTime.png" alt="1_printDayAndTime_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Practice 1 실행 결과`<br>

</div>
</details>

<br><br>


# 

<details>
<summary><span style="color:blue">Practice (1) Practice (1) 현재 날짜와 시간 출력 -  소스 코드 (클릭)</span></summary>
<div markdown="1">

<img src="/assets/images/INU/java/hw2/1_printDayAndTime.png" alt="1_printDayAndTime_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Practice 1 실행 결과`<br>

</div>
</details>

<br><br>




<!-- > <img src="/assets/images/Spring/SpringMVC/springmvcstruct.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>
`참고:`[Inflearn - 김영한님_강의](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)<br><br>


`사진출처:`[]()
<span style="color:green">``</span>

```

```
> 
{: .notice--danger}
{: style="text-align: center;"}


<details>
<summary><span style="color:blue">Practice (1) (클릭)</span></summary>
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