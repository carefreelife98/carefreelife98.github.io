---
title: "[AWS-SAA] IAM / Security"
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

# IAM / 보안

- AWS Organizations 을 사용하여 여러 부서의 AWS 계정 관리.
관리 계정에 대한 Access 를 AWS Organization 의 조직 내 계정 사용자로만 제한 
[AWS Organizations]
    - `aws:PrincipalOrgID` 라는 새로운 조건 키를 S3 버킷 정책에 추가.

<br><br>

- [Q13]
AWS Infra 에 대한 월별 유지 관리 중.
여러 AWS Region 에서 RDS 에 대한 자격 증명 교체해야 함.
최소한의 운영 오버헤드로 위 요구사항을 충족하는 솔루션은?
    - 자격 증명을 ASM 에 암호로 저장.
    - 필요한 Region에 대해 다중 Region 비밀 복제 사용.
    - 일정에 따라 보안 암호를 교체하도록 ASM 구성.
        - 다중 리전 애플리케이션에 필수 리전의 복제된 암호에 대한 액세스 권한을 부여하고 `Secrets Manager 를 사용하여 복제본이 기본 암호와 동기화된 상태를 유지 가능.`
        - `Secrets Manager` 를 사용하면 `데이터베이스 자격 증명, API 키 및 기타 비밀을 포함한 비밀을 저장, 검색, 관리 및 교체`할 수 있습니다.

<br><br>

- [Q15]
프로덕션 VPC 로 들어오고 나가는 트래픽을 보호하는 솔루션을 구현.
AWS 클라우드에서 트래픽 흐름 검사 및 트래픽 필터링과 같은 특정 작업 기능을 갖기를 원함.
어떤 솔루션이 이러한 요구 사항을 충족하는가?
    - AWS 네트워크 방화벽을 사용하여 프로덕션 VPC 에 대한 트래픽 검사 및 트래픽 필터링에 필요한 규칙을 생성.
        - `AWS Network Firewall 은 필요에 따라 검사와 필터링`을 모두 지원.
        - `AWS Network Firewall` 을 사용하면 `VPC 경계에서 네트워크 트래픽을 필터링` 할 수 있다.
    - [참고]
        - `GuardDuty` 는 `계정 보호 서비스.`
        - `트래픽 미러링`은 `네트워크 트래픽 복사 서비스.`
        - `Firewall Manager` 는 `중앙에서 방화벽 규칙 관리하는 서비스.`

<br><br>

- [Q17]
애플리케이션은 두 개의 Amazon EC2 에서 실행되며 문서 저장을 위해 Amazon S3 를 사용.
EC2 가 S3 에 액세스 하도록 어떤 솔루션을 제공?
    - `S3 버킷에 대한 액세스 권한을 부여하는 IAM 역할을 생성` 후 역할을 EC2 에 연결.
    - EC2 가 S3 에 액세스할 수 있는 권한이 있어야 하므로 `IAM 역할`을 부여
        1. Amazon S3 에 대한 액세스 권한을 부여하는 IAM Profile 역할을 생성.
        2. EC2 에 IAM 인스턴스 프로파일을 연결.
        3. S3 에 대한 권한을 확인

<br><br>

- [Q27]
새 애플리케이션을 시작하고 Amazon CloudWatch 대시보드에 애플리케이션 지표를 표시.
회사의 제품 관리자는 이 대시 보드에 주기적으로 액세스 해야 하지만 제품 관리자에게 AWS 계정이 없다.
최소 권한 원칙에 따라 제품 관리자에 대한 액세스를 제공하는 솔루션은?
    - `CloudWatch 콘솔에서 대시보드를 공유.`
        - 제품 관리자의 이메일 주소를 입력하고 공유 단계를 완료.
        - 대시보드에 대한 공유 가능한 링크를 제품 관리자에게 제공.
    - AWS 계정에 직접 액세스할 수 없는 사람들과 CloudWatch 대시보드를 공유할 수 있다.








**AWS-SAA 개인 공부 관련 포스트입니다.** <br>
**문제 될 시 삭제 하겠습니다.** <br>
{: .notice--info}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }