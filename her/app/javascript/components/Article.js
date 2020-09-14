import React,{
  useState
} from "react"
import PropTypes from "prop-types"
import html2canvas from 'html2canvas';

const srv="http://192.168.0.10:3000"

const Article = (props) => {
  const [article,setArticle] = useState({formId:"",id:"",before:"",after:"",title_old:"",title_new:"",text_old:"",text_new:"",status:""});
  
  const getArticle = () => {
    if (article.formId > 0) {
      // fetch(`${srv}/get_article/${article.formId}`).then(x=>x.json())
      fetch(`${srv}/article/${article.formId}`).then(x=>x.json())
        .then(x=>{
          let obj={...article,id:x.id,before:x,title_old:x.title,text_old:x.text,status:`id_${x.id} ready`};
          if(article.title_new==="") obj={...obj,title_new:obj.title_old}
          if(article.text_new==="") obj={...obj,text_new:obj.text_old}
          setArticle(obj)
        })
    }
  }  

  const patchArticle = () => {
    JSON.stringify({id:article.id,title:article.title_new,text:article.text_new})
    if (article.id > 0) {
      console.log({id:article.id,title:article.title_new,text:article.text_new})
      fetch(`${srv}/article/${article.id}`,{
        method: 'PATCH',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({id:article.id,title:article.title_new,text:article.text_new,before:article.before})
      })
        .then(x=>x.json())
        .then(x=>setArticle({...article,after:x,status:`id_${article.id} PATCH ${x.status} response:${JSON.stringify(x.data)}`}))
    }
  }  

  const screenshot = () => {
    html2canvas(document.body,{
        windowWidth: 500,
        width: 500
      })
      .then(canvas=>{
      //imgタグのsrcの中に、html2canvasがレンダリングした画像を指定する。
      // var imgData = canvas.toDataURL();
      // document.getElementById("result").src = imgData;
        document.body.appendChild(canvas);
      }
    );


  }
  
  return (
      <React.Fragment>
        {console.log("rendered")}
        <button onClick={()=>{console.log(article),getArticle()}}>log</button>
        <input type="text" name="id" label="id" value={article.formId} onChange={(e)=>setArticle({...article,formId:e.target.value})} /> 
        <button onClick={()=>setArticle({formId:"",id:"",before:"",after:"",title_old:"",title_new:"",text_old:"",text_new:"",status:""})}>reset</button>
        <p> formId: {article.formId} </p>
        <p> id: {article.id} </p>
        <p> title(old): {article.title_old} </p>
        <p>
          title(new):
          <input type="text" name="title_new" label="title_new" value={article.title_new} onChange={(e)=>setArticle({...article,title_new:e.target.value})} /> 
        </p>
        <p> text(old): {article.text_old} </p>
        <p>
          text(new):
          <input type="text" name="text_new" label="text_new" value={article.text_new} onChange={(e)=>setArticle({...article,text_new:e.target.value})} /> 
        </p>
        <button onClick={(e)=>{console.log(article),patchArticle()}}>PATCH</button>
        <button onClick={()=>screenshot()}>take Screenshot</button>
        <p> status: {article.status} </p>
        <p> before: {JSON.stringify(article.before)} </p>
        <p> after: {JSON.stringify(article.after)} </p>
      </React.Fragment>
  )
}

const foo = (e) => {
  console.log(e)
}


export default Article
