---
title: "[CJOliveNetworks] Day 2 - Subnet / Routing"
categories:
  - Cloud-Wave
tags:
  - Cloud-Wave
toc: true
toc_sticky: true
toc_label: "Carefree to See"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# Cisco Packet Tracer

```
 Cisco의 라우터, 스위치 등으로 네트워크를 가상으로 시뮬레이션 할 수 있는 프로그램
```

> <img src="/assets/images/CloudWave/NetWork/Cisco.png" alt="Cisco_Procdess" width="100%" min-width="200px" itemprop="image"><br>[출처: Cisco](https://www.netacad.com/courses/packet-tracer)<br>

> <h1>주의 사항</h1>
> ip를 잘못 부여하면 같은 (동일) 네트워크라도 통신이 되지 않는다.<br>
> L3 장비는 무조건 서로 다른 네트워크가 연결되어야 한다. (동일 네트워크끼리 연결 불가)
{: .notice--danger}
{: style="text-align: center;"}

<br><br>

# [Cisco Packet Tracer] 서로 다른 네트워크를 라우터(L3) 장비를 사용하여 연결하기


```
-------------------------- 초기 상태 -------------------------- 

- 같은 네트워크(192.168.200.~)를 사용하는 PC 0, 1을 설치.
    - PC 0과 1을 연결하는 스위치0(L2)를 설치.

- 10.~ 대역을 사용하는 PC 2 설치.
    - PC 2가 연결된 스위치1(L2) 설치.
    
- 서로 다른 네트워크 (192.168.200.~ / 10.~) 를 연결하기 위한 라우터0(L3) 설치.
```

<h2>라우터0 설치 및 설정</h2>

> <img src="/assets/images/CloudWave/NetWork/cisco_2net_con1.png" alt="cisco_2net_con1_Procdess" width="100%" min-width="200px" itemprop="image"><br>`초기 상태`<br>

- 현재 PC 0과 1은 동일 네트워크(192.168.200.~)로 이루어져 스위치0를 통해 통신이 가능하다.
- PC 2는 다른 네트워크(10.~)에 속하기 때문에 라우터0의 도움 없이는 PC 0, 1 (192.168.200.~) 네트워크와 통신이 불가능하다.
<br>
> 스위치 간 연결만으로는 같은 네트워크에 연결된 장치들끼리만 통신이 가능. (MAC 주소를 사용)

```
PC 0, 1 (192.168.200.~)과 PC 2 (10.~) 을 연결하기 위해 라우터0을 설치한다.

라우터0에 PC 0, 1, 2의 네트워크 대역을 설정해준다.
```

> <img src="/assets/images/CloudWave/NetWork/router_netconf1.png" alt="router_netconf1_Procdess" width="100%" min-width="200px" itemprop="image"><br>`라우터에 192 대역 네트워크 설정`<br>

- 라우터 0에 PC 0과 1이 사용하는 192.168.200.~ 대역의 네트워크 주소를 설정.
  - GigabitEthernet 0/0 에 설정해준다.
  - Port Status: `On`

> <img src="/assets/images/CloudWave/NetWork/router_netconf2.png" alt="router_netconf2_Procdess" width="100%" min-width="200px" itemprop="image"><br>`라우터에 10 대역 네트워크 설정`<br>

- 라우터 0에 PC 2에서 사용하는 10.~ 대역의 네트워크 주소를 설정.
  - GigabitEthernet 0/1 에 설정해준다.
  - Port Status: `On` 해주어야 한다.

<br><br>

<h2>Gateway 주소 설정</h2>

> <img src="/assets/images/CloudWave/NetWork/gatewayConf.png" alt="gatewayConf_Procdess" width="100%" min-width="200px" itemprop="image"><br>`PC의 gateway 주소 설정`<br>

- gateway를 정확하게 설정해주지 않으면 한 서비스에서 다른 서비스(외부의 서비스)로의 통신이 불가하다.
  - default gateway를 10.0.0.1 로 설정 -> 해당 PC에서 외부로 나가는 요청은 전부 10.0.0.1로 나가게 됨.
  - 라우터0의 GigabitEthernet 0/1 포트로 연결됨.

> 현재 예시인 10.~ 대역의 경우 동일한 네트워크 내에서 사용할 수 있는 네트워크의 경우의 수는 2^24개 (약 1600만개)<br>
> 
> 동일 네트워크 내에서 이렇게 많은 네트워크를 사용하지 않으므로 **Subnetting을 통해 네트워크를 분할하여 사용해야 함.**
{: .notice--danger}
{: style="text-align: center;"}

<br><br>

> <img src="/assets/images/CloudWave/NetWork/routingTable.png" alt="routingTable_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Routing Table의 현재 Status`<br>
>
> - 현재 Router0 의 Routing Table을 보면, 두 네트워크의 정보가 존재하게 된다.
> - 이로써 서로 다른 두 네트워크 (192.168.200.~ / 10.~) 의 통신이 가능해진다.

<br><br>

> <img src="/assets/images/CloudWave/NetWork/switchStatus.png" alt="switchStatus_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Switch의 동작 모습`<br>
> 
> - Switch(L2 장비)의 경우 Layer3(network)의 IP주소 정보는 알지 못하는 것을 볼 수 있다.
>
> <br><br>
> 
> <img src="/assets/images/CloudWave/NetWork/routerStatus.png" alt="routerStatus_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Router의 동작 모습`<br>
> 
> - Router(L3 장비)의 경우 Layer3 의 정보인 IP 주소도 함께 알고 있는 것을 볼 수 있다.

<br><br>

> <img src="/assets/images/CloudWave/NetWork/NetworkConnStats.png" alt="NetworkConnStats_Procdess" width="100%" min-width="200px" itemprop="image"><br>`서버 설치 후 동작 과정`<br>
>
> - 10.0.0.100 의 IP를 가진 서버를 설치 한 후 동작 과정을 살펴보자.
>   - 10.0.0.100 의 서버 IP와 사용자(PC 0) IP주소인 192.168.200.10 간의 데이터 통신이 잘 이루어지는 것을 볼 수 있다.

<br><br>

# Subnetting (서브네팅)

```
IPv4 : x.x.x.x

0.0.0.0 : 모든 네트워크

255.255.255.255 : 브로드캐스트
```

> A class(1~126 대역) 과 B class(128~191 대역)는 서브 네트워크 (Subnetting)을 사용한다.
> 
> - **`/8` : 하나의 네트워크**
>   - 10.0.0.0/8 
>     - IP 주소가 10.~으로 시작하는 하나의 모든 네트워크는 동일 네트워크.
> <br><br>
> - **`/16` : 2^8 (0~255) 개의 서로 다른 네트워크 생성 경우의 수가 발생한다.**
>   - 10.0.0.0/16 
>     - IP 주소가 10.0.~으로 시작하면 동일 네트워크.<br><br>
>
> 
>   ```
>   10.0.~
>   
>   10.1.~
>   
>   10.2.~
>   
>   ...
>   
>   10.255.~
>   ```
> 
>   - **예시로 위의 네트워크(10.0. ~ 10.255.)는 서로 다른 네트워크가 된다.(= Subnetting)** 

<br><br>

> **VPC(Virtual Private Cloud) 의 경우도 서브넷을 분할하여 사용해야 한다.**
> 
> ```
> 172.16.0.0/24
> 
> 172.16.1.0/24
> 
> 172.16.2.0/24
> 
> ...
> 
> 172.16.255.0/24
> ```
> 
> - 위와 같이 0~255 까지의 (2^8 개) 식별 가능한 네트워크를 Subnetting 하여 생성 할 수 있다.

<br><br>

# CIDR (Classless Inter-Domain Routing) 이란?

> **CIDR : "Classless Inter-Domain Routing"의 약자.**<br><br>
> IP 주소 체계를 보다 효율적으로 관리하기 위해 개발된 네트워크 주소 체계. 
> - **이 체계는 이전에 사용되던 클래스 기반의 IP 주소 할당 방식을 대체하기 위해 도입되었다.**
> <br><br>
> 
> **CIDR은 IP 주소를 표기하는 방법 중 하나.**
> - **IP 주소와 네트워크 세그먼트의 정보를 결합하여 표현한다.**
> - CIDR 주소는 IP 주소와 네트워크 세그먼트 길이를 슬래시 (/) 기호로 구분하여 표기한다. 
>   - 예를 들어, "192.168.0.0/24"는 IP 주소가 "192.168.0.0"이고 네트워크 세그먼트의 길이가 24비트라는 것을 의미.
> 
> **CIDR은 주소 공간을 보다 효율적으로 사용할 수 있도록 IP 주소를 더 작은 세그먼트로 분할하고 할당할 수 있게 해준다.** 
> - 이를 통해 더 많은 IP 주소를 생성하고 라우팅 테이블의 크기를 줄일 수 있음.
> - CIDR는 인터넷 주소 공간의 고갈 문제를 완화하고 IPv4 주소 체계의 한계를 극복하는 데 도움을 줌.
>
> **CIDR 주소 체계는 현대의 인터넷에서 널리 사용되고 있으며, IPv6와 함께 IP 주소 할당의 기본 방법으로 채택.**


<br><br>

# [CIDR] Subnetting을 하는 이유?

> **모든 네트워크가 하나의 네트워크를 사용하며 오직 스위치(Switch - L2 장비)만을 통해 통신할 수도 없을 뿐더러, 구분없이 모든 네트워크가 서로 통신이 가능하면 안되기 때문에 넷마스크를 사용하여 네트워크를 구분한 것.**
> <br><br>
> - 따라서, **Subnetting**이란<br>
> 
>   ```
>   IP 주소의 네트워크 주소를 나타내는 비트 수(넷 마스크)를 증가시켜감으로서 네트워크를 구분하여 분할하는 것.
>   ```
>   
> - **추가적으로 `/17` 등과 같이 8보다 작은 단위의 비트를 사용하여 더 세분화 할 수도 있다.**
>   - 보통 A, B, C 클래스와 같은 /8, /16, /24 세가지의 prefix를 사용하여 구분한다.
> 
> - **Subnetting 시 기준 주소(네트워크 주소 / 브로드캐스트 주소)는 할당되지 않는다.**
>   - **네트워크 주소(첫 주소)**
>     - 호스트 비트가 모두 0인 것.
>     - ex) 172.16.0.0/24
>   - **브로드캐스트 주소(끝 주소)**
>     - 호스트 비트가 모두 1인 것.
>     - 시스템 내의 모든 호스트에게 데이터를 보낼 때 사용 (알림, 공지 등)
>     - ex) 172.16.1.255/24
> 
> <br><br>
> 
> - **서로 다른 두 네트워크를 하나로 합칠 수도 있다.**
> <br>
> 
>   ```
>   172.16.0.0/24
>   
>   172.16.1.0/24
>   ```
> 
> - **위 두 네트워크가 다른 이유는 -> 세번째(24 / 8) 칸이 다르기 때문이다.**
>   - 10101100.00010000.**00000000**.~ (172.16.0.0**/24**)
>   - 10101100.00010000.**00000001**.~ (172.16.1.0**/24**)<br><br>
>  
>   - **00000000 과 00000001 의 차이이므로 prefix를 하나 줄여보자.**<br><br>
>       
>   - 10101100.00010000.**0000000~**.~(172.16.0.0**/23**)
>   - 10101100.00010000.**0000000~**.~(172.16.1.0**/23**)
> 
> **기존의 prefix /24 를 /23 으로 줄여 넷마스크를 분할하도록 변경한다면 두 네트워크를 합칠 수 있게 된다.**
> 
> <br><br>
> 
> **CIDR 을 통해 prefix를 이용하여 네트워크를 표시할 수 있게 됨으로서 A,B,C 클래스의 개념을 없애고, 그로 인해 네트워크를 쉽게 하나로 합칠 수 있게 되었다.**
>
> - 192.168.0.0/24 를 후미의 prefix만 /16으로 변경 -> (192.168.0.0/16)
>   - 서로 다른 네트워크 (최대 256개) 를 하나의 네트워크로 합칠 수 있게 된다.

