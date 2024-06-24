---
title: "[2024 INU CSE 졸업작품] Smart Barricade: 우회전 교통사고 방지를 위한 전자 방지턱 시스템 (Spring Boot, Thymeleaf, Docker, Kafka, YoloV8, OpenCV)"
categories:
  - INU-Capstone
tags:
  - INU-Capstone
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
  teaser: "/assets/images/INU/CapstoneDesign/adminserver_album.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

![path](/assets/images/INU/CapstoneDesign/smart_barricade1.png)
- 다사다난했던 졸업 작품.. 회사 일이랑 병행한 나, 고생많았다.. 다른 분들은 졸업부터 하고 취업하시기를..(?)
- 이번 포스팅에서는 해당 2024 INU CSE 졸업 프로젝트에서 제가 맡아 진행한 부분을 소개드리려고 합니다.

# 0. 목차
![path](/assets/images/INU/CapstoneDesign/smart_barricade2.png)


## 0-1-1. 주제 선정 배경
![path](/assets/images/INU/CapstoneDesign/smart_barricade3.png)
- 최근 사회에 발생하고 있는 여러 이슈들을 모아 프로그래밍을 통해 해결 할 수 있을지에 대한 브레인 스토밍 진행 결과, 여러 대책 도입 이후에도 꾸준히 발생하며 사회적으로 큰 화두가 된 **"우회전 시 발생하는 교통사고"** 를 프로그래밍적으로 해결해보기로 하였다.

## 0-1-2. 사고 위험 요인
![path](/assets/images/INU/CapstoneDesign/smart_barricade4.png)
- 가장 먼저 "우회전 차로에서 발생하는 교통사고" 의 **원인을 분석** 해보았고, 대부분의 원인은 다음과 같았다.
  1. 우회전 시 운전자 시야에서 사각지대가 발생.
  2. 부적절한 횡단보도 위치
  3. 보행 신호와 차량 신호가 동시 등화되도록 설계.
- 이에 우리는 각각의 기존 설계를 변경할 필요없이 해당 문제를 해결하기 위해 "Smart Barricade" 라는 이름의 우회전 사고 방지 시스템 이번 프로젝트로서 설계하게 되었다.


## 0-2. 기능
![path](/assets/images/INU/CapstoneDesign/smart_barricade5.png)
- Smart Barricade 의 기능은 다음과 같다.
  - **객체 탐지**
    - Yolo v8 모델을 통한 실시간 차량 탐지
    - Admin Server 및 Barricade(Motor) 에 데이터 제공
  - **속도 측정**
    - Tracker 등을 활용하여 초당 프레임 (FPS) 별 객체가 픽셀 단위로 움직인 거리를 실제 거리로 환산하여 해당 객체의 속도를 계산.
  - **위험성 모니터링**
    - Smart Barricade 서비스의 운영 및 관리를 용이하게 하여 관리자의 업무 효율성을 증대할 수 있도록 각 객체 탐지 서비스의 실시간 모니터링 기능을 Admin Server 를 구축하여 제공함.
      - 우회전 지점 진입 30m 이내의 과속 차량 실시간 이미지 저장 & 노출 및 관련 상세 데이터 제공
  - **바리케이드 작동**
    - 실시간 차량 탐지 서비스에 기반하여 사고 발생 위험성이 높다고 판단되면 해당 우회전 차로에 설치된 Smart Barricade 가 작동한다.
    - **Smart Barricade 는 차종과 속도에 따라 높이를 조절하는 전자 방지턱이라 볼 수 있다.**


## 0-3. Flow Chart
![path](/assets/images/INU/CapstoneDesign/smart_barricade6.png)
- Smart Barricade 시스템의 대략적인 흐름은 위와 같다.


![path](/assets/images/INU/CapstoneDesign/smart_barricade7.png)
`구현하며 직접 그려본 흐름도`
- 이번 프로젝트에서 내가 맡아 구현한 부분은 다음과 같다.
  - **Yolo v8 모델을 사용한 Python 기반의 실시간 객체 탐지 서버 구축**
  - **Spring Boot 기반의 Admin Monitoring Server 구축**
  - **두 서버간의 실시간 데이터 교환을 위한 Apache Kafka Message Queue 구축**
  - **데이터의 저장 및 사용을 위한 Database 설계 및 AWS S3 Storage 연동**
  - **실시간 위험 상황 공유를 위한 Slack WebHook API 연동**

## 0-4. Smart Barricade 프로젝트에서 사용한 기술 스택

| Category                               | Technologies            |
| -------------------------------------- | ----------------------- |
| **Backend Framework**                  | Spring Boot, Spring JPA |
| **ORM Framework**                      | Spring Data JPA         |
| **Messaging**                          | Apache Kafka            |
| **Distributed Coordination**           | Apache Zookeeper        |
| **Frontend Framework**                 | Thymeleaf, JQuery       |
| **Database Management**                | MySQL                   |
| **Containerization**                   | Docker                  |
| **Version Control**                    | Github Organization     |
| **Communication**                      | Slack                   |
| **Machine Learning / Computer Vision** | Yolo v8, OpenCV         |

# 1. Yolo v8 모델을 사용한 Python 기반의 실시간 객체 탐지 서버 구축
## 1-1. 서버 초기화 메서드: \_\_init__(self)
```python
from ultralytics import YOLO

def __init__(self):  
    # YOLO 모델을 정의  
    self.model = YOLO('../model/yolov8n.pt')  
  
    # Streaming Data 정의  
    video_mode = int(  
        input(  
            "Default: .mp4\n"  
            "1: iPhone\n"  
            "2: CCTV\n"  
            "[Select your Mode]: "        
        )  
    )  
    if video_mode == 1:  
        # VideoCapture(0) : 웹 캠 사용 - Iphone Mac 원격 연결  
        # VideoCapture(1) : 외부 카메라 사용 - Iphone Mac Local 연결 (C Type)
        try:  
            self.cap = cv2.VideoCapture(1)  
        except ():  
            self.cap = cv2.VideoCapture(0)  
    elif video_mode == 2:  
        self.cap = cv2.VideoCapture(f'rtsp://{CCTV_ID}:{CCTV_PASSWORD}@{CCTV_HOST_IP}:{CCTV_PORT}/{CCTV_STREAM_SOURCE}')  
    else:  
        self.cap = cv2.VideoCapture('../../DataSet/testCase2.mp4')  
    self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  
    self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)  
    self.fps = self.cap.get(cv2.CAP_PROP_FPS)  
  
    # Data Set 정의  
    self.class_list = Path('../../DataSet/coco.txt').read_text().split('\n')  
  
    # 관심 영역 (ROI 정의)  
    # Default: 75, 75, 1000, 700    # RC Car: 275, 350, 1000, 600    self.roi_x, self.roi_y, self.roi_w, self.roi_h = 75, 75, 1000, 700  
  
    # 트래커를 초기화하고, 이전 프레임에서의 위치 및 속도를 저장하기 위한 딕셔너리를 정의  
    self.tracker = Tracker()  
    self.previous_positions = {}  
    self.previous_widths = {}  
    self.speeds = {}  
    self.type = {}  
    self.frame_count = 0  
    # self.scaling_factor = 0.02  
    self.scaling_factor = 0.03  
  
    # Kafka  
    # 브로커와 토픽명을 지정한다.  
    self.broker = 'localhost:9092'  
    self.topic = 'Smart-Barricade'  
    self.message_producer = code.Server.producer.MessageProducer(self.broker, self.topic)
```
`전체 소스: __init__(self)`

### 1-1-1. 영상 데이터 스트리밍 소스 정의
```python
from ultralytics import YOLO

def __init__(self):
	self.model = YOLO('../model/yolov8n.pt')
```
- 학습된 Yolo v8모델을 ultralytics(`from ultralytics import YOLO` ) 라이브러리를 통해 세팅한다.

