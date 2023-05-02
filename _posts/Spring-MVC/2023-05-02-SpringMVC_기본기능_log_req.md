---
title: "Spring - MVC (3) 기본 기능 - Logging"
categories:
  - Spring-MVC
tags:
  - Spring-MVC
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---
 
# 로그(Log)란?

```java
운영 시스템에서는 System.out.println() 과 같은 시스템 콘솔을 사용해서 필요한 정보를 직접 출력하지 않고, 
        별도의 로깅 라이브러리를 사용해서 로그를 출력하기 때문에 로깅을 사용하는 법을 알아야 한다.
```

<br>

- 스프링 부트 라이브러리를 사용하면 스프링 부트 로깅 라이브러리(spring-boot-starter-logging)가 함께 포함되며, 다음 라이브러리를 기본으로 사용한다.
  - [SLF4J(링크)](http://www.slf4j.org)
  - [Logback(링크)](http://logback.qos.ch)
<br><br>
- 로그 라이브러리는 Logback, Log4J, Lof4J2 등등 수많은 라이브러리가 있고, 이를 통합해서 인터페이스로 제공하는 것이 SLF4J 라이브러리이다.
  - <span style="color:darkorange">SLF4J : 인터페이스
    - <span style="color:forestgreen">Logback : 구현체
<br><br>
- 실무에서는 Logback 라이브러리를 대부분 사용한다고 한다.

<br><br>

# Log 선언 및 호출

```java
// 로그 선언
private Logger log = Logger.Factory.getLogger(getClass());
private static final Logger log = LoggerFactory.getLogger(~.class)

@Slf4j // 위 처럼 로그 선언을 따로 하지않고 클래스 레벨에 롬복 Slf4j 애노테이션을 추가하면 쉽고 간단하게 로그 사용가능.

// 로그 호출
log.info("CarefreeLife")
```

><h1><span style="color:red">Warning !</span></h1>
><br>
> **로그 선언 시 다음과 같이 많은 라이브러리 중 SLF4J의 interface인 Logger(org.slf4j)를 선언해야 한다.**
><br><br>
> <img src="/assets/images/Spring/SpringMVC/logger_slf4j.png" alt="logger_slf4j_Procdess" width="70%" min-width="200px" itemprop="image"><br>`SLF4J의 로거 인터페이스를 골라 선언하자.`<br>
{: .notice--danger}
{: style="text-align: center;"}

<br><br>

# Log를 사용해야 하는 이유?

- <h1><span style="color:palevioletred">로그의 포맷에 따른 여러 정보의 제공</span></h1>
  - <span style="color:royalblue">시간</span> : 로그가 생성된 시간 정보의 제공
  - <span style="color:royalblue">로그 레벨</span> : println 처럼 모든 이벤트에 출력되는 것이 아닌, 로그의 레벨에 따라 출력여부 설정 가능
  - <span style="color:royalblue">프로세스 ID</span> : Process의 ID 정보 제공 
  - <span style="color:royalblue">쓰레드 명</span> : 실행된 Thread의 이름 제공
  - <span style="color:royalblue">클래스 명</span> : process가 실행된 Class의 이름 제공
  - <span style="color:royalblue">로그 메시지</span> : 로그에 추가적인 메시지 포함하여 출력 가능 
- <h1>콘솔 뿐만 아니라 별도의 위치에 로그 저장 가능</h1>
  - 파일이나 네트워크 등 로그를 별도의 위치에 남길 수 있다.
  - 파일로 남길 시, 일별 및 특정 용량에 따라 로그를 분할하여 저장할 수 있다.


<br><br>

# 로그 레벨 설정

- <h1>로그의 레벨</h1>
  - <span style="color:forestgreen">TRACE
  - <span style="color:forestgreen">DEBUG
  - <span style="color:forestgreen">INFO
  - <span style="color:darkorange">WARN
  - <span style="color:red">ERROR
<br><br>
- <h1>전체 로그 레벨 설정(기본 info)
  - <span style="color:darkorange">logging.level.root=info
<br><br>
- <h1>패키지와 그 하위 로그 레벨 설정
  - <span style="color:darkorange">logging.level.hello.springmvc=trace</span> (trace가 가장 상위 로그 레벨.)
  - 따라서 이와 같은 설정시 모든 로그를 보겠다는 뜻.
  - 로컬에서 작업시 <span style="color:forestgreen">trace
  - 개발 시 <span style="color:forestgreen">debug
  - 운영 단계에서는 <span style="color:forestgreen">info</span> 레벨까지만 로그를 출력하여 불필요한 단계에서의 로그 출력 제한
  - <span style="color:green">불필요한 자원(메모리 등)의 낭비를 막을 수 있다.

<img src="/assets/images/Spring/SpringMVC/log.png" alt="log_Procdess" width="100%" min-width="200px" itemprop="image"><br>`로그 사용 모습`<br>

<br><br>

# 로그의 올바른 사용법

- <span style="color:darkorange">logging.level.root=info</span> (출력레벨이 info로 설정되었다 가정.)
- <span style="color:forestgreen">`log.debug("data=" + data)`
  - 로그의 지정된 레벨에 따른 출력 여부에 상관 없이 연산이 실행되는 문제.
    - 출력은 되지 않는다.
    - 하지만 이미 ("data=data")로 문자열 간의 덧셈 연산은 실행된다.
    - 이처럼 컴퓨터 자원의 낭비가 발생하게 된다.
- <span style="color:forestgreen">`log.debug("data={}" , data)`
  - 단순한 파라미터의 전달을 제외하고 어떠한 일도 발생하지 않는다.
  - log.debug 를 읽는 순간 logic이 중지(logging.level.root=info).
  - 추가적인 메모리의 사용이 발생하지 않는다.

> (참고) 스프링 부트의 jar 를 사용하면 /resources/static/ 위치에 index.html 파일을 찾아 welcome 페이지로 처리해줌.



    
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

`참고:`[Inflearn - 김영한님_강의](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)<br><br>

### Task Lists
> 
- [x] 로그(Log)란?
- [x] Log 선언 및 호출
- [x] Log를 사용해야 하는 이유?
- [x] 로그 레벨 설정
- [x] 로그의 올바른 사용법
