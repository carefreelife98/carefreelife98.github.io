---
title: "[CJOliveNetworks] Day 2 - Network / Server"
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

- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 
- [x] 