---
title: "Java 5 Practices - Calendar, Vector<E>, LinkedList<E>, StringTokenizer, Scanner"
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 1. 현재 날짜와 시간 출력 - Calendar, Vector<E>, LinkedList<E>, StringTokenizer, Scanner

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

# 2. 문자열을 날짜 데이터로 변경 - Calendar

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


# 3. 문자열 회전하기 - LinkedList<E>

```
문자열과 정수 입력하여, 정수(양수, 음수)만큼 회전하는 문자열 출력
0 입력 시 종료.
```

> - 출력 예시:
<img src="/assets/images/INU/java/hw2/3_outputEX.png" alt="3_outputEX_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Practice 3 출력 예시`<br>

<details>
<summary><span style="color:blue">Practice (3) 문자열 회전하기 - 소스 코드 (클릭)</span></summary>
<div markdown="1">

```java
import java.util.LinkedList;
import java.util.Scanner;

public class _3_RollString {

    public static StringBuilder sb = new StringBuilder();

    // 연결리스트를 구분자 없는 String 으로 변환
    public static String TempAsString(LinkedList<Character> temp) {
        for (Character i : temp) {
            sb.append(i);
        }
        String tempAsString = sb.toString();
        return tempAsString;
    }

    public static void roll(String str, int n) {
        // n 값으로 0 입력시 바로 종료.
        if (n == 0) {
            System.out.println("종료함");
            return;
        }

        LinkedList<Character> list = getCharacters(str);
        LinkedList<Character> temp = (LinkedList<Character>) list.clone();

        System.out.println("초기 문자열 : " + list);
        int num = 0;

        // 입력된 정수 n 이 문자열 길이와 나누어 떨어지면 회전 중 초기 리스트와 같아지는 순간 회전 종료.
        if (str.length() % n == 0) {
            // n 이 양수인 경우.
            if (n > 0) {
                do {
                    num = rollingIfPositive(str, n, temp, num);
                } while (temp.getFirst() != list.getFirst());
            }
            // n이 음수인 경우. (n = 0 인 경우는 함수 초반에 미리 제외)
            else {
                do {
                    num = rollingIfNegative(str, n, temp, num);
                } while (temp.getFirst() != list.getFirst());
            }
            System.out.println(n + "이 문자열의 길이와 나누어 떨어지므로 처음과 같은 문자열 생성시 종료");
        }
        // 문자열의 길이가 n으로 나누어 떨어지지 않을 때
        else {
            // n 이 양수인 경우.
            if (n > 0) {
                // 다음 이동할 list(char) 범위에 초기 리스트의 첫번째 요소가 존재하면 종료
                boolean eval = true;
                int gen = 0;
                while(eval) {
                    if (num > 1) {
                        for (int i = 0; i < n; i++) {
                            if (temp.get(i) == list.get(0)) {
                                gen = i;
                                eval = false;
                                break;
                            }
                        }
                    }
                    if (eval == false) {
                        break;
                    }
                    num = rollingIfPositive(str, n, temp, num);
                }
                System.out.println("한번 더 회전시 " + "'" + temp.get(gen) + "'" + " 이(가) |" + n + "| 범위의 list 뒤 쪽으로 가기에 종료");
            }
            // n이 음수인 경우. (n = 0 인 경우는 함수 초반에 미리 제외)
            else {
                do {
                    num = rollingIfNegative(str, n, temp, num);
                } while (temp.get(temp.size() - (str.length() % n)) != list.getFirst());
                System.out.println("한번 더 회전시 " + "'" + temp.get(temp.size() - (str.length() % n)) + "'" + " 이(가) |" + n + "| 범위의 list 앞 쪽으로 오기에 종료");
            }
        }
    }

    private static int rollingIfNegative(String str, int n, LinkedList<Character> temp, int num) {
        num++;
        System.out.println(num + "번째 회전");
        System.out.println("<중간 과정>");
        // n 만큼 삭제 후 연결리스트의 뒤에 삽입
        for (int i = n; i < 0; i++) {
            temp.addFirst(temp.removeLast());
            System.out.println("remove last & add first = " + temp);
        }
        System.out.println("</중간 과정>");
        System.out.println(num + "번째 회전 끝: " + TempAsString(temp));
        // sb 초기화
        sb.delete(0, str.length());
        System.out.println("--------------------------------");
        return num;
    }

    private static int rollingIfPositive(String str, int n, LinkedList<Character> temp, int num) {
        num++;
        System.out.println("\n--------------------------------");
        System.out.println(num + "번째 회전");
        System.out.println("<중간 과정>");
        // n 만큼 삭제 후 연결리스트의 뒤에 삽입
        for (int i = 0; i < n; i++) {
            temp.add(temp.removeFirst());
            System.out.println("remove first & add last = " + temp);
        }
        System.out.println("</중간 과정>");
        System.out.println(num + "번째 회전 끝: " + TempAsString(temp));
        // sb 초기화
        sb.delete(0, str.length());
        System.out.println("--------------------------------\n");
        return num;
    }

    private static LinkedList<Character> getCharacters(String str) {
        LinkedList<Character> list = new LinkedList<>();

        // string을 list 에 char 형으로 삽입
        for (int i = 0; i < str.length(); i++) {
            list.add(str.charAt(i));
        }
        return list;
    }

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);

        System.out.println("문자열 입력 : ");
        String str = scan.next();

        System.out.println("문자열의 길이와 같거나 작은 정수 입력 : ");
        int n = scan.nextInt();
        roll(str, n);
    }
}
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


><h1><span style="color: darkorange">문자열 입력 예: “35+40-543-42+42-23”</span></h1><br>
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
<summary><span style="color:blue">Practice (4) 문자열 입력으로 계산 후 결과 출력 -  소스 코드 (클릭)</span></summary>
<div markdown="1">

```java
import java.util.Scanner;
import java.util.StringTokenizer;
import java.util.Vector;

