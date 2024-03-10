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
  teaser: "/assets/images/Spring/SpringBasic/spring_conf_1.png"
---
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 다양한 설정 형식(Configuration) 지원 - 자바코드 및 XML

```
스프링 컨테이너는 다양한 형식의 설정 정보를 사용할 수 있도록 유연하게 설계 되어 있다.
- Java
- XML
- Groovy
```

> ![path](/assets/images/Spring/SpringBasic/spring_conf_1.png)<br>
- **AnnotationConfigApplicationContext**
    - Java 의 설정 클래스를 사용하여 스프링의 설정 정보를 구성.
- **GenericXmlApplicationContext**
    - XML 파일을 사용하여 스프링의 설정 정보를 구성.
- ~ ApplicationContext
    - **사용자가 Customizing 한 파일로 스프링의 설정 정보를 구성할 수도 있다.**

<br><br>

## Annotation 기반 Java 클래스를 활용한 설정 사용하기
```java
// AppConfig.class 라는 설정 클래스를 통해 설정 정보 구성
AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class)
```
- `AnnotationConfigApplicationContext` 를 사용하여 설정 클래스를 파라미터로 넘겨주면 된다.

## XML 설정 사용

> 근래에는 스프링 부트를 많이 사용하면서 XML 기반 설정 정보 구성 방식은 잘 사용하지 않는다고 한다.
> - 하지만 어느정도 규모 및 연차가 있는 회사에 취업한다면, 대부분 XML 설정을 사용하고 있을 것이다. (본인도 취직 후 Spring Framework / XML 사용 중에 있다.)

```java
// GenericXmlApplicationContext 를 사용하며 .xml 로 만들어진 설정 파일을 넘겨주자.
GenericXmlApplicationContext xac = new GenericXmlApplicationContext("classpath:applicationContext.xml"
```

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<beans xmlns="http://www.springframework.org/schema/beans"  
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">  
  
    <bean id="memberService" class="hello.core.member.MemberServiceImpl">  
        <constructor-arg name="memberRepository" ref="memberRepository"/>  
    </bean>  
  
    <bean id="memberRepository" class="hello.core.member.MemoryMemberRepository"/>  
  
    <bean id="orderService" class="hello.core.order.OrderServiceImpl">  
        <constructor-arg name="memberRepository" ref="memberRepository"/>  
        <constructor-arg name="discountPolicy" ref="discountPolicy"/>  
    </bean>  
  
    <bean id="discountPolicy" class="hello.core.discount.RateDiscountPolicy"/>  
  
</beans>
```

- \<bean> 태그를 사용하여 스프링 빈을 등록.
- Java 설정 클래스를 사용할 때와 비슷하게 1 : 1 매핑되는 것을 볼 수 있다.

# 스프링 빈 설정 메타 정보 - BeanDefinition

> ![path](/assets/images/Spring/SpringBasic/spring_conf_2.png)<br>
- 스프링은 `BeanDefinition` 을 통한 `추상화` 로서 다양한 설정 형식을 지원한다.
    - `추상화 : 역할과 구현을 개념적으로 나눈 것.`
        - XML 을 읽어서 BeanDefinition 을 생성.
        - Java 코드를 읽어서 BeanDefinition 을 생성.
        - **스프링 컨테이너는 설정 정보가 어떤 형식으로 정의 되어 있는지 알 필요 없이, BeanDefinition 만 알고 있으면 된다.**
- `BeanDefinition : 빈 설정 메타정보`
    - **`@Bean`, `<bean>` 당 각각 하나씩 메타 정보 생성.**
- **스프링 컨테이너는 이 메타 정보를 기반으로 스프링 빈을 생성.**

## AnnotationConfigApplicationContext - AnnotatedBeanDefinitionReader

> ![path](/assets/images/Spring/SpringBasic/spring_conf_3.png)<br>

```
조금 더 깊이 있게 들어가보자.
```

> ![path](/assets/images/Spring/SpringBasic/spring_conf_4.png)<br>
`AnnotationConfigApplicationContext > AnnotatedBeanDefinitionReader`<br>
- 위와 같이 `AnnotationConfigApplicationContext` 를 타고 들어가보면 **`AnnotatedBeanDefinitionReader`** 가 존재하는 것을 볼 수 있다.
    - `AnnotatedBeanDefinitionReader : 스프링 설정 정보(Java-Class)를 읽어 적절한 BeanDefinition 을 생성하는 역할.`

> ![path](/assets/images/Spring/SpringBasic/spring_conf_5.png)<br>
`GenericXmlApplicationContext > XmlBeanDefinitionReader`
- `GenericXmlApplicationContext` 에도 마찬가지로 `XmlBeanDefinitionReader` 를 가지고 있는 것을 볼 수 있다.
    - `XmlBeanDefinitionReader : 스프링 설정 정보(.xml) 을 읽어 적절한 BeanDefinition 을 생성하는 역할.`

> 새로운 형식의 설정 정보가 추가되면, `~ BeanDefinitionReader` 를 만들어 BeanDefinition 을 생성하면 된다.

## BeanDefinition 출력해보기

```java
public class BeanDefinitionTest {  
  
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);  
  
    @Test  
    @DisplayName("빈 설정 메타정보 확인")  
    void AnnotationConfigBeanDefinitionTest() {  
        String[] beanDefinitionNames = ac.getBeanDefinitionNames();  
        for (String beanDefinitionName : beanDefinitionNames) {  
            BeanDefinition beanDefinition = ac.getBeanDefinition(beanDefinitionName);  
  
            if (beanDefinition.getRole() == BeanDefinition.ROLE_APPLICATION) {  
                System.out.println("beanDefinition = " + beanDefinition + " beanDefinitionName = " + beanDefinitionName);  
            }  
        }  
    }  
}
```

### 출력 결과
```
beanDefinition = Generic bean: class [hello.core.AppConfig$$SpringCGLIB$$0]; scope=singleton; abstract=false; lazyInit=null; autowireMode=0; dependencyCheck=0; autowireCandidate=true; primary=false; factoryBeanName=null; factoryMethodName=null; initMethodNames=null; destroyMethodNames=null
beanDefinitionName = appConfig

