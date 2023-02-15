async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
  }
  
  function f() {
    const func = wait();
    func.then((resolve => {
      console.log(resolve);
    }));
  }
  
console.log(f());