public class _4_inputStringCalculate {
    /**
     * 실습 #4) 문자열 입력으로 계산 후 결과 출력
     * • 문자열 입력 예: “35+40-543-42+42-23”
     * • 입력되는 문자열은 매번 변경 가능
     * • 길이도 제한없음
     * • Vector<E>, StringTokenizer, Scanner 등 클래스 사용
     * • 연산은 덧셈과 뺄셈만 가능
     * • 앞에 있는 연산부터 순차적으로 진행
     * • 35++40과 같이 입력되면 프로그램 종료
     */

    public static int calc(String str) {
        Vector<String> num = tokensToVector(str);
        int sum = 0;

        if (error(num) == 0) {

            sum = Integer.parseInt(num.get(0));

            for (int i = 1; i < num.size(); i++) {

                switch (num.get(i)) {
                    case "+":
                        System.out.println("+ 연산 실행 : " + sum + "+" + Integer.parseInt(num.get(i + 1)));
                        sum = sum + Integer.parseInt(num.get(i + 1));
                        System.out.println("+ 결과: " + sum);
                        break;
                    case "-":
                        System.out.println("- 연산 실행 : " + sum + "-" + Integer.parseInt(num.get(i + 1)));
                        sum = sum - Integer.parseInt(num.get(i + 1));
                        System.out.println("- 결과: " + sum);
                        break;
                }
            }
        } else System.out.println("error code: " + error(num));
        return sum;
    }

    private static Vector<String> tokensToVector(String str) {
        // returnDelims: true로 하여 구분자인 "+", "-" 까지 token 으로 설정.
        StringTokenizer st = new StringTokenizer(str, "+-", true);
        Vector<String> num = new Vector<>();

        System.out.println("\n-----------------------");
        System.out.println("남아있는 Token의 개수: " + st.countTokens());

        while (st.hasMoreTokens()) {
            num.add(st.nextToken());
        }
        System.out.println(num);
        System.out.println("남은 토큰의 개수 = " + st.countTokens());
        System.out.println("-----------------------\n");
        return num;
    }

