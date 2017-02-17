## directiveFun.html 知识点
1. v-example:hello.a.b="message" 解读  
	`v-example`: 为自定义指令,  
	`hello`  传给指令的参数（arg）,  
	`.a.b` 为**修饰符对象**，值为{a:true,b:true}  
	`"message"`为指令的绑定值，这里为'这是data信息！'  
2. 指令定义函数提供了几个可选的钩子函数  
	bind:function(){} 只调用一次，指令第一次绑定到元素时调用；
	`el,binding,vnode 为钩子函数参数`,
	el:指令所绑定的元素，可以直接操作DOM,
	binding：一个对象，包含多个属性，
	  name  定义的指令名，不包含v- , 这里是 'example'
	  value 指令所绑定的value值 , 这里是 'message'指向data下的'这是data信息！' 
	  expression  指令所绑定的字符串形式， 这里是 'message'
	  arg  传给定义指令的参数， 这里是 'hello'
	  modifiers  修饰符对象，以点.打头，值是以对象的方式呈现， 这里修饰符对象的值是 {'a':true,'b':true}
	vnode: vue编译生成的虚拟节点，数组方式呈现；
		虚拟节点详见 https://github.com/vuejs/vue/blob/dev/src/core/vdom/vnode.js
3. 钩子函数
	bind,inserted,update,unbind,componentUpdated
	unbind:只调用一次，指令与元素解绑时调用；
	update:被绑定元素所在的模板更新时调用，不论绑定值是否变化；
	componentUpdated:被绑定元素所在模板完成一个更新周期调用；
4. join()转换为字符串 typeof 的值为string