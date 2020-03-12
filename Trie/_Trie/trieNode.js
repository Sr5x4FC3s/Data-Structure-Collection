/** 
 * @class 
 * @constructor
 * @param {Char} character 
 * @param {Boolean} isCompleted - if the node is the representation of a completed word 
 */

const trieNode = class TrieNode { 
  constructor(character, isCompleted = false) {
    this.character = character;
    this.isCompleted = isCompleted;
    this.children = {}; // is it better to use an array or is it better to use to object? object here is to create an implementation of a HashMap 
  }


  /**
   * @param { TrieNode Object } children - object with the children of a parent node 
   * @return { Boolean } - returns whether or not an object has children or is empty
   */

  isEmpty(children) {
    // only return a truthy value if the length is greater than 0
    return Object.values(children).length !== 0;
  }


  /** 
   * @param { Char } character - character to be inserted 
   * @param { Boolean } isCompleted - boolean value that determines whether or not the letter and the Trie node will represent the end of a complete word  
   * @return { TrieNode }
   */

  insert(character, isCompleted = false) {
    //check if child has char
    if (!this.children[character]) {

    // if char doesn't exist, instantiate new node with the character as the key for reference 
      this.children[character] = new trieNode(character, isCompleted);
    }

    // if char does exist, set a variable to that node, check to see if that char represents end of the word
    let childNode = this.children[character];

    // if it is, change isComplete to true else, use false
    childNode.isCompleted = childNode.isCompleted || isCompleted;

    // return childNode whether it was existing or just created
    return childNode;

  }


  /** 
   * @param { Char } character 
   * @return { TrieNode } 
   */

  delete(character) {
    // set current node to a variable 
    let childNode = this.children[character];

    // check node exists, if there are any children, if it is the end of a word 
    if (childNode && !this.isEmpty(childNode.children) && !childNode.isCompleted) {
      // delete childNode that is being targeted
      delete this.children[character];
    }
    
    return this;
  }

};

module.exports = {
   trieNode, 
};