```python
import cv2

def __init__(self):

	(...)

	# Streaming Data 정의  
    video_mode = int(  
        input(  
            "Default: .mp4\n"  
            "1: iPhone\n"  
            "2: CCTV\n"  
            "[Select your Mode]: "        
        )  
    )  
    if video_mode == 1:  
        # VideoCapture(0) : 웹 캠 사용 - Iphone Mac 원격 연결  
        # VideoCapture(1) : 외부 카메라 사용 - Iphone Mac Local 연결 (C Type)
        try:  
            self.cap = cv2.VideoCapture(1)  
        except ():  
            self.cap = cv2.VideoCapture(0)  
    elif video_mode == 2:  
        self.cap = cv2.VideoCapture(f'rtsp://{CCTV_ID}:{CCTV_PASSWORD}@{CCTV_HOST_IP}:{CCTV_PORT}/{CCTV_STREAM_SOURCE}')  
    else:  
        self.cap = cv2.VideoCapture('../../DataSet/testCase2.mp4')  
    self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  
    self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)  
    self.fps = self.cap.get(cv2.CAP_PROP_FPS)  
```
- **OpenCV** 라이브러리를 Import 하여 **Streaming Data 를 원하는 소스 별로 받을 수 있도록 한다.**
  - **VideoCapture(0):** 로컬 PC 의 웹캠을 사용한 실시간 영상 데이터를 받는다. Apple System 연동으로 Iphone 의 카메라를 MacBook 의 웹캠으로 사용할 수 있다.
  - **VideoCapture(1):** 외부 연동 웹캠을 사용한다. 로컬 PC 에 Iphone 등의 카메라 소스를 케이블 등으로 연결하여 실시간 영상 데이터를 가져온다.
  - **VideoCapture(f'rtsp:// ~ '):** 구매한 CCTV 에서 제공하는 rtsp 프로토콜 및 계정 인증을 통해 해당 CCTV 의 실시간 영상 데이터를 가져온다.
  - **VideoCapture(' ~ .mp4'):** 로컬 PC 에 저장된 영상 데이터를 가져온다.
- 영상 데이터 소스를 정한 후, 해당 영상의 크기를 640 x 480 해상도로 변환하고 FPS(Frame Per Seconds) 를 정의한다.

### 1-1-2. DataSet, ROI, 객체의 속도 측정을 위한 Tracker 정의
```python
from pathlib import Path
from tracker import Tracker

def __init__(self):

	(...)

	# Data Set 정의  
	self.class_list = Path('../../DataSet/class.txt').read_text().split('\n')  
	  
	# 관심 영역 (ROI 정의)  
	# Default: 75, 75, 1000, 700
	# RC Car: 275, 350, 1000, 600  
	self.roi_x, self.roi_y, self.roi_w, self.roi_h = 75, 75, 1000, 700  
	  
	# 트래커를 초기화하고, 이전 프레임에서의 위치 및 속도를 저장하기 위한 딕셔너리를 정의  
	self.tracker = Tracker()  
	self.previous_positions = {}  
	self.previous_widths = {}  
	self.speeds = {}  
	self.type = {}  
	self.frame_count = 0    
	self.scaling_factor = 0.03
```

```text
// class.txt

person  
bicycle  
car  
motorcycle  
bus  
truck  
traffic light  
stop sign  
cat  
dog
```
- **탐지 대상 객체들의 Key를 텍스트 파일로 정의**하여 사용한다.
- **ROI(Region of Interest: 관심 영역) 를 정의**하여 영상 데이터 내에서 **차량을 주로 탐지할 특정 영역**을 그려준다.
- **탐지된 객체를 프레임 변경 시에 Tracking** 할 수 있는 Tracker 라이브러리를 Import 및 초기화한다.
- **이전 프레임에서의 위치 및 속도를 저장하기 위한 딕셔너리를 정의**한다.
  - 트래커와 이전 위치, 너비, 속도 및 객체 유형을 저장할 딕셔너리 초기화.
  - 프레임 수와 속도 계산을 위한 스케일링 팩터 설정.

### 1-1-3. Kafka Message Queue 사용을 위한 Producer 설정
```python
import code.Server.producer as kp

def __init__(self):

	(...)
	
	# Kafka  
	# 브로커와 토픽명을 지정한다.  
	self.broker = f'{KAFKA_BROKER_IP}:{KAFKA_BROKER_PORT}'
	self.topic = 'Smart-Barricade'
	self.message_producer = kp.MessageProducer(self.broker, self.topic)
```

```python
# code.Server.producer.py

from kafka import KafkaProducer  
import json  
  
class MessageProducer:  
    broker = ""  
    topic = ""  
    producer = None  
  
    def __init__(self, broker, topic):  
        self.broker = broker  
        self.topic = topic  
        self.producer = KafkaProducer(bootstrap_servers=self.broker,  
                                      value_serializer=lambda x: json.dumps(x).encode('utf-8'),  
                                      acks=0,  
                                      api_version=(2,5,0),  
                                      retries=3  
                                      )  
  
    def send_message(self, msg):  
        try:  
            future = self.producer.send(self.topic, msg)  
            print(f"Topic: {self.topic} Send Data: {msg}")  
            self.producer.flush()   # 비우는 작업  
            future.get(timeout=60)  
            return {'status_code': 200, 'error': None}  
        except Exception as e:  
            print("error:::::",e)  
            return e
```
- Apache Kafka Library 를  import 하여 Kafka Producer 정의 및 초기화 한다.
  - Kafka Broker 정의
  - Kafka Topic 정의

## 1-2. Smart-Barricade 시스템의 메인 실행 메서드: run()
```python
def run(self):  
    # MotorClient 인스턴스 생성  
    motor_client = mc.MotorClient()  
  
    # 스트리밍 시작  
    while True:  
        start = datetime.datetime.now()  
        ret, frame = self.cap.read()  
        if not ret:  
            print('Cam Error')  
            break  
  
        frame = cv2.resize(frame, (1280, 720))  
        roi_frame = frame[  
                        self.roi_y:self.roi_y + self.roi_h,  
                        self.roi_x:self.roi_x + self.roi_w  
                    ]  
        results = self.model.predict(roi_frame)  
        a = results[0].boxes.data.cpu()  
        px = pd.DataFrame(a).astype("float")  
        cars = []  
  
        for index, row in px.iterrows():  
            obj_type = self.class_list[int(row[5])]  
            if 'person' in obj_type:  
                # 사람 발견 시 최대 각도로 바리케이드 작동.  
                motor_client.send_data_to_motor(100, f'{obj_type}')  
  
            if obj_type in ['car', 'bus', 'truck']:  
                x1, y1, x2, y2 = int(row[0]), int(row[1]), int(row[2]), int(row[3])  
                width = x2 - x1  
                height = y2 - y1  
  
                x1 += self.roi_x  
                y1 += self.roi_y  
                x2 += self.roi_x  
                y2 += self.roi_y  
  
                # x, y, width, height, 만을 트래커에 전달  
                cars.append([x1, y1, width, height])  
  
        # 트래커를 업데이트 하여 탐지된 객체의 속도 측정  
        bbox_id = self.tracker.update(cars)  
        for bbox in bbox_id:  
            x1, y1, w, h, id = bbox  
            x2, y2 = x1 + w, y1 + h  
            cx, cy = (x1 + x2) // 2, (y1 + y2) // 2  
  
            if id in self.previous_positions:  
                prev_center, prev_width = self.previous_positions[id]  
                distance_pixels = np.linalg.norm(np.array((cx, cy)) - np.array(prev_center))  
            if id not in self.previous_positions:  
                self.previous_positions[id] = ((cx, cy), self.frame_count)  
  
            prev_center, prev_frame = self.previous_positions[id]  
            if self.frame_count - prev_frame >= 10:  
                speed_kmph = self.calculate_speed(cx, cy, prev_center, prev_frame)  
                self.speeds[id] = speed_kmph  
                self.previous_positions[id] = ((cx, cy), self.frame_count)  
  
            if id in self.speeds:  
                motor_client.send_data_to_motor(self.speeds[id], obj_type)  
  
                uploaded_url = ''  
                if self.speeds[id] > 30:  
                    # 탐지된 객체 이미지 local 저장  
                    image_name_local = f"../../../assets/detectedImages/detected_object_{id}.jpg"  
                    self.save_detected_object_image(frame, x1, y1, x2, y2, image_name_local)  
  
                    image_name = f"smart_barricade_detected_objects/detected_object_{id}.jpg"  
                    # local 저장된 이미지를 S3에 업로드  
                    uploaded_url = aws.upload_to_aws(image_name_local, image_name)  
  
                # Draw bbox  
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)  
  
                # Display speed  
                cv2.putText(  
                    frame,  
                    f"ID: {id} Speed: {self.speeds[id]:.2f} km/h",  
                    (x1, y2 - 10), cv2.FONT_HERSHEY_COMPLEX,  
                    0.5,  
                    (0, 255, 0),  
                    2  
                )  
  
                # [Kafka Message 발행] Topic: Smart-Barricade  
                current_time = datetime.datetime.now()  
                kafka_json_data = {  
                    "id": str(id),  
                    "type": obj_type,  
                    "speed": f"{self.speeds[id]:.2f}",  
                    "uploaded_url": uploaded_url,  
                    "pub_dt": current_time.strftime('%Y-%m-%d %H:%M:%S')  
                }  
                self.message_producer.send_message(kafka_json_data)  
                print("Data Sent to Admin-Server: ", kafka_json_data)  
  
        cv2.rectangle(  
            frame,  
            (self.roi_x, self.roi_y),  
            (self.roi_x + self.roi_w, self.roi_y + self.roi_h),  
            (255, 0, 0),  
            2  
        )  
  
        self.frame_count += 1  
        cv2.imshow("RGB", frame)  
  
        if cv2.waitKey(1) == ord('q'):  
            break  
  
    self.cap.release()  
    cv2.destroyAllWindows()
```
`전체 소스: Smart-Barricade 의 객체 탐지 메서드`

