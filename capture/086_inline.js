(function anonymous(shape,payload,ctx
) {
  const input = payload.value;
  const newResult = {};
  const key_0 = shape["fp"]._zod.run({ value: input["fp"], issues: [] }, ctx);
    if (key_0.issues.length) {
      payload.issues = payload.issues.concat(key_0.issues.map(iss => ({
        ...iss,
        path: iss.path ? ["fp", ...iss.path] : ["fp"]
      })));
    }
    
    if (key_0.value === undefined) {
      if ("fp" in input) {
        newResult["fp"] = undefined;
      }
    } else {
      newResult["fp"] = key_0.value;
    }
    
  
  const key_1 = shape["h5_check_version"]._zod.run({ value: input["h5_check_version"], issues: [] }, ctx);
    if (key_1.issues.length) {
      if ("h5_check_version" in input) {
        payload.issues = payload.issues.concat(key_1.issues.map(iss => ({
          ...iss,
          path: iss.path ? ["h5_check_version", ...iss.path] : ["h5_check_version"]
        })));
      }
    }
    
    if (key_1.value === undefined) {
      if ("h5_check_version" in input) {
        newResult["h5_check_version"] = undefined;
      }
    } else {
      newResult["h5_check_version"] = key_1.value;
    }
    
  
  const key_2 = shape["host"]._zod.run({ value: input["host"], issues: [] }, ctx);
    if (key_2.issues.length) {
      payload.issues = payload.issues.concat(key_2.issues.map(iss => ({
        ...iss,
        path: iss.path ? ["host", ...iss.path] : ["host"]
      })));
    }
    
    if (key_2.value === undefined) {
      if ("host" in input) {
        newResult["host"] = undefined;
      }
    } else {
      newResult["host"] = key_2.value;
    }
    
  
  const key_3 = shape["successCb"]._zod.run({ value: input["successCb"], issues: [] }, ctx);
    if (key_3.issues.length) {
      if ("successCb" in input) {
        payload.issues = payload.issues.concat(key_3.issues.map(iss => ({
          ...iss,
          path: iss.path ? ["successCb", ...iss.path] : ["successCb"]
        })));
      }
    }
    
    if (key_3.value === undefined) {
      if ("successCb" in input) {
        newResult["successCb"] = undefined;
      }
    } else {
      newResult["successCb"] = key_3.value;
    }
    
  
  const key_4 = shape["errorCb"]._zod.run({ value: input["errorCb"], issues: [] }, ctx);
    if (key_4.issues.length) {
      if ("errorCb" in input) {
        payload.issues = payload.issues.concat(key_4.issues.map(iss => ({
          ...iss,
          path: iss.path ? ["errorCb", ...iss.path] : ["errorCb"]
        })));
      }
    }
    
    if (key_4.value === undefined) {
      if ("errorCb" in input) {
        newResult["errorCb"] = undefined;
      }
    } else {
      newResult["errorCb"] = key_4.value;
    }
    
  
  const key_5 = shape["closeCb"]._zod.run({ value: input["closeCb"], issues: [] }, ctx);
    if (key_5.issues.length) {
      if ("closeCb" in input) {
        payload.issues = payload.issues.concat(key_5.issues.map(iss => ({
          ...iss,
          path: iss.path ? ["closeCb", ...iss.path] : ["closeCb"]
        })));
      }
    }
    
    if (key_5.value === undefined) {
      if ("closeCb" in input) {
        newResult["closeCb"] = undefined;
      }
    } else {
      newResult["closeCb"] = key_5.value;
    }
    
  
  payload.value = newResult;
  return payload;
})