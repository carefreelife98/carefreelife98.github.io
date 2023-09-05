---
title: "[CJOlivenetworks] CGV Fast Order 시스템 인프라 구축 3-2. [CI/CD] Github Action - Docker / ArgoCD"
categories:
  - Cloud-Wave-Project
tags:
  - Cloud-Wave-Project
toc: true
toc_sticky: true
toc_label: "Carefree to See"
header:
   teaser: "/assets/images/CloudWave/project/ci_gitact.png"
youtubeurl: https://youtu.be/ZPrLB_rOsJY
---
<!-- Created by Chae Seung Min - CarefreeLife
Visit my Programming blog: https://carefreelife98.github.io --> 
---

# 1. Github Action / Docker 를 활용한 CI

<img src="/assets/images/CloudWave/project/ci_gitact.png" alt="ci_gitact_Procdess2" width="100%" min-width="200px" itemprop="image"><br>`Github Action 을 사용해서 Docker Image를 자동 Build 및 Docker Hub에 Push 하는 모습`<br>

- **이전 포스팅에서 만들어 놓은 WEB / WAS 이미지를 `Github Actions` 와 `Docker` 를 사용하여 CI 환경을 구축해보자.**<br><br>
  [이전 포스팅 바로 가기: [Httpd, Spring Boot, Aurora MySQL] 3 Tier Web Application - Github Actions, Docker](https://carefreelife98.github.io/cloud-wave-project/webapp_docker/)

<br><br>

## [Github Actions] Workflow File 작성하기

```yaml
# Workflow 이름 지정
name: 
on:
  # 아래 명시된 Repository(조건) 에 Push 발생 시 Github Actions 작동  
  push:
    paths:
      - 'gooloom-was/**'
      - 'gooloom-web/**'
    branches: [ main ]

jobs:
  deploy:
    # Github Actions 가 실행될 환경(VM)을 설정
    runs-on: ubuntu-latest
    steps:
      - name: 저장소 Checkout
        uses: actions/checkout@v3

      - name: Set up JDK 19
        uses: actions/setup-java@v3
        with:
          java-version: '19'
          distribution: 'oracle'

      - name: 스프링부트 애플리케이션 빌드 # (1)
        run: |
          cd gooloom-was
          sudo chmod +x gradlew
          ./gradlew build
        shell:
          bash
          
      # Github 에 저장되어 있는 Variables(Secrets) 를 사용하여 암호화 된 변수를 통해 안전하게 Login.
      - name: Docker Hub 로그인 # (2)
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: 도커 이미지 빌드 # (3)
        run: |
          cd gooloom-was
          docker build -t csm4903/gooloom-was:latest .
      - name: Docker Hub 퍼블리시 # (4)
        run: docker push csm4903/gooloom-was:latest
```

> <h1>️📣 K8s 배포 시 주의 사항 📣</h1>
> 현재 `latest` 로 버전을 명시 하였으므로 `manifest file` 옵션 중 `imagePullPolicy: "Always"` 로 설정해주어야 항상 해당 이미지의 latest 버전을 새로 배포해준다.<br>
> 또한, 이전에 작성한 `Dockerfile` 은 `Github Repository` 의 최상단(루트)에 존재해야 한다.
{: .notice--danger}
{: style="text-align: center;"}

<br><br>

# 2. ArgoCD 를 활용하여 AWS EKS Cluster 에 자동 배포하기 - CD

본 진행 과정은 AWS EC2 로 생성된 `Bastion server` 에서 진행됩니다.
{: .notice--info}
{: style="text-align: center;"}

<img src="/assets/images/CloudWave/project/argoCD.png" alt="argoCD_Procdess2" width="100%" min-width="200px" itemprop="image"><br>`ArgoCD의 작동 모습`<br>

<br><br>

## ArgoCD 설치

1. 공식 홈페이지에서 제공하는 설치 방법이다.
>
> ```shell
> $ kubectl create namespace argocd
> $ kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
> ```
>
> <img src="/assets/images/CloudWave/project/argo1.png" alt="argo1_Procdess2" width="100%" min-width="200px" itemprop="image"><br>

2. 설치 후 확인
> 
> ```shell
> $ kubectl get po -n argocd
> ```
> 
> <img src="/assets/images/CloudWave/project/argo2.png" alt="argo2_Procdess2" width="100%" min-width="200px" itemprop="image"><br>

3. ArgoCD 초기 Admin 비밀번호 확인
> 
> ```shell
> $ kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
> ```
> 
> <img src="/assets/images/CloudWave/project/argo3.png" alt="argo3_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> - 위 비밀번호는 다음 Step 에서 사용되므로 복사해두자.

4. [ArgoCD CLI] ArgoCD 초기 비밀번호 변경
> a. ArgoCD Pod 에 직접 접근 후 Login
> <img src="/assets/images/CloudWave/project/argo4.png" alt="argo4_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> 
> ```shell
> $ kubectl exec -it -n argocd deployment/argocd-server -- /bin/bash
> 
> $ argocd login localhost:8080
> ```
> 
> - username : admin
> - password : 이전 Step 에서 얻어낸 Admin password 입력.
> 
> b. ArgoCD CLI 를 사용해서 비밀번호 변경. (ArgocD Container 에 이미 CLI가 준비되어 있다.)
> <img src="/assets/images/CloudWave/project/argo5.png" alt="argo5_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> 
> ```shell
> $ argocd account update-password
> ```
> 
> - 기존 Password 입력 후 새로운 Password 등록

5. 현재 단계까지 진행하던 중 ArgoCD 의 접근 편리성을 위해 ALB 가 가장 처음 마주하는 첫번째 Private Subnet (WAS Cluster) 에 재설치 하였다.
6. ArgoCD 로드 밸런서 생성하기
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>







<br><br>

<img src="/assets/images/CloudWave/project/modSuccess2.png" alt="modSuccess_Procdess2" width="100%" min-width="200px" itemprop="image"><br>`Apache2(httpd) 와 Spring boot 내장 Tomcat 연동 성공`<br>

<br><br>

**[CJ Olivenetworks - Cloud Wave 1기] 활동 중 진행한 팀 프로젝트입니다.** <br>
**무단 복제 및 게시는 삼가주시기 바랍니다.** <br>
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