### 1-2-1. MotorClient 인스턴스 생성

```python
import code.smart_barricade.client.motor as mc

motor_client = mc.MotorClient()
```

```python
# code.smart_barricade.client.motor.py
import socket  
  
class MotorClient:  
  
    def __init__(self):  
        # 서버의 IP 주소와 포트 번호  
        self.server_ip = f'{RASPBERRYPI_IP}'  
        self.server_port = f'{RASPBERRYPI_PORT}'
  
        # 소켓 설정  
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  
        self.client_socket.connect((self.server_ip, self.server_port))  
  
    def send_data_to_motor(self, speed, car_type):  
        # 전송할 데이터 형식: "속도,차량 유형"  
        data = f"{speed},{car_type}"  
  
        # 데이터 전송  
        self.client_socket.sendall(data.encode())  
  
        # 소켓 닫기  
        self.client_socket.close()
```
- **기능**: 모터 클라이언트를 초기화.
  - **Motor Client: 탐지된 객체의 유형과 속도에 따라 모터를 제어하는 명령을 전송.**

### 1-2-2. 스트리밍 시작
```python
while True: 
	start = datetime.datetime.now() 
	ret, frame = self.cap.read() 
	if not ret: 
		print('Cam Error') 
		break
```
- **기능**: 비디오 스트리밍을 시작하고, 프레임을 읽음.
  - 프레임을 읽는 데 실패 시 오류 메시지를 출력하고 스트리밍을 종료.

### 1-2-3. 프레임 크기 조정 및 관심 영역 추출
```python
frame = cv2.resize(frame, (1280, 720)) 
roi_frame = frame[
	self.roi_y:self.roi_y + self.roi_h, 
	self.roi_x:self.roi_x + self.roi_w
]
```
- **기능**: 프레임 크기를 1280x720으로 조정, 관심 영역(ROI)을 추출.
  - 이는 YOLO 모델의 입력으로 사용됨.

### 1-2-4. 객체 탐지 및 결과 처리
```python
results = self.model.predict(roi_frame)
a = results[0].boxes.data.cpu()
px = pd.DataFrame(a).astype("float")
cars = []
```
- **기능**: **YOLO 모델을 사용하여 관심 영역에서 객체를 탐지**하고, **탐지 결과를 pandas 데이터프레임**으로 변환.

### 1-2-5. 객체 필터링 및 좌표 계산
```python
for index, row in px.iterrows():
    obj_type = self.class_list[int(row[5])]
    if 'person' in obj_type:
        motor_client.send_data_to_motor(100, f'{obj_type}')

    if obj_type in ['car', 'bus', 'truck']:
        x1, y1, x2, y2 = int(row[0]), int(row[1]), int(row[2]), int(row[3])
        width = x2 - x1
        height = y2 - y1

        x1 += self.roi_x
        y1 += self.roi_y
        x2 += self.roi_x
        y2 += self.roi_y

        cars.append([x1, y1, width, height])
```
**기능**:
- 탐지된 객체가 **사람일 경우, 모터 클라이언트에 최대 각도로 신호**를 보냄. (Direct)
- **차량인 경우, 좌표를 계산**하여 `cars` 리스트에 추가.

### 1-2-6. Tracker 업데이트 및 속도 계산
```python
bbox_id = self.tracker.update(cars)
for bbox in bbox_id:
    x1, y1, w, h, id = bbox
    x2, y2 = x1 + w, y1 + h
    cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

    if id in self.previous_positions:
        prev_center, prev_width = self.previous_positions[id]
        distance_pixels = np.linalg.norm(np.array((cx, cy)) - np.array(prev_center))
    if id not in self.previous_positions:
        self.previous_positions[id] = ((cx, cy), self.frame_count)

    prev_center, prev_frame = self.previous_positions[id]
    if self.frame_count - prev_frame >= 10:
        speed_kmph = self.calculate_speed(cx, cy, prev_center, prev_frame)
        self.speeds[id] = speed_kmph
        self.previous_positions[id] = ((cx, cy), self.frame_count)

    if id in self.speeds:
        motor_client.send_data_to_motor(self.speeds[id], obj_type)
```
- **기능**: 트래커를 업데이트하여 **탐지된 차량의 바운딩 박스를 추적.**
  - **객체의 이전 위치와 현재 위치를 비교하여 속도를 계산**.
  - 계산된 속도를 모터 클라이언트에 전송.

```python
# calculate_speed

def calculate_speed(self, cx, cy, prev_center, prev_frame):
	distance_pixels = np.linalg.norm(np.array((cx, cy)) - np.array(prev_center))
	distance_meters = distance_pixels * self.scaling_factor
	time_seconds = (self.frame_count - prev_frame) / self.fps
	speed_mps = distance_meters / time_seconds
	return speed_mps * 3.6
```
- **속도 계산**: 픽셀 단위 거리를 계산 및 미터 단위로 변환.
  - **시간 간격을 고려하여 속도를 계산**하는 메서드.


### 1-2-7. 고속 차량 이미지 저장 및 S3 업로드
```python
uploaded_url = ''
if self.speeds[id] > 30:
    image_name_local = f"../../../assets/detectedImages/detected_object_{id}.jpg"
    self.save_detected_object_image(frame, x1, y1, x2, y2, image_name_local)

    image_name = f"smart_barricade_detected_objects/detected_object_{id}.jpg"
    uploaded_url = aws.upload_to_aws(image_name_local, image_name)
```

```python
# save_detected_object_image

@staticmethod
def save_detected_object_image(frame, x1, y1, x2, y2, image_name):
	detected_object = frame[y1:y2, x1:x2]
	print(image_name)
	cv2.imwrite(image_name, detected_object)

```
- **이미지 저장**: 탐지된 객체 이미지를 추출하여 로컬에 저장하는 정적 메서드.
  - **Boto3 를 통한 AWS S3 이미지 업로드를 위해 로컬에 우선 저장.**

```python
# upload_to_aws

import boto3  
from botocore.exceptions import NoCredentialsError  
import yaml  
  
# AWS Secret 을 담은 YAML 파일 읽기.
with open("secret.yaml", 'r') as file:  
    config = yaml.safe_load(file)  
  
# AWS 자격 증명 및 S3 클라이언트 설정.  
ACCESS_KEY = config['aws']['ACCESS_KEY']  
SECRET_KEY = config['aws']['SECRET_KEY']  
BUCKET_NAME = config['aws']['BUCKET_NAME']  
s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)  
  
def upload_to_aws(local_file, s3_file):  
    try:  
        s3.upload_file(local_file, BUCKET_NAME, s3_file, ExtraArgs={'ContentType': 'image/jpg'})  
        print("Upload Successful")  
  
        # 업로드된 객체의 실제 URL 생성  
        object_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_file}"  
        print("Object URL:", object_url)  

		# 업로드된 객체의 URL 반환
        return object_url
        
    except FileNotFoundError:  
        print("The file was not found")  
        return False  
    except NoCredentialsError:  
        print("Credentials not available")  
        return False
```
- **기능**: **속도가 30 km/h를 초과하는 차량의 이미지를 로컬에 저장한 후, 이를 AWS S3에 업로드.**
  - Kafka Message 에 포함시키기 위해 업로드된 이미지의 URL을 변수에 저장.


### 1-2-8. 바운딩 박스와 속도 표시
```python
cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

cv2.putText(
    frame,
    f"ID: {id} Speed: {self.speeds[id]:.2f} km/h",
    (x1, y2 - 10), cv2.FONT_HERSHEY_COMPLEX,
    0.5,
    (0, 255, 0),
    2
)
```
- **기능**: **탐지된 객체 주위에 바운딩 박스**를 그리며, **객체 ID와 속도를 프레임에 표시.**
  - **`cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)`:**
    - 프레임에 **초록색(0, 255, 0) 바운딩 박스**를 그린다.
  - **`cv2.putText(frame, f"ID: {id} Speed: {self.speeds[id]:.2f} km/h", (x1, y2 - 10), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 255, 0), 2)`:**
    - 바운딩 박스 아래쪽에 **객체 ID와 속도를 초록색 텍스트로 표시.**


### 1-2-9. Kafka 메시지 발행
```python
current_time = datetime.datetime.now()
kafka_json_data = {
    "id": str(id),
    "type": obj_type,
    "speed": f"{self.speeds[id]:.2f}",
    "uploaded_url": uploaded_url,
    "pub_dt": current_time.strftime('%Y-%m-%d %H:%M:%S')
}
self.message_producer.send_message(kafka_json_data)
print("Data Sent to Admin-Server: ", kafka_json_data)
```
- **기능**: 탐지된 객체의 ID, 유형, 속도, 이미지 URL 및 현재 시간을 포함하는 JSON 데이터를 Kafka 토픽에 발행합니다.
  - **`kafka_json_data`:**
    - **JSON 형식의 Kafka Message 를 구성.**
  - **`self.message_producer.send_message(kafka_json_data)`:**
    - Kafka 메시지 프로듀서를 통해 **JSON 데이터를 발행.**

