const formatResult = (result) => {
    const data=result.toString()
    if(data.split("").length===1){
        return `0${data}`
    }else{
        return data
    }
};
module.exports=formatResult;
// Example usage
