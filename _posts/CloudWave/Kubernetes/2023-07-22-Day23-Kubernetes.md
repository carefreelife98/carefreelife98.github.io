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

# [Kubernetes] 추상화?
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

**소프트웨어 관점에서의 추상화**<br>

<img src="/assets/images/CloudWave/Kubernetes/softwareAbstrct.png" alt="softwareAbstrct_Procdess" width="100%" min-width="200px" itemprop="image"><br>`소프트웨어 관점에서의 추상화`<br>
- **Application을 이미지화 하는 것.**
  - 복잡한 내부 요소는 감추고, 컨테이너 위에서 사용자가 필요로 하는 기능만을 수행.

<br><br>

**관심사의 분리**<br>
<img src="/assets/images/CloudWave/Kubernetes/SeperationOfConcern.png" alt="SeperationOfConcern_Procdess" width="100%" min-width="200px" itemprop="image"><br>`추상화는 결국 관심사의 분리`<br>

<br><br>

# [Kubernetes] 쿠버네티스(Kubernetes, K8s)란?

<img src="/assets/images/CloudWave/Kubernetes/Kubernetes.png" alt="Kubernetes_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Kubernetes`<br>
**Kubernetes 는 컨테니어화된 Workload 및 Service를 관리하기 위한 Open Source Platform.**
- 선언적 구성(Declarative configuration)과 자동화(Automation)를 모두 용이하게 한다.
- Google Borg(현 Omega) 내부 시스템을 개발해 2014년 K8s로 공개됨.
- CNCF에 인큐베이팅 되어 첫번째로 졸업.<br><br>
<img src="/assets/images/CloudWave/Kubernetes/K8s.png" alt="K8s_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Kubernetes`<br>
- **Kubernetes 의 핵심 기능 세가지**
  - 어플리케이션 기능에 집중할 수 있도록 **서비스를 추상화**
  - 수천 ~ 수만개의 **서비스를 효과적으로 관리 가능**
  - **운영팀이 인프라를 효과적으로 관리할 수 있도록 효과적이고 손쉬운 도구 제공**
    - 상태 확인(Health Check) 및 자가 치유, Autoscaling, 어플리케이션 단순화 등
  - Docker, rtk 와 같은 **컨테이너의 Orchestration Tool.**

<br><br>

# [Kubernetes] K8s 를 사용하는 이유

> 1. **기민한 애플리케이션 생성 및 배포**
>    - 무거운 VM 이미지를 사용하는 것에 비해 컨테이너 Image 생성이 더 쉽고 효율적.
> 2. **지속적인 Development, Integration 및 Deployment**
>    - 안정적이고 주기적으로 컨테이너 이미지를 Build 하여 Deploy 할 수 있다.(Image의 Immutable 특성 덕분에)
>    - 빠르고 쉽게 RollBack 할 수 있다.
> 3. **개발과 운영의 관심사 분리**
>    - 배포 시점이 아닌 Build/Release 시점에 애플리케이션 컨테이너 이미지를 만들기 때문에(= Continous Integration), 애플리케이견이 Infrstructure에서 Decouple 된다. 
> 4. **OS 수준의 정보와 Metric 뿐만 아니라, Application의 health 와 그 밖의 signal 들을 볼 수 있다.**
> 5. **개발, 테스팅 및 운영 환경에 걸친 일관성**
>    - Laptop 에서도 Cloud 환경과 동일하게 구동된다.
> 6. **Cloud 및 OS 배포판 간의 이식성(Portable)**
>    - Ubuntu, RHEL, CoreOS, On-Premise, Google Kubernetes Engine 등 모든 곳에서 구동 가능하다.
> 7. **애플리케이션 중심 관리**
>    - (기존) 가상 하드웨어(VM)의 OS에서 Application을 구동하는 수준
>    - (K8s) **OS의 논리적인 자원을 사용하여 애플리케이션을 구동하는 수준으로 추상화 수준이 높아짐**.
> 8. **느슨하게 Couple / 분산되고, 유연하며 자유로운 Microservice**
>    - Application은 더 이상 단일 목적의 머신에서 Monolithic Stack 으로 구동되지 않는다.
>    - **작고 독립적인 단위로 쪼개져서 Dynamic 하게 배포되며 관리될 수 있다.**
> 9. **자원 격리 (Isolation)**
>    - Application 성능을 예측할 수 있다.
> 10. **자원의 사용량**
>     - 고효율 고집적.

<br><br>

# [Kubernetes] K8s의 기본 구성 단위

<img src="/assets/images/CloudWave/Kubernetes/K8sStruct.png" alt="K8sStruct_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Kubernetes's Default Structure`<br>
- **Control Plane (Master)**
  - etcd
  - controller manager
  - scheduler
- **Nodes**
  - Kubelet (daemon)
  - kube-proxy
  - container-runtime
    - rtk
    - Containerd
    - Docker

<br><br>

<h2>Control Plane</h2>

