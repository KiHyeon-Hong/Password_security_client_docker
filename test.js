const request = require('request');
const fs = require('fs');

// const PasswordSecurityClient = require('./PasswordSecurityClient');
const PasswordSecurityClient = require('@kihyeon-hong/password_security_client');

var pwd = new PasswordSecurityClient.PasswordSecurity.PasswordSecurity();

// 예측모델 사용
pwd.passwordValidation('pds$66wo@d').then(function (result) {
    console.log(result);

    pwd.passwordValidation('203918').then(function (result) {
        console.log(result);
    });
});

// 학습된 예측모델 받아오기
// pwd.passwordModelDistribution('0.1', 'test comment');

// 유출 비밀번호 사전 추가
// pwd.passwordDictUpdate('{"dictionary":"q1w2e3r4"}', "test message");

// 유출 비밀번호 예측 모델 하이퍼 파라매터 수정
// pwd.passwordModelParaUpdate('{"node":4,"unit":[3,5,3,1],"activation":"relu","epoch":10}', "test message.");
