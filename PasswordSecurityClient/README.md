## Installation

### git clone

```bash
git clone https://github.com/KiHyeon-Hong/Password_security_client.git
```

### ./.npmrc

```txt
//npm.pkg.github.com/:_authToken=발급받은 ReadOnly_key
@kihyeon-hong:registry=https://npm.pkg.github.com/
```

### npm

```bash
npm install
```

## Usage

### init

```js
const PasswordSecurityClient = require('@kihyeon-hong/password_security_client');
var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();
```

### passwordValidation(password)

-   사용자가 선택한 비밀번호를 입력하여 보안성 예측한다.

#### code

```js
pwd.passwordValidation('pds$66wo@d').then(function (result) {
    console.log(result);

    pwd.passwordValidation('203918').then(function (result) {
        console.log(result);
    });
});
```

#### result

```json
{
  password: 'pds$66wo@d',
  predictPoint: 0.9999910593032837,
  comment: [ 'pds$66wo@d는 유출되지 않은 비밀번호' ],
  recommended: [ 'pds$66wo@d' ]
}
{
  password: '203918',
  predictPoint: 0.044642407447099686,
  comment: [ '비밀번호가 숫자만으로 구성됨', '사전에 포함된 단어를 사용하거나 유추하기 쉬움' ],
  recommended: [ '20!3918', '203918!', '20v3918', '2b03918', '203I918' ]
}
```

### passwordModelDistribution(versionData, comment)

-   유출 비밀번호 예측모델 학습 서버에서 버전에 따른 모델 가중치, 구조 받아온다.

#### code

```js
pwd.passwordModelDistribution('0.1', 'Update Model version');
```

#### result

```
// success


// error
{
  errno: -4078,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 65001
}
```

### passwordDictUpdate(dictionary, comment)

-   유출 비밀번호 예측모델 학습 서버의 모델 학습 과정에서 새로운 비밀번호를 추가한다.

#### code

```js
pwd.passwordDictUpdate('{"dictionary":"q1w2e3r4"}', 'Leak password Add');
```

#### result

```
// success
```

### passwordModelParaUpdate(parameter, comment)

-   유출 비밀번호 예측모델 학습 서버의 모델 학습을 위한 하이퍼 파라매터 변경을 요청한다.

#### code

```js
var parameter = '{"node":4,"unit":[3,5,3,1],"activation":"relu","epoch":10}';
pwd.passwordModelParaUpdate(parameter, 'Model Training parameter Update');
```

#### result

```
// success
```

### serverAddressUpdate(serverAddress)

-   유출 비밀번호 예측모델 학습 서버의 주소를 변경한다.
-   서버로 요청 시 해당 주소로 요청한다.

#### code

```js
// 유출 비밀번호 예측모델 학습 서버의 주소와 포트 번호를 설정
pwd.serverAddressUpdate('localhost:65001');
```

#### result

```json
// success
```