<img src="/assets/images/CloudWave/Kubernetes/ControlPlane.png" alt="ControlPlane_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Kubernetes's ControlPlane`<br>
- **컨트롤 플레인은 쿠버네티스 전체 클러스터를 관리.**
- Kubernetes의 머리 역할을 하며, Container가 올라가지 않는다.
- 쿠버네티스 오브젝트의 레코드를 유지 및 관리 (제어 루프)
- **컨트롤 플레인의 상세 구성**
  - **API server**
    - Kubernetes 오브젝트에 대한 데이터를 설정 및 검증
    - REST 서비스 제공
  - **Scheduler**
    - 클러스터의 노드에 Pod를 배정하는 역할
    - Feasibility(가용성) 계산하여 배정.
      - 명령어 입력 시 API server를 통해 Scheduler에게 먼저 간다.
      - Scheduler 내부 Queue를 통해 최대한의 효율로 작업을 배정.
  - **Controller Manager (Daemon)**
    - **제어 루프를 이용, API server를 통해 Cluster의 상태를 감시하여 설정된 상태(Deployment)를 지속적으로 유지하도록 함.**
    - K8s에 존재하는 Controller 종류
      - replication controller
      - endpoints controller
      - namespace controller
      - serviceaccounts controller.
  - **etcd**
    - **Cluster 오브젝트의 데이터를 분산하여 저장.**
    - in-memory Database
      - 예) 
      - 클러스터에 어떤 노드가 몇 개 있는지
      - 어떤 Pod가 어떤 Node에서 동작하고 있는지
      - 동작중인 클러스터의 etcd DB가 유실된다면 클러스터가 사용하는 모든 리소스가 미아가 되버립니다.
    - **Key:Value 형태의 데이터를 저장하는 Storage**
    - RSM(Replicated State Machine)
      - 분산 컴퓨팅 환경에서 서버가 몇 개 다운되어도 잘 동작하는 시스템을 구축하는 방법
        - 똑같은 데이터를 여러 서버에 계속하여 복제하는 것.
    - **모든 데이터는 모든 노드에 동일하게 존재.**
    - **RAFT 알고리즘으로 Leader를 선출하여 모든 데이터는 Leader에 먼저 저장.**
      - **이후 나머지 노드에 Leader에 저장된 데이터가 복제된다.**
    - **ETCD의 고가용성을 위해서는 최소 3대의 ETCD가 구성되어야 한다.**<br>
      <img src="/assets/images/CloudWave/Kubernetes/ETCD.png" alt="ETCD_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Kubernetes's ETCD`<br>
      - ETCD는 Control Plane 내부 또는 외부에 구성 가능.

<br><br>

<h2> Nodes (Worker) </h2>

<img src="/assets/images/CloudWave/Kubernetes/Nodes.png" alt="Nodes_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Kubernetes's Nodes`<br>
- Worker 노드는 컨테이너 화된 Application을 실행하는 시스템
- Application의 실행 및 Monitoring을 담당한다.
- Worker Node의 구성요소
  - Container-Runtime
    - Container를 실행하는 엔진. (Docker, rtk, Containerd ...)
  - Kubelet : 일꾼
    - API server와 통신하며 Worker Node의 컨테이너를 관리.
  - Kube-proxy : 여러개의 VM 네트워크를 하나로
    - Application의 구성 요소 간 네트워크 트래픽을 분산.

<br><br>

# [Kubernetes] POD

```
"Pods are the smallest deployable units of computing that you can create and manage in Kubernetes."
"Pod는 Kubernetes 에서 만들고 관리할 수 있으며 배포가능한 가장 작은 컴퓨팅 단위입니다."
```

<h2>Pod는 하나 이상의 컨테이너들이 모여있는 그룹</h2>

<img src="/assets/images/CloudWave/Kubernetes/K8sPod.png" alt="K8sPod_Procdess" width="100%" min-width="200px" itemprop="image"><br><br>

- Pod는 쿠버네티스 애플리케이션의 기본 실행 단위 - 만들고 배포할 수 있는 가장 작은 단위.
- Docker는 K8s Pod에서 사용되는 가장 대표적인 Container Runtime이지만 Pod는 다른 Container Runtime(rtk, containerd)도 지원한다.
- 각 Pod당 컨테이너의 비율은 대체로 1:1
  - 여러 개의 컨테이너가 포함되는 경우도 존재.
- Pod내의 컨테이너는 오로지 하나의 Node내에서만 존재한다.
  - 노드를 걸쳐서 Pod가 존재하지 않는다.<br>
    <img src="/assets/images/CloudWave/Kubernetes/PodInNode.png" alt="PodInNode_Procdess" width="30%" min-width="200px" itemprop="image"><br>`Pod는 두 개 이상의 Node를 걸쳐 존재할 수 없다.`<br>
