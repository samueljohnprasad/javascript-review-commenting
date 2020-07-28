document.getElementById('saveButton').style.display="none";
document.getElementById('replyCommentButton').style.display="none";
document.getElementById('saveReplyButton').style.display="none";
showComments();
function addComment(){
    event.preventDefault();// It is preventing the page to reload.

     var username=document.getElementById('username').value;
     
     var comment=document.getElementById('comment').value;

      var commentData= {
          commentId:generateCommentId(),
           username: username,
           comment: comment,
            time: getTimeAndDate(),
            replies:[],
            likes:0
      }
      //console.log(commentData); 
     if(localStorage.getItem('comments') == null){

        localStorage.setItem('comments',JSON.stringify([]));

        var allComments=JSON.parse(localStorage.getItem('comments'));

         allComments.push(commentData);

        localStorage.setItem('comments',JSON.stringify(allComments));
         emptyList();
        showComments();
        clearFields();
     }
     else{

        var comments=JSON.parse(localStorage.getItem('comments'));
        comments.push(commentData);
        localStorage.setItem('comments',JSON.stringify(comments));
        //document.getElementById('data').innerHTML="Comment Added!!";
        emptyList();
        showComments();
        clearFields();
     }
}

function generateCommentId(){

       if(localStorage.getItem('counter') == null){
            localStorage.setItem('counter',0);
            var counter=parseInt(localStorage.getItem('counter'))+1;
            localStorage.setItem('counter',counter);
            return counter;
       }
       else
       {
         var counter=parseInt(localStorage.getItem('counter'))+1;
         localStorage.setItem('counter',counter);
         return counter;
       }
}

function emptyList(){
     document.getElementById('list').innerHTML="";
}

function showComments(){
       
     var allComments=JSON.parse(localStorage.getItem('comments'));

     var list=document.getElementById('list');
      for(var i=0;i<allComments.length;i++){

           list.innerHTML+= "<li>"+ "<b>" +allComments[i].username + " </b>  : " +allComments[i].comment +"<b>" +allComments[i].time +"</b>"+ "&nbsp;&nbsp;&nbsp;&nbsp;"+"<button onclick="+"deleteComment("+allComments[i].commentId+")"+">Delete</button>" +" <button onclick="+"editComment("+allComments[i].commentId+")"+">Edit</button>"+"&nbsp;&nbsp;&nbsp;&nbsp;" +" <button onclick="+"replyComment("+allComments[i].commentId+")"+">Reply</button>" + "&nbsp;&nbsp;&nbsp;&nbsp;" +" <button onclick="+"addLike("+allComments[i].commentId+")"+">Like</button>"+ allComments[i].likes +"<br></br>";
          
             var currentCommentReplies=allComments[i].replies;
              for(var z=0;z<currentCommentReplies.length;z++){
                list.innerHTML+="<br>"+"<b>"+currentCommentReplies[z].username+ "</b>    :" +  currentCommentReplies[z].comment+" -  "+ currentCommentReplies[z].time + "&nbsp;&nbsp;&nbsp;&nbsp;"+"<button onclick="+"deleteReplyComment("+currentCommentReplies[z].repliedCommentId+")"+">Delete</button>" +" <button onclick="+"editRComment("+currentCommentReplies[z].repliedCommentId+")"+">Edit</button>"+"&nbsp;&nbsp;&nbsp;&nbsp;" +" <button onclick="+"replyComment("+currentCommentReplies[z].repliedCommentId+")"+">Reply</button>" + "&nbsp;&nbsp;&nbsp;&nbsp;" +" <button onclick="+"addLike("+currentCommentReplies[z].repliedCommentId+")"+">Like</button>"+ currentCommentReplies[z].likes +" <br><br> ";
              }
              list.innerHTML+="</li>";
      }
}
function clearFields(){
     document.getElementById('username').value="";
     document.getElementById('comment').value="";
}

function getTimeAndDate(){
     var date= new Date();
     return  date.getDate()+ "/"+ (parseInt(date.getMonth())+1) + "/"+ date.getFullYear()  + "&nbsp&nbsp&nbsp"+date.getHours() + ":" + date.getMinutes();
}

function removeAllComments(){
     event.preventDefault();
     localStorage.removeItem('comments');
     emptyList();

}

function deleteComment(commentId){

     event.preventDefault();
     console.log(commentId); 
     var allComments=JSON.parse(localStorage.getItem('comments'));
     console.log(allComments);
     for(var i=0; i<allComments.length;i++){
           if(allComments[i].commentId == commentId){
                allComments.splice(i,1);
           }
     }
     localStorage.setItem('comments',JSON.stringify(allComments));
     emptyList();
     showComments();
     // Logic to remove the comment
}

function editRComment(replyCommentId){
     event.preventDefault();
     document.getElementById('addButton').style.display="none";

     document.getElementById('saveReplyButton').style.display="block";
     document.getElementById('username').disabled=true;
     var allComments=JSON.parse(localStorage.getItem('comments'));
     console.log(allComments);
     for(var i=0; i<allComments.length;i++){
          for(var z=0;z<allComments[i].replies.length;z++){
                 if(allComments[i].replies[z].repliedCommentId == replyCommentId)
                 {
                      document.getElementById('username').value=allComments[i].replies[z].username;
                      document.getElementById('comment').value=allComments[i].replies[z].comment;
                      //allComments[i].replies[z].comment;
                  }
          }
   }
   localStorage.setItem('currentReplyCommentId',replyCommentId);
     // for(var i=0; i<allComments.length;i++){
     //       if(allComments[i].commentId == commentId){
     //             document.getElementById('username').value=allComments[i].username;
     //             document.getElementById('comment').value=allComments[i].comment;
     //       }
     // }
     //localStorage.setItem('currentReplyCommentId',replyCommentId);

}

