---
title: "[CJ Olivenetworks - Cloud Wave] CGV Fast Order 시스템 인프라 구축 3-2. [CI/CD] Github Action - Docker / ArgoCD"
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
6. ArgoCD 로드 밸런서 생성하기 [참고: velog@junsugi](https://velog.io/@junsugi/Argo-CD-%EB%A5%BC-AWS-EKS-%EC%97%90-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
> - 설치한 ArgoCD 에 접속하기 위해 `K8s 의 Ingress` 를 통해 외부와 통신할 수 있도록 해준다.
> > **Ingress 란?**<br>
> > 한 Namespace 안에 여러 개의 서비스들이 존재하고 서비스 내부에는 여러 개의 Pod 가 존재 할 수 있다.<br>
> > 이때, 외부에서 Ingress 의 라우팅을 이용, 원하는 서비스에 접근해서 실제 Application에 접근할 수 있도록 해주는 리소스 이다.<br>
> > <img src="/assets/images/CloudWave/project/argo6.png" alt="argo6_Procdess2" width="100%" min-width="200px" itemprop="image"><br>[출처: 쿠버네티스 공식 홈페이지](https://kubernetes.io/ko/)
> 
> ```yaml
> apiVersion: networking.k8s.io/v1
> kind: Ingress
> metadata:
>   annotations:
>     alb.ingress.kubernetes.io/certificate-arn: <인증서 arn>
>     alb.ingress.kubernetes.io/healthcheck-path: /
>     alb.ingress.kubernetes.io/healthcheck-protocol: HTTP
>     alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}, {"HTTP":80}]'
>     alb.ingress.kubernetes.io/scheme: internet-facing
>     alb.ingress.kubernetes.io/target-type: ip
>     kubernetes.io/ingress.class: alb
>   finalizers:
>   - ingress.k8s.aws/resources
>   labels:
>     app: velog-test
>     tier: backend
>   name: argocd-ingress # 인그레스 이름 정하기
>   namespace: argocd    # 설치할 네임스페이스
> spec:
>   rules:
>   - http:
>       paths:
>       - backend:
>           service:
>             name: argocd-server # 연결할 서비스 (이부분은 고정)
>             port:
>               number: 80 # (이부분도 고정)
>         path: /*
>         pathType: ImplementationSpecific
> ```
>
> - Ingress 생성을 위한 k8s manifest 파일.
> - Yaml 파일을 보면 `spec` 아래 `service` 부분에 `argocd-server` 라는 부분이 적혀 있다.
>   - 해당 서비스 내부에 ArgoCD 페이지가 존재.
>   - 우리는 해당 페이지 UI에 접근하기 위해 해당 서비스를 Ingress 에 연결 한 것.
> <br>
> - 위 파일을 .yaml 파일로 생성 후, 아래와 같이 argocd namespace 에 apply 하여 적용.
> 
> ```shell
> $ kubectl apply -f <ingress yaml 경로> -n argocd
> 
> # 경로를 모르겠다면, 아래와 같이 실행
> $ pwd
> /home.ex2-user/argocd/(yaml 이름).yaml
> 
> $ kubectl apply -f (pwd에서 나온 yaml 파일 경로) -n argocd
> ```
> 
> <img src="/assets/images/CloudWave/project/adgo7.png" alt="adgo7_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> 
> ```shell
> $ kubectl get ing -A
> ```
> 
> - Ingress 를 위 명령어를 통해 조회해보면 `ADDRESS` 를 볼 수 있다.<br>

7. EKS Cluster 보안 그룹에 ArgoCD 와 연결된 CLB의 트래픽 허용하기
> <img src="/assets/images/CloudWave/project/argo8.png" alt="argo8_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> - 위 경로에서 클러스터 보안그룹을 찾아 편집해주자.
> - in-bound 규칙: 모든 트래픽 -> ArgoCD 보안 그룹 <br>

8. `argocd-server` Service 편집하기
> 
> ```shell
> $ kubectl edit service argocd-server -n argocd
> ```
> 
> <img src="/assets/images/CloudWave/project/argo9.png" alt="argo9_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> - 가장 아래의 type : ClusterIP 부분을 LoadBalancer 로 수정
> <br><br>
> <img src="/assets/images/CloudWave/project/argo10.png" alt="argo10_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> 
> ```shell
> $ kubectl get svc -n argocd
> ```
> 
> - service 검색 후 ArgoCD-server 의 Type이 `LoadBalancer` 로 수정된 것을 확인.
> - 생성된 해당 `External-IP` 로 접속하면 접속 성공.

9. ArgoCD 접속 성공
> <img src="/assets/images/CloudWave/project/argo11.png" alt="argo11_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> <img src="/assets/images/CloudWave/project/argo12.png" alt="argo12_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> - 이전에 생성한 ID / PW 를 사용해서 로그인 한다.

<br><br>

## ArgoCD 와 Github Repository 연동

> <img src="/assets/images/CloudWave/project/argo_git.png" alt="argo_git_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
- ArgoCD 접속 -> settings -> Connect Repo

<br><br>

# [ArgoCD] AWS EKS 환경에 Spring boot Web Application 배포하기

## [사전 작업] Deployment 작성을 위한 WAS Application image의 성능 확인

> <img src="/assets/images/CloudWave/project/cd1.png" alt="cd1_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> - WAS 이미지를 Docker COntainer 에서 Running Test
>   - CPU : 약 30% 사용
>   - Memory : 약 5% 사용 
> - 위 사용량 테스트를 기준으로 Deployment.yaml 작성.
>   - 추후 Load Test (트래픽 부하 테스트) 를 통해 Pod 의 Spec을 더욱 상세하게 설정할 예정.

<br><br>

## [ArgoCD] 3 Tier 구조 - EKS Cluster 두 개 (WEB/WAS) 에 각각 배포하기

1. [ArgoCD CLI] ArgoCD 주소로 Login
> 
> ```shell
> $ argocd login (ArgoCD 주소)
> ```
> 
> <img src="/assets/images/CloudWave/project/deploy1.png" alt="deploy1_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> - `kubectl get svc -n argocd` - External-IP 주소로 로그인

2. [ArgoCD CLI] 하나의 ArgoCD server에 새로운 Cluser 추가하기
> 
> ```shell
> $ argocd cluster add <클러스터 arn>
> ```
> 
> <img src="/assets/images/CloudWave/project/deploy2.png" alt="deploy2_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> - 위와 같이 클러스터 추가가 되면 성공. <br><br>
> 
> **[Trouble Shooting] exec plugin error : no valid apiVersion: v1alpha1** <br>
> - 이번 프로젝트 진행 중 가장 많이 마주한 에러 중 하나이다.
> - 결국은 버전 호환성 문제이다. <br><br>
> 
> **[해결]** <br>
> 1. 루트 경로의 `.kube/config` 확인 후 각 Cluster 의 `apiVersion을 v1beta1` 으로 변경. <br>
>    - 뭔가 더 진행이 되긴 하나 결국 다시 에러. <br><br>
>    
> 2. `aws eks update-kubeconfig --name (클러스터 이름)` <br>
>    - update 는 진행이 되나 에러 해결은 되지 않음. <br><br>
>    
> 3. **Github Community 에 따르면 aws cli2 사용시 관련 apiVersion 에러가 발생하지 않는다고 함.** <br>
>    <img src="/assets/images/CloudWave/project/apiVersionErr.png" alt="apiVersionErr_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
>    - `aws cli2` 로 upgrade 후 성공. <br> 
>    - 이제 ArgoCD 가 두번째 WAS Cluster 도 관리하고 있다. <br> 

3. [ArgoCD] 두 개의 EKS Cluster (WEB/WAS) 에 Application 배포.
> 
> <img src="/assets/images/CloudWave/project/deploy3.png" alt="deploy3_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> - **application name** : ArgoCD 화면에서 뜰 application 의 이름 지정
> - **Project Name** : 진행할 ArgoCD Project 선택
> - **Sync Policy** : Automatic 선택 시 약 3분 간격으로 연결된 Github Repo의 변동 사항을 Checking.  
>   - prune resource, self heal 둘 다 선택.
> - **Source** : 배포할 K8s Manifest File이 있는 경로 설정
> - **Destination** : 해당 K8s Manifest File을 배포할 EKS Cluster 설정. 
> 
> <br><br>
> 
> <img src="/assets/images/CloudWave/project/deploy4.png" alt="deploy4_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
> 1. ArgoCD 와 정상적으로 Source 및 Destination 이 연결 되었을 시, 위처럼 **약 3분 간격으로 Source의 변동 사항을 Checking** 하게 된다. <br><br>
> 2. 만약 **Source에 변동사항 발생 시 ArgoCD 는 해당 변동 사항을 WebHook**. <br><br>
> 3. **Destination 으로 설정된 Cluster 에 변동 사항을 적용하여 배포**하게 된다. <br><br><br><br>
> 
> **배포 성공** <br>
> 
> <img src="/assets/images/CloudWave/project/deploy5.png" alt="deploy5_Procdess2" width="100%" min-width="200px" itemprop="image"><br>

<br><br>

# CGV 프로젝트 전체 CI / CD 과정

<img src="/assets/images/CloudWave/project/cicd1.png" alt="cicd1_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
- CI / CD Test 진행 전 초기 홈페이지의 모습.
- **Title: "CICD Test"**

## CI

> **CI 전체 Flow** <br>
> 1. **Web Application 소스코드 추가/삭제/수정**
> 2. **Git push**
> <img src="/assets/images/CloudWave/project/ci1.png" alt="ci1_Procdess2" width="100%" min-width="200px" itemprop="image"><br><br>
> 3. **Github Actions**
> <img src="/assets/images/CloudWave/project/ci2.png" alt="ci2_Procdess2" width="100%" min-width="200px" itemprop="image"><br>**`Docker Build`**<br><br>
> <img src="/assets/images/CloudWave/project/ci3.png" alt="ci3_Procdess2" width="100%" min-width="200px" itemprop="image"><br>**`Docker Push`**<br>

<br><br>

## CD

> **CD 전체 Flow** <br>
> 1. **CI 의 결과로 업그레이드 된 버전의 이미지를 K8s Manifest 에 적용 후 Git Push** <br>
> <img src="/assets/images/CloudWave/project/finalcd1.png" alt="finalcd1_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
>    - **`Docker Image의 버전을 latest`** 로 설정했기 때문에 **`ImagePullPolicy 를 Always`** 로 설정하여 매 **`Pod가 뜰 때마다 Docker Hub에서 latest tag를 가진 이미지를 새로 다운`** 받도록 해준다.<br><br>
> 2. **ArgoCD 가 보고 있던 Git repo에 존재하는 K8s Manifest 파일의 변동 사항을 Web Hook 하여 EKS Cluster 에 배포.**
> <img src="/assets/images/CloudWave/project/finalcd2.png" alt="finalcd2_Procdess2" width="100%" min-width="200px" itemprop="image"><br>
>    - Github 에 Push 하게 되면 해당 repository를 보고 있던 **`ArgoCD가 Webhook 을 통해 k8s manifest 파일의 변경사항을 확인`**하고 최신 이미지를 **`모든 Pod에 Rolling Update 방식으로 무중단 배포`**한다.

<br><br>

## CI / CD 후 변동 사항에 대해 정상적으로 배포된 애플리케이션의 모습

<img src="/assets/images/CloudWave/project/cicdresult.png" alt="cicdresult_Procdess2" width="100%" min-width="200px" itemprop="image"><br>`CICD test -> Gooloom - CGV 로 Title이 변경되어 배포된 것을 볼 수 있다.`<br> 

<br><br>

# CI / CD 시연 영상 (배속)

{% raw %}
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZPrLB_rOsJY" frameborder="0" allowfullscreen></iframe>
{% endraw %}

<br><br>

**[CJ Olivenetworks - Cloud Wave 1기] 활동 중 진행한 팀 프로젝트입니다.** <br>
**무단 복제 및 게시는 삼가주시기 바랍니다.** <br>
{: .notice--success}
{: style="text-align: center;"}

<br><br>

[처음으로~](#){: .btn .btn--primary }

### Task Lists

>

- [x] Github Action / Docker 를 활용한 CI
- [x] Workflow File 작성하기
- [x] ArgoCD 를 활용하여 AWS EKS Cluster 에 자동 배포하기 - CD
- [x] ArgoCD 설치
- [x] ArgoCD 와 Github Repository 연동
- [x] AWS EKS 환경에 Spring boot Web Application 배포하기
- [x] Deployment 작성을 위한 WAS Application image의 성능 확인
- [x] 3 Tier 구조 - EKS Cluster 두 개 (WEB/WAS) 에 각각 배포하기
- [x] CGV 프로젝트 전체 CI / CD 과정
- [x] CI / CD 시연 영상 (배속)