(function anonymous(shape,payload,ctx
) {
  const input = payload.value;
  const newResult = {};
  const key_0 = shape["aid"]._zod.run({ value: input["aid"], issues: [] }, ctx);
    if (key_0.issues.length) {
      payload.issues = payload.issues.concat(key_0.issues.map(iss => ({
        ...iss,
        path: iss.path ? ["aid", ...iss.path] : ["aid"]
      })));
    }
    
    if (key_0.value === undefined) {
      if ("aid" in input) {
        newResult["aid"] = undefined;
      }
    } else {
      newResult["aid"] = key_0.value;
    }
    
  
  const key_1 = shape["iid"]._zod.run({ value: input["iid"], issues: [] }, ctx);
    if (key_1.issues.length) {
      if ("iid" in input) {
        payload.issues = payload.issues.concat(key_1.issues.map(iss => ({
          ...iss,
          path: iss.path ? ["iid", ...iss.path] : ["iid"]
        })));
      }
    }
    
    if (key_1.value === undefined) {
      if ("iid" in input) {
        newResult["iid"] = undefined;
      }
    } else {
      newResult["iid"] = key_1.value;
    }
    
  
  const key_2 = shape["did"]._zod.run({ value: input["did"], issues: [] }, ctx);
    if (key_2.issues.length) {
      if ("did" in input) {
        payload.issues = payload.issues.concat(key_2.issues.map(iss => ({
          ...iss,
          path: iss.path ? ["did", ...iss.path] : ["did"]
        })));
      }
    }
    
    if (key_2.value === undefined) {
      if ("did" in input) {
        newResult["did"] = undefined;
      }
    } else {
      newResult["did"] = key_2.value;
    }
    
  
  const key_3 = shape["repoId"]._zod.run({ value: input["repoId"], issues: [] }, ctx);
    if (key_3.issues.length) {
      if ("repoId" in input) {
        payload.issues = payload.issues.concat(key_3.issues.map(iss => ({
          ...iss,
          path: iss.path ? ["repoId", ...iss.path] : ["repoId"]
        })));
      }
    }
    
    if (key_3.value === undefined) {
      if ("repoId" in input) {
        newResult["repoId"] = undefined;
      }
    } else {
      newResult["repoId"] = key_3.value;
    }
    
  
  const key_4 = shape["pageId"]._zod.run({ value: input["pageId"], issues: [] }, ctx);
    if (key_4.issues.length) {
      if ("pageId" in input) {
        payload.issues = payload.issues.concat(key_4.issues.map(iss => ({
          ...iss,
          path: iss.path ? ["pageId", ...iss.path] : ["pageId"]
        })));
      }
    }
    
    if (key_4.value === undefined) {
      if ("pageId" in input) {
        newResult["pageId"] = undefined;
      }
    } else {
      newResult["pageId"] = key_4.value;
    }
    
  
  const key_5 = shape["uid"]._zod.run({ value: input["uid"], issues: [] }, ctx);
    if (key_5.issues.length) {
      if ("uid" in input) {
        payload.issues = payload.issues.concat(key_5.issues.map(iss => ({
          ...iss,
          path: iss.path ? ["uid", ...iss.path] : ["uid"]
        })));
      }
    }
    
    if (key_5.value === undefined) {
      if ("uid" in input) {
        newResult["uid"] = undefined;
      }
    } else {
      newResult["uid"] = key_5.value;
    }
    
  
  payload.value = newResult;
  return payload;
})