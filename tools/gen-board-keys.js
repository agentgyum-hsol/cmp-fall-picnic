// 익명게시판 관리자 키 쌍 생성기: node tools/gen-board-keys.js
// - board-public-key.json  : index.html 의 BOARD_PUBLIC_KEY 에 붙여넣기 (공개 가능)
// - board-private-key.json : 운영진만 보관 (절대 커밋/공유 금지, .gitignore 처리됨)
const { webcrypto: crypto } = require("crypto");
const fs = require("fs");
(async () => {
  const kp = await crypto.subtle.generateKey(
    { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    true, ["encrypt", "decrypt"]);
  const pub = await crypto.subtle.exportKey("jwk", kp.publicKey);
  const priv = await crypto.subtle.exportKey("jwk", kp.privateKey);
  fs.writeFileSync("board-public-key.json", JSON.stringify(pub));
  fs.writeFileSync("board-private-key.json", JSON.stringify(priv));
  console.log("생성 완료: board-public-key.json / board-private-key.json");
})();
