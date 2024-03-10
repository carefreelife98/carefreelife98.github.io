---
title: "[Spring Basic] Spring Singleton - 싱글톤 디자인 패턴 (스프링 컨테이너) 및 주의점"
categories:
  - Spring-Basic
tags:
  - Spring-Basic
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/Spring/SpringBasic/spring_singleton_1.png"
---
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 웹 애플리케이션과 싱글톤
> Web Application 특성 상 **대규모 트래픽**을 다루게 된다.
> - **이때 매 요청, 응답 과정 마다 새로운 객체를 만들어 반환하게 되면 JVM 메모리에 새로운 객체가 끊임없이 load 된다.**

<br><br>

## 다중 호출 후 생성된 객체 간 참조값 비교 테스트
```java
public class SingletonTest {  
  
    @Test  
    @DisplayName("스프링 없는 순수한 DI Container")  
    void pureContainer() {  
        AppConfig appConfig = new AppConfig();  
  
        // 1. 조회: 호출할 때마다 새로운 객체를 생성.  
        MemberService memberService1 = appConfig.memberService();  
  
        // 2. 조회: 호출할 때마다 새로운 객체를 생성.  
        MemberService memberService2 = appConfig.memberService();  
  
        // 참조 값이 다른 것을 확인  
        System.out.println("memberService1 = " + memberService1);  
        System.out.println("memberService2 = " + memberService2);  
    }  
}
```

<br><br>

### 테스트 결과
```
memberService1 = hello.core.member.MemberServiceImpl@71a794e5
memberService2 = hello.core.member.MemberServiceImpl@76329302

Process finished with exit code 0
```
- 같은 함수를 두번 호출했을때, 반환되는 객체는 서로 다른 객체임을 알 수 있다. (객체의 참조 값이 다름)
- 만약 내가 만든 Web Application 의 TPS(Transaction per Seconds) 가 50000 이라면, 초당 50000 개의 객체를 생성하여 JVM 의 메모리에 load 되는 것과 같다.
    - **매우 비효율적인 요청 처리방식. -> 메모리 낭비가 심함**
- **해결 방안:**
    - **공유할 수 있는 객체를 단 하나만 생성한다. (= 싱글톤 패턴)**

<br><br>

# 싱글톤 패턴 사용하기

```
싱글톤 패턴
- 클래스의 인스턴스가 단 1개만 생성되는 것을 보장하는 디자인 패턴.
- 객체 인스턴스를 2개 이상 생성하지 못하도록 막자.
	- private 생성자를 사용하여 외부에서 임의로 new 키워드를 사용하지 못하도록 막아야 한다.
```

```java
public class SingletonService {  
  
    private static final SingletonService instance = new SingletonService();  
  
    public static SingletonService getInstance() {  
        return instance;  
    }  
  
    // 생성자를 private 으로 막아서 외부의 new 키워드를 통해 객체 인스턴스가 생성되는 것을 막는다.  
    private SingletonService() {}  
  
    public void logic() {  
        System.out.println("싱글톤 객체 로직 호출");  
    }  
}
```
1. static 영역에 객체 instance 를 미리 하나 생성해서 올려둔다.
2. 이 객체 인스턴스가 필요하면 오직 getInstance() 메서드를 통해서만 조회할 수 있다.
    - 이 메서드는 항상 같은 인스턴스를 반환한다.
3. **단 하나의 객체 인스턴스만 존재해야 하므로, 생성자를 private 으로 막는다.**
    - **외부의 new 키워드를 통한 객체 인스턴스 생성을 막음.**

<br><br>

## 싱글톤 테스트

```java
import hello.core.AppConfig;  
import hello.core.member.MemberService;  
import org.assertj.core.api.Assertions;  
import org.junit.jupiter.api.DisplayName;  
import org.junit.jupiter.api.Test;  
  
public class SingletonTest {  
  
    @Test  
    @DisplayName("싱글톤 패턴을 적용한 객체 사용")  
    void singletoneServiceTest() {  
        SingletonService singletonService1 = SingletonService.getInstance();  
        SingletonService singletonService2 = SingletonService.getInstance();  
	    // 아래 코드는 private 생성자에 의해 컴파일 에러가 발생한다.(외부에서 new 키워드를 사용하여 새로운 instance 생성을 제한)
	    SingletonService singletonService3 = new SingletonService();
  
        System.out.println("singletonService1 = " + singletonService1);  
        System.out.println("singletonService2 = " + singletonService2);
        // isSameAs : 객체의 참조 값을 비교 (객체가 지닌 값이 아닌 실제 객체가 동일한 메모리 위치에 존재하는지 확인)
        assertThat(singletonService1).isSameAs(singletonService2);  
    }  
}
```
`싱글톤 테스트 코드`

