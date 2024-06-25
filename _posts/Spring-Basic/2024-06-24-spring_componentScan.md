---
title: "[Spring Basic] Spring - 컴포넌트 스캔 (Component Scan) 이란 ?"
categories:
  - Spring-Basic
tags:
  - Spring-Basic
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/Spring/SpringBasic/spring_component_teaser.png"
---
<!-- Created by Chae Seungm Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 컴포넌트 스캔과 의존 관계 자동 주입 이란?
- 기존 스프링 빈 등록 시에 @Bean 어노테이션 이나, XML 과 같은 설정파일의 \<bean> 태그를 사용하여 일일히 스프링 빈을 등록 해주어야 했다.
- 시스템이 거대해질수록 등록해야할 스프링 빈이 그에 비례하여 많아지고 이에 누락 및 오타와 같은 문제가 발생하기 쉬워지며, 유지보수에 어려움이 생긴다.
- 이에 **설정 정보가 없더라도 자동으로 스프링 빈을 등록해주는 컴포넌트 스캔이라는 기능이 존재한다.**
- **의존관계 역시 자동으로 주입해주는 `@Autowired` 어노테이션 또한 존재한다.**

<br><br>

## @ComponentScan
```java
import org.springframework.context.annotation.ComponentScan;  
import org.springframework.context.annotation.Configuration;  
import org.springframework.context.annotation.FilterType;  
  
@Configuration  
@ComponentScan(  
        excludeFilters = @ComponentScan.Filter(type= FilterType.ANNOTATION, classes = Configuration.class)  
)  
public class AutoAppConfig {  
  
}
```

- 컴포넌트 스캔 사용 방법: `@ComponentScan` 어노테이션을 설정 정보 클래스 (`@Configuration`) 에 적용.
    - 컴포넌트 스캔을 적용한 설정정보 클래스 내에 `@Bean` 을 통해 스프링 빈으로 등록한 클래스가 없는 것을 확인할 수 있다.
    - 컴포넌트 스캔은 말 그대로 `@Component` 어노테이션이 적용된 클래스를 스캔하여 스프링 빈으로 등록한다.
    - 설정 정보 클래스가 여러 개 존재하는 경우와 같이 필터를 통해 컴포넌트 스캔에서 제외 할 수 도 있다.

<br><br>

## @Autowired
```java
@Configuration  
public class AppConfig {  

	...
	
    @Bean  
    public MemberService memberService() {  
        return new MemberServiceImpl(memberRepository());  
    }

	...
	
}
```

- ComponentScan 을 사용하기 전에는 위처럼 설정 정보 클래스에서 의존 관계 주입을 해주었다.
- 하지만 ComponentScan 을 사용한 후, 설정 정보 클래스 내에서 빈을 직접 등록하지 않고, 각 **`@Component` 어노테이션이 적용된 클래스를 스프링 빈으로 자동 등록하기 때문에 의존 관계 주입 또한 `@Autowired` 메서드를 통해 해당 클래스 내에서 진행**해 주어야 한다.

<br><br>

```java
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.stereotype.Component;  
  
@Component  
public class MemberServiceImpl implements MemberService {  
  
    private final MemberRepository memberRepository;  
  
    @Autowired  
    public MemberServiceImpl(MemberRepository memberRepository) {  
        this.memberRepository = memberRepository;  
    }  
  
    @Override  
    public void join(Member member) {  
        memberRepository.saver(member);  
    }  
  
    @Override  
    public Member findMember(Long memberId) {  
        return memberRepository.findById(memberId);  
    }  
  
    // test  
    public MemberRepository getMemberRepository() {  
        return memberRepository;  
    }  
}
```

- 위와 같이 **구현 클래스의 생성자에 `@Autowired` 어노테이션을 적용**하여 **여러 의존관계 또한 한번에 주입**받을 수 있다.

<br><br>