    private static int error(Vector<String> num) {

        int errorCode = 0;
        for (int i = 0; i < num.size(); i++) {

            if (num.get(0).equals("+") || num.get(0).equals("-")) {
                System.out.println("\n---------!!!ERROR!!!---------");
                System.out.println("연산자 우선 사용으로 종료합니다. " + num.get(0) + "\n");
                errorCode = 1;
                break;
            }
            else if (num.get(i).equals("+") && num.get(i).equals(num.get(i + 1))) {
                System.out.println("\n---------!!!ERROR!!!---------");
                System.out.println("연속된 연산자 사용으로 종료합니다. " + i + "번째 " + num.get(i) + " 와 " + (i + 1) + "번째 " + num.get(i + 1) + "\n");
                errorCode = 2;
                break;
            }
            else if (num.get(i).equals("-") && num.get(i).equals(num.get(i + 1))) {
                System.out.println("\n---------!!!ERROR!!!---------");
                System.out.println("연속된 연산자 사용으로 종료합니다. " + i + "번째" + num.get(i) + " 와 " + (i + 1) + "번째" + num.get(i + 1) + "\n");
                errorCode = 3;
                break;
            }
        }
        return errorCode;
    }


    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        do {
            System.out.println("esc 입력 시 종료");

            System.out.println("실행할 연산이 포함된 문자열 입력: ");
            String str = scan.next();

            if (str.equals("esc")) {
                System.out.println("종료");
                break;
            }

            System.out.println("\n---------------------\n연산 결과 : " + calc(str));
            System.out.println("---------------------\n");
        }while(true);
    }
}
```

</div>
</details>

<br><br>


# 5. 로또 번호 생성기

><img src="/assets/images/INU/java/hw2/lotto.png" alt="lotto_Procdess" width="70%" min-width="200px" itemprop="image"><br><br>
><h1><span style="color: darkorange"> 로또번호는 자연수 1~45에서 총 7개 숫자를 중복없이 생성</span></h1><br><br>
> **작업 순서**<br>
> • 1) 숫자 6개를 랜덤으로 추출<br>
> • 2) 추출된 수는 오름차순 정렬<br>
> • 3) 마지막 보너스 숫자도 랜덤 추출<br> 
> • 4) 전체 로또번호 출력<br>
> • Vector<E>와 같은 컬렉션 사용<br>
{: .notice--info}
{: style="text-align: center;"}

> - 출력 예시
> - <img src="/assets/images/INU/java/hw2/5_lotto.png" alt="5_lotto_Procdess" width="50%" min-width="200px" itemprop="image"><br>`Practice 5 출력 예시`<br>

<details>
<summary><span style="color:blue">Practice (5) 로또 번호 생성기 -  소스 코드 (클릭)</span></summary>
<div markdown="1">

```java
import java.util.Collections;
import java.util.Scanner;
import java.util.Vector;

public class _5_lotto {

    /**
     * • 로또번호는 자연수 1~45에서 총 7개 숫자를 중복없이 생성
     * <p>
     * • 작업 순서
     * • 1) 숫자 6개를 랜덤으로 추출
     * • 2) 추출된 수는 오름차순 정렬
     * • 3) 마지막 보너스 숫자도 랜덤 추출 • 4) 전체 로또번호 출력
     * • Vector<E>와 같은 컬렉션 사용
     */

    // Vector -> String 변환
    public static StringBuilder sb(Vector<Integer> vec) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < vec.size(); i++) {
            if (i == vec.size() - 1) {
                sb.append("+ (Special Number) : ");
            }
            sb.append(vec.get(i));
            sb.append(" ");
        }
        return sb;
    }

    public static Vector<Integer> genNormalNum() {
        Vector<Integer> randVec = new Vector<>(6);

        // randVec 요소의 중복이 없을 때까지 반복
        int rand;
        for (int i = 0; i < randVec.capacity(); i++) {
            // rand = 1~45 까지의 난수 생성
            rand = (int) (Math.random() * 45 + 1);

            if (randVec.contains(rand)) {
//                System.out.println((i + 1) + "번째" + "중복 난수 발견!! : " + rand);
                i--;
                continue;
            }
            randVec.add(rand);
//            System.out.println("추가: " + rand);
        }
        // 오름차순 정렬
        Collections.sort(randVec);

        return randVec;
    }

    public static void main(String[] args) {


        Scanner scan = new Scanner(System.in);
        do {
            System.out.println("ENTER 를 눌러 로또 번호를 생성: ");
            System.out.println("esc 입력 시 종료");

            if ("esc".equals(scan.nextLine())) {
                System.out.println("종료");
                break;
            }

            Vector<Integer> lotto = genNormalNum();

            System.out.println("로또 번호 생성기");
            System.out.println("앞자리 6개 : " + lotto);

            int special = (int) (Math.random() * 45 + 1);
            System.out.println("Special Number : " + special);

            System.out.println("이번 주 당첨 번호!");
            System.out.println("-----------------------------------------");
            lotto.add(special);
            System.out.println(sb(lotto));
            System.out.println("-----------------------------------------");
        }while(!"\n".equals(scan.nextLine()));
    }
}
```

</div>
</details>

<br><br>




<!-- 
> <img src="/assets/images/Spring/SpringMVC/springmvcstruct.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>
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
</details>
-->


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

- [x] 현재 날짜와 시간 출력 - Calendar, Vector<E>, LinkedList<E>, StringTokenizer, Scanner
- [x] 문자열을 날짜 데이터로 변경 - Calendar
- [x] 문자열 회전하기 - LinkedList<E>
- [x] 문자열 입력으로 계산 후 결과 출력 - Vector<E> , StringTokenizer, Scanner
- [x] 로또 번호 생성기
