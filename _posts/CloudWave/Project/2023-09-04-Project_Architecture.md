---
title: "[CJOlivenetworks] CGV Fast Order 시스템 인프라 구축 1. 프로젝트 기획 및 업무 분담 / 전체 Architecture 구성"
categories:
  - Cloud-Wave-Project
tags:
  - Cloud-Wave-Project
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
   teaser: "/assets/images/CloudWave/project/projectIntro.png"
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

<img src="/assets/images/CloudWave/project/projectIntro.png" alt="projectIntro_Procdess" width="100%" min-width="200px" itemprop="image"><br>`[CJ Olivenetworks - Cloud Wave 1기] 팀명: (주) 구름 건설`<br>

<br><br>

# 프로젝트 일정 관리 및 나의 역할

> 조 이름은 `Cloud Architecture` 에서 본따 `(주)구름 건설` 으로 설정했다.<br>
> <img src="/assets/images/CloudWave/project/members.png" alt="members_Procdess" width="100%" min-width="200px" itemprop="image"><br>`(주)구름 건설 조직도`<br>
> 
> **나의 역할** <br>
> 1. **Terraform / Terraform Cloud** 를 사용한 CI/CD 환경을 통해 AWS 인프라 구축 자동화
> 2. **Spring Boot 및 Apache2, AWS RDS(Aurora MySQL DB) 를 활용한 3 Tier Web Application** 구축
> 3. **EKS** 환경 구축
> 4. **Github Action, Docker, ArgoCD** 를 활용한 CI/CD 환경 구축 후 EKS 환경에 배포 자동화

<br><br>

<h2>프로젝트 진행 기간 및 계획</h2>

| 구분               | 8/18 | 8/19 | 8/20 | 8/21 | 8/22 | 8/23 | 8/24 | 8/25 | 8/26 | 8/27 | 8/28 | 8/29 | 8/30 | 8/31 | 9/1 |
|------------------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|-----|
| 시나리오 작성          | O    | O    | O    | O    |      |      |      |      |      |      |      |      |      |      |     |
| 아키텍쳐 완성          | O    | O    | O    | O    |      |      |      |      |      |      |      |      |      |      |     |
| 네트워크 인프라 구축      | O    | O    | O    | O    |      |      |      |      |      |      |      |      |      |      |     |
| 홈페이지 개발          |      |      |      | O    | O    | O    | O    |      |      |      |      |      |      |      |     |
| WEB, WAS, DB 구축  |      |      |      | O    | O    | O    | O    |      |      |      |      |      |      |      |     |
| 스토리지, 백업 구축      |      |      |      | O    | O    | O    | O    |      |      |      |      |      |      |      |     |
| CI/CD 구축         |      |      |      |      |      |      | O    | O    |      |      |      |      |      |      |     |
| 모니터링 시스템 구축      |      |      |      | O    | O    | O    | O    |      |      |      |      |      |      |      |     |
| 알림 시스템 구축        |      |      |      | O    | O    | O    | O    |      |      |      |      |      |      |      |     |
| 보안 시스템 구축        |      |      |      |      |      |      | O    | O    | O    |      |      |      |      |      |     |
| 보안 및 권한 최소화      |      |      |      |      |      |      | O    | O    | O    |      |      |      |      |      |     |
| 부하 테스트           |      |      |      |      |      |      |      |      |      | O    | O    |      |      |      |     |
| Failover Test    |      |      |      |      |      |      |      |      |      | O    | O    |      |      |      |     |
| 자료 취합            |      |      |      |      |      |      |      |      |      | O    | O    |      |      |      |     |
| 발표자료 제작          |      |      |      |      |      |      |      |      |      |      | O    | O    | O    |      |     |
| 산출물 제작           |      |      |      |      |      |      |      |      |      |      | O    | O    | O    |      |     |
| 프로젝트 마무리 및 최종 발표 |      |      |      |      |      |      |      |      |      |      |      |      |      | O    | O   |

- **프로젝트 진행 기간 : 2023.08.18 ~ 2023.08.31**

<br><br>

# 시나리오

```
CGV는 국내 멀티플렉스 극장 상영을 담당하는 CJ의 주요 계열사입니다. 
191개의 점포(극장)수를 보유하고 있는 CGV는 매점 선주문 시스템인 [패스트오더] 서비스를 통하여 고객들에게 편리함을 제공하고 있습니다.
[패스트오더] 서비스의 AWS 인프라 현황을 기반으로 대규모 사용자가 동시에 사용하는데 무리가 없는 인프라 아키텍처를 설계하시기 바랍니다.
```

