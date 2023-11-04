
// 实现JWT解密
function jwtDecode(token) {
    const [header, payload, sign] = token.split('.');
    return JSON.parse(atob(payload));
}
