/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s, t) {
  const letterBox = new LetterBox();

  try {
    for (const char of s) {
      letterBox.fill(char);
    }

    for (const char of t) {
      letterBox.use(char);
    }

    if (letterBox.size() !== 0) {
      throw new Error("two strings does not match");
    }
  } catch {
    return false;
  }
  return true;
};

class LetterBox {

  _map = new Map();

  fill(char) {
    if (!this._map.has(char)) {
      return this._map.set(char, 1);
    }
    const prevCount = this._map.get(char);
    this._map.set(char, prevCount + 1);
  }

  use(char) {
    const prevCount = this._map.get(char);
    this.assertExist(char);
    this.assertCount(prevCount);
    this._map.set(char, prevCount - 1);
  }

  assertExist(char) {
    if (!this._map.has(char)) {
      throw new Error('letter does not exist');
    }
  }

  assertCount(prevCount) {
    if (prevCount === 0) {
      throw new Error('letter does not exist');
    }
  }

  size() {
    let sum = 0;
    const values = this._map.values();
    for (const v of values) {
      sum += v;
    }
    return sum;
  }
}