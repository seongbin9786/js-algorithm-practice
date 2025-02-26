const A_CODE = "a".charCodeAt(0);

/*
alphabet 소문자인 점을 활용한다.
*/
class Node {
    constructor(alhpabetCode, next) {
        this.alhpabetCode = alhpabetCode;
        this.exists = false;
        this.next = Array(26); // 다음 노드 포인터
    }
}

var Trie = function () {
    this.rootNode = new Node("");
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let currNode = this.rootNode;

    for (let i = 0; i < word.length; i++) {
        const letterCharCode = word.charCodeAt(i) - A_CODE;

        // 아직 있으면 기존 노드 활용
        if (currNode.next[letterCharCode]) {
            currNode = currNode.next[letterCharCode];
            continue;
        }

        // 없으면 신규 삽입
        const newNode = new Node(letterCharCode);
        currNode.next[letterCharCode] = newNode;
        currNode = newNode;
    }

    currNode.exists = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    let currNode = this.rootNode;

    // apple 삽입 시 app 이 있는지를 알 수가 없다.
    for (let i = 0; i < word.length; i++) {
        const letterCharCode = word.charCodeAt(i) - A_CODE;
        if (!currNode.next[letterCharCode]) {
            return false;
        }
        currNode = currNode.next[letterCharCode];
    }

    return currNode.exists;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
// 이게 search랑 다른 게 뭐지...? 다음 노드가 있어야 됨
Trie.prototype.startsWith = function (prefix) {
    let currNode = this.rootNode;

    for (let i = 0; i < prefix.length; i++) {
        const letterCharCode = prefix.charCodeAt(i) - A_CODE;
        if (!currNode.next[letterCharCode]) {
            return false;
        }
        currNode = currNode.next[letterCharCode];
    }

    // 삭제가 없어서, exists 여부와 무관함
    return !!currNode;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
