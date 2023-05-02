---
title: "Spring-MVC (2) 컨트롤러"
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

# @RequestMapping

```
@RequestMapping ?
```

> @RequestMapping 은 애노테이션을 활용한 <br>
> 스프링의 매우 유연하고 실용적인 컨트롤러이다.
>
>```java
>// 앞서 알아보았듯이 핸들러 매핑과 핸들러 어댑터 선정 기준에서 가장 높은 우선순위를 가진 
>// @RequestMappingHandlerMapping / @RequestMappingHandlerAdapter 는
>// @RequestMapping 을 기반으로 만든 이름이다.
>```
>
>```java
>// 스프링이 자동으로 스프링빈으로 등록한다. (@Controller 내부에 @Component 가 포함되어 있어서 Component Scan의 대상이 된다.) 
>@Controller
>public class CarefreeLifeMemberFormControllerV1 {
>   
>// 요청정보를 매핑한다. 해당 URL이 호출되면 메서드 실행.
>   @RequestMapping("/springmvc/CarefreeLife/V1/members/new-form") 
>   public ModelAndView process() {             // 애노테이션을 기반으로 동작하기에 메서드 이름은 아무거나 상관없다.
>       return new ModelAndView("new-form");    // 모델과 뷰의 정보를 담아 반환.
>   }                                           // 후에 String 으로 뷰의 논리 이름만 반환해도 동작하도록 변환.
>```
>


```java
@RequestMapping("/springmvc/CarefreeLife/V1")   // 공통된 상위 URL을 중복 사용하지 않고 한번에 선언이 가능하다. 
public class CarefreeLifeMemberControllerV3 {
    
    @GetMapping("/member-form") // /springmvc/CarefreeLife/V1 + /member-form 과 같은 URL 요청시 실행됨.
    public String memberForm() {    
        return "member-form";   // ModelAndView 대신 String 으로 뷰의 논리 이름을 직접 반환 가능.
    }
    
    
    @GetMapping // 추가적인 URL 경로가 지정되지 않으면 @RequestMapping 에 지정된 상위 URL 요청시 실행됨.
    public String members(Model model){
        ...
        return "members";   // ModelAndView 대신 String 으로 뷰의 논리 이름을 직접 반환 가능.
    }
    
    @PostMapping("/save")   // /springmvc/CarefreeLife/V1 + /save 와 같은 URL 요청시 실행됨. 
    public String saveMember(
            @RequestParam("username") String username,  // 스프링은 @RequestParam 애노테이션을 사용하여 
            @RequestParam("age") int age,               // HTTP 요청 파라미터를 직접 받을 수 있다.
            Model model) {     // @RequestParam 은 request.getParameter("username") 과 거의 같은 코드이다.
        ...
        return "save-result";   // ModelAndView 대신 String 으로 뷰의 논리 이름을 직접 반환 가능.
    }
    
    // @Get, PostMapping 이외에도 Put, Delete, Patch 등의 애노테이션도 지원한다.
}
```

- <span style="color:orange">`@Controller`</span> :
  - 클래스 레벨에 지정.
  - 내부에 Component 애노테이션이 포함되어 있어서 Component Scan의 대상이 된다.
  - 스프링이 실행되는 순간 Component Scan에 의해 자동으로 스프링 빈으로 등록된다.
  - 스프링 MVC에서 애노테이션 기반 컨트롤러로 인식하게 해준다.
<br><br>
- <span style="color:orange">`@RequestMapping("URL")`</span> :
  - 클래스 레벨, 메서드 레벨 지정 가능.
  - 요청 정보를 매핑한다. 해당 URL이 호출되면 실행할 메소드를 지정.
  - 애노테이션을 기반으로 동작하므로 실행 메서드의 이름은 원하는 대로 지어도 된다.


><h1><span style="color:darkorange">@RequestMapping 의 URL 통합 및 조합 기능</span></h1>
><br>
>- 컨트롤러의 클래스 레벨에 적용시켜 메서드 단위가 아닌 클래스 단위로 통합이 가능하다.
>- 통합 뿐 아니라 아래와 같이 중복되는 상위 URL을 하나로 묶어 클래스 레벨에 적용 후<br>
>  메서드 단위로 추가적인 URL을 지정하여 조합도 가능하다.
>- 클래스 레벨 @RequestMapping("<span style="color:green">/springmvc/v2/members</span>") : 공통된 상위 URL 지정
>- - 메서드 레벨 @RequestMapping("<span style="color:red">/new-form</span>") ➡️ <span style="color:green">/springmvc/v2/members</span><span style="color:red">/new-form</span> 
>- - 메서드 레벨 @RequestMapping("<span style="color:red">/save</span>") ➡️ <span style="color:green">/springmvc/v2/members</span><span style="color:red">/save</span>
>- - 메서드 레벨 @RequestMapping ➡️ <span style="color:green">/springmvc/v2/members</span><br>
>      (추가적인 URL을 지정하지 않으면 클래스 레벨에 지정된 상위 URL 자체로 지정됨.)
{: .notice--info}
{: style="text-align: left;"}





    
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
- [x] @RequestMapping 사용법
- [x] @RequestMapping 의 URL 통합 및 조합 기능
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 