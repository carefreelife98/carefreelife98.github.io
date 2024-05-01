---
title: "[Capstone Design] 스마트 바리케이드 모니터링을 위한 어드민 서버 구축 (Spring Boot, Thymeleaf, Docker, Kafka, YoloV8, OpenCV)"
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

# 1. \[Kafka - Consumer] Spring Boot Server 및 Docker Kafka 서버 기동
## 1-1. Spring Boot Project Dependency 목록
```java
dependencies {  
    // spring boot base resources  
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'  
    implementation 'org.springframework.boot:spring-boot-starter-web'  
    implementation 'org.springframework.boot:spring-boot-starter-web-services'  
    developmentOnly 'org.springframework.boot:spring-boot-devtools'  
  
    // kafka & zookeeper with docker-compose  
    implementation 'org.springframework.kafka:spring-kafka'  
    implementation 'org.apache.kafka:kafka-streams'  
    developmentOnly 'org.springframework.boot:spring-boot-docker-compose'  
  
    // lombok  
    compileOnly 'org.projectlombok:lombok'  
    annotationProcessor 'org.projectlombok:lombok'  
   
    testImplementation 'org.springframework.kafka:spring-kafka-test'  
}
```

<br><br>

## 1-2. docker-compose.yml 작성
```yml
version: '2'  
services:  
  zookeeper:  
    image: wurstmeister/zookeeper  
    container_name: zookeeper  
    ports:  
      - "2181:2181"  
  kafka:  
    image: wurstmeister/kafka:2.12-2.5.0  
    container_name: kafka  
    ports:  
      - "9092:9092"  
    environment:  
      KAFKA_ADVERTISED_HOST_NAME: 127.0.0.1  
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181  
    volumes:  
      - /var/run/docker.sock:/var/run/docker.sock
```
- Project Root 에 저장해 주도록 하자.

<br><br>

## 1-3. application.properties 설정
```c
spring.application.name=smart-barricade  
  
# Zookeeper Config
spring.config.import=optional:zookeeper:  
  
# Kafka Config
spring.kafka.bootstrap-servers=localhost:9092  
  
# Kafka Producer - 현 프로젝트에서는 사용하지 않음 
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer  
spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer  
  
# Kafka Consumer    
spring.kafka.consumer.group-id=sb  
spring.kafka.consumer.auto-offset-reset=earliest  
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer  
spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer
```
- **Zookeeper Config**
    - zookeeper 가 없더라도 진행 (NPE 방지 느낌, nullable)
- **Kafka Config**
    - Kafka 서버와 연결할 호스트와 포트 정보.
    - 만약 producer와 consumer가 다른 서버에 있다면 spring.kafka.consumer(producer).bootstrap-servers으로 설정.
        - 이 경우 글로벌 Config 는 무시되며 (spring.kafka.bootstrap-servers), consumer 전용으로 오버라이딩 됨.
    - 현 프로젝트에서는 파이썬으로 동작하는 Yolo 서버와 Spring Boot 간의 통신이지만 둘 다 local 에 뜨므로 localhost 로 진행.
- **Kafka Consumer**
    - Spring Boot Admin 서버는 Consumer 역할을 하므로 Deserializer 사용

<br><br>

## 1-4. Kafka Consumer 생성
```java
package com.smartbarricade.smartbarricade.kafka;  
  
import org.springframework.kafka.annotation.KafkaListener;  
import org.springframework.stereotype.Component;  
  
@Component  
public class KafkaAdminConsumer {  
  
    @KafkaListener(topics = "{Topic 이름}", groupId = "{Consumer 그룹 이름}")  
    public void handleMessage(String message) {  
        System.out.println("Received message: " + message);  
    }  
}
```
- KafkaListener 어노테이션을 통해 구독할 Topic 과 자신(Consumer)의 그룹을 정의한다.
- **구독하고 있는 Topic 에 메시지가 발행되면, KafkaListener 어노테이션이 정의된 handleMessage() 메서드에 의해 발행된 메시지를 가져와 출력하게 된다.**

<br><br>

