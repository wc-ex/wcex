var DOC_LANG='cn'
location.search.split('&').forEach(p=>{
    let sp = p.split('=');
    if(sp.length == 2 && sp[0]== 'lang'){
        DOC_LANG = sp[1];
    }
  })

  
module.exports = {
    lang:DOC_LANG
}