### 1-2-10. ROI 영역 표시
```python
cv2.rectangle(
    frame,
    (self.roi_x, self.roi_y),
    (self.roi_x + self.roi_w, self.roi_y + self.roi_h),
    (255, 0, 0),
    2
)
```
- **기능**: 관심 영역(ROI)을 빨간색(255, 0, 0) 바운딩 박스로 표시.
  - 디버깅 및 시각적 피드백을 위해 프레임 위에 그려짐.

### 1-2-11. 프레임 카운트 증가 및 프레임 표시
```python
self.frame_count += 1
cv2.imshow("RGB", frame)
```
- **기능**: 프레임 카운트를 증가시키고, 현재 프레임을 화면에 노출.
  - **`cv2.imshow("RGB", frame)`:** "RGB" 창에 현재 프레임을 노출.

### 1-2-12. 종료 조건 확인
```python
if cv2.waitKey(1) == ord('q'):
    break
```
- **기능**: 사용자가 'q' 키를 누르면 루프를 종료.

### 1-2-13. 리소스 해제
```python
self.cap.release()
cv2.destroyAllWindows()
```
- **기능**: 사용된 리소스를 해제.
  - `self.cap.release()`: 카메라 캡쳐 객체를 해제.
  - `cv2.destroyAllWindows()`: 모든 OpenCV 창 종료.

## 1-3. 종합 설명: Smart-Barricade 객체 탐지 서버
> - **`run()` 메서드는 카메라에서 프레임을 읽어 YOLO 모델을 통해 차량 및 사람을 탐지하고, 차량의 속도를 계산하며, 특정 조건을 만족하는 객체의 이미지를 AWS 에 저장하고, Kafka를 통해 데이터를 Admin Server 로 전송하는 작업을 반복**합니다.
> - 이 과정에서 **사람이 탐지되거나, 탐지된 차량의 속도가 기준 이상 (30 km/h) 인 경우, 즉시 모터 클라이언트에 신호를 보내 Smart-Barricade 시스템을 제어**하고, 시각적 피드백을 제공하기 위해 프레임위에 바운딩 박스와 탐지된 객체의 ID 및 속도를 표시합니다.
> - 사용자가 'q' 키를 누르면 스트리밍을 종료하고 모든 리소스를 해제합니다.


### \[Reference] 객체 탐지 서버 전체 소스
```python
import datetime  
from pathlib import Path  
  
import cv2  
import pandas as pd  
import numpy as np  
import code.Server.producer  
import code.smart_barricade.aws.awsS3Connect as aws  
import code.smart_barricade.client.motor as mc  
from tracker import Tracker  
from ultralytics import YOLO  
  
# 공지  
"""  
Project: Smart Barricade System  
Author: Seung Min Chae  
Date: 2024-05-23  
  
Description:  
  
    This project is designed to detect and track vehicles using a camera feed.    It utilizes the YOLO model for object detection and calculates the speed    of detected vehicles. The detected data is then sent to a Kafka topic for    further processing with monitoring system of SB Admin-Server.  
  
  
주요 변경 사항  
1. __init__ 메서드:  
    인스턴스 변수 초기화: 클래스의 모든 주요 변수는 이제 __init__ 메서드 내에서 초기화.  
        이를 통해 인스턴스 생성 시 필요한 설정을 쉽게 구성 가능.  
  
2. 인스턴스 변수 사용:  
    self.를 사용하여 인스턴스 변수로 접근.  
        (self.model, self.cap, self.roi_x 등.)  
  
3. 정적 메서드:  
    save_detected_object_image 메서드는 정적 메서드로 정의되어, 클래스의 인스턴스 없이도 호출 가능.  
  
4. 메인 로직:  
    run 메서드 내에서 인스턴스 변수를 사용하여 객체 탐지, 추적 및 속도 계산을 수행.  
  
비효율적인 부분 개선  
    1. 불필요한 계산 제거: calculate_speed 메서드를 분리하여 중복 코드 삭제.  
    2. 파일 읽기 최적화: Path를 사용하여 간결하게 파일을 읽음.  
"""  
  
class CarDetectionByCam:  
    def __init__(self):  
        # YOLO 모델을 정의  
        self.model = YOLO('../model/yolov8n.pt')  
  
        # Streaming Data 정의  
        video_mode = int(  
            input(  
                "Default: .mp4\n"  
                "1: iPhone\n"  
                "2: CCTV\n"  
                "[Select your Mode]: "            )  
        )  
        if video_mode == 1:  
            # VideoCapture(0) : 웹 캠 사용 - Iphone Mac 원격 연결  
            # VideoCapture(1) : 외부 카메라 사용 - Iphone Mac Local 연결 (C Type)            try:  
                self.cap = cv2.VideoCapture(1)  
            except ():  
                self.cap = cv2.VideoCapture(0)  
        elif video_mode == 2:  
            self.cap = cv2.VideoCapture(f'rtsp://admin:{secret}')  
        else:  
            self.cap = cv2.VideoCapture('../../DataSet/testCase2.mp4')  
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)  
        self.fps = self.cap.get(cv2.CAP_PROP_FPS)  
  
        # Data Set 정의  
        self.class_list = Path('../../DataSet/coco.txt').read_text().split('\n')  
  
        # 관심 영역 (ROI 정의)  
        # Default: 75, 75, 1000, 700        # RC Car: 275, 350, 1000, 600        self.roi_x, self.roi_y, self.roi_w, self.roi_h = 75, 75, 1000, 700  
  
        # 트래커를 초기화하고, 이전 프레임에서의 위치 및 속도를 저장하기 위한 딕셔너리를 정의  
        self.tracker = Tracker()  
        self.previous_positions = {}  
        self.previous_widths = {}  
        self.speeds = {}  
        self.type = {}  
        self.frame_count = 0  
        # self.scaling_factor = 0.02  
        self.scaling_factor = 0.03  
  
        # Kafka  
        # 브로커와 토픽명을 지정한다.  
        self.broker = 'localhost:9092'  
        self.topic = 'Smart-Barricade'  
        self.message_producer = code.Server.producer.MessageProducer(self.broker, self.topic)  
  
    def __str__(self):  
        return (  
            f"CarDetectionByCam("  
            f"class_list={self.class_list}, "  
            f"model={self.model}, "  
            f"cap={self.cap}, "  
            f"fps={self.fps}, "  
            f"roi_x={self.roi_x}, roi_y={self.roi_y}, roi_w={self.roi_w}, roi_h={self.roi_h}, "  
            f"tracker={self.tracker}, "  
            f"previous_positions={self.previous_positions}, "  
            f"previous_widths={self.previous_widths}, "  
            f"speeds={self.speeds}, "  
            f"type={self.type}, "  
            f"frame_count={self.frame_count}, "  
            f"scaling_factor={self.scaling_factor}, "  
            f"broker={self.broker}, "  
            f"topic={self.topic}, "  
            f"message_producer={self.message_producer})"  
        )  
  
    # OpenCV를 사용하여 탐지된 객체 이미지 추출 및 로컬에 저장  
    @staticmethod  
    def save_detected_object_image(frame, x1, y1, x2, y2, image_name):  
        detected_object = frame[y1:y2, x1:x2]  
        print(image_name)  
        cv2.imwrite(image_name, detected_object)  
  
    # 속도 계산  
    def calculate_speed(self, cx, cy, prev_center, prev_frame):  
        distance_pixels = np.linalg.norm(np.array((cx, cy)) - np.array(prev_center))  
        distance_meters = distance_pixels * self.scaling_factor  
        time_seconds = (self.frame_count - prev_frame) / self.fps  
        speed_mps = distance_meters / time_seconds  
        return speed_mps * 3.6  
  
    def run(self):  
        # MotorClient 인스턴스 생성  
        motor_client = mc.MotorClient()  
  
        # 스트리밍 시작  
        while True:  
            start = datetime.datetime.now()  
            ret, frame = self.cap.read()  
            if not ret:  
                print('Cam Error')  
                break  
  
            frame = cv2.resize(frame, (1280, 720))  
            roi_frame = frame[  
                            self.roi_y:self.roi_y + self.roi_h,  
                            self.roi_x:self.roi_x + self.roi_w  
                        ]  
            # detection = model(frame)[0]  
            results = self.model.predict(roi_frame)  
            a = results[0].boxes.data.cpu()  
            px = pd.DataFrame(a).astype("float")  
            cars = []  
  
            for index, row in px.iterrows():  
                obj_type = self.class_list[int(row[5])]  
                if 'person' in obj_type:  
                    # 사람 발견 시 최대 각도로 바리케이드 작동.  
                    motor_client.send_data_to_motor(100, f'{obj_type}')  
  
                if obj_type in ['car', 'bus', 'truck']:  
                    x1, y1, x2, y2 = int(row[0]), int(row[1]), int(row[2]), int(row[3])  
                    width = x2 - x1  
                    height = y2 - y1  
  
                    x1 += self.roi_x  
                    y1 += self.roi_y  
                    x2 += self.roi_x  
                    y2 += self.roi_y  
  
                    # x, y, width, height, 만을 트래커에 전달  
                    cars.append([x1, y1, width, height])  
  
            # 트래커를 업데이트 하여 탐지된 객체의 속도 측정  
            bbox_id = self.tracker.update(cars)  
            for bbox in bbox_id:  
                x1, y1, w, h, id = bbox  
                x2, y2 = x1 + w, y1 + h  
                cx, cy = (x1 + x2) // 2, (y1 + y2) // 2  
  
                if id in self.previous_positions:  
                    prev_center, prev_width = self.previous_positions[id]  
                    distance_pixels = np.linalg.norm(np.array((cx, cy)) - np.array(prev_center))  
                if id not in self.previous_positions:  
                    self.previous_positions[id] = ((cx, cy), self.frame_count)  
  
                prev_center, prev_frame = self.previous_positions[id]  
                if self.frame_count - prev_frame >= 10:  
                    speed_kmph = self.calculate_speed(cx, cy, prev_center, prev_frame)  
                    self.speeds[id] = speed_kmph  
                    self.previous_positions[id] = ((cx, cy), self.frame_count)  
  
                if id in self.speeds:  
                    motor_client.send_data_to_motor(self.speeds[id], obj_type)  
  
                    uploaded_url = ''  
                    if self.speeds[id] > 30:  
                        # 탐지된 객체 이미지 local 저장  
                        image_name_local = f"../../../assets/detectedImages/detected_object_{id}.jpg"  
                        self.save_detected_object_image(frame, x1, y1, x2, y2, image_name_local)  
  
                        image_name = f"smart_barricade_detected_objects/detected_object_{id}.jpg"  
                        # local 저장된 이미지를 S3에 업로드  
                        uploaded_url = aws.upload_to_aws(image_name_local, image_name)  
  
                    # Draw bbox  
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)  
  
                    # Display speed  
                    cv2.putText(  
                        frame,  
                        f"ID: {id} Speed: {self.speeds[id]:.2f} km/h",  
                        (x1, y2 - 10), cv2.FONT_HERSHEY_COMPLEX,  
                        0.5,  
                        (0, 255, 0),  
                        2  
                    )  
  
                    # [Kafka Message 발행] Topic: Smart-Barricade  
                    current_time = datetime.datetime.now()  
                    kafka_json_data = {  
                        "id": str(id),  
                        "type": obj_type,  
                        "speed": f"{self.speeds[id]:.2f}",  
                        "uploaded_url": uploaded_url,  
                        "pub_dt": current_time.strftime('%Y-%m-%d %H:%M:%S')  
                    }  
                    self.message_producer.send_message(kafka_json_data)  
                    print("Data Sent to Admin-Server: ", kafka_json_data)  
  
            cv2.rectangle(  
                frame,  
                (self.roi_x, self.roi_y),  
                (self.roi_x + self.roi_w, self.roi_y + self.roi_h),  
                (255, 0, 0),  
                2  
            )  
  
            self.frame_count += 1  
            cv2.imshow("RGB", frame)  
  
            if cv2.waitKey(1) == ord('q'):  
                break  
  
        self.cap.release()  
        cv2.destroyAllWindows()  
  
  
# 객체 생성  
car_detection = CarDetectionByCam()  
  
# 객체 인스턴스 Status 확인용 로깅
print(car_detection)  
  
# 객체 실행  
car_detection.run()
```


