---
title: "[CJ Olivenetworks - Cloud Wave] CGV Fast Order 시스템 인프라 구축 3-1. [Httpd, Spring Boot, Aurora MySQL] 3 Tier Web Application - Github Actions, Docker"
categories:
  - Cloud-Wave-Project
tags:
  - Cloud-Wave-Project
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
   teaser: "/assets/images/CloudWave/project/simpleapp.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 간단한 Web Application 구축 및 DB 연동 Test

<img src="/assets/images/CloudWave/project/simpleapp.png" alt="simpleapp_Procdess" width="100%" min-width="200px" itemprop="image">`CI/CD 환경 구축을 위한 Test App 모습`<br>
- JDBC 쓰다가 JPA 사용하니 신세계가 펼쳐졌다.
- Primary key 중복 문제 등 모든 트러블 슈팅 성공
- 코드 길이도 210 줄에서 약 5줄로 줄어들었다.
  - 승재 형 감사합니다..

<br><br>

# Docker Image Build 하기

1. **Intellij 에서 우측 Gradle 이모티콘 → Tasks → build → bootJar 실행**
> <img src="/assets/images/CloudWave/project/docker1.png" alt="docker1_Procdess" width="100%" min-width="200px" itemprop="image"><br>

2. **그럼 좌측 프로젝트 → build → libs 에 .Jar Snapshot이 생긴다.**
> <img src="/assets/images/CloudWave/project/docker2.png" alt="docker2_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/docker3.png" alt="docker3_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> ```bash
> $ java -jar *.jar
> ```
>   - 생성된 .jar 파일은 추후 배포 전 Local 환경에서 시험 동작 시켜보는 것이 좋다.

3. **해당 파일을 기반으로 동작할 Dockerfile을 프로젝트의 최상단 경로에 작성**
> <img src="/assets/images/CloudWave/project/docker4.png" alt="docker4_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> ```dockerfile
> # Use the offical OpenJDK base image
> FROM openjdk:19
> CMD ["/.gradlew", "clean", "package"]
> ARG JAR_FILE_PATH=build/libs/*.jar
> COPY ${JAR_FILE_PATH} spring.jar
> # Expose the port app is running on(change to match app’s port)
> EXPOSE 8080
> # Command to run the application
> ENTRYPOINT ["java", "-jar", "spring.jar"]
> ```

4. **Dockerfile이 존재하는 프로젝트 최상단 경로에서 Docker Image 빌드 및 확인 후 Docker hub Push.**
> <img src="/assets/images/CloudWave/project/docker5.png" alt="docker5_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/docker6.png" alt="docker6_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> ```bash
> docker buildx build --platform=linux/amd64 -t csm4903/gooloom-was:v2.0.1 .
> ```
>
> - `M1 Mac`을 사용한다면 위 사진처럼 `buildx` 라는 멀티 플랫폼 빌드 툴을 사용해서 amd64 아키텍쳐로 빌드해야 오류가 발생하지 않는다.
> <br><br>
> <img src="/assets/images/CloudWave/project/docker7.png" alt="docker7_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> - 이미지 빌드가 성공했다면 후에 EKS에서 끌어다 사용 할 수 있게 Docker hub로 push 해보자.

5. **AWS EKS 에 Bastion을 통해 접속 후 WAS 클러스터에 yaml apply를 통한 pod 생성**
> <img src="/assets/images/CloudWave/project/docker8.png" alt="docker8_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> - AWS EKS 클러스터 중 두번째 Private Subnet에 존재하는 WAS 클러스터 (lastDance2)에 접근.
> <br><br>
> <img src="/assets/images/CloudWave/project/docker9.png" alt="docker9_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> - test 용 yaml 파일을 작성 후 `kubectl apply -f (파일이름.yaml)` 실행.
> - 이전에 Docker hub에 Push 해놓은 이미지 이름과 버전을 잘 명시해주자.
> - `-n (namespace 이름)` 옵션을 추가해서 특정 namespace에 생성해주어도 좋다.
> <br><br>
> <img src="/assets/images/CloudWave/project/docker10.png" alt="docker10_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> - `kubectl get po -w` 실행 시 Running 되는 것을 볼 수 있다.

<br><br>

# [번외] Mod_JK Connector 를 사용하여 Apache2 와 Tomcat 연결하기

> 우선 진행 과정 중 내가 만난 에러 해결방법 부터 보여주겠다. <br>

1. `configure: error: You must specify a valid --with-apxs path`
2. `configure: error: C compiler cannot create executables`

- 위 두가지 에러는 아래 패키지들을 설치하면 해결된다.

```shell
# 현재 Apache2 image 가 apk add 만 사용 가능한 경우
$ apk add perl
$ apk add gcc
$ apk add apache2-dev
$ apk add build-base

# 현재 Apache2 image 가 apt-get 사용 가능한 경우
$ apt-get update
$ apt-get install perl
$ apt-get install apache2-dev
$ apt-get install curl # 필수 x
```

아래부터는 본인이 시도했던 방법들 중 하나입니다.
{: .notice--primary}
{: style="text-align: center;"}

## 1. Docker 에서 Httpd Container 실행 및 접속

> ```shell
> # Httpd Container 생성 및 실행 (Mac M1 사용자는 --platform 옵션 필수 사용) 
> $ docker run -d -p 80:80 --platform=linux/amd64 --name (원하는 컨테이너 이름) httpd
>
> # Httpd Container 접속
> $ docker exec -it (name) /bin/bash
> ```
>
> <img src="/assets/images/CloudWave/project/mod1.png" alt="mod1_Procdess" width="100%" min-width="200px" itemprop="image"><br>정상적으로 Httpd 컨테이너에 접속한 모습<br>

<br><br>

## 2. 필수 패키지 설치

```shell
# 현재 Apache2 image 가 apk add 만 사용 가능한 경우
$ apk add perl
$ apk add gcc
$ apk add apache2-dev
$ apk add build-base
$ apk add vim

# 현재 Apache2 image 가 apt-get 사용 가능한 경우
$ apt-get update
$ apt-get install perl
$ apt-get install apache2-dev
$ apt-get install curl # 필수 x
$ apt-get install vim
```

<br><br>

## 3. Mod_jk 설치 후 압축 해제 및 실행

```shell
# Mod_jk 설치 (현재 가장 최신 버전은 1.2.48)
$ curl -O http://archive.apache.org/dist/tomcat/tomcat-connectors/jk/tomcat-connectors-1.2.48-src.tar.gz

# Mod_jk 압축 해제
$ tar -zxvf tomcat-connectors-1.2.41-src.tar.gz

# 압축 해제 경로/native 로 이동
$ cd tomcat-connectors-1.2.41-src/native

# configure 실행 (에러 발생 시 패키지 재 설치)
$ /usr/local/apache2/tomcat-connectors-1.2.41-src/native # ./configure --with-apxs=/usr/local/apache2/bin/apxs

# Mod_jk 모듈 설치
$ make && make install
```

<br><br>

## 4. httpd.conf 수정

```shell
# vi /usr/local/apache2/conf/httpd.conf
 
 
# mod_js.so 위치
LoadModule jk_module modules/mod_jk.so
 
# mod_jk.c 설정
<IfModule mod_jk.c>
# 다음과 같은 경로는 tomcat으로 연결
JKMount /* tomcat
JKMount /*.jsp tomcat
JkMount /jkmanager/* jkstatus
 
JkMountCopy All
<Location /jkmanager/>
        JkMount jkstatus
        Require ip 127.0.0.1
</Location>
 
# workers.properties 위치
JkWorkersFile "apache/conf/workers.properties"
# 로스 위치
JkLogFile "| apache/bin/rotatelogs -l apache/mod_jk.log.%y%m%d 86400 "
# 로그 레벨
JkLogLevel error
# 로그 포멧
JkLogStampFormat "[%a %b %d %H:%M:%S %Y] "
JkShmFile  "apache/mod_jk.shm"
#JkRequestLogFormat     "%w %V %T"
</IfModule>
```

> <img src="/assets/images/CloudWave/project/httpdconf1.png" alt="httpdconf1_Procdess" width="100%" min-width="200px" itemprop="image"><br><br>
> <img src="/assets/images/CloudWave/project/httpdconf2.png" alt="httpdconf2_Procdess" width="100%" min-width="200px" itemprop="image"><br><br>
> <img src="/assets/images/CloudWave/project/httpdconf3.png" alt="httpdconf3_Procdess" width="100%" min-width="200px" itemprop="image"><br><br>

<br><br>

## 5. httpd-vhost.conf 수정

```shell
$ vi usr/local/apache2/conf/extra/httpd-vhosts.conf
```

> <img src="/assets/images/CloudWave/project/httpd-vhost.png" alt="httpd-vhost_Procdess" width="100%" min-width="200px" itemprop="image"><br><br>
- JKMount 는 `worker1` -> `tomcat` 으로 변경했습니다.

<br><br>

## 6. workers.properties 추가

```shell
vim /usr/local/apache2/conf/workers.properties
 
# vhost 에서 Mount 된 worker의 이름 
worker.list=tomcat

# 통신 프로토콜 = ajp13 (=ajp1.3)
worker.tomcat.type=ajp13

# tomcat이 동작하고 있는 host의 ip주소
worker.tomcat.host=127.0.0.1

# (:80)httpd(:8001) -> (:8001)mod_jk connector(:8001) -> (:8001)tomcat(:8080)
worker.tomcat.port=8001
worker.tomcat.retries=1
 
worker.tomcat.socket_timeout=10
worker.tomcat.connection_pool_timeout=10
 
 # mod_jk 의 status 를 확인할 수 있는 manager 설정인데, 없어도 된다.
worker.list=jkstatus
worker.jkstatus.type=status
```

<br><br>

## 7. Docker Commit & Push

> <img src="/assets/images/CloudWave/project/dockerCommit.png" alt="dockerCommit_Procdess" width="100%" min-width="200px" itemprop="image"><br><br>
> 
> ```shell
> $ docker commit -m "커밋 내용" (컨테이너 ID) (도커 허브 ID)/(사용할 이미지 이름):(버전 명시)
> ```
> 
> - 현재까지 설치한 패키지 및 Mod_jk 설정 사항을 그대로 `docker commit`, `docker push`하여 이미지로 저장한다.

<br><br>

## 8. 동작 확인

> 1. 해당 이미지를 k8s manifest file에 적용
> 2. `kubectl logs (pod 이름)` 확인 <br>
>
> <img src="/assets/images/CloudWave/project/modSuccess.png" alt="modSuccess_Procdess" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>`Apache2(httpd) 와 Spring boot 내장 Tomcat 연동 성공`<br>

<br><br>

**[CJ Olivenetworks - Cloud Wave 1기] 활동 중 진행한 팀 프로젝트입니다.** <br>
**무단 복제 및 게시는 삼가주시기 바랍니다.** <br>
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] 간단한 Web Application 구축 및 DB 연동 Test
- [x] Docker Image Build 하기
- [x] [번외] Mod_JK Connector 를 사용하여 Apache2 와 Tomcat 연결하기