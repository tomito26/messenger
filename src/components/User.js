import Img from '../avatar.png'

const User = ({ user,selectedUser })=>{
    // console.log(user)
    return(
    <div className="user-wrapper" onClick={()=>selectedUser(user)}>
        <div className="user-info">
            <div className="user-detail">
                <img src={user.avatar || Img} alt="user avatar" className='avatar' />
                <h4>{ user.name }</h4>
            </div>
            <div className={ `user-status ${user.isOnline ? "online" : "offline"} `}></div>
        </div>

    </div>
    );
}
export default User;