beanDefinition = Root bean: class [null]; scope=; abstract=false; lazyInit=null; autowireMode=3; dependencyCheck=0; autowireCandidate=true; primary=false; factoryBeanName=appConfig; factoryMethodName=memberService; initMethodNames=null; destroyMethodNames=[(inferred)]; defined in hello.core.AppConfig
beanDefinitionName = memberService

beanDefinition = Root bean: class [hello.core.AppConfig]; scope=; abstract=false; lazyInit=null; autowireMode=3; dependencyCheck=0; autowireCandidate=true; primary=false; factoryBeanName=null; factoryMethodName=memberRepository; initMethodNames=null; destroyMethodNames=[(inferred)]; defined in hello.core.AppConfig
beanDefinitionName = memberRepository

beanDefinition = Root bean: class [null]; scope=; abstract=false; lazyInit=null; autowireMode=3; dependencyCheck=0; autowireCandidate=true; primary=false; factoryBeanName=appConfig; factoryMethodName=orderService; initMethodNames=null; destroyMethodNames=[(inferred)]; defined in hello.core.AppConfig
beanDefinitionName = orderService

beanDefinition = Root bean: class [null]; scope=; abstract=false; lazyInit=null; autowireMode=3; dependencyCheck=0; autowireCandidate=true; primary=false; factoryBeanName=appConfig; factoryMethodName=discountPolicy; initMethodNames=null; destroyMethodNames=[(inferred)]; defined in hello.core.AppConfig
beanDefinitionName = discountPolicy

Process finished with exit code 0

```
- beanDefinition 을 출력해보면, 해당 빈의 속성을 볼 수 있다.
    - scope
    - 추상 클래스
    - 지연 초기화
    - autowire
    - ...

<br><br>

`참고:`[Inflearn - 김영한님_강의(스프링 핵심 원리 기본편)](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%ED%95%B5%EC%8B%AC-%EC%9B%90%EB%A6%AC-%EA%B8%B0%EB%B3%B8%ED%8E%B8)<br><br>

<br><br>

혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>
긴 글 읽어주셔서 감사합니다. 포스팅을 마칩니다.<br>
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] 다양한 설정 형식(Configuration) 지원 - 자바코드 및 XML
- [x] Annotation 기반 Java 클래스를 활용한 설정 사용하기
- [x] XML 설정 사용
- [x] 스프링 빈 설정 메타 정보 - BeanDefinition
- [x] AnnotationConfigApplicationContext - AnnotatedBeanDefinitionReader
- [x] BeanDefinition 출력해보기