- 동일 Pod내의 컨테이너는 Storage / Network 자원을 공유한다.
- Pod이 가지고 있는 각 컨테이너들의 실행 방법이 명시되어 있음.
- Pod의 구성 요소(Container)는 항상 동시에 배치 및 스케줄링 되며 공유 Context에서 실행된다.
  - 공유 Context
    - Linux Namespace, cgroup 및 잠재적 격리(Isolation)가 실현되는 모든 집합.
  - Container ?
    - Kernel은 공유하고 Resource를 격리 시켜주는 것.
      - Linux의 리소스 격리 담당 기술 : namespace(격리) / cgroup(제어 - Control Group)
      - 위 Linux 기술을 바탕으로 만든 것이 Docker 이다.
- Pod는 일반적으로 직접 생성되지 않으며, Workload Resource(.yaml)를 통해 생성된다.
  - ControlPlane(Master) 내부의 Controller Manger가 Workload Resource들이 명시된 Pod Temlate을 사용하여 실제 Pod를 생성한다.
  - Workload Resource : Pod Template(.yaml)을 사용하여 Pod을 생성하고 사용자 대신 해당 Pod를 관리한다. 
    - Deployment
    - StatefulSet
    - DaemonSet

<br><br>

<h2> POD 기본 명령 </h2>

**pod 보기 명령어**<br>

```shell
# 기본 pod 조회 명령어
$ kubectl get pods

# 축약어 사용
$ kubectl get po

# 상세 정보 포함 출력
$ kubectl get po -o wide

# 레이블 포함 출력
$ kubectl get po --show-labels
```

<br><br>

**Pod 생성 Template 사용하기**<br>

```yaml
apiVersion: v1 # K8s api Version
kind: Pod # K8s 리소스 타입
metadata: # Kind(현재 리소스 타입 - Pod)의 이름 , 레이블 등의 부가 정보
  name: myapp-pod # 동일 Namespace에서는 유일한 값을 사용해야 함.
  labels: # 특정 K8s 오브젝트의 나열 및 검색을 위한 Key-Value 데이터
    name: myapp
spec: # 생성할 Pod의 구체적인 정보를 나열
  containers:
    - name: myapp-container
      image: <Image> 
      resources:
        limits:
          memory: "128Mi"
          cpu: "500m"
      ports:
        - containerPort: <Port>
```


| key        | 설명              |
|------------|-----------------|
| apiVersion | k8s api version |
| kind       | K8s 리소스 타입      |
| metadata   | 이름, 레이블 등의 부가정보 |
| spec       | 컨테이너 정보         |

<br>

```bash
# yaml 파일을 이용해서 Pod 생성하기
$ kubectl create -f (yaml파일 이름).yaml


```

<br>

- 일반적으로 `kubectl run`은 실무 환경에서 잘 사용하지 않는다고 한다.
  - 위와 같은 `yaml` 파일을 사용해서 주로 생성.
- 무엇보다 Pod에 대한 이력을 관리하는 것이 중요함.

<br>

<br><br>

# VM(Virtual Machine) vs Container

Virtual Machine : 하드웨어 관점의 추상화
- 서버(인프라) 담당자가 편하다.
Container : 서비스 관점의 추상화
- 개발자가 편하다.
결론 : 둘 다 같이 사용하는 것이 가장 이상적.
- VM과 Container는 서로 목적이 다르다.
- 비교 대상이 아님.

따라서, 가장 이상적인 구조는 아래와 같다. (= 추상화 수준 높음)<br>
**추상화의 극대화**<br>
<img src="/assets/images/CloudWave/Kubernetes/Abstraction.png" alt="Abstraction_Procdess" width="100%" min-width="200px" itemprop="image"><br>`추상화의 끝`<br>
- 결국 추상화가 극대화 되어 발생한것이 Kubernetes, Service Mesh(Istio) 이다.
<br><br>

# [Kubernetes] Network 기본

<img src="/assets/images/CloudWave/Kubernetes/PodNetwork.png" alt="PodNetwork_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Flat Network`<br>
- K8s에 있는 **Pod들은 단순하며 공유 가능한 Network Address** 값을 가진다. (Flat Network)
- **각각의 Pod별로 고유 IP주소 값을 가지고 있으며 해당 IP를 이용하여 통신**을 허용.
- NAT Gateway (Network Address Translation) 와 같은 장비없이 LAN(Local Area Network) 처럼 통신이 가능함.
- **Pod 내의 모든 Container는 IP 주소 및 네트워크 포트를 포함, 네트워크 네임스페이스(Namespace)를 공유한다.**
  - **한 Pod 내부 여러 컨테이너들 사이의 통신에 한해 Localhost(127.0.0.1:~)를 통해 통신이 가능하다.** 
  - **Pod 내의 여러 Container 들은 서로 다른 Port를 사용하여 Service(외부와의 통신) 해야 한다.**
- **서로 다른 Pod의 각 내부 컨테이너 간의 통신은 IP Networking**을 통해 가능하다.
- **Pod 내부 컨테이너는 system host 이름을 해당 Pod의 이름으로 간주한다.**

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