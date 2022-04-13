/**
 * @param {HTMLElementTagNameMap} selectors 
 * @returns
 */
function $$(selectors) {

    const self = {
        element: document.querySelector(selectors),
        copy : () => {
            if(self.element.value !== undefined) {
                navigator.clipboard.writeText(self.element.value);
            } else {
                navigator.clipboard.writeText(self.element.textContent);
            }
        },
        toDataURL(callback) {
            var file = self.element.files;
            if(file.length > 0) {
                var file = file[0];
                var fileReader = new FileReader();

                fileReader.onload = function (fileLoadEvents) {
                    callback(fileLoadEvents.target)
                }
                fileReader.readAsDataURL(file);
            }
        }
        
    }

    return self;

}
const wrapper = document.querySelector('.wrapper');
const code = getStyle(wrapper);
let border = [
    'Solid',
    'Dashed',
    'Dotted',
    'double',
    'initial',
    'inherit'
]
function toggleLayout(element) {
    const parents = $(element).parents('.layout');
    const content = $(parents).find('.content');
    $(parents).toggleClass('active');
    $(content).slideToggle();
}
function getStyle(element) {
    return window.getComputedStyle(element);
}
function getCode() {

    let value = `
        border : ${code.border}; <br>
        border-radius : ${code.borderRadius}; <br>
        box-shadow : ${code.boxShadow};
    `;

    return value;

}
function setStyle(key, value) {
    $('.wrapper').css(key,value);
}
$('.tools-put').change(function (e) { 
    e.preventDefault();
    
    const layout = $(e.target).parents('.layout');
    const label = $(e.target).siblings('label').html().toLowerCase();
    let value = $(e.target).val().toLowerCase();
    let style = window.getComputedStyle(wrapper);
    if($(layout).hasClass('border')) {
        if(label === 'width') setStyle('border-width', `${value}px`);
        if(label === 'style') setStyle('border-style', `${value}`);
        if(label === 'color') setStyle('border-color', `${value}`);
        if(label === 'rt') setStyle('border-top-right-radius', `${value}px`);
        if(label === 'lt') setStyle('border-top-left-radius', `${value}px`);
        if(label === 'rb') setStyle('border-bottom-right-radius', `${value}px`);
        if(label === 'lb') setStyle('border-bottom-left-radius', `${value}px`);
    }
    if($(layout).hasClass('shadow')) {
        let shadow = style.boxShadow.split(') ');
        let opacity = 'e6';
        let color = shadow[0]+')';
        let offset = shadow[1].split(' ');
        if(label === 'x offset') offset[0] = `${value}px`;
        if(label === 'y offset') offset[1] = `${value}px`;
        if(label === 'blur') offset[2] = `${value}px`;
        if(label === 'spread') offset[3] = `${value}px`;
        if(label === 'opacity') {let op = color.split(',');op[3] = `${value})`;color = op.toLocaleString();}
        if(label === 'color') {color = `${value}${opacity}`;$('.shadowOpacity').val(`0.99`);}
        let offShadow = offset.toLocaleString().replaceAll(',', ' ');
        let outShadow = offShadow + ' ' + color;
        if(label === 'inset') {
            if(e.target.checked === true) {
                setStyle('box-shadow', 'inset'+' '+outShadow);
            } else {
                outShadow = outShadow.split('inset');
                outShadow = outShadow[0]+''+outShadow[1];
                console.log(outShadow);
                setStyle('box-shadow', outShadow);
            }
        }
        let check = $('.shadowCheck');
        if(check[0].checked === false) {
            if(outShadow.search('inset') === 16) {
                outShadow = outShadow.split('inset');
                outShadow = outShadow[0]+''+outShadow[1];
            }
            setStyle('box-shadow', outShadow);
        } else {
            setStyle('box-shadow', 'inset'+' '+outShadow);
        }
    }

    RefrechCode();

});
function RefrechCode() {
    $('.code-btn').addClass('active');
    $('.code').html(getCode());
    $('.code-btn').removeClass('active');
}
$('.copyBtn').click(function (e) { 
    e.preventDefault();
    $('.copied').slideDown(500);
    $$('.code').copy();
    $('.copied').slideUp(1000);
});
for (let b = 0; b < border.length; b++) {
    const option = document.createElement('option');
    option.innerHTML = border[b];
    document.querySelector('.border-style').append(option);
}
$('.code').html(getCode());