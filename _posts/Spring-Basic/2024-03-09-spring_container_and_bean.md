---
title: "[Spring Basic] Spring Container & Bean - ApplicationContext 와 BeanFactory"
categories:
  - Spring-Basic
tags:
  - Spring-Basic
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/Spring/SpringBasic/"
---
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 스프링 컨테이너
> **Application Context 를 스프링 컨테이너**라고 함. (더 정확히는 BeanFactory 와 구분 하지만 일반적으로 BeanFactory 를 직접 사용하는 경우는 거의 없음)
> - 기존에는 애플리케이션 구성 클래스(AppConfig) 등을 사용해서 직접 객체를 생성하고 DI(Dependency Injection)를 함.
> - **스프링에서는 구성 정보 설정을 스프링 컨테이너를 통해서 사용.**
> - 스프링 컨테이너는 **`@Configuration`** 이 붙은 구성 클래스를 설정(구성)정보로 사용.
> 	- **`@Bean`** 이라 적힌 메서드를 **모두 호출해서 반환된 객체를 스프링 컨테이너에 등록.**
> 	- 위처럼 **스프링 컨테이너에 등록된 객체를 Spring Bean 이라고 함.**
> - 스프링 빈은 **`@Bean` 이 붙은 메서드의 명을 스프링 빈의 이름으로 사용.**
> - 스프링 컨테이너를 통해서 필요한 스프링 빈(객체) 를 찾아야 함.
> 	- **`applicationContext.getBean("빈 이름", 반환 클래스)`** 를 통해 스프링 빈을 찾을 수 있다.


```
[기존]:
기존에는 개발자가 직접 자바코드로 모든 것을 함. 

[스프링 사용]:
스프링 컨테이러에 객체를 스프링 빈으로 등록하고, 스프링 컨테이너에서 스프링 빈을 찾아 사용하도록 변경되었다.
```

<br><br>

# ApplicationContext
> - ApplicationContext 는  **Interface** 이다.
> - **스프링 컨테이너의 생성 방식 두 가지**
> 	- XML
> 	- Annotation 기반의 JAVA 설정 클래스

## Annotation 기반의 JAVA 설정 클래스를 통한 생성

```java
    // 자바 기반 설정 클래스인 AppConfig.class 사용
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class)
```

> - **AnnotationConfigApplicationContext( )** 는 ApplicationContext **인터페이스의 구현체**.

<br><br>

# 스프링 컨테이너의 생성 과정

## 1. 스프링 컨테이너 생성
> ![[스크린샷 2024-02-24 오후 8.17.57.png]]
> 1. new AnnotationConfigApplicationContext(설정 / 구성 클래스)
> 	- 위 구현체 생성 시  스프링 컨테이너가 생성됨.
> 2. 스프링 컨테이너 내부에는 스프링 빈 저장소가 존재.(Key-Value 형태)
> 	- Key : 스프링 빈의 이름
> 	- Value : 스프링 빈 객체
> 3. 스프링 컨테이너는 생성 시에 사용한 설정 / 구성 클래스 의 정보를 보고 스프링 빈 등록.

<br><br>

## 2. 스프링 빈 등록
> ![[스크린샷 2024-02-24 오후 8.24.56.png]]
> 스프링 컨테이너는 생성 시에 넘겨 받은 설정 정보 클래스에서 **@Bean Annotation**이 붙은 메서드들을 모두 찾아 **스프링 빈 저장소에 등록**한다.
> - **Key : 메서드 이름** (옵션 name="" 을 사용해 직접 부여도 가능)
>   ```java
>   Bean(name="carefreelife")
> 	```
> - **스프링 빈 이름은 유일한 이름을 부여**해야 한다.
>   - 같은 이름을 가진 빈 존재 시 무시되거나 Overwrite 되는 빈이 생기고, 오류가 발생할 수 있다.
> - **Value : 메서드 리턴 값 (객체)**

<br><br>

## 3. 스프링 빈 의존관계 설정
> ![[스크린샷 2024-02-24 오후 9.25.57.png]]
> - 스프링 컨테이너는 등록된 설정 정보를 사용해서 의존 관계를 주입한다. (Dependency Injection)
> - 객체 인스턴스 간 **의존관계를 동적으로 주입**.

