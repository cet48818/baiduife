class FormFactory {
    constructor(container, action='#', method='post') {
    	// 初始化form
    	this.container = document.querySelector(container);
		var form = this.form = document.createElement('form');
		form.setAttribute('action', action);
		form.setAttribute('method', method)
		this.container.appendChild(form);
    }
    makeInput(...conf) {
        // 创建表单元素
        this.inputGroup = document.createElement('div');
        this.inputGroup.setAttribute('class', 'input-group');
        var me = this;
        conf.forEach(function(item) {
            switch (item.type) {
            	case 'radio':
            	case 'checkbox':
                    me.makeInputArea.call(me, 0, item);
                    break;
                case 'select':
                    me.makeInputArea.call(me, 1, item);
                    break;
            	case 'submit':
            	    me.makeInputArea.call(me, 2, item);
            	    break;
            	case 'text':
            	case 'password':
            	case 'email':
            	case 'tel':
            	    me.makeInputArea.call(me, 3, item);
            	    break;
            	case 'password-confirm':
            	    me.makeInputArea.call(me, 4, item);
            	    break;
            }
        });
        return this;
    }

    makeInputArea(type, conf) {
    	var inputStr = '';
    	var checked;
        if (type === 0) {
        	inputStr += `<p>${conf.title}</p>`;
        	conf.values.forEach(function(item, index) {
        		if (conf.defaultValue) {
        			checked = conf.checked === item.defaultValue ? 'checked' : '';
        		}
        		inputStr += `<input type="${conf.type}" name="${conf.name}" id="${item[0]}" value="${index}" ${checked}>
                             <label for="${item[0]}">${item[1]}</label>`; 
                
        	});
        } else if (type === 1) {
        	if (conf.label) {
        			inputStr += `<label for="conf.id">${conf.label}</label>`;
        		}
    		inputStr += `<select name="${conf.name}" id="${conf.id}">`; 
            conf.values.forEach(function(item, index) {
            	inputStr += `<option value=${item[0]}>${item[1]}</option>`;
        	});
            inputStr += '</select>';
        } else if (type === 2) { // submit按钮
            inputStr += `<button id="${conf.id}" type="submit">${conf.text}</button>`;
            // 点击提交的时候执行验证
            // Promise.resolve().then(this.validateSubmit);
        } else if (type === 3) {
            inputStr += `<label class="form-title" for="${conf.id}">${conf.label}</label>
                         <div class="form-content">
                         <input type="${conf.type}" name="${conf.name}" id="${conf.id}">
                         <p class="prompt">${conf.rules}</p>
                         </div>
                         `;
        } else if (type === 4) {
        	inputStr += `<label class="form-title" for="${conf.id}">${conf.label}</label>
                         <div class="form-content">
                         <input type="password" name="${conf.name}" id="${conf.id}">
                         <p class="prompt">${conf.rules}</p>
                         </div>
                         `;
            this.passConf = conf; // 存下确认密码的设置
        }
        this.inputGroup.innerHTML += inputStr;
        if (!this.form.contains(this.inputGroup)) {
        	this.form.appendChild(this.inputGroup);
        }
        if (conf.maxSelect) { // 检查checkbox上限
            this.checkSelectLimit(conf.name, conf.maxSelect);
        }
        if (typeof conf.validator === 'function') {
        	this.checkValidation(conf);
        }
        if (conf.type === 'submit') {
        	this.validateSubmit(conf.id);
        }
    }

    // 检查checkbox最大输入数
    checkSelectLimit(name, maxSelect) {
    	var me = this;
    	var checkBoxes = document.getElementsByName(name);
    	for (var box of checkBoxes) {
    		box.addEventListener('change', function(e) {
                if (me.container.querySelectorAll(`input[name=${name}]:checked`).length > maxSelect) {
                	this.checked = false;
                }
    		});
    	}
    }

    // 通用验证
    checkValidation(conf) {
        var obj = this.container.querySelector(`#${conf.id}`);
        var prompts = this.container.querySelector('.prompt');
        var me = this;
        var prompt;
    	obj.addEventListener('blur', function(e) {
    		this.classList.remove('success-msg');
            this.classList.remove('warning-msg');
            this.nextElementSibling.classList.remove('success-msg');
            this.nextElementSibling.classList.remove('warning-msg');
            this.nextElementSibling.textContent = conf.rules;
    		var flag = conf.validator.call(this);
            if (flag === true) {
                me.checkPassed.call(this, conf);
            } else if (flag === false) {
                me.checkNoPassed.call(this, conf);
            } else if (this.value !== '' && flag === 'password-confirm') { // 确认密码
            	var password = me.container.querySelector('input[type=password]').value;
            	if (this.value === password) {
            		me.checkPassed.call(this, conf);
            	} else  {
                    me.checkNoPassed.call(this, conf);
            	}
            }
            if (conf.type === 'password' && flag !== 'password-confirm') {
            	// 确认密码栏的密码
            	var checkPw = this.parentNode.parentNode.nextElementSibling.querySelector('input[type=password]');
            	if (checkPw.value !== '') {
            		if (this.value === checkPw.value) {
	            		me.checkPassed.call(checkPw, me.passConf);
	            	} else  {
	                    me.checkNoPassed.call(checkPw, me.passConf);
	            	}
            	}
            }
    	});

    }

    // 输入时验证
    validateSubmit(id) {
    	var me = this;
    	var SubmitButton = document.querySelector(`#${id}`);
    	SubmitButton.addEventListener('click', function(e) {
    		var prompts = me.container.querySelectorAll('.prompt');
	    	for (var prompt of prompts) {
	    		if (!prompt.classList.contains('success-msg')) {
	                    alert('请完成验证!');
	                    e.preventDefault();
	                    break;
	                }
	    	}
    	})
    }

    // 通过验证时的处理
    checkPassed(conf) {
        this.classList.remove('warning-msg');
        this.nextElementSibling.classList.remove('warning-msg');
        this.classList.add('success-msg');
        this.nextElementSibling.classList.add('success-msg');
        this.nextElementSibling.innerText = conf.success;
    }

    // 没有通过验证时的处理
    checkNoPassed(conf) {
    	this.classList.remove('success-msg');
    	this.nextElementSibling.classList.remove('success-msg');
        this.classList.add('warning-msg');
        this.nextElementSibling.classList.add('warning-msg');
        this.nextElementSibling.innerText = conf.fail;
    }
}
