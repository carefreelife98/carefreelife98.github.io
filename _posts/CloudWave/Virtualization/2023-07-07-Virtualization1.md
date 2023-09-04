---
title: "[CJOliveNetworks] 가상화 (Virtualization)"
categories:
  - Cloud-Wave-Virtualization
tags:
  - Cloud-Wave-Virtualization
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/CloudWave/Virtualization/Virtualization.png"
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
  -> kernel은 최고 권한을 가진다.
- Kernel에 근접하지 않은 사용자도 Application은 사용할 수 있어야 한다.
  - 따라서 Ring을 나누어 권한을 설정해주는 것.
  - LINUX 에서 루트 사용자와 일반 사용자를 나누는 매커니즘과 같다.

<br><br>

# (참고) Full Virtualization

<img src="/assets/images/CloudWave/Virtualization/FullVirtual.png" alt="FullVirtual_Procdess" width="100%" min-width="200px" itemprop="image"><br>`전 가상화 (Full Virtualization)`<br>

- HostOS가 존재하지 않는다.
- Hypervisor 만을 사용해서 가상화를 구현
  - 당연히 Hypervisor에는 Kernel이 존재하지 않는다.
  - GuestOS에는 Kernel 이 존재한다.
    - 이것이 GuestOS 가 Ring0인 이유이다.
      <img src="/assets/images/CloudWave/Virtualization/FullVirtualRing.png" alt="FullVirtualRing_Procdess" width="100%" min-width="200px" itemprop="image"><br><br>
      
<br><br>

# (참고) 에뮬레이션(Emulation) / QEMU(Quick Emulator)

**에뮬레이션 (Emulation)**
- 에뮬레이션은 Host Machine 에 존재하지 않는 하드웨어 및 아키텍쳐를 Virtual Machine 에게 제공하는 것.

<br><br>

**QEMU**
- QEMU 는 대표적인 **에뮬레이터(Emulator)** 중 하나.
- **매우 다양한 종류의 하드웨어를 소프트 웨어로 구현해둔 Hypervisor.**
- 다양한 하드웨어 플랫폼(예: x86, ARM, PowerPC 등)에서 다른 운영 체제(예: Linux, Windows, macOS 등)를 실행할 수 있도록 지원
- 하이퍼바이저와 에뮬레이터의 기능을 결합 -> Virtual Machine 생성 및 관리
- **주요기능**
  - **가상화**
    QEMU는 하이퍼바이저 기능을 제공하여 하드웨어 리소스를 가상화하고 여러 개의 가상 머신을 실행. <br>
    이를 통해 여러 운영 체제를 동시에 실행하거나 가상 환경을 만들어 테스트 및 개발 가능. <br>
  - **에뮬레이션**
    QEMU는 다른 아키텍처나 플랫폼에서 실행되는 응용 프로그램을 모사하고 에뮬레이션할 수 있다.<br>
    이를 통해 다른 운영 체제를 실행하는 가상 머신의 생성 가능.<br>
  - **디버깅**
    QEMU는 디버깅 기능을 제공하여 가상 머신의 동작을 추적하고 디버깅할 수 있다.<br>
    디버깅 모드에서 실행하면 코드의 실행 경로 추적 및 메모리 상태를 확인 가능.<br>
  - **네트워킹**
    QEMU는 가상 네트워크 인터페이스를 제공하여 가상 머신 간의 네트워크 통신을 지원.<br>
    이를 통해 가상 환경에서 네트워크 서비스를 구축하고 테스트 가능.<br>
    
> KVM 은 기본적으로 QEMU 와 같이 사용하며 QEMU 는 에뮬레이터이다. <br>
> KVM이 CPU와 RAM의 가상화를 담당한다면 QEMU는 각종 디바이스의 가상화를 담당한다. <br>
> 즉, QEMU는 '에뮬레이터' 이며, '에뮬레이트 한다' 라는 표현은 '소프트웨어적으로 동작 시킨다' 라는 의미로 받아들일 수 있다.

<br><br>

# (참고) Cloud OS - OpenStack / OpenShift / Kubernetes

<h1>Cloud OS</h1>

>Cloud OS(클라우드 운영 체제)는 클라우드 컴퓨팅 환경에서 작동하는 운영 체제.
>- 기존의 운영 체제가 개별적인 물리적 서버 또는 가상 머신에서 실행되는 것과 달리,
>  - **클라우드 운영 체제는 클라우드 인프라에서 가상화된 리소스를 효율적으로 관리하고 제어하는 역할을 수행.** 
>- 클라우드 운영 체제는 **여러 가상 머신 또는 컨테이너 인스턴스를 동시에 실행하고 관리하며, 리소스 할당, 스케줄링, 보안, 모니터링 등의 기능을 제공.**<br>
> AWS : 백그라운드에서 Cloud OS가 동작함으로서 서비스 되는 것. <br><br>

<h1>OpenStack</h1>

> <img src="/assets/images/CloudWave/Virtualization/OpenStack.png" alt="OpenStack_Procdess" width="100%" min-width="200px" itemprop="image"><br>`OpenStack`<br>
> **OpenStack은 오픈 소스 기반의 클라우드 컴퓨팅 플랫폼.**
> - OpenStack은 **대규모의 프라이빗 클라우드 및 퍼블릭 클라우드 인프라를 구축하고 관리하기 위한 도구와 서비스를 제공.**
>   - 컴퓨팅, 네트워킹, 스토리지, 식별 및 액세스 관리 등의 다양한 기능을 포함하고 있다.
> - Open Source이므로 무료이다.<br><br>



<h1>OpenShift(상용) - Redhat</h1>

> <img src="/assets/images/CloudWave/Virtualization/OpenShift.png" alt="OpenShift_Procdess" width="100%" min-width="200px" itemprop="image"><br>`OpenShift`<br>
> **Kubernetes의 상위 버전.** 
>
> **OpenShift는 Red Hat에서 개발한 오픈 소스 기반의 컨테이너 플랫폼**
> - OpenShift는 Kubernetes를 기반으로 한 컨테이너 오케스트레이션 및 애플리케이션 개발 및 배포를 위한 솔루션을 제공.
> - 개발자들이 클라우드 환경에서 애플리케이션을 개발, 테스트, 배포, 관리할 수 있도록 도움을 주는 도구와 서비스를 포함.
> - 유료<br><br>



<h1>Kubernetes (Open Source)</h1>

> <img src="/assets/images/CloudWave/Virtualization/Kubernetes.png" alt="Kubernetes_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Kubernetes`<br>
> Kubernetes는 컨테이너 오케스트레이션 및 관리를 위한 오픈 소스 플랫폼.<br>
> - 컨테이너화된 애플리케이션을 효율적으로 배포, 확장 및 관리하기 위한 기능을 제공.
> - Kubernetes는 애플리케이션을 여러 대의 컴퓨터 노드로 분산시키고, 컨테이너의 상태를 모니터링하며, 자원 할당과 스케줄링을 관리.
> - 무료<br><br>



혹시 이해가 안가거나 추가적인 설명이 필요한 부분, 오류 등의 피드백은 언제든지 환영합니다!<br><br>
긴 글 읽어주셔서 감사합니다. 포스팅을 마칩니다.<br>
{: .notice--success}
{: style="text-align: center;"} -->

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] LINUX의 종류
- [x] 가상화 (Virtualization)
- [x] Protection Ring
- [x] (참고) Full Virtualization
- [x] (참고) 에뮬레이션(Emulation) / QEMU(Quick Emulator)
- [x] (참고) Cloud OS - OpenStack / OpenShift / Kubernetes
