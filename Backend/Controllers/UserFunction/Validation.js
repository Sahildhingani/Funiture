async function Validation(req,resp) {
    console.log('validation',req.cookies.accessToken);
}

module.exports=Validation;