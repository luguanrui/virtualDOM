import { Element, render, setAttrs } from './element'

let allPatches // 所有补丁包
let index = 0
/**
 * 将补丁打到真实DOM节点上
 * @param {*} node 真实DOM节点
 * @param {*} patches 补丁对象
 */
function patch(node, patches) {
  allPatches = patches
  walk(node)
}
function walk(node) {
  let currentPatches = allPatches[index++]
  let childNodes = node.childNodes
  childNodes.forEach(child => {
    walk(child)
  })
  // 如果有补丁
  if (currentPatches) {
    doPatch(node, currentPatches)
  }
}

function doPatch(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case 'ATTRS':
        for (let key in patch.attrs) {
          let value = patch.attrs[key]
          if (value) {
            setAttrs(node, key, value)
          } else {
            node.removeAttribute(key)
          }
        }
        break
      case 'TEXT':
        node.textContent = patch.text
        break
      case 'REPLACE':
        let newNode = patch.newNode instanceof Element ? render(patch.newNode) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break
    }
  })
}

export default patch
