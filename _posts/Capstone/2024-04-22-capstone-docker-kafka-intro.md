---
title: "[Capstone Design] Docker 통해서 Kafka, ZooKeeper 1시간 만에 사용해보기 (매우 간단, M1 Mac)"
categories:
  - INU-Capstone
tags:
  - INU-Capstone
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/INU/CapstoneDesign/kafkaTeaser.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# Docker 설치
![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka1.png)
- Docker 데몬을 실행시키기 위해 우선 Docker Desktop 을 설치한다.
- DockerHub.io 에 가입이 되어 있지 않다면, Registry 사용을 위해 가입한다. (개인 이미지 저장, Image Pull 위해 필수)
- 가입 및 Docker Desktop 까지 실행 후 우측 하단의 Docker Engine 시작 여부를 보고 실행 시켜주자.

<br><br>

# Image Pull (Kafka, Zookeeper)
![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka2.png)
```bash
docker pull zookeeper
```
- 위 명령어 실행 시 Latest 버전의 zookeeper 이미지를 Docker Hub 에서 Pull 할 수 있다.

<br><br>

![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka3.png)
- 그럼 위와 같이 zookeeper 이미지를 Docker Desktop 에서 확인 할 수 있다.

<br><br>

```bash
docker pull bitnami/kafka
```
- 마찬가지로 Kafka 도 위 명령어를 통해 Pull 해주자.

<br><br>

# Docker Compose 를 통한 Kafka, zookeeper 컨테이너 생성
```yaml
version: '2'  
services:  
  zookeeper:  
    image: zookeeper  
    container_name: zookeeper-sb  
    ports:  
      - "2181:2181"  
  
  kafka:  
    image: bitnami/kafka  
    container_name: kafka-sb  
    ports:  
      - "9092:9092"  
    environment:  
      KAFKA_ADVERTISED_HOST_NAME: 127.0.0.1  
      KAFKA_ZOOKEEPER_CONNECT: zookeeper-sb:2181  
    volumes:  
      - /var/run/docker.sock:/var/run/docker.sock
```
- 위와 같은 형태의 yml 파일을 docker-compose.yml 과 같은 이름으로 생성하자.

<br><br>

```bash
docker compose -f "{파일 경로}/docker-compose.yml" up -d --build
```
- 이후 위 명령어를 실행하여 Kafka / ZooKeeper 이미지를 사용하는 컨테이너를 띄운다.

<br><br>

![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka4.png)
- 위와 같이 컨테이너 두개가 생성됨을 확인 할 수 있다.

<br><br>

![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka5.png)
- Docker Container 에서도 마찬가지로 확인이 가능하다.

<br><br>

# Docker Container 접속 (Kafka)
```bash
docker exec -it kafka-sb bash
```
- 위 명령어를 통해 Kafka 컨테이너에 접속하자.

<br><br>

![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka6.png)
- 위와 같이 Kafka 도커 컨테이너에 접속이 되었다.

<br><br>

# \[Kafka] Topic 생성

![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka7.png)
- /opt/bitnami/kafka/bin/ 경로 아래에 위와 같이 Kafka Shell 실행 파일들이 존재하는 것을 확인 할 수 있다.
- 위 Shell 파일을 통해 우리는 Topic 을 생성하고, Producer 와 Consumer 를 지정할 것이다.

<br><br>

```bash
kafka-topics.sh --create --topic Smart-Barricade --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1
```
- 위 명령어를 실행하면 아래와 같이 Kafka Topic 을 생성할 수 있다.

<br><br>

![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka8.png)
- Smart-Barricade Topic 이 생성된 모습.
    - 참고로 Topic 이름에 " . " 이나 " _ " 는 사용은 권장하지 않는다고 한다.

<br><br>

```bash
kafka-topics.sh --describe --topic Smart-Barricade --bootstrap-server kafka:9092
```
- 위 명령어를 통해 Kafka Topic 이 정상적으로 생성되었는지 확인도 가능하다.

<br><br>

![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka9.png)
- Kafka Topic 이 정상적으로 생성됨을 확인할 수 있다.

<br><br>

# \[Kafka] Consumer 생성
```bash
kafka-console-consumer.sh --topic Smart-Barricade --bootstrap-server kafka:9092
```
- 위 명령어를 통해 Kafka 의 Producer 가 생성, 등록한 메시지를 Hook 해서 가져갈 Consumer 를 생성할 수 있다.

<br><br>

![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka10.png)
- 명령어 실행 시, 아무 일이 일어나지 않는데, Consumer 가 생성되어 Producer 가 메시지를 생성하여 Smart-Barricade 에 등록하기를 기다리고(보고)있는 것이다.
- 이대로 둔 후, 터미널 창 하나를 더 열어 진행하도록 하자.

<br><br>

# \[Kafka] Producer 생성
```bash
kafka-console-producer.sh --topic Smart-Barricade --broker-list kafka:9092
```
- 위 명령어를 실행하여 Kafka Producer 를 생성하자.

<br><br>

![path](/assets/images/INU/CapstoneDesign/capstone_docker_kafka11.png)
- 마찬가지로 Consumer 때처럼 아무일도 일어나지 않지만, ">" 표시가 나타나며 사용자의 입력을 기다릴 것이다.
- 이제부터 Kafka 의 구동 모습을 대강 확인해 볼 수 있게 된다.

<br><br>

# \[Kafka] 구동 모습
> Kafka Producer 의 입력창에서 아무 메시지나 입력해보자.

<img width="1000" src="/assets/images/INU/CapstoneDesign/kafkaserver_smartbarricade.gif"/>
- 위처럼 실시간으로 Producer 가 생성하여 Smart-Barricade 라는 Topic 에 등록한 메시지(데이터)가 Smart-Barricade 라는 Topic 을 구독(보고있는) Consumer 에 의해 즉각 소비되는 것을 볼 수 있다.
- 좌측: Consumer / 우측: Producer
- 영상 파일을 .gif 파일로 변형했더니 동작과정이 느려보이지만, 실제로는 매우 빠르다.

<br><br>

# 정리
- Docker 를 사용하여 매우 간단하고 빠르게 Kafka 를 띄우고 사용해보았다. (본인 약 40분 컷)
- 현재 진행하고 있는 캡스톤 프로젝트에 Kafka Messaging Queue 를 접목할 예정인데, 관련해서 추후 포스팅 진행하도록 하겠다.

출처: 뇌피셜

<br><br>

지식 공유 및 기록을 위한 캡스톤 디자인 졸업 과제 진행 기록입니다.
피드백은 항상 환영합니다!
긴 글 읽어주셔서 감사합니다.
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] Docker 설치
- [x] Image Pull (Kafka, Zookeeper)
- [x] Docker Compose 를 통한 Kafka, zookeeper 컨테이너 생성
- [x] Docker Container 접속 (Kafka)
- [x] \[Kafka] Topic 생성
- [x] \[Kafka] Consumer 생성
- [x] \[Kafka] Producer 생성
- [x] \[Kafka] 구동 모습
- [x] 정리