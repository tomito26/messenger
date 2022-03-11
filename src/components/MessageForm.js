import Attachment from "./svg/Attachment";

const MessageForm = () =>{
    return(
        <form className="message-form">
            <div className="form-group">
                <label htmlFor="img">
                    <Attachment/>
                </label>
                <input type="file"  id="img" accept="image/*" style={{display:"none"}} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter message" />
            </div>
            <div className="button">
                <button className="btn">Send</button>
            </div>
        </form>
    );
};
export default MessageForm;