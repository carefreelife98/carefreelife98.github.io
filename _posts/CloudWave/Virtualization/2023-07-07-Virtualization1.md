---
title: "[CJOliveNetworks] 가상화 (Virtualization)."
categories:
  - Cloud-Wave-Virtualization
tags:
  - Cloud-Wave-Virtualization
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# LINUX의 종류

```
1. Suse

2. Ubuntu

3. Redhat
    - RHEL(Red Hat Enterprise Linux - 상용버전)
    - Fedora
    - Oracle
    - AMI(Amazon Machine Image)
```

> - 공통점 
>   - 명령어가 대부분 비슷하다.
> - 차이점
>   - Ubuntu
>     - 패키지 다운로드 : apt -get
>   - CentOS
>     - 패키지 다운로드 : yum / dnf
>     - 패키지 파일명 : .rpm 으로 끝난다.

<br><br>

# 가상화 (Virtualization)

```
가상화 (Virtualization) 란?
```

<img src="/assets/images/CloudWave/Virtualization/Virtualization.png" alt="Virtualization_Procdess" width="100%" min-width="200px" itemprop="image"><br>`가상화의 개념`<br>

- **가상화 : 한 대의 시스템 하드웨어를 논리적으로 분할하여 가상의 시스템을 생성 및 활용하는 개념**
  - **논리적 : 얼마든지 생성 및 삭제가 가능한 것.**

- **가상 시스템들은 서로 독립적인 하나의 시스템으로 인지되기 때문에 주어진 하드웨어 리소스를 효율적으로 사용할 수 있다.**
  - **독립성(Isolation) : 가상화된 시스템 상호간에 관계가 존재하지 않는다.** (= 쉽게 말해서 서로 터치하지 않는다.)
    - 예)<br>
      ```
      - 아래와 같이 Host OS 위에 설치된 Hypervisor 위에서 동작하는 Guest OS를 
        주어진 하드웨어 리소스 범위 내에서 무한히 생성 및 삭제 할 수 있다.
      
      - 또한 Guest OS 들은 자신이 Hypervisor 위에서 동작하고 있다는 것을 알지 못한다.
        -> 가상화의 독립성 (Isolation : 고립 , 격리)
      
      ....(반복)
      
      Windows 11 OS -> Guest OS (for CentOS Stream 8)
      
      KVM (시뮬레이터) -> Hypervisor
      
      CentOS Stream 8 (213.0.113.128) -> Guest OS(for Mac OS) / Host OS (for windows 11 OS)
      
      VMWare (가상머신 / 213.0.113.2) -> Hypervisor
      
      MacOS (213.0.113.1) -> Host OS
      ```
    <br>
- 가상화에서 가장 중요한 개념 중 하나는 **하이퍼바이저 (Hypervisor)** 이다.
- **하이퍼바이저 (Hypervisor)**<br>
  <img src="/assets/images/CloudWave/Virtualization/hypervisor2.png" alt="hypervisor2_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Virtual Machine Monitor (=가상머신 생성 및 실행 프로세스) 이 곧 하이퍼바이저이다.`<br>
  - 물리적 하드웨어에 설치된 소프트웨어 계층. -> 물리적 머신을 다수의 가상 머신으로 분할하여 사용
    - 동일한 하드웨어 내에서 여러 OS를 가상머신에 올려 사용할 수 있게 된다.
    - Guest OS / Instance : 가상 머신에 설치된 OS
    - Host OS / Host Machine : 하이퍼바이저가 실행되는 하드웨어
  - **가상 OS(Guest OS)와 실제 하드웨어 리소스(Host OS) 사이에 위치하여 둘 사이의 괴리를 조정해주는 역할**
  - 해당 과정을 **`추상화`** 라고 한다.
    - 물리적인 하드웨어 리소스를 소프트웨어적으로 (가상으로) 분할.
    - **분할된 가상의 하드웨어를 실제 하드웨어 리소스처럼 인지시키는 과정을 의미.**<br>

<br><br>

# Protection Ring

```
Protection Ring 은 시스템 아키텍쳐 내에서 둘 이상의 계층으로 권한을 나눈 매커니즘.
```

<img src="/assets/images/CloudWave/Virtualization/ProtectionRing.png" alt="ProtectionRing_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Protection Ring의 모습`<br>

**Protection Ring 이란?**
- 운영체제는 사용자 및 하드웨어와 소프트웨어 리소스를 공유.
  - 한 프로그램이 다른 프로그램 및 운영체제를 실행하는 오작동, 결함 및 악성 행동으로부터 데이터와 기능을 보호해야 한다.
  - 이를 위해 Protection Ring은 시스템 아키텍쳐를 둘 이상의 계층으로 권한을 나누어 보호 목적을 달성한다.

**Kernel 의 가장 중요한 역할은?**
- Hardware Control (CPU, RAM, HardDisk, Monitor, Mouse..)
  - Hardware Control을 위해 Driver 가 존재해야 한다.
- Kernel 은 모든 하드웨어들을 인식 할 수 있어야 한다.
- kernel에 근접한 권한을 가진 사용자 일수록 가장 많은 권한을 가져야 한다.<br>
  -> kernel은 최고 권한이다.
- Kernel에 근접하지 않은 사용자도 Application은 사용할 수 있어야 한다.
  - 따라서 Ring을 나누어 권항르 설정해주는 것.
  - LINUX 에서 루트 사용자와 일반 사용자를 나누는 매커니즘과 같다.






<img src="/assets/images/CloudWave/Virtualization/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>














<!-- > 
<img src="/assets/images/CloudWave/Virtualization/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>
<span style="color:green">``</span>
 
{: .notice--danger}
{: style="text-align: center;"}

<details>
<summary><span style="color:blue">(클릭)</span></summary>
<div markdown="1">       

</div>
</details> -->

<br><br>

<!-- 최대한의 설명을 코드 블럭 내의 주석으로 달아 놓았습니다.<br><br>
혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>
긴 글 읽어주셔서 감사합니다. 포스팅을 마칩니다.<br>
{: .notice--success}
{: style="text-align: center;"} -->

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