import { createElement,render,renderDOM } from './element'
import diff from  './diff'
import patch from './patch'

// 创建虚拟DOM
let vdom = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['a']),
  createElement('li', { class: 'item' }, ['b']),
  createElement('li', { class: 'item' }, ['c'])
])
console.log('创建虚拟DOM：' ,vdom)

// 将虚拟DOM转化为真实DOM
let el = render(vdom)
console.log('真实DOM：',el)

// 将真实DOM挂载到页面上
renderDOM(el, document.getElementById('app'))

let vdom2 = createElement('ul', { class: 'list'}, [
    createElement('li', { class: 'item'}, ['1']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
])
// diff，比较两个虚拟DOM，生成补丁
let patches = diff(vdom, vdom2)
console.log('补丁包：', patches)

// 将补丁包挂载到真实DOM树上
patch(el, patches)