<br><br>

# [Cisco Packet Tracer] 정적(static) 주소 설정을 통한 라우터 추가

> <img src="/assets/images/CloudWave/NetWork/NewRouterconn.png" alt="NewRouterconn_Procdess" width="100%" min-width="200px" itemprop="image"><br>`라우터 1 추가`<br>
> 
> <h2>라우터 추가 과정</h2>
> 
> - 새로운 라우터 1을 추가한다.
> - 라우터 0의 GigabitEthernet0/1 을 새로운 네트워크 대역 (172.16.0.0/24) 으로 연결.
> - 라우터 1의 GigabitEthernet0/0 을 새로운 네트워크 대역 (172.16.0.0/24) 으로 연결.
>   - 두 라우터는 172.16.0.0/24 네트워크로 연결됨.
> - 새로 추가된 라우터 1의 GigabitEthernet0/1 에 기존 PC 2의 네트워크 주소(10.0.0.1)를 연결.
> <br><br>
> 
> **위와 같은 라우터 추가 과정이 끝나면 각 라우터는 자신 반대쪽 라우터가 알고 있는 네트워크를 모르게 된다.**
> - **정적(static) 주소 설정을 통해 반대쪽 네트워크의 정보를 각 라우터에 설정 할 수 있다.**
> <br>
> <img src="/assets/images/CloudWave/NetWork/routerStaticAddress.png" alt="routerStaticAddress_Procdess" width="100%" min-width="200px" itemprop="image"><br>`정적 주소 설정`<br>
> <h2>정적(static) 주소 설정</h2>
> - **해당 네트워크(10.0.0.0/24)로 패킷이 오면 전부 Next Hop 으로 보내라.**
> - **정적 주소(static)를 사용하여 관리자가 직접 경로를 명시, 설정할 수 있다.**