<br><br>

# 요구 조건

---
1. 제공되는 인프라 현황은 프로젝트 참고용으로 변경이 가능합니다.
2. WEB–WAS–DB 3Tier 구조로 구성이 되어야 합니다.
3. WEB/WAS/DB는 모두 이중화가 되어야 합니다.
4. WEB 트래픽 분산을 위한 로드밸런싱은 ALB, NLB 어떤 것을 사용해도 무방합니다.
5. S3, EFS 등 AWS의 스토리지 서비스는 반드시 사용이 되어야 합니다.
6. 이미지 백업, 리전 백업 등 백업 서비스를 고려하시기 바랍니다.
7. Cloudwatch 와 같은 인프라 모니터링을 할 수 있는 환경을 구현하시기 바랍니다.
   모니터링 대시보드, 이슈 발생 시 알람을 받을 수 있는 환경 구현도 충분히 가능합니다.
8. 인프라 아키텍처에서 보안적으로 취약한 부분이 없는지도 고민해보시기 바랍니다.

※ 위 내용들은 프로젝트 진행 시 참고할 수 있도록 주요 고려사항들을 기재한 것이며, 모든 항목들을 반드시 구현해야 하는 것은 아닙니다.<br><br>
※ 주요 항목들 구성 시 목적, 이유 등에 대하여 팀원들과 충분히 논의하고 고민해보시기 바랍니다.<br>
{: .notice--danger}
{: style="text-align: center;"}

---

<br><br>

# 고객사 요구사항 검토

> 프로젝트 시작 후 가장 먼저 한일은 **고객사 요구사항의 검토**이다. <br>
> 그 결과 **아래와 같은 검토사항**이 산출되었다.<br>

| 구 분 | CheckPoint | 비고 | 고객사 의견 |
| --- | --- | --- | --- |
| AWS 계정 | Production 용 계정 발급 | Dev/Stg Deploy 정책에 따라 개별 발급 필요 | Dev/Stg, Deploy 정책 따라 개별 발급 |
| Global 확장 | 국내 서비스 외 해외 서비스 확장 여부 검토 | 해외 서비스 확장에 따라 네트웍 정책 수립 필요 | 추후 확장 필요 구성 |
| 서비스 다중화 | 서비스 가용성 확보를 위한 이중화 | Multi –AZ 구성으로 이중화 | AZ, 서비스 인스턴스, DB, Cache 가용성 확보 필요 |
|  |  | EKS auto scaring, AWS aurora, Elastic cache 구성으로 이중화 및 유연한 가용성 확보 |  |
| ELB | Web 서버 다중화시 서비스 연동을 위한 LB 사용 필수 | SSL 등록 여부 검토 | SSL 등록 필요 |
| EKS | 기존 리소스 자원 사용 현황을 비교하여 Type 선택 필요 |  | 리소스 자원 사용 현황 파악중 |
|  | 서비스 가용성 및 유연한 트레픽 처리를 위한 Autoscaring size 협의 |  | 트래픽이 몰리는 시간에 autoscaling 필요 |
| EBS | 서비스 성격상 R/W I/O가 높다면 SSD 사용을 권고 |  | SSD 불필요 |
| DB | 서비스 안정성과 관리 Point 가 낮은 RDS 구성 검토 요망 | 서비스 안정성을 위해 Multi-AZ 옵션 권고(Stanby) | 이중화 불필요(write DB) |
|  |  | 유연한 트래픽 처리 위한 replica set 권고 | 우연한 트래픽 처리 필요 |
| Db cache | 사용자 세션 저장 및 DB 리소스 제어 필요시 구성 |  | Main DB 리소스 제어 필요 |
|  |  |  | 사용자 세션 저장 불필요 |
| CDN | Static 파일 사용이 빈번할 경우 CDN 사용을 권고 | CDN 사용시 EC2 instance spec 낮출 수 있음 | 추후 global 확장을 위한 CDN 필요 |
| Route 53 | 도메인 관리가 필요할 경우 사용 검토 |  | 도메인 관리 필요 |
| Gateway(Bastion) | 접근 제어용 인스턴스 구성 여부 검토 | EC2 instance,RDS 접근시 직접 접근보다 접근제어가 가능한 별도의 서버를 통해 접근을 권고 함 | 필요 |

<br><br>

