import Attachment from "./svg/Attachment";

const MessageForm = ({ handleSubmit,setText,text,setImage }) =>{
    return(
        <form className="message-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="img">
                    <Attachment/>
                </label>
                <input 
                    type="file"  
                    id="img" 
                    accept="image/*" 
                    style={{display:"none"}}
                    onChange={(e)=>setImage(e.target.files[0])} 

                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    value={text} onChange={(e)=>setText(e.target.value)} 
                    placeholder="Enter message" 
                />
            </div>
            <div className="button">
                <button className="btn">Send</button>
            </div>
        </form>
    );
};
export default MessageForm;