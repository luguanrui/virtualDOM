/**
 * diff算法
 * @param {*} oldVTree 老的虚拟DOM
 * @param {*} newVTree 新的虚拟DOM
 * @return {patches} 返回计算后的 补丁对象
 */
function diff(oldVTree, newVTree) {
  // 定义补丁
  let patches = {}
  let index = 0
  // 递归遍历新旧虚拟DOM树，将比较后的结果返回到patches
  walk(oldVTree, newVTree, index, patches)
  // 返回补丁
  return patches
}

// diff算法的规则
const REMOVE = 'REMOVE'
const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REPLACE = 'REPLACE'

/**
 * 
 * @param {*} oldVNode 
 * @param {*} newVNode 
 * @param {*} index 
 * @param {*} patches 
 */
function walk(oldVNode, newVNode, index, patches) {
  let currentPatch = [] // 每个元素都有一个补丁对象

  if (!newVNode) {// 1. 如果新的节点不存在
    currentPatch.push({ type: REMOVE, index })
  } else if (isString(oldVNode) && isString(newVNode)) {
    if (oldVNode !== newVNode) {// 2. 如果是文本更改
      currentPatch.push({ type: TEXT, text: newVNode })
    }
  } else if (oldVNode.tagName === newVNode.tagName) {
    // 3. 如果节点类型相同，比较属性，返回改变后的属性或者新增的属性（如果没有改变或者新增返回一个空对象）
    let attrs = diffAttr(oldVNode.props, newVNode.props)
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({ type: ATTRS, attrs })
    }
    // 如果有子节点，遍历子节点
    diffChildren(oldVNode.children, newVNode.children, index, patches)
  } else {// 4. 节点替换
    currentPatch.push({ type: REPLACE, newVNode })
  }

  // 如果有更新才返回补丁
  if (currentPatch.length > 0) {
    patches[index] = currentPatch
    // console.log(patches)
  }
}
// 比较属性
function diffAttr(oldAttrs, newAttrs) {
  let patch = {}
  // 属性改变
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      // 获取改变后的新的属性
      patch[key] = newAttrs[key]
    }
  }
  // 新增属性
  for (let key in newAttrs) {
    // 老的属性没有新的属性
    if (!oldAttrs.hasOwnProperty(key)) {
      // 获取新增的属性
      patch[key] = newAttrs[key]
    }
  }
  return patch
}

let Index = 0
function diffChildren(oldChildren, newChildren, index, patches) {
  oldChildren.forEach((child, idx) => {
    walk(child, newChildren[idx], ++Index, patches)
  })
}

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]'
}

export default diff
