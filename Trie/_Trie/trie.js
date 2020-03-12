const { trieNode } = require('./trieNode');


const root_value = '';

const trie = class Trie { 
  constructor() {
    // root node contains root_value and false 
    this.root = new trieNode(root_value);
  }


  /** 
   * @param { String } word - word that should be inserted into the Trie
   * @return { TrieNode }
   */

  insert(word) {
    let current_Node = this.root;

    for (let i = 0; i < word.length; i++) {
      let isCompletedWord = false;

      // set temp variable isCompletedWord to true when we reach the last letter of the string 
      if (i === word.length - 1) {
        isCompletedWord = true;
      }

      current_Node = current_Node.insert(word[i], isCompletedWord)
    }

    return this;
  }


  /**
   * @param { String } word 
   * @return {TrieNode}
   */
  search(word) {
    let current_Node = this.root;

    for (let i = 0; i < word.length; i++) {
      // if node has no children return an indicator such as null, else set current_node to the found node 
      // if (Object.values(current_Node).length < 1 || !current_Node.children[word[i]]) {
      if (!current_Node.children[word[i]]) {
        return null;
      }

      // set current_Node to current_Node
      current_Node = current_Node.children[word[i]];
    }

    return current_Node;
  }


  /**
   * @param { String } word
   * @return { TrieNode }  
   */

  delete(word) {
    // inner recursive function 
    const deleteFromBottomToTop = (currentNode, index = 0) => {
      // return if character index counter is equal or exceeding word.length - 1;
      if (index >= word.length) {
        //terminate function 
        return;
      }

      const character = word[index];
      const nextNode = currentNode.children[character];

      // define base case if the word doesn't exist 
      if (!nextNode) {
        // if children doesn't contain the character we're looking for, terminate and return 
        return;
      }

      // recurse to the next level Params: child node, increment index by 1
      deleteFromBottomToTop(nextNode, index + 1);

      // set value of last character's node to false to state that it is no longer a completed word
      if (index == word.length - 1) {
        nextNode.isCompleted = false;
      }

      // call trieNode delete method 
      currentNode.delete(character);
    };

    // invoke function set the arg to the root node 
    deleteFromBottomToTop(this.root);

    return this;
  }
};

module.exports = { 
  trie,
};