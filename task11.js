async function func(url) {
    const resp = await fetch(url);
    if(resp.status == 200) {
      return resp.json() 
    }
  
    else {
        throw new Error(resp.status);
    }
}