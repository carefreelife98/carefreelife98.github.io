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

# [Cisco Packet Tracer] 두 개의 다른 네트워크를 라우터(L3) 장비를 사용하여 연결하기


```
-------------------------- 초기 상태 -------------------------- 

- 같은 네트워크(192.168.200.~)를 사용하는 PC 0, 1을 설치.

    - PC 0과 1을 연결하는 스위치0(L2)를 설치.

- 10.~ 대역을 사용하는 PC 2 설치.
    - PC 2가 연결된 스위치1(L2) 설치.
    
- 서로 다른 네트워크 (192.168.200.~ / 10.~) 를 연결하기 위한 라우터0(L3) 설치.
```

> <img src="/assets/images/CloudWave/NetWork/cisco_2net_con1.png" alt="cisco_2net_con1_Procdess" width="100%" min-width="200px" itemprop="image"><br>`초기 상태`<br>

- 현재 PC 0과 1은 동일 네트워크(192.168.200.~)로 이루어져 스위치0를 통해 통신이 가능하다.
- PC 2는 다른 네트워크(10.~)에 속하기 때문에 라우터0의 도움 없이는 192.168.200.~ 네트워크와 통신이 불가능하다.
<br>
> 스위치 간 연결만으로는 같은 네트워크에 연결된 장치들끼리만 통신이 가능. (MAC 주소를 사용)



<!-- > <img src="/assets/images/CloudWave/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>
`참고:`[Inflearn - 김영한님_강의](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)<br><br>


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

최대한의 설명을 코드 블럭 내의 주석으로 달아 놓았습니다.<br><br>
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