# 2. Spring Boot 기반의 Admin Monitoring Server 구축

> **System Specification**

| **Docs**                | **Name**         | **Version** | **ETC**                |     |
| ----------------------- | ---------------- | ----------- | ---------------------- | --- |
| **Framework**           | Spring Boot      | 2.7.5       |                        |     |
| **Template Engine**     | Thymeleaf        | Latest      |                        |     |
| **Server**              | Tomcat           | Latest      |                        |     |
| **Database**            | MySQL            | Latest      |                        |     |
| **Virtualization**      | Docker Desktop   | 4.29.0      | Docker-Compose 2       |     |
| **Message Queue**       | Apache Kafka     | 2.12-2.5.0  | wurstmeister/kafka     |     |
| **Distributed Service** | Apache Zookeeper | Latest      | wurstmeister/zookeeper |     |


## 2-1. Spring Boot Project Dependency 목록
```java
dependencies {  
    // spring boot base resources  
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'  
    implementation 'org.springframework.boot:spring-boot-starter-web'  
    implementation 'org.springframework.boot:spring-boot-starter-web-services'  
  
    // kafka & zookeeper with docker-compose  
    implementation 'org.springframework.kafka:spring-kafka'  
    implementation 'org.apache.kafka:kafka-streams'  
	implementation 'org.springframework.cloud:spring-cloud-starter-zookeeper-config'  
    developmentOnly 'org.springframework.boot:spring-boot-docker-compose'  
  
    // json  
    implementation group: 'com.googlecode.json-simple', name: 'json-simple', version: '1.1.1'  
  
    // lombok  
    compileOnly 'org.projectlombok:lombok'  
    annotationProcessor 'org.projectlombok:lombok'  
  
    // Database  
    runtimeOnly 'com.mysql:mysql-connector-j'  
    implementation 'org.springframework.boot:spring-boot-starter-data-jdbc'  
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'  
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'    
  
    // Slack Web Hook 을 위한 라이브러리 추가 https://mvnrepository.com/artifact/com.slack.api/slack-api-client
    implementation group: 'com.slack.api', name: 'slack-api-client', version: '1.39.2'  
  
    // tests  
    testImplementation 'org.springframework.boot:spring-boot-starter-test'  
    testImplementation 'org.springframework.kafka:spring-kafka-test'  
}
```


## 2-2. docker-compose.yml 작성
```yml
version: '3'  

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
  
  db:  
    image: mysql:8.0  
    container_name: sb-db  
    restart: always  
    ports:  
      - '3306:3306'  
    environment:  
      MYSQL_DATABASE: smart_barricade  
      MYSQL_ROOT_PASSWORD: (PASSWORD)
      TZ: Asia/Seoul  
#    volumes:  
#      - ./db/mysql/data:/var/lib/mysql  
#      - ./db/mysql/init:/docker-entrypoint-initdb.d  
#    platform: linux/x86_64
```
- Project Root 에 저장.

## 2-3. application.properties 설정
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
  - zookeeper 가 없더라도 실행가능토록 하는 옵션.
- **Kafka Config**
  - Kafka 서버와 연결할 호스트와 포트 정보.
  - 만약 producer와 consumer가 다른 서버에 있다면 spring.kafka.consumer(producer).bootstrap-servers으로 설정.
    - 이 경우 글로벌 Config 는 무시되며 (spring.kafka.bootstrap-servers), consumer 전용으로 오버라이딩 됨.
  - 현 프로젝트에서는 파이썬으로 동작하는 Yolo 서버와 Spring Boot 간의 통신이지만 둘 다 local 에 뜨므로 localhost 로 진행.
- **Kafka Consumer**
  - Spring Boot Admin 서버는 Consumer 역할을 하므로 Deserializer 사용