```
singletonService1 = hello.core.singleton.SingletonService@3b07a0d6
singletonService2 = hello.core.singleton.SingletonService@3b07a0d6
```
`테스트 결과`

- **각 호출의 결과로 반환된 객체의 참조 값이 서로 같은 것을 확인할 수 있다.**
    - 매 호출마다 새로운 객체를 생성하지 않고, **같은 객체를 공유**하도록 설계.

<br><br>

## 싱글톤 패턴의 한계
> - 싱글톤 패턴을 구현하는 코드 자체가 많이 들어간다.
> - 의존 관계 상 Client 가 구체 Class 에 의존한다. (DIP, Dependency Inversion Principle 위반)
> - Client 가 구체 Class 에 의존함에 따라 OCP(Open-Closed Principle) 원칙 위반 가능성이 높다.
> - 테스트하기 어려움.
> - 내부 속성의 변경 및 초기화가 어려움.
> - private 생성자로 자식 Class 생성이 어려움.

```
결론은 싱글톤 패턴 적용 시 유연성이 떨어진다.

하지만 스프링 프레임 워크는 앞서 제시한 모든 단점을 커버하는 싱글톤 컨테이너(스프링 컨테이너)를 제공한다.
```

<br><br>

# 싱글톤 컨테이너 (스프링 컨테이너)

> ![path](/assets/images/Spring/SpringBasic/spring_singleton_1.png)<br>
> **스프링 컨테이너는 싱글톤 패턴의 문제점을 해결하는 동시에, 객체 인스턴스를 싱글톤으로 관리한다.**
> - 스프링 컨테이너는 싱글톤 패턴을 따로 적용하지 않아도, 객체 인스턴스를 싱글톤으로 관리.
    > 	- **스프링 컨테이너 생성 시, 모든 스프링 빈 객체를 미리 생성하여 key-value 형태로 등록해 놓는다.**
           > 	- **`Singleton Registry : 위처럼 싱글톤 객체를 생성하고 관리하는 기능`**
> - 앞서 언급한 싱글톤 패턴의 모든 문제점을 해결.
    > 	- 싱글톤 패턴 구현을 위한 지저분한 코드 X
           > 	- DIP, OCP, 테스트, private 생성자로부터 자유로움.

<br><br>

## 스프링 컨테이너로서 구현한 싱글톤 패턴 테스트

```java
public class SingletonTest {

	@Test  
	@DisplayName("스프링 컨테이너를 사용한 싱글톤 패턴 구현")  
	void springContainerSingleton() {  
	  
	    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);  
	  
	    MemberService memberService1 = ac.getBean("memberService", MemberService.class);  
	    MemberService memberService2 = ac.getBean("memberService", MemberService.class);  
	  
	    // 참조 값이 같은 것을 확인  
	    System.out.println("memberService1 = " + memberService1);  
	    System.out.println("memberService2 = " + memberService2);  
	  
	    // memberService1 == memberService2  
	    assertThat(memberService1).isSameAs(memberService2);  
	}
}
```

<br><br>

### 싱글톤 테스트(스프링 컨테이너) 실행 결과

```
memberService1 = hello.core.member.MemberServiceImpl@20435c40
memberService2 = hello.core.member.MemberServiceImpl@20435c40

Process finished with exit code 0
```
- 두 객체가 동일한 참조 값을 가져 동일한 것을 볼 수 있다.
- **스프링 컨테이너를 사용함에 따라, 고객의 요청이 발생할 때마다 새로운 객체를 생성하는 것이 아닌, 기존 객체를 공유하여 효율적으로 재사용할 수 있게 되었다.**

<br><br>

# 싱글톤 방식의 주의점
> **싱글톤 패턴과 같이 하나의 객체를 공유하는 방식을 사용하게 되면 다중 Client 가 하나의 같은 객체 인스턴스를 공유.**
> - 따라서, 싱글톤으로 생성된 객체는 상태를 유지(Stateful)하게 설계하면 충돌이 일어난다.
> - **싱글톤 객체는 무상태(Stateless) 하도록  설계해야 한다.**
    > 	- 특정 Client 에 의존적인 필드가 존재하면 안된다.
           > 	- 특정 Client 가 값을 변경할 수 있는 필드가 있으면 안된다.
> 	- 가급적 Read-Only 로서 존재해야 한다.
> 	- 객체 내 field 대신, 공유되지 않는 지역변수, Parameter, ThreadLocal 등을 사용해야 한다.
> - **스프링 빈의 필드에 공유 값을 설정하면 큰 장애 발생 가능성이 높다.**

<br><br>

## 싱글톤 객체를 Stateful 하게 설계 시 장애 발생 테스트