<br><br>

# 스프링 빈 조회

## Overview

```java
AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);  
  
@Test  
@DisplayName("모든 빈 출력하기")  
void findAllBean() {  
    String[] beanDefinitionNames = ac.getBeanDefinitionNames();  
  
    for (String beanDefinitionName : beanDefinitionNames) {  
        Object bean = ac.getBean(beanDefinitionName);  
        System.out.println("name = " + beanDefinitionName + " Object = " + bean);  
    }  
}
```

![[스크린샷 2024-02-25 오후 6.52.22.png]]
`실행 모습 - 직접 등록한 빈 뿐 아니라 스프링 내부 빈까지 출력되는 모습을 볼 수 있다.`<br>
> - **모든 빈 출력하기**
> 	- 실행 시 **스프링에 등록된 모든 빈 정보를 출력**할 수 있다.
> 	- `ac.getBeanDefinitionNames()` : 스프링에 등록된 모든 빈 이름을 조회한다.
> 	- `ac.getBean()` : 빈 이름으로 빈 객체(인스턴스)를 조회한다.

<br><br>

```java
@Test  
@DisplayName("애플리케이션 빈 출력하기")  
void findApplicationBean() {  
    String[] beanDefinitionNames = ac.getBeanDefinitionNames();  
  
    for (String beanDefinitionName : beanDefinitionNames) {  
        // getBeanDefinition : 각 빈에 대한 MetaData 정보를 얻을 수 있음.  
        BeanDefinition beanDefinition = ac.getBeanDefinition(beanDefinitionName);  
  
        // getRole - BeanDefinition.ROLE_APPLICATION :  
        // - 스프링 내부 빈이 아닌 애플리케이션 개발을 위해 직접 등록한 빈.  
        // - 외부 라이브러리에 의해 생성되는 빈  
        // getRole - BeanDefinition.ROLE_INFRASTRUCTURE :  
		// - 스프링이 내부에서 사용하는 빈
        if (beanDefinition.getRole() == BeanDefinition.ROLE_APPLICATION) {  
            Object bean = ac.getBean(beanDefinitionName);  
            System.out.println("name = " + beanDefinitionName + " Object = " + bean);  
        }  
    }  
}
```

![[스크린샷 2024-02-25 오후 6.54.21.png]]
`실행 모습 - Bean 의 메타데이터 정보를 꺼내 ROLE_APPLICATION 에 해당하는 빈만 출력`<br>
> - **애플리케이션 빈 출력하기**
> 	- 스프링이 내부에서 사용하는 빈은 제외하고, **개발자가 직접 등록한 빈 출력.**
> 	- 스프링이 내부에서 사용하는 빈은 **`getRole()` 메서드로서 구분**할 수 있다.
> 		- **`ROLE_APPLICATION` : 일반적으로 개발자가 개발을 위해 정의한 빈**
> 		- **`ROLE_INFRASTRUCTURE` : 스프링이 내부에서 사용하는 빈**

<br><br>

## 스프링 빈 조회 (기본)

```java
// 스프링 컨테이너에서 스프링 빈을 조회하는 가장 기본적인 방법
AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

// 방법 1
Object bean = ac.getBean(빈 이름, 타입);

// 방법 2
Object bean = ac.getBean(타입);

// 조회 대상 스프링 빈이 없으면 아래와 같은 예외가 발생한다.
`NoSuchBeanDefinitionException: No bean named '~' available`
```
<br><br>

### 스프링 빈 이름을 통한 빈 조회

```java
AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);  
  
@Test  
@DisplayName("빈 이름으로 조회")  
void findBeanByName() {  
	// ac.getBean("빈 이름", 빈 타입)
    MemberService memberService = ac.getBean("memberService", MemberService.class);  
    System.out.println("memberService = " + memberService);  
    System.out.println("memberService.getClass() = " + memberService.getClass());  
}
```

<br><br>