| 구 분 | CheckPoint | 비고 | 고객사 의견 |
| --- | --- | --- | --- |
| CI/CD | Staging 환경 개발/배포 자동화 환경 구축 여부 검토 | DEV 환경 인프라 구성 협의 필요 | DEV 환경 이중화 구성 x 최소한 환경 구성 |
|  |  |  | Staging 환경 product 환경과 동일한 구성 |
|  |  |  | staging CICD 자동화 환경 구축 필요 |
| 모니터링 | 모니터링할 메트릭 범위, 모니터링 화면 협의 필요 |  | Cpu,mem,네트워크 사용량 메트릭 모니터링 필요 |
|  |  |  | 모니터링 화면 필요 |
| S3 | 서비스 로그 저장이 필요 할 경우, CDN 서비스 사용 시 사용 권장 | 용량 제한 없음 사용량에 따라 과금 | 모니터링 시스템 구축을 위한 로그 저장 필요 |
|  |  |  | CDN static 파일 저장 필요 |
| SNS | 알람 받을 플랫폼 협의 필요, 알람 받을 메트릭 임계값 협의 필요 | SNS, Email, slack등 협업 플렛폼 등 | Email, slack 알람 필요 |
| WAF | 방화벽 정책 협의 필요 | Ddos, 악성 스크립트 보안정책 설정 가능 | Ddos, SQL injection 방어 필요 |
| NAT gateway | 서비스 인스턴스 외부 통신 필요 시 사용 |  | 서비스 인스턴스 외부 통신 필요 |

<br><br>

# 전체 Architecture 구성

<img src="/assets/images/CloudWave/project/projectFullArchitecture.png" alt="projectFullArchitecture_Procdess" width="100%" min-width="200px" itemprop="image"><br>`프로젝트 전체 Architecture`<br>

> **(주)구름건설 에서 제안하는 사항을 추가하여 Architecture 구성**
> 1. **MSA (Microservice Architecture)구조** 도입
> 2. **CI / CD 환경에서의 Application 및 Infra 구축**을 통한 **자동화 및 현대화**

<br><br>

# 업무 분담 및 세분화

- **인프라**
  - **3 Tier Architecture**
    - Public subnet
      - Bastion / VPN / NAT Gateway
    - Private subnet
      - WEB EKS Cluster
      - WAS EKS Cluster
      - Aurora MySQL DataBase
  - **네트워크**
     - ACM, Route 53, ALB, NLB, Inter Region Peering, VPN Conection
  - **자동화**
     - Terraform, Terraform Cloud, Cloudformation(반복 작업 자동화)
- **개발+리소스+서비스**
   - **WEB, WAS, DB**
     - WEB/WAS (As Docker Image)
        - WEB : Apache2 (Httpd)
        - WAS : Spring Boot (내장 Tomcat)
        - WEB-WAS Connector : Mod_JK Connector (or Mod_JK Proxy)
     - DB : AWS RDS (Aurora MySQL)
     - 기타
       - Auto Scaling, EC2/EKS, RDB, Redis
- **스토리지, 백업**
   - S3, AWS Backup, EFS 등, Cloud Front(CDN), Snapshot
- **모니터링, 알림**
   - Cloudwatch, Prometheus, Grafana, Datadog
   - Kubecost
   - SNS, Lambda
- **※보안, 권한 중요!!!※ / 공통**
   - WAF, Deep Security, IAM, VPC Endpoint
- **※테스트※ / 공통**
   - 부하 테스트(jmeter)
   - Fail Over
   - CI/CD 테스트
- **부가 사항**
   - Istio vs app mash
   - EKS, ECS
   - CI/CD
   - 비용(추가 가점)

<br><br>

# Naming Rule

<img src="/assets/images/CloudWave/project/naming.png" alt="naming_Procdess" width="100%" min-width="200px" itemprop="image"><br>`(주)구름 건설의 Naming Rule`<br>

1. **운영환경** DEV / STG / PROD
2. **시스템 명칭** pay / user / item
3. **리소스 명칭** Resource (EC2, RDS, EKS..)
4. **시스템 역할** web / was / bastion … + (Pub, )
5. **numbering**

<br><br>

**[CJ Olivenetworks - Cloud Wave 1기] 활동 중 진행한 팀 프로젝트입니다.** <br>
**무단 복제 및 게시는 삼가주시기 바랍니다.** <br>
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] 프로젝트 일정 관리 및 나의 역할
- [x] 시나리오
- [x] 요구 조건
- [x] 고객사 요구사항 검토
- [x] 전체 Architecture 구성
- [x] 업무 분담 및 세분화
- [x] Naming Rule