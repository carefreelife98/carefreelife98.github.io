---
title: "[CJOliveNetworks] 도커 (Docker) 기초"
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

# Docker 정의

<img src="/assets/images/CloudWave/Virtualization/Docker.png" alt="Docker_Procdess" width="45%" min-width="200px" itemprop="image">
<img src="/assets/images/CloudWave/Virtualization/DockerStruct.png" alt="DockerStruct_Procdess" width="45%" min-width="200px" itemprop="image"><br>`Docker / Docker Structure`<br>
- 하이브리드 클라우드에서 애플리케이션을 컨테이너화하여 개발, 배포 및 실행하기 위한 **오픈 소스 컨테이너 플랫폼 제공자**
  - **운영체제 레벨에서 가상화를 제공**하는 컨테이너화 기술
- 컨테이너는 애플리케이션을 실행하는 데 필요한 모든 요소(코드, 런타임, 라이브러리, 환경 변수 등)를 포함한 **독립적인 실행 환경을 제공.**
  - = 응용 프로그램보다 쉽게 생성, 배포 및 실행 할 수 있도록 설계된 도구.
- 지난 10년 동안 사용된 LXC 에서 진화한 오픈소스 애플리케이션 배포 컨테이너.
- LXC 사용하여 다른 응용 프로그램에서 운영 체제 (OS) Kernel, CPU, RAM 공유.
- Docker 는 이러한 컨테이너를 구축, 공유 및 실행하기 위한 도구와 기술을 제공.

<br><br>

# Docker Architecture

<img src="/assets/images/CloudWave/Virtualization/DockerArch.png" alt="DockerArch_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Docker Architecture`<br>

- Docker
  - Image : 애플리케이션을 구동하기 위한 FILE
  - build : Image 생성
  - pull : Image 다운로드
  - run : image 실행
- docker 는 Client 와 Server 사이를 REST API를 통해 연결.
- dockerd 라는 도커 데몬이 동작.<br>

**기억해야할 용어**

- BUILD : 이미지 생성하기 (Download, Dockerfile)
- SHIP : 이미지 저장하기 (Docker Registry - public & private)
  - Docker Registry : 이미지가 저장된 곳
    - public : 누구나 접근가능
    - private : 인증 후 접근가능
- RUN : 이미지 실행 & Container 생성 (Application)

- Build / Ship : 주로 개발자가 진행
- Ship / Run : 주로 운영자가 진행<br><br>

# [Docker] 명령어

<img src="/assets/images/CloudWave/Virtualization/DockerClientCommands.png" alt="DockerClientCommands_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Docker Client Commands`<br>
- **도커 명령어**
  - **직관적인 명령어**를 사용.
  - **기억할만한 명령어**
    ```bash
    exec : 실행
    
    run : 이미지를 이용하여 실행이 되는 컨테이너 생성
    
    commit : container을 이용하여 이미지를 생성 (비선호 - 용량이 커짐)
      - container은 가능한 소형화 하여 여러 개의 컨테이너를 띄우는 것이 암묵적 룰 / 철학
        - 컨테이너가 소형화 될수록 성능이 증가
    
    save / load : file 확장자는 무조건 .tar
    
    create : stopped 상태의 컨테이너 생성(run과의 차이점)
    
    export : 실행이 되고 있는 파일을 container로 변환
    
    inspect : 상세정보 보기
    ```
  - **pull 과 run의 연관성**
    - container는 무조건 image가 있어야 생성 / 동작된다.
      - 만약 run하려는데 image가 없으면 run 메소드에서 pull까지 한 후 run하게 됨.<br>
        = 결국 pull 할 필요없이 매번 run만 하면 됨

<br><br>

# [Docker] 설치 (CentOS Stream 8)

```bash
[root@servera ~]# yum-config-manager --add-repo \
> https://download.docker.com/linux/centos/docker-ce.repo
```

- CentOS Stream 8 은 Docker 설치를 기본적으로 지원하지 않으므로 그 레파지토리를 먼저 설치해야 한다.
- 저장소의 URL이 저장되어 있는 파일(=repository)을 만들어주어야 한다.