<br><br>

# [Cisco Packet Tracer] 동적 주소 설정 (RIP : Routing Information Protocol)

> <img src="/assets/images/CloudWave/NetWork/RIP.png" alt="RIP_Procdess" width="100%" min-width="200px" itemprop="image"><br>`동적 주소 설정`<br>
> RIP를 사용하여 동적 주소 설정을 해보자.
> 
> - 간단하게 `RIP Routing` 에서 자신이 연결되어 있는 네트워크를 router 0, 1 모두 설정 후 Add 해주면 된다.
> 
> <br><br>
> 
> <img src="/assets/images/CloudWave/NetWork/router0conf.png" alt="router0conf_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Router 0의 연결 상태`<br>
> - 명령어 : do show ip route
> - 위와 같이 라우터 0에 반대쪽 네트워크인 10.0.0.0 IP 주소가 저장되어 있는 것을 볼 수 있다.
> 
> <br><br> 
> 
> <img src="/assets/images/CloudWave/NetWork/router1conf.png" alt="router1conf_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Router 1의 연결 상태`<br>
> - 마찬가지로 라우터 1에도 반대쪽 네트워크인 192.168.200.0이 저장되어 있는 것을 볼 수 있다.

<br><br>

# BGP 란?

> **BGP (Border Gateway Protocol)는 인터넷에서 사용되는 경로 선택 프로토콜 중 하나이다.**
> - **BGP는 인터넷에서 국가간의 경로 교환 및 라우팅 결정을 담당.** 
> - **다른 자율 시스템(AS, Autonomous System) 간의 경로 교환(경로 정보 교환 및 최적 경로 선택)을 관리하는 역할.**
>   - **AS: 인터넷 상의 라우팅 도메인. 각 AS는 고유한 식별자를 가지고 있다.**
>   - AS 내부에서는 내부 게이트웨이 프로토콜(IGP, Interior Gateway Protocol)가 사용.
>   - AS 간의 라우팅 정보 교환에는 BGP가 사용된다.
> 
> <br><br>
>
> **BGP는 패킷 전달에 대한 정책 기반 라우팅을 지원.**
>   - **네트워크 관리자가 라우팅 결정에 영향을 주고 관리할 수 있게 한다.**
>   - 다양한 요구 사항에 따라 **트래픽을 특정 경로로 전송하거나 특정 AS와의 연결을 우선할 수 있다.**
>
> <br><br>
> 
> **BGP는 라우팅 테이블을 교환하고 경로 정보를 업데이트하기 위해 TCP/IP 기반의 신뢰성 있는 세션을 사용.**
> BGP는 경로 벡터(Routing Vector) 알고리즘을 기반으로 동작.
>   - 경로의 길이, AS 경계를 넘어가는 경로, 정책 기반의 조건 등을 고려하여 **최적의 경로를 선택.**
>
> <br><br>
> 
> **BGP는 인터넷의 규모와 복잡성을 다루기 위해 설계된 프로토콜 -> 대규모의 네트워크 환경에서 사용됨.**
> - 인터넷 서비스 제공자(ISP) 및 기업 네트워크와 같은 대규모 네트워크에서 BGP를 사용하여 다른 AS와의 연결과 트래픽 라우팅을 관리한다.

-------------------
<h1>정리</h1>
**(1) 라우팅 정보란?**
<br><br>
**(2) 라우팅 설정하는 방법**<br>
    **정적 라우팅(static)**<br>
    **동적 라우팅(RIP)**<br>
<br>
**(3) BGP 란?**
{: .notice--info}
{: style="text-align: center;"}







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


허용 가능한 만큼의 학습 내용을 복습 겸 이곳에 포스팅 해보려고 합니다.<br>
긴 글 읽어주셔서 감사합니다. 포스팅을 마칩니다.<br>
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] Cisco Packet Tracer
- [x] [Cisco Packet Tracer] 서로 다른 네트워크를 라우터(L3) 장비를 사용하여 연결하기
- [x] Subnetting (서브네팅)
- [x] CIDR (Classless Inter-Domain Routing) 이란?
- [x] [CIDR] Subnetting을 하는 이유?
- [x] [Cisco Packet Tracer] 정적(static) 주소 설정을 통한 라우터 추가
- [x] [Cisco Packet Tracer] 동적 주소 설정 (RIP : Routing Information Protocol)
- [x] BGP 란?