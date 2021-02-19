
const removeMask = (text, mask) => {
    let newText = text.replace(/\D/g, '');
    return Number(newText).toString();
};

const applyMask = (text, mask) => {
    var textIndex = text.length;
    var bracerOpened = false;
    var maskedText = '';
    for(var maskIndex = mask.length - 1; maskIndex >= 0; maskIndex--){
        let nextMaskChar = mask.charAt(maskIndex);
        if(!bracerOpened && nextMaskChar == ']'){
            bracerOpened = true; continue;
        }
        if(!!bracerOpened && nextMaskChar == '['){
            bracerOpened = false; continue;
        }
        let textChar = '';
        if(!!bracerOpened){
            if(nextMaskChar !== '9' && nextMaskChar !== '0'){
                if(textIndex < 1) continue;
                maskedText = nextMaskChar + maskedText; continue;
            }
            if(textIndex > -1) textIndex = (textIndex - 1);
            if(!!text) textChar = textIndex < 0 ? '' : text.charAt(textIndex);
            if(nextMaskChar === '0' && textIndex < 0) textChar = '0';
            maskedText = textChar + maskedText;
        }
        if(!bracerOpened){
            maskedText = nextMaskChar + maskedText;
        }
    }
    return maskedText;
}
export {applyMask, removeMask};