## 2-4. \[Admin Server 메인 서비스] Kafka Consumer: Album Service
```java  
@Slf4j  
@Service  
@EnableScheduling  
@ConfigurationProperties(prefix = "custom.admin.album.data")  
public class AlbumService {  
  
    @Value("spring.kafka.bootstrap-servers")  
    private String BOOTSTRAP_SERVERS;  
  
    private final Integer MAX_DETECT_DATA = 20;  
  
    private final String SLACK_ALERT_TITLE = "[DANGER] Over Speed Vehicle Detected: ";  
  
    @Getter  
    private final AtomicInteger countOverSpeedDetected = new AtomicInteger(0);  
  
    @Autowired  
    private ValidationService validationService;  
  
    @Autowired  
    private SlackService slackService;  
  
    @Autowired  
    private DetectRepository detectRepository;  
  
    private final Map<String, AlbumModel> cachedKafkaDataMap = new TreeMap<>();  
  
  
    @Transactional  
    @Description("카프카 토픽에 메시지가 발행될 때마다 받아오는 데이터를 로컬 캐싱한다.")  
    @KafkaListener(topics = "Smart-Barricade", groupId = "sb")  
    public void cachingFromKafka(String message) {  
  
        System.out.println("[Get From YoloV8]: " + message);  
  
        // JSON 문자열을 Java Map 객체로 변환  
        ObjectMapper objectMapper = new ObjectMapper();  
  
        try {  
            if (cachedKafkaDataMap.size() > MAX_DETECT_DATA) {  
                cachedKafkaDataMap.clear();  
            }  
  
            HashMap<String, String> kafkaJsonData = objectMapper.readValue(message, HashMap.class);  
  
            // 변환된 객체 사용  
            String detectedId = kafkaJsonData.get("id");  
            String detectedSpeed = kafkaJsonData.get("speed");  
            int speed = Integer.parseInt(detectedSpeed);
  
            // 속도 유효성 검증  
            boolean overSpeed = validationService.isOverSpeed(speed);  
  
            // 차량 우회전 구간 정지 여부 - 추후 경고등 옵션 추가?  
            boolean stoppedBeforeEnter = validationService.isStoppedBeforeEnter(speed);  
  
            AlbumModel albumModel = new AlbumModel(  
                    Long.parseLong(detectedId),  
                    kafkaJsonData.get("type"),  
                    speed,  
                    overSpeed,  
                    message,  
                    kafkaJsonData.get("uploaded_url"),  
                    kafkaJsonData.get("pub_dt")  
            );  
  
            // 과속 차량 Data 는 DB 에 따로 저장.  
            if (overSpeed) {  
                detectRepository.save(albumModel);  
                slackService.sendMessage(SLACK_ALERT_TITLE, kafkaJsonData);  
                log.info("[DB Saved: " + albumModel.getId() + "] 과속 차량 확인");  
            }  
  
            cachedKafkaDataMap.put(detectedId, albumModel);  
        } catch (IOException e) {  
            log.error("[Kafka Error] ::: 캐싱 실패" + e.getMessage());  
        }  
    }  
  
    // Kafka consumer configuration  
    @Bean  
    public Map<String, Object> consumerConfigs() {  
        Map<String, Object> props = new HashMap<>();  
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);  
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);  
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);  
        props.put(JsonDeserializer.TRUSTED_PACKAGES, "*");  
        return props;  
    }  
  
    public Long getCountOverSpeedDetectedByHour() {  
        return detectRepository.count();  
    }  
  
    public List<AlbumModel> getAllOverSpeed() {  
        return detectRepository.findAll();  
    }  
  
    public Map<String, AlbumModel> getCachedAlbumDataFromKafka() {  
        return cachedKafkaDataMap;  
    }  
  
    public void resetCacheAlbumData() {  
        cachedKafkaDataMap.clear();  
    }  
  
    @Scheduled(cron = "0 0 * * * *") // 매 시 정각에 실행 되도록 cron 설정  
    public void resetCountOverSpeedDetectedByHour() {  
        // [Canvas JS] 매시 정각에 누적 과속 차량 데이터 초기화  
        countOverSpeedDetected.set(0);  
    }  
}
```
- **주요 목적**
  - **객체 탐지 서버의 Kafka Producer 로부터 과속 차량 데이터를 수신하고, 이를 캐싱하여 로컬 저장소에 저장.**
  - 3초 주기의 API 호출을 통해 **저장된 캐싱 데이터를 유저뷰 (Client) 에서 사용하여 모니터링 기능 제공.**
  - 수신한 Kafka Message 를 읽어 **과속 차량이 탐지된 경우 관리자에게 슬랙 알림을 전송.**
    - 객체 탐지 서버에서 이미 각 루프당 많은 호출을 하고 있기에, **실질적 우회전 교통사고 예방 장치인 모터 구동보다 비교적 중요성이 낮은 알림 전송을 Admin Server 에서 처리하도록 함.**


### 2-4-1. 필드 정의
```java
@Value("spring.kafka.bootstrap-servers")
private String BOOTSTRAP_SERVERS;

private final Integer MAX_DETECT_DATA = 20;
private final String SLACK_ALERT_TITLE = "[DANGER] Over Speed Vehicle Detected: ";

@Getter
private final AtomicInteger countOverSpeedDetected = new AtomicInteger(0);
```
- **`BOOTSTRAP_SERVERS`:** Kafka 브로커 주소를 저장.
- **`MAX_DETECT_DATA`:** 캐시할 최대 데이터 수를 설정. (User View Pagination 위함)
- **`SLACK_ALERT_TITLE`:** 슬랙 알림 메시지의 제목.
- **`countOverSpeedDetected`:** 과속 탐지된 차량 수를 AtomicCounter 로 관리.

### 2-4-2. 의존성 주입
```java
@Autowired
private ValidationService validationService;

@Autowired
private SlackService slackService;

@Autowired
private DetectRepository detectRepository;
```
- **`ValidationService`:** 속도 유효성 검증을 담당하는 서비스.
- **`SlackService`:** 슬랙으로 메시지를 전송하는 서비스.
- **`DetectRepository`:** Database 와의 상호작용을 담당하는 JPA 리포지토리.

### 2-4-3. Kafka 메시지 수신 및 캐싱
```java
@Transactional
@Description("카프카 토픽에 메시지가 발행될 때마다 받아오는 데이터를 로컬 캐싱한다.")
@KafkaListener(topics = "Smart-Barricade", groupId = "sb")
public void cachingFromKafka(String message) {
    // 메시지 로깅
    System.out.println("[Get From YoloV8]: " + message);

    ObjectMapper objectMapper = new ObjectMapper();
    try {
        if (cachedKafkaDataMap.size() > MAX_DETECT_DATA) {
            cachedKafkaDataMap.clear();
        }

        HashMap<String, String> kafkaJsonData = objectMapper.readValue(message, HashMap.class);

        String detectedId = kafkaJsonData.get("id");
        String detectedSpeed = kafkaJsonData.get("speed");
        int speed = Integer.parseInt(detectedSpeed);

        boolean overSpeed = validationService.isOverSpeed(speed);
        boolean stoppedBeforeEnter = validationService.isStoppedBeforeEnter(speed);

        AlbumModel albumModel = new AlbumModel(
            Long.parseLong(detectedId),
            kafkaJsonData.get("type"),
            speed,
            overSpeed,
            message,
            kafkaJsonData.get("uploaded_url"),
            kafkaJsonData.get("pub_dt")
        );

        if (overSpeed) {
            detectRepository.save(albumModel);
            slackService.sendMessage(SLACK_ALERT_TITLE, kafkaJsonData);
            log.info("[DB Saved: " + albumModel.getId() + "] 과속 차량 확인");
        }

        cachedKafkaDataMap.put(detectedId, albumModel);
    } catch (IOException e) {
        log.error("[Kafka Error] ::: 캐싱 실패" + e.getMessage());
    }
}
```
1. **Kafka로부터 수신한 메시지를 `ObjectMapper`를 사용하여 JSON 형식으로 변환.**
2. **캐시가 지정된 최대 크기를 초과하면 캐시 초기화.**
3. **변환된 데이터를 검증 (과속 여부 판단) 하고, 과속 차량일 경우 데이터베이스에 저장하고 슬랙 알림을 전송.**
4. **데이터를 캐시에 저장.**

### 2-4-4. Kafka Consumer 설정
```java
@Bean
public Map<String, Object> consumerConfigs() {
    Map<String, Object> props = new HashMap<>();
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BOOTSTRAP_SERVERS);
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
    props.put(JsonDeserializer.TRUSTED_PACKAGES, "*");
    return props;
}
```
- **Kafka Consumer 설정을 정의.**
  - 부트스트랩 서버 정의 및 직렬화 설정.

### 2-4-5. DB 접근 메서드
```java
public Long getCountOverSpeedDetectedByHour() {
    return detectRepository.count();
}

public List<AlbumModel> getAllOverSpeed() {
    return detectRepository.findAll();
}

public Map<String, AlbumModel> getCachedAlbumDataFromKafka() {
    return cachedKafkaDataMap;
}

public void resetCacheAlbumData() {
    cachedKafkaDataMap.clear();
}
```
- 과속 차량 탐지 횟수를 반환
- 모든 과속 차량 데이터를 반환
- 캐시된 데이터를 반환 / 초기화.

### 2-4-6. AlbumService 기능 정리
- **Kafka 메시지 수신 및 처리**: Kafka 토픽 (Smart-Barricade) 으로부터 실시간으로 메시지를 수신하여, 이를 JSON 형식으로 변환하고 검증하여 로컬 캐시와 데이터베이스에 저장합니다.
  - KafkaListener 어노테이션을 통해 구독할 Topic 과 자신(Consumer)의 그룹을 정의.
  - **구독하고 있는 Topic 에 메시지가 발행되면, KafkaListener 어노테이션이 정의된 handleMessage() 메서드에 의해 해당 메시지를 가져와 소비.**