```bash
[root@servera ~]# yum install docker-ce -y

[root@servera ~]# rpm -qa | grep docker
docker-ce-23.0.1-1.el8.x86_64
docker-buildx-plugin-0.10.2-1.el8.x86_64
docker-scan-plugin-0.23.0-3.el8.x86_64
docker-ce-cli-23.0.1-1.el8.x86_64
docker-ce-rootless-extras-23.0.1-1.el8.x86_64
docker-compose-plugin-2.16.0-1.el8.x86_64

[root@servera ~]# systemctl enable –-now docker
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to
/usr/lib/systemd/system/docker.service.

[root@servera ~]# systemctl status docker
```

<img src="/assets/images/CloudWave/Virtualization/Dockerinstall.png" alt="Dockerinstall_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Serera - Docker 설치 및 실행된 모습`<br>
- `systemctl enable` 명령을 사용하여 `docker` 서비스를 사용으로 설정.
- `--now` 옵션을 사용하여 서비스를 사용으로 설정하는 동시에 시작할 수 있다.

<br><br>

# [Docker] 실행 과정 예시 및 장/단점

```bash
[root@servera ~]# docker pull mariadb
```

<img src="/assets/images/CloudWave/Virtualization/Dpull.png" alt="Dpull_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Docker Pull`<br>
- pull 할 이미지 뒤에 tag(version) 을 붙히지 않으면 Default 값인 가장 최근 버전(:latest)으로 다운로드 된다.
<br><br>

```bash
[root@servera ~]# docker images
```

<img src="/assets/images/CloudWave/Virtualization/Dimages.png" alt="Dimages_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Docker images`<br>
- 현재 docker 내에 다운로드 되어 있는 이미지 리스트를 보여준다.
<br><br>

```bash
[root@servera ~]# docker run --name mariadb-basic \
> -e MYSQL_USER=user1 \
> -e MYSQL_PASSWORD=mypassword \
> -e MYSQL_DATABASE=product \
> -e MYSQL_ROOT_PASSWORD=r00tpassword \
> -d mariadb:latest
```

<img src="/assets/images/CloudWave/Virtualization/Ddbrun.png" alt="Ddbrun_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Docker 에서 maria db 생성 및 실행하는 모습`<br>
- Docker 에서 데이터베이스 생성 시 환경변수를 초기화 해주어야 한다.
- `-d` 옵션 : 백그라운드에서 실행하기
- 위에서 지정해준 환경 변수는 컨테이너에 저장된다.

<br><br>

```bash
[root@servera ~]# docker ps
```

<img src="/assets/images/CloudWave/Virtualization/Dps.png" alt="Dps_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Docker ps 명령어`<br>
- 현재 가동중인 컨테이너 리스트를 반환.
- `docker ps -a` : 현재 가동중인 컨테이너 뿐만 아니라 가동이 중지된 컨테이너 까지 모두 반환.

<br><br>

```bash
[root@servera ~]# docker exec -it mariadb-basic bash
```

<img src="/assets/images/CloudWave/Virtualization/Dexec.png" alt="Dexec_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Docker exec 명령어`<br>
- `mariadb-basic` 을
- `-it` : 상호 입출력 설정(-i) / tty 활성화 하여 Bash Shell 사용 활성화(-t)
- `-exec` : 컨테이너 내부의 Shell 사용 가능. `-it` 옵션을 통해 Bash Shell을 유지해준다.

<br><br>

이후 이전에 docker에 띄운 mariadb 컨테이너 내부에 들어가게 된다.

```shell
root@9ec2cf06718b:/# mariadb -uroot –pr00tpassword
```

<img src="/assets/images/CloudWave/Virtualization/Dmariadbaccess.png" alt="Dmariadbaccess_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Docker에 띄워진 mariadb에 접근하는 모습`<br>
- mariaDB 생성 시 설정해준 `-e MYSQL_ROOT_PASSWORD=r00tpassword` 를 사용하여 접근.