```java
// StatefulService.class
public class StatefulService {  
  
    private int price; // 상태 유지 필드  
  
    public void order(String name, int price) {  
        System.out.println("name = " + name + " price = " + price);  
        this.price = price; // 장애 발생 지점  
    }  
  
    public int getPrice() {  
        return price;  
    }  
}


// StatefulServiceTest.class
class StatefulServiceTest {  
  
    @Test  
    void statefulServiceSingleton() {  
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(TestConfig.class);  
        StatefulService statefulService1 = ac.getBean(StatefulService.class);  
        StatefulService statefulService2 = ac.getBean(StatefulService.class);  
  
        // ThreadA: User A 10000원 주문  
        statefulService1.order("userA", 10000);  
  
        // ThreadB: User B 20000원 주문  
        statefulService2.order("userB", 20000);  
  
        // [장애 발생] ThreadA: User A 주문 금액 조회 시, 20000 출력. 
        int price = statefulService1.getPrice();  
        System.out.println("price = " + price);  
  
        Assertions.assertThat(statefulService1.getPrice()).isEqualTo(20000);  
    }  
  
    static class TestConfig {  
        @Bean  
        public StatefulService statefulService() {  
            return new StatefulService();  
        }  
    }  
}
```

- 위 테스트의 의도는 다음과 같다.
    1. User A 가 10000 을 입력.
    2. User B 가 20000 을 입력.
    3. 이후 User A 가 자신의 주문 금액 조회 시 장애 발생
        - 스프링 컨테이너에 싱글톤 빈으로 관리되는 StatefulService.class 의 로직
            - 자신의 **필드(price)에 사용자의 주문 입력 값을 Set** 하여 가지고 있는다.
            - **[!!장애 발생!!] 이후 다른 사용자의 주문(order) 메서드 실행 시 해당 값이 변경됨.**
        - 따라서, User A 가 order() 실행 후 **자신의 주문 금액을 조회하기 전에 User B 가 order() 메서드를 실행하여 싱글톤 빈의 필드 값을 변경했으므로** 이후 User A 가 자신의 주문 금액을 조회할 시 **User B 가 변경해놓은 필드 값인 20000 을 반환**하게 된다.

<br><br>

## 해결 방법 - 싱글톤 객체를 Stateless 하계 설계하자.

```java
// StatelessService.class
public class StatelessService {  
  
//    private int price; // 상태 유지 필드 삭제 및 로직 수행 후 반환하도록 변경
  
    public int order(String name, int price) {  
        System.out.println("name = " + name + " price = " + price);  
//        this.price = price; // 기존 장애 발생 지점  
        return price;  // 로직 수행 후 상태를 가지고 있지 않고 반환 하도록 변경.
    }  
}


// StatelessServiceTest.class
class StatelessServiceTest {  
  
    @Test  
    void statefulServiceSingleton() {  
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(TestConfig.class);  
        StatefulService statefulService1 = ac.getBean(StatefulService.class);  
        StatefulService statefulService2 = ac.getBean(StatefulService.class);  
  
        // ThreadA: User A 10000원 주문 로직 실행 후 반환 
        int userAPrice = statefulService1.order("userA", 10000);  
  
        // ThreadB: User B 20000원 주문 로직 실행 후 반환  
        int userBPrice = statefulService2.order("userB", 20000);  
  
        // UserA 와 UserB 각각의 Price 정상 반환
        System.out.println("User A's price = " + userAPrice);  
        System.out.println("User B's price = " + userBPrice);  
  
        Assertions.assertThat(userAPrice).isEqualTo(10000);  
        Assertions.assertThat(userBPrice).isEqualTo(20000);  
    }  
  
    static class TestConfig {  
        @Bean  
        public StatefulService statefulService() {  
            return new StatefulService();  
        }  
    }  
}
```
- 해결 방법은 간단하다.
    - 기존 싱글톤 빈 서비스 로직은 Stateful 하게 외부 입력을 내부 필드에 저장하여 get 하는 방식.
    - **[Stateless 하게 변경] - 외부 입력으로부터 내부 서비스 로직 실행 후 결과값을 반환하도록 변경.**
        - **각각의 요청마다 비즈니스 로직 실행 후 결과 값을 반환하여 사용하도록 설계되어 싱글톤으로 생성된 빈은 하나의 모듈(Module)이 되는 셈.**
        - 각 요청에 따른 적절한 값을 반환할 수 있게 되었다!

<br><br>

## Stateless 설계 테스트 결과

```
name = userA price = 10000
name = userB price = 20000
User A's price = 10000
User B's price = 20000

Process finished with exit code 0
```

<br><br>

`참고:`[Inflearn - 김영한님_강의(스프링 핵심 원리 기본편)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8)<br><br>

<br><br>

혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>
긴 글 읽어주셔서 감사합니다. 포스팅을 마칩니다.<br>
{: .notice--success}
{: style="text-align: center;"}

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