- **슬랙 알림**: 과속 차량이 탐지되면, 이를 관리자 전용 슬랙으로 알림을 전송하여 즉각적인 조치를 취할 수 있도록 합니다.
- **데이터베이스 연동**: 검증된 과속 차량 데이터를 데이터베이스에 저장하고, User View 에서 API 를 통해 조회할 수 있도록 합니다.
- **캐시 관리**: 최대 데이터 수를 초과하지 않도록 캐시를 관리하고, 필요시 캐시를 초기화 할 수 있는 기능을 제공합니다.
- **정기적인 초기화 작업**: 누적된 과속 차량 탐지 데이터를 스케줄링된 메서드에 의해 매 시간마다 초기화하여, 새로운 데이터를 처리할 준비를 합니다.


### \[Reference] Kafka 기존 Topic 제거하는 방법
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

## 2-5. \[Admin Server DB 접근 방식] Spring Data JPA
### 2-5-1. Spring Data JPA 소개 및 사용하게된 이유
> - Spring Data JPA는 Spring Framework에서 제공하는 모듈로, Java Persistence API(JPA)를 사용하여 데이터베이스와 상호작용할 수 있는 간편한 방법을 제공.
> - 이는 데이터 접근 계층을 쉽게 만들고 유지보수하기 쉽게 설계되어 있으며, JPA 기반의 애플리케이션 개발을 단순화 하는데 도움을 줌.

- **Spring Data JPA 를 사용한 이유:**
  1. **레포지토리 지원**: 기본적인 CRUD (Create, Read, Update, Delete) 작업을 쉽게 처리할 수 있도록 `CrudRepository`, `JpaRepository` 등의 인터페이스를 제공.
  2. **쿼리 메소드**: 메소드 이름을 기반으로 자동으로 SQL 쿼리를 생성하는 기능을 제공.
    - 예를 들어, `findByLastName(String lastName)`이라는 메소드를 정의하면, 자동으로 `lastName`으로 검색하는 쿼리가 생성됨.
  3. **@Query 어노테이션**: 복잡한 쿼리가 필요한 경우, 메소드에 직접 JPQL (Java Persistence Query Language)이나 네이티브 SQL을 작성하여 Custom 하게 사용 가능.
  4. **페이징 및 정렬 지원**: 대량의 데이터를 효율적으로 처리하기 위해 페이징과 정렬 기능을 제공.
  5. **Auditing**: 엔티티의 생성 및 수정 시각을 자동으로 기록하는 등의 감사 기능을 제공.

### 2-5-1. Entity: AlbumModel
```java
import jakarta.persistence.Column;  
import jakarta.persistence.Entity;  
import jakarta.persistence.Id;  
import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;  
  
@Data  
@Entity  
@NoArgsConstructor  
@AllArgsConstructor  
public class AlbumModel {  
  
    @Id  
    @Column(name = "id")  
    private Long id;  
  
    @Column(name = "type")  
    private String type;  
  
    @Column(name = "speed")  
    private Integer speed;  
  
    @Column(name = "is_danger")  
    private Boolean danger;  
  
    @Column(name = "message")  
    private String message;  
  
    @Column(name = "uploaded_url")  
    private String uploaded_url;  
  
    @Column(name = "pub_dt")  
    private String pub_dt;  
}
```
- Kafka 메시지에 담겨오는 JSON 형식의 객체 탐지 결과 기반 Entity 사용.

```java
(...)

AlbumModel albumModel = new AlbumModel(  
        Long.parseLong(detectedId),  
        kafkaJsonData.get("type"),  
        speed,  
        overSpeed,  
        message,  
        kafkaJsonData.get("uploaded_url"),  
        kafkaJsonData.get("pub_dt")  
);

(...)
```

![path](/assets/images/INU/CapstoneDesign/smart_barricade8.png)
`Entity: AlbumModel 및 DB 적재 상태`
- DB 구조가 워낙 단순하기에 따로 설명은 추가하지 않도록 하겠습니다.


## 2-6. \[Admin Server View] Index Page

> **소스가 너무 길고 많으므로 jQuery 를 사용한 주요 스크립트 위주로 설명합니다.**

### 2-6-1. \[Index Page] 주요 스크립트
```javascript 
<script th:inline="javascript">
  var existingCardIds = new Set();

  function generateOverSpeedCardElementsFromAwsS3(images) {
    const parentElement = document.getElementById("displayOverSpeedersFromAws");

    $.each(images, function (index, item) {
      if (existingCardIds.has(item.id)) {
        return;
      }

      const card = document.createElement("div");
      card.classList.add("col");

      var imageUrl = item.uploaded_url;
      const cardId = `card-${item.id}`;
      const jsonViewId = `json-card-view-${item.id}`;

      card.innerHTML = `
        <div class="card shadow-sm" id="${cardId}">
            <img class="uploaded-image card-img-top" src="${imageUrl}" alt="Uploaded Image">
            <div class="card-body">
                <div id="${jsonViewId}" class="hidden"></div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary view-button">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-body-secondary">9 mins</small>
                </div>
            </div>
        </div>
      `;

      existingCardIds.add(item.id);
      parentElement.appendChild(card);

      $(`#${jsonViewId}`).JSONView(item.message, { collapsed: true });

      $('.view-button').click(function(){
        $(`#${jsonViewId}`).toggleClass('hidden');
      });
    });
  }

  $(document).ready(function(){
    $('.view-button').click(function(){
      $('#jsonView1').toggleClass('hidden');
    });
  });

  function getKafkaData() {
    $.ajax({
      url: "/api/album/getAllOverSpeed",
      type: "GET",
      success: function (result) {
        generateOverSpeedCardElementsFromAwsS3(result);
      },
      error: function (e) {
        console.log("Ajax ERROR Occurred!! [getAllOverSpeed]: " + e);
      }
    })
  }

  $(document).ready(
	  function getKafkaData() {
		$.ajax({
		  url: "/api/album/getAllOverSpeed",
		  type: "GET",
		  success: function (result) {
			generateOverSpeedCardElementsFromAwsS3(result);
		  },
		  error: function (e) {
			console.log("Ajax ERROR Occurred!! [getAllOverSpeed]: " + e);
		  }
		})
	  }
  )
  setInterval(getKafkaData, 3000);
</script>
```

### 2-6-2. \[Index Page] 주요 구성 요소
1. **`existingCardIds` 변수**:
  - 이미 생성된 카드의 ID를 추적하는 `Set` 객체.
  - 이 객체를 사용하여 각 차량 별 중복된 카드가 생성되지 않도록 함.
1. **`generateOverSpeedCardElementsFromAwsS3(images)` 함수**:
  - `images` 배열을 받아 각 이미지에 대해 카드를 생성하여 DOM에 추가.
  - 이미 생성된 카드의 ID는 `existingCardIds`에 저장되어, 중복 생성을 방지.
  - 카드 요소는 Bootstrap 클래스를 사용하여 스타일링.
  - 카드에는 이미지와 JSON 데이터를 표시하는 영역, 버튼 등이 포함.
  - JSON 데이터는 `jquery.jsonview` 플러그인을 사용하여 사용자 친화적으로 노출.
2. **`$(document).ready()`**:
  - 문서가 로드되면 `.view-button`을 클릭할 때 JSONView를 토글하는 기능을 설정.
  - `getKafkaData()` 함수를 호출하여 초기 데이터 세팅.
3. **`getKafkaData()` 함수**:
  - Server 측 `/api/album/getAllOverSpeed` API 엔드포인트에 AJAX 요청을 보내 최신화된 과속 차량 데이터를 가져옴.
  - 성공적으로 데이터를 가져오면 `generateOverSpeedCardElementsFromAwsS3(result)`를 호출하여 카드를 생성.
  - 오류가 발생 시 콘솔에 오류 메시지를 출력.
4. **`setInterval(getKafkaData, 3000)`**:
  - `getKafkaData()` 함수를 3초마다 호출하여 주기적으로 새로운 데이터를 추가.

### 2-6-3. \[Index Page] 주요 기능 정리
- **jQuery를 사용하여 카드 형식의 요소를 웹 페이지에 동적으로 노출하는 기능을 제공.**
  1. `ajax` 를 사용하여 DB 에 Upsert (저장 및 갱신) 되고 있는 과속 차량 데이터를 제공하는 API 를 3초 간격으로 호출.
  2. API Response 를 JSON 형태로 변환.
  3. JSON 내 필드 중 하나인 **AWS S3 객체 URL을 사용하여 카드 이미지 노출.**
  4. `jquery.jsonview` 라이브러리를 사용하여 **JSON 데이터를 사용자 친화적으로 노출**.

### 2-6-3 \[Index Page] 유저 뷰 모습
![path](/assets/images/INU/CapstoneDesign/smart_barricade9.png)
- **3초 간격의 API 호출에 의해 과속 차량 데이터가 갱신되며, 각각의 해당 되는 카드요소들이 추가, 업데이트 및 삭제된다.**
- Smart-Barricade 시스템 관리자는 Admin Server Index Page 에서 3초 간격으로 업데이트 되는 실시간 과속 차량 및 해당 데이터를 확인해볼 수 있다.

## 2-7. \[Admin Server View] Detect Page

> **소스가 너무 길고 많으므로 jQuery 를 사용한 주요 스크립트 위주로 설명합니다.**

### 2-7-1. \[Detect Page] 주요 DOM 요소
```html
<body>  
    <div th:replace="~{/common/headers/headers :: headerFragment}"></div>  
    <main>
		<!-- 차트 영역 -->
	    <div class="container">  
            <div id="chartContainer" style="width:100%; height: 400px"></div>
        </div>
		
		<!-- 테이블 영역 -->
        <div class="container">  
            <h1>탐지된 차량 리스트</h1>  
            <a class="btn btn-primary my-2" onclick="reset()">데이터 초기화</a>  
            <table id="data-table" class="table">  
                <thead>  
                    <tr>  
                        <th>순번</th>  
                        <th>차량 정보</th>  
                        <th>차량 속도 (km/h)</th>  
                        <th>위험성</th>  
                        <th>API Response</th>  
                        <th>과속 차량 이미지 파일 경로</th>  
                        <th>탐지 일시</th>  
                    </tr>  
                </thead>  
                <tbody>  
	                <!-- ajax 요청에 의해 추가됨 --> 
                </tbody>            
			</table>  
			
            <p>                
	            <a class="btn btn-primary my-2" href="/album">이전으로</a>  
            </p>  
        </div>  
    </main>
