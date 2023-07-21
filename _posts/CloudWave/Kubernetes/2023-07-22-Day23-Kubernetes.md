---
title: "[CJOliveNetworks] Cloud Native & Kubernetes 시작하기"
categories:
  - Cloud-Wave-Kubernetes
tags:
  - Cloud-Wave-Kubernetes
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# [Kubernetes] History of Cloud Native

**Agile Software Development**<br>

- 소프트웨어 개발 방법론의 하나로, 처음부터 끝까지 계획을 수립하고 개발하는 폭포수(Waterfall) 방법론과는 달리 **개발과 함께 즉시 피드백을 받아서 유동적으로 개발하는 방법.**
<br><br>
- 정식 명칭은 **애자일 소프트웨어 개발(Agile Software Development).** 한국에서는 주로 **애자일 방법론** 이라고 부른다.<br> 
  켄트 벡이 주창한 **익스트림 프로그래밍(XP, Extreme Programming)**과 **테스트 주도 개발**이 대표적.

> <h1>애자일 선언문 전문 (Korean)</h1>
> ---
> **애자일 소프트웨어 개발 선언**<br>
> 우리는 소프트웨어를 개발하고, 또 다른 사람의 개발을 도와주면서 소프트웨어 개발의 더 나은 방법들을 찾아가고 있다.<br>
> 이 작업을 통해 우리는 다음을 가치 있게 여기게 되었다:<br>
> <br>
> 
> ```
> 공정과 도구보다 개인과 상호작용을
> 포괄적인 문서보다 작동하는 소프트웨어를
> 계약 협상보다 고객과의 협력을
> 계획을 따르기보다 변화에 대응하기를
> ```
> 
<br>
> 가치 있게 여긴다.<br><br>
> 이 말은, **왼쪽에 있는 것들도 가치가 있지만, 우리는 오른쪽에 있는 것들에 더 높은 가치를 둔다는 것이다.**<br>
> Kent Beck, Mike Beedle, Arie van Bennekum, Alistair Cockburn, Ward Cunningham, Martin Fowler,<br>
> James Grenning, Jim Highsmith, Andrew Hunt, Ron Jeffries, Jon Kern, Brian Marick, Robert C. Martin<br>
> Steve Mellor, Ken Schwaber, Jeff Sutherland, Dave Thomas<br>
> © 2001, 상기 저자들<br>
> 이 선언문은 어떤 형태로든 자유로이 복사할 수 있지만, 본 고지와 함께 전문으로서만 가능하다.<br>
{: .notice--info}
{: style="text-align: left;"}

- 작게 일해라 -> 작은 것부터 개발해나가자.
- 지속 가능한 속도로 개발하자.

<br><br>

**Google Trend Search**
- 클라우드와 자동화 도구의 서막을 염.
- 컨테이너 개념의 본격적인 확산을 이끌어냄. (Kubernetes)

<br><br>

**추상화?**
- **복잡한 것은 감추는 것.** (Encapsulation)
- **필요한 기능만 Open 하는 것.**
  - Docker 명령어 -> 필요한 것만 생성되어 있다.
- (선택) **Interface를 표준화 할 것** (ISO, IEEE...)

<br><br>

**하드웨어 관점에서의 추상화**<br>
<img src="/assets/images/CloudWave/Kubernetes/hardwareAbstract.png" alt="hardwareAbstract_Procdess" width="100%" min-width="200px" itemprop="image"><br>`하드웨어 관점에서의 추상화`<br>
**하드웨어와 소프트웨어가 만나는 경계선 - OS Kernel**<br>
> **OS의 Kernel은 어떻게 추상화 해야 하는가?**

- 모든 Linux의 kernel은 같다. 종류별로 유틸(배포판)이 다른 것.
  - **Linux를 사용하자.** (~~표준화 당했다~~)

<br><br>

**소프트웨어 관점에서의 추상화**

<img src="/assets/images/CloudWave/Kubernetes/softwareAbstrct.png" alt="softwareAbstrct_Procdess" width="100%" min-width="200px" itemprop="image"><br>`소프트웨어 관점에서의 추상화`<br>
- **Application을 이미지화 하는 것.**
  - 복잡한 내부 요소는 감추고, 컨테이너 위에서 사용자가 필요로 하는 기능만을 수행.

<br><br>

# [Kubernetes] 쿠버네티스(Kubernetes, K8s)란?

<br><br>

# [Kubernetes] Container








<br><br>

# [Kubernetes] 설치, 환경설정, 시작하기

본 포스트는 MacBook M1을 기준으로 작성되었습니다.
{: .notice--danger}
{: style="text-align: center;"}

<h2>Kubernetes Cli 설치</h2>

```shell
# M1 Mac
$ brew install kubernets-cli
```

> 위 명령어를 통해 Cli를 설치하게 되면 Kubernetes의 전반적인 명령어 패키지를 사용할 수 있게 된다.

<br><br>









<img src="/assets/images/CloudWave/Kubernetes/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>


`참고:`[나무위키](https://namu.wiki/w/%EC%95%A0%EC%9E%90%EC%9D%BC)<br><br>

<!-- > 
<img src="/assets/images/CloudWave/NetWork/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>



`사진출처:`[]()
<span style="color:green">``</span>

```

```
> 
{: .notice--danger}
{: style="text-align: center;"}


<details>
<summary><span style="color:blue">(클릭)</span></summary>
<div markdown="1">       

</div>
</details> -->


<br><br>

허용 가능한 만큼의 학습 내용을 복습 겸 이곳에 포스팅 해보려고 합니다.<br><br>
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