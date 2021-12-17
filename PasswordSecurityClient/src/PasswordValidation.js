const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

var tf = require('@tensorflow/tfjs');
require('tfjs-node-save');

/*
 * PasswordValidation
 * 비밀번호 보안성 평가 모듈
 * @version: 1.0.0
 */
class PasswordValidation {
    /*
     * 비밀번호 보안성 평가 기능
     * password로 입력받은 비밀번호의 특징을 추출하고, 학습된 비밀번호 보안성 평가모델의 가중치와 구조로 유출 여부를 예측한다.
     * @version: 1.0.0
     * @param: password
     * @return: predictPoint
     */
    async passwordValidation(password) {
        var zxcvbnPoint =
            parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2) < 5
                ? parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2)
                : 4;
        var luds = parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) < 5 ? parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) : 4;
        var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(password)) < 3 ? 0 : 1;

        var feature = [zxcvbnPoint, luds, levenshteinPoint];

        const loadedModel = await tf.loadLayersModel('file://' + __dirname + '/../passwordModel/model.json');
        var predictPoint = loadedModel.predict(tf.tensor([feature]));
        predictPoint = Array.from(predictPoint.dataSync())[0];

        return predictPoint;
    }
}

module.exports.PasswordValidation = PasswordValidation;
