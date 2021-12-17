const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

/*
 * PasswordSecurityCheck
 * 비밀번호 보안성 향상 피드백 모듈
 * @version: 1.0.0
 */
class PasswordSecurityCheck {
    /*
     * 비밀번호 보안성 향상 피드백 기능
     * 비밀번호의 유출 여부를 기반으로 특징을 추출하고, 효과적인 비밀번호 보안성 향상을 위한 피드백과 예시 비밀번호를 제공한다.
     * @version: 1.0.0
     * @param: password, predictPoint
     * @return: password, predictPoint, comment, recommended
     */
    passwordSecurityCheck(password, predictPoint) {
        var zxcvbnPoint =
            parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2) < 5
                ? parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2)
                : 4;
        var luds = parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) < 5 ? parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) : 4;
        var levenshteinPoint = parseInt(parseInt(levenshteinDistance.totalLVD(password)) / 5) < 5 ? parseInt(parseInt(levenshteinDistance.totalLVD(password)) / 5) : 4;

        // console.log(zxcvbnPoint + ',' + luds + ',' + levenshteinPoint);

        /*
         * 유출 여부 예측 결과가 0.6 이하일 경우 유출된 비밀번호로 평가하고, 피드백 제공을 수행한다.
         */
        if (predictPoint > 0.6) {
            return {
                password: password,
                predictPoint: predictPoint,
                comment: [`${password}는 유출되지 않은 비밀번호`],
                recommended: [password],
            };
        }

        /*
         * zxcvbnPoint가 2 이하는 보안성이 약한 비밀번호이다.
         * luds가 2 이하는 보안성이 약한 비밀번호이다.
         * levenshteinDistance가 2 이하는 보안성이 약한 비밀번호이다.
         */
        var zxcvbnPoint =
            parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2) < 5
                ? parseInt(parseInt(koreanZxcvbn(password).score * 2 + comparePoint.frequencyComparePoint(password)) / 2)
                : 4;
        var luds = parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) < 5 ? parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) : 4;
        var levenshteinPoint = parseInt(levenshteinDistance.totalLVD(password)) < 3 ? 0 : 1;

        var feature = [zxcvbnPoint, luds, levenshteinPoint];

        var comment = [];
        var recommended = [];

        var chars = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!@#$%^&*()'];

        /*
         * 유출되었다고 판단된 비밀번호에 대해 5개의 보안성 향상을 위한 비밀번호 예시를 제공한다.
         */
        for (let cnt = 0; cnt < 5; cnt++) {
            var feedbackPwd = password;

            /*
             * 5글자 이하의 비밀번호는 보안성이 낮다고 판단하여 피드백을 제공한다.
             */
            if (feedbackPwd.length <= 5) {
                if (cnt == 0) {
                    comment.push('비밀번호의 길이가 너무 짧음');
                }

                while (feedbackPwd.length < 5) {
                    var length = feedbackPwd.length;
                    var random = Math.floor(Math.random() * (feedbackPwd.length + 1));

                    if (random == length) {
                        var ran = Math.floor(Math.random() * 4);

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        feedbackPwd = feedbackPwd + rnum;
                    } else {
                        var ran = Math.floor(Math.random() * 4);

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        feedbackPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                    }
                }
            }

            if (luds < 3) {
                let tempPwd = feedbackPwd;
                let check = 0;

                if (password.replace(/[A-Z]/g, '') == '') {
                    if (cnt == 0) {
                        comment.push('비밀번호가 대문자만으로 구성됨');
                    }

                    var length = feedbackPwd.length;
                    var random = Math.floor(Math.random() * (feedbackPwd.length + 1));

                    if (random == length) {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 1) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd + rnum;
                    } else {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 1) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                    }
                } else if (password.replace(/[a-z]/g, '') == '') {
                    if (cnt == 0) {
                        comment.push('비밀번호가 소문자만으로 구성됨');
                    }

                    var length = feedbackPwd.length;
                    var random = Math.floor(Math.random() * (feedbackPwd.length + 1));

                    if (random == length) {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 0) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd + rnum;
                    } else {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 0) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                    }
                } else if (password.replace(/[0-9]/g, '') == '') {
                    if (cnt == 0) {
                        comment.push('비밀번호가 숫자만으로 구성됨');
                    }

                    var length = feedbackPwd.length;
                    var random = Math.floor(Math.random() * (feedbackPwd.length + 1));

                    if (random == length) {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 2) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd + rnum;
                    } else {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 2) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                    }
                } else if (password.replace(/[\∼\‘\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\\\|\;\:\”\’\,\<\.\>\/\?\~\'\"]/g, '') == '') {
                    if (cnt == 0) {
                        comment.push('비밀번호가 특수 기호만으로 구성됨');
                    }

                    var length = feedbackPwd.length;
                    var random = Math.floor(Math.random() * (feedbackPwd.length + 1));

                    if (random == length) {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 3) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd + rnum;
                    } else {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 3) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                    }
                }
                if (password.replace(/[A-Z]/g, '').replace(/[a-z]/g, '') == '') {
                    if (cnt == 0) {
                        comment.push('비밀번호가 문자만으로 구성됨');
                    }

                    var length = feedbackPwd.length;
                    var random = Math.floor(Math.random() * (feedbackPwd.length + 1));

                    if (random == length) {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 0 && ran != 1) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd + rnum;
                    } else {
                        var ran = 0;

                        while (true) {
                            ran = Math.floor(Math.random() * 4);
                            if (ran != 0 && ran != 1) {
                                break;
                            }
                        }

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                    }
                }

                feedbackPwd = tempPwd;
            }

            if (zxcvbnPoint < 3) {
                if (cnt == 0) {
                    comment.push('사전에 포함된 단어를 사용하거나 유추하기 쉬움');
                }

                let tempPwd = feedbackPwd;

                while (true) {
                    if (parseInt(parseInt(koreanZxcvbn(tempPwd).score * 2 + comparePoint.frequencyComparePoint(tempPwd)) / 2) >= 1) {
                        if (feedbackPwd == password) {
                            feedbackPwd = tempPwd;
                        }
                        break;
                    }

                    var length = feedbackPwd.length;
                    var random = Math.floor(Math.random() * (feedbackPwd.length + 1));

                    if (random == length) {
                        var ran = Math.floor(Math.random() * 4);

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd + rnum;
                    } else {
                        var ran = Math.floor(Math.random() * 4);

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                    }
                }
            }

            if (levenshteinPoint < 1) {
                if (cnt == 0) {
                    comment.push('사전에 포함된 단어와 비슷한 단어를 사용함');
                }

                let tempPwd = feedbackPwd;

                while (true) {
                    if (parseInt(levenshteinDistance.totalLVD(tempPwd)) >= 1) {
                        if (feedbackPwd == password) {
                            feedbackPwd = tempPwd;
                        }
                        break;
                    }

                    var length = feedbackPwd.length;
                    var random = Math.floor(Math.random() * (feedbackPwd.length + 1));

                    if (random == length) {
                        var ran = Math.floor(Math.random() * 4);

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd + rnum;
                    } else {
                        var ran = Math.floor(Math.random() * 4);

                        var rnum = Math.floor(Math.random() * chars[ran].length);
                        rnum = chars[ran].substring(rnum, rnum + 1);

                        tempPwd = feedbackPwd.substring(0, random) + rnum + feedbackPwd.substring(random, feedbackPwd.length);
                    }
                }
            }

            /*
             * 특정한 보안성이 낮은 특징은 없지만, 유출되었다고 판단될 경우 비밀번호 뒤에 '@'를 붙이는 것을 피드백으로 제공함
             */
            if (password == feedbackPwd) {
                if (cnt == 0) {
                    comment.push('유출 모델이 보안성이 낮다고 평가함');
                }
                feedbackPwd = feedbackPwd + '@';
            }

            recommended[cnt] = feedbackPwd;
        }

        return {
            password: password,
            predictPoint: predictPoint,
            comment: comment,
            recommended: recommended,
        };
    }
}

module.exports.PasswordSecurityCheck = PasswordSecurityCheck;
