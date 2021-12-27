# Installation

## git clone

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_client_docker.git
```

## Create Docker images

- Docker image 생성 및 실행
- Docker image 생성 및 실행을 위해 su 계정으로 접속

```bash
docker build . -t passwordsecurityclient
docker run -p 65002:65002 -d passwordsecurityclient
```

- Docker 환경 접속

```bash
docker exec -it <container ID> /bin/bash
```

## API Document

### serverAddressUpdate

- 비밀번호 보안성 학습모듈(https://github.com/KiHyeon-Hong/Password_security_server_docker)이 실행중인 서버의 주소와 포트 변경 API
- 비밀번호 보안성 평가모델의 관리(평가모델 업데이트, 비밀번호 사전 변경, 학습 파라매터 수정 기능 등)를 위해 학습모듈이 실행중인 서버의 주소와 포트를 알아야 함

```text
# GET
http://localhost:65002/serverAddressUpdate?serverAddress=192.168.0.22:65001
```

- localhost:65002 : 비밀번호 보안성 평가모듈이 실행중인 IP와 포트
- serverAddress=192.168.0.22:65001 : 변경할 학습모듈 서버의 IP와 포트

#### Return

```json
{
  "state": 200,
  "comment": "서버 주소 변경 완료"
}
```

### passwordValidation

- 사용자가 입력한 비밀번호 보안성 평가 API
- 사용자가 입력한 비밀번호의 유출 확률을 계산하여 보안성을 평가하고, 보안성이 미흡하다고 판단될 경우 미흡한 부분과 추천 비밀번호를 반환
- 비밀번호는 전송에서도 보안성을 유지해야 하므로 POST로 수행

```text
# POST
http://localhost:65002/passwordValidation
```

- localhost:65002 : 비밀번호 보안성 평가모듈이 실행중인 IP와 포트

#### POST body

- key: password
- value: 사용자가 선택한 비밀번호

#### Return

```json
// [Object: null prototype] { password: '123456' }
{
  "password": "123456",
  "predictPoint": 0.033809125423431396,
  "comment": ["비밀번호가 숫자만으로 구성됨", "사전에 포함된 단어를 사용하거나 유추하기 쉬움"],
  "recommended": ["123E456", "1234D56", "123456g", "%123456", "12345R6"]
}
```

### passwordModelDistribution

- 학습한 비밀번호 보안성 평가모델 배포 요청 API
- 비밀번호 보안성 학습모듈이 실행중인 서버에서 요청한 버전의 학습 모델로 업데이트 수행
- 만약, 요청한 버전이 없는 경우 비밀번호 보안성 학습모듈이 실행중인 서버에서 가장 최신의 학습 모델로 업데이트 수행

```text
# GET
http://localhost:65002/passwordModelDistribution?versionData=0.2&comment=TestComment
```

- localhost:65002 : 비밀번호 보안성 평가모듈이 실행중인 IP와 포트
- versionData=0.2 : 업데이트를 요청하는 평가모델 버전
- comment=TestComment : 코멘트

#### Return

```json
{
  "state": 200,
  "comment": "유출 비밀번호 예측모델 배포 완료"
}
```

### passwordDictUpdate

- 학습을 위한 유출된 비밀번호 추가 요청 API
- 유출 비밀번호가 추가적으로 발생할 경우에 학습 데이터로 해당 비밀번호 추가 요청

```text
# GET
http://localhost:65002/passwordDictUpdate?dictionary={"dictionary":"q1w2e3r4"}&comment=TestComment
```

- localhost:65002 : 비밀번호 보안성 평가모듈이 실행중인 IP와 포트
- dictionary={"dictionary":"q1w2e3r4"} : 유출된 비밀번호 "q1w2e3r4"를 학습 데이터로 추가
- comment=TestComment : 코멘트

#### Return

```json
{
  "state": 200,
  "comment": "사전 수정 요청 완료"
}
```

### passwordModelParaUpdate

- 모델 학습에 사용하는 학습 하이퍼 파라매터 수정 요청 API
- 모델 학습에 사용하는 하이퍼 파라매터는 은닉층의 수(node), 각 은닉층에서의 노드의 수(unit), 은닉층의 활성화 함수(relu), 학습 횟수(epoch)이며, 이는 수정될 수 있어야 함
- 이 모델 학습 하이퍼 파라매터를 수정하는 API 제공

```text
# GET
http://localhost:65002/passwordModelParaUpdate?parameter={"node":4,"unit":[5,5,3,1],"activation":"relu","epoch":20}&comment=MyNewParameter
```

- localhost:65002 : 비밀번호 보안성 평가모듈이 실행중인 IP와 포트
- parameter={"node":4,"unit":[5,5,3,1],"activation":"relu","epoch":20} : 하이퍼 파라매터
- comment=TestComment : 코멘트

#### Return

```json
{
  "state": 200,
  "comment": "하이퍼 파라매터 수정 요청 완료"
}
```