# 컴포넌트 스캔과 자동 의존관계 주입 동작 과정
## @ComponentScan
- 컴포넌트 스캔을 사용하는 경우 자동 등록되는 **스프링 빈의 기본 이름 (Default) 은 해당 클래스명**을 사용하되, **가장 앞글자를 소문자로 변경**하여 등록되며, **직접 지정** 또한 가능하다.
    - Default: MemberServiceImpl(클래스 명) -> memberServiceImpl(스프링 빈 이름)
    - Custom: `@Component("memberServiceCustom")` 과 같이 직접 빈 이름 부여 가능.

<br><br>

## @Autowired
- 생성자에 `@Autowired` 를 적용하면, 스프링 컨테이너가 해당 스프링 빈을 찾아 자동 주입한다.
- 기본 조회 전략은 **"타입 조회"** 를 통한 동일 타입 빈을 조회하여 주입한다.
    - `getBean(MemberRepository.class)` 와 동일한 기능을 수행.

<br><br>

# 컴포넌트 스캔의 탐색 위치 및 기본 스캔 대상
## 탐색 대상 패키지의 루트 경로 지정
```java
@Configuration  
@ComponentScan(  
        basePackages = "hello.core.member",  
        excludeFilters = @ComponentScan.Filter(type= FilterType.ANNOTATION, classes = Configuration.class)  
)  
public class AutoAppConfig {  
}
```

- `@ComponentScan` 을 설정 파일에 적용 후, `basePackages` 옵션을 설정해주지 않으면, 라이브러리를 포함한 해당 프로젝트 내 모든 자바 클래스를 스캔하게 되며, 이는 오랜 시간이 걸릴 수 있다.
- 따라서, 위와 같이 `basePackages` 옵션을 적용하여 필요한 위치에서부터 그 하위를 탐색하도록 해주자.
    - 이를 지정하지 않으면, `@ComponentScan` 이 적용된 설정 정보 클래스의 패키지가 시작 위치가 된다.

### @ComponentScan TIP
- `@ComponentScan` 에 패키지 위치를 지정하지 않고, **설정 정보 클래스의 위치를 프로젝트 최상단**에 두고 쓰면 좋다.
- 스프링 부트 사용 시에는 스프링 부트의 시작 설정 정보인 `@SpringBootApplication` 을 프로젝트의 시작 루트 경로에 두고 사용하게 되며 해당 설정 내부에 `@ComponentScan` 이 존재한다.

<br><br>

## 컴포넌트 스캔의 기본 대상
- 앞서 언급했듯, **컴포넌트 스캔은 `@Component` 어노테이션이 적용된 클래스를 대상**으로 하며, **아래와 같은 어노테이션 또한 내부적으로 `@Component` 어노테이션을 가지고 있으므로 컴포넌트 스캔의 대상**이 되고, 그에 따른 **부가 기능도 수행**한다.
    - **`@Controller`** : 스프링 MVC 컨트롤러로서 인식.
    - **`@Service`** : 스프링 비즈니스 로직 구현.
    - **`@Repository`** : 스프링 데이터 접근 계층으로서 인식 및 데이터 계층의 예외를 스프링 예외로 변환.
    - **`@Configuration`** : 스프링 설정 정보로서 인식 및 스프링 빈의 싱글톤 유지를 위한 처리 수행.

> 참고로, 자바 어노테이션에는 상속 관계가 존재하지 않는다.
- 특정 어노테이션 하위에 존재하는 어노테이션을 인식하는 것은 스프링이 지원하는 기능.

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

- [x] 컴포넌트 스캔과 의존 관계 자동 주입 이란?
- [x] @ComponentScan
- [x] @Autowired
- [x] 컴포넌트 스캔과 자동 의존관계 주입 동작 과정
- [x] 컴포넌트 스캔의 탐색 위치 및 기본 스캔 대상
- [x] 탐색 대상 패키지의 루트 경로 지정
- [x] @ComponentScan TIP
- [x] 컴포넌트 스캔의 기본 대상
