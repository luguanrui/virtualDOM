// 定义Element类
class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
  }
}
// 1. 创建虚拟DOM
function createElement(tagName, props, children) {
  return new Element(tagName, props, children)
}
// 2. 将虚拟DOM转化为真实的DOM
function render(vdom) {
  // 创建父级的真是DOM元素
  let el = document.createElement(vdom.tagName)
  // 将虚拟DOM中的父级属性添加到真实DOM上
  for (let key in vdom.props) {
    setAttrs(el, key, vdom.props[key])
  }
  // 遍历子元素，递归调用render生成子级真是DOM，并挂载到父级DOM上
  vdom.children.forEach(child => {
    child = child instanceof Element ? render(child) : document.createTextNode(child)
    el.appendChild(child)
  })
  return el
}
// 设置属性
function setAttrs(node, key, value) {
  switch (key) {
    case 'value':
      if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
        node.value = value
      } else {
        node.setAttribute(key, value)
      }
      break
    case 'style':
      node.style.cssText = value
      break
    default:
      node.setAttribute(key, value)
      break
  }
}
// 3. 将真实DOM挂载到页面上
function renderDOM(el, target) {
  target.appendChild(el)
}
export { createElement, render, renderDOM, setAttrs }