function saveReplyComment(){
     event.preventDefault();
var currentReplyCommentId= parseInt(localStorage.getItem('currentReplyCommentId'));
console.log(currentReplyCommentId);
var allComments=JSON.parse(localStorage.getItem('comments'));
var comment= document.getElementById('comment').value;
     console.log( "AllComments", allComments);
     for(var i=0; i<allComments.length;i++){
            for(var z=0;z<allComments[i].replies.length;z++){
                   if(allComments[i].replies[z].repliedCommentId == currentReplyCommentId)
                   {
                        //allComments[i].replies.splice(z,1);
                        allComments[i].replies[z].comment= comment;
                    }
            }
     }
     localStorage.setItem('comments',JSON.stringify(allComments));
     emptyList();
     clearFields();
     showComments();
     document.getElementById('addButton').style.display="block";
     document.getElementById('saveReplyButton').style.display="none";
}


function editComment(commentId){
     event.preventDefault();
     document.getElementById('addButton').style.display="none";
     document.getElementById('saveButton').style.display="block";
     document.getElementById('username').disabled=true;
     var allComments=JSON.parse(localStorage.getItem('comments'));
     console.log(allComments);
     for(var i=0; i<allComments.length;i++){
           if(allComments[i].commentId == commentId){
                 document.getElementById('username').value=allComments[i].username;
                 document.getElementById('comment').value=allComments[i].comment;
           }
     }
     localStorage.setItem('currentCommentId',commentId);
}
function saveComment(){
     var commentId= parseInt(localStorage.getItem("currentCommentId"));
     event.preventDefault();
     document.getElementById('addButton').style.display="block";
     document.getElementById('saveButton').style.display="none";
     var allComments=JSON.parse(localStorage.getItem('comments'));
     var comment=document.getElementById('comment').value;
     console.log(allComments);
     for(var i=0; i<allComments.length;i++){
           if(allComments[i].commentId == commentId){
                allComments[i].comment=comment;
                allComments[i].time=getTimeAndDate();
           }
     }
     localStorage.setItem('comments',JSON.stringify(allComments));
     emptyList();
     clearFields();
     showComments();
     document.getElementById('username').disabled=false;
}

function replyComment(commentId){

      event.preventDefault();
      document.getElementById('addButton').style.display="none";
      document.getElementById('replyCommentButton').style.display="block";
      localStorage.setItem('currentCommentId',commentId);
}

function reply(){
 event.preventDefault();
 var username=document.getElementById('username').value;
 var comment=document.getElementById('comment').value;

  var userReply={
         repliedCommentId: generateCommentId(),
         username: username,
         comment:comment,
         time:getTimeAndDate(),
         likes:0
  }
  var commentId=localStorage.getItem('currentCommentId');
  var allComments=JSON.parse(localStorage.getItem('comments'));
  console.log(allComments);
  for(var i=0; i<allComments.length;i++){
        if(allComments[i].commentId == commentId){
             allComments[i].replies.push(userReply);
        }
        localStorage.setItem('comments',JSON.stringify(allComments));
        emptyList();
        clearFields();
        showComments();
        document.getElementById('addButton').style.display="block";
        document.getElementById('replyCommentButton').style.display="none";
  }


}

function addLike(commentId){
     event.preventDefault();
     console.log("addLike called");
     var allComments=JSON.parse(localStorage.getItem('comments'));
     console.log(allComments);
     for(var i=0; i<allComments.length;i++){
           if(allComments[i].commentId == commentId){
                allComments[i].likes= allComments[i].likes+1;
           }
     }
     localStorage.setItem('comments',JSON.stringify(allComments));
     emptyList();
     clearFields();
     showComments();
}

function deleteReplyComment(replyCommentId){
  event.preventDefault();
  console.log(replyCommentId);
  var allComments=JSON.parse(localStorage.getItem('comments'));
     console.log( "AllComments", allComments);
     for(var i=0; i<allComments.length;i++){
            for(var z=0;z<allComments[i].replies.length;z++){
                   if(allComments[i].replies[z].repliedCommentId == replyCommentId)
                   {
                        allComments[i].replies.splice(z,1);
                    }
            }
     }
     localStorage.setItem('comments',JSON.stringify(allComments));
     emptyList();
     clearFields();
     showComments();
}

// function editRComment(replyCommentId){
//      console.log("replyCommentId",replyCommentId);
//      var allComments=JSON.parse(localStorage.getItem('comments'));
//      console.log( "AllComments", allComments);
//      for(var i=0; i<allComments.length;i++){
//             for(var z=0;z<allComments[i].replies.length;z++){
//                    if(allComments[i].replies[z].repliedCommentId == replyCommentId)
//                    {
//                          console.log( "desired comment",allComments[i].replies[z]);
//                        // allComments[i].replies.splice(z,1);
//                     }
//             }
//      }
//      localStorage.setItem('comments',JSON.stringify(allComments));
//      emptyList();
//      clearFields();
//      showComments();

// }
/*

 1-> Check array is  present in LS or not 

 2-> If array is available, then add the comment else  create the array, then add comment

*/