## 1-5. \[참고] Kafka 기존 Topic 제거
```bash
# 1. /config/server.properties 에 추가해주도록 하자.
delete.topic.enable = true

# 2. Kafka restart
docker kafka stop
docker kafka start

# 3. zookeeper-shell 접근
/bin/zookeeper-shell.sh localhost:2181

# 4. 제거 대상 Kafka Topic 조회
ls /brokers/topics

# 5. 해당 Topic 제거: rmr 은 deprecate, deleteall 명령어 사용할 것
deleteall /brokers/topics/{Topic 이름}

# 6. 정상적으로 Topic 이 제거 되었는지 확인: 제거 대상 Topic 이름이 뜨지 않으면 제거된 것.
/bin/kafka-topics.sh --list --zookeeper zookeeper:2181
```
- [참고: hyojaedev](https://hyojaedev.tistory.com/38)

<br><br>

# 2. \[Kafka Producer] - YoloV8 을 통한 실시간 객체 탐지 서버 구현
```python
import producer  
# 속도, bbox, class, roi  
  
  
import cv2  
import pandas as pd  
from ultralytics import YOLO  
from tracker import Tracker  
import numpy as np  
  
model = YOLO('yolov8x.pt')  
model.classes = [0, 1, 2, 3, 5, 7]  
  
  
def RGB(event, x, y, flags, param):  
    if event == cv2.EVENT_MOUSEMOVE:  
        print([x, y])  
  
  
cv2.namedWindow('RGB')  
cv2.setMouseCallback('RGB', RGB)  
  
# cap = cv2.VideoCapture('rtsp://{secrets}@{IP}:{port}/{stream name}')  
cap = cv2.VideoCapture('../CarDetection/sample.mp4')  
  
with open("coco.txt", "r") as my_file:  
    data = my_file.read()  
    class_list = data.split("\n")  
fps = cap.get(cv2.CAP_PROP_FPS)  
scaling_factor = 0.06  # 픽셀당 실제 거리(미터)로 변경  
tracker = Tracker()  
previous_positions = {}  
previous_widths = {}  
  
speeds = {}  
frame_count = 0  
  
# Define the ROI coordinates (x, y, width, height)  
roi_x, roi_y, roi_w, roi_h = 750, 200, 530, 520  # Example coordinates  
  
# Kafka  
# 브로커와 토픽명을 지정한다.  
broker = 'localhost:9092'  
topic = 'Smart-Barricade'  
message_producer = producer.MessageProducer(broker, topic)  
  
while True:  
    ret, frame = cap.read()  
    if not ret:  
        break  
    frame = cv2.resize(frame, (1280, 720))  
  
    roi_frame = frame[roi_y:roi_y + roi_h, roi_x:roi_x + roi_w]  
  
    results = model.predict(roi_frame)  
    a = results[0].boxes.data.cpu()  
    px = pd.DataFrame(a).astype("float")  
    cars = []  
  
    for index, row in px.iterrows():  
        if 'car' in class_list[int(row[5])]:  
            x1, y1, x2, y2 = int(row[0]), int(row[1]), int(row[2]), int(row[3])  
            width = x2 - x1  
            height = y2 - y1  
  
            x1 += roi_x  
            y1 += roi_y  
            x2 += roi_x  
            y2 += roi_y  
  
            # Only pass x, y, width, height to the tracker  
            cars.append([x1, y1, width, height])  # Update here  
            message_producer.send_message(f"message from open cv !! Car Detected: {cars}")  
  
    bbox_id = tracker.update(cars)  
  
    for bbox in bbox_id:  
        x1, y1, w, h, id = bbox  
        x2, y2 = x1 + w, y1 + h  
        cx, cy = (x1 + x2) // 2, (y1 + y2) // 2  
  
        if id in previous_positions:  
            prev_center, prev_width = previous_positions[id]  
            distance_pixels = np.linalg.norm(np.array((cx, cy)) - np.array(prev_center))  
        if id not in previous_positions:  
            previous_positions[id] = ((cx, cy), frame_count)  
  
        prev_center, prev_frame = previous_positions[id]  
        if frame_count - prev_frame >= 10:  
            width_ratio = width ** 2 / prev_width ** 2 if prev_width else 1  
            corrected_distance = distance_pixels / width_ratio  
            distance_pixels = ((cx - prev_center[0]) ** 2 + (cy - prev_center[1]) ** 2) ** 0.5  
            distance_meters = distance_pixels * scaling_factor  
            time_seconds = (frame_count - prev_frame) / fps  
            speed_mps = distance_meters / time_seconds  
            speed_kmph = speed_mps * 3.6  
            speeds[id] = speed_kmph  
            previous_positions[id] = ((cx, cy), frame_count)  
  
        if id in speeds:  
            # Draw bbox  
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)  
            # Display speed  
            cv2.putText(frame, f"ID: {id} Speed: {speeds[id]:.2f} km/h", (x1, y2 - 10), cv2.FONT_HERSHEY_COMPLEX, 0.5,  
                        (0, 255, 0), 2)  
    cv2.rectangle(frame, (roi_x, roi_y), (roi_x + roi_w, roi_y + roi_h), (255, 0, 0), 2)  # ROI in blue  
    frame_count += 1  
    cv2.imshow("RGB", frame)  
    print("send-data: ", frame)  
  
    if cv2.waitKey(1) & 0xFF == ord('q'):  
        break  
  
cap.release()  
cv2.destroyAllWindows()
```
- **차량이 Detect 되는 경우 아래 메서드에 의해 Kafka Producer 가 차량 데이터를 Smart-Barricade 토픽에 발행한다.**

<br><br>

```python
... 중략

message_producer = producer.MessageProducer(broker, topic)

... 중략

if "car" detected:
	message_producer.send_message(f"message from open cv !! Car Detected: {cars}")
```
- **이후 Topic: Smart-Barricade 를 구독(Listen) 하고 있는 Spring Boot Admin 서버의 Kafka Consumer 가 해당 차량 데이터 메시지를 받게 된다.**

<br><br>

# 3. \[중간 테스트 Workflow] Kafka: Pub/Sub 구조 동작 확인

[Youtube Link](https://youtu.be/YjkumsDYjWU)
1. Spring Boot (Kafka-Consumer) 실행 및 Docker-Compose 를 통한 Kafka 로컬에 띄우기
2. YoloV8 의 객체 탐지 데이터에 기반한 메시지를 발행할 Python server(Kafka-Producer) 로컬에서 실행하기
3. Kafka 의 Publish - Subscribe 구조 작동 확인하기

<br><br>

# 4. \[Spring Boot] 관리용 Admin Web Server 구축
## 4-1. Description
> Smart-Barricade 관리자의 업무 효율성 증대를 위해 제공하는 Admin Web Server.

| **Docs**                | **Name**         | **Version** | **ETC**                |
| ----------------------- | ---------------- | ----------- | ---------------------- |
| **Framework**           | Spring Boot      | 2.7.5       |                        |
| **Template Engine**     | Thymeleaf        | Latest      |                        |
| **Server**              | Tomcat           | Latest      |                        |
| **Database**            | MySQL            | Latest      |                        |
| **Virtualization**      | Docker Desktop   | 4.29.0      | Docker-Compose 2       |
| **Message Queue**       | Apache Kafka     | 2.12-2.5.0  | wurstmeister/kafka     |
| **Distributed Service** | Apache Zookeeper | Latest      | wurstmeister/zookeeper |

<br><br>

## 4-temp AlbumModel

| **AlbumModel** | **Type** | **Description**                       |
| -------------- | -------- | ------------------------------------- |
| **Index**      | Integer  | Kafka 에 발행되는 순서에 맞추어 메시지에 매핑되는 Index. |
| **Message**    | String   | 탐지된 차량의 데이터. Yolo 서버에서 가공             |
| **Danger**     | Boolean  | 탐지된 차량의 위험성을 나타냄. (T / F)             |

<br><br>

## 4-final Youtube 영상 자료

[//]: # ([Youtube 링크]&#40;&#41;)

<br><br>

# 5. \[RTSP Protocol] CCTV 실시간 영상 데이터 스트리밍
![path](/assets/images/INU/CapstoneDesign/adminserver_album.png)

<br><br>

# 6. \[Raspberry Pi] 차량 탐지 데이터에 기반한 바리케이드 작동

<br><br>

# 7. Errors
## 7-1. KeeperErrorCode = NodeExists
어떤 이유에선지 모르겠지만, 위 에러 발생 시에 Kafka Container 에 접속하여 아래 경로의 로그파일들을 전부 지워주면 된다.

```bash
cd /opt/kafka/logs
rm -rf *
```
















<img src="/assets/images/CloudWave/NetWork/.png" alt="_Procdess" width="100%" min-width="200px" itemprop="image"><br>``<br>
`참고:`[Inflearn - 김영한님_강의](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)<br><br>

<span style="color:green">``</span>

{: .notice--danger}
{: style="text-align: center;"}


<details>
<summary><span style="color:blue">(클릭)</span></summary>
<div markdown="1">       

</div>
</details> -->

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