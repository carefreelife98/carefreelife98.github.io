---
title: "[AWS-SAA] AWS Services"
categories:
  - aws-saa
tags:
  - AWS-SAA
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
   teaser: "/assets/images/aws-saa2.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

<div style="text-align: center;">
  <img src="/assets/images/aws-saa.png" alt="aws-saa_Procdess" width="60%" min-width="200px" itemprop="image"><br>
  <a href="https://www.gcp-examquestions.com/course/aws-certified-solutions-architect-associate-saa-c02-actual-exam/">Teaser 사진 출처 : gcp-examquestions.com</a>
</div>

# AWS Services

- [Q16] `Quick Sight - 데이터 시각화`
AWS 에서 데이터 레이크를 호스팅.
데이터 시각화를 제공 및 데이터 레이크 내의 모든 데이터 소스를 포함하는 보고 솔루션이 필요.
회사의 관리 팀만 모든 시각화에 대한 전체 액세스 권한.
나머지 회사는 제한된 액세스 권한.
    - `Amazon QuickSight` 는 PostgreSQL 용 Amazon S3 및 Amazon RDS 를 비롯한 다양한 데이터 소스에서 대화형 대시보드 및 보고서를 생성할 수 있는 `데이터 시각화 서비스`입니다. 모든 데이터 소스를 연결하고 QuickSight 에서 새 데이터 세트를 만든 다음 대시보드를 게시하여 데이터를 시각화할 수 있습니다. 또한 적절한 사용자 및 그룹과 대시보드를 공유하고 IAM 역할 및 권한을 사용하여 액세스 수준을 제어할 수 있습니다.
        - Amazon QuickSight 에서 분석을 생성.
        - 모든 데이터 소스를 연결하고 새 데이터 세트 생성.
        - 대시보드를 게시하여 데이터를 시각화.
        - 적절한 사용자 및 그룹과 대시보드를 공유.
            - 기본적으로 `Amazon QuickSight 의 대시보드는 누구와도 공유되지 않으며 소유자만 액세스` 가능.
            - `대시보드를 게시한 후`에는 QuickSight 계정의 다른 사용자 또는 그룹과 `공유 가능`.

<br><br>

- [Q19] `Gateway Load Balancer - 가상 어플라이언스(트래픽 검사 시스템 등) 배포, 확장 및 관리 가능`
AWS 에 배포된 3 계층 웹 애플리케이션.
웹 서버는 VPC 의 퍼블릭 서브넷에 배포, 애플리케이션 서버와 데이터베이스 서버는 동일한 VPC 의 프라이빗 서브넷에 배포.
타사 가상 방화벽 어플라이언스를 검사 VPC 에 배포.
트래픽이 웹 서버에 도달하기 전에 애플리케이션에 대한 모든 트래픽을 검사하기 위해 웹 애플리케이션을 어플라이언스와 통합하는 솔루션?
    - 검사 VPC 에 게이트웨이 로드 밸런서를 배포.
    - 게이트웨이 로드 밸런서 엔드포인트를 생성.
        - 수신 패킷을 수신하고 패킷을 어플라이언스로 전달.
    - Gateway Load Balancer 를 사용하면 방화벽, 침입 탐지 및 방지 시스템, 심층 패킷 검사 시스템과 같은 가상 어플라이언스를 배포, 확장 및 관리 가능.
    - Gateway Load Balancer 는 Gateway Load Balancer 엔드포인트를 사용하여 VPC 경계 전체에서 트래픽을 안전하게 교환.

<br><br>

- [Q26] `AWS Config` 
AWS 클라우드 배포를 검토하여 Amazon S3 버킷에 무단 구성 변경이 없는지 확인하는 방법?
    - 적절한 규칙으로 `AWS Config` 를 켭니다.
    - `AWS Config` 는 사용자가 업계 표준 및 내부 정책을 준수하는지 AWS 리소스 구성을 감사하고 평가할 수 있는 서비스.

<br><br>






**AWS-SAA 개인 공부 관련 포스트입니다.** <br>
**문제 될 시 삭제 하겠습니다.** <br>
{: .notice--info}
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