### 스프링 빈 타입을 통한 조회
```java
AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class); 

@Test  
@DisplayName("빈 타입으로 조회")  
void findBeanByType() {  
    MemberService memberService = ac.getBean(MemberService.class);  
    assertThat(memberService).isInstanceOf(MemberServiceImpl.class);  
}
```

<br><br>

### 구체적 타입을 통한 스프링 빈 조회
```java
@Test  
@DisplayName("구체적 타입으로 조회 - 선호되지 않음")  
void findBeanBySpec() {  
    MemberService memberService = ac.getBean("memberService", MemberServiceImpl.class);  
    assertThat(memberService).isInstanceOf(MemberServiceImpl.class);  
}
```
- 위와 같이 구체적 타입을 명시하여 빈 조회를 수행하는 것이 가능은 하지만 **역할과 구현의 분리 관점에서 구현에 의존하는 방향성을 가지기 때문에 좋지 않은 코드**이다.

<br><br>

## 스프링 빈 조회 실패 테스트 - NoSuchBeanDefinitionException
> 앞서 스프링 빈 조회 실패 시 `NoSuchBeanDefinitionException` 예외가 발생함을 언급했었다.
> - 실패 테스트를 통해 확인해보자.

```java
@Test  
@DisplayName("[실패 테스트] 빈 이름으로 조회되지 않는 경우 : 예외 발생")  
void findBeanByNameFail() {  
	// no_such_name 이라는 이름의 빈은 현재 존재하지 않는다.
	MemberService no_such_name = ac.getBean("no_such_name", MemberService.class);  
}
```
- 위 코드 실행 시 "no_such_name" 이라는 이름을 가진 빈이 등록되어 있지 않으므로 `NoSuchBeanDefinitionException` 예외를 발생시킬 것이다.

![[스크린샷 2024-02-25 오후 8.35.25.png]]
`실행 모습 - NoSuchBeanDefinitionException 예외가 발생한 것을 볼 수 있다.`

<br><br>

```java
// JUnit5 를 사용하여 실제로 해당 Exception 이 발생하는지 확인하는 방법도 있다.
import org.springframework.beans.factory.NoSuchBeanDefinitionException;

import static org.junit.jupiter.api.Assertions.assertThrows;

@Test  
@DisplayName("[실패 테스트] 빈 이름으로 조회되지 않는 경우 : 예외 발생")  
void findBeanByNameFail() {  
	// no_such_name 이라는 이름의 빈은 현재 존재하지 않는다.
	assertThrows(NoSuchBeanDefinitionException.class,  
        () -> ac.getBean("no_such_name", MemberService.class));
}
```

<br><br>

## 스프링 빈 조회 실패 테스트 - NoUniqueBeanDefinitionException
> 스프링 빈 조회 시 **조회 방법에 따라 중복 값을 가진 빈이 존재**하면 **`NoUniqueBeanDefinitionException` 예외가 발생**한다.

<br><br>

### 중복 타입을 가진 빈 조회 시 - 예외 발생
```java
AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(SameBeanConfig.class);  
  
@Test  
@DisplayName("빈 타입을 통한 빈 조회 시 동일한 타입이 둘 이상 있으면, 중복 오류가 발생한다.")  
void findBeanByTypeDuplicate() { 

	// MemberRepository.class 타입을 가진 빈 조회
    MemberRepository bean = ac.getBean(MemberRepository.class);  
}  

@Configuration
static class SameBeanConfig {  

	// MemberRepository.class 타입을 가짐
    @Bean  
    public MemberRepository memberRepository1() {  
        return new MemoryMemberRepository();  
    }  

	// MemberRepository.class 타입을 가짐 (중복)
    @Bean  
    public MemberRepository memberRepository2() {  
        return new MemoryMemberRepository();  
    }  
}
```
- 스프링 빈 조회 시 파라미터에 빈의 타입만을 지정했기 때문에 지정된 타입을 가진 빈 두 개가 조회되며, getBean() 메서드에서는 하나의 빈만 반환하므로 `NoUniqueBeanDefinitionException` 예외가 발생하게 된다.

![[스크린샷 2024-02-25 오후 9.08.22.png]]
`실행 모습 - NoUniqueBeanDefinitionException 예외 발생`

<br><br>