<br><br>

```shell
MariaDB [(none)]> show databases
```

<img src="/assets/images/CloudWave/Virtualization/Dmariadbuse.png" alt="Dmariadbuse_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Docker에서 mariaDB를 사용하는 모습`<br>
- `show databses` 사용 시 DB테이블이 출력되는 것을 보아 정상적으로 잘 작동하는 것을 알 수 있다.

<br><br>

```shell
exit

docker stop mariadb-basic

docker ps

docker ps -a
```

<img src="/assets/images/CloudWave/Virtualization/Dstop.png" alt="Dstop_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Docker stop / ps (-a)`<br>

<br><br>

# [Docker] Container 정의

```shell
Docker Container 란?
```

- **개발자가 라이브러리 및 기타 종속성과 같이 필요한 모든 부분을 응용 프로그램(이미지)으로 패키징 하고 하나의 패키지(컨테이너)로 모두 전송.**
- **여러 컨테이너가 동일한 머신에서 실행될 수 있고 해당 머신의 OS 커널을 다른 컨테이너와 공유해서 사용.**
- **각 컨테이너는 사용자 공간에서 격리된 프로세스(Isolation)로 실행된다.**
- **Container 개념의 탄생 배경** 
  1. **기존 리눅스 환경**
     - 자원 격리 사용(cgroup : Control Group) : 자원(CPU , RAM , DISK..)을 통제함.
     - 특정 디렉토리 권한이 제한(chroot)된 격리 환경
  2. 변경 사항을 Layer 상태로 저장하는 파일 시스템(Union File System)
- **간단하게, 격리된(독립된) 공간에서 프로세스가 동작하게 해주는 가상화 기술.**

<img src="/assets/images/CloudWave/Virtualization/DContainer.png" alt="DContainer_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Docker Container 구조`<br>

- **Container 개념에서 매우 중요한 것**
  - 여러가지 Container 의 **Image 들은 전부 Read-Only** 속성이다.
  - 하지만, 해당 이미지가 속한 **Container 들은 writable** 하다.
    - 그 이유인 즉슨, 
      **Image(read-only) 에 writable 한 Layer 를 추가한 것이 곧 Container 이기 때문.**
- **Base Image는 OS**를 뜻한다. (Debian : Ubuntu와 비슷)
- Linux
  - bootfs : kernel을 가짐
  - rootfs : 명령어를 가짐

<br><br>

# [Docker] Container 생성

<img src="/assets/images/CloudWave/Virtualization/DContainerGen.png" alt="DContainerGen_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Docker Container 생성`<br>

Docker Client 가<br>

```shell
$docker container run ~
```

하게 되면, **Docker server의 Docker Daemon**이 요청을 받게 된다.<br>
<img src="/assets/images/CloudWave/Virtualization/DDaemon.png" alt="DDaemon_Procdess" width="100%" min-width="200px" itemprop="image"><br>`Docker Daemon이 일하고 있는 모습`<br>
- **~/docker.service; enabled;**
  - 위 부분에서 Docker Daemon이 실행되었다는 것을 나타낸다.**(= dockerd)**

<br><br>

**Docker Container 생성 방법 1 - create 사용**

```shell
$ docker container create --name (컨테이너 이름 지정) -p (사용할 포트번호 지정- Host : Container) (이미지 이름)
```

<img src="/assets/images/CloudWave/Virtualization/DContGen1.png" alt="DContGen1_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Docker container create`

<br><br>

```shell
# 현재 docker에 다운로드 되어 있는 image 전부 출력
$ docker images

# 현재 Container 의 상태 정보 출력 (-a 사용시 이전에 중지된 작업들도 출력)
$ docker container ls (-a)
```

<img src="/assets/images/CloudWave/Virtualization/DContGen2.png" alt="DContGen2_Procdess" width="70%" min-width="200px" itemprop="image"><br>`docker images / docker container ls (-a)`<br>

<br><br>

```shell
# 컨테이너 실행
$ docker container start (Container 이름)
```

