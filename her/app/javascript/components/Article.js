import React,{
  useState
} from "react"
// import PropTypes from "prop-types"

const srv="http://192.168.0.10:3000"

const Article = (props) => {
  const [article,setArticle] = useState({
    formId:"",
    id:"",
    response:{id:"",form_id:"",user_id:"",before:"",after:""},
    title_old:"",
    title_new:"",
    text_old:"",
    text_new:"",
    status:""
  });
  
  const getArticle = () => {
    if (article.formId > 0) {
      fetch(`${srv}/article/${article.formId}`).then(x=>x.json())
        .then(x=>{
          let obj={...article,id:x.id,title_old:x.title,text_old:x.text,status:`id_${x.id} ready`};
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
        body: JSON.stringify({id:article.id,title:article.title_new,text:article.text_new})
      })
        .then(x=>x.json())
        .then(x=>setArticle({...article,
          response:x,
          status:`patch ${JSON.parse(x.after).status}`
        })
      )
    }
  }  
  
  return (
    <React.Fragment>
      {console.log("rendered")}
      <h3> form: </h3>
      <button onClick={()=>{console.log(article),getArticle()}}>log</button>
      <input type="text" name="id" label="id" value={article.formId} onChange={(e)=>setArticle({...article,formId:e.target.value})} /> 
      <button onClick={()=>setArticle({formId:"",id:"",response:"",title_old:"",title_new:"",text_old:"",text_new:"",status:""})}>reset</button>
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
      <button onClick={()=>{console.log(article),patchArticle()}}>PATCH</button>
      <p> status: {article.status} </p>

      <Response res={article.response}/>
      <PostImage id={article.response.id}/>

    </React.Fragment>
  )
}
const Response = (props) => {
  return (
    <div>
    <h3> requested response: </h3>
    <p> request id: {`${props.res.id}`} </p>
    <p> form_id: {`${props.res.form_id}`} </p>
    <p> user_id: {`${props.res.user_id}`} </p>
    <p> before: {`${props.res.before}`} </p>
    <p> after: {`${props.res.after}`} </p>
    </div>
  );
}

const PostImage = (props) => {
  const [req_e, setReq_a] = useState({image:"",status:""})
  const handlePostImage = () => {
    const submitData = new FormData();

    submitData.append('request_execution[request_id]',props.id);
    submitData.append('request_execution[image]',req_e.image);

    const options = {
      method: 'POST',
      body: submitData,
    }

    console.log(submitData)
    fetch(`${srv}/request_exec`, options)
      .then(x=>{
        setReq_a({...req_e,status:x.statusText});
        console.log(x);
      });
  }
  return(
    <div>
      <h3>post image:</h3>
      <form>
          <p>request_id:{props.id}</p>
        <label>
          Image:
          <input id="image" type="file" accept="image/png, image/jpeg" onChange={(e) => setReq_a({...req_e,image:e.target.files[0]})}/>
        </label>
      </form>
      <button onClick={()=>{handlePostImage()}}>post image</button>
      <p>status:{req_e.status}</p>
    </div>
  )
}

export default Article