</body>
```
- **실시간으로 탐지된 차량 데이터를 가져와 차트 및 테이블에 표시하는 기능을 제공.**


### 2-7-2. \[Detect Page] 주요 스크립트
```javascript
<script th:inline="javascript">
    function getKafkaData() {
        $.ajax({
            url: "/api/album/detectData",
            type: "GET",
            success: function (result) {
                syncChartData(result);
                displayData(result);
                console.log("getKafkaData:" + result);
            },
            error: function (e) {
                console.log("Ajax ERROR Occurred!! [getKafkaData]: " + e);
            }
        })
    }

    var dps = [];
    function syncChartData() {
        $.ajax({
            url: "/api/album/getOverSpeedCount",
            type: "GET",
            success: function (count) {
                if (dps.length > 10) {
                    dps.shift();
                }
                dps.push(
                    {
                        x: new Date(),
                        y: count
                    }
                );
                chart.render();
            },
        })
    }

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "실시간 모니터링 차트"
        },
        subtitles: [
            {
                text: "For Smart-Barricade",
                fontColor: "#C0C0C0",
                fontStyle: "italic",
                fontSize: 20
            }
        ],
        axisX: {
            title: `현재 시각: ${new Date()}`
        },
        axisY: {
            title: "탐지된 과속 차량 수"
        },
        data:[{
            type: "splineArea",
            dataPoints: dps
        }]
    });
    chart.render();

    function displayData(data) {
        var tableBody = $('#data-table tbody');
        tableBody.empty();

        $.each(data, function(index, item) {
            var row = item.danger ? $('<tr class="table-danger">') : $('<tr class="table-info">');
            $.each(item, function(key, value) {
                switch (key) {
                    case "speed":
                        row.append($('<td>').text(value + " km/h"));
                        break;
                    case "danger":
                        row.append($('<td>').text(value ? "위험" : "정상"));
                        break;
                    default:
                        row.append($('<td>').text(value));
                }
            });
            tableBody.append(row);
        });
    }

    function updateWhenChanged() {
        document.getElementById('showLiveData').reload();
    }

    function reset() {
        $.ajax({
            url: "/api/album/reset",
            type: "GET"
        }).success(function () {
            location.reload();
        });
    }

    function refreshPage() {
        location.reload();
    }
    setInterval(getKafkaData, 3000);
</script>

```

### 2-7-3. \[Detect Page] 주요 구성 요소
1. **`getKafkaData` 함수**:
   - Server 측 `/api/album/detectData` API 엔드포인트에 AJAX 요청을 보내 캐싱된 객체 탐지 데이터를 가져옴.
   - 성공적으로 데이터를 가져오면 `syncChartData(result)`와 `displayData(result)` 함수를 호출하여 차트와 테이블을 업데이트.
   - 오류 발생 시, 콘솔에 오류 메시지를 출력.
2. **`syncChartData` 함수**:
   - Server 측 `/api/album/getOverSpeedCount` API 엔드포인트에 AJAX 요청을 보내 DB 에 접근하여 최신화된 과속 차량 수를 가져옴.
   - `dps` 배열에 새로운 데이터 포인트를 추가하고, 배열 길이가 10을 초과할 시 첫 번째 요소를 제거. (Line 형식으로 구성된 차트 길이 고정)
3. **`CanvasJS.Chart` 객체**:
   - `chartContainer` 요소에 차트를 생성.
   - `animationEnabled`, `theme`, `title`, `subtitles`, `axisX`, `axisY`, `data` 등의 속성을 설정하여 차트를 구성.
   - 데이터 포인트는 `dps` 배열에서 가져옴.
   - `chart.render()`를 호출하여 차트를 초기화.
4. **`displayData` 함수**:
   - API 를 통해 전달받은 데이터를 테이블에 표시하는 기능을 담당.
   - `#data-table tbody` 요소를 가져와 비움.
   - 데이터 항목을 반복하면서 `<tr>` 요소를 생성하고 `<td>` 태그로 데이터를 채움.
   - 각 항목의 속성에 따라 적절한 데이터 형식을 적용.
     - 속도는 "km/h" 단위로 표시.
     - 위험성 여부에 따라 다른 클래스를 적용.
       - `class="table-danger"`
       - `class="table-info"`
5. **`reset` 함수**:
   - Server 측 `/api/album/reset` API 엔드포인트에 AJAX 요청을 보내 데이터를 초기화.
   - 요청이 성공 시, 페이지를 다시 로드하여 초기화된 데이터를 반영.
6. **`setInterval(getKafkaData, 3000)`**:
   - `getKafkaData` 함수를 3초마다 호출하여 주기적으로 데이터를 최신화.


### 2-7-4 \[Detect Page] 주요 기능 정리
- **AJAX를 사용하여 실시간 객체 탐지 데이터를 가져와 차트와 테이블에 표시**하는 기능을 제공.
- **CanvasJS를 사용하여 차트를 렌더링.**
- **jQuery를 사용하여 DOM 요소를 동적으로 업데이트.**
- `setInterval`을 사용하여 **주기적으로 데이터를 업데이트함으로서 실시간 모니터링 시스템을 구현.**


### 2-7-5. \[Detect Page] 유저 뷰 모습
![path](/assets/images/INU/CapstoneDesign/smart_barricade10.png)
- **Server 측에서 캐싱되고 있는 실시간 객체 탐지 데이터를 3초 간격의 API 호출에 의해 최신화하여 사용.**
- 해당 데이터를 기반으로 차트와 테이블을 실시간으로 그려주며, Smart-Barricade 시스템 관리자가 한 눈에 시스템 내 상황을 파악할 수 있도록 함.

# 3. Raspberry Pi 및 Arduino 를 활용한 Barricade
![path](/assets/images/INU/CapstoneDesign/smart_barricade11.png)
- 해당 작업은 제가 진행하지 않은 관계로, 시연 영상으로 대체합니다.


# 4. \[Smart-Barricade] 시연 영상
## 4-1. RC카를 이용한 Smart-Barricade 작동 시연 영상
{% raw %}
<iframe width="560" height="315" src="https://www.youtube.com/embed/tbND3XpsFoI" frameborder="0" allowfullscreen></iframe>
{% endraw %}
[RC카를 이용한 Smart-Barricade 작동 시연 영상](https://youtu.be/tbND3XpsFoI)


## 4-2. 객체 탐지 서버 - 어드민 모니터링 서버 간의 내부 동작 시연 영상
{% raw %}
<iframe width="560" height="315" src="https://www.youtube.com/embed/4NDNVLkg2UI" frameborder="0" allowfullscreen></iframe>
{% endraw %}
[객체 탐지 서버 - 어드민 모니터링 서버 간의 내부 동작 시연 영상](https://youtu.be/4NDNVLkg2UI)


# 5. Errors
## 5-1. KeeperErrorCode = NodeExists
어떤 이유에선지 모르겠지만, 위 에러 발생 시에 Kafka Container 에 접속하여 아래 경로의 로그파일들을 전부 지워주면 된다.

```bash
cd /opt/kafka/logs
rm -rf *
```

# 6.  프로젝트 결과 및 소감
![path](/assets/images/INU/CapstoneDesign/smart_barricade12.png)

지식 공유 및 기록을 위한 캡스톤 디자인 졸업 과제 진행 기록입니다.
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