<img src="/assets/images/CloudWave/Virtualization/DContGen3.png" alt="DContGen3_Procdess" width="70%" min-width="200px" itemprop="image"><br>`docker container start`<br>
- STATUS 가 Up으로 변경되며 실행중인 것을 확인할 수 있다.

<br><br>

**Docker Container 생성 방법 2 - run 사용**

```shell
$ docker container run --name (컨테이너 이름 지정) -d(= 백그라운드에서 동작) -p (사용할 포트번호 지정- Host : Container) (이미지 이름)
```

<img src="/assets/images/CloudWave/Virtualization/DContainerRun.png" alt="DContainerRun_Procdess" width="70%" min-width="200px" itemprop="image"><br>`docker container run`<br>
- `run` 옵션은 local에 지정된 이미지 정보가 없을 시, 자동으로 해당 이미지를 docker library에서 pull 하여 다운로드 진행 후 컨테이너를 생성 및 실행한다.
  - 지정된 이미지 후미에 :(~버전)을 설정해주지 않을 시, default로 latest(가장 최근 버전) Tag를 달아 다운로드 / 실행한다.
  - create / start 보다 간편해서 자주 사용.
- -p 8180:80
  - Port Forwarding : Host의 8180 포트와 Container 의 80 포트를 연결.
    - Host 와 Container의 포트를 포트포워딩을 통해 연결 -> 컨테이너 생성 시 -p 옵션 주기
- -d : Background 에서 동작하도록 한다. <br>
<img src="/assets/images/CloudWave/Virtualization/DContainerRun2.png" alt="DContainerRun2_Procdess" width="70%" min-width="200px" itemprop="image"><br>`docker container run 실행 후 모습`<br>
- nginx 의 STATUS 가 Up으로 변경되며 잘 실행이 되었고, 포트 포워딩도 잘 되어 있는 모습을 볼 수 있다.

<br><br>

# [Docker] Container 중지(stop), 재실행(restart), 일시중지(pause / unpause)

```shell
# Docker Container 중지
$ docker container stop (컨테이너 이름)
```

<img src="/assets/images/CloudWave/Virtualization/DcontainerStop.png" alt="DcontainerStop_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Docker Container Stop`<br>

```shell
# Docker Container 재실행
$ docker container restart (컨테이너 이름)
```

<img src="/assets/images/CloudWave/Virtualization/DCRestart.png" alt="DCRestart_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Docker Container Restart`<br>

```shell
# Docker Container 일시 중지
$ docker container pause (컨테이너 이름)

# 해제
$ docker container unpause (컨테이너 이름)
```

<img src="/assets/images/CloudWave/Virtualization/DCPause.png" alt="DCPause_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Docker Container Pause / Unpause`<br>

<br><br>

# [Docker] Container 접속 및 그 내부 정보 변경하기 (exec)

```shell
$ docker container exec -it (컨테이너 이름) /bin/bash
# -it
#   -i : interactive, 상호 입출력
#   -t : tty -> 터미널 띄우기
```

<img src="/assets/images/CloudWave/Virtualization/DConExec.png" alt="DConExec_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Docker Container Execute`<br>
- **/bin/bash 명령어는 어디에서 실행되는 것인가?** - Container? Host?
  - **Container 에서 실행되는 명령어이다.**
  - 터미널을 사용해서 Kernel에 접근할 수 있게 된다.
- 이전에 nginx 컨테이너 생성 정보를 다시 한번 살펴보자.
  - **IP/port : 0.0.0.0:8100->80/tcp**
    - 0.0.0.0 : serverb 내의 모든 사용자가 접속 가능.
    - **8180(host) --> 80 (container)**
      - host port 는 65535 개의 범위 내에서 단 하나만 사용이 가능.
    - IP가 모두 접속 가능한 (0.0.0.0) IP 이므로 local / 해당 네트워크에 속한 사용자의 브라우저를 사용해서 직접 해당 URL 에 접근하여 내부 정보 변경 확인을 할 수 있다.<br>
      <img src="/assets/images/CloudWave/Virtualization/DConExecCurl.png" alt="DConExecCurl_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Docker Container 내부 정보 변경 후 local을 통해 확인하는 모습`<br>
      
