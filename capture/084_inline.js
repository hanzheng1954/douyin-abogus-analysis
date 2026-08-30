(function anonymous(shape,payload,ctx
) {
  const input = payload.value;
  const newResult = {};
  const key_0 = shape["commonOptions"]._zod.run({ value: input["commonOptions"], issues: [] }, ctx);
    if (key_0.issues.length) {
      payload.issues = payload.issues.concat(key_0.issues.map(iss => ({
        ...iss,
        path: iss.path ? ["commonOptions", ...iss.path] : ["commonOptions"]
      })));
    }
    
    if (key_0.value === undefined) {
      if ("commonOptions" in input) {
        newResult["commonOptions"] = undefined;
      }
    } else {
      newResult["commonOptions"] = key_0.value;
    }
    
  
  const key_1 = shape["captchaOptions"]._zod.run({ value: input["captchaOptions"], issues: [] }, ctx);
    if (key_1.issues.length) {
      payload.issues = payload.issues.concat(key_1.issues.map(iss => ({
        ...iss,
        path: iss.path ? ["captchaOptions", ...iss.path] : ["captchaOptions"]
      })));
    }
    
    if (key_1.value === undefined) {
      if ("captchaOptions" in input) {
        newResult["captchaOptions"] = undefined;
      }
    } else {
      newResult["captchaOptions"] = key_1.value;
    }
    
  
  payload.value = newResult;
  return payload;
})