### 중복 타입을 가진 빈 조회 시 - 예외 해결
```java
@Test  
@DisplayName("타입으로 조회 시 같은 타입이 둘 이상 있으면, 빈 이름을 지정해야 한다")  
void findDuplicateBeanByName() {  
	// 중복된 타입을 조회하지만, 빈의 이름을 특정하여 원하는 하나의 빈을 조회.
    MemberRepository memberRepository = ac.getBean("memberRepository1", MemberRepository.class);  
    assertThat(memberRepository).isInstanceOf(MemberRepository.class);  
}
```

<br><br>

## 특정 타입의 스프링 빈 전체 조회하기
이전에는 getBean() 메서드를 사용함에 하나의 빈만 찾을 수 있어 예외가 발생했다.
- **getBeansOfType() 메서드를 통해 중복된 타입을 가진 모든 빈을 찾을 수 있다.**

```java
@Test  
@DisplayName("특정 타입을 가진 모든 빈 조회하기")  
void findAllBeanByType() {  
	// getBeansOfType() 사용 시 찾은 모든 빈을 Map<String, 타입> 형태로 반환해준다.
    Map<String, MemberRepository> beansOfType = ac.getBeansOfType(MemberRepository.class);  
    for (String key : beansOfType.keySet()) {  
        System.out.println("key = " + key + " value = " + beansOfType.get(key));  
    }  
    System.out.println("beansOfType = " + beansOfType);  
  
    // 검증  
    assertThat(beansOfType.size()).isEqualTo(2);  
}
```

![[스크린샷 2024-02-25 오후 9.21.46.png]]
`실행 모습 - 예외가 발생하지 않고 동일 타입을 가진 모든 빈을 조회 할 수 있다.`

<br><br>

# BeanFactory
- 스프링 컨테이너의 최상위 인터페이스.
- 스프링 빈을 관리하고 조회하는 역할을 담당한다.
- `getBean()` 메서드를 제공한다.

<br><br>

# ApplicationContext
- BeanFactory 기능을 모두 상속받아서 제공한다.
- BeanFactory 와의 차이점
    - 애플리케이션을 개발할 때에 빈을 관리하고 조회하는 기능 외에 추가적인 부가 기능을 필요로 한다.

<br><br>

## ApplicationContext 가 제공하는 부가기능
![[스크린샷 2024-03-02 오후 6.46.22.png]]
- **메시지 소스를 활용한 국제화 기능**
    - 한국에서 접근 시 한국어 출력
    - 영미권에서 접근 시 영어 출력
- **환경 변수**
    - Local, Dev, Release 등의 환경을 구분하여 처리가능.
- **Application Event**
    - 이벤트를 발행하고 구독하는 모델을 편리하게 지원.
- **편리한 리소스 조회**
    - File, Classpath, External 등의 Resource 들을 편리하게 조회.

<br><br>

# 정리
- Application Context 는 BeanFactory 의 기능을 상속받는다.
- **ApplicationContext 는 빈 관리기능 + 편리한 부가 기능을 제공한다.**
- BeanFactory 를 직접 사용할 일은 거의 없다. 부가기능이 포함된 ApplicationContext 를 사용한다.
- **BeanFactory / ApplicationContext 를 스프링 컨테이너라 한다.**


<br><br>

혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>
긴 글 읽어주셔서 감사합니다. 포스팅을 마칩니다.<br>
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] 스프링 컨테이너
- [x] ApplicationContext
- [x] Annotation 기반의 JAVA 설정 클래스를 통한 생성
- [x] 스프링 컨테이너의 생성 과정
- [x] 스프링 빈 조회 (기본)
- [x] 스프링 빈 이름을 통한 빈 조회
- [x] 스프링 빈 타입을 통한 조회
- [x] 구체적 타입을 통한 스프링 빈 조회
- [x] 스프링 빈 조회 실패 테스트
- [x] 중복 타입을 가진 빈 조회 시 - 예외 발생
- [x] 중복 타입을 가진 빈 조회 시 - 예외 해결
- [x] 특정 타입의 스프링 빈 전체 조회하기
- [x] ApplicationContext 가 제공하는 부가기능
- [x] 정리