<br><br>

# [Docker] docker cp (복사)

```shell
# 복사 대상이 존재하는 경로에서 실행
$ docker cp (복사 대상의 이름) (복사할 위치)
```

<img src="/assets/images/CloudWave/Virtualization/DockerCP.png" alt="DockerCP_Procdess" width="70%" min-width="200px" itemprop="image"><br>`Docker cp`<br>
- **cp**
  - host 상에 있는 경로를 container 으로 복사.
  - container의 경로를 host로 복사.
    - 위와 같이 직접 container 내부에 들어가지 않고 내부 정보 변경을 할 수도 있다.

  
<br><br>

> 지금까지 진행한<br>
> 
> ```
> 컨테이너 생성
> 컨테이너 내부 정보 변경 
> 컨테이너 내부 정보 확인
> ```
>
> 의 세 단계가 모두 일치해야 한다.
{: .notice--info}
{: style="text-align: left;"}




<br><br>

# Virtual Machine vs Container

<img src="/assets/images/CloudWave/Virtualization/VM_Container.png" alt="VM_Container_Procdess" width="80%" min-width="200px" itemprop="image"><br>`VM vs Container`<br>

Virtual Machine (Hypervisor : VSWare / OpenStack)
- 결과물 : Virtual Machine
- 속도가 느리고 무겁다.(= 용량이 크다)
- Integration이 어렵다.
- 새로운 컴퓨터, 즉 OS 전체가 생성되므로 Container에 비해 상대적으로 우수한 보안성.

<br><br>

Container Runtime (Docker)
- 결과물 : Container
- 속도가 빠르다 (= 용량이 작다)
- Container을 사용함으로서 Integration이 쉽다.
- 각 Container에 들어있는 Image 내부에 간소화된 OS가 포함됨.
  - 가볍고 빠른 것을 추구하는 Docker의 철학에 따라 전체 OS 기능은 포함되지 않음.
  - 따라서, Hypervisor에 의해 전체 OS가 포함되어 생성된 VM보다 상대적 보안성이 떨어진다. 

<br><br>

# Podman (무료) vs Docker (유료)

**1. Layer (code)**
   - Docker/Podman 생성 가능.
**2. Image**
   - Docker/Podman 생성 가능.
**3. Container**
   - Docker/Podman 생성 가능.
**4. Pod (Group of Containers : 컨테이너 그룹)**
   - Docker 생성 불가.
   - Podman은 Pod 까지 생성 가능
     - Pod 관리 프로그램
       - Kubernetes (OpenSource - 무료)
         - Podman을 이용하여 많이 사용
       - OpenShift (Redhat - 상용, 유료)
         - Podman을 이용하여 많이 사용

- **Docker**
  - Daemon 이 있음.
  - Daemon 이 죽으면 해당 컨테이너도 중지됨.
- **Podman**
  - Daemon 이 없음
  - Daemon 과 상관없이 해당 운영체제/ 컨테이너 가 종료될 때까지 종료되지 않음.
- **Docker의 상용화 (유료화)**
  - 점점 podman을 사용하는 추세가 보임 (대표적인 예로 KT)

<br><br>

# Kubernetes vs OpenShift

가장 큰 차이점 ?
- GUI (Web Console)
  - Kubernetes : 저수준 (Linux 명령어 필수 사용)
  - OpenShift : 고수준 (Linux를 잘 다루지 못해도 GUI 통해 충분히 사용 가능)
    - 취업 후 OpenShift 강의 들어보기 !!! (꽤 비쌈)

<br><br>








IaC (Infrastructuer as Code)
- Ansible
- Terraform

<br><br>

<img src="/assets/images/CloudWave/Virtualization/DockerArch.png" alt="DockerArch_Procdess" width="80%" min-width="200px" itemprop="image"><br>`Docker Architecture`<br>



<!-- > 
<img src="/assets/images/CloudWave/NetWork/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>
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